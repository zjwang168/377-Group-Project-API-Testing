async function convertCurrency() {
    const fromCurrency = document
        .getElementById("fromCurrency")
        .value.toLowerCase();
    const toCurrency = document
        .getElementById("toCurrency")
        .value.toLowerCase();
    const amount = parseFloat(document.getElementById("amount").value); // Assuming amount is a number field

    // Validate an amount is entered
    if (!amount || amount <= 0) {
        document.getElementById("result").innerText =
            "Please enter an amount greater than zero.";
        return;
    }

    try {
        // Fetch exchange rates from the API
        const response = await fetch(
            `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`
        );
        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        // Access the correct conversion rate
        const rates = data[fromCurrency];
        if (!rates || !rates[toCurrency]) {
            document.getElementById(
                "result"
            ).innerText = `Conversion rate not found for ${toCurrency}.`;
            return;
        }

        // Perform the currency conversion
        const rate = rates[toCurrency];
        const convertedAmount = (amount * rate).toFixed(2);

        // Display the result
        document.getElementById(
            "result"
        ).innerText = `${amount} ${fromCurrency.toUpperCase()} = ${convertedAmount} ${toCurrency.toUpperCase()}`;
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("result").innerText =
            "An error occurred. Please try again.";
    }
}

function animateTitle() {
    new TypeIt("#logo-heading", {
        lifeLike: false,
        speed: 0,
    })
        .type("E")
        .pause(300)
        .type("x")
        .pause(300)
        .type("c")
        .pause(300)
        .type("h")
        .pause(300)
        .type("a")
        .pause(300)
        .type("n")
        .pause(300)
        .type("g")
        .pause(300)
        .type("e")
        .move(-1, { speed: 300 })
        .pause(300)
        .move(-1, { speed: 300 })
        .pause(300)
        .move(-1, { speed: 300 })
        .pause(300)
        .move(-1, { speed: 300 })
        .pause(300)
        .move(-1, { speed: 300 })
        .pause(300)
        .delete(1, { instant: true })
        .pause(300)
        .delete(1, { instant: true })
        .pause(300)
        .delete(1, { instant: true })
        .pause(300)
        .type("X")
        .pause(300)
        .type("C")
        .move(1, { speed: 300 })
        .pause(300)
        .move(1, { speed: 300 })
        .pause(300)
        .move(1, { speed: 300 })
        .pause(300)
        .move(1, { speed: 300 })
        .pause(300)
        .move(1, { speed: 300 })
        .go();

    new TypeIt("#tagline", {
        strings: "Convert Top <em>Currencies</em> & <em>Crypto</em> Instantly!",
        speed: 50,
        waitUntilVisible: true,
    }).go();
}

window.onload = animateTitle;
