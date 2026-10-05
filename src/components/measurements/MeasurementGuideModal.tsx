import React from 'react';
import { X, HelpCircle } from 'lucide-react';

interface GuideProps {
  isOpen: boolean;
  onClose: () => void;
  clothingType?: string;
}

export const MeasurementGuideModal: React.FC<GuideProps> = ({ isOpen, onClose, clothingType = 'blouse' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FAF7F2] border border-[#E3DDD1] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D7]">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#6B1D2F]" />
            <h3 className="text-xl font-serif font-bold text-[#1A1716]">Visual Measurement Guide</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#6E645A] hover:text-[#1A1716] hover:bg-[#EFE9DD] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Anatomical Diagram SVG */}
          <div className="bg-[#F3ECE2] rounded-xl p-4 flex flex-col items-center justify-center border border-[#E5DDCF]">
            <svg viewBox="0 0 280 400" className="w-full max-w-[240px] h-auto" fill="none">
              {/* Figure outline */}
              <circle cx="140" cy="45" r="22" fill="#E2D4C3" stroke="#8C8275" strokeWidth="1.5" />
              {/* Neck */}
              <path d="M133 67 L147 67 L149 85 L131 85 Z" fill="#E2D4C3" stroke="#8C8275" strokeWidth="1.5" />
              {/* Torso */}
              <path
                d="M105 100 C115 92, 165 92, 175 100 L188 150 L176 195 L168 240 L185 360 L155 360 L146 260 L134 260 L125 360 L95 360 L112 240 L104 195 L92 150 Z"
                fill="#EAE0D3"
                stroke="#8C8275"
                strokeWidth="1.5"
              />
              {/* Arms */}
              <path d="M102 103 L70 200 L82 205 L108 140" fill="#E2D4C3" stroke="#8C8275" strokeWidth="1.5" />
              <path d="M178 103 L210 200 L198 205 L172 140" fill="#E2D4C3" stroke="#8C8275" strokeWidth="1.5" />

              {/* Measurement lines */}
              {/* 1. Shoulder */}
              <path d="M102 98 L178 98" stroke="#6B1D2F" strokeWidth="2.5" strokeDasharray="3 2" />
              <circle cx="102" cy="98" r="3" fill="#6B1D2F" />
              <circle cx="178" cy="98" r="3" fill="#6B1D2F" />
              <text x="140" y="93" fill="#6B1D2F" fontSize="10" fontWeight="bold" textAnchor="middle">1. Shoulder</text>

              {/* 2. Bust / Chest */}
              <path d="M96 142 L184 142" stroke="#6B1D2F" strokeWidth="2.5" strokeDasharray="3 2" />
              <circle cx="96" cy="142" r="3" fill="#6B1D2F" />
              <circle cx="184" cy="142" r="3" fill="#6B1D2F" />
              <text x="140" y="137" fill="#6B1D2F" fontSize="10" fontWeight="bold" textAnchor="middle">2. Bust</text>

              {/* 3. Waist */}
              <path d="M106 188 L174 188" stroke="#6B1D2F" strokeWidth="2.5" strokeDasharray="3 2" />
              <circle cx="106" cy="188" r="3" fill="#6B1D2F" />
              <circle cx="174" cy="188" r="3" fill="#6B1D2F" />
              <text x="140" y="183" fill="#6B1D2F" fontSize="10" fontWeight="bold" textAnchor="middle">3. Natural Waist</text>

              {/* 4. Hip */}
              <path d="M112 235 L168 235" stroke="#6B1D2F" strokeWidth="2.5" strokeDasharray="3 2" />
              <circle cx="112" cy="235" r="3" fill="#6B1D2F" />
              <circle cx="168" cy="235" r="3" fill="#6B1D2F" />
              <text x="140" y="230" fill="#6B1D2F" fontSize="10" fontWeight="bold" textAnchor="middle">4. Hip</text>

              {/* 5. Sleeve */}
              <path d="M185 106 L210 200" stroke="#C5A059" strokeWidth="2.5" strokeDasharray="3 2" />
              <text x="215" y="150" fill="#C5A059" fontSize="10" fontWeight="bold">5. Sleeve</text>
            </svg>
            <span className="text-xs text-[#7A7063] mt-2 font-medium">Keep measuring tape snug but not tight</span>
          </div>

          {/* Guidelines list */}
          <div className="space-y-3.5 text-sm text-[#3E3831]">
            <div className="p-3 bg-[#FAF5ED] rounded-xl border border-[#ECE3D5]">
              <span className="font-semibold text-[#1A1716] block mb-0.5">1. Shoulder Width</span>
              <p className="text-xs text-[#6B6154]">Measure across the back from the edge of one shoulder bone to the opposite shoulder bone.</p>
            </div>

            <div className="p-3 bg-[#FAF5ED] rounded-xl border border-[#ECE3D5]">
              <span className="font-semibold text-[#1A1716] block mb-0.5">2. Bust / Chest (Fullest Part)</span>
              <p className="text-xs text-[#6B6154]">Measure around the fullest part of your bust wearing the undergarment you plan to wear with the outfit.</p>
            </div>

            <div className="p-3 bg-[#FAF5ED] rounded-xl border border-[#ECE3D5]">
              <span className="font-semibold text-[#1A1716] block mb-0.5">3. Natural Waist / Blouse Waist</span>
              <p className="text-xs text-[#6B6154]">For blouse: measure right under the ribcage where the blouse hem ends (usually 13–15"). For kurti: narrowest point of torso.</p>
            </div>

            <div className="p-3 bg-[#FAF5ED] rounded-xl border border-[#ECE3D5]">
              <span className="font-semibold text-[#1A1716] block mb-0.5">4. Armhole & Sleeve Length</span>
              <p className="text-xs text-[#6B6154]">Wrap the tape gently around armpit to shoulder tip for armhole. Measure from shoulder tip down to desired length.</p>
            </div>

            <div className="p-3 bg-[#FAF5ED] rounded-xl border border-[#ECE3D5]">
              <span className="font-semibold text-[#1A1716] block mb-0.5">5. Neck Depth (Front & Back)</span>
              <p className="text-xs text-[#6B6154]">Measure diagonally from the shoulder-neck junction point down to the desired neckline depth.</p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#E8E2D7] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-[#6B1D2F] text-white font-medium text-sm hover:bg-[#541423] transition-colors"
          >
            Got It, Proceed to Measure
          </button>
        </div>
      </div>
    </div>
  );
};
