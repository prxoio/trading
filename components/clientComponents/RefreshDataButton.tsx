"use client"

import { use, useEffect, useState } from "react"
import { CheckIcon, InfoCircledIcon, ReloadIcon } from "@radix-ui/react-icons"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

interface RefreshDataButtonProps {
  response: () => void
}

const RefreshDataButton: React.FC<RefreshDataButtonProps> = ({ response }) => {
  const [status, setStatus] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const refreshData = async () => {
    setIsLoading(true)
    const responseStatus = await fetch("/api/getNewTrades")
    const data = responseStatus.status
    console.log("API Success", data)
    setStatus(data)
    response()
    setIsLoading(false)
    if (data === 200) {
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
      }, 5000)
    }
  }



  return (
    <>
      <Alert
        className={`mb-3 mr-3 flex h-12 ${isLoading ? "hidden" : ""} ${
          success ? "hidden" : ""
        }`}
      >
        <InfoCircledIcon className="h-4 w-4" />
        <AlertDescription>
          <p>
            Refresh Data. Click the button to refresh your data from the API.
          </p>
        </AlertDescription>
      </Alert>

      <Alert
        className={`mb-3 mr-3 flex h-12 ${isLoading ? "" : "hidden"} ${
          success ? "hidden" : ""
        }`}
      >
        <ReloadIcon className={`h-4 w-4 animate-spin`} />
        <AlertDescription>
          <p>Loading... </p>
        </AlertDescription>
      </Alert>

      <Alert className={`mb-3 mr-3 flex h-12 ${success ? "" : "hidden"}`}>
        <CheckIcon className={`h-4 w-4`} />

        <AlertDescription>
          <p> API Sync Successful. Please wait 5s before refreshing again.</p>
        </AlertDescription>
      </Alert>

      <Button
        className="h-12 w-16"
        variant="outline"
        size="icon"
        onClick={refreshData}
      >
        <ReloadIcon
          className={`h-4 w-4 ${isLoading ? "animate-spin" : ""} ${
            success ? "hidden" : ""
          }`}
        />
        <CheckIcon className={`h-4 w-4 ${success ? "" : "hidden"}`} />
      </Button>
    </>
  )
}

export default RefreshDataButton
