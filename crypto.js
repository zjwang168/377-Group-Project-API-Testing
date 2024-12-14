const API_URL = 'https://api.coingecko.com/api/v3';

// Populate cryptocurrency dropdowns
async function populateCryptoDropdowns() {
    try {
        const response = await fetch(`${API_URL}/coins/list`);
        const coins = await response.json();

        const fromDropdown = document.getElementById('cryptoFrom');
        const toDropdown = document.getElementById('cryptoTo');
        const chartDropdown = document.getElementById('cryptoChart');

        coins.slice(0, 100).forEach((coin) => { // Limit to first 100 coins for performance
            const option = document.createElement('option');
            option.value = coin.id;
            option.textContent = coin.name;

            fromDropdown.appendChild(option);
            toDropdown.appendChild(option.cloneNode(true));
            chartDropdown.appendChild(option.cloneNode(true));
        });
    } catch (error) {
        console.error('Error fetching cryptocurrencies:', error);
    }
}

// Convert cryptocurrencies
async function convertCrypto() {
    const from = document.getElementById('cryptoFrom').value;
    const to = document.getElementById('cryptoTo').value;
    const amount = parseFloat(document.getElementById('cryptoAmount').value);

    if (!from || !to || amount <= 0) {
        document.getElementById('cryptoResult').innerText = 'Please provide valid input.';
        return;
    }

    try {
        const response = await fetch(`${API_URL}/simple/price?ids=${from},${to}&vs_currencies=usd`);
        const rates = await response.json();

        if (!rates[from] || !rates[to]) {
            document.getElementById('cryptoResult').innerText = 'Conversion rate not available.';
            return;
        }

        const fromRate = rates[from].usd;
        const toRate = rates[to].usd;
        const convertedAmount = ((amount * fromRate) / toRate).toFixed(6);

        document.getElementById('cryptoResult').innerText = `${amount} ${from} = ${convertedAmount} ${to}`;
    } catch (error) {
        console.error('Error converting cryptocurrencies:', error);
        document.getElementById('cryptoResult').innerText = 'An error occurred. Please try again.';
    }
}

// Fetch and render crypto price trends
async function fetchCryptoChart() {
    const selectedCrypto = document.getElementById('cryptoChart').value;

    if (!selectedCrypto) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/coins/${selectedCrypto}/market_chart?vs_currency=usd&days=7`);
        const data = await response.json();

        const prices = data.prices.map((price) => price[1]); // Extract price data
        const dates = data.prices.map((price) => new Date(price[0]).toLocaleDateString());

        const ctx = document.getElementById('cryptoPriceChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: `${selectedCrypto.toUpperCase()} Price (Last 7 Days)`,
                    data: prices,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 2,
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: false,
                    },
                },
            },
        });
    } catch (error) {
        console.error('Error fetching crypto chart data:', error);
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    populateCryptoDropdowns();
});