export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-zinc-900">담은</h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              소중한 순간을 특별하게, 마음과 정성을 "담은"이 제안하는
              <br />
              맞춤 답례품과 단체선물 전문
            </p>
          </div>

          <div className="space-y-2 text-sm text-zinc-500">
            <p className="flex items-center gap-2">
              <span className="font-medium text-zinc-700">사업자등록번호</span>
              213-07-91877
            </p>
            <p className="flex items-center gap-2">
              <span className="font-medium text-zinc-700">주문문의</span>
              010-4097-7630
            </p>
            <p className="flex items-center gap-2">
              <span className="font-medium text-zinc-700">이메일</span>
              angelmom7634@naver.com
            </p>
            <p className="flex items-center gap-2">
              <span className="font-medium text-zinc-700">주소</span>
              대구광역시 수성구 동대구로59길 14-19, 5층
            </p>
          </div>

          <div className="border-t border-zinc-200 pt-6">
            <p className="text-xs text-zinc-400">
              © 2025 담은. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
