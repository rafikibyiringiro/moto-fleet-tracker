import { Motorbike } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Navigation, Signal, Battery, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface MapProps {
  bikes: Motorbike[];
}

export const MapView = ({ bikes }: MapProps) => {
  const [selectedBike, setSelectedBike] = useState<Motorbike | null>(null);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-bold tracking-tight">GPS Tracking</h2>
          <p className="text-muted-foreground">Real-time location and diagnostics for your fleet.</p>
        </div>
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search bike plate or model..." className="pl-10" />
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
        <Card className="lg:col-span-3 overflow-hidden relative bg-slate-100 dark:bg-slate-900 border-2 border-dashed">
          {/* Mock Map Background */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Simulated Map Pins */}
            {bikes.map((bike) => (
              <button
                key={bike.id}
                onClick={() => setSelectedBike(bike)}
                className={cn(
                  "absolute transition-all duration-300 hover:scale-110",
                  selectedBike?.id === bike.id ? "z-20" : "z-10"
                )}
                style={{ 
                  left: `${(bike.location.lng + 74.01) * 2000 % 80 + 10}%`, 
                  top: `${(bike.location.lat - 40.71) * 2000 % 80 + 10}%` 
                }}
              >
                <div className={cn(
                  "p-2 rounded-full shadow-lg border-2",
                  bike.status === 'rented' ? "bg-blue-500 border-white" : "bg-emerald-500 border-white",
                  selectedBike?.id === bike.id && "ring-4 ring-primary/20 scale-125"
                )}>
                  <Navigation className={cn("h-4 w-4 text-white", bike.status === 'rented' ? "rotate-45" : "rotate-0")} />
                </div>
                <div className="mt-2 bg-background/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold shadow-sm whitespace-nowrap">
                  {bike.plate}
                </div>
              </button>
            ))}

            <div className="text-center space-y-2 max-w-sm pointer-events-none">
              <MapPin className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
              <p className="text-sm font-medium text-muted-foreground">Select a bike to see live telemetry</p>
            </div>
          </div>
          
          <div className="absolute bottom-6 left-6 flex flex-col gap-2">
            <div className="flex items-center gap-2 bg-background/80 backdrop-blur p-2 rounded-lg border shadow-sm">
              <div className="h-3 w-3 rounded-full bg-emerald-500" />
              <span className="text-xs font-medium">Available</span>
            </div>
            <div className="flex items-center gap-2 bg-background/80 backdrop-blur p-2 rounded-lg border shadow-sm">
              <div className="h-3 w-3 rounded-full bg-blue-500" />
              <span className="text-xs font-medium">Rented</span>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-1 overflow-auto">
          <CardHeader>
            <CardTitle>Bike Telemetry</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedBike ? (
              <div className="space-y-6">
                <div className="aspect-square rounded-xl overflow-hidden border">
                  <img src={selectedBike.image} alt={selectedBike.model} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-lg">{selectedBike.model}</h3>
                  <p className="text-sm text-muted-foreground">{selectedBike.plate}</p>
                </div>
                
                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Signal className="h-4 w-4" /> Signal Strength
                    </div>
                    <span className="text-sm font-medium text-emerald-500">Strong</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Battery className="h-4 w-4" /> Battery Level
                    </div>
                    <span className="text-sm font-medium">84%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Navigation className="h-4 w-4" /> Last Updated
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">2 mins ago</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Current Coordinates</p>
                  <div className="bg-muted p-3 rounded-lg font-mono text-xs">
                    {selectedBike.location.lat.toFixed(4)}, {selectedBike.location.lng.toFixed(4)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-center p-6 border-2 border-dashed rounded-xl">
                <p className="text-sm text-muted-foreground">Select a pin on the map to view data</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};