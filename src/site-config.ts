import { defineSiteConfig } from "astro-theme-university/types";
import favicon from "./assets/images/favicon.svg";
import { courseMeta } from "./course-config";

// The underlying collection and URL remain `sessions`; these labels are the
// language students see. Every teaching session in this course is a week.
export const sessionLabels = {
  singular: "Week",
  plural: "Weeks",
} as const;

export const graphCollections = ["sessions", "assessments", "lectures", "people"];

export const courseApiCollections = [
  ...graphCollections.map((key) => ({ key })),
  { key: "policies", dir: "pages/policies" },
];

export const siteConfig = defineSiteConfig({
  favicon,
  name: "Three Shots Ahead",
  // Fixed dark identity: the felt-green/gold palette is designed for one
  // scheme, not a light/dark toggle.
  colorScheme: "dark",

  links: [
    { text: "Overview", href: "/overview/" },
    { text: sessionLabels.plural, href: "/sessions/" },
    { text: "Assessments", href: "/assessments/" },
    { text: "Resources", href: "/resources/" },
    { text: "Policies", href: "/policies/" },
  ],

  licence: "CC-BY-NC-SA-4.0",
  socialImage: "/src/assets/images/card.png",
  socialImageAlt: `A preview card for ${courseMeta.code}: ${courseMeta.title}`,
});
