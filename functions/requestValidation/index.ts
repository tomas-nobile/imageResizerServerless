import ErrorCustom from "../../common/classes/ErrorCustom";
import ImageValidation from "./classes/ImageValidation";
import { Payload } from "./classes/Payload";
import { Response } from "../../common/classes/Response";
import { IEvent, IEventRequest, IEventResponse, IOutput} from "../../common/interfaces/IEvent";

("use strict");
exports.handler = async (event:IEvent, context, callback) => {
  const payload = new Payload(event);
  let response: IOutput;
  try {
    response= payload.process()
  } catch (e) {
    response = new Response().error(e)
  }
  
  callback(null,response)
};
