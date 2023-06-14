/* Updated Menu */
var menuLinks = [
    {text: 'about', href: '/about'},
    {text: 'catalog', href: '#', subLinks: [
      {text: 'all', href: '/catalog/all'},
      {text: 'top selling', href: '/catalog/top'},
      {text: 'search', href: '/catalog/search'},
    ]},
    {text: 'orders', href: '#' , subLinks: [
      {text: 'new', href: '/orders/new'},
      {text: 'pending', href: '/orders/pending'},
      {text: 'history', href: '/orders/history'},
    ]},
    {text: 'account', href: '#', subLinks: [
      {text: 'profile', href: '/account/profile'},
      {text: 'sign out', href: '/account/signout'},
    ]},
  ];


const mainEl = document.querySelector('main');

mainEl.style.backgroundColor = 'var(--main-bg)';

mainEl.innerHTML = '<h1>DOM Manipulation</h1>';

mainEl.classList.add('flex-ctr');

/* Ryan H suggestion:
mainE1.style.backgroundColor = getComputedStyle(document.querySelector(':root')).getPropertyValue('--main-bg'); 
*/

const topMenuEl = document.querySelector('#top-menu');

topMenuEl.style.height = '100%';

topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';

topMenuEl.classList.add('flex-around');

for (let i = 0; i < menuLinks.length; i++) {
    let a = document.createElement('a');
    a.innerText = menuLinks[i].text;
    a.href = menuLinks[i].href;
    topMenuEl.append(a);
};
/* --------- Part 2 ------------- */

const subMenuEl = document.querySelector('#sub-menu');

subMenuEl.style.height = '100%';

subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';

subMenuEl.classList.add('flex-around');

subMenuEl.style.position = 'absolute';

subMenuEl.style.top = '0';

const topMenuLinks = topMenuEl.querySelectorAll('a');

let showingSubMenu = false;

topMenuEl.addEventListener('click', function(evt) {
    evt.preventDefault();
    if (evt.target.tagName !== 'A') {
        return
    };
    console.log(evt.target.textContent);
    if (evt.target.classList.contains('active')) {
        evt.target.classList.remove('active');
        showingSubMenu = false;
        subMenuEl.style.top = '0';
        return;
    }
    for (link of topMenuLinks) {
        link.classList.remove('active');
    }
    evt.target.classList.add('active');

    const linkObj = menuLinks.find(link => link.text === evt.target.textContent);
    if (linkObj && linkObj.subLinks) {
        showingSubMenu = true;
        buildSubMenu(linkObj.subLinks);
        subMenuEl.style.top = '100%';
    } else {
        showingSubMenu = false;
        subMenuEl.style.top = '0';
    }
    if (evt.target.text === 'about') {
        mainEl.innerHTML = '<h1>About</h1>';
        return;
    }
});

function buildSubMenu(subLinks) {
    subMenuEl.innerHTML = '';
    subLinks.forEach(function(link){
        const subLink = document.createElement('a');
        subLink.href = link.href;
        subLink.textContent = link.text;
        subMenuEl.appendChild(subLink);
    })
}

subMenuEl.addEventListener('click', function(evt) {
    evt.preventDefault();
    if (evt.target.tagName !== 'A') {
        return;
    }
    console.log(evt.target.textContent);
    showingSubMenu = false;
    subMenuEl.style.top = '0';
    topMenuLinks.forEach(function(link) {
        link.classList.remove('active');
    });
    mainEl.innerHTML = '<h1>' + evt.target.textContent + '</h1>';
});