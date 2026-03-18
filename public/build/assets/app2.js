function pa(e,t){return function(){return e.apply(t,arguments)}}const{toString:ao}=Object.prototype,{getPrototypeOf:zt}=Object,{iterator:Et,toStringTag:ga}=Symbol,wt=(e=>t=>{const n=ao.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),oe=e=>(e=e.toLowerCase(),t=>wt(t)===e),Bt=e=>t=>typeof t===e,{isArray:Me}=Array,Le=Bt("undefined");function Je(e){return e!==null&&!Le(e)&&e.constructor!==null&&!Le(e.constructor)&&Y(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const fa=oe("ArrayBuffer");function oo(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&fa(e.buffer),t}const ro=Bt("string"),Y=Bt("function"),ba=Bt("number"),Ke=e=>e!==null&&typeof e=="object",so=e=>e===!0||e===!1,at=e=>{if(wt(e)!=="object")return!1;const t=zt(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(ga in e)&&!(Et in e)},io=e=>{if(!Ke(e)||Je(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},lo=oe("Date"),co=oe("File"),uo=e=>!!(e&&typeof e.uri<"u"),mo=e=>e&&typeof e.getParts<"u",po=oe("Blob"),go=oe("FileList"),fo=e=>Ke(e)&&Y(e.pipe);function bo(){return typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}}const pn=bo(),gn=typeof pn.FormData<"u"?pn.FormData:void 0,ko=e=>{let t;return e&&(gn&&e instanceof gn||Y(e.append)&&((t=wt(e))==="formdata"||t==="object"&&Y(e.toString)&&e.toString()==="[object FormData]"))},ho=oe("URLSearchParams"),[yo,vo,Eo,wo]=["ReadableStream","Request","Response","Headers"].map(oe),Bo=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function ze(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let a,o;if(typeof e!="object"&&(e=[e]),Me(e))for(a=0,o=e.length;a<o;a++)t.call(null,e[a],a,e);else{if(Je(e))return;const r=n?Object.getOwnPropertyNames(e):Object.keys(e),s=r.length;let i;for(a=0;a<s;a++)i=r[a],t.call(null,e[i],i,e)}}function ka(e,t){if(Je(e))return null;t=t.toLowerCase();const n=Object.keys(e);let a=n.length,o;for(;a-- >0;)if(o=n[a],t===o.toLowerCase())return o;return null}const ge=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,ha=e=>!Le(e)&&e!==ge;function qt(){const{caseless:e,skipUndefined:t}=ha(this)&&this||{},n={},a=(o,r)=>{if(r==="__proto__"||r==="constructor"||r==="prototype")return;const s=e&&ka(n,r)||r;at(n[s])&&at(o)?n[s]=qt(n[s],o):at(o)?n[s]=qt({},o):Me(o)?n[s]=o.slice():(!t||!Le(o))&&(n[s]=o)};for(let o=0,r=arguments.length;o<r;o++)arguments[o]&&ze(arguments[o],a);return n}const Io=(e,t,n,{allOwnKeys:a}={})=>(ze(t,(o,r)=>{n&&Y(o)?Object.defineProperty(e,r,{value:pa(o,n),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(e,r,{value:o,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:a}),e),_o=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),$o=(e,t,n,a)=>{e.prototype=Object.create(t.prototype,a),Object.defineProperty(e.prototype,"constructor",{value:e,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},So=(e,t,n,a)=>{let o,r,s;const i={};if(t=t||{},e==null)return t;do{for(o=Object.getOwnPropertyNames(e),r=o.length;r-- >0;)s=o[r],(!a||a(s,e,t))&&!i[s]&&(t[s]=e[s],i[s]=!0);e=n!==!1&&zt(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},Co=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const a=e.indexOf(t,n);return a!==-1&&a===n},xo=e=>{if(!e)return null;if(Me(e))return e;let t=e.length;if(!ba(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},Lo=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&zt(Uint8Array)),To=(e,t)=>{const a=(e&&e[Et]).call(e);let o;for(;(o=a.next())&&!o.done;){const r=o.value;t.call(e,r[0],r[1])}},Ao=(e,t)=>{let n;const a=[];for(;(n=e.exec(t))!==null;)a.push(n);return a},Mo=oe("HTMLFormElement"),Ro=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,a,o){return a.toUpperCase()+o}),fn=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),Po=oe("RegExp"),ya=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),a={};ze(n,(o,r)=>{let s;(s=t(o,r,e))!==!1&&(a[r]=s||o)}),Object.defineProperties(e,a)},Do=e=>{ya(e,(t,n)=>{if(Y(e)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const a=e[n];if(Y(a)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},Oo=(e,t)=>{const n={},a=o=>{o.forEach(r=>{n[r]=!0})};return Me(e)?a(e):a(String(e).split(t)),n},jo=()=>{},qo=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function No(e){return!!(e&&Y(e.append)&&e[ga]==="FormData"&&e[Et])}const Uo=e=>{const t=new Array(10),n=(a,o)=>{if(Ke(a)){if(t.indexOf(a)>=0)return;if(Je(a))return a;if(!("toJSON"in a)){t[o]=a;const r=Me(a)?[]:{};return ze(a,(s,i)=>{const c=n(s,o+1);!Le(c)&&(r[i]=c)}),t[o]=void 0,r}}return a};return n(e,0)},Ho=oe("AsyncFunction"),Fo=e=>e&&(Ke(e)||Y(e))&&Y(e.then)&&Y(e.catch),va=((e,t)=>e?setImmediate:t?((n,a)=>(ge.addEventListener("message",({source:o,data:r})=>{o===ge&&r===n&&a.length&&a.shift()()},!1),o=>{a.push(o),ge.postMessage(n,"*")}))(`axios@${Math.random()}`,[]):n=>setTimeout(n))(typeof setImmediate=="function",Y(ge.postMessage)),Go=typeof queueMicrotask<"u"?queueMicrotask.bind(ge):typeof process<"u"&&process.nextTick||va,Vo=e=>e!=null&&Y(e[Et]),m={isArray:Me,isArrayBuffer:fa,isBuffer:Je,isFormData:ko,isArrayBufferView:oo,isString:ro,isNumber:ba,isBoolean:so,isObject:Ke,isPlainObject:at,isEmptyObject:io,isReadableStream:yo,isRequest:vo,isResponse:Eo,isHeaders:wo,isUndefined:Le,isDate:lo,isFile:co,isReactNativeBlob:uo,isReactNative:mo,isBlob:po,isRegExp:Po,isFunction:Y,isStream:fo,isURLSearchParams:ho,isTypedArray:Lo,isFileList:go,forEach:ze,merge:qt,extend:Io,trim:Bo,stripBOM:_o,inherits:$o,toFlatObject:So,kindOf:wt,kindOfTest:oe,endsWith:Co,toArray:xo,forEachEntry:To,matchAll:Ao,isHTMLForm:Mo,hasOwnProperty:fn,hasOwnProp:fn,reduceDescriptors:ya,freezeMethods:Do,toObjectSet:Oo,toCamelCase:Ro,noop:jo,toFiniteNumber:qo,findKey:ka,global:ge,isContextDefined:ha,isSpecCompliantForm:No,toJSONObject:Uo,isAsyncFn:Ho,isThenable:Fo,setImmediate:va,asap:Go,isIterable:Vo};let I=class Ea extends Error{static from(t,n,a,o,r,s){const i=new Ea(t.message,n||t.code,a,o,r);return i.cause=t,i.name=t.name,t.status!=null&&i.status==null&&(i.status=t.status),s&&Object.assign(i,s),i}constructor(t,n,a,o,r){super(t),Object.defineProperty(this,"message",{value:t,enumerable:!0,writable:!0,configurable:!0}),this.name="AxiosError",this.isAxiosError=!0,n&&(this.code=n),a&&(this.config=a),o&&(this.request=o),r&&(this.response=r,this.status=r.status)}toJSON(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:m.toJSONObject(this.config),code:this.code,status:this.status}}};I.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";I.ERR_BAD_OPTION="ERR_BAD_OPTION";I.ECONNABORTED="ECONNABORTED";I.ETIMEDOUT="ETIMEDOUT";I.ERR_NETWORK="ERR_NETWORK";I.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";I.ERR_DEPRECATED="ERR_DEPRECATED";I.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";I.ERR_BAD_REQUEST="ERR_BAD_REQUEST";I.ERR_CANCELED="ERR_CANCELED";I.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";I.ERR_INVALID_URL="ERR_INVALID_URL";const Jo=null;function Nt(e){return m.isPlainObject(e)||m.isArray(e)}function wa(e){return m.endsWith(e,"[]")?e.slice(0,-2):e}function Lt(e,t,n){return e?e.concat(t).map(function(o,r){return o=wa(o),!n&&r?"["+o+"]":o}).join(n?".":""):t}function Ko(e){return m.isArray(e)&&!e.some(Nt)}const zo=m.toFlatObject(m,{},null,function(t){return/^is[A-Z]/.test(t)});function It(e,t,n){if(!m.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=m.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(b,g){return!m.isUndefined(g[b])});const a=n.metaTokens,o=n.visitor||l,r=n.dots,s=n.indexes,c=(n.Blob||typeof Blob<"u"&&Blob)&&m.isSpecCompliantForm(t);if(!m.isFunction(o))throw new TypeError("visitor must be a function");function d(p){if(p===null)return"";if(m.isDate(p))return p.toISOString();if(m.isBoolean(p))return p.toString();if(!c&&m.isBlob(p))throw new I("Blob is not supported. Use a Buffer instead.");return m.isArrayBuffer(p)||m.isTypedArray(p)?c&&typeof Blob=="function"?new Blob([p]):Buffer.from(p):p}function l(p,b,g){let E=p;if(m.isReactNative(t)&&m.isReactNativeBlob(p))return t.append(Lt(g,b,r),d(p)),!1;if(p&&!g&&typeof p=="object"){if(m.endsWith(b,"{}"))b=a?b:b.slice(0,-2),p=JSON.stringify(p);else if(m.isArray(p)&&Ko(p)||(m.isFileList(p)||m.endsWith(b,"[]"))&&(E=m.toArray(p)))return b=wa(b),E.forEach(function(L,R){!(m.isUndefined(L)||L===null)&&t.append(s===!0?Lt([b],R,r):s===null?b:b+"[]",d(L))}),!1}return Nt(p)?!0:(t.append(Lt(g,b,r),d(p)),!1)}const k=[],v=Object.assign(zo,{defaultVisitor:l,convertValue:d,isVisitable:Nt});function A(p,b){if(!m.isUndefined(p)){if(k.indexOf(p)!==-1)throw Error("Circular reference detected in "+b.join("."));k.push(p),m.forEach(p,function(E,P){(!(m.isUndefined(E)||E===null)&&o.call(t,E,m.isString(P)?P.trim():P,b,v))===!0&&A(E,b?b.concat(P):[P])}),k.pop()}}if(!m.isObject(e))throw new TypeError("data must be an object");return A(e),t}function bn(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(a){return t[a]})}function Wt(e,t){this._pairs=[],e&&It(e,this,t)}const Ba=Wt.prototype;Ba.append=function(t,n){this._pairs.push([t,n])};Ba.toString=function(t){const n=t?function(a){return t.call(this,a,bn)}:bn;return this._pairs.map(function(o){return n(o[0])+"="+n(o[1])},"").join("&")};function Wo(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function Ia(e,t,n){if(!t)return e;const a=n&&n.encode||Wo,o=m.isFunction(n)?{serialize:n}:n,r=o&&o.serialize;let s;if(r?s=r(t,o):s=m.isURLSearchParams(t)?t.toString():new Wt(t,o).toString(a),s){const i=e.indexOf("#");i!==-1&&(e=e.slice(0,i)),e+=(e.indexOf("?")===-1?"?":"&")+s}return e}class kn{constructor(){this.handlers=[]}use(t,n,a){return this.handlers.push({fulfilled:t,rejected:n,synchronous:a?a.synchronous:!1,runWhen:a?a.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){m.forEach(this.handlers,function(a){a!==null&&t(a)})}}const Xt={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0},Xo=typeof URLSearchParams<"u"?URLSearchParams:Wt,Zo=typeof FormData<"u"?FormData:null,Qo=typeof Blob<"u"?Blob:null,Yo={isBrowser:!0,classes:{URLSearchParams:Xo,FormData:Zo,Blob:Qo},protocols:["http","https","file","blob","url","data"]},Zt=typeof window<"u"&&typeof document<"u",Ut=typeof navigator=="object"&&navigator||void 0,er=Zt&&(!Ut||["ReactNative","NativeScript","NS"].indexOf(Ut.product)<0),tr=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",nr=Zt&&window.location.href||"http://localhost",ar=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:Zt,hasStandardBrowserEnv:er,hasStandardBrowserWebWorkerEnv:tr,navigator:Ut,origin:nr},Symbol.toStringTag,{value:"Module"})),Q={...ar,...Yo};function or(e,t){return It(e,new Q.classes.URLSearchParams,{visitor:function(n,a,o,r){return Q.isNode&&m.isBuffer(n)?(this.append(a,n.toString("base64")),!1):r.defaultVisitor.apply(this,arguments)},...t})}function rr(e){return m.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function sr(e){const t={},n=Object.keys(e);let a;const o=n.length;let r;for(a=0;a<o;a++)r=n[a],t[r]=e[r];return t}function _a(e){function t(n,a,o,r){let s=n[r++];if(s==="__proto__")return!0;const i=Number.isFinite(+s),c=r>=n.length;return s=!s&&m.isArray(o)?o.length:s,c?(m.hasOwnProp(o,s)?o[s]=[o[s],a]:o[s]=a,!i):((!o[s]||!m.isObject(o[s]))&&(o[s]=[]),t(n,a,o[s],r)&&m.isArray(o[s])&&(o[s]=sr(o[s])),!i)}if(m.isFormData(e)&&m.isFunction(e.entries)){const n={};return m.forEachEntry(e,(a,o)=>{t(rr(a),o,n,0)}),n}return null}function ir(e,t,n){if(m.isString(e))try{return(t||JSON.parse)(e),m.trim(e)}catch(a){if(a.name!=="SyntaxError")throw a}return(n||JSON.stringify)(e)}const We={transitional:Xt,adapter:["xhr","http","fetch"],transformRequest:[function(t,n){const a=n.getContentType()||"",o=a.indexOf("application/json")>-1,r=m.isObject(t);if(r&&m.isHTMLForm(t)&&(t=new FormData(t)),m.isFormData(t))return o?JSON.stringify(_a(t)):t;if(m.isArrayBuffer(t)||m.isBuffer(t)||m.isStream(t)||m.isFile(t)||m.isBlob(t)||m.isReadableStream(t))return t;if(m.isArrayBufferView(t))return t.buffer;if(m.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let i;if(r){if(a.indexOf("application/x-www-form-urlencoded")>-1)return or(t,this.formSerializer).toString();if((i=m.isFileList(t))||a.indexOf("multipart/form-data")>-1){const c=this.env&&this.env.FormData;return It(i?{"files[]":t}:t,c&&new c,this.formSerializer)}}return r||o?(n.setContentType("application/json",!1),ir(t)):t}],transformResponse:[function(t){const n=this.transitional||We.transitional,a=n&&n.forcedJSONParsing,o=this.responseType==="json";if(m.isResponse(t)||m.isReadableStream(t))return t;if(t&&m.isString(t)&&(a&&!this.responseType||o)){const s=!(n&&n.silentJSONParsing)&&o;try{return JSON.parse(t,this.parseReviver)}catch(i){if(s)throw i.name==="SyntaxError"?I.from(i,I.ERR_BAD_RESPONSE,this,null,this.response):i}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:Q.classes.FormData,Blob:Q.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};m.forEach(["delete","get","head","post","put","patch"],e=>{We.headers[e]={}});const dr=m.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),lr=e=>{const t={};let n,a,o;return e&&e.split(`
`).forEach(function(s){o=s.indexOf(":"),n=s.substring(0,o).trim().toLowerCase(),a=s.substring(o+1).trim(),!(!n||t[n]&&dr[n])&&(n==="set-cookie"?t[n]?t[n].push(a):t[n]=[a]:t[n]=t[n]?t[n]+", "+a:a)}),t},hn=Symbol("internals");function Pe(e){return e&&String(e).trim().toLowerCase()}function ot(e){return e===!1||e==null?e:m.isArray(e)?e.map(ot):String(e)}function cr(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let a;for(;a=n.exec(e);)t[a[1]]=a[2];return t}const ur=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function Tt(e,t,n,a,o){if(m.isFunction(a))return a.call(this,t,n);if(o&&(t=n),!!m.isString(t)){if(m.isString(a))return t.indexOf(a)!==-1;if(m.isRegExp(a))return a.test(t)}}function mr(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,a)=>n.toUpperCase()+a)}function pr(e,t){const n=m.toCamelCase(" "+t);["get","set","has"].forEach(a=>{Object.defineProperty(e,a+n,{value:function(o,r,s){return this[a].call(this,t,o,r,s)},configurable:!0})})}let ee=class{constructor(t){t&&this.set(t)}set(t,n,a){const o=this;function r(i,c,d){const l=Pe(c);if(!l)throw new Error("header name must be a non-empty string");const k=m.findKey(o,l);(!k||o[k]===void 0||d===!0||d===void 0&&o[k]!==!1)&&(o[k||c]=ot(i))}const s=(i,c)=>m.forEach(i,(d,l)=>r(d,l,c));if(m.isPlainObject(t)||t instanceof this.constructor)s(t,n);else if(m.isString(t)&&(t=t.trim())&&!ur(t))s(lr(t),n);else if(m.isObject(t)&&m.isIterable(t)){let i={},c,d;for(const l of t){if(!m.isArray(l))throw TypeError("Object iterator must return a key-value pair");i[d=l[0]]=(c=i[d])?m.isArray(c)?[...c,l[1]]:[c,l[1]]:l[1]}s(i,n)}else t!=null&&r(n,t,a);return this}get(t,n){if(t=Pe(t),t){const a=m.findKey(this,t);if(a){const o=this[a];if(!n)return o;if(n===!0)return cr(o);if(m.isFunction(n))return n.call(this,o,a);if(m.isRegExp(n))return n.exec(o);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=Pe(t),t){const a=m.findKey(this,t);return!!(a&&this[a]!==void 0&&(!n||Tt(this,this[a],a,n)))}return!1}delete(t,n){const a=this;let o=!1;function r(s){if(s=Pe(s),s){const i=m.findKey(a,s);i&&(!n||Tt(a,a[i],i,n))&&(delete a[i],o=!0)}}return m.isArray(t)?t.forEach(r):r(t),o}clear(t){const n=Object.keys(this);let a=n.length,o=!1;for(;a--;){const r=n[a];(!t||Tt(this,this[r],r,t,!0))&&(delete this[r],o=!0)}return o}normalize(t){const n=this,a={};return m.forEach(this,(o,r)=>{const s=m.findKey(a,r);if(s){n[s]=ot(o),delete n[r];return}const i=t?mr(r):String(r).trim();i!==r&&delete n[r],n[i]=ot(o),a[i]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return m.forEach(this,(a,o)=>{a!=null&&a!==!1&&(n[o]=t&&m.isArray(a)?a.join(", "):a)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const a=new this(t);return n.forEach(o=>a.set(o)),a}static accessor(t){const a=(this[hn]=this[hn]={accessors:{}}).accessors,o=this.prototype;function r(s){const i=Pe(s);a[i]||(pr(o,s),a[i]=!0)}return m.isArray(t)?t.forEach(r):r(t),this}};ee.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);m.reduceDescriptors(ee.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(a){this[n]=a}}});m.freezeMethods(ee);function At(e,t){const n=this||We,a=t||n,o=ee.from(a.headers);let r=a.data;return m.forEach(e,function(i){r=i.call(n,r,o.normalize(),t?t.status:void 0)}),o.normalize(),r}function $a(e){return!!(e&&e.__CANCEL__)}let Xe=class extends I{constructor(t,n,a){super(t??"canceled",I.ERR_CANCELED,n,a),this.name="CanceledError",this.__CANCEL__=!0}};function Sa(e,t,n){const a=n.config.validateStatus;!n.status||!a||a(n.status)?e(n):t(new I("Request failed with status code "+n.status,[I.ERR_BAD_REQUEST,I.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}function gr(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function fr(e,t){e=e||10;const n=new Array(e),a=new Array(e);let o=0,r=0,s;return t=t!==void 0?t:1e3,function(c){const d=Date.now(),l=a[r];s||(s=d),n[o]=c,a[o]=d;let k=r,v=0;for(;k!==o;)v+=n[k++],k=k%e;if(o=(o+1)%e,o===r&&(r=(r+1)%e),d-s<t)return;const A=l&&d-l;return A?Math.round(v*1e3/A):void 0}}function br(e,t){let n=0,a=1e3/t,o,r;const s=(d,l=Date.now())=>{n=l,o=null,r&&(clearTimeout(r),r=null),e(...d)};return[(...d)=>{const l=Date.now(),k=l-n;k>=a?s(d,l):(o=d,r||(r=setTimeout(()=>{r=null,s(o)},a-k)))},()=>o&&s(o)]}const it=(e,t,n=3)=>{let a=0;const o=fr(50,250);return br(r=>{const s=r.loaded,i=r.lengthComputable?r.total:void 0,c=s-a,d=o(c),l=s<=i;a=s;const k={loaded:s,total:i,progress:i?s/i:void 0,bytes:c,rate:d||void 0,estimated:d&&i&&l?(i-s)/d:void 0,event:r,lengthComputable:i!=null,[t?"download":"upload"]:!0};e(k)},n)},yn=(e,t)=>{const n=e!=null;return[a=>t[0]({lengthComputable:n,total:e,loaded:a}),t[1]]},vn=e=>(...t)=>m.asap(()=>e(...t)),kr=Q.hasStandardBrowserEnv?((e,t)=>n=>(n=new URL(n,Q.origin),e.protocol===n.protocol&&e.host===n.host&&(t||e.port===n.port)))(new URL(Q.origin),Q.navigator&&/(msie|trident)/i.test(Q.navigator.userAgent)):()=>!0,hr=Q.hasStandardBrowserEnv?{write(e,t,n,a,o,r,s){if(typeof document>"u")return;const i=[`${e}=${encodeURIComponent(t)}`];m.isNumber(n)&&i.push(`expires=${new Date(n).toUTCString()}`),m.isString(a)&&i.push(`path=${a}`),m.isString(o)&&i.push(`domain=${o}`),r===!0&&i.push("secure"),m.isString(s)&&i.push(`SameSite=${s}`),document.cookie=i.join("; ")},read(e){if(typeof document>"u")return null;const t=document.cookie.match(new RegExp("(?:^|; )"+e+"=([^;]*)"));return t?decodeURIComponent(t[1]):null},remove(e){this.write(e,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function yr(e){return typeof e!="string"?!1:/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function vr(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function Ca(e,t,n){let a=!yr(t);return e&&(a||n==!1)?vr(e,t):t}const En=e=>e instanceof ee?{...e}:e;function be(e,t){t=t||{};const n={};function a(d,l,k,v){return m.isPlainObject(d)&&m.isPlainObject(l)?m.merge.call({caseless:v},d,l):m.isPlainObject(l)?m.merge({},l):m.isArray(l)?l.slice():l}function o(d,l,k,v){if(m.isUndefined(l)){if(!m.isUndefined(d))return a(void 0,d,k,v)}else return a(d,l,k,v)}function r(d,l){if(!m.isUndefined(l))return a(void 0,l)}function s(d,l){if(m.isUndefined(l)){if(!m.isUndefined(d))return a(void 0,d)}else return a(void 0,l)}function i(d,l,k){if(k in t)return a(d,l);if(k in e)return a(void 0,d)}const c={url:r,method:r,data:r,baseURL:s,transformRequest:s,transformResponse:s,paramsSerializer:s,timeout:s,timeoutMessage:s,withCredentials:s,withXSRFToken:s,adapter:s,responseType:s,xsrfCookieName:s,xsrfHeaderName:s,onUploadProgress:s,onDownloadProgress:s,decompress:s,maxContentLength:s,maxBodyLength:s,beforeRedirect:s,transport:s,httpAgent:s,httpsAgent:s,cancelToken:s,socketPath:s,responseEncoding:s,validateStatus:i,headers:(d,l,k)=>o(En(d),En(l),k,!0)};return m.forEach(Object.keys({...e,...t}),function(l){if(l==="__proto__"||l==="constructor"||l==="prototype")return;const k=m.hasOwnProp(c,l)?c[l]:o,v=k(e[l],t[l],l);m.isUndefined(v)&&k!==i||(n[l]=v)}),n}const xa=e=>{const t=be({},e);let{data:n,withXSRFToken:a,xsrfHeaderName:o,xsrfCookieName:r,headers:s,auth:i}=t;if(t.headers=s=ee.from(s),t.url=Ia(Ca(t.baseURL,t.url,t.allowAbsoluteUrls),e.params,e.paramsSerializer),i&&s.set("Authorization","Basic "+btoa((i.username||"")+":"+(i.password?unescape(encodeURIComponent(i.password)):""))),m.isFormData(n)){if(Q.hasStandardBrowserEnv||Q.hasStandardBrowserWebWorkerEnv)s.setContentType(void 0);else if(m.isFunction(n.getHeaders)){const c=n.getHeaders(),d=["content-type","content-length"];Object.entries(c).forEach(([l,k])=>{d.includes(l.toLowerCase())&&s.set(l,k)})}}if(Q.hasStandardBrowserEnv&&(a&&m.isFunction(a)&&(a=a(t)),a||a!==!1&&kr(t.url))){const c=o&&r&&hr.read(r);c&&s.set(o,c)}return t},Er=typeof XMLHttpRequest<"u",wr=Er&&function(e){return new Promise(function(n,a){const o=xa(e);let r=o.data;const s=ee.from(o.headers).normalize();let{responseType:i,onUploadProgress:c,onDownloadProgress:d}=o,l,k,v,A,p;function b(){A&&A(),p&&p(),o.cancelToken&&o.cancelToken.unsubscribe(l),o.signal&&o.signal.removeEventListener("abort",l)}let g=new XMLHttpRequest;g.open(o.method.toUpperCase(),o.url,!0),g.timeout=o.timeout;function E(){if(!g)return;const L=ee.from("getAllResponseHeaders"in g&&g.getAllResponseHeaders()),D={data:!i||i==="text"||i==="json"?g.responseText:g.response,status:g.status,statusText:g.statusText,headers:L,config:e,request:g};Sa(function(M){n(M),b()},function(M){a(M),b()},D),g=null}"onloadend"in g?g.onloadend=E:g.onreadystatechange=function(){!g||g.readyState!==4||g.status===0&&!(g.responseURL&&g.responseURL.indexOf("file:")===0)||setTimeout(E)},g.onabort=function(){g&&(a(new I("Request aborted",I.ECONNABORTED,e,g)),g=null)},g.onerror=function(R){const D=R&&R.message?R.message:"Network Error",V=new I(D,I.ERR_NETWORK,e,g);V.event=R||null,a(V),g=null},g.ontimeout=function(){let R=o.timeout?"timeout of "+o.timeout+"ms exceeded":"timeout exceeded";const D=o.transitional||Xt;o.timeoutErrorMessage&&(R=o.timeoutErrorMessage),a(new I(R,D.clarifyTimeoutError?I.ETIMEDOUT:I.ECONNABORTED,e,g)),g=null},r===void 0&&s.setContentType(null),"setRequestHeader"in g&&m.forEach(s.toJSON(),function(R,D){g.setRequestHeader(D,R)}),m.isUndefined(o.withCredentials)||(g.withCredentials=!!o.withCredentials),i&&i!=="json"&&(g.responseType=o.responseType),d&&([v,p]=it(d,!0),g.addEventListener("progress",v)),c&&g.upload&&([k,A]=it(c),g.upload.addEventListener("progress",k),g.upload.addEventListener("loadend",A)),(o.cancelToken||o.signal)&&(l=L=>{g&&(a(!L||L.type?new Xe(null,e,g):L),g.abort(),g=null)},o.cancelToken&&o.cancelToken.subscribe(l),o.signal&&(o.signal.aborted?l():o.signal.addEventListener("abort",l)));const P=gr(o.url);if(P&&Q.protocols.indexOf(P)===-1){a(new I("Unsupported protocol "+P+":",I.ERR_BAD_REQUEST,e));return}g.send(r||null)})},Br=(e,t)=>{const{length:n}=e=e?e.filter(Boolean):[];if(t||n){let a=new AbortController,o;const r=function(d){if(!o){o=!0,i();const l=d instanceof Error?d:this.reason;a.abort(l instanceof I?l:new Xe(l instanceof Error?l.message:l))}};let s=t&&setTimeout(()=>{s=null,r(new I(`timeout of ${t}ms exceeded`,I.ETIMEDOUT))},t);const i=()=>{e&&(s&&clearTimeout(s),s=null,e.forEach(d=>{d.unsubscribe?d.unsubscribe(r):d.removeEventListener("abort",r)}),e=null)};e.forEach(d=>d.addEventListener("abort",r));const{signal:c}=a;return c.unsubscribe=()=>m.asap(i),c}},Ir=function*(e,t){let n=e.byteLength;if(n<t){yield e;return}let a=0,o;for(;a<n;)o=a+t,yield e.slice(a,o),a=o},_r=async function*(e,t){for await(const n of $r(e))yield*Ir(n,t)},$r=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:n,value:a}=await t.read();if(n)break;yield a}}finally{await t.cancel()}},wn=(e,t,n,a)=>{const o=_r(e,t);let r=0,s,i=c=>{s||(s=!0,a&&a(c))};return new ReadableStream({async pull(c){try{const{done:d,value:l}=await o.next();if(d){i(),c.close();return}let k=l.byteLength;if(n){let v=r+=k;n(v)}c.enqueue(new Uint8Array(l))}catch(d){throw i(d),d}},cancel(c){return i(c),o.return()}},{highWaterMark:2})},Bn=64*1024,{isFunction:Ye}=m,Sr=(({Request:e,Response:t})=>({Request:e,Response:t}))(m.global),{ReadableStream:In,TextEncoder:_n}=m.global,$n=(e,...t)=>{try{return!!e(...t)}catch{return!1}},Cr=e=>{e=m.merge.call({skipUndefined:!0},Sr,e);const{fetch:t,Request:n,Response:a}=e,o=t?Ye(t):typeof fetch=="function",r=Ye(n),s=Ye(a);if(!o)return!1;const i=o&&Ye(In),c=o&&(typeof _n=="function"?(p=>b=>p.encode(b))(new _n):async p=>new Uint8Array(await new n(p).arrayBuffer())),d=r&&i&&$n(()=>{let p=!1;const b=new n(Q.origin,{body:new In,method:"POST",get duplex(){return p=!0,"half"}}).headers.has("Content-Type");return p&&!b}),l=s&&i&&$n(()=>m.isReadableStream(new a("").body)),k={stream:l&&(p=>p.body)};o&&["text","arrayBuffer","blob","formData","stream"].forEach(p=>{!k[p]&&(k[p]=(b,g)=>{let E=b&&b[p];if(E)return E.call(b);throw new I(`Response type '${p}' is not supported`,I.ERR_NOT_SUPPORT,g)})});const v=async p=>{if(p==null)return 0;if(m.isBlob(p))return p.size;if(m.isSpecCompliantForm(p))return(await new n(Q.origin,{method:"POST",body:p}).arrayBuffer()).byteLength;if(m.isArrayBufferView(p)||m.isArrayBuffer(p))return p.byteLength;if(m.isURLSearchParams(p)&&(p=p+""),m.isString(p))return(await c(p)).byteLength},A=async(p,b)=>{const g=m.toFiniteNumber(p.getContentLength());return g??v(b)};return async p=>{let{url:b,method:g,data:E,signal:P,cancelToken:L,timeout:R,onDownloadProgress:D,onUploadProgress:V,responseType:M,headers:F,withCredentials:J="same-origin",fetchOptions:W}=xa(p),X=t||fetch;M=M?(M+"").toLowerCase():"text";let $=Br([P,L&&L.toAbortSignal()],R),N=null;const G=$&&$.unsubscribe&&(()=>{$.unsubscribe()});let re;try{if(V&&d&&g!=="get"&&g!=="head"&&(re=await A(F,E))!==0){let de=new n(b,{method:"POST",body:E,duplex:"half"}),ve;if(m.isFormData(E)&&(ve=de.headers.get("content-type"))&&F.setContentType(ve),de.body){const[xt,Qe]=yn(re,it(vn(V)));E=wn(de.body,Bn,xt,Qe)}}m.isString(J)||(J=J?"include":"omit");const Z=r&&"credentials"in n.prototype,ae={...W,signal:$,method:g.toUpperCase(),headers:F.normalize().toJSON(),body:E,duplex:"half",credentials:Z?J:void 0};N=r&&new n(b,ae);let te=await(r?X(N,W):X(b,ae));const me=l&&(M==="stream"||M==="response");if(l&&(D||me&&G)){const de={};["status","statusText","headers"].forEach(mn=>{de[mn]=te[mn]});const ve=m.toFiniteNumber(te.headers.get("content-length")),[xt,Qe]=D&&yn(ve,it(vn(D),!0))||[];te=new a(wn(te.body,Bn,xt,()=>{Qe&&Qe(),G&&G()}),de)}M=M||"text";let Ct=await k[m.findKey(k,M)||"text"](te,p);return!me&&G&&G(),await new Promise((de,ve)=>{Sa(de,ve,{data:Ct,headers:ee.from(te.headers),status:te.status,statusText:te.statusText,config:p,request:N})})}catch(Z){throw G&&G(),Z&&Z.name==="TypeError"&&/Load failed|fetch/i.test(Z.message)?Object.assign(new I("Network Error",I.ERR_NETWORK,p,N,Z&&Z.response),{cause:Z.cause||Z}):I.from(Z,Z&&Z.code,p,N,Z&&Z.response)}}},xr=new Map,La=e=>{let t=e&&e.env||{};const{fetch:n,Request:a,Response:o}=t,r=[a,o,n];let s=r.length,i=s,c,d,l=xr;for(;i--;)c=r[i],d=l.get(c),d===void 0&&l.set(c,d=i?new Map:Cr(t)),l=d;return d};La();const Qt={http:Jo,xhr:wr,fetch:{get:La}};m.forEach(Qt,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const Sn=e=>`- ${e}`,Lr=e=>m.isFunction(e)||e===null||e===!1;function Tr(e,t){e=m.isArray(e)?e:[e];const{length:n}=e;let a,o;const r={};for(let s=0;s<n;s++){a=e[s];let i;if(o=a,!Lr(a)&&(o=Qt[(i=String(a)).toLowerCase()],o===void 0))throw new I(`Unknown adapter '${i}'`);if(o&&(m.isFunction(o)||(o=o.get(t))))break;r[i||"#"+s]=o}if(!o){const s=Object.entries(r).map(([c,d])=>`adapter ${c} `+(d===!1?"is not supported by the environment":"is not available in the build"));let i=n?s.length>1?`since :
`+s.map(Sn).join(`
`):" "+Sn(s[0]):"as no adapter specified";throw new I("There is no suitable adapter to dispatch the request "+i,"ERR_NOT_SUPPORT")}return o}const Ta={getAdapter:Tr,adapters:Qt};function Mt(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new Xe(null,e)}function Cn(e){return Mt(e),e.headers=ee.from(e.headers),e.data=At.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),Ta.getAdapter(e.adapter||We.adapter,e)(e).then(function(a){return Mt(e),a.data=At.call(e,e.transformResponse,a),a.headers=ee.from(a.headers),a},function(a){return $a(a)||(Mt(e),a&&a.response&&(a.response.data=At.call(e,e.transformResponse,a.response),a.response.headers=ee.from(a.response.headers))),Promise.reject(a)})}const Aa="1.13.6",_t={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{_t[e]=function(a){return typeof a===e||"a"+(t<1?"n ":" ")+e}});const xn={};_t.transitional=function(t,n,a){function o(r,s){return"[Axios v"+Aa+"] Transitional option '"+r+"'"+s+(a?". "+a:"")}return(r,s,i)=>{if(t===!1)throw new I(o(s," has been removed"+(n?" in "+n:"")),I.ERR_DEPRECATED);return n&&!xn[s]&&(xn[s]=!0,console.warn(o(s," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(r,s,i):!0}};_t.spelling=function(t){return(n,a)=>(console.warn(`${a} is likely a misspelling of ${t}`),!0)};function Ar(e,t,n){if(typeof e!="object")throw new I("options must be an object",I.ERR_BAD_OPTION_VALUE);const a=Object.keys(e);let o=a.length;for(;o-- >0;){const r=a[o],s=t[r];if(s){const i=e[r],c=i===void 0||s(i,r,e);if(c!==!0)throw new I("option "+r+" must be "+c,I.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new I("Unknown option "+r,I.ERR_BAD_OPTION)}}const rt={assertOptions:Ar,validators:_t},ne=rt.validators;let fe=class{constructor(t){this.defaults=t||{},this.interceptors={request:new kn,response:new kn}}async request(t,n){try{return await this._request(t,n)}catch(a){if(a instanceof Error){let o={};Error.captureStackTrace?Error.captureStackTrace(o):o=new Error;const r=o.stack?o.stack.replace(/^.+\n/,""):"";try{a.stack?r&&!String(a.stack).endsWith(r.replace(/^.+\n.+\n/,""))&&(a.stack+=`
`+r):a.stack=r}catch{}}throw a}}_request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=be(this.defaults,n);const{transitional:a,paramsSerializer:o,headers:r}=n;a!==void 0&&rt.assertOptions(a,{silentJSONParsing:ne.transitional(ne.boolean),forcedJSONParsing:ne.transitional(ne.boolean),clarifyTimeoutError:ne.transitional(ne.boolean),legacyInterceptorReqResOrdering:ne.transitional(ne.boolean)},!1),o!=null&&(m.isFunction(o)?n.paramsSerializer={serialize:o}:rt.assertOptions(o,{encode:ne.function,serialize:ne.function},!0)),n.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?n.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:n.allowAbsoluteUrls=!0),rt.assertOptions(n,{baseUrl:ne.spelling("baseURL"),withXsrfToken:ne.spelling("withXSRFToken")},!0),n.method=(n.method||this.defaults.method||"get").toLowerCase();let s=r&&m.merge(r.common,r[n.method]);r&&m.forEach(["delete","get","head","post","put","patch","common"],p=>{delete r[p]}),n.headers=ee.concat(s,r);const i=[];let c=!0;this.interceptors.request.forEach(function(b){if(typeof b.runWhen=="function"&&b.runWhen(n)===!1)return;c=c&&b.synchronous;const g=n.transitional||Xt;g&&g.legacyInterceptorReqResOrdering?i.unshift(b.fulfilled,b.rejected):i.push(b.fulfilled,b.rejected)});const d=[];this.interceptors.response.forEach(function(b){d.push(b.fulfilled,b.rejected)});let l,k=0,v;if(!c){const p=[Cn.bind(this),void 0];for(p.unshift(...i),p.push(...d),v=p.length,l=Promise.resolve(n);k<v;)l=l.then(p[k++],p[k++]);return l}v=i.length;let A=n;for(;k<v;){const p=i[k++],b=i[k++];try{A=p(A)}catch(g){b.call(this,g);break}}try{l=Cn.call(this,A)}catch(p){return Promise.reject(p)}for(k=0,v=d.length;k<v;)l=l.then(d[k++],d[k++]);return l}getUri(t){t=be(this.defaults,t);const n=Ca(t.baseURL,t.url,t.allowAbsoluteUrls);return Ia(n,t.params,t.paramsSerializer)}};m.forEach(["delete","get","head","options"],function(t){fe.prototype[t]=function(n,a){return this.request(be(a||{},{method:t,url:n,data:(a||{}).data}))}});m.forEach(["post","put","patch"],function(t){function n(a){return function(r,s,i){return this.request(be(i||{},{method:t,headers:a?{"Content-Type":"multipart/form-data"}:{},url:r,data:s}))}}fe.prototype[t]=n(),fe.prototype[t+"Form"]=n(!0)});let Mr=class Ma{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(r){n=r});const a=this;this.promise.then(o=>{if(!a._listeners)return;let r=a._listeners.length;for(;r-- >0;)a._listeners[r](o);a._listeners=null}),this.promise.then=o=>{let r;const s=new Promise(i=>{a.subscribe(i),r=i}).then(o);return s.cancel=function(){a.unsubscribe(r)},s},t(function(r,s,i){a.reason||(a.reason=new Xe(r,s,i),n(a.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}toAbortSignal(){const t=new AbortController,n=a=>{t.abort(a)};return this.subscribe(n),t.signal.unsubscribe=()=>this.unsubscribe(n),t.signal}static source(){let t;return{token:new Ma(function(o){t=o}),cancel:t}}};function Rr(e){return function(n){return e.apply(null,n)}}function Pr(e){return m.isObject(e)&&e.isAxiosError===!0}const Ht={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(Ht).forEach(([e,t])=>{Ht[t]=e});function Ra(e){const t=new fe(e),n=pa(fe.prototype.request,t);return m.extend(n,fe.prototype,t,{allOwnKeys:!0}),m.extend(n,t,null,{allOwnKeys:!0}),n.create=function(o){return Ra(be(e,o))},n}const K=Ra(We);K.Axios=fe;K.CanceledError=Xe;K.CancelToken=Mr;K.isCancel=$a;K.VERSION=Aa;K.toFormData=It;K.AxiosError=I;K.Cancel=K.CanceledError;K.all=function(t){return Promise.all(t)};K.spread=Rr;K.isAxiosError=Pr;K.mergeConfig=be;K.AxiosHeaders=ee;K.formToJSON=e=>_a(m.isHTMLForm(e)?new FormData(e):e);K.getAdapter=Ta.getAdapter;K.HttpStatusCode=Ht;K.default=K;const{Axios:vd,AxiosError:Ed,CanceledError:wd,isCancel:Bd,CancelToken:Id,VERSION:_d,all:$d,Cancel:Sd,isAxiosError:Cd,spread:xd,toFormData:Ld,AxiosHeaders:Td,HttpStatusCode:Ad,formToJSON:Md,getAdapter:Rd,mergeConfig:Pd}=K;window.axios=K;window.axios.defaults.headers.common["X-Requested-With"]="XMLHttpRequest";const Yt="transit_user",ue="transit_token",Ft="transit_pending_toast";function Re(){try{return typeof window<"u"&&typeof window.localStorage<"u"}catch{return!1}}function Pa(){try{return typeof window<"u"&&typeof window.sessionStorage<"u"}catch{return!1}}function Dr(){if(window.transitAuthUser)return window.transitAuthUser;if(!Re())return null;const e=window.localStorage.getItem(Yt);if(!e)return null;try{return JSON.parse(e)}catch{return Ue(),null}}function Da(e){if(!Re()){window.transitAuthUser=e;return}window.transitAuthUser=e,window.localStorage.setItem(Yt,JSON.stringify(e))}function Or(){if(!Re()){window.transitAuthUser=null;return}window.transitAuthUser=null,window.localStorage.removeItem(Yt)}function en(){return typeof window<"u"&&typeof window.transitAuthToken=="string"&&window.transitAuthToken!==""?window.transitAuthToken:Re()?window.localStorage.getItem(ue):null}function jr(e){const t=typeof e=="string"?e:"";if(!Re()){window.transitAuthToken=t||null;return}if(window.transitAuthToken=t||null,t===""){window.localStorage.removeItem(ue),document.cookie=ue+"=; path=/; max-age=0; samesite=lax";return}window.localStorage.setItem(ue,t),document.cookie=ue+"="+t+"; path=/; max-age=86400; samesite=lax"}function qr(){if(!Re()){window.transitAuthToken=null,document.cookie=ue+"=; path=/; max-age=0; samesite=lax";return}window.transitAuthToken=null,window.localStorage.removeItem(ue),document.cookie=ue+"=; path=/; max-age=0; samesite=lax"}function Nr(e){Pa()&&window.sessionStorage.setItem(Ft,JSON.stringify(e))}function Ur(){if(!Pa())return null;const e=window.sessionStorage.getItem(Ft);if(!e)return null;window.sessionStorage.removeItem(Ft);try{return JSON.parse(e)}catch{return null}}function Ue(){Or(),qr()}function Oa(e,t){if(!e)return t;if(typeof e.detail=="string"&&e.detail!=="")return e.detail;if(typeof e.message=="string"&&e.message!=="")return e.message;if(e.errors&&typeof e.errors=="object"){const n=Object.values(e.errors).flat()[0];if(typeof n=="string"&&n!=="")return n}return t}function Ln(){return document.body.dataset.apiBase||"/api"}function ja(e=""){const t=String(e).replace(/^\/+/,"");return t===""?Ln():`${Ln()}/${t}`}async function y(e,t={}){const{method:n="GET",body:a=null,headers:o={},auth:r=!0}=t,s=new Headers(o);s.set("Accept","application/json"),s.set("X-Requested-With","XMLHttpRequest");let i=a;if(a&&!(a instanceof FormData)&&!(a instanceof Blob)&&(s.set("Content-Type","application/json"),i=JSON.stringify(a)),r){const k=en();k&&s.set("Authorization",`Bearer ${k}`)}if(!["GET","HEAD","OPTIONS"].includes(n.toUpperCase())){const k=document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");k&&s.set("X-CSRF-TOKEN",k)}const c=await fetch(ja(e),{method:n,headers:s,body:i,credentials:"same-origin"});let d=null;const l=c.headers.get("content-type")||"";if(c.status!==204&&(d=l.includes("application/json")?await c.json():await c.text()),!c.ok){c.status===401&&(Ue(),(document.body.dataset.routeGuard||"none")==="protected"&&window.location.replace(document.body.dataset.loginUrl||"/login"));const k=Oa(d,`Request gagal (${c.status})`),v=new Error(k);throw v.status=c.status,v.data=d,v}return d}async function tn(e,t="export.csv"){const n=new Headers({Accept:"text/csv,application/octet-stream","X-Requested-With":"XMLHttpRequest"}),a=en();a&&n.set("Authorization",`Bearer ${a}`);const o=await fetch(ja(e),{method:"GET",headers:n,credentials:"same-origin"});if(!o.ok){let k=null;throw(o.headers.get("content-type")||"").includes("application/json")&&(k=await o.json()),new Error(Oa(k,"Gagal mengunduh file"))}const r=await o.blob(),c=(o.headers.get("content-disposition")||"").match(/filename="?([^"]+)"?/i)?.[1]||t,d=window.URL.createObjectURL(r),l=document.createElement("a");l.href=d,l.download=c,document.body.appendChild(l),l.click(),l.remove(),window.URL.revokeObjectURL(d)}function De(e,t){const n=document.getElementById(e);n&&(n.textContent=t)}function Hr(e){const t=e?.role||"";document.querySelectorAll("[data-role-scope]").forEach(n=>{const a=n.dataset.roleScope,o=a==="admin"?["Super Admin","Admin"].includes(t):a==="super"?t==="Super Admin":!0;n.hidden=!o})}function qa(){return Dr()}function dt(e){if(Hr(e),!e)return;const t=e.nama||"Admin",n=t.trim().split(/\s+/)[0]||"Admin",a=e.email||"admin@pekanbaru.com";De("sidebar-user-name",t),De("sidebar-user-email",a),De("header-user-name",n),De("dropdown-user-name",t),De("dropdown-user-email",a)}function Na(e){return typeof e.access_token=="string"&&e.access_token!==""&&jr(e.access_token),Da(e.user),dt(e.user),e}async function Fr(e){const t=await y("/auth/login",{method:"POST",body:e,auth:!1});return Na(t)}async function Gr(e){const t=await y("/auth/register",{method:"POST",body:e,auth:!1});return Na(t)}async function Tn(){const e=await y("/auth/me");return Da(e),dt(e),e}async function Vr(){try{await y("/auth/logout",{method:"POST"})}catch(e){if(e?.status!==401)throw e}Ue(),Nr({type:"success",title:"Logout berhasil",message:"Sampai jumpa kembali!"}),window.location.replace(document.body.dataset.loginUrl||"/login")}function An(e){window.location.replace(e)}async function Jr(){const e=document.body.dataset.routeGuard||"none",t=document.body.dataset.loginUrl||"/login",n=document.body.dataset.dashboardUrl||"/dashboard",a=qa();if(e==="public"){try{const o=await Tn();return An(n),{user:o}}catch{(a||en())&&Ue()}return{user:null}}if(e==="protected")try{return{user:await Tn()}}catch{return Ue(),An(t),{user:null}}return{user:a}}function nn(){return Array.from(document.querySelectorAll(".modal-shell")).filter(e=>!e.hidden)}function Ua(){document.body.style.overflow=nn().length>0?"hidden":""}function j(e){const t=document.getElementById(e);t&&(t.hidden=!1,Ua())}function z(e=null){if(e){const t=document.getElementById(e);t&&(t.hidden=!0)}else nn().forEach(t=>{t.hidden=!0});Ua()}function Kr(){document.addEventListener("click",e=>{const t=e.target.closest("[data-modal-open]");if(t){j(t.dataset.modalOpen);return}const n=e.target.closest("[data-modal-close]");if(n){const a=n.dataset.modalClose||n.closest(".modal-shell")?.id;z(a||void 0)}}),document.addEventListener("keydown",e=>{if(e.key!=="Escape")return;const t=nn().pop();t&&z(t.id)})}function an(e,t,n){const a=document.getElementById("transit-toast-root");if(!a)return;const o=document.createElement("div");o.className=`transit-toast ${n==="error"?"is-error":""} ${n==="info"?"is-info":""}`.trim(),o.innerHTML=`
        <div>
            <strong>${e}</strong>
            <p>${t}</p>
        </div>
    `,a.appendChild(o),window.requestAnimationFrame(()=>{o.classList.add("is-visible")}),window.setTimeout(()=>{o.classList.remove("is-visible"),window.setTimeout(()=>o.remove(),180)},3600)}function q(e,t="Berhasil"){an(t,e,"success")}function h(e,t="Gagal"){an(t,e,"error")}function zr(e,t="Info"){an(t,e,"info")}function Oe(e){const t=document.querySelector("[data-sidebar]"),n=document.querySelector("[data-sidebar-overlay]");!t||!n||(t.classList.toggle("is-open",e),n.hidden=!e)}function st(e=null){document.querySelectorAll("[data-user-dropdown]").forEach(t=>{if(e&&t===e)return;t.classList.remove("is-open");const n=t.querySelector("[data-user-menu-trigger]"),a=t.querySelector("[data-user-menu-panel]");n&&n.setAttribute("aria-expanded","false"),a&&(a.hidden=!0)})}function Wr(e,t=null){if(!e)return;const n=e.querySelector("[data-user-menu-trigger]"),a=e.querySelector("[data-user-menu-panel]"),o=t??!e.classList.contains("is-open");st(o?e:null),e.classList.toggle("is-open",o),n&&n.setAttribute("aria-expanded",o?"true":"false"),a&&(a.hidden=!o)}function Xr(){document.querySelector("[data-sidebar-open]")?.addEventListener("click",()=>{Oe(!0)}),document.querySelector("[data-sidebar-close]")?.addEventListener("click",()=>{Oe(!1)}),document.querySelector("[data-sidebar-overlay]")?.addEventListener("click",()=>{Oe(!1)}),document.querySelectorAll("[data-user-dropdown]").forEach(e=>{e.querySelector("[data-user-menu-trigger]")?.addEventListener("click",t=>{t.stopPropagation(),Wr(e)})}),document.addEventListener("click",e=>{e.target.closest("[data-user-dropdown]")||st()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&(st(),Oe(!1))}),window.addEventListener("resize",()=>{window.innerWidth>1100&&Oe(!1)}),document.querySelectorAll("[data-auth-logout]").forEach(e=>{e.addEventListener("click",async()=>{z(),st();try{e.disabled=!0,await Vr()}catch(t){e.disabled=!1,h(t.message||"Gagal logout")}})})}const Ha={login:{title:"Selamat Datang!",description:"Masuk ke akun Anda untuk melanjutkan",submit:"Masuk",switchText:"Belum punya akun?",switchAction:"Daftar sekarang"},register:{title:"Buat Akun Baru",description:"Daftar untuk mulai menggunakan sistem",submit:"Daftar",switchText:"Sudah punya akun?",switchAction:"Masuk"}};function Mn(e,t){const n=Ha[e];t.form.dataset.authMode=e,t.title.textContent=n.title,t.description.textContent=n.description,t.submitText.textContent=n.submit,t.switchText&&(t.switchText.textContent=n.switchText),t.switchButton&&(t.switchButton.textContent=n.switchAction),t.nameField.hidden=e!=="register",t.nameInput.required=e==="register"}function Zr(){const e=document.getElementById("auth-form");if(!e)return;const t={form:e,title:document.querySelector("[data-auth-title]"),description:document.querySelector("[data-auth-description]"),submitText:document.querySelector("[data-auth-submit-text]"),switchText:document.querySelector("[data-auth-switch-text]"),switchButton:document.querySelector("[data-toggle-auth-mode]"),nameField:document.getElementById("auth-name-field"),nameInput:document.getElementById("nama"),emailInput:document.getElementById("email"),passwordInput:document.getElementById("password"),passwordToggle:document.querySelector("[data-toggle-password]"),submitButton:document.getElementById("auth-submit-button")},n=document.body.dataset.dashboardUrl||"/dashboard";Mn("login",t),t.switchButton?.addEventListener("click",()=>{const a=t.form.dataset.authMode==="login"?"register":"login";Mn(a,t)}),t.passwordToggle?.addEventListener("click",()=>{const a=t.passwordInput.type==="password"?"text":"password";t.passwordInput.type=a,t.passwordToggle.textContent=a==="password"?"Lihat":"Sembunyikan"}),e.addEventListener("submit",async a=>{a.preventDefault();const o=new FormData(e),r=e.dataset.authMode||"login",s={email:String(o.get("email")||"").trim(),password:String(o.get("password")||"").trim()};r==="register"&&(s.nama=String(o.get("nama")||"").trim()),t.submitButton.disabled=!0,t.submitText.textContent=r==="login"?"Memproses...":"Mendaftarkan...";try{r==="login"?(await Fr(s),q("Selamat datang kembali","Login berhasil!")):(await Gr(s),q("Akun Anda telah dibuat","Registrasi berhasil!")),window.location.replace(n)}catch(i){h(i.message||"Terjadi kesalahan",r==="login"?"Login gagal":"Registrasi gagal")}finally{t.submitButton.disabled=!1,t.submitText.textContent=Ha[r].submit}})}const Qr=new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}),Yr=new Intl.NumberFormat("id-ID");function H(e){return Qr.format(Number(e)||0)}function O(e){return Yr.format(Number(e)||0)}function u(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function he(e,t=300){let n=null;return(...a)=>{window.clearTimeout(n),n=window.setTimeout(()=>e(...a),t)}}function ye(e,t,n,a){if(n===0||a===0)return"Menampilkan 0 - 0 dari 0 data";const o=(e-1)*t+1,r=o+a-1;return`Menampilkan ${o} - ${r} dari ${n} data`}function es(e){if(!e)return"-";const t=new Date(e);return Number.isNaN(t.getTime())?e:new Intl.DateTimeFormat("id-ID",{day:"2-digit",month:"short",year:"numeric"}).format(t)}function Ze(){return new Date().toISOString().slice(0,10)}function se(e,t,n="Memproses..."){e&&(e.dataset.defaultText||(e.dataset.defaultText=e.textContent.trim()),e.disabled=t,e.textContent=t?n:e.dataset.defaultText)}const lt=["#059669","#10B981","#34D399","#6EE7B7","#A7F3D0"],ie={revenueChart:null,passengerChart:null,mobilChart:null};function ts(){const e=document.getElementById("dashboard-initial-state");if(!e)return{stats:{},revenueData:[],mobilRevenue:[]};try{return JSON.parse(e.textContent||"{}")}catch{return{stats:{},revenueData:[],mobilRevenue:[]}}}function on(e){e&&typeof e.destroy=="function"&&e.destroy()}function ns(e,t){const n=document.querySelector(`[data-stat="${e}"]`);if(!n)return;const a=["total_uang_bersih","total_uang_pc"];n.textContent=a.includes(e)?H(t):O(t)}function Fa(e,t,n){const a=document.getElementById(e),o=document.getElementById(t);a&&(a.hidden=!n),o&&(o.hidden=n)}function as(){return"#065f46"}function Gt(){return"#d1fae5"}function rn(){return{backgroundColor:"#ffffff",titleColor:"#064e3b",bodyColor:"#065f46",borderColor:"#d1fae5",borderWidth:1,padding:12,cornerRadius:12,displayColors:!0}}function os(e){const t=document.getElementById("dashboard-revenue-chart"),n=Array.isArray(e)&&e.length>0;if(Fa("dashboard-revenue-chart","dashboard-revenue-empty",n),on(ie.revenueChart),!t||!window.Chart||!n){ie.revenueChart=null;return}ie.revenueChart=new window.Chart(t,{type:"line",data:{labels:e.map(a=>a.bulan),datasets:[{label:"Pendapatan Bersih",data:e.map(a=>a.uang_bersih),borderColor:"#059669",backgroundColor:"rgba(5, 150, 105, 0.08)",fill:!1,tension:.35,pointRadius:4,pointHoverRadius:5,pointBackgroundColor:"#059669",pointBorderColor:"#ffffff",pointBorderWidth:2,borderWidth:3},{label:"Uang PC",data:e.map(a=>a.uang_pc),borderColor:"#f59e0b",backgroundColor:"rgba(245, 158, 11, 0.1)",fill:!1,tension:.35,pointRadius:4,pointHoverRadius:5,pointBackgroundColor:"#f59e0b",pointBorderColor:"#ffffff",pointBorderWidth:2,borderWidth:3}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{labels:{color:as(),usePointStyle:!0,pointStyle:"circle",boxWidth:8,boxHeight:8,padding:18}},tooltip:{...rn(),callbacks:{label(a){return`${a.dataset.label}: ${H(a.parsed.y)}`}}}},scales:{x:{ticks:{color:"#047857",font:{size:12}},grid:{color:Gt()},border:{display:!1}},y:{ticks:{color:"#047857",font:{size:12},callback(a){return`${Math.round(Number(a)/1e6)}jt`}},grid:{color:Gt()},border:{display:!1}}}}})}function rs(e){const t=document.getElementById("dashboard-passenger-chart"),n=Array.isArray(e)&&e.length>0;if(Fa("dashboard-passenger-chart","dashboard-passenger-empty",n),on(ie.passengerChart),!t||!window.Chart||!n){ie.passengerChart=null;return}ie.passengerChart=new window.Chart(t,{type:"bar",data:{labels:e.map(a=>a.bulan),datasets:[{label:"Penumpang",data:e.map(a=>a.penumpang),backgroundColor:"#10B981",borderRadius:8,maxBarThickness:44}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{...rn(),callbacks:{label(a){return`Penumpang: ${O(a.parsed.y)}`}}}},scales:{x:{ticks:{color:"#047857",font:{size:12}},grid:{color:"rgba(0, 0, 0, 0)"},border:{display:!1}},y:{ticks:{color:"#047857",font:{size:12}},grid:{color:Gt()},border:{display:!1}}}}})}function ss(e){const t=document.getElementById("dashboard-mobil-list");t&&(t.innerHTML=e.map((n,a)=>`
        <div class="dashboard-mobil-item">
            <div class="dashboard-mobil-meta">
                <span class="dashboard-mobil-dot" style="background-color: ${lt[a%lt.length]}"></span>
                <div>
                    <p class="dashboard-mobil-code">${u(n.kode_mobil)}</p>
                    <p class="dashboard-mobil-trips">${O(n.total_trips)} trip</p>
                    <p class="dashboard-mobil-passengers">${O(n.total_penumpang)} penumpang</p>
                </div>
            </div>
            <p class="dashboard-mobil-value">${H(n.total_uang_bersih)}</p>
        </div>
    `).join(""))}function is(e){const t=document.getElementById("dashboard-mobil-chart"),n=document.getElementById("dashboard-mobil-content"),a=document.getElementById("dashboard-mobil-empty"),o=document.getElementById("dashboard-mobil-chart-empty"),r=document.getElementById("dashboard-mobil-list"),s=Array.isArray(e)&&e.length>0,i=s&&e.some(c=>Number(c.total_uang_bersih)>0);if(on(ie.mobilChart),n&&(n.hidden=!s),a&&(a.hidden=s),t&&(t.hidden=!i),o&&(o.hidden=i),s?ss(e):r&&(r.innerHTML=""),!t||!window.Chart||!i){ie.mobilChart=null;return}ie.mobilChart=new window.Chart(t,{type:"doughnut",data:{labels:e.map(c=>c.kode_mobil),datasets:[{data:e.map(c=>c.total_uang_bersih),backgroundColor:e.map((c,d)=>lt[d%lt.length]),borderColor:"#ffffff",borderWidth:6,hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"58%",plugins:{legend:{display:!1},tooltip:{...rn(),callbacks:{label(c){const d=e[c.dataIndex]||{};return`${c.label}: ${H(c.parsed)} / ${O(d.total_penumpang||0)} penumpang`}}}}}})}function Rn(e){Object.entries(e.stats||{}).forEach(([t,n])=>ns(t,n)),os(e.revenueData||[]),rs(e.revenueData||[]),is(e.mobilRevenue||[])}async function ds(){const[e,t,n]=await Promise.all([y("/statistics/dashboard"),y("/statistics/revenue-chart"),y("/statistics/mobil-revenue")]);return{stats:e,revenueData:t,mobilRevenue:n}}function Pn(e){const t=document.querySelector("[data-dashboard-loading]"),n=document.querySelector("[data-dashboard-content]"),a=document.getElementById("dashboard-refresh-btn");t&&(t.hidden=!e),n&&(n.hidden=e),a&&(a.disabled=e)}async function ls(){const e=document.getElementById("dashboard-refresh-btn");e&&(Rn(ts()),e.addEventListener("click",async()=>{Pn(!0);try{Rn(await ds())}catch{h("Silakan coba lagi","Gagal memuat data")}finally{Pn(!1)}}))}const T={data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1},Te=10;function cs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function us(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 21C15 17.4 18 14.4 18 10.5C18 7.18629 15.3137 4.5 12 4.5C8.68629 4.5 6 7.18629 6 10.5C6 14.4 9 17.4 12 21Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
            <circle cx="12" cy="10.5" r="2.25" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function ms(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function ps(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function ct(e){const t=document.getElementById("driver-submit-btn");T.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":T.editItem?"Perbarui":"Simpan")}function gs(){const e=document.getElementById("drivers-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="drivers-table-state">
                <div class="drivers-loading-inline">
                    <span class="drivers-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function fs(){const e=document.getElementById("drivers-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="drivers-table-state drivers-empty-copy">
                Belum ada data driver
            </td>
        </tr>
    `)}function Dn(){const e=document.getElementById("drivers-table-body");if(e){if(T.loading){gs();return}if(T.data.length===0){fs();return}e.innerHTML=T.data.map((t,n)=>`
        <tr class="drivers-row" data-testid="driver-row-${t.id}">
            <td class="drivers-index-cell">${(T.page-1)*Te+n+1}</td>
            <td>
                <div class="drivers-user-cell">
                    <span class="drivers-user-avatar" aria-hidden="true">
                        ${cs()}
                    </span>
                    <span class="drivers-user-name">${u(t.nama)}</span>
                </div>
            </td>
            <td>
                <div class="drivers-location-cell">
                    <span class="drivers-location-icon" aria-hidden="true">${us()}</span>
                    <span>${u(t.lokasi)}</span>
                </div>
            </td>
            <td>
                <div class="drivers-action-row">
                    <button
                        class="drivers-icon-button"
                        type="button"
                        data-driver-edit="${t.id}"
                        data-testid="edit-driver-${t.id}"
                        aria-label="Edit driver ${u(t.nama)}"
                    >
                        ${ms()}
                    </button>
                    <button
                        class="drivers-icon-button drivers-icon-button-danger"
                        type="button"
                        data-driver-delete="${t.id}"
                        data-driver-name="${u(t.nama)}"
                        data-testid="delete-driver-${t.id}"
                        aria-label="Hapus driver ${u(t.nama)}"
                    >
                        ${ps()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function On(){const e=document.getElementById("drivers-pagination-shell"),t=document.getElementById("drivers-pagination-info"),n=document.getElementById("drivers-pagination-page"),a=document.getElementById("drivers-prev-page-btn"),o=document.getElementById("drivers-next-page-btn"),r=Math.max(1,Math.ceil(T.totalCount/Te));e&&(e.hidden=r<=1),t&&(t.textContent=ye(T.page,Te,T.totalCount,T.data.length)),n&&(n.textContent=`${T.page} / ${r}`),a&&(a.disabled=T.page===1),o&&(o.disabled=T.page>=r)}async function Ee(){T.loading=!0,Dn(),On();try{const[e,t]=await Promise.all([y(`/drivers?page=${T.page}&limit=${Te}${T.search?`&search=${encodeURIComponent(T.search)}`:""}`),y(`/drivers/count${T.search?`?search=${encodeURIComponent(T.search)}`:""}`)]);T.data=Array.isArray(e)?e:[],T.totalCount=Number(t.count||0)}finally{T.loading=!1,Dn(),On()}}function jn(){const e=document.getElementById("driver-form"),t=document.getElementById("driver-form-title"),n=document.getElementById("driver-form-description"),a=document.getElementById("driver-id"),o=document.getElementById("driver-nama"),r=document.getElementById("driver-lokasi");e?.reset(),a&&(a.value=""),o&&(o.value=""),r&&(r.value=""),t&&(t.textContent="Tambah Driver Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan data driver"),T.editItem=null,ct(!1)}function bs(e){const t=document.getElementById("driver-form-title"),n=document.getElementById("driver-form-description"),a=document.getElementById("driver-id"),o=document.getElementById("driver-nama"),r=document.getElementById("driver-lokasi");T.editItem=e,a&&(a.value=e.id),o&&(o.value=e.nama),r&&(r.value=e.lokasi),t&&(t.textContent="Edit Data Driver"),n&&(n.textContent="Isi form di bawah untuk memperbarui data driver"),ct(!1)}async function ks(e){const t=await y(`/drivers/${e}`);bs(t),j("driver-form-modal")}function hs(e){const t=document.getElementById("driver-delete-copy");T.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus driver <strong>${u(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`),j("driver-delete-modal")}function ys(){const e=document.getElementById("drivers-add-btn"),t=document.getElementById("drivers-export-btn"),n=document.getElementById("drivers-search-input"),a=document.getElementById("driver-form"),o=document.getElementById("drivers-table-body"),r=document.getElementById("driver-delete-confirm-btn"),s=document.getElementById("drivers-prev-page-btn"),i=document.getElementById("drivers-next-page-btn");if(!(!e||!a||!o))return e.addEventListener("click",()=>{jn(),j("driver-form-modal")}),t?.addEventListener("click",()=>{tn("/export/drivers/csv","drivers.csv").catch(()=>{h("Gagal mengunduh file")})}),n?.addEventListener("input",he(async c=>{T.search=c.target.value.trim(),T.page=1;try{await Ee()}catch{h("Gagal memuat data")}})),a.addEventListener("submit",async c=>{c.preventDefault();const d={nama:document.getElementById("driver-nama")?.value.trim()||"",lokasi:document.getElementById("driver-lokasi")?.value.trim()||""};ct(!0);try{T.editItem?(await y(`/drivers/${T.editItem.id}`,{method:"PUT",body:d}),q("Data driver berhasil diperbarui")):(await y("/drivers",{method:"POST",body:d}),q("Driver berhasil ditambahkan")),z("driver-form-modal"),jn(),await Ee()}catch(l){h(l.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{ct(!1)}}),o.addEventListener("click",async c=>{const d=c.target.closest("[data-driver-edit]"),l=c.target.closest("[data-driver-delete]");try{if(d){await ks(d.dataset.driverEdit);return}l&&hs({id:l.dataset.driverDelete,nama:l.dataset.driverName})}catch{h("Gagal memuat data")}}),r?.addEventListener("click",async()=>{if(T.deleteItem)try{await y(`/drivers/${T.deleteItem.id}`,{method:"DELETE"}),q("Driver berhasil dihapus"),z("driver-delete-modal"),(T.page-1)*Te>=T.totalCount-1&&T.page>1&&(T.page-=1),T.deleteItem=null,await Ee()}catch{h("Gagal menghapus data")}}),s?.addEventListener("click",async()=>{if(!(T.page<=1)){T.page-=1;try{await Ee()}catch{h("Gagal memuat data")}}}),i?.addEventListener("click",async()=>{const c=Math.max(1,Math.ceil(T.totalCount/Te));if(!(T.page>=c)){T.page+=1;try{await Ee()}catch{h("Gagal memuat data")}}}),Ee().catch(()=>{h("Gagal memuat data")})}const w={data:[],loading:!0,totalCount:0,page:1,search:"",filterJenis:"",editItem:null,deleteItem:null,isSubmitting:!1},Ae=10;function vs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M5 14L6.6 9.2C6.8728 8.3816 7.6387 7.83 8.5014 7.83H15.4986C16.3613 7.83 17.1272 8.3816 17.4 9.2L19 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M4 14H20V17C20 18.1046 19.1046 19 18 19H6C4.89543 19 4 18.1046 4 17V14Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M7 16H7.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path>
            <path d="M17 16H17.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path>
        </svg>
    `}function Es(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function ws(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Bs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 13L11 22L2 13V4H11L20 13Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <circle cx="7.5" cy="8.5" r="1.5" fill="currentColor"></circle>
        </svg>
    `}function ut(e){const t=document.getElementById("mobil-submit-btn");w.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":w.editItem?"Perbarui":"Simpan")}function Is(e){return e==="Hiace"?"mobil-jenis-badge mobil-jenis-badge-hiace":"mobil-jenis-badge mobil-jenis-badge-reborn"}function _s(){const e=document.getElementById("mobil-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="mobil-table-state">
                <div class="mobil-loading-inline">
                    <span class="mobil-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function $s(){const e=document.getElementById("mobil-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="mobil-table-state mobil-empty-copy">
                Belum ada data mobil
            </td>
        </tr>
    `)}function qn(){const e=document.getElementById("mobil-table-body");if(e){if(w.loading){_s();return}if(w.data.length===0){$s();return}e.innerHTML=w.data.map((t,n)=>`
        <tr class="mobil-row" data-testid="mobil-row-${t.id}">
            <td class="mobil-index-cell">${(w.page-1)*Ae+n+1}</td>
            <td>
                <div class="mobil-code-cell">
                    <span class="mobil-code-avatar" aria-hidden="true">
                        ${vs()}
                    </span>
                    <span class="mobil-code-text">${u(t.kode_mobil)}</span>
                </div>
            </td>
            <td>
                <span class="${Is(t.jenis_mobil)}">
                    <span class="mobil-jenis-icon" aria-hidden="true">${Bs()}</span>
                    <span>${u(t.jenis_mobil)}</span>
                </span>
            </td>
            <td>
                <div class="mobil-action-row">
                    <button
                        class="mobil-icon-button"
                        type="button"
                        data-mobil-edit="${t.id}"
                        data-testid="edit-mobil-${t.id}"
                        aria-label="Edit mobil ${u(t.kode_mobil)}"
                    >
                        ${Es()}
                    </button>
                    <button
                        class="mobil-icon-button mobil-icon-button-danger"
                        type="button"
                        data-mobil-delete="${t.id}"
                        data-mobil-name="${u(t.kode_mobil)}"
                        data-testid="delete-mobil-${t.id}"
                        aria-label="Hapus mobil ${u(t.kode_mobil)}"
                    >
                        ${ws()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function Nn(){const e=document.getElementById("mobil-pagination-shell"),t=document.getElementById("mobil-pagination-info"),n=document.getElementById("mobil-pagination-page"),a=document.getElementById("mobil-prev-page-btn"),o=document.getElementById("mobil-next-page-btn"),r=Math.max(1,Math.ceil(w.totalCount/Ae));e&&(e.hidden=r<=1),t&&(t.textContent=ye(w.page,Ae,w.totalCount,w.data.length)),n&&(n.textContent=`${w.page} / ${r}`),a&&(a.disabled=w.page===1),o&&(o.disabled=w.page>=r)}async function pe(){w.loading=!0,qn(),Nn();try{const[e,t]=await Promise.all([y(`/mobil?page=${w.page}&limit=${Ae}${w.search?`&search=${encodeURIComponent(w.search)}`:""}${w.filterJenis?`&jenis=${encodeURIComponent(w.filterJenis)}`:""}`),y(`/mobil/count${w.search||w.filterJenis?"?":""}${[w.search?`search=${encodeURIComponent(w.search)}`:"",w.filterJenis?`jenis=${encodeURIComponent(w.filterJenis)}`:""].filter(Boolean).join("&")}`)]);w.data=Array.isArray(e)?e:[],w.totalCount=Number(t.count||0)}finally{w.loading=!1,qn(),Nn()}}function Un(){const e=document.getElementById("mobil-form"),t=document.getElementById("mobil-form-title"),n=document.getElementById("mobil-form-description"),a=document.getElementById("mobil-id"),o=document.getElementById("mobil-kode"),r=document.getElementById("mobil-jenis");e?.reset(),a&&(a.value=""),o&&(o.value=""),r&&(r.value="Hiace"),t&&(t.textContent="Tambah Mobil Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan data mobil"),w.editItem=null,ut(!1)}function Ss(e){const t=document.getElementById("mobil-form-title"),n=document.getElementById("mobil-form-description"),a=document.getElementById("mobil-id"),o=document.getElementById("mobil-kode"),r=document.getElementById("mobil-jenis");w.editItem=e,a&&(a.value=e.id),o&&(o.value=e.kode_mobil),r&&(r.value=e.jenis_mobil),t&&(t.textContent="Edit Data Mobil"),n&&(n.textContent="Isi form di bawah untuk memperbarui data mobil"),ut(!1)}async function Cs(e){const t=await y(`/mobil/${e}`);Ss(t),j("mobil-form-modal")}function xs(e){const t=document.getElementById("mobil-delete-copy");w.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus mobil <strong>${u(e.kode_mobil)}</strong>? Tindakan ini tidak dapat dibatalkan.`),j("mobil-delete-modal")}function Ls(){const e=document.getElementById("mobil-add-btn"),t=document.getElementById("mobil-export-btn"),n=document.getElementById("mobil-search-input"),a=document.getElementById("mobil-filter-jenis"),o=document.getElementById("mobil-form"),r=document.getElementById("mobil-table-body"),s=document.getElementById("mobil-delete-confirm-btn"),i=document.getElementById("mobil-prev-page-btn"),c=document.getElementById("mobil-next-page-btn"),d=document.getElementById("mobil-kode");if(!(!e||!o||!r))return e.addEventListener("click",()=>{Un(),j("mobil-form-modal")}),t?.addEventListener("click",()=>{tn("/export/mobil/csv","mobil.csv").catch(()=>{h("Gagal mengunduh file")})}),n?.addEventListener("input",he(async l=>{w.search=l.target.value.trim(),w.page=1;try{await pe()}catch{h("Gagal memuat data")}})),a?.addEventListener("change",async l=>{w.filterJenis=l.target.value,w.page=1;try{await pe()}catch{h("Gagal memuat data")}}),d?.addEventListener("input",l=>{l.target.value=l.target.value.toUpperCase()}),o.addEventListener("submit",async l=>{l.preventDefault();const k={kode_mobil:document.getElementById("mobil-kode")?.value.trim().toUpperCase()||"",jenis_mobil:document.getElementById("mobil-jenis")?.value||"Hiace"};ut(!0);try{w.editItem?(await y(`/mobil/${w.editItem.id}`,{method:"PUT",body:k}),q("Data mobil berhasil diperbarui")):(await y("/mobil",{method:"POST",body:k}),q("Mobil berhasil ditambahkan")),z("mobil-form-modal"),Un(),await pe()}catch(v){h(v.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{ut(!1)}}),r.addEventListener("click",async l=>{const k=l.target.closest("[data-mobil-edit]"),v=l.target.closest("[data-mobil-delete]");try{if(k){await Cs(k.dataset.mobilEdit);return}v&&xs({id:v.dataset.mobilDelete,kode_mobil:v.dataset.mobilName})}catch{h("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(w.deleteItem)try{await y(`/mobil/${w.deleteItem.id}`,{method:"DELETE"}),q("Mobil berhasil dihapus"),z("mobil-delete-modal"),(w.page-1)*Ae>=w.totalCount-1&&w.page>1&&(w.page-=1),w.deleteItem=null,await pe()}catch{h("Gagal menghapus data")}}),i?.addEventListener("click",async()=>{if(!(w.page<=1)){w.page-=1;try{await pe()}catch{h("Gagal memuat data")}}}),c?.addEventListener("click",async()=>{const l=Math.max(1,Math.ceil(w.totalCount/Ae));if(!(w.page>=l)){w.page+=1;try{await pe()}catch{h("Gagal memuat data")}}}),pe().catch(()=>{h("Gagal memuat data")})}const B={data:[],drivers:[],mobilList:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1},He=10,Hn={"05:00":"Subuh (05.00 WIB)","08:00":"Pagi (08.00 WIB)","10:00":"Pagi (10.00 WIB)","14:00":"Siang (14.00 WIB)","16:00":"Sore (16.00 WIB)","19:00":"Malam (19.00 WIB)"},$t="08:00",Ts=["Reguler","Dropping","Rental"],sn="Reguler";function As(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Ms(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function dn(e){return e==="Lunas"?"Lunas":"Belum Lunas"}function Fn(e){const t=dn(e);return`<span class="keberangkatan-payment-badge ${t==="Lunas"?"is-paid":"is-unpaid"}">${u(t)}</span>`}function Gn(e){return Hn[e]||Hn[$t]}function mt(e){return Ts.includes(e)?e:sn}function Rs(){const e=Number(document.getElementById("keberangkatan-tarif-penumpang")?.value||0),t=Number(document.getElementById("keberangkatan-uang-paket")?.value||0),n=Number(document.getElementById("keberangkatan-jumlah-snack")?.value||0),a=Number(document.getElementById("keberangkatan-pengembalian-snack")?.value||0),o=Number(document.getElementById("keberangkatan-jumlah-air-mineral")?.value||0),r=e,s=r+t,i=s*.15,c=s*.85;return{jumlah_uang_penumpang:r,uang_paket:t,total:s,uang_pc:i,uang_bersih:c,jumlah_snack:n,pengembalian_snack:a,jumlah_air_mineral:o}}function ln(){const e=Rs();Object.entries(e).forEach(([t,n])=>{const a=document.querySelector(`[data-calc="${t}"]`);if(a){if(t==="jumlah_snack"){a.textContent=`${O(n)} item`;return}if(t==="pengembalian_snack"){a.textContent=`${O(n)} item`;return}if(t==="jumlah_air_mineral"){a.textContent=`${O(n)} botol`;return}a.textContent=H(n)}})}function pt(e,t,n,a,o=""){const r=document.getElementById(e);if(!r)return;const s=e==="keberangkatan-kode-mobil"?"Pilih mobil":"Pilih driver";r.innerHTML=`
        <option value="">${s}</option>
        ${t.map(i=>`
            <option value="${i[n]}" ${String(i[n])===String(o)?"selected":""}>
                ${u(a(i))}
            </option>
        `).join("")}
    `}function gt(e){const t=document.getElementById("keberangkatan-submit-btn");B.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":B.editItem?"Perbarui":"Simpan")}function Ps(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");e&&(e.innerHTML=`
        <tr>
            <td colspan="18" class="keberangkatan-table-state">
                <div class="keberangkatan-loading-inline">
                    <span class="keberangkatan-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `,t&&(t.hidden=!1,t.innerHTML=`
            <div class="keberangkatan-mobile-state">
                <div class="keberangkatan-loading-inline">
                    <span class="keberangkatan-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </div>
        `))}function Ds(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");e&&(e.innerHTML=`
        <tr>
            <td colspan="18" class="keberangkatan-table-state keberangkatan-empty-copy">
                Belum ada data keberangkatan
            </td>
        </tr>
    `,t&&(t.hidden=!1,t.innerHTML=`
            <div class="keberangkatan-mobile-state keberangkatan-empty-copy">
                Belum ada data keberangkatan
            </div>
        `))}function Vn(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");if(e){if(B.loading){Ps();return}if(B.data.length===0){Ds();return}e.innerHTML=B.data.map(n=>`
        <tr class="keberangkatan-row" data-testid="keberangkatan-row-${n.id}">
            <td class="keberangkatan-hari-cell">${u(n.hari)}</td>
            <td>${u(n.tanggal)}</td>
            <td>${u(n.jam_keberangkatan_label||Gn(n.jam_keberangkatan))}</td>
            <td>${u(mt(n.tipe_layanan))}</td>
            <td>
                <span class="keberangkatan-kode-badge">${u(n.kode_mobil)}</span>
            </td>
            <td>${u(n.driver_nama)}</td>
            <td class="text-right">${O(n.jumlah_penumpang)}</td>
            <td class="text-right keberangkatan-money-cell">${H(n.jumlah_uang_penumpang)}</td>
            <td class="text-right">${O(n.jumlah_paket)}</td>
            <td class="text-right keberangkatan-money-cell">${H(n.uang_paket)}</td>
            <td class="text-right"><span class="keberangkatan-stock-badge">${O(n.jumlah_snack)}</span></td>
            <td class="text-right"><span class="keberangkatan-stock-badge keberangkatan-stock-badge-blue">${O(n.pengembalian_snack)}</span></td>
            <td class="text-right"><span class="keberangkatan-stock-badge keberangkatan-stock-badge-blue">${O(n.jumlah_air_mineral)}</span></td>
            <td class="text-right keberangkatan-money-cell keberangkatan-money-cell-amber">${H(n.uang_pc)}</td>
            <td class="text-right keberangkatan-money-cell keberangkatan-money-cell-emerald">${H(n.uang_bersih)}</td>
            <td class="text-center">${Fn(n.status_pembayaran)}</td>
            <td class="text-center">
                <span class="keberangkatan-trip-badge">#${O(n.trip_ke)}</span>
            </td>
            <td>
                <div class="keberangkatan-action-row">
                    <button
                        class="keberangkatan-icon-button"
                        type="button"
                        data-keberangkatan-edit="${n.id}"
                        data-testid="edit-keberangkatan-${n.id}"
                        aria-label="Edit data keberangkatan ${u(n.kode_mobil)}"
                    >
                        ${As()}
                    </button>
                    <button
                        class="keberangkatan-icon-button keberangkatan-icon-button-danger"
                        type="button"
                        data-keberangkatan-delete="${n.id}"
                        data-testid="delete-keberangkatan-${n.id}"
                        aria-label="Hapus data keberangkatan ${u(n.kode_mobil)}"
                    >
                        ${Ms()}
                    </button>
                </div>
            </td>
        </tr>
    `).join(""),t&&(t.hidden=!1,t.innerHTML=B.data.map(n=>`
            <article class="keberangkatan-mobile-card" data-testid="keberangkatan-card-${n.id}">
                <div class="keberangkatan-mobile-card-head">
                    <div>
                        <p class="keberangkatan-mobile-day">${u(n.hari)}</p>
                        <h3 class="keberangkatan-mobile-date">${u(n.tanggal)}</h3>
                        <p>${u(n.jam_keberangkatan_label||Gn(n.jam_keberangkatan))}</p>
                    </div>
                    <div class="keberangkatan-mobile-head-side">
                        <span class="keberangkatan-kode-badge">${u(n.kode_mobil)}</span>
                        <span class="keberangkatan-trip-badge">#${O(n.trip_ke)}</span>
                    </div>
                </div>

                <div class="keberangkatan-mobile-driver">
                    <span>Driver</span>
                    <strong>${u(n.driver_nama)}</strong>
                </div>

                <div class="keberangkatan-mobile-grid">
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-status">
                        <span>Validasi</span>
                        ${Fn(n.status_pembayaran)}
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Layanan</span>
                        <strong>${u(mt(n.tipe_layanan))}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Penumpang</span>
                        <strong>${O(n.jumlah_penumpang)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Paket</span>
                        <strong>${O(n.jumlah_paket)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Snack</span>
                        <strong>${O(n.jumlah_snack)} item</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Pengembalian Snack</span>
                        <strong>${O(n.pengembalian_snack)} item</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Air Mineral</span>
                        <strong>${O(n.jumlah_air_mineral)} botol</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-full">
                        <span>Jumlah Tarif</span>
                        <strong>${H(n.jumlah_uang_penumpang)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-full">
                        <span>Uang Paket</span>
                        <strong>${H(n.uang_paket)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-accent">
                        <span>Uang PC (15%)</span>
                        <strong>${H(n.uang_pc)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-emerald">
                        <span>Uang Bersih</span>
                        <strong>${H(n.uang_bersih)}</strong>
                    </div>
                </div>

                <div class="keberangkatan-mobile-actions">
                    <button
                        class="keberangkatan-secondary-button"
                        type="button"
                        data-keberangkatan-edit="${n.id}"
                        data-testid="edit-keberangkatan-mobile-${n.id}"
                    >
                        Edit
                    </button>
                    <button
                        class="keberangkatan-danger-button"
                        type="button"
                        data-keberangkatan-delete="${n.id}"
                        data-testid="delete-keberangkatan-mobile-${n.id}"
                    >
                        Hapus
                    </button>
                </div>
            </article>
        `).join(""))}}function Jn(){const e=document.getElementById("keberangkatan-pagination-shell"),t=document.getElementById("keberangkatan-pagination-info"),n=document.getElementById("keberangkatan-pagination-page"),a=document.getElementById("keberangkatan-prev-page-btn"),o=document.getElementById("keberangkatan-next-page-btn"),r=Math.max(1,Math.ceil(B.totalCount/He));e&&(e.hidden=r<=1),t&&(t.textContent=ye(B.page,He,B.totalCount,B.data.length)),n&&(n.textContent=`${B.page} / ${r}`),a&&(a.disabled=B.page===1),o&&(o.disabled=B.page>=r)}async function we(){B.loading=!0,Vn(),Jn();try{const[e,t,n,a]=await Promise.all([y(`/keberangkatan?page=${B.page}&limit=${He}${B.search?`&search=${encodeURIComponent(B.search)}`:""}`),y(`/keberangkatan/count${B.search?`?search=${encodeURIComponent(B.search)}`:""}`),y("/drivers/all"),y("/mobil/all")]);B.data=Array.isArray(e)?e:[],B.totalCount=Number(t.count||0),B.drivers=Array.isArray(n)?n:[],B.mobilList=Array.isArray(a)?a:[]}finally{B.loading=!1,Vn(),Jn()}}function Ga(){document.getElementById("keberangkatan-form")?.scrollTo({top:0,behavior:"auto"})}function Rt(){const e=document.getElementById("keberangkatan-form"),t=document.getElementById("keberangkatan-form-title"),n=document.getElementById("keberangkatan-form-description"),a=document.getElementById("keberangkatan-tanggal"),o=document.getElementById("keberangkatan-jam-keberangkatan"),r=document.getElementById("keberangkatan-trip-ke"),s=document.getElementById("keberangkatan-tipe-layanan"),i=document.getElementById("keberangkatan-jumlah-penumpang"),c=document.getElementById("keberangkatan-tarif-penumpang"),d=document.getElementById("keberangkatan-jumlah-paket"),l=document.getElementById("keberangkatan-uang-paket"),k=document.getElementById("keberangkatan-jumlah-snack"),v=document.getElementById("keberangkatan-pengembalian-snack"),A=document.getElementById("keberangkatan-jumlah-air-mineral"),p=document.getElementById("keberangkatan-status-pembayaran");e?.reset(),B.editItem=null,document.getElementById("keberangkatan-id").value="",t&&(t.textContent="Tambah Data Keberangkatan"),n&&(n.textContent="Isi form di bawah untuk menambahkan data keberangkatan"),a&&(a.value=Ze()),o&&(o.value=$t),pt("keberangkatan-kode-mobil",B.mobilList,"kode_mobil",b=>`${b.kode_mobil} - ${b.jenis_mobil}`,B.mobilList[0]?.kode_mobil||""),pt("keberangkatan-driver-id",B.drivers,"id",b=>`${b.nama} - ${b.lokasi}`,B.drivers[0]?.id||""),r&&(r.value="1"),s&&(s.value=sn),i&&(i.value="0"),c&&(c.value="0"),d&&(d.value="0"),l&&(l.value="0"),k&&(k.value="0"),v&&(v.value="0"),A&&(A.value="0"),p&&(p.value="Belum Lunas"),gt(!1),ln(),Ga()}async function Kn(e){const t=await y(`/keberangkatan/${e}`),n=document.getElementById("keberangkatan-form-title"),a=document.getElementById("keberangkatan-form-description");B.editItem=t,document.getElementById("keberangkatan-id").value=t.id,document.getElementById("keberangkatan-tanggal").value=t.tanggal,document.getElementById("keberangkatan-jam-keberangkatan").value=t.jam_keberangkatan||$t,document.getElementById("keberangkatan-trip-ke").value=t.trip_ke,document.getElementById("keberangkatan-tipe-layanan").value=mt(t.tipe_layanan),document.getElementById("keberangkatan-jumlah-penumpang").value=t.jumlah_penumpang,document.getElementById("keberangkatan-tarif-penumpang").value=t.tarif_penumpang,document.getElementById("keberangkatan-jumlah-paket").value=t.jumlah_paket,document.getElementById("keberangkatan-uang-paket").value=t.uang_paket,document.getElementById("keberangkatan-jumlah-snack").value=t.jumlah_snack,document.getElementById("keberangkatan-pengembalian-snack").value=t.pengembalian_snack,document.getElementById("keberangkatan-jumlah-air-mineral").value=t.jumlah_air_mineral,document.getElementById("keberangkatan-status-pembayaran").value=dn(t.status_pembayaran),pt("keberangkatan-kode-mobil",B.mobilList,"kode_mobil",o=>`${o.kode_mobil} - ${o.jenis_mobil}`,t.kode_mobil),pt("keberangkatan-driver-id",B.drivers,"id",o=>`${o.nama} - ${o.lokasi}`,t.driver_id),n&&(n.textContent="Edit Data Keberangkatan"),a&&(a.textContent="Isi form di bawah untuk memperbarui data keberangkatan"),gt(!1),ln(),Ga(),j("keberangkatan-form-modal")}function zn(e){B.deleteItem=e,j("keberangkatan-delete-modal")}function Os(){const e=document.getElementById("keberangkatan-add-btn"),t=document.getElementById("keberangkatan-export-btn"),n=document.getElementById("keberangkatan-search-input"),a=document.getElementById("keberangkatan-form"),o=document.getElementById("keberangkatan-table-body"),r=document.getElementById("keberangkatan-mobile-list"),s=document.getElementById("keberangkatan-delete-confirm-btn"),i=document.getElementById("keberangkatan-prev-page-btn"),c=document.getElementById("keberangkatan-next-page-btn");if(!(!e||!a||!o))return e.addEventListener("click",()=>{Rt(),j("keberangkatan-form-modal")}),t?.addEventListener("click",()=>{tn("/export/keberangkatan/csv","keberangkatan.csv").catch(()=>{h("Gagal mengunduh file")})}),n?.addEventListener("input",he(async d=>{B.search=d.target.value.trim(),B.page=1;try{await we()}catch{h("Gagal memuat data")}})),a.addEventListener("input",d=>{["keberangkatan-jumlah-penumpang","keberangkatan-tarif-penumpang","keberangkatan-uang-paket","keberangkatan-jumlah-snack","keberangkatan-pengembalian-snack","keberangkatan-jumlah-air-mineral"].includes(d.target.id)&&ln()}),a.addEventListener("submit",async d=>{d.preventDefault();const l={tanggal:document.getElementById("keberangkatan-tanggal")?.value||"",jam_keberangkatan:document.getElementById("keberangkatan-jam-keberangkatan")?.value||$t,tipe_layanan:mt(document.getElementById("keberangkatan-tipe-layanan")?.value||sn),kode_mobil:document.getElementById("keberangkatan-kode-mobil")?.value||"",driver_id:document.getElementById("keberangkatan-driver-id")?.value||"",jumlah_penumpang:Number(document.getElementById("keberangkatan-jumlah-penumpang")?.value||0),tarif_penumpang:Number(document.getElementById("keberangkatan-tarif-penumpang")?.value||0),jumlah_paket:Number(document.getElementById("keberangkatan-jumlah-paket")?.value||0),uang_paket:Number(document.getElementById("keberangkatan-uang-paket")?.value||0),jumlah_snack:Number(document.getElementById("keberangkatan-jumlah-snack")?.value||0),pengembalian_snack:Number(document.getElementById("keberangkatan-pengembalian-snack")?.value||0),jumlah_air_mineral:Number(document.getElementById("keberangkatan-jumlah-air-mineral")?.value||0),trip_ke:Number(document.getElementById("keberangkatan-trip-ke")?.value||1),status_pembayaran:dn(document.getElementById("keberangkatan-status-pembayaran")?.value||"")};gt(!0);try{B.editItem?(await y(`/keberangkatan/${B.editItem.id}`,{method:"PUT",body:l}),q("Data berhasil diperbarui")):(await y("/keberangkatan",{method:"POST",body:l}),q("Data berhasil ditambahkan")),z("keberangkatan-form-modal"),Rt(),await we()}catch(k){h(k.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{gt(!1)}}),o.addEventListener("click",async d=>{const l=d.target.closest("[data-keberangkatan-edit]"),k=d.target.closest("[data-keberangkatan-delete]");try{if(l){await Kn(l.dataset.keberangkatanEdit);return}k&&zn({id:k.dataset.keberangkatanDelete})}catch{h("Gagal memuat data")}}),r?.addEventListener("click",async d=>{const l=d.target.closest("[data-keberangkatan-edit]"),k=d.target.closest("[data-keberangkatan-delete]");try{if(l){await Kn(l.dataset.keberangkatanEdit);return}k&&zn({id:k.dataset.keberangkatanDelete})}catch{h("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(B.deleteItem)try{await y(`/keberangkatan/${B.deleteItem.id}`,{method:"DELETE"}),q("Data berhasil dihapus"),z("keberangkatan-delete-modal"),(B.page-1)*He>=B.totalCount-1&&B.page>1&&(B.page-=1),B.deleteItem=null,await we()}catch{h("Gagal menghapus data")}}),i?.addEventListener("click",async()=>{if(!(B.page<=1)){B.page-=1;try{await we()}catch{h("Gagal memuat data")}}}),c?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil(B.totalCount/He));if(!(B.page>=d)){B.page+=1;try{await we()}catch{h("Gagal memuat data")}}}),we().then(()=>{Rt()}).catch(()=>{h("Gagal memuat data")})}const _={data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1,prices:{snack:0,air:0}},Fe=10;function js(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function qs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function ft(e){return Number(document.getElementById(e)?.value||0)}function bt(){const e=ft("stock-total-snack"),t=ft("stock-total-air"),n=e*_.prices.snack+t*_.prices.air,a=document.querySelector('[data-stock-calc="nilai_total"]'),o=document.getElementById("stock-snack-price-label"),r=document.getElementById("stock-air-price-label");o&&(o.textContent=H(_.prices.snack)),r&&(r.textContent=H(_.prices.air)),a&&(a.textContent=H(n))}function kt(e){const t=document.getElementById("stock-submit-btn");_.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":_.editItem?"Perbarui":"Simpan")}function Ns(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");e&&(e.innerHTML=`
        <tr>
            <td colspan="14" class="stock-table-state">
                <div class="stock-loading-inline">
                    <span class="stock-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `,t&&(t.hidden=!1,t.innerHTML=`
            <div class="stock-mobile-state">
                <div class="stock-loading-inline">
                    <span class="stock-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </div>
        `))}function Us(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");e&&(e.innerHTML=`
        <tr>
            <td colspan="14" class="stock-table-state stock-empty-copy">
                Belum ada data stok snack dan air mineral
            </td>
        </tr>
    `,t&&(t.hidden=!1,t.innerHTML=`
            <div class="stock-mobile-state stock-empty-copy">
                Belum ada data stok snack dan air mineral
            </div>
        `))}function Wn(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");if(e){if(_.loading){Ns();return}if(_.data.length===0){Us();return}e.innerHTML=_.data.map(n=>`
        <tr class="stock-row" data-testid="stock-row-${n.id}">
            <td class="stock-day-cell">${u(n.hari)}</td>
            <td>${u(n.tanggal)}</td>
            <td>${u(n.bulan)}</td>
            <td class="text-right">${O(n.total_stock_snack_display??n.total_stock_snack)}</td>
            <td class="text-right">${O(n.total_stock_air_mineral)}</td>
            <td class="text-right">${O(n.pengembalian_snack)}</td>
            <td class="text-right">${O(n.terpakai_snack)}</td>
            <td class="text-right">${O(n.terpakai_air_mineral)}</td>
            <td class="text-right"><span class="stock-value-badge stock-value-badge-emerald">${O(n.sisa_stock_snack)}</span></td>
            <td class="text-right"><span class="stock-value-badge stock-value-badge-blue">${O(n.sisa_stock_air_mineral)}</span></td>
            <td class="text-right stock-money-cell">${H(n.nilai_total)}</td>
            <td class="text-right stock-money-cell stock-money-cell-emerald">${H(n.sisa_nilai_total)}</td>
            <td>${u(n.keterangan||"-")}</td>
            <td>
                <div class="stock-action-row">
                    <button
                        class="stock-icon-button"
                        type="button"
                        data-stock-edit="${n.id}"
                        data-testid="edit-stock-${n.id}"
                        aria-label="Edit data stok ${u(n.tanggal)}"
                    >
                        ${js()}
                    </button>
                    <button
                        class="stock-icon-button stock-icon-button-danger"
                        type="button"
                        data-stock-delete="${n.id}"
                        data-stock-date="${u(n.tanggal)}"
                        data-testid="delete-stock-${n.id}"
                        aria-label="Hapus data stok ${u(n.tanggal)}"
                    >
                        ${qs()}
                    </button>
                </div>
            </td>
        </tr>
    `).join(""),t&&(t.hidden=!1,t.innerHTML=_.data.map(n=>`
            <article class="stock-mobile-card" data-testid="stock-card-${n.id}">
                <div class="stock-mobile-card-head">
                    <div>
                        <p class="stock-mobile-day">${u(n.hari)}</p>
                        <h3 class="stock-mobile-date">${u(n.tanggal)}</h3>
                    </div>
                    <span class="stock-mobile-month">${u(n.bulan)}</span>
                </div>

                <div class="stock-mobile-grid">
                    <div class="stock-mobile-item">
                        <span>Total Snack</span>
                        <strong>${O(n.total_stock_snack_display??n.total_stock_snack)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Total Air Mineral</span>
                        <strong>${O(n.total_stock_air_mineral)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Pengembalian Snack</span>
                        <strong>${O(n.pengembalian_snack)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Terpakai Snack</span>
                        <strong>${O(n.terpakai_snack)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Terpakai Air Mineral</span>
                        <strong>${O(n.terpakai_air_mineral)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Sisa Snack</span>
                        <strong>${O(n.sisa_stock_snack)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Sisa Air Mineral</span>
                        <strong>${O(n.sisa_stock_air_mineral)}</strong>
                    </div>
                    <div class="stock-mobile-item stock-mobile-item-full">
                        <span>Nilai Total</span>
                        <strong>${H(n.nilai_total)}</strong>
                    </div>
                    <div class="stock-mobile-item stock-mobile-item-full stock-mobile-item-emerald">
                        <span>Sisa Nilai Total</span>
                        <strong>${H(n.sisa_nilai_total)}</strong>
                    </div>
                    <div class="stock-mobile-item stock-mobile-item-full">
                        <span>Keterangan</span>
                        <strong>${u(n.keterangan||"-")}</strong>
                    </div>
                </div>

                <div class="stock-mobile-actions">
                    <button
                        class="stock-secondary-button"
                        type="button"
                        data-stock-edit="${n.id}"
                        data-testid="edit-stock-mobile-${n.id}"
                    >
                        Edit
                    </button>
                    <button
                        class="stock-danger-button"
                        type="button"
                        data-stock-delete="${n.id}"
                        data-stock-date="${u(n.tanggal)}"
                        data-testid="delete-stock-mobile-${n.id}"
                    >
                        Hapus
                    </button>
                </div>
            </article>
        `).join(""))}}function Xn(){const e=document.getElementById("stock-pagination-shell"),t=document.getElementById("stock-pagination-info"),n=document.getElementById("stock-pagination-page"),a=document.getElementById("stock-prev-page-btn"),o=document.getElementById("stock-next-page-btn"),r=Math.max(1,Math.ceil(_.totalCount/Fe));e&&(e.hidden=r<=1),t&&(t.textContent=ye(_.page,Fe,_.totalCount,_.data.length)),n&&(n.textContent=`${_.page} / ${r}`),a&&(a.disabled=_.page===1),o&&(o.disabled=_.page>=r)}async function Be(){_.loading=!0,Wn(),Xn();try{const[e,t]=await Promise.all([y(`/stock?page=${_.page}&limit=${Fe}${_.search?`&search=${encodeURIComponent(_.search)}`:""}`),y(`/stock/count${_.search?`?search=${encodeURIComponent(_.search)}`:""}`)]);_.data=Array.isArray(e)?e:[],_.totalCount=Number(t.count||0)}finally{_.loading=!1,Wn(),Xn()}}function Zn(){const e=document.getElementById("stock-form"),t=document.getElementById("stock-form-title"),n=document.getElementById("stock-form-description");e?.reset(),_.editItem=null,document.getElementById("stock-id").value="",document.getElementById("stock-tanggal").value=Ze(),document.getElementById("stock-total-snack").value="0",document.getElementById("stock-total-air").value="0",document.getElementById("stock-keterangan").value="",t&&(t.textContent="Tambah Stok Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan stok snack dan air mineral"),kt(!1),bt()}function Hs(e){const t=document.getElementById("stock-form-title"),n=document.getElementById("stock-form-description");_.editItem=e,document.getElementById("stock-id").value=e.id,document.getElementById("stock-tanggal").value=e.tanggal,document.getElementById("stock-total-snack").value=e.total_stock_snack,document.getElementById("stock-total-air").value=e.total_stock_air_mineral,document.getElementById("stock-keterangan").value=e.keterangan||"",t&&(t.textContent="Edit Data Stok"),n&&(n.textContent="Isi form di bawah untuk memperbarui stok snack dan air mineral"),kt(!1),bt()}async function Qn(e){const t=await y(`/stock/${e}`);Hs(t),j("stock-form-modal")}function Yn(e){const t=document.getElementById("stock-delete-copy");_.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus data stok tanggal <strong>${u(e.tanggal)}</strong>? Tindakan ini tidak dapat dibatalkan.`),j("stock-delete-modal")}function Fs(){const e=document.querySelector("[data-stock-page]"),t=document.getElementById("stock-add-btn"),n=document.getElementById("stock-search-input"),a=document.getElementById("stock-form"),o=document.getElementById("stock-table-body"),r=document.getElementById("stock-mobile-list"),s=document.getElementById("stock-delete-confirm-btn"),i=document.getElementById("stock-prev-page-btn"),c=document.getElementById("stock-next-page-btn");if(!(!e||!t||!a||!o))return _.prices.snack=Number(e.dataset.stockSnackPrice||0),_.prices.air=Number(e.dataset.stockAirPrice||0),bt(),t.addEventListener("click",()=>{Zn(),j("stock-form-modal")}),n?.addEventListener("input",he(async d=>{_.search=d.target.value.trim(),_.page=1;try{await Be()}catch{h("Gagal memuat data")}})),a.addEventListener("input",d=>{["stock-total-snack","stock-total-air"].includes(d.target.id)&&bt()}),a.addEventListener("submit",async d=>{d.preventDefault();const l={tanggal:document.getElementById("stock-tanggal")?.value||"",total_stock_snack:ft("stock-total-snack"),total_stock_air_mineral:ft("stock-total-air"),keterangan:document.getElementById("stock-keterangan")?.value.trim()||""};kt(!0);try{_.editItem?(await y(`/stock/${_.editItem.id}`,{method:"PUT",body:l}),q("Data stok berhasil diperbarui")):(await y("/stock",{method:"POST",body:l}),q("Data stok berhasil ditambahkan")),z("stock-form-modal"),Zn(),await Be()}catch(k){h(k.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{kt(!1)}}),o.addEventListener("click",async d=>{const l=d.target.closest("[data-stock-edit]"),k=d.target.closest("[data-stock-delete]");try{if(l){await Qn(l.dataset.stockEdit);return}k&&Yn({id:k.dataset.stockDelete,tanggal:k.dataset.stockDate})}catch{h("Gagal memuat data")}}),r?.addEventListener("click",async d=>{const l=d.target.closest("[data-stock-edit]"),k=d.target.closest("[data-stock-delete]");try{if(l){await Qn(l.dataset.stockEdit);return}k&&Yn({id:k.dataset.stockDelete,tanggal:k.dataset.stockDate})}catch{h("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(_.deleteItem)try{await y(`/stock/${_.deleteItem.id}`,{method:"DELETE"}),q("Data stok berhasil dihapus"),z("stock-delete-modal"),(_.page-1)*Fe>=_.totalCount-1&&_.page>1&&(_.page-=1),_.deleteItem=null,await Be()}catch{h("Gagal menghapus data")}}),i?.addEventListener("click",async()=>{if(!(_.page<=1)){_.page-=1;try{await Be()}catch{h("Gagal memuat data")}}}),c?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil(_.totalCount/Fe));if(!(_.page>=d)){_.page+=1;try{await Be()}catch{h("Gagal memuat data")}}}),Be().catch(()=>{h("Gagal memuat data")})}const Ge=10,S={currentUser:null,data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,defaultRole:"User"};function Gs(e){return["Super Admin","Admin"].includes(e)}function Vs(e){return e==="Super Admin"}function Js(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function Ks(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M2.5 12C4.4 8.2 8 6 12 6C16 6 19.6 8.2 21.5 12C19.6 15.8 16 18 12 18C8 18 4.4 15.8 2.5 12Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function zs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Ws(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Xs(){return Vs(S.currentUser?.role)?["Super Admin","Admin","User"]:["Admin","User"]}function ht(e){se(document.getElementById("admin-user-submit-btn"),e,"Menyimpan...")}function Zs(e){return e==="Super Admin"?"admin-users-role-badge admin-users-role-badge-super":e==="Admin"?"admin-users-role-badge admin-users-role-badge-admin":"admin-users-role-badge admin-users-role-badge-user"}function Qs(){const e=document.getElementById("admin-users-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="6" class="admin-users-table-state">
                <div class="admin-users-loading-inline">
                    <span class="admin-users-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function Va(e="Belum ada akun admin atau user."){const t=document.getElementById("admin-users-table-body");t&&(t.innerHTML=`
        <tr>
            <td colspan="6" class="admin-users-table-state admin-users-empty-copy">${u(e)}</td>
        </tr>
    `)}function ea(){const e=document.getElementById("admin-users-table-body");if(e){if(S.loading){Qs();return}if(S.data.length===0){Va();return}e.innerHTML=S.data.map(t=>`
        <tr class="admin-users-row" data-testid="admin-user-row-${t.id}">
            <td>
                <div class="admin-users-name-cell">
                    <span class="admin-users-avatar" aria-hidden="true">${Js()}</span>
                    <div>
                        <span class="admin-users-name">${u(t.nama)}</span>
                        <span class="admin-users-name-meta">${t.is_current_user?"Akun yang sedang login":"Akun dashboard aktif"}</span>
                    </div>
                </div>
            </td>
            <td><span class="admin-users-username">@${u(t.username)}</span></td>
            <td><span class="admin-users-email">${u(t.email)}</span></td>
            <td>
                <div class="admin-users-password-cell">
                    <span class="admin-users-password-mask">${u(t.password_mask)}</span>
                    <span class="admin-users-password-copy">Terenkripsi</span>
                </div>
            </td>
            <td><span class="${Zs(t.role)}">${u(t.role)}</span></td>
            <td>
                <div class="admin-users-action-row">
                    <button class="admin-users-icon-button" type="button" data-admin-user-show="${t.id}" data-testid="show-admin-user-${t.id}" aria-label="Lihat detail akun ${u(t.nama)}">
                        ${Ks()}
                    </button>
                    <button class="admin-users-icon-button" type="button" data-admin-user-edit="${t.id}" data-testid="edit-admin-user-${t.id}" aria-label="Edit akun ${u(t.nama)}" ${t.can_edit?"":"disabled"}>
                        ${zs()}
                    </button>
                    <button class="admin-users-icon-button admin-users-icon-button-danger" type="button" data-admin-user-delete="${t.id}" data-admin-user-name="${u(t.nama)}" data-testid="delete-admin-user-${t.id}" aria-label="Hapus akun ${u(t.nama)}" ${t.can_delete?"":"disabled"}>
                        ${Ws()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function Vt(){const e=document.getElementById("admin-users-pagination-shell"),t=document.getElementById("admin-users-pagination-info"),n=document.getElementById("admin-users-pagination-page"),a=document.getElementById("admin-users-prev-page-btn"),o=document.getElementById("admin-users-next-page-btn"),r=Math.max(1,Math.ceil(S.totalCount/Ge));e&&(e.hidden=r<=1),t&&(t.textContent=ye(S.page,Ge,S.totalCount,S.data.length)),n&&(n.textContent=`${S.page} / ${r}`),a&&(a.disabled=S.page===1),o&&(o.disabled=S.page>=r)}async function Ie(){S.loading=!0,ea(),Vt();try{const e=S.search?`?search=${encodeURIComponent(S.search)}`:"",t=`?page=${S.page}&limit=${Ge}${S.search?`&search=${encodeURIComponent(S.search)}`:""}`,[n,a]=await Promise.all([y(`/admin-users${t}`),y(`/admin-users/count${e}`)]);S.data=Array.isArray(n)?n:[],S.totalCount=Number(a.count||0)}finally{S.loading=!1,ea(),Vt()}}function Ja(e="User"){const t=document.getElementById("admin-user-role");if(!t)return;const n=Xs(),a=n.includes(e)?e:n[0];t.innerHTML=n.map(o=>`
        <option value="${u(o)}" ${o===a?"selected":""}>${u(o)}</option>
    `).join("")}function Ka(e){const t=document.getElementById("admin-user-password"),n=document.getElementById("admin-user-password-note");t&&(t.required=!e,t.placeholder=e?"Kosongkan jika tidak ingin mengubah password":"Masukkan password",t.value=""),n&&(n.textContent=e?"Kosongkan password jika tidak ingin mengubah password akun ini.":"Password minimal 6 karakter dan akan disimpan dalam bentuk terenkripsi.")}function Pt(e="User"){const t=document.getElementById("admin-user-form"),n=document.getElementById("admin-user-form-title"),a=document.getElementById("admin-user-form-description"),o=document.getElementById("admin-user-id");t?.reset(),o&&(o.value=""),Ja(e),Ka(!1),n&&(n.textContent=e==="Admin"?"Tambah Admin Baru":"Tambah User Baru"),a&&(a.textContent=e==="Admin"?"Lengkapi data akun untuk menambahkan admin baru":"Lengkapi data akun untuk menambahkan user baru"),S.defaultRole=e,S.editItem=null,ht(!1)}function Ys(e){S.editItem=e,document.getElementById("admin-user-id").value=e.id,document.getElementById("admin-user-nama").value=e.nama,document.getElementById("admin-user-username").value=e.username,document.getElementById("admin-user-email").value=e.email,Ja(e.role),Ka(!0),document.getElementById("admin-user-form-title").textContent="Edit Akun",document.getElementById("admin-user-form-description").textContent="Perbarui informasi akun admin atau user di bawah ini",ht(!1)}function ei(e){const t=document.getElementById("admin-user-detail-list");t&&(t.innerHTML=`
        <div class="admin-users-detail-item">
            <span>Nama</span>
            <strong>${u(e.nama)}</strong>
        </div>
        <div class="admin-users-detail-item">
            <span>Username</span>
            <strong>@${u(e.username)}</strong>
        </div>
        <div class="admin-users-detail-item">
            <span>Email</span>
            <strong>${u(e.email)}</strong>
        </div>
        <div class="admin-users-detail-item">
            <span>Password</span>
            <strong>${u(e.password_mask)}</strong>
            <p>${u(e.password_note)}</p>
        </div>
        <div class="admin-users-detail-item">
            <span>Role</span>
            <strong>${u(e.role)}</strong>
        </div>
        <div class="admin-users-detail-item">
            <span>Dibuat</span>
            <strong>${u(es(e.created_at))}</strong>
        </div>
    `)}async function ti(e){ei(await y(`/admin-users/${e}`)),j("admin-user-show-modal")}async function ni(e){Ys(await y(`/admin-users/${e}`)),j("admin-user-form-modal")}function ai(e){S.deleteItem=e,document.getElementById("admin-user-delete-copy").innerHTML=`Apakah Anda yakin ingin menghapus akun <strong>${u(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`,j("admin-user-delete-modal")}function ta(){const e=document.getElementById("admin-users-access-note"),t=document.getElementById("admin-users-search-input"),n=document.querySelector(".admin-users-page-actions");e&&(e.hidden=!1,e.textContent="Halaman ini hanya dapat diakses oleh Admin atau Super Admin."),t&&(t.disabled=!0),n&&(n.hidden=!0),S.loading=!1,S.data=[],S.totalCount=0,Va("Anda tidak memiliki akses untuk mengelola data admin dan user."),Vt()}function oi({user:e}={}){const t=document.getElementById("admin-users-add-admin-btn"),n=document.getElementById("admin-users-add-user-btn"),a=document.getElementById("admin-users-search-input"),o=document.getElementById("admin-user-form"),r=document.getElementById("admin-users-table-body"),s=document.getElementById("admin-user-delete-confirm-btn"),i=document.getElementById("admin-users-prev-page-btn"),c=document.getElementById("admin-users-next-page-btn");if(!(!t||!n||!o||!r)){if(S.currentUser=e||window.transitAuthUser||null,!Gs(S.currentUser?.role)){ta();return}return t.addEventListener("click",()=>{Pt("Admin"),j("admin-user-form-modal")}),n.addEventListener("click",()=>{Pt("User"),j("admin-user-form-modal")}),a?.addEventListener("input",he(async d=>{S.search=d.target.value.trim(),S.page=1;try{await Ie()}catch(l){h(l.message||"Gagal memuat data akun")}})),o.addEventListener("submit",async d=>{d.preventDefault();const l={nama:document.getElementById("admin-user-nama")?.value.trim()||"",username:document.getElementById("admin-user-username")?.value.trim()||"",email:document.getElementById("admin-user-email")?.value.trim()||"",password:document.getElementById("admin-user-password")?.value||"",role:document.getElementById("admin-user-role")?.value||"User"};ht(!0);try{S.editItem?(await y(`/admin-users/${S.editItem.id}`,{method:"PUT",body:l}),q("Akun berhasil diperbarui")):(await y("/admin-users",{method:"POST",body:l}),q(l.role==="Admin"?"Admin berhasil ditambahkan":"User berhasil ditambahkan")),z("admin-user-form-modal"),Pt(S.defaultRole),await Ie()}catch(k){h(k.message||"Silakan periksa kembali data yang diinput","Gagal menyimpan akun")}finally{ht(!1)}}),r.addEventListener("click",async d=>{const l=d.target.closest("[data-admin-user-show]"),k=d.target.closest("[data-admin-user-edit]"),v=d.target.closest("[data-admin-user-delete]");try{if(l){await ti(l.dataset.adminUserShow);return}if(k){await ni(k.dataset.adminUserEdit);return}v&&ai({id:v.dataset.adminUserDelete,nama:v.dataset.adminUserName})}catch(A){h(A.message||"Gagal memuat detail akun")}}),s?.addEventListener("click",async()=>{if(S.deleteItem)try{await y(`/admin-users/${S.deleteItem.id}`,{method:"DELETE"}),q("Akun berhasil dihapus"),z("admin-user-delete-modal"),(S.page-1)*Ge>=S.totalCount-1&&S.page>1&&(S.page-=1),S.deleteItem=null,await Ie()}catch(d){h(d.message||"Gagal menghapus akun")}}),i?.addEventListener("click",async()=>{if(!(S.page<=1)){S.page-=1;try{await Ie()}catch(d){h(d.message||"Gagal memuat data akun")}}}),c?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil(S.totalCount/Ge));if(!(S.page>=d)){S.page+=1;try{await Ie()}catch(l){h(l.message||"Gagal memuat data akun")}}}),Ie().catch(d=>{if(d.status===403){ta();return}h(d.message||"Gagal memuat data akun")})}}const na=[{value:"05:00",label:"Subuh",time:"05.00 WIB"},{value:"08:00",label:"Pagi",time:"08.00 WIB"},{value:"10:00",label:"Pagi",time:"10.00 WIB"},{value:"14:00",label:"Siang",time:"14.00 WIB"},{value:"16:00",label:"Sore",time:"16.00 WIB"},{value:"19:00",label:"Malam",time:"19.00 WIB"}],za=[[{code:"1A",label:"1A"},{code:"SOPIR",label:"SOPIR",isDriver:!0}],[{code:"2A",label:"2A"},{code:"3A",label:"3A"}],[{code:"4A",label:"4A"},{code:"5A",label:"5A"}]],aa=za.flat().filter(e=>!e.isDriver).length,f={currentUser:null,date:Ze(),direction:"from_pkb",bookings:[],loading:!1,drivers:[],mobils:[],formOptions:null,selectedSeats:[],passengerDraftMap:{},editItem:null,deleteItem:null,slotDriverMap:{},slotMobilMap:{},occupiedSeatsForForm:[],occupiedSeatsForPackageForm:[],slotExtraArmadas:{},currentFormArmadaIndex:1,_pendingChoiceArmada:1,_pendingChoiceTime:""};function Dt(e){const t=document.getElementById(e);if(!t)return null;try{return JSON.parse(t.textContent||"{}")}catch{return null}}function ri(e){return["Super Admin","Admin"].includes(e)}function si(e){const t=e?"#dc2626":"#166534",n=e?"#991b1b":"#14532d";return`
        <svg viewBox="0 0 50 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="2" width="30" height="20" rx="8" fill="${t}" stroke="${n}" stroke-width="1.5"/>
            <rect x="5" y="18" width="40" height="28" rx="9" fill="${t}" stroke="${n}" stroke-width="1.5"/>
            <rect x="7" y="44" width="36" height="14" rx="7" fill="${t}" stroke="${n}" stroke-width="1.5" opacity="0.8"/>
            <rect x="2" y="22" width="5" height="18" rx="2.5" fill="${t}" opacity="0.6"/>
            <rect x="43" y="22" width="5" height="18" rx="2.5" fill="${t}" opacity="0.6"/>
        </svg>`}function ii(){return`
        <svg viewBox="0 0 50 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="25" cy="30" r="18" stroke="rgba(148,163,184,0.5)" stroke-width="2.5"/>
            <circle cx="25" cy="30" r="6" fill="rgba(148,163,184,0.4)"/>
            <line x1="25" y1="12" x2="25" y2="24" stroke="rgba(148,163,184,0.5)" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="7" y1="30" x2="19" y2="30" stroke="rgba(148,163,184,0.5)" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="31" y1="30" x2="43" y2="30" stroke="rgba(148,163,184,0.5)" stroke-width="2.5" stroke-linecap="round"/>
        </svg>`}function di(){return'<svg viewBox="0 0 24 24" fill="none"><path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path><path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg>'}function li(){return'<svg viewBox="0 0 24 24" fill="none"><path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg>'}function oa(){return'<svg viewBox="0 0 24 24" fill="none" style="width:12px;height:12px;flex-shrink:0;"><path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'}function ci(){return'<svg viewBox="0 0 24 24" fill="none" style="width:12px;height:12px;flex-shrink:0;"><rect x="2" y="7" width="15" height="10" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M17 10H20L22 13V17H17V10Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="6" cy="18" r="1.5" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="18" r="1.5" stroke="currentColor" stroke-width="1.5"/></svg>'}function ui(){return'<svg viewBox="0 0 24 24" fill="none" style="width:12px;height:12px;flex-shrink:0;"><path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 2V8H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 13H16M8 17H13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'}function mi(e){return`
        <div class="bpg-car-diagram">
            <div class="bpg-car-legend">
                <span class="bpg-legend-item">
                    <span class="bpg-legend-dot bpg-legend-dot--available"></span> Tersedia
                </span>
                <span class="bpg-legend-item">
                    <span class="bpg-legend-dot bpg-legend-dot--occupied"></span> Terisi
                </span>
                <span class="bpg-legend-item">
                    <span class="bpg-legend-dot bpg-legend-dot--driver"></span> Sopir
                </span>
            </div>
            <div class="bpg-car-body">
                <div class="bpg-car-direction-label">
                    <svg viewBox="0 0 16 16" fill="none" style="width:14px;height:14px;"><path d="M8 2L8 14M3 7L8 2L13 7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    Arah depan kendaraan
                </div>
                <div class="bpg-car-inner">
                    ${za.map(n=>`<div class="bpg-seat-row">${n.map(o=>{if(o.isDriver)return`
                    <div class="bpg-seat-item bpg-seat-driver" title="Sopir / Pengemudi">
                        <div class="bpg-seat-icon">${ii()}</div>
                        <span class="bpg-seat-label">SOPIR</span>
                    </div>`;const r=e[o.code],s=!!r,i=s?"bpg-seat-occupied":"bpg-seat-available",c=s?u(r.nama_pemesanan||"-"):"";return`
                <div class="bpg-seat-item ${i}" title="${s?c:"Tersedia"}">
                    <div class="bpg-seat-icon">${si(s)}</div>
                    <span class="bpg-seat-label">${o.label}</span>
                    ${s?`<span class="bpg-seat-name">${c}</span>`:""}
                </div>`}).join("")}</div>`).join("")}
                </div>
            </div>
        </div>`}function pi(e){if(e.length===0)return`
            <div class="bpg-empty-slot">
                <svg viewBox="0 0 24 24" fill="none" style="width:32px;height:32px;opacity:0.3;">
                    <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                    <circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="1.8"/>
                    <path d="M23 21V19C22.9986 17.1771 21.765 15.5857 20 15.13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                    <path d="M16 3.13C17.7699 3.58317 19.0078 5.17799 19.0078 7.005C19.0078 8.83201 17.7699 10.4268 16 10.88" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                </svg>
                <p>Belum ada penumpang pada jadwal ini</p>
            </div>`;const t=[{value:"Berangkat",label:"Berangkat",cls:"bpg-depart-opt--go"},{value:"Tidak Berangkat",label:"Tidak Berangkat",cls:"bpg-depart-opt--no"},{value:"Di Oper",label:"Di Oper",cls:"bpg-depart-opt--oper"}];function n(o){return o==="Berangkat"?{label:"Berangkat",cls:"bpg-depart-trigger--go"}:o==="Tidak Berangkat"?{label:"Tidak Berangkat",cls:"bpg-depart-trigger--no"}:o==="Di Oper"?{label:"Di Oper",cls:"bpg-depart-trigger--oper"}:{label:"Status",cls:""}}return`
        <div class="bpg-passenger-list">
            <div class="bpg-passenger-list-head">
                <svg viewBox="0 0 24 24" fill="none" style="width:15px;height:15px;"><path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="1.8"/></svg>
                <span>Daftar Penumpang</span>
            </div>
            ${e.map(o=>{const r=o.selected_seats_label||"-",s=o.departure_status||"",i=n(s),c=t.map(d=>{const l=s===d.value;return`<button class="bpg-depart-opt ${d.cls}${l?" is-active":""}" type="button"
                data-departure-status="${u(d.value)}"
                data-booking-departure="${u(String(o.id))}">${u(d.label)}</button>`}).join("");return`
            <div class="bpg-passenger-item" data-booking-id="${u(String(o.id))}">
                <div class="bpg-passenger-item-row">
                    <div class="bpg-passenger-seats">
                        ${r.split(",").map(d=>`<span class="stock-value-badge stock-value-badge-blue">${u(d.trim())}</span>`).join("")}
                    </div>
                    <div class="bpg-passenger-info">
                        <span class="bpg-passenger-name">${u(o.nama_pemesanan||"-")}</span>
                        <span class="bpg-passenger-phone">${u(o.phone||"-")}</span>
                    </div>
                </div>
                <div class="bpg-passenger-item-actions-row">
                    <span class="${u(o.payment_status_badge_class||"stock-value-badge stock-value-badge-blue")} bpg-status-sm">${u(o.payment_status||"-")}</span>
                    <div class="bpg-depart-dropdown" data-depart-dropdown="${u(String(o.id))}">
                        <button class="bpg-depart-trigger ${i.cls}" type="button" data-depart-toggle="${u(String(o.id))}">
                            <svg viewBox="0 0 24 24" fill="none" style="width:11px;height:11px;flex-shrink:0;"><circle cx="12" cy="12" r="2.5" fill="currentColor"/><circle cx="12" cy="5" r="2" fill="currentColor"/><circle cx="12" cy="19" r="2" fill="currentColor"/></svg>
                            ${u(i.label)}
                            <svg viewBox="0 0 24 24" fill="none" style="width:10px;height:10px;flex-shrink:0;"><path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </button>
                        <div class="bpg-depart-menu" hidden>
                            ${c}
                        </div>
                    </div>
                    <div style="flex:1;"></div>
                    <button class="bpg-lihat-btn" type="button" data-booking-lihat="${u(String(o.id))}" aria-label="Lihat detail ${u(o.nama_pemesanan)}">
                        <svg viewBox="0 0 24 24" fill="none" style="width:13px;height:13px;"><path d="M2.5 12C4.4 8.2 8 6 12 6C16 6 19.6 8.2 21.5 12C19.6 15.8 16 18 12 18C8 18 4.4 15.8 2.5 12Z" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/></svg>
                        Lihat
                    </button>
                    <button class="admin-users-icon-button" type="button" data-booking-edit="${u(String(o.id))}" title="Edit pemesanan">
                        ${di()}
                    </button>
                    <button class="admin-users-icon-button admin-users-icon-button-danger" type="button" data-booking-delete="${u(String(o.id))}" data-booking-name="${u(o.nama_pemesanan)}" title="Hapus pemesanan">
                        ${li()}
                    </button>
                </div>
            </div>`}).join("")}
        </div>`}function gi(e){const t={};return e.forEach(n=>{(Array.isArray(n.selected_seats)?n.selected_seats:[]).forEach(o=>{t[o]||(t[o]=n)})}),t}function fi(e,t,n,a){const o=gi(n),r=n.reduce((g,E)=>g+(Number(E.passenger_count)||0),0),s=r>=aa,i=`${e.value}__${f.direction}__${t}`;if(!f.slotDriverMap[i]){const g=n.find(E=>E.driver_id);g&&(f.slotDriverMap[i]=g.driver_id)}const c=f.slotDriverMap[i]||"",d=f.slotMobilMap[i]||"",l=s?"stock-value-badge-red":"stock-value-badge-yellow",k=f.drivers.map(g=>{const E=g.lokasi?`${g.nama} (${g.lokasi})`:g.nama;return`<option value="${u(g.id)}" ${c===g.id?"selected":""}>${u(E)}</option>`}).join(""),v=f.mobils.map(g=>{const E=`${g.kode_mobil} — ${g.jenis_mobil}`;return`<option value="${u(g.id)}" ${d===g.id?"selected":""}>${u(E)}</option>`}).join(""),A=[...new Set(n.map(g=>(g.service_type||"").trim()).filter(Boolean))],p=a>1?`<span class="bpg-armada-badge">${ci()} Armada ${t}</span>`:"",b=s?`<button class="bpg-add-armada-btn" type="button"
                data-add-armada="${u(e.value)}"
                data-armada-index="${t}"
                title="Tambah armada ke-${t+1} untuk jadwal ${u(e.time)}">
                ${oa()}
                Tambah Armada
            </button>`:"";return`
        <article class="bpg-slot-card" data-slot="${u(e.value)}" data-direction="${u(f.direction)}" data-armada="${t}">
            <div class="bpg-slot-head">
                <div class="bpg-slot-head-row">
                    <div class="bpg-slot-time-badge">
                        <span class="bpg-slot-period">${u(e.label)}</span>
                        <strong class="bpg-slot-time">${u(e.time)}</strong>
                    </div>
                    <div class="bpg-slot-head-meta">
                        ${p}
                        <div class="bpg-slot-service-types">
                            ${A.length>0?A.map(g=>`<span class="bpg-service-badge">${u(g)}</span>`).join(""):'<span class="bpg-service-badge bpg-service-badge--empty">Belum ada layanan</span>'}
                        </div>
                        <span class="stock-value-badge ${l}">${r} / ${aa} Kursi</span>
                    </div>
                </div>
                ${b?`<div class="bpg-slot-head-row">${b}</div>`:""}
            </div>

            ${mi(o)}

            <div class="bpg-slot-assignment">
                <div class="bpg-slot-select-group">
                    <label>
                        <svg viewBox="0 0 24 24" fill="none" style="width:13px;height:13px;"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/><path d="M4 20C4 17.2386 7.58172 15 12 15C16.4183 15 20 17.2386 20 20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
                        Pilih Driver
                    </label>
                    <select class="bpg-slot-select" data-slot-driver="${u(e.value)}__${t}">
                        <option value="">— Belum ditentukan —</option>
                        ${k}
                    </select>
                </div>
                <div class="bpg-slot-select-group">
                    <label>
                        <svg viewBox="0 0 24 24" fill="none" style="width:13px;height:13px;"><rect x="2" y="7" width="20" height="10" rx="3" stroke="currentColor" stroke-width="1.8"/><circle cx="6" cy="17" r="2" stroke="currentColor" stroke-width="1.8"/><circle cx="18" cy="17" r="2" stroke="currentColor" stroke-width="1.8"/></svg>
                        Pilih Mobil
                    </label>
                    <select class="bpg-slot-select" data-slot-mobil="${u(e.value)}__${t}">
                        <option value="">— Belum ditentukan —</option>
                        ${v}
                    </select>
                </div>
            </div>

            ${pi(n)}

            <button class="bpg-slot-book-btn" type="button"
                data-slot-book="${u(e.value)}"
                data-slot-armada="${t}"
                title="Tambah pemesanan untuk Armada ${t}, jadwal ${u(e.time)}">
                ${oa()}
                Tambah Pemesanan Armada ${t}
            </button>
            <button class="bpg-surat-jalan-btn" type="button"
                data-surat-jalan="${u(e.value)}"
                data-surat-jalan-armada="${t}"
                title="Buat Surat Jalan Armada ${t}, jadwal ${u(e.time)}">
                ${ui()}
                Surat Jalan
            </button>
        </article>`}function bi(e,t){const n={};t.forEach(c=>{const d=c.armada_index||1;n[d]||(n[d]=[]),n[d].push(c)});const a=`${e.value}__${f.direction}`,o=t.length>0?Math.max(...Object.keys(n).map(Number)):1,r=f.slotExtraArmadas[a]||1,s=Math.max(o,r),i=[];for(let c=1;c<=s;c++)i.push(fi(e,c,n[c]||[],s));return`<div class="bpg-slot-group" data-slot-group="${u(e.value)}">${i.join("")}</div>`}function ki(){const e=document.getElementById("bpg-slots-shell");e&&(e.innerHTML=`
            <div class="admin-users-loading-inline" style="padding:40px 0;">
                <span class="admin-users-loading-inline-spinner" aria-hidden="true"></span>
                <span>Memuat data penumpang...</span>
            </div>`)}function Wa(){const e=document.getElementById("bpg-slots-shell");if(!e)return;const t={};na.forEach(a=>{t[a.value]=[]}),f.bookings.forEach(a=>{const r=(a.trip_time||"").trim().substring(0,5);t[r]&&t[r].push(a)});const n=na.map(a=>bi(a,t[a.value]||[]));e.innerHTML=`<div class="bpg-slots-grid">${n.join("")}</div>`}async function _e(){f.loading=!0,ki();try{const e=new URLSearchParams({date:f.date,direction:f.direction,limit:200,page:1}),[t,n]=await Promise.all([y(`/bookings?${e}`),y(`/bookings/armada-extras?date=${f.date}`).catch(()=>({}))]);f.bookings=Array.isArray(t)?t:[],n&&typeof n=="object"&&Object.entries(n).forEach(([a,o])=>{const r=`${a}__${f.direction}`;f.slotExtraArmadas[r]=Math.max(f.slotExtraArmadas[r]||1,Number(o)||1)})}catch(e){f.bookings=[],e.status!==403&&h(e.message||"Gagal memuat data penumpang")}finally{f.loading=!1,Wa()}}function ra(e){return{Aktif:"green",Selesai:"green",Dibayar:"green","Dibayar Tunai":"green",Draft:"gray","Belum Bayar":"orange","Menunggu Pembayaran":"blue","Menunggu Verifikasi":"blue","Menunggu Konfirmasi":"blue",Batal:"red",Reguler:"purple",Paket:"blue"}[e]||"gray"}function hi(e){document.getElementById("bpg-detail-title").textContent=e.nama_pemesanan||"-",document.getElementById("bpg-detail-subtitle").textContent=e.booking_code||"-",document.getElementById("bpg-detail-full-link").href=`/dashboard/bookings/${e.id}`;const t=e.category==="Paket",n=document.getElementById("bpg-detail-ticket-link"),a=document.getElementById("bpg-detail-surat-link");t?(n.hidden=!0,a.hidden=!1,a.href=`/dashboard/bookings/${e.id}/surat-bukti`):(n.hidden=!1,n.href=`/unduh/tiket-reguler/${e.booking_code}`,a.hidden=!0);const o=e.booking_status||"",r=e.payment_status||"",s=e.service_type||"",i=(e.pickup_location||"").trim()!=="",c=(e.dropoff_location||"").trim()!=="",d=document.getElementById("bpg-detail-body");d.innerHTML=`
        <!-- Status Badges -->
        <div class="bpg-dv-status-bar">
            ${o?`<span class="bpg-dv-badge bpg-dv-badge--${ra(o)}">${u(o)}</span>`:""}
            ${r?`<span class="bpg-dv-badge bpg-dv-badge--${ra(r)}">${u(r)}</span>`:""}
            ${s?`<span class="bpg-dv-badge bpg-dv-badge--purple">${u(s)}</span>`:""}
        </div>

        <!-- Rute Perjalanan -->
        <div class="bpg-dv-section">
            <div class="bpg-dv-section-head">
                <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <span class="bpg-dv-section-title">Rute Perjalanan</span>
            </div>
            <div class="bpg-dv-rows">
                <div class="bpg-dv-row bpg-dv-row--full">
                    <div class="bpg-dv-label">Rute</div>
                    <div class="bpg-dv-route">
                        <span class="bpg-dv-route-city">${u(e.from_city||"-")}</span>
                        <span class="bpg-dv-route-arrow">→</span>
                        <span class="bpg-dv-route-city">${u(e.to_city||"-")}</span>
                    </div>
                </div>
                <div class="bpg-dv-row">
                    <div class="bpg-dv-label">Tanggal</div>
                    <div class="bpg-dv-value">${u(e.trip_date_label||"-")}</div>
                </div>
                <div class="bpg-dv-row">
                    <div class="bpg-dv-label">Waktu</div>
                    <div class="bpg-dv-value">${u(e.trip_time||"-")} WIB</div>
                </div>
                <div class="bpg-dv-row">
                    <div class="bpg-dv-label">Armada</div>
                    <div class="bpg-dv-value">Armada ${u(String(e.armada_index||1))}</div>
                </div>
                <div class="bpg-dv-row">
                    <div class="bpg-dv-label">Jenis Layanan</div>
                    <div class="bpg-dv-value">${u(s||"-")}</div>
                </div>
            </div>
        </div>

        <!-- Data Penumpang -->
        <div class="bpg-dv-section">
            <div class="bpg-dv-section-head">
                <svg viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2"/></svg>
                <span class="bpg-dv-section-title">Data Penumpang</span>
            </div>
            <div class="bpg-dv-rows">
                <div class="bpg-dv-row">
                    <div class="bpg-dv-label">Nama Pemesan</div>
                    <div class="bpg-dv-value">${u(e.nama_pemesanan||"-")}</div>
                </div>
                <div class="bpg-dv-row">
                    <div class="bpg-dv-label">No HP</div>
                    <div class="bpg-dv-value bpg-dv-value--mono">${u(e.phone||"-")}</div>
                </div>
                <div class="bpg-dv-row">
                    <div class="bpg-dv-label">Kursi</div>
                    <div class="bpg-dv-value">${u(e.selected_seats_label||"-")}</div>
                </div>
                <div class="bpg-dv-row">
                    <div class="bpg-dv-label">Jumlah Penumpang</div>
                    <div class="bpg-dv-value">${u(String(e.passenger_count||0))} Orang</div>
                </div>
            </div>
        </div>

        <!-- Alamat -->
        ${i||c?`
        <div class="bpg-dv-section">
            <div class="bpg-dv-section-head">
                <svg viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="9" r="2.5" stroke="currentColor" stroke-width="2"/></svg>
                <span class="bpg-dv-section-title">Alamat</span>
            </div>
            <div class="bpg-dv-rows">
                ${i?`
                <div class="bpg-dv-row bpg-dv-row--full">
                    <div class="bpg-dv-label">Alamat Penjemputan</div>
                    <div class="bpg-dv-value">${u(e.pickup_location)}</div>
                </div>`:""}
                ${c?`
                <div class="bpg-dv-row bpg-dv-row--full">
                    <div class="bpg-dv-label">Alamat Pengantaran</div>
                    <div class="bpg-dv-value">${u(e.dropoff_location)}</div>
                </div>`:""}
            </div>
        </div>`:""}

        <!-- Biaya -->
        <div class="bpg-dv-section" style="margin-bottom:12px">
            <div class="bpg-dv-section-head">
                <svg viewBox="0 0 24 24" fill="none"><rect x="2" y="6" width="20" height="14" rx="3" stroke="currentColor" stroke-width="2"/><path d="M2 10h20" stroke="currentColor" stroke-width="2"/></svg>
                <span class="bpg-dv-section-title">Pembayaran</span>
            </div>
            <div class="bpg-dv-rows">
                <div class="bpg-dv-row bpg-dv-row--full">
                    <div class="bpg-dv-label">Total Biaya</div>
                    <div class="bpg-dv-value bpg-dv-value--price">${u(e.total_amount_formatted||"-")}</div>
                </div>
            </div>
        </div>
    `,j("bpg-detail-modal")}function yi(){return(f.formOptions?.seat_options||[]).map(e=>e.code)}function cn(e){const t=new Map(yi().map((n,a)=>[n,a]));return Array.from(new Set((e||[]).map(n=>String(n).trim()).filter(n=>t.has(n)))).sort((n,a)=>(t.get(n)??999)-(t.get(a)??999))}function St(){return Number(document.getElementById("booking-passenger-count")?.value||0)}function vi(){const e=St();return(f.formOptions?.seat_options||[]).filter(t=>!t.is_optional||e>=6).map(t=>t.code)}function Ei(){return f.formOptions?.payment_status_options||[]}function wi(e){return e==="transfer"?["Belum Bayar","Menunggu Pembayaran","Menunggu Verifikasi","Dibayar"]:e==="qris"?["Belum Bayar","Menunggu Pembayaran","Dibayar"]:e==="cash"?["Belum Bayar","Dibayar Tunai"]:["Belum Bayar"]}function Bi(e){return e==="transfer"?"Menunggu Pembayaran":e==="qris"?"Dibayar":e==="cash"?"Dibayar Tunai":"Belum Bayar"}function Ii(e){return e==="transfer"?"Menunggu Verifikasi Pembayaran":e==="qris"||e==="cash"?"Diproses":"Draft"}function _i(e,t){if(!e||!t||e===t)return null;const a=(f.formOptions?.route_matrix||{})?.[e]?.[t];return a==null?null:Number(a)}function Xa(){return Math.max(0,parseInt(document.getElementById("booking-additional-fare")?.value||"0",10)||0)}function Se(){const e=document.getElementById("booking-from-city")?.value||"",t=document.getElementById("booking-to-city")?.value||"",n=St(),a=_i(e,t),o=Xa(),r=a!==null?a+o:null,s=r!==null?r*n:null,i=document.getElementById("booking-price-per-seat"),c=document.getElementById("booking-total-amount");i&&(i.value=a!==null?H(a):""),c&&(c.value=s!==null?H(s):"")}function un(){const e=document.getElementById("booking-payment-method")?.value||"",t=document.getElementById("booking-payment-status"),n=document.getElementById("booking-booking-status"),a=document.getElementById("booking-bank-account-group"),o=document.getElementById("booking-bank-account-code"),r=wi(e),s=t?.value||"";a&&(a.hidden=e!=="transfer"),o&&e!=="transfer"&&(o.value=""),t&&(t.innerHTML=Ei().filter(i=>r.includes(i.value)).map(i=>`<option value="${u(i.value)}">${u(i.label)}</option>`).join(""),t.value=r.includes(s)?s:Bi(e)),n&&(n.value=Ii(e))}function $i(){const e=document.getElementById("booking-selected-seats-inputs");e&&(e.innerHTML=f.selectedSeats.map(t=>`<input type="hidden" name="selected_seats[]" value="${u(t)}">`).join(""))}function Si(){const e=document.getElementById("booking-selected-seat-count"),t=document.getElementById("booking-selected-seat-label");e&&(e.textContent=String(f.selectedSeats.length)),t&&(t.textContent=f.selectedSeats.length>0?f.selectedSeats.join(", "):"Belum dipilih")}function Jt(){document.querySelectorAll("[data-passenger-seat]").forEach(e=>{const t=e.dataset.passengerSeat;t&&(f.passengerDraftMap[t]={seat_no:t,name:e.querySelector("[data-passenger-name]")?.value.trim()||"",phone:e.querySelector("[data-passenger-phone]")?.value.trim()||""})})}function le(e=null){const t=document.getElementById("booking-passenger-editor");if(t){if(e&&(f.passengerDraftMap=Object.fromEntries(e.map(n=>[n.seat_no,n]))),f.selectedSeats.length===0){t.innerHTML='<div class="dashboard-empty-state dashboard-empty-state--block bookings-passenger-empty">Pilih kursi terlebih dahulu untuk menampilkan form data penumpang.</div>';return}t.innerHTML=`
        <div class="bookings-passenger-grid bookings-passenger-grid--editor">
            ${f.selectedSeats.map((n,a)=>{const o=f.passengerDraftMap[n]||{name:"",phone:""};return`
                    <article class="bookings-passenger-card bookings-passenger-card--editor" data-passenger-seat="${u(n)}">
                        <div class="bookings-passenger-form-head">
                            <span class="stock-value-badge stock-value-badge-blue">${u(n)}</span>
                            <strong>Penumpang ${a+1}</strong>
                            <p>${a===0?"Menjadi nama pemesanan utama.":"Data penumpang tambahan."}</p>
                        </div>
                        <div class="bookings-passenger-form-grid">
                            <div class="admin-users-form-group">
                                <label>Nama</label>
                                <div class="admin-users-input-shell">
                                    <input type="text" value="${u(o.name||"")}" placeholder="Masukkan nama penumpang" data-passenger-name>
                                </div>
                            </div>
                            <div class="admin-users-form-group">
                                <label>No HP</label>
                                <div class="admin-users-input-shell">
                                    <input type="text" value="${u(o.phone||"")}" placeholder="08xxxxxxxxxx" data-passenger-phone>
                                </div>
                            </div>
                        </div>
                    </article>`}).join("")}
        </div>`}}async function Ce(){const e=document.getElementById("booking-trip-date")?.value||"",t=document.getElementById("booking-trip-time")?.value||"",n=document.getElementById("booking-from-city")?.value||"",a=document.getElementById("booking-to-city")?.value||"",o=f.editItem?.id||"",r=f.currentFormArmadaIndex||1;if(!e||!t){f.occupiedSeatsForForm=[];return}try{const s=new URLSearchParams({trip_date:e,trip_time:t,armada_index:r});n&&s.set("from_city",n),a&&s.set("to_city",a),o&&s.set("exclude_id",o);const i=await y(`/bookings/occupied-seats?${s}`);f.occupiedSeatsForForm=Array.isArray(i?.occupied_seats)?i.occupied_seats:[]}catch{f.occupiedSeatsForForm=[]}}async function je(){const e=document.getElementById("pkg-trip-date")?.value||"",t=document.getElementById("pkg-trip-time")?.value||"",n=document.getElementById("pkg-from-city")?.value||"",a=document.getElementById("pkg-to-city")?.value||"",o=parseInt(document.getElementById("package-armada-index")?.value||"1",10);if(!e||!t){f.occupiedSeatsForPackageForm=[],sa();return}try{const r=new URLSearchParams({trip_date:e,trip_time:t,armada_index:o});n&&r.set("from_city",n),a&&r.set("to_city",a);const s=await y(`/bookings/occupied-seats?${r}`);f.occupiedSeatsForPackageForm=Array.isArray(s?.occupied_seats)?s.occupied_seats:[]}catch{f.occupiedSeatsForPackageForm=[]}sa()}function sa(){const e=document.getElementById("pkg-seat-code");if(!e)return;const t=(f.formOptions?.seat_options||[]).filter(o=>!o.is_optional),n=f.occupiedSeatsForPackageForm||[],a=e.value;e.innerHTML='<option value="">Pilih kursi</option>'+t.map(o=>{const r=n.includes(o.code);return`<option value="${u(o.code)}"${r?" disabled":""}>${u(o.label)}${r?" — Sudah dipesan":""}</option>`}).join(""),a&&!n.includes(a)&&(e.value=a)}function ce(){const e=document.querySelectorAll("[data-seat-code]"),t=St(),n=vi();f.selectedSeats=cn(f.selectedSeats.filter(a=>n.includes(a)&&!f.occupiedSeatsForForm.includes(a))),e.forEach(a=>{const o=a.dataset.seatCode,r=n.includes(o),s=f.occupiedSeatsForForm.includes(o),i=f.selectedSeats.includes(o),c=f.selectedSeats.length>=t&&!i;a.hidden=!r,a.classList.toggle("is-selected",i),a.classList.toggle("is-occupied",s),a.classList.toggle("is-disabled",!s&&c),a.disabled=!r||s||!i&&c,s?a.title="Kursi sudah dipesan":a.title=""}),$i(),Si()}function Ot(e=1,t=""){document.getElementById("booking-form")?.reset(),f.editItem=null,f.selectedSeats=[],f.passengerDraftMap={},f.currentFormArmadaIndex=e;const a=f.date||Ze();document.getElementById("booking-id").value="",document.getElementById("booking-armada-index").value=String(e),document.getElementById("booking-form-title").textContent="Tambah Pemesanan";const o=e>1?` (Armada ${e})`:"";document.getElementById("booking-form-description").textContent=`Lengkapi data pemesanan reguler dari dashboard admin${o}.`,document.getElementById("booking-trip-date").value=a,t&&(document.getElementById("booking-trip-time").value=t),document.getElementById("booking-passenger-count").value="1",document.getElementById("booking-additional-fare").value="0",document.getElementById("booking-payment-method").value="",document.getElementById("booking-booking-status").value="Draft",un(),Se(),se(document.getElementById("booking-submit-btn"),!1,"Menyimpan..."),Ce().then(()=>{ce(),le()})}function Ci(e){f.editItem=e,f.selectedSeats=cn(e.selected_seats||[]),f.passengerDraftMap=Object.fromEntries((e.passengers||[]).map(n=>[n.seat_no,n])),f.currentFormArmadaIndex=e.armada_index||1,document.getElementById("booking-id").value=e.id,document.getElementById("booking-armada-index").value=String(e.armada_index||1),document.getElementById("booking-booking-for").value=e.booking_for,document.getElementById("booking-category").value=e.category,document.getElementById("booking-from-city").value=e.from_city,document.getElementById("booking-to-city").value=e.to_city,document.getElementById("booking-trip-date").value=e.trip_date_value,document.getElementById("booking-trip-time").value=e.trip_time_value,document.getElementById("booking-passenger-count").value=String(e.passenger_count),document.getElementById("booking-driver-name").value=e.driver_name==="Menunggu Penetapan Driver"?"":e.driver_name||"",document.getElementById("booking-additional-fare").value=String(e.additional_fare_per_passenger||0),document.getElementById("booking-pickup-location").value=e.pickup_location,document.getElementById("booking-dropoff-location").value=e.dropoff_location,document.getElementById("booking-payment-method").value=e.payment_method_value||"",un(),document.getElementById("booking-payment-status").value=e.payment_status,document.getElementById("booking-booking-status").value=e.booking_status,document.getElementById("booking-bank-account-code").value=e.bank_account_code||"",document.getElementById("booking-notes").value=e.notes||"";const t=(e.armada_index||1)>1?` (Armada ${e.armada_index})`:"";document.getElementById("booking-form-title").textContent="Edit Pemesanan",document.getElementById("booking-form-description").textContent=`Perbarui data pemesanan reguler yang dipilih${t}.`,Se(),se(document.getElementById("booking-submit-btn"),!1,"Menyimpan..."),Ce().then(()=>{ce(),le(e.passengers||[])})}function xi(){return Jt(),{booking_for:document.getElementById("booking-booking-for")?.value||"",category:document.getElementById("booking-category")?.value||"Reguler",from_city:document.getElementById("booking-from-city")?.value||"",to_city:document.getElementById("booking-to-city")?.value||"",trip_date:document.getElementById("booking-trip-date")?.value||"",trip_time:document.getElementById("booking-trip-time")?.value||"",passenger_count:Number(document.getElementById("booking-passenger-count")?.value||0),driver_name:document.getElementById("booking-driver-name")?.value.trim()||"",additional_fare_per_passenger:Xa(),pickup_location:document.getElementById("booking-pickup-location")?.value.trim()||"",dropoff_location:document.getElementById("booking-dropoff-location")?.value.trim()||"",selected_seats:f.selectedSeats,passengers:f.selectedSeats.map(e=>({seat_no:e,name:f.passengerDraftMap?.[e]?.name||"",phone:f.passengerDraftMap?.[e]?.phone||""})),payment_method:document.getElementById("booking-payment-method")?.value||"",payment_status:document.getElementById("booking-payment-status")?.value||"Belum Bayar",booking_status:document.getElementById("booking-booking-status")?.value||"Draft",bank_account_code:document.getElementById("booking-bank-account-code")?.value||"",notes:document.getElementById("booking-notes")?.value.trim()||"",armada_index:f.currentFormArmadaIndex||1}}async function Li(e){Ci(await y(`/bookings/${e}`)),j("booking-form-modal")}function Ti(e){f.deleteItem=e,document.getElementById("booking-delete-copy").innerHTML=`Apakah Anda yakin ingin menghapus data pemesanan <strong>${u(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`,j("booking-delete-modal")}function ia(){const e=document.getElementById("bookings-access-note"),t=document.getElementById("bpg-route-tabs"),n=document.getElementById("bpg-slots-shell");e&&(e.hidden=!1),t&&(t.hidden=!0),n&&(n.hidden=!0)}function Ai(e){return e==="Berangkat"?{label:"Berangkat",cls:"bpg-depart-trigger--go"}:e==="Tidak Berangkat"?{label:"Tidak Berangkat",cls:"bpg-depart-trigger--no"}:e==="Di Oper"?{label:"Di Oper",cls:"bpg-depart-trigger--oper"}:{label:"Status",cls:""}}function Mi({user:e}={}){const t=document.getElementById("bookings-add-btn"),n=document.getElementById("bookings-date-picker"),a=document.getElementById("bpg-route-tabs"),o=document.getElementById("bpg-slots-shell"),r=document.getElementById("booking-form"),s=document.getElementById("booking-delete-confirm-btn"),i=document.getElementById("booking-seat-grid"),c=document.getElementById("booking-passenger-editor"),d=document.getElementById("booking-payment-method");if(f.formOptions=Dt("bookings-form-options"),f.drivers=Dt("bookings-drivers-data")||[],f.mobils=Dt("bookings-mobils-data")||[],f.currentUser=e||window.transitAuthUser||null,f.date=Ze(),!ri(f.currentUser?.role)){ia();return}o&&(o.hidden=!1);const l=document.getElementById("bookings-access-note");l&&(l.hidden=!0),n&&(n.value=f.date,n.addEventListener("change",async()=>{f.date=n.value,f.slotDriverMap={},f.slotMobilMap={},f.slotExtraArmadas={},await _e()})),a?.addEventListener("click",async p=>{const b=p.target.closest("[data-direction]");if(!b)return;const g=b.dataset.direction;g!==f.direction&&(f.direction=g,f.slotDriverMap={},f.slotMobilMap={},f.slotExtraArmadas={},document.querySelectorAll(".bpg-route-tab").forEach(E=>{E.classList.toggle("is-active",E.dataset.direction===g)}),await _e())});function k(p=null){o?.querySelectorAll("[data-depart-dropdown]").forEach(b=>{String(b.dataset.departDropdown)!==String(p)&&(b.querySelector(".bpg-depart-menu")?.removeAttribute("hidden"),b.querySelector(".bpg-depart-menu")?.setAttribute("hidden",""))})}document.addEventListener("click",p=>{p.target.closest("[data-depart-dropdown]")||k()}),o?.addEventListener("click",async p=>{const b=p.target.closest("[data-depart-toggle]"),g=p.target.closest("[data-booking-departure]"),E=p.target.closest("[data-booking-lihat]"),P=p.target.closest("[data-booking-edit]"),L=p.target.closest("[data-booking-delete]"),R=p.target.closest("[data-add-armada]"),D=p.target.closest("[data-slot-book]"),V=p.target.closest("[data-surat-jalan]");try{if(b){const M=b.dataset.departToggle,J=o.querySelector(`[data-depart-dropdown="${CSS.escape(M)}"]`)?.querySelector(".bpg-depart-menu");if(!J)return;const W=J.hasAttribute("hidden");k(M),J.toggleAttribute("hidden",!W);return}if(g){const M=g.dataset.bookingDeparture,F=g.dataset.departureStatus,J=f.bookings.find($=>String($.id)===String(M));if(!J)return;const W=J.departure_status===F?"":F;J.departure_status=W;const X=o.querySelector(`[data-depart-dropdown="${CSS.escape(M)}"]`);if(X){const $=X.querySelector(".bpg-depart-trigger"),N=Ai(W);$.className=`bpg-depart-trigger ${N.cls}`,$.childNodes.forEach(G=>{G.nodeType===3&&(G.textContent=N.label)}),X.querySelectorAll("[data-booking-departure]").forEach(G=>{G.classList.toggle("is-active",G.dataset.departureStatus===W)}),X.querySelector(".bpg-depart-menu")?.setAttribute("hidden","")}await y(`/bookings/${M}/departure-status`,{method:"PATCH",body:{departure_status:W}});return}if(E){const M=E.dataset.bookingLihat,F=f.bookings.find(J=>String(J.id)===String(M));F&&hi(F);return}if(P){await Li(P.dataset.bookingEdit);return}if(L){Ti({id:L.dataset.bookingDelete,nama:L.dataset.bookingName});return}if(R){const M=R.dataset.addArmada,J=parseInt(R.dataset.armadaIndex||"1")+1,W=`${M}__${f.direction}`;f.slotExtraArmadas[W]=Math.max(f.slotExtraArmadas[W]||1,J),y("/bookings/armada-extras",{method:"POST",body:{trip_date:f.date,trip_time:M,armada_index:J}}).catch(()=>{}),Wa(),f._pendingChoiceArmada=J,f._pendingChoiceTime=M,j("booking-type-choice-modal");return}if(D){const M=D.dataset.slotBook,F=parseInt(D.dataset.slotArmada||"1");f._pendingChoiceArmada=F,f._pendingChoiceTime=M,j("booking-type-choice-modal");return}if(V){const M=V.dataset.suratJalan,F=parseInt(V.dataset.suratJalanArmada||"1"),J=`${M}__${f.direction}__${F}`,W=f.slotDriverMap[J]||"",X=f.slotMobilMap[J]||"",$=W?f.drivers.find(re=>String(re.id)===String(W)):null,N=X?f.mobils.find(re=>String(re.id)===String(X)):null,G=new URLSearchParams({date:f.date,trip_time:M,armada_index:String(F),direction:f.direction});$&&G.set("driver_name",$.nama),N&&G.set("no_pol",N.kode_mobil),window.open(`/dashboard/bookings/surat-jalan?${G}`,"_blank");return}}catch(M){h(M.message||"Gagal memuat data pemesanan")}}),o?.addEventListener("change",async p=>{const b=p.target.closest("[data-slot-driver]"),g=p.target.closest("[data-slot-mobil]");if(b){const[E,P]=b.dataset.slotDriver.split("__"),L=parseInt(P||"1"),R=b.value,D=b.options[b.selectedIndex],V=R&&D?.text.split(" (")[0]||"",M=`${E}__${f.direction}__${L}`;f.slotDriverMap[M]=R;try{await y("/bookings/slot-assign",{method:"PATCH",body:{trip_date:f.date,trip_time:E,direction:f.direction,armada_index:L,driver_id:R||null,driver_name:V}}),q("Driver berhasil diperbarui")}catch(F){h(F.message||"Gagal memperbarui driver")}}if(g){const[E,P]=g.dataset.slotMobil.split("__"),L=parseInt(P||"1"),R=g.value,D=`${E}__${f.direction}__${L}`;f.slotMobilMap[D]=R}});function v(p=1,b=""){const g=document.getElementById("package-form");g&&g.reset();const E=document.getElementById("package-armada-index");E&&(E.value=String(p));const P=document.getElementById("pkg-trip-date");P&&(P.value=f.date);const L=document.getElementById("pkg-trip-time");L&&b&&(L.value=b);const R=document.getElementById("pkg-bank-account-group");R&&(R.hidden=!0);const D=document.getElementById("pkg-seat-group");D&&(D.hidden=!0);const V=document.getElementById("package-form-success-banner");V&&(V.hidden=!0),A(),je()}function A(){const p=parseInt(document.getElementById("pkg-fare-amount")?.value||"0",10)||0,b=parseInt(document.getElementById("pkg-additional-fare")?.value||"0",10)||0,g=parseInt(document.getElementById("pkg-item-qty")?.value||"1",10)||1,E=(p+b)*g,P=document.getElementById("pkg-total-display");P&&(P.value=E>0?"Rp "+E.toLocaleString("id-ID"):"")}return document.getElementById("pkg-fare-amount")?.addEventListener("input",A),document.getElementById("pkg-additional-fare")?.addEventListener("input",A),document.getElementById("pkg-item-qty")?.addEventListener("input",A),document.getElementById("pkg-payment-method")?.addEventListener("change",p=>{const b=document.getElementById("pkg-bank-account-group");b&&(b.hidden=p.target.value!=="transfer")}),document.getElementById("pkg-package-size")?.addEventListener("change",p=>{const b=document.getElementById("pkg-seat-group");b&&(b.hidden=p.target.value!=="Besar");const g=document.getElementById("pkg-seat-code");g&&p.target.value!=="Besar"&&(g.value="")}),document.getElementById("pkg-trip-date")?.addEventListener("change",()=>{je()}),document.getElementById("pkg-trip-time")?.addEventListener("change",()=>{je()}),document.getElementById("pkg-from-city")?.addEventListener("change",()=>{je()}),document.getElementById("pkg-to-city")?.addEventListener("change",()=>{je()}),document.getElementById("package-form")?.addEventListener("submit",async p=>{p.preventDefault();const b=document.getElementById("package-submit-btn");se(b,!0,"Menyimpan...");try{const g=parseInt(document.getElementById("pkg-fare-amount")?.value||"0",10)||0,E=parseInt(document.getElementById("pkg-additional-fare")?.value||"0",10)||0,P=parseInt(document.getElementById("pkg-item-qty")?.value||"1",10)||1,L=document.getElementById("pkg-payment-method")?.value||"",R={armada_index:parseInt(document.getElementById("package-armada-index")?.value||"1",10),trip_date:document.getElementById("pkg-trip-date")?.value||"",trip_time:document.getElementById("pkg-trip-time")?.value||"",from_city:document.getElementById("pkg-from-city")?.value||"",to_city:document.getElementById("pkg-to-city")?.value||"",sender_name:document.getElementById("pkg-sender-name")?.value.trim()||"",sender_phone:document.getElementById("pkg-sender-phone")?.value.trim()||"",sender_address:document.getElementById("pkg-sender-address")?.value.trim()||"",recipient_name:document.getElementById("pkg-recipient-name")?.value.trim()||"",recipient_phone:document.getElementById("pkg-recipient-phone")?.value.trim()||"",recipient_address:document.getElementById("pkg-recipient-address")?.value.trim()||"",item_name:document.getElementById("pkg-item-name")?.value.trim()||"",item_qty:P,package_size:document.getElementById("pkg-package-size")?.value||"",seat_code:document.getElementById("pkg-package-size")?.value==="Besar"&&document.getElementById("pkg-seat-code")?.value||"",fare_amount:g,additional_fare:E,payment_method:L||null,payment_status:document.getElementById("pkg-payment-status")?.value||"Belum Bayar",bank_account_code:L==="transfer"&&document.getElementById("pkg-bank-account-code")?.value||""},D=await y("/bookings/quick-package",{method:"POST",body:R}),V=document.getElementById("package-form-success-banner"),M=document.getElementById("package-form-booking-code"),F=document.getElementById("package-form-download-link");V&&(V.hidden=!1),M&&(M.textContent="Kode Booking: "+D.booking_code+(D.invoice_number&&D.invoice_number!=="-"?" | No. Surat: "+D.invoice_number:"")),F&&(F.href=D.invoice_download_url),q("Paket berhasil disimpan: "+D.booking_code),await _e()}catch(g){h(g.message||"Silakan periksa kembali data yang diinput","Gagal menyimpan paket")}finally{se(b,!1,"Menyimpan...")}}),document.getElementById("choice-passenger-btn")?.addEventListener("click",()=>{z("booking-type-choice-modal"),Ot(f._pendingChoiceArmada||1,f._pendingChoiceTime||""),j("booking-form-modal")}),document.getElementById("choice-package-btn")?.addEventListener("click",()=>{z("booking-type-choice-modal"),v(f._pendingChoiceArmada||1,f._pendingChoiceTime||""),j("package-form-modal")}),t?.addEventListener("click",()=>{f._pendingChoiceArmada=1,f._pendingChoiceTime="",j("booking-type-choice-modal")}),i?.addEventListener("click",p=>{const b=p.target.closest("[data-seat-code]");if(!b||b.disabled)return;Jt();const g=b.dataset.seatCode;f.selectedSeats.includes(g)?f.selectedSeats=f.selectedSeats.filter(E=>E!==g):f.selectedSeats.length<St()&&(f.selectedSeats=cn([...f.selectedSeats,g])),ce(),le()}),document.getElementById("booking-passenger-count")?.addEventListener("change",()=>{Jt(),ce(),le(),Se()}),document.getElementById("booking-additional-fare")?.addEventListener("input",Se),document.getElementById("booking-trip-date")?.addEventListener("change",()=>{Ce().then(()=>{ce(),le()})}),document.getElementById("booking-trip-time")?.addEventListener("change",()=>{Ce().then(()=>{ce(),le()})}),document.getElementById("booking-from-city")?.addEventListener("change",()=>{Se(),Ce().then(()=>{ce(),le()})}),document.getElementById("booking-to-city")?.addEventListener("change",()=>{Se(),Ce().then(()=>{ce(),le()})}),d?.addEventListener("change",un),c?.addEventListener("input",p=>{const b=p.target.closest("[data-passenger-seat]");if(!b)return;const g=b.dataset.passengerSeat;f.passengerDraftMap[g]={seat_no:g,name:b.querySelector("[data-passenger-name]")?.value.trim()||"",phone:b.querySelector("[data-passenger-phone]")?.value.trim()||""}}),r?.addEventListener("submit",async p=>{p.preventDefault();const b=document.getElementById("booking-submit-btn");se(b,!0,"Menyimpan...");try{const g=xi();f.editItem?(await y(`/bookings/${f.editItem.id}`,{method:"PUT",body:g}),q("Data pemesanan berhasil diperbarui")):(await y("/bookings",{method:"POST",body:g}),q("Data pemesanan berhasil ditambahkan")),z("booking-form-modal"),Ot(),await _e()}catch(g){h(g.message||"Silakan periksa kembali data yang diinput","Gagal menyimpan data pemesanan")}finally{se(b,!1,"Menyimpan...")}}),s?.addEventListener("click",async()=>{if(f.deleteItem){se(s,!0,"Menghapus...");try{await y(`/bookings/${f.deleteItem.id}`,{method:"DELETE"}),q("Data pemesanan berhasil dihapus"),z("booking-delete-modal"),f.deleteItem=null,await _e()}catch(p){h(p.message||"Gagal menghapus data pemesanan")}finally{se(s,!1,"Menghapus...")}}}),Ot(),_e().catch(p=>{if(p.status===403){ia();return}h(p.message||"Gagal memuat data penumpang")})}function Ri(e){const t=document.getElementById(e);if(!t)return{};try{return JSON.parse(t.textContent||"{}")}catch{return{}}}function Pi(){const e=document.querySelector("[data-regular-booking-page]");if(!e)return;const t=Ri("regular-booking-route-matrix"),n=e.querySelector("[data-booking-origin]"),a=e.querySelector("[data-booking-destination]"),o=e.querySelector("[data-booking-schedule]"),r=e.querySelector("[data-booking-passengers]"),s=e.querySelector("[data-route-fare-input]"),i=e.querySelector("[data-additional-fare-input]"),c=e.querySelector("[data-estimated-total-input]"),d=e.querySelector("[data-route-feedback]"),l=e.querySelector("[data-route-feedback-title]"),k=e.querySelector("[data-route-feedback-text]"),v=e.querySelector("[data-booking-submit]"),A=Array.from(e.querySelectorAll("[data-booking-type]")),p=e.querySelector("[data-summary-booking-for]"),b=e.querySelector("[data-summary-route]"),g=e.querySelector("[data-summary-schedule]"),E=e.querySelector("[data-summary-passengers]"),P=e.querySelector("[data-summary-fare]"),L=e.querySelector("[data-summary-additional-fare]"),R=e.querySelector("[data-summary-total]"),D=new Map(A.map($=>[$.value,$.dataset.label||$.value])),V=new Map(Array.from(o?.options||[]).filter($=>$.value).map($=>[$.value,$.textContent.trim()]));function M($,N){if(!$||!N||$===N)return null;const G=t?.[$]?.[N];return G==null?null:Number(G)}function F($,N,G){!d||!l||!k||(d.dataset.state=$,l.textContent=N,k.textContent=G)}function J(){e.querySelectorAll(".regular-booking-radio").forEach($=>{const N=$.querySelector('input[type="radio"]');$.classList.toggle("is-selected",!!N?.checked)})}function W($){return $<=0?"Belum dipilih":$===6?"6 Penumpang (Opsional tambahan)":`${$} Penumpang`}function X(){const $=n?.value||"",N=a?.value||"",G=o?.value||"",re=Number(r?.value||0),Z=A.find(Ct=>Ct.checked)?.value||"",ae=M($,N),te=Math.max(parseInt(i?.value||"0",10)||0,0),me=ae!==null&&re>0?(ae+te)*re:null;s&&(s.value=ae!==null?H(ae):""),c&&(c.value=me!==null?H(me):""),!$||!N?F("idle","Tarif akan ditampilkan otomatis","Pilih asal dan tujuan untuk melihat tarif perjalanan reguler."):$===N?F("error","Asal dan tujuan tidak boleh sama","Silakan pilih tujuan yang berbeda agar tarif dapat dihitung."):ae===null?F("error","Rute belum tersedia","Rute yang Anda pilih saat ini belum tersedia. Silakan pilih kombinasi asal dan tujuan lain."):F("ready","Rute tersedia","Tarif telah diisi otomatis berdasarkan kombinasi rute dua arah yang tersedia."),v&&(v.disabled=!!($&&N&&($===N||ae===null))),p&&(p.textContent=D.get(Z)||"Belum dipilih"),b&&(b.textContent=$&&N?`${$} - ${N}`:"Belum dipilih"),g&&(g.textContent=V.get(G)||"Belum dipilih"),E&&(E.textContent=W(re)),P&&(P.textContent=ae!==null?H(ae):"Belum tersedia"),L&&(L.textContent=te>0?H(te):"Tidak ada"),R&&(R.textContent=me!==null?H(me):"Belum tersedia"),J()}[n,a,o,r].forEach($=>{$?.addEventListener("change",X)}),i?.addEventListener("input",X),A.forEach($=>{$.addEventListener("change",X)}),e.querySelector("form")?.addEventListener("reset",()=>{window.requestAnimationFrame(X)}),X()}function Di(){const e=document.querySelector("[data-regular-booking-seat-page]");if(!e)return;const t=Number(e.dataset.requiredSeatCount||0),n=Array.from(e.querySelectorAll("[data-seat-card]")),a=Array.from(e.querySelectorAll("[data-seat-input]")),o=e.querySelector("[data-seat-summary-count]"),r=e.querySelector("[data-seat-summary-list]"),s=e.querySelector("[data-seat-summary-remaining]"),i=e.querySelector("[data-seat-submit]"),c=e.querySelector("[data-seat-feedback]"),d=e.querySelector("[data-seat-feedback-title]"),l=e.querySelector("[data-seat-feedback-text]");function k(){return a.filter(b=>b.checked).map(b=>b.value)}function v(b){return b.length>0?b.join(", "):"Belum dipilih"}function A(b,g,E){!c||!d||!l||(c.dataset.state=b,d.textContent=g,l.textContent=E)}function p(){const b=k(),g=b.length,E=t>0&&g>=t;if(n.forEach(P=>{const L=P.querySelector("[data-seat-input]");if(!L)return;const R=L.disabled&&!L.checked&&P.classList.contains("is-occupied"),D=L.checked,V=R||E&&!D;R||(L.disabled=V),P.classList.toggle("is-selected",D),P.classList.toggle("is-disabled",!R&&V)}),o&&(o.textContent=`${g} dari ${t}`),r&&(r.textContent=v(b)),s&&(s.textContent=String(Math.max(t-g,0))),i&&(i.disabled=g!==t),g===0){A("idle","Pilih kursi sesuai jumlah penumpang","Jumlah kursi yang dipilih harus sama dengan jumlah penumpang pada booking draft.");return}if(g<t){A("idle","Pemilihan kursi belum lengkap",`Masih perlu memilih ${t-g} kursi lagi sebelum dapat melanjutkan.`);return}if(t===6){A("ready","Semua kursi sudah terisi","Jumlah penumpang 6 orang sudah terpenuhi dan kursi tambahan 2B ikut terpakai.");return}A("ready","Kursi sudah sesuai","Jumlah kursi yang dipilih sudah sesuai dengan jumlah penumpang dan siap disimpan.")}a.forEach(b=>{b.addEventListener("change",()=>{p()})}),p()}let Ne=null,yt=!1,da="",Oi=3e3,la=0;const vt=[],C=e=>document.getElementById(e);async function Za(e){const t=e.trim();if(!t)return;const n=Date.now();if(!(t===da&&n-la<Oi)){da=t,la=n,xe("Memproses scan…");try{const a=await y("/scan-qr",{method:"POST",body:{qr_token:t}});ji(a),Ni(a),a.already_scanned?h(a.message,"Tiket Sudah Pernah Di-Scan"):a.is_newly_eligible?q(a.message,"🎉 Eligible Diskon!"):q(a.message,"Scan Berhasil")}catch(a){qi(a.message||"Scan gagal"),h(a.message||"Scan gagal","Scan Gagal")}finally{xe(yt?"Kamera aktif — arahkan ke QR code.":"")}}}function ji(e){C("qrscan-result-idle").hidden=!0,C("qrscan-result-card").hidden=!1;const t=e.booking||{},n=e.passenger||{},a=e.loyalty_count,o=e.loyalty_target,r=e.discount_eligible,s=Math.min(Math.round(a/o*100),100),i=e.already_scanned?"warn":e.success?"success":"error";C("qrscan-result-header").className="qrscan-result-header qrscan-result-header--"+i,C("qrscan-result-icon").innerHTML=e.already_scanned?Gi():e.success?Fi():Ya(),C("qrscan-result-title").textContent=t.booking_code||"-",C("qrscan-result-subtitle").textContent=e.message,C("qr-res-name").textContent=n.name||t.nama_pemesanan||"-",C("qr-res-code").textContent=t.booking_code||"-",C("qr-res-route").textContent=t.route_label||"-",C("qr-res-datetime").textContent=(t.trip_date||"-")+" "+(t.trip_time||""),C("qr-res-seats").textContent=n.seat_no||t.selected_seats||"-",C("qr-res-pax").textContent=(t.passenger_count||0)+" Orang",C("qr-res-loyalty-label").textContent=a+" / "+o,C("qr-res-loyalty-fill").style.width=s+"%",C("qr-res-loyalty-fill").className="qrscan-loyalty-fill"+(r?" qrscan-loyalty-fill--done":""),C("qr-res-loyalty-note").textContent=r?"✅ Eligible diskon "+(e.discount_percentage||50)+"%":"Perlu "+Math.max(o-a,0)+" perjalanan lagi untuk diskon."}function qi(e){C("qrscan-result-idle").hidden=!0,C("qrscan-result-card").hidden=!1,C("qrscan-result-header").className="qrscan-result-header qrscan-result-header--error",C("qrscan-result-icon").innerHTML=Ya(),C("qrscan-result-title").textContent="Scan Gagal",C("qrscan-result-subtitle").textContent=e,["qr-res-name","qr-res-code","qr-res-route","qr-res-datetime","qr-res-seats","qr-res-pax"].forEach(t=>{C(t).textContent="-"}),C("qr-res-loyalty-label").textContent="– / –",C("qr-res-loyalty-fill").style.width="0%",C("qr-res-loyalty-note").textContent=""}function Ni(e){const t=e.booking,n=new Date().toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit",second:"2-digit"}),a=e.passenger||{};vt.unshift({booking:t,passenger:a,time:n,success:e.success,already_scanned:e.already_scanned,message:e.message}),Qa()}function Qa(){const e=C("qrscan-history-list");if(vt.length===0){e.innerHTML='<p class="qrscan-history-empty">Belum ada scan dalam sesi ini.</p>';return}e.innerHTML=vt.map(t=>{const n=t.already_scanned?"warn":t.success?"ok":"err",a=t.passenger&&t.passenger.name?t.passenger.name+(t.passenger.seat_no?" ("+t.passenger.seat_no+")":""):t.booking.nama_pemesanan||"-";return`
        <div class="qrscan-history-item qrscan-history-item--${n}">
            <div class="qrscan-history-dot"></div>
            <div class="qrscan-history-body">
                <strong>${u(t.booking.booking_code||"-")}</strong>
                <span>${u(a)}</span>
            </div>
            <span class="qrscan-history-time">${t.time}</span>
        </div>`}).join("")}function Ui(){if(!window.Html5Qrcode){h("Library scanner tidak tersedia. Coba muat ulang halaman.","Error");return}C("qrscan-placeholder").hidden=!0,C("qrscan-frame").hidden=!1,C("qrscan-btn-start").hidden=!0,C("qrscan-btn-stop").hidden=!1,yt=!0,xe("Menginisialisasi kamera…"),Ne=new window.Html5Qrcode("qrscan-reader"),Ne.start({facingMode:"environment"},{fps:10,qrbox:{width:240,height:240}},e=>{let t=e.trim();try{const n=JSON.parse(e);n&&(n.qr_token||n.passenger_qr_token)&&(t=n.qr_token||n.passenger_qr_token)}catch{}Za(t)},()=>{}).then(()=>{xe("Kamera aktif — arahkan ke QR code.")}).catch(e=>{yt=!1,C("qrscan-placeholder").hidden=!1,C("qrscan-frame").hidden=!0,C("qrscan-btn-start").hidden=!1,C("qrscan-btn-stop").hidden=!0,xe("Gagal mengakses kamera. Pastikan izin kamera sudah diberikan."),h(String(e),"Kamera Error")})}function Hi(){Ne&&Ne.stop().catch(()=>{}).finally(()=>{Ne=null}),yt=!1,C("qrscan-placeholder").hidden=!1,C("qrscan-frame").hidden=!0,C("qrscan-btn-start").hidden=!1,C("qrscan-btn-stop").hidden=!0,xe("Kamera dihentikan.")}function xe(e){C("qrscan-status-text").textContent=e}function Fi(){return`<svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
        <path d="M8 12l3 3 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`}function Ya(){return`<svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
        <path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`}function Gi(){return`<svg viewBox="0 0 24 24" fill="none">
        <path d="M12 9v4M12 17h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    </svg>`}function Vi(){C("qrscan-btn-start").addEventListener("click",Ui),C("qrscan-btn-stop").addEventListener("click",Hi),C("qrscan-clear-history").addEventListener("click",()=>{vt.length=0,Qa()}),C("qrscan-manual-form").addEventListener("submit",e=>{e.preventDefault();const t=C("qrscan-manual-input").value.trim();t&&(Za(t),C("qrscan-manual-input").value="")})}const x={data:[],loading:!0,totalCount:0,page:1,search:"",chartLimit:10,editItem:null,deleteItem:null,isSubmitting:!1};let et=null;const ke=15,Ji=()=>`<svg viewBox="0 0 24 24" fill="none">
    <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
</svg>`,Ki=()=>`<svg viewBox="0 0 24 24" fill="none">
    <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
</svg>`;function zi(){const e=document.getElementById("plkt-table-body");e&&(e.innerHTML=`
        <tr><td colspan="10" class="plkt-table-state">
            <div class="plkt-loading-inline">
                <span class="plkt-loading-inline-spinner" aria-hidden="true"></span>
                <span>Memuat data...</span>
            </div>
        </td></tr>`)}function Wi(){const e=document.getElementById("plkt-table-body");e&&(e.innerHTML='<tr><td colspan="10" class="plkt-table-state plkt-empty-copy">Belum ada data penumpang.</td></tr>')}function ca(){const e=document.getElementById("plkt-table-body");if(e){if(x.loading){zi();return}if(x.data.length===0){Wi();return}e.innerHTML=x.data.map((t,n)=>`
        <tr class="plkt-row">
            <td class="plkt-index-cell">${(x.page-1)*ke+n+1}</td>
            <td>
                <div class="plkt-user-cell">
                    <span class="plkt-user-avatar" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/>
                        </svg>
                    </span>
                    <div>
                        <span class="plkt-user-name">${u(t.passenger_name||"-")}</span>
                        <span class="plkt-user-seat">Kursi ${u(t.seat_no||"-")}</span>
                    </div>
                </div>
            </td>
            <td class="plkt-phone-cell">${u(t.phone||"-")}</td>
            <td>${u(t.from_city||"-")}</td>
            <td>${u(t.to_city||"-")}</td>
            <td class="plkt-date-cell">${u(t.trip_date||"-")}</td>
            <td class="plkt-time-cell">${u(t.trip_time||"-")}</td>
            <td class="plkt-tarif-cell">${u(t.tarif||"-")}</td>
            <td class="plkt-count-cell">
                <span class="plkt-count-badge">${t.booking_count}x</span>
            </td>
            <td>
                <div class="plkt-action-row">
                    <button class="plkt-icon-button" type="button"
                        data-plkt-edit="${t.id}"
                        aria-label="Edit penumpang ${u(t.passenger_name||"")}">
                        ${Ji()}
                    </button>
                    <button class="plkt-icon-button plkt-icon-button-danger" type="button"
                        data-plkt-delete="${t.id}"
                        data-plkt-name="${u(t.passenger_name||"")}"
                        aria-label="Hapus penumpang ${u(t.passenger_name||"")}">
                        ${Ki()}
                    </button>
                </div>
            </td>
        </tr>`).join("")}}function ua(){const e=document.getElementById("plkt-pagination-shell"),t=document.getElementById("plkt-pagination-info"),n=document.getElementById("plkt-pagination-page"),a=document.getElementById("plkt-prev-page-btn"),o=document.getElementById("plkt-next-page-btn"),r=Math.max(1,Math.ceil(x.totalCount/ke));e&&(e.hidden=r<=1),t&&(t.textContent=ye(x.page,ke,x.totalCount,x.data.length)),n&&(n.textContent=`${x.page} / ${r}`),a&&(a.disabled=x.page===1),o&&(o.disabled=x.page>=r)}async function $e(){x.loading=!0,ca(),ua();try{const[e,t]=await Promise.all([y(`/passengers-lkt?page=${x.page}&limit=${ke}${x.search?`&search=${encodeURIComponent(x.search)}`:""}`),y(`/passengers-lkt/count${x.search?`?search=${encodeURIComponent(x.search)}`:""}`)]);x.data=Array.isArray(e)?e:[],x.totalCount=Number(t?.count||0)}catch(e){h(e.message||"Gagal memuat data","Error"),x.data=[],x.totalCount=0}finally{x.loading=!1,ca(),ua()}}function Kt(e){const t=document.getElementById("plkt-edit-submit-btn");x.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":"Simpan")}async function Xi(e){try{const t=await y(`/passengers-lkt/${e}`);x.editItem=t;const n=document.getElementById("plkt-edit-name"),a=document.getElementById("plkt-edit-phone"),o=document.getElementById("plkt-edit-id");o&&(o.value=t.id),n&&(n.value=t.name||""),a&&(a.value=t.phone||""),Kt(!1),j("plkt-edit-modal")}catch{h("Gagal memuat data penumpang")}}function Zi(e,t){x.deleteItem={id:e,name:t};const n=document.getElementById("plkt-delete-copy");n&&(n.innerHTML=`Apakah Anda yakin ingin menghapus penumpang <strong>${u(t)}</strong>? Tindakan ini tidak dapat dibatalkan.`),j("plkt-delete-modal")}async function tt(){const e=document.getElementById("plkt-loyalty-chart"),t=document.getElementById("plkt-chart-empty");if(e)try{const n=await y(`/passengers-lkt/loyalty-chart?limit=${x.chartLimit}`);if(!Array.isArray(n)||n.length===0){e.hidden=!0,t&&(t.hidden=!1);return}e.hidden=!1,t&&(t.hidden=!0);const a=n.map(i=>i.passenger_name+(i.phone&&i.phone!=="-"?` (${i.phone})`:"")),o=n.map(i=>i.booking_count),r=Math.max(...o,1),s=o.map(i=>{const c=i/r;return`rgba(${Math.round(26+c*30)}, ${Math.round(35+c*80)}, ${Math.round(126+c*50)}, 0.85)`});et&&(et.destroy(),et=null),et=new window.Chart(e,{type:"bar",data:{labels:a,datasets:[{label:"Jumlah Pemesanan",data:o,backgroundColor:s,borderRadius:6,borderSkipped:!1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{title:i=>i[0].label,label:i=>` ${i.raw} kali pemesanan`}}},scales:{x:{ticks:{maxRotation:35,font:{size:11},color:"#374151"},grid:{display:!1}},y:{beginAtZero:!0,ticks:{stepSize:1,color:"#374151",font:{size:11}},grid:{color:"rgba(0,0,0,0.06)"}}}}})}catch{t&&(t.hidden=!1)}}function Qi(){if(x.data.length===0){h("Tidak ada data untuk diekspor.");return}const e=["No","Nama Penumpang","No HP","Dari","Tujuan","Tanggal Berangkat","Jam","Tarif","Kali Memesan"],t=x.data.map((s,i)=>[(x.page-1)*ke+i+1,s.passenger_name||"-",s.phone||"-",s.from_city||"-",s.to_city||"-",s.trip_date||"-",s.trip_time||"-",s.tarif||"-",s.booking_count]),n=[e,...t].map(s=>s.map(i=>`"${String(i).replace(/"/g,'""')}"`).join(",")).join(`
`),a=new Blob(["\uFEFF"+n],{type:"text/csv;charset=utf-8;"}),o=URL.createObjectURL(a),r=document.createElement("a");r.href=o,r.download="data-penumpang-lkt.csv",r.click(),URL.revokeObjectURL(o)}function Yi(){const e=document.getElementById("plkt-search-input"),t=document.getElementById("plkt-prev-page-btn"),n=document.getElementById("plkt-next-page-btn"),a=document.getElementById("plkt-export-btn"),o=document.getElementById("plkt-chart-limit"),r=document.getElementById("plkt-table-body"),s=document.getElementById("plkt-edit-form"),i=document.getElementById("plkt-delete-confirm-btn");e?.addEventListener("input",he(async c=>{x.search=c.target.value.trim(),x.page=1,await $e().catch(()=>h("Gagal memuat data"))},400)),t?.addEventListener("click",async()=>{x.page<=1||(x.page-=1,await $e().catch(()=>h("Gagal memuat data")))}),n?.addEventListener("click",async()=>{const c=Math.max(1,Math.ceil(x.totalCount/ke));x.page>=c||(x.page+=1,await $e().catch(()=>h("Gagal memuat data")))}),a?.addEventListener("click",Qi),o?.addEventListener("change",async c=>{x.chartLimit=parseInt(c.target.value,10)||10,await tt().catch(()=>{})}),r?.addEventListener("click",async c=>{const d=c.target.closest("[data-plkt-edit]"),l=c.target.closest("[data-plkt-delete]");d&&await Xi(d.dataset.plktEdit),l&&Zi(l.dataset.plktDelete,l.dataset.plktName)}),s?.addEventListener("submit",async c=>{c.preventDefault();const d=document.getElementById("plkt-edit-id")?.value,l=document.getElementById("plkt-edit-name")?.value.trim(),k=document.getElementById("plkt-edit-phone")?.value.trim();if(!l){h("Nama penumpang tidak boleh kosong");return}Kt(!0);try{await y(`/passengers-lkt/${d}`,{method:"PUT",body:{name:l,phone:k}}),q("Data penumpang berhasil diperbarui"),z("plkt-edit-modal"),await Promise.all([$e(),tt()])}catch(v){h(v.message||"Gagal menyimpan data")}finally{Kt(!1)}}),i?.addEventListener("click",async()=>{if(x.deleteItem)try{await y(`/passengers-lkt/${x.deleteItem.id}`,{method:"DELETE"}),q("Data penumpang berhasil dihapus"),z("plkt-delete-modal"),x.deleteItem=null,(x.page-1)*ke>=x.totalCount-1&&x.page>1&&(x.page-=1),await Promise.all([$e(),tt()])}catch(c){h(c.message||"Gagal menghapus data")}}),$e().catch(()=>h("Gagal memuat data")),tt().catch(()=>{})}const U={data:[],loading:!0,totalCount:0,page:1,search:"",detailItem:null,isLoadingDetail:!1},Ve=20,ed=()=>`<svg viewBox="0 0 24 24" fill="none">
    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/>
</svg>`;function eo(e){const t={high:["badge-emerald","Tinggi"],medium:["badge-blue","Sedang"],low:["badge-yellow","Rendah"]},[n,a]=t[e]??["badge-gray",e??"-"];return`<span class="stock-value-badge ${n}">${u(a)}</span>`}function to(e){const t={active:["stock-value-badge-emerald","Aktif"],merged:["stock-value-badge-blue","Digabung"],inactive:["stock-value-badge-red","Nonaktif"]},[n,a]=t[e]??["stock-value-badge-blue",e??"-"];return`<span class="stock-value-badge ${n}">${u(a)}</span>`}function no(e){return e?'<span class="stock-value-badge stock-value-badge-emerald">✓ Eligible</span>':'<span class="stock-value-badge stock-value-badge-blue">—</span>'}function td(){const e=document.getElementById("cust-table-body");e&&(e.innerHTML=`
        <tr><td colspan="8" class="plkt-table-state">
            <div class="plkt-loading-inline">
                <span class="plkt-loading-inline-spinner" aria-hidden="true"></span>
                <span>Memuat data...</span>
            </div>
        </td></tr>`)}function nd(){const e=document.getElementById("cust-table-body");e&&(e.innerHTML='<tr><td colspan="8" class="plkt-table-state plkt-empty-copy">Belum ada data pelanggan.</td></tr>')}function ma(){const e=document.getElementById("cust-table-body");if(e){if(U.loading){td();return}if(U.data.length===0){nd();return}e.innerHTML=U.data.map((t,n)=>`
        <tr class="plkt-row">
            <td class="plkt-index-cell">${(U.page-1)*Ve+n+1}</td>
            <td>
                <span class="plkt-booking-code-badge">${u(t.customer_code||"-")}</span>
            </td>
            <td>
                <div class="plkt-user-cell">
                    <span class="plkt-user-avatar" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/>
                        </svg>
                    </span>
                    <div>
                        <span class="plkt-user-name">${u(t.display_name||"-")}</span>
                        <span class="plkt-user-seat">${eo(t.identity_confidence)}</span>
                    </div>
                </div>
            </td>
            <td class="plkt-phone-cell">${u(t.phone_normalized||t.phone_original||"-")}</td>
            <td class="text-center">
                <strong>${t.total_trip_count??0}</strong>
                <span style="color:var(--color-text-muted);font-size:.75rem"> / 5</span>
            </td>
            <td class="text-center">${no(t.discount_eligible)}</td>
            <td class="text-center">${to(t.status)}</td>
            <td class="text-center">
                <button class="plkt-icon-button" type="button"
                    data-cust-detail="${t.id}"
                    aria-label="Detail pelanggan ${u(t.display_name||"")}">
                    ${ed()}
                </button>
            </td>
        </tr>`).join("")}}function ad(){const e=document.getElementById("cust-pagination-shell"),t=document.getElementById("cust-pagination-info"),n=document.getElementById("cust-pagination-page"),a=document.getElementById("cust-prev-page-btn"),o=document.getElementById("cust-next-page-btn"),r=Math.max(1,Math.ceil(U.totalCount/Ve));e&&(e.hidden=!1),t&&(t.textContent=ye(U.page,Ve,U.totalCount,U.data.length)),n&&(n.textContent=`${U.page} / ${r}`),a&&(a.disabled=U.page===1),o&&(o.disabled=U.page>=r)}async function od(){try{const[e,t,n]=await Promise.all([y("/customers?limit=1"),y("/customers?limit=1&discount_eligible=1"),y("/customers?limit=1&has_phone=1")]),a=document.getElementById("cust-stat-total"),o=document.getElementById("cust-stat-eligible"),r=document.getElementById("cust-stat-with-phone");a&&(a.textContent=(e?.total??0).toLocaleString("id-ID")),o&&(o.textContent=(t?.total??0).toLocaleString("id-ID")),r&&(r.textContent=(n?.total??0).toLocaleString("id-ID"))}catch{}}async function nt(){U.loading=!0,ma();try{const e=new URLSearchParams({page:U.page,limit:Ve});U.search&&e.set("search",U.search);const t=await y(`/customers?${e.toString()}`);U.data=Array.isArray(t?.data)?t.data:[],U.totalCount=Number(t?.total??0)}catch(e){h(e.message||"Gagal memuat data pelanggan","Error"),U.data=[],U.totalCount=0}finally{U.loading=!1,ma(),ad()}}async function rd(e){const t=document.getElementById("cust-detail-name"),n=document.getElementById("cust-detail-code"),a=document.getElementById("cust-detail-body");t&&(t.textContent="Detail Pelanggan"),n&&(n.textContent=""),a&&(a.innerHTML=`
        <div class="plkt-loading-inline">
            <span class="plkt-loading-inline-spinner" aria-hidden="true"></span>
            <span>Memuat detail...</span>
        </div>`),j("cust-detail-modal");try{const o=await y(`/customers/${e}`);t&&(t.textContent=o.display_name||"-"),n&&(n.textContent=o.customer_code||"");const r=o.recent_bookings?.length?o.recent_bookings.map(s=>`
                <tr>
                    <td>${u(s.booking_code||"-")}</td>
                    <td>${u(s.trip_date||"-")}</td>
                    <td>${u(s.from_city||"-")} → ${u(s.to_city||"-")}</td>
                    <td>${u(s.booking_status||"-")}</td>
                </tr>`).join(""):'<tr><td colspan="4" class="plkt-table-state plkt-empty-copy">Belum ada riwayat perjalanan.</td></tr>';a&&(a.innerHTML=`
            <dl class="cust-detail-dl">
                <dt>Nama</dt>
                <dd>${u(o.display_name||"-")}</dd>
                <dt>Nomor HP</dt>
                <dd>${u(o.phone_normalized||o.phone_original||"-")}</dd>
                <dt>Email</dt>
                <dd>${u(o.email||"-")}</dd>
                <dt>Status</dt>
                <dd>${to(o.status)}</dd>
                <dt>Kepercayaan Data</dt>
                <dd>${eo(o.identity_confidence)}</dd>
                <dt>Total Perjalanan</dt>
                <dd><strong>${o.total_trip_count??0}</strong> / 5</dd>
                <dt>Eligible Diskon</dt>
                <dd>${no(o.discount_eligible)}</dd>
                <dt>Scan Seumur Hidup</dt>
                <dd>${o.lifetime_scan_count??0}×</dd>
            </dl>

            <h4 class="cust-detail-section-title">Riwayat Perjalanan Terbaru</h4>
            <div class="plkt-table-wrap" style="margin-top:.75rem">
                <table class="plkt-table">
                    <thead>
                        <tr>
                            <th>Kode Booking</th>
                            <th>Tanggal</th>
                            <th>Rute</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>${r}</tbody>
                </table>
            </div>`)}catch(o){a&&(a.innerHTML=`<p class="plkt-empty-copy">Gagal memuat detail: ${u(o.message||"Terjadi kesalahan")}</p>`)}}async function sd(){try{const t=(await y("/customers/duplicates?limit=5"))?.total??0;t===0?q("Tidak ada duplikasi pelanggan terdeteksi.","Tidak Ada Duplikasi"):h(`Terdeteksi ${t} pasang pelanggan berpotensi duplikat. Gunakan API untuk merge.`,`${t} Duplikasi Ditemukan`)}catch(e){h(e.message||"Gagal memeriksa duplikasi","Error")}}function id(){const e=document.getElementById("cust-search-input"),t=document.getElementById("cust-prev-page-btn"),n=document.getElementById("cust-next-page-btn"),a=document.getElementById("cust-table-body"),o=document.getElementById("cust-duplicates-btn");e?.addEventListener("input",he(async r=>{U.search=r.target.value.trim(),U.page=1,await nt().catch(()=>h("Gagal memuat data"))},400)),t?.addEventListener("click",async()=>{U.page<=1||(U.page-=1,await nt().catch(()=>h("Gagal memuat data")))}),n?.addEventListener("click",async()=>{const r=Math.max(1,Math.ceil(U.totalCount/Ve));U.page>=r||(U.page+=1,await nt().catch(()=>h("Gagal memuat data")))}),o?.addEventListener("click",sd),a?.addEventListener("click",async r=>{const s=r.target.closest("[data-cust-detail]");s&&await rd(s.dataset.custDetail)}),nt().catch(()=>h("Gagal memuat data")),od().catch(()=>{})}function dd(e){return!e||e<=0?"":"Rp "+Math.floor(e).toLocaleString("id-ID")}function ld(){const e=document.querySelector("[data-fare-input]"),t=document.querySelector("[data-additional-fare-input]"),n=document.querySelector("[data-estimated-total-input]");function a(){const o=parseInt(e?.value||"0",10)||0,r=parseInt(t?.value||"0",10)||0,s=o+r;n&&(n.value=dd(s))}e?.addEventListener("input",a),t?.addEventListener("input",a),document.querySelectorAll('.regular-booking-radio input[type="radio"]').forEach(o=>{o.addEventListener("change",()=>{document.querySelectorAll(`.regular-booking-radio input[name="${o.name}"]`).forEach(s=>{s.closest(".regular-booking-radio")?.classList.toggle("is-selected",s.checked)})})})}function jt(e){return"Rp "+Math.floor(e).toLocaleString("id-ID")}function qe(e){const t=document.getElementById(e);t&&(t.showModal?.()||t.setAttribute("open",""))}function cd(e){const t=document.getElementById(e);t&&(t.close?.()||t.removeAttribute("open"))}function ud(e){const t=e.closest("tr[data-row]");if(!t)return null;try{return JSON.parse(t.dataset.row)}catch{return null}}function md(e){const t=document.getElementById("show-detail-grid");if(!t)return;const n={transfer:"Transfer Bank",qris:"QRIS",cash:"Tunai","":"—"};t.innerHTML=`
        <div class="ddrop-detail-item">
            <span class="ddrop-detail-label">Kode Booking</span>
            <span class="ddrop-detail-value" style="font-family:monospace;color:#047857">${e.booking_code}</span>
        </div>
        <div class="ddrop-detail-item">
            <span class="ddrop-detail-label">Status Pembayaran</span>
            <span class="ddrop-detail-value">${e.payment_status||"—"}</span>
        </div>
        <div class="ddrop-detail-item">
            <span class="ddrop-detail-label">Nama Pemesan</span>
            <span class="ddrop-detail-value">${e.passenger_name}</span>
        </div>
        <div class="ddrop-detail-item">
            <span class="ddrop-detail-label">No HP</span>
            <span class="ddrop-detail-value">${e.passenger_phone}</span>
        </div>
        <div class="ddrop-detail-item">
            <span class="ddrop-detail-label">Asal Penjemputan</span>
            <span class="ddrop-detail-value">${e.from_city}</span>
        </div>
        <div class="ddrop-detail-item">
            <span class="ddrop-detail-label">Tujuan</span>
            <span class="ddrop-detail-value">${e.to_city}</span>
        </div>
        <div class="ddrop-detail-item col-span-2">
            <span class="ddrop-detail-label">Alamat Penjemputan</span>
            <span class="ddrop-detail-value">${e.pickup_location}</span>
        </div>
        <div class="ddrop-detail-item col-span-2">
            <span class="ddrop-detail-label">Alamat Pengantaran</span>
            <span class="ddrop-detail-value">${e.dropoff_location}</span>
        </div>
        <div class="ddrop-detail-item">
            <span class="ddrop-detail-label">Tanggal Keberangkatan</span>
            <span class="ddrop-detail-value">${e.trip_date_fmt||e.trip_date}</span>
        </div>
        <div class="ddrop-detail-item">
            <span class="ddrop-detail-label">Jam Keberangkatan</span>
            <span class="ddrop-detail-value">${e.trip_time} WIB</span>
        </div>
        <div class="ddrop-detail-item">
            <span class="ddrop-detail-label">Tarif Dropping</span>
            <span class="ddrop-detail-value" style="color:#047857;font-size:1.05rem">${jt(e.price_per_seat)}</span>
        </div>
        <div class="ddrop-detail-item">
            <span class="ddrop-detail-label">Tambahan Ongkos</span>
            <span class="ddrop-detail-value">${e.additional_fare>0?jt(e.additional_fare):"—"}</span>
        </div>
        <div class="ddrop-detail-item col-span-2">
            <span class="ddrop-detail-label">Total Tarif</span>
            <span class="ddrop-detail-value" style="color:#047857;font-weight:700;font-size:1.05rem">${jt(e.total_amount)}</span>
        </div>
        <div class="ddrop-detail-item">
            <span class="ddrop-detail-label">Metode Pembayaran</span>
            <span class="ddrop-detail-value">${(n[e.payment_method]??e.payment_method)||"—"}</span>
        </div>
        <div class="ddrop-detail-item col-span-2">
            <span class="ddrop-detail-label">Keterangan</span>
            <span class="ddrop-detail-value">${e.notes||"—"}</span>
        </div>
        <div class="ddrop-detail-item">
            <span class="ddrop-detail-label">Driver</span>
            <span class="ddrop-detail-value">${e.driver_name||"—"}</span>
        </div>
        <div class="ddrop-detail-item">
            <span class="ddrop-detail-label">Mobil</span>
            <span class="ddrop-detail-value">${e.kode_mobil?e.kode_mobil+(e.jenis_mobil?" — "+e.jenis_mobil:""):"—"}</span>
        </div>
    `}function pd(e){const t=document.getElementById("form-edit");if(!t)return;const n=window.__DROPPING_DATA_UPDATE_BASE__||"/dashboard/dropping-data";t.action=`${n}/${e.id}`;const a=(o,r)=>{const s=t.querySelector(`[name="${o}"]`);s&&(s.value=r??"")};a("passenger_name",e.passenger_name),a("passenger_phone",e.passenger_phone),a("from_city",e.from_city),a("to_city",e.to_city),a("pickup_location",e.pickup_location),a("dropoff_location",e.dropoff_location),a("price_per_seat",e.price_per_seat),a("additional_fare",e.additional_fare),a("trip_date",e.trip_date),a("trip_time",e.trip_time),a("notes",e.notes),a("payment_method",e.payment_method),a("payment_status",e.payment_status),a("driver_id",e.driver_id),a("mobil_id",e.mobil_id)}function gd(e){const t=document.getElementById("form-delete"),n=document.getElementById("delete-booking-code");if(!t||!n)return;const a=window.__DROPPING_DATA_UPDATE_BASE__||"/dashboard/dropping-data";t.action=`${a}/${e.id}`,n.textContent=e.booking_code}function fd(){window.__DROPPING_DATA_UPDATE_BASE__="/dashboard/dropping-data",document.getElementById("btn-open-create")?.addEventListener("click",()=>{qe("modal-create")}),document.getElementById("btn-open-create-empty")?.addEventListener("click",()=>{qe("modal-create")}),document.addEventListener("click",e=>{const t=e.target.closest("[data-action]");if(!t)return;const n=t.dataset.action,a=ud(t);a&&(n==="show"?(md(a),qe("modal-show")):n==="edit"?(pd(a),qe("modal-edit")):n==="delete"&&(gd(a),qe("modal-delete")))}),document.querySelectorAll("[data-close-modal]").forEach(e=>{e.addEventListener("click",()=>cd(e.dataset.closeModal))}),document.querySelectorAll(".ddrop-modal").forEach(e=>{e.addEventListener("click",t=>{t.target===e&&(e.close?.()||e.removeAttribute("open"))})})}const bd={"admin-users/index":oi,"auth/login":Zr,"bookings/index":Mi,"dashboard/index":ls,"drivers/index":ys,"mobil/index":Ls,"keberangkatan/index":Os,"regular-bookings/index":Pi,"regular-bookings/seats":Di,"stock/index":Fs,"qr-scan/index":Vi,"passengers-lkt/index":Yi,"customers/index":id,"dropping-bookings/index":ld,"dropping-data/index":fd};document.addEventListener("DOMContentLoaded",async()=>{Kr(),Xr(),dt(qa());const e=Ur();e&&(e.type==="success"?q(e.message,e.title):e.type==="info"?zr(e.message,e.title):h(e.message,e.title));try{const{user:t}=await Jr();t&&dt(t);const n=document.body.dataset.pageScript,a=bd[n];typeof a=="function"&&await a({user:t})}catch(t){console.error(t),h(t.message||"Terjadi kesalahan saat memuat halaman")}});
