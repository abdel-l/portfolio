function initNav(activeId) {
    const links = [
        { href: 'index.html',       id: 'accueil',      label: 'Accueil' },
        { href: 'formation.html',   id: 'formation',    label: 'Formation & Expériences' },
        { href: 'projets.html',     id: 'projets',      label: 'Projets & Fiches' },
        { href: 'competences.html', id: 'competences',  label: 'Compétences' },
        { href: 'synthese.html',    id: 'synthese',     label: 'Synthèse' },
        { href: 'veille.html',      id: 'veille',       label: 'Veille' },
    ];

    document.querySelector('.navbar').innerHTML = `
        <a href="index.html" class="nav-brand">AF</a>
        <ul class="nav-menu">
            ${links.map(l => `<li><a href="${l.href}" class="nav-item${l.id === activeId ? ' active' : ''}">${l.label}</a></li>`).join('')}
        </ul>
        <button class="dark-toggle" id="darkToggle" title="Mode sombre">
            <i class="fas fa-moon"></i>
        </button>
    `;

    const toggle = document.getElementById('darkToggle');
    const html = document.documentElement;
    const saved = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', saved);
    toggle.querySelector('i').className = saved === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    toggle.addEventListener('click', () => {
        const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        toggle.querySelector('i').className = next === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    });
}
