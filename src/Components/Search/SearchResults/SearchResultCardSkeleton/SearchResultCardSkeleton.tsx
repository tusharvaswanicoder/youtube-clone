import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SearchResultCardSkeleton = () => {
    return (
        <div className="flex gap-[1.6rem] flex-col xs:flex-row">
            <div className="min-w-[24rem] xs:max-w-xl w-full aspect-video flex-shrink-0">
                <Skeleton
                    baseColor="#202020"
                    highlightColor="#444"
                    className="w-full h-full"
                    borderRadius="1.2rem"
                    duration={1.2}
                />
            </div>
            <div className="flex flex-1 flex-col gap-[1.2rem] text-primary-light-800">
                <div>
                    <Skeleton
                        baseColor="#202020"
                        highlightColor="#444"
                        className="h-6"
                    />
                    <Skeleton
                        baseColor="#202020"
                        highlightColor="#444"
                        className="h-6"
                    />
                </div>
                <div className="flex items-center gap-[0.8rem]">
                    <Skeleton
                        baseColor="#202020"
                        highlightColor="#444"
                        className="w-[2.4rem] h-[2.4rem] shrink-0"
                        circle
                        containerClassName="w-[2.4rem] shrink-0"
                    />
                    <Skeleton
                        baseColor="#202020"
                        highlightColor="#444"
                        className="h-6"
                        containerClassName="w-40"
                    />
                </div>
                <Skeleton
                    baseColor="#202020"
                    highlightColor="#444"
                    className="h-6"
                />
            </div>
        </div>
    );
};

export default SearchResultCardSkeleton;
