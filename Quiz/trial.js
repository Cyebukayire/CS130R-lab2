class ButtonThing{
    constructor(){
        this.label = 'Click';

    }

    handleClick(){
        console.log('Button clicked!');
    }
}

const b = new ButtonThing();
const f = b.handleClick();
console.log(f());

// to solve function ambiguity, we can use classes for function calls 