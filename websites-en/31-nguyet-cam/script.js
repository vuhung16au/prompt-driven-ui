/**
 * Nguyệt Cầm - Art Deco Interactive Cabaret Theater (English Version)
 * Manages showtime switching, symmetrical seat selection, perspective preview,
 * mobile synchronisation, accessible error feedback, and souvenir ticket modal.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // State
  let currentShowtimeId = 'show-1';
  let selectedTableId = null;

  // Showtimes Configuration
  const showtimes = {
    'show-1': {
      id: 'show-1',
      time: '7:30 PM, Saturday',
      title: 'Act I: Twilight Sonata',
      reservedSeats: {
        'A3': 'Table A3 has been reserved for our featured guests.',
        'B4': 'Table B4 is booked for the 7:30 PM showtime.',
        'C1': 'Table C1 is allocated for acoustic sound monitoring.',
        'C5': 'Table C5 is currently reserved.'
      }
    },
    'show-2': {
      id: 'show-2',
      time: '9:15 PM, Saturday',
      title: 'Act II: Midnight Reverie',
      reservedSeats: {
        'A1': 'Table A1 is reserved for the late evening recital.',
        'B2': 'Table B2 is currently booked.',
        'B5': 'Table B5 is currently booked.',
        'C3': 'Table C3 is reserved for acoustic instrument maintenance.'
      }
    }
  };

  // Seating Metadata & Perspectives
  const tableData = {
    'A1': { tier: 'Stage-Front (VIP)', dist: '3.2m', angle: 'Grand Piano Direct', desc: 'Direct frontal stage view with pristine acoustic intimacy and clear line-of-sight to the piano keys.' },
    'A2': { tier: 'Stage-Front (VIP)', dist: '3.8m', angle: 'Pianist Left Wing', desc: 'Direct view of the pianist handcrafting melodies, with an exclusive private lounge atmosphere.' },
    'A3': { tier: 'Stage-Front (VIP)', dist: '3.8m', angle: 'Center Stage Axis', desc: 'Premier vantage point of the parlor with optimal acoustic warmth and golden arch framing.' },
    'A4': { tier: 'Stage-Front (VIP)', dist: '4.0m', angle: 'Stage Right Wing', desc: 'Elegant angle facing the soloists and acoustic ensemble with close proximity.' },
    'B1': { tier: 'Grand Salon (Tier 1)', dist: '5.5m', angle: 'Row 2, Left Wing', desc: 'Balanced sound dispersion and spacious seating in the heart of the theater.' },
    'B2': { tier: 'Grand Salon (Tier 1)', dist: '5.2m', angle: 'Row 2, Mid-Left', desc: 'Ideal distance for acoustic appreciation accompanied by artisanal cocktails.' },
    'B3': { tier: 'Grand Salon (Tier 1)', dist: '5.0m', angle: 'Row 2, Center Axis', desc: 'Perfect central alignment with unobstructed sightlines into the proscenium arch.' },
    'B4': { tier: 'Grand Salon (Tier 1)', dist: '5.0m', angle: 'Row 2, Center Axis', desc: 'Symmetrical centerline position with eye-level elevation matching the performance stage.' },
    'B5': { tier: 'Grand Salon (Tier 1)', dist: '5.2m', angle: 'Row 2, Mid-Right', desc: 'Intimate ambiance offering full panorama over the Roaring Twenties architecture.' },
    'B6': { tier: 'Grand Salon (Tier 1)', dist: '5.8m', angle: 'Row 2, Right Wing', desc: 'Spacious table embracing both the theater hall and musical spotlight.' },
    'C1': { tier: 'Mezzanine Balcony', dist: '7.5m', angle: 'Row 3, Left Wing', desc: 'Quiet vantage point to enjoy multi-layered acoustic reverberation from afar.' },
    'C2': { tier: 'Mezzanine Balcony', dist: '7.0m', angle: 'Row 3, Mid-Left', desc: 'Elevated panorama encompassing the antique lamps and brass finishes.' },
    'C3': { tier: 'Mezzanine Balcony', dist: '6.8m', angle: 'Row 3, Center Axis', desc: 'Rear central axis absorbing the full majestic symmetry of the ballroom.' },
    'C4': { tier: 'Mezzanine Balcony', dist: '6.8m', angle: 'Row 3, Center Axis', desc: 'Discreet and romantic table suited for refined conversation and listening.' },
    'C5': { tier: 'Mezzanine Balcony', dist: '7.0m', angle: 'Row 3, Mid-Right', desc: 'Private alcove offering nostalgia and panoramic clarity.' },
    'C6': { tier: 'Mezzanine Balcony', dist: '7.5m', angle: 'Row 3, Right Wing', desc: 'Warm viewing angle nestled beneath vintage bronze sconces.' }
  };

  // DOM Elements
  const showtimeBtns = document.querySelectorAll('.showtime-btn');
  const seatBtns = document.querySelectorAll('.seat-btn');
  const mobileSeatSelect = document.getElementById('mobile-seat-select');
  const alertContainer = document.getElementById('seat-alert');
  const btnReset = document.getElementById('btn-reset-seating');
  const perspectiveCard = document.getElementById('perspective-card');
  const perspectiveTable = document.getElementById('preview-table');
  const perspectiveTier = document.getElementById('preview-tier');
  const perspectiveDesc = document.getElementById('preview-desc');
  const btnOpenTicket = document.getElementById('btn-view-ticket');

  // Modal Elements
  const modal = document.getElementById('ticket-modal');
  const btnCloseModal = document.getElementById('btn-close-ticket');
  const btnChangeSelection = document.getElementById('btn-change-selection');
  const ticketSeatName = document.getElementById('ticket-seat-name');
  const ticketShowtime = document.getElementById('ticket-showtime');
  const ticketTier = document.getElementById('ticket-tier');
  const ticketPerspective = document.getElementById('ticket-perspective');

  let lastActiveElement = null;

  // Initialize Seating States based on current showtime
  function updateSeatingForShowtime() {
    const config = showtimes[currentShowtimeId];
    const reserved = config.reservedSeats;

    // Check if current selection is invalid in new showtime
    if (selectedTableId && reserved[selectedTableId]) {
      showAlert(`Selection for Table ${selectedTableId} cleared: table is unavailable during ${config.title}.`);
      clearSelection();
    }

    // Update buttons
    seatBtns.forEach(btn => {
      const seatId = btn.getAttribute('data-seat');
      btn.classList.remove('selected');
      if (selectedTableId === seatId) {
        btn.classList.add('selected');
      }

      if (reserved[seatId]) {
        btn.disabled = true;
        btn.setAttribute('aria-label', `Table ${seatId}, reserved. ${reserved[seatId]}`);
      } else {
        btn.disabled = false;
        btn.setAttribute('aria-label', `Table ${seatId}, available. Click to select.`);
      }
    });

    // Populate Mobile Select
    if (mobileSeatSelect) {
      mobileSeatSelect.innerHTML = '<option value="">-- Choose table from list --</option>';
      Object.keys(tableData).forEach(seatId => {
        const option = document.createElement('option');
        option.value = seatId;
        const isReserved = !!reserved[seatId];
        option.disabled = isReserved;
        option.textContent = `Table ${seatId} - ${tableData[seatId].tier} ${isReserved ? '(Reserved)' : '(Available)'}`;
        if (selectedTableId === seatId) {
          option.selected = true;
        }
        mobileSeatSelect.appendChild(option);
      });
    }
  }

  // Show Alert Message
  function showAlert(message) {
    if (!alertContainer) return;
    alertContainer.textContent = message;
    alertContainer.style.opacity = '1';
    clearTimeout(alertContainer._timer);
    alertContainer._timer = setTimeout(() => {
      alertContainer.style.opacity = '0';
    }, 4500);
  }

  // Clear Selection
  function clearSelection() {
    selectedTableId = null;
    seatBtns.forEach(b => b.classList.remove('selected'));
    if (mobileSeatSelect) mobileSeatSelect.value = '';

    if (perspectiveCard) {
      perspectiveTable.textContent = 'No table selected';
      perspectiveTier.textContent = 'Please choose a table on the map or list';
      perspectiveDesc.textContent = 'Simulated perspective view and acoustic details will appear here.';
      btnOpenTicket.style.display = 'none';
    }
  }

  // Select Table Function
  function selectTable(seatId) {
    const config = showtimes[currentShowtimeId];
    if (config.reservedSeats[seatId]) {
      showAlert(config.reservedSeats[seatId]);
      return;
    }

    selectedTableId = seatId;

    // Update Seat buttons
    seatBtns.forEach(btn => {
      if (btn.getAttribute('data-seat') === seatId) {
        btn.classList.add('selected');
      } else {
        btn.classList.remove('selected');
      }
    });

    // Sync mobile dropdown
    if (mobileSeatSelect) {
      mobileSeatSelect.value = seatId;
    }

    // Update perspective card
    const info = tableData[seatId];
    if (info && perspectiveCard) {
      perspectiveTable.textContent = `Table ${seatId} (${info.tier})`;
      perspectiveTier.textContent = `Distance: ${info.dist} — Angle: ${info.angle}`;
      perspectiveDesc.textContent = info.desc;
      btnOpenTicket.style.display = 'inline-flex';
    }

    showAlert(`Table ${seatId} selected. Click "View Illustrative Ticket" to preview souvenir ticket.`);
  }

  // Event Listeners for Showtime Switching
  showtimeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const showId = btn.getAttribute('data-show');
      if (showId === currentShowtimeId) return;

      showtimeBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      currentShowtimeId = showId;
      updateSeatingForShowtime();
      showAlert(`Switched to ${showtimes[showId].title} (${showtimes[showId].time}).`);
    });
  });

  // Event Listeners for Seat Buttons
  seatBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const seatId = btn.getAttribute('data-seat');
      if (btn.disabled) {
        const reason = showtimes[currentShowtimeId].reservedSeats[seatId] || 'This table is currently unavailable.';
        showAlert(reason);
        return;
      }
      selectTable(seatId);
    });
  });

  // Mobile Select Event
  if (mobileSeatSelect) {
    mobileSeatSelect.addEventListener('change', (e) => {
      const seatId = e.target.value;
      if (!seatId) {
        clearSelection();
      } else {
        selectTable(seatId);
      }
    });
  }

  // Reset Button Event
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      clearSelection();
      showAlert('Seating layout has been reset to initial state.');
    });
  }

  // Open Ticket Modal Function
  function openTicketModal() {
    if (!selectedTableId) {
      showAlert('Please choose a table before viewing the ticket.');
      return;
    }

    lastActiveElement = document.activeElement;
    const config = showtimes[currentShowtimeId];
    const info = tableData[selectedTableId];

    ticketSeatName.textContent = `Table ${selectedTableId}`;
    ticketShowtime.textContent = `${config.title} (${config.time})`;
    ticketTier.textContent = info ? info.tier : 'Standard';
    ticketPerspective.textContent = info ? `${info.angle} (${info.dist})` : 'Center stage view';

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    btnCloseModal.focus();
  }

  // Close Ticket Modal Function
  function closeTicketModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (lastActiveElement) {
      lastActiveElement.focus();
    }
  }

  if (btnOpenTicket) {
    btnOpenTicket.addEventListener('click', openTicketModal);
  }

  if (btnCloseModal) {
    btnCloseModal.addEventListener('click', closeTicketModal);
  }

  if (btnChangeSelection) {
    btnChangeSelection.addEventListener('click', () => {
      closeTicketModal();
      const seatingSection = document.getElementById('seating');
      if (seatingSection) {
        seatingSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeTicketModal();
      }
    });
  }

  // Escape key listener for modal accessibility
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeTicketModal();
    }
  });

  // Image Error Fallbacks
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('error', () => {
      img.style.display = 'none';
      const parent = img.parentElement;
      if (parent) {
        const fallback = document.createElement('div');
        fallback.className = 'img-fallback';
        fallback.innerHTML = `
          <div style="font-family: var(--font-heading); font-size: 1.2rem; letter-spacing: 0.15em; margin-bottom: 8px;">NGUYỆT CẦM</div>
          <div style="font-size: 0.85rem; color: var(--color-pewter);">[Art Deco Cabaret Stage Atmosphere]</div>
        `;
        parent.appendChild(fallback);
      }
    });
  });

  // Initial Run
  updateSeatingForShowtime();
});
