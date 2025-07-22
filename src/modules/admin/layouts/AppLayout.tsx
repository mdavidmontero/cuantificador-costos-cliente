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

        <main className="flex flex-1 flex-col bg-[#f0f9ff]">
          <section className="w-full px-4 md:px-8 py-8">
            <div className="mx-auto w-full max-w-screen-xl space-y-6 @container/main">
              <Outlet />
            </div>
          </section>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
