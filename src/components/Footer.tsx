"use client";

import Link from "next/link";
import { profile } from "@/data/profile";
import { useI18n } from "@/i18n";
import { Reveal } from "./motion";
import {
  ArrowUpRight,
  GitHubIcon,
  LinkedInIcon,
  LocalTime,
  MailIcon,
  SectionHeading,
} from "./ui";

export function Footer() {
  const { locale, t } = useI18n();
  const c = t.contact;

  return (
    <footer id="contact" className="relative border-t border-line bg-bg-soft/50">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10 py-24 md:py-32">
        <SectionHeading num="07" title={c.title} note={c.note} />

        <Reveal variant="mask">
          <h3 className="display text-[clamp(2.6rem,8.5vw,7rem)]">{c.line1}</h3>
        </Reveal>
        <Reveal variant="mask" delay={100}>
          <h3 className="display text-[clamp(2.6rem,8.5vw,7rem)]">
            {c.line2a}
            <span className="serif-it text-accent normal-case">{c.line2b}</span>
          </h3>
        </Reveal>

        <Reveal delay={150} className="mt-10 md:mt-14">
          <a
            href={`mailto:${profile.email}`}
            className="btn-sweep inline-flex items-center gap-3 border-2 border-ink px-7 py-4 mono text-sm md:text-base uppercase tracking-[0.2em]"
          >
            <MailIcon className="w-4 h-4" />
            {profile.email}
          </a>
        </Reveal>

        <Reveal delay={200} className="mt-16 md:mt-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line">
            <a href={profile.github} target="_blank" rel="noreferrer" className="group bg-bg p-6 transition-colors hover:bg-accent-dim">
              <div className="flex items-center justify-between text-muted group-hover:text-accent transition-colors">
                <span className="mono text-xs uppercase tracking-[0.2em]">github</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
              <p className="mono mt-4 text-sm break-all">@brodante</p>
              <p className="mt-1 text-xs text-muted">{c.githubDesc}</p>
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="group bg-bg p-6 transition-colors hover:bg-accent-dim">
              <div className="flex items-center justify-between text-muted group-hover:text-accent transition-colors">
                <span className="mono text-xs uppercase tracking-[0.2em]">linkedin</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
              <p className="mono mt-4 text-sm break-all">/in/spsc</p>
              <p className="mt-1 text-xs text-muted">{c.linkedinDesc}</p>
            </a>
            <a href={`mailto:${profile.emailResearch}`} className="group bg-bg p-6 transition-colors hover:bg-accent-dim">
              <div className="flex items-center justify-between text-muted group-hover:text-accent transition-colors">
                <span className="mono text-xs uppercase tracking-[0.2em]">{c.researchLabel}</span>
                <MailIcon className="w-4 h-4" />
              </div>
              <p className="mono mt-4 text-sm break-all">{profile.emailResearch}</p>
              <p className="mt-1 text-xs text-muted">{c.researchDesc}</p>
            </a>
            <div className="bg-bg p-6">
              <div className="flex items-center justify-between text-muted">
                <span className="mono text-xs uppercase tracking-[0.2em]">{c.locationLabel}</span>
                <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-accent" />
              </div>
              <p className="mono mt-4 text-sm">
                {locale === "ja" ? profile.locationJa : profile.locationEn}
              </p>
              <p className="mt-1 text-xs text-muted">
                {c.localTime} <LocalTime />
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-5 md:px-10 py-6 md:flex-row md:items-center md:justify-between">
          <p className="mono text-xs text-muted">
            © 2026 {profile.name} · <GitHubIcon className="inline w-3.5 h-3.5 -mt-0.5" />{" "}
            <LinkedInIcon className="inline w-3.5 h-3.5 -mt-0.5" />
          </p>
          <p className="mono text-xs text-muted">{c.bottom}</p>
          <Link href="/#top" className="mono u-link text-xs uppercase tracking-[0.2em] text-muted hover:text-accent">
            {c.top}
          </Link>
        </div>
      </div>
    </footer>
  );
}
