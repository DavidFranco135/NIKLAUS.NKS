
import React, { useState } from 'react';
import { CNPJ, Product, CartItem, Order } from '../types';
import { trayApi } from './mockApi';

interface DashboardProps {
  cnpj: CNPJ;
  onAddToCart: (p: Product) => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveFromCart: (id: string) => void;
  onClearCart: () => void;
  isAdmin?: boolean;
  products: Product[];
  onUpsertProduct: (p: Product) => void;
  onBulkUpsertProducts: (ps: Product[]) => void;
  onOrderCreated: (order: Order) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  cnpj, onAddToCart, cart, onUpdateQuantity, onRemoveFromCart, onClearCart, products, onOrderCreated
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOrdering, setIsOrdering] = useState(false);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [syncStep, setSyncStep] = useState<string>('');

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleFinishOrder = async () => {
    if (cart.length === 0) return;
    setIsOrdering(true);
    
    // Simulação de passos de sincronização para garantir que o usuário veja que estamos enviando o cliente
    const steps = [
      "Iniciando integração Tray...",
      "Sincronizando Dados Cadastrais...",
      `Autenticando CNPJ: ${cnpj.number}...`,
      "Enviando Endereço de Faturamento...",
      "Gerando Sessão de Pagamento..."
    ];

    for(let step of steps) {
      setSyncStep(step);
      await new Promise(r => setTimeout(r, 800));
    }

    try {
      const order = await trayApi.createOrder(cnpj, cart, cartTotal);
      onOrderCreated(order);
      setLastOrder(order);
      onClearCart();
    } catch (e) {
      alert("Erro na sincronização. Certifique-se que o CNPJ possui endereço completo no Backoffice.");
    } finally {
      setIsOrdering(false);
      setSyncStep('');
    }
  };

  if (lastOrder) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-lg mx-auto animate-fade-in">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[2rem] flex items-center justify-center mb-8 shadow-inner ring-4 ring-emerald-50">
           <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
        </div>
        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Sincronizado!</h2>
        <p className="text-slate-500 mt-3 text-lg font-medium leading-relaxed">Enviamos os dados de <strong>{cnpj.razao_social || cnpj.name}</strong> para o checkout da Tray.</p>
        
        <div className="mt-10 p-10 bg-white border border-slate-100 rounded-[3rem] w-full shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
             <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
           </div>
           <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-4">Atenção ao E-mail de Login na Tray</p>
           <p className="text-sm font-bold text-slate-900 mb-8 bg-slate-50 p-4 rounded-2xl border border-slate-100">{cnpj.email_contato}</p>
           
           <a href={lastOrder.paymentLink} target="_blank" rel="noopener noreferrer" className="block w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-black transition-all shadow-xl shadow-slate-200">
             Ir para Pagamento
           </a>
           <p className="mt-4 text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em]">O endereço e CNPJ já foram pré-carregados.</p>
        </div>
        
        <button onClick={() => setLastOrder(null)} className="mt-10 text-emerald-600 font-black text-sm uppercase tracking-widest hover:underline">Novo Pedido B2B</button>
      </div>
    );
  }

  return (
    <div className="flex gap-10 h-full">
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="mb-10 flex flex-col sm:flex-row items-center justify-between gap-6">
           <div>
             <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Catálogo de Vendas</h1>
             <p className="text-slate-500 font-medium">Preços ajustados para faturamento direto.</p>
           </div>
           
           <div className="relative w-full sm:w-96">
             <input 
               type="text" 
               value={searchTerm} 
               onChange={e => setSearchTerm(e.target.value)} 
               placeholder="Buscar item no catálogo..." 
               className="w-full pl-14 pr-6 py-4.5 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-8 focus:ring-emerald-500/5 focus:border-emerald-500 shadow-sm transition-all font-medium" 
             />
             <svg className="w-6 h-6 absolute left-5 top-4.5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
           </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 overflow-y-auto pb-20 px-2 scrollbar-hide">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all group flex flex-col border-b-4 border-b-transparent hover:border-b-emerald-500">
              <div className="h-64 overflow-hidden relative bg-slate-50">
                <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={product.name} />
                <div className="absolute top-5 right-5">
                   <span className="bg-slate-900 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">{product.category}</span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h3 className="font-extrabold text-slate-900 text-xl mb-1 leading-tight">{product.name}</h3>
                <p className="text-slate-400 text-xs font-bold mb-8 uppercase tracking-wider">Disp: {product.stock} un</p>
                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest block mb-0.5">Preço Unitário</span>
                    <span className="text-2xl font-black text-slate-900 tracking-tighter">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}</span>
                  </div>
                  <button 
                    onClick={() => onAddToCart(product)} 
                    className="bg-emerald-600 text-white p-4.5 rounded-[1.5rem] shadow-xl shadow-emerald-100 hover:bg-emerald-700 hover:-translate-y-1 transition-all active:scale-90"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lateral Carrinho */}
      <div className="w-[420px] bg-white border-l border-slate-100 flex flex-col h-full sticky top-0 hidden xl:flex shadow-2xl">
         <div className="p-10 border-b border-slate-50 flex items-center justify-between">
            <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest">Carrinho B2B</h2>
            <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black">{cart.length} ITENS</span>
         </div>
         
         <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
           {cart.length === 0 ? (
             <div className="text-center py-32 opacity-10 flex flex-col items-center">
               <svg className="w-24 h-24 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
               <p className="font-extrabold uppercase text-xs tracking-widest">Aguardando Produtos</p>
             </div>
           ) : cart.map(item => (
             <div key={item.id} className="flex gap-5 items-center p-5 bg-slate-50 rounded-[2rem] border border-slate-100 group">
               <img src={item.image} className="w-16 h-16 rounded-2xl object-cover shadow-sm" alt={item.name} />
               <div className="flex-1 min-w-0">
                 <p className="font-extrabold text-slate-900 text-sm truncate leading-tight">{item.name}</p>
                 <div className="flex items-center gap-4 mt-2">
                   <div className="flex items-center bg-white border border-slate-200 rounded-xl overflow-hidden">
                     <button onClick={() => onUpdateQuantity(item.id, -1)} className="px-3 py-1 font-bold hover:bg-slate-50">-</button>
                     <span className="px-2 text-xs font-black w-8 text-center">{item.quantity}</span>
                     <button onClick={() => onUpdateQuantity(item.id, 1)} className="px-3 py-1 font-bold hover:bg-slate-50">+</button>
                   </div>
                 </div>
               </div>
               <button onClick={() => onRemoveFromCart(item.id)} className="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
               </button>
             </div>
           ))}
         </div>

         <div className="p-10 bg-slate-50 border-t border-slate-100 space-y-6">
            <div className="flex justify-between items-end">
               <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1.5">Total para Faturamento</span>
               <span className="text-4xl font-black text-slate-900 tracking-tighter">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cartTotal)}</span>
            </div>
            
            <div className="space-y-4">
               <p className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-widest">
                 Integrando Unidade: <span className="text-emerald-600">{cnpj.number}</span>
               </p>
               <button 
                disabled={cart.length === 0 || isOrdering} 
                onClick={handleFinishOrder} 
                className="w-full bg-slate-900 text-white font-black py-6 rounded-[1.5rem] shadow-2xl hover:bg-black disabled:bg-slate-200 transition-all flex flex-col items-center justify-center gap-1 group overflow-hidden relative"
              >
                {isOrdering ? (
                  <>
                    <div className="w-full bg-emerald-500/20 h-1 absolute top-0 left-0">
                       <div className="h-full bg-emerald-500 animate-[loading_2s_ease-in-out_infinite]"></div>
                    </div>
                    <span className="text-sm">{syncStep}</span>
                  </>
                ) : (
                  <>
                    <span className="text-lg">FINALIZAR E SINCRONIZAR</span>
                    <span className="text-[9px] text-slate-400 group-hover:text-emerald-400 transition-colors uppercase tracking-widest">Enviar para Checkout Tray</span>
                  </>
                )}
              </button>
            </div>
         </div>
      </div>
      
      <style>{`
        @keyframes loading {
          0% { width: 0%; }
          50% { width: 100%; }
          100% { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
