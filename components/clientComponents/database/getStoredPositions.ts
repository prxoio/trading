import exp from "constants"
import { ITrading212, Trading212 } from "interfaces/ITrading212"
import mongoose from "mongoose"

// MongoDB connection URL
const mongoDBURL = "mongodb+srv://admin:5HqwOQPWUoWkIfMg@directory.j1fxdy9.mongodb.net/tradingData"

// Function to get all documents from the Trading212 collection
export async function getAllTrading212Data(): Promise<ITrading212[]> {
  try {
    // Connect to the database if not already connected
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoDBURL)
    }

    // Retrieve all documents
    const documents: ITrading212[] = await Trading212.find({})

    console.log("Data retrieved successfully from MongoDB Atlas")
    return documents
  } catch (error) {
    console.error("Error retrieving data from MongoDB Atlas:", error)
    throw error
  }
}

