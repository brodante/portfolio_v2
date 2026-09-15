"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useI18n } from "@/i18n";
import type { ProjectContent, SkillGroupKey } from "@/i18n/types";
import { Reveal } from "./motion";
import { ProjectVisual } from "./ProjectVisual";
import { ArrowRight, ArrowUpRight, Chip, SectionHeading } from "./ui";

/* ------------------------------- project rows ------------------------------ */

export function ProjectRow({ p, delay = 0 }: { p: ProjectContent; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <Link
        href={`/projects/${p.slug}`}
        className="row-sweep group grid grid-cols-12 items-center gap-4 border-t border-line py-8 md:py-10 px-2 md:px-4"
      >
        <span className="col-span-2 md:col-span-1 mono text-sm text-muted group-hover:text-accent transition-colors">
          /{p.num}
        </span>
        <div className="col-span-10 md:col-span-7">
          <h3 className="display text-2xl md:text-5xl">
            <span className="glitch" data-text={p.title}>{p.title}</span>
          </h3>
          <p className="mt-2 text-sm md:text-base text-muted max-w-xl">{p.tagline}</p>
        </div>
        <div className="hidden md:block md:col-span-3">
          <p className="mono text-[11px] uppercase tracking-[0.16em] text-muted">{p.year}</p>
          <p className="mono mt-1 text-[11px] uppercase tracking-[0.16em] text-accent">{p.status}</p>
        </div>
        <div className="hidden md:flex md:col-span-1 justify-end">
          <span className="grid h-11 w-11 place-items-center border border-line text-muted transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink group-hover:rotate-45">
            <ArrowUpRight />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export function ProjectsSection() {
  const { t } = useI18n();
  return (
    <section id="work" className="mx-auto max-w-[1280px] px-5 md:px-10 py-24 md:py-36">
      <SectionHeading num="03" title={t.work.title} note={t.work.note} />
      <div className="border-b border-line">
        {t.projects.map((p, i) => (
          <ProjectRow key={p.slug} p={p} delay={i * 60} />
        ))}
      </div>
      <Reveal className="mt-8 flex justify-end">
        <Link
          href="/projects"
          className="u-link inline-flex items-center gap-2 mono text-xs uppercase tracking-[0.22em] text-muted hover:text-accent"
        >
          {t.work.viewAll} <ArrowRight className="w-4 h-4" />
        </Link>
      </Reveal>
    </section>
  );
}

/* --------------------------------- research -------------------------------- */

export function ResearchSection() {
  const { t } = useI18n();
  return (
    <section id="research" className="mx-auto max-w-[1280px] px-5 md:px-10 py-24 md:py-36">
      <SectionHeading num="04" title={t.research.title} note={t.research.note} />
      <div className="border-b border-line">
        {t.research.pubs.map((pub, i) => (
          <Reveal key={pub.doi} delay={i * 70}>
            <article className="group grid gap-3 md:grid-cols-12 border-t border-line py-8 md:py-10 px-2 md:px-4 transition-colors hover:bg-accent-dim/40">
              <p className="mono md:col-span-2 text-sm text-muted tracking-[0.12em]">{pub.date}</p>
              <div className="md:col-span-7">
                <h3 className="font-semibold text-lg md:text-2xl leading-snug group-hover:text-accent transition-colors">
                  {pub.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{pub.venue} · {t.research.coauthored}</p>
              </div>
              <div className="md:col-span-3 md:text-right">
                <a
                  href={pub.doi}
                  target="_blank"
                  rel="noreferrer"
                  className="u-link mono inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-accent"
                >
                  doi ↗
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------------- goals --------------------------------- */

export function GoalsSection() {
  const { t } = useI18n();
  return (
    <section id="goals" className="mx-auto max-w-[1280px] px-5 md:px-10 py-24 md:py-36">
      <SectionHeading num="05" title={t.goals.title} note={t.goals.note} />
      <div className="grid gap-4 md:grid-cols-2">
        {t.goals.items.map((g, i) => (
          <Reveal key={g.title} delay={i * 80}>
            <div className="tilt-card glass h-full border border-line p-7 md:p-9">
              <p className="mono text-xs text-accent tracking-[0.25em]">/0{i + 1}</p>
              <h3 className="display mt-4 text-2xl md:text-3xl">{g.title}</h3>
              <p className="mt-4 text-muted leading-relaxed">{g.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------- skills --------------------------------- */

const spanFor: Record<SkillGroupKey, string> = {
  languages: "col-span-2",
  security: "col-span-2",
  frameworks: "col-span-2 md:col-span-1",
  dev: "col-span-2 md:col-span-1",
  spoken: "col-span-2",
  style: "col-span-2 md:col-span-4",
};

export function SkillsSection() {
  const { t } = useI18n();
  const s = t.skills;
  return (
    <section id="skills" className="mx-auto max-w-[1280px] px-5 md:px-10 py-24 md:py-36">
      <SectionHeading num="06" title={s.title} note={s.note} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {s.groups.map((g, i) => (
          <Reveal key={g.key} delay={i * 60} className={spanFor[g.key]}>
            <div className="tilt-card glass h-full border border-line p-6 md:p-7">
              <p className="mono text-xs uppercase tracking-[0.25em] text-accent">// {g.label}</p>
              {g.key === "languages" ? (
                <p className="display mt-5 text-2xl md:text-[2rem] leading-tight">
                  {g.items.map((it, j) => (
                    <span key={it}>
                      {j > 0 && <span className="text-accent"> · </span>}
                      {it}
                    </span>
                  ))}
                </p>
              ) : g.key === "style" ? (
                <p className="serif-it mt-4 text-xl md:text-2xl text-muted leading-relaxed">
                  {g.items.join(" · ")}
                </p>
              ) : g.key === "spoken" ? (
                <ul className="mt-5 space-y-2.5">
                  {g.items.map((it) => {
                    const [lang, level] = it.split(" — ");
                    return (
                      <li key={it} className="flex items-baseline justify-between gap-3 border-b border-line pb-2">
                        <span className="font-semibold">{lang}</span>
                        <span className="mono text-[11px] uppercase tracking-[0.12em] text-muted">{level}</span>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="mt-5 flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <Chip key={it}>{it}</Chip>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120} className="mt-12">
        <p className="mono text-xs uppercase tracking-[0.25em] text-accent">// {s.certLabel}</p>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-px bg-line border border-line">
          {s.certs.map((c) => (
            <div key={c.name} className="group bg-bg px-5 py-4 flex items-baseline justify-between gap-4 transition-colors hover:bg-accent-dim">
              <span className="text-sm md:text-base">{c.name}</span>
              <span className="mono shrink-0 text-[11px] uppercase tracking-[0.16em] text-muted group-hover:text-accent transition-colors">
                {c.issuer}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------- projects index (client) ------------------------- */

export function ProjectsIndexBody() {
  const { t } = useI18n();
  return (
    <section className="mx-auto max-w-[1280px] px-5 md:px-10 pt-32 md:pt-40 pb-24 md:pb-36">
      <Reveal className="flex items-center justify-between">
        <p className="mono text-xs md:text-sm text-accent tracking-[0.25em]">~/projects $ ls -la</p>
        <Link href="/" className="u-link mono text-xs uppercase tracking-[0.2em] text-muted hover:text-accent">
          {t.indexPage.backHome}
        </Link>
      </Reveal>
      <Reveal variant="mask" delay={80}>
        <h1 className="display mt-4 text-[clamp(2.8rem,9vw,7.5rem)]">
          {t.indexPage.title1}
          <span className="serif-it text-accent normal-case">{t.indexPage.title2}</span>
        </h1>
      </Reveal>
      <Reveal delay={140}>
        <p className="mt-6 max-w-xl text-muted">{t.indexPage.intro}</p>
      </Reveal>
      <div className="mt-14 border-b border-line">
        {t.projects.map((p, i) => (
          <ProjectRow key={p.slug} p={p} delay={i * 60} />
        ))}
      </div>
    </section>
  );
}

/* --------------------------- case file (client) ---------------------------- */

export function CaseFile({ slug }: { slug: string }) {
  const { t } = useI18n();
  const router = useRouter();
  const p = t.projects.find((x) => x.slug === slug);
  if (!p) return null;
  const idx = t.projects.findIndex((x) => x.slug === slug);
  const len = t.projects.length;
  const next = t.projects[(idx + 1) % len];
  const prev = t.projects[(idx - 1 + len) % len];
  const cf = t.caseFile;

  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) router.back();
    else router.push("/projects");
  };

  return (
    <article className="mx-auto max-w-[1280px] px-5 md:px-10 pt-28 md:pt-36 pb-24">
      <Reveal variant="fade" className="flex items-center justify-between">
        <p className="mono text-xs md:text-sm text-muted tracking-[0.18em]">
          <span className="text-accent">~/projects</span> $ open {p.slug}
        </p>
        <div className="flex items-center gap-5">
          <button
            onClick={goBack}
            className="u-link mono text-xs uppercase tracking-[0.2em] text-muted hover:text-accent"
          >
            ← {cf.back}
          </button>
          <Link
            href="/projects"
            className="u-link mono text-xs uppercase tracking-[0.2em] text-muted hover:text-accent"
          >
            {cf.all}
          </Link>
        </div>
      </Reveal>

      <Reveal variant="fade" className="mt-10">
        <p className="mono text-xs md:text-sm text-accent tracking-[0.3em] uppercase">{p.codename}</p>
      </Reveal>
      <Reveal variant="mask" delay={80}>
        <h1 className="display mt-4 text-[clamp(2.6rem,9vw,7.5rem)]">{p.title}</h1>
      </Reveal>
      <Reveal delay={140}>
        <p className="serif-it mt-5 max-w-2xl text-xl md:text-2xl text-muted">{p.tagline}</p>
      </Reveal>

      <Reveal delay={180} className="mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line">
          <div className="bg-bg p-5">
            <p className="mono text-[11px] uppercase tracking-[0.2em] text-muted">{cf.timeline}</p>
            <p className="mono mt-2 text-sm text-ink">{p.year}</p>
          </div>
          <div className="bg-bg p-5">
            <p className="mono text-[11px] uppercase tracking-[0.2em] text-muted">{cf.status}</p>
            <p className="mono mt-2 text-sm text-accent">{p.status}</p>
          </div>
          <div className="bg-bg p-5 col-span-2">
            <p className="mono text-[11px] uppercase tracking-[0.2em] text-muted">{cf.links}</p>
            <div className="mt-2 flex flex-wrap gap-4">
              {p.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="u-link mono inline-flex items-center gap-1 text-sm text-accent"
                >
                  {l.label} <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={220} className="mt-6">
        <ProjectVisual kind={p.visual} className="h-[240px] md:h-[380px]" />
      </Reveal>

      <Reveal className="mt-6 flex flex-wrap gap-2">
        {p.stack.map((sItem) => (
          <Chip key={sItem}>{sItem}</Chip>
        ))}
      </Reveal>

      <div className="mt-16 md:mt-24 grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="mono text-xs uppercase tracking-[0.25em] text-accent">// {cf.problem}</p>
            <p className="mt-5 text-lg md:text-xl leading-relaxed">{p.problem}</p>
          </Reveal>
          {p.publication && (
            <Reveal delay={120} className="mt-10">
              <div className="glass border border-line border-l-2 border-l-accent p-6">
                <p className="mono text-[11px] uppercase tracking-[0.2em] text-accent">⌁ {cf.peer}</p>
                <p className="mt-3 font-semibold leading-snug">{p.publication.title}</p>
                <p className="mono mt-3 text-xs text-muted">{p.publication.venue}</p>
                <a
                  href={p.publication.doi}
                  target="_blank"
                  rel="noreferrer"
                  className="u-link mono mt-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-accent"
                >
                  {cf.readPaper}
                </a>
              </div>
            </Reveal>
          )}
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="mono text-xs uppercase tracking-[0.25em] text-accent">// {cf.built}</p>
            <ul className="mt-5 space-y-4">
              {p.built.map((b) => (
                <li key={b} className="flex gap-3 leading-relaxed text-muted">
                  <span className="mono text-accent mt-0.5 shrink-0">▸</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120} className="mt-12">
            <p className="mono text-xs uppercase tracking-[0.25em] text-accent">// {cf.impact}</p>
            <ul className="mt-5 space-y-4">
              {p.impact.map((b) => (
                <li key={b} className="flex gap-3 leading-relaxed text-muted">
                  <span className="mono text-accent mt-0.5 shrink-0">✦</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <Reveal className="mt-24 md:mt-32">
        <div className="grid md:grid-cols-2 gap-px bg-line border border-line">
          <Link href={`/projects/${prev.slug}`} className="group bg-bg p-6 md:p-8 transition-colors hover:bg-accent-dim">
            <p className="mono text-xs uppercase tracking-[0.25em] text-muted">← {cf.prev}</p>
            <p className="display mt-3 text-2xl md:text-4xl group-hover:text-accent transition-colors">
              {prev.title}
            </p>
          </Link>
          <Link href={`/projects/${next.slug}`} className="group bg-bg p-6 md:p-8 transition-colors hover:bg-accent-dim md:text-right">
            <p className="mono text-xs uppercase tracking-[0.25em] text-muted">{cf.next} →</p>
            <p className="display mt-3 text-2xl md:text-4xl group-hover:text-accent transition-colors">
              {next.title}
            </p>
          </Link>
        </div>
      </Reveal>
    </article>
  );
}
