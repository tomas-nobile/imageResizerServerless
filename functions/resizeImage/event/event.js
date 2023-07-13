module.exports=  {
    "Records": [
        {
            "eventVersion": "2.1",
            "eventSource": "aws:s3",
            "awsRegion": "us-east-1",
            "eventTime": "2023-07-10T17:38:35.425Z",
            "eventName": "ObjectCreated:Put",
            "userIdentity": {
                "principalId": "AWS:AROA5ZWUOBDUKYIMWESPK:OriginAccessSession"
            },
            "requestParameters": {
                "sourceIPAddress": "64.252.80.181"
            },
            "responseElements": {
                "x-amz-request-id": "GRZSE0XD6A02MPAJ",
                "x-amz-id-2": "K3UoqqUt7hQW825iQBR58ZvFfcmXVk3P3MpyjD/ujbIyW6zWaVPGdKN9+iOzC6PgUvuhUPo6Y7rFfeYq6+acdV1KiL6qy2IN3x/H+v60WaY="
            },
            "s3": {
                "s3SchemaVersion": "1.0",
                "configurationId": "resizeImage-uatm-057a87b0c6d7a62748d8b7e8958d9482",
                "bucket": {
                    "name": "sinapsis-images-nobile-uatm",
                    "ownerIdentity": {
                        "principalId": "A18OLF3YCVUZYX"
                    },
                    "arn": "arn:aws:s3:::sinapsis-images-nobile-uatm"
                },
                "object": {
                    "key": "images/tomas.e.nobile/index.jpg",
                    "size": 259000,
                    "eTag": "8dae1852bb9aded915bb28109d3d665e",
                    "sequencer": "0064AC421B5446A222"
                }
            }
        }
    ]
}