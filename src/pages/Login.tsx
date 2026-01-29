
import React, { useState } from 'react';
import { User, CNPJ } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      const isAdmin = email === 'admin@ecofood.com' || (email === 'davidbhmg147@gmail.com' && password === '135227');
      const isRep = email === 'rep@ecofood.com' && password === '123456' || (email.includes('@') && password.length >= 4);

      if (isRep || isAdmin) {
        const mockCnpjs: CNPJ[] = [
          { id: 'c1', name: 'KFC LANCHES', number: '12.345.678/0001-90', distributor: 'Distribuidora Norte' },
          { id: 'c2', name: 'NIKLAUS', number: '98.765.432/0001-21', distributor: 'Distribuidora Sul' },
        ];
        
        const user: User = {
          id: email === 'davidbhmg147@gmail.com' ? 'u_admin_david' : 'u1',
          email: email,
          name: email === 'davidbhmg147@gmail.com' ? 'David Admin' : 'Usuário Niklaus',
          role: isAdmin ? 'ADMIN' : 'REPRESENTATIVE',
          cnpjs: mockCnpjs
        };
        onLogin(user);
      } else {
        setError('Credenciais inválidas.');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex bg-white font-sans overflow-hidden">
      {/* Lado Esquerdo - Branding Corporativo */}
      <div className="hidden lg:flex lg:w-3/5 bg-slate-900 relative p-20 flex-col justify-between">
        <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
           <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
             <circle cx="90" cy="10" r="40" stroke="white" strokeWidth="0.5" />
             <circle cx="10" cy="90" r="30" stroke="white" strokeWidth="0.5" />
           </svg>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-emerald-500/20">NK</div>
            <span className="text-white text-xl font-bold tracking-tighter uppercase">Niklaus B2B</span>
          </div>
          
          <h1 className="text-6xl font-extrabold text-white leading-[1.1] mb-8 tracking-tight">
            NIKLAUS&gt;NKS <br/>
            <span className="text-emerald-500">PEDIDOFLEX.</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-lg leading-relaxed">
            Plataforma centralizada para representantes e lojistas. Escaneie, selecione e processe pedidos com integração total Tray API.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-8 border-t border-slate-800 pt-12">
           <div>
             <p className="text-white font-bold mb-1">99.9% Uptime</p>
             <p className="text-slate-500 text-sm">Disponibilidade constante para sua rede.</p>
           </div>
           <div>
             <p className="text-white font-bold mb-1">Tray Certified</p>
             <p className="text-slate-500 text-sm">Sincronização oficial com sua loja virtual.</p>
           </div>
        </div>
      </div>

      {/* Lado Direito - Form de Acesso */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-md">
          <div className="mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Portal do Parceiro</h2>
            <p className="text-slate-500 font-medium">Insira suas credenciais para gerenciar suas unidades.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">E-mail Corporativo</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all shadow-sm"
                placeholder="exemplo@empresa.com.br"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Senha de Acesso</label>
                <button type="button" className="text-xs text-emerald-600 font-bold hover:underline">Esqueceu?</button>
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all shadow-sm"
                placeholder="••••••••"
                required
              />
            </div>

            <button 
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-black text-white font-bold py-4 rounded-xl shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Acessar Painel
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </>
              )}
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-slate-400 text-sm">
              Novo na rede? <button className="text-emerald-600 font-bold hover:underline">Solicitar Acesso</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
