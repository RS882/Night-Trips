function testWebP(callback) { // проверка поддерки браузером формата webp 

	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) { // есди да  body + класс webp

	if (support == true) {
		document.querySelector('body').classList.add('_webp');
	} else {
		document.querySelector('body').classList.add('_no-webp');
	}
});
function ibg() {

	let ibg = document.querySelectorAll(".ibg");
	for (let i = 0; i < ibg.length; i++) {
		if (ibg[i].querySelector('img')) {
			ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
		}
	}
}

ibg();
// header 
// add elem to html
addElemHtml();

//-search----------------------------

toggleClassActive('.search__lupe', '.form-search', '_active');
toggleClassActive('.search__lupe', '.search__lupe', '_active');

//-menu-------------------------
toggleClassActive('.menu__button', '.menu__links', '_active');
toggleClassActive('.menu__button', '.menu__button', '_active');
toggleClassLock('.menu__button', 'body', '_lock');

removeClassActive('.menu__close', '.menu__button', '_active');
removeClassActive('.menu__close', '.menu__links', '_active');

removeClassActive('.menu__link', '.menu__links', '_active');
removeClassActive('.menu__link', '.menu__button', '_active');


toglleClassWidthScreen(767.98, 'body', '_lock', '.menu__links', '_active');

// добавляет в html span для меню-бургер, фильтр для меню, и крестик для меню
function addElemHtml() {
	const elemLink = document.querySelector('.menu__links');
	const elem = document.querySelector('.menu__button');
	elemLink.insertAdjacentHTML('beforeend', '<li class="menu__close"></li>');
	elemLink.insertAdjacentHTML('afterbegin', '<li class="menu__blur"></li>');
	for (let i = 0; i < 3; i++) {
		elem.insertAdjacentHTML('beforeend', '<span></span>');

	}
}

// добавляет/удаляет  класс addClass к селекторам addClassSelectors при нажатии на сlickSelector
function toggleClassActive(clickSelector, addClassSelectors, addClass) {
	const iconMenu = document.querySelector(clickSelector);

	if (iconMenu != null) {
		const menuBody = document.querySelectorAll(addClassSelectors);

		iconMenu.addEventListener("click", function (e) {

			iconMenu.classList.toggle(addClass);
			menuBody.forEach((elem) => {
				elem.classList.toggle(addClass);
			});
		});
	}
}
// то же что и выше но при ширине меньше 767.98
function toggleClassLock(clickSelector, addClassSelectors, addClass) {
	const iconMenu = document.querySelector(clickSelector);

	if (iconMenu != null) {
		const menuBody = document.querySelectorAll(addClassSelectors);

		iconMenu.addEventListener("click", function (e) {

			const windowInnerWidth = window.innerWidth;
			if (windowInnerWidth <= 767.98) {

				iconMenu.classList.toggle(addClass);
				menuBody.forEach((elem) => {
					elem.classList.toggle(addClass);
				});
			}

		});
	}
}


// добавляет  класс addClass к селекторам addClassSelectors при нажатии на сlickSelector
function addClassActive(clickSelector, addClassSelectors, addClass) {
	const iconMenu = document.querySelector(clickSelector);

	if (iconMenu != null) {
		const menuBody = document.querySelectorAll(addClassSelectors);

		iconMenu.addEventListener("click", function (e) {

			iconMenu.classList.add(addClass);
			menuBody.forEach((elem) => {
				elem.classList.add(addClass);
			});
		});
	}
}




//  проверяет наличие класс removeClass  у селектора  removeClassSelectoк при клике на селекторі lickSelectors
function removeClassActive(clickSelectors, removeClassSelector, removeClass) {
	const clickElem = document.querySelectorAll(clickSelectors);
	clickElem.forEach(elem => {
		elem.addEventListener("click", function (params) {
			removeClassIfNull(removeClassSelector, removeClass);
		}
		);
	});

}





// добавлят/ удаляет  класс при ширине экрана меньше/больше maxWidth и наличие класса isClass у селектора isSelector(добавление)
function toglleClassWidthScreen(maxWidth, classSelector, addClass, isSelector, isClass) {

	// Условие для viewport шириной не более  maxWidth пикселей
	const mediaQuery = window.matchMedia(`(max-width: ${maxWidth}px)`);

	mediaQuery.addEventListener('change', function (mm) {
		//console.log(mediaQuery.matches);
		if (!mediaQuery.matches) {
			removeClassIfNull(classSelector, addClass);

		} else {
			const elem = document.querySelector(classSelector);
			const isActive = document.querySelector(isSelector).classList.contains(isClass);
			const isLock = elem.classList.contains(addClass);

			if (isActive && !isLock) {
				elem.classList.add(addClass);
			}
		}
	});

}

// проверят и если есть удалает класс removeClass
function removeClassIfNull(elem, removeClass) {
	document.querySelector(elem).classList.remove(removeClass);
	/*
	if (document.querySelector(elem).classList.contains(removeClass)) {
		//console.log(document.querySelector(elem));
		//console.log(removeClass);
		
	}
	*/
}


// звезды на main page
const objStar = {
	selector: '.main__star span',
	minSizePercFieldStars: 1,
	maxSizePercFieldStars: 100,
	dilayFuncMs: 5000,
	minSizePxStar: 10,
	maxSizePxStar: 20,
	numberOfStars: 7,

};


addStarHtml(objStar);

stars(objStar);


// добавляет span по количеству звезд
function addStarHtml({
	numberOfStars: num
}) {
	const elem = document.querySelector('.main');
	elem.insertAdjacentHTML('afterbegin', '<div class=\"main__star\"></div >');
	const elemDiv = document.querySelector('.main__star');

	for (let i = 0; i < num; i++) {
		elemDiv.insertAdjacentHTML('afterbegin', '<span></span>');

	}
}


// запускаем функцию для каждого элемента elem
function stars(
	{ selector: elem,
		minSizePercFieldStars: min,
		maxSizePercFieldStars: max,
		dilayFuncMs: time,
		minSizePxStar: minSize,
		maxSizePxStar: maxSize }) {
	for (let i = 0; i < document.querySelectorAll(elem).length; i++) {
		timeOutXY(elem + `:nth-child(${i + 1})`, min, max, time + i * 1000, minSize, maxSize);
	}

}

// запускает функия каждый time сек
function timeOutXY(elem, min, max, time, minSize, maxSize) {
	let timerId = setTimeout(function run() {
		addRandomXY(elem, min, max, minSize, maxSize);
		setTimeout(run, time);
	}, time);

}

// добавляет случайные значения в % для top и left элемента в диапазоне min max и ширину с высотой
function addRandomXY(selector, min, max, minSize, maxSize) {
	document.querySelector(selector).setAttribute(`style`,
		`left:  ${random(min, max)}%;
		top: ${random(min, max)}%;
		width: ${random(minSize, maxSize)}px;
		height: ${random(minSize, maxSize)}px;`);

}
// возврщает случайное число от min до max( не включая)
function random(min, max) {
	return min + Math.random() * (max - min);
}





// parallax

parallaxBG('.main__bg', 30, 10);
parallaxDiv('.main__star', 30, 10);
parallaxDiv('.column-main', -30, -10);
parallaxDiv('.footer-main', -30, -10);
parallaxDiv('.header__logo', -30, -10);

// паралакс для картинки фона x, y- смещение осям 
function parallaxBG(selector, x, y) {
	//Получаем элемент фона 

	const bg = document.querySelector(selector);
	const bgAttribute = bg.getAttribute("style");

	//При движении мышью вызываем функцию, которая меняет положение фона
	document.addEventListener("mousemove", function (e) { MoveBackground(e, x, y); });

	function MoveBackground(e, x, y) {
		//Рассчитываем, насколько далеко от начала оси находится курсор: 0 - 0, 0.5 - середина экрана, 1 - ширина экрана (например, 1920)
		//Затем умножаем получившееся число на 30 - настолько будет сдвигаться фон
		//Например, если курсор находится посередине страницы (0.5), то при умножении получится 15
		//Далее отнимаем половину от 30, чтобы фон мог двигаться как влево, так и вправо
		let offsetX = (e.clientX / window.innerWidth * x) - x / 2;
		let offsetY = (e.clientY / window.innerHeight * y) - y / 2;
		//Меняем положение фона + добавляем старые стили
		if (bgAttribute) {
			bg.setAttribute(`style`, `background-position:  ${offsetX}px ${offsetY}px; 
		${bgAttribute}
		transform: scale(1.05);`);
		} else {
			bg.setAttribute(`style`, `background-position:  ${offsetX}px ${offsetY}px; 
				transform: scale(1.05);`);
		}
	}
}
// паралакс для блока 
function parallaxDiv(selector, x, y) {
	//Получаем элемент фона 

	const bg = document.querySelector(selector);
	const bgAttribute = bg.getAttribute("style");
	//console.log(bgAttribute);

	//При движении мышью вызываем функцию, которая меняет положение фона
	document.addEventListener("mousemove", function (e) { MoveBackground(e, x, y); });

	function MoveBackground(e, x, y) {
		//Рассчитываем, насколько далеко от начала оси находится курсор: 0 - 0, 0.5 - середина экрана, 1 - ширина экрана (например, 1920)
		//Затем умножаем получившееся число на 30 - настолько будет сдвигаться фон
		//Например, если курсор находится посередине страницы (0.5), то при умножении получится 15
		//Далее отнимаем половину от 30, чтобы фон мог двигаться как влево, так и вправо
		let offsetX = (e.clientX / window.innerWidth * x) - x / 2;
		let offsetY = (e.clientY / window.innerHeight * y) - y / 2;
		//Меняем положение фона + добавляем старые стили
		if (bgAttribute) {
			bg.setAttribute(`style`, `left:  ${offsetX}px;
			top: ${offsetY}px; 
			${bgAttribute}	`);
		} else {
			bg.setAttribute(`style`, `left:  ${offsetX}px;
			top: ${offsetY}px;`);
		}

	}
}
// смешение блока скрол при прокрутке

toogleClassScroll('.scroll', 30);

// добавляет удалет клас при скроле. scroll в %
function toogleClassScroll(selector, scroll) {
	const elem = document.querySelector(selector);
	const height = window.innerHeight;
	document.addEventListener('scroll', () => {
		//console.log(window.innerHeight);
		//console.log(window.pageYOffset);
		//console.log(scroll * height / 100);
		elem.classList.toggle('_active', window.pageYOffset > scroll * height / 100);
	});
}


// Bg content
addElemHtmlToContent();

// добавляет в html элементы  для бекграунда content
function addElemHtmlToContent() {
	const elem = document.querySelector('.content__img');
	const elem1 = document.querySelector('.content__container');

	elem1.insertAdjacentHTML('beforeend', '<div class="content__gradient"></div> <div class="content__top-gradient"></div>');
	elem.insertAdjacentHTML('beforeend', '<div class="content__bg_granient"></div> <div class="content__bg_color"></div>');
	const elemLink = document.querySelector('.content__gradient');
	for (let i = 0; i < 11; i++) {
		elemLink.insertAdjacentHTML('afterbegin', '<span></span>');
	}
}
/**
 * ChiefSlider by Itchief v2.0.0 (https://github.com/itchief/ui-components/tree/master/simple-adaptive-slider)
 * Copyright 2020 - 2021 Alexander Maltsev
 * Licensed under MIT (https://github.com/itchief/ui-components/blob/master/LICENSE)
 */

(function() {
  if (typeof window.CustomEvent === 'function' ) return false;
  function CustomEvent(event, params) {
    params = params || {bubbles: false, cancelable: false, detail: null};
    var e = document.createEvent('CustomEvent');
    e.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return e;
  }
  window.CustomEvent = CustomEvent;
})();

var WRAPPER_SELECTOR = '.slider__wrapper';
var ITEMS_SELECTOR = '.slider__items';
var ITEM_SELECTOR = '.slider__item';
var CONTROL_CLASS = 'slider__control';

/* var ITEM_CLASS_ACTIVE = 'slider__item_active';
var CONTROL_SELECTOR = '.slider__control';
var CONTROL_CLASS_SHOW = 'slider__control_show';
// индикаторы
var INDICATOR_WRAPPER_ELEMENT = 'ol';
var INDICATOR_WRAPPER_CLASS = 'slider__indicators';
var INDICATOR_ITEM_ELEMENT = 'li';
var INDICATOR_ITEM_CLASS = 'slider__indicator';
var INDICATOR_ITEM_CLASS_ACTIVE = 'slider__indicator_active';
// порог для переключения слайда (40%)
var POS_THRESHOLD = 40;
// класс для отключения transition
var TRANSITION_NONE = 'transition-none';*/

var SELECTOR_PREV = '.slider__control[data-slide="prev"]';
var SELECTOR_NEXT = '.slider__control[data-slide="next"]';
var SELECTOR_INDICATOR = '.slider__indicators>li';
var SLIDER_TRANSITION_OFF = 'slider_disable-transition';
var CLASS_CONTROL_HIDE = 'slider__control_hide';
var CLASS_ITEM_ACTIVE = 'slider__item_active';
var CLASS_INDICATOR_ACTIVE = 'active';

function ChiefSlider(selector, config) {
  // элементы слайдера
  var $root = typeof selector === 'string' ?
    document.querySelector(selector) : selector;
  this._$root = $root;
  this._$wrapper = $root.querySelector(WRAPPER_SELECTOR);
  this._$items = $root.querySelector(ITEMS_SELECTOR);
  this._$itemList = $root.querySelectorAll(ITEM_SELECTOR);
  this._$controlPrev = $root.querySelector(SELECTOR_PREV);
  this._$controlNext = $root.querySelector(SELECTOR_NEXT);
  this._$indicatorList = $root.querySelectorAll(SELECTOR_INDICATOR);
  // экстремальные значения слайдов
  this._minOrder = 0;
  this._maxOrder = 0;
  this._$itemWithMinOrder = null;
  this._$itemWithMaxOrder = null;
  this._minTranslate = 0;
  this._maxTranslate = 0;
  // направление смены слайдов (по умолчанию)
  this._direction = 'next';
  // determines whether the position of item needs to be determined
  this._balancingItemsFlag = false;
  this._activeItems = [];
  // текущее значение трансформации
  this._transform = 0;
  // swipe параметры
  this._hasSwipeState = false;
  this.__swipeStartPos = 0;
  // slider properties
  this._transform = 0; // текущее значение трансформации
  this._intervalId = null;
  // configuration of the slider
  this._config = {
    loop: true,
    autoplay: false,
    interval: 5000,
    refresh: true,
    swipe: true,
  };
  for (var key in config) {
    if (this._config.hasOwnProperty(key)) {
      this._config[key] = config[key];
    }
  }
  // create some constants
  var $itemList = this._$itemList;
  var widthItem = $itemList[0].offsetWidth;
  var widthWrapper = this._$wrapper.offsetWidth;
  var itemsInVisibleArea = Math.round(widthWrapper / widthItem);
  // initial setting properties
  this._widthItem = widthItem;
  this._widthWrapper = widthWrapper;
  this._itemsInVisibleArea = itemsInVisibleArea;
  this._transformStep = 100 / itemsInVisibleArea;
  // initial setting order and translate items
  for (var i = 0, length = $itemList.length; i < length; i++) {
    $itemList[i].dataset.index = i;
    $itemList[i].dataset.order = i;
    $itemList[i].dataset.translate = 0;
    if (i < itemsInVisibleArea) {
      this._activeItems.push(i);
    }
  }
  if (this._config.loop) {
    // перемещаем последний слайд перед первым
    var count = $itemList.length - 1;
    var translate = -$itemList.length * 100;
    $itemList[count].dataset.order = -1;
    $itemList[count].dataset.translate = -$itemList.length * 100;
    $itemList[count].style.transform = 'translateX(' + translate + '%)';
    this.__refreshExtremeValues();
  } else {
    if (this._$controlPrev) {
      this._$controlPrev.classList.add(CLASS_CONTROL_HIDE);
    }
  }
  this._setActiveClass();
  this._addEventListener();
  this._updateIndicators();
  this._autoplay();
}

// подключения обработчиков событий для слайдера
ChiefSlider.prototype._addEventListener = function() {
  var $root = this._$root;
  var $items = this._$items;
  var config = this._config;
  function onClick(e) {
    var $target = e.target;
    this._autoplay('stop');
    if ($target.classList.contains(CONTROL_CLASS)) {
      e.preventDefault();
      this._direction = $target.dataset.slide;
      this._move();
    } else if ($target.dataset.slideTo) {
      var index = parseInt($target.dataset.slideTo);
      this._moveTo(index);
    }
    if (this._config.loop) {
      this._autoplay();
    }
  }
  function onMouseEnter(e) {
    this._autoplay('stop');
  }
  function onMouseLeave(e) {
    this._autoplay();
  }
  function onTransitionStart() {
    if (this._balancingItemsFlag) {
      return;
    }
    this._balancingItemsFlag = true;
    window.requestAnimationFrame(this._balancingItems.bind(this));
  }
  function onTransitionEnd() {
    this._balancingItemsFlag = false;
  }
  function onResize() {
    window.requestAnimationFrame(this._refresh.bind(this));
  }
  function onSwipeStart(e) {
    this._autoplay('stop');
    var event = e.type.search('touch') === 0 ? e.touches[0] : e;
    this._swipeStartPos = event.clientX;
    this._hasSwipeState = true;
  }
  function onSwipeEnd(e) {
    if (!this._hasSwipeState) {
      return;
    }
    var event = e.type.search('touch') === 0 ? e.changedTouches[0] : e;
    var diffPos = this._swipeStartPos - event.clientX;
    if (diffPos > 50) {
      this._direction = 'next';
      this._move();
    } else if (diffPos < -50) {
      this._direction = 'prev';
      this._move();
    }
    this._hasSwipeState = false;
    if (this._config.loop) {
      this._autoplay();
    }
  }
  function onDragStart(e) {
    e.preventDefault();
  }
  function onVisibilityChange() {
    if (document.visibilityState === 'hidden') {
      this._autoplay('stop');
    } else if (document.visibilityState === 'visible') {
      if (this._config.loop) {
        this._autoplay();
      }
    }
  }

  $root.addEventListener('click', onClick.bind(this));
  $root.addEventListener('mouseenter', onMouseEnter.bind(this));
  $root.addEventListener('mouseleave', onMouseLeave.bind(this));
  // on resize
  if (config.refresh) {
    window.addEventListener('resize', onResize.bind(this));
  }
  // on transitionstart and transitionend
  if (config.loop) {
    $items.addEventListener('transition-start', onTransitionStart.bind(this));
    $items.addEventListener('transitionend', onTransitionEnd.bind(this));
  }
  // on touchstart and touchend
  if (config.swipe) {
    $root.addEventListener('touchstart', onSwipeStart.bind(this));
    $root.addEventListener('mousedown', onSwipeStart.bind(this));
    document.addEventListener('touchend', onSwipeEnd.bind(this));
    document.addEventListener('mouseup', onSwipeEnd.bind(this));
  }
  $root.addEventListener('dragstart', onDragStart.bind(this));
  // при изменении активности вкладки
  document.addEventListener('visibilitychange', onVisibilityChange.bind(this));
};

// update values of extreme properties
ChiefSlider.prototype.__refreshExtremeValues = function() {
  var $itemList = this._$itemList;
  this._minOrder = +$itemList[0].dataset.order;
  this._maxOrder = this._minOrder;
  this._$itemByMinOrder = $itemList[0];
  this._$itemByMaxOrder = $itemList[0];
  this._minTranslate = +$itemList[0].dataset.translate;
  this._maxTranslate = this._minTranslate;
  for (var i = 0, length = $itemList.length; i < length; i++) {
    var $item = $itemList[i];
    var order = +$item.dataset.order;
    if (order < this._minOrder) {
      this._minOrder = order;
      this._$itemByMinOrder = $item;
      this._minTranslate = +$item.dataset.translate;
    } else if (order > this._maxOrder) {
      this._maxOrder = order;
      this._$itemByMaxOrder = $item;
      this._minTranslate = +$item.dataset.translate;
    }
  }
};

// update position of item
ChiefSlider.prototype._balancingItems = function() {
  if (!this._balancingItemsFlag) {
    return;
  }
  var $wrapper = this._$wrapper;
  var $wrapperClientRect = $wrapper.getBoundingClientRect();
  var widthHalfItem = $wrapperClientRect.width / this._itemsInVisibleArea / 2;
  var count = this._$itemList.length;
  var translate;
  var clientRect;
  if (this._direction === 'next') {
    var wrapperLeft = $wrapperClientRect.left;
    var $min = this._$itemByMinOrder;
    translate = this._minTranslate;
    clientRect = $min.getBoundingClientRect();
    if (clientRect.right < wrapperLeft - widthHalfItem) {
      $min.dataset.order = this._minOrder + count;
      translate += count * 100;
      $min.dataset.translate = translate;
      $min.style.transform = 'translateX('.concat(translate, '%)');
      // update values of extreme properties
      this.__refreshExtremeValues();
    }
  } else {
    var wrapperRight = $wrapperClientRect.right;
    var $max = this._$itemByMaxOrder;
    translate = this._maxTranslate;
    clientRect = $max.getBoundingClientRect();
    if (clientRect.left > wrapperRight + widthHalfItem) {
      $max.dataset.order = this._maxOrder - count;
      translate -= count * 100;
      $max.dataset.translate = translate;
      $max.style.transform = 'translateX('.concat(translate, '%)');
      // update values of extreme properties
      this.__refreshExtremeValues();
    }
  }
  // updating...
  requestAnimationFrame(this._balancingItems.bind(this));
};

// _setActiveClass
ChiefSlider.prototype._setActiveClass = function() {
  var activeItems = this._activeItems;
  var $itemList = this._$itemList;
  for (var i = 0, length = $itemList.length; i < length; i++) {
    var $item = $itemList[i];
    var index = +$item.dataset.index;
    if (activeItems.indexOf(index) > -1) {
      $item.classList.add(CLASS_ITEM_ACTIVE);
    } else {
      $item.classList.remove(CLASS_ITEM_ACTIVE);
    }
  }
};

// _updateIndicators
ChiefSlider.prototype._updateIndicators = function() {
  var $indicatorList = this._$indicatorList;
  var $itemList = this._$itemList;
  if (!$indicatorList.length) {
    return;
  }
  for (var index = 0, length = $itemList.length; index < length; index++) {
    var $item = $itemList[index];
    if ($item.classList.contains(CLASS_ITEM_ACTIVE)) {
      $indicatorList[index].classList.add(CLASS_INDICATOR_ACTIVE);
    } else {
      $indicatorList[index].classList.remove(CLASS_INDICATOR_ACTIVE);
    }
  }
};

// move slides
ChiefSlider.prototype._move = function() {
  var step = this._direction ===
   'next' ? -this._transformStep : this._transformStep;
  var transform = this._transform + step;
  if (!this._config.loop) {
    var endTransformValue =
      this._transformStep * (this._$itemList.length - this._itemsInVisibleArea);
    transform = Math.round(transform * 10) / 10;
    if (transform < -endTransformValue || transform > 0) {
      return;
    }
    this._$controlPrev.classList.remove(CLASS_CONTROL_HIDE);
    this._$controlNext.classList.remove(CLASS_CONTROL_HIDE);
    if (transform === -endTransformValue) {
      this._$controlNext.classList.add(CLASS_CONTROL_HIDE);
    } else if (transform === 0) {
      this._$controlPrev.classList.add(CLASS_CONTROL_HIDE);
    }
  }
  var activeIndex = [];
  var i = 0;
  var length;
  var index;
  var newIndex;
  if (this._direction === 'next') {
    for (i = 0, length = this._activeItems.length; i < length; i++) {
      index = this._activeItems[i];
      newIndex = ++index;
      if (newIndex > this._$itemList.length - 1) {
        newIndex -= this._$itemList.length;
      }
      activeIndex.push(newIndex);
    }
  } else {
    for (i = 0, length = this._activeItems.length; i < length; i++) {
      index = this._activeItems[i];
      newIndex = --index;
      if (newIndex < 0) {
        newIndex += this._$itemList.length;
      }
      activeIndex.push(newIndex);
    }
  }
  this._activeItems = activeIndex;
  this._setActiveClass();
  this._updateIndicators();
  this._transform = transform;
  this._$items.style.transform = 'translateX(' + transform + '%)';
  this._$items.dispatchEvent(new CustomEvent('transition-start', {bubbles: true}));
};

// _moveToNext
ChiefSlider.prototype._moveToNext = function() {
  this._direction = 'next';
  this._move();
};

// _moveToPrev
ChiefSlider.prototype._moveToPrev = function() {
  this._direction = 'prev';
  this._move();
};

// _moveTo
ChiefSlider.prototype._moveTo = function(index) {
  var $indicatorList = this._$indicatorList;
  var nearestIndex = null;
  var diff = null;
  var i;
  var length;
  for (i = 0, length = $indicatorList.length; i < length; i++) {
    var $indicator = $indicatorList[i];
    if ($indicator.classList.contains(CLASS_INDICATOR_ACTIVE)) {
      var slideTo = +$indicator.dataset.slideTo;
      if (diff === null) {
        nearestIndex = slideTo;
        diff = Math.abs(index - nearestIndex);
      } else {
        if (Math.abs(index - slideTo) < diff) {
          nearestIndex = slideTo;
          diff = Math.abs(index - nearestIndex);
        }
      }
    }
  }
  diff = index - nearestIndex;
  if (diff === 0) {
    return;
  }
  this._direction = diff > 0 ? 'next' : 'prev';
  for (i = 1; i <= Math.abs(diff); i++) {
    this._move();
  }
};

// _autoplay
ChiefSlider.prototype._autoplay = function(action) {
  if (!this._config.autoplay) {
    return;
  }
  if (action === 'stop') {
    clearInterval(this._intervalId);
    this._intervalId = null;
    return;
  }
  if (this._intervalId === null) {
    this._intervalId = setInterval(
        function() {
          this._direction = 'next';
          this._move();
        }.bind(this),
        this._config.interval
    );
  }
};

// _refresh
ChiefSlider.prototype._refresh = function() {
  // create some constants
  var $itemList = this._$itemList;
  var widthItem = $itemList[0].offsetWidth;
  var widthWrapper = this._$wrapper.offsetWidth;
  var itemsInVisibleArea = Math.round(widthWrapper / widthItem);

  if (itemsInVisibleArea === this._itemsInVisibleArea) {
    return;
  }

  this._autoplay('stop');

  this._$items.classList.add(SLIDER_TRANSITION_OFF);
  this._$items.style.transform = 'translateX(0)';

  // setting properties after reset
  this._widthItem = widthItem;
  this._widthWrapper = widthWrapper;
  this._itemsInVisibleArea = itemsInVisibleArea;
  this._transform = 0;
  this._transformStep = 100 / itemsInVisibleArea;
  this._balancingItemsFlag = false;
  this._activeItems = [];

  // setting order and translate items after reset
  for (var i = 0, length = $itemList.length; i < length; i++) {
    var $item = $itemList[i];
    var position = i;
    $item.dataset.index = position;
    $item.dataset.order = position;
    $item.dataset.translate = 0;
    $item.style.transform = 'translateX(0)';
    if (position < itemsInVisibleArea) {
      this._activeItems.push(position);
    }
  }

  this._setActiveClass();

  window.requestAnimationFrame(
      function() {
        this._$items.classList.remove(SLIDER_TRANSITION_OFF);
      }.bind(this)
  );

  // hide prev arrow for non-infinite slider
  if (!this._config.loop) {
    if (this._$controlPrev) {
      this._$controlPrev.classList.add(CLASS_CONTROL_HIDE);
    }
    return;
  }

  // translate last item before first
  var count = $itemList.length - 1;
  var translate = -$itemList.length * 100;
  $itemList[count].dataset.order = -1;
  $itemList[count].dataset.translate = -$itemList.length * 100;
  $itemList[count].style.transform = 'translateX('.concat(translate, '%)');
  // update values of extreme properties
  this.__refreshExtremeValues();
  this._updateIndicators();
  // calling _autoplay
  this._autoplay();
};

// public
ChiefSlider.prototype.next = function() {
  this._moveToNext();
};
ChiefSlider.prototype.prev = function() {
  this._moveToPrev();
};
ChiefSlider.prototype.moveTo = function(index) {
  this._moveTo(index);
};
ChiefSlider.prototype.refresh = function() {
  this._refresh();
};


iniChiefSliders();
addAttrNumSlide('.slider', '.img__img', 'number');


// инициирует все слайдеры ChiefSlider
function iniChiefSliders() {
	document.addEventListener('DOMContentLoaded', function () {
		let elms = document.querySelectorAll('.slider');

		for (let i = 0, len = elms.length; i < len; i++) {
			// инициализация elms[i] в качестве слайдера
			new ChiefSlider(elms[i]);

		}
	});
}

// добавляет в атрибут attrName тега attrSelector номер слайда для всех слайдеров sliderSelector
function addAttrNumSlide(sliderSelector, attrSelector, attrName) {

	document.querySelectorAll(sliderSelector).forEach((element, i) => {

		element.querySelectorAll(attrSelector).forEach((elem, i) => {

			let attrNum = `0${i + 1}.`;
			elem.setAttribute(attrName, attrNum.slice(-3));

		});
	});
}



// Footer


let objFM = new FooterMenu(`.column-menu__name`,
	`.column-menu`,
	[`.column-menu__name`,
		`.column-menu__links`,
		`.column-menu__social-content`,
	],
	[`.column-menu__link`,
		`.column-menu__social`,
	],
	`_active`,
	`_lock`,
	767.98,
);

objFM.addSpan();
objFM.toggleListerIsMedia();

//-------------------------------------------------
// для добавление удаления калссов в элементы футер меню
function FooterMenu(
	// селектор элемента нажатие на который добавляет класса 
	selectorIni,
	// селектор предка всех элементов  к которым идет  добавление класса, может быь равен selectorIni
	selectorParent,
	// селекторы элемнентов к которым добавляем класс(масcив)
	selectorAddClass,
	// селекторы элементов нажатеи на котрые удалает класс(масcив)
	selectorRemoveIni,
	// добовляемы класс к элементам
	classAddClass,
	// добовляемы класс к body 
	classAddClassBody,
	//ширина экрана при которой устанвлтвются(меньше) либо убираются(больше) слуштели события на selectorIni
	maxWidth,
) {
	this.selectorIni = selectorIni;
	this.selectorParent = selectorParent;
	this.selectorAddClass = selectorAddClass;
	this.selectorRemoveIni = selectorRemoveIni;
	this.selectorRemoveIni.splice(0, 0, `.cross`);//добавляется в документ после selectorIni
	this.classAddClass = classAddClass;
	this.classAddClassBody = classAddClassBody;
	this.maxWidth = maxWidth;
	this.selectorAddClass.push(this.selectorRemoveIni[0]);

	// добавляет элемент с классом selectorRemoveIni[0] + span внутри  после selectorIni (для крестика закрытия) 
	this.addSpan = function () {
		document.querySelectorAll(this.selectorIni).forEach(elem => {
			elem.insertAdjacentHTML('afterend', `<div class="${this.selectorRemoveIni[0].slice(1)}"><span></span></div>`);
		});
	};
	//устанвлтвются(меньше maxWidth) либо убираются(больше maxWidth) слуштели события на selectorIni

	this.toggleListerIsMedia = function () {
		const mediaQuery = window.matchMedia(`(max-width: ${this.maxWidth}px)`);
		const elem = document.querySelectorAll(this.selectorIni);
		const selector = this;
		// если старовая ширина экрана меньше maxWidth 
		if (window.innerWidth <= this.maxWidth) {
			for (const el of elem) {
				el.addEventListener('click', el.fn1 = function fn1(event) {
					selector.addActiveClass(event.currentTarget, selector);
				});
			}
		}
		mediaQuery.addEventListener('change', function () {
			if (mediaQuery.matches) {
				for (const el of elem) {
					el.addEventListener('click', el.fn = function fn(event) {
						selector.addActiveClass(event.currentTarget, selector);
					});
				}
			} else {
				for (const el of elem) {
					el.removeEventListener('click', el.fn);
					el.removeEventListener('click', el.fn1);
				}
				// удаляет присвоенные классы когжа ширина большк maxWidth
				selector.removeActiveClass(selector);
			}
		});
		// устанвливает слушателей события на selectorRemoveIni ( для снятия классов)
		const removeSelectors = this.selectorRemoveIni.reduce(function (sum, current) {
			return sum + `, ` + current;
		});
		document.querySelectorAll(removeSelectors).forEach(el => {
			el.addEventListener('click', function () {
				selector.removeActiveClass(selector);
			});
		});
	};

	// добавляет классы к selectorAddClass + body 
	this.addActiveClass = function (elem, {
		selectorParent: parent,
		selectorAddClass: selectoToAdd,
		classAddClass: active,
		classAddClassBody: bodyLock,
	}) {
		selectoToAdd.forEach(element => {
			const el = elem.closest(parent).querySelector(element);
			el && el.classList.add(active);
		});
		document.querySelector('body').classList.add(bodyLock);
	};

	// удаляет классы к selectorAddClass + body 
	this.removeActiveClass = function ({
		selectorAddClass: selector,
		classAddClass: active,
		classAddClassBody: bodyLock,
	}) {
		const element = selector.reduce(function (sum, current) {
			return sum + `, ` + current;
		});
		document.querySelectorAll(element).forEach(elem => {
			elem.classList.remove(active);
		});
		document.querySelector('body').classList.remove(bodyLock);
	};
}




