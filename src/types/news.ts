export interface NewsItem {
  title: string;
  url: string;
  hot?: number;
}

export interface NewsSection {
  title: string;
  subtitle?: string;
  icon?: string;
  list: NewsItem[];
}
