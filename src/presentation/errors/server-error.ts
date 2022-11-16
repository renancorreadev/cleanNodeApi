/* ServerError is a class that extends Error and has a constructor that calls
super() with the string "Internal Server Error" and sets the name property to
"ServerError". */
export class ServerError extends Error {
  constructor() {
    super("Internal Server Error");
    this.name = "ServerError";
  }
}
