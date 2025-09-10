const amountInput = document.querySelector(".amount input");
const fromSelect = document.querySelector(".from select");
const toSelect = document.querySelector(".to select");
const fromFlag = document.querySelector(".from img");
const toFlag = document.querySelector(".to img");
const msg = document.querySelector(".msg");
const button = document.querySelector("button");
const swapIcon = document.querySelector(".dropdown i");

// Populate selects with all currencies from countryList
const populateSelect = (selectElement) => {
    selectElement.innerHTML = ""; // Clear existing options
    for (const [currencyCode, countryCode] of Object.entries(countryList)) {
        const option = document.createElement("option");
        option.value = currencyCode;
        option.textContent = currencyCode; // Using code for now; can enhance later
        selectElement.appendChild(option);
    }
};

// Populate selects
populateSelect(fromSelect);
populateSelect(toSelect);

// Set default selections before initializing Choices
fromSelect.value = "INR";
toSelect.value = "USD";

// Initialize Choices.js with search and position below
const fromChoices = new Choices(fromSelect, {
    searchEnabled: true,
    itemSelectText: '',
    shouldSort: false,
    position: 'bottom',
    searchPlaceholderValue: 'Search currency',
    placeholderValue: 'Select currency'
});

const toChoices = new Choices(toSelect, {
    searchEnabled: true,
    itemSelectText: '',
    shouldSort: false,
    position: 'bottom',
    searchPlaceholderValue: 'Search currency',
    placeholderValue: 'Select currency'
});

// Set the selected values using Choices API
fromChoices.setChoiceByValue("INR");
toChoices.setChoiceByValue("USD");

// Update flags when selection changes
fromSelect.addEventListener("change", () => {
    const countryCode = countryList[fromSelect.value];
    fromFlag.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
});

toSelect.addEventListener("change", () => {
    const countryCode = countryList[toSelect.value];
    toFlag.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
});

// Swap functionality, rate fetching, etc.
// ... (keep existing event listeners and functions as previously provided)

// Initialize flags on page load
window.addEventListener("load", () => {
    fromFlag.src = `https://flagsapi.com/${countryList[fromSelect.value]}/flat/64.png`;
    toFlag.src = `https://flagsapi.com/${countryList[toSelect.value]}/flat/64.png`;
});


toSelect.addEventListener("change", () => {
    const countryCode = countryList[toSelect.value];
    toFlag.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
});

// Swap currencies
const swapCurrencies = () => {
    const temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;

    fromChoices.setChoiceByValue(fromSelect.value);
    toChoices.setChoiceByValue(toSelect.value);

    fromFlag.src = `https://flagsapi.com/${countryList[fromSelect.value]}/flat/64.png`;
    toFlag.src = `https://flagsapi.com/${countryList[toSelect.value]}/flat/64.png`;

    getExchangeRate();
};

// Get exchange rate
const getExchangeRate = () => {
    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromSelect.value;
    const toCurrency = toSelect.value;

    if (isNaN(amount)) {
        msg.textContent = "Please enter a valid amount.";
        return;
    }

    const apiKey = "044f1934da1545911fef599e";
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.result === "error") {
                msg.textContent = "Failed to fetch exchange rates.";
                return;
            }
            const rate = data.conversion_rates[toCurrency];
            const total = (rate * amount).toFixed(2);
            msg.textContent = `${amount} ${fromCurrency} = ${total} ${toCurrency}`;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            msg.textContent = "Error fetching exchange rates.";
        });
};

// Event listeners
button.addEventListener("click", (e) => {
    e.preventDefault();
    getExchangeRate();
});

swapIcon.addEventListener("click", () => {
    swapCurrencies();
});

// Initialize flags on load
window.addEventListener("load", () => {
    fromFlag.src = `https://flagsapi.com/${countryList[fromSelect.value]}/flat/64.png`;
    toFlag.src = `https://flagsapi.com/${countryList[toSelect.value]}/flat/64.png`;
});
