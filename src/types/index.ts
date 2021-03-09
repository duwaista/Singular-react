import React from "react";

export interface FeedTypes {
    _id: string,
    id: string,
    avatarUrl: string | '',
    email: string | '',
    uid: string | '';
    posts: string | '';
    createdAt: Date | '';
}
export type FeedProps = {
    index: number;
    feed: FeedTypes;
}
export type BasicElementProps = {
    text: string;
    icon: string;
    onClick: React.MouseEventHandler<HTMLDivElement>;
}
export type HeaderTitle = {
    title: string;
}

