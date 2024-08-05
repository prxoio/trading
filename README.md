# Trading Portfolio Full-Stack Application

This project involves developing a full-stack application to display current stock positions in a Trading212 portfolio. The application uses TypeScript, Next.js, the shadcn/ui library, and MongoDB Atlas, and is hosted on Vercel. It showcases skills in API integration, database management, frontend development, real-time data refresh, and currency conversion.

## Project Setup

### Step 1: Initializing a Next.js Project with shadcn/ui Template
```sh
npx create-next-app -e https://github.com/shadcn/next-template trading-portfolio
cd trading-portfolio
```

### Step 2: Installing Vercel CLI
```sh
npm i -g vercel
```

### Step 3: Setting Up MongoDB Atlas
1. Log in to your MongoDB Atlas account and set up a new cluster.
2. Copy the connection string for later use.

### Step 4: Installing Mongoose
```sh
npm install mongoose
```

### Step 5: Configuring Environment Variables
Create a `.env.local` file in the root of your Next.js project and add:
```
MONGO_DB_URI=mongodb_connection_string
TRADING212_API_KEY=trading212_api_key
```

### Step 6: Running the Development Server
```sh
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser to check if the app is running as expected.

## Backend Development

### API Endpoint: `getNewData`

This endpoint fetches the current positions in your portfolio from the Trading212 API and stores them in a MongoDB database.

#### `getNewData.ts`
```typescript
import { ITrading212, Trading212 } from "interfaces/ITrading212"
import mongoose from "mongoose"

export async function fetchAndStoreOpenPositions() {
  await mongoose.connect(process.env.MONGO_DB_URL)

  const response = await fetch(
    "https://live.trading212.com/api/v0/equity/portfolio",
    {
      method: "GET",
      headers: {
        Authorization: process.env.T212_API_KEY,
      },
    }
  )
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`)
  }

  const data: ITrading212 = await response.json()

  for (const position of data) {
    const newPosition = new Trading212({
      ticker: position.ticker,
      quantity: position.quantity,
      averagePrice: position.averagePrice,
      currentPrice: position.currentPrice,
      ppl: position.ppl,
      fxPpl: position.fxPpl,
      initialFillDate: position.initialFillDate,
      frontend: position.frontend,
      maxBuy: position.maxBuy,
      maxSell: position.maxSell,
      pieQuantity: position.pieQuantity,
    })

    await Trading212.findOneAndUpdate({ _id: position.ticker }, newPosition, { upsert: true })
  }

  console.log("New data stored successfully in MongoDB Atlas")
  return response.status
}
```

#### `route.ts`
```typescript
import { NextResponse } from "next/server"
import { fetchAndStoreOpenPositions } from "./getNewData"

export async function GET(req: any) {
  try {
    const data = await fetchAndStoreOpenPositions()
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get data from MongoDB" },
      { status: 500 }
    )
  }
}
```

## Frontend Development

### Overview of the Frontend Architecture

The frontend is designed to display stock position data fetched from backend API endpoints.

#### `page.tsx`
```typescript
import OpenTradeTable from "@/components/clientComponents/OpenTradeTable"

export default async function IndexPage() {
  return (
    <section className="container grid items-center justify-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex min-w-[700px] max-w-[980px] flex-col items-center gap-2">
        <OpenTradeTable />
      </div>
    </section>
  )
}
```

### Fetching Data with `useEffect`
```typescript
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
```


This project highlights the integration of various technologies to create a dynamic, data-driven web application.

## Technologies Used
- **Trading212 API**: Real-time data fetching of stock positions.
- **MongoDB Atlas**: Data storage and efficient retrieval.
- **Next.js**: API endpoints and client-server communication.
- **React**: Building interactive UI components.
- **TypeScript**: Ensuring type safety and enhanced code quality.
- **Vercel**: Hosting and seamless deployment.

This README provides an overview of the project's setup, development, and technologies used, along with the skills learned throughout the process.
