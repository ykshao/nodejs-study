var axios = require('axios')

var ajaxUrl = 'https://easy-mock.com/mock/5a815b907e05481d41b22ab1/syk_api'
/**
 * async 方式
 */
async function getUserByAsync(url) {
  let url_concat = ajaxUrl + '/' + url;
  return await axios.get(url_concat);
}

module.exports = {
  getUserByAsync: getUserByAsync
}
