// 1. Конвертті ашу
function openEnvelope() {
    document.querySelector('.envelope').classList.add('open');

    // 1.5 секунд анимациядан кейін негізгі бетті көрсету
    setTimeout(() => {
        const wrapper = document.getElementById('envelope-wrapper');
        wrapper.style.opacity = '0';
        setTimeout(() => {
            wrapper.style.display = 'none';
            document.getElementById('full-invitation').style.display = 'block';
            // Музыканы автоматты қосу (браузер рұқсат берсе)
            toggleMusic();
        }, 1000);
    }, 1500);
}

// 2. Скролл анимациясы (Scroll Reveal)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 3. Галерея (Свайп және Авто-слайд)
const images = ["images/photo1.png", "images/photo2.png", "images/photo3.png", "images/photo4.png", ];
let index = 0;
const sImg = document.getElementById('slider-img');

function moveSlide(step) {
    index = (index + step + images.length) % images.length;
    sImg.style.opacity = 0;
    setTimeout(() => {
        sImg.src = images[index];
        sImg.style.opacity = 1;
    }, 300);
}
setInterval(() => moveSlide(1), 4000); // Автоматты ауысу

let startX = 0;
const slider = document.getElementById('main-slider');
slider.addEventListener('touchstart', e => startX = e.touches[0].clientX);
slider.addEventListener('touchend', e => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) moveSlide(1);
    if (endX - startX > 50) moveSlide(-1);
});

// 4. Музыканы басқару
function toggleMusic() {
    const audio = document.getElementById('wedding-audio');
    const icon = document.getElementById('music-icon');
    if (audio.paused) {
        audio.play();
        icon.className = 'fa-solid fa-circle-pause';
    } else {
        audio.pause();
        icon.className = 'fa-solid fa-circle-play';
    }
}
// Тойдың басталатын уақыты (2026 жыл, 24 шілде, 18:00)
const weddingDate = new Date("July 24, 2026 18:00:00").getTime();

const countdownFunction = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    // Күн, сағат, минут, секундтарды есептеу
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Нәтижені экранға шығару
    document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;

    // Егер уақыт өтіп кетсе
    if (distance < 0) {
        clearInterval(countdownFunction);
        document.querySelector(".countdown-section").innerHTML = "<h3>Той басталды!</h3>";
    }
}, 1000);
function createPetal() {
    const container = document.getElementById('rose-container');
    if (!container) return; // Егер контейнер табылмаса, функция тоқтайды

    const petal = document.createElement('div');
    petal.className = 'rose-petal';

    // Кездейсоқ өлшем (10px мен 20px аралығында)
    const size = Math.random() * 10 + 10 + 'px';
    petal.style.width = size;
    petal.style.height = size;

    // Кездейсоқ орын (экранның ені бойынша)
    petal.style.left = Math.random() * 100 + 'vw';

    // Кездейсоқ түсу жылдамдығы (5 сек мен 8 сек аралығында)
    const duration = Math.random() * 3 + 5 + 's';
    petal.style.animationDuration = duration;

    // Сәл кездейсоқ түс реңкі (нағыз гүл сияқты көрінуі үшін)
    const shades = ['#ff4d4d', '#e63946', '#d62828', '#f77f00'];
    petal.style.backgroundColor = shades[Math.floor(Math.random() * shades.length)];

    container.appendChild(petal);

    // Жапырақ жерге жеткенде оны өшіру (браузер қатып қалмауы үшін)
    setTimeout(() => {
        petal.remove();
    }, 8000); // 8 секундтан кейін элемент өшіріледі
}

// Жапырақтарды тудыруды бастау (әр 0.3 секунд сайын)
setInterval(createPetal, 300);

// 1. СУРЕТТЕР ТІЗІМІ (Әрқайсысы бірегей болсын)
const myPhotos = [
    'images/k1.jpeg', 'images/k2.jpeg', 'images/k3.jpeg', 'images/k4.jpeg',
    'images/k5.png', 'images/k6.png', 'images/k7.png', 'images/k8.png'
];

const section = document.getElementById('collage-section');
const photoObjects = [];
let maxScrollReached = 0; // Ең жоғарғы жеткен скролл нүктесі

function initCollage() {
    if (!section) return;

    myPhotos.forEach((src, i) => {
        const div = document.createElement('div');
        div.className = 'collage-item';

        const img = document.createElement('img');
        img.src = src;
        div.appendChild(img);

        const isLeft = i % 2 === 0;
        // Суреттер экранның шетінен емес, сәл жақынырақтан басталады
        const startX = isLeft ? -150 : window.innerWidth + 20;
        const startY = (i * (window.innerHeight / myPhotos.length)) + (Math.random() * 50);
        const rotate = (Math.random() - 0.5) * 30;

        div.style.top = startY + 'px';
        div.style.left = startX + 'px';
        div.style.transform = `rotate(${rotate}deg)`;

        photoObjects.push({
            el: div,
            x: startX,
            // Суреттер ортаға жақынырақ келеді (жақын орналасу үшін)
            moveDistance: isLeft ? 180 : -180,
            rotation: rotate
        });

        section.appendChild(div);
    });
}

// 2. СКРОЛЛ ЛОГИКАСЫ (ТЕК АЛҒА ЖЫЛЖЫТУ)
window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    // Егер біз бұрынғыдан төмен түссек қана анимация жүреді
    if (currentScroll > maxScrollReached) {
        maxScrollReached = currentScroll;
    }

    // Анимация тек maxScrollReached бойынша есептеледі
    const scrollFactor = maxScrollReached / (document.body.scrollHeight - window.innerHeight);

    photoObjects.forEach(obj => {
        const currentX = obj.moveDistance * scrollFactor;
        const currentY = -maxScrollReached * 0.1; // Параллакс та тек алға жүреді

        obj.el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) rotate(${obj.rotation}deg)`;
    });
});

document.addEventListener('DOMContentLoaded', initCollage);

// 5. Telegram RSVP
document.getElementById('telegram-form').onsubmit = function(e) {
    e.preventDefault();
    const token = "СЕНІҢ_БОТ_ТОКЕНІҢ"; // BotFather-дан ал
    const chatId = "СЕНІҢ_ID"; // userinfobot-тан ал
    const name = document.getElementById('guest-name').value;
    const count = document.getElementById('guest-count').value;

    const text = `🔔 Жаңа жауап!\n👤 Аты: ${name}\n👥 Саны: ${count}`;
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`;

    fetch(url).then(() => {
        alert("Жауабыңыз жіберілді! Рақмет.");
        this.reset();
    });
};