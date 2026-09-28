"use client";

import { useMemo, useState } from "react";
import { FiCode, FiSearch, FiX } from "react-icons/fi";
import type { Technology } from "@/data/technologies";

type TechnologySelectorProps = {
  technologies: Technology[];
};

export function TechnologySelector({
  technologies,
}: TechnologySelectorProps) {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredTechnologies = useMemo(() => {
    return technologies.filter((technology) =>
      technology.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, technologies]);

  function toggleTechnology(id: string) {
    setSelectedIds((currentIds) =>
      currentIds.includes(id)
        ? currentIds.filter((currentId) => currentId !== id)
        : [...currentIds, id],
    );
  }

  function clearSelection() {
    setSelectedIds([]);
  }

  return (
    <main>
      <header>
        <div>
          <p className="eyebrow">INTERVIEW PORTFOLIO</p>
          <h1>Technology Match</h1>
          <p className="subtitle">
            Selecione as tecnologias da vaga e encontre os projetos compatíveis.
          </p>
        </div>

        <div className="selection-summary">
          <strong>{selectedIds.length}</strong>
          <span>selecionadas</span>
        </div>
      </header>

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
          disabled={selectedIds.length === 0}
        >
          <FiX aria-hidden="true" />
          Limpar seleção
        </button>
      </section>

      {filteredTechnologies.length > 0 ? (
        <section className="technology-grid" aria-label="Tecnologias">
          {filteredTechnologies.map((technology) => {
            const isSelected = selectedIds.includes(technology.id);

            return (
              <button
                className={`technology-badge ${isSelected ? "is-selected" : ""}`}
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
          <p>
            Confira se existem registros visíveis no database Technologies do
            Notion.
          </p>
        </section>
      )}
    </main>
  );
}
