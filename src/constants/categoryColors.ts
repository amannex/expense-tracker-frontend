export interface CategoryColor {
  text: string;
  background: string;
}

export const CATEGORY_COLORS: Record<string, CategoryColor> = {
  Food: { text: '#2563eb', background: '#eaf2ff' },
  Transportation: { text: '#6366f1', background: '#eef2ff' },
  Entertainment: { text: '#8b5cf6', background: '#f3edff' },
  Housing: { text: '#0f766e', background: '#e6f7f4' },
  Utilities: { text: '#0891b2', background: '#e8f8fb' },
  Healthcare: { text: '#4f46e5', background: '#eef0ff' },
  Education: { text: '#64748b', background: '#f1f5f9' },
  Shopping: { text: '#0e7490', background: '#e8f7fb' },
  Travel: { text: '#059669', background: '#e7f8f0' },
  Other: { text: '#475569', background: '#f1f5f9' },
};

export const DEFAULT_CATEGORY_COLOR: CategoryColor = {
  text: '#475569',
  background: '#f1f5f9',
};
