from typing import Optional


class FrameworkSelector:
    FRAMEWORK_MAP = {
        "org.sugarlabs.MusicBlocks": "kolb",
        "org.laptop.TurtleArtActivity": "kolb",
        "org.laptop.Write": "gibbs",
        "org.sugarlabs.Speak": "socratic",
    }
    FALLBACK_CYCLE = ["gibbs", "kolb", "5r"]

    @staticmethod
    def select(
        activity_type: str,
        age_group: Optional[str] = None,
        reflection_count: int = 0,
    ) -> str:
        for key, framework in FrameworkSelector.FRAMEWORK_MAP.items():
            if activity_type.startswith(key):
                return framework
        return FrameworkSelector.FALLBACK_CYCLE[reflection_count % 3]
