document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MENIU MOBIL (☰)
    const menuIcon = document.querySelector('.mobile-menu-icon');
    const navUl = document.querySelector('nav ul');
    if (menuIcon && navUl) {
        menuIcon.onclick = () => {
            navUl.classList.toggle('active');
            menuIcon.innerHTML = navUl.classList.contains('active') ? '✕' : '☰';
        };
    }

    // 2. MODAL PROGRAMARE HEADER
    const modalContact = document.getElementById("modal-contact");
    const btnProgramare = document.getElementById("programare-btn-header");
    const inchideProgramare = document.querySelector("#modal-contact .inchide-modal");

    if (btnProgramare) {
        btnProgramare.onclick = (e) => { 
            e.preventDefault();
            modalContact.style.display = "flex"; 
        };
    }
    if (inchideProgramare) {
        inchideProgramare.onclick = () => { modalContact.style.display = "none"; };
    }

    // 3. ACORDEON TARIFE
    const accordions = document.querySelectorAll(".accordion-header");
    accordions.forEach(acc => {
        acc.onclick = function() {
            this.classList.toggle("active");
            const panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        };
    });

    // 4. GALERIE FOTO (LIGHTBOX) + SĂGEȚI + TASTATURĂ
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('#lightbox .close-btn');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const galleryImages = Array.from(document.querySelectorAll('.galerie-foto'));
    let currentIndex = 0;

    const showImage = (index) => {
        currentIndex = index;
        lightboxImg.src = galleryImages[currentIndex].src;
    };

    galleryImages.forEach((img, index) => {
        img.onclick = () => {
            currentIndex = index;
            lightbox.style.display = "block";
            showImage(currentIndex);
        };
    });

    // Funcții de navigare
    const navigateNext = () => {
        currentIndex = (currentIndex < galleryImages.length - 1) ? currentIndex + 1 : 0;
        showImage(currentIndex);
    };

    const navigatePrev = () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : galleryImages.length - 1;
        showImage(currentIndex);
    };

    if (nextBtn) nextBtn.onclick = (e) => { e.stopPropagation(); navigateNext(); };
    if (prevBtn) prevBtn.onclick = (e) => { e.stopPropagation(); navigatePrev(); };
    if (closeLightbox) closeLightbox.onclick = () => { lightbox.style.display = "none"; };

    // CONTROL DE LA TASTATURĂ
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === "block") {
            if (e.key === "ArrowRight") navigateNext();
            if (e.key === "ArrowLeft") navigatePrev();
            if (e.key === "Escape") lightbox.style.display = "none";
        }
    });

    // 5. MODAL SERVICII (Pop-up iconițe)
    window.serviceData = [
        { title: "Stomatologie generală", desc: "Stomatologia generală înseamnă grija zilnică pentru sănătatea ta orală. Ne ocupăm de carii, detartraje și alte probleme de zi cu zi. Te așteptăm pentru controale de rutină și tratamente curative sau profilactice, esențiale pentru menținerea unui zâmbet sănătos.", img: "imagini/nu.webp" },
        { title: "Chirurgie", desc: "Anumite afecțiuni dentare necesită soluții chirurgicale precise. Fie că este vorba de chisturi, de extracții simple sau a măselelor de minte, tratăm totul cu grijă, profesionalism și confort pentru pacient.", img: "imagini/chirurgie-oro-dentara.webp" },
        { title: "Endodonție", desc: "Un dinte afectat nu trebuie să fie pierdut. Tratamentul de canal salvează dinții compromiși și elimină durerea, păstrând integritatea naturală a zâmbetului tău.", img: "imagini/endod.webp" },
        { title: "Estetică", desc: "Un zâmbet frumos înseamnă mai multă încredere în tine. Tratamentele dentare estetice îți oferă albire, corecții și soluții personalizate pentru a obține zâmbetul pe care ți-l dorești.", img: "imagini/esteti.webp" },
        { title: "Protetică", desc: "Dinții deteriorați sau lipsă îți pot afecta sănătatea și confortul zilnic. Lucrările protetice restabilesc funcția și frumusețea danturii, oferindu-ți libertatea de a zâmbi și de a mesteca fără griji.", img: "imagini/prot.webp" },
        { title: "Implantologie", desc: "Lipsa unui dinte poate afecta atât funcționalitatea, cât și încrederea în sine. Cu ajutorul implanturilor dentare îți oferim o soluție sigură și estetică pentru a reda estetica și funcționalitatea unui zâmbet natural.", img: "imagini/implantologie-dentara1.webp" },
        { title: "Pedodonție", desc: "Dinții sănătoși din copilărie sunt fundamentul unei danturi sănătoase pe viață. Pedodonția are grijă de micii pacienți cu blândețe și răbdare pentru a preveni problemele și pentru a forma obiceiuri corecte de igienă orală.", img: "imagini/Pedodontie.webp" },
        { title: "Ortodonție", desc: "Dinți aliniați corect nu înseamnă doar frumusețe, ci și sănătate. Cu ajutorul aparatelor ortodontice ajutăm pacienții de toate vârstele să obțină un zâmbet armonios și funcțional, prevenind problemele viitoare.", img: "imagini/vnsd.webp" },
        { title: "Parodontologie", desc: "Sănătatea gingiilor este esențială pentru dinți puternici și un zâmbet de durată. Tratamentele parodontale previn pierderea dinților și mențin echilibrul întregii cavități orale.", img: "imagini/nd.webp" }
    ];
   window.openService = function(index) {
    const sModal = document.getElementById("serviceModal");
    const sBody = document.getElementById("modalBody");
    const data = window.serviceData[index];
    if (sModal && sBody && data) {
        sBody.innerHTML = `
            <h2 style="color:#0056b3; margin-bottom:15px; font-family:'Montserrat'; text-align: center;">${data.title}</h2>
            
            <div class="modal-image-container">
                <img src="${data.img}" alt="${data.title}">
            </div>
            
            <p style="color:#444; line-height:1.6; text-align: justify;">${data.desc}</p>
        `;
        sModal.style.display = "flex";
    }
};
    window.closeService = function() {
        const sModal = document.getElementById("serviceModal");
        if (sModal) sModal.style.display = "none";
    };

    // 6. ÎNCHIDERE LA CLICK PE FUNDAL
    window.onclick = (event) => {
        if (event.target == modalContact) modalContact.style.display = "none";
        if (event.target == lightbox) lightbox.style.display = "none";
        if (event.target == document.getElementById("serviceModal")) window.closeService();
    };
});document.addEventListener('DOMContentLoaded', function() {
    const cardMaria = document.getElementById('card-maria');
    const infoMaria = document.getElementById('info-maria');
    const nrTelefon = "0745 515 477"; // Pune aici numărul ei real

    if (cardMaria && infoMaria) {
        cardMaria.addEventListener('click', function() {
            // Schimbăm textul specializării cu numărul de telefon
            infoMaria.innerHTML = `<p style="color: #00a8cc; font-weight: bold; font-size: 1.2rem; margin-top: 10px;">
                                    <i class="fas fa-phone-alt"></i> ${nrTelefon}
                                   </p>
                                   <p style="font-size: 0.8rem; color: #777;">Se apelează...</p>`;
            
            // După o secundă, declanșăm apelul automat
            setTimeout(function() {
                window.location.href = "tel:" + nrTelefon.replace(/\s/g, '');
            }, 500);
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    var video = document.getElementById('hero-video');
    

    // Dacă telefonul l-a blocat, îl pornim la prima atingere a ecranului
    var playVideoOnTouch = function() {
        video.play();
        document.removeEventListener('touchstart', playVideoOnTouch);
    };

    document.addEventListener('touchstart', playVideoOnTouch);
});

window.scrollSlider = function(amount) {
    const slider = document.getElementById('testimonialSlider');
    if (slider) {
        slider.scrollBy({
            left: amount,
            behavior: 'smooth'
        });
    }
};
