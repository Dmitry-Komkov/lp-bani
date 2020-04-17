// Main js file
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#import-js-files

import $ from 'jquery';
 
global.jQuery = $;
global.$ = $;

import Foundation from 'foundation-sites';

// import { Tabs } from '~f/foundation.tabs';
// import {Sticky} from '~f/foundation.sticky';

import Swiper from '../../node_modules/swiper/js/swiper';

import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';


$(document).ready(function() {
  $(document).foundation();

  const body = document.body;

  const $photoFrame = $('#banner');
  const interchange = new Foundation.Interchange($photoFrame, {
    rules: [
      "[./assets/img/content/banner-bg-mob.png, small]"
    ]
  });

  const housesImgs = {
    'дом сказка': ['sauna-1.png', 'sauna-1.png']
  };


  const tabSlider1 = new Swiper('.tab-1-swiper-container', {
    slidesPerView: 1,
    spaceBetween: 25,
    freeMode: true,
    freeModeMomentum: true,
    pagination: {
      el: '.tab-1-swiper-pagination',
      type: 'bullets',
    }
  });

  const gallerySlider = new Swiper('.gallery__sw-container', {
    slidesPerView: 1,
    spaceBetween: 10,
    freeMode: true,
    freeModeMomentum: true,
    pagination: {
      el: '.gallery__pagination',
      type: 'bullets',
    }
  });

  const fbSlider = new Swiper('.feedbacks__swiper', {
    slidesPerView: 1,
    spaceBetween: 10,
    freeMode: true,
    freeModeMomentum: true,
    navigation:{
      nextEl: '.feedback-button-next',
      prevEl: '.feedback-button-prev',
    }
  });


  const questionsArrows = document.querySelectorAll('.questions__tab-btn');

  questionsArrows.forEach( btn => {
    btn.onclick = function() {showAnswer(btn)};
  })
  
  function showAnswer(btn) {
    btn.classList.toggle('active');
    btn.parentNode.classList.toggle('active');
    btn.parentNode.nextSibling.classList.toggle('active');
  };

  /*-----

  Модальное окно 1

  -----*/

  class Modal {
    constructor(modal, btn) {
        this.modal = modal;
        this.btn = btn;
        this.closeBtn = modal.querySelector('.close');

        this.btn.addEventListener('click', () => this.openModal(btn));
        this.closeBtn.addEventListener('click', () => this.closeModal());

        this.window = window;
        this.window.addEventListener('click', (event) => {
            if(event.target == this.modal) this.closeModal()
        });
    }

    openModal(btn) {
        this.modal.style.display = 'flex';
        body.style.height = '100vh';
        body.style.overflowY = 'hidden';
    }

    closeModal() {
        this.modal.style.display = 'none';
        body.style.height = '';
        body.style.overflowY = '';
    }
  };

  const modal1 = document.getElementById('modal-1');

  const modal1Btns = document.querySelectorAll('.modal-1-open');
  modal1Btns.forEach( btn => new Modal(modal1, btn));

  /*--- Модальное окно 2 ---*/

  class ModalCard extends Modal {
    openModal(btn) {
        this.modal.style.display = 'flex';
        body.style.height = '100vh';
        body.style.overflowY = 'hidden';

        const objName = btn.parentNode.parentNode.querySelector('.obj-name').textContent.toLowerCase();
        const objDescr = btn.parentNode.parentNode.querySelector('.obj-descr').textContent;
        const objPrice = btn.parentNode.parentNode.parentNode.querySelector('.slide-price').textContent;

        let swiperWrapper = this.modal.querySelector('.modal__swiper-wrapper');
        swiperWrapper.innerHTML = '';

        let swiper = new Swiper('.modal__swiper-container', {
          pagination: {
            el: `.modal__swiper-pagination`,
            type: 'bullets',
            clickable: true
          }
        });
        

        housesImgs[objName].forEach( item => {
          swiper.appendSlide(
            `<div class='swiper-slide modal-card-slide'>
              <img class="modal-card-image" src='./assets/img/content/${item}'>
            </div>`
          )
        });

        swiper.update();



        this.modal.querySelector('.name').textContent = objName;
        this.modal.querySelector('.descr').textContent = objDescr;
        this.modal.querySelector('.price').textContent = `Цена: ${objPrice}`;
    }
  }

  const modal2 = document.getElementById('modal-2');

  const modal2Btns = document.querySelectorAll('.modal-2-open');

  modal2Btns.forEach( btn => new ModalCard(modal2, btn));

  const modal3 = document.getElementById('modal-3');

  const modal3Btns = document.querySelectorAll('.modal-3-open');

  modal3Btns.forEach( btn => new Modal(modal3, btn));

  /*-----
  Пошаговая форма
  -----*/

  const nextStepBtn = document.querySelector('.next-step');
  nextStepBtn.addEventListener('click', (e) => nextStep(e));

  const prevStepBtn = document.querySelector('.prev-step');
  prevStepBtn.addEventListener('click', (e) => prevStep(e));

  const calcFormSubmit = document.querySelector('.calc-form-submit');

  const promoCircle = document.querySelector('.form__promo');

  function nextStep(e) {
    e.preventDefault();
    let activeField = document.querySelector('.questions-container.active');
    let nextSbl = activeField.nextSibling;

    if (nextSbl) {
      activeField.classList.toggle('active');
      nextSbl.classList.toggle('active');
    } else return

    if (nextSbl.classList.contains('final-step')) {
      nextStepBtn.style.display = 'none';
      calcFormSubmit.style.display = 'block';
      promoCircle.style.display = 'none';
    }

  }

  function prevStep(e) {
    e.preventDefault();
    let activeField = document.querySelector('.questions-container.active');
    let prevSbl = activeField.previousSibling;
    
    if (prevSbl) {
      activeField.classList.toggle('active');
      prevSbl.classList.toggle('active');
    } else return

    if (!prevSbl.classList.contains('final-step')) {
      nextStepBtn.style.display = 'block';
      calcFormSubmit.style.display = 'none';
      promoCircle.style.display = 'flex';
    }

  }
  

  /*-----
  Яндекс карта
  ----*/

  ymaps.ready(init);

    function init() {
        var myMap = new ymaps.Map("map", {
                center: [55.143018, 37.451330],
                zoom: 13,
                controls: ['zoomControl']
            }, {
                searchControlProvider: 'yandex#search'
            });

        myMap.geoObjects
            .add(new ymaps.Placemark([55.143018, 37.451330], {
                balloonContent: 'Бани от Петра'
            }, {
                preset: 'islands#icon',
                iconColor: '#00C537'
            }))
    }
  
})  
