export type Locale = "en" | "ja";

export type ProjectVisualKind =
  | "kryptboard"
  | "kanji"
  | "keyguardian"
  | "chinatsu"
  | "knowledge";

export type ProjectContent = {
  slug: string;
  num: string;
  title: string;
  codename: string;
  tagline: string;
  year: string;
  status: string;
  stack: string[];
  tags: string[];
  links: { label: string; href: string }[];
  problem: string;
  built: string[];
  impact: string[];
  publication?: { title: string; venue: string; doi: string };
  visual: ProjectVisualKind;
};

export type SkillGroupKey =
  | "languages"
  | "security"
  | "frameworks"
  | "dev"
  | "spoken"
  | "style";

export type Content = {
  nav: { id: string; label: string }[];
  marquee: string[];
  hero: {
    cmd: string;
    ver: string;
    intro: string;
    ctaWork: string;
    ctaPapers: string;
    termWho: string;
    termCurrent: string;
    termProof: string;
    scroll: string;
  };
  about: {
    title: string;
    note: string;
    lead: string;
    p1: string;
    p2: string;
    stats: { n: string; l: string }[];
    eduLabel: string;
    focusLabel: string;
    focus: string[];
    education: { school: string; degree: string; place: string; period: string }[];
  };
  experience: {
    title: string;
    note: string;
    sticky: string;
    entries: {
      role: string;
      company: string;
      place: string;
      period: string;
      summary: string;
      bullets: string[];
      tags: string[];
    }[];
  };
  work: { title: string; note: string; viewAll: string };
  research: {
    title: string;
    note: string;
    coauthored: string;
    pubs: { title: string; venue: string; date: string; doi: string }[];
  };
  goals: { title: string; note: string; items: { title: string; body: string }[] };
  skills: {
    title: string;
    note: string;
    groups: { key: SkillGroupKey; label: string; items: string[] }[];
    certLabel: string;
    certs: { name: string; issuer: string }[];
  };
  contact: {
    title: string;
    note: string;
    line1: string;
    line2a: string;
    line2b: string;
    githubDesc: string;
    linkedinDesc: string;
    researchLabel: string;
    researchDesc: string;
    locationLabel: string;
    localTime: string;
    phoneHours?: string;
    bottom: string;
    top: string;
    resume: string;
    resumeDesc: string;
    linktreeLabel: string;
    linktreeDesc: string;
  };
  caseFile: {
    all: string;
    back: string;
    prev: string;
    problem: string;
    built: string;
    impact: string;
    peer: string;
    readPaper: string;
    next: string;
    timeline: string;
    status: string;
    links: string;
  };
  indexPage: { title1: string; title2: string; intro: string; backHome: string };
  projects: ProjectContent[];
};
