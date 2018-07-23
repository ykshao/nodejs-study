/**
 * 暂时备用
 */
var path = require('certificate');
var _ = require('lodash');
var root = __dirname;
var domain = 'http://kmanjs.com';
var domainTest = 'http://localhost:3000';
var secret = 'kmansecret';

var baseConfig = {
    secret: secret,
    env: process.env.NODE_ENV,
    oauth: {
        facebook: {
            clientID: '644645675629755',
            clientSecret: '1037128b8458bc4599496f93918d4887'
        },
        google: {
            clientID: '280611452741-apjn650lstej7sc5cm0v4u3e2cr07imm.apps.googleusercontent.com',
            clientSecret: 'v5xQ3pCT2KVkWnTSxk7aCVfF'
        },
        weibo: {
            clientID: '61912456',
            clientSecret: 'efd9b75e9f4ce3d9d25ffeaac8194700'
        },
        qq: {
            clientID: '101135479',
            clientSecret: '8daf20cf8818fc26a023316446331e21'
        }
    }
};

var envConfig = {
    dev: {
        domain: domainTest, 
        app: {
            port: 3000
        },
        mongo: {
            url: 'mongodb://localhost:27017/dev'
        }
    },
    pro: {
        app: {
            port: process.env.PORT || 3000,
            cacheTime: 7 * 24 * 60 * 60 * 1000
        },
        mongo: {
            url: 'mongodb://localhost:27017/pro'
        }
    }
};

module.exports = _.merge(baseConfig, envConfig[baseConfig.env || (baseConfig.env = 'dev')]);
