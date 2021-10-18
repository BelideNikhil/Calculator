const calculator=document.querySelector(".calculator")
const calculator_keys=document.querySelectorAll("button")

let lower_display=document.querySelector(".lower_display")
let temporary_display=document.querySelector(".temporary_display")
let upper_display=document.querySelector(".upper_display")

let numberOne='';
let numberTwo=''
let previous_operator='';
let result=null;
let hasDot=false

calculator_keys.forEach(clickedKey=>{
    clickedKey.addEventListener("click",(e)=>{
        let type=e.target.dataset.type
        let clicked_now_button=e.target.innerText
        if(type==="number"){
            if(clicked_now_button==="." && hasDot){
                return
            }else if(clicked_now_button==="." && !hasDot){
                hasDot=true
            }
            numberTwo+=clicked_now_button
            lower_display.innerHTML +=clicked_now_button
        }

        if(type==="operator"){
            if(!numberTwo) return;
            hasDot=false
            let operationName=e.target.dataset.key
            if(numberOne && numberTwo && previous_operator){
                calculateThis()
            }else{
                result=parseFloat(numberTwo)
            }
            setValues(operationName)
            previous_operator=operationName
        }

        if(type==="equal"){
            if(!numberTwo || !numberOne) return
            calculateThis()
            setValues()
            lower_display.innerHTML=result
            temporary_display.innerHTML=''
            numberTwo=result
            numberOne=''
        }

        if(type==="clear"){
            lower_display.innerHTML='0'
            temporary_display.innerHTML=''
            upper_display.innerHTML=''
            numberTwo=''
            numberOne=''
            previous_operator=''
            result=null
            hasDot=false
        }  
    })

    function setValues(name=''){
        numberOne +=`${numberTwo} ${name} `
        upper_display.innerHTML=numberOne
        lower_display.innerHTML=''
        numberTwo=''
        temporary_display.innerHTML=result
    }

    function calculateThis(operator=previous_operator){
        firstNumber=parseFloat(result)
        secondNumber=parseFloat(numberTwo)
        if(operator==="+")result=(firstNumber+secondNumber)
        if(operator==="-")result= (firstNumber-secondNumber)
        if(operator==="*")result=(firstNumber*secondNumber)
        if(operator==="/")result=(firstNumber/secondNumber)

        if(!Number.isInteger(result)) result=result.toFixed(2)
    }
})

// keyboard
document.addEventListener("keydown",(e)=>{
    calculator_keys.forEach(calculator_key=>{
        if(calculator_key.dataset.key===e.key ||calculator_key.innerText===(e.key).toUpperCase()){
            calculator_key.click()
        }else{
            return
        }
    })
    if(e.key==="Enter"){
        (document.querySelector(".equal")).click()
    }

})




// let display=document.querySelector(".display")
// let previousData=0
// calculator_keys.addEventListener("click",(e)=>{
//     let keyPressed=e.target
//     let userData=keyPressed.textContent
//     previousData = display.textContent
//     let type=keyPressed.dataset.type;
//     let previousKeyType=calculator.dataset.previousKeyType
//     if(type==="number"){
//         if(previousKeyType==="operator"){
//             display.textContent =userData
//         }
//         else{
//             display.textContent =previousData+userData
//         }
//     }
    
//     if(type==="operator"){
//         let allKeys=calculator_keys.querySelectorAll(`[data-type="operator"]`)
//         allKeys.forEach(everyKey=>everyKey.dataset.state="")
//         keyPressed.dataset.state="selected"
//         calculator.dataset.firstNumber=previousData;
//         calculator.dataset.operator=keyPressed.dataset.key
//     }
//     if(type==="equal"){
//         let firstNumber=calculator.dataset.firstNumber;
//         let operator=calculator.dataset.operator;
//         let secondNumber=previousData;
        
//         result=calculateThis(firstNumber,operator,secondNumber)
//         display.textContent= result
//     }
//     if(type==="clear"){
//         display.textContent=''
//         calculator.removeAttribute("firstNumber")
//         calculator.removeAttribute("operator")
//     }
//     calculator.dataset.previousKeyType=type
// })


