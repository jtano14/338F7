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

    const moveX = (e.clientX - window.innerWidth / 2) / 50; // Softened translation steps
    const moveY = (e.clientY - window.innerHeight / 2) / 50;

    bgImage.style.transform = `scale(1.1) translate(${-moveX}px, ${-moveY}px)`;
    verticalText.style.transform = `translate(${moveX}px, calc(-50% + ${moveY}px))`;
});

/* ==========================================================================
   5. INTERACTIVE LOGO CANVAS ANIMATION ENGINE (HIGH PERFORMANCE)
   ========================================================================== */
const LOGO_URL = 'assets/images/your-logo-filename.png'; 
const canvas = document.getElementById('bubbleCanvas');
const ctx = canvas.getContext('2d');

// Square boundaries configured exclusively for the arrow graphic symbol
const width = 450;
const height = 280;
canvas.width = width;
canvas.height = height;

const particles = [];
let mouse = { x: -1000, y: -1000 };

class FluidParticle {
  constructor(x, y) {
    this.targetX = x; 
    this.targetY = y;
    this.x = x; 
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.size = Math.random() * 1.2 + 0.9; // Optimal structural point sizing
    this.returnDelay = 0; 
    this.currentColor = 'rgba(11, 44, 102, 0.95)';
  }
  update(mouseX, mouseY) {
    const dx = this.x - mouseX;
    const dy = this.y - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    const pushRadius = 34; 
    if (distance < pushRadius) {
      const angle = Math.atan2(dy, dx);
      const force = (pushRadius - distance) / pushRadius;
      const speed = force * (Math.random() * 14 + 8); // Optimized velocity calculations
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.returnDelay = Math.random() * 10 + 10; 
    }
    if (this.returnDelay > 0) {
      this.returnDelay--;
      this.vx *= 0.92; 
      this.vy *= 0.92;
    } else {
      const homeDx = this.targetX - this.x;
      const homeDy = this.targetY - this.y;
      this.vx += homeDx * 0.09; 
      this.vy += homeDy * 0.09;
      this.vx *= 0.70; 
      this.vy *= 0.70;
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
  tCtx.moveTo(width / 2 - 100, height / 2 - 10);
  tCtx.quadraticCurveTo(width / 2, height / 2 - 60, width / 2 + 110, height / 2 - 70);
  tCtx.quadraticCurveTo(width / 2 + 50, height / 2 + 15, width / 2 - 30, height / 2 + 130);
  tCtx.quadraticCurveTo(width / 2 + 5, height / 2 + 20, width / 2 + 70, height / 2 - 25);
  tCtx.closePath();
  tCtx.fill();
  
  const imgData = tCtx.getImageData(0, 0, width, height).data;
  // Step configured to 2 for the fallback blueprint to ensure fast loading times
  for (let y = 0; y < height; y += 2) { 
    for (let x = 0; x < width; x += 2) {
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
    const maxDim = 240; // Focused dimensions purely targeting the top graphic asset symbol
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
    const offsetY = (height - imgH) / 2 - 20; // Pushed up slightly away from textual logo elements
    
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = imgW;
    tempCanvas.height = imgH;
    tempCtx.drawImage(img, 0, 0, imgW, imgH);
    const imgData = tempCtx.getImageData(0, 0, imgW, imgH).data;
    
    // Balanced step parsing rate (2) keeps particles highly crisp but lowers processor overhead drastically
    for (let y = 0; y < imgH; y += 2) {
      for (let x = 0; x < imgW; x += 2) {
        const index = (y * imgW + x) * 4;
        // Strict opacity filtering checks to isolate color vectors and skip branding letters
        if (imgData[index + 3] > 180 && imgData[index] < 100) { 
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
});

canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  mouse.x = mouseX * (width / rect.width);
  mouse.y = mouseY * (height / rect.height);
});

function animate() {
  ctx.clearRect(0, 0, width, height); 
  particles.forEach(p => {
    p.update(mouse.x, mouse.y);
    p.draw();
  });
  requestAnimationFrame(animate);
}

/* ==========================================================================
   6. GLOBAL SUBSYSTEM INITIALIZATION (TIMELINES & TRANSITIONS)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    initLogoParticles();

    // 1. Sequential Delay Loading Mechanics Engine
    const sequenceLayout = [
        { id: 'seq-1', delay: 150 },  // Brand Canvas Area
        { id: 'seq-2', delay: 350 },  // Secondary Subheading Tag
        { id: 'seq-3', delay: 550 },  // Main Constraints Header
        { id: 'seq-4', delay: 750 },  // Descriptive Narrative Paragraph
        { id: 'seq-5', delay: 950 },  // Interactive Control Buttons
        { id: 'seq-6', delay: 1100 }  // Floating Arrow indicator
    ];

    sequenceLayout.forEach(item => {
        const targetElement = document.getElementById(item.id);
        if (targetElement) {
            setTimeout(() => {
                targetElement.classList.add('is-visible');
            }, item.delay);
        }
    });

    // 2. Dynamic Section Scroll Background Fade Mechanics
    window.addEventListener('scroll', () => {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;
        
        const scrollPosition = window.scrollY;
        const fadeThreshold = 450; 
        const opacityRatio = Math.min(scrollPosition / fadeThreshold, 1);
        
        heroSection.style.backgroundColor = `rgba(11, 34, 64, ${opacityRatio})`;
    });
});



