import { HttpResponse, HttpRequest } from "./http";

/* Defining the interface for the controller. */
export interface Controller {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>;
}
