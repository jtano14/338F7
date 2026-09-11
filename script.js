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

    const moveX = (e.clientX - window.innerWidth / 2) / 50;
    const moveY = (e.clientY - window.innerHeight / 2) / 50;

    bgImage.style.transform = `scale(1.1) translate(${-moveX}px, ${-moveY}px)`;
    verticalText.style.transform = `translate(${moveX}px, calc(-50% + ${moveY}px))`;
});

/* ==========================================================================
   5. INTERACTIVE LOGO CANVAS ANIMATION ENGINE (ULTRA-FLUID LAYERED BURST)
   ========================================================================== */
const canvas = document.getElementById('bubbleCanvas');
const ctx = canvas.getContext('2d');
const brandContainer = document.querySelector('.brand-container');

const width = 450;
const height = 280;
canvas.width = width;
canvas.height = height;

const particles = [];
let mouse = { x: -1000, y: -1000 };
let burstActive = false;

class FluidParticle {
  constructor(x, y) {
    this.targetX = x; 
    this.targetY = y;
    this.x = x; 
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    // Added particle size variation to make the burst look richer and more organic
    this.size = Math.random() * 1.5 + 0.8; 
    this.returnDelay = 0; 
    this.currentColor = 'rgba(11, 44, 102, 0.95)';
  }
  update(mouseX, mouseY) {
    const dx = this.x - mouseX;
    const dy = this.y - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Increased interactive explosion radius for a dramatic, cleaner look
    const pushRadius = 45; 
    if (distance < pushRadius) {
      burstActive = true;
      const angle = Math.atan2(dy, dx);
      const force = (pushRadius - distance) / pushRadius;
      
      // Increased explosive speed to make the bubbles blast outwards dynamically
      const speed = force * (Math.random() * 28 + 14); 
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      
      // DELAY INCREASED: Bubbles will now float out out longer before returning home
      this.returnDelay = Math.random() * 45 + 40; 
    }
    
    if (this.returnDelay > 0) {
      this.returnDelay--;
      this.vx *= 0.94; // Higher friction allows particles to suspend elegantly in the air
      this.vy *= 0.94;
    } else {
      const homeDx = this.targetX - this.x;
      const homeDy = this.targetY - this.y;
      
      // Softened return force pulls them back home in a smooth, graceful fluid motion
      this.vx += homeDx * 0.04; 
      this.vy += homeDy * 0.04;
      this.vx *= 0.78; 
      this.vy *= 0.78;
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

// Generates a mathematically perfect vector arrow map so text elements NEVER appear inside the canvas
function generatePerfectArrowMap() {
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = width;
  tempCanvas.height = height;
  const tCtx = tempCanvas.getContext('2d');
  
  tCtx.fillStyle = '#0b2c66';
  tCtx.beginPath();
  
  // Creates a clean, high-density geometric replica of your upward chevron/arrow symbol
  const centerX = width / 2;
  const centerY = height / 2 - 20;
  
  tCtx.moveTo(centerX - 80, centerY + 10);
  tCtx.quadraticCurveTo(centerX - 10, centerY - 55, centerX + 90, centerY - 65);
  tCtx.quadraticCurveTo(centerX + 30, centerY + 15, centerX - 30, centerY + 100);
  tCtx.quadraticCurveTo(centerX - 10, centerY + 20, centerX + 40, centerY - 25);
  
  tCtx.closePath();
  tCtx.fill();
  
  const imgData = tCtx.getImageData(0, 0, width, height).data;
  
  // ADDED MORE BUBBLES: High-density step tracking generates an abundant volume of particles
  for (let y = 0; y < height; y += 1.5) { 
    for (let x = 0; x < width; x += 1.5) {
      const index = (Math.floor(y) * width + Math.floor(x)) * 4;
      if (imgData[index + 3] > 50) { 
        particles.push(new FluidParticle(x, y));
      }
    }
  }
  animate();
}

canvas.addEventListener('mouseleave', () => {
  mouse.x = -1000;  mouse.y = -1000;
});

canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = (e.clientX - rect.left) * (width / rect.width);
  mouse.y = (e.clientY - rect.top) * (height / rect.height);
});

function animate() {
  ctx.clearRect(0, 0, width, height); 
  
  let layoutIsMoving = false;
  particles.forEach(p => {
    p.update(mouse.x, mouse.y);
    p.draw();
    
    // Check if particles are currently floating away from home base
    if (p.returnDelay > 0 || Math.abs(p.vx) > 0.1) {
        layoutIsMoving = true;
    }
  });
  
  // Swap visibility states between clean image layer and bursting particles automatically
  if (layoutIsMoving && brandContainer) {
      brandContainer.classList.add('is-bursting');
  } else if (brandContainer) {
      brandContainer.classList.remove('is-bursting');
  }
  
  requestAnimationFrame(animate);
}

/* ==========================================================================
   6. GLOBAL SUBSYSTEM INITIALIZATION (TIMELINES & TRANSITIONS)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    generatePerfectArrowMap();

    const sequenceLayout = [
        { id: 'seq-1', delay: 150 },  
        { id: 'seq-2', delay: 350 },  
        { id: 'seq-3', delay: 550 },  
        { id: 'seq-4', delay: 750 },  
        { id: 'seq-5', delay: 950 },  
        { id: 'seq-6', delay: 1100 }  
    ];

    sequenceLayout.forEach(item => {
        const targetElement = document.getElementById(item.id);
        if (targetElement) {
            setTimeout(() => {
                targetElement.classList.add('is-visible');
            }, item.delay);
        }
    });

    window.addEventListener('scroll', () => {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;
        
        const scrollPosition = window.scrollY;
        const fadeThreshold = 450; 
        const opacityRatio = Math.min(scrollPosition / fadeThreshold, 1);
        
        heroSection.style.backgroundColor = `rgba(11, 34, 64, ${opacityRatio})`;
    });
});
