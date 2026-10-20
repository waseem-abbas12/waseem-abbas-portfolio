/**
 * WASEEM ABBAS — GSAP & SCROLLTRIGGER MOTION ENGINE
 * File: js/gsap-config.js
 * Implements horizontal film storytelling scroll timeline and multi-layered parallax depth.
 */

(function () {
  document.addEventListener('DOMContentLoaded', () => {
    // Check if GSAP and ScrollTrigger are loaded
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('GSAP or ScrollTrigger not loaded. Horizontal scroll fallback enabled.');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Optimize ScrollTrigger for mobile browsers (prevent address bar resize jumps)
    ScrollTrigger.config({
      ignoreMobileResize: true,
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize'
    });

    // =========================================================================
    // 1. HERO CINEMATIC ENTRANCE TIMELINE
    // =========================================================================
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    const heroCanvas = document.getElementById('torusCanvas');
    const heroSubLabel = document.querySelector('.hero-sub-label');
    const heroTitle = document.querySelector('.hero-main-title');
    const heroTagline = document.getElementById('displayPortfolioTagline');
    const heroTriangle = document.querySelector('.hero-indicator-triangle');
    const heroPrompter = document.querySelector('.hero-scroll-prompter');

    if (heroCanvas) {
      heroTl.fromTo(heroCanvas,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2 }
      );
    }

    if (heroSubLabel) {
      heroTl.fromTo(heroSubLabel,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        '-=0.8'
      );
    }

    if (heroTitle) {
      heroTl.fromTo(heroTitle,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        '-=0.6'
      );
    }

    if (heroTriangle) {
      heroTl.fromTo(heroTriangle,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5 },
        '-=0.5'
      );
    }

    if (heroTagline) {
      heroTl.fromTo(heroTagline,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        '-=0.4'
      );
    }

    if (heroPrompter) {
      heroTl.fromTo(heroPrompter,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.3'
      );
    }

    // =========================================================================
    // 2. HERO SCROLL PARALLAX (Active on Both Desktop & Mobile)
    // =========================================================================
    const heroSection = document.getElementById('hero');
    const heroTypography = document.querySelector('.hero-typography-container');
    const heroGlow = document.querySelector('.hero-glow-underlay');

    if (heroSection && heroTypography) {
      gsap.to(heroTypography, {
        y: 60,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    if (heroSection && heroCanvas) {
      gsap.to(heroCanvas, {
        y: -40,
        scale: 0.92,
        ease: 'none',
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    // Mouse-move Parallax for Desktop Pointers
    if (window.matchMedia('(pointer: fine)').matches && heroSection) {
      window.addEventListener('mousemove', (e) => {
        const xPos = (e.clientX / window.innerWidth) - 0.5;
        const yPos = (e.clientY / window.innerHeight) - 0.5;

        if (heroTypography) {
          gsap.to(heroTypography, {
            x: xPos * 25,
            y: yPos * 18,
            duration: 0.8,
            ease: 'power1.out'
          });
        }

        if (heroGlow) {
          gsap.to(heroGlow, {
            x: xPos * -40,
            y: yPos * -30,
            duration: 1.2,
            ease: 'power1.out'
          });
        }
      });
    }

    // =========================================================================
    // 3. 3D ORBIT WHEEL SECTION ENTRANCE
    // =========================================================================
    const orbitSection = document.querySelector('.orbit-wheel-section');
    const orbitStage = document.getElementById('orbitStageWrapper');
    const orbitDetailCard = document.getElementById('orbitDetailCard');

    if (orbitSection && orbitStage) {
      gsap.from(orbitStage, {
        opacity: 0,
        scale: 0.88,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: orbitSection,
          start: 'top 85%'
        }
      });
    }

    if (orbitSection && orbitDetailCard) {
      gsap.from(orbitDetailCard, {
        opacity: 0,
        y: 35,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: orbitDetailCard,
          start: 'top 92%'
        }
      });
    }

    // =========================================================================
    // 4. STORYTELLING CHAPTER DECK REVEAL
    // =========================================================================
    const storySection = document.querySelector('.storytelling-section');
    if (storySection) {
      gsap.from('.story-deck-wrapper', {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: storySection,
          start: 'top 85%'
        }
      });
    }

    // =========================================================================
    // 5. BRAND CARDS & SHOWCASE ENTRANCE
    // =========================================================================
    gsap.utils.toArray('.brand-card').forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 35,
        duration: 0.7,
        delay: i * 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%'
        }
      });
    });

    gsap.utils.toArray('.showcase-card').forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%'
        }
      });
    });

    // Contact Box Reveal
    const contactBox = document.querySelector('.contact-box-glass');
    if (contactBox) {
      gsap.from(contactBox, {
        opacity: 0,
        y: 45,
        scale: 0.96,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contactBox,
          start: 'top 85%'
        }
      });
    }

    console.log('⚡ GSAP Mobile & Desktop Motion Engine Active');
  });
})();
