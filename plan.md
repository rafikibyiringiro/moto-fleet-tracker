# Motorbike Rental Management App - Implementation Plan

## Scope Summary
A comprehensive management dashboard for a motorbike rental business to track fleet GPS locations, manage rental payments, and monitor insurance status. Since no server-side persistence is available, this will be a high-fidelity frontend prototype using `localStorage` for data persistence.

## Non-Goals
- Real-time GPS hardware integration (simulated data will be used).
- Actual payment gateway integration (Stripe/PayPal) - will use simulated payment flows.
- Real insurance API connectivity.
- Multi-user authentication with a backend.

## Assumptions & Open Questions
- The app is primarily for the business owner/admin.
- GPS data will be mocked to show bikes on a map (using `lucide-react` or a simple map component if libraries allow).
- Data is stored locally in the browser.

## Affected Areas
- **Frontend**: All UI components, state management (React state + localStorage).
- **Navigation**: Dashboard, Fleet Map, Payments, Insurance, Settings.

## Implementation Phases

### Phase 1: Foundation & Navigation (frontend_engineer)
- Set up routing (React Router) or a simple state-based tab system.
- Create the main layout with a sidebar and header.
- Define the data schema for Motorbikes, Payments, and Insurance policies.

### Phase 2: Fleet Management & GPS Tracking (frontend_engineer)
- Create a 'Fleet' view listing all motorbikes.
- Implement a 'GPS Map' view (mocked with a visual grid or a simple map-like interface) showing bike locations.
- Add status indicators (Available, Rented, Maintenance).

### Phase 3: Payment Tracking (frontend_engineer)
- Create a 'Payments' dashboard showing recent transactions.
- Implement a 'Record Payment' form to simulate income tracking.
- Add summary stats (Daily/Monthly revenue).

### Phase 4: Insurance Management (frontend_engineer)
- Create an 'Insurance' view listing policies for each bike.
- Add expiration alerts and status badges (Active, Expiring Soon, Expired).
- Include a form to update insurance details.

### Phase 5: Refinement & Local Storage Persistence (quick_fix_engineer)
- Hook up all forms to `localStorage` so data persists across refreshes.
- Polish the UI with consistent styling and empty states.
- Final bug fixes and responsiveness check.

## Specialist Assignments
1. **frontend_engineer**: Phases 1, 2, 3, 4 (Core logic and UI).
2. **quick_fix_engineer**: Phase 5 (Persistence and final polish).
