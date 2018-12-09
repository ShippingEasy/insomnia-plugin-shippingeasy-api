const ShippingEasy = require('shippingeasy');

const appendSigningQuerystrings = context => {
  const settings = context.request.getEnvironmentVariable('SHIPPINGEASY');

  if (!settings) {
    return;
  }

  const {api_key, api_secret, trigger} = settings;
  const timestamp = Math.floor(Date.now() / 1000);

  // By default, apply the plugin to all requests when the SHIPPINGEASY settings
  // are defined. If you want more fine-grained control, set "trigger": "querystring"
  // in the Environment settings, and only requests that have a querystring key
  // of "shippingeasy" will have the plugin applied.
  if (trigger === "querystring"){
    if (context.request.hasParameter("shippingeasy")){
      context.request.removeParameter("shippingeasy");
    } else {
      return;
    }
  }

  // Handle the fact that the ShippingEasy backend always assumes a default
  // JSON body when calculating the signature
  let body = context.request.getBodyText();
  if (!body.length){
    body = "{}"
    context.request.setBodyText(body);
  }

  context.request.setParameter("api_timestamp", timestamp);
  context.request.setParameter("api_key", api_key);

  const path = new URL(context.request.getUrl()).pathname;
  const method = context.request.getMethod();
  const params = context.request.getParameters().reduce((result, item) => {
    result[item.name] = item.value;
    return result;
  }, {});

  const signature = ShippingEasy.sign(api_secret, method, path, params, body)
  context.request.setParameter("api_signature", signature);
}

module.exports.requestHooks = [
  appendSigningQuerystrings
];
