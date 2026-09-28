/**
 * NGŨ ARCHITECTURE STUDIO — SWISS MINIMALIST INTERACTIVE CONTROLS (EN)
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
      name: 'Hang Bong Townhouse',
      location: 'Hoan Kiem, Hanoi (Old Quarter)',
      type: 'Residential',
      category: 'residential',
      scope: 'Lightwell & southeast daylight renovation',
      initial: '1994 reinforced concrete frame, squeezed between two 5-story buildings, dark and humid.',
      materials: '8mm CNC cut steel plate, polished Granito concrete, natural oiled ash wood.',
      desc: 'A 3.4m × 14m townhouse with three sides completely boxed in. The solution carved out an 8m² vertical atrium across two floors, bringing direct morning sun down through the rooftop skylight. Demolishing the old central concrete stair and introducing a perimeter steel stair established seamless open flow from living to kitchen.',
      img: './thumb_n01_1790520210407.jpg'
    },
    'W-01': {
      code: 'W-01',
      name: 'Yen Phu Creative Studio',
      location: 'Tay Ho, Hanoi (Near Red River Dike)',
      type: 'Workspace',
      category: 'workspace',
      scope: 'Converting 3-story tube house into open architectural studio',
      initial: 'Narrow subdivided tube house 3.1m × 16m with tight dark corridors and poor cross-ventilation.',
      materials: 'Matte black structural steel framing, whitewashed raw brickwork, matte epoxy flooring.',
      desc: 'A total structural and functional conversion from residential tube house to creative design atelier. All solid interior partitions were removed to establish an unobstructed 16m visual axis. A 6m communal workstation sits beneath the central lightwell, optimizing natural cross-breezes and micro-climate comfort.',
      img: './thumb_w01_1790520224360.jpg'
    },
    'N-02': {
      code: 'N-02',
      name: 'Kim Ma Narrow Residence',
      location: 'Ba Dinh, Hanoi (Deep 1.8m alley)',
      type: 'Residential',
      category: 'residential',
      scope: 'Split-level steel stair restructuring & climate louvers',
      initial: 'Extremely constrained 3.0m × 11.0m plot, bulky central concrete stairs consumed >30% floor area.',
      materials: 'Tension-rod suspension steel, powder-coated aluminum louvers, reclaimed solid oak.',
      desc: 'Sited deep in a 1.8m narrow alley with very restricted street-level daylight. The design replaced the obstructive central stair with a perimeter split-level suspended steel stair system hugging the western wall, unlocking 35% more usable floor area while filtering daylight from the roof to ground floor.',
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
    modalImg.alt = `Project details for ${data.name}`;

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
      statusValue.textContent = 'PRE-RENOVATION STATUS — ENCLOSED PARTITIONS, LACK OF LIGHT';
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
      statusValue.textContent = 'COMPLETED SPACE — EXPANSIVE ATRIUM, ROOFTOP DAYLIGHT PENETRATION';
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
      statusValue.textContent = 'SIDE-BY-SIDE COMPARISON — BEFORE (LEFT) VS COMPLETED SPACE (RIGHT)';
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
        statusValue.textContent = `TRANSITIONAL VIEW — TILTED TOWARDS PRE-RENOVATION (${val}%)`;
        setActiveCompButton(btnShowBefore);
      } else {
        if (!viewContainer.classList.contains('mode-single')) {
          viewContainer.className = 'comp-view-container mode-single';
        }
        frameBefore.classList.remove('active');
        frameAfter.classList.add('active');
        statusValue.textContent = `TRANSITIONAL VIEW — TILTED TOWARDS COMPLETED SPACE (${val}%)`;
        setActiveCompButton(btnShowAfter);
      }
    });
  }

  /* ==========================================================================
     5. PROJECT DISCUSSION INQUIRY FORM
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
        if (errLocation) errLocation.textContent = 'Please provide the project location or district.';
        hasError = true;
      }

      // Validate Dimensions
      if (!inputDimensions.value.trim()) {
        if (errDimensions) errDimensions.textContent = 'Please state the preliminary site dimensions or existing storeys.';
        hasError = true;
      }

      // Validate Needs
      if (!inputNeeds.value) {
        if (errNeeds) errNeeds.textContent = 'Please choose a primary renovation intent.';
        hasError = true;
      }

      // Validate Contact
      const contactVal = inputContact.value.trim();
      if (!contactVal) {
        if (errContact) errContact.textContent = 'Please provide an email address or telephone number.';
        hasError = true;
      } else if (contactVal.length < 6) {
        if (errContact) errContact.textContent = 'Contact information is too short. Please verify.';
        hasError = true;
      }

      if (hasError) {
        if (formFeedback) {
          formFeedback.hidden = false;
          formFeedback.className = 'form-feedback is-error';
          formFeedback.textContent = 'Please complete all required fields before submitting.';
        }
        return;
      }

      // Valid submission notice
      if (formFeedback) {
        formFeedback.hidden = false;
        formFeedback.className = 'form-feedback is-demo';
        formFeedback.innerHTML = `
          <strong>SYSTEM NOTICE (INTERFACE PROTOTYPE):</strong><br>
          Specification parameters recorded in browser. Demo prototype does not send real emails to an external server.<br>
          To discuss your project, contact Ngũ studio directly:<br>
          • <strong>Email:</strong> studio@ngu-architecture.vn<br>
          • <strong>Telephone:</strong> +84 (0) 24 3822 5599
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
