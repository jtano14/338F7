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
/*
document.addEventListener("mousemove", (e) => {
    const bgImage = document.querySelector(".hero-background");
    const verticalText = document.querySelector(".hero-vertical-text");
    
    if (!bgImage || !verticalText) return;

    const moveX = (e.clientX - window.innerWidth / 2) / 50;
    const moveY = (e.clientY - window.innerHeight / 2) / 50;

    bgImage.style.transform = `scale(1.1) translate(${-moveX}px, ${-moveY}px)`;
    verticalText.style.transform = `translate(${moveX}px, calc(-50% + ${moveY}px))`;
});
*/

/* ==========================================================================
   5. INTERACTIVE LOGO CANVAS ANIMATION ENGINE (CLEAN HOVER BURST ENGINE)
   ========================================================================== */
const canvas = document.getElementById('bubbleCanvas');
const ctx = canvas.getContext('2d');
const brandContainer = document.querySelector('.brand-container');

const width = 850;
const height = 500;
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
    this.size = Math.random() * 1.5 + 0.8; 
    this.returnDelay = 0; 
    this.currentColor = 'rgba(11, 44, 102, 0.95)';
  }
  update(mouseX, mouseY) {
    const dx = this.x - mouseX;
    const dy = this.y - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    const pushRadius = 55; // Generates wide interactive displacement explosions
    if (distance < pushRadius) {
      const angle = Math.atan2(dy, dx);
      const force = (pushRadius - distance) / pushRadius;
      const speed = force * (Math.random() * 26 + 14); 
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      
      this.returnDelay = Math.random() * 55 + 45; // Generates a long floating particle duration
    }
    
    if (this.returnDelay > 0) {
      this.returnDelay--;
      this.vx *= 0.94; 
      this.vy *= 0.94;
    } else {
      const homeDx = this.targetX - this.x;
      const homeDy = this.targetY - this.y;
      
      this.vx += homeDx * 0.05; 
      this.vy += homeDy * 0.05;
      this.vx *= 0.76; 
      this.vy *= 0.76;
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

// Generates the hidden blueprint coordinate map exclusively targeting the arrow path geometry
function generatePerfectArrowMap() {
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = width;
  // Increased measurement box slightly to give bubbles absolute freedom up top
  tempCanvas.height = 550; 
  const tCtx = tempCanvas.getContext('2d');
  
  tCtx.fillStyle = '#0b2c66';
  tCtx.beginPath();
  
  const centerX = width / 2;
  // Shifted drawing anchor node position down slightly to ensure zero ceiling trapping artifacts
  const centerY = height / 2 - 60; 
  
  tCtx.moveTo(centerX - 85, centerY + 10);
  tCtx.quadraticCurveTo(centerX - 10, centerY - 60, centerX + 95, centerY - 70);
  tCtx.quadraticCurveTo(centerX + 35, centerY + 15, centerX - 30, centerY + 105);
  tCtx.quadraticCurveTo(centerX - 10, centerY + 20, centerX + 40, centerY - 25);
  
  tCtx.closePath();
  tCtx.fill();
  
  const imgData = tCtx.getImageData(0, 0, width, height).data;
  
  for (let y = 0; y < height; y += 1.8) { 
    for (let x = 0; x < width; x += 1.8) {
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
    
    // Only render particles onto screen context while an interactive movement is active
    if (p.returnDelay > 0 || Math.abs(p.vx) > 0.15) {
        layoutIsMoving = true;
        p.draw();
    }
  });
  
  // Toggle layout display configurations depending on hover status levels
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
    }); //


/* ==========================================================================
   NEW VANTA CLOUDS CONFIGURATION (DARK NAVY THEME)
   ========================================================================== */
window.addEventListener("load", () => {
    if (typeof VANTA !== "undefined") {
        VANTA.CLOUDS({
            el: "#vanta-ocean-bg", 
            mouseControls: false, // Disabled to keep your center logo completely stable
            touchControls: false,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            
            /* UPDATED COLOR PALETTE FOR DARK NAVY SURFACES */
            backgroundColor: 0x0b2240,    // Your deep corporate primary navy blue background base
            skyColor: 0x1d3557,           // Deep mid-navy sky horizon color
            cloudColor: 0x90e0ff,         // Glowing crisp seafoam sky-blue clouds (Highly visible!)
            cloudShadowColor: 0x061324,   // Dark shadow depth accents
            sunColor: 0xff9919,           // Warm golden accents
            sunGlareColor: 0xff6633,
            sunlightColor: 0xff9933,
            
            speed: 0.60 // Slow, calming, and organic movement
        });
    }
});


   
/* SCROLL TRANSITIONS */

let scrollTicking = false;
function updateScrollEffects() {
    
    const heroSection = document.querySelector('.hero-section');
    const scrollPosition = window.scrollY;
    
        /* ==========================================================================
       1. HERO COLOR FADE ENGINE
       ========================================================================== */
    if (heroSection) {
        if (scrollPosition <= 5) {
            // Forces background back to a crisp, un-masked solid white state at the top
            heroSection.style.backgroundColor = "#ffffff";
        } else {
            const fadeThreshold = 450;
            const opacityRatio = Math.min(scrollPosition / fadeThreshold, 1);
            // Smoothly transitions from transparent layer to your corporate primary color
            heroSection.style.backgroundColor = `rgba(11, 34, 64, ${opacityRatio})`;
        }
    }

        /* ==========================================================================
       2. SECTION EXIT FADE ENGINE (BALANCED TIMING FOR TALL SECTIONS)
       ========================================================================== */
    const sections = document.querySelectorAll('main > section:not(.hero-section)');
    const viewportHeight = window.innerHeight; // Adapts natively to your 1080px screen height

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();

        /*
           CRITICAL TIMING FIX: 
           If the bottom of the section is still inside or below the viewport window,
           keep it 100% bright (opacity: 1). This completely stops long sections 
           from going dark prematurely while you read them.
        */
        if (rect.top < 0 && rect.bottom > 0) {
            /* 
               Only start fading when the BOTTOM edge of the section gets close 
               to exiting the top line of your browser screen (within 500px).
            */
            if (rect.bottom < 500) {
                // Smoothly fade from 1 down to 0.25 over the final 500px window frame
                let opacity = rect.bottom / 500;
                opacity = Math.max(0.25, Math.min(1, opacity));
                section.style.opacity = opacity.toString();
            } else {
                // Fully visible while the bulk of the content passes through
                section.style.opacity = "1";
            }
        } else if (rect.bottom <= 0) {
            // Completely scrolled past
            section.style.opacity = "0.25";
        } else {
            // Incoming from the bottom -> Keep solid and crisp
            section.style.opacity = "1";
        }
    });

    scrollTicking = false;
}

window.addEventListener('scroll', () => {

    if (!scrollTicking) {
        window.requestAnimationFrame(updateScrollEffects);
        scrollTicking = true;
    }

}, { passive: true });
window.addEventListener('resize', updateScrollEffects);

/* Set the correct state immediately when the page loads */
updateScrollEffects();

});                          
