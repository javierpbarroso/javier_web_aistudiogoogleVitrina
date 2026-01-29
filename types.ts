
export interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  whatsapp: string;
}

export type ViewMode = 'visitor' | 'admin';
