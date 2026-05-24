import { Motorbike } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bike, Settings2, MoreVertical, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface FleetProps {
  bikes: Motorbike[];
  onUpdateStatus: (id: string, status: Motorbike['status']) => void;
}

export const FleetView = ({ bikes, onUpdateStatus }: FleetProps) => {
  const getStatusColor = (status: Motorbike['status']) => {
    switch (status) {
      case 'available': return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
      case 'rented': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'maintenance': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-bold tracking-tight">Fleet Management</h2>
          <p className="text-muted-foreground">Manage and track your entire motorbike inventory.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Add Motorbike
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {bikes.map((bike, i) => (
          <motion.div
            key={bike.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="overflow-hidden group">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={bike.image} 
                  alt={bike.model} 
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
                <Badge className={`absolute top-4 right-4 capitalize ${getStatusColor(bike.status)} backdrop-blur-md`}>
                  {bike.status}
                </Badge>
              </div>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold">{bike.model}</h3>
                    <p className="text-sm text-muted-foreground font-mono">{bike.plate}</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Last Service</p>
                    <p className="font-medium">{bike.lastService}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Total Rentals</p>
                    <p className="font-medium">124</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1 text-xs"
                    onClick={() => onUpdateStatus(bike.id, bike.status === 'available' ? 'rented' : 'available')}
                  >
                    {bike.status === 'available' ? 'Assign Rental' : 'Check In'}
                  </Button>
                  <Button variant="outline" size="icon">
                    <Settings2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};