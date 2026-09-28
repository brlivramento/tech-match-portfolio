import { PortfolioPresentation } from "@/components/portfolio-presentation";
import { getProjects } from "@/lib/projects";
import { getTechnologies } from "@/lib/technologies";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [technologies, projects] = await Promise.all([
    getTechnologies(),
    getProjects(),
  ]);

  return (
    <PortfolioPresentation
      technologies={technologies}
      projects={projects}
    />
  );
}