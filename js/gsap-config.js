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

    // =========================================================================
    // 1. HORIZONTAL STORYTELLING SCROLL TIMELINE (PINNED)
    // =========================================================================
    const storySection = document.querySelector('.storytelling-section');
    const storyWrapper = document.querySelector('.storytelling-wrapper');
    const chapters = gsap.utils.toArray('.story-chapter');

    if (storySection && storyWrapper && chapters.length > 1) {
      // Horizontal scroll animation
      const scrollTween = gsap.to(storyWrapper, {
        xPercent: -100 * (chapters.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: storySection,
          pin: true,
          scrub: 1.1,
          snap: 1 / (chapters.length - 1),
          start: 'top top',
          end: () => '+=' + (storyWrapper.scrollWidth - window.innerWidth),
          invalidateOnRefresh: true
        }
      });

      // Chapter-specific parallax depth triggers
      chapters.forEach((chapter, i) => {
        const content = chapter.querySelector('.story-content-side');
        const visual = chapter.querySelector('.story-visual-side');

        if (content && visual) {
          gsap.fromTo(visual,
            { scale: 0.88, opacity: 0.6 },
            {
              scale: 1,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: chapter,
                containerAnimation: scrollTween,
                start: 'left center',
                end: 'center center',
                scrub: true
              }
            }
          );
        }
      });
    }

    // =========================================================================
    // 2. HERO MULTI-LAYERED PARALLAX DEPTH
    // =========================================================================
    const heroSection = document.getElementById('hero');
    const heroTypography = document.querySelector('.hero-typography-container');
    const heroGlow = document.querySelector('.hero-glow-underlay');

    if (heroSection) {
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
    // 3. ENTRANCE FADE-UP ON SCROLL (Brand Cards & Showcase)
    // =========================================================================
    gsap.utils.toArray('.brand-card').forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.brands-section',
          start: 'top 75%'
        }
      });
    });

    gsap.utils.toArray('.showcase-card').forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 45,
        duration: 0.8,
        delay: i * 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.showcase-section',
          start: 'top 75%'
        }
      });
    });

    console.log('⚡ GSAP & ScrollTrigger Storytelling Matrix Active');
  });
})();
