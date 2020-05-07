const nav = document.querySelector('.nav__list');
const container = document.querySelector('.main__container');

const changeTab = e => {
    const menu = [...nav.children];
    menu.map(el => el.classList.remove('nav__list__element--active'))
    e.target.classList.toggle('nav__list__element--active')
    if(e.target.dataset.tabName==='recommended'){
        container.classList.add('main__container--recommended');
    }
    else{
        container.classList.remove('main__container--recommended');
    }
}

nav.addEventListener('click', changeTab)