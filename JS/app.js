
// 1. Reusable Toast Notification Function

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


// 2. Smooth Scrolling for Book Buttons

document.addEventListener("DOMContentLoaded", function () {

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

});
