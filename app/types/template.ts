export interface Template {
  id: number;
  image: string;
  title: string;
  websiteNo: number;
  description: string;
  tags: string[];
  category: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}