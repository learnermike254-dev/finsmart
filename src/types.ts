export interface Article {
  id: string;
  title: string;
  slug: string;
  category: Category;
  summary: string;
  publishDate: string;
  author: string;
  imageUrl: string;
  content?: string; // HTML content, potentially generated
  isGenerated?: boolean;
}

export type Category = 
  | 'Credit Cards'
  | 'Insurance'
  | 'Loans & Mortgages'
  | 'Investing & Retirement'
  | 'Budgeting & Apps';

export interface NavItem {
  label: string;
  path: string;
}

export interface AdUnitProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
  label?: string;
}
