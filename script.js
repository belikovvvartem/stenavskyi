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





document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    const phoneInput = document.getElementById('phone');
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notification-text');
    const closeBtn = document.getElementById('close-notification');

    // Авто-плюс
    phoneInput.addEventListener('focus', () => {
        if (!phoneInput.value.startsWith('+')) {
            phoneInput.value = '+' + phoneInput.value.replace(/\D/g, '');
        }
    });

    function showNotification(text) {
        notificationText.textContent = text;
        notification.style.display = 'flex';
    }

    closeBtn.addEventListener('click', () => {
        notification.style.display = 'none';
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const comment = document.getElementById('comment').value.trim();
        const typeInput = document.querySelector('input[name="type"]:checked');
        const type = typeInput ? typeInput.value : 'Не вказано';

        const rawPhone = phoneInput.value.trim().replace(/\D/g, '');
        const phone = '+' + rawPhone;

        const validOperatorsUA = ["39","50","63","66","67","68","73","91","92","93","94","95","96","97","98","99"];
        let isValid = false;

        if (phone.startsWith("+380") && phone.length === 13) {
            const operator = phone.slice(4, 6);
            isValid = validOperatorsUA.includes(operator);
        } else if (phone.startsWith("+420") && phone.length === 13) {
            isValid = true;
        } else if (phone.startsWith("+1") && phone.length === 12) {
            isValid = true;
        } else if (phone.startsWith("+44") && phone.length === 13 && phone[3] === '7') {
            isValid = true;
        }

        if (!isValid) {
            showNotification("Введіть правильний номер телефону.");
            return;
        }

        const message = `🧑 Нове звернення\n📇 Ім’я: ${name}\n📞 Телефон: ${phone}\n📄 Тип: ${type}\n💬 Коментар: ${comment || 'Немає'}`;
        const token = '7405695029:AAHS1Kw6ieOvbyVS98ln3OsaN1ds9nfybhc';
        const adminChatIds = ['1113969494', '1113969494'];

        Promise.all(adminChatIds.map(chatId =>
            fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: 'HTML'
                })
            }).then(res => res.json())
        )).then(responses => {
            const hasError = responses.some(r => !r.ok);
            if (hasError) {
                showNotification("Помилка надсилання. Спробуйте ще раз.");
            } else {
                showNotification("Звернення успішно надіслано!");
                form.reset();
            }
        }).catch(() => {
            showNotification("Помилка з'єднання з Telegram.");
        });
    });
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

  const buttons = document.querySelectorAll('#tab-buttons button');
  const tabs = document.querySelectorAll('.tab');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.dataset.tab;

      tabs.forEach(tab => {
        tab.classList.remove('active');
      });

      document.getElementById(targetId).classList.add('active');
    });
  });

  
  document.querySelectorAll('#tab-content button').forEach(button => {
    button.addEventListener('click', () => {
      const contactSection = document.getElementById('Contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  const toggleBtn = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  toggleBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    toggleBtn.textContent = mobileMenu.classList.contains("active") ? "✖" : "☰";
  });

  mobileMenu.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      toggleBtn.textContent = "☰";
    });
  });

//   // Блок правої кнопки
// document.addEventListener('contextmenu', e => e.preventDefault());

// // Блок клавіш (F12, Ctrl+Shift+I тощо)
// document.addEventListener('keydown', e => {
//   if (
//     e.key === 'F12' ||
//     (e.ctrlKey && e.shiftKey && ['I', 'J', 'C', 'U'].includes(e.key.toUpperCase())) ||
//     (e.ctrlKey && ['S', 'U'].includes(e.key.toUpperCase()))
//   ) {
//     e.preventDefault();
//     e.stopPropagation();
//     window.close();
//   }
// });

// // Перевірка DevTools через вимірювання часу
// (function detectDevTools() {
//   const threshold = 160;
//   let devtoolsOpen = false;

//   setInterval(() => {
//     const start = new Date();
//     debugger; // може викликати затримку
//     const end = new Date();
//     if (end - start > threshold) {
//       devtoolsOpen = true;
//       document.body.innerHTML = '';
//       alert("DevTools виявлено. Сторінку буде закрито.");
//       window.open('', '_self', '');
//       window.close();
//     }
//   }, 1000);
// })();

// // Перевірка розміру вікна (DevTools зменшує область перегляду)
// setInterval(() => {
//   if (window.outerWidth - window.innerWidth > 100) {
//     document.body.innerHTML = '';
//     alert("DevTools виявлено. Сторінку буде закрито.");
//     window.open('', '_self', '');
//     window.close();
//   }
// }, 1000);