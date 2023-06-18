import { useInfiniteQuery } from "@tanstack/react-query";
import SearchResultCard from "./SearchResultCard/SearchResultCard";
import SearchResultCardSkeleton from "./SearchResultCardSkeleton/SearchResultCardSkeleton";
import getSearchResults from "../../../DataFetchers/Search/getResults";
import { useSearchParams } from "react-router-dom";
import {
    FetchedChannelDetails,
    SearchResultFetchedVideoDetails,
    FetchedSearchResult,
    SearchResult,
} from "../../../config/interfaces";
import getChannelsDetailsByIds from "../../../DataFetchers/Channels/getByIds";
import getVideoDetailsByIds from "../../../DataFetchers/Videos/getByIds";
import InfiniteScroll from "react-infinite-scroller";
import React from "react";

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("q");
    const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
        useInfiniteQuery({
            queryKey: ["search", searchQuery],
            queryFn: async ({ pageParam }) => {
                if (searchQuery) {
                    const getSearchResultsResponse = await getSearchResults({
                        searchQuery,
                        nextPageToken: pageParam,
                    });
                    const searchResults = getSearchResultsResponse.data.items;
                    const channelIds: string[] = [];
                    const videoIds: string[] = [];
                    let searchResultsData: SearchResult[] = searchResults.map(
                        (searchResult: FetchedSearchResult) => {
                            channelIds.push(searchResult.snippet.channelId);
                            videoIds.push(searchResult.id.videoId);

                            const thumbnails = searchResult.snippet.thumbnails;
                            let maxResolutionImageURL = null,
                                maxResolution = 0;
                            for (const resolutionKey in thumbnails) {
                                const image = thumbnails[resolutionKey];
                                const resolution = image.width * image.height;

                                if (resolution > maxResolution) {
                                    maxResolution = resolution;
                                    maxResolutionImageURL = image.url;
                                }
                            }
                            return {
                                id: searchResult.id.videoId,
                                title: searchResult.snippet.title,
                                desc: searchResult.snippet.description,
                                publishedAt: searchResult.snippet.publishedAt,
                                channel: {
                                    id: searchResult.snippet.channelId,
                                    title: searchResult.snippet.channelTitle,
                                    thumbnail: "",
                                },
                                duration: "",
                                thumbnail: maxResolutionImageURL,
                                views: 0,
                            };
                        }
                    );
                    const getChannelDetailsByIdsResponse =
                        await getChannelsDetailsByIds({
                            channelIds,
                            part: ["snippet"],
                        });
                    const channelDetails: FetchedChannelDetails[] =
                        getChannelDetailsByIdsResponse.data.items;
                    const getVideoDetailsByIdsResponse =
                        await getVideoDetailsByIds({
                            videoIds,
                            part: ["statistics", "contentDetails"],
                        });
                    const videoDetails: SearchResultFetchedVideoDetails[] =
                        getVideoDetailsByIdsResponse.data.items;
                    searchResultsData = searchResultsData.map(
                        (searchResultItem) => {
                            const channel = channelDetails.find(
                                (channel) =>
                                    channel.id === searchResultItem.channel.id
                            );
                            const video = videoDetails.find(
                                (video) => video.id === searchResultItem.id
                            );
                            return {
                                ...searchResultItem,
                                channel: {
                                    ...searchResultItem.channel,
                                    thumbnail:
                                        channel &&
                                        channel.snippet.thumbnails.default.url,
                                },
                                duration: video
                                    ? video.contentDetails.duration
                                    : "",
                                views: video
                                    ? Number(video.statistics.viewCount)
                                    : 0,
                            };
                        }
                    );
                    return {
                        searchResults: searchResultsData,
                        nextPageToken:
                            getSearchResultsResponse.data.nextPageToken,
                    };
                }
            },
            refetchOnWindowFocus: false,
            getNextPageParam: (lastPage) => lastPage?.nextPageToken,
        });
    return (
        <InfiniteScroll
            className="max-w-[100rem] m-auto py-[1.6rem] flex flex-col gap-[1.6rem]"
            loadMore={() => fetchNextPage()}
            hasMore={hasNextPage}
            threshold={10}
        >
            {data?.pages.map((searchResultsPage, index) => (
                <React.Fragment key={index}>
                    {searchResultsPage?.searchResults.map(
                        (searchResultItem, index) => (
                            <SearchResultCard
                                key={index}
                                {...searchResultItem}
                            />
                        )
                    )}
                </React.Fragment>
            ))}
            {(isFetching || isFetchingNextPage) &&
                new Array(12)
                    .fill(0)
                    .map((_, index) => (
                        <SearchResultCardSkeleton key={index} />
                    ))}
        </InfiniteScroll>
    );
};

export default SearchResults;
