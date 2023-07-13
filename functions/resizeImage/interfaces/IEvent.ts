interface IEvent {
    Records: IRecord[];
  }
  
  interface IRecord {
    eventVersion: string;
    eventSource: string;
    awsRegion: string;
    eventTime: string;
    eventName: string;
    userIdentity: IUserIdentity;
    requestParameters: IRequestParameters;
    responseElements: IResponseElements;
    s3: IS3Event;
  }
  
  interface IS3Event {
    s3SchemaVersion: string;
    configurationId: string;
    bucket: IBucket;
    object: IObject;
  }
  
  interface IBucket {
    name: string;
    ownerIdentity: {
      principalId: string;
    };
    arn: string;
  }
  
  interface IObject {
    key: string;
    size: number;
    eTag: string;
    sequencer: string;
  }
  
  interface IResponseElements {
    "x-amz-request-id": string;
    "x-amz-id-2": string;
  }
  
  interface IRequestParameters {
    sourceIPAddress: string;
  }
  
  interface IUserIdentity {
    principalId: string;
  }
  

interface IEvent {
  Records: IRecord[];
}

interface IRecord {
  eventVersion: string;
  eventSource: string;
  awsRegion: string;
  eventTime: string;
  eventName: string;
  userIdentity: IUserIdentity;
  requestParameters: IRequestParameters;
  responseElements: IResponseElements;
  s3: IS3Event;
}

interface IS3Event {
  s3SchemaVersion: string;
  configurationId: string;
  bucket: IBucket;
  object: IObject;
}

interface IBucket {
  name: string;
  ownerIdentity: {
    principalId: string;
  };
  arn: string;
}

interface IObject {
  key: string;
  size: number;
  eTag: string;
  sequencer: string;
}

interface IResponseElements {
  "x-amz-request-id": string;
  "x-amz-id-2": string;
}

interface IRequestParameters {
  sourceIPAddress: string;
}

interface IUserIdentity {
  principalId: string;
}

export {
  IEvent,
  IRecord,
  IS3Event,
  IBucket,
  IObject,
  IResponseElements,
  IRequestParameters,
  IUserIdentity
};
