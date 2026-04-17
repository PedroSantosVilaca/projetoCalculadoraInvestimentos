const isNonEmptyArray = (arrayElement) => {
  return Array.isArray(arrayElement) && arrayElement.length > 0;
};

const createTable = (columnsArray, dataArray, tableID) => {
  if (
    !isNonEmptyArray(columnsArray) ||
    !isNonEmptyArray(dataArray) ||
    !tableID
  ) {
    throw new Error("Conserte o erro!");
  }
  const tableElement = document.getElementById(tableID);
  if (!tableElement || tableElement.nodeName !== "TABLE") {
    throw new Error("O ID informado não corresponde a nenhum elemento table");
  }

  createTableHeader();
  createTableBody();
};

function createTableHeader() {}

function createTableBody() {}
