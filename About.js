// about.js
async function fetchSupportedCurrencies() {
    try {
        const response = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json');
        if (!response.ok) {
            throw new Error('Failed to fetch supported currencies');
        }
        const currencies = await response.json();
        const currenciesListDiv = document.getElementById('currencies-list');
        const ul = document.createElement('ul');

        for (const [code, name] of Object.entries(currencies)) {
            const li = document.createElement('li');
            li.textContent = `${name} (${code.toUpperCase()})`;
            ul.appendChild(li);
        }

        currenciesListDiv.appendChild(ul);
    } catch (error) {
        console.error('Error fetching currencies:', error);
        document.getElementById('currencies-list').textContent = 'Unable to fetch supported currencies.';
    }
}

// Initialize function on page load
window.addEventListener('DOMContentLoaded', fetchSupportedCurrencies);
