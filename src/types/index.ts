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
export type HeaderProps = {
    title: string;
    icon?: string;
}
export type CustomButtonTypes = {
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    height?: string | '' | undefined;
    width?: string | '' | undefined;
    text?: boolean | undefined;
    icon?: boolean | undefined;
}

