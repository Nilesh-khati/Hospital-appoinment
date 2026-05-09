# TODO - Hospital Appointment System Frontend (MERN)

## Planned changes (approved)

1. Add premium **Home** page at route `/` with CTA buttons linked ONLY to:
   - `/login`, `/register`, `/doctors`, `/book`
2. Redesign frontend UI to premium hospital style using **Tailwind** + **Framer Motion** + **React Icons**.
3. Create/replace reusable components:
   - Navbar (premium responsive)
   - Footer
   - DoctorCard
   - AppointmentCard (or premium appointment table replacement)
   - Button, Input, LoadingSpinner
   - ProtectedRoute (keep existing logic)
4. Ensure strict backend integration:
   - Doctors: `GET /api/users/doctors`
   - Book appointment: `POST /api/appointments/book` with `{ doctorId, date, time }`
   - Appointments dashboard: `GET /api/appointments` and cancel via `PUT /api/appointments/cancel/:id`
5. Update routing in `frontend/src/App.jsx` so `/` renders Home (not redirect).
6. Upgrade styling foundation in `frontend/src/index.css` to Tailwind-first (remove reliance on Bootstrap classes).

## Progress

- [ ] Backend analysis completed
- [ ] Implement Home page
- [ ] Implement premium UI components/pages
- [ ] Update routes
- [ ] Styling foundation/Tailwind integration
- [ ] Run frontend build/dev and verify API calls
