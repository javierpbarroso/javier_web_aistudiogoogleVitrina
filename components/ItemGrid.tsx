
import React, { useState, useMemo } from 'react';
import { Item, Category } from '../types';

interface ItemGridProps {
  items: Item[];
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (id: string) => void;
}

type SortOption = 'default' | 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'stock-asc' | 'stock-desc';

const ItemGrid: React.FC<ItemGridProps> = ({ items, categories, activeCategory, setActiveCategory }) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('default');

  const getCategoryName = (id: string) => {
    return categories.find(c => c.id === id)?.name || 'Sin categoría';
  };

  const sortedItems = useMemo(() => {
    const itemsCopy = [...items];
    switch (sortOption) {
      case 'name-asc':
        return itemsCopy.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return itemsCopy.sort((a, b) => b.name.localeCompare(a.name));
      case 'price-asc':
        return itemsCopy.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return itemsCopy.sort((a, b) => b.price - a.price);
      case 'stock-asc':
        return itemsCopy.sort((a, b) => a.stock - b.stock);
      case 'stock-desc':
        return itemsCopy.sort((a, b) => b.stock - a.stock);
      default:
        return itemsCopy;
    }
  }, [items, sortOption]);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      {/* Banner Publicitario */}
      <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden mb-12 shadow-2xl shadow-sky-100 border border-white animate-item-entry">
        <img 
          src="https://picsum.photos/seed/store-banner/1200/400" 
          className="absolute inset-0 w-full h-full object-cover"
          alt="Banner"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sky-900/80 to-transparent flex flex-col justify-center px-8 md:px-16 text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-md">
            Calidad que <br /><span className="text-sky-400">Te Sorprenderá</span>
          </h2>
          <p className="max-w-md text-sky-100 opacity-90 text-lg">
            Descubre nuestra selección exclusiva de productos elegidos para tu estilo de vida.
          </p>
        </div>
      </div>

      {/* Controles: Categorías y Ordenamiento */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 animate-item-entry" style={{ animationDelay: '0.1s' }}>
        {/* Filtros de Categoría */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide no-scrollbar flex-1">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-6 py-2.5 rounded-full font-semibold whitespace-nowrap transition-all ${
              activeCategory === 'all' 
                ? 'bg-sky-500 text-white shadow-lg shadow-sky-200' 
                : 'bg-white text-slate-500 hover:bg-sky-50 border border-sky-50'
            }`}
          >
            Todos
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2.5 rounded-full font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat.id 
                  ? 'bg-sky-500 text-white shadow-lg shadow-sky-200' 
                  : 'bg-white text-slate-500 hover:bg-sky-50 border border-sky-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Dropdown de Ordenamiento */}
        <div className="flex items-center gap-3 shrink-0">
          <label className="text-sm font-bold text-slate-400 uppercase tracking-wider hidden sm:block">Ordenar:</label>
          <div className="relative min-w-[200px]">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="w-full appearance-none bg-white border border-sky-100 text-slate-600 py-2.5 pl-10 pr-10 rounded-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-sky-400 cursor-pointer shadow-sm hover:bg-sky-50 transition-all"
            >
              <option value="default">Recomendados</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="name-asc">Nombre: A - Z</option>
              <option value="name-desc">Nombre: Z - A</option>
              <option value="stock-desc">Stock: Más unidades</option>
              <option value="stock-asc">Stock: Pocas unidades</option>
            </select>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-500 pointer-events-none">
              <i className="fas fa-sort-amount-down"></i>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none">
              <i className="fas fa-chevron-down text-xs"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de Artículos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {sortedItems.length > 0 ? (
          sortedItems.map((item, index) => (
            <div 
              key={item.id} 
              onClick={() => setSelectedItem(item)}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-sky-50 flex flex-col cursor-pointer animate-item-entry"
              style={{ animationDelay: `${(index % 8) * 0.1 + 0.2}s` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-bold text-sky-600 shadow-sm">
                  {getCategoryName(item.categoryId)}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-xl text-slate-800 line-clamp-1">{item.name}</h3>
                </div>
                <p className="text-slate-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 font-medium">Precio</span>
                    <span className="text-2xl font-black text-sky-600">${item.price.toFixed(2)}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 font-medium block">Disponibles</span>
                    <span className={`font-bold ${item.stock > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {item.stock > 0 ? item.stock : 'Agotado'}
                    </span>
                  </div>
                </div>
                <div className="mt-6 w-full py-3 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 bg-sky-50 text-sky-600 group-hover:bg-sky-500 group-hover:text-white">
                  Ver detalles
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-400 animate-item-entry">
            <i className="fas fa-search-minus text-6xl mb-4 text-sky-200"></i>
            <p className="text-xl font-medium">No se encontraron artículos</p>
          </div>
        )}
      </div>

      {/* Modal de Detalle de Producto */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-sky-900/40 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="bg-white rounded-[2.5rem] overflow-hidden max-w-4xl w-full shadow-2xl border border-white flex flex-col md:flex-row animate-item-entry"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Parte Izquierda: Imagen */}
            <div className="md:w-1/2 relative h-64 md:h-auto">
              <img 
                src={selectedItem.imageUrl} 
                alt={selectedItem.name} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 left-4 md:hidden bg-white/80 backdrop-blur p-2 rounded-full text-slate-700"
              >
                <i className="fas fa-arrow-left"></i>
              </button>
            </div>

            {/* Parte Derecha: Información */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col relative">
              <button 
                onClick={() => setSelectedItem(null)}
                className="hidden md:block absolute top-8 right-8 text-slate-300 hover:text-slate-600 transition-colors"
              >
                <i className="fas fa-times text-2xl"></i>
              </button>

              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-sky-50 text-sky-600 rounded-full text-xs font-bold mb-4 uppercase tracking-wider">
                  {getCategoryName(selectedItem.categoryId)}
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-4 leading-tight">
                  {selectedItem.name}
                </h2>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl font-black text-sky-600">
                    ${selectedItem.price.toFixed(2)}
                  </span>
                  <div className="h-8 w-px bg-slate-100"></div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Estado</span>
                    <span className={`text-sm font-bold ${selectedItem.stock > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {selectedItem.stock > 0 ? `${selectedItem.stock} en stock` : 'Sin inventario'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="prose prose-slate mb-8 flex-grow">
                <h4 className="text-slate-800 font-bold mb-2">Sobre este producto</h4>
                <p className="text-slate-500 leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <button 
                  disabled={selectedItem.stock === 0}
                  className={`flex-1 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 ${
                    selectedItem.stock > 0 
                      ? 'bg-sky-500 text-white hover:bg-sky-600 shadow-xl shadow-sky-100 active:scale-95' 
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <i className="fas fa-shopping-cart"></i>
                  {selectedItem.stock > 0 ? 'Añadir al carrito' : 'No disponible'}
                </button>
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="sm:w-20 py-4 rounded-2xl border-2 border-slate-100 text-slate-400 font-bold hover:bg-slate-50 transition-colors"
                  title="Cerrar"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemGrid;
