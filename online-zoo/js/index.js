const menuButton = document.querySelector(".hamburger");
const menu = document.querySelector(".menu__wrapper");

const closeMenu = () => {
  menu.classList.remove("menu__wrapper_active");
  menuButton.classList.remove("hamburger_active");
  document.body.classList.remove("body_lock");
};

const openMenu = () => {
  menu.classList.add("menu__wrapper_active");
  menuButton.classList.add("hamburger_active");
  document.body.classList.add("body_lock");
};

const menuClickHandler = function (e) {
  if (e.target.classList.contains("menu__wrapper")) {
    closeMenu();
  }
};

const menuButtonClickHandler = function (e) {
  if (this.classList.contains("hamburger_active")) {
    closeMenu();
  } else {
    openMenu();
    menu.addEventListener("click", menuClickHandler);
  }
};

const testimonialsClickHandler = (e) => {
  if (e.target.closest(".testimonial__wrapper")) {
    const testimonial = e.target.closest(".testimonial__wrapper");
    const testimonialInfo = getTestimonialInfo(testimonial);
    const modal = generateModal(testimonialInfo);
    addTestimonialProfilePic(modal, testimonialInfo.pic);
    addModalToDocument(modal);
    modal.addEventListener("click", modalClickHandler);
  }
};

const closeModal = (modal) => {
  document.body.classList.remove("body_lock");
  modal.remove();
};

const getTestimonialInfo = (testimonial) => {
  const info = {
    name: testimonial.querySelector(".person-name").textContent,
    pic: getComputedStyle(testimonial.querySelector(".profile__pic"))
      .backgroundImage,
    location: testimonial.querySelector(".person-location").textContent,
    date: testimonial.querySelector(".person-date").textContent,
    comment: testimonial.querySelector(".comment__paragraph").textContent,
  };

  return info;
};

const generateModal = (info) => {
  const modal = document.createElement("DIV");

  modal.classList.add("modal__wrapper");
  modal.innerHTML = `<div class="modal__body">
    <div class="modal__close-button"></div>
    <div class="modal__content">
      <div class="testimonial__wrapper">
        <div class="testimonial">
          <div class="testimonial__profile">
            <div class="profile__pic"></div>
            <div class="profile__info">
              <h5 class="person-name">${info.name}</h5>
              <div class="person-info">
                <span class="person-location">${info.location}</span>
                <span>•</span>
                <span class="person-date">${info.date}</span>
              </div>
            </div>
          </div>
          <div class="testimonial__comment">
            <p class="comment__paragraph">
            ${info.comment}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>`;

  return modal;
};

const addModalToDocument = (modal) => {
  document.querySelector("footer").after(modal);
  document.body.classList.add("body_lock");
};

const addTestimonialProfilePic = (modal, picUrl) => {
  modal.querySelector(".profile__pic").style.backgroundImage = picUrl;
};

const modalClickHandler = function (e) {
  if (
    e.target.classList.contains("modal__wrapper") ||
    e.target.classList.contains("modal__close-button") ||
    e.target.classList.contains("modal__body")
  ) {
    closeModal(this);
  }
};

menuButton.addEventListener("click", menuButtonClickHandler);

const progressBarHandler = function (e) {
  if (this.value >= 3) {
    layout.style.right =
      this.value * 264 + 30 * this.value + 2 * this.value + "px";
  } else {
    layout.style.right = this.value * 264 + 30 * this.value + "px";
  }
};

const feedingRange = document.querySelector(".feeding-range__range ");
const inputForm = document.querySelector(".feed-form__input");

const circleList = [...document.querySelectorAll(".range__circle_outer")];
const amountList = [...document.querySelectorAll(".amount__money")].map(
  (amountElement) => +amountElement.textContent.slice(1)
);

const makeCircleActive = (circle) => {
  circle.classList.add("range__circle_active");
};

const makePreviousCircleNonactive = () => {
  const activeCircle = document.querySelector(".range__circle_active");
  if (activeCircle) {
    activeCircle.classList.remove("range__circle_active");
  }
};

const putAmountInForm = (circle) => {
  const number = circleList.indexOf(circle);

  inputForm.value = amountList[number];
};

const feedingRangeClickHandler = (e) => {
  if (e.target.classList.contains("range__circle")) {
    const clickedCircle = e.target.closest(".range__circle_outer");
    makePreviousCircleNonactive();
    makeCircleActive(clickedCircle);
    putAmountInForm(clickedCircle);
  }
};

const inputHandler = function (e) {
  if (amountList.includes(+this.value)) {
    const number = amountList.indexOf(+this.value);
    makePreviousCircleNonactive();
    makeCircleActive(circleList[number]);
  } else {
    makePreviousCircleNonactive();
  }
};

const validateAmount = function () {
  if (this.value.length > 4) {
    this.value = this.value.slice(0, 4);
  }
};

const generatePetCard = (info) => {
  const petCard = document.createElement("DIV");
  petCard.classList.add("pets__card-wrapper");
  const petCardInnerHTML = `<div class="pets__card">
  <div class="card__image"></div>
  <div class="card__text card__text_hidden">
    <h5 class="card__title">${info.name}</h5>
    <p class="card__country">${info.location}</p>
  </div>
  <div class="card__info">
    <div class="card__text">
      <h5 class="card__title">${info.name}</h5>
      <p class="card__country">${info.location}</p>
    </div>
    <div class="card__food card__food_${info.food}"></div>
  </div>
</div>`;
  petCard.innerHTML = petCardInnerHTML;
  petCard.querySelector(".card__image").style.backgroundImage = info.pic;

  return petCard;
};

const getRandomPetsNumbers = () => {
  const petsAmount = window.innerWidth <= 700 ? 4 : 6;
  const randomNums = [];

  while (randomNums.length !== petsAmount) {
    const randomNum = Math.floor(Math.random() * petInfo.length);
    if (!randomNums.includes(randomNum)) {
      randomNums.push(randomNum);
    }
  }

  return randomNums;
};

const generateRandomSlider = () => {
  const numbers = getRandomPetsNumbers();
  const petsLayout=document.querySelector('.item_next').querySelector('.layout-3-columns');
  petsLayout.innerHTML=''
  numbers.forEach(number=>{
    petsLayout.append(generatePetCard(petInfo[number]));
  })
  
};

const petInfo = [
  {
    name: "giant Pandas",
    location: "Native to Southwest China",
    food: "fruits",
    pic: 'url("../../assets/img/panda.png")',
  },
  {
    name: "Eagles",
    location: "Native to South America",
    food: "meat",
    pic: 'url("../../assets/img/eagle.png")',
  },
  {
    name: "Gorillas",
    location: "Native to Congo",
    food: "fruits",
    pic: 'url("../../assets/img/gorilla.png")',
  },
  {
    name: "Two-toed Sloth",
    location: "Mesoamerica, South America",
    food: "fruits",
    pic: 'url("../../assets/img/sloth.png")',
  },
  {
    name: "cheetahs",
    location: "Native to Africa",
    food: "meat",
    pic: 'url("../../assets/img/cheetah.png")',
  },
  {
    name: "Penguins",
    location: "Native to Antarctica",
    food: "meat",
    pic: 'url("../../assets/img/penguin.png")',
  },
  {
    name: "Alligators",
    location: "Native to Southeastern U. S.",
    food: "meat",
    pic: 'url("../../assets/img/alligator.png")',
  },
];

const layout = document.querySelector(".layout-4-columns");

if (document.querySelector(".panda")) {
  feedingRange.addEventListener("click", feedingRangeClickHandler);
  inputForm.addEventListener("change", inputHandler);
  inputForm.addEventListener("input", validateAmount);
} else {
  if (window.innerWidth <= 860) {
    const testimonialsList = document.querySelector(".carousel__container");
    testimonialsList.addEventListener("click", testimonialsClickHandler);
  }

  const progressBar = document.querySelector(".progress-bar__wrapper input");
  

  if (window.innerWidth <= 1160 && window.innerWidth > 860) {
    document.querySelector(".progress-bar__wrapper input").max = 8;
  }

  

  layout.style.right = 0 + "px";
  progressBar.addEventListener("input", progressBarHandler);

  const items = document.querySelectorAll(".item");
  const leftButton = document.querySelector(".slider-button_left");
  const rightButton = document.querySelector(".slider-button_right");

  let currentItem = 0;
  let isEnable = true;

  const changeCurrentItem = function (n) {
    currentItem = (n + items.length) % items.length;
  };

  const hideItem = function (direction) {
    isEnable = false;
    items[currentItem].classList.add("item" + direction);
    items[currentItem].addEventListener("animationend", function () {
      this.classList.remove("item_active", "item" + direction);
    });
  };

  const showItem = function (direction) {
    items[currentItem].classList.add("item_next", "item" + direction);
    generateRandomSlider();
    items[currentItem].addEventListener("animationend", function () {
      this.classList.remove("item_next", "item" + direction);
      this.classList.add("item_active");
      isEnable = true;
    });
  };

  const previousItem = function (n) {
    hideItem("_to-right");
    changeCurrentItem(n - 1);
    showItem("_from-left");
  };

  const nextItem = function (n) {
    hideItem("_to-left");
    changeCurrentItem(n + 1);
    showItem("_from-right");
  };

  leftButton.addEventListener("click", function () {
    if (isEnable) {
      
      previousItem(currentItem);
    }
  });

  rightButton.addEventListener("click", function () {
    if (isEnable) {
      
      nextItem(currentItem);
    }
  });
}


