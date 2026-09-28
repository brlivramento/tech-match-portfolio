"use client";

import { useMemo, useState } from "react";
import {
  FiCode,
  FiFolder,
  FiGrid,
  FiSearch,
  FiX,
} from "react-icons/fi";
import type { Project } from "@/data/projects";
import type { Technology } from "@/data/technologies";

type PortfolioPresentationProps = {
  technologies: Technology[];
  projects: Project[];
};

type ActiveTab = "technologies" | "projects";

export function PortfolioPresentation({
  technologies,
  projects,
}: PortfolioPresentationProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("technologies");
  const [search, setSearch] = useState("");
  const [selectedTechnologyIds, setSelectedTechnologyIds] = useState<string[]>(
    [],
  );
  const [openedProject, setOpenedProject] = useState<Project | null>(null);

  const filteredTechnologies = useMemo(() => {
    return technologies.filter((technology) =>
      technology.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, technologies]);

  const filteredProjects = useMemo(() => {
    if (selectedTechnologyIds.length === 0) {
      return projects;
    }

    return projects.filter((project) =>
      project.technologyIds.some((technologyId) =>
        selectedTechnologyIds.includes(technologyId),
      ),
    );
  }, [projects, selectedTechnologyIds]);

  function toggleTechnology(id: string) {
    setSelectedTechnologyIds((currentIds) =>
      currentIds.includes(id)
        ? currentIds.filter((currentId) => currentId !== id)
        : [...currentIds, id],
    );
  }

  function clearSelection() {
    setSelectedTechnologyIds([]);
  }

  function getProjectTechnologies(project: Project) {
    return technologies.filter((technology) =>
      project.technologyIds.includes(technology.id),
    );
  }

  function isTechnologySelected(technologyId: string) {
    return selectedTechnologyIds.includes(technologyId);
  }

  return (
    <main>
      <header className="app-header">
        <div
          className={`selection-summary ${
            activeTab === "projects" ? "is-hidden" : ""
          }`}
        >
          <strong>{selectedTechnologyIds.length}</strong>
          <span>stacks</span>
        </div>
      </header>

      <nav className="tabs" aria-label="Portfolio navigation">
        <button
          className={activeTab === "technologies" ? "is-active" : ""}
          type="button"
          onClick={() => setActiveTab("technologies")}
        >
          <FiGrid aria-hidden="true" />
          Tecnologias
        </button>

        <button
          className={activeTab === "projects" ? "is-active" : ""}
          type="button"
          onClick={() => setActiveTab("projects")}
        >
          <FiFolder aria-hidden="true" />
          Projetos
        </button>
      </nav>

      {activeTab === "technologies" && (
        <>
          <section className="toolbar">
            <label className="search-field">
              <FiSearch aria-hidden="true" />
              <input
                type="search"
                placeholder="Buscar tecnologia..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>

            <button
              type="button"
              onClick={clearSelection}
              disabled={selectedTechnologyIds.length === 0}
            >
              <FiX aria-hidden="true" />
              Limpar seleção
            </button>
          </section>

          {filteredTechnologies.length > 0 ? (
            <section className="technology-grid" aria-label="Tecnologias">
              {filteredTechnologies.map((technology) => {
                const isSelected = isTechnologySelected(technology.id);

                return (
                  <button
                    className={`technology-badge ${
                      isSelected ? "is-selected" : ""
                    }`}
                    key={technology.id}
                    type="button"
                    onClick={() => toggleTechnology(technology.id)}
                    aria-pressed={isSelected}
                  >
                    <span className="technology-header">
                      <FiCode className="technology-icon" aria-hidden="true" />
                      <span className="technology-name">{technology.name}</span>
                    </span>

                    <span className="technology-category">
                      {technology.category}
                    </span>
                  </button>
                );
              })}
            </section>
          ) : (
            <section className="empty-state">
              <FiCode aria-hidden="true" />
              <h2>Nenhuma tecnologia encontrada</h2>
              <p>Confira os registros visíveis no database Technologies.</p>
            </section>
          )}
        </>
      )}

      {activeTab === "projects" && (
        <>
          <section className="projects-heading">
            <div>
              <p className="eyebrow">PROJECT EXPERIENCE</p>
            </div>

            <span>{filteredProjects.length} projects</span>
          </section>

          {filteredProjects.length > 0 ? (
            <section className="project-grid" aria-label="Projetos">
              {filteredProjects.map((project) => {
                const projectTechnologies = getProjectTechnologies(project);

                return (
                  <button
                    className="project-card"
                    key={project.id}
                    type="button"
                    onClick={() => setOpenedProject(project)}
                  >
                    <div className="project-cover">
                      {project.coverImageUrl ? (
                        <img src={project.coverImageUrl} alt="" />
                      ) : (
                        <FiFolder aria-hidden="true" />
                      )}
                    </div>

                    <div className="project-content">
                      <p className="project-company">{project.company}</p>
                      <h3>{project.name}</h3>

                      <p className="project-period">
                        {project.startYear ?? "—"} — {project.endYear ?? "Atual"}
                      </p>

                      <div className="project-technologies">
                        {projectTechnologies.slice(0, 5).map((technology) => (
                          <span
                            className={
                              isTechnologySelected(technology.id)
                                ? "is-match"
                                : ""
                            }
                            key={technology.id}
                          >
                            {technology.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                );
              })}
            </section>
          ) : (
            <section className="empty-state">
              <FiFolder aria-hidden="true" />
              <h2>Nenhum projeto encontrado</h2>
              <p>
                {selectedTechnologyIds.length > 0
                  ? "Nenhum projeto possui as tecnologias selecionadas."
                  : "Confira os registros visíveis no database Projects."}
              </p>
            </section>
          )}
        </>
      )}

      {openedProject && (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={() => setOpenedProject(null)}
        >
          <section
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              type="button"
              onClick={() => setOpenedProject(null)}
              aria-label="Fechar projeto"
            >
              <FiX />
            </button>

            {openedProject.coverImageUrl && (
              <div className="modal-cover">
                <img src={openedProject.coverImageUrl} alt="" />
              </div>
            )}

            <div className="modal-content">
              <p className="project-company">{openedProject.company}</p>
              <h2 id="project-modal-title">{openedProject.name}</h2>
              <p className="project-period">
                {openedProject.startYear ?? "—"} —{" "}
                {openedProject.endYear ?? "Atual"}
              </p>

              <p className="project-description">
                {openedProject.description}
              </p>

              <h3>Tecnologias utilizadas</h3>

              <div className="modal-technologies">
                {getProjectTechnologies(openedProject).map((technology) => (
                  <span
                    className={
                      isTechnologySelected(technology.id) ? "is-match" : ""
                    }
                    key={technology.id}
                  >
                    {technology.name}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}