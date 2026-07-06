import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const isStaging = process.env.NEXT_PUBLIC_ENVIRONMENT === "staging";

  if (isStaging) {
    // Staging: Block all search engines
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  // Production: Allow all search engines
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/profile/", "/login/", "/register/"],
    },
    sitemap: "https://heina.org/sitemap.xml",
  };
}
