const express = require('express');
const fs = require('fs');
const mv = require('mv');
const mkdirp = require('mkdirp');

const router = express.Router();

let upload = (req, callback) => {
    let files = req.files;
    
    let date = new Date();
    let path = `./files/clients/${date.getFullYear()}/${date.getMonth()}`;

    // let clientID = res.locals.client_id;

    if (!fs.existsSync(path)) {

        for (let key in files) {
            let oldPath = files[key].path;
            let newPath = files[key].name;
            let expansion = files[key].name.match(/([.].*)/)[1]
            
            mkdirp(path, err => {
                if (err) {
                    callback(err);
                } else {
                    newPath = `${path}/${newPath}`;

                    mv(oldPath, newPath, err => {
                        if (err) {
                            callback(err);
                        } else {                     
                            oldPath = newPath;
                            newPath = `/${path}/${key}${expansion}`;

                            fs.rename(oldPath, newPath, err => {
                                if (err) {
                                    callback(err);
                                } else {
                                    callback("File uploaded!");
                                }
                            });
                        }
                    });
                }
            });
        }
    } else {
        for (let key in files) {

            let oldPath = files[key].path;
            let newPath = files[key].name;
            let expansion = files[key].name.match(/([.].*)/)[1];

            newPath = `${path}/${newPath}`;
            console.log(newPath);

            mv(oldPath, newPath, err => {
                if (err) {
                    callback(err);
                } else {
                    oldPath = newPath;
                    newPath = `${path}/${key}${expansion}`;
                    console.log(oldPath, newPath);

                    fs.rename(oldPath, newPath, err => {
                        if (err) {
                            callback(err);
                        } else {
                            callback("File uploaded!");
                        }
                    });
                }
            });
        }
    }
}

module.exports = {
    router: router.post('/writeFile', (req, res, next) => {
        upload(req, (error, message) => {
            if (error) {
                res.json({
                    message: error,
                    success: false
                })
            } else {
                res.json({
                    message: message,
                    success: true
                })
            }
        })
    })
}