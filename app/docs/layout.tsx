'use client'

import { Navbar } from '@/components/Navbar'
import { Sidebar, SidebarProvider, useSidebar } from '@/components/Sidebar'
import { TableOfContents } from '@/components/TableOfContents'
import { AIAssistant, AIAssistantProvider } from '@/components/AIAssistant'

function DocsLayoutContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar()

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div
        className="flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out docs-main-content"
        style={{ marginLeft: isCollapsed ? 64 : 260 }}
      >
        <Navbar />
        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-10 xl:px-12 max-w-[1440px] w-full mx-auto flex gap-6 lg:gap-10">
          <div className="flex-1 min-w-0 max-w-3xl doc-content">
            {children}
          </div>
          <aside className="hidden xl:block w-64 shrink-0">
            <TableOfContents />
          </aside>
        </main>
      </div>
      <AIAssistant />
    </div>
  )
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <AIAssistantProvider>
      <SidebarProvider>
        <DocsLayoutContent>{children}</DocsLayoutContent>
      </SidebarProvider>
    </AIAssistantProvider>
  )
}
