import React, { useEffect, useState } from "react"
import { ITrading212 } from "@/interfaces/ITrading212"
import { IInstrumentSchema } from "interfaces/IMetadata"

interface FetchTickerProps {
  ticker: string
  documents: ITrading212[]
  metadata: IInstrumentSchema[]
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
}) => {

  //search metadata docunents for ticker
  const metadatanew = metadata.find((item) => item.ticker === ticker)
  const currencyCode = metadatanew?.currencyCode

  
  return <p>{"Loading..."}</p>
}

export default ConvertCurrency
