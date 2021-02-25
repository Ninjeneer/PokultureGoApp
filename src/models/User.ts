export default class User {
  private pseudo: string;
  private password: string;
  private avatar?: string;
  private token: string;

  constructor(pseudo: string, password: string, token: string, avatar?: string) {
    this.pseudo = pseudo;
    this.password = password;
    this.avatar = avatar;
    this.token = token
  }

  public setPseudo(pseudo: string) {
    this.pseudo = pseudo
  }
  public getPseudo(): string {
    return this.pseudo
  }

  public setPassword(pseudo: string) {
    this.pseudo = pseudo
  }
  public getPassword(): string {
    return this.pseudo
  }
  public setToken(token: string) {
    this.token = token
  }
  public getToken(): string {
    return this.token
  }
}