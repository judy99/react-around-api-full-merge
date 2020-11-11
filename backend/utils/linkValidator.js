const linkValidator = function (link) {
  const regex = new RegExp(/^(http:\/\/|https:\/\/)(w{3}\.)?([\w\-\/\(\):;,\?]+\.{1}?[\w\-\/\(\):;,\?]+)+#?$/, 'gmi');
  return regex.test(link);
};
module.exports = linkValidator;
