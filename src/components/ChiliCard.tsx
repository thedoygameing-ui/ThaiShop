import React from 'react';
import { ChiliPaste } from '../data/chiliPastes';
import { Flame, BookOpen, ShoppingBag, Check } from 'lucide-react';

interface ChiliCardProps {
  paste: ChiliPaste;
  onViewRecipe: (paste: ChiliPaste) => void;
  onAddToCart: (paste: ChiliPaste) => void;
  isAdded?: boolean;
}

export const ChiliCard: React.FC<ChiliCardProps> = ({
  paste,
  onViewRecipe,
  onAddToCart,
  isAdded,
}) => {
  return (
    <article className="flex flex-col rounded-2xl bg-white border border-[#ece1d1] shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
      {/* Product Image */}
      <div className="relative w-full h-48 sm:h-52 bg-[#f8ecdc] overflow-hidden">
        <img
          src={paste.image}
          alt={paste.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Flat Price Tag */}
        <div className="absolute top-3 right-3 bg-[#b51d04] text-white px-3 py-1 rounded-full shadow-md flex items-center gap-1 text-xs font-bold tracking-wide">
          <span>{paste.price} บาท</span>
        </div>

        {/* Spiciness Level Tag */}
        <div className="absolute bottom-3 left-3 bg-[#201b11]/85 backdrop-blur-md text-white px-2.5 py-1 rounded-full flex items-center gap-1.5 text-xs">
          <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
          <span className="font-medium">{paste.spicinessLabel}</span>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex flex-col gap-2.5 flex-1 justify-between">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between gap-2">
            <h2 className="text-lg font-bold text-[#201b11] group-hover:text-[#b51d04] transition-colors leading-snug">
              {paste.number}. {paste.name}
            </h2>
            <span className="text-xs font-semibold text-[#1b6d24] bg-[#e8f5e9] px-2 py-0.5 rounded-full shrink-0">
              {paste.subtitle}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#5b403b] leading-relaxed line-clamp-2">
            {paste.summary}
          </p>
        </div>

        {/* Flavor Balance Ratio Bar */}
        <div className="p-2.5 bg-[#fef2e1] rounded-xl border border-[#ece1d1]/60">
          <div className="flex justify-between items-center text-xs text-[#201b11] mb-1.5">
            <span className="font-medium truncate max-w-[200px]">
              สมดุลรส: {paste.flavorSummary}
            </span>
            <span className="text-[#b51d04] font-bold text-xs flex items-center gap-0.5 shrink-0">
              พริก {paste.spiciness}/5
            </span>
          </div>
          <div className="w-full bg-[#ece1d1] h-2 rounded-full overflow-hidden flex">
            {paste.flavorDimensions.map((dim, i) => (
              <div
                key={i}
                className="h-full transition-all"
                style={{
                  width: `${dim.percent}%`,
                  backgroundColor: dim.colorHex,
                }}
                title={`${dim.label} ${dim.percent}%`}
              />
            ))}
          </div>
        </div>

        {/* Dual Actions: ดูสูตรวิธีทำ & สั่งซื้อ 50.- */}
        <div className="flex items-center gap-2.5 pt-1">
          <button
            onClick={() => onViewRecipe(paste)}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#f2e7d6] text-[#201b11] hover:bg-[#ece1d1] font-medium text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5 active:scale-95"
          >
            <BookOpen className="w-4 h-4 text-[#8c4c00]" />
            <span>ดูสูตรวิธีทำ</span>
          </button>

          <button
            onClick={() => onAddToCart(paste)}
            className={`flex-1 py-2.5 px-3 rounded-xl font-medium text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-1.5 active:scale-95 ${
              isAdded
                ? 'bg-[#1b6d24] text-white'
                : 'bg-[#b51d04] hover:bg-[#d9381e] text-white'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>เพิ่มแล้ว!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>สั่งซื้อ 50.-</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
