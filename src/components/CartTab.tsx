import React, { useState } from 'react';
import { ChiliPaste } from '../data/chiliPastes';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Gift,
  Truck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export interface CartItem {
  paste: ChiliPaste;
  quantity: number;
}

interface CartTabProps {
  cart: CartItem[];
  onUpdateQuantity: (pasteId: string, delta: number) => void;
  onRemoveItem: (pasteId: string) => void;
  onClearCart: () => void;
  onGoToMenu: () => void;
  onShowToast: (message: string) => void;
}

export const CartTab: React.FC<CartTabProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onGoToMenu,
  onShowToast,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNote, setCustomerNote] = useState('');
  const [orderCompleteData, setOrderCompleteData] = useState<{
    orderId: string;
    totalAmount: number;
    itemsCount: number;
    hasFreeVeg: boolean;
  } | null>(null);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = totalItems * 50;
  const shippingFee = totalItems > 0 ? (totalItems >= 6 ? 0 : 40) : 0;
  const grandTotal = subtotal + shippingFee;
  const hasFreeVeg = totalItems >= 4;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      onShowToast('กรุณากรอกข้อมูลชื่อ เบอร์โทร และที่อยู่จัดส่งให้ครบถ้วน');
      return;
    }

    const orderId = `NPK-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderCompleteData({
      orderId,
      totalAmount: grandTotal,
      itemsCount: totalItems,
      hasFreeVeg,
    });
    onClearCart();
    onShowToast(`สั่งซื้อสำเร็จ! รหัสคำสั่งซื้อ: ${orderId}`);
  };

  if (orderCompleteData) {
    return (
      <div className="py-8 flex flex-col items-center text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-[#1b6d24] text-white flex items-center justify-center shadow-lg animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold text-[#1b6d24] tracking-wider uppercase">
            รับคำสั่งซื้อเรียบร้อยแล้ว
          </span>
          <h2 className="text-2xl font-bold text-[#201b11] font-['Prompt']">
            ขอบคุณสำหรับคำสั่งซื้อ!
          </h2>
          <p className="text-xs sm:text-sm text-[#5b403b] max-w-sm">
            รหัสคำสั่งซื้อ #{orderCompleteData.orderId}
            <br />
            ครัวคุณย่ากำลังเริ่มตำสดใหม่ตามออเดอร์ของท่าน และจะรีบจัดส่งให้ไวที่สุดครับ
          </p>
        </div>

        <div className="w-full max-w-md p-4 rounded-2xl bg-white border border-[#ece1d1] text-left text-xs sm:text-sm space-y-2 mt-2">
          <div className="flex justify-between py-1 border-b border-[#ece1d1]">
            <span className="text-[#5b403b]">จำนวนน้ำพริก:</span>
            <span className="font-bold">{orderCompleteData.itemsCount} กระปุก</span>
          </div>
          {orderCompleteData.hasFreeVeg && (
            <div className="flex justify-between py-1 border-b border-[#ece1d1] text-[#1b6d24]">
              <span className="font-medium flex items-center gap-1">
                <Gift className="w-3.5 h-3.5" /> ของแถมพิเศษ:
              </span>
              <span className="font-bold">ชุดผักสดรวมมิตร 1 เซ็ต (ฟรี)</span>
            </div>
          )}
          <div className="flex justify-between py-1 font-bold text-base text-[#b51d04] pt-2">
            <span>ยอดชำระสุทธิ (เก็บเงินปลายทาง):</span>
            <span>{orderCompleteData.totalAmount} บาท</span>
          </div>
        </div>

        <button
          onClick={() => {
            setOrderCompleteData(null);
            onGoToMenu();
          }}
          className="mt-2 px-6 py-3 rounded-xl bg-[#b51d04] text-white font-bold text-sm shadow hover:bg-[#d9381e] transition-transform active:scale-95"
        >
          กลับไปดูเมนูน้ำพริก
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="py-12 flex flex-col items-center text-center gap-3">
        <div className="w-16 h-16 rounded-full bg-[#f8ecdc] text-[#907069] flex items-center justify-center">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-[#201b11]">
          ยังไม่มีรายการในตะกร้า
        </h3>
        <p className="text-xs sm:text-sm text-[#5b403b] max-w-xs">
          เลือกสรรน้ำพริกโบราณที่คุณชื่นชอบ ราคาเดียว 50 บาททุกกระปุก ตำสดใหม่ทุกวัน
        </p>
        <button
          onClick={onGoToMenu}
          className="mt-2 px-6 py-2.5 rounded-xl bg-[#b51d04] text-white font-semibold text-sm shadow hover:bg-[#d9381e] transition-transform active:scale-95 flex items-center gap-2"
        >
          <span>ดูรายการน้ำพริก 50 บาท</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 pt-3 pb-8">
      {/* Top Banner */}
      <div className="flex items-center justify-between pb-2 border-b border-[#ece1d1]">
        <div>
          <h2 className="text-lg font-bold text-[#201b11]">
            ตะกร้าสั่งซื้อน้ำพริก
          </h2>
          <span className="text-xs text-[#5b403b]">
            ราคาเดียว 50 บาททุกเมนู บรรจุ 120 กรัม/กระปุก
          </span>
        </div>
        <button
          onClick={onClearCart}
          className="text-xs text-[#907069] hover:text-[#b51d04] flex items-center gap-1 font-medium"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>ล้างตะกร้า</span>
        </button>
      </div>

      {/* Cart Items List */}
      <div className="flex flex-col gap-3">
        {cart.map(({ paste, quantity }) => (
          <div
            key={paste.id}
            className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#ece1d1] shadow-2xs"
          >
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#f8ecdc] shrink-0">
              <img
                src={paste.image}
                alt={paste.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-[#201b11] truncate">
                {paste.number}. {paste.name}
              </h4>
              <span className="text-xs text-[#1b6d24] font-medium">
                {paste.subtitle}
              </span>
              <div className="text-xs font-bold text-[#b51d04] mt-0.5">
                50.- <span className="text-[11px] text-[#5b403b] font-normal">x {quantity} = {quantity * 50} บาท</span>
              </div>
            </div>

            {/* Quantity controls */}
            <div className="flex items-center gap-2 bg-[#f8ecdc] px-2 py-1 rounded-xl shrink-0">
              <button
                onClick={() => onUpdateQuantity(paste.id, -1)}
                className="w-6 h-6 flex items-center justify-center rounded-lg bg-white text-[#201b11] hover:bg-[#ece1d1] active:scale-90"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-bold w-4 text-center">
                {quantity}
              </span>
              <button
                onClick={() => onUpdateQuantity(paste.id, 1)}
                className="w-6 h-6 flex items-center justify-center rounded-lg bg-white text-[#201b11] hover:bg-[#ece1d1] active:scale-90"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Free Gift & Promotion Notification */}
      <div
        className={`p-3.5 rounded-2xl border flex items-center gap-3 ${
          hasFreeVeg
            ? 'bg-[#e8f5e9] border-[#81c784] text-[#1b6d24]'
            : 'bg-[#fef2e1] border-[#ece1d1] text-[#8c4c00]'
        }`}
      >
        <Gift className="w-5 h-5 shrink-0" />
        <div className="flex-1 text-xs sm:text-sm">
          {hasFreeVeg ? (
            <div>
              <span className="font-bold">ได้รับสิทธิ์ของแถมฟรี!</span> ชุดผักสดรวมมิตร & แตงกวากรอบ 1 เซ็ต
            </div>
          ) : (
            <div>
              สั่งอีก <span className="font-bold">{4 - totalItems} กระปุก</span> เพื่อรับฟรี! ชุดผักสดรวมมิตรคู่เคียง
            </div>
          )}
        </div>
      </div>

      {/* Pricing Summary */}
      <div className="p-4 rounded-2xl bg-white border border-[#ece1d1] shadow-2xs space-y-2 text-xs sm:text-sm">
        <div className="flex justify-between text-[#5b403b]">
          <span>รวมค่าน้ำพริก ({totalItems} กระปุก):</span>
          <span>{subtotal} บาท</span>
        </div>
        <div className="flex justify-between text-[#5b403b]">
          <span className="flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-[#8c4c00]" /> ค่าจัดส่ง (ส่งด่วนควบคุมอุณหภูมิ):
          </span>
          <span>
            {shippingFee === 0 ? (
              <span className="text-[#1b6d24] font-bold">ฟรี (สั่ง 6 กระปุกขึ้นไป)</span>
            ) : (
              `${shippingFee} บาท`
            )}
          </span>
        </div>
        {hasFreeVeg && (
          <div className="flex justify-between text-[#1b6d24] font-medium">
            <span>ชุดผักแนมรวมมิตรสด:</span>
            <span>ฟรี</span>
          </div>
        )}
        <div className="border-t border-[#ece1d1] pt-2 flex justify-between font-bold text-base text-[#201b11]">
          <span>ยอดรวมทั้งหมด:</span>
          <span className="text-[#b51d04]">{grandTotal} บาท</span>
        </div>
      </div>

      {/* Delivery Form */}
      <form onSubmit={handleCheckout} className="p-4 sm:p-5 rounded-2xl bg-white border border-[#ece1d1] shadow-sm flex flex-col gap-3">
        <h3 className="text-sm font-bold text-[#201b11]">
          ข้อมูลสำหรับจัดส่ง (เก็บเงินปลายทาง / โอนเงิน)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-[#5b403b] block mb-1">
              ชื่อ-นามสกุล ผู้รับ *
            </label>
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="เช่น คุณสมศรี ใจดี"
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-[#fff8f2] border border-[#ece1d1] focus:ring-2 focus:ring-[#b51d04] focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#5b403b] block mb-1">
              เบอร์โทรศัพท์ติดต่อ *
            </label>
            <input
              type="tel"
              required
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="เช่น 081-234-5678"
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-[#fff8f2] border border-[#ece1d1] focus:ring-2 focus:ring-[#b51d04] focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-[#5b403b] block mb-1">
            ที่อยู่จัดส่งโดยละเอียด *
          </label>
          <textarea
            required
            rows={2}
            value={customerAddress}
            onChange={(e) => setCustomerAddress(e.target.value)}
            placeholder="บ้านเลขที่, ซอย, ถนน, ตำบล, อำเภอ, จังหวัด, รหัสไปรษณีย์"
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-[#fff8f2] border border-[#ece1d1] focus:ring-2 focus:ring-[#b51d04] focus:outline-none"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-[#5b403b] block mb-1">
            หมายเหตุเพิ่มเติม (ถ้ามี)
          </label>
          <input
            type="text"
            value={customerNote}
            onChange={(e) => setCustomerNote(e.target.value)}
            placeholder="เช่น ฝากไว้หน้าบ้าน, ทานเผ็ดน้อย, etc."
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-[#fff8f2] border border-[#ece1d1] focus:ring-2 focus:ring-[#b51d04] focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="mt-2 w-full py-3 rounded-xl bg-[#b51d04] hover:bg-[#d9381e] text-white font-bold text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>ยืนยันการสั่งซื้อ ({grandTotal} บาท)</span>
        </button>
      </form>
    </div>
  );
};
