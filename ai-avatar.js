/**
 * WASEEM ABBAS — INTERACTIVE TALKING AI AVATAR
 * Stylized Holographic Virtual Host with Speech Synthesis, Mouth Lip-Sync & Interactive Intelligence
 */

(function initTalkingAIAvatar() {
  document.addEventListener('DOMContentLoaded', () => {

    // 1. Inject the floating AI avatar widget into the document
    const avatarContainer = document.createElement('div');
    avatarContainer.id = 'talkingAiAvatarContainer';
    avatarContainer.innerHTML = `
      <!-- Floating AI Avatar Pill (Always Accessible in Corner) -->
      <div class="ai-avatar-trigger" id="aiAvatarTrigger" title="Talk to AI Waseem Abbas" aria-label="Open AI Waseem Abbas Assistant">
        <div class="ai-avatar-thumb">
          <img src="assets/waseem_portrait.jpg" alt="Waseem Abbas AI Avatar" class="ai-thumb-img">
          <span class="ai-pulse-ring"></span>
          <span class="ai-speech-wave-pip" id="aiThumbPip"></span>
        </div>
        <div class="ai-avatar-info">
          <div class="ai-avatar-name">
            <span class="ai-sparkle">✦</span> AI WASEEM
            <span class="ai-live-indicator"></span>
          </div>
          <div class="ai-avatar-status" id="aiTriggerStatus">Virtual Host • Click to Talk</div>
        </div>
        <div class="ai-sound-waves" id="aiThumbWaves">
          <span class="wave-bar"></span>
          <span class="wave-bar"></span>
          <span class="wave-bar"></span>
          <span class="wave-bar"></span>
        </div>
      </div>

      <!-- Holographic AI Assistant Drawer / Modal -->
      <div class="ai-assistant-modal" id="aiAssistantModal" aria-hidden="true">
        <div class="ai-assistant-backdrop" id="aiAssistantBackdrop"></div>
        <div class="ai-assistant-card">
          
          <!-- Card Header -->
          <div class="ai-card-header">
            <div class="ai-header-left">
              <span class="ai-holo-tag">NEURAL AI PERSONA • v3.0</span>
              <h3 class="ai-card-title">WASEEM ABBAS • TALKING AI AVATAR</h3>
            </div>
            <div class="ai-header-actions">
              <button class="ai-action-btn" id="btnAiMuteToggle" title="Mute/Unmute Voice">
                <i class="fa-solid fa-volume-high" id="aiVolumeIcon"></i>
              </button>
              <button class="ai-close-btn" id="btnCloseAiAssistant" aria-label="Close Assistant">✕</button>
            </div>
          </div>

          <!-- Stylized AI Avatar Hologram Stage (Lip-Syncing Talking Avatar) -->
          <div class="ai-avatar-stage">
            <div class="ai-hologram-ambient"></div>
            <div class="ai-hud-orbit-ring ring-outer"></div>
            <div class="ai-hud-orbit-ring ring-inner"></div>
            <div class="ai-scanner-beam"></div>

            <!-- Stylized Avatar Face Portal with Interactive Mouth Lip-Sync -->
            <div class="ai-avatar-portrait-wrap" id="aiAvatarPortraitWrap">
              <img src="assets/waseem_portrait.jpg" alt="Waseem Abbas Avatar" class="ai-avatar-base-img" id="aiAvatarImg">
              
              <!-- Dynamic Lip-Sync Mouth Overlay (Animates when AI speaks) -->
              <div class="ai-mouth-sync-layer" id="aiMouthLayer">
                <div class="ai-mouth-contour"></div>
              </div>

              <!-- Cybernetic Holographic HUD Elements -->
              <div class="ai-hud-corner corner-tl"></div>
              <div class="ai-hud-corner corner-tr"></div>
              <div class="ai-hud-corner corner-bl"></div>
              <div class="ai-hud-corner corner-br"></div>
            </div>

            <!-- Real Video Switcher Pill -->
            <button class="ai-mode-switch-btn" id="btnToggleVideoReel">
              <i class="fa-solid fa-video"></i> <span id="videoBtnLabel">Switch to 4K Live Studio Reel</span>
            </button>

            <!-- Embedded Live Video (Hidden by default, toggled on demand) -->
            <video id="aiVideoPlayer" class="ai-embedded-video" playsinline loop muted poster="assets/waseem_portrait.jpg">
              <source src="assets/waseem_profile.mp4" type="video/mp4">
            </video>

            <!-- Real-Time Audio Frequency Spectrum Bars -->
            <div class="ai-audio-visualizer" id="aiAudioVisualizer">
              <span class="viz-bar"></span><span class="viz-bar"></span>
              <span class="viz-bar"></span><span class="viz-bar"></span>
              <span class="viz-bar"></span><span class="viz-bar"></span>
              <span class="viz-bar"></span><span class="viz-bar"></span>
              <span class="viz-bar"></span><span class="viz-bar"></span>
              <span class="viz-bar"></span><span class="viz-bar"></span>
            </div>

            <!-- Role Pills -->
            <div class="ai-badge-row">
              <span class="ai-role-pill"><i class="fa-solid fa-code"></i> Developer</span>
              <span class="ai-role-pill"><i class="fa-solid fa-chart-line"></i> Digital Marketer</span>
            </div>
          </div>

          <!-- AI Dialogue Transcript & Interactive Chat Engine -->
          <div class="ai-dialogue-area">
            <div class="ai-speech-bubble" id="aiSpeechBubble">
              <p id="aiSpeechText">
                "Assalam-o-Alaikum! I am Waseem Abbas's interactive AI Avatar. As a hybrid Full-Stack Developer and Performance Digital Marketer, I build high-speed web apps and aggressive growth funnels that scale revenue. Click any topic below to hear me speak!"
              </p>
              <div class="ai-speaking-flag" id="aiSpeakingFlag">
                <span class="speaking-dot"></span>
                <span>AI WASEEM IS SPEAKING NOW...</span>
              </div>
            </div>

            <!-- Quick Interactive Voice Topics -->
            <div class="ai-prompt-chips">
              <button class="ai-chip active" data-query="intro">
                🎙️ Welcome Note & Vision
              </button>
              <button class="ai-chip" data-query="marketing">
                📈 Digital Marketing & ROAS
              </button>
              <button class="ai-chip" data-query="developer">
                💻 Full-Stack Dev Capabilities
              </button>
              <button class="ai-chip" data-query="collaboration">
                💼 How We Can Collaborate
              </button>
              <a href="contact.html" class="ai-chip ai-chip-gold">
                🚀 Schedule Strategy Call
              </a>
            </div>
          </div>

        </div>
      </div>
    `;

    document.body.appendChild(avatarContainer);

    // =========================================================================
    // 2. Elements & Interactive State
    // =========================================================================
    const trigger = document.getElementById('aiAvatarTrigger');
    const modal = document.getElementById('aiAssistantModal');
    const backdrop = document.getElementById('aiAssistantBackdrop');
    const closeBtn = document.getElementById('btnCloseAiAssistant');
    const video = document.getElementById('aiVideoPlayer');
    const btnToggleVideoReel = document.getElementById('btnToggleVideoReel');
    const videoBtnLabel = document.getElementById('videoBtnLabel');
    const speechText = document.getElementById('aiSpeechText');
    const speakingFlag = document.getElementById('aiSpeakingFlag');
    const btnMute = document.getElementById('btnAiMuteToggle');
    const volumeIcon = document.getElementById('aiVolumeIcon');
    const visualizer = document.getElementById('aiAudioVisualizer');
    const thumbWaves = document.getElementById('aiThumbWaves');
    const mouthLayer = document.getElementById('aiMouthLayer');
    const avatarPortraitWrap = document.getElementById('aiAvatarPortraitWrap');
    const chips = document.querySelectorAll('.ai-chip[data-query]');

    let isMuted = false;
    let isVideoMode = false;
    let mouthInterval = null;

    // Rich Voice Responses
    const responses = {
      'intro': {
        text: "Assalam-o-Alaikum! I am Waseem Abbas. I specialize in bridging the gap between high-level web engineering and aggressive performance digital marketing. I don't just build lightning-fast web applications—I architect the search authority and high-ROAS funnels that convert visitors into recurring clients.",
        voice: "Assalam-o-Alaikum! I am Waseem Abbas. I specialize in bridging the gap between high level web engineering and aggressive performance digital marketing. I build lightning-fast web applications and architect the search authority and high return on ad spend funnels that scale your business."
      },
      'marketing': {
        text: "In Digital Marketing, I architect high-ROAS acquisition campaigns across Meta Ads (Facebook & Instagram), Google Search & Performance Max, and TikTok. Paired with server-side tracking, conversion copywriting, and CRO, my client campaigns consistently achieve a 4.8x average ROAS.",
        voice: "In Digital Marketing, I architect high return on ad spend campaigns across Meta Ads, Google Search, Performance Max, and TikTok. Paired with server-side tracking and conversion rate optimization, my client campaigns consistently achieve a 4.8X average return on ad spend."
      },
      'developer': {
        text: "On the software engineering side, I build modern web applications using React, Next.js, Node.js, Three.js WebGL, Tailwind, and serverless cloud architectures. Every site I ship achieves sub-second Core Web Vitals and top-tier user experience.",
        voice: "On the software engineering side, I build modern web applications using React, Next.js, Node.js, Three.js WebGL, and serverless cloud architectures. Every site I ship achieves sub-second Core Web Vitals and top tier user experience."
      },
      'collaboration': {
        text: "Whether you need a complete digital marketing growth engine, a high-converting custom web app, an e-commerce overhaul, or an ongoing technical consultation partner, I am ready to collaborate with you. Let's schedule a strategy session today!",
        voice: "Whether you need a complete digital marketing growth engine, a high-converting web app, an e-commerce overhaul, or technical consultation, I am ready to collaborate with you. Let's schedule a strategy session today!"
      }
    };

    // =========================================================================
    // 3. Mouth Lip-Sync & Face Animation
    // =========================================================================
    function startLipSync() {
      if (mouthLayer) mouthLayer.classList.add('talking');
      if (avatarPortraitWrap) avatarPortraitWrap.classList.add('talking');
      if (speakingFlag) speakingFlag.classList.add('active');
      if (visualizer) visualizer.classList.add('active');
      if (thumbWaves) thumbWaves.classList.add('active');

      if (mouthInterval) clearInterval(mouthInterval);
      mouthInterval = setInterval(() => {
        if (mouthLayer) {
          // Dynamic scale for speech cadence
          const scaleY = 0.5 + Math.random() * 0.9;
          const scaleX = 0.9 + Math.random() * 0.3;
          mouthLayer.style.transform = `scale(${scaleX}, ${scaleY})`;
        }
      }, 100);
    }

    function stopLipSync() {
      if (mouthInterval) {
        clearInterval(mouthInterval);
        mouthInterval = null;
      }
      if (mouthLayer) {
        mouthLayer.classList.remove('talking');
        mouthLayer.style.transform = 'scale(1, 1)';
      }
      if (avatarPortraitWrap) avatarPortraitWrap.classList.remove('talking');
      if (speakingFlag) speakingFlag.classList.remove('active');
      if (visualizer) visualizer.classList.remove('active');
      if (thumbWaves) thumbWaves.classList.remove('active');
    }

    // =========================================================================
    // 4. Speech Synthesis Engine (TTS)
    // =========================================================================
    function speakText(text) {
      if (!('speechSynthesis' in window)) return;

      window.speechSynthesis.cancel();
      stopLipSync();

      if (isMuted) return;

      const utterance = new SpeechSynthesisUtterance(text);

      // Best natural voice selection
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('David') || v.name.includes('Guy')));
      if (preferred) {
        utterance.voice = preferred;
      }

      utterance.rate = 1.02;
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        startLipSync();
        if (isVideoMode && video) {
          video.play().catch(() => {});
        }
      };

      utterance.onend = () => {
        stopLipSync();
      };

      utterance.onerror = () => {
        stopLipSync();
      };

      window.speechSynthesis.speak(utterance);
    }

    // =========================================================================
    // 5. Video Reel vs Hologram Avatar Mode Switcher
    // =========================================================================
    if (btnToggleVideoReel && video && avatarPortraitWrap) {
      btnToggleVideoReel.addEventListener('click', () => {
        isVideoMode = !isVideoMode;
        if (isVideoMode) {
          video.classList.add('active');
          avatarPortraitWrap.style.display = 'none';
          videoBtnLabel.textContent = 'Switch to Stylized AI Avatar';
          video.play().catch(() => {});
        } else {
          video.classList.remove('active');
          avatarPortraitWrap.style.display = 'flex';
          videoBtnLabel.textContent = 'Switch to 4K Live Studio Reel';
          video.pause();
        }
      });
    }

    // =========================================================================
    // 6. Modal Controls
    // =========================================================================
    function openAssistant() {
      if (!modal) return;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      setTimeout(() => {
        const intro = responses['intro'];
        if (speechText) speechText.textContent = `"${intro.text}"`;
        speakText(intro.voice);
      }, 400);
    }

    function closeAssistant() {
      if (!modal) return;
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';

      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      stopLipSync();

      if (video) {
        video.pause();
      }
    }

    if (trigger) trigger.addEventListener('click', openAssistant);
    if (closeBtn) closeBtn.addEventListener('click', closeAssistant);
    if (backdrop) backdrop.addEventListener('click', closeAssistant);

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
        closeAssistant();
      }
    });

    // Mute/Unmute
    if (btnMute) {
      btnMute.addEventListener('click', () => {
        isMuted = !isMuted;
        if (isMuted) {
          volumeIcon.className = 'fa-solid fa-volume-xmark';
          if (window.speechSynthesis) window.speechSynthesis.cancel();
          stopLipSync();
        } else {
          volumeIcon.className = 'fa-solid fa-volume-high';
          const currentText = speechText ? speechText.textContent.replace(/"/g, '') : responses['intro'].voice;
          speakText(currentText);
        }
      });
    }

    // Question chips
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const queryKey = chip.getAttribute('data-query');
        const item = responses[queryKey];
        if (item) {
          chips.forEach(c => c.classList.remove('active'));
          chip.classList.add('active');

          if (speechText) {
            speechText.style.opacity = '0';
            setTimeout(() => {
              speechText.textContent = `"${item.text}"`;
              speechText.style.opacity = '1';
            }, 150);
          }
          speakText(item.voice);
        }
      });
    });

    console.log('🤖 Waseem Abbas Talking AI Avatar v3.0 Online');
  });
})();
