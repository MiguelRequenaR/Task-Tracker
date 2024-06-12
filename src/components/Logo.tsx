import { CpuChipIcon } from "@heroicons/react/20/solid"

export default function Logo() {
  return (
    <>
      <div className="flex items-center gap-5">  
        <CpuChipIcon className="h-10 w-10 text-secondary" />
        <h1 className="text-tertiary text-2xl font-bold">Task Tracker</h1>
      </div>
        {/* <img src="/logo.svg" alt="logo" /> */}
    </>
  )
}
