import type { LucideIcon } from "lucide-react";
import { cx } from "@/lib/cx";

/**
 * An event's date and, where the brief gives them, its venue or timing:
 * each an icon in one of the logo's colours and the words beside it, in a
 * row that wraps.
 */
export function EventMeta({
  items,
  tone = "light",
  className,
}: {
  items: { icon: LucideIcon; label?: string; text: string }[];
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <ul className={cx("flex flex-wrap gap-x-7 gap-y-2.5", className)}>
      {items.map(({ icon: Icon, label, text }) => (
        <li
          key={text}
          className={cx(
            "inline-flex items-start gap-2.5 text-[0.9375rem] leading-snug",
            tone === "light" ? "text-ink" : "text-white",
          )}
        >
          <Icon
            aria-hidden="true"
            className={cx(
              "mt-0.5 h-[1.125rem] w-[1.125rem] shrink-0",
              tone === "light" ? "text-lagoon-600" : "icon-orange",
            )}
            strokeWidth={1.8}
          />
          <span>
            {label ? <span className="font-semibold">{label}: </span> : null}
            {text}
          </span>
        </li>
      ))}
    </ul>
  );
}
