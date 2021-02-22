export default class User {
    pseudo: string;
    password: string;
    avatar: string;
 
    constructor(pseudo:string,password:string,avatar:string) {
      this.pseudo=pseudo; 
      this.password=password; 
      this.avatar=avatar; 
    }       
  } 