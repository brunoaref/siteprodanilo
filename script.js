/* ==========================================================================
   PRISMA — interatividade
   ========================================================================== */

document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Mobile nav toggle ---------- */
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ---------- Active nav link on scroll ---------- */
const sections = document.querySelectorAll('main .category, section#sobre');
const navLinks = document.querySelectorAll('.main-nav a');

const linkFor = id => document.querySelector(`.main-nav a[href="#${id}"]`);

if ('IntersectionObserver' in window){
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        navLinks.forEach(l => l.classList.remove('active'));
        const link = linkFor(entry.target.id);
        if (link) link.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach(sec => observer.observe(sec));
}

/* ---------- Category filter ---------- */
const chips = document.querySelectorAll('.chip');
const categorySections = document.querySelectorAll('.category');
const filterBar = document.querySelector('.filter-bar');
const headerHeight = document.querySelector('.site-header').offsetHeight;

chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('is-active'));
    chip.classList.add('is-active');

    const filter = chip.dataset.filter;

    categorySections.forEach(section => {
      const match = filter === 'all' || section.dataset.cat === filter;
      section.style.display = match ? '' : 'none';
    });
  });
});

/* Keep the sticky filter bar offset in sync with the header height */
document.documentElement.style.setProperty('--header-h', `${headerHeight}px`);
