
import { Item, Category, ContactInfo } from './types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: '1', name: 'Electrónica' },
  { id: '2', name: 'Hogar' },
  { id: '3', name: 'Moda' },
  { id: '4', name: 'Deportes' }
];

export const INITIAL_ITEMS: Item[] = [
  {
    id: '1',
    name: 'Smartwatch Pro X',
    description: 'Reloj inteligente con monitor de ritmo cardíaco y GPS integrado.',
    price: 199.99,
    stock: 15,
    categoryId: '1',
    imageUrl: 'https://picsum.photos/seed/watch/400/300'
  },
  {
    id: '2',
    name: 'Cafetera Espresso Premium',
    description: 'Prepara el mejor café en casa con esta máquina profesional.',
    price: 249.50,
    stock: 8,
    categoryId: '2',
    imageUrl: 'https://picsum.photos/seed/coffee/400/300'
  },
  {
    id: '3',
    name: 'Zapatillas Running Air',
    description: 'Máxima comodidad y amortiguación para tus entrenamientos diarios.',
    price: 85.00,
    stock: 24,
    categoryId: '4',
    imageUrl: 'https://picsum.photos/seed/shoes/400/300'
  }
];

export const INITIAL_CONTACT: ContactInfo = {
  phone: '+52 123 456 7890',
  email: 'contacto@vitrina.com',
  whatsapp: '521234567890'
};

export const ADMIN_PASSWORD = 'admin123';
