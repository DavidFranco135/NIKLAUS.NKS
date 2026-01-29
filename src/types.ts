
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'REPRESENTATIVE' | 'ADMIN';
  cnpjs: CNPJ[];
}

export interface CNPJ {
  id: string;
  name: string; // Nome Fantasia
  razao_social?: string; 
  number: string; // CNPJ ou CPF principal
  cpf_responsavel?: string; // Exigido pela Tray para B2B
  distributor: string;
  email_contato?: string;
  telefone?: string;
  cep?: string;
  logradouro?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  complemento?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  cnpjId: string;
  cnpjNumber: string;
  date: string;
  total: number;
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'CANCELLED';
  paymentLink?: string;
  items: CartItem[];
}

export interface NewsPost {
  id: string;
  title: string;
  content: string;
  date: string;
  imageUrl?: string;
}
