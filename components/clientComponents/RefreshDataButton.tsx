"use client"

import { ReloadIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"

//new react component with 1 prop 'response'

interface RefreshDataButtonProps {
  response: () => void;
}

const RefreshDataButton: React.FC<RefreshDataButtonProps> = ({ response }) => {
  const refreshData = async () => {
    const responseStatus = await fetch("/api/getNewTrades")
    const data = responseStatus.status
    console.log("API Success", data)
    response()
  }

  return (
    <Button variant="outline" size="icon" onClick={refreshData}>
      <ReloadIcon className="h-4 w-4" />
    </Button>
  )
}

export default RefreshDataButton
