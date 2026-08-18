const slides = document.querySelector(".slides");
const images = document.querySelectorAll(".slides img");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

let currentSlide = 0;
const totalSlides = images.length;
let autoSlideTimer = null;

// Updates the carousel position
function showSlide() {
  if (totalSlides === 0) return;
  // Divide 100% by totalSlides because CSS transform percentage 
  // is calculated relative to the full width of .slides
  slides.style.transform = `translateX(-${currentSlide * (100 / totalSlides)}%)`;
}

// Advance to next slide with automatic loop
function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide();
}

// Go to previous slide with automatic loop
function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide();
}

// Reset and restart the auto-play timer on click
function resetAutoSlide() {
  clearInterval(autoSlideTimer);
  autoSlideTimer = setInterval(nextSlide, 5000);
}

// Event Listeners
if (next) {
  next.addEventListener("click", () => {
    nextSlide();
    resetAutoSlide();
  });
}

if (prev) {
  prev.addEventListener("click", () => {
    prevSlide();
    resetAutoSlide();
  });
}

resetAutoSlide();

let total = 0;

function addToCheckout(name, price, image) {
    const checkoutItems = document.getElementById("checkout-items");

    if (!checkoutItems) {
        console.error("checkout-items not found!");
        return;
    }

    const item = document.createElement("div");
    item.classList.add("checkout-item");

    item.innerHTML = `
        <img src="${image}" width="80">
        <div class="item-info">
            <h4>${name}</h4>
            <p>₱${price}</p>
        </div>
<button class="remove-btn"
onclick="removeItem(this,${price})">
🗑
</button>
    `;

    checkoutItems.appendChild(item);

    total += Number(price);
    document.getElementById("total-price").textContent = "₱" + total;
}

function removeItem(button, price) {
    button.parentElement.remove();

    total -= Number(price);

    if (total < 0) {
        total = 0;
    }

    document.getElementById("total-price").textContent = "₱" + total;
}

function buyNow() {
    if (total === 0) {
        showPopup("Your cart is empty! 🛒 ");
        return;
    }

    showPopup("✅  Purchase submitted, Thankyou for purchasing!!");

    document.getElementById("checkout-items").innerHTML = "";
    total = 0;
    document.getElementById("total-price").textContent = "₱0";
}

function showPopup(message) {
    document.getElementById("popup-message").textContent = message;
    document.getElementById("popup").style.display = "flex";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}


function searchProducts() {
    let input = document.getElementById("searchInput").value.toUpperCase();
    let cards = document.querySelectorAll(".shoe-card");

    cards.forEach(function(card) {
        let name = card.querySelector("h3").textContent.toUpperCase();

        if (name.indexOf(input) > -1) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}

