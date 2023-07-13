import { Response } from "../../common/classes/Response";
import { IEvent, IOutput } from "../../common/interfaces/IEvent";

exports.handler = async (event: IEvent, context, callback) => {
    let response:IOutput;
    if(event.Records[0].cf.request.method=='PUT'){
        const { imageKey, imageType, cfDomainName } = getPayload(event);
        response=new Response(event.Records[0].cf.response!).success(imageKey, imageType, cfDomainName)
    }else{
        response= event.Records[0].cf.response!
    }

  callback(null, response );
};


function getPayload(event: any) {
  const { uri } = event.Records[0].cf.request;
  const { distributionDomainName } = event.Records[0].cf.config;

  return {
    cfDomainName: distributionDomainName,
    imageType: uri.split(".").pop()!,
    imageKey: uri.substring(1).replace(`.${uri.split(".").pop()}`, ""),
  };
}
