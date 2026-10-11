import React from 'react';

export type CategoryKey = 'all' | 'central' | 'north' | 'isan' | 'dry';

interface CategoryFilterProps {
  activeCategory: CategoryKey;
  onSelectCategory: (category: CategoryKey) => void;
  counts: Record<CategoryKey, number>;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onSelectCategory,
  counts,
}) => {
  const categories: { key: CategoryKey; label: string }[] = [
    { key: 'all', label: `ทั้งหมด (${counts.all})` },
    { key: 'central', label: 'ภาคกลาง' },
    { key: 'north', label: 'ภาคเหนือ' },
    { key: 'isan', label: 'ภาคอีสาน' },
    { key: 'dry', label: 'แบบคั่วแห้ง' },
  ];

  return (
    <section className="w-full overflow-x-auto py-2 no-scrollbar">
      <div className="flex items-center gap-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => onSelectCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all active:scale-95 whitespace-nowrap ${
                isActive
                  ? 'bg-[#b51d04] text-white shadow-sm'
                  : 'bg-[#f2e7d6] text-[#5b403b] hover:bg-[#ece1d1]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </section>
  );
};
