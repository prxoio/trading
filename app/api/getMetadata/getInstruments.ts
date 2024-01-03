import { IInstrumentSchema, InstrumentMetadata } from "interfaces/IMetadata"
import mongoose from "mongoose"
import fetch from "node-fetch"

type InstrumentMetadata = any

export async function getMetadata() {
  // Connect to MongoDB Atlas
  // Replace <username>, <password>, <clustername>, and <dbname> with your MongoDB Atlas details
  await mongoose.connect(`${process.env.MONGO_DB_URL}InstrumentMetadata`)
  await InstrumentMetadata.deleteMany({})

  // Fetch open instruments from Trading212 API
  const response = await fetch(
    `https://live.trading212.com/api/v0/equity/metadata/instruments`,
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

  const data: InstrumentMetadata = await response.json()

  // Now, store the data in MongoDB Atlas
  for (const instrument of data) {
    // Create a new document for each instrument
    const newInstrument = new InstrumentMetadata({
      addedOn: instrument.addedOn,
      currencyCode: instrument.currencyCode,
      isin: instrument.isin,
      maxOpenQuantity: instrument.maxOpenQuantity,
      minTradeQuantity: instrument.minTradeQuantity,
      name: instrument.name,
      shortName: instrument.shortName,
      ticker: instrument.ticker,
      type: instrument.type,
      workingScheduleId: instrument.workingScheduleId,
    })

    await newInstrument.save()
  }

  console.log("New data stored successfully in MongoDB Atlas")
  return response.status
}
