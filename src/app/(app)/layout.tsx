import { SiteNav } from "@/components/site-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNav />
      {children}
    </>
  );
}
