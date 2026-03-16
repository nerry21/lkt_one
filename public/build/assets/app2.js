function na(e,t){return function(){return e.apply(t,arguments)}}const{toString:Ua}=Object.prototype,{getPrototypeOf:Ht}=Object,{iterator:bt,toStringTag:aa}=Symbol,ht=(e=>t=>{const n=Ua.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),te=e=>(e=e.toLowerCase(),t=>ht(t)===e),kt=e=>t=>typeof t===e,{isArray:$e}=Array,Be=kt("undefined");function Ne(e){return e!==null&&!Be(e)&&e.constructor!==null&&!Be(e.constructor)&&W(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const ra=te("ArrayBuffer");function Ha(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&ra(e.buffer),t}const Fa=kt("string"),W=kt("function"),oa=kt("number"),Ue=e=>e!==null&&typeof e=="object",Va=e=>e===!0||e===!1,Ze=e=>{if(ht(e)!=="object")return!1;const t=Ht(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(aa in e)&&!(bt in e)},Ga=e=>{if(!Ue(e)||Ne(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},Ja=te("Date"),Ka=te("File"),Wa=e=>!!(e&&typeof e.uri<"u"),za=e=>e&&typeof e.getParts<"u",Xa=te("Blob"),Za=te("FileList"),Qa=e=>Ue(e)&&W(e.pipe);function Ya(){return typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}}const sn=Ya(),ln=typeof sn.FormData<"u"?sn.FormData:void 0,er=e=>{let t;return e&&(ln&&e instanceof ln||W(e.append)&&((t=ht(e))==="formdata"||t==="object"&&W(e.toString)&&e.toString()==="[object FormData]"))},tr=te("URLSearchParams"),[nr,ar,rr,or]=["ReadableStream","Request","Response","Headers"].map(te),sr=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function He(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let a,r;if(typeof e!="object"&&(e=[e]),$e(e))for(a=0,r=e.length;a<r;a++)t.call(null,e[a],a,e);else{if(Ne(e))return;const o=n?Object.getOwnPropertyNames(e):Object.keys(e),s=o.length;let i;for(a=0;a<s;a++)i=o[a],t.call(null,e[i],i,e)}}function sa(e,t){if(Ne(e))return null;t=t.toLowerCase();const n=Object.keys(e);let a=n.length,r;for(;a-- >0;)if(r=n[a],t===r.toLowerCase())return r;return null}const le=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,ia=e=>!Be(e)&&e!==le;function Rt(){const{caseless:e,skipUndefined:t}=ia(this)&&this||{},n={},a=(r,o)=>{if(o==="__proto__"||o==="constructor"||o==="prototype")return;const s=e&&sa(n,o)||o;Ze(n[s])&&Ze(r)?n[s]=Rt(n[s],r):Ze(r)?n[s]=Rt({},r):$e(r)?n[s]=r.slice():(!t||!Be(r))&&(n[s]=r)};for(let r=0,o=arguments.length;r<o;r++)arguments[r]&&He(arguments[r],a);return n}const ir=(e,t,n,{allOwnKeys:a}={})=>(He(t,(r,o)=>{n&&W(r)?Object.defineProperty(e,o,{value:na(r,n),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(e,o,{value:r,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:a}),e),lr=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),dr=(e,t,n,a)=>{e.prototype=Object.create(t.prototype,a),Object.defineProperty(e.prototype,"constructor",{value:e,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},cr=(e,t,n,a)=>{let r,o,s;const i={};if(t=t||{},e==null)return t;do{for(r=Object.getOwnPropertyNames(e),o=r.length;o-- >0;)s=r[o],(!a||a(s,e,t))&&!i[s]&&(t[s]=e[s],i[s]=!0);e=n!==!1&&Ht(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},ur=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const a=e.indexOf(t,n);return a!==-1&&a===n},mr=e=>{if(!e)return null;if($e(e))return e;let t=e.length;if(!oa(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},pr=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&Ht(Uint8Array)),gr=(e,t)=>{const a=(e&&e[bt]).call(e);let r;for(;(r=a.next())&&!r.done;){const o=r.value;t.call(e,o[0],o[1])}},fr=(e,t)=>{let n;const a=[];for(;(n=e.exec(t))!==null;)a.push(n);return a},br=te("HTMLFormElement"),hr=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,a,r){return a.toUpperCase()+r}),dn=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),kr=te("RegExp"),la=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),a={};He(n,(r,o)=>{let s;(s=t(r,o,e))!==!1&&(a[o]=s||r)}),Object.defineProperties(e,a)},yr=e=>{la(e,(t,n)=>{if(W(e)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const a=e[n];if(W(a)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},vr=(e,t)=>{const n={},a=r=>{r.forEach(o=>{n[o]=!0})};return $e(e)?a(e):a(String(e).split(t)),n},Er=()=>{},wr=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function Br(e){return!!(e&&W(e.append)&&e[aa]==="FormData"&&e[bt])}const Ir=e=>{const t=new Array(10),n=(a,r)=>{if(Ue(a)){if(t.indexOf(a)>=0)return;if(Ne(a))return a;if(!("toJSON"in a)){t[r]=a;const o=$e(a)?[]:{};return He(a,(s,i)=>{const c=n(s,r+1);!Be(c)&&(o[i]=c)}),t[r]=void 0,o}}return a};return n(e,0)},Sr=te("AsyncFunction"),$r=e=>e&&(Ue(e)||W(e))&&W(e.then)&&W(e.catch),da=((e,t)=>e?setImmediate:t?((n,a)=>(le.addEventListener("message",({source:r,data:o})=>{r===le&&o===n&&a.length&&a.shift()()},!1),r=>{a.push(r),le.postMessage(n,"*")}))(`axios@${Math.random()}`,[]):n=>setTimeout(n))(typeof setImmediate=="function",W(le.postMessage)),Cr=typeof queueMicrotask<"u"?queueMicrotask.bind(le):typeof process<"u"&&process.nextTick||da,xr=e=>e!=null&&W(e[bt]),u={isArray:$e,isArrayBuffer:ra,isBuffer:Ne,isFormData:er,isArrayBufferView:Ha,isString:Fa,isNumber:oa,isBoolean:Va,isObject:Ue,isPlainObject:Ze,isEmptyObject:Ga,isReadableStream:nr,isRequest:ar,isResponse:rr,isHeaders:or,isUndefined:Be,isDate:Ja,isFile:Ka,isReactNativeBlob:Wa,isReactNative:za,isBlob:Xa,isRegExp:kr,isFunction:W,isStream:Qa,isURLSearchParams:tr,isTypedArray:pr,isFileList:Za,forEach:He,merge:Rt,extend:ir,trim:sr,stripBOM:lr,inherits:dr,toFlatObject:cr,kindOf:ht,kindOfTest:te,endsWith:ur,toArray:mr,forEachEntry:gr,matchAll:fr,isHTMLForm:br,hasOwnProperty:dn,hasOwnProp:dn,reduceDescriptors:la,freezeMethods:yr,toObjectSet:vr,toCamelCase:hr,noop:Er,toFiniteNumber:wr,findKey:sa,global:le,isContextDefined:ia,isSpecCompliantForm:Br,toJSONObject:Ir,isAsyncFn:Sr,isThenable:$r,setImmediate:da,asap:Cr,isIterable:xr};let I=class ca extends Error{static from(t,n,a,r,o,s){const i=new ca(t.message,n||t.code,a,r,o);return i.cause=t,i.name=t.name,t.status!=null&&i.status==null&&(i.status=t.status),s&&Object.assign(i,s),i}constructor(t,n,a,r,o){super(t),Object.defineProperty(this,"message",{value:t,enumerable:!0,writable:!0,configurable:!0}),this.name="AxiosError",this.isAxiosError=!0,n&&(this.code=n),a&&(this.config=a),r&&(this.request=r),o&&(this.response=o,this.status=o.status)}toJSON(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:u.toJSONObject(this.config),code:this.code,status:this.status}}};I.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";I.ERR_BAD_OPTION="ERR_BAD_OPTION";I.ECONNABORTED="ECONNABORTED";I.ETIMEDOUT="ETIMEDOUT";I.ERR_NETWORK="ERR_NETWORK";I.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";I.ERR_DEPRECATED="ERR_DEPRECATED";I.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";I.ERR_BAD_REQUEST="ERR_BAD_REQUEST";I.ERR_CANCELED="ERR_CANCELED";I.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";I.ERR_INVALID_URL="ERR_INVALID_URL";const _r=null;function Mt(e){return u.isPlainObject(e)||u.isArray(e)}function ua(e){return u.endsWith(e,"[]")?e.slice(0,-2):e}function St(e,t,n){return e?e.concat(t).map(function(r,o){return r=ua(r),!n&&o?"["+r+"]":r}).join(n?".":""):t}function Lr(e){return u.isArray(e)&&!e.some(Mt)}const Tr=u.toFlatObject(u,{},null,function(t){return/^is[A-Z]/.test(t)});function yt(e,t,n){if(!u.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=u.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(b,h){return!u.isUndefined(h[b])});const a=n.metaTokens,r=n.visitor||l,o=n.dots,s=n.indexes,c=(n.Blob||typeof Blob<"u"&&Blob)&&u.isSpecCompliantForm(t);if(!u.isFunction(r))throw new TypeError("visitor must be a function");function d(g){if(g===null)return"";if(u.isDate(g))return g.toISOString();if(u.isBoolean(g))return g.toString();if(!c&&u.isBlob(g))throw new I("Blob is not supported. Use a Buffer instead.");return u.isArrayBuffer(g)||u.isTypedArray(g)?c&&typeof Blob=="function"?new Blob([g]):Buffer.from(g):g}function l(g,b,h){let A=g;if(u.isReactNative(t)&&u.isReactNativeBlob(g))return t.append(St(h,b,o),d(g)),!1;if(g&&!h&&typeof g=="object"){if(u.endsWith(b,"{}"))b=a?b:b.slice(0,-2),g=JSON.stringify(g);else if(u.isArray(g)&&Lr(g)||(u.isFileList(g)||u.endsWith(b,"[]"))&&(A=u.toArray(g)))return b=ua(b),A.forEach(function(T,P){!(u.isUndefined(T)||T===null)&&t.append(s===!0?St([b],P,o):s===null?b:b+"[]",d(T))}),!1}return Mt(g)?!0:(t.append(St(h,b,o),d(g)),!1)}const m=[],f=Object.assign(Tr,{defaultVisitor:l,convertValue:d,isVisitable:Mt});function v(g,b){if(!u.isUndefined(g)){if(m.indexOf(g)!==-1)throw Error("Circular reference detected in "+b.join("."));m.push(g),u.forEach(g,function(A,M){(!(u.isUndefined(A)||A===null)&&r.call(t,A,u.isString(M)?M.trim():M,b,f))===!0&&v(A,b?b.concat(M):[M])}),m.pop()}}if(!u.isObject(e))throw new TypeError("data must be an object");return v(e),t}function cn(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(a){return t[a]})}function Ft(e,t){this._pairs=[],e&&yt(e,this,t)}const ma=Ft.prototype;ma.append=function(t,n){this._pairs.push([t,n])};ma.toString=function(t){const n=t?function(a){return t.call(this,a,cn)}:cn;return this._pairs.map(function(r){return n(r[0])+"="+n(r[1])},"").join("&")};function Ar(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function pa(e,t,n){if(!t)return e;const a=n&&n.encode||Ar,r=u.isFunction(n)?{serialize:n}:n,o=r&&r.serialize;let s;if(o?s=o(t,r):s=u.isURLSearchParams(t)?t.toString():new Ft(t,r).toString(a),s){const i=e.indexOf("#");i!==-1&&(e=e.slice(0,i)),e+=(e.indexOf("?")===-1?"?":"&")+s}return e}class un{constructor(){this.handlers=[]}use(t,n,a){return this.handlers.push({fulfilled:t,rejected:n,synchronous:a?a.synchronous:!1,runWhen:a?a.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){u.forEach(this.handlers,function(a){a!==null&&t(a)})}}const Vt={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0},Rr=typeof URLSearchParams<"u"?URLSearchParams:Ft,Mr=typeof FormData<"u"?FormData:null,Pr=typeof Blob<"u"?Blob:null,Dr={isBrowser:!0,classes:{URLSearchParams:Rr,FormData:Mr,Blob:Pr},protocols:["http","https","file","blob","url","data"]},Gt=typeof window<"u"&&typeof document<"u",Pt=typeof navigator=="object"&&navigator||void 0,Or=Gt&&(!Pt||["ReactNative","NativeScript","NS"].indexOf(Pt.product)<0),qr=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",jr=Gt&&window.location.href||"http://localhost",Nr=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:Gt,hasStandardBrowserEnv:Or,hasStandardBrowserWebWorkerEnv:qr,navigator:Pt,origin:jr},Symbol.toStringTag,{value:"Module"})),J={...Nr,...Dr};function Ur(e,t){return yt(e,new J.classes.URLSearchParams,{visitor:function(n,a,r,o){return J.isNode&&u.isBuffer(n)?(this.append(a,n.toString("base64")),!1):o.defaultVisitor.apply(this,arguments)},...t})}function Hr(e){return u.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function Fr(e){const t={},n=Object.keys(e);let a;const r=n.length;let o;for(a=0;a<r;a++)o=n[a],t[o]=e[o];return t}function ga(e){function t(n,a,r,o){let s=n[o++];if(s==="__proto__")return!0;const i=Number.isFinite(+s),c=o>=n.length;return s=!s&&u.isArray(r)?r.length:s,c?(u.hasOwnProp(r,s)?r[s]=[r[s],a]:r[s]=a,!i):((!r[s]||!u.isObject(r[s]))&&(r[s]=[]),t(n,a,r[s],o)&&u.isArray(r[s])&&(r[s]=Fr(r[s])),!i)}if(u.isFormData(e)&&u.isFunction(e.entries)){const n={};return u.forEachEntry(e,(a,r)=>{t(Hr(a),r,n,0)}),n}return null}function Vr(e,t,n){if(u.isString(e))try{return(t||JSON.parse)(e),u.trim(e)}catch(a){if(a.name!=="SyntaxError")throw a}return(n||JSON.stringify)(e)}const Fe={transitional:Vt,adapter:["xhr","http","fetch"],transformRequest:[function(t,n){const a=n.getContentType()||"",r=a.indexOf("application/json")>-1,o=u.isObject(t);if(o&&u.isHTMLForm(t)&&(t=new FormData(t)),u.isFormData(t))return r?JSON.stringify(ga(t)):t;if(u.isArrayBuffer(t)||u.isBuffer(t)||u.isStream(t)||u.isFile(t)||u.isBlob(t)||u.isReadableStream(t))return t;if(u.isArrayBufferView(t))return t.buffer;if(u.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let i;if(o){if(a.indexOf("application/x-www-form-urlencoded")>-1)return Ur(t,this.formSerializer).toString();if((i=u.isFileList(t))||a.indexOf("multipart/form-data")>-1){const c=this.env&&this.env.FormData;return yt(i?{"files[]":t}:t,c&&new c,this.formSerializer)}}return o||r?(n.setContentType("application/json",!1),Vr(t)):t}],transformResponse:[function(t){const n=this.transitional||Fe.transitional,a=n&&n.forcedJSONParsing,r=this.responseType==="json";if(u.isResponse(t)||u.isReadableStream(t))return t;if(t&&u.isString(t)&&(a&&!this.responseType||r)){const s=!(n&&n.silentJSONParsing)&&r;try{return JSON.parse(t,this.parseReviver)}catch(i){if(s)throw i.name==="SyntaxError"?I.from(i,I.ERR_BAD_RESPONSE,this,null,this.response):i}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:J.classes.FormData,Blob:J.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};u.forEach(["delete","get","head","post","put","patch"],e=>{Fe.headers[e]={}});const Gr=u.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),Jr=e=>{const t={};let n,a,r;return e&&e.split(`
`).forEach(function(s){r=s.indexOf(":"),n=s.substring(0,r).trim().toLowerCase(),a=s.substring(r+1).trim(),!(!n||t[n]&&Gr[n])&&(n==="set-cookie"?t[n]?t[n].push(a):t[n]=[a]:t[n]=t[n]?t[n]+", "+a:a)}),t},mn=Symbol("internals");function Le(e){return e&&String(e).trim().toLowerCase()}function Qe(e){return e===!1||e==null?e:u.isArray(e)?e.map(Qe):String(e)}function Kr(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let a;for(;a=n.exec(e);)t[a[1]]=a[2];return t}const Wr=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function $t(e,t,n,a,r){if(u.isFunction(a))return a.call(this,t,n);if(r&&(t=n),!!u.isString(t)){if(u.isString(a))return t.indexOf(a)!==-1;if(u.isRegExp(a))return a.test(t)}}function zr(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,a)=>n.toUpperCase()+a)}function Xr(e,t){const n=u.toCamelCase(" "+t);["get","set","has"].forEach(a=>{Object.defineProperty(e,a+n,{value:function(r,o,s){return this[a].call(this,t,r,o,s)},configurable:!0})})}let z=class{constructor(t){t&&this.set(t)}set(t,n,a){const r=this;function o(i,c,d){const l=Le(c);if(!l)throw new Error("header name must be a non-empty string");const m=u.findKey(r,l);(!m||r[m]===void 0||d===!0||d===void 0&&r[m]!==!1)&&(r[m||c]=Qe(i))}const s=(i,c)=>u.forEach(i,(d,l)=>o(d,l,c));if(u.isPlainObject(t)||t instanceof this.constructor)s(t,n);else if(u.isString(t)&&(t=t.trim())&&!Wr(t))s(Jr(t),n);else if(u.isObject(t)&&u.isIterable(t)){let i={},c,d;for(const l of t){if(!u.isArray(l))throw TypeError("Object iterator must return a key-value pair");i[d=l[0]]=(c=i[d])?u.isArray(c)?[...c,l[1]]:[c,l[1]]:l[1]}s(i,n)}else t!=null&&o(n,t,a);return this}get(t,n){if(t=Le(t),t){const a=u.findKey(this,t);if(a){const r=this[a];if(!n)return r;if(n===!0)return Kr(r);if(u.isFunction(n))return n.call(this,r,a);if(u.isRegExp(n))return n.exec(r);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=Le(t),t){const a=u.findKey(this,t);return!!(a&&this[a]!==void 0&&(!n||$t(this,this[a],a,n)))}return!1}delete(t,n){const a=this;let r=!1;function o(s){if(s=Le(s),s){const i=u.findKey(a,s);i&&(!n||$t(a,a[i],i,n))&&(delete a[i],r=!0)}}return u.isArray(t)?t.forEach(o):o(t),r}clear(t){const n=Object.keys(this);let a=n.length,r=!1;for(;a--;){const o=n[a];(!t||$t(this,this[o],o,t,!0))&&(delete this[o],r=!0)}return r}normalize(t){const n=this,a={};return u.forEach(this,(r,o)=>{const s=u.findKey(a,o);if(s){n[s]=Qe(r),delete n[o];return}const i=t?zr(o):String(o).trim();i!==o&&delete n[o],n[i]=Qe(r),a[i]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return u.forEach(this,(a,r)=>{a!=null&&a!==!1&&(n[r]=t&&u.isArray(a)?a.join(", "):a)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const a=new this(t);return n.forEach(r=>a.set(r)),a}static accessor(t){const a=(this[mn]=this[mn]={accessors:{}}).accessors,r=this.prototype;function o(s){const i=Le(s);a[i]||(Xr(r,s),a[i]=!0)}return u.isArray(t)?t.forEach(o):o(t),this}};z.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);u.reduceDescriptors(z.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(a){this[n]=a}}});u.freezeMethods(z);function Ct(e,t){const n=this||Fe,a=t||n,r=z.from(a.headers);let o=a.data;return u.forEach(e,function(i){o=i.call(n,o,r.normalize(),t?t.status:void 0)}),r.normalize(),o}function fa(e){return!!(e&&e.__CANCEL__)}let Ve=class extends I{constructor(t,n,a){super(t??"canceled",I.ERR_CANCELED,n,a),this.name="CanceledError",this.__CANCEL__=!0}};function ba(e,t,n){const a=n.config.validateStatus;!n.status||!a||a(n.status)?e(n):t(new I("Request failed with status code "+n.status,[I.ERR_BAD_REQUEST,I.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}function Zr(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function Qr(e,t){e=e||10;const n=new Array(e),a=new Array(e);let r=0,o=0,s;return t=t!==void 0?t:1e3,function(c){const d=Date.now(),l=a[o];s||(s=d),n[r]=c,a[r]=d;let m=o,f=0;for(;m!==r;)f+=n[m++],m=m%e;if(r=(r+1)%e,r===o&&(o=(o+1)%e),d-s<t)return;const v=l&&d-l;return v?Math.round(f*1e3/v):void 0}}function Yr(e,t){let n=0,a=1e3/t,r,o;const s=(d,l=Date.now())=>{n=l,r=null,o&&(clearTimeout(o),o=null),e(...d)};return[(...d)=>{const l=Date.now(),m=l-n;m>=a?s(d,l):(r=d,o||(o=setTimeout(()=>{o=null,s(r)},a-m)))},()=>r&&s(r)]}const tt=(e,t,n=3)=>{let a=0;const r=Qr(50,250);return Yr(o=>{const s=o.loaded,i=o.lengthComputable?o.total:void 0,c=s-a,d=r(c),l=s<=i;a=s;const m={loaded:s,total:i,progress:i?s/i:void 0,bytes:c,rate:d||void 0,estimated:d&&i&&l?(i-s)/d:void 0,event:o,lengthComputable:i!=null,[t?"download":"upload"]:!0};e(m)},n)},pn=(e,t)=>{const n=e!=null;return[a=>t[0]({lengthComputable:n,total:e,loaded:a}),t[1]]},gn=e=>(...t)=>u.asap(()=>e(...t)),eo=J.hasStandardBrowserEnv?((e,t)=>n=>(n=new URL(n,J.origin),e.protocol===n.protocol&&e.host===n.host&&(t||e.port===n.port)))(new URL(J.origin),J.navigator&&/(msie|trident)/i.test(J.navigator.userAgent)):()=>!0,to=J.hasStandardBrowserEnv?{write(e,t,n,a,r,o,s){if(typeof document>"u")return;const i=[`${e}=${encodeURIComponent(t)}`];u.isNumber(n)&&i.push(`expires=${new Date(n).toUTCString()}`),u.isString(a)&&i.push(`path=${a}`),u.isString(r)&&i.push(`domain=${r}`),o===!0&&i.push("secure"),u.isString(s)&&i.push(`SameSite=${s}`),document.cookie=i.join("; ")},read(e){if(typeof document>"u")return null;const t=document.cookie.match(new RegExp("(?:^|; )"+e+"=([^;]*)"));return t?decodeURIComponent(t[1]):null},remove(e){this.write(e,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function no(e){return typeof e!="string"?!1:/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function ao(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function ha(e,t,n){let a=!no(t);return e&&(a||n==!1)?ao(e,t):t}const fn=e=>e instanceof z?{...e}:e;function ue(e,t){t=t||{};const n={};function a(d,l,m,f){return u.isPlainObject(d)&&u.isPlainObject(l)?u.merge.call({caseless:f},d,l):u.isPlainObject(l)?u.merge({},l):u.isArray(l)?l.slice():l}function r(d,l,m,f){if(u.isUndefined(l)){if(!u.isUndefined(d))return a(void 0,d,m,f)}else return a(d,l,m,f)}function o(d,l){if(!u.isUndefined(l))return a(void 0,l)}function s(d,l){if(u.isUndefined(l)){if(!u.isUndefined(d))return a(void 0,d)}else return a(void 0,l)}function i(d,l,m){if(m in t)return a(d,l);if(m in e)return a(void 0,d)}const c={url:o,method:o,data:o,baseURL:s,transformRequest:s,transformResponse:s,paramsSerializer:s,timeout:s,timeoutMessage:s,withCredentials:s,withXSRFToken:s,adapter:s,responseType:s,xsrfCookieName:s,xsrfHeaderName:s,onUploadProgress:s,onDownloadProgress:s,decompress:s,maxContentLength:s,maxBodyLength:s,beforeRedirect:s,transport:s,httpAgent:s,httpsAgent:s,cancelToken:s,socketPath:s,responseEncoding:s,validateStatus:i,headers:(d,l,m)=>r(fn(d),fn(l),m,!0)};return u.forEach(Object.keys({...e,...t}),function(l){if(l==="__proto__"||l==="constructor"||l==="prototype")return;const m=u.hasOwnProp(c,l)?c[l]:r,f=m(e[l],t[l],l);u.isUndefined(f)&&m!==i||(n[l]=f)}),n}const ka=e=>{const t=ue({},e);let{data:n,withXSRFToken:a,xsrfHeaderName:r,xsrfCookieName:o,headers:s,auth:i}=t;if(t.headers=s=z.from(s),t.url=pa(ha(t.baseURL,t.url,t.allowAbsoluteUrls),e.params,e.paramsSerializer),i&&s.set("Authorization","Basic "+btoa((i.username||"")+":"+(i.password?unescape(encodeURIComponent(i.password)):""))),u.isFormData(n)){if(J.hasStandardBrowserEnv||J.hasStandardBrowserWebWorkerEnv)s.setContentType(void 0);else if(u.isFunction(n.getHeaders)){const c=n.getHeaders(),d=["content-type","content-length"];Object.entries(c).forEach(([l,m])=>{d.includes(l.toLowerCase())&&s.set(l,m)})}}if(J.hasStandardBrowserEnv&&(a&&u.isFunction(a)&&(a=a(t)),a||a!==!1&&eo(t.url))){const c=r&&o&&to.read(o);c&&s.set(r,c)}return t},ro=typeof XMLHttpRequest<"u",oo=ro&&function(e){return new Promise(function(n,a){const r=ka(e);let o=r.data;const s=z.from(r.headers).normalize();let{responseType:i,onUploadProgress:c,onDownloadProgress:d}=r,l,m,f,v,g;function b(){v&&v(),g&&g(),r.cancelToken&&r.cancelToken.unsubscribe(l),r.signal&&r.signal.removeEventListener("abort",l)}let h=new XMLHttpRequest;h.open(r.method.toUpperCase(),r.url,!0),h.timeout=r.timeout;function A(){if(!h)return;const T=z.from("getAllResponseHeaders"in h&&h.getAllResponseHeaders()),j={data:!i||i==="text"||i==="json"?h.responseText:h.response,status:h.status,statusText:h.statusText,headers:T,config:e,request:h};ba(function(H){n(H),b()},function(H){a(H),b()},j),h=null}"onloadend"in h?h.onloadend=A:h.onreadystatechange=function(){!h||h.readyState!==4||h.status===0&&!(h.responseURL&&h.responseURL.indexOf("file:")===0)||setTimeout(A)},h.onabort=function(){h&&(a(new I("Request aborted",I.ECONNABORTED,e,h)),h=null)},h.onerror=function(P){const j=P&&P.message?P.message:"Network Error",F=new I(j,I.ERR_NETWORK,e,h);F.event=P||null,a(F),h=null},h.ontimeout=function(){let P=r.timeout?"timeout of "+r.timeout+"ms exceeded":"timeout exceeded";const j=r.transitional||Vt;r.timeoutErrorMessage&&(P=r.timeoutErrorMessage),a(new I(P,j.clarifyTimeoutError?I.ETIMEDOUT:I.ECONNABORTED,e,h)),h=null},o===void 0&&s.setContentType(null),"setRequestHeader"in h&&u.forEach(s.toJSON(),function(P,j){h.setRequestHeader(j,P)}),u.isUndefined(r.withCredentials)||(h.withCredentials=!!r.withCredentials),i&&i!=="json"&&(h.responseType=r.responseType),d&&([f,g]=tt(d,!0),h.addEventListener("progress",f)),c&&h.upload&&([m,v]=tt(c),h.upload.addEventListener("progress",m),h.upload.addEventListener("loadend",v)),(r.cancelToken||r.signal)&&(l=T=>{h&&(a(!T||T.type?new Ve(null,e,h):T),h.abort(),h=null)},r.cancelToken&&r.cancelToken.subscribe(l),r.signal&&(r.signal.aborted?l():r.signal.addEventListener("abort",l)));const M=Zr(r.url);if(M&&J.protocols.indexOf(M)===-1){a(new I("Unsupported protocol "+M+":",I.ERR_BAD_REQUEST,e));return}h.send(o||null)})},so=(e,t)=>{const{length:n}=e=e?e.filter(Boolean):[];if(t||n){let a=new AbortController,r;const o=function(d){if(!r){r=!0,i();const l=d instanceof Error?d:this.reason;a.abort(l instanceof I?l:new Ve(l instanceof Error?l.message:l))}};let s=t&&setTimeout(()=>{s=null,o(new I(`timeout of ${t}ms exceeded`,I.ETIMEDOUT))},t);const i=()=>{e&&(s&&clearTimeout(s),s=null,e.forEach(d=>{d.unsubscribe?d.unsubscribe(o):d.removeEventListener("abort",o)}),e=null)};e.forEach(d=>d.addEventListener("abort",o));const{signal:c}=a;return c.unsubscribe=()=>u.asap(i),c}},io=function*(e,t){let n=e.byteLength;if(n<t){yield e;return}let a=0,r;for(;a<n;)r=a+t,yield e.slice(a,r),a=r},lo=async function*(e,t){for await(const n of co(e))yield*io(n,t)},co=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:n,value:a}=await t.read();if(n)break;yield a}}finally{await t.cancel()}},bn=(e,t,n,a)=>{const r=lo(e,t);let o=0,s,i=c=>{s||(s=!0,a&&a(c))};return new ReadableStream({async pull(c){try{const{done:d,value:l}=await r.next();if(d){i(),c.close();return}let m=l.byteLength;if(n){let f=o+=m;n(f)}c.enqueue(new Uint8Array(l))}catch(d){throw i(d),d}},cancel(c){return i(c),r.return()}},{highWaterMark:2})},hn=64*1024,{isFunction:We}=u,uo=(({Request:e,Response:t})=>({Request:e,Response:t}))(u.global),{ReadableStream:kn,TextEncoder:yn}=u.global,vn=(e,...t)=>{try{return!!e(...t)}catch{return!1}},mo=e=>{e=u.merge.call({skipUndefined:!0},uo,e);const{fetch:t,Request:n,Response:a}=e,r=t?We(t):typeof fetch=="function",o=We(n),s=We(a);if(!r)return!1;const i=r&&We(kn),c=r&&(typeof yn=="function"?(g=>b=>g.encode(b))(new yn):async g=>new Uint8Array(await new n(g).arrayBuffer())),d=o&&i&&vn(()=>{let g=!1;const b=new n(J.origin,{body:new kn,method:"POST",get duplex(){return g=!0,"half"}}).headers.has("Content-Type");return g&&!b}),l=s&&i&&vn(()=>u.isReadableStream(new a("").body)),m={stream:l&&(g=>g.body)};r&&["text","arrayBuffer","blob","formData","stream"].forEach(g=>{!m[g]&&(m[g]=(b,h)=>{let A=b&&b[g];if(A)return A.call(b);throw new I(`Response type '${g}' is not supported`,I.ERR_NOT_SUPPORT,h)})});const f=async g=>{if(g==null)return 0;if(u.isBlob(g))return g.size;if(u.isSpecCompliantForm(g))return(await new n(J.origin,{method:"POST",body:g}).arrayBuffer()).byteLength;if(u.isArrayBufferView(g)||u.isArrayBuffer(g))return g.byteLength;if(u.isURLSearchParams(g)&&(g=g+""),u.isString(g))return(await c(g)).byteLength},v=async(g,b)=>{const h=u.toFiniteNumber(g.getContentLength());return h??f(b)};return async g=>{let{url:b,method:h,data:A,signal:M,cancelToken:T,timeout:P,onDownloadProgress:j,onUploadProgress:F,responseType:H,headers:Y,withCredentials:X="same-origin",fetchOptions:Je}=ka(g),ae=t||fetch;H=H?(H+"").toLowerCase():"text";let L=so([M,T&&T.toAbortSignal()],P),N=null;const K=L&&L.unsubscribe&&(()=>{L.unsubscribe()});let pe;try{if(F&&d&&h!=="get"&&h!=="head"&&(pe=await v(Y,A))!==0){let re=new n(b,{method:"POST",body:A,duplex:"half"}),ge;if(u.isFormData(A)&&(ge=re.headers.get("content-type"))&&Y.setContentType(ge),re.body){const[It,Ke]=pn(pe,tt(gn(F)));A=bn(re.body,hn,It,Ke)}}u.isString(X)||(X=X?"include":"omit");const G=o&&"credentials"in n.prototype,ee={...Je,signal:L,method:h.toUpperCase(),headers:Y.normalize().toJSON(),body:A,duplex:"half",credentials:G?X:void 0};N=o&&new n(b,ee);let Z=await(o?ae(N,Je):ae(b,ee));const se=l&&(H==="stream"||H==="response");if(l&&(j||se&&K)){const re={};["status","statusText","headers"].forEach(on=>{re[on]=Z[on]});const ge=u.toFiniteNumber(Z.headers.get("content-length")),[It,Ke]=j&&pn(ge,tt(gn(j),!0))||[];Z=new a(bn(Z.body,hn,It,()=>{Ke&&Ke(),K&&K()}),re)}H=H||"text";let Bt=await m[u.findKey(m,H)||"text"](Z,g);return!se&&K&&K(),await new Promise((re,ge)=>{ba(re,ge,{data:Bt,headers:z.from(Z.headers),status:Z.status,statusText:Z.statusText,config:g,request:N})})}catch(G){throw K&&K(),G&&G.name==="TypeError"&&/Load failed|fetch/i.test(G.message)?Object.assign(new I("Network Error",I.ERR_NETWORK,g,N,G&&G.response),{cause:G.cause||G}):I.from(G,G&&G.code,g,N,G&&G.response)}}},po=new Map,ya=e=>{let t=e&&e.env||{};const{fetch:n,Request:a,Response:r}=t,o=[a,r,n];let s=o.length,i=s,c,d,l=po;for(;i--;)c=o[i],d=l.get(c),d===void 0&&l.set(c,d=i?new Map:mo(t)),l=d;return d};ya();const Jt={http:_r,xhr:oo,fetch:{get:ya}};u.forEach(Jt,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const En=e=>`- ${e}`,go=e=>u.isFunction(e)||e===null||e===!1;function fo(e,t){e=u.isArray(e)?e:[e];const{length:n}=e;let a,r;const o={};for(let s=0;s<n;s++){a=e[s];let i;if(r=a,!go(a)&&(r=Jt[(i=String(a)).toLowerCase()],r===void 0))throw new I(`Unknown adapter '${i}'`);if(r&&(u.isFunction(r)||(r=r.get(t))))break;o[i||"#"+s]=r}if(!r){const s=Object.entries(o).map(([c,d])=>`adapter ${c} `+(d===!1?"is not supported by the environment":"is not available in the build"));let i=n?s.length>1?`since :
`+s.map(En).join(`
`):" "+En(s[0]):"as no adapter specified";throw new I("There is no suitable adapter to dispatch the request "+i,"ERR_NOT_SUPPORT")}return r}const va={getAdapter:fo,adapters:Jt};function xt(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new Ve(null,e)}function wn(e){return xt(e),e.headers=z.from(e.headers),e.data=Ct.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),va.getAdapter(e.adapter||Fe.adapter,e)(e).then(function(a){return xt(e),a.data=Ct.call(e,e.transformResponse,a),a.headers=z.from(a.headers),a},function(a){return fa(a)||(xt(e),a&&a.response&&(a.response.data=Ct.call(e,e.transformResponse,a.response),a.response.headers=z.from(a.response.headers))),Promise.reject(a)})}const Ea="1.13.6",vt={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{vt[e]=function(a){return typeof a===e||"a"+(t<1?"n ":" ")+e}});const Bn={};vt.transitional=function(t,n,a){function r(o,s){return"[Axios v"+Ea+"] Transitional option '"+o+"'"+s+(a?". "+a:"")}return(o,s,i)=>{if(t===!1)throw new I(r(s," has been removed"+(n?" in "+n:"")),I.ERR_DEPRECATED);return n&&!Bn[s]&&(Bn[s]=!0,console.warn(r(s," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(o,s,i):!0}};vt.spelling=function(t){return(n,a)=>(console.warn(`${a} is likely a misspelling of ${t}`),!0)};function bo(e,t,n){if(typeof e!="object")throw new I("options must be an object",I.ERR_BAD_OPTION_VALUE);const a=Object.keys(e);let r=a.length;for(;r-- >0;){const o=a[r],s=t[o];if(s){const i=e[o],c=i===void 0||s(i,o,e);if(c!==!0)throw new I("option "+o+" must be "+c,I.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new I("Unknown option "+o,I.ERR_BAD_OPTION)}}const Ye={assertOptions:bo,validators:vt},Q=Ye.validators;let ce=class{constructor(t){this.defaults=t||{},this.interceptors={request:new un,response:new un}}async request(t,n){try{return await this._request(t,n)}catch(a){if(a instanceof Error){let r={};Error.captureStackTrace?Error.captureStackTrace(r):r=new Error;const o=r.stack?r.stack.replace(/^.+\n/,""):"";try{a.stack?o&&!String(a.stack).endsWith(o.replace(/^.+\n.+\n/,""))&&(a.stack+=`
`+o):a.stack=o}catch{}}throw a}}_request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=ue(this.defaults,n);const{transitional:a,paramsSerializer:r,headers:o}=n;a!==void 0&&Ye.assertOptions(a,{silentJSONParsing:Q.transitional(Q.boolean),forcedJSONParsing:Q.transitional(Q.boolean),clarifyTimeoutError:Q.transitional(Q.boolean),legacyInterceptorReqResOrdering:Q.transitional(Q.boolean)},!1),r!=null&&(u.isFunction(r)?n.paramsSerializer={serialize:r}:Ye.assertOptions(r,{encode:Q.function,serialize:Q.function},!0)),n.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?n.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:n.allowAbsoluteUrls=!0),Ye.assertOptions(n,{baseUrl:Q.spelling("baseURL"),withXsrfToken:Q.spelling("withXSRFToken")},!0),n.method=(n.method||this.defaults.method||"get").toLowerCase();let s=o&&u.merge(o.common,o[n.method]);o&&u.forEach(["delete","get","head","post","put","patch","common"],g=>{delete o[g]}),n.headers=z.concat(s,o);const i=[];let c=!0;this.interceptors.request.forEach(function(b){if(typeof b.runWhen=="function"&&b.runWhen(n)===!1)return;c=c&&b.synchronous;const h=n.transitional||Vt;h&&h.legacyInterceptorReqResOrdering?i.unshift(b.fulfilled,b.rejected):i.push(b.fulfilled,b.rejected)});const d=[];this.interceptors.response.forEach(function(b){d.push(b.fulfilled,b.rejected)});let l,m=0,f;if(!c){const g=[wn.bind(this),void 0];for(g.unshift(...i),g.push(...d),f=g.length,l=Promise.resolve(n);m<f;)l=l.then(g[m++],g[m++]);return l}f=i.length;let v=n;for(;m<f;){const g=i[m++],b=i[m++];try{v=g(v)}catch(h){b.call(this,h);break}}try{l=wn.call(this,v)}catch(g){return Promise.reject(g)}for(m=0,f=d.length;m<f;)l=l.then(d[m++],d[m++]);return l}getUri(t){t=ue(this.defaults,t);const n=ha(t.baseURL,t.url,t.allowAbsoluteUrls);return pa(n,t.params,t.paramsSerializer)}};u.forEach(["delete","get","head","options"],function(t){ce.prototype[t]=function(n,a){return this.request(ue(a||{},{method:t,url:n,data:(a||{}).data}))}});u.forEach(["post","put","patch"],function(t){function n(a){return function(o,s,i){return this.request(ue(i||{},{method:t,headers:a?{"Content-Type":"multipart/form-data"}:{},url:o,data:s}))}}ce.prototype[t]=n(),ce.prototype[t+"Form"]=n(!0)});let ho=class wa{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(o){n=o});const a=this;this.promise.then(r=>{if(!a._listeners)return;let o=a._listeners.length;for(;o-- >0;)a._listeners[o](r);a._listeners=null}),this.promise.then=r=>{let o;const s=new Promise(i=>{a.subscribe(i),o=i}).then(r);return s.cancel=function(){a.unsubscribe(o)},s},t(function(o,s,i){a.reason||(a.reason=new Ve(o,s,i),n(a.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}toAbortSignal(){const t=new AbortController,n=a=>{t.abort(a)};return this.subscribe(n),t.signal.unsubscribe=()=>this.unsubscribe(n),t.signal}static source(){let t;return{token:new wa(function(r){t=r}),cancel:t}}};function ko(e){return function(n){return e.apply(null,n)}}function yo(e){return u.isObject(e)&&e.isAxiosError===!0}const Dt={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(Dt).forEach(([e,t])=>{Dt[t]=e});function Ba(e){const t=new ce(e),n=na(ce.prototype.request,t);return u.extend(n,ce.prototype,t,{allOwnKeys:!0}),u.extend(n,t,null,{allOwnKeys:!0}),n.create=function(r){return Ba(ue(e,r))},n}const U=Ba(Fe);U.Axios=ce;U.CanceledError=Ve;U.CancelToken=ho;U.isCancel=fa;U.VERSION=Ea;U.toFormData=yt;U.AxiosError=I;U.Cancel=U.CanceledError;U.all=function(t){return Promise.all(t)};U.spread=ko;U.isAxiosError=yo;U.mergeConfig=ue;U.AxiosHeaders=z;U.formToJSON=e=>ga(u.isHTMLForm(e)?new FormData(e):e);U.getAdapter=va.getAdapter;U.HttpStatusCode=Dt;U.default=U;const{Axios:Ni,AxiosError:Ui,CanceledError:Hi,isCancel:Fi,CancelToken:Vi,VERSION:Gi,all:Ji,Cancel:Ki,isAxiosError:Wi,spread:zi,toFormData:Xi,AxiosHeaders:Zi,HttpStatusCode:Qi,formToJSON:Yi,getAdapter:el,mergeConfig:tl}=U;window.axios=U;window.axios.defaults.headers.common["X-Requested-With"]="XMLHttpRequest";const Kt="transit_user",oe="transit_token",Ot="transit_pending_toast";function Ce(){try{return typeof window<"u"&&typeof window.localStorage<"u"}catch{return!1}}function Ia(){try{return typeof window<"u"&&typeof window.sessionStorage<"u"}catch{return!1}}function vo(){if(window.transitAuthUser)return window.transitAuthUser;if(!Ce())return null;const e=window.localStorage.getItem(Kt);if(!e)return null;try{return JSON.parse(e)}catch{return De(),null}}function Sa(e){if(!Ce()){window.transitAuthUser=e;return}window.transitAuthUser=e,window.localStorage.setItem(Kt,JSON.stringify(e))}function Eo(){if(!Ce()){window.transitAuthUser=null;return}window.transitAuthUser=null,window.localStorage.removeItem(Kt)}function Wt(){return typeof window<"u"&&typeof window.transitAuthToken=="string"&&window.transitAuthToken!==""?window.transitAuthToken:Ce()?window.localStorage.getItem(oe):null}function wo(e){const t=typeof e=="string"?e:"";if(!Ce()){window.transitAuthToken=t||null;return}if(window.transitAuthToken=t||null,t===""){window.localStorage.removeItem(oe),document.cookie=oe+"=; path=/; max-age=0; samesite=lax";return}window.localStorage.setItem(oe,t),document.cookie=oe+"="+t+"; path=/; max-age=86400; samesite=lax"}function Bo(){if(!Ce()){window.transitAuthToken=null,document.cookie=oe+"=; path=/; max-age=0; samesite=lax";return}window.transitAuthToken=null,window.localStorage.removeItem(oe),document.cookie=oe+"=; path=/; max-age=0; samesite=lax"}function Io(e){Ia()&&window.sessionStorage.setItem(Ot,JSON.stringify(e))}function So(){if(!Ia())return null;const e=window.sessionStorage.getItem(Ot);if(!e)return null;window.sessionStorage.removeItem(Ot);try{return JSON.parse(e)}catch{return null}}function De(){Eo(),Bo()}function $a(e,t){if(!e)return t;if(typeof e.detail=="string"&&e.detail!=="")return e.detail;if(typeof e.message=="string"&&e.message!=="")return e.message;if(e.errors&&typeof e.errors=="object"){const n=Object.values(e.errors).flat()[0];if(typeof n=="string"&&n!=="")return n}return t}function In(){return document.body.dataset.apiBase||"/api"}function Ca(e=""){const t=String(e).replace(/^\/+/,"");return t===""?In():`${In()}/${t}`}async function E(e,t={}){const{method:n="GET",body:a=null,headers:r={},auth:o=!0}=t,s=new Headers(r);s.set("Accept","application/json"),s.set("X-Requested-With","XMLHttpRequest");let i=a;if(a&&!(a instanceof FormData)&&!(a instanceof Blob)&&(s.set("Content-Type","application/json"),i=JSON.stringify(a)),o){const m=Wt();m&&s.set("Authorization",`Bearer ${m}`)}if(!["GET","HEAD","OPTIONS"].includes(n.toUpperCase())){const m=document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");m&&s.set("X-CSRF-TOKEN",m)}const c=await fetch(Ca(e),{method:n,headers:s,body:i,credentials:"same-origin"});let d=null;const l=c.headers.get("content-type")||"";if(c.status!==204&&(d=l.includes("application/json")?await c.json():await c.text()),!c.ok){c.status===401&&(De(),(document.body.dataset.routeGuard||"none")==="protected"&&window.location.replace(document.body.dataset.loginUrl||"/login"));const m=$a(d,`Request gagal (${c.status})`),f=new Error(m);throw f.status=c.status,f.data=d,f}return d}async function zt(e,t="export.csv"){const n=new Headers({Accept:"text/csv,application/octet-stream","X-Requested-With":"XMLHttpRequest"}),a=Wt();a&&n.set("Authorization",`Bearer ${a}`);const r=await fetch(Ca(e),{method:"GET",headers:n,credentials:"same-origin"});if(!r.ok){let m=null;throw(r.headers.get("content-type")||"").includes("application/json")&&(m=await r.json()),new Error($a(m,"Gagal mengunduh file"))}const o=await r.blob(),c=(r.headers.get("content-disposition")||"").match(/filename="?([^"]+)"?/i)?.[1]||t,d=window.URL.createObjectURL(o),l=document.createElement("a");l.href=d,l.download=c,document.body.appendChild(l),l.click(),l.remove(),window.URL.revokeObjectURL(d)}function Te(e,t){const n=document.getElementById(e);n&&(n.textContent=t)}function $o(e){const t=e?.role||"";document.querySelectorAll("[data-role-scope]").forEach(n=>{const a=n.dataset.roleScope,r=a==="admin"?["Super Admin","Admin"].includes(t):a==="super"?t==="Super Admin":!0;n.hidden=!r})}function xa(){return vo()}function nt(e){if($o(e),!e)return;const t=e.nama||"Admin",n=t.trim().split(/\s+/)[0]||"Admin",a=e.email||"admin@pekanbaru.com";Te("sidebar-user-name",t),Te("sidebar-user-email",a),Te("header-user-name",n),Te("dropdown-user-name",t),Te("dropdown-user-email",a)}function _a(e){return typeof e.access_token=="string"&&e.access_token!==""&&wo(e.access_token),Sa(e.user),nt(e.user),e}async function Co(e){const t=await E("/auth/login",{method:"POST",body:e,auth:!1});return _a(t)}async function xo(e){const t=await E("/auth/register",{method:"POST",body:e,auth:!1});return _a(t)}async function Sn(){const e=await E("/auth/me");return Sa(e),nt(e),e}async function _o(){try{await E("/auth/logout",{method:"POST"})}catch(e){if(e?.status!==401)throw e}De(),Io({type:"success",title:"Logout berhasil",message:"Sampai jumpa kembali!"}),window.location.replace(document.body.dataset.loginUrl||"/login")}function $n(e){window.location.replace(e)}async function Lo(){const e=document.body.dataset.routeGuard||"none",t=document.body.dataset.loginUrl||"/login",n=document.body.dataset.dashboardUrl||"/dashboard",a=xa();if(e==="public"){try{const r=await Sn();return $n(n),{user:r}}catch{(a||Wt())&&De()}return{user:null}}if(e==="protected")try{return{user:await Sn()}}catch{return De(),$n(t),{user:null}}return{user:a}}function Xt(){return Array.from(document.querySelectorAll(".modal-shell")).filter(e=>!e.hidden)}function La(){document.body.style.overflow=Xt().length>0?"hidden":""}function q(e){const t=document.getElementById(e);t&&(t.hidden=!1,La())}function V(e=null){if(e){const t=document.getElementById(e);t&&(t.hidden=!0)}else Xt().forEach(t=>{t.hidden=!0});La()}function To(){document.addEventListener("click",e=>{const t=e.target.closest("[data-modal-open]");if(t){q(t.dataset.modalOpen);return}const n=e.target.closest("[data-modal-close]");if(n){const a=n.dataset.modalClose||n.closest(".modal-shell")?.id;V(a||void 0)}}),document.addEventListener("keydown",e=>{if(e.key!=="Escape")return;const t=Xt().pop();t&&V(t.id)})}function Zt(e,t,n){const a=document.getElementById("transit-toast-root");if(!a)return;const r=document.createElement("div");r.className=`transit-toast ${n==="error"?"is-error":""} ${n==="info"?"is-info":""}`.trim(),r.innerHTML=`
        <div>
            <strong>${e}</strong>
            <p>${t}</p>
        </div>
    `,a.appendChild(r),window.requestAnimationFrame(()=>{r.classList.add("is-visible")}),window.setTimeout(()=>{r.classList.remove("is-visible"),window.setTimeout(()=>r.remove(),180)},3600)}function O(e,t="Berhasil"){Zt(t,e,"success")}function y(e,t="Gagal"){Zt(t,e,"error")}function Ao(e,t="Info"){Zt(t,e,"info")}function Ae(e){const t=document.querySelector("[data-sidebar]"),n=document.querySelector("[data-sidebar-overlay]");!t||!n||(t.classList.toggle("is-open",e),n.hidden=!e)}function et(e=null){document.querySelectorAll("[data-user-dropdown]").forEach(t=>{if(e&&t===e)return;t.classList.remove("is-open");const n=t.querySelector("[data-user-menu-trigger]"),a=t.querySelector("[data-user-menu-panel]");n&&n.setAttribute("aria-expanded","false"),a&&(a.hidden=!0)})}function Ro(e,t=null){if(!e)return;const n=e.querySelector("[data-user-menu-trigger]"),a=e.querySelector("[data-user-menu-panel]"),r=t??!e.classList.contains("is-open");et(r?e:null),e.classList.toggle("is-open",r),n&&n.setAttribute("aria-expanded",r?"true":"false"),a&&(a.hidden=!r)}function Mo(){document.querySelector("[data-sidebar-open]")?.addEventListener("click",()=>{Ae(!0)}),document.querySelector("[data-sidebar-close]")?.addEventListener("click",()=>{Ae(!1)}),document.querySelector("[data-sidebar-overlay]")?.addEventListener("click",()=>{Ae(!1)}),document.querySelectorAll("[data-user-dropdown]").forEach(e=>{e.querySelector("[data-user-menu-trigger]")?.addEventListener("click",t=>{t.stopPropagation(),Ro(e)})}),document.addEventListener("click",e=>{e.target.closest("[data-user-dropdown]")||et()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&(et(),Ae(!1))}),window.addEventListener("resize",()=>{window.innerWidth>1100&&Ae(!1)}),document.querySelectorAll("[data-auth-logout]").forEach(e=>{e.addEventListener("click",async()=>{V(),et();try{e.disabled=!0,await _o()}catch(t){e.disabled=!1,y(t.message||"Gagal logout")}})})}const Ta={login:{title:"Selamat Datang!",description:"Masuk ke akun Anda untuk melanjutkan",submit:"Masuk",switchText:"Belum punya akun?",switchAction:"Daftar sekarang"},register:{title:"Buat Akun Baru",description:"Daftar untuk mulai menggunakan sistem",submit:"Daftar",switchText:"Sudah punya akun?",switchAction:"Masuk"}};function Cn(e,t){const n=Ta[e];t.form.dataset.authMode=e,t.title.textContent=n.title,t.description.textContent=n.description,t.submitText.textContent=n.submit,t.switchText&&(t.switchText.textContent=n.switchText),t.switchButton&&(t.switchButton.textContent=n.switchAction),t.nameField.hidden=e!=="register",t.nameInput.required=e==="register"}function Po(){const e=document.getElementById("auth-form");if(!e)return;const t={form:e,title:document.querySelector("[data-auth-title]"),description:document.querySelector("[data-auth-description]"),submitText:document.querySelector("[data-auth-submit-text]"),switchText:document.querySelector("[data-auth-switch-text]"),switchButton:document.querySelector("[data-toggle-auth-mode]"),nameField:document.getElementById("auth-name-field"),nameInput:document.getElementById("nama"),emailInput:document.getElementById("email"),passwordInput:document.getElementById("password"),passwordToggle:document.querySelector("[data-toggle-password]"),submitButton:document.getElementById("auth-submit-button")},n=document.body.dataset.dashboardUrl||"/dashboard";Cn("login",t),t.switchButton?.addEventListener("click",()=>{const a=t.form.dataset.authMode==="login"?"register":"login";Cn(a,t)}),t.passwordToggle?.addEventListener("click",()=>{const a=t.passwordInput.type==="password"?"text":"password";t.passwordInput.type=a,t.passwordToggle.textContent=a==="password"?"Lihat":"Sembunyikan"}),e.addEventListener("submit",async a=>{a.preventDefault();const r=new FormData(e),o=e.dataset.authMode||"login",s={email:String(r.get("email")||"").trim(),password:String(r.get("password")||"").trim()};o==="register"&&(s.nama=String(r.get("nama")||"").trim()),t.submitButton.disabled=!0,t.submitText.textContent=o==="login"?"Memproses...":"Mendaftarkan...";try{o==="login"?(await Co(s),O("Selamat datang kembali","Login berhasil!")):(await xo(s),O("Akun Anda telah dibuat","Registrasi berhasil!")),window.location.replace(n)}catch(i){y(i.message||"Terjadi kesalahan",o==="login"?"Login gagal":"Registrasi gagal")}finally{t.submitButton.disabled=!1,t.submitText.textContent=Ta[o].submit}})}const Do=new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}),Oo=new Intl.NumberFormat("id-ID");function D(e){return Do.format(Number(e)||0)}function R(e){return Oo.format(Number(e)||0)}function p(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function xe(e,t=300){let n=null;return(...a)=>{window.clearTimeout(n),n=window.setTimeout(()=>e(...a),t)}}function _e(e,t,n,a){if(n===0||a===0)return"Menampilkan 0 - 0 dari 0 data";const r=(e-1)*t+1,o=r+a-1;return`Menampilkan ${r} - ${o} dari ${n} data`}function qo(e){if(!e)return"-";const t=new Date(e);return Number.isNaN(t.getTime())?e:new Intl.DateTimeFormat("id-ID",{day:"2-digit",month:"short",year:"numeric"}).format(t)}function Ge(){return new Date().toISOString().slice(0,10)}function de(e,t,n="Memproses..."){e&&(e.dataset.defaultText||(e.dataset.defaultText=e.textContent.trim()),e.disabled=t,e.textContent=t?n:e.dataset.defaultText)}const at=["#059669","#10B981","#34D399","#6EE7B7","#A7F3D0"],ne={revenueChart:null,passengerChart:null,mobilChart:null};function jo(){const e=document.getElementById("dashboard-initial-state");if(!e)return{stats:{},revenueData:[],mobilRevenue:[]};try{return JSON.parse(e.textContent||"{}")}catch{return{stats:{},revenueData:[],mobilRevenue:[]}}}function Qt(e){e&&typeof e.destroy=="function"&&e.destroy()}function No(e,t){const n=document.querySelector(`[data-stat="${e}"]`);if(!n)return;const a=["total_uang_bersih","total_uang_pc"];n.textContent=a.includes(e)?D(t):R(t)}function Aa(e,t,n){const a=document.getElementById(e),r=document.getElementById(t);a&&(a.hidden=!n),r&&(r.hidden=n)}function Uo(){return"#065f46"}function qt(){return"#d1fae5"}function Yt(){return{backgroundColor:"#ffffff",titleColor:"#064e3b",bodyColor:"#065f46",borderColor:"#d1fae5",borderWidth:1,padding:12,cornerRadius:12,displayColors:!0}}function Ho(e){const t=document.getElementById("dashboard-revenue-chart"),n=Array.isArray(e)&&e.length>0;if(Aa("dashboard-revenue-chart","dashboard-revenue-empty",n),Qt(ne.revenueChart),!t||!window.Chart||!n){ne.revenueChart=null;return}ne.revenueChart=new window.Chart(t,{type:"line",data:{labels:e.map(a=>a.bulan),datasets:[{label:"Pendapatan Bersih",data:e.map(a=>a.uang_bersih),borderColor:"#059669",backgroundColor:"rgba(5, 150, 105, 0.08)",fill:!1,tension:.35,pointRadius:4,pointHoverRadius:5,pointBackgroundColor:"#059669",pointBorderColor:"#ffffff",pointBorderWidth:2,borderWidth:3},{label:"Uang PC",data:e.map(a=>a.uang_pc),borderColor:"#f59e0b",backgroundColor:"rgba(245, 158, 11, 0.1)",fill:!1,tension:.35,pointRadius:4,pointHoverRadius:5,pointBackgroundColor:"#f59e0b",pointBorderColor:"#ffffff",pointBorderWidth:2,borderWidth:3}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{labels:{color:Uo(),usePointStyle:!0,pointStyle:"circle",boxWidth:8,boxHeight:8,padding:18}},tooltip:{...Yt(),callbacks:{label(a){return`${a.dataset.label}: ${D(a.parsed.y)}`}}}},scales:{x:{ticks:{color:"#047857",font:{size:12}},grid:{color:qt()},border:{display:!1}},y:{ticks:{color:"#047857",font:{size:12},callback(a){return`${Math.round(Number(a)/1e6)}jt`}},grid:{color:qt()},border:{display:!1}}}}})}function Fo(e){const t=document.getElementById("dashboard-passenger-chart"),n=Array.isArray(e)&&e.length>0;if(Aa("dashboard-passenger-chart","dashboard-passenger-empty",n),Qt(ne.passengerChart),!t||!window.Chart||!n){ne.passengerChart=null;return}ne.passengerChart=new window.Chart(t,{type:"bar",data:{labels:e.map(a=>a.bulan),datasets:[{label:"Penumpang",data:e.map(a=>a.penumpang),backgroundColor:"#10B981",borderRadius:8,maxBarThickness:44}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{...Yt(),callbacks:{label(a){return`Penumpang: ${R(a.parsed.y)}`}}}},scales:{x:{ticks:{color:"#047857",font:{size:12}},grid:{color:"rgba(0, 0, 0, 0)"},border:{display:!1}},y:{ticks:{color:"#047857",font:{size:12}},grid:{color:qt()},border:{display:!1}}}}})}function Vo(e){const t=document.getElementById("dashboard-mobil-list");t&&(t.innerHTML=e.map((n,a)=>`
        <div class="dashboard-mobil-item">
            <div class="dashboard-mobil-meta">
                <span class="dashboard-mobil-dot" style="background-color: ${at[a%at.length]}"></span>
                <div>
                    <p class="dashboard-mobil-code">${p(n.kode_mobil)}</p>
                    <p class="dashboard-mobil-trips">${R(n.total_trips)} trip</p>
                    <p class="dashboard-mobil-passengers">${R(n.total_penumpang)} penumpang</p>
                </div>
            </div>
            <p class="dashboard-mobil-value">${D(n.total_uang_bersih)}</p>
        </div>
    `).join(""))}function Go(e){const t=document.getElementById("dashboard-mobil-chart"),n=document.getElementById("dashboard-mobil-content"),a=document.getElementById("dashboard-mobil-empty"),r=document.getElementById("dashboard-mobil-chart-empty"),o=document.getElementById("dashboard-mobil-list"),s=Array.isArray(e)&&e.length>0,i=s&&e.some(c=>Number(c.total_uang_bersih)>0);if(Qt(ne.mobilChart),n&&(n.hidden=!s),a&&(a.hidden=s),t&&(t.hidden=!i),r&&(r.hidden=i),s?Vo(e):o&&(o.innerHTML=""),!t||!window.Chart||!i){ne.mobilChart=null;return}ne.mobilChart=new window.Chart(t,{type:"doughnut",data:{labels:e.map(c=>c.kode_mobil),datasets:[{data:e.map(c=>c.total_uang_bersih),backgroundColor:e.map((c,d)=>at[d%at.length]),borderColor:"#ffffff",borderWidth:6,hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"58%",plugins:{legend:{display:!1},tooltip:{...Yt(),callbacks:{label(c){const d=e[c.dataIndex]||{};return`${c.label}: ${D(c.parsed)} / ${R(d.total_penumpang||0)} penumpang`}}}}}})}function xn(e){Object.entries(e.stats||{}).forEach(([t,n])=>No(t,n)),Ho(e.revenueData||[]),Fo(e.revenueData||[]),Go(e.mobilRevenue||[])}async function Jo(){const[e,t,n]=await Promise.all([E("/statistics/dashboard"),E("/statistics/revenue-chart"),E("/statistics/mobil-revenue")]);return{stats:e,revenueData:t,mobilRevenue:n}}function _n(e){const t=document.querySelector("[data-dashboard-loading]"),n=document.querySelector("[data-dashboard-content]"),a=document.getElementById("dashboard-refresh-btn");t&&(t.hidden=!e),n&&(n.hidden=e),a&&(a.disabled=e)}async function Ko(){const e=document.getElementById("dashboard-refresh-btn");e&&(xn(jo()),e.addEventListener("click",async()=>{_n(!0);try{xn(await Jo())}catch{y("Silakan coba lagi","Gagal memuat data")}finally{_n(!1)}}))}const _={data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1},Ie=10;function Wo(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function zo(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 21C15 17.4 18 14.4 18 10.5C18 7.18629 15.3137 4.5 12 4.5C8.68629 4.5 6 7.18629 6 10.5C6 14.4 9 17.4 12 21Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
            <circle cx="12" cy="10.5" r="2.25" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function Xo(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Zo(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function rt(e){const t=document.getElementById("driver-submit-btn");_.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":_.editItem?"Perbarui":"Simpan")}function Qo(){const e=document.getElementById("drivers-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="drivers-table-state">
                <div class="drivers-loading-inline">
                    <span class="drivers-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function Yo(){const e=document.getElementById("drivers-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="drivers-table-state drivers-empty-copy">
                Belum ada data driver
            </td>
        </tr>
    `)}function Ln(){const e=document.getElementById("drivers-table-body");if(e){if(_.loading){Qo();return}if(_.data.length===0){Yo();return}e.innerHTML=_.data.map((t,n)=>`
        <tr class="drivers-row" data-testid="driver-row-${t.id}">
            <td class="drivers-index-cell">${(_.page-1)*Ie+n+1}</td>
            <td>
                <div class="drivers-user-cell">
                    <span class="drivers-user-avatar" aria-hidden="true">
                        ${Wo()}
                    </span>
                    <span class="drivers-user-name">${p(t.nama)}</span>
                </div>
            </td>
            <td>
                <div class="drivers-location-cell">
                    <span class="drivers-location-icon" aria-hidden="true">${zo()}</span>
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
                        ${Xo()}
                    </button>
                    <button
                        class="drivers-icon-button drivers-icon-button-danger"
                        type="button"
                        data-driver-delete="${t.id}"
                        data-driver-name="${p(t.nama)}"
                        data-testid="delete-driver-${t.id}"
                        aria-label="Hapus driver ${p(t.nama)}"
                    >
                        ${Zo()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function Tn(){const e=document.getElementById("drivers-pagination-shell"),t=document.getElementById("drivers-pagination-info"),n=document.getElementById("drivers-pagination-page"),a=document.getElementById("drivers-prev-page-btn"),r=document.getElementById("drivers-next-page-btn"),o=Math.max(1,Math.ceil(_.totalCount/Ie));e&&(e.hidden=o<=1),t&&(t.textContent=_e(_.page,Ie,_.totalCount,_.data.length)),n&&(n.textContent=`${_.page} / ${o}`),a&&(a.disabled=_.page===1),r&&(r.disabled=_.page>=o)}async function fe(){_.loading=!0,Ln(),Tn();try{const[e,t]=await Promise.all([E(`/drivers?page=${_.page}&limit=${Ie}${_.search?`&search=${encodeURIComponent(_.search)}`:""}`),E(`/drivers/count${_.search?`?search=${encodeURIComponent(_.search)}`:""}`)]);_.data=Array.isArray(e)?e:[],_.totalCount=Number(t.count||0)}finally{_.loading=!1,Ln(),Tn()}}function An(){const e=document.getElementById("driver-form"),t=document.getElementById("driver-form-title"),n=document.getElementById("driver-form-description"),a=document.getElementById("driver-id"),r=document.getElementById("driver-nama"),o=document.getElementById("driver-lokasi");e?.reset(),a&&(a.value=""),r&&(r.value=""),o&&(o.value=""),t&&(t.textContent="Tambah Driver Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan data driver"),_.editItem=null,rt(!1)}function es(e){const t=document.getElementById("driver-form-title"),n=document.getElementById("driver-form-description"),a=document.getElementById("driver-id"),r=document.getElementById("driver-nama"),o=document.getElementById("driver-lokasi");_.editItem=e,a&&(a.value=e.id),r&&(r.value=e.nama),o&&(o.value=e.lokasi),t&&(t.textContent="Edit Data Driver"),n&&(n.textContent="Isi form di bawah untuk memperbarui data driver"),rt(!1)}async function ts(e){const t=await E(`/drivers/${e}`);es(t),q("driver-form-modal")}function ns(e){const t=document.getElementById("driver-delete-copy");_.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus driver <strong>${p(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`),q("driver-delete-modal")}function as(){const e=document.getElementById("drivers-add-btn"),t=document.getElementById("drivers-export-btn"),n=document.getElementById("drivers-search-input"),a=document.getElementById("driver-form"),r=document.getElementById("drivers-table-body"),o=document.getElementById("driver-delete-confirm-btn"),s=document.getElementById("drivers-prev-page-btn"),i=document.getElementById("drivers-next-page-btn");if(!(!e||!a||!r))return e.addEventListener("click",()=>{An(),q("driver-form-modal")}),t?.addEventListener("click",()=>{zt("/export/drivers/csv","drivers.csv").catch(()=>{y("Gagal mengunduh file")})}),n?.addEventListener("input",xe(async c=>{_.search=c.target.value.trim(),_.page=1;try{await fe()}catch{y("Gagal memuat data")}})),a.addEventListener("submit",async c=>{c.preventDefault();const d={nama:document.getElementById("driver-nama")?.value.trim()||"",lokasi:document.getElementById("driver-lokasi")?.value.trim()||""};rt(!0);try{_.editItem?(await E(`/drivers/${_.editItem.id}`,{method:"PUT",body:d}),O("Data driver berhasil diperbarui")):(await E("/drivers",{method:"POST",body:d}),O("Driver berhasil ditambahkan")),V("driver-form-modal"),An(),await fe()}catch(l){y(l.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{rt(!1)}}),r.addEventListener("click",async c=>{const d=c.target.closest("[data-driver-edit]"),l=c.target.closest("[data-driver-delete]");try{if(d){await ts(d.dataset.driverEdit);return}l&&ns({id:l.dataset.driverDelete,nama:l.dataset.driverName})}catch{y("Gagal memuat data")}}),o?.addEventListener("click",async()=>{if(_.deleteItem)try{await E(`/drivers/${_.deleteItem.id}`,{method:"DELETE"}),O("Driver berhasil dihapus"),V("driver-delete-modal"),(_.page-1)*Ie>=_.totalCount-1&&_.page>1&&(_.page-=1),_.deleteItem=null,await fe()}catch{y("Gagal menghapus data")}}),s?.addEventListener("click",async()=>{if(!(_.page<=1)){_.page-=1;try{await fe()}catch{y("Gagal memuat data")}}}),i?.addEventListener("click",async()=>{const c=Math.max(1,Math.ceil(_.totalCount/Ie));if(!(_.page>=c)){_.page+=1;try{await fe()}catch{y("Gagal memuat data")}}}),fe().catch(()=>{y("Gagal memuat data")})}const w={data:[],loading:!0,totalCount:0,page:1,search:"",filterJenis:"",editItem:null,deleteItem:null,isSubmitting:!1},Se=10;function rs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M5 14L6.6 9.2C6.8728 8.3816 7.6387 7.83 8.5014 7.83H15.4986C16.3613 7.83 17.1272 8.3816 17.4 9.2L19 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M4 14H20V17C20 18.1046 19.1046 19 18 19H6C4.89543 19 4 18.1046 4 17V14Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M7 16H7.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path>
            <path d="M17 16H17.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path>
        </svg>
    `}function os(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function ss(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function is(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 13L11 22L2 13V4H11L20 13Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <circle cx="7.5" cy="8.5" r="1.5" fill="currentColor"></circle>
        </svg>
    `}function ot(e){const t=document.getElementById("mobil-submit-btn");w.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":w.editItem?"Perbarui":"Simpan")}function ls(e){return e==="Hiace"?"mobil-jenis-badge mobil-jenis-badge-hiace":"mobil-jenis-badge mobil-jenis-badge-reborn"}function ds(){const e=document.getElementById("mobil-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="mobil-table-state">
                <div class="mobil-loading-inline">
                    <span class="mobil-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function cs(){const e=document.getElementById("mobil-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="mobil-table-state mobil-empty-copy">
                Belum ada data mobil
            </td>
        </tr>
    `)}function Rn(){const e=document.getElementById("mobil-table-body");if(e){if(w.loading){ds();return}if(w.data.length===0){cs();return}e.innerHTML=w.data.map((t,n)=>`
        <tr class="mobil-row" data-testid="mobil-row-${t.id}">
            <td class="mobil-index-cell">${(w.page-1)*Se+n+1}</td>
            <td>
                <div class="mobil-code-cell">
                    <span class="mobil-code-avatar" aria-hidden="true">
                        ${rs()}
                    </span>
                    <span class="mobil-code-text">${p(t.kode_mobil)}</span>
                </div>
            </td>
            <td>
                <span class="${ls(t.jenis_mobil)}">
                    <span class="mobil-jenis-icon" aria-hidden="true">${is()}</span>
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
                        ${os()}
                    </button>
                    <button
                        class="mobil-icon-button mobil-icon-button-danger"
                        type="button"
                        data-mobil-delete="${t.id}"
                        data-mobil-name="${p(t.kode_mobil)}"
                        data-testid="delete-mobil-${t.id}"
                        aria-label="Hapus mobil ${p(t.kode_mobil)}"
                    >
                        ${ss()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function Mn(){const e=document.getElementById("mobil-pagination-shell"),t=document.getElementById("mobil-pagination-info"),n=document.getElementById("mobil-pagination-page"),a=document.getElementById("mobil-prev-page-btn"),r=document.getElementById("mobil-next-page-btn"),o=Math.max(1,Math.ceil(w.totalCount/Se));e&&(e.hidden=o<=1),t&&(t.textContent=_e(w.page,Se,w.totalCount,w.data.length)),n&&(n.textContent=`${w.page} / ${o}`),a&&(a.disabled=w.page===1),r&&(r.disabled=w.page>=o)}async function ie(){w.loading=!0,Rn(),Mn();try{const[e,t]=await Promise.all([E(`/mobil?page=${w.page}&limit=${Se}${w.search?`&search=${encodeURIComponent(w.search)}`:""}${w.filterJenis?`&jenis=${encodeURIComponent(w.filterJenis)}`:""}`),E(`/mobil/count${w.search||w.filterJenis?"?":""}${[w.search?`search=${encodeURIComponent(w.search)}`:"",w.filterJenis?`jenis=${encodeURIComponent(w.filterJenis)}`:""].filter(Boolean).join("&")}`)]);w.data=Array.isArray(e)?e:[],w.totalCount=Number(t.count||0)}finally{w.loading=!1,Rn(),Mn()}}function Pn(){const e=document.getElementById("mobil-form"),t=document.getElementById("mobil-form-title"),n=document.getElementById("mobil-form-description"),a=document.getElementById("mobil-id"),r=document.getElementById("mobil-kode"),o=document.getElementById("mobil-jenis");e?.reset(),a&&(a.value=""),r&&(r.value=""),o&&(o.value="Hiace"),t&&(t.textContent="Tambah Mobil Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan data mobil"),w.editItem=null,ot(!1)}function us(e){const t=document.getElementById("mobil-form-title"),n=document.getElementById("mobil-form-description"),a=document.getElementById("mobil-id"),r=document.getElementById("mobil-kode"),o=document.getElementById("mobil-jenis");w.editItem=e,a&&(a.value=e.id),r&&(r.value=e.kode_mobil),o&&(o.value=e.jenis_mobil),t&&(t.textContent="Edit Data Mobil"),n&&(n.textContent="Isi form di bawah untuk memperbarui data mobil"),ot(!1)}async function ms(e){const t=await E(`/mobil/${e}`);us(t),q("mobil-form-modal")}function ps(e){const t=document.getElementById("mobil-delete-copy");w.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus mobil <strong>${p(e.kode_mobil)}</strong>? Tindakan ini tidak dapat dibatalkan.`),q("mobil-delete-modal")}function gs(){const e=document.getElementById("mobil-add-btn"),t=document.getElementById("mobil-export-btn"),n=document.getElementById("mobil-search-input"),a=document.getElementById("mobil-filter-jenis"),r=document.getElementById("mobil-form"),o=document.getElementById("mobil-table-body"),s=document.getElementById("mobil-delete-confirm-btn"),i=document.getElementById("mobil-prev-page-btn"),c=document.getElementById("mobil-next-page-btn"),d=document.getElementById("mobil-kode");if(!(!e||!r||!o))return e.addEventListener("click",()=>{Pn(),q("mobil-form-modal")}),t?.addEventListener("click",()=>{zt("/export/mobil/csv","mobil.csv").catch(()=>{y("Gagal mengunduh file")})}),n?.addEventListener("input",xe(async l=>{w.search=l.target.value.trim(),w.page=1;try{await ie()}catch{y("Gagal memuat data")}})),a?.addEventListener("change",async l=>{w.filterJenis=l.target.value,w.page=1;try{await ie()}catch{y("Gagal memuat data")}}),d?.addEventListener("input",l=>{l.target.value=l.target.value.toUpperCase()}),r.addEventListener("submit",async l=>{l.preventDefault();const m={kode_mobil:document.getElementById("mobil-kode")?.value.trim().toUpperCase()||"",jenis_mobil:document.getElementById("mobil-jenis")?.value||"Hiace"};ot(!0);try{w.editItem?(await E(`/mobil/${w.editItem.id}`,{method:"PUT",body:m}),O("Data mobil berhasil diperbarui")):(await E("/mobil",{method:"POST",body:m}),O("Mobil berhasil ditambahkan")),V("mobil-form-modal"),Pn(),await ie()}catch(f){y(f.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{ot(!1)}}),o.addEventListener("click",async l=>{const m=l.target.closest("[data-mobil-edit]"),f=l.target.closest("[data-mobil-delete]");try{if(m){await ms(m.dataset.mobilEdit);return}f&&ps({id:f.dataset.mobilDelete,kode_mobil:f.dataset.mobilName})}catch{y("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(w.deleteItem)try{await E(`/mobil/${w.deleteItem.id}`,{method:"DELETE"}),O("Mobil berhasil dihapus"),V("mobil-delete-modal"),(w.page-1)*Se>=w.totalCount-1&&w.page>1&&(w.page-=1),w.deleteItem=null,await ie()}catch{y("Gagal menghapus data")}}),i?.addEventListener("click",async()=>{if(!(w.page<=1)){w.page-=1;try{await ie()}catch{y("Gagal memuat data")}}}),c?.addEventListener("click",async()=>{const l=Math.max(1,Math.ceil(w.totalCount/Se));if(!(w.page>=l)){w.page+=1;try{await ie()}catch{y("Gagal memuat data")}}}),ie().catch(()=>{y("Gagal memuat data")})}const B={data:[],drivers:[],mobilList:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1},Oe=10,Dn={"05:00":"Subuh (05.00 WIB)","08:00":"Pagi (08.00 WIB)","10:00":"Pagi (10.00 WIB)","14:00":"Siang (14.00 WIB)","16:00":"Sore (16.00 WIB)","19:00":"Malam (19.00 WIB)"},Et="08:00",fs=["Reguler","Dropping","Rental"],en="Reguler";function bs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function hs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function tn(e){return e==="Lunas"?"Lunas":"Belum Lunas"}function On(e){const t=tn(e);return`<span class="keberangkatan-payment-badge ${t==="Lunas"?"is-paid":"is-unpaid"}">${p(t)}</span>`}function qn(e){return Dn[e]||Dn[Et]}function st(e){return fs.includes(e)?e:en}function ks(){const e=Number(document.getElementById("keberangkatan-tarif-penumpang")?.value||0),t=Number(document.getElementById("keberangkatan-uang-paket")?.value||0),n=Number(document.getElementById("keberangkatan-jumlah-snack")?.value||0),a=Number(document.getElementById("keberangkatan-pengembalian-snack")?.value||0),r=Number(document.getElementById("keberangkatan-jumlah-air-mineral")?.value||0),o=e,s=o+t,i=s*.15,c=s*.85;return{jumlah_uang_penumpang:o,uang_paket:t,total:s,uang_pc:i,uang_bersih:c,jumlah_snack:n,pengembalian_snack:a,jumlah_air_mineral:r}}function nn(){const e=ks();Object.entries(e).forEach(([t,n])=>{const a=document.querySelector(`[data-calc="${t}"]`);if(a){if(t==="jumlah_snack"){a.textContent=`${R(n)} item`;return}if(t==="pengembalian_snack"){a.textContent=`${R(n)} item`;return}if(t==="jumlah_air_mineral"){a.textContent=`${R(n)} botol`;return}a.textContent=D(n)}})}function it(e,t,n,a,r=""){const o=document.getElementById(e);if(!o)return;const s=e==="keberangkatan-kode-mobil"?"Pilih mobil":"Pilih driver";o.innerHTML=`
        <option value="">${s}</option>
        ${t.map(i=>`
            <option value="${i[n]}" ${String(i[n])===String(r)?"selected":""}>
                ${p(a(i))}
            </option>
        `).join("")}
    `}function lt(e){const t=document.getElementById("keberangkatan-submit-btn");B.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":B.editItem?"Perbarui":"Simpan")}function ys(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");e&&(e.innerHTML=`
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
        `))}function vs(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");e&&(e.innerHTML=`
        <tr>
            <td colspan="18" class="keberangkatan-table-state keberangkatan-empty-copy">
                Belum ada data keberangkatan
            </td>
        </tr>
    `,t&&(t.hidden=!1,t.innerHTML=`
            <div class="keberangkatan-mobile-state keberangkatan-empty-copy">
                Belum ada data keberangkatan
            </div>
        `))}function jn(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");if(e){if(B.loading){ys();return}if(B.data.length===0){vs();return}e.innerHTML=B.data.map(n=>`
        <tr class="keberangkatan-row" data-testid="keberangkatan-row-${n.id}">
            <td class="keberangkatan-hari-cell">${p(n.hari)}</td>
            <td>${p(n.tanggal)}</td>
            <td>${p(n.jam_keberangkatan_label||qn(n.jam_keberangkatan))}</td>
            <td>${p(st(n.tipe_layanan))}</td>
            <td>
                <span class="keberangkatan-kode-badge">${p(n.kode_mobil)}</span>
            </td>
            <td>${p(n.driver_nama)}</td>
            <td class="text-right">${R(n.jumlah_penumpang)}</td>
            <td class="text-right keberangkatan-money-cell">${D(n.jumlah_uang_penumpang)}</td>
            <td class="text-right">${R(n.jumlah_paket)}</td>
            <td class="text-right keberangkatan-money-cell">${D(n.uang_paket)}</td>
            <td class="text-right"><span class="keberangkatan-stock-badge">${R(n.jumlah_snack)}</span></td>
            <td class="text-right"><span class="keberangkatan-stock-badge keberangkatan-stock-badge-blue">${R(n.pengembalian_snack)}</span></td>
            <td class="text-right"><span class="keberangkatan-stock-badge keberangkatan-stock-badge-blue">${R(n.jumlah_air_mineral)}</span></td>
            <td class="text-right keberangkatan-money-cell keberangkatan-money-cell-amber">${D(n.uang_pc)}</td>
            <td class="text-right keberangkatan-money-cell keberangkatan-money-cell-emerald">${D(n.uang_bersih)}</td>
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
                        aria-label="Edit data keberangkatan ${p(n.kode_mobil)}"
                    >
                        ${bs()}
                    </button>
                    <button
                        class="keberangkatan-icon-button keberangkatan-icon-button-danger"
                        type="button"
                        data-keberangkatan-delete="${n.id}"
                        data-testid="delete-keberangkatan-${n.id}"
                        aria-label="Hapus data keberangkatan ${p(n.kode_mobil)}"
                    >
                        ${hs()}
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
                        <span class="keberangkatan-trip-badge">#${R(n.trip_ke)}</span>
                    </div>
                </div>

                <div class="keberangkatan-mobile-driver">
                    <span>Driver</span>
                    <strong>${p(n.driver_nama)}</strong>
                </div>

                <div class="keberangkatan-mobile-grid">
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-status">
                        <span>Validasi</span>
                        ${On(n.status_pembayaran)}
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Layanan</span>
                        <strong>${p(st(n.tipe_layanan))}</strong>
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
                        <strong>${D(n.jumlah_uang_penumpang)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-full">
                        <span>Uang Paket</span>
                        <strong>${D(n.uang_paket)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-accent">
                        <span>Uang PC (15%)</span>
                        <strong>${D(n.uang_pc)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-emerald">
                        <span>Uang Bersih</span>
                        <strong>${D(n.uang_bersih)}</strong>
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
        `).join(""))}}function Nn(){const e=document.getElementById("keberangkatan-pagination-shell"),t=document.getElementById("keberangkatan-pagination-info"),n=document.getElementById("keberangkatan-pagination-page"),a=document.getElementById("keberangkatan-prev-page-btn"),r=document.getElementById("keberangkatan-next-page-btn"),o=Math.max(1,Math.ceil(B.totalCount/Oe));e&&(e.hidden=o<=1),t&&(t.textContent=_e(B.page,Oe,B.totalCount,B.data.length)),n&&(n.textContent=`${B.page} / ${o}`),a&&(a.disabled=B.page===1),r&&(r.disabled=B.page>=o)}async function be(){B.loading=!0,jn(),Nn();try{const[e,t,n,a]=await Promise.all([E(`/keberangkatan?page=${B.page}&limit=${Oe}${B.search?`&search=${encodeURIComponent(B.search)}`:""}`),E(`/keberangkatan/count${B.search?`?search=${encodeURIComponent(B.search)}`:""}`),E("/drivers/all"),E("/mobil/all")]);B.data=Array.isArray(e)?e:[],B.totalCount=Number(t.count||0),B.drivers=Array.isArray(n)?n:[],B.mobilList=Array.isArray(a)?a:[]}finally{B.loading=!1,jn(),Nn()}}function Ra(){document.getElementById("keberangkatan-form")?.scrollTo({top:0,behavior:"auto"})}function _t(){const e=document.getElementById("keberangkatan-form"),t=document.getElementById("keberangkatan-form-title"),n=document.getElementById("keberangkatan-form-description"),a=document.getElementById("keberangkatan-tanggal"),r=document.getElementById("keberangkatan-jam-keberangkatan"),o=document.getElementById("keberangkatan-trip-ke"),s=document.getElementById("keberangkatan-tipe-layanan"),i=document.getElementById("keberangkatan-jumlah-penumpang"),c=document.getElementById("keberangkatan-tarif-penumpang"),d=document.getElementById("keberangkatan-jumlah-paket"),l=document.getElementById("keberangkatan-uang-paket"),m=document.getElementById("keberangkatan-jumlah-snack"),f=document.getElementById("keberangkatan-pengembalian-snack"),v=document.getElementById("keberangkatan-jumlah-air-mineral"),g=document.getElementById("keberangkatan-status-pembayaran");e?.reset(),B.editItem=null,document.getElementById("keberangkatan-id").value="",t&&(t.textContent="Tambah Data Keberangkatan"),n&&(n.textContent="Isi form di bawah untuk menambahkan data keberangkatan"),a&&(a.value=Ge()),r&&(r.value=Et),it("keberangkatan-kode-mobil",B.mobilList,"kode_mobil",b=>`${b.kode_mobil} - ${b.jenis_mobil}`,B.mobilList[0]?.kode_mobil||""),it("keberangkatan-driver-id",B.drivers,"id",b=>`${b.nama} - ${b.lokasi}`,B.drivers[0]?.id||""),o&&(o.value="1"),s&&(s.value=en),i&&(i.value="0"),c&&(c.value="0"),d&&(d.value="0"),l&&(l.value="0"),m&&(m.value="0"),f&&(f.value="0"),v&&(v.value="0"),g&&(g.value="Belum Lunas"),lt(!1),nn(),Ra()}async function Un(e){const t=await E(`/keberangkatan/${e}`),n=document.getElementById("keberangkatan-form-title"),a=document.getElementById("keberangkatan-form-description");B.editItem=t,document.getElementById("keberangkatan-id").value=t.id,document.getElementById("keberangkatan-tanggal").value=t.tanggal,document.getElementById("keberangkatan-jam-keberangkatan").value=t.jam_keberangkatan||Et,document.getElementById("keberangkatan-trip-ke").value=t.trip_ke,document.getElementById("keberangkatan-tipe-layanan").value=st(t.tipe_layanan),document.getElementById("keberangkatan-jumlah-penumpang").value=t.jumlah_penumpang,document.getElementById("keberangkatan-tarif-penumpang").value=t.tarif_penumpang,document.getElementById("keberangkatan-jumlah-paket").value=t.jumlah_paket,document.getElementById("keberangkatan-uang-paket").value=t.uang_paket,document.getElementById("keberangkatan-jumlah-snack").value=t.jumlah_snack,document.getElementById("keberangkatan-pengembalian-snack").value=t.pengembalian_snack,document.getElementById("keberangkatan-jumlah-air-mineral").value=t.jumlah_air_mineral,document.getElementById("keberangkatan-status-pembayaran").value=tn(t.status_pembayaran),it("keberangkatan-kode-mobil",B.mobilList,"kode_mobil",r=>`${r.kode_mobil} - ${r.jenis_mobil}`,t.kode_mobil),it("keberangkatan-driver-id",B.drivers,"id",r=>`${r.nama} - ${r.lokasi}`,t.driver_id),n&&(n.textContent="Edit Data Keberangkatan"),a&&(a.textContent="Isi form di bawah untuk memperbarui data keberangkatan"),lt(!1),nn(),Ra(),q("keberangkatan-form-modal")}function Hn(e){B.deleteItem=e,q("keberangkatan-delete-modal")}function Es(){const e=document.getElementById("keberangkatan-add-btn"),t=document.getElementById("keberangkatan-export-btn"),n=document.getElementById("keberangkatan-search-input"),a=document.getElementById("keberangkatan-form"),r=document.getElementById("keberangkatan-table-body"),o=document.getElementById("keberangkatan-mobile-list"),s=document.getElementById("keberangkatan-delete-confirm-btn"),i=document.getElementById("keberangkatan-prev-page-btn"),c=document.getElementById("keberangkatan-next-page-btn");if(!(!e||!a||!r))return e.addEventListener("click",()=>{_t(),q("keberangkatan-form-modal")}),t?.addEventListener("click",()=>{zt("/export/keberangkatan/csv","keberangkatan.csv").catch(()=>{y("Gagal mengunduh file")})}),n?.addEventListener("input",xe(async d=>{B.search=d.target.value.trim(),B.page=1;try{await be()}catch{y("Gagal memuat data")}})),a.addEventListener("input",d=>{["keberangkatan-jumlah-penumpang","keberangkatan-tarif-penumpang","keberangkatan-uang-paket","keberangkatan-jumlah-snack","keberangkatan-pengembalian-snack","keberangkatan-jumlah-air-mineral"].includes(d.target.id)&&nn()}),a.addEventListener("submit",async d=>{d.preventDefault();const l={tanggal:document.getElementById("keberangkatan-tanggal")?.value||"",jam_keberangkatan:document.getElementById("keberangkatan-jam-keberangkatan")?.value||Et,tipe_layanan:st(document.getElementById("keberangkatan-tipe-layanan")?.value||en),kode_mobil:document.getElementById("keberangkatan-kode-mobil")?.value||"",driver_id:document.getElementById("keberangkatan-driver-id")?.value||"",jumlah_penumpang:Number(document.getElementById("keberangkatan-jumlah-penumpang")?.value||0),tarif_penumpang:Number(document.getElementById("keberangkatan-tarif-penumpang")?.value||0),jumlah_paket:Number(document.getElementById("keberangkatan-jumlah-paket")?.value||0),uang_paket:Number(document.getElementById("keberangkatan-uang-paket")?.value||0),jumlah_snack:Number(document.getElementById("keberangkatan-jumlah-snack")?.value||0),pengembalian_snack:Number(document.getElementById("keberangkatan-pengembalian-snack")?.value||0),jumlah_air_mineral:Number(document.getElementById("keberangkatan-jumlah-air-mineral")?.value||0),trip_ke:Number(document.getElementById("keberangkatan-trip-ke")?.value||1),status_pembayaran:tn(document.getElementById("keberangkatan-status-pembayaran")?.value||"")};lt(!0);try{B.editItem?(await E(`/keberangkatan/${B.editItem.id}`,{method:"PUT",body:l}),O("Data berhasil diperbarui")):(await E("/keberangkatan",{method:"POST",body:l}),O("Data berhasil ditambahkan")),V("keberangkatan-form-modal"),_t(),await be()}catch(m){y(m.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{lt(!1)}}),r.addEventListener("click",async d=>{const l=d.target.closest("[data-keberangkatan-edit]"),m=d.target.closest("[data-keberangkatan-delete]");try{if(l){await Un(l.dataset.keberangkatanEdit);return}m&&Hn({id:m.dataset.keberangkatanDelete})}catch{y("Gagal memuat data")}}),o?.addEventListener("click",async d=>{const l=d.target.closest("[data-keberangkatan-edit]"),m=d.target.closest("[data-keberangkatan-delete]");try{if(l){await Un(l.dataset.keberangkatanEdit);return}m&&Hn({id:m.dataset.keberangkatanDelete})}catch{y("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(B.deleteItem)try{await E(`/keberangkatan/${B.deleteItem.id}`,{method:"DELETE"}),O("Data berhasil dihapus"),V("keberangkatan-delete-modal"),(B.page-1)*Oe>=B.totalCount-1&&B.page>1&&(B.page-=1),B.deleteItem=null,await be()}catch{y("Gagal menghapus data")}}),i?.addEventListener("click",async()=>{if(!(B.page<=1)){B.page-=1;try{await be()}catch{y("Gagal memuat data")}}}),c?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil(B.totalCount/Oe));if(!(B.page>=d)){B.page+=1;try{await be()}catch{y("Gagal memuat data")}}}),be().then(()=>{_t()}).catch(()=>{y("Gagal memuat data")})}const S={data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1,prices:{snack:0,air:0}},qe=10;function ws(){return`
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
    `}function dt(e){return Number(document.getElementById(e)?.value||0)}function ct(){const e=dt("stock-total-snack"),t=dt("stock-total-air"),n=e*S.prices.snack+t*S.prices.air,a=document.querySelector('[data-stock-calc="nilai_total"]'),r=document.getElementById("stock-snack-price-label"),o=document.getElementById("stock-air-price-label");r&&(r.textContent=D(S.prices.snack)),o&&(o.textContent=D(S.prices.air)),a&&(a.textContent=D(n))}function ut(e){const t=document.getElementById("stock-submit-btn");S.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":S.editItem?"Perbarui":"Simpan")}function Is(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");e&&(e.innerHTML=`
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
        `))}function Ss(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");e&&(e.innerHTML=`
        <tr>
            <td colspan="14" class="stock-table-state stock-empty-copy">
                Belum ada data stok snack dan air mineral
            </td>
        </tr>
    `,t&&(t.hidden=!1,t.innerHTML=`
            <div class="stock-mobile-state stock-empty-copy">
                Belum ada data stok snack dan air mineral
            </div>
        `))}function Fn(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");if(e){if(S.loading){Is();return}if(S.data.length===0){Ss();return}e.innerHTML=S.data.map(n=>`
        <tr class="stock-row" data-testid="stock-row-${n.id}">
            <td class="stock-day-cell">${p(n.hari)}</td>
            <td>${p(n.tanggal)}</td>
            <td>${p(n.bulan)}</td>
            <td class="text-right">${R(n.total_stock_snack_display??n.total_stock_snack)}</td>
            <td class="text-right">${R(n.total_stock_air_mineral)}</td>
            <td class="text-right">${R(n.pengembalian_snack)}</td>
            <td class="text-right">${R(n.terpakai_snack)}</td>
            <td class="text-right">${R(n.terpakai_air_mineral)}</td>
            <td class="text-right"><span class="stock-value-badge stock-value-badge-emerald">${R(n.sisa_stock_snack)}</span></td>
            <td class="text-right"><span class="stock-value-badge stock-value-badge-blue">${R(n.sisa_stock_air_mineral)}</span></td>
            <td class="text-right stock-money-cell">${D(n.nilai_total)}</td>
            <td class="text-right stock-money-cell stock-money-cell-emerald">${D(n.sisa_nilai_total)}</td>
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
                        ${ws()}
                    </button>
                    <button
                        class="stock-icon-button stock-icon-button-danger"
                        type="button"
                        data-stock-delete="${n.id}"
                        data-stock-date="${p(n.tanggal)}"
                        data-testid="delete-stock-${n.id}"
                        aria-label="Hapus data stok ${p(n.tanggal)}"
                    >
                        ${Bs()}
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
                        <strong>${D(n.nilai_total)}</strong>
                    </div>
                    <div class="stock-mobile-item stock-mobile-item-full stock-mobile-item-emerald">
                        <span>Sisa Nilai Total</span>
                        <strong>${D(n.sisa_nilai_total)}</strong>
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
        `).join(""))}}function Vn(){const e=document.getElementById("stock-pagination-shell"),t=document.getElementById("stock-pagination-info"),n=document.getElementById("stock-pagination-page"),a=document.getElementById("stock-prev-page-btn"),r=document.getElementById("stock-next-page-btn"),o=Math.max(1,Math.ceil(S.totalCount/qe));e&&(e.hidden=o<=1),t&&(t.textContent=_e(S.page,qe,S.totalCount,S.data.length)),n&&(n.textContent=`${S.page} / ${o}`),a&&(a.disabled=S.page===1),r&&(r.disabled=S.page>=o)}async function he(){S.loading=!0,Fn(),Vn();try{const[e,t]=await Promise.all([E(`/stock?page=${S.page}&limit=${qe}${S.search?`&search=${encodeURIComponent(S.search)}`:""}`),E(`/stock/count${S.search?`?search=${encodeURIComponent(S.search)}`:""}`)]);S.data=Array.isArray(e)?e:[],S.totalCount=Number(t.count||0)}finally{S.loading=!1,Fn(),Vn()}}function Gn(){const e=document.getElementById("stock-form"),t=document.getElementById("stock-form-title"),n=document.getElementById("stock-form-description");e?.reset(),S.editItem=null,document.getElementById("stock-id").value="",document.getElementById("stock-tanggal").value=Ge(),document.getElementById("stock-total-snack").value="0",document.getElementById("stock-total-air").value="0",document.getElementById("stock-keterangan").value="",t&&(t.textContent="Tambah Stok Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan stok snack dan air mineral"),ut(!1),ct()}function $s(e){const t=document.getElementById("stock-form-title"),n=document.getElementById("stock-form-description");S.editItem=e,document.getElementById("stock-id").value=e.id,document.getElementById("stock-tanggal").value=e.tanggal,document.getElementById("stock-total-snack").value=e.total_stock_snack,document.getElementById("stock-total-air").value=e.total_stock_air_mineral,document.getElementById("stock-keterangan").value=e.keterangan||"",t&&(t.textContent="Edit Data Stok"),n&&(n.textContent="Isi form di bawah untuk memperbarui stok snack dan air mineral"),ut(!1),ct()}async function Jn(e){const t=await E(`/stock/${e}`);$s(t),q("stock-form-modal")}function Kn(e){const t=document.getElementById("stock-delete-copy");S.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus data stok tanggal <strong>${p(e.tanggal)}</strong>? Tindakan ini tidak dapat dibatalkan.`),q("stock-delete-modal")}function Cs(){const e=document.querySelector("[data-stock-page]"),t=document.getElementById("stock-add-btn"),n=document.getElementById("stock-search-input"),a=document.getElementById("stock-form"),r=document.getElementById("stock-table-body"),o=document.getElementById("stock-mobile-list"),s=document.getElementById("stock-delete-confirm-btn"),i=document.getElementById("stock-prev-page-btn"),c=document.getElementById("stock-next-page-btn");if(!(!e||!t||!a||!r))return S.prices.snack=Number(e.dataset.stockSnackPrice||0),S.prices.air=Number(e.dataset.stockAirPrice||0),ct(),t.addEventListener("click",()=>{Gn(),q("stock-form-modal")}),n?.addEventListener("input",xe(async d=>{S.search=d.target.value.trim(),S.page=1;try{await he()}catch{y("Gagal memuat data")}})),a.addEventListener("input",d=>{["stock-total-snack","stock-total-air"].includes(d.target.id)&&ct()}),a.addEventListener("submit",async d=>{d.preventDefault();const l={tanggal:document.getElementById("stock-tanggal")?.value||"",total_stock_snack:dt("stock-total-snack"),total_stock_air_mineral:dt("stock-total-air"),keterangan:document.getElementById("stock-keterangan")?.value.trim()||""};ut(!0);try{S.editItem?(await E(`/stock/${S.editItem.id}`,{method:"PUT",body:l}),O("Data stok berhasil diperbarui")):(await E("/stock",{method:"POST",body:l}),O("Data stok berhasil ditambahkan")),V("stock-form-modal"),Gn(),await he()}catch(m){y(m.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{ut(!1)}}),r.addEventListener("click",async d=>{const l=d.target.closest("[data-stock-edit]"),m=d.target.closest("[data-stock-delete]");try{if(l){await Jn(l.dataset.stockEdit);return}m&&Kn({id:m.dataset.stockDelete,tanggal:m.dataset.stockDate})}catch{y("Gagal memuat data")}}),o?.addEventListener("click",async d=>{const l=d.target.closest("[data-stock-edit]"),m=d.target.closest("[data-stock-delete]");try{if(l){await Jn(l.dataset.stockEdit);return}m&&Kn({id:m.dataset.stockDelete,tanggal:m.dataset.stockDate})}catch{y("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(S.deleteItem)try{await E(`/stock/${S.deleteItem.id}`,{method:"DELETE"}),O("Data stok berhasil dihapus"),V("stock-delete-modal"),(S.page-1)*qe>=S.totalCount-1&&S.page>1&&(S.page-=1),S.deleteItem=null,await he()}catch{y("Gagal menghapus data")}}),i?.addEventListener("click",async()=>{if(!(S.page<=1)){S.page-=1;try{await he()}catch{y("Gagal memuat data")}}}),c?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil(S.totalCount/qe));if(!(S.page>=d)){S.page+=1;try{await he()}catch{y("Gagal memuat data")}}}),he().catch(()=>{y("Gagal memuat data")})}const je=10,$={currentUser:null,data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,defaultRole:"User"};function xs(e){return["Super Admin","Admin"].includes(e)}function _s(e){return e==="Super Admin"}function Ls(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function Ts(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M2.5 12C4.4 8.2 8 6 12 6C16 6 19.6 8.2 21.5 12C19.6 15.8 16 18 12 18C8 18 4.4 15.8 2.5 12Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function As(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Rs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Ms(){return _s($.currentUser?.role)?["Super Admin","Admin","User"]:["Admin","User"]}function mt(e){de(document.getElementById("admin-user-submit-btn"),e,"Menyimpan...")}function Ps(e){return e==="Super Admin"?"admin-users-role-badge admin-users-role-badge-super":e==="Admin"?"admin-users-role-badge admin-users-role-badge-admin":"admin-users-role-badge admin-users-role-badge-user"}function Ds(){const e=document.getElementById("admin-users-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="6" class="admin-users-table-state">
                <div class="admin-users-loading-inline">
                    <span class="admin-users-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function Ma(e="Belum ada akun admin atau user."){const t=document.getElementById("admin-users-table-body");t&&(t.innerHTML=`
        <tr>
            <td colspan="6" class="admin-users-table-state admin-users-empty-copy">${p(e)}</td>
        </tr>
    `)}function Wn(){const e=document.getElementById("admin-users-table-body");if(e){if($.loading){Ds();return}if($.data.length===0){Ma();return}e.innerHTML=$.data.map(t=>`
        <tr class="admin-users-row" data-testid="admin-user-row-${t.id}">
            <td>
                <div class="admin-users-name-cell">
                    <span class="admin-users-avatar" aria-hidden="true">${Ls()}</span>
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
            <td><span class="${Ps(t.role)}">${p(t.role)}</span></td>
            <td>
                <div class="admin-users-action-row">
                    <button class="admin-users-icon-button" type="button" data-admin-user-show="${t.id}" data-testid="show-admin-user-${t.id}" aria-label="Lihat detail akun ${p(t.nama)}">
                        ${Ts()}
                    </button>
                    <button class="admin-users-icon-button" type="button" data-admin-user-edit="${t.id}" data-testid="edit-admin-user-${t.id}" aria-label="Edit akun ${p(t.nama)}" ${t.can_edit?"":"disabled"}>
                        ${As()}
                    </button>
                    <button class="admin-users-icon-button admin-users-icon-button-danger" type="button" data-admin-user-delete="${t.id}" data-admin-user-name="${p(t.nama)}" data-testid="delete-admin-user-${t.id}" aria-label="Hapus akun ${p(t.nama)}" ${t.can_delete?"":"disabled"}>
                        ${Rs()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function jt(){const e=document.getElementById("admin-users-pagination-shell"),t=document.getElementById("admin-users-pagination-info"),n=document.getElementById("admin-users-pagination-page"),a=document.getElementById("admin-users-prev-page-btn"),r=document.getElementById("admin-users-next-page-btn"),o=Math.max(1,Math.ceil($.totalCount/je));e&&(e.hidden=o<=1),t&&(t.textContent=_e($.page,je,$.totalCount,$.data.length)),n&&(n.textContent=`${$.page} / ${o}`),a&&(a.disabled=$.page===1),r&&(r.disabled=$.page>=o)}async function ke(){$.loading=!0,Wn(),jt();try{const e=$.search?`?search=${encodeURIComponent($.search)}`:"",t=`?page=${$.page}&limit=${je}${$.search?`&search=${encodeURIComponent($.search)}`:""}`,[n,a]=await Promise.all([E(`/admin-users${t}`),E(`/admin-users/count${e}`)]);$.data=Array.isArray(n)?n:[],$.totalCount=Number(a.count||0)}finally{$.loading=!1,Wn(),jt()}}function Pa(e="User"){const t=document.getElementById("admin-user-role");if(!t)return;const n=Ms(),a=n.includes(e)?e:n[0];t.innerHTML=n.map(r=>`
        <option value="${p(r)}" ${r===a?"selected":""}>${p(r)}</option>
    `).join("")}function Da(e){const t=document.getElementById("admin-user-password"),n=document.getElementById("admin-user-password-note");t&&(t.required=!e,t.placeholder=e?"Kosongkan jika tidak ingin mengubah password":"Masukkan password",t.value=""),n&&(n.textContent=e?"Kosongkan password jika tidak ingin mengubah password akun ini.":"Password minimal 6 karakter dan akan disimpan dalam bentuk terenkripsi.")}function Lt(e="User"){const t=document.getElementById("admin-user-form"),n=document.getElementById("admin-user-form-title"),a=document.getElementById("admin-user-form-description"),r=document.getElementById("admin-user-id");t?.reset(),r&&(r.value=""),Pa(e),Da(!1),n&&(n.textContent=e==="Admin"?"Tambah Admin Baru":"Tambah User Baru"),a&&(a.textContent=e==="Admin"?"Lengkapi data akun untuk menambahkan admin baru":"Lengkapi data akun untuk menambahkan user baru"),$.defaultRole=e,$.editItem=null,mt(!1)}function Os(e){$.editItem=e,document.getElementById("admin-user-id").value=e.id,document.getElementById("admin-user-nama").value=e.nama,document.getElementById("admin-user-username").value=e.username,document.getElementById("admin-user-email").value=e.email,Pa(e.role),Da(!0),document.getElementById("admin-user-form-title").textContent="Edit Akun",document.getElementById("admin-user-form-description").textContent="Perbarui informasi akun admin atau user di bawah ini",mt(!1)}function qs(e){const t=document.getElementById("admin-user-detail-list");t&&(t.innerHTML=`
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
            <strong>${p(qo(e.created_at))}</strong>
        </div>
    `)}async function js(e){qs(await E(`/admin-users/${e}`)),q("admin-user-show-modal")}async function Ns(e){Os(await E(`/admin-users/${e}`)),q("admin-user-form-modal")}function Us(e){$.deleteItem=e,document.getElementById("admin-user-delete-copy").innerHTML=`Apakah Anda yakin ingin menghapus akun <strong>${p(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`,q("admin-user-delete-modal")}function zn(){const e=document.getElementById("admin-users-access-note"),t=document.getElementById("admin-users-search-input"),n=document.querySelector(".admin-users-page-actions");e&&(e.hidden=!1,e.textContent="Halaman ini hanya dapat diakses oleh Admin atau Super Admin."),t&&(t.disabled=!0),n&&(n.hidden=!0),$.loading=!1,$.data=[],$.totalCount=0,Ma("Anda tidak memiliki akses untuk mengelola data admin dan user."),jt()}function Hs({user:e}={}){const t=document.getElementById("admin-users-add-admin-btn"),n=document.getElementById("admin-users-add-user-btn"),a=document.getElementById("admin-users-search-input"),r=document.getElementById("admin-user-form"),o=document.getElementById("admin-users-table-body"),s=document.getElementById("admin-user-delete-confirm-btn"),i=document.getElementById("admin-users-prev-page-btn"),c=document.getElementById("admin-users-next-page-btn");if(!(!t||!n||!r||!o)){if($.currentUser=e||window.transitAuthUser||null,!xs($.currentUser?.role)){zn();return}return t.addEventListener("click",()=>{Lt("Admin"),q("admin-user-form-modal")}),n.addEventListener("click",()=>{Lt("User"),q("admin-user-form-modal")}),a?.addEventListener("input",xe(async d=>{$.search=d.target.value.trim(),$.page=1;try{await ke()}catch(l){y(l.message||"Gagal memuat data akun")}})),r.addEventListener("submit",async d=>{d.preventDefault();const l={nama:document.getElementById("admin-user-nama")?.value.trim()||"",username:document.getElementById("admin-user-username")?.value.trim()||"",email:document.getElementById("admin-user-email")?.value.trim()||"",password:document.getElementById("admin-user-password")?.value||"",role:document.getElementById("admin-user-role")?.value||"User"};mt(!0);try{$.editItem?(await E(`/admin-users/${$.editItem.id}`,{method:"PUT",body:l}),O("Akun berhasil diperbarui")):(await E("/admin-users",{method:"POST",body:l}),O(l.role==="Admin"?"Admin berhasil ditambahkan":"User berhasil ditambahkan")),V("admin-user-form-modal"),Lt($.defaultRole),await ke()}catch(m){y(m.message||"Silakan periksa kembali data yang diinput","Gagal menyimpan akun")}finally{mt(!1)}}),o.addEventListener("click",async d=>{const l=d.target.closest("[data-admin-user-show]"),m=d.target.closest("[data-admin-user-edit]"),f=d.target.closest("[data-admin-user-delete]");try{if(l){await js(l.dataset.adminUserShow);return}if(m){await Ns(m.dataset.adminUserEdit);return}f&&Us({id:f.dataset.adminUserDelete,nama:f.dataset.adminUserName})}catch(v){y(v.message||"Gagal memuat detail akun")}}),s?.addEventListener("click",async()=>{if($.deleteItem)try{await E(`/admin-users/${$.deleteItem.id}`,{method:"DELETE"}),O("Akun berhasil dihapus"),V("admin-user-delete-modal"),($.page-1)*je>=$.totalCount-1&&$.page>1&&($.page-=1),$.deleteItem=null,await ke()}catch(d){y(d.message||"Gagal menghapus akun")}}),i?.addEventListener("click",async()=>{if(!($.page<=1)){$.page-=1;try{await ke()}catch(d){y(d.message||"Gagal memuat data akun")}}}),c?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil($.totalCount/je));if(!($.page>=d)){$.page+=1;try{await ke()}catch(l){y(l.message||"Gagal memuat data akun")}}}),ke().catch(d=>{if(d.status===403){zn();return}y(d.message||"Gagal memuat data akun")})}}const Xn=[{value:"05:00",label:"Subuh",time:"05.00 WIB"},{value:"08:00",label:"Pagi",time:"08.00 WIB"},{value:"10:00",label:"Pagi",time:"10.00 WIB"},{value:"14:00",label:"Siang",time:"14.00 WIB"},{value:"16:00",label:"Sore",time:"16.00 WIB"},{value:"19:00",label:"Malam",time:"19.00 WIB"}],Oa=[[{code:"1A",label:"1A"},{code:"SOPIR",label:"SOPIR",isDriver:!0}],[{code:"2A",label:"2A"},{code:"3A",label:"3A"}],[{code:"4A",label:"4A"},{code:"5A",label:"5A"}]],Fs=Oa.flat().filter(e=>!e.isDriver).length,k={currentUser:null,date:Ge(),direction:"to_pkb",bookings:[],loading:!1,drivers:[],mobils:[],formOptions:null,selectedSeats:[],passengerDraftMap:{},editItem:null,deleteItem:null,slotDriverMap:{},slotMobilMap:{},occupiedSeatsForForm:[]};function Tt(e){const t=document.getElementById(e);if(!t)return null;try{return JSON.parse(t.textContent||"{}")}catch{return null}}function Vs(e){return["Super Admin","Admin"].includes(e)}function Gs(e){const t=e?"#dc2626":"#166534",n=e?"#991b1b":"#14532d";return`
        <svg viewBox="0 0 50 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="2" width="30" height="20" rx="8" fill="${t}" stroke="${n}" stroke-width="1.5"/>
            <rect x="5" y="18" width="40" height="28" rx="9" fill="${t}" stroke="${n}" stroke-width="1.5"/>
            <rect x="7" y="44" width="36" height="14" rx="7" fill="${t}" stroke="${n}" stroke-width="1.5" opacity="0.8"/>
            <rect x="2" y="22" width="5" height="18" rx="2.5" fill="${t}" opacity="0.6"/>
            <rect x="43" y="22" width="5" height="18" rx="2.5" fill="${t}" opacity="0.6"/>
        </svg>`}function Js(){return`
        <svg viewBox="0 0 50 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="25" cy="30" r="18" stroke="rgba(148,163,184,0.5)" stroke-width="2.5"/>
            <circle cx="25" cy="30" r="6" fill="rgba(148,163,184,0.4)"/>
            <line x1="25" y1="12" x2="25" y2="24" stroke="rgba(148,163,184,0.5)" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="7" y1="30" x2="19" y2="30" stroke="rgba(148,163,184,0.5)" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="31" y1="30" x2="43" y2="30" stroke="rgba(148,163,184,0.5)" stroke-width="2.5" stroke-linecap="round"/>
        </svg>`}function Ks(){return'<svg viewBox="0 0 24 24" fill="none"><path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path><path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg>'}function Ws(){return'<svg viewBox="0 0 24 24" fill="none"><path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg>'}function zs(e){return`
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
                    ${Oa.map(n=>`<div class="bpg-seat-row">${n.map(r=>{if(r.isDriver)return`
                    <div class="bpg-seat-item bpg-seat-driver" title="Sopir / Pengemudi">
                        <div class="bpg-seat-icon">${Js()}</div>
                        <span class="bpg-seat-label">SOPIR</span>
                    </div>`;const o=e[r.code],s=!!o,i=s?"bpg-seat-occupied":"bpg-seat-available",c=s?p(o.nama_pemesanan||"-"):"";return`
                <div class="bpg-seat-item ${i}" title="${s?c:"Tersedia"}">
                    <div class="bpg-seat-icon">${Gs(s)}</div>
                    <span class="bpg-seat-label">${r.label}</span>
                    ${s?`<span class="bpg-seat-name">${c}</span>`:""}
                </div>`}).join("")}</div>`).join("")}
                </div>
            </div>
        </div>`}function Xs(e){if(e.length===0)return`
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
                    <div class="bpg-passenger-actions">
                        <span class="${p(r.payment_status_badge_class||"stock-value-badge stock-value-badge-blue")} bpg-status-sm">${p(r.payment_status||"-")}</span>
                        <button class="bpg-lihat-btn" type="button" data-booking-lihat="${p(String(r.id))}" aria-label="Lihat detail ${p(r.nama_pemesanan)}">
                            <svg viewBox="0 0 24 24" fill="none" style="width:13px;height:13px;"><path d="M2.5 12C4.4 8.2 8 6 12 6C16 6 19.6 8.2 21.5 12C19.6 15.8 16 18 12 18C8 18 4.4 15.8 2.5 12Z" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/></svg>
                            Lihat
                        </button>
                        <button class="admin-users-icon-button" type="button" data-booking-edit="${p(String(r.id))}" title="Edit pemesanan">
                            ${Ks()}
                        </button>
                        <button class="admin-users-icon-button admin-users-icon-button-danger" type="button" data-booking-delete="${p(String(r.id))}" data-booking-name="${p(r.nama_pemesanan)}" title="Hapus pemesanan">
                            ${Ws()}
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
                            ${c}
                        </div>
                    </div>
                </div>
            </div>`}).join("")}
        </div>`}function Zs(e){const t={};return e.forEach(n=>{(Array.isArray(n.selected_seats)?n.selected_seats:[]).forEach(r=>{t[r]||(t[r]=n)})}),t}function Qs(e,t){const n=Zs(t),a=t.reduce((m,f)=>m+(Number(f.passenger_count)||0),0),r=`${e.value}__${k.direction}`;if(!k.slotDriverMap[r]){const m=t.find(f=>f.driver_id);m&&(k.slotDriverMap[r]=m.driver_id)}const o=k.slotDriverMap[r]||"",s=k.slotMobilMap[r]||"",i="stock-value-badge-yellow",c=k.drivers.map(m=>{const f=m.lokasi?`${m.nama} (${m.lokasi})`:m.nama;return`<option value="${p(m.id)}" ${o===m.id?"selected":""}>${p(f)}</option>`}).join(""),d=k.mobils.map(m=>{const f=`${m.kode_mobil} — ${m.jenis_mobil}`;return`<option value="${p(m.id)}" ${s===m.id?"selected":""}>${p(f)}</option>`}).join(""),l=[...new Set(t.map(m=>(m.service_type||"").trim()).filter(Boolean))];return`
        <article class="bpg-slot-card" data-slot="${p(e.value)}" data-direction="${p(k.direction)}">
            <div class="bpg-slot-head">
                <div class="bpg-slot-time-badge">
                    <span class="bpg-slot-period">${p(e.label)}</span>
                    <strong class="bpg-slot-time">${p(e.time)}</strong>
                </div>
                <div class="bpg-slot-service-types">
                    ${l.length>0?l.map(m=>`<span class="bpg-service-badge">${p(m)}</span>`).join(""):'<span class="bpg-service-badge bpg-service-badge--empty">Belum ada layanan</span>'}
                </div>
                <div class="bpg-slot-counters">
                    <span class="stock-value-badge ${i}">${a} / ${Fs} Kursi</span>
                </div>
            </div>

            ${zs(n)}

            <div class="bpg-slot-assignment">
                <div class="bpg-slot-select-group">
                    <label>
                        <svg viewBox="0 0 24 24" fill="none" style="width:13px;height:13px;"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/><path d="M4 20C4 17.2386 7.58172 15 12 15C16.4183 15 20 17.2386 20 20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
                        Pilih Driver
                    </label>
                    <select class="bpg-slot-select" data-slot-driver="${p(e.value)}">
                        <option value="">— Belum ditentukan —</option>
                        ${c}
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

            ${Xs(t)}
        </article>`}function Ys(){const e=document.getElementById("bpg-slots-shell");e&&(e.innerHTML=`
            <div class="admin-users-loading-inline" style="padding:40px 0;">
                <span class="admin-users-loading-inline-spinner" aria-hidden="true"></span>
                <span>Memuat data penumpang...</span>
            </div>`)}function ei(){const e=document.getElementById("bpg-slots-shell");if(!e)return;const t={};Xn.forEach(a=>{t[a.value]=[]}),k.bookings.forEach(a=>{const o=(a.trip_time||"").trim().substring(0,5);t[o]&&t[o].push(a)});const n=Xn.map(a=>Qs(a,t[a.value]||[]));e.innerHTML=`<div class="bpg-slots-grid">${n.join("")}</div>`}async function Re(){k.loading=!0,Ys();try{const e=new URLSearchParams({date:k.date,direction:k.direction,limit:200,page:1}),t=await E(`/bookings?${e}`);k.bookings=Array.isArray(t)?t:[]}catch(e){k.bookings=[],e.status!==403&&y(e.message||"Gagal memuat data penumpang")}finally{k.loading=!1,ei()}}function ti(e){document.getElementById("bpg-detail-title").textContent=e.nama_pemesanan||"-",document.getElementById("bpg-detail-subtitle").textContent=`${e.booking_code||"-"} · ${e.booking_status||"-"}`,document.getElementById("bpg-detail-full-link").href=`/dashboard/bookings/${e.id}`,document.getElementById("bpg-detail-ticket-link").href=`/dashboard/bookings/${e.id}/ticket`;const t=document.getElementById("bpg-detail-body");t.innerHTML=`
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
        </div>`,q("bpg-detail-modal")}function ni(){return(k.formOptions?.seat_options||[]).map(e=>e.code)}function an(e){const t=new Map(ni().map((n,a)=>[n,a]));return Array.from(new Set((e||[]).map(n=>String(n).trim()).filter(n=>t.has(n)))).sort((n,a)=>(t.get(n)??999)-(t.get(a)??999))}function wt(){return Number(document.getElementById("booking-passenger-count")?.value||0)}function ai(){const e=wt();return(k.formOptions?.seat_options||[]).filter(t=>!t.is_optional||e>=6).map(t=>t.code)}function ri(){return k.formOptions?.payment_status_options||[]}function oi(e){return e==="transfer"?["Belum Bayar","Menunggu Pembayaran","Menunggu Verifikasi","Dibayar"]:e==="qris"?["Belum Bayar","Menunggu Pembayaran","Dibayar"]:e==="cash"?["Belum Bayar","Dibayar Tunai"]:["Belum Bayar"]}function si(e){return e==="transfer"?"Menunggu Pembayaran":e==="qris"?"Dibayar":e==="cash"?"Dibayar Tunai":"Belum Bayar"}function ii(e){return e==="transfer"?"Menunggu Verifikasi Pembayaran":e==="qris"||e==="cash"?"Diproses":"Draft"}function li(e,t){if(!e||!t||e===t)return null;const a=(k.formOptions?.route_matrix||{})?.[e]?.[t];return a==null?null:Number(a)}function Me(){const e=document.getElementById("booking-from-city")?.value||"",t=document.getElementById("booking-to-city")?.value||"",n=wt(),a=li(e,t),r=a!==null?a*n:null,o=document.getElementById("booking-price-per-seat"),s=document.getElementById("booking-total-amount");o&&(o.value=a!==null?D(a):""),s&&(s.value=r!==null?D(r):"")}function rn(){const e=document.getElementById("booking-payment-method")?.value||"",t=document.getElementById("booking-payment-status"),n=document.getElementById("booking-booking-status"),a=document.getElementById("booking-bank-account-group"),r=document.getElementById("booking-bank-account-code"),o=oi(e),s=t?.value||"";a&&(a.hidden=e!=="transfer"),r&&e!=="transfer"&&(r.value=""),t&&(t.innerHTML=ri().filter(i=>o.includes(i.value)).map(i=>`<option value="${p(i.value)}">${p(i.label)}</option>`).join(""),t.value=o.includes(s)?s:si(e)),n&&(n.value=ii(e))}function di(){const e=document.getElementById("booking-selected-seats-inputs");e&&(e.innerHTML=k.selectedSeats.map(t=>`<input type="hidden" name="selected_seats[]" value="${p(t)}">`).join(""))}function ci(){const e=document.getElementById("booking-selected-seat-count"),t=document.getElementById("booking-selected-seat-label");e&&(e.textContent=String(k.selectedSeats.length)),t&&(t.textContent=k.selectedSeats.length>0?k.selectedSeats.join(", "):"Belum dipilih")}function Nt(){document.querySelectorAll("[data-passenger-seat]").forEach(e=>{const t=e.dataset.passengerSeat;t&&(k.passengerDraftMap[t]={seat_no:t,name:e.querySelector("[data-passenger-name]")?.value.trim()||"",phone:e.querySelector("[data-passenger-phone]")?.value.trim()||""})})}function ve(e=null){const t=document.getElementById("booking-passenger-editor");if(t){if(e&&(k.passengerDraftMap=Object.fromEntries(e.map(n=>[n.seat_no,n]))),k.selectedSeats.length===0){t.innerHTML='<div class="dashboard-empty-state dashboard-empty-state--block bookings-passenger-empty">Pilih kursi terlebih dahulu untuk menampilkan form data penumpang.</div>';return}t.innerHTML=`
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
        </div>`}}async function pt(){const e=document.getElementById("booking-trip-date")?.value||"",t=document.getElementById("booking-trip-time")?.value||"",n=k.editItem?.id||"";if(!e||!t){k.occupiedSeatsForForm=[];return}try{const a=new URLSearchParams({trip_date:e,trip_time:t});n&&a.set("exclude_id",n);const r=await E(`/bookings/occupied-seats?${a}`);k.occupiedSeatsForForm=Array.isArray(r?.occupied_seats)?r.occupied_seats:[]}catch{k.occupiedSeatsForForm=[]}}function Ee(){const e=document.querySelectorAll("[data-seat-code]"),t=wt(),n=ai();k.selectedSeats=an(k.selectedSeats.filter(a=>n.includes(a)&&!k.occupiedSeatsForForm.includes(a))),e.forEach(a=>{const r=a.dataset.seatCode,o=n.includes(r),s=k.occupiedSeatsForForm.includes(r),i=k.selectedSeats.includes(r),c=k.selectedSeats.length>=t&&!i;a.hidden=!o,a.classList.toggle("is-selected",i),a.classList.toggle("is-occupied",s),a.classList.toggle("is-disabled",!s&&c),a.disabled=!o||s||!i&&c,s?a.title="Kursi sudah dipesan":a.title=""}),di(),ci()}function At(){document.getElementById("booking-form")?.reset(),k.editItem=null,k.selectedSeats=[],k.passengerDraftMap={};const t=k.date||Ge();document.getElementById("booking-id").value="",document.getElementById("booking-form-title").textContent="Tambah Pemesanan",document.getElementById("booking-form-description").textContent="Lengkapi data pemesanan reguler dari dashboard admin.",document.getElementById("booking-trip-date").value=t,document.getElementById("booking-passenger-count").value="1",document.getElementById("booking-payment-method").value="",document.getElementById("booking-booking-status").value="Draft",rn(),Me(),de(document.getElementById("booking-submit-btn"),!1,"Menyimpan..."),pt().then(()=>{Ee(),ve()})}function ui(e){k.editItem=e,k.selectedSeats=an(e.selected_seats||[]),k.passengerDraftMap=Object.fromEntries((e.passengers||[]).map(t=>[t.seat_no,t])),document.getElementById("booking-id").value=e.id,document.getElementById("booking-booking-for").value=e.booking_for,document.getElementById("booking-category").value=e.category,document.getElementById("booking-from-city").value=e.from_city,document.getElementById("booking-to-city").value=e.to_city,document.getElementById("booking-trip-date").value=e.trip_date_value,document.getElementById("booking-trip-time").value=e.trip_time_value,document.getElementById("booking-passenger-count").value=String(e.passenger_count),document.getElementById("booking-driver-name").value=e.driver_name==="Menunggu Penetapan Driver"?"":e.driver_name||"",document.getElementById("booking-pickup-location").value=e.pickup_location,document.getElementById("booking-dropoff-location").value=e.dropoff_location,document.getElementById("booking-payment-method").value=e.payment_method_value||"",rn(),document.getElementById("booking-payment-status").value=e.payment_status,document.getElementById("booking-booking-status").value=e.booking_status,document.getElementById("booking-bank-account-code").value=e.bank_account_code||"",document.getElementById("booking-notes").value=e.notes||"",document.getElementById("booking-form-title").textContent="Edit Pemesanan",document.getElementById("booking-form-description").textContent="Perbarui data pemesanan reguler yang dipilih.",Me(),de(document.getElementById("booking-submit-btn"),!1,"Menyimpan..."),pt().then(()=>{Ee(),ve(e.passengers||[])})}function mi(){return Nt(),{booking_for:document.getElementById("booking-booking-for")?.value||"",category:document.getElementById("booking-category")?.value||"Reguler",from_city:document.getElementById("booking-from-city")?.value||"",to_city:document.getElementById("booking-to-city")?.value||"",trip_date:document.getElementById("booking-trip-date")?.value||"",trip_time:document.getElementById("booking-trip-time")?.value||"",passenger_count:Number(document.getElementById("booking-passenger-count")?.value||0),driver_name:document.getElementById("booking-driver-name")?.value.trim()||"",pickup_location:document.getElementById("booking-pickup-location")?.value.trim()||"",dropoff_location:document.getElementById("booking-dropoff-location")?.value.trim()||"",selected_seats:k.selectedSeats,passengers:k.selectedSeats.map(e=>({seat_no:e,name:k.passengerDraftMap?.[e]?.name||"",phone:k.passengerDraftMap?.[e]?.phone||""})),payment_method:document.getElementById("booking-payment-method")?.value||"",payment_status:document.getElementById("booking-payment-status")?.value||"Belum Bayar",booking_status:document.getElementById("booking-booking-status")?.value||"Draft",bank_account_code:document.getElementById("booking-bank-account-code")?.value||"",notes:document.getElementById("booking-notes")?.value.trim()||""}}async function pi(e){ui(await E(`/bookings/${e}`)),q("booking-form-modal")}function gi(e){k.deleteItem=e,document.getElementById("booking-delete-copy").innerHTML=`Apakah Anda yakin ingin menghapus data pemesanan <strong>${p(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`,q("booking-delete-modal")}function Zn(){const e=document.getElementById("bookings-access-note"),t=document.getElementById("bpg-route-tabs"),n=document.getElementById("bpg-slots-shell");e&&(e.hidden=!1),t&&(t.hidden=!0),n&&(n.hidden=!0)}function fi({user:e}={}){const t=document.getElementById("bookings-add-btn"),n=document.getElementById("bookings-date-picker"),a=document.getElementById("bpg-route-tabs"),r=document.getElementById("bpg-slots-shell"),o=document.getElementById("booking-form"),s=document.getElementById("booking-delete-confirm-btn"),i=document.getElementById("booking-seat-grid"),c=document.getElementById("booking-passenger-editor"),d=document.getElementById("booking-payment-method");if(k.formOptions=Tt("bookings-form-options"),k.drivers=Tt("bookings-drivers-data")||[],k.mobils=Tt("bookings-mobils-data")||[],k.currentUser=e||window.transitAuthUser||null,k.date=Ge(),!Vs(k.currentUser?.role)){Zn();return}a&&(a.hidden=!1),r&&(r.hidden=!1);const l=document.getElementById("bookings-access-note");l&&(l.hidden=!0),n&&(n.value=k.date,n.addEventListener("change",async()=>{k.date=n.value,k.slotDriverMap={},k.slotMobilMap={},await Re()})),a?.addEventListener("click",async f=>{const v=f.target.closest("[data-direction]");if(!v)return;const g=v.dataset.direction;g!==k.direction&&(k.direction=g,k.slotDriverMap={},k.slotMobilMap={},document.querySelectorAll(".bpg-route-tab").forEach(b=>{b.classList.toggle("is-active",b.dataset.direction===g)}),await Re())});function m(f=null){r?.querySelectorAll("[data-depart-dropdown]").forEach(v=>{String(v.dataset.departDropdown)!==String(f)&&(v.querySelector(".bpg-depart-menu")?.removeAttribute("hidden"),v.querySelector(".bpg-depart-menu")?.setAttribute("hidden",""))})}return document.addEventListener("click",f=>{f.target.closest("[data-depart-dropdown]")||m()}),r?.addEventListener("click",async f=>{const v=f.target.closest("[data-depart-toggle]"),g=f.target.closest("[data-booking-departure]"),b=f.target.closest("[data-booking-lihat]"),h=f.target.closest("[data-booking-edit]"),A=f.target.closest("[data-booking-delete]");try{if(v){const M=v.dataset.departToggle,P=r.querySelector(`[data-depart-dropdown="${CSS.escape(M)}"]`)?.querySelector(".bpg-depart-menu");if(!P)return;const j=P.hasAttribute("hidden");m(M),P.toggleAttribute("hidden",!j);return}if(g){const M=g.dataset.bookingDeparture,T=g.dataset.departureStatus,P=k.bookings.find(H=>String(H.id)===String(M));if(!P)return;const j=P.departure_status===T?"":T;P.departure_status=j;const F=r.querySelector(`[data-depart-dropdown="${CSS.escape(M)}"]`);if(F){const H=F.querySelector(".bpg-depart-trigger"),Y=departureStatusMeta(j);H.className=`bpg-depart-trigger ${Y.cls}`,H.childNodes.forEach(X=>{X.nodeType===3&&(X.textContent=Y.label)}),F.querySelectorAll("[data-booking-departure]").forEach(X=>{X.classList.toggle("is-active",X.dataset.departureStatus===j)}),F.querySelector(".bpg-depart-menu")?.setAttribute("hidden","")}await E(`/bookings/${M}/departure-status`,{method:"PATCH",body:{departure_status:j}});return}if(b){const M=b.dataset.bookingLihat,T=k.bookings.find(P=>String(P.id)===String(M));T&&ti(T);return}if(h){await pi(h.dataset.bookingEdit);return}A&&gi({id:A.dataset.bookingDelete,nama:A.dataset.bookingName})}catch(M){y(M.message||"Gagal memuat data pemesanan")}}),r?.addEventListener("change",async f=>{const v=f.target.closest("[data-slot-driver]"),g=f.target.closest("[data-slot-mobil]");if(v){const b=v.dataset.slotDriver,h=v.value,A=v.options[v.selectedIndex],M=h&&A?.text.split(" (")[0]||"",T=`${b}__${k.direction}`;k.slotDriverMap[T]=h;try{await E("/bookings/slot-assign",{method:"PATCH",body:{trip_date:k.date,trip_time:b,direction:k.direction,driver_id:h||null,driver_name:M}}),O("Driver berhasil diperbarui")}catch(P){y(P.message||"Gagal memperbarui driver")}}if(g){const b=g.dataset.slotMobil,h=g.value,A=`${b}__${k.direction}`;k.slotMobilMap[A]=h}}),t?.addEventListener("click",()=>{At(),q("booking-form-modal")}),i?.addEventListener("click",f=>{const v=f.target.closest("[data-seat-code]");if(!v||v.disabled)return;Nt();const g=v.dataset.seatCode;k.selectedSeats.includes(g)?k.selectedSeats=k.selectedSeats.filter(b=>b!==g):k.selectedSeats.length<wt()&&(k.selectedSeats=an([...k.selectedSeats,g])),Ee(),ve()}),document.getElementById("booking-passenger-count")?.addEventListener("change",()=>{Nt(),Ee(),ve(),Me()}),document.getElementById("booking-trip-date")?.addEventListener("change",()=>{pt().then(()=>{Ee(),ve()})}),document.getElementById("booking-trip-time")?.addEventListener("change",()=>{pt().then(()=>{Ee(),ve()})}),document.getElementById("booking-from-city")?.addEventListener("change",Me),document.getElementById("booking-to-city")?.addEventListener("change",Me),d?.addEventListener("change",rn),c?.addEventListener("input",f=>{const v=f.target.closest("[data-passenger-seat]");if(!v)return;const g=v.dataset.passengerSeat;k.passengerDraftMap[g]={seat_no:g,name:v.querySelector("[data-passenger-name]")?.value.trim()||"",phone:v.querySelector("[data-passenger-phone]")?.value.trim()||""}}),o?.addEventListener("submit",async f=>{f.preventDefault();const v=document.getElementById("booking-submit-btn");de(v,!0,"Menyimpan...");try{const g=mi();k.editItem?(await E(`/bookings/${k.editItem.id}`,{method:"PUT",body:g}),O("Data pemesanan berhasil diperbarui")):(await E("/bookings",{method:"POST",body:g}),O("Data pemesanan berhasil ditambahkan")),V("booking-form-modal"),At(),await Re()}catch(g){y(g.message||"Silakan periksa kembali data yang diinput","Gagal menyimpan data pemesanan")}finally{de(v,!1,"Menyimpan...")}}),s?.addEventListener("click",async()=>{if(k.deleteItem){de(s,!0,"Menghapus...");try{await E(`/bookings/${k.deleteItem.id}`,{method:"DELETE"}),O("Data pemesanan berhasil dihapus"),V("booking-delete-modal"),k.deleteItem=null,await Re()}catch(f){y(f.message||"Gagal menghapus data pemesanan")}finally{de(s,!1,"Menghapus...")}}}),At(),Re().catch(f=>{if(f.status===403){Zn();return}y(f.message||"Gagal memuat data penumpang")})}function bi(e){const t=document.getElementById(e);if(!t)return{};try{return JSON.parse(t.textContent||"{}")}catch{return{}}}function hi(){const e=document.querySelector("[data-regular-booking-page]");if(!e)return;const t=bi("regular-booking-route-matrix"),n=e.querySelector("[data-booking-origin]"),a=e.querySelector("[data-booking-destination]"),r=e.querySelector("[data-booking-schedule]"),o=e.querySelector("[data-booking-passengers]"),s=e.querySelector("[data-route-fare-input]"),i=e.querySelector("[data-additional-fare-input]"),c=e.querySelector("[data-estimated-total-input]"),d=e.querySelector("[data-route-feedback]"),l=e.querySelector("[data-route-feedback-title]"),m=e.querySelector("[data-route-feedback-text]"),f=e.querySelector("[data-booking-submit]"),v=Array.from(e.querySelectorAll("[data-booking-type]")),g=e.querySelector("[data-summary-booking-for]"),b=e.querySelector("[data-summary-route]"),h=e.querySelector("[data-summary-schedule]"),A=e.querySelector("[data-summary-passengers]"),M=e.querySelector("[data-summary-fare]"),T=e.querySelector("[data-summary-additional-fare]"),P=e.querySelector("[data-summary-total]"),j=new Map(v.map(L=>[L.value,L.dataset.label||L.value])),F=new Map(Array.from(r?.options||[]).filter(L=>L.value).map(L=>[L.value,L.textContent.trim()]));function H(L,N){if(!L||!N||L===N)return null;const K=t?.[L]?.[N];return K==null?null:Number(K)}function Y(L,N,K){!d||!l||!m||(d.dataset.state=L,l.textContent=N,m.textContent=K)}function X(){e.querySelectorAll(".regular-booking-radio").forEach(L=>{const N=L.querySelector('input[type="radio"]');L.classList.toggle("is-selected",!!N?.checked)})}function Je(L){return L<=0?"Belum dipilih":L===6?"6 Penumpang (Opsional tambahan)":`${L} Penumpang`}function ae(){const L=n?.value||"",N=a?.value||"",K=r?.value||"",pe=Number(o?.value||0),G=v.find(Bt=>Bt.checked)?.value||"",ee=H(L,N),Z=Math.max(parseInt(i?.value||"0",10)||0,0),se=ee!==null&&pe>0?(ee+Z)*pe:null;s&&(s.value=ee!==null?D(ee):""),c&&(c.value=se!==null?D(se):""),!L||!N?Y("idle","Tarif akan ditampilkan otomatis","Pilih asal dan tujuan untuk melihat tarif perjalanan reguler."):L===N?Y("error","Asal dan tujuan tidak boleh sama","Silakan pilih tujuan yang berbeda agar tarif dapat dihitung."):ee===null?Y("error","Rute belum tersedia","Rute yang Anda pilih saat ini belum tersedia. Silakan pilih kombinasi asal dan tujuan lain."):Y("ready","Rute tersedia","Tarif telah diisi otomatis berdasarkan kombinasi rute dua arah yang tersedia."),f&&(f.disabled=!!(L&&N&&(L===N||ee===null))),g&&(g.textContent=j.get(G)||"Belum dipilih"),b&&(b.textContent=L&&N?`${L} - ${N}`:"Belum dipilih"),h&&(h.textContent=F.get(K)||"Belum dipilih"),A&&(A.textContent=Je(pe)),M&&(M.textContent=ee!==null?D(ee):"Belum tersedia"),T&&(T.textContent=Z>0?D(Z):"Tidak ada"),P&&(P.textContent=se!==null?D(se):"Belum tersedia"),X()}[n,a,r,o].forEach(L=>{L?.addEventListener("change",ae)}),i?.addEventListener("input",ae),v.forEach(L=>{L.addEventListener("change",ae)}),e.querySelector("form")?.addEventListener("reset",()=>{window.requestAnimationFrame(ae)}),ae()}function ki(){const e=document.querySelector("[data-regular-booking-seat-page]");if(!e)return;const t=Number(e.dataset.requiredSeatCount||0),n=Array.from(e.querySelectorAll("[data-seat-card]")),a=Array.from(e.querySelectorAll("[data-seat-input]")),r=e.querySelector("[data-seat-summary-count]"),o=e.querySelector("[data-seat-summary-list]"),s=e.querySelector("[data-seat-summary-remaining]"),i=e.querySelector("[data-seat-submit]"),c=e.querySelector("[data-seat-feedback]"),d=e.querySelector("[data-seat-feedback-title]"),l=e.querySelector("[data-seat-feedback-text]");function m(){return a.filter(b=>b.checked).map(b=>b.value)}function f(b){return b.length>0?b.join(", "):"Belum dipilih"}function v(b,h,A){!c||!d||!l||(c.dataset.state=b,d.textContent=h,l.textContent=A)}function g(){const b=m(),h=b.length,A=t>0&&h>=t;if(n.forEach(M=>{const T=M.querySelector("[data-seat-input]");if(!T)return;const P=T.disabled&&!T.checked&&M.classList.contains("is-occupied"),j=T.checked,F=P||A&&!j;P||(T.disabled=F),M.classList.toggle("is-selected",j),M.classList.toggle("is-disabled",!P&&F)}),r&&(r.textContent=`${h} dari ${t}`),o&&(o.textContent=f(b)),s&&(s.textContent=String(Math.max(t-h,0))),i&&(i.disabled=h!==t),h===0){v("idle","Pilih kursi sesuai jumlah penumpang","Jumlah kursi yang dipilih harus sama dengan jumlah penumpang pada booking draft.");return}if(h<t){v("idle","Pemilihan kursi belum lengkap",`Masih perlu memilih ${t-h} kursi lagi sebelum dapat melanjutkan.`);return}if(t===6){v("ready","Semua kursi sudah terisi","Jumlah penumpang 6 orang sudah terpenuhi dan kursi tambahan 2B ikut terpakai.");return}v("ready","Kursi sudah sesuai","Jumlah kursi yang dipilih sudah sesuai dengan jumlah penumpang dan siap disimpan.")}a.forEach(b=>{b.addEventListener("change",()=>{g()})}),g()}let Pe=null,gt=!1,Qn="",yi=3e3,Yn=0;const ft=[],C=e=>document.getElementById(e);async function qa(e){const t=e.trim();if(!t)return;const n=Date.now();if(!(t===Qn&&n-Yn<yi)){Qn=t,Yn=n,we("Memproses scan…");try{const a=await E("/scan-qr",{method:"POST",body:{qr_token:t}});vi(a),wi(a),a.already_scanned?y(a.message,"Tiket Sudah Pernah Di-Scan"):a.is_newly_eligible?O(a.message,"🎉 Eligible Diskon!"):O(a.message,"Scan Berhasil")}catch(a){Ei(a.message||"Scan gagal"),y(a.message||"Scan gagal","Scan Gagal")}finally{we(gt?"Kamera aktif — arahkan ke QR code.":"")}}}function vi(e){C("qrscan-result-idle").hidden=!0,C("qrscan-result-card").hidden=!1;const t=e.booking||{},n=e.passenger||{},a=e.loyalty_count,r=e.loyalty_target,o=e.discount_eligible,s=Math.min(Math.round(a/r*100),100),i=e.already_scanned?"warn":e.success?"success":"error";C("qrscan-result-header").className="qrscan-result-header qrscan-result-header--"+i,C("qrscan-result-icon").innerHTML=e.already_scanned?$i():e.success?Si():Na(),C("qrscan-result-title").textContent=t.booking_code||"-",C("qrscan-result-subtitle").textContent=e.message,C("qr-res-name").textContent=n.name||t.nama_pemesanan||"-",C("qr-res-code").textContent=t.booking_code||"-",C("qr-res-route").textContent=t.route_label||"-",C("qr-res-datetime").textContent=(t.trip_date||"-")+" "+(t.trip_time||""),C("qr-res-seats").textContent=n.seat_no||t.selected_seats||"-",C("qr-res-pax").textContent=(t.passenger_count||0)+" Orang",C("qr-res-loyalty-label").textContent=a+" / "+r,C("qr-res-loyalty-fill").style.width=s+"%",C("qr-res-loyalty-fill").className="qrscan-loyalty-fill"+(o?" qrscan-loyalty-fill--done":""),C("qr-res-loyalty-note").textContent=o?"✅ Eligible diskon "+(e.discount_percentage||50)+"%":"Perlu "+Math.max(r-a,0)+" perjalanan lagi untuk diskon."}function Ei(e){C("qrscan-result-idle").hidden=!0,C("qrscan-result-card").hidden=!1,C("qrscan-result-header").className="qrscan-result-header qrscan-result-header--error",C("qrscan-result-icon").innerHTML=Na(),C("qrscan-result-title").textContent="Scan Gagal",C("qrscan-result-subtitle").textContent=e,["qr-res-name","qr-res-code","qr-res-route","qr-res-datetime","qr-res-seats","qr-res-pax"].forEach(t=>{C(t).textContent="-"}),C("qr-res-loyalty-label").textContent="– / –",C("qr-res-loyalty-fill").style.width="0%",C("qr-res-loyalty-note").textContent=""}function wi(e){const t=e.booking,n=new Date().toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit",second:"2-digit"}),a=e.passenger||{};ft.unshift({booking:t,passenger:a,time:n,success:e.success,already_scanned:e.already_scanned,message:e.message}),ja()}function ja(){const e=C("qrscan-history-list");if(ft.length===0){e.innerHTML='<p class="qrscan-history-empty">Belum ada scan dalam sesi ini.</p>';return}e.innerHTML=ft.map(t=>{const n=t.already_scanned?"warn":t.success?"ok":"err",a=t.passenger&&t.passenger.name?t.passenger.name+(t.passenger.seat_no?" ("+t.passenger.seat_no+")":""):t.booking.nama_pemesanan||"-";return`
        <div class="qrscan-history-item qrscan-history-item--${n}">
            <div class="qrscan-history-dot"></div>
            <div class="qrscan-history-body">
                <strong>${p(t.booking.booking_code||"-")}</strong>
                <span>${p(a)}</span>
            </div>
            <span class="qrscan-history-time">${t.time}</span>
        </div>`}).join("")}function Bi(){if(!window.Html5Qrcode){y("Library scanner tidak tersedia. Coba muat ulang halaman.","Error");return}C("qrscan-placeholder").hidden=!0,C("qrscan-frame").hidden=!1,C("qrscan-btn-start").hidden=!0,C("qrscan-btn-stop").hidden=!1,gt=!0,we("Menginisialisasi kamera…"),Pe=new window.Html5Qrcode("qrscan-reader"),Pe.start({facingMode:"environment"},{fps:10,qrbox:{width:240,height:240}},e=>{let t=e.trim();try{const n=JSON.parse(e);n&&(n.qr_token||n.passenger_qr_token)&&(t=n.qr_token||n.passenger_qr_token)}catch{}qa(t)},()=>{}).then(()=>{we("Kamera aktif — arahkan ke QR code.")}).catch(e=>{gt=!1,C("qrscan-placeholder").hidden=!1,C("qrscan-frame").hidden=!0,C("qrscan-btn-start").hidden=!1,C("qrscan-btn-stop").hidden=!0,we("Gagal mengakses kamera. Pastikan izin kamera sudah diberikan."),y(String(e),"Kamera Error")})}function Ii(){Pe&&Pe.stop().catch(()=>{}).finally(()=>{Pe=null}),gt=!1,C("qrscan-placeholder").hidden=!1,C("qrscan-frame").hidden=!0,C("qrscan-btn-start").hidden=!1,C("qrscan-btn-stop").hidden=!0,we("Kamera dihentikan.")}function we(e){C("qrscan-status-text").textContent=e}function Si(){return`<svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
        <path d="M8 12l3 3 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`}function Na(){return`<svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
        <path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`}function $i(){return`<svg viewBox="0 0 24 24" fill="none">
        <path d="M12 9v4M12 17h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    </svg>`}function Ci(){C("qrscan-btn-start").addEventListener("click",Bi),C("qrscan-btn-stop").addEventListener("click",Ii),C("qrscan-clear-history").addEventListener("click",()=>{ft.length=0,ja()}),C("qrscan-manual-form").addEventListener("submit",e=>{e.preventDefault();const t=C("qrscan-manual-input").value.trim();t&&(qa(t),C("qrscan-manual-input").value="")})}const x={data:[],loading:!0,totalCount:0,page:1,search:"",chartLimit:10,editItem:null,deleteItem:null,isSubmitting:!1};let ze=null;const me=15,xi=()=>`<svg viewBox="0 0 24 24" fill="none">
    <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
</svg>`,_i=()=>`<svg viewBox="0 0 24 24" fill="none">
    <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
</svg>`;function Li(){const e=document.getElementById("plkt-table-body");e&&(e.innerHTML=`
        <tr><td colspan="10" class="plkt-table-state">
            <div class="plkt-loading-inline">
                <span class="plkt-loading-inline-spinner" aria-hidden="true"></span>
                <span>Memuat data...</span>
            </div>
        </td></tr>`)}function Ti(){const e=document.getElementById("plkt-table-body");e&&(e.innerHTML='<tr><td colspan="10" class="plkt-table-state plkt-empty-copy">Belum ada data penumpang.</td></tr>')}function ea(){const e=document.getElementById("plkt-table-body");if(e){if(x.loading){Li();return}if(x.data.length===0){Ti();return}e.innerHTML=x.data.map((t,n)=>`
        <tr class="plkt-row">
            <td class="plkt-index-cell">${(x.page-1)*me+n+1}</td>
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
                        ${xi()}
                    </button>
                    <button class="plkt-icon-button plkt-icon-button-danger" type="button"
                        data-plkt-delete="${t.id}"
                        data-plkt-name="${p(t.passenger_name||"")}"
                        aria-label="Hapus penumpang ${p(t.passenger_name||"")}">
                        ${_i()}
                    </button>
                </div>
            </td>
        </tr>`).join("")}}function ta(){const e=document.getElementById("plkt-pagination-shell"),t=document.getElementById("plkt-pagination-info"),n=document.getElementById("plkt-pagination-page"),a=document.getElementById("plkt-prev-page-btn"),r=document.getElementById("plkt-next-page-btn"),o=Math.max(1,Math.ceil(x.totalCount/me));e&&(e.hidden=o<=1),t&&(t.textContent=_e(x.page,me,x.totalCount,x.data.length)),n&&(n.textContent=`${x.page} / ${o}`),a&&(a.disabled=x.page===1),r&&(r.disabled=x.page>=o)}async function ye(){x.loading=!0,ea(),ta();try{const[e,t]=await Promise.all([E(`/passengers-lkt?page=${x.page}&limit=${me}${x.search?`&search=${encodeURIComponent(x.search)}`:""}`),E(`/passengers-lkt/count${x.search?`?search=${encodeURIComponent(x.search)}`:""}`)]);x.data=Array.isArray(e)?e:[],x.totalCount=Number(t?.count||0)}catch(e){y(e.message||"Gagal memuat data","Error"),x.data=[],x.totalCount=0}finally{x.loading=!1,ea(),ta()}}function Ut(e){const t=document.getElementById("plkt-edit-submit-btn");x.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":"Simpan")}async function Ai(e){try{const t=await E(`/passengers-lkt/${e}`);x.editItem=t;const n=document.getElementById("plkt-edit-name"),a=document.getElementById("plkt-edit-phone"),r=document.getElementById("plkt-edit-id");r&&(r.value=t.id),n&&(n.value=t.name||""),a&&(a.value=t.phone||""),Ut(!1),q("plkt-edit-modal")}catch{y("Gagal memuat data penumpang")}}function Ri(e,t){x.deleteItem={id:e,name:t};const n=document.getElementById("plkt-delete-copy");n&&(n.innerHTML=`Apakah Anda yakin ingin menghapus penumpang <strong>${p(t)}</strong>? Tindakan ini tidak dapat dibatalkan.`),q("plkt-delete-modal")}async function Xe(){const e=document.getElementById("plkt-loyalty-chart"),t=document.getElementById("plkt-chart-empty");if(e)try{const n=await E(`/passengers-lkt/loyalty-chart?limit=${x.chartLimit}`);if(!Array.isArray(n)||n.length===0){e.hidden=!0,t&&(t.hidden=!1);return}e.hidden=!1,t&&(t.hidden=!0);const a=n.map(i=>i.passenger_name+(i.phone&&i.phone!=="-"?` (${i.phone})`:"")),r=n.map(i=>i.booking_count),o=Math.max(...r,1),s=r.map(i=>{const c=i/o;return`rgba(${Math.round(26+c*30)}, ${Math.round(35+c*80)}, ${Math.round(126+c*50)}, 0.85)`});ze&&(ze.destroy(),ze=null),ze=new window.Chart(e,{type:"bar",data:{labels:a,datasets:[{label:"Jumlah Pemesanan",data:r,backgroundColor:s,borderRadius:6,borderSkipped:!1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{title:i=>i[0].label,label:i=>` ${i.raw} kali pemesanan`}}},scales:{x:{ticks:{maxRotation:35,font:{size:11},color:"#374151"},grid:{display:!1}},y:{beginAtZero:!0,ticks:{stepSize:1,color:"#374151",font:{size:11}},grid:{color:"rgba(0,0,0,0.06)"}}}}})}catch{t&&(t.hidden=!1)}}function Mi(){if(x.data.length===0){y("Tidak ada data untuk diekspor.");return}const e=["No","Nama Penumpang","No HP","Dari","Tujuan","Tanggal Berangkat","Jam","Tarif","Kali Memesan"],t=x.data.map((s,i)=>[(x.page-1)*me+i+1,s.passenger_name||"-",s.phone||"-",s.from_city||"-",s.to_city||"-",s.trip_date||"-",s.trip_time||"-",s.tarif||"-",s.booking_count]),n=[e,...t].map(s=>s.map(i=>`"${String(i).replace(/"/g,'""')}"`).join(",")).join(`
`),a=new Blob(["\uFEFF"+n],{type:"text/csv;charset=utf-8;"}),r=URL.createObjectURL(a),o=document.createElement("a");o.href=r,o.download="data-penumpang-lkt.csv",o.click(),URL.revokeObjectURL(r)}function Pi(){const e=document.getElementById("plkt-search-input"),t=document.getElementById("plkt-prev-page-btn"),n=document.getElementById("plkt-next-page-btn"),a=document.getElementById("plkt-export-btn"),r=document.getElementById("plkt-chart-limit"),o=document.getElementById("plkt-table-body"),s=document.getElementById("plkt-edit-form"),i=document.getElementById("plkt-delete-confirm-btn");e?.addEventListener("input",xe(async c=>{x.search=c.target.value.trim(),x.page=1,await ye().catch(()=>y("Gagal memuat data"))},400)),t?.addEventListener("click",async()=>{x.page<=1||(x.page-=1,await ye().catch(()=>y("Gagal memuat data")))}),n?.addEventListener("click",async()=>{const c=Math.max(1,Math.ceil(x.totalCount/me));x.page>=c||(x.page+=1,await ye().catch(()=>y("Gagal memuat data")))}),a?.addEventListener("click",Mi),r?.addEventListener("change",async c=>{x.chartLimit=parseInt(c.target.value,10)||10,await Xe().catch(()=>{})}),o?.addEventListener("click",async c=>{const d=c.target.closest("[data-plkt-edit]"),l=c.target.closest("[data-plkt-delete]");d&&await Ai(d.dataset.plktEdit),l&&Ri(l.dataset.plktDelete,l.dataset.plktName)}),s?.addEventListener("submit",async c=>{c.preventDefault();const d=document.getElementById("plkt-edit-id")?.value,l=document.getElementById("plkt-edit-name")?.value.trim(),m=document.getElementById("plkt-edit-phone")?.value.trim();if(!l){y("Nama penumpang tidak boleh kosong");return}Ut(!0);try{await E(`/passengers-lkt/${d}`,{method:"PUT",body:{name:l,phone:m}}),O("Data penumpang berhasil diperbarui"),V("plkt-edit-modal"),await Promise.all([ye(),Xe()])}catch(f){y(f.message||"Gagal menyimpan data")}finally{Ut(!1)}}),i?.addEventListener("click",async()=>{if(x.deleteItem)try{await E(`/passengers-lkt/${x.deleteItem.id}`,{method:"DELETE"}),O("Data penumpang berhasil dihapus"),V("plkt-delete-modal"),x.deleteItem=null,(x.page-1)*me>=x.totalCount-1&&x.page>1&&(x.page-=1),await Promise.all([ye(),Xe()])}catch(c){y(c.message||"Gagal menghapus data")}}),ye().catch(()=>y("Gagal memuat data")),Xe().catch(()=>{})}const Di={"admin-users/index":Hs,"auth/login":Po,"bookings/index":fi,"dashboard/index":Ko,"drivers/index":as,"mobil/index":gs,"keberangkatan/index":Es,"regular-bookings/index":hi,"regular-bookings/seats":ki,"stock/index":Cs,"qr-scan/index":Ci,"passengers-lkt/index":Pi};document.addEventListener("DOMContentLoaded",async()=>{To(),Mo(),nt(xa());const e=So();e&&(e.type==="success"?O(e.message,e.title):e.type==="info"?Ao(e.message,e.title):y(e.message,e.title));try{const{user:t}=await Lo();t&&nt(t);const n=document.body.dataset.pageScript,a=Di[n];typeof a=="function"&&await a({user:t})}catch(t){console.error(t),y(t.message||"Terjadi kesalahan saat memuat halaman")}});
