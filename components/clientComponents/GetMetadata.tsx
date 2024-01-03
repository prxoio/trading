import React, { useEffect, useState } from "react"
import { IInstrumentSchema } from "interfaces/IMetadata"

interface FetchTickerProps {
  ticker: string
  dataId: string
}

interface TickerData {
  _id: string // Assuming ObjectId is represented as a string in your application
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
  __v: number
  [key: string]: any
}

const FetchTickerMetadata: React.FC<FetchTickerProps> = ({
  ticker,
  dataId,
}) => {
  const [result, setResult] = useState<TickerData[]>([])

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }

    fetch(`/api/getTickerSearchResult?ticker=${ticker}`, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }
        return response.json()
      })
      .then((response) => {
        //console.log(response)
        setResult(response)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [ticker])

  useEffect(() => {
    console.log("restult", result)
  }, [result])

  return <p>{result[0] ? result[0][dataId] : "Loading..."}</p>
}

export default FetchTickerMetadata
