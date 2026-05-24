export type MotorbikeStatus = 'available' | 'rented' | 'maintenance';

export interface Motorbike {
  id: string;
  model: string;
  plate: string;
  status: MotorbikeStatus;
  location: {
    lat: number;
    lng: number;
  };
  image: string;
  lastService: string;
}

export interface Payment {
  id: string;
  bikeId: string;
  bikeModel: string;
  customerName: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending';
}

export interface InsurancePolicy {
  id: string;
  bikeId: string;
  bikeModel: string;
  provider: string;
  policyNumber: string;
  expiryDate: string;
}

export interface DashboardStats {
  totalRevenue: number;
  activeRentals: number;
  availableBikes: number;
  upcomingInsurances: number;
}