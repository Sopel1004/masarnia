document.addEventListener('DOMContentLoaded', function () {
  getCategories();
});

const generateCategories = (cat) => {
  const catDiv = document.querySelectorAll('.filters__type > .wrapper')[1];
  cat.forEach((el, i) => {
    const item = document.createElement('div');
    const input = document.createElement('input');
    const label = document.createElement('label');

    item.classList.add('filters__item');

    input.type = 'checkbox';
    input.value = el.id;
    input.id = `filter__item--${el.id}`;
    input.classList.add('item', 'filter__item');
    input.name = 'filter__item';

    label.classList.add('item__title');
    label.htmlFor = `filter__item--${el.id}`;
    label.textContent = el.nazwaKategorii;

    item.appendChild(input);
    item.appendChild(label);

    catDiv.appendChild(item);
  });
};

const getCategories = () => {
  url = './php/get_categories.php';

  fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res);
      }
    })
    .then((res) => {
      if (res.success) console.log('Brak danych!');
      else {
        generateCategories(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
