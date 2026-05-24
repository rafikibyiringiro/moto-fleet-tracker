import { LayoutDashboard, Bike, MapPin, CreditCard, Shield, Settings, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'fleet', label: 'Fleet Management', icon: Bike },
    { id: 'map', label: 'GPS Tracking', icon: MapPin },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'insurance', label: 'Insurance', icon: Shield },
  ];

  return (
    <>
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-card border-r transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="bg-primary p-2 rounded-xl">
              <Bike className="text-primary-foreground h-6 w-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">MotoRental Pro</h1>
          </div>

          <nav className="flex-1 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  activeTab === item.id 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="pt-6 border-t">
             <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
              <Settings className="h-4 w-4" />
              Settings
            </button>
          </div>
        </div>
      </div>
    </>
  );
};