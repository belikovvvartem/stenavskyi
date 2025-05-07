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

document.querySelector('.contact-us').addEventListener('click', function() {
    document.querySelector('#Contact').scrollIntoView({
      behavior: 'smooth', 
      block: 'start' 
    });
  });

  document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const comment = document.getElementById('comment').value;
    const type = document.querySelector('input[name="type"]:checked') ? document.querySelector('input[name="type"]:checked').value : 'Не вказано';

    const message = `🧑🏼‍💻 Нове звернення:
    📇 Name: ${name}
    🔢 Tel: 3️⃣8️⃣0️⃣ ${phone}
    🧾 Type: ${type}
    🔡 Comment: ${comment || 'Немає коментаря'}`;

    const adminChatId = '1113969494';
    const clientChatId = '1746560477';
    const token = '7405695029:AAHS1Kw6ieOvbyVS98ln3OsaN1ds9nfybhc'; 

    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: adminChatId,
            text: message,
        }),
    });

    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: clientChatId,
            text: message,
        }),
    });
});

const form = document.getElementById('contact-form');

form.addEventListener('submit', function(e) {
  e.preventDefault(); 
  form.reset(); 
});