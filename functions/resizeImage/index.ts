import { Payload } from "./classes/Payload";
import { S3Service } from "./classes/S3Service";
import { Image } from "./classes/Image";
import IDimenToResize from "../../common/interfaces/IDimenToResize";

import * as config from "../../config.json";
import ErrorCustom from "../../common/classes/ErrorCustom";
import {  IOutput } from "../../common/interfaces/IEvent";
import { Response } from "../../common/classes/Response";
import { IEvent } from "./interfaces/IEvent";
const dimenToResize: IDimenToResize[] = config.main.dimenToResize;

exports.handler = async (event:IEvent, context, callback) => {
  const { bucketName, contentType, imageKey, imageType, region, path } = new Payload(
    event
  ).getObject();
  const s3Client = new S3Service({ region }, bucketName);

  try {
    const s3Object = await s3Client.fetchObject(path);
    const img = new Image(s3Object, imageKey, imageType);

    for (const e of dimenToResize) {
      const imgResized = await img.resize(e, contentType);
      await s3Client.putObject(imgResized);
    }
    // response = new Response().success(imageKey, imageType, cfDomainName);
    callback(null, "Execution succeded");
  } catch (e) {
    const error: ErrorCustom = e;
    callback("Execution failed: "+ error.getMessage())
  }
  
};
