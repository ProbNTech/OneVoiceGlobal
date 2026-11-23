import type { Metadata } from "next";
import { brand, company, contact, logo, siteUrl } from "@/data/site";
import { seo, type Route } from "@/data/seo";

/**
 * Whether this copy of the site may appear in search results. Only the
 * Hostinger deployment at onevoiceglobal.org.uk may: the same code is also
 * deployed on Vercel (one-voice-global.vercel.app), which sets `VERCEL` at
 * build and run time, so every Vercel deployment is marked noindex and
 * cannot compete with the real address. `SITE_NOINDEX=1` does the same for
 * any other staging copy. Read at build time, when the pages are prerendered.
 */
export const isIndexable = !process.env.VERCEL && process.env.SITE_NOINDEX !== "1";

/** An absolute address on the public site. */
export const absoluteUrl = (path: string) => new URL(path, siteUrl).toString();

/** The 1200x630 card shown when a page is shared, made from the client's logo and brand colours. */
export const shareImage = {
  url: "/og/onevoice-global-organisation-share.png",
  width: 1200,
  height: 630,
  alt: `${brand.name} logo with the line "Empowering People. Building Skills. Creating Opportunities."`,
  type: "image/png",
} as const;

/**
 * A page's metadata: its title and description, its canonical address on
 * onevoiceglobal.org.uk, and its Open Graph and X (Twitter) cards. Next.js
 * replaces, rather than merges, a parent's `openGraph` and `twitter` objects,
 * so each page sets them in full here.
 */
export function pageMetadata(route: Route): Metadata {
  const page: { title: string; absoluteTitle?: string; description: string } = seo[route];
  const fullTitle = page.absoluteTitle ?? `${page.title} | ${brand.name}`;

  return {
    title: page.absoluteTitle ? { absolute: page.absoluteTitle } : page.title,
    description: page.description,
    alternates: { canonical: route },
    openGraph: {
      type: "website",
      locale: "en_GB",
      siteName: brand.name,
      url: route,
      title: fullTitle,
      description: page.description,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: page.description,
      images: [{ url: shareImage.url, alt: shareImage.alt }],
    },
  };
}

/* -------------------------------------------------------------------------
   Structured data (schema.org JSON-LD)
   ------------------------------------------------------------------------- */

const organizationId = absoluteUrl("/#organization");
const websiteId = absoluteUrl("/#website");

type JsonLdNode = Record<string, unknown>;

/** The organisation and the website, on every page. */
export function siteJsonLd(): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: brand.name,
        legalName: company.name,
        url: absoluteUrl("/"),
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl(logo.colour.src),
          width: logo.colour.width,
          height: logo.colour.height,
          caption: brand.name,
        },
        image: absoluteUrl(shareImage.url),
        description: seo["/"].description,
        slogan: brand.tagline,
        email: contact.email,
        telephone: contact.telephone.replace(/\s/g, ""),
        address: { "@type": "PostalAddress", ...contact.postalAddress },
        areaServed: { "@type": "City", name: "London" },
        identifier: {
          "@type": "PropertyValue",
          propertyID: "Companies House company number",
          value: company.number,
        },
        department: { "@type": "Organization", name: brand.centre },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "general enquiries",
          email: contact.email,
          telephone: contact.telephone.replace(/\s/g, ""),
          areaServed: "GB",
          availableLanguage: "en-GB",
        },
        sameAs: contact.social.map((link) => link.href),
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: absoluteUrl("/"),
        name: brand.name,
        inLanguage: "en-GB",
        publisher: { "@id": organizationId },
      },
    ],
  };
}

/** The page itself and its breadcrumb trail, plus any nodes the page adds (an event, its questions). */
export function pageJsonLd(route: Route, extra: { mainEntity?: JsonLdNode | JsonLdNode[]; nodes?: JsonLdNode[] } = {}) {
  const page: {
    name: string;
    description: string;
    parent?: Route;
    type?: string;
    absoluteTitle?: string;
    title: string;
  } = seo[route];
  const url = absoluteUrl(route);

  const trail: { name: string; route: Route }[] = [];
  for (let at: Route | undefined = route; at; at = (seo[at] as { parent?: Route }).parent) {
    trail.unshift({ name: seo[at].name, route: at });
  }
  if (route !== "/") trail.unshift({ name: seo["/"].name, route: "/" });

  const graph: JsonLdNode[] = [
    {
      "@type": page.type ?? "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: page.absoluteTitle ?? `${page.title} | ${brand.name}`,
      description: page.description,
      inLanguage: "en-GB",
      isPartOf: { "@id": websiteId },
      about: { "@id": organizationId },
      primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(shareImage.url) },
      ...(trail.length > 1 ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
      ...(extra.mainEntity ? { mainEntity: extra.mainEntity } : {}),
    },
    ...(extra.nodes ?? []),
  ];

  if (trail.length > 1) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: trail.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: absoluteUrl(crumb.route),
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

/** The organisation, for nodes that name it as their organiser or publisher. */
export const organizationRef = { "@id": organizationId } as const;
