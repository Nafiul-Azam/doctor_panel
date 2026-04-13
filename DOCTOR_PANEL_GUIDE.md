# Doctor Panel Implementation Guideline

## 1) Project Architecture

The UI is split into layout, page, and feature components so each part can be edited independently.

```txt
src/
	components/
		common/
			BackButton.jsx
			EmptyState.jsx
			GlassCard.jsx
			IconButton.jsx
			SearchInput.jsx
			SectionTitle.jsx
			StatusPill.jsx
		dashboard/
			DashboardSectionHeader.jsx
			ForwardedCasesCard.jsx
			NextPatientCard.jsx
			QuickActionCard.jsx
			StatCard.jsx
		patients/
			PatientFilterBar.jsx
			PatientQueueCard.jsx
			PatientStatusBadge.jsx
			PatientSummaryPanel.jsx
		prescription/
			ConsultationNotesForm.jsx
			MedicineEntryTable.jsx
			PrescriptionActions.jsx
			PrescriptionHeader.jsx
		messages/
			ChatWindow.jsx
			ConversationItem.jsx
			ConversationList.jsx
			MessageBubble.jsx
			MessageComposer.jsx
		profile/
			ChamberScheduleCard.jsx
			DoctorProfileCard.jsx
			EditProfileForm.jsx
			ProfileInfoSection.jsx
	data/
		mockData.js
	layouts/
		DoctorLayout.jsx
		DoctorSidebar.jsx
		MobileBottomNav.jsx
		PanelHeader.jsx
	pages/
		DoctorDashboardPage.jsx
		DoctorPatientsPage.jsx
		DoctorPatientDetailsPage.jsx
		DoctorMessagesPage.jsx
		DoctorProfilePage.jsx
	App.jsx
	main.jsx
	index.css
```

## 2) Route Structure

Routes are defined in `App.jsx` and organized under the doctor layout shell.

- `/doctor/dashboard` -> doctor home and KPIs
- `/doctor/patients` -> queue with filters and search
- `/doctor/patients/:id` -> clinical/prescription detail view
- `/doctor/messages` -> conversation list + active chat
- `/doctor/profile` -> doctor profile overview + edit section

Fallback routes redirect to `/doctor/dashboard`.

## 3) Layout Behavior

- Desktop: left sticky premium glass sidebar + top contextual header
- Mobile: sidebar hidden; floating glass bottom nav with 4 core tabs
- Header: breadcrumb-like context and quick alert count
- Details page: includes back-to-patient-list action

## 4) Page Purpose Breakdown

### Dashboard

- Welcome card with doctor identity
- Today stats cards (total, waiting, completed, urgent)
- Next patient quick preview
- Assistant-forwarded summary section
- Notifications and performance highlights
- Quick action tiles

### Patients

- Queue summary panel
- Search input
- Filter chips: All, Next, Waiting, Skipped, In Progress, Completed, Urgent, Forwarded
- Patient queue cards with status, serial, complaint, and forwarded badge

### Patient Details / Prescription

- Prescription-style header block with patient metadata
- Assistant note section
- Consultation note form
- Editable medicine table
- Action row: Save Draft, Print, Upload Document, Generate Prescription, Mark Complete

### Messages

- Desktop two-column chat workspace
- Mobile list-to-chat pattern with back action
- Conversation items include unread count and metadata
- Chat bubbles + attachment/video/send controls

### Profile

- Doctor profile card (image, ID, specialization, availability)
- Information sections (professional/contact)
- Chamber schedule card
- Edit form for session/chamber/mode updates

## 5) Component Responsibilities

- `common/*`: reusable design-system blocks and controls
- `dashboard/*`: dashboard-only insight cards
- `patients/*`: queue list and filter rendering
- `prescription/*`: consultation and medicine workflow components
- `messages/*`: chat list and chat-window module
- `profile/*`: profile display and edit modules

This keeps pages clean and enables easy feature extension.

## 6) Theme Guide

Theme variables are in `src/index.css` under `:root`.

- Primary Teal: `#0F6D73`
- Dark Teal Text: `#0A5C63`
- Soft Mint Background: `#DDF3F1`
- Aqua Glass Tint: `#CFEFED`
- Light Surface: `#F7FBFB`
- Accent Cyan: `#19B7C6`
- Soft Border: `rgba(15, 109, 115, 0.12)`

Style system highlights:

- glass cards with blur + subtle border + large radius
- smooth hover lift and fade entry animation
- teal-cyan gradient for active controls
- soft radial + gradient backdrop for premium medical SaaS feel

## 7) Responsive Behavior Guide

- Breakpoint used: `950px`
- Under breakpoint:
  - left sidebar hidden
  - bottom nav shown (4 tabs)
  - messages page switches to list/chat toggle flow
  - grids reduce to single-column-friendly stacks

## 8) Future Edit Guide

### Add new page

1. Create new page inside `src/pages`.
2. Add route in `App.jsx` under `/doctor` layout route.
3. Add menu item to `navItems` in `src/data/mockData.js` if it should appear in nav.

### Replace mock data with API

1. Keep component props unchanged.
2. Move data fetch to page-level (`useEffect` + state or React Query).
3. Convert `src/data/mockData.js` from static to API mappers.

### Extend patient status/filter

1. Add new status entry in `patientFilters`.
2. Add status tone map in `statusColors`.
3. Ensure filter logic in `DoctorPatientsPage.jsx` includes the new status rule.

### Add PDF/export support later

1. Keep consultation state in `DoctorPatientDetailsPage.jsx` as the source of truth.
2. Add a service function to convert form+medicine state to PDF payload.
3. Wire that function to `Generate Prescription` action.

## 9) Consistency Rules for Future Developers

- Keep files small and focused; avoid giant page files.
- Put repeated visual blocks in reusable components first.
- Keep page components orchestration-only whenever possible.
- Reuse theme variables from `index.css` instead of hardcoding colors.
- Follow existing naming style: `DoctorXxxPage`, `XxxCard`, `XxxSection`, `XxxForm`.
