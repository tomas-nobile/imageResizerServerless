Setup
    1. Set "region" and "accountNumber" properties on ./config.json 
    2. Run command "sls deploy"

Testing
    1. Post image 
        Method: PUT - Body's type: binary - URL: (Cloudfront's domain)/images/imageName.type
        Response sample:
        {
            "method": "GET",
            "urlsImgResized": [
                "d3ud6enqy0zrps.cloudfront.net/imagesResized/images/tomas.e.nobile/test400x200.jpg",
                "d3ud6enqy0zrps.cloudfront.net/imagesResized/images/tomas.e.nobile/test160x120.jpg",
                "d3ud6enqy0zrps.cloudfront.net/imagesResized/images/tomas.e.nobile/test120x120.jpg"
            ]
        }
    2. The images resized are going to be uploaded in the following uri /imagesResized/imageNameWEIGHTxHEIGHT.type into the S3's bucket
    3. Get image
        Method: GET - URL: (Cloudfront's domain)/imagesResized/imageName-weigthxheight.type
    4. You can import documentation/Sinapsis.postman_collection.json to test it on Postman