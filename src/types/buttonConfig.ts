import type { LucideIcon } from "lucide-react";

export interface ButtonConfig {
    id: string;
    text: string;
    icon: LucideIcon;
    gradient: string;
    hoverGradient: string;
    glowColor: string;
    spaceColor: string;
}