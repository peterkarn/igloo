const navOpen = document.querySelector(".menu-icon");
const navClose = document.querySelector(".header__nav-close");
const navWrapper = document.querySelector(".header__nav");
const headerLogo = document.querySelector(".header__logo");
const navLink = document.querySelectorAll('.header__list-item a');
const main = document.querySelector(".main");
const body = document.querySelector(".body");
const headerBtn = document.querySelector(".header__btn");


navOpen.addEventListener("click", function () {
  navWrapper.classList.add("active");
  headerLogo.classList.add("blured");
  navOpen.classList.add("blured");
  main.classList.add("blured");
  body.classList.add('locked');
  this.setAttribute("aria-label", "close menu");
  this.setAttribute("aria-expanded", "true");
});
navClose.addEventListener("click", function () {
  navWrapper.classList.remove("active");
  this.setAttribute("aria-label", "");
  this.setAttribute("aria-expanded", "");
  headerLogo.classList.remove("blured");
  main.classList.remove("blured");
  navOpen.classList.remove("blured");
  body.classList.remove('locked');
});

navLink.forEach((element) => {
  element.addEventListener('click', function () {
    headerLogo.classList.remove("blured");
    main.classList.remove("blured");
    navWrapper.classList.remove("active");
    navOpen.classList.remove("blured");
  });
});

headerBtn.addEventListener('click', () => {
  headerLogo.classList.remove("blured");
  navWrapper.classList.remove("active");
  navOpen.classList.remove("blured");
  main.classList.remove("blured");
});

//===========cheader fixed with scroll============

let scrollpos = window.scrollY;
let header = document.querySelector(".header");

function add_class_on_scroll() {
  header.classList.add("scrollable");
  main.classList.add("scrollable");
}

function remove_class_on_scroll() {
  header.classList.remove("scrollable");
  main.classList.remove("scrollable");
}

window.addEventListener('scroll', function () {
  scrollpos = window.scrollY;
  if (scrollpos > 70) {
    add_class_on_scroll();
  } else {
    remove_class_on_scroll();
  }
});

//===========webP support============

function testWebP(callback) {

  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

  if (support == true) {
    document.querySelector('body').classList.add('webp');
  } else {
    document.querySelector('body').classList.add('no-webp');
  }
});

//tabs

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelector('.tabs');
  const tabsBtn = document.querySelectorAll('.tabs__item');
  const tabsContent = document.querySelectorAll('.tabs__content');

  if (tabs) {
    tabsBtn.forEach((element) => {
      element.addEventListener('click', function () {
        const tabsPath = element.dataset.tabsPath;
        tabsHandler(tabsPath);
      });
    });

  }
  const tabsHandler = (path) => {
    tabsBtn.forEach(el => {
      el.classList.remove('tabs__item_active')
    });
    document.querySelector(`[data-tabs-path="${path}"]`).classList.add('tabs__item_active');

    tabsContent.forEach(el => {
      el.classList.remove('tabs__content_active', 'fade-in-top')
    });
    document.querySelector(`[data-tabs-target="${path}"]`).classList.add('tabs__content_active', 'fade-in-top');
  };
});

//form field activity

formField = document.querySelectorAll('.form__field');
select = document.querySelectorAll('.select');

select.forEach((el) => {
  el.onfocus = function () {
    el.parentNode.classList.add('focus')
  }
  el.onblur = function () {
    el.parentNode.classList.remove('focus')
  }
});


//slider

var mySwiper = new Swiper('.reviews__container', {
  direction: 'horizontal',
  loop: true,
  spaceBetween: 20,
  // autoHeight: true,
  breakpoints: {
    320: {
      slidesPerView: 1.1,
      // autoHeight: true,
    },
    1400: {
      slidesPerView: 1.3,
      autoHeight: false,
    },
  },
  pagination: {
    el: '.reviews__pagination',
    type: 'fraction',
  },
  navigation: {
    nextEl: '.reviews__prev',
    prevEl: '.reviews__next',
  },

  scrollbar: {
    el: '.reviews__scrollbar',
    draggable: true,
  },
});


// modals
document.addEventListener('click', function (e) {
  e = e || window.event;
  var target = e.target || e.srcElement;

  if (target.hasAttribute('data-toggle') && target.getAttribute('data-toggle') == 'modal') {
    if (target.hasAttribute('data-target')) {
      var m_ID = target.getAttribute('data-target');
      document.getElementById(m_ID).classList.add('open');
      body.classList.add('locked');
      header.classList.add('blur');
      main.classList.add('blur');
      e.preventDefault();
    }
  }
  if ((target.hasAttribute('data-dismiss') && target.getAttribute('data-dismiss') == 'modal') || target.classList.contains('modal')) {
    e.preventDefault();
    var modal = document.querySelector('[class="modal open"]');
    modal.classList.remove('open');
    body.classList.remove('locked');
    header.classList.remove('blur');
    main.classList.remove('blur');
    formValue.setAttribute('value', 'Пользователь не указал значение');
  }
}, false);


//forms

const phoneInput = document.querySelectorAll('input[type="tel"]'),
  im = new Inputmask('+7 (999) 999-99-99');
im.mask(phoneInput);

let validateForms = function (selector, rules, successModal, yaGoal) {
  new window.JustValidate(selector, {
    rules: rules,
    messages: {
      name: {
        required: 'Обязательное поле',
        minLength: 'Минимум 3 символа'
      },
      tel: {
        required: 'Обязательное поле'
      }
    },
    submitHandler: function (form) {
      let formData = new FormData(form);

      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            alert('Ваши данные успешно отправлены')
          } else {
            console.log('waiting')
          }
        }
      }
      xhr.open('POST', 'mail.php', true)
      xhr.send(formData);
      form.reset();
    }
  });
}

validateForms('.form', {
  tel: {
    required: true
  }
}, '.thanks-popup', 'send goal');

validateForms('.request__form', {
  tel: {
    required: true
  }
}, '.thanks-popup', 'send goal');

validateForms('.modal-form', {
  tel: {
    required: true
  }
}, '.thanks-popup', 'send goal');

// button info into the form

const formButton = document.querySelectorAll('.btn');
const formValue = document.querySelector('.order');
formButton.forEach((element) => {
  element.addEventListener('click', function () {
    formValue.setAttribute('value', element.getAttribute('value'));
  });
});