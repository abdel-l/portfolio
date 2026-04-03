// Dark mode toggle
const toggle = document.getElementById('darkToggle');
const html = document.documentElement;

const saved = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', saved);
toggle.querySelector('i').className = saved === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

toggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    toggle.querySelector('i').className = next === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
});

// Active nav on scroll
const sections = document.querySelectorAll('.section[id]');
const navItems = document.querySelectorAll('.nav-item');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navItems.forEach(n => n.classList.remove('active'));
            const active = document.querySelector(`.nav-item[href="#${entry.target.id}"]`);
            if (active) active.classList.add('active');
        }
    });
}, { threshold: 0.3 });

sections.forEach(s => observer.observe(s));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
