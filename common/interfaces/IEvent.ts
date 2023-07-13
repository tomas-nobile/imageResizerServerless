interface IEvent {
  Records: IRecord[];
}

interface IRecord {
  cf: {
    config: IConfig;
    request: IEventRequest;
    response?: IEventResponse;
  };
}

interface IConfig {
  distributionDomainName: string;
  distributionId: string;
  eventType: string;
  requestId: string;
}

interface IEventResponse extends IOutput {
  status?: string;
  statusDescription?: string;
  body?: string;
}

interface IEventRequest extends IOutput {
  clientIp: string;
  method: string;
  origin: {
    s3: IS3Origin;
  };
  querystring: string;
  uri: string;
}

interface IOutput {
  headers: IHeaders;
}

interface IHeaders {
  [key: string]: {
    key: string;
    value: string;
  }[];
}

interface IS3Origin {
  authMethod: string;
  customHeaders: Record<string, string>;
  domainName: string;
  path: string;
}


  
  export { IHeaders, IConfig, IS3Origin, IEventRequest, IEventResponse, IRecord, IEvent,IOutput };