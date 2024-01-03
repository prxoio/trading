import { NextRequest, NextResponse } from "next/server"

import { getSearchResults } from "./getSearchDB"

export async function GET(req: NextRequest) {
    const ticker = req.nextUrl.searchParams.get("ticker") ?? ""
    const response = await getSearchResults(ticker)
    //console.log("ticker is:", ticker)
    //console.log("response is:", response)
    return NextResponse.json(response, {
        status: 200,
    })
}   

