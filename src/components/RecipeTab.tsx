import React, { useState, useEffect } from 'react';
import { ChiliPaste } from '../data/chiliPastes';
import {
  Flame,
  Timer,
  Scale,
  Sparkles,
  ShoppingBag,
  Share2,
  Printer,
  Bookmark,
  CheckCircle2,
  Lightbulb,
  Play,
  Pause,
  RotateCcw,
  Users,
} from 'lucide-react';

interface RecipeTabProps {
  chiliPastes: ChiliPaste[];
  selectedPasteId: string;
  onSelectPasteId: (id: string) => void;
  onAddToCart: (paste: ChiliPaste) => void;
  onShowToast: (message: string) => void;
}

export const RecipeTab: React.FC<RecipeTabProps> = ({
  chiliPastes,
  selectedPasteId,
  onSelectPasteId,
  onAddToCart,
  onShowToast,
}) => {
  // Completed step checkboxes tracker: Record<string, boolean>
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  // Bookmarks
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});
  // Servings multiplier (1x = 3-4 ที่, 0.5x = 1-2 ที่, 2x = 6-8 ที่)
  const [servingScale, setServingScale] = useState<number>(1);

  // Live Kitchen Timer State
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [showTimerTool, setShowTimerTool] = useState<boolean>(false);

  const currentPaste =
    chiliPastes.find((p) => p.id === selectedPasteId) || chiliPastes[0];

  // Timer interval effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      onShowToast('⏰ ครบเวลาปรุงแล้ว! ตรวจสอบกลิ่นหอมและรสชาติตามสูตร');
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const startTimer = (seconds: number) => {
    setTimerSeconds(seconds);
    setIsTimerRunning(true);
    setShowTimerTool(true);
    onShowToast(`เริ่มจับเวลา ${Math.floor(seconds / 60)} นาที`);
  };

  const handleToggleStep = (stepNumber: number) => {
    const key = `${currentPaste.id}-step-${stepNumber}`;
    const nextState = !completedSteps[key];
    setCompletedSteps((prev) => ({
      ...prev,
      [key]: nextState,
    }));

    if (nextState) {
      onShowToast(`ยอดเยี่ยม! ทำข้อที่ ${stepNumber} สำเร็จแล้ว 🎉`);
    }
  };

  const handleToggleBookmark = () => {
    const nextState = !bookmarked[currentPaste.id];
    setBookmarked((prev) => ({
      ...prev,
      [currentPaste.id]: nextState,
    }));
    onShowToast(
      nextState
        ? `บันทึกสูตร "${currentPaste.name}" ลงรายการโปรดแล้ว`
        : `นำสูตร "${currentPaste.name}" ออกจากรายการโปรดแล้ว`
    );
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `สูตรวิธีทำ ${currentPaste.name}`,
          text: `สูตรเด็ด ${currentPaste.name} ละเอียดเป็นข้อๆ ทำตามได้ทันที!`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      onShowToast('คัดลอกลิงก์สูตรเรียบร้อยแล้ว');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Calculate completed count for current recipe
  const completedCount = currentPaste.steps.filter(
    (s) => completedSteps[`${currentPaste.id}-step-${s.stepNumber}`]
  ).length;

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col gap-5 pt-3 pb-8">
      {/* Top Recipe Selector Bar (Tactile Herbal Filter Tabs matching Image 3.png) */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#8c4c00] tracking-wider uppercase">
            คัมภีร์ตำรับโบราณ
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-[#5b403b] bg-[#f8ecdc] px-2.5 py-0.5 rounded-full font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#b51d04]" />
            {chiliPastes.length} เมนูตำรับเอก
          </span>
        </div>

        {/* Scrollable Horizontal Tabs with authentic styling */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {chiliPastes.map((paste) => {
            const isActive = paste.id === currentPaste.id;
            return (
              <button
                key={paste.id}
                onClick={() => {
                  onSelectPasteId(paste.id);
                  setServingScale(1);
                }}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 active:scale-95 ${
                  isActive
                    ? 'bg-[#b51d04] text-white shadow-md'
                    : 'bg-[#f2e7d6] text-[#201b11] hover:bg-[#ece1d1]'
                }`}
              >
                <span>🍳</span>
                <span>{paste.alias || paste.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Visual Header Card (Image 3.png) */}
      <article className="relative w-full rounded-2xl overflow-hidden shadow-sm bg-white border border-[#ece1d1]">
        <div className="relative w-full h-52 sm:h-64 bg-[#f8ecdc]">
          <img
            src={currentPaste.image}
            alt={currentPaste.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          {/* Spiciness Level Badge */}
          <div className="absolute top-3.5 right-3.5 flex items-center gap-1 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-sm">
            <div className="flex items-center">
              {Array.from({ length: currentPaste.spiciness }).map((_, i) => (
                <Flame
                  key={i}
                  className="w-3.5 h-3.5 text-[#b51d04] fill-[#b51d04]"
                />
              ))}
            </div>
            <span className="text-xs font-bold text-[#201b11] ml-1">
              {currentPaste.spicinessLabel}
            </span>
          </div>

          {/* Bottom Title & Cooking Time */}
          <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between text-white">
            <div className="flex flex-col gap-1">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#b51d04]/90 text-[11px] font-semibold text-white backdrop-blur-sm w-fit">
                {currentPaste.subtitle} • {currentPaste.regionLabel}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white drop-shadow-sm font-['Prompt']">
                {currentPaste.alias || currentPaste.name}
              </h2>
            </div>

            <button
              onClick={() => {
                setShowTimerTool(!showTimerTool);
                if (timerSeconds === 0) setTimerSeconds(15 * 60);
              }}
              className="flex items-center gap-1.5 text-xs bg-black/50 hover:bg-black/70 px-3 py-1.5 rounded-xl backdrop-blur-sm shrink-0 border border-white/20 transition-colors"
            >
              <Timer className="w-4 h-4 text-amber-300" />
              <span>{currentPaste.cookingTime}</span>
            </button>
          </div>
        </div>

        {/* Live Kitchen Timer Popup / Drawer */}
        {showTimerTool && (
          <div className="p-3.5 bg-[#201b11] text-white flex flex-wrap items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center gap-2.5">
              <Timer className="w-5 h-5 text-amber-400 animate-pulse" />
              <div className="flex flex-col">
                <span className="text-[11px] text-zinc-300">
                  นาฬิกาจับเวลาช่วยทำอาหาร:
                </span>
                <span className="text-xl font-bold font-mono text-amber-400">
                  {formatTimer(timerSeconds)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="px-3 py-1.5 rounded-lg bg-[#b51d04] hover:bg-[#d9381e] text-xs font-bold flex items-center gap-1"
              >
                {isTimerRunning ? (
                  <>
                    <Pause className="w-3.5 h-3.5" /> พัก
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" /> เริ่ม
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setTimerSeconds(15 * 60);
                }}
                className="p-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white"
                title="รีเซ็ต"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => startTimer(5 * 60)}
                className="px-2 py-1 text-[11px] bg-zinc-800 hover:bg-zinc-700 rounded-md"
              >
                5น.
              </button>
              <button
                onClick={() => startTimer(15 * 60)}
                className="px-2 py-1 text-[11px] bg-zinc-800 hover:bg-zinc-700 rounded-md"
              >
                15น.
              </button>
            </div>
          </div>
        )}

        {/* Flavor Harmony Ratio Bar */}
        <div className="p-4 bg-[#fef2e1] border-t border-[#ece1d1] flex flex-col gap-2">
          <div className="flex justify-between items-center text-xs text-[#5b403b]">
            <span className="flex items-center gap-1.5 font-bold text-[#201b11]">
              <Scale className="w-4 h-4 text-[#8c4c00]" />
              สัดส่วนมิติรสชาติ (Flavor Harmony)
            </span>
            <span className="text-[#8c4c00] font-medium">
              {currentPaste.flavorSummary}
            </span>
          </div>

          <div className="w-full h-2.5 rounded-full overflow-hidden flex bg-[#ece1d1]">
            {currentPaste.flavorDimensions.map((dim, i) => (
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

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#5b403b] pt-1">
            {currentPaste.flavorDimensions.map((dim, i) => (
              <span key={i} className="flex items-center gap-1.5 font-medium">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: dim.colorHex }}
                />
                {dim.label} {dim.percent}%
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* Accurate Ingredients Card (สัดส่วนวัตถุดิบแม่นยำ) */}
      <section className="p-4 sm:p-5 rounded-2xl bg-white border border-[#ece1d1] shadow-sm">
        <div className="flex flex-wrap items-center justify-between pb-3 mb-3 border-b border-[#ece1d1] gap-2">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-[#ffdad3] flex items-center justify-center text-[#b51d04] font-bold text-sm">
              🧂
            </span>
            <div>
              <h3 className="text-base font-bold text-[#201b11]">
                สัดส่วนวัตถุดิบแม่นยำ
              </h3>
              <span className="text-[11px] text-[#5b403b]">
                สูตรโบราณตวงชั่งอย่างพิถีพิถัน
              </span>
            </div>
          </div>

          {/* Servings Scaler Buttons */}
          <div className="flex items-center gap-1 bg-[#f8ecdc] p-1 rounded-xl">
            <button
              onClick={() => setServingScale(0.5)}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
                servingScale === 0.5
                  ? 'bg-white text-[#b51d04] shadow-xs font-bold'
                  : 'text-[#5b403b] hover:text-[#201b11]'
              }`}
            >
              1-2 ที่
            </button>
            <button
              onClick={() => setServingScale(1)}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
                servingScale === 1
                  ? 'bg-white text-[#b51d04] shadow-xs font-bold'
                  : 'text-[#5b403b] hover:text-[#201b11]'
              }`}
            >
              3-4 ที่ (ปกติ)
            </button>
            <button
              onClick={() => setServingScale(2)}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
                servingScale === 2
                  ? 'bg-white text-[#b51d04] shadow-xs font-bold'
                  : 'text-[#5b403b] hover:text-[#201b11]'
              }`}
            >
              6-8 ที่
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {currentPaste.ingredients.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 rounded-xl bg-[#fff8f2] border border-[#ece1d1]/80 hover:bg-[#fef2e1] transition-colors"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2 h-2 rounded-full bg-[#b51d04] shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-[#201b11] truncate">
                  {item.name}
                </span>
              </div>
              <span className="text-xs font-bold text-[#8c4c00] bg-white px-2 py-0.5 rounded-lg border border-[#ece1d1] shrink-0">
                {servingScale === 1
                  ? item.amount
                  : `${item.amount} (${servingScale === 0.5 ? 'ลดครึ่ง' : 'คูณสอง'})`}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 5 Step-by-Step Cooking Checklist (Image 3.png) */}
      <section className="p-4 sm:p-5 rounded-2xl bg-white border border-[#ece1d1] shadow-sm print-area">
        <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-[#ece1d1]">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-[#a3f69c]/40 flex items-center justify-center text-[#1b6d24] font-bold text-sm">
              📋
            </span>
            <div>
              <h3 className="text-base font-bold text-[#201b11]">
                {currentPaste.steps.length} ขั้นตอนการปรุงตามลำดับ
              </h3>
              <p className="text-[11px] text-[#5b403b]">
                แตะข้อที่ทำเสร็จแล้วเพื่อเช็คความคืบหน้า
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-[#1b6d24] bg-[#e8f5e9] px-3 py-1 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>
              เสร็จแล้ว {completedCount}/{currentPaste.steps.length} ข้อ
            </span>
          </div>
        </div>

        {/* Steps List */}
        <div className="flex flex-col gap-3">
          {currentPaste.steps.map((step) => {
            const stepKey = `${currentPaste.id}-step-${step.stepNumber}`;
            const isDone = !!completedSteps[stepKey];

            return (
              <label
                key={step.stepNumber}
                className={`group flex items-start gap-3.5 p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isDone
                    ? 'bg-[#e8f5e9]/70 border-[#81c784]'
                    : 'bg-[#fff8f2] border-[#ece1d1] hover:bg-[#fef2e1]'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={() => handleToggleStep(step.stepNumber)}
                  className="mt-1 w-5 h-5 rounded text-[#1b6d24] accent-[#1b6d24] focus:ring-[#1b6d24] shrink-0 cursor-pointer"
                />

                <div className="flex-1 min-w-0 flex flex-col gap-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold shrink-0 ${
                        isDone
                          ? 'bg-[#1b6d24] text-white'
                          : 'bg-[#b51d04] text-white'
                      }`}
                    >
                      {step.stepNumber}
                    </span>
                    <span
                      className={`text-sm sm:text-base font-bold transition-all ${
                        isDone
                          ? 'line-through text-[#907069]'
                          : 'text-[#201b11]'
                      }`}
                    >
                      ข้อ {step.stepNumber}: {step.title}
                    </span>
                  </div>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed transition-all ${
                      isDone ? 'text-[#907069]' : 'text-[#5b403b]'
                    }`}
                  >
                    {step.instruction}
                  </p>

                  {step.tip && (
                    <div className="mt-1.5 p-2 rounded-lg bg-[#fff8f2] border border-[#ece1d1]/80 text-[11px] text-[#8c4c00] flex items-start gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-600" />
                      <span>
                        <strong>เคล็ดลับก้นครัว:</strong> {step.tip}
                      </span>
                    </div>
                  )}
                </div>
              </label>
            );
          })}
        </div>
      </section>

      {/* Cooking Pro Tips (Image 3.png) */}
      <section className="rounded-2xl p-4 sm:p-5 bg-[#f8ecdc] border border-[#ece1d1] shadow-sm">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-9 h-9 rounded-full bg-[#8c4c00] text-white flex items-center justify-center shadow-sm">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#201b11]">
              เคล็ดลับความอร่อยคู่ครัว (Cooking Pro Tips)
            </h3>
            <span className="text-xs text-[#8c4c00]">
              ภูมิปัญญาแม่ครัวก้นครัวไทยโบราณ
            </span>
          </div>
        </div>

        <div className="space-y-2.5">
          {currentPaste.secretTips.map((tip, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#ece1d1]/80 shadow-2xs"
            >
              <CheckCircle2 className="w-4 h-4 text-[#1b6d24] mt-0.5 shrink-0" />
              <p className="text-xs sm:text-sm text-[#201b11] leading-relaxed">
                {tip}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Order this paste callout */}
      <section className="p-4 rounded-2xl bg-gradient-to-r from-[#b51d04] to-[#d9381e] text-white flex items-center justify-between gap-3 shadow-md">
        <div className="flex flex-col">
          <span className="text-xs text-red-100">ไม่อยากตำเอง? สั่งซื้อได้เลย</span>
          <h4 className="text-base font-bold">
            {currentPaste.name} กระปุกละ 50.-
          </h4>
          <span className="text-[11px] text-red-200">
            บรรจุ 120 กรัม ซีลสูญญากาศส่งถึงบ้าน
          </span>
        </div>
        <button
          onClick={() => onAddToCart(currentPaste)}
          className="px-4 py-2.5 rounded-xl bg-white text-[#b51d04] hover:bg-red-50 font-bold text-xs sm:text-sm shadow transition-transform active:scale-95 flex items-center gap-1.5 shrink-0"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>สั่งกระปุกนี้ 50.-</span>
        </button>
      </section>

      {/* Interactive Action Bar: Print, Save & Share Recipes (Image 3.png) */}
      <section className="flex items-center gap-2.5 no-print">
        <button
          onClick={handleShare}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#f2e7d6] text-[#201b11] hover:bg-[#ece1d1] font-semibold text-xs sm:text-sm transition-all active:scale-95 shadow-2xs"
        >
          <Share2 className="w-4 h-4 text-[#8c4c00]" />
          <span>แบ่งปันสูตรนี้</span>
        </button>

        <button
          onClick={handlePrint}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#f2e7d6] text-[#201b11] hover:bg-[#ece1d1] font-semibold text-xs sm:text-sm transition-all active:scale-95 shadow-2xs"
        >
          <Printer className="w-4 h-4 text-[#8c4c00]" />
          <span>พิมพ์สูตร</span>
        </button>

        <button
          onClick={handleToggleBookmark}
          aria-label="บันทึกสูตรโปรด"
          className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all active:scale-95 shadow-2xs ${
            bookmarked[currentPaste.id]
              ? 'bg-[#b51d04] text-white shadow-md'
              : 'bg-[#f2e7d6] text-[#8c4c00] hover:bg-[#ece1d1]'
          }`}
        >
          <Bookmark
            className={`w-5 h-5 ${
              bookmarked[currentPaste.id] ? 'fill-current' : ''
            }`}
          />
        </button>
      </section>
    </div>
  );
};
