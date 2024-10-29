export class UserCreate {
  userName: string
  password: string
}

export class UserUpdate {
  password: string
}

export class UserResponse {
  id: string
  userName: string
}

