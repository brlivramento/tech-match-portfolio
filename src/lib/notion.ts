import { Client } from "@notionhq/client";

function getRequiredEnvironmentVariable(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const notion = new Client({
  auth: getRequiredEnvironmentVariable("NOTION_API_KEY"),
});

export const notionTechnologiesDataSourceId =
  getRequiredEnvironmentVariable("NOTION_TECHNOLOGIES_DATA_SOURCE_ID");
