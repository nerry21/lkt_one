function sa(e,t){return function(){return e.apply(t,arguments)}}const{toString:Ka}=Object.prototype,{getPrototypeOf:Ht}=Object,{iterator:kt,toStringTag:ia}=Symbol,ht=(e=>t=>{const n=Ka.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),ae=e=>(e=e.toLowerCase(),t=>ht(t)===e),yt=e=>t=>typeof t===e,{isArray:Le}=Array,_e=yt("undefined");function He(e){return e!==null&&!_e(e)&&e.constructor!==null&&!_e(e.constructor)&&Q(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const da=ae("ArrayBuffer");function za(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&da(e.buffer),t}const Wa=yt("string"),Q=yt("function"),la=yt("number"),Ve=e=>e!==null&&typeof e=="object",Xa=e=>e===!0||e===!1,Ye=e=>{if(ht(e)!=="object")return!1;const t=Ht(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(ia in e)&&!(kt in e)},Za=e=>{if(!Ve(e)||He(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},Qa=ae("Date"),Ya=ae("File"),er=e=>!!(e&&typeof e.uri<"u"),tr=e=>e&&typeof e.getParts<"u",nr=ae("Blob"),ar=ae("FileList"),rr=e=>Ve(e)&&Q(e.pipe);function or(){return typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}}const dn=or(),ln=typeof dn.FormData<"u"?dn.FormData:void 0,sr=e=>{let t;return e&&(ln&&e instanceof ln||Q(e.append)&&((t=ht(e))==="formdata"||t==="object"&&Q(e.toString)&&e.toString()==="[object FormData]"))},ir=ae("URLSearchParams"),[dr,lr,cr,ur]=["ReadableStream","Request","Response","Headers"].map(ae),mr=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function Ge(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let a,r;if(typeof e!="object"&&(e=[e]),Le(e))for(a=0,r=e.length;a<r;a++)t.call(null,e[a],a,e);else{if(He(e))return;const o=n?Object.getOwnPropertyNames(e):Object.keys(e),s=o.length;let i;for(a=0;a<s;a++)i=o[a],t.call(null,e[i],i,e)}}function ca(e,t){if(He(e))return null;t=t.toLowerCase();const n=Object.keys(e);let a=n.length,r;for(;a-- >0;)if(r=n[a],t===r.toLowerCase())return r;return null}const pe=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,ua=e=>!_e(e)&&e!==pe;function Rt(){const{caseless:e,skipUndefined:t}=ua(this)&&this||{},n={},a=(r,o)=>{if(o==="__proto__"||o==="constructor"||o==="prototype")return;const s=e&&ca(n,o)||o;Ye(n[s])&&Ye(r)?n[s]=Rt(n[s],r):Ye(r)?n[s]=Rt({},r):Le(r)?n[s]=r.slice():(!t||!_e(r))&&(n[s]=r)};for(let r=0,o=arguments.length;r<o;r++)arguments[r]&&Ge(arguments[r],a);return n}const pr=(e,t,n,{allOwnKeys:a}={})=>(Ge(t,(r,o)=>{n&&Q(r)?Object.defineProperty(e,o,{value:sa(r,n),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(e,o,{value:r,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:a}),e),gr=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),fr=(e,t,n,a)=>{e.prototype=Object.create(t.prototype,a),Object.defineProperty(e.prototype,"constructor",{value:e,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},br=(e,t,n,a)=>{let r,o,s;const i={};if(t=t||{},e==null)return t;do{for(r=Object.getOwnPropertyNames(e),o=r.length;o-- >0;)s=r[o],(!a||a(s,e,t))&&!i[s]&&(t[s]=e[s],i[s]=!0);e=n!==!1&&Ht(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},kr=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const a=e.indexOf(t,n);return a!==-1&&a===n},hr=e=>{if(!e)return null;if(Le(e))return e;let t=e.length;if(!la(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},yr=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&Ht(Uint8Array)),vr=(e,t)=>{const a=(e&&e[kt]).call(e);let r;for(;(r=a.next())&&!r.done;){const o=r.value;t.call(e,o[0],o[1])}},Er=(e,t)=>{let n;const a=[];for(;(n=e.exec(t))!==null;)a.push(n);return a},wr=ae("HTMLFormElement"),Br=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,a,r){return a.toUpperCase()+r}),cn=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),Ir=ae("RegExp"),ma=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),a={};Ge(n,(r,o)=>{let s;(s=t(r,o,e))!==!1&&(a[o]=s||r)}),Object.defineProperties(e,a)},Sr=e=>{ma(e,(t,n)=>{if(Q(e)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const a=e[n];if(Q(a)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},$r=(e,t)=>{const n={},a=r=>{r.forEach(o=>{n[o]=!0})};return Le(e)?a(e):a(String(e).split(t)),n},_r=()=>{},Cr=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function xr(e){return!!(e&&Q(e.append)&&e[ia]==="FormData"&&e[kt])}const Lr=e=>{const t=new Array(10),n=(a,r)=>{if(Ve(a)){if(t.indexOf(a)>=0)return;if(He(a))return a;if(!("toJSON"in a)){t[r]=a;const o=Le(a)?[]:{};return Ge(a,(s,i)=>{const c=n(s,r+1);!_e(c)&&(o[i]=c)}),t[r]=void 0,o}}return a};return n(e,0)},Tr=ae("AsyncFunction"),Ar=e=>e&&(Ve(e)||Q(e))&&Q(e.then)&&Q(e.catch),pa=((e,t)=>e?setImmediate:t?((n,a)=>(pe.addEventListener("message",({source:r,data:o})=>{r===pe&&o===n&&a.length&&a.shift()()},!1),r=>{a.push(r),pe.postMessage(n,"*")}))(`axios@${Math.random()}`,[]):n=>setTimeout(n))(typeof setImmediate=="function",Q(pe.postMessage)),Mr=typeof queueMicrotask<"u"?queueMicrotask.bind(pe):typeof process<"u"&&process.nextTick||pa,Rr=e=>e!=null&&Q(e[kt]),u={isArray:Le,isArrayBuffer:da,isBuffer:He,isFormData:sr,isArrayBufferView:za,isString:Wa,isNumber:la,isBoolean:Xa,isObject:Ve,isPlainObject:Ye,isEmptyObject:Za,isReadableStream:dr,isRequest:lr,isResponse:cr,isHeaders:ur,isUndefined:_e,isDate:Qa,isFile:Ya,isReactNativeBlob:er,isReactNative:tr,isBlob:nr,isRegExp:Ir,isFunction:Q,isStream:rr,isURLSearchParams:ir,isTypedArray:yr,isFileList:ar,forEach:Ge,merge:Rt,extend:pr,trim:mr,stripBOM:gr,inherits:fr,toFlatObject:br,kindOf:ht,kindOfTest:ae,endsWith:kr,toArray:hr,forEachEntry:vr,matchAll:Er,isHTMLForm:wr,hasOwnProperty:cn,hasOwnProp:cn,reduceDescriptors:ma,freezeMethods:Sr,toObjectSet:$r,toCamelCase:Br,noop:_r,toFiniteNumber:Cr,findKey:ca,global:pe,isContextDefined:ua,isSpecCompliantForm:xr,toJSONObject:Lr,isAsyncFn:Tr,isThenable:Ar,setImmediate:pa,asap:Mr,isIterable:Rr};let I=class ga extends Error{static from(t,n,a,r,o,s){const i=new ga(t.message,n||t.code,a,r,o);return i.cause=t,i.name=t.name,t.status!=null&&i.status==null&&(i.status=t.status),s&&Object.assign(i,s),i}constructor(t,n,a,r,o){super(t),Object.defineProperty(this,"message",{value:t,enumerable:!0,writable:!0,configurable:!0}),this.name="AxiosError",this.isAxiosError=!0,n&&(this.code=n),a&&(this.config=a),r&&(this.request=r),o&&(this.response=o,this.status=o.status)}toJSON(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:u.toJSONObject(this.config),code:this.code,status:this.status}}};I.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";I.ERR_BAD_OPTION="ERR_BAD_OPTION";I.ECONNABORTED="ECONNABORTED";I.ETIMEDOUT="ETIMEDOUT";I.ERR_NETWORK="ERR_NETWORK";I.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";I.ERR_DEPRECATED="ERR_DEPRECATED";I.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";I.ERR_BAD_REQUEST="ERR_BAD_REQUEST";I.ERR_CANCELED="ERR_CANCELED";I.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";I.ERR_INVALID_URL="ERR_INVALID_URL";const Pr=null;function Pt(e){return u.isPlainObject(e)||u.isArray(e)}function fa(e){return u.endsWith(e,"[]")?e.slice(0,-2):e}function $t(e,t,n){return e?e.concat(t).map(function(r,o){return r=fa(r),!n&&o?"["+r+"]":r}).join(n?".":""):t}function Dr(e){return u.isArray(e)&&!e.some(Pt)}const Or=u.toFlatObject(u,{},null,function(t){return/^is[A-Z]/.test(t)});function vt(e,t,n){if(!u.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=u.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(b,g){return!u.isUndefined(g[b])});const a=n.metaTokens,r=n.visitor||l,o=n.dots,s=n.indexes,c=(n.Blob||typeof Blob<"u"&&Blob)&&u.isSpecCompliantForm(t);if(!u.isFunction(r))throw new TypeError("visitor must be a function");function d(m){if(m===null)return"";if(u.isDate(m))return m.toISOString();if(u.isBoolean(m))return m.toString();if(!c&&u.isBlob(m))throw new I("Blob is not supported. Use a Buffer instead.");return u.isArrayBuffer(m)||u.isTypedArray(m)?c&&typeof Blob=="function"?new Blob([m]):Buffer.from(m):m}function l(m,b,g){let E=m;if(u.isReactNative(t)&&u.isReactNativeBlob(m))return t.append($t(g,b,o),d(m)),!1;if(m&&!g&&typeof m=="object"){if(u.endsWith(b,"{}"))b=a?b:b.slice(0,-2),m=JSON.stringify(m);else if(u.isArray(m)&&Dr(m)||(u.isFileList(m)||u.endsWith(b,"[]"))&&(E=u.toArray(m)))return b=fa(b),E.forEach(function(L,R){!(u.isUndefined(L)||L===null)&&t.append(s===!0?$t([b],R,o):s===null?b:b+"[]",d(L))}),!1}return Pt(m)?!0:(t.append($t(g,b,o),d(m)),!1)}const k=[],y=Object.assign(Or,{defaultVisitor:l,convertValue:d,isVisitable:Pt});function A(m,b){if(!u.isUndefined(m)){if(k.indexOf(m)!==-1)throw Error("Circular reference detected in "+b.join("."));k.push(m),u.forEach(m,function(E,P){(!(u.isUndefined(E)||E===null)&&r.call(t,E,u.isString(P)?P.trim():P,b,y))===!0&&A(E,b?b.concat(P):[P])}),k.pop()}}if(!u.isObject(e))throw new TypeError("data must be an object");return A(e),t}function un(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(a){return t[a]})}function Vt(e,t){this._pairs=[],e&&vt(e,this,t)}const ba=Vt.prototype;ba.append=function(t,n){this._pairs.push([t,n])};ba.toString=function(t){const n=t?function(a){return t.call(this,a,un)}:un;return this._pairs.map(function(r){return n(r[0])+"="+n(r[1])},"").join("&")};function jr(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function ka(e,t,n){if(!t)return e;const a=n&&n.encode||jr,r=u.isFunction(n)?{serialize:n}:n,o=r&&r.serialize;let s;if(o?s=o(t,r):s=u.isURLSearchParams(t)?t.toString():new Vt(t,r).toString(a),s){const i=e.indexOf("#");i!==-1&&(e=e.slice(0,i)),e+=(e.indexOf("?")===-1?"?":"&")+s}return e}class mn{constructor(){this.handlers=[]}use(t,n,a){return this.handlers.push({fulfilled:t,rejected:n,synchronous:a?a.synchronous:!1,runWhen:a?a.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){u.forEach(this.handlers,function(a){a!==null&&t(a)})}}const Gt={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0},qr=typeof URLSearchParams<"u"?URLSearchParams:Vt,Nr=typeof FormData<"u"?FormData:null,Ur=typeof Blob<"u"?Blob:null,Fr={isBrowser:!0,classes:{URLSearchParams:qr,FormData:Nr,Blob:Ur},protocols:["http","https","file","blob","url","data"]},Jt=typeof window<"u"&&typeof document<"u",Dt=typeof navigator=="object"&&navigator||void 0,Hr=Jt&&(!Dt||["ReactNative","NativeScript","NS"].indexOf(Dt.product)<0),Vr=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",Gr=Jt&&window.location.href||"http://localhost",Jr=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:Jt,hasStandardBrowserEnv:Hr,hasStandardBrowserWebWorkerEnv:Vr,navigator:Dt,origin:Gr},Symbol.toStringTag,{value:"Module"})),Z={...Jr,...Fr};function Kr(e,t){return vt(e,new Z.classes.URLSearchParams,{visitor:function(n,a,r,o){return Z.isNode&&u.isBuffer(n)?(this.append(a,n.toString("base64")),!1):o.defaultVisitor.apply(this,arguments)},...t})}function zr(e){return u.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function Wr(e){const t={},n=Object.keys(e);let a;const r=n.length;let o;for(a=0;a<r;a++)o=n[a],t[o]=e[o];return t}function ha(e){function t(n,a,r,o){let s=n[o++];if(s==="__proto__")return!0;const i=Number.isFinite(+s),c=o>=n.length;return s=!s&&u.isArray(r)?r.length:s,c?(u.hasOwnProp(r,s)?r[s]=[r[s],a]:r[s]=a,!i):((!r[s]||!u.isObject(r[s]))&&(r[s]=[]),t(n,a,r[s],o)&&u.isArray(r[s])&&(r[s]=Wr(r[s])),!i)}if(u.isFormData(e)&&u.isFunction(e.entries)){const n={};return u.forEachEntry(e,(a,r)=>{t(zr(a),r,n,0)}),n}return null}function Xr(e,t,n){if(u.isString(e))try{return(t||JSON.parse)(e),u.trim(e)}catch(a){if(a.name!=="SyntaxError")throw a}return(n||JSON.stringify)(e)}const Je={transitional:Gt,adapter:["xhr","http","fetch"],transformRequest:[function(t,n){const a=n.getContentType()||"",r=a.indexOf("application/json")>-1,o=u.isObject(t);if(o&&u.isHTMLForm(t)&&(t=new FormData(t)),u.isFormData(t))return r?JSON.stringify(ha(t)):t;if(u.isArrayBuffer(t)||u.isBuffer(t)||u.isStream(t)||u.isFile(t)||u.isBlob(t)||u.isReadableStream(t))return t;if(u.isArrayBufferView(t))return t.buffer;if(u.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let i;if(o){if(a.indexOf("application/x-www-form-urlencoded")>-1)return Kr(t,this.formSerializer).toString();if((i=u.isFileList(t))||a.indexOf("multipart/form-data")>-1){const c=this.env&&this.env.FormData;return vt(i?{"files[]":t}:t,c&&new c,this.formSerializer)}}return o||r?(n.setContentType("application/json",!1),Xr(t)):t}],transformResponse:[function(t){const n=this.transitional||Je.transitional,a=n&&n.forcedJSONParsing,r=this.responseType==="json";if(u.isResponse(t)||u.isReadableStream(t))return t;if(t&&u.isString(t)&&(a&&!this.responseType||r)){const s=!(n&&n.silentJSONParsing)&&r;try{return JSON.parse(t,this.parseReviver)}catch(i){if(s)throw i.name==="SyntaxError"?I.from(i,I.ERR_BAD_RESPONSE,this,null,this.response):i}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:Z.classes.FormData,Blob:Z.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};u.forEach(["delete","get","head","post","put","patch"],e=>{Je.headers[e]={}});const Zr=u.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),Qr=e=>{const t={};let n,a,r;return e&&e.split(`
`).forEach(function(s){r=s.indexOf(":"),n=s.substring(0,r).trim().toLowerCase(),a=s.substring(r+1).trim(),!(!n||t[n]&&Zr[n])&&(n==="set-cookie"?t[n]?t[n].push(a):t[n]=[a]:t[n]=t[n]?t[n]+", "+a:a)}),t},pn=Symbol("internals");function Re(e){return e&&String(e).trim().toLowerCase()}function et(e){return e===!1||e==null?e:u.isArray(e)?e.map(et):String(e)}function Yr(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let a;for(;a=n.exec(e);)t[a[1]]=a[2];return t}const eo=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function _t(e,t,n,a,r){if(u.isFunction(a))return a.call(this,t,n);if(r&&(t=n),!!u.isString(t)){if(u.isString(a))return t.indexOf(a)!==-1;if(u.isRegExp(a))return a.test(t)}}function to(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,a)=>n.toUpperCase()+a)}function no(e,t){const n=u.toCamelCase(" "+t);["get","set","has"].forEach(a=>{Object.defineProperty(e,a+n,{value:function(r,o,s){return this[a].call(this,t,r,o,s)},configurable:!0})})}let Y=class{constructor(t){t&&this.set(t)}set(t,n,a){const r=this;function o(i,c,d){const l=Re(c);if(!l)throw new Error("header name must be a non-empty string");const k=u.findKey(r,l);(!k||r[k]===void 0||d===!0||d===void 0&&r[k]!==!1)&&(r[k||c]=et(i))}const s=(i,c)=>u.forEach(i,(d,l)=>o(d,l,c));if(u.isPlainObject(t)||t instanceof this.constructor)s(t,n);else if(u.isString(t)&&(t=t.trim())&&!eo(t))s(Qr(t),n);else if(u.isObject(t)&&u.isIterable(t)){let i={},c,d;for(const l of t){if(!u.isArray(l))throw TypeError("Object iterator must return a key-value pair");i[d=l[0]]=(c=i[d])?u.isArray(c)?[...c,l[1]]:[c,l[1]]:l[1]}s(i,n)}else t!=null&&o(n,t,a);return this}get(t,n){if(t=Re(t),t){const a=u.findKey(this,t);if(a){const r=this[a];if(!n)return r;if(n===!0)return Yr(r);if(u.isFunction(n))return n.call(this,r,a);if(u.isRegExp(n))return n.exec(r);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=Re(t),t){const a=u.findKey(this,t);return!!(a&&this[a]!==void 0&&(!n||_t(this,this[a],a,n)))}return!1}delete(t,n){const a=this;let r=!1;function o(s){if(s=Re(s),s){const i=u.findKey(a,s);i&&(!n||_t(a,a[i],i,n))&&(delete a[i],r=!0)}}return u.isArray(t)?t.forEach(o):o(t),r}clear(t){const n=Object.keys(this);let a=n.length,r=!1;for(;a--;){const o=n[a];(!t||_t(this,this[o],o,t,!0))&&(delete this[o],r=!0)}return r}normalize(t){const n=this,a={};return u.forEach(this,(r,o)=>{const s=u.findKey(a,o);if(s){n[s]=et(r),delete n[o];return}const i=t?to(o):String(o).trim();i!==o&&delete n[o],n[i]=et(r),a[i]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return u.forEach(this,(a,r)=>{a!=null&&a!==!1&&(n[r]=t&&u.isArray(a)?a.join(", "):a)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const a=new this(t);return n.forEach(r=>a.set(r)),a}static accessor(t){const a=(this[pn]=this[pn]={accessors:{}}).accessors,r=this.prototype;function o(s){const i=Re(s);a[i]||(no(r,s),a[i]=!0)}return u.isArray(t)?t.forEach(o):o(t),this}};Y.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);u.reduceDescriptors(Y.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(a){this[n]=a}}});u.freezeMethods(Y);function Ct(e,t){const n=this||Je,a=t||n,r=Y.from(a.headers);let o=a.data;return u.forEach(e,function(i){o=i.call(n,o,r.normalize(),t?t.status:void 0)}),r.normalize(),o}function ya(e){return!!(e&&e.__CANCEL__)}let Ke=class extends I{constructor(t,n,a){super(t??"canceled",I.ERR_CANCELED,n,a),this.name="CanceledError",this.__CANCEL__=!0}};function va(e,t,n){const a=n.config.validateStatus;!n.status||!a||a(n.status)?e(n):t(new I("Request failed with status code "+n.status,[I.ERR_BAD_REQUEST,I.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}function ao(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function ro(e,t){e=e||10;const n=new Array(e),a=new Array(e);let r=0,o=0,s;return t=t!==void 0?t:1e3,function(c){const d=Date.now(),l=a[o];s||(s=d),n[r]=c,a[r]=d;let k=o,y=0;for(;k!==r;)y+=n[k++],k=k%e;if(r=(r+1)%e,r===o&&(o=(o+1)%e),d-s<t)return;const A=l&&d-l;return A?Math.round(y*1e3/A):void 0}}function oo(e,t){let n=0,a=1e3/t,r,o;const s=(d,l=Date.now())=>{n=l,r=null,o&&(clearTimeout(o),o=null),e(...d)};return[(...d)=>{const l=Date.now(),k=l-n;k>=a?s(d,l):(r=d,o||(o=setTimeout(()=>{o=null,s(r)},a-k)))},()=>r&&s(r)]}const at=(e,t,n=3)=>{let a=0;const r=ro(50,250);return oo(o=>{const s=o.loaded,i=o.lengthComputable?o.total:void 0,c=s-a,d=r(c),l=s<=i;a=s;const k={loaded:s,total:i,progress:i?s/i:void 0,bytes:c,rate:d||void 0,estimated:d&&i&&l?(i-s)/d:void 0,event:o,lengthComputable:i!=null,[t?"download":"upload"]:!0};e(k)},n)},gn=(e,t)=>{const n=e!=null;return[a=>t[0]({lengthComputable:n,total:e,loaded:a}),t[1]]},fn=e=>(...t)=>u.asap(()=>e(...t)),so=Z.hasStandardBrowserEnv?((e,t)=>n=>(n=new URL(n,Z.origin),e.protocol===n.protocol&&e.host===n.host&&(t||e.port===n.port)))(new URL(Z.origin),Z.navigator&&/(msie|trident)/i.test(Z.navigator.userAgent)):()=>!0,io=Z.hasStandardBrowserEnv?{write(e,t,n,a,r,o,s){if(typeof document>"u")return;const i=[`${e}=${encodeURIComponent(t)}`];u.isNumber(n)&&i.push(`expires=${new Date(n).toUTCString()}`),u.isString(a)&&i.push(`path=${a}`),u.isString(r)&&i.push(`domain=${r}`),o===!0&&i.push("secure"),u.isString(s)&&i.push(`SameSite=${s}`),document.cookie=i.join("; ")},read(e){if(typeof document>"u")return null;const t=document.cookie.match(new RegExp("(?:^|; )"+e+"=([^;]*)"));return t?decodeURIComponent(t[1]):null},remove(e){this.write(e,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function lo(e){return typeof e!="string"?!1:/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function co(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function Ea(e,t,n){let a=!lo(t);return e&&(a||n==!1)?co(e,t):t}const bn=e=>e instanceof Y?{...e}:e;function fe(e,t){t=t||{};const n={};function a(d,l,k,y){return u.isPlainObject(d)&&u.isPlainObject(l)?u.merge.call({caseless:y},d,l):u.isPlainObject(l)?u.merge({},l):u.isArray(l)?l.slice():l}function r(d,l,k,y){if(u.isUndefined(l)){if(!u.isUndefined(d))return a(void 0,d,k,y)}else return a(d,l,k,y)}function o(d,l){if(!u.isUndefined(l))return a(void 0,l)}function s(d,l){if(u.isUndefined(l)){if(!u.isUndefined(d))return a(void 0,d)}else return a(void 0,l)}function i(d,l,k){if(k in t)return a(d,l);if(k in e)return a(void 0,d)}const c={url:o,method:o,data:o,baseURL:s,transformRequest:s,transformResponse:s,paramsSerializer:s,timeout:s,timeoutMessage:s,withCredentials:s,withXSRFToken:s,adapter:s,responseType:s,xsrfCookieName:s,xsrfHeaderName:s,onUploadProgress:s,onDownloadProgress:s,decompress:s,maxContentLength:s,maxBodyLength:s,beforeRedirect:s,transport:s,httpAgent:s,httpsAgent:s,cancelToken:s,socketPath:s,responseEncoding:s,validateStatus:i,headers:(d,l,k)=>r(bn(d),bn(l),k,!0)};return u.forEach(Object.keys({...e,...t}),function(l){if(l==="__proto__"||l==="constructor"||l==="prototype")return;const k=u.hasOwnProp(c,l)?c[l]:r,y=k(e[l],t[l],l);u.isUndefined(y)&&k!==i||(n[l]=y)}),n}const wa=e=>{const t=fe({},e);let{data:n,withXSRFToken:a,xsrfHeaderName:r,xsrfCookieName:o,headers:s,auth:i}=t;if(t.headers=s=Y.from(s),t.url=ka(Ea(t.baseURL,t.url,t.allowAbsoluteUrls),e.params,e.paramsSerializer),i&&s.set("Authorization","Basic "+btoa((i.username||"")+":"+(i.password?unescape(encodeURIComponent(i.password)):""))),u.isFormData(n)){if(Z.hasStandardBrowserEnv||Z.hasStandardBrowserWebWorkerEnv)s.setContentType(void 0);else if(u.isFunction(n.getHeaders)){const c=n.getHeaders(),d=["content-type","content-length"];Object.entries(c).forEach(([l,k])=>{d.includes(l.toLowerCase())&&s.set(l,k)})}}if(Z.hasStandardBrowserEnv&&(a&&u.isFunction(a)&&(a=a(t)),a||a!==!1&&so(t.url))){const c=r&&o&&io.read(o);c&&s.set(r,c)}return t},uo=typeof XMLHttpRequest<"u",mo=uo&&function(e){return new Promise(function(n,a){const r=wa(e);let o=r.data;const s=Y.from(r.headers).normalize();let{responseType:i,onUploadProgress:c,onDownloadProgress:d}=r,l,k,y,A,m;function b(){A&&A(),m&&m(),r.cancelToken&&r.cancelToken.unsubscribe(l),r.signal&&r.signal.removeEventListener("abort",l)}let g=new XMLHttpRequest;g.open(r.method.toUpperCase(),r.url,!0),g.timeout=r.timeout;function E(){if(!g)return;const L=Y.from("getAllResponseHeaders"in g&&g.getAllResponseHeaders()),D={data:!i||i==="text"||i==="json"?g.responseText:g.response,status:g.status,statusText:g.statusText,headers:L,config:e,request:g};va(function(M){n(M),b()},function(M){a(M),b()},D),g=null}"onloadend"in g?g.onloadend=E:g.onreadystatechange=function(){!g||g.readyState!==4||g.status===0&&!(g.responseURL&&g.responseURL.indexOf("file:")===0)||setTimeout(E)},g.onabort=function(){g&&(a(new I("Request aborted",I.ECONNABORTED,e,g)),g=null)},g.onerror=function(R){const D=R&&R.message?R.message:"Network Error",V=new I(D,I.ERR_NETWORK,e,g);V.event=R||null,a(V),g=null},g.ontimeout=function(){let R=r.timeout?"timeout of "+r.timeout+"ms exceeded":"timeout exceeded";const D=r.transitional||Gt;r.timeoutErrorMessage&&(R=r.timeoutErrorMessage),a(new I(R,D.clarifyTimeoutError?I.ETIMEDOUT:I.ECONNABORTED,e,g)),g=null},o===void 0&&s.setContentType(null),"setRequestHeader"in g&&u.forEach(s.toJSON(),function(R,D){g.setRequestHeader(D,R)}),u.isUndefined(r.withCredentials)||(g.withCredentials=!!r.withCredentials),i&&i!=="json"&&(g.responseType=r.responseType),d&&([y,m]=at(d,!0),g.addEventListener("progress",y)),c&&g.upload&&([k,A]=at(c),g.upload.addEventListener("progress",k),g.upload.addEventListener("loadend",A)),(r.cancelToken||r.signal)&&(l=L=>{g&&(a(!L||L.type?new Ke(null,e,g):L),g.abort(),g=null)},r.cancelToken&&r.cancelToken.subscribe(l),r.signal&&(r.signal.aborted?l():r.signal.addEventListener("abort",l)));const P=ao(r.url);if(P&&Z.protocols.indexOf(P)===-1){a(new I("Unsupported protocol "+P+":",I.ERR_BAD_REQUEST,e));return}g.send(o||null)})},po=(e,t)=>{const{length:n}=e=e?e.filter(Boolean):[];if(t||n){let a=new AbortController,r;const o=function(d){if(!r){r=!0,i();const l=d instanceof Error?d:this.reason;a.abort(l instanceof I?l:new Ke(l instanceof Error?l.message:l))}};let s=t&&setTimeout(()=>{s=null,o(new I(`timeout of ${t}ms exceeded`,I.ETIMEDOUT))},t);const i=()=>{e&&(s&&clearTimeout(s),s=null,e.forEach(d=>{d.unsubscribe?d.unsubscribe(o):d.removeEventListener("abort",o)}),e=null)};e.forEach(d=>d.addEventListener("abort",o));const{signal:c}=a;return c.unsubscribe=()=>u.asap(i),c}},go=function*(e,t){let n=e.byteLength;if(n<t){yield e;return}let a=0,r;for(;a<n;)r=a+t,yield e.slice(a,r),a=r},fo=async function*(e,t){for await(const n of bo(e))yield*go(n,t)},bo=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:n,value:a}=await t.read();if(n)break;yield a}}finally{await t.cancel()}},kn=(e,t,n,a)=>{const r=fo(e,t);let o=0,s,i=c=>{s||(s=!0,a&&a(c))};return new ReadableStream({async pull(c){try{const{done:d,value:l}=await r.next();if(d){i(),c.close();return}let k=l.byteLength;if(n){let y=o+=k;n(y)}c.enqueue(new Uint8Array(l))}catch(d){throw i(d),d}},cancel(c){return i(c),r.return()}},{highWaterMark:2})},hn=64*1024,{isFunction:Xe}=u,ko=(({Request:e,Response:t})=>({Request:e,Response:t}))(u.global),{ReadableStream:yn,TextEncoder:vn}=u.global,En=(e,...t)=>{try{return!!e(...t)}catch{return!1}},ho=e=>{e=u.merge.call({skipUndefined:!0},ko,e);const{fetch:t,Request:n,Response:a}=e,r=t?Xe(t):typeof fetch=="function",o=Xe(n),s=Xe(a);if(!r)return!1;const i=r&&Xe(yn),c=r&&(typeof vn=="function"?(m=>b=>m.encode(b))(new vn):async m=>new Uint8Array(await new n(m).arrayBuffer())),d=o&&i&&En(()=>{let m=!1;const b=new n(Z.origin,{body:new yn,method:"POST",get duplex(){return m=!0,"half"}}).headers.has("Content-Type");return m&&!b}),l=s&&i&&En(()=>u.isReadableStream(new a("").body)),k={stream:l&&(m=>m.body)};r&&["text","arrayBuffer","blob","formData","stream"].forEach(m=>{!k[m]&&(k[m]=(b,g)=>{let E=b&&b[m];if(E)return E.call(b);throw new I(`Response type '${m}' is not supported`,I.ERR_NOT_SUPPORT,g)})});const y=async m=>{if(m==null)return 0;if(u.isBlob(m))return m.size;if(u.isSpecCompliantForm(m))return(await new n(Z.origin,{method:"POST",body:m}).arrayBuffer()).byteLength;if(u.isArrayBufferView(m)||u.isArrayBuffer(m))return m.byteLength;if(u.isURLSearchParams(m)&&(m=m+""),u.isString(m))return(await c(m)).byteLength},A=async(m,b)=>{const g=u.toFiniteNumber(m.getContentLength());return g??y(b)};return async m=>{let{url:b,method:g,data:E,signal:P,cancelToken:L,timeout:R,onDownloadProgress:D,onUploadProgress:V,responseType:M,headers:F,withCredentials:G="same-origin",fetchOptions:z}=wa(m),W=t||fetch;M=M?(M+"").toLowerCase():"text";let $=po([P,L&&L.toAbortSignal()],R),q=null;const H=$&&$.unsubscribe&&(()=>{$.unsubscribe()});let re;try{if(V&&d&&g!=="get"&&g!=="head"&&(re=await A(F,E))!==0){let ie=new n(b,{method:"POST",body:E,duplex:"half"}),ke;if(u.isFormData(E)&&(ke=ie.headers.get("content-type"))&&F.setContentType(ke),ie.body){const[St,We]=gn(re,at(fn(V)));E=kn(ie.body,hn,St,We)}}u.isString(G)||(G=G?"include":"omit");const X=o&&"credentials"in n.prototype,ne={...z,signal:$,method:g.toUpperCase(),headers:F.normalize().toJSON(),body:E,duplex:"half",credentials:X?G:void 0};q=o&&new n(b,ne);let ee=await(o?W(q,z):W(b,ne));const ue=l&&(M==="stream"||M==="response");if(l&&(D||ue&&H)){const ie={};["status","statusText","headers"].forEach(sn=>{ie[sn]=ee[sn]});const ke=u.toFiniteNumber(ee.headers.get("content-length")),[St,We]=D&&gn(ke,at(fn(D),!0))||[];ee=new a(kn(ee.body,hn,St,()=>{We&&We(),H&&H()}),ie)}M=M||"text";let It=await k[u.findKey(k,M)||"text"](ee,m);return!ue&&H&&H(),await new Promise((ie,ke)=>{va(ie,ke,{data:It,headers:Y.from(ee.headers),status:ee.status,statusText:ee.statusText,config:m,request:q})})}catch(X){throw H&&H(),X&&X.name==="TypeError"&&/Load failed|fetch/i.test(X.message)?Object.assign(new I("Network Error",I.ERR_NETWORK,m,q,X&&X.response),{cause:X.cause||X}):I.from(X,X&&X.code,m,q,X&&X.response)}}},yo=new Map,Ba=e=>{let t=e&&e.env||{};const{fetch:n,Request:a,Response:r}=t,o=[a,r,n];let s=o.length,i=s,c,d,l=yo;for(;i--;)c=o[i],d=l.get(c),d===void 0&&l.set(c,d=i?new Map:ho(t)),l=d;return d};Ba();const Kt={http:Pr,xhr:mo,fetch:{get:Ba}};u.forEach(Kt,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const wn=e=>`- ${e}`,vo=e=>u.isFunction(e)||e===null||e===!1;function Eo(e,t){e=u.isArray(e)?e:[e];const{length:n}=e;let a,r;const o={};for(let s=0;s<n;s++){a=e[s];let i;if(r=a,!vo(a)&&(r=Kt[(i=String(a)).toLowerCase()],r===void 0))throw new I(`Unknown adapter '${i}'`);if(r&&(u.isFunction(r)||(r=r.get(t))))break;o[i||"#"+s]=r}if(!r){const s=Object.entries(o).map(([c,d])=>`adapter ${c} `+(d===!1?"is not supported by the environment":"is not available in the build"));let i=n?s.length>1?`since :
`+s.map(wn).join(`
`):" "+wn(s[0]):"as no adapter specified";throw new I("There is no suitable adapter to dispatch the request "+i,"ERR_NOT_SUPPORT")}return r}const Ia={getAdapter:Eo,adapters:Kt};function xt(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new Ke(null,e)}function Bn(e){return xt(e),e.headers=Y.from(e.headers),e.data=Ct.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),Ia.getAdapter(e.adapter||Je.adapter,e)(e).then(function(a){return xt(e),a.data=Ct.call(e,e.transformResponse,a),a.headers=Y.from(a.headers),a},function(a){return ya(a)||(xt(e),a&&a.response&&(a.response.data=Ct.call(e,e.transformResponse,a.response),a.response.headers=Y.from(a.response.headers))),Promise.reject(a)})}const Sa="1.13.6",Et={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{Et[e]=function(a){return typeof a===e||"a"+(t<1?"n ":" ")+e}});const In={};Et.transitional=function(t,n,a){function r(o,s){return"[Axios v"+Sa+"] Transitional option '"+o+"'"+s+(a?". "+a:"")}return(o,s,i)=>{if(t===!1)throw new I(r(s," has been removed"+(n?" in "+n:"")),I.ERR_DEPRECATED);return n&&!In[s]&&(In[s]=!0,console.warn(r(s," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(o,s,i):!0}};Et.spelling=function(t){return(n,a)=>(console.warn(`${a} is likely a misspelling of ${t}`),!0)};function wo(e,t,n){if(typeof e!="object")throw new I("options must be an object",I.ERR_BAD_OPTION_VALUE);const a=Object.keys(e);let r=a.length;for(;r-- >0;){const o=a[r],s=t[o];if(s){const i=e[o],c=i===void 0||s(i,o,e);if(c!==!0)throw new I("option "+o+" must be "+c,I.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new I("Unknown option "+o,I.ERR_BAD_OPTION)}}const tt={assertOptions:wo,validators:Et},te=tt.validators;let ge=class{constructor(t){this.defaults=t||{},this.interceptors={request:new mn,response:new mn}}async request(t,n){try{return await this._request(t,n)}catch(a){if(a instanceof Error){let r={};Error.captureStackTrace?Error.captureStackTrace(r):r=new Error;const o=r.stack?r.stack.replace(/^.+\n/,""):"";try{a.stack?o&&!String(a.stack).endsWith(o.replace(/^.+\n.+\n/,""))&&(a.stack+=`
`+o):a.stack=o}catch{}}throw a}}_request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=fe(this.defaults,n);const{transitional:a,paramsSerializer:r,headers:o}=n;a!==void 0&&tt.assertOptions(a,{silentJSONParsing:te.transitional(te.boolean),forcedJSONParsing:te.transitional(te.boolean),clarifyTimeoutError:te.transitional(te.boolean),legacyInterceptorReqResOrdering:te.transitional(te.boolean)},!1),r!=null&&(u.isFunction(r)?n.paramsSerializer={serialize:r}:tt.assertOptions(r,{encode:te.function,serialize:te.function},!0)),n.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?n.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:n.allowAbsoluteUrls=!0),tt.assertOptions(n,{baseUrl:te.spelling("baseURL"),withXsrfToken:te.spelling("withXSRFToken")},!0),n.method=(n.method||this.defaults.method||"get").toLowerCase();let s=o&&u.merge(o.common,o[n.method]);o&&u.forEach(["delete","get","head","post","put","patch","common"],m=>{delete o[m]}),n.headers=Y.concat(s,o);const i=[];let c=!0;this.interceptors.request.forEach(function(b){if(typeof b.runWhen=="function"&&b.runWhen(n)===!1)return;c=c&&b.synchronous;const g=n.transitional||Gt;g&&g.legacyInterceptorReqResOrdering?i.unshift(b.fulfilled,b.rejected):i.push(b.fulfilled,b.rejected)});const d=[];this.interceptors.response.forEach(function(b){d.push(b.fulfilled,b.rejected)});let l,k=0,y;if(!c){const m=[Bn.bind(this),void 0];for(m.unshift(...i),m.push(...d),y=m.length,l=Promise.resolve(n);k<y;)l=l.then(m[k++],m[k++]);return l}y=i.length;let A=n;for(;k<y;){const m=i[k++],b=i[k++];try{A=m(A)}catch(g){b.call(this,g);break}}try{l=Bn.call(this,A)}catch(m){return Promise.reject(m)}for(k=0,y=d.length;k<y;)l=l.then(d[k++],d[k++]);return l}getUri(t){t=fe(this.defaults,t);const n=Ea(t.baseURL,t.url,t.allowAbsoluteUrls);return ka(n,t.params,t.paramsSerializer)}};u.forEach(["delete","get","head","options"],function(t){ge.prototype[t]=function(n,a){return this.request(fe(a||{},{method:t,url:n,data:(a||{}).data}))}});u.forEach(["post","put","patch"],function(t){function n(a){return function(o,s,i){return this.request(fe(i||{},{method:t,headers:a?{"Content-Type":"multipart/form-data"}:{},url:o,data:s}))}}ge.prototype[t]=n(),ge.prototype[t+"Form"]=n(!0)});let Bo=class $a{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(o){n=o});const a=this;this.promise.then(r=>{if(!a._listeners)return;let o=a._listeners.length;for(;o-- >0;)a._listeners[o](r);a._listeners=null}),this.promise.then=r=>{let o;const s=new Promise(i=>{a.subscribe(i),o=i}).then(r);return s.cancel=function(){a.unsubscribe(o)},s},t(function(o,s,i){a.reason||(a.reason=new Ke(o,s,i),n(a.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}toAbortSignal(){const t=new AbortController,n=a=>{t.abort(a)};return this.subscribe(n),t.signal.unsubscribe=()=>this.unsubscribe(n),t.signal}static source(){let t;return{token:new $a(function(r){t=r}),cancel:t}}};function Io(e){return function(n){return e.apply(null,n)}}function So(e){return u.isObject(e)&&e.isAxiosError===!0}const Ot={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(Ot).forEach(([e,t])=>{Ot[t]=e});function _a(e){const t=new ge(e),n=sa(ge.prototype.request,t);return u.extend(n,ge.prototype,t,{allOwnKeys:!0}),u.extend(n,t,null,{allOwnKeys:!0}),n.create=function(r){return _a(fe(e,r))},n}const J=_a(Je);J.Axios=ge;J.CanceledError=Ke;J.CancelToken=Bo;J.isCancel=ya;J.VERSION=Sa;J.toFormData=vt;J.AxiosError=I;J.Cancel=J.CanceledError;J.all=function(t){return Promise.all(t)};J.spread=Io;J.isAxiosError=So;J.mergeConfig=fe;J.AxiosHeaders=Y;J.formToJSON=e=>ha(u.isHTMLForm(e)?new FormData(e):e);J.getAdapter=Ia.getAdapter;J.HttpStatusCode=Ot;J.default=J;const{Axios:zi,AxiosError:Wi,CanceledError:Xi,isCancel:Zi,CancelToken:Qi,VERSION:Yi,all:ed,Cancel:td,isAxiosError:nd,spread:ad,toFormData:rd,AxiosHeaders:od,HttpStatusCode:sd,formToJSON:id,getAdapter:dd,mergeConfig:ld}=J;window.axios=J;window.axios.defaults.headers.common["X-Requested-With"]="XMLHttpRequest";const zt="transit_user",ce="transit_token",jt="transit_pending_toast";function Te(){try{return typeof window<"u"&&typeof window.localStorage<"u"}catch{return!1}}function Ca(){try{return typeof window<"u"&&typeof window.sessionStorage<"u"}catch{return!1}}function $o(){if(window.transitAuthUser)return window.transitAuthUser;if(!Te())return null;const e=window.localStorage.getItem(zt);if(!e)return null;try{return JSON.parse(e)}catch{return qe(),null}}function xa(e){if(!Te()){window.transitAuthUser=e;return}window.transitAuthUser=e,window.localStorage.setItem(zt,JSON.stringify(e))}function _o(){if(!Te()){window.transitAuthUser=null;return}window.transitAuthUser=null,window.localStorage.removeItem(zt)}function Wt(){return typeof window<"u"&&typeof window.transitAuthToken=="string"&&window.transitAuthToken!==""?window.transitAuthToken:Te()?window.localStorage.getItem(ce):null}function Co(e){const t=typeof e=="string"?e:"";if(!Te()){window.transitAuthToken=t||null;return}if(window.transitAuthToken=t||null,t===""){window.localStorage.removeItem(ce),document.cookie=ce+"=; path=/; max-age=0; samesite=lax";return}window.localStorage.setItem(ce,t),document.cookie=ce+"="+t+"; path=/; max-age=86400; samesite=lax"}function xo(){if(!Te()){window.transitAuthToken=null,document.cookie=ce+"=; path=/; max-age=0; samesite=lax";return}window.transitAuthToken=null,window.localStorage.removeItem(ce),document.cookie=ce+"=; path=/; max-age=0; samesite=lax"}function Lo(e){Ca()&&window.sessionStorage.setItem(jt,JSON.stringify(e))}function To(){if(!Ca())return null;const e=window.sessionStorage.getItem(jt);if(!e)return null;window.sessionStorage.removeItem(jt);try{return JSON.parse(e)}catch{return null}}function qe(){_o(),xo()}function La(e,t){if(!e)return t;if(typeof e.detail=="string"&&e.detail!=="")return e.detail;if(typeof e.message=="string"&&e.message!=="")return e.message;if(e.errors&&typeof e.errors=="object"){const n=Object.values(e.errors).flat()[0];if(typeof n=="string"&&n!=="")return n}return t}function Sn(){return document.body.dataset.apiBase||"/api"}function Ta(e=""){const t=String(e).replace(/^\/+/,"");return t===""?Sn():`${Sn()}/${t}`}async function v(e,t={}){const{method:n="GET",body:a=null,headers:r={},auth:o=!0}=t,s=new Headers(r);s.set("Accept","application/json"),s.set("X-Requested-With","XMLHttpRequest");let i=a;if(a&&!(a instanceof FormData)&&!(a instanceof Blob)&&(s.set("Content-Type","application/json"),i=JSON.stringify(a)),o){const k=Wt();k&&s.set("Authorization",`Bearer ${k}`)}if(!["GET","HEAD","OPTIONS"].includes(n.toUpperCase())){const k=document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");k&&s.set("X-CSRF-TOKEN",k)}const c=await fetch(Ta(e),{method:n,headers:s,body:i,credentials:"same-origin"});let d=null;const l=c.headers.get("content-type")||"";if(c.status!==204&&(d=l.includes("application/json")?await c.json():await c.text()),!c.ok){c.status===401&&(qe(),(document.body.dataset.routeGuard||"none")==="protected"&&window.location.replace(document.body.dataset.loginUrl||"/login"));const k=La(d,`Request gagal (${c.status})`),y=new Error(k);throw y.status=c.status,y.data=d,y}return d}async function Xt(e,t="export.csv"){const n=new Headers({Accept:"text/csv,application/octet-stream","X-Requested-With":"XMLHttpRequest"}),a=Wt();a&&n.set("Authorization",`Bearer ${a}`);const r=await fetch(Ta(e),{method:"GET",headers:n,credentials:"same-origin"});if(!r.ok){let k=null;throw(r.headers.get("content-type")||"").includes("application/json")&&(k=await r.json()),new Error(La(k,"Gagal mengunduh file"))}const o=await r.blob(),c=(r.headers.get("content-disposition")||"").match(/filename="?([^"]+)"?/i)?.[1]||t,d=window.URL.createObjectURL(o),l=document.createElement("a");l.href=d,l.download=c,document.body.appendChild(l),l.click(),l.remove(),window.URL.revokeObjectURL(d)}function Pe(e,t){const n=document.getElementById(e);n&&(n.textContent=t)}function Ao(e){const t=e?.role||"";document.querySelectorAll("[data-role-scope]").forEach(n=>{const a=n.dataset.roleScope,r=a==="admin"?["Super Admin","Admin"].includes(t):a==="super"?t==="Super Admin":!0;n.hidden=!r})}function Aa(){return $o()}function rt(e){if(Ao(e),!e)return;const t=e.nama||"Admin",n=t.trim().split(/\s+/)[0]||"Admin",a=e.email||"admin@pekanbaru.com";Pe("sidebar-user-name",t),Pe("sidebar-user-email",a),Pe("header-user-name",n),Pe("dropdown-user-name",t),Pe("dropdown-user-email",a)}function Ma(e){return typeof e.access_token=="string"&&e.access_token!==""&&Co(e.access_token),xa(e.user),rt(e.user),e}async function Mo(e){const t=await v("/auth/login",{method:"POST",body:e,auth:!1});return Ma(t)}async function Ro(e){const t=await v("/auth/register",{method:"POST",body:e,auth:!1});return Ma(t)}async function $n(){const e=await v("/auth/me");return xa(e),rt(e),e}async function Po(){try{await v("/auth/logout",{method:"POST"})}catch(e){if(e?.status!==401)throw e}qe(),Lo({type:"success",title:"Logout berhasil",message:"Sampai jumpa kembali!"}),window.location.replace(document.body.dataset.loginUrl||"/login")}function _n(e){window.location.replace(e)}async function Do(){const e=document.body.dataset.routeGuard||"none",t=document.body.dataset.loginUrl||"/login",n=document.body.dataset.dashboardUrl||"/dashboard",a=Aa();if(e==="public"){try{const r=await $n();return _n(n),{user:r}}catch{(a||Wt())&&qe()}return{user:null}}if(e==="protected")try{return{user:await $n()}}catch{return qe(),_n(t),{user:null}}return{user:a}}function Zt(){return Array.from(document.querySelectorAll(".modal-shell")).filter(e=>!e.hidden)}function Ra(){document.body.style.overflow=Zt().length>0?"hidden":""}function j(e){const t=document.getElementById(e);t&&(t.hidden=!1,Ra())}function K(e=null){if(e){const t=document.getElementById(e);t&&(t.hidden=!0)}else Zt().forEach(t=>{t.hidden=!0});Ra()}function Oo(){document.addEventListener("click",e=>{const t=e.target.closest("[data-modal-open]");if(t){j(t.dataset.modalOpen);return}const n=e.target.closest("[data-modal-close]");if(n){const a=n.dataset.modalClose||n.closest(".modal-shell")?.id;K(a||void 0)}}),document.addEventListener("keydown",e=>{if(e.key!=="Escape")return;const t=Zt().pop();t&&K(t.id)})}function Qt(e,t,n){const a=document.getElementById("transit-toast-root");if(!a)return;const r=document.createElement("div");r.className=`transit-toast ${n==="error"?"is-error":""} ${n==="info"?"is-info":""}`.trim(),r.innerHTML=`
        <div>
            <strong>${e}</strong>
            <p>${t}</p>
        </div>
    `,a.appendChild(r),window.requestAnimationFrame(()=>{r.classList.add("is-visible")}),window.setTimeout(()=>{r.classList.remove("is-visible"),window.setTimeout(()=>r.remove(),180)},3600)}function U(e,t="Berhasil"){Qt(t,e,"success")}function h(e,t="Gagal"){Qt(t,e,"error")}function jo(e,t="Info"){Qt(t,e,"info")}function De(e){const t=document.querySelector("[data-sidebar]"),n=document.querySelector("[data-sidebar-overlay]");!t||!n||(t.classList.toggle("is-open",e),n.hidden=!e)}function nt(e=null){document.querySelectorAll("[data-user-dropdown]").forEach(t=>{if(e&&t===e)return;t.classList.remove("is-open");const n=t.querySelector("[data-user-menu-trigger]"),a=t.querySelector("[data-user-menu-panel]");n&&n.setAttribute("aria-expanded","false"),a&&(a.hidden=!0)})}function qo(e,t=null){if(!e)return;const n=e.querySelector("[data-user-menu-trigger]"),a=e.querySelector("[data-user-menu-panel]"),r=t??!e.classList.contains("is-open");nt(r?e:null),e.classList.toggle("is-open",r),n&&n.setAttribute("aria-expanded",r?"true":"false"),a&&(a.hidden=!r)}function No(){document.querySelector("[data-sidebar-open]")?.addEventListener("click",()=>{De(!0)}),document.querySelector("[data-sidebar-close]")?.addEventListener("click",()=>{De(!1)}),document.querySelector("[data-sidebar-overlay]")?.addEventListener("click",()=>{De(!1)}),document.querySelectorAll("[data-user-dropdown]").forEach(e=>{e.querySelector("[data-user-menu-trigger]")?.addEventListener("click",t=>{t.stopPropagation(),qo(e)})}),document.addEventListener("click",e=>{e.target.closest("[data-user-dropdown]")||nt()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&(nt(),De(!1))}),window.addEventListener("resize",()=>{window.innerWidth>1100&&De(!1)}),document.querySelectorAll("[data-auth-logout]").forEach(e=>{e.addEventListener("click",async()=>{K(),nt();try{e.disabled=!0,await Po()}catch(t){e.disabled=!1,h(t.message||"Gagal logout")}})})}const Pa={login:{title:"Selamat Datang!",description:"Masuk ke akun Anda untuk melanjutkan",submit:"Masuk",switchText:"Belum punya akun?",switchAction:"Daftar sekarang"},register:{title:"Buat Akun Baru",description:"Daftar untuk mulai menggunakan sistem",submit:"Daftar",switchText:"Sudah punya akun?",switchAction:"Masuk"}};function Cn(e,t){const n=Pa[e];t.form.dataset.authMode=e,t.title.textContent=n.title,t.description.textContent=n.description,t.submitText.textContent=n.submit,t.switchText&&(t.switchText.textContent=n.switchText),t.switchButton&&(t.switchButton.textContent=n.switchAction),t.nameField.hidden=e!=="register",t.nameInput.required=e==="register"}function Uo(){const e=document.getElementById("auth-form");if(!e)return;const t={form:e,title:document.querySelector("[data-auth-title]"),description:document.querySelector("[data-auth-description]"),submitText:document.querySelector("[data-auth-submit-text]"),switchText:document.querySelector("[data-auth-switch-text]"),switchButton:document.querySelector("[data-toggle-auth-mode]"),nameField:document.getElementById("auth-name-field"),nameInput:document.getElementById("nama"),emailInput:document.getElementById("email"),passwordInput:document.getElementById("password"),passwordToggle:document.querySelector("[data-toggle-password]"),submitButton:document.getElementById("auth-submit-button")},n=document.body.dataset.dashboardUrl||"/dashboard";Cn("login",t),t.switchButton?.addEventListener("click",()=>{const a=t.form.dataset.authMode==="login"?"register":"login";Cn(a,t)}),t.passwordToggle?.addEventListener("click",()=>{const a=t.passwordInput.type==="password"?"text":"password";t.passwordInput.type=a,t.passwordToggle.textContent=a==="password"?"Lihat":"Sembunyikan"}),e.addEventListener("submit",async a=>{a.preventDefault();const r=new FormData(e),o=e.dataset.authMode||"login",s={email:String(r.get("email")||"").trim(),password:String(r.get("password")||"").trim()};o==="register"&&(s.nama=String(r.get("nama")||"").trim()),t.submitButton.disabled=!0,t.submitText.textContent=o==="login"?"Memproses...":"Mendaftarkan...";try{o==="login"?(await Mo(s),U("Selamat datang kembali","Login berhasil!")):(await Ro(s),U("Akun Anda telah dibuat","Registrasi berhasil!")),window.location.replace(n)}catch(i){h(i.message||"Terjadi kesalahan",o==="login"?"Login gagal":"Registrasi gagal")}finally{t.submitButton.disabled=!1,t.submitText.textContent=Pa[o].submit}})}const Fo=new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}),Ho=new Intl.NumberFormat("id-ID");function N(e){return Fo.format(Number(e)||0)}function O(e){return Ho.format(Number(e)||0)}function p(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ae(e,t=300){let n=null;return(...a)=>{window.clearTimeout(n),n=window.setTimeout(()=>e(...a),t)}}function Me(e,t,n,a){if(n===0||a===0)return"Menampilkan 0 - 0 dari 0 data";const r=(e-1)*t+1,o=r+a-1;return`Menampilkan ${r} - ${o} dari ${n} data`}function Vo(e){if(!e)return"-";const t=new Date(e);return Number.isNaN(t.getTime())?e:new Intl.DateTimeFormat("id-ID",{day:"2-digit",month:"short",year:"numeric"}).format(t)}function ze(){return new Date().toISOString().slice(0,10)}function oe(e,t,n="Memproses..."){e&&(e.dataset.defaultText||(e.dataset.defaultText=e.textContent.trim()),e.disabled=t,e.textContent=t?n:e.dataset.defaultText)}const ot=["#059669","#10B981","#34D399","#6EE7B7","#A7F3D0"],se={revenueChart:null,passengerChart:null,mobilChart:null};function Go(){const e=document.getElementById("dashboard-initial-state");if(!e)return{stats:{},revenueData:[],mobilRevenue:[]};try{return JSON.parse(e.textContent||"{}")}catch{return{stats:{},revenueData:[],mobilRevenue:[]}}}function Yt(e){e&&typeof e.destroy=="function"&&e.destroy()}function Jo(e,t){const n=document.querySelector(`[data-stat="${e}"]`);if(!n)return;const a=["total_uang_bersih","total_uang_pc"];n.textContent=a.includes(e)?N(t):O(t)}function Da(e,t,n){const a=document.getElementById(e),r=document.getElementById(t);a&&(a.hidden=!n),r&&(r.hidden=n)}function Ko(){return"#065f46"}function qt(){return"#d1fae5"}function en(){return{backgroundColor:"#ffffff",titleColor:"#064e3b",bodyColor:"#065f46",borderColor:"#d1fae5",borderWidth:1,padding:12,cornerRadius:12,displayColors:!0}}function zo(e){const t=document.getElementById("dashboard-revenue-chart"),n=Array.isArray(e)&&e.length>0;if(Da("dashboard-revenue-chart","dashboard-revenue-empty",n),Yt(se.revenueChart),!t||!window.Chart||!n){se.revenueChart=null;return}se.revenueChart=new window.Chart(t,{type:"line",data:{labels:e.map(a=>a.bulan),datasets:[{label:"Pendapatan Bersih",data:e.map(a=>a.uang_bersih),borderColor:"#059669",backgroundColor:"rgba(5, 150, 105, 0.08)",fill:!1,tension:.35,pointRadius:4,pointHoverRadius:5,pointBackgroundColor:"#059669",pointBorderColor:"#ffffff",pointBorderWidth:2,borderWidth:3},{label:"Uang PC",data:e.map(a=>a.uang_pc),borderColor:"#f59e0b",backgroundColor:"rgba(245, 158, 11, 0.1)",fill:!1,tension:.35,pointRadius:4,pointHoverRadius:5,pointBackgroundColor:"#f59e0b",pointBorderColor:"#ffffff",pointBorderWidth:2,borderWidth:3}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{labels:{color:Ko(),usePointStyle:!0,pointStyle:"circle",boxWidth:8,boxHeight:8,padding:18}},tooltip:{...en(),callbacks:{label(a){return`${a.dataset.label}: ${N(a.parsed.y)}`}}}},scales:{x:{ticks:{color:"#047857",font:{size:12}},grid:{color:qt()},border:{display:!1}},y:{ticks:{color:"#047857",font:{size:12},callback(a){return`${Math.round(Number(a)/1e6)}jt`}},grid:{color:qt()},border:{display:!1}}}}})}function Wo(e){const t=document.getElementById("dashboard-passenger-chart"),n=Array.isArray(e)&&e.length>0;if(Da("dashboard-passenger-chart","dashboard-passenger-empty",n),Yt(se.passengerChart),!t||!window.Chart||!n){se.passengerChart=null;return}se.passengerChart=new window.Chart(t,{type:"bar",data:{labels:e.map(a=>a.bulan),datasets:[{label:"Penumpang",data:e.map(a=>a.penumpang),backgroundColor:"#10B981",borderRadius:8,maxBarThickness:44}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{...en(),callbacks:{label(a){return`Penumpang: ${O(a.parsed.y)}`}}}},scales:{x:{ticks:{color:"#047857",font:{size:12}},grid:{color:"rgba(0, 0, 0, 0)"},border:{display:!1}},y:{ticks:{color:"#047857",font:{size:12}},grid:{color:qt()},border:{display:!1}}}}})}function Xo(e){const t=document.getElementById("dashboard-mobil-list");t&&(t.innerHTML=e.map((n,a)=>`
        <div class="dashboard-mobil-item">
            <div class="dashboard-mobil-meta">
                <span class="dashboard-mobil-dot" style="background-color: ${ot[a%ot.length]}"></span>
                <div>
                    <p class="dashboard-mobil-code">${p(n.kode_mobil)}</p>
                    <p class="dashboard-mobil-trips">${O(n.total_trips)} trip</p>
                    <p class="dashboard-mobil-passengers">${O(n.total_penumpang)} penumpang</p>
                </div>
            </div>
            <p class="dashboard-mobil-value">${N(n.total_uang_bersih)}</p>
        </div>
    `).join(""))}function Zo(e){const t=document.getElementById("dashboard-mobil-chart"),n=document.getElementById("dashboard-mobil-content"),a=document.getElementById("dashboard-mobil-empty"),r=document.getElementById("dashboard-mobil-chart-empty"),o=document.getElementById("dashboard-mobil-list"),s=Array.isArray(e)&&e.length>0,i=s&&e.some(c=>Number(c.total_uang_bersih)>0);if(Yt(se.mobilChart),n&&(n.hidden=!s),a&&(a.hidden=s),t&&(t.hidden=!i),r&&(r.hidden=i),s?Xo(e):o&&(o.innerHTML=""),!t||!window.Chart||!i){se.mobilChart=null;return}se.mobilChart=new window.Chart(t,{type:"doughnut",data:{labels:e.map(c=>c.kode_mobil),datasets:[{data:e.map(c=>c.total_uang_bersih),backgroundColor:e.map((c,d)=>ot[d%ot.length]),borderColor:"#ffffff",borderWidth:6,hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"58%",plugins:{legend:{display:!1},tooltip:{...en(),callbacks:{label(c){const d=e[c.dataIndex]||{};return`${c.label}: ${N(c.parsed)} / ${O(d.total_penumpang||0)} penumpang`}}}}}})}function xn(e){Object.entries(e.stats||{}).forEach(([t,n])=>Jo(t,n)),zo(e.revenueData||[]),Wo(e.revenueData||[]),Zo(e.mobilRevenue||[])}async function Qo(){const[e,t,n]=await Promise.all([v("/statistics/dashboard"),v("/statistics/revenue-chart"),v("/statistics/mobil-revenue")]);return{stats:e,revenueData:t,mobilRevenue:n}}function Ln(e){const t=document.querySelector("[data-dashboard-loading]"),n=document.querySelector("[data-dashboard-content]"),a=document.getElementById("dashboard-refresh-btn");t&&(t.hidden=!e),n&&(n.hidden=e),a&&(a.disabled=e)}async function Yo(){const e=document.getElementById("dashboard-refresh-btn");e&&(xn(Go()),e.addEventListener("click",async()=>{Ln(!0);try{xn(await Qo())}catch{h("Silakan coba lagi","Gagal memuat data")}finally{Ln(!1)}}))}const T={data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1},Ce=10;function es(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function ts(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 21C15 17.4 18 14.4 18 10.5C18 7.18629 15.3137 4.5 12 4.5C8.68629 4.5 6 7.18629 6 10.5C6 14.4 9 17.4 12 21Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
            <circle cx="12" cy="10.5" r="2.25" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function ns(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function as(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function st(e){const t=document.getElementById("driver-submit-btn");T.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":T.editItem?"Perbarui":"Simpan")}function rs(){const e=document.getElementById("drivers-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="drivers-table-state">
                <div class="drivers-loading-inline">
                    <span class="drivers-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function os(){const e=document.getElementById("drivers-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="drivers-table-state drivers-empty-copy">
                Belum ada data driver
            </td>
        </tr>
    `)}function Tn(){const e=document.getElementById("drivers-table-body");if(e){if(T.loading){rs();return}if(T.data.length===0){os();return}e.innerHTML=T.data.map((t,n)=>`
        <tr class="drivers-row" data-testid="driver-row-${t.id}">
            <td class="drivers-index-cell">${(T.page-1)*Ce+n+1}</td>
            <td>
                <div class="drivers-user-cell">
                    <span class="drivers-user-avatar" aria-hidden="true">
                        ${es()}
                    </span>
                    <span class="drivers-user-name">${p(t.nama)}</span>
                </div>
            </td>
            <td>
                <div class="drivers-location-cell">
                    <span class="drivers-location-icon" aria-hidden="true">${ts()}</span>
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
                        ${ns()}
                    </button>
                    <button
                        class="drivers-icon-button drivers-icon-button-danger"
                        type="button"
                        data-driver-delete="${t.id}"
                        data-driver-name="${p(t.nama)}"
                        data-testid="delete-driver-${t.id}"
                        aria-label="Hapus driver ${p(t.nama)}"
                    >
                        ${as()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function An(){const e=document.getElementById("drivers-pagination-shell"),t=document.getElementById("drivers-pagination-info"),n=document.getElementById("drivers-pagination-page"),a=document.getElementById("drivers-prev-page-btn"),r=document.getElementById("drivers-next-page-btn"),o=Math.max(1,Math.ceil(T.totalCount/Ce));e&&(e.hidden=o<=1),t&&(t.textContent=Me(T.page,Ce,T.totalCount,T.data.length)),n&&(n.textContent=`${T.page} / ${o}`),a&&(a.disabled=T.page===1),r&&(r.disabled=T.page>=o)}async function he(){T.loading=!0,Tn(),An();try{const[e,t]=await Promise.all([v(`/drivers?page=${T.page}&limit=${Ce}${T.search?`&search=${encodeURIComponent(T.search)}`:""}`),v(`/drivers/count${T.search?`?search=${encodeURIComponent(T.search)}`:""}`)]);T.data=Array.isArray(e)?e:[],T.totalCount=Number(t.count||0)}finally{T.loading=!1,Tn(),An()}}function Mn(){const e=document.getElementById("driver-form"),t=document.getElementById("driver-form-title"),n=document.getElementById("driver-form-description"),a=document.getElementById("driver-id"),r=document.getElementById("driver-nama"),o=document.getElementById("driver-lokasi");e?.reset(),a&&(a.value=""),r&&(r.value=""),o&&(o.value=""),t&&(t.textContent="Tambah Driver Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan data driver"),T.editItem=null,st(!1)}function ss(e){const t=document.getElementById("driver-form-title"),n=document.getElementById("driver-form-description"),a=document.getElementById("driver-id"),r=document.getElementById("driver-nama"),o=document.getElementById("driver-lokasi");T.editItem=e,a&&(a.value=e.id),r&&(r.value=e.nama),o&&(o.value=e.lokasi),t&&(t.textContent="Edit Data Driver"),n&&(n.textContent="Isi form di bawah untuk memperbarui data driver"),st(!1)}async function is(e){const t=await v(`/drivers/${e}`);ss(t),j("driver-form-modal")}function ds(e){const t=document.getElementById("driver-delete-copy");T.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus driver <strong>${p(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`),j("driver-delete-modal")}function ls(){const e=document.getElementById("drivers-add-btn"),t=document.getElementById("drivers-export-btn"),n=document.getElementById("drivers-search-input"),a=document.getElementById("driver-form"),r=document.getElementById("drivers-table-body"),o=document.getElementById("driver-delete-confirm-btn"),s=document.getElementById("drivers-prev-page-btn"),i=document.getElementById("drivers-next-page-btn");if(!(!e||!a||!r))return e.addEventListener("click",()=>{Mn(),j("driver-form-modal")}),t?.addEventListener("click",()=>{Xt("/export/drivers/csv","drivers.csv").catch(()=>{h("Gagal mengunduh file")})}),n?.addEventListener("input",Ae(async c=>{T.search=c.target.value.trim(),T.page=1;try{await he()}catch{h("Gagal memuat data")}})),a.addEventListener("submit",async c=>{c.preventDefault();const d={nama:document.getElementById("driver-nama")?.value.trim()||"",lokasi:document.getElementById("driver-lokasi")?.value.trim()||""};st(!0);try{T.editItem?(await v(`/drivers/${T.editItem.id}`,{method:"PUT",body:d}),U("Data driver berhasil diperbarui")):(await v("/drivers",{method:"POST",body:d}),U("Driver berhasil ditambahkan")),K("driver-form-modal"),Mn(),await he()}catch(l){h(l.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{st(!1)}}),r.addEventListener("click",async c=>{const d=c.target.closest("[data-driver-edit]"),l=c.target.closest("[data-driver-delete]");try{if(d){await is(d.dataset.driverEdit);return}l&&ds({id:l.dataset.driverDelete,nama:l.dataset.driverName})}catch{h("Gagal memuat data")}}),o?.addEventListener("click",async()=>{if(T.deleteItem)try{await v(`/drivers/${T.deleteItem.id}`,{method:"DELETE"}),U("Driver berhasil dihapus"),K("driver-delete-modal"),(T.page-1)*Ce>=T.totalCount-1&&T.page>1&&(T.page-=1),T.deleteItem=null,await he()}catch{h("Gagal menghapus data")}}),s?.addEventListener("click",async()=>{if(!(T.page<=1)){T.page-=1;try{await he()}catch{h("Gagal memuat data")}}}),i?.addEventListener("click",async()=>{const c=Math.max(1,Math.ceil(T.totalCount/Ce));if(!(T.page>=c)){T.page+=1;try{await he()}catch{h("Gagal memuat data")}}}),he().catch(()=>{h("Gagal memuat data")})}const w={data:[],loading:!0,totalCount:0,page:1,search:"",filterJenis:"",editItem:null,deleteItem:null,isSubmitting:!1},xe=10;function cs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M5 14L6.6 9.2C6.8728 8.3816 7.6387 7.83 8.5014 7.83H15.4986C16.3613 7.83 17.1272 8.3816 17.4 9.2L19 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M4 14H20V17C20 18.1046 19.1046 19 18 19H6C4.89543 19 4 18.1046 4 17V14Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M7 16H7.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path>
            <path d="M17 16H17.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path>
        </svg>
    `}function us(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function ms(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function ps(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 13L11 22L2 13V4H11L20 13Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <circle cx="7.5" cy="8.5" r="1.5" fill="currentColor"></circle>
        </svg>
    `}function it(e){const t=document.getElementById("mobil-submit-btn");w.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":w.editItem?"Perbarui":"Simpan")}function gs(e){return e==="Hiace"?"mobil-jenis-badge mobil-jenis-badge-hiace":"mobil-jenis-badge mobil-jenis-badge-reborn"}function fs(){const e=document.getElementById("mobil-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="mobil-table-state">
                <div class="mobil-loading-inline">
                    <span class="mobil-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function bs(){const e=document.getElementById("mobil-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="mobil-table-state mobil-empty-copy">
                Belum ada data mobil
            </td>
        </tr>
    `)}function Rn(){const e=document.getElementById("mobil-table-body");if(e){if(w.loading){fs();return}if(w.data.length===0){bs();return}e.innerHTML=w.data.map((t,n)=>`
        <tr class="mobil-row" data-testid="mobil-row-${t.id}">
            <td class="mobil-index-cell">${(w.page-1)*xe+n+1}</td>
            <td>
                <div class="mobil-code-cell">
                    <span class="mobil-code-avatar" aria-hidden="true">
                        ${cs()}
                    </span>
                    <span class="mobil-code-text">${p(t.kode_mobil)}</span>
                </div>
            </td>
            <td>
                <span class="${gs(t.jenis_mobil)}">
                    <span class="mobil-jenis-icon" aria-hidden="true">${ps()}</span>
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
                        ${us()}
                    </button>
                    <button
                        class="mobil-icon-button mobil-icon-button-danger"
                        type="button"
                        data-mobil-delete="${t.id}"
                        data-mobil-name="${p(t.kode_mobil)}"
                        data-testid="delete-mobil-${t.id}"
                        aria-label="Hapus mobil ${p(t.kode_mobil)}"
                    >
                        ${ms()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function Pn(){const e=document.getElementById("mobil-pagination-shell"),t=document.getElementById("mobil-pagination-info"),n=document.getElementById("mobil-pagination-page"),a=document.getElementById("mobil-prev-page-btn"),r=document.getElementById("mobil-next-page-btn"),o=Math.max(1,Math.ceil(w.totalCount/xe));e&&(e.hidden=o<=1),t&&(t.textContent=Me(w.page,xe,w.totalCount,w.data.length)),n&&(n.textContent=`${w.page} / ${o}`),a&&(a.disabled=w.page===1),r&&(r.disabled=w.page>=o)}async function me(){w.loading=!0,Rn(),Pn();try{const[e,t]=await Promise.all([v(`/mobil?page=${w.page}&limit=${xe}${w.search?`&search=${encodeURIComponent(w.search)}`:""}${w.filterJenis?`&jenis=${encodeURIComponent(w.filterJenis)}`:""}`),v(`/mobil/count${w.search||w.filterJenis?"?":""}${[w.search?`search=${encodeURIComponent(w.search)}`:"",w.filterJenis?`jenis=${encodeURIComponent(w.filterJenis)}`:""].filter(Boolean).join("&")}`)]);w.data=Array.isArray(e)?e:[],w.totalCount=Number(t.count||0)}finally{w.loading=!1,Rn(),Pn()}}function Dn(){const e=document.getElementById("mobil-form"),t=document.getElementById("mobil-form-title"),n=document.getElementById("mobil-form-description"),a=document.getElementById("mobil-id"),r=document.getElementById("mobil-kode"),o=document.getElementById("mobil-jenis");e?.reset(),a&&(a.value=""),r&&(r.value=""),o&&(o.value="Hiace"),t&&(t.textContent="Tambah Mobil Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan data mobil"),w.editItem=null,it(!1)}function ks(e){const t=document.getElementById("mobil-form-title"),n=document.getElementById("mobil-form-description"),a=document.getElementById("mobil-id"),r=document.getElementById("mobil-kode"),o=document.getElementById("mobil-jenis");w.editItem=e,a&&(a.value=e.id),r&&(r.value=e.kode_mobil),o&&(o.value=e.jenis_mobil),t&&(t.textContent="Edit Data Mobil"),n&&(n.textContent="Isi form di bawah untuk memperbarui data mobil"),it(!1)}async function hs(e){const t=await v(`/mobil/${e}`);ks(t),j("mobil-form-modal")}function ys(e){const t=document.getElementById("mobil-delete-copy");w.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus mobil <strong>${p(e.kode_mobil)}</strong>? Tindakan ini tidak dapat dibatalkan.`),j("mobil-delete-modal")}function vs(){const e=document.getElementById("mobil-add-btn"),t=document.getElementById("mobil-export-btn"),n=document.getElementById("mobil-search-input"),a=document.getElementById("mobil-filter-jenis"),r=document.getElementById("mobil-form"),o=document.getElementById("mobil-table-body"),s=document.getElementById("mobil-delete-confirm-btn"),i=document.getElementById("mobil-prev-page-btn"),c=document.getElementById("mobil-next-page-btn"),d=document.getElementById("mobil-kode");if(!(!e||!r||!o))return e.addEventListener("click",()=>{Dn(),j("mobil-form-modal")}),t?.addEventListener("click",()=>{Xt("/export/mobil/csv","mobil.csv").catch(()=>{h("Gagal mengunduh file")})}),n?.addEventListener("input",Ae(async l=>{w.search=l.target.value.trim(),w.page=1;try{await me()}catch{h("Gagal memuat data")}})),a?.addEventListener("change",async l=>{w.filterJenis=l.target.value,w.page=1;try{await me()}catch{h("Gagal memuat data")}}),d?.addEventListener("input",l=>{l.target.value=l.target.value.toUpperCase()}),r.addEventListener("submit",async l=>{l.preventDefault();const k={kode_mobil:document.getElementById("mobil-kode")?.value.trim().toUpperCase()||"",jenis_mobil:document.getElementById("mobil-jenis")?.value||"Hiace"};it(!0);try{w.editItem?(await v(`/mobil/${w.editItem.id}`,{method:"PUT",body:k}),U("Data mobil berhasil diperbarui")):(await v("/mobil",{method:"POST",body:k}),U("Mobil berhasil ditambahkan")),K("mobil-form-modal"),Dn(),await me()}catch(y){h(y.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{it(!1)}}),o.addEventListener("click",async l=>{const k=l.target.closest("[data-mobil-edit]"),y=l.target.closest("[data-mobil-delete]");try{if(k){await hs(k.dataset.mobilEdit);return}y&&ys({id:y.dataset.mobilDelete,kode_mobil:y.dataset.mobilName})}catch{h("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(w.deleteItem)try{await v(`/mobil/${w.deleteItem.id}`,{method:"DELETE"}),U("Mobil berhasil dihapus"),K("mobil-delete-modal"),(w.page-1)*xe>=w.totalCount-1&&w.page>1&&(w.page-=1),w.deleteItem=null,await me()}catch{h("Gagal menghapus data")}}),i?.addEventListener("click",async()=>{if(!(w.page<=1)){w.page-=1;try{await me()}catch{h("Gagal memuat data")}}}),c?.addEventListener("click",async()=>{const l=Math.max(1,Math.ceil(w.totalCount/xe));if(!(w.page>=l)){w.page+=1;try{await me()}catch{h("Gagal memuat data")}}}),me().catch(()=>{h("Gagal memuat data")})}const B={data:[],drivers:[],mobilList:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1},Ne=10,On={"05:00":"Subuh (05.00 WIB)","08:00":"Pagi (08.00 WIB)","10:00":"Pagi (10.00 WIB)","14:00":"Siang (14.00 WIB)","16:00":"Sore (16.00 WIB)","19:00":"Malam (19.00 WIB)"},wt="08:00",Es=["Reguler","Dropping","Rental"],tn="Reguler";function ws(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Bs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function nn(e){return e==="Lunas"?"Lunas":"Belum Lunas"}function jn(e){const t=nn(e);return`<span class="keberangkatan-payment-badge ${t==="Lunas"?"is-paid":"is-unpaid"}">${p(t)}</span>`}function qn(e){return On[e]||On[wt]}function dt(e){return Es.includes(e)?e:tn}function Is(){const e=Number(document.getElementById("keberangkatan-tarif-penumpang")?.value||0),t=Number(document.getElementById("keberangkatan-uang-paket")?.value||0),n=Number(document.getElementById("keberangkatan-jumlah-snack")?.value||0),a=Number(document.getElementById("keberangkatan-pengembalian-snack")?.value||0),r=Number(document.getElementById("keberangkatan-jumlah-air-mineral")?.value||0),o=e,s=o+t,i=s*.15,c=s*.85;return{jumlah_uang_penumpang:o,uang_paket:t,total:s,uang_pc:i,uang_bersih:c,jumlah_snack:n,pengembalian_snack:a,jumlah_air_mineral:r}}function an(){const e=Is();Object.entries(e).forEach(([t,n])=>{const a=document.querySelector(`[data-calc="${t}"]`);if(a){if(t==="jumlah_snack"){a.textContent=`${O(n)} item`;return}if(t==="pengembalian_snack"){a.textContent=`${O(n)} item`;return}if(t==="jumlah_air_mineral"){a.textContent=`${O(n)} botol`;return}a.textContent=N(n)}})}function lt(e,t,n,a,r=""){const o=document.getElementById(e);if(!o)return;const s=e==="keberangkatan-kode-mobil"?"Pilih mobil":"Pilih driver";o.innerHTML=`
        <option value="">${s}</option>
        ${t.map(i=>`
            <option value="${i[n]}" ${String(i[n])===String(r)?"selected":""}>
                ${p(a(i))}
            </option>
        `).join("")}
    `}function ct(e){const t=document.getElementById("keberangkatan-submit-btn");B.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":B.editItem?"Perbarui":"Simpan")}function Ss(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");e&&(e.innerHTML=`
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
        `))}function $s(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");e&&(e.innerHTML=`
        <tr>
            <td colspan="18" class="keberangkatan-table-state keberangkatan-empty-copy">
                Belum ada data keberangkatan
            </td>
        </tr>
    `,t&&(t.hidden=!1,t.innerHTML=`
            <div class="keberangkatan-mobile-state keberangkatan-empty-copy">
                Belum ada data keberangkatan
            </div>
        `))}function Nn(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");if(e){if(B.loading){Ss();return}if(B.data.length===0){$s();return}e.innerHTML=B.data.map(n=>`
        <tr class="keberangkatan-row" data-testid="keberangkatan-row-${n.id}">
            <td class="keberangkatan-hari-cell">${p(n.hari)}</td>
            <td>${p(n.tanggal)}</td>
            <td>${p(n.jam_keberangkatan_label||qn(n.jam_keberangkatan))}</td>
            <td>${p(dt(n.tipe_layanan))}</td>
            <td>
                <span class="keberangkatan-kode-badge">${p(n.kode_mobil)}</span>
            </td>
            <td>${p(n.driver_nama)}</td>
            <td class="text-right">${O(n.jumlah_penumpang)}</td>
            <td class="text-right keberangkatan-money-cell">${N(n.jumlah_uang_penumpang)}</td>
            <td class="text-right">${O(n.jumlah_paket)}</td>
            <td class="text-right keberangkatan-money-cell">${N(n.uang_paket)}</td>
            <td class="text-right"><span class="keberangkatan-stock-badge">${O(n.jumlah_snack)}</span></td>
            <td class="text-right"><span class="keberangkatan-stock-badge keberangkatan-stock-badge-blue">${O(n.pengembalian_snack)}</span></td>
            <td class="text-right"><span class="keberangkatan-stock-badge keberangkatan-stock-badge-blue">${O(n.jumlah_air_mineral)}</span></td>
            <td class="text-right keberangkatan-money-cell keberangkatan-money-cell-amber">${N(n.uang_pc)}</td>
            <td class="text-right keberangkatan-money-cell keberangkatan-money-cell-emerald">${N(n.uang_bersih)}</td>
            <td class="text-center">${jn(n.status_pembayaran)}</td>
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
                        aria-label="Edit data keberangkatan ${p(n.kode_mobil)}"
                    >
                        ${ws()}
                    </button>
                    <button
                        class="keberangkatan-icon-button keberangkatan-icon-button-danger"
                        type="button"
                        data-keberangkatan-delete="${n.id}"
                        data-testid="delete-keberangkatan-${n.id}"
                        aria-label="Hapus data keberangkatan ${p(n.kode_mobil)}"
                    >
                        ${Bs()}
                    </button>
                </div>
            </td>
        </tr>
    `).join(""),t&&(t.hidden=!1,t.innerHTML=B.data.map(n=>`
            <article class="keberangkatan-mobile-card" data-testid="keberangkatan-card-${n.id}">
                <div class="keberangkatan-mobile-card-head">
                    <div>
                        <p class="keberangkatan-mobile-day">${p(n.hari)}</p>
                        <h3 class="keberangkatan-mobile-date">${p(n.tanggal)}</h3>
                        <p>${p(n.jam_keberangkatan_label||qn(n.jam_keberangkatan))}</p>
                    </div>
                    <div class="keberangkatan-mobile-head-side">
                        <span class="keberangkatan-kode-badge">${p(n.kode_mobil)}</span>
                        <span class="keberangkatan-trip-badge">#${O(n.trip_ke)}</span>
                    </div>
                </div>

                <div class="keberangkatan-mobile-driver">
                    <span>Driver</span>
                    <strong>${p(n.driver_nama)}</strong>
                </div>

                <div class="keberangkatan-mobile-grid">
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-status">
                        <span>Validasi</span>
                        ${jn(n.status_pembayaran)}
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Layanan</span>
                        <strong>${p(dt(n.tipe_layanan))}</strong>
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
        `).join(""))}}function Un(){const e=document.getElementById("keberangkatan-pagination-shell"),t=document.getElementById("keberangkatan-pagination-info"),n=document.getElementById("keberangkatan-pagination-page"),a=document.getElementById("keberangkatan-prev-page-btn"),r=document.getElementById("keberangkatan-next-page-btn"),o=Math.max(1,Math.ceil(B.totalCount/Ne));e&&(e.hidden=o<=1),t&&(t.textContent=Me(B.page,Ne,B.totalCount,B.data.length)),n&&(n.textContent=`${B.page} / ${o}`),a&&(a.disabled=B.page===1),r&&(r.disabled=B.page>=o)}async function ye(){B.loading=!0,Nn(),Un();try{const[e,t,n,a]=await Promise.all([v(`/keberangkatan?page=${B.page}&limit=${Ne}${B.search?`&search=${encodeURIComponent(B.search)}`:""}`),v(`/keberangkatan/count${B.search?`?search=${encodeURIComponent(B.search)}`:""}`),v("/drivers/all"),v("/mobil/all")]);B.data=Array.isArray(e)?e:[],B.totalCount=Number(t.count||0),B.drivers=Array.isArray(n)?n:[],B.mobilList=Array.isArray(a)?a:[]}finally{B.loading=!1,Nn(),Un()}}function Oa(){document.getElementById("keberangkatan-form")?.scrollTo({top:0,behavior:"auto"})}function Lt(){const e=document.getElementById("keberangkatan-form"),t=document.getElementById("keberangkatan-form-title"),n=document.getElementById("keberangkatan-form-description"),a=document.getElementById("keberangkatan-tanggal"),r=document.getElementById("keberangkatan-jam-keberangkatan"),o=document.getElementById("keberangkatan-trip-ke"),s=document.getElementById("keberangkatan-tipe-layanan"),i=document.getElementById("keberangkatan-jumlah-penumpang"),c=document.getElementById("keberangkatan-tarif-penumpang"),d=document.getElementById("keberangkatan-jumlah-paket"),l=document.getElementById("keberangkatan-uang-paket"),k=document.getElementById("keberangkatan-jumlah-snack"),y=document.getElementById("keberangkatan-pengembalian-snack"),A=document.getElementById("keberangkatan-jumlah-air-mineral"),m=document.getElementById("keberangkatan-status-pembayaran");e?.reset(),B.editItem=null,document.getElementById("keberangkatan-id").value="",t&&(t.textContent="Tambah Data Keberangkatan"),n&&(n.textContent="Isi form di bawah untuk menambahkan data keberangkatan"),a&&(a.value=ze()),r&&(r.value=wt),lt("keberangkatan-kode-mobil",B.mobilList,"kode_mobil",b=>`${b.kode_mobil} - ${b.jenis_mobil}`,B.mobilList[0]?.kode_mobil||""),lt("keberangkatan-driver-id",B.drivers,"id",b=>`${b.nama} - ${b.lokasi}`,B.drivers[0]?.id||""),o&&(o.value="1"),s&&(s.value=tn),i&&(i.value="0"),c&&(c.value="0"),d&&(d.value="0"),l&&(l.value="0"),k&&(k.value="0"),y&&(y.value="0"),A&&(A.value="0"),m&&(m.value="Belum Lunas"),ct(!1),an(),Oa()}async function Fn(e){const t=await v(`/keberangkatan/${e}`),n=document.getElementById("keberangkatan-form-title"),a=document.getElementById("keberangkatan-form-description");B.editItem=t,document.getElementById("keberangkatan-id").value=t.id,document.getElementById("keberangkatan-tanggal").value=t.tanggal,document.getElementById("keberangkatan-jam-keberangkatan").value=t.jam_keberangkatan||wt,document.getElementById("keberangkatan-trip-ke").value=t.trip_ke,document.getElementById("keberangkatan-tipe-layanan").value=dt(t.tipe_layanan),document.getElementById("keberangkatan-jumlah-penumpang").value=t.jumlah_penumpang,document.getElementById("keberangkatan-tarif-penumpang").value=t.tarif_penumpang,document.getElementById("keberangkatan-jumlah-paket").value=t.jumlah_paket,document.getElementById("keberangkatan-uang-paket").value=t.uang_paket,document.getElementById("keberangkatan-jumlah-snack").value=t.jumlah_snack,document.getElementById("keberangkatan-pengembalian-snack").value=t.pengembalian_snack,document.getElementById("keberangkatan-jumlah-air-mineral").value=t.jumlah_air_mineral,document.getElementById("keberangkatan-status-pembayaran").value=nn(t.status_pembayaran),lt("keberangkatan-kode-mobil",B.mobilList,"kode_mobil",r=>`${r.kode_mobil} - ${r.jenis_mobil}`,t.kode_mobil),lt("keberangkatan-driver-id",B.drivers,"id",r=>`${r.nama} - ${r.lokasi}`,t.driver_id),n&&(n.textContent="Edit Data Keberangkatan"),a&&(a.textContent="Isi form di bawah untuk memperbarui data keberangkatan"),ct(!1),an(),Oa(),j("keberangkatan-form-modal")}function Hn(e){B.deleteItem=e,j("keberangkatan-delete-modal")}function _s(){const e=document.getElementById("keberangkatan-add-btn"),t=document.getElementById("keberangkatan-export-btn"),n=document.getElementById("keberangkatan-search-input"),a=document.getElementById("keberangkatan-form"),r=document.getElementById("keberangkatan-table-body"),o=document.getElementById("keberangkatan-mobile-list"),s=document.getElementById("keberangkatan-delete-confirm-btn"),i=document.getElementById("keberangkatan-prev-page-btn"),c=document.getElementById("keberangkatan-next-page-btn");if(!(!e||!a||!r))return e.addEventListener("click",()=>{Lt(),j("keberangkatan-form-modal")}),t?.addEventListener("click",()=>{Xt("/export/keberangkatan/csv","keberangkatan.csv").catch(()=>{h("Gagal mengunduh file")})}),n?.addEventListener("input",Ae(async d=>{B.search=d.target.value.trim(),B.page=1;try{await ye()}catch{h("Gagal memuat data")}})),a.addEventListener("input",d=>{["keberangkatan-jumlah-penumpang","keberangkatan-tarif-penumpang","keberangkatan-uang-paket","keberangkatan-jumlah-snack","keberangkatan-pengembalian-snack","keberangkatan-jumlah-air-mineral"].includes(d.target.id)&&an()}),a.addEventListener("submit",async d=>{d.preventDefault();const l={tanggal:document.getElementById("keberangkatan-tanggal")?.value||"",jam_keberangkatan:document.getElementById("keberangkatan-jam-keberangkatan")?.value||wt,tipe_layanan:dt(document.getElementById("keberangkatan-tipe-layanan")?.value||tn),kode_mobil:document.getElementById("keberangkatan-kode-mobil")?.value||"",driver_id:document.getElementById("keberangkatan-driver-id")?.value||"",jumlah_penumpang:Number(document.getElementById("keberangkatan-jumlah-penumpang")?.value||0),tarif_penumpang:Number(document.getElementById("keberangkatan-tarif-penumpang")?.value||0),jumlah_paket:Number(document.getElementById("keberangkatan-jumlah-paket")?.value||0),uang_paket:Number(document.getElementById("keberangkatan-uang-paket")?.value||0),jumlah_snack:Number(document.getElementById("keberangkatan-jumlah-snack")?.value||0),pengembalian_snack:Number(document.getElementById("keberangkatan-pengembalian-snack")?.value||0),jumlah_air_mineral:Number(document.getElementById("keberangkatan-jumlah-air-mineral")?.value||0),trip_ke:Number(document.getElementById("keberangkatan-trip-ke")?.value||1),status_pembayaran:nn(document.getElementById("keberangkatan-status-pembayaran")?.value||"")};ct(!0);try{B.editItem?(await v(`/keberangkatan/${B.editItem.id}`,{method:"PUT",body:l}),U("Data berhasil diperbarui")):(await v("/keberangkatan",{method:"POST",body:l}),U("Data berhasil ditambahkan")),K("keberangkatan-form-modal"),Lt(),await ye()}catch(k){h(k.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{ct(!1)}}),r.addEventListener("click",async d=>{const l=d.target.closest("[data-keberangkatan-edit]"),k=d.target.closest("[data-keberangkatan-delete]");try{if(l){await Fn(l.dataset.keberangkatanEdit);return}k&&Hn({id:k.dataset.keberangkatanDelete})}catch{h("Gagal memuat data")}}),o?.addEventListener("click",async d=>{const l=d.target.closest("[data-keberangkatan-edit]"),k=d.target.closest("[data-keberangkatan-delete]");try{if(l){await Fn(l.dataset.keberangkatanEdit);return}k&&Hn({id:k.dataset.keberangkatanDelete})}catch{h("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(B.deleteItem)try{await v(`/keberangkatan/${B.deleteItem.id}`,{method:"DELETE"}),U("Data berhasil dihapus"),K("keberangkatan-delete-modal"),(B.page-1)*Ne>=B.totalCount-1&&B.page>1&&(B.page-=1),B.deleteItem=null,await ye()}catch{h("Gagal menghapus data")}}),i?.addEventListener("click",async()=>{if(!(B.page<=1)){B.page-=1;try{await ye()}catch{h("Gagal memuat data")}}}),c?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil(B.totalCount/Ne));if(!(B.page>=d)){B.page+=1;try{await ye()}catch{h("Gagal memuat data")}}}),ye().then(()=>{Lt()}).catch(()=>{h("Gagal memuat data")})}const S={data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1,prices:{snack:0,air:0}},Ue=10;function Cs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function xs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function ut(e){return Number(document.getElementById(e)?.value||0)}function mt(){const e=ut("stock-total-snack"),t=ut("stock-total-air"),n=e*S.prices.snack+t*S.prices.air,a=document.querySelector('[data-stock-calc="nilai_total"]'),r=document.getElementById("stock-snack-price-label"),o=document.getElementById("stock-air-price-label");r&&(r.textContent=N(S.prices.snack)),o&&(o.textContent=N(S.prices.air)),a&&(a.textContent=N(n))}function pt(e){const t=document.getElementById("stock-submit-btn");S.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":S.editItem?"Perbarui":"Simpan")}function Ls(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");e&&(e.innerHTML=`
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
        `))}function Ts(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");e&&(e.innerHTML=`
        <tr>
            <td colspan="14" class="stock-table-state stock-empty-copy">
                Belum ada data stok snack dan air mineral
            </td>
        </tr>
    `,t&&(t.hidden=!1,t.innerHTML=`
            <div class="stock-mobile-state stock-empty-copy">
                Belum ada data stok snack dan air mineral
            </div>
        `))}function Vn(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");if(e){if(S.loading){Ls();return}if(S.data.length===0){Ts();return}e.innerHTML=S.data.map(n=>`
        <tr class="stock-row" data-testid="stock-row-${n.id}">
            <td class="stock-day-cell">${p(n.hari)}</td>
            <td>${p(n.tanggal)}</td>
            <td>${p(n.bulan)}</td>
            <td class="text-right">${O(n.total_stock_snack_display??n.total_stock_snack)}</td>
            <td class="text-right">${O(n.total_stock_air_mineral)}</td>
            <td class="text-right">${O(n.pengembalian_snack)}</td>
            <td class="text-right">${O(n.terpakai_snack)}</td>
            <td class="text-right">${O(n.terpakai_air_mineral)}</td>
            <td class="text-right"><span class="stock-value-badge stock-value-badge-emerald">${O(n.sisa_stock_snack)}</span></td>
            <td class="text-right"><span class="stock-value-badge stock-value-badge-blue">${O(n.sisa_stock_air_mineral)}</span></td>
            <td class="text-right stock-money-cell">${N(n.nilai_total)}</td>
            <td class="text-right stock-money-cell stock-money-cell-emerald">${N(n.sisa_nilai_total)}</td>
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
                        ${Cs()}
                    </button>
                    <button
                        class="stock-icon-button stock-icon-button-danger"
                        type="button"
                        data-stock-delete="${n.id}"
                        data-stock-date="${p(n.tanggal)}"
                        data-testid="delete-stock-${n.id}"
                        aria-label="Hapus data stok ${p(n.tanggal)}"
                    >
                        ${xs()}
                    </button>
                </div>
            </td>
        </tr>
    `).join(""),t&&(t.hidden=!1,t.innerHTML=S.data.map(n=>`
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
        `).join(""))}}function Gn(){const e=document.getElementById("stock-pagination-shell"),t=document.getElementById("stock-pagination-info"),n=document.getElementById("stock-pagination-page"),a=document.getElementById("stock-prev-page-btn"),r=document.getElementById("stock-next-page-btn"),o=Math.max(1,Math.ceil(S.totalCount/Ue));e&&(e.hidden=o<=1),t&&(t.textContent=Me(S.page,Ue,S.totalCount,S.data.length)),n&&(n.textContent=`${S.page} / ${o}`),a&&(a.disabled=S.page===1),r&&(r.disabled=S.page>=o)}async function ve(){S.loading=!0,Vn(),Gn();try{const[e,t]=await Promise.all([v(`/stock?page=${S.page}&limit=${Ue}${S.search?`&search=${encodeURIComponent(S.search)}`:""}`),v(`/stock/count${S.search?`?search=${encodeURIComponent(S.search)}`:""}`)]);S.data=Array.isArray(e)?e:[],S.totalCount=Number(t.count||0)}finally{S.loading=!1,Vn(),Gn()}}function Jn(){const e=document.getElementById("stock-form"),t=document.getElementById("stock-form-title"),n=document.getElementById("stock-form-description");e?.reset(),S.editItem=null,document.getElementById("stock-id").value="",document.getElementById("stock-tanggal").value=ze(),document.getElementById("stock-total-snack").value="0",document.getElementById("stock-total-air").value="0",document.getElementById("stock-keterangan").value="",t&&(t.textContent="Tambah Stok Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan stok snack dan air mineral"),pt(!1),mt()}function As(e){const t=document.getElementById("stock-form-title"),n=document.getElementById("stock-form-description");S.editItem=e,document.getElementById("stock-id").value=e.id,document.getElementById("stock-tanggal").value=e.tanggal,document.getElementById("stock-total-snack").value=e.total_stock_snack,document.getElementById("stock-total-air").value=e.total_stock_air_mineral,document.getElementById("stock-keterangan").value=e.keterangan||"",t&&(t.textContent="Edit Data Stok"),n&&(n.textContent="Isi form di bawah untuk memperbarui stok snack dan air mineral"),pt(!1),mt()}async function Kn(e){const t=await v(`/stock/${e}`);As(t),j("stock-form-modal")}function zn(e){const t=document.getElementById("stock-delete-copy");S.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus data stok tanggal <strong>${p(e.tanggal)}</strong>? Tindakan ini tidak dapat dibatalkan.`),j("stock-delete-modal")}function Ms(){const e=document.querySelector("[data-stock-page]"),t=document.getElementById("stock-add-btn"),n=document.getElementById("stock-search-input"),a=document.getElementById("stock-form"),r=document.getElementById("stock-table-body"),o=document.getElementById("stock-mobile-list"),s=document.getElementById("stock-delete-confirm-btn"),i=document.getElementById("stock-prev-page-btn"),c=document.getElementById("stock-next-page-btn");if(!(!e||!t||!a||!r))return S.prices.snack=Number(e.dataset.stockSnackPrice||0),S.prices.air=Number(e.dataset.stockAirPrice||0),mt(),t.addEventListener("click",()=>{Jn(),j("stock-form-modal")}),n?.addEventListener("input",Ae(async d=>{S.search=d.target.value.trim(),S.page=1;try{await ve()}catch{h("Gagal memuat data")}})),a.addEventListener("input",d=>{["stock-total-snack","stock-total-air"].includes(d.target.id)&&mt()}),a.addEventListener("submit",async d=>{d.preventDefault();const l={tanggal:document.getElementById("stock-tanggal")?.value||"",total_stock_snack:ut("stock-total-snack"),total_stock_air_mineral:ut("stock-total-air"),keterangan:document.getElementById("stock-keterangan")?.value.trim()||""};pt(!0);try{S.editItem?(await v(`/stock/${S.editItem.id}`,{method:"PUT",body:l}),U("Data stok berhasil diperbarui")):(await v("/stock",{method:"POST",body:l}),U("Data stok berhasil ditambahkan")),K("stock-form-modal"),Jn(),await ve()}catch(k){h(k.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{pt(!1)}}),r.addEventListener("click",async d=>{const l=d.target.closest("[data-stock-edit]"),k=d.target.closest("[data-stock-delete]");try{if(l){await Kn(l.dataset.stockEdit);return}k&&zn({id:k.dataset.stockDelete,tanggal:k.dataset.stockDate})}catch{h("Gagal memuat data")}}),o?.addEventListener("click",async d=>{const l=d.target.closest("[data-stock-edit]"),k=d.target.closest("[data-stock-delete]");try{if(l){await Kn(l.dataset.stockEdit);return}k&&zn({id:k.dataset.stockDelete,tanggal:k.dataset.stockDate})}catch{h("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(S.deleteItem)try{await v(`/stock/${S.deleteItem.id}`,{method:"DELETE"}),U("Data stok berhasil dihapus"),K("stock-delete-modal"),(S.page-1)*Ue>=S.totalCount-1&&S.page>1&&(S.page-=1),S.deleteItem=null,await ve()}catch{h("Gagal menghapus data")}}),i?.addEventListener("click",async()=>{if(!(S.page<=1)){S.page-=1;try{await ve()}catch{h("Gagal memuat data")}}}),c?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil(S.totalCount/Ue));if(!(S.page>=d)){S.page+=1;try{await ve()}catch{h("Gagal memuat data")}}}),ve().catch(()=>{h("Gagal memuat data")})}const Fe=10,_={currentUser:null,data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,defaultRole:"User"};function Rs(e){return["Super Admin","Admin"].includes(e)}function Ps(e){return e==="Super Admin"}function Ds(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function Os(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M2.5 12C4.4 8.2 8 6 12 6C16 6 19.6 8.2 21.5 12C19.6 15.8 16 18 12 18C8 18 4.4 15.8 2.5 12Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function js(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
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
    `}function Ns(){return Ps(_.currentUser?.role)?["Super Admin","Admin","User"]:["Admin","User"]}function gt(e){oe(document.getElementById("admin-user-submit-btn"),e,"Menyimpan...")}function Us(e){return e==="Super Admin"?"admin-users-role-badge admin-users-role-badge-super":e==="Admin"?"admin-users-role-badge admin-users-role-badge-admin":"admin-users-role-badge admin-users-role-badge-user"}function Fs(){const e=document.getElementById("admin-users-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="6" class="admin-users-table-state">
                <div class="admin-users-loading-inline">
                    <span class="admin-users-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function ja(e="Belum ada akun admin atau user."){const t=document.getElementById("admin-users-table-body");t&&(t.innerHTML=`
        <tr>
            <td colspan="6" class="admin-users-table-state admin-users-empty-copy">${p(e)}</td>
        </tr>
    `)}function Wn(){const e=document.getElementById("admin-users-table-body");if(e){if(_.loading){Fs();return}if(_.data.length===0){ja();return}e.innerHTML=_.data.map(t=>`
        <tr class="admin-users-row" data-testid="admin-user-row-${t.id}">
            <td>
                <div class="admin-users-name-cell">
                    <span class="admin-users-avatar" aria-hidden="true">${Ds()}</span>
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
            <td><span class="${Us(t.role)}">${p(t.role)}</span></td>
            <td>
                <div class="admin-users-action-row">
                    <button class="admin-users-icon-button" type="button" data-admin-user-show="${t.id}" data-testid="show-admin-user-${t.id}" aria-label="Lihat detail akun ${p(t.nama)}">
                        ${Os()}
                    </button>
                    <button class="admin-users-icon-button" type="button" data-admin-user-edit="${t.id}" data-testid="edit-admin-user-${t.id}" aria-label="Edit akun ${p(t.nama)}" ${t.can_edit?"":"disabled"}>
                        ${js()}
                    </button>
                    <button class="admin-users-icon-button admin-users-icon-button-danger" type="button" data-admin-user-delete="${t.id}" data-admin-user-name="${p(t.nama)}" data-testid="delete-admin-user-${t.id}" aria-label="Hapus akun ${p(t.nama)}" ${t.can_delete?"":"disabled"}>
                        ${qs()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function Nt(){const e=document.getElementById("admin-users-pagination-shell"),t=document.getElementById("admin-users-pagination-info"),n=document.getElementById("admin-users-pagination-page"),a=document.getElementById("admin-users-prev-page-btn"),r=document.getElementById("admin-users-next-page-btn"),o=Math.max(1,Math.ceil(_.totalCount/Fe));e&&(e.hidden=o<=1),t&&(t.textContent=Me(_.page,Fe,_.totalCount,_.data.length)),n&&(n.textContent=`${_.page} / ${o}`),a&&(a.disabled=_.page===1),r&&(r.disabled=_.page>=o)}async function Ee(){_.loading=!0,Wn(),Nt();try{const e=_.search?`?search=${encodeURIComponent(_.search)}`:"",t=`?page=${_.page}&limit=${Fe}${_.search?`&search=${encodeURIComponent(_.search)}`:""}`,[n,a]=await Promise.all([v(`/admin-users${t}`),v(`/admin-users/count${e}`)]);_.data=Array.isArray(n)?n:[],_.totalCount=Number(a.count||0)}finally{_.loading=!1,Wn(),Nt()}}function qa(e="User"){const t=document.getElementById("admin-user-role");if(!t)return;const n=Ns(),a=n.includes(e)?e:n[0];t.innerHTML=n.map(r=>`
        <option value="${p(r)}" ${r===a?"selected":""}>${p(r)}</option>
    `).join("")}function Na(e){const t=document.getElementById("admin-user-password"),n=document.getElementById("admin-user-password-note");t&&(t.required=!e,t.placeholder=e?"Kosongkan jika tidak ingin mengubah password":"Masukkan password",t.value=""),n&&(n.textContent=e?"Kosongkan password jika tidak ingin mengubah password akun ini.":"Password minimal 6 karakter dan akan disimpan dalam bentuk terenkripsi.")}function Tt(e="User"){const t=document.getElementById("admin-user-form"),n=document.getElementById("admin-user-form-title"),a=document.getElementById("admin-user-form-description"),r=document.getElementById("admin-user-id");t?.reset(),r&&(r.value=""),qa(e),Na(!1),n&&(n.textContent=e==="Admin"?"Tambah Admin Baru":"Tambah User Baru"),a&&(a.textContent=e==="Admin"?"Lengkapi data akun untuk menambahkan admin baru":"Lengkapi data akun untuk menambahkan user baru"),_.defaultRole=e,_.editItem=null,gt(!1)}function Hs(e){_.editItem=e,document.getElementById("admin-user-id").value=e.id,document.getElementById("admin-user-nama").value=e.nama,document.getElementById("admin-user-username").value=e.username,document.getElementById("admin-user-email").value=e.email,qa(e.role),Na(!0),document.getElementById("admin-user-form-title").textContent="Edit Akun",document.getElementById("admin-user-form-description").textContent="Perbarui informasi akun admin atau user di bawah ini",gt(!1)}function Vs(e){const t=document.getElementById("admin-user-detail-list");t&&(t.innerHTML=`
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
            <strong>${p(Vo(e.created_at))}</strong>
        </div>
    `)}async function Gs(e){Vs(await v(`/admin-users/${e}`)),j("admin-user-show-modal")}async function Js(e){Hs(await v(`/admin-users/${e}`)),j("admin-user-form-modal")}function Ks(e){_.deleteItem=e,document.getElementById("admin-user-delete-copy").innerHTML=`Apakah Anda yakin ingin menghapus akun <strong>${p(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`,j("admin-user-delete-modal")}function Xn(){const e=document.getElementById("admin-users-access-note"),t=document.getElementById("admin-users-search-input"),n=document.querySelector(".admin-users-page-actions");e&&(e.hidden=!1,e.textContent="Halaman ini hanya dapat diakses oleh Admin atau Super Admin."),t&&(t.disabled=!0),n&&(n.hidden=!0),_.loading=!1,_.data=[],_.totalCount=0,ja("Anda tidak memiliki akses untuk mengelola data admin dan user."),Nt()}function zs({user:e}={}){const t=document.getElementById("admin-users-add-admin-btn"),n=document.getElementById("admin-users-add-user-btn"),a=document.getElementById("admin-users-search-input"),r=document.getElementById("admin-user-form"),o=document.getElementById("admin-users-table-body"),s=document.getElementById("admin-user-delete-confirm-btn"),i=document.getElementById("admin-users-prev-page-btn"),c=document.getElementById("admin-users-next-page-btn");if(!(!t||!n||!r||!o)){if(_.currentUser=e||window.transitAuthUser||null,!Rs(_.currentUser?.role)){Xn();return}return t.addEventListener("click",()=>{Tt("Admin"),j("admin-user-form-modal")}),n.addEventListener("click",()=>{Tt("User"),j("admin-user-form-modal")}),a?.addEventListener("input",Ae(async d=>{_.search=d.target.value.trim(),_.page=1;try{await Ee()}catch(l){h(l.message||"Gagal memuat data akun")}})),r.addEventListener("submit",async d=>{d.preventDefault();const l={nama:document.getElementById("admin-user-nama")?.value.trim()||"",username:document.getElementById("admin-user-username")?.value.trim()||"",email:document.getElementById("admin-user-email")?.value.trim()||"",password:document.getElementById("admin-user-password")?.value||"",role:document.getElementById("admin-user-role")?.value||"User"};gt(!0);try{_.editItem?(await v(`/admin-users/${_.editItem.id}`,{method:"PUT",body:l}),U("Akun berhasil diperbarui")):(await v("/admin-users",{method:"POST",body:l}),U(l.role==="Admin"?"Admin berhasil ditambahkan":"User berhasil ditambahkan")),K("admin-user-form-modal"),Tt(_.defaultRole),await Ee()}catch(k){h(k.message||"Silakan periksa kembali data yang diinput","Gagal menyimpan akun")}finally{gt(!1)}}),o.addEventListener("click",async d=>{const l=d.target.closest("[data-admin-user-show]"),k=d.target.closest("[data-admin-user-edit]"),y=d.target.closest("[data-admin-user-delete]");try{if(l){await Gs(l.dataset.adminUserShow);return}if(k){await Js(k.dataset.adminUserEdit);return}y&&Ks({id:y.dataset.adminUserDelete,nama:y.dataset.adminUserName})}catch(A){h(A.message||"Gagal memuat detail akun")}}),s?.addEventListener("click",async()=>{if(_.deleteItem)try{await v(`/admin-users/${_.deleteItem.id}`,{method:"DELETE"}),U("Akun berhasil dihapus"),K("admin-user-delete-modal"),(_.page-1)*Fe>=_.totalCount-1&&_.page>1&&(_.page-=1),_.deleteItem=null,await Ee()}catch(d){h(d.message||"Gagal menghapus akun")}}),i?.addEventListener("click",async()=>{if(!(_.page<=1)){_.page-=1;try{await Ee()}catch(d){h(d.message||"Gagal memuat data akun")}}}),c?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil(_.totalCount/Fe));if(!(_.page>=d)){_.page+=1;try{await Ee()}catch(l){h(l.message||"Gagal memuat data akun")}}}),Ee().catch(d=>{if(d.status===403){Xn();return}h(d.message||"Gagal memuat data akun")})}}const Zn=[{value:"05:00",label:"Subuh",time:"05.00 WIB"},{value:"08:00",label:"Pagi",time:"08.00 WIB"},{value:"10:00",label:"Pagi",time:"10.00 WIB"},{value:"14:00",label:"Siang",time:"14.00 WIB"},{value:"16:00",label:"Sore",time:"16.00 WIB"},{value:"19:00",label:"Malam",time:"19.00 WIB"}],Ua=[[{code:"1A",label:"1A"},{code:"SOPIR",label:"SOPIR",isDriver:!0}],[{code:"2A",label:"2A"},{code:"3A",label:"3A"}],[{code:"4A",label:"4A"},{code:"5A",label:"5A"}]],Qn=Ua.flat().filter(e=>!e.isDriver).length,f={currentUser:null,date:ze(),direction:"from_pkb",bookings:[],loading:!1,drivers:[],mobils:[],formOptions:null,selectedSeats:[],passengerDraftMap:{},editItem:null,deleteItem:null,slotDriverMap:{},slotMobilMap:{},occupiedSeatsForForm:[],occupiedSeatsForPackageForm:[],slotExtraArmadas:{},currentFormArmadaIndex:1,_pendingChoiceArmada:1,_pendingChoiceTime:""};function At(e){const t=document.getElementById(e);if(!t)return null;try{return JSON.parse(t.textContent||"{}")}catch{return null}}function Ws(e){return["Super Admin","Admin"].includes(e)}function Xs(e){const t=e?"#dc2626":"#166534",n=e?"#991b1b":"#14532d";return`
        <svg viewBox="0 0 50 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="2" width="30" height="20" rx="8" fill="${t}" stroke="${n}" stroke-width="1.5"/>
            <rect x="5" y="18" width="40" height="28" rx="9" fill="${t}" stroke="${n}" stroke-width="1.5"/>
            <rect x="7" y="44" width="36" height="14" rx="7" fill="${t}" stroke="${n}" stroke-width="1.5" opacity="0.8"/>
            <rect x="2" y="22" width="5" height="18" rx="2.5" fill="${t}" opacity="0.6"/>
            <rect x="43" y="22" width="5" height="18" rx="2.5" fill="${t}" opacity="0.6"/>
        </svg>`}function Zs(){return`
        <svg viewBox="0 0 50 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="25" cy="30" r="18" stroke="rgba(148,163,184,0.5)" stroke-width="2.5"/>
            <circle cx="25" cy="30" r="6" fill="rgba(148,163,184,0.4)"/>
            <line x1="25" y1="12" x2="25" y2="24" stroke="rgba(148,163,184,0.5)" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="7" y1="30" x2="19" y2="30" stroke="rgba(148,163,184,0.5)" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="31" y1="30" x2="43" y2="30" stroke="rgba(148,163,184,0.5)" stroke-width="2.5" stroke-linecap="round"/>
        </svg>`}function Qs(){return'<svg viewBox="0 0 24 24" fill="none"><path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path><path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg>'}function Ys(){return'<svg viewBox="0 0 24 24" fill="none"><path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg>'}function Yn(){return'<svg viewBox="0 0 24 24" fill="none" style="width:12px;height:12px;flex-shrink:0;"><path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'}function ei(){return'<svg viewBox="0 0 24 24" fill="none" style="width:12px;height:12px;flex-shrink:0;"><rect x="2" y="7" width="15" height="10" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M17 10H20L22 13V17H17V10Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="6" cy="18" r="1.5" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="18" r="1.5" stroke="currentColor" stroke-width="1.5"/></svg>'}function ti(){return'<svg viewBox="0 0 24 24" fill="none" style="width:12px;height:12px;flex-shrink:0;"><path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 2V8H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 13H16M8 17H13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'}function ni(e){return`
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
                    ${Ua.map(n=>`<div class="bpg-seat-row">${n.map(r=>{if(r.isDriver)return`
                    <div class="bpg-seat-item bpg-seat-driver" title="Sopir / Pengemudi">
                        <div class="bpg-seat-icon">${Zs()}</div>
                        <span class="bpg-seat-label">SOPIR</span>
                    </div>`;const o=e[r.code],s=!!o,i=s?"bpg-seat-occupied":"bpg-seat-available",c=s?p(o.nama_pemesanan||"-"):"";return`
                <div class="bpg-seat-item ${i}" title="${s?c:"Tersedia"}">
                    <div class="bpg-seat-icon">${Xs(s)}</div>
                    <span class="bpg-seat-label">${r.label}</span>
                    ${s?`<span class="bpg-seat-name">${c}</span>`:""}
                </div>`}).join("")}</div>`).join("")}
                </div>
            </div>
        </div>`}function ai(e){if(e.length===0)return`
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
                </div>
                <div class="bpg-passenger-item-actions-row">
                    <span class="${p(r.payment_status_badge_class||"stock-value-badge stock-value-badge-blue")} bpg-status-sm">${p(r.payment_status||"-")}</span>
                    <div class="bpg-depart-dropdown" data-depart-dropdown="${p(String(r.id))}">
                        <button class="bpg-depart-trigger ${i.cls}" type="button" data-depart-toggle="${p(String(r.id))}">
                            <svg viewBox="0 0 24 24" fill="none" style="width:11px;height:11px;flex-shrink:0;"><circle cx="12" cy="12" r="2.5" fill="currentColor"/><circle cx="12" cy="5" r="2" fill="currentColor"/><circle cx="12" cy="19" r="2" fill="currentColor"/></svg>
                            ${p(i.label)}
                            <svg viewBox="0 0 24 24" fill="none" style="width:10px;height:10px;flex-shrink:0;"><path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </button>
                        <div class="bpg-depart-menu" hidden>
                            ${c}
                        </div>
                    </div>
                    <div style="flex:1;"></div>
                    <button class="bpg-lihat-btn" type="button" data-booking-lihat="${p(String(r.id))}" aria-label="Lihat detail ${p(r.nama_pemesanan)}">
                        <svg viewBox="0 0 24 24" fill="none" style="width:13px;height:13px;"><path d="M2.5 12C4.4 8.2 8 6 12 6C16 6 19.6 8.2 21.5 12C19.6 15.8 16 18 12 18C8 18 4.4 15.8 2.5 12Z" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/></svg>
                        Lihat
                    </button>
                    <button class="admin-users-icon-button" type="button" data-booking-edit="${p(String(r.id))}" title="Edit pemesanan">
                        ${Qs()}
                    </button>
                    <button class="admin-users-icon-button admin-users-icon-button-danger" type="button" data-booking-delete="${p(String(r.id))}" data-booking-name="${p(r.nama_pemesanan)}" title="Hapus pemesanan">
                        ${Ys()}
                    </button>
                </div>
            </div>`}).join("")}
        </div>`}function ri(e){const t={};return e.forEach(n=>{(Array.isArray(n.selected_seats)?n.selected_seats:[]).forEach(r=>{t[r]||(t[r]=n)})}),t}function oi(e,t,n,a){const r=ri(n),o=n.reduce((g,E)=>g+(Number(E.passenger_count)||0),0),s=o>=Qn,i=`${e.value}__${f.direction}__${t}`;if(!f.slotDriverMap[i]){const g=n.find(E=>E.driver_id);g&&(f.slotDriverMap[i]=g.driver_id)}const c=f.slotDriverMap[i]||"",d=f.slotMobilMap[i]||"",l=s?"stock-value-badge-red":"stock-value-badge-yellow",k=f.drivers.map(g=>{const E=g.lokasi?`${g.nama} (${g.lokasi})`:g.nama;return`<option value="${p(g.id)}" ${c===g.id?"selected":""}>${p(E)}</option>`}).join(""),y=f.mobils.map(g=>{const E=`${g.kode_mobil} — ${g.jenis_mobil}`;return`<option value="${p(g.id)}" ${d===g.id?"selected":""}>${p(E)}</option>`}).join(""),A=[...new Set(n.map(g=>(g.service_type||"").trim()).filter(Boolean))],m=a>1?`<span class="bpg-armada-badge">${ei()} Armada ${t}</span>`:"",b=s?`<button class="bpg-add-armada-btn" type="button"
                data-add-armada="${p(e.value)}"
                data-armada-index="${t}"
                title="Tambah armada ke-${t+1} untuk jadwal ${p(e.time)}">
                ${Yn()}
                Tambah Armada
            </button>`:"";return`
        <article class="bpg-slot-card" data-slot="${p(e.value)}" data-direction="${p(f.direction)}" data-armada="${t}">
            <div class="bpg-slot-head">
                <div class="bpg-slot-head-row">
                    <div class="bpg-slot-time-badge">
                        <span class="bpg-slot-period">${p(e.label)}</span>
                        <strong class="bpg-slot-time">${p(e.time)}</strong>
                    </div>
                    <div class="bpg-slot-head-meta">
                        ${m}
                        <div class="bpg-slot-service-types">
                            ${A.length>0?A.map(g=>`<span class="bpg-service-badge">${p(g)}</span>`).join(""):'<span class="bpg-service-badge bpg-service-badge--empty">Belum ada layanan</span>'}
                        </div>
                        <span class="stock-value-badge ${l}">${o} / ${Qn} Kursi</span>
                    </div>
                </div>
                ${b?`<div class="bpg-slot-head-row">${b}</div>`:""}
            </div>

            ${ni(r)}

            <div class="bpg-slot-assignment">
                <div class="bpg-slot-select-group">
                    <label>
                        <svg viewBox="0 0 24 24" fill="none" style="width:13px;height:13px;"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/><path d="M4 20C4 17.2386 7.58172 15 12 15C16.4183 15 20 17.2386 20 20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
                        Pilih Driver
                    </label>
                    <select class="bpg-slot-select" data-slot-driver="${p(e.value)}__${t}">
                        <option value="">— Belum ditentukan —</option>
                        ${k}
                    </select>
                </div>
                <div class="bpg-slot-select-group">
                    <label>
                        <svg viewBox="0 0 24 24" fill="none" style="width:13px;height:13px;"><rect x="2" y="7" width="20" height="10" rx="3" stroke="currentColor" stroke-width="1.8"/><circle cx="6" cy="17" r="2" stroke="currentColor" stroke-width="1.8"/><circle cx="18" cy="17" r="2" stroke="currentColor" stroke-width="1.8"/></svg>
                        Pilih Mobil
                    </label>
                    <select class="bpg-slot-select" data-slot-mobil="${p(e.value)}__${t}">
                        <option value="">— Belum ditentukan —</option>
                        ${y}
                    </select>
                </div>
            </div>

            ${ai(n)}

            <button class="bpg-slot-book-btn" type="button"
                data-slot-book="${p(e.value)}"
                data-slot-armada="${t}"
                title="Tambah pemesanan untuk Armada ${t}, jadwal ${p(e.time)}">
                ${Yn()}
                Tambah Pemesanan Armada ${t}
            </button>
            <button class="bpg-surat-jalan-btn" type="button"
                data-surat-jalan="${p(e.value)}"
                data-surat-jalan-armada="${t}"
                title="Buat Surat Jalan Armada ${t}, jadwal ${p(e.time)}">
                ${ti()}
                Surat Jalan
            </button>
        </article>`}function si(e,t){const n={};t.forEach(c=>{const d=c.armada_index||1;n[d]||(n[d]=[]),n[d].push(c)});const a=`${e.value}__${f.direction}`,r=t.length>0?Math.max(...Object.keys(n).map(Number)):1,o=f.slotExtraArmadas[a]||1,s=Math.max(r,o),i=[];for(let c=1;c<=s;c++)i.push(oi(e,c,n[c]||[],s));return`<div class="bpg-slot-group" data-slot-group="${p(e.value)}">${i.join("")}</div>`}function ii(){const e=document.getElementById("bpg-slots-shell");e&&(e.innerHTML=`
            <div class="admin-users-loading-inline" style="padding:40px 0;">
                <span class="admin-users-loading-inline-spinner" aria-hidden="true"></span>
                <span>Memuat data penumpang...</span>
            </div>`)}function Fa(){const e=document.getElementById("bpg-slots-shell");if(!e)return;const t={};Zn.forEach(a=>{t[a.value]=[]}),f.bookings.forEach(a=>{const o=(a.trip_time||"").trim().substring(0,5);t[o]&&t[o].push(a)});const n=Zn.map(a=>si(a,t[a.value]||[]));e.innerHTML=`<div class="bpg-slots-grid">${n.join("")}</div>`}async function we(){f.loading=!0,ii();try{const e=new URLSearchParams({date:f.date,direction:f.direction,limit:200,page:1}),[t,n]=await Promise.all([v(`/bookings?${e}`),v(`/bookings/armada-extras?date=${f.date}`).catch(()=>({}))]);f.bookings=Array.isArray(t)?t:[],n&&typeof n=="object"&&Object.entries(n).forEach(([a,r])=>{const o=`${a}__${f.direction}`;f.slotExtraArmadas[o]=Math.max(f.slotExtraArmadas[o]||1,Number(r)||1)})}catch(e){f.bookings=[],e.status!==403&&h(e.message||"Gagal memuat data penumpang")}finally{f.loading=!1,Fa()}}function di(e){document.getElementById("bpg-detail-title").textContent=e.nama_pemesanan||"-",document.getElementById("bpg-detail-subtitle").textContent=`${e.booking_code||"-"} · ${e.booking_status||"-"}`,document.getElementById("bpg-detail-full-link").href=`/dashboard/bookings/${e.id}`;const t=e.category==="Paket",n=document.getElementById("bpg-detail-ticket-link"),a=document.getElementById("bpg-detail-surat-link");t?(n.hidden=!0,a.hidden=!1,a.href=`/dashboard/bookings/${e.id}/surat-bukti`):(n.hidden=!1,n.href=`/dashboard/bookings/${e.id}/ticket`,a.hidden=!0);const r=document.getElementById("bpg-detail-body");r.innerHTML=`
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
                <span>Armada</span>
                <strong>Armada ${p(String(e.armada_index||1))}</strong>
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
        </div>`,j("bpg-detail-modal")}function li(){return(f.formOptions?.seat_options||[]).map(e=>e.code)}function rn(e){const t=new Map(li().map((n,a)=>[n,a]));return Array.from(new Set((e||[]).map(n=>String(n).trim()).filter(n=>t.has(n)))).sort((n,a)=>(t.get(n)??999)-(t.get(a)??999))}function Bt(){return Number(document.getElementById("booking-passenger-count")?.value||0)}function ci(){const e=Bt();return(f.formOptions?.seat_options||[]).filter(t=>!t.is_optional||e>=6).map(t=>t.code)}function ui(){return f.formOptions?.payment_status_options||[]}function mi(e){return e==="transfer"?["Belum Bayar","Menunggu Pembayaran","Menunggu Verifikasi","Dibayar"]:e==="qris"?["Belum Bayar","Menunggu Pembayaran","Dibayar"]:e==="cash"?["Belum Bayar","Dibayar Tunai"]:["Belum Bayar"]}function pi(e){return e==="transfer"?"Menunggu Pembayaran":e==="qris"?"Dibayar":e==="cash"?"Dibayar Tunai":"Belum Bayar"}function gi(e){return e==="transfer"?"Menunggu Verifikasi Pembayaran":e==="qris"||e==="cash"?"Diproses":"Draft"}function fi(e,t){if(!e||!t||e===t)return null;const a=(f.formOptions?.route_matrix||{})?.[e]?.[t];return a==null?null:Number(a)}function Ha(){return Math.max(0,parseInt(document.getElementById("booking-additional-fare")?.value||"0",10)||0)}function Ie(){const e=document.getElementById("booking-from-city")?.value||"",t=document.getElementById("booking-to-city")?.value||"",n=Bt(),a=fi(e,t),r=Ha(),o=a!==null?a+r:null,s=o!==null?o*n:null,i=document.getElementById("booking-price-per-seat"),c=document.getElementById("booking-total-amount");i&&(i.value=a!==null?N(a):""),c&&(c.value=s!==null?N(s):"")}function on(){const e=document.getElementById("booking-payment-method")?.value||"",t=document.getElementById("booking-payment-status"),n=document.getElementById("booking-booking-status"),a=document.getElementById("booking-bank-account-group"),r=document.getElementById("booking-bank-account-code"),o=mi(e),s=t?.value||"";a&&(a.hidden=e!=="transfer"),r&&e!=="transfer"&&(r.value=""),t&&(t.innerHTML=ui().filter(i=>o.includes(i.value)).map(i=>`<option value="${p(i.value)}">${p(i.label)}</option>`).join(""),t.value=o.includes(s)?s:pi(e)),n&&(n.value=gi(e))}function bi(){const e=document.getElementById("booking-selected-seats-inputs");e&&(e.innerHTML=f.selectedSeats.map(t=>`<input type="hidden" name="selected_seats[]" value="${p(t)}">`).join(""))}function ki(){const e=document.getElementById("booking-selected-seat-count"),t=document.getElementById("booking-selected-seat-label");e&&(e.textContent=String(f.selectedSeats.length)),t&&(t.textContent=f.selectedSeats.length>0?f.selectedSeats.join(", "):"Belum dipilih")}function Ut(){document.querySelectorAll("[data-passenger-seat]").forEach(e=>{const t=e.dataset.passengerSeat;t&&(f.passengerDraftMap[t]={seat_no:t,name:e.querySelector("[data-passenger-name]")?.value.trim()||"",phone:e.querySelector("[data-passenger-phone]")?.value.trim()||""})})}function de(e=null){const t=document.getElementById("booking-passenger-editor");if(t){if(e&&(f.passengerDraftMap=Object.fromEntries(e.map(n=>[n.seat_no,n]))),f.selectedSeats.length===0){t.innerHTML='<div class="dashboard-empty-state dashboard-empty-state--block bookings-passenger-empty">Pilih kursi terlebih dahulu untuk menampilkan form data penumpang.</div>';return}t.innerHTML=`
        <div class="bookings-passenger-grid bookings-passenger-grid--editor">
            ${f.selectedSeats.map((n,a)=>{const r=f.passengerDraftMap[n]||{name:"",phone:""};return`
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
        </div>`}}async function Se(){const e=document.getElementById("booking-trip-date")?.value||"",t=document.getElementById("booking-trip-time")?.value||"",n=document.getElementById("booking-from-city")?.value||"",a=document.getElementById("booking-to-city")?.value||"",r=f.editItem?.id||"",o=f.currentFormArmadaIndex||1;if(!e||!t){f.occupiedSeatsForForm=[];return}try{const s=new URLSearchParams({trip_date:e,trip_time:t,armada_index:o});n&&s.set("from_city",n),a&&s.set("to_city",a),r&&s.set("exclude_id",r);const i=await v(`/bookings/occupied-seats?${s}`);f.occupiedSeatsForForm=Array.isArray(i?.occupied_seats)?i.occupied_seats:[]}catch{f.occupiedSeatsForForm=[]}}async function Oe(){const e=document.getElementById("pkg-trip-date")?.value||"",t=document.getElementById("pkg-trip-time")?.value||"",n=document.getElementById("pkg-from-city")?.value||"",a=document.getElementById("pkg-to-city")?.value||"",r=parseInt(document.getElementById("package-armada-index")?.value||"1",10);if(!e||!t){f.occupiedSeatsForPackageForm=[],ea();return}try{const o=new URLSearchParams({trip_date:e,trip_time:t,armada_index:r});n&&o.set("from_city",n),a&&o.set("to_city",a);const s=await v(`/bookings/occupied-seats?${o}`);f.occupiedSeatsForPackageForm=Array.isArray(s?.occupied_seats)?s.occupied_seats:[]}catch{f.occupiedSeatsForPackageForm=[]}ea()}function ea(){const e=document.getElementById("pkg-seat-code");if(!e)return;const t=(f.formOptions?.seat_options||[]).filter(r=>!r.is_optional),n=f.occupiedSeatsForPackageForm||[],a=e.value;e.innerHTML='<option value="">Pilih kursi</option>'+t.map(r=>{const o=n.includes(r.code);return`<option value="${p(r.code)}"${o?" disabled":""}>${p(r.label)}${o?" — Sudah dipesan":""}</option>`}).join(""),a&&!n.includes(a)&&(e.value=a)}function le(){const e=document.querySelectorAll("[data-seat-code]"),t=Bt(),n=ci();f.selectedSeats=rn(f.selectedSeats.filter(a=>n.includes(a)&&!f.occupiedSeatsForForm.includes(a))),e.forEach(a=>{const r=a.dataset.seatCode,o=n.includes(r),s=f.occupiedSeatsForForm.includes(r),i=f.selectedSeats.includes(r),c=f.selectedSeats.length>=t&&!i;a.hidden=!o,a.classList.toggle("is-selected",i),a.classList.toggle("is-occupied",s),a.classList.toggle("is-disabled",!s&&c),a.disabled=!o||s||!i&&c,s?a.title="Kursi sudah dipesan":a.title=""}),bi(),ki()}function Mt(e=1,t=""){document.getElementById("booking-form")?.reset(),f.editItem=null,f.selectedSeats=[],f.passengerDraftMap={},f.currentFormArmadaIndex=e;const a=f.date||ze();document.getElementById("booking-id").value="",document.getElementById("booking-armada-index").value=String(e),document.getElementById("booking-form-title").textContent="Tambah Pemesanan";const r=e>1?` (Armada ${e})`:"";document.getElementById("booking-form-description").textContent=`Lengkapi data pemesanan reguler dari dashboard admin${r}.`,document.getElementById("booking-trip-date").value=a,t&&(document.getElementById("booking-trip-time").value=t),document.getElementById("booking-passenger-count").value="1",document.getElementById("booking-additional-fare").value="0",document.getElementById("booking-payment-method").value="",document.getElementById("booking-booking-status").value="Draft",on(),Ie(),oe(document.getElementById("booking-submit-btn"),!1,"Menyimpan..."),Se().then(()=>{le(),de()})}function hi(e){f.editItem=e,f.selectedSeats=rn(e.selected_seats||[]),f.passengerDraftMap=Object.fromEntries((e.passengers||[]).map(n=>[n.seat_no,n])),f.currentFormArmadaIndex=e.armada_index||1,document.getElementById("booking-id").value=e.id,document.getElementById("booking-armada-index").value=String(e.armada_index||1),document.getElementById("booking-booking-for").value=e.booking_for,document.getElementById("booking-category").value=e.category,document.getElementById("booking-from-city").value=e.from_city,document.getElementById("booking-to-city").value=e.to_city,document.getElementById("booking-trip-date").value=e.trip_date_value,document.getElementById("booking-trip-time").value=e.trip_time_value,document.getElementById("booking-passenger-count").value=String(e.passenger_count),document.getElementById("booking-driver-name").value=e.driver_name==="Menunggu Penetapan Driver"?"":e.driver_name||"",document.getElementById("booking-additional-fare").value=String(e.additional_fare_per_passenger||0),document.getElementById("booking-pickup-location").value=e.pickup_location,document.getElementById("booking-dropoff-location").value=e.dropoff_location,document.getElementById("booking-payment-method").value=e.payment_method_value||"",on(),document.getElementById("booking-payment-status").value=e.payment_status,document.getElementById("booking-booking-status").value=e.booking_status,document.getElementById("booking-bank-account-code").value=e.bank_account_code||"",document.getElementById("booking-notes").value=e.notes||"";const t=(e.armada_index||1)>1?` (Armada ${e.armada_index})`:"";document.getElementById("booking-form-title").textContent="Edit Pemesanan",document.getElementById("booking-form-description").textContent=`Perbarui data pemesanan reguler yang dipilih${t}.`,Ie(),oe(document.getElementById("booking-submit-btn"),!1,"Menyimpan..."),Se().then(()=>{le(),de(e.passengers||[])})}function yi(){return Ut(),{booking_for:document.getElementById("booking-booking-for")?.value||"",category:document.getElementById("booking-category")?.value||"Reguler",from_city:document.getElementById("booking-from-city")?.value||"",to_city:document.getElementById("booking-to-city")?.value||"",trip_date:document.getElementById("booking-trip-date")?.value||"",trip_time:document.getElementById("booking-trip-time")?.value||"",passenger_count:Number(document.getElementById("booking-passenger-count")?.value||0),driver_name:document.getElementById("booking-driver-name")?.value.trim()||"",additional_fare_per_passenger:Ha(),pickup_location:document.getElementById("booking-pickup-location")?.value.trim()||"",dropoff_location:document.getElementById("booking-dropoff-location")?.value.trim()||"",selected_seats:f.selectedSeats,passengers:f.selectedSeats.map(e=>({seat_no:e,name:f.passengerDraftMap?.[e]?.name||"",phone:f.passengerDraftMap?.[e]?.phone||""})),payment_method:document.getElementById("booking-payment-method")?.value||"",payment_status:document.getElementById("booking-payment-status")?.value||"Belum Bayar",booking_status:document.getElementById("booking-booking-status")?.value||"Draft",bank_account_code:document.getElementById("booking-bank-account-code")?.value||"",notes:document.getElementById("booking-notes")?.value.trim()||"",armada_index:f.currentFormArmadaIndex||1}}async function vi(e){hi(await v(`/bookings/${e}`)),j("booking-form-modal")}function Ei(e){f.deleteItem=e,document.getElementById("booking-delete-copy").innerHTML=`Apakah Anda yakin ingin menghapus data pemesanan <strong>${p(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`,j("booking-delete-modal")}function ta(){const e=document.getElementById("bookings-access-note"),t=document.getElementById("bpg-route-tabs"),n=document.getElementById("bpg-slots-shell");e&&(e.hidden=!1),t&&(t.hidden=!0),n&&(n.hidden=!0)}function wi(e){return e==="Berangkat"?{label:"Berangkat",cls:"bpg-depart-trigger--go"}:e==="Tidak Berangkat"?{label:"Tidak Berangkat",cls:"bpg-depart-trigger--no"}:e==="Di Oper"?{label:"Di Oper",cls:"bpg-depart-trigger--oper"}:{label:"Status",cls:""}}function Bi({user:e}={}){const t=document.getElementById("bookings-add-btn"),n=document.getElementById("bookings-date-picker"),a=document.getElementById("bpg-route-tabs"),r=document.getElementById("bpg-slots-shell"),o=document.getElementById("booking-form"),s=document.getElementById("booking-delete-confirm-btn"),i=document.getElementById("booking-seat-grid"),c=document.getElementById("booking-passenger-editor"),d=document.getElementById("booking-payment-method");if(f.formOptions=At("bookings-form-options"),f.drivers=At("bookings-drivers-data")||[],f.mobils=At("bookings-mobils-data")||[],f.currentUser=e||window.transitAuthUser||null,f.date=ze(),!Ws(f.currentUser?.role)){ta();return}r&&(r.hidden=!1);const l=document.getElementById("bookings-access-note");l&&(l.hidden=!0),n&&(n.value=f.date,n.addEventListener("change",async()=>{f.date=n.value,f.slotDriverMap={},f.slotMobilMap={},f.slotExtraArmadas={},await we()})),a?.addEventListener("click",async m=>{const b=m.target.closest("[data-direction]");if(!b)return;const g=b.dataset.direction;g!==f.direction&&(f.direction=g,f.slotDriverMap={},f.slotMobilMap={},f.slotExtraArmadas={},document.querySelectorAll(".bpg-route-tab").forEach(E=>{E.classList.toggle("is-active",E.dataset.direction===g)}),await we())});function k(m=null){r?.querySelectorAll("[data-depart-dropdown]").forEach(b=>{String(b.dataset.departDropdown)!==String(m)&&(b.querySelector(".bpg-depart-menu")?.removeAttribute("hidden"),b.querySelector(".bpg-depart-menu")?.setAttribute("hidden",""))})}document.addEventListener("click",m=>{m.target.closest("[data-depart-dropdown]")||k()}),r?.addEventListener("click",async m=>{const b=m.target.closest("[data-depart-toggle]"),g=m.target.closest("[data-booking-departure]"),E=m.target.closest("[data-booking-lihat]"),P=m.target.closest("[data-booking-edit]"),L=m.target.closest("[data-booking-delete]"),R=m.target.closest("[data-add-armada]"),D=m.target.closest("[data-slot-book]"),V=m.target.closest("[data-surat-jalan]");try{if(b){const M=b.dataset.departToggle,G=r.querySelector(`[data-depart-dropdown="${CSS.escape(M)}"]`)?.querySelector(".bpg-depart-menu");if(!G)return;const z=G.hasAttribute("hidden");k(M),G.toggleAttribute("hidden",!z);return}if(g){const M=g.dataset.bookingDeparture,F=g.dataset.departureStatus,G=f.bookings.find($=>String($.id)===String(M));if(!G)return;const z=G.departure_status===F?"":F;G.departure_status=z;const W=r.querySelector(`[data-depart-dropdown="${CSS.escape(M)}"]`);if(W){const $=W.querySelector(".bpg-depart-trigger"),q=wi(z);$.className=`bpg-depart-trigger ${q.cls}`,$.childNodes.forEach(H=>{H.nodeType===3&&(H.textContent=q.label)}),W.querySelectorAll("[data-booking-departure]").forEach(H=>{H.classList.toggle("is-active",H.dataset.departureStatus===z)}),W.querySelector(".bpg-depart-menu")?.setAttribute("hidden","")}await v(`/bookings/${M}/departure-status`,{method:"PATCH",body:{departure_status:z}});return}if(E){const M=E.dataset.bookingLihat,F=f.bookings.find(G=>String(G.id)===String(M));F&&di(F);return}if(P){await vi(P.dataset.bookingEdit);return}if(L){Ei({id:L.dataset.bookingDelete,nama:L.dataset.bookingName});return}if(R){const M=R.dataset.addArmada,G=parseInt(R.dataset.armadaIndex||"1")+1,z=`${M}__${f.direction}`;f.slotExtraArmadas[z]=Math.max(f.slotExtraArmadas[z]||1,G),v("/bookings/armada-extras",{method:"POST",body:{trip_date:f.date,trip_time:M,armada_index:G}}).catch(()=>{}),Fa(),f._pendingChoiceArmada=G,f._pendingChoiceTime=M,j("booking-type-choice-modal");return}if(D){const M=D.dataset.slotBook,F=parseInt(D.dataset.slotArmada||"1");f._pendingChoiceArmada=F,f._pendingChoiceTime=M,j("booking-type-choice-modal");return}if(V){const M=V.dataset.suratJalan,F=parseInt(V.dataset.suratJalanArmada||"1"),G=`${M}__${f.direction}__${F}`,z=f.slotDriverMap[G]||"",W=f.slotMobilMap[G]||"",$=z?f.drivers.find(re=>String(re.id)===String(z)):null,q=W?f.mobils.find(re=>String(re.id)===String(W)):null,H=new URLSearchParams({date:f.date,trip_time:M,armada_index:String(F),direction:f.direction});$&&H.set("driver_name",$.nama),q&&H.set("no_pol",q.kode_mobil),window.open(`/dashboard/bookings/surat-jalan?${H}`,"_blank");return}}catch(M){h(M.message||"Gagal memuat data pemesanan")}}),r?.addEventListener("change",async m=>{const b=m.target.closest("[data-slot-driver]"),g=m.target.closest("[data-slot-mobil]");if(b){const[E,P]=b.dataset.slotDriver.split("__"),L=parseInt(P||"1"),R=b.value,D=b.options[b.selectedIndex],V=R&&D?.text.split(" (")[0]||"",M=`${E}__${f.direction}__${L}`;f.slotDriverMap[M]=R;try{await v("/bookings/slot-assign",{method:"PATCH",body:{trip_date:f.date,trip_time:E,direction:f.direction,armada_index:L,driver_id:R||null,driver_name:V}}),U("Driver berhasil diperbarui")}catch(F){h(F.message||"Gagal memperbarui driver")}}if(g){const[E,P]=g.dataset.slotMobil.split("__"),L=parseInt(P||"1"),R=g.value,D=`${E}__${f.direction}__${L}`;f.slotMobilMap[D]=R}});function y(m=1,b=""){const g=document.getElementById("package-form");g&&g.reset();const E=document.getElementById("package-armada-index");E&&(E.value=String(m));const P=document.getElementById("pkg-trip-date");P&&(P.value=f.date);const L=document.getElementById("pkg-trip-time");L&&b&&(L.value=b);const R=document.getElementById("pkg-bank-account-group");R&&(R.hidden=!0);const D=document.getElementById("pkg-seat-group");D&&(D.hidden=!0);const V=document.getElementById("package-form-success-banner");V&&(V.hidden=!0),A(),Oe()}function A(){const m=parseInt(document.getElementById("pkg-fare-amount")?.value||"0",10)||0,b=parseInt(document.getElementById("pkg-additional-fare")?.value||"0",10)||0,g=parseInt(document.getElementById("pkg-item-qty")?.value||"1",10)||1,E=(m+b)*g,P=document.getElementById("pkg-total-display");P&&(P.value=E>0?"Rp "+E.toLocaleString("id-ID"):"")}return document.getElementById("pkg-fare-amount")?.addEventListener("input",A),document.getElementById("pkg-additional-fare")?.addEventListener("input",A),document.getElementById("pkg-item-qty")?.addEventListener("input",A),document.getElementById("pkg-payment-method")?.addEventListener("change",m=>{const b=document.getElementById("pkg-bank-account-group");b&&(b.hidden=m.target.value!=="transfer")}),document.getElementById("pkg-package-size")?.addEventListener("change",m=>{const b=document.getElementById("pkg-seat-group");b&&(b.hidden=m.target.value!=="Besar");const g=document.getElementById("pkg-seat-code");g&&m.target.value!=="Besar"&&(g.value="")}),document.getElementById("pkg-trip-date")?.addEventListener("change",()=>{Oe()}),document.getElementById("pkg-trip-time")?.addEventListener("change",()=>{Oe()}),document.getElementById("pkg-from-city")?.addEventListener("change",()=>{Oe()}),document.getElementById("pkg-to-city")?.addEventListener("change",()=>{Oe()}),document.getElementById("package-form")?.addEventListener("submit",async m=>{m.preventDefault();const b=document.getElementById("package-submit-btn");oe(b,!0,"Menyimpan...");try{const g=parseInt(document.getElementById("pkg-fare-amount")?.value||"0",10)||0,E=parseInt(document.getElementById("pkg-additional-fare")?.value||"0",10)||0,P=parseInt(document.getElementById("pkg-item-qty")?.value||"1",10)||1,L=document.getElementById("pkg-payment-method")?.value||"",R={armada_index:parseInt(document.getElementById("package-armada-index")?.value||"1",10),trip_date:document.getElementById("pkg-trip-date")?.value||"",trip_time:document.getElementById("pkg-trip-time")?.value||"",from_city:document.getElementById("pkg-from-city")?.value||"",to_city:document.getElementById("pkg-to-city")?.value||"",sender_name:document.getElementById("pkg-sender-name")?.value.trim()||"",sender_phone:document.getElementById("pkg-sender-phone")?.value.trim()||"",sender_address:document.getElementById("pkg-sender-address")?.value.trim()||"",recipient_name:document.getElementById("pkg-recipient-name")?.value.trim()||"",recipient_phone:document.getElementById("pkg-recipient-phone")?.value.trim()||"",recipient_address:document.getElementById("pkg-recipient-address")?.value.trim()||"",item_name:document.getElementById("pkg-item-name")?.value.trim()||"",item_qty:P,package_size:document.getElementById("pkg-package-size")?.value||"",seat_code:document.getElementById("pkg-package-size")?.value==="Besar"&&document.getElementById("pkg-seat-code")?.value||"",fare_amount:g,additional_fare:E,payment_method:L||null,payment_status:document.getElementById("pkg-payment-status")?.value||"Belum Bayar",bank_account_code:L==="transfer"&&document.getElementById("pkg-bank-account-code")?.value||""},D=await v("/bookings/quick-package",{method:"POST",body:R}),V=document.getElementById("package-form-success-banner"),M=document.getElementById("package-form-booking-code"),F=document.getElementById("package-form-download-link");V&&(V.hidden=!1),M&&(M.textContent="Kode Booking: "+D.booking_code+(D.invoice_number&&D.invoice_number!=="-"?" | No. Surat: "+D.invoice_number:"")),F&&(F.href=D.invoice_download_url),U("Paket berhasil disimpan: "+D.booking_code),await we()}catch(g){h(g.message||"Silakan periksa kembali data yang diinput","Gagal menyimpan paket")}finally{oe(b,!1,"Menyimpan...")}}),document.getElementById("choice-passenger-btn")?.addEventListener("click",()=>{K("booking-type-choice-modal"),Mt(f._pendingChoiceArmada||1,f._pendingChoiceTime||""),j("booking-form-modal")}),document.getElementById("choice-package-btn")?.addEventListener("click",()=>{K("booking-type-choice-modal"),y(f._pendingChoiceArmada||1,f._pendingChoiceTime||""),j("package-form-modal")}),t?.addEventListener("click",()=>{f._pendingChoiceArmada=1,f._pendingChoiceTime="",j("booking-type-choice-modal")}),i?.addEventListener("click",m=>{const b=m.target.closest("[data-seat-code]");if(!b||b.disabled)return;Ut();const g=b.dataset.seatCode;f.selectedSeats.includes(g)?f.selectedSeats=f.selectedSeats.filter(E=>E!==g):f.selectedSeats.length<Bt()&&(f.selectedSeats=rn([...f.selectedSeats,g])),le(),de()}),document.getElementById("booking-passenger-count")?.addEventListener("change",()=>{Ut(),le(),de(),Ie()}),document.getElementById("booking-additional-fare")?.addEventListener("input",Ie),document.getElementById("booking-trip-date")?.addEventListener("change",()=>{Se().then(()=>{le(),de()})}),document.getElementById("booking-trip-time")?.addEventListener("change",()=>{Se().then(()=>{le(),de()})}),document.getElementById("booking-from-city")?.addEventListener("change",()=>{Ie(),Se().then(()=>{le(),de()})}),document.getElementById("booking-to-city")?.addEventListener("change",()=>{Ie(),Se().then(()=>{le(),de()})}),d?.addEventListener("change",on),c?.addEventListener("input",m=>{const b=m.target.closest("[data-passenger-seat]");if(!b)return;const g=b.dataset.passengerSeat;f.passengerDraftMap[g]={seat_no:g,name:b.querySelector("[data-passenger-name]")?.value.trim()||"",phone:b.querySelector("[data-passenger-phone]")?.value.trim()||""}}),o?.addEventListener("submit",async m=>{m.preventDefault();const b=document.getElementById("booking-submit-btn");oe(b,!0,"Menyimpan...");try{const g=yi();f.editItem?(await v(`/bookings/${f.editItem.id}`,{method:"PUT",body:g}),U("Data pemesanan berhasil diperbarui")):(await v("/bookings",{method:"POST",body:g}),U("Data pemesanan berhasil ditambahkan")),K("booking-form-modal"),Mt(),await we()}catch(g){h(g.message||"Silakan periksa kembali data yang diinput","Gagal menyimpan data pemesanan")}finally{oe(b,!1,"Menyimpan...")}}),s?.addEventListener("click",async()=>{if(f.deleteItem){oe(s,!0,"Menghapus...");try{await v(`/bookings/${f.deleteItem.id}`,{method:"DELETE"}),U("Data pemesanan berhasil dihapus"),K("booking-delete-modal"),f.deleteItem=null,await we()}catch(m){h(m.message||"Gagal menghapus data pemesanan")}finally{oe(s,!1,"Menghapus...")}}}),Mt(),we().catch(m=>{if(m.status===403){ta();return}h(m.message||"Gagal memuat data penumpang")})}function Ii(e){const t=document.getElementById(e);if(!t)return{};try{return JSON.parse(t.textContent||"{}")}catch{return{}}}function Si(){const e=document.querySelector("[data-regular-booking-page]");if(!e)return;const t=Ii("regular-booking-route-matrix"),n=e.querySelector("[data-booking-origin]"),a=e.querySelector("[data-booking-destination]"),r=e.querySelector("[data-booking-schedule]"),o=e.querySelector("[data-booking-passengers]"),s=e.querySelector("[data-route-fare-input]"),i=e.querySelector("[data-additional-fare-input]"),c=e.querySelector("[data-estimated-total-input]"),d=e.querySelector("[data-route-feedback]"),l=e.querySelector("[data-route-feedback-title]"),k=e.querySelector("[data-route-feedback-text]"),y=e.querySelector("[data-booking-submit]"),A=Array.from(e.querySelectorAll("[data-booking-type]")),m=e.querySelector("[data-summary-booking-for]"),b=e.querySelector("[data-summary-route]"),g=e.querySelector("[data-summary-schedule]"),E=e.querySelector("[data-summary-passengers]"),P=e.querySelector("[data-summary-fare]"),L=e.querySelector("[data-summary-additional-fare]"),R=e.querySelector("[data-summary-total]"),D=new Map(A.map($=>[$.value,$.dataset.label||$.value])),V=new Map(Array.from(r?.options||[]).filter($=>$.value).map($=>[$.value,$.textContent.trim()]));function M($,q){if(!$||!q||$===q)return null;const H=t?.[$]?.[q];return H==null?null:Number(H)}function F($,q,H){!d||!l||!k||(d.dataset.state=$,l.textContent=q,k.textContent=H)}function G(){e.querySelectorAll(".regular-booking-radio").forEach($=>{const q=$.querySelector('input[type="radio"]');$.classList.toggle("is-selected",!!q?.checked)})}function z($){return $<=0?"Belum dipilih":$===6?"6 Penumpang (Opsional tambahan)":`${$} Penumpang`}function W(){const $=n?.value||"",q=a?.value||"",H=r?.value||"",re=Number(o?.value||0),X=A.find(It=>It.checked)?.value||"",ne=M($,q),ee=Math.max(parseInt(i?.value||"0",10)||0,0),ue=ne!==null&&re>0?(ne+ee)*re:null;s&&(s.value=ne!==null?N(ne):""),c&&(c.value=ue!==null?N(ue):""),!$||!q?F("idle","Tarif akan ditampilkan otomatis","Pilih asal dan tujuan untuk melihat tarif perjalanan reguler."):$===q?F("error","Asal dan tujuan tidak boleh sama","Silakan pilih tujuan yang berbeda agar tarif dapat dihitung."):ne===null?F("error","Rute belum tersedia","Rute yang Anda pilih saat ini belum tersedia. Silakan pilih kombinasi asal dan tujuan lain."):F("ready","Rute tersedia","Tarif telah diisi otomatis berdasarkan kombinasi rute dua arah yang tersedia."),y&&(y.disabled=!!($&&q&&($===q||ne===null))),m&&(m.textContent=D.get(X)||"Belum dipilih"),b&&(b.textContent=$&&q?`${$} - ${q}`:"Belum dipilih"),g&&(g.textContent=V.get(H)||"Belum dipilih"),E&&(E.textContent=z(re)),P&&(P.textContent=ne!==null?N(ne):"Belum tersedia"),L&&(L.textContent=ee>0?N(ee):"Tidak ada"),R&&(R.textContent=ue!==null?N(ue):"Belum tersedia"),G()}[n,a,r,o].forEach($=>{$?.addEventListener("change",W)}),i?.addEventListener("input",W),A.forEach($=>{$.addEventListener("change",W)}),e.querySelector("form")?.addEventListener("reset",()=>{window.requestAnimationFrame(W)}),W()}function $i(){const e=document.querySelector("[data-regular-booking-seat-page]");if(!e)return;const t=Number(e.dataset.requiredSeatCount||0),n=Array.from(e.querySelectorAll("[data-seat-card]")),a=Array.from(e.querySelectorAll("[data-seat-input]")),r=e.querySelector("[data-seat-summary-count]"),o=e.querySelector("[data-seat-summary-list]"),s=e.querySelector("[data-seat-summary-remaining]"),i=e.querySelector("[data-seat-submit]"),c=e.querySelector("[data-seat-feedback]"),d=e.querySelector("[data-seat-feedback-title]"),l=e.querySelector("[data-seat-feedback-text]");function k(){return a.filter(b=>b.checked).map(b=>b.value)}function y(b){return b.length>0?b.join(", "):"Belum dipilih"}function A(b,g,E){!c||!d||!l||(c.dataset.state=b,d.textContent=g,l.textContent=E)}function m(){const b=k(),g=b.length,E=t>0&&g>=t;if(n.forEach(P=>{const L=P.querySelector("[data-seat-input]");if(!L)return;const R=L.disabled&&!L.checked&&P.classList.contains("is-occupied"),D=L.checked,V=R||E&&!D;R||(L.disabled=V),P.classList.toggle("is-selected",D),P.classList.toggle("is-disabled",!R&&V)}),r&&(r.textContent=`${g} dari ${t}`),o&&(o.textContent=y(b)),s&&(s.textContent=String(Math.max(t-g,0))),i&&(i.disabled=g!==t),g===0){A("idle","Pilih kursi sesuai jumlah penumpang","Jumlah kursi yang dipilih harus sama dengan jumlah penumpang pada booking draft.");return}if(g<t){A("idle","Pemilihan kursi belum lengkap",`Masih perlu memilih ${t-g} kursi lagi sebelum dapat melanjutkan.`);return}if(t===6){A("ready","Semua kursi sudah terisi","Jumlah penumpang 6 orang sudah terpenuhi dan kursi tambahan 2B ikut terpakai.");return}A("ready","Kursi sudah sesuai","Jumlah kursi yang dipilih sudah sesuai dengan jumlah penumpang dan siap disimpan.")}a.forEach(b=>{b.addEventListener("change",()=>{m()})}),m()}let je=null,ft=!1,na="",_i=3e3,aa=0;const bt=[],C=e=>document.getElementById(e);async function Va(e){const t=e.trim();if(!t)return;const n=Date.now();if(!(t===na&&n-aa<_i)){na=t,aa=n,$e("Memproses scan…");try{const a=await v("/scan-qr",{method:"POST",body:{qr_token:t}});Ci(a),Li(a),a.already_scanned?h(a.message,"Tiket Sudah Pernah Di-Scan"):a.is_newly_eligible?U(a.message,"🎉 Eligible Diskon!"):U(a.message,"Scan Berhasil")}catch(a){xi(a.message||"Scan gagal"),h(a.message||"Scan gagal","Scan Gagal")}finally{$e(ft?"Kamera aktif — arahkan ke QR code.":"")}}}function Ci(e){C("qrscan-result-idle").hidden=!0,C("qrscan-result-card").hidden=!1;const t=e.booking||{},n=e.passenger||{},a=e.loyalty_count,r=e.loyalty_target,o=e.discount_eligible,s=Math.min(Math.round(a/r*100),100),i=e.already_scanned?"warn":e.success?"success":"error";C("qrscan-result-header").className="qrscan-result-header qrscan-result-header--"+i,C("qrscan-result-icon").innerHTML=e.already_scanned?Ri():e.success?Mi():Ja(),C("qrscan-result-title").textContent=t.booking_code||"-",C("qrscan-result-subtitle").textContent=e.message,C("qr-res-name").textContent=n.name||t.nama_pemesanan||"-",C("qr-res-code").textContent=t.booking_code||"-",C("qr-res-route").textContent=t.route_label||"-",C("qr-res-datetime").textContent=(t.trip_date||"-")+" "+(t.trip_time||""),C("qr-res-seats").textContent=n.seat_no||t.selected_seats||"-",C("qr-res-pax").textContent=(t.passenger_count||0)+" Orang",C("qr-res-loyalty-label").textContent=a+" / "+r,C("qr-res-loyalty-fill").style.width=s+"%",C("qr-res-loyalty-fill").className="qrscan-loyalty-fill"+(o?" qrscan-loyalty-fill--done":""),C("qr-res-loyalty-note").textContent=o?"✅ Eligible diskon "+(e.discount_percentage||50)+"%":"Perlu "+Math.max(r-a,0)+" perjalanan lagi untuk diskon."}function xi(e){C("qrscan-result-idle").hidden=!0,C("qrscan-result-card").hidden=!1,C("qrscan-result-header").className="qrscan-result-header qrscan-result-header--error",C("qrscan-result-icon").innerHTML=Ja(),C("qrscan-result-title").textContent="Scan Gagal",C("qrscan-result-subtitle").textContent=e,["qr-res-name","qr-res-code","qr-res-route","qr-res-datetime","qr-res-seats","qr-res-pax"].forEach(t=>{C(t).textContent="-"}),C("qr-res-loyalty-label").textContent="– / –",C("qr-res-loyalty-fill").style.width="0%",C("qr-res-loyalty-note").textContent=""}function Li(e){const t=e.booking,n=new Date().toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit",second:"2-digit"}),a=e.passenger||{};bt.unshift({booking:t,passenger:a,time:n,success:e.success,already_scanned:e.already_scanned,message:e.message}),Ga()}function Ga(){const e=C("qrscan-history-list");if(bt.length===0){e.innerHTML='<p class="qrscan-history-empty">Belum ada scan dalam sesi ini.</p>';return}e.innerHTML=bt.map(t=>{const n=t.already_scanned?"warn":t.success?"ok":"err",a=t.passenger&&t.passenger.name?t.passenger.name+(t.passenger.seat_no?" ("+t.passenger.seat_no+")":""):t.booking.nama_pemesanan||"-";return`
        <div class="qrscan-history-item qrscan-history-item--${n}">
            <div class="qrscan-history-dot"></div>
            <div class="qrscan-history-body">
                <strong>${p(t.booking.booking_code||"-")}</strong>
                <span>${p(a)}</span>
            </div>
            <span class="qrscan-history-time">${t.time}</span>
        </div>`}).join("")}function Ti(){if(!window.Html5Qrcode){h("Library scanner tidak tersedia. Coba muat ulang halaman.","Error");return}C("qrscan-placeholder").hidden=!0,C("qrscan-frame").hidden=!1,C("qrscan-btn-start").hidden=!0,C("qrscan-btn-stop").hidden=!1,ft=!0,$e("Menginisialisasi kamera…"),je=new window.Html5Qrcode("qrscan-reader"),je.start({facingMode:"environment"},{fps:10,qrbox:{width:240,height:240}},e=>{let t=e.trim();try{const n=JSON.parse(e);n&&(n.qr_token||n.passenger_qr_token)&&(t=n.qr_token||n.passenger_qr_token)}catch{}Va(t)},()=>{}).then(()=>{$e("Kamera aktif — arahkan ke QR code.")}).catch(e=>{ft=!1,C("qrscan-placeholder").hidden=!1,C("qrscan-frame").hidden=!0,C("qrscan-btn-start").hidden=!1,C("qrscan-btn-stop").hidden=!0,$e("Gagal mengakses kamera. Pastikan izin kamera sudah diberikan."),h(String(e),"Kamera Error")})}function Ai(){je&&je.stop().catch(()=>{}).finally(()=>{je=null}),ft=!1,C("qrscan-placeholder").hidden=!1,C("qrscan-frame").hidden=!0,C("qrscan-btn-start").hidden=!1,C("qrscan-btn-stop").hidden=!0,$e("Kamera dihentikan.")}function $e(e){C("qrscan-status-text").textContent=e}function Mi(){return`<svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
        <path d="M8 12l3 3 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`}function Ja(){return`<svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
        <path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`}function Ri(){return`<svg viewBox="0 0 24 24" fill="none">
        <path d="M12 9v4M12 17h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    </svg>`}function Pi(){C("qrscan-btn-start").addEventListener("click",Ti),C("qrscan-btn-stop").addEventListener("click",Ai),C("qrscan-clear-history").addEventListener("click",()=>{bt.length=0,Ga()}),C("qrscan-manual-form").addEventListener("submit",e=>{e.preventDefault();const t=C("qrscan-manual-input").value.trim();t&&(Va(t),C("qrscan-manual-input").value="")})}const x={data:[],loading:!0,totalCount:0,page:1,search:"",chartLimit:10,editItem:null,deleteItem:null,isSubmitting:!1};let Ze=null;const be=15,Di=()=>`<svg viewBox="0 0 24 24" fill="none">
    <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
</svg>`,Oi=()=>`<svg viewBox="0 0 24 24" fill="none">
    <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
</svg>`;function ji(){const e=document.getElementById("plkt-table-body");e&&(e.innerHTML=`
        <tr><td colspan="10" class="plkt-table-state">
            <div class="plkt-loading-inline">
                <span class="plkt-loading-inline-spinner" aria-hidden="true"></span>
                <span>Memuat data...</span>
            </div>
        </td></tr>`)}function qi(){const e=document.getElementById("plkt-table-body");e&&(e.innerHTML='<tr><td colspan="10" class="plkt-table-state plkt-empty-copy">Belum ada data penumpang.</td></tr>')}function ra(){const e=document.getElementById("plkt-table-body");if(e){if(x.loading){ji();return}if(x.data.length===0){qi();return}e.innerHTML=x.data.map((t,n)=>`
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
                        <span class="plkt-user-name">${p(t.passenger_name||"-")}</span>
                        <span class="plkt-user-seat">Kursi ${p(t.seat_no||"-")}</span>
                    </div>
                </div>
            </td>
            <td class="plkt-phone-cell">${p(t.phone||"-")}</td>
            <td>${p(t.from_city||"-")}</td>
            <td>${p(t.to_city||"-")}</td>
            <td class="plkt-date-cell">${p(t.trip_date||"-")}</td>
            <td class="plkt-time-cell">${p(t.trip_time||"-")}</td>
            <td class="plkt-tarif-cell">${p(t.tarif||"-")}</td>
            <td class="plkt-count-cell">
                <span class="plkt-count-badge">${t.booking_count}x</span>
            </td>
            <td>
                <div class="plkt-action-row">
                    <button class="plkt-icon-button" type="button"
                        data-plkt-edit="${t.id}"
                        aria-label="Edit penumpang ${p(t.passenger_name||"")}">
                        ${Di()}
                    </button>
                    <button class="plkt-icon-button plkt-icon-button-danger" type="button"
                        data-plkt-delete="${t.id}"
                        data-plkt-name="${p(t.passenger_name||"")}"
                        aria-label="Hapus penumpang ${p(t.passenger_name||"")}">
                        ${Oi()}
                    </button>
                </div>
            </td>
        </tr>`).join("")}}function oa(){const e=document.getElementById("plkt-pagination-shell"),t=document.getElementById("plkt-pagination-info"),n=document.getElementById("plkt-pagination-page"),a=document.getElementById("plkt-prev-page-btn"),r=document.getElementById("plkt-next-page-btn"),o=Math.max(1,Math.ceil(x.totalCount/be));e&&(e.hidden=o<=1),t&&(t.textContent=Me(x.page,be,x.totalCount,x.data.length)),n&&(n.textContent=`${x.page} / ${o}`),a&&(a.disabled=x.page===1),r&&(r.disabled=x.page>=o)}async function Be(){x.loading=!0,ra(),oa();try{const[e,t]=await Promise.all([v(`/passengers-lkt?page=${x.page}&limit=${be}${x.search?`&search=${encodeURIComponent(x.search)}`:""}`),v(`/passengers-lkt/count${x.search?`?search=${encodeURIComponent(x.search)}`:""}`)]);x.data=Array.isArray(e)?e:[],x.totalCount=Number(t?.count||0)}catch(e){h(e.message||"Gagal memuat data","Error"),x.data=[],x.totalCount=0}finally{x.loading=!1,ra(),oa()}}function Ft(e){const t=document.getElementById("plkt-edit-submit-btn");x.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":"Simpan")}async function Ni(e){try{const t=await v(`/passengers-lkt/${e}`);x.editItem=t;const n=document.getElementById("plkt-edit-name"),a=document.getElementById("plkt-edit-phone"),r=document.getElementById("plkt-edit-id");r&&(r.value=t.id),n&&(n.value=t.name||""),a&&(a.value=t.phone||""),Ft(!1),j("plkt-edit-modal")}catch{h("Gagal memuat data penumpang")}}function Ui(e,t){x.deleteItem={id:e,name:t};const n=document.getElementById("plkt-delete-copy");n&&(n.innerHTML=`Apakah Anda yakin ingin menghapus penumpang <strong>${p(t)}</strong>? Tindakan ini tidak dapat dibatalkan.`),j("plkt-delete-modal")}async function Qe(){const e=document.getElementById("plkt-loyalty-chart"),t=document.getElementById("plkt-chart-empty");if(e)try{const n=await v(`/passengers-lkt/loyalty-chart?limit=${x.chartLimit}`);if(!Array.isArray(n)||n.length===0){e.hidden=!0,t&&(t.hidden=!1);return}e.hidden=!1,t&&(t.hidden=!0);const a=n.map(i=>i.passenger_name+(i.phone&&i.phone!=="-"?` (${i.phone})`:"")),r=n.map(i=>i.booking_count),o=Math.max(...r,1),s=r.map(i=>{const c=i/o;return`rgba(${Math.round(26+c*30)}, ${Math.round(35+c*80)}, ${Math.round(126+c*50)}, 0.85)`});Ze&&(Ze.destroy(),Ze=null),Ze=new window.Chart(e,{type:"bar",data:{labels:a,datasets:[{label:"Jumlah Pemesanan",data:r,backgroundColor:s,borderRadius:6,borderSkipped:!1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{title:i=>i[0].label,label:i=>` ${i.raw} kali pemesanan`}}},scales:{x:{ticks:{maxRotation:35,font:{size:11},color:"#374151"},grid:{display:!1}},y:{beginAtZero:!0,ticks:{stepSize:1,color:"#374151",font:{size:11}},grid:{color:"rgba(0,0,0,0.06)"}}}}})}catch{t&&(t.hidden=!1)}}function Fi(){if(x.data.length===0){h("Tidak ada data untuk diekspor.");return}const e=["No","Nama Penumpang","No HP","Dari","Tujuan","Tanggal Berangkat","Jam","Tarif","Kali Memesan"],t=x.data.map((s,i)=>[(x.page-1)*be+i+1,s.passenger_name||"-",s.phone||"-",s.from_city||"-",s.to_city||"-",s.trip_date||"-",s.trip_time||"-",s.tarif||"-",s.booking_count]),n=[e,...t].map(s=>s.map(i=>`"${String(i).replace(/"/g,'""')}"`).join(",")).join(`
`),a=new Blob(["\uFEFF"+n],{type:"text/csv;charset=utf-8;"}),r=URL.createObjectURL(a),o=document.createElement("a");o.href=r,o.download="data-penumpang-lkt.csv",o.click(),URL.revokeObjectURL(r)}function Hi(){const e=document.getElementById("plkt-search-input"),t=document.getElementById("plkt-prev-page-btn"),n=document.getElementById("plkt-next-page-btn"),a=document.getElementById("plkt-export-btn"),r=document.getElementById("plkt-chart-limit"),o=document.getElementById("plkt-table-body"),s=document.getElementById("plkt-edit-form"),i=document.getElementById("plkt-delete-confirm-btn");e?.addEventListener("input",Ae(async c=>{x.search=c.target.value.trim(),x.page=1,await Be().catch(()=>h("Gagal memuat data"))},400)),t?.addEventListener("click",async()=>{x.page<=1||(x.page-=1,await Be().catch(()=>h("Gagal memuat data")))}),n?.addEventListener("click",async()=>{const c=Math.max(1,Math.ceil(x.totalCount/be));x.page>=c||(x.page+=1,await Be().catch(()=>h("Gagal memuat data")))}),a?.addEventListener("click",Fi),r?.addEventListener("change",async c=>{x.chartLimit=parseInt(c.target.value,10)||10,await Qe().catch(()=>{})}),o?.addEventListener("click",async c=>{const d=c.target.closest("[data-plkt-edit]"),l=c.target.closest("[data-plkt-delete]");d&&await Ni(d.dataset.plktEdit),l&&Ui(l.dataset.plktDelete,l.dataset.plktName)}),s?.addEventListener("submit",async c=>{c.preventDefault();const d=document.getElementById("plkt-edit-id")?.value,l=document.getElementById("plkt-edit-name")?.value.trim(),k=document.getElementById("plkt-edit-phone")?.value.trim();if(!l){h("Nama penumpang tidak boleh kosong");return}Ft(!0);try{await v(`/passengers-lkt/${d}`,{method:"PUT",body:{name:l,phone:k}}),U("Data penumpang berhasil diperbarui"),K("plkt-edit-modal"),await Promise.all([Be(),Qe()])}catch(y){h(y.message||"Gagal menyimpan data")}finally{Ft(!1)}}),i?.addEventListener("click",async()=>{if(x.deleteItem)try{await v(`/passengers-lkt/${x.deleteItem.id}`,{method:"DELETE"}),U("Data penumpang berhasil dihapus"),K("plkt-delete-modal"),x.deleteItem=null,(x.page-1)*be>=x.totalCount-1&&x.page>1&&(x.page-=1),await Promise.all([Be(),Qe()])}catch(c){h(c.message||"Gagal menghapus data")}}),Be().catch(()=>h("Gagal memuat data")),Qe().catch(()=>{})}const Vi={"admin-users/index":zs,"auth/login":Uo,"bookings/index":Bi,"dashboard/index":Yo,"drivers/index":ls,"mobil/index":vs,"keberangkatan/index":_s,"regular-bookings/index":Si,"regular-bookings/seats":$i,"stock/index":Ms,"qr-scan/index":Pi,"passengers-lkt/index":Hi};document.addEventListener("DOMContentLoaded",async()=>{Oo(),No(),rt(Aa());const e=To();e&&(e.type==="success"?U(e.message,e.title):e.type==="info"?jo(e.message,e.title):h(e.message,e.title));try{const{user:t}=await Do();t&&rt(t);const n=document.body.dataset.pageScript,a=Vi[n];typeof a=="function"&&await a({user:t})}catch(t){console.error(t),h(t.message||"Terjadi kesalahan saat memuat halaman")}});
