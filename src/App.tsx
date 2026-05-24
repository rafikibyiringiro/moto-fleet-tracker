import { useState } from 'react';
import { useStore } from './hooks/use-store';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/views/DashboardView';
import { FleetView } from './components/views/FleetView';
import { MapView } from './components/views/MapView';
import { PaymentsView } from './components/views/PaymentsView';
import { InsuranceView } from './components/views/InsuranceView';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { bikes, payments, insurance, stats, addPayment, updateBikeStatus } = useStore();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView stats={stats} recentPayments={payments} bikes={bikes} />;
      case 'fleet':
        return <FleetView bikes={bikes} onUpdateStatus={updateBikeStatus} />;
      case 'map':
        return <MapView bikes={bikes} />;
      case 'payments':
        return <PaymentsView payments={payments} onAddPayment={addPayment} bikes={bikes} />;
      case 'insurance':
        return <InsuranceView policies={insurance} />;
      default:
        return <DashboardView stats={stats} recentPayments={payments} bikes={bikes} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>

      <Toaster position="top-right" />
    </div>
  );
}

export default App;