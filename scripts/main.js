//sXrXC67iRz

let products = {};

const data = {
  sort: '',
  category: [],
};

const checkedEl = {
  sort: '',
  category: [],
};

//elements
let loader, filtersDiv, appliedFiltersDiv, blurDiv, btns, mainContainer;

let currentPage = 'recommended';

let appliedFilters = [];

//-------------------------Main-------------------------
document.addEventListener('DOMContentLoaded', function () {
  loader = document.querySelector('.main__loader');
  filtersDiv = document.querySelector('.filters');
  appliedFiltersDiv = document.querySelector('.main__filterBar__filters');
  appliedWrapperDiv = document.querySelector('.main__filterBar');
  blurDiv = document.querySelector('.blur');
  mainContainer = document.querySelector('.main__container');

  btns = document.querySelectorAll('.nav__list__element');

  btns.forEach((el) => {
    el.addEventListener('click', function (e) {
      currentPage = el.dataset.tabName;

      activeElement(e);

      if (currentPage === 'all') {
        appliedWrapperDiv.classList.add('main__filterBar--active');
        mainContainer.classList.add('main__container--all');
        getProducts(data);
      } else {
        appliedWrapperDiv.classList.remove('main__filterBar--active');
        mainContainer.classList.remove('main__container--all');
      }

      if (currentPage === 'new') {
        getProducts({
          sort: 'id,desc',
          limit: 4,
        });
      }

      if (currentPage === 'recommended') {
        getProducts({
          limit: 4,
          recommended: true,
        });
      }
    });
  });

  document.querySelector('.filters__apply').addEventListener('click', function () {
    applyFilters();
  });

  document.querySelector('.main__filterBar__icon').addEventListener('click', openFilters);
  document.querySelector('.back__icon').addEventListener('click', closeFilters);

  document.querySelector('.back__icon--desc').addEventListener('click', closeDescription);

  document.querySelector('.open__popUp').addEventListener('click', toggleHowToOrder);

  window.addEventListener('resize', closeOnResize);

  getProducts({
    limit: 4,
    recommended: true,
  });
});

const activeElement = (e) => {
  btns.forEach((el) => {
    if (el.classList.contains('nav__list__element--active')) el.classList.remove('nav__list__element--active');
  });
  e.target.classList.add('nav__list__element--active');
};

//-------------------------Description product-------------------------
const generateProduct = ([product]) => {
  const img = document.createElement('img');
  const h2 = document.createElement('h2');
  const price = document.createElement('p');
  const description = document.createElement('div');

  img.classList.add('card__image');
  h2.classList.add('card__name');
  description.classList.add('card__description');
  price.classList.add('card__price');

  // img.src = ` http://www.masarniazawistowski.pl/katalog/php/img/${products[i].adresZdjecia}`;

  img.src = `./php/img/${product.adresZdjecia}`;
  img.alt = product.nazwaProduktu;
  h2.textContent = product.nazwaProduktu;
  description.textContent = product.opisProduktu;
  price.textContent = `Cena: ${product.cenaProduktu} zł`;

  const cardDesktop = document.querySelector('.card--desktop');
  cardDesktop.innerHTML = '';

  cardDesktop.appendChild(img);
  cardDesktop.appendChild(h2);
  cardDesktop.appendChild(description);
  cardDesktop.appendChild(price);
};

//-------------------------Description-------------------------
const showDescription = (e) => {
  const id = e.target.dataset.id;
  if (window.innerWidth < 767) {
    e.target.previousElementSibling.previousElementSibling.classList.toggle('card__description--open');
    if (e.target.textContent === 'mniej...') e.target.textContent = 'więcej...';
    else e.target.textContent = 'mniej...';
  } else {
    document.querySelector('.description__desktop').classList.add('description__desktop--open');
    blurDiv.classList.add('blur--show');
    const product = products.filter((el) => el.id === id);
    generateProduct(product);
  }
};

const closeDescription = (e) => {
  document.querySelector('.description__desktop').classList.remove('description__desktop--open');
  document.querySelector('.popUp--description').classList.remove('popUp--description--open');
  blurDiv.classList.remove('blur--show');
};

const closeOnResize = () => {
  if (window.innerWidth < 767) closeDescription();
  else findOpenedDesc();
};

const findOpenedDesc = () => {
  const elements = document.querySelectorAll('.card__description--open');
  elements.forEach((el) => {
    el.classList.remove('card__description--open');
    el.nextElementSibling.nextElementSibling.textContent = 'więcej...';
  });
};

//-------------------------How to order-------------------------
const toggleHowToOrder = () => {
  document.querySelector('.popUp--description').classList.toggle('popUp--description--open');
};

//-------------------------Filters-------------------------
const removeFilterFromApplied = (e) => {
  const el = e.target;
  const id = el.parentNode.parentNode.dataset.id;
  appliedFilters[id].checked = false;
  applyFilters();
};

const generateAppliedFilters = () => {
  appliedFilters = [];
  appliedFiltersDiv.innerHTML = '';

  if (data.sort.length > 0) appliedFilters.push(checkedEl.sort);
  appliedFilters.push(...checkedEl.category);

  appliedFilters.forEach((el, i) => {
    const div = document.createElement('div');
    div.classList.add('filter');
    div.dataset.id = i;
    const p = document.createElement('p');
    p.textContent = el.nextElementSibling.textContent;
    const button = document.createElement('button');
    const img = document.createElement('img');
    img.src = './images/cross.svg';
    button.appendChild(img);
    div.appendChild(p);
    div.appendChild(button);

    button.addEventListener('click', function (e) {
      removeFilterFromApplied(e);
    });

    appliedFiltersDiv.appendChild(div);
  });
};

const applyFilters = () => {
  const sortInputs = document.querySelectorAll('.sort__item');
  const [checkedSort] = [...sortInputs].filter((el) => el.checked);
  data.sort = checkedSort ? checkedSort.value : '';
  checkedEl.sort = checkedSort ? checkedSort : '';

  const filtersInputs = document.querySelectorAll('.filter__item');
  const checkedFilter = [...filtersInputs].filter((el) => el.checked);
  const filters = checkedFilter.map((el) => el.value);
  data.category = filters;
  checkedEl.category = checkedFilter;
  generateAppliedFilters();
  closeFilters();
  getProducts(data);
};

const openFilters = () => {
  filtersDiv.classList.add('filters--open');
  blurDiv.classList.add('blur--show');
};

const closeFilters = () => {
  filtersDiv.classList.remove('filters--open');
  blurDiv.classList.remove('blur--show');
};

//-------------------------Loader-------------------------
const hideLoader = () => {
  loader.style.zIndex = -1;
  loader.style.display = 'none';
};

const showLoader = () => {
  loader.style.zIndex = 900;
  loader.style.display = 'flex';
};

//--------------------------------------------------
const generateProducts = (products) => {
  const divProductsContainer = document.querySelector('.main__container');

  hideLoader();

  divProductsContainer.innerHTML = '';

  for (let i = 0; i < products.length; i++) {
    const div = document.createElement('div');
    const img = document.createElement('img');
    const h2 = document.createElement('h2');
    const price = document.createElement('p');
    const more = document.createElement('p');
    const description = document.createElement('div');

    div.classList.add('card');
    img.classList.add('card__image');
    h2.classList.add('card__name');
    description.classList.add('card__description');
    price.classList.add('card__price');
    more.classList.add('card__more');

    // img.src = ` http://www.masarniazawistowski.pl/katalog/php/img/${products[i].adresZdjecia}`;

    img.src = `./php/img/${products[i].adresZdjecia}`;
    img.alt = products[i].nazwaProduktu;
    h2.textContent = products[i].nazwaProduktu;
    description.textContent = products[i].opisProduktu;
    price.textContent = `Cena: ${products[i].cenaProduktu} zł`;
    more.textContent = 'więcej...';
    more.dataset.id = products[i].id;

    more.addEventListener('click', showDescription);

    div.classList.add('product');

    div.appendChild(img);
    div.appendChild(h2);
    div.appendChild(description);
    div.appendChild(price);
    div.appendChild(more);

    divProductsContainer.appendChild(div);
  }
};

//-------------------------Pobieranie produktów z bazy-------------------------
const getProducts = (data) => {
  url = './php/get_products.php';

  showLoader();

  fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res);
      }
    })
    .then((res) => {
      if (res.success === false) {
        document.querySelector('.main__container').textContent = 'Brak produktów z podanymi filtrami.';
        hideLoader();
      } else if (res.length > 0) generateProducts(res);
      products = res;
    })
    .catch((err) => {
      console.log(err);
    });
};
