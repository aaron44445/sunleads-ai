/**
 * Renders JSON-LD structured data into the server HTML.
 *
 * Uses a plain <script> rather than next/script — that is the pattern Next.js
 * documents for structured data, since crawlers need it in the initial HTML.
 */
export default function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Record<string, unknown>[];
}) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify does not sanitize. Escaping "<" keeps the JSON valid
      // while making it impossible for a string containing "</script>" to
      // break out of the tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
