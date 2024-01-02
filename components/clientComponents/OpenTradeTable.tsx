import { useEffect } from "react"
import Link from "next/link"
import { ReloadIcon } from "@radix-ui/react-icons"

import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
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


//dynamic import 
import dynamic from 'next/dynamic'
import RefreshDataButton from "@/components/clientComponents/RefreshDataButton"
import { getAllTrading212Data } from "./database/getStoredPositions"


export default async function IndexPage() {
  const invoices = await getAllTrading212Data()

  return (
    <section className="container grid items-center justify-center gap-6 pb-8 pt-6 md:py-10">
      <div className="jus flex min-w-[700px] max-w-[980px] flex-col items-center gap-2">
        <RefreshDataButton />

        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">TICKER</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.ticker}>
                <TableCell className="font-medium">{invoice.ticker}</TableCell>
                <TableCell>{invoice.quantity}</TableCell>
                <TableCell>{invoice.currentPrice / 100}</TableCell>
                <TableCell className="text-right">
                  {invoice.quantity * (invoice.currentPrice / 100)}
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
