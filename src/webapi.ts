import express = require('express');
const rateLimit = require("express-rate-limit");
var bodyParser = require('body-parser')
const jwt  = require('jsonwebtoken');
const fs = require('fs');
const index = require('./index');
const { IncomingWebhook } = require('ms-teams-webhook');

export class WebApi {


    public start(): void {

        const app: express.Application = express();
        app.set('trust proxy', 1);
        app.use(bodyParser.urlencoded({ extended: false }))

        //Define API rate limit
        const limiter = rateLimit({
            windowMs: 1 * 60 * 1000,
            max: 5
        });
        app.use(limiter);

        app.get('/', function (req: any, res: any) {
            res.send('Hello World!');
        });

        //Validate JSON body.
        app.use((req: any, res:any, next:any) => {
            bodyParser.json()(req, res, err => {
                if (err) {
                    console.log("[->] Wrong json reuest.")
                      return res.status(400).json({
                            status: 400,
                            id: "JSON struct not valied."
                    });

                }
                next();
            });
        });
        app.get("/api/msteams/notification", function(req: any, res: any){
            
            
            const webhook = new IncomingWebhook(/** TODO webhook from request*/);
            (async () => {
            await webhook.send(JSON.stringify({
                "@type": "MessageCard",
                "@context": "https://schema.org/extensions",
                "summary": "Issue 176715375",
                "themeColor": "0078D7",
                "title": "Issue opened: \"Push notifications not working\"",
                "sections": [
                    {
                        "activityTitle": "Miguel Garcie",
                        "activitySubtitle": "9/13/2016, 11:46am",
                        "activityImage": "https://connectorsdemo.azurewebsites.net/images/MSC12_Oscar_002.jpg",
            
                        "text": "There is a problem with Push notifications, they don't seem to be picked up by the connector."
                    }
                ]
            })
            );
            })();
        })

        app.listen(3000, function () {
        console.log('Example app listening on port 3000!');

        });
    }

}