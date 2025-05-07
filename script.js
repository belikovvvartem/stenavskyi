const swiper = new Swiper(".swiper-container", {
    speed: 900,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: true,
        pauseOnMouseEnter: true
    },
    pagination: {
        el: ".swiper-pagination"
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    }
});

function toggleAnswer(element) {
    const answer = element.nextElementSibling;
    const arrow = element.querySelector('.arrow');

    if (answer.classList.contains("active")) {
        answer.classList.remove("active");
        arrow.style.transform = "rotate(0deg)";
    } else {
        answer.classList.add("active");
        arrow.style.transform = "rotate(330deg)";
    }
}

const input = document.querySelector("#phone");
window.intlTelInput(input, {
    initialCountry: "auto",
    geoIpLookup: callback => {
        fetch("https://ipapi.co/json")
            .then(res => res.json())
            .then(data => callback(data.country_code))
            .catch(() => callback("UA"));
    },
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@17/build/js/utils.js"
});

document.querySelector('.contact-us').addEventListener('click', function () {
    document.querySelector('#Contact').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

document.querySelector('.logo-footer').addEventListener('click', function () {
    document.querySelector('#Home').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const comment = document.getElementById('comment').value.trim();
    const typeInput = document.querySelector('input[name="type"]:checked');
    const type = typeInput ? typeInput.value : 'Не вказано';

    const message = `🧑 Нове звернення\n📇 Name: ${name}\n📞 Tel: ${phone}\n📄 Type: ${type}\n💬 Comment: ${comment || 'Немає коментаря'}`;

    const adminChatId = '1113969494';
    const clientChatId = '744263334';7034327346
    const token = '7405695029:AAHS1Kw6ieOvbyVS98ln3OsaN1ds9nfybhc'; 

    function sendMessage(chatId, label) {
        fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML' 
            }),
        })
        .then(res => res.json())
        .then(data => {
            console.log(`${label}:`, data);
            if (!data.ok) console.error(`${label} error:`, data.description);
        })
        .catch(err => console.error(`${label} fetch error:`, err));
    }

    sendMessage(adminChatId, 'Admin');
    sendMessage(clientChatId, 'Client');

    document.getElementById('contact-form').reset();
});