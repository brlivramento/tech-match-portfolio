import { Client } from "@notionhq/client";

function getRequiredEnvironmentVariable(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getNotionClient(): Client {
  return new Client({
    auth: getRequiredEnvironmentVariable("NOTION_API_KEY"),
  });
}

export function getNotionTechnologiesDataSourceId(): string {
  return getRequiredEnvironmentVariable(
    "NOTION_TECHNOLOGIES_DATA_SOURCE_ID"
  );
}