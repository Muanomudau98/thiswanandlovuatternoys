document.addEventListener("DOMContentLoaded", () => {

    /* ---------------- ACCORDION ---------------- */
    document.querySelectorAll(".accordion-title").forEach(title => {
        title.addEventListener("click", () => {
            title.classList.toggle("active");
            const content = title.nextElementSibling;
            content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + "px";
        });
    });

    /* ---------------- MODAL ---------------- */
    const openModalBtn = document.getElementById("openModal");
    const modal = document.getElementById("myModal");
    const closeModalBtn = document.querySelector(".close-btn");

    const openModal = () => modal && (modal.style.display = "flex");
    const closeModal = () => modal && (modal.style.display = "none");

    if (modal && closeModalBtn) {
        if (openModalBtn) openModalBtn.addEventListener("click", openModal);
        closeModalBtn.addEventListener("click", closeModal);

        window.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });
    }

    /* ---------------- TABS ---------------- */
    const tabs = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabs.forEach(btn => {
        btn.addEventListener("click", () => {
            tabs.forEach(b => b.classList.remove("active"));
            tabContents.forEach(c => c.style.display = "none");
            btn.classList.add("active");

            const targetContent = document.getElementById(btn.dataset.target);
            if (targetContent) targetContent.style.display = "block";
        });
    });

    /* ---------------- FADE-IN ---------------- */
    const fadeElements = document.querySelectorAll(".fade-in");
    const checkFade = () => {
        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) el.classList.add("show");
        });
    };
    window.addEventListener("scroll", checkFade);
    window.addEventListener("load", checkFade);
    checkFade();

    /* ---------------- LIGHTBOX ---------------- */
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    if (lightbox && lightboxImg) {
        document.querySelectorAll(".gallery-img").forEach(img => {
            img.addEventListener("click", () => {
                lightboxImg.src = img.src;
                lightbox.style.display = "flex";
            });
        });

        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) lightbox.style.display = "none";
        });
    }

    /* ============================================================
       NEW CLEAN SLIDESHOW — (THIS IS THE ONLY ONE THAT SHOULD RUN)
       ============================================================ */

    let slideIndex = 0;
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    function showSlide(n) {
        if (!slides.length) return;

        slideIndex = (n + slides.length) % slides.length;

        slides.forEach(slide => slide.style.display = "none");
        dots.forEach(dot => dot.classList.remove("active"));

        slides[slideIndex].style.display = "block";
        dots[slideIndex].classList.add("active");
    }

    function autoSlide() {
        slideIndex++;
        showSlide(slideIndex);
    }

    // Start slideshow
    showSlide(slideIndex);
    setInterval(autoSlide, 5000);

    // Controls
    if (prevBtn) prevBtn.addEventListener("click", () => showSlide(slideIndex - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => showSlide(slideIndex + 1));

    dots.forEach((dot, idx) => {
        dot.addEventListener("click", () => showSlide(idx));
    });

});
let slideIndex = 0;
showSlides(slideIndex);

// Next/Previous controls
document.querySelector('.prev').addEventListener('click', () => {
    showSlides(slideIndex -= 1);
});

document.querySelector('.next').addEventListener('click', () => {
    showSlides(slideIndex += 1);
});

// Dot controls
document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlides(slideIndex = index);
    });
});

function showSlides(n) {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");

    if (n >= slides.length) { slideIndex = 0; }
    if (n < 0) { slideIndex = slides.length - 1; }

    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Remove "active" from all dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

    // Show current slide + activate dot
    slides[slideIndex].style.display = "block";
    dots[slideIndex].classList.add("active");
}

// Auto-slide every 5 seconds
setInterval(() => {
    slideIndex++;
    showSlides(slideIndex);
}, 5000);
