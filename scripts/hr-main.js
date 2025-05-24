
const toggleBtn = document.querySelector('.toggle');
const toggleText = document.querySelector('#toggle-text')
const appleContainer = document.querySelector('.container');
const hrContainer = document.querySelector('.hr-container');


const width = window.innerWidth;

// COOKIES - MODE

function getCookie(){
    const cookies = document.cookie.split(',');
    let mode = 'mode' + '=';
    
    for(let i = 0; i < cookies.length; i++){
        let c = cookies[i].trim();

        if(c.indexOf(mode) === 0){
            return c.substring(mode.length, c.length);
        }
    }

    return null;
}

function setCookieIfNone(){

    if(!getCookie()){
        let expires = '';

        const date = new Date();
        date.setTime(date.getTime()+(3*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();

        document.cookie = 'mode' + "=" + 'apple' + expires + "; path=/";
    }
    else{
        if(getCookie() == 'apple'){
            toggleText.textContent = 'HR Mode';
        }
        else{
            toggleText.textContent = 'Apple Mode';
        }
    }
}

function setCookie(value){

    document.cookie = `mode=${value}`;
}

function updateUI(){
    if(getCookie() == 'hr'){
        appleContainer.style.display = 'none';
        hrContainer.style.display = 'flex';
        toggleText.textContent = 'Apple Mode';
    }
    else{
        appleContainer.style.display = 'flex'
        hrContainer.style.display = 'none';
        toggleText.textContent = 'HR Mode';
    }
}


if(width > 880){
    setCookieIfNone();
    updateUI();
}


toggleBtn.addEventListener('click',()=>{

    if(getCookie('mode') == 'apple'){
        setCookie('hr')
    }
    else{
        setCookie('apple');
    }
    
    updateUI();
})



// MENU TOGGLE
const toggleMenuBtn = document.querySelector('.menu-toggle-btn');
const homeBtn =  document.querySelector('#home-folder');
const aboutBtn =  document.querySelector('#about-folder');
const projectsBtn =  document.querySelector('#projects-folder');
const downloadsBtn =  document.querySelector('#downloads-folder');

const test =  document.querySelector('#test');



let menuState = ''; 

function switchContent(next){
    document.querySelector(`#${next}-folder`).classList.remove('hide');
    document.querySelector(`#${next}-folder`).classList.add('show');
    document.querySelector(`#${next}-folder`).querySelector('.tab').innerHTML = `${document.querySelector(`#${next}-folder`).querySelector('.tab').innerHTML} &#8853;`;

    if(menuState != ''){
        document.querySelector(`#${menuState}-folder`).classList.add('hide')
        document.querySelector(`#${menuState}-folder`).classList.remove('show')
        document.querySelector(`#${menuState}-folder`).querySelector('.tab').innerHTML = `${document.querySelector(`#${menuState}-folder`).querySelector('.tab').textContent.substring(0,document.querySelector(`#${menuState}-folder`).querySelector('.tab').textContent.length-2)}`;
    }

    if(menuState == next){
        menuState = '';
        document.querySelector(`#${next}-folder`).querySelector('.tab').innerHTML = `${document.querySelector(`#${next}-folder`).querySelector('.tab').textContent.substring(0,document.querySelector(`#${next}-folder`).querySelector('.tab').textContent.length-2)}`;
    }
    else{
        menuState = next;
    }

    test.textContent = menuState;
}  

homeBtn.addEventListener('click',()=>{
    switchContent('home');
})

aboutBtn.addEventListener('click',()=>{
    switchContent('about');
})

projectsBtn.addEventListener('click',()=>{
    switchContent('projects');
})

downloadsBtn.addEventListener('click',()=>{
    switchContent('downloads');
})

toggleMenuBtn.addEventListener('click', ()=>{
    switch(menuState){
        case '':
            switchContent('home');
            break;
        case 'home':
            switchContent('about');
            break;
        case 'about':
            switchContent('projects');
            break;
        case 'projects':
            switchContent('downloads');
            break;
        case 'downloads':
            switchContent('home');
            break;
    }
})