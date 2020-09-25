const settings = require('./settings.json')
const Nightmare = require('nightmare')


// // Twilio Credentials
const accountSid = settings.credentials.accountSid;
const authToken = settings.credentials.authToken;

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);

//selectors: element you expect to disappear when a product returns - add selectors here for different websites
let selectors = {
    'bestBuy': '.btn.btn-disabled.btn-lg.btn-block.add-to-cart-button'
}

//add a product object below for a product you want to track
let products = [
    {'name': 'xbox', 'link': 'https://www.bestbuy.com/site/microsoft-xbox-series-x-1tb-console-black/6428324.p?skuId=6428324', 'exists': false, 'messageCount': 0, 'selector': selectors.bestBuy},
    {'name': 'rtx3070', 'link': 'https://www.bestbuy.com/site/nvidia-geforce-rtx-3070-8gb-gddr6-pci-express-4-0-graphics-card-dark-platinum-and-black/6429442.p?skuId=6429442','exists': false, 'messageCount': 0, 'selector': selectors.bestBuy},
    {'name': 'rtx3080', 'link': 'https://www.bestbuy.com/site/nvidia-geforce-rtx-3080-10gb-gddr6x-pci-express-4-0-graphics-card-titanium-and-black/6429440.p?skuId=6429440', 'exists': false, 'messageCount': 0, 'selector': selectors.bestBuy}
]

var sendMessage = (product) => {
    client.messages
        .create({
            body: product.name + ' is back in stock: ' + product.link,
            from: settings.numbers.twilio,
            to: settings.numbers.user1
        })
        .then(message => console.log(message.sid));
}

var checkProductStatus = (product) => {
    const nightmare = Nightmare({ show: false })
    nightmare
        .useragent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36')
        .goto(product.link)
        .exists(product.selector)
        .end()
        .then(function (exists) {
            if (exists) {
                product.exists = false;
                console.log(product.name + " not in stock")
            } else {
                product.exists = true;
                if (product.messageCount < 3) {
                    sendMessage(product)
                    product.messageCount++;
                }
                console.log(product.name + " in stock")
            }
        })
        .catch(error => {
            console.error('Search failed:', error)
        })
}

let startBot = () => {
    setInterval(function () {
        products.forEach(element => {
            checkProductStatus(element, selectors.bestBuy)
        })
    }, 30000)
}

startBot();