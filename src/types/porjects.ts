export interface Project {
  id: number;
  title: string;
  description: string;
  technologies?: string[];
  category_title?: string[];
  subtitle: string;
  clients: string;
  start_date: string;
  end_date: string;
  photo: string;
  is_key_highlight: boolean;
}
