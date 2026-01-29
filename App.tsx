
import React, { useState, useEffect, useMemo } from 'react';
import { Item, Category, ContactInfo } from './types';
import { INITIAL_ITEMS, INITIAL_CATEGORIES, INITIAL_CONTACT } from './constants';
import Navbar from './components/Navbar';
import ItemGrid from './components/ItemGrid';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';
import ContactModal from './components/ContactModal';

const App: React.FC = () => {
  // Global State
  const [items, setItems] = useState<Item[]>(() => {
    const saved = localStorage.getItem('vitrina_items');
    return saved ? JSON.parse(saved) : INITIAL_ITEMS;
  });
  
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('vitrina_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [contactInfo, setContactInfo] = useState<ContactInfo>(() => {
    const saved = localStorage.getItem('vitrina_contact');
    return saved ? JSON.parse(saved) : INITIAL_CONTACT;
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Persistence
  useEffect(() => {
    localStorage.setItem('vitrina_items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('vitrina_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('vitrina_contact', JSON.stringify(contactInfo));
  }, [contactInfo]);

  // Helper para normalizar texto (quitar acentos y pasar a minúsculas)
  const normalizeText = (text: string) => 
    text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  // Derived State (Filtering)
  const filteredItems = useMemo(() => {
    const normalizedQuery = normalizeText(searchQuery);
    
    return items.filter(item => {
      const normalizedName = normalizeText(item.name);
      const normalizedDesc = normalizeText(item.description);
      
      const matchesSearch = normalizedName.includes(normalizedQuery) || 
                          normalizedDesc.includes(normalizedQuery);
                          
      const matchesCategory = activeCategory === 'all' || item.categoryId === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [items, searchQuery, activeCategory]);

  // Handlers
  const handleAddItem = (newItem: Omit<Item, 'id'>) => {
    const itemWithId: Item = {
      ...newItem,
      id: Math.random().toString(36).substr(2, 9)
    };
    setItems(prev => [itemWithId, ...prev]);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('¿Eliminar este artículo definitivamente?')) {
      setItems(prev => prev.filter(i => i.id !== id));
    }
  };

  const handleAddCategory = (name: string) => {
    const newCat: Category = {
      id: Math.random().toString(36).substr(2, 9),
      name
    };
    setCategories(prev => [...prev, newCat]);
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm('¿Eliminar esta categoría? Los artículos asociados no se borrarán pero perderán su clasificación.')) {
      setCategories(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleUpdateContact = (info: ContactInfo) => {
    setContactInfo(info);
  };

  const handleAdminLogin = () => {
    setIsAdmin(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  return (
    <div className="min-h-screen bg-sky-50/50 pb-20">
      <Navbar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        onAdminClick={() => setShowLogin(true)}
        onContactClick={() => setShowContact(true)}
        isAdmin={isAdmin}
        onLogout={handleLogout}
      />

      <main>
        {isAdmin ? (
          <AdminPanel 
            items={items}
            categories={categories}
            contactInfo={contactInfo}
            onAddItem={handleAddItem}
            onDeleteItem={handleDeleteItem}
            onAddCategory={handleAddCategory}
            onDeleteCategory={handleDeleteCategory}
            onUpdateContact={handleUpdateContact}
          />
        ) : (
          <ItemGrid 
            items={filteredItems}
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        )}
      </main>

      {showLogin && (
        <AdminLogin 
          onLogin={handleAdminLogin}
          onClose={() => setShowLogin(false)}
        />
      )}

      {showContact && (
        <ContactModal 
          info={contactInfo} 
          onClose={() => setShowContact(false)} 
        />
      )}

      {/* Footer minimalista */}
      {!isAdmin && (
        <footer className="mt-20 py-10 text-center text-slate-400 border-t border-sky-100">
          <p className="text-sm font-medium">© 2024 VITRINA Digital - Todos los derechos reservados</p>
          <div className="flex justify-center gap-6 mt-4">
            <i className="fab fa-instagram hover:text-sky-400 cursor-pointer" onClick={() => alert('Instagram: Proximamente')}></i>
            <i className="fab fa-facebook hover:text-sky-400 cursor-pointer" onClick={() => alert('Facebook: Proximamente')}></i>
            <i className="fab fa-twitter hover:text-sky-400 cursor-pointer" onClick={() => alert('Twitter: Proximamente')}></i>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
