const supabase = require('../database/supabase'); // Import Supabase client

// Fetch Conversion Rates
const fetchConversionRates = async (req, res) => {
    const { fromCurrency, toCurrency } = req.query;

    console.log("Fetching Conversion Rates for:", { fromCurrency, toCurrency });

    try {
        const response = await fetch(
            `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`
        );
        const data = await response.json();

        if (!data[fromCurrency] || !data[fromCurrency][toCurrency]) {
            return res.status(404).json({ error: "Conversion rate not found" });
        }

        const rate = data[fromCurrency][toCurrency];
        res.status(200).json({ rate });
    } catch (error) {
        console.error("Error fetching conversion rates:", error);
        res.status(500).json({ error: "Error fetching conversion rates" });
    }
};

// Log Conversion
const logConversion = async (req, res) => {
    const { fromcurrency, tocurrency, amount, convertedamount } = req.body;

    console.log("=== DEBUG: Request Body ===");
    console.log({ fromcurrency, tocurrency, amount, convertedamount });

    try {
        const { data, error } = await supabase
            .from('conversion_logs')
            .insert([{ fromcurrency, tocurrency, amount, convertedamount }]);

        console.log("=== DEBUG: Supabase Response ===");
        console.log({ data, error });

        if (error) {
            console.error("=== Supabase Error ===");
            console.error(error);
            return res.status(500).json({ error: "Error logging conversion" });
        }

        res.status(201).json({ message: "Conversion logged successfully", data });
    } catch (err) {
        console.error("=== Unexpected Error ===");
        console.error(err);
        res.status(500).json({ error: "Unexpected error occurred" });
    }
};

// Get All Conversions
const getAllConversions = async (req, res) => {
    console.log("=== DEBUG: Fetching All Conversions ===");

    try {
        const { data, error } = await supabase
            .from('conversion_logs')
            .select('*');

        console.log("=== DEBUG: Supabase Response ===");
        console.log({ data, error });

        if (error) {
            console.error("=== Supabase Error ===");
            console.error(error);
            return res.status(500).json({ error: "Error fetching conversions" });
        }

        res.status(200).json({ conversions: data });
    } catch (err) {
        console.error("=== Unexpected Error ===");
        console.error(err);
        res.status(500).json({ error: "Unexpected error occurred" });
    }
};

module.exports = {
    fetchConversionRates,
    logConversion,
    getAllConversions
};
