function getCorrectBill(nums, numToReach) {
  const exactImportBill = nums.find((i) => i === numToReach);

  // if (exactImportBill) {
  //   return exactImportBill;
  // }
  const results = [];
  const possibilities = 2 ** nums.length - 1;

  for (let mask = 1; mask <= possibilities; mask++) {
    let sum = 0;
    const picked = [];

    for (let j = 0; j < nums.length; j++) {
      // si el bit j está prendido, incluyo nums[j]
      if (mask & (1 << j)) {
        sum += nums[j];
        picked.push(nums[j]);
      }
    }

    if (sum === numToReach) {
      results.push(picked);
    }
  }

  return results.length === 0
    ? { possibilities: 0, results: "No hay valores que sumen el monto deseado" }
    : { possibilities: results.length, results };
}

const form = document.querySelector(".form");
const event = form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputs = document.querySelector(".amount").value;
  const numsArray = inputs.split("\n").map((i) => parseFloat(i));
  const amountToReach = parseFloat(
    document.querySelector(".amount-to-reach").value
  );
  const correctBills = getCorrectBill(numsArray, amountToReach);
  const container = document.querySelector(".results-container");
  container.innerHTML = "";
  const title = document.createElement("h3");
  title.className = "title";
  title.textContent = "Resultados";
  container.appendChild(title);

  //  -----
  const results = correctBills.results;
  if (correctBills.possibilities > 0) {
    for (let i = 0; i < results.length; i++) {
      const element = results[i];
      const paragraph = document.createElement("p");
      paragraph.className = "results";
      paragraph.textContent = element.join(", ");
      container.appendChild(paragraph);
    }
  } else {
    const paragraph = document.createElement("p");
    paragraph.className = "results";
    paragraph.textContent = results;
    container.appendChild(paragraph);
  }
});
