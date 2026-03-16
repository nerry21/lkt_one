function ra(e,t){return function(){return e.apply(t,arguments)}}const{toString:Va}=Object.prototype,{getPrototypeOf:Ht}=Object,{iterator:ht,toStringTag:oa}=Symbol,kt=(e=>t=>{const n=Va.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),ae=e=>(e=e.toLowerCase(),t=>kt(t)===e),yt=e=>t=>typeof t===e,{isArray:xe}=Array,$e=yt("undefined");function Fe(e){return e!==null&&!$e(e)&&e.constructor!==null&&!$e(e.constructor)&&Z(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const sa=ae("ArrayBuffer");function Ga(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&sa(e.buffer),t}const Ja=yt("string"),Z=yt("function"),ia=yt("number"),Ve=e=>e!==null&&typeof e=="object",Ka=e=>e===!0||e===!1,Ye=e=>{if(kt(e)!=="object")return!1;const t=Ht(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(oa in e)&&!(ht in e)},Wa=e=>{if(!Ve(e)||Fe(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},za=ae("Date"),Xa=ae("File"),Za=e=>!!(e&&typeof e.uri<"u"),Qa=e=>e&&typeof e.getParts<"u",Ya=ae("Blob"),er=ae("FileList"),tr=e=>Ve(e)&&Z(e.pipe);function nr(){return typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}}const sn=nr(),dn=typeof sn.FormData<"u"?sn.FormData:void 0,ar=e=>{let t;return e&&(dn&&e instanceof dn||Z(e.append)&&((t=kt(e))==="formdata"||t==="object"&&Z(e.toString)&&e.toString()==="[object FormData]"))},rr=ae("URLSearchParams"),[or,sr,ir,dr]=["ReadableStream","Request","Response","Headers"].map(ae),lr=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function Ge(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let a,r;if(typeof e!="object"&&(e=[e]),xe(e))for(a=0,r=e.length;a<r;a++)t.call(null,e[a],a,e);else{if(Fe(e))return;const o=n?Object.getOwnPropertyNames(e):Object.keys(e),s=o.length;let i;for(a=0;a<s;a++)i=o[a],t.call(null,e[i],i,e)}}function da(e,t){if(Fe(e))return null;t=t.toLowerCase();const n=Object.keys(e);let a=n.length,r;for(;a-- >0;)if(r=n[a],t===r.toLowerCase())return r;return null}const ue=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,la=e=>!$e(e)&&e!==ue;function Mt(){const{caseless:e,skipUndefined:t}=la(this)&&this||{},n={},a=(r,o)=>{if(o==="__proto__"||o==="constructor"||o==="prototype")return;const s=e&&da(n,o)||o;Ye(n[s])&&Ye(r)?n[s]=Mt(n[s],r):Ye(r)?n[s]=Mt({},r):xe(r)?n[s]=r.slice():(!t||!$e(r))&&(n[s]=r)};for(let r=0,o=arguments.length;r<o;r++)arguments[r]&&Ge(arguments[r],a);return n}const cr=(e,t,n,{allOwnKeys:a}={})=>(Ge(t,(r,o)=>{n&&Z(r)?Object.defineProperty(e,o,{value:ra(r,n),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(e,o,{value:r,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:a}),e),ur=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),mr=(e,t,n,a)=>{e.prototype=Object.create(t.prototype,a),Object.defineProperty(e.prototype,"constructor",{value:e,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},pr=(e,t,n,a)=>{let r,o,s;const i={};if(t=t||{},e==null)return t;do{for(r=Object.getOwnPropertyNames(e),o=r.length;o-- >0;)s=r[o],(!a||a(s,e,t))&&!i[s]&&(t[s]=e[s],i[s]=!0);e=n!==!1&&Ht(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},gr=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const a=e.indexOf(t,n);return a!==-1&&a===n},fr=e=>{if(!e)return null;if(xe(e))return e;let t=e.length;if(!ia(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},br=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&Ht(Uint8Array)),hr=(e,t)=>{const a=(e&&e[ht]).call(e);let r;for(;(r=a.next())&&!r.done;){const o=r.value;t.call(e,o[0],o[1])}},kr=(e,t)=>{let n;const a=[];for(;(n=e.exec(t))!==null;)a.push(n);return a},yr=ae("HTMLFormElement"),vr=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,a,r){return a.toUpperCase()+r}),ln=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),Er=ae("RegExp"),ca=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),a={};Ge(n,(r,o)=>{let s;(s=t(r,o,e))!==!1&&(a[o]=s||r)}),Object.defineProperties(e,a)},wr=e=>{ca(e,(t,n)=>{if(Z(e)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const a=e[n];if(Z(a)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},Br=(e,t)=>{const n={},a=r=>{r.forEach(o=>{n[o]=!0})};return xe(e)?a(e):a(String(e).split(t)),n},Ir=()=>{},$r=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function Sr(e){return!!(e&&Z(e.append)&&e[oa]==="FormData"&&e[ht])}const Cr=e=>{const t=new Array(10),n=(a,r)=>{if(Ve(a)){if(t.indexOf(a)>=0)return;if(Fe(a))return a;if(!("toJSON"in a)){t[r]=a;const o=xe(a)?[]:{};return Ge(a,(s,i)=>{const c=n(s,r+1);!$e(c)&&(o[i]=c)}),t[r]=void 0,o}}return a};return n(e,0)},xr=ae("AsyncFunction"),_r=e=>e&&(Ve(e)||Z(e))&&Z(e.then)&&Z(e.catch),ua=((e,t)=>e?setImmediate:t?((n,a)=>(ue.addEventListener("message",({source:r,data:o})=>{r===ue&&o===n&&a.length&&a.shift()()},!1),r=>{a.push(r),ue.postMessage(n,"*")}))(`axios@${Math.random()}`,[]):n=>setTimeout(n))(typeof setImmediate=="function",Z(ue.postMessage)),Lr=typeof queueMicrotask<"u"?queueMicrotask.bind(ue):typeof process<"u"&&process.nextTick||ua,Tr=e=>e!=null&&Z(e[ht]),u={isArray:xe,isArrayBuffer:sa,isBuffer:Fe,isFormData:ar,isArrayBufferView:Ga,isString:Ja,isNumber:ia,isBoolean:Ka,isObject:Ve,isPlainObject:Ye,isEmptyObject:Wa,isReadableStream:or,isRequest:sr,isResponse:ir,isHeaders:dr,isUndefined:$e,isDate:za,isFile:Xa,isReactNativeBlob:Za,isReactNative:Qa,isBlob:Ya,isRegExp:Er,isFunction:Z,isStream:tr,isURLSearchParams:rr,isTypedArray:br,isFileList:er,forEach:Ge,merge:Mt,extend:cr,trim:lr,stripBOM:ur,inherits:mr,toFlatObject:pr,kindOf:kt,kindOfTest:ae,endsWith:gr,toArray:fr,forEachEntry:hr,matchAll:kr,isHTMLForm:yr,hasOwnProperty:ln,hasOwnProp:ln,reduceDescriptors:ca,freezeMethods:wr,toObjectSet:Br,toCamelCase:vr,noop:Ir,toFiniteNumber:$r,findKey:da,global:ue,isContextDefined:la,isSpecCompliantForm:Sr,toJSONObject:Cr,isAsyncFn:xr,isThenable:_r,setImmediate:ua,asap:Lr,isIterable:Tr};let $=class ma extends Error{static from(t,n,a,r,o,s){const i=new ma(t.message,n||t.code,a,r,o);return i.cause=t,i.name=t.name,t.status!=null&&i.status==null&&(i.status=t.status),s&&Object.assign(i,s),i}constructor(t,n,a,r,o){super(t),Object.defineProperty(this,"message",{value:t,enumerable:!0,writable:!0,configurable:!0}),this.name="AxiosError",this.isAxiosError=!0,n&&(this.code=n),a&&(this.config=a),r&&(this.request=r),o&&(this.response=o,this.status=o.status)}toJSON(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:u.toJSONObject(this.config),code:this.code,status:this.status}}};$.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";$.ERR_BAD_OPTION="ERR_BAD_OPTION";$.ECONNABORTED="ECONNABORTED";$.ETIMEDOUT="ETIMEDOUT";$.ERR_NETWORK="ERR_NETWORK";$.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";$.ERR_DEPRECATED="ERR_DEPRECATED";$.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";$.ERR_BAD_REQUEST="ERR_BAD_REQUEST";$.ERR_CANCELED="ERR_CANCELED";$.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";$.ERR_INVALID_URL="ERR_INVALID_URL";const Ar=null;function Rt(e){return u.isPlainObject(e)||u.isArray(e)}function pa(e){return u.endsWith(e,"[]")?e.slice(0,-2):e}function St(e,t,n){return e?e.concat(t).map(function(r,o){return r=pa(r),!n&&o?"["+r+"]":r}).join(n?".":""):t}function Mr(e){return u.isArray(e)&&!e.some(Rt)}const Rr=u.toFlatObject(u,{},null,function(t){return/^is[A-Z]/.test(t)});function vt(e,t,n){if(!u.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=u.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(h,b){return!u.isUndefined(b[h])});const a=n.metaTokens,r=n.visitor||l,o=n.dots,s=n.indexes,c=(n.Blob||typeof Blob<"u"&&Blob)&&u.isSpecCompliantForm(t);if(!u.isFunction(r))throw new TypeError("visitor must be a function");function d(p){if(p===null)return"";if(u.isDate(p))return p.toISOString();if(u.isBoolean(p))return p.toString();if(!c&&u.isBlob(p))throw new $("Blob is not supported. Use a Buffer instead.");return u.isArrayBuffer(p)||u.isTypedArray(p)?c&&typeof Blob=="function"?new Blob([p]):Buffer.from(p):p}function l(p,h,b){let _=p;if(u.isReactNative(t)&&u.isReactNativeBlob(p))return t.append(St(b,h,o),d(p)),!1;if(p&&!b&&typeof p=="object"){if(u.endsWith(h,"{}"))h=a?h:h.slice(0,-2),p=JSON.stringify(p);else if(u.isArray(p)&&Mr(p)||(u.isFileList(p)||u.endsWith(h,"[]"))&&(_=u.toArray(p)))return h=pa(h),_.forEach(function(M,O){!(u.isUndefined(M)||M===null)&&t.append(s===!0?St([h],O,o):s===null?h:h+"[]",d(M))}),!1}return Rt(p)?!0:(t.append(St(b,h,o),d(p)),!1)}const g=[],k=Object.assign(Rr,{defaultVisitor:l,convertValue:d,isVisitable:Rt});function v(p,h){if(!u.isUndefined(p)){if(g.indexOf(p)!==-1)throw Error("Circular reference detected in "+h.join("."));g.push(p),u.forEach(p,function(_,D){(!(u.isUndefined(_)||_===null)&&r.call(t,_,u.isString(D)?D.trim():D,h,k))===!0&&v(_,h?h.concat(D):[D])}),g.pop()}}if(!u.isObject(e))throw new TypeError("data must be an object");return v(e),t}function cn(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(a){return t[a]})}function Ft(e,t){this._pairs=[],e&&vt(e,this,t)}const ga=Ft.prototype;ga.append=function(t,n){this._pairs.push([t,n])};ga.toString=function(t){const n=t?function(a){return t.call(this,a,cn)}:cn;return this._pairs.map(function(r){return n(r[0])+"="+n(r[1])},"").join("&")};function Pr(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function fa(e,t,n){if(!t)return e;const a=n&&n.encode||Pr,r=u.isFunction(n)?{serialize:n}:n,o=r&&r.serialize;let s;if(o?s=o(t,r):s=u.isURLSearchParams(t)?t.toString():new Ft(t,r).toString(a),s){const i=e.indexOf("#");i!==-1&&(e=e.slice(0,i)),e+=(e.indexOf("?")===-1?"?":"&")+s}return e}class un{constructor(){this.handlers=[]}use(t,n,a){return this.handlers.push({fulfilled:t,rejected:n,synchronous:a?a.synchronous:!1,runWhen:a?a.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){u.forEach(this.handlers,function(a){a!==null&&t(a)})}}const Vt={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0},Dr=typeof URLSearchParams<"u"?URLSearchParams:Ft,Or=typeof FormData<"u"?FormData:null,jr=typeof Blob<"u"?Blob:null,qr={isBrowser:!0,classes:{URLSearchParams:Dr,FormData:Or,Blob:jr},protocols:["http","https","file","blob","url","data"]},Gt=typeof window<"u"&&typeof document<"u",Pt=typeof navigator=="object"&&navigator||void 0,Nr=Gt&&(!Pt||["ReactNative","NativeScript","NS"].indexOf(Pt.product)<0),Ur=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",Hr=Gt&&window.location.href||"http://localhost",Fr=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:Gt,hasStandardBrowserEnv:Nr,hasStandardBrowserWebWorkerEnv:Ur,navigator:Pt,origin:Hr},Symbol.toStringTag,{value:"Module"})),K={...Fr,...qr};function Vr(e,t){return vt(e,new K.classes.URLSearchParams,{visitor:function(n,a,r,o){return K.isNode&&u.isBuffer(n)?(this.append(a,n.toString("base64")),!1):o.defaultVisitor.apply(this,arguments)},...t})}function Gr(e){return u.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function Jr(e){const t={},n=Object.keys(e);let a;const r=n.length;let o;for(a=0;a<r;a++)o=n[a],t[o]=e[o];return t}function ba(e){function t(n,a,r,o){let s=n[o++];if(s==="__proto__")return!0;const i=Number.isFinite(+s),c=o>=n.length;return s=!s&&u.isArray(r)?r.length:s,c?(u.hasOwnProp(r,s)?r[s]=[r[s],a]:r[s]=a,!i):((!r[s]||!u.isObject(r[s]))&&(r[s]=[]),t(n,a,r[s],o)&&u.isArray(r[s])&&(r[s]=Jr(r[s])),!i)}if(u.isFormData(e)&&u.isFunction(e.entries)){const n={};return u.forEachEntry(e,(a,r)=>{t(Gr(a),r,n,0)}),n}return null}function Kr(e,t,n){if(u.isString(e))try{return(t||JSON.parse)(e),u.trim(e)}catch(a){if(a.name!=="SyntaxError")throw a}return(n||JSON.stringify)(e)}const Je={transitional:Vt,adapter:["xhr","http","fetch"],transformRequest:[function(t,n){const a=n.getContentType()||"",r=a.indexOf("application/json")>-1,o=u.isObject(t);if(o&&u.isHTMLForm(t)&&(t=new FormData(t)),u.isFormData(t))return r?JSON.stringify(ba(t)):t;if(u.isArrayBuffer(t)||u.isBuffer(t)||u.isStream(t)||u.isFile(t)||u.isBlob(t)||u.isReadableStream(t))return t;if(u.isArrayBufferView(t))return t.buffer;if(u.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let i;if(o){if(a.indexOf("application/x-www-form-urlencoded")>-1)return Vr(t,this.formSerializer).toString();if((i=u.isFileList(t))||a.indexOf("multipart/form-data")>-1){const c=this.env&&this.env.FormData;return vt(i?{"files[]":t}:t,c&&new c,this.formSerializer)}}return o||r?(n.setContentType("application/json",!1),Kr(t)):t}],transformResponse:[function(t){const n=this.transitional||Je.transitional,a=n&&n.forcedJSONParsing,r=this.responseType==="json";if(u.isResponse(t)||u.isReadableStream(t))return t;if(t&&u.isString(t)&&(a&&!this.responseType||r)){const s=!(n&&n.silentJSONParsing)&&r;try{return JSON.parse(t,this.parseReviver)}catch(i){if(s)throw i.name==="SyntaxError"?$.from(i,$.ERR_BAD_RESPONSE,this,null,this.response):i}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:K.classes.FormData,Blob:K.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};u.forEach(["delete","get","head","post","put","patch"],e=>{Je.headers[e]={}});const Wr=u.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),zr=e=>{const t={};let n,a,r;return e&&e.split(`
`).forEach(function(s){r=s.indexOf(":"),n=s.substring(0,r).trim().toLowerCase(),a=s.substring(r+1).trim(),!(!n||t[n]&&Wr[n])&&(n==="set-cookie"?t[n]?t[n].push(a):t[n]=[a]:t[n]=t[n]?t[n]+", "+a:a)}),t},mn=Symbol("internals");function Ae(e){return e&&String(e).trim().toLowerCase()}function et(e){return e===!1||e==null?e:u.isArray(e)?e.map(et):String(e)}function Xr(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let a;for(;a=n.exec(e);)t[a[1]]=a[2];return t}const Zr=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function Ct(e,t,n,a,r){if(u.isFunction(a))return a.call(this,t,n);if(r&&(t=n),!!u.isString(t)){if(u.isString(a))return t.indexOf(a)!==-1;if(u.isRegExp(a))return a.test(t)}}function Qr(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,a)=>n.toUpperCase()+a)}function Yr(e,t){const n=u.toCamelCase(" "+t);["get","set","has"].forEach(a=>{Object.defineProperty(e,a+n,{value:function(r,o,s){return this[a].call(this,t,r,o,s)},configurable:!0})})}let Q=class{constructor(t){t&&this.set(t)}set(t,n,a){const r=this;function o(i,c,d){const l=Ae(c);if(!l)throw new Error("header name must be a non-empty string");const g=u.findKey(r,l);(!g||r[g]===void 0||d===!0||d===void 0&&r[g]!==!1)&&(r[g||c]=et(i))}const s=(i,c)=>u.forEach(i,(d,l)=>o(d,l,c));if(u.isPlainObject(t)||t instanceof this.constructor)s(t,n);else if(u.isString(t)&&(t=t.trim())&&!Zr(t))s(zr(t),n);else if(u.isObject(t)&&u.isIterable(t)){let i={},c,d;for(const l of t){if(!u.isArray(l))throw TypeError("Object iterator must return a key-value pair");i[d=l[0]]=(c=i[d])?u.isArray(c)?[...c,l[1]]:[c,l[1]]:l[1]}s(i,n)}else t!=null&&o(n,t,a);return this}get(t,n){if(t=Ae(t),t){const a=u.findKey(this,t);if(a){const r=this[a];if(!n)return r;if(n===!0)return Xr(r);if(u.isFunction(n))return n.call(this,r,a);if(u.isRegExp(n))return n.exec(r);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=Ae(t),t){const a=u.findKey(this,t);return!!(a&&this[a]!==void 0&&(!n||Ct(this,this[a],a,n)))}return!1}delete(t,n){const a=this;let r=!1;function o(s){if(s=Ae(s),s){const i=u.findKey(a,s);i&&(!n||Ct(a,a[i],i,n))&&(delete a[i],r=!0)}}return u.isArray(t)?t.forEach(o):o(t),r}clear(t){const n=Object.keys(this);let a=n.length,r=!1;for(;a--;){const o=n[a];(!t||Ct(this,this[o],o,t,!0))&&(delete this[o],r=!0)}return r}normalize(t){const n=this,a={};return u.forEach(this,(r,o)=>{const s=u.findKey(a,o);if(s){n[s]=et(r),delete n[o];return}const i=t?Qr(o):String(o).trim();i!==o&&delete n[o],n[i]=et(r),a[i]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return u.forEach(this,(a,r)=>{a!=null&&a!==!1&&(n[r]=t&&u.isArray(a)?a.join(", "):a)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const a=new this(t);return n.forEach(r=>a.set(r)),a}static accessor(t){const a=(this[mn]=this[mn]={accessors:{}}).accessors,r=this.prototype;function o(s){const i=Ae(s);a[i]||(Yr(r,s),a[i]=!0)}return u.isArray(t)?t.forEach(o):o(t),this}};Q.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);u.reduceDescriptors(Q.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(a){this[n]=a}}});u.freezeMethods(Q);function xt(e,t){const n=this||Je,a=t||n,r=Q.from(a.headers);let o=a.data;return u.forEach(e,function(i){o=i.call(n,o,r.normalize(),t?t.status:void 0)}),r.normalize(),o}function ha(e){return!!(e&&e.__CANCEL__)}let Ke=class extends ${constructor(t,n,a){super(t??"canceled",$.ERR_CANCELED,n,a),this.name="CanceledError",this.__CANCEL__=!0}};function ka(e,t,n){const a=n.config.validateStatus;!n.status||!a||a(n.status)?e(n):t(new $("Request failed with status code "+n.status,[$.ERR_BAD_REQUEST,$.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}function eo(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function to(e,t){e=e||10;const n=new Array(e),a=new Array(e);let r=0,o=0,s;return t=t!==void 0?t:1e3,function(c){const d=Date.now(),l=a[o];s||(s=d),n[r]=c,a[r]=d;let g=o,k=0;for(;g!==r;)k+=n[g++],g=g%e;if(r=(r+1)%e,r===o&&(o=(o+1)%e),d-s<t)return;const v=l&&d-l;return v?Math.round(k*1e3/v):void 0}}function no(e,t){let n=0,a=1e3/t,r,o;const s=(d,l=Date.now())=>{n=l,r=null,o&&(clearTimeout(o),o=null),e(...d)};return[(...d)=>{const l=Date.now(),g=l-n;g>=a?s(d,l):(r=d,o||(o=setTimeout(()=>{o=null,s(r)},a-g)))},()=>r&&s(r)]}const at=(e,t,n=3)=>{let a=0;const r=to(50,250);return no(o=>{const s=o.loaded,i=o.lengthComputable?o.total:void 0,c=s-a,d=r(c),l=s<=i;a=s;const g={loaded:s,total:i,progress:i?s/i:void 0,bytes:c,rate:d||void 0,estimated:d&&i&&l?(i-s)/d:void 0,event:o,lengthComputable:i!=null,[t?"download":"upload"]:!0};e(g)},n)},pn=(e,t)=>{const n=e!=null;return[a=>t[0]({lengthComputable:n,total:e,loaded:a}),t[1]]},gn=e=>(...t)=>u.asap(()=>e(...t)),ao=K.hasStandardBrowserEnv?((e,t)=>n=>(n=new URL(n,K.origin),e.protocol===n.protocol&&e.host===n.host&&(t||e.port===n.port)))(new URL(K.origin),K.navigator&&/(msie|trident)/i.test(K.navigator.userAgent)):()=>!0,ro=K.hasStandardBrowserEnv?{write(e,t,n,a,r,o,s){if(typeof document>"u")return;const i=[`${e}=${encodeURIComponent(t)}`];u.isNumber(n)&&i.push(`expires=${new Date(n).toUTCString()}`),u.isString(a)&&i.push(`path=${a}`),u.isString(r)&&i.push(`domain=${r}`),o===!0&&i.push("secure"),u.isString(s)&&i.push(`SameSite=${s}`),document.cookie=i.join("; ")},read(e){if(typeof document>"u")return null;const t=document.cookie.match(new RegExp("(?:^|; )"+e+"=([^;]*)"));return t?decodeURIComponent(t[1]):null},remove(e){this.write(e,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function oo(e){return typeof e!="string"?!1:/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function so(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function ya(e,t,n){let a=!oo(t);return e&&(a||n==!1)?so(e,t):t}const fn=e=>e instanceof Q?{...e}:e;function ge(e,t){t=t||{};const n={};function a(d,l,g,k){return u.isPlainObject(d)&&u.isPlainObject(l)?u.merge.call({caseless:k},d,l):u.isPlainObject(l)?u.merge({},l):u.isArray(l)?l.slice():l}function r(d,l,g,k){if(u.isUndefined(l)){if(!u.isUndefined(d))return a(void 0,d,g,k)}else return a(d,l,g,k)}function o(d,l){if(!u.isUndefined(l))return a(void 0,l)}function s(d,l){if(u.isUndefined(l)){if(!u.isUndefined(d))return a(void 0,d)}else return a(void 0,l)}function i(d,l,g){if(g in t)return a(d,l);if(g in e)return a(void 0,d)}const c={url:o,method:o,data:o,baseURL:s,transformRequest:s,transformResponse:s,paramsSerializer:s,timeout:s,timeoutMessage:s,withCredentials:s,withXSRFToken:s,adapter:s,responseType:s,xsrfCookieName:s,xsrfHeaderName:s,onUploadProgress:s,onDownloadProgress:s,decompress:s,maxContentLength:s,maxBodyLength:s,beforeRedirect:s,transport:s,httpAgent:s,httpsAgent:s,cancelToken:s,socketPath:s,responseEncoding:s,validateStatus:i,headers:(d,l,g)=>r(fn(d),fn(l),g,!0)};return u.forEach(Object.keys({...e,...t}),function(l){if(l==="__proto__"||l==="constructor"||l==="prototype")return;const g=u.hasOwnProp(c,l)?c[l]:r,k=g(e[l],t[l],l);u.isUndefined(k)&&g!==i||(n[l]=k)}),n}const va=e=>{const t=ge({},e);let{data:n,withXSRFToken:a,xsrfHeaderName:r,xsrfCookieName:o,headers:s,auth:i}=t;if(t.headers=s=Q.from(s),t.url=fa(ya(t.baseURL,t.url,t.allowAbsoluteUrls),e.params,e.paramsSerializer),i&&s.set("Authorization","Basic "+btoa((i.username||"")+":"+(i.password?unescape(encodeURIComponent(i.password)):""))),u.isFormData(n)){if(K.hasStandardBrowserEnv||K.hasStandardBrowserWebWorkerEnv)s.setContentType(void 0);else if(u.isFunction(n.getHeaders)){const c=n.getHeaders(),d=["content-type","content-length"];Object.entries(c).forEach(([l,g])=>{d.includes(l.toLowerCase())&&s.set(l,g)})}}if(K.hasStandardBrowserEnv&&(a&&u.isFunction(a)&&(a=a(t)),a||a!==!1&&ao(t.url))){const c=r&&o&&ro.read(o);c&&s.set(r,c)}return t},io=typeof XMLHttpRequest<"u",lo=io&&function(e){return new Promise(function(n,a){const r=va(e);let o=r.data;const s=Q.from(r.headers).normalize();let{responseType:i,onUploadProgress:c,onDownloadProgress:d}=r,l,g,k,v,p;function h(){v&&v(),p&&p(),r.cancelToken&&r.cancelToken.unsubscribe(l),r.signal&&r.signal.removeEventListener("abort",l)}let b=new XMLHttpRequest;b.open(r.method.toUpperCase(),r.url,!0),b.timeout=r.timeout;function _(){if(!b)return;const M=Q.from("getAllResponseHeaders"in b&&b.getAllResponseHeaders()),A={data:!i||i==="text"||i==="json"?b.responseText:b.response,status:b.status,statusText:b.statusText,headers:M,config:e,request:b};ka(function(P){n(P),h()},function(P){a(P),h()},A),b=null}"onloadend"in b?b.onloadend=_:b.onreadystatechange=function(){!b||b.readyState!==4||b.status===0&&!(b.responseURL&&b.responseURL.indexOf("file:")===0)||setTimeout(_)},b.onabort=function(){b&&(a(new $("Request aborted",$.ECONNABORTED,e,b)),b=null)},b.onerror=function(O){const A=O&&O.message?O.message:"Network Error",j=new $(A,$.ERR_NETWORK,e,b);j.event=O||null,a(j),b=null},b.ontimeout=function(){let O=r.timeout?"timeout of "+r.timeout+"ms exceeded":"timeout exceeded";const A=r.transitional||Vt;r.timeoutErrorMessage&&(O=r.timeoutErrorMessage),a(new $(O,A.clarifyTimeoutError?$.ETIMEDOUT:$.ECONNABORTED,e,b)),b=null},o===void 0&&s.setContentType(null),"setRequestHeader"in b&&u.forEach(s.toJSON(),function(O,A){b.setRequestHeader(A,O)}),u.isUndefined(r.withCredentials)||(b.withCredentials=!!r.withCredentials),i&&i!=="json"&&(b.responseType=r.responseType),d&&([k,p]=at(d,!0),b.addEventListener("progress",k)),c&&b.upload&&([g,v]=at(c),b.upload.addEventListener("progress",g),b.upload.addEventListener("loadend",v)),(r.cancelToken||r.signal)&&(l=M=>{b&&(a(!M||M.type?new Ke(null,e,b):M),b.abort(),b=null)},r.cancelToken&&r.cancelToken.subscribe(l),r.signal&&(r.signal.aborted?l():r.signal.addEventListener("abort",l)));const D=eo(r.url);if(D&&K.protocols.indexOf(D)===-1){a(new $("Unsupported protocol "+D+":",$.ERR_BAD_REQUEST,e));return}b.send(o||null)})},co=(e,t)=>{const{length:n}=e=e?e.filter(Boolean):[];if(t||n){let a=new AbortController,r;const o=function(d){if(!r){r=!0,i();const l=d instanceof Error?d:this.reason;a.abort(l instanceof $?l:new Ke(l instanceof Error?l.message:l))}};let s=t&&setTimeout(()=>{s=null,o(new $(`timeout of ${t}ms exceeded`,$.ETIMEDOUT))},t);const i=()=>{e&&(s&&clearTimeout(s),s=null,e.forEach(d=>{d.unsubscribe?d.unsubscribe(o):d.removeEventListener("abort",o)}),e=null)};e.forEach(d=>d.addEventListener("abort",o));const{signal:c}=a;return c.unsubscribe=()=>u.asap(i),c}},uo=function*(e,t){let n=e.byteLength;if(n<t){yield e;return}let a=0,r;for(;a<n;)r=a+t,yield e.slice(a,r),a=r},mo=async function*(e,t){for await(const n of po(e))yield*uo(n,t)},po=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:n,value:a}=await t.read();if(n)break;yield a}}finally{await t.cancel()}},bn=(e,t,n,a)=>{const r=mo(e,t);let o=0,s,i=c=>{s||(s=!0,a&&a(c))};return new ReadableStream({async pull(c){try{const{done:d,value:l}=await r.next();if(d){i(),c.close();return}let g=l.byteLength;if(n){let k=o+=g;n(k)}c.enqueue(new Uint8Array(l))}catch(d){throw i(d),d}},cancel(c){return i(c),r.return()}},{highWaterMark:2})},hn=64*1024,{isFunction:Xe}=u,go=(({Request:e,Response:t})=>({Request:e,Response:t}))(u.global),{ReadableStream:kn,TextEncoder:yn}=u.global,vn=(e,...t)=>{try{return!!e(...t)}catch{return!1}},fo=e=>{e=u.merge.call({skipUndefined:!0},go,e);const{fetch:t,Request:n,Response:a}=e,r=t?Xe(t):typeof fetch=="function",o=Xe(n),s=Xe(a);if(!r)return!1;const i=r&&Xe(kn),c=r&&(typeof yn=="function"?(p=>h=>p.encode(h))(new yn):async p=>new Uint8Array(await new n(p).arrayBuffer())),d=o&&i&&vn(()=>{let p=!1;const h=new n(K.origin,{body:new kn,method:"POST",get duplex(){return p=!0,"half"}}).headers.has("Content-Type");return p&&!h}),l=s&&i&&vn(()=>u.isReadableStream(new a("").body)),g={stream:l&&(p=>p.body)};r&&["text","arrayBuffer","blob","formData","stream"].forEach(p=>{!g[p]&&(g[p]=(h,b)=>{let _=h&&h[p];if(_)return _.call(h);throw new $(`Response type '${p}' is not supported`,$.ERR_NOT_SUPPORT,b)})});const k=async p=>{if(p==null)return 0;if(u.isBlob(p))return p.size;if(u.isSpecCompliantForm(p))return(await new n(K.origin,{method:"POST",body:p}).arrayBuffer()).byteLength;if(u.isArrayBufferView(p)||u.isArrayBuffer(p))return p.byteLength;if(u.isURLSearchParams(p)&&(p=p+""),u.isString(p))return(await c(p)).byteLength},v=async(p,h)=>{const b=u.toFiniteNumber(p.getContentLength());return b??k(h)};return async p=>{let{url:h,method:b,data:_,signal:D,cancelToken:M,timeout:O,onDownloadProgress:A,onUploadProgress:j,responseType:P,headers:F,withCredentials:z="same-origin",fetchOptions:Y}=va(p),X=t||fetch;P=P?(P+"").toLowerCase():"text";let I=co([D,M&&M.toAbortSignal()],O),H=null;const W=I&&I.unsubscribe&&(()=>{I.unsubscribe()});let be;try{if(j&&d&&b!=="get"&&b!=="head"&&(be=await v(F,_))!==0){let oe=new n(h,{method:"POST",body:_,duplex:"half"}),he;if(u.isFormData(_)&&(he=oe.headers.get("content-type"))&&F.setContentType(he),oe.body){const[$t,ze]=pn(be,at(gn(j)));_=bn(oe.body,hn,$t,ze)}}u.isString(z)||(z=z?"include":"omit");const J=o&&"credentials"in n.prototype,ne={...Y,signal:I,method:b.toUpperCase(),headers:F.normalize().toJSON(),body:_,duplex:"half",credentials:J?z:void 0};H=o&&new n(h,ne);let ee=await(o?X(H,Y):X(h,ne));const le=l&&(P==="stream"||P==="response");if(l&&(A||le&&W)){const oe={};["status","statusText","headers"].forEach(on=>{oe[on]=ee[on]});const he=u.toFiniteNumber(ee.headers.get("content-length")),[$t,ze]=A&&pn(he,at(gn(A),!0))||[];ee=new a(bn(ee.body,hn,$t,()=>{ze&&ze(),W&&W()}),oe)}P=P||"text";let It=await g[u.findKey(g,P)||"text"](ee,p);return!le&&W&&W(),await new Promise((oe,he)=>{ka(oe,he,{data:It,headers:Q.from(ee.headers),status:ee.status,statusText:ee.statusText,config:p,request:H})})}catch(J){throw W&&W(),J&&J.name==="TypeError"&&/Load failed|fetch/i.test(J.message)?Object.assign(new $("Network Error",$.ERR_NETWORK,p,H,J&&J.response),{cause:J.cause||J}):$.from(J,J&&J.code,p,H,J&&J.response)}}},bo=new Map,Ea=e=>{let t=e&&e.env||{};const{fetch:n,Request:a,Response:r}=t,o=[a,r,n];let s=o.length,i=s,c,d,l=bo;for(;i--;)c=o[i],d=l.get(c),d===void 0&&l.set(c,d=i?new Map:fo(t)),l=d;return d};Ea();const Jt={http:Ar,xhr:lo,fetch:{get:Ea}};u.forEach(Jt,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const En=e=>`- ${e}`,ho=e=>u.isFunction(e)||e===null||e===!1;function ko(e,t){e=u.isArray(e)?e:[e];const{length:n}=e;let a,r;const o={};for(let s=0;s<n;s++){a=e[s];let i;if(r=a,!ho(a)&&(r=Jt[(i=String(a)).toLowerCase()],r===void 0))throw new $(`Unknown adapter '${i}'`);if(r&&(u.isFunction(r)||(r=r.get(t))))break;o[i||"#"+s]=r}if(!r){const s=Object.entries(o).map(([c,d])=>`adapter ${c} `+(d===!1?"is not supported by the environment":"is not available in the build"));let i=n?s.length>1?`since :
`+s.map(En).join(`
`):" "+En(s[0]):"as no adapter specified";throw new $("There is no suitable adapter to dispatch the request "+i,"ERR_NOT_SUPPORT")}return r}const wa={getAdapter:ko,adapters:Jt};function _t(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new Ke(null,e)}function wn(e){return _t(e),e.headers=Q.from(e.headers),e.data=xt.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),wa.getAdapter(e.adapter||Je.adapter,e)(e).then(function(a){return _t(e),a.data=xt.call(e,e.transformResponse,a),a.headers=Q.from(a.headers),a},function(a){return ha(a)||(_t(e),a&&a.response&&(a.response.data=xt.call(e,e.transformResponse,a.response),a.response.headers=Q.from(a.response.headers))),Promise.reject(a)})}const Ba="1.13.6",Et={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{Et[e]=function(a){return typeof a===e||"a"+(t<1?"n ":" ")+e}});const Bn={};Et.transitional=function(t,n,a){function r(o,s){return"[Axios v"+Ba+"] Transitional option '"+o+"'"+s+(a?". "+a:"")}return(o,s,i)=>{if(t===!1)throw new $(r(s," has been removed"+(n?" in "+n:"")),$.ERR_DEPRECATED);return n&&!Bn[s]&&(Bn[s]=!0,console.warn(r(s," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(o,s,i):!0}};Et.spelling=function(t){return(n,a)=>(console.warn(`${a} is likely a misspelling of ${t}`),!0)};function yo(e,t,n){if(typeof e!="object")throw new $("options must be an object",$.ERR_BAD_OPTION_VALUE);const a=Object.keys(e);let r=a.length;for(;r-- >0;){const o=a[r],s=t[o];if(s){const i=e[o],c=i===void 0||s(i,o,e);if(c!==!0)throw new $("option "+o+" must be "+c,$.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new $("Unknown option "+o,$.ERR_BAD_OPTION)}}const tt={assertOptions:yo,validators:Et},te=tt.validators;let pe=class{constructor(t){this.defaults=t||{},this.interceptors={request:new un,response:new un}}async request(t,n){try{return await this._request(t,n)}catch(a){if(a instanceof Error){let r={};Error.captureStackTrace?Error.captureStackTrace(r):r=new Error;const o=r.stack?r.stack.replace(/^.+\n/,""):"";try{a.stack?o&&!String(a.stack).endsWith(o.replace(/^.+\n.+\n/,""))&&(a.stack+=`
`+o):a.stack=o}catch{}}throw a}}_request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=ge(this.defaults,n);const{transitional:a,paramsSerializer:r,headers:o}=n;a!==void 0&&tt.assertOptions(a,{silentJSONParsing:te.transitional(te.boolean),forcedJSONParsing:te.transitional(te.boolean),clarifyTimeoutError:te.transitional(te.boolean),legacyInterceptorReqResOrdering:te.transitional(te.boolean)},!1),r!=null&&(u.isFunction(r)?n.paramsSerializer={serialize:r}:tt.assertOptions(r,{encode:te.function,serialize:te.function},!0)),n.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?n.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:n.allowAbsoluteUrls=!0),tt.assertOptions(n,{baseUrl:te.spelling("baseURL"),withXsrfToken:te.spelling("withXSRFToken")},!0),n.method=(n.method||this.defaults.method||"get").toLowerCase();let s=o&&u.merge(o.common,o[n.method]);o&&u.forEach(["delete","get","head","post","put","patch","common"],p=>{delete o[p]}),n.headers=Q.concat(s,o);const i=[];let c=!0;this.interceptors.request.forEach(function(h){if(typeof h.runWhen=="function"&&h.runWhen(n)===!1)return;c=c&&h.synchronous;const b=n.transitional||Vt;b&&b.legacyInterceptorReqResOrdering?i.unshift(h.fulfilled,h.rejected):i.push(h.fulfilled,h.rejected)});const d=[];this.interceptors.response.forEach(function(h){d.push(h.fulfilled,h.rejected)});let l,g=0,k;if(!c){const p=[wn.bind(this),void 0];for(p.unshift(...i),p.push(...d),k=p.length,l=Promise.resolve(n);g<k;)l=l.then(p[g++],p[g++]);return l}k=i.length;let v=n;for(;g<k;){const p=i[g++],h=i[g++];try{v=p(v)}catch(b){h.call(this,b);break}}try{l=wn.call(this,v)}catch(p){return Promise.reject(p)}for(g=0,k=d.length;g<k;)l=l.then(d[g++],d[g++]);return l}getUri(t){t=ge(this.defaults,t);const n=ya(t.baseURL,t.url,t.allowAbsoluteUrls);return fa(n,t.params,t.paramsSerializer)}};u.forEach(["delete","get","head","options"],function(t){pe.prototype[t]=function(n,a){return this.request(ge(a||{},{method:t,url:n,data:(a||{}).data}))}});u.forEach(["post","put","patch"],function(t){function n(a){return function(o,s,i){return this.request(ge(i||{},{method:t,headers:a?{"Content-Type":"multipart/form-data"}:{},url:o,data:s}))}}pe.prototype[t]=n(),pe.prototype[t+"Form"]=n(!0)});let vo=class Ia{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(o){n=o});const a=this;this.promise.then(r=>{if(!a._listeners)return;let o=a._listeners.length;for(;o-- >0;)a._listeners[o](r);a._listeners=null}),this.promise.then=r=>{let o;const s=new Promise(i=>{a.subscribe(i),o=i}).then(r);return s.cancel=function(){a.unsubscribe(o)},s},t(function(o,s,i){a.reason||(a.reason=new Ke(o,s,i),n(a.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}toAbortSignal(){const t=new AbortController,n=a=>{t.abort(a)};return this.subscribe(n),t.signal.unsubscribe=()=>this.unsubscribe(n),t.signal}static source(){let t;return{token:new Ia(function(r){t=r}),cancel:t}}};function Eo(e){return function(n){return e.apply(null,n)}}function wo(e){return u.isObject(e)&&e.isAxiosError===!0}const Dt={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(Dt).forEach(([e,t])=>{Dt[t]=e});function $a(e){const t=new pe(e),n=ra(pe.prototype.request,t);return u.extend(n,pe.prototype,t,{allOwnKeys:!0}),u.extend(n,t,null,{allOwnKeys:!0}),n.create=function(r){return $a(ge(e,r))},n}const V=$a(Je);V.Axios=pe;V.CanceledError=Ke;V.CancelToken=vo;V.isCancel=ha;V.VERSION=Ba;V.toFormData=vt;V.AxiosError=$;V.Cancel=V.CanceledError;V.all=function(t){return Promise.all(t)};V.spread=Eo;V.isAxiosError=wo;V.mergeConfig=ge;V.AxiosHeaders=Q;V.formToJSON=e=>ba(u.isHTMLForm(e)?new FormData(e):e);V.getAdapter=wa.getAdapter;V.HttpStatusCode=Dt;V.default=V;const{Axios:Gi,AxiosError:Ji,CanceledError:Ki,isCancel:Wi,CancelToken:zi,VERSION:Xi,all:Zi,Cancel:Qi,isAxiosError:Yi,spread:ed,toFormData:td,AxiosHeaders:nd,HttpStatusCode:ad,formToJSON:rd,getAdapter:od,mergeConfig:sd}=V;window.axios=V;window.axios.defaults.headers.common["X-Requested-With"]="XMLHttpRequest";const Kt="transit_user",de="transit_token",Ot="transit_pending_toast";function _e(){try{return typeof window<"u"&&typeof window.localStorage<"u"}catch{return!1}}function Sa(){try{return typeof window<"u"&&typeof window.sessionStorage<"u"}catch{return!1}}function Bo(){if(window.transitAuthUser)return window.transitAuthUser;if(!_e())return null;const e=window.localStorage.getItem(Kt);if(!e)return null;try{return JSON.parse(e)}catch{return qe(),null}}function Ca(e){if(!_e()){window.transitAuthUser=e;return}window.transitAuthUser=e,window.localStorage.setItem(Kt,JSON.stringify(e))}function Io(){if(!_e()){window.transitAuthUser=null;return}window.transitAuthUser=null,window.localStorage.removeItem(Kt)}function Wt(){return typeof window<"u"&&typeof window.transitAuthToken=="string"&&window.transitAuthToken!==""?window.transitAuthToken:_e()?window.localStorage.getItem(de):null}function $o(e){const t=typeof e=="string"?e:"";if(!_e()){window.transitAuthToken=t||null;return}if(window.transitAuthToken=t||null,t===""){window.localStorage.removeItem(de),document.cookie=de+"=; path=/; max-age=0; samesite=lax";return}window.localStorage.setItem(de,t),document.cookie=de+"="+t+"; path=/; max-age=86400; samesite=lax"}function So(){if(!_e()){window.transitAuthToken=null,document.cookie=de+"=; path=/; max-age=0; samesite=lax";return}window.transitAuthToken=null,window.localStorage.removeItem(de),document.cookie=de+"=; path=/; max-age=0; samesite=lax"}function Co(e){Sa()&&window.sessionStorage.setItem(Ot,JSON.stringify(e))}function xo(){if(!Sa())return null;const e=window.sessionStorage.getItem(Ot);if(!e)return null;window.sessionStorage.removeItem(Ot);try{return JSON.parse(e)}catch{return null}}function qe(){Io(),So()}function xa(e,t){if(!e)return t;if(typeof e.detail=="string"&&e.detail!=="")return e.detail;if(typeof e.message=="string"&&e.message!=="")return e.message;if(e.errors&&typeof e.errors=="object"){const n=Object.values(e.errors).flat()[0];if(typeof n=="string"&&n!=="")return n}return t}function In(){return document.body.dataset.apiBase||"/api"}function _a(e=""){const t=String(e).replace(/^\/+/,"");return t===""?In():`${In()}/${t}`}async function E(e,t={}){const{method:n="GET",body:a=null,headers:r={},auth:o=!0}=t,s=new Headers(r);s.set("Accept","application/json"),s.set("X-Requested-With","XMLHttpRequest");let i=a;if(a&&!(a instanceof FormData)&&!(a instanceof Blob)&&(s.set("Content-Type","application/json"),i=JSON.stringify(a)),o){const g=Wt();g&&s.set("Authorization",`Bearer ${g}`)}if(!["GET","HEAD","OPTIONS"].includes(n.toUpperCase())){const g=document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");g&&s.set("X-CSRF-TOKEN",g)}const c=await fetch(_a(e),{method:n,headers:s,body:i,credentials:"same-origin"});let d=null;const l=c.headers.get("content-type")||"";if(c.status!==204&&(d=l.includes("application/json")?await c.json():await c.text()),!c.ok){c.status===401&&(qe(),(document.body.dataset.routeGuard||"none")==="protected"&&window.location.replace(document.body.dataset.loginUrl||"/login"));const g=xa(d,`Request gagal (${c.status})`),k=new Error(g);throw k.status=c.status,k.data=d,k}return d}async function zt(e,t="export.csv"){const n=new Headers({Accept:"text/csv,application/octet-stream","X-Requested-With":"XMLHttpRequest"}),a=Wt();a&&n.set("Authorization",`Bearer ${a}`);const r=await fetch(_a(e),{method:"GET",headers:n,credentials:"same-origin"});if(!r.ok){let g=null;throw(r.headers.get("content-type")||"").includes("application/json")&&(g=await r.json()),new Error(xa(g,"Gagal mengunduh file"))}const o=await r.blob(),c=(r.headers.get("content-disposition")||"").match(/filename="?([^"]+)"?/i)?.[1]||t,d=window.URL.createObjectURL(o),l=document.createElement("a");l.href=d,l.download=c,document.body.appendChild(l),l.click(),l.remove(),window.URL.revokeObjectURL(d)}function Me(e,t){const n=document.getElementById(e);n&&(n.textContent=t)}function _o(e){const t=e?.role||"";document.querySelectorAll("[data-role-scope]").forEach(n=>{const a=n.dataset.roleScope,r=a==="admin"?["Super Admin","Admin"].includes(t):a==="super"?t==="Super Admin":!0;n.hidden=!r})}function La(){return Bo()}function rt(e){if(_o(e),!e)return;const t=e.nama||"Admin",n=t.trim().split(/\s+/)[0]||"Admin",a=e.email||"admin@pekanbaru.com";Me("sidebar-user-name",t),Me("sidebar-user-email",a),Me("header-user-name",n),Me("dropdown-user-name",t),Me("dropdown-user-email",a)}function Ta(e){return typeof e.access_token=="string"&&e.access_token!==""&&$o(e.access_token),Ca(e.user),rt(e.user),e}async function Lo(e){const t=await E("/auth/login",{method:"POST",body:e,auth:!1});return Ta(t)}async function To(e){const t=await E("/auth/register",{method:"POST",body:e,auth:!1});return Ta(t)}async function $n(){const e=await E("/auth/me");return Ca(e),rt(e),e}async function Ao(){try{await E("/auth/logout",{method:"POST"})}catch(e){if(e?.status!==401)throw e}qe(),Co({type:"success",title:"Logout berhasil",message:"Sampai jumpa kembali!"}),window.location.replace(document.body.dataset.loginUrl||"/login")}function Sn(e){window.location.replace(e)}async function Mo(){const e=document.body.dataset.routeGuard||"none",t=document.body.dataset.loginUrl||"/login",n=document.body.dataset.dashboardUrl||"/dashboard",a=La();if(e==="public"){try{const r=await $n();return Sn(n),{user:r}}catch{(a||Wt())&&qe()}return{user:null}}if(e==="protected")try{return{user:await $n()}}catch{return qe(),Sn(t),{user:null}}return{user:a}}function Xt(){return Array.from(document.querySelectorAll(".modal-shell")).filter(e=>!e.hidden)}function Aa(){document.body.style.overflow=Xt().length>0?"hidden":""}function U(e){const t=document.getElementById(e);t&&(t.hidden=!1,Aa())}function G(e=null){if(e){const t=document.getElementById(e);t&&(t.hidden=!0)}else Xt().forEach(t=>{t.hidden=!0});Aa()}function Ro(){document.addEventListener("click",e=>{const t=e.target.closest("[data-modal-open]");if(t){U(t.dataset.modalOpen);return}const n=e.target.closest("[data-modal-close]");if(n){const a=n.dataset.modalClose||n.closest(".modal-shell")?.id;G(a||void 0)}}),document.addEventListener("keydown",e=>{if(e.key!=="Escape")return;const t=Xt().pop();t&&G(t.id)})}function Zt(e,t,n){const a=document.getElementById("transit-toast-root");if(!a)return;const r=document.createElement("div");r.className=`transit-toast ${n==="error"?"is-error":""} ${n==="info"?"is-info":""}`.trim(),r.innerHTML=`
        <div>
            <strong>${e}</strong>
            <p>${t}</p>
        </div>
    `,a.appendChild(r),window.requestAnimationFrame(()=>{r.classList.add("is-visible")}),window.setTimeout(()=>{r.classList.remove("is-visible"),window.setTimeout(()=>r.remove(),180)},3600)}function N(e,t="Berhasil"){Zt(t,e,"success")}function y(e,t="Gagal"){Zt(t,e,"error")}function Po(e,t="Info"){Zt(t,e,"info")}function Re(e){const t=document.querySelector("[data-sidebar]"),n=document.querySelector("[data-sidebar-overlay]");!t||!n||(t.classList.toggle("is-open",e),n.hidden=!e)}function nt(e=null){document.querySelectorAll("[data-user-dropdown]").forEach(t=>{if(e&&t===e)return;t.classList.remove("is-open");const n=t.querySelector("[data-user-menu-trigger]"),a=t.querySelector("[data-user-menu-panel]");n&&n.setAttribute("aria-expanded","false"),a&&(a.hidden=!0)})}function Do(e,t=null){if(!e)return;const n=e.querySelector("[data-user-menu-trigger]"),a=e.querySelector("[data-user-menu-panel]"),r=t??!e.classList.contains("is-open");nt(r?e:null),e.classList.toggle("is-open",r),n&&n.setAttribute("aria-expanded",r?"true":"false"),a&&(a.hidden=!r)}function Oo(){document.querySelector("[data-sidebar-open]")?.addEventListener("click",()=>{Re(!0)}),document.querySelector("[data-sidebar-close]")?.addEventListener("click",()=>{Re(!1)}),document.querySelector("[data-sidebar-overlay]")?.addEventListener("click",()=>{Re(!1)}),document.querySelectorAll("[data-user-dropdown]").forEach(e=>{e.querySelector("[data-user-menu-trigger]")?.addEventListener("click",t=>{t.stopPropagation(),Do(e)})}),document.addEventListener("click",e=>{e.target.closest("[data-user-dropdown]")||nt()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&(nt(),Re(!1))}),window.addEventListener("resize",()=>{window.innerWidth>1100&&Re(!1)}),document.querySelectorAll("[data-auth-logout]").forEach(e=>{e.addEventListener("click",async()=>{G(),nt();try{e.disabled=!0,await Ao()}catch(t){e.disabled=!1,y(t.message||"Gagal logout")}})})}const Ma={login:{title:"Selamat Datang!",description:"Masuk ke akun Anda untuk melanjutkan",submit:"Masuk",switchText:"Belum punya akun?",switchAction:"Daftar sekarang"},register:{title:"Buat Akun Baru",description:"Daftar untuk mulai menggunakan sistem",submit:"Daftar",switchText:"Sudah punya akun?",switchAction:"Masuk"}};function Cn(e,t){const n=Ma[e];t.form.dataset.authMode=e,t.title.textContent=n.title,t.description.textContent=n.description,t.submitText.textContent=n.submit,t.switchText&&(t.switchText.textContent=n.switchText),t.switchButton&&(t.switchButton.textContent=n.switchAction),t.nameField.hidden=e!=="register",t.nameInput.required=e==="register"}function jo(){const e=document.getElementById("auth-form");if(!e)return;const t={form:e,title:document.querySelector("[data-auth-title]"),description:document.querySelector("[data-auth-description]"),submitText:document.querySelector("[data-auth-submit-text]"),switchText:document.querySelector("[data-auth-switch-text]"),switchButton:document.querySelector("[data-toggle-auth-mode]"),nameField:document.getElementById("auth-name-field"),nameInput:document.getElementById("nama"),emailInput:document.getElementById("email"),passwordInput:document.getElementById("password"),passwordToggle:document.querySelector("[data-toggle-password]"),submitButton:document.getElementById("auth-submit-button")},n=document.body.dataset.dashboardUrl||"/dashboard";Cn("login",t),t.switchButton?.addEventListener("click",()=>{const a=t.form.dataset.authMode==="login"?"register":"login";Cn(a,t)}),t.passwordToggle?.addEventListener("click",()=>{const a=t.passwordInput.type==="password"?"text":"password";t.passwordInput.type=a,t.passwordToggle.textContent=a==="password"?"Lihat":"Sembunyikan"}),e.addEventListener("submit",async a=>{a.preventDefault();const r=new FormData(e),o=e.dataset.authMode||"login",s={email:String(r.get("email")||"").trim(),password:String(r.get("password")||"").trim()};o==="register"&&(s.nama=String(r.get("nama")||"").trim()),t.submitButton.disabled=!0,t.submitText.textContent=o==="login"?"Memproses...":"Mendaftarkan...";try{o==="login"?(await Lo(s),N("Selamat datang kembali","Login berhasil!")):(await To(s),N("Akun Anda telah dibuat","Registrasi berhasil!")),window.location.replace(n)}catch(i){y(i.message||"Terjadi kesalahan",o==="login"?"Login gagal":"Registrasi gagal")}finally{t.submitButton.disabled=!1,t.submitText.textContent=Ma[o].submit}})}const qo=new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}),No=new Intl.NumberFormat("id-ID");function q(e){return qo.format(Number(e)||0)}function R(e){return No.format(Number(e)||0)}function m(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Le(e,t=300){let n=null;return(...a)=>{window.clearTimeout(n),n=window.setTimeout(()=>e(...a),t)}}function Te(e,t,n,a){if(n===0||a===0)return"Menampilkan 0 - 0 dari 0 data";const r=(e-1)*t+1,o=r+a-1;return`Menampilkan ${r} - ${o} dari ${n} data`}function Uo(e){if(!e)return"-";const t=new Date(e);return Number.isNaN(t.getTime())?e:new Intl.DateTimeFormat("id-ID",{day:"2-digit",month:"short",year:"numeric"}).format(t)}function We(){return new Date().toISOString().slice(0,10)}function me(e,t,n="Memproses..."){e&&(e.dataset.defaultText||(e.dataset.defaultText=e.textContent.trim()),e.disabled=t,e.textContent=t?n:e.dataset.defaultText)}const ot=["#059669","#10B981","#34D399","#6EE7B7","#A7F3D0"],re={revenueChart:null,passengerChart:null,mobilChart:null};function Ho(){const e=document.getElementById("dashboard-initial-state");if(!e)return{stats:{},revenueData:[],mobilRevenue:[]};try{return JSON.parse(e.textContent||"{}")}catch{return{stats:{},revenueData:[],mobilRevenue:[]}}}function Qt(e){e&&typeof e.destroy=="function"&&e.destroy()}function Fo(e,t){const n=document.querySelector(`[data-stat="${e}"]`);if(!n)return;const a=["total_uang_bersih","total_uang_pc"];n.textContent=a.includes(e)?q(t):R(t)}function Ra(e,t,n){const a=document.getElementById(e),r=document.getElementById(t);a&&(a.hidden=!n),r&&(r.hidden=n)}function Vo(){return"#065f46"}function jt(){return"#d1fae5"}function Yt(){return{backgroundColor:"#ffffff",titleColor:"#064e3b",bodyColor:"#065f46",borderColor:"#d1fae5",borderWidth:1,padding:12,cornerRadius:12,displayColors:!0}}function Go(e){const t=document.getElementById("dashboard-revenue-chart"),n=Array.isArray(e)&&e.length>0;if(Ra("dashboard-revenue-chart","dashboard-revenue-empty",n),Qt(re.revenueChart),!t||!window.Chart||!n){re.revenueChart=null;return}re.revenueChart=new window.Chart(t,{type:"line",data:{labels:e.map(a=>a.bulan),datasets:[{label:"Pendapatan Bersih",data:e.map(a=>a.uang_bersih),borderColor:"#059669",backgroundColor:"rgba(5, 150, 105, 0.08)",fill:!1,tension:.35,pointRadius:4,pointHoverRadius:5,pointBackgroundColor:"#059669",pointBorderColor:"#ffffff",pointBorderWidth:2,borderWidth:3},{label:"Uang PC",data:e.map(a=>a.uang_pc),borderColor:"#f59e0b",backgroundColor:"rgba(245, 158, 11, 0.1)",fill:!1,tension:.35,pointRadius:4,pointHoverRadius:5,pointBackgroundColor:"#f59e0b",pointBorderColor:"#ffffff",pointBorderWidth:2,borderWidth:3}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{labels:{color:Vo(),usePointStyle:!0,pointStyle:"circle",boxWidth:8,boxHeight:8,padding:18}},tooltip:{...Yt(),callbacks:{label(a){return`${a.dataset.label}: ${q(a.parsed.y)}`}}}},scales:{x:{ticks:{color:"#047857",font:{size:12}},grid:{color:jt()},border:{display:!1}},y:{ticks:{color:"#047857",font:{size:12},callback(a){return`${Math.round(Number(a)/1e6)}jt`}},grid:{color:jt()},border:{display:!1}}}}})}function Jo(e){const t=document.getElementById("dashboard-passenger-chart"),n=Array.isArray(e)&&e.length>0;if(Ra("dashboard-passenger-chart","dashboard-passenger-empty",n),Qt(re.passengerChart),!t||!window.Chart||!n){re.passengerChart=null;return}re.passengerChart=new window.Chart(t,{type:"bar",data:{labels:e.map(a=>a.bulan),datasets:[{label:"Penumpang",data:e.map(a=>a.penumpang),backgroundColor:"#10B981",borderRadius:8,maxBarThickness:44}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{...Yt(),callbacks:{label(a){return`Penumpang: ${R(a.parsed.y)}`}}}},scales:{x:{ticks:{color:"#047857",font:{size:12}},grid:{color:"rgba(0, 0, 0, 0)"},border:{display:!1}},y:{ticks:{color:"#047857",font:{size:12}},grid:{color:jt()},border:{display:!1}}}}})}function Ko(e){const t=document.getElementById("dashboard-mobil-list");t&&(t.innerHTML=e.map((n,a)=>`
        <div class="dashboard-mobil-item">
            <div class="dashboard-mobil-meta">
                <span class="dashboard-mobil-dot" style="background-color: ${ot[a%ot.length]}"></span>
                <div>
                    <p class="dashboard-mobil-code">${m(n.kode_mobil)}</p>
                    <p class="dashboard-mobil-trips">${R(n.total_trips)} trip</p>
                    <p class="dashboard-mobil-passengers">${R(n.total_penumpang)} penumpang</p>
                </div>
            </div>
            <p class="dashboard-mobil-value">${q(n.total_uang_bersih)}</p>
        </div>
    `).join(""))}function Wo(e){const t=document.getElementById("dashboard-mobil-chart"),n=document.getElementById("dashboard-mobil-content"),a=document.getElementById("dashboard-mobil-empty"),r=document.getElementById("dashboard-mobil-chart-empty"),o=document.getElementById("dashboard-mobil-list"),s=Array.isArray(e)&&e.length>0,i=s&&e.some(c=>Number(c.total_uang_bersih)>0);if(Qt(re.mobilChart),n&&(n.hidden=!s),a&&(a.hidden=s),t&&(t.hidden=!i),r&&(r.hidden=i),s?Ko(e):o&&(o.innerHTML=""),!t||!window.Chart||!i){re.mobilChart=null;return}re.mobilChart=new window.Chart(t,{type:"doughnut",data:{labels:e.map(c=>c.kode_mobil),datasets:[{data:e.map(c=>c.total_uang_bersih),backgroundColor:e.map((c,d)=>ot[d%ot.length]),borderColor:"#ffffff",borderWidth:6,hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"58%",plugins:{legend:{display:!1},tooltip:{...Yt(),callbacks:{label(c){const d=e[c.dataIndex]||{};return`${c.label}: ${q(c.parsed)} / ${R(d.total_penumpang||0)} penumpang`}}}}}})}function xn(e){Object.entries(e.stats||{}).forEach(([t,n])=>Fo(t,n)),Go(e.revenueData||[]),Jo(e.revenueData||[]),Wo(e.mobilRevenue||[])}async function zo(){const[e,t,n]=await Promise.all([E("/statistics/dashboard"),E("/statistics/revenue-chart"),E("/statistics/mobil-revenue")]);return{stats:e,revenueData:t,mobilRevenue:n}}function _n(e){const t=document.querySelector("[data-dashboard-loading]"),n=document.querySelector("[data-dashboard-content]"),a=document.getElementById("dashboard-refresh-btn");t&&(t.hidden=!e),n&&(n.hidden=e),a&&(a.disabled=e)}async function Xo(){const e=document.getElementById("dashboard-refresh-btn");e&&(xn(Ho()),e.addEventListener("click",async()=>{_n(!0);try{xn(await zo())}catch{y("Silakan coba lagi","Gagal memuat data")}finally{_n(!1)}}))}const T={data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1},Se=10;function Zo(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function Qo(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 21C15 17.4 18 14.4 18 10.5C18 7.18629 15.3137 4.5 12 4.5C8.68629 4.5 6 7.18629 6 10.5C6 14.4 9 17.4 12 21Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
            <circle cx="12" cy="10.5" r="2.25" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function Yo(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function es(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function st(e){const t=document.getElementById("driver-submit-btn");T.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":T.editItem?"Perbarui":"Simpan")}function ts(){const e=document.getElementById("drivers-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="drivers-table-state">
                <div class="drivers-loading-inline">
                    <span class="drivers-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function ns(){const e=document.getElementById("drivers-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="drivers-table-state drivers-empty-copy">
                Belum ada data driver
            </td>
        </tr>
    `)}function Ln(){const e=document.getElementById("drivers-table-body");if(e){if(T.loading){ts();return}if(T.data.length===0){ns();return}e.innerHTML=T.data.map((t,n)=>`
        <tr class="drivers-row" data-testid="driver-row-${t.id}">
            <td class="drivers-index-cell">${(T.page-1)*Se+n+1}</td>
            <td>
                <div class="drivers-user-cell">
                    <span class="drivers-user-avatar" aria-hidden="true">
                        ${Zo()}
                    </span>
                    <span class="drivers-user-name">${m(t.nama)}</span>
                </div>
            </td>
            <td>
                <div class="drivers-location-cell">
                    <span class="drivers-location-icon" aria-hidden="true">${Qo()}</span>
                    <span>${m(t.lokasi)}</span>
                </div>
            </td>
            <td>
                <div class="drivers-action-row">
                    <button
                        class="drivers-icon-button"
                        type="button"
                        data-driver-edit="${t.id}"
                        data-testid="edit-driver-${t.id}"
                        aria-label="Edit driver ${m(t.nama)}"
                    >
                        ${Yo()}
                    </button>
                    <button
                        class="drivers-icon-button drivers-icon-button-danger"
                        type="button"
                        data-driver-delete="${t.id}"
                        data-driver-name="${m(t.nama)}"
                        data-testid="delete-driver-${t.id}"
                        aria-label="Hapus driver ${m(t.nama)}"
                    >
                        ${es()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function Tn(){const e=document.getElementById("drivers-pagination-shell"),t=document.getElementById("drivers-pagination-info"),n=document.getElementById("drivers-pagination-page"),a=document.getElementById("drivers-prev-page-btn"),r=document.getElementById("drivers-next-page-btn"),o=Math.max(1,Math.ceil(T.totalCount/Se));e&&(e.hidden=o<=1),t&&(t.textContent=Te(T.page,Se,T.totalCount,T.data.length)),n&&(n.textContent=`${T.page} / ${o}`),a&&(a.disabled=T.page===1),r&&(r.disabled=T.page>=o)}async function ke(){T.loading=!0,Ln(),Tn();try{const[e,t]=await Promise.all([E(`/drivers?page=${T.page}&limit=${Se}${T.search?`&search=${encodeURIComponent(T.search)}`:""}`),E(`/drivers/count${T.search?`?search=${encodeURIComponent(T.search)}`:""}`)]);T.data=Array.isArray(e)?e:[],T.totalCount=Number(t.count||0)}finally{T.loading=!1,Ln(),Tn()}}function An(){const e=document.getElementById("driver-form"),t=document.getElementById("driver-form-title"),n=document.getElementById("driver-form-description"),a=document.getElementById("driver-id"),r=document.getElementById("driver-nama"),o=document.getElementById("driver-lokasi");e?.reset(),a&&(a.value=""),r&&(r.value=""),o&&(o.value=""),t&&(t.textContent="Tambah Driver Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan data driver"),T.editItem=null,st(!1)}function as(e){const t=document.getElementById("driver-form-title"),n=document.getElementById("driver-form-description"),a=document.getElementById("driver-id"),r=document.getElementById("driver-nama"),o=document.getElementById("driver-lokasi");T.editItem=e,a&&(a.value=e.id),r&&(r.value=e.nama),o&&(o.value=e.lokasi),t&&(t.textContent="Edit Data Driver"),n&&(n.textContent="Isi form di bawah untuk memperbarui data driver"),st(!1)}async function rs(e){const t=await E(`/drivers/${e}`);as(t),U("driver-form-modal")}function os(e){const t=document.getElementById("driver-delete-copy");T.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus driver <strong>${m(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`),U("driver-delete-modal")}function ss(){const e=document.getElementById("drivers-add-btn"),t=document.getElementById("drivers-export-btn"),n=document.getElementById("drivers-search-input"),a=document.getElementById("driver-form"),r=document.getElementById("drivers-table-body"),o=document.getElementById("driver-delete-confirm-btn"),s=document.getElementById("drivers-prev-page-btn"),i=document.getElementById("drivers-next-page-btn");if(!(!e||!a||!r))return e.addEventListener("click",()=>{An(),U("driver-form-modal")}),t?.addEventListener("click",()=>{zt("/export/drivers/csv","drivers.csv").catch(()=>{y("Gagal mengunduh file")})}),n?.addEventListener("input",Le(async c=>{T.search=c.target.value.trim(),T.page=1;try{await ke()}catch{y("Gagal memuat data")}})),a.addEventListener("submit",async c=>{c.preventDefault();const d={nama:document.getElementById("driver-nama")?.value.trim()||"",lokasi:document.getElementById("driver-lokasi")?.value.trim()||""};st(!0);try{T.editItem?(await E(`/drivers/${T.editItem.id}`,{method:"PUT",body:d}),N("Data driver berhasil diperbarui")):(await E("/drivers",{method:"POST",body:d}),N("Driver berhasil ditambahkan")),G("driver-form-modal"),An(),await ke()}catch(l){y(l.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{st(!1)}}),r.addEventListener("click",async c=>{const d=c.target.closest("[data-driver-edit]"),l=c.target.closest("[data-driver-delete]");try{if(d){await rs(d.dataset.driverEdit);return}l&&os({id:l.dataset.driverDelete,nama:l.dataset.driverName})}catch{y("Gagal memuat data")}}),o?.addEventListener("click",async()=>{if(T.deleteItem)try{await E(`/drivers/${T.deleteItem.id}`,{method:"DELETE"}),N("Driver berhasil dihapus"),G("driver-delete-modal"),(T.page-1)*Se>=T.totalCount-1&&T.page>1&&(T.page-=1),T.deleteItem=null,await ke()}catch{y("Gagal menghapus data")}}),s?.addEventListener("click",async()=>{if(!(T.page<=1)){T.page-=1;try{await ke()}catch{y("Gagal memuat data")}}}),i?.addEventListener("click",async()=>{const c=Math.max(1,Math.ceil(T.totalCount/Se));if(!(T.page>=c)){T.page+=1;try{await ke()}catch{y("Gagal memuat data")}}}),ke().catch(()=>{y("Gagal memuat data")})}const w={data:[],loading:!0,totalCount:0,page:1,search:"",filterJenis:"",editItem:null,deleteItem:null,isSubmitting:!1},Ce=10;function is(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M5 14L6.6 9.2C6.8728 8.3816 7.6387 7.83 8.5014 7.83H15.4986C16.3613 7.83 17.1272 8.3816 17.4 9.2L19 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M4 14H20V17C20 18.1046 19.1046 19 18 19H6C4.89543 19 4 18.1046 4 17V14Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M7 16H7.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path>
            <path d="M17 16H17.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path>
        </svg>
    `}function ds(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function ls(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function cs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 13L11 22L2 13V4H11L20 13Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <circle cx="7.5" cy="8.5" r="1.5" fill="currentColor"></circle>
        </svg>
    `}function it(e){const t=document.getElementById("mobil-submit-btn");w.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":w.editItem?"Perbarui":"Simpan")}function us(e){return e==="Hiace"?"mobil-jenis-badge mobil-jenis-badge-hiace":"mobil-jenis-badge mobil-jenis-badge-reborn"}function ms(){const e=document.getElementById("mobil-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="mobil-table-state">
                <div class="mobil-loading-inline">
                    <span class="mobil-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function ps(){const e=document.getElementById("mobil-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="mobil-table-state mobil-empty-copy">
                Belum ada data mobil
            </td>
        </tr>
    `)}function Mn(){const e=document.getElementById("mobil-table-body");if(e){if(w.loading){ms();return}if(w.data.length===0){ps();return}e.innerHTML=w.data.map((t,n)=>`
        <tr class="mobil-row" data-testid="mobil-row-${t.id}">
            <td class="mobil-index-cell">${(w.page-1)*Ce+n+1}</td>
            <td>
                <div class="mobil-code-cell">
                    <span class="mobil-code-avatar" aria-hidden="true">
                        ${is()}
                    </span>
                    <span class="mobil-code-text">${m(t.kode_mobil)}</span>
                </div>
            </td>
            <td>
                <span class="${us(t.jenis_mobil)}">
                    <span class="mobil-jenis-icon" aria-hidden="true">${cs()}</span>
                    <span>${m(t.jenis_mobil)}</span>
                </span>
            </td>
            <td>
                <div class="mobil-action-row">
                    <button
                        class="mobil-icon-button"
                        type="button"
                        data-mobil-edit="${t.id}"
                        data-testid="edit-mobil-${t.id}"
                        aria-label="Edit mobil ${m(t.kode_mobil)}"
                    >
                        ${ds()}
                    </button>
                    <button
                        class="mobil-icon-button mobil-icon-button-danger"
                        type="button"
                        data-mobil-delete="${t.id}"
                        data-mobil-name="${m(t.kode_mobil)}"
                        data-testid="delete-mobil-${t.id}"
                        aria-label="Hapus mobil ${m(t.kode_mobil)}"
                    >
                        ${ls()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function Rn(){const e=document.getElementById("mobil-pagination-shell"),t=document.getElementById("mobil-pagination-info"),n=document.getElementById("mobil-pagination-page"),a=document.getElementById("mobil-prev-page-btn"),r=document.getElementById("mobil-next-page-btn"),o=Math.max(1,Math.ceil(w.totalCount/Ce));e&&(e.hidden=o<=1),t&&(t.textContent=Te(w.page,Ce,w.totalCount,w.data.length)),n&&(n.textContent=`${w.page} / ${o}`),a&&(a.disabled=w.page===1),r&&(r.disabled=w.page>=o)}async function ce(){w.loading=!0,Mn(),Rn();try{const[e,t]=await Promise.all([E(`/mobil?page=${w.page}&limit=${Ce}${w.search?`&search=${encodeURIComponent(w.search)}`:""}${w.filterJenis?`&jenis=${encodeURIComponent(w.filterJenis)}`:""}`),E(`/mobil/count${w.search||w.filterJenis?"?":""}${[w.search?`search=${encodeURIComponent(w.search)}`:"",w.filterJenis?`jenis=${encodeURIComponent(w.filterJenis)}`:""].filter(Boolean).join("&")}`)]);w.data=Array.isArray(e)?e:[],w.totalCount=Number(t.count||0)}finally{w.loading=!1,Mn(),Rn()}}function Pn(){const e=document.getElementById("mobil-form"),t=document.getElementById("mobil-form-title"),n=document.getElementById("mobil-form-description"),a=document.getElementById("mobil-id"),r=document.getElementById("mobil-kode"),o=document.getElementById("mobil-jenis");e?.reset(),a&&(a.value=""),r&&(r.value=""),o&&(o.value="Hiace"),t&&(t.textContent="Tambah Mobil Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan data mobil"),w.editItem=null,it(!1)}function gs(e){const t=document.getElementById("mobil-form-title"),n=document.getElementById("mobil-form-description"),a=document.getElementById("mobil-id"),r=document.getElementById("mobil-kode"),o=document.getElementById("mobil-jenis");w.editItem=e,a&&(a.value=e.id),r&&(r.value=e.kode_mobil),o&&(o.value=e.jenis_mobil),t&&(t.textContent="Edit Data Mobil"),n&&(n.textContent="Isi form di bawah untuk memperbarui data mobil"),it(!1)}async function fs(e){const t=await E(`/mobil/${e}`);gs(t),U("mobil-form-modal")}function bs(e){const t=document.getElementById("mobil-delete-copy");w.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus mobil <strong>${m(e.kode_mobil)}</strong>? Tindakan ini tidak dapat dibatalkan.`),U("mobil-delete-modal")}function hs(){const e=document.getElementById("mobil-add-btn"),t=document.getElementById("mobil-export-btn"),n=document.getElementById("mobil-search-input"),a=document.getElementById("mobil-filter-jenis"),r=document.getElementById("mobil-form"),o=document.getElementById("mobil-table-body"),s=document.getElementById("mobil-delete-confirm-btn"),i=document.getElementById("mobil-prev-page-btn"),c=document.getElementById("mobil-next-page-btn"),d=document.getElementById("mobil-kode");if(!(!e||!r||!o))return e.addEventListener("click",()=>{Pn(),U("mobil-form-modal")}),t?.addEventListener("click",()=>{zt("/export/mobil/csv","mobil.csv").catch(()=>{y("Gagal mengunduh file")})}),n?.addEventListener("input",Le(async l=>{w.search=l.target.value.trim(),w.page=1;try{await ce()}catch{y("Gagal memuat data")}})),a?.addEventListener("change",async l=>{w.filterJenis=l.target.value,w.page=1;try{await ce()}catch{y("Gagal memuat data")}}),d?.addEventListener("input",l=>{l.target.value=l.target.value.toUpperCase()}),r.addEventListener("submit",async l=>{l.preventDefault();const g={kode_mobil:document.getElementById("mobil-kode")?.value.trim().toUpperCase()||"",jenis_mobil:document.getElementById("mobil-jenis")?.value||"Hiace"};it(!0);try{w.editItem?(await E(`/mobil/${w.editItem.id}`,{method:"PUT",body:g}),N("Data mobil berhasil diperbarui")):(await E("/mobil",{method:"POST",body:g}),N("Mobil berhasil ditambahkan")),G("mobil-form-modal"),Pn(),await ce()}catch(k){y(k.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{it(!1)}}),o.addEventListener("click",async l=>{const g=l.target.closest("[data-mobil-edit]"),k=l.target.closest("[data-mobil-delete]");try{if(g){await fs(g.dataset.mobilEdit);return}k&&bs({id:k.dataset.mobilDelete,kode_mobil:k.dataset.mobilName})}catch{y("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(w.deleteItem)try{await E(`/mobil/${w.deleteItem.id}`,{method:"DELETE"}),N("Mobil berhasil dihapus"),G("mobil-delete-modal"),(w.page-1)*Ce>=w.totalCount-1&&w.page>1&&(w.page-=1),w.deleteItem=null,await ce()}catch{y("Gagal menghapus data")}}),i?.addEventListener("click",async()=>{if(!(w.page<=1)){w.page-=1;try{await ce()}catch{y("Gagal memuat data")}}}),c?.addEventListener("click",async()=>{const l=Math.max(1,Math.ceil(w.totalCount/Ce));if(!(w.page>=l)){w.page+=1;try{await ce()}catch{y("Gagal memuat data")}}}),ce().catch(()=>{y("Gagal memuat data")})}const B={data:[],drivers:[],mobilList:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1},Ne=10,Dn={"05:00":"Subuh (05.00 WIB)","08:00":"Pagi (08.00 WIB)","10:00":"Pagi (10.00 WIB)","14:00":"Siang (14.00 WIB)","16:00":"Sore (16.00 WIB)","19:00":"Malam (19.00 WIB)"},wt="08:00",ks=["Reguler","Dropping","Rental"],en="Reguler";function ys(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function vs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function tn(e){return e==="Lunas"?"Lunas":"Belum Lunas"}function On(e){const t=tn(e);return`<span class="keberangkatan-payment-badge ${t==="Lunas"?"is-paid":"is-unpaid"}">${m(t)}</span>`}function jn(e){return Dn[e]||Dn[wt]}function dt(e){return ks.includes(e)?e:en}function Es(){const e=Number(document.getElementById("keberangkatan-tarif-penumpang")?.value||0),t=Number(document.getElementById("keberangkatan-uang-paket")?.value||0),n=Number(document.getElementById("keberangkatan-jumlah-snack")?.value||0),a=Number(document.getElementById("keberangkatan-pengembalian-snack")?.value||0),r=Number(document.getElementById("keberangkatan-jumlah-air-mineral")?.value||0),o=e,s=o+t,i=s*.15,c=s*.85;return{jumlah_uang_penumpang:o,uang_paket:t,total:s,uang_pc:i,uang_bersih:c,jumlah_snack:n,pengembalian_snack:a,jumlah_air_mineral:r}}function nn(){const e=Es();Object.entries(e).forEach(([t,n])=>{const a=document.querySelector(`[data-calc="${t}"]`);if(a){if(t==="jumlah_snack"){a.textContent=`${R(n)} item`;return}if(t==="pengembalian_snack"){a.textContent=`${R(n)} item`;return}if(t==="jumlah_air_mineral"){a.textContent=`${R(n)} botol`;return}a.textContent=q(n)}})}function lt(e,t,n,a,r=""){const o=document.getElementById(e);if(!o)return;const s=e==="keberangkatan-kode-mobil"?"Pilih mobil":"Pilih driver";o.innerHTML=`
        <option value="">${s}</option>
        ${t.map(i=>`
            <option value="${i[n]}" ${String(i[n])===String(r)?"selected":""}>
                ${m(a(i))}
            </option>
        `).join("")}
    `}function ct(e){const t=document.getElementById("keberangkatan-submit-btn");B.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":B.editItem?"Perbarui":"Simpan")}function ws(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");e&&(e.innerHTML=`
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
        `))}function Bs(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");e&&(e.innerHTML=`
        <tr>
            <td colspan="18" class="keberangkatan-table-state keberangkatan-empty-copy">
                Belum ada data keberangkatan
            </td>
        </tr>
    `,t&&(t.hidden=!1,t.innerHTML=`
            <div class="keberangkatan-mobile-state keberangkatan-empty-copy">
                Belum ada data keberangkatan
            </div>
        `))}function qn(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");if(e){if(B.loading){ws();return}if(B.data.length===0){Bs();return}e.innerHTML=B.data.map(n=>`
        <tr class="keberangkatan-row" data-testid="keberangkatan-row-${n.id}">
            <td class="keberangkatan-hari-cell">${m(n.hari)}</td>
            <td>${m(n.tanggal)}</td>
            <td>${m(n.jam_keberangkatan_label||jn(n.jam_keberangkatan))}</td>
            <td>${m(dt(n.tipe_layanan))}</td>
            <td>
                <span class="keberangkatan-kode-badge">${m(n.kode_mobil)}</span>
            </td>
            <td>${m(n.driver_nama)}</td>
            <td class="text-right">${R(n.jumlah_penumpang)}</td>
            <td class="text-right keberangkatan-money-cell">${q(n.jumlah_uang_penumpang)}</td>
            <td class="text-right">${R(n.jumlah_paket)}</td>
            <td class="text-right keberangkatan-money-cell">${q(n.uang_paket)}</td>
            <td class="text-right"><span class="keberangkatan-stock-badge">${R(n.jumlah_snack)}</span></td>
            <td class="text-right"><span class="keberangkatan-stock-badge keberangkatan-stock-badge-blue">${R(n.pengembalian_snack)}</span></td>
            <td class="text-right"><span class="keberangkatan-stock-badge keberangkatan-stock-badge-blue">${R(n.jumlah_air_mineral)}</span></td>
            <td class="text-right keberangkatan-money-cell keberangkatan-money-cell-amber">${q(n.uang_pc)}</td>
            <td class="text-right keberangkatan-money-cell keberangkatan-money-cell-emerald">${q(n.uang_bersih)}</td>
            <td class="text-center">${On(n.status_pembayaran)}</td>
            <td class="text-center">
                <span class="keberangkatan-trip-badge">#${R(n.trip_ke)}</span>
            </td>
            <td>
                <div class="keberangkatan-action-row">
                    <button
                        class="keberangkatan-icon-button"
                        type="button"
                        data-keberangkatan-edit="${n.id}"
                        data-testid="edit-keberangkatan-${n.id}"
                        aria-label="Edit data keberangkatan ${m(n.kode_mobil)}"
                    >
                        ${ys()}
                    </button>
                    <button
                        class="keberangkatan-icon-button keberangkatan-icon-button-danger"
                        type="button"
                        data-keberangkatan-delete="${n.id}"
                        data-testid="delete-keberangkatan-${n.id}"
                        aria-label="Hapus data keberangkatan ${m(n.kode_mobil)}"
                    >
                        ${vs()}
                    </button>
                </div>
            </td>
        </tr>
    `).join(""),t&&(t.hidden=!1,t.innerHTML=B.data.map(n=>`
            <article class="keberangkatan-mobile-card" data-testid="keberangkatan-card-${n.id}">
                <div class="keberangkatan-mobile-card-head">
                    <div>
                        <p class="keberangkatan-mobile-day">${m(n.hari)}</p>
                        <h3 class="keberangkatan-mobile-date">${m(n.tanggal)}</h3>
                        <p>${m(n.jam_keberangkatan_label||jn(n.jam_keberangkatan))}</p>
                    </div>
                    <div class="keberangkatan-mobile-head-side">
                        <span class="keberangkatan-kode-badge">${m(n.kode_mobil)}</span>
                        <span class="keberangkatan-trip-badge">#${R(n.trip_ke)}</span>
                    </div>
                </div>

                <div class="keberangkatan-mobile-driver">
                    <span>Driver</span>
                    <strong>${m(n.driver_nama)}</strong>
                </div>

                <div class="keberangkatan-mobile-grid">
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-status">
                        <span>Validasi</span>
                        ${On(n.status_pembayaran)}
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Layanan</span>
                        <strong>${m(dt(n.tipe_layanan))}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Penumpang</span>
                        <strong>${R(n.jumlah_penumpang)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Paket</span>
                        <strong>${R(n.jumlah_paket)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Snack</span>
                        <strong>${R(n.jumlah_snack)} item</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Pengembalian Snack</span>
                        <strong>${R(n.pengembalian_snack)} item</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Air Mineral</span>
                        <strong>${R(n.jumlah_air_mineral)} botol</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-full">
                        <span>Jumlah Tarif</span>
                        <strong>${q(n.jumlah_uang_penumpang)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-full">
                        <span>Uang Paket</span>
                        <strong>${q(n.uang_paket)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-accent">
                        <span>Uang PC (15%)</span>
                        <strong>${q(n.uang_pc)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-emerald">
                        <span>Uang Bersih</span>
                        <strong>${q(n.uang_bersih)}</strong>
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
        `).join(""))}}function Nn(){const e=document.getElementById("keberangkatan-pagination-shell"),t=document.getElementById("keberangkatan-pagination-info"),n=document.getElementById("keberangkatan-pagination-page"),a=document.getElementById("keberangkatan-prev-page-btn"),r=document.getElementById("keberangkatan-next-page-btn"),o=Math.max(1,Math.ceil(B.totalCount/Ne));e&&(e.hidden=o<=1),t&&(t.textContent=Te(B.page,Ne,B.totalCount,B.data.length)),n&&(n.textContent=`${B.page} / ${o}`),a&&(a.disabled=B.page===1),r&&(r.disabled=B.page>=o)}async function ye(){B.loading=!0,qn(),Nn();try{const[e,t,n,a]=await Promise.all([E(`/keberangkatan?page=${B.page}&limit=${Ne}${B.search?`&search=${encodeURIComponent(B.search)}`:""}`),E(`/keberangkatan/count${B.search?`?search=${encodeURIComponent(B.search)}`:""}`),E("/drivers/all"),E("/mobil/all")]);B.data=Array.isArray(e)?e:[],B.totalCount=Number(t.count||0),B.drivers=Array.isArray(n)?n:[],B.mobilList=Array.isArray(a)?a:[]}finally{B.loading=!1,qn(),Nn()}}function Pa(){document.getElementById("keberangkatan-form")?.scrollTo({top:0,behavior:"auto"})}function Lt(){const e=document.getElementById("keberangkatan-form"),t=document.getElementById("keberangkatan-form-title"),n=document.getElementById("keberangkatan-form-description"),a=document.getElementById("keberangkatan-tanggal"),r=document.getElementById("keberangkatan-jam-keberangkatan"),o=document.getElementById("keberangkatan-trip-ke"),s=document.getElementById("keberangkatan-tipe-layanan"),i=document.getElementById("keberangkatan-jumlah-penumpang"),c=document.getElementById("keberangkatan-tarif-penumpang"),d=document.getElementById("keberangkatan-jumlah-paket"),l=document.getElementById("keberangkatan-uang-paket"),g=document.getElementById("keberangkatan-jumlah-snack"),k=document.getElementById("keberangkatan-pengembalian-snack"),v=document.getElementById("keberangkatan-jumlah-air-mineral"),p=document.getElementById("keberangkatan-status-pembayaran");e?.reset(),B.editItem=null,document.getElementById("keberangkatan-id").value="",t&&(t.textContent="Tambah Data Keberangkatan"),n&&(n.textContent="Isi form di bawah untuk menambahkan data keberangkatan"),a&&(a.value=We()),r&&(r.value=wt),lt("keberangkatan-kode-mobil",B.mobilList,"kode_mobil",h=>`${h.kode_mobil} - ${h.jenis_mobil}`,B.mobilList[0]?.kode_mobil||""),lt("keberangkatan-driver-id",B.drivers,"id",h=>`${h.nama} - ${h.lokasi}`,B.drivers[0]?.id||""),o&&(o.value="1"),s&&(s.value=en),i&&(i.value="0"),c&&(c.value="0"),d&&(d.value="0"),l&&(l.value="0"),g&&(g.value="0"),k&&(k.value="0"),v&&(v.value="0"),p&&(p.value="Belum Lunas"),ct(!1),nn(),Pa()}async function Un(e){const t=await E(`/keberangkatan/${e}`),n=document.getElementById("keberangkatan-form-title"),a=document.getElementById("keberangkatan-form-description");B.editItem=t,document.getElementById("keberangkatan-id").value=t.id,document.getElementById("keberangkatan-tanggal").value=t.tanggal,document.getElementById("keberangkatan-jam-keberangkatan").value=t.jam_keberangkatan||wt,document.getElementById("keberangkatan-trip-ke").value=t.trip_ke,document.getElementById("keberangkatan-tipe-layanan").value=dt(t.tipe_layanan),document.getElementById("keberangkatan-jumlah-penumpang").value=t.jumlah_penumpang,document.getElementById("keberangkatan-tarif-penumpang").value=t.tarif_penumpang,document.getElementById("keberangkatan-jumlah-paket").value=t.jumlah_paket,document.getElementById("keberangkatan-uang-paket").value=t.uang_paket,document.getElementById("keberangkatan-jumlah-snack").value=t.jumlah_snack,document.getElementById("keberangkatan-pengembalian-snack").value=t.pengembalian_snack,document.getElementById("keberangkatan-jumlah-air-mineral").value=t.jumlah_air_mineral,document.getElementById("keberangkatan-status-pembayaran").value=tn(t.status_pembayaran),lt("keberangkatan-kode-mobil",B.mobilList,"kode_mobil",r=>`${r.kode_mobil} - ${r.jenis_mobil}`,t.kode_mobil),lt("keberangkatan-driver-id",B.drivers,"id",r=>`${r.nama} - ${r.lokasi}`,t.driver_id),n&&(n.textContent="Edit Data Keberangkatan"),a&&(a.textContent="Isi form di bawah untuk memperbarui data keberangkatan"),ct(!1),nn(),Pa(),U("keberangkatan-form-modal")}function Hn(e){B.deleteItem=e,U("keberangkatan-delete-modal")}function Is(){const e=document.getElementById("keberangkatan-add-btn"),t=document.getElementById("keberangkatan-export-btn"),n=document.getElementById("keberangkatan-search-input"),a=document.getElementById("keberangkatan-form"),r=document.getElementById("keberangkatan-table-body"),o=document.getElementById("keberangkatan-mobile-list"),s=document.getElementById("keberangkatan-delete-confirm-btn"),i=document.getElementById("keberangkatan-prev-page-btn"),c=document.getElementById("keberangkatan-next-page-btn");if(!(!e||!a||!r))return e.addEventListener("click",()=>{Lt(),U("keberangkatan-form-modal")}),t?.addEventListener("click",()=>{zt("/export/keberangkatan/csv","keberangkatan.csv").catch(()=>{y("Gagal mengunduh file")})}),n?.addEventListener("input",Le(async d=>{B.search=d.target.value.trim(),B.page=1;try{await ye()}catch{y("Gagal memuat data")}})),a.addEventListener("input",d=>{["keberangkatan-jumlah-penumpang","keberangkatan-tarif-penumpang","keberangkatan-uang-paket","keberangkatan-jumlah-snack","keberangkatan-pengembalian-snack","keberangkatan-jumlah-air-mineral"].includes(d.target.id)&&nn()}),a.addEventListener("submit",async d=>{d.preventDefault();const l={tanggal:document.getElementById("keberangkatan-tanggal")?.value||"",jam_keberangkatan:document.getElementById("keberangkatan-jam-keberangkatan")?.value||wt,tipe_layanan:dt(document.getElementById("keberangkatan-tipe-layanan")?.value||en),kode_mobil:document.getElementById("keberangkatan-kode-mobil")?.value||"",driver_id:document.getElementById("keberangkatan-driver-id")?.value||"",jumlah_penumpang:Number(document.getElementById("keberangkatan-jumlah-penumpang")?.value||0),tarif_penumpang:Number(document.getElementById("keberangkatan-tarif-penumpang")?.value||0),jumlah_paket:Number(document.getElementById("keberangkatan-jumlah-paket")?.value||0),uang_paket:Number(document.getElementById("keberangkatan-uang-paket")?.value||0),jumlah_snack:Number(document.getElementById("keberangkatan-jumlah-snack")?.value||0),pengembalian_snack:Number(document.getElementById("keberangkatan-pengembalian-snack")?.value||0),jumlah_air_mineral:Number(document.getElementById("keberangkatan-jumlah-air-mineral")?.value||0),trip_ke:Number(document.getElementById("keberangkatan-trip-ke")?.value||1),status_pembayaran:tn(document.getElementById("keberangkatan-status-pembayaran")?.value||"")};ct(!0);try{B.editItem?(await E(`/keberangkatan/${B.editItem.id}`,{method:"PUT",body:l}),N("Data berhasil diperbarui")):(await E("/keberangkatan",{method:"POST",body:l}),N("Data berhasil ditambahkan")),G("keberangkatan-form-modal"),Lt(),await ye()}catch(g){y(g.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{ct(!1)}}),r.addEventListener("click",async d=>{const l=d.target.closest("[data-keberangkatan-edit]"),g=d.target.closest("[data-keberangkatan-delete]");try{if(l){await Un(l.dataset.keberangkatanEdit);return}g&&Hn({id:g.dataset.keberangkatanDelete})}catch{y("Gagal memuat data")}}),o?.addEventListener("click",async d=>{const l=d.target.closest("[data-keberangkatan-edit]"),g=d.target.closest("[data-keberangkatan-delete]");try{if(l){await Un(l.dataset.keberangkatanEdit);return}g&&Hn({id:g.dataset.keberangkatanDelete})}catch{y("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(B.deleteItem)try{await E(`/keberangkatan/${B.deleteItem.id}`,{method:"DELETE"}),N("Data berhasil dihapus"),G("keberangkatan-delete-modal"),(B.page-1)*Ne>=B.totalCount-1&&B.page>1&&(B.page-=1),B.deleteItem=null,await ye()}catch{y("Gagal menghapus data")}}),i?.addEventListener("click",async()=>{if(!(B.page<=1)){B.page-=1;try{await ye()}catch{y("Gagal memuat data")}}}),c?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil(B.totalCount/Ne));if(!(B.page>=d)){B.page+=1;try{await ye()}catch{y("Gagal memuat data")}}}),ye().then(()=>{Lt()}).catch(()=>{y("Gagal memuat data")})}const S={data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1,prices:{snack:0,air:0}},Ue=10;function $s(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
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
    `}function ut(e){return Number(document.getElementById(e)?.value||0)}function mt(){const e=ut("stock-total-snack"),t=ut("stock-total-air"),n=e*S.prices.snack+t*S.prices.air,a=document.querySelector('[data-stock-calc="nilai_total"]'),r=document.getElementById("stock-snack-price-label"),o=document.getElementById("stock-air-price-label");r&&(r.textContent=q(S.prices.snack)),o&&(o.textContent=q(S.prices.air)),a&&(a.textContent=q(n))}function pt(e){const t=document.getElementById("stock-submit-btn");S.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":S.editItem?"Perbarui":"Simpan")}function Cs(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");e&&(e.innerHTML=`
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
        `))}function Fn(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");if(e){if(S.loading){Cs();return}if(S.data.length===0){xs();return}e.innerHTML=S.data.map(n=>`
        <tr class="stock-row" data-testid="stock-row-${n.id}">
            <td class="stock-day-cell">${m(n.hari)}</td>
            <td>${m(n.tanggal)}</td>
            <td>${m(n.bulan)}</td>
            <td class="text-right">${R(n.total_stock_snack_display??n.total_stock_snack)}</td>
            <td class="text-right">${R(n.total_stock_air_mineral)}</td>
            <td class="text-right">${R(n.pengembalian_snack)}</td>
            <td class="text-right">${R(n.terpakai_snack)}</td>
            <td class="text-right">${R(n.terpakai_air_mineral)}</td>
            <td class="text-right"><span class="stock-value-badge stock-value-badge-emerald">${R(n.sisa_stock_snack)}</span></td>
            <td class="text-right"><span class="stock-value-badge stock-value-badge-blue">${R(n.sisa_stock_air_mineral)}</span></td>
            <td class="text-right stock-money-cell">${q(n.nilai_total)}</td>
            <td class="text-right stock-money-cell stock-money-cell-emerald">${q(n.sisa_nilai_total)}</td>
            <td>${m(n.keterangan||"-")}</td>
            <td>
                <div class="stock-action-row">
                    <button
                        class="stock-icon-button"
                        type="button"
                        data-stock-edit="${n.id}"
                        data-testid="edit-stock-${n.id}"
                        aria-label="Edit data stok ${m(n.tanggal)}"
                    >
                        ${$s()}
                    </button>
                    <button
                        class="stock-icon-button stock-icon-button-danger"
                        type="button"
                        data-stock-delete="${n.id}"
                        data-stock-date="${m(n.tanggal)}"
                        data-testid="delete-stock-${n.id}"
                        aria-label="Hapus data stok ${m(n.tanggal)}"
                    >
                        ${Ss()}
                    </button>
                </div>
            </td>
        </tr>
    `).join(""),t&&(t.hidden=!1,t.innerHTML=S.data.map(n=>`
            <article class="stock-mobile-card" data-testid="stock-card-${n.id}">
                <div class="stock-mobile-card-head">
                    <div>
                        <p class="stock-mobile-day">${m(n.hari)}</p>
                        <h3 class="stock-mobile-date">${m(n.tanggal)}</h3>
                    </div>
                    <span class="stock-mobile-month">${m(n.bulan)}</span>
                </div>

                <div class="stock-mobile-grid">
                    <div class="stock-mobile-item">
                        <span>Total Snack</span>
                        <strong>${R(n.total_stock_snack_display??n.total_stock_snack)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Total Air Mineral</span>
                        <strong>${R(n.total_stock_air_mineral)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Pengembalian Snack</span>
                        <strong>${R(n.pengembalian_snack)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Terpakai Snack</span>
                        <strong>${R(n.terpakai_snack)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Terpakai Air Mineral</span>
                        <strong>${R(n.terpakai_air_mineral)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Sisa Snack</span>
                        <strong>${R(n.sisa_stock_snack)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Sisa Air Mineral</span>
                        <strong>${R(n.sisa_stock_air_mineral)}</strong>
                    </div>
                    <div class="stock-mobile-item stock-mobile-item-full">
                        <span>Nilai Total</span>
                        <strong>${q(n.nilai_total)}</strong>
                    </div>
                    <div class="stock-mobile-item stock-mobile-item-full stock-mobile-item-emerald">
                        <span>Sisa Nilai Total</span>
                        <strong>${q(n.sisa_nilai_total)}</strong>
                    </div>
                    <div class="stock-mobile-item stock-mobile-item-full">
                        <span>Keterangan</span>
                        <strong>${m(n.keterangan||"-")}</strong>
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
                        data-stock-date="${m(n.tanggal)}"
                        data-testid="delete-stock-mobile-${n.id}"
                    >
                        Hapus
                    </button>
                </div>
            </article>
        `).join(""))}}function Vn(){const e=document.getElementById("stock-pagination-shell"),t=document.getElementById("stock-pagination-info"),n=document.getElementById("stock-pagination-page"),a=document.getElementById("stock-prev-page-btn"),r=document.getElementById("stock-next-page-btn"),o=Math.max(1,Math.ceil(S.totalCount/Ue));e&&(e.hidden=o<=1),t&&(t.textContent=Te(S.page,Ue,S.totalCount,S.data.length)),n&&(n.textContent=`${S.page} / ${o}`),a&&(a.disabled=S.page===1),r&&(r.disabled=S.page>=o)}async function ve(){S.loading=!0,Fn(),Vn();try{const[e,t]=await Promise.all([E(`/stock?page=${S.page}&limit=${Ue}${S.search?`&search=${encodeURIComponent(S.search)}`:""}`),E(`/stock/count${S.search?`?search=${encodeURIComponent(S.search)}`:""}`)]);S.data=Array.isArray(e)?e:[],S.totalCount=Number(t.count||0)}finally{S.loading=!1,Fn(),Vn()}}function Gn(){const e=document.getElementById("stock-form"),t=document.getElementById("stock-form-title"),n=document.getElementById("stock-form-description");e?.reset(),S.editItem=null,document.getElementById("stock-id").value="",document.getElementById("stock-tanggal").value=We(),document.getElementById("stock-total-snack").value="0",document.getElementById("stock-total-air").value="0",document.getElementById("stock-keterangan").value="",t&&(t.textContent="Tambah Stok Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan stok snack dan air mineral"),pt(!1),mt()}function _s(e){const t=document.getElementById("stock-form-title"),n=document.getElementById("stock-form-description");S.editItem=e,document.getElementById("stock-id").value=e.id,document.getElementById("stock-tanggal").value=e.tanggal,document.getElementById("stock-total-snack").value=e.total_stock_snack,document.getElementById("stock-total-air").value=e.total_stock_air_mineral,document.getElementById("stock-keterangan").value=e.keterangan||"",t&&(t.textContent="Edit Data Stok"),n&&(n.textContent="Isi form di bawah untuk memperbarui stok snack dan air mineral"),pt(!1),mt()}async function Jn(e){const t=await E(`/stock/${e}`);_s(t),U("stock-form-modal")}function Kn(e){const t=document.getElementById("stock-delete-copy");S.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus data stok tanggal <strong>${m(e.tanggal)}</strong>? Tindakan ini tidak dapat dibatalkan.`),U("stock-delete-modal")}function Ls(){const e=document.querySelector("[data-stock-page]"),t=document.getElementById("stock-add-btn"),n=document.getElementById("stock-search-input"),a=document.getElementById("stock-form"),r=document.getElementById("stock-table-body"),o=document.getElementById("stock-mobile-list"),s=document.getElementById("stock-delete-confirm-btn"),i=document.getElementById("stock-prev-page-btn"),c=document.getElementById("stock-next-page-btn");if(!(!e||!t||!a||!r))return S.prices.snack=Number(e.dataset.stockSnackPrice||0),S.prices.air=Number(e.dataset.stockAirPrice||0),mt(),t.addEventListener("click",()=>{Gn(),U("stock-form-modal")}),n?.addEventListener("input",Le(async d=>{S.search=d.target.value.trim(),S.page=1;try{await ve()}catch{y("Gagal memuat data")}})),a.addEventListener("input",d=>{["stock-total-snack","stock-total-air"].includes(d.target.id)&&mt()}),a.addEventListener("submit",async d=>{d.preventDefault();const l={tanggal:document.getElementById("stock-tanggal")?.value||"",total_stock_snack:ut("stock-total-snack"),total_stock_air_mineral:ut("stock-total-air"),keterangan:document.getElementById("stock-keterangan")?.value.trim()||""};pt(!0);try{S.editItem?(await E(`/stock/${S.editItem.id}`,{method:"PUT",body:l}),N("Data stok berhasil diperbarui")):(await E("/stock",{method:"POST",body:l}),N("Data stok berhasil ditambahkan")),G("stock-form-modal"),Gn(),await ve()}catch(g){y(g.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{pt(!1)}}),r.addEventListener("click",async d=>{const l=d.target.closest("[data-stock-edit]"),g=d.target.closest("[data-stock-delete]");try{if(l){await Jn(l.dataset.stockEdit);return}g&&Kn({id:g.dataset.stockDelete,tanggal:g.dataset.stockDate})}catch{y("Gagal memuat data")}}),o?.addEventListener("click",async d=>{const l=d.target.closest("[data-stock-edit]"),g=d.target.closest("[data-stock-delete]");try{if(l){await Jn(l.dataset.stockEdit);return}g&&Kn({id:g.dataset.stockDelete,tanggal:g.dataset.stockDate})}catch{y("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(S.deleteItem)try{await E(`/stock/${S.deleteItem.id}`,{method:"DELETE"}),N("Data stok berhasil dihapus"),G("stock-delete-modal"),(S.page-1)*Ue>=S.totalCount-1&&S.page>1&&(S.page-=1),S.deleteItem=null,await ve()}catch{y("Gagal menghapus data")}}),i?.addEventListener("click",async()=>{if(!(S.page<=1)){S.page-=1;try{await ve()}catch{y("Gagal memuat data")}}}),c?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil(S.totalCount/Ue));if(!(S.page>=d)){S.page+=1;try{await ve()}catch{y("Gagal memuat data")}}}),ve().catch(()=>{y("Gagal memuat data")})}const He=10,C={currentUser:null,data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,defaultRole:"User"};function Ts(e){return["Super Admin","Admin"].includes(e)}function As(e){return e==="Super Admin"}function Ms(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function Rs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M2.5 12C4.4 8.2 8 6 12 6C16 6 19.6 8.2 21.5 12C19.6 15.8 16 18 12 18C8 18 4.4 15.8 2.5 12Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function Ps(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Ds(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Os(){return As(C.currentUser?.role)?["Super Admin","Admin","User"]:["Admin","User"]}function gt(e){me(document.getElementById("admin-user-submit-btn"),e,"Menyimpan...")}function js(e){return e==="Super Admin"?"admin-users-role-badge admin-users-role-badge-super":e==="Admin"?"admin-users-role-badge admin-users-role-badge-admin":"admin-users-role-badge admin-users-role-badge-user"}function qs(){const e=document.getElementById("admin-users-table-body");e&&(e.innerHTML=`
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
            <td colspan="6" class="admin-users-table-state admin-users-empty-copy">${m(e)}</td>
        </tr>
    `)}function Wn(){const e=document.getElementById("admin-users-table-body");if(e){if(C.loading){qs();return}if(C.data.length===0){Da();return}e.innerHTML=C.data.map(t=>`
        <tr class="admin-users-row" data-testid="admin-user-row-${t.id}">
            <td>
                <div class="admin-users-name-cell">
                    <span class="admin-users-avatar" aria-hidden="true">${Ms()}</span>
                    <div>
                        <span class="admin-users-name">${m(t.nama)}</span>
                        <span class="admin-users-name-meta">${t.is_current_user?"Akun yang sedang login":"Akun dashboard aktif"}</span>
                    </div>
                </div>
            </td>
            <td><span class="admin-users-username">@${m(t.username)}</span></td>
            <td><span class="admin-users-email">${m(t.email)}</span></td>
            <td>
                <div class="admin-users-password-cell">
                    <span class="admin-users-password-mask">${m(t.password_mask)}</span>
                    <span class="admin-users-password-copy">Terenkripsi</span>
                </div>
            </td>
            <td><span class="${js(t.role)}">${m(t.role)}</span></td>
            <td>
                <div class="admin-users-action-row">
                    <button class="admin-users-icon-button" type="button" data-admin-user-show="${t.id}" data-testid="show-admin-user-${t.id}" aria-label="Lihat detail akun ${m(t.nama)}">
                        ${Rs()}
                    </button>
                    <button class="admin-users-icon-button" type="button" data-admin-user-edit="${t.id}" data-testid="edit-admin-user-${t.id}" aria-label="Edit akun ${m(t.nama)}" ${t.can_edit?"":"disabled"}>
                        ${Ps()}
                    </button>
                    <button class="admin-users-icon-button admin-users-icon-button-danger" type="button" data-admin-user-delete="${t.id}" data-admin-user-name="${m(t.nama)}" data-testid="delete-admin-user-${t.id}" aria-label="Hapus akun ${m(t.nama)}" ${t.can_delete?"":"disabled"}>
                        ${Ds()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function qt(){const e=document.getElementById("admin-users-pagination-shell"),t=document.getElementById("admin-users-pagination-info"),n=document.getElementById("admin-users-pagination-page"),a=document.getElementById("admin-users-prev-page-btn"),r=document.getElementById("admin-users-next-page-btn"),o=Math.max(1,Math.ceil(C.totalCount/He));e&&(e.hidden=o<=1),t&&(t.textContent=Te(C.page,He,C.totalCount,C.data.length)),n&&(n.textContent=`${C.page} / ${o}`),a&&(a.disabled=C.page===1),r&&(r.disabled=C.page>=o)}async function Ee(){C.loading=!0,Wn(),qt();try{const e=C.search?`?search=${encodeURIComponent(C.search)}`:"",t=`?page=${C.page}&limit=${He}${C.search?`&search=${encodeURIComponent(C.search)}`:""}`,[n,a]=await Promise.all([E(`/admin-users${t}`),E(`/admin-users/count${e}`)]);C.data=Array.isArray(n)?n:[],C.totalCount=Number(a.count||0)}finally{C.loading=!1,Wn(),qt()}}function Oa(e="User"){const t=document.getElementById("admin-user-role");if(!t)return;const n=Os(),a=n.includes(e)?e:n[0];t.innerHTML=n.map(r=>`
        <option value="${m(r)}" ${r===a?"selected":""}>${m(r)}</option>
    `).join("")}function ja(e){const t=document.getElementById("admin-user-password"),n=document.getElementById("admin-user-password-note");t&&(t.required=!e,t.placeholder=e?"Kosongkan jika tidak ingin mengubah password":"Masukkan password",t.value=""),n&&(n.textContent=e?"Kosongkan password jika tidak ingin mengubah password akun ini.":"Password minimal 6 karakter dan akan disimpan dalam bentuk terenkripsi.")}function Tt(e="User"){const t=document.getElementById("admin-user-form"),n=document.getElementById("admin-user-form-title"),a=document.getElementById("admin-user-form-description"),r=document.getElementById("admin-user-id");t?.reset(),r&&(r.value=""),Oa(e),ja(!1),n&&(n.textContent=e==="Admin"?"Tambah Admin Baru":"Tambah User Baru"),a&&(a.textContent=e==="Admin"?"Lengkapi data akun untuk menambahkan admin baru":"Lengkapi data akun untuk menambahkan user baru"),C.defaultRole=e,C.editItem=null,gt(!1)}function Ns(e){C.editItem=e,document.getElementById("admin-user-id").value=e.id,document.getElementById("admin-user-nama").value=e.nama,document.getElementById("admin-user-username").value=e.username,document.getElementById("admin-user-email").value=e.email,Oa(e.role),ja(!0),document.getElementById("admin-user-form-title").textContent="Edit Akun",document.getElementById("admin-user-form-description").textContent="Perbarui informasi akun admin atau user di bawah ini",gt(!1)}function Us(e){const t=document.getElementById("admin-user-detail-list");t&&(t.innerHTML=`
        <div class="admin-users-detail-item">
            <span>Nama</span>
            <strong>${m(e.nama)}</strong>
        </div>
        <div class="admin-users-detail-item">
            <span>Username</span>
            <strong>@${m(e.username)}</strong>
        </div>
        <div class="admin-users-detail-item">
            <span>Email</span>
            <strong>${m(e.email)}</strong>
        </div>
        <div class="admin-users-detail-item">
            <span>Password</span>
            <strong>${m(e.password_mask)}</strong>
            <p>${m(e.password_note)}</p>
        </div>
        <div class="admin-users-detail-item">
            <span>Role</span>
            <strong>${m(e.role)}</strong>
        </div>
        <div class="admin-users-detail-item">
            <span>Dibuat</span>
            <strong>${m(Uo(e.created_at))}</strong>
        </div>
    `)}async function Hs(e){Us(await E(`/admin-users/${e}`)),U("admin-user-show-modal")}async function Fs(e){Ns(await E(`/admin-users/${e}`)),U("admin-user-form-modal")}function Vs(e){C.deleteItem=e,document.getElementById("admin-user-delete-copy").innerHTML=`Apakah Anda yakin ingin menghapus akun <strong>${m(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`,U("admin-user-delete-modal")}function zn(){const e=document.getElementById("admin-users-access-note"),t=document.getElementById("admin-users-search-input"),n=document.querySelector(".admin-users-page-actions");e&&(e.hidden=!1,e.textContent="Halaman ini hanya dapat diakses oleh Admin atau Super Admin."),t&&(t.disabled=!0),n&&(n.hidden=!0),C.loading=!1,C.data=[],C.totalCount=0,Da("Anda tidak memiliki akses untuk mengelola data admin dan user."),qt()}function Gs({user:e}={}){const t=document.getElementById("admin-users-add-admin-btn"),n=document.getElementById("admin-users-add-user-btn"),a=document.getElementById("admin-users-search-input"),r=document.getElementById("admin-user-form"),o=document.getElementById("admin-users-table-body"),s=document.getElementById("admin-user-delete-confirm-btn"),i=document.getElementById("admin-users-prev-page-btn"),c=document.getElementById("admin-users-next-page-btn");if(!(!t||!n||!r||!o)){if(C.currentUser=e||window.transitAuthUser||null,!Ts(C.currentUser?.role)){zn();return}return t.addEventListener("click",()=>{Tt("Admin"),U("admin-user-form-modal")}),n.addEventListener("click",()=>{Tt("User"),U("admin-user-form-modal")}),a?.addEventListener("input",Le(async d=>{C.search=d.target.value.trim(),C.page=1;try{await Ee()}catch(l){y(l.message||"Gagal memuat data akun")}})),r.addEventListener("submit",async d=>{d.preventDefault();const l={nama:document.getElementById("admin-user-nama")?.value.trim()||"",username:document.getElementById("admin-user-username")?.value.trim()||"",email:document.getElementById("admin-user-email")?.value.trim()||"",password:document.getElementById("admin-user-password")?.value||"",role:document.getElementById("admin-user-role")?.value||"User"};gt(!0);try{C.editItem?(await E(`/admin-users/${C.editItem.id}`,{method:"PUT",body:l}),N("Akun berhasil diperbarui")):(await E("/admin-users",{method:"POST",body:l}),N(l.role==="Admin"?"Admin berhasil ditambahkan":"User berhasil ditambahkan")),G("admin-user-form-modal"),Tt(C.defaultRole),await Ee()}catch(g){y(g.message||"Silakan periksa kembali data yang diinput","Gagal menyimpan akun")}finally{gt(!1)}}),o.addEventListener("click",async d=>{const l=d.target.closest("[data-admin-user-show]"),g=d.target.closest("[data-admin-user-edit]"),k=d.target.closest("[data-admin-user-delete]");try{if(l){await Hs(l.dataset.adminUserShow);return}if(g){await Fs(g.dataset.adminUserEdit);return}k&&Vs({id:k.dataset.adminUserDelete,nama:k.dataset.adminUserName})}catch(v){y(v.message||"Gagal memuat detail akun")}}),s?.addEventListener("click",async()=>{if(C.deleteItem)try{await E(`/admin-users/${C.deleteItem.id}`,{method:"DELETE"}),N("Akun berhasil dihapus"),G("admin-user-delete-modal"),(C.page-1)*He>=C.totalCount-1&&C.page>1&&(C.page-=1),C.deleteItem=null,await Ee()}catch(d){y(d.message||"Gagal menghapus akun")}}),i?.addEventListener("click",async()=>{if(!(C.page<=1)){C.page-=1;try{await Ee()}catch(d){y(d.message||"Gagal memuat data akun")}}}),c?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil(C.totalCount/He));if(!(C.page>=d)){C.page+=1;try{await Ee()}catch(l){y(l.message||"Gagal memuat data akun")}}}),Ee().catch(d=>{if(d.status===403){zn();return}y(d.message||"Gagal memuat data akun")})}}const Xn=[{value:"05:00",label:"Subuh",time:"05.00 WIB"},{value:"08:00",label:"Pagi",time:"08.00 WIB"},{value:"10:00",label:"Pagi",time:"10.00 WIB"},{value:"14:00",label:"Siang",time:"14.00 WIB"},{value:"16:00",label:"Sore",time:"16.00 WIB"},{value:"19:00",label:"Malam",time:"19.00 WIB"}],qa=[[{code:"1A",label:"1A"},{code:"SOPIR",label:"SOPIR",isDriver:!0}],[{code:"2A",label:"2A"},{code:"3A",label:"3A"}],[{code:"4A",label:"4A"},{code:"5A",label:"5A"}]],Zn=qa.flat().filter(e=>!e.isDriver).length,f={currentUser:null,date:We(),direction:"to_pkb",bookings:[],loading:!1,drivers:[],mobils:[],formOptions:null,selectedSeats:[],passengerDraftMap:{},editItem:null,deleteItem:null,slotDriverMap:{},slotMobilMap:{},occupiedSeatsForForm:[],slotExtraArmadas:{},currentFormArmadaIndex:1};function At(e){const t=document.getElementById(e);if(!t)return null;try{return JSON.parse(t.textContent||"{}")}catch{return null}}function Js(e){return["Super Admin","Admin"].includes(e)}function Ks(e){const t=e?"#dc2626":"#166534",n=e?"#991b1b":"#14532d";return`
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
        </svg>`}function zs(){return'<svg viewBox="0 0 24 24" fill="none"><path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path><path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg>'}function Xs(){return'<svg viewBox="0 0 24 24" fill="none"><path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg>'}function Qn(){return'<svg viewBox="0 0 24 24" fill="none" style="width:12px;height:12px;flex-shrink:0;"><path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'}function Zs(){return'<svg viewBox="0 0 24 24" fill="none" style="width:12px;height:12px;flex-shrink:0;"><rect x="2" y="7" width="15" height="10" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M17 10H20L22 13V17H17V10Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="6" cy="18" r="1.5" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="18" r="1.5" stroke="currentColor" stroke-width="1.5"/></svg>'}function Qs(){return'<svg viewBox="0 0 24 24" fill="none" style="width:12px;height:12px;flex-shrink:0;"><path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 2V8H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 13H16M8 17H13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'}function Ys(e){return`
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
                    </div>`;const o=e[r.code],s=!!o,i=s?"bpg-seat-occupied":"bpg-seat-available",c=s?m(o.nama_pemesanan||"-"):"";return`
                <div class="bpg-seat-item ${i}" title="${s?c:"Tersedia"}">
                    <div class="bpg-seat-icon">${Ks(s)}</div>
                    <span class="bpg-seat-label">${r.label}</span>
                    ${s?`<span class="bpg-seat-name">${c}</span>`:""}
                </div>`}).join("")}</div>`).join("")}
                </div>
            </div>
        </div>`}function ei(e){if(e.length===0)return`
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
                data-departure-status="${m(d.value)}"
                data-booking-departure="${m(String(r.id))}">${m(d.label)}</button>`}).join("");return`
            <div class="bpg-passenger-item" data-booking-id="${m(String(r.id))}">
                <div class="bpg-passenger-item-row">
                    <div class="bpg-passenger-seats">
                        ${o.split(",").map(d=>`<span class="stock-value-badge stock-value-badge-blue">${m(d.trim())}</span>`).join("")}
                    </div>
                    <div class="bpg-passenger-info">
                        <span class="bpg-passenger-name">${m(r.nama_pemesanan||"-")}</span>
                        <span class="bpg-passenger-phone">${m(r.phone||"-")}</span>
                    </div>
                </div>
                <div class="bpg-passenger-item-actions-row">
                    <span class="${m(r.payment_status_badge_class||"stock-value-badge stock-value-badge-blue")} bpg-status-sm">${m(r.payment_status||"-")}</span>
                    <div class="bpg-depart-dropdown" data-depart-dropdown="${m(String(r.id))}">
                        <button class="bpg-depart-trigger ${i.cls}" type="button" data-depart-toggle="${m(String(r.id))}">
                            <svg viewBox="0 0 24 24" fill="none" style="width:11px;height:11px;flex-shrink:0;"><circle cx="12" cy="12" r="2.5" fill="currentColor"/><circle cx="12" cy="5" r="2" fill="currentColor"/><circle cx="12" cy="19" r="2" fill="currentColor"/></svg>
                            ${m(i.label)}
                            <svg viewBox="0 0 24 24" fill="none" style="width:10px;height:10px;flex-shrink:0;"><path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </button>
                        <div class="bpg-depart-menu" hidden>
                            ${c}
                        </div>
                    </div>
                    <div style="flex:1;"></div>
                    <button class="bpg-lihat-btn" type="button" data-booking-lihat="${m(String(r.id))}" aria-label="Lihat detail ${m(r.nama_pemesanan)}">
                        <svg viewBox="0 0 24 24" fill="none" style="width:13px;height:13px;"><path d="M2.5 12C4.4 8.2 8 6 12 6C16 6 19.6 8.2 21.5 12C19.6 15.8 16 18 12 18C8 18 4.4 15.8 2.5 12Z" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/></svg>
                        Lihat
                    </button>
                    <button class="admin-users-icon-button" type="button" data-booking-edit="${m(String(r.id))}" title="Edit pemesanan">
                        ${zs()}
                    </button>
                    <button class="admin-users-icon-button admin-users-icon-button-danger" type="button" data-booking-delete="${m(String(r.id))}" data-booking-name="${m(r.nama_pemesanan)}" title="Hapus pemesanan">
                        ${Xs()}
                    </button>
                </div>
            </div>`}).join("")}
        </div>`}function ti(e){const t={};return e.forEach(n=>{(Array.isArray(n.selected_seats)?n.selected_seats:[]).forEach(r=>{t[r]||(t[r]=n)})}),t}function ni(e,t,n,a){const r=ti(n),o=n.reduce((b,_)=>b+(Number(_.passenger_count)||0),0),s=o>=Zn,i=`${e.value}__${f.direction}__${t}`;if(!f.slotDriverMap[i]){const b=n.find(_=>_.driver_id);b&&(f.slotDriverMap[i]=b.driver_id)}const c=f.slotDriverMap[i]||"",d=f.slotMobilMap[i]||"",l=s?"stock-value-badge-red":"stock-value-badge-yellow",g=f.drivers.map(b=>{const _=b.lokasi?`${b.nama} (${b.lokasi})`:b.nama;return`<option value="${m(b.id)}" ${c===b.id?"selected":""}>${m(_)}</option>`}).join(""),k=f.mobils.map(b=>{const _=`${b.kode_mobil} — ${b.jenis_mobil}`;return`<option value="${m(b.id)}" ${d===b.id?"selected":""}>${m(_)}</option>`}).join(""),v=[...new Set(n.map(b=>(b.service_type||"").trim()).filter(Boolean))],p=a>1?`<span class="bpg-armada-badge">${Zs()} Armada ${t}</span>`:"",h=s?`<button class="bpg-add-armada-btn" type="button"
                data-add-armada="${m(e.value)}"
                data-armada-index="${t}"
                title="Tambah armada ke-${t+1} untuk jadwal ${m(e.time)}">
                ${Qn()}
                Tambah Armada
            </button>`:"";return`
        <article class="bpg-slot-card" data-slot="${m(e.value)}" data-direction="${m(f.direction)}" data-armada="${t}">
            <div class="bpg-slot-head">
                <div class="bpg-slot-head-row">
                    <div class="bpg-slot-time-badge">
                        <span class="bpg-slot-period">${m(e.label)}</span>
                        <strong class="bpg-slot-time">${m(e.time)}</strong>
                    </div>
                    <div class="bpg-slot-head-meta">
                        ${p}
                        <div class="bpg-slot-service-types">
                            ${v.length>0?v.map(b=>`<span class="bpg-service-badge">${m(b)}</span>`).join(""):'<span class="bpg-service-badge bpg-service-badge--empty">Belum ada layanan</span>'}
                        </div>
                        <span class="stock-value-badge ${l}">${o} / ${Zn} Kursi</span>
                    </div>
                </div>
                ${h?`<div class="bpg-slot-head-row">${h}</div>`:""}
            </div>

            ${Ys(r)}

            <div class="bpg-slot-assignment">
                <div class="bpg-slot-select-group">
                    <label>
                        <svg viewBox="0 0 24 24" fill="none" style="width:13px;height:13px;"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/><path d="M4 20C4 17.2386 7.58172 15 12 15C16.4183 15 20 17.2386 20 20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
                        Pilih Driver
                    </label>
                    <select class="bpg-slot-select" data-slot-driver="${m(e.value)}__${t}">
                        <option value="">— Belum ditentukan —</option>
                        ${g}
                    </select>
                </div>
                <div class="bpg-slot-select-group">
                    <label>
                        <svg viewBox="0 0 24 24" fill="none" style="width:13px;height:13px;"><rect x="2" y="7" width="20" height="10" rx="3" stroke="currentColor" stroke-width="1.8"/><circle cx="6" cy="17" r="2" stroke="currentColor" stroke-width="1.8"/><circle cx="18" cy="17" r="2" stroke="currentColor" stroke-width="1.8"/></svg>
                        Pilih Mobil
                    </label>
                    <select class="bpg-slot-select" data-slot-mobil="${m(e.value)}__${t}">
                        <option value="">— Belum ditentukan —</option>
                        ${k}
                    </select>
                </div>
            </div>

            ${ei(n)}

            <button class="bpg-slot-book-btn" type="button"
                data-slot-book="${m(e.value)}"
                data-slot-armada="${t}"
                title="Tambah pemesanan untuk Armada ${t}, jadwal ${m(e.time)}">
                ${Qn()}
                Tambah Pemesanan Armada ${t}
            </button>
            <button class="bpg-surat-jalan-btn" type="button"
                data-surat-jalan="${m(e.value)}"
                data-surat-jalan-armada="${t}"
                title="Buat Surat Jalan Armada ${t}, jadwal ${m(e.time)}">
                ${Qs()}
                Surat Jalan
            </button>
        </article>`}function ai(e,t){const n={};t.forEach(c=>{const d=c.armada_index||1;n[d]||(n[d]=[]),n[d].push(c)});const a=`${e.value}__${f.direction}`,r=t.length>0?Math.max(...Object.keys(n).map(Number)):1,o=f.slotExtraArmadas[a]||1,s=Math.max(r,o),i=[];for(let c=1;c<=s;c++)i.push(ni(e,c,n[c]||[],s));return`<div class="bpg-slot-group" data-slot-group="${m(e.value)}">${i.join("")}</div>`}function ri(){const e=document.getElementById("bpg-slots-shell");e&&(e.innerHTML=`
            <div class="admin-users-loading-inline" style="padding:40px 0;">
                <span class="admin-users-loading-inline-spinner" aria-hidden="true"></span>
                <span>Memuat data penumpang...</span>
            </div>`)}function Na(){const e=document.getElementById("bpg-slots-shell");if(!e)return;const t={};Xn.forEach(a=>{t[a.value]=[]}),f.bookings.forEach(a=>{const o=(a.trip_time||"").trim().substring(0,5);t[o]&&t[o].push(a)});const n=Xn.map(a=>ai(a,t[a.value]||[]));e.innerHTML=`<div class="bpg-slots-grid">${n.join("")}</div>`}async function Pe(){f.loading=!0,ri();try{const e=new URLSearchParams({date:f.date,direction:f.direction,limit:200,page:1}),[t,n]=await Promise.all([E(`/bookings?${e}`),E(`/bookings/armada-extras?date=${f.date}`).catch(()=>({}))]);f.bookings=Array.isArray(t)?t:[],n&&typeof n=="object"&&Object.entries(n).forEach(([a,r])=>{const o=`${a}__${f.direction}`;f.slotExtraArmadas[o]=Math.max(f.slotExtraArmadas[o]||1,Number(r)||1)})}catch(e){f.bookings=[],e.status!==403&&y(e.message||"Gagal memuat data penumpang")}finally{f.loading=!1,Na()}}function oi(e){document.getElementById("bpg-detail-title").textContent=e.nama_pemesanan||"-",document.getElementById("bpg-detail-subtitle").textContent=`${e.booking_code||"-"} · ${e.booking_status||"-"}`,document.getElementById("bpg-detail-full-link").href=`/dashboard/bookings/${e.id}`,document.getElementById("bpg-detail-ticket-link").href=`/dashboard/bookings/${e.id}/ticket`;const t=document.getElementById("bpg-detail-body");t.innerHTML=`
        <div class="bpg-detail-grid">
            <div class="bpg-detail-item">
                <span>Nama Pemesanan</span>
                <strong>${m(e.nama_pemesanan||"-")}</strong>
            </div>
            <div class="bpg-detail-item">
                <span>No HP</span>
                <strong>${m(e.phone||"-")}</strong>
            </div>
            <div class="bpg-detail-item">
                <span>Kota Asal</span>
                <strong>${m(e.from_city||"-")}</strong>
            </div>
            <div class="bpg-detail-item">
                <span>Kota Tujuan</span>
                <strong>${m(e.to_city||"-")}</strong>
            </div>
            <div class="bpg-detail-item">
                <span>Tanggal Keberangkatan</span>
                <strong>${m(e.trip_date_label||"-")}</strong>
            </div>
            <div class="bpg-detail-item">
                <span>Waktu Keberangkatan</span>
                <strong>${m(e.trip_time||"-")}</strong>
            </div>
            <div class="bpg-detail-item">
                <span>Pilih Kursi</span>
                <strong>${m(e.selected_seats_label||"-")}</strong>
            </div>
            <div class="bpg-detail-item">
                <span>Jumlah Penumpang</span>
                <strong>${m(String(e.passenger_count||0))} Orang</strong>
            </div>
            <div class="bpg-detail-item">
                <span>Jenis Layanan</span>
                <strong>${m(e.service_type||"-")}</strong>
            </div>
            <div class="bpg-detail-item">
                <span>Armada</span>
                <strong>Armada ${m(String(e.armada_index||1))}</strong>
            </div>
            <div class="bpg-detail-item">
                <span>Biaya</span>
                <strong class="bpg-detail-price">${m(e.total_amount_formatted||"-")}</strong>
            </div>
            <div class="bpg-detail-item bpg-detail-item--full">
                <span>Alamat Penjemputan</span>
                <p>${m(e.pickup_location||"-")}</p>
            </div>
            <div class="bpg-detail-item bpg-detail-item--full">
                <span>Alamat Pengantaran</span>
                <p>${m(e.dropoff_location||"-")}</p>
            </div>
        </div>`,U("bpg-detail-modal")}function si(){return(f.formOptions?.seat_options||[]).map(e=>e.code)}function an(e){const t=new Map(si().map((n,a)=>[n,a]));return Array.from(new Set((e||[]).map(n=>String(n).trim()).filter(n=>t.has(n)))).sort((n,a)=>(t.get(n)??999)-(t.get(a)??999))}function Bt(){return Number(document.getElementById("booking-passenger-count")?.value||0)}function ii(){const e=Bt();return(f.formOptions?.seat_options||[]).filter(t=>!t.is_optional||e>=6).map(t=>t.code)}function di(){return f.formOptions?.payment_status_options||[]}function li(e){return e==="transfer"?["Belum Bayar","Menunggu Pembayaran","Menunggu Verifikasi","Dibayar"]:e==="qris"?["Belum Bayar","Menunggu Pembayaran","Dibayar"]:e==="cash"?["Belum Bayar","Dibayar Tunai"]:["Belum Bayar"]}function ci(e){return e==="transfer"?"Menunggu Pembayaran":e==="qris"?"Dibayar":e==="cash"?"Dibayar Tunai":"Belum Bayar"}function ui(e){return e==="transfer"?"Menunggu Verifikasi Pembayaran":e==="qris"||e==="cash"?"Diproses":"Draft"}function mi(e,t){if(!e||!t||e===t)return null;const a=(f.formOptions?.route_matrix||{})?.[e]?.[t];return a==null?null:Number(a)}function Oe(){const e=document.getElementById("booking-from-city")?.value||"",t=document.getElementById("booking-to-city")?.value||"",n=Bt(),a=mi(e,t),r=a!==null?a*n:null,o=document.getElementById("booking-price-per-seat"),s=document.getElementById("booking-total-amount");o&&(o.value=a!==null?q(a):""),s&&(s.value=r!==null?q(r):"")}function rn(){const e=document.getElementById("booking-payment-method")?.value||"",t=document.getElementById("booking-payment-status"),n=document.getElementById("booking-booking-status"),a=document.getElementById("booking-bank-account-group"),r=document.getElementById("booking-bank-account-code"),o=li(e),s=t?.value||"";a&&(a.hidden=e!=="transfer"),r&&e!=="transfer"&&(r.value=""),t&&(t.innerHTML=di().filter(i=>o.includes(i.value)).map(i=>`<option value="${m(i.value)}">${m(i.label)}</option>`).join(""),t.value=o.includes(s)?s:ci(e)),n&&(n.value=ui(e))}function pi(){const e=document.getElementById("booking-selected-seats-inputs");e&&(e.innerHTML=f.selectedSeats.map(t=>`<input type="hidden" name="selected_seats[]" value="${m(t)}">`).join(""))}function gi(){const e=document.getElementById("booking-selected-seat-count"),t=document.getElementById("booking-selected-seat-label");e&&(e.textContent=String(f.selectedSeats.length)),t&&(t.textContent=f.selectedSeats.length>0?f.selectedSeats.join(", "):"Belum dipilih")}function Nt(){document.querySelectorAll("[data-passenger-seat]").forEach(e=>{const t=e.dataset.passengerSeat;t&&(f.passengerDraftMap[t]={seat_no:t,name:e.querySelector("[data-passenger-name]")?.value.trim()||"",phone:e.querySelector("[data-passenger-phone]")?.value.trim()||""})})}function se(e=null){const t=document.getElementById("booking-passenger-editor");if(t){if(e&&(f.passengerDraftMap=Object.fromEntries(e.map(n=>[n.seat_no,n]))),f.selectedSeats.length===0){t.innerHTML='<div class="dashboard-empty-state dashboard-empty-state--block bookings-passenger-empty">Pilih kursi terlebih dahulu untuk menampilkan form data penumpang.</div>';return}t.innerHTML=`
        <div class="bookings-passenger-grid bookings-passenger-grid--editor">
            ${f.selectedSeats.map((n,a)=>{const r=f.passengerDraftMap[n]||{name:"",phone:""};return`
                    <article class="bookings-passenger-card bookings-passenger-card--editor" data-passenger-seat="${m(n)}">
                        <div class="bookings-passenger-form-head">
                            <span class="stock-value-badge stock-value-badge-blue">${m(n)}</span>
                            <strong>Penumpang ${a+1}</strong>
                            <p>${a===0?"Menjadi nama pemesanan utama.":"Data penumpang tambahan."}</p>
                        </div>
                        <div class="bookings-passenger-form-grid">
                            <div class="admin-users-form-group">
                                <label>Nama</label>
                                <div class="admin-users-input-shell">
                                    <input type="text" value="${m(r.name||"")}" placeholder="Masukkan nama penumpang" data-passenger-name>
                                </div>
                            </div>
                            <div class="admin-users-form-group">
                                <label>No HP</label>
                                <div class="admin-users-input-shell">
                                    <input type="text" value="${m(r.phone||"")}" placeholder="08xxxxxxxxxx" data-passenger-phone>
                                </div>
                            </div>
                        </div>
                    </article>`}).join("")}
        </div>`}}async function Be(){const e=document.getElementById("booking-trip-date")?.value||"",t=document.getElementById("booking-trip-time")?.value||"",n=document.getElementById("booking-from-city")?.value||"",a=document.getElementById("booking-to-city")?.value||"",r=f.editItem?.id||"",o=f.currentFormArmadaIndex||1;if(!e||!t){f.occupiedSeatsForForm=[];return}try{const s=new URLSearchParams({trip_date:e,trip_time:t,armada_index:o});n&&s.set("from_city",n),a&&s.set("to_city",a),r&&s.set("exclude_id",r);const i=await E(`/bookings/occupied-seats?${s}`);f.occupiedSeatsForForm=Array.isArray(i?.occupied_seats)?i.occupied_seats:[]}catch{f.occupiedSeatsForForm=[]}}function ie(){const e=document.querySelectorAll("[data-seat-code]"),t=Bt(),n=ii();f.selectedSeats=an(f.selectedSeats.filter(a=>n.includes(a)&&!f.occupiedSeatsForForm.includes(a))),e.forEach(a=>{const r=a.dataset.seatCode,o=n.includes(r),s=f.occupiedSeatsForForm.includes(r),i=f.selectedSeats.includes(r),c=f.selectedSeats.length>=t&&!i;a.hidden=!o,a.classList.toggle("is-selected",i),a.classList.toggle("is-occupied",s),a.classList.toggle("is-disabled",!s&&c),a.disabled=!o||s||!i&&c,s?a.title="Kursi sudah dipesan":a.title=""}),pi(),gi()}function De(e=1,t=""){document.getElementById("booking-form")?.reset(),f.editItem=null,f.selectedSeats=[],f.passengerDraftMap={},f.currentFormArmadaIndex=e;const a=f.date||We();document.getElementById("booking-id").value="",document.getElementById("booking-armada-index").value=String(e),document.getElementById("booking-form-title").textContent="Tambah Pemesanan";const r=e>1?` (Armada ${e})`:"";document.getElementById("booking-form-description").textContent=`Lengkapi data pemesanan reguler dari dashboard admin${r}.`,document.getElementById("booking-trip-date").value=a,t&&(document.getElementById("booking-trip-time").value=t),document.getElementById("booking-passenger-count").value="1",document.getElementById("booking-payment-method").value="",document.getElementById("booking-booking-status").value="Draft",rn(),Oe(),me(document.getElementById("booking-submit-btn"),!1,"Menyimpan..."),Be().then(()=>{ie(),se()})}function fi(e){f.editItem=e,f.selectedSeats=an(e.selected_seats||[]),f.passengerDraftMap=Object.fromEntries((e.passengers||[]).map(n=>[n.seat_no,n])),f.currentFormArmadaIndex=e.armada_index||1,document.getElementById("booking-id").value=e.id,document.getElementById("booking-armada-index").value=String(e.armada_index||1),document.getElementById("booking-booking-for").value=e.booking_for,document.getElementById("booking-category").value=e.category,document.getElementById("booking-from-city").value=e.from_city,document.getElementById("booking-to-city").value=e.to_city,document.getElementById("booking-trip-date").value=e.trip_date_value,document.getElementById("booking-trip-time").value=e.trip_time_value,document.getElementById("booking-passenger-count").value=String(e.passenger_count),document.getElementById("booking-driver-name").value=e.driver_name==="Menunggu Penetapan Driver"?"":e.driver_name||"",document.getElementById("booking-pickup-location").value=e.pickup_location,document.getElementById("booking-dropoff-location").value=e.dropoff_location,document.getElementById("booking-payment-method").value=e.payment_method_value||"",rn(),document.getElementById("booking-payment-status").value=e.payment_status,document.getElementById("booking-booking-status").value=e.booking_status,document.getElementById("booking-bank-account-code").value=e.bank_account_code||"",document.getElementById("booking-notes").value=e.notes||"";const t=(e.armada_index||1)>1?` (Armada ${e.armada_index})`:"";document.getElementById("booking-form-title").textContent="Edit Pemesanan",document.getElementById("booking-form-description").textContent=`Perbarui data pemesanan reguler yang dipilih${t}.`,Oe(),me(document.getElementById("booking-submit-btn"),!1,"Menyimpan..."),Be().then(()=>{ie(),se(e.passengers||[])})}function bi(){return Nt(),{booking_for:document.getElementById("booking-booking-for")?.value||"",category:document.getElementById("booking-category")?.value||"Reguler",from_city:document.getElementById("booking-from-city")?.value||"",to_city:document.getElementById("booking-to-city")?.value||"",trip_date:document.getElementById("booking-trip-date")?.value||"",trip_time:document.getElementById("booking-trip-time")?.value||"",passenger_count:Number(document.getElementById("booking-passenger-count")?.value||0),driver_name:document.getElementById("booking-driver-name")?.value.trim()||"",pickup_location:document.getElementById("booking-pickup-location")?.value.trim()||"",dropoff_location:document.getElementById("booking-dropoff-location")?.value.trim()||"",selected_seats:f.selectedSeats,passengers:f.selectedSeats.map(e=>({seat_no:e,name:f.passengerDraftMap?.[e]?.name||"",phone:f.passengerDraftMap?.[e]?.phone||""})),payment_method:document.getElementById("booking-payment-method")?.value||"",payment_status:document.getElementById("booking-payment-status")?.value||"Belum Bayar",booking_status:document.getElementById("booking-booking-status")?.value||"Draft",bank_account_code:document.getElementById("booking-bank-account-code")?.value||"",notes:document.getElementById("booking-notes")?.value.trim()||"",armada_index:f.currentFormArmadaIndex||1}}async function hi(e){fi(await E(`/bookings/${e}`)),U("booking-form-modal")}function ki(e){f.deleteItem=e,document.getElementById("booking-delete-copy").innerHTML=`Apakah Anda yakin ingin menghapus data pemesanan <strong>${m(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`,U("booking-delete-modal")}function Yn(){const e=document.getElementById("bookings-access-note"),t=document.getElementById("bpg-route-tabs"),n=document.getElementById("bpg-slots-shell");e&&(e.hidden=!1),t&&(t.hidden=!0),n&&(n.hidden=!0)}function yi(e){return e==="Berangkat"?{label:"Berangkat",cls:"bpg-depart-trigger--go"}:e==="Tidak Berangkat"?{label:"Tidak Berangkat",cls:"bpg-depart-trigger--no"}:e==="Di Oper"?{label:"Di Oper",cls:"bpg-depart-trigger--oper"}:{label:"Status",cls:""}}function vi({user:e}={}){const t=document.getElementById("bookings-add-btn"),n=document.getElementById("bookings-date-picker"),a=document.getElementById("bpg-route-tabs"),r=document.getElementById("bpg-slots-shell"),o=document.getElementById("booking-form"),s=document.getElementById("booking-delete-confirm-btn"),i=document.getElementById("booking-seat-grid"),c=document.getElementById("booking-passenger-editor"),d=document.getElementById("booking-payment-method");if(f.formOptions=At("bookings-form-options"),f.drivers=At("bookings-drivers-data")||[],f.mobils=At("bookings-mobils-data")||[],f.currentUser=e||window.transitAuthUser||null,f.date=We(),!Js(f.currentUser?.role)){Yn();return}a&&(a.hidden=!1),r&&(r.hidden=!1);const l=document.getElementById("bookings-access-note");l&&(l.hidden=!0),n&&(n.value=f.date,n.addEventListener("change",async()=>{f.date=n.value,f.slotDriverMap={},f.slotMobilMap={},f.slotExtraArmadas={},await Pe()})),a?.addEventListener("click",async k=>{const v=k.target.closest("[data-direction]");if(!v)return;const p=v.dataset.direction;p!==f.direction&&(f.direction=p,f.slotDriverMap={},f.slotMobilMap={},f.slotExtraArmadas={},document.querySelectorAll(".bpg-route-tab").forEach(h=>{h.classList.toggle("is-active",h.dataset.direction===p)}),await Pe())});function g(k=null){r?.querySelectorAll("[data-depart-dropdown]").forEach(v=>{String(v.dataset.departDropdown)!==String(k)&&(v.querySelector(".bpg-depart-menu")?.removeAttribute("hidden"),v.querySelector(".bpg-depart-menu")?.setAttribute("hidden",""))})}return document.addEventListener("click",k=>{k.target.closest("[data-depart-dropdown]")||g()}),r?.addEventListener("click",async k=>{const v=k.target.closest("[data-depart-toggle]"),p=k.target.closest("[data-booking-departure]"),h=k.target.closest("[data-booking-lihat]"),b=k.target.closest("[data-booking-edit]"),_=k.target.closest("[data-booking-delete]"),D=k.target.closest("[data-add-armada]"),M=k.target.closest("[data-slot-book]"),O=k.target.closest("[data-surat-jalan]");try{if(v){const A=v.dataset.departToggle,P=r.querySelector(`[data-depart-dropdown="${CSS.escape(A)}"]`)?.querySelector(".bpg-depart-menu");if(!P)return;const F=P.hasAttribute("hidden");g(A),P.toggleAttribute("hidden",!F);return}if(p){const A=p.dataset.bookingDeparture,j=p.dataset.departureStatus,P=f.bookings.find(Y=>String(Y.id)===String(A));if(!P)return;const F=P.departure_status===j?"":j;P.departure_status=F;const z=r.querySelector(`[data-depart-dropdown="${CSS.escape(A)}"]`);if(z){const Y=z.querySelector(".bpg-depart-trigger"),X=yi(F);Y.className=`bpg-depart-trigger ${X.cls}`,Y.childNodes.forEach(I=>{I.nodeType===3&&(I.textContent=X.label)}),z.querySelectorAll("[data-booking-departure]").forEach(I=>{I.classList.toggle("is-active",I.dataset.departureStatus===F)}),z.querySelector(".bpg-depart-menu")?.setAttribute("hidden","")}await E(`/bookings/${A}/departure-status`,{method:"PATCH",body:{departure_status:F}});return}if(h){const A=h.dataset.bookingLihat,j=f.bookings.find(P=>String(P.id)===String(A));j&&oi(j);return}if(b){await hi(b.dataset.bookingEdit);return}if(_){ki({id:_.dataset.bookingDelete,nama:_.dataset.bookingName});return}if(D){const A=D.dataset.addArmada,P=parseInt(D.dataset.armadaIndex||"1")+1,F=`${A}__${f.direction}`;f.slotExtraArmadas[F]=Math.max(f.slotExtraArmadas[F]||1,P),E("/bookings/armada-extras",{method:"POST",body:{trip_date:f.date,trip_time:A,armada_index:P}}).catch(()=>{}),Na(),De(P,A),U("booking-form-modal");return}if(M){const A=M.dataset.slotBook,j=parseInt(M.dataset.slotArmada||"1");De(j,A),U("booking-form-modal");return}if(O){const A=O.dataset.suratJalan,j=parseInt(O.dataset.suratJalanArmada||"1"),P=`${A}__${f.direction}__${j}`,F=f.slotDriverMap[P]||"",z=f.slotMobilMap[P]||"",Y=F?f.drivers.find(H=>String(H.id)===String(F)):null,X=z?f.mobils.find(H=>String(H.id)===String(z)):null,I=new URLSearchParams({date:f.date,trip_time:A,armada_index:String(j),direction:f.direction});Y&&I.set("driver_name",Y.nama),X&&I.set("no_pol",X.kode_mobil),window.open(`/dashboard/bookings/surat-jalan?${I}`,"_blank");return}}catch(A){y(A.message||"Gagal memuat data pemesanan")}}),r?.addEventListener("change",async k=>{const v=k.target.closest("[data-slot-driver]"),p=k.target.closest("[data-slot-mobil]");if(v){const[h,b]=v.dataset.slotDriver.split("__"),_=parseInt(b||"1"),D=v.value,M=v.options[v.selectedIndex],O=D&&M?.text.split(" (")[0]||"",A=`${h}__${f.direction}__${_}`;f.slotDriverMap[A]=D;try{await E("/bookings/slot-assign",{method:"PATCH",body:{trip_date:f.date,trip_time:h,direction:f.direction,armada_index:_,driver_id:D||null,driver_name:O}}),N("Driver berhasil diperbarui")}catch(j){y(j.message||"Gagal memperbarui driver")}}if(p){const[h,b]=p.dataset.slotMobil.split("__"),_=parseInt(b||"1"),D=p.value,M=`${h}__${f.direction}__${_}`;f.slotMobilMap[M]=D}}),t?.addEventListener("click",()=>{De(1),U("booking-form-modal")}),i?.addEventListener("click",k=>{const v=k.target.closest("[data-seat-code]");if(!v||v.disabled)return;Nt();const p=v.dataset.seatCode;f.selectedSeats.includes(p)?f.selectedSeats=f.selectedSeats.filter(h=>h!==p):f.selectedSeats.length<Bt()&&(f.selectedSeats=an([...f.selectedSeats,p])),ie(),se()}),document.getElementById("booking-passenger-count")?.addEventListener("change",()=>{Nt(),ie(),se(),Oe()}),document.getElementById("booking-trip-date")?.addEventListener("change",()=>{Be().then(()=>{ie(),se()})}),document.getElementById("booking-trip-time")?.addEventListener("change",()=>{Be().then(()=>{ie(),se()})}),document.getElementById("booking-from-city")?.addEventListener("change",()=>{Oe(),Be().then(()=>{ie(),se()})}),document.getElementById("booking-to-city")?.addEventListener("change",()=>{Oe(),Be().then(()=>{ie(),se()})}),d?.addEventListener("change",rn),c?.addEventListener("input",k=>{const v=k.target.closest("[data-passenger-seat]");if(!v)return;const p=v.dataset.passengerSeat;f.passengerDraftMap[p]={seat_no:p,name:v.querySelector("[data-passenger-name]")?.value.trim()||"",phone:v.querySelector("[data-passenger-phone]")?.value.trim()||""}}),o?.addEventListener("submit",async k=>{k.preventDefault();const v=document.getElementById("booking-submit-btn");me(v,!0,"Menyimpan...");try{const p=bi();f.editItem?(await E(`/bookings/${f.editItem.id}`,{method:"PUT",body:p}),N("Data pemesanan berhasil diperbarui")):(await E("/bookings",{method:"POST",body:p}),N("Data pemesanan berhasil ditambahkan")),G("booking-form-modal"),De(),await Pe()}catch(p){y(p.message||"Silakan periksa kembali data yang diinput","Gagal menyimpan data pemesanan")}finally{me(v,!1,"Menyimpan...")}}),s?.addEventListener("click",async()=>{if(f.deleteItem){me(s,!0,"Menghapus...");try{await E(`/bookings/${f.deleteItem.id}`,{method:"DELETE"}),N("Data pemesanan berhasil dihapus"),G("booking-delete-modal"),f.deleteItem=null,await Pe()}catch(k){y(k.message||"Gagal menghapus data pemesanan")}finally{me(s,!1,"Menghapus...")}}}),De(),Pe().catch(k=>{if(k.status===403){Yn();return}y(k.message||"Gagal memuat data penumpang")})}function Ei(e){const t=document.getElementById(e);if(!t)return{};try{return JSON.parse(t.textContent||"{}")}catch{return{}}}function wi(){const e=document.querySelector("[data-regular-booking-page]");if(!e)return;const t=Ei("regular-booking-route-matrix"),n=e.querySelector("[data-booking-origin]"),a=e.querySelector("[data-booking-destination]"),r=e.querySelector("[data-booking-schedule]"),o=e.querySelector("[data-booking-passengers]"),s=e.querySelector("[data-route-fare-input]"),i=e.querySelector("[data-additional-fare-input]"),c=e.querySelector("[data-estimated-total-input]"),d=e.querySelector("[data-route-feedback]"),l=e.querySelector("[data-route-feedback-title]"),g=e.querySelector("[data-route-feedback-text]"),k=e.querySelector("[data-booking-submit]"),v=Array.from(e.querySelectorAll("[data-booking-type]")),p=e.querySelector("[data-summary-booking-for]"),h=e.querySelector("[data-summary-route]"),b=e.querySelector("[data-summary-schedule]"),_=e.querySelector("[data-summary-passengers]"),D=e.querySelector("[data-summary-fare]"),M=e.querySelector("[data-summary-additional-fare]"),O=e.querySelector("[data-summary-total]"),A=new Map(v.map(I=>[I.value,I.dataset.label||I.value])),j=new Map(Array.from(r?.options||[]).filter(I=>I.value).map(I=>[I.value,I.textContent.trim()]));function P(I,H){if(!I||!H||I===H)return null;const W=t?.[I]?.[H];return W==null?null:Number(W)}function F(I,H,W){!d||!l||!g||(d.dataset.state=I,l.textContent=H,g.textContent=W)}function z(){e.querySelectorAll(".regular-booking-radio").forEach(I=>{const H=I.querySelector('input[type="radio"]');I.classList.toggle("is-selected",!!H?.checked)})}function Y(I){return I<=0?"Belum dipilih":I===6?"6 Penumpang (Opsional tambahan)":`${I} Penumpang`}function X(){const I=n?.value||"",H=a?.value||"",W=r?.value||"",be=Number(o?.value||0),J=v.find(It=>It.checked)?.value||"",ne=P(I,H),ee=Math.max(parseInt(i?.value||"0",10)||0,0),le=ne!==null&&be>0?(ne+ee)*be:null;s&&(s.value=ne!==null?q(ne):""),c&&(c.value=le!==null?q(le):""),!I||!H?F("idle","Tarif akan ditampilkan otomatis","Pilih asal dan tujuan untuk melihat tarif perjalanan reguler."):I===H?F("error","Asal dan tujuan tidak boleh sama","Silakan pilih tujuan yang berbeda agar tarif dapat dihitung."):ne===null?F("error","Rute belum tersedia","Rute yang Anda pilih saat ini belum tersedia. Silakan pilih kombinasi asal dan tujuan lain."):F("ready","Rute tersedia","Tarif telah diisi otomatis berdasarkan kombinasi rute dua arah yang tersedia."),k&&(k.disabled=!!(I&&H&&(I===H||ne===null))),p&&(p.textContent=A.get(J)||"Belum dipilih"),h&&(h.textContent=I&&H?`${I} - ${H}`:"Belum dipilih"),b&&(b.textContent=j.get(W)||"Belum dipilih"),_&&(_.textContent=Y(be)),D&&(D.textContent=ne!==null?q(ne):"Belum tersedia"),M&&(M.textContent=ee>0?q(ee):"Tidak ada"),O&&(O.textContent=le!==null?q(le):"Belum tersedia"),z()}[n,a,r,o].forEach(I=>{I?.addEventListener("change",X)}),i?.addEventListener("input",X),v.forEach(I=>{I.addEventListener("change",X)}),e.querySelector("form")?.addEventListener("reset",()=>{window.requestAnimationFrame(X)}),X()}function Bi(){const e=document.querySelector("[data-regular-booking-seat-page]");if(!e)return;const t=Number(e.dataset.requiredSeatCount||0),n=Array.from(e.querySelectorAll("[data-seat-card]")),a=Array.from(e.querySelectorAll("[data-seat-input]")),r=e.querySelector("[data-seat-summary-count]"),o=e.querySelector("[data-seat-summary-list]"),s=e.querySelector("[data-seat-summary-remaining]"),i=e.querySelector("[data-seat-submit]"),c=e.querySelector("[data-seat-feedback]"),d=e.querySelector("[data-seat-feedback-title]"),l=e.querySelector("[data-seat-feedback-text]");function g(){return a.filter(h=>h.checked).map(h=>h.value)}function k(h){return h.length>0?h.join(", "):"Belum dipilih"}function v(h,b,_){!c||!d||!l||(c.dataset.state=h,d.textContent=b,l.textContent=_)}function p(){const h=g(),b=h.length,_=t>0&&b>=t;if(n.forEach(D=>{const M=D.querySelector("[data-seat-input]");if(!M)return;const O=M.disabled&&!M.checked&&D.classList.contains("is-occupied"),A=M.checked,j=O||_&&!A;O||(M.disabled=j),D.classList.toggle("is-selected",A),D.classList.toggle("is-disabled",!O&&j)}),r&&(r.textContent=`${b} dari ${t}`),o&&(o.textContent=k(h)),s&&(s.textContent=String(Math.max(t-b,0))),i&&(i.disabled=b!==t),b===0){v("idle","Pilih kursi sesuai jumlah penumpang","Jumlah kursi yang dipilih harus sama dengan jumlah penumpang pada booking draft.");return}if(b<t){v("idle","Pemilihan kursi belum lengkap",`Masih perlu memilih ${t-b} kursi lagi sebelum dapat melanjutkan.`);return}if(t===6){v("ready","Semua kursi sudah terisi","Jumlah penumpang 6 orang sudah terpenuhi dan kursi tambahan 2B ikut terpakai.");return}v("ready","Kursi sudah sesuai","Jumlah kursi yang dipilih sudah sesuai dengan jumlah penumpang dan siap disimpan.")}a.forEach(h=>{h.addEventListener("change",()=>{p()})}),p()}let je=null,ft=!1,ea="",Ii=3e3,ta=0;const bt=[],x=e=>document.getElementById(e);async function Ua(e){const t=e.trim();if(!t)return;const n=Date.now();if(!(t===ea&&n-ta<Ii)){ea=t,ta=n,Ie("Memproses scan…");try{const a=await E("/scan-qr",{method:"POST",body:{qr_token:t}});$i(a),Ci(a),a.already_scanned?y(a.message,"Tiket Sudah Pernah Di-Scan"):a.is_newly_eligible?N(a.message,"🎉 Eligible Diskon!"):N(a.message,"Scan Berhasil")}catch(a){Si(a.message||"Scan gagal"),y(a.message||"Scan gagal","Scan Gagal")}finally{Ie(ft?"Kamera aktif — arahkan ke QR code.":"")}}}function $i(e){x("qrscan-result-idle").hidden=!0,x("qrscan-result-card").hidden=!1;const t=e.booking||{},n=e.passenger||{},a=e.loyalty_count,r=e.loyalty_target,o=e.discount_eligible,s=Math.min(Math.round(a/r*100),100),i=e.already_scanned?"warn":e.success?"success":"error";x("qrscan-result-header").className="qrscan-result-header qrscan-result-header--"+i,x("qrscan-result-icon").innerHTML=e.already_scanned?Ti():e.success?Li():Fa(),x("qrscan-result-title").textContent=t.booking_code||"-",x("qrscan-result-subtitle").textContent=e.message,x("qr-res-name").textContent=n.name||t.nama_pemesanan||"-",x("qr-res-code").textContent=t.booking_code||"-",x("qr-res-route").textContent=t.route_label||"-",x("qr-res-datetime").textContent=(t.trip_date||"-")+" "+(t.trip_time||""),x("qr-res-seats").textContent=n.seat_no||t.selected_seats||"-",x("qr-res-pax").textContent=(t.passenger_count||0)+" Orang",x("qr-res-loyalty-label").textContent=a+" / "+r,x("qr-res-loyalty-fill").style.width=s+"%",x("qr-res-loyalty-fill").className="qrscan-loyalty-fill"+(o?" qrscan-loyalty-fill--done":""),x("qr-res-loyalty-note").textContent=o?"✅ Eligible diskon "+(e.discount_percentage||50)+"%":"Perlu "+Math.max(r-a,0)+" perjalanan lagi untuk diskon."}function Si(e){x("qrscan-result-idle").hidden=!0,x("qrscan-result-card").hidden=!1,x("qrscan-result-header").className="qrscan-result-header qrscan-result-header--error",x("qrscan-result-icon").innerHTML=Fa(),x("qrscan-result-title").textContent="Scan Gagal",x("qrscan-result-subtitle").textContent=e,["qr-res-name","qr-res-code","qr-res-route","qr-res-datetime","qr-res-seats","qr-res-pax"].forEach(t=>{x(t).textContent="-"}),x("qr-res-loyalty-label").textContent="– / –",x("qr-res-loyalty-fill").style.width="0%",x("qr-res-loyalty-note").textContent=""}function Ci(e){const t=e.booking,n=new Date().toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit",second:"2-digit"}),a=e.passenger||{};bt.unshift({booking:t,passenger:a,time:n,success:e.success,already_scanned:e.already_scanned,message:e.message}),Ha()}function Ha(){const e=x("qrscan-history-list");if(bt.length===0){e.innerHTML='<p class="qrscan-history-empty">Belum ada scan dalam sesi ini.</p>';return}e.innerHTML=bt.map(t=>{const n=t.already_scanned?"warn":t.success?"ok":"err",a=t.passenger&&t.passenger.name?t.passenger.name+(t.passenger.seat_no?" ("+t.passenger.seat_no+")":""):t.booking.nama_pemesanan||"-";return`
        <div class="qrscan-history-item qrscan-history-item--${n}">
            <div class="qrscan-history-dot"></div>
            <div class="qrscan-history-body">
                <strong>${m(t.booking.booking_code||"-")}</strong>
                <span>${m(a)}</span>
            </div>
            <span class="qrscan-history-time">${t.time}</span>
        </div>`}).join("")}function xi(){if(!window.Html5Qrcode){y("Library scanner tidak tersedia. Coba muat ulang halaman.","Error");return}x("qrscan-placeholder").hidden=!0,x("qrscan-frame").hidden=!1,x("qrscan-btn-start").hidden=!0,x("qrscan-btn-stop").hidden=!1,ft=!0,Ie("Menginisialisasi kamera…"),je=new window.Html5Qrcode("qrscan-reader"),je.start({facingMode:"environment"},{fps:10,qrbox:{width:240,height:240}},e=>{let t=e.trim();try{const n=JSON.parse(e);n&&(n.qr_token||n.passenger_qr_token)&&(t=n.qr_token||n.passenger_qr_token)}catch{}Ua(t)},()=>{}).then(()=>{Ie("Kamera aktif — arahkan ke QR code.")}).catch(e=>{ft=!1,x("qrscan-placeholder").hidden=!1,x("qrscan-frame").hidden=!0,x("qrscan-btn-start").hidden=!1,x("qrscan-btn-stop").hidden=!0,Ie("Gagal mengakses kamera. Pastikan izin kamera sudah diberikan."),y(String(e),"Kamera Error")})}function _i(){je&&je.stop().catch(()=>{}).finally(()=>{je=null}),ft=!1,x("qrscan-placeholder").hidden=!1,x("qrscan-frame").hidden=!0,x("qrscan-btn-start").hidden=!1,x("qrscan-btn-stop").hidden=!0,Ie("Kamera dihentikan.")}function Ie(e){x("qrscan-status-text").textContent=e}function Li(){return`<svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
        <path d="M8 12l3 3 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`}function Fa(){return`<svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
        <path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`}function Ti(){return`<svg viewBox="0 0 24 24" fill="none">
        <path d="M12 9v4M12 17h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    </svg>`}function Ai(){x("qrscan-btn-start").addEventListener("click",xi),x("qrscan-btn-stop").addEventListener("click",_i),x("qrscan-clear-history").addEventListener("click",()=>{bt.length=0,Ha()}),x("qrscan-manual-form").addEventListener("submit",e=>{e.preventDefault();const t=x("qrscan-manual-input").value.trim();t&&(Ua(t),x("qrscan-manual-input").value="")})}const L={data:[],loading:!0,totalCount:0,page:1,search:"",chartLimit:10,editItem:null,deleteItem:null,isSubmitting:!1};let Ze=null;const fe=15,Mi=()=>`<svg viewBox="0 0 24 24" fill="none">
    <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
</svg>`,Ri=()=>`<svg viewBox="0 0 24 24" fill="none">
    <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
</svg>`;function Pi(){const e=document.getElementById("plkt-table-body");e&&(e.innerHTML=`
        <tr><td colspan="10" class="plkt-table-state">
            <div class="plkt-loading-inline">
                <span class="plkt-loading-inline-spinner" aria-hidden="true"></span>
                <span>Memuat data...</span>
            </div>
        </td></tr>`)}function Di(){const e=document.getElementById("plkt-table-body");e&&(e.innerHTML='<tr><td colspan="10" class="plkt-table-state plkt-empty-copy">Belum ada data penumpang.</td></tr>')}function na(){const e=document.getElementById("plkt-table-body");if(e){if(L.loading){Pi();return}if(L.data.length===0){Di();return}e.innerHTML=L.data.map((t,n)=>`
        <tr class="plkt-row">
            <td class="plkt-index-cell">${(L.page-1)*fe+n+1}</td>
            <td>
                <div class="plkt-user-cell">
                    <span class="plkt-user-avatar" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/>
                        </svg>
                    </span>
                    <div>
                        <span class="plkt-user-name">${m(t.passenger_name||"-")}</span>
                        <span class="plkt-user-seat">Kursi ${m(t.seat_no||"-")}</span>
                    </div>
                </div>
            </td>
            <td class="plkt-phone-cell">${m(t.phone||"-")}</td>
            <td>${m(t.from_city||"-")}</td>
            <td>${m(t.to_city||"-")}</td>
            <td class="plkt-date-cell">${m(t.trip_date||"-")}</td>
            <td class="plkt-time-cell">${m(t.trip_time||"-")}</td>
            <td class="plkt-tarif-cell">${m(t.tarif||"-")}</td>
            <td class="plkt-count-cell">
                <span class="plkt-count-badge">${t.booking_count}x</span>
            </td>
            <td>
                <div class="plkt-action-row">
                    <button class="plkt-icon-button" type="button"
                        data-plkt-edit="${t.id}"
                        aria-label="Edit penumpang ${m(t.passenger_name||"")}">
                        ${Mi()}
                    </button>
                    <button class="plkt-icon-button plkt-icon-button-danger" type="button"
                        data-plkt-delete="${t.id}"
                        data-plkt-name="${m(t.passenger_name||"")}"
                        aria-label="Hapus penumpang ${m(t.passenger_name||"")}">
                        ${Ri()}
                    </button>
                </div>
            </td>
        </tr>`).join("")}}function aa(){const e=document.getElementById("plkt-pagination-shell"),t=document.getElementById("plkt-pagination-info"),n=document.getElementById("plkt-pagination-page"),a=document.getElementById("plkt-prev-page-btn"),r=document.getElementById("plkt-next-page-btn"),o=Math.max(1,Math.ceil(L.totalCount/fe));e&&(e.hidden=o<=1),t&&(t.textContent=Te(L.page,fe,L.totalCount,L.data.length)),n&&(n.textContent=`${L.page} / ${o}`),a&&(a.disabled=L.page===1),r&&(r.disabled=L.page>=o)}async function we(){L.loading=!0,na(),aa();try{const[e,t]=await Promise.all([E(`/passengers-lkt?page=${L.page}&limit=${fe}${L.search?`&search=${encodeURIComponent(L.search)}`:""}`),E(`/passengers-lkt/count${L.search?`?search=${encodeURIComponent(L.search)}`:""}`)]);L.data=Array.isArray(e)?e:[],L.totalCount=Number(t?.count||0)}catch(e){y(e.message||"Gagal memuat data","Error"),L.data=[],L.totalCount=0}finally{L.loading=!1,na(),aa()}}function Ut(e){const t=document.getElementById("plkt-edit-submit-btn");L.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":"Simpan")}async function Oi(e){try{const t=await E(`/passengers-lkt/${e}`);L.editItem=t;const n=document.getElementById("plkt-edit-name"),a=document.getElementById("plkt-edit-phone"),r=document.getElementById("plkt-edit-id");r&&(r.value=t.id),n&&(n.value=t.name||""),a&&(a.value=t.phone||""),Ut(!1),U("plkt-edit-modal")}catch{y("Gagal memuat data penumpang")}}function ji(e,t){L.deleteItem={id:e,name:t};const n=document.getElementById("plkt-delete-copy");n&&(n.innerHTML=`Apakah Anda yakin ingin menghapus penumpang <strong>${m(t)}</strong>? Tindakan ini tidak dapat dibatalkan.`),U("plkt-delete-modal")}async function Qe(){const e=document.getElementById("plkt-loyalty-chart"),t=document.getElementById("plkt-chart-empty");if(e)try{const n=await E(`/passengers-lkt/loyalty-chart?limit=${L.chartLimit}`);if(!Array.isArray(n)||n.length===0){e.hidden=!0,t&&(t.hidden=!1);return}e.hidden=!1,t&&(t.hidden=!0);const a=n.map(i=>i.passenger_name+(i.phone&&i.phone!=="-"?` (${i.phone})`:"")),r=n.map(i=>i.booking_count),o=Math.max(...r,1),s=r.map(i=>{const c=i/o;return`rgba(${Math.round(26+c*30)}, ${Math.round(35+c*80)}, ${Math.round(126+c*50)}, 0.85)`});Ze&&(Ze.destroy(),Ze=null),Ze=new window.Chart(e,{type:"bar",data:{labels:a,datasets:[{label:"Jumlah Pemesanan",data:r,backgroundColor:s,borderRadius:6,borderSkipped:!1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{title:i=>i[0].label,label:i=>` ${i.raw} kali pemesanan`}}},scales:{x:{ticks:{maxRotation:35,font:{size:11},color:"#374151"},grid:{display:!1}},y:{beginAtZero:!0,ticks:{stepSize:1,color:"#374151",font:{size:11}},grid:{color:"rgba(0,0,0,0.06)"}}}}})}catch{t&&(t.hidden=!1)}}function qi(){if(L.data.length===0){y("Tidak ada data untuk diekspor.");return}const e=["No","Nama Penumpang","No HP","Dari","Tujuan","Tanggal Berangkat","Jam","Tarif","Kali Memesan"],t=L.data.map((s,i)=>[(L.page-1)*fe+i+1,s.passenger_name||"-",s.phone||"-",s.from_city||"-",s.to_city||"-",s.trip_date||"-",s.trip_time||"-",s.tarif||"-",s.booking_count]),n=[e,...t].map(s=>s.map(i=>`"${String(i).replace(/"/g,'""')}"`).join(",")).join(`
`),a=new Blob(["\uFEFF"+n],{type:"text/csv;charset=utf-8;"}),r=URL.createObjectURL(a),o=document.createElement("a");o.href=r,o.download="data-penumpang-lkt.csv",o.click(),URL.revokeObjectURL(r)}function Ni(){const e=document.getElementById("plkt-search-input"),t=document.getElementById("plkt-prev-page-btn"),n=document.getElementById("plkt-next-page-btn"),a=document.getElementById("plkt-export-btn"),r=document.getElementById("plkt-chart-limit"),o=document.getElementById("plkt-table-body"),s=document.getElementById("plkt-edit-form"),i=document.getElementById("plkt-delete-confirm-btn");e?.addEventListener("input",Le(async c=>{L.search=c.target.value.trim(),L.page=1,await we().catch(()=>y("Gagal memuat data"))},400)),t?.addEventListener("click",async()=>{L.page<=1||(L.page-=1,await we().catch(()=>y("Gagal memuat data")))}),n?.addEventListener("click",async()=>{const c=Math.max(1,Math.ceil(L.totalCount/fe));L.page>=c||(L.page+=1,await we().catch(()=>y("Gagal memuat data")))}),a?.addEventListener("click",qi),r?.addEventListener("change",async c=>{L.chartLimit=parseInt(c.target.value,10)||10,await Qe().catch(()=>{})}),o?.addEventListener("click",async c=>{const d=c.target.closest("[data-plkt-edit]"),l=c.target.closest("[data-plkt-delete]");d&&await Oi(d.dataset.plktEdit),l&&ji(l.dataset.plktDelete,l.dataset.plktName)}),s?.addEventListener("submit",async c=>{c.preventDefault();const d=document.getElementById("plkt-edit-id")?.value,l=document.getElementById("plkt-edit-name")?.value.trim(),g=document.getElementById("plkt-edit-phone")?.value.trim();if(!l){y("Nama penumpang tidak boleh kosong");return}Ut(!0);try{await E(`/passengers-lkt/${d}`,{method:"PUT",body:{name:l,phone:g}}),N("Data penumpang berhasil diperbarui"),G("plkt-edit-modal"),await Promise.all([we(),Qe()])}catch(k){y(k.message||"Gagal menyimpan data")}finally{Ut(!1)}}),i?.addEventListener("click",async()=>{if(L.deleteItem)try{await E(`/passengers-lkt/${L.deleteItem.id}`,{method:"DELETE"}),N("Data penumpang berhasil dihapus"),G("plkt-delete-modal"),L.deleteItem=null,(L.page-1)*fe>=L.totalCount-1&&L.page>1&&(L.page-=1),await Promise.all([we(),Qe()])}catch(c){y(c.message||"Gagal menghapus data")}}),we().catch(()=>y("Gagal memuat data")),Qe().catch(()=>{})}const Ui={"admin-users/index":Gs,"auth/login":jo,"bookings/index":vi,"dashboard/index":Xo,"drivers/index":ss,"mobil/index":hs,"keberangkatan/index":Is,"regular-bookings/index":wi,"regular-bookings/seats":Bi,"stock/index":Ls,"qr-scan/index":Ai,"passengers-lkt/index":Ni};document.addEventListener("DOMContentLoaded",async()=>{Ro(),Oo(),rt(La());const e=xo();e&&(e.type==="success"?N(e.message,e.title):e.type==="info"?Po(e.message,e.title):y(e.message,e.title));try{const{user:t}=await Mo();t&&rt(t);const n=document.body.dataset.pageScript,a=Ui[n];typeof a=="function"&&await a({user:t})}catch(t){console.error(t),y(t.message||"Terjadi kesalahan saat memuat halaman")}});
