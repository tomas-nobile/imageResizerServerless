import { IEventResponse, IHeaders } from "../interfaces/IEvent";
import * as config from "../../config.json";
import IDimenToResize from "../interfaces/IDimenToResize";
import { formatCfUrlResized } from "../utils/utils";
import ErrorCustom from "./ErrorCustom";

const dimenToResize: IDimenToResize[] = config.main.dimenToResize;

export class Response implements IEventResponse{
  
  headers: IHeaders;
  status: string;
  statusDescription: string;
  body: string;

  constructor(response?:IEventResponse) {
      this.setResFieldsRequired(response);
    
  }
  private setResFieldsRequired(response?:IEventResponse) {
    this.headers = response?.headers || {};
    this.headers["strict-transport-security"] = [
      { key: "Strict-Transport-Security", value: "max-age= 63072000; includeSubdomains; preload" },
    ];
    this.headers["content-security-policy"] = [
      {
        key: "Content-Security-Policy",
        value:
          "default-src 'none'; img-src 'self'; script-src 'self'; style-src 'self'; object-src 'none'",
      },
    ];
    this.headers["x-content-type-options"] = [{ key: "X-Content-Type-Options", value: "nosniff" }];
    this.headers["x-frame-options"] = [{ key: "X-Frame-Options", value: "DENY" }];
    this.headers["x-xss-protection"] = [{ key: "X-XSS-Protection", value: "1; mode=block" }];
    this.headers["referrer-policy"] = [{ key: "Referrer-Policy", value: "same-origin" }];
  }

  public error(e: ErrorCustom): IEventResponse {
    this.status = e.status;
    this.body = e.message;
    this.statusDescription = e.statusDescription || "Error";
    return this.getObject()
  }

  public success(imageKey,imageType, cloudfrontDomain: string): IEventResponse {
    this.setBodySuccess(imageKey,imageType, cloudfrontDomain);
    this.status = "200";
    this.statusDescription = "Success";
    return this.getObject()
  }

  private setBodySuccess(imageKey,imageType, cloudfrontDomain: string) {
    const cfUrls: string[] = [];
    for (const { width, height } of dimenToResize) {
      const cfUrl = `"${cloudfrontDomain}/${formatCfUrlResized(
        imageKey,
        width,
        height,
        imageType
      )}"`;
      cfUrls.push(cfUrl);
    }
    this.body = `{"method":"GET","urlsImgResized":[${cfUrls.toString()}]}`;
  }

  public getObject() {
    const { headers, status, statusDescription, body } = this;
    return {headers,status,statusDescription,body}
  }
}
