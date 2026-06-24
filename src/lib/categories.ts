export const CATEGORY_IDS = ['aws', 'databricks', 'study', 'builds', 'papers'] as const;

export type CategoryId = (typeof CATEGORY_IDS)[number];

export const CATEGORIES: Array<{ id: CategoryId; label: string; description: string }> = [
  { id: 'aws', label: 'AWS', description: 'AWS certification, architecture, and operations notes.' },
  { id: 'databricks', label: 'Databricks', description: 'Databricks SQL, data engineering, and platform notes.' },
  { id: 'study', label: 'Study', description: 'What I am learning and organizing.' },
  { id: 'builds', label: 'Builds', description: 'Implementation logs, small tools, and experiments.' },
  { id: 'papers', label: 'Papers', description: 'Paper reviews and reading notes.' },
];

export function getCategory(id: string) {
  return CATEGORIES.find((category) => category.id === id);
}
