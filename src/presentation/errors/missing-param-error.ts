/* It's a class that extends the Error class and has a constructor that receives a
paramName parameter and sets the message property to a string that says "Missing
param: " 
*/
export class MissingParamError extends Error {
  constructor(paramName: string) {
    super(`Missing param: ${paramName}`);
    this.name = "MissingParamError";
  }
}
