/**
 * SIMON SPARKS — 3D MOTION PORTFOLIO
 * High-performance Interactive Logic & Three.js WebGL Engine
 * 100% Replication of Dribbble Shot 25949833
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. CUSTOM MAGNETIC CURSOR
  // =========================================================================
  const cursor = document.getElementById('cursor');
  const cursorFollower = document.getElementById('cursorFollower');
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

    const ambientGlow = document.getElementById('ambientGlow');
    if (ambientGlow) {
      ambientGlow.style.left = `${mouseX}px`;
      ambientGlow.style.top = `${mouseY}px`;
    }
  });

  function updateCursor() {
    if (cursorFollower) {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      cursorFollower.style.left = `${followerX}px`;
      cursorFollower.style.top = `${followerY}px`;
    }
    requestAnimationFrame(updateCursor);
  }
  updateCursor();

  const interactiveElements = document.querySelectorAll('a, button, .brand-card, .showcase-card, .stage-mockup-wrapper, .odyssey-artwork-card');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  // =========================================================================
  // 2. THREE.JS 3D KINETIC TORUS SCULPTURE
  // =========================================================================
  const canvas = document.getElementById('threeCanvas');
  let scene, camera, renderer, sculptureGroup, outerRing, innerRing, glowMesh, particleSystem;
  let targetRotationX = 0.2;
  let targetRotationY = -0.3;
  let currentRotationX = 0.2;
  let currentRotationY = -0.3;

  function initThree() {
    if (!canvas) return;

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 7.5;
    camera.position.y = 0.3;

    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    sculptureGroup = new THREE.Group();
    sculptureGroup.position.y = 0.45;
    scene.add(sculptureGroup);

    // 1. Outer Satin Cobalt Blue Shell
    const outerGeo = new THREE.TorusGeometry(2.1, 0.72, 48, 120);
    const outerMat = new THREE.MeshPhysicalMaterial({
      color: 0x1d4ed8,
      emissive: 0x0a1e5c,
      roughness: 0.22,
      metalness: 0.65,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9
    });
    outerRing = new THREE.Mesh(outerGeo, outerMat);
    outerRing.rotation.x = Math.PI / 4.2;
    outerRing.rotation.y = -Math.PI / 6;
    sculptureGroup.add(outerRing);

    // 2. Inner Glowing Magenta / Amber Neon Core
    const innerGeo = new THREE.TorusGeometry(1.65, 0.45, 48, 120);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: 0xff1e70,
      emissive: 0xff4d00,
      emissiveIntensity: 0.65,
      roughness: 0.15,
      metalness: 0.35,
      clearcoat: 1.0,
      transmission: 0.25,
      opacity: 0.95,
      transparent: true
    });
    innerRing = new THREE.Mesh(innerGeo, innerMat);
    innerRing.rotation.x = Math.PI / 3.8;
    innerRing.rotation.y = -Math.PI / 5.2;
    sculptureGroup.add(innerRing);

    // 3. Central Dynamic Spiral Ribbon
    const ribbonGeo = new THREE.TorusKnotGeometry(1.15, 0.25, 128, 32, 2, 3);
    const ribbonMat = new THREE.MeshStandardMaterial({
      color: 0xffa31a,
      emissive: 0xe11d48,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.8
    });
    glowMesh = new THREE.Mesh(ribbonGeo, ribbonMat);
    glowMesh.scale.set(0.9, 0.9, 0.9);
    sculptureGroup.add(glowMesh);

    // 4. Subtle Floating Stardust Particles
    const particleCount = 80;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 12;
      posArray[i + 1] = (Math.random() - 0.5) * 10;
      posArray[i + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x0e2040, 1.8);
    scene.add(ambientLight);

    const cyanLight = new THREE.DirectionalLight(0x38bdf8, 3.2);
    cyanLight.position.set(-6, 5, 4);
    scene.add(cyanLight);

    const magentaLight = new THREE.PointLight(0xff0066, 4.5, 15);
    magentaLight.position.set(2, -1, 2);
    scene.add(magentaLight);

    const amberLight = new THREE.PointLight(0xff8800, 3.8, 12);
    amberLight.position.set(0, 1, -1);
    scene.add(amberLight);

    // Parallax mouse tilt
    window.addEventListener('mousemove', (e) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotationY = normX * 0.45;
      targetRotationX = normY * 0.35 + 0.2;
    });

    window.addEventListener('resize', onWindowResize);
    animateThree();
  }

  function onWindowResize() {
    if (!camera || !renderer) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  let clock = new THREE.Clock();
  function animateThree() {
    if (window._pauseAnimation) return;
    requestAnimationFrame(animateThree);
    const elapsedTime = clock.getElapsedTime();

    currentRotationX += (targetRotationX - currentRotationX) * 0.06;
    currentRotationY += (targetRotationY - currentRotationY) * 0.06;

    if (sculptureGroup) {
      sculptureGroup.rotation.y = currentRotationY + elapsedTime * 0.18;
      sculptureGroup.rotation.x = currentRotationX + Math.sin(elapsedTime * 0.5) * 0.06;
      sculptureGroup.position.y = 0.45 + Math.sin(elapsedTime * 1.2) * 0.08;
    }

    if (innerRing) innerRing.rotation.z = -elapsedTime * 0.22;
    if (glowMesh) {
      glowMesh.rotation.y = elapsedTime * 0.3;
      glowMesh.rotation.x = elapsedTime * 0.15;
    }
    if (particleSystem) particleSystem.rotation.y = elapsedTime * 0.03;

    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
  }

  function updateThreeTheme(theme) {
    if (!outerRing || !innerRing || !glowMesh) return;
    if (theme === 'violet') {
      outerRing.material.color.setHex(0x6b21a8);
      outerRing.material.emissive.setHex(0x3b0764);
      innerRing.material.color.setHex(0xc084fc);
      innerRing.material.emissive.setHex(0xf43f5e);
      glowMesh.material.color.setHex(0xfb923c);
    } else if (theme === 'crimson') {
      outerRing.material.color.setHex(0x991b1b);
      outerRing.material.emissive.setHex(0x450a0a);
      innerRing.material.color.setHex(0xe11d48);
      innerRing.material.emissive.setHex(0xf97316);
      glowMesh.material.color.setHex(0xfacc15);
    } else {
      outerRing.material.color.setHex(0x1d4ed8);
      outerRing.material.emissive.setHex(0x0a1e5c);
      innerRing.material.color.setHex(0xff1e70);
      innerRing.material.emissive.setHex(0xff4d00);
      glowMesh.material.color.setHex(0xffa31a);
    }
  }

  initThree();

  // =========================================================================
  // 3. DRIBBLE 3D TORUS CINEMA LOOP & EXECUTIVE REEL
  // =========================================================================
  const heroCinemaVideo = document.getElementById('heroCinemaVideo');
  if (heroCinemaVideo) {
    heroCinemaVideo.play().catch(() => {});
    // Perfectly loop the Dribbble Torus rotation sequence
    heroCinemaVideo.addEventListener('timeupdate', () => {
      if (heroCinemaVideo.currentTime >= 2.15) {
        heroCinemaVideo.currentTime = 0.04;
      }
    });
  }

  const btnModeProfile = document.getElementById('btnModeProfile');
  const btnMode3D = document.getElementById('btnMode3D');

  if (btnModeProfile && heroCinemaVideo) {
    btnModeProfile.addEventListener('click', () => {
      heroCinemaVideo.classList.add('active');
      btnModeProfile.classList.add('active');
      if (btnMode3D) btnMode3D.classList.remove('active');
    });
  }

  if (btnMode3D && canvas) {
    btnMode3D.addEventListener('click', () => {
      if (heroCinemaVideo) heroCinemaVideo.classList.remove('active');
      btnMode3D.classList.add('active');
      if (btnModeProfile) btnModeProfile.classList.remove('active');
    });
  }

  // Audio Toggle Button
  if (btnToggleAudio && waseemMainVideo) {
    btnToggleAudio.addEventListener('click', (e) => {
      e.stopPropagation();
      waseemMainVideo.muted = !waseemMainVideo.muted;
      if (audioIcon) {
        if (waseemMainVideo.muted) {
          audioIcon.className = 'fa-solid fa-volume-xmark';
        } else {
          audioIcon.className = 'fa-solid fa-volume-high';
        }
      }
    });
  }

  // Fullscreen Video Reel Modal
  function openVideoModal() {
    if (!videoReelModal) return;
    if (waseemMainVideo) {
      waseemMainVideo.pause();
      if (modalFullscreenVideo) {
        modalFullscreenVideo.currentTime = waseemMainVideo.currentTime || 0;
      }
    }
    videoReelModal.classList.add('open');
    videoReelModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (modalFullscreenVideo) {
      modalFullscreenVideo.muted = false;
      modalFullscreenVideo.play().catch(() => {});
    }
  }

  function closeVideoModal() {
    if (!videoReelModal) return;
    videoReelModal.classList.remove('open');
    videoReelModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (modalFullscreenVideo) {
      modalFullscreenVideo.pause();
    }
    if (heroWaseemCard && heroWaseemCard.classList.contains('active') && waseemMainVideo) {
      waseemMainVideo.play().catch(() => {});
    }
  }

  if (btnPlayFullscreenVideo) {
    btnPlayFullscreenVideo.addEventListener('click', openVideoModal);
  }
  if (btnCloseVideoModal) {
    btnCloseVideoModal.addEventListener('click', closeVideoModal);
  }
  if (videoModalBackdrop) {
    videoModalBackdrop.addEventListener('click', closeVideoModal);
  }
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoReelModal && videoReelModal.classList.contains('open')) {
      closeVideoModal();
    }
  });

  // =========================================================================
  // 4. THEME SWITCHER LOGIC (Midnight / Cyber Violet / Monochrome Crimson)
  // =========================================================================
  const themePills = document.querySelectorAll('.theme-pill');
  const savedTheme = localStorage.getItem('simon_sparks_theme') || 'midnight';

  function applyTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    themePills.forEach(pill => {
      if (pill.getAttribute('data-set-theme') === themeName) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });
    localStorage.setItem('simon_sparks_theme', themeName);
    updateThreeTheme(themeName);
  }

  applyTheme(savedTheme);

  themePills.forEach(pill => {
    pill.addEventListener('click', () => {
      const theme = pill.getAttribute('data-set-theme');
      applyTheme(theme);
    });
  });

  // =========================================================================
  // 5. BRAND CARDS INTERACTION (Studio 74, Gloster, Linea, Cube 2.0)
  // =========================================================================
  const brandCards = document.querySelectorAll('.brand-card');
  brandCards.forEach(card => {
    card.addEventListener('click', () => {
      brandCards.forEach(c => c.classList.remove('featured-active'));
      card.classList.add('featured-active');
    });
  });

  // =========================================================================
  // 6. SCROLL TRACKING & DYNAMIC STEP NUMBER (01 ⟶, 02 ⟶ ...)
  // =========================================================================
  const sections = document.querySelectorAll('.section');
  const activeSectionNum = document.getElementById('activeSectionNum');
  const scrubberDots = document.querySelectorAll('.scrubber-dot');
  const scrubberIndicator = document.getElementById('scrubberIndicator');
  const header = document.getElementById('header');

  function onScroll() {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    let currentSectionId = 'hero';
    let currentIndex = '01';

    sections.forEach((sec, idx) => {
      const top = sec.offsetTop - 300;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentSectionId = sec.id;
        currentIndex = sec.getAttribute('data-section-index') || `0${idx + 1}`;
      }
    });

    if (activeSectionNum) {
      activeSectionNum.textContent = currentIndex;
    }

    scrubberDots.forEach((dot) => {
      if (dot.getAttribute('data-target') === currentSectionId) {
        dot.classList.add('active');
        if (scrubberIndicator) {
          const dotTop = dot.offsetTop;
          scrubberIndicator.style.transform = `translateY(${dotTop + 7}px)`;
        }
      } else {
        dot.classList.remove('active');
      }
    });

    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      const href = item.getAttribute('href');
      if (href === `#${currentSectionId}`) {
        item.classList.add('active');
      } else if (currentSectionId === 'brands' && href === '#brands') {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // =========================================================================
  // 7. 3D PARALLAX TILT ON CARDS (.interactive-tilt)
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
  // 8. PROJECT LIGHTBOX MODAL
  // =========================================================================
  const projectModal = document.getElementById('projectModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalImg = document.getElementById('modalImg');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');

  const projectDetails = {
    'boundless': {
      category: 'STAGE & BRAND EXPERIENCE',
      title: 'Boundless Reach: Code & Growth Architecture',
      img: 'assets/cropped/stage_art.png',
      desc: 'Unified digital transformation and brand presence engineered by Waseem Abbas. Integrating custom interactive 3D WebGL visuals with enterprise marketing funnels and high-performance serverless cloud infrastructure.'
    },
    'tnq': {
      category: 'E-COMMERCE & CONVERSION OPTIMIZATION',
      title: 'E-Commerce Growth Platform',
      img: 'assets/cropped/tnq_art.png',
      desc: 'End-to-end custom online shopping experience engineered for maximum speed, paired with hyper-targeted Meta & Google Ads campaigns resulting in a 4.8x ROAS and +140% month-over-month revenue growth.'
    },
    'dreams': {
      category: 'FULL-STACK WEB APP & SEO DOMINANCE',
      title: 'SaaS Web App & SEO Suite',
      img: 'assets/cropped/dreams_art.png',
      desc: 'Scalable React & Node.js application built with optimized Core Web Vitals and programmatic technical SEO, propelling organic search impressions past 250,000 monthly visitors.'
    },
    'escape': {
      category: 'OMNICHANNEL LAUNCH CAMPAIGN',
      title: 'Omnichannel Launch Campaign',
      img: 'assets/cropped/escape_art.png',
      desc: 'High-impact generative visual landing page combined with automated email drip marketing, retargeting funnels, and conversion tracking.'
    },
    'spheres': {
      category: 'HYBRID DEV & MARKETING MATRIX',
      title: 'Growth Unbound Odyssey',
      img: 'assets/cropped/spheres_art.png',
      desc: 'Comprehensive digital marketing audit, analytics dashboard integration, and frontend speed optimization achieving sub-second load times and a 62% increase in checkout conversions.'
    }
  };

  function openProjectModal(dataKey) {
    const data = projectDetails[dataKey];
    if (!data || !projectModal) return;

    modalImg.src = data.img;
    modalCategory.textContent = data.category;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;

    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProjectModal();
  });

  const btnPlayStageReel = document.getElementById('btnPlayStageReel');
  const btnBoundlessReadMore = document.getElementById('btnBoundlessReadMore');
  if (btnPlayStageReel) btnPlayStageReel.addEventListener('click', () => openProjectModal('boundless'));
  if (btnBoundlessReadMore) btnBoundlessReadMore.addEventListener('click', () => openProjectModal('boundless'));

  const showcaseCards = document.querySelectorAll('.showcase-card');
  showcaseCards.forEach(card => {
    card.addEventListener('click', () => {
      const projectKey = card.getAttribute('data-project');
      openProjectModal(projectKey);
    });
  });

  const odysseyArtCard = document.querySelector('.odyssey-artwork-card');
  if (odysseyArtCard) {
    odysseyArtCard.addEventListener('click', () => openProjectModal('spheres'));
  }

  // =========================================================================
  // 9. PORTFOLIO PERSONALIZER DRAWER
  // =========================================================================
  const btnOpenCustomizer = document.getElementById('btnOpenCustomizer');
  const btnCloseCustomizer = document.getElementById('btnCloseCustomizer');
  const customizerDrawer = document.getElementById('customizerDrawer');
  const btnApplyCustomizer = document.getElementById('btnApplyCustomizer');
  const btnResetCustomizer = document.getElementById('btnResetCustomizer');

  const inputFirstName = document.getElementById('inputFirstName');
  const inputLastName = document.getElementById('inputLastName');
  const inputTagline = document.getElementById('inputTagline');
  const inputBio = document.getElementById('inputBio');

  const displayPortfolioName = document.getElementById('displayPortfolioName');
  const displayPortfolioTagline = document.getElementById('displayPortfolioTagline');
  const displayArtistSub = document.getElementById('displayArtistSub');
  const displayBoundlessBio = document.getElementById('displayBoundlessBio');
  const displayCopyright = document.getElementById('displayCopyright');

  const defaultUser = {
    firstName: 'WASEEM',
    lastName: 'ABBAS',
    tagline: 'FULL-STACK CODE • HIGH-PERFORMANCE GROWTH',
    bio: "As a hybrid Full-Stack Developer and Performance Digital Marketer, I merge high-velocity web engineering with aggressive, data-backed growth marketing. I don't just build lightning-fast web applications—I architect the acquisition engines, search authority, and conversion funnels that scale businesses exponentially."
  };

  function loadSavedUserData() {
    const saved = localStorage.getItem('user_portfolio_config');
    let config = defaultUser;
    if (saved) {
      try {
        config = { ...defaultUser, ...JSON.parse(saved) };
      } catch (err) {}
    }
    if (inputFirstName) inputFirstName.value = config.firstName;
    if (inputLastName) inputLastName.value = config.lastName;
    if (inputTagline) inputTagline.value = config.tagline;
    if (inputBio) inputBio.value = config.bio;
    applyUserDataToDOM(config);
  }

  function applyUserDataToDOM(config) {
    const first = config.firstName || 'WASEEM';
    const last = config.lastName || 'ABBAS';
    const tagline = config.tagline || 'FULL-STACK CODE • HIGH-PERFORMANCE GROWTH';
    const bio = config.bio || defaultUser.bio;

    if (displayPortfolioName) {
      displayPortfolioName.innerHTML = `<span class="title-word first-word">${first}</span> <span class="title-word last-word">${last}</span>`;
    }
    if (displayPortfolioTagline) {
      displayPortfolioTagline.textContent = tagline;
    }
    if (displayArtistSub) {
      displayArtistSub.textContent = `${first} ${last}`;
    }
    if (displayBoundlessBio) {
      displayBoundlessBio.textContent = bio;
    }
    if (displayCopyright) {
      displayCopyright.innerHTML = `2026 COPYRIGHT &nbsp;|&nbsp; ${first} ${last} &nbsp;|&nbsp; ALL RIGHTS RESERVED`;
    }
    document.title = `${first} ${last} — Digital Marketer & Developer Portfolio`;
  }

  if (btnOpenCustomizer && customizerDrawer) {
    btnOpenCustomizer.addEventListener('click', () => {
      customizerDrawer.classList.add('open');
      customizerDrawer.setAttribute('aria-hidden', 'false');
    });
  }

  if (btnCloseCustomizer && customizerDrawer) {
    btnCloseCustomizer.addEventListener('click', () => {
      customizerDrawer.classList.remove('open');
      customizerDrawer.setAttribute('aria-hidden', 'true');
    });
  }

  if (btnApplyCustomizer) {
    btnApplyCustomizer.addEventListener('click', () => {
      const config = {
        firstName: inputFirstName.value.trim().toUpperCase() || 'WASEEM',
        lastName: inputLastName.value.trim().toUpperCase() || 'ABBAS',
        tagline: inputTagline.value.trim().toUpperCase() || 'FULL-STACK CODE • HIGH-PERFORMANCE GROWTH',
        bio: inputBio.value.trim()
      };
      localStorage.setItem('user_portfolio_config', JSON.stringify(config));
      applyUserDataToDOM(config);
      customizerDrawer.classList.remove('open');

      const toast = document.createElement('div');
      toast.style.position = 'fixed';
      toast.style.bottom = '30px';
      toast.style.left = '50%';
      toast.style.transform = 'translateX(-50%)';
      toast.style.background = 'var(--accent-gold)';
      toast.style.color = '#000';
      toast.style.padding = '12px 24px';
      toast.style.borderRadius = '30px';
      toast.style.fontWeight = 'bold';
      toast.style.zIndex = '999999';
      toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
      toast.textContent = '✨ Waseem Abbas details updated successfully!';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    });
  }

  if (btnResetCustomizer) {
    btnResetCustomizer.addEventListener('click', () => {
      localStorage.removeItem('user_portfolio_config');
      applyUserDataToDOM(defaultUser);
      if (inputFirstName) inputFirstName.value = defaultUser.firstName;
      if (inputLastName) inputLastName.value = defaultUser.lastName;
      if (inputTagline) inputTagline.value = defaultUser.tagline;
      if (inputBio) inputBio.value = defaultUser.bio;
      alert('Portfolio reset to Waseem Abbas defaults.');
    });
  }

  loadSavedUserData();

  // =========================================================================
  // 10. MULTI-PAGE OPERATIONAL FEATURES (Work Filters, ROI, Contact, FAQ)
  // =========================================================================
  
  // A. Work Filter Bar (work.html)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.work-project-card');
  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterVal = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const category = card.getAttribute('data-category') || '';
          if (filterVal === 'all' || category.includes(filterVal)) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // B. Interactive ROI Estimator (services.html)
  const budgetSlider = document.getElementById('budgetSlider');
  const roasSlider = document.getElementById('roasSlider');
  const budgetDisplay = document.getElementById('budgetDisplay');
  const roasDisplay = document.getElementById('roasDisplay');
  const projectedRevenue = document.getElementById('projectedRevenue');

  function updateRoiCalculations() {
    if (!budgetSlider || !roasSlider || !projectedRevenue) return;
    const budget = parseFloat(budgetSlider.value);
    const roas = parseFloat(roasSlider.value);
    const total = budget * roas;

    if (budgetDisplay) budgetDisplay.textContent = `$${budget.toLocaleString()} / mo`;
    if (roasDisplay) roasDisplay.textContent = `${roas.toFixed(1)}x ROAS`;
    projectedRevenue.textContent = `$${Math.round(total).toLocaleString()}`;
  }

  if (budgetSlider && roasSlider) {
    budgetSlider.addEventListener('input', updateRoiCalculations);
    roasSlider.addEventListener('input', updateRoiCalculations);
    updateRoiCalculations();
  }

  // C. Interactive Contact Form (contact.html)
  const contactForm = document.getElementById('contactForm');
  const btnSubmitForm = document.getElementById('btnSubmitForm');
  const formSuccessToast = document.getElementById('formSuccessToast');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (btnSubmitForm) {
        btnSubmitForm.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> TRANSMITTING BRIEF...';
        btnSubmitForm.disabled = true;
      }

      setTimeout(() => {
        if (btnSubmitForm) {
          btnSubmitForm.innerHTML = '<i class="fa-solid fa-check"></i> BRIEF TRANSMITTED';
          btnSubmitForm.style.background = '#22c55e';
          btnSubmitForm.style.color = '#fff';
        }
        if (formSuccessToast) {
          formSuccessToast.classList.add('active');
        }
        contactForm.reset();
      }, 900);
    });
  }

  // D. FAQ Accordions (contact.html)
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (header) {
      header.addEventListener('click', () => {
        const wasActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!wasActive) {
          item.classList.add('active');
        }
      });
    }
  });

  console.log('⚡ Waseem Abbas Multi-Page Engine Initialized Successfully');
});

