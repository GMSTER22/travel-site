import throttle from "lodash/throttle";
import debounce from "lodash/debounce";

class RevealOnScroll {
    constructor(itemsToReveal, thresholdPercent) {
        this.thresholdPercent = thresholdPercent;
        this.itemsToReveal = itemsToReveal;
        this.browserHeight = window.innerHeight;
        this.hideInitially();
        this.scrollThrottle = throttle(this.calcCaller, 200).bind(this);
        this.events();
    }

    events () {        
        window.addEventListener("scroll", this.scrollThrottle);
        window.addEventListener("resize", debounce(() => {
            console.log("resized window");
            this.browserHeight = window.innerHeight;
        },333))
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
        if (this.browserHeight + window.scrollY > el.offsetTop) {
            console.log("element was calculated");
            let scrollPercent = (el.getBoundingClientRect().top / this.browserHeight) * 100;

            if (scrollPercent < this.thresholdPercent) {
                el.classList.add("reveal-item--is-visible");
                el.isRevealed = true;

                if (el.isLastItem) {
                    window.removeEventListener("scroll", this.s)
                }
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