/* ==========================================
   SIDEBAR OPEN / CLOSE
========================================== */

const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");
const layout = document.querySelector(".container");

if(menuBtn && sidebar && layout){

    const syncMenuState = (isOpen) => {
        const icon = menuBtn.querySelector(".sidebar-toggle-icon");

        menuBtn.setAttribute("aria-expanded", String(isOpen));

        if(icon){
            icon.classList.toggle("is-open", isOpen);
            icon.classList.toggle("is-closed", !isOpen);
        }
    };

    menuBtn.addEventListener("click", () => {

        if(window.innerWidth <= 992){
            sidebar.classList.toggle("active");
            syncMenuState(sidebar.classList.contains("active"));
        }else{
            layout.classList.toggle("sidebar-collapsed");
            syncMenuState(!layout.classList.contains("sidebar-collapsed"));
        }

    });

    window.addEventListener("resize", () => {
        if(window.innerWidth > 992){
            sidebar.classList.remove("active");
            syncMenuState(!layout.classList.contains("sidebar-collapsed"));
        }else{
            // Mobile always uses the off-canvas sidebar state.
            if(!layout.classList.contains("sidebar-collapsed")){
                syncMenuState(sidebar.classList.contains("active"));
            }else{
                syncMenuState(false);
            }
        }
    });

    syncMenuState(true);
}

/* ==========================================
   CLOSE SIDEBAR ON LINK CLICK
========================================== */

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        if(window.innerWidth <= 992){

            sidebar.classList.remove("active");

            if(menuBtn){
                const icon = menuBtn.querySelector(".sidebar-toggle-icon");
                if(icon){
                    icon.classList.remove("is-open");
                    icon.classList.add("is-closed");
                }
                menuBtn.setAttribute("aria-expanded", "false");
            }

        }

    });

});

/* ==========================================
   ACTIVE NAVIGATION
========================================== */

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.clientHeight;

        if(pageYOffset >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(
            link.getAttribute("href") ===
            `#${current}`
        ){
            link.classList.add("active");
        }

    });

});

/* ==========================================
   SMOOTH SCROLL
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        const target =
        document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({
                behavior:"smooth",
                block:"start"
            });

        }

    });

});

/* ==========================================
   SCROLL TO TOP BUTTON
========================================== */

const scrollBtn =
document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {

    if(window.scrollY > 500){

        scrollBtn.style.opacity = "1";
        scrollBtn.style.visibility = "visible";

    }else{

        scrollBtn.style.opacity = "0";
        scrollBtn.style.visibility = "hidden";

    }

});

if(scrollBtn){

    scrollBtn.addEventListener("click", () => {

        window.scrollTo({

            top:0,
            behavior:"smooth"

        });

    });

}

/* ==========================================
   CURSOR GLOW EFFECT
========================================== */

const glow =
document.querySelector(".cursor-glow");

document.addEventListener("mousemove",(e)=>{

    if(glow){

        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";

    }

});

/* ==========================================
   PARALLAX HERO IMAGE
========================================== */

const heroImage =
document.querySelector(".image-card");

window.addEventListener("scroll", () => {

    if(heroImage){

        const scrolled = window.pageYOffset;

        heroImage.style.transform =
        `translateY(${scrolled * 0.05}px)`;

    }

});

/* ==========================================
   CARD HOVER TILT EFFECT
========================================== */

const cards =
document.querySelectorAll(
'.glass-card, .skill-card, .strength-card'
);

cards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect =
        card.getBoundingClientRect();

        const x =
        e.clientX - rect.left;

        const y =
        e.clientY - rect.top;

        const centerX =
        rect.width / 2;

        const centerY =
        rect.height / 2;

        const rotateX =
        ((y - centerY) / 20);

        const rotateY =
        ((centerX - x) / 20);

        card.style.transform =
        `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-8px)
        `;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
        `
        perspective(1000px)
        rotateX(0deg)
        rotateY(0deg)
        translateY(0px)
        `;

    });

});

/* ==========================================
   COUNTER ANIMATION
========================================== */

const counters =
document.querySelectorAll(".stat-card h3");

const counterObserver =
new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            const counter = entry.target;

            const target =
            parseInt(counter.innerText);

            let current = 0;

            const updateCounter = () => {

                current += Math.ceil(target / 50);

                if(current < target){

                    counter.innerText = current + "+";

                    requestAnimationFrame(
                        updateCounter
                    );

                }else{

                    counter.innerText =
                    target + "+";

                }

            };

            updateCounter();

            counterObserver.unobserve(counter);

        }

    });

});

counters.forEach(counter => {

    counterObserver.observe(counter);

});

/* ==========================================
   TECH STRIP PAUSE
========================================== */

const techTrack =
document.querySelector(".tech-track");

if(techTrack){

    techTrack.addEventListener("mouseenter", () => {

        techTrack.style.animationPlayState =
        "paused";

    });

    techTrack.addEventListener("mouseleave", () => {

        techTrack.style.animationPlayState =
        "running";

    });

}

/* ==========================================
   REVEAL ANIMATION
========================================== */

const revealElements =
document.querySelectorAll(
".glass-card, .skill-card, .timeline-card"
);

const revealObserver =
new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.style.opacity = "1";

            entry.target.style.transform =
            "translateY(0px)";

        }

    });

},{
    threshold:0.15
});

revealElements.forEach(el => {

    el.style.opacity = "0";

    el.style.transform =
    "translateY(40px)";

    el.style.transition =
    "all .8s ease";

    revealObserver.observe(el);

});

/* ==========================================
   PAGE LOADER EFFECT
========================================== */

window.addEventListener("load", () => {

    document.body.style.opacity = "0";

    setTimeout(() => {

        document.body.style.transition =
        "opacity .8s ease";

        document.body.style.opacity = "1";

    },100);

});

/* ==========================================
   CURRENT YEAR AUTO UPDATE
========================================== */

const yearElement =
document.getElementById("year");

if(yearElement){

    yearElement.textContent =
    new Date().getFullYear();

}

/* ==========================================
   CONSOLE MESSAGE
========================================== */

console.log(
"%cKaustubh Bhor Portfolio Loaded 🚀",
"color:#10B981;font-size:18px;font-weight:bold;" 
);
/* ==========================================
   DARK MODE TOGGLE
========================================== */

const themeToggle = document.getElementById("theme-toggle");

if(themeToggle){

    const savedTheme = localStorage.getItem("portfolio-theme");

    if(savedTheme === "dark"){
        document.body.classList.add("dark-mode");
    }

    const updateThemeToggle = () => {

        const icon = themeToggle.querySelector("i");
        const label = themeToggle.querySelector("span");
        const isDark = document.body.classList.contains("dark-mode");

        if(isDark){
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
            label.textContent = "Light Mode";
            themeToggle.setAttribute("aria-label", "Enable light mode");
        }else{
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
            label.textContent = "Dark Mode";
            themeToggle.setAttribute("aria-label", "Enable dark mode");
        }

    };

    updateThemeToggle();

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        localStorage.setItem(
            "portfolio-theme",
            document.body.classList.contains("dark-mode") ? "dark" : "light"
        );

        updateThemeToggle();

    });

}
