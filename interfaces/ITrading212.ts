import mongoose from "mongoose"

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
export const Trading212 = mongoose.models.Trading212 || mongoose.model('Trading212', trading212Schema);

export interface ITrading212 extends Document {
  ticker: string
  quantity: number
  averagePrice: number
  currentPrice: number
  ppl: number
  fxPpl: number
  initialFillDate: string
  frontend: string
  maxBuy: number
  maxSell: number
  pieQuantity: number
  // ... other fields
}