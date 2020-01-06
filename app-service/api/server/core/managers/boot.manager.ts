import express from "express";
import fs = require("fs");
import path = require("path");
const directoryPath = path.join(__dirname, "../boot");
module.exports = (app: express.Application): void => {
    fs.readdir(directoryPath, (err: any, files: any) => {
        // handling error
        if (err) {
            return console.log("Unable to scan directory: " + err);
        }
        files.forEach((file: any) => {
            if (file.indexOf(".init.ts") > -1 && file.indexOf(".map") === -1) {
                require(`${directoryPath}/${file}`)(app);
            }
        });
    });
};
