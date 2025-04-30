
const aboutBtn = document.getElementById('about-btn');
const projectsBtn = document.getElementById('projects-btn');
const downloadsBtn = document.getElementById('downloads-btn');

const UI_CONTENT = document.getElementById('ui-content');

// ABOUT TAB
aboutBtn.addEventListener('dblclick', ()=>{

    const aboutWindow = createAbout();

    UI_CONTENT.appendChild(aboutWindow);

    dragWindow(aboutWindow);
});

// close 
document.body.addEventListener('click',(event)=>{
    if(event.target.matches('.close-about-btn')){
        destroyAbout();
    }
    else if(event.target.matches('.close-projects-btn')){
        destroyProjects();
    }
    else if(event.target.matches('.project0')){
        destroyProject(0);
    }
    else if(event.target.matches('.project1')){
        destroyProject(1);
    }
    else if(event.target.matches('.project2')){
        destroyProject(2);
    }
    else if(event.target.matches('.project3')){
        destroyProject(3);
    }
    else if(event.target.matches('.project4')){
        destroyProject(4);
    }
});

// PROJECTS TAB
projectsBtn.addEventListener('dblclick', ()=>{
    const projectsWindow = createProjects();

    UI_CONTENT.appendChild(projectsWindow);

    dragWindow(projectsWindow);
})

// Single project 
document.body.addEventListener('dblclick', (event)=>{

    console.log(`Current: ${event.target.id}`);
    console.log(`Parent: ${event.target.parentElement.id}`);

    if(['project0','project1','project2','project3','project4'].includes(event.target.id) || ['project0','project1','project2','project3','project4'].includes(event.target.parentElement.id)){
        
        let temp;

        if(event.target.id){
            temp = createProject(event.target.id.at(-1));
        }
        else{
            temp = createProject(event.target.parentElement.id.at(-1));
        }
        UI_CONTENT.appendChild(temp);

        dragWindow(temp);
    }  

})

// Drag about section
function dragWindow(element){
    var initialX = 0, initialY = 0, currentX = 0, currentY = 0;

    if(element.querySelector('.about-toolbar')){
        element.querySelector('.about-toolbar').onmousedown = dragMouseDown;
    }
    else{
        element.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e){
        e.preventDefault();
        initialX = e.clientX;
        initialY = e.clientY;

        document.onmouseup = closeDragElement;
        document.onmousemove = dragElement;
    }

    function dragElement(e){
        e.preventDefault();

        currentX = initialX - e.clientX;
        currentY = initialY - e.clientY;

        initialX = e.clientX;
        initialY = e.clientY;

        element.style.top = (element.offsetTop - currentY)+'px';
        element.style.left = (element.offsetLeft - currentX)+'px';
    }

    function closeDragElement(){
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function createAbout(){
    const aboutWindow = document.createElement('div');
    aboutWindow.classList.add('about-window');

    const aboutWindowToolbar = document.createElement('div');
    const closeBtnContainer = document.createElement('div');
    closeBtnContainer.classList.add('close-btn-container')
    const closeBtn = document.createElement('div');
    closeBtn.classList.add('close-about-btn');
    closeBtnContainer.appendChild(closeBtn)
    const titleContainer = document.createElement('div');
    titleContainer.classList.add('title-container');
    const title = document.createElement('p');
    titleContainer.appendChild(title);
    title.textContent = 'About me';

    aboutWindowToolbar.classList.add('about-toolbar');
    aboutWindowToolbar.appendChild(closeBtnContainer);
    aboutWindowToolbar.appendChild(titleContainer);

    const introContainer = document.createElement('div');
    introContainer.classList.add('intro-container');

    const intro = document.createElement('p');
    intro.textContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

    introContainer.appendChild(intro);

    const skills = ['JavaScript','C++','NodeJs','HTML','CSS','Python','Linux','AWS','Bash'];

    const skillsContainer = document.createElement('div');
    let temp = document.createElement('h5');
    temp.textContent = 'Skills';
    skillsContainer.appendChild(temp);
    skillsContainer.appendChild(createTable(skills));
    skillsContainer.classList.add('skills-container');

    
    const interests = ['Cryptography','Networking','Mathematics','History','Open Source','Security'];

    const interestsContainer = document.createElement('div');
    temp = document.createElement('h5');
    temp.textContent = 'Other Interests';
    interestsContainer.appendChild(temp);
    interestsContainer.appendChild(createTable(interests));
    interestsContainer.classList.add('interests-container');

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('imageDiv');
    const img = document.createElement('img');
    img.src = 'images/smile.png';
    imageDiv.appendChild(img)


    const row1 = document.createElement('div');
    const row2 = document.createElement('div');
    row1.classList.add('about-row');
    row1.classList.add('row1');
    row2.classList.add('about-row');
    row2.classList.add('row2');

    row1.appendChild(introContainer);
    row1.appendChild(interestsContainer);
    row2.appendChild(skillsContainer);
    row2.appendChild(imageDiv);

    aboutWindow.appendChild(aboutWindowToolbar)
    aboutWindow.appendChild(row1);
    aboutWindow.appendChild(row2);

    return aboutWindow;
}

function createProjects(){
    const projectsWindow = document.createElement('div');
    projectsWindow.classList.add('projects-window');

    const projectsWindowToolbar = document.createElement('div');
    const closeBtnContainer = document.createElement('div');
    closeBtnContainer.classList.add('close-btn-container')
    const closeBtn = document.createElement('div');
    closeBtn.classList.add('close-projects-btn');
    closeBtnContainer.appendChild(closeBtn)
    const titleContainer = document.createElement('div');
    titleContainer.classList.add('title-container');
    const title = document.createElement('p');
    titleContainer.appendChild(title);
    title.textContent = 'Projects';

    projectsWindowToolbar.classList.add('projects-toolbar');
    projectsWindowToolbar.appendChild(closeBtnContainer);
    projectsWindowToolbar.appendChild(titleContainer);

    // project folders
    const projectFolders = document.createElement('div');
    projectFolders.classList.add('project-folders');

    let projectNames = ['File-lock Desktop','Studio','File-lock CLI','AES Library','Trivium Cipher'];
    for(let i = 0; i < 5; i++){
        const projectShortcut = document.createElement('div');
        projectShortcut.classList.add('project-shortcut');

        const projectThumbnail = document.createElement('img');
        const projectTitle = document.createElement('p');

        projectThumbnail.src = 'images/disk.png';
        projectThumbnail.style.zIndex = '999';
        projectTitle.textContent = projectNames[i];

        projectShortcut.appendChild(projectThumbnail);
        projectShortcut.appendChild(projectTitle);
        projectShortcut.id = `project${i}`;

        projectFolders.appendChild(projectShortcut);
    }

    projectsWindow.appendChild(projectsWindowToolbar);
    projectsWindow.appendChild(projectFolders);

    return projectsWindow;
}

function createProject(projectNumber){

    let projectNames = ['File-lock Desktop','Studio','File-lock CLI','AES Library','Trivium Cipher'];
    let descriptions = [
        "A cross-platform desktop app that lets you encrypt and decrypt files or folders using strong AES encryption. Built with Electron and C++, it works on Windows, Linux, and macOS — and you can either build it yourself or just download the installer. It features a cryptographically secure key generator, giving users full control over encryption keys for serious privacy.",
        "A small business website built with Node.js and deployed on Vercel, featuring a secure authentication system for the owner. Through the admin panel, the owner can create and manage posts with text and images, and update a dynamic calendar to schedule classes or events. The backend handles content and calendar updates efficiently, while the frontend provides a responsive, streamlined interface for users and admins alike.",
        "A cross-platform command-line tool for encrypting and decrypting files or folders using AES encryption. Written in C++, it offers a lightweight alternative to the desktop version, with support for custom or auto-generated cryptographically secure keys. Designed for developers and power users, it provides fast, local encryption without any dependencies or GUI overhead.",
        "A lightweight C++ library implementing AES encryption with support for 128-, 192-, and 256-bit keys. Built from scratch for portability and clarity, it includes a cryptographically secure key generation function, making it suitable for both educational use and integration into custom security tools. The library performs all core AES operations internally without relying on external dependencies.",
        "A minimal and efficient C++ library implementing the Trivium stream cipher, designed for lightweight cryptographic applications. It includes a secure key and IV generation function, enabling straightforward integration into embedded systems, custom encryption tools, or academic projects. The implementation is self-contained and dependency-free, offering clear structure and consistent performance across platforms."
    ];

    let skills = [
        ['JavaScript','Electron','NodeJS','C++','AES'],
        ['Node Js','Vercel','HTML','CSS','Responsive Design'],
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

    const projectWindow = document.createElement('div');
    projectWindow.classList.add('project-window');
    projectWindow.classList.add(`project${projectNumber}`);

    const projectWindowToolbar = document.createElement('div');
    const closeBtnContainer = document.createElement('div');
    closeBtnContainer.classList.add('close-btn-container')
    const closeBtn = document.createElement('div');
    closeBtn.classList.add('close-project-btn');
    closeBtn.classList.add(`project${projectNumber}`);
    closeBtnContainer.appendChild(closeBtn)
    const titleContainer = document.createElement('div');
    titleContainer.classList.add('title-container');
    const title = document.createElement('p');
    titleContainer.appendChild(title);
    title.textContent = projectNames[projectNumber];

    projectWindowToolbar.classList.add('projects-toolbar');
    projectWindowToolbar.appendChild(closeBtnContainer);
    projectWindowToolbar.appendChild(titleContainer);

    const projectFolder = document.createElement('div');
    projectFolder.classList.add('project-content');

    const intro = document.createElement('p');
    intro.textContent = descriptions[projectNumber];

    const skillsUL = document.createElement('ul');
    for(let i = 0; i < 5; i++){
        const skill = document.createElement('li');
        skill.innerHTML = skills[projectNumber][i];
        skillsUL.appendChild(skill);
    }

    const link = document.createElement('a');
    link.src = links[projectNumber];

    projectFolder.appendChild(intro);
    projectFolder.appendChild(skillsUL);
    projectFolder.appendChild(link);

    projectWindow.appendChild(projectWindowToolbar);
    projectWindow.appendChild(projectFolder);

    return projectWindow;
}

function destroyAbout(){
    const temp = UI_CONTENT.querySelector('.about-window');

    if(temp){
        UI_CONTENT.removeChild(temp);
    }
}

function destroyProject(projectNumber){
    const temp = UI_CONTENT.querySelector(`.project${projectNumber}`);

    if(temp){
        UI_CONTENT.removeChild(temp);
    }
}

function destroyProjects(){
    const temp = UI_CONTENT.querySelector('.projects-window');

    if(temp){
       
        UI_CONTENT.removeChild(temp);
    }
}

function createTable(data){
    const table = document.createElement('table');

    for(let i = 0; i < data.length; i+=3){
        let row = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');

        td1.innerHTML = data[i]; td2.innerHTML = data[i+1]; td3.innerHTML = data[i+2];
        row.appendChild(td1); row.appendChild(td2); row.appendChild(td3);
        table.appendChild(row);
    }

    return table;
}