/* 
   NAVBAR SCROLL
 */
function updateNavbarOnScroll() {
    const siteNavbar = document.querySelector("#siteNavbar");

    if (!siteNavbar) {
        return;
    }

    siteNavbar.classList.toggle("navbar-scrolled", window.scrollY > 80);
}

/* 
   SMOOTH SCROLL
 */
function setupSmoothScroll() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    const navbarCollapse = document.querySelector("#mainNavbar");

    internalLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const targetSection = document.querySelector(targetId);

            if (!targetSection) {
                return;
            }

            event.preventDefault();

            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: "smooth"
            });

            if (navbarCollapse && navbarCollapse.classList.contains("show")) {
                const menu = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
                menu.hide();
            }
        });
    });
}

/* 
   REVEAL ANIMATIONS
 */
function setupRevealAnimations() {
    const revealCards = document.querySelectorAll(".reveal-card");

    if (!revealCards.length) {
        return;
    }

    const revealObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    revealCards.forEach(function (card, index) {
        card.style.transitionDelay = `${index * 0.08}s`;
        revealObserver.observe(card);
    });
}

/* 
   PRICING TOGGLE
 */
function setupPricingToggle() {
    const pricingToggle = document.querySelector("#pricingToggle");
    const priceValues = document.querySelectorAll(".price-value");
    const monthlyLabel = document.querySelector("#monthlyLabel");
    const yearlyLabel = document.querySelector("#yearlyLabel");
    const pricePeriods = document.querySelectorAll(".price-period");

    if (!pricingToggle || !priceValues.length || !monthlyLabel || !yearlyLabel) {
        return;
    }

    pricingToggle.addEventListener("change", function () {
        const priceType = pricingToggle.checked ? "yearly" : "monthly";

        priceValues.forEach(function (priceValue) {
            priceValue.textContent = priceValue.dataset[priceType];
        });

        pricePeriods.forEach(function (period) {
            period.textContent = pricingToggle.checked ? "/ month, billed yearly" : "/ month";
        });

        monthlyLabel.classList.toggle("active", !pricingToggle.checked);
        yearlyLabel.classList.toggle("active", pricingToggle.checked);
    });
}

/* 
   STATS COUNTER
 */
function setupStatsCounter() {
    const statsGrid = document.querySelector("#statsGrid");
    const statNumbers = document.querySelectorAll(".stat-number");

    if (!statsGrid || !statNumbers.length) {
        return;
    }

    let hasAnimatedStats = false;

    const statsObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting || hasAnimatedStats) {
                    return;
                }

                hasAnimatedStats = true;
                animateStats(statNumbers);
                statsObserver.unobserve(statsGrid);
            });
        },
        {
            threshold: 0.4
        }
    );

    statsObserver.observe(statsGrid);
}

/* 
   ANIMATE STATS
 */
function animateStats(statNumbers) {
    statNumbers.forEach(function (statElement) {
        const targetNumber = Number(statElement.dataset.target);
        const suffix = statElement.dataset.suffix || "";
        const duration = 1300;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const currentValue = targetNumber * progress;
            const formattedValue = Number.isInteger(targetNumber)
                ? Math.floor(currentValue)
                : currentValue.toFixed(1);

            statElement.textContent = `${formattedValue}${suffix}`;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                statElement.textContent = `${targetNumber}${suffix}`;
            }
        }

        requestAnimationFrame(updateCounter);
    });
}

/* 
   INIT
 */
function initializeLandingPage() {
    updateNavbarOnScroll();
    setupSmoothScroll();
    setupRevealAnimations();
    setupPricingToggle();
    setupStatsCounter();

    window.addEventListener("scroll", updateNavbarOnScroll);
}

document.addEventListener("DOMContentLoaded", initializeLandingPage);