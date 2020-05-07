const nav = document.querySelector('.nav__list');
const container = document.querySelector('.main__container');
const filter = document.querySelector('.main__filterBar')
let activeTab = 'recommended';

const changeTab = e => {
    if(e.target.classList.contains('nav__list__element')){
        const menu = [...nav.children];
        menu.map(el => el.classList.remove('nav__list__element--active'))
        e.target.classList.add('nav__list__element--active');
        activeTab = e.target.dataset.tabName;
        console.log(activeTab);
        if(activeTab === 'all'){
            container.classList.add('main__container--all');
            filter.classList.add('main__filterBar--active');
        }
        else{
            container.classList.remove('main__container--all');
            filter.classList.remove('main__filterBar--active');
        }

    }
    
}

nav.addEventListener('click', changeTab)