import "../styles/styles.css";
import MobileMenu from "./module/mobileMenu";
import RevealOnScroll from "./module/RevealOnScroll";

// Lesson example code below this line

let mobileMenu = new MobileMenu();
new RevealOnScroll(document.querySelectorAll(".feature-item"), 75);
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60);



if (module.hot) {
    module.hot.accept();
}