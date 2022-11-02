const carousel = document.querySelector(".carousel");
const firstImage = document.querySelectorAll(".carousel img")[0];
const arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLef, positionDiff;

const convertRemToPixels = (rem) => {    
    const fontSize = getComputedStyle(document.documentElement).fontSize;
    return rem * parseFloat(fontSize);
};

const showHideIcon = () => {
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
    arrowIcons[0].style.display = (carousel.scrollLeft === 0 ? "none": "block");
    arrowIcons[1].style.display = (carousel.scrollLeft === scrollWidth ? "none": "block");
};

const autoSlide = () => {
    if (carousel.scrollLeft === (carousel.scrollWidth - carousel.clientWidth)) return;
    positionDiff = Math.abs(positionDiff);
    let firstImgWidth = firstImage.clientWidth + convertRemToPixels(1); // getting first img width & adding 1rem margin value
    // getting difference value that needs to add or remove from carousel left to make middle image center
    let valDiff = firstImgWidth - positionDiff;
    if (carousel.scrollLeft > prevScrollLef) { // user scrolls to right
        carousel.scrollLeft += (positionDiff > firstImgWidth / 3 ? valDiff : -positionDiff);
        return;
    }
    // user scrolls to left
    carousel.scrollLeft -= (positionDiff > firstImgWidth / 3 ? valDiff : -positionDiff);
};

arrowIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImage.clientWidth + convertRemToPixels(1); // getting first img width & adding 1rem margin value
        carousel.scrollLeft += (icon.id === "left" ? -firstImgWidth : firstImgWidth);
        setTimeout(() => {
            showHideIcon();
        }, 60);
    });
});

const dragStart = (event) => {
    isDragStart = true;
    prevPageX = event.pageX || event.touches[0].pageX;
    prevScrollLef = carousel.scrollLeft;
};

const dragging = (event) => {
    if (!isDragStart) return;
    event.preventDefault();
    carousel.classList.add("dragging");
    isDragging = true;
    positionDiff = (event.pageX || event.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLef - positionDiff;

    showHideIcon();
};

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");

    if (!isDragging) return;
    isDragging = false;
    autoSlide();
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);