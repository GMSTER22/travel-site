import "../styles/styles.css";
import MobileMenu from "./module/mobileMenu";
import RevealOnScroll from "./module/RevealOnScroll";

if (module.hot) {
    module.hot.accept();
}

// Lesson example code below this line

let mobileMenu = new MobileMenu();
let revealOnScroll = new RevealOnScroll();