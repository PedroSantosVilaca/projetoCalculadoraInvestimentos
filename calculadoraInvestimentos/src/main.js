import "./style.css";
import { generateReturnsArray } from "./investmentGoals.js";

const calculateButton = document.getElementById("calculate-results");
const clearFormButton = document.getElementById("clear-form");
function renderProgression() {
  const startingAmount = Number(
    document.getElementById("starting-amount").value,
  );
  const additionalContribution = Number(
    document.getElementById("additional-contribuition").value,
  );
  const timeAmount = Number(document.getElementById("time-amount").value);
  const timeAmountPeriod = document.getElementById("time-amount-period").value;
  const returnRate = Number(document.getElementById("return-rate").value);
  const returnRatePeriod = document.getElementById("evaluation-period").value;
  const taxRate = Number(document.getElementById("tax-rate").value);

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

calculateButton.addEventListener("click", renderProgression);
