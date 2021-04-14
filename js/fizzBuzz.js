document.getElementById("submitBtn").addEventListener("click", printNumbers)

//Take user input and print numbers to the page
function printNumbers() {
    //get user inputs for range
    let startNum = parseInt(document.getElementById("numOne").value);
    let endNum = parseInt(document.getElementById("numTwo").value);
    //get user inputs for "fizz" and "buzz" numbers
    let fizz = parseInt(document.getElementById("fizz").value);
    let buzz = parseInt(document.getElementById("buzz").value)
    let numbers = getRange(startNum, endNum);
    displayData(numbers, fizz, buzz);
    tableTransition();
};

//Gets the range of numbers
function getRange(start, end) {
    let numbersArray = [];
    for (let i = start; i <= end; i++) {
        numbersArray.push(i);
    }
    return numbersArray;
};

//Display the numbers on the page
function displayData(numbers, fizz, buzz) {
    const template = document.getElementById('data-template');
    const resultsBody = document.getElementById('resultsBody');
    //put template in html document to allow it to be counted and made dynamic (makes it able to be manipulated like a DOM element)
    //note that importNode is like cloneNode but allows you to reference a <template> in a different document, as opposed to a <template> in the same document
    let colCount = template.content.cloneNode(true).querySelectorAll("td").length;
    //clear the table
    resultsBody.innerHTML = "";

    //loop over every element in the nubers array
    //get the value and write it to the page
    for (let i = 0; i < numbers.length; i += colCount) {
        let dataRow = template.content.cloneNode(true);

        //Returns an array of columns
        let cols = dataRow.querySelectorAll("td");
        //loop over the columns
        for (let colIndex = 0; colIndex < cols.length; colIndex++) {
            let value = numbers[i + colIndex];
            if (typeof value === "undefined") {
                value = "";
            } else if (value % fizz == 0 && value % buzz == 0) {
                cols[colIndex].classList.add("boldIt3");
                value = "FizzBuzz";
            } else if (value % buzz == 0 && value % fizz != 0) {
                cols[colIndex].classList.add("boldIt");
                value = "Buzz";
            } else if (value % fizz == 0 && value % buzz != 0) {
                cols[colIndex].classList.add("boldIt2");
                value = "Fizz";
            }
            // Note td's use textContent to set content
            cols[colIndex].textContent = value;
        }
        // add the row to the page
        resultsBody.appendChild(dataRow);
    }
};


//disappear form, appear table
function tableTransition() {
    let form = document.getElementById("form-div");
    let table = document.getElementById("resultDiv");
    //make form disappear
    form.classList.add("invisible");
    //make result table appear with results
    table.classList.remove("invisible");
}