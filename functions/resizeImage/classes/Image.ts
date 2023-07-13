import jimp from "jimp";
import { PutObjectCommandInput } from "@aws-sdk/client-s3";
import IDimenToResizeInterface from '../../../common/interfaces/IDimenToResize'
import { formatCfUrlResized } from "../../../common/utils/utils";



export class Image {
  private buffer: Buffer;
  private key: string;
  private type: string;

  constructor(buffer: Buffer, key: string, type: string) {
    this.buffer = buffer;
    this.key = key;
    this.type = type;
  }

  public async resize({width,height}:IDimenToResizeInterface, contentType: string): Promise<PutObjectCommandInput> {
    const image = await jimp.read(this.buffer);
    image.resize(width, height);

    return {
      Key: formatCfUrlResized(this.key,width,height,this.type),
      Body: await image.getBufferAsync(contentType),
      Bucket: undefined
    };
  }
}
