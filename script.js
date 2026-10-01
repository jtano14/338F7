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
   8. REFINED SLIDER CONTROL LOGIC - DRAG & WHEEL SCROLL ENGINE
   ========================================================================== */
document.addEventListener("DOMContentLoaded", function () {
    const sliderContainer = document.getElementById("frameworkSliderContainer");
    const btnPrev = document.getElementById("frameworkPrev");
    const btnNext = document.getElementById("frameworkNext");

    if (!sliderContainer) return;

    // --- A. STATE TRACKING VARIABLES FOR GESTURE DRAGGING ---
    let isDown = false;
    let startX;
    let scrollLeft;

    // Mouse Down Event: Grab and lock the track axis
    sliderContainer.addEventListener("mousedown", (e) => {
        isDown = true;
        sliderContainer.classList.add("active-dragging");
        startX = e.pageX - sliderContainer.offsetLeft;
        scrollLeft = sliderContainer.scrollLeft;
        sliderContainer.style.cursor = "grabbing";
    });

    // Mouse Leave Event: Release grabbing hold cleanly
    sliderContainer.addEventListener("mouseleave", () => {
        isDown = false;
        sliderContainer.style.cursor = "grab";
    });

    // Mouse Up Event: Clear hold tracking status
    sliderContainer.addEventListener("mouseup", () => {
        isDown = false;
        sliderContainer.style.cursor = "grab";
    });

    // Mouse Move Event: Compute velocity offset tracking lines
    sliderContainer.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - sliderContainer.offsetLeft;
        const walk = (x - startX) * 1.5; // Drag sensitivity multiplier scalar
        sliderContainer.scrollLeft = scrollLeft - walk;
        updateArrowVisibility();
    });

    // --- B. SMOOTH KINETIC MOUSE WHEEL GESTURES ---
    sliderContainer.addEventListener("wheel", (e) => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            e.preventDefault();
            sliderContainer.scrollLeft += e.deltaX;
            updateArrowVisibility();
        }
    }, { passive: false });

    // --- C. CLASSIC BUTTON CLICK TRANSITION FALLBACKS ---
    const stepShiftWidth = 219; // Individual card width (195px) + gap space width (24px)
    
    if (btnNext) {
        btnNext.addEventListener("click", () => {
            sliderContainer.scrollBy({ left: stepShiftWidth * 2, behavior: "smooth" });
            setTimeout(updateArrowVisibility, 350); // Delay safely waits for browser physics loop
        });
    }

    if (btnPrev) {
        btnPrev.addEventListener("click", () => {
            sliderContainer.scrollBy({ left: -stepShiftWidth * 2, behavior: "smooth" });
            setTimeout(updateArrowVisibility, 350);
        });
    }

    // --- D. SMART CONTROLLER FOR BUTTON OPACITY WINDOWS ---
    function updateArrowVisibility() {
        const currentScroll = sliderContainer.scrollLeft;
        const maxScrollBoundary = sliderContainer.scrollWidth - sliderContainer.clientWidth;

        // Fade left indicator arrow out when at the absolute start of the carousel track
        if (btnPrev) {
            btnPrev.style.opacity = currentScroll <= 5 ? "0.2" : "1";
            btnPrev.style.pointerEvents = currentScroll <= 5 ? "none" : "auto";
        }

        // Fade right indicator arrow out when tracking reaches pillar 07 at the end threshold
        if (btnNext) {
            btnNext.style.opacity = currentScroll >= maxScrollBoundary - 5 ? "0.2" : "1";
            btnNext.style.pointerEvents = currentScroll >= maxScrollBoundary - 5 ? "none" : "auto";
        }
    }

    // Initialize default container cursor and scroll parameters fluidly
    sliderContainer.style.cursor = "grab";
    sliderContainer.style.overflowX = "auto"; 
    sliderContainer.style.scrollbarWidth = "none"; // Clear default tracker bar for Firefox views
    
    // Webkit inline style injection to cleanly clear scrollbars in Chrome, Safari & Edge
    const scrollStylePatch = document.createElement("style");
    scrollStylePatch.innerHTML = `#frameworkSliderContainer::-webkit-scrollbar { display: none !important; }`;
    document.head.appendChild(scrollStylePatch);

    // Run visibility calculations immediately upon loading the page
    updateArrowVisibility();
    sliderContainer.addEventListener("scroll", updateArrowVisibility, { passive: true });
});

/* ==========================================================================
   9. MOBILE FRAMEWORK ACCORDION TOGGLE CONTROLLER
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const accordionTriggers = document.querySelectorAll(".accordion-trigger");

    accordionTriggers.forEach(trigger => {
        trigger.addEventListener("click", (e) => {
            e.preventDefault();
            
            const currentItem = trigger.closest(".accordion-item");
            const currentPanel = currentItem.querySelector(".accordion-panel");
            const currentArrow = trigger.querySelector(".accordion-arrow");
            
            // SENIOR DEVELOPER OPTION: Close all other open panels first (Accordion Mode)
            const allItems = document.querySelectorAll(".accordion-item");
            allItems.forEach(item => {
                if (item !== currentItem) {
                    const panel = item.querySelector(".accordion-panel");
                    const arrow = item.querySelector(".accordion-trigger .accordion-arrow");
                    if (panel && panel.style.maxHeight !== "0px" && panel.style.maxHeight !== "") {
                        panel.style.maxHeight = "0px";
                        if (arrow) arrow.textContent = "+";
                    }
                }
            });

            // Toggle the active state of the tapped panel
            if (currentPanel.style.maxHeight === "0px" || currentPanel.style.maxHeight === "") {
                // Open fluidly by calculating the total internal pixel text size dynamically
                currentPanel.style.maxHeight = currentPanel.scrollHeight + "px";
                if (currentArrow) currentArrow.textContent = "−"; // Switches indicator icon to a minus sign
            } else {
                // Collapse securely back to hidden states
                currentPanel.style.maxHeight = "0px";
                if (currentArrow) currentArrow.textContent = "+";
            }
        });
    });
});


