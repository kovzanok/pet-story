const menuButton=document.querySelector('.hamburger');
const menu=document.querySelector('.menu__wrapper')

const closeMenu=()=>{
    menu.classList.remove('menu__wrapper_active');
    menuButton.classList.remove('hamburger_active');
    document.body.classList.remove('body_lock');
}

const openMenu=()=>{
    menu.classList.add('menu__wrapper_active');
    menuButton.classList.add('hamburger_active');
    document.body.classList.add('body_lock');
}

const menuClickHandler=function(e){
    if (e.target.classList.contains('menu__wrapper')){
        closeMenu();
    }
}


const menuButtonClickHandler=function (e){
    
    if (this.classList.contains('hamburger_active')){
        closeMenu();
    }
    else{
        openMenu();
        menu.addEventListener('click', menuClickHandler)
    }
}


menuButton.addEventListener('click', menuButtonClickHandler)