import { EmailValidatorIFace } from "../presentation/protocols/email-validator";

export class EmailValidatorAdapter implements EmailValidatorIFace {
  isValid(email: string): boolean {
    return false;
  }
}
