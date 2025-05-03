export class stack{

    #tabArray;
    #size;
    #focus;
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
        this.#tabArray = new Array(8);
        this.#size = 0;
        this.#focus = null;
    }

    checkOpen(tab){
        for(let i = 0; i < this.#size; i++){
            if(tab == this.#tabArray[i]){
                return i;
            }
        }
        return -1;
    }

    moveFront(tab){
        
        if(this.#size == 1){
            this.printTabOrder()
            return;
        }
        else{
            let index = this.checkOpen(tab);

            if(index == this.#size-1){
                this.printTabOrder()
                return;
            }

            if(index == this.#size-2){
                let temp = this.#tabArray[index];
                this.#tabArray[index] = this.#tabArray[index+1];
                this.#tabArray[index+1] = temp;
                this.updateTabIndexes();
                this.printTabOrder()
                return;
            }
            else{
                for(let i = index; i < this.#size-1; i++){
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

        if(this.#size == 1 || index == this.#size-1){
            this.#size--;

            this.printTabOrder();
            this.updateTabIndexes();
            return;
        }
        else if(index == this.#size-2){
            this.#tabArray[index] = this.#tabArray[index+1];
            this.#size--;

            this.printTabOrder();
            this.updateTabIndexes();
            return;
        }
        else{
            if(index != this.#size-1){
                for(let i = index; i < this.#size-1; i++){
                    this.#tabArray[i] = this.#tabArray[i+1];
                }
            }
            this.#size--;
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
            this.#tabArray[this.#size] = ID;
            this.#size++;
        }

        this.updateTabIndexes();

        this.printTabOrder();
    }

    updateTabIndexes(){
        let index = 90;
        for(let i = 0; i < this.#size; i++){
            if(document.querySelector(`.${this.#tabArray[i]}`))
                document.querySelector(`.${this.#tabArray[i]}`).style.zIndex = `${index++}`;
        }
    }

    getTopTab(){
        if(this.#size == 0){
            return null;
        }
        return this.#tabArray[this.#size-1];
    }

    printTabOrder(){
        console.log("************")
        console.log('TABS:')
        for(let i = 0; i < this.#size; i++){
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
}