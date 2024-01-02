"use client"

import { useEffect, useState } from "react"

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

import RefreshDataButton from "./RefreshDataButton"

export default function IndexPage() {
  const [data, setData] = useState<any[]>([]) // Provide a type for the data state variable
  const [response, setResponse] = useState(0)

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/api/getTradeData")
      const data = await response.json()
      setData(data)
    }
    getData()
  }, [])

  const RefreshData = async () => {
    const response = await fetch("/api/getTradeData")
    const data = await response.json()
    setData(data)
  }

  return (
    <section className="container grid items-center justify-center gap-6 pb-8 pt-6 md:py-10">
      <div className="jus flex min-w-[700px] max-w-[980px] flex-col items-center gap-2">
        <div className="flex w-full justify-end">
          <RefreshDataButton response={RefreshData} />
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
                <TableCell className="font-medium">{item.ticker}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.currentPrice / 100}</TableCell>
                <TableCell className="text-right">
                  {item.quantity * (item.currentPrice / 100)}
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
