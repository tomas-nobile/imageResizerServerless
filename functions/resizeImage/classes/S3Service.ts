import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  GetObjectCommandInput,
  S3ClientConfig,
  GetObjectCommandOutput

} from "@aws-sdk/client-s3";
import ErrorCustom from "../../../common/classes/ErrorCustom";

export class S3Service {
  private s3Client: S3Client;
  private bucketName:string;
  private cloudFrontDomain:string;

  constructor(s3ClientConfig: S3ClientConfig, bucketName:string) {
    this.setS3Client(s3ClientConfig);
    this.bucketName = bucketName;
  }

  private setS3Client(s3ClientConfig: S3ClientConfig) {
    this.s3Client = new S3Client(s3ClientConfig);
  }

  public async fetchObject(path: string):Promise<Buffer> {
    try {
      const getObjectInput: GetObjectCommandInput= {Key: path, Bucket: this.bucketName};
      const originalImage = await this.s3Client.send(new GetObjectCommand(getObjectInput));
      return await this.streamToBuffer(originalImage.Body);
    } catch (e) {
      throw new ErrorCustom(`Failed to fetch ${path} from bucket ${this.bucketName}. The error message is ${e}`,"500")
    }
  }

  public async putObject(putObjectInput:PutObjectCommandInput):Promise<void>{
    putObjectInput.Bucket= this.bucketName;
    try {
      await this.s3Client.send(new PutObjectCommand(putObjectInput))
    } catch (e) {
      throw new ErrorCustom(`Failed ${putObjectInput.Key} upload. The error message is ${e}`,"500")
    }
  }

  private async streamToBuffer(stream):Promise<Buffer>{
    return Buffer.concat(await stream.toArray());
  }
}
