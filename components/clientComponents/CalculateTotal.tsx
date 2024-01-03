import React, { use, useEffect, useState } from "react"
import { ITrading212 } from "@/interfaces/ITrading212"
import { IInstrumentSchema } from "interfaces/IMetadata"
import { CheckIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "../ui/alert"

interface FetchTickerProps {
  documents: ITrading212[]
  metadata: IInstrumentSchema[]
  baseCurrency: string
  currencyData: any
  plain?: boolean
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

const CalculateTotal: React.FC<FetchTickerProps> = ({
  documents,
  metadata,
  baseCurrency,
  currencyData,
  plain,
}) => {
  const [totalValue, setTotalValue] = useState(0)

  useEffect(() => {
    let total = 0
    documents.forEach((doc) => {
      const meta = metadata.find((m) => m.ticker === doc.ticker)
      if (meta) {
        let adjustedPrice = doc.currentPrice
        if (meta?.currencyCode === "GBX") {
          adjustedPrice = adjustedPrice / 100 // Convert GBX to GBP
        } else if (meta.currencyCode !== baseCurrency) {
          const conversionRate = currencyData.data[meta.currencyCode]
          adjustedPrice = adjustedPrice / conversionRate
        }
        total += adjustedPrice * doc.quantity
      }
    })

    setTotalValue(total)
  }, [documents, metadata, baseCurrency, currencyData])

  const formattedTotalValue = totalValue.toLocaleString("en-GB", {
    style: "currency",
    currency: baseCurrency,
  })

  if (plain) {
    return <>{formattedTotalValue}</>
  } else {
    return (
      <div className={`ml-3 h-12 w-40 rounded-lg border px-4 py-2.5`}>
        <p className="font-mono font-extrabold" style={{ alignSelf: "center" }}>
          {" "}
          {formattedTotalValue}{" "}
        </p>
      </div>
    )
  }
}

export default CalculateTotal
