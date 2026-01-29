
import { Product, Order, CNPJ, User, NewsPost } from '../types';

export const INITIAL_MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Suco Natural Integral 1L', price: 12.50, stock: 150, category: 'Bebidas', image: 'https://images.unsplash.com/photo-1621506289937-4c721a31a886?auto=format&fit=crop&q=80&w=400' },
  { id: '2', name: 'Barra de Cereal Eco 12un', price: 45.90, stock: 80, category: 'Snacks', image: 'https://images.unsplash.com/photo-1622484211148-7163014aa0c9?auto=format&fit=crop&q=80&w=400' },
  { id: '3', name: 'Granola Artesanal 500g', price: 22.00, stock: 45, category: 'Grãos', image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&q=80&w=400' },
  { id: '4', name: 'Água Mineral 500ml', price: 2.50, stock: 1000, category: 'Bebidas', image: 'https://images.unsplash.com/photo-1560023907-5f339617ea30?auto=format&fit=crop&q=80&w=400' },
  { id: '5', name: 'Chips de Batata Doce 100g', price: 8.50, stock: 120, category: 'Snacks', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&q=80&w=400' },
  { id: '6', name: 'Mix de Castanhas 200g', price: 18.90, stock: 60, category: 'Snacks', image: 'https://images.unsplash.com/photo-1511018556340-d16986a1c194?auto=format&fit=crop&q=80&w=400' },
];

export const INITIAL_MOCK_CNPJS: CNPJ[] = [
  { 
    id: 'c1', 
    name: 'KFC LANCHES', 
    number: '12.345.678/0001-90', 
    distributor: 'Distribuidora Norte',
    email_contato: 'financeiro@kfc.com.br',
    telefone: '11999998888',
    cep: '01310-100',
    logradouro: 'Avenida Paulista',
    numero: '1000',
    bairro: 'Bela Vista',
    cidade: 'São Paulo',
    estado: 'SP'
  },
  { id: 'c2', name: 'NIKLAUS', number: '98.765.432/0001-21', distributor: 'Distribuidora Sul' },
  { id: 'c3', name: 'Vicente e Valentim', number: '11.222.333/0001-44', distributor: 'Distribuidora Norte' },
];

export const INITIAL_MOCK_NEWS: NewsPost[] = [
  { id: 'n1', title: 'Lançamento: Nova linha de orgânicos', content: 'Chegaram os novos sucos orgânicos certificados para o catálogo B2B. Consulte as condições especiais para pedidos acima de 50 caixas.', date: '2023-10-25', imageUrl: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=800' },
  { id: 'n2', title: 'Aviso: Alteração de Frete', content: 'Informamos que a partir de Novembro teremos novas tabelas de frete para a região Sul, otimizando o tempo de entrega para 48h.', date: '2023-10-24', imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800' },
];

let orders: Order[] = [];

export const trayApi = {
  getProducts: async (cnpjId: string): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(INITIAL_MOCK_PRODUCTS), 100);
    });
  },

  createOrder: async (cnpj: CNPJ, items: any[], total: number): Promise<Order> => {
    return new Promise((resolve) => {
      /**
       * NA INTEGRAÇÃO REAL COM A TRAY:
       * Aqui enviamos o objeto 'Customer' completo.
       * Ex: {
       *   "Customer": {
       *      "name": cnpj.name,
       *      "cpf": cnpj.number,
       *      "email": cnpj.email_contato,
       *      "address": cnpj.logradouro,
       *      "number": cnpj.numero,
       *      "zip_code": cnpj.cep,
       *      ...
       *   }
       * }
       * Se os dados acima estiverem corretos, a Tray pula a tela de cadastro.
       */
      const newOrder: Order = {
        id: `TRAY-${Math.floor(Math.random() * 900000) + 100000}`,
        cnpjId: cnpj.id,
        cnpjNumber: cnpj.number,
        date: new Date().toISOString(),
        total,
        status: 'PENDING',
        paymentLink: `https://checkout.tray.com.br/pay/${Math.random().toString(36).substring(7)}`,
        items
      };
      orders = [newOrder, ...orders];
      setTimeout(() => resolve(newOrder), 1500);
    });
  },

  getOrders: async (customerCnpjs: string[]): Promise<Order[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(orders.filter(o => customerCnpjs.includes(o.cnpjId))), 500);
    });
  },

  getPaymentLink: async (orderId: string): Promise<string> => {
    const order = orders.find(o => o.id === orderId);
    return order?.paymentLink || '';
  },

  validateCustomer: async (cnpj: string): Promise<boolean> => {
    return true; 
  }
};

export const b2bService = {
  getAvailableCnpjs: async (): Promise<CNPJ[]> => {
    return INITIAL_MOCK_CNPJS;
  },
  getNews: async (): Promise<NewsPost[]> => {
    return INITIAL_MOCK_NEWS;
  }
};
