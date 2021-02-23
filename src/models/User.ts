export default class User {
  private pseudo: string;
  private password: string;
  private avatar?: string;

  constructor(pseudo: string, password: string, avatar?: string) {
    this.pseudo = pseudo;
    this.password = password;
    this.avatar = avatar;
  }
}