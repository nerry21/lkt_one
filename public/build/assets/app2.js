function La(e,t){return function(){return e.apply(t,arguments)}}const{toString:Cr}=Object.prototype,{getPrototypeOf:rn}=Object,{iterator:Tt,toStringTag:Ma}=Symbol,At=(e=>t=>{const n=Cr.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),ue=e=>(e=e.toLowerCase(),t=>At(t)===e),Lt=e=>t=>typeof t===e,{isArray:je}=Array,Pe=Lt("undefined");function et(e){return e!==null&&!Pe(e)&&e.constructor!==null&&!Pe(e.constructor)&&se(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const Ra=ue("ArrayBuffer");function xr(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&Ra(e.buffer),t}const Tr=Lt("string"),se=Lt("function"),Pa=Lt("number"),tt=e=>e!==null&&typeof e=="object",Ar=e=>e===!0||e===!1,mt=e=>{if(At(e)!=="object")return!1;const t=rn(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Ma in e)&&!(Tt in e)},Lr=e=>{if(!tt(e)||et(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},Mr=ue("Date"),Rr=ue("File"),Pr=e=>!!(e&&typeof e.uri<"u"),Dr=e=>e&&typeof e.getParts<"u",Or=ue("Blob"),jr=ue("FileList"),qr=e=>tt(e)&&se(e.pipe);function Nr(){return typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}}const Cn=Nr(),xn=typeof Cn.FormData<"u"?Cn.FormData:void 0,Ur=e=>{let t;return e&&(xn&&e instanceof xn||se(e.append)&&((t=At(e))==="formdata"||t==="object"&&se(e.toString)&&e.toString()==="[object FormData]"))},Hr=ue("URLSearchParams"),[Fr,Gr,Vr,Jr]=["ReadableStream","Request","Response","Headers"].map(ue),Kr=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function nt(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let a,r;if(typeof e!="object"&&(e=[e]),je(e))for(a=0,r=e.length;a<r;a++)t.call(null,e[a],a,e);else{if(et(e))return;const o=n?Object.getOwnPropertyNames(e):Object.keys(e),s=o.length;let i;for(a=0;a<s;a++)i=o[a],t.call(null,e[i],i,e)}}function Da(e,t){if(et(e))return null;t=t.toLowerCase();const n=Object.keys(e);let a=n.length,r;for(;a-- >0;)if(r=n[a],t===r.toLowerCase())return r;return null}const ke=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,Oa=e=>!Pe(e)&&e!==ke;function zt(){const{caseless:e,skipUndefined:t}=Oa(this)&&this||{},n={},a=(r,o)=>{if(o==="__proto__"||o==="constructor"||o==="prototype")return;const s=e&&Da(n,o)||o;mt(n[s])&&mt(r)?n[s]=zt(n[s],r):mt(r)?n[s]=zt({},r):je(r)?n[s]=r.slice():(!t||!Pe(r))&&(n[s]=r)};for(let r=0,o=arguments.length;r<o;r++)arguments[r]&&nt(arguments[r],a);return n}const zr=(e,t,n,{allOwnKeys:a}={})=>(nt(t,(r,o)=>{n&&se(r)?Object.defineProperty(e,o,{value:La(r,n),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(e,o,{value:r,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:a}),e),Wr=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),Xr=(e,t,n,a)=>{e.prototype=Object.create(t.prototype,a),Object.defineProperty(e.prototype,"constructor",{value:e,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},Zr=(e,t,n,a)=>{let r,o,s;const i={};if(t=t||{},e==null)return t;do{for(r=Object.getOwnPropertyNames(e),o=r.length;o-- >0;)s=r[o],(!a||a(s,e,t))&&!i[s]&&(t[s]=e[s],i[s]=!0);e=n!==!1&&rn(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},Qr=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const a=e.indexOf(t,n);return a!==-1&&a===n},Yr=e=>{if(!e)return null;if(je(e))return e;let t=e.length;if(!Pa(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},eo=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&rn(Uint8Array)),to=(e,t)=>{const a=(e&&e[Tt]).call(e);let r;for(;(r=a.next())&&!r.done;){const o=r.value;t.call(e,o[0],o[1])}},no=(e,t)=>{let n;const a=[];for(;(n=e.exec(t))!==null;)a.push(n);return a},ao=ue("HTMLFormElement"),ro=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,a,r){return a.toUpperCase()+r}),Tn=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),oo=ue("RegExp"),ja=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),a={};nt(n,(r,o)=>{let s;(s=t(r,o,e))!==!1&&(a[o]=s||r)}),Object.defineProperties(e,a)},so=e=>{ja(e,(t,n)=>{if(se(e)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const a=e[n];if(se(a)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},io=(e,t)=>{const n={},a=r=>{r.forEach(o=>{n[o]=!0})};return je(e)?a(e):a(String(e).split(t)),n},lo=()=>{},co=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function uo(e){return!!(e&&se(e.append)&&e[Ma]==="FormData"&&e[Tt])}const mo=e=>{const t=new Array(10),n=(a,r)=>{if(tt(a)){if(t.indexOf(a)>=0)return;if(et(a))return a;if(!("toJSON"in a)){t[r]=a;const o=je(a)?[]:{};return nt(a,(s,i)=>{const u=n(s,r+1);!Pe(u)&&(o[i]=u)}),t[r]=void 0,o}}return a};return n(e,0)},po=ue("AsyncFunction"),go=e=>e&&(tt(e)||se(e))&&se(e.then)&&se(e.catch),qa=((e,t)=>e?setImmediate:t?((n,a)=>(ke.addEventListener("message",({source:r,data:o})=>{r===ke&&o===n&&a.length&&a.shift()()},!1),r=>{a.push(r),ke.postMessage(n,"*")}))(`axios@${Math.random()}`,[]):n=>setTimeout(n))(typeof setImmediate=="function",se(ke.postMessage)),fo=typeof queueMicrotask<"u"?queueMicrotask.bind(ke):typeof process<"u"&&process.nextTick||qa,bo=e=>e!=null&&se(e[Tt]),m={isArray:je,isArrayBuffer:Ra,isBuffer:et,isFormData:Ur,isArrayBufferView:xr,isString:Tr,isNumber:Pa,isBoolean:Ar,isObject:tt,isPlainObject:mt,isEmptyObject:Lr,isReadableStream:Fr,isRequest:Gr,isResponse:Vr,isHeaders:Jr,isUndefined:Pe,isDate:Mr,isFile:Rr,isReactNativeBlob:Pr,isReactNative:Dr,isBlob:Or,isRegExp:oo,isFunction:se,isStream:qr,isURLSearchParams:Hr,isTypedArray:eo,isFileList:jr,forEach:nt,merge:zt,extend:zr,trim:Kr,stripBOM:Wr,inherits:Xr,toFlatObject:Zr,kindOf:At,kindOfTest:ue,endsWith:Qr,toArray:Yr,forEachEntry:to,matchAll:no,isHTMLForm:ao,hasOwnProperty:Tn,hasOwnProp:Tn,reduceDescriptors:ja,freezeMethods:so,toObjectSet:io,toCamelCase:ro,noop:lo,toFiniteNumber:co,findKey:Da,global:ke,isContextDefined:Oa,isSpecCompliantForm:uo,toJSONObject:mo,isAsyncFn:po,isThenable:go,setImmediate:qa,asap:fo,isIterable:bo};let S=class Na extends Error{static from(t,n,a,r,o,s){const i=new Na(t.message,n||t.code,a,r,o);return i.cause=t,i.name=t.name,t.status!=null&&i.status==null&&(i.status=t.status),s&&Object.assign(i,s),i}constructor(t,n,a,r,o){super(t),Object.defineProperty(this,"message",{value:t,enumerable:!0,writable:!0,configurable:!0}),this.name="AxiosError",this.isAxiosError=!0,n&&(this.code=n),a&&(this.config=a),r&&(this.request=r),o&&(this.response=o,this.status=o.status)}toJSON(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:m.toJSONObject(this.config),code:this.code,status:this.status}}};S.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";S.ERR_BAD_OPTION="ERR_BAD_OPTION";S.ECONNABORTED="ECONNABORTED";S.ETIMEDOUT="ETIMEDOUT";S.ERR_NETWORK="ERR_NETWORK";S.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";S.ERR_DEPRECATED="ERR_DEPRECATED";S.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";S.ERR_BAD_REQUEST="ERR_BAD_REQUEST";S.ERR_CANCELED="ERR_CANCELED";S.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";S.ERR_INVALID_URL="ERR_INVALID_URL";const ko=null;function Wt(e){return m.isPlainObject(e)||m.isArray(e)}function Ua(e){return m.endsWith(e,"[]")?e.slice(0,-2):e}function jt(e,t,n){return e?e.concat(t).map(function(r,o){return r=Ua(r),!n&&o?"["+r+"]":r}).join(n?".":""):t}function ho(e){return m.isArray(e)&&!e.some(Wt)}const yo=m.toFlatObject(m,{},null,function(t){return/^is[A-Z]/.test(t)});function Mt(e,t,n){if(!m.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=m.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(y,f){return!m.isUndefined(f[y])});const a=n.metaTokens,r=n.visitor||l,o=n.dots,s=n.indexes,u=(n.Blob||typeof Blob<"u"&&Blob)&&m.isSpecCompliantForm(t);if(!m.isFunction(r))throw new TypeError("visitor must be a function");function d(b){if(b===null)return"";if(m.isDate(b))return b.toISOString();if(m.isBoolean(b))return b.toString();if(!u&&m.isBlob(b))throw new S("Blob is not supported. Use a Buffer instead.");return m.isArrayBuffer(b)||m.isTypedArray(b)?u&&typeof Blob=="function"?new Blob([b]):Buffer.from(b):b}function l(b,y,f){let N=b;if(m.isReactNative(t)&&m.isReactNativeBlob(b))return t.append(jt(f,y,o),d(b)),!1;if(b&&!f&&typeof b=="object"){if(m.endsWith(y,"{}"))y=a?y:y.slice(0,-2),b=JSON.stringify(b);else if(m.isArray(b)&&ho(b)||(m.isFileList(b)||m.endsWith(y,"[]"))&&(N=m.toArray(b)))return y=Ua(y),N.forEach(function(v,B){!(m.isUndefined(v)||v===null)&&t.append(s===!0?jt([y],B,o):s===null?y:y+"[]",d(v))}),!1}return Wt(b)?!0:(t.append(jt(f,y,o),d(b)),!1)}const g=[],w=Object.assign(yo,{defaultVisitor:l,convertValue:d,isVisitable:Wt});function P(b,y){if(!m.isUndefined(b)){if(g.indexOf(b)!==-1)throw Error("Circular reference detected in "+y.join("."));g.push(b),m.forEach(b,function(N,h){(!(m.isUndefined(N)||N===null)&&r.call(t,N,m.isString(h)?h.trim():h,y,w))===!0&&P(N,y?y.concat(h):[h])}),g.pop()}}if(!m.isObject(e))throw new TypeError("data must be an object");return P(e),t}function An(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(a){return t[a]})}function on(e,t){this._pairs=[],e&&Mt(e,this,t)}const Ha=on.prototype;Ha.append=function(t,n){this._pairs.push([t,n])};Ha.toString=function(t){const n=t?function(a){return t.call(this,a,An)}:An;return this._pairs.map(function(r){return n(r[0])+"="+n(r[1])},"").join("&")};function vo(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function Fa(e,t,n){if(!t)return e;const a=n&&n.encode||vo,r=m.isFunction(n)?{serialize:n}:n,o=r&&r.serialize;let s;if(o?s=o(t,r):s=m.isURLSearchParams(t)?t.toString():new on(t,r).toString(a),s){const i=e.indexOf("#");i!==-1&&(e=e.slice(0,i)),e+=(e.indexOf("?")===-1?"?":"&")+s}return e}class Ln{constructor(){this.handlers=[]}use(t,n,a){return this.handlers.push({fulfilled:t,rejected:n,synchronous:a?a.synchronous:!1,runWhen:a?a.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){m.forEach(this.handlers,function(a){a!==null&&t(a)})}}const sn={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0},Eo=typeof URLSearchParams<"u"?URLSearchParams:on,wo=typeof FormData<"u"?FormData:null,Bo=typeof Blob<"u"?Blob:null,Io={isBrowser:!0,classes:{URLSearchParams:Eo,FormData:wo,Blob:Bo},protocols:["http","https","file","blob","url","data"]},dn=typeof window<"u"&&typeof document<"u",Xt=typeof navigator=="object"&&navigator||void 0,_o=dn&&(!Xt||["ReactNative","NativeScript","NS"].indexOf(Xt.product)<0),$o=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",So=dn&&window.location.href||"http://localhost",Co=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:dn,hasStandardBrowserEnv:_o,hasStandardBrowserWebWorkerEnv:$o,navigator:Xt,origin:So},Symbol.toStringTag,{value:"Module"})),ae={...Co,...Io};function xo(e,t){return Mt(e,new ae.classes.URLSearchParams,{visitor:function(n,a,r,o){return ae.isNode&&m.isBuffer(n)?(this.append(a,n.toString("base64")),!1):o.defaultVisitor.apply(this,arguments)},...t})}function To(e){return m.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function Ao(e){const t={},n=Object.keys(e);let a;const r=n.length;let o;for(a=0;a<r;a++)o=n[a],t[o]=e[o];return t}function Ga(e){function t(n,a,r,o){let s=n[o++];if(s==="__proto__")return!0;const i=Number.isFinite(+s),u=o>=n.length;return s=!s&&m.isArray(r)?r.length:s,u?(m.hasOwnProp(r,s)?r[s]=[r[s],a]:r[s]=a,!i):((!r[s]||!m.isObject(r[s]))&&(r[s]=[]),t(n,a,r[s],o)&&m.isArray(r[s])&&(r[s]=Ao(r[s])),!i)}if(m.isFormData(e)&&m.isFunction(e.entries)){const n={};return m.forEachEntry(e,(a,r)=>{t(To(a),r,n,0)}),n}return null}function Lo(e,t,n){if(m.isString(e))try{return(t||JSON.parse)(e),m.trim(e)}catch(a){if(a.name!=="SyntaxError")throw a}return(n||JSON.stringify)(e)}const at={transitional:sn,adapter:["xhr","http","fetch"],transformRequest:[function(t,n){const a=n.getContentType()||"",r=a.indexOf("application/json")>-1,o=m.isObject(t);if(o&&m.isHTMLForm(t)&&(t=new FormData(t)),m.isFormData(t))return r?JSON.stringify(Ga(t)):t;if(m.isArrayBuffer(t)||m.isBuffer(t)||m.isStream(t)||m.isFile(t)||m.isBlob(t)||m.isReadableStream(t))return t;if(m.isArrayBufferView(t))return t.buffer;if(m.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let i;if(o){if(a.indexOf("application/x-www-form-urlencoded")>-1)return xo(t,this.formSerializer).toString();if((i=m.isFileList(t))||a.indexOf("multipart/form-data")>-1){const u=this.env&&this.env.FormData;return Mt(i?{"files[]":t}:t,u&&new u,this.formSerializer)}}return o||r?(n.setContentType("application/json",!1),Lo(t)):t}],transformResponse:[function(t){const n=this.transitional||at.transitional,a=n&&n.forcedJSONParsing,r=this.responseType==="json";if(m.isResponse(t)||m.isReadableStream(t))return t;if(t&&m.isString(t)&&(a&&!this.responseType||r)){const s=!(n&&n.silentJSONParsing)&&r;try{return JSON.parse(t,this.parseReviver)}catch(i){if(s)throw i.name==="SyntaxError"?S.from(i,S.ERR_BAD_RESPONSE,this,null,this.response):i}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:ae.classes.FormData,Blob:ae.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};m.forEach(["delete","get","head","post","put","patch"],e=>{at.headers[e]={}});const Mo=m.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),Ro=e=>{const t={};let n,a,r;return e&&e.split(`
`).forEach(function(s){r=s.indexOf(":"),n=s.substring(0,r).trim().toLowerCase(),a=s.substring(r+1).trim(),!(!n||t[n]&&Mo[n])&&(n==="set-cookie"?t[n]?t[n].push(a):t[n]=[a]:t[n]=t[n]?t[n]+", "+a:a)}),t},Mn=Symbol("internals");function He(e){return e&&String(e).trim().toLowerCase()}function pt(e){return e===!1||e==null?e:m.isArray(e)?e.map(pt):String(e)}function Po(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let a;for(;a=n.exec(e);)t[a[1]]=a[2];return t}const Do=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function qt(e,t,n,a,r){if(m.isFunction(a))return a.call(this,t,n);if(r&&(t=n),!!m.isString(t)){if(m.isString(a))return t.indexOf(a)!==-1;if(m.isRegExp(a))return a.test(t)}}function Oo(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,a)=>n.toUpperCase()+a)}function jo(e,t){const n=m.toCamelCase(" "+t);["get","set","has"].forEach(a=>{Object.defineProperty(e,a+n,{value:function(r,o,s){return this[a].call(this,t,r,o,s)},configurable:!0})})}let ie=class{constructor(t){t&&this.set(t)}set(t,n,a){const r=this;function o(i,u,d){const l=He(u);if(!l)throw new Error("header name must be a non-empty string");const g=m.findKey(r,l);(!g||r[g]===void 0||d===!0||d===void 0&&r[g]!==!1)&&(r[g||u]=pt(i))}const s=(i,u)=>m.forEach(i,(d,l)=>o(d,l,u));if(m.isPlainObject(t)||t instanceof this.constructor)s(t,n);else if(m.isString(t)&&(t=t.trim())&&!Do(t))s(Ro(t),n);else if(m.isObject(t)&&m.isIterable(t)){let i={},u,d;for(const l of t){if(!m.isArray(l))throw TypeError("Object iterator must return a key-value pair");i[d=l[0]]=(u=i[d])?m.isArray(u)?[...u,l[1]]:[u,l[1]]:l[1]}s(i,n)}else t!=null&&o(n,t,a);return this}get(t,n){if(t=He(t),t){const a=m.findKey(this,t);if(a){const r=this[a];if(!n)return r;if(n===!0)return Po(r);if(m.isFunction(n))return n.call(this,r,a);if(m.isRegExp(n))return n.exec(r);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=He(t),t){const a=m.findKey(this,t);return!!(a&&this[a]!==void 0&&(!n||qt(this,this[a],a,n)))}return!1}delete(t,n){const a=this;let r=!1;function o(s){if(s=He(s),s){const i=m.findKey(a,s);i&&(!n||qt(a,a[i],i,n))&&(delete a[i],r=!0)}}return m.isArray(t)?t.forEach(o):o(t),r}clear(t){const n=Object.keys(this);let a=n.length,r=!1;for(;a--;){const o=n[a];(!t||qt(this,this[o],o,t,!0))&&(delete this[o],r=!0)}return r}normalize(t){const n=this,a={};return m.forEach(this,(r,o)=>{const s=m.findKey(a,o);if(s){n[s]=pt(r),delete n[o];return}const i=t?Oo(o):String(o).trim();i!==o&&delete n[o],n[i]=pt(r),a[i]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return m.forEach(this,(a,r)=>{a!=null&&a!==!1&&(n[r]=t&&m.isArray(a)?a.join(", "):a)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const a=new this(t);return n.forEach(r=>a.set(r)),a}static accessor(t){const a=(this[Mn]=this[Mn]={accessors:{}}).accessors,r=this.prototype;function o(s){const i=He(s);a[i]||(jo(r,s),a[i]=!0)}return m.isArray(t)?t.forEach(o):o(t),this}};ie.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);m.reduceDescriptors(ie.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(a){this[n]=a}}});m.freezeMethods(ie);function Nt(e,t){const n=this||at,a=t||n,r=ie.from(a.headers);let o=a.data;return m.forEach(e,function(i){o=i.call(n,o,r.normalize(),t?t.status:void 0)}),r.normalize(),o}function Va(e){return!!(e&&e.__CANCEL__)}let rt=class extends S{constructor(t,n,a){super(t??"canceled",S.ERR_CANCELED,n,a),this.name="CanceledError",this.__CANCEL__=!0}};function Ja(e,t,n){const a=n.config.validateStatus;!n.status||!a||a(n.status)?e(n):t(new S("Request failed with status code "+n.status,[S.ERR_BAD_REQUEST,S.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}function qo(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function No(e,t){e=e||10;const n=new Array(e),a=new Array(e);let r=0,o=0,s;return t=t!==void 0?t:1e3,function(u){const d=Date.now(),l=a[o];s||(s=d),n[r]=u,a[r]=d;let g=o,w=0;for(;g!==r;)w+=n[g++],g=g%e;if(r=(r+1)%e,r===o&&(o=(o+1)%e),d-s<t)return;const P=l&&d-l;return P?Math.round(w*1e3/P):void 0}}function Uo(e,t){let n=0,a=1e3/t,r,o;const s=(d,l=Date.now())=>{n=l,r=null,o&&(clearTimeout(o),o=null),e(...d)};return[(...d)=>{const l=Date.now(),g=l-n;g>=a?s(d,l):(r=d,o||(o=setTimeout(()=>{o=null,s(r)},a-g)))},()=>r&&s(r)]}const bt=(e,t,n=3)=>{let a=0;const r=No(50,250);return Uo(o=>{const s=o.loaded,i=o.lengthComputable?o.total:void 0,u=s-a,d=r(u),l=s<=i;a=s;const g={loaded:s,total:i,progress:i?s/i:void 0,bytes:u,rate:d||void 0,estimated:d&&i&&l?(i-s)/d:void 0,event:o,lengthComputable:i!=null,[t?"download":"upload"]:!0};e(g)},n)},Rn=(e,t)=>{const n=e!=null;return[a=>t[0]({lengthComputable:n,total:e,loaded:a}),t[1]]},Pn=e=>(...t)=>m.asap(()=>e(...t)),Ho=ae.hasStandardBrowserEnv?((e,t)=>n=>(n=new URL(n,ae.origin),e.protocol===n.protocol&&e.host===n.host&&(t||e.port===n.port)))(new URL(ae.origin),ae.navigator&&/(msie|trident)/i.test(ae.navigator.userAgent)):()=>!0,Fo=ae.hasStandardBrowserEnv?{write(e,t,n,a,r,o,s){if(typeof document>"u")return;const i=[`${e}=${encodeURIComponent(t)}`];m.isNumber(n)&&i.push(`expires=${new Date(n).toUTCString()}`),m.isString(a)&&i.push(`path=${a}`),m.isString(r)&&i.push(`domain=${r}`),o===!0&&i.push("secure"),m.isString(s)&&i.push(`SameSite=${s}`),document.cookie=i.join("; ")},read(e){if(typeof document>"u")return null;const t=document.cookie.match(new RegExp("(?:^|; )"+e+"=([^;]*)"));return t?decodeURIComponent(t[1]):null},remove(e){this.write(e,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function Go(e){return typeof e!="string"?!1:/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function Vo(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function Ka(e,t,n){let a=!Go(t);return e&&(a||n==!1)?Vo(e,t):t}const Dn=e=>e instanceof ie?{...e}:e;function ye(e,t){t=t||{};const n={};function a(d,l,g,w){return m.isPlainObject(d)&&m.isPlainObject(l)?m.merge.call({caseless:w},d,l):m.isPlainObject(l)?m.merge({},l):m.isArray(l)?l.slice():l}function r(d,l,g,w){if(m.isUndefined(l)){if(!m.isUndefined(d))return a(void 0,d,g,w)}else return a(d,l,g,w)}function o(d,l){if(!m.isUndefined(l))return a(void 0,l)}function s(d,l){if(m.isUndefined(l)){if(!m.isUndefined(d))return a(void 0,d)}else return a(void 0,l)}function i(d,l,g){if(g in t)return a(d,l);if(g in e)return a(void 0,d)}const u={url:o,method:o,data:o,baseURL:s,transformRequest:s,transformResponse:s,paramsSerializer:s,timeout:s,timeoutMessage:s,withCredentials:s,withXSRFToken:s,adapter:s,responseType:s,xsrfCookieName:s,xsrfHeaderName:s,onUploadProgress:s,onDownloadProgress:s,decompress:s,maxContentLength:s,maxBodyLength:s,beforeRedirect:s,transport:s,httpAgent:s,httpsAgent:s,cancelToken:s,socketPath:s,responseEncoding:s,validateStatus:i,headers:(d,l,g)=>r(Dn(d),Dn(l),g,!0)};return m.forEach(Object.keys({...e,...t}),function(l){if(l==="__proto__"||l==="constructor"||l==="prototype")return;const g=m.hasOwnProp(u,l)?u[l]:r,w=g(e[l],t[l],l);m.isUndefined(w)&&g!==i||(n[l]=w)}),n}const za=e=>{const t=ye({},e);let{data:n,withXSRFToken:a,xsrfHeaderName:r,xsrfCookieName:o,headers:s,auth:i}=t;if(t.headers=s=ie.from(s),t.url=Fa(Ka(t.baseURL,t.url,t.allowAbsoluteUrls),e.params,e.paramsSerializer),i&&s.set("Authorization","Basic "+btoa((i.username||"")+":"+(i.password?unescape(encodeURIComponent(i.password)):""))),m.isFormData(n)){if(ae.hasStandardBrowserEnv||ae.hasStandardBrowserWebWorkerEnv)s.setContentType(void 0);else if(m.isFunction(n.getHeaders)){const u=n.getHeaders(),d=["content-type","content-length"];Object.entries(u).forEach(([l,g])=>{d.includes(l.toLowerCase())&&s.set(l,g)})}}if(ae.hasStandardBrowserEnv&&(a&&m.isFunction(a)&&(a=a(t)),a||a!==!1&&Ho(t.url))){const u=r&&o&&Fo.read(o);u&&s.set(r,u)}return t},Jo=typeof XMLHttpRequest<"u",Ko=Jo&&function(e){return new Promise(function(n,a){const r=za(e);let o=r.data;const s=ie.from(r.headers).normalize();let{responseType:i,onUploadProgress:u,onDownloadProgress:d}=r,l,g,w,P,b;function y(){P&&P(),b&&b(),r.cancelToken&&r.cancelToken.unsubscribe(l),r.signal&&r.signal.removeEventListener("abort",l)}let f=new XMLHttpRequest;f.open(r.method.toUpperCase(),r.url,!0),f.timeout=r.timeout;function N(){if(!f)return;const v=ie.from("getAllResponseHeaders"in f&&f.getAllResponseHeaders()),D={data:!i||i==="text"||i==="json"?f.responseText:f.response,status:f.status,statusText:f.statusText,headers:v,config:e,request:f};Ja(function(H){n(H),y()},function(H){a(H),y()},D),f=null}"onloadend"in f?f.onloadend=N:f.onreadystatechange=function(){!f||f.readyState!==4||f.status===0&&!(f.responseURL&&f.responseURL.indexOf("file:")===0)||setTimeout(N)},f.onabort=function(){f&&(a(new S("Request aborted",S.ECONNABORTED,e,f)),f=null)},f.onerror=function(B){const D=B&&B.message?B.message:"Network Error",C=new S(D,S.ERR_NETWORK,e,f);C.event=B||null,a(C),f=null},f.ontimeout=function(){let B=r.timeout?"timeout of "+r.timeout+"ms exceeded":"timeout exceeded";const D=r.transitional||sn;r.timeoutErrorMessage&&(B=r.timeoutErrorMessage),a(new S(B,D.clarifyTimeoutError?S.ETIMEDOUT:S.ECONNABORTED,e,f)),f=null},o===void 0&&s.setContentType(null),"setRequestHeader"in f&&m.forEach(s.toJSON(),function(B,D){f.setRequestHeader(D,B)}),m.isUndefined(r.withCredentials)||(f.withCredentials=!!r.withCredentials),i&&i!=="json"&&(f.responseType=r.responseType),d&&([w,b]=bt(d,!0),f.addEventListener("progress",w)),u&&f.upload&&([g,P]=bt(u),f.upload.addEventListener("progress",g),f.upload.addEventListener("loadend",P)),(r.cancelToken||r.signal)&&(l=v=>{f&&(a(!v||v.type?new rt(null,e,f):v),f.abort(),f=null)},r.cancelToken&&r.cancelToken.subscribe(l),r.signal&&(r.signal.aborted?l():r.signal.addEventListener("abort",l)));const h=qo(r.url);if(h&&ae.protocols.indexOf(h)===-1){a(new S("Unsupported protocol "+h+":",S.ERR_BAD_REQUEST,e));return}f.send(o||null)})},zo=(e,t)=>{const{length:n}=e=e?e.filter(Boolean):[];if(t||n){let a=new AbortController,r;const o=function(d){if(!r){r=!0,i();const l=d instanceof Error?d:this.reason;a.abort(l instanceof S?l:new rt(l instanceof Error?l.message:l))}};let s=t&&setTimeout(()=>{s=null,o(new S(`timeout of ${t}ms exceeded`,S.ETIMEDOUT))},t);const i=()=>{e&&(s&&clearTimeout(s),s=null,e.forEach(d=>{d.unsubscribe?d.unsubscribe(o):d.removeEventListener("abort",o)}),e=null)};e.forEach(d=>d.addEventListener("abort",o));const{signal:u}=a;return u.unsubscribe=()=>m.asap(i),u}},Wo=function*(e,t){let n=e.byteLength;if(n<t){yield e;return}let a=0,r;for(;a<n;)r=a+t,yield e.slice(a,r),a=r},Xo=async function*(e,t){for await(const n of Zo(e))yield*Wo(n,t)},Zo=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:n,value:a}=await t.read();if(n)break;yield a}}finally{await t.cancel()}},On=(e,t,n,a)=>{const r=Xo(e,t);let o=0,s,i=u=>{s||(s=!0,a&&a(u))};return new ReadableStream({async pull(u){try{const{done:d,value:l}=await r.next();if(d){i(),u.close();return}let g=l.byteLength;if(n){let w=o+=g;n(w)}u.enqueue(new Uint8Array(l))}catch(d){throw i(d),d}},cancel(u){return i(u),r.return()}},{highWaterMark:2})},jn=64*1024,{isFunction:it}=m,Qo=(({Request:e,Response:t})=>({Request:e,Response:t}))(m.global),{ReadableStream:qn,TextEncoder:Nn}=m.global,Un=(e,...t)=>{try{return!!e(...t)}catch{return!1}},Yo=e=>{e=m.merge.call({skipUndefined:!0},Qo,e);const{fetch:t,Request:n,Response:a}=e,r=t?it(t):typeof fetch=="function",o=it(n),s=it(a);if(!r)return!1;const i=r&&it(qn),u=r&&(typeof Nn=="function"?(b=>y=>b.encode(y))(new Nn):async b=>new Uint8Array(await new n(b).arrayBuffer())),d=o&&i&&Un(()=>{let b=!1;const y=new n(ae.origin,{body:new qn,method:"POST",get duplex(){return b=!0,"half"}}).headers.has("Content-Type");return b&&!y}),l=s&&i&&Un(()=>m.isReadableStream(new a("").body)),g={stream:l&&(b=>b.body)};r&&["text","arrayBuffer","blob","formData","stream"].forEach(b=>{!g[b]&&(g[b]=(y,f)=>{let N=y&&y[b];if(N)return N.call(y);throw new S(`Response type '${b}' is not supported`,S.ERR_NOT_SUPPORT,f)})});const w=async b=>{if(b==null)return 0;if(m.isBlob(b))return b.size;if(m.isSpecCompliantForm(b))return(await new n(ae.origin,{method:"POST",body:b}).arrayBuffer()).byteLength;if(m.isArrayBufferView(b)||m.isArrayBuffer(b))return b.byteLength;if(m.isURLSearchParams(b)&&(b=b+""),m.isString(b))return(await u(b)).byteLength},P=async(b,y)=>{const f=m.toFiniteNumber(b.getContentLength());return f??w(y)};return async b=>{let{url:y,method:f,data:N,signal:h,cancelToken:v,timeout:B,onDownloadProgress:D,onUploadProgress:C,responseType:H,headers:V,withCredentials:z="same-origin",fetchOptions:W}=za(b),R=t||fetch;H=H?(H+"").toLowerCase():"text";let I=zo([h,v&&v.toAbortSignal()],B),L=null;const F=I&&I.unsubscribe&&(()=>{I.unsubscribe()});let ne;try{if(C&&d&&f!=="get"&&f!=="head"&&(ne=await P(V,N))!==0){let le=new n(y,{method:"POST",body:N,duplex:"half"}),Ie;if(m.isFormData(N)&&(Ie=le.headers.get("content-type"))&&V.setContentType(Ie),le.body){const[Ot,st]=Rn(ne,bt(Pn(C)));N=On(le.body,jn,Ot,st)}}m.isString(z)||(z=z?"include":"omit");const X=o&&"credentials"in n.prototype,Z={...W,signal:I,method:f.toUpperCase(),headers:V.normalize().toJSON(),body:N,duplex:"half",credentials:X?z:void 0};L=o&&new n(y,Z);let Y=await(o?R(L,W):R(y,Z));const ee=l&&(H==="stream"||H==="response");if(l&&(D||ee&&F)){const le={};["status","statusText","headers"].forEach(Sn=>{le[Sn]=Y[Sn]});const Ie=m.toFiniteNumber(Y.headers.get("content-length")),[Ot,st]=D&&Rn(Ie,bt(Pn(D),!0))||[];Y=new a(On(Y.body,jn,Ot,()=>{st&&st(),F&&F()}),le)}H=H||"text";let Ue=await g[m.findKey(g,H)||"text"](Y,b);return!ee&&F&&F(),await new Promise((le,Ie)=>{Ja(le,Ie,{data:Ue,headers:ie.from(Y.headers),status:Y.status,statusText:Y.statusText,config:b,request:L})})}catch(X){throw F&&F(),X&&X.name==="TypeError"&&/Load failed|fetch/i.test(X.message)?Object.assign(new S("Network Error",S.ERR_NETWORK,b,L,X&&X.response),{cause:X.cause||X}):S.from(X,X&&X.code,b,L,X&&X.response)}}},es=new Map,Wa=e=>{let t=e&&e.env||{};const{fetch:n,Request:a,Response:r}=t,o=[a,r,n];let s=o.length,i=s,u,d,l=es;for(;i--;)u=o[i],d=l.get(u),d===void 0&&l.set(u,d=i?new Map:Yo(t)),l=d;return d};Wa();const ln={http:ko,xhr:Ko,fetch:{get:Wa}};m.forEach(ln,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const Hn=e=>`- ${e}`,ts=e=>m.isFunction(e)||e===null||e===!1;function ns(e,t){e=m.isArray(e)?e:[e];const{length:n}=e;let a,r;const o={};for(let s=0;s<n;s++){a=e[s];let i;if(r=a,!ts(a)&&(r=ln[(i=String(a)).toLowerCase()],r===void 0))throw new S(`Unknown adapter '${i}'`);if(r&&(m.isFunction(r)||(r=r.get(t))))break;o[i||"#"+s]=r}if(!r){const s=Object.entries(o).map(([u,d])=>`adapter ${u} `+(d===!1?"is not supported by the environment":"is not available in the build"));let i=n?s.length>1?`since :
`+s.map(Hn).join(`
`):" "+Hn(s[0]):"as no adapter specified";throw new S("There is no suitable adapter to dispatch the request "+i,"ERR_NOT_SUPPORT")}return r}const Xa={getAdapter:ns,adapters:ln};function Ut(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new rt(null,e)}function Fn(e){return Ut(e),e.headers=ie.from(e.headers),e.data=Nt.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),Xa.getAdapter(e.adapter||at.adapter,e)(e).then(function(a){return Ut(e),a.data=Nt.call(e,e.transformResponse,a),a.headers=ie.from(a.headers),a},function(a){return Va(a)||(Ut(e),a&&a.response&&(a.response.data=Nt.call(e,e.transformResponse,a.response),a.response.headers=ie.from(a.response.headers))),Promise.reject(a)})}const Za="1.13.6",Rt={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{Rt[e]=function(a){return typeof a===e||"a"+(t<1?"n ":" ")+e}});const Gn={};Rt.transitional=function(t,n,a){function r(o,s){return"[Axios v"+Za+"] Transitional option '"+o+"'"+s+(a?". "+a:"")}return(o,s,i)=>{if(t===!1)throw new S(r(s," has been removed"+(n?" in "+n:"")),S.ERR_DEPRECATED);return n&&!Gn[s]&&(Gn[s]=!0,console.warn(r(s," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(o,s,i):!0}};Rt.spelling=function(t){return(n,a)=>(console.warn(`${a} is likely a misspelling of ${t}`),!0)};function as(e,t,n){if(typeof e!="object")throw new S("options must be an object",S.ERR_BAD_OPTION_VALUE);const a=Object.keys(e);let r=a.length;for(;r-- >0;){const o=a[r],s=t[o];if(s){const i=e[o],u=i===void 0||s(i,o,e);if(u!==!0)throw new S("option "+o+" must be "+u,S.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new S("Unknown option "+o,S.ERR_BAD_OPTION)}}const gt={assertOptions:as,validators:Rt},de=gt.validators;let he=class{constructor(t){this.defaults=t||{},this.interceptors={request:new Ln,response:new Ln}}async request(t,n){try{return await this._request(t,n)}catch(a){if(a instanceof Error){let r={};Error.captureStackTrace?Error.captureStackTrace(r):r=new Error;const o=r.stack?r.stack.replace(/^.+\n/,""):"";try{a.stack?o&&!String(a.stack).endsWith(o.replace(/^.+\n.+\n/,""))&&(a.stack+=`
`+o):a.stack=o}catch{}}throw a}}_request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=ye(this.defaults,n);const{transitional:a,paramsSerializer:r,headers:o}=n;a!==void 0&&gt.assertOptions(a,{silentJSONParsing:de.transitional(de.boolean),forcedJSONParsing:de.transitional(de.boolean),clarifyTimeoutError:de.transitional(de.boolean),legacyInterceptorReqResOrdering:de.transitional(de.boolean)},!1),r!=null&&(m.isFunction(r)?n.paramsSerializer={serialize:r}:gt.assertOptions(r,{encode:de.function,serialize:de.function},!0)),n.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?n.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:n.allowAbsoluteUrls=!0),gt.assertOptions(n,{baseUrl:de.spelling("baseURL"),withXsrfToken:de.spelling("withXSRFToken")},!0),n.method=(n.method||this.defaults.method||"get").toLowerCase();let s=o&&m.merge(o.common,o[n.method]);o&&m.forEach(["delete","get","head","post","put","patch","common"],b=>{delete o[b]}),n.headers=ie.concat(s,o);const i=[];let u=!0;this.interceptors.request.forEach(function(y){if(typeof y.runWhen=="function"&&y.runWhen(n)===!1)return;u=u&&y.synchronous;const f=n.transitional||sn;f&&f.legacyInterceptorReqResOrdering?i.unshift(y.fulfilled,y.rejected):i.push(y.fulfilled,y.rejected)});const d=[];this.interceptors.response.forEach(function(y){d.push(y.fulfilled,y.rejected)});let l,g=0,w;if(!u){const b=[Fn.bind(this),void 0];for(b.unshift(...i),b.push(...d),w=b.length,l=Promise.resolve(n);g<w;)l=l.then(b[g++],b[g++]);return l}w=i.length;let P=n;for(;g<w;){const b=i[g++],y=i[g++];try{P=b(P)}catch(f){y.call(this,f);break}}try{l=Fn.call(this,P)}catch(b){return Promise.reject(b)}for(g=0,w=d.length;g<w;)l=l.then(d[g++],d[g++]);return l}getUri(t){t=ye(this.defaults,t);const n=Ka(t.baseURL,t.url,t.allowAbsoluteUrls);return Fa(n,t.params,t.paramsSerializer)}};m.forEach(["delete","get","head","options"],function(t){he.prototype[t]=function(n,a){return this.request(ye(a||{},{method:t,url:n,data:(a||{}).data}))}});m.forEach(["post","put","patch"],function(t){function n(a){return function(o,s,i){return this.request(ye(i||{},{method:t,headers:a?{"Content-Type":"multipart/form-data"}:{},url:o,data:s}))}}he.prototype[t]=n(),he.prototype[t+"Form"]=n(!0)});let rs=class Qa{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(o){n=o});const a=this;this.promise.then(r=>{if(!a._listeners)return;let o=a._listeners.length;for(;o-- >0;)a._listeners[o](r);a._listeners=null}),this.promise.then=r=>{let o;const s=new Promise(i=>{a.subscribe(i),o=i}).then(r);return s.cancel=function(){a.unsubscribe(o)},s},t(function(o,s,i){a.reason||(a.reason=new rt(o,s,i),n(a.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}toAbortSignal(){const t=new AbortController,n=a=>{t.abort(a)};return this.subscribe(n),t.signal.unsubscribe=()=>this.unsubscribe(n),t.signal}static source(){let t;return{token:new Qa(function(r){t=r}),cancel:t}}};function os(e){return function(n){return e.apply(null,n)}}function ss(e){return m.isObject(e)&&e.isAxiosError===!0}const Zt={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(Zt).forEach(([e,t])=>{Zt[t]=e});function Ya(e){const t=new he(e),n=La(he.prototype.request,t);return m.extend(n,he.prototype,t,{allOwnKeys:!0}),m.extend(n,t,null,{allOwnKeys:!0}),n.create=function(r){return Ya(ye(e,r))},n}const te=Ya(at);te.Axios=he;te.CanceledError=rt;te.CancelToken=rs;te.isCancel=Va;te.VERSION=Za;te.toFormData=Mt;te.AxiosError=S;te.Cancel=te.CanceledError;te.all=function(t){return Promise.all(t)};te.spread=os;te.isAxiosError=ss;te.mergeConfig=ye;te.AxiosHeaders=ie;te.formToJSON=e=>Ga(m.isHTMLForm(e)?new FormData(e):e);te.getAdapter=Xa.getAdapter;te.HttpStatusCode=Zt;te.default=te;const{Axios:Ml,AxiosError:Rl,CanceledError:Pl,isCancel:Dl,CancelToken:Ol,VERSION:jl,all:ql,Cancel:Nl,isAxiosError:Ul,spread:Hl,toFormData:Fl,AxiosHeaders:Gl,HttpStatusCode:Vl,formToJSON:Jl,getAdapter:Kl,mergeConfig:zl}=te;window.axios=te;window.axios.defaults.headers.common["X-Requested-With"]="XMLHttpRequest";const cn="transit_user",pe="transit_token",Qt="transit_pending_toast";function qe(){try{return typeof window<"u"&&typeof window.localStorage<"u"}catch{return!1}}function er(){try{return typeof window<"u"&&typeof window.sessionStorage<"u"}catch{return!1}}function is(){if(window.transitAuthUser)return window.transitAuthUser;if(!qe())return null;const e=window.localStorage.getItem(cn);if(!e)return null;try{return JSON.parse(e)}catch{return ze(),null}}function tr(e){if(!qe()){window.transitAuthUser=e;return}window.transitAuthUser=e,window.localStorage.setItem(cn,JSON.stringify(e))}function ds(){if(!qe()){window.transitAuthUser=null;return}window.transitAuthUser=null,window.localStorage.removeItem(cn)}function un(){return typeof window<"u"&&typeof window.transitAuthToken=="string"&&window.transitAuthToken!==""?window.transitAuthToken:qe()?window.localStorage.getItem(pe):null}function ls(e){const t=typeof e=="string"?e:"";if(!qe()){window.transitAuthToken=t||null;return}if(window.transitAuthToken=t||null,t===""){window.localStorage.removeItem(pe),document.cookie=pe+"=; path=/; max-age=0; samesite=lax";return}window.localStorage.setItem(pe,t),document.cookie=pe+"="+t+"; path=/; max-age=86400; samesite=lax"}function cs(){if(!qe()){window.transitAuthToken=null,document.cookie=pe+"=; path=/; max-age=0; samesite=lax";return}window.transitAuthToken=null,window.localStorage.removeItem(pe),document.cookie=pe+"=; path=/; max-age=0; samesite=lax"}function us(e){er()&&window.sessionStorage.setItem(Qt,JSON.stringify(e))}function ms(){if(!er())return null;const e=window.sessionStorage.getItem(Qt);if(!e)return null;window.sessionStorage.removeItem(Qt);try{return JSON.parse(e)}catch{return null}}function ze(){ds(),cs()}function nr(e,t){if(!e)return t;if(typeof e.detail=="string"&&e.detail!=="")return e.detail;if(typeof e.message=="string"&&e.message!=="")return e.message;if(e.errors&&typeof e.errors=="object"){const n=Object.values(e.errors).flat()[0];if(typeof n=="string"&&n!=="")return n}return t}function Vn(){return document.body.dataset.apiBase||"/api"}function ar(e=""){const t=String(e).replace(/^\/+/,"");return t===""?Vn():`${Vn()}/${t}`}async function E(e,t={}){const{method:n="GET",body:a=null,headers:r={},auth:o=!0}=t,s=new Headers(r);s.set("Accept","application/json"),s.set("X-Requested-With","XMLHttpRequest");let i=a;if(a&&!(a instanceof FormData)&&!(a instanceof Blob)&&(s.set("Content-Type","application/json"),i=JSON.stringify(a)),o){const g=un();g&&s.set("Authorization",`Bearer ${g}`)}if(!["GET","HEAD","OPTIONS"].includes(n.toUpperCase())){const g=document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");g&&s.set("X-CSRF-TOKEN",g)}const u=await fetch(ar(e),{method:n,headers:s,body:i,credentials:"same-origin"});let d=null;const l=u.headers.get("content-type")||"";if(u.status!==204&&(d=l.includes("application/json")?await u.json():await u.text()),!u.ok){u.status===401&&(ze(),(document.body.dataset.routeGuard||"none")==="protected"&&window.location.replace(document.body.dataset.loginUrl||"/login"));const g=nr(d,`Request gagal (${u.status})`),w=new Error(g);throw w.status=u.status,w.data=d,w}return d}async function mn(e,t="export.csv"){const n=new Headers({Accept:"text/csv,application/octet-stream","X-Requested-With":"XMLHttpRequest"}),a=un();a&&n.set("Authorization",`Bearer ${a}`);const r=await fetch(ar(e),{method:"GET",headers:n,credentials:"same-origin"});if(!r.ok){let g=null;throw(r.headers.get("content-type")||"").includes("application/json")&&(g=await r.json()),new Error(nr(g,"Gagal mengunduh file"))}const o=await r.blob(),u=(r.headers.get("content-disposition")||"").match(/filename="?([^"]+)"?/i)?.[1]||t,d=window.URL.createObjectURL(o),l=document.createElement("a");l.href=d,l.download=u,document.body.appendChild(l),l.click(),l.remove(),window.URL.revokeObjectURL(d)}function Fe(e,t){const n=document.getElementById(e);n&&(n.textContent=t)}function ps(e){const t=e?.role||"";document.querySelectorAll("[data-role-scope]").forEach(n=>{const a=n.dataset.roleScope,r=a==="admin"?["Super Admin","Admin"].includes(t):a==="super"?t==="Super Admin":!0;n.hidden=!r})}function rr(){return is()}function kt(e){if(ps(e),!e)return;const t=e.nama||"Admin",n=t.trim().split(/\s+/)[0]||"Admin",a=e.email||"admin@pekanbaru.com";Fe("sidebar-user-name",t),Fe("sidebar-user-email",a),Fe("header-user-name",n),Fe("dropdown-user-name",t),Fe("dropdown-user-email",a)}function or(e){return typeof e.access_token=="string"&&e.access_token!==""&&ls(e.access_token),tr(e.user),kt(e.user),e}async function gs(e){const t=await E("/auth/login",{method:"POST",body:e,auth:!1});return or(t)}async function fs(e){const t=await E("/auth/register",{method:"POST",body:e,auth:!1});return or(t)}async function Jn(){const e=await E("/auth/me");return tr(e),kt(e),e}async function bs(){try{await E("/auth/logout",{method:"POST"})}catch(e){if(e?.status!==401)throw e}ze(),us({type:"success",title:"Logout berhasil",message:"Sampai jumpa kembali!"}),window.location.replace(document.body.dataset.loginUrl||"/login")}function Kn(e){window.location.replace(e)}async function ks(){const e=document.body.dataset.routeGuard||"none",t=document.body.dataset.loginUrl||"/login",n=document.body.dataset.dashboardUrl||"/dashboard",a=rr();if(e==="public"){try{const r=await Jn();return Kn(n),{user:r}}catch{(a||un())&&ze()}return{user:null}}if(e==="protected")try{return{user:await Jn()}}catch{return ze(),Kn(t),{user:null}}return{user:a}}function pn(){return Array.from(document.querySelectorAll(".modal-shell")).filter(e=>!e.hidden)}function sr(){document.body.style.overflow=pn().length>0?"hidden":""}function q(e){const t=document.getElementById(e);t&&(t.hidden=!1,sr())}function G(e=null){if(e){const t=document.getElementById(e);t&&(t.hidden=!0)}else pn().forEach(t=>{t.hidden=!0});sr()}function hs(){document.addEventListener("click",e=>{const t=e.target.closest("[data-modal-open]");if(t){q(t.dataset.modalOpen);return}const n=e.target.closest("[data-modal-close]");if(n){const a=n.dataset.modalClose||n.closest(".modal-shell")?.id;G(a||void 0)}}),document.addEventListener("keydown",e=>{if(e.key!=="Escape")return;const t=pn().pop();t&&G(t.id)})}function gn(e,t,n){const a=document.getElementById("transit-toast-root");if(!a)return;const r=document.createElement("div");r.className=`transit-toast ${n==="error"?"is-error":""} ${n==="info"?"is-info":""}`.trim(),r.innerHTML=`
        <div>
            <strong>${e}</strong>
            <p>${t}</p>
        </div>
    `,a.appendChild(r),window.requestAnimationFrame(()=>{r.classList.add("is-visible")}),window.setTimeout(()=>{r.classList.remove("is-visible"),window.setTimeout(()=>r.remove(),180)},3600)}function j(e,t="Berhasil"){gn(t,e,"success")}function k(e,t="Gagal"){gn(t,e,"error")}function dt(e){return e?.status===409&&e?.data?.error==="booking_version_conflict"?(k("Booking diubah oleh admin lain. Halaman akan refresh otomatis dalam 3 detik...","Perubahan Terdeteksi"),setTimeout(function(){window.location.reload()},3e3),!0):!1}function fn(e,t="Info"){gn(t,e,"info")}function Ge(e){const t=document.querySelector("[data-sidebar]"),n=document.querySelector("[data-sidebar-overlay]");!t||!n||(t.classList.toggle("is-open",e),n.hidden=!e)}function ft(e=null){document.querySelectorAll("[data-user-dropdown]").forEach(t=>{if(e&&t===e)return;t.classList.remove("is-open");const n=t.querySelector("[data-user-menu-trigger]"),a=t.querySelector("[data-user-menu-panel]");n&&n.setAttribute("aria-expanded","false"),a&&(a.hidden=!0)})}function ys(e,t=null){if(!e)return;const n=e.querySelector("[data-user-menu-trigger]"),a=e.querySelector("[data-user-menu-panel]"),r=t??!e.classList.contains("is-open");ft(r?e:null),e.classList.toggle("is-open",r),n&&n.setAttribute("aria-expanded",r?"true":"false"),a&&(a.hidden=!r)}function vs(){document.querySelector("[data-sidebar-open]")?.addEventListener("click",()=>{Ge(!0)}),document.querySelector("[data-sidebar-close]")?.addEventListener("click",()=>{Ge(!1)}),document.querySelector("[data-sidebar-overlay]")?.addEventListener("click",()=>{Ge(!1)}),document.querySelectorAll("[data-user-dropdown]").forEach(e=>{e.querySelector("[data-user-menu-trigger]")?.addEventListener("click",t=>{t.stopPropagation(),ys(e)})}),document.addEventListener("click",e=>{e.target.closest("[data-user-dropdown]")||ft()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&(ft(),Ge(!1))}),window.addEventListener("resize",()=>{window.innerWidth>1100&&Ge(!1)}),document.querySelectorAll("[data-auth-logout]").forEach(e=>{e.addEventListener("click",async()=>{G(),ft();try{e.disabled=!0,await bs()}catch(t){e.disabled=!1,k(t.message||"Gagal logout")}})})}const ir={login:{title:"Selamat Datang!",description:"Masuk ke akun Anda untuk melanjutkan",submit:"Masuk",switchText:"Belum punya akun?",switchAction:"Daftar sekarang"},register:{title:"Buat Akun Baru",description:"Daftar untuk mulai menggunakan sistem",submit:"Daftar",switchText:"Sudah punya akun?",switchAction:"Masuk"}};function zn(e,t){const n=ir[e];t.form.dataset.authMode=e,t.title.textContent=n.title,t.description.textContent=n.description,t.submitText.textContent=n.submit,t.switchText&&(t.switchText.textContent=n.switchText),t.switchButton&&(t.switchButton.textContent=n.switchAction),t.nameField.hidden=e!=="register",t.nameInput.required=e==="register"}function Es(){const e=document.getElementById("auth-form");if(!e)return;const t={form:e,title:document.querySelector("[data-auth-title]"),description:document.querySelector("[data-auth-description]"),submitText:document.querySelector("[data-auth-submit-text]"),switchText:document.querySelector("[data-auth-switch-text]"),switchButton:document.querySelector("[data-toggle-auth-mode]"),nameField:document.getElementById("auth-name-field"),nameInput:document.getElementById("nama"),emailInput:document.getElementById("email"),passwordInput:document.getElementById("password"),passwordToggle:document.querySelector("[data-toggle-password]"),submitButton:document.getElementById("auth-submit-button")},n=document.body.dataset.dashboardUrl||"/dashboard";zn("login",t),t.switchButton?.addEventListener("click",()=>{const a=t.form.dataset.authMode==="login"?"register":"login";zn(a,t)}),t.passwordToggle?.addEventListener("click",()=>{const a=t.passwordInput.type==="password"?"text":"password";t.passwordInput.type=a,t.passwordToggle.textContent=a==="password"?"Lihat":"Sembunyikan"}),e.addEventListener("submit",async a=>{a.preventDefault();const r=new FormData(e),o=e.dataset.authMode||"login",s={email:String(r.get("email")||"").trim(),password:String(r.get("password")||"").trim()};o==="register"&&(s.nama=String(r.get("nama")||"").trim()),t.submitButton.disabled=!0,t.submitText.textContent=o==="login"?"Memproses...":"Mendaftarkan...";try{o==="login"?(await gs(s),j("Selamat datang kembali","Login berhasil!")):(await fs(s),j("Akun Anda telah dibuat","Registrasi berhasil!")),window.location.replace(n)}catch(i){k(i.message||"Terjadi kesalahan",o==="login"?"Login gagal":"Registrasi gagal")}finally{t.submitButton.disabled=!1,t.submitText.textContent=ir[o].submit}})}const ws=new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}),Bs=new Intl.NumberFormat("id-ID");function K(e){return ws.format(Number(e)||0)}function U(e){return Bs.format(Number(e)||0)}function c(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function we(e,t=300){let n=null;return(...a)=>{window.clearTimeout(n),n=window.setTimeout(()=>e(...a),t)}}function Be(e,t,n,a){if(n===0||a===0)return"Menampilkan 0 - 0 dari 0 data";const r=(e-1)*t+1,o=r+a-1;return`Menampilkan ${r} - ${o} dari ${n} data`}function Is(e){if(!e)return"-";const t=new Date(e);return Number.isNaN(t.getTime())?e:new Intl.DateTimeFormat("id-ID",{day:"2-digit",month:"short",year:"numeric"}).format(t)}function ot(){return new Date().toISOString().slice(0,10)}function Q(e,t,n="Memproses..."){e&&(e.dataset.defaultText||(e.dataset.defaultText=e.textContent.trim()),e.disabled=t,e.textContent=t?n:e.dataset.defaultText)}const ht=["#059669","#10B981","#34D399","#6EE7B7","#A7F3D0"],me={revenueChart:null,passengerChart:null,mobilChart:null};function _s(){const e=document.getElementById("dashboard-initial-state");if(!e)return{stats:{},revenueData:[],mobilRevenue:[]};try{return JSON.parse(e.textContent||"{}")}catch{return{stats:{},revenueData:[],mobilRevenue:[]}}}function bn(e){e&&typeof e.destroy=="function"&&e.destroy()}function $s(e,t){const n=document.querySelector(`[data-stat="${e}"]`);if(!n)return;const a=["total_uang_bersih","total_uang_pc"];n.textContent=a.includes(e)?K(t):U(t)}function dr(e,t,n){const a=document.getElementById(e),r=document.getElementById(t);a&&(a.hidden=!n),r&&(r.hidden=n)}function Ss(){return"#065f46"}function Yt(){return"#d1fae5"}function kn(){return{backgroundColor:"#ffffff",titleColor:"#064e3b",bodyColor:"#065f46",borderColor:"#d1fae5",borderWidth:1,padding:12,cornerRadius:12,displayColors:!0}}function Cs(e){const t=document.getElementById("dashboard-revenue-chart"),n=Array.isArray(e)&&e.length>0;if(dr("dashboard-revenue-chart","dashboard-revenue-empty",n),bn(me.revenueChart),!t||!window.Chart||!n){me.revenueChart=null;return}me.revenueChart=new window.Chart(t,{type:"line",data:{labels:e.map(a=>a.bulan),datasets:[{label:"Pendapatan Bersih",data:e.map(a=>a.uang_bersih),borderColor:"#059669",backgroundColor:"rgba(5, 150, 105, 0.08)",fill:!1,tension:.35,pointRadius:4,pointHoverRadius:5,pointBackgroundColor:"#059669",pointBorderColor:"#ffffff",pointBorderWidth:2,borderWidth:3},{label:"Uang PC",data:e.map(a=>a.uang_pc),borderColor:"#f59e0b",backgroundColor:"rgba(245, 158, 11, 0.1)",fill:!1,tension:.35,pointRadius:4,pointHoverRadius:5,pointBackgroundColor:"#f59e0b",pointBorderColor:"#ffffff",pointBorderWidth:2,borderWidth:3}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{labels:{color:Ss(),usePointStyle:!0,pointStyle:"circle",boxWidth:8,boxHeight:8,padding:18}},tooltip:{...kn(),callbacks:{label(a){return`${a.dataset.label}: ${K(a.parsed.y)}`}}}},scales:{x:{ticks:{color:"#047857",font:{size:12}},grid:{color:Yt()},border:{display:!1}},y:{ticks:{color:"#047857",font:{size:12},callback(a){return`${Math.round(Number(a)/1e6)}jt`}},grid:{color:Yt()},border:{display:!1}}}}})}function xs(e){const t=document.getElementById("dashboard-passenger-chart"),n=Array.isArray(e)&&e.length>0;if(dr("dashboard-passenger-chart","dashboard-passenger-empty",n),bn(me.passengerChart),!t||!window.Chart||!n){me.passengerChart=null;return}me.passengerChart=new window.Chart(t,{type:"bar",data:{labels:e.map(a=>a.bulan),datasets:[{label:"Penumpang",data:e.map(a=>a.penumpang),backgroundColor:"#10B981",borderRadius:8,maxBarThickness:44}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{...kn(),callbacks:{label(a){return`Penumpang: ${U(a.parsed.y)}`}}}},scales:{x:{ticks:{color:"#047857",font:{size:12}},grid:{color:"rgba(0, 0, 0, 0)"},border:{display:!1}},y:{ticks:{color:"#047857",font:{size:12}},grid:{color:Yt()},border:{display:!1}}}}})}function Ts(e){const t=document.getElementById("dashboard-mobil-list");t&&(t.innerHTML=e.map((n,a)=>`
        <div class="dashboard-mobil-item">
            <div class="dashboard-mobil-meta">
                <span class="dashboard-mobil-dot" style="background-color: ${ht[a%ht.length]}"></span>
                <div>
                    <p class="dashboard-mobil-code">${c(n.kode_mobil)}</p>
                    <p class="dashboard-mobil-trips">${U(n.total_trips)} trip</p>
                    <p class="dashboard-mobil-passengers">${U(n.total_penumpang)} penumpang</p>
                </div>
            </div>
            <p class="dashboard-mobil-value">${K(n.total_uang_bersih)}</p>
        </div>
    `).join(""))}function As(e){const t=document.getElementById("dashboard-mobil-chart"),n=document.getElementById("dashboard-mobil-content"),a=document.getElementById("dashboard-mobil-empty"),r=document.getElementById("dashboard-mobil-chart-empty"),o=document.getElementById("dashboard-mobil-list"),s=Array.isArray(e)&&e.length>0,i=s&&e.some(u=>Number(u.total_uang_bersih)>0);if(bn(me.mobilChart),n&&(n.hidden=!s),a&&(a.hidden=s),t&&(t.hidden=!i),r&&(r.hidden=i),s?Ts(e):o&&(o.innerHTML=""),!t||!window.Chart||!i){me.mobilChart=null;return}me.mobilChart=new window.Chart(t,{type:"doughnut",data:{labels:e.map(u=>u.kode_mobil),datasets:[{data:e.map(u=>u.total_uang_bersih),backgroundColor:e.map((u,d)=>ht[d%ht.length]),borderColor:"#ffffff",borderWidth:6,hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"58%",plugins:{legend:{display:!1},tooltip:{...kn(),callbacks:{label(u){const d=e[u.dataIndex]||{};return`${u.label}: ${K(u.parsed)} / ${U(d.total_penumpang||0)} penumpang`}}}}}})}function Wn(e){Object.entries(e.stats||{}).forEach(([t,n])=>$s(t,n)),Cs(e.revenueData||[]),xs(e.revenueData||[]),As(e.mobilRevenue||[])}async function Ls(){const[e,t,n]=await Promise.all([E("/statistics/dashboard"),E("/statistics/revenue-chart"),E("/statistics/mobil-revenue")]);return{stats:e,revenueData:t,mobilRevenue:n}}function Xn(e){const t=document.querySelector("[data-dashboard-loading]"),n=document.querySelector("[data-dashboard-content]"),a=document.getElementById("dashboard-refresh-btn");t&&(t.hidden=!e),n&&(n.hidden=e),a&&(a.disabled=e)}async function Ms(){const e=document.getElementById("dashboard-refresh-btn");e&&(Wn(_s()),e.addEventListener("click",async()=>{Xn(!0);try{Wn(await Ls())}catch{k("Silakan coba lagi","Gagal memuat data")}finally{Xn(!1)}}))}const O={data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1},De=10;function Rs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function Ps(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 21C15 17.4 18 14.4 18 10.5C18 7.18629 15.3137 4.5 12 4.5C8.68629 4.5 6 7.18629 6 10.5C6 14.4 9 17.4 12 21Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
            <circle cx="12" cy="10.5" r="2.25" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function Ds(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Os(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function yt(e){const t=document.getElementById("driver-submit-btn");O.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":O.editItem?"Perbarui":"Simpan")}function js(){const e=document.getElementById("drivers-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="drivers-table-state">
                <div class="drivers-loading-inline">
                    <span class="drivers-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function qs(){const e=document.getElementById("drivers-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="drivers-table-state drivers-empty-copy">
                Belum ada data driver
            </td>
        </tr>
    `)}function Zn(){const e=document.getElementById("drivers-table-body");if(e){if(O.loading){js();return}if(O.data.length===0){qs();return}e.innerHTML=O.data.map((t,n)=>`
        <tr class="drivers-row" data-testid="driver-row-${t.id}">
            <td class="drivers-index-cell">${(O.page-1)*De+n+1}</td>
            <td>
                <div class="drivers-user-cell">
                    <span class="drivers-user-avatar" aria-hidden="true">
                        ${Rs()}
                    </span>
                    <span class="drivers-user-name">${c(t.nama)}</span>
                </div>
            </td>
            <td>
                <div class="drivers-location-cell">
                    <span class="drivers-location-icon" aria-hidden="true">${Ps()}</span>
                    <span>${c(t.lokasi)}</span>
                </div>
            </td>
            <td>
                <div class="drivers-action-row">
                    <button
                        class="drivers-icon-button"
                        type="button"
                        data-driver-edit="${t.id}"
                        data-testid="edit-driver-${t.id}"
                        aria-label="Edit driver ${c(t.nama)}"
                    >
                        ${Ds()}
                    </button>
                    <button
                        class="drivers-icon-button drivers-icon-button-danger"
                        type="button"
                        data-driver-delete="${t.id}"
                        data-driver-name="${c(t.nama)}"
                        data-testid="delete-driver-${t.id}"
                        aria-label="Hapus driver ${c(t.nama)}"
                    >
                        ${Os()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function Qn(){const e=document.getElementById("drivers-pagination-shell"),t=document.getElementById("drivers-pagination-info"),n=document.getElementById("drivers-pagination-page"),a=document.getElementById("drivers-prev-page-btn"),r=document.getElementById("drivers-next-page-btn"),o=Math.max(1,Math.ceil(O.totalCount/De));e&&(e.hidden=o<=1),t&&(t.textContent=Be(O.page,De,O.totalCount,O.data.length)),n&&(n.textContent=`${O.page} / ${o}`),a&&(a.disabled=O.page===1),r&&(r.disabled=O.page>=o)}async function _e(){O.loading=!0,Zn(),Qn();try{const[e,t]=await Promise.all([E(`/drivers?page=${O.page}&limit=${De}${O.search?`&search=${encodeURIComponent(O.search)}`:""}`),E(`/drivers/count${O.search?`?search=${encodeURIComponent(O.search)}`:""}`)]);O.data=Array.isArray(e)?e:[],O.totalCount=Number(t.count||0)}finally{O.loading=!1,Zn(),Qn()}}function Yn(){const e=document.getElementById("driver-form"),t=document.getElementById("driver-form-title"),n=document.getElementById("driver-form-description"),a=document.getElementById("driver-id"),r=document.getElementById("driver-nama"),o=document.getElementById("driver-lokasi");e?.reset(),a&&(a.value=""),r&&(r.value=""),o&&(o.value=""),t&&(t.textContent="Tambah Driver Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan data driver"),O.editItem=null,yt(!1)}function Ns(e){const t=document.getElementById("driver-form-title"),n=document.getElementById("driver-form-description"),a=document.getElementById("driver-id"),r=document.getElementById("driver-nama"),o=document.getElementById("driver-lokasi");O.editItem=e,a&&(a.value=e.id),r&&(r.value=e.nama),o&&(o.value=e.lokasi),t&&(t.textContent="Edit Data Driver"),n&&(n.textContent="Isi form di bawah untuk memperbarui data driver"),yt(!1)}async function Us(e){const t=await E(`/drivers/${e}`);Ns(t),q("driver-form-modal")}function Hs(e){const t=document.getElementById("driver-delete-copy");O.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus driver <strong>${c(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`),q("driver-delete-modal")}function Fs(){const e=document.getElementById("drivers-add-btn"),t=document.getElementById("drivers-export-btn"),n=document.getElementById("drivers-search-input"),a=document.getElementById("driver-form"),r=document.getElementById("drivers-table-body"),o=document.getElementById("driver-delete-confirm-btn"),s=document.getElementById("drivers-prev-page-btn"),i=document.getElementById("drivers-next-page-btn");if(!(!e||!a||!r))return e.addEventListener("click",()=>{Yn(),q("driver-form-modal")}),t?.addEventListener("click",()=>{mn("/export/drivers/csv","drivers.csv").catch(()=>{k("Gagal mengunduh file")})}),n?.addEventListener("input",we(async u=>{O.search=u.target.value.trim(),O.page=1;try{await _e()}catch{k("Gagal memuat data")}})),a.addEventListener("submit",async u=>{u.preventDefault();const d={nama:document.getElementById("driver-nama")?.value.trim()||"",lokasi:document.getElementById("driver-lokasi")?.value.trim()||""};yt(!0);try{O.editItem?(await E(`/drivers/${O.editItem.id}`,{method:"PUT",body:d}),j("Data driver berhasil diperbarui")):(await E("/drivers",{method:"POST",body:d}),j("Driver berhasil ditambahkan")),G("driver-form-modal"),Yn(),await _e()}catch(l){k(l.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{yt(!1)}}),r.addEventListener("click",async u=>{const d=u.target.closest("[data-driver-edit]"),l=u.target.closest("[data-driver-delete]");try{if(d){await Us(d.dataset.driverEdit);return}l&&Hs({id:l.dataset.driverDelete,nama:l.dataset.driverName})}catch{k("Gagal memuat data")}}),o?.addEventListener("click",async()=>{if(O.deleteItem)try{await E(`/drivers/${O.deleteItem.id}`,{method:"DELETE"}),j("Driver berhasil dihapus"),G("driver-delete-modal"),(O.page-1)*De>=O.totalCount-1&&O.page>1&&(O.page-=1),O.deleteItem=null,await _e()}catch{k("Gagal menghapus data")}}),s?.addEventListener("click",async()=>{if(!(O.page<=1)){O.page-=1;try{await _e()}catch{k("Gagal memuat data")}}}),i?.addEventListener("click",async()=>{const u=Math.max(1,Math.ceil(O.totalCount/De));if(!(O.page>=u)){O.page+=1;try{await _e()}catch{k("Gagal memuat data")}}}),_e().catch(()=>{k("Gagal memuat data")})}const _={data:[],loading:!0,totalCount:0,page:1,search:"",filterJenis:"",editItem:null,deleteItem:null,isSubmitting:!1},Oe=10;function Gs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M5 14L6.6 9.2C6.8728 8.3816 7.6387 7.83 8.5014 7.83H15.4986C16.3613 7.83 17.1272 8.3816 17.4 9.2L19 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M4 14H20V17C20 18.1046 19.1046 19 18 19H6C4.89543 19 4 18.1046 4 17V14Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M7 16H7.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path>
            <path d="M17 16H17.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path>
        </svg>
    `}function Vs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Js(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Ks(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 13L11 22L2 13V4H11L20 13Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <circle cx="7.5" cy="8.5" r="1.5" fill="currentColor"></circle>
        </svg>
    `}function vt(e){const t=document.getElementById("mobil-submit-btn");_.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":_.editItem?"Perbarui":"Simpan")}function zs(e){return e==="Hiace"?"mobil-jenis-badge mobil-jenis-badge-hiace":"mobil-jenis-badge mobil-jenis-badge-reborn"}function Ws(){const e=document.getElementById("mobil-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="mobil-table-state">
                <div class="mobil-loading-inline">
                    <span class="mobil-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function Xs(){const e=document.getElementById("mobil-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="mobil-table-state mobil-empty-copy">
                Belum ada data mobil
            </td>
        </tr>
    `)}function ea(){const e=document.getElementById("mobil-table-body");if(e){if(_.loading){Ws();return}if(_.data.length===0){Xs();return}e.innerHTML=_.data.map((t,n)=>`
        <tr class="mobil-row" data-testid="mobil-row-${t.id}">
            <td class="mobil-index-cell">${(_.page-1)*Oe+n+1}</td>
            <td>
                <div class="mobil-code-cell">
                    <span class="mobil-code-avatar" aria-hidden="true">
                        ${Gs()}
                    </span>
                    <span class="mobil-code-text">${c(t.kode_mobil)}</span>
                </div>
            </td>
            <td>
                <span class="${zs(t.jenis_mobil)}">
                    <span class="mobil-jenis-icon" aria-hidden="true">${Ks()}</span>
                    <span>${c(t.jenis_mobil)}</span>
                </span>
            </td>
            <td>
                <div class="mobil-action-row">
                    <button
                        class="mobil-icon-button"
                        type="button"
                        data-mobil-edit="${t.id}"
                        data-testid="edit-mobil-${t.id}"
                        aria-label="Edit mobil ${c(t.kode_mobil)}"
                    >
                        ${Vs()}
                    </button>
                    <button
                        class="mobil-icon-button mobil-icon-button-danger"
                        type="button"
                        data-mobil-delete="${t.id}"
                        data-mobil-name="${c(t.kode_mobil)}"
                        data-testid="delete-mobil-${t.id}"
                        aria-label="Hapus mobil ${c(t.kode_mobil)}"
                    >
                        ${Js()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function ta(){const e=document.getElementById("mobil-pagination-shell"),t=document.getElementById("mobil-pagination-info"),n=document.getElementById("mobil-pagination-page"),a=document.getElementById("mobil-prev-page-btn"),r=document.getElementById("mobil-next-page-btn"),o=Math.max(1,Math.ceil(_.totalCount/Oe));e&&(e.hidden=o<=1),t&&(t.textContent=Be(_.page,Oe,_.totalCount,_.data.length)),n&&(n.textContent=`${_.page} / ${o}`),a&&(a.disabled=_.page===1),r&&(r.disabled=_.page>=o)}async function ge(){_.loading=!0,ea(),ta();try{const[e,t]=await Promise.all([E(`/mobil?page=${_.page}&limit=${Oe}${_.search?`&search=${encodeURIComponent(_.search)}`:""}${_.filterJenis?`&jenis=${encodeURIComponent(_.filterJenis)}`:""}`),E(`/mobil/count${_.search||_.filterJenis?"?":""}${[_.search?`search=${encodeURIComponent(_.search)}`:"",_.filterJenis?`jenis=${encodeURIComponent(_.filterJenis)}`:""].filter(Boolean).join("&")}`)]);_.data=Array.isArray(e)?e:[],_.totalCount=Number(t.count||0)}finally{_.loading=!1,ea(),ta()}}function na(){const e=document.getElementById("mobil-form"),t=document.getElementById("mobil-form-title"),n=document.getElementById("mobil-form-description"),a=document.getElementById("mobil-id"),r=document.getElementById("mobil-kode"),o=document.getElementById("mobil-jenis"),s=document.getElementById("mobil-home-pool"),i=document.getElementById("mobil-is-active-in-trip");e?.reset(),a&&(a.value=""),r&&(r.value=""),o&&(o.value="Hiace"),s&&(s.value=""),i&&(i.checked=!0),t&&(t.textContent="Tambah Mobil Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan data mobil"),_.editItem=null,vt(!1)}function Zs(e){const t=document.getElementById("mobil-form-title"),n=document.getElementById("mobil-form-description"),a=document.getElementById("mobil-id"),r=document.getElementById("mobil-kode"),o=document.getElementById("mobil-jenis"),s=document.getElementById("mobil-home-pool"),i=document.getElementById("mobil-is-active-in-trip");_.editItem=e,a&&(a.value=e.id),r&&(r.value=e.kode_mobil),o&&(o.value=e.jenis_mobil),s&&(s.value=e.home_pool??""),i&&(i.checked=e.is_active_in_trip!==!1),t&&(t.textContent="Edit Data Mobil"),n&&(n.textContent="Isi form di bawah untuk memperbarui data mobil"),vt(!1)}async function Qs(e){const t=await E(`/mobil/${e}`);Zs(t),q("mobil-form-modal")}function Ys(e){const t=document.getElementById("mobil-delete-copy");_.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus mobil <strong>${c(e.kode_mobil)}</strong>? Tindakan ini tidak dapat dibatalkan.`),q("mobil-delete-modal")}function ei(){const e=document.getElementById("mobil-add-btn"),t=document.getElementById("mobil-export-btn"),n=document.getElementById("mobil-search-input"),a=document.getElementById("mobil-filter-jenis"),r=document.getElementById("mobil-form"),o=document.getElementById("mobil-table-body"),s=document.getElementById("mobil-delete-confirm-btn"),i=document.getElementById("mobil-prev-page-btn"),u=document.getElementById("mobil-next-page-btn"),d=document.getElementById("mobil-kode");if(!(!e||!r||!o))return e.addEventListener("click",()=>{na(),q("mobil-form-modal")}),t?.addEventListener("click",()=>{mn("/export/mobil/csv","mobil.csv").catch(()=>{k("Gagal mengunduh file")})}),n?.addEventListener("input",we(async l=>{_.search=l.target.value.trim(),_.page=1;try{await ge()}catch{k("Gagal memuat data")}})),a?.addEventListener("change",async l=>{_.filterJenis=l.target.value,_.page=1;try{await ge()}catch{k("Gagal memuat data")}}),d?.addEventListener("input",l=>{l.target.value=l.target.value.toUpperCase()}),r.addEventListener("submit",async l=>{l.preventDefault();const g=document.getElementById("mobil-home-pool")?.value||"",w={kode_mobil:document.getElementById("mobil-kode")?.value.trim().toUpperCase()||"",jenis_mobil:document.getElementById("mobil-jenis")?.value||"Hiace",home_pool:g===""?null:g,is_active_in_trip:document.getElementById("mobil-is-active-in-trip")?.checked??!0};vt(!0);try{_.editItem?(await E(`/mobil/${_.editItem.id}`,{method:"PUT",body:w}),j("Data mobil berhasil diperbarui")):(await E("/mobil",{method:"POST",body:w}),j("Mobil berhasil ditambahkan")),G("mobil-form-modal"),na(),await ge()}catch(P){k(P.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{vt(!1)}}),o.addEventListener("click",async l=>{const g=l.target.closest("[data-mobil-edit]"),w=l.target.closest("[data-mobil-delete]");try{if(g){await Qs(g.dataset.mobilEdit);return}w&&Ys({id:w.dataset.mobilDelete,kode_mobil:w.dataset.mobilName})}catch{k("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(_.deleteItem)try{await E(`/mobil/${_.deleteItem.id}`,{method:"DELETE"}),j("Mobil berhasil dihapus"),G("mobil-delete-modal"),(_.page-1)*Oe>=_.totalCount-1&&_.page>1&&(_.page-=1),_.deleteItem=null,await ge()}catch{k("Gagal menghapus data")}}),i?.addEventListener("click",async()=>{if(!(_.page<=1)){_.page-=1;try{await ge()}catch{k("Gagal memuat data")}}}),u?.addEventListener("click",async()=>{const l=Math.max(1,Math.ceil(_.totalCount/Oe));if(!(_.page>=l)){_.page+=1;try{await ge()}catch{k("Gagal memuat data")}}}),ge().catch(()=>{k("Gagal memuat data")})}const $={data:[],drivers:[],mobilList:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1},We=10,aa={"05:30":"Subuh (05.30 WIB)","07:00":"Pagi (07.00 WIB)","09:00":"Pagi (09.00 WIB)","13:00":"Siang (13.00 WIB)","16:00":"Sore (16.00 WIB)","19:00":"Malam (19.00 WIB)"},Pt="07:00",ti=["Reguler","Dropping","Rental"],hn="Reguler";function ni(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function ai(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function yn(e){return e==="Lunas"?"Lunas":"Belum Lunas"}function ra(e){const t=yn(e);return`<span class="keberangkatan-payment-badge ${t==="Lunas"?"is-paid":"is-unpaid"}">${c(t)}</span>`}function oa(e){return aa[e]||aa[Pt]}function Et(e){return ti.includes(e)?e:hn}function ri(){const e=Number(document.getElementById("keberangkatan-tarif-penumpang")?.value||0),t=Number(document.getElementById("keberangkatan-uang-paket")?.value||0),n=Number(document.getElementById("keberangkatan-jumlah-snack")?.value||0),a=Number(document.getElementById("keberangkatan-pengembalian-snack")?.value||0),r=Number(document.getElementById("keberangkatan-jumlah-air-mineral")?.value||0),o=e,s=o+t,i=s*.15,u=s*.85;return{jumlah_uang_penumpang:o,uang_paket:t,total:s,uang_pc:i,uang_bersih:u,jumlah_snack:n,pengembalian_snack:a,jumlah_air_mineral:r}}function vn(){const e=ri();Object.entries(e).forEach(([t,n])=>{const a=document.querySelector(`[data-calc="${t}"]`);if(a){if(t==="jumlah_snack"){a.textContent=`${U(n)} item`;return}if(t==="pengembalian_snack"){a.textContent=`${U(n)} item`;return}if(t==="jumlah_air_mineral"){a.textContent=`${U(n)} botol`;return}a.textContent=K(n)}})}function wt(e,t,n,a,r=""){const o=document.getElementById(e);if(!o)return;const s=e==="keberangkatan-kode-mobil"?"Pilih mobil":"Pilih driver";o.innerHTML=`
        <option value="">${s}</option>
        ${t.map(i=>`
            <option value="${i[n]}" ${String(i[n])===String(r)?"selected":""}>
                ${c(a(i))}
            </option>
        `).join("")}
    `}function Bt(e){const t=document.getElementById("keberangkatan-submit-btn");$.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":$.editItem?"Perbarui":"Simpan")}function oi(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");e&&(e.innerHTML=`
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
        `))}function si(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");e&&(e.innerHTML=`
        <tr>
            <td colspan="18" class="keberangkatan-table-state keberangkatan-empty-copy">
                Belum ada data keberangkatan
            </td>
        </tr>
    `,t&&(t.hidden=!1,t.innerHTML=`
            <div class="keberangkatan-mobile-state keberangkatan-empty-copy">
                Belum ada data keberangkatan
            </div>
        `))}function sa(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");if(e){if($.loading){oi();return}if($.data.length===0){si();return}e.innerHTML=$.data.map(n=>`
        <tr class="keberangkatan-row" data-testid="keberangkatan-row-${n.id}">
            <td class="keberangkatan-hari-cell">${c(n.hari)}</td>
            <td>${c(n.tanggal)}</td>
            <td>${c(n.jam_keberangkatan_label||oa(n.jam_keberangkatan))}</td>
            <td>${c(Et(n.tipe_layanan))}</td>
            <td>
                <span class="keberangkatan-kode-badge">${c(n.kode_mobil)}</span>
            </td>
            <td>${c(n.driver_nama)}</td>
            <td class="text-right">${U(n.jumlah_penumpang)}</td>
            <td class="text-right keberangkatan-money-cell">${K(n.jumlah_uang_penumpang)}</td>
            <td class="text-right">${U(n.jumlah_paket)}</td>
            <td class="text-right keberangkatan-money-cell">${K(n.uang_paket)}</td>
            <td class="text-right"><span class="keberangkatan-stock-badge">${U(n.jumlah_snack)}</span></td>
            <td class="text-right"><span class="keberangkatan-stock-badge keberangkatan-stock-badge-blue">${U(n.pengembalian_snack)}</span></td>
            <td class="text-right"><span class="keberangkatan-stock-badge keberangkatan-stock-badge-blue">${U(n.jumlah_air_mineral)}</span></td>
            <td class="text-right keberangkatan-money-cell keberangkatan-money-cell-amber">${K(n.uang_pc)}</td>
            <td class="text-right keberangkatan-money-cell keberangkatan-money-cell-emerald">${K(n.uang_bersih)}</td>
            <td class="text-center">${ra(n.status_pembayaran)}</td>
            <td class="text-center">
                <span class="keberangkatan-trip-badge">#${U(n.trip_ke)}</span>
            </td>
            <td>
                <div class="keberangkatan-action-row">
                    <button
                        class="keberangkatan-icon-button"
                        type="button"
                        data-keberangkatan-edit="${n.id}"
                        data-testid="edit-keberangkatan-${n.id}"
                        aria-label="Edit data keberangkatan ${c(n.kode_mobil)}"
                    >
                        ${ni()}
                    </button>
                    <button
                        class="keberangkatan-icon-button keberangkatan-icon-button-danger"
                        type="button"
                        data-keberangkatan-delete="${n.id}"
                        data-testid="delete-keberangkatan-${n.id}"
                        aria-label="Hapus data keberangkatan ${c(n.kode_mobil)}"
                    >
                        ${ai()}
                    </button>
                </div>
            </td>
        </tr>
    `).join(""),t&&(t.hidden=!1,t.innerHTML=$.data.map(n=>`
            <article class="keberangkatan-mobile-card" data-testid="keberangkatan-card-${n.id}">
                <div class="keberangkatan-mobile-card-head">
                    <div>
                        <p class="keberangkatan-mobile-day">${c(n.hari)}</p>
                        <h3 class="keberangkatan-mobile-date">${c(n.tanggal)}</h3>
                        <p>${c(n.jam_keberangkatan_label||oa(n.jam_keberangkatan))}</p>
                    </div>
                    <div class="keberangkatan-mobile-head-side">
                        <span class="keberangkatan-kode-badge">${c(n.kode_mobil)}</span>
                        <span class="keberangkatan-trip-badge">#${U(n.trip_ke)}</span>
                    </div>
                </div>

                <div class="keberangkatan-mobile-driver">
                    <span>Driver</span>
                    <strong>${c(n.driver_nama)}</strong>
                </div>

                <div class="keberangkatan-mobile-grid">
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-status">
                        <span>Validasi</span>
                        ${ra(n.status_pembayaran)}
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Layanan</span>
                        <strong>${c(Et(n.tipe_layanan))}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Penumpang</span>
                        <strong>${U(n.jumlah_penumpang)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Paket</span>
                        <strong>${U(n.jumlah_paket)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Snack</span>
                        <strong>${U(n.jumlah_snack)} item</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Pengembalian Snack</span>
                        <strong>${U(n.pengembalian_snack)} item</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Air Mineral</span>
                        <strong>${U(n.jumlah_air_mineral)} botol</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-full">
                        <span>Jumlah Tarif</span>
                        <strong>${K(n.jumlah_uang_penumpang)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-full">
                        <span>Uang Paket</span>
                        <strong>${K(n.uang_paket)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-accent">
                        <span>Uang PC (15%)</span>
                        <strong>${K(n.uang_pc)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-emerald">
                        <span>Uang Bersih</span>
                        <strong>${K(n.uang_bersih)}</strong>
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
        `).join(""))}}function ia(){const e=document.getElementById("keberangkatan-pagination-shell"),t=document.getElementById("keberangkatan-pagination-info"),n=document.getElementById("keberangkatan-pagination-page"),a=document.getElementById("keberangkatan-prev-page-btn"),r=document.getElementById("keberangkatan-next-page-btn"),o=Math.max(1,Math.ceil($.totalCount/We));e&&(e.hidden=o<=1),t&&(t.textContent=Be($.page,We,$.totalCount,$.data.length)),n&&(n.textContent=`${$.page} / ${o}`),a&&(a.disabled=$.page===1),r&&(r.disabled=$.page>=o)}async function $e(){$.loading=!0,sa(),ia();try{const[e,t,n,a]=await Promise.all([E(`/keberangkatan?page=${$.page}&limit=${We}${$.search?`&search=${encodeURIComponent($.search)}`:""}`),E(`/keberangkatan/count${$.search?`?search=${encodeURIComponent($.search)}`:""}`),E("/drivers/all"),E("/mobil/all")]);$.data=Array.isArray(e)?e:[],$.totalCount=Number(t.count||0),$.drivers=Array.isArray(n)?n:[],$.mobilList=Array.isArray(a)?a:[]}finally{$.loading=!1,sa(),ia()}}function lr(){document.getElementById("keberangkatan-form")?.scrollTo({top:0,behavior:"auto"})}function Ht(){const e=document.getElementById("keberangkatan-form"),t=document.getElementById("keberangkatan-form-title"),n=document.getElementById("keberangkatan-form-description"),a=document.getElementById("keberangkatan-tanggal"),r=document.getElementById("keberangkatan-jam-keberangkatan"),o=document.getElementById("keberangkatan-trip-ke"),s=document.getElementById("keberangkatan-tipe-layanan"),i=document.getElementById("keberangkatan-jumlah-penumpang"),u=document.getElementById("keberangkatan-tarif-penumpang"),d=document.getElementById("keberangkatan-jumlah-paket"),l=document.getElementById("keberangkatan-uang-paket"),g=document.getElementById("keberangkatan-jumlah-snack"),w=document.getElementById("keberangkatan-pengembalian-snack"),P=document.getElementById("keberangkatan-jumlah-air-mineral"),b=document.getElementById("keberangkatan-status-pembayaran");e?.reset(),$.editItem=null,document.getElementById("keberangkatan-id").value="",t&&(t.textContent="Tambah Data Keberangkatan"),n&&(n.textContent="Isi form di bawah untuk menambahkan data keberangkatan"),a&&(a.value=ot()),r&&(r.value=Pt),wt("keberangkatan-kode-mobil",$.mobilList,"kode_mobil",y=>`${y.kode_mobil} - ${y.jenis_mobil}`,$.mobilList[0]?.kode_mobil||""),wt("keberangkatan-driver-id",$.drivers,"id",y=>`${y.nama} - ${y.lokasi}`,$.drivers[0]?.id||""),o&&(o.value="1"),s&&(s.value=hn),i&&(i.value="0"),u&&(u.value="0"),d&&(d.value="0"),l&&(l.value="0"),g&&(g.value="0"),w&&(w.value="0"),P&&(P.value="0"),b&&(b.value="Belum Lunas"),Bt(!1),vn(),lr()}async function da(e){const t=await E(`/keberangkatan/${e}`),n=document.getElementById("keberangkatan-form-title"),a=document.getElementById("keberangkatan-form-description");$.editItem=t,document.getElementById("keberangkatan-id").value=t.id,document.getElementById("keberangkatan-tanggal").value=t.tanggal,document.getElementById("keberangkatan-jam-keberangkatan").value=t.jam_keberangkatan||Pt,document.getElementById("keberangkatan-trip-ke").value=t.trip_ke,document.getElementById("keberangkatan-tipe-layanan").value=Et(t.tipe_layanan),document.getElementById("keberangkatan-jumlah-penumpang").value=t.jumlah_penumpang,document.getElementById("keberangkatan-tarif-penumpang").value=t.tarif_penumpang,document.getElementById("keberangkatan-jumlah-paket").value=t.jumlah_paket,document.getElementById("keberangkatan-uang-paket").value=t.uang_paket,document.getElementById("keberangkatan-jumlah-snack").value=t.jumlah_snack,document.getElementById("keberangkatan-pengembalian-snack").value=t.pengembalian_snack,document.getElementById("keberangkatan-jumlah-air-mineral").value=t.jumlah_air_mineral,document.getElementById("keberangkatan-status-pembayaran").value=yn(t.status_pembayaran),wt("keberangkatan-kode-mobil",$.mobilList,"kode_mobil",r=>`${r.kode_mobil} - ${r.jenis_mobil}`,t.kode_mobil),wt("keberangkatan-driver-id",$.drivers,"id",r=>`${r.nama} - ${r.lokasi}`,t.driver_id),n&&(n.textContent="Edit Data Keberangkatan"),a&&(a.textContent="Isi form di bawah untuk memperbarui data keberangkatan"),Bt(!1),vn(),lr(),q("keberangkatan-form-modal")}function la(e){$.deleteItem=e,q("keberangkatan-delete-modal")}function ii(){const e=document.getElementById("keberangkatan-add-btn"),t=document.getElementById("keberangkatan-export-btn"),n=document.getElementById("keberangkatan-search-input"),a=document.getElementById("keberangkatan-form"),r=document.getElementById("keberangkatan-table-body"),o=document.getElementById("keberangkatan-mobile-list"),s=document.getElementById("keberangkatan-delete-confirm-btn"),i=document.getElementById("keberangkatan-prev-page-btn"),u=document.getElementById("keberangkatan-next-page-btn");if(!(!e||!a||!r))return e.addEventListener("click",()=>{Ht(),q("keberangkatan-form-modal")}),t?.addEventListener("click",()=>{mn("/export/keberangkatan/csv","keberangkatan.csv").catch(()=>{k("Gagal mengunduh file")})}),n?.addEventListener("input",we(async d=>{$.search=d.target.value.trim(),$.page=1;try{await $e()}catch{k("Gagal memuat data")}})),a.addEventListener("input",d=>{["keberangkatan-jumlah-penumpang","keberangkatan-tarif-penumpang","keberangkatan-uang-paket","keberangkatan-jumlah-snack","keberangkatan-pengembalian-snack","keberangkatan-jumlah-air-mineral"].includes(d.target.id)&&vn()}),a.addEventListener("submit",async d=>{d.preventDefault();const l={tanggal:document.getElementById("keberangkatan-tanggal")?.value||"",jam_keberangkatan:document.getElementById("keberangkatan-jam-keberangkatan")?.value||Pt,tipe_layanan:Et(document.getElementById("keberangkatan-tipe-layanan")?.value||hn),kode_mobil:document.getElementById("keberangkatan-kode-mobil")?.value||"",driver_id:document.getElementById("keberangkatan-driver-id")?.value||"",jumlah_penumpang:Number(document.getElementById("keberangkatan-jumlah-penumpang")?.value||0),tarif_penumpang:Number(document.getElementById("keberangkatan-tarif-penumpang")?.value||0),jumlah_paket:Number(document.getElementById("keberangkatan-jumlah-paket")?.value||0),uang_paket:Number(document.getElementById("keberangkatan-uang-paket")?.value||0),jumlah_snack:Number(document.getElementById("keberangkatan-jumlah-snack")?.value||0),pengembalian_snack:Number(document.getElementById("keberangkatan-pengembalian-snack")?.value||0),jumlah_air_mineral:Number(document.getElementById("keberangkatan-jumlah-air-mineral")?.value||0),trip_ke:Number(document.getElementById("keberangkatan-trip-ke")?.value||1),status_pembayaran:yn(document.getElementById("keberangkatan-status-pembayaran")?.value||"")};Bt(!0);try{$.editItem?(await E(`/keberangkatan/${$.editItem.id}`,{method:"PUT",body:l}),j("Data berhasil diperbarui")):(await E("/keberangkatan",{method:"POST",body:l}),j("Data berhasil ditambahkan")),G("keberangkatan-form-modal"),Ht(),await $e()}catch(g){k(g.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{Bt(!1)}}),r.addEventListener("click",async d=>{const l=d.target.closest("[data-keberangkatan-edit]"),g=d.target.closest("[data-keberangkatan-delete]");try{if(l){await da(l.dataset.keberangkatanEdit);return}g&&la({id:g.dataset.keberangkatanDelete})}catch{k("Gagal memuat data")}}),o?.addEventListener("click",async d=>{const l=d.target.closest("[data-keberangkatan-edit]"),g=d.target.closest("[data-keberangkatan-delete]");try{if(l){await da(l.dataset.keberangkatanEdit);return}g&&la({id:g.dataset.keberangkatanDelete})}catch{k("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if($.deleteItem)try{await E(`/keberangkatan/${$.deleteItem.id}`,{method:"DELETE"}),j("Data berhasil dihapus"),G("keberangkatan-delete-modal"),($.page-1)*We>=$.totalCount-1&&$.page>1&&($.page-=1),$.deleteItem=null,await $e()}catch{k("Gagal menghapus data")}}),i?.addEventListener("click",async()=>{if(!($.page<=1)){$.page-=1;try{await $e()}catch{k("Gagal memuat data")}}}),u?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil($.totalCount/We));if(!($.page>=d)){$.page+=1;try{await $e()}catch{k("Gagal memuat data")}}}),$e().then(()=>{Ht()}).catch(()=>{k("Gagal memuat data")})}const x={data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1,prices:{snack:0,air:0}},Xe=10;function di(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function li(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function It(e){return Number(document.getElementById(e)?.value||0)}function _t(){const e=It("stock-total-snack"),t=It("stock-total-air"),n=e*x.prices.snack+t*x.prices.air,a=document.querySelector('[data-stock-calc="nilai_total"]'),r=document.getElementById("stock-snack-price-label"),o=document.getElementById("stock-air-price-label");r&&(r.textContent=K(x.prices.snack)),o&&(o.textContent=K(x.prices.air)),a&&(a.textContent=K(n))}function $t(e){const t=document.getElementById("stock-submit-btn");x.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":x.editItem?"Perbarui":"Simpan")}function ci(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");e&&(e.innerHTML=`
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
        `))}function ui(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");e&&(e.innerHTML=`
        <tr>
            <td colspan="14" class="stock-table-state stock-empty-copy">
                Belum ada data stok snack dan air mineral
            </td>
        </tr>
    `,t&&(t.hidden=!1,t.innerHTML=`
            <div class="stock-mobile-state stock-empty-copy">
                Belum ada data stok snack dan air mineral
            </div>
        `))}function ca(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");if(e){if(x.loading){ci();return}if(x.data.length===0){ui();return}e.innerHTML=x.data.map(n=>`
        <tr class="stock-row" data-testid="stock-row-${n.id}">
            <td class="stock-day-cell">${c(n.hari)}</td>
            <td>${c(n.tanggal)}</td>
            <td>${c(n.bulan)}</td>
            <td class="text-right">${U(n.total_stock_snack_display??n.total_stock_snack)}</td>
            <td class="text-right">${U(n.total_stock_air_mineral)}</td>
            <td class="text-right">${U(n.pengembalian_snack)}</td>
            <td class="text-right">${U(n.terpakai_snack)}</td>
            <td class="text-right">${U(n.terpakai_air_mineral)}</td>
            <td class="text-right"><span class="stock-value-badge stock-value-badge-emerald">${U(n.sisa_stock_snack)}</span></td>
            <td class="text-right"><span class="stock-value-badge stock-value-badge-blue">${U(n.sisa_stock_air_mineral)}</span></td>
            <td class="text-right stock-money-cell">${K(n.nilai_total)}</td>
            <td class="text-right stock-money-cell stock-money-cell-emerald">${K(n.sisa_nilai_total)}</td>
            <td>${c(n.keterangan||"-")}</td>
            <td>
                <div class="stock-action-row">
                    <button
                        class="stock-icon-button"
                        type="button"
                        data-stock-edit="${n.id}"
                        data-testid="edit-stock-${n.id}"
                        aria-label="Edit data stok ${c(n.tanggal)}"
                    >
                        ${di()}
                    </button>
                    <button
                        class="stock-icon-button stock-icon-button-danger"
                        type="button"
                        data-stock-delete="${n.id}"
                        data-stock-date="${c(n.tanggal)}"
                        data-testid="delete-stock-${n.id}"
                        aria-label="Hapus data stok ${c(n.tanggal)}"
                    >
                        ${li()}
                    </button>
                </div>
            </td>
        </tr>
    `).join(""),t&&(t.hidden=!1,t.innerHTML=x.data.map(n=>`
            <article class="stock-mobile-card" data-testid="stock-card-${n.id}">
                <div class="stock-mobile-card-head">
                    <div>
                        <p class="stock-mobile-day">${c(n.hari)}</p>
                        <h3 class="stock-mobile-date">${c(n.tanggal)}</h3>
                    </div>
                    <span class="stock-mobile-month">${c(n.bulan)}</span>
                </div>

                <div class="stock-mobile-grid">
                    <div class="stock-mobile-item">
                        <span>Total Snack</span>
                        <strong>${U(n.total_stock_snack_display??n.total_stock_snack)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Total Air Mineral</span>
                        <strong>${U(n.total_stock_air_mineral)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Pengembalian Snack</span>
                        <strong>${U(n.pengembalian_snack)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Terpakai Snack</span>
                        <strong>${U(n.terpakai_snack)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Terpakai Air Mineral</span>
                        <strong>${U(n.terpakai_air_mineral)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Sisa Snack</span>
                        <strong>${U(n.sisa_stock_snack)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Sisa Air Mineral</span>
                        <strong>${U(n.sisa_stock_air_mineral)}</strong>
                    </div>
                    <div class="stock-mobile-item stock-mobile-item-full">
                        <span>Nilai Total</span>
                        <strong>${K(n.nilai_total)}</strong>
                    </div>
                    <div class="stock-mobile-item stock-mobile-item-full stock-mobile-item-emerald">
                        <span>Sisa Nilai Total</span>
                        <strong>${K(n.sisa_nilai_total)}</strong>
                    </div>
                    <div class="stock-mobile-item stock-mobile-item-full">
                        <span>Keterangan</span>
                        <strong>${c(n.keterangan||"-")}</strong>
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
                        data-stock-date="${c(n.tanggal)}"
                        data-testid="delete-stock-mobile-${n.id}"
                    >
                        Hapus
                    </button>
                </div>
            </article>
        `).join(""))}}function ua(){const e=document.getElementById("stock-pagination-shell"),t=document.getElementById("stock-pagination-info"),n=document.getElementById("stock-pagination-page"),a=document.getElementById("stock-prev-page-btn"),r=document.getElementById("stock-next-page-btn"),o=Math.max(1,Math.ceil(x.totalCount/Xe));e&&(e.hidden=o<=1),t&&(t.textContent=Be(x.page,Xe,x.totalCount,x.data.length)),n&&(n.textContent=`${x.page} / ${o}`),a&&(a.disabled=x.page===1),r&&(r.disabled=x.page>=o)}async function Se(){x.loading=!0,ca(),ua();try{const[e,t]=await Promise.all([E(`/stock?page=${x.page}&limit=${Xe}${x.search?`&search=${encodeURIComponent(x.search)}`:""}`),E(`/stock/count${x.search?`?search=${encodeURIComponent(x.search)}`:""}`)]);x.data=Array.isArray(e)?e:[],x.totalCount=Number(t.count||0)}finally{x.loading=!1,ca(),ua()}}function ma(){const e=document.getElementById("stock-form"),t=document.getElementById("stock-form-title"),n=document.getElementById("stock-form-description");e?.reset(),x.editItem=null,document.getElementById("stock-id").value="",document.getElementById("stock-tanggal").value=ot(),document.getElementById("stock-total-snack").value="0",document.getElementById("stock-total-air").value="0",document.getElementById("stock-keterangan").value="",t&&(t.textContent="Tambah Stok Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan stok snack dan air mineral"),$t(!1),_t()}function mi(e){const t=document.getElementById("stock-form-title"),n=document.getElementById("stock-form-description");x.editItem=e,document.getElementById("stock-id").value=e.id,document.getElementById("stock-tanggal").value=e.tanggal,document.getElementById("stock-total-snack").value=e.total_stock_snack,document.getElementById("stock-total-air").value=e.total_stock_air_mineral,document.getElementById("stock-keterangan").value=e.keterangan||"",t&&(t.textContent="Edit Data Stok"),n&&(n.textContent="Isi form di bawah untuk memperbarui stok snack dan air mineral"),$t(!1),_t()}async function pa(e){const t=await E(`/stock/${e}`);mi(t),q("stock-form-modal")}function ga(e){const t=document.getElementById("stock-delete-copy");x.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus data stok tanggal <strong>${c(e.tanggal)}</strong>? Tindakan ini tidak dapat dibatalkan.`),q("stock-delete-modal")}function pi(){const e=document.querySelector("[data-stock-page]"),t=document.getElementById("stock-add-btn"),n=document.getElementById("stock-search-input"),a=document.getElementById("stock-form"),r=document.getElementById("stock-table-body"),o=document.getElementById("stock-mobile-list"),s=document.getElementById("stock-delete-confirm-btn"),i=document.getElementById("stock-prev-page-btn"),u=document.getElementById("stock-next-page-btn");if(!(!e||!t||!a||!r))return x.prices.snack=Number(e.dataset.stockSnackPrice||0),x.prices.air=Number(e.dataset.stockAirPrice||0),_t(),t.addEventListener("click",()=>{ma(),q("stock-form-modal")}),n?.addEventListener("input",we(async d=>{x.search=d.target.value.trim(),x.page=1;try{await Se()}catch{k("Gagal memuat data")}})),a.addEventListener("input",d=>{["stock-total-snack","stock-total-air"].includes(d.target.id)&&_t()}),a.addEventListener("submit",async d=>{d.preventDefault();const l={tanggal:document.getElementById("stock-tanggal")?.value||"",total_stock_snack:It("stock-total-snack"),total_stock_air_mineral:It("stock-total-air"),keterangan:document.getElementById("stock-keterangan")?.value.trim()||""};$t(!0);try{x.editItem?(await E(`/stock/${x.editItem.id}`,{method:"PUT",body:l}),j("Data stok berhasil diperbarui")):(await E("/stock",{method:"POST",body:l}),j("Data stok berhasil ditambahkan")),G("stock-form-modal"),ma(),await Se()}catch(g){k(g.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{$t(!1)}}),r.addEventListener("click",async d=>{const l=d.target.closest("[data-stock-edit]"),g=d.target.closest("[data-stock-delete]");try{if(l){await pa(l.dataset.stockEdit);return}g&&ga({id:g.dataset.stockDelete,tanggal:g.dataset.stockDate})}catch{k("Gagal memuat data")}}),o?.addEventListener("click",async d=>{const l=d.target.closest("[data-stock-edit]"),g=d.target.closest("[data-stock-delete]");try{if(l){await pa(l.dataset.stockEdit);return}g&&ga({id:g.dataset.stockDelete,tanggal:g.dataset.stockDate})}catch{k("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(x.deleteItem)try{await E(`/stock/${x.deleteItem.id}`,{method:"DELETE"}),j("Data stok berhasil dihapus"),G("stock-delete-modal"),(x.page-1)*Xe>=x.totalCount-1&&x.page>1&&(x.page-=1),x.deleteItem=null,await Se()}catch{k("Gagal menghapus data")}}),i?.addEventListener("click",async()=>{if(!(x.page<=1)){x.page-=1;try{await Se()}catch{k("Gagal memuat data")}}}),u?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil(x.totalCount/Xe));if(!(x.page>=d)){x.page+=1;try{await Se()}catch{k("Gagal memuat data")}}}),Se().catch(()=>{k("Gagal memuat data")})}const Ze=10,T={currentUser:null,data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,defaultRole:"User"};function gi(e){return["Super Admin","Admin"].includes(e)}function fi(e){return e==="Super Admin"}function bi(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function ki(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M2.5 12C4.4 8.2 8 6 12 6C16 6 19.6 8.2 21.5 12C19.6 15.8 16 18 12 18C8 18 4.4 15.8 2.5 12Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function hi(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function yi(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function vi(){return fi(T.currentUser?.role)?["Super Admin","Admin","User"]:["Admin","User"]}function St(e){Q(document.getElementById("admin-user-submit-btn"),e,"Menyimpan...")}function Ei(e){return e==="Super Admin"?"admin-users-role-badge admin-users-role-badge-super":e==="Admin"?"admin-users-role-badge admin-users-role-badge-admin":"admin-users-role-badge admin-users-role-badge-user"}function wi(){const e=document.getElementById("admin-users-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="6" class="admin-users-table-state">
                <div class="admin-users-loading-inline">
                    <span class="admin-users-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function cr(e="Belum ada akun admin atau user."){const t=document.getElementById("admin-users-table-body");t&&(t.innerHTML=`
        <tr>
            <td colspan="6" class="admin-users-table-state admin-users-empty-copy">${c(e)}</td>
        </tr>
    `)}function fa(){const e=document.getElementById("admin-users-table-body");if(e){if(T.loading){wi();return}if(T.data.length===0){cr();return}e.innerHTML=T.data.map(t=>`
        <tr class="admin-users-row" data-testid="admin-user-row-${t.id}">
            <td>
                <div class="admin-users-name-cell">
                    <span class="admin-users-avatar" aria-hidden="true">${bi()}</span>
                    <div>
                        <span class="admin-users-name">${c(t.nama)}</span>
                        <span class="admin-users-name-meta">${t.is_current_user?"Akun yang sedang login":"Akun dashboard aktif"}</span>
                    </div>
                </div>
            </td>
            <td><span class="admin-users-username">@${c(t.username)}</span></td>
            <td><span class="admin-users-email">${c(t.email)}</span></td>
            <td>
                <div class="admin-users-password-cell">
                    <span class="admin-users-password-mask">${c(t.password_mask)}</span>
                    <span class="admin-users-password-copy">Terenkripsi</span>
                </div>
            </td>
            <td><span class="${Ei(t.role)}">${c(t.role)}</span></td>
            <td>
                <div class="admin-users-action-row">
                    <button class="admin-users-icon-button" type="button" data-admin-user-show="${t.id}" data-testid="show-admin-user-${t.id}" aria-label="Lihat detail akun ${c(t.nama)}">
                        ${ki()}
                    </button>
                    <button class="admin-users-icon-button" type="button" data-admin-user-edit="${t.id}" data-testid="edit-admin-user-${t.id}" aria-label="Edit akun ${c(t.nama)}" ${t.can_edit?"":"disabled"}>
                        ${hi()}
                    </button>
                    <button class="admin-users-icon-button admin-users-icon-button-danger" type="button" data-admin-user-delete="${t.id}" data-admin-user-name="${c(t.nama)}" data-testid="delete-admin-user-${t.id}" aria-label="Hapus akun ${c(t.nama)}" ${t.can_delete?"":"disabled"}>
                        ${yi()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function en(){const e=document.getElementById("admin-users-pagination-shell"),t=document.getElementById("admin-users-pagination-info"),n=document.getElementById("admin-users-pagination-page"),a=document.getElementById("admin-users-prev-page-btn"),r=document.getElementById("admin-users-next-page-btn"),o=Math.max(1,Math.ceil(T.totalCount/Ze));e&&(e.hidden=o<=1),t&&(t.textContent=Be(T.page,Ze,T.totalCount,T.data.length)),n&&(n.textContent=`${T.page} / ${o}`),a&&(a.disabled=T.page===1),r&&(r.disabled=T.page>=o)}async function Ce(){T.loading=!0,fa(),en();try{const e=T.search?`?search=${encodeURIComponent(T.search)}`:"",t=`?page=${T.page}&limit=${Ze}${T.search?`&search=${encodeURIComponent(T.search)}`:""}`,[n,a]=await Promise.all([E(`/admin-users${t}`),E(`/admin-users/count${e}`)]);T.data=Array.isArray(n)?n:[],T.totalCount=Number(a.count||0)}finally{T.loading=!1,fa(),en()}}function ur(e="User"){const t=document.getElementById("admin-user-role");if(!t)return;const n=vi(),a=n.includes(e)?e:n[0];t.innerHTML=n.map(r=>`
        <option value="${c(r)}" ${r===a?"selected":""}>${c(r)}</option>
    `).join("")}function mr(e){const t=document.getElementById("admin-user-password"),n=document.getElementById("admin-user-password-note");t&&(t.required=!e,t.placeholder=e?"Kosongkan jika tidak ingin mengubah password":"Masukkan password",t.value=""),n&&(n.textContent=e?"Kosongkan password jika tidak ingin mengubah password akun ini.":"Password minimal 6 karakter dan akan disimpan dalam bentuk terenkripsi.")}function Ft(e="User"){const t=document.getElementById("admin-user-form"),n=document.getElementById("admin-user-form-title"),a=document.getElementById("admin-user-form-description"),r=document.getElementById("admin-user-id");t?.reset(),r&&(r.value=""),ur(e),mr(!1),n&&(n.textContent=e==="Admin"?"Tambah Admin Baru":"Tambah User Baru"),a&&(a.textContent=e==="Admin"?"Lengkapi data akun untuk menambahkan admin baru":"Lengkapi data akun untuk menambahkan user baru"),T.defaultRole=e,T.editItem=null,St(!1)}function Bi(e){T.editItem=e,document.getElementById("admin-user-id").value=e.id,document.getElementById("admin-user-nama").value=e.nama,document.getElementById("admin-user-username").value=e.username,document.getElementById("admin-user-email").value=e.email,ur(e.role),mr(!0),document.getElementById("admin-user-form-title").textContent="Edit Akun",document.getElementById("admin-user-form-description").textContent="Perbarui informasi akun admin atau user di bawah ini",St(!1)}function Ii(e){const t=document.getElementById("admin-user-detail-list");t&&(t.innerHTML=`
        <div class="admin-users-detail-item">
            <span>Nama</span>
            <strong>${c(e.nama)}</strong>
        </div>
        <div class="admin-users-detail-item">
            <span>Username</span>
            <strong>@${c(e.username)}</strong>
        </div>
        <div class="admin-users-detail-item">
            <span>Email</span>
            <strong>${c(e.email)}</strong>
        </div>
        <div class="admin-users-detail-item">
            <span>Password</span>
            <strong>${c(e.password_mask)}</strong>
            <p>${c(e.password_note)}</p>
        </div>
        <div class="admin-users-detail-item">
            <span>Role</span>
            <strong>${c(e.role)}</strong>
        </div>
        <div class="admin-users-detail-item">
            <span>Dibuat</span>
            <strong>${c(Is(e.created_at))}</strong>
        </div>
    `)}async function _i(e){Ii(await E(`/admin-users/${e}`)),q("admin-user-show-modal")}async function $i(e){Bi(await E(`/admin-users/${e}`)),q("admin-user-form-modal")}function Si(e){T.deleteItem=e,document.getElementById("admin-user-delete-copy").innerHTML=`Apakah Anda yakin ingin menghapus akun <strong>${c(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`,q("admin-user-delete-modal")}function ba(){const e=document.getElementById("admin-users-access-note"),t=document.getElementById("admin-users-search-input"),n=document.querySelector(".admin-users-page-actions");e&&(e.hidden=!1,e.textContent="Halaman ini hanya dapat diakses oleh Admin atau Super Admin."),t&&(t.disabled=!0),n&&(n.hidden=!0),T.loading=!1,T.data=[],T.totalCount=0,cr("Anda tidak memiliki akses untuk mengelola data admin dan user."),en()}function Ci({user:e}={}){const t=document.getElementById("admin-users-add-admin-btn"),n=document.getElementById("admin-users-add-user-btn"),a=document.getElementById("admin-users-search-input"),r=document.getElementById("admin-user-form"),o=document.getElementById("admin-users-table-body"),s=document.getElementById("admin-user-delete-confirm-btn"),i=document.getElementById("admin-users-prev-page-btn"),u=document.getElementById("admin-users-next-page-btn");if(!(!t||!n||!r||!o)){if(T.currentUser=e||window.transitAuthUser||null,!gi(T.currentUser?.role)){ba();return}return t.addEventListener("click",()=>{Ft("Admin"),q("admin-user-form-modal")}),n.addEventListener("click",()=>{Ft("User"),q("admin-user-form-modal")}),a?.addEventListener("input",we(async d=>{T.search=d.target.value.trim(),T.page=1;try{await Ce()}catch(l){k(l.message||"Gagal memuat data akun")}})),r.addEventListener("submit",async d=>{d.preventDefault();const l={nama:document.getElementById("admin-user-nama")?.value.trim()||"",username:document.getElementById("admin-user-username")?.value.trim()||"",email:document.getElementById("admin-user-email")?.value.trim()||"",password:document.getElementById("admin-user-password")?.value||"",role:document.getElementById("admin-user-role")?.value||"User"};St(!0);try{T.editItem?(await E(`/admin-users/${T.editItem.id}`,{method:"PUT",body:l}),j("Akun berhasil diperbarui")):(await E("/admin-users",{method:"POST",body:l}),j(l.role==="Admin"?"Admin berhasil ditambahkan":"User berhasil ditambahkan")),G("admin-user-form-modal"),Ft(T.defaultRole),await Ce()}catch(g){k(g.message||"Silakan periksa kembali data yang diinput","Gagal menyimpan akun")}finally{St(!1)}}),o.addEventListener("click",async d=>{const l=d.target.closest("[data-admin-user-show]"),g=d.target.closest("[data-admin-user-edit]"),w=d.target.closest("[data-admin-user-delete]");try{if(l){await _i(l.dataset.adminUserShow);return}if(g){await $i(g.dataset.adminUserEdit);return}w&&Si({id:w.dataset.adminUserDelete,nama:w.dataset.adminUserName})}catch(P){k(P.message||"Gagal memuat detail akun")}}),s?.addEventListener("click",async()=>{if(T.deleteItem)try{await E(`/admin-users/${T.deleteItem.id}`,{method:"DELETE"}),j("Akun berhasil dihapus"),G("admin-user-delete-modal"),(T.page-1)*Ze>=T.totalCount-1&&T.page>1&&(T.page-=1),T.deleteItem=null,await Ce()}catch(d){k(d.message||"Gagal menghapus akun")}}),i?.addEventListener("click",async()=>{if(!(T.page<=1)){T.page-=1;try{await Ce()}catch(d){k(d.message||"Gagal memuat data akun")}}}),u?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil(T.totalCount/Ze));if(!(T.page>=d)){T.page+=1;try{await Ce()}catch(l){k(l.message||"Gagal memuat data akun")}}}),Ce().catch(d=>{if(d.status===403){ba();return}k(d.message||"Gagal memuat data akun")})}}const ka=[{value:"05:30",label:"Subuh",time:"05.30 WIB"},{value:"07:00",label:"Pagi",time:"07.00 WIB"},{value:"09:00",label:"Pagi",time:"09.00 WIB"},{value:"13:00",label:"Siang",time:"13.00 WIB"},{value:"16:00",label:"Sore",time:"16.00 WIB"},{value:"19:00",label:"Malam",time:"19.00 WIB"}],pr=[[{code:"1A",label:"1A"},{code:"SOPIR",label:"SOPIR",isDriver:!0}],[{code:"2A",label:"2A"},{code:"2B",label:"2B",isOptional:!0},{code:"3A",label:"3A"}],[{code:"4A",label:"4A"},{code:"5A",label:"5A"}]],ha=pr.flat().filter(e=>!e.isDriver).length,p={currentUser:null,date:ot(),direction:"from_pkb",bookings:[],loading:!1,drivers:[],mobils:[],formOptions:null,selectedSeats:[],passengerDraftMap:{},editItem:null,editPackageItem:null,deleteItem:null,slotDriverMap:{},slotMobilMap:{},occupiedSeatsForForm:[],occupiedSeatsForPackageForm:[],slotExtraArmadas:{},currentFormArmadaIndex:1,_pendingChoiceArmada:1,_pendingChoiceTime:""};function Gt(e){const t=document.getElementById(e);if(!t)return null;try{return JSON.parse(t.textContent||"{}")}catch{return null}}function xi(e){return["Super Admin","Admin"].includes(e)}function Ti(e){const t=e?"#dc2626":"#166534",n=e?"#991b1b":"#14532d";return`
        <svg viewBox="0 0 50 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="2" width="30" height="20" rx="8" fill="${t}" stroke="${n}" stroke-width="1.5"/>
            <rect x="5" y="18" width="40" height="28" rx="9" fill="${t}" stroke="${n}" stroke-width="1.5"/>
            <rect x="7" y="44" width="36" height="14" rx="7" fill="${t}" stroke="${n}" stroke-width="1.5" opacity="0.8"/>
            <rect x="2" y="22" width="5" height="18" rx="2.5" fill="${t}" opacity="0.6"/>
            <rect x="43" y="22" width="5" height="18" rx="2.5" fill="${t}" opacity="0.6"/>
        </svg>`}function Ai(){return`
        <svg viewBox="0 0 50 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="25" cy="30" r="18" stroke="rgba(148,163,184,0.5)" stroke-width="2.5"/>
            <circle cx="25" cy="30" r="6" fill="rgba(148,163,184,0.4)"/>
            <line x1="25" y1="12" x2="25" y2="24" stroke="rgba(148,163,184,0.5)" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="7" y1="30" x2="19" y2="30" stroke="rgba(148,163,184,0.5)" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="31" y1="30" x2="43" y2="30" stroke="rgba(148,163,184,0.5)" stroke-width="2.5" stroke-linecap="round"/>
        </svg>`}function Li(){return'<svg viewBox="0 0 24 24" fill="none"><path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path><path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg>'}function Mi(){return'<svg viewBox="0 0 24 24" fill="none"><path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg>'}function ya(){return'<svg viewBox="0 0 24 24" fill="none" style="width:12px;height:12px;flex-shrink:0;"><path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'}function Ri(){return'<svg viewBox="0 0 24 24" fill="none" style="width:12px;height:12px;flex-shrink:0;"><rect x="2" y="7" width="15" height="10" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M17 10H20L22 13V17H17V10Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="6" cy="18" r="1.5" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="18" r="1.5" stroke="currentColor" stroke-width="1.5"/></svg>'}function Pi(){return'<svg viewBox="0 0 24 24" fill="none" style="width:12px;height:12px;flex-shrink:0;"><path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 2V8H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 13H16M8 17H13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'}function Di(e){return`
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
                    ${pr.map(n=>`<div class="bpg-seat-row">${n.map(r=>{if(r.isDriver)return`
                    <div class="bpg-seat-item bpg-seat-driver" title="Sopir / Pengemudi">
                        <div class="bpg-seat-icon">${Ai()}</div>
                        <span class="bpg-seat-label">SOPIR</span>
                    </div>`;const o=e[r.code],s=!!o,i=s?"bpg-seat-occupied":"bpg-seat-available",u=s?c(o.nama_pemesanan||"-"):"",d=r.isOptional?'<span class="bpg-seat-optional-badge">OPSIONAL</span>':"";return`
                <div class="bpg-seat-item ${i}" title="${s?u:"Tersedia"}">
                    ${d}
                    <div class="bpg-seat-icon">${Ti(s)}</div>
                    <span class="bpg-seat-label">${r.label}</span>
                    ${s?`<span class="bpg-seat-name">${u}</span>`:""}
                </div>`}).join("")}</div>`).join("")}
                </div>
            </div>
        </div>`}function Oi(e){if(e.length===0)return`
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
            ${e.map(r=>{const o=r.selected_seats_label||"-",s=r.departure_status||"",i=n(s),u=t.map(d=>{const l=s===d.value;return`<button class="bpg-depart-opt ${d.cls}${l?" is-active":""}" type="button"
                data-departure-status="${c(d.value)}"
                data-booking-departure="${c(String(r.id))}">${c(d.label)}</button>`}).join("");return`
            <div class="bpg-passenger-item" data-booking-id="${c(String(r.id))}">
                <div class="bpg-passenger-item-row">
                    <div class="bpg-passenger-seats">
                        ${o.split(",").map(d=>`<span class="stock-value-badge stock-value-badge-blue">${c(d.trim())}</span>`).join("")}
                    </div>
                    <div class="bpg-passenger-info">
                        <span class="bpg-passenger-name">${c(r.nama_pemesanan||"-")}</span>
                        <span class="bpg-passenger-phone">${c(r.phone||"-")}</span>
                    </div>
                </div>
                <div class="bpg-passenger-item-actions-row">
                    <span class="${c(r.payment_status_badge_class||"stock-value-badge stock-value-badge-blue")} bpg-status-sm">${c(r.payment_status||"-")}</span>
                    <div class="bpg-depart-dropdown" data-depart-dropdown="${c(String(r.id))}">
                        <button class="bpg-depart-trigger ${i.cls}" type="button" data-depart-toggle="${c(String(r.id))}">
                            <svg viewBox="0 0 24 24" fill="none" style="width:11px;height:11px;flex-shrink:0;"><circle cx="12" cy="12" r="2.5" fill="currentColor"/><circle cx="12" cy="5" r="2" fill="currentColor"/><circle cx="12" cy="19" r="2" fill="currentColor"/></svg>
                            ${c(i.label)}
                            <svg viewBox="0 0 24 24" fill="none" style="width:10px;height:10px;flex-shrink:0;"><path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </button>
                        <div class="bpg-depart-menu" hidden>
                            ${u}
                        </div>
                    </div>
                    <div style="flex:1;"></div>
                    <button class="bpg-lihat-btn" type="button" data-booking-lihat="${c(String(r.id))}" aria-label="Lihat detail ${c(r.nama_pemesanan)}">
                        <svg viewBox="0 0 24 24" fill="none" style="width:13px;height:13px;"><path d="M2.5 12C4.4 8.2 8 6 12 6C16 6 19.6 8.2 21.5 12C19.6 15.8 16 18 12 18C8 18 4.4 15.8 2.5 12Z" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/></svg>
                        Lihat
                    </button>
                    <button class="admin-users-icon-button" type="button" data-booking-edit="${c(String(r.id))}" title="Edit pemesanan">
                        ${Li()}
                    </button>
                    <button class="admin-users-icon-button admin-users-icon-button-danger" type="button" data-booking-delete="${c(String(r.id))}" data-booking-name="${c(r.nama_pemesanan)}" title="Hapus pemesanan">
                        ${Mi()}
                    </button>
                </div>
            </div>`}).join("")}
        </div>`}function ji(e){const t={};return e.forEach(n=>{(Array.isArray(n.selected_seats)?n.selected_seats:[]).forEach(r=>{t[r]||(t[r]=n)})}),t}function qi(e,t,n,a){const r=ji(n),o=n.reduce((f,N)=>f+(Number(N.passenger_count)||0),0),s=o>=ha,i=`${e.value}__${p.direction}__${t}`;if(!p.slotDriverMap[i]){const f=n.find(N=>N.driver_id);f&&(p.slotDriverMap[i]=f.driver_id)}const u=p.slotDriverMap[i]||"",d=p.slotMobilMap[i]||"",l=s?"stock-value-badge-red":"stock-value-badge-yellow",g=p.drivers.map(f=>{const N=f.lokasi?`${f.nama} (${f.lokasi})`:f.nama;return`<option value="${c(f.id)}" ${u===f.id?"selected":""}>${c(N)}</option>`}).join(""),w=p.mobils.map(f=>{const N=`${f.kode_mobil} — ${f.jenis_mobil}`;return`<option value="${c(f.id)}" ${d===f.id?"selected":""}>${c(N)}</option>`}).join(""),P=[...new Set(n.map(f=>(f.service_type||"").trim()).filter(Boolean))],b=a>1?`<span class="bpg-armada-badge">${Ri()} Armada ${t}</span>`:"",y=s?`<button class="bpg-add-armada-btn" type="button"
                data-add-armada="${c(e.value)}"
                data-armada-index="${t}"
                title="Tambah armada ke-${t+1} untuk jadwal ${c(e.time)}">
                ${ya()}
                Tambah Armada
            </button>`:"";return`
        <article class="bpg-slot-card" data-slot="${c(e.value)}" data-direction="${c(p.direction)}" data-armada="${t}">
            <div class="bpg-slot-head">
                <div class="bpg-slot-head-row">
                    <div class="bpg-slot-time-badge">
                        <span class="bpg-slot-period">${c(e.label)}</span>
                        <strong class="bpg-slot-time">${c(e.time)}</strong>
                    </div>
                    <div class="bpg-slot-head-meta">
                        ${b}
                        <div class="bpg-slot-service-types">
                            ${P.length>0?P.map(f=>`<span class="bpg-service-badge">${c(f)}</span>`).join(""):'<span class="bpg-service-badge bpg-service-badge--empty">Belum ada layanan</span>'}
                        </div>
                        <span class="stock-value-badge ${l}">${o} / ${ha} Kursi</span>
                    </div>
                </div>
                ${y?`<div class="bpg-slot-head-row">${y}</div>`:""}
            </div>

            ${Di(r)}

            <div class="bpg-slot-assignment">
                <div class="bpg-slot-select-group">
                    <label>
                        <svg viewBox="0 0 24 24" fill="none" style="width:13px;height:13px;"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/><path d="M4 20C4 17.2386 7.58172 15 12 15C16.4183 15 20 17.2386 20 20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
                        Pilih Driver
                    </label>
                    <select class="bpg-slot-select" data-slot-driver="${c(e.value)}__${t}">
                        <option value="">— Belum ditentukan —</option>
                        ${g}
                    </select>
                </div>
                <div class="bpg-slot-select-group">
                    <label>
                        <svg viewBox="0 0 24 24" fill="none" style="width:13px;height:13px;"><rect x="2" y="7" width="20" height="10" rx="3" stroke="currentColor" stroke-width="1.8"/><circle cx="6" cy="17" r="2" stroke="currentColor" stroke-width="1.8"/><circle cx="18" cy="17" r="2" stroke="currentColor" stroke-width="1.8"/></svg>
                        Pilih Mobil
                    </label>
                    <select class="bpg-slot-select" data-slot-mobil="${c(e.value)}__${t}">
                        <option value="">— Belum ditentukan —</option>
                        ${w}
                    </select>
                </div>
            </div>

            ${Oi(n)}

            <button class="bpg-slot-book-btn" type="button"
                data-slot-book="${c(e.value)}"
                data-slot-armada="${t}"
                title="Tambah pemesanan untuk Armada ${t}, jadwal ${c(e.time)}">
                ${ya()}
                Tambah Pemesanan Armada ${t}
            </button>
            <button class="bpg-surat-jalan-btn" type="button"
                data-surat-jalan="${c(e.value)}"
                data-surat-jalan-armada="${t}"
                title="Buat Surat Jalan Armada ${t}, jadwal ${c(e.time)}">
                ${Pi()}
                Surat Jalan
            </button>
        </article>`}function Ni(e,t){const n={};t.forEach(u=>{const d=u.armada_index||1;n[d]||(n[d]=[]),n[d].push(u)});const a=`${e.value}__${p.direction}`,r=t.length>0?Math.max(...Object.keys(n).map(Number)):1,o=p.slotExtraArmadas[a]||1,s=Math.max(r,o),i=[];for(let u=1;u<=s;u++)i.push(qi(e,u,n[u]||[],s));return`<div class="bpg-slot-group" data-slot-group="${c(e.value)}">${i.join("")}</div>`}function Ui(){const e=document.getElementById("bpg-slots-shell");e&&(e.innerHTML=`
            <div class="admin-users-loading-inline" style="padding:40px 0;">
                <span class="admin-users-loading-inline-spinner" aria-hidden="true"></span>
                <span>Memuat data penumpang...</span>
            </div>`)}function gr(){const e=document.getElementById("bpg-slots-shell");if(!e)return;const t={};ka.forEach(a=>{t[a.value]=[]}),p.bookings.forEach(a=>{const o=(a.trip_time||"").trim().substring(0,5);t[o]&&t[o].push(a)});const n=ka.map(a=>Ni(a,t[a.value]||[]));e.innerHTML=`<div class="bpg-slots-grid">${n.join("")}</div>`}async function xe(){p.loading=!0,Ui();try{const e=new URLSearchParams({date:p.date,direction:p.direction,limit:200,page:1}),[t,n]=await Promise.all([E(`/bookings?${e}`),E(`/bookings/armada-extras?date=${p.date}`).catch(()=>({}))]);p.bookings=Array.isArray(t)?t:[],n&&typeof n=="object"&&Object.entries(n).forEach(([a,r])=>{const o=`${a}__${p.direction}`;p.slotExtraArmadas[o]=Math.max(p.slotExtraArmadas[o]||1,Number(r)||1)})}catch(e){p.bookings=[],e.status!==403&&k(e.message||"Gagal memuat data penumpang")}finally{p.loading=!1,gr()}}function va(e){return{Aktif:"green",Selesai:"green",Dibayar:"green","Dibayar Tunai":"green",Draft:"gray","Belum Bayar":"orange","Menunggu Pembayaran":"blue","Menunggu Verifikasi":"blue","Menunggu Konfirmasi":"blue",Batal:"red",Reguler:"purple",Paket:"blue"}[e]||"gray"}function Hi(e){document.getElementById("bpg-detail-title").textContent=e.nama_pemesanan||"-",document.getElementById("bpg-detail-subtitle").textContent=e.booking_code||"-",document.getElementById("bpg-detail-full-link").href=`/dashboard/bookings/${e.id}`;const t=e.category==="Paket",n=document.getElementById("bpg-detail-ticket-link"),a=document.getElementById("bpg-detail-surat-link");t?(n.hidden=!0,a.hidden=!1,a.href=`/dashboard/bookings/${e.id}/surat-bukti`):(n.hidden=!1,n.href=`/unduh/tiket-reguler/${e.booking_code}`,a.hidden=!0);const r=e.booking_status||"",o=e.payment_status||"",s=e.service_type||"",i=(e.pickup_location||"").trim()!=="",u=(e.dropoff_location||"").trim()!=="",d=document.getElementById("bpg-detail-body");d.innerHTML=`
        <!-- Status Badges -->
        <div class="bpg-dv-status-bar">
            ${r?`<span class="bpg-dv-badge bpg-dv-badge--${va(r)}">${c(r)}</span>`:""}
            ${o?`<span class="bpg-dv-badge bpg-dv-badge--${va(o)}">${c(o)}</span>`:""}
            ${s?`<span class="bpg-dv-badge bpg-dv-badge--purple">${c(s)}</span>`:""}
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
                        <span class="bpg-dv-route-city">${c(e.from_city||"-")}</span>
                        <span class="bpg-dv-route-arrow">→</span>
                        <span class="bpg-dv-route-city">${c(e.to_city||"-")}</span>
                    </div>
                </div>
                <div class="bpg-dv-row">
                    <div class="bpg-dv-label">Tanggal</div>
                    <div class="bpg-dv-value">${c(e.trip_date_label||"-")}</div>
                </div>
                <div class="bpg-dv-row">
                    <div class="bpg-dv-label">Waktu</div>
                    <div class="bpg-dv-value">${c(e.trip_time||"-")} WIB</div>
                </div>
                <div class="bpg-dv-row">
                    <div class="bpg-dv-label">Armada</div>
                    <div class="bpg-dv-value">Armada ${c(String(e.armada_index||1))}</div>
                </div>
                <div class="bpg-dv-row">
                    <div class="bpg-dv-label">Jenis Layanan</div>
                    <div class="bpg-dv-value">${c(s||"-")}</div>
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
                    <div class="bpg-dv-value">${c(e.nama_pemesanan||"-")}</div>
                </div>
                <div class="bpg-dv-row">
                    <div class="bpg-dv-label">No HP</div>
                    <div class="bpg-dv-value bpg-dv-value--mono">${c(e.phone||"-")}</div>
                </div>
                <div class="bpg-dv-row">
                    <div class="bpg-dv-label">Kursi</div>
                    <div class="bpg-dv-value">${c(e.selected_seats_label||"-")}</div>
                </div>
                <div class="bpg-dv-row">
                    <div class="bpg-dv-label">Jumlah Penumpang</div>
                    <div class="bpg-dv-value">${c(String(e.passenger_count||0))} Orang</div>
                </div>
            </div>
        </div>

        <!-- Alamat -->
        ${i||u?`
        <div class="bpg-dv-section">
            <div class="bpg-dv-section-head">
                <svg viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="9" r="2.5" stroke="currentColor" stroke-width="2"/></svg>
                <span class="bpg-dv-section-title">Alamat</span>
            </div>
            <div class="bpg-dv-rows">
                ${i?`
                <div class="bpg-dv-row bpg-dv-row--full">
                    <div class="bpg-dv-label">Alamat Penjemputan</div>
                    <div class="bpg-dv-value">${c(e.pickup_location)}</div>
                </div>`:""}
                ${u?`
                <div class="bpg-dv-row bpg-dv-row--full">
                    <div class="bpg-dv-label">Alamat Pengantaran</div>
                    <div class="bpg-dv-value">${c(e.dropoff_location)}</div>
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
                    <div class="bpg-dv-value bpg-dv-value--price">${c(e.total_amount_formatted||"-")}</div>
                </div>
            </div>
        </div>
    `,q("bpg-detail-modal")}function Fi(){return(p.formOptions?.seat_options||[]).map(e=>e.code)}function En(e){const t=new Map(Fi().map((n,a)=>[n,a]));return Array.from(new Set((e||[]).map(n=>String(n).trim()).filter(n=>t.has(n)))).sort((n,a)=>(t.get(n)??999)-(t.get(a)??999))}function wn(){return Number(document.getElementById("booking-passenger-count")?.value||0)}function Gi(){const e=window.transitAuthUser?.role??null,t=["Super Admin","Admin"].includes(e);return(p.formOptions?.seat_options||[]).filter(n=>!n.is_optional||t).map(n=>n.code)}function Vi(){return p.formOptions?.payment_status_options||[]}function Ji(e){return e==="transfer"?["Belum Bayar","Menunggu Pembayaran","Menunggu Verifikasi","Dibayar"]:e==="qris"?["Belum Bayar","Menunggu Pembayaran","Dibayar"]:e==="cash"?["Belum Bayar","Dibayar Tunai"]:["Belum Bayar"]}function Ki(e){return e==="transfer"?"Menunggu Pembayaran":e==="qris"?"Dibayar":e==="cash"?"Dibayar Tunai":"Belum Bayar"}function zi(e){return e==="transfer"?"Menunggu Verifikasi Pembayaran":e==="qris"||e==="cash"?"Diproses":"Draft"}function Wi(e,t){if(!e||!t||e===t)return null;const a=(p.formOptions?.route_matrix||{})?.[e]?.[t];return a==null?null:Number(a)}function fr(){return Math.max(0,parseInt(document.getElementById("booking-additional-fare")?.value||"0",10)||0)}function Le(){const e=document.getElementById("booking-from-city")?.value||"",t=document.getElementById("booking-to-city")?.value||"",n=wn(),a=Wi(e,t),r=fr(),o=a!==null?a+r:null,s=o!==null?o*n:null,i=document.getElementById("booking-price-per-seat"),u=document.getElementById("booking-total-amount");i&&(i.value=a!==null?K(a):""),u&&(u.value=s!==null?K(s):"")}function Bn(){const e=document.getElementById("booking-payment-method")?.value||"",t=document.getElementById("booking-payment-status"),n=document.getElementById("booking-booking-status"),a=document.getElementById("booking-bank-account-group"),r=document.getElementById("booking-bank-account-code"),o=Ji(e),s=t?.value||"";a&&(a.hidden=e!=="transfer"),r&&e!=="transfer"&&(r.value=""),t&&(t.innerHTML=Vi().filter(i=>o.includes(i.value)).map(i=>`<option value="${c(i.value)}">${c(i.label)}</option>`).join(""),t.value=o.includes(s)?s:Ki(e)),n&&(n.value=zi(e))}function Xi(){const e=document.getElementById("booking-selected-seats-inputs");e&&(e.innerHTML=p.selectedSeats.map(t=>`<input type="hidden" name="selected_seats[]" value="${c(t)}">`).join(""))}function Zi(){const e=document.getElementById("booking-selected-seat-count"),t=document.getElementById("booking-selected-seat-label");e&&(e.textContent=String(p.selectedSeats.length)),t&&(t.textContent=p.selectedSeats.length>0?p.selectedSeats.join(", "):"Belum dipilih")}function tn(){document.querySelectorAll("[data-passenger-seat]").forEach(e=>{const t=e.dataset.passengerSeat;t&&(p.passengerDraftMap[t]={seat_no:t,name:e.querySelector("[data-passenger-name]")?.value.trim()||"",phone:e.querySelector("[data-passenger-phone]")?.value.trim()||""})})}function fe(e=null){const t=document.getElementById("booking-passenger-editor");if(t){if(e&&(p.passengerDraftMap=Object.fromEntries(e.map(n=>[n.seat_no,n]))),p.selectedSeats.length===0){t.innerHTML='<div class="dashboard-empty-state dashboard-empty-state--block bookings-passenger-empty">Pilih kursi terlebih dahulu untuk menampilkan form data penumpang.</div>';return}t.innerHTML=`
        <div class="bookings-passenger-grid bookings-passenger-grid--editor">
            ${p.selectedSeats.map((n,a)=>{const r=p.passengerDraftMap[n]||{name:"",phone:""};return`
                    <article class="bookings-passenger-card bookings-passenger-card--editor" data-passenger-seat="${c(n)}">
                        <div class="bookings-passenger-form-head">
                            <span class="stock-value-badge stock-value-badge-blue">${c(n)}</span>
                            <strong>Penumpang ${a+1}</strong>
                            <p>${a===0?"Menjadi nama pemesanan utama.":"Data penumpang tambahan."}</p>
                        </div>
                        <div class="bookings-passenger-form-grid">
                            <div class="admin-users-form-group">
                                <label>Nama</label>
                                <div class="admin-users-input-shell">
                                    <input type="text" value="${c(r.name||"")}" placeholder="Masukkan nama penumpang" data-passenger-name>
                                </div>
                            </div>
                            <div class="admin-users-form-group">
                                <label>No HP</label>
                                <div class="admin-users-input-shell">
                                    <input type="text" value="${c(r.phone||"")}" placeholder="08xxxxxxxxxx" data-passenger-phone>
                                </div>
                            </div>
                        </div>
                    </article>`}).join("")}
        </div>`}}async function Je(){const e=document.getElementById("booking-trip-date")?.value||"",t=document.getElementById("booking-trip-time")?.value||"",n=document.getElementById("booking-from-city")?.value||"",a=document.getElementById("booking-to-city")?.value||"",r=p.editItem?.id||"",o=p.currentFormArmadaIndex||1;if(!e||!t){p.occupiedSeatsForForm=[];return}try{const s=new URLSearchParams({trip_date:e,trip_time:t,armada_index:o});n&&s.set("from_city",n),a&&s.set("to_city",a),r&&s.set("exclude_id",r);const i=await E(`/bookings/occupied-seats?${s}`);p.occupiedSeatsForForm=Array.isArray(i?.occupied_seats)?i.occupied_seats:[]}catch{p.occupiedSeatsForForm=[]}}async function Te(){const e=document.getElementById("pkg-trip-date")?.value||"",t=document.getElementById("pkg-trip-time")?.value||"",n=document.getElementById("pkg-from-city")?.value||"",a=document.getElementById("pkg-to-city")?.value||"",r=parseInt(document.getElementById("package-armada-index")?.value||"1",10);if(!e||!t){p.occupiedSeatsForPackageForm=[],Ea();return}try{const o=new URLSearchParams({trip_date:e,trip_time:t,armada_index:r});n&&o.set("from_city",n),a&&o.set("to_city",a);const s=await E(`/bookings/occupied-seats?${o}`);p.occupiedSeatsForPackageForm=Array.isArray(s?.occupied_seats)?s.occupied_seats:[]}catch{p.occupiedSeatsForPackageForm=[]}Ea()}function Ea(){const e=document.getElementById("pkg-seat-code");if(!e)return;const t=(p.formOptions?.seat_options||[]).filter(r=>!r.is_optional),n=p.occupiedSeatsForPackageForm||[],a=e.value;e.innerHTML='<option value="">Pilih kursi</option>'+t.map(r=>{const o=n.includes(r.code);return`<option value="${c(r.code)}"${o?" disabled":""}>${c(r.label)}${o?" — Sudah dipesan":""}</option>`}).join(""),a&&!n.includes(a)&&(e.value=a)}function be(){const e=document.querySelectorAll("[data-seat-code]"),t=wn(),n=Gi();p.selectedSeats=En(p.selectedSeats.filter(a=>n.includes(a)&&!p.occupiedSeatsForForm.includes(a))),e.forEach(a=>{const r=a.dataset.seatCode,o=n.includes(r),s=p.occupiedSeatsForForm.includes(r),i=p.selectedSeats.includes(r),u=p.selectedSeats.length>=t&&!i;a.hidden=!o,a.classList.toggle("is-selected",i),a.classList.toggle("is-occupied",s),a.classList.toggle("is-disabled",!s&&u),a.disabled=!o||s||!i&&u,s?a.title="Kursi sudah dipesan":a.title=""}),Xi(),Zi()}function Vt(e=1,t=""){document.getElementById("booking-form")?.reset(),p.editItem=null,p.selectedSeats=[],p.passengerDraftMap={},p.currentFormArmadaIndex=e;const a=p.date||ot();document.getElementById("booking-id").value="",document.getElementById("booking-armada-index").value=String(e),document.getElementById("booking-form-title").textContent="Tambah Pemesanan";const r=e>1?` (Armada ${e})`:"";document.getElementById("booking-form-description").textContent=`Lengkapi data pemesanan reguler dari dashboard admin${r}.`,document.getElementById("booking-trip-date").value=a,document.getElementById("booking-trip-time").value=t||"";const o=document.getElementById("booking-from-city"),s=document.getElementById("booking-to-city");o&&(o.value=""),s&&(s.value=""),document.getElementById("booking-passenger-count").value="1",document.getElementById("booking-additional-fare").value="0",document.getElementById("booking-payment-method").value="",document.getElementById("booking-booking-status").value="Draft",Bn(),Le(),Q(document.getElementById("booking-submit-btn"),!1,"Menyimpan..."),Je().then(()=>{be(),fe()})}function Qi(e){p.editItem=e,p.selectedSeats=En(e.selected_seats||[]),p.passengerDraftMap=Object.fromEntries((e.passengers||[]).map(n=>[n.seat_no,n])),p.currentFormArmadaIndex=e.armada_index||1,document.getElementById("booking-id").value=e.id,document.getElementById("booking-armada-index").value=String(e.armada_index||1),document.getElementById("booking-booking-for").value=e.booking_for,document.getElementById("booking-category").value=e.category,document.getElementById("booking-from-city").value=e.from_city,document.getElementById("booking-to-city").value=e.to_city,document.getElementById("booking-trip-date").value=e.trip_date_value,document.getElementById("booking-trip-time").value=e.trip_time_value,document.getElementById("booking-passenger-count").value=String(e.passenger_count),document.getElementById("booking-driver-name").value=e.driver_name==="Menunggu Penetapan Driver"?"":e.driver_name||"",document.getElementById("booking-additional-fare").value=String(e.additional_fare_per_passenger||0),document.getElementById("booking-pickup-location").value=e.pickup_location,document.getElementById("booking-dropoff-location").value=e.dropoff_location,document.getElementById("booking-payment-method").value=e.payment_method_value||"",Bn(),document.getElementById("booking-payment-status").value=e.payment_status,document.getElementById("booking-booking-status").value=e.booking_status,document.getElementById("booking-bank-account-code").value=e.bank_account_code||"",document.getElementById("booking-notes").value=e.notes||"";const t=(e.armada_index||1)>1?` (Armada ${e.armada_index})`:"";document.getElementById("booking-form-title").textContent="Edit Pemesanan",document.getElementById("booking-form-description").textContent=`Perbarui data pemesanan reguler yang dipilih${t}.`,Le(),Q(document.getElementById("booking-submit-btn"),!1,"Menyimpan..."),Je().then(()=>{be(),fe(e.passengers||[])})}function Yi(){return tn(),{booking_for:document.getElementById("booking-booking-for")?.value||"",category:document.getElementById("booking-category")?.value||"Reguler",from_city:document.getElementById("booking-from-city")?.value||"",to_city:document.getElementById("booking-to-city")?.value||"",trip_date:document.getElementById("booking-trip-date")?.value||"",trip_time:document.getElementById("booking-trip-time")?.value||"",passenger_count:Number(document.getElementById("booking-passenger-count")?.value||0),driver_name:document.getElementById("booking-driver-name")?.value.trim()||"",additional_fare_per_passenger:fr(),pickup_location:document.getElementById("booking-pickup-location")?.value.trim()||"",dropoff_location:document.getElementById("booking-dropoff-location")?.value.trim()||"",selected_seats:p.selectedSeats,passengers:p.selectedSeats.map(e=>({seat_no:e,name:p.passengerDraftMap?.[e]?.name||"",phone:p.passengerDraftMap?.[e]?.phone||""})),payment_method:document.getElementById("booking-payment-method")?.value||"",payment_status:document.getElementById("booking-payment-status")?.value||"Belum Bayar",booking_status:document.getElementById("booking-booking-status")?.value||"Draft",bank_account_code:document.getElementById("booking-bank-account-code")?.value||"",notes:document.getElementById("booking-notes")?.value.trim()||"",armada_index:p.currentFormArmadaIndex||1}}let nn=null;async function ed(e){const t=await E(`/bookings/${e}`);t.category==="Paket"&&nn?(nn(t),q("package-form-modal")):(Qi(t),q("booking-form-modal"))}function td(e){p.deleteItem=e,document.getElementById("booking-delete-copy").innerHTML=`Apakah Anda yakin ingin menghapus data pemesanan <strong>${c(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`,q("booking-delete-modal")}function wa(){const e=document.getElementById("bookings-access-note"),t=document.getElementById("bpg-route-tabs"),n=document.getElementById("bpg-slots-shell");e&&(e.hidden=!1),t&&(t.hidden=!0),n&&(n.hidden=!0)}function nd(e){return e==="Berangkat"?{label:"Berangkat",cls:"bpg-depart-trigger--go"}:e==="Tidak Berangkat"?{label:"Tidak Berangkat",cls:"bpg-depart-trigger--no"}:e==="Di Oper"?{label:"Di Oper",cls:"bpg-depart-trigger--oper"}:{label:"Status",cls:""}}function ad({user:e}={}){const t=document.getElementById("bookings-add-btn"),n=document.getElementById("bookings-date-picker"),a=document.getElementById("bpg-route-tabs"),r=document.getElementById("bpg-slots-shell"),o=document.getElementById("booking-form"),s=document.getElementById("booking-delete-confirm-btn"),i=document.getElementById("booking-seat-grid"),u=document.getElementById("booking-passenger-editor"),d=document.getElementById("booking-payment-method");if(p.formOptions=Gt("bookings-form-options"),p.drivers=Gt("bookings-drivers-data")||[],p.mobils=Gt("bookings-mobils-data")||[],p.currentUser=e||window.transitAuthUser||null,p.date=ot(),!xi(p.currentUser?.role)){wa();return}const l=document.getElementById("bpg-route-tabs");l&&(l.hidden=!1),r&&(r.hidden=!1);const g=document.getElementById("bookings-access-note");g&&(g.hidden=!0),n&&(n.value=p.date,n.addEventListener("change",async()=>{p.date=n.value,p.slotDriverMap={},p.slotMobilMap={},p.slotExtraArmadas={},await xe()})),a?.addEventListener("click",async h=>{const v=h.target.closest("[data-direction]");if(!v)return;const B=v.dataset.direction;B!==p.direction&&(p.direction=B,p.slotDriverMap={},p.slotMobilMap={},p.slotExtraArmadas={},document.querySelectorAll(".bpg-route-tab").forEach(D=>{D.classList.toggle("is-active",D.dataset.direction===B)}),await xe())});function w(h=null){r?.querySelectorAll("[data-depart-dropdown]").forEach(v=>{String(v.dataset.departDropdown)!==String(h)&&(v.querySelector(".bpg-depart-menu")?.removeAttribute("hidden"),v.querySelector(".bpg-depart-menu")?.setAttribute("hidden",""))})}document.addEventListener("click",h=>{h.target.closest("[data-depart-dropdown]")||w()}),r?.addEventListener("click",async h=>{const v=h.target.closest("[data-depart-toggle]"),B=h.target.closest("[data-booking-departure]"),D=h.target.closest("[data-booking-lihat]"),C=h.target.closest("[data-booking-edit]"),H=h.target.closest("[data-booking-delete]"),V=h.target.closest("[data-add-armada]"),z=h.target.closest("[data-slot-book]"),W=h.target.closest("[data-surat-jalan]");try{if(v){const R=v.dataset.departToggle,L=r.querySelector(`[data-depart-dropdown="${CSS.escape(R)}"]`)?.querySelector(".bpg-depart-menu");if(!L)return;const F=L.hasAttribute("hidden");w(R),L.toggleAttribute("hidden",!F);return}if(B){const R=B.dataset.bookingDeparture,I=B.dataset.departureStatus,L=p.bookings.find(Z=>String(Z.id)===String(R));if(!L)return;const F=L.departure_status===I?"":I;L.departure_status=F;const ne=r.querySelector(`[data-depart-dropdown="${CSS.escape(R)}"]`);if(ne){const Z=ne.querySelector(".bpg-depart-trigger"),Y=nd(F);Z.className=`bpg-depart-trigger ${Y.cls}`,Z.childNodes.forEach(ee=>{ee.nodeType===3&&(ee.textContent=Y.label)}),ne.querySelectorAll("[data-booking-departure]").forEach(ee=>{ee.classList.toggle("is-active",ee.dataset.departureStatus===F)}),ne.querySelector(".bpg-depart-menu")?.setAttribute("hidden","")}const X=p.bookings.find(Z=>String(Z.id)===String(R));await E(`/bookings/${R}/departure-status`,{method:"PATCH",body:{departure_status:F,version:X?.version??0}});return}if(D){const R=D.dataset.bookingLihat,I=p.bookings.find(L=>String(L.id)===String(R));I&&Hi(I);return}if(C){await ed(C.dataset.bookingEdit);return}if(H){const R=H.dataset.bookingDelete,I=p.bookings.find(L=>String(L.id)===String(R));td({id:R,nama:H.dataset.bookingName,version:I?.version??0});return}if(V){const R=V.dataset.addArmada,L=parseInt(V.dataset.armadaIndex||"1")+1,F=`${R}__${p.direction}`;p.slotExtraArmadas[F]=Math.max(p.slotExtraArmadas[F]||1,L),E("/bookings/armada-extras",{method:"POST",body:{trip_date:p.date,trip_time:R,armada_index:L}}).catch(()=>{}),gr(),p._pendingChoiceArmada=L,p._pendingChoiceTime=R,q("booking-type-choice-modal");return}if(z){const R=z.dataset.slotBook,I=parseInt(z.dataset.slotArmada||"1");p._pendingChoiceArmada=I,p._pendingChoiceTime=R,q("booking-type-choice-modal");return}if(W){const R=W.dataset.suratJalan,I=parseInt(W.dataset.suratJalanArmada||"1"),L=`${R}__${p.direction}__${I}`,F=p.slotDriverMap[L]||"",ne=p.slotMobilMap[L]||"",X=F?p.drivers.find(ee=>String(ee.id)===String(F)):null,Z=ne?p.mobils.find(ee=>String(ee.id)===String(ne)):null,Y=new URLSearchParams({date:p.date,trip_time:R,armada_index:String(I),direction:p.direction});X&&Y.set("driver_name",X.nama),Z&&Y.set("no_pol",Z.kode_mobil),window.open(`/dashboard/bookings/surat-jalan?${Y}`,"_blank");return}}catch(R){if(dt(R))return;k(R.message||"Gagal memuat data pemesanan")}}),r?.addEventListener("change",async h=>{const v=h.target.closest("[data-slot-driver]"),B=h.target.closest("[data-slot-mobil]");if(v){const[D,C]=v.dataset.slotDriver.split("__"),H=parseInt(C||"1"),V=v.value,z=v.options[v.selectedIndex],W=V&&z?.text.split(" (")[0]||"",R=`${D}__${p.direction}__${H}`;p.slotDriverMap[R]=V;try{await E("/bookings/slot-assign",{method:"PATCH",body:{trip_date:p.date,trip_time:D,direction:p.direction,armada_index:H,driver_id:V||null,driver_name:W}}),j("Driver berhasil diperbarui")}catch(I){k(I.message||"Gagal memperbarui driver")}}if(B){const[D,C]=B.dataset.slotMobil.split("__"),H=parseInt(C||"1"),V=B.value,z=`${D}__${p.direction}__${H}`;p.slotMobilMap[z]=V}});function P(h=1,v=""){p.editPackageItem=null;const B=document.getElementById("package-form");B&&B.reset();const D=document.getElementById("package-armada-index");D&&(D.value=String(h));const C=document.getElementById("pkg-trip-date");C&&(C.value=p.date);const H=document.getElementById("pkg-trip-time");H&&v&&(H.value=v);const V=document.getElementById("pkg-bank-account-group");V&&(V.hidden=!0);const z=document.getElementById("pkg-seat-group");z&&(z.hidden=!0);const W=document.getElementById("package-form-success-banner");W&&(W.hidden=!0);const R=document.querySelector("#package-form-modal .admin-users-dialog-head h3");R&&(R.textContent="Pengirim Paket");const I=document.getElementById("package-form-description");I&&(I.textContent="Lengkapi data pengiriman paket. Surat Bukti Pengiriman tersedia setelah disimpan."),y(),Te()}function b(h){let v={};try{v=h.notes?JSON.parse(h.notes):{}}catch(ee){console.warn("Failed to parse package notes JSON:",ee),v={}}p.editPackageItem={id:h.id,booking_code:h.booking_code,version:h.version||0};const B=document.getElementById("package-form");B&&B.reset();const D=document.getElementById("package-armada-index");D&&(D.value=String(h.armada_index||1));const C=(ee,Ue)=>{const le=document.getElementById(ee);le&&(le.value=Ue)};C("pkg-trip-date",h.trip_date_value||h.trip_date||""),C("pkg-trip-time",h.trip_time_value||h.trip_time||""),C("pkg-from-city",h.from_city||""),C("pkg-to-city",h.to_city||""),C("pkg-sender-name",h.nama_pemesanan||""),C("pkg-sender-phone",h.phone||""),C("pkg-sender-address",h.pickup_location||""),C("pkg-recipient-name",v.recipient_name||""),C("pkg-recipient-phone",v.recipient_phone||""),C("pkg-recipient-address",h.dropoff_location||""),C("pkg-item-name",v.item_name||""),C("pkg-item-qty",String(v.item_qty||h.passenger_count||1));const H=v.package_size||h.booking_for||"Kecil";C("pkg-package-size",H);const V=Array.isArray(h.selected_seats)&&h.selected_seats.length>0?h.selected_seats[0]:"";C("pkg-seat-code",V);const z=document.getElementById("pkg-seat-group");z&&(z.hidden=H!=="Besar"),C("pkg-fare-amount",String(h.price_per_seat||0));const W=Math.max(1,parseInt(v.item_qty||h.passenger_count||1,10)),R=parseInt(h.price_per_seat||0,10)||0,I=parseInt(h.total_amount||0,10)||0,L=Math.max(0,Math.round(I/W)-R);C("pkg-additional-fare",String(L));const F=h.payment_method_value||"";C("pkg-payment-method",F),C("pkg-payment-status",h.payment_status||"Belum Bayar"),C("pkg-bank-account-code",h.bank_account_code||"");const ne=document.getElementById("pkg-bank-account-group");ne&&(ne.hidden=F!=="transfer");const X=document.getElementById("package-form-success-banner");X&&(X.hidden=!0);const Z=document.querySelector("#package-form-modal .admin-users-dialog-head h3");Z&&(Z.textContent="Edit Pengiriman Paket");const Y=document.getElementById("package-form-description");Y&&(Y.textContent=`Perbarui data pengiriman paket untuk booking ${h.booking_code||""}.`),y(),Te()}nn=b;function y(){const h=parseInt(document.getElementById("pkg-fare-amount")?.value||"0",10)||0,v=parseInt(document.getElementById("pkg-additional-fare")?.value||"0",10)||0,B=parseInt(document.getElementById("pkg-item-qty")?.value||"1",10)||1,D=(h+v)*B,C=document.getElementById("pkg-total-display");C&&(C.value=D>0?"Rp "+D.toLocaleString("id-ID"):"")}document.getElementById("pkg-fare-amount")?.addEventListener("input",y),document.getElementById("pkg-additional-fare")?.addEventListener("input",y),document.getElementById("pkg-item-qty")?.addEventListener("input",y),document.getElementById("pkg-payment-method")?.addEventListener("change",h=>{const v=document.getElementById("pkg-bank-account-group");v&&(v.hidden=h.target.value!=="transfer")}),document.getElementById("pkg-package-size")?.addEventListener("change",h=>{const v=document.getElementById("pkg-seat-group");v&&(v.hidden=h.target.value!=="Besar");const B=document.getElementById("pkg-seat-code");B&&h.target.value!=="Besar"&&(B.value="")}),document.getElementById("pkg-trip-date")?.addEventListener("change",()=>{Te()}),document.getElementById("pkg-trip-time")?.addEventListener("change",()=>{Te()}),document.getElementById("pkg-from-city")?.addEventListener("change",()=>{Te()}),document.getElementById("pkg-to-city")?.addEventListener("change",()=>{Te()}),document.getElementById("package-form")?.addEventListener("submit",async h=>{h.preventDefault();const v=document.getElementById("package-submit-btn");Q(v,!0,"Menyimpan...");try{const B=parseInt(document.getElementById("pkg-fare-amount")?.value||"0",10)||0,D=parseInt(document.getElementById("pkg-additional-fare")?.value||"0",10)||0,C=parseInt(document.getElementById("pkg-item-qty")?.value||"1",10)||1,H=document.getElementById("pkg-payment-method")?.value||"",V={armada_index:parseInt(document.getElementById("package-armada-index")?.value||"1",10),trip_date:document.getElementById("pkg-trip-date")?.value||"",trip_time:document.getElementById("pkg-trip-time")?.value||"",from_city:document.getElementById("pkg-from-city")?.value||"",to_city:document.getElementById("pkg-to-city")?.value||"",sender_name:document.getElementById("pkg-sender-name")?.value.trim()||"",sender_phone:document.getElementById("pkg-sender-phone")?.value.trim()||"",sender_address:document.getElementById("pkg-sender-address")?.value.trim()||"",recipient_name:document.getElementById("pkg-recipient-name")?.value.trim()||"",recipient_phone:document.getElementById("pkg-recipient-phone")?.value.trim()||"",recipient_address:document.getElementById("pkg-recipient-address")?.value.trim()||"",item_name:document.getElementById("pkg-item-name")?.value.trim()||"",item_qty:C,package_size:document.getElementById("pkg-package-size")?.value||"",seat_code:document.getElementById("pkg-package-size")?.value==="Besar"&&document.getElementById("pkg-seat-code")?.value||"",fare_amount:B,additional_fare:D,payment_method:H||null,payment_status:document.getElementById("pkg-payment-status")?.value||"Belum Bayar",bank_account_code:H==="transfer"&&document.getElementById("pkg-bank-account-code")?.value||""},z=!!p.editPackageItem;let W;z?(V.version=p.editPackageItem.version,W=await E(`/bookings/quick-package/${p.editPackageItem.id}`,{method:"PUT",body:V})):W=await E("/bookings/quick-package",{method:"POST",body:V});const R=document.getElementById("package-form-success-banner"),I=document.getElementById("package-form-booking-code"),L=document.getElementById("package-form-download-link");R&&(R.hidden=!1),I&&(I.textContent=(z?"Paket diperbarui: ":"Kode Booking: ")+W.booking_code+(W.invoice_number&&W.invoice_number!=="-"?" | No. Surat: "+W.invoice_number:"")),L&&(L.href=W.invoice_download_url),j((z?"Paket diperbarui: ":"Paket berhasil disimpan: ")+W.booking_code),await xe(),p.editPackageItem=null}catch(B){if(dt(B))return;k(B.message||"Silakan periksa kembali data yang diinput",p.editPackageItem?"Gagal memperbarui paket":"Gagal menyimpan paket")}finally{Q(v,!1,"Menyimpan...")}}),document.getElementById("choice-passenger-btn")?.addEventListener("click",()=>{G("booking-type-choice-modal"),Vt(p._pendingChoiceArmada||1,p._pendingChoiceTime||""),q("booking-form-modal"),requestAnimationFrame(()=>Le())}),document.getElementById("choice-package-btn")?.addEventListener("click",()=>{G("booking-type-choice-modal"),P(p._pendingChoiceArmada||1,p._pendingChoiceTime||""),q("package-form-modal")}),t?.addEventListener("click",()=>{p._pendingChoiceArmada=1,p._pendingChoiceTime="",q("booking-type-choice-modal")}),i?.addEventListener("click",h=>{const v=h.target.closest("[data-seat-code]");if(!v||v.disabled)return;tn();const B=v.dataset.seatCode;p.selectedSeats.includes(B)?p.selectedSeats=p.selectedSeats.filter(D=>D!==B):p.selectedSeats.length<wn()&&(p.selectedSeats=En([...p.selectedSeats,B])),be(),fe()}),document.getElementById("booking-passenger-count")?.addEventListener("change",()=>{tn(),be(),fe(),Le()}),document.getElementById("booking-additional-fare")?.addEventListener("input",Le),document.getElementById("booking-trip-date")?.addEventListener("change",()=>{Je().then(()=>{be(),fe()})}),document.getElementById("booking-trip-time")?.addEventListener("change",()=>{Je().then(()=>{be(),fe()})});let f=!1;function N(){Le(),!f&&(f=!0,setTimeout(()=>{f=!1,Je().then(()=>{be(),fe()})},50))}return["change","input"].forEach(h=>{document.getElementById("booking-from-city")?.addEventListener(h,N),document.getElementById("booking-to-city")?.addEventListener(h,N)}),d?.addEventListener("change",Bn),u?.addEventListener("input",h=>{const v=h.target.closest("[data-passenger-seat]");if(!v)return;const B=v.dataset.passengerSeat;p.passengerDraftMap[B]={seat_no:B,name:v.querySelector("[data-passenger-name]")?.value.trim()||"",phone:v.querySelector("[data-passenger-phone]")?.value.trim()||""}}),o?.addEventListener("submit",async h=>{h.preventDefault();const v=document.getElementById("booking-submit-btn");Q(v,!0,"Menyimpan...");try{const B=Yi();if(p.editItem){const D={...B,version:p.editItem.version};await E(`/bookings/${p.editItem.id}`,{method:"PUT",body:D}),j("Data pemesanan berhasil diperbarui")}else await E("/bookings",{method:"POST",body:B}),j("Data pemesanan berhasil ditambahkan");G("booking-form-modal"),Vt(),await xe()}catch(B){if(dt(B))return;k(B.message||"Silakan periksa kembali data yang diinput","Gagal menyimpan data pemesanan")}finally{Q(v,!1,"Menyimpan...")}}),s?.addEventListener("click",async()=>{if(p.deleteItem){Q(s,!0,"Menghapus...");try{await E(`/bookings/${p.deleteItem.id}?version=${p.deleteItem.version}`,{method:"DELETE"}),j("Data pemesanan berhasil dihapus"),G("booking-delete-modal"),p.deleteItem=null,await xe()}catch(h){if(dt(h))return;k(h.message||"Gagal menghapus data pemesanan")}finally{Q(s,!1,"Menghapus...")}}}),Vt(),xe().catch(h=>{if(h.status===403){wa();return}k(h.message||"Gagal memuat data penumpang")})}function rd(e){const t=document.getElementById(e);if(!t)return{};try{return JSON.parse(t.textContent||"{}")}catch{return{}}}function od(){const e=document.querySelector("[data-regular-booking-page]");if(!e)return;const t=rd("regular-booking-route-matrix"),n=e.querySelector("[data-booking-origin]"),a=e.querySelector("[data-booking-destination]"),r=e.querySelector("[data-booking-schedule]"),o=e.querySelector("[data-booking-passengers]"),s=e.querySelector("[data-route-fare-input]"),i=e.querySelector("[data-additional-fare-input]"),u=e.querySelector("[data-estimated-total-input]"),d=e.querySelector("[data-route-feedback]"),l=e.querySelector("[data-route-feedback-title]"),g=e.querySelector("[data-route-feedback-text]"),w=e.querySelector("[data-booking-submit]"),P=Array.from(e.querySelectorAll("[data-booking-type]")),b=e.querySelector("[data-summary-booking-for]"),y=e.querySelector("[data-summary-route]"),f=e.querySelector("[data-summary-schedule]"),N=e.querySelector("[data-summary-passengers]"),h=e.querySelector("[data-summary-fare]"),v=e.querySelector("[data-summary-additional-fare]"),B=e.querySelector("[data-summary-total]"),D=new Map(P.map(I=>[I.value,I.dataset.label||I.value])),C=new Map(Array.from(r?.options||[]).filter(I=>I.value).map(I=>[I.value,I.textContent.trim()]));function H(I,L){if(!I||!L||I===L)return null;const F=t?.[I]?.[L];return F==null?null:Number(F)}function V(I,L,F){!d||!l||!g||(d.dataset.state=I,l.textContent=L,g.textContent=F)}function z(){e.querySelectorAll(".regular-booking-radio").forEach(I=>{const L=I.querySelector('input[type="radio"]');I.classList.toggle("is-selected",!!L?.checked)})}function W(I){return I<=0?"Belum dipilih":`${I} Penumpang`}function R(){const I=n?.value||"",L=a?.value||"",F=r?.value||"",ne=Number(o?.value||0),X=P.find(Ue=>Ue.checked)?.value||"",Z=H(I,L),Y=Math.max(parseInt(i?.value||"0",10)||0,0),ee=Z!==null&&ne>0?(Z+Y)*ne:null;s&&(s.value=Z!==null?K(Z):""),u&&(u.value=ee!==null?K(ee):""),!I||!L?V("idle","Tarif akan ditampilkan otomatis","Pilih asal dan tujuan untuk melihat tarif perjalanan reguler."):I===L?V("error","Asal dan tujuan tidak boleh sama","Silakan pilih tujuan yang berbeda agar tarif dapat dihitung."):Z===null?V("error","Rute belum tersedia","Rute yang Anda pilih saat ini belum tersedia. Silakan pilih kombinasi asal dan tujuan lain."):V("ready","Rute tersedia","Tarif telah diisi otomatis berdasarkan kombinasi rute dua arah yang tersedia."),w&&(w.disabled=!!(I&&L&&(I===L||Z===null))),b&&(b.textContent=D.get(X)||"Belum dipilih"),y&&(y.textContent=I&&L?`${I} - ${L}`:"Belum dipilih"),f&&(f.textContent=C.get(F)||"Belum dipilih"),N&&(N.textContent=W(ne)),h&&(h.textContent=Z!==null?K(Z):"Belum tersedia"),v&&(v.textContent=Y>0?K(Y):"Tidak ada"),B&&(B.textContent=ee!==null?K(ee):"Belum tersedia"),z()}[n,a,r,o].forEach(I=>{I?.addEventListener("change",R)}),i?.addEventListener("input",R),P.forEach(I=>{I.addEventListener("change",R)}),e.querySelector("form")?.addEventListener("reset",()=>{window.requestAnimationFrame(R)}),R()}function sd(){const e=document.querySelector("[data-regular-booking-seat-page]");if(!e)return;const t=Number(e.dataset.requiredSeatCount||0),n=Array.from(e.querySelectorAll("[data-seat-card]")),a=Array.from(e.querySelectorAll("[data-seat-input]")),r=e.querySelector("[data-seat-summary-count]"),o=e.querySelector("[data-seat-summary-list]"),s=e.querySelector("[data-seat-summary-remaining]"),i=e.querySelector("[data-seat-submit]"),u=e.querySelector("[data-seat-feedback]"),d=e.querySelector("[data-seat-feedback-title]"),l=e.querySelector("[data-seat-feedback-text]");function g(){return a.filter(y=>y.checked).map(y=>y.value)}function w(y){return y.length>0?y.join(", "):"Belum dipilih"}function P(y,f,N){!u||!d||!l||(u.dataset.state=y,d.textContent=f,l.textContent=N)}function b(){const y=g(),f=y.length,N=t>0&&f>=t;if(n.forEach(h=>{const v=h.querySelector("[data-seat-input]");if(!v)return;const B=v.disabled&&!v.checked&&h.classList.contains("is-occupied"),D=v.checked,C=B||N&&!D;B||(v.disabled=C),h.classList.toggle("is-selected",D),h.classList.toggle("is-disabled",!B&&C)}),r&&(r.textContent=`${f} dari ${t}`),o&&(o.textContent=w(y)),s&&(s.textContent=String(Math.max(t-f,0))),i&&(i.disabled=f!==t),f===0){P("idle","Pilih kursi sesuai jumlah penumpang","Jumlah kursi yang dipilih harus sama dengan jumlah penumpang pada booking draft.");return}if(f<t){P("idle","Pemilihan kursi belum lengkap",`Masih perlu memilih ${t-f} kursi lagi sebelum dapat melanjutkan.`);return}if(t===6){P("ready","Semua kursi sudah terisi","Jumlah penumpang 6 orang sudah terpenuhi dan kursi tambahan 2B ikut terpakai.");return}P("ready","Kursi sudah sesuai","Jumlah kursi yang dipilih sudah sesuai dengan jumlah penumpang dan siap disimpan.")}a.forEach(y=>{y.addEventListener("change",()=>{b()})}),b()}let Ke=null,Ct=!1,Ba="",id=3e3,Ia=0;const xt=[],A=e=>document.getElementById(e);async function br(e){const t=e.trim();if(!t)return;const n=Date.now();if(!(t===Ba&&n-Ia<id)){Ba=t,Ia=n,Re("Memproses scan…");try{const a=await E("/scan-qr",{method:"POST",body:{qr_token:t}});dd(a),cd(a),a.already_scanned?k(a.message,"Tiket Sudah Pernah Di-Scan"):a.is_newly_eligible?j(a.message,"🎉 Eligible Diskon!"):j(a.message,"Scan Berhasil")}catch(a){ld(a.message||"Scan gagal"),k(a.message||"Scan gagal","Scan Gagal")}finally{Re(Ct?"Kamera aktif — arahkan ke QR code.":"")}}}function dd(e){A("qrscan-result-idle").hidden=!0,A("qrscan-result-card").hidden=!1;const t=e.booking||{},n=e.passenger||{},a=e.loyalty_count,r=e.loyalty_target,o=e.discount_eligible,s=Math.min(Math.round(a/r*100),100),i=e.already_scanned?"warn":e.success?"success":"error";A("qrscan-result-header").className="qrscan-result-header qrscan-result-header--"+i,A("qrscan-result-icon").innerHTML=e.already_scanned?gd():e.success?pd():hr(),A("qrscan-result-title").textContent=t.booking_code||"-",A("qrscan-result-subtitle").textContent=e.message,A("qr-res-name").textContent=n.name||t.nama_pemesanan||"-",A("qr-res-code").textContent=t.booking_code||"-",A("qr-res-route").textContent=t.route_label||"-",A("qr-res-datetime").textContent=(t.trip_date||"-")+" "+(t.trip_time||""),A("qr-res-seats").textContent=n.seat_no||t.selected_seats||"-",A("qr-res-pax").textContent=(t.passenger_count||0)+" Orang",A("qr-res-loyalty-label").textContent=a+" / "+r,A("qr-res-loyalty-fill").style.width=s+"%",A("qr-res-loyalty-fill").className="qrscan-loyalty-fill"+(o?" qrscan-loyalty-fill--done":""),A("qr-res-loyalty-note").textContent=o?"✅ Eligible diskon "+(e.discount_percentage||50)+"%":"Perlu "+Math.max(r-a,0)+" perjalanan lagi untuk diskon."}function ld(e){A("qrscan-result-idle").hidden=!0,A("qrscan-result-card").hidden=!1,A("qrscan-result-header").className="qrscan-result-header qrscan-result-header--error",A("qrscan-result-icon").innerHTML=hr(),A("qrscan-result-title").textContent="Scan Gagal",A("qrscan-result-subtitle").textContent=e,["qr-res-name","qr-res-code","qr-res-route","qr-res-datetime","qr-res-seats","qr-res-pax"].forEach(t=>{A(t).textContent="-"}),A("qr-res-loyalty-label").textContent="– / –",A("qr-res-loyalty-fill").style.width="0%",A("qr-res-loyalty-note").textContent=""}function cd(e){const t=e.booking,n=new Date().toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit",second:"2-digit"}),a=e.passenger||{};xt.unshift({booking:t,passenger:a,time:n,success:e.success,already_scanned:e.already_scanned,message:e.message}),kr()}function kr(){const e=A("qrscan-history-list");if(xt.length===0){e.innerHTML='<p class="qrscan-history-empty">Belum ada scan dalam sesi ini.</p>';return}e.innerHTML=xt.map(t=>{const n=t.already_scanned?"warn":t.success?"ok":"err",a=t.passenger&&t.passenger.name?t.passenger.name+(t.passenger.seat_no?" ("+t.passenger.seat_no+")":""):t.booking.nama_pemesanan||"-";return`
        <div class="qrscan-history-item qrscan-history-item--${n}">
            <div class="qrscan-history-dot"></div>
            <div class="qrscan-history-body">
                <strong>${c(t.booking.booking_code||"-")}</strong>
                <span>${c(a)}</span>
            </div>
            <span class="qrscan-history-time">${t.time}</span>
        </div>`}).join("")}function ud(){if(!window.Html5Qrcode){k("Library scanner tidak tersedia. Coba muat ulang halaman.","Error");return}A("qrscan-placeholder").hidden=!0,A("qrscan-frame").hidden=!1,A("qrscan-btn-start").hidden=!0,A("qrscan-btn-stop").hidden=!1,Ct=!0,Re("Menginisialisasi kamera…"),Ke=new window.Html5Qrcode("qrscan-reader"),Ke.start({facingMode:"environment"},{fps:10,qrbox:{width:240,height:240}},e=>{let t=e.trim();try{const n=JSON.parse(e);n&&(n.qr_token||n.passenger_qr_token)&&(t=n.qr_token||n.passenger_qr_token)}catch{}br(t)},()=>{}).then(()=>{Re("Kamera aktif — arahkan ke QR code.")}).catch(e=>{Ct=!1,A("qrscan-placeholder").hidden=!1,A("qrscan-frame").hidden=!0,A("qrscan-btn-start").hidden=!1,A("qrscan-btn-stop").hidden=!0,Re("Gagal mengakses kamera. Pastikan izin kamera sudah diberikan."),k(String(e),"Kamera Error")})}function md(){Ke&&Ke.stop().catch(()=>{}).finally(()=>{Ke=null}),Ct=!1,A("qrscan-placeholder").hidden=!1,A("qrscan-frame").hidden=!0,A("qrscan-btn-start").hidden=!1,A("qrscan-btn-stop").hidden=!0,Re("Kamera dihentikan.")}function Re(e){A("qrscan-status-text").textContent=e}function pd(){return`<svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
        <path d="M8 12l3 3 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`}function hr(){return`<svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
        <path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`}function gd(){return`<svg viewBox="0 0 24 24" fill="none">
        <path d="M12 9v4M12 17h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    </svg>`}function fd(){A("qrscan-btn-start").addEventListener("click",ud),A("qrscan-btn-stop").addEventListener("click",md),A("qrscan-clear-history").addEventListener("click",()=>{xt.length=0,kr()}),A("qrscan-manual-form").addEventListener("submit",e=>{e.preventDefault();const t=A("qrscan-manual-input").value.trim();t&&(br(t),A("qrscan-manual-input").value="")})}const M={data:[],loading:!0,totalCount:0,page:1,search:"",chartLimit:10,editItem:null,deleteItem:null,isSubmitting:!1};let lt=null;const ve=15,bd=()=>`<svg viewBox="0 0 24 24" fill="none">
    <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
</svg>`,kd=()=>`<svg viewBox="0 0 24 24" fill="none">
    <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
</svg>`;function hd(){const e=document.getElementById("plkt-table-body");e&&(e.innerHTML=`
        <tr><td colspan="10" class="plkt-table-state">
            <div class="plkt-loading-inline">
                <span class="plkt-loading-inline-spinner" aria-hidden="true"></span>
                <span>Memuat data...</span>
            </div>
        </td></tr>`)}function yd(){const e=document.getElementById("plkt-table-body");e&&(e.innerHTML='<tr><td colspan="10" class="plkt-table-state plkt-empty-copy">Belum ada data penumpang.</td></tr>')}function _a(){const e=document.getElementById("plkt-table-body");if(e){if(M.loading){hd();return}if(M.data.length===0){yd();return}e.innerHTML=M.data.map((t,n)=>`
        <tr class="plkt-row">
            <td class="plkt-index-cell">${(M.page-1)*ve+n+1}</td>
            <td>
                <div class="plkt-user-cell">
                    <span class="plkt-user-avatar" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/>
                        </svg>
                    </span>
                    <div>
                        <span class="plkt-user-name">${c(t.passenger_name||"-")}</span>
                        <span class="plkt-user-seat">Kursi ${c(t.seat_no||"-")}</span>
                    </div>
                </div>
            </td>
            <td class="plkt-phone-cell">${c(t.phone||"-")}</td>
            <td>${c(t.from_city||"-")}</td>
            <td>${c(t.to_city||"-")}</td>
            <td class="plkt-date-cell">${c(t.trip_date||"-")}</td>
            <td class="plkt-time-cell">${c(t.trip_time||"-")}</td>
            <td class="plkt-tarif-cell">${c(t.tarif||"-")}</td>
            <td class="plkt-count-cell">
                <span class="plkt-count-badge">${t.booking_count}x</span>
            </td>
            <td>
                <div class="plkt-action-row">
                    <button class="plkt-icon-button" type="button"
                        data-plkt-edit="${t.id}"
                        aria-label="Edit penumpang ${c(t.passenger_name||"")}">
                        ${bd()}
                    </button>
                    <button class="plkt-icon-button plkt-icon-button-danger" type="button"
                        data-plkt-delete="${t.id}"
                        data-plkt-name="${c(t.passenger_name||"")}"
                        aria-label="Hapus penumpang ${c(t.passenger_name||"")}">
                        ${kd()}
                    </button>
                </div>
            </td>
        </tr>`).join("")}}function $a(){const e=document.getElementById("plkt-pagination-shell"),t=document.getElementById("plkt-pagination-info"),n=document.getElementById("plkt-pagination-page"),a=document.getElementById("plkt-prev-page-btn"),r=document.getElementById("plkt-next-page-btn"),o=Math.max(1,Math.ceil(M.totalCount/ve));e&&(e.hidden=o<=1),t&&(t.textContent=Be(M.page,ve,M.totalCount,M.data.length)),n&&(n.textContent=`${M.page} / ${o}`),a&&(a.disabled=M.page===1),r&&(r.disabled=M.page>=o)}async function Ae(){M.loading=!0,_a(),$a();try{const[e,t]=await Promise.all([E(`/passengers-lkt?page=${M.page}&limit=${ve}${M.search?`&search=${encodeURIComponent(M.search)}`:""}`),E(`/passengers-lkt/count${M.search?`?search=${encodeURIComponent(M.search)}`:""}`)]);M.data=Array.isArray(e)?e:[],M.totalCount=Number(t?.count||0)}catch(e){k(e.message||"Gagal memuat data","Error"),M.data=[],M.totalCount=0}finally{M.loading=!1,_a(),$a()}}function an(e){const t=document.getElementById("plkt-edit-submit-btn");M.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":"Simpan")}async function vd(e){try{const t=await E(`/passengers-lkt/${e}`);M.editItem=t;const n=document.getElementById("plkt-edit-name"),a=document.getElementById("plkt-edit-phone"),r=document.getElementById("plkt-edit-id");r&&(r.value=t.id),n&&(n.value=t.name||""),a&&(a.value=t.phone||""),an(!1),q("plkt-edit-modal")}catch{k("Gagal memuat data penumpang")}}function Ed(e,t){M.deleteItem={id:e,name:t};const n=document.getElementById("plkt-delete-copy");n&&(n.innerHTML=`Apakah Anda yakin ingin menghapus penumpang <strong>${c(t)}</strong>? Tindakan ini tidak dapat dibatalkan.`),q("plkt-delete-modal")}async function ct(){const e=document.getElementById("plkt-loyalty-chart"),t=document.getElementById("plkt-chart-empty");if(e)try{const n=await E(`/passengers-lkt/loyalty-chart?limit=${M.chartLimit}`);if(!Array.isArray(n)||n.length===0){e.hidden=!0,t&&(t.hidden=!1);return}e.hidden=!1,t&&(t.hidden=!0);const a=n.map(i=>i.passenger_name+(i.phone&&i.phone!=="-"?` (${i.phone})`:"")),r=n.map(i=>i.booking_count),o=Math.max(...r,1),s=r.map(i=>{const u=i/o;return`rgba(${Math.round(26+u*30)}, ${Math.round(35+u*80)}, ${Math.round(126+u*50)}, 0.85)`});lt&&(lt.destroy(),lt=null),lt=new window.Chart(e,{type:"bar",data:{labels:a,datasets:[{label:"Jumlah Pemesanan",data:r,backgroundColor:s,borderRadius:6,borderSkipped:!1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{title:i=>i[0].label,label:i=>` ${i.raw} kali pemesanan`}}},scales:{x:{ticks:{maxRotation:35,font:{size:11},color:"#374151"},grid:{display:!1}},y:{beginAtZero:!0,ticks:{stepSize:1,color:"#374151",font:{size:11}},grid:{color:"rgba(0,0,0,0.06)"}}}}})}catch{t&&(t.hidden=!1)}}function wd(){if(M.data.length===0){k("Tidak ada data untuk diekspor.");return}const e=["No","Nama Penumpang","No HP","Dari","Tujuan","Tanggal Berangkat","Jam","Tarif","Kali Memesan"],t=M.data.map((s,i)=>[(M.page-1)*ve+i+1,s.passenger_name||"-",s.phone||"-",s.from_city||"-",s.to_city||"-",s.trip_date||"-",s.trip_time||"-",s.tarif||"-",s.booking_count]),n=[e,...t].map(s=>s.map(i=>`"${String(i).replace(/"/g,'""')}"`).join(",")).join(`
`),a=new Blob(["\uFEFF"+n],{type:"text/csv;charset=utf-8;"}),r=URL.createObjectURL(a),o=document.createElement("a");o.href=r,o.download="data-penumpang-jet.csv",o.click(),URL.revokeObjectURL(r)}function Bd(){const e=document.getElementById("plkt-search-input"),t=document.getElementById("plkt-prev-page-btn"),n=document.getElementById("plkt-next-page-btn"),a=document.getElementById("plkt-export-btn"),r=document.getElementById("plkt-chart-limit"),o=document.getElementById("plkt-table-body"),s=document.getElementById("plkt-edit-form"),i=document.getElementById("plkt-delete-confirm-btn");e?.addEventListener("input",we(async u=>{M.search=u.target.value.trim(),M.page=1,await Ae().catch(()=>k("Gagal memuat data"))},400)),t?.addEventListener("click",async()=>{M.page<=1||(M.page-=1,await Ae().catch(()=>k("Gagal memuat data")))}),n?.addEventListener("click",async()=>{const u=Math.max(1,Math.ceil(M.totalCount/ve));M.page>=u||(M.page+=1,await Ae().catch(()=>k("Gagal memuat data")))}),a?.addEventListener("click",wd),r?.addEventListener("change",async u=>{M.chartLimit=parseInt(u.target.value,10)||10,await ct().catch(()=>{})}),o?.addEventListener("click",async u=>{const d=u.target.closest("[data-plkt-edit]"),l=u.target.closest("[data-plkt-delete]");d&&await vd(d.dataset.plktEdit),l&&Ed(l.dataset.plktDelete,l.dataset.plktName)}),s?.addEventListener("submit",async u=>{u.preventDefault();const d=document.getElementById("plkt-edit-id")?.value,l=document.getElementById("plkt-edit-name")?.value.trim(),g=document.getElementById("plkt-edit-phone")?.value.trim();if(!l){k("Nama penumpang tidak boleh kosong");return}an(!0);try{await E(`/passengers-lkt/${d}`,{method:"PUT",body:{name:l,phone:g}}),j("Data penumpang berhasil diperbarui"),G("plkt-edit-modal"),await Promise.all([Ae(),ct()])}catch(w){k(w.message||"Gagal menyimpan data")}finally{an(!1)}}),i?.addEventListener("click",async()=>{if(M.deleteItem)try{await E(`/passengers-lkt/${M.deleteItem.id}`,{method:"DELETE"}),j("Data penumpang berhasil dihapus"),G("plkt-delete-modal"),M.deleteItem=null,(M.page-1)*ve>=M.totalCount-1&&M.page>1&&(M.page-=1),await Promise.all([Ae(),ct()])}catch(u){k(u.message||"Gagal menghapus data")}}),Ae().catch(()=>k("Gagal memuat data")),ct().catch(()=>{})}const J={data:[],loading:!0,totalCount:0,page:1,search:"",detailItem:null,isLoadingDetail:!1},Qe=20,Id=()=>`<svg viewBox="0 0 24 24" fill="none">
    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/>
</svg>`;function yr(e){const t={high:["badge-emerald","Tinggi"],medium:["badge-blue","Sedang"],low:["badge-yellow","Rendah"]},[n,a]=t[e]??["badge-gray",e??"-"];return`<span class="stock-value-badge ${n}">${c(a)}</span>`}function vr(e){const t={active:["stock-value-badge-emerald","Aktif"],merged:["stock-value-badge-blue","Digabung"],inactive:["stock-value-badge-red","Nonaktif"]},[n,a]=t[e]??["stock-value-badge-blue",e??"-"];return`<span class="stock-value-badge ${n}">${c(a)}</span>`}function Er(e){return e?'<span class="stock-value-badge stock-value-badge-emerald">✓ Eligible</span>':'<span class="stock-value-badge stock-value-badge-blue">—</span>'}function _d(){const e=document.getElementById("cust-table-body");e&&(e.innerHTML=`
        <tr><td colspan="8" class="plkt-table-state">
            <div class="plkt-loading-inline">
                <span class="plkt-loading-inline-spinner" aria-hidden="true"></span>
                <span>Memuat data...</span>
            </div>
        </td></tr>`)}function $d(){const e=document.getElementById("cust-table-body");e&&(e.innerHTML='<tr><td colspan="8" class="plkt-table-state plkt-empty-copy">Belum ada data pelanggan.</td></tr>')}function Sa(){const e=document.getElementById("cust-table-body");if(e){if(J.loading){_d();return}if(J.data.length===0){$d();return}e.innerHTML=J.data.map((t,n)=>`
        <tr class="plkt-row">
            <td class="plkt-index-cell">${(J.page-1)*Qe+n+1}</td>
            <td>
                <span class="plkt-booking-code-badge">${c(t.customer_code||"-")}</span>
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
                        <span class="plkt-user-name">${c(t.display_name||"-")}</span>
                        <span class="plkt-user-seat">${yr(t.identity_confidence)}</span>
                    </div>
                </div>
            </td>
            <td class="plkt-phone-cell">${c(t.phone_normalized||t.phone_original||"-")}</td>
            <td class="text-center">
                <strong>${t.total_trip_count??0}</strong>
                <span style="color:var(--color-text-muted);font-size:.75rem"> / 5</span>
            </td>
            <td class="text-center">${Er(t.discount_eligible)}</td>
            <td class="text-center">${vr(t.status)}</td>
            <td class="text-center">
                <button class="plkt-icon-button" type="button"
                    data-cust-detail="${t.id}"
                    aria-label="Detail pelanggan ${c(t.display_name||"")}">
                    ${Id()}
                </button>
            </td>
        </tr>`).join("")}}function Sd(){const e=document.getElementById("cust-pagination-shell"),t=document.getElementById("cust-pagination-info"),n=document.getElementById("cust-pagination-page"),a=document.getElementById("cust-prev-page-btn"),r=document.getElementById("cust-next-page-btn"),o=Math.max(1,Math.ceil(J.totalCount/Qe));e&&(e.hidden=!1),t&&(t.textContent=Be(J.page,Qe,J.totalCount,J.data.length)),n&&(n.textContent=`${J.page} / ${o}`),a&&(a.disabled=J.page===1),r&&(r.disabled=J.page>=o)}async function Cd(){try{const[e,t,n]=await Promise.all([E("/customers?limit=1"),E("/customers?limit=1&discount_eligible=1"),E("/customers?limit=1&has_phone=1")]),a=document.getElementById("cust-stat-total"),r=document.getElementById("cust-stat-eligible"),o=document.getElementById("cust-stat-with-phone");a&&(a.textContent=(e?.total??0).toLocaleString("id-ID")),r&&(r.textContent=(t?.total??0).toLocaleString("id-ID")),o&&(o.textContent=(n?.total??0).toLocaleString("id-ID"))}catch{}}async function ut(){J.loading=!0,Sa();try{const e=new URLSearchParams({page:J.page,limit:Qe});J.search&&e.set("search",J.search);const t=await E(`/customers?${e.toString()}`);J.data=Array.isArray(t?.data)?t.data:[],J.totalCount=Number(t?.total??0)}catch(e){k(e.message||"Gagal memuat data pelanggan","Error"),J.data=[],J.totalCount=0}finally{J.loading=!1,Sa(),Sd()}}async function xd(e){const t=document.getElementById("cust-detail-name"),n=document.getElementById("cust-detail-code"),a=document.getElementById("cust-detail-body");t&&(t.textContent="Detail Pelanggan"),n&&(n.textContent=""),a&&(a.innerHTML=`
        <div class="plkt-loading-inline">
            <span class="plkt-loading-inline-spinner" aria-hidden="true"></span>
            <span>Memuat detail...</span>
        </div>`),q("cust-detail-modal");try{const r=await E(`/customers/${e}`);t&&(t.textContent=r.display_name||"-"),n&&(n.textContent=r.customer_code||"");const o=r.recent_bookings?.length?r.recent_bookings.map(s=>`
                <tr>
                    <td>${c(s.booking_code||"-")}</td>
                    <td>${c(s.trip_date||"-")}</td>
                    <td>${c(s.from_city||"-")} → ${c(s.to_city||"-")}</td>
                    <td>${c(s.booking_status||"-")}</td>
                </tr>`).join(""):'<tr><td colspan="4" class="plkt-table-state plkt-empty-copy">Belum ada riwayat perjalanan.</td></tr>';a&&(a.innerHTML=`
            <dl class="cust-detail-dl">
                <dt>Nama</dt>
                <dd>${c(r.display_name||"-")}</dd>
                <dt>Nomor HP</dt>
                <dd>${c(r.phone_normalized||r.phone_original||"-")}</dd>
                <dt>Email</dt>
                <dd>${c(r.email||"-")}</dd>
                <dt>Status</dt>
                <dd>${vr(r.status)}</dd>
                <dt>Kepercayaan Data</dt>
                <dd>${yr(r.identity_confidence)}</dd>
                <dt>Total Perjalanan</dt>
                <dd><strong>${r.total_trip_count??0}</strong> / 5</dd>
                <dt>Eligible Diskon</dt>
                <dd>${Er(r.discount_eligible)}</dd>
                <dt>Scan Seumur Hidup</dt>
                <dd>${r.lifetime_scan_count??0}×</dd>
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
                    <tbody>${o}</tbody>
                </table>
            </div>`)}catch(r){a&&(a.innerHTML=`<p class="plkt-empty-copy">Gagal memuat detail: ${c(r.message||"Terjadi kesalahan")}</p>`)}}async function Td(){try{const t=(await E("/customers/duplicates?limit=5"))?.total??0;t===0?j("Tidak ada duplikasi pelanggan terdeteksi.","Tidak Ada Duplikasi"):k(`Terdeteksi ${t} pasang pelanggan berpotensi duplikat. Gunakan API untuk merge.`,`${t} Duplikasi Ditemukan`)}catch(e){k(e.message||"Gagal memeriksa duplikasi","Error")}}function Ad(){const e=document.getElementById("cust-search-input"),t=document.getElementById("cust-prev-page-btn"),n=document.getElementById("cust-next-page-btn"),a=document.getElementById("cust-table-body"),r=document.getElementById("cust-duplicates-btn");e?.addEventListener("input",we(async o=>{J.search=o.target.value.trim(),J.page=1,await ut().catch(()=>k("Gagal memuat data"))},400)),t?.addEventListener("click",async()=>{J.page<=1||(J.page-=1,await ut().catch(()=>k("Gagal memuat data")))}),n?.addEventListener("click",async()=>{const o=Math.max(1,Math.ceil(J.totalCount/Qe));J.page>=o||(J.page+=1,await ut().catch(()=>k("Gagal memuat data")))}),r?.addEventListener("click",Td),a?.addEventListener("click",async o=>{const s=o.target.closest("[data-cust-detail]");s&&await xd(s.dataset.custDetail)}),ut().catch(()=>k("Gagal memuat data")),Cd().catch(()=>{})}function Ld(e){return!e||e<=0?"":"Rp "+Math.floor(e).toLocaleString("id-ID")}function Md(){const e=document.querySelector("[data-fare-input]"),t=document.querySelector("[data-additional-fare-input]"),n=document.querySelector("[data-estimated-total-input]");function a(){const r=parseInt(e?.value||"0",10)||0,o=parseInt(t?.value||"0",10)||0,s=r+o;n&&(n.value=Ld(s))}e?.addEventListener("input",a),t?.addEventListener("input",a),document.querySelectorAll('.regular-booking-radio input[type="radio"]').forEach(r=>{r.addEventListener("change",()=>{document.querySelectorAll(`.regular-booking-radio input[name="${r.name}"]`).forEach(s=>{s.closest(".regular-booking-radio")?.classList.toggle("is-selected",s.checked)})})})}function Jt(e){return"Rp "+Math.floor(e).toLocaleString("id-ID")}function Ve(e){const t=document.getElementById(e);t&&(t.showModal?.()||t.setAttribute("open",""))}function Rd(e){const t=document.getElementById(e);t&&(t.close?.()||t.removeAttribute("open"))}function Pd(e){const t=e.closest("tr[data-row]");if(!t)return null;try{return JSON.parse(t.dataset.row)}catch{return null}}function Dd(e){const t=document.getElementById("show-detail-grid");if(!t)return;const n={transfer:"Transfer Bank",qris:"QRIS",cash:"Tunai","":"—"};t.innerHTML=`
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
            <span class="ddrop-detail-value" style="color:#047857;font-size:1.05rem">${Jt(e.price_per_seat)}</span>
        </div>
        <div class="ddrop-detail-item">
            <span class="ddrop-detail-label">Tambahan Ongkos</span>
            <span class="ddrop-detail-value">${e.additional_fare>0?Jt(e.additional_fare):"—"}</span>
        </div>
        <div class="ddrop-detail-item col-span-2">
            <span class="ddrop-detail-label">Total Tarif</span>
            <span class="ddrop-detail-value" style="color:#047857;font-weight:700;font-size:1.05rem">${Jt(e.total_amount)}</span>
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
    `}function Od(e){const t=document.getElementById("form-edit");if(!t)return;const n=window.__DROPPING_DATA_UPDATE_BASE__||"/dashboard/dropping-data";t.action=`${n}/${e.id}`;const a=(r,o)=>{const s=t.querySelector(`[name="${r}"]`);s&&(s.value=o??"")};a("version",e.version),a("passenger_name",e.passenger_name),a("passenger_phone",e.passenger_phone),a("from_city",e.from_city),a("to_city",e.to_city),a("pickup_location",e.pickup_location),a("dropoff_location",e.dropoff_location),a("price_per_seat",e.price_per_seat),a("additional_fare",e.additional_fare),a("trip_date",e.trip_date),a("trip_time",e.trip_time),a("notes",e.notes),a("payment_method",e.payment_method),a("payment_status",e.payment_status),a("driver_id",e.driver_id),a("mobil_id",e.mobil_id)}function jd(e){const t=document.getElementById("form-delete"),n=document.getElementById("delete-booking-code");if(!t||!n)return;const a=window.__DROPPING_DATA_UPDATE_BASE__||"/dashboard/dropping-data";t.action=`${a}/${e.id}?version=${encodeURIComponent(e.version??0)}`,n.textContent=e.booking_code}function qd(){window.__DROPPING_DATA_UPDATE_BASE__="/dashboard/dropping-data",document.getElementById("btn-open-create")?.addEventListener("click",()=>{Ve("modal-create")}),document.getElementById("btn-open-create-empty")?.addEventListener("click",()=>{Ve("modal-create")}),document.addEventListener("click",e=>{const t=e.target.closest("[data-action]");if(!t)return;const n=t.dataset.action,a=Pd(t);a&&(n==="show"?(Dd(a),Ve("modal-show")):n==="edit"?(Od(a),Ve("modal-edit")):n==="delete"&&(jd(a),Ve("modal-delete")))}),document.querySelectorAll("[data-close-modal]").forEach(e=>{e.addEventListener("click",()=>Rd(e.dataset.closeModal))}),document.querySelectorAll(".ddrop-modal").forEach(e=>{e.addEventListener("click",t=>{t.target===e&&(e.close?.()||e.removeAttribute("open"))})})}const Nd=500,Ud=2e3,Hd=["05:30:00","07:00:00","09:00:00","13:00:00","16:00:00","19:00:00"],Fd=["05:30:00","07:00:00","09:00:00","13:00:00","16:00:00","19:00:00"],oe={targetDate:null,trips:[],statistics:[],drivers:[]};let Kt=null;const Me=new Map;function Gd(){const e=document.getElementById("trip-planning-initial-state");if(!e)return{target_date:null,trips:[],statistics:[]};try{return JSON.parse(e.textContent||"{}")}catch{return{target_date:null,trips:[],statistics:[]}}}function Vd(e){const t=e.status,n=e.keluar_trip_substatus,a=e.id,r=[];if(t==="scheduled"&&e.trip_time&&r.push(`<button type="button" class="trip-planning-action-btn trip-planning-action-btn--success" data-action="berangkat" data-trip-id="${a}" data-testid="btn-berangkat-${a}">Berangkat</button>`),t==="scheduled"&&r.push(`<button type="button" class="trip-planning-action-btn trip-planning-action-btn--danger" data-action="tidak-berangkat" data-trip-id="${a}" data-testid="btn-tidak-berangkat-${a}">Tidak Berangkat</button>`),t==="keluar_trip"&&n==="out"&&(r.push(`<button type="button" class="trip-planning-action-btn trip-planning-action-btn--neutral" data-action="waiting-list" data-trip-id="${a}" data-testid="btn-waiting-list-${a}">Waiting List</button>`),r.push(`<button type="button" class="trip-planning-action-btn trip-planning-action-btn--neutral" data-action="tidak-keluar-trip" data-trip-id="${a}" data-testid="btn-tidak-keluar-trip-${a}">Tidak Keluar Trip</button>`)),t==="keluar_trip"&&n==="waiting_list"&&r.push(`<button type="button" class="trip-planning-action-btn trip-planning-action-btn--success" data-action="returning" data-trip-id="${a}" data-testid="btn-returning-${a}">Returning</button>`),t==="scheduled"){const o=c(e.trip_time??"");r.push(`<button type="button" class="trip-planning-action-btn trip-planning-action-btn--neutral" data-action="open-ganti-jam-modal" data-trip-id="${a}" data-trip-time="${o}" data-testid="btn-ganti-jam-${a}">Ganti Jam</button>`);const s=c(e.mobil?.home_pool??"");r.push(`<button type="button" class="trip-planning-action-btn trip-planning-action-btn--danger" data-action="open-keluar-trip-modal" data-trip-id="${a}" data-mobil-home-pool="${s}" data-testid="btn-keluar-trip-${a}">Keluar Trip</button>`)}if(e.direction==="ROHUL_TO_PKB"&&(t==="scheduled"||t==="berangkat")&&!e.has_same_day_return_pair){const o=c(e.mobil?.code??e.mobil?.kode_mobil??"-"),s=c(e.driver_id??e.driver?.id??""),i=c(e.driver?.name??e.driver?.nama??"-"),u=c(e.trip_time??"");r.push(`<button type="button" class="trip-planning-action-btn trip-planning-action-btn--neutral" data-action="open-same-day-return-modal" data-trip-id="${a}" data-mobil-code="${o}" data-driver-id="${s}" data-driver-name="${i}" data-trip-time="${u}" data-testid="btn-same-day-return-${a}">Pulang Hari Ini</button>`)}return r.join("")}function wr(e){const t=c(e.mobil?.code??e.mobil?.kode_mobil??"-"),n=c(e.driver?.name??e.driver?.nama??"-"),a=e.trip_time?c(e.trip_time):"(waiting)",r=e.status||"",o=e.keluar_trip_substatus,s=o?`${r} · ${o}`:r;return`
        <td>${t}</td>
        <td>${n}</td>
        <td>${a}</td>
        <td>${Number(e.sequence)||0}</td>
        <td>
            <span class="trip-planning-status-badge trip-planning-status-badge--${c(r)}">
                ${c(s)}
            </span>
        </td>
        <td class="trip-planning-actions-cell">
            <div class="trip-planning-action-group" data-trip-actions>
                ${Vd(e)}
            </div>
        </td>
    `}function In(e){const t=document.querySelector(`tr[data-trip-id="${e.id}"]`);if(!t)return;t.innerHTML=wr(e);const n=Me.get(String(e.id));n&&(clearTimeout(n),Me.delete(String(e.id)));const a=oe.trips.findIndex(r=>String(r.id)===String(e.id));a!==-1&&(oe.trips[a]=e)}function Br(e){const t=document.querySelector('[data-testid="trip-planning-stats-grid"]');if(t){if(!Array.isArray(e)||e.length===0){t.innerHTML='<div class="dashboard-empty-state dashboard-empty-state--block">Belum ada mobil aktif di sistem Trip Planning</div>';return}t.innerHTML=e.map(n=>{const a=Number(n.pp_count||0).toFixed(1).replace(".",","),r=n.home_pool?`<span class="trip-planning-pool-tag">${c(n.home_pool)}</span>`:"",o=n.status_breakdown||{},s=Object.entries(o),i=s.length===0?'<span class="trip-planning-status-breakdown-empty">Belum ada trip</span>':s.map(([u,d])=>`<span class="trip-planning-status-badge trip-planning-status-badge--${c(u)}">${c(u)}: ${Number(d)||0}</span>`).join(" ");return`
            <article class="dashboard-stat-card dashboard-stat-card--emerald" data-testid="mobil-stat-${c(n.mobil_code)}">
                <span class="dashboard-stat-orb dashboard-stat-orb--emerald" aria-hidden="true"></span>
                <div class="dashboard-stat-card-body">
                    <div class="dashboard-stat-copy">
                        <p class="dashboard-stat-label">${c(n.mobil_code)} ${r}</p>
                        <p class="dashboard-stat-value" data-mobil-pp="${c(n.mobil_id)}">${a} PP</p>
                        <div class="trip-planning-status-breakdown">${i}</div>
                    </div>
                </div>
            </article>
        `}).join("")}}function Ir(e){const t=e?.statistics;return t?Array.isArray(t)?t:Array.isArray(t.per_mobil)?t.per_mobil.map(n=>({mobil_id:n.mobil_id,mobil_code:n.mobil_code??n.kode_mobil??"",home_pool:n.home_pool??null,pp_count:n.pp_count??0,status_breakdown:n.status_breakdown??{}})):[]:[]}function _n(){Kt&&clearTimeout(Kt),Kt=setTimeout(async()=>{const e=oe.targetDate;if(e)try{const t=await E(`/trip-planning/dashboard?date=${encodeURIComponent(e)}`),n=Ir(t);oe.statistics=n,Br(n)}catch(t){window.console&&console.warn("[trip-planning] Stats refetch failed:",t.message)}},Nd)}function Dt(e){const t=e?.data||{};return t.error_code==="TRIP_VERSION_CONFLICT"?"Trip baru saja diubah oleh admin lain. Silakan refresh halaman.":t.error_code==="TRIP_INVALID_TRANSITION"?t.message||"Transisi trip tidak valid":t.error_code==="TRIP_SLOT_CONFLICT"?t.message||"Konflik slot trip":e?.message||"Aksi gagal"}async function _r(e,t,n){Q(n,!0);try{const a=await E(`/trip-planning/trips/${encodeURIComponent(e)}/${t}`,{method:"PATCH"});a?.trip?(In(a.trip),j(a.message||"Aksi berhasil"),_n()):Q(n,!1)}catch(a){k(Dt(a)),Q(n,!1)}}function Jd(e,t){const n=String(e),a=Me.get(n);if(a){clearTimeout(a),Me.delete(n),t.classList.remove("trip-planning-action-btn--confirming"),delete t.dataset.defaultText,t.textContent="Tidak Berangkat",_r(e,"tidak-berangkat",t);return}t.textContent="Klik lagi (2s)",t.classList.add("trip-planning-action-btn--confirming");const r=setTimeout(()=>{t.textContent="Tidak Berangkat",t.classList.remove("trip-planning-action-btn--confirming"),Me.delete(n)},Ud);Me.set(n,r)}function Kd(e,t){const n=document.getElementById("trip-planning-ganti-jam-form"),a=document.getElementById("trip-planning-ganti-jam-trip-id"),r=document.getElementById("trip-planning-ganti-jam-current-time"),o=document.getElementById("trip-planning-ganti-jam-new-time");!n||!a||!r||!o||(n.reset(),a.value=String(e),r.textContent=t||"(waiting list)",t&&Hd.includes(t)&&(o.value=t),q("trip-planning-ganti-jam-modal"))}async function zd(e){e.preventDefault();const t=document.getElementById("trip-planning-ganti-jam-trip-id"),n=document.getElementById("trip-planning-ganti-jam-new-time"),a=document.getElementById("trip-planning-ganti-jam-submit");if(!t||!n||!a)return;const r=t.value,o=n.value;if(!r||!o){k("Pilih slot baru terlebih dahulu");return}Q(a,!0);try{const s=await E(`/trip-planning/trips/${encodeURIComponent(r)}/ganti-jam`,{method:"PATCH",body:{new_trip_time:o}});s?.trip&&(In(s.trip),j(s.message||"Jam trip berhasil diubah"),_n()),G("trip-planning-ganti-jam-modal")}catch(s){k(Dt(s))}finally{Q(a,!1)}}function $r(e){const t=document.getElementById("trip-planning-keluar-trip-end-date-asterisk"),n=document.getElementById("trip-planning-keluar-trip-end-date-hint"),a=document.getElementById("trip-planning-keluar-trip-end-date");!t||!n||!a||(e==="rental"?(t.hidden=!1,n.textContent="(wajib untuk rental, min 2 hari kontrak)",a.required=!0):(t.hidden=!0,n.textContent="(opsional untuk dropping)",a.required=!1))}function Wd(e,t){const n=document.getElementById("trip-planning-keluar-trip-form"),a=document.getElementById("trip-planning-keluar-trip-trip-id");if(!(!n||!a)){if(n.reset(),a.value=String(e),t==="PKB"||t==="ROHUL"){const r=n.querySelector(`input[name="pool_target"][value="${t}"]`);r&&(r.checked=!0)}$r(null),q("trip-planning-keluar-trip-modal")}}async function Xd(e){e.preventDefault();const t=document.getElementById("trip-planning-keluar-trip-form"),n=document.getElementById("trip-planning-keluar-trip-trip-id"),a=document.getElementById("trip-planning-keluar-trip-submit");if(!t||!n||!a)return;const r=n.value,o=new FormData(t),s=o.get("reason"),i=o.get("pool_target"),u=(o.get("planned_end_date")||"").trim(),d=(o.get("note")||"").trim();if(!r||!s||!i){k("Lengkapi reason dan pool tujuan");return}if(s==="rental"&&!u){k("Planned end date wajib diisi untuk rental");return}const l={reason:s,pool_target:i};u&&(l.planned_end_date=u),d&&(l.note=d),Q(a,!0);try{const g=await E(`/trip-planning/trips/${encodeURIComponent(r)}/keluar-trip`,{method:"PATCH",body:l});g?.trip&&(In(g.trip),j(g.message||"Trip marked as keluar trip"),_n()),G("trip-planning-keluar-trip-modal")}catch(g){k(Dt(g))}finally{Q(a,!1)}}function Zd(e){const t=document.getElementById("trip-planning-sdr-driver");if(!t)return;t.innerHTML='<option value="">— Pakai sopir trip asal —</option>',(Array.isArray(oe.drivers)?oe.drivers:[]).forEach(a=>{const r=document.createElement("option");r.value=a.id,r.textContent=a.nama??a.name??"(tanpa nama)",e&&String(a.id)===String(e)&&(r.selected=!0),t.appendChild(r)})}function Qd(e,t){const n=document.getElementById("trip-planning-same-day-return-form"),a=document.getElementById("trip-planning-sdr-trip-id"),r=document.getElementById("trip-planning-sdr-origin-display"),o=document.getElementById("trip-planning-sdr-slot");if(!n||!a||!r||!o)return;n.reset(),a.value=String(e);const s=t.mobilCode||"-",i=t.driverName||"-",u=t.tripTime||"(waiting)";r.textContent=`${s} — ${i} — ${u}`,Zd(t.driverId),q("trip-planning-same-day-return-modal")}function Yd(e){const t=document.querySelector('[data-testid="trip-planning-trip-counter"]');t&&(t.textContent=String(e))}function Ca(e){if(!Array.isArray(e)){window.location.reload();return}Yd(e.length);const t=(r,o)=>{const s=r.trip_time||"99:99:99",i=o.trip_time||"99:99:99";return s<i?-1:s>i?1:(Number(r.sequence)||0)-(Number(o.sequence)||0)},n=e.filter(r=>r.direction==="ROHUL_TO_PKB").sort(t),a=e.filter(r=>r.direction==="PKB_TO_ROHUL").sort(t);xa("keberangkatan",n),xa("kepulangan",a)}function xa(e,t){const n=document.querySelector(`[data-testid="trip-planning-column-${e}"]`);if(!n){window.location.reload();return}const a=n.querySelector(`[data-testid="trip-planning-trips-table-${e}"]`),r=n.querySelector(`[data-testid="empty-state-${e}"]`);if(t.length===0){if(a&&a.closest(".trip-planning-trips-table-wrap").remove(),!r){const s=e==="keberangkatan"?"Keberangkatan":"Kepulangan",i=document.createElement("div");i.className="dashboard-empty-state dashboard-empty-state--block",i.setAttribute("data-testid",`empty-state-${e}`),i.textContent=`Belum ada trip ${s}`,n.appendChild(i)}return}r&&r.remove();let o;if(a)o=a.querySelector("tbody");else{const s=document.createElement("div");s.className="trip-planning-trips-table-wrap",s.innerHTML=`
            <table class="trip-planning-trips-table" data-testid="trip-planning-trips-table-${e}">
                <thead>
                    <tr>
                        <th>Mobil</th>
                        <th>Driver</th>
                        <th>Jam</th>
                        <th>Seq</th>
                        <th>Status</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        `,n.appendChild(s),o=s.querySelector("tbody")}o.innerHTML=t.map(s=>`
        <tr data-trip-id="${c(s.id)}" data-testid="trip-row-${c(s.id)}">
            ${wr(s)}
        </tr>
    `).join("")}async function el(){const e=oe.targetDate;if(!e){window.location.reload();return}try{const t=await E(`/trip-planning/dashboard?date=${encodeURIComponent(e)}`),n=Ir(t);if(oe.statistics=n,Br(n),Array.isArray(t?.trips_pkb_to_rohul)||Array.isArray(t?.trips_rohul_to_pkb)){const a=[].concat(t.trips_pkb_to_rohul||[]).concat(t.trips_rohul_to_pkb||[]);oe.trips=a,Ca(a)}else Array.isArray(t?.trips)?(oe.trips=t.trips,Ca(t.trips)):window.location.reload()}catch(t){window.console&&console.warn("[trip-planning] Dashboard refetch after SDR failed, falling back to reload:",t.message),window.location.reload()}}function tl(e){const t=e?.data||{};if(t.error==="same_day_return_conflict")return t.message||"Tidak bisa buat trip pulang untuk trip asal ini.";if(t.errors){const n=Object.keys(t.errors)[0];return(n?t.errors[n]?.[0]:null)||t.message||"Input tidak valid."}return Dt(e)}async function nl(e){e.preventDefault();const t=document.getElementById("trip-planning-sdr-trip-id"),n=document.getElementById("trip-planning-sdr-slot"),a=document.getElementById("trip-planning-sdr-driver"),r=document.getElementById("trip-planning-sdr-reason"),o=document.getElementById("trip-planning-sdr-note"),s=document.getElementById("trip-planning-sdr-submit");if(!t||!n||!s)return;const i=t.value,u=n.value,d=(a?.value||"").trim(),l=(r?.value||"").trim(),g=(o?.value||"").trim();if(!i||!u){k("Pilih slot jam pulang terlebih dahulu");return}if(!Fd.includes(u)){k("Slot tidak valid");return}const w={slot:u};d&&(w.driver_id=d),l&&(w.reason=l),g&&(w.note=g),Q(s,!0);try{const P=await E(`/trip-planning/trips/${encodeURIComponent(i)}/same-day-return`,{method:"POST",body:w});G("trip-planning-same-day-return-modal"),j(P?.message||"Trip pulang berhasil dibuat"),await el()}catch(P){k(tl(P))}finally{Q(s,!1)}}function al(e){const t=e.target.closest("[data-action]");if(!t||t.disabled)return;const n=t.dataset.action;if(!n)return;if(n==="open-generate-trips-modal"){q("trip-planning-generate-trips-modal");return}if(n==="confirm-generate-trips"){ol(t);return}const a=t.dataset.tripId;if(a){if(n==="tidak-berangkat"){Jd(a,t);return}if(n==="open-ganti-jam-modal"){const r=t.dataset.tripTime||"";Kd(a,r);return}if(n==="open-keluar-trip-modal"){const r=t.dataset.mobilHomePool||"";Wd(a,r);return}if(n==="open-same-day-return-modal"){const r={mobilCode:t.dataset.mobilCode||"-",driverId:t.dataset.driverId||"",driverName:t.dataset.driverName||"-",tripTime:t.dataset.tripTime||""};Qd(a,r);return}_r(a,n,t)}}function rl(e){const t=e?.data||{};return t.error_code==="TRIP_GENERATION_DRIVER_MISSING"?`${t.details?.missing_mobil_ids?.length||0} mobil belum punya driver. Atur di halaman Assignments.`:t.error==="trip_slot_conflict"||e?.status===409?t.message||"Trips sudah pernah digenerate untuk tanggal ini.":t.message||e?.message||"Generate trips gagal."}async function ol(e){const t=oe.targetDate;if(!t){k("Tanggal target tidak terdeteksi.");return}Q(e,!0),fn("Generating trips...");try{const n=await E("/trip-planning/generate",{method:"POST",body:{date:t}}),r=(Array.isArray(n?.result)?n.result:[]).reduce((o,s)=>o+(Array.isArray(s?.trip_ids)?s.trip_ids.length:0),0);G("trip-planning-generate-trips-modal"),j(`${r} trip berhasil digenerate.`),window.setTimeout(()=>window.location.reload(),1200)}catch(n){k(rl(n)),Q(e,!1)}}async function sl(){if(!document.querySelector("[data-trip-planning-page]"))return;const t=Gd();oe.targetDate=t.target_date,oe.trips=Array.isArray(t.trips)?t.trips:[],oe.statistics=Array.isArray(t.statistics)?t.statistics:[],oe.drivers=Array.isArray(t.drivers)?t.drivers:[];const n=document.querySelector("[data-trip-planning-content]");n&&n.addEventListener("click",al);const a=document.getElementById("trip-planning-ganti-jam-form");a&&a.addEventListener("submit",zd);const r=document.getElementById("trip-planning-keluar-trip-form");r&&(r.addEventListener("submit",Xd),r.addEventListener("change",s=>{s.target?.name==="reason"&&$r(s.target.value)}));const o=document.getElementById("trip-planning-same-day-return-form");o&&o.addEventListener("submit",nl)}const Ye={container:"[data-assignments-page]",matrix:"[data-assignments-matrix]",footer:"[data-assignments-footer]",saveOnly:'[data-action="save-only"]',saveGenerate:'[data-action="save-generate"]'},re={date:null,mobils:[],drivers:[],assignments:[]};let Ee=null;function il(){const e=document.getElementById("assignments-initial-state");if(!e)return{date:null,mobils:[],drivers:[],assignments:[]};try{return JSON.parse(e.textContent||"{}")}catch{return{date:null,mobils:[],drivers:[],assignments:[]}}}function Ta(e,t){return`
        <div class="trip-planning-assignments-empty-state">
            <h3>${c(e)}</h3>
            <p>${t}</p>
        </div>
    `}function dl(e,t){const n=re.drivers.map(s=>{const i=String(s.id)===String(t)?" selected":"";return`<option value="${c(s.id)}"${i}>${c(s.nama)}</option>`}).join(""),a=e.home_pool??"",r=String(a).toLowerCase(),o=a||"-";return`
        <tr data-mobil-id="${c(e.id)}" data-testid="assignments-row-${c(e.kode_mobil)}">
            <td class="assignments-cell-mobil"><strong>${c(e.kode_mobil)}</strong></td>
            <td class="assignments-cell-pool">
                <span class="assignments-pool-badge assignments-pool-badge--${c(r)}">${c(o)}</span>
            </td>
            <td class="assignments-cell-driver">
                <select class="assignments-driver-select" data-driver-select data-testid="assignments-driver-select-${c(e.kode_mobil)}">
                    <option value="">— Pilih Driver —</option>
                    ${n}
                </select>
            </td>
        </tr>
    `}function ll(){const e=Ee.querySelector(Ye.matrix),t=Ee.querySelector(Ye.footer);if(!e)return;if(!Array.isArray(re.mobils)||re.mobils.length===0){e.innerHTML=Ta("Belum ada mobil aktif",'Aktifkan mobil di <a href="/dashboard/mobil">halaman Mobil</a> untuk mulai set assignment.'),t&&(t.hidden=!0);return}if(!Array.isArray(re.drivers)||re.drivers.length===0){e.innerHTML=Ta("Belum ada driver terdaftar",'Daftarkan driver di <a href="/dashboard/drivers">halaman Driver</a> dulu.'),t&&(t.hidden=!0);return}const n=new Map((re.assignments||[]).map(r=>[String(r.mobil_id),r.driver_id])),a=re.mobils.map(r=>dl(r,n.get(String(r.id))||"")).join("");e.innerHTML=`
        <table class="trip-planning-assignments-table" data-testid="assignments-table">
            <thead>
                <tr>
                    <th>Mobil</th>
                    <th>Home Pool</th>
                    <th>Driver</th>
                </tr>
            </thead>
            <tbody>
                ${a}
            </tbody>
        </table>
    `,t&&(t.hidden=!1)}function cl(){const e=Ee.querySelectorAll("tr[data-mobil-id]"),t=[];let n=!1;return e.forEach(a=>{const r=a.dataset.mobilId,o=a.querySelector("[data-driver-select]"),s=o?o.value:"";r&&s?t.push({mobil_id:r,driver_id:s}):r&&(n=!0)}),{assignments:t,hasMissing:n}}function ul(e){const t=e?.data||{};return t.error_code==="TRIP_GENERATION_DRIVER_MISSING"?`${t.details?.missing_mobil_ids?.length||0} mobil belum punya driver. Tolong periksa assignments.`:t.error==="trip_slot_conflict"||e?.status===409?t.message||"Trips sudah pernah digenerate untuk tanggal ini.":t.message||e?.message||"Generate trips gagal."}async function Aa(e,t){const{assignments:n,hasMissing:a}=cl();if(n.length===0){k("Pilih minimal 1 driver untuk 1 mobil sebelum simpan.");return}if(a&&e){if(!window.confirm("Ada mobil tanpa driver. Generate trips akan gagal untuk mobil aktif yang tidak lengkap. Lanjutkan hanya simpan?"))return;e=!1}Q(t,!0);try{const r=await E("/trip-planning/assignments",{method:"PUT",body:{date:re.date,assignments:n}});if(re.assignments=Array.isArray(r?.assignments)?r.assignments:[],j(`${n.length} assignment tersimpan.`),!e){Q(t,!1);return}fn("Generating trips...");const o=await E("/trip-planning/generate",{method:"POST",body:{date:re.date}}),i=(Array.isArray(o?.result)?o.result:[]).reduce((u,d)=>u+(Array.isArray(d?.trip_ids)?d.trip_ids.length:0),0);j(`${i} trip berhasil digenerate. Mengalihkan ke dashboard...`),window.setTimeout(()=>{window.location.href=`/dashboard/trip-planning?date=${encodeURIComponent(re.date)}`},1500)}catch(r){k(ul(r)),Q(t,!1)}}function ml(){const e=Ee.querySelector(Ye.saveOnly),t=Ee.querySelector(Ye.saveGenerate);e&&e.addEventListener("click",()=>Aa(!1,e)),t&&t.addEventListener("click",()=>Aa(!0,t))}async function pl(){if(Ee=document.querySelector(Ye.container),!Ee)return;const e=il();re.date=e.date||null,re.mobils=Array.isArray(e.mobils)?e.mobils:[],re.drivers=Array.isArray(e.drivers)?e.drivers:[],re.assignments=Array.isArray(e.assignments)?e.assignments:[],ll(),ml()}const ce={siklusId:null,statusSiklus:null,csrfToken:null,urls:{},rows:[],drivers:[]};function gl(){const e=document.getElementById("keuangan-jet-initial-state");if(!e)return null;try{return JSON.parse(e.textContent||"{}")}catch{return null}}function $n(e){return ce.rows.find(t=>Number(t.id)===Number(e))}async function Ne(e,t={}){const n=new Headers({Accept:"application/json","Content-Type":"application/json","X-Requested-With":"XMLHttpRequest"}),a=document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");a&&n.set("X-CSRF-TOKEN",a);const r=await fetch(e,{method:"POST",headers:n,body:JSON.stringify(t),credentials:"same-origin"});let o=null;const s=r.headers.get("content-type")||"";if(r.status!==204&&(o=s.includes("application/json")?await r.json():await r.text()),!r.ok){const i=o&&(o.message||o.detail)||o&&o.errors&&Object.values(o.errors).flat()[0]||`Request gagal (${r.status})`,u=new Error(i);throw u.status=r.status,u.data=o,u}return o}async function fl(){if(window.confirm("Refresh akan re-pull data dari Bookings dan recompute formula. Lanjut?"))try{await Ne(ce.urls.refresh),j("Data refreshed dari Bookings."),setTimeout(()=>window.location.reload(),800)}catch(e){k(e.message||"Refresh gagal.")}}function bl(){q("modal-biaya-edit")}async function kl(e){e.preventDefault();const t=new FormData(e.target),n={uang_jalan:Number(t.get("uang_jalan")),biaya_kurir:Number(t.get("biaya_kurir")),biaya_cuci_mobil:Number(t.get("biaya_cuci_mobil"))};try{await Ne(ce.urls.biaya,n),j("Biaya operasional updated."),G("modal-biaya-edit"),setTimeout(()=>window.location.reload(),600)}catch(a){k(a.message||"Update biaya gagal.")}}function hl(){q("modal-driver-override")}async function yl(e){e.preventDefault();const t=new FormData(e.target),n={driver_id:t.get("driver_id"),reason:t.get("reason")||null};try{await Ne(ce.urls.driver_override,n),j("Driver actual updated."),G("modal-driver-override"),setTimeout(()=>window.location.reload(),600)}catch(a){k(a.message||"Override driver gagal.")}}function vl(e){const t=$n(e);t&&(document.getElementById("row-edit-id").value=t.id,document.getElementById("row-jenis-layanan").value=t.jenis_layanan,document.getElementById("row-sumber-rental").value=t.sumber_rental||"",document.getElementById("row-persen-admin").value=t.persen_admin,document.getElementById("row-uang-snack").value=Math.round(t.uang_snack),Sr(t.jenis_layanan),q("modal-row-edit"))}function Sr(e){const t=document.getElementById("row-sumber-rental-field"),n=document.getElementById("row-sumber-rental");e==="Rental"?(t.hidden=!1,n.required=!0):(t.hidden=!0,n.required=!1,n.value="")}function El(e){const t=document.getElementById("row-persen-admin");e==="loket"?t.value="15":e==="driver"&&(t.value="10")}async function wl(e){e.preventDefault();const t=new FormData(e.target),n=t.get("row_id"),a=$n(n);if(!a){k("Row tidak ditemukan.");return}const r={jenis_layanan:t.get("jenis_layanan"),sumber_rental:t.get("sumber_rental")||null,persen_admin:Number(t.get("persen_admin")),uang_snack:Number(t.get("uang_snack"))};try{await Ne(a.urls.update,r),j("Row updated + formula recomputed."),G("modal-row-edit"),setTimeout(()=>window.location.reload(),600)}catch(o){k(o.message||"Update row gagal.")}}function Bl(){q("modal-driver-paid")}async function Il(e){e.preventDefault();try{await Ne(ce.urls.driver_paid,{confirm:!0}),j("Driver marked paid. Siklus locked."),G("modal-driver-paid"),setTimeout(()=>window.location.reload(),800)}catch(t){k(t.message||"Mark driver paid gagal.")}}function _l(e){document.getElementById("admin-paid-row-id").value=e,q("modal-admin-paid")}async function $l(e){e.preventDefault();const n=new FormData(e.target).get("row_id"),a=$n(n);if(!a){k("Row tidak ditemukan.");return}try{await Ne(a.urls.admin_paid,{confirm:!0}),j("Admin marked paid."),G("modal-admin-paid"),setTimeout(()=>window.location.reload(),600)}catch(r){k(r.message||"Mark admin paid gagal.")}}function Sl(){document.querySelectorAll("[data-action]").forEach(e=>{const t=e.dataset.action;e.addEventListener("click",n=>{switch(n.preventDefault(),t){case"refresh":fl();break;case"open-biaya-edit":bl();break;case"open-driver-override":hl();break;case"open-row-edit":vl(e.dataset.rowId);break;case"open-driver-paid":Bl();break;case"open-admin-paid":_l(e.dataset.rowId);break}})}),document.getElementById("form-biaya-edit")?.addEventListener("submit",kl),document.getElementById("form-driver-override")?.addEventListener("submit",yl),document.getElementById("form-row-edit")?.addEventListener("submit",wl),document.getElementById("form-driver-paid")?.addEventListener("submit",Il),document.getElementById("form-admin-paid")?.addEventListener("submit",$l),document.getElementById("row-jenis-layanan")?.addEventListener("change",e=>{Sr(e.target.value)}),document.getElementById("row-sumber-rental")?.addEventListener("change",e=>{El(e.target.value)})}async function Cl(){const e=gl();e&&(ce.siklusId=e.siklus_id,ce.statusSiklus=e.status_siklus,ce.csrfToken=e.csrf_token,ce.urls=e.urls||{},ce.rows=e.rows||[],ce.drivers=e.drivers||[],Sl())}const xl={"admin-users/index":Ci,"auth/login":Es,"bookings/index":ad,"dashboard/index":Ms,"drivers/index":Fs,"mobil/index":ei,"keberangkatan/index":ii,"regular-bookings/index":od,"regular-bookings/seats":sd,"stock/index":pi,"qr-scan/index":fd,"passengers-lkt/index":Bd,"customers/index":Ad,"dropping-bookings/index":Md,"dropping-data/index":qd,"trip-planning/dashboard":sl,"trip-planning/assignments":pl,"keuangan-jet/siklus-detail":Cl};document.addEventListener("DOMContentLoaded",async()=>{hs(),vs(),kt(rr());const e=ms();e&&(e.type==="success"?j(e.message,e.title):e.type==="info"?fn(e.message,e.title):k(e.message,e.title));try{const{user:t}=await ks();t&&kt(t);const n=document.body.dataset.pageScript,a=xl[n];typeof a=="function"&&await a({user:t})}catch(t){console.error(t),k(t.message||"Terjadi kesalahan saat memuat halaman")}});
