/** A Decoretor to Log Events on Server Errors  */

import {
  Controller,
  HttpRequest,
  HttpResponse
} from "../../presentation/protocols";

export class LogControllerDecorator implements Controller {
  private readonly controller: Controller;

  constructor(controller: Controller) {
    this.controller = controller;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.controller.handle(httpRequest);
    // @ts-expect-error
    return null;
  }
}
