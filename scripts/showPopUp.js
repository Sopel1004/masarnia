const button = document.querySelector('.header__button');
const popUp = document.querySelector('.popUp');

const showPopUp = () => {
  popUp.classList.toggle('popUp--active');
};

button.addEventListener('click', showPopUp);
