declare namespace Express {
  export interface Request {
    token?: import('firebase-admin').auth.DecodedIdToken
  }
}
