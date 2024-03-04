"use client"

import { useEffect, useState } from "react"
import { ITrading212 } from "@/interfaces/ITrading212"
import { IInstrumentSchema } from "interfaces/IMetadata"

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

import CalculateTotal from "./CalculateTotal"
import Chart from "./Chart"
import ConvertCurrency from "./Currency"
import RefreshDataButton from "./RefreshDataButton"

export default function IndexPage() {
  const [data, setData] = useState([] as ITrading212[])
  const [metadata, setMetadata] = useState([] as IInstrumentSchema[])
  const [currencyData, setCurrencyData] = useState([] as any)
  const [baseCurrency, setBaseCurrency] = useState("GBP")
  const [chartList, setChartList] = useState([] as any)

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
  const getTickerName = (ticker: string) => {
    const metadatanew = metadata.find((item) => item.ticker === ticker)
    //maximum 24 characters
    const name = metadatanew?.name || ticker
    if (name.length > 24) {
      return name.substring(0, 22) + "..."
    } else return name
  }

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        apikey: "fca_live_m2boGNbKZaOdEtD6ZneuH0ovkUdSayCVOIh0g1bn",
      },
    }

    fetch(
      `https://api.freecurrencyapi.com/v1/latest?currencies=GBP%2CEUR%2CUSD%2CCAD%2CAUD&base_currency=${baseCurrency}`,
      options
    )
      .then((response) => response.json())
      .then((data) => setCurrencyData(data))
      .catch((error) => console.error("Error fetching data:", error))
  }, [baseCurrency])

  useEffect(() => {
    const chartdata = metadata.map((item) => [
      item.name,
      `${item.shortName}|1M`,
    ])
    const stringify = JSON.stringify(chartdata)
    console.log(stringify)
    setChartList(chartdata)
  }, [metadata])

  return (
    <section className="container grid items-center justify-center gap-4 pb-4 pt-6 md:py-4">
      <div className="jus flex min-w-[460px] max-w-[1020px] flex-col items-center gap-2">
{/*         <div className="mb-6 mt-0 flex w-full justify-end pt-0">
          <Chart data={chartList} />
        </div> */}
        <div className="flex w-full justify-end">
          <RefreshDataButton response={refreshData} />
          <CalculateTotal
            documents={data}
            metadata={metadata}
            baseCurrency={baseCurrency}
            currencyData={currencyData}
          />
        </div>{" "}
        <Table>
          <TableCaption>A list of your recent data.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Ticker</TableHead>
              <TableHead className="w-[205px]">Name</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead>Quote Price</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.ticker}>
                <TableCell className="font-medium">
                  {getTickerMetadata(item.ticker) || item.ticker}
                </TableCell>
                <TableCell className="font-medium">
                  {getTickerName(item.ticker) || item.ticker}
                </TableCell>
                <TableCell>{item.quantity.toFixed(4)}</TableCell>
                <TableCell className="text-right">
                  <p style={{ alignSelf: "center" }}>
                    <ConvertCurrency
                      ticker={item.ticker}
                      documents={data}
                      metadata={metadata}
                      baseCurrency={baseCurrency}
                      currencyData={currencyData}
                    />
                  </p>
                </TableCell>
                <TableCell>
                  <p
                    className="text-xs font-light"
                    style={{ alignSelf: "center" }}
                  >
                    [
                    <ConvertCurrency
                      ticker={item.ticker}
                      documents={data}
                      metadata={metadata}
                      baseCurrency={baseCurrency}
                      currencyData={currencyData}
                      formatOnly={true}
                    />
                    ]
                  </p>
                </TableCell>

                <TableCell className="text-right">
                  <ConvertCurrency
                    ticker={item.ticker}
                    documents={data}
                    metadata={metadata}
                    baseCurrency={baseCurrency}
                    currencyData={currencyData}
                    total={true}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>Total</TableCell>
              <TableCell className="text-right font-bold">
                <CalculateTotal
                  documents={data}
                  metadata={metadata}
                  baseCurrency={baseCurrency}
                  currencyData={currencyData}
                  plain={true}
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </section>
  )
}
