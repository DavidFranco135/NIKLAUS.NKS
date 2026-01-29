
import React, { useState } from 'react';
import { CNPJ, Product } from '../types';

interface BackofficeProps {
  cnpjs: CNPJ[];
  onUpsertCnpj: (c: CNPJ) => void;
  products: Product[];
  onUpsertProduct: (p: Product) => void;
}

const CNPJModal: React.FC<{
  cnpj: CNPJ | null;
  onClose: () => void;
  onSave: (c: CNPJ) => void;
}> = ({ cnpj, onClose, onSave }) => {
  const [formData, setFormData] = useState<CNPJ>(
    cnpj || {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      razao_social: '',
      number: '',
      cpf_responsavel: '',
      distributor: '',
      email_contato: '',
      telefone: '',
      cep: '',
      logradouro: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
    }
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4">
      <div className="bg-white w-full max-w-3xl rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-emerald-600 text-white">
          <div>
            <h2 className="text-2xl font-black">Cadastro Integrado Tray</h2>
            <p className="text-xs text-emerald-100 font-medium">Preencha todos os campos para habilitar o Auto-Login no Checkout.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <div className="p-10 space-y-8 max-h-[75vh] overflow-y-auto scrollbar-hide">
          {/* Passo 1: Dados de Acesso conforme Print da Tray */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-black">1</span>
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Dados de acesso e Identificação</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-widest">Nome Completo (Resp. Legal)</label>
                <input className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 transition-all font-medium" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Ex: João da Silva" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-widest">CPF do Responsável</label>
                <input className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 transition-all font-medium" value={formData.cpf_responsavel} onChange={e => setFormData({...formData, cpf_responsavel: e.target.value})} placeholder="000.000.000-00" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-widest">E-mail Corporativo</label>
                <input className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 transition-all font-medium" value={formData.email_contato} onChange={e => setFormData({...formData, email_contato: e.target.value})} placeholder="seu@email.com" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-widest">Celular / WhatsApp</label>
                <input className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 transition-all font-medium" value={formData.telefone} onChange={e => setFormData({...formData, telefone: e.target.value})} placeholder="(00) 00000-0000" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-widest">Razão Social</label>
                <input className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 transition-all font-medium" value={formData.razao_social} onChange={e => setFormData({...formData, razao_social: e.target.value})} placeholder="Empresa Peças LTDA" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-widest">CNPJ da Empresa</label>
                <input className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 transition-all font-medium" value={formData.number} onChange={e => setFormData({...formData, number: e.target.value})} placeholder="00.000.000/0001-00" />
              </div>
            </div>
          </section>

          {/* Passo 2: Endereço */}
          <section className="space-y-6 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-black">2</span>
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Endereço de Entrega</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-widest">CEP</label>
                <input className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 transition-all font-medium" value={formData.cep} onChange={e => setFormData({...formData, cep: e.target.value})} placeholder="00000-000" />
              </div>
              <div className="col-span-2 space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-widest">Logradouro / Rua</label>
                <input className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 transition-all font-medium" value={formData.logradouro} onChange={e => setFormData({...formData, logradouro: e.target.value})} placeholder="Avenida Paulista..." />
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-widest">Número</label>
                <input className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 transition-all font-medium" value={formData.numero} onChange={e => setFormData({...formData, numero: e.target.value})} placeholder="123" />
              </div>
              <div className="col-span-2 space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-widest">Bairro</label>
                <input className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 transition-all font-medium" value={formData.bairro} onChange={e => setFormData({...formData, bairro: e.target.value})} placeholder="Centro" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-widest">UF</label>
                <input className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 transition-all font-medium text-center uppercase" maxLength={2} value={formData.estado} onChange={e => setFormData({...formData, estado: e.target.value})} placeholder="SP" />
              </div>
            </div>
          </section>
        </div>

        <div className="p-8 bg-slate-50 flex justify-end gap-4 items-center">
          <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mr-auto">⚠️ Dados incompleto desabilitam o Auto-Fill.</p>
          <button onClick={onClose} className="px-6 py-3 font-bold text-slate-500 hover:text-slate-700">Cancelar</button>
          <button onClick={() => onSave(formData)} className="px-12 py-4 bg-slate-900 text-white rounded-[1.5rem] font-black shadow-xl shadow-slate-300 hover:bg-black transition-all transform active:scale-95">Salvar e Sincronizar</button>
        </div>
      </div>
    </div>
  );
};

const ProductModal: React.FC<{
  product: Product | null;
  onClose: () => void;
  onSave: (p: Product) => void;
}> = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState<Product>(
    product || {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      price: 0,
      stock: 0,
      image: '',
      category: 'Geral',
    }
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
          <div>
            <h2 className="text-xl font-black">{product ? 'Editar Produto' : 'Novo Produto'}</h2>
            <p className="text-xs text-slate-400 font-medium tracking-wide">Os dados serão sincronizados com o catálogo B2B.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <div className="p-8 space-y-5">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Nome do Produto</label>
            <input className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 transition-all font-medium" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Nome Comercial" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Preço (BRL)</label>
              <input type="number" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 transition-all font-medium" value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Estoque Disponível</label>
              <input type="number" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 transition-all font-medium" value={formData.stock} onChange={e => setFormData({...formData, stock: parseInt(e.target.value)})} />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">URL da Imagem</label>
            <input className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 transition-all font-medium" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} placeholder="https://..." />
          </div>
        </div>

        <div className="p-8 bg-slate-50 flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-3 font-bold text-slate-500 hover:text-slate-700">Cancelar</button>
          <button onClick={() => onSave(formData)} className="px-10 py-4 bg-emerald-600 text-white rounded-2xl font-black shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all">Salvar Alterações</button>
        </div>
      </div>
    </div>
  );
};

const Backoffice: React.FC<BackofficeProps> = ({ cnpjs, onUpsertCnpj, products, onUpsertProduct }) => {
  const [activeTab, setActiveTab] = useState<'cnpj-manage' | 'products-manage' | 'emails'>('cnpj-manage');
  const [isCnpjModalOpen, setIsCnpjModalOpen] = useState(false);
  const [editingCnpj, setEditingCnpj] = useState<CNPJ | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  return (
    <div className="max-w-6xl mx-auto">
      {isCnpjModalOpen && <CNPJModal cnpj={editingCnpj} onClose={() => setIsCnpjModalOpen(false)} onSave={c => { onUpsertCnpj(c); setIsCnpjModalOpen(false); }} />}
      {isProductModalOpen && <ProductModal product={editingProduct} onClose={() => setIsProductModalOpen(false)} onSave={p => { onUpsertProduct(p); setIsProductModalOpen(false); }} />}
      
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Painel Administrativo</h1>
        <p className="text-slate-500 font-medium">Configure as contas e o catálogo para automação total da API Tray.</p>
      </header>

      <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        <nav className="w-full md:w-72 bg-slate-50/50 border-r border-slate-100 p-6 space-y-1.5">
           <button onClick={() => setActiveTab('cnpj-manage')} className={`w-full text-left px-5 py-4 rounded-2xl text-sm font-bold flex items-center gap-3 transition-all ${activeTab === 'cnpj-manage' ? 'bg-white shadow-xl text-emerald-700 border border-slate-100' : 'text-slate-500 hover:bg-white hover:text-slate-900'}`}>
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> 
             Gestão de Contas
           </button>
           <button onClick={() => setActiveTab('products-manage')} className={`w-full text-left px-5 py-4 rounded-2xl text-sm font-bold flex items-center gap-3 transition-all ${activeTab === 'products-manage' ? 'bg-white shadow-xl text-emerald-700 border border-slate-100' : 'text-slate-500 hover:bg-white hover:text-slate-900'}`}>
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg> 
             Catálogo Global
           </button>
           <button onClick={() => setActiveTab('emails')} className={`w-full text-left px-5 py-4 rounded-2xl text-sm font-bold flex items-center gap-3 transition-all ${activeTab === 'emails' ? 'bg-white shadow-xl text-emerald-700 border border-slate-100' : 'text-slate-500 hover:bg-white hover:text-slate-900'}`}>
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> 
             Segredos da Tray
           </button>
        </nav>

        <div className="flex-1 p-10 overflow-y-auto">
           {activeTab === 'cnpj-manage' && (
             <div className="space-y-8 animate-in fade-in duration-500">
                <div className="flex items-center justify-between">
                   <h2 className="text-2xl font-extrabold text-slate-900">Unidades Cadastradas</h2>
                   <button onClick={() => { setEditingCnpj(null); setIsCnpjModalOpen(true); }} className="bg-slate-900 text-white px-6 py-3.5 rounded-2xl text-sm font-black shadow-lg hover:bg-black transition-all transform active:scale-95">+ Nova Unidade</button>
                </div>
                <div className="grid gap-4">
                  {cnpjs.map(c => (
                    <div key={c.id} className="p-6 bg-white border border-slate-100 rounded-[2rem] flex items-center justify-between hover:shadow-xl transition-all group">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors">
                          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        </div>
                        <div>
                          <p className="font-extrabold text-slate-900">{c.razao_social || c.name}</p>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{c.number} • {c.email_contato}</p>
                        </div>
                      </div>
                      <button onClick={() => { setEditingCnpj(c); setIsCnpjModalOpen(true); }} className="p-3 bg-slate-50 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
             </div>
           )}

           {activeTab === 'products-manage' && (
             <div className="space-y-8 animate-in fade-in duration-500">
                <div className="flex items-center justify-between">
                   <h2 className="text-2xl font-extrabold text-slate-900">Itens do Catálogo</h2>
                   <button onClick={() => { setEditingProduct(null); setIsProductModalOpen(true); }} className="bg-emerald-600 text-white px-6 py-3.5 rounded-2xl text-sm font-black shadow-lg hover:bg-emerald-700 transition-all transform active:scale-95">+ Novo Produto</button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {products.map(p => (
                    <div key={p.id} className="p-5 bg-white border border-slate-100 rounded-3xl flex items-center gap-4 hover:shadow-lg transition-all group">
                       <img src={p.image} className="w-20 h-20 rounded-2xl object-cover" />
                       <div className="flex-1">
                          <p className="font-extrabold text-slate-900 text-sm leading-tight">{p.name}</p>
                          <div className="flex gap-4 mt-2">
                             <p className="text-[10px] font-black text-emerald-600 uppercase">Stock: {p.stock}</p>
                             <p className="text-[10px] font-black text-slate-400 uppercase">R$ {p.price.toFixed(2)}</p>
                          </div>
                       </div>
                       <button onClick={() => { setEditingProduct(p); setIsProductModalOpen(true); }} className="p-3 bg-slate-50 text-slate-400 hover:text-emerald-600 rounded-xl transition-all">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
             </div>
           )}

           {activeTab === 'emails' && (
             <div className="space-y-10 animate-in fade-in duration-500 max-w-2xl">
                <div>
                   <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Por que a Tray pede os dados?</h2>
                   <p className="text-slate-500 font-medium leading-relaxed">
                     A Tray exige um <strong>Token de Sessão</strong> ou o preenchimento total via API. 
                     Para que o seu cliente pule a tela de cadastro, siga estas regras de ouro:
                   </p>
                </div>
                
                <div className="space-y-6">
                   <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-[2rem] flex gap-5">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm flex-shrink-0">
                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      </div>
                      <div>
                         <p className="font-extrabold text-emerald-900 text-sm">Mesmo E-mail</p>
                         <p className="text-emerald-700 text-xs mt-1 leading-relaxed">O e-mail cadastrado no Portal B2B <strong>DEVE</strong> ser o mesmo que o cliente usa na Tray. Se forem diferentes, ela cria um novo cliente e pede senha.</p>
                      </div>
                   </div>

                   <div className="p-6 bg-amber-50 border border-amber-100 rounded-[2rem] flex gap-5">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-600 shadow-sm flex-shrink-0">
                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      </div>
                      <div>
                         <p className="font-extrabold text-amber-900 text-sm">Endereço Completo</p>
                         <p className="text-amber-700 text-xs mt-1 leading-relaxed">Se o CEP, número ou bairro estiverem vazios no nosso portal, a API da Tray não consegue completar o "Auto-fill" e joga o cliente para a tela de registro.</p>
                      </div>
                   </div>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Backoffice;
