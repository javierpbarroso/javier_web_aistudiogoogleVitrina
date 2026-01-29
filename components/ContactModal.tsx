
import React from 'react';
import { ContactInfo } from '../types';

interface ContactModalProps {
  info: ContactInfo;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ info, onClose }) => {
  return (
    <div 
      className="fixed inset-0 z-[110] flex items-center justify-center bg-sky-900/40 backdrop-blur-md p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl border border-white p-8 animate-item-entry"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black text-slate-800">Contacto</h2>
          <button onClick={onClose} className="text-slate-300 hover:text-slate-600 transition-colors">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.open(`tel:${info.phone}`)}>
            <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all">
              <i className="fas fa-phone-alt"></i>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Teléfono</p>
              <p className="text-lg font-bold text-slate-700">{info.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.open(`mailto:${info.email}`)}>
            <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all">
              <i className="fas fa-envelope"></i>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Correo Electrónico</p>
              <p className="text-lg font-bold text-slate-700">{info.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.open(`https://wa.me/${info.whatsapp}`)}>
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
              <i className="fab fa-whatsapp text-2xl"></i>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">WhatsApp</p>
              <p className="text-lg font-bold text-slate-700">Enviar mensaje directo</p>
            </div>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full mt-10 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ContactModal;
