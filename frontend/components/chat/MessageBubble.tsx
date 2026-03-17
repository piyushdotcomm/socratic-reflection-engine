import { Message } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex items-start gap-3 w-full",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 flex items-center justify-center mt-1 outline outline-1 outline-offset-2",
          isUser
            ? "bg-editorial-text text-editorial-bg outline-editorial-border"
            : "bg-editorial-bg-alt text-editorial-accent outline-editorial-border"
        )}
      >
        {isUser ? (
          <User className="w-4 h-4" />
        ) : (
          <Bot className="w-4 h-4" />
        )}
      </div>

      {/* Bubble */}
      <div
        className={cn(
          "max-w-[85%] px-5 py-4",
          isUser
            ? "bg-editorial-text text-editorial-bg font-sans text-sm tracking-wide shadow-md"
            : "bg-transparent text-editorial-text font-serif text-[17px] leading-relaxed border-l-2 border-editorial-accent pl-5 py-2"
        )}
      >
        {message.content}
      </div>
    </div>
  );
}
