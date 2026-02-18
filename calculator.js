// calculator.js

// Store only VALID numeric results 
const validResults = [];

document.write(`
  <style>
    body { font-family: Arial, sans-serif; padding: 16px; }
    h2 { margin-top: 24px; }
    table { border-collapse: collapse; width: 100%; max-width: 900px; margin: 12px 0 24px; }
    th, td { border: 1px solid #333; padding: 10px; text-align: center; }
    th { background: #f2f2f2; }
    .error { color: #b00020; font-weight: bold; }
  </style>
`);

// main results table
document.write("<h2>Calculator Results</h2>");
document.write("<table>");
document.write("<tr><th>Number 1</th><th>Operator</th><th>Number 2</th><th>Result</th></tr>");

while (true) {
  // If user hits Cancel, prompt returns null
  const xInput = prompt("Enter the first number (x):");
  if (xInput === null) break;

  const opInput = prompt("Enter an operator (+, -, *, /, %):");
  if (opInput === null) break;

  const yInput = prompt("Enter the second number (y):");
  if (yInput === null) break;

  const x = Number(xInput);
  const y = Number(yInput);
  const operator = (opInput || "").trim();

  let resultText = "";
  let isValid = true;
  let numericResult = null;

  // Validate numbers 
  if (isNaN(x) || isNaN(y)) {
    isValid = false;
    resultText = `<span class="error">Error: x and y must be numbers</span>`;
  } else {
    // Validate operator and compute
    switch (operator) {
      case "+":
        numericResult = x + y;
        break;
      case "-":
        numericResult = x - y;
        break;
      case "*":
        numericResult = x * y;
        break;
      case "/":
        //handle divide by zero
        if (y === 0) {
          isValid = false;
          resultText = `<span class="error">Error: division by zero</span>`;
        } else {
          numericResult = x / y;
        }
        break;
      case "%":
        if (y === 0) {
          isValid = false;
          resultText = `<span class="error">Error: modulus by zero</span>`;
        } else {
          numericResult = x % y;
        }
        break;
      default:
        isValid = false;
        resultText = `<span class="error">Error: invalid operator</span>`;
    }
  }

  // If valid, push to array and display numeric result
  if (isValid) {
    validResults.push(numericResult);
    resultText = numericResult;
  }

  // Add a row to the main table
  document.write(
    "<tr><td>" +
      xInput +
      "</td><td>" +
      operator +
      "</td><td>" +
      yInput +
      "</td><td>" +
      resultText +
      "</td></tr>"
  );
}

// Close main results table
document.write("</table>");

//summary table (min, max, avg, total) 
document.write("<h2>Summary (Valid Results Only)</h2>");
document.write("<table>");
document.write("<tr><th>Minimum</th><th>Maximum</th><th>Average</th><th>Total</th></tr>");

if (validResults.length === 0) {
  document.write(
    `<tr><td colspan="4" class="error">No valid results to summarize.</td></tr>`
  );
} else {
  let total = 0;
  let min = validResults[0];
  let max = validResults[0];

  for (let i = 0; i < validResults.length; i++) {
    const val = validResults[i];
    total += val;
    if (val < min) min = val;
    if (val > max) max = val;
  }

  const avg = total / validResults.length;

  document.write(
    "<tr><td>" +
      min +
      "</td><td>" +
      max +
      "</td><td>" +
      avg +
      "</td><td>" +
      total +
      "</td></tr>"
  );
}

document.write("</table>");
