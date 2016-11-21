
//module.exports = function(fs)
//{
    var Vision = require('@google-cloud/vision');

    var visionClient = Vision({
        projectId: 'hazel-phoenix-150108',
        keyFilename: '/Users/cdsn/nodejs/apikey/Tutorial Project-b63b0ae4ec5b.json'
    });

    visionClient.detectLabels('./sample_images/00000001.png', function(err, labels){
        if (err) {
          return console.log(err);
        }
        console.log('result:', JSON.stringify(labels, null, 2));
    });

    visionClient.detectLogos('./sample_images/00000001.png', function(err, logos){
        if(err)
        {
            return cosole.log(err);
        }
        console.log('result:', JSON.stringify(logos, null, 2));
    });


    visionClient.detectText('./sample_images/00000001.png', function(err, text){
        if(err)
        {
            return console.log(err);
        }
        console.log('result:', JSON.stringify(text, null, 2));
    });

//};
