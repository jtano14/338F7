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

            // FIXED: Instead of snapping, slide the mobile tray open and closed fluidly
            if (isOpen) {
                navLinks.style.display = "flex";
                navLinks.style.maxHeight = "0px";
                navLinks.style.opacity = "0";
                navLinks.style.transition = "max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease";
                
                // Allow browser layout engine a micro-frame to calculate the height slide
                requestAnimationFrame(() => {
                    navLinks.style.maxHeight = "380px"; // Comfortable height to contain your links runway
                    navLinks.style.opacity = "1";
                });
            } else {
                navLinks.style.maxHeight = "0px";
                navLinks.style.opacity = "0";
                // Wait for the slide transition to complete before clearing display paths
                setTimeout(() => {
                    if (!navLinks.classList.contains("is-open")) {
                        navLinks.style.display = "none";
                    }
                }, 400);
            }
        });

        // Close mobile nav drawer cleanly if a user selects an internal anchor link
        const anchors = navLinks.querySelectorAll("a:not(.lang-switch)");
        anchors.forEach(anchor => {
            anchor.addEventListener("click", () => {
                navLinks.classList.remove("is-open");
                navToggle.setAttribute("aria-expanded", "false");
                navToggle.classList.remove("active");
                
                navLinks.style.maxHeight = "0px";
                navLinks.style.opacity = "0";
                setTimeout(() => { navLinks.style.display = "none"; }, 400);
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
   3. OFFICE INFO DIALOG POPUP MODAL ARCHITECTURE (ANTI-JUMP ALIGNED)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const officeButtons = document.querySelectorAll("[data-office-dialog]");
    const closeButtons = document.querySelectorAll("[data-dialog-close]");

    officeButtons.forEach(btn => {
        // FIXED: Catch the click event 'e' to block native anchor jumps
        btn.addEventListener("click", (e) => {
            e.preventDefault(); /* FIXED: Stops the browser from snapping the page to the top */
            
            const targetId = btn.getAttribute("data-office-dialog");
            const targetDialog = document.getElementById(targetId);
            if (targetDialog) {
                targetDialog.showModal();
                document.body.style.overflow = "hidden";
            }
        });
    });

    closeButtons.forEach(closeBtn => {
        closeBtn.addEventListener("click", (e) => {
            e.preventDefault();
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
   4. INTERACTIVE LOGO CANVAS ANIMATION ENGINE (CLEAN HOVER BURST ENGINE)
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
    
    const pushRadius = 55; 
    if (distance < pushRadius) {
      const angle = Math.atan2(dy, dx);
      const force = (pushRadius - distance) / pushRadius;
      const speed = force * (Math.random() * 26 + 14); 
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.returnDelay = Math.random() * 55 + 45; 
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

function generatePerfectArrowMap() {
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = width;
  tempCanvas.height = 550; 
  const tCtx = tempCanvas.getContext('2d');
  
  tCtx.fillStyle = '#0b2c66';
  tCtx.beginPath();
  
  const centerX = width / 2;
  const centerY = height / 2 + 10; 
  
  tCtx.moveTo(centerX - 75, centerY + 10);
  tCtx.quadraticCurveTo(centerX, centerY - 60, centerX + 105, centerY - 70);
  tCtx.quadraticCurveTo(centerX + 45, centerY + 15, centerX - 20, centerY + 105);
  tCtx.quadraticCurveTo(centerX, centerY + 20, centerX + 50, centerY - 25);
  
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
  mouse.x = -1000;  
  mouse.y = -1000;
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
    if (p.returnDelay > 0 || Math.abs(p.vx) > 0.15) {
        layoutIsMoving = true;
        p.draw();
    }
  });
  
  if (layoutIsMoving && brandContainer) {
      brandContainer.classList.add('is-bursting');
  } else if (brandContainer) {
      brandContainer.classList.remove('is-bursting');
  }
  
  requestAnimationFrame(animate);
}

/* ==========================================================================
   5. GLOBAL SUBSYSTEM INITIALIZATION (TIMELINES & TRANSITIONS)
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
});

/* ==========================================================================
   6. REFINE HIGH-CONTRAST VANTA CLOUDS GENERATION LOOP
   ========================================================================== */
function initializeVantaClouds() {
    const targetBg = document.querySelector("#vanta-ocean-bg");
    
    if (typeof VANTA !== "undefined" && targetBg) {
        setTimeout(() => {
           VANTA.CLOUDS({
               el: "#vanta-ocean-bg", 
               mouseControls: true, 
               touchControls: true, 
               gyroControls: false,
               minHeight: 200.00,
               minWidth: 200.00,
               backgroundColor: 0xffffff,    
               skyColor: 0x5e8de3,           
               cloudColor: 0xbac1de,         
               cloudShadowColor: 0x283f59,   
               sunColor: 0xff9919,           
               sunGlareColor: 0xfc815c,      
               sunlightColor: 0xff9933,      
               speed: 1.50                   
           });
            console.log("3. Vanta Canvas injected and initialized successfully!");
        }, 100);
    }
}

document.addEventListener("DOMContentLoaded", initializeVantaClouds);

document.addEventListener("DOMContentLoaded", initializeVantaClouds);

/* ==========================================================================
   7. INTERACTIVE SCROLL PARALLAX ENGINE & SLOWER TEXT FADE LOOPS
   ========================================================================== */
let scrollTicking = false;

function updateScrollEffects() {
    const heroContent = document.querySelector('.hero-content.container');
    const sections = document.querySelectorAll('main > section:not(.hero-section):not(.framework-scroll-section)');
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;

    if (heroContent) {
        // SLOWER FADE: Increased multiplier from 1.2 to 2.2 for smoother transition
        let fadeThreshold = windowHeight * 2.2;
        let newOpacity = 1 - (scrollPosition / fadeThreshold);
        
        if (newOpacity >= 0) {
            heroContent.style.opacity = newOpacity;
            // GENTLER PARALLAX: Reduced from 0.18 to 0.08 for slower drift
            heroContent.style.transform = `translateY(${scrollPosition * 0.08}px)`;
        } else {
            heroContent.style.opacity = 0;
        }
    }

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();

        if (rect.top < 0 && rect.bottom > 0) {
            if (rect.bottom < 500) {
                let opacity = rect.bottom / 500;
                opacity = Math.max(0.25, Math.min(1, opacity));
                section.style.opacity = opacity.toString();
            } else {
                section.style.opacity = "1";
            }
        } else if (rect.bottom <= 0) {
            section.style.opacity = "0.25"; 
        } else {
            section.style.opacity = "1";
        }
    });

    // SECTION FADE OVERLAY - FADE OUT BACKGROUND SECTIONS
   const allSections = document.querySelectorAll('.about-section, .services-section, .framework-section, .leadership-section, .sectors-section, .contact-section');
    
    allSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        
        // If section is above viewport (scrolled past), add fade class
        if (rect.bottom < 0) {
            section.classList.add('faded');
        } else {
            section.classList.remove('faded');
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
updateScrollEffects();

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, { passive: true });

/* ==========================================================================
   8. REFINED SLIDER CONTROL LOGIC - HIGH-SENSITIVITY INFINITE TRANSLATION ENGINE
   ========================================================================== */
document.addEventListener("DOMContentLoaded", function () {
    const sliderContainer = document.getElementById("frameworkSliderContainer");
    const sliderTrack = document.getElementById("frameworkSliderTrack");
    const btnPrev = document.getElementById("frameworkPrev");
    const btnNext = document.getElementById("frameworkNext");

    if (!sliderContainer || !sliderTrack) return;

    // --- A. INITIALIZE SEAMLESS VIRTUAL CLONES ---
    const originalCards = Array.from(sliderTrack.children);
    const cardWidth = 195; // Card structural width
    const gapWidth = 24;   // Spacing gap width
    const stepShift = cardWidth + gapWidth; // 219px total shift size
    const totalOriginals = originalCards.length;

    // Create a complete set of clones at both ends to create an endless loop
    originalCards.forEach(card => {
        const cloneTail = card.cloneNode(true);
        sliderTrack.appendChild(cloneTail);
    });
    originalCards.slice().reverse().forEach(card => {
        const cloneHead = card.cloneNode(true);
        sliderTrack.insertBefore(cloneHead, sliderTrack.firstChild);
    });

    // --- B. POSITION TRACK TO LOCK ON REAL FIRST CARD ---
    // Start at an index offset that skips past the front clone buffer zone
    let currentIndex = totalOriginals; 
    let currentXTransform = -(currentIndex * stepShift);
    
    // Lock track parameters to disable raw native browser overflow scrolling interferes
    sliderContainer.style.overflowX = "hidden"; 
    sliderTrack.style.transition = "none";
    sliderTrack.style.transform = `translateX(${currentXTransform}px)`;

    // --- C. STATE VARIABLES FOR HIGH-SENSITIVITY DRAGGING ---
    let isDown = false;
    let startX;
    let dragTransformX;
    let isTransitioning = false;

    // Helper function to update position smoothly across the track axis
    const updateTrackPosition = (animate = true) => {
        if (animate) {
            sliderTrack.style.transition = "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)";
        } else {
            sliderTrack.style.transition = "none";
        }
        currentXTransform = -(currentIndex * stepShift);
        sliderTrack.style.transform = `translateX(${currentXTransform}px)`;
    };

    // --- D. SEAMLESS BACKROUND JUMP RESET ENGINE ---
    // Triggers instantly right as the transition animation finish line occurs
    sliderTrack.addEventListener("transitionend", () => {
        isTransitioning = false;
        
        // If user travels past card 07 into the tail clones, seamlessly snap back to real card 01
        if (currentIndex >= totalOriginals * 2) {
            currentIndex = totalOriginals;
            updateTrackPosition(false);
        } 
        // If user travels past card 01 into head clones, seamlessly snap forward to real card 07
        else if (currentIndex < totalOriginals) {
            currentIndex = (totalOriginals * 2) - 1;
            updateTrackPosition(false);
        }
    });

    // --- E. LIGHTWEIGHT MOUSE GESTURE EVENTS ---
    sliderContainer.addEventListener("mousedown", (e) => {
        if (isTransitioning) return;
        isDown = true;
        sliderContainer.classList.add("active-dragging");
        startX = e.pageX;
        dragTransformX = currentXTransform;
        sliderContainer.style.cursor = "grabbing";
        sliderTrack.style.transition = "none"; // Kill transitions while dragging for real-time tracking
    });

    sliderContainer.addEventListener("mouseleave", () => {
        if (!isDown) return;
        isDown = false;
        sliderContainer.style.cursor = "grab";
        // Snaps track container cleanly to the nearest card threshold if released mid-drag
        currentIndex = Math.round(-currentXTransform / stepShift);
        updateTrackPosition(true);
    });

    sliderContainer.addEventListener("mouseup", () => {
        if (!isDown) return;
        isDown = false;
        sliderContainer.style.cursor = "grab";
        currentIndex = Math.round(-currentXTransform / stepShift);
        updateTrackPosition(true);
    });

    sliderContainer.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault(); // Kills accidental desktop text highlighting completely
        
        const currentMouseX = e.pageX;
        // ULTRA HIGH SENSITIVITY MULTIPLIER: Set to 2.5 so the track glides effortlessly with tiny movements!
        const deltaX = (currentMouseX - startX) * 2.5; 
        
        currentXTransform = dragTransformX + deltaX;
        sliderTrack.style.transform = `translateX(${currentXTransform}px)`;
    });

    // --- F. SMOOTH MOUSE WHEEL STREAMING HUB ---
    let wheelTimeout;
    sliderContainer.addEventListener("wheel", (e) => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            e.preventDefault();
            if (isTransitioning) return;
            
            // High-precision direction check
            if (e.deltaX > 4) {
                isTransitioning = true;
                currentIndex++;
                updateTrackPosition(true);
            } else if (e.deltaX < -4) {
                isTransitioning = true;
                currentIndex--;
                updateTrackPosition(true);
            }
        }
    }, { passive: false });

    // --- G. CLASSIC INDICATOR BUTTON JUMP FALLBACKS ---
    if (btnNext) {
        btnNext.style.opacity = "1";
        btnNext.style.pointerEvents = "auto";
        btnNext.addEventListener("click", () => {
            if (isTransitioning) return;
            isTransitioning = true;
            currentIndex += 2; // Slides forward 2 cards at a time matching your layout spec
            updateTrackPosition(true);
        });
    }

    if (btnPrev) {
        btnPrev.style.opacity = "1";
        btnPrev.style.pointerEvents = "auto";
        btnPrev.addEventListener("click", () => {
            if (isTransitioning) return;
            isTransitioning = true;
            currentIndex -= 2; // Slides backward 2 cards at a time matching your layout spec
            updateTrackPosition(true);
        });
    }

    // Set interactive default parameters fluidly
    sliderContainer.style.cursor = "grab";
});

/* ==========================================================================
   9. COMBINED MOBILE ACCORDION ENGINE (FRAMEWORK & SECTORS SYSTEM)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    // 1. Gather all trigger buttons from BOTH accordion systems simultaneously
    const accordionTriggers = document.querySelectorAll(".accordion-trigger, .sector-accordion-trigger");

    accordionTriggers.forEach(trigger => {
        trigger.addEventListener("click", (e) => {
            e.preventDefault();
            
            // Determine if we are clicking a Framework item or a Sector item dynamically
            const isSector = trigger.classList.contains("sector-accordion-trigger");
            
            // Set up relative item naming rules based on the active section block
            const itemClass = isSector ? ".sector-accordion-item" : ".accordion-item";
            const panelClass = isSector ? ".sector-accordion-panel" : ".accordion-panel";
            const arrowClass = isSector ? ".sector-accordion-arrow" : ".accordion-arrow";
            const triggerClass = isSector ? ".sector-accordion-trigger" : ".accordion-trigger";

            const currentItem = trigger.closest(itemClass);
            const currentPanel = currentItem.querySelector(panelClass);
            const currentArrow = trigger.querySelector(arrowClass);
            
            // 2. ISOLATION AUTO-RESET: Close other panels inside this SAME accordion section only
            const allItemsInSection = currentItem.parentElement.querySelectorAll(itemClass);
            allItemsInSection.forEach(item => {
                if (item !== currentItem) {
                    const panel = item.querySelector(panelClass);
                    const arrow = item.querySelector(`${triggerClass} ${arrowClass}`);
                    if (panel && (panel.style.maxHeight !== "0px" && panel.style.maxHeight !== "")) {
                        panel.style.maxHeight = "0px";
                        panel.classList.remove("is-active"); 
                        if (arrow) arrow.textContent = "+";
                    }
                }
            });

            // 3. SLIDE TRANSITION ANIMATION AXIS
            if (currentPanel.style.maxHeight === "0px" || currentPanel.style.maxHeight === "") {
                currentPanel.classList.add("is-active"); 
                currentPanel.style.maxHeight = currentPanel.scrollHeight + "px";
                if (currentArrow) currentArrow.textContent = "−"; 
            } else {
                currentPanel.style.maxHeight = "0px";
                currentPanel.classList.remove("is-active"); 
                if (currentArrow) currentArrow.textContent = "+";
            }
        });
    });
});
