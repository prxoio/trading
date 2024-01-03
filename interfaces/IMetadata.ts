import mongoose from "mongoose"

// Define a schema for your data
export const instrumentMetadataSchema = new mongoose.Schema({
  addedOn: String,
  currencyCode: String,
  isin: String,
  maxOpenQuantity: Number,
  minTradeQuantity: Number,
  name: String,
  shortName: String,
  ticker: String,
  type: String,
  workingScheduleId: Number, 
})
export const InstrumentMetadata = mongoose.model('Metadata', instrumentMetadataSchema);

export interface IInstrumentSchema extends Document {
  addedOn: string
  currencyCode: string
  isin: string
  maxOpenQuantity: number
  minTradeQuantity: number
  name: string
  shortName: string
  ticker: string
  type: string
  workingScheduleId: number
}
