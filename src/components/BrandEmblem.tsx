import { BookOpen } from 'lucide-react';
import { useState } from 'react';

interface BrandEmblemProps {
  className?: string;
}

export function BrandEmblem({ className = 'w-28' }: BrandEmblemProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`relative aspect-[61/50] overflow-hidden rounded-2xl bg-[#F8F6F0] border border-[#E5DEC9] shadow-sm shrink-0 ${className}`}
    >
      {!failed ? (
        <img
          src="/assets/aistudio/Premium_Arabic_Learning_Brand_Board__3__e778b0aa.png"
          alt="شعار الهوية البصرية لمنصة سوبر ميرو لتعلم اللغة العربية"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className="absolute max-w-none pointer-events-none select-none"
          style={{
            width: '293%',
            height: 'auto',
            left: '-5.8%',
            top: '-2.4%',
          }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-[#0F6F6B]">
          <BookOpen className="w-8 h-8" />
        </div>
      )}
    </div>
  );
}
