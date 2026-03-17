function ra(e,t){return function(){return e.apply(t,arguments)}}const{toString:Ga}=Object.prototype,{getPrototypeOf:Ht}=Object,{iterator:bt,toStringTag:oa}=Symbol,kt=(e=>t=>{const n=Ga.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),ae=e=>(e=e.toLowerCase(),t=>kt(t)===e),ht=e=>t=>typeof t===e,{isArray:Le}=Array,Ce=ht("undefined");function He(e){return e!==null&&!Ce(e)&&e.constructor!==null&&!Ce(e.constructor)&&Q(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const sa=ae("ArrayBuffer");function Ja(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&sa(e.buffer),t}const Ka=ht("string"),Q=ht("function"),ia=ht("number"),Fe=e=>e!==null&&typeof e=="object",za=e=>e===!0||e===!1,Qe=e=>{if(kt(e)!=="object")return!1;const t=Ht(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(oa in e)&&!(bt in e)},Wa=e=>{if(!Fe(e)||He(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},Xa=ae("Date"),Za=ae("File"),Qa=e=>!!(e&&typeof e.uri<"u"),Ya=e=>e&&typeof e.getParts<"u",er=ae("Blob"),tr=ae("FileList"),nr=e=>Fe(e)&&Q(e.pipe);function ar(){return typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}}const sn=ar(),dn=typeof sn.FormData<"u"?sn.FormData:void 0,rr=e=>{let t;return e&&(dn&&e instanceof dn||Q(e.append)&&((t=kt(e))==="formdata"||t==="object"&&Q(e.toString)&&e.toString()==="[object FormData]"))},or=ae("URLSearchParams"),[sr,ir,dr,lr]=["ReadableStream","Request","Response","Headers"].map(ae),cr=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function Ve(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let a,r;if(typeof e!="object"&&(e=[e]),Le(e))for(a=0,r=e.length;a<r;a++)t.call(null,e[a],a,e);else{if(He(e))return;const o=n?Object.getOwnPropertyNames(e):Object.keys(e),s=o.length;let i;for(a=0;a<s;a++)i=o[a],t.call(null,e[i],i,e)}}function da(e,t){if(He(e))return null;t=t.toLowerCase();const n=Object.keys(e);let a=n.length,r;for(;a-- >0;)if(r=n[a],t===r.toLowerCase())return r;return null}const pe=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,la=e=>!Ce(e)&&e!==pe;function Mt(){const{caseless:e,skipUndefined:t}=la(this)&&this||{},n={},a=(r,o)=>{if(o==="__proto__"||o==="constructor"||o==="prototype")return;const s=e&&da(n,o)||o;Qe(n[s])&&Qe(r)?n[s]=Mt(n[s],r):Qe(r)?n[s]=Mt({},r):Le(r)?n[s]=r.slice():(!t||!Ce(r))&&(n[s]=r)};for(let r=0,o=arguments.length;r<o;r++)arguments[r]&&Ve(arguments[r],a);return n}const ur=(e,t,n,{allOwnKeys:a}={})=>(Ve(t,(r,o)=>{n&&Q(r)?Object.defineProperty(e,o,{value:ra(r,n),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(e,o,{value:r,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:a}),e),mr=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),pr=(e,t,n,a)=>{e.prototype=Object.create(t.prototype,a),Object.defineProperty(e.prototype,"constructor",{value:e,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},gr=(e,t,n,a)=>{let r,o,s;const i={};if(t=t||{},e==null)return t;do{for(r=Object.getOwnPropertyNames(e),o=r.length;o-- >0;)s=r[o],(!a||a(s,e,t))&&!i[s]&&(t[s]=e[s],i[s]=!0);e=n!==!1&&Ht(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},fr=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const a=e.indexOf(t,n);return a!==-1&&a===n},br=e=>{if(!e)return null;if(Le(e))return e;let t=e.length;if(!ia(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},kr=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&Ht(Uint8Array)),hr=(e,t)=>{const a=(e&&e[bt]).call(e);let r;for(;(r=a.next())&&!r.done;){const o=r.value;t.call(e,o[0],o[1])}},yr=(e,t)=>{let n;const a=[];for(;(n=e.exec(t))!==null;)a.push(n);return a},vr=ae("HTMLFormElement"),Er=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,a,r){return a.toUpperCase()+r}),ln=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),wr=ae("RegExp"),ca=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),a={};Ve(n,(r,o)=>{let s;(s=t(r,o,e))!==!1&&(a[o]=s||r)}),Object.defineProperties(e,a)},Br=e=>{ca(e,(t,n)=>{if(Q(e)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const a=e[n];if(Q(a)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},Ir=(e,t)=>{const n={},a=r=>{r.forEach(o=>{n[o]=!0})};return Le(e)?a(e):a(String(e).split(t)),n},Sr=()=>{},$r=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function Cr(e){return!!(e&&Q(e.append)&&e[oa]==="FormData"&&e[bt])}const _r=e=>{const t=new Array(10),n=(a,r)=>{if(Fe(a)){if(t.indexOf(a)>=0)return;if(He(a))return a;if(!("toJSON"in a)){t[r]=a;const o=Le(a)?[]:{};return Ve(a,(s,i)=>{const c=n(s,r+1);!Ce(c)&&(o[i]=c)}),t[r]=void 0,o}}return a};return n(e,0)},xr=ae("AsyncFunction"),Lr=e=>e&&(Fe(e)||Q(e))&&Q(e.then)&&Q(e.catch),ua=((e,t)=>e?setImmediate:t?((n,a)=>(pe.addEventListener("message",({source:r,data:o})=>{r===pe&&o===n&&a.length&&a.shift()()},!1),r=>{a.push(r),pe.postMessage(n,"*")}))(`axios@${Math.random()}`,[]):n=>setTimeout(n))(typeof setImmediate=="function",Q(pe.postMessage)),Tr=typeof queueMicrotask<"u"?queueMicrotask.bind(pe):typeof process<"u"&&process.nextTick||ua,Ar=e=>e!=null&&Q(e[bt]),u={isArray:Le,isArrayBuffer:sa,isBuffer:He,isFormData:rr,isArrayBufferView:Ja,isString:Ka,isNumber:ia,isBoolean:za,isObject:Fe,isPlainObject:Qe,isEmptyObject:Wa,isReadableStream:sr,isRequest:ir,isResponse:dr,isHeaders:lr,isUndefined:Ce,isDate:Xa,isFile:Za,isReactNativeBlob:Qa,isReactNative:Ya,isBlob:er,isRegExp:wr,isFunction:Q,isStream:nr,isURLSearchParams:or,isTypedArray:kr,isFileList:tr,forEach:Ve,merge:Mt,extend:ur,trim:cr,stripBOM:mr,inherits:pr,toFlatObject:gr,kindOf:kt,kindOfTest:ae,endsWith:fr,toArray:br,forEachEntry:hr,matchAll:yr,isHTMLForm:vr,hasOwnProperty:ln,hasOwnProp:ln,reduceDescriptors:ca,freezeMethods:Br,toObjectSet:Ir,toCamelCase:Er,noop:Sr,toFiniteNumber:$r,findKey:da,global:pe,isContextDefined:la,isSpecCompliantForm:Cr,toJSONObject:_r,isAsyncFn:xr,isThenable:Lr,setImmediate:ua,asap:Tr,isIterable:Ar};let I=class ma extends Error{static from(t,n,a,r,o,s){const i=new ma(t.message,n||t.code,a,r,o);return i.cause=t,i.name=t.name,t.status!=null&&i.status==null&&(i.status=t.status),s&&Object.assign(i,s),i}constructor(t,n,a,r,o){super(t),Object.defineProperty(this,"message",{value:t,enumerable:!0,writable:!0,configurable:!0}),this.name="AxiosError",this.isAxiosError=!0,n&&(this.code=n),a&&(this.config=a),r&&(this.request=r),o&&(this.response=o,this.status=o.status)}toJSON(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:u.toJSONObject(this.config),code:this.code,status:this.status}}};I.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";I.ERR_BAD_OPTION="ERR_BAD_OPTION";I.ECONNABORTED="ECONNABORTED";I.ETIMEDOUT="ETIMEDOUT";I.ERR_NETWORK="ERR_NETWORK";I.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";I.ERR_DEPRECATED="ERR_DEPRECATED";I.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";I.ERR_BAD_REQUEST="ERR_BAD_REQUEST";I.ERR_CANCELED="ERR_CANCELED";I.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";I.ERR_INVALID_URL="ERR_INVALID_URL";const Mr=null;function Rt(e){return u.isPlainObject(e)||u.isArray(e)}function pa(e){return u.endsWith(e,"[]")?e.slice(0,-2):e}function St(e,t,n){return e?e.concat(t).map(function(r,o){return r=pa(r),!n&&o?"["+r+"]":r}).join(n?".":""):t}function Rr(e){return u.isArray(e)&&!e.some(Rt)}const Pr=u.toFlatObject(u,{},null,function(t){return/^is[A-Z]/.test(t)});function yt(e,t,n){if(!u.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=u.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(f,p){return!u.isUndefined(p[f])});const a=n.metaTokens,r=n.visitor||l,o=n.dots,s=n.indexes,c=(n.Blob||typeof Blob<"u"&&Blob)&&u.isSpecCompliantForm(t);if(!u.isFunction(r))throw new TypeError("visitor must be a function");function d(m){if(m===null)return"";if(u.isDate(m))return m.toISOString();if(u.isBoolean(m))return m.toString();if(!c&&u.isBlob(m))throw new I("Blob is not supported. Use a Buffer instead.");return u.isArrayBuffer(m)||u.isTypedArray(m)?c&&typeof Blob=="function"?new Blob([m]):Buffer.from(m):m}function l(m,f,p){let E=m;if(u.isReactNative(t)&&u.isReactNativeBlob(m))return t.append(St(p,f,o),d(m)),!1;if(m&&!p&&typeof m=="object"){if(u.endsWith(f,"{}"))f=a?f:f.slice(0,-2),m=JSON.stringify(m);else if(u.isArray(m)&&Rr(m)||(u.isFileList(m)||u.endsWith(f,"[]"))&&(E=u.toArray(m)))return f=pa(f),E.forEach(function(L,R){!(u.isUndefined(L)||L===null)&&t.append(s===!0?St([f],R,o):s===null?f:f+"[]",d(L))}),!1}return Rt(m)?!0:(t.append(St(p,f,o),d(m)),!1)}const k=[],y=Object.assign(Pr,{defaultVisitor:l,convertValue:d,isVisitable:Rt});function A(m,f){if(!u.isUndefined(m)){if(k.indexOf(m)!==-1)throw Error("Circular reference detected in "+f.join("."));k.push(m),u.forEach(m,function(E,P){(!(u.isUndefined(E)||E===null)&&r.call(t,E,u.isString(P)?P.trim():P,f,y))===!0&&A(E,f?f.concat(P):[P])}),k.pop()}}if(!u.isObject(e))throw new TypeError("data must be an object");return A(e),t}function cn(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(a){return t[a]})}function Ft(e,t){this._pairs=[],e&&yt(e,this,t)}const ga=Ft.prototype;ga.append=function(t,n){this._pairs.push([t,n])};ga.toString=function(t){const n=t?function(a){return t.call(this,a,cn)}:cn;return this._pairs.map(function(r){return n(r[0])+"="+n(r[1])},"").join("&")};function Dr(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function fa(e,t,n){if(!t)return e;const a=n&&n.encode||Dr,r=u.isFunction(n)?{serialize:n}:n,o=r&&r.serialize;let s;if(o?s=o(t,r):s=u.isURLSearchParams(t)?t.toString():new Ft(t,r).toString(a),s){const i=e.indexOf("#");i!==-1&&(e=e.slice(0,i)),e+=(e.indexOf("?")===-1?"?":"&")+s}return e}class un{constructor(){this.handlers=[]}use(t,n,a){return this.handlers.push({fulfilled:t,rejected:n,synchronous:a?a.synchronous:!1,runWhen:a?a.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){u.forEach(this.handlers,function(a){a!==null&&t(a)})}}const Vt={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0},Or=typeof URLSearchParams<"u"?URLSearchParams:Ft,jr=typeof FormData<"u"?FormData:null,qr=typeof Blob<"u"?Blob:null,Nr={isBrowser:!0,classes:{URLSearchParams:Or,FormData:jr,Blob:qr},protocols:["http","https","file","blob","url","data"]},Gt=typeof window<"u"&&typeof document<"u",Pt=typeof navigator=="object"&&navigator||void 0,Ur=Gt&&(!Pt||["ReactNative","NativeScript","NS"].indexOf(Pt.product)<0),Hr=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",Fr=Gt&&window.location.href||"http://localhost",Vr=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:Gt,hasStandardBrowserEnv:Ur,hasStandardBrowserWebWorkerEnv:Hr,navigator:Pt,origin:Fr},Symbol.toStringTag,{value:"Module"})),Z={...Vr,...Nr};function Gr(e,t){return yt(e,new Z.classes.URLSearchParams,{visitor:function(n,a,r,o){return Z.isNode&&u.isBuffer(n)?(this.append(a,n.toString("base64")),!1):o.defaultVisitor.apply(this,arguments)},...t})}function Jr(e){return u.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function Kr(e){const t={},n=Object.keys(e);let a;const r=n.length;let o;for(a=0;a<r;a++)o=n[a],t[o]=e[o];return t}function ba(e){function t(n,a,r,o){let s=n[o++];if(s==="__proto__")return!0;const i=Number.isFinite(+s),c=o>=n.length;return s=!s&&u.isArray(r)?r.length:s,c?(u.hasOwnProp(r,s)?r[s]=[r[s],a]:r[s]=a,!i):((!r[s]||!u.isObject(r[s]))&&(r[s]=[]),t(n,a,r[s],o)&&u.isArray(r[s])&&(r[s]=Kr(r[s])),!i)}if(u.isFormData(e)&&u.isFunction(e.entries)){const n={};return u.forEachEntry(e,(a,r)=>{t(Jr(a),r,n,0)}),n}return null}function zr(e,t,n){if(u.isString(e))try{return(t||JSON.parse)(e),u.trim(e)}catch(a){if(a.name!=="SyntaxError")throw a}return(n||JSON.stringify)(e)}const Ge={transitional:Vt,adapter:["xhr","http","fetch"],transformRequest:[function(t,n){const a=n.getContentType()||"",r=a.indexOf("application/json")>-1,o=u.isObject(t);if(o&&u.isHTMLForm(t)&&(t=new FormData(t)),u.isFormData(t))return r?JSON.stringify(ba(t)):t;if(u.isArrayBuffer(t)||u.isBuffer(t)||u.isStream(t)||u.isFile(t)||u.isBlob(t)||u.isReadableStream(t))return t;if(u.isArrayBufferView(t))return t.buffer;if(u.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let i;if(o){if(a.indexOf("application/x-www-form-urlencoded")>-1)return Gr(t,this.formSerializer).toString();if((i=u.isFileList(t))||a.indexOf("multipart/form-data")>-1){const c=this.env&&this.env.FormData;return yt(i?{"files[]":t}:t,c&&new c,this.formSerializer)}}return o||r?(n.setContentType("application/json",!1),zr(t)):t}],transformResponse:[function(t){const n=this.transitional||Ge.transitional,a=n&&n.forcedJSONParsing,r=this.responseType==="json";if(u.isResponse(t)||u.isReadableStream(t))return t;if(t&&u.isString(t)&&(a&&!this.responseType||r)){const s=!(n&&n.silentJSONParsing)&&r;try{return JSON.parse(t,this.parseReviver)}catch(i){if(s)throw i.name==="SyntaxError"?I.from(i,I.ERR_BAD_RESPONSE,this,null,this.response):i}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:Z.classes.FormData,Blob:Z.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};u.forEach(["delete","get","head","post","put","patch"],e=>{Ge.headers[e]={}});const Wr=u.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),Xr=e=>{const t={};let n,a,r;return e&&e.split(`
`).forEach(function(s){r=s.indexOf(":"),n=s.substring(0,r).trim().toLowerCase(),a=s.substring(r+1).trim(),!(!n||t[n]&&Wr[n])&&(n==="set-cookie"?t[n]?t[n].push(a):t[n]=[a]:t[n]=t[n]?t[n]+", "+a:a)}),t},mn=Symbol("internals");function Re(e){return e&&String(e).trim().toLowerCase()}function Ye(e){return e===!1||e==null?e:u.isArray(e)?e.map(Ye):String(e)}function Zr(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let a;for(;a=n.exec(e);)t[a[1]]=a[2];return t}const Qr=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function $t(e,t,n,a,r){if(u.isFunction(a))return a.call(this,t,n);if(r&&(t=n),!!u.isString(t)){if(u.isString(a))return t.indexOf(a)!==-1;if(u.isRegExp(a))return a.test(t)}}function Yr(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,a)=>n.toUpperCase()+a)}function eo(e,t){const n=u.toCamelCase(" "+t);["get","set","has"].forEach(a=>{Object.defineProperty(e,a+n,{value:function(r,o,s){return this[a].call(this,t,r,o,s)},configurable:!0})})}let Y=class{constructor(t){t&&this.set(t)}set(t,n,a){const r=this;function o(i,c,d){const l=Re(c);if(!l)throw new Error("header name must be a non-empty string");const k=u.findKey(r,l);(!k||r[k]===void 0||d===!0||d===void 0&&r[k]!==!1)&&(r[k||c]=Ye(i))}const s=(i,c)=>u.forEach(i,(d,l)=>o(d,l,c));if(u.isPlainObject(t)||t instanceof this.constructor)s(t,n);else if(u.isString(t)&&(t=t.trim())&&!Qr(t))s(Xr(t),n);else if(u.isObject(t)&&u.isIterable(t)){let i={},c,d;for(const l of t){if(!u.isArray(l))throw TypeError("Object iterator must return a key-value pair");i[d=l[0]]=(c=i[d])?u.isArray(c)?[...c,l[1]]:[c,l[1]]:l[1]}s(i,n)}else t!=null&&o(n,t,a);return this}get(t,n){if(t=Re(t),t){const a=u.findKey(this,t);if(a){const r=this[a];if(!n)return r;if(n===!0)return Zr(r);if(u.isFunction(n))return n.call(this,r,a);if(u.isRegExp(n))return n.exec(r);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=Re(t),t){const a=u.findKey(this,t);return!!(a&&this[a]!==void 0&&(!n||$t(this,this[a],a,n)))}return!1}delete(t,n){const a=this;let r=!1;function o(s){if(s=Re(s),s){const i=u.findKey(a,s);i&&(!n||$t(a,a[i],i,n))&&(delete a[i],r=!0)}}return u.isArray(t)?t.forEach(o):o(t),r}clear(t){const n=Object.keys(this);let a=n.length,r=!1;for(;a--;){const o=n[a];(!t||$t(this,this[o],o,t,!0))&&(delete this[o],r=!0)}return r}normalize(t){const n=this,a={};return u.forEach(this,(r,o)=>{const s=u.findKey(a,o);if(s){n[s]=Ye(r),delete n[o];return}const i=t?Yr(o):String(o).trim();i!==o&&delete n[o],n[i]=Ye(r),a[i]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return u.forEach(this,(a,r)=>{a!=null&&a!==!1&&(n[r]=t&&u.isArray(a)?a.join(", "):a)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const a=new this(t);return n.forEach(r=>a.set(r)),a}static accessor(t){const a=(this[mn]=this[mn]={accessors:{}}).accessors,r=this.prototype;function o(s){const i=Re(s);a[i]||(eo(r,s),a[i]=!0)}return u.isArray(t)?t.forEach(o):o(t),this}};Y.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);u.reduceDescriptors(Y.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(a){this[n]=a}}});u.freezeMethods(Y);function Ct(e,t){const n=this||Ge,a=t||n,r=Y.from(a.headers);let o=a.data;return u.forEach(e,function(i){o=i.call(n,o,r.normalize(),t?t.status:void 0)}),r.normalize(),o}function ka(e){return!!(e&&e.__CANCEL__)}let Je=class extends I{constructor(t,n,a){super(t??"canceled",I.ERR_CANCELED,n,a),this.name="CanceledError",this.__CANCEL__=!0}};function ha(e,t,n){const a=n.config.validateStatus;!n.status||!a||a(n.status)?e(n):t(new I("Request failed with status code "+n.status,[I.ERR_BAD_REQUEST,I.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}function to(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function no(e,t){e=e||10;const n=new Array(e),a=new Array(e);let r=0,o=0,s;return t=t!==void 0?t:1e3,function(c){const d=Date.now(),l=a[o];s||(s=d),n[r]=c,a[r]=d;let k=o,y=0;for(;k!==r;)y+=n[k++],k=k%e;if(r=(r+1)%e,r===o&&(o=(o+1)%e),d-s<t)return;const A=l&&d-l;return A?Math.round(y*1e3/A):void 0}}function ao(e,t){let n=0,a=1e3/t,r,o;const s=(d,l=Date.now())=>{n=l,r=null,o&&(clearTimeout(o),o=null),e(...d)};return[(...d)=>{const l=Date.now(),k=l-n;k>=a?s(d,l):(r=d,o||(o=setTimeout(()=>{o=null,s(r)},a-k)))},()=>r&&s(r)]}const nt=(e,t,n=3)=>{let a=0;const r=no(50,250);return ao(o=>{const s=o.loaded,i=o.lengthComputable?o.total:void 0,c=s-a,d=r(c),l=s<=i;a=s;const k={loaded:s,total:i,progress:i?s/i:void 0,bytes:c,rate:d||void 0,estimated:d&&i&&l?(i-s)/d:void 0,event:o,lengthComputable:i!=null,[t?"download":"upload"]:!0};e(k)},n)},pn=(e,t)=>{const n=e!=null;return[a=>t[0]({lengthComputable:n,total:e,loaded:a}),t[1]]},gn=e=>(...t)=>u.asap(()=>e(...t)),ro=Z.hasStandardBrowserEnv?((e,t)=>n=>(n=new URL(n,Z.origin),e.protocol===n.protocol&&e.host===n.host&&(t||e.port===n.port)))(new URL(Z.origin),Z.navigator&&/(msie|trident)/i.test(Z.navigator.userAgent)):()=>!0,oo=Z.hasStandardBrowserEnv?{write(e,t,n,a,r,o,s){if(typeof document>"u")return;const i=[`${e}=${encodeURIComponent(t)}`];u.isNumber(n)&&i.push(`expires=${new Date(n).toUTCString()}`),u.isString(a)&&i.push(`path=${a}`),u.isString(r)&&i.push(`domain=${r}`),o===!0&&i.push("secure"),u.isString(s)&&i.push(`SameSite=${s}`),document.cookie=i.join("; ")},read(e){if(typeof document>"u")return null;const t=document.cookie.match(new RegExp("(?:^|; )"+e+"=([^;]*)"));return t?decodeURIComponent(t[1]):null},remove(e){this.write(e,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function so(e){return typeof e!="string"?!1:/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function io(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function ya(e,t,n){let a=!so(t);return e&&(a||n==!1)?io(e,t):t}const fn=e=>e instanceof Y?{...e}:e;function fe(e,t){t=t||{};const n={};function a(d,l,k,y){return u.isPlainObject(d)&&u.isPlainObject(l)?u.merge.call({caseless:y},d,l):u.isPlainObject(l)?u.merge({},l):u.isArray(l)?l.slice():l}function r(d,l,k,y){if(u.isUndefined(l)){if(!u.isUndefined(d))return a(void 0,d,k,y)}else return a(d,l,k,y)}function o(d,l){if(!u.isUndefined(l))return a(void 0,l)}function s(d,l){if(u.isUndefined(l)){if(!u.isUndefined(d))return a(void 0,d)}else return a(void 0,l)}function i(d,l,k){if(k in t)return a(d,l);if(k in e)return a(void 0,d)}const c={url:o,method:o,data:o,baseURL:s,transformRequest:s,transformResponse:s,paramsSerializer:s,timeout:s,timeoutMessage:s,withCredentials:s,withXSRFToken:s,adapter:s,responseType:s,xsrfCookieName:s,xsrfHeaderName:s,onUploadProgress:s,onDownloadProgress:s,decompress:s,maxContentLength:s,maxBodyLength:s,beforeRedirect:s,transport:s,httpAgent:s,httpsAgent:s,cancelToken:s,socketPath:s,responseEncoding:s,validateStatus:i,headers:(d,l,k)=>r(fn(d),fn(l),k,!0)};return u.forEach(Object.keys({...e,...t}),function(l){if(l==="__proto__"||l==="constructor"||l==="prototype")return;const k=u.hasOwnProp(c,l)?c[l]:r,y=k(e[l],t[l],l);u.isUndefined(y)&&k!==i||(n[l]=y)}),n}const va=e=>{const t=fe({},e);let{data:n,withXSRFToken:a,xsrfHeaderName:r,xsrfCookieName:o,headers:s,auth:i}=t;if(t.headers=s=Y.from(s),t.url=fa(ya(t.baseURL,t.url,t.allowAbsoluteUrls),e.params,e.paramsSerializer),i&&s.set("Authorization","Basic "+btoa((i.username||"")+":"+(i.password?unescape(encodeURIComponent(i.password)):""))),u.isFormData(n)){if(Z.hasStandardBrowserEnv||Z.hasStandardBrowserWebWorkerEnv)s.setContentType(void 0);else if(u.isFunction(n.getHeaders)){const c=n.getHeaders(),d=["content-type","content-length"];Object.entries(c).forEach(([l,k])=>{d.includes(l.toLowerCase())&&s.set(l,k)})}}if(Z.hasStandardBrowserEnv&&(a&&u.isFunction(a)&&(a=a(t)),a||a!==!1&&ro(t.url))){const c=r&&o&&oo.read(o);c&&s.set(r,c)}return t},lo=typeof XMLHttpRequest<"u",co=lo&&function(e){return new Promise(function(n,a){const r=va(e);let o=r.data;const s=Y.from(r.headers).normalize();let{responseType:i,onUploadProgress:c,onDownloadProgress:d}=r,l,k,y,A,m;function f(){A&&A(),m&&m(),r.cancelToken&&r.cancelToken.unsubscribe(l),r.signal&&r.signal.removeEventListener("abort",l)}let p=new XMLHttpRequest;p.open(r.method.toUpperCase(),r.url,!0),p.timeout=r.timeout;function E(){if(!p)return;const L=Y.from("getAllResponseHeaders"in p&&p.getAllResponseHeaders()),D={data:!i||i==="text"||i==="json"?p.responseText:p.response,status:p.status,statusText:p.statusText,headers:L,config:e,request:p};ha(function(M){n(M),f()},function(M){a(M),f()},D),p=null}"onloadend"in p?p.onloadend=E:p.onreadystatechange=function(){!p||p.readyState!==4||p.status===0&&!(p.responseURL&&p.responseURL.indexOf("file:")===0)||setTimeout(E)},p.onabort=function(){p&&(a(new I("Request aborted",I.ECONNABORTED,e,p)),p=null)},p.onerror=function(R){const D=R&&R.message?R.message:"Network Error",V=new I(D,I.ERR_NETWORK,e,p);V.event=R||null,a(V),p=null},p.ontimeout=function(){let R=r.timeout?"timeout of "+r.timeout+"ms exceeded":"timeout exceeded";const D=r.transitional||Vt;r.timeoutErrorMessage&&(R=r.timeoutErrorMessage),a(new I(R,D.clarifyTimeoutError?I.ETIMEDOUT:I.ECONNABORTED,e,p)),p=null},o===void 0&&s.setContentType(null),"setRequestHeader"in p&&u.forEach(s.toJSON(),function(R,D){p.setRequestHeader(D,R)}),u.isUndefined(r.withCredentials)||(p.withCredentials=!!r.withCredentials),i&&i!=="json"&&(p.responseType=r.responseType),d&&([y,m]=nt(d,!0),p.addEventListener("progress",y)),c&&p.upload&&([k,A]=nt(c),p.upload.addEventListener("progress",k),p.upload.addEventListener("loadend",A)),(r.cancelToken||r.signal)&&(l=L=>{p&&(a(!L||L.type?new Je(null,e,p):L),p.abort(),p=null)},r.cancelToken&&r.cancelToken.subscribe(l),r.signal&&(r.signal.aborted?l():r.signal.addEventListener("abort",l)));const P=to(r.url);if(P&&Z.protocols.indexOf(P)===-1){a(new I("Unsupported protocol "+P+":",I.ERR_BAD_REQUEST,e));return}p.send(o||null)})},uo=(e,t)=>{const{length:n}=e=e?e.filter(Boolean):[];if(t||n){let a=new AbortController,r;const o=function(d){if(!r){r=!0,i();const l=d instanceof Error?d:this.reason;a.abort(l instanceof I?l:new Je(l instanceof Error?l.message:l))}};let s=t&&setTimeout(()=>{s=null,o(new I(`timeout of ${t}ms exceeded`,I.ETIMEDOUT))},t);const i=()=>{e&&(s&&clearTimeout(s),s=null,e.forEach(d=>{d.unsubscribe?d.unsubscribe(o):d.removeEventListener("abort",o)}),e=null)};e.forEach(d=>d.addEventListener("abort",o));const{signal:c}=a;return c.unsubscribe=()=>u.asap(i),c}},mo=function*(e,t){let n=e.byteLength;if(n<t){yield e;return}let a=0,r;for(;a<n;)r=a+t,yield e.slice(a,r),a=r},po=async function*(e,t){for await(const n of go(e))yield*mo(n,t)},go=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:n,value:a}=await t.read();if(n)break;yield a}}finally{await t.cancel()}},bn=(e,t,n,a)=>{const r=po(e,t);let o=0,s,i=c=>{s||(s=!0,a&&a(c))};return new ReadableStream({async pull(c){try{const{done:d,value:l}=await r.next();if(d){i(),c.close();return}let k=l.byteLength;if(n){let y=o+=k;n(y)}c.enqueue(new Uint8Array(l))}catch(d){throw i(d),d}},cancel(c){return i(c),r.return()}},{highWaterMark:2})},kn=64*1024,{isFunction:We}=u,fo=(({Request:e,Response:t})=>({Request:e,Response:t}))(u.global),{ReadableStream:hn,TextEncoder:yn}=u.global,vn=(e,...t)=>{try{return!!e(...t)}catch{return!1}},bo=e=>{e=u.merge.call({skipUndefined:!0},fo,e);const{fetch:t,Request:n,Response:a}=e,r=t?We(t):typeof fetch=="function",o=We(n),s=We(a);if(!r)return!1;const i=r&&We(hn),c=r&&(typeof yn=="function"?(m=>f=>m.encode(f))(new yn):async m=>new Uint8Array(await new n(m).arrayBuffer())),d=o&&i&&vn(()=>{let m=!1;const f=new n(Z.origin,{body:new hn,method:"POST",get duplex(){return m=!0,"half"}}).headers.has("Content-Type");return m&&!f}),l=s&&i&&vn(()=>u.isReadableStream(new a("").body)),k={stream:l&&(m=>m.body)};r&&["text","arrayBuffer","blob","formData","stream"].forEach(m=>{!k[m]&&(k[m]=(f,p)=>{let E=f&&f[m];if(E)return E.call(f);throw new I(`Response type '${m}' is not supported`,I.ERR_NOT_SUPPORT,p)})});const y=async m=>{if(m==null)return 0;if(u.isBlob(m))return m.size;if(u.isSpecCompliantForm(m))return(await new n(Z.origin,{method:"POST",body:m}).arrayBuffer()).byteLength;if(u.isArrayBufferView(m)||u.isArrayBuffer(m))return m.byteLength;if(u.isURLSearchParams(m)&&(m=m+""),u.isString(m))return(await c(m)).byteLength},A=async(m,f)=>{const p=u.toFiniteNumber(m.getContentLength());return p??y(f)};return async m=>{let{url:f,method:p,data:E,signal:P,cancelToken:L,timeout:R,onDownloadProgress:D,onUploadProgress:V,responseType:M,headers:H,withCredentials:G="same-origin",fetchOptions:z}=va(m),W=t||fetch;M=M?(M+"").toLowerCase():"text";let $=uo([P,L&&L.toAbortSignal()],R),q=null;const F=$&&$.unsubscribe&&(()=>{$.unsubscribe()});let re;try{if(V&&d&&p!=="get"&&p!=="head"&&(re=await A(H,E))!==0){let ie=new n(f,{method:"POST",body:E,duplex:"half"}),ke;if(u.isFormData(E)&&(ke=ie.headers.get("content-type"))&&H.setContentType(ke),ie.body){const[It,ze]=pn(re,nt(gn(V)));E=bn(ie.body,kn,It,ze)}}u.isString(G)||(G=G?"include":"omit");const X=o&&"credentials"in n.prototype,ne={...z,signal:$,method:p.toUpperCase(),headers:H.normalize().toJSON(),body:E,duplex:"half",credentials:X?G:void 0};q=o&&new n(f,ne);let ee=await(o?W(q,z):W(f,ne));const ue=l&&(M==="stream"||M==="response");if(l&&(D||ue&&F)){const ie={};["status","statusText","headers"].forEach(on=>{ie[on]=ee[on]});const ke=u.toFiniteNumber(ee.headers.get("content-length")),[It,ze]=D&&pn(ke,nt(gn(D),!0))||[];ee=new a(bn(ee.body,kn,It,()=>{ze&&ze(),F&&F()}),ie)}M=M||"text";let Bt=await k[u.findKey(k,M)||"text"](ee,m);return!ue&&F&&F(),await new Promise((ie,ke)=>{ha(ie,ke,{data:Bt,headers:Y.from(ee.headers),status:ee.status,statusText:ee.statusText,config:m,request:q})})}catch(X){throw F&&F(),X&&X.name==="TypeError"&&/Load failed|fetch/i.test(X.message)?Object.assign(new I("Network Error",I.ERR_NETWORK,m,q,X&&X.response),{cause:X.cause||X}):I.from(X,X&&X.code,m,q,X&&X.response)}}},ko=new Map,Ea=e=>{let t=e&&e.env||{};const{fetch:n,Request:a,Response:r}=t,o=[a,r,n];let s=o.length,i=s,c,d,l=ko;for(;i--;)c=o[i],d=l.get(c),d===void 0&&l.set(c,d=i?new Map:bo(t)),l=d;return d};Ea();const Jt={http:Mr,xhr:co,fetch:{get:Ea}};u.forEach(Jt,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const En=e=>`- ${e}`,ho=e=>u.isFunction(e)||e===null||e===!1;function yo(e,t){e=u.isArray(e)?e:[e];const{length:n}=e;let a,r;const o={};for(let s=0;s<n;s++){a=e[s];let i;if(r=a,!ho(a)&&(r=Jt[(i=String(a)).toLowerCase()],r===void 0))throw new I(`Unknown adapter '${i}'`);if(r&&(u.isFunction(r)||(r=r.get(t))))break;o[i||"#"+s]=r}if(!r){const s=Object.entries(o).map(([c,d])=>`adapter ${c} `+(d===!1?"is not supported by the environment":"is not available in the build"));let i=n?s.length>1?`since :
`+s.map(En).join(`
`):" "+En(s[0]):"as no adapter specified";throw new I("There is no suitable adapter to dispatch the request "+i,"ERR_NOT_SUPPORT")}return r}const wa={getAdapter:yo,adapters:Jt};function _t(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new Je(null,e)}function wn(e){return _t(e),e.headers=Y.from(e.headers),e.data=Ct.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),wa.getAdapter(e.adapter||Ge.adapter,e)(e).then(function(a){return _t(e),a.data=Ct.call(e,e.transformResponse,a),a.headers=Y.from(a.headers),a},function(a){return ka(a)||(_t(e),a&&a.response&&(a.response.data=Ct.call(e,e.transformResponse,a.response),a.response.headers=Y.from(a.response.headers))),Promise.reject(a)})}const Ba="1.13.6",vt={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{vt[e]=function(a){return typeof a===e||"a"+(t<1?"n ":" ")+e}});const Bn={};vt.transitional=function(t,n,a){function r(o,s){return"[Axios v"+Ba+"] Transitional option '"+o+"'"+s+(a?". "+a:"")}return(o,s,i)=>{if(t===!1)throw new I(r(s," has been removed"+(n?" in "+n:"")),I.ERR_DEPRECATED);return n&&!Bn[s]&&(Bn[s]=!0,console.warn(r(s," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(o,s,i):!0}};vt.spelling=function(t){return(n,a)=>(console.warn(`${a} is likely a misspelling of ${t}`),!0)};function vo(e,t,n){if(typeof e!="object")throw new I("options must be an object",I.ERR_BAD_OPTION_VALUE);const a=Object.keys(e);let r=a.length;for(;r-- >0;){const o=a[r],s=t[o];if(s){const i=e[o],c=i===void 0||s(i,o,e);if(c!==!0)throw new I("option "+o+" must be "+c,I.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new I("Unknown option "+o,I.ERR_BAD_OPTION)}}const et={assertOptions:vo,validators:vt},te=et.validators;let ge=class{constructor(t){this.defaults=t||{},this.interceptors={request:new un,response:new un}}async request(t,n){try{return await this._request(t,n)}catch(a){if(a instanceof Error){let r={};Error.captureStackTrace?Error.captureStackTrace(r):r=new Error;const o=r.stack?r.stack.replace(/^.+\n/,""):"";try{a.stack?o&&!String(a.stack).endsWith(o.replace(/^.+\n.+\n/,""))&&(a.stack+=`
`+o):a.stack=o}catch{}}throw a}}_request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=fe(this.defaults,n);const{transitional:a,paramsSerializer:r,headers:o}=n;a!==void 0&&et.assertOptions(a,{silentJSONParsing:te.transitional(te.boolean),forcedJSONParsing:te.transitional(te.boolean),clarifyTimeoutError:te.transitional(te.boolean),legacyInterceptorReqResOrdering:te.transitional(te.boolean)},!1),r!=null&&(u.isFunction(r)?n.paramsSerializer={serialize:r}:et.assertOptions(r,{encode:te.function,serialize:te.function},!0)),n.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?n.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:n.allowAbsoluteUrls=!0),et.assertOptions(n,{baseUrl:te.spelling("baseURL"),withXsrfToken:te.spelling("withXSRFToken")},!0),n.method=(n.method||this.defaults.method||"get").toLowerCase();let s=o&&u.merge(o.common,o[n.method]);o&&u.forEach(["delete","get","head","post","put","patch","common"],m=>{delete o[m]}),n.headers=Y.concat(s,o);const i=[];let c=!0;this.interceptors.request.forEach(function(f){if(typeof f.runWhen=="function"&&f.runWhen(n)===!1)return;c=c&&f.synchronous;const p=n.transitional||Vt;p&&p.legacyInterceptorReqResOrdering?i.unshift(f.fulfilled,f.rejected):i.push(f.fulfilled,f.rejected)});const d=[];this.interceptors.response.forEach(function(f){d.push(f.fulfilled,f.rejected)});let l,k=0,y;if(!c){const m=[wn.bind(this),void 0];for(m.unshift(...i),m.push(...d),y=m.length,l=Promise.resolve(n);k<y;)l=l.then(m[k++],m[k++]);return l}y=i.length;let A=n;for(;k<y;){const m=i[k++],f=i[k++];try{A=m(A)}catch(p){f.call(this,p);break}}try{l=wn.call(this,A)}catch(m){return Promise.reject(m)}for(k=0,y=d.length;k<y;)l=l.then(d[k++],d[k++]);return l}getUri(t){t=fe(this.defaults,t);const n=ya(t.baseURL,t.url,t.allowAbsoluteUrls);return fa(n,t.params,t.paramsSerializer)}};u.forEach(["delete","get","head","options"],function(t){ge.prototype[t]=function(n,a){return this.request(fe(a||{},{method:t,url:n,data:(a||{}).data}))}});u.forEach(["post","put","patch"],function(t){function n(a){return function(o,s,i){return this.request(fe(i||{},{method:t,headers:a?{"Content-Type":"multipart/form-data"}:{},url:o,data:s}))}}ge.prototype[t]=n(),ge.prototype[t+"Form"]=n(!0)});let Eo=class Ia{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(o){n=o});const a=this;this.promise.then(r=>{if(!a._listeners)return;let o=a._listeners.length;for(;o-- >0;)a._listeners[o](r);a._listeners=null}),this.promise.then=r=>{let o;const s=new Promise(i=>{a.subscribe(i),o=i}).then(r);return s.cancel=function(){a.unsubscribe(o)},s},t(function(o,s,i){a.reason||(a.reason=new Je(o,s,i),n(a.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}toAbortSignal(){const t=new AbortController,n=a=>{t.abort(a)};return this.subscribe(n),t.signal.unsubscribe=()=>this.unsubscribe(n),t.signal}static source(){let t;return{token:new Ia(function(r){t=r}),cancel:t}}};function wo(e){return function(n){return e.apply(null,n)}}function Bo(e){return u.isObject(e)&&e.isAxiosError===!0}const Dt={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(Dt).forEach(([e,t])=>{Dt[t]=e});function Sa(e){const t=new ge(e),n=ra(ge.prototype.request,t);return u.extend(n,ge.prototype,t,{allOwnKeys:!0}),u.extend(n,t,null,{allOwnKeys:!0}),n.create=function(r){return Sa(fe(e,r))},n}const J=Sa(Ge);J.Axios=ge;J.CanceledError=Je;J.CancelToken=Eo;J.isCancel=ka;J.VERSION=Ba;J.toFormData=yt;J.AxiosError=I;J.Cancel=J.CanceledError;J.all=function(t){return Promise.all(t)};J.spread=wo;J.isAxiosError=Bo;J.mergeConfig=fe;J.AxiosHeaders=Y;J.formToJSON=e=>ba(u.isHTMLForm(e)?new FormData(e):e);J.getAdapter=wa.getAdapter;J.HttpStatusCode=Dt;J.default=J;const{Axios:Ji,AxiosError:Ki,CanceledError:zi,isCancel:Wi,CancelToken:Xi,VERSION:Zi,all:Qi,Cancel:Yi,isAxiosError:ed,spread:td,toFormData:nd,AxiosHeaders:ad,HttpStatusCode:rd,formToJSON:od,getAdapter:sd,mergeConfig:id}=J;window.axios=J;window.axios.defaults.headers.common["X-Requested-With"]="XMLHttpRequest";const Kt="transit_user",ce="transit_token",Ot="transit_pending_toast";function Te(){try{return typeof window<"u"&&typeof window.localStorage<"u"}catch{return!1}}function $a(){try{return typeof window<"u"&&typeof window.sessionStorage<"u"}catch{return!1}}function Io(){if(window.transitAuthUser)return window.transitAuthUser;if(!Te())return null;const e=window.localStorage.getItem(Kt);if(!e)return null;try{return JSON.parse(e)}catch{return je(),null}}function Ca(e){if(!Te()){window.transitAuthUser=e;return}window.transitAuthUser=e,window.localStorage.setItem(Kt,JSON.stringify(e))}function So(){if(!Te()){window.transitAuthUser=null;return}window.transitAuthUser=null,window.localStorage.removeItem(Kt)}function zt(){return typeof window<"u"&&typeof window.transitAuthToken=="string"&&window.transitAuthToken!==""?window.transitAuthToken:Te()?window.localStorage.getItem(ce):null}function $o(e){const t=typeof e=="string"?e:"";if(!Te()){window.transitAuthToken=t||null;return}if(window.transitAuthToken=t||null,t===""){window.localStorage.removeItem(ce),document.cookie=ce+"=; path=/; max-age=0; samesite=lax";return}window.localStorage.setItem(ce,t),document.cookie=ce+"="+t+"; path=/; max-age=86400; samesite=lax"}function Co(){if(!Te()){window.transitAuthToken=null,document.cookie=ce+"=; path=/; max-age=0; samesite=lax";return}window.transitAuthToken=null,window.localStorage.removeItem(ce),document.cookie=ce+"=; path=/; max-age=0; samesite=lax"}function _o(e){$a()&&window.sessionStorage.setItem(Ot,JSON.stringify(e))}function xo(){if(!$a())return null;const e=window.sessionStorage.getItem(Ot);if(!e)return null;window.sessionStorage.removeItem(Ot);try{return JSON.parse(e)}catch{return null}}function je(){So(),Co()}function _a(e,t){if(!e)return t;if(typeof e.detail=="string"&&e.detail!=="")return e.detail;if(typeof e.message=="string"&&e.message!=="")return e.message;if(e.errors&&typeof e.errors=="object"){const n=Object.values(e.errors).flat()[0];if(typeof n=="string"&&n!=="")return n}return t}function In(){return document.body.dataset.apiBase||"/api"}function xa(e=""){const t=String(e).replace(/^\/+/,"");return t===""?In():`${In()}/${t}`}async function v(e,t={}){const{method:n="GET",body:a=null,headers:r={},auth:o=!0}=t,s=new Headers(r);s.set("Accept","application/json"),s.set("X-Requested-With","XMLHttpRequest");let i=a;if(a&&!(a instanceof FormData)&&!(a instanceof Blob)&&(s.set("Content-Type","application/json"),i=JSON.stringify(a)),o){const k=zt();k&&s.set("Authorization",`Bearer ${k}`)}if(!["GET","HEAD","OPTIONS"].includes(n.toUpperCase())){const k=document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");k&&s.set("X-CSRF-TOKEN",k)}const c=await fetch(xa(e),{method:n,headers:s,body:i,credentials:"same-origin"});let d=null;const l=c.headers.get("content-type")||"";if(c.status!==204&&(d=l.includes("application/json")?await c.json():await c.text()),!c.ok){c.status===401&&(je(),(document.body.dataset.routeGuard||"none")==="protected"&&window.location.replace(document.body.dataset.loginUrl||"/login"));const k=_a(d,`Request gagal (${c.status})`),y=new Error(k);throw y.status=c.status,y.data=d,y}return d}async function Wt(e,t="export.csv"){const n=new Headers({Accept:"text/csv,application/octet-stream","X-Requested-With":"XMLHttpRequest"}),a=zt();a&&n.set("Authorization",`Bearer ${a}`);const r=await fetch(xa(e),{method:"GET",headers:n,credentials:"same-origin"});if(!r.ok){let k=null;throw(r.headers.get("content-type")||"").includes("application/json")&&(k=await r.json()),new Error(_a(k,"Gagal mengunduh file"))}const o=await r.blob(),c=(r.headers.get("content-disposition")||"").match(/filename="?([^"]+)"?/i)?.[1]||t,d=window.URL.createObjectURL(o),l=document.createElement("a");l.href=d,l.download=c,document.body.appendChild(l),l.click(),l.remove(),window.URL.revokeObjectURL(d)}function Pe(e,t){const n=document.getElementById(e);n&&(n.textContent=t)}function Lo(e){const t=e?.role||"";document.querySelectorAll("[data-role-scope]").forEach(n=>{const a=n.dataset.roleScope,r=a==="admin"?["Super Admin","Admin"].includes(t):a==="super"?t==="Super Admin":!0;n.hidden=!r})}function La(){return Io()}function at(e){if(Lo(e),!e)return;const t=e.nama||"Admin",n=t.trim().split(/\s+/)[0]||"Admin",a=e.email||"admin@pekanbaru.com";Pe("sidebar-user-name",t),Pe("sidebar-user-email",a),Pe("header-user-name",n),Pe("dropdown-user-name",t),Pe("dropdown-user-email",a)}function Ta(e){return typeof e.access_token=="string"&&e.access_token!==""&&$o(e.access_token),Ca(e.user),at(e.user),e}async function To(e){const t=await v("/auth/login",{method:"POST",body:e,auth:!1});return Ta(t)}async function Ao(e){const t=await v("/auth/register",{method:"POST",body:e,auth:!1});return Ta(t)}async function Sn(){const e=await v("/auth/me");return Ca(e),at(e),e}async function Mo(){try{await v("/auth/logout",{method:"POST"})}catch(e){if(e?.status!==401)throw e}je(),_o({type:"success",title:"Logout berhasil",message:"Sampai jumpa kembali!"}),window.location.replace(document.body.dataset.loginUrl||"/login")}function $n(e){window.location.replace(e)}async function Ro(){const e=document.body.dataset.routeGuard||"none",t=document.body.dataset.loginUrl||"/login",n=document.body.dataset.dashboardUrl||"/dashboard",a=La();if(e==="public"){try{const r=await Sn();return $n(n),{user:r}}catch{(a||zt())&&je()}return{user:null}}if(e==="protected")try{return{user:await Sn()}}catch{return je(),$n(t),{user:null}}return{user:a}}function Xt(){return Array.from(document.querySelectorAll(".modal-shell")).filter(e=>!e.hidden)}function Aa(){document.body.style.overflow=Xt().length>0?"hidden":""}function j(e){const t=document.getElementById(e);t&&(t.hidden=!1,Aa())}function K(e=null){if(e){const t=document.getElementById(e);t&&(t.hidden=!0)}else Xt().forEach(t=>{t.hidden=!0});Aa()}function Po(){document.addEventListener("click",e=>{const t=e.target.closest("[data-modal-open]");if(t){j(t.dataset.modalOpen);return}const n=e.target.closest("[data-modal-close]");if(n){const a=n.dataset.modalClose||n.closest(".modal-shell")?.id;K(a||void 0)}}),document.addEventListener("keydown",e=>{if(e.key!=="Escape")return;const t=Xt().pop();t&&K(t.id)})}function Zt(e,t,n){const a=document.getElementById("transit-toast-root");if(!a)return;const r=document.createElement("div");r.className=`transit-toast ${n==="error"?"is-error":""} ${n==="info"?"is-info":""}`.trim(),r.innerHTML=`
        <div>
            <strong>${e}</strong>
            <p>${t}</p>
        </div>
    `,a.appendChild(r),window.requestAnimationFrame(()=>{r.classList.add("is-visible")}),window.setTimeout(()=>{r.classList.remove("is-visible"),window.setTimeout(()=>r.remove(),180)},3600)}function U(e,t="Berhasil"){Zt(t,e,"success")}function h(e,t="Gagal"){Zt(t,e,"error")}function Do(e,t="Info"){Zt(t,e,"info")}function De(e){const t=document.querySelector("[data-sidebar]"),n=document.querySelector("[data-sidebar-overlay]");!t||!n||(t.classList.toggle("is-open",e),n.hidden=!e)}function tt(e=null){document.querySelectorAll("[data-user-dropdown]").forEach(t=>{if(e&&t===e)return;t.classList.remove("is-open");const n=t.querySelector("[data-user-menu-trigger]"),a=t.querySelector("[data-user-menu-panel]");n&&n.setAttribute("aria-expanded","false"),a&&(a.hidden=!0)})}function Oo(e,t=null){if(!e)return;const n=e.querySelector("[data-user-menu-trigger]"),a=e.querySelector("[data-user-menu-panel]"),r=t??!e.classList.contains("is-open");tt(r?e:null),e.classList.toggle("is-open",r),n&&n.setAttribute("aria-expanded",r?"true":"false"),a&&(a.hidden=!r)}function jo(){document.querySelector("[data-sidebar-open]")?.addEventListener("click",()=>{De(!0)}),document.querySelector("[data-sidebar-close]")?.addEventListener("click",()=>{De(!1)}),document.querySelector("[data-sidebar-overlay]")?.addEventListener("click",()=>{De(!1)}),document.querySelectorAll("[data-user-dropdown]").forEach(e=>{e.querySelector("[data-user-menu-trigger]")?.addEventListener("click",t=>{t.stopPropagation(),Oo(e)})}),document.addEventListener("click",e=>{e.target.closest("[data-user-dropdown]")||tt()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&(tt(),De(!1))}),window.addEventListener("resize",()=>{window.innerWidth>1100&&De(!1)}),document.querySelectorAll("[data-auth-logout]").forEach(e=>{e.addEventListener("click",async()=>{K(),tt();try{e.disabled=!0,await Mo()}catch(t){e.disabled=!1,h(t.message||"Gagal logout")}})})}const Ma={login:{title:"Selamat Datang!",description:"Masuk ke akun Anda untuk melanjutkan",submit:"Masuk",switchText:"Belum punya akun?",switchAction:"Daftar sekarang"},register:{title:"Buat Akun Baru",description:"Daftar untuk mulai menggunakan sistem",submit:"Daftar",switchText:"Sudah punya akun?",switchAction:"Masuk"}};function Cn(e,t){const n=Ma[e];t.form.dataset.authMode=e,t.title.textContent=n.title,t.description.textContent=n.description,t.submitText.textContent=n.submit,t.switchText&&(t.switchText.textContent=n.switchText),t.switchButton&&(t.switchButton.textContent=n.switchAction),t.nameField.hidden=e!=="register",t.nameInput.required=e==="register"}function qo(){const e=document.getElementById("auth-form");if(!e)return;const t={form:e,title:document.querySelector("[data-auth-title]"),description:document.querySelector("[data-auth-description]"),submitText:document.querySelector("[data-auth-submit-text]"),switchText:document.querySelector("[data-auth-switch-text]"),switchButton:document.querySelector("[data-toggle-auth-mode]"),nameField:document.getElementById("auth-name-field"),nameInput:document.getElementById("nama"),emailInput:document.getElementById("email"),passwordInput:document.getElementById("password"),passwordToggle:document.querySelector("[data-toggle-password]"),submitButton:document.getElementById("auth-submit-button")},n=document.body.dataset.dashboardUrl||"/dashboard";Cn("login",t),t.switchButton?.addEventListener("click",()=>{const a=t.form.dataset.authMode==="login"?"register":"login";Cn(a,t)}),t.passwordToggle?.addEventListener("click",()=>{const a=t.passwordInput.type==="password"?"text":"password";t.passwordInput.type=a,t.passwordToggle.textContent=a==="password"?"Lihat":"Sembunyikan"}),e.addEventListener("submit",async a=>{a.preventDefault();const r=new FormData(e),o=e.dataset.authMode||"login",s={email:String(r.get("email")||"").trim(),password:String(r.get("password")||"").trim()};o==="register"&&(s.nama=String(r.get("nama")||"").trim()),t.submitButton.disabled=!0,t.submitText.textContent=o==="login"?"Memproses...":"Mendaftarkan...";try{o==="login"?(await To(s),U("Selamat datang kembali","Login berhasil!")):(await Ao(s),U("Akun Anda telah dibuat","Registrasi berhasil!")),window.location.replace(n)}catch(i){h(i.message||"Terjadi kesalahan",o==="login"?"Login gagal":"Registrasi gagal")}finally{t.submitButton.disabled=!1,t.submitText.textContent=Ma[o].submit}})}const No=new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}),Uo=new Intl.NumberFormat("id-ID");function N(e){return No.format(Number(e)||0)}function O(e){return Uo.format(Number(e)||0)}function g(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ae(e,t=300){let n=null;return(...a)=>{window.clearTimeout(n),n=window.setTimeout(()=>e(...a),t)}}function Me(e,t,n,a){if(n===0||a===0)return"Menampilkan 0 - 0 dari 0 data";const r=(e-1)*t+1,o=r+a-1;return`Menampilkan ${r} - ${o} dari ${n} data`}function Ho(e){if(!e)return"-";const t=new Date(e);return Number.isNaN(t.getTime())?e:new Intl.DateTimeFormat("id-ID",{day:"2-digit",month:"short",year:"numeric"}).format(t)}function Ke(){return new Date().toISOString().slice(0,10)}function oe(e,t,n="Memproses..."){e&&(e.dataset.defaultText||(e.dataset.defaultText=e.textContent.trim()),e.disabled=t,e.textContent=t?n:e.dataset.defaultText)}const rt=["#059669","#10B981","#34D399","#6EE7B7","#A7F3D0"],se={revenueChart:null,passengerChart:null,mobilChart:null};function Fo(){const e=document.getElementById("dashboard-initial-state");if(!e)return{stats:{},revenueData:[],mobilRevenue:[]};try{return JSON.parse(e.textContent||"{}")}catch{return{stats:{},revenueData:[],mobilRevenue:[]}}}function Qt(e){e&&typeof e.destroy=="function"&&e.destroy()}function Vo(e,t){const n=document.querySelector(`[data-stat="${e}"]`);if(!n)return;const a=["total_uang_bersih","total_uang_pc"];n.textContent=a.includes(e)?N(t):O(t)}function Ra(e,t,n){const a=document.getElementById(e),r=document.getElementById(t);a&&(a.hidden=!n),r&&(r.hidden=n)}function Go(){return"#065f46"}function jt(){return"#d1fae5"}function Yt(){return{backgroundColor:"#ffffff",titleColor:"#064e3b",bodyColor:"#065f46",borderColor:"#d1fae5",borderWidth:1,padding:12,cornerRadius:12,displayColors:!0}}function Jo(e){const t=document.getElementById("dashboard-revenue-chart"),n=Array.isArray(e)&&e.length>0;if(Ra("dashboard-revenue-chart","dashboard-revenue-empty",n),Qt(se.revenueChart),!t||!window.Chart||!n){se.revenueChart=null;return}se.revenueChart=new window.Chart(t,{type:"line",data:{labels:e.map(a=>a.bulan),datasets:[{label:"Pendapatan Bersih",data:e.map(a=>a.uang_bersih),borderColor:"#059669",backgroundColor:"rgba(5, 150, 105, 0.08)",fill:!1,tension:.35,pointRadius:4,pointHoverRadius:5,pointBackgroundColor:"#059669",pointBorderColor:"#ffffff",pointBorderWidth:2,borderWidth:3},{label:"Uang PC",data:e.map(a=>a.uang_pc),borderColor:"#f59e0b",backgroundColor:"rgba(245, 158, 11, 0.1)",fill:!1,tension:.35,pointRadius:4,pointHoverRadius:5,pointBackgroundColor:"#f59e0b",pointBorderColor:"#ffffff",pointBorderWidth:2,borderWidth:3}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{labels:{color:Go(),usePointStyle:!0,pointStyle:"circle",boxWidth:8,boxHeight:8,padding:18}},tooltip:{...Yt(),callbacks:{label(a){return`${a.dataset.label}: ${N(a.parsed.y)}`}}}},scales:{x:{ticks:{color:"#047857",font:{size:12}},grid:{color:jt()},border:{display:!1}},y:{ticks:{color:"#047857",font:{size:12},callback(a){return`${Math.round(Number(a)/1e6)}jt`}},grid:{color:jt()},border:{display:!1}}}}})}function Ko(e){const t=document.getElementById("dashboard-passenger-chart"),n=Array.isArray(e)&&e.length>0;if(Ra("dashboard-passenger-chart","dashboard-passenger-empty",n),Qt(se.passengerChart),!t||!window.Chart||!n){se.passengerChart=null;return}se.passengerChart=new window.Chart(t,{type:"bar",data:{labels:e.map(a=>a.bulan),datasets:[{label:"Penumpang",data:e.map(a=>a.penumpang),backgroundColor:"#10B981",borderRadius:8,maxBarThickness:44}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{...Yt(),callbacks:{label(a){return`Penumpang: ${O(a.parsed.y)}`}}}},scales:{x:{ticks:{color:"#047857",font:{size:12}},grid:{color:"rgba(0, 0, 0, 0)"},border:{display:!1}},y:{ticks:{color:"#047857",font:{size:12}},grid:{color:jt()},border:{display:!1}}}}})}function zo(e){const t=document.getElementById("dashboard-mobil-list");t&&(t.innerHTML=e.map((n,a)=>`
        <div class="dashboard-mobil-item">
            <div class="dashboard-mobil-meta">
                <span class="dashboard-mobil-dot" style="background-color: ${rt[a%rt.length]}"></span>
                <div>
                    <p class="dashboard-mobil-code">${g(n.kode_mobil)}</p>
                    <p class="dashboard-mobil-trips">${O(n.total_trips)} trip</p>
                    <p class="dashboard-mobil-passengers">${O(n.total_penumpang)} penumpang</p>
                </div>
            </div>
            <p class="dashboard-mobil-value">${N(n.total_uang_bersih)}</p>
        </div>
    `).join(""))}function Wo(e){const t=document.getElementById("dashboard-mobil-chart"),n=document.getElementById("dashboard-mobil-content"),a=document.getElementById("dashboard-mobil-empty"),r=document.getElementById("dashboard-mobil-chart-empty"),o=document.getElementById("dashboard-mobil-list"),s=Array.isArray(e)&&e.length>0,i=s&&e.some(c=>Number(c.total_uang_bersih)>0);if(Qt(se.mobilChart),n&&(n.hidden=!s),a&&(a.hidden=s),t&&(t.hidden=!i),r&&(r.hidden=i),s?zo(e):o&&(o.innerHTML=""),!t||!window.Chart||!i){se.mobilChart=null;return}se.mobilChart=new window.Chart(t,{type:"doughnut",data:{labels:e.map(c=>c.kode_mobil),datasets:[{data:e.map(c=>c.total_uang_bersih),backgroundColor:e.map((c,d)=>rt[d%rt.length]),borderColor:"#ffffff",borderWidth:6,hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"58%",plugins:{legend:{display:!1},tooltip:{...Yt(),callbacks:{label(c){const d=e[c.dataIndex]||{};return`${c.label}: ${N(c.parsed)} / ${O(d.total_penumpang||0)} penumpang`}}}}}})}function _n(e){Object.entries(e.stats||{}).forEach(([t,n])=>Vo(t,n)),Jo(e.revenueData||[]),Ko(e.revenueData||[]),Wo(e.mobilRevenue||[])}async function Xo(){const[e,t,n]=await Promise.all([v("/statistics/dashboard"),v("/statistics/revenue-chart"),v("/statistics/mobil-revenue")]);return{stats:e,revenueData:t,mobilRevenue:n}}function xn(e){const t=document.querySelector("[data-dashboard-loading]"),n=document.querySelector("[data-dashboard-content]"),a=document.getElementById("dashboard-refresh-btn");t&&(t.hidden=!e),n&&(n.hidden=e),a&&(a.disabled=e)}async function Zo(){const e=document.getElementById("dashboard-refresh-btn");e&&(_n(Fo()),e.addEventListener("click",async()=>{xn(!0);try{_n(await Xo())}catch{h("Silakan coba lagi","Gagal memuat data")}finally{xn(!1)}}))}const T={data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1},_e=10;function Qo(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function Yo(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 21C15 17.4 18 14.4 18 10.5C18 7.18629 15.3137 4.5 12 4.5C8.68629 4.5 6 7.18629 6 10.5C6 14.4 9 17.4 12 21Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
            <circle cx="12" cy="10.5" r="2.25" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function es(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function ts(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function ot(e){const t=document.getElementById("driver-submit-btn");T.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":T.editItem?"Perbarui":"Simpan")}function ns(){const e=document.getElementById("drivers-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="drivers-table-state">
                <div class="drivers-loading-inline">
                    <span class="drivers-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function as(){const e=document.getElementById("drivers-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="drivers-table-state drivers-empty-copy">
                Belum ada data driver
            </td>
        </tr>
    `)}function Ln(){const e=document.getElementById("drivers-table-body");if(e){if(T.loading){ns();return}if(T.data.length===0){as();return}e.innerHTML=T.data.map((t,n)=>`
        <tr class="drivers-row" data-testid="driver-row-${t.id}">
            <td class="drivers-index-cell">${(T.page-1)*_e+n+1}</td>
            <td>
                <div class="drivers-user-cell">
                    <span class="drivers-user-avatar" aria-hidden="true">
                        ${Qo()}
                    </span>
                    <span class="drivers-user-name">${g(t.nama)}</span>
                </div>
            </td>
            <td>
                <div class="drivers-location-cell">
                    <span class="drivers-location-icon" aria-hidden="true">${Yo()}</span>
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
                        ${es()}
                    </button>
                    <button
                        class="drivers-icon-button drivers-icon-button-danger"
                        type="button"
                        data-driver-delete="${t.id}"
                        data-driver-name="${g(t.nama)}"
                        data-testid="delete-driver-${t.id}"
                        aria-label="Hapus driver ${g(t.nama)}"
                    >
                        ${ts()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function Tn(){const e=document.getElementById("drivers-pagination-shell"),t=document.getElementById("drivers-pagination-info"),n=document.getElementById("drivers-pagination-page"),a=document.getElementById("drivers-prev-page-btn"),r=document.getElementById("drivers-next-page-btn"),o=Math.max(1,Math.ceil(T.totalCount/_e));e&&(e.hidden=o<=1),t&&(t.textContent=Me(T.page,_e,T.totalCount,T.data.length)),n&&(n.textContent=`${T.page} / ${o}`),a&&(a.disabled=T.page===1),r&&(r.disabled=T.page>=o)}async function he(){T.loading=!0,Ln(),Tn();try{const[e,t]=await Promise.all([v(`/drivers?page=${T.page}&limit=${_e}${T.search?`&search=${encodeURIComponent(T.search)}`:""}`),v(`/drivers/count${T.search?`?search=${encodeURIComponent(T.search)}`:""}`)]);T.data=Array.isArray(e)?e:[],T.totalCount=Number(t.count||0)}finally{T.loading=!1,Ln(),Tn()}}function An(){const e=document.getElementById("driver-form"),t=document.getElementById("driver-form-title"),n=document.getElementById("driver-form-description"),a=document.getElementById("driver-id"),r=document.getElementById("driver-nama"),o=document.getElementById("driver-lokasi");e?.reset(),a&&(a.value=""),r&&(r.value=""),o&&(o.value=""),t&&(t.textContent="Tambah Driver Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan data driver"),T.editItem=null,ot(!1)}function rs(e){const t=document.getElementById("driver-form-title"),n=document.getElementById("driver-form-description"),a=document.getElementById("driver-id"),r=document.getElementById("driver-nama"),o=document.getElementById("driver-lokasi");T.editItem=e,a&&(a.value=e.id),r&&(r.value=e.nama),o&&(o.value=e.lokasi),t&&(t.textContent="Edit Data Driver"),n&&(n.textContent="Isi form di bawah untuk memperbarui data driver"),ot(!1)}async function os(e){const t=await v(`/drivers/${e}`);rs(t),j("driver-form-modal")}function ss(e){const t=document.getElementById("driver-delete-copy");T.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus driver <strong>${g(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`),j("driver-delete-modal")}function is(){const e=document.getElementById("drivers-add-btn"),t=document.getElementById("drivers-export-btn"),n=document.getElementById("drivers-search-input"),a=document.getElementById("driver-form"),r=document.getElementById("drivers-table-body"),o=document.getElementById("driver-delete-confirm-btn"),s=document.getElementById("drivers-prev-page-btn"),i=document.getElementById("drivers-next-page-btn");if(!(!e||!a||!r))return e.addEventListener("click",()=>{An(),j("driver-form-modal")}),t?.addEventListener("click",()=>{Wt("/export/drivers/csv","drivers.csv").catch(()=>{h("Gagal mengunduh file")})}),n?.addEventListener("input",Ae(async c=>{T.search=c.target.value.trim(),T.page=1;try{await he()}catch{h("Gagal memuat data")}})),a.addEventListener("submit",async c=>{c.preventDefault();const d={nama:document.getElementById("driver-nama")?.value.trim()||"",lokasi:document.getElementById("driver-lokasi")?.value.trim()||""};ot(!0);try{T.editItem?(await v(`/drivers/${T.editItem.id}`,{method:"PUT",body:d}),U("Data driver berhasil diperbarui")):(await v("/drivers",{method:"POST",body:d}),U("Driver berhasil ditambahkan")),K("driver-form-modal"),An(),await he()}catch(l){h(l.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{ot(!1)}}),r.addEventListener("click",async c=>{const d=c.target.closest("[data-driver-edit]"),l=c.target.closest("[data-driver-delete]");try{if(d){await os(d.dataset.driverEdit);return}l&&ss({id:l.dataset.driverDelete,nama:l.dataset.driverName})}catch{h("Gagal memuat data")}}),o?.addEventListener("click",async()=>{if(T.deleteItem)try{await v(`/drivers/${T.deleteItem.id}`,{method:"DELETE"}),U("Driver berhasil dihapus"),K("driver-delete-modal"),(T.page-1)*_e>=T.totalCount-1&&T.page>1&&(T.page-=1),T.deleteItem=null,await he()}catch{h("Gagal menghapus data")}}),s?.addEventListener("click",async()=>{if(!(T.page<=1)){T.page-=1;try{await he()}catch{h("Gagal memuat data")}}}),i?.addEventListener("click",async()=>{const c=Math.max(1,Math.ceil(T.totalCount/_e));if(!(T.page>=c)){T.page+=1;try{await he()}catch{h("Gagal memuat data")}}}),he().catch(()=>{h("Gagal memuat data")})}const w={data:[],loading:!0,totalCount:0,page:1,search:"",filterJenis:"",editItem:null,deleteItem:null,isSubmitting:!1},xe=10;function ds(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M5 14L6.6 9.2C6.8728 8.3816 7.6387 7.83 8.5014 7.83H15.4986C16.3613 7.83 17.1272 8.3816 17.4 9.2L19 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M4 14H20V17C20 18.1046 19.1046 19 18 19H6C4.89543 19 4 18.1046 4 17V14Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M7 16H7.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path>
            <path d="M17 16H17.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path>
        </svg>
    `}function ls(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function cs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function us(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 13L11 22L2 13V4H11L20 13Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <circle cx="7.5" cy="8.5" r="1.5" fill="currentColor"></circle>
        </svg>
    `}function st(e){const t=document.getElementById("mobil-submit-btn");w.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":w.editItem?"Perbarui":"Simpan")}function ms(e){return e==="Hiace"?"mobil-jenis-badge mobil-jenis-badge-hiace":"mobil-jenis-badge mobil-jenis-badge-reborn"}function ps(){const e=document.getElementById("mobil-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="mobil-table-state">
                <div class="mobil-loading-inline">
                    <span class="mobil-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function gs(){const e=document.getElementById("mobil-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="mobil-table-state mobil-empty-copy">
                Belum ada data mobil
            </td>
        </tr>
    `)}function Mn(){const e=document.getElementById("mobil-table-body");if(e){if(w.loading){ps();return}if(w.data.length===0){gs();return}e.innerHTML=w.data.map((t,n)=>`
        <tr class="mobil-row" data-testid="mobil-row-${t.id}">
            <td class="mobil-index-cell">${(w.page-1)*xe+n+1}</td>
            <td>
                <div class="mobil-code-cell">
                    <span class="mobil-code-avatar" aria-hidden="true">
                        ${ds()}
                    </span>
                    <span class="mobil-code-text">${g(t.kode_mobil)}</span>
                </div>
            </td>
            <td>
                <span class="${ms(t.jenis_mobil)}">
                    <span class="mobil-jenis-icon" aria-hidden="true">${us()}</span>
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
                        ${ls()}
                    </button>
                    <button
                        class="mobil-icon-button mobil-icon-button-danger"
                        type="button"
                        data-mobil-delete="${t.id}"
                        data-mobil-name="${g(t.kode_mobil)}"
                        data-testid="delete-mobil-${t.id}"
                        aria-label="Hapus mobil ${g(t.kode_mobil)}"
                    >
                        ${cs()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function Rn(){const e=document.getElementById("mobil-pagination-shell"),t=document.getElementById("mobil-pagination-info"),n=document.getElementById("mobil-pagination-page"),a=document.getElementById("mobil-prev-page-btn"),r=document.getElementById("mobil-next-page-btn"),o=Math.max(1,Math.ceil(w.totalCount/xe));e&&(e.hidden=o<=1),t&&(t.textContent=Me(w.page,xe,w.totalCount,w.data.length)),n&&(n.textContent=`${w.page} / ${o}`),a&&(a.disabled=w.page===1),r&&(r.disabled=w.page>=o)}async function me(){w.loading=!0,Mn(),Rn();try{const[e,t]=await Promise.all([v(`/mobil?page=${w.page}&limit=${xe}${w.search?`&search=${encodeURIComponent(w.search)}`:""}${w.filterJenis?`&jenis=${encodeURIComponent(w.filterJenis)}`:""}`),v(`/mobil/count${w.search||w.filterJenis?"?":""}${[w.search?`search=${encodeURIComponent(w.search)}`:"",w.filterJenis?`jenis=${encodeURIComponent(w.filterJenis)}`:""].filter(Boolean).join("&")}`)]);w.data=Array.isArray(e)?e:[],w.totalCount=Number(t.count||0)}finally{w.loading=!1,Mn(),Rn()}}function Pn(){const e=document.getElementById("mobil-form"),t=document.getElementById("mobil-form-title"),n=document.getElementById("mobil-form-description"),a=document.getElementById("mobil-id"),r=document.getElementById("mobil-kode"),o=document.getElementById("mobil-jenis");e?.reset(),a&&(a.value=""),r&&(r.value=""),o&&(o.value="Hiace"),t&&(t.textContent="Tambah Mobil Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan data mobil"),w.editItem=null,st(!1)}function fs(e){const t=document.getElementById("mobil-form-title"),n=document.getElementById("mobil-form-description"),a=document.getElementById("mobil-id"),r=document.getElementById("mobil-kode"),o=document.getElementById("mobil-jenis");w.editItem=e,a&&(a.value=e.id),r&&(r.value=e.kode_mobil),o&&(o.value=e.jenis_mobil),t&&(t.textContent="Edit Data Mobil"),n&&(n.textContent="Isi form di bawah untuk memperbarui data mobil"),st(!1)}async function bs(e){const t=await v(`/mobil/${e}`);fs(t),j("mobil-form-modal")}function ks(e){const t=document.getElementById("mobil-delete-copy");w.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus mobil <strong>${g(e.kode_mobil)}</strong>? Tindakan ini tidak dapat dibatalkan.`),j("mobil-delete-modal")}function hs(){const e=document.getElementById("mobil-add-btn"),t=document.getElementById("mobil-export-btn"),n=document.getElementById("mobil-search-input"),a=document.getElementById("mobil-filter-jenis"),r=document.getElementById("mobil-form"),o=document.getElementById("mobil-table-body"),s=document.getElementById("mobil-delete-confirm-btn"),i=document.getElementById("mobil-prev-page-btn"),c=document.getElementById("mobil-next-page-btn"),d=document.getElementById("mobil-kode");if(!(!e||!r||!o))return e.addEventListener("click",()=>{Pn(),j("mobil-form-modal")}),t?.addEventListener("click",()=>{Wt("/export/mobil/csv","mobil.csv").catch(()=>{h("Gagal mengunduh file")})}),n?.addEventListener("input",Ae(async l=>{w.search=l.target.value.trim(),w.page=1;try{await me()}catch{h("Gagal memuat data")}})),a?.addEventListener("change",async l=>{w.filterJenis=l.target.value,w.page=1;try{await me()}catch{h("Gagal memuat data")}}),d?.addEventListener("input",l=>{l.target.value=l.target.value.toUpperCase()}),r.addEventListener("submit",async l=>{l.preventDefault();const k={kode_mobil:document.getElementById("mobil-kode")?.value.trim().toUpperCase()||"",jenis_mobil:document.getElementById("mobil-jenis")?.value||"Hiace"};st(!0);try{w.editItem?(await v(`/mobil/${w.editItem.id}`,{method:"PUT",body:k}),U("Data mobil berhasil diperbarui")):(await v("/mobil",{method:"POST",body:k}),U("Mobil berhasil ditambahkan")),K("mobil-form-modal"),Pn(),await me()}catch(y){h(y.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{st(!1)}}),o.addEventListener("click",async l=>{const k=l.target.closest("[data-mobil-edit]"),y=l.target.closest("[data-mobil-delete]");try{if(k){await bs(k.dataset.mobilEdit);return}y&&ks({id:y.dataset.mobilDelete,kode_mobil:y.dataset.mobilName})}catch{h("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(w.deleteItem)try{await v(`/mobil/${w.deleteItem.id}`,{method:"DELETE"}),U("Mobil berhasil dihapus"),K("mobil-delete-modal"),(w.page-1)*xe>=w.totalCount-1&&w.page>1&&(w.page-=1),w.deleteItem=null,await me()}catch{h("Gagal menghapus data")}}),i?.addEventListener("click",async()=>{if(!(w.page<=1)){w.page-=1;try{await me()}catch{h("Gagal memuat data")}}}),c?.addEventListener("click",async()=>{const l=Math.max(1,Math.ceil(w.totalCount/xe));if(!(w.page>=l)){w.page+=1;try{await me()}catch{h("Gagal memuat data")}}}),me().catch(()=>{h("Gagal memuat data")})}const B={data:[],drivers:[],mobilList:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1},qe=10,Dn={"05:00":"Subuh (05.00 WIB)","08:00":"Pagi (08.00 WIB)","10:00":"Pagi (10.00 WIB)","14:00":"Siang (14.00 WIB)","16:00":"Sore (16.00 WIB)","19:00":"Malam (19.00 WIB)"},Et="08:00",ys=["Reguler","Dropping","Rental"],en="Reguler";function vs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Es(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function tn(e){return e==="Lunas"?"Lunas":"Belum Lunas"}function On(e){const t=tn(e);return`<span class="keberangkatan-payment-badge ${t==="Lunas"?"is-paid":"is-unpaid"}">${g(t)}</span>`}function jn(e){return Dn[e]||Dn[Et]}function it(e){return ys.includes(e)?e:en}function ws(){const e=Number(document.getElementById("keberangkatan-tarif-penumpang")?.value||0),t=Number(document.getElementById("keberangkatan-uang-paket")?.value||0),n=Number(document.getElementById("keberangkatan-jumlah-snack")?.value||0),a=Number(document.getElementById("keberangkatan-pengembalian-snack")?.value||0),r=Number(document.getElementById("keberangkatan-jumlah-air-mineral")?.value||0),o=e,s=o+t,i=s*.15,c=s*.85;return{jumlah_uang_penumpang:o,uang_paket:t,total:s,uang_pc:i,uang_bersih:c,jumlah_snack:n,pengembalian_snack:a,jumlah_air_mineral:r}}function nn(){const e=ws();Object.entries(e).forEach(([t,n])=>{const a=document.querySelector(`[data-calc="${t}"]`);if(a){if(t==="jumlah_snack"){a.textContent=`${O(n)} item`;return}if(t==="pengembalian_snack"){a.textContent=`${O(n)} item`;return}if(t==="jumlah_air_mineral"){a.textContent=`${O(n)} botol`;return}a.textContent=N(n)}})}function dt(e,t,n,a,r=""){const o=document.getElementById(e);if(!o)return;const s=e==="keberangkatan-kode-mobil"?"Pilih mobil":"Pilih driver";o.innerHTML=`
        <option value="">${s}</option>
        ${t.map(i=>`
            <option value="${i[n]}" ${String(i[n])===String(r)?"selected":""}>
                ${g(a(i))}
            </option>
        `).join("")}
    `}function lt(e){const t=document.getElementById("keberangkatan-submit-btn");B.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":B.editItem?"Perbarui":"Simpan")}function Bs(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");e&&(e.innerHTML=`
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
        `))}function Is(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");e&&(e.innerHTML=`
        <tr>
            <td colspan="18" class="keberangkatan-table-state keberangkatan-empty-copy">
                Belum ada data keberangkatan
            </td>
        </tr>
    `,t&&(t.hidden=!1,t.innerHTML=`
            <div class="keberangkatan-mobile-state keberangkatan-empty-copy">
                Belum ada data keberangkatan
            </div>
        `))}function qn(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");if(e){if(B.loading){Bs();return}if(B.data.length===0){Is();return}e.innerHTML=B.data.map(n=>`
        <tr class="keberangkatan-row" data-testid="keberangkatan-row-${n.id}">
            <td class="keberangkatan-hari-cell">${g(n.hari)}</td>
            <td>${g(n.tanggal)}</td>
            <td>${g(n.jam_keberangkatan_label||jn(n.jam_keberangkatan))}</td>
            <td>${g(it(n.tipe_layanan))}</td>
            <td>
                <span class="keberangkatan-kode-badge">${g(n.kode_mobil)}</span>
            </td>
            <td>${g(n.driver_nama)}</td>
            <td class="text-right">${O(n.jumlah_penumpang)}</td>
            <td class="text-right keberangkatan-money-cell">${N(n.jumlah_uang_penumpang)}</td>
            <td class="text-right">${O(n.jumlah_paket)}</td>
            <td class="text-right keberangkatan-money-cell">${N(n.uang_paket)}</td>
            <td class="text-right"><span class="keberangkatan-stock-badge">${O(n.jumlah_snack)}</span></td>
            <td class="text-right"><span class="keberangkatan-stock-badge keberangkatan-stock-badge-blue">${O(n.pengembalian_snack)}</span></td>
            <td class="text-right"><span class="keberangkatan-stock-badge keberangkatan-stock-badge-blue">${O(n.jumlah_air_mineral)}</span></td>
            <td class="text-right keberangkatan-money-cell keberangkatan-money-cell-amber">${N(n.uang_pc)}</td>
            <td class="text-right keberangkatan-money-cell keberangkatan-money-cell-emerald">${N(n.uang_bersih)}</td>
            <td class="text-center">${On(n.status_pembayaran)}</td>
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
                        aria-label="Edit data keberangkatan ${g(n.kode_mobil)}"
                    >
                        ${vs()}
                    </button>
                    <button
                        class="keberangkatan-icon-button keberangkatan-icon-button-danger"
                        type="button"
                        data-keberangkatan-delete="${n.id}"
                        data-testid="delete-keberangkatan-${n.id}"
                        aria-label="Hapus data keberangkatan ${g(n.kode_mobil)}"
                    >
                        ${Es()}
                    </button>
                </div>
            </td>
        </tr>
    `).join(""),t&&(t.hidden=!1,t.innerHTML=B.data.map(n=>`
            <article class="keberangkatan-mobile-card" data-testid="keberangkatan-card-${n.id}">
                <div class="keberangkatan-mobile-card-head">
                    <div>
                        <p class="keberangkatan-mobile-day">${g(n.hari)}</p>
                        <h3 class="keberangkatan-mobile-date">${g(n.tanggal)}</h3>
                        <p>${g(n.jam_keberangkatan_label||jn(n.jam_keberangkatan))}</p>
                    </div>
                    <div class="keberangkatan-mobile-head-side">
                        <span class="keberangkatan-kode-badge">${g(n.kode_mobil)}</span>
                        <span class="keberangkatan-trip-badge">#${O(n.trip_ke)}</span>
                    </div>
                </div>

                <div class="keberangkatan-mobile-driver">
                    <span>Driver</span>
                    <strong>${g(n.driver_nama)}</strong>
                </div>

                <div class="keberangkatan-mobile-grid">
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-status">
                        <span>Validasi</span>
                        ${On(n.status_pembayaran)}
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Layanan</span>
                        <strong>${g(it(n.tipe_layanan))}</strong>
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
                        <strong>${N(n.jumlah_uang_penumpang)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-full">
                        <span>Uang Paket</span>
                        <strong>${N(n.uang_paket)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-accent">
                        <span>Uang PC (15%)</span>
                        <strong>${N(n.uang_pc)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-emerald">
                        <span>Uang Bersih</span>
                        <strong>${N(n.uang_bersih)}</strong>
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
        `).join(""))}}function Nn(){const e=document.getElementById("keberangkatan-pagination-shell"),t=document.getElementById("keberangkatan-pagination-info"),n=document.getElementById("keberangkatan-pagination-page"),a=document.getElementById("keberangkatan-prev-page-btn"),r=document.getElementById("keberangkatan-next-page-btn"),o=Math.max(1,Math.ceil(B.totalCount/qe));e&&(e.hidden=o<=1),t&&(t.textContent=Me(B.page,qe,B.totalCount,B.data.length)),n&&(n.textContent=`${B.page} / ${o}`),a&&(a.disabled=B.page===1),r&&(r.disabled=B.page>=o)}async function ye(){B.loading=!0,qn(),Nn();try{const[e,t,n,a]=await Promise.all([v(`/keberangkatan?page=${B.page}&limit=${qe}${B.search?`&search=${encodeURIComponent(B.search)}`:""}`),v(`/keberangkatan/count${B.search?`?search=${encodeURIComponent(B.search)}`:""}`),v("/drivers/all"),v("/mobil/all")]);B.data=Array.isArray(e)?e:[],B.totalCount=Number(t.count||0),B.drivers=Array.isArray(n)?n:[],B.mobilList=Array.isArray(a)?a:[]}finally{B.loading=!1,qn(),Nn()}}function Pa(){document.getElementById("keberangkatan-form")?.scrollTo({top:0,behavior:"auto"})}function xt(){const e=document.getElementById("keberangkatan-form"),t=document.getElementById("keberangkatan-form-title"),n=document.getElementById("keberangkatan-form-description"),a=document.getElementById("keberangkatan-tanggal"),r=document.getElementById("keberangkatan-jam-keberangkatan"),o=document.getElementById("keberangkatan-trip-ke"),s=document.getElementById("keberangkatan-tipe-layanan"),i=document.getElementById("keberangkatan-jumlah-penumpang"),c=document.getElementById("keberangkatan-tarif-penumpang"),d=document.getElementById("keberangkatan-jumlah-paket"),l=document.getElementById("keberangkatan-uang-paket"),k=document.getElementById("keberangkatan-jumlah-snack"),y=document.getElementById("keberangkatan-pengembalian-snack"),A=document.getElementById("keberangkatan-jumlah-air-mineral"),m=document.getElementById("keberangkatan-status-pembayaran");e?.reset(),B.editItem=null,document.getElementById("keberangkatan-id").value="",t&&(t.textContent="Tambah Data Keberangkatan"),n&&(n.textContent="Isi form di bawah untuk menambahkan data keberangkatan"),a&&(a.value=Ke()),r&&(r.value=Et),dt("keberangkatan-kode-mobil",B.mobilList,"kode_mobil",f=>`${f.kode_mobil} - ${f.jenis_mobil}`,B.mobilList[0]?.kode_mobil||""),dt("keberangkatan-driver-id",B.drivers,"id",f=>`${f.nama} - ${f.lokasi}`,B.drivers[0]?.id||""),o&&(o.value="1"),s&&(s.value=en),i&&(i.value="0"),c&&(c.value="0"),d&&(d.value="0"),l&&(l.value="0"),k&&(k.value="0"),y&&(y.value="0"),A&&(A.value="0"),m&&(m.value="Belum Lunas"),lt(!1),nn(),Pa()}async function Un(e){const t=await v(`/keberangkatan/${e}`),n=document.getElementById("keberangkatan-form-title"),a=document.getElementById("keberangkatan-form-description");B.editItem=t,document.getElementById("keberangkatan-id").value=t.id,document.getElementById("keberangkatan-tanggal").value=t.tanggal,document.getElementById("keberangkatan-jam-keberangkatan").value=t.jam_keberangkatan||Et,document.getElementById("keberangkatan-trip-ke").value=t.trip_ke,document.getElementById("keberangkatan-tipe-layanan").value=it(t.tipe_layanan),document.getElementById("keberangkatan-jumlah-penumpang").value=t.jumlah_penumpang,document.getElementById("keberangkatan-tarif-penumpang").value=t.tarif_penumpang,document.getElementById("keberangkatan-jumlah-paket").value=t.jumlah_paket,document.getElementById("keberangkatan-uang-paket").value=t.uang_paket,document.getElementById("keberangkatan-jumlah-snack").value=t.jumlah_snack,document.getElementById("keberangkatan-pengembalian-snack").value=t.pengembalian_snack,document.getElementById("keberangkatan-jumlah-air-mineral").value=t.jumlah_air_mineral,document.getElementById("keberangkatan-status-pembayaran").value=tn(t.status_pembayaran),dt("keberangkatan-kode-mobil",B.mobilList,"kode_mobil",r=>`${r.kode_mobil} - ${r.jenis_mobil}`,t.kode_mobil),dt("keberangkatan-driver-id",B.drivers,"id",r=>`${r.nama} - ${r.lokasi}`,t.driver_id),n&&(n.textContent="Edit Data Keberangkatan"),a&&(a.textContent="Isi form di bawah untuk memperbarui data keberangkatan"),lt(!1),nn(),Pa(),j("keberangkatan-form-modal")}function Hn(e){B.deleteItem=e,j("keberangkatan-delete-modal")}function Ss(){const e=document.getElementById("keberangkatan-add-btn"),t=document.getElementById("keberangkatan-export-btn"),n=document.getElementById("keberangkatan-search-input"),a=document.getElementById("keberangkatan-form"),r=document.getElementById("keberangkatan-table-body"),o=document.getElementById("keberangkatan-mobile-list"),s=document.getElementById("keberangkatan-delete-confirm-btn"),i=document.getElementById("keberangkatan-prev-page-btn"),c=document.getElementById("keberangkatan-next-page-btn");if(!(!e||!a||!r))return e.addEventListener("click",()=>{xt(),j("keberangkatan-form-modal")}),t?.addEventListener("click",()=>{Wt("/export/keberangkatan/csv","keberangkatan.csv").catch(()=>{h("Gagal mengunduh file")})}),n?.addEventListener("input",Ae(async d=>{B.search=d.target.value.trim(),B.page=1;try{await ye()}catch{h("Gagal memuat data")}})),a.addEventListener("input",d=>{["keberangkatan-jumlah-penumpang","keberangkatan-tarif-penumpang","keberangkatan-uang-paket","keberangkatan-jumlah-snack","keberangkatan-pengembalian-snack","keberangkatan-jumlah-air-mineral"].includes(d.target.id)&&nn()}),a.addEventListener("submit",async d=>{d.preventDefault();const l={tanggal:document.getElementById("keberangkatan-tanggal")?.value||"",jam_keberangkatan:document.getElementById("keberangkatan-jam-keberangkatan")?.value||Et,tipe_layanan:it(document.getElementById("keberangkatan-tipe-layanan")?.value||en),kode_mobil:document.getElementById("keberangkatan-kode-mobil")?.value||"",driver_id:document.getElementById("keberangkatan-driver-id")?.value||"",jumlah_penumpang:Number(document.getElementById("keberangkatan-jumlah-penumpang")?.value||0),tarif_penumpang:Number(document.getElementById("keberangkatan-tarif-penumpang")?.value||0),jumlah_paket:Number(document.getElementById("keberangkatan-jumlah-paket")?.value||0),uang_paket:Number(document.getElementById("keberangkatan-uang-paket")?.value||0),jumlah_snack:Number(document.getElementById("keberangkatan-jumlah-snack")?.value||0),pengembalian_snack:Number(document.getElementById("keberangkatan-pengembalian-snack")?.value||0),jumlah_air_mineral:Number(document.getElementById("keberangkatan-jumlah-air-mineral")?.value||0),trip_ke:Number(document.getElementById("keberangkatan-trip-ke")?.value||1),status_pembayaran:tn(document.getElementById("keberangkatan-status-pembayaran")?.value||"")};lt(!0);try{B.editItem?(await v(`/keberangkatan/${B.editItem.id}`,{method:"PUT",body:l}),U("Data berhasil diperbarui")):(await v("/keberangkatan",{method:"POST",body:l}),U("Data berhasil ditambahkan")),K("keberangkatan-form-modal"),xt(),await ye()}catch(k){h(k.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{lt(!1)}}),r.addEventListener("click",async d=>{const l=d.target.closest("[data-keberangkatan-edit]"),k=d.target.closest("[data-keberangkatan-delete]");try{if(l){await Un(l.dataset.keberangkatanEdit);return}k&&Hn({id:k.dataset.keberangkatanDelete})}catch{h("Gagal memuat data")}}),o?.addEventListener("click",async d=>{const l=d.target.closest("[data-keberangkatan-edit]"),k=d.target.closest("[data-keberangkatan-delete]");try{if(l){await Un(l.dataset.keberangkatanEdit);return}k&&Hn({id:k.dataset.keberangkatanDelete})}catch{h("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(B.deleteItem)try{await v(`/keberangkatan/${B.deleteItem.id}`,{method:"DELETE"}),U("Data berhasil dihapus"),K("keberangkatan-delete-modal"),(B.page-1)*qe>=B.totalCount-1&&B.page>1&&(B.page-=1),B.deleteItem=null,await ye()}catch{h("Gagal menghapus data")}}),i?.addEventListener("click",async()=>{if(!(B.page<=1)){B.page-=1;try{await ye()}catch{h("Gagal memuat data")}}}),c?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil(B.totalCount/qe));if(!(B.page>=d)){B.page+=1;try{await ye()}catch{h("Gagal memuat data")}}}),ye().then(()=>{xt()}).catch(()=>{h("Gagal memuat data")})}const S={data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1,prices:{snack:0,air:0}},Ne=10;function $s(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Cs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function ct(e){return Number(document.getElementById(e)?.value||0)}function ut(){const e=ct("stock-total-snack"),t=ct("stock-total-air"),n=e*S.prices.snack+t*S.prices.air,a=document.querySelector('[data-stock-calc="nilai_total"]'),r=document.getElementById("stock-snack-price-label"),o=document.getElementById("stock-air-price-label");r&&(r.textContent=N(S.prices.snack)),o&&(o.textContent=N(S.prices.air)),a&&(a.textContent=N(n))}function mt(e){const t=document.getElementById("stock-submit-btn");S.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":S.editItem?"Perbarui":"Simpan")}function _s(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");e&&(e.innerHTML=`
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
        `))}function xs(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");e&&(e.innerHTML=`
        <tr>
            <td colspan="14" class="stock-table-state stock-empty-copy">
                Belum ada data stok snack dan air mineral
            </td>
        </tr>
    `,t&&(t.hidden=!1,t.innerHTML=`
            <div class="stock-mobile-state stock-empty-copy">
                Belum ada data stok snack dan air mineral
            </div>
        `))}function Fn(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");if(e){if(S.loading){_s();return}if(S.data.length===0){xs();return}e.innerHTML=S.data.map(n=>`
        <tr class="stock-row" data-testid="stock-row-${n.id}">
            <td class="stock-day-cell">${g(n.hari)}</td>
            <td>${g(n.tanggal)}</td>
            <td>${g(n.bulan)}</td>
            <td class="text-right">${O(n.total_stock_snack_display??n.total_stock_snack)}</td>
            <td class="text-right">${O(n.total_stock_air_mineral)}</td>
            <td class="text-right">${O(n.pengembalian_snack)}</td>
            <td class="text-right">${O(n.terpakai_snack)}</td>
            <td class="text-right">${O(n.terpakai_air_mineral)}</td>
            <td class="text-right"><span class="stock-value-badge stock-value-badge-emerald">${O(n.sisa_stock_snack)}</span></td>
            <td class="text-right"><span class="stock-value-badge stock-value-badge-blue">${O(n.sisa_stock_air_mineral)}</span></td>
            <td class="text-right stock-money-cell">${N(n.nilai_total)}</td>
            <td class="text-right stock-money-cell stock-money-cell-emerald">${N(n.sisa_nilai_total)}</td>
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
                        ${$s()}
                    </button>
                    <button
                        class="stock-icon-button stock-icon-button-danger"
                        type="button"
                        data-stock-delete="${n.id}"
                        data-stock-date="${g(n.tanggal)}"
                        data-testid="delete-stock-${n.id}"
                        aria-label="Hapus data stok ${g(n.tanggal)}"
                    >
                        ${Cs()}
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
                        <strong>${N(n.nilai_total)}</strong>
                    </div>
                    <div class="stock-mobile-item stock-mobile-item-full stock-mobile-item-emerald">
                        <span>Sisa Nilai Total</span>
                        <strong>${N(n.sisa_nilai_total)}</strong>
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
        `).join(""))}}function Vn(){const e=document.getElementById("stock-pagination-shell"),t=document.getElementById("stock-pagination-info"),n=document.getElementById("stock-pagination-page"),a=document.getElementById("stock-prev-page-btn"),r=document.getElementById("stock-next-page-btn"),o=Math.max(1,Math.ceil(S.totalCount/Ne));e&&(e.hidden=o<=1),t&&(t.textContent=Me(S.page,Ne,S.totalCount,S.data.length)),n&&(n.textContent=`${S.page} / ${o}`),a&&(a.disabled=S.page===1),r&&(r.disabled=S.page>=o)}async function ve(){S.loading=!0,Fn(),Vn();try{const[e,t]=await Promise.all([v(`/stock?page=${S.page}&limit=${Ne}${S.search?`&search=${encodeURIComponent(S.search)}`:""}`),v(`/stock/count${S.search?`?search=${encodeURIComponent(S.search)}`:""}`)]);S.data=Array.isArray(e)?e:[],S.totalCount=Number(t.count||0)}finally{S.loading=!1,Fn(),Vn()}}function Gn(){const e=document.getElementById("stock-form"),t=document.getElementById("stock-form-title"),n=document.getElementById("stock-form-description");e?.reset(),S.editItem=null,document.getElementById("stock-id").value="",document.getElementById("stock-tanggal").value=Ke(),document.getElementById("stock-total-snack").value="0",document.getElementById("stock-total-air").value="0",document.getElementById("stock-keterangan").value="",t&&(t.textContent="Tambah Stok Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan stok snack dan air mineral"),mt(!1),ut()}function Ls(e){const t=document.getElementById("stock-form-title"),n=document.getElementById("stock-form-description");S.editItem=e,document.getElementById("stock-id").value=e.id,document.getElementById("stock-tanggal").value=e.tanggal,document.getElementById("stock-total-snack").value=e.total_stock_snack,document.getElementById("stock-total-air").value=e.total_stock_air_mineral,document.getElementById("stock-keterangan").value=e.keterangan||"",t&&(t.textContent="Edit Data Stok"),n&&(n.textContent="Isi form di bawah untuk memperbarui stok snack dan air mineral"),mt(!1),ut()}async function Jn(e){const t=await v(`/stock/${e}`);Ls(t),j("stock-form-modal")}function Kn(e){const t=document.getElementById("stock-delete-copy");S.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus data stok tanggal <strong>${g(e.tanggal)}</strong>? Tindakan ini tidak dapat dibatalkan.`),j("stock-delete-modal")}function Ts(){const e=document.querySelector("[data-stock-page]"),t=document.getElementById("stock-add-btn"),n=document.getElementById("stock-search-input"),a=document.getElementById("stock-form"),r=document.getElementById("stock-table-body"),o=document.getElementById("stock-mobile-list"),s=document.getElementById("stock-delete-confirm-btn"),i=document.getElementById("stock-prev-page-btn"),c=document.getElementById("stock-next-page-btn");if(!(!e||!t||!a||!r))return S.prices.snack=Number(e.dataset.stockSnackPrice||0),S.prices.air=Number(e.dataset.stockAirPrice||0),ut(),t.addEventListener("click",()=>{Gn(),j("stock-form-modal")}),n?.addEventListener("input",Ae(async d=>{S.search=d.target.value.trim(),S.page=1;try{await ve()}catch{h("Gagal memuat data")}})),a.addEventListener("input",d=>{["stock-total-snack","stock-total-air"].includes(d.target.id)&&ut()}),a.addEventListener("submit",async d=>{d.preventDefault();const l={tanggal:document.getElementById("stock-tanggal")?.value||"",total_stock_snack:ct("stock-total-snack"),total_stock_air_mineral:ct("stock-total-air"),keterangan:document.getElementById("stock-keterangan")?.value.trim()||""};mt(!0);try{S.editItem?(await v(`/stock/${S.editItem.id}`,{method:"PUT",body:l}),U("Data stok berhasil diperbarui")):(await v("/stock",{method:"POST",body:l}),U("Data stok berhasil ditambahkan")),K("stock-form-modal"),Gn(),await ve()}catch(k){h(k.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{mt(!1)}}),r.addEventListener("click",async d=>{const l=d.target.closest("[data-stock-edit]"),k=d.target.closest("[data-stock-delete]");try{if(l){await Jn(l.dataset.stockEdit);return}k&&Kn({id:k.dataset.stockDelete,tanggal:k.dataset.stockDate})}catch{h("Gagal memuat data")}}),o?.addEventListener("click",async d=>{const l=d.target.closest("[data-stock-edit]"),k=d.target.closest("[data-stock-delete]");try{if(l){await Jn(l.dataset.stockEdit);return}k&&Kn({id:k.dataset.stockDelete,tanggal:k.dataset.stockDate})}catch{h("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(S.deleteItem)try{await v(`/stock/${S.deleteItem.id}`,{method:"DELETE"}),U("Data stok berhasil dihapus"),K("stock-delete-modal"),(S.page-1)*Ne>=S.totalCount-1&&S.page>1&&(S.page-=1),S.deleteItem=null,await ve()}catch{h("Gagal menghapus data")}}),i?.addEventListener("click",async()=>{if(!(S.page<=1)){S.page-=1;try{await ve()}catch{h("Gagal memuat data")}}}),c?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil(S.totalCount/Ne));if(!(S.page>=d)){S.page+=1;try{await ve()}catch{h("Gagal memuat data")}}}),ve().catch(()=>{h("Gagal memuat data")})}const Ue=10,C={currentUser:null,data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,defaultRole:"User"};function As(e){return["Super Admin","Admin"].includes(e)}function Ms(e){return e==="Super Admin"}function Rs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function Ps(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M2.5 12C4.4 8.2 8 6 12 6C16 6 19.6 8.2 21.5 12C19.6 15.8 16 18 12 18C8 18 4.4 15.8 2.5 12Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function Ds(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
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
    `}function js(){return Ms(C.currentUser?.role)?["Super Admin","Admin","User"]:["Admin","User"]}function pt(e){oe(document.getElementById("admin-user-submit-btn"),e,"Menyimpan...")}function qs(e){return e==="Super Admin"?"admin-users-role-badge admin-users-role-badge-super":e==="Admin"?"admin-users-role-badge admin-users-role-badge-admin":"admin-users-role-badge admin-users-role-badge-user"}function Ns(){const e=document.getElementById("admin-users-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="6" class="admin-users-table-state">
                <div class="admin-users-loading-inline">
                    <span class="admin-users-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function Da(e="Belum ada akun admin atau user."){const t=document.getElementById("admin-users-table-body");t&&(t.innerHTML=`
        <tr>
            <td colspan="6" class="admin-users-table-state admin-users-empty-copy">${g(e)}</td>
        </tr>
    `)}function zn(){const e=document.getElementById("admin-users-table-body");if(e){if(C.loading){Ns();return}if(C.data.length===0){Da();return}e.innerHTML=C.data.map(t=>`
        <tr class="admin-users-row" data-testid="admin-user-row-${t.id}">
            <td>
                <div class="admin-users-name-cell">
                    <span class="admin-users-avatar" aria-hidden="true">${Rs()}</span>
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
            <td><span class="${qs(t.role)}">${g(t.role)}</span></td>
            <td>
                <div class="admin-users-action-row">
                    <button class="admin-users-icon-button" type="button" data-admin-user-show="${t.id}" data-testid="show-admin-user-${t.id}" aria-label="Lihat detail akun ${g(t.nama)}">
                        ${Ps()}
                    </button>
                    <button class="admin-users-icon-button" type="button" data-admin-user-edit="${t.id}" data-testid="edit-admin-user-${t.id}" aria-label="Edit akun ${g(t.nama)}" ${t.can_edit?"":"disabled"}>
                        ${Ds()}
                    </button>
                    <button class="admin-users-icon-button admin-users-icon-button-danger" type="button" data-admin-user-delete="${t.id}" data-admin-user-name="${g(t.nama)}" data-testid="delete-admin-user-${t.id}" aria-label="Hapus akun ${g(t.nama)}" ${t.can_delete?"":"disabled"}>
                        ${Os()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function qt(){const e=document.getElementById("admin-users-pagination-shell"),t=document.getElementById("admin-users-pagination-info"),n=document.getElementById("admin-users-pagination-page"),a=document.getElementById("admin-users-prev-page-btn"),r=document.getElementById("admin-users-next-page-btn"),o=Math.max(1,Math.ceil(C.totalCount/Ue));e&&(e.hidden=o<=1),t&&(t.textContent=Me(C.page,Ue,C.totalCount,C.data.length)),n&&(n.textContent=`${C.page} / ${o}`),a&&(a.disabled=C.page===1),r&&(r.disabled=C.page>=o)}async function Ee(){C.loading=!0,zn(),qt();try{const e=C.search?`?search=${encodeURIComponent(C.search)}`:"",t=`?page=${C.page}&limit=${Ue}${C.search?`&search=${encodeURIComponent(C.search)}`:""}`,[n,a]=await Promise.all([v(`/admin-users${t}`),v(`/admin-users/count${e}`)]);C.data=Array.isArray(n)?n:[],C.totalCount=Number(a.count||0)}finally{C.loading=!1,zn(),qt()}}function Oa(e="User"){const t=document.getElementById("admin-user-role");if(!t)return;const n=js(),a=n.includes(e)?e:n[0];t.innerHTML=n.map(r=>`
        <option value="${g(r)}" ${r===a?"selected":""}>${g(r)}</option>
    `).join("")}function ja(e){const t=document.getElementById("admin-user-password"),n=document.getElementById("admin-user-password-note");t&&(t.required=!e,t.placeholder=e?"Kosongkan jika tidak ingin mengubah password":"Masukkan password",t.value=""),n&&(n.textContent=e?"Kosongkan password jika tidak ingin mengubah password akun ini.":"Password minimal 6 karakter dan akan disimpan dalam bentuk terenkripsi.")}function Lt(e="User"){const t=document.getElementById("admin-user-form"),n=document.getElementById("admin-user-form-title"),a=document.getElementById("admin-user-form-description"),r=document.getElementById("admin-user-id");t?.reset(),r&&(r.value=""),Oa(e),ja(!1),n&&(n.textContent=e==="Admin"?"Tambah Admin Baru":"Tambah User Baru"),a&&(a.textContent=e==="Admin"?"Lengkapi data akun untuk menambahkan admin baru":"Lengkapi data akun untuk menambahkan user baru"),C.defaultRole=e,C.editItem=null,pt(!1)}function Us(e){C.editItem=e,document.getElementById("admin-user-id").value=e.id,document.getElementById("admin-user-nama").value=e.nama,document.getElementById("admin-user-username").value=e.username,document.getElementById("admin-user-email").value=e.email,Oa(e.role),ja(!0),document.getElementById("admin-user-form-title").textContent="Edit Akun",document.getElementById("admin-user-form-description").textContent="Perbarui informasi akun admin atau user di bawah ini",pt(!1)}function Hs(e){const t=document.getElementById("admin-user-detail-list");t&&(t.innerHTML=`
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
            <strong>${g(Ho(e.created_at))}</strong>
        </div>
    `)}async function Fs(e){Hs(await v(`/admin-users/${e}`)),j("admin-user-show-modal")}async function Vs(e){Us(await v(`/admin-users/${e}`)),j("admin-user-form-modal")}function Gs(e){C.deleteItem=e,document.getElementById("admin-user-delete-copy").innerHTML=`Apakah Anda yakin ingin menghapus akun <strong>${g(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`,j("admin-user-delete-modal")}function Wn(){const e=document.getElementById("admin-users-access-note"),t=document.getElementById("admin-users-search-input"),n=document.querySelector(".admin-users-page-actions");e&&(e.hidden=!1,e.textContent="Halaman ini hanya dapat diakses oleh Admin atau Super Admin."),t&&(t.disabled=!0),n&&(n.hidden=!0),C.loading=!1,C.data=[],C.totalCount=0,Da("Anda tidak memiliki akses untuk mengelola data admin dan user."),qt()}function Js({user:e}={}){const t=document.getElementById("admin-users-add-admin-btn"),n=document.getElementById("admin-users-add-user-btn"),a=document.getElementById("admin-users-search-input"),r=document.getElementById("admin-user-form"),o=document.getElementById("admin-users-table-body"),s=document.getElementById("admin-user-delete-confirm-btn"),i=document.getElementById("admin-users-prev-page-btn"),c=document.getElementById("admin-users-next-page-btn");if(!(!t||!n||!r||!o)){if(C.currentUser=e||window.transitAuthUser||null,!As(C.currentUser?.role)){Wn();return}return t.addEventListener("click",()=>{Lt("Admin"),j("admin-user-form-modal")}),n.addEventListener("click",()=>{Lt("User"),j("admin-user-form-modal")}),a?.addEventListener("input",Ae(async d=>{C.search=d.target.value.trim(),C.page=1;try{await Ee()}catch(l){h(l.message||"Gagal memuat data akun")}})),r.addEventListener("submit",async d=>{d.preventDefault();const l={nama:document.getElementById("admin-user-nama")?.value.trim()||"",username:document.getElementById("admin-user-username")?.value.trim()||"",email:document.getElementById("admin-user-email")?.value.trim()||"",password:document.getElementById("admin-user-password")?.value||"",role:document.getElementById("admin-user-role")?.value||"User"};pt(!0);try{C.editItem?(await v(`/admin-users/${C.editItem.id}`,{method:"PUT",body:l}),U("Akun berhasil diperbarui")):(await v("/admin-users",{method:"POST",body:l}),U(l.role==="Admin"?"Admin berhasil ditambahkan":"User berhasil ditambahkan")),K("admin-user-form-modal"),Lt(C.defaultRole),await Ee()}catch(k){h(k.message||"Silakan periksa kembali data yang diinput","Gagal menyimpan akun")}finally{pt(!1)}}),o.addEventListener("click",async d=>{const l=d.target.closest("[data-admin-user-show]"),k=d.target.closest("[data-admin-user-edit]"),y=d.target.closest("[data-admin-user-delete]");try{if(l){await Fs(l.dataset.adminUserShow);return}if(k){await Vs(k.dataset.adminUserEdit);return}y&&Gs({id:y.dataset.adminUserDelete,nama:y.dataset.adminUserName})}catch(A){h(A.message||"Gagal memuat detail akun")}}),s?.addEventListener("click",async()=>{if(C.deleteItem)try{await v(`/admin-users/${C.deleteItem.id}`,{method:"DELETE"}),U("Akun berhasil dihapus"),K("admin-user-delete-modal"),(C.page-1)*Ue>=C.totalCount-1&&C.page>1&&(C.page-=1),C.deleteItem=null,await Ee()}catch(d){h(d.message||"Gagal menghapus akun")}}),i?.addEventListener("click",async()=>{if(!(C.page<=1)){C.page-=1;try{await Ee()}catch(d){h(d.message||"Gagal memuat data akun")}}}),c?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil(C.totalCount/Ue));if(!(C.page>=d)){C.page+=1;try{await Ee()}catch(l){h(l.message||"Gagal memuat data akun")}}}),Ee().catch(d=>{if(d.status===403){Wn();return}h(d.message||"Gagal memuat data akun")})}}const Xn=[{value:"05:00",label:"Subuh",time:"05.00 WIB"},{value:"08:00",label:"Pagi",time:"08.00 WIB"},{value:"10:00",label:"Pagi",time:"10.00 WIB"},{value:"14:00",label:"Siang",time:"14.00 WIB"},{value:"16:00",label:"Sore",time:"16.00 WIB"},{value:"19:00",label:"Malam",time:"19.00 WIB"}],qa=[[{code:"1A",label:"1A"},{code:"SOPIR",label:"SOPIR",isDriver:!0}],[{code:"2A",label:"2A"},{code:"3A",label:"3A"}],[{code:"4A",label:"4A"},{code:"5A",label:"5A"}]],Zn=qa.flat().filter(e=>!e.isDriver).length,b={currentUser:null,date:Ke(),direction:"from_pkb",bookings:[],loading:!1,drivers:[],mobils:[],formOptions:null,selectedSeats:[],passengerDraftMap:{},editItem:null,deleteItem:null,slotDriverMap:{},slotMobilMap:{},occupiedSeatsForForm:[],slotExtraArmadas:{},currentFormArmadaIndex:1,_pendingChoiceArmada:1,_pendingChoiceTime:""};function Tt(e){const t=document.getElementById(e);if(!t)return null;try{return JSON.parse(t.textContent||"{}")}catch{return null}}function Ks(e){return["Super Admin","Admin"].includes(e)}function zs(e){const t=e?"#dc2626":"#166534",n=e?"#991b1b":"#14532d";return`
        <svg viewBox="0 0 50 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="2" width="30" height="20" rx="8" fill="${t}" stroke="${n}" stroke-width="1.5"/>
            <rect x="5" y="18" width="40" height="28" rx="9" fill="${t}" stroke="${n}" stroke-width="1.5"/>
            <rect x="7" y="44" width="36" height="14" rx="7" fill="${t}" stroke="${n}" stroke-width="1.5" opacity="0.8"/>
            <rect x="2" y="22" width="5" height="18" rx="2.5" fill="${t}" opacity="0.6"/>
            <rect x="43" y="22" width="5" height="18" rx="2.5" fill="${t}" opacity="0.6"/>
        </svg>`}function Ws(){return`
        <svg viewBox="0 0 50 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="25" cy="30" r="18" stroke="rgba(148,163,184,0.5)" stroke-width="2.5"/>
            <circle cx="25" cy="30" r="6" fill="rgba(148,163,184,0.4)"/>
            <line x1="25" y1="12" x2="25" y2="24" stroke="rgba(148,163,184,0.5)" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="7" y1="30" x2="19" y2="30" stroke="rgba(148,163,184,0.5)" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="31" y1="30" x2="43" y2="30" stroke="rgba(148,163,184,0.5)" stroke-width="2.5" stroke-linecap="round"/>
        </svg>`}function Xs(){return'<svg viewBox="0 0 24 24" fill="none"><path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path><path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg>'}function Zs(){return'<svg viewBox="0 0 24 24" fill="none"><path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg>'}function Qn(){return'<svg viewBox="0 0 24 24" fill="none" style="width:12px;height:12px;flex-shrink:0;"><path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'}function Qs(){return'<svg viewBox="0 0 24 24" fill="none" style="width:12px;height:12px;flex-shrink:0;"><rect x="2" y="7" width="15" height="10" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M17 10H20L22 13V17H17V10Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="6" cy="18" r="1.5" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="18" r="1.5" stroke="currentColor" stroke-width="1.5"/></svg>'}function Ys(){return'<svg viewBox="0 0 24 24" fill="none" style="width:12px;height:12px;flex-shrink:0;"><path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 2V8H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 13H16M8 17H13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'}function ei(e){return`
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
                    ${qa.map(n=>`<div class="bpg-seat-row">${n.map(r=>{if(r.isDriver)return`
                    <div class="bpg-seat-item bpg-seat-driver" title="Sopir / Pengemudi">
                        <div class="bpg-seat-icon">${Ws()}</div>
                        <span class="bpg-seat-label">SOPIR</span>
                    </div>`;const o=e[r.code],s=!!o,i=s?"bpg-seat-occupied":"bpg-seat-available",c=s?g(o.nama_pemesanan||"-"):"";return`
                <div class="bpg-seat-item ${i}" title="${s?c:"Tersedia"}">
                    <div class="bpg-seat-icon">${zs(s)}</div>
                    <span class="bpg-seat-label">${r.label}</span>
                    ${s?`<span class="bpg-seat-name">${c}</span>`:""}
                </div>`}).join("")}</div>`).join("")}
                </div>
            </div>
        </div>`}function ti(e){if(e.length===0)return`
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
            ${e.map(r=>{const o=r.selected_seats_label||"-",s=r.departure_status||"",i=n(s),c=t.map(d=>{const l=s===d.value;return`<button class="bpg-depart-opt ${d.cls}${l?" is-active":""}" type="button"
                data-departure-status="${g(d.value)}"
                data-booking-departure="${g(String(r.id))}">${g(d.label)}</button>`}).join("");return`
            <div class="bpg-passenger-item" data-booking-id="${g(String(r.id))}">
                <div class="bpg-passenger-item-row">
                    <div class="bpg-passenger-seats">
                        ${o.split(",").map(d=>`<span class="stock-value-badge stock-value-badge-blue">${g(d.trim())}</span>`).join("")}
                    </div>
                    <div class="bpg-passenger-info">
                        <span class="bpg-passenger-name">${g(r.nama_pemesanan||"-")}</span>
                        <span class="bpg-passenger-phone">${g(r.phone||"-")}</span>
                    </div>
                </div>
                <div class="bpg-passenger-item-actions-row">
                    <span class="${g(r.payment_status_badge_class||"stock-value-badge stock-value-badge-blue")} bpg-status-sm">${g(r.payment_status||"-")}</span>
                    <div class="bpg-depart-dropdown" data-depart-dropdown="${g(String(r.id))}">
                        <button class="bpg-depart-trigger ${i.cls}" type="button" data-depart-toggle="${g(String(r.id))}">
                            <svg viewBox="0 0 24 24" fill="none" style="width:11px;height:11px;flex-shrink:0;"><circle cx="12" cy="12" r="2.5" fill="currentColor"/><circle cx="12" cy="5" r="2" fill="currentColor"/><circle cx="12" cy="19" r="2" fill="currentColor"/></svg>
                            ${g(i.label)}
                            <svg viewBox="0 0 24 24" fill="none" style="width:10px;height:10px;flex-shrink:0;"><path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </button>
                        <div class="bpg-depart-menu" hidden>
                            ${c}
                        </div>
                    </div>
                    <div style="flex:1;"></div>
                    <button class="bpg-lihat-btn" type="button" data-booking-lihat="${g(String(r.id))}" aria-label="Lihat detail ${g(r.nama_pemesanan)}">
                        <svg viewBox="0 0 24 24" fill="none" style="width:13px;height:13px;"><path d="M2.5 12C4.4 8.2 8 6 12 6C16 6 19.6 8.2 21.5 12C19.6 15.8 16 18 12 18C8 18 4.4 15.8 2.5 12Z" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/></svg>
                        Lihat
                    </button>
                    <button class="admin-users-icon-button" type="button" data-booking-edit="${g(String(r.id))}" title="Edit pemesanan">
                        ${Xs()}
                    </button>
                    <button class="admin-users-icon-button admin-users-icon-button-danger" type="button" data-booking-delete="${g(String(r.id))}" data-booking-name="${g(r.nama_pemesanan)}" title="Hapus pemesanan">
                        ${Zs()}
                    </button>
                </div>
            </div>`}).join("")}
        </div>`}function ni(e){const t={};return e.forEach(n=>{(Array.isArray(n.selected_seats)?n.selected_seats:[]).forEach(r=>{t[r]||(t[r]=n)})}),t}function ai(e,t,n,a){const r=ni(n),o=n.reduce((p,E)=>p+(Number(E.passenger_count)||0),0),s=o>=Zn,i=`${e.value}__${b.direction}__${t}`;if(!b.slotDriverMap[i]){const p=n.find(E=>E.driver_id);p&&(b.slotDriverMap[i]=p.driver_id)}const c=b.slotDriverMap[i]||"",d=b.slotMobilMap[i]||"",l=s?"stock-value-badge-red":"stock-value-badge-yellow",k=b.drivers.map(p=>{const E=p.lokasi?`${p.nama} (${p.lokasi})`:p.nama;return`<option value="${g(p.id)}" ${c===p.id?"selected":""}>${g(E)}</option>`}).join(""),y=b.mobils.map(p=>{const E=`${p.kode_mobil} — ${p.jenis_mobil}`;return`<option value="${g(p.id)}" ${d===p.id?"selected":""}>${g(E)}</option>`}).join(""),A=[...new Set(n.map(p=>(p.service_type||"").trim()).filter(Boolean))],m=a>1?`<span class="bpg-armada-badge">${Qs()} Armada ${t}</span>`:"",f=s?`<button class="bpg-add-armada-btn" type="button"
                data-add-armada="${g(e.value)}"
                data-armada-index="${t}"
                title="Tambah armada ke-${t+1} untuk jadwal ${g(e.time)}">
                ${Qn()}
                Tambah Armada
            </button>`:"";return`
        <article class="bpg-slot-card" data-slot="${g(e.value)}" data-direction="${g(b.direction)}" data-armada="${t}">
            <div class="bpg-slot-head">
                <div class="bpg-slot-head-row">
                    <div class="bpg-slot-time-badge">
                        <span class="bpg-slot-period">${g(e.label)}</span>
                        <strong class="bpg-slot-time">${g(e.time)}</strong>
                    </div>
                    <div class="bpg-slot-head-meta">
                        ${m}
                        <div class="bpg-slot-service-types">
                            ${A.length>0?A.map(p=>`<span class="bpg-service-badge">${g(p)}</span>`).join(""):'<span class="bpg-service-badge bpg-service-badge--empty">Belum ada layanan</span>'}
                        </div>
                        <span class="stock-value-badge ${l}">${o} / ${Zn} Kursi</span>
                    </div>
                </div>
                ${f?`<div class="bpg-slot-head-row">${f}</div>`:""}
            </div>

            ${ei(r)}

            <div class="bpg-slot-assignment">
                <div class="bpg-slot-select-group">
                    <label>
                        <svg viewBox="0 0 24 24" fill="none" style="width:13px;height:13px;"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/><path d="M4 20C4 17.2386 7.58172 15 12 15C16.4183 15 20 17.2386 20 20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
                        Pilih Driver
                    </label>
                    <select class="bpg-slot-select" data-slot-driver="${g(e.value)}__${t}">
                        <option value="">— Belum ditentukan —</option>
                        ${k}
                    </select>
                </div>
                <div class="bpg-slot-select-group">
                    <label>
                        <svg viewBox="0 0 24 24" fill="none" style="width:13px;height:13px;"><rect x="2" y="7" width="20" height="10" rx="3" stroke="currentColor" stroke-width="1.8"/><circle cx="6" cy="17" r="2" stroke="currentColor" stroke-width="1.8"/><circle cx="18" cy="17" r="2" stroke="currentColor" stroke-width="1.8"/></svg>
                        Pilih Mobil
                    </label>
                    <select class="bpg-slot-select" data-slot-mobil="${g(e.value)}__${t}">
                        <option value="">— Belum ditentukan —</option>
                        ${y}
                    </select>
                </div>
            </div>

            ${ti(n)}

            <button class="bpg-slot-book-btn" type="button"
                data-slot-book="${g(e.value)}"
                data-slot-armada="${t}"
                title="Tambah pemesanan untuk Armada ${t}, jadwal ${g(e.time)}">
                ${Qn()}
                Tambah Pemesanan Armada ${t}
            </button>
            <button class="bpg-surat-jalan-btn" type="button"
                data-surat-jalan="${g(e.value)}"
                data-surat-jalan-armada="${t}"
                title="Buat Surat Jalan Armada ${t}, jadwal ${g(e.time)}">
                ${Ys()}
                Surat Jalan
            </button>
        </article>`}function ri(e,t){const n={};t.forEach(c=>{const d=c.armada_index||1;n[d]||(n[d]=[]),n[d].push(c)});const a=`${e.value}__${b.direction}`,r=t.length>0?Math.max(...Object.keys(n).map(Number)):1,o=b.slotExtraArmadas[a]||1,s=Math.max(r,o),i=[];for(let c=1;c<=s;c++)i.push(ai(e,c,n[c]||[],s));return`<div class="bpg-slot-group" data-slot-group="${g(e.value)}">${i.join("")}</div>`}function oi(){const e=document.getElementById("bpg-slots-shell");e&&(e.innerHTML=`
            <div class="admin-users-loading-inline" style="padding:40px 0;">
                <span class="admin-users-loading-inline-spinner" aria-hidden="true"></span>
                <span>Memuat data penumpang...</span>
            </div>`)}function Na(){const e=document.getElementById("bpg-slots-shell");if(!e)return;const t={};Xn.forEach(a=>{t[a.value]=[]}),b.bookings.forEach(a=>{const o=(a.trip_time||"").trim().substring(0,5);t[o]&&t[o].push(a)});const n=Xn.map(a=>ri(a,t[a.value]||[]));e.innerHTML=`<div class="bpg-slots-grid">${n.join("")}</div>`}async function we(){b.loading=!0,oi();try{const e=new URLSearchParams({date:b.date,direction:b.direction,limit:200,page:1}),[t,n]=await Promise.all([v(`/bookings?${e}`),v(`/bookings/armada-extras?date=${b.date}`).catch(()=>({}))]);b.bookings=Array.isArray(t)?t:[],n&&typeof n=="object"&&Object.entries(n).forEach(([a,r])=>{const o=`${a}__${b.direction}`;b.slotExtraArmadas[o]=Math.max(b.slotExtraArmadas[o]||1,Number(r)||1)})}catch(e){b.bookings=[],e.status!==403&&h(e.message||"Gagal memuat data penumpang")}finally{b.loading=!1,Na()}}function si(e){document.getElementById("bpg-detail-title").textContent=e.nama_pemesanan||"-",document.getElementById("bpg-detail-subtitle").textContent=`${e.booking_code||"-"} · ${e.booking_status||"-"}`,document.getElementById("bpg-detail-full-link").href=`/dashboard/bookings/${e.id}`;const t=e.category==="Paket",n=document.getElementById("bpg-detail-ticket-link"),a=document.getElementById("bpg-detail-surat-link");t?(n.hidden=!0,a.hidden=!1,a.href=`/dashboard/bookings/${e.id}/surat-bukti`):(n.hidden=!1,n.href=`/dashboard/bookings/${e.id}/ticket`,a.hidden=!0);const r=document.getElementById("bpg-detail-body");r.innerHTML=`
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
                <span>Armada</span>
                <strong>Armada ${g(String(e.armada_index||1))}</strong>
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
        </div>`,j("bpg-detail-modal")}function ii(){return(b.formOptions?.seat_options||[]).map(e=>e.code)}function an(e){const t=new Map(ii().map((n,a)=>[n,a]));return Array.from(new Set((e||[]).map(n=>String(n).trim()).filter(n=>t.has(n)))).sort((n,a)=>(t.get(n)??999)-(t.get(a)??999))}function wt(){return Number(document.getElementById("booking-passenger-count")?.value||0)}function di(){const e=wt();return(b.formOptions?.seat_options||[]).filter(t=>!t.is_optional||e>=6).map(t=>t.code)}function li(){return b.formOptions?.payment_status_options||[]}function ci(e){return e==="transfer"?["Belum Bayar","Menunggu Pembayaran","Menunggu Verifikasi","Dibayar"]:e==="qris"?["Belum Bayar","Menunggu Pembayaran","Dibayar"]:e==="cash"?["Belum Bayar","Dibayar Tunai"]:["Belum Bayar"]}function ui(e){return e==="transfer"?"Menunggu Pembayaran":e==="qris"?"Dibayar":e==="cash"?"Dibayar Tunai":"Belum Bayar"}function mi(e){return e==="transfer"?"Menunggu Verifikasi Pembayaran":e==="qris"||e==="cash"?"Diproses":"Draft"}function pi(e,t){if(!e||!t||e===t)return null;const a=(b.formOptions?.route_matrix||{})?.[e]?.[t];return a==null?null:Number(a)}function Ua(){return Math.max(0,parseInt(document.getElementById("booking-additional-fare")?.value||"0",10)||0)}function Ie(){const e=document.getElementById("booking-from-city")?.value||"",t=document.getElementById("booking-to-city")?.value||"",n=wt(),a=pi(e,t),r=Ua(),o=a!==null?a+r:null,s=o!==null?o*n:null,i=document.getElementById("booking-price-per-seat"),c=document.getElementById("booking-total-amount");i&&(i.value=a!==null?N(a):""),c&&(c.value=s!==null?N(s):"")}function rn(){const e=document.getElementById("booking-payment-method")?.value||"",t=document.getElementById("booking-payment-status"),n=document.getElementById("booking-booking-status"),a=document.getElementById("booking-bank-account-group"),r=document.getElementById("booking-bank-account-code"),o=ci(e),s=t?.value||"";a&&(a.hidden=e!=="transfer"),r&&e!=="transfer"&&(r.value=""),t&&(t.innerHTML=li().filter(i=>o.includes(i.value)).map(i=>`<option value="${g(i.value)}">${g(i.label)}</option>`).join(""),t.value=o.includes(s)?s:ui(e)),n&&(n.value=mi(e))}function gi(){const e=document.getElementById("booking-selected-seats-inputs");e&&(e.innerHTML=b.selectedSeats.map(t=>`<input type="hidden" name="selected_seats[]" value="${g(t)}">`).join(""))}function fi(){const e=document.getElementById("booking-selected-seat-count"),t=document.getElementById("booking-selected-seat-label");e&&(e.textContent=String(b.selectedSeats.length)),t&&(t.textContent=b.selectedSeats.length>0?b.selectedSeats.join(", "):"Belum dipilih")}function Nt(){document.querySelectorAll("[data-passenger-seat]").forEach(e=>{const t=e.dataset.passengerSeat;t&&(b.passengerDraftMap[t]={seat_no:t,name:e.querySelector("[data-passenger-name]")?.value.trim()||"",phone:e.querySelector("[data-passenger-phone]")?.value.trim()||""})})}function de(e=null){const t=document.getElementById("booking-passenger-editor");if(t){if(e&&(b.passengerDraftMap=Object.fromEntries(e.map(n=>[n.seat_no,n]))),b.selectedSeats.length===0){t.innerHTML='<div class="dashboard-empty-state dashboard-empty-state--block bookings-passenger-empty">Pilih kursi terlebih dahulu untuk menampilkan form data penumpang.</div>';return}t.innerHTML=`
        <div class="bookings-passenger-grid bookings-passenger-grid--editor">
            ${b.selectedSeats.map((n,a)=>{const r=b.passengerDraftMap[n]||{name:"",phone:""};return`
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
        </div>`}}async function Se(){const e=document.getElementById("booking-trip-date")?.value||"",t=document.getElementById("booking-trip-time")?.value||"",n=document.getElementById("booking-from-city")?.value||"",a=document.getElementById("booking-to-city")?.value||"",r=b.editItem?.id||"",o=b.currentFormArmadaIndex||1;if(!e||!t){b.occupiedSeatsForForm=[];return}try{const s=new URLSearchParams({trip_date:e,trip_time:t,armada_index:o});n&&s.set("from_city",n),a&&s.set("to_city",a),r&&s.set("exclude_id",r);const i=await v(`/bookings/occupied-seats?${s}`);b.occupiedSeatsForForm=Array.isArray(i?.occupied_seats)?i.occupied_seats:[]}catch{b.occupiedSeatsForForm=[]}}function le(){const e=document.querySelectorAll("[data-seat-code]"),t=wt(),n=di();b.selectedSeats=an(b.selectedSeats.filter(a=>n.includes(a)&&!b.occupiedSeatsForForm.includes(a))),e.forEach(a=>{const r=a.dataset.seatCode,o=n.includes(r),s=b.occupiedSeatsForForm.includes(r),i=b.selectedSeats.includes(r),c=b.selectedSeats.length>=t&&!i;a.hidden=!o,a.classList.toggle("is-selected",i),a.classList.toggle("is-occupied",s),a.classList.toggle("is-disabled",!s&&c),a.disabled=!o||s||!i&&c,s?a.title="Kursi sudah dipesan":a.title=""}),gi(),fi()}function At(e=1,t=""){document.getElementById("booking-form")?.reset(),b.editItem=null,b.selectedSeats=[],b.passengerDraftMap={},b.currentFormArmadaIndex=e;const a=b.date||Ke();document.getElementById("booking-id").value="",document.getElementById("booking-armada-index").value=String(e),document.getElementById("booking-form-title").textContent="Tambah Pemesanan";const r=e>1?` (Armada ${e})`:"";document.getElementById("booking-form-description").textContent=`Lengkapi data pemesanan reguler dari dashboard admin${r}.`,document.getElementById("booking-trip-date").value=a,t&&(document.getElementById("booking-trip-time").value=t),document.getElementById("booking-passenger-count").value="1",document.getElementById("booking-additional-fare").value="0",document.getElementById("booking-payment-method").value="",document.getElementById("booking-booking-status").value="Draft",rn(),Ie(),oe(document.getElementById("booking-submit-btn"),!1,"Menyimpan..."),Se().then(()=>{le(),de()})}function bi(e){b.editItem=e,b.selectedSeats=an(e.selected_seats||[]),b.passengerDraftMap=Object.fromEntries((e.passengers||[]).map(n=>[n.seat_no,n])),b.currentFormArmadaIndex=e.armada_index||1,document.getElementById("booking-id").value=e.id,document.getElementById("booking-armada-index").value=String(e.armada_index||1),document.getElementById("booking-booking-for").value=e.booking_for,document.getElementById("booking-category").value=e.category,document.getElementById("booking-from-city").value=e.from_city,document.getElementById("booking-to-city").value=e.to_city,document.getElementById("booking-trip-date").value=e.trip_date_value,document.getElementById("booking-trip-time").value=e.trip_time_value,document.getElementById("booking-passenger-count").value=String(e.passenger_count),document.getElementById("booking-driver-name").value=e.driver_name==="Menunggu Penetapan Driver"?"":e.driver_name||"",document.getElementById("booking-additional-fare").value=String(e.additional_fare_per_passenger||0),document.getElementById("booking-pickup-location").value=e.pickup_location,document.getElementById("booking-dropoff-location").value=e.dropoff_location,document.getElementById("booking-payment-method").value=e.payment_method_value||"",rn(),document.getElementById("booking-payment-status").value=e.payment_status,document.getElementById("booking-booking-status").value=e.booking_status,document.getElementById("booking-bank-account-code").value=e.bank_account_code||"",document.getElementById("booking-notes").value=e.notes||"";const t=(e.armada_index||1)>1?` (Armada ${e.armada_index})`:"";document.getElementById("booking-form-title").textContent="Edit Pemesanan",document.getElementById("booking-form-description").textContent=`Perbarui data pemesanan reguler yang dipilih${t}.`,Ie(),oe(document.getElementById("booking-submit-btn"),!1,"Menyimpan..."),Se().then(()=>{le(),de(e.passengers||[])})}function ki(){return Nt(),{booking_for:document.getElementById("booking-booking-for")?.value||"",category:document.getElementById("booking-category")?.value||"Reguler",from_city:document.getElementById("booking-from-city")?.value||"",to_city:document.getElementById("booking-to-city")?.value||"",trip_date:document.getElementById("booking-trip-date")?.value||"",trip_time:document.getElementById("booking-trip-time")?.value||"",passenger_count:Number(document.getElementById("booking-passenger-count")?.value||0),driver_name:document.getElementById("booking-driver-name")?.value.trim()||"",additional_fare_per_passenger:Ua(),pickup_location:document.getElementById("booking-pickup-location")?.value.trim()||"",dropoff_location:document.getElementById("booking-dropoff-location")?.value.trim()||"",selected_seats:b.selectedSeats,passengers:b.selectedSeats.map(e=>({seat_no:e,name:b.passengerDraftMap?.[e]?.name||"",phone:b.passengerDraftMap?.[e]?.phone||""})),payment_method:document.getElementById("booking-payment-method")?.value||"",payment_status:document.getElementById("booking-payment-status")?.value||"Belum Bayar",booking_status:document.getElementById("booking-booking-status")?.value||"Draft",bank_account_code:document.getElementById("booking-bank-account-code")?.value||"",notes:document.getElementById("booking-notes")?.value.trim()||"",armada_index:b.currentFormArmadaIndex||1}}async function hi(e){bi(await v(`/bookings/${e}`)),j("booking-form-modal")}function yi(e){b.deleteItem=e,document.getElementById("booking-delete-copy").innerHTML=`Apakah Anda yakin ingin menghapus data pemesanan <strong>${g(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`,j("booking-delete-modal")}function Yn(){const e=document.getElementById("bookings-access-note"),t=document.getElementById("bpg-route-tabs"),n=document.getElementById("bpg-slots-shell");e&&(e.hidden=!1),t&&(t.hidden=!0),n&&(n.hidden=!0)}function vi(e){return e==="Berangkat"?{label:"Berangkat",cls:"bpg-depart-trigger--go"}:e==="Tidak Berangkat"?{label:"Tidak Berangkat",cls:"bpg-depart-trigger--no"}:e==="Di Oper"?{label:"Di Oper",cls:"bpg-depart-trigger--oper"}:{label:"Status",cls:""}}function Ei({user:e}={}){const t=document.getElementById("bookings-add-btn"),n=document.getElementById("bookings-date-picker"),a=document.getElementById("bpg-route-tabs"),r=document.getElementById("bpg-slots-shell"),o=document.getElementById("booking-form"),s=document.getElementById("booking-delete-confirm-btn"),i=document.getElementById("booking-seat-grid"),c=document.getElementById("booking-passenger-editor"),d=document.getElementById("booking-payment-method");if(b.formOptions=Tt("bookings-form-options"),b.drivers=Tt("bookings-drivers-data")||[],b.mobils=Tt("bookings-mobils-data")||[],b.currentUser=e||window.transitAuthUser||null,b.date=Ke(),!Ks(b.currentUser?.role)){Yn();return}r&&(r.hidden=!1);const l=document.getElementById("bookings-access-note");l&&(l.hidden=!0),n&&(n.value=b.date,n.addEventListener("change",async()=>{b.date=n.value,b.slotDriverMap={},b.slotMobilMap={},b.slotExtraArmadas={},await we()})),a?.addEventListener("click",async m=>{const f=m.target.closest("[data-direction]");if(!f)return;const p=f.dataset.direction;p!==b.direction&&(b.direction=p,b.slotDriverMap={},b.slotMobilMap={},b.slotExtraArmadas={},document.querySelectorAll(".bpg-route-tab").forEach(E=>{E.classList.toggle("is-active",E.dataset.direction===p)}),await we())});function k(m=null){r?.querySelectorAll("[data-depart-dropdown]").forEach(f=>{String(f.dataset.departDropdown)!==String(m)&&(f.querySelector(".bpg-depart-menu")?.removeAttribute("hidden"),f.querySelector(".bpg-depart-menu")?.setAttribute("hidden",""))})}document.addEventListener("click",m=>{m.target.closest("[data-depart-dropdown]")||k()}),r?.addEventListener("click",async m=>{const f=m.target.closest("[data-depart-toggle]"),p=m.target.closest("[data-booking-departure]"),E=m.target.closest("[data-booking-lihat]"),P=m.target.closest("[data-booking-edit]"),L=m.target.closest("[data-booking-delete]"),R=m.target.closest("[data-add-armada]"),D=m.target.closest("[data-slot-book]"),V=m.target.closest("[data-surat-jalan]");try{if(f){const M=f.dataset.departToggle,G=r.querySelector(`[data-depart-dropdown="${CSS.escape(M)}"]`)?.querySelector(".bpg-depart-menu");if(!G)return;const z=G.hasAttribute("hidden");k(M),G.toggleAttribute("hidden",!z);return}if(p){const M=p.dataset.bookingDeparture,H=p.dataset.departureStatus,G=b.bookings.find($=>String($.id)===String(M));if(!G)return;const z=G.departure_status===H?"":H;G.departure_status=z;const W=r.querySelector(`[data-depart-dropdown="${CSS.escape(M)}"]`);if(W){const $=W.querySelector(".bpg-depart-trigger"),q=vi(z);$.className=`bpg-depart-trigger ${q.cls}`,$.childNodes.forEach(F=>{F.nodeType===3&&(F.textContent=q.label)}),W.querySelectorAll("[data-booking-departure]").forEach(F=>{F.classList.toggle("is-active",F.dataset.departureStatus===z)}),W.querySelector(".bpg-depart-menu")?.setAttribute("hidden","")}await v(`/bookings/${M}/departure-status`,{method:"PATCH",body:{departure_status:z}});return}if(E){const M=E.dataset.bookingLihat,H=b.bookings.find(G=>String(G.id)===String(M));H&&si(H);return}if(P){await hi(P.dataset.bookingEdit);return}if(L){yi({id:L.dataset.bookingDelete,nama:L.dataset.bookingName});return}if(R){const M=R.dataset.addArmada,G=parseInt(R.dataset.armadaIndex||"1")+1,z=`${M}__${b.direction}`;b.slotExtraArmadas[z]=Math.max(b.slotExtraArmadas[z]||1,G),v("/bookings/armada-extras",{method:"POST",body:{trip_date:b.date,trip_time:M,armada_index:G}}).catch(()=>{}),Na(),b._pendingChoiceArmada=G,b._pendingChoiceTime=M,j("booking-type-choice-modal");return}if(D){const M=D.dataset.slotBook,H=parseInt(D.dataset.slotArmada||"1");b._pendingChoiceArmada=H,b._pendingChoiceTime=M,j("booking-type-choice-modal");return}if(V){const M=V.dataset.suratJalan,H=parseInt(V.dataset.suratJalanArmada||"1"),G=`${M}__${b.direction}__${H}`,z=b.slotDriverMap[G]||"",W=b.slotMobilMap[G]||"",$=z?b.drivers.find(re=>String(re.id)===String(z)):null,q=W?b.mobils.find(re=>String(re.id)===String(W)):null,F=new URLSearchParams({date:b.date,trip_time:M,armada_index:String(H),direction:b.direction});$&&F.set("driver_name",$.nama),q&&F.set("no_pol",q.kode_mobil),window.open(`/dashboard/bookings/surat-jalan?${F}`,"_blank");return}}catch(M){h(M.message||"Gagal memuat data pemesanan")}}),r?.addEventListener("change",async m=>{const f=m.target.closest("[data-slot-driver]"),p=m.target.closest("[data-slot-mobil]");if(f){const[E,P]=f.dataset.slotDriver.split("__"),L=parseInt(P||"1"),R=f.value,D=f.options[f.selectedIndex],V=R&&D?.text.split(" (")[0]||"",M=`${E}__${b.direction}__${L}`;b.slotDriverMap[M]=R;try{await v("/bookings/slot-assign",{method:"PATCH",body:{trip_date:b.date,trip_time:E,direction:b.direction,armada_index:L,driver_id:R||null,driver_name:V}}),U("Driver berhasil diperbarui")}catch(H){h(H.message||"Gagal memperbarui driver")}}if(p){const[E,P]=p.dataset.slotMobil.split("__"),L=parseInt(P||"1"),R=p.value,D=`${E}__${b.direction}__${L}`;b.slotMobilMap[D]=R}});function y(m=1,f=""){const p=document.getElementById("package-form");p&&p.reset();const E=document.getElementById("package-armada-index");E&&(E.value=String(m));const P=document.getElementById("pkg-trip-date");P&&(P.value=b.date);const L=document.getElementById("pkg-trip-time");L&&f&&(L.value=f);const R=document.getElementById("pkg-bank-account-group");R&&(R.hidden=!0);const D=document.getElementById("pkg-seat-group");D&&(D.hidden=!0);const V=document.getElementById("package-form-success-banner");V&&(V.hidden=!0),A()}function A(){const m=parseInt(document.getElementById("pkg-fare-amount")?.value||"0",10)||0,f=parseInt(document.getElementById("pkg-additional-fare")?.value||"0",10)||0,p=parseInt(document.getElementById("pkg-item-qty")?.value||"1",10)||1,E=(m+f)*p,P=document.getElementById("pkg-total-display");P&&(P.value=E>0?"Rp "+E.toLocaleString("id-ID"):"")}return document.getElementById("pkg-fare-amount")?.addEventListener("input",A),document.getElementById("pkg-additional-fare")?.addEventListener("input",A),document.getElementById("pkg-item-qty")?.addEventListener("input",A),document.getElementById("pkg-payment-method")?.addEventListener("change",m=>{const f=document.getElementById("pkg-bank-account-group");f&&(f.hidden=m.target.value!=="transfer")}),document.getElementById("pkg-package-size")?.addEventListener("change",m=>{const f=document.getElementById("pkg-seat-group");f&&(f.hidden=m.target.value!=="Besar");const p=document.getElementById("pkg-seat-code");p&&m.target.value!=="Besar"&&(p.value="")}),document.getElementById("package-form")?.addEventListener("submit",async m=>{m.preventDefault();const f=document.getElementById("package-submit-btn");oe(f,!0,"Menyimpan...");try{const p=parseInt(document.getElementById("pkg-fare-amount")?.value||"0",10)||0,E=parseInt(document.getElementById("pkg-additional-fare")?.value||"0",10)||0,P=parseInt(document.getElementById("pkg-item-qty")?.value||"1",10)||1,L=document.getElementById("pkg-payment-method")?.value||"",R={armada_index:parseInt(document.getElementById("package-armada-index")?.value||"1",10),trip_date:document.getElementById("pkg-trip-date")?.value||"",trip_time:document.getElementById("pkg-trip-time")?.value||"",from_city:document.getElementById("pkg-from-city")?.value||"",to_city:document.getElementById("pkg-to-city")?.value||"",sender_name:document.getElementById("pkg-sender-name")?.value.trim()||"",sender_phone:document.getElementById("pkg-sender-phone")?.value.trim()||"",sender_address:document.getElementById("pkg-sender-address")?.value.trim()||"",recipient_name:document.getElementById("pkg-recipient-name")?.value.trim()||"",recipient_phone:document.getElementById("pkg-recipient-phone")?.value.trim()||"",recipient_address:document.getElementById("pkg-recipient-address")?.value.trim()||"",item_name:document.getElementById("pkg-item-name")?.value.trim()||"",item_qty:P,package_size:document.getElementById("pkg-package-size")?.value||"",seat_code:document.getElementById("pkg-package-size")?.value==="Besar"&&document.getElementById("pkg-seat-code")?.value||"",fare_amount:p,additional_fare:E,payment_method:L||null,payment_status:document.getElementById("pkg-payment-status")?.value||"Belum Bayar",bank_account_code:L==="transfer"&&document.getElementById("pkg-bank-account-code")?.value||""},D=await v("/bookings/quick-package",{method:"POST",body:R}),V=document.getElementById("package-form-success-banner"),M=document.getElementById("package-form-booking-code"),H=document.getElementById("package-form-download-link");V&&(V.hidden=!1),M&&(M.textContent="Kode Booking: "+D.booking_code+(D.invoice_number&&D.invoice_number!=="-"?" | No. Surat: "+D.invoice_number:"")),H&&(H.href=D.invoice_download_url),U("Paket berhasil disimpan: "+D.booking_code),await we()}catch(p){h(p.message||"Silakan periksa kembali data yang diinput","Gagal menyimpan paket")}finally{oe(f,!1,"Menyimpan...")}}),document.getElementById("choice-passenger-btn")?.addEventListener("click",()=>{K("booking-type-choice-modal"),At(b._pendingChoiceArmada||1,b._pendingChoiceTime||""),j("booking-form-modal")}),document.getElementById("choice-package-btn")?.addEventListener("click",()=>{K("booking-type-choice-modal"),y(b._pendingChoiceArmada||1,b._pendingChoiceTime||""),j("package-form-modal")}),t?.addEventListener("click",()=>{b._pendingChoiceArmada=1,b._pendingChoiceTime="",j("booking-type-choice-modal")}),i?.addEventListener("click",m=>{const f=m.target.closest("[data-seat-code]");if(!f||f.disabled)return;Nt();const p=f.dataset.seatCode;b.selectedSeats.includes(p)?b.selectedSeats=b.selectedSeats.filter(E=>E!==p):b.selectedSeats.length<wt()&&(b.selectedSeats=an([...b.selectedSeats,p])),le(),de()}),document.getElementById("booking-passenger-count")?.addEventListener("change",()=>{Nt(),le(),de(),Ie()}),document.getElementById("booking-additional-fare")?.addEventListener("input",Ie),document.getElementById("booking-trip-date")?.addEventListener("change",()=>{Se().then(()=>{le(),de()})}),document.getElementById("booking-trip-time")?.addEventListener("change",()=>{Se().then(()=>{le(),de()})}),document.getElementById("booking-from-city")?.addEventListener("change",()=>{Ie(),Se().then(()=>{le(),de()})}),document.getElementById("booking-to-city")?.addEventListener("change",()=>{Ie(),Se().then(()=>{le(),de()})}),d?.addEventListener("change",rn),c?.addEventListener("input",m=>{const f=m.target.closest("[data-passenger-seat]");if(!f)return;const p=f.dataset.passengerSeat;b.passengerDraftMap[p]={seat_no:p,name:f.querySelector("[data-passenger-name]")?.value.trim()||"",phone:f.querySelector("[data-passenger-phone]")?.value.trim()||""}}),o?.addEventListener("submit",async m=>{m.preventDefault();const f=document.getElementById("booking-submit-btn");oe(f,!0,"Menyimpan...");try{const p=ki();b.editItem?(await v(`/bookings/${b.editItem.id}`,{method:"PUT",body:p}),U("Data pemesanan berhasil diperbarui")):(await v("/bookings",{method:"POST",body:p}),U("Data pemesanan berhasil ditambahkan")),K("booking-form-modal"),At(),await we()}catch(p){h(p.message||"Silakan periksa kembali data yang diinput","Gagal menyimpan data pemesanan")}finally{oe(f,!1,"Menyimpan...")}}),s?.addEventListener("click",async()=>{if(b.deleteItem){oe(s,!0,"Menghapus...");try{await v(`/bookings/${b.deleteItem.id}`,{method:"DELETE"}),U("Data pemesanan berhasil dihapus"),K("booking-delete-modal"),b.deleteItem=null,await we()}catch(m){h(m.message||"Gagal menghapus data pemesanan")}finally{oe(s,!1,"Menghapus...")}}}),At(),we().catch(m=>{if(m.status===403){Yn();return}h(m.message||"Gagal memuat data penumpang")})}function wi(e){const t=document.getElementById(e);if(!t)return{};try{return JSON.parse(t.textContent||"{}")}catch{return{}}}function Bi(){const e=document.querySelector("[data-regular-booking-page]");if(!e)return;const t=wi("regular-booking-route-matrix"),n=e.querySelector("[data-booking-origin]"),a=e.querySelector("[data-booking-destination]"),r=e.querySelector("[data-booking-schedule]"),o=e.querySelector("[data-booking-passengers]"),s=e.querySelector("[data-route-fare-input]"),i=e.querySelector("[data-additional-fare-input]"),c=e.querySelector("[data-estimated-total-input]"),d=e.querySelector("[data-route-feedback]"),l=e.querySelector("[data-route-feedback-title]"),k=e.querySelector("[data-route-feedback-text]"),y=e.querySelector("[data-booking-submit]"),A=Array.from(e.querySelectorAll("[data-booking-type]")),m=e.querySelector("[data-summary-booking-for]"),f=e.querySelector("[data-summary-route]"),p=e.querySelector("[data-summary-schedule]"),E=e.querySelector("[data-summary-passengers]"),P=e.querySelector("[data-summary-fare]"),L=e.querySelector("[data-summary-additional-fare]"),R=e.querySelector("[data-summary-total]"),D=new Map(A.map($=>[$.value,$.dataset.label||$.value])),V=new Map(Array.from(r?.options||[]).filter($=>$.value).map($=>[$.value,$.textContent.trim()]));function M($,q){if(!$||!q||$===q)return null;const F=t?.[$]?.[q];return F==null?null:Number(F)}function H($,q,F){!d||!l||!k||(d.dataset.state=$,l.textContent=q,k.textContent=F)}function G(){e.querySelectorAll(".regular-booking-radio").forEach($=>{const q=$.querySelector('input[type="radio"]');$.classList.toggle("is-selected",!!q?.checked)})}function z($){return $<=0?"Belum dipilih":$===6?"6 Penumpang (Opsional tambahan)":`${$} Penumpang`}function W(){const $=n?.value||"",q=a?.value||"",F=r?.value||"",re=Number(o?.value||0),X=A.find(Bt=>Bt.checked)?.value||"",ne=M($,q),ee=Math.max(parseInt(i?.value||"0",10)||0,0),ue=ne!==null&&re>0?(ne+ee)*re:null;s&&(s.value=ne!==null?N(ne):""),c&&(c.value=ue!==null?N(ue):""),!$||!q?H("idle","Tarif akan ditampilkan otomatis","Pilih asal dan tujuan untuk melihat tarif perjalanan reguler."):$===q?H("error","Asal dan tujuan tidak boleh sama","Silakan pilih tujuan yang berbeda agar tarif dapat dihitung."):ne===null?H("error","Rute belum tersedia","Rute yang Anda pilih saat ini belum tersedia. Silakan pilih kombinasi asal dan tujuan lain."):H("ready","Rute tersedia","Tarif telah diisi otomatis berdasarkan kombinasi rute dua arah yang tersedia."),y&&(y.disabled=!!($&&q&&($===q||ne===null))),m&&(m.textContent=D.get(X)||"Belum dipilih"),f&&(f.textContent=$&&q?`${$} - ${q}`:"Belum dipilih"),p&&(p.textContent=V.get(F)||"Belum dipilih"),E&&(E.textContent=z(re)),P&&(P.textContent=ne!==null?N(ne):"Belum tersedia"),L&&(L.textContent=ee>0?N(ee):"Tidak ada"),R&&(R.textContent=ue!==null?N(ue):"Belum tersedia"),G()}[n,a,r,o].forEach($=>{$?.addEventListener("change",W)}),i?.addEventListener("input",W),A.forEach($=>{$.addEventListener("change",W)}),e.querySelector("form")?.addEventListener("reset",()=>{window.requestAnimationFrame(W)}),W()}function Ii(){const e=document.querySelector("[data-regular-booking-seat-page]");if(!e)return;const t=Number(e.dataset.requiredSeatCount||0),n=Array.from(e.querySelectorAll("[data-seat-card]")),a=Array.from(e.querySelectorAll("[data-seat-input]")),r=e.querySelector("[data-seat-summary-count]"),o=e.querySelector("[data-seat-summary-list]"),s=e.querySelector("[data-seat-summary-remaining]"),i=e.querySelector("[data-seat-submit]"),c=e.querySelector("[data-seat-feedback]"),d=e.querySelector("[data-seat-feedback-title]"),l=e.querySelector("[data-seat-feedback-text]");function k(){return a.filter(f=>f.checked).map(f=>f.value)}function y(f){return f.length>0?f.join(", "):"Belum dipilih"}function A(f,p,E){!c||!d||!l||(c.dataset.state=f,d.textContent=p,l.textContent=E)}function m(){const f=k(),p=f.length,E=t>0&&p>=t;if(n.forEach(P=>{const L=P.querySelector("[data-seat-input]");if(!L)return;const R=L.disabled&&!L.checked&&P.classList.contains("is-occupied"),D=L.checked,V=R||E&&!D;R||(L.disabled=V),P.classList.toggle("is-selected",D),P.classList.toggle("is-disabled",!R&&V)}),r&&(r.textContent=`${p} dari ${t}`),o&&(o.textContent=y(f)),s&&(s.textContent=String(Math.max(t-p,0))),i&&(i.disabled=p!==t),p===0){A("idle","Pilih kursi sesuai jumlah penumpang","Jumlah kursi yang dipilih harus sama dengan jumlah penumpang pada booking draft.");return}if(p<t){A("idle","Pemilihan kursi belum lengkap",`Masih perlu memilih ${t-p} kursi lagi sebelum dapat melanjutkan.`);return}if(t===6){A("ready","Semua kursi sudah terisi","Jumlah penumpang 6 orang sudah terpenuhi dan kursi tambahan 2B ikut terpakai.");return}A("ready","Kursi sudah sesuai","Jumlah kursi yang dipilih sudah sesuai dengan jumlah penumpang dan siap disimpan.")}a.forEach(f=>{f.addEventListener("change",()=>{m()})}),m()}let Oe=null,gt=!1,ea="",Si=3e3,ta=0;const ft=[],_=e=>document.getElementById(e);async function Ha(e){const t=e.trim();if(!t)return;const n=Date.now();if(!(t===ea&&n-ta<Si)){ea=t,ta=n,$e("Memproses scan…");try{const a=await v("/scan-qr",{method:"POST",body:{qr_token:t}});$i(a),_i(a),a.already_scanned?h(a.message,"Tiket Sudah Pernah Di-Scan"):a.is_newly_eligible?U(a.message,"🎉 Eligible Diskon!"):U(a.message,"Scan Berhasil")}catch(a){Ci(a.message||"Scan gagal"),h(a.message||"Scan gagal","Scan Gagal")}finally{$e(gt?"Kamera aktif — arahkan ke QR code.":"")}}}function $i(e){_("qrscan-result-idle").hidden=!0,_("qrscan-result-card").hidden=!1;const t=e.booking||{},n=e.passenger||{},a=e.loyalty_count,r=e.loyalty_target,o=e.discount_eligible,s=Math.min(Math.round(a/r*100),100),i=e.already_scanned?"warn":e.success?"success":"error";_("qrscan-result-header").className="qrscan-result-header qrscan-result-header--"+i,_("qrscan-result-icon").innerHTML=e.already_scanned?Ai():e.success?Ti():Va(),_("qrscan-result-title").textContent=t.booking_code||"-",_("qrscan-result-subtitle").textContent=e.message,_("qr-res-name").textContent=n.name||t.nama_pemesanan||"-",_("qr-res-code").textContent=t.booking_code||"-",_("qr-res-route").textContent=t.route_label||"-",_("qr-res-datetime").textContent=(t.trip_date||"-")+" "+(t.trip_time||""),_("qr-res-seats").textContent=n.seat_no||t.selected_seats||"-",_("qr-res-pax").textContent=(t.passenger_count||0)+" Orang",_("qr-res-loyalty-label").textContent=a+" / "+r,_("qr-res-loyalty-fill").style.width=s+"%",_("qr-res-loyalty-fill").className="qrscan-loyalty-fill"+(o?" qrscan-loyalty-fill--done":""),_("qr-res-loyalty-note").textContent=o?"✅ Eligible diskon "+(e.discount_percentage||50)+"%":"Perlu "+Math.max(r-a,0)+" perjalanan lagi untuk diskon."}function Ci(e){_("qrscan-result-idle").hidden=!0,_("qrscan-result-card").hidden=!1,_("qrscan-result-header").className="qrscan-result-header qrscan-result-header--error",_("qrscan-result-icon").innerHTML=Va(),_("qrscan-result-title").textContent="Scan Gagal",_("qrscan-result-subtitle").textContent=e,["qr-res-name","qr-res-code","qr-res-route","qr-res-datetime","qr-res-seats","qr-res-pax"].forEach(t=>{_(t).textContent="-"}),_("qr-res-loyalty-label").textContent="– / –",_("qr-res-loyalty-fill").style.width="0%",_("qr-res-loyalty-note").textContent=""}function _i(e){const t=e.booking,n=new Date().toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit",second:"2-digit"}),a=e.passenger||{};ft.unshift({booking:t,passenger:a,time:n,success:e.success,already_scanned:e.already_scanned,message:e.message}),Fa()}function Fa(){const e=_("qrscan-history-list");if(ft.length===0){e.innerHTML='<p class="qrscan-history-empty">Belum ada scan dalam sesi ini.</p>';return}e.innerHTML=ft.map(t=>{const n=t.already_scanned?"warn":t.success?"ok":"err",a=t.passenger&&t.passenger.name?t.passenger.name+(t.passenger.seat_no?" ("+t.passenger.seat_no+")":""):t.booking.nama_pemesanan||"-";return`
        <div class="qrscan-history-item qrscan-history-item--${n}">
            <div class="qrscan-history-dot"></div>
            <div class="qrscan-history-body">
                <strong>${g(t.booking.booking_code||"-")}</strong>
                <span>${g(a)}</span>
            </div>
            <span class="qrscan-history-time">${t.time}</span>
        </div>`}).join("")}function xi(){if(!window.Html5Qrcode){h("Library scanner tidak tersedia. Coba muat ulang halaman.","Error");return}_("qrscan-placeholder").hidden=!0,_("qrscan-frame").hidden=!1,_("qrscan-btn-start").hidden=!0,_("qrscan-btn-stop").hidden=!1,gt=!0,$e("Menginisialisasi kamera…"),Oe=new window.Html5Qrcode("qrscan-reader"),Oe.start({facingMode:"environment"},{fps:10,qrbox:{width:240,height:240}},e=>{let t=e.trim();try{const n=JSON.parse(e);n&&(n.qr_token||n.passenger_qr_token)&&(t=n.qr_token||n.passenger_qr_token)}catch{}Ha(t)},()=>{}).then(()=>{$e("Kamera aktif — arahkan ke QR code.")}).catch(e=>{gt=!1,_("qrscan-placeholder").hidden=!1,_("qrscan-frame").hidden=!0,_("qrscan-btn-start").hidden=!1,_("qrscan-btn-stop").hidden=!0,$e("Gagal mengakses kamera. Pastikan izin kamera sudah diberikan."),h(String(e),"Kamera Error")})}function Li(){Oe&&Oe.stop().catch(()=>{}).finally(()=>{Oe=null}),gt=!1,_("qrscan-placeholder").hidden=!1,_("qrscan-frame").hidden=!0,_("qrscan-btn-start").hidden=!1,_("qrscan-btn-stop").hidden=!0,$e("Kamera dihentikan.")}function $e(e){_("qrscan-status-text").textContent=e}function Ti(){return`<svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
        <path d="M8 12l3 3 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`}function Va(){return`<svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
        <path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`}function Ai(){return`<svg viewBox="0 0 24 24" fill="none">
        <path d="M12 9v4M12 17h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    </svg>`}function Mi(){_("qrscan-btn-start").addEventListener("click",xi),_("qrscan-btn-stop").addEventListener("click",Li),_("qrscan-clear-history").addEventListener("click",()=>{ft.length=0,Fa()}),_("qrscan-manual-form").addEventListener("submit",e=>{e.preventDefault();const t=_("qrscan-manual-input").value.trim();t&&(Ha(t),_("qrscan-manual-input").value="")})}const x={data:[],loading:!0,totalCount:0,page:1,search:"",chartLimit:10,editItem:null,deleteItem:null,isSubmitting:!1};let Xe=null;const be=15,Ri=()=>`<svg viewBox="0 0 24 24" fill="none">
    <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
</svg>`,Pi=()=>`<svg viewBox="0 0 24 24" fill="none">
    <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
</svg>`;function Di(){const e=document.getElementById("plkt-table-body");e&&(e.innerHTML=`
        <tr><td colspan="10" class="plkt-table-state">
            <div class="plkt-loading-inline">
                <span class="plkt-loading-inline-spinner" aria-hidden="true"></span>
                <span>Memuat data...</span>
            </div>
        </td></tr>`)}function Oi(){const e=document.getElementById("plkt-table-body");e&&(e.innerHTML='<tr><td colspan="10" class="plkt-table-state plkt-empty-copy">Belum ada data penumpang.</td></tr>')}function na(){const e=document.getElementById("plkt-table-body");if(e){if(x.loading){Di();return}if(x.data.length===0){Oi();return}e.innerHTML=x.data.map((t,n)=>`
        <tr class="plkt-row">
            <td class="plkt-index-cell">${(x.page-1)*be+n+1}</td>
            <td>
                <div class="plkt-user-cell">
                    <span class="plkt-user-avatar" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/>
                        </svg>
                    </span>
                    <div>
                        <span class="plkt-user-name">${g(t.passenger_name||"-")}</span>
                        <span class="plkt-user-seat">Kursi ${g(t.seat_no||"-")}</span>
                    </div>
                </div>
            </td>
            <td class="plkt-phone-cell">${g(t.phone||"-")}</td>
            <td>${g(t.from_city||"-")}</td>
            <td>${g(t.to_city||"-")}</td>
            <td class="plkt-date-cell">${g(t.trip_date||"-")}</td>
            <td class="plkt-time-cell">${g(t.trip_time||"-")}</td>
            <td class="plkt-tarif-cell">${g(t.tarif||"-")}</td>
            <td class="plkt-count-cell">
                <span class="plkt-count-badge">${t.booking_count}x</span>
            </td>
            <td>
                <div class="plkt-action-row">
                    <button class="plkt-icon-button" type="button"
                        data-plkt-edit="${t.id}"
                        aria-label="Edit penumpang ${g(t.passenger_name||"")}">
                        ${Ri()}
                    </button>
                    <button class="plkt-icon-button plkt-icon-button-danger" type="button"
                        data-plkt-delete="${t.id}"
                        data-plkt-name="${g(t.passenger_name||"")}"
                        aria-label="Hapus penumpang ${g(t.passenger_name||"")}">
                        ${Pi()}
                    </button>
                </div>
            </td>
        </tr>`).join("")}}function aa(){const e=document.getElementById("plkt-pagination-shell"),t=document.getElementById("plkt-pagination-info"),n=document.getElementById("plkt-pagination-page"),a=document.getElementById("plkt-prev-page-btn"),r=document.getElementById("plkt-next-page-btn"),o=Math.max(1,Math.ceil(x.totalCount/be));e&&(e.hidden=o<=1),t&&(t.textContent=Me(x.page,be,x.totalCount,x.data.length)),n&&(n.textContent=`${x.page} / ${o}`),a&&(a.disabled=x.page===1),r&&(r.disabled=x.page>=o)}async function Be(){x.loading=!0,na(),aa();try{const[e,t]=await Promise.all([v(`/passengers-lkt?page=${x.page}&limit=${be}${x.search?`&search=${encodeURIComponent(x.search)}`:""}`),v(`/passengers-lkt/count${x.search?`?search=${encodeURIComponent(x.search)}`:""}`)]);x.data=Array.isArray(e)?e:[],x.totalCount=Number(t?.count||0)}catch(e){h(e.message||"Gagal memuat data","Error"),x.data=[],x.totalCount=0}finally{x.loading=!1,na(),aa()}}function Ut(e){const t=document.getElementById("plkt-edit-submit-btn");x.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":"Simpan")}async function ji(e){try{const t=await v(`/passengers-lkt/${e}`);x.editItem=t;const n=document.getElementById("plkt-edit-name"),a=document.getElementById("plkt-edit-phone"),r=document.getElementById("plkt-edit-id");r&&(r.value=t.id),n&&(n.value=t.name||""),a&&(a.value=t.phone||""),Ut(!1),j("plkt-edit-modal")}catch{h("Gagal memuat data penumpang")}}function qi(e,t){x.deleteItem={id:e,name:t};const n=document.getElementById("plkt-delete-copy");n&&(n.innerHTML=`Apakah Anda yakin ingin menghapus penumpang <strong>${g(t)}</strong>? Tindakan ini tidak dapat dibatalkan.`),j("plkt-delete-modal")}async function Ze(){const e=document.getElementById("plkt-loyalty-chart"),t=document.getElementById("plkt-chart-empty");if(e)try{const n=await v(`/passengers-lkt/loyalty-chart?limit=${x.chartLimit}`);if(!Array.isArray(n)||n.length===0){e.hidden=!0,t&&(t.hidden=!1);return}e.hidden=!1,t&&(t.hidden=!0);const a=n.map(i=>i.passenger_name+(i.phone&&i.phone!=="-"?` (${i.phone})`:"")),r=n.map(i=>i.booking_count),o=Math.max(...r,1),s=r.map(i=>{const c=i/o;return`rgba(${Math.round(26+c*30)}, ${Math.round(35+c*80)}, ${Math.round(126+c*50)}, 0.85)`});Xe&&(Xe.destroy(),Xe=null),Xe=new window.Chart(e,{type:"bar",data:{labels:a,datasets:[{label:"Jumlah Pemesanan",data:r,backgroundColor:s,borderRadius:6,borderSkipped:!1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{title:i=>i[0].label,label:i=>` ${i.raw} kali pemesanan`}}},scales:{x:{ticks:{maxRotation:35,font:{size:11},color:"#374151"},grid:{display:!1}},y:{beginAtZero:!0,ticks:{stepSize:1,color:"#374151",font:{size:11}},grid:{color:"rgba(0,0,0,0.06)"}}}}})}catch{t&&(t.hidden=!1)}}function Ni(){if(x.data.length===0){h("Tidak ada data untuk diekspor.");return}const e=["No","Nama Penumpang","No HP","Dari","Tujuan","Tanggal Berangkat","Jam","Tarif","Kali Memesan"],t=x.data.map((s,i)=>[(x.page-1)*be+i+1,s.passenger_name||"-",s.phone||"-",s.from_city||"-",s.to_city||"-",s.trip_date||"-",s.trip_time||"-",s.tarif||"-",s.booking_count]),n=[e,...t].map(s=>s.map(i=>`"${String(i).replace(/"/g,'""')}"`).join(",")).join(`
`),a=new Blob(["\uFEFF"+n],{type:"text/csv;charset=utf-8;"}),r=URL.createObjectURL(a),o=document.createElement("a");o.href=r,o.download="data-penumpang-lkt.csv",o.click(),URL.revokeObjectURL(r)}function Ui(){const e=document.getElementById("plkt-search-input"),t=document.getElementById("plkt-prev-page-btn"),n=document.getElementById("plkt-next-page-btn"),a=document.getElementById("plkt-export-btn"),r=document.getElementById("plkt-chart-limit"),o=document.getElementById("plkt-table-body"),s=document.getElementById("plkt-edit-form"),i=document.getElementById("plkt-delete-confirm-btn");e?.addEventListener("input",Ae(async c=>{x.search=c.target.value.trim(),x.page=1,await Be().catch(()=>h("Gagal memuat data"))},400)),t?.addEventListener("click",async()=>{x.page<=1||(x.page-=1,await Be().catch(()=>h("Gagal memuat data")))}),n?.addEventListener("click",async()=>{const c=Math.max(1,Math.ceil(x.totalCount/be));x.page>=c||(x.page+=1,await Be().catch(()=>h("Gagal memuat data")))}),a?.addEventListener("click",Ni),r?.addEventListener("change",async c=>{x.chartLimit=parseInt(c.target.value,10)||10,await Ze().catch(()=>{})}),o?.addEventListener("click",async c=>{const d=c.target.closest("[data-plkt-edit]"),l=c.target.closest("[data-plkt-delete]");d&&await ji(d.dataset.plktEdit),l&&qi(l.dataset.plktDelete,l.dataset.plktName)}),s?.addEventListener("submit",async c=>{c.preventDefault();const d=document.getElementById("plkt-edit-id")?.value,l=document.getElementById("plkt-edit-name")?.value.trim(),k=document.getElementById("plkt-edit-phone")?.value.trim();if(!l){h("Nama penumpang tidak boleh kosong");return}Ut(!0);try{await v(`/passengers-lkt/${d}`,{method:"PUT",body:{name:l,phone:k}}),U("Data penumpang berhasil diperbarui"),K("plkt-edit-modal"),await Promise.all([Be(),Ze()])}catch(y){h(y.message||"Gagal menyimpan data")}finally{Ut(!1)}}),i?.addEventListener("click",async()=>{if(x.deleteItem)try{await v(`/passengers-lkt/${x.deleteItem.id}`,{method:"DELETE"}),U("Data penumpang berhasil dihapus"),K("plkt-delete-modal"),x.deleteItem=null,(x.page-1)*be>=x.totalCount-1&&x.page>1&&(x.page-=1),await Promise.all([Be(),Ze()])}catch(c){h(c.message||"Gagal menghapus data")}}),Be().catch(()=>h("Gagal memuat data")),Ze().catch(()=>{})}const Hi={"admin-users/index":Js,"auth/login":qo,"bookings/index":Ei,"dashboard/index":Zo,"drivers/index":is,"mobil/index":hs,"keberangkatan/index":Ss,"regular-bookings/index":Bi,"regular-bookings/seats":Ii,"stock/index":Ts,"qr-scan/index":Mi,"passengers-lkt/index":Ui};document.addEventListener("DOMContentLoaded",async()=>{Po(),jo(),at(La());const e=xo();e&&(e.type==="success"?U(e.message,e.title):e.type==="info"?Do(e.message,e.title):h(e.message,e.title));try{const{user:t}=await Ro();t&&at(t);const n=document.body.dataset.pageScript,a=Hi[n];typeof a=="function"&&await a({user:t})}catch(t){console.error(t),h(t.message||"Terjadi kesalahan saat memuat halaman")}});
