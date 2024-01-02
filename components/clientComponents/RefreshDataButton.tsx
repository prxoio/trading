"use client"

import { ReloadIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { fetchAndStoreOpenPositions } from "@/components/clientComponents/database/getPositions";

const refreshDataButton = () => {
  const refreshData = async () => {
    //await fetchAndStoreOpenPositions("none");
  };

  return (
    <Button variant="outline" size="icon" onClick={refreshData}>
      <ReloadIcon className="h-4 w-4" />
    </Button>
  );
}

export default refreshDataButton;