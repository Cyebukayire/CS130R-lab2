class Calculator{
    constructor(){
        this.displayElement - document.querySelector('.display');
        this.display = '0'
        this.firstOperand = null;
        this.secondOperand = null;
        this.operator = null;
        this.isDecimalUsed = false;
    }
    set firstOperand(value){
        if(this.operator) return;
        this._firstOperand = value;
        this.display = value;
    }
    // set firstOperand(){
    //     return this._firstOperand;
    // }

    set display(value){
        this._display = value;
        this.displayElement.textContent = value
    }
    clear(){
        this.display = 0;
        this.firstOperand = null;
        this.secondOperand = null;
        this.operator = null;
        this.isDecimalUsed = false;
    }


}


const cal = new Calculator();
cal.display = '122';