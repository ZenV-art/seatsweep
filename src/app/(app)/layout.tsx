import { Sidebar } from "@/components/app/sidebar";

export default function AppLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[100dvh]">
      <Sidebar />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
