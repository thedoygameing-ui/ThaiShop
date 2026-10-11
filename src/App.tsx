import React, { useState, useMemo } from 'react';
import { CHILI_PASTES, ChiliPaste } from './data/chiliPastes';
import { Header } from './components/Header';
import { PromoBanner } from './components/PromoBanner';
import { CategoryFilter, CategoryKey } from './components/CategoryFilter';
import { ChiliCard } from './components/ChiliCard';
import { SideDishesSection } from './components/SideDishesSection';
import { GuaranteeBanner } from './components/GuaranteeBanner';
import { RecipeTab } from './components/RecipeTab';
import { KitchenTipsTab } from './components/KitchenTipsTab';
import { CartTab, CartItem } from './components/CartTab';
import { BottomNav, ActiveTab } from './components/BottomNav';
import { CheckCircle2, SlidersHorizontal, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('menu');
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>('kapi');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2600);
  };

  // Add to Cart
  const handleAddToCart = (paste: ChiliPaste) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.paste.id === paste.id);
      if (existing) {
        return prev.map((item) =>
          item.paste.id === paste.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { paste, quantity: 1 }];
    });

    setRecentlyAddedId(paste.id);
    setTimeout(() => setRecentlyAddedId(null), 1500);
    showToast(`เพิ่ม "${paste.name}" ในราคา 50.- ลงตะกร้าแล้ว`);
  };

  // Update Cart Quantity
  const handleUpdateQuantity = (pasteId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.paste.id === pasteId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  // Remove from Cart
  const handleRemoveItem = (pasteId: string) => {
    setCart((prev) => prev.filter((item) => item.paste.id !== pasteId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // View Recipe Action
  const handleViewRecipe = (paste: ChiliPaste) => {
    setSelectedRecipeId(paste.id);
    setActiveTab('recipe');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Total cart items count
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Category counts
  const categoryCounts = useMemo(() => {
    return {
      all: CHILI_PASTES.length,
      central: CHILI_PASTES.filter((p) => p.region === 'central').length,
      north: CHILI_PASTES.filter((p) => p.region === 'north').length,
      isan: CHILI_PASTES.filter((p) => p.region === 'isan').length,
      dry: CHILI_PASTES.filter((p) => p.region === 'dry').length,
    };
  }, []);

  // Filtered Pastes
  const filteredPastes = useMemo(() => {
    return CHILI_PASTES.filter((paste) => {
      const matchesCategory =
        activeCategory === 'all' || paste.region === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        paste.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paste.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paste.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#fff8f2] text-[#201b11] font-['Prompt',sans-serif] flex flex-col antialiased">
      {/* Top App Header */}
      <Header
        cartCount={cartCount}
        onOpenCart={() => {
          setActiveTab('cart');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isSearching={isSearching}
        setIsSearching={setIsSearching}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 pb-24">
        {activeTab === 'menu' && (
          <div className="flex flex-col gap-3">
            {/* Promo Header / Flat Price Banner (50 Baht) */}
            <PromoBanner />

            {/* Filter Category Chips */}
            <CategoryFilter
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              counts={categoryCounts}
            />

            {/* Quality Standard Bar */}
            <section className="py-1">
              <div className="bg-[#fef2e1] p-3 rounded-xl border border-[#ece1d1] flex items-center justify-between text-xs text-[#5b403b]">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#b51d04]" />
                  <span>มาตรฐานรสชาติ: สด สะอาด เผ็ดนัวถึงเครื่อง</span>
                </div>
                <span className="text-[#1b6d24] font-bold">
                  บรรจุ 120 กรัม / 50.-
                </span>
              </div>
            </section>

            {/* Search results banner if searching */}
            {searchQuery.trim() !== '' && (
              <div className="text-xs text-[#5b403b] flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-[#ece1d1]">
                <span>
                  ผลการค้นหา "{searchQuery}": พบ {filteredPastes.length} รายการ
                </span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-[#b51d04] underline font-semibold"
                >
                  ล้างการค้นหา
                </button>
              </div>
            )}

            {/* Chili Paste Menu Cards Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              {filteredPastes.map((paste) => (
                <ChiliCard
                  key={paste.id}
                  paste={paste}
                  onViewRecipe={handleViewRecipe}
                  onAddToCart={handleAddToCart}
                  isAdded={recentlyAddedId === paste.id}
                />
              ))}

              {filteredPastes.length === 0 && (
                <div className="col-span-full py-12 text-center text-[#5b403b] bg-white rounded-2xl border border-[#ece1d1] p-6">
                  <p className="text-base font-bold text-[#201b11] mb-1">
                    ไม่พบเมนูน้ำพริกที่ค้นหา
                  </p>
                  <p className="text-xs">
                    ลองค้นหาด้วยคำอื่น หรือกดดูทุกเมนูเพื่อชิมรสชาติทั้ง 8 ตำรับ
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('all');
                    }}
                    className="mt-3 px-4 py-2 rounded-xl bg-[#b51d04] text-white text-xs font-semibold"
                  >
                    ดูน้ำพริกทั้งหมด
                  </button>
                </div>
              )}
            </section>

            {/* Side Dish Recommendations Section */}
            <SideDishesSection cartItemCount={cartCount} />

            {/* Assurance Guarantee Card */}
            <GuaranteeBanner />
          </div>
        )}

        {activeTab === 'recipe' && (
          <RecipeTab
            chiliPastes={CHILI_PASTES}
            selectedPasteId={selectedRecipeId}
            onSelectPasteId={setSelectedRecipeId}
            onAddToCart={handleAddToCart}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'tips' && <KitchenTipsTab />}

        {activeTab === 'cart' && (
          <CartTab
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onGoToMenu={() => setActiveTab('menu')}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Persistent Bottom Navigation (matching mockup) */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={cartCount}
      />

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-full bg-[#201b11] text-[#fff8f2] shadow-2xl flex items-center gap-2.5 z-50 animate-fadeIn text-xs sm:text-sm font-medium border border-white/10 pointer-events-none">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
