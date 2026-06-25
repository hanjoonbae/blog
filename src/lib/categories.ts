export const CATEGORY_IDS = ['aws', 'databricks', 'study', 'builds', 'papers'] as const;

export type CategoryId = (typeof CATEGORY_IDS)[number];

export const CATEGORIES: Array<{ id: CategoryId; label: string; description: string }> = [
  { id: 'about', label: 'About', description: '' },
  { id: 'aws', label: 'AWS', description: '' },
  { id: 'databricks', label: 'Databricks', description: '' },
  { id: 'study', label: 'Study', description: '' },
  { id: 'builds', label: 'Builds', description: '' },
  { id: 'papers', label: 'Papers', description: '' },
];

export function getCategory(id: string) {
  return CATEGORIES.find((category) => category.id === id);
}
