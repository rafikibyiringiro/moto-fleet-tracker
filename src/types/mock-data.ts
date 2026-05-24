import { Motorbike, Payment, InsurancePolicy } from './index';

export const INITIAL_BIKES: Motorbike[] = [
  {
    id: '1',
    model: 'Honda CBR 650R',
    plate: 'NY-4562',
    status: 'available',
    location: { lat: 40.7128, lng: -74.006 },
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/57a90158-7e9a-4bbc-85cb-366b38f6f779/sport-bike-cb5d0f16-1779621460244.webp',
    lastService: '2023-10-15',
  },
  {
    id: '2',
    model: 'Harley Davidson Iron 883',
    plate: 'CA-8891',
    status: 'rented',
    location: { lat: 40.7306, lng: -73.9352 },
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/57a90158-7e9a-4bbc-85cb-366b38f6f779/cruiser-bike-b6a1647e-1779621461121.webp',
    lastService: '2023-11-01',
  },
  {
    id: '3',
    model: 'Yamaha E-Scooter',
    plate: 'TX-1122',
    status: 'maintenance',
    location: { lat: 40.7589, lng: -73.9851 },
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/57a90158-7e9a-4bbc-85cb-366b38f6f779/electric-scooter-c15484e3-1779621460778.webp',
    lastService: '2024-01-10',
  },
  {
    id: '4',
    model: 'BMW R 1250 GS',
    plate: 'FL-9900',
    status: 'available',
    location: { lat: 40.7829, lng: -73.9654 },
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/57a90158-7e9a-4bbc-85cb-366b38f6f779/adventure-bike-9830e24e-1779621460414.webp',
    lastService: '2023-12-20',
  },
];

export const INITIAL_PAYMENTS: Payment[] = [
  { id: 'p1', bikeId: '2', bikeModel: 'Harley Davidson Iron 883', customerName: 'John Doe', amount: 150.00, date: '2024-03-20', status: 'completed' },
  { id: 'p2', bikeId: '4', bikeModel: 'BMW R 1250 GS', customerName: 'Jane Smith', amount: 200.00, date: '2024-03-21', status: 'completed' },
  { id: 'p3', bikeId: '1', bikeModel: 'Honda CBR 650R', customerName: 'Mike Johnson', amount: 75.00, date: '2024-03-22', status: 'pending' },
];

export const INITIAL_INSURANCE: InsurancePolicy[] = [
  { id: 'i1', bikeId: '1', bikeModel: 'Honda CBR 650R', provider: 'SafeRide Co.', policyNumber: 'SR-100293', expiryDate: '2024-08-15' },
  { id: 'i2', bikeId: '2', bikeModel: 'Harley Davidson Iron 883', provider: 'MotoGuard', policyNumber: 'MG-881273', expiryDate: '2024-04-01' },
  { id: 'i3', bikeId: '3', bikeModel: 'Yamaha E-Scooter', provider: 'CityProtect', policyNumber: 'CP-22100', expiryDate: '2024-12-31' },
  { id: 'i4', bikeId: '4', bikeModel: 'BMW R 1250 GS', provider: 'SafeRide Co.', policyNumber: 'SR-100294', expiryDate: '2025-01-20' },
];