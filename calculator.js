class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
            }
    clear(){
        
      this.currentOperand = "0"
      this.previousOperand = ""
      this.operation = undefined
    }

    appendNumber(number){
        if (this.currentOperand == "0") {
            this.currentOperand = ""
        }
        if (number === "." &&  this.currentOperand.includes("."))  return
       this.currentOperand = this.currentOperand.toString() +  number.toString()
       
    }

    chooseOperation(operation){
        if (this.currentOperand === "") return
        if (this.previousOperand !== "") {
            this.compute()
        
        }
       this.operation = operation
       this.previousOperand = this.currentOperand
       this.currentOperand = ""
       
        }
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat( stringNumber.split(".") [0]) 
        const decimalDigits =  stringNumber.split(".") [1]
    
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en',
             {maximumFractionDigits: 0})
        }
        if (decimalDigits!= null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }
        delete(){
            this.currentOperand = this.currentOperand.toString().slice(0,-1)
        }

    percent(){
        
       this.currentOperand = this.currentOperand * 0.01 
       this.UpdateDisplay();
    }

    plusMinus(){
       this.currentOperand = 0 - this.currentOperand
       this.UpdateDisplay();
    }

    compute(){
      let computation
      const prev = parseFloat(this.previousOperand)
      const current = parseFloat(this.currentOperand)
      if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case "+":
                computation = prev + current
                break;
        
            case "-":
            computation = prev - current    
            break;
            case "x":
            computation = prev * current
            break;
            case "÷":
            computation = prev / current
            break;
            default:
                return
    
        }
      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand = "";
      
    }

    UpdateDisplay(){
        this.currentOperandTextElement.innerText = 
        this.getDisplayNumber(this.currentOperand)
        this.previousOperandTextElement.innerText = this.previousOperand
        
    }
}



const numberButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll("[data-operation]")
const equalsBtn = document.querySelector("[data-equals]")
const percentBtn = document.querySelector("[data-percent]")
const plusMinusBtn = document.querySelector("[data-plusOrMinus]")
const allClearBtn = document.querySelector("[data-all-clear]")
const previousOperandTextElement = document.querySelector("[data-previous-operand]")
const currentOperandTextElement = document.querySelector("[data-current-operand]")
 

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement)

numberButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        calculator.appendNumber(button.innerText)
        calculator.UpdateDisplay()
        
    })
    
})

operationButtons.forEach(function (operation) {
    operation.addEventListener("click", function () {
        calculator.chooseOperation(operation.innerText )
        calculator.UpdateDisplay()
        
    })
})

equalsBtn.addEventListener("click", function(button){
    calculator.compute()
    calculator.UpdateDisplay()
})

allClearBtn.addEventListener("click", function(button){
    calculator.clear()
    calculator.UpdateDisplay()
})
percentBtn.addEventListener("click", function(button){
    calculator.percent()
})
plusMinusBtn.addEventListener("click", function(button){
    calculator.plusMinus()
})

currentOperandTextElement.addEventListener("click", function () {
    calculator.delete()
    calculator.UpdateDisplay()
})