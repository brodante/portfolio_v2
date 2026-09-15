import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseFile } from "@/components/sections-bottom";
import { en } from "@/i18n/en";

export function generateStaticParams() {
  return en.projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = en.projects.find((x) => x.slug === slug);
  if (!p) return { title: "Not found" };
  return { title: `${p.title} — Surya Pratap Singh Chauhan`, description: p.tagline };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!en.projects.some((x) => x.slug === slug)) notFound();
  return <CaseFile slug={slug} />;
}
