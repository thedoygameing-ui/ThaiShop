import React from 'react';
import { SIDE_DISHES } from '../data/chiliPastes';
import { Leaf, Gift } from 'lucide-react';

interface SideDishesSectionProps {
  cartItemCount: number;
}

export const SideDishesSection: React.FC<SideDishesSectionProps> = ({ cartItemCount }) => {
  const isFreeGiftUnlocked = cartItemCount >= 4;

  return (
    <section className="pt-6 pb-4">
      <div className="rounded-2xl bg-[#fef2e1] border border-[#ece1d1] p-4 sm:p-5 flex flex-col gap-3 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#1b6d24] text-white flex items-center justify-center shadow-sm">
              <Leaf className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-base sm:text-lg font-bold text-[#201b11] leading-tight">
                ชุดผักแนม & เครื่องเคียงสด
              </h3>
              <span className="text-xs text-[#5b403b]">
                ทานคู่น้ำพริกไทยอร่อยลงตัวยิ่งขึ้น
              </span>
            </div>
          </div>
          <span className="text-xs font-semibold text-[#1b6d24] bg-[#a3f69c]/50 px-2.5 py-1 rounded-full">
            สดสะอาดทุกวัน
          </span>
        </div>

        {/* 4 Items Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-1">
          {SIDE_DISHES.map((dish, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-[#ece1d1]/70 shadow-2xs hover:border-[#b51d04]/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-[#f8ecdc]">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs sm:text-sm font-semibold text-[#201b11] truncate">
                  {dish.name}
                </span>
                <span className="text-[11px] text-[#1b6d24] truncate">
                  {dish.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Free Vegetable promo alert */}
        <div
          className={`flex items-center justify-between p-3 rounded-xl transition-all ${
            isFreeGiftUnlocked
              ? 'bg-[#e8f5e9] border border-[#81c784] text-[#1b6d24]'
              : 'bg-[#1b6d24]/10 border border-[#1b6d24]/20 text-[#1b6d24]'
          }`}
        >
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4 shrink-0" />
            <span className="text-xs sm:text-sm font-bold">
              {isFreeGiftUnlocked
                ? '🎉 ปลดล็อกแล้ว! รับฟรีชุดผักสดรวมมิตร 1 เซ็ต'
                : 'แถมฟรี! ชุดผักสดรวมมิตร'}
            </span>
          </div>
          <span className="text-xs text-[#5b403b] font-medium shrink-0">
            {isFreeGiftUnlocked
              ? `(สั่งแล้ว ${cartItemCount} กระปุก)`
              : `เมื่อสั่งครบ 4 กระปุกขึ้นไป (ตอนนี้ ${cartItemCount}/4)`}
          </span>
        </div>
      </div>
    </section>
  );
};
