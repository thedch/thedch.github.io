import type { Metadata, Site, Socials } from "@types";

export const SITE: Site = {
  TITLE: "daniel's blog",
  DESCRIPTION: "A blog about building great products and machine learning challenges.",
  EMAIL: "aefdch@gmail.com",
  NUM_POSTS_ON_HOMEPAGE: 5,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "A blog about building great products and machine learning challenges.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "A collection of articles on topics I care about.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION:
    "A collection of my projects with links to repositories and live demos.",
};

export const SOCIALS: Socials = [
  {
    NAME: "X (formerly Twitter)",
    HREF: "https://twitter.com/nearlydaniel",
  },
  {
    NAME: "GitHub",
    HREF: "https://github.com/thedch",
  },
  {
    NAME: "LinkedIn",
    HREF: "https://www.linkedin.com/in/thedch",
  },
];
