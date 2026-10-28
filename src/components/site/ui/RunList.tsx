import { Fragment } from "react";
import { cx } from "@/lib/cx";

/**
 * A list set as running text, its items parted by small dots in one of the
 * logo's colours: how the Programmes page keeps the brief's long lists (up
 * to twenty items) to a few lines without bullets, cards or chips. Each item
 * keeps to one line, and carries its dot with it, so no line starts on one.
 */
export function RunList({
  items,
  className,
  dot = "bg-lagoon-500",
  labelledBy,
}: {
  items: readonly string[];
  className?: string;
  /** The dots' colour, as a background class. */
  dot?: string;
  labelledBy?: string;
}) {
  return (
    <ul aria-labelledby={labelledBy} className={className}>
      {items.map((item, index) => (
        /* The space after each item sits outside it: it is where a line
           may break. */
        <Fragment key={item}>
          <li className="inline whitespace-nowrap">
            {item}
            {index < items.length - 1 ? (
              <span
                aria-hidden="true"
                className={cx(
                  "ml-[0.7em] mr-[0.4em] inline-block h-[0.32em] w-[0.32em] rounded-full align-middle",
                  dot,
                )}
              />
            ) : null}
          </li>{" "}
        </Fragment>
      ))}
    </ul>
  );
}
