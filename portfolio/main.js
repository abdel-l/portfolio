// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation d'EmailJS avec votre User ID
    emailjs.init("gZI0ozqtYlMbsFG32"); // Votre User ID EmailJS
    
    // Initialisation des animations AOS
    AOS.init({
        duration: 1000,
        once: false,
        mirror: true,
        offset: 100
    });

    // Gestion de la navigation
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    const navItems = document.querySelectorAll('.nav-links a');

    // Menu hamburger sur mobile
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // Animation des barres du hamburger
            const spans = this.querySelectorAll('span');
            spans[0].classList.toggle('rotate-down');
            spans[1].classList.toggle('fade-out');
            spans[2].classList.toggle('rotate-up');
        });
    }

    // Navigation fluide
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Fermer le menu mobile si ouvert
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.classList.remove('rotate-down', 'fade-out', 'rotate-up');
                });
            }

            // Navigation fluide vers la section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - navbar.offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Changer le style de la navbar au scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Mettre en surbrillance le lien actif
        highlightActiveNavLink();
    });

    // Fonction pour mettre en surbrillance le lien actif
    function highlightActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + navbar.offsetHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === '#' + sectionId) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    // Animation du texte d'accueil
    const accueilContent = document.querySelector('.accueil-content');
    if (accueilContent) {
        const title = accueilContent.querySelector('h1');
        const subtitle = accueilContent.querySelector('h2');
        const text = accueilContent.querySelector('p');
        const btn = accueilContent.querySelector('.btn-download');
        
        if (title) title.classList.add('fade-in');
        if (subtitle) {
            subtitle.style.opacity = '0';
            setTimeout(() => {
                subtitle.classList.add('fade-in');
                subtitle.style.opacity = '1';
            }, 300);
        }
        if (text) {
            text.style.opacity = '0';
            setTimeout(() => {
                text.classList.add('fade-in');
                text.style.opacity = '1';
            }, 600);
        }
        if (btn) {
            btn.style.opacity = '0';
            setTimeout(() => {
                btn.classList.add('fade-in');
                btn.style.opacity = '1';
            }, 900);
        }
    }

    // Animation des particules d'arrière-plan
    createParticles();

    // Gestion du carrousel de projets
    setupProjectCarousel();

    // Gestion du formulaire de contact avec EmailJS
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les données du formulaire
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Vérifier que tous les champs sont remplis
            if (!name || !email || !subject || !message) {
                showNotification('Veuillez remplir tous les champs !', 'error');
                return;
            }
            
            // Animation du bouton
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;
            
            // Paramètres pour EmailJS
            const templateParams = {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message,
                to_email: 'robin.oudard.sen@gmail.com'
            };
            
            // Envoyer l'email via EmailJS
            emailjs.send('service_b8ugqbq', 'template_zntocjb', templateParams)
                .then(function(response) {
                    console.log('Email envoyé avec succès!', response.status, response.text);
                    
                    // Réinitialiser le formulaire
                    contactForm.reset();
                    
                    // Notification de succès
                    showNotification('Message envoyé avec succès ! Je vous répondrai bientôt.', 'success');
                    
                    // Réinitialiser le bouton
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                }, function(error) {
                    console.error('Erreur lors de l\'envoi:', error);
                    
                    // Notification d'erreur
                    showNotification('Erreur lors de l\'envoi. Veuillez réessayer.', 'error');
                    
                    // Réinitialiser le bouton
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }

    // Fonction pour créer une notification
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animer l'apparition
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Disparition après 5 secondes
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    // Fonction pour créer des particules d'arrière-plan
    function createParticles() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const particles = document.createElement('div');
            particles.className = 'particles';
            
            for (let i = 0; i < 15; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // Position aléatoire
                const posX = Math.random() * 100;
                const posY = Math.random() * 100;
                const size = Math.random() * (10 - 2) + 2;
                const delay = Math.random() * 5;
                const duration = Math.random() * (15 - 5) + 5;
                
                particle.style.cssText = `
                    width: ${size}px;
                    height: ${size}px;
                    left: ${posX}%;
                    top: ${posY}%;
                    opacity: ${Math.random() * 0.5};
                    animation-delay: ${delay}s;
                    animation-duration: ${duration}s;
                `;
                
                particles.appendChild(particle);
            }
            
            section.appendChild(particles);
        });
    }

    // Animation au survol des cartes de projet
    const projetCards = document.querySelectorAll('.projet-card');
    
    projetCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // Position X relative à la carte
            const y = e.clientY - rect.top;  // Position Y relative à la carte
            
            // Calculer l'angle de rotation basé sur la position du curseur
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // Ajout de styles CSS pour les nouvelles animations
    addAnimationStyles();
});

// Fonction pour gérer le carrousel de projets
function setupProjectCarousel() {
    // Données des projets avec leurs captures d'écran
    const projetsData = {
        1: {
            title: "Projet 1 - Windows Form",
            description: "Application de gestion de fiche de frais développée en Windows Forms avec C#. Cette application permet aux utilisateurs de créer, modifier et gérer leurs fiches de frais de manière intuitive avec une interface desktop moderne.",
            technologies: ["C#", "Windows Forms", ".NET Framework", "SQL Server"],
            images: [
                "images/projet1/capture1.jpg",
                "images/projet1/capture2.jpg",
                "images/projet1/capture3.jpg"
            ]
        },
        2: {
            title: "Projet 2 - ASP.NET Core MVC",
            description: "Application web développée avec ASP.NET Core MVC utilisant le pattern Model-View-Controller. Cette application inclut une gestion complète des utilisateurs, une base de données relationnelle et une interface responsive.",
            technologies: ["ASP.NET Core", "C#", "MVC", "Entity Framework", "Bootstrap", "SQL Server"],
            images: [
                "images/projet2/capture1.jpg",
                "images/projet2/capture2.jpg",
                "images/projet2/capture3.jpg",
                "images/projet2/capture4.jpg"
            ]
        }
    };

    const modal = document.getElementById('projetModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const projectTechnologies = document.getElementById('projectTechnologies');
    const carouselInner = document.getElementById('carouselInner');
    const carouselIndicators = document.getElementById('carouselIndicators');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let currentSlide = 0;
    let currentProject = null;

    // Gestionnaire pour les boutons "Voir le projet"
    document.querySelectorAll('.btn-projet').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const projetId = this.getAttribute('data-projet');
            openProjectModal(projetId);
        });
    });

    // Fonction pour ouvrir le modal
    function openProjectModal(projetId) {
        currentProject = projetsData[projetId];
        if (!currentProject) return;

        // Remplir les informations du projet
        modalTitle.textContent = currentProject.title;
        modalDescription.textContent = currentProject.description;

        // Ajouter les technologies
        projectTechnologies.innerHTML = '';
        currentProject.technologies.forEach(tech => {
            const techTag = document.createElement('span');
            techTag.className = 'tech-tag';
            techTag.textContent = tech;
            projectTechnologies.appendChild(techTag);
        });

        // Créer le carrousel
        createCarousel(currentProject.images);
        
        // Afficher le modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Fonction pour créer le carrousel
    function createCarousel(images) {
        carouselInner.innerHTML = '';
        carouselIndicators.innerHTML = '';
        currentSlide = 0;

        // Créer les slides
        images.forEach((imageSrc, index) => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = `Capture ${index + 1}`;
            img.onerror = function() {
                // Image de placeholder si l'image n'existe pas
                this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5Ij5DYXB0dXJlICcgKyAoaW5kZXggKyAxKSArICc8L3RleHQ+PC9zdmc+';
            };
            
            slide.appendChild(img);
            carouselInner.appendChild(slide);

            // Créer les indicateurs
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(index));
            carouselIndicators.appendChild(indicator);
        });

        updateCarousel();
    }

    // Fonction pour aller à une slide spécifique
    function goToSlide(slideIndex) {
        const slides = carouselInner.children;
        const indicators = carouselIndicators.children;
        
        if (slideIndex >= slides.length) slideIndex = 0;
        if (slideIndex < 0) slideIndex = slides.length - 1;
        
        currentSlide = slideIndex;
        updateCarousel();
    }

    // Fonction pour mettre à jour le carrousel
    function updateCarousel() {
        const slideWidth = 100;
        carouselInner.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
        
        // Mettre à jour les indicateurs
        document.querySelectorAll('.indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }

    // Gestionnaires des boutons précédent/suivant
    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

    // Fermer le modal
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Navigation au clavier
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
            if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
        }
    });
}

// Fonction pour ajouter les styles CSS pour les animations
function addAnimationStyles() {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerHTML = `
        /* Styles pour les particules */
        .particles {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: -1;
        }
        
        .particle {
            position: absolute;
            background-color: rgba(108, 99, 255, 0.2);
            border-radius: 50%;
            pointer-events: none;
            animation: float-particle 10s infinite linear;
        }
        
        @keyframes float-particle {
            0% {
                transform: translateY(0) rotate(0deg);
            }
            50% {
                transform: translateY(-100px) rotate(180deg);
            }
            100% {
                transform: translateY(0) rotate(360deg);
            }
        }
        
        /* Styles pour la notification */
        .notification {
            position: fixed;
            bottom: 30px;
            right: 30px;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1000;
            max-width: 400px;
        }
        
        .notification.success {
            background: #4CAF50;
        }
        
        .notification.error {
            background: #f44336;
        }
        
        .notification.show {
            transform: translateY(0);
            opacity: 1;
        }
        
        /* Animation des barres du menu hamburger */
        .nav-toggle span {
            transition: all 0.3s ease;
        }
        
        .nav-toggle .rotate-down {
            transform: translateY(9px) rotate(45deg);
        }
        
        .nav-toggle .fade-out {
            opacity: 0;
        }
        
        .nav-toggle .rotate-up {
            transform: translateY(-9px) rotate(-45deg);
        }
    `;
    document.head.appendChild(styleSheet);
}