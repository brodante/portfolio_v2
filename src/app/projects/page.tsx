import type { Metadata } from "next";
import { ProjectsIndexBody } from "@/components/sections-bottom";

export const metadata: Metadata = {
  title: "Projects — Surya Pratap Singh Chauhan",
  description:
    "Case files: KryptBoard, KanjiWidgets, KeyGuardian, Chinatsu and the Knowledge Base. / ケースファイル一覧",
};

export default function ProjectsIndex() {
  return <ProjectsIndexBody />;
}
