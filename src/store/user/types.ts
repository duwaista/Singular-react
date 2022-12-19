export type AuthPayloadType = {
  email: string;
  password: string;
};

export type User = {
  email: string | null;
  uid: string;
  photoURL: string | null;
};
