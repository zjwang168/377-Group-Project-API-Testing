
// Currency Conversion Code
async function convertCurrency() {
    const fromCurrency = document.getElementById('fromCurrency').value.toLowerCase();
    const toCurrency = document.getElementById('toCurrency').value.toLowerCase();
    const amount = parseFloat(document.getElementById('amount').value);

    // Validate an amount is entered
    if (!amount || amount <= 0) {
        document.getElementById('result').innerText = "Please enter an amount greater than zero.";
        return;
    }

    try {
        // Fetch exchange rates from the API
        const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`);
        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();

        // Access the correct conversion rate
        const rates = data[fromCurrency];
        if (!rates || !rates[toCurrency]) {
            document.getElementById('result').innerText = `Conversion rate not found for ${toCurrency}.`;
            return;
        }

        // Perform the currency conversion
        const rate = rates[toCurrency];
        const convertedAmount = (amount * rate).toFixed(2);

        // Display the result
        document.getElementById('result').innerText = `${amount} ${fromCurrency.toUpperCase()} = ${convertedAmount} ${toCurrency.toUpperCase()}`;
    } catch (error) {
        console.error("Error:", error);
        document.getElementById('result').innerText = "An error occurred. Please try again.";
    }
}

// Compare Between Currencies Code (not working >:( )

async function renderRateChart() {
    const fromCurrency = document.getElementById('chartFromCurrency').value.toLowerCase();
    const toCurrency = document.getElementById('chartToCurrency').value.toLowerCase();

    try {
        // Fetch conversion rate for the selected currencies
        const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`);
        const data = await response.json();

        // Correctly access the target currency from the API response
        const rate = data[toCurrency];
        if (!rate) {
            alert(`Conversion rate not found for ${toCurrency.toUpperCase()}`);
            return;
        }

        // Simulate data for visualization
        const days = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'];
        const rates = days.map(() => rate); // Use the same rate for simplicity

        // Render the chart
        const ctx = document.getElementById('rateChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: days,
                datasets: [{
                    label: `Conversion Rate (${fromCurrency.toUpperCase()} to ${toCurrency.toUpperCase()})`,
                    data: rates,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: false // Allow rates > 1
                    }
                }
            }
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        alert("An error occurred while fetching conversion rates. Please try again.");
    }
}

