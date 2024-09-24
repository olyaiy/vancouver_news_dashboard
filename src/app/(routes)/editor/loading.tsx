import { Skeleton } from "@/components/ui/skeleton"

function Loading() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Skeleton className="w-full h-64 rounded-lg" />

      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />

      <Skeleton className="w-full h-40" />
      <Skeleton className="w-full h-24" />

      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />

      <div className="flex items-center space-x-2">
        <Skeleton className="w-10 h-6 rounded-full" />
        <Skeleton className="w-20 h-6" />
      </div>

      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-20" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />

      <div className="flex items-center space-x-2">
        <Skeleton className="w-10 h-6 rounded-full" />
        <Skeleton className="w-20 h-6" />
      </div>

      <Skeleton className="w-full h-24" />

      <Skeleton className="w-32 h-10" />
    </div>
  )
}

export default Loading