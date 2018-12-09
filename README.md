# insomnia-plugin-shippingeasy-api
Plugin for [Insomnia](https://insomnia.rest/) to sign requests to the [ShippingEasy API](https://shippingeasy.readme.io/docs)

## Usage

1) Install the plugin

2) Add a `SHIPPINGEASY` section to your Insomnia Environment, and define the `api_key` and `api_secret` values that identify the ShippingEasy account.

```
{
  "SHIPPINGEASY": {
    "api_key": "2c3b363eee0fa1bb2c76794df68087d1",
    "api_secret": "4289c9406ac501c5b6a780a9418391da359493e6e5eadea998a06a1bc65f5d40"
  }
}
```

3) Build a Request as usual, but you can leave off the `api_timestamp`, `api_key`, and `api_signature` querystring values that are usually required.
These will be automatically calculated and appended to your request before it is sent to ShippingEasy.


By default, this plugin will modify _all_ requests, if the `SHIPPINGEASY` section is defined in the current environment.
If you want to opt-in, add `"trigger": "querystring"` to your `SHIPPINGEASY` Environment variable declaration.
When you want a request to be modified by the plugin, add the querystring key `shippingeasy` (value does not matter) to the request.
