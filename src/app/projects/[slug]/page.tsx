import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/data/projects";
import { ProjectDetailPageView } from "@/components/ProjectDetailPageView";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) {
    return { title: "Project Not Found — @jajangking" };
  }
  return {
    title: `${project.title} — @jajangking Master Porto`,
    description: project.tagline.en,
  };
}

export default async function ProjectSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = PROJECTS[index];
  const prevProject = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(index + 1) % PROJECTS.length];

  return (
    <ProjectDetailPageView
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  );
}
