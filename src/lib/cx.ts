/**
 * Joins class names, skipping falsy values. The site design uses this rather
 * than `cn`: tailwind-merge does not know the custom type tokens
 * (`text-title`, `text-statement`...) and drops them as conflicting colours.
 * Components never pass two classes for the same property, so no merging is
 * needed.
 */
export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
