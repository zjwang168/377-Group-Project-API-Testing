// global currencies
async function populateDropdowns() {
    const globalCurrencies = [
        "usd", "eur", "gbp", "jpy", "aud", "cad", "aed", "cny", "inr", "bdt", 
        "sar", "try", "syp", "egp", "ngn", "pkr", "mxn", "rub", "krw", "ars", 
        "brl", "vnd", "thb", "qar", "iqd", "mad", "myr", "nzd", "sgd", "afn", 
        "twd", "hkd", "jod", "cop", "php", "dop"
    ];

    const response = await fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json");
    const currencies = await response.json();

    const fromCurrencyDropdown = document.getElementById('fromCurrency');
    const toCurrencyDropdown = document.getElementById('toCurrency');

    fromCurrencyDropdown.innerHTML = '<option value="" disabled selected>Select Currency</option>';
    toCurrencyDropdown.innerHTML = '<option value="" disabled selected>Select Currency</option>';

    for (const [currencyCode, currencyName] of Object.entries(currencies)) {
        if (globalCurrencies.includes(currencyCode.toLowerCase())) {
            const optionHTML = `<option value="${currencyCode.toLowerCase()}">${currencyCode.toUpperCase()} - ${currencyName}</option>`;
            fromCurrencyDropdown.innerHTML += optionHTML;
            toCurrencyDropdown.innerHTML += optionHTML;
        }
    }
}

populateDropdowns();

// currency conversion
async function convertCurrency() {
    const fromCurrency = document.getElementById('fromCurrency').value.toLowerCase();
    const toCurrency = document.getElementById('toCurrency').value.toLowerCase();
    const amount = parseFloat(document.getElementById('amount').value);

    if (!amount || amount <= 0) return;

    const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`);
    const data = await response.json();
    const rates = data[fromCurrency];

    if (!rates || !rates[toCurrency]) return;

    const rate = rates[toCurrency];
    const convertedAmount = (amount * rate).toFixed(2);

    document.getElementById('result').innerText = `${amount} ${fromCurrency.toUpperCase()} = ${convertedAmount} ${toCurrency.toUpperCase()}`;
}

// currency exchange rate trends with USD as the base

const API_URL = "https://api.frankfurter.app";

async function populateTrend() {
    const response = await fetch(`${API_URL}/currencies`);
    const currencies = await response.json();
    const currencyDropdown = document.getElementById('currencyChartDropdown');
    currencyDropdown.innerHTML = '<option value="" disabled selected>Select Currency</option>';
    for (const [code, name] of Object.entries(currencies)) {
        const option = document.createElement("option");
        option.value = code.toLowerCase();
        option.textContent = `${code.toUpperCase()} - ${name}`;
        currencyDropdown.appendChild(option);
    }
}

let chartInstance = null;

async function fetchCurrencyChart() {
    const selectedCurrency = document.getElementById('currencyChartDropdown').value;
    if (!selectedCurrency || selectedCurrency === "usd") 
        return;

    const today = new Date();
    const endDate = today.toISOString().split("T")[0];
    today.setDate(today.getDate() - 6);
    const startDate = today.toISOString().split("T")[0];

    const response = await fetch(
        `${API_URL}/${startDate}..${endDate}?from=USD&to=${selectedCurrency.toUpperCase()}`
    );
    const data = await response.json();

    const dates = Object.keys(data.rates);
    const rates = dates.map((date) => data.rates[date][selectedCurrency.toUpperCase()]);

    const ctx = document.getElementById('currencyPriceChart').getContext('2d');

    if (chartInstance) chartInstance.destroy();

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: `USD to ${selectedCurrency.toUpperCase()} (Last 7 Days)`,
                data: rates,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: false },
            },
        },
    });
}

populateTrend();

// supported currencies
async function supportedCurrencies() {
    const globalCurrencies = [
        "usd", "eur", "gbp", "jpy", "aud", "cad", "aed", "cny", "inr", "bdt", 
        "sar", "try", "syp", "egp", "ngn", "pkr", "mxn", "rub", "krw", "ars", 
        "brl", "vnd", "thb", "qar", "iqd", "mad", "myr", "nzd", "sgd", "afn", 
        "twd", "hkd", "jod", "cop", "php", "dop"
    ];

    const response = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json');
    const currencies = await response.json();

    const currenciesListDiv = document.getElementById('currencies-list');
    const ul = document.createElement('ul');

    for (const [code, name] of Object.entries(currencies)) {
        if (globalCurrencies.includes(code.toLowerCase())) {
            const li = document.createElement('li');
            li.textContent = `${name} (${code.toUpperCase()})`;
            ul.appendChild(li);
        }
    }

    currenciesListDiv.appendChild(ul);
}

window.addEventListener('DOMContentLoaded', supportedCurrencies);
