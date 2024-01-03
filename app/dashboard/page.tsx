import OpenTradeTable from "@/components/clientComponents/OpenTradeTable"

export default async function IndexPage() {

  return (
    <section className="container grid items-center justify-center gap-6 pb-8 pt-6 md:py-10">
      <div className="jus flex min-w-[700px] max-w-[980px] flex-col items-center gap-2">
<OpenTradeTable />
      </div>
    </section>
  )
}
