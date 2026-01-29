
import React, { useState, useEffect, useCallback } from 'react';
import { User, CNPJ, Product, CartItem, Order } from './types';
import { trayApi, INITIAL_MOCK_PRODUCTS, INITIAL_MOCK_CNPJS } from './services/mockApi';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import News from './pages/News';
import Backoffice from './pages/Backoffice';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import CNPJSelector from './components/CNPJSelector';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedCnpj, setSelectedCnpj] = useState<CNPJ | null>(null);
  const [currentPage, setCurrentPage] = useState<'catalog' | 'history' | 'news' | 'backoffice'>('catalog');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCnpjModalOpen, setIsCnpjModalOpen] = useState(false);
  
  // --- CARREGAMENTO INICIAL ---
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

  // --- EFEITOS DE SINCRONIZAÇÃO (SALVAMENTO REALTIME) ---
  useEffect(() => {
    localStorage.setItem('b2b_products_db', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('b2b_cnpjs_db', JSON.stringify(cnpjs));
    // Se o CNPJ selecionado foi editado, atualiza o objeto de contexto
    if (selectedCnpj) {
      const updated = cnpjs.find(c => c.id === selectedCnpj.id);
      if (updated && JSON.stringify(updated) !== JSON.stringify(selectedCnpj)) {
        setSelectedCnpj(updated);
      }
    }
  }, [cnpjs, selectedCnpj]);

  useEffect(() => {
    localStorage.setItem('b2b_orders_db', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    const savedUser = localStorage.getItem('b2b_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // --- HANDLERS (AÇÕES DO SISTEMA) ---
  const handleLogin = (userData: User) => {
    const userToSave = { ...userData };
    // Se for admin, ele vê todos os CNPJs do banco global
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

  const removeFromCart = (productId: string) => setCart(prev => prev.filter(item => item.id !== productId));

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  // Funções de Gerenciamento (Upsert com trigger de estado)
  const handleUpsertProduct = (product: Product) => {
    setProducts(prev => {
      const exists = prev.find(p => p.id === product.id);
      const newList = exists ? prev.map(p => p.id === product.id ? product : p) : [product, ...prev];
      return [...newList];
    });
  };

  const handleBulkUpsertProducts = (newProducts: Product[]) => {
    setProducts(prev => {
      const filteredPrev = prev.filter(p => !newProducts.some(np => np.id === p.id));
      return [...newProducts, ...filteredPrev];
    });
  };

  const handleUpsertCnpj = (cnpj: CNPJ) => {
    setCnpjs(prev => {
      const exists = prev.find(c => c.id === cnpj.id);
      const newList = exists ? prev.map(c => c.id === cnpj.id ? cnpj : c) : [cnpj, ...prev];
      return [...newList];
    });
  };

  const handleCreateOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  // --- RENDER ---
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
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} userRole={user.role} />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Navbar 
          user={user} 
          selectedCnpj={selectedCnpj} 
          onSwitchCnpj={() => setIsCnpjModalOpen(true)}
          onLogout={handleLogout}
          cartCount={cart.length}
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {currentPage === 'catalog' && (
            <Dashboard 
              cnpj={selectedCnpj} 
              onAddToCart={addToCart} 
              cart={cart}
              onUpdateQuantity={updateQuantity}
              onRemoveFromCart={removeFromCart}
              onClearCart={() => setCart([])}
              isAdmin={user.role === 'ADMIN'}
              products={products}
              onUpsertProduct={handleUpsertProduct}
              onBulkUpsertProducts={handleBulkUpsertProducts}
              onOrderCreated={handleCreateOrder}
            />
          )}
          {currentPage === 'history' && (
            <History user={user} orders={orders} />
          )}
          {currentPage === 'news' && (
            <News />
          )}
          {currentPage === 'backoffice' && user.role === 'ADMIN' && (
            <Backoffice 
              cnpjs={cnpjs}
              onUpsertCnpj={handleUpsertCnpj}
              products={products}
              onUpsertProduct={handleUpsertProduct}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
