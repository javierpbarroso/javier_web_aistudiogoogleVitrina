
import React, { useState } from 'react';
import { Item, Category, ContactInfo } from '../types';
import { generateDescription } from '../services/geminiService';

interface AdminPanelProps {
  items: Item[];
  categories: Category[];
  contactInfo: ContactInfo;
  onAddItem: (item: Omit<Item, 'id'>) => void;
  onDeleteItem: (id: string) => void;
  onAddCategory: (name: string) => void;
  onDeleteCategory: (id: string) => void;
  onUpdateContact: (info: ContactInfo) => void;
}

type AdminTab = 'items' | 'categories' | 'contact';

const AdminPanel: React.FC<AdminPanelProps> = ({
  items,
  categories,
  contactInfo,
  onAddItem,
  onDeleteItem,
  onAddCategory,
  onDeleteCategory,
  onUpdateContact
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('items');
  const [tempContact, setTempContact] = useState<ContactInfo>(contactInfo);
  const [newItem, setNewItem] = useState<Omit<Item, 'id'>>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    categoryId: categories[0]?.id || '',
    imageUrl: 'https://picsum.photos/seed/default/400/300'
  });
  const [newCatName, setNewCatName] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateAI = async () => {
    if (!newItem.name) return alert('Ingresa un nombre primero');
    setIsGenerating(true);
    const catName = categories.find(c => c.id === newItem.categoryId)?.name || '';
    const desc = await generateDescription(newItem.name, catName);
    setNewItem(prev => ({ ...prev, description: desc }));
    setIsGenerating(false);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name || newItem.price <= 0) return alert('Completa los campos correctamente');
    onAddItem(newItem);
    setNewItem({
      name: '',
      description: '',
      price: 0,
      stock: 0,
      categoryId: categories[0]?.id || '',
      imageUrl: 'https://picsum.photos/seed/' + Math.random() + '/400/300'
    });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateContact(tempContact);
    alert('Información de contacto actualizada correctamente');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Navigation */}
        <aside className="md:w-64 space-y-2">
          <div className="p-4 mb-4">
            <h2 className="text-xs font-bold text-sky-400 uppercase tracking-widest">Panel de Control</h2>
            <p className="text-slate-400 text-sm mt-1">Gestiona tu escaparate digital</p>
          </div>
          
          <button 
            onClick={() => setActiveTab('items')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all ${
              activeTab === 'items' 
              ? 'bg-sky-500 text-white shadow-lg shadow-sky-200' 
              : 'text-slate-500 hover:bg-white hover:text-sky-600'
            }`}
          >
            <i className="fas fa-box-open"></i>
            Artículos
          </button>
          
          <button 
            onClick={() => setActiveTab('categories')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all ${
              activeTab === 'categories' 
              ? 'bg-sky-500 text-white shadow-lg shadow-sky-200' 
              : 'text-slate-500 hover:bg-white hover:text-sky-600'
            }`}
          >
            <i className="fas fa-tags"></i>
            Categorías
          </button>

          <button 
            onClick={() => setActiveTab('contact')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all ${
              activeTab === 'contact' 
              ? 'bg-sky-500 text-white shadow-lg shadow-sky-200' 
              : 'text-slate-500 hover:bg-white hover:text-sky-600'
            }`}
          >
            <i className="fas fa-id-card"></i>
            Mi Información
          </button>
        </aside>

        {/* Content Area */}
        <div className="flex-1 space-y-6">
          {activeTab === 'items' && (
            <div className="space-y-8 animate-item-entry">
              <section className="bg-white p-8 rounded-3xl shadow-sm border border-sky-100">
                <h2 className="text-2xl font-bold text-sky-900 mb-6 flex items-center gap-3">
                  <div className="bg-sky-50 p-2 rounded-lg">
                    <i className="fas fa-plus-circle text-sky-500"></i>
                  </div>
                  Nuevo Artículo
                </h2>
                <form onSubmit={handleAddItem} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Nombre del Producto</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ej. Cámara Vintage 35mm"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-sky-400 outline-none transition-all"
                      value={newItem.name}
                      onChange={e => setNewItem({...newItem, name: e.target.value})}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-bold text-slate-700">Descripción detallada</label>
                      <button 
                        type="button"
                        onClick={handleGenerateAI}
                        disabled={isGenerating}
                        className="text-xs font-bold text-sky-600 hover:bg-sky-50 px-3 py-1.5 rounded-full flex items-center gap-2 border border-sky-100 transition-all"
                      >
                        <i className={`fas fa-wand-magic-sparkles ${isGenerating ? 'animate-pulse' : ''}`}></i>
                        {isGenerating ? 'Redactando...' : 'Autocompletar con IA'}
                      </button>
                    </div>
                    <textarea 
                      placeholder="Describe las mejores características de tu producto..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-sky-400 outline-none h-32 resize-none transition-all"
                      value={newItem.description}
                      onChange={e => setNewItem({...newItem, description: e.target.value})}
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Precio de Venta ($)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                      <input 
                        type="number" 
                        step="0.01"
                        required
                        className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-sky-400 outline-none transition-all"
                        value={newItem.price}
                        onChange={e => setNewItem({...newItem, price: parseFloat(e.target.value)})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Stock Inicial</label>
                    <input 
                      type="number" 
                      required
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-sky-400 outline-none transition-all"
                      value={newItem.stock}
                      onChange={e => setNewItem({...newItem, stock: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Categoría</label>
                    <select 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-sky-400 outline-none transition-all"
                      value={newItem.categoryId}
                      onChange={e => setNewItem({...newItem, categoryId: e.target.value})}
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">URL de Imagen</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-sky-400 outline-none transition-all"
                      placeholder="https://ejemplo.com/imagen.jpg"
                      value={newItem.imageUrl}
                      onChange={e => setNewItem({...newItem, imageUrl: e.target.value})}
                    />
                  </div>
                  <button 
                    type="submit"
                    className="md:col-span-2 w-full py-4 bg-sky-500 text-white font-bold rounded-2xl hover:bg-sky-600 shadow-xl shadow-sky-100 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                  >
                    <i className="fas fa-paper-plane"></i>
                    Publicar Artículo en Vitrina
                  </button>
                </form>
              </section>

              <section className="bg-white p-8 rounded-3xl shadow-sm border border-sky-100 overflow-hidden">
                <h2 className="text-2xl font-bold text-sky-900 mb-6">Inventario Activo</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-slate-400 text-xs font-black uppercase tracking-widest border-b border-slate-50">
                        <th className="pb-4">Producto</th>
                        <th className="pb-4">Categoría</th>
                        <th className="pb-4">Precio</th>
                        <th className="pb-4">Stock</th>
                        <th className="pb-4 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {items.map(item => (
                        <tr key={item.id} className="group hover:bg-sky-50/30 transition-colors">
                          <td className="py-5">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl overflow-hidden shadow-inner bg-slate-100">
                                <img src={item.imageUrl} className="w-full h-full object-cover" />
                              </div>
                              <span className="font-bold text-slate-700">{item.name}</span>
                            </div>
                          </td>
                          <td className="py-5">
                            <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">
                              {categories.find(c => c.id === item.categoryId)?.name}
                            </span>
                          </td>
                          <td className="py-5 text-sky-600 font-black">${item.price.toFixed(2)}</td>
                          <td className="py-5">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${item.stock > 5 ? 'bg-emerald-400' : 'bg-rose-400'}`}></div>
                              <span className={`font-bold text-sm ${item.stock > 5 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                {item.stock} uds
                              </span>
                            </div>
                          </td>
                          <td className="py-5 text-right">
                            <button 
                              onClick={() => onDeleteItem(item.id)}
                              className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all"
                              title="Eliminar artículo"
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'categories' && (
            <div className="animate-item-entry">
              <section className="bg-white p-8 rounded-3xl shadow-sm border border-sky-100">
                <h2 className="text-2xl font-bold text-sky-900 mb-8 flex items-center gap-3">
                  <div className="bg-sky-50 p-2 rounded-lg">
                    <i className="fas fa-tags text-sky-500"></i>
                  </div>
                  Directorio de Categorías
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                  {categories.map(cat => (
                    <div key={cat.id} className="flex items-center justify-between p-4 bg-sky-50/50 rounded-2xl border border-sky-50 group hover:bg-white hover:shadow-md transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-sky-400"></div>
                        <span className="text-slate-700 font-bold">{cat.name}</span>
                      </div>
                      <button 
                        onClick={() => onDeleteCategory(cat.id)}
                        className="opacity-0 group-hover:opacity-100 text-rose-300 hover:text-rose-500 transition-all p-2"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl">
                  <h3 className="text-sm font-bold text-slate-500 mb-4 uppercase">Nueva Clasificación</h3>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input 
                      type="text" 
                      placeholder="Ej. Accesorios de Viaje"
                      className="flex-1 px-5 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-400 outline-none transition-all"
                      value={newCatName}
                      onChange={(e) => setNewCatName(e.target.value)}
                    />
                    <button 
                      onClick={() => {
                        if (newCatName.trim()) {
                          onAddCategory(newCatName);
                          setNewCatName('');
                        }
                      }}
                      className="bg-sky-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-sky-600 shadow-lg shadow-sky-100 transition-all flex items-center justify-center gap-2"
                    >
                      <i className="fas fa-plus"></i>
                      Añadir
                    </button>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="animate-item-entry">
              <section className="bg-white p-8 rounded-3xl shadow-sm border border-sky-100">
                <h2 className="text-2xl font-bold text-sky-900 mb-8 flex items-center gap-3">
                  <div className="bg-sky-50 p-2 rounded-lg">
                    <i className="fas fa-id-card text-sky-500"></i>
                  </div>
                  Gestión de Contacto
                </h2>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Teléfono de Contacto</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-sky-400 outline-none transition-all"
                      value={tempContact.phone}
                      onChange={e => setTempContact({...tempContact, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Correo Electrónico</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-sky-400 outline-none transition-all"
                      value={tempContact.email}
                      onChange={e => setTempContact({...tempContact, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">ID de WhatsApp (Sin signos, solo números)</label>
                    <input 
                      type="text" 
                      placeholder="Ej. 521234567890"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-sky-400 outline-none transition-all"
                      value={tempContact.whatsapp}
                      onChange={e => setTempContact({...tempContact, whatsapp: e.target.value})}
                    />
                    <p className="mt-2 text-xs text-slate-400">Formato: Código de país + número (ej. 52 para México)</p>
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-4 bg-sky-500 text-white font-bold rounded-2xl hover:bg-sky-600 shadow-xl shadow-sky-100 transition-all flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-save"></i>
                    Guardar Cambios de Perfil
                  </button>
                </form>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
