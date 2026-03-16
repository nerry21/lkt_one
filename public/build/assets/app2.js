function Wn(e,t){return function(){return e.apply(t,arguments)}}const{toString:Ra}=Object.prototype,{getPrototypeOf:Dt}=Object,{iterator:ut,toStringTag:zn}=Symbol,mt=(e=>t=>{const n=Ra.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),ee=e=>(e=e.toLowerCase(),t=>mt(t)===e),pt=e=>t=>typeof t===e,{isArray:Be}=Array,ve=pt("undefined");function Pe(e){return e!==null&&!ve(e)&&e.constructor!==null&&!ve(e.constructor)&&K(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const Xn=ee("ArrayBuffer");function Ma(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&Xn(e.buffer),t}const Pa=pt("string"),K=pt("function"),Zn=pt("number"),De=e=>e!==null&&typeof e=="object",Da=e=>e===!0||e===!1,Je=e=>{if(mt(e)!=="object")return!1;const t=Dt(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(zn in e)&&!(ut in e)},Oa=e=>{if(!De(e)||Pe(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},qa=ee("Date"),ja=ee("File"),Na=e=>!!(e&&typeof e.uri<"u"),Ua=e=>e&&typeof e.getParts<"u",Ha=ee("Blob"),Fa=ee("FileList"),Va=e=>De(e)&&K(e.pipe);function Ga(){return typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}}const en=Ga(),tn=typeof en.FormData<"u"?en.FormData:void 0,Ja=e=>{let t;return e&&(tn&&e instanceof tn||K(e.append)&&((t=mt(e))==="formdata"||t==="object"&&K(e.toString)&&e.toString()==="[object FormData]"))},Ka=ee("URLSearchParams"),[Wa,za,Xa,Za]=["ReadableStream","Request","Response","Headers"].map(ee),Qa=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function Oe(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let a,r;if(typeof e!="object"&&(e=[e]),Be(e))for(a=0,r=e.length;a<r;a++)t.call(null,e[a],a,e);else{if(Pe(e))return;const o=n?Object.getOwnPropertyNames(e):Object.keys(e),s=o.length;let i;for(a=0;a<s;a++)i=o[a],t.call(null,e[i],i,e)}}function Qn(e,t){if(Pe(e))return null;t=t.toLowerCase();const n=Object.keys(e);let a=n.length,r;for(;a-- >0;)if(r=n[a],t===r.toLowerCase())return r;return null}const ie=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,Yn=e=>!ve(e)&&e!==ie;function xt(){const{caseless:e,skipUndefined:t}=Yn(this)&&this||{},n={},a=(r,o)=>{if(o==="__proto__"||o==="constructor"||o==="prototype")return;const s=e&&Qn(n,o)||o;Je(n[s])&&Je(r)?n[s]=xt(n[s],r):Je(r)?n[s]=xt({},r):Be(r)?n[s]=r.slice():(!t||!ve(r))&&(n[s]=r)};for(let r=0,o=arguments.length;r<o;r++)arguments[r]&&Oe(arguments[r],a);return n}const Ya=(e,t,n,{allOwnKeys:a}={})=>(Oe(t,(r,o)=>{n&&K(r)?Object.defineProperty(e,o,{value:Wn(r,n),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(e,o,{value:r,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:a}),e),er=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),tr=(e,t,n,a)=>{e.prototype=Object.create(t.prototype,a),Object.defineProperty(e.prototype,"constructor",{value:e,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},nr=(e,t,n,a)=>{let r,o,s;const i={};if(t=t||{},e==null)return t;do{for(r=Object.getOwnPropertyNames(e),o=r.length;o-- >0;)s=r[o],(!a||a(s,e,t))&&!i[s]&&(t[s]=e[s],i[s]=!0);e=n!==!1&&Dt(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},ar=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const a=e.indexOf(t,n);return a!==-1&&a===n},rr=e=>{if(!e)return null;if(Be(e))return e;let t=e.length;if(!Zn(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},or=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&Dt(Uint8Array)),sr=(e,t)=>{const a=(e&&e[ut]).call(e);let r;for(;(r=a.next())&&!r.done;){const o=r.value;t.call(e,o[0],o[1])}},ir=(e,t)=>{let n;const a=[];for(;(n=e.exec(t))!==null;)a.push(n);return a},lr=ee("HTMLFormElement"),dr=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,a,r){return a.toUpperCase()+r}),nn=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),cr=ee("RegExp"),ea=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),a={};Oe(n,(r,o)=>{let s;(s=t(r,o,e))!==!1&&(a[o]=s||r)}),Object.defineProperties(e,a)},ur=e=>{ea(e,(t,n)=>{if(K(e)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const a=e[n];if(K(a)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},mr=(e,t)=>{const n={},a=r=>{r.forEach(o=>{n[o]=!0})};return Be(e)?a(e):a(String(e).split(t)),n},pr=()=>{},gr=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function fr(e){return!!(e&&K(e.append)&&e[zn]==="FormData"&&e[ut])}const br=e=>{const t=new Array(10),n=(a,r)=>{if(De(a)){if(t.indexOf(a)>=0)return;if(Pe(a))return a;if(!("toJSON"in a)){t[r]=a;const o=Be(a)?[]:{};return Oe(a,(s,i)=>{const m=n(s,r+1);!ve(m)&&(o[i]=m)}),t[r]=void 0,o}}return a};return n(e,0)},hr=ee("AsyncFunction"),kr=e=>e&&(De(e)||K(e))&&K(e.then)&&K(e.catch),ta=((e,t)=>e?setImmediate:t?((n,a)=>(ie.addEventListener("message",({source:r,data:o})=>{r===ie&&o===n&&a.length&&a.shift()()},!1),r=>{a.push(r),ie.postMessage(n,"*")}))(`axios@${Math.random()}`,[]):n=>setTimeout(n))(typeof setImmediate=="function",K(ie.postMessage)),yr=typeof queueMicrotask<"u"?queueMicrotask.bind(ie):typeof process<"u"&&process.nextTick||ta,vr=e=>e!=null&&K(e[ut]),c={isArray:Be,isArrayBuffer:Xn,isBuffer:Pe,isFormData:Ja,isArrayBufferView:Ma,isString:Pa,isNumber:Zn,isBoolean:Da,isObject:De,isPlainObject:Je,isEmptyObject:Oa,isReadableStream:Wa,isRequest:za,isResponse:Xa,isHeaders:Za,isUndefined:ve,isDate:qa,isFile:ja,isReactNativeBlob:Na,isReactNative:Ua,isBlob:Ha,isRegExp:cr,isFunction:K,isStream:Va,isURLSearchParams:Ka,isTypedArray:or,isFileList:Fa,forEach:Oe,merge:xt,extend:Ya,trim:Qa,stripBOM:er,inherits:tr,toFlatObject:nr,kindOf:mt,kindOfTest:ee,endsWith:ar,toArray:rr,forEachEntry:sr,matchAll:ir,isHTMLForm:lr,hasOwnProperty:nn,hasOwnProp:nn,reduceDescriptors:ea,freezeMethods:ur,toObjectSet:mr,toCamelCase:dr,noop:pr,toFiniteNumber:gr,findKey:Qn,global:ie,isContextDefined:Yn,isSpecCompliantForm:fr,toJSONObject:br,isAsyncFn:hr,isThenable:kr,setImmediate:ta,asap:yr,isIterable:vr};let I=class na extends Error{static from(t,n,a,r,o,s){const i=new na(t.message,n||t.code,a,r,o);return i.cause=t,i.name=t.name,t.status!=null&&i.status==null&&(i.status=t.status),s&&Object.assign(i,s),i}constructor(t,n,a,r,o){super(t),Object.defineProperty(this,"message",{value:t,enumerable:!0,writable:!0,configurable:!0}),this.name="AxiosError",this.isAxiosError=!0,n&&(this.code=n),a&&(this.config=a),r&&(this.request=r),o&&(this.response=o,this.status=o.status)}toJSON(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:c.toJSONObject(this.config),code:this.code,status:this.status}}};I.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";I.ERR_BAD_OPTION="ERR_BAD_OPTION";I.ECONNABORTED="ECONNABORTED";I.ETIMEDOUT="ETIMEDOUT";I.ERR_NETWORK="ERR_NETWORK";I.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";I.ERR_DEPRECATED="ERR_DEPRECATED";I.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";I.ERR_BAD_REQUEST="ERR_BAD_REQUEST";I.ERR_CANCELED="ERR_CANCELED";I.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";I.ERR_INVALID_URL="ERR_INVALID_URL";const Er=null;function _t(e){return c.isPlainObject(e)||c.isArray(e)}function aa(e){return c.endsWith(e,"[]")?e.slice(0,-2):e}function vt(e,t,n){return e?e.concat(t).map(function(r,o){return r=aa(r),!n&&o?"["+r+"]":r}).join(n?".":""):t}function wr(e){return c.isArray(e)&&!e.some(_t)}const Br=c.toFlatObject(c,{},null,function(t){return/^is[A-Z]/.test(t)});function gt(e,t,n){if(!c.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=c.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(b,h){return!c.isUndefined(h[b])});const a=n.metaTokens,r=n.visitor||d,o=n.dots,s=n.indexes,m=(n.Blob||typeof Blob<"u"&&Blob)&&c.isSpecCompliantForm(t);if(!c.isFunction(r))throw new TypeError("visitor must be a function");function l(p){if(p===null)return"";if(c.isDate(p))return p.toISOString();if(c.isBoolean(p))return p.toString();if(!m&&c.isBlob(p))throw new I("Blob is not supported. Use a Buffer instead.");return c.isArrayBuffer(p)||c.isTypedArray(p)?m&&typeof Blob=="function"?new Blob([p]):Buffer.from(p):p}function d(p,b,h){let L=p;if(c.isReactNative(t)&&c.isReactNativeBlob(p))return t.append(vt(h,b,o),l(p)),!1;if(p&&!h&&typeof p=="object"){if(c.endsWith(b,"{}"))b=a?b:b.slice(0,-2),p=JSON.stringify(p);else if(c.isArray(p)&&wr(p)||(c.isFileList(p)||c.endsWith(b,"[]"))&&(L=c.toArray(p)))return b=aa(b),L.forEach(function(T,M){!(c.isUndefined(T)||T===null)&&t.append(s===!0?vt([b],M,o):s===null?b:b+"[]",l(T))}),!1}return _t(p)?!0:(t.append(vt(h,b,o),l(p)),!1)}const u=[],f=Object.assign(Br,{defaultVisitor:d,convertValue:l,isVisitable:_t});function y(p,b){if(!c.isUndefined(p)){if(u.indexOf(p)!==-1)throw Error("Circular reference detected in "+b.join("."));u.push(p),c.forEach(p,function(L,R){(!(c.isUndefined(L)||L===null)&&r.call(t,L,c.isString(R)?R.trim():R,b,f))===!0&&y(L,b?b.concat(R):[R])}),u.pop()}}if(!c.isObject(e))throw new TypeError("data must be an object");return y(e),t}function an(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(a){return t[a]})}function Ot(e,t){this._pairs=[],e&&gt(e,this,t)}const ra=Ot.prototype;ra.append=function(t,n){this._pairs.push([t,n])};ra.toString=function(t){const n=t?function(a){return t.call(this,a,an)}:an;return this._pairs.map(function(r){return n(r[0])+"="+n(r[1])},"").join("&")};function Ir(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function oa(e,t,n){if(!t)return e;const a=n&&n.encode||Ir,r=c.isFunction(n)?{serialize:n}:n,o=r&&r.serialize;let s;if(o?s=o(t,r):s=c.isURLSearchParams(t)?t.toString():new Ot(t,r).toString(a),s){const i=e.indexOf("#");i!==-1&&(e=e.slice(0,i)),e+=(e.indexOf("?")===-1?"?":"&")+s}return e}class rn{constructor(){this.handlers=[]}use(t,n,a){return this.handlers.push({fulfilled:t,rejected:n,synchronous:a?a.synchronous:!1,runWhen:a?a.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){c.forEach(this.handlers,function(a){a!==null&&t(a)})}}const qt={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0},Sr=typeof URLSearchParams<"u"?URLSearchParams:Ot,Cr=typeof FormData<"u"?FormData:null,$r=typeof Blob<"u"?Blob:null,xr={isBrowser:!0,classes:{URLSearchParams:Sr,FormData:Cr,Blob:$r},protocols:["http","https","file","blob","url","data"]},jt=typeof window<"u"&&typeof document<"u",Tt=typeof navigator=="object"&&navigator||void 0,_r=jt&&(!Tt||["ReactNative","NativeScript","NS"].indexOf(Tt.product)<0),Tr=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",Lr=jt&&window.location.href||"http://localhost",Ar=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:jt,hasStandardBrowserEnv:_r,hasStandardBrowserWebWorkerEnv:Tr,navigator:Tt,origin:Lr},Symbol.toStringTag,{value:"Module"})),V={...Ar,...xr};function Rr(e,t){return gt(e,new V.classes.URLSearchParams,{visitor:function(n,a,r,o){return V.isNode&&c.isBuffer(n)?(this.append(a,n.toString("base64")),!1):o.defaultVisitor.apply(this,arguments)},...t})}function Mr(e){return c.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function Pr(e){const t={},n=Object.keys(e);let a;const r=n.length;let o;for(a=0;a<r;a++)o=n[a],t[o]=e[o];return t}function sa(e){function t(n,a,r,o){let s=n[o++];if(s==="__proto__")return!0;const i=Number.isFinite(+s),m=o>=n.length;return s=!s&&c.isArray(r)?r.length:s,m?(c.hasOwnProp(r,s)?r[s]=[r[s],a]:r[s]=a,!i):((!r[s]||!c.isObject(r[s]))&&(r[s]=[]),t(n,a,r[s],o)&&c.isArray(r[s])&&(r[s]=Pr(r[s])),!i)}if(c.isFormData(e)&&c.isFunction(e.entries)){const n={};return c.forEachEntry(e,(a,r)=>{t(Mr(a),r,n,0)}),n}return null}function Dr(e,t,n){if(c.isString(e))try{return(t||JSON.parse)(e),c.trim(e)}catch(a){if(a.name!=="SyntaxError")throw a}return(n||JSON.stringify)(e)}const qe={transitional:qt,adapter:["xhr","http","fetch"],transformRequest:[function(t,n){const a=n.getContentType()||"",r=a.indexOf("application/json")>-1,o=c.isObject(t);if(o&&c.isHTMLForm(t)&&(t=new FormData(t)),c.isFormData(t))return r?JSON.stringify(sa(t)):t;if(c.isArrayBuffer(t)||c.isBuffer(t)||c.isStream(t)||c.isFile(t)||c.isBlob(t)||c.isReadableStream(t))return t;if(c.isArrayBufferView(t))return t.buffer;if(c.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let i;if(o){if(a.indexOf("application/x-www-form-urlencoded")>-1)return Rr(t,this.formSerializer).toString();if((i=c.isFileList(t))||a.indexOf("multipart/form-data")>-1){const m=this.env&&this.env.FormData;return gt(i?{"files[]":t}:t,m&&new m,this.formSerializer)}}return o||r?(n.setContentType("application/json",!1),Dr(t)):t}],transformResponse:[function(t){const n=this.transitional||qe.transitional,a=n&&n.forcedJSONParsing,r=this.responseType==="json";if(c.isResponse(t)||c.isReadableStream(t))return t;if(t&&c.isString(t)&&(a&&!this.responseType||r)){const s=!(n&&n.silentJSONParsing)&&r;try{return JSON.parse(t,this.parseReviver)}catch(i){if(s)throw i.name==="SyntaxError"?I.from(i,I.ERR_BAD_RESPONSE,this,null,this.response):i}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:V.classes.FormData,Blob:V.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};c.forEach(["delete","get","head","post","put","patch"],e=>{qe.headers[e]={}});const Or=c.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),qr=e=>{const t={};let n,a,r;return e&&e.split(`
`).forEach(function(s){r=s.indexOf(":"),n=s.substring(0,r).trim().toLowerCase(),a=s.substring(r+1).trim(),!(!n||t[n]&&Or[n])&&(n==="set-cookie"?t[n]?t[n].push(a):t[n]=[a]:t[n]=t[n]?t[n]+", "+a:a)}),t},on=Symbol("internals");function Se(e){return e&&String(e).trim().toLowerCase()}function Ke(e){return e===!1||e==null?e:c.isArray(e)?e.map(Ke):String(e)}function jr(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let a;for(;a=n.exec(e);)t[a[1]]=a[2];return t}const Nr=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function Et(e,t,n,a,r){if(c.isFunction(a))return a.call(this,t,n);if(r&&(t=n),!!c.isString(t)){if(c.isString(a))return t.indexOf(a)!==-1;if(c.isRegExp(a))return a.test(t)}}function Ur(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,a)=>n.toUpperCase()+a)}function Hr(e,t){const n=c.toCamelCase(" "+t);["get","set","has"].forEach(a=>{Object.defineProperty(e,a+n,{value:function(r,o,s){return this[a].call(this,t,r,o,s)},configurable:!0})})}let W=class{constructor(t){t&&this.set(t)}set(t,n,a){const r=this;function o(i,m,l){const d=Se(m);if(!d)throw new Error("header name must be a non-empty string");const u=c.findKey(r,d);(!u||r[u]===void 0||l===!0||l===void 0&&r[u]!==!1)&&(r[u||m]=Ke(i))}const s=(i,m)=>c.forEach(i,(l,d)=>o(l,d,m));if(c.isPlainObject(t)||t instanceof this.constructor)s(t,n);else if(c.isString(t)&&(t=t.trim())&&!Nr(t))s(qr(t),n);else if(c.isObject(t)&&c.isIterable(t)){let i={},m,l;for(const d of t){if(!c.isArray(d))throw TypeError("Object iterator must return a key-value pair");i[l=d[0]]=(m=i[l])?c.isArray(m)?[...m,d[1]]:[m,d[1]]:d[1]}s(i,n)}else t!=null&&o(n,t,a);return this}get(t,n){if(t=Se(t),t){const a=c.findKey(this,t);if(a){const r=this[a];if(!n)return r;if(n===!0)return jr(r);if(c.isFunction(n))return n.call(this,r,a);if(c.isRegExp(n))return n.exec(r);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=Se(t),t){const a=c.findKey(this,t);return!!(a&&this[a]!==void 0&&(!n||Et(this,this[a],a,n)))}return!1}delete(t,n){const a=this;let r=!1;function o(s){if(s=Se(s),s){const i=c.findKey(a,s);i&&(!n||Et(a,a[i],i,n))&&(delete a[i],r=!0)}}return c.isArray(t)?t.forEach(o):o(t),r}clear(t){const n=Object.keys(this);let a=n.length,r=!1;for(;a--;){const o=n[a];(!t||Et(this,this[o],o,t,!0))&&(delete this[o],r=!0)}return r}normalize(t){const n=this,a={};return c.forEach(this,(r,o)=>{const s=c.findKey(a,o);if(s){n[s]=Ke(r),delete n[o];return}const i=t?Ur(o):String(o).trim();i!==o&&delete n[o],n[i]=Ke(r),a[i]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return c.forEach(this,(a,r)=>{a!=null&&a!==!1&&(n[r]=t&&c.isArray(a)?a.join(", "):a)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const a=new this(t);return n.forEach(r=>a.set(r)),a}static accessor(t){const a=(this[on]=this[on]={accessors:{}}).accessors,r=this.prototype;function o(s){const i=Se(s);a[i]||(Hr(r,s),a[i]=!0)}return c.isArray(t)?t.forEach(o):o(t),this}};W.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);c.reduceDescriptors(W.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(a){this[n]=a}}});c.freezeMethods(W);function wt(e,t){const n=this||qe,a=t||n,r=W.from(a.headers);let o=a.data;return c.forEach(e,function(i){o=i.call(n,o,r.normalize(),t?t.status:void 0)}),r.normalize(),o}function ia(e){return!!(e&&e.__CANCEL__)}let je=class extends I{constructor(t,n,a){super(t??"canceled",I.ERR_CANCELED,n,a),this.name="CanceledError",this.__CANCEL__=!0}};function la(e,t,n){const a=n.config.validateStatus;!n.status||!a||a(n.status)?e(n):t(new I("Request failed with status code "+n.status,[I.ERR_BAD_REQUEST,I.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}function Fr(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function Vr(e,t){e=e||10;const n=new Array(e),a=new Array(e);let r=0,o=0,s;return t=t!==void 0?t:1e3,function(m){const l=Date.now(),d=a[o];s||(s=l),n[r]=m,a[r]=l;let u=o,f=0;for(;u!==r;)f+=n[u++],u=u%e;if(r=(r+1)%e,r===o&&(o=(o+1)%e),l-s<t)return;const y=d&&l-d;return y?Math.round(f*1e3/y):void 0}}function Gr(e,t){let n=0,a=1e3/t,r,o;const s=(l,d=Date.now())=>{n=d,r=null,o&&(clearTimeout(o),o=null),e(...l)};return[(...l)=>{const d=Date.now(),u=d-n;u>=a?s(l,d):(r=l,o||(o=setTimeout(()=>{o=null,s(r)},a-u)))},()=>r&&s(r)]}const Xe=(e,t,n=3)=>{let a=0;const r=Vr(50,250);return Gr(o=>{const s=o.loaded,i=o.lengthComputable?o.total:void 0,m=s-a,l=r(m),d=s<=i;a=s;const u={loaded:s,total:i,progress:i?s/i:void 0,bytes:m,rate:l||void 0,estimated:l&&i&&d?(i-s)/l:void 0,event:o,lengthComputable:i!=null,[t?"download":"upload"]:!0};e(u)},n)},sn=(e,t)=>{const n=e!=null;return[a=>t[0]({lengthComputable:n,total:e,loaded:a}),t[1]]},ln=e=>(...t)=>c.asap(()=>e(...t)),Jr=V.hasStandardBrowserEnv?((e,t)=>n=>(n=new URL(n,V.origin),e.protocol===n.protocol&&e.host===n.host&&(t||e.port===n.port)))(new URL(V.origin),V.navigator&&/(msie|trident)/i.test(V.navigator.userAgent)):()=>!0,Kr=V.hasStandardBrowserEnv?{write(e,t,n,a,r,o,s){if(typeof document>"u")return;const i=[`${e}=${encodeURIComponent(t)}`];c.isNumber(n)&&i.push(`expires=${new Date(n).toUTCString()}`),c.isString(a)&&i.push(`path=${a}`),c.isString(r)&&i.push(`domain=${r}`),o===!0&&i.push("secure"),c.isString(s)&&i.push(`SameSite=${s}`),document.cookie=i.join("; ")},read(e){if(typeof document>"u")return null;const t=document.cookie.match(new RegExp("(?:^|; )"+e+"=([^;]*)"));return t?decodeURIComponent(t[1]):null},remove(e){this.write(e,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function Wr(e){return typeof e!="string"?!1:/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function zr(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function da(e,t,n){let a=!Wr(t);return e&&(a||n==!1)?zr(e,t):t}const dn=e=>e instanceof W?{...e}:e;function ce(e,t){t=t||{};const n={};function a(l,d,u,f){return c.isPlainObject(l)&&c.isPlainObject(d)?c.merge.call({caseless:f},l,d):c.isPlainObject(d)?c.merge({},d):c.isArray(d)?d.slice():d}function r(l,d,u,f){if(c.isUndefined(d)){if(!c.isUndefined(l))return a(void 0,l,u,f)}else return a(l,d,u,f)}function o(l,d){if(!c.isUndefined(d))return a(void 0,d)}function s(l,d){if(c.isUndefined(d)){if(!c.isUndefined(l))return a(void 0,l)}else return a(void 0,d)}function i(l,d,u){if(u in t)return a(l,d);if(u in e)return a(void 0,l)}const m={url:o,method:o,data:o,baseURL:s,transformRequest:s,transformResponse:s,paramsSerializer:s,timeout:s,timeoutMessage:s,withCredentials:s,withXSRFToken:s,adapter:s,responseType:s,xsrfCookieName:s,xsrfHeaderName:s,onUploadProgress:s,onDownloadProgress:s,decompress:s,maxContentLength:s,maxBodyLength:s,beforeRedirect:s,transport:s,httpAgent:s,httpsAgent:s,cancelToken:s,socketPath:s,responseEncoding:s,validateStatus:i,headers:(l,d,u)=>r(dn(l),dn(d),u,!0)};return c.forEach(Object.keys({...e,...t}),function(d){if(d==="__proto__"||d==="constructor"||d==="prototype")return;const u=c.hasOwnProp(m,d)?m[d]:r,f=u(e[d],t[d],d);c.isUndefined(f)&&u!==i||(n[d]=f)}),n}const ca=e=>{const t=ce({},e);let{data:n,withXSRFToken:a,xsrfHeaderName:r,xsrfCookieName:o,headers:s,auth:i}=t;if(t.headers=s=W.from(s),t.url=oa(da(t.baseURL,t.url,t.allowAbsoluteUrls),e.params,e.paramsSerializer),i&&s.set("Authorization","Basic "+btoa((i.username||"")+":"+(i.password?unescape(encodeURIComponent(i.password)):""))),c.isFormData(n)){if(V.hasStandardBrowserEnv||V.hasStandardBrowserWebWorkerEnv)s.setContentType(void 0);else if(c.isFunction(n.getHeaders)){const m=n.getHeaders(),l=["content-type","content-length"];Object.entries(m).forEach(([d,u])=>{l.includes(d.toLowerCase())&&s.set(d,u)})}}if(V.hasStandardBrowserEnv&&(a&&c.isFunction(a)&&(a=a(t)),a||a!==!1&&Jr(t.url))){const m=r&&o&&Kr.read(o);m&&s.set(r,m)}return t},Xr=typeof XMLHttpRequest<"u",Zr=Xr&&function(e){return new Promise(function(n,a){const r=ca(e);let o=r.data;const s=W.from(r.headers).normalize();let{responseType:i,onUploadProgress:m,onDownloadProgress:l}=r,d,u,f,y,p;function b(){y&&y(),p&&p(),r.cancelToken&&r.cancelToken.unsubscribe(d),r.signal&&r.signal.removeEventListener("abort",d)}let h=new XMLHttpRequest;h.open(r.method.toUpperCase(),r.url,!0),h.timeout=r.timeout;function L(){if(!h)return;const T=W.from("getAllResponseHeaders"in h&&h.getAllResponseHeaders()),O={data:!i||i==="text"||i==="json"?h.responseText:h.response,status:h.status,statusText:h.statusText,headers:T,config:e,request:h};la(function(U){n(U),b()},function(U){a(U),b()},O),h=null}"onloadend"in h?h.onloadend=L:h.onreadystatechange=function(){!h||h.readyState!==4||h.status===0&&!(h.responseURL&&h.responseURL.indexOf("file:")===0)||setTimeout(L)},h.onabort=function(){h&&(a(new I("Request aborted",I.ECONNABORTED,e,h)),h=null)},h.onerror=function(M){const O=M&&M.message?M.message:"Network Error",H=new I(O,I.ERR_NETWORK,e,h);H.event=M||null,a(H),h=null},h.ontimeout=function(){let M=r.timeout?"timeout of "+r.timeout+"ms exceeded":"timeout exceeded";const O=r.transitional||qt;r.timeoutErrorMessage&&(M=r.timeoutErrorMessage),a(new I(M,O.clarifyTimeoutError?I.ETIMEDOUT:I.ECONNABORTED,e,h)),h=null},o===void 0&&s.setContentType(null),"setRequestHeader"in h&&c.forEach(s.toJSON(),function(M,O){h.setRequestHeader(O,M)}),c.isUndefined(r.withCredentials)||(h.withCredentials=!!r.withCredentials),i&&i!=="json"&&(h.responseType=r.responseType),l&&([f,p]=Xe(l,!0),h.addEventListener("progress",f)),m&&h.upload&&([u,y]=Xe(m),h.upload.addEventListener("progress",u),h.upload.addEventListener("loadend",y)),(r.cancelToken||r.signal)&&(d=T=>{h&&(a(!T||T.type?new je(null,e,h):T),h.abort(),h=null)},r.cancelToken&&r.cancelToken.subscribe(d),r.signal&&(r.signal.aborted?d():r.signal.addEventListener("abort",d)));const R=Fr(r.url);if(R&&V.protocols.indexOf(R)===-1){a(new I("Unsupported protocol "+R+":",I.ERR_BAD_REQUEST,e));return}h.send(o||null)})},Qr=(e,t)=>{const{length:n}=e=e?e.filter(Boolean):[];if(t||n){let a=new AbortController,r;const o=function(l){if(!r){r=!0,i();const d=l instanceof Error?l:this.reason;a.abort(d instanceof I?d:new je(d instanceof Error?d.message:d))}};let s=t&&setTimeout(()=>{s=null,o(new I(`timeout of ${t}ms exceeded`,I.ETIMEDOUT))},t);const i=()=>{e&&(s&&clearTimeout(s),s=null,e.forEach(l=>{l.unsubscribe?l.unsubscribe(o):l.removeEventListener("abort",o)}),e=null)};e.forEach(l=>l.addEventListener("abort",o));const{signal:m}=a;return m.unsubscribe=()=>c.asap(i),m}},Yr=function*(e,t){let n=e.byteLength;if(n<t){yield e;return}let a=0,r;for(;a<n;)r=a+t,yield e.slice(a,r),a=r},eo=async function*(e,t){for await(const n of to(e))yield*Yr(n,t)},to=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:n,value:a}=await t.read();if(n)break;yield a}}finally{await t.cancel()}},cn=(e,t,n,a)=>{const r=eo(e,t);let o=0,s,i=m=>{s||(s=!0,a&&a(m))};return new ReadableStream({async pull(m){try{const{done:l,value:d}=await r.next();if(l){i(),m.close();return}let u=d.byteLength;if(n){let f=o+=u;n(f)}m.enqueue(new Uint8Array(d))}catch(l){throw i(l),l}},cancel(m){return i(m),r.return()}},{highWaterMark:2})},un=64*1024,{isFunction:Ge}=c,no=(({Request:e,Response:t})=>({Request:e,Response:t}))(c.global),{ReadableStream:mn,TextEncoder:pn}=c.global,gn=(e,...t)=>{try{return!!e(...t)}catch{return!1}},ao=e=>{e=c.merge.call({skipUndefined:!0},no,e);const{fetch:t,Request:n,Response:a}=e,r=t?Ge(t):typeof fetch=="function",o=Ge(n),s=Ge(a);if(!r)return!1;const i=r&&Ge(mn),m=r&&(typeof pn=="function"?(p=>b=>p.encode(b))(new pn):async p=>new Uint8Array(await new n(p).arrayBuffer())),l=o&&i&&gn(()=>{let p=!1;const b=new n(V.origin,{body:new mn,method:"POST",get duplex(){return p=!0,"half"}}).headers.has("Content-Type");return p&&!b}),d=s&&i&&gn(()=>c.isReadableStream(new a("").body)),u={stream:d&&(p=>p.body)};r&&["text","arrayBuffer","blob","formData","stream"].forEach(p=>{!u[p]&&(u[p]=(b,h)=>{let L=b&&b[p];if(L)return L.call(b);throw new I(`Response type '${p}' is not supported`,I.ERR_NOT_SUPPORT,h)})});const f=async p=>{if(p==null)return 0;if(c.isBlob(p))return p.size;if(c.isSpecCompliantForm(p))return(await new n(V.origin,{method:"POST",body:p}).arrayBuffer()).byteLength;if(c.isArrayBufferView(p)||c.isArrayBuffer(p))return p.byteLength;if(c.isURLSearchParams(p)&&(p=p+""),c.isString(p))return(await m(p)).byteLength},y=async(p,b)=>{const h=c.toFiniteNumber(p.getContentLength());return h??f(b)};return async p=>{let{url:b,method:h,data:L,signal:R,cancelToken:T,timeout:M,onDownloadProgress:O,onUploadProgress:H,responseType:U,headers:Q,withCredentials:z="same-origin",fetchOptions:Fe}=ca(p),ne=t||fetch;U=U?(U+"").toLowerCase():"text";let _=Qr([R,T&&T.toAbortSignal()],M),j=null;const G=_&&_.unsubscribe&&(()=>{_.unsubscribe()});let ue;try{if(H&&l&&h!=="get"&&h!=="head"&&(ue=await y(Q,L))!==0){let ae=new n(b,{method:"POST",body:L,duplex:"half"}),me;if(c.isFormData(L)&&(me=ae.headers.get("content-type"))&&Q.setContentType(me),ae.body){const[yt,Ve]=sn(ue,Xe(ln(H)));L=cn(ae.body,un,yt,Ve)}}c.isString(z)||(z=z?"include":"omit");const F=o&&"credentials"in n.prototype,Y={...Fe,signal:_,method:h.toUpperCase(),headers:Q.normalize().toJSON(),body:L,duplex:"half",credentials:F?z:void 0};j=o&&new n(b,Y);let X=await(o?ne(j,Fe):ne(b,Y));const oe=d&&(U==="stream"||U==="response");if(d&&(O||oe&&G)){const ae={};["status","statusText","headers"].forEach(Yt=>{ae[Yt]=X[Yt]});const me=c.toFiniteNumber(X.headers.get("content-length")),[yt,Ve]=O&&sn(me,Xe(ln(O),!0))||[];X=new a(cn(X.body,un,yt,()=>{Ve&&Ve(),G&&G()}),ae)}U=U||"text";let kt=await u[c.findKey(u,U)||"text"](X,p);return!oe&&G&&G(),await new Promise((ae,me)=>{la(ae,me,{data:kt,headers:W.from(X.headers),status:X.status,statusText:X.statusText,config:p,request:j})})}catch(F){throw G&&G(),F&&F.name==="TypeError"&&/Load failed|fetch/i.test(F.message)?Object.assign(new I("Network Error",I.ERR_NETWORK,p,j,F&&F.response),{cause:F.cause||F}):I.from(F,F&&F.code,p,j,F&&F.response)}}},ro=new Map,ua=e=>{let t=e&&e.env||{};const{fetch:n,Request:a,Response:r}=t,o=[a,r,n];let s=o.length,i=s,m,l,d=ro;for(;i--;)m=o[i],l=d.get(m),l===void 0&&d.set(m,l=i?new Map:ao(t)),d=l;return l};ua();const Nt={http:Er,xhr:Zr,fetch:{get:ua}};c.forEach(Nt,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const fn=e=>`- ${e}`,oo=e=>c.isFunction(e)||e===null||e===!1;function so(e,t){e=c.isArray(e)?e:[e];const{length:n}=e;let a,r;const o={};for(let s=0;s<n;s++){a=e[s];let i;if(r=a,!oo(a)&&(r=Nt[(i=String(a)).toLowerCase()],r===void 0))throw new I(`Unknown adapter '${i}'`);if(r&&(c.isFunction(r)||(r=r.get(t))))break;o[i||"#"+s]=r}if(!r){const s=Object.entries(o).map(([m,l])=>`adapter ${m} `+(l===!1?"is not supported by the environment":"is not available in the build"));let i=n?s.length>1?`since :
`+s.map(fn).join(`
`):" "+fn(s[0]):"as no adapter specified";throw new I("There is no suitable adapter to dispatch the request "+i,"ERR_NOT_SUPPORT")}return r}const ma={getAdapter:so,adapters:Nt};function Bt(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new je(null,e)}function bn(e){return Bt(e),e.headers=W.from(e.headers),e.data=wt.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),ma.getAdapter(e.adapter||qe.adapter,e)(e).then(function(a){return Bt(e),a.data=wt.call(e,e.transformResponse,a),a.headers=W.from(a.headers),a},function(a){return ia(a)||(Bt(e),a&&a.response&&(a.response.data=wt.call(e,e.transformResponse,a.response),a.response.headers=W.from(a.response.headers))),Promise.reject(a)})}const pa="1.13.6",ft={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{ft[e]=function(a){return typeof a===e||"a"+(t<1?"n ":" ")+e}});const hn={};ft.transitional=function(t,n,a){function r(o,s){return"[Axios v"+pa+"] Transitional option '"+o+"'"+s+(a?". "+a:"")}return(o,s,i)=>{if(t===!1)throw new I(r(s," has been removed"+(n?" in "+n:"")),I.ERR_DEPRECATED);return n&&!hn[s]&&(hn[s]=!0,console.warn(r(s," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(o,s,i):!0}};ft.spelling=function(t){return(n,a)=>(console.warn(`${a} is likely a misspelling of ${t}`),!0)};function io(e,t,n){if(typeof e!="object")throw new I("options must be an object",I.ERR_BAD_OPTION_VALUE);const a=Object.keys(e);let r=a.length;for(;r-- >0;){const o=a[r],s=t[o];if(s){const i=e[o],m=i===void 0||s(i,o,e);if(m!==!0)throw new I("option "+o+" must be "+m,I.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new I("Unknown option "+o,I.ERR_BAD_OPTION)}}const We={assertOptions:io,validators:ft},Z=We.validators;let de=class{constructor(t){this.defaults=t||{},this.interceptors={request:new rn,response:new rn}}async request(t,n){try{return await this._request(t,n)}catch(a){if(a instanceof Error){let r={};Error.captureStackTrace?Error.captureStackTrace(r):r=new Error;const o=r.stack?r.stack.replace(/^.+\n/,""):"";try{a.stack?o&&!String(a.stack).endsWith(o.replace(/^.+\n.+\n/,""))&&(a.stack+=`
`+o):a.stack=o}catch{}}throw a}}_request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=ce(this.defaults,n);const{transitional:a,paramsSerializer:r,headers:o}=n;a!==void 0&&We.assertOptions(a,{silentJSONParsing:Z.transitional(Z.boolean),forcedJSONParsing:Z.transitional(Z.boolean),clarifyTimeoutError:Z.transitional(Z.boolean),legacyInterceptorReqResOrdering:Z.transitional(Z.boolean)},!1),r!=null&&(c.isFunction(r)?n.paramsSerializer={serialize:r}:We.assertOptions(r,{encode:Z.function,serialize:Z.function},!0)),n.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?n.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:n.allowAbsoluteUrls=!0),We.assertOptions(n,{baseUrl:Z.spelling("baseURL"),withXsrfToken:Z.spelling("withXSRFToken")},!0),n.method=(n.method||this.defaults.method||"get").toLowerCase();let s=o&&c.merge(o.common,o[n.method]);o&&c.forEach(["delete","get","head","post","put","patch","common"],p=>{delete o[p]}),n.headers=W.concat(s,o);const i=[];let m=!0;this.interceptors.request.forEach(function(b){if(typeof b.runWhen=="function"&&b.runWhen(n)===!1)return;m=m&&b.synchronous;const h=n.transitional||qt;h&&h.legacyInterceptorReqResOrdering?i.unshift(b.fulfilled,b.rejected):i.push(b.fulfilled,b.rejected)});const l=[];this.interceptors.response.forEach(function(b){l.push(b.fulfilled,b.rejected)});let d,u=0,f;if(!m){const p=[bn.bind(this),void 0];for(p.unshift(...i),p.push(...l),f=p.length,d=Promise.resolve(n);u<f;)d=d.then(p[u++],p[u++]);return d}f=i.length;let y=n;for(;u<f;){const p=i[u++],b=i[u++];try{y=p(y)}catch(h){b.call(this,h);break}}try{d=bn.call(this,y)}catch(p){return Promise.reject(p)}for(u=0,f=l.length;u<f;)d=d.then(l[u++],l[u++]);return d}getUri(t){t=ce(this.defaults,t);const n=da(t.baseURL,t.url,t.allowAbsoluteUrls);return oa(n,t.params,t.paramsSerializer)}};c.forEach(["delete","get","head","options"],function(t){de.prototype[t]=function(n,a){return this.request(ce(a||{},{method:t,url:n,data:(a||{}).data}))}});c.forEach(["post","put","patch"],function(t){function n(a){return function(o,s,i){return this.request(ce(i||{},{method:t,headers:a?{"Content-Type":"multipart/form-data"}:{},url:o,data:s}))}}de.prototype[t]=n(),de.prototype[t+"Form"]=n(!0)});let lo=class ga{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(o){n=o});const a=this;this.promise.then(r=>{if(!a._listeners)return;let o=a._listeners.length;for(;o-- >0;)a._listeners[o](r);a._listeners=null}),this.promise.then=r=>{let o;const s=new Promise(i=>{a.subscribe(i),o=i}).then(r);return s.cancel=function(){a.unsubscribe(o)},s},t(function(o,s,i){a.reason||(a.reason=new je(o,s,i),n(a.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}toAbortSignal(){const t=new AbortController,n=a=>{t.abort(a)};return this.subscribe(n),t.signal.unsubscribe=()=>this.unsubscribe(n),t.signal}static source(){let t;return{token:new ga(function(r){t=r}),cancel:t}}};function co(e){return function(n){return e.apply(null,n)}}function uo(e){return c.isObject(e)&&e.isAxiosError===!0}const Lt={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(Lt).forEach(([e,t])=>{Lt[t]=e});function fa(e){const t=new de(e),n=Wn(de.prototype.request,t);return c.extend(n,de.prototype,t,{allOwnKeys:!0}),c.extend(n,t,null,{allOwnKeys:!0}),n.create=function(r){return fa(ce(e,r))},n}const N=fa(qe);N.Axios=de;N.CanceledError=je;N.CancelToken=lo;N.isCancel=ia;N.VERSION=pa;N.toFormData=gt;N.AxiosError=I;N.Cancel=N.CanceledError;N.all=function(t){return Promise.all(t)};N.spread=co;N.isAxiosError=uo;N.mergeConfig=ce;N.AxiosHeaders=W;N.formToJSON=e=>sa(c.isHTMLForm(e)?new FormData(e):e);N.getAdapter=ma.getAdapter;N.HttpStatusCode=Lt;N.default=N;const{Axios:Ii,AxiosError:Si,CanceledError:Ci,isCancel:$i,CancelToken:xi,VERSION:_i,all:Ti,Cancel:Li,isAxiosError:Ai,spread:Ri,toFormData:Mi,AxiosHeaders:Pi,HttpStatusCode:Di,formToJSON:Oi,getAdapter:qi,mergeConfig:ji}=N;window.axios=N;window.axios.defaults.headers.common["X-Requested-With"]="XMLHttpRequest";const Ut="transit_user",re="transit_token",At="transit_pending_toast";function Ie(){try{return typeof window<"u"&&typeof window.localStorage<"u"}catch{return!1}}function ba(){try{return typeof window<"u"&&typeof window.sessionStorage<"u"}catch{return!1}}function mo(){if(window.transitAuthUser)return window.transitAuthUser;if(!Ie())return null;const e=window.localStorage.getItem(Ut);if(!e)return null;try{return JSON.parse(e)}catch{return Le(),null}}function ha(e){if(!Ie()){window.transitAuthUser=e;return}window.transitAuthUser=e,window.localStorage.setItem(Ut,JSON.stringify(e))}function po(){if(!Ie()){window.transitAuthUser=null;return}window.transitAuthUser=null,window.localStorage.removeItem(Ut)}function Ht(){return typeof window<"u"&&typeof window.transitAuthToken=="string"&&window.transitAuthToken!==""?window.transitAuthToken:Ie()?window.localStorage.getItem(re):null}function go(e){const t=typeof e=="string"?e:"";if(!Ie()){window.transitAuthToken=t||null;return}if(window.transitAuthToken=t||null,t===""){window.localStorage.removeItem(re),document.cookie=re+"=; path=/; max-age=0; samesite=lax";return}window.localStorage.setItem(re,t),document.cookie=re+"="+t+"; path=/; max-age=86400; samesite=lax"}function fo(){if(!Ie()){window.transitAuthToken=null,document.cookie=re+"=; path=/; max-age=0; samesite=lax";return}window.transitAuthToken=null,window.localStorage.removeItem(re),document.cookie=re+"=; path=/; max-age=0; samesite=lax"}function bo(e){ba()&&window.sessionStorage.setItem(At,JSON.stringify(e))}function ho(){if(!ba())return null;const e=window.sessionStorage.getItem(At);if(!e)return null;window.sessionStorage.removeItem(At);try{return JSON.parse(e)}catch{return null}}function Le(){po(),fo()}function ka(e,t){if(!e)return t;if(typeof e.detail=="string"&&e.detail!=="")return e.detail;if(typeof e.message=="string"&&e.message!=="")return e.message;if(e.errors&&typeof e.errors=="object"){const n=Object.values(e.errors).flat()[0];if(typeof n=="string"&&n!=="")return n}return t}function kn(){return document.body.dataset.apiBase||"/api"}function ya(e=""){const t=String(e).replace(/^\/+/,"");return t===""?kn():`${kn()}/${t}`}async function B(e,t={}){const{method:n="GET",body:a=null,headers:r={},auth:o=!0}=t,s=new Headers(r);s.set("Accept","application/json"),s.set("X-Requested-With","XMLHttpRequest");let i=a;if(a&&!(a instanceof FormData)&&!(a instanceof Blob)&&(s.set("Content-Type","application/json"),i=JSON.stringify(a)),o){const u=Ht();u&&s.set("Authorization",`Bearer ${u}`)}if(!["GET","HEAD","OPTIONS"].includes(n.toUpperCase())){const u=document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");u&&s.set("X-CSRF-TOKEN",u)}const m=await fetch(ya(e),{method:n,headers:s,body:i,credentials:"same-origin"});let l=null;const d=m.headers.get("content-type")||"";if(m.status!==204&&(l=d.includes("application/json")?await m.json():await m.text()),!m.ok){m.status===401&&(Le(),(document.body.dataset.routeGuard||"none")==="protected"&&window.location.replace(document.body.dataset.loginUrl||"/login"));const u=ka(l,`Request gagal (${m.status})`),f=new Error(u);throw f.status=m.status,f.data=l,f}return l}async function Ft(e,t="export.csv"){const n=new Headers({Accept:"text/csv,application/octet-stream","X-Requested-With":"XMLHttpRequest"}),a=Ht();a&&n.set("Authorization",`Bearer ${a}`);const r=await fetch(ya(e),{method:"GET",headers:n,credentials:"same-origin"});if(!r.ok){let u=null;throw(r.headers.get("content-type")||"").includes("application/json")&&(u=await r.json()),new Error(ka(u,"Gagal mengunduh file"))}const o=await r.blob(),m=(r.headers.get("content-disposition")||"").match(/filename="?([^"]+)"?/i)?.[1]||t,l=window.URL.createObjectURL(o),d=document.createElement("a");d.href=l,d.download=m,document.body.appendChild(d),d.click(),d.remove(),window.URL.revokeObjectURL(l)}function Ce(e,t){const n=document.getElementById(e);n&&(n.textContent=t)}function ko(e){const t=e?.role||"";document.querySelectorAll("[data-role-scope]").forEach(n=>{const a=n.dataset.roleScope,r=a==="admin"?["Super Admin","Admin"].includes(t):a==="super"?t==="Super Admin":!0;n.hidden=!r})}function va(){return mo()}function Ze(e){if(ko(e),!e)return;const t=e.nama||"Admin",n=t.trim().split(/\s+/)[0]||"Admin",a=e.email||"admin@pekanbaru.com";Ce("sidebar-user-name",t),Ce("sidebar-user-email",a),Ce("header-user-name",n),Ce("dropdown-user-name",t),Ce("dropdown-user-email",a)}function Ea(e){return typeof e.access_token=="string"&&e.access_token!==""&&go(e.access_token),ha(e.user),Ze(e.user),e}async function yo(e){const t=await B("/auth/login",{method:"POST",body:e,auth:!1});return Ea(t)}async function vo(e){const t=await B("/auth/register",{method:"POST",body:e,auth:!1});return Ea(t)}async function yn(){const e=await B("/auth/me");return ha(e),Ze(e),e}async function Eo(){try{await B("/auth/logout",{method:"POST"})}catch(e){if(e?.status!==401)throw e}Le(),bo({type:"success",title:"Logout berhasil",message:"Sampai jumpa kembali!"}),window.location.replace(document.body.dataset.loginUrl||"/login")}function vn(e){window.location.replace(e)}async function wo(){const e=document.body.dataset.routeGuard||"none",t=document.body.dataset.loginUrl||"/login",n=document.body.dataset.dashboardUrl||"/dashboard",a=va();if(e==="public"){try{const r=await yn();return vn(n),{user:r}}catch{(a||Ht())&&Le()}return{user:null}}if(e==="protected")try{return{user:await yn()}}catch{return Le(),vn(t),{user:null}}return{user:a}}function Vt(){return Array.from(document.querySelectorAll(".modal-shell")).filter(e=>!e.hidden)}function wa(){document.body.style.overflow=Vt().length>0?"hidden":""}function q(e){const t=document.getElementById(e);t&&(t.hidden=!1,wa())}function J(e=null){if(e){const t=document.getElementById(e);t&&(t.hidden=!0)}else Vt().forEach(t=>{t.hidden=!0});wa()}function Bo(){document.addEventListener("click",e=>{const t=e.target.closest("[data-modal-open]");if(t){q(t.dataset.modalOpen);return}const n=e.target.closest("[data-modal-close]");if(n){const a=n.dataset.modalClose||n.closest(".modal-shell")?.id;J(a||void 0)}}),document.addEventListener("keydown",e=>{if(e.key!=="Escape")return;const t=Vt().pop();t&&J(t.id)})}function Gt(e,t,n){const a=document.getElementById("transit-toast-root");if(!a)return;const r=document.createElement("div");r.className=`transit-toast ${n==="error"?"is-error":""} ${n==="info"?"is-info":""}`.trim(),r.innerHTML=`
        <div>
            <strong>${e}</strong>
            <p>${t}</p>
        </div>
    `,a.appendChild(r),window.requestAnimationFrame(()=>{r.classList.add("is-visible")}),window.setTimeout(()=>{r.classList.remove("is-visible"),window.setTimeout(()=>r.remove(),180)},3600)}function D(e,t="Berhasil"){Gt(t,e,"success")}function v(e,t="Gagal"){Gt(t,e,"error")}function Io(e,t="Info"){Gt(t,e,"info")}function $e(e){const t=document.querySelector("[data-sidebar]"),n=document.querySelector("[data-sidebar-overlay]");!t||!n||(t.classList.toggle("is-open",e),n.hidden=!e)}function ze(e=null){document.querySelectorAll("[data-user-dropdown]").forEach(t=>{if(e&&t===e)return;t.classList.remove("is-open");const n=t.querySelector("[data-user-menu-trigger]"),a=t.querySelector("[data-user-menu-panel]");n&&n.setAttribute("aria-expanded","false"),a&&(a.hidden=!0)})}function So(e,t=null){if(!e)return;const n=e.querySelector("[data-user-menu-trigger]"),a=e.querySelector("[data-user-menu-panel]"),r=t??!e.classList.contains("is-open");ze(r?e:null),e.classList.toggle("is-open",r),n&&n.setAttribute("aria-expanded",r?"true":"false"),a&&(a.hidden=!r)}function Co(){document.querySelector("[data-sidebar-open]")?.addEventListener("click",()=>{$e(!0)}),document.querySelector("[data-sidebar-close]")?.addEventListener("click",()=>{$e(!1)}),document.querySelector("[data-sidebar-overlay]")?.addEventListener("click",()=>{$e(!1)}),document.querySelectorAll("[data-user-dropdown]").forEach(e=>{e.querySelector("[data-user-menu-trigger]")?.addEventListener("click",t=>{t.stopPropagation(),So(e)})}),document.addEventListener("click",e=>{e.target.closest("[data-user-dropdown]")||ze()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&(ze(),$e(!1))}),window.addEventListener("resize",()=>{window.innerWidth>1100&&$e(!1)}),document.querySelectorAll("[data-auth-logout]").forEach(e=>{e.addEventListener("click",async()=>{J(),ze();try{e.disabled=!0,await Eo()}catch(t){e.disabled=!1,v(t.message||"Gagal logout")}})})}const Ba={login:{title:"Selamat Datang!",description:"Masuk ke akun Anda untuk melanjutkan",submit:"Masuk",switchText:"Belum punya akun?",switchAction:"Daftar sekarang"},register:{title:"Buat Akun Baru",description:"Daftar untuk mulai menggunakan sistem",submit:"Daftar",switchText:"Sudah punya akun?",switchAction:"Masuk"}};function En(e,t){const n=Ba[e];t.form.dataset.authMode=e,t.title.textContent=n.title,t.description.textContent=n.description,t.submitText.textContent=n.submit,t.switchText&&(t.switchText.textContent=n.switchText),t.switchButton&&(t.switchButton.textContent=n.switchAction),t.nameField.hidden=e!=="register",t.nameInput.required=e==="register"}function $o(){const e=document.getElementById("auth-form");if(!e)return;const t={form:e,title:document.querySelector("[data-auth-title]"),description:document.querySelector("[data-auth-description]"),submitText:document.querySelector("[data-auth-submit-text]"),switchText:document.querySelector("[data-auth-switch-text]"),switchButton:document.querySelector("[data-toggle-auth-mode]"),nameField:document.getElementById("auth-name-field"),nameInput:document.getElementById("nama"),emailInput:document.getElementById("email"),passwordInput:document.getElementById("password"),passwordToggle:document.querySelector("[data-toggle-password]"),submitButton:document.getElementById("auth-submit-button")},n=document.body.dataset.dashboardUrl||"/dashboard";En("login",t),t.switchButton?.addEventListener("click",()=>{const a=t.form.dataset.authMode==="login"?"register":"login";En(a,t)}),t.passwordToggle?.addEventListener("click",()=>{const a=t.passwordInput.type==="password"?"text":"password";t.passwordInput.type=a,t.passwordToggle.textContent=a==="password"?"Lihat":"Sembunyikan"}),e.addEventListener("submit",async a=>{a.preventDefault();const r=new FormData(e),o=e.dataset.authMode||"login",s={email:String(r.get("email")||"").trim(),password:String(r.get("password")||"").trim()};o==="register"&&(s.nama=String(r.get("nama")||"").trim()),t.submitButton.disabled=!0,t.submitText.textContent=o==="login"?"Memproses...":"Mendaftarkan...";try{o==="login"?(await yo(s),D("Selamat datang kembali","Login berhasil!")):(await vo(s),D("Akun Anda telah dibuat","Registrasi berhasil!")),window.location.replace(n)}catch(i){v(i.message||"Terjadi kesalahan",o==="login"?"Login gagal":"Registrasi gagal")}finally{t.submitButton.disabled=!1,t.submitText.textContent=Ba[o].submit}})}const xo=new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}),_o=new Intl.NumberFormat("id-ID");function P(e){return xo.format(Number(e)||0)}function A(e){return _o.format(Number(e)||0)}function g(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ne(e,t=300){let n=null;return(...a)=>{window.clearTimeout(n),n=window.setTimeout(()=>e(...a),t)}}function Ue(e,t,n,a){if(n===0||a===0)return"Menampilkan 0 - 0 dari 0 data";const r=(e-1)*t+1,o=r+a-1;return`Menampilkan ${r} - ${o} dari ${n} data`}function To(e){if(!e)return"-";const t=new Date(e);return Number.isNaN(t.getTime())?e:new Intl.DateTimeFormat("id-ID",{day:"2-digit",month:"short",year:"numeric"}).format(t)}function He(){return new Date().toISOString().slice(0,10)}function le(e,t,n="Memproses..."){e&&(e.dataset.defaultText||(e.dataset.defaultText=e.textContent.trim()),e.disabled=t,e.textContent=t?n:e.dataset.defaultText)}const Qe=["#059669","#10B981","#34D399","#6EE7B7","#A7F3D0"],te={revenueChart:null,passengerChart:null,mobilChart:null};function Lo(){const e=document.getElementById("dashboard-initial-state");if(!e)return{stats:{},revenueData:[],mobilRevenue:[]};try{return JSON.parse(e.textContent||"{}")}catch{return{stats:{},revenueData:[],mobilRevenue:[]}}}function Jt(e){e&&typeof e.destroy=="function"&&e.destroy()}function Ao(e,t){const n=document.querySelector(`[data-stat="${e}"]`);if(!n)return;const a=["total_uang_bersih","total_uang_pc"];n.textContent=a.includes(e)?P(t):A(t)}function Ia(e,t,n){const a=document.getElementById(e),r=document.getElementById(t);a&&(a.hidden=!n),r&&(r.hidden=n)}function Ro(){return"#065f46"}function Rt(){return"#d1fae5"}function Kt(){return{backgroundColor:"#ffffff",titleColor:"#064e3b",bodyColor:"#065f46",borderColor:"#d1fae5",borderWidth:1,padding:12,cornerRadius:12,displayColors:!0}}function Mo(e){const t=document.getElementById("dashboard-revenue-chart"),n=Array.isArray(e)&&e.length>0;if(Ia("dashboard-revenue-chart","dashboard-revenue-empty",n),Jt(te.revenueChart),!t||!window.Chart||!n){te.revenueChart=null;return}te.revenueChart=new window.Chart(t,{type:"line",data:{labels:e.map(a=>a.bulan),datasets:[{label:"Pendapatan Bersih",data:e.map(a=>a.uang_bersih),borderColor:"#059669",backgroundColor:"rgba(5, 150, 105, 0.08)",fill:!1,tension:.35,pointRadius:4,pointHoverRadius:5,pointBackgroundColor:"#059669",pointBorderColor:"#ffffff",pointBorderWidth:2,borderWidth:3},{label:"Uang PC",data:e.map(a=>a.uang_pc),borderColor:"#f59e0b",backgroundColor:"rgba(245, 158, 11, 0.1)",fill:!1,tension:.35,pointRadius:4,pointHoverRadius:5,pointBackgroundColor:"#f59e0b",pointBorderColor:"#ffffff",pointBorderWidth:2,borderWidth:3}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{labels:{color:Ro(),usePointStyle:!0,pointStyle:"circle",boxWidth:8,boxHeight:8,padding:18}},tooltip:{...Kt(),callbacks:{label(a){return`${a.dataset.label}: ${P(a.parsed.y)}`}}}},scales:{x:{ticks:{color:"#047857",font:{size:12}},grid:{color:Rt()},border:{display:!1}},y:{ticks:{color:"#047857",font:{size:12},callback(a){return`${Math.round(Number(a)/1e6)}jt`}},grid:{color:Rt()},border:{display:!1}}}}})}function Po(e){const t=document.getElementById("dashboard-passenger-chart"),n=Array.isArray(e)&&e.length>0;if(Ia("dashboard-passenger-chart","dashboard-passenger-empty",n),Jt(te.passengerChart),!t||!window.Chart||!n){te.passengerChart=null;return}te.passengerChart=new window.Chart(t,{type:"bar",data:{labels:e.map(a=>a.bulan),datasets:[{label:"Penumpang",data:e.map(a=>a.penumpang),backgroundColor:"#10B981",borderRadius:8,maxBarThickness:44}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{...Kt(),callbacks:{label(a){return`Penumpang: ${A(a.parsed.y)}`}}}},scales:{x:{ticks:{color:"#047857",font:{size:12}},grid:{color:"rgba(0, 0, 0, 0)"},border:{display:!1}},y:{ticks:{color:"#047857",font:{size:12}},grid:{color:Rt()},border:{display:!1}}}}})}function Do(e){const t=document.getElementById("dashboard-mobil-list");t&&(t.innerHTML=e.map((n,a)=>`
        <div class="dashboard-mobil-item">
            <div class="dashboard-mobil-meta">
                <span class="dashboard-mobil-dot" style="background-color: ${Qe[a%Qe.length]}"></span>
                <div>
                    <p class="dashboard-mobil-code">${g(n.kode_mobil)}</p>
                    <p class="dashboard-mobil-trips">${A(n.total_trips)} trip</p>
                    <p class="dashboard-mobil-passengers">${A(n.total_penumpang)} penumpang</p>
                </div>
            </div>
            <p class="dashboard-mobil-value">${P(n.total_uang_bersih)}</p>
        </div>
    `).join(""))}function Oo(e){const t=document.getElementById("dashboard-mobil-chart"),n=document.getElementById("dashboard-mobil-content"),a=document.getElementById("dashboard-mobil-empty"),r=document.getElementById("dashboard-mobil-chart-empty"),o=document.getElementById("dashboard-mobil-list"),s=Array.isArray(e)&&e.length>0,i=s&&e.some(m=>Number(m.total_uang_bersih)>0);if(Jt(te.mobilChart),n&&(n.hidden=!s),a&&(a.hidden=s),t&&(t.hidden=!i),r&&(r.hidden=i),s?Do(e):o&&(o.innerHTML=""),!t||!window.Chart||!i){te.mobilChart=null;return}te.mobilChart=new window.Chart(t,{type:"doughnut",data:{labels:e.map(m=>m.kode_mobil),datasets:[{data:e.map(m=>m.total_uang_bersih),backgroundColor:e.map((m,l)=>Qe[l%Qe.length]),borderColor:"#ffffff",borderWidth:6,hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"58%",plugins:{legend:{display:!1},tooltip:{...Kt(),callbacks:{label(m){const l=e[m.dataIndex]||{};return`${m.label}: ${P(m.parsed)} / ${A(l.total_penumpang||0)} penumpang`}}}}}})}function wn(e){Object.entries(e.stats||{}).forEach(([t,n])=>Ao(t,n)),Mo(e.revenueData||[]),Po(e.revenueData||[]),Oo(e.mobilRevenue||[])}async function qo(){const[e,t,n]=await Promise.all([B("/statistics/dashboard"),B("/statistics/revenue-chart"),B("/statistics/mobil-revenue")]);return{stats:e,revenueData:t,mobilRevenue:n}}function Bn(e){const t=document.querySelector("[data-dashboard-loading]"),n=document.querySelector("[data-dashboard-content]"),a=document.getElementById("dashboard-refresh-btn");t&&(t.hidden=!e),n&&(n.hidden=e),a&&(a.disabled=e)}async function jo(){const e=document.getElementById("dashboard-refresh-btn");e&&(wn(Lo()),e.addEventListener("click",async()=>{Bn(!0);try{wn(await qo())}catch{v("Silakan coba lagi","Gagal memuat data")}finally{Bn(!1)}}))}const x={data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1},Ee=10;function No(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function Uo(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 21C15 17.4 18 14.4 18 10.5C18 7.18629 15.3137 4.5 12 4.5C8.68629 4.5 6 7.18629 6 10.5C6 14.4 9 17.4 12 21Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
            <circle cx="12" cy="10.5" r="2.25" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function Ho(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Fo(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Ye(e){const t=document.getElementById("driver-submit-btn");x.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":x.editItem?"Perbarui":"Simpan")}function Vo(){const e=document.getElementById("drivers-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="drivers-table-state">
                <div class="drivers-loading-inline">
                    <span class="drivers-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function Go(){const e=document.getElementById("drivers-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="drivers-table-state drivers-empty-copy">
                Belum ada data driver
            </td>
        </tr>
    `)}function In(){const e=document.getElementById("drivers-table-body");if(e){if(x.loading){Vo();return}if(x.data.length===0){Go();return}e.innerHTML=x.data.map((t,n)=>`
        <tr class="drivers-row" data-testid="driver-row-${t.id}">
            <td class="drivers-index-cell">${(x.page-1)*Ee+n+1}</td>
            <td>
                <div class="drivers-user-cell">
                    <span class="drivers-user-avatar" aria-hidden="true">
                        ${No()}
                    </span>
                    <span class="drivers-user-name">${g(t.nama)}</span>
                </div>
            </td>
            <td>
                <div class="drivers-location-cell">
                    <span class="drivers-location-icon" aria-hidden="true">${Uo()}</span>
                    <span>${g(t.lokasi)}</span>
                </div>
            </td>
            <td>
                <div class="drivers-action-row">
                    <button
                        class="drivers-icon-button"
                        type="button"
                        data-driver-edit="${t.id}"
                        data-testid="edit-driver-${t.id}"
                        aria-label="Edit driver ${g(t.nama)}"
                    >
                        ${Ho()}
                    </button>
                    <button
                        class="drivers-icon-button drivers-icon-button-danger"
                        type="button"
                        data-driver-delete="${t.id}"
                        data-driver-name="${g(t.nama)}"
                        data-testid="delete-driver-${t.id}"
                        aria-label="Hapus driver ${g(t.nama)}"
                    >
                        ${Fo()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function Sn(){const e=document.getElementById("drivers-pagination-shell"),t=document.getElementById("drivers-pagination-info"),n=document.getElementById("drivers-pagination-page"),a=document.getElementById("drivers-prev-page-btn"),r=document.getElementById("drivers-next-page-btn"),o=Math.max(1,Math.ceil(x.totalCount/Ee));e&&(e.hidden=o<=1),t&&(t.textContent=Ue(x.page,Ee,x.totalCount,x.data.length)),n&&(n.textContent=`${x.page} / ${o}`),a&&(a.disabled=x.page===1),r&&(r.disabled=x.page>=o)}async function pe(){x.loading=!0,In(),Sn();try{const[e,t]=await Promise.all([B(`/drivers?page=${x.page}&limit=${Ee}${x.search?`&search=${encodeURIComponent(x.search)}`:""}`),B(`/drivers/count${x.search?`?search=${encodeURIComponent(x.search)}`:""}`)]);x.data=Array.isArray(e)?e:[],x.totalCount=Number(t.count||0)}finally{x.loading=!1,In(),Sn()}}function Cn(){const e=document.getElementById("driver-form"),t=document.getElementById("driver-form-title"),n=document.getElementById("driver-form-description"),a=document.getElementById("driver-id"),r=document.getElementById("driver-nama"),o=document.getElementById("driver-lokasi");e?.reset(),a&&(a.value=""),r&&(r.value=""),o&&(o.value=""),t&&(t.textContent="Tambah Driver Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan data driver"),x.editItem=null,Ye(!1)}function Jo(e){const t=document.getElementById("driver-form-title"),n=document.getElementById("driver-form-description"),a=document.getElementById("driver-id"),r=document.getElementById("driver-nama"),o=document.getElementById("driver-lokasi");x.editItem=e,a&&(a.value=e.id),r&&(r.value=e.nama),o&&(o.value=e.lokasi),t&&(t.textContent="Edit Data Driver"),n&&(n.textContent="Isi form di bawah untuk memperbarui data driver"),Ye(!1)}async function Ko(e){const t=await B(`/drivers/${e}`);Jo(t),q("driver-form-modal")}function Wo(e){const t=document.getElementById("driver-delete-copy");x.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus driver <strong>${g(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`),q("driver-delete-modal")}function zo(){const e=document.getElementById("drivers-add-btn"),t=document.getElementById("drivers-export-btn"),n=document.getElementById("drivers-search-input"),a=document.getElementById("driver-form"),r=document.getElementById("drivers-table-body"),o=document.getElementById("driver-delete-confirm-btn"),s=document.getElementById("drivers-prev-page-btn"),i=document.getElementById("drivers-next-page-btn");if(!(!e||!a||!r))return e.addEventListener("click",()=>{Cn(),q("driver-form-modal")}),t?.addEventListener("click",()=>{Ft("/export/drivers/csv","drivers.csv").catch(()=>{v("Gagal mengunduh file")})}),n?.addEventListener("input",Ne(async m=>{x.search=m.target.value.trim(),x.page=1;try{await pe()}catch{v("Gagal memuat data")}})),a.addEventListener("submit",async m=>{m.preventDefault();const l={nama:document.getElementById("driver-nama")?.value.trim()||"",lokasi:document.getElementById("driver-lokasi")?.value.trim()||""};Ye(!0);try{x.editItem?(await B(`/drivers/${x.editItem.id}`,{method:"PUT",body:l}),D("Data driver berhasil diperbarui")):(await B("/drivers",{method:"POST",body:l}),D("Driver berhasil ditambahkan")),J("driver-form-modal"),Cn(),await pe()}catch(d){v(d.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{Ye(!1)}}),r.addEventListener("click",async m=>{const l=m.target.closest("[data-driver-edit]"),d=m.target.closest("[data-driver-delete]");try{if(l){await Ko(l.dataset.driverEdit);return}d&&Wo({id:d.dataset.driverDelete,nama:d.dataset.driverName})}catch{v("Gagal memuat data")}}),o?.addEventListener("click",async()=>{if(x.deleteItem)try{await B(`/drivers/${x.deleteItem.id}`,{method:"DELETE"}),D("Driver berhasil dihapus"),J("driver-delete-modal"),(x.page-1)*Ee>=x.totalCount-1&&x.page>1&&(x.page-=1),x.deleteItem=null,await pe()}catch{v("Gagal menghapus data")}}),s?.addEventListener("click",async()=>{if(!(x.page<=1)){x.page-=1;try{await pe()}catch{v("Gagal memuat data")}}}),i?.addEventListener("click",async()=>{const m=Math.max(1,Math.ceil(x.totalCount/Ee));if(!(x.page>=m)){x.page+=1;try{await pe()}catch{v("Gagal memuat data")}}}),pe().catch(()=>{v("Gagal memuat data")})}const E={data:[],loading:!0,totalCount:0,page:1,search:"",filterJenis:"",editItem:null,deleteItem:null,isSubmitting:!1},we=10;function Xo(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M5 14L6.6 9.2C6.8728 8.3816 7.6387 7.83 8.5014 7.83H15.4986C16.3613 7.83 17.1272 8.3816 17.4 9.2L19 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M4 14H20V17C20 18.1046 19.1046 19 18 19H6C4.89543 19 4 18.1046 4 17V14Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M7 16H7.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path>
            <path d="M17 16H17.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path>
        </svg>
    `}function Zo(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Qo(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Yo(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 13L11 22L2 13V4H11L20 13Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <circle cx="7.5" cy="8.5" r="1.5" fill="currentColor"></circle>
        </svg>
    `}function et(e){const t=document.getElementById("mobil-submit-btn");E.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":E.editItem?"Perbarui":"Simpan")}function es(e){return e==="Hiace"?"mobil-jenis-badge mobil-jenis-badge-hiace":"mobil-jenis-badge mobil-jenis-badge-reborn"}function ts(){const e=document.getElementById("mobil-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="mobil-table-state">
                <div class="mobil-loading-inline">
                    <span class="mobil-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function ns(){const e=document.getElementById("mobil-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="mobil-table-state mobil-empty-copy">
                Belum ada data mobil
            </td>
        </tr>
    `)}function $n(){const e=document.getElementById("mobil-table-body");if(e){if(E.loading){ts();return}if(E.data.length===0){ns();return}e.innerHTML=E.data.map((t,n)=>`
        <tr class="mobil-row" data-testid="mobil-row-${t.id}">
            <td class="mobil-index-cell">${(E.page-1)*we+n+1}</td>
            <td>
                <div class="mobil-code-cell">
                    <span class="mobil-code-avatar" aria-hidden="true">
                        ${Xo()}
                    </span>
                    <span class="mobil-code-text">${g(t.kode_mobil)}</span>
                </div>
            </td>
            <td>
                <span class="${es(t.jenis_mobil)}">
                    <span class="mobil-jenis-icon" aria-hidden="true">${Yo()}</span>
                    <span>${g(t.jenis_mobil)}</span>
                </span>
            </td>
            <td>
                <div class="mobil-action-row">
                    <button
                        class="mobil-icon-button"
                        type="button"
                        data-mobil-edit="${t.id}"
                        data-testid="edit-mobil-${t.id}"
                        aria-label="Edit mobil ${g(t.kode_mobil)}"
                    >
                        ${Zo()}
                    </button>
                    <button
                        class="mobil-icon-button mobil-icon-button-danger"
                        type="button"
                        data-mobil-delete="${t.id}"
                        data-mobil-name="${g(t.kode_mobil)}"
                        data-testid="delete-mobil-${t.id}"
                        aria-label="Hapus mobil ${g(t.kode_mobil)}"
                    >
                        ${Qo()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function xn(){const e=document.getElementById("mobil-pagination-shell"),t=document.getElementById("mobil-pagination-info"),n=document.getElementById("mobil-pagination-page"),a=document.getElementById("mobil-prev-page-btn"),r=document.getElementById("mobil-next-page-btn"),o=Math.max(1,Math.ceil(E.totalCount/we));e&&(e.hidden=o<=1),t&&(t.textContent=Ue(E.page,we,E.totalCount,E.data.length)),n&&(n.textContent=`${E.page} / ${o}`),a&&(a.disabled=E.page===1),r&&(r.disabled=E.page>=o)}async function se(){E.loading=!0,$n(),xn();try{const[e,t]=await Promise.all([B(`/mobil?page=${E.page}&limit=${we}${E.search?`&search=${encodeURIComponent(E.search)}`:""}${E.filterJenis?`&jenis=${encodeURIComponent(E.filterJenis)}`:""}`),B(`/mobil/count${E.search||E.filterJenis?"?":""}${[E.search?`search=${encodeURIComponent(E.search)}`:"",E.filterJenis?`jenis=${encodeURIComponent(E.filterJenis)}`:""].filter(Boolean).join("&")}`)]);E.data=Array.isArray(e)?e:[],E.totalCount=Number(t.count||0)}finally{E.loading=!1,$n(),xn()}}function _n(){const e=document.getElementById("mobil-form"),t=document.getElementById("mobil-form-title"),n=document.getElementById("mobil-form-description"),a=document.getElementById("mobil-id"),r=document.getElementById("mobil-kode"),o=document.getElementById("mobil-jenis");e?.reset(),a&&(a.value=""),r&&(r.value=""),o&&(o.value="Hiace"),t&&(t.textContent="Tambah Mobil Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan data mobil"),E.editItem=null,et(!1)}function as(e){const t=document.getElementById("mobil-form-title"),n=document.getElementById("mobil-form-description"),a=document.getElementById("mobil-id"),r=document.getElementById("mobil-kode"),o=document.getElementById("mobil-jenis");E.editItem=e,a&&(a.value=e.id),r&&(r.value=e.kode_mobil),o&&(o.value=e.jenis_mobil),t&&(t.textContent="Edit Data Mobil"),n&&(n.textContent="Isi form di bawah untuk memperbarui data mobil"),et(!1)}async function rs(e){const t=await B(`/mobil/${e}`);as(t),q("mobil-form-modal")}function os(e){const t=document.getElementById("mobil-delete-copy");E.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus mobil <strong>${g(e.kode_mobil)}</strong>? Tindakan ini tidak dapat dibatalkan.`),q("mobil-delete-modal")}function ss(){const e=document.getElementById("mobil-add-btn"),t=document.getElementById("mobil-export-btn"),n=document.getElementById("mobil-search-input"),a=document.getElementById("mobil-filter-jenis"),r=document.getElementById("mobil-form"),o=document.getElementById("mobil-table-body"),s=document.getElementById("mobil-delete-confirm-btn"),i=document.getElementById("mobil-prev-page-btn"),m=document.getElementById("mobil-next-page-btn"),l=document.getElementById("mobil-kode");if(!(!e||!r||!o))return e.addEventListener("click",()=>{_n(),q("mobil-form-modal")}),t?.addEventListener("click",()=>{Ft("/export/mobil/csv","mobil.csv").catch(()=>{v("Gagal mengunduh file")})}),n?.addEventListener("input",Ne(async d=>{E.search=d.target.value.trim(),E.page=1;try{await se()}catch{v("Gagal memuat data")}})),a?.addEventListener("change",async d=>{E.filterJenis=d.target.value,E.page=1;try{await se()}catch{v("Gagal memuat data")}}),l?.addEventListener("input",d=>{d.target.value=d.target.value.toUpperCase()}),r.addEventListener("submit",async d=>{d.preventDefault();const u={kode_mobil:document.getElementById("mobil-kode")?.value.trim().toUpperCase()||"",jenis_mobil:document.getElementById("mobil-jenis")?.value||"Hiace"};et(!0);try{E.editItem?(await B(`/mobil/${E.editItem.id}`,{method:"PUT",body:u}),D("Data mobil berhasil diperbarui")):(await B("/mobil",{method:"POST",body:u}),D("Mobil berhasil ditambahkan")),J("mobil-form-modal"),_n(),await se()}catch(f){v(f.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{et(!1)}}),o.addEventListener("click",async d=>{const u=d.target.closest("[data-mobil-edit]"),f=d.target.closest("[data-mobil-delete]");try{if(u){await rs(u.dataset.mobilEdit);return}f&&os({id:f.dataset.mobilDelete,kode_mobil:f.dataset.mobilName})}catch{v("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(E.deleteItem)try{await B(`/mobil/${E.deleteItem.id}`,{method:"DELETE"}),D("Mobil berhasil dihapus"),J("mobil-delete-modal"),(E.page-1)*we>=E.totalCount-1&&E.page>1&&(E.page-=1),E.deleteItem=null,await se()}catch{v("Gagal menghapus data")}}),i?.addEventListener("click",async()=>{if(!(E.page<=1)){E.page-=1;try{await se()}catch{v("Gagal memuat data")}}}),m?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil(E.totalCount/we));if(!(E.page>=d)){E.page+=1;try{await se()}catch{v("Gagal memuat data")}}}),se().catch(()=>{v("Gagal memuat data")})}const w={data:[],drivers:[],mobilList:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1},Ae=10,Tn={"05:00":"Subuh (05.00 WIB)","08:00":"Pagi (08.00 WIB)","10:00":"Pagi (10.00 WIB)","14:00":"Siang (14.00 WIB)","16:00":"Sore (16.00 WIB)","19:00":"Malam (19.00 WIB)"},bt="08:00",is=["Reguler","Dropping","Rental"],Wt="Reguler";function ls(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function ds(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function zt(e){return e==="Lunas"?"Lunas":"Belum Lunas"}function Ln(e){const t=zt(e);return`<span class="keberangkatan-payment-badge ${t==="Lunas"?"is-paid":"is-unpaid"}">${g(t)}</span>`}function An(e){return Tn[e]||Tn[bt]}function tt(e){return is.includes(e)?e:Wt}function cs(){const e=Number(document.getElementById("keberangkatan-tarif-penumpang")?.value||0),t=Number(document.getElementById("keberangkatan-uang-paket")?.value||0),n=Number(document.getElementById("keberangkatan-jumlah-snack")?.value||0),a=Number(document.getElementById("keberangkatan-pengembalian-snack")?.value||0),r=Number(document.getElementById("keberangkatan-jumlah-air-mineral")?.value||0),o=e,s=o+t,i=s*.15,m=s*.85;return{jumlah_uang_penumpang:o,uang_paket:t,total:s,uang_pc:i,uang_bersih:m,jumlah_snack:n,pengembalian_snack:a,jumlah_air_mineral:r}}function Xt(){const e=cs();Object.entries(e).forEach(([t,n])=>{const a=document.querySelector(`[data-calc="${t}"]`);if(a){if(t==="jumlah_snack"){a.textContent=`${A(n)} item`;return}if(t==="pengembalian_snack"){a.textContent=`${A(n)} item`;return}if(t==="jumlah_air_mineral"){a.textContent=`${A(n)} botol`;return}a.textContent=P(n)}})}function nt(e,t,n,a,r=""){const o=document.getElementById(e);if(!o)return;const s=e==="keberangkatan-kode-mobil"?"Pilih mobil":"Pilih driver";o.innerHTML=`
        <option value="">${s}</option>
        ${t.map(i=>`
            <option value="${i[n]}" ${String(i[n])===String(r)?"selected":""}>
                ${g(a(i))}
            </option>
        `).join("")}
    `}function at(e){const t=document.getElementById("keberangkatan-submit-btn");w.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":w.editItem?"Perbarui":"Simpan")}function us(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");e&&(e.innerHTML=`
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
        `))}function ms(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");e&&(e.innerHTML=`
        <tr>
            <td colspan="18" class="keberangkatan-table-state keberangkatan-empty-copy">
                Belum ada data keberangkatan
            </td>
        </tr>
    `,t&&(t.hidden=!1,t.innerHTML=`
            <div class="keberangkatan-mobile-state keberangkatan-empty-copy">
                Belum ada data keberangkatan
            </div>
        `))}function Rn(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");if(e){if(w.loading){us();return}if(w.data.length===0){ms();return}e.innerHTML=w.data.map(n=>`
        <tr class="keberangkatan-row" data-testid="keberangkatan-row-${n.id}">
            <td class="keberangkatan-hari-cell">${g(n.hari)}</td>
            <td>${g(n.tanggal)}</td>
            <td>${g(n.jam_keberangkatan_label||An(n.jam_keberangkatan))}</td>
            <td>${g(tt(n.tipe_layanan))}</td>
            <td>
                <span class="keberangkatan-kode-badge">${g(n.kode_mobil)}</span>
            </td>
            <td>${g(n.driver_nama)}</td>
            <td class="text-right">${A(n.jumlah_penumpang)}</td>
            <td class="text-right keberangkatan-money-cell">${P(n.jumlah_uang_penumpang)}</td>
            <td class="text-right">${A(n.jumlah_paket)}</td>
            <td class="text-right keberangkatan-money-cell">${P(n.uang_paket)}</td>
            <td class="text-right"><span class="keberangkatan-stock-badge">${A(n.jumlah_snack)}</span></td>
            <td class="text-right"><span class="keberangkatan-stock-badge keberangkatan-stock-badge-blue">${A(n.pengembalian_snack)}</span></td>
            <td class="text-right"><span class="keberangkatan-stock-badge keberangkatan-stock-badge-blue">${A(n.jumlah_air_mineral)}</span></td>
            <td class="text-right keberangkatan-money-cell keberangkatan-money-cell-amber">${P(n.uang_pc)}</td>
            <td class="text-right keberangkatan-money-cell keberangkatan-money-cell-emerald">${P(n.uang_bersih)}</td>
            <td class="text-center">${Ln(n.status_pembayaran)}</td>
            <td class="text-center">
                <span class="keberangkatan-trip-badge">#${A(n.trip_ke)}</span>
            </td>
            <td>
                <div class="keberangkatan-action-row">
                    <button
                        class="keberangkatan-icon-button"
                        type="button"
                        data-keberangkatan-edit="${n.id}"
                        data-testid="edit-keberangkatan-${n.id}"
                        aria-label="Edit data keberangkatan ${g(n.kode_mobil)}"
                    >
                        ${ls()}
                    </button>
                    <button
                        class="keberangkatan-icon-button keberangkatan-icon-button-danger"
                        type="button"
                        data-keberangkatan-delete="${n.id}"
                        data-testid="delete-keberangkatan-${n.id}"
                        aria-label="Hapus data keberangkatan ${g(n.kode_mobil)}"
                    >
                        ${ds()}
                    </button>
                </div>
            </td>
        </tr>
    `).join(""),t&&(t.hidden=!1,t.innerHTML=w.data.map(n=>`
            <article class="keberangkatan-mobile-card" data-testid="keberangkatan-card-${n.id}">
                <div class="keberangkatan-mobile-card-head">
                    <div>
                        <p class="keberangkatan-mobile-day">${g(n.hari)}</p>
                        <h3 class="keberangkatan-mobile-date">${g(n.tanggal)}</h3>
                        <p>${g(n.jam_keberangkatan_label||An(n.jam_keberangkatan))}</p>
                    </div>
                    <div class="keberangkatan-mobile-head-side">
                        <span class="keberangkatan-kode-badge">${g(n.kode_mobil)}</span>
                        <span class="keberangkatan-trip-badge">#${A(n.trip_ke)}</span>
                    </div>
                </div>

                <div class="keberangkatan-mobile-driver">
                    <span>Driver</span>
                    <strong>${g(n.driver_nama)}</strong>
                </div>

                <div class="keberangkatan-mobile-grid">
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-status">
                        <span>Validasi</span>
                        ${Ln(n.status_pembayaran)}
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Layanan</span>
                        <strong>${g(tt(n.tipe_layanan))}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Penumpang</span>
                        <strong>${A(n.jumlah_penumpang)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Paket</span>
                        <strong>${A(n.jumlah_paket)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Snack</span>
                        <strong>${A(n.jumlah_snack)} item</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Pengembalian Snack</span>
                        <strong>${A(n.pengembalian_snack)} item</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Air Mineral</span>
                        <strong>${A(n.jumlah_air_mineral)} botol</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-full">
                        <span>Jumlah Tarif</span>
                        <strong>${P(n.jumlah_uang_penumpang)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-full">
                        <span>Uang Paket</span>
                        <strong>${P(n.uang_paket)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-accent">
                        <span>Uang PC (15%)</span>
                        <strong>${P(n.uang_pc)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-emerald">
                        <span>Uang Bersih</span>
                        <strong>${P(n.uang_bersih)}</strong>
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
        `).join(""))}}function Mn(){const e=document.getElementById("keberangkatan-pagination-shell"),t=document.getElementById("keberangkatan-pagination-info"),n=document.getElementById("keberangkatan-pagination-page"),a=document.getElementById("keberangkatan-prev-page-btn"),r=document.getElementById("keberangkatan-next-page-btn"),o=Math.max(1,Math.ceil(w.totalCount/Ae));e&&(e.hidden=o<=1),t&&(t.textContent=Ue(w.page,Ae,w.totalCount,w.data.length)),n&&(n.textContent=`${w.page} / ${o}`),a&&(a.disabled=w.page===1),r&&(r.disabled=w.page>=o)}async function ge(){w.loading=!0,Rn(),Mn();try{const[e,t,n,a]=await Promise.all([B(`/keberangkatan?page=${w.page}&limit=${Ae}${w.search?`&search=${encodeURIComponent(w.search)}`:""}`),B(`/keberangkatan/count${w.search?`?search=${encodeURIComponent(w.search)}`:""}`),B("/drivers/all"),B("/mobil/all")]);w.data=Array.isArray(e)?e:[],w.totalCount=Number(t.count||0),w.drivers=Array.isArray(n)?n:[],w.mobilList=Array.isArray(a)?a:[]}finally{w.loading=!1,Rn(),Mn()}}function Sa(){document.getElementById("keberangkatan-form")?.scrollTo({top:0,behavior:"auto"})}function It(){const e=document.getElementById("keberangkatan-form"),t=document.getElementById("keberangkatan-form-title"),n=document.getElementById("keberangkatan-form-description"),a=document.getElementById("keberangkatan-tanggal"),r=document.getElementById("keberangkatan-jam-keberangkatan"),o=document.getElementById("keberangkatan-trip-ke"),s=document.getElementById("keberangkatan-tipe-layanan"),i=document.getElementById("keberangkatan-jumlah-penumpang"),m=document.getElementById("keberangkatan-tarif-penumpang"),l=document.getElementById("keberangkatan-jumlah-paket"),d=document.getElementById("keberangkatan-uang-paket"),u=document.getElementById("keberangkatan-jumlah-snack"),f=document.getElementById("keberangkatan-pengembalian-snack"),y=document.getElementById("keberangkatan-jumlah-air-mineral"),p=document.getElementById("keberangkatan-status-pembayaran");e?.reset(),w.editItem=null,document.getElementById("keberangkatan-id").value="",t&&(t.textContent="Tambah Data Keberangkatan"),n&&(n.textContent="Isi form di bawah untuk menambahkan data keberangkatan"),a&&(a.value=He()),r&&(r.value=bt),nt("keberangkatan-kode-mobil",w.mobilList,"kode_mobil",b=>`${b.kode_mobil} - ${b.jenis_mobil}`,w.mobilList[0]?.kode_mobil||""),nt("keberangkatan-driver-id",w.drivers,"id",b=>`${b.nama} - ${b.lokasi}`,w.drivers[0]?.id||""),o&&(o.value="1"),s&&(s.value=Wt),i&&(i.value="0"),m&&(m.value="0"),l&&(l.value="0"),d&&(d.value="0"),u&&(u.value="0"),f&&(f.value="0"),y&&(y.value="0"),p&&(p.value="Belum Lunas"),at(!1),Xt(),Sa()}async function Pn(e){const t=await B(`/keberangkatan/${e}`),n=document.getElementById("keberangkatan-form-title"),a=document.getElementById("keberangkatan-form-description");w.editItem=t,document.getElementById("keberangkatan-id").value=t.id,document.getElementById("keberangkatan-tanggal").value=t.tanggal,document.getElementById("keberangkatan-jam-keberangkatan").value=t.jam_keberangkatan||bt,document.getElementById("keberangkatan-trip-ke").value=t.trip_ke,document.getElementById("keberangkatan-tipe-layanan").value=tt(t.tipe_layanan),document.getElementById("keberangkatan-jumlah-penumpang").value=t.jumlah_penumpang,document.getElementById("keberangkatan-tarif-penumpang").value=t.tarif_penumpang,document.getElementById("keberangkatan-jumlah-paket").value=t.jumlah_paket,document.getElementById("keberangkatan-uang-paket").value=t.uang_paket,document.getElementById("keberangkatan-jumlah-snack").value=t.jumlah_snack,document.getElementById("keberangkatan-pengembalian-snack").value=t.pengembalian_snack,document.getElementById("keberangkatan-jumlah-air-mineral").value=t.jumlah_air_mineral,document.getElementById("keberangkatan-status-pembayaran").value=zt(t.status_pembayaran),nt("keberangkatan-kode-mobil",w.mobilList,"kode_mobil",r=>`${r.kode_mobil} - ${r.jenis_mobil}`,t.kode_mobil),nt("keberangkatan-driver-id",w.drivers,"id",r=>`${r.nama} - ${r.lokasi}`,t.driver_id),n&&(n.textContent="Edit Data Keberangkatan"),a&&(a.textContent="Isi form di bawah untuk memperbarui data keberangkatan"),at(!1),Xt(),Sa(),q("keberangkatan-form-modal")}function Dn(e){w.deleteItem=e,q("keberangkatan-delete-modal")}function ps(){const e=document.getElementById("keberangkatan-add-btn"),t=document.getElementById("keberangkatan-export-btn"),n=document.getElementById("keberangkatan-search-input"),a=document.getElementById("keberangkatan-form"),r=document.getElementById("keberangkatan-table-body"),o=document.getElementById("keberangkatan-mobile-list"),s=document.getElementById("keberangkatan-delete-confirm-btn"),i=document.getElementById("keberangkatan-prev-page-btn"),m=document.getElementById("keberangkatan-next-page-btn");if(!(!e||!a||!r))return e.addEventListener("click",()=>{It(),q("keberangkatan-form-modal")}),t?.addEventListener("click",()=>{Ft("/export/keberangkatan/csv","keberangkatan.csv").catch(()=>{v("Gagal mengunduh file")})}),n?.addEventListener("input",Ne(async l=>{w.search=l.target.value.trim(),w.page=1;try{await ge()}catch{v("Gagal memuat data")}})),a.addEventListener("input",l=>{["keberangkatan-jumlah-penumpang","keberangkatan-tarif-penumpang","keberangkatan-uang-paket","keberangkatan-jumlah-snack","keberangkatan-pengembalian-snack","keberangkatan-jumlah-air-mineral"].includes(l.target.id)&&Xt()}),a.addEventListener("submit",async l=>{l.preventDefault();const d={tanggal:document.getElementById("keberangkatan-tanggal")?.value||"",jam_keberangkatan:document.getElementById("keberangkatan-jam-keberangkatan")?.value||bt,tipe_layanan:tt(document.getElementById("keberangkatan-tipe-layanan")?.value||Wt),kode_mobil:document.getElementById("keberangkatan-kode-mobil")?.value||"",driver_id:document.getElementById("keberangkatan-driver-id")?.value||"",jumlah_penumpang:Number(document.getElementById("keberangkatan-jumlah-penumpang")?.value||0),tarif_penumpang:Number(document.getElementById("keberangkatan-tarif-penumpang")?.value||0),jumlah_paket:Number(document.getElementById("keberangkatan-jumlah-paket")?.value||0),uang_paket:Number(document.getElementById("keberangkatan-uang-paket")?.value||0),jumlah_snack:Number(document.getElementById("keberangkatan-jumlah-snack")?.value||0),pengembalian_snack:Number(document.getElementById("keberangkatan-pengembalian-snack")?.value||0),jumlah_air_mineral:Number(document.getElementById("keberangkatan-jumlah-air-mineral")?.value||0),trip_ke:Number(document.getElementById("keberangkatan-trip-ke")?.value||1),status_pembayaran:zt(document.getElementById("keberangkatan-status-pembayaran")?.value||"")};at(!0);try{w.editItem?(await B(`/keberangkatan/${w.editItem.id}`,{method:"PUT",body:d}),D("Data berhasil diperbarui")):(await B("/keberangkatan",{method:"POST",body:d}),D("Data berhasil ditambahkan")),J("keberangkatan-form-modal"),It(),await ge()}catch(u){v(u.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{at(!1)}}),r.addEventListener("click",async l=>{const d=l.target.closest("[data-keberangkatan-edit]"),u=l.target.closest("[data-keberangkatan-delete]");try{if(d){await Pn(d.dataset.keberangkatanEdit);return}u&&Dn({id:u.dataset.keberangkatanDelete})}catch{v("Gagal memuat data")}}),o?.addEventListener("click",async l=>{const d=l.target.closest("[data-keberangkatan-edit]"),u=l.target.closest("[data-keberangkatan-delete]");try{if(d){await Pn(d.dataset.keberangkatanEdit);return}u&&Dn({id:u.dataset.keberangkatanDelete})}catch{v("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(w.deleteItem)try{await B(`/keberangkatan/${w.deleteItem.id}`,{method:"DELETE"}),D("Data berhasil dihapus"),J("keberangkatan-delete-modal"),(w.page-1)*Ae>=w.totalCount-1&&w.page>1&&(w.page-=1),w.deleteItem=null,await ge()}catch{v("Gagal menghapus data")}}),i?.addEventListener("click",async()=>{if(!(w.page<=1)){w.page-=1;try{await ge()}catch{v("Gagal memuat data")}}}),m?.addEventListener("click",async()=>{const l=Math.max(1,Math.ceil(w.totalCount/Ae));if(!(w.page>=l)){w.page+=1;try{await ge()}catch{v("Gagal memuat data")}}}),ge().then(()=>{It()}).catch(()=>{v("Gagal memuat data")})}const S={data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1,prices:{snack:0,air:0}},Re=10;function gs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function fs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function rt(e){return Number(document.getElementById(e)?.value||0)}function ot(){const e=rt("stock-total-snack"),t=rt("stock-total-air"),n=e*S.prices.snack+t*S.prices.air,a=document.querySelector('[data-stock-calc="nilai_total"]'),r=document.getElementById("stock-snack-price-label"),o=document.getElementById("stock-air-price-label");r&&(r.textContent=P(S.prices.snack)),o&&(o.textContent=P(S.prices.air)),a&&(a.textContent=P(n))}function st(e){const t=document.getElementById("stock-submit-btn");S.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":S.editItem?"Perbarui":"Simpan")}function bs(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");e&&(e.innerHTML=`
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
        `))}function hs(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");e&&(e.innerHTML=`
        <tr>
            <td colspan="14" class="stock-table-state stock-empty-copy">
                Belum ada data stok snack dan air mineral
            </td>
        </tr>
    `,t&&(t.hidden=!1,t.innerHTML=`
            <div class="stock-mobile-state stock-empty-copy">
                Belum ada data stok snack dan air mineral
            </div>
        `))}function On(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");if(e){if(S.loading){bs();return}if(S.data.length===0){hs();return}e.innerHTML=S.data.map(n=>`
        <tr class="stock-row" data-testid="stock-row-${n.id}">
            <td class="stock-day-cell">${g(n.hari)}</td>
            <td>${g(n.tanggal)}</td>
            <td>${g(n.bulan)}</td>
            <td class="text-right">${A(n.total_stock_snack_display??n.total_stock_snack)}</td>
            <td class="text-right">${A(n.total_stock_air_mineral)}</td>
            <td class="text-right">${A(n.pengembalian_snack)}</td>
            <td class="text-right">${A(n.terpakai_snack)}</td>
            <td class="text-right">${A(n.terpakai_air_mineral)}</td>
            <td class="text-right"><span class="stock-value-badge stock-value-badge-emerald">${A(n.sisa_stock_snack)}</span></td>
            <td class="text-right"><span class="stock-value-badge stock-value-badge-blue">${A(n.sisa_stock_air_mineral)}</span></td>
            <td class="text-right stock-money-cell">${P(n.nilai_total)}</td>
            <td class="text-right stock-money-cell stock-money-cell-emerald">${P(n.sisa_nilai_total)}</td>
            <td>${g(n.keterangan||"-")}</td>
            <td>
                <div class="stock-action-row">
                    <button
                        class="stock-icon-button"
                        type="button"
                        data-stock-edit="${n.id}"
                        data-testid="edit-stock-${n.id}"
                        aria-label="Edit data stok ${g(n.tanggal)}"
                    >
                        ${gs()}
                    </button>
                    <button
                        class="stock-icon-button stock-icon-button-danger"
                        type="button"
                        data-stock-delete="${n.id}"
                        data-stock-date="${g(n.tanggal)}"
                        data-testid="delete-stock-${n.id}"
                        aria-label="Hapus data stok ${g(n.tanggal)}"
                    >
                        ${fs()}
                    </button>
                </div>
            </td>
        </tr>
    `).join(""),t&&(t.hidden=!1,t.innerHTML=S.data.map(n=>`
            <article class="stock-mobile-card" data-testid="stock-card-${n.id}">
                <div class="stock-mobile-card-head">
                    <div>
                        <p class="stock-mobile-day">${g(n.hari)}</p>
                        <h3 class="stock-mobile-date">${g(n.tanggal)}</h3>
                    </div>
                    <span class="stock-mobile-month">${g(n.bulan)}</span>
                </div>

                <div class="stock-mobile-grid">
                    <div class="stock-mobile-item">
                        <span>Total Snack</span>
                        <strong>${A(n.total_stock_snack_display??n.total_stock_snack)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Total Air Mineral</span>
                        <strong>${A(n.total_stock_air_mineral)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Pengembalian Snack</span>
                        <strong>${A(n.pengembalian_snack)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Terpakai Snack</span>
                        <strong>${A(n.terpakai_snack)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Terpakai Air Mineral</span>
                        <strong>${A(n.terpakai_air_mineral)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Sisa Snack</span>
                        <strong>${A(n.sisa_stock_snack)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Sisa Air Mineral</span>
                        <strong>${A(n.sisa_stock_air_mineral)}</strong>
                    </div>
                    <div class="stock-mobile-item stock-mobile-item-full">
                        <span>Nilai Total</span>
                        <strong>${P(n.nilai_total)}</strong>
                    </div>
                    <div class="stock-mobile-item stock-mobile-item-full stock-mobile-item-emerald">
                        <span>Sisa Nilai Total</span>
                        <strong>${P(n.sisa_nilai_total)}</strong>
                    </div>
                    <div class="stock-mobile-item stock-mobile-item-full">
                        <span>Keterangan</span>
                        <strong>${g(n.keterangan||"-")}</strong>
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
                        data-stock-date="${g(n.tanggal)}"
                        data-testid="delete-stock-mobile-${n.id}"
                    >
                        Hapus
                    </button>
                </div>
            </article>
        `).join(""))}}function qn(){const e=document.getElementById("stock-pagination-shell"),t=document.getElementById("stock-pagination-info"),n=document.getElementById("stock-pagination-page"),a=document.getElementById("stock-prev-page-btn"),r=document.getElementById("stock-next-page-btn"),o=Math.max(1,Math.ceil(S.totalCount/Re));e&&(e.hidden=o<=1),t&&(t.textContent=Ue(S.page,Re,S.totalCount,S.data.length)),n&&(n.textContent=`${S.page} / ${o}`),a&&(a.disabled=S.page===1),r&&(r.disabled=S.page>=o)}async function fe(){S.loading=!0,On(),qn();try{const[e,t]=await Promise.all([B(`/stock?page=${S.page}&limit=${Re}${S.search?`&search=${encodeURIComponent(S.search)}`:""}`),B(`/stock/count${S.search?`?search=${encodeURIComponent(S.search)}`:""}`)]);S.data=Array.isArray(e)?e:[],S.totalCount=Number(t.count||0)}finally{S.loading=!1,On(),qn()}}function jn(){const e=document.getElementById("stock-form"),t=document.getElementById("stock-form-title"),n=document.getElementById("stock-form-description");e?.reset(),S.editItem=null,document.getElementById("stock-id").value="",document.getElementById("stock-tanggal").value=He(),document.getElementById("stock-total-snack").value="0",document.getElementById("stock-total-air").value="0",document.getElementById("stock-keterangan").value="",t&&(t.textContent="Tambah Stok Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan stok snack dan air mineral"),st(!1),ot()}function ks(e){const t=document.getElementById("stock-form-title"),n=document.getElementById("stock-form-description");S.editItem=e,document.getElementById("stock-id").value=e.id,document.getElementById("stock-tanggal").value=e.tanggal,document.getElementById("stock-total-snack").value=e.total_stock_snack,document.getElementById("stock-total-air").value=e.total_stock_air_mineral,document.getElementById("stock-keterangan").value=e.keterangan||"",t&&(t.textContent="Edit Data Stok"),n&&(n.textContent="Isi form di bawah untuk memperbarui stok snack dan air mineral"),st(!1),ot()}async function Nn(e){const t=await B(`/stock/${e}`);ks(t),q("stock-form-modal")}function Un(e){const t=document.getElementById("stock-delete-copy");S.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus data stok tanggal <strong>${g(e.tanggal)}</strong>? Tindakan ini tidak dapat dibatalkan.`),q("stock-delete-modal")}function ys(){const e=document.querySelector("[data-stock-page]"),t=document.getElementById("stock-add-btn"),n=document.getElementById("stock-search-input"),a=document.getElementById("stock-form"),r=document.getElementById("stock-table-body"),o=document.getElementById("stock-mobile-list"),s=document.getElementById("stock-delete-confirm-btn"),i=document.getElementById("stock-prev-page-btn"),m=document.getElementById("stock-next-page-btn");if(!(!e||!t||!a||!r))return S.prices.snack=Number(e.dataset.stockSnackPrice||0),S.prices.air=Number(e.dataset.stockAirPrice||0),ot(),t.addEventListener("click",()=>{jn(),q("stock-form-modal")}),n?.addEventListener("input",Ne(async l=>{S.search=l.target.value.trim(),S.page=1;try{await fe()}catch{v("Gagal memuat data")}})),a.addEventListener("input",l=>{["stock-total-snack","stock-total-air"].includes(l.target.id)&&ot()}),a.addEventListener("submit",async l=>{l.preventDefault();const d={tanggal:document.getElementById("stock-tanggal")?.value||"",total_stock_snack:rt("stock-total-snack"),total_stock_air_mineral:rt("stock-total-air"),keterangan:document.getElementById("stock-keterangan")?.value.trim()||""};st(!0);try{S.editItem?(await B(`/stock/${S.editItem.id}`,{method:"PUT",body:d}),D("Data stok berhasil diperbarui")):(await B("/stock",{method:"POST",body:d}),D("Data stok berhasil ditambahkan")),J("stock-form-modal"),jn(),await fe()}catch(u){v(u.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{st(!1)}}),r.addEventListener("click",async l=>{const d=l.target.closest("[data-stock-edit]"),u=l.target.closest("[data-stock-delete]");try{if(d){await Nn(d.dataset.stockEdit);return}u&&Un({id:u.dataset.stockDelete,tanggal:u.dataset.stockDate})}catch{v("Gagal memuat data")}}),o?.addEventListener("click",async l=>{const d=l.target.closest("[data-stock-edit]"),u=l.target.closest("[data-stock-delete]");try{if(d){await Nn(d.dataset.stockEdit);return}u&&Un({id:u.dataset.stockDelete,tanggal:u.dataset.stockDate})}catch{v("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(S.deleteItem)try{await B(`/stock/${S.deleteItem.id}`,{method:"DELETE"}),D("Data stok berhasil dihapus"),J("stock-delete-modal"),(S.page-1)*Re>=S.totalCount-1&&S.page>1&&(S.page-=1),S.deleteItem=null,await fe()}catch{v("Gagal menghapus data")}}),i?.addEventListener("click",async()=>{if(!(S.page<=1)){S.page-=1;try{await fe()}catch{v("Gagal memuat data")}}}),m?.addEventListener("click",async()=>{const l=Math.max(1,Math.ceil(S.totalCount/Re));if(!(S.page>=l)){S.page+=1;try{await fe()}catch{v("Gagal memuat data")}}}),fe().catch(()=>{v("Gagal memuat data")})}const Me=10,C={currentUser:null,data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,defaultRole:"User"};function vs(e){return["Super Admin","Admin"].includes(e)}function Es(e){return e==="Super Admin"}function ws(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function Bs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M2.5 12C4.4 8.2 8 6 12 6C16 6 19.6 8.2 21.5 12C19.6 15.8 16 18 12 18C8 18 4.4 15.8 2.5 12Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function Is(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Ss(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Cs(){return Es(C.currentUser?.role)?["Super Admin","Admin","User"]:["Admin","User"]}function it(e){le(document.getElementById("admin-user-submit-btn"),e,"Menyimpan...")}function $s(e){return e==="Super Admin"?"admin-users-role-badge admin-users-role-badge-super":e==="Admin"?"admin-users-role-badge admin-users-role-badge-admin":"admin-users-role-badge admin-users-role-badge-user"}function xs(){const e=document.getElementById("admin-users-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="6" class="admin-users-table-state">
                <div class="admin-users-loading-inline">
                    <span class="admin-users-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function Ca(e="Belum ada akun admin atau user."){const t=document.getElementById("admin-users-table-body");t&&(t.innerHTML=`
        <tr>
            <td colspan="6" class="admin-users-table-state admin-users-empty-copy">${g(e)}</td>
        </tr>
    `)}function Hn(){const e=document.getElementById("admin-users-table-body");if(e){if(C.loading){xs();return}if(C.data.length===0){Ca();return}e.innerHTML=C.data.map(t=>`
        <tr class="admin-users-row" data-testid="admin-user-row-${t.id}">
            <td>
                <div class="admin-users-name-cell">
                    <span class="admin-users-avatar" aria-hidden="true">${ws()}</span>
                    <div>
                        <span class="admin-users-name">${g(t.nama)}</span>
                        <span class="admin-users-name-meta">${t.is_current_user?"Akun yang sedang login":"Akun dashboard aktif"}</span>
                    </div>
                </div>
            </td>
            <td><span class="admin-users-username">@${g(t.username)}</span></td>
            <td><span class="admin-users-email">${g(t.email)}</span></td>
            <td>
                <div class="admin-users-password-cell">
                    <span class="admin-users-password-mask">${g(t.password_mask)}</span>
                    <span class="admin-users-password-copy">Terenkripsi</span>
                </div>
            </td>
            <td><span class="${$s(t.role)}">${g(t.role)}</span></td>
            <td>
                <div class="admin-users-action-row">
                    <button class="admin-users-icon-button" type="button" data-admin-user-show="${t.id}" data-testid="show-admin-user-${t.id}" aria-label="Lihat detail akun ${g(t.nama)}">
                        ${Bs()}
                    </button>
                    <button class="admin-users-icon-button" type="button" data-admin-user-edit="${t.id}" data-testid="edit-admin-user-${t.id}" aria-label="Edit akun ${g(t.nama)}" ${t.can_edit?"":"disabled"}>
                        ${Is()}
                    </button>
                    <button class="admin-users-icon-button admin-users-icon-button-danger" type="button" data-admin-user-delete="${t.id}" data-admin-user-name="${g(t.nama)}" data-testid="delete-admin-user-${t.id}" aria-label="Hapus akun ${g(t.nama)}" ${t.can_delete?"":"disabled"}>
                        ${Ss()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function Mt(){const e=document.getElementById("admin-users-pagination-shell"),t=document.getElementById("admin-users-pagination-info"),n=document.getElementById("admin-users-pagination-page"),a=document.getElementById("admin-users-prev-page-btn"),r=document.getElementById("admin-users-next-page-btn"),o=Math.max(1,Math.ceil(C.totalCount/Me));e&&(e.hidden=o<=1),t&&(t.textContent=Ue(C.page,Me,C.totalCount,C.data.length)),n&&(n.textContent=`${C.page} / ${o}`),a&&(a.disabled=C.page===1),r&&(r.disabled=C.page>=o)}async function be(){C.loading=!0,Hn(),Mt();try{const e=C.search?`?search=${encodeURIComponent(C.search)}`:"",t=`?page=${C.page}&limit=${Me}${C.search?`&search=${encodeURIComponent(C.search)}`:""}`,[n,a]=await Promise.all([B(`/admin-users${t}`),B(`/admin-users/count${e}`)]);C.data=Array.isArray(n)?n:[],C.totalCount=Number(a.count||0)}finally{C.loading=!1,Hn(),Mt()}}function $a(e="User"){const t=document.getElementById("admin-user-role");if(!t)return;const n=Cs(),a=n.includes(e)?e:n[0];t.innerHTML=n.map(r=>`
        <option value="${g(r)}" ${r===a?"selected":""}>${g(r)}</option>
    `).join("")}function xa(e){const t=document.getElementById("admin-user-password"),n=document.getElementById("admin-user-password-note");t&&(t.required=!e,t.placeholder=e?"Kosongkan jika tidak ingin mengubah password":"Masukkan password",t.value=""),n&&(n.textContent=e?"Kosongkan password jika tidak ingin mengubah password akun ini.":"Password minimal 6 karakter dan akan disimpan dalam bentuk terenkripsi.")}function St(e="User"){const t=document.getElementById("admin-user-form"),n=document.getElementById("admin-user-form-title"),a=document.getElementById("admin-user-form-description"),r=document.getElementById("admin-user-id");t?.reset(),r&&(r.value=""),$a(e),xa(!1),n&&(n.textContent=e==="Admin"?"Tambah Admin Baru":"Tambah User Baru"),a&&(a.textContent=e==="Admin"?"Lengkapi data akun untuk menambahkan admin baru":"Lengkapi data akun untuk menambahkan user baru"),C.defaultRole=e,C.editItem=null,it(!1)}function _s(e){C.editItem=e,document.getElementById("admin-user-id").value=e.id,document.getElementById("admin-user-nama").value=e.nama,document.getElementById("admin-user-username").value=e.username,document.getElementById("admin-user-email").value=e.email,$a(e.role),xa(!0),document.getElementById("admin-user-form-title").textContent="Edit Akun",document.getElementById("admin-user-form-description").textContent="Perbarui informasi akun admin atau user di bawah ini",it(!1)}function Ts(e){const t=document.getElementById("admin-user-detail-list");t&&(t.innerHTML=`
        <div class="admin-users-detail-item">
            <span>Nama</span>
            <strong>${g(e.nama)}</strong>
        </div>
        <div class="admin-users-detail-item">
            <span>Username</span>
            <strong>@${g(e.username)}</strong>
        </div>
        <div class="admin-users-detail-item">
            <span>Email</span>
            <strong>${g(e.email)}</strong>
        </div>
        <div class="admin-users-detail-item">
            <span>Password</span>
            <strong>${g(e.password_mask)}</strong>
            <p>${g(e.password_note)}</p>
        </div>
        <div class="admin-users-detail-item">
            <span>Role</span>
            <strong>${g(e.role)}</strong>
        </div>
        <div class="admin-users-detail-item">
            <span>Dibuat</span>
            <strong>${g(To(e.created_at))}</strong>
        </div>
    `)}async function Ls(e){Ts(await B(`/admin-users/${e}`)),q("admin-user-show-modal")}async function As(e){_s(await B(`/admin-users/${e}`)),q("admin-user-form-modal")}function Rs(e){C.deleteItem=e,document.getElementById("admin-user-delete-copy").innerHTML=`Apakah Anda yakin ingin menghapus akun <strong>${g(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`,q("admin-user-delete-modal")}function Fn(){const e=document.getElementById("admin-users-access-note"),t=document.getElementById("admin-users-search-input"),n=document.querySelector(".admin-users-page-actions");e&&(e.hidden=!1,e.textContent="Halaman ini hanya dapat diakses oleh Admin atau Super Admin."),t&&(t.disabled=!0),n&&(n.hidden=!0),C.loading=!1,C.data=[],C.totalCount=0,Ca("Anda tidak memiliki akses untuk mengelola data admin dan user."),Mt()}function Ms({user:e}={}){const t=document.getElementById("admin-users-add-admin-btn"),n=document.getElementById("admin-users-add-user-btn"),a=document.getElementById("admin-users-search-input"),r=document.getElementById("admin-user-form"),o=document.getElementById("admin-users-table-body"),s=document.getElementById("admin-user-delete-confirm-btn"),i=document.getElementById("admin-users-prev-page-btn"),m=document.getElementById("admin-users-next-page-btn");if(!(!t||!n||!r||!o)){if(C.currentUser=e||window.transitAuthUser||null,!vs(C.currentUser?.role)){Fn();return}return t.addEventListener("click",()=>{St("Admin"),q("admin-user-form-modal")}),n.addEventListener("click",()=>{St("User"),q("admin-user-form-modal")}),a?.addEventListener("input",Ne(async l=>{C.search=l.target.value.trim(),C.page=1;try{await be()}catch(d){v(d.message||"Gagal memuat data akun")}})),r.addEventListener("submit",async l=>{l.preventDefault();const d={nama:document.getElementById("admin-user-nama")?.value.trim()||"",username:document.getElementById("admin-user-username")?.value.trim()||"",email:document.getElementById("admin-user-email")?.value.trim()||"",password:document.getElementById("admin-user-password")?.value||"",role:document.getElementById("admin-user-role")?.value||"User"};it(!0);try{C.editItem?(await B(`/admin-users/${C.editItem.id}`,{method:"PUT",body:d}),D("Akun berhasil diperbarui")):(await B("/admin-users",{method:"POST",body:d}),D(d.role==="Admin"?"Admin berhasil ditambahkan":"User berhasil ditambahkan")),J("admin-user-form-modal"),St(C.defaultRole),await be()}catch(u){v(u.message||"Silakan periksa kembali data yang diinput","Gagal menyimpan akun")}finally{it(!1)}}),o.addEventListener("click",async l=>{const d=l.target.closest("[data-admin-user-show]"),u=l.target.closest("[data-admin-user-edit]"),f=l.target.closest("[data-admin-user-delete]");try{if(d){await Ls(d.dataset.adminUserShow);return}if(u){await As(u.dataset.adminUserEdit);return}f&&Rs({id:f.dataset.adminUserDelete,nama:f.dataset.adminUserName})}catch(y){v(y.message||"Gagal memuat detail akun")}}),s?.addEventListener("click",async()=>{if(C.deleteItem)try{await B(`/admin-users/${C.deleteItem.id}`,{method:"DELETE"}),D("Akun berhasil dihapus"),J("admin-user-delete-modal"),(C.page-1)*Me>=C.totalCount-1&&C.page>1&&(C.page-=1),C.deleteItem=null,await be()}catch(l){v(l.message||"Gagal menghapus akun")}}),i?.addEventListener("click",async()=>{if(!(C.page<=1)){C.page-=1;try{await be()}catch(l){v(l.message||"Gagal memuat data akun")}}}),m?.addEventListener("click",async()=>{const l=Math.max(1,Math.ceil(C.totalCount/Me));if(!(C.page>=l)){C.page+=1;try{await be()}catch(d){v(d.message||"Gagal memuat data akun")}}}),be().catch(l=>{if(l.status===403){Fn();return}v(l.message||"Gagal memuat data akun")})}}const Vn=[{value:"05:00",label:"Subuh",time:"05.00 WIB"},{value:"08:00",label:"Pagi",time:"08.00 WIB"},{value:"10:00",label:"Pagi",time:"10.00 WIB"},{value:"14:00",label:"Siang",time:"14.00 WIB"},{value:"16:00",label:"Sore",time:"16.00 WIB"},{value:"19:00",label:"Malam",time:"19.00 WIB"}],_a=[[{code:"1A",label:"1A"},{code:"SOPIR",label:"SOPIR",isDriver:!0}],[{code:"2A",label:"2A"},{code:"3A",label:"3A"}],[{code:"4A",label:"4A"},{code:"5A",label:"5A"}]],Ps=_a.flat().filter(e=>!e.isDriver).length,k={currentUser:null,date:He(),direction:"to_pkb",bookings:[],loading:!1,drivers:[],mobils:[],formOptions:null,selectedSeats:[],passengerDraftMap:{},editItem:null,deleteItem:null,slotDriverMap:{},slotMobilMap:{},occupiedSeatsForForm:[]};function Ct(e){const t=document.getElementById(e);if(!t)return null;try{return JSON.parse(t.textContent||"{}")}catch{return null}}function Ds(e){return["Super Admin","Admin"].includes(e)}function Os(e){const t=e?"#dc2626":"#166534",n=e?"#991b1b":"#14532d";return`
        <svg viewBox="0 0 50 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="2" width="30" height="20" rx="8" fill="${t}" stroke="${n}" stroke-width="1.5"/>
            <rect x="5" y="18" width="40" height="28" rx="9" fill="${t}" stroke="${n}" stroke-width="1.5"/>
            <rect x="7" y="44" width="36" height="14" rx="7" fill="${t}" stroke="${n}" stroke-width="1.5" opacity="0.8"/>
            <rect x="2" y="22" width="5" height="18" rx="2.5" fill="${t}" opacity="0.6"/>
            <rect x="43" y="22" width="5" height="18" rx="2.5" fill="${t}" opacity="0.6"/>
        </svg>`}function qs(){return`
        <svg viewBox="0 0 50 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="25" cy="30" r="18" stroke="rgba(148,163,184,0.5)" stroke-width="2.5"/>
            <circle cx="25" cy="30" r="6" fill="rgba(148,163,184,0.4)"/>
            <line x1="25" y1="12" x2="25" y2="24" stroke="rgba(148,163,184,0.5)" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="7" y1="30" x2="19" y2="30" stroke="rgba(148,163,184,0.5)" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="31" y1="30" x2="43" y2="30" stroke="rgba(148,163,184,0.5)" stroke-width="2.5" stroke-linecap="round"/>
        </svg>`}function js(){return'<svg viewBox="0 0 24 24" fill="none"><path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path><path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg>'}function Ns(){return'<svg viewBox="0 0 24 24" fill="none"><path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg>'}function Us(e){return`
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
                    ${_a.map(n=>`<div class="bpg-seat-row">${n.map(r=>{if(r.isDriver)return`
                    <div class="bpg-seat-item bpg-seat-driver" title="Sopir / Pengemudi">
                        <div class="bpg-seat-icon">${qs()}</div>
                        <span class="bpg-seat-label">SOPIR</span>
                    </div>`;const o=e[r.code],s=!!o,i=s?"bpg-seat-occupied":"bpg-seat-available",m=s?g(o.nama_pemesanan||"-"):"";return`
                <div class="bpg-seat-item ${i}" title="${s?m:"Tersedia"}">
                    <div class="bpg-seat-icon">${Os(s)}</div>
                    <span class="bpg-seat-label">${r.label}</span>
                    ${s?`<span class="bpg-seat-name">${m}</span>`:""}
                </div>`}).join("")}</div>`).join("")}
                </div>
            </div>
        </div>`}function Hs(e){if(e.length===0)return`
            <div class="bpg-empty-slot">
                <svg viewBox="0 0 24 24" fill="none" style="width:32px;height:32px;opacity:0.3;">
                    <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                    <circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="1.8"/>
                    <path d="M23 21V19C22.9986 17.1771 21.765 15.5857 20 15.13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                    <path d="M16 3.13C17.7699 3.58317 19.0078 5.17799 19.0078 7.005C19.0078 8.83201 17.7699 10.4268 16 10.88" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                </svg>
                <p>Belum ada penumpang pada jadwal ini</p>
            </div>`;const t=[{value:"Berangkat",label:"Berangkat",cls:"bpg-depart-opt--go"},{value:"Tidak Berangkat",label:"Tidak Berangkat",cls:"bpg-depart-opt--no"},{value:"Di Oper",label:"Di Oper",cls:"bpg-depart-opt--oper"}];function n(r){return r==="Berangkat"?{label:"Berangkat",cls:"bpg-depart-trigger--go"}:r==="Tidak Berangkat"?{label:"Tidak Berangkat",cls:"bpg-depart-trigger--no"}:r==="Di Oper"?{label:"Di Oper",cls:"bpg-depart-trigger--oper"}:{label:"Status",cls:""}}return`
        <div class="bpg-passenger-list">
            <div class="bpg-passenger-list-head">
                <svg viewBox="0 0 24 24" fill="none" style="width:15px;height:15px;"><path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="1.8"/></svg>
                <span>Daftar Penumpang</span>
            </div>
            ${e.map(r=>{const o=r.selected_seats_label||"-",s=r.departure_status||"",i=n(s),m=t.map(l=>{const d=s===l.value;return`<button class="bpg-depart-opt ${l.cls}${d?" is-active":""}" type="button"
                data-departure-status="${g(l.value)}"
                data-booking-departure="${g(String(r.id))}">${g(l.label)}</button>`}).join("");return`
            <div class="bpg-passenger-item" data-booking-id="${g(String(r.id))}">
                <div class="bpg-passenger-item-row">
                    <div class="bpg-passenger-seats">
                        ${o.split(",").map(l=>`<span class="stock-value-badge stock-value-badge-blue">${g(l.trim())}</span>`).join("")}
                    </div>
                    <div class="bpg-passenger-info">
                        <span class="bpg-passenger-name">${g(r.nama_pemesanan||"-")}</span>
                        <span class="bpg-passenger-phone">${g(r.phone||"-")}</span>
                    </div>
                    <div class="bpg-passenger-actions">
                        <span class="${g(r.payment_status_badge_class||"stock-value-badge stock-value-badge-blue")} bpg-status-sm">${g(r.payment_status||"-")}</span>
                        <button class="bpg-lihat-btn" type="button" data-booking-lihat="${g(String(r.id))}" aria-label="Lihat detail ${g(r.nama_pemesanan)}">
                            <svg viewBox="0 0 24 24" fill="none" style="width:13px;height:13px;"><path d="M2.5 12C4.4 8.2 8 6 12 6C16 6 19.6 8.2 21.5 12C19.6 15.8 16 18 12 18C8 18 4.4 15.8 2.5 12Z" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/></svg>
                            Lihat
                        </button>
                        <button class="admin-users-icon-button" type="button" data-booking-edit="${g(String(r.id))}" title="Edit pemesanan">
                            ${js()}
                        </button>
                        <button class="admin-users-icon-button admin-users-icon-button-danger" type="button" data-booking-delete="${g(String(r.id))}" data-booking-name="${g(r.nama_pemesanan)}" title="Hapus pemesanan">
                            ${Ns()}
                        </button>
                    </div>
                </div>
                <div class="bpg-passenger-depart-row">
                    <div class="bpg-depart-dropdown" data-depart-dropdown="${g(String(r.id))}">
                        <button class="bpg-depart-trigger ${i.cls}" type="button" data-depart-toggle="${g(String(r.id))}">
                            <svg viewBox="0 0 24 24" fill="none" style="width:11px;height:11px;flex-shrink:0;"><circle cx="12" cy="12" r="2.5" fill="currentColor"/><circle cx="12" cy="5" r="2" fill="currentColor"/><circle cx="12" cy="19" r="2" fill="currentColor"/></svg>
                            ${g(i.label)}
                            <svg viewBox="0 0 24 24" fill="none" style="width:10px;height:10px;flex-shrink:0;"><path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </button>
                        <div class="bpg-depart-menu" hidden>
                            ${m}
                        </div>
                    </div>
                </div>
            </div>`}).join("")}
        </div>`}function Fs(e){const t={};return e.forEach(n=>{(Array.isArray(n.selected_seats)?n.selected_seats:[]).forEach(r=>{t[r]||(t[r]=n)})}),t}function Vs(e,t){const n=Fs(t),a=t.reduce((u,f)=>u+(Number(f.passenger_count)||0),0),r=`${e.value}__${k.direction}`;if(!k.slotDriverMap[r]){const u=t.find(f=>f.driver_id);u&&(k.slotDriverMap[r]=u.driver_id)}const o=k.slotDriverMap[r]||"",s=k.slotMobilMap[r]||"",i="stock-value-badge-yellow",m=k.drivers.map(u=>{const f=u.lokasi?`${u.nama} (${u.lokasi})`:u.nama;return`<option value="${g(u.id)}" ${o===u.id?"selected":""}>${g(f)}</option>`}).join(""),l=k.mobils.map(u=>{const f=`${u.kode_mobil} — ${u.jenis_mobil}`;return`<option value="${g(u.id)}" ${s===u.id?"selected":""}>${g(f)}</option>`}).join(""),d=[...new Set(t.map(u=>(u.service_type||"").trim()).filter(Boolean))];return`
        <article class="bpg-slot-card" data-slot="${g(e.value)}" data-direction="${g(k.direction)}">
            <div class="bpg-slot-head">
                <div class="bpg-slot-time-badge">
                    <span class="bpg-slot-period">${g(e.label)}</span>
                    <strong class="bpg-slot-time">${g(e.time)}</strong>
                </div>
                <div class="bpg-slot-service-types">
                    ${d.length>0?d.map(u=>`<span class="bpg-service-badge">${g(u)}</span>`).join(""):'<span class="bpg-service-badge bpg-service-badge--empty">Belum ada layanan</span>'}
                </div>
                <div class="bpg-slot-counters">
                    <span class="stock-value-badge ${i}">${a} / ${Ps} Kursi</span>
                </div>
            </div>

            ${Us(n)}

            <div class="bpg-slot-assignment">
                <div class="bpg-slot-select-group">
                    <label>
                        <svg viewBox="0 0 24 24" fill="none" style="width:13px;height:13px;"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/><path d="M4 20C4 17.2386 7.58172 15 12 15C16.4183 15 20 17.2386 20 20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
                        Pilih Driver
                    </label>
                    <select class="bpg-slot-select" data-slot-driver="${g(e.value)}">
                        <option value="">— Belum ditentukan —</option>
                        ${m}
                    </select>
                </div>
                <div class="bpg-slot-select-group">
                    <label>
                        <svg viewBox="0 0 24 24" fill="none" style="width:13px;height:13px;"><rect x="2" y="7" width="20" height="10" rx="3" stroke="currentColor" stroke-width="1.8"/><circle cx="6" cy="17" r="2" stroke="currentColor" stroke-width="1.8"/><circle cx="18" cy="17" r="2" stroke="currentColor" stroke-width="1.8"/></svg>
                        Pilih Mobil
                    </label>
                    <select class="bpg-slot-select" data-slot-mobil="${g(e.value)}">
                        <option value="">— Belum ditentukan —</option>
                        ${l}
                    </select>
                </div>
            </div>

            ${Hs(t)}
        </article>`}function Gs(){const e=document.getElementById("bpg-slots-shell");e&&(e.innerHTML=`
            <div class="admin-users-loading-inline" style="padding:40px 0;">
                <span class="admin-users-loading-inline-spinner" aria-hidden="true"></span>
                <span>Memuat data penumpang...</span>
            </div>`)}function Js(){const e=document.getElementById("bpg-slots-shell");if(!e)return;const t={};Vn.forEach(a=>{t[a.value]=[]}),k.bookings.forEach(a=>{const o=(a.trip_time||"").trim().substring(0,5);t[o]&&t[o].push(a)});const n=Vn.map(a=>Vs(a,t[a.value]||[]));e.innerHTML=`<div class="bpg-slots-grid">${n.join("")}</div>`}async function xe(){k.loading=!0,Gs();try{const e=new URLSearchParams({date:k.date,direction:k.direction,limit:200,page:1}),t=await B(`/bookings?${e}`);k.bookings=Array.isArray(t)?t:[]}catch(e){k.bookings=[],e.status!==403&&v(e.message||"Gagal memuat data penumpang")}finally{k.loading=!1,Js()}}function Ks(e){document.getElementById("bpg-detail-title").textContent=e.nama_pemesanan||"-",document.getElementById("bpg-detail-subtitle").textContent=`${e.booking_code||"-"} · ${e.booking_status||"-"}`,document.getElementById("bpg-detail-full-link").href=`/dashboard/bookings/${e.id}`,document.getElementById("bpg-detail-ticket-link").href=`/dashboard/bookings/${e.id}/ticket`;const t=document.getElementById("bpg-detail-body");t.innerHTML=`
        <div class="bpg-detail-grid">
            <div class="bpg-detail-item">
                <span>Nama Pemesanan</span>
                <strong>${g(e.nama_pemesanan||"-")}</strong>
            </div>
            <div class="bpg-detail-item">
                <span>No HP</span>
                <strong>${g(e.phone||"-")}</strong>
            </div>
            <div class="bpg-detail-item">
                <span>Kota Asal</span>
                <strong>${g(e.from_city||"-")}</strong>
            </div>
            <div class="bpg-detail-item">
                <span>Kota Tujuan</span>
                <strong>${g(e.to_city||"-")}</strong>
            </div>
            <div class="bpg-detail-item">
                <span>Tanggal Keberangkatan</span>
                <strong>${g(e.trip_date_label||"-")}</strong>
            </div>
            <div class="bpg-detail-item">
                <span>Waktu Keberangkatan</span>
                <strong>${g(e.trip_time||"-")}</strong>
            </div>
            <div class="bpg-detail-item">
                <span>Pilih Kursi</span>
                <strong>${g(e.selected_seats_label||"-")}</strong>
            </div>
            <div class="bpg-detail-item">
                <span>Jumlah Penumpang</span>
                <strong>${g(String(e.passenger_count||0))} Orang</strong>
            </div>
            <div class="bpg-detail-item">
                <span>Jenis Layanan</span>
                <strong>${g(e.service_type||"-")}</strong>
            </div>
            <div class="bpg-detail-item">
                <span>Biaya</span>
                <strong class="bpg-detail-price">${g(e.total_amount_formatted||"-")}</strong>
            </div>
            <div class="bpg-detail-item bpg-detail-item--full">
                <span>Alamat Penjemputan</span>
                <p>${g(e.pickup_location||"-")}</p>
            </div>
            <div class="bpg-detail-item bpg-detail-item--full">
                <span>Alamat Pengantaran</span>
                <p>${g(e.dropoff_location||"-")}</p>
            </div>
        </div>`,q("bpg-detail-modal")}function Ws(){return(k.formOptions?.seat_options||[]).map(e=>e.code)}function Zt(e){const t=new Map(Ws().map((n,a)=>[n,a]));return Array.from(new Set((e||[]).map(n=>String(n).trim()).filter(n=>t.has(n)))).sort((n,a)=>(t.get(n)??999)-(t.get(a)??999))}function ht(){return Number(document.getElementById("booking-passenger-count")?.value||0)}function zs(){const e=ht();return(k.formOptions?.seat_options||[]).filter(t=>!t.is_optional||e>=6).map(t=>t.code)}function Xs(){return k.formOptions?.payment_status_options||[]}function Zs(e){return e==="transfer"?["Belum Bayar","Menunggu Pembayaran","Menunggu Verifikasi","Dibayar"]:e==="qris"?["Belum Bayar","Menunggu Pembayaran","Dibayar"]:e==="cash"?["Belum Bayar","Dibayar Tunai"]:["Belum Bayar"]}function Qs(e){return e==="transfer"?"Menunggu Pembayaran":e==="qris"?"Dibayar":e==="cash"?"Dibayar Tunai":"Belum Bayar"}function Ys(e){return e==="transfer"?"Menunggu Verifikasi Pembayaran":e==="qris"||e==="cash"?"Diproses":"Draft"}function ei(e,t){if(!e||!t||e===t)return null;const a=(k.formOptions?.route_matrix||{})?.[e]?.[t];return a==null?null:Number(a)}function _e(){const e=document.getElementById("booking-from-city")?.value||"",t=document.getElementById("booking-to-city")?.value||"",n=ht(),a=ei(e,t),r=a!==null?a*n:null,o=document.getElementById("booking-price-per-seat"),s=document.getElementById("booking-total-amount");o&&(o.value=a!==null?P(a):""),s&&(s.value=r!==null?P(r):"")}function Qt(){const e=document.getElementById("booking-payment-method")?.value||"",t=document.getElementById("booking-payment-status"),n=document.getElementById("booking-booking-status"),a=document.getElementById("booking-bank-account-group"),r=document.getElementById("booking-bank-account-code"),o=Zs(e),s=t?.value||"";a&&(a.hidden=e!=="transfer"),r&&e!=="transfer"&&(r.value=""),t&&(t.innerHTML=Xs().filter(i=>o.includes(i.value)).map(i=>`<option value="${g(i.value)}">${g(i.label)}</option>`).join(""),t.value=o.includes(s)?s:Qs(e)),n&&(n.value=Ys(e))}function ti(){const e=document.getElementById("booking-selected-seats-inputs");e&&(e.innerHTML=k.selectedSeats.map(t=>`<input type="hidden" name="selected_seats[]" value="${g(t)}">`).join(""))}function ni(){const e=document.getElementById("booking-selected-seat-count"),t=document.getElementById("booking-selected-seat-label");e&&(e.textContent=String(k.selectedSeats.length)),t&&(t.textContent=k.selectedSeats.length>0?k.selectedSeats.join(", "):"Belum dipilih")}function Pt(){document.querySelectorAll("[data-passenger-seat]").forEach(e=>{const t=e.dataset.passengerSeat;t&&(k.passengerDraftMap[t]={seat_no:t,name:e.querySelector("[data-passenger-name]")?.value.trim()||"",phone:e.querySelector("[data-passenger-phone]")?.value.trim()||""})})}function he(e=null){const t=document.getElementById("booking-passenger-editor");if(t){if(e&&(k.passengerDraftMap=Object.fromEntries(e.map(n=>[n.seat_no,n]))),k.selectedSeats.length===0){t.innerHTML='<div class="dashboard-empty-state dashboard-empty-state--block bookings-passenger-empty">Pilih kursi terlebih dahulu untuk menampilkan form data penumpang.</div>';return}t.innerHTML=`
        <div class="bookings-passenger-grid bookings-passenger-grid--editor">
            ${k.selectedSeats.map((n,a)=>{const r=k.passengerDraftMap[n]||{name:"",phone:""};return`
                    <article class="bookings-passenger-card bookings-passenger-card--editor" data-passenger-seat="${g(n)}">
                        <div class="bookings-passenger-form-head">
                            <span class="stock-value-badge stock-value-badge-blue">${g(n)}</span>
                            <strong>Penumpang ${a+1}</strong>
                            <p>${a===0?"Menjadi nama pemesanan utama.":"Data penumpang tambahan."}</p>
                        </div>
                        <div class="bookings-passenger-form-grid">
                            <div class="admin-users-form-group">
                                <label>Nama</label>
                                <div class="admin-users-input-shell">
                                    <input type="text" value="${g(r.name||"")}" placeholder="Masukkan nama penumpang" data-passenger-name>
                                </div>
                            </div>
                            <div class="admin-users-form-group">
                                <label>No HP</label>
                                <div class="admin-users-input-shell">
                                    <input type="text" value="${g(r.phone||"")}" placeholder="08xxxxxxxxxx" data-passenger-phone>
                                </div>
                            </div>
                        </div>
                    </article>`}).join("")}
        </div>`}}async function lt(){const e=document.getElementById("booking-trip-date")?.value||"",t=document.getElementById("booking-trip-time")?.value||"",n=k.editItem?.id||"";if(!e||!t){k.occupiedSeatsForForm=[];return}try{const a=new URLSearchParams({trip_date:e,trip_time:t});n&&a.set("exclude_id",n);const r=await B(`/bookings/occupied-seats?${a}`);k.occupiedSeatsForForm=Array.isArray(r?.occupied_seats)?r.occupied_seats:[]}catch{k.occupiedSeatsForForm=[]}}function ke(){const e=document.querySelectorAll("[data-seat-code]"),t=ht(),n=zs();k.selectedSeats=Zt(k.selectedSeats.filter(a=>n.includes(a)&&!k.occupiedSeatsForForm.includes(a))),e.forEach(a=>{const r=a.dataset.seatCode,o=n.includes(r),s=k.occupiedSeatsForForm.includes(r),i=k.selectedSeats.includes(r),m=k.selectedSeats.length>=t&&!i;a.hidden=!o,a.classList.toggle("is-selected",i),a.classList.toggle("is-occupied",s),a.classList.toggle("is-disabled",!s&&m),a.disabled=!o||s||!i&&m,s?a.title="Kursi sudah dipesan":a.title=""}),ti(),ni()}function $t(){document.getElementById("booking-form")?.reset(),k.editItem=null,k.selectedSeats=[],k.passengerDraftMap={};const t=k.date||He();document.getElementById("booking-id").value="",document.getElementById("booking-form-title").textContent="Tambah Pemesanan",document.getElementById("booking-form-description").textContent="Lengkapi data pemesanan reguler dari dashboard admin.",document.getElementById("booking-trip-date").value=t,document.getElementById("booking-passenger-count").value="1",document.getElementById("booking-payment-method").value="",document.getElementById("booking-booking-status").value="Draft",Qt(),_e(),le(document.getElementById("booking-submit-btn"),!1,"Menyimpan..."),lt().then(()=>{ke(),he()})}function ai(e){k.editItem=e,k.selectedSeats=Zt(e.selected_seats||[]),k.passengerDraftMap=Object.fromEntries((e.passengers||[]).map(t=>[t.seat_no,t])),document.getElementById("booking-id").value=e.id,document.getElementById("booking-booking-for").value=e.booking_for,document.getElementById("booking-category").value=e.category,document.getElementById("booking-from-city").value=e.from_city,document.getElementById("booking-to-city").value=e.to_city,document.getElementById("booking-trip-date").value=e.trip_date_value,document.getElementById("booking-trip-time").value=e.trip_time_value,document.getElementById("booking-passenger-count").value=String(e.passenger_count),document.getElementById("booking-driver-name").value=e.driver_name==="Menunggu Penetapan Driver"?"":e.driver_name||"",document.getElementById("booking-pickup-location").value=e.pickup_location,document.getElementById("booking-dropoff-location").value=e.dropoff_location,document.getElementById("booking-payment-method").value=e.payment_method_value||"",Qt(),document.getElementById("booking-payment-status").value=e.payment_status,document.getElementById("booking-booking-status").value=e.booking_status,document.getElementById("booking-bank-account-code").value=e.bank_account_code||"",document.getElementById("booking-notes").value=e.notes||"",document.getElementById("booking-form-title").textContent="Edit Pemesanan",document.getElementById("booking-form-description").textContent="Perbarui data pemesanan reguler yang dipilih.",_e(),le(document.getElementById("booking-submit-btn"),!1,"Menyimpan..."),lt().then(()=>{ke(),he(e.passengers||[])})}function ri(){return Pt(),{booking_for:document.getElementById("booking-booking-for")?.value||"",category:document.getElementById("booking-category")?.value||"Reguler",from_city:document.getElementById("booking-from-city")?.value||"",to_city:document.getElementById("booking-to-city")?.value||"",trip_date:document.getElementById("booking-trip-date")?.value||"",trip_time:document.getElementById("booking-trip-time")?.value||"",passenger_count:Number(document.getElementById("booking-passenger-count")?.value||0),driver_name:document.getElementById("booking-driver-name")?.value.trim()||"",pickup_location:document.getElementById("booking-pickup-location")?.value.trim()||"",dropoff_location:document.getElementById("booking-dropoff-location")?.value.trim()||"",selected_seats:k.selectedSeats,passengers:k.selectedSeats.map(e=>({seat_no:e,name:k.passengerDraftMap?.[e]?.name||"",phone:k.passengerDraftMap?.[e]?.phone||""})),payment_method:document.getElementById("booking-payment-method")?.value||"",payment_status:document.getElementById("booking-payment-status")?.value||"Belum Bayar",booking_status:document.getElementById("booking-booking-status")?.value||"Draft",bank_account_code:document.getElementById("booking-bank-account-code")?.value||"",notes:document.getElementById("booking-notes")?.value.trim()||""}}async function oi(e){ai(await B(`/bookings/${e}`)),q("booking-form-modal")}function si(e){k.deleteItem=e,document.getElementById("booking-delete-copy").innerHTML=`Apakah Anda yakin ingin menghapus data pemesanan <strong>${g(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`,q("booking-delete-modal")}function Gn(){const e=document.getElementById("bookings-access-note"),t=document.getElementById("bpg-route-tabs"),n=document.getElementById("bpg-slots-shell");e&&(e.hidden=!1),t&&(t.hidden=!0),n&&(n.hidden=!0)}function ii({user:e}={}){const t=document.getElementById("bookings-add-btn"),n=document.getElementById("bookings-date-picker"),a=document.getElementById("bpg-route-tabs"),r=document.getElementById("bpg-slots-shell"),o=document.getElementById("booking-form"),s=document.getElementById("booking-delete-confirm-btn"),i=document.getElementById("booking-seat-grid"),m=document.getElementById("booking-passenger-editor"),l=document.getElementById("booking-payment-method");if(k.formOptions=Ct("bookings-form-options"),k.drivers=Ct("bookings-drivers-data")||[],k.mobils=Ct("bookings-mobils-data")||[],k.currentUser=e||window.transitAuthUser||null,k.date=He(),!Ds(k.currentUser?.role)){Gn();return}a&&(a.hidden=!1),r&&(r.hidden=!1);const d=document.getElementById("bookings-access-note");d&&(d.hidden=!0),n&&(n.value=k.date,n.addEventListener("change",async()=>{k.date=n.value,k.slotDriverMap={},k.slotMobilMap={},await xe()})),a?.addEventListener("click",async f=>{const y=f.target.closest("[data-direction]");if(!y)return;const p=y.dataset.direction;p!==k.direction&&(k.direction=p,k.slotDriverMap={},k.slotMobilMap={},document.querySelectorAll(".bpg-route-tab").forEach(b=>{b.classList.toggle("is-active",b.dataset.direction===p)}),await xe())});function u(f=null){r?.querySelectorAll("[data-depart-dropdown]").forEach(y=>{String(y.dataset.departDropdown)!==String(f)&&(y.querySelector(".bpg-depart-menu")?.removeAttribute("hidden"),y.querySelector(".bpg-depart-menu")?.setAttribute("hidden",""))})}return document.addEventListener("click",f=>{f.target.closest("[data-depart-dropdown]")||u()}),r?.addEventListener("click",async f=>{const y=f.target.closest("[data-depart-toggle]"),p=f.target.closest("[data-booking-departure]"),b=f.target.closest("[data-booking-lihat]"),h=f.target.closest("[data-booking-edit]"),L=f.target.closest("[data-booking-delete]");try{if(y){const R=y.dataset.departToggle,M=r.querySelector(`[data-depart-dropdown="${CSS.escape(R)}"]`)?.querySelector(".bpg-depart-menu");if(!M)return;const O=M.hasAttribute("hidden");u(R),M.toggleAttribute("hidden",!O);return}if(p){const R=p.dataset.bookingDeparture,T=p.dataset.departureStatus,M=k.bookings.find(U=>String(U.id)===String(R));if(!M)return;const O=M.departure_status===T?"":T;M.departure_status=O;const H=r.querySelector(`[data-depart-dropdown="${CSS.escape(R)}"]`);if(H){const U=H.querySelector(".bpg-depart-trigger"),Q=departureStatusMeta(O);U.className=`bpg-depart-trigger ${Q.cls}`,U.childNodes.forEach(z=>{z.nodeType===3&&(z.textContent=Q.label)}),H.querySelectorAll("[data-booking-departure]").forEach(z=>{z.classList.toggle("is-active",z.dataset.departureStatus===O)}),H.querySelector(".bpg-depart-menu")?.setAttribute("hidden","")}await B(`/bookings/${R}/departure-status`,{method:"PATCH",body:{departure_status:O}});return}if(b){const R=b.dataset.bookingLihat,T=k.bookings.find(M=>String(M.id)===String(R));T&&Ks(T);return}if(h){await oi(h.dataset.bookingEdit);return}L&&si({id:L.dataset.bookingDelete,nama:L.dataset.bookingName})}catch(R){v(R.message||"Gagal memuat data pemesanan")}}),r?.addEventListener("change",async f=>{const y=f.target.closest("[data-slot-driver]"),p=f.target.closest("[data-slot-mobil]");if(y){const b=y.dataset.slotDriver,h=y.value,L=y.options[y.selectedIndex],R=h&&L?.text.split(" (")[0]||"",T=`${b}__${k.direction}`;k.slotDriverMap[T]=h;try{await B("/bookings/slot-assign",{method:"PATCH",body:{trip_date:k.date,trip_time:b,direction:k.direction,driver_id:h||null,driver_name:R}}),D("Driver berhasil diperbarui")}catch(M){v(M.message||"Gagal memperbarui driver")}}if(p){const b=p.dataset.slotMobil,h=p.value,L=`${b}__${k.direction}`;k.slotMobilMap[L]=h}}),t?.addEventListener("click",()=>{$t(),q("booking-form-modal")}),i?.addEventListener("click",f=>{const y=f.target.closest("[data-seat-code]");if(!y||y.disabled)return;Pt();const p=y.dataset.seatCode;k.selectedSeats.includes(p)?k.selectedSeats=k.selectedSeats.filter(b=>b!==p):k.selectedSeats.length<ht()&&(k.selectedSeats=Zt([...k.selectedSeats,p])),ke(),he()}),document.getElementById("booking-passenger-count")?.addEventListener("change",()=>{Pt(),ke(),he(),_e()}),document.getElementById("booking-trip-date")?.addEventListener("change",()=>{lt().then(()=>{ke(),he()})}),document.getElementById("booking-trip-time")?.addEventListener("change",()=>{lt().then(()=>{ke(),he()})}),document.getElementById("booking-from-city")?.addEventListener("change",_e),document.getElementById("booking-to-city")?.addEventListener("change",_e),l?.addEventListener("change",Qt),m?.addEventListener("input",f=>{const y=f.target.closest("[data-passenger-seat]");if(!y)return;const p=y.dataset.passengerSeat;k.passengerDraftMap[p]={seat_no:p,name:y.querySelector("[data-passenger-name]")?.value.trim()||"",phone:y.querySelector("[data-passenger-phone]")?.value.trim()||""}}),o?.addEventListener("submit",async f=>{f.preventDefault();const y=document.getElementById("booking-submit-btn");le(y,!0,"Menyimpan...");try{const p=ri();k.editItem?(await B(`/bookings/${k.editItem.id}`,{method:"PUT",body:p}),D("Data pemesanan berhasil diperbarui")):(await B("/bookings",{method:"POST",body:p}),D("Data pemesanan berhasil ditambahkan")),J("booking-form-modal"),$t(),await xe()}catch(p){v(p.message||"Silakan periksa kembali data yang diinput","Gagal menyimpan data pemesanan")}finally{le(y,!1,"Menyimpan...")}}),s?.addEventListener("click",async()=>{if(k.deleteItem){le(s,!0,"Menghapus...");try{await B(`/bookings/${k.deleteItem.id}`,{method:"DELETE"}),D("Data pemesanan berhasil dihapus"),J("booking-delete-modal"),k.deleteItem=null,await xe()}catch(f){v(f.message||"Gagal menghapus data pemesanan")}finally{le(s,!1,"Menghapus...")}}}),$t(),xe().catch(f=>{if(f.status===403){Gn();return}v(f.message||"Gagal memuat data penumpang")})}function li(e){const t=document.getElementById(e);if(!t)return{};try{return JSON.parse(t.textContent||"{}")}catch{return{}}}function di(){const e=document.querySelector("[data-regular-booking-page]");if(!e)return;const t=li("regular-booking-route-matrix"),n=e.querySelector("[data-booking-origin]"),a=e.querySelector("[data-booking-destination]"),r=e.querySelector("[data-booking-schedule]"),o=e.querySelector("[data-booking-passengers]"),s=e.querySelector("[data-route-fare-input]"),i=e.querySelector("[data-additional-fare-input]"),m=e.querySelector("[data-estimated-total-input]"),l=e.querySelector("[data-route-feedback]"),d=e.querySelector("[data-route-feedback-title]"),u=e.querySelector("[data-route-feedback-text]"),f=e.querySelector("[data-booking-submit]"),y=Array.from(e.querySelectorAll("[data-booking-type]")),p=e.querySelector("[data-summary-booking-for]"),b=e.querySelector("[data-summary-route]"),h=e.querySelector("[data-summary-schedule]"),L=e.querySelector("[data-summary-passengers]"),R=e.querySelector("[data-summary-fare]"),T=e.querySelector("[data-summary-additional-fare]"),M=e.querySelector("[data-summary-total]"),O=new Map(y.map(_=>[_.value,_.dataset.label||_.value])),H=new Map(Array.from(r?.options||[]).filter(_=>_.value).map(_=>[_.value,_.textContent.trim()]));function U(_,j){if(!_||!j||_===j)return null;const G=t?.[_]?.[j];return G==null?null:Number(G)}function Q(_,j,G){!l||!d||!u||(l.dataset.state=_,d.textContent=j,u.textContent=G)}function z(){e.querySelectorAll(".regular-booking-radio").forEach(_=>{const j=_.querySelector('input[type="radio"]');_.classList.toggle("is-selected",!!j?.checked)})}function Fe(_){return _<=0?"Belum dipilih":_===6?"6 Penumpang (Opsional tambahan)":`${_} Penumpang`}function ne(){const _=n?.value||"",j=a?.value||"",G=r?.value||"",ue=Number(o?.value||0),F=y.find(kt=>kt.checked)?.value||"",Y=U(_,j),X=Math.max(parseInt(i?.value||"0",10)||0,0),oe=Y!==null&&ue>0?(Y+X)*ue:null;s&&(s.value=Y!==null?P(Y):""),m&&(m.value=oe!==null?P(oe):""),!_||!j?Q("idle","Tarif akan ditampilkan otomatis","Pilih asal dan tujuan untuk melihat tarif perjalanan reguler."):_===j?Q("error","Asal dan tujuan tidak boleh sama","Silakan pilih tujuan yang berbeda agar tarif dapat dihitung."):Y===null?Q("error","Rute belum tersedia","Rute yang Anda pilih saat ini belum tersedia. Silakan pilih kombinasi asal dan tujuan lain."):Q("ready","Rute tersedia","Tarif telah diisi otomatis berdasarkan kombinasi rute dua arah yang tersedia."),f&&(f.disabled=!!(_&&j&&(_===j||Y===null))),p&&(p.textContent=O.get(F)||"Belum dipilih"),b&&(b.textContent=_&&j?`${_} - ${j}`:"Belum dipilih"),h&&(h.textContent=H.get(G)||"Belum dipilih"),L&&(L.textContent=Fe(ue)),R&&(R.textContent=Y!==null?P(Y):"Belum tersedia"),T&&(T.textContent=X>0?P(X):"Tidak ada"),M&&(M.textContent=oe!==null?P(oe):"Belum tersedia"),z()}[n,a,r,o].forEach(_=>{_?.addEventListener("change",ne)}),i?.addEventListener("input",ne),y.forEach(_=>{_.addEventListener("change",ne)}),e.querySelector("form")?.addEventListener("reset",()=>{window.requestAnimationFrame(ne)}),ne()}function ci(){const e=document.querySelector("[data-regular-booking-seat-page]");if(!e)return;const t=Number(e.dataset.requiredSeatCount||0),n=Array.from(e.querySelectorAll("[data-seat-card]")),a=Array.from(e.querySelectorAll("[data-seat-input]")),r=e.querySelector("[data-seat-summary-count]"),o=e.querySelector("[data-seat-summary-list]"),s=e.querySelector("[data-seat-summary-remaining]"),i=e.querySelector("[data-seat-submit]"),m=e.querySelector("[data-seat-feedback]"),l=e.querySelector("[data-seat-feedback-title]"),d=e.querySelector("[data-seat-feedback-text]");function u(){return a.filter(b=>b.checked).map(b=>b.value)}function f(b){return b.length>0?b.join(", "):"Belum dipilih"}function y(b,h,L){!m||!l||!d||(m.dataset.state=b,l.textContent=h,d.textContent=L)}function p(){const b=u(),h=b.length,L=t>0&&h>=t;if(n.forEach(R=>{const T=R.querySelector("[data-seat-input]");if(!T)return;const M=T.disabled&&!T.checked&&R.classList.contains("is-occupied"),O=T.checked,H=M||L&&!O;M||(T.disabled=H),R.classList.toggle("is-selected",O),R.classList.toggle("is-disabled",!M&&H)}),r&&(r.textContent=`${h} dari ${t}`),o&&(o.textContent=f(b)),s&&(s.textContent=String(Math.max(t-h,0))),i&&(i.disabled=h!==t),h===0){y("idle","Pilih kursi sesuai jumlah penumpang","Jumlah kursi yang dipilih harus sama dengan jumlah penumpang pada booking draft.");return}if(h<t){y("idle","Pemilihan kursi belum lengkap",`Masih perlu memilih ${t-h} kursi lagi sebelum dapat melanjutkan.`);return}if(t===6){y("ready","Semua kursi sudah terisi","Jumlah penumpang 6 orang sudah terpenuhi dan kursi tambahan 2B ikut terpakai.");return}y("ready","Kursi sudah sesuai","Jumlah kursi yang dipilih sudah sesuai dengan jumlah penumpang dan siap disimpan.")}a.forEach(b=>{b.addEventListener("change",()=>{p()})}),p()}let Te=null,dt=!1,Jn="",ui=3e3,Kn=0;const ct=[],$=e=>document.getElementById(e);async function Ta(e){const t=e.trim();if(!t)return;const n=Date.now();if(!(t===Jn&&n-Kn<ui)){Jn=t,Kn=n,ye("Memproses scan…");try{const a=await B("/scan-qr",{method:"POST",body:{qr_token:t}});mi(a),gi(a),a.already_scanned?v(a.message,"Tiket Sudah Pernah Di-Scan"):a.is_newly_eligible?D(a.message,"🎉 Eligible Diskon!"):D(a.message,"Scan Berhasil")}catch(a){pi(a.message||"Scan gagal"),v(a.message||"Scan gagal","Scan Gagal")}finally{ye(dt?"Kamera aktif — arahkan ke QR code.":"")}}}function mi(e){$("qrscan-result-idle").hidden=!0,$("qrscan-result-card").hidden=!1;const t=e.booking||{},n=e.passenger||{},a=e.loyalty_count,r=e.loyalty_target,o=e.discount_eligible,s=Math.min(Math.round(a/r*100),100),i=e.already_scanned?"warn":e.success?"success":"error";$("qrscan-result-header").className="qrscan-result-header qrscan-result-header--"+i,$("qrscan-result-icon").innerHTML=e.already_scanned?ki():e.success?hi():Aa(),$("qrscan-result-title").textContent=t.booking_code||"-",$("qrscan-result-subtitle").textContent=e.message,$("qr-res-name").textContent=n.name||t.nama_pemesanan||"-",$("qr-res-code").textContent=t.booking_code||"-",$("qr-res-route").textContent=t.route_label||"-",$("qr-res-datetime").textContent=(t.trip_date||"-")+" "+(t.trip_time||""),$("qr-res-seats").textContent=n.seat_no||t.selected_seats||"-",$("qr-res-pax").textContent=(t.passenger_count||0)+" Orang",$("qr-res-loyalty-label").textContent=a+" / "+r,$("qr-res-loyalty-fill").style.width=s+"%",$("qr-res-loyalty-fill").className="qrscan-loyalty-fill"+(o?" qrscan-loyalty-fill--done":""),$("qr-res-loyalty-note").textContent=o?"✅ Eligible diskon "+(e.discount_percentage||50)+"%":"Perlu "+Math.max(r-a,0)+" perjalanan lagi untuk diskon."}function pi(e){$("qrscan-result-idle").hidden=!0,$("qrscan-result-card").hidden=!1,$("qrscan-result-header").className="qrscan-result-header qrscan-result-header--error",$("qrscan-result-icon").innerHTML=Aa(),$("qrscan-result-title").textContent="Scan Gagal",$("qrscan-result-subtitle").textContent=e,["qr-res-name","qr-res-code","qr-res-route","qr-res-datetime","qr-res-seats","qr-res-pax"].forEach(t=>{$(t).textContent="-"}),$("qr-res-loyalty-label").textContent="– / –",$("qr-res-loyalty-fill").style.width="0%",$("qr-res-loyalty-note").textContent=""}function gi(e){const t=e.booking,n=new Date().toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit",second:"2-digit"}),a=e.passenger||{};ct.unshift({booking:t,passenger:a,time:n,success:e.success,already_scanned:e.already_scanned,message:e.message}),La()}function La(){const e=$("qrscan-history-list");if(ct.length===0){e.innerHTML='<p class="qrscan-history-empty">Belum ada scan dalam sesi ini.</p>';return}e.innerHTML=ct.map(t=>{const n=t.already_scanned?"warn":t.success?"ok":"err",a=t.passenger&&t.passenger.name?t.passenger.name+(t.passenger.seat_no?" ("+t.passenger.seat_no+")":""):t.booking.nama_pemesanan||"-";return`
        <div class="qrscan-history-item qrscan-history-item--${n}">
            <div class="qrscan-history-dot"></div>
            <div class="qrscan-history-body">
                <strong>${g(t.booking.booking_code||"-")}</strong>
                <span>${g(a)}</span>
            </div>
            <span class="qrscan-history-time">${t.time}</span>
        </div>`}).join("")}function fi(){if(!window.Html5Qrcode){v("Library scanner tidak tersedia. Coba muat ulang halaman.","Error");return}$("qrscan-placeholder").hidden=!0,$("qrscan-frame").hidden=!1,$("qrscan-btn-start").hidden=!0,$("qrscan-btn-stop").hidden=!1,dt=!0,ye("Menginisialisasi kamera…"),Te=new window.Html5Qrcode("qrscan-reader"),Te.start({facingMode:"environment"},{fps:10,qrbox:{width:240,height:240}},e=>{let t=e.trim();try{const n=JSON.parse(e);n&&n.qr_token&&(t=n.qr_token)}catch{}Ta(t)},()=>{}).then(()=>{ye("Kamera aktif — arahkan ke QR code.")}).catch(e=>{dt=!1,$("qrscan-placeholder").hidden=!1,$("qrscan-frame").hidden=!0,$("qrscan-btn-start").hidden=!1,$("qrscan-btn-stop").hidden=!0,ye("Gagal mengakses kamera. Pastikan izin kamera sudah diberikan."),v(String(e),"Kamera Error")})}function bi(){Te&&Te.stop().catch(()=>{}).finally(()=>{Te=null}),dt=!1,$("qrscan-placeholder").hidden=!1,$("qrscan-frame").hidden=!0,$("qrscan-btn-start").hidden=!1,$("qrscan-btn-stop").hidden=!0,ye("Kamera dihentikan.")}function ye(e){$("qrscan-status-text").textContent=e}function hi(){return`<svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
        <path d="M8 12l3 3 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`}function Aa(){return`<svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
        <path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`}function ki(){return`<svg viewBox="0 0 24 24" fill="none">
        <path d="M12 9v4M12 17h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    </svg>`}function yi(){$("qrscan-btn-start").addEventListener("click",fi),$("qrscan-btn-stop").addEventListener("click",bi),$("qrscan-clear-history").addEventListener("click",()=>{ct.length=0,La()}),$("qrscan-manual-form").addEventListener("submit",e=>{e.preventDefault();const t=$("qrscan-manual-input").value.trim();t&&(Ta(t),$("qrscan-manual-input").value="")})}const vi={"admin-users/index":Ms,"auth/login":$o,"bookings/index":ii,"dashboard/index":jo,"drivers/index":zo,"mobil/index":ss,"keberangkatan/index":ps,"regular-bookings/index":di,"regular-bookings/seats":ci,"stock/index":ys,"qr-scan/index":yi};document.addEventListener("DOMContentLoaded",async()=>{Bo(),Co(),Ze(va());const e=ho();e&&(e.type==="success"?D(e.message,e.title):e.type==="info"?Io(e.message,e.title):v(e.message,e.title));try{const{user:t}=await wo();t&&Ze(t);const n=document.body.dataset.pageScript,a=vi[n];typeof a=="function"&&await a({user:t})}catch(t){console.error(t),v(t.message||"Terjadi kesalahan saat memuat halaman")}});
