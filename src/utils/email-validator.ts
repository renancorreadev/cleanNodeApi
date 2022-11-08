import { EmailValidatorIFace } from "../presentation/protocols/email-validator";
import validator from "validator";

export class EmailValidatorAdapter implements EmailValidatorIFace {
  isValid(email: string): boolean {
    return validator.isEmail(email);
  }
}
