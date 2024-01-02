import { NextResponse } from "next/server"

import { getAllTrading212Data } from "./getDatabase"

// MongoDB connection URL
export async function GET(req: any) {
  try {
    const data = await getAllTrading212Data()

    return NextResponse.json(data, {
      status: 200,
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get data from MongoDB" },
      {
        status: 500,
      }
    )
  }
}
