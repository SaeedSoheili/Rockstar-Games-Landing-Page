const navbar = document.querySelector(".navBar-div");
let prevScrollPos = window.scrollY;
let body5Numbers = document.querySelectorAll(".number-body5");
let sliderItems = [
  {
    game: "Red Dead Redemption",
    title: "Now on Nintendo Switch and PS4",
    src: "assets/slider-1.jpg",
  },
  {
    game: "Grand Theft Auto Online",
    title: "The Mammoth Avenger",
    src: "assets/slider-2.jpg",
  },
  {
    game: "Grand Theft Auto Online",
    title: "San Andreas Mercenaries Out Now",
    src: "assets/slider-3.jpg",
  },
  {
    game: "Grand Theft Auto Online",
    title: "The Vinewood Car Club",
    src: "assets/slider-4.jpg",
  },
];
let gameNameSlider = document.querySelector(".game-name-slider");
let titleSlider = document.querySelector(".title-slider");
let selectorSlider = document.querySelectorAll(".selector-slider");
let gameImages = document.querySelectorAll(".game-img-body2");

// Navbar Hide and Show
window.addEventListener("scroll", () => {
  const currentScrollPos = window.scrollY;

  if (prevScrollPos > currentScrollPos) {
    navbar.style.top = "0";
  } else {
    navbar.style.top = `-${navbar.clientHeight}px`;
  }

  prevScrollPos = currentScrollPos;
});

//Increasment Effect of Numbers Body 5

function incrementNumber(element, target) {
  let currentNumber = 0;
  const interval = setInterval(() => {
    element.textContent = currentNumber;
    if (currentNumber >= target) {
      clearInterval(interval);
    }
    currentNumber += 10;
  }, 1);
}

function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const item = entry.target;
      incrementNumber(item, Number(item.innerHTML));
      observer.unobserve(item);
    }
  });
}

const observer = new IntersectionObserver(handleIntersection, {
  threshold: 0.5,
});

body5Numbers.forEach((item) => {
  observer.observe(item);
});

// Manage Slider

function updateSlider(index) {
  gameNameSlider.textContent = sliderItems[index].game;
  titleSlider.textContent = sliderItems[index].title;
  document.querySelector(
    ".slider-image"
  ).style.backgroundImage = `url(${sliderItems[index].src})`;

  selectorSlider.forEach((slider, i) => {
    if (i === index) {
      slider.classList.add("active");
    } else {
      slider.classList.remove("active");
    }
  });
}

selectorSlider.forEach((slider, index) => {
  slider.addEventListener("click", () => {
    updateSlider(index);
  });
});

updateSlider(0);

// Zoom image of Featured Games

function removeActiveClass() {
  gameImages.forEach((image) => {
    image.classList.remove("active");
  });
}

document.addEventListener("click", (event) => {
  if (!event.target.classList.contains("game-img-body2")) {
    removeActiveClass();
  }
});

gameImages.forEach((image) => {
  image.addEventListener("click", () => {
    removeActiveClass();

    image.classList.add("active");
  });
});

// Scroll to Top Button

document.addEventListener("DOMContentLoaded", function () {
  const goTopButton = document.querySelector(".go-top-btn");
  let prevScrollPos = window.scrollY;

  function toggleGoTopButton() {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos < prevScrollPos) {
      goTopButton.style.display = "block";
    } else {
      goTopButton.style.display = "none";
    }

    // Check if user has scrolled to the bottom
    if (window.innerHeight + currentScrollPos >= document.body.offsetHeight) {
      goTopButton.style.display = "none";
    }

    prevScrollPos = currentScrollPos;
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  window.addEventListener("scroll", toggleGoTopButton);

  goTopButton.addEventListener("click", scrollToTop);
});

// Chars left for Inputs

const subjectInput = document.querySelector(".subject-body4");
const subjectCounter = document.querySelector(".subject-counter");
const messageInput = document.querySelector(".message-body4");
const messageCounter = document.querySelector(".message-counter");

const subjectMaxLength = parseInt(subjectInput.getAttribute("maxlength"));
const messageMaxLength = parseInt(messageInput.getAttribute("maxlength"));

subjectInput.addEventListener("input", () => {
  const remainingChars = subjectMaxLength - subjectInput.value.length;
  subjectCounter.textContent = `You can write ${remainingChars} more ${
    remainingChars === 1 ? "character" : "characters"
  }`;
});

messageInput.addEventListener("input", () => {
  const remainingChars = messageMaxLength - messageInput.value.length;
  messageCounter.textContent = `You can write ${remainingChars} more character`;
});

// Show and Hide Menu

const menuBtn = document.getElementById("menuBtn");
const menuOverlay = document.getElementById("menuOverlay");
const menuIconImage = menuBtn.querySelector(".menu-icon-image-navbar");

menuBtn.addEventListener("click", function () {
  if (menuOverlay.style.left === "0px") {
    // Close the menu if it's already open
    menuOverlay.style.left = "-30%";
    menuBtn.setAttribute("src", "assets/menu.png");
  } else {
    // Open the menu
    menuOverlay.style.left = "0";
    menuBtn.setAttribute("src", "assets/remove.png");
  }
});

document.addEventListener("click", function (event) {
  if (
    !event.target.closest(".menu-content") &&
    !event.target.closest(".menu-icon-image-navbar")
  ) {
    menuOverlay.style.left = "-30%";
    menuBtn.setAttribute("src", "assets/menu.png");
  }
});

// Close the menu when scrolling occurs
window.addEventListener("scroll", function () {
  menuOverlay.style.left = "-30%";
  menuBtn.setAttribute("src", "assets/menu.png");
});
