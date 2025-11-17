document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".accordion-title").forEach(title => {
        title.addEventListener("click", () => {
            title.classList.toggle("active");
            const content = title.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
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

            const targetId = btn.dataset.target;
            const targetContent = document.getElementById(targetId);
            if (targetContent) targetContent.style.display = "block";
        });
    });

    const fadeElements = document.querySelectorAll(".fade-in");
    const checkFade = () => {
        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                el.classList.add("show");
            }
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
    const slides = document.querySelectorAll(".slide, .mySlides");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const dots = document.querySelectorAll(".dot");

    function showSlide(index) {
        if (!slides.length) return;

        slideIndex = (index + slides.length) % slides.length;

        slides.forEach(s => s.style.display = "none");
        slides[slideIndex].style.display = "block";

        if (dots.length) {
            dots.forEach(d => d.classList.remove("active"));
            if (dots[slideIndex]) dots[slideIndex].classList.add("active");
        }
    }

    showSlide(slideIndex);

    if (slides.length > 0) {
        setInterval(() => {
            slideIndex++;
            showSlide(slideIndex);
        }, 5000);
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            slideIndex++;
            showSlide(slideIndex);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            slideIndex--;
            showSlide(slideIndex);
        });
    }

    if (dots.length) {
        dots.forEach((dot, idx) => {
            dot.addEventListener("click", () => {
                showSlide(idx);
            });
        });
    }

    if (document.getElementById("map") && typeof ol !== "undefined") {

        const offices = [
            {
                id: "jhb",
                name: "Johannesburg Office",
                coords: [28.0567, -26.1076],
                address: "123 Legal Avenue, Sandton, Johannesburg",
                phone: "+27 11 123 4567"
            },
            {
                id: "cpt",
                name: "Cape Town Office",
                coords: [18.4241, -33.9249],
                address: "456 Justice Street, Cape Town City Centre",
                phone: "+27 21 234 5678"
            },
            {
                id: "dbn",
                name: "Durban Office",
                coords: [31.0292, -29.8579],
                address: "789 Constitution Road, Umhlanga, Durban",
                phone: "+27 31 345 6789"
            }
        ];

        function transformCoord(coord) {
            return ol.proj.fromLonLat(coord);
        }

        const map = new ol.Map({
            target: 'map',
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ],
            view: new ol.View({
                center: transformCoord([24.7, -28.5]),
                zoom: 6
            })
        });

        const markers = {};

        offices.forEach(o => {
            const marker = new ol.Feature({
                geometry: new ol.geom.Point(transformCoord(o.coords)),
                name: o.name,
                address: o.address,
                phone: o.phone
            });

            const vectorSource = new ol.source.Vector({
                features: [marker]
            });

            const markerVectorLayer = new ol.layer.Vector({
                source: vectorSource,
                style: new ol.style.Style({
                    image: new ol.style.Icon({
                        anchor: [0.5, 1],
                        src: 'https://cdn.jsdelivr.net/npm/ol@v7.4.0/examples/data/icon.png'
                    })
                })
            });

            map.addLayer(markerVectorLayer);
            markers[o.id] = marker;
        });

        const popupContainer = document.createElement('div');
        popupContainer.className = 'ol-popup';
        popupContainer.style.backgroundColor = 'white';
        popupContainer.style.padding = '5px';
        popupContainer.style.border = '1px solid black';
        popupContainer.style.position = 'absolute';
        popupContainer.style.display = 'none';
        document.body.appendChild(popupContainer);

        const overlay = new ol.Overlay({
            element: popupContainer,
            positioning: 'bottom-center',
            stopEvent: false,
            offset: [0, -15]
        });
        map.addOverlay(overlay);

        map.on('click', function (evt) {
            const feature = map.forEachFeatureAtPixel(evt.pixel, function(feature) {
                return feature;
            });
            if (feature) {
                const coords = feature.getGeometry().getCoordinates();
                overlay.setPosition(coords);
                popupContainer.innerHTML = `<b>${feature.get('name')}</b><br>${feature.get('address')}<br>Phone: ${feature.get('phone')}`;
                popupContainer.style.display = 'block';
            } else {
                popupContainer.style.display = 'none';
            }
        });

        document.querySelectorAll(".location-card").forEach(card => {
            card.style.cursor = "pointer";

            card.addEventListener("click", () => {
                const title = card.querySelector("h4").textContent.trim();
                const selected = offices.find(o => o.name === title);

                if (selected) {
                    map.getView().animate({
                        center: transformCoord(selected.coords),
                        zoom: 14,
                        duration: 1200
                    });

                    setTimeout(() => {
                        overlay.setPosition(transformCoord(selected.coords));
                        popupContainer.innerHTML = `<b>${selected.name}</b><br>${selected.address}<br>Phone: ${selected.phone}`;
                        popupContainer.style.display = 'block';
                    }, 1200);
                }
            });
        });
    }

});

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