
export default function BookSkeleton() {
    return (
        <div className="max-w-[168px] max-h-[264px] flex flex-col gap-2">
            <div className="w-full h-[190px] rounded-md  bg-platinum animate-pulse"></div>
            <div className="w-full h-[10px] rounded-md bg-platinum animate-pulse"></div>
            <div className="w-1/2 h-[10px] rounded-md bg-platinum animate-pulse"></div>
        </div>
    )
}
