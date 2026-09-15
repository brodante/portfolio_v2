"use client";

import { Hl, useI18n } from "@/i18n";
import { Reveal, Scramble } from "./motion";
import { ArrowDown, Chip, Marquee, SectionHeading } from "./ui";

/** Locale-aware marquee strip (client). */
export function HomeMarquee() {
  const { t } = useI18n();
  return <Marquee items={t.marquee} />;
}

/* ----------------------------------- hero ---------------------------------- */

export function Hero() {
  const { t } = useI18n();
  const h = t.hero;
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-16">
      <div className="grid-bg absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-[1280px] px-5 md:px-10">
        <Reveal variant="fade" className="flex items-center justify-between pt-8 md:pt-12">
          <p className="mono text-xs md:text-sm text-muted tracking-[0.18em] uppercase">
            <span className="text-accent">~/new-delhi</span> $ {h.cmd}
          </p>
          <p className="mono hidden sm:block text-xs text-muted tracking-[0.18em] uppercase">
            {h.ver}
          </p>
        </Reveal>

        <h1 className="display mt-10 md:mt-16 text-[clamp(2.9rem,10.5vw,9.75rem)]">
          <span className="block">
            <Scramble text="SURYA PRATAP" delay={150} />
          </span>
          <span className="block">
            <span className="outline-text">SINGH</span>{" "}
            <span className="serif-it text-accent normal-case tracking-tight">chauhan</span>
          </span>
        </h1>

        <div className="mt-10 md:mt-14 grid gap-10 lg:grid-cols-12 lg:items-end pb-14">
          <Reveal delay={200} className="lg:col-span-6">
            <p className="max-w-xl text-base md:text-lg text-muted leading-relaxed">
              <Hl text={h.intro} />
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a href="#work" className="btn-sweep border-2 border-ink px-6 py-3 mono text-xs uppercase tracking-[0.22em]">
                {h.ctaWork}
              </a>
              <a href="#research" className="u-link mono text-xs uppercase tracking-[0.22em] text-muted hover:text-ink">
                {h.ctaPapers}
              </a>
            </div>
          </Reveal>

          <Reveal delay={320} className="lg:col-span-6">
            <div className="glass border border-line p-5 md:p-6 max-w-lg lg:ml-auto">
              <div className="flex items-center gap-1.5 border-b border-line pb-3">
                <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
                <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
                <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                <span className="mono ml-3 text-[11px] text-muted">spsc@delhi — zsh</span>
              </div>
              <div className="mono mt-4 space-y-2.5 text-[12px] md:text-[13px] leading-relaxed">
                <p><span className="text-accent">$</span> whoami</p>
                <p className="text-muted">{h.termWho}</p>
                <p><span className="text-accent">$</span> cat ./currently.txt</p>
                <p className="text-muted">{h.termCurrent}</p>
                <p><span className="text-accent">$</span> ls ./proof</p>
                <p className="text-muted">{h.termProof}</p>
                <p>
                  <span className="text-accent">$</span> ./status --now
                  <span className="cursor-blink text-accent"> ▍</span>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal variant="fade" className="relative mx-auto w-full max-w-[1280px] px-5 md:px-10 pb-6">
        <div className="flex items-center justify-between text-muted">
          <span className="mono text-[11px] uppercase tracking-[0.2em]">{h.scroll}</span>
          <span className="float-slow text-accent"><ArrowDown className="w-4 h-4" /></span>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------------------------- about ---------------------------------- */

export function About() {
  const { t } = useI18n();
  const a = t.about;
  return (
    <section id="about" className="mx-auto max-w-[1280px] px-5 md:px-10 py-24 md:py-36">
      <SectionHeading num="01" title={a.title} note={a.note} />
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="text-xl md:text-3xl leading-snug md:leading-snug font-medium">
              <Hl
                text={a.lead}
                hlClass="serif-it text-accent text-2xl md:text-4xl"
              />
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 max-w-xl text-muted leading-relaxed">{a.p1}</p>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-muted leading-relaxed">{a.p2}</p>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line">
            {a.stats.map((s, i) => (
              <Reveal key={s.l} delay={i * 80} className="bg-bg">
                <div className="p-5 md:p-6 h-full">
                  <p className="display text-3xl md:text-4xl text-accent">{s.n}</p>
                  <p className="mono mt-2 text-[11px] uppercase tracking-[0.14em] text-muted">{s.l}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={150}>
            <div className="glass border border-line p-6 md:p-8">
              <p className="mono text-xs uppercase tracking-[0.25em] text-accent">// {a.eduLabel}</p>
              <div className="mt-6 space-y-7">
                {a.education.map((e) => (
                  <div key={e.school} className="border-l-2 border-line pl-5 transition-colors hover:border-accent">
                    <p className="font-semibold leading-tight">{e.school}</p>
                    <p className="serif-it mt-1 text-muted text-lg">{e.degree}</p>
                    <p className="mono mt-2 text-[11px] uppercase tracking-[0.14em] text-muted">
                      {e.place} · {e.period}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mono mt-10 text-xs uppercase tracking-[0.25em] text-accent">// {a.focusLabel}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {a.focus.map((f) => (
                  <Chip key={f}>{f}</Chip>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- experience -------------------------------- */

export function Experience() {
  const { t } = useI18n();
  const x = t.experience;
  return (
    <section id="experience" className="mx-auto max-w-[1280px] px-5 md:px-10 py-24 md:py-36">
      <SectionHeading num="02" title={x.title} note={x.note} />
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p className="max-w-xs text-muted">{x.sticky}</p>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-8">
          {x.entries.map((xp, i) => (
            <Reveal key={xp.company} delay={i * 100}>
              <article className="group border-t-2 border-line py-10 md:py-12 transition-colors hover:border-accent">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="display text-2xl md:text-4xl">{xp.role}</h3>
                  <p className="mono text-xs md:text-sm text-muted tracking-[0.14em]">{xp.period}</p>
                </div>
                <p className="mono mt-3 text-sm text-accent">
                  {xp.company} <span className="text-muted">· {xp.place}</span>
                </p>
                <p className="serif-it mt-4 text-lg md:text-xl text-muted">{xp.summary}</p>
                <ul className="mt-6 space-y-3">
                  {xp.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-sm md:text-base text-muted leading-relaxed">
                      <span className="mono text-accent mt-0.5 shrink-0">▸</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {xp.tags.map((tag) => (
                    <Chip key={tag}>{tag}</Chip>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
