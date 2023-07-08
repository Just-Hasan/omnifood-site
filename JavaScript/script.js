"use strict";

////////////////////////////
// Getting current year👇
const copyrightYear = document.querySelector(".copyright-year");
const currentYear = new Date().getFullYear();
copyrightYear.textContent = currentYear;

////////////////////////////
// Making mobile navigation work
const header = document.querySelector(".header");
const btnNav = document.querySelector(".btn-mobile-nav");
btnNav.addEventListener("click", () => {
  header.classList.toggle("nav-open");
});

////////////////////////////
// Making smooth scroll behavior that works in any browser
const allLinks = document.querySelectorAll("a:link");
allLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    // Ini mengambil value dari href👇
    const href = link.getAttribute("href");

    href === "#" ? window.scrollTo({ top: 0, behavior: "smooth" }) : false;
    console.log(href);
    // Scroll to other links
    //Ini seperti menyebut jika href tidak cuma "#" dan dimulai dengan "#"
    if (href !== "#" && href.startsWith("#")) {
      const sectionElement = document.querySelector(href);
      console.log(sectionElement);
      sectionElement.scrollIntoView({ behavior: "smooth" });
    }
    // Does link (which represent every link) contains main-nav-link?
    // If it does, toggle nav-open, this does look weird, but the nav-open actually won't be open
    // Because of media queries and the style from the css  preventing it
    if (link.classList.contains("main-nav-link")) {
      header.classList.toggle("nav-open");
    }
  });
});

////////////////////////////
// Making sticky navigation
// Dude the IntersectionObserver requires 2 parameter and its function and object wtf LMAO🤣
const sectionHeroEl = document.querySelector(".section-hero");
const sectionHowItWorks = document.querySelector(".section-how-it-works");
const obs = new IntersectionObserver(
  (entries) => {
    const ent = entries[0];
    //
    // Pas kita tidak berada di Hero section, add sticky to body
    ent.isIntersecting === false
      ? document.body.classList.add("sticky")
      : false;
    // Pas kita berada di Hero section, hilangkan sticky from body
    ent.isIntersecting === true
      ? document.body.classList.remove("sticky")
      : false;
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);

obs.observe(sectionHeroEl);

////////////////////////////
// Selecting step img box
const stepImg = document.querySelectorAll(".step-img");
stepImg.forEach((image) => {});

////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
const checkFlexGap = function () {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
};

checkFlexGap();
