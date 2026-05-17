'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import {
  Search,
  Sun,
  Moon,
  Bell,
  User,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function DashboardNavbar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const [notifications] = useState([
    { id: 1, message: 'New appointment request from Sarah', time: '2m ago' },
    { id: 2, message: 'Payment successful from John Doe', time: '5m ago' },
    { id: 3, message: 'Support ticket opened', time: '1h ago' },
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <motion.header
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-30"
    >
      {/* Search */}
      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users, appointments..."
            className="pl-10 bg-input text-foreground border-border placeholder:text-muted-foreground focus:ring-primary"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full relative"
          aria-label="Toggle theme"
        >
          {mounted && theme === 'dark' ? (
            <Sun className="h-5 w-5 transition-all" />
          ) : (
            <Moon className="h-5 w-5 transition-all" />
          )}
        </Button>

        {/* Notifications */}
        <div className="relative group">
          <Button variant="ghost" size="icon" className="relative rounded-full">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 bg-accent rounded-full" />
          </Button>

          <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-lg p-4 hidden group-hover:block">
            <h3 className="font-semibold text-foreground mb-3">
              Notifications
            </h3>

            <div className="space-y-2">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="p-2 hover:bg-primary/5 rounded cursor-pointer transition-colors"
                >
                  <p className="text-sm text-foreground">{notif.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {notif.time}
                  </p>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-3" size="sm">
              View All
            </Button>
          </div>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 rounded-full"
          >
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-xs font-semibold text-primary">AD</span>
            </div>

            <span className="hidden sm:inline text-sm font-medium text-foreground">
              Dr. Karmakar
            </span>

            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </Button>

          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg overflow-hidden"
              >
                <div className="p-3 border-b border-border">
                  <p className="text-sm font-medium text-foreground">
                    Dr. Karmakar
                  </p>
                  <p className="text-xs text-muted-foreground">
                    admin@nourishwell.com
                  </p>
                </div>

                <div className="p-2">
                  <Link href="/dashboard/profile">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      size="sm"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                  </Link>

                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    size="sm"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}