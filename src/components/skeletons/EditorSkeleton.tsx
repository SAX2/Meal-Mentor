import { Skeleton } from '../ui/skeleton'

const EditorSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-3">
      <Skeleton className="h-7 w-[250px] rounded-sm" />
      <div className='w-full flex flex-col gap-2'>
        <Skeleton className="h-4 w-[400px] rounded-sm" />
        <Skeleton className="h-4 w-[325px] rounded-sm" />
      </div>
    </div>
  );
}

export default EditorSkeleton