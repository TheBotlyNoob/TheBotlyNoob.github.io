"use strict";$(document).ready((async()=>{await(async()=>{$(".middle").wrap("<div class='container'></div>"),$("code").wrap("<pre></pre>"),$("[class$='-icon']").each((function(){$(this).prepend(`<i class="icon fa fa-${$(this).attr("class").split(" ").pop().replace("-icon","")}"></i>`)}))})(),await(async()=>{for(var t=await fetch("https://api.github.com/users/TheBotlyNoob/repos").then((t=>t.json())).then((t=>JSON.parse(JSON.stringify(t)))).catch((t=>{})),r=0;r<t.length;r++){var e,n=t[r];$("#githubRepos").append(`<div class="githubLinkContainer">\n        <a class="githubLink" href="${n.html_url}" target="_blank">\n        <img src="${n.owner.avatar_url}" class="githubImage" alt="GitHub Image"></img>\n        <br>\n        <span>\n        ${n.name}, Issues: ${n.open_issues}, Forks: ${n.forks}\n        </span>\n        <br>\n        <span class="githubDesc">\n        ${null!==(e=n.description)&&void 0!==e?e:""}\n        </span></a>`)}})(),await(async()=>{for(var t=await fetch("https://www.googleapis.com/youtube/v3/search?key=AIzaSyB5rUUrK222E9xTv_nd4cX1y87JP7t0z70&channelId=UCBpQy7-ZNMHhRBQ0gcHGcBw&part=snippet,id&order=date&maxResults=20").then((t=>t.json())).then((t=>JSON.parse(JSON.stringify(t)))).catch((t=>{})),r=0;r<(null===(e=t.items)||void 0===e?void 0:e.length)-1;r++){var e,n,i=t.items[r];i.id.videoId?$("#youtubeVids").append(`<div class="youtubeLinkContainer">\n          <a class="youtubeLink" href="https://youtu.be/${i.id.videoId}" target="_blank">\n          <span>\n          <img class="youtubeImage" src="${i.snippet.thumbnails.default.url}" alt="YouTube Thumbnail"></img>\n          <br>\n          ${i.snippet.title}\n          </span>\n          <br>\n          <span class="youtubeDesc">\n          ${null!==(n=i.snippet.description)&&void 0!==n?n:""}\n          </span></a></div>`):i?.errors[0]?.message&&$("#youtubeVids").append()}})(),await(async()=>{!function t(r,e,n){function i(a,s){if(!e[a]){if(!r[a]){var u="function"==typeof require&&require;if(!s&&u)return u(a,!0);if(o)return o(a,!0);var c=new Error("Cannot find module '"+a+"'");throw c.code="MODULE_NOT_FOUND",c}var h=e[a]={exports:{}};r[a][0].call(h.exports,(function(t){return i(r[a][1][t]||t)}),h,h.exports,t,r,e,n)}return e[a].exports}for(var o="function"==typeof require&&require,a=0;a<n.length;a++)i(n[a]);return i}({1:[function(t,r,e){var n=this&&this.__read||function(t,r){var e="function"==typeof Symbol&&t[Symbol.iterator];if(!e)return t;var n,i,o=e.call(t),a=[];try{for(;(void 0===r||r-- >0)&&!(n=o.next()).done;)a.push(n.value)}catch(t){i={error:t}}finally{try{n&&!n.done&&(e=o.return)&&e.call(o)}finally{if(i)throw i.error}}return a},i=this&&this.__spread||function(){for(var t=[],r=0;r<arguments.length;r++)t=t.concat(n(arguments[r]));return t};Object.defineProperty(e,"__esModule",{value:!0}),e.convertAniBinaryToCSS=void 0;var o=t("./parser");e.convertAniBinaryToCSS=function(t,r){var e=function(t){var r,e=o.parseAni(t),n=null!==(r=e.rate)&&void 0!==r?r:e.images.map((function(){return e.metadata.iDispRate})),a=n.reduce((function(t,r){return t+r}),0),s=e.images.map((function(t){return{url:(e=t,r=e,n=window.btoa(String.fromCharCode.apply(String,i(r))),"data:image/x-win-bitmap;base64,"+n),percents:[]};var r,e,n})),u=0;return n.forEach((function(t,r){var n=e.seq?e.seq[r]:r;s[n].percents.push(u/a*100),u+=t})),{duration:a*(1e3/60),frames:s}}(r),n="ani-cursor-"+s();return"\n    @keyframes "+n+" {\n        "+e.frames.map((function(t){var r=t.url;return t.percents.map((function(t){return t+"%"})).join(", ")+" { cursor: url("+r+"), auto; }"})).join("\n")+"\n    }\n    "+t+":hover {\n        animation: "+n+" "+e.duration+"ms step-end infinite;\n    }\n   "};var a=0,s=function(){return a++}},{"./parser":2}],2:[function(t,r,e){Object.defineProperty(e,"__esModule",{value:!0}),e.parseAni=void 0;var n=t("riff-file"),i=t("byte-data"),o={bits:32,be:!1,signed:!1,fp:!1};e.parseAni=function(t){var r=new n.RIFFFile;r.setSignature(t);var e=r.signature;if("ACON"!==e.format)throw new Error('Expected format. Expected "ACON", got "'+e.format+'"');function a(t,e){var n=r.findChunk(t);return null==n?null:e(n)}var s=a("anih",(function(r){var e=i.unpackArray(t,o,r.chunkData.start,r.chunkData.end);return{cbSize:e[0],nFrames:e[1],nSteps:e[2],iWidth:e[3],iHeight:e[4],iBitCount:e[5],nPlanes:e[6],iDispRate:e[7],bfAttributes:e[8]}}));if(null==s)throw new Error("Did not find anih");var u=a("rate",(function(r){return i.unpackArray(t,o,r.chunkData.start,r.chunkData.end)})),c=a("seq ",(function(r){return i.unpackArray(t,o,r.chunkData.start,r.chunkData.end)})),h=r.findChunk("LIST",!0),f=null==h?void 0:h.find((function(t){return"fram"===t.format}));if(null==f)throw new Error("Did not find fram LIST");var p=f.subChunks.slice(0,s.nFrames).map((function(r){if("icon"!==r.chunkId)throw new Error("Unexpected chunk type in fram: "+r.chunkId);return t.slice(r.chunkData.start,r.chunkData.end)})),d=null,l=null,v=null==h?void 0:h.find((function(t){return"INFO"===t.format}));return null!=v&&v.subChunks.forEach((function(r){switch(r.chunkId){case"INAM":d=i.unpackString(t,r.chunkData.start,r.chunkData.end);break;case"IART":l=i.unpackString(t,r.chunkData.start,r.chunkData.end)}})),{images:p,rate:u,seq:c,metadata:s,artist:l,title:d}}},{"byte-data":3,"riff-file":4}],3:[function(t,r,e){(function(t){(function(){!function(){if(!Object.defineProperty||!function(){try{return Object.defineProperty({},"x",{}),!0}catch(t){return!1}}()){var t=Object.defineProperty;Object.defineProperty=function(r,e,n){if(t)try{return t(r,e,n)}catch(t){}if(r!==Object(r))throw TypeError("Object.defineProperty called on non-object");return Object.prototype.__defineGetter__&&"get"in n&&Object.prototype.__defineGetter__.call(r,e,n.get),Object.prototype.__defineSetter__&&"set"in n&&Object.prototype.__defineSetter__.call(r,e,n.set),"value"in n&&(r[e]=n.value),r}}}();try{Object.getOwnPropertyDescriptor({t:"o"},"t")}catch(t){Object.getOwnPropertyDescriptor=function(t,r){return null!=("function"==typeof t.__lookupGetter__&&"function"==typeof t.__lookupSetter__?t.__lookupGetter__(r)||t.__lookupSetter__(r):null)?{configurable:!0,enumerable:!0,get:t.__lookupGetter__(r),set:t.__lookupSetter__(r)}:{configurable:!0,writable:!0,enumerable:!0,value:t[r]}}}!function(e){e=e||{};var n="function"==typeof Object.defineProperties?Object.defineProperty:function(t,r,e){t!=Array.prototype&&t!=Object.prototype&&(t[r]=e.value)},i="undefined"!=typeof window&&window===this?this:void 0!==t&&null!=t?t:this;function o(t,r,e,n){if((n=void 0===n?t.length:n)%r)throw Error("Bad buffer length.");for(e=void 0===e?0:e;e<n;e+=r){var i=t,o=r,a=e;o--;for(var s=0;s<o;s++){var u=i[a+s];i[a+s]=i[a+o],i[a+o]=u,o--}}}function a(t,r,e){e=void 0===e?0:e;for(var n=0,i=t.length;n<i;n++){var o=t.codePointAt(n);if(128>o)r[e]=o,e++;else{var a=0,s=0;for(2047>=o?(a=1,s=192):65535>=o?(a=2,s=224):1114111>=o&&(a=3,s=240,n++),r[e]=(o>>6*a)+s,e++;0<a;)r[e]=128|o>>6*(a-1)&63,e++,a--}}return e}function s(t,r,e){this.bits=t,this.b=8>t?1:Math.ceil(t/8),this.max=Math.pow(2,t)-1,this.min=0;var n=8-(1+(t-1|7)-t);this.c=Math.pow(2,0<n?n:8)-1,this.unpack=this.h,void 0!==r&&r&&(this.max=Math.pow(2,t)/2-1,this.min=-this.max-1,this.unpack=this.g),void 0!==e&&e&&(this.a=this.f)}function u(t,r,e){e=void 0===e?0:e;for(var n=0,i=0;i<t.b;i++)n+=r[e+i]*Math.pow(256,i);return n}function c(t,r){this.b=t,this.c=r,this.a=(1<<t-1)-1,this.f=Math.ceil((t+r)/8),this.g=Math.pow(2,this.a+1),this.h=t+r,this.i=Math.pow(2,-(8*this.f-1-t))}function h(t){var r=Math.floor(t);return.5>(t-=r)?r:.5<t||r%2?r+1:r}function f(t,r,e,n,i){n=void 0===n?0:n,i=b((r=r||{}).bits,r.fp,r.signed,void 0!==i&&i);var a=Math.ceil(r.bits/8),s=0,u=n;try{for(var c=t.length;s<c;s++)n=i.pack(e,t[s],n);r.be&&o(e,a,u,n)}catch(r){v(r,t[s],s)}return n}function p(t,r,e,n,i,a,s){n=void 0===n?0:n,i=void 0===i?t.length:i,a=void 0!==a&&a,s=b((r=r||{}).bits,r.fp,r.signed,void 0!==s&&s);var u=Math.ceil(r.bits/8),c=(i-n)%u;if(a&&(c||t.length<u))throw Error("Bad buffer length");i-=c,a=0,c=n;try{for(r.be&&o(t,u,n,i);c<i;c+=u,a++)e[a]=s.unpack(t,c);r.be&&o(t,u,n,i)}catch(r){v(r,t.slice(c,c+u),c)}}function d(t,r,e,n,i){return f([t],r,e,void 0===n?0:n,void 0!==i&&i)}function l(t,r,e,n,i,o){var a=[];return p(t,r,a,void 0===e?0:e,n=void 0===n?t.length:n,void 0!==i&&i,void 0!==o&&o),a}function v(t,r,e){throw t.message=t.varructor.name+" at index "+e+": "+r,t}function b(t,r,e,n){if(r){if(!t||16!==t&&32!==t&&64!==t)throw Error("Unsupported type: float, bits: "+t)}else if(!t||1>t||53<t)throw Error("Unsupported type: int, bits: "+t);return r&&16===t?new c(5,11):r&&32==t?new c(8,23):r&&64==t?new c(11,52):new s(t,e,n)}(function(t,r){if(r){for(var e=i,o="String.prototype.codePointAt".split("."),a=0;a<o.length-1;a++){var s=o[a];s in e||(e[s]={}),e=e[s]}(s=r(a=e[o=o[o.length-1]]))!=a&&null!=s&&n(e,o,{configurable:!0,writable:!0,value:s})}})(0,(function(t){return t||function(t){if(null==this)throw new TypeError("The 'this' value for String.prototype.codePointAt must not be null or undefined");var r=this.length;if(0<=(t=Number(t)||0)&&t<r){t|=0;var e=this.charCodeAt(t);return 55296>e||56319<e||t+1===r||56320>(t=this.charCodeAt(t+1))||57343<t?e:1024*(e-55296)+t+9216}}})),Object.defineProperty(e,"__esModule",{value:!0}),s.prototype.pack=function(t,r,e){if(e=void 0===e?0:e,r!=r||r.varructor!=Number)throw new TypeError;r=this.a(r),t[e]=255&(0>r?r+Math.pow(2,this.bits):r),e++;for(var n=2,i=this.b;n<i;n++)t[e]=255&Math.floor(r/Math.pow(2,8*(n-1))),e++;return 8<this.bits&&(t[e]=Math.floor(r/Math.pow(2,8*(this.b-1)))&this.c,e++),e},s.prototype.h=function(t,r){return this.a(u(this,t,void 0===r?0:r))},s.prototype.g=function(t,r){var e=u(this,t,void 0===r?0:r);return e>this.max&&(e-=2*this.max+2),this.a(e)},s.prototype.a=function(t){if(t>this.max||t<this.min)throw new RangeError;return t},s.prototype.f=function(t){return t>this.max?this.max:t<this.min?this.min:t},c.prototype.pack=function(t,r,e){if("number"!=typeof r)throw new TypeError;Math.abs(r)>this.g-2*this.h&&(r=0>r?-1/0:1/0);var n=0>((r=+r)||1/r)||0>r?1:0;r=Math.abs(r);var i=Math.min(Math.floor(Math.log(r)/Math.LN2),1023),o=h(r/Math.pow(2,i)*Math.pow(2,this.c));for(r!=r?(o=Math.pow(2,this.c-1),i=(1<<this.b)-1):0!==r&&(r>=Math.pow(2,1-this.a)?(2<=o/Math.pow(2,this.c)&&(i++,o=1),i>this.a?(i=(1<<this.b)-1,o=0):(i+=this.a,o=h(o)-Math.pow(2,this.c))):(o=h(r/Math.pow(2,1-this.a-this.c)),i=0)),(r=[]).push(n),n=this.b;0<n;--n)r[n]=i%2?1:0,i=Math.floor(i/2);for(n=r.length,i=this.c;0<i;--i)r[n+i]=o%2?1:0,o=Math.floor(o/2);for(n=r.join(""),o=this.f+e-1,r=e;o>=e;)t[o]=parseInt(n.substring(0,8),2),n=n.substring(8),o--,r++;return r},c.prototype.unpack=function(t,r){for(var e=(1<<this.b)-1,n="",i=this.f-1;0<=i;i--){var o=t[i+r].toString(2);n+="00000000".substring(o.length)+o}return i="1"==n.charAt(0)?-1:1,n=n.substring(1),o=parseInt(n.substring(0,this.b),2),n=n.substring(this.b),o==e?0!==parseInt(n,2)?NaN:1/0*i:(0===o?(o++,e=parseInt(n,2)):e=parseInt("1"+n,2),i*e*this.i*Math.pow(2,o-this.a))},e.pack=function(t,r,e){var n=[];return d(t,r,n,0,void 0!==e&&e),n},e.packArray=function(t,r,e){var n=[];return f(t,r,n,0,void 0!==e&&e),n},e.packArrayTo=f,e.packString=function(t){var r=[];return a(t,r,0),r},e.packStringTo=function(t,r,e){return a(t,r,void 0===e?0:e)},e.packTo=d,e.unpack=function(t,r,e,n){return l(t,r,e=void 0===e?0:e,e+Math.ceil(r.bits/8),!0,void 0!==n&&n)[0]},e.unpackArray=l,e.unpackArrayTo=p,e.unpackString=function(t,r,e){var n=void 0===r?0:r;for(e=void 0===(e=void 0===e?t.length:e)?t.length:e,r="",n=void 0===n?0:n;n<e;){var i=128,o=191,a=!1,s=t[n++];if(0<=s&&127>=s)r+=String.fromCharCode(s);else{var u=0;194<=s&&223>=s?u=1:224<=s&&239>=s?(u=2,224===t[n]&&(i=160),237===t[n]&&(o=159)):240<=s&&244>=s?(u=3,240===t[n]&&(i=144),244===t[n]&&(o=143)):a=!0,s&=(1<<8-u-1)-1;for(var c=0;c<u;c++)(t[n]<i||t[n]>o)&&(a=!0),s=s<<6|63&t[n],n++;a?r+=String.fromCharCode(65533):65535>=s?r+=String.fromCharCode(s):(s-=65536,r+=String.fromCharCode(55296+(s>>10&1023),56320+(1023&s)))}}return r},void 0!==r?r.exports=e:"function"==typeof define&&define.amd?define(["exports"],e):void 0!==t&&(t.byteData=e)}()}).call(this)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],4:[function(t,r,e){var n,i="function"==typeof Object.create?Object.create:function(t){function r(){}return r.prototype=t,new r};if("function"==typeof Object.setPrototypeOf)n=Object.setPrototypeOf;else{var o;t:{var a={};try{a.__proto__={h:!0},o=a.h;break t}catch(t){}o=!1}n=o?function(t,r){if(t.__proto__=r,t.__proto__!==r)throw new TypeError(t+" is not extensible");return t}:null}var s=n,u=this;function c(t){function r(){this.container="",this.chunkSize=0,this.format="",this.signature=null,this.head=0,this.uInt32={bits:32,be:!1,signed:!1,fp:!1},this.supported_containers=["RIFF","RIFX"]}function e(t,r,e){if(r){if(!t||16!==t&&32!==t&&64!==t)throw Error("Unsupported type: float, bits: "+t);r=this.a(t)}else{if(!t||1>t||53<t)throw Error("Unsupported type: int, bits: "+t);r=e?new n(t):new o(t)}this.b=r,this.offset=Math.ceil(t/8)}function n(t){return(t=o.call(this,t)||this).max=Math.pow(2,t.bits)/2-1,t.min=-t.max-1,t}function o(t){this.bits=t,this.c=8>t?1:Math.ceil(t/8),this.max=Math.pow(2,t)-1,this.min=0}function a(t,r){this.a=t,this.c=(1<<t-1)-1,this.b=Math.ceil((t+r)/8),this.f=Math.pow(2,-(8*this.b-1-t))}function u(t,r,e,n){if((n=void 0===n?t.length:n)%r)throw Error("Bad buffer length.");for(e=void 0===e?0:e;e<n;e+=r){var i=t,o=r,a=e;o--;for(var s=0;s<o;s++){var u=i[a+s];i[a+s]=i[a+o],i[a+o]=u,o--}}}function c(t,r,e){var n=void 0===r?0:r;for(e=void 0===(e=void 0===e?t.length:e)?t.length:e,r="",n=void 0===n?0:n;n<e;){var i=128,o=191,a=!1,s=t[n++];if(0<=s&&127>=s)r+=String.fromCharCode(s);else{var u=0;194<=s&&223>=s?u=1:224<=s&&239>=s?(u=2,224===t[n]&&(i=160),237===t[n]&&(o=159)):240<=s&&244>=s?(u=3,240===t[n]&&(i=144),244===t[n]&&(o=143)):a=!0,s&=(1<<8-u-1)-1;for(var c=0;c<u;c++)(t[n]<i||t[n]>o)&&(a=!0),s=s<<6|63&t[n],n++;a?r+=String.fromCharCode(65533):65535>=s?r+=String.fromCharCode(s):(s-=65536,r+=String.fromCharCode(55296+(s>>10&1023),56320+(1023&s)))}}return r}function h(t,r,n){var i=(n=void 0===n?0:n)+Math.ceil(r.bits/8),o=[],a=!0;n=void 0===(n=void 0===n?0:n)?0:n,i=void 0===(i=void 0===i?t.length:i)?t.length:i,a=void 0!==a&&a;var s=r||{},c=new e(s.bits,s.fp,s.signed),h=(i-n)%(r=c.offset);if(a&&(h||t.length<r))throw Error("Bad buffer length");i-=h,h=0,a=n;try{for(s.be&&u(t,r,n,i);a<i;a+=r,h++)o[h]=c.g(t,a);s.be&&u(t,r,n,i)}catch(e){throw(o=e).message=o.varructor.name+" at index "+a+": "+t.slice(a,a+r),o}return o[0]}a.prototype.g=function(t,r){for(var e=(1<<this.a)-1,n="",i=this.b-1;0<=i;i--){var o=t[i+r].toString(2);n+="00000000".substring(o.length)+o}return i="1"==n.charAt(0)?-1:1,n=n.substring(1),o=parseInt(n.substring(0,this.a),2),n=n.substring(this.a),o==e?0!==parseInt(n,2)?NaN:1/0*i:(0===o?(o++,e=parseInt(n,2)):e=parseInt("1"+n,2),i*e*this.f*Math.pow(2,o-this.c))},o.prototype.g=function(t,r){var e=this.b(t,void 0===r?0:r);return this.a(e),e},o.prototype.b=function(t,r){r=void 0===r?0:r;for(var e=0,n=0;n<this.c;n++)e+=t[r+n]*Math.pow(256,n);return e},o.prototype.a=function(t){if(t>this.max||t<this.min)throw new RangeError},function(t,r){if(t.prototype=i(r.prototype),t.prototype.varructor=t,s)s(t,r);else for(var e in r)if("prototype"!=e)if(Object.defineProperties){var n=Object.getOwnPropertyDescriptor(r,e);n&&Object.defineProperty(t,e,n)}else t[e]=r[e]}(n,o),n.prototype.g=function(t,r){var e=o.prototype.b.call(this,t,void 0===r?0:r);return e=this.f(e),this.a(e),e},n.prototype.f=function(t){return t>this.max&&(t-=2*this.max+2),t},e.prototype.g=function(t,r){return this.b.g(t,void 0===r?0:r)},e.prototype.a=function(t){return 16===t?new a(5,11):32===t?new a(8,23):new a(11,52)},r.prototype.setSignature=function(t){if(this.head=0,this.container=this.readString(t,4),-1===this.supported_containers.indexOf(this.container))throw Error("Not a supported format.");this.uInt32.be="RIFX"===this.container,this.chunkSize=this.readUInt32(t),this.format=this.readString(t,4),this.signature={chunkId:this.container,chunkSize:this.chunkSize,format:this.format,subChunks:this.a(t),chunkData:{start:0,end:this.chunkSize}}},r.prototype.findChunk=function(t,r){r=void 0!==r&&r;for(var e=this.signature.subChunks,n=[],i=0;i<e.length;i++)if(e[i].chunkId==t){if(!r)return e[i];n.push(e[i])}return"LIST"==t&&n.length?n:null},r.prototype.readString=function(t,r){var e=c(t,this.head,this.head+r);return this.head+=r,e},r.prototype.readUInt32=function(t){return t=h(t,this.uInt32,this.head),this.head+=4,t},r.prototype.a=function(t){for(var r=[],e=this.head;e<=t.length-8;)r.push(this.f(t,e)),e=(e+=8+r[r.length-1].chunkSize)%2?e+1:e;return r},r.prototype.f=function(t,r){var e={chunkId:this.b(t,r),chunkSize:this.c(t,r)};return"LIST"==e.chunkId?(e.format=c(t,r+8,r+12),this.head+=4,e.subChunks=this.a(t)):(this.head=r+8+(e.chunkSize%2?e.chunkSize+1:e.chunkSize),e.chunkData={start:r+8,end:this.head}),e},r.prototype.b=function(t,r){return this.head+=4,c(t,r,r+4)},r.prototype.c=function(t,r){return this.head+=4,h(t,this.uInt32,r+4)},t.RIFFFile=r,Object.defineProperty(t,"__esModule",{value:!0})}"object"==typeof e&&void 0!==r?c(e):"function"==typeof define&&define.i?define(["exports"],c):c((u=u||self).riffFile={})},{}],5:[function(t){var r=t("ani-cursor").convertAniBinaryToCSS,e=async(t,e)=>{var n=await fetch(e),i=new Uint8Array(await n.arrayBuffer()),o=document.createElement("style");o.innerText=r(t,i),document.head.appendChild(o)};$("*").each((function(){var t=$(this).css("cursor"),r=$(this);switch(r.attr("id")||r.attr("id",`${String.fromCharCode(97+Math.floor(26*Math.random()))}${Math.random().toString(36).substr(2,9)}`),t){case"pointer":e(`#${r.attr("id")}`,"/assets/cursors/pointer.ani");break;case"move":e(`#${r.attr("id")}`,"/assets/cursors/move.ani");break;case"progress":e(`#${r.attr("id")}`,"/assets/cursors/progress.ani");break;case"wait":e(`#${r.attr("id")}`,"/assets/cursors/wait.ani");break;case"up":e(`#${r.attr("id")}`,"/assets/cursors/up.ani");break;case"pen":e(`#${r.attr("id")}`,"/assets/cursors/pen.ani");break;case"e-resize":e(`#${c.attr("id")}`,"/assets/cursors/ew-resize.ani");break;case"w-resize":e(`#${r.attr("id")}`,"/assets/cursors/ew-resize.ani");break;case"nw-resize":e(`#${r.attr("id")}`,"/assets/cursors/nwse-resize.ani");break;case"se-resize":e(`#${r.attr("id")}`,"/assets/cursors/nwse-resize.ani");break;case"n-resize":e(`#${r.attr("id")}`,"/assets/cursors/ns-resize.ani");break;case"text":r.css("cursor",'url("/assets/cursors/text.cur"),auto');break;case"help":r.css("cursor",'url("/assets/cursors/text.cur"),auto');break;case"not-allowed":r.css("cursor",'url("/assets/cursors/text.cur"),auto');break;case"crosshair":r.css("cursor",'url("/assets/cursors/text.cur"),auto');break;default:r.css("cursor",'url("/assets/cursors/default.cur"),auto');break}}))},{"ani-cursor":1}]},{},[5])})(),await(async()=>{for(var t={},r=await fetch("https://raw.githubusercontent.com/github/gemoji/master/db/emoji.json").then((t=>t.json())).then((t=>JSON.parse(JSON.stringify(t)))).catch((t=>{})),e=0;e<r.length;e++)for(var n=0;n<(null===(i=r[e])||void 0===i||null===(o=i.aliases)||void 0===o?void 0:o.length);n++){var i,o,a,s;$.extend(t,{[null===(a=r[e])||void 0===a?void 0:a.aliases[n]]:{emoji:null===(s=r[e])||void 0===s?void 0:s.emoji}})}$("*").not("body").not("header").not("div").not("style").not("script").each((function(){var r,e=$(this).text().match(":(.*):");e=e?e[1]:"";var n=null===(r=t[e])||void 0===r?void 0:r.emoji;n&&$(this).text($(this).text().replace(`:${e}:`,n))}))})()}));