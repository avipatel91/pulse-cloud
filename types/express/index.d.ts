declare namespace Express {
  interface User {
    id: string
    type: string
  }
  interface Request {
    user: User
    member?: import('../../src/entity/Member').Member
    session?: {
      id: number
    }
  }
}
