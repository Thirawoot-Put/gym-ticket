export class User {
  readonly id: string;
  userName: string;
  password: string;
  _isActive: boolean

  constructor(id: string, userName: string, password: string, isActive = true) {
    this.id = id;
    this.userName = userName;
    this.password = password;
    this._isActive = isActive;
  }
}
