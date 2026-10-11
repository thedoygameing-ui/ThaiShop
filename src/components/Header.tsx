import React, { useState } from 'react';
import { UtensilsCrossed, Search, ShoppingBag, X, User, Heart, Clock, Award } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isSearching: boolean;
  setIsSearching: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  searchQuery,
  setSearchQuery,
  isSearching,
  setIsSearching,
}) => {
  const [showStoryModal, setShowStoryModal] = useState(false);

  return (
    <>
      <header className="sticky top-0 w-full z-40 bg-[#fff8f2]/90 backdrop-blur-md border-b border-[#ece1d1] transition-all">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
          {/* Brand identity */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-[#b51d04] text-white shadow-sm ring-2 ring-[#ffdad3]/50 shrink-0">
              <UtensilsCrossed className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-lg text-[#201b11] leading-tight font-['Prompt']">
                Chili Paste Menu
              </span>
              <span className="text-xs text-[#8c4c00] font-medium tracking-wide">
                ตำรับน้ำพริกไทย
              </span>
            </div>
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-2">
            {isSearching ? (
              <div className="relative flex items-center animate-fadeIn">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ค้นหาชื่อน้ำพริก..."
                  autoFocus
                  className="w-44 sm:w-64 pl-8 pr-8 py-1.5 text-sm rounded-full bg-[#f8ecdc] text-[#201b11] border border-[#e4beb6] focus:outline-none focus:ring-2 focus:ring-[#b51d04]"
                />
                <Search className="w-4 h-4 text-[#907069] absolute left-2.5 pointer-events-none" />
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setIsSearching(false);
                  }}
                  className="absolute right-2 text-[#907069] hover:text-[#b51d04]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearching(true)}
                aria-label="ค้นหาเมนูน้ำพริก"
                className="w-10 h-10 flex items-center justify-center rounded-full text-[#5b403b] hover:text-[#b51d04] hover:bg-[#f8ecdc] transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            )}

            {/* Cart Icon */}
            <button
              onClick={onOpenCart}
              aria-label="ดูตะกร้าสั่งซื้อ"
              className="relative w-10 h-10 flex items-center justify-center rounded-full text-[#5b403b] hover:text-[#b51d04] hover:bg-[#f8ecdc] transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 px-1.5 py-0.5 bg-[#b51d04] text-white text-[11px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center leading-none shadow-sm animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User / Kitchen Story Avatar matching mockup */}
            <button
              onClick={() => setShowStoryModal(true)}
              aria-label="เกี่ยวกับครัวคุณย่า"
              className="w-9 h-9 rounded-full bg-[#b51d04] text-white flex items-center justify-center shadow-sm hover:ring-2 hover:ring-[#ffdad3] transition-all"
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Kitchen Story Modal */}
      {showStoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-[#ece1d1] relative flex flex-col gap-4">
            <button
              onClick={() => setShowStoryModal(false)}
              className="absolute top-4 right-4 text-[#907069] hover:text-[#201b11]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#ffdad3] text-[#b51d04] flex items-center justify-center shrink-0">
                <UtensilsCrossed className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#201b11]">
                  ตำรับน้ำพริกคุณย่า
                </h3>
                <span className="text-xs text-[#8c4c00] font-medium">
                  มรดกความอร่อยก้นครัวสยาม สืบทอดกว่า 40 ปี
                </span>
              </div>
            </div>

            <div className="p-3.5 bg-[#fef2e1] rounded-xl text-xs text-[#5b403b] leading-relaxed flex flex-col gap-2">
              <p>
                เราคัดสรรวัตถุดิบแท้จากแหล่งกำเนิด กะปิเคยแท้เกาะช้าง มะขามเปียกเคี่ยวเข้มข้น พริกหนุ่มสด และปลาย่างรมควันเตาถ่าน ตำสดมือด้วยครกหินทุกเช้า ไม่ใส่วัตถุกันเสียหรือสีผสมอาหาร
              </p>
              <div className="flex items-center gap-2 text-[#b51d04] font-bold">
                <Award className="w-4 h-4" />
                <span>ราคามาตรฐาน 50 บาททุกเมนู เพื่อให้ทุกคนเข้าถึงของอร่อย</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-[#201b11]">
              <div className="flex items-center gap-2 p-2.5 bg-[#fff8f2] rounded-xl border border-[#ece1d1]">
                <Clock className="w-4 h-4 text-[#1b6d24]" />
                <span>ตำสดใหม่ทุกเช้า</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-[#fff8f2] rounded-xl border border-[#ece1d1]">
                <Heart className="w-4 h-4 text-[#b51d04]" />
                <span>รสชาติแท้ไม่แต่งกลิ่น</span>
              </div>
            </div>

            <button
              onClick={() => setShowStoryModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#b51d04] text-white text-xs sm:text-sm font-bold shadow hover:bg-[#d9381e] transition-colors"
            >
              เข้าสู่เมนูน้ำพริก
            </button>
          </div>
        </div>
      )}
    </>
  );
};

