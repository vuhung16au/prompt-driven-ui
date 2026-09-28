// script.js
document.addEventListener('DOMContentLoaded', () => {
  const btnMainProject = document.getElementById('btn-main-project');
  const caseStudy = document.getElementById('case-study');
  const btnCloseCase = document.getElementById('btn-close-case');

  btnMainProject.addEventListener('click', () => {
    const isExpanded = btnMainProject.getAttribute('aria-expanded') === 'true';
    if (!isExpanded) {
      btnMainProject.setAttribute('aria-expanded', 'true');
      caseStudy.hidden = false;
      // Use setTimeout to ensure display is applied before scrolling
      setTimeout(() => {
        caseStudy.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  });

  btnCloseCase.addEventListener('click', () => {
    caseStudy.hidden = true;
    btnMainProject.setAttribute('aria-expanded', 'false');
    btnMainProject.focus(); // Return focus properly
  });
});
