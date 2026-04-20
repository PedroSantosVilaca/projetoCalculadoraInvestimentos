import "./style.css";
import { generateReturnsArray } from "./investmentGoals.js";
import { Chart } from "chart.js/auto";
import { createTable } from "./table.js";

const finalMoneyChart = document.getElementById("final-money-distribution");
const progressionChart = document.getElementById("progression");

const form = document.getElementById("investment-form");
const clearFormButton = document.getElementById("clear-form");
let doughnutChartReference = {};
let progressionChartReference = {};

function formatCurrencyToTable(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatCurrencyToGraph(value) {
  return value.toFixed(2);
}

function renderProgression(evt) {
  evt.preventDefault();
  if (document.querySelector(".error")) {
    return;
  }
  resetCharts();
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
  const columnsArray = [
    { columnLabel: "Mês", accessor: "month" },
    {
      columnLabel: "Valor investido",
      accessor: "investedAmount",
      format: (numberinfo) => formatCurrencyToTable(numberinfo),
    },
    {
      columnLabel: "Rendimento",
      accessor: "interestReturns",
      format: (numberinfo) => formatCurrencyToTable(numberinfo),
    },
    {
      columnLabel: "Rendimento total",
      accessor: "totalInterestReturns",
      format: (numberinfo) => formatCurrencyToTable(numberinfo),
    },
    {
      columnLabel: "Montante total",
      accessor: "totalAmount",
      format: (numberinfo) => formatCurrencyToTable(numberinfo),
    },
  ];

  const returnFinalInvestmentObject = returnsArray[returnsArray.length - 1];

  doughnutChartReference = new Chart(finalMoneyChart, {
    type: "doughnut",
    data: {
      labels: ["Total Investido", "Rendimento", "Imposto"],
      datasets: [
        {
          data: [
            formatCurrencyToGraph(returnFinalInvestmentObject.investedAmount),
            formatCurrencyToGraph(
              returnFinalInvestmentObject.totalInterestReturns *
                (1 - taxRate / 100),
            ),
            formatCurrencyToGraph(
              returnFinalInvestmentObject.totalInterestReturns *
                (taxRate / 100),
            ),
          ],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    },
  });

  progressionChartReference = new Chart(progressionChart, {
    type: "bar",
    data: {
      labels: returnsArray.map((investmentObject) => investmentObject.month),
      datasets: [
        {
          label: "Total Investido",
          data: returnsArray.map((investmentObject) =>
            formatCurrencyToGraph(investmentObject.investedAmount),
          ),
          backgroundColor: "rgb(255, 99, 132)",
        },

        {
          label: "Retorno do Investimento",
          data: returnsArray.map((investmentObject) =>
            formatCurrencyToGraph(investmentObject.interestReturns),
          ),
          backgroundColor: "rgb(54, 162, 235)",
        },
      ],
    },
    options: {
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    },
  });
  createTable(columnsArray, returnsArray, "results-table");
}

function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function resetCharts() {
  if (
    !isObjectEmpty(doughnutChartReference) &&
    !isObjectEmpty(progressionChartReference)
  ) {
    doughnutChartReference.destroy();
    progressionChartReference.destroy();
  }
}

function clearForm() {
  const form = document.querySelector("form");
  form["starting-amount"].value = "";
  form["additional-contribuition"].value = "";
  form["time-amount"].value = "";
  form["return-rate"].value = "";
  form["tax-rate"].value = "";

  resetCharts();
  const errorInputContainers = document.querySelectorAll(".error");

  for (const errorInputContainer of errorInputContainers) {
    errorInputContainer.classList.remove("error");
    errorInputContainer.parentElement.querySelector("p").remove();
  }
}

function validateInput(evt) {
  if (evt.target.value === "") {
    return;
  }

  const parentElement = evt.target.parentElement;
  const grandParentElement = parentElement.parentElement;

  const inputValue = evt.target.value.replace(",", ".");
  if (
    !parentElement.classList.contains("error") &&
    (isNaN(inputValue) || Number(inputValue))
  ) {
    const errorTextElement = document.createElement("p");
    errorTextElement.classList.add("text-red-500");
    errorTextElement.innerText = "Insira um valor numérico maior que zero";
    parentElement.classList.add("error");
    grandParentElement.appendChild(errorTextElement);
  } else if (
    parentElement.classList.contains("error") &&
    !isNaN(inputValue) &&
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

const MainEl = document.querySelector("main");
const carouselEl = document.getElementById("carousel");
const nextButton = document.getElementById("slide-arrow-next");
const previousButton = document.getElementById("slide-arrow-previous");

nextButton.addEventListener("click", () => {
  carouselEl.scrollLeft += MainEl.clientWidth;
});

previousButton.addEventListener("click", () => {
  carouselEl.scrollLeft -= MainEl.clientWidth;
});

clearFormButton.addEventListener("click", clearForm);

form.addEventListener("submit", renderProgression);
