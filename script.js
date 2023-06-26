"use strict";

// Select Elements
const billInput = document.getElementById("bill");
const numOfPeopleInput = document.getElementById("num-of-people");
const tipPercentsContainer = document.querySelector(".tip-percent-choices-container");
const tipAmountEl = document.getElementById("tip-amount");
const totalEl = document.getElementById("total");
const resetBtn = document.querySelector(".btn");
const form = document.querySelector(".form");
const customTipEl = document.querySelector(".tip-input");

let percentEl = document.querySelector(".tip-input");

// get the tip percent
tipPercentsContainer.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("percent")) {
        removeActiveFromAllSiblings(target);
        target.classList.add("active");
        percentEl = target;
    }
});

let billError = false,
    percentError = false,
    numOfPeopleError = false;

const resetErrors = () => {
    billInput.parentElement.classList.remove("error");
    percentEl.parentElement.classList.remove("error");
    numOfPeopleInput.parentElement.classList.remove("error");
    billError = false;
    percentError = false;
    numOfPeopleError = false;
};

//Listen to Form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();
    // reset errors
    resetErrors();
    // Get Values
    let billValue = billInput.value;
    let numOfPeople = numOfPeopleInput.value;
    let percentVal = percentEl.value ? +percentEl.value : +percentEl.textContent.replace("%", "");
    percentVal = percentVal * 0.01;

    // Validate inputs
    if (billValue <= 0) billError = true;
    if (numOfPeople <= 0) numOfPeopleError = true;
    if (percentVal < 0) percentError = true;

    if (!billError && !numOfPeopleError && !percentError) {
        // Calc results
        const totalPerPerson = billValue / numOfPeople;
        const tipAmountPerPerson = (billValue * percentVal) / numOfPeople;

        // inject results
        totalEl.textContent = `$${totalPerPerson.toFixed(2)}`;
        tipAmountEl.textContent = `$${tipAmountPerPerson.toFixed(2)}`;
        resetBtn.removeAttribute("disabled");
    } else {
        //  Display error if there is any error
        if (billError) {
            billInput.parentElement.classList.add("error");
        }
        if (percentError) {
            percentEl.parentElement.classList.add("error");
        }
        if (numOfPeopleError) {
            numOfPeopleInput.parentElement.classList.add("error");
        }
    }
});

resetBtn.addEventListener("click", () => {
    resetBtn.setAttribute("disabled", true);
    totalEl.textContent = "$0.00";
    tipAmountEl.textContent = "$0.00";
});
customTipEl.addEventListener("focus", () => {
    percentEl = customTipEl;
    removeActiveFromAllSiblings(percentEl);
});
// Remove active class from all the siblings of the element
const removeActiveFromAllSiblings = (el) => {
    const allElements = el.closest(".tip-percent-choices").querySelectorAll(".percent");
    [...allElements].forEach((percentEl) => {
        if (el !== percentEl) {
            percentEl.classList.remove("active");
        }
    });
};
