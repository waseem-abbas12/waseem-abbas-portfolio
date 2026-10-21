/**
 * WASEEM ABBAS — NEXT-GEN 3D MOTION PORTFOLIO
 * File: js/app.js
 * Core application logic, custom cursor, 3D tilt, scroll tracking & UI controls.
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. CUSTOM REACTIVE CURSOR
  // =========================================================================
  const cursor = document.getElementById('cursor');
  const cursorFollower = document.getElementById('cursorFollower');
  const ambientGlow = document.getElementById('ambientGlow');
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let followerX = mouseX;
  let followerY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursor) {
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    }
    if (ambientGlow) {
      ambientGlow.style.left = `${mouseX}px`;
      ambientGlow.style.top = `${mouseY}px`;
    }
  });

  function updateCursor() {
    if (cursorFollower) {
      followerX += (mouseX - followerX) * 0.16;
      followerY += (mouseY - followerY) * 0.16;
      cursorFollower.style.left = `${followerX}px`;
      cursorFollower.style.top = `${followerY}px`;
    }
    requestAnimationFrame(updateCursor);
  }
  updateCursor();

  const interactiveElements = document.querySelectorAll('a, button, .brand-card, .showcase-card, .orbit-node, .social-node, .stage-mockup-wrapper');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  // =========================================================================
  // 2. 3D HOVER TILT EFFECTS ON CARDS (.interactive-tilt)
  // =========================================================================
  const tiltElements = document.querySelectorAll('.interactive-tilt');
  tiltElements.forEach(elem => {
    elem.addEventListener('mousemove', (e) => {
      const rect = elem.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      elem.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    elem.addEventListener('mouseleave', () => {
      elem.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      elem.style.transition = 'transform 0.5s ease';
    });

    elem.addEventListener('mouseenter', () => {
      elem.style.transition = 'transform 0.1s ease';
    });
  });

  // =========================================================================
  // 3. 3D TORUS CANVAS INTERACTION (Hero)
  // =========================================================================
  const torusCanvas = document.getElementById('torusCanvas');
  if (torusCanvas) {
    const ctx = torusCanvas.getContext('2d');
    const totalFrames = 60;
    const cleanFrames = [];
    let currentFrameIdx = 0;
    let framesLoaded = 0;

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      const numStr = String(i).padStart(3, '0');
      img.src = `assets/torus_clean_frames/f_${numStr}.jpg`;
      img.onload = () => {
        framesLoaded++;
        if (framesLoaded === 1) {
          ctx.drawImage(img, 0, 0, torusCanvas.width, torusCanvas.height);
        }
      };
      cleanFrames.push(img);
    }

    let lastTime = 0;
    const frameInterval = 1000 / 30; // 30 fps smooth playback

    function renderTorusFrame(time) {
      if (time - lastTime >= frameInterval) {
        const frame = cleanFrames[currentFrameIdx];
        if (frame && frame.complete && frame.naturalWidth > 0) {
          ctx.clearRect(0, 0, torusCanvas.width, torusCanvas.height);
          ctx.drawImage(frame, 0, 0, torusCanvas.width, torusCanvas.height);
        }
        currentFrameIdx = (currentFrameIdx + 1) % totalFrames;
        lastTime = time;
      }
      requestAnimationFrame(renderTorusFrame);
    }
    requestAnimationFrame(renderTorusFrame);

    // Mouse tilt
    window.addEventListener('mousemove', (e) => {
      const normX = (e.clientX / window.innerWidth) - 0.5;
      const normY = (e.clientY / window.innerHeight) - 0.5;
      const tiltX = normY * -9;
      const tiltY = normX * 12;
      torusCanvas.style.transform = `translate(-50%, -50%) perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    // Drag scrub
    let isDragging = false;
    let startX = 0;
    torusCanvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
    });
    window.addEventListener('mouseup', () => isDragging = false);
    window.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const deltaX = e.clientX - startX;
        startX = e.clientX;
        currentFrameIdx = (currentFrameIdx + Math.round(deltaX * 0.25) + totalFrames) % totalFrames;
        if (cleanFrames[currentFrameIdx] && cleanFrames[currentFrameIdx].complete) {
          ctx.clearRect(0, 0, torusCanvas.width, torusCanvas.height);
          ctx.drawImage(cleanFrames[currentFrameIdx], 0, 0, torusCanvas.width, torusCanvas.height);
        }
      }
    });
  }

  // =========================================================================
  // 4. CONTINUOUS SCROLL TRACKING & NAVIGATION ENGINE
  // =========================================================================
  const sectionIds = ['hero', 'orbit', 'storytelling', 'skills', 'boundless', 'showcase', 'social', 'contact'];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
  const activeSectionNum = document.getElementById('activeSectionNum');
  const scrubberDots = document.querySelectorAll('.scrubber-dot');
  const scrubberIndicator = document.getElementById('scrubberIndicator');
  const header = document.getElementById('header');
  const navItems = document.querySelectorAll('.nav-item');
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavClose = document.getElementById('mobileNavClose');
  const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  let currentActiveId = 'hero';

  function getActiveSection() {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    if (scrollY + viewportHeight >= docHeight - 60) {
      return sections[sections.length - 1];
    }

    let bestSection = sections[0];
    let maxVisibleRatio = -Infinity;

    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(viewportHeight, rect.bottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);

      if (visibleHeight > 0) {
        const coverage = visibleHeight / Math.min(rect.height, viewportHeight);
        if (coverage > maxVisibleRatio) {
          maxVisibleRatio = coverage;
          bestSection = sec;
        }
      }
    });

    return bestSection;
  }

  function updateScrollUI() {
    const scrollY = window.scrollY;

    if (header) {
      if (scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    const activeSec = getActiveSection();
    if (!activeSec) return;
    const activeId = activeSec.id;

    if (activeId !== currentActiveId) {
      currentActiveId = activeId;
      const index = sectionIds.indexOf(activeId) + 1;
      const indexStr = String(index).padStart(2, '0');

      if (activeSectionNum) {
        activeSectionNum.textContent = indexStr;
      }

      let matchedDot = null;
      scrubberDots.forEach(dot => {
        if (dot.getAttribute('data-target') === activeId) {
          dot.classList.add('active');
          matchedDot = dot;
        } else {
          dot.classList.remove('active');
        }
      });

      if (matchedDot && scrubberIndicator) {
        scrubberIndicator.style.top = `${matchedDot.offsetTop}px`;
      }

      navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === `#${activeId}`) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });

      mobileNavLinks.forEach(link => {
        if (link.getAttribute('href') === `#${activeId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }

  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        updateScrollUI();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

  updateScrollUI();

  function smoothScrollTo(targetSelector) {
    if (!targetSelector || targetSelector === '#') return;
    const targetEl = document.querySelector(targetSelector);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrubberDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = dot.getAttribute('data-target');
      smoothScrollTo(`#${targetId}`);
    });
  });

  navItems.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        smoothScrollTo(href);
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.length > 1 && !link.classList.contains('scrubber-dot') && !link.classList.contains('nav-item') && !link.classList.contains('mobile-nav-link')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          smoothScrollTo(href);
        }
      }
    });
  });

  // Mobile Navigation Drawer
  function openMobileNav() {
    if (!mobileNavDrawer) return;
    mobileNavDrawer.classList.add('open');
    mobileNavDrawer.setAttribute('aria-hidden', 'false');
    if (mobileNavToggle) mobileNavToggle.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    if (!mobileNavDrawer) return;
    mobileNavDrawer.classList.remove('open');
    mobileNavDrawer.setAttribute('aria-hidden', 'true');
    if (mobileNavToggle) mobileNavToggle.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
      if (mobileNavDrawer && mobileNavDrawer.classList.contains('open')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (mobileNavClose) mobileNavClose.addEventListener('click', closeMobileNav);
  if (mobileNavBackdrop) mobileNavBackdrop.addEventListener('click', closeMobileNav);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        closeMobileNav();
        smoothScrollTo(href);
      }
    });
  });

  // Brand Cards Selection
  const brandCards = document.querySelectorAll('.brand-card');
  brandCards.forEach(card => {
    card.addEventListener('click', () => {
      brandCards.forEach(c => c.classList.remove('featured-active'));
      card.classList.add('featured-active');
    });
  });

  // =========================================================================
  // CHAPTER EXPERIENCE DECK TABS (The Odyssey)
  // =========================================================================
  const storyTabBtns = document.querySelectorAll('.story-tab-btn');
  const storySlides = document.querySelectorAll('.story-slide');

  if (storyTabBtns.length > 0 && storySlides.length > 0) {
    storyTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const chapter = btn.getAttribute('data-chapter');
        storyTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        storySlides.forEach(slide => {
          if (slide.getAttribute('data-chapter') === chapter) {
            slide.classList.add('active');
          } else {
            slide.classList.remove('active');
          }
        });
      });
    });
  }

  // =========================================================================
  // 5. HERO SHOWCASE SWITCHER (3D Torus vs AI Talking Avatar vs Website Video)
  // =========================================================================
  const btnModeTorus = document.getElementById('btnModeTorus');
  const btnModeAvatar = document.getElementById('btnModeAvatar');
  const btnOpenShowcaseVideo = document.getElementById('btnOpenShowcaseVideo');
  const torusCanvasEl = document.getElementById('torusCanvas');
  const heroWaseemCard = document.getElementById('heroWaseemCard');
  const heroWaseemVideo = document.getElementById('heroWaseemVideo');
  const btnToggleHeroAudio = document.getElementById('btnToggleHeroAudio');
  const heroAudioIcon = document.getElementById('heroAudioIcon');

  if (btnModeTorus && btnModeAvatar) {
    btnModeTorus.addEventListener('click', () => {
      btnModeTorus.classList.add('active');
      btnModeAvatar.classList.remove('active');
      if (torusCanvasEl) torusCanvasEl.style.display = 'block';
      if (heroWaseemCard) heroWaseemCard.classList.remove('active');
      if (heroWaseemVideo) heroWaseemVideo.pause();
    });

    btnModeAvatar.addEventListener('click', () => {
      btnModeAvatar.classList.add('active');
      btnModeTorus.classList.remove('active');
      if (torusCanvasEl) torusCanvasEl.style.display = 'none';
      if (heroWaseemCard) {
        heroWaseemCard.classList.add('active');
        if (heroWaseemVideo) {
          heroWaseemVideo.play().catch(() => {});
        }
      }
    });
  }

  // Hero AI Video Audio Toggle
  if (btnToggleHeroAudio && heroWaseemVideo && heroAudioIcon) {
    btnToggleHeroAudio.addEventListener('click', (e) => {
      e.stopPropagation();
      heroWaseemVideo.muted = !heroWaseemVideo.muted;
      if (heroWaseemVideo.muted) {
        heroAudioIcon.classList.remove('fa-volume-high');
        heroAudioIcon.classList.add('fa-volume-xmark');
      } else {
        heroAudioIcon.classList.remove('fa-volume-xmark');
        heroAudioIcon.classList.add('fa-volume-high');
      }
    });
  }

  // =========================================================================
  // 6. BOUNDLESS KEYNOTE STAGE VIDEO CONTROLS
  // =========================================================================
  const stageKeynoteVideo = document.getElementById('stageKeynoteVideo');
  const btnStagePlayPause = document.getElementById('btnStagePlayPause');
  const stagePlayIcon = document.getElementById('stagePlayIcon');
  const btnStageAudio = document.getElementById('btnStageAudio');
  const stageAudioIcon = document.getElementById('stageAudioIcon');
  const btnStageFullscreen = document.getElementById('btnStageFullscreen');

  if (stageKeynoteVideo && btnStagePlayPause && stagePlayIcon) {
    btnStagePlayPause.addEventListener('click', () => {
      if (stageKeynoteVideo.paused) {
        stageKeynoteVideo.play();
        stagePlayIcon.classList.remove('fa-play');
        stagePlayIcon.classList.add('fa-pause');
      } else {
        stageKeynoteVideo.pause();
        stagePlayIcon.classList.remove('fa-pause');
        stagePlayIcon.classList.add('fa-play');
      }
    });
  }

  if (stageKeynoteVideo && btnStageAudio && stageAudioIcon) {
    btnStageAudio.addEventListener('click', () => {
      stageKeynoteVideo.muted = !stageKeynoteVideo.muted;
      if (stageKeynoteVideo.muted) {
        stageAudioIcon.classList.remove('fa-volume-high');
        stageAudioIcon.classList.add('fa-volume-xmark');
      } else {
        stageAudioIcon.classList.remove('fa-volume-xmark');
        stageAudioIcon.classList.add('fa-volume-high');
      }
    });
  }

  // =========================================================================
  // 7. FULLSCREEN CINEMATIC VIDEO REEL MODAL ENGINE
  // =========================================================================
  const videoReelModal = document.getElementById('videoReelModal');
  const btnCloseVideoModal = document.getElementById('btnCloseVideoModal');
  const videoModalBackdrop = document.getElementById('videoModalBackdrop');
  const modalFullscreenVideo = document.getElementById('modalFullscreenVideo');
  const modalVideoSource = document.getElementById('modalVideoSource');
  const modalVideoTitle = document.getElementById('modalVideoTitle');
  const modalVideoDesc = document.getElementById('modalVideoDesc');

  function openVideoModal(videoSrc, title, desc) {
    if (!videoReelModal || !modalFullscreenVideo) return;
    if (modalVideoSource && videoSrc) {
      modalVideoSource.src = videoSrc;
      modalFullscreenVideo.load();
    }
    if (modalVideoTitle && title) modalVideoTitle.textContent = title;
    if (modalVideoDesc && desc) modalVideoDesc.textContent = desc;

    videoReelModal.classList.add('open');
    videoReelModal.setAttribute('aria-hidden', 'false');
    modalFullscreenVideo.play().catch(() => {});
    document.body.style.overflow = 'hidden';
  }

  function closeVideoModal() {
    if (!videoReelModal || !modalFullscreenVideo) return;
    videoReelModal.classList.remove('open');
    videoReelModal.setAttribute('aria-hidden', 'true');
    modalFullscreenVideo.pause();
    document.body.style.overflow = '';
  }

  if (btnStageFullscreen) {
    btnStageFullscreen.addEventListener('click', () => {
      openVideoModal(
        'assets/waseem_avatar_talking.mp4',
        'Waseem Abbas — Live Keynote & Stage Presentation',
        'High-Velocity Digital Growth, 3D Web Engineering & AI Architecture'
      );
    });
  }

  if (btnCloseVideoModal) btnCloseVideoModal.addEventListener('click', closeVideoModal);
  if (videoModalBackdrop) videoModalBackdrop.addEventListener('click', closeVideoModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoReelModal && videoReelModal.classList.contains('open')) {
      closeVideoModal();
    }
  });

  // =========================================================================
  // 8. SCROLL REVEAL OBSERVER (Guaranteed Native Animation Trigger)
  // =========================================================================
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-on-scroll');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.story-slide, .brand-card, .showcase-card, .stage-mockup-wrapper, .contact-box-glass').forEach(el => {
      observer.observe(el);
    });
  }

  console.log('⚡ Waseem Abbas Next-Gen 3D Motion Portfolio Initialized');
});
