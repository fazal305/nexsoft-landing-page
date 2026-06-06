// Changes navbar style after scrolling
function updateNavbarOnScroll() {
    const siteNavbar = document.getElementById("siteNavbar");

    if (window.scrollY > 80) {
        siteNavbar.classList.add("navbar-scrolled");
    } else {
        siteNavbar.classList.remove("navbar-scrolled");
    }
}

// Runs smooth scrolling for internal page links
function setupSmoothScroll() {
    $("a[href^='#']").on("click", function (event) {
        const targetId = $(this).attr("href");

        if ($(targetId).length) {
            event.preventDefault();

            $("html, body").animate({
                scrollTop: $(targetId).offset().top - 70
            }, 650);
        }
    });
}

// Closes mobile navbar after clicking a nav link
function setupMobileNavbarClose() {
    $(".site-nav-link, .nav-cta").on("click", function () {
        $(".navbar-collapse").collapse("hide");
    });
}

// Reveals cards when they enter the screen
function setupRevealAnimations() {
    const revealCards = document.querySelectorAll(".reveal-card");

    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealCards.forEach(function (card, index) {
        card.style.transitionDelay = `${index * 0.08}s`;
        revealObserver.observe(card);
    });
}

// Updates pricing text when monthly/yearly toggle changes
function setupPricingToggle() {
    const pricingToggle = document.getElementById("pricingToggle");
    const priceValues = document.querySelectorAll(".price-value");
    const monthlyLabel = document.getElementById("monthlyLabel");
    const yearlyLabel = document.getElementById("yearlyLabel");

    pricingToggle.addEventListener("change", function () {
        const priceType = pricingToggle.checked ? "yearly" : "monthly";

        priceValues.forEach(function (priceValue) {
            priceValue.textContent = priceValue.dataset[priceType];
        });

        monthlyLabel.classList.toggle("active", !pricingToggle.checked);
        yearlyLabel.classList.toggle("active", pricingToggle.checked);
    });
}

// Animates stat numbers when stats section enters the screen
function setupStatsCounter() {
    let hasAnimatedStats = false;
    const statsGrid = document.getElementById("statsGrid");

    const statsObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting && !hasAnimatedStats) {
                hasAnimatedStats = true;

                $(".stat-number").each(function () {
                    const statElement = $(this);
                    const targetNumber = parseFloat(statElement.attr("data-target"));
                    const suffix = statElement.attr("data-suffix");

                    $({ currentValue: 0 }).animate({ currentValue: targetNumber }, {
                        duration: 1300,
                        easing: "swing",
                        step: function () {
                            const currentNumber = targetNumber % 1 === 0
                                ? Math.floor(this.currentValue)
                                : this.currentValue.toFixed(1);

                            statElement.text(currentNumber + suffix);
                        },
                        complete: function () {
                            statElement.text(targetNumber + suffix);
                        }
                    });
                });

                statsObserver.unobserve(statsGrid);
            }
        });
    }, {
        threshold: 0.4
    });

    statsObserver.observe(statsGrid);
}

window.addEventListener("scroll", updateNavbarOnScroll);

$(document).ready(function () {
    setupSmoothScroll();
    setupMobileNavbarClose();
    setupRevealAnimations();
    setupPricingToggle();
    setupStatsCounter();
    updateNavbarOnScroll();
});