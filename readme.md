# applestore_watcher

[![Greenkeeper badge](https://badges.greenkeeper.io/yeliex/applestore_watcher.svg)](https://greenkeeper.io/)
add the product serial ids and alert the purchas informations every 30 second with system notification
<img width="342" alt="qq20161028-0 2x" src="https://cloud.githubusercontent.com/assets/8470242/19799242/2328cf78-9d28-11e6-857e-4f5ef8b138c3.png">

## uasge 
- edit `target.json`
-  `npm install -g`
- `applestore`

## rules
- target.json [serial:name]
  
  example: 
  
  ```
  {
    "MMEF2CH/A": "AirPods"
  }
  "MMEF2CH/A": serial id of airpods (http://www.apple.com/cn/shop/product/MMEF2CH/A/airpods)
  "AirPods": display name
```
