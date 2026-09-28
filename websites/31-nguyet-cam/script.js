/**
 * Nguyệt Cầm - Art Deco Interactive Cabaret Theater
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
      time: '19:30, Thứ Bảy',
      title: 'Suất I: Khúc Hoàng Hôn',
      reservedSeats: {
        'A3': 'Bàn A3 đã được đặt trước bởi khách mời đặc biệt.',
        'B4': 'Bàn B4 đã được giữ chỗ cho suất 19:30.',
        'C1': 'Bàn C1 thuộc khu vực kỹ thuật cân chỉnh âm thanh phòng trà.',
        'C5': 'Bàn C5 đã được đặt trước.'
      }
    },
    'show-2': {
      id: 'show-2',
      time: '21:15, Thứ Bảy',
      title: 'Suất II: Dạ Khúc Huyền Diệu',
      reservedSeats: {
        'A1': 'Bàn A1 đã được khách đặt chỗ sớm cho suất đêm.',
        'B2': 'Bàn B2 đã được đặt trước.',
        'B5': 'Bàn B5 đã được đặt trước.',
        'C3': 'Bàn C3 đang dành cho khu vực bảo dưỡng nhạc cụ dây.'
      }
    }
  };

  // Seating Metadata & Perspectives
  const tableData = {
    'A1': { tier: 'Bàn Cận Sân Khấu (VIP)', dist: '3.2m', angle: 'Chính diện phím dương cầm', desc: 'Góc nhìn chính diện sân khấu cận cảnh, đón trọn từng rung cảm âm thanh mộc.' },
    'A2': { tier: 'Bàn Cận Sân Khấu (VIP)', dist: '3.8m', angle: 'Cánh trái nghệ sĩ', desc: 'Tầm nhìn trực tiếp vào các ngón đàn nghệ sĩ dương cầm, không gian riêng tư sang trọng.' },
    'A3': { tier: 'Bàn Cận Sân Khấu (VIP)', dist: '3.8m', angle: 'Chính diện trung tâm', desc: 'Vị trí đắc địa nhất phòng trà với độ tán âm và tầm nhìn hoàn mỹ.' },
    'A4': { tier: 'Bàn Cận Sân Khấu (VIP)', dist: '4.0m', angle: 'Cánh phải sân khấu', desc: 'Góc nhìn nghiêng tao nhã hướng về nghệ sĩ độc tấu và ban nhạc acoustic.' },
    'B1': { tier: 'Bàn Trung Tâm (Thượng Hạng)', dist: '5.5m', angle: 'Hàng hai, cánh trái', desc: 'Vị trí có độ vang âm ấm áp và cân bằng, không gian thoáng đãng.' },
    'B2': { tier: 'Bàn Trung Tâm (Thượng Hạng)', dist: '5.2m', angle: 'Hàng hai, lệch trái', desc: 'Khoảng cách lý tưởng để thưởng thức giọng ca mộc cùng ly rượu vang.' },
    'B3': { tier: 'Bàn Trung Tâm (Thượng Hạng)', dist: '5.0m', angle: 'Hàng hai, chính diện', desc: 'Trục đối xứng hoàn hảo nhìn thẳng vào tâm điểm sân khấu vòm.' },
    'B4': { tier: 'Bàn Trung Tâm (Thượng Hạng)', dist: '5.0m', angle: 'Hàng hai, chính diện', desc: 'Trục đối xứng trung tâm, tầm mắt vừa vặn với độ cao bục diễn.' },
    'B5': { tier: 'Bàn Trung Tâm (Thượng Hạng)', dist: '5.2m', angle: 'Hàng hai, lệch phải', desc: 'Góc thưởng thức ấm cúng, bao quát không gian kiến trúc hoàng kim.' },
    'B6': { tier: 'Bàn Trung Tâm (Thượng Hạng)', dist: '5.8m', angle: 'Hàng hai, cánh phải', desc: 'Góc nhìn thoáng đãng, thưởng thức trọn vẹn cả sân khấu lẫn khán phòng.' },
    'C1': { tier: 'Bàn Ban Công Âm Hưởng', dist: '7.5m', angle: 'Hàng ba, cánh trái', desc: 'Khu vực yên tĩnh, thưởng thức hòa âm đa tầng từ xa.' },
    'C2': { tier: 'Bàn Ban Công Âm Hưởng', dist: '7.0m', angle: 'Hàng ba, trung tâm trái', desc: 'Tầm nhìn bao quát toàn bộ nhà hát cổ và ánh đèn vòm.' },
    'C3': { tier: 'Bàn Ban Công Âm Hưởng', dist: '6.8m', angle: 'Hàng ba, chính diện', desc: 'Trục đối xứng cuối phòng, cảm nhận trọn vẹn vẻ tráng lệ của khán phòng.' },
    'C4': { tier: 'Bàn Ban Công Âm Hưởng', dist: '6.8m', angle: 'Hàng ba, chính diện', desc: 'Trục đối xứng cuối phòng, vị trí kín đáo dành cho buổi đàm đạo tinh tế.' },
    'C5': { tier: 'Bàn Ban Công Âm Hưởng', dist: '7.0m', angle: 'Hàng ba, trung tâm phải', desc: 'Không gian riêng tư, thưởng thức âm nhạc trong không khí hoài niệm.' },
    'C6': { tier: 'Bàn Ban Công Âm Hưởng', dist: '7.5m', angle: 'Hàng ba, cánh phải', desc: 'Góc nhìn thanh lịch hướng về sân khấu dưới ánh đèn vàng nhung.' }
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
      showAlert(`Lựa chọn bàn ${selectedTableId} đã được hủy vì bàn không khả dụng trong ${config.title}.`);
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
        btn.setAttribute('aria-label', `Bàn ${seatId}, đã được giữ chỗ. ${reserved[seatId]}`);
      } else {
        btn.disabled = false;
        btn.setAttribute('aria-label', `Bàn ${seatId}, đang trống. Nhấn để chọn.`);
      }
    });

    // Populate Mobile Select
    if (mobileSeatSelect) {
      mobileSeatSelect.innerHTML = '<option value="">-- Chọn bàn từ danh sách --</option>';
      Object.keys(tableData).forEach(seatId => {
        const option = document.createElement('option');
        option.value = seatId;
        const isReserved = !!reserved[seatId];
        option.disabled = isReserved;
        option.textContent = `Bàn ${seatId} - ${tableData[seatId].tier} ${isReserved ? '(Đã giữ chỗ)' : '(Còn trống)'}`;
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
      perspectiveTable.textContent = 'Chưa chọn bàn';
      perspectiveTier.textContent = 'Vui lòng chọn bàn trên sơ đồ hoặc danh sách';
      perspectiveDesc.textContent = 'Góc nhìn mô phỏng và thông tin chỗ ngồi sẽ hiển thị chi tiết tại đây.';
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
      perspectiveTable.textContent = `Bàn ${seatId} (${info.tier})`;
      perspectiveTier.textContent = `Cự ly: ${info.dist} — Hướng: ${info.angle}`;
      perspectiveDesc.textContent = info.desc;
      btnOpenTicket.style.display = 'inline-flex';
    }

    showAlert(`Đã chọn bàn ${seatId}. Nhấn "Xem vé minh họa" để xem thẻ lưu niệm.`);
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
      showAlert(`Đã chuyển sang ${showtimes[showId].title} (${showtimes[showId].time}).`);
    });
  });

  // Event Listeners for Seat Buttons
  seatBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const seatId = btn.getAttribute('data-seat');
      if (btn.disabled) {
        const reason = showtimes[currentShowtimeId].reservedSeats[seatId] || 'Bàn này hiện không khả dụng.';
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
      showAlert('Sơ đồ chỗ ngồi đã được đặt lại trạng thái ban đầu.');
    });
  }

  // Open Ticket Modal Function
  function openTicketModal() {
    if (!selectedTableId) {
      showAlert('Vui lòng chọn một bàn trước khi xem vé.');
      return;
    }

    lastActiveElement = document.activeElement;
    const config = showtimes[currentShowtimeId];
    const info = tableData[selectedTableId];

    ticketSeatName.textContent = `Bàn ${selectedTableId}`;
    ticketShowtime.textContent = `${config.title} (${config.time})`;
    ticketTier.textContent = info ? info.tier : 'Tiêu Chuẩn';
    ticketPerspective.textContent = info ? `${info.angle} (Cự ly ${info.dist})` : 'Chính diện sân khấu';

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
          <div style="font-size: 0.85rem; color: var(--color-pewter);">[Không gian sân khấu nghệ thuật Art Deco]</div>
        `;
        parent.appendChild(fallback);
      }
    });
  });

  // Initial Run
  updateSeatingForShowtime();
});
