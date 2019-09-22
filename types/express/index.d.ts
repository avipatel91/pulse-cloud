declare namespace Express {
  export interface Request {
    token?: import('firebase-admin').auth.DecodedIdToken
    member?: import('../../src/entity/Member').Member
  }
}
