import * as config from "../../config.json";
const {pathToUploadImg} = config.main

export const formatCfUrlResized= (imageKey,width,height,imageType )=>{
    return `${pathToUploadImg}${imageKey}${width}x${height}.${imageType}`
}