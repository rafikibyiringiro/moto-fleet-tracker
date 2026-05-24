import { InsurancePolicy, Motorbike } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Calendar, ExternalLink, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface InsuranceProps {
  policies: InsurancePolicy[];
}

export const InsuranceView = ({ policies }: InsuranceProps) => {
  const getPolicyStatus = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    const diff = expiry.getTime() - now.getTime();
    
    if (diff < 0) return { label: 'Expired', color: 'bg-destructive text-destructive-foreground' };
    if (diff < 30 * 24 * 60 * 60 * 1000) return { label: 'Expiring Soon', color: 'bg-amber-500 text-white' };
    return { label: 'Active', color: 'bg-emerald-500 text-white' };
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-bold tracking-tight">Insurance Management</h2>
          <p className="text-muted-foreground">Monitor policy status and expiration dates for your fleet.</p>
        </div>
        <Button className="gap-2">
          Update Policies
        </Button>
      </div>

      <div className="grid gap-6">
        {policies.map((policy, i) => {
          const status = getPolicyStatus(policy.expiryDate);
          return (
            <motion.div
              key={policy.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{policy.bikeModel}</h3>
                      <p className="text-sm text-muted-foreground">Policy: {policy.policyNumber}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-8 flex-1 max-w-2xl">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Provider</p>
                      <p className="font-medium">{policy.provider}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Expiry Date</p>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        <span className="font-medium">{policy.expiryDate}</span>
                      </div>
                    </div>
                    <div className="flex items-center md:justify-center">
                      <Badge className={status.color}>{status.label}</Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {status.label === 'Expiring Soon' && (
                      <AlertCircle className="h-5 w-5 text-amber-500" />
                    )}
                    <Button variant="outline" size="sm" className="gap-2">
                      <ExternalLink className="h-4 w-4" /> Policy Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};