
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

const homeContent = document.querySelector('.home-content');
const aboutContent = document.querySelector('.about-content');
const projectsContent = document.querySelector('.projects-content');
const downloadsContent = document.querySelector('.downloads-content');



let menuState = ''; 

function switchContent(next){
    if(width > 800){
        document.querySelector(`#${next}-folder`).classList.remove('hide');
        document.querySelector(`#${next}-folder`).classList.add('show');
    }
    
    if(width > 460){
        document.querySelector(`#${next}-folder`).querySelector('.tab').innerHTML = `${document.querySelector(`#${next}-folder`).querySelector('.tab').innerHTML} &#8853;`;
    }
    else{
        document.querySelector(`#${next}-folder`).querySelector('.tab').style.backgroundColor = 'red';
    }

    if(menuState != ''){
        if(width > 800){
            document.querySelector(`#${menuState}-folder`).classList.add('hide')
            document.querySelector(`#${menuState}-folder`).classList.remove('show')
        }
        if(width > 460){
            document.querySelector(`#${menuState}-folder`).querySelector('.tab').innerHTML = `${document.querySelector(`#${menuState}-folder`).querySelector('.tab').textContent.substring(0,document.querySelector(`#${menuState}-folder`).querySelector('.tab').textContent.length-2)}`;
        }
        else{
            document.querySelector(`#${menuState}-folder`).querySelector('.tab').style.backgroundColor = '#f3c674';
        }
        
    }

    if(menuState == next){
        menuState = '';
        if(width > 460){
            document.querySelector(`#${next}-folder`).querySelector('.tab').innerHTML = `${document.querySelector(`#${next}-folder`).querySelector('.tab').textContent.substring(0,document.querySelector(`#${next}-folder`).querySelector('.tab').textContent.length-2)}`;
        }
    }
    else{
        menuState = next;
    }
}  

function updateContent(menuState){
    switch(menuState){
        case '':
            aboutContent.style.display = 'none';
            projectsContent.style.display = 'none';
            downloadsContent.style.display = 'none';
            homeContent.style.display = 'flex';
            break;
        case 'home':
            aboutContent.style.display = 'none';
            projectsContent.style.display = 'none';
            downloadsContent.style.display = 'none';
            homeContent.style.display = 'flex';
            break;
        case 'about':
            homeContent.style.display = 'none';
            projectsContent.style.display = 'none';
            downloadsContent.style.display = 'none';
            aboutContent.style.display = 'flex';
            break;
        case 'projects':
            homeContent.style.display = 'none';
            aboutContent.style.display = 'none';
            downloadsContent.style.display = 'none';
            projectsContent.style.display = 'flex';
            break;
        case 'downloads':
            homeContent.style.display = 'none';
            aboutContent.style.display = 'none';
            projectsContent.style.display = 'none';
            downloadsContent.style.display = 'flex';
            break;
    }
}

homeBtn.addEventListener('click',()=>{
    switchContent('home');
    updateContent(menuState);
})

aboutBtn.addEventListener('click',()=>{
    switchContent('about');
    updateContent(menuState);
})

projectsBtn.addEventListener('click',()=>{
    switchContent('projects');
    updateContent(menuState);
})

downloadsBtn.addEventListener('click',()=>{
    switchContent('downloads');
    updateContent(menuState);
})

toggleMenuBtn.addEventListener('click', ()=>{
    switch(menuState){
        case '':
            switchContent('home');
            updateContent(menuState);
            break;
        case 'home':
            switchContent('about');
            updateContent(menuState);
            break;
        case 'about':
            switchContent('projects');
            updateContent(menuState);
            break;
        case 'projects':
            switchContent('downloads');
            updateContent(menuState);
            break;
        case 'downloads':
            switchContent('home');
            updateContent(menuState);
            break;
    }
})



// PROJECTS DISPLAY
const projectButtons = document.querySelectorAll('.hr-project-btn');
const projectPlane = document.querySelector('.hr-projects-showcase')

projectButtons.forEach(button =>{
    button.addEventListener('click',()=>{
        if(width < 800){
            colorProjectButton(button);
        }
        const index = button.classList[1].substring(button.classList[1].length-1);
        showProject(index);
    })
})

function showProject(index){

    if(document.querySelector('.show-project')){
        projectPlane.removeChild(document.querySelector('.show-project'));
    }

    let projectNames = ['File-lock Desktop','Studio','File-lock CLI','AES Library','Trivium Cipher'];
    let descriptions = [
        "A cross-platform desktop app that lets you encrypt and decrypt files or folders using strong AES encryption. Built with Electron and C++, it works on Windows, Linux, and macOS — and you can either build it yourself or just download the installer. It features a cryptographically secure key generator, giving users full control over encryption keys for serious privacy.",
        "A small business website built with Node.js and deployed on Vercel, featuring a secure authentication system for the owner. Through the admin panel, the owner can create and manage posts with text and images, and update a dynamic calendar to schedule classes or events. The backend handles content and calendar updates efficiently, while the frontend provides a responsive, streamlined interface for users and admins alike.",
        "A cross-platform command-line tool for encrypting and decrypting files or folders using AES encryption. Written in C++, it offers a lightweight alternative to the desktop version, with support for custom or auto-generated cryptographically secure keys. Designed for developers and power users, it provides fast, local encryption without any dependencies or GUI overhead.",
        "A lightweight C++ library implementing AES encryption with support for 128-, 192-, and 256-bit keys. Built from scratch for portability and clarity, it includes a cryptographically secure key generation function, making it suitable for both educational use and integration into custom security tools. The library performs all core AES operations internally without relying on external dependencies.",
        "A minimal and efficient C++ library implementing the Trivium stream cipher, designed for lightweight cryptographic applications. It includes a secure key and IV generation function, enabling straightforward integration into embedded systems, custom encryption tools, or academic projects. The implementation is self-contained and dependency-free, offering clear structure and consistent performance across platforms."
    ];

    let images = ['../images/appleLisa.png']

    let skills = [
        ['JavaScript','Electron','NodeJS','C++','AES'],
        ['Node Js','Vercel','HTML','CSS','Responsive'],
        ['C++','AES','Cross-Platform','File I/O operations'],
        ['C++','AES','Lightweight','No dependencies','ECB/CBC'],
        ['C++','AES','Lightweight','No dependencies','Text/byte data']
    ];

    let links = [
        'https://github.com/constantin9845/File-lock-desktop',
        'https://studio-alpha-six.vercel.app',
        'https://github.com/constantin9845/file-lock',
        'https://github.com/constantin9845/AES-128-192-256',
        'https://github.com/constantin9845/Trivium-encoder'
    ];

    const project = document.createElement('div');
    project.classList.add('show-project');

    const title = document.createElement('p');
    title.textContent = projectNames[index];
    title.id = 'hr-project-title'

    const description = document.createElement('p');
    description.textContent = descriptions[index];
    description.id = 'hr-project-description'

    const image = images[0];
    const projectSkills = skills[index];
    const link = document.createElement('a');
    link.href = links[index];
    link.textContent = links[index];
    link.id = 'hr-project-link'


    const temp = document.createElement('div');
    temp.classList.add('project-info');


    const skillList = document.createElement('ul');
    projectSkills.forEach(skill => {
        const temp = document.createElement('li');
        temp.innerHTML = skill;
        skillList.appendChild(temp);
    });

    const screenshot = document.createElement('img');
    screenshot.src = image;

    temp.appendChild(screenshot);
    temp.appendChild(skillList);


    project.appendChild(title);
    project.appendChild(description);
    project.appendChild(temp);
    project.appendChild(link);

    projectPlane.appendChild(project);
}

function colorProjectButton(button){
    projectButtons.forEach(btn =>{
        btn.style.backgroundColor = '#f3c674'
    })

    button.style.backgroundColor = 'red';
}

