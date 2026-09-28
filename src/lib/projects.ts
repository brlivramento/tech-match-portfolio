import { isFullPage } from "@notionhq/client";
import type { Project } from "@/data/projects";
import { getNotionClient } from "@/lib/notion";

type NotionFile = {
  file?: { url: string };
  external?: { url: string };
};

type NotionProperty = {
  title?: Array<{ plain_text: string }>;
  rich_text?: Array<{ plain_text: string }>;
  select?: { name: string } | null;
  number?: number | null;
  files?: NotionFile[];
  relation?: Array<{ id: string }>;
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

  return [...(property.title ?? []), ...(property.rich_text ?? [])]
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

function getCoverImageUrl(properties: NotionProperties): string | undefined {
  const file = properties["Cover Image"]?.files?.[0];

  return file?.file?.url ?? file?.external?.url;
}

function getTechnologyIds(properties: NotionProperties): string[] {
  return properties.Technologies?.relation?.map((item) => item.id) ?? [];
}

function getProjectsDataSourceId(): string {
  const value = process.env.NOTION_PROJECTS_DATA_SOURCE_ID;

  if (!value) {
    throw new Error(
      "Missing required environment variable: NOTION_PROJECTS_DATA_SOURCE_ID",
    );
  }

  return value;
}

export async function getProjects(): Promise<Project[]> {
  const response = await getNotionClient().dataSources.query({
    data_source_id: getProjectsDataSourceId(),
    filter: {
      property: "Visible",
      checkbox: {
        equals: true,
      },
    },
    page_size: 100,
  });

  return response.results
    .filter(isFullPage)
    .map((page) => {
      const properties = page.properties as unknown as NotionProperties;

      return {
        id: page.id,
        name: getText(properties, "Name"),
        company: getSelect(properties, "Company"),
        startYear: getNumber(properties, "Start Year"),
        endYear: getNumber(properties, "End Year"),
        description: getText(properties, "Description"),
        coverImageUrl: getCoverImageUrl(properties),
        technologyIds: getTechnologyIds(properties),
      };
    })
    .filter((project) => project.name.length > 0);
}