import logging
from typing import List, Dict

import google.generativeai as genai
from groq import Groq
from openai import AsyncOpenAI

from app.config import settings

logger = logging.getLogger(__name__)

genai.configure(api_key=settings.GEMINI_API_KEY)


async def get_gemini_response(
    messages: List[Dict[str, str]],
    system_prompt: str,
) -> str:
    """Call Gemini 2.0 Flash with conversation history and system prompt."""
    try:
        model = genai.GenerativeModel(
            model_name="gemini-2.0-flash",
            system_instruction=system_prompt,
        )
        history = [
            {"role": m["role"], "parts": [m["content"]]}
            for m in messages[:-1]
        ]
        chat = model.start_chat(history=history)
        response = chat.send_message(messages[-1]["content"])
        return response.text
    except Exception as e:
        logger.error(f"Gemini API error: {e}")
        raise


async def get_groq_response(
    messages: List[Dict[str, str]],
    system_prompt: str,
) -> str:
    """Call Groq Llama 3.3 70b with conversation history and system prompt."""
    try:
        client = Groq(api_key=settings.GROQ_API_KEY)
        formatted = [{"role": "system", "content": system_prompt}]
        formatted += [
            {"role": m["role"], "content": m["content"]}
            for m in messages
        ]
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=formatted,
            max_tokens=1024,
            temperature=0.7,
        )
        return response.choices[0].message.content
    except Exception as e:
        logger.error(f"Groq API error: {e}")
        raise


async def get_featherless_response(
    messages: List[Dict[str, str]],
    system_prompt: str,
    model_name: str,
) -> str:
    """Call Featherless AI via OpenAI compatible endpoint."""
    try:
        client = AsyncOpenAI(
            base_url="https://api.featherless.ai/v1",
            api_key=settings.FEATHERLESS_API_KEY
        )
        formatted = [{"role": "system", "content": system_prompt}]
        formatted += [
            {"role": m["role"], "content": m["content"]}
            for m in messages
        ]
        response = await client.chat.completions.create(
            model=model_name,
            messages=formatted,
            max_tokens=1024,
            temperature=0.7,
        )
        return response.choices[0].message.content
    except Exception as e:
        logger.error(f"Featherless API error for model {model_name}: {e}")
        raise


async def get_hf_inference_response(
    messages: List[Dict[str, str]],
    system_prompt: str,
) -> str:
    """Call HuggingFace Inference API with a fine-tuned LoRA adapter."""
    try:
        client = AsyncOpenAI(
            base_url=f"https://api-inference.huggingface.co/models/{settings.HF_MODEL_ID}/v1",
            api_key=settings.HF_API_KEY,
        )
        formatted = [{"role": "system", "content": system_prompt}]
        formatted += [
            {"role": m["role"], "content": m["content"]}
            for m in messages
        ]
        response = await client.chat.completions.create(
            model=settings.HF_MODEL_ID,
            messages=formatted,
            max_tokens=1024,
            temperature=0.7,
        )
        return response.choices[0].message.content
    except Exception as e:
        logger.error(f"HuggingFace API error: {e}")
        raise


async def get_llm_response(
    messages: List[Dict[str, str]],
    system_prompt: str,
    provider: str = "featherless-120b",
) -> str:
    """Dispatch to the appropriate LLM provider."""
    if provider == "groq":
        return await get_groq_response(messages, system_prompt)
    elif provider == "gemini":
        return await get_gemini_response(messages, system_prompt)
    elif provider == "featherless-20b":
        return await get_featherless_response(messages, system_prompt, "gpt-oss-20b")
    elif provider == "hf-lora":
        return await get_hf_inference_response(messages, system_prompt)
    else:
        # Default to 120b
        return await get_featherless_response(messages, system_prompt, "gpt-oss-120b")
