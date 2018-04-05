var express = require('express');
var router = express.Router();
var url = require('url');
var path = require('path');
var Client = require('fabric-client');
var sdkUtils = require('fabric-client/lib/utils');
var ORGS;
router.get('/query', function (req, res, next) {
    //res.render('fabric', { title: 'Hello Fabric' });
    //console.log(req.url);
    var id=req.query.id
    console.log(id);
    console.log(Client);
    query(id);
    res.render('fabric', { title: JSON.stringify(ORGS) });
});
function init() {
    console.log(path.join(__dirname, './config.json'));
    Client.addConfigFile(path.join(__dirname, './config.json'));
    ORGS = Client.getConfigSetting('network');
    console.log(ORGS)

};
function query(arg){
    'use strict';
    init();

}


function invoke(arg){
    'use strict';
}
module.exports = router;