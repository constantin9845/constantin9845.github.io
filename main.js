import {stack} from './stack.js';
const STACK = new stack();

const aboutBtn = document.getElementById('about-btn');
const projectsBtn = document.getElementById('projects-btn');
const downloadsBtn = document.getElementById('downloads-btn');
const editorBtn = document.getElementById('editor-btn');

const UI_CONTENT = document.getElementById('ui-content');

var VIEW_STYLE = 0;

function bootAnimation(){

    const darkScreen = document.createElement('style');
    darkScreen.textContent = `
        .screen-content::after{
            display: flex;
            justify-content: center;
            align-items: center;
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: black;
            z-index: 99999;
        } 
    `;

    const emptyWhite = document.createElement('style');
    emptyWhite.textContent = `
        .screen-content::after{
            display: flex;
            justify-content: center;
            align-items: center;
            content: url('images/empty.png');
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: transparent;
            z-index: 99999;
        }
    `


    const firstLoader = document.createElement('style');
    firstLoader.textContent =  `
        .screen-content::after{
            display: flex;
            justify-content: center;
            align-items: center;
            content: url('images/empty_load.png');
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: transparent;
            z-index: 99999;
        }
    `;

    const companyInfoLoader = document.createElement('style');
    companyInfoLoader.textContent = `
        .screen-content::after{
            display: flex;
            justify-content: center;
            align-items: center;
            content: url('images/company.png');
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: transparent;
            z-index: 99999;
        }
    `

    document.querySelector('#apple-btn').style.opacity = '0';
    document.querySelector('#file-btn').style.opacity = '0';
    document.querySelector('#edit-btn').style.opacity = '0';
    document.querySelector('#view-btn').style.opacity = '0';
    document.querySelector('#special-btn').style.opacity = '0';
    document.querySelector('#about-btn').style.opacity = '0';
    document.querySelector('#projects-btn').style.opacity = '0';
    document.querySelector('#downloads-btn').style.opacity = '0';
    document.querySelector('#editor-btn').style.opacity = '0';


    document.head.appendChild(darkScreen);

    setTimeout(()=>{
        document.head.removeChild(darkScreen);
        document.head.appendChild(emptyWhite);
    }, 1500);

    setTimeout(()=>{
        document.head.removeChild(emptyWhite);
        document.head.appendChild(firstLoader);
    }, 2500);


    setTimeout(()=>{
        document.head.removeChild(firstLoader);
        document.head.appendChild(emptyWhite);
    }, 4000);

    setTimeout(()=>{
        document.head.removeChild(emptyWhite);
        document.head.appendChild(companyInfoLoader);
    }, 5000);

    setTimeout(()=>{
        document.head.removeChild(companyInfoLoader);
        document.querySelector('#apple-btn').style.opacity = '1';
        document.querySelector('#file-btn').style.opacity = '1';
        document.querySelector('#edit-btn').style.opacity = '1';
        document.querySelector('#view-btn').style.opacity = '1';
        document.querySelector('#special-btn').style.opacity = '1';  
    }, 10000);

    setTimeout(()=>{
        document.querySelector('#about-btn').style.opacity = '1';
        document.querySelector('#projects-btn').style.opacity = '1';
        document.querySelector('#downloads-btn').style.opacity = '1';
        document.querySelector('#editor-btn').style.opacity = '1';
    }, 11000)
                                        

}

bootAnimation()


// ABOUT TAB
aboutBtn.addEventListener('dblclick', ()=>{

    displayAbout();

});

// CLOSE TABS 
document.body.addEventListener('click',(event)=>{

    if(event.target.classList[0] == 'close-btn'){
        destroyWindow(event.target.classList[1].substring(1));
    }

});

// PROJECTS TAB
projectsBtn.addEventListener('dblclick', ()=>{

    displayProjects();
})

// DOWNLOADS TAB
downloadsBtn.addEventListener('dblclick', ()=>{

    displayDownloads();
})

// Open Single project 
document.body.addEventListener('dblclick', (event)=>{

    let temp = ['project0','project1','project2','project3','project4'];
    let temp2 = ['project00','project11','project22','project33','project44'];

    if(temp.includes(event.target.classList[1]) || temp.includes(event.target.parentElement.classList[1])){
        let index = -1; 
        for(let j = 0; j < 5; j++){
            if(event.target.id == temp[j] || event.target.parentElement.id == temp[j]){
                index = j;
                break;
            }
        }

        if(STACK.checkOpen(temp2[index])==-1){

            displayProject(index);
        }
        else{
            STACK.moveFront(temp2[index]);
        }
    }

});

// Focus on single project
document.body.addEventListener('click', (event)=>{

    if(STACK.getTopTab() == 'projects-window'){
        let temp = ['project0','project1','project2','project3','project4'];

        if(temp.includes(event.target.classList[1]) || temp.includes(event.target.parentElement.classList[1])){
            let index = -1; 
            for(let j = 0; j < 5; j++){
                if(event.target.id == temp[j] || event.target.parentElement.id == temp[j]){
                    index = j;
                    break;
                }
            }

            removeFocusProjectIcons();
            focusProjectIcon(document.querySelector(`.project${index}`));
            STACK.setFocus(`project${index}`);
        }
        else{

            try{
                if(
                    !(
                        event.target.id == 'toolbar-link-0' ||
                        event.target.id == 'toolbar-link-1' ||
                        event.target.id == 'toolbar-link-2' ||
                        event.target.id == 'toolbar-link-3' ||
                        event.target.id == 'toolbar-link-4' ||
                        event.target.id == 'apple-btn' ||
                        event.target.id == 'file-btn' ||
                        event.target.id == 'edit-btn' ||
                        event.target.id == 'view-btn' || 
                        event.target.id == 'special-btn'
                    )
                ){
                    removeFocusProjectIcons();
                    STACK.setFocus(null);
                }
            }
            catch(error){
                console.log(error);
            }
        }

    }
})

// Drag about section
function dragWindow(element){
    var initialX = 0, initialY = 0, currentX = 0, currentY = 0;

    if(element.querySelector('.drag-toolbar')){
        element.querySelector('.drag-toolbar').onmousedown = dragMouseDown;
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

// Move tab to front
document.body.addEventListener('click',(event)=>{
    let current = event.target;
    // get all open tabs
    let tabs = STACK.getAllTabs();
    let parents = [];

    while(current.parentElement){
        if(current.parentElement.classList.length == 1){
            parents.push(current.parentElement.className);
        }
        else{
            parents.push(current.parentElement.classList[1]);
        }
        current = current.parentElement;
    }

    for(let i = 0; i < tabs.length; i++){
        if(parents.includes(tabs[i])){
            STACK.moveFront(`${tabs[i]}`);
            break;
        }
    }

})


function createAbout(){
    const aboutWindow = document.createElement('div');
    aboutWindow.classList.add('about-window');

    const aboutWindowToolbar = document.createElement('div');
    const closeBtnContainer = document.createElement('div');
    closeBtnContainer.classList.add('close-btn-container')
    const closeBtn = document.createElement('div');
    closeBtn.classList.add('close-btn');
    closeBtn.classList.add('-about-window');
    closeBtn.classList.add('close-about-btn');
    closeBtnContainer.appendChild(closeBtn)
    const titleContainer = document.createElement('div');
    titleContainer.classList.add('title-container');
    const title = document.createElement('p');
    titleContainer.appendChild(title);
    title.textContent = 'About me';

    aboutWindowToolbar.classList.add('about-toolbar');
    aboutWindowToolbar.classList.add('drag-toolbar');
    aboutWindowToolbar.appendChild(closeBtnContainer);
    aboutWindowToolbar.appendChild(titleContainer);

    const introContainer = document.createElement('div');
    introContainer.classList.add('intro-container');

    const intro = document.createElement('p');
    intro.textContent = "Lorem Ipsum is simply dummy text of the printing and typesetting indus. Lorem Ipsum is simply dummy text of the printing and typesetting indus. Lorem Ipsum is simply dummy text of the printing and typesetting indus. Lorem Ipsum is simply dummy text of the printing and typesetting indus.";

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
    closeBtn.classList.add('close-btn');
    closeBtn.classList.add('-projects-window');
    closeBtn.classList.add('close-projects-btn');
    closeBtnContainer.appendChild(closeBtn)
    const titleContainer = document.createElement('div');
    titleContainer.classList.add('title-container');
    const title = document.createElement('p');
    titleContainer.appendChild(title);
    title.textContent = 'Projects';

    projectsWindowToolbar.classList.add('projects-toolbar');
    projectsWindowToolbar.classList.add('drag-toolbar');
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

        projectThumbnail.src = 'images/floppy-disk.png';
        projectThumbnail.style.zIndex = '999';
        projectTitle.textContent = projectNames[i];

        projectShortcut.appendChild(projectThumbnail);
        projectShortcut.appendChild(projectTitle);
        projectShortcut.id = `project${i}`;
        projectShortcut.classList.add(`project${i}`);

        projectFolders.appendChild(projectShortcut);
    }

    projectsWindow.appendChild(projectsWindowToolbar);
    projectsWindow.appendChild(projectFolders);

    return projectsWindow;
}

function createDownloads(){
    const downloadsWindow = document.createElement('div');
    downloadsWindow.classList.add('downloads-window');

    const downloadsWindowToolbar = document.createElement('div');
    const closeBtnContainer = document.createElement('div');
    closeBtnContainer.classList.add('close-btn-container')
    const closeBtn = document.createElement('div');
    closeBtn.classList.add('close-btn');
    closeBtn.classList.add('-downloads-window');
    closeBtn.classList.add('close-downloads-btn');
    closeBtnContainer.appendChild(closeBtn)
    const titleContainer = document.createElement('div');
    titleContainer.classList.add('title-container');
    const title = document.createElement('p');
    titleContainer.appendChild(title);
    title.textContent = 'Downloads';

    downloadsWindowToolbar.classList.add('downloads-toolbar');
    downloadsWindowToolbar.classList.add('drag-toolbar');
    downloadsWindowToolbar.appendChild(closeBtnContainer);
    downloadsWindowToolbar.appendChild(titleContainer);

    const downloadsContent = document.createElement('div');
    downloadsContent.classList.add('downloads-content');

    const description = document.createElement('p');
    description.textContent = 'Download links of tools I created. Check out the descriptions in the projects section. The source code is available on Github.';

    const links = document.createElement('ul');
    let link = document.createElement('li');
    link.textContent = 'Random Comment Picker (Windows)';
    link.addEventListener('click',()=>{
        window.open('https://github.com/constantin9845/random-comments/releases/download/0.1v/WinCom.exe', "_blank")
    })
    links.appendChild(link);

    link = document.createElement('li');
    link.textContent = 'Windows';
    links.appendChild(link);

    link = document.createElement('li');
    link.textContent = 'Linux';
    links.appendChild(link);

    downloadsContent.appendChild(description);
    downloadsContent.appendChild(links);

    downloadsWindow.appendChild(downloadsWindowToolbar);
    downloadsWindow.appendChild(downloadsContent);

    return downloadsWindow;
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
    projectWindow.classList.add(`project${projectNumber}${projectNumber}`);
    projectWindow.id = `project${projectNumber}`;

    const projectWindowToolbar = document.createElement('div');
    const closeBtnContainer = document.createElement('div');
    closeBtnContainer.classList.add('close-btn-container')
    const closeBtn = document.createElement('div');
    closeBtn.classList.add('close-btn');
    closeBtn.classList.add(`-project${projectNumber}${projectNumber}`);
    closeBtn.classList.add('close-project-btn');
    closeBtnContainer.appendChild(closeBtn)
    const titleContainer = document.createElement('div');
    titleContainer.classList.add('title-container');
    const title = document.createElement('p');
    titleContainer.appendChild(title);
    title.textContent = projectNames[projectNumber];

    projectWindowToolbar.classList.add('project-toolbar');
    projectWindowToolbar.classList.add('drag-toolbar');
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
    link.target = '_blank';
    link.href = links[projectNumber];
    link.textContent = links[projectNumber];

    projectFolder.appendChild(intro);
    projectFolder.appendChild(skillsUL);
    projectFolder.appendChild(link);

    projectWindow.appendChild(projectWindowToolbar);
    projectWindow.appendChild(projectFolder);

    return projectWindow;
}

function createTable(data){
    const table = document.createElement('table');

    for(let i = 0; i < data.length; i+=2){
        let row = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');

        td1.innerHTML = data[i]; td2.innerHTML = data[i+1];
        row.appendChild(td1); row.appendChild(td2);
        table.appendChild(row);
    }

    return table;
}

function displayAbout(){
    if(STACK.checkOpen('about-window')==-1){
        const aboutWindow = createAbout();

        UI_CONTENT.appendChild(aboutWindow);

        dragWindow(aboutWindow);

        STACK.openTab('about-window');
    }
    else{
        STACK.moveFront('about-window');
    }
}

function displayProjects(){
    if(STACK.checkOpen('projects-window')==-1){
        const projectsWindow = createProjects();

        UI_CONTENT.appendChild(projectsWindow);

        dragWindow(projectsWindow);

        STACK.openTab('projects-window');
    }
    else{
        STACK.moveFront('projects-window');
    }
}

function displayDownloads(){
    if(STACK.checkOpen('downloads-window')==-1){
        const downloadsWindow = createDownloads();

        UI_CONTENT.appendChild(downloadsWindow);

        dragWindow(downloadsWindow);

        STACK.openTab('downloads-window');
    }
    else{
        STACK.moveFront('downloads-window');
    }
}

function displayInfo(){
    
    if(STACK.checkOpen(`info-${STACK.getFocus()}`) == -1){
        const infoWindow = createInfo();
        infoWindow.id = `info-${STACK.getFocus()}`;
        UI_CONTENT.appendChild(infoWindow);
        dragWindow(infoWindow);
        STACK.openTab(`info-${STACK.getFocus()}`);
    }
    else{
        STACK.moveFront(`info-${STACK.getFocus()}`);
    }

}

function createInfo(){

    const fileInfo = STACK.getFileInfo();

    const infoWindow = document.createElement('div');
    infoWindow.classList.add('info-window');
    infoWindow.classList.add(`info-${STACK.getFocus()}`);

    const infoWindowToolbar = document.createElement('div');
    const closeBtnContainer = document.createElement('div');
    closeBtnContainer.classList.add('close-btn-container');
    const closeBtn = document.createElement('div');
    closeBtn.classList.add('close-btn');
    closeBtn.classList.add(`-info-${STACK.getFocus()}`)
    closeBtn.classList.add('close-info-btn');
    closeBtnContainer.appendChild(closeBtn)
    const titleContainer = document.createElement('div');
    titleContainer.classList.add('title-container');
    const title = document.createElement('p');
    titleContainer.appendChild(title);
    title.textContent = `File Info`;

    infoWindowToolbar.classList.add('info-toolbar');
    infoWindowToolbar.classList.add('drag-toolbar');
    infoWindowToolbar.appendChild(closeBtnContainer);
    infoWindowToolbar.appendChild(titleContainer);

    const info_title_container = document.createElement('div');
    info_title_container.classList.add('info-title-container')
    const info_title = document.createElement('p');
    info_title.classList.add('info-title');
    info_title.textContent = fileInfo[0];

    let info_icon = document.createElement('img');

    info_title_container.appendChild(info_title);
    info_title_container.appendChild(info_icon);

    const statsContainer = document.createElement('div');
    statsContainer.classList.add('stats');

    const stats = ['Kind:','Size:','Where:','Created:','Modified:'];

    info_icon.src = fileInfo[6];

    for(let i = 0, j = 2; i < stats.length; i++, j++){
        const tempContainer = document.createElement('div');
        const left = document.createElement('p');
        const right = document.createElement('p');

        left.classList.add('stats-left');
        right.classList.add('stats-right');

        left.textContent = stats[i];
        right.textContent = fileInfo[j];

        tempContainer.appendChild(left);
        tempContainer.appendChild(right);

        tempContainer.classList.add('stats-row');

        statsContainer.appendChild(tempContainer);
    }

    infoWindow.appendChild(infoWindowToolbar);
    infoWindow.appendChild(info_title_container);
    infoWindow.appendChild(statsContainer);

    return infoWindow;
}

function displayProject(projectNumber){

    if(STACK.checkOpen(`project${projectNumber}${projectNumber}`) == -1){
        const newProject = createProject(projectNumber);

        UI_CONTENT.appendChild(newProject);

        dragWindow(newProject);

        STACK.openTab(`project${projectNumber}${projectNumber}`);
    }
    else{
        STACK.moveFront(`project${projectNumber}${projectNumber}`);
    }
}

// DESTROY WINDOW
function destroyWindow(className){
    const temp = UI_CONTENT.querySelector(`.${className}`);

    if(temp){
        UI_CONTENT.removeChild(temp);
        STACK.closeTab(STACK.checkOpen(className));
    }
}

// TOP Toolbar
const appleBtn = document.getElementById('apple-btn');
const fileBtn = document.getElementById('file-btn');
const editBtn = document.getElementById('edit-btn');
const viewBtn = document.getElementById('view-btn');
const specialBtn = document.getElementById('special-btn');

function createDropDown(type){
    const dropDown = document.createElement('div');
    dropDown.classList.add('dropDown');

    let titles;

    switch(type){
        case 0:
            titles = ['About The Finder...','Scrapbook','Alarm Clock','Control Panel','Puzzle'];
            break;
        case 1:
            titles = ['Open','Dublicate','Get Info','Save'];
            break;
        case 2:
            titles = ['Cut','Copy','Paste','Select All'];
            break;
        case 3:
            titles = ['By Icon','By Name','By Date','By Size','By Kind'];
            break;
        case 4:
            titles = ['Clean Up','Empty Trash','Erase Disk'];
            break;
    }


    for(let i = 0; i < titles.length; i++){
        const link = document.createElement('p');
        link.textContent = titles[i];
        link.id = `toolbar-link-${i}`;
        dropDown.appendChild(link);
    }

    return dropDown;
}

function openDropdown(type){
    const menu = createDropDown(type);
    menu.classList.add('dropdown-menu');
    switch(type){
        case 0:
            menu.classList.add('apple-dropdown');
            document.querySelector('#apple-btn').style.backgroundColor = 'black';
            document.querySelector('#apple-btn').style.color = 'white';
            break;
        case 1:
            menu.classList.add('file-dropdown');
            document.querySelector('#file-btn').style.backgroundColor = 'black';
            document.querySelector('#file-btn').style.color = 'white';
            break;
        case 2:
            menu.classList.add('edit-dropdown');
            document.querySelector('#edit-btn').style.backgroundColor = 'black';
            document.querySelector('#edit-btn').style.color = 'white';
            break;
        case 3:
            menu.classList.add('view-dropdown');
            document.querySelector('#view-btn').style.backgroundColor = 'black';
            document.querySelector('#view-btn').style.color = 'white';
            break;
        case 4:
            menu.classList.add('special-dropdown');
            document.querySelector('#special-btn').style.backgroundColor = 'black';
            document.querySelector('#special-btn').style.color = 'white';
            break;
    }

    UI_CONTENT.appendChild(menu);

    getAvailableFunctions(type);
}

function closeDropdown(type){
    let temp;
    switch(type){
        case 0:
            temp = UI_CONTENT.querySelector('.apple-dropdown');
            document.querySelector('#apple-btn').style.backgroundColor = 'rgb(224, 224, 224)';
            document.querySelector('#apple-btn').style.color = 'black';
            break;
        case 1:
            temp = UI_CONTENT.querySelector('.file-dropdown');
            document.querySelector('#file-btn').style.backgroundColor = 'rgb(224, 224, 224)';
            document.querySelector('#file-btn').style.color = 'black';
            break;
        case 2:
            temp = UI_CONTENT.querySelector('.edit-dropdown');
            document.querySelector('#edit-btn').style.backgroundColor = 'rgb(224, 224, 224)';
            document.querySelector('#edit-btn').style.color = 'black';
            break;
        case 3:
            temp = UI_CONTENT.querySelector('.view-dropdown');
            document.querySelector('#view-btn').style.backgroundColor = 'rgb(224, 224, 224)';
            document.querySelector('#view-btn').style.color = 'black';
            break;
        case 4:
            temp = UI_CONTENT.querySelector('.special-dropdown');
            document.querySelector('#special-btn').style.backgroundColor = 'rgb(224, 224, 224)';
            document.querySelector('#special-btn').style.color = 'black';
            break;
    }

    if(temp){
        UI_CONTENT.removeChild(temp);
    }
}

function getAvailableFunctions(type){

    try{
        document.querySelector('#toolbar-link-0').style.color = 'grey';
        document.querySelector('#toolbar-link-1').style.color = 'grey';
        document.querySelector('#toolbar-link-2').style.color = 'grey';
        document.querySelector('#toolbar-link-3').style.color = 'grey';
        document.querySelector('#toolbar-link-4').style.color = 'grey';
    }
    catch(error){
        console.log(error);
    }

    switch(type){
        case 0:
            document.querySelector('#toolbar-link-0').style.color = 'black';
            document.querySelector('#toolbar-link-1').style.color = 'black';
            document.querySelector('#toolbar-link-2').style.color = 'black';
            document.querySelector('#toolbar-link-3').style.color = 'black';
            document.querySelector('#toolbar-link-4').style.color = 'black';
            break;
        case 1:
            // no focus
            if(STACK.getFocus() == null){
                document.querySelector('#toolbar-link-0').style.color = 'grey';
                document.querySelector('#toolbar-link-1').style.color = 'grey';
                document.querySelector('#toolbar-link-2').style.color = 'grey';
            }
            else if(STACK.getFocus() == 'about-window' || 
                STACK.getFocus() == 'projects-window' || 
                STACK.getFocus() == 'downloads-window' ||
                STACK.getFocus() == 'editor-window' ||
                STACK.getFocus() == 'project0' ||
                STACK.getFocus() == 'project1' ||
                STACK.getFocus() == 'project2' ||
                STACK.getFocus() == 'project3' ||
                STACK.getFocus() == 'project4' 
            ){
                document.querySelector('#toolbar-link-0').style.color = 'black';
                document.querySelector('#toolbar-link-2').style.color = 'black';
            }
            else{

                // OPEN FILE

                // DUPLICATE FILE

                // GET FILE INFO
            }
            break;

        case 2:
            if(STACK.getTextFocus() != null){
                document.querySelector('#toolbar-link-1').style.color = 'black';
            }
            break;
        
        case 3:
            document.querySelector(`#toolbar-link-${VIEW_STYLE}`).innerHTML = `${document.querySelector(`#toolbar-link-${VIEW_STYLE}`).textContent} &#10003;`;
            document.querySelector(`#toolbar-link-${VIEW_STYLE}`).style.color = 'black';
            break;
        
        case 4:
            document.querySelector('#toolbar-link-0').style.color = 'grey';
            document.querySelector('#toolbar-link-1').style.color = 'grey';
            document.querySelector('#toolbar-link-2').style.color = 'grey';
            break;
    }
}

appleBtn.addEventListener('click', ()=>{

    closeDropdown(1);
    closeDropdown(2);
    closeDropdown(3);
    closeDropdown(4);

    const temp = UI_CONTENT.querySelector('.apple-dropdown');

    if(temp){
        closeDropdown(0);
        STACK.setToolbarSection(null);
    }
    else{
        openDropdown(0);
        STACK.setToolbarSection('apple');
    }
});

fileBtn.addEventListener('click',()=>{

    closeDropdown(0);
    closeDropdown(2);
    closeDropdown(3);
    closeDropdown(4);

    const temp = UI_CONTENT.querySelector('.file-dropdown');

    if(temp){
        closeDropdown(1);
        STACK.setToolbarSection(null);
    }
    else{
        openDropdown(1);
        STACK.setToolbarSection('file');
    }
});

editBtn.addEventListener('click',()=>{
    
    closeDropdown(0);
    closeDropdown(1);
    closeDropdown(3);
    closeDropdown(4);

    const temp = UI_CONTENT.querySelector('.edit-dropdown');

    if(temp){
        closeDropdown(2);
        STACK.setToolbarSection(null);
    }
    else{
        openDropdown(2);
        STACK.setToolbarSection('edit');
    }
});

viewBtn.addEventListener('click',()=>{
    
    closeDropdown(0);
    closeDropdown(1);
    closeDropdown(2);
    closeDropdown(4);

    const temp = UI_CONTENT.querySelector('.view-dropdown');

    if(temp){
        closeDropdown(3);
        STACK.setToolbarSection(null);
    }
    else{
        openDropdown(3);
        STACK.setToolbarSection('view');
    }
});

specialBtn.addEventListener('click',()=>{
    
    closeDropdown(0);
    closeDropdown(1);
    closeDropdown(2);
    closeDropdown(3);

    const temp = UI_CONTENT.querySelector('.special-dropdown');

    if(temp){
        closeDropdown(4);
        STACK.setToolbarSection(null);
    }
    else{
        openDropdown(4);
        STACK.setToolbarSection('special');
    }
});

document.body.addEventListener('click',(event)=>{
    try{
        if(
            !(
                event.target.id == 'toolbar-link-0' ||
                event.target.id == 'toolbar-link-1' ||
                event.target.id == 'toolbar-link-2' ||
                event.target.id == 'toolbar-link-3' ||
                event.target.id == 'toolbar-link-4' ||
                event.target.id == 'apple-btn' ||
                event.target.id == 'file-btn' ||
                event.target.id == 'edit-btn' ||
                event.target.id == 'view-btn' || 
                event.target.id == 'special-btn'
            )
        ){
            closeDropdown(0);
            closeDropdown(1);
            closeDropdown(2);
            closeDropdown(3);
            closeDropdown(4);
            STACK.setToolbarSection(null);
        }
    }
    catch(error){
        console.log(error);
    }
})



// CLICK FOCUS FUNCTIONS
function focusIcon(element){
    const img = element.children[0];
    const text = element.children[1];

    text.style.backgroundColor = 'black';
    text.style.color = 'white';

    switch(element.id){
        case 'about-btn':
            img.src = 'images/me-focus.png';
            break;
        case 'projects-btn':
            img.src = 'images/processor-focus.png'
            break;
        case 'downloads-btn':
            img.src = 'images/floppy-disk-focus.png'
            break;
        case 'editor-btn':
            img.src = 'images/document-focus.png'
            break;
    }
}

function focusProjectIcon(element){
    try{
        element.children[0].src = './images/floppy-disk-focus.png';
        element.children[1].style.backgroundColor = 'black';
        element.children[1].style.color = 'white';
    }
    catch(error){
        console.log(error);
    }
    
}

function removeFocusProjectIcons(){
    for(let i = 0; i < 5; i++){
        removeFocusProjectIcon(document.querySelector(`.project${i}`));
    }
}

function removeFocusProjectIcon(element){
    try{
        element.children[0].src = './images/floppy-disk.png';
        element.children[1].style.backgroundColor = 'white';
        element.children[1].style.color = 'black';
    }
    catch(error){
        console.log(error)
    }
    
}

function removeFocusIcon(element){
    const img = element.children[0];
    const text = element.children[1];

    text.style.backgroundColor = 'white';
    text.style.color = 'black';

    switch(element.id){
        case 'about-btn':
            img.src = 'images/me.png';
            break;
        case 'projects-btn':
            img.src = 'images/processor.png'
            break;
        case 'downloads-btn':
            img.src = 'images/floppy-disk.png'
            break;
        case 'editor-btn':
            img.src = 'images/document.png'
            break;
    }

    STACK.setFocus(null);
}

function removeFocusAllIcons(){
    removeFocusIcon(aboutBtn);
    removeFocusIcon(projectsBtn);
    removeFocusIcon(downloadsBtn);
    removeFocusIcon(editorBtn);

    STACK.setFocus(null);
}

aboutBtn.addEventListener('click',()=>{
    removeFocusIcon(projectsBtn);
    removeFocusIcon(downloadsBtn);
    removeFocusIcon(editorBtn);

    focusIcon(aboutBtn);
    STACK.setFocus('about-window');
});

projectsBtn.addEventListener('click',()=>{
    removeFocusIcon(aboutBtn);
    removeFocusIcon(downloadsBtn);
    removeFocusIcon(editorBtn)

    focusIcon(projectsBtn);
    STACK.setFocus('projects-window');
})

downloadsBtn.addEventListener('click',()=>{
    removeFocusIcon(aboutBtn);
    removeFocusIcon(projectsBtn);
    removeFocusIcon(editorBtn);

    focusIcon(downloadsBtn);
    STACK.setFocus('downloads-window');
})

editorBtn.addEventListener('click',()=>{
    removeFocusIcon(aboutBtn);
    removeFocusIcon(projectsBtn);
    removeFocusIcon(downloadsBtn);

    focusIcon(editorBtn);
    STACK.setFocus('editor-window');
})

// REMOVING FOCUS
document.body.addEventListener('click',(event)=>{
    let temp = event.target.className;
    if(temp == 'shortcuts' || temp == 'credits' || temp == 'about-window' || temp == 'projects-window' || temp == 'downloads-window' || temp == 'editor-window'){
        removeFocusAllIcons();
    }
})

// SELECTING TEXT ON SCREEN
document.addEventListener('selectionchange',()=>{
    const selected = window.getSelection().toString();

    if(selected.length > 0){
        STACK.setTextFocus(selected);
        
    }


})

// Write text to clipboard
function writeToClipboard(text){
    navigator.clipboard.writeText(text).then(()=>{
        console.log(`Copied: '${text}' to clipboard.`);
    }).catch(error =>{
        console.log(`Failed to copy: ${error}`);
    })
}


// TOOLBAR FUNCTIONS
document.body.addEventListener('click', (event)=>{
    
    switch(event.target.id){

        
        case 'toolbar-link-0':

            // OPEN FILE
            if(STACK.getFocus() && STACK.getToolbarSection() == 'file'){
                if(STACK.getFocus() == 'about-window'){
                    displayAbout();
                }
                else if(STACK.getFocus() == 'projects-window'){
                    displayProjects();
                }
                else if(STACK.getFocus() == 'downloads-window'){
                    displayDownloads();
                }
                else if(STACK.getFocus() == 'editor-window'){
                    displayEditor();
                }
                else if(STACK.getFocus() == 'project0'){
                    displayProject(0);
                }
                else if(STACK.getFocus() == 'project1'){
                    displayProject(1);
                }
                else if(STACK.getFocus() == 'project2'){
                    displayProject(2);
                }
                else if(STACK.getFocus() == 'project3'){
                    displayProject(3);
                }
                else if(STACK.getFocus() == 'project4'){
                    displayProject(4);
                }
                else{
                    alert(STACK.getFocus());
                }
                closeDropdown(1);
            }
            else{
                return;
            }
            break;

        case 'toolbar-link-1':
            // COPY SELECTED TEXT TO CLIPBOARD
            if(STACK.getToolbarSection() == 'edit'){
                writeToClipboard(STACK.getTextFocus());
                STACK.setTextFocus(null);
                closeDropdown(2)
            }
            break;

        case 'toolbar-link-2':
            // GET FILE INFO
            if(STACK.getFocus() != null && STACK.getToolbarSection() == 'file'){
                displayInfo();
                closeDropdown(1);
                break;
            }
        case 'tool-bar-link-3':
            // saving text file
            if(STACK.getToolbarSection() == 'file' && STACK.checkOpen('editor-window')){
                const fileData = []
                fileData.append(getTitle());
                fileData.append(document.querySelector('.editor-input-window').innerHTML);

                createShortcut(fileData[0]);

                destroyWindow('editor-window');
                createFile(fileData);
            }
            break;
    }
})



// TEXT EDITOR
function displayEditor(){
    if(STACK.checkOpen('editor-window')==-1){
        const editorWindow = createEditor();

        UI_CONTENT.appendChild(editorWindow);

        dragWindow(editorWindow);

        STACK.openTab('editor-window');
    }
    else{
        STACK.moveFront('editor-window');
    }
}

function createEditor(){
    const editorWindow = document.createElement('div');
    editorWindow.classList.add('editor-window');

    const editorWindowToolbar = document.createElement('div');
    const closeBtnContainer = document.createElement('div');
    closeBtnContainer.classList.add('close-btn-container')
    const closeBtn = document.createElement('div');
    closeBtn.classList.add('close-btn');
    closeBtn.classList.add('-editor-window');
    closeBtn.classList.add('close-editor-btn');
    closeBtnContainer.appendChild(closeBtn)
    const titleContainer = document.createElement('div');
    titleContainer.classList.add('title-container');
    const title = document.createElement('p');
    titleContainer.appendChild(title);
    title.textContent = 'Untitled';

    editorWindowToolbar.classList.add('editor-toolbar');
    editorWindowToolbar.classList.add('drag-toolbar');
    editorWindowToolbar.appendChild(closeBtnContainer);
    editorWindowToolbar.appendChild(titleContainer);

    const inputArea = document.createElement('textarea');
    inputArea.classList.add('editor-input-window')


    editorWindow.appendChild(editorWindowToolbar);
    editorWindow.appendChild(inputArea);

    return editorWindow;
}

editorBtn.addEventListener('dblclick', ()=>{
    displayEditor();
});

// NEW FILE
function createFile(fileData){

}

function getTitle(){

}

function createShortcut(title){

}

function displayFile(fileData){
    const file = createFile(fileData);
}

