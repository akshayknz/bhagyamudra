const functions = require("firebase-functions");
const fetch = require('node-fetch');
const admin = require('firebase-admin');
const Razorpay = require('razorpay');
const cors = require('cors')({origin: true});
admin.initializeApp();
const db = admin.firestore();
// exports.convertLargeFile = functions
//     .runWith({
//       // Ensure the function has enough memory and time
//       // to process large files
//       timeoutSeconds: 300,
//       memory: "1GB",
//     })
//     .storage.object()
//     .onFinalize((object) => {
//       // Do some complicated things that take a lot of memory and time
//     });

const razorpayConfig = {
    key_id: 'rzp_test_iuhRpHle3JP7mz', key_secret: 'x0lugIZKR1cKrcwtNhBicyGv'
}

exports.getNewOrderId = functions.https.onRequest((request, response) => {
    cors()(request, response, () => {});
    var instance = new Razorpay(razorpayConfig)
    var price = (+request.body.price>100)? +request.body.price : 100
    instance.orders.create({
    amount: price,
    currency: "INR",
    receipt: "receipt#1",
    notes: {
        key1: "value3",
        key2: "value2"
    }
    }).then(res=>{
        response.send({
            status : true,
            data : res
        });
    })
  });

exports.savePaymentResult = functions.https.onRequest((request, response) => {
    return cors()(request, response, () => {
        functions.logger.log(request.body);
        functions.logger.log(request.body.data.data);
        db
        .collection('profiles')
        .doc(request.body.data.data.documentId)
        .update({payment: request.body.data.data})
        .catch(error => {
            functions.logger.log(error);
            return false;
        });
        response.send({
            status: true,
            data: 200
        })
    })
})