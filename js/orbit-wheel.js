/**
 * WASEEM ABBAS — INTERACTIVE 3D DUAL ORBIT SYSTEM
 * File: js/orbit-wheel.js
 * 1. 3D Services Capabilities Wheel (Web Dev, Marketing, AI, Real Estate)
 * 2. 3D Social Media Ecosystem Wheel (Facebook, TikTok, Instagram, Twitter, LinkedIn, YouTube, WhatsApp)
 * Features true 360-degree orbital revolution around central core, 3D z-depth layering, drag-to-spin, and mobile touch.
 */

(function () {
  // Service Capabilities Data
  const serviceData = {
    'web-dev': {
      category: 'ENGINEERING & ARCHITECTURE',
      title: 'Full-Stack Web & WebGL Motion',
      desc: 'High-velocity web applications engineered with Next.js, Three.js WebGL, and scalable cloud microservices. Built for sub-second Core Web Vitals and immersive 3D experiences.',
      tag: 'REACT • THREE.JS • NODE.JS • AWS',
      url: 'web-development.html'
    },
    'marketing': {
      category: 'GROWTH & REVENUE',
      title: 'Performance Paid Acquisition',
      desc: 'Hyper-targeted Meta & Google Ads campaigns backed by deep data attribution and conversion rate optimization (CRO) generating 4.8x+ verified ROAS.',
      tag: 'META ADS • GOOGLE ADS • CRO • FUNNELS',
      url: 'digital-marketing.html'
    },
    'ai-automation': {
      category: 'FUTURE SYSTEMS',
      title: 'Agentic AI & Intelligent Workflows',
      desc: 'Autonomous AI agents, conversational voice hosts, and custom CRM automation pipelines designed to eliminate manual bottlenecks and scale client velocity 10x.',
      tag: 'PYTHON • LLM APIS • AGENTS • N8N',
      url: 'ai-automation.html'
    },
    'real-estate': {
      category: 'HIGH-TICKET SPECIALIZATION',
      title: 'Real Estate & Luxury Funnel Architecture',
      desc: 'Bespoke high-ticket lead generation funnels, virtual tour integration, and programmatic investor acquisition systems tailored for enterprise developers.',
      tag: 'HIGH-TICKET • LEAD FUNNELS • 3D TOURS',
      url: 'real-estate.html'
    }
  };

  // Official Social Media Ecosystem Data
  const socialData = {
    'facebook': {
      category: 'COMMUNITY & CASE STUDIES',
      title: 'Official Facebook Presence',
      handle: 'Waseem Abbas Official',
      desc: 'Follow client project milestones, live launch case studies, digital marketing insights, and agency behind-the-scenes.',
      url: 'https://www.facebook.com/share/1EqXm2Hz43/',
      btnText: 'VISIT FACEBOOK PROFILE'
    },
    'tiktok': {
      category: 'VIRAL TECH & MOTION REELS',
      title: 'TikTok Tech Channel',
      handle: '@waseem97199',
      desc: 'Bite-sized full-stack engineering breakdowns, 3D WebGL motion snippets, and growth marketing experiments.',
      url: 'https://www.tiktok.com/@waseem97199',
      btnText: 'WATCH ON TIKTOK'
    },
    'instagram': {
      category: 'VISUAL ARCHITECTURE & LIFESTYLE',
      title: 'Official Instagram Grid',
      handle: '@waseem79199',
      desc: 'Aesthetic UI/UX showcases, high-ticket real estate media, creative agency lifestyle, and direct stories from Waseem.',
      url: 'https://www.instagram.com/waseem79199?stkn=MWVtMmZhc3BjN3Vucg==',
      btnText: 'FOLLOW ON INSTAGRAM'
    },
    'twitter': {
      category: 'TECH THOUGHT LEADERSHIP & WEB3',
      title: 'X / Twitter Feed',
      handle: '@WaseemAbba34198',
      desc: 'Daily commentary on autonomous AI agents, performance advertising algorithm updates, and scalable system architecture.',
      url: 'https://x.com/WaseemAbba34198',
      btnText: 'CONNECT ON X'
    },
    'linkedin': {
      category: 'ENTERPRISE & STRATEGY CONSULTING',
      title: 'LinkedIn Professional Network',
      handle: 'Waseem Abbas',
      desc: 'Connect directly for B2B contracts, international development retainers, and enterprise marketing consulting partnerships.',
      url: 'https://www.linkedin.com/in/waseem-abbas-441496163?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      btnText: 'CONNECT ON LINKEDIN'
    },
    'youtube': {
      category: 'KEYNOTES & MASTERCLASSES',
      title: 'YouTube Official Channel',
      handle: '@wamedia79979',
      desc: 'In-depth tutorials, keynote presentations on full-stack scaling, and digital agency client case-study walkthroughs.',
      url: 'https://youtube.com/@wamedia79979?si=C6-sgoMhrPIsY8da',
      btnText: 'SUBSCRIBE ON YOUTUBE'
    },
    'whatsapp': {
      category: 'INSTANT DIRECT 1-ON-1 COMMUNICATION',
      title: 'WhatsApp Business Direct',
      handle: '+92 327 0831470',
      desc: 'Instant direct chat with Waseem Abbas for project briefs, urgent scopes, quotes, and 1-on-1 voice consultations.',
      url: 'https://wa.me/923270831470',
      btnText: 'START WHATSAPP CHAT'
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // 1. REVOLVING 3D SERVICES ORBIT WHEEL
    // -------------------------------------------------------------------------
    initOrbitWheel({
      containerId: 'orbitWheelContainer',
      nodeSelector: '.orbit-node',
      pillsSelector: '.orbit-pill',
      detailCardId: 'orbitDetailCard',
      detailCategoryId: 'orbitDetailCategory',
      detailHeadingId: 'orbitDetailHeading',
      detailDescId: 'orbitDetailDesc',
      detailLinkId: 'orbitDetailLink',
      dataSource: serviceData,
      isExternalLink: false,
      speed: 0.28,
      getRadius: () => {
        const w = window.innerWidth;
        if (w <= 380) return 86;
        if (w <= 480) return 98;
        if (w <= 768) return 120;
        return 210;
      }
    });

    // -------------------------------------------------------------------------
    // 2. REVOLVING 3D SOCIAL MEDIA ORBIT WHEEL
    // -------------------------------------------------------------------------
    initOrbitWheel({
      containerId: 'socialWheelContainer',
      nodeSelector: '.social-node',
      pillsSelector: '.social-pill',
      detailCardId: 'socialDetailCard',
      detailCategoryId: 'socialDetailCategory',
      detailHeadingId: 'socialDetailHeading',
      detailDescId: 'socialDetailDesc',
      detailLinkId: 'socialDetailLink',
      dataSource: socialData,
      isExternalLink: true,
      speed: 0.24,
      getRadius: () => {
        const w = window.innerWidth;
        if (w <= 380) return 90;
        if (w <= 480) return 102;
        if (w <= 768) return 125;
        return 215;
      }
    });

    /**
     * Generic 3D Orbit Wheel Engine with continuous 360° circular revolution
     */
    function initOrbitWheel(config) {
      const container = document.getElementById(config.containerId);
      const nodes = document.querySelectorAll(config.nodeSelector);
      const pills = document.querySelectorAll(config.pillsSelector);
      const detailCard = document.getElementById(config.detailCardId);
      const detailCategory = document.getElementById(config.detailCategoryId);
      const detailHeading = document.getElementById(config.detailHeadingId);
      const detailDesc = document.getElementById(config.detailDescId);
      const detailLink = document.getElementById(config.detailLinkId);

      if (!container || nodes.length === 0) return;

      let currentAngle = 0;
      let isDragging = false;
      let isPaused = false;
      let pauseTimeout = null;
      let startX = 0;
      let startY = 0;
      const totalNodes = nodes.length;

      // Position nodes in a true 360 degree circle around the central core
      function positionNodes(angleOffset = 0) {
        const radius = config.getRadius();

        nodes.forEach((node, index) => {
          const angle = ((index / totalNodes) * 360 + angleOffset) * (Math.PI / 180);
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          // Z-depth calculation (simulates 3D space: nodes come in front and go behind)
          const zDepth = Math.sin(angle) * 40;
          const isFront = Math.sin(angle) >= 0;

          // Layering: front nodes have higher z-index, larger scale; back nodes pass behind the core
          const zIndex = isFront ? (node.classList.contains('active') ? 30 : 22) : 6;
          const scale = isFront ? (node.classList.contains('active') ? 1.12 : 1.0) : 0.88;
          const opacity = isFront ? 1 : 0.72;

          node.style.zIndex = zIndex;
          node.style.opacity = opacity;
          node.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) translateZ(${zDepth}px) scale(${scale})`;
        });
      }

      // Continuous 360° Animation Loop
      function animateOrbit() {
        if (!isDragging && !isPaused) {
          currentAngle = (currentAngle + config.speed) % 360;
          positionNodes(currentAngle);
        }
        requestAnimationFrame(animateOrbit);
      }

      // Temporary pause on interaction to let user inspect
      function temporaryPause(duration = 2600) {
        isPaused = true;
        clearTimeout(pauseTimeout);
        pauseTimeout = setTimeout(() => {
          isPaused = false;
        }, duration);
      }

      // Drag Interaction: Desktop Mouse
      container.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
      });

      window.addEventListener('mouseup', () => {
        if (isDragging) {
          isDragging = false;
          temporaryPause(1500);
        }
      });

      window.addEventListener('mousemove', (e) => {
        if (isDragging) {
          const deltaX = e.clientX - startX;
          startX = e.clientX;
          currentAngle += deltaX * 0.45;
          positionNodes(currentAngle);
        }
      });

      // Safe Touch Dragging: Mobile Devices (doesn't block vertical scrolling)
      container.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches.length > 0) {
          isDragging = true;
          startX = e.touches[0].clientX;
          startY = e.touches[0].clientY;
        }
      }, { passive: true });

      window.addEventListener('touchend', () => {
        if (isDragging) {
          isDragging = false;
          temporaryPause(1500);
        }
      });

      window.addEventListener('touchmove', (e) => {
        if (isDragging && e.touches && e.touches.length > 0) {
          const deltaX = e.touches[0].clientX - startX;
          const deltaY = e.touches[0].clientY - startY;

          // Only rotate if horizontal swipe is intentional
          if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 5) {
            startX = e.touches[0].clientX;
            currentAngle += deltaX * 0.4;
            positionNodes(currentAngle);
          }
        }
      }, { passive: true });

      // Window resize re-centering
      window.addEventListener('resize', () => {
        positionNodes(currentAngle);
      });

      // Node Clicks and Navigation
      nodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
          temporaryPause(3000);
        });

        node.addEventListener('click', (e) => {
          const key = node.getAttribute('data-service') || node.getAttribute('data-channel');
          const data = config.dataSource[key];

          // If already active, open the target link
          if (node.classList.contains('active')) {
            if (config.isExternalLink && data && data.url) {
              e.preventDefault();
              window.open(data.url, '_blank', 'noopener,noreferrer');
              return;
            }
            if (!config.isExternalLink && node.getAttribute('href')) {
              return; // Normal link navigation to subpage
            }
          }

          e.preventDefault();
          e.stopPropagation();

          nodes.forEach(n => n.classList.remove('active'));
          node.classList.add('active');

          // Smoothly rotate the wheel to bring clicked node directly to the front (bottom center)
          const nodeIndex = Array.from(nodes).indexOf(node);
          if (nodeIndex !== -1) {
            currentAngle = (360 - (nodeIndex * (360 / totalNodes)) + 90) % 360;
            positionNodes(currentAngle);
          }

          temporaryPause(3500);
          updateDetailCard(key);
        });
      });

      // Quick Selector Pills
      pills.forEach(pill => {
        pill.addEventListener('click', (e) => {
          e.preventDefault();
          const key = pill.getAttribute('data-service') || pill.getAttribute('data-channel');

          pills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');

          nodes.forEach(n => {
            const nodeKey = n.getAttribute('data-service') || n.getAttribute('data-channel');
            if (nodeKey === key) {
              n.classList.add('active');
            } else {
              n.classList.remove('active');
            }
          });

          const nodeIndex = Array.from(nodes).findIndex(n => {
            return (n.getAttribute('data-service') || n.getAttribute('data-channel')) === key;
          });

          if (nodeIndex !== -1) {
            currentAngle = (360 - (nodeIndex * (360 / totalNodes)) + 90) % 360;
            positionNodes(currentAngle);
          }

          temporaryPause(3500);
          updateDetailCard(key);
        });
      });

      // Update Detail Information Card
      function updateDetailCard(key) {
        const data = config.dataSource[key];
        if (!data) return;

        if (detailCard) {
          detailCard.style.opacity = '0';
          detailCard.style.transform = 'translateY(10px)';

          setTimeout(() => {
            if (detailCategory) detailCategory.textContent = data.category;
            if (detailHeading) detailHeading.textContent = data.title;
            if (detailDesc) detailDesc.textContent = data.desc;

            if (detailLink && data.url) {
              detailLink.href = data.url;
              if (config.isExternalLink) {
                detailLink.target = '_blank';
                detailLink.rel = 'noopener noreferrer';
                const span = detailLink.querySelector('span:first-child');
                if (span && data.btnText) span.textContent = data.btnText;
              }
            }

            // Sync Pills
            const activePill = document.querySelector(`[data-service="${key}"], [data-channel="${key}"]`);
            if (activePill && activePill.classList.contains(config.pillsSelector.replace('.', ''))) {
              pills.forEach(p => p.classList.remove('active'));
              activePill.classList.add('active');
            }

            detailCard.style.opacity = '1';
            detailCard.style.transform = 'translateY(0)';
          }, 150);
        }
      }

      // Initialize
      positionNodes(currentAngle);
      animateOrbit();
    }
  });
})();
