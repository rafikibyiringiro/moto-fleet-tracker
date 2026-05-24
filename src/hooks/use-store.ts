import { useState, useEffect } from 'react';
import { Motorbike, Payment, InsurancePolicy } from '../types';
import { INITIAL_BIKES, INITIAL_PAYMENTS, INITIAL_INSURANCE } from '../types/mock-data';

export const useStore = () => {
  const [bikes, setBikes] = useState<Motorbike[]>(() => {
    const saved = localStorage.getItem('moto_bikes');
    return saved ? JSON.parse(saved) : INITIAL_BIKES;
  });

  const [payments, setPayments] = useState<Payment[]>(() => {
    const saved = localStorage.getItem('moto_payments');
    return saved ? JSON.parse(saved) : INITIAL_PAYMENTS;
  });

  const [insurance, setInsurance] = useState<InsurancePolicy[]>(() => {
    const saved = localStorage.getItem('moto_insurance');
    return saved ? JSON.parse(saved) : INITIAL_INSURANCE;
  });

  useEffect(() => {
    localStorage.setItem('moto_bikes', JSON.stringify(bikes));
  }, [bikes]);

  useEffect(() => {
    localStorage.setItem('moto_payments', JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem('moto_insurance', JSON.stringify(insurance));
  }, [insurance]);

  const addBike = (bike: Motorbike) => setBikes(prev => [...prev, bike]);
  const updateBikeStatus = (id: string, status: Motorbike['status']) => {
    setBikes(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const addPayment = (payment: Payment) => setPayments(prev => [payment, ...prev]);
  
  const updateInsurance = (id: string, policy: Partial<InsurancePolicy>) => {
    setInsurance(prev => prev.map(i => i.id === id ? { ...i, ...policy } : i));
  };

  const stats = {
    totalRevenue: payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0),
    activeRentals: bikes.filter(b => b.status === 'rented').length,
    availableBikes: bikes.filter(b => b.status === 'available').length,
    upcomingInsurances: insurance.filter(i => {
      const expiry = new Date(i.expiryDate);
      const now = new Date();
      const diff = expiry.getTime() - now.getTime();
      return diff > 0 && diff < 30 * 24 * 60 * 60 * 1000; // Next 30 days
    }).length,
  };

  return {
    bikes,
    payments,
    insurance,
    stats,
    addBike,
    updateBikeStatus,
    addPayment,
    updateInsurance
  };
};