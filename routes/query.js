var Common = require('./common');
var fs = require('fs');
var url = require('url');
var path = require('path');
var Client = require('fabric-client');
var sdkUtils = require('fabric-client/lib/utils');

function query(arg) {
    'use strict';
    console.log(arg);
    var common = new Common();
    var dataJson = common.init();

    var channel = {};
    var client=new Client();
    Promise.resolve().then(function () {
        console.log("Load privateKey and signedCert");
        var createUserOpt = {
            username: dataJson.options1.user_id,
            mspid: dataJson.options1.msp_id,
            cryptoContent: {
                privateKey: getKeyFilesInDir(dataJson.options1.privateKeyFolder)[0],
                signedCert: dataJson.options1.signedCert
            }
        }
//以上代码指定了当前用户的私钥，证书等基本信息
        return sdkUtils.newKeyValueStore({
            path: "/tmp/fabric-client-stateStore/"
        }).then(function (store) {
            client.setStateStore(store)
            return client.createUser(createUserOpt)
        })
    }).then(function (user) {
        channel = client.newChannel(dataJson.options1.channel_id);
        var data = fs.readFileSync(dataJson.options1.tls_cacerts);
        var peer = client.newPeer(dataJson.options1.network_url,
            {
                pem: Buffer.from(data).toString(),
                'ssl-target-name-override': dataJson.options1.server_hostname
            }
        );
        peer.setName("peer0");
        //因为启用了TLS，所以上面的代码就是指定TLS的CA证书
        channel.addPeer(peer);
        return;
    }).then(function () {
        console.log("Make query");
        var transaction_id = client.newTransactionID();
        console.log("Assigning transaction_id: ", transaction_id._transaction_id);
//构造查询request参数
        var request;
        if (arg.func == "queryPost") {
            request = {
                chaincodeId: dataJson.options1.chaincode_id,
                txId: transaction_id,
                fcn: 'queryPost',
                args: ["POST" + arg.id]
            };
        } else if (arg.func == "richQueryPosts") {
            request = {
                chaincodeId: dataJson.options1.chaincode_id,
                txId: transaction_id,
                fcn: 'richQueryPosts',
                args: [arg.attribute, arg.operator, arg.value]
            };
        } else if (arg.func == "getPostNum") {
            request = {
                chaincodeId: dataJson.options1.chaincode_id,
                txId: transaction_id,
                fcn: 'getPostNum',
                args: [arg.attribute, arg.operator, arg.value]
            };
        }else{
            request = {
                chaincodeId: dataJson.options1.chaincode_id,
                txId: transaction_id,
                fcn: 'query',
                args: ['a']
            };
        }
        console.log("query request"+JSON.stringify(request));
        var d=channel.queryByChaincode(request)
        console.log(JSON.stringify(d));
        return d;
    }).then(function (query_responses) {
        console.log("returned from query");
        console.log("query_responses"+JSON.stringify(query_responses));
        if (!query_responses.length) {
            console.log("No payloads were returned from query");
        } else {
            console.log("Query result count = ", query_responses.length)
        }
        if (query_responses[0] instanceof Error) {
            console.error("error from query = ", query_responses[0]);
        }
        // res.writeHead(200, {'Content-Type': 'text/plain'});
        // res.end(query_responses[0]);
        console.log("Response is ", query_responses[0].toString());//打印返回的结果
        return query_responses.toString();
    }).catch(function (err) {
        console.error("Caught Error", err);
    });

};
function getKeyFilesInDir(dir) {
//该函数用于找到keystore目录下的私钥文件的路径
    var files = fs.readdirSync(dir)
    console.log(files);
    var keyFiles = []
    files.forEach(function (file_name, index) {
        var filePath = path.join(dir, file_name)
        if (file_name.endsWith('_sk')) {
            keyFiles.push(filePath)
        }
    })
    return keyFiles
};
module.exports = query;