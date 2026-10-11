import React from 'react';
import { KITCHEN_TIPS } from '../data/chiliPastes';
import { Sparkles, CheckCircle2, HeartHandshake } from 'lucide-react';

export const KitchenTipsTab: React.FC = () => {
  return (
    <div className="flex flex-col gap-5 pt-3 pb-8">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-br from-[#8c4c00] to-[#af6102] p-5 text-white shadow-md">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span className="text-xs text-amber-200 tracking-wider font-semibold uppercase">
            ภูมิปัญญาแม่ครัวก้นครัวไทย
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold font-['Prompt']">
          เคล็ดลับการปรุงน้ำพริกให้อร่อยติดลิ้น
        </h2>
        <p className="text-xs sm:text-sm text-amber-100 mt-1 leading-relaxed">
          ความลับก้นครัวโบราณที่ส่งต่อจากรุ่นสู่รุ่น ตั้งแต่วิธีเลือกครก การเผาสมุนไพร จนถึงการถนอมอาหารไร้สารเคมี
        </p>
      </div>

      {/* Tip Cards */}
      <div className="space-y-4">
        {KITCHEN_TIPS.map((tip, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-5 rounded-2xl bg-white border border-[#ece1d1] shadow-sm flex flex-col gap-3"
          >
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-xl bg-[#ffdcc2] text-[#8c4c00] font-bold text-sm flex items-center justify-center shrink-0">
                0{idx + 1}
              </span>
              <div>
                <h3 className="text-base font-bold text-[#201b11]">
                  {tip.title}
                </h3>
                <span className="text-xs text-[#8c4c00] font-medium">
                  {tip.subtitle}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#5b403b] leading-relaxed">
              {tip.content}
            </p>

            <div className="space-y-2 pt-1 border-t border-[#ece1d1]/80">
              {tip.bullets.map((bullet, bIdx) => (
                <div key={bIdx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1b6d24] mt-0.5 shrink-0" />
                  <p className="text-xs sm:text-sm text-[#201b11] leading-relaxed">
                    {bullet}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Community Quote Banner */}
      <div className="p-4 rounded-2xl bg-[#f8ecdc] border border-[#ece1d1] flex items-center gap-3">
        <HeartHandshake className="w-6 h-6 text-[#b51d04] shrink-0" />
        <p className="text-xs text-[#5b403b] leading-relaxed">
          "น้ำพริกไม่ใช่แค่อาหาร แต่เป็นศิลปะแห่งการประสานรส กลิ่น และสัมผัสจากดินแดนสยาม"
        </p>
      </div>
    </div>
  );
};
