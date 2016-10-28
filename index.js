#!/usr/bin/env node
const fetch = require('autofetch');
const notifier = require('node-notifier');

fetch.baseHost('http://www.apple.com/cn/shop/delivery-message?parts.0=');
fetch.callback((response) => {
  if (!response.ok) {
    notification(`get ${response.url} error`);
    process.exit();
  }
  return response.text().then((responseText) => {
    return JSON.parse(responseText)
  });
});

const notification = (message, sound, callback) => {
  notifier.notify({
    title: 'AppleStore Alerter',
    message,
    sound,
    wait: typeof callback === 'function',
    callback
  });

  notifier.on('click', (...props) => {
    typeof callback === 'function' ? callback(...props) : () => {
    };
  });
};

const links = require('./target.json');

const parser = (url) => {
  return fetch(`//${url}&_=${new Date().getTime()}`).then((response) => {
    const informations = response.body.content.deliveryMessage[url];
    const deliverInfo = informations.deliveryOptionMessages.join(' ');
    const deliverOpts = informations.deliveryOptions.map((opt) => {
      return Object.keys(opt).map((key) => opt[key]).join(' ')
    }).join('\n');
    notification(`${links instanceof Array ? url : links[url]} ${informations.orderByDeliveryBy}\n${deliverInfo.match(/暂无供应/) ? deliverInfo : deliverOpts}`, true);
    return true;
  }).catch((error) => {
    notification(`${links instanceof Array ? url : links[url]}\n${error}`);
    process.exit();
  });
};

const actions = () => {
  const group = (links instanceof Array ? links : Object.keys(links)).map(url => parser(url));
  Promise.all(group).then(
    () => {
      setTimeout(actions, 30000);
    }
  ).catch((e)=>{
    console.log(e)
  })
};

actions();

