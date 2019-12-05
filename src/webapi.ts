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
        app.post("/api/msteams/notification", function(req: any, res: any){
            console.log("   > Send " + JSON.stringify(req.body))
            try{
                if (req.body.embed == undefined || req.body.message == undefined || req.body.url == undefined){
                    console.log("[->] Request property not set.")
                    return   res.status(400).json({
                        status: 400,
                        message: "Your json body need the property (embed:bool) (message:string) (url:string)"
                    });
                }
            }catch(e){
                console.log("ERROR! :: " + JSON.stringify(req.body))
            }
            console.log("-> URL :: " + req.body.url)
            const webhook = new IncomingWebhook(req.body.url);
            
            if (req.body.embed){
                webhook.send(JSON.stringify({
                    "@type": "MessageCard",
                    "@context": "https://schema.org/extensions",
                    "summary": "2 new Yammer posts",
                    "themeColor": "3E94EB",
                    "title": "Support++",
                    "sections": [{
                        "text": req.body.message,
                    }]
                }));
            }else{
                webhook.send(JSON.stringify({
                    "text": req.body.message
                }));
            }
            res.status(200).json({
                status: 200,
                id: "oke send"
            });
      
        })
    

        app.listen(3001, function () {
        console.log('Example app listening on port 3001!');

        });
    }

}