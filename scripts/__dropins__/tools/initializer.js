/*! Copyright 2025 Adobe
All Rights Reserved. */
(function(i,e){try{if(typeof document<"u"){const o=e.styleId;if(document.querySelector(`style[data-dropin="${o}"]`))return;const r=document.createElement("style");for(const a in e.attributes)r.setAttribute(a,e.attributes[a]);r.setAttribute("data-dropin",o),r.appendChild(document.createTextNode(i));const t=document.querySelector('link[rel="stylesheet"], style');t?t.before(r):document.head.append(r)}}catch(o){console.error("sdk-styles (injectCodeFunction)",o)}})(`.dropin-pagination button{-moz-appearance:none;appearance:none;-webkit-appearance:none}`,{styleId:"sdk"});
import{I as t,i as e}from"./chunks/initializer.js";import"./chunks/image-params-keymap.js";export{t as Initializer,e as initializers};
