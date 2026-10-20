/**
 * WASEEM ABBAS — INTERACTIVE 3D SERVICE ORBIT WHEEL
 * File: js/orbit-wheel.js
 * Renders floating service nodes in 3D orbit around Waseem Abbas agency core.
 */

(function () {
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

  document.addEventListener('DOMContentLoaded', () => {
    const orbitContainer = document.getElementById('orbitWheelContainer');
    const nodes = document.querySelectorAll('.orbit-node');
    const detailCard = document.getElementById('orbitDetailCard');
    const detailCategory = document.getElementById('orbitDetailCategory');
    const detailHeading = document.getElementById('orbitDetailHeading');
    const detailDesc = document.getElementById('orbitDetailDesc');

    if (!orbitContainer || nodes.length === 0) return;

    let currentAngle = 0;
    let isHovered = false;
    let isDragging = false;
    let startX = 0;
    let autoRotateSpeed = 0.22; // smooth degrees per frame

    function getRadius() {
      const w = window.innerWidth;
      if (w <= 380) return 86;
      if (w <= 480) return 98;
      if (w <= 768) return 120;
      return 210;
    }

    // Position the 4 nodes evenly on the circle
    function positionNodes(angleOffset = 0) {
      const radius = getRadius();
      const totalNodes = nodes.length;

      nodes.forEach((node, index) => {
        const angle = ((index / totalNodes) * 360 + angleOffset) * (Math.PI / 180);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const z = Math.sin(angle) * 30; // subtle 3D depth

        node.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) translateZ(${z}px)`;
      });
    }

    window.addEventListener('resize', () => {
      positionNodes(currentAngle);
    });

    // Animation Loop
    function animateOrbit() {
      if (!isHovered && !isDragging) {
        currentAngle = (currentAngle + autoRotateSpeed) % 360;
        positionNodes(currentAngle);
      }
      requestAnimationFrame(animateOrbit);
    }

    // Interactive Drag to Spin
    orbitContainer.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const deltaX = e.clientX - startX;
        startX = e.clientX;
        currentAngle += deltaX * 0.45;
        positionNodes(currentAngle);
      }
    });

    // Touch Support for Mobile (Safe Touch Scrolling)
    let startY = 0;
    orbitContainer.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches.length > 0) {
        isDragging = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches && e.touches.length > 0) {
        const deltaX = e.touches[0].clientX - startX;
        const deltaY = e.touches[0].clientY - startY;
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 6) {
          startX = e.touches[0].clientX;
          currentAngle += deltaX * 0.4;
          positionNodes(currentAngle);
        }
      }
    }, { passive: true });

    // Quick Mobile Selector Pills Connection
    const orbitPills = document.querySelectorAll('.orbit-pill');
    orbitPills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        const key = pill.getAttribute('data-service');
        orbitPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        nodes.forEach(n => {
          if (n.getAttribute('data-service') === key) {
            n.classList.add('active');
          } else {
            n.classList.remove('active');
          }
        });

        const nodeIndex = Array.from(nodes).findIndex(n => n.getAttribute('data-service') === key);
        if (nodeIndex !== -1) {
          currentAngle = (360 - (nodeIndex * (360 / nodes.length)) + 90) % 360;
          positionNodes(currentAngle);
        }

        updateDetailCard(key);
      });
    });

    // Node Interaction
    nodes.forEach(node => {
      node.addEventListener('mouseenter', () => {
        isHovered = true;
        nodes.forEach(n => n.classList.remove('active'));
        node.classList.add('active');

        const key = node.getAttribute('data-service');
        updateDetailCard(key);
      });

      node.addEventListener('mouseleave', () => {
        isHovered = false;
      });

      node.addEventListener('click', (e) => {
        const targetUrl = node.getAttribute('href');
        if (node.classList.contains('active') && targetUrl) {
          // Navigates directly if already active
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        nodes.forEach(n => n.classList.remove('active'));
        node.classList.add('active');
        const key = node.getAttribute('data-service');
        updateDetailCard(key);
      });
    });

    function updateDetailCard(key) {
      const data = serviceData[key];
      if (!data) return;

      if (detailCard) {
        detailCard.style.opacity = '0';
        detailCard.style.transform = 'translateY(10px)';

        setTimeout(() => {
          if (detailCategory) detailCategory.textContent = data.category;
          if (detailHeading) detailHeading.textContent = data.title;
          if (detailDesc) detailDesc.textContent = data.desc;

          const detailLink = document.getElementById('orbitDetailLink');
          if (detailLink && data.url) {
            detailLink.href = data.url;
          }

          const activePill = document.querySelector(`.orbit-pill[data-service="${key}"]`);
          if (activePill) {
            document.querySelectorAll('.orbit-pill').forEach(p => p.classList.remove('active'));
            activePill.classList.add('active');
          }

          detailCard.style.opacity = '1';
          detailCard.style.transform = 'translateY(0)';
        }, 150);
      }
    }

    // Initialize layout & loop
    positionNodes(currentAngle);
    animateOrbit();
  });
})();
