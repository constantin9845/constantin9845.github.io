export class stack{

    #tabArray;
    #focus;
    #textFocus;
    #toolbar_section;
   /*
        z-index
        tab 0 : 90
        tab 1 : 91
        tab 2 : 92
        tab 3 : 93
        tab 4 : 94
        tab 5 : 95
        tab 6 : 96
        tab 7 : 97 (TOP TAB)
    */

    constructor(){
        this.#tabArray = new Array();
        this.#focus = null;
        this.#toolbar_section = null;
        this.#textFocus = null;
    }

    checkOpen(tab){
        for(let i = 0; i < this.#tabArray.length; i++){
            if(tab == this.#tabArray[i]){
                return i;
            }
        }
        return -1;
    }

    moveFront(tab){
        
        if(this.#tabArray.length == 1){
            this.printTabOrder()
            return;
        }
        else{
            let index = this.checkOpen(tab);

            if(index == this.#tabArray.length-1){
                this.printTabOrder();
                return;
            }

            if(index == this.#tabArray.length-2){
                let temp = this.#tabArray[index];
                this.#tabArray[index] = this.#tabArray[index+1];
                this.#tabArray[index+1] = temp;
                this.updateTabIndexes();
                this.printTabOrder()
                return;
            }
            else{
                for(let i = index; i < this.#tabArray.length-1; i++){
                    let temp = this.#tabArray[i];
                    this.#tabArray[i] = this.#tabArray[i+1];
                    this.#tabArray[i+1] = temp;
                }
                this.updateTabIndexes();
                this.printTabOrder()
                return;
            }
        }
        
    }

    closeTab(index){

        if(this.#tabArray.length == 1 || index == this.#tabArray.length-1){
            this.#tabArray.pop();

            this.printTabOrder();
            this.updateTabIndexes();
            return;
        }
        else if(index == this.#tabArray.length-2){
            this.#tabArray[index] = this.#tabArray[index+1];
            this.#tabArray.pop();

            this.printTabOrder();
            this.updateTabIndexes();
            return;
        }
        else{
            if(index != this.#tabArray.length-1){
                for(let i = index; i < this.#tabArray.length-1; i++){
                    this.#tabArray[i] = this.#tabArray[i+1];
                }
            }
            this.#tabArray.pop();
            this.printTabOrder();
            this.updateTabIndexes();
            return;
        }
    }

    openTab(ID){
        // check if open already
        let temp = this.checkOpen(ID);
        if(temp != -1){
            this.moveFront(ID);
        }
        else{
            this.#tabArray.push(ID)
        }

        this.updateTabIndexes();
        this.printTabOrder();
    }

    updateTabIndexes(){
        let index = 90;
        for(let i = 0; i < this.#tabArray.length; i++){
            if(document.querySelector(`.${this.#tabArray[i]}`))
                document.querySelector(`.${this.#tabArray[i]}`).style.zIndex = `${index++}`;
        }
    }

    getTopTab(){
        if(this.#tabArray.length == 0){
            return null;
        }
        return this.#tabArray[this.#tabArray.length-1];
    }

    getAllTabs(){
        let temp = new Array(0);
        for(let i = 0; i < this.#tabArray.length; i++){
            temp.push(this.#tabArray[i]);
        }
        return temp;
    }

    printTabOrder(){
        console.log("************")
        console.log('TABS:')
        for(let i = 0; i < this.#tabArray.length; i++){
            console.log(this.#tabArray[i])
        }
        console.log("************")
    }

    getFocus(){
        return this.#focus;
    }

    setFocus(element){
        this.#focus = element;
    }

    getToolbarSection(){
        return this.#toolbar_section;
    }

    setToolbarSection(toolbarBtn){
        this.#toolbar_section = toolbarBtn;
    }

    getFileInfo(){
        switch(this.#focus){
            // about window
            case 'about-window':
                return [
                    'About me',
                    'TeachText Document',
                    '5736 Bytes, accounts for 6K on disk',
                    `System Disk, ${navigator.platform}`,
                    Date.now(),
                    Date.now(),
                    'images/document.png'
                ];
            case 'projects-window':
                return [
                    'Projects',
                    'folder',
                    'COUNT, accounts for 6K on disk',
                    `System Disk, ${navigator.platform}`,
                    Date.now(),
                    Date.now(),
                    'images/processor.png'
                ];
            case 'downloads-window':
                return [
                    'Downloads',
                    'folder',
                    '233002576 Bytes, accounts for 234MB on disk',
                    `System Disk, ${navigator.platform}`,
                    Date.now(),
                    Date.now(),
                    'images/floppy-disk.png'
                ];
            case 'project0':
                return [
                    'File-lock Desktop',
                    'TeachText Document',
                    '3600 Bytes, accounts for 4K on disk',
                    `System Disk, ${navigator.platform}`,
                    Date.now(),
                    Date.now(),
                    'images/processor.png'
                ];
            case 'project1':
                return [
                    'Studio',
                    'TeachText Document',
                    '3600 Bytes, accounts for 4K on disk',
                    `System Disk, ${navigator.platform}`,
                    Date.now(),
                    Date.now(),
                    'images/processor.png'
                ];
            case 'project2':
                return [
                    'File-lock CLI',
                    'TeachText Document',
                    '3600 Bytes, accounts for 4K on disk',
                    `System Disk, ${navigator.platform}`,
                    Date.now(),
                    Date.now(),
                    'images/processor.png'
                ];
            case 'project3':
                return [
                    'AES Library',
                    'TeachText Document',
                    '3600 Bytes, accounts for 4K on disk',
                    `System Disk, ${navigator.platform}`,
                    Date.now(),
                    Date.now(),
                    'images/processor.png'
                ];
            case 'project4':
                return [
                    'Trivium Cipher',
                    'TeachText Document',
                    '3600 Bytes, accounts for 4K on disk',
                    `System Disk, ${navigator.platform}`,
                    Date.now(),
                    Date.now(),
                    'images/processor.png'
                ];
        }
    }

    setTextFocus(text){
        this.#textFocus = text;
    }

    getTextFocus(){

        return this.#textFocus;
    }
}