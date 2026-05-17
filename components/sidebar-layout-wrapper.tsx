'use client'

import { useSidebar } from '@/lib/sidebar-context'
import { motion } from 'framer-motion'

export default function SidebarLayoutWrapper({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar()

  return (
    <motion.div
      animate={{ marginLeft: isCollapsed ? 80 : 256 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="flex-1 flex flex-col"
    >
      {children}
    </motion.div>
  )
}
