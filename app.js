const baseURL = "https://api.frankfurter.dev/v1/latest?amount=1&from=USD&to=INR";
const dropdowns = document.querySelectorAll(".dropdown select");
const button = document.querySelector("form button");
const result = document.querySelector(".result p");

for (let select of dropdowns) {
    for (let currCode in countryList) 
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

button.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = parseFloat(amount.value);

    const fromCurr = document.querySelector(".from select").value;
    const toCurr = document.querySelector(".to select").value;

    if (isNaN(amtVal) || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    const URL = `https://api.frankfurter.dev/v1/latest?amount=${amtVal}&from=${fromCurr}&to=${toCurr}`;
    let response = await fetch(URL);
    let data = await response.json();

    let finalAmt = data.rates[toCurr];
    result.innerText = `${amtVal} ${fromCurr} = ${finalAmt} ${toCurr}`;
});
