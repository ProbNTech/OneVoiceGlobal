/**
 * Structured data for search engines, as the Next.js JSON-LD guide advises: a
 * plain script tag, with "<" escaped so no value can close the tag early.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
