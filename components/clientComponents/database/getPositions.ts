
import mongoose from "mongoose"
import fetch from "node-fetch"

type Trading212Data = any

// Define a schema for your data
const trading212Schema = new mongoose.Schema({
  // Define the schema according to the structure of Trading212Data
  // Example:
  ticker: String,
  quantity: Number,
  averagePrice: Number,
  currentPrice: Number,
  ppl: Number,
  fxPpl: Number,
  initialFillDate: String,
  frontend: String,
  maxBuy: Number,
  maxSell: Number,
  pieQuantity: Number,
  // ... other fields
})
const Trading212 = mongoose.model('Trading212', trading212Schema);

export async function fetchAndStoreOpenPositions(apiKey: string) {
  // Connect to MongoDB Atlas
  // Replace <username>, <password>, <clustername>, and <dbname> with your MongoDB Atlas details
  const mongoDBURL =
    "mongodb+srv://admin:5HqwOQPWUoWkIfMg@directory.j1fxdy9.mongodb.net/tradingData"
  await mongoose.connect(mongoDBURL)
  
  await Trading212.deleteMany({});

  // Fetch open positions from Trading212 API
  const response = await fetch(
    "https://live.trading212.com/api/v0/equity/portfolio",
    {
      method: "GET",
      headers: {
        Authorization: "23300779ZPFpxuGQcrLAkJZGURTCMjQQGJwus",
      },
    }
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`)
  }


  const data: Trading212Data = await response.json()

  // Now, store the data in MongoDB Atlas
  for (const position of data) {
    // Create a new document for each position
    const newPosition = new Trading212({
      ticker: position.ticker,
      quantity: position.quantity,
      averagePrice: position.averagePrice,
      currentPrice: position.currentPrice,
      ppl: position.ppl,
      fxPpl: position.fxPpl,
      initialFillDate: position.initialFillDate,
      frontend: position.frontend,
      maxBuy: position.maxBuy,
      maxSell: position.maxSell,
      pieQuantity: position.pieQuantity,
      // ... map other fields
    })

    await newPosition.save()
  }

  console.log("Data stored successfully in MongoDB Atlas")
}
