const breq = require('bluereq')
const PromiseThrottle = require('promise-throttle');
let bupGt = new PromiseThrottle({
    requestsPerSecond: 3600/5000,           // up to 5000 requests per hour
     promiseImplementation: Promise  // the Promise library you are using
});

// Register OAuth application to increase quotas
// https://developer.github.com/v3/#rate-limiting
// https://github.com/settings/tokens
const token = require('../lib/token')

const headers = {
  'User-Agent': 'backup-github-repo',
  Authorization: `token ${token}`
}

module.exports = function(url){
  return bupGt.add(() => breq.get({ url, headers }).get('body'))
}
