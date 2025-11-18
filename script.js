document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".accordion-title").forEach(title => {
        title.addEventListener("click", () => {
            title.classList.toggle("active");
            const content = title.nextElementSibling;
            content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + "px";
        });
    });

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

    showSlide(slideIndex);
    setInterval(autoSlide, 5000);

    if (prevBtn) prevBtn.addEventListener("click", () => showSlide(slideIndex - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => showSlide(slideIndex + 1));

    dots.forEach((dot, idx) => {
        dot.addEventListener("click", () => showSlide(idx));
    });

    const mapContainer = document.getElementById("map");
    if (mapContainer) {

        const map = L.map("map").setView([-26.2041, 28.0473], 5);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        const offices = [
            {
                name: "Johannesburg Office",
                coords: [-26.1076, 28.0567],
                address: "123 Legal Avenue, Sandton, Johannesburg"
            },
            {
                name: "Cape Town Office",
                coords: [-33.9249, 18.4241],
                address: "456 Justice Street, Cape Town City Centre, Cape Town"
            },
            {
                name: "Durban Office",
                coords: [-29.8579, 31.0292],
                address: "789 Constitution Road, Umhlanga, Durban"
            }
        ];

        offices.forEach(office => {
            L.marker(office.coords)
                .addTo(map)
                .bindPopup(`<b>${office.name}</b><br>${office.address}`);
        });

        const bounds = L.latLngBounds(offices.map(o => o.coords));
        map.fitBounds(bounds, { padding: [50, 50] });
    }

});