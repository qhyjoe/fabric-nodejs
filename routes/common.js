// 公共文件
var url = require('url');
var path = require('path');
var client = require('fabric-client');
var sdkUtils = require('fabric-client/lib/utils');
var Common=function() {
    this.init=function(){
        client.addConfigFile(path.join(__dirname, './config.json'));
        return client.getConfigSetting('options');
    }
}

module.exports = Common;