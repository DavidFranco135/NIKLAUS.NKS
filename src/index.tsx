import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

/**
 * Ponto de entrada otimizado para React 19 no ambiente Vite.
 * Removemos qualquer dependência de scripts externos via HTML para evitar 'Tela Branca'.
 */
const startApp = () => {
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    console.error("Erro Fatal: #root não encontrado no DOM.");
    return;
  }

  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Falha ao inicializar a UI do Niklaus Portal:", error);
  }
};

// Garante que o DOM esteja pronto antes de montar a aplicação
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}
