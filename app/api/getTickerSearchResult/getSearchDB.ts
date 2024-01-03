import assert from "assert"

const MongoClient = require("mongodb").MongoClient

export async function getSearchResults(ticker: string) {
  const client = await MongoClient.connect(process.env.MONGO_DB_URL)

  const agg = [
    {
        $search: {
            index: 'default', // Replace with the name of your Atlas Search index if different
            text: {
                query: ticker,
                path: 'ticker' // The field you want to search
            }
        }
    }
  ]

  assert.equal(null, client.connectErr)
  const coll = client.db("InstrumentMetadata").collection("instrumentmetadatas")
  let cursor = await coll.aggregate(agg)
  const results: any[] = []
  await cursor.forEach((doc: any) => results.push(doc))
  client.close()
  return results
}
