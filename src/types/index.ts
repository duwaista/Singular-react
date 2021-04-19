import React from "react";

export interface FeedTypes {
    _id: string,
    id?: string,
    avatarUrl?: string | '',
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
    icon?: boolean;
}
export type FLogin = {
    email: string;
    password: string;
}
export type CustomButtonTypes = {
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    height?: string | '' | undefined;
    width?: string | '' | undefined;
    text?: boolean | undefined;
    icon?: boolean | undefined;
}
export interface IBoolShitState {
    dark: boolean,
    drawer: boolean,
    isMobile: boolean,
    inDialog: boolean,
    upDialog: boolean,
    bottomMenu: boolean,
    uploadMenu: boolean,
    loading: boolean
}
export interface IUserState {
    logged: boolean,
    profile: {
        email: string,
        password: string,
        photoURL?: string,
        uid: string,
    }
}
export interface IFeedState {
    all: FeedTypes[]
    bottom?: {}
    upload: {}
}
export interface IPost {
    URL: string,
    type: 'image' | 'video'
}
export interface IUpload {
    file: File,
    type: '' | 'image' | 'video'
}
export interface IMongoUpload {
    
}
