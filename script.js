const swiper = new Swiper(".swiper-container", {
    speed: 900,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false, 
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

const inputPhone = document.getElementById("phone");
inputPhone.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "");
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

document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const comment = document.getElementById('comment').value.trim();
    const typeInput = document.querySelector('input[name="type"]:checked');
    const type = typeInput ? typeInput.value : 'Не вказано';

    const message = `🧑 Нове звернення\n📇 Name: ${name}\n📞 Tel: ${phone}\n📄 Type: ${type}\n💬 Comment: ${comment || 'Немає коментаря'}`;

    const adminChatId = '1113969494';
    const clientChatId = '744263334'; 7034327346
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



const modal = document.getElementById('privacy-modal');
const openBtn = document.getElementById('open-privacy');
const closeBtn = document.querySelector('.close-btn');

openBtn.addEventListener('click', function (e) {
    e.preventDefault();
    modal.style.display = 'block';
});
closeBtn.addEventListener('click', function () {
    modal.style.display = 'none';
});
window.addEventListener('click', function (e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});



  function openModal(id) {
    const modal = document.getElementById(id);
    modal.classList.add("show");
  }

  function closeModal(id) {
    const modal = document.getElementById(id);
    modal.classList.remove("show");
  }

  window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
      event.target.classList.remove("show");
    }
  }


  document.addEventListener('keydown', function (e) {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && ['I', 'C', 'J'].includes(e.key)) ||
      (e.ctrlKey && ['U', 'S'].includes(e.key))
    ) {
      e.preventDefault();
      alert('Access denied');
      return false;
    }
  });

  // Спроба заборонити відкриття правою кнопкою миші
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    alert('Right click disabled');
  });

  // Спроба виявлення DevTools (ненадійно)
  setInterval(() => {
    const before = performance.now();
    debugger;
    const after = performance.now();
    if (after - before > 100) {
      alert('DevTools detected');
      window.close(); // або location.href = 'about:blank'
    }
  }, 1000);