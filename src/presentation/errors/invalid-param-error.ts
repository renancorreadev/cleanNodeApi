/* InvalidParamError is a class that extends Error and has a constructor that takes
a paramName string and sets the message to 'Invalid param: ' plus the paramName. 
*/
export class InvalidParamError extends Error {
  constructor(paramName: string) {
    super(`Invalid param: ${paramName}`);
    this.name = "InvalidParamError";
  }
}
