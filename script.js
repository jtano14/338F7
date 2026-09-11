/* ==========================================================================
   1. MOBILE MENU TOGGLE CONTROLLER
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (navToggle && navLinks) {
        navToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("is-open");
            navToggle.setAttribute("aria-expanded", isOpen);
            navToggle.classList.toggle("active");
        });

        const anchors = navLinks.querySelectorAll("a:not(.lang-switch)");
        anchors.forEach(anchor => {
            anchor.addEventListener("click", () => {
                navLinks.classList.remove("is-open");
                navToggle.setAttribute("aria-expanded", "false");
                navToggle.classList.remove("active");
            });
        });
    }
});

/* ==========================================================================
   2. OUR SERVICES EXPANSE SLIDE CONTROLLER
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const serviceCards = document.querySelectorAll("[data-service-card]");

    serviceCards.forEach(card => {
        const toggleBtn = card.querySelector("[data-service-toggle]");
        const detailsTray = card.querySelector("[data-service-details]");

        if (toggleBtn && detailsTray) {
            toggleBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
                
                toggleBtn.setAttribute("aria-expanded", !isExpanded);
                detailsTray.setAttribute("aria-hidden", isExpanded);
                card.classList.toggle("is-expanded", !isExpanded);
                
                if (!isExpanded) {
                    detailsTray.style.display = "block";
                    detailsTray.style.maxHeight = detailsTray.scrollHeight + "px";
                    detailsTray.style.opacity = "1";
                } else {
                    detailsTray.style.maxHeight = "0px";
                    detailsTray.style.opacity = "0";
                    setTimeout(() => { detailsTray.style.display = "none"; }, 300);
                }
            });
        }
    });
});

/* ==========================================================================
   3. OFFICE INFO DIALOG POPUP MODAL ARCHITECTURE
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const officeButtons = document.querySelectorAll("[data-office-dialog]");
    const closeButtons = document.querySelectorAll("[data-dialog-close]");

    officeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetId = btn.getAttribute("data-office-dialog");
            const targetDialog = document.getElementById(targetId);
            if (targetDialog) {
                targetDialog.showModal();
                document.body.style.overflow = "hidden";
            }
        });
    });

    closeButtons.forEach(closeBtn => {
        closeBtn.addEventListener("click", () => {
            const activeDialog = closeBtn.closest("dialog");
            if (activeDialog) {
                activeDialog.close();
                document.body.style.overflow = "";
            }
        });
    });

    const dialogs = document.querySelectorAll(".office-dialog");
    dialogs.forEach(dialog => {
        dialog.addEventListener("click", (e) => {
            const rect = dialog.getBoundingClientRect();
            const isInDialog = (
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom
            );
            if (!isInDialog) {
                dialog.close();
                document.body.style.overflow = "";
            }
        });
    });
});

/* ==========================================================================
   4. HERO MOUSE PARALLAX CONTROLLER SYSTEM
   ========================================================================== */
document.addEventListener("mousemove", (e) => {
    const bgImage = document.querySelector(".hero-background");
    const verticalText = document.querySelector(".hero-vertical-text");
    
    if (!bgImage || !verticalText) return;

    const moveX = (e.clientX - window.innerWidth / 2) / 40;
    const moveY = (e.clientY - window.innerHeight / 2) / 40;

    // Smoothly pushes background away from cursor while pulling Japanese text along with it
    bgImage.style.transform = `scale(1.1) translate(${-moveX}px, ${-moveY}px)`;
    verticalText.style.transform = `translate(${moveX}px, calc(-50% + ${moveY}px))`;
});

/* ==========================================================================
   5. INTERACTIVE LOGO CANVAS ANIMATION ENGINE (UPDATED SHARP EDGES)
   ========================================================================== */
const LOGO_URL = 'assets/images/your-logo-filename.png'; 
const canvas = document.getElementById('bubbleCanvas');
const ctx = canvas.getContext('2d');

// Expanded width and height boundaries to ensure bubble bursts are never clipped or trapped
const width = 750;
const height = 400;
canvas.width = width;
canvas.height = height;

const particles = [];
let mouse = { x: -1000, y: -1000 };
let isInteracting = false;

class FluidParticle {
  constructor(x, y) {
    this.targetX = x; 
    this.targetY = y;
    this.x = x; 
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    // Scaled sizes down slightly to ensure high precision point maps (removes rounded bunching)
    this.size = Math.random() * 1.1 + 0.8; 
    this.returnDelay = 0; 
    this.currentColor = 'rgba(11, 44, 102, 0.95)';
  }
  update(mouseX, mouseY) {
    const dx = this.x - mouseX;
    const dy = this.y - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Increased push radius to simulate strong burst activity
    const pushRadius = 38; 
    if (distance < pushRadius) {
      isInteracting = true;
      const angle = Math.atan2(dy, dx);
      const force = (pushRadius - distance) / pushRadius;
      const speed = force * (Math.random() * 24 + 12); 
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.returnDelay = Math.random() * 15 + 15; 
    }
    if (this.returnDelay > 0) {
      this.returnDelay--;
      this.vx *= 0.93; 
      this.vy *= 0.93;
    } else {
      const homeDx = this.targetX - this.x;
      const homeDy = this.targetY - this.y;
      this.vx += homeDx * 0.085; 
      this.vy += homeDy * 0.085;
      this.vx *= 0.72; 
      this.vy *= 0.72;
    }
    this.x += this.vx;
    this.y += this.vy;
  }
  draw() {
    ctx.fillStyle = this.currentColor; 
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function setupCanvasFromBlueprint() {
  const transparentLogoCanvas = document.createElement('canvas');
  transparentLogoCanvas.width = width;
  transparentLogoCanvas.height = height;
  const tCtx = transparentLogoCanvas.getContext('2d');
  tCtx.fillStyle = '#0b2c66';
  tCtx.beginPath();
  tCtx.moveTo(width / 2 - 140, height / 2 - 10);
  tCtx.quadraticCurveTo(width / 2, height / 2 - 70, width / 2 + 150, height / 2 - 80);
  tCtx.quadraticCurveTo(width / 2 + 60, height / 2 + 20, width / 2 - 40, height / 2 + 180);
  tCtx.quadraticCurveTo(width / 2 + 10, height / 2 + 30, width / 2 + 100, height / 2 - 40);
  tCtx.closePath();
  tCtx.fill();
  
  const imgData = tCtx.getImageData(0, 0, width, height).data;
  for (let y = 0; y < height; y += 1) { 
    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * 4;
      if (imgData[index + 3] > 30) { 
        particles.push(new FluidParticle(x, y));
      }
    }
  }
  animate();
}

function initLogoParticles() {
  const img = new Image();
  img.crossOrigin = "Anonymous"; 
  img.src = LOGO_URL;
  img.onload = function() {
    const maxDim = 380; 
    let imgW = img.width;
    let imgH = img.height;
    if (imgW > imgH) {
      imgH = (maxDim / imgW) * imgH;
      imgW = maxDim;
    } else {
      imgW = (maxDim / imgH) * imgW;
      imgH = maxDim;
    }
    const offsetX = (width - imgW) / 2;
    const offsetY = (height - imgH) / 2;
    
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = imgW;
    tempCanvas.height = imgH;
    tempCtx.drawImage(img, 0, 0, imgW, imgH);
    const imgData = tempCtx.getImageData(0, 0, imgW, imgH).data;
    
    // Scan steps adjusted to 1 to read every single pixel coordinate for absolute line crispness
    for (let y = 0; y < imgH; y += 1) {
      for (let x = 0; x < imgW; x += 1) {
        const index = (y * imgW + x) * 4;
        if (imgData[index + 3] > 50) { 
          particles.push(new FluidParticle(x + offsetX, y + offsetY));
        }
      }
    }
    animate();
  };
  img.onerror = function() {
    setupCanvasFromBlueprint();
  };
}

canvas.addEventListener('mouseleave', () => {
  mouse.x = -1000;  mouse.y = -1000;
  isInteracting = false;
});

canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  mouse.x = mouseX * (width / rect.width);
  mouse.y = mouseY * (height / rect.height);
  isInteracting = true;
});

function animate() {
  ctx.clearRect(0, 0, width, height); // Native frame clear to stop bounding box tracks
  particles.forEach(p => {
    p.update(mouse.x, mouse.y);
    p.draw();
  });
  requestAnimationFrame(animate);
}

/* ==========================================================================
   6. GLOBAL SUBSYSTEM INITIALIZATION (TIMELINES, LOADERS & CUSTOM CURSORS)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    initLogoParticles();

    // 1. Build and Inject Custom Cursor Structure Elements
    const cursorNode = document.createElement('div');
    cursorNode.className = 'custom-sys-cursor';
    cursorNode.innerHTML = `
        <div class="cursor-pointer-node"></div>
        <div class="cursor-pill-badge">You</div>
    `;
    document.body.appendChild(cursorNode);

    // Feed real-time window tracking positions to pointer Node
    window.addEventListener('mousemove', (e) => {
        cursorNode.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    });

    // Detect clickable components to trigger hover appearance shifts
    const interactables = document.querySelectorAll('a, button, [role="button"], .scroll-indicator-container, #bubbleCanvas');
    interactables.forEach(item => {
        item.addEventListener('mouseenter', () => cursorNode.classList.add('is-hovering'));
        item.addEventListener('mouseleave', () => cursorNode.classList.remove('is-hovering'));
    });

    // 2. Sequential Delay Loading Mechanics Engine
    const sequenceLayout = [
        { id: 'seq-1', delay: 200 },  // Brand Canvas
        { id: 'seq-2', delay: 500 },  // Secondary Subheading Tag
        { id: 'seq-3', delay: 750 },  // Main Constraints Header
        { id: 'seq-4', delay: 1050 }, // Descriptive Narrative Paragraph
        { id: 'seq-5', delay: 1300 }, // Interactive Control Buttons
        { id: 'seq-6', delay: 1500 }  // Floating Arrow indicator
    ];

    sequenceLayout.forEach(item => {
        const targetElement = document.getElementById(item.id);
        if (targetElement) {
            setTimeout(() => {
                targetElement.classList.add('is-visible');
            }, item.delay);
        }
    });

    // 3. Dynamic Section Scroll Background Fade Mechanics
    window.addEventListener('scroll', () => {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;
        
        const scrollPosition = window.scrollY;
        const fadeThreshold = 450; 
        const opacityRatio = Math.min(scrollPosition / fadeThreshold, 1);
        
        // Transitions background hue from the light CSS baseline to the Corporate Navy color
        heroSection.style.backgroundColor = `rgba(11, 34, 64, ${opacityRatio})`;
    });
});


