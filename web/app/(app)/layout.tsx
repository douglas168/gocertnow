import { AppNavbar } from "@/components/layout/app-navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppNavbar />
      <main>{children}</main>
    </>
  );
}
