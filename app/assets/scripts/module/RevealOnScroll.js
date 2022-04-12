import { throttle } from "lodash";

class RevealOnScroll {
    constructor() {
        this.itemsToReveal = document.querySelectorAll(".feature-item");
        this.hideInitially();
        this.scrollThrottle = throttle(this.calcCaller, 200).bind(this);
        this.events();
    }

    events () {        
        window.addEventListener("scroll", this.scrollThrottle);
    }

    calcCaller() {
        console.log("scroll run");
        this.itemsToReveal.forEach((itemToReveal) => {
            if (!itemToReveal.isRevealed) {
                this.calculateIfScrolledTo(itemToReveal);
            }
        });
    }

    calculateIfScrolledTo(el) {
        console.log("element was calculated")
        let scrollPercent = (el.getBoundingClientRect().top / window.innerHeight) * 100;

        if (scrollPercent < 75) {
            el.classList.add("reveal-item--is-visible");
            el.isRevealed = true;

            if (el.isLastItem) {
                window.removeEventListener("scroll", this.scrollThrottle)
            }
        }
    }

    hideInitially() {
        this.itemsToReveal.forEach((itemToReveal) => {
            itemToReveal.classList.add("reveal-item");
            itemToReveal.isRevealed = false;
        });
        this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true;
    }
}

export default RevealOnScroll;