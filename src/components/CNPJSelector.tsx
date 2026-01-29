
import React from 'react';
import { CNPJ } from '../types';

interface CNPJSelectorProps {
  cnpjs: CNPJ[];
  onSelect: (cnpj: CNPJ) => void;
  currentSelection: CNPJ | null;
}

const CNPJSelector: React.FC<CNPJSelectorProps> = ({ cnpjs, onSelect, currentSelection }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-8 border-b border-gray-100 bg-green-50">
          <h2 className="text-2xl font-bold text-gray-900">Selecione o Contexto de Compra</h2>
          <p className="text-gray-600 mt-2">Você deve selecionar para qual CNPJ deseja realizar os pedidos neste momento. Você pode alterar isso a qualquer momento.</p>
        </div>
        
        <div className="p-8 max-h-[60vh] overflow-y-auto space-y-4">
          {cnpjs.map((cnpj) => (
            <button
              key={cnpj.id}
              onClick={() => onSelect(cnpj)}
              className={`w-full text-left p-6 rounded-xl border-2 transition-all flex items-center justify-between group ${
                currentSelection?.id === cnpj.id 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-100 hover:border-green-200 hover:bg-gray-50'
              }`}
            >
              <div>
                <p className="font-bold text-lg text-gray-800">{cnpj.name}</p>
                <div className="flex gap-4 mt-1 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    {cnpj.number}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    {cnpj.distributor}
                  </span>
                </div>
              </div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                currentSelection?.id === cnpj.id ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-green-100 group-hover:text-green-500'
              }`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              </div>
            </button>
          ))}
        </div>
        
        <div className="p-6 bg-gray-50 flex justify-end">
          <p className="text-xs text-gray-400 italic">O catálogo e preços serão ajustados automaticamente com base na sua escolha.</p>
        </div>
      </div>
    </div>
  );
};

export default CNPJSelector;
