'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import Chatbot from '@/components/Chatbot';
import CartDrawer from '@/components/CartDrawer';
import { useAuth } from '@/context/AuthContext';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  const isAuthPage = pathname === '/login' || pathname === '/signup';

  // For Admin Routes, we don't want the public Navbar/Footer/etc.
  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <CartDrawer />
      {children}
      {!isAuthPage && <Footer />}
      <Chatbot />
    </>
  );
}
