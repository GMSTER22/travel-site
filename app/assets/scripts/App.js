import "../styles/styles.css";
import MobileMenu from "./module/mobileMenu";
import RevealOnScroll from "./module/RevealOnScroll";
import StickyHeader from "./module/StickyHeader";

// Lesson example code below this line
let stickyHeader = new StickyHeader();

new RevealOnScroll(document.querySelectorAll(".feature-item"), 75);
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60);

let mobileMenu = new MobileMenu();



if (module.hot) {
    module.hot.accept();
}