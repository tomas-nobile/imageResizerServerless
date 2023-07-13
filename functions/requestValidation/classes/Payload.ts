//import IRequest from "../interfaces/IRequest";

import ErrorCustom from "../../../common/classes/ErrorCustom";
import { IEvent, IEventRequest, IOutput } from "../../../common/interfaces/IEvent";
import ImageValidation from "./ImageValidation";

export class Payload{

  private req: IEventRequest;

  constructor(event: IEvent) {
    this.req = event.Records[0].cf.request;
  }

  public process(): IOutput {
    // auth
    if (this.req.method == "PUT") {
      const { imageType, imageSize } = this.getImageInfo();
      new ImageValidation(imageSize, imageType);
      return this.req;
    } else if (this.req.method == "GET") {
      return this.req;
    } else {
      throw new ErrorCustom(`${this.req.method} is a method not allowed.`, "405");
    }
  }

  public getImageInfo() {
    const response = {
      imageType: "",
      imageSize: "0"
    };

    if(this.req.headers.hasOwnProperty("content-type")){
      response.imageType= this.req.headers["content-type"][0].value;
      response.imageSize= this.req.headers["content-length"][0].value 
    }

    return response
    
  }

}
