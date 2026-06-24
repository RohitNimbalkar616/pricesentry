import { Firecrawl } from "firecrawl";

const firecrawl = new Firecrawl({
  apiKey: process.env.FIRECRAWL_API_KEY,
});

export async function scrapeProduct(url) {
  try {
    const result = await firecrawl.scrape(url, {
      formats: [
        {
          type: "json",
          schema: {
            type: "object",
            required: ["productName", "currentPrice"],
            properties: {
              productName: {
                type: "string",
              },
              currentPrice: {
                type: "string",
              },
              currencyCode: {
                type: "string",
              },
              productImageUrl: {
                type: "string",
              },
            },
          },
          prompt:
            'Extract:\n\n- productName\n- currentPrice (numeric value only, no currency symbols)\n- currencyCode (INR, USD, EUR, GBP, etc)\n- productImageUrl\n\nIf the page shows ₹2950, return:\n\n{\n  "currentPrice": "2950",\n  "currencyCode": "INR"\n}',
        },
      ],
    });

    console.log(result.json.productName);
    console.log(result.json.currentPrice);
    console.log(result.json.currencyCode);
    console.log(result.json.productImageUrl);
    // Firecrawl returns data in result.extract
    const extractedData = result.json;
    if (!extractedData || !extractedData.productName) {
      throw new Error("No data extracted from URL");
    }
    return extractedData;
  } catch (error) {
    console.error("Firecrawl scrape error:", error);
    throw new Error(`Failed to scrape product: ${error.message}`);
  }
}
