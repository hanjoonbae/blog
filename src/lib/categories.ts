export const CATEGORY_IDS = ['study', 'builds', 'papers', 'media'] as const;

export type CategoryId = (typeof CATEGORY_IDS)[number];
export type CategoryNavId = CategoryId | 'about';

export const CATEGORIES: Array<{ id: CategoryNavId; label: string; description: string; href: string }> = [
  { id: 'study', label: 'Study', description: '', href: '/categories/study/' },
  { id: 'builds', label: 'Builds', description: '', href: '/categories/builds/' },
  { id: 'papers', label: 'Papers', description: '', href: '/categories/papers/' },
  { id: 'media', label: 'Media', description: '', href: '/categories/media/' },
];

export function getCategory(id: string) {
  return CATEGORIES.find((category) => category.id === id);
}
