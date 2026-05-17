import { AppSidebar } from '@/components/app-sidebar'
import { DashboardNavbar } from '@/components/dashboard-navbar'
import { SidebarProvider } from '@/lib/sidebar-context'
import SidebarLayoutWrapper from '@/components/sidebar-layout-wrapper'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background flex">
        <AppSidebar />
        <SidebarLayoutWrapper>
          <DashboardNavbar />
          <main className="flex-1 mt-16 p-6 overflow-auto">
            {children}
          </main>
        </SidebarLayoutWrapper>
      </div>
    </SidebarProvider>
  )
}
