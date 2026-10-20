/**
 * WASEEM ABBAS — INTERACTIVE TALKING AI AVATAR
 * Holographic Virtual Assistant with Web Speech Synthesis, Audio Visualizer & Video Host
 */

(function initTalkingAIAvatar() {
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Create and inject the floating AI avatar widget into the document
    const avatarContainer = document.createElement('div');
    avatarContainer.id = 'talkingAiAvatarContainer';
    avatarContainer.innerHTML = `
      <!-- Floating AI Avatar Pill (Always Visible in Corner) -->
      <div class="ai-avatar-trigger" id="aiAvatarTrigger" title="Open AI Waseem Abbas Assistant" aria-label="Open AI Waseem Abbas Assistant">
        <div class="ai-avatar-thumb">
          <img src="assets/waseem_portrait.jpg" alt="Waseem Abbas AI Avatar" class="ai-thumb-img">
          <span class="ai-pulse-ring"></span>
        </div>
        <div class="ai-avatar-info">
          <div class="ai-avatar-name">
            <span class="ai-sparkle">✦</span> AI WASEEM
            <span class="ai-live-indicator"></span>
          </div>
          <div class="ai-avatar-status">Talk with Virtual Host</div>
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
              <span class="ai-holo-tag">HOLOGRAPHIC AI PERSONA v2.6</span>
              <h3 class="ai-card-title">WASEEM ABBAS • AI AVATAR</h3>
            </div>
            <div class="ai-header-actions">
              <button class="ai-action-btn" id="btnAiMuteToggle" title="Mute/Unmute Speech">
                <i class="fa-solid fa-volume-high" id="aiVolumeIcon"></i>
              </button>
              <button class="ai-close-btn" id="btnCloseAiAssistant" aria-label="Close Assistant">✕</button>
            </div>
          </div>

          <!-- Video & Holographic Display Stage -->
          <div class="ai-video-stage">
            <div class="ai-video-hud-ring"></div>
            <div class="ai-scanner-line"></div>
            
            <video id="aiVideoPlayer" class="ai-video-player" playsinline muted loop poster="assets/waseem_portrait.jpg">
              <source src="assets/waseem_profile.mp4" type="video/mp4">
            </video>

            <div class="ai-video-overlay-glow"></div>
            
            <!-- Live Audio Visualizer Bars -->
            <div class="ai-audio-visualizer" id="aiAudioVisualizer">
              <span class="viz-bar"></span><span class="viz-bar"></span>
              <span class="viz-bar"></span><span class="viz-bar"></span>
              <span class="viz-bar"></span><span class="viz-bar"></span>
              <span class="viz-bar"></span><span class="viz-bar"></span>
              <span class="viz-bar"></span><span class="viz-bar"></span>
            </div>

            <!-- Role Badge -->
            <div class="ai-badge-row">
              <span class="ai-role-pill"><i class="fa-solid fa-code"></i> Developer</span>
              <span class="ai-role-pill"><i class="fa-solid fa-chart-line"></i> Digital Marketer</span>
            </div>
          </div>

          <!-- AI Dialogue Transcript & Interactive Engine -->
          <div class="ai-dialogue-area">
            <div class="ai-speech-bubble" id="aiSpeechBubble">
              <p id="aiSpeechText">
                "Hello! I am Waseem Abbas's interactive AI Persona. As a hybrid Full-Stack Developer and Digital Marketer, I engineer high-speed web apps and aggressive growth funnels. Click any question below to hear me speak!"
              </p>
              <span class="ai-speaking-flag" id="aiSpeakingFlag"><i class="fa-solid fa-waveform-lines"></i> Speaking...</span>
            </div>

            <!-- Quick Interactive Question Chips -->
            <div class="ai-prompt-chips">
              <button class="ai-chip" data-query="intro">
                🎙️ Welcome Note & Story
              </button>
              <button class="ai-chip" data-query="marketing">
                📈 Digital Marketing & ROAS
              </button>
              <button class="ai-chip" data-query="developer">
                💻 Full-Stack Dev Capabilities
              </button>
              <button class="ai-chip" data-query="pricing">
                💼 How We Can Collaborate
              </button>
              <a href="contact.html" class="ai-chip ai-chip-gold">
                🚀 Book 1-on-1 Consultation
              </a>
            </div>
          </div>

        </div>
      </div>
    `;

    document.body.appendChild(avatarContainer);

    // =========================================================================
    // 2. Elements & State
    // =========================================================================
    const trigger = document.getElementById('aiAvatarTrigger');
    const modal = document.getElementById('aiAssistantModal');
    const backdrop = document.getElementById('aiAssistantBackdrop');
    const closeBtn = document.getElementById('btnCloseAiAssistant');
    const video = document.getElementById('aiVideoPlayer');
    const speechText = document.getElementById('aiSpeechText');
    const speakingFlag = document.getElementById('aiSpeakingFlag');
    const btnMute = document.getElementById('btnAiMuteToggle');
    const volumeIcon = document.getElementById('aiVolumeIcon');
    const visualizer = document.getElementById('aiAudioVisualizer');
    const thumbWaves = document.getElementById('aiThumbWaves');
    const chips = document.querySelectorAll('.ai-chip[data-query]');

    let isMuted = false;
    let currentUtterance = null;

    // Responses library
    const responses = {
      'intro': {
        text: "Hi there! I am Waseem Abbas. I specialize in bridging the gap between high-level web software development and aggressive performance digital marketing. I build lightning-fast web experiences that turn traffic into high-converting revenue.",
        voice: "Hi there! I am Waseem Abbas. I specialize in bridging the gap between high level web development and aggressive performance digital marketing. I build lightning-fast web experiences that turn traffic into high converting revenue."
      },
      'marketing': {
        text: "In Digital Marketing, I architect high-ROAS acquisition systems across Meta Ads, Google Ads (Search, YouTube & Performance Max), technical SEO, and conversion rate optimization (CRO). My client campaigns have scaled to a 4.8x average ROAS.",
        voice: "In Digital Marketing, I architect high-ROAS acquisition systems across Meta Ads, Google Ads, technical SEO, and conversion rate optimization. My client campaigns have scaled to a four point eight X average return on ad spend."
      },
      'developer': {
        text: "On the engineering side, I build robust, responsive web applications using React, Next.js, Node.js, Three.js WebGL, Tailwind, and serverless cloud architectures. I ensure sub-second Core Web Vitals and top-tier user experiences.",
        voice: "On the engineering side, I build robust web applications using React, Next.js, Node.js, Three.js WebGL, and serverless cloud architectures. I ensure sub-second Core Web Vitals and top tier user experiences."
      },
      'pricing': {
        text: "Whether you need a full-scale digital marketing growth engine, a modern SaaS web application, an e-commerce platform overhaul, or end-to-end technical consulting, I am ready to partner with you. Let's schedule a strategy session!",
        voice: "Whether you need a full-scale digital marketing growth engine, a modern web application, an e-commerce platform overhaul, or technical consulting, I am ready to partner with you. Let's schedule a strategy session!"
      }
    };

    // =========================================================================
    // 3. Speech Synthesis Engine (TTS)
    // =========================================================================
    function speakText(text) {
      if (!('speechSynthesis' in window)) return;

      window.speechSynthesis.cancel();

      if (isMuted) {
        if (speakingFlag) speakingFlag.classList.remove('active');
        if (visualizer) visualizer.classList.remove('active');
        if (thumbWaves) thumbWaves.classList.remove('active');
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      currentUtterance = utterance;

      // Select natural sounding voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('David') || v.name.includes('Guy')));
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        if (speakingFlag) speakingFlag.classList.add('active');
        if (visualizer) visualizer.classList.add('active');
        if (thumbWaves) thumbWaves.classList.add('active');
        if (video) {
          video.play().catch(() => {});
        }
      };

      utterance.onend = () => {
        if (speakingFlag) speakingFlag.classList.remove('active');
        if (visualizer) visualizer.classList.remove('active');
        if (thumbWaves) thumbWaves.classList.remove('active');
      };

      utterance.onerror = () => {
        if (speakingFlag) speakingFlag.classList.remove('active');
        if (visualizer) visualizer.classList.remove('active');
        if (thumbWaves) thumbWaves.classList.remove('active');
      };

      window.speechSynthesis.speak(utterance);
    }

    // =========================================================================
    // 4. Modal Open/Close Controls
    // =========================================================================
    function openAssistant() {
      if (!modal) return;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      if (video) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }

      // Automatically speak greeting after a brief pause
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

      if (video) {
        video.pause();
      }

      if (speakingFlag) speakingFlag.classList.remove('active');
      if (visualizer) visualizer.classList.remove('active');
      if (thumbWaves) thumbWaves.classList.remove('active');
    }

    if (trigger) trigger.addEventListener('click', openAssistant);
    if (closeBtn) closeBtn.addEventListener('click', closeAssistant);
    if (backdrop) backdrop.addEventListener('click', closeAssistant);

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
        closeAssistant();
      }
    });

    // Mute/Unmute toggle
    if (btnMute) {
      btnMute.addEventListener('click', () => {
        isMuted = !isMuted;
        if (isMuted) {
          volumeIcon.className = 'fa-solid fa-volume-xmark';
          if (window.speechSynthesis) window.speechSynthesis.cancel();
          if (speakingFlag) speakingFlag.classList.remove('active');
          if (visualizer) visualizer.classList.remove('active');
          if (thumbWaves) thumbWaves.classList.remove('active');
        } else {
          volumeIcon.className = 'fa-solid fa-volume-high';
          const currentText = speechText ? speechText.textContent.replace(/"/g, '') : responses['intro'].voice;
          speakText(currentText);
        }
      });
    }

    // Interactive query chips
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const queryKey = chip.getAttribute('data-query');
        const item = responses[queryKey];
        if (item) {
          // Highlight active chip
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

    console.log('🤖 Waseem Abbas Talking AI Avatar initialized.');
  });
})();
