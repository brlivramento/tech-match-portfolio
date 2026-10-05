import { MermaidDiagram } from "./mermaid-diagram";

type ProjectDescriptionProps = {
  description: string;
};

export function ProjectDescription({
  description,
}: ProjectDescriptionProps) {
  const parts = description.split(
    /\[mermaid\]\s*([\s\S]*?)\s*\[\/mermaid\]/gi
  );

  return (
    <div className="project-description">
      {parts.map((part, index) => {
        const isMermaid = index % 2 === 1;

        if (!part.trim()) {
          return null;
        }

        if (isMermaid) {
          return (
            <MermaidDiagram
              key={index}
              chart={part.trim()}
            />
          );
        }

        return <p key={index}>{part.trim()}</p>;
      })}
    </div>
  );
}