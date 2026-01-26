import { useState } from "react";

export function MainBanner() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative mb-8 overflow-hidden rounded-2xl bg-zinc-100 shadow-sm md:h-[300px] lg:h-[350px]">
      <div
        className={`bg-zinc-200 absolute inset-0 transition-opacity duration-500 ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`}
      />
      <img
        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
        alt="Spring Grand Sale"
        className={`h-full w-full object-cover transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setIsLoaded(true)}
      />
      <div className="absolute inset-0 flex flex-col justify-center bg-black/30 p-8 md:p-12">
        <h2 className="mb-2 text-3xl font-bold text-white shadow-sm md:text-5xl">
          2026 설 명절 선물세트
        </h2>
        <p className="text-lg font-medium text-white/90 shadow-sm md:text-xl">
          정성스럽게 준비한 프리미엄 답례품과 단체선물
        </p>
      </div>
    </div>
  );
}
