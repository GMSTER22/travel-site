import "../styles/styles.css";
import MobileMenu from "./module/mobileMenu";
import RevealOnScroll from "./module/RevealOnScroll";
import StickyHeader from "./module/StickyHeader";


let stickyHeader = new StickyHeader();

new RevealOnScroll(document.querySelectorAll(".feature-item"), 75);
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60);

let mobileMenu = new MobileMenu();

let modal;

document.querySelectorAll(".open-modal").forEach(el => {
    el.addEventListener("click", e => {
        e.preventDefault();
        
        if (typeof modal == "undefined") {
            import(/* webpackChunckName: "modal" */ "./module/Modal")
            .then((importedModal)=> {
                modal = new importedModal.default()
                setTimeout(() => modal.openTheModal(), 20)
            })
            .catch(() => {
                console.log("something went wrong")
            });
        } else {
            modal.openTheModal()
        }
    })
})



if (module.hot) {
    module.hot.accept();
}