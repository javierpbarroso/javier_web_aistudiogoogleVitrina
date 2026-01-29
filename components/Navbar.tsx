
import React from 'react';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onAdminClick: () => void;
  onContactClick: () => void;
  isAdmin: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  onAdminClick, 
  onContactClick,
  isAdmin, 
  onLogout 
}) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-sky-100 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.location.hash = ''}>
          <div className="bg-sky-500 p-2 rounded-xl text-white shadow-lg shadow-sky-200 group-hover:scale-110 transition-transform">
            <i className="fas fa-gem text-xl"></i>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-sky-400 bg-clip-text text-transparent">
            VITRINA
          </h1>
        </div>

        <div className="relative w-full max-w-xl group">
          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-sky-400"></i>
          <input
            type="text"
            placeholder="Busca por nombre o descripción..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-2.5 bg-sky-50/50 border border-sky-100 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white transition-all text-slate-700 placeholder-sky-300"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sky-300 hover:text-sky-500 transition-colors p-1"
              title="Limpiar búsqueda"
            >
              <i className="fas fa-times-circle"></i>
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          {!isAdmin && (
            <button 
              onClick={onContactClick}
              className="px-4 py-2 rounded-lg text-sky-600 font-bold hover:bg-sky-50 transition-colors flex items-center gap-2"
            >
              <i className="fas fa-headset"></i>
              Contacto
            </button>
          )}
          
          {isAdmin ? (
            <button 
              onClick={onLogout}
              className="px-4 py-2 rounded-lg bg-red-50 text-red-600 font-medium hover:bg-red-100 transition-colors flex items-center gap-2"
            >
              <i className="fas fa-sign-out-alt"></i>
              Salir Admin
            </button>
          ) : (
            <button 
              onClick={onAdminClick}
              className="px-4 py-2 rounded-lg bg-sky-100 text-sky-700 font-medium hover:bg-sky-200 transition-colors flex items-center gap-2"
            >
              <i className="fas fa-user-shield"></i>
              Administrador
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
