import React, { use, useEffect, useState } from "react"
import { ITrading212 } from "@/interfaces/ITrading212"
import { IInstrumentSchema } from "interfaces/IMetadata"

interface FetchTickerProps {
  ticker: string
  documents: ITrading212[]
  metadata: IInstrumentSchema[]
  baseCurrency: string
  currencyData: any
  formatOnly?: boolean
  total?: boolean
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

const ConvertCurrency: React.FC<FetchTickerProps> = ({
  ticker,
  documents,
  metadata,
  baseCurrency,
  currencyData,
  formatOnly,
  total,
}) => {
  const [adjustedPrice, setAdjustedPrice] = useState(0)
  //search metadata docunents for ticker
  const metadatanew = metadata.find((item) => item.ticker === ticker)
  const currencyCode = metadatanew?.currencyCode

  //search documents for ticker
  const tickerData = documents.find((item) => item.ticker === ticker)
  const currentPrice = tickerData?.currentPrice
  const quantity = tickerData?.quantity

  useEffect(() => {
    if (formatOnly) {
      return
    } else {
      if (currencyCode === "GBX") {
        setAdjustedPrice((currentPrice ?? 0) / 100)
      } else {
        const currencyMultiple = currencyCode
          ? currencyData.data[currencyCode]
          : undefined
        setAdjustedPrice((currentPrice ?? 0) / currencyMultiple)
      }
    }
  }, [currencyData, currencyCode, currentPrice, quantity, formatOnly])

  const formattedPrice = adjustedPrice.toLocaleString("en-GB", {
    style: "currency",
    currency: baseCurrency,
  })

  if (formatOnly) {
    return (
      <>
        {currencyCode} {currentPrice}
      </>
    )
  } else if (total) {
    const tickerData = documents.find((item) => item.ticker === ticker)
    const totalAssetOwned = (tickerData?.quantity ?? 0) * adjustedPrice
    const formattedTotal = totalAssetOwned.toLocaleString("en-GB", {
      style: "currency",
      currency: baseCurrency,
    })
    return <>{formattedTotal}</>
  } else {
    return <>{formattedPrice}</>
  }
}

export default ConvertCurrency
