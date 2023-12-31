// image

import { Images } from "./types";

export interface Image {
    width: number;
    height: number;
    url: string;
}

// categories

export interface FetchedCategory {
    id: number;
    snippet: {
        title: string;
    };
}

export interface Category {
    id: number;
    name: string;
}

// video card

export interface VideoCard {
    id: string;
    title: string;
    publishedAt: string;
    channel: {
        id: string;
        title: string;
        thumbnail?: string;
    };
    duration: string;
    thumbnail: string;
    views: number;
}

// channel details

export interface ChannelDetails {
    id: string;
    bannerURL?: string;
    profileURL: string;
    name: string;
    subscribers: number;
    numOfVideos: number;
    desc: string;
}

export interface FetchedChannelDetails {
    id: string;
    snippet: {
        thumbnails: Images;
        title: string;
        description: string;
    };
    statistics: {
        subscriberCount: number;
        videoCount: number;
    };
    brandingSettings: {
        image: {
            bannerExternalUrl: string;
        };
    };
}

// search result

export interface FetchedSearchResult {
    id: {
        videoId: string;
    };
    snippet: {
        title: string;
        description: string;
        publishedAt: string;
        channelId: string;
        channelTitle: string;
        thumbnails: Images;
    };
}

export interface SearchResult {
    id: string;
    title: string;
    publishedAt: string;
    channel: {
        id: string;
        title: string;
        thumbnail?: string;
    };
    duration: string;
    thumbnail: string;
    views: number;
    desc: string;
}

// video details

export interface FetchedVideoDetails {
    id: string;
    player: {
        embedHtml: string;
    };
    snippet: {
        categoryId: string;
        title: string;
        description: string;
        channelId: string;
        channelTitle: string;
        publishedAt: string;
        thumbnails: Images;
    };
    statistics: {
        likeCount: number;
        viewCount: number;
        commentCount: number;
    };
    contentDetails: {
        duration: string;
    };
}

export interface AuthorChannelDetails {
    id: string;
    name: string;
    profileURL: string;
    totalSubscribers: number;
}

export interface VideoDetails {
    id: string;
    title: string;
    desc: string;
    categoryId: number;
    authorChannelDetails: AuthorChannelDetails;
    publishedAt: string;
    likeCount: number;
    viewCount: number;
    commentCount: number;
}

// video recommendation

export interface VideoRecommendation {
    id: string;
    title: string;
    publishedAt: string;
    channel: {
        id: string;
        title: string;
    };
    duration: string;
    thumbnail: string;
    views: number;
}

// comment and replies

export interface FetchedComment {
    id: string;
    snippet: {
        topLevelComment: {
            snippet: {
                authorChannelId: {
                    value: string;
                };
                authorDisplayName: string;
                authorProfileImageUrl: string;
                textDisplay: string;
                publishedAt: string;
                updatedAt: string;
                likeCount: number;
            };
        };
        totalReplyCount: number;
    };
}

export interface FetchedCommentReply {
    id: string;
    snippet: {
        authorChannelId: {
            value: string;
        };
        authorDisplayName: string;
        authorProfileImageUrl: string;
        textDisplay: string;
        publishedAt: string;
        updatedAt: string;
        likeCount: number;
    };
}

export interface CommentOrCommentReplyAuthor {
    id: string;
    name: string;
    profileURL: string;
}

export interface CommentOrCommentReplyCommon {
    id: string;
    author: CommentOrCommentReplyAuthor;
    content: string;
    numOfLikes: number;
    publishedAt: string;
    updatedAt: string;
}

export type CommentOrCommentReply = CommentOrCommentReplyCommon &
    (
        | {
              numOfReplies: number;
              reply: false;
          }
        | {
              reply: true;
          }
    );
