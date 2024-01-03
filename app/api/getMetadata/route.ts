import { NextResponse } from "next/server"

import { getMetadata } from "./getInstruments"

// MongoDB connection URL
export async function GET(req: any) {
  try {
    const data = await getMetadata()

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
