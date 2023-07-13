
import { IEvent } from "../interfaces/IEvent";
import * as config from "../../../config.json";
const { contentTypes } = config.resizeImage

export class Payload{
  private region: string;
  private bucketName: string;
  private contentType: string;
  private imageType: string;
  private imageKey: string;
  private path: string;


  constructor(event: IEvent) {
    this.setValues(event);
  }
  private setValues(event: IEvent) {
    const {s3,awsRegion}= event.Records[0]
    const imageType= s3.object.key.split(".").pop()!

    this.path= s3.object.key;
    this.region=awsRegion;
    this.bucketName = s3.bucket.name;
    this.imageType= imageType;
    this.imageKey= s3.object.key.replace(`.${imageType}`,"");
    this.contentType = contentTypes[imageType]
  }

  public getObject(){
    return {
      region: this.region,
      bucketName: this.bucketName,
      contentType: this.contentType,
      imageKey: this.imageKey,
      imageType: this.imageType,
      path:this.path
    };
  }
}
