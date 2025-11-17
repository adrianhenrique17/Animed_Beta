export default class User {
  constructor({ id, name, email, password }) {
    this.id = Number(id);
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
