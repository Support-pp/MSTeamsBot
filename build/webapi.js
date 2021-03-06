"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const rateLimit = require("express-rate-limit");
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const index = require('./index');
const { IncomingWebhook } = require('ms-teams-webhook');
class WebApi {
    start() {
        const app = express();
        app.set('trust proxy', 1);
        app.use(bodyParser.urlencoded({ extended: false }));
        //Define API rate limit
        const limiter = rateLimit({
            windowMs: 1 * 60 * 1000,
            max: 5
        });
        app.use(limiter);
        app.get('/', function (req, res) {
            res.send('Hello World!');
        });
        //Validate JSON body.
        app.use((req, res, next) => {
            bodyParser.json()(req, res, err => {
                if (err) {
                    console.log("[->] Wrong json reuest.");
                    return res.status(400).json({
                        status: 400,
                        id: "JSON struct not valied."
                    });
                }
                next();
            });
        });
        app.get("/api/msteams/notification", function (req, res) {
            const webhook = new IncomingWebhook("https://outlook.office.com/webhook/7c642389-9d46-42ea-919c-c2bf8fed24e7@c7ffb374-3972-450a-b270-bcc079b456b9/IncomingWebhook/7a53ac17df124fb3bef57375ea1da921/abe1c9b4-4c11-400b-bed3-196c875db203");
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
                }));
            })();
        });
        app.listen(3000, function () {
            console.log('Example app listening on port 3000!');
        });
    }
}
exports.WebApi = WebApi;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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Q0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO1FBRW5ELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUVKO0FBakVELHdCQWlFQyIsImZpbGUiOiJ3ZWJhcGkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcbmNvbnN0IHJhdGVMaW1pdCA9IHJlcXVpcmUoXCJleHByZXNzLXJhdGUtbGltaXRcIik7XG52YXIgYm9keVBhcnNlciA9IHJlcXVpcmUoJ2JvZHktcGFyc2VyJylcbmNvbnN0IGp3dCAgPSByZXF1aXJlKCdqc29ud2VidG9rZW4nKTtcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcbmNvbnN0IGluZGV4ID0gcmVxdWlyZSgnLi9pbmRleCcpO1xuY29uc3QgeyBJbmNvbWluZ1dlYmhvb2sgfSA9IHJlcXVpcmUoJ21zLXRlYW1zLXdlYmhvb2snKTtcblxuZXhwb3J0IGNsYXNzIFdlYkFwaSB7XG5cblxuICAgIHB1YmxpYyBzdGFydCgpOiB2b2lkIHtcblxuICAgICAgICBjb25zdCBhcHA6IGV4cHJlc3MuQXBwbGljYXRpb24gPSBleHByZXNzKCk7XG4gICAgICAgIGFwcC5zZXQoJ3RydXN0IHByb3h5JywgMSk7XG4gICAgICAgIGFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IGZhbHNlIH0pKVxuXG4gICAgICAgIC8vRGVmaW5lIEFQSSByYXRlIGxpbWl0XG4gICAgICAgIGNvbnN0IGxpbWl0ZXIgPSByYXRlTGltaXQoe1xuICAgICAgICAgICAgd2luZG93TXM6IDEgKiA2MCAqIDEwMDAsXG4gICAgICAgICAgICBtYXg6IDVcbiAgICAgICAgfSk7XG4gICAgICAgIGFwcC51c2UobGltaXRlcik7XG5cbiAgICAgICAgYXBwLmdldCgnLycsIGZ1bmN0aW9uIChyZXE6IGFueSwgcmVzOiBhbnkpIHtcbiAgICAgICAgICAgIHJlcy5zZW5kKCdIZWxsbyBXb3JsZCEnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9WYWxpZGF0ZSBKU09OIGJvZHkuXG4gICAgICAgIGFwcC51c2UoKHJlcTogYW55LCByZXM6YW55LCBuZXh0OmFueSkgPT4ge1xuICAgICAgICAgICAgYm9keVBhcnNlci5qc29uKCkocmVxLCByZXMsIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlstPl0gV3JvbmcganNvbiByZXVlc3QuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJKU09OIHN0cnVjdCBub3QgdmFsaWVkLlwiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgYXBwLmdldChcIi9hcGkvbXN0ZWFtcy9ub3RpZmljYXRpb25cIiwgZnVuY3Rpb24ocmVxOiBhbnksIHJlczogYW55KXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCB3ZWJob29rID0gbmV3IEluY29taW5nV2ViaG9vayhcImh0dHBzOi8vb3V0bG9vay5vZmZpY2UuY29tL3dlYmhvb2svN2M2NDIzODktOWQ0Ni00MmVhLTkxOWMtYzJiZjhmZWQyNGU3QGM3ZmZiMzc0LTM5NzItNDUwYS1iMjcwLWJjYzA3OWI0NTZiOS9JbmNvbWluZ1dlYmhvb2svN2E1M2FjMTdkZjEyNGZiM2JlZjU3Mzc1ZWExZGE5MjEvYWJlMWM5YjQtNGMxMS00MDBiLWJlZDMtMTk2Yzg3NWRiMjAzXCIpO1xuICAgICAgICAgICAgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGF3YWl0IHdlYmhvb2suc2VuZChKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgXCJAdHlwZVwiOiBcIk1lc3NhZ2VDYXJkXCIsXG4gICAgICAgICAgICAgICAgXCJAY29udGV4dFwiOiBcImh0dHBzOi8vc2NoZW1hLm9yZy9leHRlbnNpb25zXCIsXG4gICAgICAgICAgICAgICAgXCJzdW1tYXJ5XCI6IFwiSXNzdWUgMTc2NzE1Mzc1XCIsXG4gICAgICAgICAgICAgICAgXCJ0aGVtZUNvbG9yXCI6IFwiMDA3OEQ3XCIsXG4gICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIklzc3VlIG9wZW5lZDogXFxcIlB1c2ggbm90aWZpY2F0aW9ucyBub3Qgd29ya2luZ1xcXCJcIixcbiAgICAgICAgICAgICAgICBcInNlY3Rpb25zXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3Rpdml0eVRpdGxlXCI6IFwiTWlndWVsIEdhcmNpZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3Rpdml0eVN1YnRpdGxlXCI6IFwiOS8xMy8yMDE2LCAxMTo0NmFtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjdGl2aXR5SW1hZ2VcIjogXCJodHRwczovL2Nvbm5lY3RvcnNkZW1vLmF6dXJld2Vic2l0ZXMubmV0L2ltYWdlcy9NU0MxMl9Pc2Nhcl8wMDIuanBnXCIsXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dFwiOiBcIlRoZXJlIGlzIGEgcHJvYmxlbSB3aXRoIFB1c2ggbm90aWZpY2F0aW9ucywgdGhleSBkb24ndCBzZWVtIHRvIGJlIHBpY2tlZCB1cCBieSB0aGUgY29ubmVjdG9yLlwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH0pXG5cbiAgICAgICAgYXBwLmxpc3RlbigzMDAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdFeGFtcGxlIGFwcCBsaXN0ZW5pbmcgb24gcG9ydCAzMDAwIScpO1xuXG4gICAgICAgIH0pO1xuICAgIH1cblxufSJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vYnVpbGQifQ==
