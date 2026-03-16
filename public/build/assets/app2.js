function ta(e,t){return function(){return e.apply(t,arguments)}}const{toString:Na}=Object.prototype,{getPrototypeOf:Nt}=Object,{iterator:ft,toStringTag:na}=Symbol,bt=(e=>t=>{const n=Na.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),te=e=>(e=e.toLowerCase(),t=>bt(t)===e),ht=e=>t=>typeof t===e,{isArray:Se}=Array,Ee=ht("undefined");function je(e){return e!==null&&!Ee(e)&&e.constructor!==null&&!Ee(e.constructor)&&W(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const aa=te("ArrayBuffer");function Ua(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&aa(e.buffer),t}const Ha=ht("string"),W=ht("function"),ra=ht("number"),Ne=e=>e!==null&&typeof e=="object",Fa=e=>e===!0||e===!1,Xe=e=>{if(bt(e)!=="object")return!1;const t=Nt(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(na in e)&&!(ft in e)},Va=e=>{if(!Ne(e)||je(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},Ga=te("Date"),Ja=te("File"),Ka=e=>!!(e&&typeof e.uri<"u"),Wa=e=>e&&typeof e.getParts<"u",za=te("Blob"),Xa=te("FileList"),Za=e=>Ne(e)&&W(e.pipe);function Qa(){return typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}}const rn=Qa(),on=typeof rn.FormData<"u"?rn.FormData:void 0,Ya=e=>{let t;return e&&(on&&e instanceof on||W(e.append)&&((t=bt(e))==="formdata"||t==="object"&&W(e.toString)&&e.toString()==="[object FormData]"))},er=te("URLSearchParams"),[tr,nr,ar,rr]=["ReadableStream","Request","Response","Headers"].map(te),or=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function Ue(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let a,r;if(typeof e!="object"&&(e=[e]),Se(e))for(a=0,r=e.length;a<r;a++)t.call(null,e[a],a,e);else{if(je(e))return;const o=n?Object.getOwnPropertyNames(e):Object.keys(e),s=o.length;let i;for(a=0;a<s;a++)i=o[a],t.call(null,e[i],i,e)}}function oa(e,t){if(je(e))return null;t=t.toLowerCase();const n=Object.keys(e);let a=n.length,r;for(;a-- >0;)if(r=n[a],t===r.toLowerCase())return r;return null}const le=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,sa=e=>!Ee(e)&&e!==le;function At(){const{caseless:e,skipUndefined:t}=sa(this)&&this||{},n={},a=(r,o)=>{if(o==="__proto__"||o==="constructor"||o==="prototype")return;const s=e&&oa(n,o)||o;Xe(n[s])&&Xe(r)?n[s]=At(n[s],r):Xe(r)?n[s]=At({},r):Se(r)?n[s]=r.slice():(!t||!Ee(r))&&(n[s]=r)};for(let r=0,o=arguments.length;r<o;r++)arguments[r]&&Ue(arguments[r],a);return n}const sr=(e,t,n,{allOwnKeys:a}={})=>(Ue(t,(r,o)=>{n&&W(r)?Object.defineProperty(e,o,{value:ta(r,n),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(e,o,{value:r,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:a}),e),ir=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),lr=(e,t,n,a)=>{e.prototype=Object.create(t.prototype,a),Object.defineProperty(e.prototype,"constructor",{value:e,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},dr=(e,t,n,a)=>{let r,o,s;const i={};if(t=t||{},e==null)return t;do{for(r=Object.getOwnPropertyNames(e),o=r.length;o-- >0;)s=r[o],(!a||a(s,e,t))&&!i[s]&&(t[s]=e[s],i[s]=!0);e=n!==!1&&Nt(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},cr=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const a=e.indexOf(t,n);return a!==-1&&a===n},ur=e=>{if(!e)return null;if(Se(e))return e;let t=e.length;if(!ra(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},mr=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&Nt(Uint8Array)),pr=(e,t)=>{const a=(e&&e[ft]).call(e);let r;for(;(r=a.next())&&!r.done;){const o=r.value;t.call(e,o[0],o[1])}},gr=(e,t)=>{let n;const a=[];for(;(n=e.exec(t))!==null;)a.push(n);return a},fr=te("HTMLFormElement"),br=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,a,r){return a.toUpperCase()+r}),sn=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),hr=te("RegExp"),ia=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),a={};Ue(n,(r,o)=>{let s;(s=t(r,o,e))!==!1&&(a[o]=s||r)}),Object.defineProperties(e,a)},kr=e=>{ia(e,(t,n)=>{if(W(e)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const a=e[n];if(W(a)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},yr=(e,t)=>{const n={},a=r=>{r.forEach(o=>{n[o]=!0})};return Se(e)?a(e):a(String(e).split(t)),n},vr=()=>{},Er=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function wr(e){return!!(e&&W(e.append)&&e[na]==="FormData"&&e[ft])}const Br=e=>{const t=new Array(10),n=(a,r)=>{if(Ne(a)){if(t.indexOf(a)>=0)return;if(je(a))return a;if(!("toJSON"in a)){t[r]=a;const o=Se(a)?[]:{};return Ue(a,(s,i)=>{const m=n(s,r+1);!Ee(m)&&(o[i]=m)}),t[r]=void 0,o}}return a};return n(e,0)},Ir=te("AsyncFunction"),Sr=e=>e&&(Ne(e)||W(e))&&W(e.then)&&W(e.catch),la=((e,t)=>e?setImmediate:t?((n,a)=>(le.addEventListener("message",({source:r,data:o})=>{r===le&&o===n&&a.length&&a.shift()()},!1),r=>{a.push(r),le.postMessage(n,"*")}))(`axios@${Math.random()}`,[]):n=>setTimeout(n))(typeof setImmediate=="function",W(le.postMessage)),$r=typeof queueMicrotask<"u"?queueMicrotask.bind(le):typeof process<"u"&&process.nextTick||la,Cr=e=>e!=null&&W(e[ft]),c={isArray:Se,isArrayBuffer:aa,isBuffer:je,isFormData:Ya,isArrayBufferView:Ua,isString:Ha,isNumber:ra,isBoolean:Fa,isObject:Ne,isPlainObject:Xe,isEmptyObject:Va,isReadableStream:tr,isRequest:nr,isResponse:ar,isHeaders:rr,isUndefined:Ee,isDate:Ga,isFile:Ja,isReactNativeBlob:Ka,isReactNative:Wa,isBlob:za,isRegExp:hr,isFunction:W,isStream:Za,isURLSearchParams:er,isTypedArray:mr,isFileList:Xa,forEach:Ue,merge:At,extend:sr,trim:or,stripBOM:ir,inherits:lr,toFlatObject:dr,kindOf:bt,kindOfTest:te,endsWith:cr,toArray:ur,forEachEntry:pr,matchAll:gr,isHTMLForm:fr,hasOwnProperty:sn,hasOwnProp:sn,reduceDescriptors:ia,freezeMethods:kr,toObjectSet:yr,toCamelCase:br,noop:vr,toFiniteNumber:Er,findKey:oa,global:le,isContextDefined:sa,isSpecCompliantForm:wr,toJSONObject:Br,isAsyncFn:Ir,isThenable:Sr,setImmediate:la,asap:$r,isIterable:Cr};let I=class da extends Error{static from(t,n,a,r,o,s){const i=new da(t.message,n||t.code,a,r,o);return i.cause=t,i.name=t.name,t.status!=null&&i.status==null&&(i.status=t.status),s&&Object.assign(i,s),i}constructor(t,n,a,r,o){super(t),Object.defineProperty(this,"message",{value:t,enumerable:!0,writable:!0,configurable:!0}),this.name="AxiosError",this.isAxiosError=!0,n&&(this.code=n),a&&(this.config=a),r&&(this.request=r),o&&(this.response=o,this.status=o.status)}toJSON(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:c.toJSONObject(this.config),code:this.code,status:this.status}}};I.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";I.ERR_BAD_OPTION="ERR_BAD_OPTION";I.ECONNABORTED="ECONNABORTED";I.ETIMEDOUT="ETIMEDOUT";I.ERR_NETWORK="ERR_NETWORK";I.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";I.ERR_DEPRECATED="ERR_DEPRECATED";I.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";I.ERR_BAD_REQUEST="ERR_BAD_REQUEST";I.ERR_CANCELED="ERR_CANCELED";I.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";I.ERR_INVALID_URL="ERR_INVALID_URL";const xr=null;function Rt(e){return c.isPlainObject(e)||c.isArray(e)}function ca(e){return c.endsWith(e,"[]")?e.slice(0,-2):e}function It(e,t,n){return e?e.concat(t).map(function(r,o){return r=ca(r),!n&&o?"["+r+"]":r}).join(n?".":""):t}function _r(e){return c.isArray(e)&&!e.some(Rt)}const Tr=c.toFlatObject(c,{},null,function(t){return/^is[A-Z]/.test(t)});function kt(e,t,n){if(!c.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=c.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(b,h){return!c.isUndefined(h[b])});const a=n.metaTokens,r=n.visitor||d,o=n.dots,s=n.indexes,m=(n.Blob||typeof Blob<"u"&&Blob)&&c.isSpecCompliantForm(t);if(!c.isFunction(r))throw new TypeError("visitor must be a function");function l(g){if(g===null)return"";if(c.isDate(g))return g.toISOString();if(c.isBoolean(g))return g.toString();if(!m&&c.isBlob(g))throw new I("Blob is not supported. Use a Buffer instead.");return c.isArrayBuffer(g)||c.isTypedArray(g)?m&&typeof Blob=="function"?new Blob([g]):Buffer.from(g):g}function d(g,b,h){let L=g;if(c.isReactNative(t)&&c.isReactNativeBlob(g))return t.append(It(h,b,o),l(g)),!1;if(g&&!h&&typeof g=="object"){if(c.endsWith(b,"{}"))b=a?b:b.slice(0,-2),g=JSON.stringify(g);else if(c.isArray(g)&&_r(g)||(c.isFileList(g)||c.endsWith(b,"[]"))&&(L=c.toArray(g)))return b=ca(b),L.forEach(function(T,P){!(c.isUndefined(T)||T===null)&&t.append(s===!0?It([b],P,o):s===null?b:b+"[]",l(T))}),!1}return Rt(g)?!0:(t.append(It(h,b,o),l(g)),!1)}const u=[],f=Object.assign(Tr,{defaultVisitor:d,convertValue:l,isVisitable:Rt});function v(g,b){if(!c.isUndefined(g)){if(u.indexOf(g)!==-1)throw Error("Circular reference detected in "+b.join("."));u.push(g),c.forEach(g,function(L,M){(!(c.isUndefined(L)||L===null)&&r.call(t,L,c.isString(M)?M.trim():M,b,f))===!0&&v(L,b?b.concat(M):[M])}),u.pop()}}if(!c.isObject(e))throw new TypeError("data must be an object");return v(e),t}function ln(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(a){return t[a]})}function Ut(e,t){this._pairs=[],e&&kt(e,this,t)}const ua=Ut.prototype;ua.append=function(t,n){this._pairs.push([t,n])};ua.toString=function(t){const n=t?function(a){return t.call(this,a,ln)}:ln;return this._pairs.map(function(r){return n(r[0])+"="+n(r[1])},"").join("&")};function Lr(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function ma(e,t,n){if(!t)return e;const a=n&&n.encode||Lr,r=c.isFunction(n)?{serialize:n}:n,o=r&&r.serialize;let s;if(o?s=o(t,r):s=c.isURLSearchParams(t)?t.toString():new Ut(t,r).toString(a),s){const i=e.indexOf("#");i!==-1&&(e=e.slice(0,i)),e+=(e.indexOf("?")===-1?"?":"&")+s}return e}class dn{constructor(){this.handlers=[]}use(t,n,a){return this.handlers.push({fulfilled:t,rejected:n,synchronous:a?a.synchronous:!1,runWhen:a?a.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){c.forEach(this.handlers,function(a){a!==null&&t(a)})}}const Ht={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0},Ar=typeof URLSearchParams<"u"?URLSearchParams:Ut,Rr=typeof FormData<"u"?FormData:null,Mr=typeof Blob<"u"?Blob:null,Pr={isBrowser:!0,classes:{URLSearchParams:Ar,FormData:Rr,Blob:Mr},protocols:["http","https","file","blob","url","data"]},Ft=typeof window<"u"&&typeof document<"u",Mt=typeof navigator=="object"&&navigator||void 0,Dr=Ft&&(!Mt||["ReactNative","NativeScript","NS"].indexOf(Mt.product)<0),Or=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",qr=Ft&&window.location.href||"http://localhost",jr=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:Ft,hasStandardBrowserEnv:Dr,hasStandardBrowserWebWorkerEnv:Or,navigator:Mt,origin:qr},Symbol.toStringTag,{value:"Module"})),G={...jr,...Pr};function Nr(e,t){return kt(e,new G.classes.URLSearchParams,{visitor:function(n,a,r,o){return G.isNode&&c.isBuffer(n)?(this.append(a,n.toString("base64")),!1):o.defaultVisitor.apply(this,arguments)},...t})}function Ur(e){return c.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function Hr(e){const t={},n=Object.keys(e);let a;const r=n.length;let o;for(a=0;a<r;a++)o=n[a],t[o]=e[o];return t}function pa(e){function t(n,a,r,o){let s=n[o++];if(s==="__proto__")return!0;const i=Number.isFinite(+s),m=o>=n.length;return s=!s&&c.isArray(r)?r.length:s,m?(c.hasOwnProp(r,s)?r[s]=[r[s],a]:r[s]=a,!i):((!r[s]||!c.isObject(r[s]))&&(r[s]=[]),t(n,a,r[s],o)&&c.isArray(r[s])&&(r[s]=Hr(r[s])),!i)}if(c.isFormData(e)&&c.isFunction(e.entries)){const n={};return c.forEachEntry(e,(a,r)=>{t(Ur(a),r,n,0)}),n}return null}function Fr(e,t,n){if(c.isString(e))try{return(t||JSON.parse)(e),c.trim(e)}catch(a){if(a.name!=="SyntaxError")throw a}return(n||JSON.stringify)(e)}const He={transitional:Ht,adapter:["xhr","http","fetch"],transformRequest:[function(t,n){const a=n.getContentType()||"",r=a.indexOf("application/json")>-1,o=c.isObject(t);if(o&&c.isHTMLForm(t)&&(t=new FormData(t)),c.isFormData(t))return r?JSON.stringify(pa(t)):t;if(c.isArrayBuffer(t)||c.isBuffer(t)||c.isStream(t)||c.isFile(t)||c.isBlob(t)||c.isReadableStream(t))return t;if(c.isArrayBufferView(t))return t.buffer;if(c.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let i;if(o){if(a.indexOf("application/x-www-form-urlencoded")>-1)return Nr(t,this.formSerializer).toString();if((i=c.isFileList(t))||a.indexOf("multipart/form-data")>-1){const m=this.env&&this.env.FormData;return kt(i?{"files[]":t}:t,m&&new m,this.formSerializer)}}return o||r?(n.setContentType("application/json",!1),Fr(t)):t}],transformResponse:[function(t){const n=this.transitional||He.transitional,a=n&&n.forcedJSONParsing,r=this.responseType==="json";if(c.isResponse(t)||c.isReadableStream(t))return t;if(t&&c.isString(t)&&(a&&!this.responseType||r)){const s=!(n&&n.silentJSONParsing)&&r;try{return JSON.parse(t,this.parseReviver)}catch(i){if(s)throw i.name==="SyntaxError"?I.from(i,I.ERR_BAD_RESPONSE,this,null,this.response):i}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:G.classes.FormData,Blob:G.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};c.forEach(["delete","get","head","post","put","patch"],e=>{He.headers[e]={}});const Vr=c.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),Gr=e=>{const t={};let n,a,r;return e&&e.split(`
`).forEach(function(s){r=s.indexOf(":"),n=s.substring(0,r).trim().toLowerCase(),a=s.substring(r+1).trim(),!(!n||t[n]&&Vr[n])&&(n==="set-cookie"?t[n]?t[n].push(a):t[n]=[a]:t[n]=t[n]?t[n]+", "+a:a)}),t},cn=Symbol("internals");function _e(e){return e&&String(e).trim().toLowerCase()}function Ze(e){return e===!1||e==null?e:c.isArray(e)?e.map(Ze):String(e)}function Jr(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let a;for(;a=n.exec(e);)t[a[1]]=a[2];return t}const Kr=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function St(e,t,n,a,r){if(c.isFunction(a))return a.call(this,t,n);if(r&&(t=n),!!c.isString(t)){if(c.isString(a))return t.indexOf(a)!==-1;if(c.isRegExp(a))return a.test(t)}}function Wr(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,a)=>n.toUpperCase()+a)}function zr(e,t){const n=c.toCamelCase(" "+t);["get","set","has"].forEach(a=>{Object.defineProperty(e,a+n,{value:function(r,o,s){return this[a].call(this,t,r,o,s)},configurable:!0})})}let z=class{constructor(t){t&&this.set(t)}set(t,n,a){const r=this;function o(i,m,l){const d=_e(m);if(!d)throw new Error("header name must be a non-empty string");const u=c.findKey(r,d);(!u||r[u]===void 0||l===!0||l===void 0&&r[u]!==!1)&&(r[u||m]=Ze(i))}const s=(i,m)=>c.forEach(i,(l,d)=>o(l,d,m));if(c.isPlainObject(t)||t instanceof this.constructor)s(t,n);else if(c.isString(t)&&(t=t.trim())&&!Kr(t))s(Gr(t),n);else if(c.isObject(t)&&c.isIterable(t)){let i={},m,l;for(const d of t){if(!c.isArray(d))throw TypeError("Object iterator must return a key-value pair");i[l=d[0]]=(m=i[l])?c.isArray(m)?[...m,d[1]]:[m,d[1]]:d[1]}s(i,n)}else t!=null&&o(n,t,a);return this}get(t,n){if(t=_e(t),t){const a=c.findKey(this,t);if(a){const r=this[a];if(!n)return r;if(n===!0)return Jr(r);if(c.isFunction(n))return n.call(this,r,a);if(c.isRegExp(n))return n.exec(r);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=_e(t),t){const a=c.findKey(this,t);return!!(a&&this[a]!==void 0&&(!n||St(this,this[a],a,n)))}return!1}delete(t,n){const a=this;let r=!1;function o(s){if(s=_e(s),s){const i=c.findKey(a,s);i&&(!n||St(a,a[i],i,n))&&(delete a[i],r=!0)}}return c.isArray(t)?t.forEach(o):o(t),r}clear(t){const n=Object.keys(this);let a=n.length,r=!1;for(;a--;){const o=n[a];(!t||St(this,this[o],o,t,!0))&&(delete this[o],r=!0)}return r}normalize(t){const n=this,a={};return c.forEach(this,(r,o)=>{const s=c.findKey(a,o);if(s){n[s]=Ze(r),delete n[o];return}const i=t?Wr(o):String(o).trim();i!==o&&delete n[o],n[i]=Ze(r),a[i]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return c.forEach(this,(a,r)=>{a!=null&&a!==!1&&(n[r]=t&&c.isArray(a)?a.join(", "):a)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const a=new this(t);return n.forEach(r=>a.set(r)),a}static accessor(t){const a=(this[cn]=this[cn]={accessors:{}}).accessors,r=this.prototype;function o(s){const i=_e(s);a[i]||(zr(r,s),a[i]=!0)}return c.isArray(t)?t.forEach(o):o(t),this}};z.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);c.reduceDescriptors(z.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(a){this[n]=a}}});c.freezeMethods(z);function $t(e,t){const n=this||He,a=t||n,r=z.from(a.headers);let o=a.data;return c.forEach(e,function(i){o=i.call(n,o,r.normalize(),t?t.status:void 0)}),r.normalize(),o}function ga(e){return!!(e&&e.__CANCEL__)}let Fe=class extends I{constructor(t,n,a){super(t??"canceled",I.ERR_CANCELED,n,a),this.name="CanceledError",this.__CANCEL__=!0}};function fa(e,t,n){const a=n.config.validateStatus;!n.status||!a||a(n.status)?e(n):t(new I("Request failed with status code "+n.status,[I.ERR_BAD_REQUEST,I.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}function Xr(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function Zr(e,t){e=e||10;const n=new Array(e),a=new Array(e);let r=0,o=0,s;return t=t!==void 0?t:1e3,function(m){const l=Date.now(),d=a[o];s||(s=l),n[r]=m,a[r]=l;let u=o,f=0;for(;u!==r;)f+=n[u++],u=u%e;if(r=(r+1)%e,r===o&&(o=(o+1)%e),l-s<t)return;const v=d&&l-d;return v?Math.round(f*1e3/v):void 0}}function Qr(e,t){let n=0,a=1e3/t,r,o;const s=(l,d=Date.now())=>{n=d,r=null,o&&(clearTimeout(o),o=null),e(...l)};return[(...l)=>{const d=Date.now(),u=d-n;u>=a?s(l,d):(r=l,o||(o=setTimeout(()=>{o=null,s(r)},a-u)))},()=>r&&s(r)]}const et=(e,t,n=3)=>{let a=0;const r=Zr(50,250);return Qr(o=>{const s=o.loaded,i=o.lengthComputable?o.total:void 0,m=s-a,l=r(m),d=s<=i;a=s;const u={loaded:s,total:i,progress:i?s/i:void 0,bytes:m,rate:l||void 0,estimated:l&&i&&d?(i-s)/l:void 0,event:o,lengthComputable:i!=null,[t?"download":"upload"]:!0};e(u)},n)},un=(e,t)=>{const n=e!=null;return[a=>t[0]({lengthComputable:n,total:e,loaded:a}),t[1]]},mn=e=>(...t)=>c.asap(()=>e(...t)),Yr=G.hasStandardBrowserEnv?((e,t)=>n=>(n=new URL(n,G.origin),e.protocol===n.protocol&&e.host===n.host&&(t||e.port===n.port)))(new URL(G.origin),G.navigator&&/(msie|trident)/i.test(G.navigator.userAgent)):()=>!0,eo=G.hasStandardBrowserEnv?{write(e,t,n,a,r,o,s){if(typeof document>"u")return;const i=[`${e}=${encodeURIComponent(t)}`];c.isNumber(n)&&i.push(`expires=${new Date(n).toUTCString()}`),c.isString(a)&&i.push(`path=${a}`),c.isString(r)&&i.push(`domain=${r}`),o===!0&&i.push("secure"),c.isString(s)&&i.push(`SameSite=${s}`),document.cookie=i.join("; ")},read(e){if(typeof document>"u")return null;const t=document.cookie.match(new RegExp("(?:^|; )"+e+"=([^;]*)"));return t?decodeURIComponent(t[1]):null},remove(e){this.write(e,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function to(e){return typeof e!="string"?!1:/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function no(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function ba(e,t,n){let a=!to(t);return e&&(a||n==!1)?no(e,t):t}const pn=e=>e instanceof z?{...e}:e;function ue(e,t){t=t||{};const n={};function a(l,d,u,f){return c.isPlainObject(l)&&c.isPlainObject(d)?c.merge.call({caseless:f},l,d):c.isPlainObject(d)?c.merge({},d):c.isArray(d)?d.slice():d}function r(l,d,u,f){if(c.isUndefined(d)){if(!c.isUndefined(l))return a(void 0,l,u,f)}else return a(l,d,u,f)}function o(l,d){if(!c.isUndefined(d))return a(void 0,d)}function s(l,d){if(c.isUndefined(d)){if(!c.isUndefined(l))return a(void 0,l)}else return a(void 0,d)}function i(l,d,u){if(u in t)return a(l,d);if(u in e)return a(void 0,l)}const m={url:o,method:o,data:o,baseURL:s,transformRequest:s,transformResponse:s,paramsSerializer:s,timeout:s,timeoutMessage:s,withCredentials:s,withXSRFToken:s,adapter:s,responseType:s,xsrfCookieName:s,xsrfHeaderName:s,onUploadProgress:s,onDownloadProgress:s,decompress:s,maxContentLength:s,maxBodyLength:s,beforeRedirect:s,transport:s,httpAgent:s,httpsAgent:s,cancelToken:s,socketPath:s,responseEncoding:s,validateStatus:i,headers:(l,d,u)=>r(pn(l),pn(d),u,!0)};return c.forEach(Object.keys({...e,...t}),function(d){if(d==="__proto__"||d==="constructor"||d==="prototype")return;const u=c.hasOwnProp(m,d)?m[d]:r,f=u(e[d],t[d],d);c.isUndefined(f)&&u!==i||(n[d]=f)}),n}const ha=e=>{const t=ue({},e);let{data:n,withXSRFToken:a,xsrfHeaderName:r,xsrfCookieName:o,headers:s,auth:i}=t;if(t.headers=s=z.from(s),t.url=ma(ba(t.baseURL,t.url,t.allowAbsoluteUrls),e.params,e.paramsSerializer),i&&s.set("Authorization","Basic "+btoa((i.username||"")+":"+(i.password?unescape(encodeURIComponent(i.password)):""))),c.isFormData(n)){if(G.hasStandardBrowserEnv||G.hasStandardBrowserWebWorkerEnv)s.setContentType(void 0);else if(c.isFunction(n.getHeaders)){const m=n.getHeaders(),l=["content-type","content-length"];Object.entries(m).forEach(([d,u])=>{l.includes(d.toLowerCase())&&s.set(d,u)})}}if(G.hasStandardBrowserEnv&&(a&&c.isFunction(a)&&(a=a(t)),a||a!==!1&&Yr(t.url))){const m=r&&o&&eo.read(o);m&&s.set(r,m)}return t},ao=typeof XMLHttpRequest<"u",ro=ao&&function(e){return new Promise(function(n,a){const r=ha(e);let o=r.data;const s=z.from(r.headers).normalize();let{responseType:i,onUploadProgress:m,onDownloadProgress:l}=r,d,u,f,v,g;function b(){v&&v(),g&&g(),r.cancelToken&&r.cancelToken.unsubscribe(d),r.signal&&r.signal.removeEventListener("abort",d)}let h=new XMLHttpRequest;h.open(r.method.toUpperCase(),r.url,!0),h.timeout=r.timeout;function L(){if(!h)return;const T=z.from("getAllResponseHeaders"in h&&h.getAllResponseHeaders()),q={data:!i||i==="text"||i==="json"?h.responseText:h.response,status:h.status,statusText:h.statusText,headers:T,config:e,request:h};fa(function(H){n(H),b()},function(H){a(H),b()},q),h=null}"onloadend"in h?h.onloadend=L:h.onreadystatechange=function(){!h||h.readyState!==4||h.status===0&&!(h.responseURL&&h.responseURL.indexOf("file:")===0)||setTimeout(L)},h.onabort=function(){h&&(a(new I("Request aborted",I.ECONNABORTED,e,h)),h=null)},h.onerror=function(P){const q=P&&P.message?P.message:"Network Error",F=new I(q,I.ERR_NETWORK,e,h);F.event=P||null,a(F),h=null},h.ontimeout=function(){let P=r.timeout?"timeout of "+r.timeout+"ms exceeded":"timeout exceeded";const q=r.transitional||Ht;r.timeoutErrorMessage&&(P=r.timeoutErrorMessage),a(new I(P,q.clarifyTimeoutError?I.ETIMEDOUT:I.ECONNABORTED,e,h)),h=null},o===void 0&&s.setContentType(null),"setRequestHeader"in h&&c.forEach(s.toJSON(),function(P,q){h.setRequestHeader(q,P)}),c.isUndefined(r.withCredentials)||(h.withCredentials=!!r.withCredentials),i&&i!=="json"&&(h.responseType=r.responseType),l&&([f,g]=et(l,!0),h.addEventListener("progress",f)),m&&h.upload&&([u,v]=et(m),h.upload.addEventListener("progress",u),h.upload.addEventListener("loadend",v)),(r.cancelToken||r.signal)&&(d=T=>{h&&(a(!T||T.type?new Fe(null,e,h):T),h.abort(),h=null)},r.cancelToken&&r.cancelToken.subscribe(d),r.signal&&(r.signal.aborted?d():r.signal.addEventListener("abort",d)));const M=Xr(r.url);if(M&&G.protocols.indexOf(M)===-1){a(new I("Unsupported protocol "+M+":",I.ERR_BAD_REQUEST,e));return}h.send(o||null)})},oo=(e,t)=>{const{length:n}=e=e?e.filter(Boolean):[];if(t||n){let a=new AbortController,r;const o=function(l){if(!r){r=!0,i();const d=l instanceof Error?l:this.reason;a.abort(d instanceof I?d:new Fe(d instanceof Error?d.message:d))}};let s=t&&setTimeout(()=>{s=null,o(new I(`timeout of ${t}ms exceeded`,I.ETIMEDOUT))},t);const i=()=>{e&&(s&&clearTimeout(s),s=null,e.forEach(l=>{l.unsubscribe?l.unsubscribe(o):l.removeEventListener("abort",o)}),e=null)};e.forEach(l=>l.addEventListener("abort",o));const{signal:m}=a;return m.unsubscribe=()=>c.asap(i),m}},so=function*(e,t){let n=e.byteLength;if(n<t){yield e;return}let a=0,r;for(;a<n;)r=a+t,yield e.slice(a,r),a=r},io=async function*(e,t){for await(const n of lo(e))yield*so(n,t)},lo=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:n,value:a}=await t.read();if(n)break;yield a}}finally{await t.cancel()}},gn=(e,t,n,a)=>{const r=io(e,t);let o=0,s,i=m=>{s||(s=!0,a&&a(m))};return new ReadableStream({async pull(m){try{const{done:l,value:d}=await r.next();if(l){i(),m.close();return}let u=d.byteLength;if(n){let f=o+=u;n(f)}m.enqueue(new Uint8Array(d))}catch(l){throw i(l),l}},cancel(m){return i(m),r.return()}},{highWaterMark:2})},fn=64*1024,{isFunction:Ke}=c,co=(({Request:e,Response:t})=>({Request:e,Response:t}))(c.global),{ReadableStream:bn,TextEncoder:hn}=c.global,kn=(e,...t)=>{try{return!!e(...t)}catch{return!1}},uo=e=>{e=c.merge.call({skipUndefined:!0},co,e);const{fetch:t,Request:n,Response:a}=e,r=t?Ke(t):typeof fetch=="function",o=Ke(n),s=Ke(a);if(!r)return!1;const i=r&&Ke(bn),m=r&&(typeof hn=="function"?(g=>b=>g.encode(b))(new hn):async g=>new Uint8Array(await new n(g).arrayBuffer())),l=o&&i&&kn(()=>{let g=!1;const b=new n(G.origin,{body:new bn,method:"POST",get duplex(){return g=!0,"half"}}).headers.has("Content-Type");return g&&!b}),d=s&&i&&kn(()=>c.isReadableStream(new a("").body)),u={stream:d&&(g=>g.body)};r&&["text","arrayBuffer","blob","formData","stream"].forEach(g=>{!u[g]&&(u[g]=(b,h)=>{let L=b&&b[g];if(L)return L.call(b);throw new I(`Response type '${g}' is not supported`,I.ERR_NOT_SUPPORT,h)})});const f=async g=>{if(g==null)return 0;if(c.isBlob(g))return g.size;if(c.isSpecCompliantForm(g))return(await new n(G.origin,{method:"POST",body:g}).arrayBuffer()).byteLength;if(c.isArrayBufferView(g)||c.isArrayBuffer(g))return g.byteLength;if(c.isURLSearchParams(g)&&(g=g+""),c.isString(g))return(await m(g)).byteLength},v=async(g,b)=>{const h=c.toFiniteNumber(g.getContentLength());return h??f(b)};return async g=>{let{url:b,method:h,data:L,signal:M,cancelToken:T,timeout:P,onDownloadProgress:q,onUploadProgress:F,responseType:H,headers:Y,withCredentials:X="same-origin",fetchOptions:Ge}=ha(g),ae=t||fetch;H=H?(H+"").toLowerCase():"text";let _=oo([M,T&&T.toAbortSignal()],P),N=null;const J=_&&_.unsubscribe&&(()=>{_.unsubscribe()});let me;try{if(F&&l&&h!=="get"&&h!=="head"&&(me=await v(Y,L))!==0){let re=new n(b,{method:"POST",body:L,duplex:"half"}),pe;if(c.isFormData(L)&&(pe=re.headers.get("content-type"))&&Y.setContentType(pe),re.body){const[Bt,Je]=un(me,et(mn(F)));L=gn(re.body,fn,Bt,Je)}}c.isString(X)||(X=X?"include":"omit");const V=o&&"credentials"in n.prototype,ee={...Ge,signal:_,method:h.toUpperCase(),headers:Y.normalize().toJSON(),body:L,duplex:"half",credentials:V?X:void 0};N=o&&new n(b,ee);let Z=await(o?ae(N,Ge):ae(b,ee));const se=d&&(H==="stream"||H==="response");if(d&&(q||se&&J)){const re={};["status","statusText","headers"].forEach(an=>{re[an]=Z[an]});const pe=c.toFiniteNumber(Z.headers.get("content-length")),[Bt,Je]=q&&un(pe,et(mn(q),!0))||[];Z=new a(gn(Z.body,fn,Bt,()=>{Je&&Je(),J&&J()}),re)}H=H||"text";let wt=await u[c.findKey(u,H)||"text"](Z,g);return!se&&J&&J(),await new Promise((re,pe)=>{fa(re,pe,{data:wt,headers:z.from(Z.headers),status:Z.status,statusText:Z.statusText,config:g,request:N})})}catch(V){throw J&&J(),V&&V.name==="TypeError"&&/Load failed|fetch/i.test(V.message)?Object.assign(new I("Network Error",I.ERR_NETWORK,g,N,V&&V.response),{cause:V.cause||V}):I.from(V,V&&V.code,g,N,V&&V.response)}}},mo=new Map,ka=e=>{let t=e&&e.env||{};const{fetch:n,Request:a,Response:r}=t,o=[a,r,n];let s=o.length,i=s,m,l,d=mo;for(;i--;)m=o[i],l=d.get(m),l===void 0&&d.set(m,l=i?new Map:uo(t)),d=l;return l};ka();const Vt={http:xr,xhr:ro,fetch:{get:ka}};c.forEach(Vt,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const yn=e=>`- ${e}`,po=e=>c.isFunction(e)||e===null||e===!1;function go(e,t){e=c.isArray(e)?e:[e];const{length:n}=e;let a,r;const o={};for(let s=0;s<n;s++){a=e[s];let i;if(r=a,!po(a)&&(r=Vt[(i=String(a)).toLowerCase()],r===void 0))throw new I(`Unknown adapter '${i}'`);if(r&&(c.isFunction(r)||(r=r.get(t))))break;o[i||"#"+s]=r}if(!r){const s=Object.entries(o).map(([m,l])=>`adapter ${m} `+(l===!1?"is not supported by the environment":"is not available in the build"));let i=n?s.length>1?`since :
`+s.map(yn).join(`
`):" "+yn(s[0]):"as no adapter specified";throw new I("There is no suitable adapter to dispatch the request "+i,"ERR_NOT_SUPPORT")}return r}const ya={getAdapter:go,adapters:Vt};function Ct(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new Fe(null,e)}function vn(e){return Ct(e),e.headers=z.from(e.headers),e.data=$t.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),ya.getAdapter(e.adapter||He.adapter,e)(e).then(function(a){return Ct(e),a.data=$t.call(e,e.transformResponse,a),a.headers=z.from(a.headers),a},function(a){return ga(a)||(Ct(e),a&&a.response&&(a.response.data=$t.call(e,e.transformResponse,a.response),a.response.headers=z.from(a.response.headers))),Promise.reject(a)})}const va="1.13.6",yt={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{yt[e]=function(a){return typeof a===e||"a"+(t<1?"n ":" ")+e}});const En={};yt.transitional=function(t,n,a){function r(o,s){return"[Axios v"+va+"] Transitional option '"+o+"'"+s+(a?". "+a:"")}return(o,s,i)=>{if(t===!1)throw new I(r(s," has been removed"+(n?" in "+n:"")),I.ERR_DEPRECATED);return n&&!En[s]&&(En[s]=!0,console.warn(r(s," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(o,s,i):!0}};yt.spelling=function(t){return(n,a)=>(console.warn(`${a} is likely a misspelling of ${t}`),!0)};function fo(e,t,n){if(typeof e!="object")throw new I("options must be an object",I.ERR_BAD_OPTION_VALUE);const a=Object.keys(e);let r=a.length;for(;r-- >0;){const o=a[r],s=t[o];if(s){const i=e[o],m=i===void 0||s(i,o,e);if(m!==!0)throw new I("option "+o+" must be "+m,I.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new I("Unknown option "+o,I.ERR_BAD_OPTION)}}const Qe={assertOptions:fo,validators:yt},Q=Qe.validators;let ce=class{constructor(t){this.defaults=t||{},this.interceptors={request:new dn,response:new dn}}async request(t,n){try{return await this._request(t,n)}catch(a){if(a instanceof Error){let r={};Error.captureStackTrace?Error.captureStackTrace(r):r=new Error;const o=r.stack?r.stack.replace(/^.+\n/,""):"";try{a.stack?o&&!String(a.stack).endsWith(o.replace(/^.+\n.+\n/,""))&&(a.stack+=`
`+o):a.stack=o}catch{}}throw a}}_request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=ue(this.defaults,n);const{transitional:a,paramsSerializer:r,headers:o}=n;a!==void 0&&Qe.assertOptions(a,{silentJSONParsing:Q.transitional(Q.boolean),forcedJSONParsing:Q.transitional(Q.boolean),clarifyTimeoutError:Q.transitional(Q.boolean),legacyInterceptorReqResOrdering:Q.transitional(Q.boolean)},!1),r!=null&&(c.isFunction(r)?n.paramsSerializer={serialize:r}:Qe.assertOptions(r,{encode:Q.function,serialize:Q.function},!0)),n.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?n.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:n.allowAbsoluteUrls=!0),Qe.assertOptions(n,{baseUrl:Q.spelling("baseURL"),withXsrfToken:Q.spelling("withXSRFToken")},!0),n.method=(n.method||this.defaults.method||"get").toLowerCase();let s=o&&c.merge(o.common,o[n.method]);o&&c.forEach(["delete","get","head","post","put","patch","common"],g=>{delete o[g]}),n.headers=z.concat(s,o);const i=[];let m=!0;this.interceptors.request.forEach(function(b){if(typeof b.runWhen=="function"&&b.runWhen(n)===!1)return;m=m&&b.synchronous;const h=n.transitional||Ht;h&&h.legacyInterceptorReqResOrdering?i.unshift(b.fulfilled,b.rejected):i.push(b.fulfilled,b.rejected)});const l=[];this.interceptors.response.forEach(function(b){l.push(b.fulfilled,b.rejected)});let d,u=0,f;if(!m){const g=[vn.bind(this),void 0];for(g.unshift(...i),g.push(...l),f=g.length,d=Promise.resolve(n);u<f;)d=d.then(g[u++],g[u++]);return d}f=i.length;let v=n;for(;u<f;){const g=i[u++],b=i[u++];try{v=g(v)}catch(h){b.call(this,h);break}}try{d=vn.call(this,v)}catch(g){return Promise.reject(g)}for(u=0,f=l.length;u<f;)d=d.then(l[u++],l[u++]);return d}getUri(t){t=ue(this.defaults,t);const n=ba(t.baseURL,t.url,t.allowAbsoluteUrls);return ma(n,t.params,t.paramsSerializer)}};c.forEach(["delete","get","head","options"],function(t){ce.prototype[t]=function(n,a){return this.request(ue(a||{},{method:t,url:n,data:(a||{}).data}))}});c.forEach(["post","put","patch"],function(t){function n(a){return function(o,s,i){return this.request(ue(i||{},{method:t,headers:a?{"Content-Type":"multipart/form-data"}:{},url:o,data:s}))}}ce.prototype[t]=n(),ce.prototype[t+"Form"]=n(!0)});let bo=class Ea{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(o){n=o});const a=this;this.promise.then(r=>{if(!a._listeners)return;let o=a._listeners.length;for(;o-- >0;)a._listeners[o](r);a._listeners=null}),this.promise.then=r=>{let o;const s=new Promise(i=>{a.subscribe(i),o=i}).then(r);return s.cancel=function(){a.unsubscribe(o)},s},t(function(o,s,i){a.reason||(a.reason=new Fe(o,s,i),n(a.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}toAbortSignal(){const t=new AbortController,n=a=>{t.abort(a)};return this.subscribe(n),t.signal.unsubscribe=()=>this.unsubscribe(n),t.signal}static source(){let t;return{token:new Ea(function(r){t=r}),cancel:t}}};function ho(e){return function(n){return e.apply(null,n)}}function ko(e){return c.isObject(e)&&e.isAxiosError===!0}const Pt={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(Pt).forEach(([e,t])=>{Pt[t]=e});function wa(e){const t=new ce(e),n=ta(ce.prototype.request,t);return c.extend(n,ce.prototype,t,{allOwnKeys:!0}),c.extend(n,t,null,{allOwnKeys:!0}),n.create=function(r){return wa(ue(e,r))},n}const U=wa(He);U.Axios=ce;U.CanceledError=Fe;U.CancelToken=bo;U.isCancel=ga;U.VERSION=va;U.toFormData=kt;U.AxiosError=I;U.Cancel=U.CanceledError;U.all=function(t){return Promise.all(t)};U.spread=ho;U.isAxiosError=ko;U.mergeConfig=ue;U.AxiosHeaders=z;U.formToJSON=e=>pa(c.isHTMLForm(e)?new FormData(e):e);U.getAdapter=ya.getAdapter;U.HttpStatusCode=Pt;U.default=U;const{Axios:Pi,AxiosError:Di,CanceledError:Oi,isCancel:qi,CancelToken:ji,VERSION:Ni,all:Ui,Cancel:Hi,isAxiosError:Fi,spread:Vi,toFormData:Gi,AxiosHeaders:Ji,HttpStatusCode:Ki,formToJSON:Wi,getAdapter:zi,mergeConfig:Xi}=U;window.axios=U;window.axios.defaults.headers.common["X-Requested-With"]="XMLHttpRequest";const Gt="transit_user",oe="transit_token",Dt="transit_pending_toast";function $e(){try{return typeof window<"u"&&typeof window.localStorage<"u"}catch{return!1}}function Ba(){try{return typeof window<"u"&&typeof window.sessionStorage<"u"}catch{return!1}}function yo(){if(window.transitAuthUser)return window.transitAuthUser;if(!$e())return null;const e=window.localStorage.getItem(Gt);if(!e)return null;try{return JSON.parse(e)}catch{return Pe(),null}}function Ia(e){if(!$e()){window.transitAuthUser=e;return}window.transitAuthUser=e,window.localStorage.setItem(Gt,JSON.stringify(e))}function vo(){if(!$e()){window.transitAuthUser=null;return}window.transitAuthUser=null,window.localStorage.removeItem(Gt)}function Jt(){return typeof window<"u"&&typeof window.transitAuthToken=="string"&&window.transitAuthToken!==""?window.transitAuthToken:$e()?window.localStorage.getItem(oe):null}function Eo(e){const t=typeof e=="string"?e:"";if(!$e()){window.transitAuthToken=t||null;return}if(window.transitAuthToken=t||null,t===""){window.localStorage.removeItem(oe),document.cookie=oe+"=; path=/; max-age=0; samesite=lax";return}window.localStorage.setItem(oe,t),document.cookie=oe+"="+t+"; path=/; max-age=86400; samesite=lax"}function wo(){if(!$e()){window.transitAuthToken=null,document.cookie=oe+"=; path=/; max-age=0; samesite=lax";return}window.transitAuthToken=null,window.localStorage.removeItem(oe),document.cookie=oe+"=; path=/; max-age=0; samesite=lax"}function Bo(e){Ba()&&window.sessionStorage.setItem(Dt,JSON.stringify(e))}function Io(){if(!Ba())return null;const e=window.sessionStorage.getItem(Dt);if(!e)return null;window.sessionStorage.removeItem(Dt);try{return JSON.parse(e)}catch{return null}}function Pe(){vo(),wo()}function Sa(e,t){if(!e)return t;if(typeof e.detail=="string"&&e.detail!=="")return e.detail;if(typeof e.message=="string"&&e.message!=="")return e.message;if(e.errors&&typeof e.errors=="object"){const n=Object.values(e.errors).flat()[0];if(typeof n=="string"&&n!=="")return n}return t}function wn(){return document.body.dataset.apiBase||"/api"}function $a(e=""){const t=String(e).replace(/^\/+/,"");return t===""?wn():`${wn()}/${t}`}async function E(e,t={}){const{method:n="GET",body:a=null,headers:r={},auth:o=!0}=t,s=new Headers(r);s.set("Accept","application/json"),s.set("X-Requested-With","XMLHttpRequest");let i=a;if(a&&!(a instanceof FormData)&&!(a instanceof Blob)&&(s.set("Content-Type","application/json"),i=JSON.stringify(a)),o){const u=Jt();u&&s.set("Authorization",`Bearer ${u}`)}if(!["GET","HEAD","OPTIONS"].includes(n.toUpperCase())){const u=document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");u&&s.set("X-CSRF-TOKEN",u)}const m=await fetch($a(e),{method:n,headers:s,body:i,credentials:"same-origin"});let l=null;const d=m.headers.get("content-type")||"";if(m.status!==204&&(l=d.includes("application/json")?await m.json():await m.text()),!m.ok){m.status===401&&(Pe(),(document.body.dataset.routeGuard||"none")==="protected"&&window.location.replace(document.body.dataset.loginUrl||"/login"));const u=Sa(l,`Request gagal (${m.status})`),f=new Error(u);throw f.status=m.status,f.data=l,f}return l}async function Kt(e,t="export.csv"){const n=new Headers({Accept:"text/csv,application/octet-stream","X-Requested-With":"XMLHttpRequest"}),a=Jt();a&&n.set("Authorization",`Bearer ${a}`);const r=await fetch($a(e),{method:"GET",headers:n,credentials:"same-origin"});if(!r.ok){let u=null;throw(r.headers.get("content-type")||"").includes("application/json")&&(u=await r.json()),new Error(Sa(u,"Gagal mengunduh file"))}const o=await r.blob(),m=(r.headers.get("content-disposition")||"").match(/filename="?([^"]+)"?/i)?.[1]||t,l=window.URL.createObjectURL(o),d=document.createElement("a");d.href=l,d.download=m,document.body.appendChild(d),d.click(),d.remove(),window.URL.revokeObjectURL(l)}function Te(e,t){const n=document.getElementById(e);n&&(n.textContent=t)}function So(e){const t=e?.role||"";document.querySelectorAll("[data-role-scope]").forEach(n=>{const a=n.dataset.roleScope,r=a==="admin"?["Super Admin","Admin"].includes(t):a==="super"?t==="Super Admin":!0;n.hidden=!r})}function Ca(){return yo()}function tt(e){if(So(e),!e)return;const t=e.nama||"Admin",n=t.trim().split(/\s+/)[0]||"Admin",a=e.email||"admin@pekanbaru.com";Te("sidebar-user-name",t),Te("sidebar-user-email",a),Te("header-user-name",n),Te("dropdown-user-name",t),Te("dropdown-user-email",a)}function xa(e){return typeof e.access_token=="string"&&e.access_token!==""&&Eo(e.access_token),Ia(e.user),tt(e.user),e}async function $o(e){const t=await E("/auth/login",{method:"POST",body:e,auth:!1});return xa(t)}async function Co(e){const t=await E("/auth/register",{method:"POST",body:e,auth:!1});return xa(t)}async function Bn(){const e=await E("/auth/me");return Ia(e),tt(e),e}async function xo(){try{await E("/auth/logout",{method:"POST"})}catch(e){if(e?.status!==401)throw e}Pe(),Bo({type:"success",title:"Logout berhasil",message:"Sampai jumpa kembali!"}),window.location.replace(document.body.dataset.loginUrl||"/login")}function In(e){window.location.replace(e)}async function _o(){const e=document.body.dataset.routeGuard||"none",t=document.body.dataset.loginUrl||"/login",n=document.body.dataset.dashboardUrl||"/dashboard",a=Ca();if(e==="public"){try{const r=await Bn();return In(n),{user:r}}catch{(a||Jt())&&Pe()}return{user:null}}if(e==="protected")try{return{user:await Bn()}}catch{return Pe(),In(t),{user:null}}return{user:a}}function Wt(){return Array.from(document.querySelectorAll(".modal-shell")).filter(e=>!e.hidden)}function _a(){document.body.style.overflow=Wt().length>0?"hidden":""}function j(e){const t=document.getElementById(e);t&&(t.hidden=!1,_a())}function K(e=null){if(e){const t=document.getElementById(e);t&&(t.hidden=!0)}else Wt().forEach(t=>{t.hidden=!0});_a()}function To(){document.addEventListener("click",e=>{const t=e.target.closest("[data-modal-open]");if(t){j(t.dataset.modalOpen);return}const n=e.target.closest("[data-modal-close]");if(n){const a=n.dataset.modalClose||n.closest(".modal-shell")?.id;K(a||void 0)}}),document.addEventListener("keydown",e=>{if(e.key!=="Escape")return;const t=Wt().pop();t&&K(t.id)})}function zt(e,t,n){const a=document.getElementById("transit-toast-root");if(!a)return;const r=document.createElement("div");r.className=`transit-toast ${n==="error"?"is-error":""} ${n==="info"?"is-info":""}`.trim(),r.innerHTML=`
        <div>
            <strong>${e}</strong>
            <p>${t}</p>
        </div>
    `,a.appendChild(r),window.requestAnimationFrame(()=>{r.classList.add("is-visible")}),window.setTimeout(()=>{r.classList.remove("is-visible"),window.setTimeout(()=>r.remove(),180)},3600)}function O(e,t="Berhasil"){zt(t,e,"success")}function y(e,t="Gagal"){zt(t,e,"error")}function Lo(e,t="Info"){zt(t,e,"info")}function Le(e){const t=document.querySelector("[data-sidebar]"),n=document.querySelector("[data-sidebar-overlay]");!t||!n||(t.classList.toggle("is-open",e),n.hidden=!e)}function Ye(e=null){document.querySelectorAll("[data-user-dropdown]").forEach(t=>{if(e&&t===e)return;t.classList.remove("is-open");const n=t.querySelector("[data-user-menu-trigger]"),a=t.querySelector("[data-user-menu-panel]");n&&n.setAttribute("aria-expanded","false"),a&&(a.hidden=!0)})}function Ao(e,t=null){if(!e)return;const n=e.querySelector("[data-user-menu-trigger]"),a=e.querySelector("[data-user-menu-panel]"),r=t??!e.classList.contains("is-open");Ye(r?e:null),e.classList.toggle("is-open",r),n&&n.setAttribute("aria-expanded",r?"true":"false"),a&&(a.hidden=!r)}function Ro(){document.querySelector("[data-sidebar-open]")?.addEventListener("click",()=>{Le(!0)}),document.querySelector("[data-sidebar-close]")?.addEventListener("click",()=>{Le(!1)}),document.querySelector("[data-sidebar-overlay]")?.addEventListener("click",()=>{Le(!1)}),document.querySelectorAll("[data-user-dropdown]").forEach(e=>{e.querySelector("[data-user-menu-trigger]")?.addEventListener("click",t=>{t.stopPropagation(),Ao(e)})}),document.addEventListener("click",e=>{e.target.closest("[data-user-dropdown]")||Ye()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&(Ye(),Le(!1))}),window.addEventListener("resize",()=>{window.innerWidth>1100&&Le(!1)}),document.querySelectorAll("[data-auth-logout]").forEach(e=>{e.addEventListener("click",async()=>{K(),Ye();try{e.disabled=!0,await xo()}catch(t){e.disabled=!1,y(t.message||"Gagal logout")}})})}const Ta={login:{title:"Selamat Datang!",description:"Masuk ke akun Anda untuk melanjutkan",submit:"Masuk",switchText:"Belum punya akun?",switchAction:"Daftar sekarang"},register:{title:"Buat Akun Baru",description:"Daftar untuk mulai menggunakan sistem",submit:"Daftar",switchText:"Sudah punya akun?",switchAction:"Masuk"}};function Sn(e,t){const n=Ta[e];t.form.dataset.authMode=e,t.title.textContent=n.title,t.description.textContent=n.description,t.submitText.textContent=n.submit,t.switchText&&(t.switchText.textContent=n.switchText),t.switchButton&&(t.switchButton.textContent=n.switchAction),t.nameField.hidden=e!=="register",t.nameInput.required=e==="register"}function Mo(){const e=document.getElementById("auth-form");if(!e)return;const t={form:e,title:document.querySelector("[data-auth-title]"),description:document.querySelector("[data-auth-description]"),submitText:document.querySelector("[data-auth-submit-text]"),switchText:document.querySelector("[data-auth-switch-text]"),switchButton:document.querySelector("[data-toggle-auth-mode]"),nameField:document.getElementById("auth-name-field"),nameInput:document.getElementById("nama"),emailInput:document.getElementById("email"),passwordInput:document.getElementById("password"),passwordToggle:document.querySelector("[data-toggle-password]"),submitButton:document.getElementById("auth-submit-button")},n=document.body.dataset.dashboardUrl||"/dashboard";Sn("login",t),t.switchButton?.addEventListener("click",()=>{const a=t.form.dataset.authMode==="login"?"register":"login";Sn(a,t)}),t.passwordToggle?.addEventListener("click",()=>{const a=t.passwordInput.type==="password"?"text":"password";t.passwordInput.type=a,t.passwordToggle.textContent=a==="password"?"Lihat":"Sembunyikan"}),e.addEventListener("submit",async a=>{a.preventDefault();const r=new FormData(e),o=e.dataset.authMode||"login",s={email:String(r.get("email")||"").trim(),password:String(r.get("password")||"").trim()};o==="register"&&(s.nama=String(r.get("nama")||"").trim()),t.submitButton.disabled=!0,t.submitText.textContent=o==="login"?"Memproses...":"Mendaftarkan...";try{o==="login"?(await $o(s),O("Selamat datang kembali","Login berhasil!")):(await Co(s),O("Akun Anda telah dibuat","Registrasi berhasil!")),window.location.replace(n)}catch(i){y(i.message||"Terjadi kesalahan",o==="login"?"Login gagal":"Registrasi gagal")}finally{t.submitButton.disabled=!1,t.submitText.textContent=Ta[o].submit}})}const Po=new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}),Do=new Intl.NumberFormat("id-ID");function D(e){return Po.format(Number(e)||0)}function A(e){return Do.format(Number(e)||0)}function p(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ce(e,t=300){let n=null;return(...a)=>{window.clearTimeout(n),n=window.setTimeout(()=>e(...a),t)}}function xe(e,t,n,a){if(n===0||a===0)return"Menampilkan 0 - 0 dari 0 data";const r=(e-1)*t+1,o=r+a-1;return`Menampilkan ${r} - ${o} dari ${n} data`}function Oo(e){if(!e)return"-";const t=new Date(e);return Number.isNaN(t.getTime())?e:new Intl.DateTimeFormat("id-ID",{day:"2-digit",month:"short",year:"numeric"}).format(t)}function Ve(){return new Date().toISOString().slice(0,10)}function de(e,t,n="Memproses..."){e&&(e.dataset.defaultText||(e.dataset.defaultText=e.textContent.trim()),e.disabled=t,e.textContent=t?n:e.dataset.defaultText)}const nt=["#059669","#10B981","#34D399","#6EE7B7","#A7F3D0"],ne={revenueChart:null,passengerChart:null,mobilChart:null};function qo(){const e=document.getElementById("dashboard-initial-state");if(!e)return{stats:{},revenueData:[],mobilRevenue:[]};try{return JSON.parse(e.textContent||"{}")}catch{return{stats:{},revenueData:[],mobilRevenue:[]}}}function Xt(e){e&&typeof e.destroy=="function"&&e.destroy()}function jo(e,t){const n=document.querySelector(`[data-stat="${e}"]`);if(!n)return;const a=["total_uang_bersih","total_uang_pc"];n.textContent=a.includes(e)?D(t):A(t)}function La(e,t,n){const a=document.getElementById(e),r=document.getElementById(t);a&&(a.hidden=!n),r&&(r.hidden=n)}function No(){return"#065f46"}function Ot(){return"#d1fae5"}function Zt(){return{backgroundColor:"#ffffff",titleColor:"#064e3b",bodyColor:"#065f46",borderColor:"#d1fae5",borderWidth:1,padding:12,cornerRadius:12,displayColors:!0}}function Uo(e){const t=document.getElementById("dashboard-revenue-chart"),n=Array.isArray(e)&&e.length>0;if(La("dashboard-revenue-chart","dashboard-revenue-empty",n),Xt(ne.revenueChart),!t||!window.Chart||!n){ne.revenueChart=null;return}ne.revenueChart=new window.Chart(t,{type:"line",data:{labels:e.map(a=>a.bulan),datasets:[{label:"Pendapatan Bersih",data:e.map(a=>a.uang_bersih),borderColor:"#059669",backgroundColor:"rgba(5, 150, 105, 0.08)",fill:!1,tension:.35,pointRadius:4,pointHoverRadius:5,pointBackgroundColor:"#059669",pointBorderColor:"#ffffff",pointBorderWidth:2,borderWidth:3},{label:"Uang PC",data:e.map(a=>a.uang_pc),borderColor:"#f59e0b",backgroundColor:"rgba(245, 158, 11, 0.1)",fill:!1,tension:.35,pointRadius:4,pointHoverRadius:5,pointBackgroundColor:"#f59e0b",pointBorderColor:"#ffffff",pointBorderWidth:2,borderWidth:3}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{labels:{color:No(),usePointStyle:!0,pointStyle:"circle",boxWidth:8,boxHeight:8,padding:18}},tooltip:{...Zt(),callbacks:{label(a){return`${a.dataset.label}: ${D(a.parsed.y)}`}}}},scales:{x:{ticks:{color:"#047857",font:{size:12}},grid:{color:Ot()},border:{display:!1}},y:{ticks:{color:"#047857",font:{size:12},callback(a){return`${Math.round(Number(a)/1e6)}jt`}},grid:{color:Ot()},border:{display:!1}}}}})}function Ho(e){const t=document.getElementById("dashboard-passenger-chart"),n=Array.isArray(e)&&e.length>0;if(La("dashboard-passenger-chart","dashboard-passenger-empty",n),Xt(ne.passengerChart),!t||!window.Chart||!n){ne.passengerChart=null;return}ne.passengerChart=new window.Chart(t,{type:"bar",data:{labels:e.map(a=>a.bulan),datasets:[{label:"Penumpang",data:e.map(a=>a.penumpang),backgroundColor:"#10B981",borderRadius:8,maxBarThickness:44}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{...Zt(),callbacks:{label(a){return`Penumpang: ${A(a.parsed.y)}`}}}},scales:{x:{ticks:{color:"#047857",font:{size:12}},grid:{color:"rgba(0, 0, 0, 0)"},border:{display:!1}},y:{ticks:{color:"#047857",font:{size:12}},grid:{color:Ot()},border:{display:!1}}}}})}function Fo(e){const t=document.getElementById("dashboard-mobil-list");t&&(t.innerHTML=e.map((n,a)=>`
        <div class="dashboard-mobil-item">
            <div class="dashboard-mobil-meta">
                <span class="dashboard-mobil-dot" style="background-color: ${nt[a%nt.length]}"></span>
                <div>
                    <p class="dashboard-mobil-code">${p(n.kode_mobil)}</p>
                    <p class="dashboard-mobil-trips">${A(n.total_trips)} trip</p>
                    <p class="dashboard-mobil-passengers">${A(n.total_penumpang)} penumpang</p>
                </div>
            </div>
            <p class="dashboard-mobil-value">${D(n.total_uang_bersih)}</p>
        </div>
    `).join(""))}function Vo(e){const t=document.getElementById("dashboard-mobil-chart"),n=document.getElementById("dashboard-mobil-content"),a=document.getElementById("dashboard-mobil-empty"),r=document.getElementById("dashboard-mobil-chart-empty"),o=document.getElementById("dashboard-mobil-list"),s=Array.isArray(e)&&e.length>0,i=s&&e.some(m=>Number(m.total_uang_bersih)>0);if(Xt(ne.mobilChart),n&&(n.hidden=!s),a&&(a.hidden=s),t&&(t.hidden=!i),r&&(r.hidden=i),s?Fo(e):o&&(o.innerHTML=""),!t||!window.Chart||!i){ne.mobilChart=null;return}ne.mobilChart=new window.Chart(t,{type:"doughnut",data:{labels:e.map(m=>m.kode_mobil),datasets:[{data:e.map(m=>m.total_uang_bersih),backgroundColor:e.map((m,l)=>nt[l%nt.length]),borderColor:"#ffffff",borderWidth:6,hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"58%",plugins:{legend:{display:!1},tooltip:{...Zt(),callbacks:{label(m){const l=e[m.dataIndex]||{};return`${m.label}: ${D(m.parsed)} / ${A(l.total_penumpang||0)} penumpang`}}}}}})}function $n(e){Object.entries(e.stats||{}).forEach(([t,n])=>jo(t,n)),Uo(e.revenueData||[]),Ho(e.revenueData||[]),Vo(e.mobilRevenue||[])}async function Go(){const[e,t,n]=await Promise.all([E("/statistics/dashboard"),E("/statistics/revenue-chart"),E("/statistics/mobil-revenue")]);return{stats:e,revenueData:t,mobilRevenue:n}}function Cn(e){const t=document.querySelector("[data-dashboard-loading]"),n=document.querySelector("[data-dashboard-content]"),a=document.getElementById("dashboard-refresh-btn");t&&(t.hidden=!e),n&&(n.hidden=e),a&&(a.disabled=e)}async function Jo(){const e=document.getElementById("dashboard-refresh-btn");e&&($n(qo()),e.addEventListener("click",async()=>{Cn(!0);try{$n(await Go())}catch{y("Silakan coba lagi","Gagal memuat data")}finally{Cn(!1)}}))}const x={data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1},we=10;function Ko(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function Wo(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 21C15 17.4 18 14.4 18 10.5C18 7.18629 15.3137 4.5 12 4.5C8.68629 4.5 6 7.18629 6 10.5C6 14.4 9 17.4 12 21Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
            <circle cx="12" cy="10.5" r="2.25" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function zo(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Xo(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function at(e){const t=document.getElementById("driver-submit-btn");x.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":x.editItem?"Perbarui":"Simpan")}function Zo(){const e=document.getElementById("drivers-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="drivers-table-state">
                <div class="drivers-loading-inline">
                    <span class="drivers-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function Qo(){const e=document.getElementById("drivers-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="drivers-table-state drivers-empty-copy">
                Belum ada data driver
            </td>
        </tr>
    `)}function xn(){const e=document.getElementById("drivers-table-body");if(e){if(x.loading){Zo();return}if(x.data.length===0){Qo();return}e.innerHTML=x.data.map((t,n)=>`
        <tr class="drivers-row" data-testid="driver-row-${t.id}">
            <td class="drivers-index-cell">${(x.page-1)*we+n+1}</td>
            <td>
                <div class="drivers-user-cell">
                    <span class="drivers-user-avatar" aria-hidden="true">
                        ${Ko()}
                    </span>
                    <span class="drivers-user-name">${p(t.nama)}</span>
                </div>
            </td>
            <td>
                <div class="drivers-location-cell">
                    <span class="drivers-location-icon" aria-hidden="true">${Wo()}</span>
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
                        ${zo()}
                    </button>
                    <button
                        class="drivers-icon-button drivers-icon-button-danger"
                        type="button"
                        data-driver-delete="${t.id}"
                        data-driver-name="${p(t.nama)}"
                        data-testid="delete-driver-${t.id}"
                        aria-label="Hapus driver ${p(t.nama)}"
                    >
                        ${Xo()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function _n(){const e=document.getElementById("drivers-pagination-shell"),t=document.getElementById("drivers-pagination-info"),n=document.getElementById("drivers-pagination-page"),a=document.getElementById("drivers-prev-page-btn"),r=document.getElementById("drivers-next-page-btn"),o=Math.max(1,Math.ceil(x.totalCount/we));e&&(e.hidden=o<=1),t&&(t.textContent=xe(x.page,we,x.totalCount,x.data.length)),n&&(n.textContent=`${x.page} / ${o}`),a&&(a.disabled=x.page===1),r&&(r.disabled=x.page>=o)}async function ge(){x.loading=!0,xn(),_n();try{const[e,t]=await Promise.all([E(`/drivers?page=${x.page}&limit=${we}${x.search?`&search=${encodeURIComponent(x.search)}`:""}`),E(`/drivers/count${x.search?`?search=${encodeURIComponent(x.search)}`:""}`)]);x.data=Array.isArray(e)?e:[],x.totalCount=Number(t.count||0)}finally{x.loading=!1,xn(),_n()}}function Tn(){const e=document.getElementById("driver-form"),t=document.getElementById("driver-form-title"),n=document.getElementById("driver-form-description"),a=document.getElementById("driver-id"),r=document.getElementById("driver-nama"),o=document.getElementById("driver-lokasi");e?.reset(),a&&(a.value=""),r&&(r.value=""),o&&(o.value=""),t&&(t.textContent="Tambah Driver Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan data driver"),x.editItem=null,at(!1)}function Yo(e){const t=document.getElementById("driver-form-title"),n=document.getElementById("driver-form-description"),a=document.getElementById("driver-id"),r=document.getElementById("driver-nama"),o=document.getElementById("driver-lokasi");x.editItem=e,a&&(a.value=e.id),r&&(r.value=e.nama),o&&(o.value=e.lokasi),t&&(t.textContent="Edit Data Driver"),n&&(n.textContent="Isi form di bawah untuk memperbarui data driver"),at(!1)}async function es(e){const t=await E(`/drivers/${e}`);Yo(t),j("driver-form-modal")}function ts(e){const t=document.getElementById("driver-delete-copy");x.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus driver <strong>${p(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`),j("driver-delete-modal")}function ns(){const e=document.getElementById("drivers-add-btn"),t=document.getElementById("drivers-export-btn"),n=document.getElementById("drivers-search-input"),a=document.getElementById("driver-form"),r=document.getElementById("drivers-table-body"),o=document.getElementById("driver-delete-confirm-btn"),s=document.getElementById("drivers-prev-page-btn"),i=document.getElementById("drivers-next-page-btn");if(!(!e||!a||!r))return e.addEventListener("click",()=>{Tn(),j("driver-form-modal")}),t?.addEventListener("click",()=>{Kt("/export/drivers/csv","drivers.csv").catch(()=>{y("Gagal mengunduh file")})}),n?.addEventListener("input",Ce(async m=>{x.search=m.target.value.trim(),x.page=1;try{await ge()}catch{y("Gagal memuat data")}})),a.addEventListener("submit",async m=>{m.preventDefault();const l={nama:document.getElementById("driver-nama")?.value.trim()||"",lokasi:document.getElementById("driver-lokasi")?.value.trim()||""};at(!0);try{x.editItem?(await E(`/drivers/${x.editItem.id}`,{method:"PUT",body:l}),O("Data driver berhasil diperbarui")):(await E("/drivers",{method:"POST",body:l}),O("Driver berhasil ditambahkan")),K("driver-form-modal"),Tn(),await ge()}catch(d){y(d.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{at(!1)}}),r.addEventListener("click",async m=>{const l=m.target.closest("[data-driver-edit]"),d=m.target.closest("[data-driver-delete]");try{if(l){await es(l.dataset.driverEdit);return}d&&ts({id:d.dataset.driverDelete,nama:d.dataset.driverName})}catch{y("Gagal memuat data")}}),o?.addEventListener("click",async()=>{if(x.deleteItem)try{await E(`/drivers/${x.deleteItem.id}`,{method:"DELETE"}),O("Driver berhasil dihapus"),K("driver-delete-modal"),(x.page-1)*we>=x.totalCount-1&&x.page>1&&(x.page-=1),x.deleteItem=null,await ge()}catch{y("Gagal menghapus data")}}),s?.addEventListener("click",async()=>{if(!(x.page<=1)){x.page-=1;try{await ge()}catch{y("Gagal memuat data")}}}),i?.addEventListener("click",async()=>{const m=Math.max(1,Math.ceil(x.totalCount/we));if(!(x.page>=m)){x.page+=1;try{await ge()}catch{y("Gagal memuat data")}}}),ge().catch(()=>{y("Gagal memuat data")})}const w={data:[],loading:!0,totalCount:0,page:1,search:"",filterJenis:"",editItem:null,deleteItem:null,isSubmitting:!1},Be=10;function as(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M5 14L6.6 9.2C6.8728 8.3816 7.6387 7.83 8.5014 7.83H15.4986C16.3613 7.83 17.1272 8.3816 17.4 9.2L19 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M4 14H20V17C20 18.1046 19.1046 19 18 19H6C4.89543 19 4 18.1046 4 17V14Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M7 16H7.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path>
            <path d="M17 16H17.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path>
        </svg>
    `}function rs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function os(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function ss(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 13L11 22L2 13V4H11L20 13Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <circle cx="7.5" cy="8.5" r="1.5" fill="currentColor"></circle>
        </svg>
    `}function rt(e){const t=document.getElementById("mobil-submit-btn");w.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":w.editItem?"Perbarui":"Simpan")}function is(e){return e==="Hiace"?"mobil-jenis-badge mobil-jenis-badge-hiace":"mobil-jenis-badge mobil-jenis-badge-reborn"}function ls(){const e=document.getElementById("mobil-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="mobil-table-state">
                <div class="mobil-loading-inline">
                    <span class="mobil-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function ds(){const e=document.getElementById("mobil-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="mobil-table-state mobil-empty-copy">
                Belum ada data mobil
            </td>
        </tr>
    `)}function Ln(){const e=document.getElementById("mobil-table-body");if(e){if(w.loading){ls();return}if(w.data.length===0){ds();return}e.innerHTML=w.data.map((t,n)=>`
        <tr class="mobil-row" data-testid="mobil-row-${t.id}">
            <td class="mobil-index-cell">${(w.page-1)*Be+n+1}</td>
            <td>
                <div class="mobil-code-cell">
                    <span class="mobil-code-avatar" aria-hidden="true">
                        ${as()}
                    </span>
                    <span class="mobil-code-text">${p(t.kode_mobil)}</span>
                </div>
            </td>
            <td>
                <span class="${is(t.jenis_mobil)}">
                    <span class="mobil-jenis-icon" aria-hidden="true">${ss()}</span>
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
                        ${rs()}
                    </button>
                    <button
                        class="mobil-icon-button mobil-icon-button-danger"
                        type="button"
                        data-mobil-delete="${t.id}"
                        data-mobil-name="${p(t.kode_mobil)}"
                        data-testid="delete-mobil-${t.id}"
                        aria-label="Hapus mobil ${p(t.kode_mobil)}"
                    >
                        ${os()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function An(){const e=document.getElementById("mobil-pagination-shell"),t=document.getElementById("mobil-pagination-info"),n=document.getElementById("mobil-pagination-page"),a=document.getElementById("mobil-prev-page-btn"),r=document.getElementById("mobil-next-page-btn"),o=Math.max(1,Math.ceil(w.totalCount/Be));e&&(e.hidden=o<=1),t&&(t.textContent=xe(w.page,Be,w.totalCount,w.data.length)),n&&(n.textContent=`${w.page} / ${o}`),a&&(a.disabled=w.page===1),r&&(r.disabled=w.page>=o)}async function ie(){w.loading=!0,Ln(),An();try{const[e,t]=await Promise.all([E(`/mobil?page=${w.page}&limit=${Be}${w.search?`&search=${encodeURIComponent(w.search)}`:""}${w.filterJenis?`&jenis=${encodeURIComponent(w.filterJenis)}`:""}`),E(`/mobil/count${w.search||w.filterJenis?"?":""}${[w.search?`search=${encodeURIComponent(w.search)}`:"",w.filterJenis?`jenis=${encodeURIComponent(w.filterJenis)}`:""].filter(Boolean).join("&")}`)]);w.data=Array.isArray(e)?e:[],w.totalCount=Number(t.count||0)}finally{w.loading=!1,Ln(),An()}}function Rn(){const e=document.getElementById("mobil-form"),t=document.getElementById("mobil-form-title"),n=document.getElementById("mobil-form-description"),a=document.getElementById("mobil-id"),r=document.getElementById("mobil-kode"),o=document.getElementById("mobil-jenis");e?.reset(),a&&(a.value=""),r&&(r.value=""),o&&(o.value="Hiace"),t&&(t.textContent="Tambah Mobil Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan data mobil"),w.editItem=null,rt(!1)}function cs(e){const t=document.getElementById("mobil-form-title"),n=document.getElementById("mobil-form-description"),a=document.getElementById("mobil-id"),r=document.getElementById("mobil-kode"),o=document.getElementById("mobil-jenis");w.editItem=e,a&&(a.value=e.id),r&&(r.value=e.kode_mobil),o&&(o.value=e.jenis_mobil),t&&(t.textContent="Edit Data Mobil"),n&&(n.textContent="Isi form di bawah untuk memperbarui data mobil"),rt(!1)}async function us(e){const t=await E(`/mobil/${e}`);cs(t),j("mobil-form-modal")}function ms(e){const t=document.getElementById("mobil-delete-copy");w.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus mobil <strong>${p(e.kode_mobil)}</strong>? Tindakan ini tidak dapat dibatalkan.`),j("mobil-delete-modal")}function ps(){const e=document.getElementById("mobil-add-btn"),t=document.getElementById("mobil-export-btn"),n=document.getElementById("mobil-search-input"),a=document.getElementById("mobil-filter-jenis"),r=document.getElementById("mobil-form"),o=document.getElementById("mobil-table-body"),s=document.getElementById("mobil-delete-confirm-btn"),i=document.getElementById("mobil-prev-page-btn"),m=document.getElementById("mobil-next-page-btn"),l=document.getElementById("mobil-kode");if(!(!e||!r||!o))return e.addEventListener("click",()=>{Rn(),j("mobil-form-modal")}),t?.addEventListener("click",()=>{Kt("/export/mobil/csv","mobil.csv").catch(()=>{y("Gagal mengunduh file")})}),n?.addEventListener("input",Ce(async d=>{w.search=d.target.value.trim(),w.page=1;try{await ie()}catch{y("Gagal memuat data")}})),a?.addEventListener("change",async d=>{w.filterJenis=d.target.value,w.page=1;try{await ie()}catch{y("Gagal memuat data")}}),l?.addEventListener("input",d=>{d.target.value=d.target.value.toUpperCase()}),r.addEventListener("submit",async d=>{d.preventDefault();const u={kode_mobil:document.getElementById("mobil-kode")?.value.trim().toUpperCase()||"",jenis_mobil:document.getElementById("mobil-jenis")?.value||"Hiace"};rt(!0);try{w.editItem?(await E(`/mobil/${w.editItem.id}`,{method:"PUT",body:u}),O("Data mobil berhasil diperbarui")):(await E("/mobil",{method:"POST",body:u}),O("Mobil berhasil ditambahkan")),K("mobil-form-modal"),Rn(),await ie()}catch(f){y(f.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{rt(!1)}}),o.addEventListener("click",async d=>{const u=d.target.closest("[data-mobil-edit]"),f=d.target.closest("[data-mobil-delete]");try{if(u){await us(u.dataset.mobilEdit);return}f&&ms({id:f.dataset.mobilDelete,kode_mobil:f.dataset.mobilName})}catch{y("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(w.deleteItem)try{await E(`/mobil/${w.deleteItem.id}`,{method:"DELETE"}),O("Mobil berhasil dihapus"),K("mobil-delete-modal"),(w.page-1)*Be>=w.totalCount-1&&w.page>1&&(w.page-=1),w.deleteItem=null,await ie()}catch{y("Gagal menghapus data")}}),i?.addEventListener("click",async()=>{if(!(w.page<=1)){w.page-=1;try{await ie()}catch{y("Gagal memuat data")}}}),m?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil(w.totalCount/Be));if(!(w.page>=d)){w.page+=1;try{await ie()}catch{y("Gagal memuat data")}}}),ie().catch(()=>{y("Gagal memuat data")})}const B={data:[],drivers:[],mobilList:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1},De=10,Mn={"05:00":"Subuh (05.00 WIB)","08:00":"Pagi (08.00 WIB)","10:00":"Pagi (10.00 WIB)","14:00":"Siang (14.00 WIB)","16:00":"Sore (16.00 WIB)","19:00":"Malam (19.00 WIB)"},vt="08:00",gs=["Reguler","Dropping","Rental"],Qt="Reguler";function fs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function bs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Yt(e){return e==="Lunas"?"Lunas":"Belum Lunas"}function Pn(e){const t=Yt(e);return`<span class="keberangkatan-payment-badge ${t==="Lunas"?"is-paid":"is-unpaid"}">${p(t)}</span>`}function Dn(e){return Mn[e]||Mn[vt]}function ot(e){return gs.includes(e)?e:Qt}function hs(){const e=Number(document.getElementById("keberangkatan-tarif-penumpang")?.value||0),t=Number(document.getElementById("keberangkatan-uang-paket")?.value||0),n=Number(document.getElementById("keberangkatan-jumlah-snack")?.value||0),a=Number(document.getElementById("keberangkatan-pengembalian-snack")?.value||0),r=Number(document.getElementById("keberangkatan-jumlah-air-mineral")?.value||0),o=e,s=o+t,i=s*.15,m=s*.85;return{jumlah_uang_penumpang:o,uang_paket:t,total:s,uang_pc:i,uang_bersih:m,jumlah_snack:n,pengembalian_snack:a,jumlah_air_mineral:r}}function en(){const e=hs();Object.entries(e).forEach(([t,n])=>{const a=document.querySelector(`[data-calc="${t}"]`);if(a){if(t==="jumlah_snack"){a.textContent=`${A(n)} item`;return}if(t==="pengembalian_snack"){a.textContent=`${A(n)} item`;return}if(t==="jumlah_air_mineral"){a.textContent=`${A(n)} botol`;return}a.textContent=D(n)}})}function st(e,t,n,a,r=""){const o=document.getElementById(e);if(!o)return;const s=e==="keberangkatan-kode-mobil"?"Pilih mobil":"Pilih driver";o.innerHTML=`
        <option value="">${s}</option>
        ${t.map(i=>`
            <option value="${i[n]}" ${String(i[n])===String(r)?"selected":""}>
                ${p(a(i))}
            </option>
        `).join("")}
    `}function it(e){const t=document.getElementById("keberangkatan-submit-btn");B.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":B.editItem?"Perbarui":"Simpan")}function ks(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");e&&(e.innerHTML=`
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
        `))}function ys(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");e&&(e.innerHTML=`
        <tr>
            <td colspan="18" class="keberangkatan-table-state keberangkatan-empty-copy">
                Belum ada data keberangkatan
            </td>
        </tr>
    `,t&&(t.hidden=!1,t.innerHTML=`
            <div class="keberangkatan-mobile-state keberangkatan-empty-copy">
                Belum ada data keberangkatan
            </div>
        `))}function On(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");if(e){if(B.loading){ks();return}if(B.data.length===0){ys();return}e.innerHTML=B.data.map(n=>`
        <tr class="keberangkatan-row" data-testid="keberangkatan-row-${n.id}">
            <td class="keberangkatan-hari-cell">${p(n.hari)}</td>
            <td>${p(n.tanggal)}</td>
            <td>${p(n.jam_keberangkatan_label||Dn(n.jam_keberangkatan))}</td>
            <td>${p(ot(n.tipe_layanan))}</td>
            <td>
                <span class="keberangkatan-kode-badge">${p(n.kode_mobil)}</span>
            </td>
            <td>${p(n.driver_nama)}</td>
            <td class="text-right">${A(n.jumlah_penumpang)}</td>
            <td class="text-right keberangkatan-money-cell">${D(n.jumlah_uang_penumpang)}</td>
            <td class="text-right">${A(n.jumlah_paket)}</td>
            <td class="text-right keberangkatan-money-cell">${D(n.uang_paket)}</td>
            <td class="text-right"><span class="keberangkatan-stock-badge">${A(n.jumlah_snack)}</span></td>
            <td class="text-right"><span class="keberangkatan-stock-badge keberangkatan-stock-badge-blue">${A(n.pengembalian_snack)}</span></td>
            <td class="text-right"><span class="keberangkatan-stock-badge keberangkatan-stock-badge-blue">${A(n.jumlah_air_mineral)}</span></td>
            <td class="text-right keberangkatan-money-cell keberangkatan-money-cell-amber">${D(n.uang_pc)}</td>
            <td class="text-right keberangkatan-money-cell keberangkatan-money-cell-emerald">${D(n.uang_bersih)}</td>
            <td class="text-center">${Pn(n.status_pembayaran)}</td>
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
                        aria-label="Edit data keberangkatan ${p(n.kode_mobil)}"
                    >
                        ${fs()}
                    </button>
                    <button
                        class="keberangkatan-icon-button keberangkatan-icon-button-danger"
                        type="button"
                        data-keberangkatan-delete="${n.id}"
                        data-testid="delete-keberangkatan-${n.id}"
                        aria-label="Hapus data keberangkatan ${p(n.kode_mobil)}"
                    >
                        ${bs()}
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
                        <p>${p(n.jam_keberangkatan_label||Dn(n.jam_keberangkatan))}</p>
                    </div>
                    <div class="keberangkatan-mobile-head-side">
                        <span class="keberangkatan-kode-badge">${p(n.kode_mobil)}</span>
                        <span class="keberangkatan-trip-badge">#${A(n.trip_ke)}</span>
                    </div>
                </div>

                <div class="keberangkatan-mobile-driver">
                    <span>Driver</span>
                    <strong>${p(n.driver_nama)}</strong>
                </div>

                <div class="keberangkatan-mobile-grid">
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-status">
                        <span>Validasi</span>
                        ${Pn(n.status_pembayaran)}
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Layanan</span>
                        <strong>${p(ot(n.tipe_layanan))}</strong>
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
        `).join(""))}}function qn(){const e=document.getElementById("keberangkatan-pagination-shell"),t=document.getElementById("keberangkatan-pagination-info"),n=document.getElementById("keberangkatan-pagination-page"),a=document.getElementById("keberangkatan-prev-page-btn"),r=document.getElementById("keberangkatan-next-page-btn"),o=Math.max(1,Math.ceil(B.totalCount/De));e&&(e.hidden=o<=1),t&&(t.textContent=xe(B.page,De,B.totalCount,B.data.length)),n&&(n.textContent=`${B.page} / ${o}`),a&&(a.disabled=B.page===1),r&&(r.disabled=B.page>=o)}async function fe(){B.loading=!0,On(),qn();try{const[e,t,n,a]=await Promise.all([E(`/keberangkatan?page=${B.page}&limit=${De}${B.search?`&search=${encodeURIComponent(B.search)}`:""}`),E(`/keberangkatan/count${B.search?`?search=${encodeURIComponent(B.search)}`:""}`),E("/drivers/all"),E("/mobil/all")]);B.data=Array.isArray(e)?e:[],B.totalCount=Number(t.count||0),B.drivers=Array.isArray(n)?n:[],B.mobilList=Array.isArray(a)?a:[]}finally{B.loading=!1,On(),qn()}}function Aa(){document.getElementById("keberangkatan-form")?.scrollTo({top:0,behavior:"auto"})}function xt(){const e=document.getElementById("keberangkatan-form"),t=document.getElementById("keberangkatan-form-title"),n=document.getElementById("keberangkatan-form-description"),a=document.getElementById("keberangkatan-tanggal"),r=document.getElementById("keberangkatan-jam-keberangkatan"),o=document.getElementById("keberangkatan-trip-ke"),s=document.getElementById("keberangkatan-tipe-layanan"),i=document.getElementById("keberangkatan-jumlah-penumpang"),m=document.getElementById("keberangkatan-tarif-penumpang"),l=document.getElementById("keberangkatan-jumlah-paket"),d=document.getElementById("keberangkatan-uang-paket"),u=document.getElementById("keberangkatan-jumlah-snack"),f=document.getElementById("keberangkatan-pengembalian-snack"),v=document.getElementById("keberangkatan-jumlah-air-mineral"),g=document.getElementById("keberangkatan-status-pembayaran");e?.reset(),B.editItem=null,document.getElementById("keberangkatan-id").value="",t&&(t.textContent="Tambah Data Keberangkatan"),n&&(n.textContent="Isi form di bawah untuk menambahkan data keberangkatan"),a&&(a.value=Ve()),r&&(r.value=vt),st("keberangkatan-kode-mobil",B.mobilList,"kode_mobil",b=>`${b.kode_mobil} - ${b.jenis_mobil}`,B.mobilList[0]?.kode_mobil||""),st("keberangkatan-driver-id",B.drivers,"id",b=>`${b.nama} - ${b.lokasi}`,B.drivers[0]?.id||""),o&&(o.value="1"),s&&(s.value=Qt),i&&(i.value="0"),m&&(m.value="0"),l&&(l.value="0"),d&&(d.value="0"),u&&(u.value="0"),f&&(f.value="0"),v&&(v.value="0"),g&&(g.value="Belum Lunas"),it(!1),en(),Aa()}async function jn(e){const t=await E(`/keberangkatan/${e}`),n=document.getElementById("keberangkatan-form-title"),a=document.getElementById("keberangkatan-form-description");B.editItem=t,document.getElementById("keberangkatan-id").value=t.id,document.getElementById("keberangkatan-tanggal").value=t.tanggal,document.getElementById("keberangkatan-jam-keberangkatan").value=t.jam_keberangkatan||vt,document.getElementById("keberangkatan-trip-ke").value=t.trip_ke,document.getElementById("keberangkatan-tipe-layanan").value=ot(t.tipe_layanan),document.getElementById("keberangkatan-jumlah-penumpang").value=t.jumlah_penumpang,document.getElementById("keberangkatan-tarif-penumpang").value=t.tarif_penumpang,document.getElementById("keberangkatan-jumlah-paket").value=t.jumlah_paket,document.getElementById("keberangkatan-uang-paket").value=t.uang_paket,document.getElementById("keberangkatan-jumlah-snack").value=t.jumlah_snack,document.getElementById("keberangkatan-pengembalian-snack").value=t.pengembalian_snack,document.getElementById("keberangkatan-jumlah-air-mineral").value=t.jumlah_air_mineral,document.getElementById("keberangkatan-status-pembayaran").value=Yt(t.status_pembayaran),st("keberangkatan-kode-mobil",B.mobilList,"kode_mobil",r=>`${r.kode_mobil} - ${r.jenis_mobil}`,t.kode_mobil),st("keberangkatan-driver-id",B.drivers,"id",r=>`${r.nama} - ${r.lokasi}`,t.driver_id),n&&(n.textContent="Edit Data Keberangkatan"),a&&(a.textContent="Isi form di bawah untuk memperbarui data keberangkatan"),it(!1),en(),Aa(),j("keberangkatan-form-modal")}function Nn(e){B.deleteItem=e,j("keberangkatan-delete-modal")}function vs(){const e=document.getElementById("keberangkatan-add-btn"),t=document.getElementById("keberangkatan-export-btn"),n=document.getElementById("keberangkatan-search-input"),a=document.getElementById("keberangkatan-form"),r=document.getElementById("keberangkatan-table-body"),o=document.getElementById("keberangkatan-mobile-list"),s=document.getElementById("keberangkatan-delete-confirm-btn"),i=document.getElementById("keberangkatan-prev-page-btn"),m=document.getElementById("keberangkatan-next-page-btn");if(!(!e||!a||!r))return e.addEventListener("click",()=>{xt(),j("keberangkatan-form-modal")}),t?.addEventListener("click",()=>{Kt("/export/keberangkatan/csv","keberangkatan.csv").catch(()=>{y("Gagal mengunduh file")})}),n?.addEventListener("input",Ce(async l=>{B.search=l.target.value.trim(),B.page=1;try{await fe()}catch{y("Gagal memuat data")}})),a.addEventListener("input",l=>{["keberangkatan-jumlah-penumpang","keberangkatan-tarif-penumpang","keberangkatan-uang-paket","keberangkatan-jumlah-snack","keberangkatan-pengembalian-snack","keberangkatan-jumlah-air-mineral"].includes(l.target.id)&&en()}),a.addEventListener("submit",async l=>{l.preventDefault();const d={tanggal:document.getElementById("keberangkatan-tanggal")?.value||"",jam_keberangkatan:document.getElementById("keberangkatan-jam-keberangkatan")?.value||vt,tipe_layanan:ot(document.getElementById("keberangkatan-tipe-layanan")?.value||Qt),kode_mobil:document.getElementById("keberangkatan-kode-mobil")?.value||"",driver_id:document.getElementById("keberangkatan-driver-id")?.value||"",jumlah_penumpang:Number(document.getElementById("keberangkatan-jumlah-penumpang")?.value||0),tarif_penumpang:Number(document.getElementById("keberangkatan-tarif-penumpang")?.value||0),jumlah_paket:Number(document.getElementById("keberangkatan-jumlah-paket")?.value||0),uang_paket:Number(document.getElementById("keberangkatan-uang-paket")?.value||0),jumlah_snack:Number(document.getElementById("keberangkatan-jumlah-snack")?.value||0),pengembalian_snack:Number(document.getElementById("keberangkatan-pengembalian-snack")?.value||0),jumlah_air_mineral:Number(document.getElementById("keberangkatan-jumlah-air-mineral")?.value||0),trip_ke:Number(document.getElementById("keberangkatan-trip-ke")?.value||1),status_pembayaran:Yt(document.getElementById("keberangkatan-status-pembayaran")?.value||"")};it(!0);try{B.editItem?(await E(`/keberangkatan/${B.editItem.id}`,{method:"PUT",body:d}),O("Data berhasil diperbarui")):(await E("/keberangkatan",{method:"POST",body:d}),O("Data berhasil ditambahkan")),K("keberangkatan-form-modal"),xt(),await fe()}catch(u){y(u.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{it(!1)}}),r.addEventListener("click",async l=>{const d=l.target.closest("[data-keberangkatan-edit]"),u=l.target.closest("[data-keberangkatan-delete]");try{if(d){await jn(d.dataset.keberangkatanEdit);return}u&&Nn({id:u.dataset.keberangkatanDelete})}catch{y("Gagal memuat data")}}),o?.addEventListener("click",async l=>{const d=l.target.closest("[data-keberangkatan-edit]"),u=l.target.closest("[data-keberangkatan-delete]");try{if(d){await jn(d.dataset.keberangkatanEdit);return}u&&Nn({id:u.dataset.keberangkatanDelete})}catch{y("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(B.deleteItem)try{await E(`/keberangkatan/${B.deleteItem.id}`,{method:"DELETE"}),O("Data berhasil dihapus"),K("keberangkatan-delete-modal"),(B.page-1)*De>=B.totalCount-1&&B.page>1&&(B.page-=1),B.deleteItem=null,await fe()}catch{y("Gagal menghapus data")}}),i?.addEventListener("click",async()=>{if(!(B.page<=1)){B.page-=1;try{await fe()}catch{y("Gagal memuat data")}}}),m?.addEventListener("click",async()=>{const l=Math.max(1,Math.ceil(B.totalCount/De));if(!(B.page>=l)){B.page+=1;try{await fe()}catch{y("Gagal memuat data")}}}),fe().then(()=>{xt()}).catch(()=>{y("Gagal memuat data")})}const S={data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1,prices:{snack:0,air:0}},Oe=10;function Es(){return`
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
    `}function lt(e){return Number(document.getElementById(e)?.value||0)}function dt(){const e=lt("stock-total-snack"),t=lt("stock-total-air"),n=e*S.prices.snack+t*S.prices.air,a=document.querySelector('[data-stock-calc="nilai_total"]'),r=document.getElementById("stock-snack-price-label"),o=document.getElementById("stock-air-price-label");r&&(r.textContent=D(S.prices.snack)),o&&(o.textContent=D(S.prices.air)),a&&(a.textContent=D(n))}function ct(e){const t=document.getElementById("stock-submit-btn");S.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":S.editItem?"Perbarui":"Simpan")}function Bs(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");e&&(e.innerHTML=`
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
        `))}function Is(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");e&&(e.innerHTML=`
        <tr>
            <td colspan="14" class="stock-table-state stock-empty-copy">
                Belum ada data stok snack dan air mineral
            </td>
        </tr>
    `,t&&(t.hidden=!1,t.innerHTML=`
            <div class="stock-mobile-state stock-empty-copy">
                Belum ada data stok snack dan air mineral
            </div>
        `))}function Un(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");if(e){if(S.loading){Bs();return}if(S.data.length===0){Is();return}e.innerHTML=S.data.map(n=>`
        <tr class="stock-row" data-testid="stock-row-${n.id}">
            <td class="stock-day-cell">${p(n.hari)}</td>
            <td>${p(n.tanggal)}</td>
            <td>${p(n.bulan)}</td>
            <td class="text-right">${A(n.total_stock_snack_display??n.total_stock_snack)}</td>
            <td class="text-right">${A(n.total_stock_air_mineral)}</td>
            <td class="text-right">${A(n.pengembalian_snack)}</td>
            <td class="text-right">${A(n.terpakai_snack)}</td>
            <td class="text-right">${A(n.terpakai_air_mineral)}</td>
            <td class="text-right"><span class="stock-value-badge stock-value-badge-emerald">${A(n.sisa_stock_snack)}</span></td>
            <td class="text-right"><span class="stock-value-badge stock-value-badge-blue">${A(n.sisa_stock_air_mineral)}</span></td>
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
                        ${Es()}
                    </button>
                    <button
                        class="stock-icon-button stock-icon-button-danger"
                        type="button"
                        data-stock-delete="${n.id}"
                        data-stock-date="${p(n.tanggal)}"
                        data-testid="delete-stock-${n.id}"
                        aria-label="Hapus data stok ${p(n.tanggal)}"
                    >
                        ${ws()}
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
        `).join(""))}}function Hn(){const e=document.getElementById("stock-pagination-shell"),t=document.getElementById("stock-pagination-info"),n=document.getElementById("stock-pagination-page"),a=document.getElementById("stock-prev-page-btn"),r=document.getElementById("stock-next-page-btn"),o=Math.max(1,Math.ceil(S.totalCount/Oe));e&&(e.hidden=o<=1),t&&(t.textContent=xe(S.page,Oe,S.totalCount,S.data.length)),n&&(n.textContent=`${S.page} / ${o}`),a&&(a.disabled=S.page===1),r&&(r.disabled=S.page>=o)}async function be(){S.loading=!0,Un(),Hn();try{const[e,t]=await Promise.all([E(`/stock?page=${S.page}&limit=${Oe}${S.search?`&search=${encodeURIComponent(S.search)}`:""}`),E(`/stock/count${S.search?`?search=${encodeURIComponent(S.search)}`:""}`)]);S.data=Array.isArray(e)?e:[],S.totalCount=Number(t.count||0)}finally{S.loading=!1,Un(),Hn()}}function Fn(){const e=document.getElementById("stock-form"),t=document.getElementById("stock-form-title"),n=document.getElementById("stock-form-description");e?.reset(),S.editItem=null,document.getElementById("stock-id").value="",document.getElementById("stock-tanggal").value=Ve(),document.getElementById("stock-total-snack").value="0",document.getElementById("stock-total-air").value="0",document.getElementById("stock-keterangan").value="",t&&(t.textContent="Tambah Stok Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan stok snack dan air mineral"),ct(!1),dt()}function Ss(e){const t=document.getElementById("stock-form-title"),n=document.getElementById("stock-form-description");S.editItem=e,document.getElementById("stock-id").value=e.id,document.getElementById("stock-tanggal").value=e.tanggal,document.getElementById("stock-total-snack").value=e.total_stock_snack,document.getElementById("stock-total-air").value=e.total_stock_air_mineral,document.getElementById("stock-keterangan").value=e.keterangan||"",t&&(t.textContent="Edit Data Stok"),n&&(n.textContent="Isi form di bawah untuk memperbarui stok snack dan air mineral"),ct(!1),dt()}async function Vn(e){const t=await E(`/stock/${e}`);Ss(t),j("stock-form-modal")}function Gn(e){const t=document.getElementById("stock-delete-copy");S.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus data stok tanggal <strong>${p(e.tanggal)}</strong>? Tindakan ini tidak dapat dibatalkan.`),j("stock-delete-modal")}function $s(){const e=document.querySelector("[data-stock-page]"),t=document.getElementById("stock-add-btn"),n=document.getElementById("stock-search-input"),a=document.getElementById("stock-form"),r=document.getElementById("stock-table-body"),o=document.getElementById("stock-mobile-list"),s=document.getElementById("stock-delete-confirm-btn"),i=document.getElementById("stock-prev-page-btn"),m=document.getElementById("stock-next-page-btn");if(!(!e||!t||!a||!r))return S.prices.snack=Number(e.dataset.stockSnackPrice||0),S.prices.air=Number(e.dataset.stockAirPrice||0),dt(),t.addEventListener("click",()=>{Fn(),j("stock-form-modal")}),n?.addEventListener("input",Ce(async l=>{S.search=l.target.value.trim(),S.page=1;try{await be()}catch{y("Gagal memuat data")}})),a.addEventListener("input",l=>{["stock-total-snack","stock-total-air"].includes(l.target.id)&&dt()}),a.addEventListener("submit",async l=>{l.preventDefault();const d={tanggal:document.getElementById("stock-tanggal")?.value||"",total_stock_snack:lt("stock-total-snack"),total_stock_air_mineral:lt("stock-total-air"),keterangan:document.getElementById("stock-keterangan")?.value.trim()||""};ct(!0);try{S.editItem?(await E(`/stock/${S.editItem.id}`,{method:"PUT",body:d}),O("Data stok berhasil diperbarui")):(await E("/stock",{method:"POST",body:d}),O("Data stok berhasil ditambahkan")),K("stock-form-modal"),Fn(),await be()}catch(u){y(u.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{ct(!1)}}),r.addEventListener("click",async l=>{const d=l.target.closest("[data-stock-edit]"),u=l.target.closest("[data-stock-delete]");try{if(d){await Vn(d.dataset.stockEdit);return}u&&Gn({id:u.dataset.stockDelete,tanggal:u.dataset.stockDate})}catch{y("Gagal memuat data")}}),o?.addEventListener("click",async l=>{const d=l.target.closest("[data-stock-edit]"),u=l.target.closest("[data-stock-delete]");try{if(d){await Vn(d.dataset.stockEdit);return}u&&Gn({id:u.dataset.stockDelete,tanggal:u.dataset.stockDate})}catch{y("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(S.deleteItem)try{await E(`/stock/${S.deleteItem.id}`,{method:"DELETE"}),O("Data stok berhasil dihapus"),K("stock-delete-modal"),(S.page-1)*Oe>=S.totalCount-1&&S.page>1&&(S.page-=1),S.deleteItem=null,await be()}catch{y("Gagal menghapus data")}}),i?.addEventListener("click",async()=>{if(!(S.page<=1)){S.page-=1;try{await be()}catch{y("Gagal memuat data")}}}),m?.addEventListener("click",async()=>{const l=Math.max(1,Math.ceil(S.totalCount/Oe));if(!(S.page>=l)){S.page+=1;try{await be()}catch{y("Gagal memuat data")}}}),be().catch(()=>{y("Gagal memuat data")})}const qe=10,$={currentUser:null,data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,defaultRole:"User"};function Cs(e){return["Super Admin","Admin"].includes(e)}function xs(e){return e==="Super Admin"}function _s(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function Ts(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M2.5 12C4.4 8.2 8 6 12 6C16 6 19.6 8.2 21.5 12C19.6 15.8 16 18 12 18C8 18 4.4 15.8 2.5 12Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function Ls(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function As(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Rs(){return xs($.currentUser?.role)?["Super Admin","Admin","User"]:["Admin","User"]}function ut(e){de(document.getElementById("admin-user-submit-btn"),e,"Menyimpan...")}function Ms(e){return e==="Super Admin"?"admin-users-role-badge admin-users-role-badge-super":e==="Admin"?"admin-users-role-badge admin-users-role-badge-admin":"admin-users-role-badge admin-users-role-badge-user"}function Ps(){const e=document.getElementById("admin-users-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="6" class="admin-users-table-state">
                <div class="admin-users-loading-inline">
                    <span class="admin-users-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function Ra(e="Belum ada akun admin atau user."){const t=document.getElementById("admin-users-table-body");t&&(t.innerHTML=`
        <tr>
            <td colspan="6" class="admin-users-table-state admin-users-empty-copy">${p(e)}</td>
        </tr>
    `)}function Jn(){const e=document.getElementById("admin-users-table-body");if(e){if($.loading){Ps();return}if($.data.length===0){Ra();return}e.innerHTML=$.data.map(t=>`
        <tr class="admin-users-row" data-testid="admin-user-row-${t.id}">
            <td>
                <div class="admin-users-name-cell">
                    <span class="admin-users-avatar" aria-hidden="true">${_s()}</span>
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
            <td><span class="${Ms(t.role)}">${p(t.role)}</span></td>
            <td>
                <div class="admin-users-action-row">
                    <button class="admin-users-icon-button" type="button" data-admin-user-show="${t.id}" data-testid="show-admin-user-${t.id}" aria-label="Lihat detail akun ${p(t.nama)}">
                        ${Ts()}
                    </button>
                    <button class="admin-users-icon-button" type="button" data-admin-user-edit="${t.id}" data-testid="edit-admin-user-${t.id}" aria-label="Edit akun ${p(t.nama)}" ${t.can_edit?"":"disabled"}>
                        ${Ls()}
                    </button>
                    <button class="admin-users-icon-button admin-users-icon-button-danger" type="button" data-admin-user-delete="${t.id}" data-admin-user-name="${p(t.nama)}" data-testid="delete-admin-user-${t.id}" aria-label="Hapus akun ${p(t.nama)}" ${t.can_delete?"":"disabled"}>
                        ${As()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function qt(){const e=document.getElementById("admin-users-pagination-shell"),t=document.getElementById("admin-users-pagination-info"),n=document.getElementById("admin-users-pagination-page"),a=document.getElementById("admin-users-prev-page-btn"),r=document.getElementById("admin-users-next-page-btn"),o=Math.max(1,Math.ceil($.totalCount/qe));e&&(e.hidden=o<=1),t&&(t.textContent=xe($.page,qe,$.totalCount,$.data.length)),n&&(n.textContent=`${$.page} / ${o}`),a&&(a.disabled=$.page===1),r&&(r.disabled=$.page>=o)}async function he(){$.loading=!0,Jn(),qt();try{const e=$.search?`?search=${encodeURIComponent($.search)}`:"",t=`?page=${$.page}&limit=${qe}${$.search?`&search=${encodeURIComponent($.search)}`:""}`,[n,a]=await Promise.all([E(`/admin-users${t}`),E(`/admin-users/count${e}`)]);$.data=Array.isArray(n)?n:[],$.totalCount=Number(a.count||0)}finally{$.loading=!1,Jn(),qt()}}function Ma(e="User"){const t=document.getElementById("admin-user-role");if(!t)return;const n=Rs(),a=n.includes(e)?e:n[0];t.innerHTML=n.map(r=>`
        <option value="${p(r)}" ${r===a?"selected":""}>${p(r)}</option>
    `).join("")}function Pa(e){const t=document.getElementById("admin-user-password"),n=document.getElementById("admin-user-password-note");t&&(t.required=!e,t.placeholder=e?"Kosongkan jika tidak ingin mengubah password":"Masukkan password",t.value=""),n&&(n.textContent=e?"Kosongkan password jika tidak ingin mengubah password akun ini.":"Password minimal 6 karakter dan akan disimpan dalam bentuk terenkripsi.")}function _t(e="User"){const t=document.getElementById("admin-user-form"),n=document.getElementById("admin-user-form-title"),a=document.getElementById("admin-user-form-description"),r=document.getElementById("admin-user-id");t?.reset(),r&&(r.value=""),Ma(e),Pa(!1),n&&(n.textContent=e==="Admin"?"Tambah Admin Baru":"Tambah User Baru"),a&&(a.textContent=e==="Admin"?"Lengkapi data akun untuk menambahkan admin baru":"Lengkapi data akun untuk menambahkan user baru"),$.defaultRole=e,$.editItem=null,ut(!1)}function Ds(e){$.editItem=e,document.getElementById("admin-user-id").value=e.id,document.getElementById("admin-user-nama").value=e.nama,document.getElementById("admin-user-username").value=e.username,document.getElementById("admin-user-email").value=e.email,Ma(e.role),Pa(!0),document.getElementById("admin-user-form-title").textContent="Edit Akun",document.getElementById("admin-user-form-description").textContent="Perbarui informasi akun admin atau user di bawah ini",ut(!1)}function Os(e){const t=document.getElementById("admin-user-detail-list");t&&(t.innerHTML=`
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
            <strong>${p(Oo(e.created_at))}</strong>
        </div>
    `)}async function qs(e){Os(await E(`/admin-users/${e}`)),j("admin-user-show-modal")}async function js(e){Ds(await E(`/admin-users/${e}`)),j("admin-user-form-modal")}function Ns(e){$.deleteItem=e,document.getElementById("admin-user-delete-copy").innerHTML=`Apakah Anda yakin ingin menghapus akun <strong>${p(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`,j("admin-user-delete-modal")}function Kn(){const e=document.getElementById("admin-users-access-note"),t=document.getElementById("admin-users-search-input"),n=document.querySelector(".admin-users-page-actions");e&&(e.hidden=!1,e.textContent="Halaman ini hanya dapat diakses oleh Admin atau Super Admin."),t&&(t.disabled=!0),n&&(n.hidden=!0),$.loading=!1,$.data=[],$.totalCount=0,Ra("Anda tidak memiliki akses untuk mengelola data admin dan user."),qt()}function Us({user:e}={}){const t=document.getElementById("admin-users-add-admin-btn"),n=document.getElementById("admin-users-add-user-btn"),a=document.getElementById("admin-users-search-input"),r=document.getElementById("admin-user-form"),o=document.getElementById("admin-users-table-body"),s=document.getElementById("admin-user-delete-confirm-btn"),i=document.getElementById("admin-users-prev-page-btn"),m=document.getElementById("admin-users-next-page-btn");if(!(!t||!n||!r||!o)){if($.currentUser=e||window.transitAuthUser||null,!Cs($.currentUser?.role)){Kn();return}return t.addEventListener("click",()=>{_t("Admin"),j("admin-user-form-modal")}),n.addEventListener("click",()=>{_t("User"),j("admin-user-form-modal")}),a?.addEventListener("input",Ce(async l=>{$.search=l.target.value.trim(),$.page=1;try{await he()}catch(d){y(d.message||"Gagal memuat data akun")}})),r.addEventListener("submit",async l=>{l.preventDefault();const d={nama:document.getElementById("admin-user-nama")?.value.trim()||"",username:document.getElementById("admin-user-username")?.value.trim()||"",email:document.getElementById("admin-user-email")?.value.trim()||"",password:document.getElementById("admin-user-password")?.value||"",role:document.getElementById("admin-user-role")?.value||"User"};ut(!0);try{$.editItem?(await E(`/admin-users/${$.editItem.id}`,{method:"PUT",body:d}),O("Akun berhasil diperbarui")):(await E("/admin-users",{method:"POST",body:d}),O(d.role==="Admin"?"Admin berhasil ditambahkan":"User berhasil ditambahkan")),K("admin-user-form-modal"),_t($.defaultRole),await he()}catch(u){y(u.message||"Silakan periksa kembali data yang diinput","Gagal menyimpan akun")}finally{ut(!1)}}),o.addEventListener("click",async l=>{const d=l.target.closest("[data-admin-user-show]"),u=l.target.closest("[data-admin-user-edit]"),f=l.target.closest("[data-admin-user-delete]");try{if(d){await qs(d.dataset.adminUserShow);return}if(u){await js(u.dataset.adminUserEdit);return}f&&Ns({id:f.dataset.adminUserDelete,nama:f.dataset.adminUserName})}catch(v){y(v.message||"Gagal memuat detail akun")}}),s?.addEventListener("click",async()=>{if($.deleteItem)try{await E(`/admin-users/${$.deleteItem.id}`,{method:"DELETE"}),O("Akun berhasil dihapus"),K("admin-user-delete-modal"),($.page-1)*qe>=$.totalCount-1&&$.page>1&&($.page-=1),$.deleteItem=null,await he()}catch(l){y(l.message||"Gagal menghapus akun")}}),i?.addEventListener("click",async()=>{if(!($.page<=1)){$.page-=1;try{await he()}catch(l){y(l.message||"Gagal memuat data akun")}}}),m?.addEventListener("click",async()=>{const l=Math.max(1,Math.ceil($.totalCount/qe));if(!($.page>=l)){$.page+=1;try{await he()}catch(d){y(d.message||"Gagal memuat data akun")}}}),he().catch(l=>{if(l.status===403){Kn();return}y(l.message||"Gagal memuat data akun")})}}const Wn=[{value:"05:00",label:"Subuh",time:"05.00 WIB"},{value:"08:00",label:"Pagi",time:"08.00 WIB"},{value:"10:00",label:"Pagi",time:"10.00 WIB"},{value:"14:00",label:"Siang",time:"14.00 WIB"},{value:"16:00",label:"Sore",time:"16.00 WIB"},{value:"19:00",label:"Malam",time:"19.00 WIB"}],Da=[[{code:"1A",label:"1A"},{code:"SOPIR",label:"SOPIR",isDriver:!0}],[{code:"2A",label:"2A"},{code:"3A",label:"3A"}],[{code:"4A",label:"4A"},{code:"5A",label:"5A"}]],Hs=Da.flat().filter(e=>!e.isDriver).length,k={currentUser:null,date:Ve(),direction:"to_pkb",bookings:[],loading:!1,drivers:[],mobils:[],formOptions:null,selectedSeats:[],passengerDraftMap:{},editItem:null,deleteItem:null,slotDriverMap:{},slotMobilMap:{},occupiedSeatsForForm:[]};function Tt(e){const t=document.getElementById(e);if(!t)return null;try{return JSON.parse(t.textContent||"{}")}catch{return null}}function Fs(e){return["Super Admin","Admin"].includes(e)}function Vs(e){const t=e?"#dc2626":"#166534",n=e?"#991b1b":"#14532d";return`
        <svg viewBox="0 0 50 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="2" width="30" height="20" rx="8" fill="${t}" stroke="${n}" stroke-width="1.5"/>
            <rect x="5" y="18" width="40" height="28" rx="9" fill="${t}" stroke="${n}" stroke-width="1.5"/>
            <rect x="7" y="44" width="36" height="14" rx="7" fill="${t}" stroke="${n}" stroke-width="1.5" opacity="0.8"/>
            <rect x="2" y="22" width="5" height="18" rx="2.5" fill="${t}" opacity="0.6"/>
            <rect x="43" y="22" width="5" height="18" rx="2.5" fill="${t}" opacity="0.6"/>
        </svg>`}function Gs(){return`
        <svg viewBox="0 0 50 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="25" cy="30" r="18" stroke="rgba(148,163,184,0.5)" stroke-width="2.5"/>
            <circle cx="25" cy="30" r="6" fill="rgba(148,163,184,0.4)"/>
            <line x1="25" y1="12" x2="25" y2="24" stroke="rgba(148,163,184,0.5)" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="7" y1="30" x2="19" y2="30" stroke="rgba(148,163,184,0.5)" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="31" y1="30" x2="43" y2="30" stroke="rgba(148,163,184,0.5)" stroke-width="2.5" stroke-linecap="round"/>
        </svg>`}function Js(){return'<svg viewBox="0 0 24 24" fill="none"><path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path><path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg>'}function Ks(){return'<svg viewBox="0 0 24 24" fill="none"><path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg>'}function Ws(e){return`
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
                    ${Da.map(n=>`<div class="bpg-seat-row">${n.map(r=>{if(r.isDriver)return`
                    <div class="bpg-seat-item bpg-seat-driver" title="Sopir / Pengemudi">
                        <div class="bpg-seat-icon">${Gs()}</div>
                        <span class="bpg-seat-label">SOPIR</span>
                    </div>`;const o=e[r.code],s=!!o,i=s?"bpg-seat-occupied":"bpg-seat-available",m=s?p(o.nama_pemesanan||"-"):"";return`
                <div class="bpg-seat-item ${i}" title="${s?m:"Tersedia"}">
                    <div class="bpg-seat-icon">${Vs(s)}</div>
                    <span class="bpg-seat-label">${r.label}</span>
                    ${s?`<span class="bpg-seat-name">${m}</span>`:""}
                </div>`}).join("")}</div>`).join("")}
                </div>
            </div>
        </div>`}function zs(e){if(e.length===0)return`
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
                data-departure-status="${p(l.value)}"
                data-booking-departure="${p(String(r.id))}">${p(l.label)}</button>`}).join("");return`
            <div class="bpg-passenger-item" data-booking-id="${p(String(r.id))}">
                <div class="bpg-passenger-item-row">
                    <div class="bpg-passenger-seats">
                        ${o.split(",").map(l=>`<span class="stock-value-badge stock-value-badge-blue">${p(l.trim())}</span>`).join("")}
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
                            ${Js()}
                        </button>
                        <button class="admin-users-icon-button admin-users-icon-button-danger" type="button" data-booking-delete="${p(String(r.id))}" data-booking-name="${p(r.nama_pemesanan)}" title="Hapus pemesanan">
                            ${Ks()}
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
        </div>`}function Xs(e){const t={};return e.forEach(n=>{(Array.isArray(n.selected_seats)?n.selected_seats:[]).forEach(r=>{t[r]||(t[r]=n)})}),t}function Zs(e,t){const n=Xs(t),a=t.reduce((u,f)=>u+(Number(f.passenger_count)||0),0),r=`${e.value}__${k.direction}`;if(!k.slotDriverMap[r]){const u=t.find(f=>f.driver_id);u&&(k.slotDriverMap[r]=u.driver_id)}const o=k.slotDriverMap[r]||"",s=k.slotMobilMap[r]||"",i="stock-value-badge-yellow",m=k.drivers.map(u=>{const f=u.lokasi?`${u.nama} (${u.lokasi})`:u.nama;return`<option value="${p(u.id)}" ${o===u.id?"selected":""}>${p(f)}</option>`}).join(""),l=k.mobils.map(u=>{const f=`${u.kode_mobil} — ${u.jenis_mobil}`;return`<option value="${p(u.id)}" ${s===u.id?"selected":""}>${p(f)}</option>`}).join(""),d=[...new Set(t.map(u=>(u.service_type||"").trim()).filter(Boolean))];return`
        <article class="bpg-slot-card" data-slot="${p(e.value)}" data-direction="${p(k.direction)}">
            <div class="bpg-slot-head">
                <div class="bpg-slot-time-badge">
                    <span class="bpg-slot-period">${p(e.label)}</span>
                    <strong class="bpg-slot-time">${p(e.time)}</strong>
                </div>
                <div class="bpg-slot-service-types">
                    ${d.length>0?d.map(u=>`<span class="bpg-service-badge">${p(u)}</span>`).join(""):'<span class="bpg-service-badge bpg-service-badge--empty">Belum ada layanan</span>'}
                </div>
                <div class="bpg-slot-counters">
                    <span class="stock-value-badge ${i}">${a} / ${Hs} Kursi</span>
                </div>
            </div>

            ${Ws(n)}

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
                        ${l}
                    </select>
                </div>
            </div>

            ${zs(t)}
        </article>`}function Qs(){const e=document.getElementById("bpg-slots-shell");e&&(e.innerHTML=`
            <div class="admin-users-loading-inline" style="padding:40px 0;">
                <span class="admin-users-loading-inline-spinner" aria-hidden="true"></span>
                <span>Memuat data penumpang...</span>
            </div>`)}function Ys(){const e=document.getElementById("bpg-slots-shell");if(!e)return;const t={};Wn.forEach(a=>{t[a.value]=[]}),k.bookings.forEach(a=>{const o=(a.trip_time||"").trim().substring(0,5);t[o]&&t[o].push(a)});const n=Wn.map(a=>Zs(a,t[a.value]||[]));e.innerHTML=`<div class="bpg-slots-grid">${n.join("")}</div>`}async function Ae(){k.loading=!0,Qs();try{const e=new URLSearchParams({date:k.date,direction:k.direction,limit:200,page:1}),t=await E(`/bookings?${e}`);k.bookings=Array.isArray(t)?t:[]}catch(e){k.bookings=[],e.status!==403&&y(e.message||"Gagal memuat data penumpang")}finally{k.loading=!1,Ys()}}function ei(e){document.getElementById("bpg-detail-title").textContent=e.nama_pemesanan||"-",document.getElementById("bpg-detail-subtitle").textContent=`${e.booking_code||"-"} · ${e.booking_status||"-"}`,document.getElementById("bpg-detail-full-link").href=`/dashboard/bookings/${e.id}`,document.getElementById("bpg-detail-ticket-link").href=`/dashboard/bookings/${e.id}/ticket`;const t=document.getElementById("bpg-detail-body");t.innerHTML=`
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
        </div>`,j("bpg-detail-modal")}function ti(){return(k.formOptions?.seat_options||[]).map(e=>e.code)}function tn(e){const t=new Map(ti().map((n,a)=>[n,a]));return Array.from(new Set((e||[]).map(n=>String(n).trim()).filter(n=>t.has(n)))).sort((n,a)=>(t.get(n)??999)-(t.get(a)??999))}function Et(){return Number(document.getElementById("booking-passenger-count")?.value||0)}function ni(){const e=Et();return(k.formOptions?.seat_options||[]).filter(t=>!t.is_optional||e>=6).map(t=>t.code)}function ai(){return k.formOptions?.payment_status_options||[]}function ri(e){return e==="transfer"?["Belum Bayar","Menunggu Pembayaran","Menunggu Verifikasi","Dibayar"]:e==="qris"?["Belum Bayar","Menunggu Pembayaran","Dibayar"]:e==="cash"?["Belum Bayar","Dibayar Tunai"]:["Belum Bayar"]}function oi(e){return e==="transfer"?"Menunggu Pembayaran":e==="qris"?"Dibayar":e==="cash"?"Dibayar Tunai":"Belum Bayar"}function si(e){return e==="transfer"?"Menunggu Verifikasi Pembayaran":e==="qris"||e==="cash"?"Diproses":"Draft"}function ii(e,t){if(!e||!t||e===t)return null;const a=(k.formOptions?.route_matrix||{})?.[e]?.[t];return a==null?null:Number(a)}function Re(){const e=document.getElementById("booking-from-city")?.value||"",t=document.getElementById("booking-to-city")?.value||"",n=Et(),a=ii(e,t),r=a!==null?a*n:null,o=document.getElementById("booking-price-per-seat"),s=document.getElementById("booking-total-amount");o&&(o.value=a!==null?D(a):""),s&&(s.value=r!==null?D(r):"")}function nn(){const e=document.getElementById("booking-payment-method")?.value||"",t=document.getElementById("booking-payment-status"),n=document.getElementById("booking-booking-status"),a=document.getElementById("booking-bank-account-group"),r=document.getElementById("booking-bank-account-code"),o=ri(e),s=t?.value||"";a&&(a.hidden=e!=="transfer"),r&&e!=="transfer"&&(r.value=""),t&&(t.innerHTML=ai().filter(i=>o.includes(i.value)).map(i=>`<option value="${p(i.value)}">${p(i.label)}</option>`).join(""),t.value=o.includes(s)?s:oi(e)),n&&(n.value=si(e))}function li(){const e=document.getElementById("booking-selected-seats-inputs");e&&(e.innerHTML=k.selectedSeats.map(t=>`<input type="hidden" name="selected_seats[]" value="${p(t)}">`).join(""))}function di(){const e=document.getElementById("booking-selected-seat-count"),t=document.getElementById("booking-selected-seat-label");e&&(e.textContent=String(k.selectedSeats.length)),t&&(t.textContent=k.selectedSeats.length>0?k.selectedSeats.join(", "):"Belum dipilih")}function jt(){document.querySelectorAll("[data-passenger-seat]").forEach(e=>{const t=e.dataset.passengerSeat;t&&(k.passengerDraftMap[t]={seat_no:t,name:e.querySelector("[data-passenger-name]")?.value.trim()||"",phone:e.querySelector("[data-passenger-phone]")?.value.trim()||""})})}function ke(e=null){const t=document.getElementById("booking-passenger-editor");if(t){if(e&&(k.passengerDraftMap=Object.fromEntries(e.map(n=>[n.seat_no,n]))),k.selectedSeats.length===0){t.innerHTML='<div class="dashboard-empty-state dashboard-empty-state--block bookings-passenger-empty">Pilih kursi terlebih dahulu untuk menampilkan form data penumpang.</div>';return}t.innerHTML=`
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
        </div>`}}async function mt(){const e=document.getElementById("booking-trip-date")?.value||"",t=document.getElementById("booking-trip-time")?.value||"",n=k.editItem?.id||"";if(!e||!t){k.occupiedSeatsForForm=[];return}try{const a=new URLSearchParams({trip_date:e,trip_time:t});n&&a.set("exclude_id",n);const r=await E(`/bookings/occupied-seats?${a}`);k.occupiedSeatsForForm=Array.isArray(r?.occupied_seats)?r.occupied_seats:[]}catch{k.occupiedSeatsForForm=[]}}function ye(){const e=document.querySelectorAll("[data-seat-code]"),t=Et(),n=ni();k.selectedSeats=tn(k.selectedSeats.filter(a=>n.includes(a)&&!k.occupiedSeatsForForm.includes(a))),e.forEach(a=>{const r=a.dataset.seatCode,o=n.includes(r),s=k.occupiedSeatsForForm.includes(r),i=k.selectedSeats.includes(r),m=k.selectedSeats.length>=t&&!i;a.hidden=!o,a.classList.toggle("is-selected",i),a.classList.toggle("is-occupied",s),a.classList.toggle("is-disabled",!s&&m),a.disabled=!o||s||!i&&m,s?a.title="Kursi sudah dipesan":a.title=""}),li(),di()}function Lt(){document.getElementById("booking-form")?.reset(),k.editItem=null,k.selectedSeats=[],k.passengerDraftMap={};const t=k.date||Ve();document.getElementById("booking-id").value="",document.getElementById("booking-form-title").textContent="Tambah Pemesanan",document.getElementById("booking-form-description").textContent="Lengkapi data pemesanan reguler dari dashboard admin.",document.getElementById("booking-trip-date").value=t,document.getElementById("booking-passenger-count").value="1",document.getElementById("booking-payment-method").value="",document.getElementById("booking-booking-status").value="Draft",nn(),Re(),de(document.getElementById("booking-submit-btn"),!1,"Menyimpan..."),mt().then(()=>{ye(),ke()})}function ci(e){k.editItem=e,k.selectedSeats=tn(e.selected_seats||[]),k.passengerDraftMap=Object.fromEntries((e.passengers||[]).map(t=>[t.seat_no,t])),document.getElementById("booking-id").value=e.id,document.getElementById("booking-booking-for").value=e.booking_for,document.getElementById("booking-category").value=e.category,document.getElementById("booking-from-city").value=e.from_city,document.getElementById("booking-to-city").value=e.to_city,document.getElementById("booking-trip-date").value=e.trip_date_value,document.getElementById("booking-trip-time").value=e.trip_time_value,document.getElementById("booking-passenger-count").value=String(e.passenger_count),document.getElementById("booking-driver-name").value=e.driver_name==="Menunggu Penetapan Driver"?"":e.driver_name||"",document.getElementById("booking-pickup-location").value=e.pickup_location,document.getElementById("booking-dropoff-location").value=e.dropoff_location,document.getElementById("booking-payment-method").value=e.payment_method_value||"",nn(),document.getElementById("booking-payment-status").value=e.payment_status,document.getElementById("booking-booking-status").value=e.booking_status,document.getElementById("booking-bank-account-code").value=e.bank_account_code||"",document.getElementById("booking-notes").value=e.notes||"",document.getElementById("booking-form-title").textContent="Edit Pemesanan",document.getElementById("booking-form-description").textContent="Perbarui data pemesanan reguler yang dipilih.",Re(),de(document.getElementById("booking-submit-btn"),!1,"Menyimpan..."),mt().then(()=>{ye(),ke(e.passengers||[])})}function ui(){return jt(),{booking_for:document.getElementById("booking-booking-for")?.value||"",category:document.getElementById("booking-category")?.value||"Reguler",from_city:document.getElementById("booking-from-city")?.value||"",to_city:document.getElementById("booking-to-city")?.value||"",trip_date:document.getElementById("booking-trip-date")?.value||"",trip_time:document.getElementById("booking-trip-time")?.value||"",passenger_count:Number(document.getElementById("booking-passenger-count")?.value||0),driver_name:document.getElementById("booking-driver-name")?.value.trim()||"",pickup_location:document.getElementById("booking-pickup-location")?.value.trim()||"",dropoff_location:document.getElementById("booking-dropoff-location")?.value.trim()||"",selected_seats:k.selectedSeats,passengers:k.selectedSeats.map(e=>({seat_no:e,name:k.passengerDraftMap?.[e]?.name||"",phone:k.passengerDraftMap?.[e]?.phone||""})),payment_method:document.getElementById("booking-payment-method")?.value||"",payment_status:document.getElementById("booking-payment-status")?.value||"Belum Bayar",booking_status:document.getElementById("booking-booking-status")?.value||"Draft",bank_account_code:document.getElementById("booking-bank-account-code")?.value||"",notes:document.getElementById("booking-notes")?.value.trim()||""}}async function mi(e){ci(await E(`/bookings/${e}`)),j("booking-form-modal")}function pi(e){k.deleteItem=e,document.getElementById("booking-delete-copy").innerHTML=`Apakah Anda yakin ingin menghapus data pemesanan <strong>${p(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`,j("booking-delete-modal")}function zn(){const e=document.getElementById("bookings-access-note"),t=document.getElementById("bpg-route-tabs"),n=document.getElementById("bpg-slots-shell");e&&(e.hidden=!1),t&&(t.hidden=!0),n&&(n.hidden=!0)}function gi({user:e}={}){const t=document.getElementById("bookings-add-btn"),n=document.getElementById("bookings-date-picker"),a=document.getElementById("bpg-route-tabs"),r=document.getElementById("bpg-slots-shell"),o=document.getElementById("booking-form"),s=document.getElementById("booking-delete-confirm-btn"),i=document.getElementById("booking-seat-grid"),m=document.getElementById("booking-passenger-editor"),l=document.getElementById("booking-payment-method");if(k.formOptions=Tt("bookings-form-options"),k.drivers=Tt("bookings-drivers-data")||[],k.mobils=Tt("bookings-mobils-data")||[],k.currentUser=e||window.transitAuthUser||null,k.date=Ve(),!Fs(k.currentUser?.role)){zn();return}a&&(a.hidden=!1),r&&(r.hidden=!1);const d=document.getElementById("bookings-access-note");d&&(d.hidden=!0),n&&(n.value=k.date,n.addEventListener("change",async()=>{k.date=n.value,k.slotDriverMap={},k.slotMobilMap={},await Ae()})),a?.addEventListener("click",async f=>{const v=f.target.closest("[data-direction]");if(!v)return;const g=v.dataset.direction;g!==k.direction&&(k.direction=g,k.slotDriverMap={},k.slotMobilMap={},document.querySelectorAll(".bpg-route-tab").forEach(b=>{b.classList.toggle("is-active",b.dataset.direction===g)}),await Ae())});function u(f=null){r?.querySelectorAll("[data-depart-dropdown]").forEach(v=>{String(v.dataset.departDropdown)!==String(f)&&(v.querySelector(".bpg-depart-menu")?.removeAttribute("hidden"),v.querySelector(".bpg-depart-menu")?.setAttribute("hidden",""))})}return document.addEventListener("click",f=>{f.target.closest("[data-depart-dropdown]")||u()}),r?.addEventListener("click",async f=>{const v=f.target.closest("[data-depart-toggle]"),g=f.target.closest("[data-booking-departure]"),b=f.target.closest("[data-booking-lihat]"),h=f.target.closest("[data-booking-edit]"),L=f.target.closest("[data-booking-delete]");try{if(v){const M=v.dataset.departToggle,P=r.querySelector(`[data-depart-dropdown="${CSS.escape(M)}"]`)?.querySelector(".bpg-depart-menu");if(!P)return;const q=P.hasAttribute("hidden");u(M),P.toggleAttribute("hidden",!q);return}if(g){const M=g.dataset.bookingDeparture,T=g.dataset.departureStatus,P=k.bookings.find(H=>String(H.id)===String(M));if(!P)return;const q=P.departure_status===T?"":T;P.departure_status=q;const F=r.querySelector(`[data-depart-dropdown="${CSS.escape(M)}"]`);if(F){const H=F.querySelector(".bpg-depart-trigger"),Y=departureStatusMeta(q);H.className=`bpg-depart-trigger ${Y.cls}`,H.childNodes.forEach(X=>{X.nodeType===3&&(X.textContent=Y.label)}),F.querySelectorAll("[data-booking-departure]").forEach(X=>{X.classList.toggle("is-active",X.dataset.departureStatus===q)}),F.querySelector(".bpg-depart-menu")?.setAttribute("hidden","")}await E(`/bookings/${M}/departure-status`,{method:"PATCH",body:{departure_status:q}});return}if(b){const M=b.dataset.bookingLihat,T=k.bookings.find(P=>String(P.id)===String(M));T&&ei(T);return}if(h){await mi(h.dataset.bookingEdit);return}L&&pi({id:L.dataset.bookingDelete,nama:L.dataset.bookingName})}catch(M){y(M.message||"Gagal memuat data pemesanan")}}),r?.addEventListener("change",async f=>{const v=f.target.closest("[data-slot-driver]"),g=f.target.closest("[data-slot-mobil]");if(v){const b=v.dataset.slotDriver,h=v.value,L=v.options[v.selectedIndex],M=h&&L?.text.split(" (")[0]||"",T=`${b}__${k.direction}`;k.slotDriverMap[T]=h;try{await E("/bookings/slot-assign",{method:"PATCH",body:{trip_date:k.date,trip_time:b,direction:k.direction,driver_id:h||null,driver_name:M}}),O("Driver berhasil diperbarui")}catch(P){y(P.message||"Gagal memperbarui driver")}}if(g){const b=g.dataset.slotMobil,h=g.value,L=`${b}__${k.direction}`;k.slotMobilMap[L]=h}}),t?.addEventListener("click",()=>{Lt(),j("booking-form-modal")}),i?.addEventListener("click",f=>{const v=f.target.closest("[data-seat-code]");if(!v||v.disabled)return;jt();const g=v.dataset.seatCode;k.selectedSeats.includes(g)?k.selectedSeats=k.selectedSeats.filter(b=>b!==g):k.selectedSeats.length<Et()&&(k.selectedSeats=tn([...k.selectedSeats,g])),ye(),ke()}),document.getElementById("booking-passenger-count")?.addEventListener("change",()=>{jt(),ye(),ke(),Re()}),document.getElementById("booking-trip-date")?.addEventListener("change",()=>{mt().then(()=>{ye(),ke()})}),document.getElementById("booking-trip-time")?.addEventListener("change",()=>{mt().then(()=>{ye(),ke()})}),document.getElementById("booking-from-city")?.addEventListener("change",Re),document.getElementById("booking-to-city")?.addEventListener("change",Re),l?.addEventListener("change",nn),m?.addEventListener("input",f=>{const v=f.target.closest("[data-passenger-seat]");if(!v)return;const g=v.dataset.passengerSeat;k.passengerDraftMap[g]={seat_no:g,name:v.querySelector("[data-passenger-name]")?.value.trim()||"",phone:v.querySelector("[data-passenger-phone]")?.value.trim()||""}}),o?.addEventListener("submit",async f=>{f.preventDefault();const v=document.getElementById("booking-submit-btn");de(v,!0,"Menyimpan...");try{const g=ui();k.editItem?(await E(`/bookings/${k.editItem.id}`,{method:"PUT",body:g}),O("Data pemesanan berhasil diperbarui")):(await E("/bookings",{method:"POST",body:g}),O("Data pemesanan berhasil ditambahkan")),K("booking-form-modal"),Lt(),await Ae()}catch(g){y(g.message||"Silakan periksa kembali data yang diinput","Gagal menyimpan data pemesanan")}finally{de(v,!1,"Menyimpan...")}}),s?.addEventListener("click",async()=>{if(k.deleteItem){de(s,!0,"Menghapus...");try{await E(`/bookings/${k.deleteItem.id}`,{method:"DELETE"}),O("Data pemesanan berhasil dihapus"),K("booking-delete-modal"),k.deleteItem=null,await Ae()}catch(f){y(f.message||"Gagal menghapus data pemesanan")}finally{de(s,!1,"Menghapus...")}}}),Lt(),Ae().catch(f=>{if(f.status===403){zn();return}y(f.message||"Gagal memuat data penumpang")})}function fi(e){const t=document.getElementById(e);if(!t)return{};try{return JSON.parse(t.textContent||"{}")}catch{return{}}}function bi(){const e=document.querySelector("[data-regular-booking-page]");if(!e)return;const t=fi("regular-booking-route-matrix"),n=e.querySelector("[data-booking-origin]"),a=e.querySelector("[data-booking-destination]"),r=e.querySelector("[data-booking-schedule]"),o=e.querySelector("[data-booking-passengers]"),s=e.querySelector("[data-route-fare-input]"),i=e.querySelector("[data-additional-fare-input]"),m=e.querySelector("[data-estimated-total-input]"),l=e.querySelector("[data-route-feedback]"),d=e.querySelector("[data-route-feedback-title]"),u=e.querySelector("[data-route-feedback-text]"),f=e.querySelector("[data-booking-submit]"),v=Array.from(e.querySelectorAll("[data-booking-type]")),g=e.querySelector("[data-summary-booking-for]"),b=e.querySelector("[data-summary-route]"),h=e.querySelector("[data-summary-schedule]"),L=e.querySelector("[data-summary-passengers]"),M=e.querySelector("[data-summary-fare]"),T=e.querySelector("[data-summary-additional-fare]"),P=e.querySelector("[data-summary-total]"),q=new Map(v.map(_=>[_.value,_.dataset.label||_.value])),F=new Map(Array.from(r?.options||[]).filter(_=>_.value).map(_=>[_.value,_.textContent.trim()]));function H(_,N){if(!_||!N||_===N)return null;const J=t?.[_]?.[N];return J==null?null:Number(J)}function Y(_,N,J){!l||!d||!u||(l.dataset.state=_,d.textContent=N,u.textContent=J)}function X(){e.querySelectorAll(".regular-booking-radio").forEach(_=>{const N=_.querySelector('input[type="radio"]');_.classList.toggle("is-selected",!!N?.checked)})}function Ge(_){return _<=0?"Belum dipilih":_===6?"6 Penumpang (Opsional tambahan)":`${_} Penumpang`}function ae(){const _=n?.value||"",N=a?.value||"",J=r?.value||"",me=Number(o?.value||0),V=v.find(wt=>wt.checked)?.value||"",ee=H(_,N),Z=Math.max(parseInt(i?.value||"0",10)||0,0),se=ee!==null&&me>0?(ee+Z)*me:null;s&&(s.value=ee!==null?D(ee):""),m&&(m.value=se!==null?D(se):""),!_||!N?Y("idle","Tarif akan ditampilkan otomatis","Pilih asal dan tujuan untuk melihat tarif perjalanan reguler."):_===N?Y("error","Asal dan tujuan tidak boleh sama","Silakan pilih tujuan yang berbeda agar tarif dapat dihitung."):ee===null?Y("error","Rute belum tersedia","Rute yang Anda pilih saat ini belum tersedia. Silakan pilih kombinasi asal dan tujuan lain."):Y("ready","Rute tersedia","Tarif telah diisi otomatis berdasarkan kombinasi rute dua arah yang tersedia."),f&&(f.disabled=!!(_&&N&&(_===N||ee===null))),g&&(g.textContent=q.get(V)||"Belum dipilih"),b&&(b.textContent=_&&N?`${_} - ${N}`:"Belum dipilih"),h&&(h.textContent=F.get(J)||"Belum dipilih"),L&&(L.textContent=Ge(me)),M&&(M.textContent=ee!==null?D(ee):"Belum tersedia"),T&&(T.textContent=Z>0?D(Z):"Tidak ada"),P&&(P.textContent=se!==null?D(se):"Belum tersedia"),X()}[n,a,r,o].forEach(_=>{_?.addEventListener("change",ae)}),i?.addEventListener("input",ae),v.forEach(_=>{_.addEventListener("change",ae)}),e.querySelector("form")?.addEventListener("reset",()=>{window.requestAnimationFrame(ae)}),ae()}function hi(){const e=document.querySelector("[data-regular-booking-seat-page]");if(!e)return;const t=Number(e.dataset.requiredSeatCount||0),n=Array.from(e.querySelectorAll("[data-seat-card]")),a=Array.from(e.querySelectorAll("[data-seat-input]")),r=e.querySelector("[data-seat-summary-count]"),o=e.querySelector("[data-seat-summary-list]"),s=e.querySelector("[data-seat-summary-remaining]"),i=e.querySelector("[data-seat-submit]"),m=e.querySelector("[data-seat-feedback]"),l=e.querySelector("[data-seat-feedback-title]"),d=e.querySelector("[data-seat-feedback-text]");function u(){return a.filter(b=>b.checked).map(b=>b.value)}function f(b){return b.length>0?b.join(", "):"Belum dipilih"}function v(b,h,L){!m||!l||!d||(m.dataset.state=b,l.textContent=h,d.textContent=L)}function g(){const b=u(),h=b.length,L=t>0&&h>=t;if(n.forEach(M=>{const T=M.querySelector("[data-seat-input]");if(!T)return;const P=T.disabled&&!T.checked&&M.classList.contains("is-occupied"),q=T.checked,F=P||L&&!q;P||(T.disabled=F),M.classList.toggle("is-selected",q),M.classList.toggle("is-disabled",!P&&F)}),r&&(r.textContent=`${h} dari ${t}`),o&&(o.textContent=f(b)),s&&(s.textContent=String(Math.max(t-h,0))),i&&(i.disabled=h!==t),h===0){v("idle","Pilih kursi sesuai jumlah penumpang","Jumlah kursi yang dipilih harus sama dengan jumlah penumpang pada booking draft.");return}if(h<t){v("idle","Pemilihan kursi belum lengkap",`Masih perlu memilih ${t-h} kursi lagi sebelum dapat melanjutkan.`);return}if(t===6){v("ready","Semua kursi sudah terisi","Jumlah penumpang 6 orang sudah terpenuhi dan kursi tambahan 2B ikut terpakai.");return}v("ready","Kursi sudah sesuai","Jumlah kursi yang dipilih sudah sesuai dengan jumlah penumpang dan siap disimpan.")}a.forEach(b=>{b.addEventListener("change",()=>{g()})}),g()}let Me=null,pt=!1,Xn="",ki=3e3,Zn=0;const gt=[],C=e=>document.getElementById(e);async function Oa(e){const t=e.trim();if(!t)return;const n=Date.now();if(!(t===Xn&&n-Zn<ki)){Xn=t,Zn=n,ve("Memproses scan…");try{const a=await E("/scan-qr",{method:"POST",body:{qr_token:t}});yi(a),Ei(a),a.already_scanned?y(a.message,"Tiket Sudah Pernah Di-Scan"):a.is_newly_eligible?O(a.message,"🎉 Eligible Diskon!"):O(a.message,"Scan Berhasil")}catch(a){vi(a.message||"Scan gagal"),y(a.message||"Scan gagal","Scan Gagal")}finally{ve(pt?"Kamera aktif — arahkan ke QR code.":"")}}}function yi(e){C("qrscan-result-idle").hidden=!0,C("qrscan-result-card").hidden=!1;const t=e.booking||{},n=e.passenger||{},a=e.loyalty_count,r=e.loyalty_target,o=e.discount_eligible,s=Math.min(Math.round(a/r*100),100),i=e.already_scanned?"warn":e.success?"success":"error";C("qrscan-result-header").className="qrscan-result-header qrscan-result-header--"+i,C("qrscan-result-icon").innerHTML=e.already_scanned?Si():e.success?Ii():ja(),C("qrscan-result-title").textContent=t.booking_code||"-",C("qrscan-result-subtitle").textContent=e.message,C("qr-res-name").textContent=n.name||t.nama_pemesanan||"-",C("qr-res-code").textContent=t.booking_code||"-",C("qr-res-route").textContent=t.route_label||"-",C("qr-res-datetime").textContent=(t.trip_date||"-")+" "+(t.trip_time||""),C("qr-res-seats").textContent=n.seat_no||t.selected_seats||"-",C("qr-res-pax").textContent=(t.passenger_count||0)+" Orang",C("qr-res-loyalty-label").textContent=a+" / "+r,C("qr-res-loyalty-fill").style.width=s+"%",C("qr-res-loyalty-fill").className="qrscan-loyalty-fill"+(o?" qrscan-loyalty-fill--done":""),C("qr-res-loyalty-note").textContent=o?"✅ Eligible diskon "+(e.discount_percentage||50)+"%":"Perlu "+Math.max(r-a,0)+" perjalanan lagi untuk diskon."}function vi(e){C("qrscan-result-idle").hidden=!0,C("qrscan-result-card").hidden=!1,C("qrscan-result-header").className="qrscan-result-header qrscan-result-header--error",C("qrscan-result-icon").innerHTML=ja(),C("qrscan-result-title").textContent="Scan Gagal",C("qrscan-result-subtitle").textContent=e,["qr-res-name","qr-res-code","qr-res-route","qr-res-datetime","qr-res-seats","qr-res-pax"].forEach(t=>{C(t).textContent="-"}),C("qr-res-loyalty-label").textContent="– / –",C("qr-res-loyalty-fill").style.width="0%",C("qr-res-loyalty-note").textContent=""}function Ei(e){const t=e.booking,n=new Date().toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit",second:"2-digit"}),a=e.passenger||{};gt.unshift({booking:t,passenger:a,time:n,success:e.success,already_scanned:e.already_scanned,message:e.message}),qa()}function qa(){const e=C("qrscan-history-list");if(gt.length===0){e.innerHTML='<p class="qrscan-history-empty">Belum ada scan dalam sesi ini.</p>';return}e.innerHTML=gt.map(t=>{const n=t.already_scanned?"warn":t.success?"ok":"err",a=t.passenger&&t.passenger.name?t.passenger.name+(t.passenger.seat_no?" ("+t.passenger.seat_no+")":""):t.booking.nama_pemesanan||"-";return`
        <div class="qrscan-history-item qrscan-history-item--${n}">
            <div class="qrscan-history-dot"></div>
            <div class="qrscan-history-body">
                <strong>${p(t.booking.booking_code||"-")}</strong>
                <span>${p(a)}</span>
            </div>
            <span class="qrscan-history-time">${t.time}</span>
        </div>`}).join("")}function wi(){if(!window.Html5Qrcode){y("Library scanner tidak tersedia. Coba muat ulang halaman.","Error");return}C("qrscan-placeholder").hidden=!0,C("qrscan-frame").hidden=!1,C("qrscan-btn-start").hidden=!0,C("qrscan-btn-stop").hidden=!1,pt=!0,ve("Menginisialisasi kamera…"),Me=new window.Html5Qrcode("qrscan-reader"),Me.start({facingMode:"environment"},{fps:10,qrbox:{width:240,height:240}},e=>{let t=e.trim();try{const n=JSON.parse(e);n&&(n.qr_token||n.passenger_qr_token)&&(t=n.qr_token||n.passenger_qr_token)}catch{}Oa(t)},()=>{}).then(()=>{ve("Kamera aktif — arahkan ke QR code.")}).catch(e=>{pt=!1,C("qrscan-placeholder").hidden=!1,C("qrscan-frame").hidden=!0,C("qrscan-btn-start").hidden=!1,C("qrscan-btn-stop").hidden=!0,ve("Gagal mengakses kamera. Pastikan izin kamera sudah diberikan."),y(String(e),"Kamera Error")})}function Bi(){Me&&Me.stop().catch(()=>{}).finally(()=>{Me=null}),pt=!1,C("qrscan-placeholder").hidden=!1,C("qrscan-frame").hidden=!0,C("qrscan-btn-start").hidden=!1,C("qrscan-btn-stop").hidden=!0,ve("Kamera dihentikan.")}function ve(e){C("qrscan-status-text").textContent=e}function Ii(){return`<svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
        <path d="M8 12l3 3 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`}function ja(){return`<svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
        <path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`}function Si(){return`<svg viewBox="0 0 24 24" fill="none">
        <path d="M12 9v4M12 17h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    </svg>`}function $i(){C("qrscan-btn-start").addEventListener("click",wi),C("qrscan-btn-stop").addEventListener("click",Bi),C("qrscan-clear-history").addEventListener("click",()=>{gt.length=0,qa()}),C("qrscan-manual-form").addEventListener("submit",e=>{e.preventDefault();const t=C("qrscan-manual-input").value.trim();t&&(Oa(t),C("qrscan-manual-input").value="")})}const R={data:[],loading:!0,totalCount:0,page:1,search:"",chartLimit:15};let We=null;const Ie=15;function Ci(){const e=document.getElementById("plkt-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="8" class="plkt-table-state">
                <div class="plkt-loading-inline">
                    <span class="plkt-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>`)}function xi(){const e=document.getElementById("plkt-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="8" class="plkt-table-state plkt-empty-copy">
                Belum ada data penumpang.
            </td>
        </tr>`)}function Qn(){const e=document.getElementById("plkt-table-body");if(e){if(R.loading){Ci();return}if(R.data.length===0){xi();return}e.innerHTML=R.data.map((t,n)=>`
        <tr class="plkt-row">
            <td class="plkt-index-cell">${(R.page-1)*Ie+n+1}</td>
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
        </tr>`).join("")}}function Yn(){const e=document.getElementById("plkt-pagination-shell"),t=document.getElementById("plkt-pagination-info"),n=document.getElementById("plkt-pagination-page"),a=document.getElementById("plkt-prev-page-btn"),r=document.getElementById("plkt-next-page-btn"),o=Math.max(1,Math.ceil(R.totalCount/Ie));e&&(e.hidden=o<=1),t&&(t.textContent=xe(R.page,Ie,R.totalCount,R.data.length)),n&&(n.textContent=`${R.page} / ${o}`),a&&(a.disabled=R.page===1),r&&(r.disabled=R.page>=o)}async function ze(){R.loading=!0,Qn(),Yn();try{const[e,t]=await Promise.all([E(`/passengers-lkt?page=${R.page}&limit=${Ie}${R.search?`&search=${encodeURIComponent(R.search)}`:""}`),E(`/passengers-lkt/count${R.search?`?search=${encodeURIComponent(R.search)}`:""}`)]);R.data=Array.isArray(e)?e:[],R.totalCount=Number(t?.count||0)}catch(e){y(e.message||"Gagal memuat data","Error"),R.data=[],R.totalCount=0}finally{R.loading=!1,Qn(),Yn()}}async function ea(){const e=document.getElementById("plkt-loyalty-chart"),t=document.getElementById("plkt-chart-empty");if(e)try{const n=await E(`/passengers-lkt/loyalty-chart?limit=${R.chartLimit}`);if(!Array.isArray(n)||n.length===0){e.hidden=!0,t&&(t.hidden=!1);return}e.hidden=!1,t&&(t.hidden=!0);const a=n.map(i=>i.passenger_name+(i.phone&&i.phone!=="-"?` (${i.phone})`:"")),r=n.map(i=>i.booking_count),o=Math.max(...r,1),s=r.map(i=>{const m=i/o,l=Math.round(26+m*30),d=Math.round(35+m*80),u=Math.round(126+m*50);return`rgba(${l}, ${d}, ${u}, 0.85)`});We&&(We.destroy(),We=null),We=new window.Chart(e,{type:"bar",data:{labels:a,datasets:[{label:"Jumlah Pemesanan",data:r,backgroundColor:s,borderRadius:6,borderSkipped:!1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{title:i=>i[0].label,label:i=>` ${i.raw} kali pemesanan`}}},scales:{x:{ticks:{maxRotation:35,font:{size:11},color:"#374151"},grid:{display:!1}},y:{beginAtZero:!0,ticks:{stepSize:1,color:"#374151",font:{size:11}},grid:{color:"rgba(0,0,0,0.06)"}}}}})}catch{t&&(t.hidden=!1)}}function _i(){if(R.data.length===0){y("Tidak ada data untuk diekspor.");return}const e=["No","Nama Penumpang","No HP","Dari","Tujuan","Tanggal Berangkat","Jam","Tarif"],t=R.data.map((s,i)=>[(R.page-1)*Ie+i+1,s.passenger_name||"-",s.phone||"-",s.from_city||"-",s.to_city||"-",s.trip_date||"-",s.trip_time||"-",s.tarif||"-"]),n=[e,...t].map(s=>s.map(i=>`"${String(i).replace(/"/g,'""')}"`).join(",")).join(`
`),a=new Blob(["\uFEFF"+n],{type:"text/csv;charset=utf-8;"}),r=URL.createObjectURL(a),o=document.createElement("a");o.href=r,o.download="data-penumpang-lkt.csv",o.click(),URL.revokeObjectURL(r)}function Ti(){const e=document.getElementById("plkt-search-input"),t=document.getElementById("plkt-prev-page-btn"),n=document.getElementById("plkt-next-page-btn"),a=document.getElementById("plkt-export-btn"),r=document.getElementById("plkt-chart-limit");e?.addEventListener("input",Ce(async o=>{R.search=o.target.value.trim(),R.page=1,await ze().catch(()=>y("Gagal memuat data"))},400)),t?.addEventListener("click",async()=>{R.page<=1||(R.page-=1,await ze().catch(()=>y("Gagal memuat data")))}),n?.addEventListener("click",async()=>{const o=Math.max(1,Math.ceil(R.totalCount/Ie));R.page>=o||(R.page+=1,await ze().catch(()=>y("Gagal memuat data")))}),a?.addEventListener("click",_i),r?.addEventListener("change",async o=>{R.chartLimit=parseInt(o.target.value,10)||15,await ea().catch(()=>{})}),ze().catch(()=>y("Gagal memuat data")),ea().catch(()=>{})}const Li={"admin-users/index":Us,"auth/login":Mo,"bookings/index":gi,"dashboard/index":Jo,"drivers/index":ns,"mobil/index":ps,"keberangkatan/index":vs,"regular-bookings/index":bi,"regular-bookings/seats":hi,"stock/index":$s,"qr-scan/index":$i,"passengers-lkt/index":Ti};document.addEventListener("DOMContentLoaded",async()=>{To(),Ro(),tt(Ca());const e=Io();e&&(e.type==="success"?O(e.message,e.title):e.type==="info"?Lo(e.message,e.title):y(e.message,e.title));try{const{user:t}=await _o();t&&tt(t);const n=document.body.dataset.pageScript,a=Li[n];typeof a=="function"&&await a({user:t})}catch(t){console.error(t),y(t.message||"Terjadi kesalahan saat memuat halaman")}});
