import "./style.css";
import { generateReturnsArray } from "./investmentGoals.js";

const form = document.getElementById("investment-form");
function renderProgression(evt) {
  evt.preventDefault();
  if (document.querySelector(".error")) {
    return;
  }

  const startingAmount = Number(
    document.getElementById("starting-amount").value.replace(",", "."),
  );
  const additionalContribution = Number(
    document.getElementById("additional-contribuition").value.replace(",", "."),
  );
  const timeAmount = Number(
    document.getElementById("time-amount").value.replace(",", "."),
  );
  const timeAmountPeriod = document.getElementById("time-amount-period").value;
  const returnRate = Number(
    document.getElementById("return-rate").value.replace(",", "."),
  );
  const returnRatePeriod = document.getElementById("evaluation-period").value;
  const taxRate = Number(
    document.getElementById("tax-rate").value.replace(",", "."),
  );

  const returnsArray = generateReturnsArray(
    startingAmount,
    timeAmount,
    timeAmountPeriod,
    additionalContribution,
    returnRate,
    returnRatePeriod,
  );

  console.log(returnsArray);
}

function validateInput(evt) {
  if (evt.target.value === "") {
    return;
  }

  const { parentElement } = evt.target;
  const { grandParentElement } = evt.target.parentElement;

  const inputValue = evt.target.value.replace(",", ".");
  if (
    isNaN(inputValue) ||
    (Number(inputValue) <= 0 && !parentElement.classList.contains(error))
  ) {
    const errorTextElement = document.createElement("p");
    errorTextElement.classList.add("text-red-500");
    errorTextElement.innerText = "Insira um valor numérico maior que zero";
    parentElement.classList.add("error");
    grandParentElement.appendChild(errorTextElement);
  } else if (
    parentElement.classList.contains("error") &&
    isNaN(inputValue) &&
    Number(inputValue) > 0
  ) {
    parentElement.classList.remove("error");
    grandParentElement.querySelector("p").remove();
  }
}

for (const formElement of form) {
  if (formElement.tagName === "INPUT" && formElement.hasAttribute("name")) {
    formElement.addEventListener("blur", validateInput);
  }
}
form.addEventListener("submit", renderProgression);
