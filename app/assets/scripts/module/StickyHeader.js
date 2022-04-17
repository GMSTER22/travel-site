import throttle from "lodash/throttle";
import debounce from "lodash/debounce";

class StickyHeader {
    constructor() {
        this.siteHeader = document.querySelector(".site-header");
        this.largeHero = document.querySelector(".large-hero");
        this.pageSections = document.querySelectorAll(".page-section");
        this.browserHeight = window.innerHeight;
        this.previousScrollY = window.scrollY;
        this.events()
    }

    events() {
        //use scroll and debounce for performance
        window.addEventListener("scroll", throttle(() => this.runOnScroll(), 200));
        window.addEventListener("resize", debounce(() => {
            this.browserHeight = window.innerHeight;
        }, 333))
    }

    runOnScroll() {
        this.determineScrollDirection();

        // Make the header darker when scroll past large hero section
        if (window.scrollY > this.largeHero.clientHeight - this.siteHeader.clientHeight) {
            this.siteHeader.classList.add("site-header--dark");
        } else {
            this.siteHeader.classList.remove("site-header--dark");
        }

        this.pageSections.forEach(el => this.calcSection(el));
    }

    determineScrollDirection() {
        if (window.scrollY > this.previousScrollY) {
            this.scrollDirection = "down";
        } else {
            this.scrollDirection = "up"
        }

        this.previousScrollY = window.scrollY;
    }

    calcSection(el) {
        if (window.scrollY + this.browserHeight > el.offsetTop && window.scrollY < el.offsetTop) {
            let scrollPercent = el.getBoundingClientRect().y / this.browserHeight * 100;

            if (scrollPercent < 25 && scrollPercent > -0.1 && this.scrollDirection == "down" || scrollPercent < 33 && this.scrollDirection == "up") {
                console.log(scrollPercent)
                let matchingLink = el.getAttribute("data-matching-link");
                document.querySelectorAll(`.primary-nav a:not(${matchingLink})`).forEach(el => {
                    el.classList.remove("is-current-link");
                });
                document.querySelector(matchingLink).classList.add("is-current-link");
            }
        }
    }
}

export default StickyHeader;