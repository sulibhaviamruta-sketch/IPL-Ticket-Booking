
// ACTIVITY 5: TOAST NOTIFICATION

function showToast(message) {

    let toast = document.getElementById("toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.style.display = "block";

    setTimeout(function () {
        toast.style.display = "none";
    }, 3000);
}


// ACTIVITY 5 AND 7

document.addEventListener("DOMContentLoaded", function () {

    // Smooth Scrolling for Book Buttons

    const bookButtons = document.querySelectorAll(
        'a[href="#booking"]'
    );

    bookButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            const bookingForm = document.getElementById("booking");

            if (bookingForm) {
                event.preventDefault();

                bookingForm.scrollIntoView({
                    behavior: "smooth"
                });

                showToast("Please fill in your booking details!");
            }
        });
    });


    // ACTIVITY 7: SELECT FORM ELEMENTS

    const match = document.getElementById("match");
    const stand = document.getElementById("stand");
    const quantity = document.getElementById("quantity");

    const bookingForm = document.querySelector("#booking form");


    // Ticket Prices

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


    // UPDATE BOOKING SUMMARY

    function updateSummary() {

        const selectedMatch = match.value;
        const selectedStand = stand.value;
        const ticketQuantity = Number(quantity.value);

        let ticketPrice = 0;
        let totalAmount = 0;

        if (selectedMatch && selectedStand) {
            ticketPrice = prices[selectedMatch][selectedStand];
        }

        if (ticketPrice > 0 && ticketQuantity > 0) {
            totalAmount = ticketPrice * ticketQuantity;
        }

        document.getElementById("summary-match").textContent =
            selectedMatch || "Not Selected";

        document.getElementById("summary-stand").textContent =
            selectedStand || "Not Selected";

        document.getElementById("summary-price").textContent =
            "₹" + ticketPrice;

        document.getElementById("summary-quantity").textContent =
            ticketQuantity;

        document.getElementById("summary-total").textContent =
            "₹" + totalAmount;

        if (selectedMatch && selectedStand &&
            ticketQuantity >= 1 && ticketQuantity <= 10) {

            showToast("Booking Summary Updated!");
        }
    }


    // CHANGE EVENT LISTENERS

    match.addEventListener("change", updateSummary);

    stand.addEventListener("change", updateSummary);

    quantity.addEventListener("change", updateSummary);


    // RESET BOOKING SUMMARY

    bookingForm.addEventListener("reset", function () {

        setTimeout(function () {
            updateSummary();
        }, 0);

    });

});
