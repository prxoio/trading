import mongoose from "mongoose"

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
const Metadata = mongoose.model("Metadata", instrumentMetadataSchema)
mongoose.connect(`${process.env.MONGO_DB_URL}tradingData`)

export async function processTickers(documents: any) {
  await Metadata.deleteMany({})

  try {
    for (const document of documents) {
      const processData = await getSearch(document.ticker)
      const searchData = processData[0]
      console.log("SearchData", searchData)
      // Create a new document with the retrieved data

      const dataToSave = new Metadata({
        _id: searchData.ticker,
        addedOn: searchData.addedOn,
        currencyCode: searchData.currencyCode,
        isin: searchData.isin,
        maxOpenQuantity: searchData.maxOpenQuantity,
        minTradeQuantity: searchData.minTradeQuantity,
        name: searchData.name,
        shortName: searchData.shortName,
        ticker: searchData.ticker,
        type: searchData.type,
        workingScheduleId: searchData.workingScheduleId,
        __v: searchData.__v,
      })

      await Metadata.findOneAndUpdate({ _id: searchData.ticker }, dataToSave, {
        upsert: true,
      }) // Update the document in MongoDB or insert it if it doesn't exist

      console.log("Processed ticker and saved to MongoDB:", document.ticker)
    }
  } catch (error) {
    console.error("Error processing tickers:", error)
  } finally {
    // Disconnect from MongoDB after processing
console.log("Done processing tickers")

}
}

async function getSearch(ticker: string) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }

  try {
    const response = await fetch(
      `${
        process.env.HOST
      }/api/getTickerSearchResult?ticker=${encodeURIComponent(ticker)}`,
      options
    )

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (err) {
    console.error(err)
    throw err
  }
}
