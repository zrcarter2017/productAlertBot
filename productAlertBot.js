const settings = require('./settings.json')
const Nightmare = require('nightmare')


// // Twilio Credentials
const accountSid = settings.credentials.accountSid;
const authToken = settings.credentials.authToken;

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);

var sendMessage = (productName, url) => {
    client.messages
        .create({
            body: productName + ' is back in stock: ' + url,
            from: settings.numbers.twilio,
            to: settings.numbers.user1
        })
        .then(message => console.log(message.sid));
}
//initialize booleans for products
var xbox;
var rtx3070;
var rtx3080;

//tally message count
var xboxCount = 0;
var rtx3070Count = 0;
var rtx3080Count = 0;


let productLinks = {
    'xbox': 'https://www.bestbuy.com/site/microsoft-xbox-series-x-1tb-console-black/6428324.p?skuId=6428324',
    'rtx3070': 'https://www.bestbuy.com/site/nvidia-geforce-rtx-3070-8gb-gddr6-pci-express-4-0-graphics-card-dark-platinum-and-black/6429442.p?skuId=6429442',
    'rtx3080': 'https://www.bestbuy.com/site/nvidia-geforce-rtx-3080-10gb-gddr6x-pci-express-4-0-graphics-card-titanium-and-black/6429440.p?skuId=6429440'
}

setInterval(function () {
    const nightmare = Nightmare({ show: false })
    nightmare
        .useragent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36')
        .goto('https://www.bestbuy.com/site/microsoft-xbox-series-x-1tb-console-black/6428324.p?skuId=6428324')
        .exists('.btn.btn-disabled.btn-lg.btn-block.add-to-cart-button')
        .end()
        .then(function (exists) {
            if (exists) {
                xbox = false;
                console.log("Not in stock")
            } else {
                xbox = true;
                xboxCount++;
                console.log("In stock")
            }
        })
        .catch(error => {
            console.error('Search failed:', error)
        })
        .then(function () {
            const nightmare = Nightmare({ show: false })
            nightmare
                .useragent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36')
                .goto('https://www.bestbuy.com/site/nvidia-geforce-rtx-3070-8gb-gddr6-pci-express-4-0-graphics-card-dark-platinum-and-black/6429442.p?skuId=6429442')
                .exists('.btn.btn-disabled.btn-lg.btn-block.add-to-cart-button')
                .end()
                .then(function (exists) {
                    if (exists) {
                        rtx3070 = false;
                        console.log("Not in stock")
                    } else {
                        rtx3070 = true;
                        rtx3070Count++;
                        console.log("In stock")
                    }
                })
                .catch(error => {
                    console.error('Search failed:', error)
                })
        }
        )
        .then(function () {
            const nightmare = Nightmare({ show: false })
            nightmare
                .useragent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36')
                .goto('https://www.bestbuy.com/site/nvidia-geforce-rtx-3080-10gb-gddr6x-pci-express-4-0-graphics-card-titanium-and-black/6429440.p?skuId=6429440')
                .exists('.btn.btn-disabled.btn-lg.btn-block.add-to-cart-button')
                .end()
                .then(function (exists) {
                    if (exists) {
                        rtx3080 = false;
                        console.log("Not in stock")
                    } else {
                        rtx3080 = true;
                        rtx3080Count++;
                        console.log("In stock")
                    }
                })
                .catch(error => {
                    console.error('Search failed:', error)
                })
        }
        )
        .then(function () {
            if (xbox && xboxCount <= 3) {
                console.log("send message - xbox")
                sendMessage('XBOX', productLinks.xbox)
            } else if (rtx3070 && rtx3070Count <= 3) {
                console.log("send message - rtx3070")
                sendMessage('RTX3070', productLinks.rtx3070)
            } else if (rtx3080 && rtx3080Count <= 3) {
                console.log("send message - rtx3080")
                sendMessage('RTX3080', productLinks.rtx3080)
            }
            else {
                console.log("dont send message")
            }
        })
}, 30000)
