/**
 * Thảo An - Botanical Experience Website (English Version)
 * Client Interaction, Illustrative Schedule, & Accessibility Handler
 */

(function () {
  'use strict';

  // --- Services Data ---
  const SERVICES = {
    short: {
      id: 'short',
      name: 'Short Break',
      duration: 30,
      durationLabel: '30 Mins',
      desc: 'Focused tension release for neck, shoulders, and upper back.'
    },
    long: {
      id: 'long',
      name: 'Deep Relaxation',
      duration: 90,
      durationLabel: '90 Mins',
      desc: 'Full-body therapy combining warm mugwort herbal oil and deep acupressure.'
    },
    herbal: {
      id: 'herbal',
      name: 'Herbal Experience',
      duration: 120,
      durationLabel: '120 Mins',
      desc: 'Fresh ginger foot soak, traditional herbal steam, and hot stone massage.'
    }
  };

  // --- State ---
  let state = {
    selectedService: null,
    selectedDate: 15, // Default to today (15)
    selectedTime: null,
    currentSlots: []
  };

  // --- DOM Elements ---
  const elements = {
    // Nav
    menuToggle: document.getElementById('menu-toggle'),
    menuClose: document.getElementById('menu-close'),
    mobileNav: document.getElementById('mobile-nav'),
    mobileNavLinks: document.querySelectorAll('.mobile-nav-link'),

    // Services
    serviceCards: document.querySelectorAll('.service-card'),
    summaryName: document.getElementById('selected-service-name'),
    summaryMeta: document.getElementById('selected-service-duration'),

    // Calendar & Slots
    calendarGrid: document.getElementById('calendar-days'),
    slotsContainer: document.getElementById('time-slots-container'),
    slotResetAlert: document.getElementById('slot-reset-alert'),
    slotResetReason: document.getElementById('slot-reset-reason'),

    // Actions
    btnConfirm: document.getElementById('btn-confirm-booking'),
    bookingHelpText: document.getElementById('booking-help-text'),

    // Dialog
    dialogBackdrop: document.getElementById('booking-dialog'),
    dialogCloseBtn: document.getElementById('dialog-close-btn'),
    dialogServiceVal: document.getElementById('dialog-service-val'),
    dialogDateVal: document.getElementById('dialog-date-val'),
    dialogTimeVal: document.getElementById('dialog-time-val'),
    btnDialogReset: document.getElementById('btn-dialog-reset'),
    btnDialogDone: document.getElementById('btn-dialog-done'),

    // Request Form
    btnToggleSample: document.getElementById('btn-toggle-sample'),
    sampleNoteBox: document.getElementById('sample-note-box'),
    btnUseSample: document.getElementById('btn-use-sample'),
    specialRequestsInput: document.getElementById('special-requests')
  };

  // --- Slot Generator according to duration ---
  function getSlotsForDuration(duration) {
    if (duration === 30) {
      return [
        { time: '09:00', available: true },
        { time: '09:30', available: true },
        { time: '10:00', available: false }, // Mock full slot
        { time: '10:30', available: true },
        { time: '11:00', available: true },
        { time: '11:30', available: true },
        { time: '14:00', available: true },
        { time: '14:30', available: false }, // Mock full slot
        { time: '15:00', available: true },
        { time: '15:30', available: true },
        { time: '16:00', available: true },
        { time: '16:30', available: true }
      ];
    } else if (duration === 90) {
      return [
        { time: '09:00', available: true },
        { time: '10:45', available: false }, // Mock full slot
        { time: '13:30', available: true },
        { time: '15:15', available: true },
        { time: '17:00', available: true }
      ];
    } else {
      // 120 minutes
      return [
        { time: '09:00', available: true },
        { time: '11:15', available: true },
        { time: '14:00', available: false }, // Mock full slot
        { time: '16:15', available: true }
      ];
    }
  }

  // --- Initialize Calendar Days ---
  function initCalendar() {
    if (!elements.calendarGrid) return;
    elements.calendarGrid.innerHTML = '';

    const todayDate = 15;
    const totalDays = 31;

    for (let day = 1; day <= totalDays; day++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'day-cell';
      btn.textContent = day;
      btn.setAttribute('aria-label', `October ${day}, 2026`);

      if (day < todayDate) {
        btn.classList.add('is-past');
        btn.disabled = true;
        btn.setAttribute('aria-disabled', 'true');
      } else {
        if (day === todayDate) {
          btn.classList.add('is-today');
          btn.setAttribute('title', 'Today');
        }

        if (day === state.selectedDate) {
          btn.classList.add('is-selected');
          btn.setAttribute('aria-pressed', 'true');
        }

        btn.addEventListener('click', function () {
          selectDate(day, btn);
        });
      }

      elements.calendarGrid.appendChild(btn);
    }
  }

  // --- Select Date Handler ---
  function selectDate(day, buttonEl) {
    state.selectedDate = day;

    // Update calendar cell styles
    const allDays = elements.calendarGrid.querySelectorAll('.day-cell');
    allDays.forEach(cell => {
      cell.classList.remove('is-selected');
      cell.removeAttribute('aria-pressed');
    });

    if (buttonEl) {
      buttonEl.classList.add('is-selected');
      buttonEl.setAttribute('aria-pressed', 'true');
    }

    renderSlots();
    checkConfirmationState();
  }

  // --- Select Service Handler ---
  function selectService(serviceId, autoScroll = true) {
    const nextService = SERVICES[serviceId];
    if (!nextService) return;

    const previousService = state.selectedService;
    const durationChanged = previousService && previousService.duration !== nextService.duration;

    state.selectedService = nextService;

    // Update Service Cards visual state
    elements.serviceCards.forEach(card => {
      const id = card.getAttribute('data-service-id');
      const isSelected = id === serviceId;
      card.classList.toggle('is-selected', isSelected);
      card.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      const btnLabel = card.querySelector('.service-select-btn span');
      if (btnLabel) {
        btnLabel.textContent = isSelected ? 'Selected Session ✓' : 'Select Session';
      }
    });

    // Update Summary Header on Schedule Panel
    if (elements.summaryName) {
      elements.summaryName.textContent = nextService.name;
    }
    if (elements.summaryMeta) {
      elements.summaryMeta.textContent = `${nextService.durationLabel} • ${nextService.desc}`;
    }

    // Refresh slots for new duration
    const newSlots = getSlotsForDuration(nextService.duration);
    state.currentSlots = newSlots;

    // Acceptance Test Case 1:
    // Changing services with an invalid previous slot must prompt re-selection
    if (durationChanged && state.selectedTime) {
      const isOldSlotStillValid = newSlots.some(s => s.time === state.selectedTime && s.available);
      if (!isOldSlotStillValid) {
        const oldTime = state.selectedTime;
        state.selectedTime = null; // Clear invalid slot

        if (elements.slotResetAlert) {
          elements.slotResetAlert.classList.remove('hidden');
          if (elements.slotResetReason) {
            elements.slotResetReason.textContent = `You switched to "${nextService.name}" (${nextService.durationLabel}). The previous time slot ${oldTime} is no longer valid or lacks sufficient duration for this service. Please select an available time slot below.`;
          }
        }
      } else {
        if (elements.slotResetAlert) {
          elements.slotResetAlert.classList.add('hidden');
        }
      }
    } else if (!state.selectedTime) {
      if (elements.slotResetAlert) {
        elements.slotResetAlert.classList.add('hidden');
      }
    }

    renderSlots();
    checkConfirmationState();

    if (autoScroll) {
      const scheduleEl = document.getElementById('booking-section');
      if (scheduleEl) {
        scheduleEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  // --- Render Time Slots ---
  function renderSlots() {
    if (!elements.slotsContainer) return;
    elements.slotsContainer.innerHTML = '';

    if (!state.selectedService) {
      elements.slotsContainer.innerHTML = `
        <div class="slots-placeholder">
          <p>Please select a relaxation session above to view corresponding sample time slots.</p>
        </div>
      `;
      return;
    }

    if (!state.currentSlots || state.currentSlots.length === 0) {
      state.currentSlots = getSlotsForDuration(state.selectedService.duration);
    }

    state.currentSlots.forEach(slot => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'slot-btn';
      btn.setAttribute('data-time', slot.time);

      if (slot.available) {
        btn.textContent = slot.time;
        btn.setAttribute('aria-label', `Time slot ${slot.time}`);

        if (state.selectedTime === slot.time) {
          btn.classList.add('is-selected');
          btn.setAttribute('aria-pressed', 'true');
        }

        btn.addEventListener('click', function () {
          selectTimeSlot(slot.time);
        });
      } else {
        btn.textContent = `${slot.time} (Full)`;
        btn.disabled = true;
        btn.setAttribute('aria-disabled', 'true');
        btn.setAttribute('aria-label', `Time slot ${slot.time} is fully booked`);
      }

      elements.slotsContainer.appendChild(btn);
    });
  }

  // --- Select Time Slot Handler ---
  function selectTimeSlot(time) {
    state.selectedTime = time;

    // Hide reset alert once new time is chosen
    if (elements.slotResetAlert) {
      elements.slotResetAlert.classList.add('hidden');
    }

    // Update slot styles
    const allSlotBtns = elements.slotsContainer.querySelectorAll('.slot-btn');
    allSlotBtns.forEach(btn => {
      if (btn.getAttribute('data-time') === time) {
        btn.classList.add('is-selected');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('is-selected');
        btn.removeAttribute('aria-pressed');
      }
    });

    checkConfirmationState();
  }

  // --- Check Confirmation Action State ---
  function checkConfirmationState() {
    if (!elements.btnConfirm) return;

    const isReady = state.selectedService && state.selectedDate && state.selectedTime;

    if (isReady) {
      elements.btnConfirm.disabled = false;
      elements.btnConfirm.classList.remove('btn-secondary');
      elements.btnConfirm.classList.add('btn-primary');
      if (elements.bookingHelpText) {
        elements.bookingHelpText.textContent = `Selected: ${state.selectedService.name} • Oct ${state.selectedDate} • Time ${state.selectedTime}. Click below to confirm sample simulation.`;
        elements.bookingHelpText.style.color = 'var(--color-moss)';
      }
    } else {
      elements.btnConfirm.disabled = true;
      elements.btnConfirm.classList.remove('btn-primary');
      elements.btnConfirm.classList.add('btn-secondary');

      let missing = [];
      if (!state.selectedService) missing.push('select a session');
      if (!state.selectedDate) missing.push('choose a date');
      if (!state.selectedTime) missing.push('pick a time slot');

      if (elements.bookingHelpText) {
        elements.bookingHelpText.textContent = `Please complete: ${missing.join(', ')} to continue.`;
        elements.bookingHelpText.style.color = 'var(--color-fg-muted)';
      }
    }
  }

  // --- Dialog / Confirmation Modal ---
  function openConfirmationDialog() {
    if (!state.selectedService || !state.selectedDate || !state.selectedTime) return;

    if (elements.dialogServiceVal) {
      elements.dialogServiceVal.textContent = `${state.selectedService.name} (${state.selectedService.durationLabel})`;
    }
    if (elements.dialogDateVal) {
      elements.dialogDateVal.textContent = `October ${state.selectedDate}, 2026`;
    }
    if (elements.dialogTimeVal) {
      elements.dialogTimeVal.textContent = state.selectedTime;
    }

    if (elements.dialogBackdrop) {
      elements.dialogBackdrop.classList.add('is-open');
      elements.dialogBackdrop.setAttribute('aria-hidden', 'false');
      if (elements.dialogCloseBtn) {
        elements.dialogCloseBtn.focus();
      }
    }

    document.addEventListener('keydown', handleDialogKeydown);
  }

  function closeConfirmationDialog() {
    if (elements.dialogBackdrop) {
      elements.dialogBackdrop.classList.remove('is-open');
      elements.dialogBackdrop.setAttribute('aria-hidden', 'true');
    }
    document.removeEventListener('keydown', handleDialogKeydown);
    if (elements.btnConfirm) {
      elements.btnConfirm.focus();
    }
  }

  function handleDialogKeydown(e) {
    if (e.key === 'Escape') {
      closeConfirmationDialog();
    }
  }

  // --- Reset Entire Selection ---
  function resetBookingFlow() {
    state.selectedService = null;
    state.selectedTime = null;
    state.selectedDate = 15;

    elements.serviceCards.forEach(card => {
      card.classList.remove('is-selected');
      card.setAttribute('aria-selected', 'false');
      const btnLabel = card.querySelector('.service-select-btn span');
      if (btnLabel) btnLabel.textContent = 'Select Session';
    });

    if (elements.summaryName) elements.summaryName.textContent = 'No session selected';
    if (elements.summaryMeta) elements.summaryMeta.textContent = 'Please select 1 of the 3 relaxation sessions above';

    initCalendar();
    renderSlots();
    checkConfirmationState();
    closeConfirmationDialog();

    const servicesSection = document.getElementById('services-section');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // --- Mobile Drawer Menu ---
  function toggleMobileMenu(open) {
    if (!elements.mobileNav) return;

    if (open) {
      elements.mobileNav.classList.add('is-active');
      elements.mobileNav.setAttribute('aria-hidden', 'false');
      if (elements.menuToggle) elements.menuToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      if (elements.menuClose) elements.menuClose.focus();
    } else {
      elements.mobileNav.classList.remove('is-active');
      elements.mobileNav.setAttribute('aria-hidden', 'true');
      if (elements.menuToggle) elements.menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      if (elements.menuToggle) elements.menuToggle.focus();
    }
  }

  // --- Event Listeners Setup ---
  function initEvents() {
    // Mobile navigation
    if (elements.menuToggle) {
      elements.menuToggle.addEventListener('click', () => toggleMobileMenu(true));
    }
    if (elements.menuClose) {
      elements.menuClose.addEventListener('click', () => toggleMobileMenu(false));
    }
    elements.mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => toggleMobileMenu(false));
    });

    // Close mobile nav on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && elements.mobileNav && elements.mobileNav.classList.contains('is-active')) {
        toggleMobileMenu(false);
      }
    });

    // Service cards click & keyboard
    elements.serviceCards.forEach(card => {
      const serviceId = card.getAttribute('data-service-id');
      card.addEventListener('click', () => selectService(serviceId, true));
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectService(serviceId, true);
        }
      });
    });

    // Confirm booking button
    if (elements.btnConfirm) {
      elements.btnConfirm.addEventListener('click', openConfirmationDialog);
    }

    // Dialog close buttons
    if (elements.dialogCloseBtn) {
      elements.dialogCloseBtn.addEventListener('click', closeConfirmationDialog);
    }
    if (elements.btnDialogDone) {
      elements.btnDialogDone.addEventListener('click', closeConfirmationDialog);
    }
    if (elements.btnDialogReset) {
      elements.btnDialogReset.addEventListener('click', resetBookingFlow);
    }
    if (elements.dialogBackdrop) {
      elements.dialogBackdrop.addEventListener('click', e => {
        if (e.target === elements.dialogBackdrop) {
          closeConfirmationDialog();
        }
      });
    }

    // Sample note toggle & copy
    if (elements.btnToggleSample && elements.sampleNoteBox) {
      elements.btnToggleSample.addEventListener('click', () => {
        const isHidden = elements.sampleNoteBox.classList.contains('hidden');
        if (isHidden) {
          elements.sampleNoteBox.classList.remove('hidden');
          elements.btnToggleSample.textContent = 'Hide sample request';
          elements.btnToggleSample.setAttribute('aria-expanded', 'true');
        } else {
          elements.sampleNoteBox.classList.add('hidden');
          elements.btnToggleSample.textContent = 'View sample request';
          elements.btnToggleSample.setAttribute('aria-expanded', 'false');
        }
      });
    }

    if (elements.btnUseSample && elements.specialRequestsInput) {
      elements.btnUseSample.addEventListener('click', () => {
        const sampleText = 'Hello Thảo An, I have persistent tension in my right shoulder and neck from desk work. Please focus gentle-to-medium acupressure on this area using warm herbal oil. I am sensitive to overpowering fragrances. Thank you.';
        elements.specialRequestsInput.value = sampleText;
        elements.specialRequestsInput.focus();
      });
    }
  }

  // --- Bootstrapping ---
  function init() {
    initCalendar();
    // Default pre-select 'short' service for instant smooth initial state
    selectService('short', false);
    initEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
