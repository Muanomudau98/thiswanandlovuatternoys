document.querySelectorAll(".accordion-title").forEach(title => {
    title.addEventListener("click", () => {
        title.classList.toggle("active");
        let content = title.nextElementSibling;
        content.style.display = content.style.display === "block" ? "none" : "block";
    });
});

const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");
const modal = document.getElementById("modal");

if (openModalBtn && closeModalBtn && modal) {
    openModalBtn.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
}

const tabs = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabs.forEach(btn => {
    btn.addEventListener("click", () => {
        
        tabs.forEach(b => b.classList.remove("active"));
        tabContents.forEach(c => c.style.display = "none");

        
        btn.classList.add("active");
        document.getElementById(btn.dataset.target).style.display = "block";
    });
});

const fadeElements = document.querySelectorAll(".fade-in");

window.addEventListener("scroll", () => {
    fadeElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add("show");
        }
    });
});

const addFaqBtn = document.getElementById("addFaq");
const faqList = document.getElementById("faqList");

if (addFaqBtn && faqList) {
    addFaqBtn.addEventListener("click", () => {
        const li = document.createElement("li");
        li.textContent = "New FAQ Item Added!";
        faqList.appendChild(li);
    });
}

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

document.querySelectorAll(".gallery-img").forEach(img => {
    img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightbox.style.display = "flex";
    });
});

if (lightbox) {
    lightbox.addEventListener("click", () => {
        lightbox.style.display = "none";
    });
}

const map = L.map('map').setView([-26.2041, 28.0473], 5); 

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
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
