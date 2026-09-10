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
            
            // Optional basic toggle look hook for the burger spans
            navToggle.classList.toggle("active");
        });

        // Close mobile menu gracefully when an anchor link is clicked
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
                e.stopPropagation(); // Stops event cascading conflicts
                
                const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
                
                // Toggle accessibility attributes and structural visual hook classes
                toggleBtn.setAttribute("aria-expanded", !isExpanded);
                detailsTray.setAttribute("aria-hidden", isExpanded);
                card.classList.toggle("is-expanded", !isExpanded);
                
                // Pure Javascript fallback inline dynamic sliding animation mechanics
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

    // Open target modal logic track
    officeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetId = btn.getAttribute("data-office-dialog");
            const targetDialog = document.getElementById(targetId);
            
            if (targetDialog) {
                targetDialog.showModal();
                document.body.style.overflow = "hidden"; // Absolute background document lock
            }
        });
    });

    // Close buttons array binder loop
    closeButtons.forEach(closeBtn => {
        closeBtn.addEventListener("click", () => {
            const activeDialog = closeBtn.closest("dialog");
            if (activeDialog) {
                activeDialog.close();
                document.body.style.overflow = ""; // Restores natural text scrolling layers
            }
        });
    });

    // Click Outside Backdrop Dismissal Hook
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
   4. HERO INTERACTIVE MOUSE PARALLAX CONTROLLER
   ========================================================================== */
document.addEventListener("mousemove", (e) => {
    const bgImage = document.querySelector(".hero-background");
    const verticalText = document.querySelector(".hero-vertical-text");
    
    if (!bgImage || !verticalText) return;

    // Calculate movement ratios based on viewport center
    const moveX = (e.clientX - window.innerWidth / 2) / 40;
    const moveY = (e.clientY - window.innerHeight / 2) / 40;

    // Background Image moves in OPPOSITE direction (-moveX, -moveY)
    bgImage.style.transform = `scale(1.1) translate(${-moveX}px, ${-moveY}px)`;

    // Japanese Text moves in SAME direction (keep the structural translate Y layout lock)
    verticalText.style.transform = `translate(${moveX}px, calc(-50% + ${moveY}px))`;
});

/* ==========================================================================
   5. INTERACTIVE LOGO CANVAS ANIMATION SYSTEM
   ========================================================================== */
const LOGO_URL = 'assets/images/your-logo-filename.png'; 
const canvas = document.getElementById('bubbleCanvas');
const ctx = canvas.getContext('2d');
const width = 600;
const height = 350;
canvas.width = width;
canvas.height = height;
const particles = [];
let mouse = { x: -1000, y: -1000 };
let isInteracting = false;
let allParticlesAtHome = true;
let transparentLogoCanvas = null; 
let starAngle = 0;

class FluidParticle {
  constructor(x, y) {
    this.targetX = x; 
    this.targetY = y;
    this.x = x; 
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.size = Math.random() * 1.5 + 1.0; 
    this.returnDelay = 0; 
    this.currentColor = 'rgba(11, 44, 102, 0.85)';
    this.isSilverMorpher = Math.random() > 0.95; 
    this.glitterSeed = Math.random() * 100;
  }
  update(mouseX, mouseY) {
    const dx = this.x - mouseX;
    const dy = this.y - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const pushRadius = 26; 
    if (distance < pushRadius) {
      isInteracting = true;
      const angle = Math.atan2(dy, dx);
      const force = (pushRadius - distance) / pushRadius;
      const speed = force * (Math.random() * 20 + 10); 
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.returnDelay = Math.random() * 20 + 20; 
      if (this.isSilverMorpher) {
        this.glitterSeed += 0.4;
        const brightness = Math.floor(Math.sin(this.glitterSeed) * 45) + 210;
        this.currentColor = `rgba(${brightness}, ${brightness + 2}, ${brightness + 5}, 0.95)`;
      }
    }
    if (this.returnDelay > 0) {
      this.returnDelay--;
      this.vx *= 0.95; 
      this.vy *= 0.95;
    } else {
      const homeDx = this.targetX - this.x;
      const homeDy = this.targetY - this.y;
      this.vx += homeDx * 0.075; 
      this.vy += homeDy * 0.075;
      this.vx *= 0.76; 
      this.vy *= 0.76;
      const distToHome = Math.sqrt(homeDx*homeDx + homeDy*homeDy);
      if (distToHome < 15 && this.isSilverMorpher) {
        this.currentColor = 'rgba(11, 44, 102, 0.85)';
      }
    }
    this.x += this.vx;
    this.y += this.vy;
    const distToHome = Math.sqrt((this.targetX - this.x)**2 + (this.targetY - this.y)**2);
    if (distToHome > 0.5 || Math.abs(this.vx) > 0.01 || Math.abs(this.vy) > 0.01) {
      allParticlesAtHome = false;
    }
  }
  draw() {
    ctx.fillStyle = this.currentColor; 
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initLogoParticles() {
  const img = new Image();
  img.crossOrigin = "Anonymous"; 
  img.src = LOGO_URL;
  img.onload = function() {
    const maxDim = 320; 
    let imgW = img.width;
    let imgH = img.height;
    if (imgW > imgH) {
      imgH = (maxDim / imgW) * imgH;
      imgW = maxDim;
    } else {
      imgW = (maxDim / imgH) * imgW;
      imgH = maxDim;
    }
    const offsetX = (width - imgW) / 2 - 65;
    const offsetY = (height - imgH) / 2 + 20;
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = imgW;
    tempCanvas.height = imgH;
    tempCtx.drawImage(img, 0, 0, imgW, imgH);
    const imgData = tempCtx.getImageData(0, 0, imgW, imgH).data;
    transparentLogoCanvas = document.createElement('canvas');
    transparentLogoCanvas.width = width;
    transparentLogoCanvas.height = height;
    const tCtx = transparentLogoCanvas.getContext('2d');
    tCtx.fillStyle = '#0b2c66'; 
    for (let y = 0; y < imgH * 0.65; y++) {
      for (let x = 0; x < imgW; x++) {
        const index = (y * imgW + x) * 4;
        const r = imgData[index];
        const g = imgData[index + 1];
        const b = imgData[index + 2];
        const alpha = imgData[index + 3];
        if (alpha > 128 && (r + g + b) / 3 < 220) {
          const finalX = x * 1.45 + offsetX;
          const finalY = y * 1.45 + offsetY;
          tCtx.fillRect(finalX, finalY, 1.6, 1.6);
          particles.push(new FluidParticle(finalX, finalY));
        }
      }
    }
    animate();
  };
  img.onerror = function() {
    setupCanvasFromBlueprint();
  };
}

function setupCanvasFromBlueprint() {
  transparentLogoCanvas = document.createElement('canvas');
  transparentLogoCanvas.width = width;
  transparentLogoCanvas.height = height;
  const tCtx = transparentLogoCanvas.getContext('2d');
  tCtx.fillStyle = '#0b2c66';
  tCtx.beginPath();
  tCtx.moveTo(width / 2 - 110, height / 2 - 5);
  tCtx.quadraticCurveTo(width / 2, height / 2 - 50, width / 2 + 120, height / 2 - 60);
  tCtx.quadraticCurveTo(width / 2 + 40, height / 2 + 10, width / 2 - 35, height / 2 + 145);
  tCtx.quadraticCurveTo(width / 2 + 5, height / 2 + 20, width / 2 + 80, height / 2 - 30);
  tCtx.closePath();
  tCtx.fill();
  const imgData = tCtx.getImageData(0, 0, width, height).data;
  for (let y = 0; y < height; y += 1) { 
    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * 4;
      if (imgData[index + 3] > 10) { 
        particles.push(new FluidParticle(x, y));
      }
    }
  }
  animate();
}

canvas.addEventListener('mouseleave', () => {
  mouse.x = -1000;
  mouse.y = -1000;
  isInteracting = false;
});

canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.pageX - (rect.left + window.scrollX);
  const mouseY = e.pageY - (rect.top + window.scrollY);
  
  mouse.x = mouseX * (width / rect.width);
  mouse.y = mouseY * (height / rect.height);
  isInteracting = true;
});

function animate() {
  allParticlesAtHome = true;
  particles.forEach(p => p.update(mouse.x, mouse.y));
  if (!isInteracting && allParticlesAtHome && transparentLogoCanvas) {
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(transparentLogoCanvas, 0, 0);
  } else {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)'; // Changed to white backdrop fade so it matches light website background seamlessly!
    ctx.fillRect(0, 0, width, height);
    particles.forEach(p => p.draw());
    if (isInteracting && mouse.x > 0 && mouse.y > 0) {
      ctx.save();
      ctx.translate(mouse.x, mouse.y);
      starAngle += 0.05;
      ctx.rotate(starAngle);
      const spikes = 5;
      const outerRadius = 9;  
      const innerRadius = 4;
      const shimmer = Math.floor(Math.sin(Date.now() * 0.01) * 35) + 210;
      ctx.fillStyle = `rgba(${shimmer}, ${shimmer + 4}, ${shimmer + 8}, 0.85)`;
      ctx.shadowBlur = 6;
      ctx.shadowColor = `rgba(${shimmer}, ${shimmer + 10}, 255, 0.5)`;
      ctx.beginPath();
      let rot = (Math.PI / 2) * 3;
      let step = Math.PI / spikes;
      ctx.moveTo(0, 0 - outerRadius);
      for (let i = 0; i < spikes; i++) {
        let cx = Math.cos(rot) * outerRadius;
        let cy = Math.sin(rot) * outerRadius;
        ctx.lineTo(cx, cy);
        rot += step;
        cx = Math.cos(rot) * innerRadius;
        cy = Math.sin(rot) * innerRadius;
        ctx.lineTo(cx, cy);
        rot += step;
      }
      ctx.lineTo(0, 0 - outerRadius);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }
  requestAnimationFrame(animate);
}

initLogoParticles();

/* ==========================================================================
   6. HERO BACKGROUND IMAGE & JAPANESE TEXT PARALLAX MOUSE CONTROLLER
   ========================================================================== */
document.addEventListener("mousemove", (event) => {
    const bgImage = document.querySelector(".hero-background");
    const japaneseText = document.querySelector(".hero-vertical-text");
    
    if (!bgImage || !japaneseText) return;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const distanceX = event.clientX - centerX;
    const distanceY = event.clientY - centerY;

    // Slight movement dampening division ratio factors
    const shiftX = distanceX / 40;
    const shiftY = distanceY / 40;

    // Moving opposite directions via negative calculations
    bgImage.style.transform = `scale(1.1) translate(${-shiftX}px, ${-shiftY}px)`;

    // Moving matching directions with the cursor footprint
    japaneseText.style.transform = `translate(${shiftX}px, calc(-50% + ${shiftY}px))`;
});

