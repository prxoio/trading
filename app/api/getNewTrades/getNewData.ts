import { ITrading212, Trading212 } from "interfaces/ITrading212"
import mongoose from "mongoose"
import fetch from "node-fetch"

type Trading212Data = any

export async function fetchAndStoreOpenPositions(apiKey: string) {
  // Connect to MongoDB Atlas
  // Replace <username>, <password>, <clustername>, and <dbname> with your MongoDB Atlas details
  await mongoose.connect(`${process.env.MONGO_DB_URL}tradingData`)
  await Trading212.deleteMany({})

  // Fetch open positions from Trading212 API
  const response = await fetch(
    "https://live.trading212.com/api/v0/equity/portfolio",
    {
      method: "GET",
      headers: {
        Authorization: `${process.env.T212_API_KEY}`,
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

  console.log("New data stored successfully in MongoDB Atlas")
  return response.status
}
