import React from 'react';
import { UtensilsCrossed, BookOpen, Lightbulb, ShoppingBag } from 'lucide-react';

export type ActiveTab = 'menu' | 'recipe' | 'tips' | 'cart';

interface BottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  cartCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  cartCount,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#fff8f2]/95 backdrop-blur-xl border-t border-[#ece1d1] pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-2px_12px_rgba(43,37,32,0.06)] no-print">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-2">
        {/* Menu Tab */}
        <button
          onClick={() => onTabChange('menu')}
          className={`flex flex-col items-center justify-center min-w-[56px] py-1 transition-all ${
            activeTab === 'menu'
              ? 'text-[#b51d04] font-bold scale-105'
              : 'text-[#5b403b] hover:text-[#b51d04]'
          }`}
        >
          <UtensilsCrossed className="w-5 h-5" />
          <span className="text-[11px] mt-1">เมนูน้ำพริก</span>
        </button>

        {/* Recipe Tab */}
        <button
          onClick={() => onTabChange('recipe')}
          className={`flex flex-col items-center justify-center min-w-[56px] py-1 transition-all ${
            activeTab === 'recipe'
              ? 'text-[#b51d04] font-bold scale-105'
              : 'text-[#5b403b] hover:text-[#b51d04]'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[11px] mt-1">สูตรวิธีทำ</span>
        </button>

        {/* Tips Tab */}
        <button
          onClick={() => onTabChange('tips')}
          className={`flex flex-col items-center justify-center min-w-[56px] py-1 transition-all ${
            activeTab === 'tips'
              ? 'text-[#b51d04] font-bold scale-105'
              : 'text-[#5b403b] hover:text-[#b51d04]'
          }`}
        >
          <Lightbulb className="w-5 h-5" />
          <span className="text-[11px] mt-1">เคล็ดลับ</span>
        </button>

        {/* Cart Tab */}
        <button
          onClick={() => onTabChange('cart')}
          className={`relative flex flex-col items-center justify-center min-w-[56px] py-1 transition-all ${
            activeTab === 'cart'
              ? 'text-[#b51d04] font-bold scale-105'
              : 'text-[#5b403b] hover:text-[#b51d04]'
          }`}
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 px-1.5 py-0.2 bg-[#b51d04] text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center leading-none shadow-xs">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[11px] mt-1">สั่งซื้อ</span>
        </button>
      </div>
    </nav>
  );
};
