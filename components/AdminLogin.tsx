
import React, { useState } from 'react';
import { ADMIN_PASSWORD } from '../constants';

interface AdminLoginProps {
  onLogin: () => void;
  onClose: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onClose }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError('Contraseña incorrecta');
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-sky-900/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Acceso Admin</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-slate-500 text-sm">
            Ingresa la contraseña maestra para gestionar la vitrina.
          </p>
          <div>
            <input 
              type="password"
              placeholder="Contraseña"
              autoFocus
              className="w-full px-4 py-3 bg-sky-50 border border-sky-100 rounded-xl focus:ring-2 focus:ring-sky-400 outline-none transition-all"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>}
          </div>
          <button 
            type="submit"
            className="w-full py-3 bg-sky-500 text-white font-bold rounded-xl hover:bg-sky-600 transition-all shadow-lg shadow-sky-100"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
