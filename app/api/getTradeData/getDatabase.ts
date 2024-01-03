import { ITrading212, Trading212 } from "interfaces/ITrading212"
import mongoose from "mongoose"

import { processTickers } from "./syncMetadata"

// Function to get all documents from the Trading212 collection
export async function getAllTrading212Data(): Promise<ITrading212[]> {
  try {
    // Connect to the database if not already connected
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(`${process.env.MONGO_DB_URL}tradingData`)
    }

    // Retrieve all documents
    const documents: ITrading212[] = await Trading212.find({})

    console.log("Data retrieved successfully from MongoDB Atlas")

    // get matching tickers and save to db:
    processTickers(documents)
    
    return documents
  } catch (error) {
    console.error("Error retrieving data from MongoDB Atlas:", error)
    throw error
  }
}
