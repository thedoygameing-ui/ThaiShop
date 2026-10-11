import React from 'react';
import { Flame, ShieldCheck, Sparkles } from 'lucide-react';

export const PromoBanner: React.FC = () => {
  return (
    <section className="pt-4 pb-2">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#b51d04] via-[#d9381e] to-[#8c4c00] p-5 text-white shadow-lg">
        {/* Decorative backdrop glow */}
        <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute -left-6 -top-6 w-32 h-32 rounded-full bg-yellow-400/10 blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-2.5">
          <div className="inline-flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full w-fit border border-white/10">
            <Flame className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-xs font-medium text-amber-100 tracking-wider">
              ตำรับโบราณคัดพิเศษ
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold leading-tight text-white drop-shadow-sm font-['Prompt']">
            รวมสุดยอดน้ำพริกไทยโบราณ
          </h1>

          <p className="text-xs sm:text-sm text-red-100 leading-relaxed max-w-xl">
            ตำสดใหม่ทุกเช้า กลิ่นหอมฟุ้งจากครกหิน ครบรสเปรี้ยว เค็ม เผ็ด หวานนัว ราคาส่งตรงจากครัวคุณย่า
          </p>

          {/* Flat Price Badge Highlight */}
          <div className="mt-1 pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/15">
            <div className="inline-flex items-baseline gap-1.5 bg-white text-[#b51d04] px-3.5 py-1.5 rounded-xl shadow-md">
              <span className="text-xs font-semibold">ราคาเดียว</span>
              <span className="text-2xl sm:text-3xl font-extrabold leading-none tracking-tight">
                50.-
              </span>
              <span className="text-xs text-[#5b403b] font-medium">/ กระปุกทุกเมนู</span>
            </div>

            <div className="flex items-center gap-1.5 text-white text-xs bg-black/20 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-white/10">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span className="font-medium">สะอาด ไม่ใส่สารกันบูด</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
