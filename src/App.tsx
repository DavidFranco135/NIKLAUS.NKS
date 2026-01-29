import React, { useState, useEffect } from 'react';
import { User, CNPJ, Product, CartItem, Order } from './types';
import { INITIAL_MOCK_PRODUCTS, INITIAL_MOCK_CNPJS } from './mockApi'; // Removido /services
import Login from './Login'; // Removido /pages
import Dashboard from './Dashboard'; // Removido /pages
import History from './History'; // Removido /pages
import News from './News'; // Removido /pages
import Backoffice from './Backoffice'; // Removido /pages
import Sidebar from './Sidebar'; // Removido /components
import Navbar from './Navbar'; // Removido /components
import CNPJSelector from './CNPJSelector'; // Removido /components

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedCnpj, setSelectedCnpj] = useState<CNPJ | null>(null);
  const [currentPage, setCurrentPage] = useState<'catalog' | 'history' | 'news' | 'backoffice'>('catalog');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCnpjModalOpen, setIsCnpjModalOpen] = useState(false);
  
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('b2b_products_db');
    return saved ? JSON.parse(saved) : INITIAL_MOCK_PRODUCTS;
  });

  const [cnpjs, setCnpjs] = useState<CNPJ[]>(() => {
    const saved = localStorage.getItem('b2b_cnpjs_db');
    return saved ? JSON.parse(saved) : INITIAL_MOCK_CNPJS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('b2b_orders_db');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('b2b_products_db', JSON.stringify(products));
    localStorage.setItem('b2b_cnpjs_db', JSON.stringify(cnpjs));
    localStorage.setItem('b2b_orders_db', JSON.stringify(orders));
  }, [products, cnpjs, orders]);

  useEffect(() => {
    const savedUser = localStorage.getItem('b2b_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogin = (userData: User) => {
    const userToSave = { ...userData };
    if (userData.role === 'ADMIN') userToSave.cnpjs = cnpjs;
    setUser(userToSave);
    localStorage.setItem('b2b_user', JSON.stringify(userToSave));
    setIsCnpjModalOpen(true);
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedCnpj(null);
    localStorage.removeItem('b2b_user');
    setCurrentPage('catalog');
  };

  const handleCnpjSelect = (cnpj: CNPJ) => {
    setSelectedCnpj(cnpj);
    setIsCnpjModalOpen(false);
    setCart([]);
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  if (!user) return <Login onLogin={handleLogin} />;

  if (!selectedCnpj || isCnpjModalOpen) {
    return (
      <CNPJSelector 
        cnpjs={user.role === 'ADMIN' ? cnpjs : user.cnpjs} 
        onSelect={handleCnpjSelect} 
        currentSelection={selectedCnpj}
      />
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} userRole={user.role} />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Navbar 
          user={user} 
          selectedCnpj={selectedCnpj} 
          onSwitchCnpj={() => setIsCnpjModalOpen(true)}
          onLogout={handleLogout}
          cartCount={cart.length}
        />
        <main className="flex-1 overflow-y-auto p-6 md:p-10 animate-fade-in">
          {currentPage === 'catalog' && (
            <Dashboard 
              cnpj={selectedCnpj} 
              onAddToCart={addToCart} 
              cart={cart}
              onUpdateQuantity={(id, delta) => setCart(prev => prev.map(i => i.id === id ? {...i, quantity: Math.max(1, i.quantity + delta)} : i))}
              onRemoveFromCart={(id) => setCart(prev => prev.filter(i => i.id !== id))}
              onClearCart={() => setCart([])}
              products={products}
              onOrderCreated={(order) => setOrders(prev => [order, ...prev])}
            />
          )}
          {currentPage === 'history' && <History user={user} orders={orders} />}
          {currentPage === 'news' && <News />}
          {currentPage === 'backoffice' && user.role === 'ADMIN' && (
            <Backoffice 
              cnpjs={cnpjs}
              onUpsertCnpj={(c) => setCnpjs(prev => {
                const ex = prev.find(i => i.id === c.id);
                return ex ? prev.map(i => i.id === c.id ? c : i) : [c, ...prev];
              })}
              products={products}
              onUpsertProduct={(p) => setProducts(prev => {
                const ex = prev.find(i => i.id === p.id);
                return ex ? prev.map(i => i.id === p.id ? p : i) : [p, ...prev];
              })}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
