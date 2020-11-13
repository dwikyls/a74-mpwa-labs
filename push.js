let webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BOSaCD3xk1lhMkA13N8ANuSDB-RqE90uQRyZ6du8iHM3UR0Ibso4eGT7l3e_3lBQZ9J97Gd_mDXDe6rkis6H6Ss",
    "privateKey": "1FWP68rpzGWTLlqThMh58xEe4tOWb0mucUDIXLBN7q0"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
let pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/etPXzjcZ9Hc:APA91bF0vIoCeYl9aMwh8ryYY3_rXzwIYAl18HsslNQKr3n84LNbaBNpFrz8Bd1RA46UPH-yYPU2e2-VJs0IOA73leCJcFHlYgcX1gpbm0dA3wPteXf0_PUbSZxKXtFmT3K_RzoFuzl3",
    "keys": {
        "p256dh": "BICde2BcxUra/g4LPDeKsFtILI7VVEQzqTqb+mFbfvCwZsCRwb1C/lbiOuYYooWL06cjkbHkx3e8MpMYUQRNclM=",
        "auth": "O4Hnc38ypyJKn1Q6G4yl6g=="
    }
};
let payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

let options = {
    gcmAPIKey: '449018771347',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
).catch(function(err) {
    console.log(err)
})