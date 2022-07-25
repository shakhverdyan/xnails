

const burger = document.querySelector('.burger');
const navBlock = document.querySelector('.header__nav');

const nailsBtn = document.querySelector('[data-design="nails"]');
const nailsPrice = document.querySelector('.nails-price');
const priceListText = document.querySelector('.nail-arrow');

const tab = document.querySelector('.tab');
const priceList = document.querySelectorAll('.price-list');
const serviceLink = document.querySelectorAll('.service__link ');

const countBlock = document.querySelector('.counter-block');
const count1 = document.querySelector('.count1');
const count2 = document.querySelector('.count2');
const count3 = document.querySelector('.count3');

const portfolioSliderLink = document.querySelectorAll('.portfolio-slider-img');
const portfolioBlock = document.querySelector('.portfolio')
const portfolioSliderShow = document.querySelector('.portfolio-slider_show');
const div = document.createElement('div');
const image = document.createElement('img');

const giftBtn = document.querySelector('[data-name="gift-btn"]');
const modalGift = document.querySelector('.modal-gift');
const menuLink = document.querySelectorAll('.scroll');

burger.addEventListener('click', () => {
  burger.classList.toggle('burger-active');
  navBlock.classList.toggle('header__nav-active');
})



const outNim = (num, elem, time, step) => {
  const summaElem = document.querySelector(elem);
  let count = 0;
  let timeOnstep = Math.round(time / (num / step));
  let interval = setInterval(() => {
    count = count + step;
    if (count == num) clearInterval(interval);

    let formatter = new Intl.NumberFormat('ru');
    summaElem.textContent = formatter.format(count);
  }, timeOnstep);

}


const countObserver = new IntersectionObserver((entries, observer) => {
  if (entries[0].isIntersecting) {
    outNim(4, '.count1', 2000, 1);
    outNim(10000, '.count2', 3000, 250);
    outNim(3, '.count3', 2000, 1);

    observer.unobserve(entries[0].target)
  }
},
  {
    threshold: 0.6,

  })

countObserver.observe(countBlock);



new Swiper('.swiper-slider-1', {
  pagination: {
    el: '.swiper-pagination',
  },
});

new Swiper('.portfolio-slider', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  slidesPerView: 4,
  spaceBetween: 10,
  loop: true,


  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    // when window width is >= 320px
    576: {
      slidesPerView: 2,
      spaceBetween: 10
    },
    // when window width is >= 480px
    768: {
      slidesPerView: 2.5,
      spaceBetween: 10
    },
    // when window width is >= 640px
    992: {
      slidesPerView: 3,
      spaceBetween: 10
    },
    1124: {
      slidesPerView: 4,
      spaceBetween: 10
    }
  }
});


new Swiper('.feedback-slider', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

//плавное открытие блока
nailsBtn.addEventListener('click', e => {
  e.preventDefault();
  priceListText.classList.toggle('price-list__text-active');
  if (nailsPrice.classList.contains('pl')) {
    nailsPrice.style.height = '';
    nailsPrice.classList.remove('pl');
  }
  else {
    nailsPrice.style.height = nailsPrice.scrollHeight + 'px';
    nailsPrice.classList.add('pl');
  }

})




tab.addEventListener('click', e => {
  e.preventDefault();
  serviceLink.forEach(item => item.classList.remove('service__link-active'));
  if (e.target.classList.contains('service__link')) {
    e.target.classList.add('service__link-active');

    priceList.forEach(list => {
      list.classList.add('hide')
      if (e.target.dataset.name === list.dataset.name) {
        list.classList.remove('hide')
      }
    })
  }
})

const portfoliLinkImg = document.querySelectorAll('.portfolio-slider-link');

portfoliLinkImg.forEach(link => {
  link.addEventListener('click', (e) => {
    let getImg = e.target.closest('.portfolio-slider-link').querySelector('.portfolio-slider-img');

    e.preventDefault();
    div.classList.add('portfolio-slider_show_img');
    image.style.maxWidth = '100%';
    image.src = getImg.src;
    image.classList.add('show-img');
    div.append(image);
    portfolioBlock.append(div);
    portfolioSliderShow.classList.remove('hide');
  })
})





document.body.addEventListener('click', e => {

  if (e.target == portfolioSliderShow || e.target.classList.contains('show-img')) {
    portfolioSliderShow.innerHTML = '';
    image.remove();
    portfolioSliderShow.classList.add('hide');
  }
})


//кнопка открыть комментарий полностью в отзывах
const feddbackText = document.querySelectorAll('.feedback__slide-item-text');
let maxTextSymbol = 200;

feddbackText.forEach(text => {
  if (text.innerText.length > maxTextSymbol) {
    const AllTextFeedback = text.innerText;

    let shortFeedback = text.innerText.substring(0, maxTextSymbol);
    text.innerText = shortFeedback;

    const btnmore = document.createElement('a');
    btnmore.textContent = '... ещё';
    btnmore.style.color = '#ABABAB';
    text.append(btnmore);

    btnmore.addEventListener('click', (e) => {
      e.preventDefault();
      text.innerText = AllTextFeedback;
      btnmore.remove();
    })
  }
})





menuLink.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    if (navBlock.classList.contains('header__nav-active')) {
      navBlock.classList.remove('header__nav-active');
      burger.classList.remove('burger-active');
    }

    let activeID = e.target.getAttribute('href').slice(1);
    document.querySelector(`#${activeID}`).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
})




giftBtn.addEventListener('click', (e) => {
  e.preventDefault();
  modalGift.classList.remove('hide');
})

modalGift.addEventListener('click', e => {
  if (e.target.classList.contains('modal-gift') || e.target.classList.contains('close')) modalGift.classList.add('hide');
})