const mailPath = 'mail.php'

document.querySelectorAll('.uniForm').forEach( (e) => {

	e.addEventListener('submit', function(e) {

		let th      = this,
		    params  = new FormData(this),
		    request = new XMLHttpRequest()

		request.open('POST', mailPath, true)
		request.send(params)

		request.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				setTimeout(function() { th.reset() }, 1000)
				alert('Thank you!')
			}
		}

		e.preventDefault()

	})

})


/* Nav icon */
const navBtn = document.querySelector('.nav-icon-btn');
const navIcon = document.querySelector('.nav-icon');
const nav = document.querySelector('.header__top-row');

navBtn.onclick = function () {
    navIcon.classList.toggle('nav-icon--active');
    nav.classList.toggle('header__top-row--mobile');
    document.body.classList.toggle('no-scroll');
}

/* Phone Mask */
mask('[data-tel-input]');

// Удаляем '+' если больше ничего не введено, чтобы показать placeholder
const phoneInputs = document.querySelectorAll('[data-tel-input]');
phoneInputs.forEach((input)=>{
	input.addEventListener('input', ()=>{
		if (input.value == '+') input.value = '';
	})
	input.addEventListener('blur', ()=>{
		if (input.value == '+') input.value = '';
	})
});

/* Yandex Map */

ymaps.ready(init);
function init(){
	 // Создание карты.
	 var map = new ymaps.Map("map", {
		  // Координаты центра карты.
		  // Порядок по умолчанию: «широта, долгота».
		  // Чтобы не определять координаты центра карты вручную,
		  // воспользуйтесь инструментом Определение координат.
		  center: [54.006384,27.436851],
		  // Уровень масштабирования. Допустимые значения:
		  // от 0 (весь мир) до 19.
		  zoom: 14
	 });

	 var myPlacemark = new ymaps.Placemark(
		[54.006384,27.436851],
		 {balloonContent: `<div class="balloon">
		 <div class="balloon__address"><База отдыха "Сябры"></div>
		 <div class="balloon__contacts">
			 <a href="tel:+375440000001">+375 (44) 000 00 01</a>
		 </div>
	 </div>`}, 
		 {
		iconLayout: 'default#image',
		iconImageHref: './img/map/location-pin.svg',
		icon_imagesize: [40, 40],
		iconImageOffset: [-5, -42]
  });
  map.controls.remove('geolocationControl'); // удаляем геолокацию
	map.controls.remove('searchControl'); // удаляем поиск
	map.controls.remove('trafficControl'); // удаляем контроль трафика
	map.controls.remove('typeSelector'); // удаляем тип

	// map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
	// map.controls.remove('zoomControl'); // удаляем контрол зуммирования
	map.controls.remove('rulerControl'); // удаляем контрол правил
	map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

  map.geoObjects.add(myPlacemark); 
}

//!catalog

const catalogItem = document.querySelectorAll('.catalog__batons-item');
const catalogContent = document.querySelectorAll('.catalog__content-item');

catalogItem.forEach(function(item){
	item.addEventListener('click', activateButton)
})
function activateButton(evt){
	const targetItem = evt.currentTarget;
	const buttonID = targetItem.dataset.button;
	catalogItem.forEach(function(el){
		el.classList.remove("catalog__batons-item--active")
	})
	targetItem.classList.add("catalog__batons-item--active")

	catalogContent.forEach(function(el){
		el.classList.remove("catalog__content-item--active")
		document.querySelector(`#${buttonID}`).classList.add("catalog__content-item--active")
	})
}

const btnInfo = document.querySelectorAll('.button-info');
const textInfo = document.querySelectorAll('.mini__info-text');

btnInfo.forEach(function(item){
	item.addEventListener('click', activateMiniInfo);
})

function activateMiniInfo(evt){
	const targetElement = evt.currentTarget
	const btnInfoID = targetElement.dataset.info;

	if(document.querySelector(`#${btnInfoID}`).classList.contains("mini__info-text--active") ){
		document.querySelector(`#${btnInfoID}`).classList.remove("mini__info-text--active")
	}else{
	textInfo.forEach(function(el){
		el.classList.remove("mini__info-text--active")
	})
	document.querySelector(`#${btnInfoID}`).classList.add("mini__info-text--active")
}
}

const apartamentLinks = document.querySelectorAll('.card-apart');
const apartamentCard = document.querySelectorAll('.apartament__card-info');
const closeIcon = document.querySelectorAll('.close-icon');
apartamentLinks.forEach(function(el){
	el.addEventListener("click", cardopen);
})
function cardopen(evt){
	const targetElement = evt.currentTarget
	const infoID = targetElement.dataset.apartament;
	apartamentCard.forEach(function(el){
		el.classList.remove("apartament__card-info--active")
	})
document.querySelector(`#${infoID}`).classList.add("apartament__card-info--active")
}
closeIcon.forEach(function(el){
	el.addEventListener("click", function(){
		apartamentCard.forEach(function(el){
			el.classList.remove("apartament__card-info--active")
		})
	})
})

 const filterButton =  document.querySelector('.filter__text')
 const filterBox = document.querySelector('.filter__box')
 const minPriceBox = document.querySelector('.filter__min')
 const maxPriceBox = document.querySelector('.filter__max')
 const cardsToFilter = document.querySelectorAll('.card__to-filter')
 const filterBtn = document.querySelector('.filter__box-button');
 const filterAreaMax = document.querySelector('.filter__max-area')
 const filterAreaMin = document.querySelector('.filter__min-area')
// let ccc = document.querySelector('.characters__item-text--area');
// console.log(ccc)
 let minPrice = minPriceBox.value;
 let maxPrice = maxPriceBox.value;
 let minArea = filterAreaMin.value;
 let maxArea = filterAreaMax.value;
 console.log(maxArea)
 filterButton.addEventListener('click', function(){
	filterBox.classList.toggle('filter__box--active')
 })
filterBtn.addEventListener('click', function(){
	minPrice = minPriceBox.value;
	maxPrice = maxPriceBox.value;
	minArea = filterAreaMin.value;
 	maxArea = filterAreaMax.value;
	cardsToFilter.forEach(function(el){
		if(Number(el.querySelector('.card__btn-price').innerText)< minPrice || Number(el.querySelector('.card__btn-price').innerText)> maxPrice || Number(el.querySelector('.characters__item-text--area').innerText) < minArea || Number(el.querySelector('.characters__item-text--area').innerText) > maxArea){
			el.classList.add('none')
		}else {
			el.classList.remove('none')
		}
	 })
})
 






//!calculate

const calcTab = document.querySelectorAll('.calculate__tab');
const calcContent = document.querySelectorAll('.calculate__content-item')
 calcTab.forEach(function(el){
   el.addEventListener("click", calcOpen);
 })
 function calcOpen(evt){
   const targetElementC = evt.currentTarget;
	const infoIDC = targetElementC.dataset.calc;
   calcTab.forEach(function(el){
      el.classList.remove("calculate__tab--active");
   })
  targetElementC.classList.add("calculate__tab--active")
  calcContent.forEach(function(el){
   el.classList.remove("calculate__content-item--active");
  })
  document.querySelector(`#${infoIDC}`).classList.add("calculate__content-item--active")
 }

const priceValue = document.querySelector('.number-price');
const procentValue = document.querySelector('.number-procent');
const minusValue = document.querySelector('.number-minus');
const yearValue = document.querySelector('.number-year');

const credit = document.querySelector('#credit-result');
const resultPrice = document.querySelector('#result-price');
const procentFinal = document.querySelector('#final-procent');
const yearResult = document.querySelector('#year-result');

const resultButton = document.querySelector('.input__result-btn');

resultButton.addEventListener('click', calculateAll);

function calculateAll(){
   if((Number(priceValue.value) - Number(minusValue.value) ) >= 0){
       credit.innerText = (Number(priceValue.value) - Number(minusValue.value) )  + " $";
       let value = priceValue.value - minusValue.value;
       for(i=1; i<= Number(yearValue.value); i++){
         value = value + value * (Number(procentValue.value)/100);

       }
       resultPrice.innerText = value.toFixed(2)  + " $";
       procentFinal.innerText = (value.toFixed(2) - (priceValue.value - minusValue.value)).toFixed(2) + " $";
       let time = new Date();
       let fMonth;
       switch (time.getMonth())
   {
   case 0: fMonth="январь"; break;
   case 1: fMonth="февраль"; break;
   case 2: fMonth="март"; break;
   case 3: fMonth="апрель"; break;
   case 4: fMonth="май"; break;
   case 5: fMonth="июнь"; break;
   case 6: fMonth="июль"; break;
   case 7: fMonth="август"; break;
   case 8: fMonth="сентябрь"; break;
   case 9: fMonth="октябрь"; break;
   case 10: fMonth="ноябрь"; break;
   case 11: fMonth="декабрь"; break;
   }
   yearResult.innerText = fMonth + " " + (Number(time.getFullYear()) + Number(yearValue.value) );
   } else{
      credit.innerText = "Free"
      resultPrice.innerText = "Free"
      procentFinal.innerText = "Free"
      yearResult.innerText = "Today"
   }
}

const daysPrice = document.querySelector('.number__days-price')
const daysTime = document.querySelector('.number__days-time')
const daysResult = document.querySelector('.number__days-result')
const calcBtn = document.querySelector('.input__calc-btn')

let sell;
if(daysTime.value < 7){
 sell = 1;
}else if(daysTime.value <= 21){
 sell = 0.03
}else if(daysTime.value < 30){
sell = 0.04
} else if(daysTime.value < 60){
   sell = 0.06
}else if(daysTime.value < 150){
   sell = 0.15
}else if(daysTime.value >= 150){
   sell = 0.17
}

calcBtn.addEventListener("click", calcSell);
   function calcSell(){
      dayscurrentPrice = daysPrice.value * daysTime.value
      daysResult.value = (dayscurrentPrice - dayscurrentPrice * sell).toFixed(2);
   }
