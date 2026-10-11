import React from 'react';
import { UtensilsCrossed, ShieldCheck, Truck } from 'lucide-react';

export const GuaranteeBanner: React.FC = () => {
  return (
    <section className="pt-2 pb-6">
      <div className="p-4 rounded-2xl bg-[#f8ecdc] border border-[#ece1d1] flex items-center justify-around text-center gap-2">
        <div className="flex flex-col items-center gap-1.5 flex-1">
          <div className="w-10 h-10 rounded-full bg-[#ffdad3] text-[#b51d04] flex items-center justify-center">
            <UtensilsCrossed className="w-5 h-5" />
          </div>
          <span className="text-xs sm:text-sm font-semibold text-[#201b11]">
            ตำสดใหม่ทุกวัน
          </span>
          <span className="text-[11px] text-[#5b403b] hidden sm:inline">
            หอมกลิ่นครกหินโบราณ
          </span>
        </div>

        <div className="h-10 w-px bg-[#ece1d1]" />

        <div className="flex flex-col items-center gap-1.5 flex-1">
          <div className="w-10 h-10 rounded-full bg-[#a3f69c]/40 text-[#1b6d24] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="text-xs sm:text-sm font-semibold text-[#201b11]">
            ฝาซีลสูญญากาศ
          </span>
          <span className="text-[11px] text-[#5b403b] hidden sm:inline">
            สะอาด ไร้สารกันบูด
          </span>
        </div>

        <div className="h-10 w-px bg-[#ece1d1]" />

        <div className="flex flex-col items-center gap-1.5 flex-1">
          <div className="w-10 h-10 rounded-full bg-[#ffdcc2] text-[#8c4c00] flex items-center justify-center">
            <Truck className="w-5 h-5" />
          </div>
          <span className="text-xs sm:text-sm font-semibold text-[#201b11]">
            ส่งไวทั่วประเทศ
          </span>
          <span className="text-[11px] text-[#5b403b] hidden sm:inline">
            แพ็คควบคุมอุณหภูมิ
          </span>
        </div>
      </div>
    </section>
  );
};
