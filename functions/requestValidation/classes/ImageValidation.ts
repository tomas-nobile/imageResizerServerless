import ErrorCustom from "../../../common/classes/ErrorCustom";
import * as config from "../../../config.json";
const { imageSizeSupported, imageTypesSupported } = config.requestValidation;

export default class ImageValidation {

  constructor(size: string, type: string) {
    this.validateSize(size);
    this.validateType(type);
  }
  private validateSize(size: string) {
    if (+size > imageSizeSupported && +size != 0)
      throw new ErrorCustom(
        `The image is ${size} bytes. It must be between 1 and  ${imageSizeSupported} bytes`,
        "400"
      );

  }
  private validateType(type: string) {
    if (!imageTypesSupported.includes(type))
      throw new ErrorCustom(`The image's type is not supported.`, "400");
  }

}
