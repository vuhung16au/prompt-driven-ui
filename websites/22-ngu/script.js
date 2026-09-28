/**
 * NGŨ ARCHITECTURE STUDIO — SWISS MINIMALIST INTERACTIVE CONTROLS
 * Complies with strict architectural guidelines and accessibility standards.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. IMAGE ERROR HANDLING & STABLE FALLBACKS
     ========================================================================== */
  const allImages = document.querySelectorAll('img');
  allImages.forEach((img) => {
    img.addEventListener('error', () => {
      img.classList.add('img-error');
    });
  });

  /* ==========================================================================
     2. PROJECT DIRECTORY DATA & FILTERING
     ========================================================================== */
  const projectsData = {
    'N-01': {
      code: 'N-01',
      name: 'Nhà phố Hàng Bông',
      location: 'Hoàn Kiếm, Hà Nội (Khu phố cổ)',
      type: 'Nhà ở',
      category: 'residential',
      scope: 'Cải tạo lõi thông tầng & mở giếng trời đón nắng đông nam',
      initial: 'Khung bê tông cốt thép xây năm 1994, kẹp giữa hai nhà cao 5 tầng, tối và ẩm mốc.',
      materials: 'Thép tấm 8mm cắt CNC, bê tông mài Granito, gỗ tần bì lau dầu tự nhiên.',
      desc: 'Nhà phố diện tích 3.4m × 14m với ba mặt bị bọc kín hoàn toàn. Giải pháp là cắt sàn 2 tầng tại vùng lõi trung tâm tạo khoảng thông tầng 8m², đưa giếng trời đón trọn ánh sáng buổi sáng. Cầu thang bê tông cũ được dỡ bỏ và thay thế bằng thang thép dạt biên, kết nối không gian mở liên hoàn từ phòng khách ra bếp.',
      img: './thumb_n01_1790520210407.jpg'
    },
    'W-01': {
      code: 'W-01',
      name: 'Xưởng sáng tạo Yên Phụ',
      location: 'Tây Hồ, Hà Nội (Khu vực sát đê sông Hồng)',
      type: 'Không gian làm việc',
      category: 'workspace',
      scope: 'Chuyển đổi nhà ống 3 tầng cũ thành văn phòng kiến trúc mở',
      initial: 'Nhà ống phân lô 3.1m × 16m chia nhiều phòng nhỏ, hành lang chật hẹp thiếu đối lưu.',
      materials: 'Kính cường lực khung thép định hình đen mờ, tường gạch thô quét vôi trắng, sàn epoxy.',
      desc: 'Dự án cải tạo toàn diện cấu trúc công năng từ nhà ở thành studio sáng tạo. Toàn bộ vách ngăn đặc bị loại bỏ để tạo một trục thị giác xuyên suốt 16m. Bàn làm việc chung dài 6m đặt dưới giếng trời khuếch tán ánh sáng đều, tối ưu hóa đối lưu gió mùa đông bắc và gió nam mùa hè.',
      img: './thumb_w01_1790520224360.jpg'
    },
    'N-02': {
      code: 'N-02',
      name: 'Nhà hẹp Kim Mã',
      location: 'Ba Đình, Hà Nội (Ngõ sâu 1.8m)',
      type: 'Nhà ở',
      category: 'residential',
      scope: 'Tái cấu trúc thang lệch tầng & mặt tiền lam đón gió vi khí hậu',
      initial: 'Khu đất hẹp 3.0m × 11.0m, cầu thang bê tông chiếm hơn 30% diện tích sàn.',
      materials: 'Thép dây treo chịu lực, lam nhôm sơn tĩnh điện thông gió, gỗ sồi tái chế.',
      desc: 'Ngôi nhà nằm sâu trong ngõ nhỏ Kim Mã với ánh sáng mặt tiền hạn chế. Nhóm thiết kế thay thế thang bê tông trung tâm bằng hệ thang thép dây treo lệch tầng dạt sát tường phía tây. Mặt tiền được lắp lam chắn nắng đón gió có thể điều chỉnh góc mở, giúp gia tăng 35% diện tích sử dụng thực tế.',
      img: './thumb_n02_1790520262345.jpg'
    }
  };

  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectRows = document.querySelectorAll('.project-row');
  const emptyState = document.getElementById('filter-empty-state');
  const resetFilterBtn = document.getElementById('btn-reset-filter');

  function applyFilter(category) {
    let visibleCount = 0;

    projectRows.forEach((row) => {
      const rowCategory = row.getAttribute('data-category');
      if (category === 'all' || rowCategory === category) {
        row.style.display = 'grid';
        visibleCount++;
      } else {
        row.style.display = 'none';
      }
    });

    filterButtons.forEach((btn) => {
      const btnFilter = btn.getAttribute('data-filter');
      const isActive = btnFilter === category;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    if (emptyState) {
      emptyState.hidden = visibleCount > 0;
    }
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter');
      applyFilter(category);
    });
  });

  if (resetFilterBtn) {
    resetFilterBtn.addEventListener('click', () => {
      applyFilter('all');
    });
  }

  /* ==========================================================================
     3. PROJECT DETAIL MODAL DIALOG
     ========================================================================== */
  const modal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalCode = document.getElementById('modal-project-code');
  const modalType = document.getElementById('modal-project-type');
  const modalTitle = document.getElementById('modal-project-title');
  const modalLocation = document.getElementById('modal-project-location');
  const modalInitial = document.getElementById('modal-project-initial');
  const modalScope = document.getElementById('modal-project-scope');
  const modalMaterials = document.getElementById('modal-project-materials');
  const modalDesc = document.getElementById('modal-project-desc');
  const modalImg = document.getElementById('modal-project-img');
  const modalDiscussBtn = document.getElementById('modal-discuss-btn');

  let lastActiveElement = null;

  function openProjectModal(projectId) {
    const data = projectsData[projectId];
    if (!data || !modal) return;

    lastActiveElement = document.activeElement;

    modalCode.textContent = data.code;
    modalType.textContent = data.type.toUpperCase();
    modalTitle.textContent = data.name;
    modalLocation.textContent = data.location;
    modalInitial.textContent = data.initial;
    modalScope.textContent = data.scope;
    modalMaterials.textContent = data.materials;
    modalDesc.textContent = data.desc;
    modalImg.src = data.img;
    modalImg.alt = `Chi tiết dự án ${data.name}`;

    if (typeof modal.showModal === 'function') {
      modal.showModal();
    } else {
      modal.setAttribute('open', '');
    }

    modalCloseBtn.focus();
  }

  function closeProjectModal() {
    if (!modal) return;
    if (typeof modal.close === 'function') {
      modal.close();
    } else {
      modal.removeAttribute('open');
    }
    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
  }

  projectRows.forEach((row) => {
    row.addEventListener('click', () => {
      const id = row.getAttribute('data-id');
      openProjectModal(id);
    });

    row.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const id = row.getAttribute('data-id');
        openProjectModal(id);
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      // Backdrop click detection
      const rect = modal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        closeProjectModal();
      }
    });

    modal.addEventListener('cancel', (e) => {
      e.preventDefault();
      closeProjectModal();
    });
  }

  if (modalDiscussBtn) {
    modalDiscussBtn.addEventListener('click', () => {
      closeProjectModal();
    });
  }

  /* ==========================================================================
     4. BEFORE & AFTER CONTROLS (BUTTONS & RANGE SLIDER)
     Requirement: Buttons outside image, labels always visible, split view option.
     ========================================================================== */
  const btnShowBefore = document.getElementById('btn-show-before');
  const btnShowAfter = document.getElementById('btn-show-after');
  const btnShowSplit = document.getElementById('btn-show-split');
  const viewContainer = document.getElementById('comp-view-container');
  const frameBefore = document.getElementById('frame-before');
  const frameAfter = document.getElementById('frame-after');
  const statusValue = document.getElementById('status-value');
  const compareRange = document.getElementById('compare-range');
  const sliderPercentage = document.getElementById('slider-percentage');

  const compButtons = [btnShowBefore, btnShowAfter, btnShowSplit];

  function setActiveCompButton(activeBtn) {
    compButtons.forEach((btn) => {
      if (btn) {
        const isActive = btn === activeBtn;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      }
    });
  }

  function showBeforeView() {
    if (!viewContainer) return;
    viewContainer.className = 'comp-view-container mode-single';
    if (frameBefore) frameBefore.classList.add('active');
    if (frameAfter) frameAfter.classList.remove('active');
    if (statusValue) {
      statusValue.textContent = 'HIỆN TRẠNG TRƯỚC CẢI TẠO — VÁCH NGĂN KÍN, THIẾU ÁNH SÁNG';
    }
    if (compareRange) compareRange.value = 0;
    if (sliderPercentage) sliderPercentage.textContent = '0%';
    setActiveCompButton(btnShowBefore);
  }

  function showAfterView() {
    if (!viewContainer) return;
    viewContainer.className = 'comp-view-container mode-single';
    if (frameBefore) frameBefore.classList.remove('active');
    if (frameAfter) frameAfter.classList.add('active');
    if (statusValue) {
      statusValue.textContent = 'KHÔNG GIAN SAU HOÀN THIỆN — THÔNG TẦNG MỞ, ÁNH SÁNG TỰ NHIÊN ĐỈNH MÁI';
    }
    if (compareRange) compareRange.value = 100;
    if (sliderPercentage) sliderPercentage.textContent = '100%';
    setActiveCompButton(btnShowAfter);
  }

  function showSplitView() {
    if (!viewContainer) return;
    viewContainer.className = 'comp-view-container mode-split';
    if (frameBefore) frameBefore.classList.add('active');
    if (frameAfter) frameAfter.classList.add('active');
    if (statusValue) {
      statusValue.textContent = 'SO SÁNH SONG SONG — TRƯỚC (TRÁI) VÀ SAU CẢI TẠO (PHẢI)';
    }
    if (compareRange) compareRange.value = 50;
    if (sliderPercentage) sliderPercentage.textContent = '50%';
    setActiveCompButton(btnShowSplit);
  }

  if (btnShowBefore) btnShowBefore.addEventListener('click', showBeforeView);
  if (btnShowAfter) btnShowAfter.addEventListener('click', showAfterView);
  if (btnShowSplit) btnShowSplit.addEventListener('click', showSplitView);

  // Range Slider alternative interaction
  if (compareRange) {
    compareRange.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      if (sliderPercentage) sliderPercentage.textContent = `${val}%`;

      if (val === 0) {
        showBeforeView();
      } else if (val === 100) {
        showAfterView();
      } else if (val >= 40 && val <= 60) {
        showSplitView();
      } else if (val < 50) {
        if (!viewContainer.classList.contains('mode-single')) {
          viewContainer.className = 'comp-view-container mode-single';
        }
        frameBefore.classList.add('active');
        frameAfter.classList.remove('active');
        statusValue.textContent = `CHẾ ĐỘ CHUYỂN TIẾP — THIÊN VỀ TRƯỚC CẢI TẠO (${val}%)`;
        setActiveCompButton(btnShowBefore);
      } else {
        if (!viewContainer.classList.contains('mode-single')) {
          viewContainer.className = 'comp-view-container mode-single';
        }
        frameBefore.classList.remove('active');
        frameAfter.classList.add('active');
        statusValue.textContent = `CHẾ ĐỘ CHUYỂN TIẾP — THIÊN VỀ SAU HOÀN THIỆN (${val}%)`;
        setActiveCompButton(btnShowAfter);
      }
    });
  }

  /* ==========================================================================
     5. PROJECT DISCUSSION INQUIRY FORM
     Requirement: Validate fields, prevent fake success, explicit demo notice.
     ========================================================================== */
  const inquiryForm = document.getElementById('inquiry-form');
  const inputLocation = document.getElementById('input-location');
  const inputDimensions = document.getElementById('input-dimensions');
  const inputNeeds = document.getElementById('input-needs');
  const inputContact = document.getElementById('input-contact');
  const formFeedback = document.getElementById('form-feedback');

  const errLocation = document.getElementById('err-location');
  const errDimensions = document.getElementById('err-dimensions');
  const errNeeds = document.getElementById('err-needs');
  const errContact = document.getElementById('err-contact');

  function clearErrors() {
    if (errLocation) errLocation.textContent = '';
    if (errDimensions) errDimensions.textContent = '';
    if (errNeeds) errNeeds.textContent = '';
    if (errContact) errContact.textContent = '';
    if (formFeedback) {
      formFeedback.hidden = true;
      formFeedback.className = 'form-feedback';
      formFeedback.textContent = '';
    }
  }

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();

      let hasError = false;

      // Validate Location
      if (!inputLocation.value.trim()) {
        if (errLocation) errLocation.textContent = 'Vui lòng cung cấp vị trí hoặc quận/huyện của công trình.';
        hasError = true;
      }

      // Validate Dimensions
      if (!inputDimensions.value.trim()) {
        if (errDimensions) errDimensions.textContent = 'Vui lòng nêu kích thước sơ bộ khu đất hoặc số tầng hiện trạng.';
        hasError = true;
      }

      // Validate Needs
      if (!inputNeeds.value) {
        if (errNeeds) errNeeds.textContent = 'Vui lòng chọn nhu cầu cải tạo cốt lõi.';
        hasError = true;
      }

      // Validate Contact
      const contactVal = inputContact.value.trim();
      if (!contactVal) {
        if (errContact) errContact.textContent = 'Vui lòng điền email hoặc số điện thoại để trao đổi.';
        hasError = true;
      } else if (contactVal.length < 6) {
        if (errContact) errContact.textContent = 'Thông tin liên hệ quá ngắn. Vui lòng kiểm tra lại.';
        hasError = true;
      }

      if (hasError) {
        if (formFeedback) {
          formFeedback.hidden = false;
          formFeedback.className = 'form-feedback is-error';
          formFeedback.textContent = 'Vui lòng điền đầy đủ các thông số bắt buộc trước khi gửi.';
        }
        return;
      }

      // Valid submission: strictly state demo interface limitation as required!
      if (formFeedback) {
        formFeedback.hidden = false;
        formFeedback.className = 'form-feedback is-demo';
        formFeedback.innerHTML = `
          <strong>THÔNG BÁO HỆ THỐNG (BẢN MINH HỌA GIAO DIỆN):</strong><br>
          Dữ liệu thông số đã được ghi nhận tại trình duyệt. Chức năng thử nghiệm trong bản mẫu không gửi thư điện tử thật đến máy chủ bên ngoài.<br>
          Để trao đổi thực tế về công trình của bạn, vui lòng liên hệ trực tiếp văn phòng Ngũ:<br>
          • <strong>Thư điện tử:</strong> studio@ngu-architecture.vn<br>
          • <strong>Đường dây nóng:</strong> +84 (0) 24 3822 5599
        `;
        formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });

    inquiryForm.addEventListener('reset', () => {
      setTimeout(clearErrors, 10);
    });
  }

  /* ==========================================================================
     6. ACCESSIBILITY: KEYBOARD ESCAPE LISTENER
     ========================================================================== */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.hasAttribute('open')) {
      closeProjectModal();
    }
  });
});
