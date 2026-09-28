import { TechnologySelector } from "@/components/technology-selector";
import { getTechnologies } from "@/lib/technologies";

export const dynamic = "force-dynamic";

export default async function Home() {
  const technologies = await getTechnologies();

  return <TechnologySelector technologies={technologies} />;
}