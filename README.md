# XChange: Currency and Cryptocurrency Conversion Platform

## Project Description
XChange is a web application designed to provide seamless conversion between global fiat currencies and cryptocurrencies. Users can view real-time exchange rates, convert currencies, and visualize exchange rate trends over time for both fiat and crypto assets.

### Features:
- **Currency Conversion**: Convert between 36 global fiat currencies.
- **Cryptocurrency Conversion**: Convert between the top 100 cryptocurrencies.
- **Exchange Rate Trends**: View 7-day trends for selected currencies and cryptocurrencies.
- **API Integration**: Utilizes up-to-date exchange rates and cryptocurrency data.

---

## Target Browsers
XChange is optimized for:
- **Desktop Browsers**: Google Chrome, Mozilla Firefox, Microsoft Edge
- **Mobile Browsers**: Safari (iOS), Google Chrome (Android)

---

## Link to Developer Manual
For setup and development instructions, visit the [Developer Manual](docs/developer_manual.md).

---

## Developer Manual

### Installation and Dependencies
1. Clone the repository:
   ```bash
   git clone https://github.com/zijinwang711/377-Group-Project-API-Testing.git
   ```
2. Navigate to the project directory:
   ```bash
   cd 377-Group-Project-API-Testing
   ```
3. Install any necessary dependencies:
   - If you're using `npm`:
     ```bash
     npm install
     ```

---

### Running the Application
1. Start a local development server using Python:
   ```bash
   python -m http.server
   ```
   Open your browser and go to `http://localhost:8000` to view the application.

2. Alternatively, use a live development server like `live-server`:
   ```bash
   npx live-server
   ```

---

### Running Tests
- No automated tests have been implemented for this project yet.

---

### API Documentation

#### 1. **Fawaz Ahmed Exchange API**
- **Base URL**: `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/`
- **Endpoints**:
  - `/currencies.json`: Fetches a list of supported fiat currencies.
  - `/currencies/{fromCurrency}.json`: Fetches exchange rates for a specific base currency.
- **Example Usage**:
  ```javascript
  fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json')
    .then(response => response.json())
    .then(data => console.log(data));
  ```

#### 2. **CoinGecko API**
- **Base URL**: `https://api.coingecko.com/api/v3`
- **Endpoints**:
  - `/coins/list`: Fetches a list of supported cryptocurrencies.
  - `/simple/price?ids={ids}&vs_currencies={currencies}`: Fetches real-time prices for specific cryptocurrencies.
  - `/coins/{id}/market_chart?vs_currency={currency}&days={days}`: Fetches historical price data for a cryptocurrency.
- **Example Usage**:
  ```javascript
  fetch('https://api.coingecko.com/api/v3/coins/list')
    .then(response => response.json())
    .then(data => console.log(data));
  ```

#### 3. **Frankfurter Currency API**
- **Base URL**: `https://api.frankfurter.app`
- **Endpoints**:
  - `/currencies`: Fetches a list of supported fiat currencies.
  - `/{startDate}..{endDate}?from={fromCurrency}&to={toCurrency}`: Fetches historical exchange rates for a date range.
- **Example Usage**:
  ```javascript
  fetch('https://api.frankfurter.app/currencies')
    .then(response => response.json())
    .then(data => console.log(data));
  ```

---

### Known Bugs
1. Currency trends are only available for USD as the base currency.
2. No error handling for missing or invalid input fields in some cases.
3. Limited testing for edge cases in API responses.

---

### Roadmap for Future Development
1. Add support for more cryptocurrencies beyond the top 100.
2. Implement custom date ranges for exchange rate trends.
3. Enhance mobile responsiveness for smaller screens.
4. Introduce user accounts to save preferred currencies and conversion history.
5. Implement automated tests for API integrations and user input validation.