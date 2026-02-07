
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import {
  Award,
  BotMessageSquare,
  HeartHandshake,
  LayoutDashboard,
  ListChecks,
  Settings,
  Building,
  Users,
  Briefcase,
} from 'lucide-react';
import { UserNav } from '@/components/user-nav';
import { useEffect } from 'react';
import { useUser } from '@/firebase/auth/use-user';
import { Loader2 } from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/donations', label: 'Donations', icon: HeartHandshake },
  { href: '/dashboard/tasks', label: 'My Tasks', icon: ListChecks },
  { href: '/dashboard/rewards', label: 'Rewards', icon: Award },
  { href: '/welfare-schemes', label: 'Welfare Schemes', icon: BotMessageSquare },
];

const getNavItemsByRole = (role?: string | null) => {
  switch (role) {
    case 'ngo':
      return [
        { href: '/dashboard/ngo', label: 'NGO Dashboard', icon: Building },
        { href: '/dashboard/donations', label: 'Donation Requests', icon: HeartHandshake },
      ];
    case 'beneficiary':
      return [
        { href: '/dashboard/beneficiary', label: 'Beneficiary Hub', icon: Users },
        { href: '/welfare-schemes', label: 'Find Schemes', icon: BotMessageSquare },
      ];
    case 'volunteer':
      return [
        { href: '/dashboard/volunteer', label: 'Volunteer Hub', icon: Users },
        { href: '/dashboard/tasks', label: 'Volunteer Tasks', icon: ListChecks },
        { href: '/dashboard/rewards', label: 'My Rewards', icon: Award },
      ];
    case 'company':
      return [
        { href: '/dashboard/company', label: 'CSR Dashboard', icon: Briefcase },
        { href: '/organizations', label: 'Partners', icon: Building },
      ];
    case 'admin':
      return []; // Admin has its own layout
    default: // donor
      return navItems;
  }
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user && user.role) {
      if (user.role === 'admin') {
          router.push('/admin');
          return;
      }
      if (pathname === '/dashboard') {
        const roleDashboard = user.role === 'donor' ? '/dashboard' : `/dashboard/${user.role}`;
        if (roleDashboard !== '/dashboard') {
          router.push(roleDashboard);
        }
      }
    }
  }, [user, pathname, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const currentNavItems = getNavItemsByRole(user?.role);
  if (user?.role === 'admin') return null; // Admin layout will handle it

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <Logo />
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {currentNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.label}>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith('/settings')}
                  tooltip="Settings"
                >
                  <Link href="/settings">
                    <Settings />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 sm:py-4">
            <SidebarTrigger className="md:hidden" />
            <div className="flex-1" />
            <UserNav />
          </header>
          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
