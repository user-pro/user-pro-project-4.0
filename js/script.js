//             BURGER
 "use strict";

// $(document).ready(function() {
//    $('.header__burger').click(function(event) {                                           //класс бургера
//       $('.header__burger, .header__menu__links').toggleClass('active');                   //класс меню
//       $('body').toggleClass('_lock');
//    });
// });
const burger = document.querySelector('.header__burger'),
      bodyLocked = document.querySelector('body'),
      headerMenuLinks = document.querySelector('.nav__list');

burger.addEventListener('click', (event) => {
   burger.classList.toggle('_active');
   headerMenuLinks.classList.toggle('_active');
   body.classList.toggle('_lock');
});

// let firstSlider = $('.choose-slider-1');
// if(document.documentElement.clientWidth > 1365){
// 	if (firstSlider.length) {
// 	  let currentSlide,
// 	   	slidesCount,
// 	   	sliderCounter = document.createElement('div');
// 	  sliderCounter.classList.add('slider__counter');
	
// 	  let updateSliderCounter = function(slick, currentIndex) {
// 	    	currentSlide = slick.slickCurrentSlide() + 1;
// 	    	slidesCount = slick.slideCount;
// 	    $(sliderCounter).text(currentSlide + '/' + slidesCount)
// 	  };

// 	  firstSlider.on('init', function(event, slick) {
// 			firstSlider.append(sliderCounter);
// 	    	updateSliderCounter(slick);
// 	  });

// 	  firstSlider.on('afterChange', function(event, slick, currentSlide) {
// 	    	updateSliderCounter(slick, currentSlide);
// 	  });
// 	}
// }

//slider

// // const slickNext = window.document.getElementsByClassName('.slick-next'),
// // 		slickPrev = window.document.querySelector('.slick-prev'),
// // 		sliderCounter = document.querySelector('.slider-counter__now');
		
// // slickNext.addEventListener("click", function () {
// // 	// sliderCounter.innerHTML = sliderCounter.value + 1;
// // });



// //slider-counter
// let slider1 = $('.choose-slider-1');
// if (slider1.length) {
//   let currentSlide,
//    	slidesCount,
//    	sliderCounter = document.createElement('div');
//   sliderCounter.classList.add('slider__counter');
  
//   let updateSliderCounter = function(slick, currentIndex) {
//     	currentSlide = slick.slickCurrentSlide() + 1;
//     	slidesCount = slick.slideCount;
//     $(sliderCounter).text(currentSlide + '/' + slidesCount)
//   };

//   slider1.on('init', function(event, slick) {
// 		slider1.append(sliderCounter);
//     	updateSliderCounter(slick);
//   });

//   slider1.on('afterChange', function(event, slick, currentSlide) {
//     	updateSliderCounter(slick, currentSlide);
//   });
// }

const popupLinks = document.querySelectorAll('.popup-link');  //CCЫЛКА НА ОТКРЫТИЕ POPUP
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');  //(КЛАСС HEADER'А)

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
   for (let index = 0; index < popupLinks.length; index++) {
      const popupLink = popupLinks[index];
      popupLink.addEventListener("click", function (e) {
         const popupName = popupLink.getAttribute('href').replace('#', '');
         const curentPopup = document.getElementById(popupName);
         popupOpen(curentPopup);
         e.preventDefault();
      });
   }
}
const popupCloseIcon = document.querySelectorAll('.close-popup');   // КЛАСС ЗАКРЫТИЯ
if (popupCloseIcon.length > 0) {
   for (let index = 0; index < popupCloseIcon.length; index++) {
      const el = popupCloseIcon[index];
      el.addEventListener('click', function (e) {
         popupClose(el.closest('.popup'));                          // КЛАСС POPUP
         e.preventDefault();
      });
   }
}

function popupOpen(curentPopup) {
   if (curentPopup && unlock) {
      const popupActive = document.querySelector('.popup.open');   // POPUP С КЛАССОМ OPEN
      if (popupActive) {
         popupClose(popupActive, false);
      } else {
         bodyLock();
      }
      curentPopup.classList.add('open');			             //ДОБАВИТЬ OPEN
      curentPopup.addEventListener("click", function (e){
         if (!e.target.closest('.popup__content')) {		    //СОДЕРЖИМОЕ POPUP
            popupClose(e.target.closest('.popup'));		    //КЛАСС POPUP
         }
      });
   }
}
function popupClose(popupActive, doUnlock = true) {
   if (unlock) {
      popupActive.classList.remove('open');			    //УДАЛИТЬ OPEN
      if (doUnlock) {
         bodyUnLock();
      }
   }
}

function bodyLock() {
   const LockPaddingValue = window.innerWidth - document.querySelector('html').offsetWidth + 'px';
   if (lockPadding.lenght > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
         const el = lockPadding[index];   
         el.style.paddingRight = LockPaddingValue;
      }
   }
   body.style.paddingRight = LockPaddingValue;
   body.classList.add('lock');					   //КЛАСС LOCK НА BODY

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}

function bodyUnLock() {
   setTimeout(function () {
      for ( let index = 0; index < lockPadding.length; index++) {
         const el = lockPadding[index];
         el.style.paddingRigth ='0px';
      }
      body.style.paddingRight = '0px';
      body.classList.remove('lock');				//УДАЛИТЬ КЛАСС LOCK НА BODY
   }, timeout);

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout)
}

document.addEventListener('keydown', function (e) {
   if (e.which === 27) {
      const popupActive = document.querySelector('.popup.open');   //POPUP С КЛАССОМ OPEN
      popupClose(popupActive);
   }
});

(function () {
   if (!Element.prototype.closest) {
      Element.prortotype.closest = function (css) {
         var node = this;
         while (node) {
            if (node.matches(css)) return node;
            else node = node.parentElement;
         }
         return null;
      };
   }
})();
(function () {
   if (!Element.prototype.matches) {
      Element.prototype.matches = Element.prototype.matchesMatchesSelector ||
         Element.prototype.webkitMatchesSelector ||
         Element.prototype.mozMatchesSelector ||
         Element.prototype.sMatchesSelector;
   }
})();
;
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
   }else{
      document.querySelector('body').classList.add('no-webp');
   }
});;
// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),position(digi),when(breakpoint)"
// e.x. data-da="item,2,992"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";

(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);
					//Заполняем массив первоначальных позиций
					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
					//Заполняем массив элементов 
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint,
						"type": daType
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);

		//Создаем события в точке брейкпоинта
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = el.type;

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}
	//Основная функция
	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				//Перебрасываем элементы
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				//Возвращаем на место
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		customAdapt();
	}

	//Вызов основной функции
	dynamicAdapt();

	//Функция возврата на место
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	//Функция получения индекса внутри родителя
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	//Функция получения массива индексов элементов внутри родителя 
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				//Исключая перенесенный элемент
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}
	//Сортировка объекта
	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) { return 1 } else { return -1 }
		});
	}
	//Дополнительные сценарии адаптации
	function customAdapt() {
		//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());;


