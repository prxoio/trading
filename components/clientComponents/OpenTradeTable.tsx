"use client"

import { useEffect, useState } from "react"
import { ITrading212 } from "@/interfaces/ITrading212"
import { response } from "express"
import { IInstrumentSchema } from "interfaces/IMetadata"
import { set } from "mongoose"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import FetchTickerMetadata from "./GetMetadata"
import RefreshDataButton from "./RefreshDataButton"
import ConvertCurrency from "./Currency"

export default function IndexPage() {
  const [data, setData] = useState([] as ITrading212[])
  const [metadata, setMetadata] = useState([] as IInstrumentSchema[])

  useEffect(() => {
    fetch("/api/getTradeData")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error))
  }, [])

  useEffect(() => {
    fetch("/api/getTickerMetadata")
      .then((response) => response.json())
      .then((data) => setMetadata(data))
      .catch((error) => console.error("Error fetching data:", error))
  }, [])

  const refreshData = () => {
    fetch("/api/getTradeData")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error))
  }

  const getTickerMetadata = (ticker: string) => {
    const metadatanew = metadata.find((item) => item.ticker === ticker)
    return metadatanew?.shortName
  }

  return (
    <section className="container grid items-center justify-center gap-6 pb-8 pt-6 md:py-10">
      <div className="jus flex min-w-[700px] max-w-[980px] flex-col items-center gap-2">
        <div className="flex w-full justify-end">
          <RefreshDataButton response={refreshData} />
        </div>{" "}
        <Table>
          <TableCaption>A list of your recent data.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">TICKER</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.ticker}>
                <TableCell className="font-medium">
                  {getTickerMetadata(item.ticker) || item.ticker}
                  {/*                   <FetchTickerMetadata
                    ticker={item.ticker}
                    dataId={"shortName"}
                  /> */}
                </TableCell>
                <TableCell>{item.quantity.toFixed(4)}</TableCell>
                <TableCell>{(item.currentPrice / 100).toFixed(2)}
                <ConvertCurrency ticker={item.ticker} documents={data} metadata={metadata} />
                </TableCell>
                <TableCell className="text-right">
                  {(item.quantity * (item.currentPrice / 100)).toFixed(4)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </section>
  )
}
