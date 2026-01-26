import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
  onSearch?: (query: string) => void;
  cartItemCount?: number;
}

export function Layout({ children, onSearch, cartItemCount = 0 }: LayoutProps) {
  const handleSearch = (query: string) => {
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header onSearch={handleSearch} cartItemCount={cartItemCount} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
