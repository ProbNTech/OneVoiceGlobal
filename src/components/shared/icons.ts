import {
  Briefcase,
  Compass,
  Globe,
  GraduationCap,
  HandHeart,
  Handshake,
  HeartHandshake,
  HeartPulse,
  Layers,
  Lightbulb,
  MapPin,
  Megaphone,
  MessagesSquare,
  MonitorSmartphone,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/**
 * Resolves the Lucide icon names stored in `src/data/*` to components.
 *
 * Content data references icons by string so the data layer stays serialisable
 * and CMS-ready; this is the single place that binds those names to real icon
 * components. Add an entry here when new icon names appear in the data.
 */
export const iconMap: Record<string, LucideIcon> = {
  briefcase: Briefcase,
  compass: Compass,
  globe: Globe,
  "graduation-cap": GraduationCap,
  "hand-heart": HandHeart,
  handshake: Handshake,
  "heart-handshake": HeartHandshake,
  "heart-pulse": HeartPulse,
  layers: Layers,
  lightbulb: Lightbulb,
  "map-pin": MapPin,
  megaphone: Megaphone,
  "messages-square": MessagesSquare,
  "monitor-smartphone": MonitorSmartphone,
  users: Users,
  wrench: Wrench,
};

/** Fallback keeps the UI resilient if a data file adds an unmapped name. */
export function resolveIcon(name: string): LucideIcon {
  return iconMap[name] ?? Compass;
}
