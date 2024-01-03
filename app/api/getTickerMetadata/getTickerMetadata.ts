import mongoose from "mongoose"
import { IInstrumentSchema } from "@/interfaces/IMetadata"

const instrumentMetadataSchema = new mongoose.Schema(
  {
    _id: String,
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
    __v: Number,
  },
  { strict: false }
)
const Metadata = mongoose.models.Metadata || mongoose.model('Metadata', instrumentMetadataSchema);


export async function getTickerMetadata(): Promise<IInstrumentSchema[]> {

  try {
    // Connect to the database if not already connected
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(`${process.env.MONGO_DB_URL}tradingData`)
    }
    // Retrieve all documents
    const documents: IInstrumentSchema[] = await Metadata.find({})

    console.log("Data retrieved successfully from MongoDB Atlas")

    return documents
  } catch (error) {
    console.error("Error retrieving data from MongoDB Atlas:", error)
    throw error
  }
}