import type { ReactNode } from "react";
import { Navbar } from "@organisms";

interface MainLayoutProps {
  children: ReactNode;
  cartCount: number;
}

export function MainLayout({ children, cartCount }: MainLayoutProps) {
  return (
    <div className="main-layout">
      <Navbar cartCount={cartCount} />
      <main className="content">{children}</main>
    </div>
  );
}
