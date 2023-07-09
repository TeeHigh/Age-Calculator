//User Date of birth
const inputDay = document.querySelector("#day-el");
const inputMonth = document.querySelector("#month-el");
const inputYear = document.querySelector("#year-el");

//User expected age output
const outputYear = document.querySelector(".output-year")
const outputMonth = document.querySelector(".output-month")
const outputDay = document.querySelector(".output-day")

//Error messages in case of  mistakes
const errorDay = document.querySelector(".error-day");
const errorMonth = document.querySelector(".error-month");
const errorYear = document.querySelector(".error-year");

//Calculate button (arrow symbol)
var arrowButton = document.querySelector(".arr-circle");

//input fields
var inputTags = document.querySelectorAll("input")

//Current date
var date = new Date();
// var currentDay = date.getDate();
// var currentMonth = 1 + date.getMonth();
var currentYear = date.getFullYear();

let isValid = false;

//Check for valid input in "DAY" field
inputDay.addEventListener("input", (e) => {
    if(+inputDay.value > 31){            //||+inputDay.value <= 0
        errorDay.textContent = "Must be a valid day";
        isValid = false;
        return;
    }
    else{
        isValid = true
        errorDay.textContent = ""
    }
    if(+inputDay.value === 0){
        isValid = false
        displayReq(errorDay)
        isValid = false
        return;
    }
    else if (+inputDay.value <= 0){
        errorDay.textContent = "Must be a valid day";
        isValid = false
    }
    else{
        isValid = true
    }
})

//Check for valid input in "MONTH" field
inputMonth.addEventListener("input", (e) => {
    if(+inputMonth.value > 12){             // ||+inputMonth.value <= 0
        errorMonth.textContent = "Must be a valid month"
        isValid = false
        return;
    }
    else{
        isValid = true
        errorMonth.textContent = ""
    }
    if(+inputMonth.value === 0){
        isValid = false
        displayReq(errorMonth)
        isValid = false
        return;
    }
    else if (+inputMonth.value <= 0){
        errorMonth.textContent = "Must be a valid month";
        isValid = false
    }
    else{
        isValid = true
    } 
    if(+inputMonth.value == 4 && +inputDay.value > 30||+inputMonth.value == 6 && +inputDay.value > 30||+inputMonth.value == 9 && +inputDay.value > 30||+inputMonth.value == 11 && +inputDay.value > 30){
        errorDay.textContent = "Enter a valid date"
        isValid = false
        return;
    }
    else{
        isValid = true
        errorDay.textContent = ""
    }
})

//Check for valid input in "YEAR" field
inputYear.addEventListener("input", (e) => {
    if(+inputYear.value > currentYear ){                //|| +inputYear.value <= 0
        errorYear.textContent = "Must be in the past"
        isValid = false
        return;
    }
    else{
        isValid = true
        errorYear.textContent = ""
    }
    if(+inputYear.value === null){
        isValid = false
        displayReq(errorYear)
        isValid = false
        return;
    }
    if(+inputYear.value <= 0){
        isValid = false
        displayReq(errorYear)
        isValid = false
        return;
    }
    else if(+inputYear.value.length < 4){
        isValid = false
        errorYear.textContent = "Enter four digits"
    }
    else{
        errorYear.textContent = ""
    }
})

//Function to carry out calculation and conversion
function CalculateDate(){
    if(isValid){
        let birthday = `${inputMonth.value}/${inputDay.value}/${inputYear.value}`
        console.log(birthday);
        let birthdayObj = new Date(birthday);
        let ageDiffMill = Date.now() - birthdayObj;
        let ageDate = new Date(ageDiffMill);
        let ageYears = ageDate.getUTCFullYear() - 1970;
        let ageMonth = ageDate.getUTCMonth();
        let ageDay = ageDate.getUTCDay();

        outputDay.textContent = ageDay + ' ';
        outputMonth.textContent = ageMonth + ' ';
        outputYear.textContent = ageYears + ' ';
        return;
    }
    else{
        displayReq(errorDay)
        displayReq(errorMonth)
        displayReq(errorYear)
        alert("Error");

    }
}

//Listening for clicks on the calculate button
arrowButton.addEventListener("click", CalculateDate)


//Activating enter key function on YEAR field
inputYear.addEventListener("keyup", function(event){
    if(event.key === "Enter"){
        if(+inputDay.value === 0){
            isValid = false
            displayReq(errorDay)
            inputDay.focus()
        }
        else if(+inputMonth.value === 0){
            isValid = false
            displayReq(errorMonth)
            inputMonth.focus()
        }
        else if(+inputYear.value === 0){
            isValid = false
            errorYear.textContent = "Must be a valid year"
        }
        else if(isValid){
            event.preventDefault();
            arrowButton.click();
        }
        else{
            displayReq(errorYear);
        }
        
    }
})

//Activating enter key function on MONTH field
inputMonth.addEventListener("keyup", function(event){
    if(event.key === "Enter"){
        event.preventDefault();
        if(+inputDay.value === 0){
            isValid = false
            displayReq(errorDay)
            inputDay.focus()
        }
        else if (+inputMonth.value <= 0){
            errorMonth.textContent = "Must be a valid month";
            isValid = false
        }
        else if(isValid){
            inputYear.focus();
        }
        else{
            displayReq(errorMonth)
        }
    }
})

//Activating enter key function on DAY field
inputDay.addEventListener("keyup", function(event){
    if(event.key === "Enter"){
        event.preventDefault();
        if(isValid){
            inputMonth.focus();
        }
        else{
            displayReq(errorDay)
        }
    }
})



function displayReq(errorArea){
    errorArea.textContent = "This field is required"
}