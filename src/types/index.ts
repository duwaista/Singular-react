import React, { CSSProperties } from "react";

// One file :)

export interface FeedTypes {
  id: string;
  _id?: string;
  avatarUrl?: string | "";
  email: string | "";
  uid: string | "";
  posts: string | "";
  type: "image" | "video" | "";
  createdAt: Date | "";
}
export type FeedProps = {
  index: number;
  feed: FeedTypes;
  style?: CSSProperties;
};
export type BasicElementProps = {
  text: string;
  icon: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
};
export type HeaderProps = {
  title: string;
  icon?: boolean;
};
export type FLogin = {
  email: string;
  password: string;
};
export interface IBoolShitState {
  dark: boolean;
  drawer: boolean;
  isMobile: boolean;
  inDialog: boolean;
  upDialog: boolean;
  bottomMenu: boolean;
  uploadMenu: boolean;
  loading: boolean;
  fullScreenDialog: boolean;
}
export interface IUserState {
  logged: boolean;
  profile: {
    email: string;
    password: string;
    photoURL?: string;
    uid: string;
  };
}
export interface IFeedState {
  posts: FeedTypes[];
  loading: boolean;
  currentPost: CurrentPostType;
  upload: IUpload;
  picture: string;
  uploadProgress: {
    progress: number;
    uploading: boolean;
    done: boolean;
  };
}
export interface CurrentPostType {
  index: number;
  feed: FeedTypes;
}
export interface ICurrentPost {
  currentPost: CurrentPostType;
}
export interface IPost {
  URL: string;
  type: "image" | "video";
}
export interface IUpload {
  file?: File;
  type: "" | "image" | "video";
}
export interface IdType {
  id: string;
}

export interface IBottomPostMenu {
  children: React.ReactNode;
  showMenu: boolean;
  closeOnOutsideClick?: boolean;
  onClose: () => void;
}

// Omg mapped types is scary
export type MappedRequiredType<T> = {
  [K in keyof T]: T[K];
};

export type MappedOptionalType<T> = {
  [K in keyof T]?: T[K];
};
