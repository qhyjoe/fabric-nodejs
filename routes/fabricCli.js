var express = require('express');
var router = express.Router();
var url = require('url');
var Client = require('fabric-client');
var sdkUtils = require('fabric-client/lib/utils')
router.get('/query', function (req, res, next) {
    //res.render('fabric', { title: 'Hello Fabric' });
    //console.log(req.url);
    var id=req.query.id
    console.log(id);
    query(id);
});
function init() {
    Client.addConfigFile(path.join(__dirname, './config.json'));
    var ORGS = Client.getConfigSetting('network');

};
function query(arg){
    'use strict';
    init()
}


function invoke(arg){
    'use strict';
}
module.exports = router;