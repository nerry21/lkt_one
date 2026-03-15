function Nn(e,t){return function(){return e.apply(t,arguments)}}const{toString:wa}=Object.prototype,{getPrototypeOf:xt}=Object,{iterator:rt,toStringTag:Un}=Symbol,ot=(e=>t=>{const n=wa.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),Z=e=>(e=e.toLowerCase(),t=>ot(t)===e),st=e=>t=>typeof t===e,{isArray:he}=Array,ge=st("undefined");function xe(e){return e!==null&&!ge(e)&&e.constructor!==null&&!ge(e.constructor)&&G(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const qn=Z("ArrayBuffer");function Ba(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&qn(e.buffer),t}const Ia=st("string"),G=st("function"),Hn=st("number"),_e=e=>e!==null&&typeof e=="object",Sa=e=>e===!0||e===!1,Ne=e=>{if(ot(e)!=="object")return!1;const t=xt(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Un in e)&&!(rt in e)},$a=e=>{if(!_e(e)||xe(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},Ca=Z("Date"),xa=Z("File"),_a=e=>!!(e&&typeof e.uri<"u"),Ta=e=>e&&typeof e.getParts<"u",La=Z("Blob"),Aa=Z("FileList"),Ra=e=>_e(e)&&G(e.pipe);function Ma(){return typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}}const Wt=Ma(),Kt=typeof Wt.FormData<"u"?Wt.FormData:void 0,Pa=e=>{let t;return e&&(Kt&&e instanceof Kt||G(e.append)&&((t=ot(e))==="formdata"||t==="object"&&G(e.toString)&&e.toString()==="[object FormData]"))},Da=Z("URLSearchParams"),[Oa,ja,Na,Ua]=["ReadableStream","Request","Response","Headers"].map(Z),qa=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function Te(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let a,r;if(typeof e!="object"&&(e=[e]),he(e))for(a=0,r=e.length;a<r;a++)t.call(null,e[a],a,e);else{if(xe(e))return;const o=n?Object.getOwnPropertyNames(e):Object.keys(e),s=o.length;let i;for(a=0;a<s;a++)i=o[a],t.call(null,e[i],i,e)}}function Fn(e,t){if(xe(e))return null;t=t.toLowerCase();const n=Object.keys(e);let a=n.length,r;for(;a-- >0;)if(r=n[a],t===r.toLowerCase())return r;return null}const oe=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,Vn=e=>!ge(e)&&e!==oe;function vt(){const{caseless:e,skipUndefined:t}=Vn(this)&&this||{},n={},a=(r,o)=>{if(o==="__proto__"||o==="constructor"||o==="prototype")return;const s=e&&Fn(n,o)||o;Ne(n[s])&&Ne(r)?n[s]=vt(n[s],r):Ne(r)?n[s]=vt({},r):he(r)?n[s]=r.slice():(!t||!ge(r))&&(n[s]=r)};for(let r=0,o=arguments.length;r<o;r++)arguments[r]&&Te(arguments[r],a);return n}const Ha=(e,t,n,{allOwnKeys:a}={})=>(Te(t,(r,o)=>{n&&G(r)?Object.defineProperty(e,o,{value:Nn(r,n),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(e,o,{value:r,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:a}),e),Fa=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),Va=(e,t,n,a)=>{e.prototype=Object.create(t.prototype,a),Object.defineProperty(e.prototype,"constructor",{value:e,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},Ga=(e,t,n,a)=>{let r,o,s;const i={};if(t=t||{},e==null)return t;do{for(r=Object.getOwnPropertyNames(e),o=r.length;o-- >0;)s=r[o],(!a||a(s,e,t))&&!i[s]&&(t[s]=e[s],i[s]=!0);e=n!==!1&&xt(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},Ja=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const a=e.indexOf(t,n);return a!==-1&&a===n},Wa=e=>{if(!e)return null;if(he(e))return e;let t=e.length;if(!Hn(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},Ka=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&xt(Uint8Array)),za=(e,t)=>{const a=(e&&e[rt]).call(e);let r;for(;(r=a.next())&&!r.done;){const o=r.value;t.call(e,o[0],o[1])}},Xa=(e,t)=>{let n;const a=[];for(;(n=e.exec(t))!==null;)a.push(n);return a},Za=Z("HTMLFormElement"),Qa=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,a,r){return a.toUpperCase()+r}),zt=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),Ya=Z("RegExp"),Gn=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),a={};Te(n,(r,o)=>{let s;(s=t(r,o,e))!==!1&&(a[o]=s||r)}),Object.defineProperties(e,a)},er=e=>{Gn(e,(t,n)=>{if(G(e)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const a=e[n];if(G(a)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},tr=(e,t)=>{const n={},a=r=>{r.forEach(o=>{n[o]=!0})};return he(e)?a(e):a(String(e).split(t)),n},nr=()=>{},ar=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function rr(e){return!!(e&&G(e.append)&&e[Un]==="FormData"&&e[rt])}const or=e=>{const t=new Array(10),n=(a,r)=>{if(_e(a)){if(t.indexOf(a)>=0)return;if(xe(a))return a;if(!("toJSON"in a)){t[r]=a;const o=he(a)?[]:{};return Te(a,(s,i)=>{const m=n(s,r+1);!ge(m)&&(o[i]=m)}),t[r]=void 0,o}}return a};return n(e,0)},sr=Z("AsyncFunction"),ir=e=>e&&(_e(e)||G(e))&&G(e.then)&&G(e.catch),Jn=((e,t)=>e?setImmediate:t?((n,a)=>(oe.addEventListener("message",({source:r,data:o})=>{r===oe&&o===n&&a.length&&a.shift()()},!1),r=>{a.push(r),oe.postMessage(n,"*")}))(`axios@${Math.random()}`,[]):n=>setTimeout(n))(typeof setImmediate=="function",G(oe.postMessage)),dr=typeof queueMicrotask<"u"?queueMicrotask.bind(oe):typeof process<"u"&&process.nextTick||Jn,lr=e=>e!=null&&G(e[rt]),u={isArray:he,isArrayBuffer:qn,isBuffer:xe,isFormData:Pa,isArrayBufferView:Ba,isString:Ia,isNumber:Hn,isBoolean:Sa,isObject:_e,isPlainObject:Ne,isEmptyObject:$a,isReadableStream:Oa,isRequest:ja,isResponse:Na,isHeaders:Ua,isUndefined:ge,isDate:Ca,isFile:xa,isReactNativeBlob:_a,isReactNative:Ta,isBlob:La,isRegExp:Ya,isFunction:G,isStream:Ra,isURLSearchParams:Da,isTypedArray:Ka,isFileList:Aa,forEach:Te,merge:vt,extend:Ha,trim:qa,stripBOM:Fa,inherits:Va,toFlatObject:Ga,kindOf:ot,kindOfTest:Z,endsWith:Ja,toArray:Wa,forEachEntry:za,matchAll:Xa,isHTMLForm:Za,hasOwnProperty:zt,hasOwnProp:zt,reduceDescriptors:Gn,freezeMethods:er,toObjectSet:tr,toCamelCase:Qa,noop:nr,toFiniteNumber:ar,findKey:Fn,global:oe,isContextDefined:Vn,isSpecCompliantForm:rr,toJSONObject:or,isAsyncFn:sr,isThenable:ir,setImmediate:Jn,asap:dr,isIterable:lr};let B=class Wn extends Error{static from(t,n,a,r,o,s){const i=new Wn(t.message,n||t.code,a,r,o);return i.cause=t,i.name=t.name,t.status!=null&&i.status==null&&(i.status=t.status),s&&Object.assign(i,s),i}constructor(t,n,a,r,o){super(t),Object.defineProperty(this,"message",{value:t,enumerable:!0,writable:!0,configurable:!0}),this.name="AxiosError",this.isAxiosError=!0,n&&(this.code=n),a&&(this.config=a),r&&(this.request=r),o&&(this.response=o,this.status=o.status)}toJSON(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:u.toJSONObject(this.config),code:this.code,status:this.status}}};B.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";B.ERR_BAD_OPTION="ERR_BAD_OPTION";B.ECONNABORTED="ECONNABORTED";B.ETIMEDOUT="ETIMEDOUT";B.ERR_NETWORK="ERR_NETWORK";B.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";B.ERR_DEPRECATED="ERR_DEPRECATED";B.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";B.ERR_BAD_REQUEST="ERR_BAD_REQUEST";B.ERR_CANCELED="ERR_CANCELED";B.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";B.ERR_INVALID_URL="ERR_INVALID_URL";const cr=null;function Et(e){return u.isPlainObject(e)||u.isArray(e)}function Kn(e){return u.endsWith(e,"[]")?e.slice(0,-2):e}function mt(e,t,n){return e?e.concat(t).map(function(r,o){return r=Kn(r),!n&&o?"["+r+"]":r}).join(n?".":""):t}function ur(e){return u.isArray(e)&&!e.some(Et)}const mr=u.toFlatObject(u,{},null,function(t){return/^is[A-Z]/.test(t)});function it(e,t,n){if(!u.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=u.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(h,b){return!u.isUndefined(b[h])});const a=n.metaTokens,r=n.visitor||l,o=n.dots,s=n.indexes,m=(n.Blob||typeof Blob<"u"&&Blob)&&u.isSpecCompliantForm(t);if(!u.isFunction(r))throw new TypeError("visitor must be a function");function d(g){if(g===null)return"";if(u.isDate(g))return g.toISOString();if(u.isBoolean(g))return g.toString();if(!m&&u.isBlob(g))throw new B("Blob is not supported. Use a Buffer instead.");return u.isArrayBuffer(g)||u.isTypedArray(g)?m&&typeof Blob=="function"?new Blob([g]):Buffer.from(g):g}function l(g,h,b){let x=g;if(u.isReactNative(t)&&u.isReactNativeBlob(g))return t.append(mt(b,h,o),d(g)),!1;if(g&&!b&&typeof g=="object"){if(u.endsWith(h,"{}"))h=a?h:h.slice(0,-2),g=JSON.stringify(g);else if(u.isArray(g)&&ur(g)||(u.isFileList(g)||u.endsWith(h,"[]"))&&(x=u.toArray(g)))return h=Kn(h),x.forEach(function(_,R){!(u.isUndefined(_)||_===null)&&t.append(s===!0?mt([h],R,o):s===null?h:h+"[]",d(_))}),!1}return Et(g)?!0:(t.append(mt(b,h,o),d(g)),!1)}const c=[],f=Object.assign(mr,{defaultVisitor:l,convertValue:d,isVisitable:Et});function y(g,h){if(!u.isUndefined(g)){if(c.indexOf(g)!==-1)throw Error("Circular reference detected in "+h.join("."));c.push(g),u.forEach(g,function(x,A){(!(u.isUndefined(x)||x===null)&&r.call(t,x,u.isString(A)?A.trim():A,h,f))===!0&&y(x,h?h.concat(A):[A])}),c.pop()}}if(!u.isObject(e))throw new TypeError("data must be an object");return y(e),t}function Xt(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(a){return t[a]})}function _t(e,t){this._pairs=[],e&&it(e,this,t)}const zn=_t.prototype;zn.append=function(t,n){this._pairs.push([t,n])};zn.toString=function(t){const n=t?function(a){return t.call(this,a,Xt)}:Xt;return this._pairs.map(function(r){return n(r[0])+"="+n(r[1])},"").join("&")};function pr(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function Xn(e,t,n){if(!t)return e;const a=n&&n.encode||pr,r=u.isFunction(n)?{serialize:n}:n,o=r&&r.serialize;let s;if(o?s=o(t,r):s=u.isURLSearchParams(t)?t.toString():new _t(t,r).toString(a),s){const i=e.indexOf("#");i!==-1&&(e=e.slice(0,i)),e+=(e.indexOf("?")===-1?"?":"&")+s}return e}class Zt{constructor(){this.handlers=[]}use(t,n,a){return this.handlers.push({fulfilled:t,rejected:n,synchronous:a?a.synchronous:!1,runWhen:a?a.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){u.forEach(this.handlers,function(a){a!==null&&t(a)})}}const Tt={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0},gr=typeof URLSearchParams<"u"?URLSearchParams:_t,fr=typeof FormData<"u"?FormData:null,br=typeof Blob<"u"?Blob:null,hr={isBrowser:!0,classes:{URLSearchParams:gr,FormData:fr,Blob:br},protocols:["http","https","file","blob","url","data"]},Lt=typeof window<"u"&&typeof document<"u",wt=typeof navigator=="object"&&navigator||void 0,kr=Lt&&(!wt||["ReactNative","NativeScript","NS"].indexOf(wt.product)<0),yr=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",vr=Lt&&window.location.href||"http://localhost",Er=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:Lt,hasStandardBrowserEnv:kr,hasStandardBrowserWebWorkerEnv:yr,navigator:wt,origin:vr},Symbol.toStringTag,{value:"Module"})),F={...Er,...hr};function wr(e,t){return it(e,new F.classes.URLSearchParams,{visitor:function(n,a,r,o){return F.isNode&&u.isBuffer(n)?(this.append(a,n.toString("base64")),!1):o.defaultVisitor.apply(this,arguments)},...t})}function Br(e){return u.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function Ir(e){const t={},n=Object.keys(e);let a;const r=n.length;let o;for(a=0;a<r;a++)o=n[a],t[o]=e[o];return t}function Zn(e){function t(n,a,r,o){let s=n[o++];if(s==="__proto__")return!0;const i=Number.isFinite(+s),m=o>=n.length;return s=!s&&u.isArray(r)?r.length:s,m?(u.hasOwnProp(r,s)?r[s]=[r[s],a]:r[s]=a,!i):((!r[s]||!u.isObject(r[s]))&&(r[s]=[]),t(n,a,r[s],o)&&u.isArray(r[s])&&(r[s]=Ir(r[s])),!i)}if(u.isFormData(e)&&u.isFunction(e.entries)){const n={};return u.forEachEntry(e,(a,r)=>{t(Br(a),r,n,0)}),n}return null}function Sr(e,t,n){if(u.isString(e))try{return(t||JSON.parse)(e),u.trim(e)}catch(a){if(a.name!=="SyntaxError")throw a}return(n||JSON.stringify)(e)}const Le={transitional:Tt,adapter:["xhr","http","fetch"],transformRequest:[function(t,n){const a=n.getContentType()||"",r=a.indexOf("application/json")>-1,o=u.isObject(t);if(o&&u.isHTMLForm(t)&&(t=new FormData(t)),u.isFormData(t))return r?JSON.stringify(Zn(t)):t;if(u.isArrayBuffer(t)||u.isBuffer(t)||u.isStream(t)||u.isFile(t)||u.isBlob(t)||u.isReadableStream(t))return t;if(u.isArrayBufferView(t))return t.buffer;if(u.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let i;if(o){if(a.indexOf("application/x-www-form-urlencoded")>-1)return wr(t,this.formSerializer).toString();if((i=u.isFileList(t))||a.indexOf("multipart/form-data")>-1){const m=this.env&&this.env.FormData;return it(i?{"files[]":t}:t,m&&new m,this.formSerializer)}}return o||r?(n.setContentType("application/json",!1),Sr(t)):t}],transformResponse:[function(t){const n=this.transitional||Le.transitional,a=n&&n.forcedJSONParsing,r=this.responseType==="json";if(u.isResponse(t)||u.isReadableStream(t))return t;if(t&&u.isString(t)&&(a&&!this.responseType||r)){const s=!(n&&n.silentJSONParsing)&&r;try{return JSON.parse(t,this.parseReviver)}catch(i){if(s)throw i.name==="SyntaxError"?B.from(i,B.ERR_BAD_RESPONSE,this,null,this.response):i}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:F.classes.FormData,Blob:F.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};u.forEach(["delete","get","head","post","put","patch"],e=>{Le.headers[e]={}});const $r=u.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),Cr=e=>{const t={};let n,a,r;return e&&e.split(`
`).forEach(function(s){r=s.indexOf(":"),n=s.substring(0,r).trim().toLowerCase(),a=s.substring(r+1).trim(),!(!n||t[n]&&$r[n])&&(n==="set-cookie"?t[n]?t[n].push(a):t[n]=[a]:t[n]=t[n]?t[n]+", "+a:a)}),t},Qt=Symbol("internals");function ye(e){return e&&String(e).trim().toLowerCase()}function Ue(e){return e===!1||e==null?e:u.isArray(e)?e.map(Ue):String(e)}function xr(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let a;for(;a=n.exec(e);)t[a[1]]=a[2];return t}const _r=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function pt(e,t,n,a,r){if(u.isFunction(a))return a.call(this,t,n);if(r&&(t=n),!!u.isString(t)){if(u.isString(a))return t.indexOf(a)!==-1;if(u.isRegExp(a))return a.test(t)}}function Tr(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,a)=>n.toUpperCase()+a)}function Lr(e,t){const n=u.toCamelCase(" "+t);["get","set","has"].forEach(a=>{Object.defineProperty(e,a+n,{value:function(r,o,s){return this[a].call(this,t,r,o,s)},configurable:!0})})}let J=class{constructor(t){t&&this.set(t)}set(t,n,a){const r=this;function o(i,m,d){const l=ye(m);if(!l)throw new Error("header name must be a non-empty string");const c=u.findKey(r,l);(!c||r[c]===void 0||d===!0||d===void 0&&r[c]!==!1)&&(r[c||m]=Ue(i))}const s=(i,m)=>u.forEach(i,(d,l)=>o(d,l,m));if(u.isPlainObject(t)||t instanceof this.constructor)s(t,n);else if(u.isString(t)&&(t=t.trim())&&!_r(t))s(Cr(t),n);else if(u.isObject(t)&&u.isIterable(t)){let i={},m,d;for(const l of t){if(!u.isArray(l))throw TypeError("Object iterator must return a key-value pair");i[d=l[0]]=(m=i[d])?u.isArray(m)?[...m,l[1]]:[m,l[1]]:l[1]}s(i,n)}else t!=null&&o(n,t,a);return this}get(t,n){if(t=ye(t),t){const a=u.findKey(this,t);if(a){const r=this[a];if(!n)return r;if(n===!0)return xr(r);if(u.isFunction(n))return n.call(this,r,a);if(u.isRegExp(n))return n.exec(r);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=ye(t),t){const a=u.findKey(this,t);return!!(a&&this[a]!==void 0&&(!n||pt(this,this[a],a,n)))}return!1}delete(t,n){const a=this;let r=!1;function o(s){if(s=ye(s),s){const i=u.findKey(a,s);i&&(!n||pt(a,a[i],i,n))&&(delete a[i],r=!0)}}return u.isArray(t)?t.forEach(o):o(t),r}clear(t){const n=Object.keys(this);let a=n.length,r=!1;for(;a--;){const o=n[a];(!t||pt(this,this[o],o,t,!0))&&(delete this[o],r=!0)}return r}normalize(t){const n=this,a={};return u.forEach(this,(r,o)=>{const s=u.findKey(a,o);if(s){n[s]=Ue(r),delete n[o];return}const i=t?Tr(o):String(o).trim();i!==o&&delete n[o],n[i]=Ue(r),a[i]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return u.forEach(this,(a,r)=>{a!=null&&a!==!1&&(n[r]=t&&u.isArray(a)?a.join(", "):a)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const a=new this(t);return n.forEach(r=>a.set(r)),a}static accessor(t){const a=(this[Qt]=this[Qt]={accessors:{}}).accessors,r=this.prototype;function o(s){const i=ye(s);a[i]||(Lr(r,s),a[i]=!0)}return u.isArray(t)?t.forEach(o):o(t),this}};J.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);u.reduceDescriptors(J.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(a){this[n]=a}}});u.freezeMethods(J);function gt(e,t){const n=this||Le,a=t||n,r=J.from(a.headers);let o=a.data;return u.forEach(e,function(i){o=i.call(n,o,r.normalize(),t?t.status:void 0)}),r.normalize(),o}function Qn(e){return!!(e&&e.__CANCEL__)}let Ae=class extends B{constructor(t,n,a){super(t??"canceled",B.ERR_CANCELED,n,a),this.name="CanceledError",this.__CANCEL__=!0}};function Yn(e,t,n){const a=n.config.validateStatus;!n.status||!a||a(n.status)?e(n):t(new B("Request failed with status code "+n.status,[B.ERR_BAD_REQUEST,B.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}function Ar(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function Rr(e,t){e=e||10;const n=new Array(e),a=new Array(e);let r=0,o=0,s;return t=t!==void 0?t:1e3,function(m){const d=Date.now(),l=a[o];s||(s=d),n[r]=m,a[r]=d;let c=o,f=0;for(;c!==r;)f+=n[c++],c=c%e;if(r=(r+1)%e,r===o&&(o=(o+1)%e),d-s<t)return;const y=l&&d-l;return y?Math.round(f*1e3/y):void 0}}function Mr(e,t){let n=0,a=1e3/t,r,o;const s=(d,l=Date.now())=>{n=l,r=null,o&&(clearTimeout(o),o=null),e(...d)};return[(...d)=>{const l=Date.now(),c=l-n;c>=a?s(d,l):(r=d,o||(o=setTimeout(()=>{o=null,s(r)},a-c)))},()=>r&&s(r)]}const Fe=(e,t,n=3)=>{let a=0;const r=Rr(50,250);return Mr(o=>{const s=o.loaded,i=o.lengthComputable?o.total:void 0,m=s-a,d=r(m),l=s<=i;a=s;const c={loaded:s,total:i,progress:i?s/i:void 0,bytes:m,rate:d||void 0,estimated:d&&i&&l?(i-s)/d:void 0,event:o,lengthComputable:i!=null,[t?"download":"upload"]:!0};e(c)},n)},Yt=(e,t)=>{const n=e!=null;return[a=>t[0]({lengthComputable:n,total:e,loaded:a}),t[1]]},en=e=>(...t)=>u.asap(()=>e(...t)),Pr=F.hasStandardBrowserEnv?((e,t)=>n=>(n=new URL(n,F.origin),e.protocol===n.protocol&&e.host===n.host&&(t||e.port===n.port)))(new URL(F.origin),F.navigator&&/(msie|trident)/i.test(F.navigator.userAgent)):()=>!0,Dr=F.hasStandardBrowserEnv?{write(e,t,n,a,r,o,s){if(typeof document>"u")return;const i=[`${e}=${encodeURIComponent(t)}`];u.isNumber(n)&&i.push(`expires=${new Date(n).toUTCString()}`),u.isString(a)&&i.push(`path=${a}`),u.isString(r)&&i.push(`domain=${r}`),o===!0&&i.push("secure"),u.isString(s)&&i.push(`SameSite=${s}`),document.cookie=i.join("; ")},read(e){if(typeof document>"u")return null;const t=document.cookie.match(new RegExp("(?:^|; )"+e+"=([^;]*)"));return t?decodeURIComponent(t[1]):null},remove(e){this.write(e,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function Or(e){return typeof e!="string"?!1:/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function jr(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function ea(e,t,n){let a=!Or(t);return e&&(a||n==!1)?jr(e,t):t}const tn=e=>e instanceof J?{...e}:e;function de(e,t){t=t||{};const n={};function a(d,l,c,f){return u.isPlainObject(d)&&u.isPlainObject(l)?u.merge.call({caseless:f},d,l):u.isPlainObject(l)?u.merge({},l):u.isArray(l)?l.slice():l}function r(d,l,c,f){if(u.isUndefined(l)){if(!u.isUndefined(d))return a(void 0,d,c,f)}else return a(d,l,c,f)}function o(d,l){if(!u.isUndefined(l))return a(void 0,l)}function s(d,l){if(u.isUndefined(l)){if(!u.isUndefined(d))return a(void 0,d)}else return a(void 0,l)}function i(d,l,c){if(c in t)return a(d,l);if(c in e)return a(void 0,d)}const m={url:o,method:o,data:o,baseURL:s,transformRequest:s,transformResponse:s,paramsSerializer:s,timeout:s,timeoutMessage:s,withCredentials:s,withXSRFToken:s,adapter:s,responseType:s,xsrfCookieName:s,xsrfHeaderName:s,onUploadProgress:s,onDownloadProgress:s,decompress:s,maxContentLength:s,maxBodyLength:s,beforeRedirect:s,transport:s,httpAgent:s,httpsAgent:s,cancelToken:s,socketPath:s,responseEncoding:s,validateStatus:i,headers:(d,l,c)=>r(tn(d),tn(l),c,!0)};return u.forEach(Object.keys({...e,...t}),function(l){if(l==="__proto__"||l==="constructor"||l==="prototype")return;const c=u.hasOwnProp(m,l)?m[l]:r,f=c(e[l],t[l],l);u.isUndefined(f)&&c!==i||(n[l]=f)}),n}const ta=e=>{const t=de({},e);let{data:n,withXSRFToken:a,xsrfHeaderName:r,xsrfCookieName:o,headers:s,auth:i}=t;if(t.headers=s=J.from(s),t.url=Xn(ea(t.baseURL,t.url,t.allowAbsoluteUrls),e.params,e.paramsSerializer),i&&s.set("Authorization","Basic "+btoa((i.username||"")+":"+(i.password?unescape(encodeURIComponent(i.password)):""))),u.isFormData(n)){if(F.hasStandardBrowserEnv||F.hasStandardBrowserWebWorkerEnv)s.setContentType(void 0);else if(u.isFunction(n.getHeaders)){const m=n.getHeaders(),d=["content-type","content-length"];Object.entries(m).forEach(([l,c])=>{d.includes(l.toLowerCase())&&s.set(l,c)})}}if(F.hasStandardBrowserEnv&&(a&&u.isFunction(a)&&(a=a(t)),a||a!==!1&&Pr(t.url))){const m=r&&o&&Dr.read(o);m&&s.set(r,m)}return t},Nr=typeof XMLHttpRequest<"u",Ur=Nr&&function(e){return new Promise(function(n,a){const r=ta(e);let o=r.data;const s=J.from(r.headers).normalize();let{responseType:i,onUploadProgress:m,onDownloadProgress:d}=r,l,c,f,y,g;function h(){y&&y(),g&&g(),r.cancelToken&&r.cancelToken.unsubscribe(l),r.signal&&r.signal.removeEventListener("abort",l)}let b=new XMLHttpRequest;b.open(r.method.toUpperCase(),r.url,!0),b.timeout=r.timeout;function x(){if(!b)return;const _=J.from("getAllResponseHeaders"in b&&b.getAllResponseHeaders()),O={data:!i||i==="text"||i==="json"?b.responseText:b.response,status:b.status,statusText:b.statusText,headers:_,config:e,request:b};Yn(function(H){n(H),h()},function(H){a(H),h()},O),b=null}"onloadend"in b?b.onloadend=x:b.onreadystatechange=function(){!b||b.readyState!==4||b.status===0&&!(b.responseURL&&b.responseURL.indexOf("file:")===0)||setTimeout(x)},b.onabort=function(){b&&(a(new B("Request aborted",B.ECONNABORTED,e,b)),b=null)},b.onerror=function(R){const O=R&&R.message?R.message:"Network Error",q=new B(O,B.ERR_NETWORK,e,b);q.event=R||null,a(q),b=null},b.ontimeout=function(){let R=r.timeout?"timeout of "+r.timeout+"ms exceeded":"timeout exceeded";const O=r.transitional||Tt;r.timeoutErrorMessage&&(R=r.timeoutErrorMessage),a(new B(R,O.clarifyTimeoutError?B.ETIMEDOUT:B.ECONNABORTED,e,b)),b=null},o===void 0&&s.setContentType(null),"setRequestHeader"in b&&u.forEach(s.toJSON(),function(R,O){b.setRequestHeader(O,R)}),u.isUndefined(r.withCredentials)||(b.withCredentials=!!r.withCredentials),i&&i!=="json"&&(b.responseType=r.responseType),d&&([f,g]=Fe(d,!0),b.addEventListener("progress",f)),m&&b.upload&&([c,y]=Fe(m),b.upload.addEventListener("progress",c),b.upload.addEventListener("loadend",y)),(r.cancelToken||r.signal)&&(l=_=>{b&&(a(!_||_.type?new Ae(null,e,b):_),b.abort(),b=null)},r.cancelToken&&r.cancelToken.subscribe(l),r.signal&&(r.signal.aborted?l():r.signal.addEventListener("abort",l)));const A=Ar(r.url);if(A&&F.protocols.indexOf(A)===-1){a(new B("Unsupported protocol "+A+":",B.ERR_BAD_REQUEST,e));return}b.send(o||null)})},qr=(e,t)=>{const{length:n}=e=e?e.filter(Boolean):[];if(t||n){let a=new AbortController,r;const o=function(d){if(!r){r=!0,i();const l=d instanceof Error?d:this.reason;a.abort(l instanceof B?l:new Ae(l instanceof Error?l.message:l))}};let s=t&&setTimeout(()=>{s=null,o(new B(`timeout of ${t}ms exceeded`,B.ETIMEDOUT))},t);const i=()=>{e&&(s&&clearTimeout(s),s=null,e.forEach(d=>{d.unsubscribe?d.unsubscribe(o):d.removeEventListener("abort",o)}),e=null)};e.forEach(d=>d.addEventListener("abort",o));const{signal:m}=a;return m.unsubscribe=()=>u.asap(i),m}},Hr=function*(e,t){let n=e.byteLength;if(n<t){yield e;return}let a=0,r;for(;a<n;)r=a+t,yield e.slice(a,r),a=r},Fr=async function*(e,t){for await(const n of Vr(e))yield*Hr(n,t)},Vr=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:n,value:a}=await t.read();if(n)break;yield a}}finally{await t.cancel()}},nn=(e,t,n,a)=>{const r=Fr(e,t);let o=0,s,i=m=>{s||(s=!0,a&&a(m))};return new ReadableStream({async pull(m){try{const{done:d,value:l}=await r.next();if(d){i(),m.close();return}let c=l.byteLength;if(n){let f=o+=c;n(f)}m.enqueue(new Uint8Array(l))}catch(d){throw i(d),d}},cancel(m){return i(m),r.return()}},{highWaterMark:2})},an=64*1024,{isFunction:je}=u,Gr=(({Request:e,Response:t})=>({Request:e,Response:t}))(u.global),{ReadableStream:rn,TextEncoder:on}=u.global,sn=(e,...t)=>{try{return!!e(...t)}catch{return!1}},Jr=e=>{e=u.merge.call({skipUndefined:!0},Gr,e);const{fetch:t,Request:n,Response:a}=e,r=t?je(t):typeof fetch=="function",o=je(n),s=je(a);if(!r)return!1;const i=r&&je(rn),m=r&&(typeof on=="function"?(g=>h=>g.encode(h))(new on):async g=>new Uint8Array(await new n(g).arrayBuffer())),d=o&&i&&sn(()=>{let g=!1;const h=new n(F.origin,{body:new rn,method:"POST",get duplex(){return g=!0,"half"}}).headers.has("Content-Type");return g&&!h}),l=s&&i&&sn(()=>u.isReadableStream(new a("").body)),c={stream:l&&(g=>g.body)};r&&["text","arrayBuffer","blob","formData","stream"].forEach(g=>{!c[g]&&(c[g]=(h,b)=>{let x=h&&h[g];if(x)return x.call(h);throw new B(`Response type '${g}' is not supported`,B.ERR_NOT_SUPPORT,b)})});const f=async g=>{if(g==null)return 0;if(u.isBlob(g))return g.size;if(u.isSpecCompliantForm(g))return(await new n(F.origin,{method:"POST",body:g}).arrayBuffer()).byteLength;if(u.isArrayBufferView(g)||u.isArrayBuffer(g))return g.byteLength;if(u.isURLSearchParams(g)&&(g=g+""),u.isString(g))return(await m(g)).byteLength},y=async(g,h)=>{const b=u.toFiniteNumber(g.getContentLength());return b??f(h)};return async g=>{let{url:h,method:b,data:x,signal:A,cancelToken:_,timeout:R,onDownloadProgress:O,onUploadProgress:q,responseType:H,headers:z,withCredentials:Q="same-origin",fetchOptions:T}=ta(g),U=t||fetch;H=H?(H+"").toLowerCase():"text";let W=qr([A,_&&_.toAbortSignal()],R),Y=null;const ee=W&&W.unsubscribe&&(()=>{W.unsubscribe()});let X;try{if(q&&d&&b!=="get"&&b!=="head"&&(X=await y(z,x))!==0){let ae=new n(h,{method:"POST",body:x,duplex:"half"}),le;if(u.isFormData(x)&&(le=ae.headers.get("content-type"))&&z.setContentType(le),ae.body){const[ut,Oe]=Yt(X,Fe(en(q)));x=nn(ae.body,an,ut,Oe)}}u.isString(Q)||(Q=Q?"include":"omit");const N=o&&"credentials"in n.prototype,De={...T,signal:W,method:b.toUpperCase(),headers:z.normalize().toJSON(),body:x,duplex:"half",credentials:N?Q:void 0};Y=o&&new n(h,De);let ne=await(o?U(Y,T):U(h,De));const Gt=l&&(H==="stream"||H==="response");if(l&&(O||Gt&&ee)){const ae={};["status","statusText","headers"].forEach(Jt=>{ae[Jt]=ne[Jt]});const le=u.toFiniteNumber(ne.headers.get("content-length")),[ut,Oe]=O&&Yt(le,Fe(en(O),!0))||[];ne=new a(nn(ne.body,an,ut,()=>{Oe&&Oe(),ee&&ee()}),ae)}H=H||"text";let Ea=await c[u.findKey(c,H)||"text"](ne,g);return!Gt&&ee&&ee(),await new Promise((ae,le)=>{Yn(ae,le,{data:Ea,headers:J.from(ne.headers),status:ne.status,statusText:ne.statusText,config:g,request:Y})})}catch(N){throw ee&&ee(),N&&N.name==="TypeError"&&/Load failed|fetch/i.test(N.message)?Object.assign(new B("Network Error",B.ERR_NETWORK,g,Y,N&&N.response),{cause:N.cause||N}):B.from(N,N&&N.code,g,Y,N&&N.response)}}},Wr=new Map,na=e=>{let t=e&&e.env||{};const{fetch:n,Request:a,Response:r}=t,o=[a,r,n];let s=o.length,i=s,m,d,l=Wr;for(;i--;)m=o[i],d=l.get(m),d===void 0&&l.set(m,d=i?new Map:Jr(t)),l=d;return d};na();const At={http:cr,xhr:Ur,fetch:{get:na}};u.forEach(At,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const dn=e=>`- ${e}`,Kr=e=>u.isFunction(e)||e===null||e===!1;function zr(e,t){e=u.isArray(e)?e:[e];const{length:n}=e;let a,r;const o={};for(let s=0;s<n;s++){a=e[s];let i;if(r=a,!Kr(a)&&(r=At[(i=String(a)).toLowerCase()],r===void 0))throw new B(`Unknown adapter '${i}'`);if(r&&(u.isFunction(r)||(r=r.get(t))))break;o[i||"#"+s]=r}if(!r){const s=Object.entries(o).map(([m,d])=>`adapter ${m} `+(d===!1?"is not supported by the environment":"is not available in the build"));let i=n?s.length>1?`since :
`+s.map(dn).join(`
`):" "+dn(s[0]):"as no adapter specified";throw new B("There is no suitable adapter to dispatch the request "+i,"ERR_NOT_SUPPORT")}return r}const aa={getAdapter:zr,adapters:At};function ft(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new Ae(null,e)}function ln(e){return ft(e),e.headers=J.from(e.headers),e.data=gt.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),aa.getAdapter(e.adapter||Le.adapter,e)(e).then(function(a){return ft(e),a.data=gt.call(e,e.transformResponse,a),a.headers=J.from(a.headers),a},function(a){return Qn(a)||(ft(e),a&&a.response&&(a.response.data=gt.call(e,e.transformResponse,a.response),a.response.headers=J.from(a.response.headers))),Promise.reject(a)})}const ra="1.13.6",dt={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{dt[e]=function(a){return typeof a===e||"a"+(t<1?"n ":" ")+e}});const cn={};dt.transitional=function(t,n,a){function r(o,s){return"[Axios v"+ra+"] Transitional option '"+o+"'"+s+(a?". "+a:"")}return(o,s,i)=>{if(t===!1)throw new B(r(s," has been removed"+(n?" in "+n:"")),B.ERR_DEPRECATED);return n&&!cn[s]&&(cn[s]=!0,console.warn(r(s," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(o,s,i):!0}};dt.spelling=function(t){return(n,a)=>(console.warn(`${a} is likely a misspelling of ${t}`),!0)};function Xr(e,t,n){if(typeof e!="object")throw new B("options must be an object",B.ERR_BAD_OPTION_VALUE);const a=Object.keys(e);let r=a.length;for(;r-- >0;){const o=a[r],s=t[o];if(s){const i=e[o],m=i===void 0||s(i,o,e);if(m!==!0)throw new B("option "+o+" must be "+m,B.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new B("Unknown option "+o,B.ERR_BAD_OPTION)}}const qe={assertOptions:Xr,validators:dt},K=qe.validators;let ie=class{constructor(t){this.defaults=t||{},this.interceptors={request:new Zt,response:new Zt}}async request(t,n){try{return await this._request(t,n)}catch(a){if(a instanceof Error){let r={};Error.captureStackTrace?Error.captureStackTrace(r):r=new Error;const o=r.stack?r.stack.replace(/^.+\n/,""):"";try{a.stack?o&&!String(a.stack).endsWith(o.replace(/^.+\n.+\n/,""))&&(a.stack+=`
`+o):a.stack=o}catch{}}throw a}}_request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=de(this.defaults,n);const{transitional:a,paramsSerializer:r,headers:o}=n;a!==void 0&&qe.assertOptions(a,{silentJSONParsing:K.transitional(K.boolean),forcedJSONParsing:K.transitional(K.boolean),clarifyTimeoutError:K.transitional(K.boolean),legacyInterceptorReqResOrdering:K.transitional(K.boolean)},!1),r!=null&&(u.isFunction(r)?n.paramsSerializer={serialize:r}:qe.assertOptions(r,{encode:K.function,serialize:K.function},!0)),n.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?n.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:n.allowAbsoluteUrls=!0),qe.assertOptions(n,{baseUrl:K.spelling("baseURL"),withXsrfToken:K.spelling("withXSRFToken")},!0),n.method=(n.method||this.defaults.method||"get").toLowerCase();let s=o&&u.merge(o.common,o[n.method]);o&&u.forEach(["delete","get","head","post","put","patch","common"],g=>{delete o[g]}),n.headers=J.concat(s,o);const i=[];let m=!0;this.interceptors.request.forEach(function(h){if(typeof h.runWhen=="function"&&h.runWhen(n)===!1)return;m=m&&h.synchronous;const b=n.transitional||Tt;b&&b.legacyInterceptorReqResOrdering?i.unshift(h.fulfilled,h.rejected):i.push(h.fulfilled,h.rejected)});const d=[];this.interceptors.response.forEach(function(h){d.push(h.fulfilled,h.rejected)});let l,c=0,f;if(!m){const g=[ln.bind(this),void 0];for(g.unshift(...i),g.push(...d),f=g.length,l=Promise.resolve(n);c<f;)l=l.then(g[c++],g[c++]);return l}f=i.length;let y=n;for(;c<f;){const g=i[c++],h=i[c++];try{y=g(y)}catch(b){h.call(this,b);break}}try{l=ln.call(this,y)}catch(g){return Promise.reject(g)}for(c=0,f=d.length;c<f;)l=l.then(d[c++],d[c++]);return l}getUri(t){t=de(this.defaults,t);const n=ea(t.baseURL,t.url,t.allowAbsoluteUrls);return Xn(n,t.params,t.paramsSerializer)}};u.forEach(["delete","get","head","options"],function(t){ie.prototype[t]=function(n,a){return this.request(de(a||{},{method:t,url:n,data:(a||{}).data}))}});u.forEach(["post","put","patch"],function(t){function n(a){return function(o,s,i){return this.request(de(i||{},{method:t,headers:a?{"Content-Type":"multipart/form-data"}:{},url:o,data:s}))}}ie.prototype[t]=n(),ie.prototype[t+"Form"]=n(!0)});let Zr=class oa{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(o){n=o});const a=this;this.promise.then(r=>{if(!a._listeners)return;let o=a._listeners.length;for(;o-- >0;)a._listeners[o](r);a._listeners=null}),this.promise.then=r=>{let o;const s=new Promise(i=>{a.subscribe(i),o=i}).then(r);return s.cancel=function(){a.unsubscribe(o)},s},t(function(o,s,i){a.reason||(a.reason=new Ae(o,s,i),n(a.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}toAbortSignal(){const t=new AbortController,n=a=>{t.abort(a)};return this.subscribe(n),t.signal.unsubscribe=()=>this.unsubscribe(n),t.signal}static source(){let t;return{token:new oa(function(r){t=r}),cancel:t}}};function Qr(e){return function(n){return e.apply(null,n)}}function Yr(e){return u.isObject(e)&&e.isAxiosError===!0}const Bt={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(Bt).forEach(([e,t])=>{Bt[t]=e});function sa(e){const t=new ie(e),n=Nn(ie.prototype.request,t);return u.extend(n,ie.prototype,t,{allOwnKeys:!0}),u.extend(n,t,null,{allOwnKeys:!0}),n.create=function(r){return sa(de(e,r))},n}const j=sa(Le);j.Axios=ie;j.CanceledError=Ae;j.CancelToken=Zr;j.isCancel=Qn;j.VERSION=ra;j.toFormData=it;j.AxiosError=B;j.Cancel=j.CanceledError;j.all=function(t){return Promise.all(t)};j.spread=Qr;j.isAxiosError=Yr;j.mergeConfig=de;j.AxiosHeaders=J;j.formToJSON=e=>Zn(u.isHTMLForm(e)?new FormData(e):e);j.getAdapter=aa.getAdapter;j.HttpStatusCode=Bt;j.default=j;const{Axios:ri,AxiosError:oi,CanceledError:si,isCancel:ii,CancelToken:di,VERSION:li,all:ci,Cancel:ui,isAxiosError:mi,spread:pi,toFormData:gi,AxiosHeaders:fi,HttpStatusCode:bi,formToJSON:hi,getAdapter:ki,mergeConfig:yi}=j;window.axios=j;window.axios.defaults.headers.common["X-Requested-With"]="XMLHttpRequest";const Rt="transit_user",Ve="transit_token",It="transit_pending_toast";function ke(){try{return typeof window<"u"&&typeof window.localStorage<"u"}catch{return!1}}function ia(){try{return typeof window<"u"&&typeof window.sessionStorage<"u"}catch{return!1}}function eo(){if(window.transitAuthUser)return window.transitAuthUser;if(!ke())return null;const e=window.localStorage.getItem(Rt);if(!e)return null;try{return JSON.parse(e)}catch{return Ie(),null}}function da(e){if(!ke()){window.transitAuthUser=e;return}window.transitAuthUser=e,window.localStorage.setItem(Rt,JSON.stringify(e))}function to(){if(!ke()){window.transitAuthUser=null;return}window.transitAuthUser=null,window.localStorage.removeItem(Rt)}function Mt(){return typeof window<"u"&&typeof window.transitAuthToken=="string"&&window.transitAuthToken!==""?window.transitAuthToken:ke()?window.localStorage.getItem(Ve):null}function no(e){const t=typeof e=="string"?e:"";if(!ke()){window.transitAuthToken=t||null;return}if(window.transitAuthToken=t||null,t===""){window.localStorage.removeItem(Ve);return}window.localStorage.setItem(Ve,t)}function ao(){if(!ke()){window.transitAuthToken=null;return}window.transitAuthToken=null,window.localStorage.removeItem(Ve)}function ro(e){ia()&&window.sessionStorage.setItem(It,JSON.stringify(e))}function oo(){if(!ia())return null;const e=window.sessionStorage.getItem(It);if(!e)return null;window.sessionStorage.removeItem(It);try{return JSON.parse(e)}catch{return null}}function Ie(){to(),ao()}function la(e,t){if(!e)return t;if(typeof e.detail=="string"&&e.detail!=="")return e.detail;if(typeof e.message=="string"&&e.message!=="")return e.message;if(e.errors&&typeof e.errors=="object"){const n=Object.values(e.errors).flat()[0];if(typeof n=="string"&&n!=="")return n}return t}function un(){return document.body.dataset.apiBase||"/api"}function ca(e=""){const t=String(e).replace(/^\/+/,"");return t===""?un():`${un()}/${t}`}async function S(e,t={}){const{method:n="GET",body:a=null,headers:r={},auth:o=!0}=t,s=new Headers(r);s.set("Accept","application/json"),s.set("X-Requested-With","XMLHttpRequest");let i=a;if(a&&!(a instanceof FormData)&&!(a instanceof Blob)&&(s.set("Content-Type","application/json"),i=JSON.stringify(a)),o){const c=Mt();c&&s.set("Authorization",`Bearer ${c}`)}if(!["GET","HEAD","OPTIONS"].includes(n.toUpperCase())){const c=document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");c&&s.set("X-CSRF-TOKEN",c)}const m=await fetch(ca(e),{method:n,headers:s,body:i,credentials:"same-origin"});let d=null;const l=m.headers.get("content-type")||"";if(m.status!==204&&(d=l.includes("application/json")?await m.json():await m.text()),!m.ok){m.status===401&&(Ie(),(document.body.dataset.routeGuard||"none")==="protected"&&window.location.replace(document.body.dataset.loginUrl||"/login"));const c=la(d,`Request gagal (${m.status})`),f=new Error(c);throw f.status=m.status,f.data=d,f}return d}async function Pt(e,t="export.csv"){const n=new Headers({Accept:"text/csv,application/octet-stream","X-Requested-With":"XMLHttpRequest"}),a=Mt();a&&n.set("Authorization",`Bearer ${a}`);const r=await fetch(ca(e),{method:"GET",headers:n,credentials:"same-origin"});if(!r.ok){let c=null;throw(r.headers.get("content-type")||"").includes("application/json")&&(c=await r.json()),new Error(la(c,"Gagal mengunduh file"))}const o=await r.blob(),m=(r.headers.get("content-disposition")||"").match(/filename="?([^"]+)"?/i)?.[1]||t,d=window.URL.createObjectURL(o),l=document.createElement("a");l.href=d,l.download=m,document.body.appendChild(l),l.click(),l.remove(),window.URL.revokeObjectURL(d)}function ve(e,t){const n=document.getElementById(e);n&&(n.textContent=t)}function so(e){const t=e?.role||"";document.querySelectorAll("[data-role-scope]").forEach(n=>{const a=n.dataset.roleScope,r=a==="admin"?["Super Admin","Admin"].includes(t):a==="super"?t==="Super Admin":!0;n.hidden=!r})}function ua(){return eo()}function Ge(e){if(so(e),!e)return;const t=e.nama||"Admin",n=t.trim().split(/\s+/)[0]||"Admin",a=e.email||"admin@pekanbaru.com";ve("sidebar-user-name",t),ve("sidebar-user-email",a),ve("header-user-name",n),ve("dropdown-user-name",t),ve("dropdown-user-email",a)}function ma(e){return typeof e.access_token=="string"&&e.access_token!==""&&no(e.access_token),da(e.user),Ge(e.user),e}async function io(e){const t=await S("/auth/login",{method:"POST",body:e,auth:!1});return ma(t)}async function lo(e){const t=await S("/auth/register",{method:"POST",body:e,auth:!1});return ma(t)}async function mn(){const e=await S("/auth/me");return da(e),Ge(e),e}async function co(){try{await S("/auth/logout",{method:"POST"})}catch(e){if(e?.status!==401)throw e}Ie(),ro({type:"success",title:"Logout berhasil",message:"Sampai jumpa kembali!"}),window.location.replace(document.body.dataset.loginUrl||"/login")}function pn(e){window.location.replace(e)}async function uo(){const e=document.body.dataset.routeGuard||"none",t=document.body.dataset.loginUrl||"/login",n=document.body.dataset.dashboardUrl||"/dashboard",a=ua();if(e==="public"){try{const r=await mn();return pn(n),{user:r}}catch{(a||Mt())&&Ie()}return{user:null}}if(e==="protected")try{return{user:await mn()}}catch{return Ie(),pn(t),{user:null}}return{user:a}}function Dt(){return Array.from(document.querySelectorAll(".modal-shell")).filter(e=>!e.hidden)}function pa(){document.body.style.overflow=Dt().length>0?"hidden":""}function D(e){const t=document.getElementById(e);t&&(t.hidden=!1,pa())}function V(e=null){if(e){const t=document.getElementById(e);t&&(t.hidden=!0)}else Dt().forEach(t=>{t.hidden=!0});pa()}function mo(){document.addEventListener("click",e=>{const t=e.target.closest("[data-modal-open]");if(t){D(t.dataset.modalOpen);return}const n=e.target.closest("[data-modal-close]");if(n){const a=n.dataset.modalClose||n.closest(".modal-shell")?.id;V(a||void 0)}}),document.addEventListener("keydown",e=>{if(e.key!=="Escape")return;const t=Dt().pop();t&&V(t.id)})}function Ot(e,t,n){const a=document.getElementById("transit-toast-root");if(!a)return;const r=document.createElement("div");r.className=`transit-toast ${n==="error"?"is-error":""} ${n==="info"?"is-info":""}`.trim(),r.innerHTML=`
        <div>
            <strong>${e}</strong>
            <p>${t}</p>
        </div>
    `,a.appendChild(r),window.requestAnimationFrame(()=>{r.classList.add("is-visible")}),window.setTimeout(()=>{r.classList.remove("is-visible"),window.setTimeout(()=>r.remove(),180)},3600)}function P(e,t="Berhasil"){Ot(t,e,"success")}function v(e,t="Gagal"){Ot(t,e,"error")}function po(e,t="Info"){Ot(t,e,"info")}function Ee(e){const t=document.querySelector("[data-sidebar]"),n=document.querySelector("[data-sidebar-overlay]");!t||!n||(t.classList.toggle("is-open",e),n.hidden=!e)}function He(e=null){document.querySelectorAll("[data-user-dropdown]").forEach(t=>{if(e&&t===e)return;t.classList.remove("is-open");const n=t.querySelector("[data-user-menu-trigger]"),a=t.querySelector("[data-user-menu-panel]");n&&n.setAttribute("aria-expanded","false"),a&&(a.hidden=!0)})}function go(e,t=null){if(!e)return;const n=e.querySelector("[data-user-menu-trigger]"),a=e.querySelector("[data-user-menu-panel]"),r=t??!e.classList.contains("is-open");He(r?e:null),e.classList.toggle("is-open",r),n&&n.setAttribute("aria-expanded",r?"true":"false"),a&&(a.hidden=!r)}function fo(){document.querySelector("[data-sidebar-open]")?.addEventListener("click",()=>{Ee(!0)}),document.querySelector("[data-sidebar-close]")?.addEventListener("click",()=>{Ee(!1)}),document.querySelector("[data-sidebar-overlay]")?.addEventListener("click",()=>{Ee(!1)}),document.querySelectorAll("[data-user-dropdown]").forEach(e=>{e.querySelector("[data-user-menu-trigger]")?.addEventListener("click",t=>{t.stopPropagation(),go(e)})}),document.addEventListener("click",e=>{e.target.closest("[data-user-dropdown]")||He()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&(He(),Ee(!1))}),window.addEventListener("resize",()=>{window.innerWidth>1100&&Ee(!1)}),document.querySelectorAll("[data-auth-logout]").forEach(e=>{e.addEventListener("click",async()=>{V(),He();try{e.disabled=!0,await co()}catch(t){e.disabled=!1,v(t.message||"Gagal logout")}})})}const ga={login:{title:"Selamat Datang!",description:"Masuk ke akun Anda untuk melanjutkan",submit:"Masuk",switchText:"Belum punya akun?",switchAction:"Daftar sekarang"},register:{title:"Buat Akun Baru",description:"Daftar untuk mulai menggunakan sistem",submit:"Daftar",switchText:"Sudah punya akun?",switchAction:"Masuk"}};function gn(e,t){const n=ga[e];t.form.dataset.authMode=e,t.title.textContent=n.title,t.description.textContent=n.description,t.submitText.textContent=n.submit,t.switchText&&(t.switchText.textContent=n.switchText),t.switchButton&&(t.switchButton.textContent=n.switchAction),t.nameField.hidden=e!=="register",t.nameInput.required=e==="register"}function bo(){const e=document.getElementById("auth-form");if(!e)return;const t={form:e,title:document.querySelector("[data-auth-title]"),description:document.querySelector("[data-auth-description]"),submitText:document.querySelector("[data-auth-submit-text]"),switchText:document.querySelector("[data-auth-switch-text]"),switchButton:document.querySelector("[data-toggle-auth-mode]"),nameField:document.getElementById("auth-name-field"),nameInput:document.getElementById("nama"),emailInput:document.getElementById("email"),passwordInput:document.getElementById("password"),passwordToggle:document.querySelector("[data-toggle-password]"),submitButton:document.getElementById("auth-submit-button")},n=document.body.dataset.dashboardUrl||"/dashboard";gn("login",t),t.switchButton?.addEventListener("click",()=>{const a=t.form.dataset.authMode==="login"?"register":"login";gn(a,t)}),t.passwordToggle?.addEventListener("click",()=>{const a=t.passwordInput.type==="password"?"text":"password";t.passwordInput.type=a,t.passwordToggle.textContent=a==="password"?"Lihat":"Sembunyikan"}),e.addEventListener("submit",async a=>{a.preventDefault();const r=new FormData(e),o=e.dataset.authMode||"login",s={email:String(r.get("email")||"").trim(),password:String(r.get("password")||"").trim()};o==="register"&&(s.nama=String(r.get("nama")||"").trim()),t.submitButton.disabled=!0,t.submitText.textContent=o==="login"?"Memproses...":"Mendaftarkan...";try{o==="login"?(await io(s),P("Selamat datang kembali","Login berhasil!")):(await lo(s),P("Akun Anda telah dibuat","Registrasi berhasil!")),window.location.replace(n)}catch(i){v(i.message||"Terjadi kesalahan",o==="login"?"Login gagal":"Registrasi gagal")}finally{t.submitButton.disabled=!1,t.submitText.textContent=ga[o].submit}})}const ho=new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}),ko=new Intl.NumberFormat("id-ID");function M(e){return ho.format(Number(e)||0)}function L(e){return ko.format(Number(e)||0)}function p(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Re(e,t=300){let n=null;return(...a)=>{window.clearTimeout(n),n=window.setTimeout(()=>e(...a),t)}}function Me(e,t,n,a){if(n===0||a===0)return"Menampilkan 0 - 0 dari 0 data";const r=(e-1)*t+1,o=r+a-1;return`Menampilkan ${r} - ${o} dari ${n} data`}function yo(e){if(!e)return"-";const t=new Date(e);return Number.isNaN(t.getTime())?e:new Intl.DateTimeFormat("id-ID",{day:"2-digit",month:"short",year:"numeric"}).format(t)}function Pe(){return new Date().toISOString().slice(0,10)}function se(e,t,n="Memproses..."){e&&(e.dataset.defaultText||(e.dataset.defaultText=e.textContent.trim()),e.disabled=t,e.textContent=t?n:e.dataset.defaultText)}const Je=["#059669","#10B981","#34D399","#6EE7B7","#A7F3D0"],te={revenueChart:null,passengerChart:null,mobilChart:null};function vo(){const e=document.getElementById("dashboard-initial-state");if(!e)return{stats:{},revenueData:[],mobilRevenue:[]};try{return JSON.parse(e.textContent||"{}")}catch{return{stats:{},revenueData:[],mobilRevenue:[]}}}function jt(e){e&&typeof e.destroy=="function"&&e.destroy()}function Eo(e,t){const n=document.querySelector(`[data-stat="${e}"]`);if(!n)return;const a=["total_uang_bersih","total_uang_pc"];n.textContent=a.includes(e)?M(t):L(t)}function fa(e,t,n){const a=document.getElementById(e),r=document.getElementById(t);a&&(a.hidden=!n),r&&(r.hidden=n)}function wo(){return"#065f46"}function St(){return"#d1fae5"}function Nt(){return{backgroundColor:"#ffffff",titleColor:"#064e3b",bodyColor:"#065f46",borderColor:"#d1fae5",borderWidth:1,padding:12,cornerRadius:12,displayColors:!0}}function Bo(e){const t=document.getElementById("dashboard-revenue-chart"),n=Array.isArray(e)&&e.length>0;if(fa("dashboard-revenue-chart","dashboard-revenue-empty",n),jt(te.revenueChart),!t||!window.Chart||!n){te.revenueChart=null;return}te.revenueChart=new window.Chart(t,{type:"line",data:{labels:e.map(a=>a.bulan),datasets:[{label:"Pendapatan Bersih",data:e.map(a=>a.uang_bersih),borderColor:"#059669",backgroundColor:"rgba(5, 150, 105, 0.08)",fill:!1,tension:.35,pointRadius:4,pointHoverRadius:5,pointBackgroundColor:"#059669",pointBorderColor:"#ffffff",pointBorderWidth:2,borderWidth:3},{label:"Uang PC",data:e.map(a=>a.uang_pc),borderColor:"#f59e0b",backgroundColor:"rgba(245, 158, 11, 0.1)",fill:!1,tension:.35,pointRadius:4,pointHoverRadius:5,pointBackgroundColor:"#f59e0b",pointBorderColor:"#ffffff",pointBorderWidth:2,borderWidth:3}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{labels:{color:wo(),usePointStyle:!0,pointStyle:"circle",boxWidth:8,boxHeight:8,padding:18}},tooltip:{...Nt(),callbacks:{label(a){return`${a.dataset.label}: ${M(a.parsed.y)}`}}}},scales:{x:{ticks:{color:"#047857",font:{size:12}},grid:{color:St()},border:{display:!1}},y:{ticks:{color:"#047857",font:{size:12},callback(a){return`${Math.round(Number(a)/1e6)}jt`}},grid:{color:St()},border:{display:!1}}}}})}function Io(e){const t=document.getElementById("dashboard-passenger-chart"),n=Array.isArray(e)&&e.length>0;if(fa("dashboard-passenger-chart","dashboard-passenger-empty",n),jt(te.passengerChart),!t||!window.Chart||!n){te.passengerChart=null;return}te.passengerChart=new window.Chart(t,{type:"bar",data:{labels:e.map(a=>a.bulan),datasets:[{label:"Penumpang",data:e.map(a=>a.penumpang),backgroundColor:"#10B981",borderRadius:8,maxBarThickness:44}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{...Nt(),callbacks:{label(a){return`Penumpang: ${L(a.parsed.y)}`}}}},scales:{x:{ticks:{color:"#047857",font:{size:12}},grid:{color:"rgba(0, 0, 0, 0)"},border:{display:!1}},y:{ticks:{color:"#047857",font:{size:12}},grid:{color:St()},border:{display:!1}}}}})}function So(e){const t=document.getElementById("dashboard-mobil-list");t&&(t.innerHTML=e.map((n,a)=>`
        <div class="dashboard-mobil-item">
            <div class="dashboard-mobil-meta">
                <span class="dashboard-mobil-dot" style="background-color: ${Je[a%Je.length]}"></span>
                <div>
                    <p class="dashboard-mobil-code">${p(n.kode_mobil)}</p>
                    <p class="dashboard-mobil-trips">${L(n.total_trips)} trip</p>
                    <p class="dashboard-mobil-passengers">${L(n.total_penumpang)} penumpang</p>
                </div>
            </div>
            <p class="dashboard-mobil-value">${M(n.total_uang_bersih)}</p>
        </div>
    `).join(""))}function $o(e){const t=document.getElementById("dashboard-mobil-chart"),n=document.getElementById("dashboard-mobil-content"),a=document.getElementById("dashboard-mobil-empty"),r=document.getElementById("dashboard-mobil-chart-empty"),o=document.getElementById("dashboard-mobil-list"),s=Array.isArray(e)&&e.length>0,i=s&&e.some(m=>Number(m.total_uang_bersih)>0);if(jt(te.mobilChart),n&&(n.hidden=!s),a&&(a.hidden=s),t&&(t.hidden=!i),r&&(r.hidden=i),s?So(e):o&&(o.innerHTML=""),!t||!window.Chart||!i){te.mobilChart=null;return}te.mobilChart=new window.Chart(t,{type:"doughnut",data:{labels:e.map(m=>m.kode_mobil),datasets:[{data:e.map(m=>m.total_uang_bersih),backgroundColor:e.map((m,d)=>Je[d%Je.length]),borderColor:"#ffffff",borderWidth:6,hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"58%",plugins:{legend:{display:!1},tooltip:{...Nt(),callbacks:{label(m){const d=e[m.dataIndex]||{};return`${m.label}: ${M(m.parsed)} / ${L(d.total_penumpang||0)} penumpang`}}}}}})}function fn(e){Object.entries(e.stats||{}).forEach(([t,n])=>Eo(t,n)),Bo(e.revenueData||[]),Io(e.revenueData||[]),$o(e.mobilRevenue||[])}async function Co(){const[e,t,n]=await Promise.all([S("/statistics/dashboard"),S("/statistics/revenue-chart"),S("/statistics/mobil-revenue")]);return{stats:e,revenueData:t,mobilRevenue:n}}function bn(e){const t=document.querySelector("[data-dashboard-loading]"),n=document.querySelector("[data-dashboard-content]"),a=document.getElementById("dashboard-refresh-btn");t&&(t.hidden=!e),n&&(n.hidden=e),a&&(a.disabled=e)}async function xo(){const e=document.getElementById("dashboard-refresh-btn");e&&(fn(vo()),e.addEventListener("click",async()=>{bn(!0);try{fn(await Co())}catch{v("Silakan coba lagi","Gagal memuat data")}finally{bn(!1)}}))}const C={data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1},fe=10;function _o(){return`
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
            <td class="drivers-index-cell">${(C.page-1)*fe+n+1}</td>
            <td>
                <div class="drivers-user-cell">
                    <span class="drivers-user-avatar" aria-hidden="true">
                        ${_o()}
                    </span>
                    <span class="drivers-user-name">${p(t.nama)}</span>
                </div>
            </td>
            <td>
                <div class="drivers-location-cell">
                    <span class="drivers-location-icon" aria-hidden="true">${To()}</span>
                    <span>${p(t.lokasi)}</span>
                </div>
            </td>
            <td>
                <div class="drivers-action-row">
                    <button
                        class="drivers-icon-button"
                        type="button"
                        data-driver-edit="${t.id}"
                        data-testid="edit-driver-${t.id}"
                        aria-label="Edit driver ${p(t.nama)}"
                    >
                        ${Lo()}
                    </button>
                    <button
                        class="drivers-icon-button drivers-icon-button-danger"
                        type="button"
                        data-driver-delete="${t.id}"
                        data-driver-name="${p(t.nama)}"
                        data-testid="delete-driver-${t.id}"
                        aria-label="Hapus driver ${p(t.nama)}"
                    >
                        ${Ao()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function kn(){const e=document.getElementById("drivers-pagination-shell"),t=document.getElementById("drivers-pagination-info"),n=document.getElementById("drivers-pagination-page"),a=document.getElementById("drivers-prev-page-btn"),r=document.getElementById("drivers-next-page-btn"),o=Math.max(1,Math.ceil(C.totalCount/fe));e&&(e.hidden=o<=1),t&&(t.textContent=Me(C.page,fe,C.totalCount,C.data.length)),n&&(n.textContent=`${C.page} / ${o}`),a&&(a.disabled=C.page===1),r&&(r.disabled=C.page>=o)}async function ce(){C.loading=!0,hn(),kn();try{const[e,t]=await Promise.all([S(`/drivers?page=${C.page}&limit=${fe}${C.search?`&search=${encodeURIComponent(C.search)}`:""}`),S(`/drivers/count${C.search?`?search=${encodeURIComponent(C.search)}`:""}`)]);C.data=Array.isArray(e)?e:[],C.totalCount=Number(t.count||0)}finally{C.loading=!1,hn(),kn()}}function yn(){const e=document.getElementById("driver-form"),t=document.getElementById("driver-form-title"),n=document.getElementById("driver-form-description"),a=document.getElementById("driver-id"),r=document.getElementById("driver-nama"),o=document.getElementById("driver-lokasi");e?.reset(),a&&(a.value=""),r&&(r.value=""),o&&(o.value=""),t&&(t.textContent="Tambah Driver Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan data driver"),C.editItem=null,We(!1)}function Po(e){const t=document.getElementById("driver-form-title"),n=document.getElementById("driver-form-description"),a=document.getElementById("driver-id"),r=document.getElementById("driver-nama"),o=document.getElementById("driver-lokasi");C.editItem=e,a&&(a.value=e.id),r&&(r.value=e.nama),o&&(o.value=e.lokasi),t&&(t.textContent="Edit Data Driver"),n&&(n.textContent="Isi form di bawah untuk memperbarui data driver"),We(!1)}async function Do(e){const t=await S(`/drivers/${e}`);Po(t),D("driver-form-modal")}function Oo(e){const t=document.getElementById("driver-delete-copy");C.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus driver <strong>${p(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`),D("driver-delete-modal")}function jo(){const e=document.getElementById("drivers-add-btn"),t=document.getElementById("drivers-export-btn"),n=document.getElementById("drivers-search-input"),a=document.getElementById("driver-form"),r=document.getElementById("drivers-table-body"),o=document.getElementById("driver-delete-confirm-btn"),s=document.getElementById("drivers-prev-page-btn"),i=document.getElementById("drivers-next-page-btn");if(!(!e||!a||!r))return e.addEventListener("click",()=>{yn(),D("driver-form-modal")}),t?.addEventListener("click",()=>{Pt("/export/drivers/csv","drivers.csv").catch(()=>{v("Gagal mengunduh file")})}),n?.addEventListener("input",Re(async m=>{C.search=m.target.value.trim(),C.page=1;try{await ce()}catch{v("Gagal memuat data")}})),a.addEventListener("submit",async m=>{m.preventDefault();const d={nama:document.getElementById("driver-nama")?.value.trim()||"",lokasi:document.getElementById("driver-lokasi")?.value.trim()||""};We(!0);try{C.editItem?(await S(`/drivers/${C.editItem.id}`,{method:"PUT",body:d}),P("Data driver berhasil diperbarui")):(await S("/drivers",{method:"POST",body:d}),P("Driver berhasil ditambahkan")),V("driver-form-modal"),yn(),await ce()}catch(l){v(l.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{We(!1)}}),r.addEventListener("click",async m=>{const d=m.target.closest("[data-driver-edit]"),l=m.target.closest("[data-driver-delete]");try{if(d){await Do(d.dataset.driverEdit);return}l&&Oo({id:l.dataset.driverDelete,nama:l.dataset.driverName})}catch{v("Gagal memuat data")}}),o?.addEventListener("click",async()=>{if(C.deleteItem)try{await S(`/drivers/${C.deleteItem.id}`,{method:"DELETE"}),P("Driver berhasil dihapus"),V("driver-delete-modal"),(C.page-1)*fe>=C.totalCount-1&&C.page>1&&(C.page-=1),C.deleteItem=null,await ce()}catch{v("Gagal menghapus data")}}),s?.addEventListener("click",async()=>{if(!(C.page<=1)){C.page-=1;try{await ce()}catch{v("Gagal memuat data")}}}),i?.addEventListener("click",async()=>{const m=Math.max(1,Math.ceil(C.totalCount/fe));if(!(C.page>=m)){C.page+=1;try{await ce()}catch{v("Gagal memuat data")}}}),ce().catch(()=>{v("Gagal memuat data")})}const E={data:[],loading:!0,totalCount:0,page:1,search:"",filterJenis:"",editItem:null,deleteItem:null,isSubmitting:!1},be=10;function No(){return`
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
    `}function Ke(e){const t=document.getElementById("mobil-submit-btn");E.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":E.editItem?"Perbarui":"Simpan")}function Fo(e){return e==="Hiace"?"mobil-jenis-badge mobil-jenis-badge-hiace":"mobil-jenis-badge mobil-jenis-badge-reborn"}function Vo(){const e=document.getElementById("mobil-table-body");e&&(e.innerHTML=`
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
    `)}function vn(){const e=document.getElementById("mobil-table-body");if(e){if(E.loading){Vo();return}if(E.data.length===0){Go();return}e.innerHTML=E.data.map((t,n)=>`
        <tr class="mobil-row" data-testid="mobil-row-${t.id}">
            <td class="mobil-index-cell">${(E.page-1)*be+n+1}</td>
            <td>
                <div class="mobil-code-cell">
                    <span class="mobil-code-avatar" aria-hidden="true">
                        ${No()}
                    </span>
                    <span class="mobil-code-text">${p(t.kode_mobil)}</span>
                </div>
            </td>
            <td>
                <span class="${Fo(t.jenis_mobil)}">
                    <span class="mobil-jenis-icon" aria-hidden="true">${Ho()}</span>
                    <span>${p(t.jenis_mobil)}</span>
                </span>
            </td>
            <td>
                <div class="mobil-action-row">
                    <button
                        class="mobil-icon-button"
                        type="button"
                        data-mobil-edit="${t.id}"
                        data-testid="edit-mobil-${t.id}"
                        aria-label="Edit mobil ${p(t.kode_mobil)}"
                    >
                        ${Uo()}
                    </button>
                    <button
                        class="mobil-icon-button mobil-icon-button-danger"
                        type="button"
                        data-mobil-delete="${t.id}"
                        data-mobil-name="${p(t.kode_mobil)}"
                        data-testid="delete-mobil-${t.id}"
                        aria-label="Hapus mobil ${p(t.kode_mobil)}"
                    >
                        ${qo()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function En(){const e=document.getElementById("mobil-pagination-shell"),t=document.getElementById("mobil-pagination-info"),n=document.getElementById("mobil-pagination-page"),a=document.getElementById("mobil-prev-page-btn"),r=document.getElementById("mobil-next-page-btn"),o=Math.max(1,Math.ceil(E.totalCount/be));e&&(e.hidden=o<=1),t&&(t.textContent=Me(E.page,be,E.totalCount,E.data.length)),n&&(n.textContent=`${E.page} / ${o}`),a&&(a.disabled=E.page===1),r&&(r.disabled=E.page>=o)}async function re(){E.loading=!0,vn(),En();try{const[e,t]=await Promise.all([S(`/mobil?page=${E.page}&limit=${be}${E.search?`&search=${encodeURIComponent(E.search)}`:""}${E.filterJenis?`&jenis=${encodeURIComponent(E.filterJenis)}`:""}`),S(`/mobil/count${E.search||E.filterJenis?"?":""}${[E.search?`search=${encodeURIComponent(E.search)}`:"",E.filterJenis?`jenis=${encodeURIComponent(E.filterJenis)}`:""].filter(Boolean).join("&")}`)]);E.data=Array.isArray(e)?e:[],E.totalCount=Number(t.count||0)}finally{E.loading=!1,vn(),En()}}function wn(){const e=document.getElementById("mobil-form"),t=document.getElementById("mobil-form-title"),n=document.getElementById("mobil-form-description"),a=document.getElementById("mobil-id"),r=document.getElementById("mobil-kode"),o=document.getElementById("mobil-jenis");e?.reset(),a&&(a.value=""),r&&(r.value=""),o&&(o.value="Hiace"),t&&(t.textContent="Tambah Mobil Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan data mobil"),E.editItem=null,Ke(!1)}function Jo(e){const t=document.getElementById("mobil-form-title"),n=document.getElementById("mobil-form-description"),a=document.getElementById("mobil-id"),r=document.getElementById("mobil-kode"),o=document.getElementById("mobil-jenis");E.editItem=e,a&&(a.value=e.id),r&&(r.value=e.kode_mobil),o&&(o.value=e.jenis_mobil),t&&(t.textContent="Edit Data Mobil"),n&&(n.textContent="Isi form di bawah untuk memperbarui data mobil"),Ke(!1)}async function Wo(e){const t=await S(`/mobil/${e}`);Jo(t),D("mobil-form-modal")}function Ko(e){const t=document.getElementById("mobil-delete-copy");E.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus mobil <strong>${p(e.kode_mobil)}</strong>? Tindakan ini tidak dapat dibatalkan.`),D("mobil-delete-modal")}function zo(){const e=document.getElementById("mobil-add-btn"),t=document.getElementById("mobil-export-btn"),n=document.getElementById("mobil-search-input"),a=document.getElementById("mobil-filter-jenis"),r=document.getElementById("mobil-form"),o=document.getElementById("mobil-table-body"),s=document.getElementById("mobil-delete-confirm-btn"),i=document.getElementById("mobil-prev-page-btn"),m=document.getElementById("mobil-next-page-btn"),d=document.getElementById("mobil-kode");if(!(!e||!r||!o))return e.addEventListener("click",()=>{wn(),D("mobil-form-modal")}),t?.addEventListener("click",()=>{Pt("/export/mobil/csv","mobil.csv").catch(()=>{v("Gagal mengunduh file")})}),n?.addEventListener("input",Re(async l=>{E.search=l.target.value.trim(),E.page=1;try{await re()}catch{v("Gagal memuat data")}})),a?.addEventListener("change",async l=>{E.filterJenis=l.target.value,E.page=1;try{await re()}catch{v("Gagal memuat data")}}),d?.addEventListener("input",l=>{l.target.value=l.target.value.toUpperCase()}),r.addEventListener("submit",async l=>{l.preventDefault();const c={kode_mobil:document.getElementById("mobil-kode")?.value.trim().toUpperCase()||"",jenis_mobil:document.getElementById("mobil-jenis")?.value||"Hiace"};Ke(!0);try{E.editItem?(await S(`/mobil/${E.editItem.id}`,{method:"PUT",body:c}),P("Data mobil berhasil diperbarui")):(await S("/mobil",{method:"POST",body:c}),P("Mobil berhasil ditambahkan")),V("mobil-form-modal"),wn(),await re()}catch(f){v(f.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{Ke(!1)}}),o.addEventListener("click",async l=>{const c=l.target.closest("[data-mobil-edit]"),f=l.target.closest("[data-mobil-delete]");try{if(c){await Wo(c.dataset.mobilEdit);return}f&&Ko({id:f.dataset.mobilDelete,kode_mobil:f.dataset.mobilName})}catch{v("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(E.deleteItem)try{await S(`/mobil/${E.deleteItem.id}`,{method:"DELETE"}),P("Mobil berhasil dihapus"),V("mobil-delete-modal"),(E.page-1)*be>=E.totalCount-1&&E.page>1&&(E.page-=1),E.deleteItem=null,await re()}catch{v("Gagal menghapus data")}}),i?.addEventListener("click",async()=>{if(!(E.page<=1)){E.page-=1;try{await re()}catch{v("Gagal memuat data")}}}),m?.addEventListener("click",async()=>{const l=Math.max(1,Math.ceil(E.totalCount/be));if(!(E.page>=l)){E.page+=1;try{await re()}catch{v("Gagal memuat data")}}}),re().catch(()=>{v("Gagal memuat data")})}const w={data:[],drivers:[],mobilList:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1},Se=10,Bn={"05:00":"Subuh (05.00 WIB)","08:00":"Pagi (08.00 WIB)","10:00":"Pagi (10.00 WIB)","14:00":"Siang (14.00 WIB)","16:00":"Sore (16.00 WIB)","19:00":"Malam (19.00 WIB)"},lt="08:00",Xo=["Reguler","Dropping","Rental"],Ut="Reguler";function Zo(){return`
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
    `}function qt(e){return e==="Lunas"?"Lunas":"Belum Lunas"}function In(e){const t=qt(e);return`<span class="keberangkatan-payment-badge ${t==="Lunas"?"is-paid":"is-unpaid"}">${p(t)}</span>`}function Sn(e){return Bn[e]||Bn[lt]}function ze(e){return Xo.includes(e)?e:Ut}function Yo(){const e=Number(document.getElementById("keberangkatan-tarif-penumpang")?.value||0),t=Number(document.getElementById("keberangkatan-uang-paket")?.value||0),n=Number(document.getElementById("keberangkatan-jumlah-snack")?.value||0),a=Number(document.getElementById("keberangkatan-pengembalian-snack")?.value||0),r=Number(document.getElementById("keberangkatan-jumlah-air-mineral")?.value||0),o=e,s=o+t,i=s*.15,m=s*.85;return{jumlah_uang_penumpang:o,uang_paket:t,total:s,uang_pc:i,uang_bersih:m,jumlah_snack:n,pengembalian_snack:a,jumlah_air_mineral:r}}function Ht(){const e=Yo();Object.entries(e).forEach(([t,n])=>{const a=document.querySelector(`[data-calc="${t}"]`);if(a){if(t==="jumlah_snack"){a.textContent=`${L(n)} item`;return}if(t==="pengembalian_snack"){a.textContent=`${L(n)} item`;return}if(t==="jumlah_air_mineral"){a.textContent=`${L(n)} botol`;return}a.textContent=M(n)}})}function Xe(e,t,n,a,r=""){const o=document.getElementById(e);if(!o)return;const s=e==="keberangkatan-kode-mobil"?"Pilih mobil":"Pilih driver";o.innerHTML=`
        <option value="">${s}</option>
        ${t.map(i=>`
            <option value="${i[n]}" ${String(i[n])===String(r)?"selected":""}>
                ${p(a(i))}
            </option>
        `).join("")}
    `}function Ze(e){const t=document.getElementById("keberangkatan-submit-btn");w.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":w.editItem?"Perbarui":"Simpan")}function es(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");e&&(e.innerHTML=`
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
        `))}function $n(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");if(e){if(w.loading){es();return}if(w.data.length===0){ts();return}e.innerHTML=w.data.map(n=>`
        <tr class="keberangkatan-row" data-testid="keberangkatan-row-${n.id}">
            <td class="keberangkatan-hari-cell">${p(n.hari)}</td>
            <td>${p(n.tanggal)}</td>
            <td>${p(n.jam_keberangkatan_label||Sn(n.jam_keberangkatan))}</td>
            <td>${p(ze(n.tipe_layanan))}</td>
            <td>
                <span class="keberangkatan-kode-badge">${p(n.kode_mobil)}</span>
            </td>
            <td>${p(n.driver_nama)}</td>
            <td class="text-right">${L(n.jumlah_penumpang)}</td>
            <td class="text-right keberangkatan-money-cell">${M(n.jumlah_uang_penumpang)}</td>
            <td class="text-right">${L(n.jumlah_paket)}</td>
            <td class="text-right keberangkatan-money-cell">${M(n.uang_paket)}</td>
            <td class="text-right"><span class="keberangkatan-stock-badge">${L(n.jumlah_snack)}</span></td>
            <td class="text-right"><span class="keberangkatan-stock-badge keberangkatan-stock-badge-blue">${L(n.pengembalian_snack)}</span></td>
            <td class="text-right"><span class="keberangkatan-stock-badge keberangkatan-stock-badge-blue">${L(n.jumlah_air_mineral)}</span></td>
            <td class="text-right keberangkatan-money-cell keberangkatan-money-cell-amber">${M(n.uang_pc)}</td>
            <td class="text-right keberangkatan-money-cell keberangkatan-money-cell-emerald">${M(n.uang_bersih)}</td>
            <td class="text-center">${In(n.status_pembayaran)}</td>
            <td class="text-center">
                <span class="keberangkatan-trip-badge">#${L(n.trip_ke)}</span>
            </td>
            <td>
                <div class="keberangkatan-action-row">
                    <button
                        class="keberangkatan-icon-button"
                        type="button"
                        data-keberangkatan-edit="${n.id}"
                        data-testid="edit-keberangkatan-${n.id}"
                        aria-label="Edit data keberangkatan ${p(n.kode_mobil)}"
                    >
                        ${Zo()}
                    </button>
                    <button
                        class="keberangkatan-icon-button keberangkatan-icon-button-danger"
                        type="button"
                        data-keberangkatan-delete="${n.id}"
                        data-testid="delete-keberangkatan-${n.id}"
                        aria-label="Hapus data keberangkatan ${p(n.kode_mobil)}"
                    >
                        ${Qo()}
                    </button>
                </div>
            </td>
        </tr>
    `).join(""),t&&(t.hidden=!1,t.innerHTML=w.data.map(n=>`
            <article class="keberangkatan-mobile-card" data-testid="keberangkatan-card-${n.id}">
                <div class="keberangkatan-mobile-card-head">
                    <div>
                        <p class="keberangkatan-mobile-day">${p(n.hari)}</p>
                        <h3 class="keberangkatan-mobile-date">${p(n.tanggal)}</h3>
                        <p>${p(n.jam_keberangkatan_label||Sn(n.jam_keberangkatan))}</p>
                    </div>
                    <div class="keberangkatan-mobile-head-side">
                        <span class="keberangkatan-kode-badge">${p(n.kode_mobil)}</span>
                        <span class="keberangkatan-trip-badge">#${L(n.trip_ke)}</span>
                    </div>
                </div>

                <div class="keberangkatan-mobile-driver">
                    <span>Driver</span>
                    <strong>${p(n.driver_nama)}</strong>
                </div>

                <div class="keberangkatan-mobile-grid">
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-status">
                        <span>Validasi</span>
                        ${In(n.status_pembayaran)}
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Layanan</span>
                        <strong>${p(ze(n.tipe_layanan))}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Penumpang</span>
                        <strong>${L(n.jumlah_penumpang)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Paket</span>
                        <strong>${L(n.jumlah_paket)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Snack</span>
                        <strong>${L(n.jumlah_snack)} item</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Pengembalian Snack</span>
                        <strong>${L(n.pengembalian_snack)} item</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Air Mineral</span>
                        <strong>${L(n.jumlah_air_mineral)} botol</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-full">
                        <span>Jumlah Tarif</span>
                        <strong>${M(n.jumlah_uang_penumpang)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-full">
                        <span>Uang Paket</span>
                        <strong>${M(n.uang_paket)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-accent">
                        <span>Uang PC (15%)</span>
                        <strong>${M(n.uang_pc)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-emerald">
                        <span>Uang Bersih</span>
                        <strong>${M(n.uang_bersih)}</strong>
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
        `).join(""))}}function Cn(){const e=document.getElementById("keberangkatan-pagination-shell"),t=document.getElementById("keberangkatan-pagination-info"),n=document.getElementById("keberangkatan-pagination-page"),a=document.getElementById("keberangkatan-prev-page-btn"),r=document.getElementById("keberangkatan-next-page-btn"),o=Math.max(1,Math.ceil(w.totalCount/Se));e&&(e.hidden=o<=1),t&&(t.textContent=Me(w.page,Se,w.totalCount,w.data.length)),n&&(n.textContent=`${w.page} / ${o}`),a&&(a.disabled=w.page===1),r&&(r.disabled=w.page>=o)}async function ue(){w.loading=!0,$n(),Cn();try{const[e,t,n,a]=await Promise.all([S(`/keberangkatan?page=${w.page}&limit=${Se}${w.search?`&search=${encodeURIComponent(w.search)}`:""}`),S(`/keberangkatan/count${w.search?`?search=${encodeURIComponent(w.search)}`:""}`),S("/drivers/all"),S("/mobil/all")]);w.data=Array.isArray(e)?e:[],w.totalCount=Number(t.count||0),w.drivers=Array.isArray(n)?n:[],w.mobilList=Array.isArray(a)?a:[]}finally{w.loading=!1,$n(),Cn()}}function ba(){document.getElementById("keberangkatan-form")?.scrollTo({top:0,behavior:"auto"})}function bt(){const e=document.getElementById("keberangkatan-form"),t=document.getElementById("keberangkatan-form-title"),n=document.getElementById("keberangkatan-form-description"),a=document.getElementById("keberangkatan-tanggal"),r=document.getElementById("keberangkatan-jam-keberangkatan"),o=document.getElementById("keberangkatan-trip-ke"),s=document.getElementById("keberangkatan-tipe-layanan"),i=document.getElementById("keberangkatan-jumlah-penumpang"),m=document.getElementById("keberangkatan-tarif-penumpang"),d=document.getElementById("keberangkatan-jumlah-paket"),l=document.getElementById("keberangkatan-uang-paket"),c=document.getElementById("keberangkatan-jumlah-snack"),f=document.getElementById("keberangkatan-pengembalian-snack"),y=document.getElementById("keberangkatan-jumlah-air-mineral"),g=document.getElementById("keberangkatan-status-pembayaran");e?.reset(),w.editItem=null,document.getElementById("keberangkatan-id").value="",t&&(t.textContent="Tambah Data Keberangkatan"),n&&(n.textContent="Isi form di bawah untuk menambahkan data keberangkatan"),a&&(a.value=Pe()),r&&(r.value=lt),Xe("keberangkatan-kode-mobil",w.mobilList,"kode_mobil",h=>`${h.kode_mobil} - ${h.jenis_mobil}`,w.mobilList[0]?.kode_mobil||""),Xe("keberangkatan-driver-id",w.drivers,"id",h=>`${h.nama} - ${h.lokasi}`,w.drivers[0]?.id||""),o&&(o.value="1"),s&&(s.value=Ut),i&&(i.value="0"),m&&(m.value="0"),d&&(d.value="0"),l&&(l.value="0"),c&&(c.value="0"),f&&(f.value="0"),y&&(y.value="0"),g&&(g.value="Belum Lunas"),Ze(!1),Ht(),ba()}async function xn(e){const t=await S(`/keberangkatan/${e}`),n=document.getElementById("keberangkatan-form-title"),a=document.getElementById("keberangkatan-form-description");w.editItem=t,document.getElementById("keberangkatan-id").value=t.id,document.getElementById("keberangkatan-tanggal").value=t.tanggal,document.getElementById("keberangkatan-jam-keberangkatan").value=t.jam_keberangkatan||lt,document.getElementById("keberangkatan-trip-ke").value=t.trip_ke,document.getElementById("keberangkatan-tipe-layanan").value=ze(t.tipe_layanan),document.getElementById("keberangkatan-jumlah-penumpang").value=t.jumlah_penumpang,document.getElementById("keberangkatan-tarif-penumpang").value=t.tarif_penumpang,document.getElementById("keberangkatan-jumlah-paket").value=t.jumlah_paket,document.getElementById("keberangkatan-uang-paket").value=t.uang_paket,document.getElementById("keberangkatan-jumlah-snack").value=t.jumlah_snack,document.getElementById("keberangkatan-pengembalian-snack").value=t.pengembalian_snack,document.getElementById("keberangkatan-jumlah-air-mineral").value=t.jumlah_air_mineral,document.getElementById("keberangkatan-status-pembayaran").value=qt(t.status_pembayaran),Xe("keberangkatan-kode-mobil",w.mobilList,"kode_mobil",r=>`${r.kode_mobil} - ${r.jenis_mobil}`,t.kode_mobil),Xe("keberangkatan-driver-id",w.drivers,"id",r=>`${r.nama} - ${r.lokasi}`,t.driver_id),n&&(n.textContent="Edit Data Keberangkatan"),a&&(a.textContent="Isi form di bawah untuk memperbarui data keberangkatan"),Ze(!1),Ht(),ba(),D("keberangkatan-form-modal")}function _n(e){w.deleteItem=e,D("keberangkatan-delete-modal")}function ns(){const e=document.getElementById("keberangkatan-add-btn"),t=document.getElementById("keberangkatan-export-btn"),n=document.getElementById("keberangkatan-search-input"),a=document.getElementById("keberangkatan-form"),r=document.getElementById("keberangkatan-table-body"),o=document.getElementById("keberangkatan-mobile-list"),s=document.getElementById("keberangkatan-delete-confirm-btn"),i=document.getElementById("keberangkatan-prev-page-btn"),m=document.getElementById("keberangkatan-next-page-btn");if(!(!e||!a||!r))return e.addEventListener("click",()=>{bt(),D("keberangkatan-form-modal")}),t?.addEventListener("click",()=>{Pt("/export/keberangkatan/csv","keberangkatan.csv").catch(()=>{v("Gagal mengunduh file")})}),n?.addEventListener("input",Re(async d=>{w.search=d.target.value.trim(),w.page=1;try{await ue()}catch{v("Gagal memuat data")}})),a.addEventListener("input",d=>{["keberangkatan-jumlah-penumpang","keberangkatan-tarif-penumpang","keberangkatan-uang-paket","keberangkatan-jumlah-snack","keberangkatan-pengembalian-snack","keberangkatan-jumlah-air-mineral"].includes(d.target.id)&&Ht()}),a.addEventListener("submit",async d=>{d.preventDefault();const l={tanggal:document.getElementById("keberangkatan-tanggal")?.value||"",jam_keberangkatan:document.getElementById("keberangkatan-jam-keberangkatan")?.value||lt,tipe_layanan:ze(document.getElementById("keberangkatan-tipe-layanan")?.value||Ut),kode_mobil:document.getElementById("keberangkatan-kode-mobil")?.value||"",driver_id:document.getElementById("keberangkatan-driver-id")?.value||"",jumlah_penumpang:Number(document.getElementById("keberangkatan-jumlah-penumpang")?.value||0),tarif_penumpang:Number(document.getElementById("keberangkatan-tarif-penumpang")?.value||0),jumlah_paket:Number(document.getElementById("keberangkatan-jumlah-paket")?.value||0),uang_paket:Number(document.getElementById("keberangkatan-uang-paket")?.value||0),jumlah_snack:Number(document.getElementById("keberangkatan-jumlah-snack")?.value||0),pengembalian_snack:Number(document.getElementById("keberangkatan-pengembalian-snack")?.value||0),jumlah_air_mineral:Number(document.getElementById("keberangkatan-jumlah-air-mineral")?.value||0),trip_ke:Number(document.getElementById("keberangkatan-trip-ke")?.value||1),status_pembayaran:qt(document.getElementById("keberangkatan-status-pembayaran")?.value||"")};Ze(!0);try{w.editItem?(await S(`/keberangkatan/${w.editItem.id}`,{method:"PUT",body:l}),P("Data berhasil diperbarui")):(await S("/keberangkatan",{method:"POST",body:l}),P("Data berhasil ditambahkan")),V("keberangkatan-form-modal"),bt(),await ue()}catch(c){v(c.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{Ze(!1)}}),r.addEventListener("click",async d=>{const l=d.target.closest("[data-keberangkatan-edit]"),c=d.target.closest("[data-keberangkatan-delete]");try{if(l){await xn(l.dataset.keberangkatanEdit);return}c&&_n({id:c.dataset.keberangkatanDelete})}catch{v("Gagal memuat data")}}),o?.addEventListener("click",async d=>{const l=d.target.closest("[data-keberangkatan-edit]"),c=d.target.closest("[data-keberangkatan-delete]");try{if(l){await xn(l.dataset.keberangkatanEdit);return}c&&_n({id:c.dataset.keberangkatanDelete})}catch{v("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(w.deleteItem)try{await S(`/keberangkatan/${w.deleteItem.id}`,{method:"DELETE"}),P("Data berhasil dihapus"),V("keberangkatan-delete-modal"),(w.page-1)*Se>=w.totalCount-1&&w.page>1&&(w.page-=1),w.deleteItem=null,await ue()}catch{v("Gagal menghapus data")}}),i?.addEventListener("click",async()=>{if(!(w.page<=1)){w.page-=1;try{await ue()}catch{v("Gagal memuat data")}}}),m?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil(w.totalCount/Se));if(!(w.page>=d)){w.page+=1;try{await ue()}catch{v("Gagal memuat data")}}}),ue().then(()=>{bt()}).catch(()=>{v("Gagal memuat data")})}const I={data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1,prices:{snack:0,air:0}},$e=10;function as(){return`
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
    `}function Qe(e){return Number(document.getElementById(e)?.value||0)}function Ye(){const e=Qe("stock-total-snack"),t=Qe("stock-total-air"),n=e*I.prices.snack+t*I.prices.air,a=document.querySelector('[data-stock-calc="nilai_total"]'),r=document.getElementById("stock-snack-price-label"),o=document.getElementById("stock-air-price-label");r&&(r.textContent=M(I.prices.snack)),o&&(o.textContent=M(I.prices.air)),a&&(a.textContent=M(n))}function et(e){const t=document.getElementById("stock-submit-btn");I.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":I.editItem?"Perbarui":"Simpan")}function os(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");e&&(e.innerHTML=`
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
        `))}function Tn(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");if(e){if(I.loading){os();return}if(I.data.length===0){ss();return}e.innerHTML=I.data.map(n=>`
        <tr class="stock-row" data-testid="stock-row-${n.id}">
            <td class="stock-day-cell">${p(n.hari)}</td>
            <td>${p(n.tanggal)}</td>
            <td>${p(n.bulan)}</td>
            <td class="text-right">${L(n.total_stock_snack_display??n.total_stock_snack)}</td>
            <td class="text-right">${L(n.total_stock_air_mineral)}</td>
            <td class="text-right">${L(n.pengembalian_snack)}</td>
            <td class="text-right">${L(n.terpakai_snack)}</td>
            <td class="text-right">${L(n.terpakai_air_mineral)}</td>
            <td class="text-right"><span class="stock-value-badge stock-value-badge-emerald">${L(n.sisa_stock_snack)}</span></td>
            <td class="text-right"><span class="stock-value-badge stock-value-badge-blue">${L(n.sisa_stock_air_mineral)}</span></td>
            <td class="text-right stock-money-cell">${M(n.nilai_total)}</td>
            <td class="text-right stock-money-cell stock-money-cell-emerald">${M(n.sisa_nilai_total)}</td>
            <td>${p(n.keterangan||"-")}</td>
            <td>
                <div class="stock-action-row">
                    <button
                        class="stock-icon-button"
                        type="button"
                        data-stock-edit="${n.id}"
                        data-testid="edit-stock-${n.id}"
                        aria-label="Edit data stok ${p(n.tanggal)}"
                    >
                        ${as()}
                    </button>
                    <button
                        class="stock-icon-button stock-icon-button-danger"
                        type="button"
                        data-stock-delete="${n.id}"
                        data-stock-date="${p(n.tanggal)}"
                        data-testid="delete-stock-${n.id}"
                        aria-label="Hapus data stok ${p(n.tanggal)}"
                    >
                        ${rs()}
                    </button>
                </div>
            </td>
        </tr>
    `).join(""),t&&(t.hidden=!1,t.innerHTML=I.data.map(n=>`
            <article class="stock-mobile-card" data-testid="stock-card-${n.id}">
                <div class="stock-mobile-card-head">
                    <div>
                        <p class="stock-mobile-day">${p(n.hari)}</p>
                        <h3 class="stock-mobile-date">${p(n.tanggal)}</h3>
                    </div>
                    <span class="stock-mobile-month">${p(n.bulan)}</span>
                </div>

                <div class="stock-mobile-grid">
                    <div class="stock-mobile-item">
                        <span>Total Snack</span>
                        <strong>${L(n.total_stock_snack_display??n.total_stock_snack)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Total Air Mineral</span>
                        <strong>${L(n.total_stock_air_mineral)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Pengembalian Snack</span>
                        <strong>${L(n.pengembalian_snack)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Terpakai Snack</span>
                        <strong>${L(n.terpakai_snack)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Terpakai Air Mineral</span>
                        <strong>${L(n.terpakai_air_mineral)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Sisa Snack</span>
                        <strong>${L(n.sisa_stock_snack)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Sisa Air Mineral</span>
                        <strong>${L(n.sisa_stock_air_mineral)}</strong>
                    </div>
                    <div class="stock-mobile-item stock-mobile-item-full">
                        <span>Nilai Total</span>
                        <strong>${M(n.nilai_total)}</strong>
                    </div>
                    <div class="stock-mobile-item stock-mobile-item-full stock-mobile-item-emerald">
                        <span>Sisa Nilai Total</span>
                        <strong>${M(n.sisa_nilai_total)}</strong>
                    </div>
                    <div class="stock-mobile-item stock-mobile-item-full">
                        <span>Keterangan</span>
                        <strong>${p(n.keterangan||"-")}</strong>
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
                        data-stock-date="${p(n.tanggal)}"
                        data-testid="delete-stock-mobile-${n.id}"
                    >
                        Hapus
                    </button>
                </div>
            </article>
        `).join(""))}}function Ln(){const e=document.getElementById("stock-pagination-shell"),t=document.getElementById("stock-pagination-info"),n=document.getElementById("stock-pagination-page"),a=document.getElementById("stock-prev-page-btn"),r=document.getElementById("stock-next-page-btn"),o=Math.max(1,Math.ceil(I.totalCount/$e));e&&(e.hidden=o<=1),t&&(t.textContent=Me(I.page,$e,I.totalCount,I.data.length)),n&&(n.textContent=`${I.page} / ${o}`),a&&(a.disabled=I.page===1),r&&(r.disabled=I.page>=o)}async function me(){I.loading=!0,Tn(),Ln();try{const[e,t]=await Promise.all([S(`/stock?page=${I.page}&limit=${$e}${I.search?`&search=${encodeURIComponent(I.search)}`:""}`),S(`/stock/count${I.search?`?search=${encodeURIComponent(I.search)}`:""}`)]);I.data=Array.isArray(e)?e:[],I.totalCount=Number(t.count||0)}finally{I.loading=!1,Tn(),Ln()}}function An(){const e=document.getElementById("stock-form"),t=document.getElementById("stock-form-title"),n=document.getElementById("stock-form-description");e?.reset(),I.editItem=null,document.getElementById("stock-id").value="",document.getElementById("stock-tanggal").value=Pe(),document.getElementById("stock-total-snack").value="0",document.getElementById("stock-total-air").value="0",document.getElementById("stock-keterangan").value="",t&&(t.textContent="Tambah Stok Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan stok snack dan air mineral"),et(!1),Ye()}function is(e){const t=document.getElementById("stock-form-title"),n=document.getElementById("stock-form-description");I.editItem=e,document.getElementById("stock-id").value=e.id,document.getElementById("stock-tanggal").value=e.tanggal,document.getElementById("stock-total-snack").value=e.total_stock_snack,document.getElementById("stock-total-air").value=e.total_stock_air_mineral,document.getElementById("stock-keterangan").value=e.keterangan||"",t&&(t.textContent="Edit Data Stok"),n&&(n.textContent="Isi form di bawah untuk memperbarui stok snack dan air mineral"),et(!1),Ye()}async function Rn(e){const t=await S(`/stock/${e}`);is(t),D("stock-form-modal")}function Mn(e){const t=document.getElementById("stock-delete-copy");I.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus data stok tanggal <strong>${p(e.tanggal)}</strong>? Tindakan ini tidak dapat dibatalkan.`),D("stock-delete-modal")}function ds(){const e=document.querySelector("[data-stock-page]"),t=document.getElementById("stock-add-btn"),n=document.getElementById("stock-search-input"),a=document.getElementById("stock-form"),r=document.getElementById("stock-table-body"),o=document.getElementById("stock-mobile-list"),s=document.getElementById("stock-delete-confirm-btn"),i=document.getElementById("stock-prev-page-btn"),m=document.getElementById("stock-next-page-btn");if(!(!e||!t||!a||!r))return I.prices.snack=Number(e.dataset.stockSnackPrice||0),I.prices.air=Number(e.dataset.stockAirPrice||0),Ye(),t.addEventListener("click",()=>{An(),D("stock-form-modal")}),n?.addEventListener("input",Re(async d=>{I.search=d.target.value.trim(),I.page=1;try{await me()}catch{v("Gagal memuat data")}})),a.addEventListener("input",d=>{["stock-total-snack","stock-total-air"].includes(d.target.id)&&Ye()}),a.addEventListener("submit",async d=>{d.preventDefault();const l={tanggal:document.getElementById("stock-tanggal")?.value||"",total_stock_snack:Qe("stock-total-snack"),total_stock_air_mineral:Qe("stock-total-air"),keterangan:document.getElementById("stock-keterangan")?.value.trim()||""};et(!0);try{I.editItem?(await S(`/stock/${I.editItem.id}`,{method:"PUT",body:l}),P("Data stok berhasil diperbarui")):(await S("/stock",{method:"POST",body:l}),P("Data stok berhasil ditambahkan")),V("stock-form-modal"),An(),await me()}catch(c){v(c.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{et(!1)}}),r.addEventListener("click",async d=>{const l=d.target.closest("[data-stock-edit]"),c=d.target.closest("[data-stock-delete]");try{if(l){await Rn(l.dataset.stockEdit);return}c&&Mn({id:c.dataset.stockDelete,tanggal:c.dataset.stockDate})}catch{v("Gagal memuat data")}}),o?.addEventListener("click",async d=>{const l=d.target.closest("[data-stock-edit]"),c=d.target.closest("[data-stock-delete]");try{if(l){await Rn(l.dataset.stockEdit);return}c&&Mn({id:c.dataset.stockDelete,tanggal:c.dataset.stockDate})}catch{v("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(I.deleteItem)try{await S(`/stock/${I.deleteItem.id}`,{method:"DELETE"}),P("Data stok berhasil dihapus"),V("stock-delete-modal"),(I.page-1)*$e>=I.totalCount-1&&I.page>1&&(I.page-=1),I.deleteItem=null,await me()}catch{v("Gagal menghapus data")}}),i?.addEventListener("click",async()=>{if(!(I.page<=1)){I.page-=1;try{await me()}catch{v("Gagal memuat data")}}}),m?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil(I.totalCount/$e));if(!(I.page>=d)){I.page+=1;try{await me()}catch{v("Gagal memuat data")}}}),me().catch(()=>{v("Gagal memuat data")})}const Ce=10,$={currentUser:null,data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,defaultRole:"User"};function ls(e){return["Super Admin","Admin"].includes(e)}function cs(e){return e==="Super Admin"}function us(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function ms(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M2.5 12C4.4 8.2 8 6 12 6C16 6 19.6 8.2 21.5 12C19.6 15.8 16 18 12 18C8 18 4.4 15.8 2.5 12Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function ps(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function gs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function fs(){return cs($.currentUser?.role)?["Super Admin","Admin","User"]:["Admin","User"]}function tt(e){se(document.getElementById("admin-user-submit-btn"),e,"Menyimpan...")}function bs(e){return e==="Super Admin"?"admin-users-role-badge admin-users-role-badge-super":e==="Admin"?"admin-users-role-badge admin-users-role-badge-admin":"admin-users-role-badge admin-users-role-badge-user"}function hs(){const e=document.getElementById("admin-users-table-body");e&&(e.innerHTML=`
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
            <td colspan="6" class="admin-users-table-state admin-users-empty-copy">${p(e)}</td>
        </tr>
    `)}function Pn(){const e=document.getElementById("admin-users-table-body");if(e){if($.loading){hs();return}if($.data.length===0){ha();return}e.innerHTML=$.data.map(t=>`
        <tr class="admin-users-row" data-testid="admin-user-row-${t.id}">
            <td>
                <div class="admin-users-name-cell">
                    <span class="admin-users-avatar" aria-hidden="true">${us()}</span>
                    <div>
                        <span class="admin-users-name">${p(t.nama)}</span>
                        <span class="admin-users-name-meta">${t.is_current_user?"Akun yang sedang login":"Akun dashboard aktif"}</span>
                    </div>
                </div>
            </td>
            <td><span class="admin-users-username">@${p(t.username)}</span></td>
            <td><span class="admin-users-email">${p(t.email)}</span></td>
            <td>
                <div class="admin-users-password-cell">
                    <span class="admin-users-password-mask">${p(t.password_mask)}</span>
                    <span class="admin-users-password-copy">Terenkripsi</span>
                </div>
            </td>
            <td><span class="${bs(t.role)}">${p(t.role)}</span></td>
            <td>
                <div class="admin-users-action-row">
                    <button class="admin-users-icon-button" type="button" data-admin-user-show="${t.id}" data-testid="show-admin-user-${t.id}" aria-label="Lihat detail akun ${p(t.nama)}">
                        ${ms()}
                    </button>
                    <button class="admin-users-icon-button" type="button" data-admin-user-edit="${t.id}" data-testid="edit-admin-user-${t.id}" aria-label="Edit akun ${p(t.nama)}" ${t.can_edit?"":"disabled"}>
                        ${ps()}
                    </button>
                    <button class="admin-users-icon-button admin-users-icon-button-danger" type="button" data-admin-user-delete="${t.id}" data-admin-user-name="${p(t.nama)}" data-testid="delete-admin-user-${t.id}" aria-label="Hapus akun ${p(t.nama)}" ${t.can_delete?"":"disabled"}>
                        ${gs()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function $t(){const e=document.getElementById("admin-users-pagination-shell"),t=document.getElementById("admin-users-pagination-info"),n=document.getElementById("admin-users-pagination-page"),a=document.getElementById("admin-users-prev-page-btn"),r=document.getElementById("admin-users-next-page-btn"),o=Math.max(1,Math.ceil($.totalCount/Ce));e&&(e.hidden=o<=1),t&&(t.textContent=Me($.page,Ce,$.totalCount,$.data.length)),n&&(n.textContent=`${$.page} / ${o}`),a&&(a.disabled=$.page===1),r&&(r.disabled=$.page>=o)}async function pe(){$.loading=!0,Pn(),$t();try{const e=$.search?`?search=${encodeURIComponent($.search)}`:"",t=`?page=${$.page}&limit=${Ce}${$.search?`&search=${encodeURIComponent($.search)}`:""}`,[n,a]=await Promise.all([S(`/admin-users${t}`),S(`/admin-users/count${e}`)]);$.data=Array.isArray(n)?n:[],$.totalCount=Number(a.count||0)}finally{$.loading=!1,Pn(),$t()}}function ka(e="User"){const t=document.getElementById("admin-user-role");if(!t)return;const n=fs(),a=n.includes(e)?e:n[0];t.innerHTML=n.map(r=>`
        <option value="${p(r)}" ${r===a?"selected":""}>${p(r)}</option>
    `).join("")}function ya(e){const t=document.getElementById("admin-user-password"),n=document.getElementById("admin-user-password-note");t&&(t.required=!e,t.placeholder=e?"Kosongkan jika tidak ingin mengubah password":"Masukkan password",t.value=""),n&&(n.textContent=e?"Kosongkan password jika tidak ingin mengubah password akun ini.":"Password minimal 6 karakter dan akan disimpan dalam bentuk terenkripsi.")}function ht(e="User"){const t=document.getElementById("admin-user-form"),n=document.getElementById("admin-user-form-title"),a=document.getElementById("admin-user-form-description"),r=document.getElementById("admin-user-id");t?.reset(),r&&(r.value=""),ka(e),ya(!1),n&&(n.textContent=e==="Admin"?"Tambah Admin Baru":"Tambah User Baru"),a&&(a.textContent=e==="Admin"?"Lengkapi data akun untuk menambahkan admin baru":"Lengkapi data akun untuk menambahkan user baru"),$.defaultRole=e,$.editItem=null,tt(!1)}function ks(e){$.editItem=e,document.getElementById("admin-user-id").value=e.id,document.getElementById("admin-user-nama").value=e.nama,document.getElementById("admin-user-username").value=e.username,document.getElementById("admin-user-email").value=e.email,ka(e.role),ya(!0),document.getElementById("admin-user-form-title").textContent="Edit Akun",document.getElementById("admin-user-form-description").textContent="Perbarui informasi akun admin atau user di bawah ini",tt(!1)}function ys(e){const t=document.getElementById("admin-user-detail-list");t&&(t.innerHTML=`
        <div class="admin-users-detail-item">
            <span>Nama</span>
            <strong>${p(e.nama)}</strong>
        </div>
        <div class="admin-users-detail-item">
            <span>Username</span>
            <strong>@${p(e.username)}</strong>
        </div>
        <div class="admin-users-detail-item">
            <span>Email</span>
            <strong>${p(e.email)}</strong>
        </div>
        <div class="admin-users-detail-item">
            <span>Password</span>
            <strong>${p(e.password_mask)}</strong>
            <p>${p(e.password_note)}</p>
        </div>
        <div class="admin-users-detail-item">
            <span>Role</span>
            <strong>${p(e.role)}</strong>
        </div>
        <div class="admin-users-detail-item">
            <span>Dibuat</span>
            <strong>${p(yo(e.created_at))}</strong>
        </div>
    `)}async function vs(e){ys(await S(`/admin-users/${e}`)),D("admin-user-show-modal")}async function Es(e){ks(await S(`/admin-users/${e}`)),D("admin-user-form-modal")}function ws(e){$.deleteItem=e,document.getElementById("admin-user-delete-copy").innerHTML=`Apakah Anda yakin ingin menghapus akun <strong>${p(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`,D("admin-user-delete-modal")}function Dn(){const e=document.getElementById("admin-users-access-note"),t=document.getElementById("admin-users-search-input"),n=document.querySelector(".admin-users-page-actions");e&&(e.hidden=!1,e.textContent="Halaman ini hanya dapat diakses oleh Admin atau Super Admin."),t&&(t.disabled=!0),n&&(n.hidden=!0),$.loading=!1,$.data=[],$.totalCount=0,ha("Anda tidak memiliki akses untuk mengelola data admin dan user."),$t()}function Bs({user:e}={}){const t=document.getElementById("admin-users-add-admin-btn"),n=document.getElementById("admin-users-add-user-btn"),a=document.getElementById("admin-users-search-input"),r=document.getElementById("admin-user-form"),o=document.getElementById("admin-users-table-body"),s=document.getElementById("admin-user-delete-confirm-btn"),i=document.getElementById("admin-users-prev-page-btn"),m=document.getElementById("admin-users-next-page-btn");if(!(!t||!n||!r||!o)){if($.currentUser=e||window.transitAuthUser||null,!ls($.currentUser?.role)){Dn();return}return t.addEventListener("click",()=>{ht("Admin"),D("admin-user-form-modal")}),n.addEventListener("click",()=>{ht("User"),D("admin-user-form-modal")}),a?.addEventListener("input",Re(async d=>{$.search=d.target.value.trim(),$.page=1;try{await pe()}catch(l){v(l.message||"Gagal memuat data akun")}})),r.addEventListener("submit",async d=>{d.preventDefault();const l={nama:document.getElementById("admin-user-nama")?.value.trim()||"",username:document.getElementById("admin-user-username")?.value.trim()||"",email:document.getElementById("admin-user-email")?.value.trim()||"",password:document.getElementById("admin-user-password")?.value||"",role:document.getElementById("admin-user-role")?.value||"User"};tt(!0);try{$.editItem?(await S(`/admin-users/${$.editItem.id}`,{method:"PUT",body:l}),P("Akun berhasil diperbarui")):(await S("/admin-users",{method:"POST",body:l}),P(l.role==="Admin"?"Admin berhasil ditambahkan":"User berhasil ditambahkan")),V("admin-user-form-modal"),ht($.defaultRole),await pe()}catch(c){v(c.message||"Silakan periksa kembali data yang diinput","Gagal menyimpan akun")}finally{tt(!1)}}),o.addEventListener("click",async d=>{const l=d.target.closest("[data-admin-user-show]"),c=d.target.closest("[data-admin-user-edit]"),f=d.target.closest("[data-admin-user-delete]");try{if(l){await vs(l.dataset.adminUserShow);return}if(c){await Es(c.dataset.adminUserEdit);return}f&&ws({id:f.dataset.adminUserDelete,nama:f.dataset.adminUserName})}catch(y){v(y.message||"Gagal memuat detail akun")}}),s?.addEventListener("click",async()=>{if($.deleteItem)try{await S(`/admin-users/${$.deleteItem.id}`,{method:"DELETE"}),P("Akun berhasil dihapus"),V("admin-user-delete-modal"),($.page-1)*Ce>=$.totalCount-1&&$.page>1&&($.page-=1),$.deleteItem=null,await pe()}catch(d){v(d.message||"Gagal menghapus akun")}}),i?.addEventListener("click",async()=>{if(!($.page<=1)){$.page-=1;try{await pe()}catch(d){v(d.message||"Gagal memuat data akun")}}}),m?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil($.totalCount/Ce));if(!($.page>=d)){$.page+=1;try{await pe()}catch(l){v(l.message||"Gagal memuat data akun")}}}),pe().catch(d=>{if(d.status===403){Dn();return}v(d.message||"Gagal memuat data akun")})}}const On=[{value:"05:00",label:"Subuh",time:"05.00 WIB"},{value:"08:00",label:"Pagi",time:"08.00 WIB"},{value:"10:00",label:"Pagi",time:"10.00 WIB"},{value:"14:00",label:"Siang",time:"14.00 WIB"},{value:"16:00",label:"Sore",time:"16.00 WIB"},{value:"19:00",label:"Malam",time:"19.00 WIB"}],va=[[{code:"1A",label:"1A"},{code:"SOPIR",label:"SOPIR",isDriver:!0}],[{code:"2A",label:"2A"},{code:"3A",label:"3A"}],[{code:"4A",label:"4A"},{code:"5A",label:"5A"}]],Is=va.flat().filter(e=>!e.isDriver).length,k={currentUser:null,date:Pe(),direction:"to_pkb",bookings:[],loading:!1,drivers:[],mobils:[],formOptions:null,selectedSeats:[],passengerDraftMap:{},editItem:null,deleteItem:null,slotDriverMap:{},slotMobilMap:{}};function kt(e){const t=document.getElementById(e);if(!t)return null;try{return JSON.parse(t.textContent||"{}")}catch{return null}}function Ss(e){return["Super Admin","Admin"].includes(e)}function $s(e){const t=e?"#dc2626":"#166534",n=e?"#991b1b":"#14532d";return`
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
        </svg>`}function xs(){return'<svg viewBox="0 0 24 24" fill="none"><path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path><path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg>'}function _s(){return'<svg viewBox="0 0 24 24" fill="none"><path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg>'}function Ts(e){return`
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
                    </div>`;const o=e[r.code],s=!!o,i=s?"bpg-seat-occupied":"bpg-seat-available",m=s?p(o.nama_pemesanan||"-"):"";return`
                <div class="bpg-seat-item ${i}" title="${s?m:"Tersedia"}">
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
            </div>`;const t=[{value:"Berangkat",label:"Berangkat",cls:"bpg-depart-opt--go"},{value:"Tidak Berangkat",label:"Tidak Berangkat",cls:"bpg-depart-opt--no"},{value:"Di Oper",label:"Di Oper",cls:"bpg-depart-opt--oper"}];function n(r){return r==="Berangkat"?{label:"Berangkat",cls:"bpg-depart-trigger--go"}:r==="Tidak Berangkat"?{label:"Tidak Berangkat",cls:"bpg-depart-trigger--no"}:r==="Di Oper"?{label:"Di Oper",cls:"bpg-depart-trigger--oper"}:{label:"Status",cls:""}}return`
        <div class="bpg-passenger-list">
            <div class="bpg-passenger-list-head">
                <svg viewBox="0 0 24 24" fill="none" style="width:15px;height:15px;"><path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="1.8"/></svg>
                <span>Daftar Penumpang</span>
            </div>
            ${e.map(r=>{const o=r.selected_seats_label||"-",s=r.departure_status||"",i=n(s),m=t.map(d=>{const l=s===d.value;return`<button class="bpg-depart-opt ${d.cls}${l?" is-active":""}" type="button"
                data-departure-status="${p(d.value)}"
                data-booking-departure="${p(String(r.id))}">${p(d.label)}</button>`}).join("");return`
            <div class="bpg-passenger-item" data-booking-id="${p(String(r.id))}">
                <div class="bpg-passenger-item-row">
                    <div class="bpg-passenger-seats">
                        ${o.split(",").map(d=>`<span class="stock-value-badge stock-value-badge-blue">${p(d.trim())}</span>`).join("")}
                    </div>
                    <div class="bpg-passenger-info">
                        <span class="bpg-passenger-name">${p(r.nama_pemesanan||"-")}</span>
                        <span class="bpg-passenger-phone">${p(r.phone||"-")}</span>
                    </div>
                    <div class="bpg-passenger-actions">
                        <span class="${p(r.payment_status_badge_class||"stock-value-badge stock-value-badge-blue")} bpg-status-sm">${p(r.payment_status||"-")}</span>
                        <button class="bpg-lihat-btn" type="button" data-booking-lihat="${p(String(r.id))}" aria-label="Lihat detail ${p(r.nama_pemesanan)}">
                            <svg viewBox="0 0 24 24" fill="none" style="width:13px;height:13px;"><path d="M2.5 12C4.4 8.2 8 6 12 6C16 6 19.6 8.2 21.5 12C19.6 15.8 16 18 12 18C8 18 4.4 15.8 2.5 12Z" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/></svg>
                            Lihat
                        </button>
                        <button class="admin-users-icon-button" type="button" data-booking-edit="${p(String(r.id))}" title="Edit pemesanan">
                            ${xs()}
                        </button>
                        <button class="admin-users-icon-button admin-users-icon-button-danger" type="button" data-booking-delete="${p(String(r.id))}" data-booking-name="${p(r.nama_pemesanan)}" title="Hapus pemesanan">
                            ${_s()}
                        </button>
                    </div>
                </div>
                <div class="bpg-passenger-depart-row">
                    <div class="bpg-depart-dropdown" data-depart-dropdown="${p(String(r.id))}">
                        <button class="bpg-depart-trigger ${i.cls}" type="button" data-depart-toggle="${p(String(r.id))}">
                            <svg viewBox="0 0 24 24" fill="none" style="width:11px;height:11px;flex-shrink:0;"><circle cx="12" cy="12" r="2.5" fill="currentColor"/><circle cx="12" cy="5" r="2" fill="currentColor"/><circle cx="12" cy="19" r="2" fill="currentColor"/></svg>
                            ${p(i.label)}
                            <svg viewBox="0 0 24 24" fill="none" style="width:10px;height:10px;flex-shrink:0;"><path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </button>
                        <div class="bpg-depart-menu" hidden>
                            ${m}
                        </div>
                    </div>
                </div>
            </div>`}).join("")}
        </div>`}function As(e){const t={};return e.forEach(n=>{(Array.isArray(n.selected_seats)?n.selected_seats:[]).forEach(r=>{t[r]||(t[r]=n)})}),t}function Rs(e,t){const n=As(t),a=t.reduce((c,f)=>c+(Number(f.passenger_count)||0),0),r=`${e.value}__${k.direction}`;if(!k.slotDriverMap[r]){const c=t.find(f=>f.driver_id);c&&(k.slotDriverMap[r]=c.driver_id)}const o=k.slotDriverMap[r]||"",s=k.slotMobilMap[r]||"",i="stock-value-badge-yellow",m=k.drivers.map(c=>{const f=c.lokasi?`${c.nama} (${c.lokasi})`:c.nama;return`<option value="${p(c.id)}" ${o===c.id?"selected":""}>${p(f)}</option>`}).join(""),d=k.mobils.map(c=>{const f=`${c.kode_mobil} — ${c.jenis_mobil}`;return`<option value="${p(c.id)}" ${s===c.id?"selected":""}>${p(f)}</option>`}).join(""),l=[...new Set(t.map(c=>(c.service_type||"").trim()).filter(Boolean))];return`
        <article class="bpg-slot-card" data-slot="${p(e.value)}" data-direction="${p(k.direction)}">
            <div class="bpg-slot-head">
                <div class="bpg-slot-time-badge">
                    <span class="bpg-slot-period">${p(e.label)}</span>
                    <strong class="bpg-slot-time">${p(e.time)}</strong>
                </div>
                <div class="bpg-slot-service-types">
                    ${l.length>0?l.map(c=>`<span class="bpg-service-badge">${p(c)}</span>`).join(""):'<span class="bpg-service-badge bpg-service-badge--empty">Belum ada layanan</span>'}
                </div>
                <div class="bpg-slot-counters">
                    <span class="stock-value-badge ${i}">${a} / ${Is} Kursi</span>
                </div>
            </div>

            ${Ts(n)}

            <div class="bpg-slot-assignment">
                <div class="bpg-slot-select-group">
                    <label>
                        <svg viewBox="0 0 24 24" fill="none" style="width:13px;height:13px;"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/><path d="M4 20C4 17.2386 7.58172 15 12 15C16.4183 15 20 17.2386 20 20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
                        Pilih Driver
                    </label>
                    <select class="bpg-slot-select" data-slot-driver="${p(e.value)}">
                        <option value="">— Belum ditentukan —</option>
                        ${m}
                    </select>
                </div>
                <div class="bpg-slot-select-group">
                    <label>
                        <svg viewBox="0 0 24 24" fill="none" style="width:13px;height:13px;"><rect x="2" y="7" width="20" height="10" rx="3" stroke="currentColor" stroke-width="1.8"/><circle cx="6" cy="17" r="2" stroke="currentColor" stroke-width="1.8"/><circle cx="18" cy="17" r="2" stroke="currentColor" stroke-width="1.8"/></svg>
                        Pilih Mobil
                    </label>
                    <select class="bpg-slot-select" data-slot-mobil="${p(e.value)}">
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
            </div>`)}function Ps(){const e=document.getElementById("bpg-slots-shell");if(!e)return;const t={};On.forEach(a=>{t[a.value]=[]}),k.bookings.forEach(a=>{const o=(a.trip_time||"").trim().substring(0,5);t[o]&&t[o].push(a)});const n=On.map(a=>Rs(a,t[a.value]||[]));e.innerHTML=`<div class="bpg-slots-grid">${n.join("")}</div>`}async function we(){k.loading=!0,Ms();try{const e=new URLSearchParams({date:k.date,direction:k.direction,limit:200,page:1}),t=await S(`/bookings?${e}`);k.bookings=Array.isArray(t)?t:[]}catch(e){k.bookings=[],e.status!==403&&v(e.message||"Gagal memuat data penumpang")}finally{k.loading=!1,Ps()}}function Ds(e){document.getElementById("bpg-detail-title").textContent=e.nama_pemesanan||"-",document.getElementById("bpg-detail-subtitle").textContent=`${e.booking_code||"-"} · ${e.booking_status||"-"}`,document.getElementById("bpg-detail-full-link").href=`/dashboard/bookings/${e.id}`;const t=document.getElementById("bpg-detail-body");t.innerHTML=`
        <div class="bpg-detail-grid">
            <div class="bpg-detail-item">
                <span>Nama Pemesanan</span>
                <strong>${p(e.nama_pemesanan||"-")}</strong>
            </div>
            <div class="bpg-detail-item">
                <span>No HP</span>
                <strong>${p(e.phone||"-")}</strong>
            </div>
            <div class="bpg-detail-item">
                <span>Kota Asal</span>
                <strong>${p(e.from_city||"-")}</strong>
            </div>
            <div class="bpg-detail-item">
                <span>Kota Tujuan</span>
                <strong>${p(e.to_city||"-")}</strong>
            </div>
            <div class="bpg-detail-item">
                <span>Tanggal Keberangkatan</span>
                <strong>${p(e.trip_date_label||"-")}</strong>
            </div>
            <div class="bpg-detail-item">
                <span>Waktu Keberangkatan</span>
                <strong>${p(e.trip_time||"-")}</strong>
            </div>
            <div class="bpg-detail-item">
                <span>Pilih Kursi</span>
                <strong>${p(e.selected_seats_label||"-")}</strong>
            </div>
            <div class="bpg-detail-item">
                <span>Jumlah Penumpang</span>
                <strong>${p(String(e.passenger_count||0))} Orang</strong>
            </div>
            <div class="bpg-detail-item">
                <span>Jenis Layanan</span>
                <strong>${p(e.service_type||"-")}</strong>
            </div>
            <div class="bpg-detail-item">
                <span>Biaya</span>
                <strong class="bpg-detail-price">${p(e.total_amount_formatted||"-")}</strong>
            </div>
            <div class="bpg-detail-item bpg-detail-item--full">
                <span>Alamat Penjemputan</span>
                <p>${p(e.pickup_location||"-")}</p>
            </div>
            <div class="bpg-detail-item bpg-detail-item--full">
                <span>Alamat Pengantaran</span>
                <p>${p(e.dropoff_location||"-")}</p>
            </div>
        </div>`,D("bpg-detail-modal")}function Os(){return(k.formOptions?.seat_options||[]).map(e=>e.code)}function Ft(e){const t=new Map(Os().map((n,a)=>[n,a]));return Array.from(new Set((e||[]).map(n=>String(n).trim()).filter(n=>t.has(n)))).sort((n,a)=>(t.get(n)??999)-(t.get(a)??999))}function ct(){return Number(document.getElementById("booking-passenger-count")?.value||0)}function js(){const e=ct();return(k.formOptions?.seat_options||[]).filter(t=>!t.is_optional||e>=6).map(t=>t.code)}function Ns(){return k.formOptions?.payment_status_options||[]}function Us(e){return e==="transfer"?["Belum Bayar","Menunggu Pembayaran","Menunggu Verifikasi","Dibayar"]:e==="qris"?["Belum Bayar","Menunggu Pembayaran","Dibayar"]:e==="cash"?["Belum Bayar","Dibayar Tunai"]:["Belum Bayar"]}function qs(e){return e==="transfer"?"Menunggu Pembayaran":e==="qris"?"Dibayar":e==="cash"?"Dibayar Tunai":"Belum Bayar"}function Hs(e){return e==="transfer"?"Menunggu Verifikasi Pembayaran":e==="qris"||e==="cash"?"Diproses":"Draft"}function Fs(e,t){if(!e||!t||e===t)return null;const a=(k.formOptions?.route_matrix||{})?.[e]?.[t];return a==null?null:Number(a)}function Be(){const e=document.getElementById("booking-from-city")?.value||"",t=document.getElementById("booking-to-city")?.value||"",n=ct(),a=Fs(e,t),r=a!==null?a*n:null,o=document.getElementById("booking-price-per-seat"),s=document.getElementById("booking-total-amount");o&&(o.value=a!==null?M(a):""),s&&(s.value=r!==null?M(r):"")}function Vt(){const e=document.getElementById("booking-payment-method")?.value||"",t=document.getElementById("booking-payment-status"),n=document.getElementById("booking-booking-status"),a=document.getElementById("booking-bank-account-group"),r=document.getElementById("booking-bank-account-code"),o=Us(e),s=t?.value||"";a&&(a.hidden=e!=="transfer"),r&&e!=="transfer"&&(r.value=""),t&&(t.innerHTML=Ns().filter(i=>o.includes(i.value)).map(i=>`<option value="${p(i.value)}">${p(i.label)}</option>`).join(""),t.value=o.includes(s)?s:qs(e)),n&&(n.value=Hs(e))}function Vs(){const e=document.getElementById("booking-selected-seats-inputs");e&&(e.innerHTML=k.selectedSeats.map(t=>`<input type="hidden" name="selected_seats[]" value="${p(t)}">`).join(""))}function Gs(){const e=document.getElementById("booking-selected-seat-count"),t=document.getElementById("booking-selected-seat-label");e&&(e.textContent=String(k.selectedSeats.length)),t&&(t.textContent=k.selectedSeats.length>0?k.selectedSeats.join(", "):"Belum dipilih")}function Ct(){document.querySelectorAll("[data-passenger-seat]").forEach(e=>{const t=e.dataset.passengerSeat;t&&(k.passengerDraftMap[t]={seat_no:t,name:e.querySelector("[data-passenger-name]")?.value.trim()||"",phone:e.querySelector("[data-passenger-phone]")?.value.trim()||""})})}function nt(e=null){const t=document.getElementById("booking-passenger-editor");if(t){if(e&&(k.passengerDraftMap=Object.fromEntries(e.map(n=>[n.seat_no,n]))),k.selectedSeats.length===0){t.innerHTML='<div class="dashboard-empty-state dashboard-empty-state--block bookings-passenger-empty">Pilih kursi terlebih dahulu untuk menampilkan form data penumpang.</div>';return}t.innerHTML=`
        <div class="bookings-passenger-grid bookings-passenger-grid--editor">
            ${k.selectedSeats.map((n,a)=>{const r=k.passengerDraftMap[n]||{name:"",phone:""};return`
                    <article class="bookings-passenger-card bookings-passenger-card--editor" data-passenger-seat="${p(n)}">
                        <div class="bookings-passenger-form-head">
                            <span class="stock-value-badge stock-value-badge-blue">${p(n)}</span>
                            <strong>Penumpang ${a+1}</strong>
                            <p>${a===0?"Menjadi nama pemesanan utama.":"Data penumpang tambahan."}</p>
                        </div>
                        <div class="bookings-passenger-form-grid">
                            <div class="admin-users-form-group">
                                <label>Nama</label>
                                <div class="admin-users-input-shell">
                                    <input type="text" value="${p(r.name||"")}" placeholder="Masukkan nama penumpang" data-passenger-name>
                                </div>
                            </div>
                            <div class="admin-users-form-group">
                                <label>No HP</label>
                                <div class="admin-users-input-shell">
                                    <input type="text" value="${p(r.phone||"")}" placeholder="08xxxxxxxxxx" data-passenger-phone>
                                </div>
                            </div>
                        </div>
                    </article>`}).join("")}
        </div>`}}function at(){const e=document.querySelectorAll("[data-seat-code]"),t=ct(),n=js();k.selectedSeats=Ft(k.selectedSeats.filter(a=>n.includes(a))),e.forEach(a=>{const r=a.dataset.seatCode,o=n.includes(r),s=k.selectedSeats.includes(r),i=k.selectedSeats.length>=t&&!s;a.hidden=!o,a.classList.toggle("is-selected",s),a.classList.toggle("is-disabled",i),a.disabled=!o||i}),Vs(),Gs()}function yt(){document.getElementById("booking-form")?.reset(),k.editItem=null,k.selectedSeats=[],k.passengerDraftMap={};const t=k.date||Pe();document.getElementById("booking-id").value="",document.getElementById("booking-form-title").textContent="Tambah Pemesanan",document.getElementById("booking-form-description").textContent="Lengkapi data pemesanan reguler dari dashboard admin.",document.getElementById("booking-trip-date").value=t,document.getElementById("booking-passenger-count").value="1",document.getElementById("booking-payment-method").value="",document.getElementById("booking-booking-status").value="Draft",Vt(),at(),nt(),Be(),se(document.getElementById("booking-submit-btn"),!1,"Menyimpan...")}function Js(e){k.editItem=e,k.selectedSeats=Ft(e.selected_seats||[]),k.passengerDraftMap=Object.fromEntries((e.passengers||[]).map(t=>[t.seat_no,t])),document.getElementById("booking-id").value=e.id,document.getElementById("booking-booking-for").value=e.booking_for,document.getElementById("booking-category").value=e.category,document.getElementById("booking-from-city").value=e.from_city,document.getElementById("booking-to-city").value=e.to_city,document.getElementById("booking-trip-date").value=e.trip_date_value,document.getElementById("booking-trip-time").value=e.trip_time_value,document.getElementById("booking-passenger-count").value=String(e.passenger_count),document.getElementById("booking-driver-name").value=e.driver_name==="Menunggu Penetapan Driver"?"":e.driver_name||"",document.getElementById("booking-pickup-location").value=e.pickup_location,document.getElementById("booking-dropoff-location").value=e.dropoff_location,document.getElementById("booking-payment-method").value=e.payment_method_value||"",Vt(),document.getElementById("booking-payment-status").value=e.payment_status,document.getElementById("booking-booking-status").value=e.booking_status,document.getElementById("booking-bank-account-code").value=e.bank_account_code||"",document.getElementById("booking-notes").value=e.notes||"",document.getElementById("booking-form-title").textContent="Edit Pemesanan",document.getElementById("booking-form-description").textContent="Perbarui data pemesanan reguler yang dipilih.",at(),nt(e.passengers||[]),Be(),se(document.getElementById("booking-submit-btn"),!1,"Menyimpan...")}function Ws(){return Ct(),{booking_for:document.getElementById("booking-booking-for")?.value||"",category:document.getElementById("booking-category")?.value||"Reguler",from_city:document.getElementById("booking-from-city")?.value||"",to_city:document.getElementById("booking-to-city")?.value||"",trip_date:document.getElementById("booking-trip-date")?.value||"",trip_time:document.getElementById("booking-trip-time")?.value||"",passenger_count:Number(document.getElementById("booking-passenger-count")?.value||0),driver_name:document.getElementById("booking-driver-name")?.value.trim()||"",pickup_location:document.getElementById("booking-pickup-location")?.value.trim()||"",dropoff_location:document.getElementById("booking-dropoff-location")?.value.trim()||"",selected_seats:k.selectedSeats,passengers:k.selectedSeats.map(e=>({seat_no:e,name:k.passengerDraftMap?.[e]?.name||"",phone:k.passengerDraftMap?.[e]?.phone||""})),payment_method:document.getElementById("booking-payment-method")?.value||"",payment_status:document.getElementById("booking-payment-status")?.value||"Belum Bayar",booking_status:document.getElementById("booking-booking-status")?.value||"Draft",bank_account_code:document.getElementById("booking-bank-account-code")?.value||"",notes:document.getElementById("booking-notes")?.value.trim()||""}}async function Ks(e){Js(await S(`/bookings/${e}`)),D("booking-form-modal")}function zs(e){k.deleteItem=e,document.getElementById("booking-delete-copy").innerHTML=`Apakah Anda yakin ingin menghapus data pemesanan <strong>${p(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`,D("booking-delete-modal")}function jn(){const e=document.getElementById("bookings-access-note"),t=document.getElementById("bpg-route-tabs"),n=document.getElementById("bpg-slots-shell");e&&(e.hidden=!1),t&&(t.hidden=!0),n&&(n.hidden=!0)}function Xs({user:e}={}){const t=document.getElementById("bookings-add-btn"),n=document.getElementById("bookings-date-picker"),a=document.getElementById("bpg-route-tabs"),r=document.getElementById("bpg-slots-shell"),o=document.getElementById("booking-form"),s=document.getElementById("booking-delete-confirm-btn"),i=document.getElementById("booking-seat-grid"),m=document.getElementById("booking-passenger-editor"),d=document.getElementById("booking-payment-method");if(k.formOptions=kt("bookings-form-options"),k.drivers=kt("bookings-drivers-data")||[],k.mobils=kt("bookings-mobils-data")||[],k.currentUser=e||window.transitAuthUser||null,k.date=Pe(),!Ss(k.currentUser?.role)){jn();return}n&&(n.value=k.date,n.addEventListener("change",async()=>{k.date=n.value,k.slotDriverMap={},k.slotMobilMap={},await we()})),a?.addEventListener("click",async c=>{const f=c.target.closest("[data-direction]");if(!f)return;const y=f.dataset.direction;y!==k.direction&&(k.direction=y,k.slotDriverMap={},k.slotMobilMap={},document.querySelectorAll(".bpg-route-tab").forEach(g=>{g.classList.toggle("is-active",g.dataset.direction===y)}),await we())});function l(c=null){r?.querySelectorAll("[data-depart-dropdown]").forEach(f=>{String(f.dataset.departDropdown)!==String(c)&&(f.querySelector(".bpg-depart-menu")?.removeAttribute("hidden"),f.querySelector(".bpg-depart-menu")?.setAttribute("hidden",""))})}return document.addEventListener("click",c=>{c.target.closest("[data-depart-dropdown]")||l()}),r?.addEventListener("click",async c=>{const f=c.target.closest("[data-depart-toggle]"),y=c.target.closest("[data-booking-departure]"),g=c.target.closest("[data-booking-lihat]"),h=c.target.closest("[data-booking-edit]"),b=c.target.closest("[data-booking-delete]");try{if(f){const x=f.dataset.departToggle,_=r.querySelector(`[data-depart-dropdown="${CSS.escape(x)}"]`)?.querySelector(".bpg-depart-menu");if(!_)return;const R=_.hasAttribute("hidden");l(x),_.toggleAttribute("hidden",!R);return}if(y){const x=y.dataset.bookingDeparture,A=y.dataset.departureStatus,_=k.bookings.find(q=>String(q.id)===String(x));if(!_)return;const R=_.departure_status===A?"":A;_.departure_status=R;const O=r.querySelector(`[data-depart-dropdown="${CSS.escape(x)}"]`);if(O){const q=O.querySelector(".bpg-depart-trigger"),H=departureStatusMeta(R);q.className=`bpg-depart-trigger ${H.cls}`,q.childNodes.forEach(z=>{z.nodeType===3&&(z.textContent=H.label)}),O.querySelectorAll("[data-booking-departure]").forEach(z=>{z.classList.toggle("is-active",z.dataset.departureStatus===R)}),O.querySelector(".bpg-depart-menu")?.setAttribute("hidden","")}await S(`/bookings/${x}/departure-status`,{method:"PATCH",body:{departure_status:R}});return}if(g){const x=g.dataset.bookingLihat,A=k.bookings.find(_=>String(_.id)===String(x));A&&Ds(A);return}if(h){await Ks(h.dataset.bookingEdit);return}b&&zs({id:b.dataset.bookingDelete,nama:b.dataset.bookingName})}catch(x){v(x.message||"Gagal memuat data pemesanan")}}),r?.addEventListener("change",async c=>{const f=c.target.closest("[data-slot-driver]"),y=c.target.closest("[data-slot-mobil]");if(f){const g=f.dataset.slotDriver,h=f.value,b=f.options[f.selectedIndex],x=h&&b?.text.split(" (")[0]||"",A=`${g}__${k.direction}`;k.slotDriverMap[A]=h;try{await S("/bookings/slot-assign",{method:"PATCH",body:{trip_date:k.date,trip_time:g,direction:k.direction,driver_id:h||null,driver_name:x}}),P("Driver berhasil diperbarui")}catch(_){v(_.message||"Gagal memperbarui driver")}}if(y){const g=y.dataset.slotMobil,h=y.value,b=`${g}__${k.direction}`;k.slotMobilMap[b]=h}}),t?.addEventListener("click",()=>{yt(),D("booking-form-modal")}),i?.addEventListener("click",c=>{const f=c.target.closest("[data-seat-code]");if(!f||f.disabled)return;Ct();const y=f.dataset.seatCode;k.selectedSeats.includes(y)?k.selectedSeats=k.selectedSeats.filter(g=>g!==y):k.selectedSeats.length<ct()&&(k.selectedSeats=Ft([...k.selectedSeats,y])),at(),nt()}),document.getElementById("booking-passenger-count")?.addEventListener("change",()=>{Ct(),at(),nt(),Be()}),document.getElementById("booking-from-city")?.addEventListener("change",Be),document.getElementById("booking-to-city")?.addEventListener("change",Be),d?.addEventListener("change",Vt),m?.addEventListener("input",c=>{const f=c.target.closest("[data-passenger-seat]");if(!f)return;const y=f.dataset.passengerSeat;k.passengerDraftMap[y]={seat_no:y,name:f.querySelector("[data-passenger-name]")?.value.trim()||"",phone:f.querySelector("[data-passenger-phone]")?.value.trim()||""}}),o?.addEventListener("submit",async c=>{c.preventDefault();const f=document.getElementById("booking-submit-btn");se(f,!0,"Menyimpan...");try{const y=Ws();k.editItem?(await S(`/bookings/${k.editItem.id}`,{method:"PUT",body:y}),P("Data pemesanan berhasil diperbarui")):(await S("/bookings",{method:"POST",body:y}),P("Data pemesanan berhasil ditambahkan")),V("booking-form-modal"),yt(),await we()}catch(y){v(y.message||"Silakan periksa kembali data yang diinput","Gagal menyimpan data pemesanan")}finally{se(f,!1,"Menyimpan...")}}),s?.addEventListener("click",async()=>{if(k.deleteItem){se(s,!0,"Menghapus...");try{await S(`/bookings/${k.deleteItem.id}`,{method:"DELETE"}),P("Data pemesanan berhasil dihapus"),V("booking-delete-modal"),k.deleteItem=null,await we()}catch(c){v(c.message||"Gagal menghapus data pemesanan")}finally{se(s,!1,"Menghapus...")}}}),yt(),we().catch(c=>{if(c.status===403){jn();return}v(c.message||"Gagal memuat data penumpang")})}function Zs(e){const t=document.getElementById(e);if(!t)return{};try{return JSON.parse(t.textContent||"{}")}catch{return{}}}function Qs(){const e=document.querySelector("[data-regular-booking-page]");if(!e)return;const t=Zs("regular-booking-route-matrix"),n=e.querySelector("[data-booking-origin]"),a=e.querySelector("[data-booking-destination]"),r=e.querySelector("[data-booking-schedule]"),o=e.querySelector("[data-booking-passengers]"),s=e.querySelector("[data-route-fare-input]"),i=e.querySelector("[data-estimated-total-input]"),m=e.querySelector("[data-route-feedback]"),d=e.querySelector("[data-route-feedback-title]"),l=e.querySelector("[data-route-feedback-text]"),c=e.querySelector("[data-booking-submit]"),f=Array.from(e.querySelectorAll("[data-booking-type]")),y=e.querySelector("[data-summary-booking-for]"),g=e.querySelector("[data-summary-route]"),h=e.querySelector("[data-summary-schedule]"),b=e.querySelector("[data-summary-passengers]"),x=e.querySelector("[data-summary-fare]"),A=e.querySelector("[data-summary-total]"),_=new Map(f.map(T=>[T.value,T.dataset.label||T.value])),R=new Map(Array.from(r?.options||[]).filter(T=>T.value).map(T=>[T.value,T.textContent.trim()]));function O(T,U){if(!T||!U||T===U)return null;const W=t?.[T]?.[U];return W==null?null:Number(W)}function q(T,U,W){!m||!d||!l||(m.dataset.state=T,d.textContent=U,l.textContent=W)}function H(){e.querySelectorAll(".regular-booking-radio").forEach(T=>{const U=T.querySelector('input[type="radio"]');T.classList.toggle("is-selected",!!U?.checked)})}function z(T){return T<=0?"Belum dipilih":T===6?"6 Penumpang (Opsional tambahan)":`${T} Penumpang`}function Q(){const T=n?.value||"",U=a?.value||"",W=r?.value||"",Y=Number(o?.value||0),ee=f.find(De=>De.checked)?.value||"",X=O(T,U),N=X!==null&&Y>0?X*Y:null;s&&(s.value=X!==null?M(X):""),i&&(i.value=N!==null?M(N):""),!T||!U?q("idle","Tarif akan ditampilkan otomatis","Pilih asal dan tujuan untuk melihat tarif perjalanan reguler."):T===U?q("error","Asal dan tujuan tidak boleh sama","Silakan pilih tujuan yang berbeda agar tarif dapat dihitung."):X===null?q("error","Rute belum tersedia","Rute yang Anda pilih saat ini belum tersedia. Silakan pilih kombinasi asal dan tujuan lain."):q("ready","Rute tersedia","Tarif telah diisi otomatis berdasarkan kombinasi rute dua arah yang tersedia."),c&&(c.disabled=!!(T&&U&&(T===U||X===null))),y&&(y.textContent=_.get(ee)||"Belum dipilih"),g&&(g.textContent=T&&U?`${T} - ${U}`:"Belum dipilih"),h&&(h.textContent=R.get(W)||"Belum dipilih"),b&&(b.textContent=z(Y)),x&&(x.textContent=X!==null?M(X):"Belum tersedia"),A&&(A.textContent=N!==null?M(N):"Belum tersedia"),H()}[n,a,r,o].forEach(T=>{T?.addEventListener("change",Q)}),f.forEach(T=>{T.addEventListener("change",Q)}),e.querySelector("form")?.addEventListener("reset",()=>{window.requestAnimationFrame(Q)}),Q()}function Ys(){const e=document.querySelector("[data-regular-booking-seat-page]");if(!e)return;const t=Number(e.dataset.requiredSeatCount||0),n=Array.from(e.querySelectorAll("[data-seat-card]")),a=Array.from(e.querySelectorAll("[data-seat-input]")),r=e.querySelector("[data-seat-summary-count]"),o=e.querySelector("[data-seat-summary-list]"),s=e.querySelector("[data-seat-summary-remaining]"),i=e.querySelector("[data-seat-submit]"),m=e.querySelector("[data-seat-feedback]"),d=e.querySelector("[data-seat-feedback-title]"),l=e.querySelector("[data-seat-feedback-text]");function c(){return a.filter(h=>h.checked).map(h=>h.value)}function f(h){return h.length>0?h.join(", "):"Belum dipilih"}function y(h,b,x){!m||!d||!l||(m.dataset.state=h,d.textContent=b,l.textContent=x)}function g(){const h=c(),b=h.length,x=t>0&&b>=t;if(n.forEach(A=>{const _=A.querySelector("[data-seat-input]");if(!_)return;const R=_.checked,O=x&&!R;_.disabled=O,A.classList.toggle("is-selected",R),A.classList.toggle("is-disabled",O)}),r&&(r.textContent=`${b} dari ${t}`),o&&(o.textContent=f(h)),s&&(s.textContent=String(Math.max(t-b,0))),i&&(i.disabled=b!==t),b===0){y("idle","Pilih kursi sesuai jumlah penumpang","Jumlah kursi yang dipilih harus sama dengan jumlah penumpang pada booking draft.");return}if(b<t){y("idle","Pemilihan kursi belum lengkap",`Masih perlu memilih ${t-b} kursi lagi sebelum dapat melanjutkan.`);return}if(t===6){y("ready","Semua kursi sudah terisi","Jumlah penumpang 6 orang sudah terpenuhi dan kursi tambahan 2B ikut terpakai.");return}y("ready","Kursi sudah sesuai","Jumlah kursi yang dipilih sudah sesuai dengan jumlah penumpang dan siap disimpan.")}a.forEach(h=>{h.addEventListener("change",()=>{g()})}),g()}const ei={"admin-users/index":Bs,"auth/login":bo,"bookings/index":Xs,"dashboard/index":xo,"drivers/index":jo,"mobil/index":zo,"keberangkatan/index":ns,"regular-bookings/index":Qs,"regular-bookings/seats":Ys,"stock/index":ds};document.addEventListener("DOMContentLoaded",async()=>{mo(),fo(),Ge(ua());const e=oo();e&&(e.type==="success"?P(e.message,e.title):e.type==="info"?po(e.message,e.title):v(e.message,e.title));try{const{user:t}=await uo();t&&Ge(t);const n=document.body.dataset.pageScript,a=ei[n];typeof a=="function"&&await a({user:t})}catch(t){console.error(t),v(t.message||"Terjadi kesalahan saat memuat halaman")}});
