import { EmailValidatorIFace } from "../../../presentation/protocols/email-validator";
import validator from "validator";

/* It's a class that implements the EmailValidatorIFace interface and uses the
validator library to validate emails. 
*/
export class EmailValidatorAdapter implements EmailValidatorIFace {
  /**
   * It returns true if the email is valid, and false if it's not
   * @param {string} email - The email address to validate.
   * @returns A boolean value.
   */
  isValid(email: string): boolean {
    return validator.isEmail(email);
  }
}
