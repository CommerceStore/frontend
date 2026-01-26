import { useNavigate } from "react-router-dom";
import { NavbarIconButton } from "@/shared/ui/Navbar";
import { SearchBar } from "@/shared/ui/SearchBar";

interface HeaderProps {
  onSearch: (query: string) => void;
  cartItemCount?: number;
}

export function Header({ onSearch, cartItemCount = 0 }: HeaderProps) {
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center">
            <a
              href="/"
              className="text-2xl font-bold tracking-tight text-zinc-900 hover:text-zinc-700 transition-colors"
            >
              담은
            </a>
          </div>

          <div className="hidden flex-1 md:block">
            <SearchBar onSearch={onSearch} placeholder="상품을 검색해보세요" />
          </div>

          <div className="flex items-center gap-3">
            <NavbarIconButton
              icon={
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              }
              label="장바구니"
              badge={cartItemCount}
              onClick={handleCartClick}
            />

            <NavbarIconButton
              icon={
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              }
              label="마이페이지"
            />
          </div>
        </div>

        <div className="pb-3 md:hidden">
          <SearchBar onSearch={onSearch} placeholder="상품 검색" />
        </div>
      </div>
    </header>
  );
}
