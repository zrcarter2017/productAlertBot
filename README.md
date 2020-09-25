# Product In-Stock Alert Bot
The purpose of this application is to notify someone through an sms message, with three consecutive alerts, when a product is back in stock. The program checks the status of an item(s) at 30s intervals.

### Dependencies:
* node js 6 or above required
* npm install --save nightmare
* npm install --save twilio
* create a twilio account (https://www.twilio.com/docs/sms/quickstart/node) - I think you need an upgraded account - not trial.
    * accountSid
    * authToken
    * purchase twilio number - $1.00

### Steps to implement:
#### In the settings file:
* Add accountSid, authToken, and twilio number.
* Add number that you want to receive the messages as the user1 value.
#### In the productAlertBot file:
* Add selector to the selectors object depending on the webpage you are visiting.
* Add product to the products list with its corresponding info.

