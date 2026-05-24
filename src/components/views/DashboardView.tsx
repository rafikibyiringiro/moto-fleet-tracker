import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardStats, Payment, Motorbike } from '@/types';
import { DollarSign, Bike, ShieldAlert, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardProps {
  stats: DashboardStats;
  recentPayments: Payment[];
  bikes: Motorbike[];
}

export const DashboardView = ({ stats, recentPayments, bikes }: DashboardProps) => {
  const statCards = [
    { label: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Active Rentals', value: stats.activeRentals, icon: Bike, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Available Fleet', value: stats.availableBikes, icon: Activity, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Insurance Alerts', value: stats.upcomingInsurances, icon: ShieldAlert, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Overview</h2>
        <p className="text-muted-foreground">Welcome back, here is what's happening with your fleet today.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                <div className={`${stat.bg} ${stat.color} p-2 rounded-lg`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                  +12% from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-full lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPayments.slice(0, 5).map((payment) => (
                <div key={payment.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center font-semibold">
                      {payment.customerName[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{payment.customerName}</p>
                      <p className="text-xs text-muted-foreground">{payment.bikeModel}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-emerald-600">+${payment.amount}</p>
                    <p className="text-xs text-muted-foreground">{payment.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-full lg:col-span-3">
          <CardHeader>
            <CardTitle>Fleet Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {['available', 'rented', 'maintenance'].map((status) => {
                const count = bikes.filter(b => b.status === status).length;
                const percentage = (count / bikes.length) * 100;
                return (
                  <div key={status} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="capitalize text-muted-foreground">{status}</span>
                      <span className="font-medium">{count} Bikes</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          status === 'available' ? 'bg-emerald-500' : status === 'rented' ? 'bg-blue-500' : 'bg-amber-500'
                        )}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}