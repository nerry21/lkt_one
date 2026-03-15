function Nn(e,t){return function(){return e.apply(t,arguments)}}const{toString:wa}=Object.prototype,{getPrototypeOf:_t}=Object,{iterator:rt,toStringTag:Un}=Symbol,ot=(e=>t=>{const n=wa.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),X=e=>(e=e.toLowerCase(),t=>ot(t)===e),st=e=>t=>typeof t===e,{isArray:be}=Array,ge=st("undefined");function _e(e){return e!==null&&!ge(e)&&e.constructor!==null&&!ge(e.constructor)&&V(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const qn=X("ArrayBuffer");function Ba(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&qn(e.buffer),t}const Ia=st("string"),V=st("function"),Hn=st("number"),xe=e=>e!==null&&typeof e=="object",Sa=e=>e===!0||e===!1,Ne=e=>{if(ot(e)!=="object")return!1;const t=_t(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Un in e)&&!(rt in e)},$a=e=>{if(!xe(e)||_e(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},Ca=X("Date"),_a=X("File"),xa=e=>!!(e&&typeof e.uri<"u"),Ta=e=>e&&typeof e.getParts<"u",La=X("Blob"),Aa=X("FileList"),Ra=e=>xe(e)&&V(e.pipe);function Ma(){return typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}}const Wt=Ma(),Kt=typeof Wt.FormData<"u"?Wt.FormData:void 0,Pa=e=>{let t;return e&&(Kt&&e instanceof Kt||V(e.append)&&((t=ot(e))==="formdata"||t==="object"&&V(e.toString)&&e.toString()==="[object FormData]"))},Oa=X("URLSearchParams"),[Da,ja,Na,Ua]=["ReadableStream","Request","Response","Headers"].map(X),qa=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function Te(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let a,r;if(typeof e!="object"&&(e=[e]),be(e))for(a=0,r=e.length;a<r;a++)t.call(null,e[a],a,e);else{if(_e(e))return;const o=n?Object.getOwnPropertyNames(e):Object.keys(e),s=o.length;let l;for(a=0;a<s;a++)l=o[a],t.call(null,e[l],l,e)}}function Fn(e,t){if(_e(e))return null;t=t.toLowerCase();const n=Object.keys(e);let a=n.length,r;for(;a-- >0;)if(r=n[a],t===r.toLowerCase())return r;return null}const re=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,Vn=e=>!ge(e)&&e!==re;function vt(){const{caseless:e,skipUndefined:t}=Vn(this)&&this||{},n={},a=(r,o)=>{if(o==="__proto__"||o==="constructor"||o==="prototype")return;const s=e&&Fn(n,o)||o;Ne(n[s])&&Ne(r)?n[s]=vt(n[s],r):Ne(r)?n[s]=vt({},r):be(r)?n[s]=r.slice():(!t||!ge(r))&&(n[s]=r)};for(let r=0,o=arguments.length;r<o;r++)arguments[r]&&Te(arguments[r],a);return n}const Ha=(e,t,n,{allOwnKeys:a}={})=>(Te(t,(r,o)=>{n&&V(r)?Object.defineProperty(e,o,{value:Nn(r,n),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(e,o,{value:r,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:a}),e),Fa=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),Va=(e,t,n,a)=>{e.prototype=Object.create(t.prototype,a),Object.defineProperty(e.prototype,"constructor",{value:e,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},Ga=(e,t,n,a)=>{let r,o,s;const l={};if(t=t||{},e==null)return t;do{for(r=Object.getOwnPropertyNames(e),o=r.length;o-- >0;)s=r[o],(!a||a(s,e,t))&&!l[s]&&(t[s]=e[s],l[s]=!0);e=n!==!1&&_t(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},Ja=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const a=e.indexOf(t,n);return a!==-1&&a===n},Wa=e=>{if(!e)return null;if(be(e))return e;let t=e.length;if(!Hn(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},Ka=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&_t(Uint8Array)),za=(e,t)=>{const a=(e&&e[rt]).call(e);let r;for(;(r=a.next())&&!r.done;){const o=r.value;t.call(e,o[0],o[1])}},Xa=(e,t)=>{let n;const a=[];for(;(n=e.exec(t))!==null;)a.push(n);return a},Za=X("HTMLFormElement"),Qa=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,a,r){return a.toUpperCase()+r}),zt=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),Ya=X("RegExp"),Gn=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),a={};Te(n,(r,o)=>{let s;(s=t(r,o,e))!==!1&&(a[o]=s||r)}),Object.defineProperties(e,a)},er=e=>{Gn(e,(t,n)=>{if(V(e)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const a=e[n];if(V(a)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},tr=(e,t)=>{const n={},a=r=>{r.forEach(o=>{n[o]=!0})};return be(e)?a(e):a(String(e).split(t)),n},nr=()=>{},ar=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function rr(e){return!!(e&&V(e.append)&&e[Un]==="FormData"&&e[rt])}const or=e=>{const t=new Array(10),n=(a,r)=>{if(xe(a)){if(t.indexOf(a)>=0)return;if(_e(a))return a;if(!("toJSON"in a)){t[r]=a;const o=be(a)?[]:{};return Te(a,(s,l)=>{const m=n(s,r+1);!ge(m)&&(o[l]=m)}),t[r]=void 0,o}}return a};return n(e,0)},sr=X("AsyncFunction"),ir=e=>e&&(xe(e)||V(e))&&V(e.then)&&V(e.catch),Jn=((e,t)=>e?setImmediate:t?((n,a)=>(re.addEventListener("message",({source:r,data:o})=>{r===re&&o===n&&a.length&&a.shift()()},!1),r=>{a.push(r),re.postMessage(n,"*")}))(`axios@${Math.random()}`,[]):n=>setTimeout(n))(typeof setImmediate=="function",V(re.postMessage)),lr=typeof queueMicrotask<"u"?queueMicrotask.bind(re):typeof process<"u"&&process.nextTick||Jn,dr=e=>e!=null&&V(e[rt]),c={isArray:be,isArrayBuffer:qn,isBuffer:_e,isFormData:Pa,isArrayBufferView:Ba,isString:Ia,isNumber:Hn,isBoolean:Sa,isObject:xe,isPlainObject:Ne,isEmptyObject:$a,isReadableStream:Da,isRequest:ja,isResponse:Na,isHeaders:Ua,isUndefined:ge,isDate:Ca,isFile:_a,isReactNativeBlob:xa,isReactNative:Ta,isBlob:La,isRegExp:Ya,isFunction:V,isStream:Ra,isURLSearchParams:Oa,isTypedArray:Ka,isFileList:Aa,forEach:Te,merge:vt,extend:Ha,trim:qa,stripBOM:Fa,inherits:Va,toFlatObject:Ga,kindOf:ot,kindOfTest:X,endsWith:Ja,toArray:Wa,forEachEntry:za,matchAll:Xa,isHTMLForm:Za,hasOwnProperty:zt,hasOwnProp:zt,reduceDescriptors:Gn,freezeMethods:er,toObjectSet:tr,toCamelCase:Qa,noop:nr,toFiniteNumber:ar,findKey:Fn,global:re,isContextDefined:Vn,isSpecCompliantForm:rr,toJSONObject:or,isAsyncFn:sr,isThenable:ir,setImmediate:Jn,asap:lr,isIterable:dr};let w=class Wn extends Error{static from(t,n,a,r,o,s){const l=new Wn(t.message,n||t.code,a,r,o);return l.cause=t,l.name=t.name,t.status!=null&&l.status==null&&(l.status=t.status),s&&Object.assign(l,s),l}constructor(t,n,a,r,o){super(t),Object.defineProperty(this,"message",{value:t,enumerable:!0,writable:!0,configurable:!0}),this.name="AxiosError",this.isAxiosError=!0,n&&(this.code=n),a&&(this.config=a),r&&(this.request=r),o&&(this.response=o,this.status=o.status)}toJSON(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:c.toJSONObject(this.config),code:this.code,status:this.status}}};w.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";w.ERR_BAD_OPTION="ERR_BAD_OPTION";w.ECONNABORTED="ECONNABORTED";w.ETIMEDOUT="ETIMEDOUT";w.ERR_NETWORK="ERR_NETWORK";w.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";w.ERR_DEPRECATED="ERR_DEPRECATED";w.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";w.ERR_BAD_REQUEST="ERR_BAD_REQUEST";w.ERR_CANCELED="ERR_CANCELED";w.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";w.ERR_INVALID_URL="ERR_INVALID_URL";const cr=null;function Et(e){return c.isPlainObject(e)||c.isArray(e)}function Kn(e){return c.endsWith(e,"[]")?e.slice(0,-2):e}function mt(e,t,n){return e?e.concat(t).map(function(r,o){return r=Kn(r),!n&&o?"["+r+"]":r}).join(n?".":""):t}function ur(e){return c.isArray(e)&&!e.some(Et)}const mr=c.toFlatObject(c,{},null,function(t){return/^is[A-Z]/.test(t)});function it(e,t,n){if(!c.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=c.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(f,b){return!c.isUndefined(b[f])});const a=n.metaTokens,r=n.visitor||i,o=n.dots,s=n.indexes,m=(n.Blob||typeof Blob<"u"&&Blob)&&c.isSpecCompliantForm(t);if(!c.isFunction(r))throw new TypeError("visitor must be a function");function d(p){if(p===null)return"";if(c.isDate(p))return p.toISOString();if(c.isBoolean(p))return p.toString();if(!m&&c.isBlob(p))throw new w("Blob is not supported. Use a Buffer instead.");return c.isArrayBuffer(p)||c.isTypedArray(p)?m&&typeof Blob=="function"?new Blob([p]):Buffer.from(p):p}function i(p,f,b){let x=p;if(c.isReactNative(t)&&c.isReactNativeBlob(p))return t.append(mt(b,f,o),d(p)),!1;if(p&&!b&&typeof p=="object"){if(c.endsWith(f,"{}"))f=a?f:f.slice(0,-2),p=JSON.stringify(p);else if(c.isArray(p)&&ur(p)||(c.isFileList(p)||c.endsWith(f,"[]"))&&(x=c.toArray(p)))return f=Kn(f),x.forEach(function(L,M){!(c.isUndefined(L)||L===null)&&t.append(s===!0?mt([f],M,o):s===null?f:f+"[]",d(L))}),!1}return Et(p)?!0:(t.append(mt(b,f,o),d(p)),!1)}const u=[],k=Object.assign(mr,{defaultVisitor:i,convertValue:d,isVisitable:Et});function $(p,f){if(!c.isUndefined(p)){if(u.indexOf(p)!==-1)throw Error("Circular reference detected in "+f.join("."));u.push(p),c.forEach(p,function(x,R){(!(c.isUndefined(x)||x===null)&&r.call(t,x,c.isString(R)?R.trim():R,f,k))===!0&&$(x,f?f.concat(R):[R])}),u.pop()}}if(!c.isObject(e))throw new TypeError("data must be an object");return $(e),t}function Xt(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(a){return t[a]})}function xt(e,t){this._pairs=[],e&&it(e,this,t)}const zn=xt.prototype;zn.append=function(t,n){this._pairs.push([t,n])};zn.toString=function(t){const n=t?function(a){return t.call(this,a,Xt)}:Xt;return this._pairs.map(function(r){return n(r[0])+"="+n(r[1])},"").join("&")};function gr(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function Xn(e,t,n){if(!t)return e;const a=n&&n.encode||gr,r=c.isFunction(n)?{serialize:n}:n,o=r&&r.serialize;let s;if(o?s=o(t,r):s=c.isURLSearchParams(t)?t.toString():new xt(t,r).toString(a),s){const l=e.indexOf("#");l!==-1&&(e=e.slice(0,l)),e+=(e.indexOf("?")===-1?"?":"&")+s}return e}class Zt{constructor(){this.handlers=[]}use(t,n,a){return this.handlers.push({fulfilled:t,rejected:n,synchronous:a?a.synchronous:!1,runWhen:a?a.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){c.forEach(this.handlers,function(a){a!==null&&t(a)})}}const Tt={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0},pr=typeof URLSearchParams<"u"?URLSearchParams:xt,fr=typeof FormData<"u"?FormData:null,br=typeof Blob<"u"?Blob:null,hr={isBrowser:!0,classes:{URLSearchParams:pr,FormData:fr,Blob:br},protocols:["http","https","file","blob","url","data"]},Lt=typeof window<"u"&&typeof document<"u",wt=typeof navigator=="object"&&navigator||void 0,kr=Lt&&(!wt||["ReactNative","NativeScript","NS"].indexOf(wt.product)<0),yr=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",vr=Lt&&window.location.href||"http://localhost",Er=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:Lt,hasStandardBrowserEnv:kr,hasStandardBrowserWebWorkerEnv:yr,navigator:wt,origin:vr},Symbol.toStringTag,{value:"Module"})),q={...Er,...hr};function wr(e,t){return it(e,new q.classes.URLSearchParams,{visitor:function(n,a,r,o){return q.isNode&&c.isBuffer(n)?(this.append(a,n.toString("base64")),!1):o.defaultVisitor.apply(this,arguments)},...t})}function Br(e){return c.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function Ir(e){const t={},n=Object.keys(e);let a;const r=n.length;let o;for(a=0;a<r;a++)o=n[a],t[o]=e[o];return t}function Zn(e){function t(n,a,r,o){let s=n[o++];if(s==="__proto__")return!0;const l=Number.isFinite(+s),m=o>=n.length;return s=!s&&c.isArray(r)?r.length:s,m?(c.hasOwnProp(r,s)?r[s]=[r[s],a]:r[s]=a,!l):((!r[s]||!c.isObject(r[s]))&&(r[s]=[]),t(n,a,r[s],o)&&c.isArray(r[s])&&(r[s]=Ir(r[s])),!l)}if(c.isFormData(e)&&c.isFunction(e.entries)){const n={};return c.forEachEntry(e,(a,r)=>{t(Br(a),r,n,0)}),n}return null}function Sr(e,t,n){if(c.isString(e))try{return(t||JSON.parse)(e),c.trim(e)}catch(a){if(a.name!=="SyntaxError")throw a}return(n||JSON.stringify)(e)}const Le={transitional:Tt,adapter:["xhr","http","fetch"],transformRequest:[function(t,n){const a=n.getContentType()||"",r=a.indexOf("application/json")>-1,o=c.isObject(t);if(o&&c.isHTMLForm(t)&&(t=new FormData(t)),c.isFormData(t))return r?JSON.stringify(Zn(t)):t;if(c.isArrayBuffer(t)||c.isBuffer(t)||c.isStream(t)||c.isFile(t)||c.isBlob(t)||c.isReadableStream(t))return t;if(c.isArrayBufferView(t))return t.buffer;if(c.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let l;if(o){if(a.indexOf("application/x-www-form-urlencoded")>-1)return wr(t,this.formSerializer).toString();if((l=c.isFileList(t))||a.indexOf("multipart/form-data")>-1){const m=this.env&&this.env.FormData;return it(l?{"files[]":t}:t,m&&new m,this.formSerializer)}}return o||r?(n.setContentType("application/json",!1),Sr(t)):t}],transformResponse:[function(t){const n=this.transitional||Le.transitional,a=n&&n.forcedJSONParsing,r=this.responseType==="json";if(c.isResponse(t)||c.isReadableStream(t))return t;if(t&&c.isString(t)&&(a&&!this.responseType||r)){const s=!(n&&n.silentJSONParsing)&&r;try{return JSON.parse(t,this.parseReviver)}catch(l){if(s)throw l.name==="SyntaxError"?w.from(l,w.ERR_BAD_RESPONSE,this,null,this.response):l}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:q.classes.FormData,Blob:q.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};c.forEach(["delete","get","head","post","put","patch"],e=>{Le.headers[e]={}});const $r=c.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),Cr=e=>{const t={};let n,a,r;return e&&e.split(`
`).forEach(function(s){r=s.indexOf(":"),n=s.substring(0,r).trim().toLowerCase(),a=s.substring(r+1).trim(),!(!n||t[n]&&$r[n])&&(n==="set-cookie"?t[n]?t[n].push(a):t[n]=[a]:t[n]=t[n]?t[n]+", "+a:a)}),t},Qt=Symbol("internals");function ye(e){return e&&String(e).trim().toLowerCase()}function Ue(e){return e===!1||e==null?e:c.isArray(e)?e.map(Ue):String(e)}function _r(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let a;for(;a=n.exec(e);)t[a[1]]=a[2];return t}const xr=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function gt(e,t,n,a,r){if(c.isFunction(a))return a.call(this,t,n);if(r&&(t=n),!!c.isString(t)){if(c.isString(a))return t.indexOf(a)!==-1;if(c.isRegExp(a))return a.test(t)}}function Tr(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,a)=>n.toUpperCase()+a)}function Lr(e,t){const n=c.toCamelCase(" "+t);["get","set","has"].forEach(a=>{Object.defineProperty(e,a+n,{value:function(r,o,s){return this[a].call(this,t,r,o,s)},configurable:!0})})}let G=class{constructor(t){t&&this.set(t)}set(t,n,a){const r=this;function o(l,m,d){const i=ye(m);if(!i)throw new Error("header name must be a non-empty string");const u=c.findKey(r,i);(!u||r[u]===void 0||d===!0||d===void 0&&r[u]!==!1)&&(r[u||m]=Ue(l))}const s=(l,m)=>c.forEach(l,(d,i)=>o(d,i,m));if(c.isPlainObject(t)||t instanceof this.constructor)s(t,n);else if(c.isString(t)&&(t=t.trim())&&!xr(t))s(Cr(t),n);else if(c.isObject(t)&&c.isIterable(t)){let l={},m,d;for(const i of t){if(!c.isArray(i))throw TypeError("Object iterator must return a key-value pair");l[d=i[0]]=(m=l[d])?c.isArray(m)?[...m,i[1]]:[m,i[1]]:i[1]}s(l,n)}else t!=null&&o(n,t,a);return this}get(t,n){if(t=ye(t),t){const a=c.findKey(this,t);if(a){const r=this[a];if(!n)return r;if(n===!0)return _r(r);if(c.isFunction(n))return n.call(this,r,a);if(c.isRegExp(n))return n.exec(r);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=ye(t),t){const a=c.findKey(this,t);return!!(a&&this[a]!==void 0&&(!n||gt(this,this[a],a,n)))}return!1}delete(t,n){const a=this;let r=!1;function o(s){if(s=ye(s),s){const l=c.findKey(a,s);l&&(!n||gt(a,a[l],l,n))&&(delete a[l],r=!0)}}return c.isArray(t)?t.forEach(o):o(t),r}clear(t){const n=Object.keys(this);let a=n.length,r=!1;for(;a--;){const o=n[a];(!t||gt(this,this[o],o,t,!0))&&(delete this[o],r=!0)}return r}normalize(t){const n=this,a={};return c.forEach(this,(r,o)=>{const s=c.findKey(a,o);if(s){n[s]=Ue(r),delete n[o];return}const l=t?Tr(o):String(o).trim();l!==o&&delete n[o],n[l]=Ue(r),a[l]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return c.forEach(this,(a,r)=>{a!=null&&a!==!1&&(n[r]=t&&c.isArray(a)?a.join(", "):a)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const a=new this(t);return n.forEach(r=>a.set(r)),a}static accessor(t){const a=(this[Qt]=this[Qt]={accessors:{}}).accessors,r=this.prototype;function o(s){const l=ye(s);a[l]||(Lr(r,s),a[l]=!0)}return c.isArray(t)?t.forEach(o):o(t),this}};G.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);c.reduceDescriptors(G.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(a){this[n]=a}}});c.freezeMethods(G);function pt(e,t){const n=this||Le,a=t||n,r=G.from(a.headers);let o=a.data;return c.forEach(e,function(l){o=l.call(n,o,r.normalize(),t?t.status:void 0)}),r.normalize(),o}function Qn(e){return!!(e&&e.__CANCEL__)}let Ae=class extends w{constructor(t,n,a){super(t??"canceled",w.ERR_CANCELED,n,a),this.name="CanceledError",this.__CANCEL__=!0}};function Yn(e,t,n){const a=n.config.validateStatus;!n.status||!a||a(n.status)?e(n):t(new w("Request failed with status code "+n.status,[w.ERR_BAD_REQUEST,w.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}function Ar(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function Rr(e,t){e=e||10;const n=new Array(e),a=new Array(e);let r=0,o=0,s;return t=t!==void 0?t:1e3,function(m){const d=Date.now(),i=a[o];s||(s=d),n[r]=m,a[r]=d;let u=o,k=0;for(;u!==r;)k+=n[u++],u=u%e;if(r=(r+1)%e,r===o&&(o=(o+1)%e),d-s<t)return;const $=i&&d-i;return $?Math.round(k*1e3/$):void 0}}function Mr(e,t){let n=0,a=1e3/t,r,o;const s=(d,i=Date.now())=>{n=i,r=null,o&&(clearTimeout(o),o=null),e(...d)};return[(...d)=>{const i=Date.now(),u=i-n;u>=a?s(d,i):(r=d,o||(o=setTimeout(()=>{o=null,s(r)},a-u)))},()=>r&&s(r)]}const Fe=(e,t,n=3)=>{let a=0;const r=Rr(50,250);return Mr(o=>{const s=o.loaded,l=o.lengthComputable?o.total:void 0,m=s-a,d=r(m),i=s<=l;a=s;const u={loaded:s,total:l,progress:l?s/l:void 0,bytes:m,rate:d||void 0,estimated:d&&l&&i?(l-s)/d:void 0,event:o,lengthComputable:l!=null,[t?"download":"upload"]:!0};e(u)},n)},Yt=(e,t)=>{const n=e!=null;return[a=>t[0]({lengthComputable:n,total:e,loaded:a}),t[1]]},en=e=>(...t)=>c.asap(()=>e(...t)),Pr=q.hasStandardBrowserEnv?((e,t)=>n=>(n=new URL(n,q.origin),e.protocol===n.protocol&&e.host===n.host&&(t||e.port===n.port)))(new URL(q.origin),q.navigator&&/(msie|trident)/i.test(q.navigator.userAgent)):()=>!0,Or=q.hasStandardBrowserEnv?{write(e,t,n,a,r,o,s){if(typeof document>"u")return;const l=[`${e}=${encodeURIComponent(t)}`];c.isNumber(n)&&l.push(`expires=${new Date(n).toUTCString()}`),c.isString(a)&&l.push(`path=${a}`),c.isString(r)&&l.push(`domain=${r}`),o===!0&&l.push("secure"),c.isString(s)&&l.push(`SameSite=${s}`),document.cookie=l.join("; ")},read(e){if(typeof document>"u")return null;const t=document.cookie.match(new RegExp("(?:^|; )"+e+"=([^;]*)"));return t?decodeURIComponent(t[1]):null},remove(e){this.write(e,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function Dr(e){return typeof e!="string"?!1:/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function jr(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function ea(e,t,n){let a=!Dr(t);return e&&(a||n==!1)?jr(e,t):t}const tn=e=>e instanceof G?{...e}:e;function ie(e,t){t=t||{};const n={};function a(d,i,u,k){return c.isPlainObject(d)&&c.isPlainObject(i)?c.merge.call({caseless:k},d,i):c.isPlainObject(i)?c.merge({},i):c.isArray(i)?i.slice():i}function r(d,i,u,k){if(c.isUndefined(i)){if(!c.isUndefined(d))return a(void 0,d,u,k)}else return a(d,i,u,k)}function o(d,i){if(!c.isUndefined(i))return a(void 0,i)}function s(d,i){if(c.isUndefined(i)){if(!c.isUndefined(d))return a(void 0,d)}else return a(void 0,i)}function l(d,i,u){if(u in t)return a(d,i);if(u in e)return a(void 0,d)}const m={url:o,method:o,data:o,baseURL:s,transformRequest:s,transformResponse:s,paramsSerializer:s,timeout:s,timeoutMessage:s,withCredentials:s,withXSRFToken:s,adapter:s,responseType:s,xsrfCookieName:s,xsrfHeaderName:s,onUploadProgress:s,onDownloadProgress:s,decompress:s,maxContentLength:s,maxBodyLength:s,beforeRedirect:s,transport:s,httpAgent:s,httpsAgent:s,cancelToken:s,socketPath:s,responseEncoding:s,validateStatus:l,headers:(d,i,u)=>r(tn(d),tn(i),u,!0)};return c.forEach(Object.keys({...e,...t}),function(i){if(i==="__proto__"||i==="constructor"||i==="prototype")return;const u=c.hasOwnProp(m,i)?m[i]:r,k=u(e[i],t[i],i);c.isUndefined(k)&&u!==l||(n[i]=k)}),n}const ta=e=>{const t=ie({},e);let{data:n,withXSRFToken:a,xsrfHeaderName:r,xsrfCookieName:o,headers:s,auth:l}=t;if(t.headers=s=G.from(s),t.url=Xn(ea(t.baseURL,t.url,t.allowAbsoluteUrls),e.params,e.paramsSerializer),l&&s.set("Authorization","Basic "+btoa((l.username||"")+":"+(l.password?unescape(encodeURIComponent(l.password)):""))),c.isFormData(n)){if(q.hasStandardBrowserEnv||q.hasStandardBrowserWebWorkerEnv)s.setContentType(void 0);else if(c.isFunction(n.getHeaders)){const m=n.getHeaders(),d=["content-type","content-length"];Object.entries(m).forEach(([i,u])=>{d.includes(i.toLowerCase())&&s.set(i,u)})}}if(q.hasStandardBrowserEnv&&(a&&c.isFunction(a)&&(a=a(t)),a||a!==!1&&Pr(t.url))){const m=r&&o&&Or.read(o);m&&s.set(r,m)}return t},Nr=typeof XMLHttpRequest<"u",Ur=Nr&&function(e){return new Promise(function(n,a){const r=ta(e);let o=r.data;const s=G.from(r.headers).normalize();let{responseType:l,onUploadProgress:m,onDownloadProgress:d}=r,i,u,k,$,p;function f(){$&&$(),p&&p(),r.cancelToken&&r.cancelToken.unsubscribe(i),r.signal&&r.signal.removeEventListener("abort",i)}let b=new XMLHttpRequest;b.open(r.method.toUpperCase(),r.url,!0),b.timeout=r.timeout;function x(){if(!b)return;const L=G.from("getAllResponseHeaders"in b&&b.getAllResponseHeaders()),U={data:!l||l==="text"||l==="json"?b.responseText:b.response,status:b.status,statusText:b.statusText,headers:L,config:e,request:b};Yn(function(F){n(F),f()},function(F){a(F),f()},U),b=null}"onloadend"in b?b.onloadend=x:b.onreadystatechange=function(){!b||b.readyState!==4||b.status===0&&!(b.responseURL&&b.responseURL.indexOf("file:")===0)||setTimeout(x)},b.onabort=function(){b&&(a(new w("Request aborted",w.ECONNABORTED,e,b)),b=null)},b.onerror=function(M){const U=M&&M.message?M.message:"Network Error",J=new w(U,w.ERR_NETWORK,e,b);J.event=M||null,a(J),b=null},b.ontimeout=function(){let M=r.timeout?"timeout of "+r.timeout+"ms exceeded":"timeout exceeded";const U=r.transitional||Tt;r.timeoutErrorMessage&&(M=r.timeoutErrorMessage),a(new w(M,U.clarifyTimeoutError?w.ETIMEDOUT:w.ECONNABORTED,e,b)),b=null},o===void 0&&s.setContentType(null),"setRequestHeader"in b&&c.forEach(s.toJSON(),function(M,U){b.setRequestHeader(U,M)}),c.isUndefined(r.withCredentials)||(b.withCredentials=!!r.withCredentials),l&&l!=="json"&&(b.responseType=r.responseType),d&&([k,p]=Fe(d,!0),b.addEventListener("progress",k)),m&&b.upload&&([u,$]=Fe(m),b.upload.addEventListener("progress",u),b.upload.addEventListener("loadend",$)),(r.cancelToken||r.signal)&&(i=L=>{b&&(a(!L||L.type?new Ae(null,e,b):L),b.abort(),b=null)},r.cancelToken&&r.cancelToken.subscribe(i),r.signal&&(r.signal.aborted?i():r.signal.addEventListener("abort",i)));const R=Ar(r.url);if(R&&q.protocols.indexOf(R)===-1){a(new w("Unsupported protocol "+R+":",w.ERR_BAD_REQUEST,e));return}b.send(o||null)})},qr=(e,t)=>{const{length:n}=e=e?e.filter(Boolean):[];if(t||n){let a=new AbortController,r;const o=function(d){if(!r){r=!0,l();const i=d instanceof Error?d:this.reason;a.abort(i instanceof w?i:new Ae(i instanceof Error?i.message:i))}};let s=t&&setTimeout(()=>{s=null,o(new w(`timeout of ${t}ms exceeded`,w.ETIMEDOUT))},t);const l=()=>{e&&(s&&clearTimeout(s),s=null,e.forEach(d=>{d.unsubscribe?d.unsubscribe(o):d.removeEventListener("abort",o)}),e=null)};e.forEach(d=>d.addEventListener("abort",o));const{signal:m}=a;return m.unsubscribe=()=>c.asap(l),m}},Hr=function*(e,t){let n=e.byteLength;if(n<t){yield e;return}let a=0,r;for(;a<n;)r=a+t,yield e.slice(a,r),a=r},Fr=async function*(e,t){for await(const n of Vr(e))yield*Hr(n,t)},Vr=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:n,value:a}=await t.read();if(n)break;yield a}}finally{await t.cancel()}},nn=(e,t,n,a)=>{const r=Fr(e,t);let o=0,s,l=m=>{s||(s=!0,a&&a(m))};return new ReadableStream({async pull(m){try{const{done:d,value:i}=await r.next();if(d){l(),m.close();return}let u=i.byteLength;if(n){let k=o+=u;n(k)}m.enqueue(new Uint8Array(i))}catch(d){throw l(d),d}},cancel(m){return l(m),r.return()}},{highWaterMark:2})},an=64*1024,{isFunction:je}=c,Gr=(({Request:e,Response:t})=>({Request:e,Response:t}))(c.global),{ReadableStream:rn,TextEncoder:on}=c.global,sn=(e,...t)=>{try{return!!e(...t)}catch{return!1}},Jr=e=>{e=c.merge.call({skipUndefined:!0},Gr,e);const{fetch:t,Request:n,Response:a}=e,r=t?je(t):typeof fetch=="function",o=je(n),s=je(a);if(!r)return!1;const l=r&&je(rn),m=r&&(typeof on=="function"?(p=>f=>p.encode(f))(new on):async p=>new Uint8Array(await new n(p).arrayBuffer())),d=o&&l&&sn(()=>{let p=!1;const f=new n(q.origin,{body:new rn,method:"POST",get duplex(){return p=!0,"half"}}).headers.has("Content-Type");return p&&!f}),i=s&&l&&sn(()=>c.isReadableStream(new a("").body)),u={stream:i&&(p=>p.body)};r&&["text","arrayBuffer","blob","formData","stream"].forEach(p=>{!u[p]&&(u[p]=(f,b)=>{let x=f&&f[p];if(x)return x.call(f);throw new w(`Response type '${p}' is not supported`,w.ERR_NOT_SUPPORT,b)})});const k=async p=>{if(p==null)return 0;if(c.isBlob(p))return p.size;if(c.isSpecCompliantForm(p))return(await new n(q.origin,{method:"POST",body:p}).arrayBuffer()).byteLength;if(c.isArrayBufferView(p)||c.isArrayBuffer(p))return p.byteLength;if(c.isURLSearchParams(p)&&(p=p+""),c.isString(p))return(await m(p)).byteLength},$=async(p,f)=>{const b=c.toFiniteNumber(p.getContentLength());return b??k(f)};return async p=>{let{url:f,method:b,data:x,signal:R,cancelToken:L,timeout:M,onDownloadProgress:U,onUploadProgress:J,responseType:F,headers:ke,withCredentials:Z="same-origin",fetchOptions:_}=ta(p),N=t||fetch;F=F?(F+"").toLowerCase():"text";let W=qr([R,L&&L.toAbortSignal()],M),Q=null;const Y=W&&W.unsubscribe&&(()=>{W.unsubscribe()});let z;try{if(J&&d&&b!=="get"&&b!=="head"&&(z=await $(ke,x))!==0){let ne=new n(f,{method:"POST",body:x,duplex:"half"}),le;if(c.isFormData(x)&&(le=ne.headers.get("content-type"))&&ke.setContentType(le),ne.body){const[ut,De]=Yt(z,Fe(en(J)));x=nn(ne.body,an,ut,De)}}c.isString(Z)||(Z=Z?"include":"omit");const j=o&&"credentials"in n.prototype,Oe={..._,signal:W,method:b.toUpperCase(),headers:ke.normalize().toJSON(),body:x,duplex:"half",credentials:j?Z:void 0};Q=o&&new n(f,Oe);let te=await(o?N(Q,_):N(f,Oe));const Gt=i&&(F==="stream"||F==="response");if(i&&(U||Gt&&Y)){const ne={};["status","statusText","headers"].forEach(Jt=>{ne[Jt]=te[Jt]});const le=c.toFiniteNumber(te.headers.get("content-length")),[ut,De]=U&&Yt(le,Fe(en(U),!0))||[];te=new a(nn(te.body,an,ut,()=>{De&&De(),Y&&Y()}),ne)}F=F||"text";let Ea=await u[c.findKey(u,F)||"text"](te,p);return!Gt&&Y&&Y(),await new Promise((ne,le)=>{Yn(ne,le,{data:Ea,headers:G.from(te.headers),status:te.status,statusText:te.statusText,config:p,request:Q})})}catch(j){throw Y&&Y(),j&&j.name==="TypeError"&&/Load failed|fetch/i.test(j.message)?Object.assign(new w("Network Error",w.ERR_NETWORK,p,Q,j&&j.response),{cause:j.cause||j}):w.from(j,j&&j.code,p,Q,j&&j.response)}}},Wr=new Map,na=e=>{let t=e&&e.env||{};const{fetch:n,Request:a,Response:r}=t,o=[a,r,n];let s=o.length,l=s,m,d,i=Wr;for(;l--;)m=o[l],d=i.get(m),d===void 0&&i.set(m,d=l?new Map:Jr(t)),i=d;return d};na();const At={http:cr,xhr:Ur,fetch:{get:na}};c.forEach(At,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const ln=e=>`- ${e}`,Kr=e=>c.isFunction(e)||e===null||e===!1;function zr(e,t){e=c.isArray(e)?e:[e];const{length:n}=e;let a,r;const o={};for(let s=0;s<n;s++){a=e[s];let l;if(r=a,!Kr(a)&&(r=At[(l=String(a)).toLowerCase()],r===void 0))throw new w(`Unknown adapter '${l}'`);if(r&&(c.isFunction(r)||(r=r.get(t))))break;o[l||"#"+s]=r}if(!r){const s=Object.entries(o).map(([m,d])=>`adapter ${m} `+(d===!1?"is not supported by the environment":"is not available in the build"));let l=n?s.length>1?`since :
`+s.map(ln).join(`
`):" "+ln(s[0]):"as no adapter specified";throw new w("There is no suitable adapter to dispatch the request "+l,"ERR_NOT_SUPPORT")}return r}const aa={getAdapter:zr,adapters:At};function ft(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new Ae(null,e)}function dn(e){return ft(e),e.headers=G.from(e.headers),e.data=pt.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),aa.getAdapter(e.adapter||Le.adapter,e)(e).then(function(a){return ft(e),a.data=pt.call(e,e.transformResponse,a),a.headers=G.from(a.headers),a},function(a){return Qn(a)||(ft(e),a&&a.response&&(a.response.data=pt.call(e,e.transformResponse,a.response),a.response.headers=G.from(a.response.headers))),Promise.reject(a)})}const ra="1.13.6",lt={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{lt[e]=function(a){return typeof a===e||"a"+(t<1?"n ":" ")+e}});const cn={};lt.transitional=function(t,n,a){function r(o,s){return"[Axios v"+ra+"] Transitional option '"+o+"'"+s+(a?". "+a:"")}return(o,s,l)=>{if(t===!1)throw new w(r(s," has been removed"+(n?" in "+n:"")),w.ERR_DEPRECATED);return n&&!cn[s]&&(cn[s]=!0,console.warn(r(s," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(o,s,l):!0}};lt.spelling=function(t){return(n,a)=>(console.warn(`${a} is likely a misspelling of ${t}`),!0)};function Xr(e,t,n){if(typeof e!="object")throw new w("options must be an object",w.ERR_BAD_OPTION_VALUE);const a=Object.keys(e);let r=a.length;for(;r-- >0;){const o=a[r],s=t[o];if(s){const l=e[o],m=l===void 0||s(l,o,e);if(m!==!0)throw new w("option "+o+" must be "+m,w.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new w("Unknown option "+o,w.ERR_BAD_OPTION)}}const qe={assertOptions:Xr,validators:lt},K=qe.validators;let se=class{constructor(t){this.defaults=t||{},this.interceptors={request:new Zt,response:new Zt}}async request(t,n){try{return await this._request(t,n)}catch(a){if(a instanceof Error){let r={};Error.captureStackTrace?Error.captureStackTrace(r):r=new Error;const o=r.stack?r.stack.replace(/^.+\n/,""):"";try{a.stack?o&&!String(a.stack).endsWith(o.replace(/^.+\n.+\n/,""))&&(a.stack+=`
`+o):a.stack=o}catch{}}throw a}}_request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=ie(this.defaults,n);const{transitional:a,paramsSerializer:r,headers:o}=n;a!==void 0&&qe.assertOptions(a,{silentJSONParsing:K.transitional(K.boolean),forcedJSONParsing:K.transitional(K.boolean),clarifyTimeoutError:K.transitional(K.boolean),legacyInterceptorReqResOrdering:K.transitional(K.boolean)},!1),r!=null&&(c.isFunction(r)?n.paramsSerializer={serialize:r}:qe.assertOptions(r,{encode:K.function,serialize:K.function},!0)),n.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?n.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:n.allowAbsoluteUrls=!0),qe.assertOptions(n,{baseUrl:K.spelling("baseURL"),withXsrfToken:K.spelling("withXSRFToken")},!0),n.method=(n.method||this.defaults.method||"get").toLowerCase();let s=o&&c.merge(o.common,o[n.method]);o&&c.forEach(["delete","get","head","post","put","patch","common"],p=>{delete o[p]}),n.headers=G.concat(s,o);const l=[];let m=!0;this.interceptors.request.forEach(function(f){if(typeof f.runWhen=="function"&&f.runWhen(n)===!1)return;m=m&&f.synchronous;const b=n.transitional||Tt;b&&b.legacyInterceptorReqResOrdering?l.unshift(f.fulfilled,f.rejected):l.push(f.fulfilled,f.rejected)});const d=[];this.interceptors.response.forEach(function(f){d.push(f.fulfilled,f.rejected)});let i,u=0,k;if(!m){const p=[dn.bind(this),void 0];for(p.unshift(...l),p.push(...d),k=p.length,i=Promise.resolve(n);u<k;)i=i.then(p[u++],p[u++]);return i}k=l.length;let $=n;for(;u<k;){const p=l[u++],f=l[u++];try{$=p($)}catch(b){f.call(this,b);break}}try{i=dn.call(this,$)}catch(p){return Promise.reject(p)}for(u=0,k=d.length;u<k;)i=i.then(d[u++],d[u++]);return i}getUri(t){t=ie(this.defaults,t);const n=ea(t.baseURL,t.url,t.allowAbsoluteUrls);return Xn(n,t.params,t.paramsSerializer)}};c.forEach(["delete","get","head","options"],function(t){se.prototype[t]=function(n,a){return this.request(ie(a||{},{method:t,url:n,data:(a||{}).data}))}});c.forEach(["post","put","patch"],function(t){function n(a){return function(o,s,l){return this.request(ie(l||{},{method:t,headers:a?{"Content-Type":"multipart/form-data"}:{},url:o,data:s}))}}se.prototype[t]=n(),se.prototype[t+"Form"]=n(!0)});let Zr=class oa{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(o){n=o});const a=this;this.promise.then(r=>{if(!a._listeners)return;let o=a._listeners.length;for(;o-- >0;)a._listeners[o](r);a._listeners=null}),this.promise.then=r=>{let o;const s=new Promise(l=>{a.subscribe(l),o=l}).then(r);return s.cancel=function(){a.unsubscribe(o)},s},t(function(o,s,l){a.reason||(a.reason=new Ae(o,s,l),n(a.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}toAbortSignal(){const t=new AbortController,n=a=>{t.abort(a)};return this.subscribe(n),t.signal.unsubscribe=()=>this.unsubscribe(n),t.signal}static source(){let t;return{token:new oa(function(r){t=r}),cancel:t}}};function Qr(e){return function(n){return e.apply(null,n)}}function Yr(e){return c.isObject(e)&&e.isAxiosError===!0}const Bt={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(Bt).forEach(([e,t])=>{Bt[t]=e});function sa(e){const t=new se(e),n=Nn(se.prototype.request,t);return c.extend(n,se.prototype,t,{allOwnKeys:!0}),c.extend(n,t,null,{allOwnKeys:!0}),n.create=function(r){return sa(ie(e,r))},n}const D=sa(Le);D.Axios=se;D.CanceledError=Ae;D.CancelToken=Zr;D.isCancel=Qn;D.VERSION=ra;D.toFormData=it;D.AxiosError=w;D.Cancel=D.CanceledError;D.all=function(t){return Promise.all(t)};D.spread=Qr;D.isAxiosError=Yr;D.mergeConfig=ie;D.AxiosHeaders=G;D.formToJSON=e=>Zn(c.isHTMLForm(e)?new FormData(e):e);D.getAdapter=aa.getAdapter;D.HttpStatusCode=Bt;D.default=D;const{Axios:ri,AxiosError:oi,CanceledError:si,isCancel:ii,CancelToken:li,VERSION:di,all:ci,Cancel:ui,isAxiosError:mi,spread:gi,toFormData:pi,AxiosHeaders:fi,HttpStatusCode:bi,formToJSON:hi,getAdapter:ki,mergeConfig:yi}=D;window.axios=D;window.axios.defaults.headers.common["X-Requested-With"]="XMLHttpRequest";const Rt="transit_user",Ve="transit_token",It="transit_pending_toast";function he(){try{return typeof window<"u"&&typeof window.localStorage<"u"}catch{return!1}}function ia(){try{return typeof window<"u"&&typeof window.sessionStorage<"u"}catch{return!1}}function eo(){if(window.transitAuthUser)return window.transitAuthUser;if(!he())return null;const e=window.localStorage.getItem(Rt);if(!e)return null;try{return JSON.parse(e)}catch{return Ie(),null}}function la(e){if(!he()){window.transitAuthUser=e;return}window.transitAuthUser=e,window.localStorage.setItem(Rt,JSON.stringify(e))}function to(){if(!he()){window.transitAuthUser=null;return}window.transitAuthUser=null,window.localStorage.removeItem(Rt)}function Mt(){return typeof window<"u"&&typeof window.transitAuthToken=="string"&&window.transitAuthToken!==""?window.transitAuthToken:he()?window.localStorage.getItem(Ve):null}function no(e){const t=typeof e=="string"?e:"";if(!he()){window.transitAuthToken=t||null;return}if(window.transitAuthToken=t||null,t===""){window.localStorage.removeItem(Ve);return}window.localStorage.setItem(Ve,t)}function ao(){if(!he()){window.transitAuthToken=null;return}window.transitAuthToken=null,window.localStorage.removeItem(Ve)}function ro(e){ia()&&window.sessionStorage.setItem(It,JSON.stringify(e))}function oo(){if(!ia())return null;const e=window.sessionStorage.getItem(It);if(!e)return null;window.sessionStorage.removeItem(It);try{return JSON.parse(e)}catch{return null}}function Ie(){to(),ao()}function da(e,t){if(!e)return t;if(typeof e.detail=="string"&&e.detail!=="")return e.detail;if(typeof e.message=="string"&&e.message!=="")return e.message;if(e.errors&&typeof e.errors=="object"){const n=Object.values(e.errors).flat()[0];if(typeof n=="string"&&n!=="")return n}return t}function un(){return document.body.dataset.apiBase||"/api"}function ca(e=""){const t=String(e).replace(/^\/+/,"");return t===""?un():`${un()}/${t}`}async function I(e,t={}){const{method:n="GET",body:a=null,headers:r={},auth:o=!0}=t,s=new Headers(r);s.set("Accept","application/json"),s.set("X-Requested-With","XMLHttpRequest");let l=a;if(a&&!(a instanceof FormData)&&!(a instanceof Blob)&&(s.set("Content-Type","application/json"),l=JSON.stringify(a)),o){const u=Mt();u&&s.set("Authorization",`Bearer ${u}`)}if(!["GET","HEAD","OPTIONS"].includes(n.toUpperCase())){const u=document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");u&&s.set("X-CSRF-TOKEN",u)}const m=await fetch(ca(e),{method:n,headers:s,body:l,credentials:"same-origin"});let d=null;const i=m.headers.get("content-type")||"";if(m.status!==204&&(d=i.includes("application/json")?await m.json():await m.text()),!m.ok){m.status===401&&(Ie(),(document.body.dataset.routeGuard||"none")==="protected"&&window.location.replace(document.body.dataset.loginUrl||"/login"));const u=da(d,`Request gagal (${m.status})`),k=new Error(u);throw k.status=m.status,k.data=d,k}return d}async function Pt(e,t="export.csv"){const n=new Headers({Accept:"text/csv,application/octet-stream","X-Requested-With":"XMLHttpRequest"}),a=Mt();a&&n.set("Authorization",`Bearer ${a}`);const r=await fetch(ca(e),{method:"GET",headers:n,credentials:"same-origin"});if(!r.ok){let u=null;throw(r.headers.get("content-type")||"").includes("application/json")&&(u=await r.json()),new Error(da(u,"Gagal mengunduh file"))}const o=await r.blob(),m=(r.headers.get("content-disposition")||"").match(/filename="?([^"]+)"?/i)?.[1]||t,d=window.URL.createObjectURL(o),i=document.createElement("a");i.href=d,i.download=m,document.body.appendChild(i),i.click(),i.remove(),window.URL.revokeObjectURL(d)}function ve(e,t){const n=document.getElementById(e);n&&(n.textContent=t)}function so(e){const t=e?.role||"";document.querySelectorAll("[data-role-scope]").forEach(n=>{const a=n.dataset.roleScope,r=a==="admin"?["Super Admin","Admin"].includes(t):a==="super"?t==="Super Admin":!0;n.hidden=!r})}function ua(){return eo()}function Ge(e){if(so(e),!e)return;const t=e.nama||"Admin",n=t.trim().split(/\s+/)[0]||"Admin",a=e.email||"admin@pekanbaru.com";ve("sidebar-user-name",t),ve("sidebar-user-email",a),ve("header-user-name",n),ve("dropdown-user-name",t),ve("dropdown-user-email",a)}function ma(e){return typeof e.access_token=="string"&&e.access_token!==""&&no(e.access_token),la(e.user),Ge(e.user),e}async function io(e){const t=await I("/auth/login",{method:"POST",body:e,auth:!1});return ma(t)}async function lo(e){const t=await I("/auth/register",{method:"POST",body:e,auth:!1});return ma(t)}async function mn(){const e=await I("/auth/me");return la(e),Ge(e),e}async function co(){try{await I("/auth/logout",{method:"POST"})}catch(e){if(e?.status!==401)throw e}Ie(),ro({type:"success",title:"Logout berhasil",message:"Sampai jumpa kembali!"}),window.location.replace(document.body.dataset.loginUrl||"/login")}function gn(e){window.location.replace(e)}async function uo(){const e=document.body.dataset.routeGuard||"none",t=document.body.dataset.loginUrl||"/login",n=document.body.dataset.dashboardUrl||"/dashboard",a=ua();if(e==="public"){try{const r=await mn();return gn(n),{user:r}}catch{(a||Mt())&&Ie()}return{user:null}}if(e==="protected")try{return{user:await mn()}}catch{return Ie(),gn(t),{user:null}}return{user:a}}function Ot(){return Array.from(document.querySelectorAll(".modal-shell")).filter(e=>!e.hidden)}function ga(){document.body.style.overflow=Ot().length>0?"hidden":""}function O(e){const t=document.getElementById(e);t&&(t.hidden=!1,ga())}function H(e=null){if(e){const t=document.getElementById(e);t&&(t.hidden=!0)}else Ot().forEach(t=>{t.hidden=!0});ga()}function mo(){document.addEventListener("click",e=>{const t=e.target.closest("[data-modal-open]");if(t){O(t.dataset.modalOpen);return}const n=e.target.closest("[data-modal-close]");if(n){const a=n.dataset.modalClose||n.closest(".modal-shell")?.id;H(a||void 0)}}),document.addEventListener("keydown",e=>{if(e.key!=="Escape")return;const t=Ot().pop();t&&H(t.id)})}function Dt(e,t,n){const a=document.getElementById("transit-toast-root");if(!a)return;const r=document.createElement("div");r.className=`transit-toast ${n==="error"?"is-error":""} ${n==="info"?"is-info":""}`.trim(),r.innerHTML=`
        <div>
            <strong>${e}</strong>
            <p>${t}</p>
        </div>
    `,a.appendChild(r),window.requestAnimationFrame(()=>{r.classList.add("is-visible")}),window.setTimeout(()=>{r.classList.remove("is-visible"),window.setTimeout(()=>r.remove(),180)},3600)}function P(e,t="Berhasil"){Dt(t,e,"success")}function y(e,t="Gagal"){Dt(t,e,"error")}function go(e,t="Info"){Dt(t,e,"info")}function Ee(e){const t=document.querySelector("[data-sidebar]"),n=document.querySelector("[data-sidebar-overlay]");!t||!n||(t.classList.toggle("is-open",e),n.hidden=!e)}function He(e=null){document.querySelectorAll("[data-user-dropdown]").forEach(t=>{if(e&&t===e)return;t.classList.remove("is-open");const n=t.querySelector("[data-user-menu-trigger]"),a=t.querySelector("[data-user-menu-panel]");n&&n.setAttribute("aria-expanded","false"),a&&(a.hidden=!0)})}function po(e,t=null){if(!e)return;const n=e.querySelector("[data-user-menu-trigger]"),a=e.querySelector("[data-user-menu-panel]"),r=t??!e.classList.contains("is-open");He(r?e:null),e.classList.toggle("is-open",r),n&&n.setAttribute("aria-expanded",r?"true":"false"),a&&(a.hidden=!r)}function fo(){document.querySelector("[data-sidebar-open]")?.addEventListener("click",()=>{Ee(!0)}),document.querySelector("[data-sidebar-close]")?.addEventListener("click",()=>{Ee(!1)}),document.querySelector("[data-sidebar-overlay]")?.addEventListener("click",()=>{Ee(!1)}),document.querySelectorAll("[data-user-dropdown]").forEach(e=>{e.querySelector("[data-user-menu-trigger]")?.addEventListener("click",t=>{t.stopPropagation(),po(e)})}),document.addEventListener("click",e=>{e.target.closest("[data-user-dropdown]")||He()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&(He(),Ee(!1))}),window.addEventListener("resize",()=>{window.innerWidth>1100&&Ee(!1)}),document.querySelectorAll("[data-auth-logout]").forEach(e=>{e.addEventListener("click",async()=>{H(),He();try{e.disabled=!0,await co()}catch(t){e.disabled=!1,y(t.message||"Gagal logout")}})})}const pa={login:{title:"Selamat Datang!",description:"Masuk ke akun Anda untuk melanjutkan",submit:"Masuk",switchText:"Belum punya akun?",switchAction:"Daftar sekarang"},register:{title:"Buat Akun Baru",description:"Daftar untuk mulai menggunakan sistem",submit:"Daftar",switchText:"Sudah punya akun?",switchAction:"Masuk"}};function pn(e,t){const n=pa[e];t.form.dataset.authMode=e,t.title.textContent=n.title,t.description.textContent=n.description,t.submitText.textContent=n.submit,t.switchText&&(t.switchText.textContent=n.switchText),t.switchButton&&(t.switchButton.textContent=n.switchAction),t.nameField.hidden=e!=="register",t.nameInput.required=e==="register"}function bo(){const e=document.getElementById("auth-form");if(!e)return;const t={form:e,title:document.querySelector("[data-auth-title]"),description:document.querySelector("[data-auth-description]"),submitText:document.querySelector("[data-auth-submit-text]"),switchText:document.querySelector("[data-auth-switch-text]"),switchButton:document.querySelector("[data-toggle-auth-mode]"),nameField:document.getElementById("auth-name-field"),nameInput:document.getElementById("nama"),emailInput:document.getElementById("email"),passwordInput:document.getElementById("password"),passwordToggle:document.querySelector("[data-toggle-password]"),submitButton:document.getElementById("auth-submit-button")},n=document.body.dataset.dashboardUrl||"/dashboard";pn("login",t),t.switchButton?.addEventListener("click",()=>{const a=t.form.dataset.authMode==="login"?"register":"login";pn(a,t)}),t.passwordToggle?.addEventListener("click",()=>{const a=t.passwordInput.type==="password"?"text":"password";t.passwordInput.type=a,t.passwordToggle.textContent=a==="password"?"Lihat":"Sembunyikan"}),e.addEventListener("submit",async a=>{a.preventDefault();const r=new FormData(e),o=e.dataset.authMode||"login",s={email:String(r.get("email")||"").trim(),password:String(r.get("password")||"").trim()};o==="register"&&(s.nama=String(r.get("nama")||"").trim()),t.submitButton.disabled=!0,t.submitText.textContent=o==="login"?"Memproses...":"Mendaftarkan...";try{o==="login"?(await io(s),P("Selamat datang kembali","Login berhasil!")):(await lo(s),P("Akun Anda telah dibuat","Registrasi berhasil!")),window.location.replace(n)}catch(l){y(l.message||"Terjadi kesalahan",o==="login"?"Login gagal":"Registrasi gagal")}finally{t.submitButton.disabled=!1,t.submitText.textContent=pa[o].submit}})}const ho=new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}),ko=new Intl.NumberFormat("id-ID");function A(e){return ho.format(Number(e)||0)}function T(e){return ko.format(Number(e)||0)}function g(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Re(e,t=300){let n=null;return(...a)=>{window.clearTimeout(n),n=window.setTimeout(()=>e(...a),t)}}function Me(e,t,n,a){if(n===0||a===0)return"Menampilkan 0 - 0 dari 0 data";const r=(e-1)*t+1,o=r+a-1;return`Menampilkan ${r} - ${o} dari ${n} data`}function yo(e){if(!e)return"-";const t=new Date(e);return Number.isNaN(t.getTime())?e:new Intl.DateTimeFormat("id-ID",{day:"2-digit",month:"short",year:"numeric"}).format(t)}function Pe(){return new Date().toISOString().slice(0,10)}function oe(e,t,n="Memproses..."){e&&(e.dataset.defaultText||(e.dataset.defaultText=e.textContent.trim()),e.disabled=t,e.textContent=t?n:e.dataset.defaultText)}const Je=["#059669","#10B981","#34D399","#6EE7B7","#A7F3D0"],ee={revenueChart:null,passengerChart:null,mobilChart:null};function vo(){const e=document.getElementById("dashboard-initial-state");if(!e)return{stats:{},revenueData:[],mobilRevenue:[]};try{return JSON.parse(e.textContent||"{}")}catch{return{stats:{},revenueData:[],mobilRevenue:[]}}}function jt(e){e&&typeof e.destroy=="function"&&e.destroy()}function Eo(e,t){const n=document.querySelector(`[data-stat="${e}"]`);if(!n)return;const a=["total_uang_bersih","total_uang_pc"];n.textContent=a.includes(e)?A(t):T(t)}function fa(e,t,n){const a=document.getElementById(e),r=document.getElementById(t);a&&(a.hidden=!n),r&&(r.hidden=n)}function wo(){return"#065f46"}function St(){return"#d1fae5"}function Nt(){return{backgroundColor:"#ffffff",titleColor:"#064e3b",bodyColor:"#065f46",borderColor:"#d1fae5",borderWidth:1,padding:12,cornerRadius:12,displayColors:!0}}function Bo(e){const t=document.getElementById("dashboard-revenue-chart"),n=Array.isArray(e)&&e.length>0;if(fa("dashboard-revenue-chart","dashboard-revenue-empty",n),jt(ee.revenueChart),!t||!window.Chart||!n){ee.revenueChart=null;return}ee.revenueChart=new window.Chart(t,{type:"line",data:{labels:e.map(a=>a.bulan),datasets:[{label:"Pendapatan Bersih",data:e.map(a=>a.uang_bersih),borderColor:"#059669",backgroundColor:"rgba(5, 150, 105, 0.08)",fill:!1,tension:.35,pointRadius:4,pointHoverRadius:5,pointBackgroundColor:"#059669",pointBorderColor:"#ffffff",pointBorderWidth:2,borderWidth:3},{label:"Uang PC",data:e.map(a=>a.uang_pc),borderColor:"#f59e0b",backgroundColor:"rgba(245, 158, 11, 0.1)",fill:!1,tension:.35,pointRadius:4,pointHoverRadius:5,pointBackgroundColor:"#f59e0b",pointBorderColor:"#ffffff",pointBorderWidth:2,borderWidth:3}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{labels:{color:wo(),usePointStyle:!0,pointStyle:"circle",boxWidth:8,boxHeight:8,padding:18}},tooltip:{...Nt(),callbacks:{label(a){return`${a.dataset.label}: ${A(a.parsed.y)}`}}}},scales:{x:{ticks:{color:"#047857",font:{size:12}},grid:{color:St()},border:{display:!1}},y:{ticks:{color:"#047857",font:{size:12},callback(a){return`${Math.round(Number(a)/1e6)}jt`}},grid:{color:St()},border:{display:!1}}}}})}function Io(e){const t=document.getElementById("dashboard-passenger-chart"),n=Array.isArray(e)&&e.length>0;if(fa("dashboard-passenger-chart","dashboard-passenger-empty",n),jt(ee.passengerChart),!t||!window.Chart||!n){ee.passengerChart=null;return}ee.passengerChart=new window.Chart(t,{type:"bar",data:{labels:e.map(a=>a.bulan),datasets:[{label:"Penumpang",data:e.map(a=>a.penumpang),backgroundColor:"#10B981",borderRadius:8,maxBarThickness:44}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{...Nt(),callbacks:{label(a){return`Penumpang: ${T(a.parsed.y)}`}}}},scales:{x:{ticks:{color:"#047857",font:{size:12}},grid:{color:"rgba(0, 0, 0, 0)"},border:{display:!1}},y:{ticks:{color:"#047857",font:{size:12}},grid:{color:St()},border:{display:!1}}}}})}function So(e){const t=document.getElementById("dashboard-mobil-list");t&&(t.innerHTML=e.map((n,a)=>`
        <div class="dashboard-mobil-item">
            <div class="dashboard-mobil-meta">
                <span class="dashboard-mobil-dot" style="background-color: ${Je[a%Je.length]}"></span>
                <div>
                    <p class="dashboard-mobil-code">${g(n.kode_mobil)}</p>
                    <p class="dashboard-mobil-trips">${T(n.total_trips)} trip</p>
                    <p class="dashboard-mobil-passengers">${T(n.total_penumpang)} penumpang</p>
                </div>
            </div>
            <p class="dashboard-mobil-value">${A(n.total_uang_bersih)}</p>
        </div>
    `).join(""))}function $o(e){const t=document.getElementById("dashboard-mobil-chart"),n=document.getElementById("dashboard-mobil-content"),a=document.getElementById("dashboard-mobil-empty"),r=document.getElementById("dashboard-mobil-chart-empty"),o=document.getElementById("dashboard-mobil-list"),s=Array.isArray(e)&&e.length>0,l=s&&e.some(m=>Number(m.total_uang_bersih)>0);if(jt(ee.mobilChart),n&&(n.hidden=!s),a&&(a.hidden=s),t&&(t.hidden=!l),r&&(r.hidden=l),s?So(e):o&&(o.innerHTML=""),!t||!window.Chart||!l){ee.mobilChart=null;return}ee.mobilChart=new window.Chart(t,{type:"doughnut",data:{labels:e.map(m=>m.kode_mobil),datasets:[{data:e.map(m=>m.total_uang_bersih),backgroundColor:e.map((m,d)=>Je[d%Je.length]),borderColor:"#ffffff",borderWidth:6,hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"58%",plugins:{legend:{display:!1},tooltip:{...Nt(),callbacks:{label(m){const d=e[m.dataIndex]||{};return`${m.label}: ${A(m.parsed)} / ${T(d.total_penumpang||0)} penumpang`}}}}}})}function fn(e){Object.entries(e.stats||{}).forEach(([t,n])=>Eo(t,n)),Bo(e.revenueData||[]),Io(e.revenueData||[]),$o(e.mobilRevenue||[])}async function Co(){const[e,t,n]=await Promise.all([I("/statistics/dashboard"),I("/statistics/revenue-chart"),I("/statistics/mobil-revenue")]);return{stats:e,revenueData:t,mobilRevenue:n}}function bn(e){const t=document.querySelector("[data-dashboard-loading]"),n=document.querySelector("[data-dashboard-content]"),a=document.getElementById("dashboard-refresh-btn");t&&(t.hidden=!e),n&&(n.hidden=e),a&&(a.disabled=e)}async function _o(){const e=document.getElementById("dashboard-refresh-btn");e&&(fn(vo()),e.addEventListener("click",async()=>{bn(!0);try{fn(await Co())}catch{y("Silakan coba lagi","Gagal memuat data")}finally{bn(!1)}}))}const C={data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1},pe=10;function xo(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function To(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 21C15 17.4 18 14.4 18 10.5C18 7.18629 15.3137 4.5 12 4.5C8.68629 4.5 6 7.18629 6 10.5C6 14.4 9 17.4 12 21Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
            <circle cx="12" cy="10.5" r="2.25" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function Lo(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Ao(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function We(e){const t=document.getElementById("driver-submit-btn");C.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":C.editItem?"Perbarui":"Simpan")}function Ro(){const e=document.getElementById("drivers-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="drivers-table-state">
                <div class="drivers-loading-inline">
                    <span class="drivers-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function Mo(){const e=document.getElementById("drivers-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="drivers-table-state drivers-empty-copy">
                Belum ada data driver
            </td>
        </tr>
    `)}function hn(){const e=document.getElementById("drivers-table-body");if(e){if(C.loading){Ro();return}if(C.data.length===0){Mo();return}e.innerHTML=C.data.map((t,n)=>`
        <tr class="drivers-row" data-testid="driver-row-${t.id}">
            <td class="drivers-index-cell">${(C.page-1)*pe+n+1}</td>
            <td>
                <div class="drivers-user-cell">
                    <span class="drivers-user-avatar" aria-hidden="true">
                        ${xo()}
                    </span>
                    <span class="drivers-user-name">${g(t.nama)}</span>
                </div>
            </td>
            <td>
                <div class="drivers-location-cell">
                    <span class="drivers-location-icon" aria-hidden="true">${To()}</span>
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
                        ${Lo()}
                    </button>
                    <button
                        class="drivers-icon-button drivers-icon-button-danger"
                        type="button"
                        data-driver-delete="${t.id}"
                        data-driver-name="${g(t.nama)}"
                        data-testid="delete-driver-${t.id}"
                        aria-label="Hapus driver ${g(t.nama)}"
                    >
                        ${Ao()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function kn(){const e=document.getElementById("drivers-pagination-shell"),t=document.getElementById("drivers-pagination-info"),n=document.getElementById("drivers-pagination-page"),a=document.getElementById("drivers-prev-page-btn"),r=document.getElementById("drivers-next-page-btn"),o=Math.max(1,Math.ceil(C.totalCount/pe));e&&(e.hidden=o<=1),t&&(t.textContent=Me(C.page,pe,C.totalCount,C.data.length)),n&&(n.textContent=`${C.page} / ${o}`),a&&(a.disabled=C.page===1),r&&(r.disabled=C.page>=o)}async function de(){C.loading=!0,hn(),kn();try{const[e,t]=await Promise.all([I(`/drivers?page=${C.page}&limit=${pe}${C.search?`&search=${encodeURIComponent(C.search)}`:""}`),I(`/drivers/count${C.search?`?search=${encodeURIComponent(C.search)}`:""}`)]);C.data=Array.isArray(e)?e:[],C.totalCount=Number(t.count||0)}finally{C.loading=!1,hn(),kn()}}function yn(){const e=document.getElementById("driver-form"),t=document.getElementById("driver-form-title"),n=document.getElementById("driver-form-description"),a=document.getElementById("driver-id"),r=document.getElementById("driver-nama"),o=document.getElementById("driver-lokasi");e?.reset(),a&&(a.value=""),r&&(r.value=""),o&&(o.value=""),t&&(t.textContent="Tambah Driver Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan data driver"),C.editItem=null,We(!1)}function Po(e){const t=document.getElementById("driver-form-title"),n=document.getElementById("driver-form-description"),a=document.getElementById("driver-id"),r=document.getElementById("driver-nama"),o=document.getElementById("driver-lokasi");C.editItem=e,a&&(a.value=e.id),r&&(r.value=e.nama),o&&(o.value=e.lokasi),t&&(t.textContent="Edit Data Driver"),n&&(n.textContent="Isi form di bawah untuk memperbarui data driver"),We(!1)}async function Oo(e){const t=await I(`/drivers/${e}`);Po(t),O("driver-form-modal")}function Do(e){const t=document.getElementById("driver-delete-copy");C.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus driver <strong>${g(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`),O("driver-delete-modal")}function jo(){const e=document.getElementById("drivers-add-btn"),t=document.getElementById("drivers-export-btn"),n=document.getElementById("drivers-search-input"),a=document.getElementById("driver-form"),r=document.getElementById("drivers-table-body"),o=document.getElementById("driver-delete-confirm-btn"),s=document.getElementById("drivers-prev-page-btn"),l=document.getElementById("drivers-next-page-btn");if(!(!e||!a||!r))return e.addEventListener("click",()=>{yn(),O("driver-form-modal")}),t?.addEventListener("click",()=>{Pt("/export/drivers/csv","drivers.csv").catch(()=>{y("Gagal mengunduh file")})}),n?.addEventListener("input",Re(async m=>{C.search=m.target.value.trim(),C.page=1;try{await de()}catch{y("Gagal memuat data")}})),a.addEventListener("submit",async m=>{m.preventDefault();const d={nama:document.getElementById("driver-nama")?.value.trim()||"",lokasi:document.getElementById("driver-lokasi")?.value.trim()||""};We(!0);try{C.editItem?(await I(`/drivers/${C.editItem.id}`,{method:"PUT",body:d}),P("Data driver berhasil diperbarui")):(await I("/drivers",{method:"POST",body:d}),P("Driver berhasil ditambahkan")),H("driver-form-modal"),yn(),await de()}catch(i){y(i.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{We(!1)}}),r.addEventListener("click",async m=>{const d=m.target.closest("[data-driver-edit]"),i=m.target.closest("[data-driver-delete]");try{if(d){await Oo(d.dataset.driverEdit);return}i&&Do({id:i.dataset.driverDelete,nama:i.dataset.driverName})}catch{y("Gagal memuat data")}}),o?.addEventListener("click",async()=>{if(C.deleteItem)try{await I(`/drivers/${C.deleteItem.id}`,{method:"DELETE"}),P("Driver berhasil dihapus"),H("driver-delete-modal"),(C.page-1)*pe>=C.totalCount-1&&C.page>1&&(C.page-=1),C.deleteItem=null,await de()}catch{y("Gagal menghapus data")}}),s?.addEventListener("click",async()=>{if(!(C.page<=1)){C.page-=1;try{await de()}catch{y("Gagal memuat data")}}}),l?.addEventListener("click",async()=>{const m=Math.max(1,Math.ceil(C.totalCount/pe));if(!(C.page>=m)){C.page+=1;try{await de()}catch{y("Gagal memuat data")}}}),de().catch(()=>{y("Gagal memuat data")})}const v={data:[],loading:!0,totalCount:0,page:1,search:"",filterJenis:"",editItem:null,deleteItem:null,isSubmitting:!1},fe=10;function No(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M5 14L6.6 9.2C6.8728 8.3816 7.6387 7.83 8.5014 7.83H15.4986C16.3613 7.83 17.1272 8.3816 17.4 9.2L19 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M4 14H20V17C20 18.1046 19.1046 19 18 19H6C4.89543 19 4 18.1046 4 17V14Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M7 16H7.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path>
            <path d="M17 16H17.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path>
        </svg>
    `}function Uo(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function qo(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Ho(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 13L11 22L2 13V4H11L20 13Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <circle cx="7.5" cy="8.5" r="1.5" fill="currentColor"></circle>
        </svg>
    `}function Ke(e){const t=document.getElementById("mobil-submit-btn");v.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":v.editItem?"Perbarui":"Simpan")}function Fo(e){return e==="Hiace"?"mobil-jenis-badge mobil-jenis-badge-hiace":"mobil-jenis-badge mobil-jenis-badge-reborn"}function Vo(){const e=document.getElementById("mobil-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="mobil-table-state">
                <div class="mobil-loading-inline">
                    <span class="mobil-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function Go(){const e=document.getElementById("mobil-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="mobil-table-state mobil-empty-copy">
                Belum ada data mobil
            </td>
        </tr>
    `)}function vn(){const e=document.getElementById("mobil-table-body");if(e){if(v.loading){Vo();return}if(v.data.length===0){Go();return}e.innerHTML=v.data.map((t,n)=>`
        <tr class="mobil-row" data-testid="mobil-row-${t.id}">
            <td class="mobil-index-cell">${(v.page-1)*fe+n+1}</td>
            <td>
                <div class="mobil-code-cell">
                    <span class="mobil-code-avatar" aria-hidden="true">
                        ${No()}
                    </span>
                    <span class="mobil-code-text">${g(t.kode_mobil)}</span>
                </div>
            </td>
            <td>
                <span class="${Fo(t.jenis_mobil)}">
                    <span class="mobil-jenis-icon" aria-hidden="true">${Ho()}</span>
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
                        ${Uo()}
                    </button>
                    <button
                        class="mobil-icon-button mobil-icon-button-danger"
                        type="button"
                        data-mobil-delete="${t.id}"
                        data-mobil-name="${g(t.kode_mobil)}"
                        data-testid="delete-mobil-${t.id}"
                        aria-label="Hapus mobil ${g(t.kode_mobil)}"
                    >
                        ${qo()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function En(){const e=document.getElementById("mobil-pagination-shell"),t=document.getElementById("mobil-pagination-info"),n=document.getElementById("mobil-pagination-page"),a=document.getElementById("mobil-prev-page-btn"),r=document.getElementById("mobil-next-page-btn"),o=Math.max(1,Math.ceil(v.totalCount/fe));e&&(e.hidden=o<=1),t&&(t.textContent=Me(v.page,fe,v.totalCount,v.data.length)),n&&(n.textContent=`${v.page} / ${o}`),a&&(a.disabled=v.page===1),r&&(r.disabled=v.page>=o)}async function ae(){v.loading=!0,vn(),En();try{const[e,t]=await Promise.all([I(`/mobil?page=${v.page}&limit=${fe}${v.search?`&search=${encodeURIComponent(v.search)}`:""}${v.filterJenis?`&jenis=${encodeURIComponent(v.filterJenis)}`:""}`),I(`/mobil/count${v.search||v.filterJenis?"?":""}${[v.search?`search=${encodeURIComponent(v.search)}`:"",v.filterJenis?`jenis=${encodeURIComponent(v.filterJenis)}`:""].filter(Boolean).join("&")}`)]);v.data=Array.isArray(e)?e:[],v.totalCount=Number(t.count||0)}finally{v.loading=!1,vn(),En()}}function wn(){const e=document.getElementById("mobil-form"),t=document.getElementById("mobil-form-title"),n=document.getElementById("mobil-form-description"),a=document.getElementById("mobil-id"),r=document.getElementById("mobil-kode"),o=document.getElementById("mobil-jenis");e?.reset(),a&&(a.value=""),r&&(r.value=""),o&&(o.value="Hiace"),t&&(t.textContent="Tambah Mobil Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan data mobil"),v.editItem=null,Ke(!1)}function Jo(e){const t=document.getElementById("mobil-form-title"),n=document.getElementById("mobil-form-description"),a=document.getElementById("mobil-id"),r=document.getElementById("mobil-kode"),o=document.getElementById("mobil-jenis");v.editItem=e,a&&(a.value=e.id),r&&(r.value=e.kode_mobil),o&&(o.value=e.jenis_mobil),t&&(t.textContent="Edit Data Mobil"),n&&(n.textContent="Isi form di bawah untuk memperbarui data mobil"),Ke(!1)}async function Wo(e){const t=await I(`/mobil/${e}`);Jo(t),O("mobil-form-modal")}function Ko(e){const t=document.getElementById("mobil-delete-copy");v.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus mobil <strong>${g(e.kode_mobil)}</strong>? Tindakan ini tidak dapat dibatalkan.`),O("mobil-delete-modal")}function zo(){const e=document.getElementById("mobil-add-btn"),t=document.getElementById("mobil-export-btn"),n=document.getElementById("mobil-search-input"),a=document.getElementById("mobil-filter-jenis"),r=document.getElementById("mobil-form"),o=document.getElementById("mobil-table-body"),s=document.getElementById("mobil-delete-confirm-btn"),l=document.getElementById("mobil-prev-page-btn"),m=document.getElementById("mobil-next-page-btn"),d=document.getElementById("mobil-kode");if(!(!e||!r||!o))return e.addEventListener("click",()=>{wn(),O("mobil-form-modal")}),t?.addEventListener("click",()=>{Pt("/export/mobil/csv","mobil.csv").catch(()=>{y("Gagal mengunduh file")})}),n?.addEventListener("input",Re(async i=>{v.search=i.target.value.trim(),v.page=1;try{await ae()}catch{y("Gagal memuat data")}})),a?.addEventListener("change",async i=>{v.filterJenis=i.target.value,v.page=1;try{await ae()}catch{y("Gagal memuat data")}}),d?.addEventListener("input",i=>{i.target.value=i.target.value.toUpperCase()}),r.addEventListener("submit",async i=>{i.preventDefault();const u={kode_mobil:document.getElementById("mobil-kode")?.value.trim().toUpperCase()||"",jenis_mobil:document.getElementById("mobil-jenis")?.value||"Hiace"};Ke(!0);try{v.editItem?(await I(`/mobil/${v.editItem.id}`,{method:"PUT",body:u}),P("Data mobil berhasil diperbarui")):(await I("/mobil",{method:"POST",body:u}),P("Mobil berhasil ditambahkan")),H("mobil-form-modal"),wn(),await ae()}catch(k){y(k.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{Ke(!1)}}),o.addEventListener("click",async i=>{const u=i.target.closest("[data-mobil-edit]"),k=i.target.closest("[data-mobil-delete]");try{if(u){await Wo(u.dataset.mobilEdit);return}k&&Ko({id:k.dataset.mobilDelete,kode_mobil:k.dataset.mobilName})}catch{y("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(v.deleteItem)try{await I(`/mobil/${v.deleteItem.id}`,{method:"DELETE"}),P("Mobil berhasil dihapus"),H("mobil-delete-modal"),(v.page-1)*fe>=v.totalCount-1&&v.page>1&&(v.page-=1),v.deleteItem=null,await ae()}catch{y("Gagal menghapus data")}}),l?.addEventListener("click",async()=>{if(!(v.page<=1)){v.page-=1;try{await ae()}catch{y("Gagal memuat data")}}}),m?.addEventListener("click",async()=>{const i=Math.max(1,Math.ceil(v.totalCount/fe));if(!(v.page>=i)){v.page+=1;try{await ae()}catch{y("Gagal memuat data")}}}),ae().catch(()=>{y("Gagal memuat data")})}const E={data:[],drivers:[],mobilList:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1},Se=10,Bn={"05:00":"Subuh (05.00 WIB)","08:00":"Pagi (08.00 WIB)","10:00":"Pagi (10.00 WIB)","14:00":"Siang (14.00 WIB)","16:00":"Sore (16.00 WIB)","19:00":"Malam (19.00 WIB)"},dt="08:00",Xo=["Reguler","Dropping","Rental"],Ut="Reguler";function Zo(){return`
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
    `}function qt(e){return e==="Lunas"?"Lunas":"Belum Lunas"}function In(e){const t=qt(e);return`<span class="keberangkatan-payment-badge ${t==="Lunas"?"is-paid":"is-unpaid"}">${g(t)}</span>`}function Sn(e){return Bn[e]||Bn[dt]}function ze(e){return Xo.includes(e)?e:Ut}function Yo(){const e=Number(document.getElementById("keberangkatan-tarif-penumpang")?.value||0),t=Number(document.getElementById("keberangkatan-uang-paket")?.value||0),n=Number(document.getElementById("keberangkatan-jumlah-snack")?.value||0),a=Number(document.getElementById("keberangkatan-pengembalian-snack")?.value||0),r=Number(document.getElementById("keberangkatan-jumlah-air-mineral")?.value||0),o=e,s=o+t,l=s*.15,m=s*.85;return{jumlah_uang_penumpang:o,uang_paket:t,total:s,uang_pc:l,uang_bersih:m,jumlah_snack:n,pengembalian_snack:a,jumlah_air_mineral:r}}function Ht(){const e=Yo();Object.entries(e).forEach(([t,n])=>{const a=document.querySelector(`[data-calc="${t}"]`);if(a){if(t==="jumlah_snack"){a.textContent=`${T(n)} item`;return}if(t==="pengembalian_snack"){a.textContent=`${T(n)} item`;return}if(t==="jumlah_air_mineral"){a.textContent=`${T(n)} botol`;return}a.textContent=A(n)}})}function Xe(e,t,n,a,r=""){const o=document.getElementById(e);if(!o)return;const s=e==="keberangkatan-kode-mobil"?"Pilih mobil":"Pilih driver";o.innerHTML=`
        <option value="">${s}</option>
        ${t.map(l=>`
            <option value="${l[n]}" ${String(l[n])===String(r)?"selected":""}>
                ${g(a(l))}
            </option>
        `).join("")}
    `}function Ze(e){const t=document.getElementById("keberangkatan-submit-btn");E.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":E.editItem?"Perbarui":"Simpan")}function es(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");e&&(e.innerHTML=`
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
        `))}function ts(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");e&&(e.innerHTML=`
        <tr>
            <td colspan="18" class="keberangkatan-table-state keberangkatan-empty-copy">
                Belum ada data keberangkatan
            </td>
        </tr>
    `,t&&(t.hidden=!1,t.innerHTML=`
            <div class="keberangkatan-mobile-state keberangkatan-empty-copy">
                Belum ada data keberangkatan
            </div>
        `))}function $n(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");if(e){if(E.loading){es();return}if(E.data.length===0){ts();return}e.innerHTML=E.data.map(n=>`
        <tr class="keberangkatan-row" data-testid="keberangkatan-row-${n.id}">
            <td class="keberangkatan-hari-cell">${g(n.hari)}</td>
            <td>${g(n.tanggal)}</td>
            <td>${g(n.jam_keberangkatan_label||Sn(n.jam_keberangkatan))}</td>
            <td>${g(ze(n.tipe_layanan))}</td>
            <td>
                <span class="keberangkatan-kode-badge">${g(n.kode_mobil)}</span>
            </td>
            <td>${g(n.driver_nama)}</td>
            <td class="text-right">${T(n.jumlah_penumpang)}</td>
            <td class="text-right keberangkatan-money-cell">${A(n.jumlah_uang_penumpang)}</td>
            <td class="text-right">${T(n.jumlah_paket)}</td>
            <td class="text-right keberangkatan-money-cell">${A(n.uang_paket)}</td>
            <td class="text-right"><span class="keberangkatan-stock-badge">${T(n.jumlah_snack)}</span></td>
            <td class="text-right"><span class="keberangkatan-stock-badge keberangkatan-stock-badge-blue">${T(n.pengembalian_snack)}</span></td>
            <td class="text-right"><span class="keberangkatan-stock-badge keberangkatan-stock-badge-blue">${T(n.jumlah_air_mineral)}</span></td>
            <td class="text-right keberangkatan-money-cell keberangkatan-money-cell-amber">${A(n.uang_pc)}</td>
            <td class="text-right keberangkatan-money-cell keberangkatan-money-cell-emerald">${A(n.uang_bersih)}</td>
            <td class="text-center">${In(n.status_pembayaran)}</td>
            <td class="text-center">
                <span class="keberangkatan-trip-badge">#${T(n.trip_ke)}</span>
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
                        ${Zo()}
                    </button>
                    <button
                        class="keberangkatan-icon-button keberangkatan-icon-button-danger"
                        type="button"
                        data-keberangkatan-delete="${n.id}"
                        data-testid="delete-keberangkatan-${n.id}"
                        aria-label="Hapus data keberangkatan ${g(n.kode_mobil)}"
                    >
                        ${Qo()}
                    </button>
                </div>
            </td>
        </tr>
    `).join(""),t&&(t.hidden=!1,t.innerHTML=E.data.map(n=>`
            <article class="keberangkatan-mobile-card" data-testid="keberangkatan-card-${n.id}">
                <div class="keberangkatan-mobile-card-head">
                    <div>
                        <p class="keberangkatan-mobile-day">${g(n.hari)}</p>
                        <h3 class="keberangkatan-mobile-date">${g(n.tanggal)}</h3>
                        <p>${g(n.jam_keberangkatan_label||Sn(n.jam_keberangkatan))}</p>
                    </div>
                    <div class="keberangkatan-mobile-head-side">
                        <span class="keberangkatan-kode-badge">${g(n.kode_mobil)}</span>
                        <span class="keberangkatan-trip-badge">#${T(n.trip_ke)}</span>
                    </div>
                </div>

                <div class="keberangkatan-mobile-driver">
                    <span>Driver</span>
                    <strong>${g(n.driver_nama)}</strong>
                </div>

                <div class="keberangkatan-mobile-grid">
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-status">
                        <span>Validasi</span>
                        ${In(n.status_pembayaran)}
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Layanan</span>
                        <strong>${g(ze(n.tipe_layanan))}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Penumpang</span>
                        <strong>${T(n.jumlah_penumpang)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Paket</span>
                        <strong>${T(n.jumlah_paket)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Snack</span>
                        <strong>${T(n.jumlah_snack)} item</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Pengembalian Snack</span>
                        <strong>${T(n.pengembalian_snack)} item</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Air Mineral</span>
                        <strong>${T(n.jumlah_air_mineral)} botol</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-full">
                        <span>Jumlah Tarif</span>
                        <strong>${A(n.jumlah_uang_penumpang)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-full">
                        <span>Uang Paket</span>
                        <strong>${A(n.uang_paket)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-accent">
                        <span>Uang PC (15%)</span>
                        <strong>${A(n.uang_pc)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-emerald">
                        <span>Uang Bersih</span>
                        <strong>${A(n.uang_bersih)}</strong>
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
        `).join(""))}}function Cn(){const e=document.getElementById("keberangkatan-pagination-shell"),t=document.getElementById("keberangkatan-pagination-info"),n=document.getElementById("keberangkatan-pagination-page"),a=document.getElementById("keberangkatan-prev-page-btn"),r=document.getElementById("keberangkatan-next-page-btn"),o=Math.max(1,Math.ceil(E.totalCount/Se));e&&(e.hidden=o<=1),t&&(t.textContent=Me(E.page,Se,E.totalCount,E.data.length)),n&&(n.textContent=`${E.page} / ${o}`),a&&(a.disabled=E.page===1),r&&(r.disabled=E.page>=o)}async function ce(){E.loading=!0,$n(),Cn();try{const[e,t,n,a]=await Promise.all([I(`/keberangkatan?page=${E.page}&limit=${Se}${E.search?`&search=${encodeURIComponent(E.search)}`:""}`),I(`/keberangkatan/count${E.search?`?search=${encodeURIComponent(E.search)}`:""}`),I("/drivers/all"),I("/mobil/all")]);E.data=Array.isArray(e)?e:[],E.totalCount=Number(t.count||0),E.drivers=Array.isArray(n)?n:[],E.mobilList=Array.isArray(a)?a:[]}finally{E.loading=!1,$n(),Cn()}}function ba(){document.getElementById("keberangkatan-form")?.scrollTo({top:0,behavior:"auto"})}function bt(){const e=document.getElementById("keberangkatan-form"),t=document.getElementById("keberangkatan-form-title"),n=document.getElementById("keberangkatan-form-description"),a=document.getElementById("keberangkatan-tanggal"),r=document.getElementById("keberangkatan-jam-keberangkatan"),o=document.getElementById("keberangkatan-trip-ke"),s=document.getElementById("keberangkatan-tipe-layanan"),l=document.getElementById("keberangkatan-jumlah-penumpang"),m=document.getElementById("keberangkatan-tarif-penumpang"),d=document.getElementById("keberangkatan-jumlah-paket"),i=document.getElementById("keberangkatan-uang-paket"),u=document.getElementById("keberangkatan-jumlah-snack"),k=document.getElementById("keberangkatan-pengembalian-snack"),$=document.getElementById("keberangkatan-jumlah-air-mineral"),p=document.getElementById("keberangkatan-status-pembayaran");e?.reset(),E.editItem=null,document.getElementById("keberangkatan-id").value="",t&&(t.textContent="Tambah Data Keberangkatan"),n&&(n.textContent="Isi form di bawah untuk menambahkan data keberangkatan"),a&&(a.value=Pe()),r&&(r.value=dt),Xe("keberangkatan-kode-mobil",E.mobilList,"kode_mobil",f=>`${f.kode_mobil} - ${f.jenis_mobil}`,E.mobilList[0]?.kode_mobil||""),Xe("keberangkatan-driver-id",E.drivers,"id",f=>`${f.nama} - ${f.lokasi}`,E.drivers[0]?.id||""),o&&(o.value="1"),s&&(s.value=Ut),l&&(l.value="0"),m&&(m.value="0"),d&&(d.value="0"),i&&(i.value="0"),u&&(u.value="0"),k&&(k.value="0"),$&&($.value="0"),p&&(p.value="Belum Lunas"),Ze(!1),Ht(),ba()}async function _n(e){const t=await I(`/keberangkatan/${e}`),n=document.getElementById("keberangkatan-form-title"),a=document.getElementById("keberangkatan-form-description");E.editItem=t,document.getElementById("keberangkatan-id").value=t.id,document.getElementById("keberangkatan-tanggal").value=t.tanggal,document.getElementById("keberangkatan-jam-keberangkatan").value=t.jam_keberangkatan||dt,document.getElementById("keberangkatan-trip-ke").value=t.trip_ke,document.getElementById("keberangkatan-tipe-layanan").value=ze(t.tipe_layanan),document.getElementById("keberangkatan-jumlah-penumpang").value=t.jumlah_penumpang,document.getElementById("keberangkatan-tarif-penumpang").value=t.tarif_penumpang,document.getElementById("keberangkatan-jumlah-paket").value=t.jumlah_paket,document.getElementById("keberangkatan-uang-paket").value=t.uang_paket,document.getElementById("keberangkatan-jumlah-snack").value=t.jumlah_snack,document.getElementById("keberangkatan-pengembalian-snack").value=t.pengembalian_snack,document.getElementById("keberangkatan-jumlah-air-mineral").value=t.jumlah_air_mineral,document.getElementById("keberangkatan-status-pembayaran").value=qt(t.status_pembayaran),Xe("keberangkatan-kode-mobil",E.mobilList,"kode_mobil",r=>`${r.kode_mobil} - ${r.jenis_mobil}`,t.kode_mobil),Xe("keberangkatan-driver-id",E.drivers,"id",r=>`${r.nama} - ${r.lokasi}`,t.driver_id),n&&(n.textContent="Edit Data Keberangkatan"),a&&(a.textContent="Isi form di bawah untuk memperbarui data keberangkatan"),Ze(!1),Ht(),ba(),O("keberangkatan-form-modal")}function xn(e){E.deleteItem=e,O("keberangkatan-delete-modal")}function ns(){const e=document.getElementById("keberangkatan-add-btn"),t=document.getElementById("keberangkatan-export-btn"),n=document.getElementById("keberangkatan-search-input"),a=document.getElementById("keberangkatan-form"),r=document.getElementById("keberangkatan-table-body"),o=document.getElementById("keberangkatan-mobile-list"),s=document.getElementById("keberangkatan-delete-confirm-btn"),l=document.getElementById("keberangkatan-prev-page-btn"),m=document.getElementById("keberangkatan-next-page-btn");if(!(!e||!a||!r))return e.addEventListener("click",()=>{bt(),O("keberangkatan-form-modal")}),t?.addEventListener("click",()=>{Pt("/export/keberangkatan/csv","keberangkatan.csv").catch(()=>{y("Gagal mengunduh file")})}),n?.addEventListener("input",Re(async d=>{E.search=d.target.value.trim(),E.page=1;try{await ce()}catch{y("Gagal memuat data")}})),a.addEventListener("input",d=>{["keberangkatan-jumlah-penumpang","keberangkatan-tarif-penumpang","keberangkatan-uang-paket","keberangkatan-jumlah-snack","keberangkatan-pengembalian-snack","keberangkatan-jumlah-air-mineral"].includes(d.target.id)&&Ht()}),a.addEventListener("submit",async d=>{d.preventDefault();const i={tanggal:document.getElementById("keberangkatan-tanggal")?.value||"",jam_keberangkatan:document.getElementById("keberangkatan-jam-keberangkatan")?.value||dt,tipe_layanan:ze(document.getElementById("keberangkatan-tipe-layanan")?.value||Ut),kode_mobil:document.getElementById("keberangkatan-kode-mobil")?.value||"",driver_id:document.getElementById("keberangkatan-driver-id")?.value||"",jumlah_penumpang:Number(document.getElementById("keberangkatan-jumlah-penumpang")?.value||0),tarif_penumpang:Number(document.getElementById("keberangkatan-tarif-penumpang")?.value||0),jumlah_paket:Number(document.getElementById("keberangkatan-jumlah-paket")?.value||0),uang_paket:Number(document.getElementById("keberangkatan-uang-paket")?.value||0),jumlah_snack:Number(document.getElementById("keberangkatan-jumlah-snack")?.value||0),pengembalian_snack:Number(document.getElementById("keberangkatan-pengembalian-snack")?.value||0),jumlah_air_mineral:Number(document.getElementById("keberangkatan-jumlah-air-mineral")?.value||0),trip_ke:Number(document.getElementById("keberangkatan-trip-ke")?.value||1),status_pembayaran:qt(document.getElementById("keberangkatan-status-pembayaran")?.value||"")};Ze(!0);try{E.editItem?(await I(`/keberangkatan/${E.editItem.id}`,{method:"PUT",body:i}),P("Data berhasil diperbarui")):(await I("/keberangkatan",{method:"POST",body:i}),P("Data berhasil ditambahkan")),H("keberangkatan-form-modal"),bt(),await ce()}catch(u){y(u.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{Ze(!1)}}),r.addEventListener("click",async d=>{const i=d.target.closest("[data-keberangkatan-edit]"),u=d.target.closest("[data-keberangkatan-delete]");try{if(i){await _n(i.dataset.keberangkatanEdit);return}u&&xn({id:u.dataset.keberangkatanDelete})}catch{y("Gagal memuat data")}}),o?.addEventListener("click",async d=>{const i=d.target.closest("[data-keberangkatan-edit]"),u=d.target.closest("[data-keberangkatan-delete]");try{if(i){await _n(i.dataset.keberangkatanEdit);return}u&&xn({id:u.dataset.keberangkatanDelete})}catch{y("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(E.deleteItem)try{await I(`/keberangkatan/${E.deleteItem.id}`,{method:"DELETE"}),P("Data berhasil dihapus"),H("keberangkatan-delete-modal"),(E.page-1)*Se>=E.totalCount-1&&E.page>1&&(E.page-=1),E.deleteItem=null,await ce()}catch{y("Gagal menghapus data")}}),l?.addEventListener("click",async()=>{if(!(E.page<=1)){E.page-=1;try{await ce()}catch{y("Gagal memuat data")}}}),m?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil(E.totalCount/Se));if(!(E.page>=d)){E.page+=1;try{await ce()}catch{y("Gagal memuat data")}}}),ce().then(()=>{bt()}).catch(()=>{y("Gagal memuat data")})}const B={data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1,prices:{snack:0,air:0}},$e=10;function as(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function rs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Qe(e){return Number(document.getElementById(e)?.value||0)}function Ye(){const e=Qe("stock-total-snack"),t=Qe("stock-total-air"),n=e*B.prices.snack+t*B.prices.air,a=document.querySelector('[data-stock-calc="nilai_total"]'),r=document.getElementById("stock-snack-price-label"),o=document.getElementById("stock-air-price-label");r&&(r.textContent=A(B.prices.snack)),o&&(o.textContent=A(B.prices.air)),a&&(a.textContent=A(n))}function et(e){const t=document.getElementById("stock-submit-btn");B.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":B.editItem?"Perbarui":"Simpan")}function os(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");e&&(e.innerHTML=`
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
        `))}function ss(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");e&&(e.innerHTML=`
        <tr>
            <td colspan="14" class="stock-table-state stock-empty-copy">
                Belum ada data stok snack dan air mineral
            </td>
        </tr>
    `,t&&(t.hidden=!1,t.innerHTML=`
            <div class="stock-mobile-state stock-empty-copy">
                Belum ada data stok snack dan air mineral
            </div>
        `))}function Tn(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");if(e){if(B.loading){os();return}if(B.data.length===0){ss();return}e.innerHTML=B.data.map(n=>`
        <tr class="stock-row" data-testid="stock-row-${n.id}">
            <td class="stock-day-cell">${g(n.hari)}</td>
            <td>${g(n.tanggal)}</td>
            <td>${g(n.bulan)}</td>
            <td class="text-right">${T(n.total_stock_snack_display??n.total_stock_snack)}</td>
            <td class="text-right">${T(n.total_stock_air_mineral)}</td>
            <td class="text-right">${T(n.pengembalian_snack)}</td>
            <td class="text-right">${T(n.terpakai_snack)}</td>
            <td class="text-right">${T(n.terpakai_air_mineral)}</td>
            <td class="text-right"><span class="stock-value-badge stock-value-badge-emerald">${T(n.sisa_stock_snack)}</span></td>
            <td class="text-right"><span class="stock-value-badge stock-value-badge-blue">${T(n.sisa_stock_air_mineral)}</span></td>
            <td class="text-right stock-money-cell">${A(n.nilai_total)}</td>
            <td class="text-right stock-money-cell stock-money-cell-emerald">${A(n.sisa_nilai_total)}</td>
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
                        ${as()}
                    </button>
                    <button
                        class="stock-icon-button stock-icon-button-danger"
                        type="button"
                        data-stock-delete="${n.id}"
                        data-stock-date="${g(n.tanggal)}"
                        data-testid="delete-stock-${n.id}"
                        aria-label="Hapus data stok ${g(n.tanggal)}"
                    >
                        ${rs()}
                    </button>
                </div>
            </td>
        </tr>
    `).join(""),t&&(t.hidden=!1,t.innerHTML=B.data.map(n=>`
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
                        <strong>${T(n.total_stock_snack_display??n.total_stock_snack)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Total Air Mineral</span>
                        <strong>${T(n.total_stock_air_mineral)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Pengembalian Snack</span>
                        <strong>${T(n.pengembalian_snack)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Terpakai Snack</span>
                        <strong>${T(n.terpakai_snack)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Terpakai Air Mineral</span>
                        <strong>${T(n.terpakai_air_mineral)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Sisa Snack</span>
                        <strong>${T(n.sisa_stock_snack)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Sisa Air Mineral</span>
                        <strong>${T(n.sisa_stock_air_mineral)}</strong>
                    </div>
                    <div class="stock-mobile-item stock-mobile-item-full">
                        <span>Nilai Total</span>
                        <strong>${A(n.nilai_total)}</strong>
                    </div>
                    <div class="stock-mobile-item stock-mobile-item-full stock-mobile-item-emerald">
                        <span>Sisa Nilai Total</span>
                        <strong>${A(n.sisa_nilai_total)}</strong>
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
        `).join(""))}}function Ln(){const e=document.getElementById("stock-pagination-shell"),t=document.getElementById("stock-pagination-info"),n=document.getElementById("stock-pagination-page"),a=document.getElementById("stock-prev-page-btn"),r=document.getElementById("stock-next-page-btn"),o=Math.max(1,Math.ceil(B.totalCount/$e));e&&(e.hidden=o<=1),t&&(t.textContent=Me(B.page,$e,B.totalCount,B.data.length)),n&&(n.textContent=`${B.page} / ${o}`),a&&(a.disabled=B.page===1),r&&(r.disabled=B.page>=o)}async function ue(){B.loading=!0,Tn(),Ln();try{const[e,t]=await Promise.all([I(`/stock?page=${B.page}&limit=${$e}${B.search?`&search=${encodeURIComponent(B.search)}`:""}`),I(`/stock/count${B.search?`?search=${encodeURIComponent(B.search)}`:""}`)]);B.data=Array.isArray(e)?e:[],B.totalCount=Number(t.count||0)}finally{B.loading=!1,Tn(),Ln()}}function An(){const e=document.getElementById("stock-form"),t=document.getElementById("stock-form-title"),n=document.getElementById("stock-form-description");e?.reset(),B.editItem=null,document.getElementById("stock-id").value="",document.getElementById("stock-tanggal").value=Pe(),document.getElementById("stock-total-snack").value="0",document.getElementById("stock-total-air").value="0",document.getElementById("stock-keterangan").value="",t&&(t.textContent="Tambah Stok Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan stok snack dan air mineral"),et(!1),Ye()}function is(e){const t=document.getElementById("stock-form-title"),n=document.getElementById("stock-form-description");B.editItem=e,document.getElementById("stock-id").value=e.id,document.getElementById("stock-tanggal").value=e.tanggal,document.getElementById("stock-total-snack").value=e.total_stock_snack,document.getElementById("stock-total-air").value=e.total_stock_air_mineral,document.getElementById("stock-keterangan").value=e.keterangan||"",t&&(t.textContent="Edit Data Stok"),n&&(n.textContent="Isi form di bawah untuk memperbarui stok snack dan air mineral"),et(!1),Ye()}async function Rn(e){const t=await I(`/stock/${e}`);is(t),O("stock-form-modal")}function Mn(e){const t=document.getElementById("stock-delete-copy");B.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus data stok tanggal <strong>${g(e.tanggal)}</strong>? Tindakan ini tidak dapat dibatalkan.`),O("stock-delete-modal")}function ls(){const e=document.querySelector("[data-stock-page]"),t=document.getElementById("stock-add-btn"),n=document.getElementById("stock-search-input"),a=document.getElementById("stock-form"),r=document.getElementById("stock-table-body"),o=document.getElementById("stock-mobile-list"),s=document.getElementById("stock-delete-confirm-btn"),l=document.getElementById("stock-prev-page-btn"),m=document.getElementById("stock-next-page-btn");if(!(!e||!t||!a||!r))return B.prices.snack=Number(e.dataset.stockSnackPrice||0),B.prices.air=Number(e.dataset.stockAirPrice||0),Ye(),t.addEventListener("click",()=>{An(),O("stock-form-modal")}),n?.addEventListener("input",Re(async d=>{B.search=d.target.value.trim(),B.page=1;try{await ue()}catch{y("Gagal memuat data")}})),a.addEventListener("input",d=>{["stock-total-snack","stock-total-air"].includes(d.target.id)&&Ye()}),a.addEventListener("submit",async d=>{d.preventDefault();const i={tanggal:document.getElementById("stock-tanggal")?.value||"",total_stock_snack:Qe("stock-total-snack"),total_stock_air_mineral:Qe("stock-total-air"),keterangan:document.getElementById("stock-keterangan")?.value.trim()||""};et(!0);try{B.editItem?(await I(`/stock/${B.editItem.id}`,{method:"PUT",body:i}),P("Data stok berhasil diperbarui")):(await I("/stock",{method:"POST",body:i}),P("Data stok berhasil ditambahkan")),H("stock-form-modal"),An(),await ue()}catch(u){y(u.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{et(!1)}}),r.addEventListener("click",async d=>{const i=d.target.closest("[data-stock-edit]"),u=d.target.closest("[data-stock-delete]");try{if(i){await Rn(i.dataset.stockEdit);return}u&&Mn({id:u.dataset.stockDelete,tanggal:u.dataset.stockDate})}catch{y("Gagal memuat data")}}),o?.addEventListener("click",async d=>{const i=d.target.closest("[data-stock-edit]"),u=d.target.closest("[data-stock-delete]");try{if(i){await Rn(i.dataset.stockEdit);return}u&&Mn({id:u.dataset.stockDelete,tanggal:u.dataset.stockDate})}catch{y("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(B.deleteItem)try{await I(`/stock/${B.deleteItem.id}`,{method:"DELETE"}),P("Data stok berhasil dihapus"),H("stock-delete-modal"),(B.page-1)*$e>=B.totalCount-1&&B.page>1&&(B.page-=1),B.deleteItem=null,await ue()}catch{y("Gagal menghapus data")}}),l?.addEventListener("click",async()=>{if(!(B.page<=1)){B.page-=1;try{await ue()}catch{y("Gagal memuat data")}}}),m?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil(B.totalCount/$e));if(!(B.page>=d)){B.page+=1;try{await ue()}catch{y("Gagal memuat data")}}}),ue().catch(()=>{y("Gagal memuat data")})}const Ce=10,S={currentUser:null,data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,defaultRole:"User"};function ds(e){return["Super Admin","Admin"].includes(e)}function cs(e){return e==="Super Admin"}function us(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function ms(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M2.5 12C4.4 8.2 8 6 12 6C16 6 19.6 8.2 21.5 12C19.6 15.8 16 18 12 18C8 18 4.4 15.8 2.5 12Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function gs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
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
    `}function fs(){return cs(S.currentUser?.role)?["Super Admin","Admin","User"]:["Admin","User"]}function tt(e){oe(document.getElementById("admin-user-submit-btn"),e,"Menyimpan...")}function bs(e){return e==="Super Admin"?"admin-users-role-badge admin-users-role-badge-super":e==="Admin"?"admin-users-role-badge admin-users-role-badge-admin":"admin-users-role-badge admin-users-role-badge-user"}function hs(){const e=document.getElementById("admin-users-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="6" class="admin-users-table-state">
                <div class="admin-users-loading-inline">
                    <span class="admin-users-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function ha(e="Belum ada akun admin atau user."){const t=document.getElementById("admin-users-table-body");t&&(t.innerHTML=`
        <tr>
            <td colspan="6" class="admin-users-table-state admin-users-empty-copy">${g(e)}</td>
        </tr>
    `)}function Pn(){const e=document.getElementById("admin-users-table-body");if(e){if(S.loading){hs();return}if(S.data.length===0){ha();return}e.innerHTML=S.data.map(t=>`
        <tr class="admin-users-row" data-testid="admin-user-row-${t.id}">
            <td>
                <div class="admin-users-name-cell">
                    <span class="admin-users-avatar" aria-hidden="true">${us()}</span>
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
            <td><span class="${bs(t.role)}">${g(t.role)}</span></td>
            <td>
                <div class="admin-users-action-row">
                    <button class="admin-users-icon-button" type="button" data-admin-user-show="${t.id}" data-testid="show-admin-user-${t.id}" aria-label="Lihat detail akun ${g(t.nama)}">
                        ${ms()}
                    </button>
                    <button class="admin-users-icon-button" type="button" data-admin-user-edit="${t.id}" data-testid="edit-admin-user-${t.id}" aria-label="Edit akun ${g(t.nama)}" ${t.can_edit?"":"disabled"}>
                        ${gs()}
                    </button>
                    <button class="admin-users-icon-button admin-users-icon-button-danger" type="button" data-admin-user-delete="${t.id}" data-admin-user-name="${g(t.nama)}" data-testid="delete-admin-user-${t.id}" aria-label="Hapus akun ${g(t.nama)}" ${t.can_delete?"":"disabled"}>
                        ${ps()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function $t(){const e=document.getElementById("admin-users-pagination-shell"),t=document.getElementById("admin-users-pagination-info"),n=document.getElementById("admin-users-pagination-page"),a=document.getElementById("admin-users-prev-page-btn"),r=document.getElementById("admin-users-next-page-btn"),o=Math.max(1,Math.ceil(S.totalCount/Ce));e&&(e.hidden=o<=1),t&&(t.textContent=Me(S.page,Ce,S.totalCount,S.data.length)),n&&(n.textContent=`${S.page} / ${o}`),a&&(a.disabled=S.page===1),r&&(r.disabled=S.page>=o)}async function me(){S.loading=!0,Pn(),$t();try{const e=S.search?`?search=${encodeURIComponent(S.search)}`:"",t=`?page=${S.page}&limit=${Ce}${S.search?`&search=${encodeURIComponent(S.search)}`:""}`,[n,a]=await Promise.all([I(`/admin-users${t}`),I(`/admin-users/count${e}`)]);S.data=Array.isArray(n)?n:[],S.totalCount=Number(a.count||0)}finally{S.loading=!1,Pn(),$t()}}function ka(e="User"){const t=document.getElementById("admin-user-role");if(!t)return;const n=fs(),a=n.includes(e)?e:n[0];t.innerHTML=n.map(r=>`
        <option value="${g(r)}" ${r===a?"selected":""}>${g(r)}</option>
    `).join("")}function ya(e){const t=document.getElementById("admin-user-password"),n=document.getElementById("admin-user-password-note");t&&(t.required=!e,t.placeholder=e?"Kosongkan jika tidak ingin mengubah password":"Masukkan password",t.value=""),n&&(n.textContent=e?"Kosongkan password jika tidak ingin mengubah password akun ini.":"Password minimal 6 karakter dan akan disimpan dalam bentuk terenkripsi.")}function ht(e="User"){const t=document.getElementById("admin-user-form"),n=document.getElementById("admin-user-form-title"),a=document.getElementById("admin-user-form-description"),r=document.getElementById("admin-user-id");t?.reset(),r&&(r.value=""),ka(e),ya(!1),n&&(n.textContent=e==="Admin"?"Tambah Admin Baru":"Tambah User Baru"),a&&(a.textContent=e==="Admin"?"Lengkapi data akun untuk menambahkan admin baru":"Lengkapi data akun untuk menambahkan user baru"),S.defaultRole=e,S.editItem=null,tt(!1)}function ks(e){S.editItem=e,document.getElementById("admin-user-id").value=e.id,document.getElementById("admin-user-nama").value=e.nama,document.getElementById("admin-user-username").value=e.username,document.getElementById("admin-user-email").value=e.email,ka(e.role),ya(!0),document.getElementById("admin-user-form-title").textContent="Edit Akun",document.getElementById("admin-user-form-description").textContent="Perbarui informasi akun admin atau user di bawah ini",tt(!1)}function ys(e){const t=document.getElementById("admin-user-detail-list");t&&(t.innerHTML=`
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
            <strong>${g(yo(e.created_at))}</strong>
        </div>
    `)}async function vs(e){ys(await I(`/admin-users/${e}`)),O("admin-user-show-modal")}async function Es(e){ks(await I(`/admin-users/${e}`)),O("admin-user-form-modal")}function ws(e){S.deleteItem=e,document.getElementById("admin-user-delete-copy").innerHTML=`Apakah Anda yakin ingin menghapus akun <strong>${g(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`,O("admin-user-delete-modal")}function On(){const e=document.getElementById("admin-users-access-note"),t=document.getElementById("admin-users-search-input"),n=document.querySelector(".admin-users-page-actions");e&&(e.hidden=!1,e.textContent="Halaman ini hanya dapat diakses oleh Admin atau Super Admin."),t&&(t.disabled=!0),n&&(n.hidden=!0),S.loading=!1,S.data=[],S.totalCount=0,ha("Anda tidak memiliki akses untuk mengelola data admin dan user."),$t()}function Bs({user:e}={}){const t=document.getElementById("admin-users-add-admin-btn"),n=document.getElementById("admin-users-add-user-btn"),a=document.getElementById("admin-users-search-input"),r=document.getElementById("admin-user-form"),o=document.getElementById("admin-users-table-body"),s=document.getElementById("admin-user-delete-confirm-btn"),l=document.getElementById("admin-users-prev-page-btn"),m=document.getElementById("admin-users-next-page-btn");if(!(!t||!n||!r||!o)){if(S.currentUser=e||window.transitAuthUser||null,!ds(S.currentUser?.role)){On();return}return t.addEventListener("click",()=>{ht("Admin"),O("admin-user-form-modal")}),n.addEventListener("click",()=>{ht("User"),O("admin-user-form-modal")}),a?.addEventListener("input",Re(async d=>{S.search=d.target.value.trim(),S.page=1;try{await me()}catch(i){y(i.message||"Gagal memuat data akun")}})),r.addEventListener("submit",async d=>{d.preventDefault();const i={nama:document.getElementById("admin-user-nama")?.value.trim()||"",username:document.getElementById("admin-user-username")?.value.trim()||"",email:document.getElementById("admin-user-email")?.value.trim()||"",password:document.getElementById("admin-user-password")?.value||"",role:document.getElementById("admin-user-role")?.value||"User"};tt(!0);try{S.editItem?(await I(`/admin-users/${S.editItem.id}`,{method:"PUT",body:i}),P("Akun berhasil diperbarui")):(await I("/admin-users",{method:"POST",body:i}),P(i.role==="Admin"?"Admin berhasil ditambahkan":"User berhasil ditambahkan")),H("admin-user-form-modal"),ht(S.defaultRole),await me()}catch(u){y(u.message||"Silakan periksa kembali data yang diinput","Gagal menyimpan akun")}finally{tt(!1)}}),o.addEventListener("click",async d=>{const i=d.target.closest("[data-admin-user-show]"),u=d.target.closest("[data-admin-user-edit]"),k=d.target.closest("[data-admin-user-delete]");try{if(i){await vs(i.dataset.adminUserShow);return}if(u){await Es(u.dataset.adminUserEdit);return}k&&ws({id:k.dataset.adminUserDelete,nama:k.dataset.adminUserName})}catch($){y($.message||"Gagal memuat detail akun")}}),s?.addEventListener("click",async()=>{if(S.deleteItem)try{await I(`/admin-users/${S.deleteItem.id}`,{method:"DELETE"}),P("Akun berhasil dihapus"),H("admin-user-delete-modal"),(S.page-1)*Ce>=S.totalCount-1&&S.page>1&&(S.page-=1),S.deleteItem=null,await me()}catch(d){y(d.message||"Gagal menghapus akun")}}),l?.addEventListener("click",async()=>{if(!(S.page<=1)){S.page-=1;try{await me()}catch(d){y(d.message||"Gagal memuat data akun")}}}),m?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil(S.totalCount/Ce));if(!(S.page>=d)){S.page+=1;try{await me()}catch(i){y(i.message||"Gagal memuat data akun")}}}),me().catch(d=>{if(d.status===403){On();return}y(d.message||"Gagal memuat data akun")})}}const Dn=[{value:"05:00",label:"Subuh",time:"05.00 WIB"},{value:"08:00",label:"Pagi",time:"08.00 WIB"},{value:"10:00",label:"Pagi",time:"10.00 WIB"},{value:"14:00",label:"Siang",time:"14.00 WIB"},{value:"16:00",label:"Sore",time:"16.00 WIB"},{value:"19:00",label:"Malam",time:"19.00 WIB"}],va=[[{code:"1A",label:"1A"},{code:"SOPIR",label:"SOPIR",isDriver:!0}],[{code:"2A",label:"2A"},{code:"3A",label:"3A"}],[{code:"4A",label:"4A"},{code:"5A",label:"5A"}]],Is=va.flat().filter(e=>!e.isDriver).length,h={currentUser:null,date:Pe(),direction:"to_pkb",bookings:[],loading:!1,drivers:[],mobils:[],formOptions:null,selectedSeats:[],passengerDraftMap:{},editItem:null,deleteItem:null,slotDriverMap:{},slotMobilMap:{}};function kt(e){const t=document.getElementById(e);if(!t)return null;try{return JSON.parse(t.textContent||"{}")}catch{return null}}function Ss(e){return["Super Admin","Admin"].includes(e)}function $s(e){const t=e?"#dc2626":"#166534",n=e?"#991b1b":"#14532d";return`
        <svg viewBox="0 0 50 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="2" width="30" height="20" rx="8" fill="${t}" stroke="${n}" stroke-width="1.5"/>
            <rect x="5" y="18" width="40" height="28" rx="9" fill="${t}" stroke="${n}" stroke-width="1.5"/>
            <rect x="7" y="44" width="36" height="14" rx="7" fill="${t}" stroke="${n}" stroke-width="1.5" opacity="0.8"/>
            <rect x="2" y="22" width="5" height="18" rx="2.5" fill="${t}" opacity="0.6"/>
            <rect x="43" y="22" width="5" height="18" rx="2.5" fill="${t}" opacity="0.6"/>
        </svg>`}function Cs(){return`
        <svg viewBox="0 0 50 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="25" cy="30" r="18" stroke="rgba(148,163,184,0.5)" stroke-width="2.5"/>
            <circle cx="25" cy="30" r="6" fill="rgba(148,163,184,0.4)"/>
            <line x1="25" y1="12" x2="25" y2="24" stroke="rgba(148,163,184,0.5)" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="7" y1="30" x2="19" y2="30" stroke="rgba(148,163,184,0.5)" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="31" y1="30" x2="43" y2="30" stroke="rgba(148,163,184,0.5)" stroke-width="2.5" stroke-linecap="round"/>
        </svg>`}function _s(){return'<svg viewBox="0 0 24 24" fill="none"><path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path><path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg>'}function xs(){return'<svg viewBox="0 0 24 24" fill="none"><path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg>'}function Ts(e){return`
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
                    ${va.map(n=>`<div class="bpg-seat-row">${n.map(r=>{if(r.isDriver)return`
                    <div class="bpg-seat-item bpg-seat-driver" title="Sopir / Pengemudi">
                        <div class="bpg-seat-icon">${Cs()}</div>
                        <span class="bpg-seat-label">SOPIR</span>
                    </div>`;const o=e[r.code],s=!!o,l=s?"bpg-seat-occupied":"bpg-seat-available",m=s?g(o.nama_pemesanan||"-"):"";return`
                <div class="bpg-seat-item ${l}" title="${s?m:"Tersedia"}">
                    <div class="bpg-seat-icon">${$s(s)}</div>
                    <span class="bpg-seat-label">${r.label}</span>
                    ${s?`<span class="bpg-seat-name">${m}</span>`:""}
                </div>`}).join("")}</div>`).join("")}
                </div>
            </div>
        </div>`}function Ls(e){if(e.length===0)return`
            <div class="bpg-empty-slot">
                <svg viewBox="0 0 24 24" fill="none" style="width:32px;height:32px;opacity:0.3;">
                    <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                    <circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="1.8"/>
                    <path d="M23 21V19C22.9986 17.1771 21.765 15.5857 20 15.13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                    <path d="M16 3.13C17.7699 3.58317 19.0078 5.17799 19.0078 7.005C19.0078 8.83201 17.7699 10.4268 16 10.88" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                </svg>
                <p>Belum ada penumpang pada jadwal ini</p>
            </div>`;const t=[{value:"Berangkat",label:"Berangkat",cls:"bpg-depart-btn--go"},{value:"Tidak Berangkat",label:"Tidak Berangkat",cls:"bpg-depart-btn--no"},{value:"Di Oper",label:"Di Oper",cls:"bpg-depart-btn--oper"}];return`
        <div class="bpg-passenger-list">
            <div class="bpg-passenger-list-head">
                <svg viewBox="0 0 24 24" fill="none" style="width:15px;height:15px;"><path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="1.8"/></svg>
                <span>Daftar Penumpang</span>
            </div>
            ${e.map(a=>{const r=a.selected_seats_label||"-",o=a.departure_status||"",s=t.map(l=>{const m=o===l.value;return`<button class="bpg-depart-btn ${l.cls}${m?" is-active":""}" type="button"
                data-departure-status="${g(l.value)}"
                data-booking-departure="${g(String(a.id))}"
                title="${g(l.value)}">${g(l.label)}</button>`}).join("");return`
            <div class="bpg-passenger-item" data-booking-id="${g(String(a.id))}">
                <div class="bpg-passenger-seats">
                    ${r.split(",").map(l=>`<span class="stock-value-badge stock-value-badge-blue">${g(l.trim())}</span>`).join("")}
                </div>
                <div class="bpg-passenger-info">
                    <span class="bpg-passenger-name">${g(a.nama_pemesanan||"-")}</span>
                    <span class="bpg-passenger-phone">${g(a.phone||"-")}</span>
                </div>
                <div class="bpg-departure-status-group">
                    ${s}
                </div>
                <div class="bpg-passenger-actions">
                    <span class="${g(a.payment_status_badge_class||"stock-value-badge stock-value-badge-blue")} bpg-status-sm">${g(a.payment_status||"-")}</span>
                    <button class="bpg-lihat-btn" type="button" data-booking-lihat="${g(String(a.id))}" aria-label="Lihat detail ${g(a.nama_pemesanan)}">
                        <svg viewBox="0 0 24 24" fill="none" style="width:13px;height:13px;"><path d="M2.5 12C4.4 8.2 8 6 12 6C16 6 19.6 8.2 21.5 12C19.6 15.8 16 18 12 18C8 18 4.4 15.8 2.5 12Z" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/></svg>
                        Lihat
                    </button>
                    <button class="admin-users-icon-button" type="button" data-booking-edit="${g(String(a.id))}" title="Edit pemesanan">
                        ${_s()}
                    </button>
                    <button class="admin-users-icon-button admin-users-icon-button-danger" type="button" data-booking-delete="${g(String(a.id))}" data-booking-name="${g(a.nama_pemesanan)}" title="Hapus pemesanan">
                        ${xs()}
                    </button>
                </div>
            </div>`}).join("")}
        </div>`}function As(e){const t={};return e.forEach(n=>{(Array.isArray(n.selected_seats)?n.selected_seats:[]).forEach(r=>{t[r]||(t[r]=n)})}),t}function Rs(e,t){const n=As(t),a=t.reduce((i,u)=>i+(Number(u.passenger_count)||0),0),r=`${e.value}__${h.direction}`;if(!h.slotDriverMap[r]){const i=t.find(u=>u.driver_id);i&&(h.slotDriverMap[r]=i.driver_id)}const o=h.slotDriverMap[r]||"",s=h.slotMobilMap[r]||"",l="stock-value-badge-yellow",m=h.drivers.map(i=>{const u=i.lokasi?`${i.nama} (${i.lokasi})`:i.nama;return`<option value="${g(i.id)}" ${o===i.id?"selected":""}>${g(u)}</option>`}).join(""),d=h.mobils.map(i=>{const u=`${i.kode_mobil} — ${i.jenis_mobil}`;return`<option value="${g(i.id)}" ${s===i.id?"selected":""}>${g(u)}</option>`}).join("");return`
        <article class="bpg-slot-card" data-slot="${g(e.value)}" data-direction="${g(h.direction)}">
            <div class="bpg-slot-head">
                <div class="bpg-slot-time-badge">
                    <span class="bpg-slot-period">${g(e.label)}</span>
                    <strong class="bpg-slot-time">${g(e.time)}</strong>
                </div>
                <div class="bpg-slot-counters">
                    <span class="stock-value-badge ${l}">${a} / ${Is} Kursi</span>
                </div>
            </div>

            ${Ts(n)}

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
                        ${d}
                    </select>
                </div>
            </div>

            ${Ls(t)}
        </article>`}function Ms(){const e=document.getElementById("bpg-slots-shell");e&&(e.innerHTML=`
            <div class="admin-users-loading-inline" style="padding:40px 0;">
                <span class="admin-users-loading-inline-spinner" aria-hidden="true"></span>
                <span>Memuat data penumpang...</span>
            </div>`)}function Ps(){const e=document.getElementById("bpg-slots-shell");if(!e)return;const t={};Dn.forEach(a=>{t[a.value]=[]}),h.bookings.forEach(a=>{const o=(a.trip_time||"").trim().substring(0,5);t[o]&&t[o].push(a)});const n=Dn.map(a=>Rs(a,t[a.value]||[]));e.innerHTML=`<div class="bpg-slots-grid">${n.join("")}</div>`}async function we(){h.loading=!0,Ms();try{const e=new URLSearchParams({date:h.date,direction:h.direction,limit:200,page:1}),t=await I(`/bookings?${e}`);h.bookings=Array.isArray(t)?t:[]}catch(e){h.bookings=[],e.status!==403&&y(e.message||"Gagal memuat data penumpang")}finally{h.loading=!1,Ps()}}function Os(e){document.getElementById("bpg-detail-title").textContent=e.nama_pemesanan||"-",document.getElementById("bpg-detail-subtitle").textContent=`${e.booking_code||"-"} · ${e.booking_status||"-"}`,document.getElementById("bpg-detail-full-link").href=`/dashboard/bookings/${e.id}`;const t=document.getElementById("bpg-detail-body");t.innerHTML=`
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
        </div>`,O("bpg-detail-modal")}function Ds(){return(h.formOptions?.seat_options||[]).map(e=>e.code)}function Ft(e){const t=new Map(Ds().map((n,a)=>[n,a]));return Array.from(new Set((e||[]).map(n=>String(n).trim()).filter(n=>t.has(n)))).sort((n,a)=>(t.get(n)??999)-(t.get(a)??999))}function ct(){return Number(document.getElementById("booking-passenger-count")?.value||0)}function js(){const e=ct();return(h.formOptions?.seat_options||[]).filter(t=>!t.is_optional||e>=6).map(t=>t.code)}function Ns(){return h.formOptions?.payment_status_options||[]}function Us(e){return e==="transfer"?["Belum Bayar","Menunggu Pembayaran","Menunggu Verifikasi","Dibayar"]:e==="qris"?["Belum Bayar","Menunggu Pembayaran","Dibayar"]:e==="cash"?["Belum Bayar","Dibayar Tunai"]:["Belum Bayar"]}function qs(e){return e==="transfer"?"Menunggu Pembayaran":e==="qris"?"Dibayar":e==="cash"?"Dibayar Tunai":"Belum Bayar"}function Hs(e){return e==="transfer"?"Menunggu Verifikasi Pembayaran":e==="qris"||e==="cash"?"Diproses":"Draft"}function Fs(e,t){if(!e||!t||e===t)return null;const a=(h.formOptions?.route_matrix||{})?.[e]?.[t];return a==null?null:Number(a)}function Be(){const e=document.getElementById("booking-from-city")?.value||"",t=document.getElementById("booking-to-city")?.value||"",n=ct(),a=Fs(e,t),r=a!==null?a*n:null,o=document.getElementById("booking-price-per-seat"),s=document.getElementById("booking-total-amount");o&&(o.value=a!==null?A(a):""),s&&(s.value=r!==null?A(r):"")}function Vt(){const e=document.getElementById("booking-payment-method")?.value||"",t=document.getElementById("booking-payment-status"),n=document.getElementById("booking-booking-status"),a=document.getElementById("booking-bank-account-group"),r=document.getElementById("booking-bank-account-code"),o=Us(e),s=t?.value||"";a&&(a.hidden=e!=="transfer"),r&&e!=="transfer"&&(r.value=""),t&&(t.innerHTML=Ns().filter(l=>o.includes(l.value)).map(l=>`<option value="${g(l.value)}">${g(l.label)}</option>`).join(""),t.value=o.includes(s)?s:qs(e)),n&&(n.value=Hs(e))}function Vs(){const e=document.getElementById("booking-selected-seats-inputs");e&&(e.innerHTML=h.selectedSeats.map(t=>`<input type="hidden" name="selected_seats[]" value="${g(t)}">`).join(""))}function Gs(){const e=document.getElementById("booking-selected-seat-count"),t=document.getElementById("booking-selected-seat-label");e&&(e.textContent=String(h.selectedSeats.length)),t&&(t.textContent=h.selectedSeats.length>0?h.selectedSeats.join(", "):"Belum dipilih")}function Ct(){document.querySelectorAll("[data-passenger-seat]").forEach(e=>{const t=e.dataset.passengerSeat;t&&(h.passengerDraftMap[t]={seat_no:t,name:e.querySelector("[data-passenger-name]")?.value.trim()||"",phone:e.querySelector("[data-passenger-phone]")?.value.trim()||""})})}function nt(e=null){const t=document.getElementById("booking-passenger-editor");if(t){if(e&&(h.passengerDraftMap=Object.fromEntries(e.map(n=>[n.seat_no,n]))),h.selectedSeats.length===0){t.innerHTML='<div class="dashboard-empty-state dashboard-empty-state--block bookings-passenger-empty">Pilih kursi terlebih dahulu untuk menampilkan form data penumpang.</div>';return}t.innerHTML=`
        <div class="bookings-passenger-grid bookings-passenger-grid--editor">
            ${h.selectedSeats.map((n,a)=>{const r=h.passengerDraftMap[n]||{name:"",phone:""};return`
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
        </div>`}}function at(){const e=document.querySelectorAll("[data-seat-code]"),t=ct(),n=js();h.selectedSeats=Ft(h.selectedSeats.filter(a=>n.includes(a))),e.forEach(a=>{const r=a.dataset.seatCode,o=n.includes(r),s=h.selectedSeats.includes(r),l=h.selectedSeats.length>=t&&!s;a.hidden=!o,a.classList.toggle("is-selected",s),a.classList.toggle("is-disabled",l),a.disabled=!o||l}),Vs(),Gs()}function yt(){document.getElementById("booking-form")?.reset(),h.editItem=null,h.selectedSeats=[],h.passengerDraftMap={};const t=h.date||Pe();document.getElementById("booking-id").value="",document.getElementById("booking-form-title").textContent="Tambah Pemesanan",document.getElementById("booking-form-description").textContent="Lengkapi data pemesanan reguler dari dashboard admin.",document.getElementById("booking-trip-date").value=t,document.getElementById("booking-passenger-count").value="1",document.getElementById("booking-payment-method").value="",document.getElementById("booking-booking-status").value="Draft",Vt(),at(),nt(),Be(),oe(document.getElementById("booking-submit-btn"),!1,"Menyimpan...")}function Js(e){h.editItem=e,h.selectedSeats=Ft(e.selected_seats||[]),h.passengerDraftMap=Object.fromEntries((e.passengers||[]).map(t=>[t.seat_no,t])),document.getElementById("booking-id").value=e.id,document.getElementById("booking-booking-for").value=e.booking_for,document.getElementById("booking-category").value=e.category,document.getElementById("booking-from-city").value=e.from_city,document.getElementById("booking-to-city").value=e.to_city,document.getElementById("booking-trip-date").value=e.trip_date_value,document.getElementById("booking-trip-time").value=e.trip_time_value,document.getElementById("booking-passenger-count").value=String(e.passenger_count),document.getElementById("booking-driver-name").value=e.driver_name==="Menunggu Penetapan Driver"?"":e.driver_name||"",document.getElementById("booking-pickup-location").value=e.pickup_location,document.getElementById("booking-dropoff-location").value=e.dropoff_location,document.getElementById("booking-payment-method").value=e.payment_method_value||"",Vt(),document.getElementById("booking-payment-status").value=e.payment_status,document.getElementById("booking-booking-status").value=e.booking_status,document.getElementById("booking-bank-account-code").value=e.bank_account_code||"",document.getElementById("booking-notes").value=e.notes||"",document.getElementById("booking-form-title").textContent="Edit Pemesanan",document.getElementById("booking-form-description").textContent="Perbarui data pemesanan reguler yang dipilih.",at(),nt(e.passengers||[]),Be(),oe(document.getElementById("booking-submit-btn"),!1,"Menyimpan...")}function Ws(){return Ct(),{booking_for:document.getElementById("booking-booking-for")?.value||"",category:document.getElementById("booking-category")?.value||"Reguler",from_city:document.getElementById("booking-from-city")?.value||"",to_city:document.getElementById("booking-to-city")?.value||"",trip_date:document.getElementById("booking-trip-date")?.value||"",trip_time:document.getElementById("booking-trip-time")?.value||"",passenger_count:Number(document.getElementById("booking-passenger-count")?.value||0),driver_name:document.getElementById("booking-driver-name")?.value.trim()||"",pickup_location:document.getElementById("booking-pickup-location")?.value.trim()||"",dropoff_location:document.getElementById("booking-dropoff-location")?.value.trim()||"",selected_seats:h.selectedSeats,passengers:h.selectedSeats.map(e=>({seat_no:e,name:h.passengerDraftMap?.[e]?.name||"",phone:h.passengerDraftMap?.[e]?.phone||""})),payment_method:document.getElementById("booking-payment-method")?.value||"",payment_status:document.getElementById("booking-payment-status")?.value||"Belum Bayar",booking_status:document.getElementById("booking-booking-status")?.value||"Draft",bank_account_code:document.getElementById("booking-bank-account-code")?.value||"",notes:document.getElementById("booking-notes")?.value.trim()||""}}async function Ks(e){Js(await I(`/bookings/${e}`)),O("booking-form-modal")}function zs(e){h.deleteItem=e,document.getElementById("booking-delete-copy").innerHTML=`Apakah Anda yakin ingin menghapus data pemesanan <strong>${g(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`,O("booking-delete-modal")}function jn(){const e=document.getElementById("bookings-access-note"),t=document.getElementById("bpg-route-tabs"),n=document.getElementById("bpg-slots-shell");e&&(e.hidden=!1),t&&(t.hidden=!0),n&&(n.hidden=!0)}function Xs({user:e}={}){const t=document.getElementById("bookings-add-btn"),n=document.getElementById("bookings-date-picker"),a=document.getElementById("bpg-route-tabs"),r=document.getElementById("bpg-slots-shell"),o=document.getElementById("booking-form"),s=document.getElementById("booking-delete-confirm-btn"),l=document.getElementById("booking-seat-grid"),m=document.getElementById("booking-passenger-editor"),d=document.getElementById("booking-payment-method");if(h.formOptions=kt("bookings-form-options"),h.drivers=kt("bookings-drivers-data")||[],h.mobils=kt("bookings-mobils-data")||[],h.currentUser=e||window.transitAuthUser||null,h.date=Pe(),!Ss(h.currentUser?.role)){jn();return}return n&&(n.value=h.date,n.addEventListener("change",async()=>{h.date=n.value,h.slotDriverMap={},h.slotMobilMap={},await we()})),a?.addEventListener("click",async i=>{const u=i.target.closest("[data-direction]");if(!u)return;const k=u.dataset.direction;k!==h.direction&&(h.direction=k,h.slotDriverMap={},h.slotMobilMap={},document.querySelectorAll(".bpg-route-tab").forEach($=>{$.classList.toggle("is-active",$.dataset.direction===k)}),await we())}),r?.addEventListener("click",async i=>{const u=i.target.closest("[data-booking-lihat]"),k=i.target.closest("[data-booking-edit]"),$=i.target.closest("[data-booking-delete]"),p=i.target.closest("[data-booking-departure]");try{if(p){const f=p.dataset.bookingDeparture,b=p.dataset.departureStatus,x=h.bookings.find(M=>String(M.id)===String(f));if(!x)return;const R=x.departure_status===b?"":b;x.departure_status=R;const L=r.querySelector(`[data-booking-id="${CSS.escape(String(f))}"]`);L&&L.querySelectorAll("[data-booking-departure]").forEach(M=>{M.classList.toggle("is-active",M.dataset.departureStatus===R)}),await I(`/bookings/${f}/departure-status`,{method:"PATCH",body:{departure_status:R}});return}if(u){const f=u.dataset.bookingLihat,b=h.bookings.find(x=>String(x.id)===String(f));b&&Os(b);return}if(k){await Ks(k.dataset.bookingEdit);return}$&&zs({id:$.dataset.bookingDelete,nama:$.dataset.bookingName})}catch(f){y(f.message||"Gagal memuat data pemesanan")}}),r?.addEventListener("change",async i=>{const u=i.target.closest("[data-slot-driver]"),k=i.target.closest("[data-slot-mobil]");if(u){const $=u.dataset.slotDriver,p=u.value,f=u.options[u.selectedIndex],b=p&&f?.text.split(" (")[0]||"",x=`${$}__${h.direction}`;h.slotDriverMap[x]=p;try{await I("/bookings/slot-assign",{method:"PATCH",body:{trip_date:h.date,trip_time:$,direction:h.direction,driver_id:p||null,driver_name:b}}),P("Driver berhasil diperbarui")}catch(R){y(R.message||"Gagal memperbarui driver")}}if(k){const $=k.dataset.slotMobil,p=k.value,f=`${$}__${h.direction}`;h.slotMobilMap[f]=p}}),t?.addEventListener("click",()=>{yt(),O("booking-form-modal")}),l?.addEventListener("click",i=>{const u=i.target.closest("[data-seat-code]");if(!u||u.disabled)return;Ct();const k=u.dataset.seatCode;h.selectedSeats.includes(k)?h.selectedSeats=h.selectedSeats.filter($=>$!==k):h.selectedSeats.length<ct()&&(h.selectedSeats=Ft([...h.selectedSeats,k])),at(),nt()}),document.getElementById("booking-passenger-count")?.addEventListener("change",()=>{Ct(),at(),nt(),Be()}),document.getElementById("booking-from-city")?.addEventListener("change",Be),document.getElementById("booking-to-city")?.addEventListener("change",Be),d?.addEventListener("change",Vt),m?.addEventListener("input",i=>{const u=i.target.closest("[data-passenger-seat]");if(!u)return;const k=u.dataset.passengerSeat;h.passengerDraftMap[k]={seat_no:k,name:u.querySelector("[data-passenger-name]")?.value.trim()||"",phone:u.querySelector("[data-passenger-phone]")?.value.trim()||""}}),o?.addEventListener("submit",async i=>{i.preventDefault();const u=document.getElementById("booking-submit-btn");oe(u,!0,"Menyimpan...");try{const k=Ws();h.editItem?(await I(`/bookings/${h.editItem.id}`,{method:"PUT",body:k}),P("Data pemesanan berhasil diperbarui")):(await I("/bookings",{method:"POST",body:k}),P("Data pemesanan berhasil ditambahkan")),H("booking-form-modal"),yt(),await we()}catch(k){y(k.message||"Silakan periksa kembali data yang diinput","Gagal menyimpan data pemesanan")}finally{oe(u,!1,"Menyimpan...")}}),s?.addEventListener("click",async()=>{if(h.deleteItem){oe(s,!0,"Menghapus...");try{await I(`/bookings/${h.deleteItem.id}`,{method:"DELETE"}),P("Data pemesanan berhasil dihapus"),H("booking-delete-modal"),h.deleteItem=null,await we()}catch(i){y(i.message||"Gagal menghapus data pemesanan")}finally{oe(s,!1,"Menghapus...")}}}),yt(),we().catch(i=>{if(i.status===403){jn();return}y(i.message||"Gagal memuat data penumpang")})}function Zs(e){const t=document.getElementById(e);if(!t)return{};try{return JSON.parse(t.textContent||"{}")}catch{return{}}}function Qs(){const e=document.querySelector("[data-regular-booking-page]");if(!e)return;const t=Zs("regular-booking-route-matrix"),n=e.querySelector("[data-booking-origin]"),a=e.querySelector("[data-booking-destination]"),r=e.querySelector("[data-booking-schedule]"),o=e.querySelector("[data-booking-passengers]"),s=e.querySelector("[data-route-fare-input]"),l=e.querySelector("[data-estimated-total-input]"),m=e.querySelector("[data-route-feedback]"),d=e.querySelector("[data-route-feedback-title]"),i=e.querySelector("[data-route-feedback-text]"),u=e.querySelector("[data-booking-submit]"),k=Array.from(e.querySelectorAll("[data-booking-type]")),$=e.querySelector("[data-summary-booking-for]"),p=e.querySelector("[data-summary-route]"),f=e.querySelector("[data-summary-schedule]"),b=e.querySelector("[data-summary-passengers]"),x=e.querySelector("[data-summary-fare]"),R=e.querySelector("[data-summary-total]"),L=new Map(k.map(_=>[_.value,_.dataset.label||_.value])),M=new Map(Array.from(r?.options||[]).filter(_=>_.value).map(_=>[_.value,_.textContent.trim()]));function U(_,N){if(!_||!N||_===N)return null;const W=t?.[_]?.[N];return W==null?null:Number(W)}function J(_,N,W){!m||!d||!i||(m.dataset.state=_,d.textContent=N,i.textContent=W)}function F(){e.querySelectorAll(".regular-booking-radio").forEach(_=>{const N=_.querySelector('input[type="radio"]');_.classList.toggle("is-selected",!!N?.checked)})}function ke(_){return _<=0?"Belum dipilih":_===6?"6 Penumpang (Opsional tambahan)":`${_} Penumpang`}function Z(){const _=n?.value||"",N=a?.value||"",W=r?.value||"",Q=Number(o?.value||0),Y=k.find(Oe=>Oe.checked)?.value||"",z=U(_,N),j=z!==null&&Q>0?z*Q:null;s&&(s.value=z!==null?A(z):""),l&&(l.value=j!==null?A(j):""),!_||!N?J("idle","Tarif akan ditampilkan otomatis","Pilih asal dan tujuan untuk melihat tarif perjalanan reguler."):_===N?J("error","Asal dan tujuan tidak boleh sama","Silakan pilih tujuan yang berbeda agar tarif dapat dihitung."):z===null?J("error","Rute belum tersedia","Rute yang Anda pilih saat ini belum tersedia. Silakan pilih kombinasi asal dan tujuan lain."):J("ready","Rute tersedia","Tarif telah diisi otomatis berdasarkan kombinasi rute dua arah yang tersedia."),u&&(u.disabled=!!(_&&N&&(_===N||z===null))),$&&($.textContent=L.get(Y)||"Belum dipilih"),p&&(p.textContent=_&&N?`${_} - ${N}`:"Belum dipilih"),f&&(f.textContent=M.get(W)||"Belum dipilih"),b&&(b.textContent=ke(Q)),x&&(x.textContent=z!==null?A(z):"Belum tersedia"),R&&(R.textContent=j!==null?A(j):"Belum tersedia"),F()}[n,a,r,o].forEach(_=>{_?.addEventListener("change",Z)}),k.forEach(_=>{_.addEventListener("change",Z)}),e.querySelector("form")?.addEventListener("reset",()=>{window.requestAnimationFrame(Z)}),Z()}function Ys(){const e=document.querySelector("[data-regular-booking-seat-page]");if(!e)return;const t=Number(e.dataset.requiredSeatCount||0),n=Array.from(e.querySelectorAll("[data-seat-card]")),a=Array.from(e.querySelectorAll("[data-seat-input]")),r=e.querySelector("[data-seat-summary-count]"),o=e.querySelector("[data-seat-summary-list]"),s=e.querySelector("[data-seat-summary-remaining]"),l=e.querySelector("[data-seat-submit]"),m=e.querySelector("[data-seat-feedback]"),d=e.querySelector("[data-seat-feedback-title]"),i=e.querySelector("[data-seat-feedback-text]");function u(){return a.filter(f=>f.checked).map(f=>f.value)}function k(f){return f.length>0?f.join(", "):"Belum dipilih"}function $(f,b,x){!m||!d||!i||(m.dataset.state=f,d.textContent=b,i.textContent=x)}function p(){const f=u(),b=f.length,x=t>0&&b>=t;if(n.forEach(R=>{const L=R.querySelector("[data-seat-input]");if(!L)return;const M=L.checked,U=x&&!M;L.disabled=U,R.classList.toggle("is-selected",M),R.classList.toggle("is-disabled",U)}),r&&(r.textContent=`${b} dari ${t}`),o&&(o.textContent=k(f)),s&&(s.textContent=String(Math.max(t-b,0))),l&&(l.disabled=b!==t),b===0){$("idle","Pilih kursi sesuai jumlah penumpang","Jumlah kursi yang dipilih harus sama dengan jumlah penumpang pada booking draft.");return}if(b<t){$("idle","Pemilihan kursi belum lengkap",`Masih perlu memilih ${t-b} kursi lagi sebelum dapat melanjutkan.`);return}if(t===6){$("ready","Semua kursi sudah terisi","Jumlah penumpang 6 orang sudah terpenuhi dan kursi tambahan 2B ikut terpakai.");return}$("ready","Kursi sudah sesuai","Jumlah kursi yang dipilih sudah sesuai dengan jumlah penumpang dan siap disimpan.")}a.forEach(f=>{f.addEventListener("change",()=>{p()})}),p()}const ei={"admin-users/index":Bs,"auth/login":bo,"bookings/index":Xs,"dashboard/index":_o,"drivers/index":jo,"mobil/index":zo,"keberangkatan/index":ns,"regular-bookings/index":Qs,"regular-bookings/seats":Ys,"stock/index":ls};document.addEventListener("DOMContentLoaded",async()=>{mo(),fo(),Ge(ua());const e=oo();e&&(e.type==="success"?P(e.message,e.title):e.type==="info"?go(e.message,e.title):y(e.message,e.title));try{const{user:t}=await uo();t&&Ge(t);const n=document.body.dataset.pageScript,a=ei[n];typeof a=="function"&&await a({user:t})}catch(t){console.error(t),y(t.message||"Terjadi kesalahan saat memuat halaman")}});
