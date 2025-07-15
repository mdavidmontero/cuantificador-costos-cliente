import { AppSidebar } from "@/components/shared/dashboard/AdminSidebar";
import { SiteHeader } from "@/components/shared/dashboard/SiteHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />

        <main className="flex flex-1 flex-col min-h-screen bg-muted">
          <section className="flex flex-col gap-6 py-6 px-4 md:px-8 @container/main">
            <div className="w-full max-w-7xl mx-auto">
              <Outlet />
            </div>
          </section>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
