# Tech Match Portfolio

Interactive portfolio designed for technical interviews.

Select the technologies required by a job opportunity and instantly view the projects that match your experience.

## Stack

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## Architecture

```mermaid
flowchart LR
    A[Select technologies] --> B[Open Projects]
    B --> C[Filter matching projects]
    C --> D[Present project details]
    N[Notion databases] --> A
    N --> C
```

<img width="1366" height="828" alt="Captura de tela 2026-09-28 011424" src="https://github.com/user-attachments/assets/f404b5da-9a2f-4959-b6cf-f2ec4f8470db" />

<img width="1424" height="641" alt="Captura de tela 2026-09-28 011246" src="https://github.com/user-attachments/assets/154ea54e-d24c-4e6e-b0ff-bf413c2db9eb" />

## Features

### Technologies

- Loads technologies from a Notion database
- Search technologies by name
- Select multiple technologies
- Highlights selected technologies with a marker-style visual effect
- Clears the current selection

### Projects

- Loads projects from a Notion database
- Displays projects in a responsive grid
- Filters projects according to selected technologies
- Highlights the matching technologies in each project
- Opens a modal with description, image, period, company, and full stack

## Notion setup

The application uses two Notion databases.

### Technologies database

| Property | Type |
|---|---|
| Name | Title |
| Category | Select |
| Level | Select |
| Icon Key | Text |
| Years | Number |
| Notes | Text |
| Visible | Checkbox |

### Projects database

| Property | Type |
|---|---|
| Name | Title |
| Company | Select |
| Start Year | Number |
| End Year | Number |
| Cover Image | Files & media |
| Description | Text |
| Technologies | Relation with Technologies |
| Visible | Checkbox |

Both databases must be shared with the Notion integration used by the application.

## Run locally

#### 1. Create your environment file

```bash
cp .env.example .env
```

#### 2. Configure the required values

```env
APP_TITLE=Your Name | Portfolio

NOTION_API_KEY=
NOTION_TECHNOLOGIES_DATA_SOURCE_ID=
NOTION_PROJECTS_DATA_SOURCE_ID=
```

#### 3. Start the application

```bash
docker compose up --build
```

- Application: `http://localhost:3000`

## Project structure

```text
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── portfolio-presentation.tsx
├── data/
│   ├── projects.ts
│   └── technologies.ts
└── lib/
    ├── notion.ts
    ├── projects.ts
    └── technologies.ts
```