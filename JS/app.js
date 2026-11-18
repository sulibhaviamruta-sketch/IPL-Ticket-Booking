
// Toast Message
function showToast(message) {
    const oldToast = document.querySelector(".toast");

    if (oldToast) {
        oldToast.remove();
    }

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 2500);
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (event) {
        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// Team Filter
const teamFilter = document.getElementById("team-filter");
const matchCards = document.querySelectorAll(".match-card");
const noMatches = document.getElementById("no-matches");

if (teamFilter) {
    teamFilter.addEventListener("change", function () {
        const selectedTeam = this.value;
        let visibleCount = 0;

        matchCards.forEach(card => {
            const teams = card.dataset.teams;

            if (!selectedTeam || teams.includes(selectedTeam)) {
                card.style.display = "";
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        });

        noMatches.hidden = visibleCount !== 0;
    });
}

// Grid and List View
const matchList = document.getElementById("match-list");
const gridButton = document.getElementById("grid-view");
const listButton = document.getElementById("list-view");

if (gridButton && listButton && matchList) {
    gridButton.addEventListener("click", function () {
        matchList.classList.remove("list-view");

        gridButton.classList.add("active");
        listButton.classList.remove("active");
    });

    listButton.addEventListener("click", function () {
        matchList.classList.add("list-view");

        listButton.classList.add("active");
        gridButton.classList.remove("active");
    });
}

// Mobile Hamburger Menu
const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");

if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
        mainNav.classList.toggle("open");

        const isOpen = mainNav.classList.contains("open");

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );
    });

    mainNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", function () {
            mainNav.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation");
        });
    });
}

// Live Booking Summary
const matchSelect = document.getElementById("match");
const standSelect = document.getElementById("stand");
const quantityInput = document.getElementById("quantity");

const prices = {
    "CSK vs MI": {
        "General": 800,
        "Premium": 1500,
        "VIP": 3000
    },
    "RCB vs KKR": {
        "General": 1000,
        "Premium": 2000,
        "VIP": 4000
    },
    "MI vs SRH": {
        "General": 900,
        "Premium": 1800,
        "VIP": 3500
    },
    "KKR vs CSK": {
        "General": 800,
        "Premium": 1600,
        "VIP": 3200
    }
};

function updateSummary() {
    const match = matchSelect.value;
    const stand = standSelect.value;
    const quantity = Number(quantityInput.value) || 0;

    const price = prices[match]?.[stand] || 0;
    const total = price * quantity;

    document.getElementById("summary-match").textContent =
        match || "Not Selected";

    document.getElementById("summary-stand").textContent =
        stand || "Not Selected";

    document.getElementById("summary-price").textContent =
        "₹" + price;

    document.getElementById("summary-quantity").textContent =
        quantity;

    document.getElementById("summary-total").textContent =
        "₹" + total;
}

if (matchSelect && standSelect && quantityInput) {
    matchSelect.addEventListener("change", updateSummary);
    standSelect.addEventListener("change", updateSummary);
    quantityInput.addEventListener("input", updateSummary);
}

// Booking Form
const ticketForm = document.getElementById("ticket-form");

if (ticketForm) {
    ticketForm.addEventListener("submit", function (event) {
        event.preventDefault();

        showToast("Your booking details have been submitted!");

        ticketForm.reset();
        updateSummary();
    });

    ticketForm.addEventListener("reset", function () {
        setTimeout(updateSummary, 0);
    });
}
