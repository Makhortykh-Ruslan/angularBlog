export interface User {
  email: string;
  password: string;
  returnSecureToken: boolean;
}
export interface FbResponse{
  name?: any;
  idToken?: string | any;
  expiresIn?: string | any;
}
export interface Post {
  id: string;
  title: string;
  text: string;
  author: string;
  date: string;
}
