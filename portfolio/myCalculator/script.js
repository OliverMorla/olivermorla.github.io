// Calculator class
// It has a  teacher (constructor) and children (functions)
class Calculator{
    constructor(previousOutputTextElement, currentOutputTextElement){
        this.previousOutputTextElement = previousOutputTextElement;
        this.currentOutputTextElement = currentOutputTextElement;
        this.clear();
    } 

    // When invoked, current & previous output will reset to default;
    clear(){
        this.currentOutput = '';
        this.previousOutput = '';
        this.operator = undefined;
    }

    // When invoked, currentOutput is converted to a string, then we use the slice method.
    delete(){
        this.currentOutput = this.currentOutput.toString().slice(0, -1)
    }

    // When invoked, current output will take a multiple strings
    appendNumber(number){
        // If number is equal to ''. and currentOutput includes a '.', it will return nothing.
        if(number === '.' && this.currentOutput.toString().includes('.')) return
            
    
        // Convert numbers to strings in order to append them
        this.currentOutput = this.currentOutput.toString() + number.toString();

        if (!(this.currentOutput.includes('.'))){
            this.currentOutput = parseFloat(this.currentOutput)
        } else{
            return
        }
    }
    
    // When invoked, the operator is stored into private var
    chooseOperation(operator){ 
        // If current output is an empty string, it will stop our function from executing.
        if(this.currentOutput === '') return

        // If previous Output is not empty, it will invoke the calculate function
        if(this.previousOutput !== ''){
            this.calculate()
        }

        // When clicking a operator, it will store to private var, set current to previous then set current to empty.
        this.operator = operator;
        this.previousOutput = this.currentOutput;
        this.currentOutput = ''
    }

    // When invoked, both previous and current output are converted to a float/number
    calculate(){
        // This var will store the solution for the operations
        let solution
        
        // Takes both output and converts them back to floats/numbers
        const previous = parseFloat(this.previousOutput)
        const current = parseFloat(this.currentOutput)

        // Checks to see if each output is number using inNaN method, if false, it will cancel execution
        if(isNaN(previous) || isNaN(current)) return

        // This switch stamement will take the operator, and check which matches the case.
        switch(this.operator){ 
            case '+':
                solution = previous + current;
                break;
            case '-':
                solution = previous - current;
                break;
            case '/':
                solution = previous / current;
                break;
            case '*':
                solution = previous * current;
                break;
            default:
                return
        }

        // currentOutput will be assigned to the new solution while everything will be set to default
        this.currentOutput = solution;
        this.operator = undefined;
        this.previousOutput = '';
    }

    // Will set clicked number to 'currentOutput' element previous numbers will be set to previousOutput 
    updateOutput(){
        this.currentOutputTextElement.innerText = this.currentOutput.toLocaleString('en');
        if(this.operator != null){
            this.previousOutputTextElement.innerText =  `${this.previousOutput.toLocaleString('en')} ${this.operator}`
        }else{
            this.previousOutputTextElement.innerText = ''
        }
    }
}

// Selecting all our number buttons (elements)
const numberButtons = document.querySelectorAll('[data-number]')

// Selecting all our operation buttons (elements)
const operationButtons = document.querySelectorAll('[data-operation]')

// Selecting our 'clear-all' button (element)
const clearButton = document.querySelector('[data-clear-all')

// Selecting our 'equal' button (element)
const equalsButton = document.querySelector('[data-equals]')

// Selecting our 'delete' button (element)
const deleteButton = document.querySelector('[data-delete]')

// Selecting our 'previous-output' text element
const previousOutputTextElement = document.querySelector('[data-previous-output]')

// Selecting our 'current-output' text element
const currentOutputTextElement = document.querySelector('[data-current-output]')

// Creating calculator class object to access functions
const calculator = new Calculator(previousOutputTextElement, currentOutputTextElement);

// For each button 'clicked' will invoke appendNumber & updateOutput functions stored inside class.
numberButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerText)
        calculator.updateOutput();
    })
})

// For each button 'clicked'will invoke chooseOperation & updateOutput functions stored inside class.
operationButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.chooseOperation(button.innerText)
        calculator.updateOutput();
    })
})

// Whenever equals button is 'clicked' it will call the calculate and updateOutput functions.
equalsButton.addEventListener('click', button =>{
    calculator.calculate()
    calculator.updateOutput()
})

// Whenever clear button is 'clicked' it will call the clear and updateOutput functions.
clearButton.addEventListener('click', button =>{
    calculator.clear()
    calculator.updateOutput()
})

// Whenever delete button is 'clicked' it will call the delete and updateOutput functions.
deleteButton.addEventListener('click', () =>{
    calculator.delete()
    calculator.updateOutput()
})