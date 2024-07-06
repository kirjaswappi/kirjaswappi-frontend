import { jwtDecode } from 'jwt-decode';

interface IBranch {
  id: number;
  name: string;
}

export interface IToken {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
  full_name: string;
  role: string;
  role_key: string;
  email: string;
  contact_number: string;
  branch: IBranch;
  country: string;
  country_code: string;
  short_name: string;
  currency_code: string;
  firebase_token: string;
}



export const getUserData = (token: string | null) => {
  if (token) {
    const userData: IToken = jwtDecode(token)
    return userData
  } else {
    return null
  }
}
