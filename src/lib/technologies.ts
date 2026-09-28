import { isFullPage } from "@notionhq/client";
import type { Technology, TechnologyLevel } from "@/data/technologies";
import {
  getNotionClient,
  getNotionTechnologiesDataSourceId,
} from "@/lib/notion";

type NotionProperty = {
  title?: Array<{ plain_text: string }>;
  rich_text?: Array<{ plain_text: string }>;
  select?: { name: string } | null;
  checkbox?: boolean;
  number?: number | null;
};

type NotionProperties = Record<string, NotionProperty>;

function getText(
  properties: NotionProperties,
  propertyName: string,
): string {
  const property = properties[propertyName];

  if (!property) {
    return "";
  }

  const title = property.title ?? [];
  const richText = property.rich_text ?? [];

  return [...title, ...richText]
    .map((item) => item.plain_text)
    .join("");
}

function getSelect(
  properties: NotionProperties,
  propertyName: string,
): string {
  return properties[propertyName]?.select?.name ?? "";
}

function getNumber(
  properties: NotionProperties,
  propertyName: string,
): number | undefined {
  return properties[propertyName]?.number ?? undefined;
}

function normalizeLevel(value: string): TechnologyLevel {
  const normalizedValue = value.toLowerCase();

  if (normalizedValue === "professional") {
    return "professional";
  }

  if (normalizedValue === "practical") {
    return "practical";
  }

  return "knowledge";
}

export async function getTechnologies(): Promise<Technology[]> {
  const response = await getNotionClient().dataSources.query({
    data_source_id: getNotionTechnologiesDataSourceId(),
    filter: {
      property: "Visible",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "Name",
        direction: "ascending",
      },
    ],
    page_size: 100,
  });

  return response.results
    .filter(isFullPage)
    .map((page) => {
      const properties = page.properties as unknown as NotionProperties;

      return {
        id: page.id,
        name: getText(properties, "Name"),
        category: getSelect(properties, "Category") || "Other",
        level: normalizeLevel(getSelect(properties, "Level")),
        iconKey: getText(properties, "Icon Key"),
        years: getNumber(properties, "Years"),
        notes: getText(properties, "Notes"),
      };
    })
    .filter((technology) => technology.name.length > 0);
}
