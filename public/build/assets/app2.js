function ha(e,t){return function(){return e.apply(t,arguments)}}const{toString:co}=Object.prototype,{getPrototypeOf:Yt}=Object,{iterator:_t,toStringTag:ya}=Symbol,$t=(e=>t=>{const n=co.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),de=e=>(e=e.toLowerCase(),t=>$t(t)===e),St=e=>t=>typeof t===e,{isArray:Pe}=Array,Ae=St("undefined");function We(e){return e!==null&&!Ae(e)&&e.constructor!==null&&!Ae(e.constructor)&&ae(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const va=de("ArrayBuffer");function uo(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&va(e.buffer),t}const mo=St("string"),ae=St("function"),Ea=St("number"),Xe=e=>e!==null&&typeof e=="object",po=e=>e===!0||e===!1,it=e=>{if($t(e)!=="object")return!1;const t=Yt(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(ya in e)&&!(_t in e)},go=e=>{if(!Xe(e)||We(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},fo=de("Date"),bo=de("File"),ko=e=>!!(e&&typeof e.uri<"u"),ho=e=>e&&typeof e.getParts<"u",yo=de("Blob"),vo=de("FileList"),Eo=e=>Xe(e)&&ae(e.pipe);function wo(){return typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}}const hn=wo(),yn=typeof hn.FormData<"u"?hn.FormData:void 0,Bo=e=>{let t;return e&&(yn&&e instanceof yn||ae(e.append)&&((t=$t(e))==="formdata"||t==="object"&&ae(e.toString)&&e.toString()==="[object FormData]"))},Io=de("URLSearchParams"),[_o,$o,So,Co]=["ReadableStream","Request","Response","Headers"].map(de),xo=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function Ze(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let a,o;if(typeof e!="object"&&(e=[e]),Pe(e))for(a=0,o=e.length;a<o;a++)t.call(null,e[a],a,e);else{if(We(e))return;const r=n?Object.getOwnPropertyNames(e):Object.keys(e),s=r.length;let i;for(a=0;a<s;a++)i=r[a],t.call(null,e[i],i,e)}}function wa(e,t){if(We(e))return null;t=t.toLowerCase();const n=Object.keys(e);let a=n.length,o;for(;a-- >0;)if(o=n[a],t===o.toLowerCase())return o;return null}const ge=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,Ba=e=>!Ae(e)&&e!==ge;function Ft(){const{caseless:e,skipUndefined:t}=Ba(this)&&this||{},n={},a=(o,r)=>{if(r==="__proto__"||r==="constructor"||r==="prototype")return;const s=e&&wa(n,r)||r;it(n[s])&&it(o)?n[s]=Ft(n[s],o):it(o)?n[s]=Ft({},o):Pe(o)?n[s]=o.slice():(!t||!Ae(o))&&(n[s]=o)};for(let o=0,r=arguments.length;o<r;o++)arguments[o]&&Ze(arguments[o],a);return n}const To=(e,t,n,{allOwnKeys:a}={})=>(Ze(t,(o,r)=>{n&&ae(o)?Object.defineProperty(e,r,{value:ha(o,n),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(e,r,{value:o,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:a}),e),Lo=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),Ao=(e,t,n,a)=>{e.prototype=Object.create(t.prototype,a),Object.defineProperty(e.prototype,"constructor",{value:e,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},Mo=(e,t,n,a)=>{let o,r,s;const i={};if(t=t||{},e==null)return t;do{for(o=Object.getOwnPropertyNames(e),r=o.length;r-- >0;)s=o[r],(!a||a(s,e,t))&&!i[s]&&(t[s]=e[s],i[s]=!0);e=n!==!1&&Yt(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},Ro=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const a=e.indexOf(t,n);return a!==-1&&a===n},Po=e=>{if(!e)return null;if(Pe(e))return e;let t=e.length;if(!Ea(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},Do=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&Yt(Uint8Array)),Oo=(e,t)=>{const a=(e&&e[_t]).call(e);let o;for(;(o=a.next())&&!o.done;){const r=o.value;t.call(e,r[0],r[1])}},jo=(e,t)=>{let n;const a=[];for(;(n=e.exec(t))!==null;)a.push(n);return a},qo=de("HTMLFormElement"),No=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,a,o){return a.toUpperCase()+o}),vn=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),Uo=de("RegExp"),Ia=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),a={};Ze(n,(o,r)=>{let s;(s=t(o,r,e))!==!1&&(a[r]=s||o)}),Object.defineProperties(e,a)},Ho=e=>{Ia(e,(t,n)=>{if(ae(e)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const a=e[n];if(ae(a)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},Fo=(e,t)=>{const n={},a=o=>{o.forEach(r=>{n[r]=!0})};return Pe(e)?a(e):a(String(e).split(t)),n},Vo=()=>{},Go=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function Jo(e){return!!(e&&ae(e.append)&&e[ya]==="FormData"&&e[_t])}const Ko=e=>{const t=new Array(10),n=(a,o)=>{if(Xe(a)){if(t.indexOf(a)>=0)return;if(We(a))return a;if(!("toJSON"in a)){t[o]=a;const r=Pe(a)?[]:{};return Ze(a,(s,i)=>{const u=n(s,o+1);!Ae(u)&&(r[i]=u)}),t[o]=void 0,r}}return a};return n(e,0)},zo=de("AsyncFunction"),Wo=e=>e&&(Xe(e)||ae(e))&&ae(e.then)&&ae(e.catch),_a=((e,t)=>e?setImmediate:t?((n,a)=>(ge.addEventListener("message",({source:o,data:r})=>{o===ge&&r===n&&a.length&&a.shift()()},!1),o=>{a.push(o),ge.postMessage(n,"*")}))(`axios@${Math.random()}`,[]):n=>setTimeout(n))(typeof setImmediate=="function",ae(ge.postMessage)),Xo=typeof queueMicrotask<"u"?queueMicrotask.bind(ge):typeof process<"u"&&process.nextTick||_a,Zo=e=>e!=null&&ae(e[_t]),m={isArray:Pe,isArrayBuffer:va,isBuffer:We,isFormData:Bo,isArrayBufferView:uo,isString:mo,isNumber:Ea,isBoolean:po,isObject:Xe,isPlainObject:it,isEmptyObject:go,isReadableStream:_o,isRequest:$o,isResponse:So,isHeaders:Co,isUndefined:Ae,isDate:fo,isFile:bo,isReactNativeBlob:ko,isReactNative:ho,isBlob:yo,isRegExp:Uo,isFunction:ae,isStream:Eo,isURLSearchParams:Io,isTypedArray:Do,isFileList:vo,forEach:Ze,merge:Ft,extend:To,trim:xo,stripBOM:Lo,inherits:Ao,toFlatObject:Mo,kindOf:$t,kindOfTest:de,endsWith:Ro,toArray:Po,forEachEntry:Oo,matchAll:jo,isHTMLForm:qo,hasOwnProperty:vn,hasOwnProp:vn,reduceDescriptors:Ia,freezeMethods:Ho,toObjectSet:Fo,toCamelCase:No,noop:Vo,toFiniteNumber:Go,findKey:wa,global:ge,isContextDefined:Ba,isSpecCompliantForm:Jo,toJSONObject:Ko,isAsyncFn:zo,isThenable:Wo,setImmediate:_a,asap:Xo,isIterable:Zo};let S=class $a extends Error{static from(t,n,a,o,r,s){const i=new $a(t.message,n||t.code,a,o,r);return i.cause=t,i.name=t.name,t.status!=null&&i.status==null&&(i.status=t.status),s&&Object.assign(i,s),i}constructor(t,n,a,o,r){super(t),Object.defineProperty(this,"message",{value:t,enumerable:!0,writable:!0,configurable:!0}),this.name="AxiosError",this.isAxiosError=!0,n&&(this.code=n),a&&(this.config=a),o&&(this.request=o),r&&(this.response=r,this.status=r.status)}toJSON(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:m.toJSONObject(this.config),code:this.code,status:this.status}}};S.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";S.ERR_BAD_OPTION="ERR_BAD_OPTION";S.ECONNABORTED="ECONNABORTED";S.ETIMEDOUT="ETIMEDOUT";S.ERR_NETWORK="ERR_NETWORK";S.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";S.ERR_DEPRECATED="ERR_DEPRECATED";S.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";S.ERR_BAD_REQUEST="ERR_BAD_REQUEST";S.ERR_CANCELED="ERR_CANCELED";S.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";S.ERR_INVALID_URL="ERR_INVALID_URL";const Qo=null;function Vt(e){return m.isPlainObject(e)||m.isArray(e)}function Sa(e){return m.endsWith(e,"[]")?e.slice(0,-2):e}function Mt(e,t,n){return e?e.concat(t).map(function(o,r){return o=Sa(o),!n&&r?"["+o+"]":o}).join(n?".":""):t}function Yo(e){return m.isArray(e)&&!e.some(Vt)}const er=m.toFlatObject(m,{},null,function(t){return/^is[A-Z]/.test(t)});function Ct(e,t,n){if(!m.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=m.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(h,f){return!m.isUndefined(f[h])});const a=n.metaTokens,o=n.visitor||l,r=n.dots,s=n.indexes,u=(n.Blob||typeof Blob<"u"&&Blob)&&m.isSpecCompliantForm(t);if(!m.isFunction(o))throw new TypeError("visitor must be a function");function d(b){if(b===null)return"";if(m.isDate(b))return b.toISOString();if(m.isBoolean(b))return b.toString();if(!u&&m.isBlob(b))throw new S("Blob is not supported. Use a Buffer instead.");return m.isArrayBuffer(b)||m.isTypedArray(b)?u&&typeof Blob=="function"?new Blob([b]):Buffer.from(b):b}function l(b,h,f){let j=b;if(m.isReactNative(t)&&m.isReactNativeBlob(b))return t.append(Mt(f,h,r),d(b)),!1;if(b&&!f&&typeof b=="object"){if(m.endsWith(h,"{}"))h=a?h:h.slice(0,-2),b=JSON.stringify(b);else if(m.isArray(b)&&Yo(b)||(m.isFileList(b)||m.endsWith(h,"[]"))&&(j=m.toArray(b)))return h=Sa(h),j.forEach(function(y,B){!(m.isUndefined(y)||y===null)&&t.append(s===!0?Mt([h],B,r):s===null?h:h+"[]",d(y))}),!1}return Vt(b)?!0:(t.append(Mt(f,h,r),d(b)),!1)}const g=[],I=Object.assign(er,{defaultVisitor:l,convertValue:d,isVisitable:Vt});function O(b,h){if(!m.isUndefined(b)){if(g.indexOf(b)!==-1)throw Error("Circular reference detected in "+h.join("."));g.push(b),m.forEach(b,function(j,k){(!(m.isUndefined(j)||j===null)&&o.call(t,j,m.isString(k)?k.trim():k,h,I))===!0&&O(j,h?h.concat(k):[k])}),g.pop()}}if(!m.isObject(e))throw new TypeError("data must be an object");return O(e),t}function En(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(a){return t[a]})}function en(e,t){this._pairs=[],e&&Ct(e,this,t)}const Ca=en.prototype;Ca.append=function(t,n){this._pairs.push([t,n])};Ca.toString=function(t){const n=t?function(a){return t.call(this,a,En)}:En;return this._pairs.map(function(o){return n(o[0])+"="+n(o[1])},"").join("&")};function tr(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function xa(e,t,n){if(!t)return e;const a=n&&n.encode||tr,o=m.isFunction(n)?{serialize:n}:n,r=o&&o.serialize;let s;if(r?s=r(t,o):s=m.isURLSearchParams(t)?t.toString():new en(t,o).toString(a),s){const i=e.indexOf("#");i!==-1&&(e=e.slice(0,i)),e+=(e.indexOf("?")===-1?"?":"&")+s}return e}class wn{constructor(){this.handlers=[]}use(t,n,a){return this.handlers.push({fulfilled:t,rejected:n,synchronous:a?a.synchronous:!1,runWhen:a?a.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){m.forEach(this.handlers,function(a){a!==null&&t(a)})}}const tn={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0},nr=typeof URLSearchParams<"u"?URLSearchParams:en,ar=typeof FormData<"u"?FormData:null,or=typeof Blob<"u"?Blob:null,rr={isBrowser:!0,classes:{URLSearchParams:nr,FormData:ar,Blob:or},protocols:["http","https","file","blob","url","data"]},nn=typeof window<"u"&&typeof document<"u",Gt=typeof navigator=="object"&&navigator||void 0,sr=nn&&(!Gt||["ReactNative","NativeScript","NS"].indexOf(Gt.product)<0),ir=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",dr=nn&&window.location.href||"http://localhost",lr=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:nn,hasStandardBrowserEnv:sr,hasStandardBrowserWebWorkerEnv:ir,navigator:Gt,origin:dr},Symbol.toStringTag,{value:"Module"})),ne={...lr,...rr};function cr(e,t){return Ct(e,new ne.classes.URLSearchParams,{visitor:function(n,a,o,r){return ne.isNode&&m.isBuffer(n)?(this.append(a,n.toString("base64")),!1):r.defaultVisitor.apply(this,arguments)},...t})}function ur(e){return m.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function mr(e){const t={},n=Object.keys(e);let a;const o=n.length;let r;for(a=0;a<o;a++)r=n[a],t[r]=e[r];return t}function Ta(e){function t(n,a,o,r){let s=n[r++];if(s==="__proto__")return!0;const i=Number.isFinite(+s),u=r>=n.length;return s=!s&&m.isArray(o)?o.length:s,u?(m.hasOwnProp(o,s)?o[s]=[o[s],a]:o[s]=a,!i):((!o[s]||!m.isObject(o[s]))&&(o[s]=[]),t(n,a,o[s],r)&&m.isArray(o[s])&&(o[s]=mr(o[s])),!i)}if(m.isFormData(e)&&m.isFunction(e.entries)){const n={};return m.forEachEntry(e,(a,o)=>{t(ur(a),o,n,0)}),n}return null}function pr(e,t,n){if(m.isString(e))try{return(t||JSON.parse)(e),m.trim(e)}catch(a){if(a.name!=="SyntaxError")throw a}return(n||JSON.stringify)(e)}const Qe={transitional:tn,adapter:["xhr","http","fetch"],transformRequest:[function(t,n){const a=n.getContentType()||"",o=a.indexOf("application/json")>-1,r=m.isObject(t);if(r&&m.isHTMLForm(t)&&(t=new FormData(t)),m.isFormData(t))return o?JSON.stringify(Ta(t)):t;if(m.isArrayBuffer(t)||m.isBuffer(t)||m.isStream(t)||m.isFile(t)||m.isBlob(t)||m.isReadableStream(t))return t;if(m.isArrayBufferView(t))return t.buffer;if(m.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let i;if(r){if(a.indexOf("application/x-www-form-urlencoded")>-1)return cr(t,this.formSerializer).toString();if((i=m.isFileList(t))||a.indexOf("multipart/form-data")>-1){const u=this.env&&this.env.FormData;return Ct(i?{"files[]":t}:t,u&&new u,this.formSerializer)}}return r||o?(n.setContentType("application/json",!1),pr(t)):t}],transformResponse:[function(t){const n=this.transitional||Qe.transitional,a=n&&n.forcedJSONParsing,o=this.responseType==="json";if(m.isResponse(t)||m.isReadableStream(t))return t;if(t&&m.isString(t)&&(a&&!this.responseType||o)){const s=!(n&&n.silentJSONParsing)&&o;try{return JSON.parse(t,this.parseReviver)}catch(i){if(s)throw i.name==="SyntaxError"?S.from(i,S.ERR_BAD_RESPONSE,this,null,this.response):i}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:ne.classes.FormData,Blob:ne.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};m.forEach(["delete","get","head","post","put","patch"],e=>{Qe.headers[e]={}});const gr=m.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),fr=e=>{const t={};let n,a,o;return e&&e.split(`
`).forEach(function(s){o=s.indexOf(":"),n=s.substring(0,o).trim().toLowerCase(),a=s.substring(o+1).trim(),!(!n||t[n]&&gr[n])&&(n==="set-cookie"?t[n]?t[n].push(a):t[n]=[a]:t[n]=t[n]?t[n]+", "+a:a)}),t},Bn=Symbol("internals");function je(e){return e&&String(e).trim().toLowerCase()}function dt(e){return e===!1||e==null?e:m.isArray(e)?e.map(dt):String(e)}function br(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let a;for(;a=n.exec(e);)t[a[1]]=a[2];return t}const kr=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function Rt(e,t,n,a,o){if(m.isFunction(a))return a.call(this,t,n);if(o&&(t=n),!!m.isString(t)){if(m.isString(a))return t.indexOf(a)!==-1;if(m.isRegExp(a))return a.test(t)}}function hr(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,a)=>n.toUpperCase()+a)}function yr(e,t){const n=m.toCamelCase(" "+t);["get","set","has"].forEach(a=>{Object.defineProperty(e,a+n,{value:function(o,r,s){return this[a].call(this,t,o,r,s)},configurable:!0})})}let oe=class{constructor(t){t&&this.set(t)}set(t,n,a){const o=this;function r(i,u,d){const l=je(u);if(!l)throw new Error("header name must be a non-empty string");const g=m.findKey(o,l);(!g||o[g]===void 0||d===!0||d===void 0&&o[g]!==!1)&&(o[g||u]=dt(i))}const s=(i,u)=>m.forEach(i,(d,l)=>r(d,l,u));if(m.isPlainObject(t)||t instanceof this.constructor)s(t,n);else if(m.isString(t)&&(t=t.trim())&&!kr(t))s(fr(t),n);else if(m.isObject(t)&&m.isIterable(t)){let i={},u,d;for(const l of t){if(!m.isArray(l))throw TypeError("Object iterator must return a key-value pair");i[d=l[0]]=(u=i[d])?m.isArray(u)?[...u,l[1]]:[u,l[1]]:l[1]}s(i,n)}else t!=null&&r(n,t,a);return this}get(t,n){if(t=je(t),t){const a=m.findKey(this,t);if(a){const o=this[a];if(!n)return o;if(n===!0)return br(o);if(m.isFunction(n))return n.call(this,o,a);if(m.isRegExp(n))return n.exec(o);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=je(t),t){const a=m.findKey(this,t);return!!(a&&this[a]!==void 0&&(!n||Rt(this,this[a],a,n)))}return!1}delete(t,n){const a=this;let o=!1;function r(s){if(s=je(s),s){const i=m.findKey(a,s);i&&(!n||Rt(a,a[i],i,n))&&(delete a[i],o=!0)}}return m.isArray(t)?t.forEach(r):r(t),o}clear(t){const n=Object.keys(this);let a=n.length,o=!1;for(;a--;){const r=n[a];(!t||Rt(this,this[r],r,t,!0))&&(delete this[r],o=!0)}return o}normalize(t){const n=this,a={};return m.forEach(this,(o,r)=>{const s=m.findKey(a,r);if(s){n[s]=dt(o),delete n[r];return}const i=t?hr(r):String(r).trim();i!==r&&delete n[r],n[i]=dt(o),a[i]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return m.forEach(this,(a,o)=>{a!=null&&a!==!1&&(n[o]=t&&m.isArray(a)?a.join(", "):a)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const a=new this(t);return n.forEach(o=>a.set(o)),a}static accessor(t){const a=(this[Bn]=this[Bn]={accessors:{}}).accessors,o=this.prototype;function r(s){const i=je(s);a[i]||(yr(o,s),a[i]=!0)}return m.isArray(t)?t.forEach(r):r(t),this}};oe.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);m.reduceDescriptors(oe.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(a){this[n]=a}}});m.freezeMethods(oe);function Pt(e,t){const n=this||Qe,a=t||n,o=oe.from(a.headers);let r=a.data;return m.forEach(e,function(i){r=i.call(n,r,o.normalize(),t?t.status:void 0)}),o.normalize(),r}function La(e){return!!(e&&e.__CANCEL__)}let Ye=class extends S{constructor(t,n,a){super(t??"canceled",S.ERR_CANCELED,n,a),this.name="CanceledError",this.__CANCEL__=!0}};function Aa(e,t,n){const a=n.config.validateStatus;!n.status||!a||a(n.status)?e(n):t(new S("Request failed with status code "+n.status,[S.ERR_BAD_REQUEST,S.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}function vr(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function Er(e,t){e=e||10;const n=new Array(e),a=new Array(e);let o=0,r=0,s;return t=t!==void 0?t:1e3,function(u){const d=Date.now(),l=a[r];s||(s=d),n[o]=u,a[o]=d;let g=r,I=0;for(;g!==o;)I+=n[g++],g=g%e;if(o=(o+1)%e,o===r&&(r=(r+1)%e),d-s<t)return;const O=l&&d-l;return O?Math.round(I*1e3/O):void 0}}function wr(e,t){let n=0,a=1e3/t,o,r;const s=(d,l=Date.now())=>{n=l,o=null,r&&(clearTimeout(r),r=null),e(...d)};return[(...d)=>{const l=Date.now(),g=l-n;g>=a?s(d,l):(o=d,r||(r=setTimeout(()=>{r=null,s(o)},a-g)))},()=>o&&s(o)]}const ut=(e,t,n=3)=>{let a=0;const o=Er(50,250);return wr(r=>{const s=r.loaded,i=r.lengthComputable?r.total:void 0,u=s-a,d=o(u),l=s<=i;a=s;const g={loaded:s,total:i,progress:i?s/i:void 0,bytes:u,rate:d||void 0,estimated:d&&i&&l?(i-s)/d:void 0,event:r,lengthComputable:i!=null,[t?"download":"upload"]:!0};e(g)},n)},In=(e,t)=>{const n=e!=null;return[a=>t[0]({lengthComputable:n,total:e,loaded:a}),t[1]]},_n=e=>(...t)=>m.asap(()=>e(...t)),Br=ne.hasStandardBrowserEnv?((e,t)=>n=>(n=new URL(n,ne.origin),e.protocol===n.protocol&&e.host===n.host&&(t||e.port===n.port)))(new URL(ne.origin),ne.navigator&&/(msie|trident)/i.test(ne.navigator.userAgent)):()=>!0,Ir=ne.hasStandardBrowserEnv?{write(e,t,n,a,o,r,s){if(typeof document>"u")return;const i=[`${e}=${encodeURIComponent(t)}`];m.isNumber(n)&&i.push(`expires=${new Date(n).toUTCString()}`),m.isString(a)&&i.push(`path=${a}`),m.isString(o)&&i.push(`domain=${o}`),r===!0&&i.push("secure"),m.isString(s)&&i.push(`SameSite=${s}`),document.cookie=i.join("; ")},read(e){if(typeof document>"u")return null;const t=document.cookie.match(new RegExp("(?:^|; )"+e+"=([^;]*)"));return t?decodeURIComponent(t[1]):null},remove(e){this.write(e,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function _r(e){return typeof e!="string"?!1:/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function $r(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function Ma(e,t,n){let a=!_r(t);return e&&(a||n==!1)?$r(e,t):t}const $n=e=>e instanceof oe?{...e}:e;function ke(e,t){t=t||{};const n={};function a(d,l,g,I){return m.isPlainObject(d)&&m.isPlainObject(l)?m.merge.call({caseless:I},d,l):m.isPlainObject(l)?m.merge({},l):m.isArray(l)?l.slice():l}function o(d,l,g,I){if(m.isUndefined(l)){if(!m.isUndefined(d))return a(void 0,d,g,I)}else return a(d,l,g,I)}function r(d,l){if(!m.isUndefined(l))return a(void 0,l)}function s(d,l){if(m.isUndefined(l)){if(!m.isUndefined(d))return a(void 0,d)}else return a(void 0,l)}function i(d,l,g){if(g in t)return a(d,l);if(g in e)return a(void 0,d)}const u={url:r,method:r,data:r,baseURL:s,transformRequest:s,transformResponse:s,paramsSerializer:s,timeout:s,timeoutMessage:s,withCredentials:s,withXSRFToken:s,adapter:s,responseType:s,xsrfCookieName:s,xsrfHeaderName:s,onUploadProgress:s,onDownloadProgress:s,decompress:s,maxContentLength:s,maxBodyLength:s,beforeRedirect:s,transport:s,httpAgent:s,httpsAgent:s,cancelToken:s,socketPath:s,responseEncoding:s,validateStatus:i,headers:(d,l,g)=>o($n(d),$n(l),g,!0)};return m.forEach(Object.keys({...e,...t}),function(l){if(l==="__proto__"||l==="constructor"||l==="prototype")return;const g=m.hasOwnProp(u,l)?u[l]:o,I=g(e[l],t[l],l);m.isUndefined(I)&&g!==i||(n[l]=I)}),n}const Ra=e=>{const t=ke({},e);let{data:n,withXSRFToken:a,xsrfHeaderName:o,xsrfCookieName:r,headers:s,auth:i}=t;if(t.headers=s=oe.from(s),t.url=xa(Ma(t.baseURL,t.url,t.allowAbsoluteUrls),e.params,e.paramsSerializer),i&&s.set("Authorization","Basic "+btoa((i.username||"")+":"+(i.password?unescape(encodeURIComponent(i.password)):""))),m.isFormData(n)){if(ne.hasStandardBrowserEnv||ne.hasStandardBrowserWebWorkerEnv)s.setContentType(void 0);else if(m.isFunction(n.getHeaders)){const u=n.getHeaders(),d=["content-type","content-length"];Object.entries(u).forEach(([l,g])=>{d.includes(l.toLowerCase())&&s.set(l,g)})}}if(ne.hasStandardBrowserEnv&&(a&&m.isFunction(a)&&(a=a(t)),a||a!==!1&&Br(t.url))){const u=o&&r&&Ir.read(r);u&&s.set(o,u)}return t},Sr=typeof XMLHttpRequest<"u",Cr=Sr&&function(e){return new Promise(function(n,a){const o=Ra(e);let r=o.data;const s=oe.from(o.headers).normalize();let{responseType:i,onUploadProgress:u,onDownloadProgress:d}=o,l,g,I,O,b;function h(){O&&O(),b&&b(),o.cancelToken&&o.cancelToken.unsubscribe(l),o.signal&&o.signal.removeEventListener("abort",l)}let f=new XMLHttpRequest;f.open(o.method.toUpperCase(),o.url,!0),f.timeout=o.timeout;function j(){if(!f)return;const y=oe.from("getAllResponseHeaders"in f&&f.getAllResponseHeaders()),P={data:!i||i==="text"||i==="json"?f.responseText:f.response,status:f.status,statusText:f.statusText,headers:y,config:e,request:f};Aa(function(N){n(N),h()},function(N){a(N),h()},P),f=null}"onloadend"in f?f.onloadend=j:f.onreadystatechange=function(){!f||f.readyState!==4||f.status===0&&!(f.responseURL&&f.responseURL.indexOf("file:")===0)||setTimeout(j)},f.onabort=function(){f&&(a(new S("Request aborted",S.ECONNABORTED,e,f)),f=null)},f.onerror=function(B){const P=B&&B.message?B.message:"Network Error",C=new S(P,S.ERR_NETWORK,e,f);C.event=B||null,a(C),f=null},f.ontimeout=function(){let B=o.timeout?"timeout of "+o.timeout+"ms exceeded":"timeout exceeded";const P=o.transitional||tn;o.timeoutErrorMessage&&(B=o.timeoutErrorMessage),a(new S(B,P.clarifyTimeoutError?S.ETIMEDOUT:S.ECONNABORTED,e,f)),f=null},r===void 0&&s.setContentType(null),"setRequestHeader"in f&&m.forEach(s.toJSON(),function(B,P){f.setRequestHeader(P,B)}),m.isUndefined(o.withCredentials)||(f.withCredentials=!!o.withCredentials),i&&i!=="json"&&(f.responseType=o.responseType),d&&([I,b]=ut(d,!0),f.addEventListener("progress",I)),u&&f.upload&&([g,O]=ut(u),f.upload.addEventListener("progress",g),f.upload.addEventListener("loadend",O)),(o.cancelToken||o.signal)&&(l=y=>{f&&(a(!y||y.type?new Ye(null,e,f):y),f.abort(),f=null)},o.cancelToken&&o.cancelToken.subscribe(l),o.signal&&(o.signal.aborted?l():o.signal.addEventListener("abort",l)));const k=vr(o.url);if(k&&ne.protocols.indexOf(k)===-1){a(new S("Unsupported protocol "+k+":",S.ERR_BAD_REQUEST,e));return}f.send(r||null)})},xr=(e,t)=>{const{length:n}=e=e?e.filter(Boolean):[];if(t||n){let a=new AbortController,o;const r=function(d){if(!o){o=!0,i();const l=d instanceof Error?d:this.reason;a.abort(l instanceof S?l:new Ye(l instanceof Error?l.message:l))}};let s=t&&setTimeout(()=>{s=null,r(new S(`timeout of ${t}ms exceeded`,S.ETIMEDOUT))},t);const i=()=>{e&&(s&&clearTimeout(s),s=null,e.forEach(d=>{d.unsubscribe?d.unsubscribe(r):d.removeEventListener("abort",r)}),e=null)};e.forEach(d=>d.addEventListener("abort",r));const{signal:u}=a;return u.unsubscribe=()=>m.asap(i),u}},Tr=function*(e,t){let n=e.byteLength;if(n<t){yield e;return}let a=0,o;for(;a<n;)o=a+t,yield e.slice(a,o),a=o},Lr=async function*(e,t){for await(const n of Ar(e))yield*Tr(n,t)},Ar=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:n,value:a}=await t.read();if(n)break;yield a}}finally{await t.cancel()}},Sn=(e,t,n,a)=>{const o=Lr(e,t);let r=0,s,i=u=>{s||(s=!0,a&&a(u))};return new ReadableStream({async pull(u){try{const{done:d,value:l}=await o.next();if(d){i(),u.close();return}let g=l.byteLength;if(n){let I=r+=g;n(I)}u.enqueue(new Uint8Array(l))}catch(d){throw i(d),d}},cancel(u){return i(u),o.return()}},{highWaterMark:2})},Cn=64*1024,{isFunction:nt}=m,Mr=(({Request:e,Response:t})=>({Request:e,Response:t}))(m.global),{ReadableStream:xn,TextEncoder:Tn}=m.global,Ln=(e,...t)=>{try{return!!e(...t)}catch{return!1}},Rr=e=>{e=m.merge.call({skipUndefined:!0},Mr,e);const{fetch:t,Request:n,Response:a}=e,o=t?nt(t):typeof fetch=="function",r=nt(n),s=nt(a);if(!o)return!1;const i=o&&nt(xn),u=o&&(typeof Tn=="function"?(b=>h=>b.encode(h))(new Tn):async b=>new Uint8Array(await new n(b).arrayBuffer())),d=r&&i&&Ln(()=>{let b=!1;const h=new n(ne.origin,{body:new xn,method:"POST",get duplex(){return b=!0,"half"}}).headers.has("Content-Type");return b&&!h}),l=s&&i&&Ln(()=>m.isReadableStream(new a("").body)),g={stream:l&&(b=>b.body)};o&&["text","arrayBuffer","blob","formData","stream"].forEach(b=>{!g[b]&&(g[b]=(h,f)=>{let j=h&&h[b];if(j)return j.call(h);throw new S(`Response type '${b}' is not supported`,S.ERR_NOT_SUPPORT,f)})});const I=async b=>{if(b==null)return 0;if(m.isBlob(b))return b.size;if(m.isSpecCompliantForm(b))return(await new n(ne.origin,{method:"POST",body:b}).arrayBuffer()).byteLength;if(m.isArrayBufferView(b)||m.isArrayBuffer(b))return b.byteLength;if(m.isURLSearchParams(b)&&(b=b+""),m.isString(b))return(await u(b)).byteLength},O=async(b,h)=>{const f=m.toFiniteNumber(b.getContentLength());return f??I(h)};return async b=>{let{url:h,method:f,data:j,signal:k,cancelToken:y,timeout:B,onDownloadProgress:P,onUploadProgress:C,responseType:N,headers:V,withCredentials:K="same-origin",fetchOptions:z}=Ra(b),R=t||fetch;N=N?(N+"").toLowerCase():"text";let w=xr([k,y&&y.toAbortSignal()],B),A=null;const U=w&&w.unsubscribe&&(()=>{w.unsubscribe()});let te;try{if(C&&d&&f!=="get"&&f!=="head"&&(te=await O(V,j))!==0){let ie=new n(h,{method:"POST",body:j,duplex:"half"}),Ee;if(m.isFormData(j)&&(Ee=ie.headers.get("content-type"))&&V.setContentType(Ee),ie.body){const[At,tt]=In(te,ut(_n(C)));j=Sn(ie.body,Cn,At,tt)}}m.isString(K)||(K=K?"include":"omit");const W=r&&"credentials"in n.prototype,X={...z,signal:w,method:f.toUpperCase(),headers:V.normalize().toJSON(),body:j,duplex:"half",credentials:W?K:void 0};A=r&&new n(h,X);let Z=await(r?R(A,z):R(h,X));const Q=l&&(N==="stream"||N==="response");if(l&&(P||Q&&U)){const ie={};["status","statusText","headers"].forEach(kn=>{ie[kn]=Z[kn]});const Ee=m.toFiniteNumber(Z.headers.get("content-length")),[At,tt]=P&&In(Ee,ut(_n(P),!0))||[];Z=new a(Sn(Z.body,Cn,At,()=>{tt&&tt(),U&&U()}),ie)}N=N||"text";let Oe=await g[m.findKey(g,N)||"text"](Z,b);return!Q&&U&&U(),await new Promise((ie,Ee)=>{Aa(ie,Ee,{data:Oe,headers:oe.from(Z.headers),status:Z.status,statusText:Z.statusText,config:b,request:A})})}catch(W){throw U&&U(),W&&W.name==="TypeError"&&/Load failed|fetch/i.test(W.message)?Object.assign(new S("Network Error",S.ERR_NETWORK,b,A,W&&W.response),{cause:W.cause||W}):S.from(W,W&&W.code,b,A,W&&W.response)}}},Pr=new Map,Pa=e=>{let t=e&&e.env||{};const{fetch:n,Request:a,Response:o}=t,r=[a,o,n];let s=r.length,i=s,u,d,l=Pr;for(;i--;)u=r[i],d=l.get(u),d===void 0&&l.set(u,d=i?new Map:Rr(t)),l=d;return d};Pa();const an={http:Qo,xhr:Cr,fetch:{get:Pa}};m.forEach(an,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const An=e=>`- ${e}`,Dr=e=>m.isFunction(e)||e===null||e===!1;function Or(e,t){e=m.isArray(e)?e:[e];const{length:n}=e;let a,o;const r={};for(let s=0;s<n;s++){a=e[s];let i;if(o=a,!Dr(a)&&(o=an[(i=String(a)).toLowerCase()],o===void 0))throw new S(`Unknown adapter '${i}'`);if(o&&(m.isFunction(o)||(o=o.get(t))))break;r[i||"#"+s]=o}if(!o){const s=Object.entries(r).map(([u,d])=>`adapter ${u} `+(d===!1?"is not supported by the environment":"is not available in the build"));let i=n?s.length>1?`since :
`+s.map(An).join(`
`):" "+An(s[0]):"as no adapter specified";throw new S("There is no suitable adapter to dispatch the request "+i,"ERR_NOT_SUPPORT")}return o}const Da={getAdapter:Or,adapters:an};function Dt(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new Ye(null,e)}function Mn(e){return Dt(e),e.headers=oe.from(e.headers),e.data=Pt.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),Da.getAdapter(e.adapter||Qe.adapter,e)(e).then(function(a){return Dt(e),a.data=Pt.call(e,e.transformResponse,a),a.headers=oe.from(a.headers),a},function(a){return La(a)||(Dt(e),a&&a.response&&(a.response.data=Pt.call(e,e.transformResponse,a.response),a.response.headers=oe.from(a.response.headers))),Promise.reject(a)})}const Oa="1.13.6",xt={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{xt[e]=function(a){return typeof a===e||"a"+(t<1?"n ":" ")+e}});const Rn={};xt.transitional=function(t,n,a){function o(r,s){return"[Axios v"+Oa+"] Transitional option '"+r+"'"+s+(a?". "+a:"")}return(r,s,i)=>{if(t===!1)throw new S(o(s," has been removed"+(n?" in "+n:"")),S.ERR_DEPRECATED);return n&&!Rn[s]&&(Rn[s]=!0,console.warn(o(s," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(r,s,i):!0}};xt.spelling=function(t){return(n,a)=>(console.warn(`${a} is likely a misspelling of ${t}`),!0)};function jr(e,t,n){if(typeof e!="object")throw new S("options must be an object",S.ERR_BAD_OPTION_VALUE);const a=Object.keys(e);let o=a.length;for(;o-- >0;){const r=a[o],s=t[r];if(s){const i=e[r],u=i===void 0||s(i,r,e);if(u!==!0)throw new S("option "+r+" must be "+u,S.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new S("Unknown option "+r,S.ERR_BAD_OPTION)}}const lt={assertOptions:jr,validators:xt},re=lt.validators;let fe=class{constructor(t){this.defaults=t||{},this.interceptors={request:new wn,response:new wn}}async request(t,n){try{return await this._request(t,n)}catch(a){if(a instanceof Error){let o={};Error.captureStackTrace?Error.captureStackTrace(o):o=new Error;const r=o.stack?o.stack.replace(/^.+\n/,""):"";try{a.stack?r&&!String(a.stack).endsWith(r.replace(/^.+\n.+\n/,""))&&(a.stack+=`
`+r):a.stack=r}catch{}}throw a}}_request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=ke(this.defaults,n);const{transitional:a,paramsSerializer:o,headers:r}=n;a!==void 0&&lt.assertOptions(a,{silentJSONParsing:re.transitional(re.boolean),forcedJSONParsing:re.transitional(re.boolean),clarifyTimeoutError:re.transitional(re.boolean),legacyInterceptorReqResOrdering:re.transitional(re.boolean)},!1),o!=null&&(m.isFunction(o)?n.paramsSerializer={serialize:o}:lt.assertOptions(o,{encode:re.function,serialize:re.function},!0)),n.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?n.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:n.allowAbsoluteUrls=!0),lt.assertOptions(n,{baseUrl:re.spelling("baseURL"),withXsrfToken:re.spelling("withXSRFToken")},!0),n.method=(n.method||this.defaults.method||"get").toLowerCase();let s=r&&m.merge(r.common,r[n.method]);r&&m.forEach(["delete","get","head","post","put","patch","common"],b=>{delete r[b]}),n.headers=oe.concat(s,r);const i=[];let u=!0;this.interceptors.request.forEach(function(h){if(typeof h.runWhen=="function"&&h.runWhen(n)===!1)return;u=u&&h.synchronous;const f=n.transitional||tn;f&&f.legacyInterceptorReqResOrdering?i.unshift(h.fulfilled,h.rejected):i.push(h.fulfilled,h.rejected)});const d=[];this.interceptors.response.forEach(function(h){d.push(h.fulfilled,h.rejected)});let l,g=0,I;if(!u){const b=[Mn.bind(this),void 0];for(b.unshift(...i),b.push(...d),I=b.length,l=Promise.resolve(n);g<I;)l=l.then(b[g++],b[g++]);return l}I=i.length;let O=n;for(;g<I;){const b=i[g++],h=i[g++];try{O=b(O)}catch(f){h.call(this,f);break}}try{l=Mn.call(this,O)}catch(b){return Promise.reject(b)}for(g=0,I=d.length;g<I;)l=l.then(d[g++],d[g++]);return l}getUri(t){t=ke(this.defaults,t);const n=Ma(t.baseURL,t.url,t.allowAbsoluteUrls);return xa(n,t.params,t.paramsSerializer)}};m.forEach(["delete","get","head","options"],function(t){fe.prototype[t]=function(n,a){return this.request(ke(a||{},{method:t,url:n,data:(a||{}).data}))}});m.forEach(["post","put","patch"],function(t){function n(a){return function(r,s,i){return this.request(ke(i||{},{method:t,headers:a?{"Content-Type":"multipart/form-data"}:{},url:r,data:s}))}}fe.prototype[t]=n(),fe.prototype[t+"Form"]=n(!0)});let qr=class ja{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(r){n=r});const a=this;this.promise.then(o=>{if(!a._listeners)return;let r=a._listeners.length;for(;r-- >0;)a._listeners[r](o);a._listeners=null}),this.promise.then=o=>{let r;const s=new Promise(i=>{a.subscribe(i),r=i}).then(o);return s.cancel=function(){a.unsubscribe(r)},s},t(function(r,s,i){a.reason||(a.reason=new Ye(r,s,i),n(a.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}toAbortSignal(){const t=new AbortController,n=a=>{t.abort(a)};return this.subscribe(n),t.signal.unsubscribe=()=>this.unsubscribe(n),t.signal}static source(){let t;return{token:new ja(function(o){t=o}),cancel:t}}};function Nr(e){return function(n){return e.apply(null,n)}}function Ur(e){return m.isObject(e)&&e.isAxiosError===!0}const Jt={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(Jt).forEach(([e,t])=>{Jt[t]=e});function qa(e){const t=new fe(e),n=ha(fe.prototype.request,t);return m.extend(n,fe.prototype,t,{allOwnKeys:!0}),m.extend(n,t,null,{allOwnKeys:!0}),n.create=function(o){return qa(ke(e,o))},n}const Y=qa(Qe);Y.Axios=fe;Y.CanceledError=Ye;Y.CancelToken=qr;Y.isCancel=La;Y.VERSION=Oa;Y.toFormData=Ct;Y.AxiosError=S;Y.Cancel=Y.CanceledError;Y.all=function(t){return Promise.all(t)};Y.spread=Nr;Y.isAxiosError=Ur;Y.mergeConfig=ke;Y.AxiosHeaders=oe;Y.formToJSON=e=>Ta(m.isHTMLForm(e)?new FormData(e):e);Y.getAdapter=Da.getAdapter;Y.HttpStatusCode=Jt;Y.default=Y;const{Axios:Nd,AxiosError:Ud,CanceledError:Hd,isCancel:Fd,CancelToken:Vd,VERSION:Gd,all:Jd,Cancel:Kd,isAxiosError:zd,spread:Wd,toFormData:Xd,AxiosHeaders:Zd,HttpStatusCode:Qd,formToJSON:Yd,getAdapter:el,mergeConfig:tl}=Y;window.axios=Y;window.axios.defaults.headers.common["X-Requested-With"]="XMLHttpRequest";const on="transit_user",ce="transit_token",Kt="transit_pending_toast";function De(){try{return typeof window<"u"&&typeof window.localStorage<"u"}catch{return!1}}function Na(){try{return typeof window<"u"&&typeof window.sessionStorage<"u"}catch{return!1}}function Hr(){if(window.transitAuthUser)return window.transitAuthUser;if(!De())return null;const e=window.localStorage.getItem(on);if(!e)return null;try{return JSON.parse(e)}catch{return Ve(),null}}function Ua(e){if(!De()){window.transitAuthUser=e;return}window.transitAuthUser=e,window.localStorage.setItem(on,JSON.stringify(e))}function Fr(){if(!De()){window.transitAuthUser=null;return}window.transitAuthUser=null,window.localStorage.removeItem(on)}function rn(){return typeof window<"u"&&typeof window.transitAuthToken=="string"&&window.transitAuthToken!==""?window.transitAuthToken:De()?window.localStorage.getItem(ce):null}function Vr(e){const t=typeof e=="string"?e:"";if(!De()){window.transitAuthToken=t||null;return}if(window.transitAuthToken=t||null,t===""){window.localStorage.removeItem(ce),document.cookie=ce+"=; path=/; max-age=0; samesite=lax";return}window.localStorage.setItem(ce,t),document.cookie=ce+"="+t+"; path=/; max-age=86400; samesite=lax"}function Gr(){if(!De()){window.transitAuthToken=null,document.cookie=ce+"=; path=/; max-age=0; samesite=lax";return}window.transitAuthToken=null,window.localStorage.removeItem(ce),document.cookie=ce+"=; path=/; max-age=0; samesite=lax"}function Jr(e){Na()&&window.sessionStorage.setItem(Kt,JSON.stringify(e))}function Kr(){if(!Na())return null;const e=window.sessionStorage.getItem(Kt);if(!e)return null;window.sessionStorage.removeItem(Kt);try{return JSON.parse(e)}catch{return null}}function Ve(){Fr(),Gr()}function Ha(e,t){if(!e)return t;if(typeof e.detail=="string"&&e.detail!=="")return e.detail;if(typeof e.message=="string"&&e.message!=="")return e.message;if(e.errors&&typeof e.errors=="object"){const n=Object.values(e.errors).flat()[0];if(typeof n=="string"&&n!=="")return n}return t}function Pn(){return document.body.dataset.apiBase||"/api"}function Fa(e=""){const t=String(e).replace(/^\/+/,"");return t===""?Pn():`${Pn()}/${t}`}async function E(e,t={}){const{method:n="GET",body:a=null,headers:o={},auth:r=!0}=t,s=new Headers(o);s.set("Accept","application/json"),s.set("X-Requested-With","XMLHttpRequest");let i=a;if(a&&!(a instanceof FormData)&&!(a instanceof Blob)&&(s.set("Content-Type","application/json"),i=JSON.stringify(a)),r){const g=rn();g&&s.set("Authorization",`Bearer ${g}`)}if(!["GET","HEAD","OPTIONS"].includes(n.toUpperCase())){const g=document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");g&&s.set("X-CSRF-TOKEN",g)}const u=await fetch(Fa(e),{method:n,headers:s,body:i,credentials:"same-origin"});let d=null;const l=u.headers.get("content-type")||"";if(u.status!==204&&(d=l.includes("application/json")?await u.json():await u.text()),!u.ok){u.status===401&&(Ve(),(document.body.dataset.routeGuard||"none")==="protected"&&window.location.replace(document.body.dataset.loginUrl||"/login"));const g=Ha(d,`Request gagal (${u.status})`),I=new Error(g);throw I.status=u.status,I.data=d,I}return d}async function sn(e,t="export.csv"){const n=new Headers({Accept:"text/csv,application/octet-stream","X-Requested-With":"XMLHttpRequest"}),a=rn();a&&n.set("Authorization",`Bearer ${a}`);const o=await fetch(Fa(e),{method:"GET",headers:n,credentials:"same-origin"});if(!o.ok){let g=null;throw(o.headers.get("content-type")||"").includes("application/json")&&(g=await o.json()),new Error(Ha(g,"Gagal mengunduh file"))}const r=await o.blob(),u=(o.headers.get("content-disposition")||"").match(/filename="?([^"]+)"?/i)?.[1]||t,d=window.URL.createObjectURL(r),l=document.createElement("a");l.href=d,l.download=u,document.body.appendChild(l),l.click(),l.remove(),window.URL.revokeObjectURL(d)}function qe(e,t){const n=document.getElementById(e);n&&(n.textContent=t)}function zr(e){const t=e?.role||"";document.querySelectorAll("[data-role-scope]").forEach(n=>{const a=n.dataset.roleScope,o=a==="admin"?["Super Admin","Admin"].includes(t):a==="super"?t==="Super Admin":!0;n.hidden=!o})}function Va(){return Hr()}function mt(e){if(zr(e),!e)return;const t=e.nama||"Admin",n=t.trim().split(/\s+/)[0]||"Admin",a=e.email||"admin@pekanbaru.com";qe("sidebar-user-name",t),qe("sidebar-user-email",a),qe("header-user-name",n),qe("dropdown-user-name",t),qe("dropdown-user-email",a)}function Ga(e){return typeof e.access_token=="string"&&e.access_token!==""&&Vr(e.access_token),Ua(e.user),mt(e.user),e}async function Wr(e){const t=await E("/auth/login",{method:"POST",body:e,auth:!1});return Ga(t)}async function Xr(e){const t=await E("/auth/register",{method:"POST",body:e,auth:!1});return Ga(t)}async function Dn(){const e=await E("/auth/me");return Ua(e),mt(e),e}async function Zr(){try{await E("/auth/logout",{method:"POST"})}catch(e){if(e?.status!==401)throw e}Ve(),Jr({type:"success",title:"Logout berhasil",message:"Sampai jumpa kembali!"}),window.location.replace(document.body.dataset.loginUrl||"/login")}function On(e){window.location.replace(e)}async function Qr(){const e=document.body.dataset.routeGuard||"none",t=document.body.dataset.loginUrl||"/login",n=document.body.dataset.dashboardUrl||"/dashboard",a=Va();if(e==="public"){try{const o=await Dn();return On(n),{user:o}}catch{(a||rn())&&Ve()}return{user:null}}if(e==="protected")try{return{user:await Dn()}}catch{return Ve(),On(t),{user:null}}return{user:a}}function dn(){return Array.from(document.querySelectorAll(".modal-shell")).filter(e=>!e.hidden)}function Ja(){document.body.style.overflow=dn().length>0?"hidden":""}function H(e){const t=document.getElementById(e);t&&(t.hidden=!1,Ja())}function ee(e=null){if(e){const t=document.getElementById(e);t&&(t.hidden=!0)}else dn().forEach(t=>{t.hidden=!0});Ja()}function Yr(){document.addEventListener("click",e=>{const t=e.target.closest("[data-modal-open]");if(t){H(t.dataset.modalOpen);return}const n=e.target.closest("[data-modal-close]");if(n){const a=n.dataset.modalClose||n.closest(".modal-shell")?.id;ee(a||void 0)}}),document.addEventListener("keydown",e=>{if(e.key!=="Escape")return;const t=dn().pop();t&&ee(t.id)})}function ln(e,t,n){const a=document.getElementById("transit-toast-root");if(!a)return;const o=document.createElement("div");o.className=`transit-toast ${n==="error"?"is-error":""} ${n==="info"?"is-info":""}`.trim(),o.innerHTML=`
        <div>
            <strong>${e}</strong>
            <p>${t}</p>
        </div>
    `,a.appendChild(o),window.requestAnimationFrame(()=>{o.classList.add("is-visible")}),window.setTimeout(()=>{o.classList.remove("is-visible"),window.setTimeout(()=>o.remove(),180)},3600)}function F(e,t="Berhasil"){ln(t,e,"success")}function v(e,t="Gagal"){ln(t,e,"error")}function at(e){return e?.status===409&&e?.data?.error==="booking_version_conflict"?(v("Booking diubah oleh admin lain. Halaman akan refresh otomatis dalam 3 detik...","Perubahan Terdeteksi"),setTimeout(function(){window.location.reload()},3e3),!0):!1}function es(e,t="Info"){ln(t,e,"info")}function Ne(e){const t=document.querySelector("[data-sidebar]"),n=document.querySelector("[data-sidebar-overlay]");!t||!n||(t.classList.toggle("is-open",e),n.hidden=!e)}function ct(e=null){document.querySelectorAll("[data-user-dropdown]").forEach(t=>{if(e&&t===e)return;t.classList.remove("is-open");const n=t.querySelector("[data-user-menu-trigger]"),a=t.querySelector("[data-user-menu-panel]");n&&n.setAttribute("aria-expanded","false"),a&&(a.hidden=!0)})}function ts(e,t=null){if(!e)return;const n=e.querySelector("[data-user-menu-trigger]"),a=e.querySelector("[data-user-menu-panel]"),o=t??!e.classList.contains("is-open");ct(o?e:null),e.classList.toggle("is-open",o),n&&n.setAttribute("aria-expanded",o?"true":"false"),a&&(a.hidden=!o)}function ns(){document.querySelector("[data-sidebar-open]")?.addEventListener("click",()=>{Ne(!0)}),document.querySelector("[data-sidebar-close]")?.addEventListener("click",()=>{Ne(!1)}),document.querySelector("[data-sidebar-overlay]")?.addEventListener("click",()=>{Ne(!1)}),document.querySelectorAll("[data-user-dropdown]").forEach(e=>{e.querySelector("[data-user-menu-trigger]")?.addEventListener("click",t=>{t.stopPropagation(),ts(e)})}),document.addEventListener("click",e=>{e.target.closest("[data-user-dropdown]")||ct()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&(ct(),Ne(!1))}),window.addEventListener("resize",()=>{window.innerWidth>1100&&Ne(!1)}),document.querySelectorAll("[data-auth-logout]").forEach(e=>{e.addEventListener("click",async()=>{ee(),ct();try{e.disabled=!0,await Zr()}catch(t){e.disabled=!1,v(t.message||"Gagal logout")}})})}const Ka={login:{title:"Selamat Datang!",description:"Masuk ke akun Anda untuk melanjutkan",submit:"Masuk",switchText:"Belum punya akun?",switchAction:"Daftar sekarang"},register:{title:"Buat Akun Baru",description:"Daftar untuk mulai menggunakan sistem",submit:"Daftar",switchText:"Sudah punya akun?",switchAction:"Masuk"}};function jn(e,t){const n=Ka[e];t.form.dataset.authMode=e,t.title.textContent=n.title,t.description.textContent=n.description,t.submitText.textContent=n.submit,t.switchText&&(t.switchText.textContent=n.switchText),t.switchButton&&(t.switchButton.textContent=n.switchAction),t.nameField.hidden=e!=="register",t.nameInput.required=e==="register"}function as(){const e=document.getElementById("auth-form");if(!e)return;const t={form:e,title:document.querySelector("[data-auth-title]"),description:document.querySelector("[data-auth-description]"),submitText:document.querySelector("[data-auth-submit-text]"),switchText:document.querySelector("[data-auth-switch-text]"),switchButton:document.querySelector("[data-toggle-auth-mode]"),nameField:document.getElementById("auth-name-field"),nameInput:document.getElementById("nama"),emailInput:document.getElementById("email"),passwordInput:document.getElementById("password"),passwordToggle:document.querySelector("[data-toggle-password]"),submitButton:document.getElementById("auth-submit-button")},n=document.body.dataset.dashboardUrl||"/dashboard";jn("login",t),t.switchButton?.addEventListener("click",()=>{const a=t.form.dataset.authMode==="login"?"register":"login";jn(a,t)}),t.passwordToggle?.addEventListener("click",()=>{const a=t.passwordInput.type==="password"?"text":"password";t.passwordInput.type=a,t.passwordToggle.textContent=a==="password"?"Lihat":"Sembunyikan"}),e.addEventListener("submit",async a=>{a.preventDefault();const o=new FormData(e),r=e.dataset.authMode||"login",s={email:String(o.get("email")||"").trim(),password:String(o.get("password")||"").trim()};r==="register"&&(s.nama=String(o.get("nama")||"").trim()),t.submitButton.disabled=!0,t.submitText.textContent=r==="login"?"Memproses...":"Mendaftarkan...";try{r==="login"?(await Wr(s),F("Selamat datang kembali","Login berhasil!")):(await Xr(s),F("Akun Anda telah dibuat","Registrasi berhasil!")),window.location.replace(n)}catch(i){v(i.message||"Terjadi kesalahan",r==="login"?"Login gagal":"Registrasi gagal")}finally{t.submitButton.disabled=!1,t.submitText.textContent=Ka[r].submit}})}const os=new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}),rs=new Intl.NumberFormat("id-ID");function J(e){return os.format(Number(e)||0)}function q(e){return rs.format(Number(e)||0)}function c(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ye(e,t=300){let n=null;return(...a)=>{window.clearTimeout(n),n=window.setTimeout(()=>e(...a),t)}}function ve(e,t,n,a){if(n===0||a===0)return"Menampilkan 0 - 0 dari 0 data";const o=(e-1)*t+1,r=o+a-1;return`Menampilkan ${o} - ${r} dari ${n} data`}function ss(e){if(!e)return"-";const t=new Date(e);return Number.isNaN(t.getTime())?e:new Intl.DateTimeFormat("id-ID",{day:"2-digit",month:"short",year:"numeric"}).format(t)}function et(){return new Date().toISOString().slice(0,10)}function se(e,t,n="Memproses..."){e&&(e.dataset.defaultText||(e.dataset.defaultText=e.textContent.trim()),e.disabled=t,e.textContent=t?n:e.dataset.defaultText)}const pt=["#059669","#10B981","#34D399","#6EE7B7","#A7F3D0"],le={revenueChart:null,passengerChart:null,mobilChart:null};function is(){const e=document.getElementById("dashboard-initial-state");if(!e)return{stats:{},revenueData:[],mobilRevenue:[]};try{return JSON.parse(e.textContent||"{}")}catch{return{stats:{},revenueData:[],mobilRevenue:[]}}}function cn(e){e&&typeof e.destroy=="function"&&e.destroy()}function ds(e,t){const n=document.querySelector(`[data-stat="${e}"]`);if(!n)return;const a=["total_uang_bersih","total_uang_pc"];n.textContent=a.includes(e)?J(t):q(t)}function za(e,t,n){const a=document.getElementById(e),o=document.getElementById(t);a&&(a.hidden=!n),o&&(o.hidden=n)}function ls(){return"#065f46"}function zt(){return"#d1fae5"}function un(){return{backgroundColor:"#ffffff",titleColor:"#064e3b",bodyColor:"#065f46",borderColor:"#d1fae5",borderWidth:1,padding:12,cornerRadius:12,displayColors:!0}}function cs(e){const t=document.getElementById("dashboard-revenue-chart"),n=Array.isArray(e)&&e.length>0;if(za("dashboard-revenue-chart","dashboard-revenue-empty",n),cn(le.revenueChart),!t||!window.Chart||!n){le.revenueChart=null;return}le.revenueChart=new window.Chart(t,{type:"line",data:{labels:e.map(a=>a.bulan),datasets:[{label:"Pendapatan Bersih",data:e.map(a=>a.uang_bersih),borderColor:"#059669",backgroundColor:"rgba(5, 150, 105, 0.08)",fill:!1,tension:.35,pointRadius:4,pointHoverRadius:5,pointBackgroundColor:"#059669",pointBorderColor:"#ffffff",pointBorderWidth:2,borderWidth:3},{label:"Uang PC",data:e.map(a=>a.uang_pc),borderColor:"#f59e0b",backgroundColor:"rgba(245, 158, 11, 0.1)",fill:!1,tension:.35,pointRadius:4,pointHoverRadius:5,pointBackgroundColor:"#f59e0b",pointBorderColor:"#ffffff",pointBorderWidth:2,borderWidth:3}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{labels:{color:ls(),usePointStyle:!0,pointStyle:"circle",boxWidth:8,boxHeight:8,padding:18}},tooltip:{...un(),callbacks:{label(a){return`${a.dataset.label}: ${J(a.parsed.y)}`}}}},scales:{x:{ticks:{color:"#047857",font:{size:12}},grid:{color:zt()},border:{display:!1}},y:{ticks:{color:"#047857",font:{size:12},callback(a){return`${Math.round(Number(a)/1e6)}jt`}},grid:{color:zt()},border:{display:!1}}}}})}function us(e){const t=document.getElementById("dashboard-passenger-chart"),n=Array.isArray(e)&&e.length>0;if(za("dashboard-passenger-chart","dashboard-passenger-empty",n),cn(le.passengerChart),!t||!window.Chart||!n){le.passengerChart=null;return}le.passengerChart=new window.Chart(t,{type:"bar",data:{labels:e.map(a=>a.bulan),datasets:[{label:"Penumpang",data:e.map(a=>a.penumpang),backgroundColor:"#10B981",borderRadius:8,maxBarThickness:44}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{...un(),callbacks:{label(a){return`Penumpang: ${q(a.parsed.y)}`}}}},scales:{x:{ticks:{color:"#047857",font:{size:12}},grid:{color:"rgba(0, 0, 0, 0)"},border:{display:!1}},y:{ticks:{color:"#047857",font:{size:12}},grid:{color:zt()},border:{display:!1}}}}})}function ms(e){const t=document.getElementById("dashboard-mobil-list");t&&(t.innerHTML=e.map((n,a)=>`
        <div class="dashboard-mobil-item">
            <div class="dashboard-mobil-meta">
                <span class="dashboard-mobil-dot" style="background-color: ${pt[a%pt.length]}"></span>
                <div>
                    <p class="dashboard-mobil-code">${c(n.kode_mobil)}</p>
                    <p class="dashboard-mobil-trips">${q(n.total_trips)} trip</p>
                    <p class="dashboard-mobil-passengers">${q(n.total_penumpang)} penumpang</p>
                </div>
            </div>
            <p class="dashboard-mobil-value">${J(n.total_uang_bersih)}</p>
        </div>
    `).join(""))}function ps(e){const t=document.getElementById("dashboard-mobil-chart"),n=document.getElementById("dashboard-mobil-content"),a=document.getElementById("dashboard-mobil-empty"),o=document.getElementById("dashboard-mobil-chart-empty"),r=document.getElementById("dashboard-mobil-list"),s=Array.isArray(e)&&e.length>0,i=s&&e.some(u=>Number(u.total_uang_bersih)>0);if(cn(le.mobilChart),n&&(n.hidden=!s),a&&(a.hidden=s),t&&(t.hidden=!i),o&&(o.hidden=i),s?ms(e):r&&(r.innerHTML=""),!t||!window.Chart||!i){le.mobilChart=null;return}le.mobilChart=new window.Chart(t,{type:"doughnut",data:{labels:e.map(u=>u.kode_mobil),datasets:[{data:e.map(u=>u.total_uang_bersih),backgroundColor:e.map((u,d)=>pt[d%pt.length]),borderColor:"#ffffff",borderWidth:6,hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"58%",plugins:{legend:{display:!1},tooltip:{...un(),callbacks:{label(u){const d=e[u.dataIndex]||{};return`${u.label}: ${J(u.parsed)} / ${q(d.total_penumpang||0)} penumpang`}}}}}})}function qn(e){Object.entries(e.stats||{}).forEach(([t,n])=>ds(t,n)),cs(e.revenueData||[]),us(e.revenueData||[]),ps(e.mobilRevenue||[])}async function gs(){const[e,t,n]=await Promise.all([E("/statistics/dashboard"),E("/statistics/revenue-chart"),E("/statistics/mobil-revenue")]);return{stats:e,revenueData:t,mobilRevenue:n}}function Nn(e){const t=document.querySelector("[data-dashboard-loading]"),n=document.querySelector("[data-dashboard-content]"),a=document.getElementById("dashboard-refresh-btn");t&&(t.hidden=!e),n&&(n.hidden=e),a&&(a.disabled=e)}async function fs(){const e=document.getElementById("dashboard-refresh-btn");e&&(qn(is()),e.addEventListener("click",async()=>{Nn(!0);try{qn(await gs())}catch{v("Silakan coba lagi","Gagal memuat data")}finally{Nn(!1)}}))}const D={data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1},Me=10;function bs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function ks(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 21C15 17.4 18 14.4 18 10.5C18 7.18629 15.3137 4.5 12 4.5C8.68629 4.5 6 7.18629 6 10.5C6 14.4 9 17.4 12 21Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
            <circle cx="12" cy="10.5" r="2.25" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function hs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function ys(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function gt(e){const t=document.getElementById("driver-submit-btn");D.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":D.editItem?"Perbarui":"Simpan")}function vs(){const e=document.getElementById("drivers-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="drivers-table-state">
                <div class="drivers-loading-inline">
                    <span class="drivers-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function Es(){const e=document.getElementById("drivers-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="drivers-table-state drivers-empty-copy">
                Belum ada data driver
            </td>
        </tr>
    `)}function Un(){const e=document.getElementById("drivers-table-body");if(e){if(D.loading){vs();return}if(D.data.length===0){Es();return}e.innerHTML=D.data.map((t,n)=>`
        <tr class="drivers-row" data-testid="driver-row-${t.id}">
            <td class="drivers-index-cell">${(D.page-1)*Me+n+1}</td>
            <td>
                <div class="drivers-user-cell">
                    <span class="drivers-user-avatar" aria-hidden="true">
                        ${bs()}
                    </span>
                    <span class="drivers-user-name">${c(t.nama)}</span>
                </div>
            </td>
            <td>
                <div class="drivers-location-cell">
                    <span class="drivers-location-icon" aria-hidden="true">${ks()}</span>
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
                        ${hs()}
                    </button>
                    <button
                        class="drivers-icon-button drivers-icon-button-danger"
                        type="button"
                        data-driver-delete="${t.id}"
                        data-driver-name="${c(t.nama)}"
                        data-testid="delete-driver-${t.id}"
                        aria-label="Hapus driver ${c(t.nama)}"
                    >
                        ${ys()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function Hn(){const e=document.getElementById("drivers-pagination-shell"),t=document.getElementById("drivers-pagination-info"),n=document.getElementById("drivers-pagination-page"),a=document.getElementById("drivers-prev-page-btn"),o=document.getElementById("drivers-next-page-btn"),r=Math.max(1,Math.ceil(D.totalCount/Me));e&&(e.hidden=r<=1),t&&(t.textContent=ve(D.page,Me,D.totalCount,D.data.length)),n&&(n.textContent=`${D.page} / ${r}`),a&&(a.disabled=D.page===1),o&&(o.disabled=D.page>=r)}async function we(){D.loading=!0,Un(),Hn();try{const[e,t]=await Promise.all([E(`/drivers?page=${D.page}&limit=${Me}${D.search?`&search=${encodeURIComponent(D.search)}`:""}`),E(`/drivers/count${D.search?`?search=${encodeURIComponent(D.search)}`:""}`)]);D.data=Array.isArray(e)?e:[],D.totalCount=Number(t.count||0)}finally{D.loading=!1,Un(),Hn()}}function Fn(){const e=document.getElementById("driver-form"),t=document.getElementById("driver-form-title"),n=document.getElementById("driver-form-description"),a=document.getElementById("driver-id"),o=document.getElementById("driver-nama"),r=document.getElementById("driver-lokasi");e?.reset(),a&&(a.value=""),o&&(o.value=""),r&&(r.value=""),t&&(t.textContent="Tambah Driver Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan data driver"),D.editItem=null,gt(!1)}function ws(e){const t=document.getElementById("driver-form-title"),n=document.getElementById("driver-form-description"),a=document.getElementById("driver-id"),o=document.getElementById("driver-nama"),r=document.getElementById("driver-lokasi");D.editItem=e,a&&(a.value=e.id),o&&(o.value=e.nama),r&&(r.value=e.lokasi),t&&(t.textContent="Edit Data Driver"),n&&(n.textContent="Isi form di bawah untuk memperbarui data driver"),gt(!1)}async function Bs(e){const t=await E(`/drivers/${e}`);ws(t),H("driver-form-modal")}function Is(e){const t=document.getElementById("driver-delete-copy");D.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus driver <strong>${c(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`),H("driver-delete-modal")}function _s(){const e=document.getElementById("drivers-add-btn"),t=document.getElementById("drivers-export-btn"),n=document.getElementById("drivers-search-input"),a=document.getElementById("driver-form"),o=document.getElementById("drivers-table-body"),r=document.getElementById("driver-delete-confirm-btn"),s=document.getElementById("drivers-prev-page-btn"),i=document.getElementById("drivers-next-page-btn");if(!(!e||!a||!o))return e.addEventListener("click",()=>{Fn(),H("driver-form-modal")}),t?.addEventListener("click",()=>{sn("/export/drivers/csv","drivers.csv").catch(()=>{v("Gagal mengunduh file")})}),n?.addEventListener("input",ye(async u=>{D.search=u.target.value.trim(),D.page=1;try{await we()}catch{v("Gagal memuat data")}})),a.addEventListener("submit",async u=>{u.preventDefault();const d={nama:document.getElementById("driver-nama")?.value.trim()||"",lokasi:document.getElementById("driver-lokasi")?.value.trim()||""};gt(!0);try{D.editItem?(await E(`/drivers/${D.editItem.id}`,{method:"PUT",body:d}),F("Data driver berhasil diperbarui")):(await E("/drivers",{method:"POST",body:d}),F("Driver berhasil ditambahkan")),ee("driver-form-modal"),Fn(),await we()}catch(l){v(l.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{gt(!1)}}),o.addEventListener("click",async u=>{const d=u.target.closest("[data-driver-edit]"),l=u.target.closest("[data-driver-delete]");try{if(d){await Bs(d.dataset.driverEdit);return}l&&Is({id:l.dataset.driverDelete,nama:l.dataset.driverName})}catch{v("Gagal memuat data")}}),r?.addEventListener("click",async()=>{if(D.deleteItem)try{await E(`/drivers/${D.deleteItem.id}`,{method:"DELETE"}),F("Driver berhasil dihapus"),ee("driver-delete-modal"),(D.page-1)*Me>=D.totalCount-1&&D.page>1&&(D.page-=1),D.deleteItem=null,await we()}catch{v("Gagal menghapus data")}}),s?.addEventListener("click",async()=>{if(!(D.page<=1)){D.page-=1;try{await we()}catch{v("Gagal memuat data")}}}),i?.addEventListener("click",async()=>{const u=Math.max(1,Math.ceil(D.totalCount/Me));if(!(D.page>=u)){D.page+=1;try{await we()}catch{v("Gagal memuat data")}}}),we().catch(()=>{v("Gagal memuat data")})}const _={data:[],loading:!0,totalCount:0,page:1,search:"",filterJenis:"",editItem:null,deleteItem:null,isSubmitting:!1},Re=10;function $s(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M5 14L6.6 9.2C6.8728 8.3816 7.6387 7.83 8.5014 7.83H15.4986C16.3613 7.83 17.1272 8.3816 17.4 9.2L19 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M4 14H20V17C20 18.1046 19.1046 19 18 19H6C4.89543 19 4 18.1046 4 17V14Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M7 16H7.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path>
            <path d="M17 16H17.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path>
        </svg>
    `}function Ss(){return`
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
    `}function xs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 13L11 22L2 13V4H11L20 13Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <circle cx="7.5" cy="8.5" r="1.5" fill="currentColor"></circle>
        </svg>
    `}function ft(e){const t=document.getElementById("mobil-submit-btn");_.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":_.editItem?"Perbarui":"Simpan")}function Ts(e){return e==="Hiace"?"mobil-jenis-badge mobil-jenis-badge-hiace":"mobil-jenis-badge mobil-jenis-badge-reborn"}function Ls(){const e=document.getElementById("mobil-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="mobil-table-state">
                <div class="mobil-loading-inline">
                    <span class="mobil-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function As(){const e=document.getElementById("mobil-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="mobil-table-state mobil-empty-copy">
                Belum ada data mobil
            </td>
        </tr>
    `)}function Vn(){const e=document.getElementById("mobil-table-body");if(e){if(_.loading){Ls();return}if(_.data.length===0){As();return}e.innerHTML=_.data.map((t,n)=>`
        <tr class="mobil-row" data-testid="mobil-row-${t.id}">
            <td class="mobil-index-cell">${(_.page-1)*Re+n+1}</td>
            <td>
                <div class="mobil-code-cell">
                    <span class="mobil-code-avatar" aria-hidden="true">
                        ${$s()}
                    </span>
                    <span class="mobil-code-text">${c(t.kode_mobil)}</span>
                </div>
            </td>
            <td>
                <span class="${Ts(t.jenis_mobil)}">
                    <span class="mobil-jenis-icon" aria-hidden="true">${xs()}</span>
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
                        ${Ss()}
                    </button>
                    <button
                        class="mobil-icon-button mobil-icon-button-danger"
                        type="button"
                        data-mobil-delete="${t.id}"
                        data-mobil-name="${c(t.kode_mobil)}"
                        data-testid="delete-mobil-${t.id}"
                        aria-label="Hapus mobil ${c(t.kode_mobil)}"
                    >
                        ${Cs()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function Gn(){const e=document.getElementById("mobil-pagination-shell"),t=document.getElementById("mobil-pagination-info"),n=document.getElementById("mobil-pagination-page"),a=document.getElementById("mobil-prev-page-btn"),o=document.getElementById("mobil-next-page-btn"),r=Math.max(1,Math.ceil(_.totalCount/Re));e&&(e.hidden=r<=1),t&&(t.textContent=ve(_.page,Re,_.totalCount,_.data.length)),n&&(n.textContent=`${_.page} / ${r}`),a&&(a.disabled=_.page===1),o&&(o.disabled=_.page>=r)}async function ue(){_.loading=!0,Vn(),Gn();try{const[e,t]=await Promise.all([E(`/mobil?page=${_.page}&limit=${Re}${_.search?`&search=${encodeURIComponent(_.search)}`:""}${_.filterJenis?`&jenis=${encodeURIComponent(_.filterJenis)}`:""}`),E(`/mobil/count${_.search||_.filterJenis?"?":""}${[_.search?`search=${encodeURIComponent(_.search)}`:"",_.filterJenis?`jenis=${encodeURIComponent(_.filterJenis)}`:""].filter(Boolean).join("&")}`)]);_.data=Array.isArray(e)?e:[],_.totalCount=Number(t.count||0)}finally{_.loading=!1,Vn(),Gn()}}function Jn(){const e=document.getElementById("mobil-form"),t=document.getElementById("mobil-form-title"),n=document.getElementById("mobil-form-description"),a=document.getElementById("mobil-id"),o=document.getElementById("mobil-kode"),r=document.getElementById("mobil-jenis"),s=document.getElementById("mobil-home-pool"),i=document.getElementById("mobil-is-active-in-trip");e?.reset(),a&&(a.value=""),o&&(o.value=""),r&&(r.value="Hiace"),s&&(s.value=""),i&&(i.checked=!0),t&&(t.textContent="Tambah Mobil Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan data mobil"),_.editItem=null,ft(!1)}function Ms(e){const t=document.getElementById("mobil-form-title"),n=document.getElementById("mobil-form-description"),a=document.getElementById("mobil-id"),o=document.getElementById("mobil-kode"),r=document.getElementById("mobil-jenis"),s=document.getElementById("mobil-home-pool"),i=document.getElementById("mobil-is-active-in-trip");_.editItem=e,a&&(a.value=e.id),o&&(o.value=e.kode_mobil),r&&(r.value=e.jenis_mobil),s&&(s.value=e.home_pool??""),i&&(i.checked=e.is_active_in_trip!==!1),t&&(t.textContent="Edit Data Mobil"),n&&(n.textContent="Isi form di bawah untuk memperbarui data mobil"),ft(!1)}async function Rs(e){const t=await E(`/mobil/${e}`);Ms(t),H("mobil-form-modal")}function Ps(e){const t=document.getElementById("mobil-delete-copy");_.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus mobil <strong>${c(e.kode_mobil)}</strong>? Tindakan ini tidak dapat dibatalkan.`),H("mobil-delete-modal")}function Ds(){const e=document.getElementById("mobil-add-btn"),t=document.getElementById("mobil-export-btn"),n=document.getElementById("mobil-search-input"),a=document.getElementById("mobil-filter-jenis"),o=document.getElementById("mobil-form"),r=document.getElementById("mobil-table-body"),s=document.getElementById("mobil-delete-confirm-btn"),i=document.getElementById("mobil-prev-page-btn"),u=document.getElementById("mobil-next-page-btn"),d=document.getElementById("mobil-kode");if(!(!e||!o||!r))return e.addEventListener("click",()=>{Jn(),H("mobil-form-modal")}),t?.addEventListener("click",()=>{sn("/export/mobil/csv","mobil.csv").catch(()=>{v("Gagal mengunduh file")})}),n?.addEventListener("input",ye(async l=>{_.search=l.target.value.trim(),_.page=1;try{await ue()}catch{v("Gagal memuat data")}})),a?.addEventListener("change",async l=>{_.filterJenis=l.target.value,_.page=1;try{await ue()}catch{v("Gagal memuat data")}}),d?.addEventListener("input",l=>{l.target.value=l.target.value.toUpperCase()}),o.addEventListener("submit",async l=>{l.preventDefault();const g=document.getElementById("mobil-home-pool")?.value||"",I={kode_mobil:document.getElementById("mobil-kode")?.value.trim().toUpperCase()||"",jenis_mobil:document.getElementById("mobil-jenis")?.value||"Hiace",home_pool:g===""?null:g,is_active_in_trip:document.getElementById("mobil-is-active-in-trip")?.checked??!0};ft(!0);try{_.editItem?(await E(`/mobil/${_.editItem.id}`,{method:"PUT",body:I}),F("Data mobil berhasil diperbarui")):(await E("/mobil",{method:"POST",body:I}),F("Mobil berhasil ditambahkan")),ee("mobil-form-modal"),Jn(),await ue()}catch(O){v(O.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{ft(!1)}}),r.addEventListener("click",async l=>{const g=l.target.closest("[data-mobil-edit]"),I=l.target.closest("[data-mobil-delete]");try{if(g){await Rs(g.dataset.mobilEdit);return}I&&Ps({id:I.dataset.mobilDelete,kode_mobil:I.dataset.mobilName})}catch{v("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(_.deleteItem)try{await E(`/mobil/${_.deleteItem.id}`,{method:"DELETE"}),F("Mobil berhasil dihapus"),ee("mobil-delete-modal"),(_.page-1)*Re>=_.totalCount-1&&_.page>1&&(_.page-=1),_.deleteItem=null,await ue()}catch{v("Gagal menghapus data")}}),i?.addEventListener("click",async()=>{if(!(_.page<=1)){_.page-=1;try{await ue()}catch{v("Gagal memuat data")}}}),u?.addEventListener("click",async()=>{const l=Math.max(1,Math.ceil(_.totalCount/Re));if(!(_.page>=l)){_.page+=1;try{await ue()}catch{v("Gagal memuat data")}}}),ue().catch(()=>{v("Gagal memuat data")})}const $={data:[],drivers:[],mobilList:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1},Ge=10,Kn={"05:30":"Subuh (05.30 WIB)","07:00":"Pagi (07.00 WIB)","09:00":"Pagi (09.00 WIB)","13:00":"Siang (13.00 WIB)","16:00":"Sore (16.00 WIB)","19:00":"Malam (19.00 WIB)"},Tt="07:00",Os=["Reguler","Dropping","Rental"],mn="Reguler";function js(){return`
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
    `}function pn(e){return e==="Lunas"?"Lunas":"Belum Lunas"}function zn(e){const t=pn(e);return`<span class="keberangkatan-payment-badge ${t==="Lunas"?"is-paid":"is-unpaid"}">${c(t)}</span>`}function Wn(e){return Kn[e]||Kn[Tt]}function bt(e){return Os.includes(e)?e:mn}function Ns(){const e=Number(document.getElementById("keberangkatan-tarif-penumpang")?.value||0),t=Number(document.getElementById("keberangkatan-uang-paket")?.value||0),n=Number(document.getElementById("keberangkatan-jumlah-snack")?.value||0),a=Number(document.getElementById("keberangkatan-pengembalian-snack")?.value||0),o=Number(document.getElementById("keberangkatan-jumlah-air-mineral")?.value||0),r=e,s=r+t,i=s*.15,u=s*.85;return{jumlah_uang_penumpang:r,uang_paket:t,total:s,uang_pc:i,uang_bersih:u,jumlah_snack:n,pengembalian_snack:a,jumlah_air_mineral:o}}function gn(){const e=Ns();Object.entries(e).forEach(([t,n])=>{const a=document.querySelector(`[data-calc="${t}"]`);if(a){if(t==="jumlah_snack"){a.textContent=`${q(n)} item`;return}if(t==="pengembalian_snack"){a.textContent=`${q(n)} item`;return}if(t==="jumlah_air_mineral"){a.textContent=`${q(n)} botol`;return}a.textContent=J(n)}})}function kt(e,t,n,a,o=""){const r=document.getElementById(e);if(!r)return;const s=e==="keberangkatan-kode-mobil"?"Pilih mobil":"Pilih driver";r.innerHTML=`
        <option value="">${s}</option>
        ${t.map(i=>`
            <option value="${i[n]}" ${String(i[n])===String(o)?"selected":""}>
                ${c(a(i))}
            </option>
        `).join("")}
    `}function ht(e){const t=document.getElementById("keberangkatan-submit-btn");$.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":$.editItem?"Perbarui":"Simpan")}function Us(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");e&&(e.innerHTML=`
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
        `))}function Hs(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");e&&(e.innerHTML=`
        <tr>
            <td colspan="18" class="keberangkatan-table-state keberangkatan-empty-copy">
                Belum ada data keberangkatan
            </td>
        </tr>
    `,t&&(t.hidden=!1,t.innerHTML=`
            <div class="keberangkatan-mobile-state keberangkatan-empty-copy">
                Belum ada data keberangkatan
            </div>
        `))}function Xn(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");if(e){if($.loading){Us();return}if($.data.length===0){Hs();return}e.innerHTML=$.data.map(n=>`
        <tr class="keberangkatan-row" data-testid="keberangkatan-row-${n.id}">
            <td class="keberangkatan-hari-cell">${c(n.hari)}</td>
            <td>${c(n.tanggal)}</td>
            <td>${c(n.jam_keberangkatan_label||Wn(n.jam_keberangkatan))}</td>
            <td>${c(bt(n.tipe_layanan))}</td>
            <td>
                <span class="keberangkatan-kode-badge">${c(n.kode_mobil)}</span>
            </td>
            <td>${c(n.driver_nama)}</td>
            <td class="text-right">${q(n.jumlah_penumpang)}</td>
            <td class="text-right keberangkatan-money-cell">${J(n.jumlah_uang_penumpang)}</td>
            <td class="text-right">${q(n.jumlah_paket)}</td>
            <td class="text-right keberangkatan-money-cell">${J(n.uang_paket)}</td>
            <td class="text-right"><span class="keberangkatan-stock-badge">${q(n.jumlah_snack)}</span></td>
            <td class="text-right"><span class="keberangkatan-stock-badge keberangkatan-stock-badge-blue">${q(n.pengembalian_snack)}</span></td>
            <td class="text-right"><span class="keberangkatan-stock-badge keberangkatan-stock-badge-blue">${q(n.jumlah_air_mineral)}</span></td>
            <td class="text-right keberangkatan-money-cell keberangkatan-money-cell-amber">${J(n.uang_pc)}</td>
            <td class="text-right keberangkatan-money-cell keberangkatan-money-cell-emerald">${J(n.uang_bersih)}</td>
            <td class="text-center">${zn(n.status_pembayaran)}</td>
            <td class="text-center">
                <span class="keberangkatan-trip-badge">#${q(n.trip_ke)}</span>
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
                        ${js()}
                    </button>
                    <button
                        class="keberangkatan-icon-button keberangkatan-icon-button-danger"
                        type="button"
                        data-keberangkatan-delete="${n.id}"
                        data-testid="delete-keberangkatan-${n.id}"
                        aria-label="Hapus data keberangkatan ${c(n.kode_mobil)}"
                    >
                        ${qs()}
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
                        <p>${c(n.jam_keberangkatan_label||Wn(n.jam_keberangkatan))}</p>
                    </div>
                    <div class="keberangkatan-mobile-head-side">
                        <span class="keberangkatan-kode-badge">${c(n.kode_mobil)}</span>
                        <span class="keberangkatan-trip-badge">#${q(n.trip_ke)}</span>
                    </div>
                </div>

                <div class="keberangkatan-mobile-driver">
                    <span>Driver</span>
                    <strong>${c(n.driver_nama)}</strong>
                </div>

                <div class="keberangkatan-mobile-grid">
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-status">
                        <span>Validasi</span>
                        ${zn(n.status_pembayaran)}
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Layanan</span>
                        <strong>${c(bt(n.tipe_layanan))}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Penumpang</span>
                        <strong>${q(n.jumlah_penumpang)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Paket</span>
                        <strong>${q(n.jumlah_paket)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Snack</span>
                        <strong>${q(n.jumlah_snack)} item</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Pengembalian Snack</span>
                        <strong>${q(n.pengembalian_snack)} item</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Air Mineral</span>
                        <strong>${q(n.jumlah_air_mineral)} botol</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-full">
                        <span>Jumlah Tarif</span>
                        <strong>${J(n.jumlah_uang_penumpang)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-full">
                        <span>Uang Paket</span>
                        <strong>${J(n.uang_paket)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-accent">
                        <span>Uang PC (15%)</span>
                        <strong>${J(n.uang_pc)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-emerald">
                        <span>Uang Bersih</span>
                        <strong>${J(n.uang_bersih)}</strong>
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
        `).join(""))}}function Zn(){const e=document.getElementById("keberangkatan-pagination-shell"),t=document.getElementById("keberangkatan-pagination-info"),n=document.getElementById("keberangkatan-pagination-page"),a=document.getElementById("keberangkatan-prev-page-btn"),o=document.getElementById("keberangkatan-next-page-btn"),r=Math.max(1,Math.ceil($.totalCount/Ge));e&&(e.hidden=r<=1),t&&(t.textContent=ve($.page,Ge,$.totalCount,$.data.length)),n&&(n.textContent=`${$.page} / ${r}`),a&&(a.disabled=$.page===1),o&&(o.disabled=$.page>=r)}async function Be(){$.loading=!0,Xn(),Zn();try{const[e,t,n,a]=await Promise.all([E(`/keberangkatan?page=${$.page}&limit=${Ge}${$.search?`&search=${encodeURIComponent($.search)}`:""}`),E(`/keberangkatan/count${$.search?`?search=${encodeURIComponent($.search)}`:""}`),E("/drivers/all"),E("/mobil/all")]);$.data=Array.isArray(e)?e:[],$.totalCount=Number(t.count||0),$.drivers=Array.isArray(n)?n:[],$.mobilList=Array.isArray(a)?a:[]}finally{$.loading=!1,Xn(),Zn()}}function Wa(){document.getElementById("keberangkatan-form")?.scrollTo({top:0,behavior:"auto"})}function Ot(){const e=document.getElementById("keberangkatan-form"),t=document.getElementById("keberangkatan-form-title"),n=document.getElementById("keberangkatan-form-description"),a=document.getElementById("keberangkatan-tanggal"),o=document.getElementById("keberangkatan-jam-keberangkatan"),r=document.getElementById("keberangkatan-trip-ke"),s=document.getElementById("keberangkatan-tipe-layanan"),i=document.getElementById("keberangkatan-jumlah-penumpang"),u=document.getElementById("keberangkatan-tarif-penumpang"),d=document.getElementById("keberangkatan-jumlah-paket"),l=document.getElementById("keberangkatan-uang-paket"),g=document.getElementById("keberangkatan-jumlah-snack"),I=document.getElementById("keberangkatan-pengembalian-snack"),O=document.getElementById("keberangkatan-jumlah-air-mineral"),b=document.getElementById("keberangkatan-status-pembayaran");e?.reset(),$.editItem=null,document.getElementById("keberangkatan-id").value="",t&&(t.textContent="Tambah Data Keberangkatan"),n&&(n.textContent="Isi form di bawah untuk menambahkan data keberangkatan"),a&&(a.value=et()),o&&(o.value=Tt),kt("keberangkatan-kode-mobil",$.mobilList,"kode_mobil",h=>`${h.kode_mobil} - ${h.jenis_mobil}`,$.mobilList[0]?.kode_mobil||""),kt("keberangkatan-driver-id",$.drivers,"id",h=>`${h.nama} - ${h.lokasi}`,$.drivers[0]?.id||""),r&&(r.value="1"),s&&(s.value=mn),i&&(i.value="0"),u&&(u.value="0"),d&&(d.value="0"),l&&(l.value="0"),g&&(g.value="0"),I&&(I.value="0"),O&&(O.value="0"),b&&(b.value="Belum Lunas"),ht(!1),gn(),Wa()}async function Qn(e){const t=await E(`/keberangkatan/${e}`),n=document.getElementById("keberangkatan-form-title"),a=document.getElementById("keberangkatan-form-description");$.editItem=t,document.getElementById("keberangkatan-id").value=t.id,document.getElementById("keberangkatan-tanggal").value=t.tanggal,document.getElementById("keberangkatan-jam-keberangkatan").value=t.jam_keberangkatan||Tt,document.getElementById("keberangkatan-trip-ke").value=t.trip_ke,document.getElementById("keberangkatan-tipe-layanan").value=bt(t.tipe_layanan),document.getElementById("keberangkatan-jumlah-penumpang").value=t.jumlah_penumpang,document.getElementById("keberangkatan-tarif-penumpang").value=t.tarif_penumpang,document.getElementById("keberangkatan-jumlah-paket").value=t.jumlah_paket,document.getElementById("keberangkatan-uang-paket").value=t.uang_paket,document.getElementById("keberangkatan-jumlah-snack").value=t.jumlah_snack,document.getElementById("keberangkatan-pengembalian-snack").value=t.pengembalian_snack,document.getElementById("keberangkatan-jumlah-air-mineral").value=t.jumlah_air_mineral,document.getElementById("keberangkatan-status-pembayaran").value=pn(t.status_pembayaran),kt("keberangkatan-kode-mobil",$.mobilList,"kode_mobil",o=>`${o.kode_mobil} - ${o.jenis_mobil}`,t.kode_mobil),kt("keberangkatan-driver-id",$.drivers,"id",o=>`${o.nama} - ${o.lokasi}`,t.driver_id),n&&(n.textContent="Edit Data Keberangkatan"),a&&(a.textContent="Isi form di bawah untuk memperbarui data keberangkatan"),ht(!1),gn(),Wa(),H("keberangkatan-form-modal")}function Yn(e){$.deleteItem=e,H("keberangkatan-delete-modal")}function Fs(){const e=document.getElementById("keberangkatan-add-btn"),t=document.getElementById("keberangkatan-export-btn"),n=document.getElementById("keberangkatan-search-input"),a=document.getElementById("keberangkatan-form"),o=document.getElementById("keberangkatan-table-body"),r=document.getElementById("keberangkatan-mobile-list"),s=document.getElementById("keberangkatan-delete-confirm-btn"),i=document.getElementById("keberangkatan-prev-page-btn"),u=document.getElementById("keberangkatan-next-page-btn");if(!(!e||!a||!o))return e.addEventListener("click",()=>{Ot(),H("keberangkatan-form-modal")}),t?.addEventListener("click",()=>{sn("/export/keberangkatan/csv","keberangkatan.csv").catch(()=>{v("Gagal mengunduh file")})}),n?.addEventListener("input",ye(async d=>{$.search=d.target.value.trim(),$.page=1;try{await Be()}catch{v("Gagal memuat data")}})),a.addEventListener("input",d=>{["keberangkatan-jumlah-penumpang","keberangkatan-tarif-penumpang","keberangkatan-uang-paket","keberangkatan-jumlah-snack","keberangkatan-pengembalian-snack","keberangkatan-jumlah-air-mineral"].includes(d.target.id)&&gn()}),a.addEventListener("submit",async d=>{d.preventDefault();const l={tanggal:document.getElementById("keberangkatan-tanggal")?.value||"",jam_keberangkatan:document.getElementById("keberangkatan-jam-keberangkatan")?.value||Tt,tipe_layanan:bt(document.getElementById("keberangkatan-tipe-layanan")?.value||mn),kode_mobil:document.getElementById("keberangkatan-kode-mobil")?.value||"",driver_id:document.getElementById("keberangkatan-driver-id")?.value||"",jumlah_penumpang:Number(document.getElementById("keberangkatan-jumlah-penumpang")?.value||0),tarif_penumpang:Number(document.getElementById("keberangkatan-tarif-penumpang")?.value||0),jumlah_paket:Number(document.getElementById("keberangkatan-jumlah-paket")?.value||0),uang_paket:Number(document.getElementById("keberangkatan-uang-paket")?.value||0),jumlah_snack:Number(document.getElementById("keberangkatan-jumlah-snack")?.value||0),pengembalian_snack:Number(document.getElementById("keberangkatan-pengembalian-snack")?.value||0),jumlah_air_mineral:Number(document.getElementById("keberangkatan-jumlah-air-mineral")?.value||0),trip_ke:Number(document.getElementById("keberangkatan-trip-ke")?.value||1),status_pembayaran:pn(document.getElementById("keberangkatan-status-pembayaran")?.value||"")};ht(!0);try{$.editItem?(await E(`/keberangkatan/${$.editItem.id}`,{method:"PUT",body:l}),F("Data berhasil diperbarui")):(await E("/keberangkatan",{method:"POST",body:l}),F("Data berhasil ditambahkan")),ee("keberangkatan-form-modal"),Ot(),await Be()}catch(g){v(g.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{ht(!1)}}),o.addEventListener("click",async d=>{const l=d.target.closest("[data-keberangkatan-edit]"),g=d.target.closest("[data-keberangkatan-delete]");try{if(l){await Qn(l.dataset.keberangkatanEdit);return}g&&Yn({id:g.dataset.keberangkatanDelete})}catch{v("Gagal memuat data")}}),r?.addEventListener("click",async d=>{const l=d.target.closest("[data-keberangkatan-edit]"),g=d.target.closest("[data-keberangkatan-delete]");try{if(l){await Qn(l.dataset.keberangkatanEdit);return}g&&Yn({id:g.dataset.keberangkatanDelete})}catch{v("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if($.deleteItem)try{await E(`/keberangkatan/${$.deleteItem.id}`,{method:"DELETE"}),F("Data berhasil dihapus"),ee("keberangkatan-delete-modal"),($.page-1)*Ge>=$.totalCount-1&&$.page>1&&($.page-=1),$.deleteItem=null,await Be()}catch{v("Gagal menghapus data")}}),i?.addEventListener("click",async()=>{if(!($.page<=1)){$.page-=1;try{await Be()}catch{v("Gagal memuat data")}}}),u?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil($.totalCount/Ge));if(!($.page>=d)){$.page+=1;try{await Be()}catch{v("Gagal memuat data")}}}),Be().then(()=>{Ot()}).catch(()=>{v("Gagal memuat data")})}const x={data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1,prices:{snack:0,air:0}},Je=10;function Vs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Gs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function yt(e){return Number(document.getElementById(e)?.value||0)}function vt(){const e=yt("stock-total-snack"),t=yt("stock-total-air"),n=e*x.prices.snack+t*x.prices.air,a=document.querySelector('[data-stock-calc="nilai_total"]'),o=document.getElementById("stock-snack-price-label"),r=document.getElementById("stock-air-price-label");o&&(o.textContent=J(x.prices.snack)),r&&(r.textContent=J(x.prices.air)),a&&(a.textContent=J(n))}function Et(e){const t=document.getElementById("stock-submit-btn");x.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":x.editItem?"Perbarui":"Simpan")}function Js(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");e&&(e.innerHTML=`
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
        `))}function Ks(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");e&&(e.innerHTML=`
        <tr>
            <td colspan="14" class="stock-table-state stock-empty-copy">
                Belum ada data stok snack dan air mineral
            </td>
        </tr>
    `,t&&(t.hidden=!1,t.innerHTML=`
            <div class="stock-mobile-state stock-empty-copy">
                Belum ada data stok snack dan air mineral
            </div>
        `))}function ea(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");if(e){if(x.loading){Js();return}if(x.data.length===0){Ks();return}e.innerHTML=x.data.map(n=>`
        <tr class="stock-row" data-testid="stock-row-${n.id}">
            <td class="stock-day-cell">${c(n.hari)}</td>
            <td>${c(n.tanggal)}</td>
            <td>${c(n.bulan)}</td>
            <td class="text-right">${q(n.total_stock_snack_display??n.total_stock_snack)}</td>
            <td class="text-right">${q(n.total_stock_air_mineral)}</td>
            <td class="text-right">${q(n.pengembalian_snack)}</td>
            <td class="text-right">${q(n.terpakai_snack)}</td>
            <td class="text-right">${q(n.terpakai_air_mineral)}</td>
            <td class="text-right"><span class="stock-value-badge stock-value-badge-emerald">${q(n.sisa_stock_snack)}</span></td>
            <td class="text-right"><span class="stock-value-badge stock-value-badge-blue">${q(n.sisa_stock_air_mineral)}</span></td>
            <td class="text-right stock-money-cell">${J(n.nilai_total)}</td>
            <td class="text-right stock-money-cell stock-money-cell-emerald">${J(n.sisa_nilai_total)}</td>
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
                        ${Vs()}
                    </button>
                    <button
                        class="stock-icon-button stock-icon-button-danger"
                        type="button"
                        data-stock-delete="${n.id}"
                        data-stock-date="${c(n.tanggal)}"
                        data-testid="delete-stock-${n.id}"
                        aria-label="Hapus data stok ${c(n.tanggal)}"
                    >
                        ${Gs()}
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
                        <strong>${q(n.total_stock_snack_display??n.total_stock_snack)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Total Air Mineral</span>
                        <strong>${q(n.total_stock_air_mineral)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Pengembalian Snack</span>
                        <strong>${q(n.pengembalian_snack)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Terpakai Snack</span>
                        <strong>${q(n.terpakai_snack)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Terpakai Air Mineral</span>
                        <strong>${q(n.terpakai_air_mineral)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Sisa Snack</span>
                        <strong>${q(n.sisa_stock_snack)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Sisa Air Mineral</span>
                        <strong>${q(n.sisa_stock_air_mineral)}</strong>
                    </div>
                    <div class="stock-mobile-item stock-mobile-item-full">
                        <span>Nilai Total</span>
                        <strong>${J(n.nilai_total)}</strong>
                    </div>
                    <div class="stock-mobile-item stock-mobile-item-full stock-mobile-item-emerald">
                        <span>Sisa Nilai Total</span>
                        <strong>${J(n.sisa_nilai_total)}</strong>
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
        `).join(""))}}function ta(){const e=document.getElementById("stock-pagination-shell"),t=document.getElementById("stock-pagination-info"),n=document.getElementById("stock-pagination-page"),a=document.getElementById("stock-prev-page-btn"),o=document.getElementById("stock-next-page-btn"),r=Math.max(1,Math.ceil(x.totalCount/Je));e&&(e.hidden=r<=1),t&&(t.textContent=ve(x.page,Je,x.totalCount,x.data.length)),n&&(n.textContent=`${x.page} / ${r}`),a&&(a.disabled=x.page===1),o&&(o.disabled=x.page>=r)}async function Ie(){x.loading=!0,ea(),ta();try{const[e,t]=await Promise.all([E(`/stock?page=${x.page}&limit=${Je}${x.search?`&search=${encodeURIComponent(x.search)}`:""}`),E(`/stock/count${x.search?`?search=${encodeURIComponent(x.search)}`:""}`)]);x.data=Array.isArray(e)?e:[],x.totalCount=Number(t.count||0)}finally{x.loading=!1,ea(),ta()}}function na(){const e=document.getElementById("stock-form"),t=document.getElementById("stock-form-title"),n=document.getElementById("stock-form-description");e?.reset(),x.editItem=null,document.getElementById("stock-id").value="",document.getElementById("stock-tanggal").value=et(),document.getElementById("stock-total-snack").value="0",document.getElementById("stock-total-air").value="0",document.getElementById("stock-keterangan").value="",t&&(t.textContent="Tambah Stok Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan stok snack dan air mineral"),Et(!1),vt()}function zs(e){const t=document.getElementById("stock-form-title"),n=document.getElementById("stock-form-description");x.editItem=e,document.getElementById("stock-id").value=e.id,document.getElementById("stock-tanggal").value=e.tanggal,document.getElementById("stock-total-snack").value=e.total_stock_snack,document.getElementById("stock-total-air").value=e.total_stock_air_mineral,document.getElementById("stock-keterangan").value=e.keterangan||"",t&&(t.textContent="Edit Data Stok"),n&&(n.textContent="Isi form di bawah untuk memperbarui stok snack dan air mineral"),Et(!1),vt()}async function aa(e){const t=await E(`/stock/${e}`);zs(t),H("stock-form-modal")}function oa(e){const t=document.getElementById("stock-delete-copy");x.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus data stok tanggal <strong>${c(e.tanggal)}</strong>? Tindakan ini tidak dapat dibatalkan.`),H("stock-delete-modal")}function Ws(){const e=document.querySelector("[data-stock-page]"),t=document.getElementById("stock-add-btn"),n=document.getElementById("stock-search-input"),a=document.getElementById("stock-form"),o=document.getElementById("stock-table-body"),r=document.getElementById("stock-mobile-list"),s=document.getElementById("stock-delete-confirm-btn"),i=document.getElementById("stock-prev-page-btn"),u=document.getElementById("stock-next-page-btn");if(!(!e||!t||!a||!o))return x.prices.snack=Number(e.dataset.stockSnackPrice||0),x.prices.air=Number(e.dataset.stockAirPrice||0),vt(),t.addEventListener("click",()=>{na(),H("stock-form-modal")}),n?.addEventListener("input",ye(async d=>{x.search=d.target.value.trim(),x.page=1;try{await Ie()}catch{v("Gagal memuat data")}})),a.addEventListener("input",d=>{["stock-total-snack","stock-total-air"].includes(d.target.id)&&vt()}),a.addEventListener("submit",async d=>{d.preventDefault();const l={tanggal:document.getElementById("stock-tanggal")?.value||"",total_stock_snack:yt("stock-total-snack"),total_stock_air_mineral:yt("stock-total-air"),keterangan:document.getElementById("stock-keterangan")?.value.trim()||""};Et(!0);try{x.editItem?(await E(`/stock/${x.editItem.id}`,{method:"PUT",body:l}),F("Data stok berhasil diperbarui")):(await E("/stock",{method:"POST",body:l}),F("Data stok berhasil ditambahkan")),ee("stock-form-modal"),na(),await Ie()}catch(g){v(g.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{Et(!1)}}),o.addEventListener("click",async d=>{const l=d.target.closest("[data-stock-edit]"),g=d.target.closest("[data-stock-delete]");try{if(l){await aa(l.dataset.stockEdit);return}g&&oa({id:g.dataset.stockDelete,tanggal:g.dataset.stockDate})}catch{v("Gagal memuat data")}}),r?.addEventListener("click",async d=>{const l=d.target.closest("[data-stock-edit]"),g=d.target.closest("[data-stock-delete]");try{if(l){await aa(l.dataset.stockEdit);return}g&&oa({id:g.dataset.stockDelete,tanggal:g.dataset.stockDate})}catch{v("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(x.deleteItem)try{await E(`/stock/${x.deleteItem.id}`,{method:"DELETE"}),F("Data stok berhasil dihapus"),ee("stock-delete-modal"),(x.page-1)*Je>=x.totalCount-1&&x.page>1&&(x.page-=1),x.deleteItem=null,await Ie()}catch{v("Gagal menghapus data")}}),i?.addEventListener("click",async()=>{if(!(x.page<=1)){x.page-=1;try{await Ie()}catch{v("Gagal memuat data")}}}),u?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil(x.totalCount/Je));if(!(x.page>=d)){x.page+=1;try{await Ie()}catch{v("Gagal memuat data")}}}),Ie().catch(()=>{v("Gagal memuat data")})}const Ke=10,T={currentUser:null,data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,defaultRole:"User"};function Xs(e){return["Super Admin","Admin"].includes(e)}function Zs(e){return e==="Super Admin"}function Qs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function Ys(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M2.5 12C4.4 8.2 8 6 12 6C16 6 19.6 8.2 21.5 12C19.6 15.8 16 18 12 18C8 18 4.4 15.8 2.5 12Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function ei(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function ti(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function ni(){return Zs(T.currentUser?.role)?["Super Admin","Admin","User"]:["Admin","User"]}function wt(e){se(document.getElementById("admin-user-submit-btn"),e,"Menyimpan...")}function ai(e){return e==="Super Admin"?"admin-users-role-badge admin-users-role-badge-super":e==="Admin"?"admin-users-role-badge admin-users-role-badge-admin":"admin-users-role-badge admin-users-role-badge-user"}function oi(){const e=document.getElementById("admin-users-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="6" class="admin-users-table-state">
                <div class="admin-users-loading-inline">
                    <span class="admin-users-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function Xa(e="Belum ada akun admin atau user."){const t=document.getElementById("admin-users-table-body");t&&(t.innerHTML=`
        <tr>
            <td colspan="6" class="admin-users-table-state admin-users-empty-copy">${c(e)}</td>
        </tr>
    `)}function ra(){const e=document.getElementById("admin-users-table-body");if(e){if(T.loading){oi();return}if(T.data.length===0){Xa();return}e.innerHTML=T.data.map(t=>`
        <tr class="admin-users-row" data-testid="admin-user-row-${t.id}">
            <td>
                <div class="admin-users-name-cell">
                    <span class="admin-users-avatar" aria-hidden="true">${Qs()}</span>
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
            <td><span class="${ai(t.role)}">${c(t.role)}</span></td>
            <td>
                <div class="admin-users-action-row">
                    <button class="admin-users-icon-button" type="button" data-admin-user-show="${t.id}" data-testid="show-admin-user-${t.id}" aria-label="Lihat detail akun ${c(t.nama)}">
                        ${Ys()}
                    </button>
                    <button class="admin-users-icon-button" type="button" data-admin-user-edit="${t.id}" data-testid="edit-admin-user-${t.id}" aria-label="Edit akun ${c(t.nama)}" ${t.can_edit?"":"disabled"}>
                        ${ei()}
                    </button>
                    <button class="admin-users-icon-button admin-users-icon-button-danger" type="button" data-admin-user-delete="${t.id}" data-admin-user-name="${c(t.nama)}" data-testid="delete-admin-user-${t.id}" aria-label="Hapus akun ${c(t.nama)}" ${t.can_delete?"":"disabled"}>
                        ${ti()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function Wt(){const e=document.getElementById("admin-users-pagination-shell"),t=document.getElementById("admin-users-pagination-info"),n=document.getElementById("admin-users-pagination-page"),a=document.getElementById("admin-users-prev-page-btn"),o=document.getElementById("admin-users-next-page-btn"),r=Math.max(1,Math.ceil(T.totalCount/Ke));e&&(e.hidden=r<=1),t&&(t.textContent=ve(T.page,Ke,T.totalCount,T.data.length)),n&&(n.textContent=`${T.page} / ${r}`),a&&(a.disabled=T.page===1),o&&(o.disabled=T.page>=r)}async function _e(){T.loading=!0,ra(),Wt();try{const e=T.search?`?search=${encodeURIComponent(T.search)}`:"",t=`?page=${T.page}&limit=${Ke}${T.search?`&search=${encodeURIComponent(T.search)}`:""}`,[n,a]=await Promise.all([E(`/admin-users${t}`),E(`/admin-users/count${e}`)]);T.data=Array.isArray(n)?n:[],T.totalCount=Number(a.count||0)}finally{T.loading=!1,ra(),Wt()}}function Za(e="User"){const t=document.getElementById("admin-user-role");if(!t)return;const n=ni(),a=n.includes(e)?e:n[0];t.innerHTML=n.map(o=>`
        <option value="${c(o)}" ${o===a?"selected":""}>${c(o)}</option>
    `).join("")}function Qa(e){const t=document.getElementById("admin-user-password"),n=document.getElementById("admin-user-password-note");t&&(t.required=!e,t.placeholder=e?"Kosongkan jika tidak ingin mengubah password":"Masukkan password",t.value=""),n&&(n.textContent=e?"Kosongkan password jika tidak ingin mengubah password akun ini.":"Password minimal 6 karakter dan akan disimpan dalam bentuk terenkripsi.")}function jt(e="User"){const t=document.getElementById("admin-user-form"),n=document.getElementById("admin-user-form-title"),a=document.getElementById("admin-user-form-description"),o=document.getElementById("admin-user-id");t?.reset(),o&&(o.value=""),Za(e),Qa(!1),n&&(n.textContent=e==="Admin"?"Tambah Admin Baru":"Tambah User Baru"),a&&(a.textContent=e==="Admin"?"Lengkapi data akun untuk menambahkan admin baru":"Lengkapi data akun untuk menambahkan user baru"),T.defaultRole=e,T.editItem=null,wt(!1)}function ri(e){T.editItem=e,document.getElementById("admin-user-id").value=e.id,document.getElementById("admin-user-nama").value=e.nama,document.getElementById("admin-user-username").value=e.username,document.getElementById("admin-user-email").value=e.email,Za(e.role),Qa(!0),document.getElementById("admin-user-form-title").textContent="Edit Akun",document.getElementById("admin-user-form-description").textContent="Perbarui informasi akun admin atau user di bawah ini",wt(!1)}function si(e){const t=document.getElementById("admin-user-detail-list");t&&(t.innerHTML=`
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
            <strong>${c(ss(e.created_at))}</strong>
        </div>
    `)}async function ii(e){si(await E(`/admin-users/${e}`)),H("admin-user-show-modal")}async function di(e){ri(await E(`/admin-users/${e}`)),H("admin-user-form-modal")}function li(e){T.deleteItem=e,document.getElementById("admin-user-delete-copy").innerHTML=`Apakah Anda yakin ingin menghapus akun <strong>${c(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`,H("admin-user-delete-modal")}function sa(){const e=document.getElementById("admin-users-access-note"),t=document.getElementById("admin-users-search-input"),n=document.querySelector(".admin-users-page-actions");e&&(e.hidden=!1,e.textContent="Halaman ini hanya dapat diakses oleh Admin atau Super Admin."),t&&(t.disabled=!0),n&&(n.hidden=!0),T.loading=!1,T.data=[],T.totalCount=0,Xa("Anda tidak memiliki akses untuk mengelola data admin dan user."),Wt()}function ci({user:e}={}){const t=document.getElementById("admin-users-add-admin-btn"),n=document.getElementById("admin-users-add-user-btn"),a=document.getElementById("admin-users-search-input"),o=document.getElementById("admin-user-form"),r=document.getElementById("admin-users-table-body"),s=document.getElementById("admin-user-delete-confirm-btn"),i=document.getElementById("admin-users-prev-page-btn"),u=document.getElementById("admin-users-next-page-btn");if(!(!t||!n||!o||!r)){if(T.currentUser=e||window.transitAuthUser||null,!Xs(T.currentUser?.role)){sa();return}return t.addEventListener("click",()=>{jt("Admin"),H("admin-user-form-modal")}),n.addEventListener("click",()=>{jt("User"),H("admin-user-form-modal")}),a?.addEventListener("input",ye(async d=>{T.search=d.target.value.trim(),T.page=1;try{await _e()}catch(l){v(l.message||"Gagal memuat data akun")}})),o.addEventListener("submit",async d=>{d.preventDefault();const l={nama:document.getElementById("admin-user-nama")?.value.trim()||"",username:document.getElementById("admin-user-username")?.value.trim()||"",email:document.getElementById("admin-user-email")?.value.trim()||"",password:document.getElementById("admin-user-password")?.value||"",role:document.getElementById("admin-user-role")?.value||"User"};wt(!0);try{T.editItem?(await E(`/admin-users/${T.editItem.id}`,{method:"PUT",body:l}),F("Akun berhasil diperbarui")):(await E("/admin-users",{method:"POST",body:l}),F(l.role==="Admin"?"Admin berhasil ditambahkan":"User berhasil ditambahkan")),ee("admin-user-form-modal"),jt(T.defaultRole),await _e()}catch(g){v(g.message||"Silakan periksa kembali data yang diinput","Gagal menyimpan akun")}finally{wt(!1)}}),r.addEventListener("click",async d=>{const l=d.target.closest("[data-admin-user-show]"),g=d.target.closest("[data-admin-user-edit]"),I=d.target.closest("[data-admin-user-delete]");try{if(l){await ii(l.dataset.adminUserShow);return}if(g){await di(g.dataset.adminUserEdit);return}I&&li({id:I.dataset.adminUserDelete,nama:I.dataset.adminUserName})}catch(O){v(O.message||"Gagal memuat detail akun")}}),s?.addEventListener("click",async()=>{if(T.deleteItem)try{await E(`/admin-users/${T.deleteItem.id}`,{method:"DELETE"}),F("Akun berhasil dihapus"),ee("admin-user-delete-modal"),(T.page-1)*Ke>=T.totalCount-1&&T.page>1&&(T.page-=1),T.deleteItem=null,await _e()}catch(d){v(d.message||"Gagal menghapus akun")}}),i?.addEventListener("click",async()=>{if(!(T.page<=1)){T.page-=1;try{await _e()}catch(d){v(d.message||"Gagal memuat data akun")}}}),u?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil(T.totalCount/Ke));if(!(T.page>=d)){T.page+=1;try{await _e()}catch(l){v(l.message||"Gagal memuat data akun")}}}),_e().catch(d=>{if(d.status===403){sa();return}v(d.message||"Gagal memuat data akun")})}}const ia=[{value:"05:30",label:"Subuh",time:"05.30 WIB"},{value:"07:00",label:"Pagi",time:"07.00 WIB"},{value:"09:00",label:"Pagi",time:"09.00 WIB"},{value:"13:00",label:"Siang",time:"13.00 WIB"},{value:"16:00",label:"Sore",time:"16.00 WIB"},{value:"19:00",label:"Malam",time:"19.00 WIB"}],Ya=[[{code:"1A",label:"1A"},{code:"SOPIR",label:"SOPIR",isDriver:!0}],[{code:"2A",label:"2A"},{code:"3A",label:"3A"}],[{code:"4A",label:"4A"},{code:"5A",label:"5A"}]],da=Ya.flat().filter(e=>!e.isDriver).length,p={currentUser:null,date:et(),direction:"from_pkb",bookings:[],loading:!1,drivers:[],mobils:[],formOptions:null,selectedSeats:[],passengerDraftMap:{},editItem:null,editPackageItem:null,deleteItem:null,slotDriverMap:{},slotMobilMap:{},occupiedSeatsForForm:[],occupiedSeatsForPackageForm:[],slotExtraArmadas:{},currentFormArmadaIndex:1,_pendingChoiceArmada:1,_pendingChoiceTime:""};function qt(e){const t=document.getElementById(e);if(!t)return null;try{return JSON.parse(t.textContent||"{}")}catch{return null}}function ui(e){return["Super Admin","Admin"].includes(e)}function mi(e){const t=e?"#dc2626":"#166534",n=e?"#991b1b":"#14532d";return`
        <svg viewBox="0 0 50 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="2" width="30" height="20" rx="8" fill="${t}" stroke="${n}" stroke-width="1.5"/>
            <rect x="5" y="18" width="40" height="28" rx="9" fill="${t}" stroke="${n}" stroke-width="1.5"/>
            <rect x="7" y="44" width="36" height="14" rx="7" fill="${t}" stroke="${n}" stroke-width="1.5" opacity="0.8"/>
            <rect x="2" y="22" width="5" height="18" rx="2.5" fill="${t}" opacity="0.6"/>
            <rect x="43" y="22" width="5" height="18" rx="2.5" fill="${t}" opacity="0.6"/>
        </svg>`}function pi(){return`
        <svg viewBox="0 0 50 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="25" cy="30" r="18" stroke="rgba(148,163,184,0.5)" stroke-width="2.5"/>
            <circle cx="25" cy="30" r="6" fill="rgba(148,163,184,0.4)"/>
            <line x1="25" y1="12" x2="25" y2="24" stroke="rgba(148,163,184,0.5)" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="7" y1="30" x2="19" y2="30" stroke="rgba(148,163,184,0.5)" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="31" y1="30" x2="43" y2="30" stroke="rgba(148,163,184,0.5)" stroke-width="2.5" stroke-linecap="round"/>
        </svg>`}function gi(){return'<svg viewBox="0 0 24 24" fill="none"><path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path><path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg>'}function fi(){return'<svg viewBox="0 0 24 24" fill="none"><path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg>'}function la(){return'<svg viewBox="0 0 24 24" fill="none" style="width:12px;height:12px;flex-shrink:0;"><path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'}function bi(){return'<svg viewBox="0 0 24 24" fill="none" style="width:12px;height:12px;flex-shrink:0;"><rect x="2" y="7" width="15" height="10" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M17 10H20L22 13V17H17V10Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="6" cy="18" r="1.5" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="18" r="1.5" stroke="currentColor" stroke-width="1.5"/></svg>'}function ki(){return'<svg viewBox="0 0 24 24" fill="none" style="width:12px;height:12px;flex-shrink:0;"><path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 2V8H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 13H16M8 17H13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'}function hi(e){return`
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
                    ${Ya.map(n=>`<div class="bpg-seat-row">${n.map(o=>{if(o.isDriver)return`
                    <div class="bpg-seat-item bpg-seat-driver" title="Sopir / Pengemudi">
                        <div class="bpg-seat-icon">${pi()}</div>
                        <span class="bpg-seat-label">SOPIR</span>
                    </div>`;const r=e[o.code],s=!!r,i=s?"bpg-seat-occupied":"bpg-seat-available",u=s?c(r.nama_pemesanan||"-"):"";return`
                <div class="bpg-seat-item ${i}" title="${s?u:"Tersedia"}">
                    <div class="bpg-seat-icon">${mi(s)}</div>
                    <span class="bpg-seat-label">${o.label}</span>
                    ${s?`<span class="bpg-seat-name">${u}</span>`:""}
                </div>`}).join("")}</div>`).join("")}
                </div>
            </div>
        </div>`}function yi(e){if(e.length===0)return`
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
            ${e.map(o=>{const r=o.selected_seats_label||"-",s=o.departure_status||"",i=n(s),u=t.map(d=>{const l=s===d.value;return`<button class="bpg-depart-opt ${d.cls}${l?" is-active":""}" type="button"
                data-departure-status="${c(d.value)}"
                data-booking-departure="${c(String(o.id))}">${c(d.label)}</button>`}).join("");return`
            <div class="bpg-passenger-item" data-booking-id="${c(String(o.id))}">
                <div class="bpg-passenger-item-row">
                    <div class="bpg-passenger-seats">
                        ${r.split(",").map(d=>`<span class="stock-value-badge stock-value-badge-blue">${c(d.trim())}</span>`).join("")}
                    </div>
                    <div class="bpg-passenger-info">
                        <span class="bpg-passenger-name">${c(o.nama_pemesanan||"-")}</span>
                        <span class="bpg-passenger-phone">${c(o.phone||"-")}</span>
                    </div>
                </div>
                <div class="bpg-passenger-item-actions-row">
                    <span class="${c(o.payment_status_badge_class||"stock-value-badge stock-value-badge-blue")} bpg-status-sm">${c(o.payment_status||"-")}</span>
                    <div class="bpg-depart-dropdown" data-depart-dropdown="${c(String(o.id))}">
                        <button class="bpg-depart-trigger ${i.cls}" type="button" data-depart-toggle="${c(String(o.id))}">
                            <svg viewBox="0 0 24 24" fill="none" style="width:11px;height:11px;flex-shrink:0;"><circle cx="12" cy="12" r="2.5" fill="currentColor"/><circle cx="12" cy="5" r="2" fill="currentColor"/><circle cx="12" cy="19" r="2" fill="currentColor"/></svg>
                            ${c(i.label)}
                            <svg viewBox="0 0 24 24" fill="none" style="width:10px;height:10px;flex-shrink:0;"><path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </button>
                        <div class="bpg-depart-menu" hidden>
                            ${u}
                        </div>
                    </div>
                    <div style="flex:1;"></div>
                    <button class="bpg-lihat-btn" type="button" data-booking-lihat="${c(String(o.id))}" aria-label="Lihat detail ${c(o.nama_pemesanan)}">
                        <svg viewBox="0 0 24 24" fill="none" style="width:13px;height:13px;"><path d="M2.5 12C4.4 8.2 8 6 12 6C16 6 19.6 8.2 21.5 12C19.6 15.8 16 18 12 18C8 18 4.4 15.8 2.5 12Z" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/></svg>
                        Lihat
                    </button>
                    <button class="admin-users-icon-button" type="button" data-booking-edit="${c(String(o.id))}" title="Edit pemesanan">
                        ${gi()}
                    </button>
                    <button class="admin-users-icon-button admin-users-icon-button-danger" type="button" data-booking-delete="${c(String(o.id))}" data-booking-name="${c(o.nama_pemesanan)}" title="Hapus pemesanan">
                        ${fi()}
                    </button>
                </div>
            </div>`}).join("")}
        </div>`}function vi(e){const t={};return e.forEach(n=>{(Array.isArray(n.selected_seats)?n.selected_seats:[]).forEach(o=>{t[o]||(t[o]=n)})}),t}function Ei(e,t,n,a){const o=vi(n),r=n.reduce((f,j)=>f+(Number(j.passenger_count)||0),0),s=r>=da,i=`${e.value}__${p.direction}__${t}`;if(!p.slotDriverMap[i]){const f=n.find(j=>j.driver_id);f&&(p.slotDriverMap[i]=f.driver_id)}const u=p.slotDriverMap[i]||"",d=p.slotMobilMap[i]||"",l=s?"stock-value-badge-red":"stock-value-badge-yellow",g=p.drivers.map(f=>{const j=f.lokasi?`${f.nama} (${f.lokasi})`:f.nama;return`<option value="${c(f.id)}" ${u===f.id?"selected":""}>${c(j)}</option>`}).join(""),I=p.mobils.map(f=>{const j=`${f.kode_mobil} — ${f.jenis_mobil}`;return`<option value="${c(f.id)}" ${d===f.id?"selected":""}>${c(j)}</option>`}).join(""),O=[...new Set(n.map(f=>(f.service_type||"").trim()).filter(Boolean))],b=a>1?`<span class="bpg-armada-badge">${bi()} Armada ${t}</span>`:"",h=s?`<button class="bpg-add-armada-btn" type="button"
                data-add-armada="${c(e.value)}"
                data-armada-index="${t}"
                title="Tambah armada ke-${t+1} untuk jadwal ${c(e.time)}">
                ${la()}
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
                            ${O.length>0?O.map(f=>`<span class="bpg-service-badge">${c(f)}</span>`).join(""):'<span class="bpg-service-badge bpg-service-badge--empty">Belum ada layanan</span>'}
                        </div>
                        <span class="stock-value-badge ${l}">${r} / ${da} Kursi</span>
                    </div>
                </div>
                ${h?`<div class="bpg-slot-head-row">${h}</div>`:""}
            </div>

            ${hi(o)}

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
                        ${I}
                    </select>
                </div>
            </div>

            ${yi(n)}

            <button class="bpg-slot-book-btn" type="button"
                data-slot-book="${c(e.value)}"
                data-slot-armada="${t}"
                title="Tambah pemesanan untuk Armada ${t}, jadwal ${c(e.time)}">
                ${la()}
                Tambah Pemesanan Armada ${t}
            </button>
            <button class="bpg-surat-jalan-btn" type="button"
                data-surat-jalan="${c(e.value)}"
                data-surat-jalan-armada="${t}"
                title="Buat Surat Jalan Armada ${t}, jadwal ${c(e.time)}">
                ${ki()}
                Surat Jalan
            </button>
        </article>`}function wi(e,t){const n={};t.forEach(u=>{const d=u.armada_index||1;n[d]||(n[d]=[]),n[d].push(u)});const a=`${e.value}__${p.direction}`,o=t.length>0?Math.max(...Object.keys(n).map(Number)):1,r=p.slotExtraArmadas[a]||1,s=Math.max(o,r),i=[];for(let u=1;u<=s;u++)i.push(Ei(e,u,n[u]||[],s));return`<div class="bpg-slot-group" data-slot-group="${c(e.value)}">${i.join("")}</div>`}function Bi(){const e=document.getElementById("bpg-slots-shell");e&&(e.innerHTML=`
            <div class="admin-users-loading-inline" style="padding:40px 0;">
                <span class="admin-users-loading-inline-spinner" aria-hidden="true"></span>
                <span>Memuat data penumpang...</span>
            </div>`)}function eo(){const e=document.getElementById("bpg-slots-shell");if(!e)return;const t={};ia.forEach(a=>{t[a.value]=[]}),p.bookings.forEach(a=>{const r=(a.trip_time||"").trim().substring(0,5);t[r]&&t[r].push(a)});const n=ia.map(a=>wi(a,t[a.value]||[]));e.innerHTML=`<div class="bpg-slots-grid">${n.join("")}</div>`}async function $e(){p.loading=!0,Bi();try{const e=new URLSearchParams({date:p.date,direction:p.direction,limit:200,page:1}),[t,n]=await Promise.all([E(`/bookings?${e}`),E(`/bookings/armada-extras?date=${p.date}`).catch(()=>({}))]);p.bookings=Array.isArray(t)?t:[],n&&typeof n=="object"&&Object.entries(n).forEach(([a,o])=>{const r=`${a}__${p.direction}`;p.slotExtraArmadas[r]=Math.max(p.slotExtraArmadas[r]||1,Number(o)||1)})}catch(e){p.bookings=[],e.status!==403&&v(e.message||"Gagal memuat data penumpang")}finally{p.loading=!1,eo()}}function ca(e){return{Aktif:"green",Selesai:"green",Dibayar:"green","Dibayar Tunai":"green",Draft:"gray","Belum Bayar":"orange","Menunggu Pembayaran":"blue","Menunggu Verifikasi":"blue","Menunggu Konfirmasi":"blue",Batal:"red",Reguler:"purple",Paket:"blue"}[e]||"gray"}function Ii(e){document.getElementById("bpg-detail-title").textContent=e.nama_pemesanan||"-",document.getElementById("bpg-detail-subtitle").textContent=e.booking_code||"-",document.getElementById("bpg-detail-full-link").href=`/dashboard/bookings/${e.id}`;const t=e.category==="Paket",n=document.getElementById("bpg-detail-ticket-link"),a=document.getElementById("bpg-detail-surat-link");t?(n.hidden=!0,a.hidden=!1,a.href=`/dashboard/bookings/${e.id}/surat-bukti`):(n.hidden=!1,n.href=`/unduh/tiket-reguler/${e.booking_code}`,a.hidden=!0);const o=e.booking_status||"",r=e.payment_status||"",s=e.service_type||"",i=(e.pickup_location||"").trim()!=="",u=(e.dropoff_location||"").trim()!=="",d=document.getElementById("bpg-detail-body");d.innerHTML=`
        <!-- Status Badges -->
        <div class="bpg-dv-status-bar">
            ${o?`<span class="bpg-dv-badge bpg-dv-badge--${ca(o)}">${c(o)}</span>`:""}
            ${r?`<span class="bpg-dv-badge bpg-dv-badge--${ca(r)}">${c(r)}</span>`:""}
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
    `,H("bpg-detail-modal")}function _i(){return(p.formOptions?.seat_options||[]).map(e=>e.code)}function fn(e){const t=new Map(_i().map((n,a)=>[n,a]));return Array.from(new Set((e||[]).map(n=>String(n).trim()).filter(n=>t.has(n)))).sort((n,a)=>(t.get(n)??999)-(t.get(a)??999))}function Lt(){return Number(document.getElementById("booking-passenger-count")?.value||0)}function $i(){const e=Lt();return(p.formOptions?.seat_options||[]).filter(t=>!t.is_optional||e>=6).map(t=>t.code)}function Si(){return p.formOptions?.payment_status_options||[]}function Ci(e){return e==="transfer"?["Belum Bayar","Menunggu Pembayaran","Menunggu Verifikasi","Dibayar"]:e==="qris"?["Belum Bayar","Menunggu Pembayaran","Dibayar"]:e==="cash"?["Belum Bayar","Dibayar Tunai"]:["Belum Bayar"]}function xi(e){return e==="transfer"?"Menunggu Pembayaran":e==="qris"?"Dibayar":e==="cash"?"Dibayar Tunai":"Belum Bayar"}function Ti(e){return e==="transfer"?"Menunggu Verifikasi Pembayaran":e==="qris"||e==="cash"?"Diproses":"Draft"}function Li(e,t){if(!e||!t||e===t)return null;const a=(p.formOptions?.route_matrix||{})?.[e]?.[t];return a==null?null:Number(a)}function to(){return Math.max(0,parseInt(document.getElementById("booking-additional-fare")?.value||"0",10)||0)}function xe(){const e=document.getElementById("booking-from-city")?.value||"",t=document.getElementById("booking-to-city")?.value||"",n=Lt(),a=Li(e,t),o=to(),r=a!==null?a+o:null,s=r!==null?r*n:null,i=document.getElementById("booking-price-per-seat"),u=document.getElementById("booking-total-amount");i&&(i.value=a!==null?J(a):""),u&&(u.value=s!==null?J(s):"")}function bn(){const e=document.getElementById("booking-payment-method")?.value||"",t=document.getElementById("booking-payment-status"),n=document.getElementById("booking-booking-status"),a=document.getElementById("booking-bank-account-group"),o=document.getElementById("booking-bank-account-code"),r=Ci(e),s=t?.value||"";a&&(a.hidden=e!=="transfer"),o&&e!=="transfer"&&(o.value=""),t&&(t.innerHTML=Si().filter(i=>r.includes(i.value)).map(i=>`<option value="${c(i.value)}">${c(i.label)}</option>`).join(""),t.value=r.includes(s)?s:xi(e)),n&&(n.value=Ti(e))}function Ai(){const e=document.getElementById("booking-selected-seats-inputs");e&&(e.innerHTML=p.selectedSeats.map(t=>`<input type="hidden" name="selected_seats[]" value="${c(t)}">`).join(""))}function Mi(){const e=document.getElementById("booking-selected-seat-count"),t=document.getElementById("booking-selected-seat-label");e&&(e.textContent=String(p.selectedSeats.length)),t&&(t.textContent=p.selectedSeats.length>0?p.selectedSeats.join(", "):"Belum dipilih")}function Xt(){document.querySelectorAll("[data-passenger-seat]").forEach(e=>{const t=e.dataset.passengerSeat;t&&(p.passengerDraftMap[t]={seat_no:t,name:e.querySelector("[data-passenger-name]")?.value.trim()||"",phone:e.querySelector("[data-passenger-phone]")?.value.trim()||""})})}function me(e=null){const t=document.getElementById("booking-passenger-editor");if(t){if(e&&(p.passengerDraftMap=Object.fromEntries(e.map(n=>[n.seat_no,n]))),p.selectedSeats.length===0){t.innerHTML='<div class="dashboard-empty-state dashboard-empty-state--block bookings-passenger-empty">Pilih kursi terlebih dahulu untuk menampilkan form data penumpang.</div>';return}t.innerHTML=`
        <div class="bookings-passenger-grid bookings-passenger-grid--editor">
            ${p.selectedSeats.map((n,a)=>{const o=p.passengerDraftMap[n]||{name:"",phone:""};return`
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
                                    <input type="text" value="${c(o.name||"")}" placeholder="Masukkan nama penumpang" data-passenger-name>
                                </div>
                            </div>
                            <div class="admin-users-form-group">
                                <label>No HP</label>
                                <div class="admin-users-input-shell">
                                    <input type="text" value="${c(o.phone||"")}" placeholder="08xxxxxxxxxx" data-passenger-phone>
                                </div>
                            </div>
                        </div>
                    </article>`}).join("")}
        </div>`}}async function He(){const e=document.getElementById("booking-trip-date")?.value||"",t=document.getElementById("booking-trip-time")?.value||"",n=document.getElementById("booking-from-city")?.value||"",a=document.getElementById("booking-to-city")?.value||"",o=p.editItem?.id||"",r=p.currentFormArmadaIndex||1;if(!e||!t){p.occupiedSeatsForForm=[];return}try{const s=new URLSearchParams({trip_date:e,trip_time:t,armada_index:r});n&&s.set("from_city",n),a&&s.set("to_city",a),o&&s.set("exclude_id",o);const i=await E(`/bookings/occupied-seats?${s}`);p.occupiedSeatsForForm=Array.isArray(i?.occupied_seats)?i.occupied_seats:[]}catch{p.occupiedSeatsForForm=[]}}async function Se(){const e=document.getElementById("pkg-trip-date")?.value||"",t=document.getElementById("pkg-trip-time")?.value||"",n=document.getElementById("pkg-from-city")?.value||"",a=document.getElementById("pkg-to-city")?.value||"",o=parseInt(document.getElementById("package-armada-index")?.value||"1",10);if(!e||!t){p.occupiedSeatsForPackageForm=[],ua();return}try{const r=new URLSearchParams({trip_date:e,trip_time:t,armada_index:o});n&&r.set("from_city",n),a&&r.set("to_city",a);const s=await E(`/bookings/occupied-seats?${r}`);p.occupiedSeatsForPackageForm=Array.isArray(s?.occupied_seats)?s.occupied_seats:[]}catch{p.occupiedSeatsForPackageForm=[]}ua()}function ua(){const e=document.getElementById("pkg-seat-code");if(!e)return;const t=(p.formOptions?.seat_options||[]).filter(o=>!o.is_optional),n=p.occupiedSeatsForPackageForm||[],a=e.value;e.innerHTML='<option value="">Pilih kursi</option>'+t.map(o=>{const r=n.includes(o.code);return`<option value="${c(o.code)}"${r?" disabled":""}>${c(o.label)}${r?" — Sudah dipesan":""}</option>`}).join(""),a&&!n.includes(a)&&(e.value=a)}function pe(){const e=document.querySelectorAll("[data-seat-code]"),t=Lt(),n=$i();p.selectedSeats=fn(p.selectedSeats.filter(a=>n.includes(a)&&!p.occupiedSeatsForForm.includes(a))),e.forEach(a=>{const o=a.dataset.seatCode,r=n.includes(o),s=p.occupiedSeatsForForm.includes(o),i=p.selectedSeats.includes(o),u=p.selectedSeats.length>=t&&!i;a.hidden=!r,a.classList.toggle("is-selected",i),a.classList.toggle("is-occupied",s),a.classList.toggle("is-disabled",!s&&u),a.disabled=!r||s||!i&&u,s?a.title="Kursi sudah dipesan":a.title=""}),Ai(),Mi()}function Nt(e=1,t=""){document.getElementById("booking-form")?.reset(),p.editItem=null,p.selectedSeats=[],p.passengerDraftMap={},p.currentFormArmadaIndex=e;const a=p.date||et();document.getElementById("booking-id").value="",document.getElementById("booking-armada-index").value=String(e),document.getElementById("booking-form-title").textContent="Tambah Pemesanan";const o=e>1?` (Armada ${e})`:"";document.getElementById("booking-form-description").textContent=`Lengkapi data pemesanan reguler dari dashboard admin${o}.`,document.getElementById("booking-trip-date").value=a,document.getElementById("booking-trip-time").value=t||"";const r=document.getElementById("booking-from-city"),s=document.getElementById("booking-to-city");r&&(r.value=""),s&&(s.value=""),document.getElementById("booking-passenger-count").value="1",document.getElementById("booking-additional-fare").value="0",document.getElementById("booking-payment-method").value="",document.getElementById("booking-booking-status").value="Draft",bn(),xe(),se(document.getElementById("booking-submit-btn"),!1,"Menyimpan..."),He().then(()=>{pe(),me()})}function Ri(e){p.editItem=e,p.selectedSeats=fn(e.selected_seats||[]),p.passengerDraftMap=Object.fromEntries((e.passengers||[]).map(n=>[n.seat_no,n])),p.currentFormArmadaIndex=e.armada_index||1,document.getElementById("booking-id").value=e.id,document.getElementById("booking-armada-index").value=String(e.armada_index||1),document.getElementById("booking-booking-for").value=e.booking_for,document.getElementById("booking-category").value=e.category,document.getElementById("booking-from-city").value=e.from_city,document.getElementById("booking-to-city").value=e.to_city,document.getElementById("booking-trip-date").value=e.trip_date_value,document.getElementById("booking-trip-time").value=e.trip_time_value,document.getElementById("booking-passenger-count").value=String(e.passenger_count),document.getElementById("booking-driver-name").value=e.driver_name==="Menunggu Penetapan Driver"?"":e.driver_name||"",document.getElementById("booking-additional-fare").value=String(e.additional_fare_per_passenger||0),document.getElementById("booking-pickup-location").value=e.pickup_location,document.getElementById("booking-dropoff-location").value=e.dropoff_location,document.getElementById("booking-payment-method").value=e.payment_method_value||"",bn(),document.getElementById("booking-payment-status").value=e.payment_status,document.getElementById("booking-booking-status").value=e.booking_status,document.getElementById("booking-bank-account-code").value=e.bank_account_code||"",document.getElementById("booking-notes").value=e.notes||"";const t=(e.armada_index||1)>1?` (Armada ${e.armada_index})`:"";document.getElementById("booking-form-title").textContent="Edit Pemesanan",document.getElementById("booking-form-description").textContent=`Perbarui data pemesanan reguler yang dipilih${t}.`,xe(),se(document.getElementById("booking-submit-btn"),!1,"Menyimpan..."),He().then(()=>{pe(),me(e.passengers||[])})}function Pi(){return Xt(),{booking_for:document.getElementById("booking-booking-for")?.value||"",category:document.getElementById("booking-category")?.value||"Reguler",from_city:document.getElementById("booking-from-city")?.value||"",to_city:document.getElementById("booking-to-city")?.value||"",trip_date:document.getElementById("booking-trip-date")?.value||"",trip_time:document.getElementById("booking-trip-time")?.value||"",passenger_count:Number(document.getElementById("booking-passenger-count")?.value||0),driver_name:document.getElementById("booking-driver-name")?.value.trim()||"",additional_fare_per_passenger:to(),pickup_location:document.getElementById("booking-pickup-location")?.value.trim()||"",dropoff_location:document.getElementById("booking-dropoff-location")?.value.trim()||"",selected_seats:p.selectedSeats,passengers:p.selectedSeats.map(e=>({seat_no:e,name:p.passengerDraftMap?.[e]?.name||"",phone:p.passengerDraftMap?.[e]?.phone||""})),payment_method:document.getElementById("booking-payment-method")?.value||"",payment_status:document.getElementById("booking-payment-status")?.value||"Belum Bayar",booking_status:document.getElementById("booking-booking-status")?.value||"Draft",bank_account_code:document.getElementById("booking-bank-account-code")?.value||"",notes:document.getElementById("booking-notes")?.value.trim()||"",armada_index:p.currentFormArmadaIndex||1}}let Zt=null;async function Di(e){const t=await E(`/bookings/${e}`);t.category==="Paket"&&Zt?(Zt(t),H("package-form-modal")):(Ri(t),H("booking-form-modal"))}function Oi(e){p.deleteItem=e,document.getElementById("booking-delete-copy").innerHTML=`Apakah Anda yakin ingin menghapus data pemesanan <strong>${c(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`,H("booking-delete-modal")}function ma(){const e=document.getElementById("bookings-access-note"),t=document.getElementById("bpg-route-tabs"),n=document.getElementById("bpg-slots-shell");e&&(e.hidden=!1),t&&(t.hidden=!0),n&&(n.hidden=!0)}function ji(e){return e==="Berangkat"?{label:"Berangkat",cls:"bpg-depart-trigger--go"}:e==="Tidak Berangkat"?{label:"Tidak Berangkat",cls:"bpg-depart-trigger--no"}:e==="Di Oper"?{label:"Di Oper",cls:"bpg-depart-trigger--oper"}:{label:"Status",cls:""}}function qi({user:e}={}){const t=document.getElementById("bookings-add-btn"),n=document.getElementById("bookings-date-picker"),a=document.getElementById("bpg-route-tabs"),o=document.getElementById("bpg-slots-shell"),r=document.getElementById("booking-form"),s=document.getElementById("booking-delete-confirm-btn"),i=document.getElementById("booking-seat-grid"),u=document.getElementById("booking-passenger-editor"),d=document.getElementById("booking-payment-method");if(p.formOptions=qt("bookings-form-options"),p.drivers=qt("bookings-drivers-data")||[],p.mobils=qt("bookings-mobils-data")||[],p.currentUser=e||window.transitAuthUser||null,p.date=et(),!ui(p.currentUser?.role)){ma();return}const l=document.getElementById("bpg-route-tabs");l&&(l.hidden=!1),o&&(o.hidden=!1);const g=document.getElementById("bookings-access-note");g&&(g.hidden=!0),n&&(n.value=p.date,n.addEventListener("change",async()=>{p.date=n.value,p.slotDriverMap={},p.slotMobilMap={},p.slotExtraArmadas={},await $e()})),a?.addEventListener("click",async k=>{const y=k.target.closest("[data-direction]");if(!y)return;const B=y.dataset.direction;B!==p.direction&&(p.direction=B,p.slotDriverMap={},p.slotMobilMap={},p.slotExtraArmadas={},document.querySelectorAll(".bpg-route-tab").forEach(P=>{P.classList.toggle("is-active",P.dataset.direction===B)}),await $e())});function I(k=null){o?.querySelectorAll("[data-depart-dropdown]").forEach(y=>{String(y.dataset.departDropdown)!==String(k)&&(y.querySelector(".bpg-depart-menu")?.removeAttribute("hidden"),y.querySelector(".bpg-depart-menu")?.setAttribute("hidden",""))})}document.addEventListener("click",k=>{k.target.closest("[data-depart-dropdown]")||I()}),o?.addEventListener("click",async k=>{const y=k.target.closest("[data-depart-toggle]"),B=k.target.closest("[data-booking-departure]"),P=k.target.closest("[data-booking-lihat]"),C=k.target.closest("[data-booking-edit]"),N=k.target.closest("[data-booking-delete]"),V=k.target.closest("[data-add-armada]"),K=k.target.closest("[data-slot-book]"),z=k.target.closest("[data-surat-jalan]");try{if(y){const R=y.dataset.departToggle,A=o.querySelector(`[data-depart-dropdown="${CSS.escape(R)}"]`)?.querySelector(".bpg-depart-menu");if(!A)return;const U=A.hasAttribute("hidden");I(R),A.toggleAttribute("hidden",!U);return}if(B){const R=B.dataset.bookingDeparture,w=B.dataset.departureStatus,A=p.bookings.find(X=>String(X.id)===String(R));if(!A)return;const U=A.departure_status===w?"":w;A.departure_status=U;const te=o.querySelector(`[data-depart-dropdown="${CSS.escape(R)}"]`);if(te){const X=te.querySelector(".bpg-depart-trigger"),Z=ji(U);X.className=`bpg-depart-trigger ${Z.cls}`,X.childNodes.forEach(Q=>{Q.nodeType===3&&(Q.textContent=Z.label)}),te.querySelectorAll("[data-booking-departure]").forEach(Q=>{Q.classList.toggle("is-active",Q.dataset.departureStatus===U)}),te.querySelector(".bpg-depart-menu")?.setAttribute("hidden","")}const W=p.bookings.find(X=>String(X.id)===String(R));await E(`/bookings/${R}/departure-status`,{method:"PATCH",body:{departure_status:U,version:W?.version??0}});return}if(P){const R=P.dataset.bookingLihat,w=p.bookings.find(A=>String(A.id)===String(R));w&&Ii(w);return}if(C){await Di(C.dataset.bookingEdit);return}if(N){const R=N.dataset.bookingDelete,w=p.bookings.find(A=>String(A.id)===String(R));Oi({id:R,nama:N.dataset.bookingName,version:w?.version??0});return}if(V){const R=V.dataset.addArmada,A=parseInt(V.dataset.armadaIndex||"1")+1,U=`${R}__${p.direction}`;p.slotExtraArmadas[U]=Math.max(p.slotExtraArmadas[U]||1,A),E("/bookings/armada-extras",{method:"POST",body:{trip_date:p.date,trip_time:R,armada_index:A}}).catch(()=>{}),eo(),p._pendingChoiceArmada=A,p._pendingChoiceTime=R,H("booking-type-choice-modal");return}if(K){const R=K.dataset.slotBook,w=parseInt(K.dataset.slotArmada||"1");p._pendingChoiceArmada=w,p._pendingChoiceTime=R,H("booking-type-choice-modal");return}if(z){const R=z.dataset.suratJalan,w=parseInt(z.dataset.suratJalanArmada||"1"),A=`${R}__${p.direction}__${w}`,U=p.slotDriverMap[A]||"",te=p.slotMobilMap[A]||"",W=U?p.drivers.find(Q=>String(Q.id)===String(U)):null,X=te?p.mobils.find(Q=>String(Q.id)===String(te)):null,Z=new URLSearchParams({date:p.date,trip_time:R,armada_index:String(w),direction:p.direction});W&&Z.set("driver_name",W.nama),X&&Z.set("no_pol",X.kode_mobil),window.open(`/dashboard/bookings/surat-jalan?${Z}`,"_blank");return}}catch(R){if(at(R))return;v(R.message||"Gagal memuat data pemesanan")}}),o?.addEventListener("change",async k=>{const y=k.target.closest("[data-slot-driver]"),B=k.target.closest("[data-slot-mobil]");if(y){const[P,C]=y.dataset.slotDriver.split("__"),N=parseInt(C||"1"),V=y.value,K=y.options[y.selectedIndex],z=V&&K?.text.split(" (")[0]||"",R=`${P}__${p.direction}__${N}`;p.slotDriverMap[R]=V;try{await E("/bookings/slot-assign",{method:"PATCH",body:{trip_date:p.date,trip_time:P,direction:p.direction,armada_index:N,driver_id:V||null,driver_name:z}}),F("Driver berhasil diperbarui")}catch(w){v(w.message||"Gagal memperbarui driver")}}if(B){const[P,C]=B.dataset.slotMobil.split("__"),N=parseInt(C||"1"),V=B.value,K=`${P}__${p.direction}__${N}`;p.slotMobilMap[K]=V}});function O(k=1,y=""){p.editPackageItem=null;const B=document.getElementById("package-form");B&&B.reset();const P=document.getElementById("package-armada-index");P&&(P.value=String(k));const C=document.getElementById("pkg-trip-date");C&&(C.value=p.date);const N=document.getElementById("pkg-trip-time");N&&y&&(N.value=y);const V=document.getElementById("pkg-bank-account-group");V&&(V.hidden=!0);const K=document.getElementById("pkg-seat-group");K&&(K.hidden=!0);const z=document.getElementById("package-form-success-banner");z&&(z.hidden=!0);const R=document.querySelector("#package-form-modal .admin-users-dialog-head h3");R&&(R.textContent="Pengirim Paket");const w=document.getElementById("package-form-description");w&&(w.textContent="Lengkapi data pengiriman paket. Surat Bukti Pengiriman tersedia setelah disimpan."),h(),Se()}function b(k){let y={};try{y=k.notes?JSON.parse(k.notes):{}}catch(Q){console.warn("Failed to parse package notes JSON:",Q),y={}}p.editPackageItem={id:k.id,booking_code:k.booking_code,version:k.version||0};const B=document.getElementById("package-form");B&&B.reset();const P=document.getElementById("package-armada-index");P&&(P.value=String(k.armada_index||1));const C=(Q,Oe)=>{const ie=document.getElementById(Q);ie&&(ie.value=Oe)};C("pkg-trip-date",k.trip_date_value||k.trip_date||""),C("pkg-trip-time",k.trip_time_value||k.trip_time||""),C("pkg-from-city",k.from_city||""),C("pkg-to-city",k.to_city||""),C("pkg-sender-name",k.nama_pemesanan||""),C("pkg-sender-phone",k.phone||""),C("pkg-sender-address",k.pickup_location||""),C("pkg-recipient-name",y.recipient_name||""),C("pkg-recipient-phone",y.recipient_phone||""),C("pkg-recipient-address",k.dropoff_location||""),C("pkg-item-name",y.item_name||""),C("pkg-item-qty",String(y.item_qty||k.passenger_count||1));const N=y.package_size||k.booking_for||"Kecil";C("pkg-package-size",N);const V=Array.isArray(k.selected_seats)&&k.selected_seats.length>0?k.selected_seats[0]:"";C("pkg-seat-code",V);const K=document.getElementById("pkg-seat-group");K&&(K.hidden=N!=="Besar"),C("pkg-fare-amount",String(k.price_per_seat||0));const z=Math.max(1,parseInt(y.item_qty||k.passenger_count||1,10)),R=parseInt(k.price_per_seat||0,10)||0,w=parseInt(k.total_amount||0,10)||0,A=Math.max(0,Math.round(w/z)-R);C("pkg-additional-fare",String(A));const U=k.payment_method_value||"";C("pkg-payment-method",U),C("pkg-payment-status",k.payment_status||"Belum Bayar"),C("pkg-bank-account-code",k.bank_account_code||"");const te=document.getElementById("pkg-bank-account-group");te&&(te.hidden=U!=="transfer");const W=document.getElementById("package-form-success-banner");W&&(W.hidden=!0);const X=document.querySelector("#package-form-modal .admin-users-dialog-head h3");X&&(X.textContent="Edit Pengiriman Paket");const Z=document.getElementById("package-form-description");Z&&(Z.textContent=`Perbarui data pengiriman paket untuk booking ${k.booking_code||""}.`),h(),Se()}Zt=b;function h(){const k=parseInt(document.getElementById("pkg-fare-amount")?.value||"0",10)||0,y=parseInt(document.getElementById("pkg-additional-fare")?.value||"0",10)||0,B=parseInt(document.getElementById("pkg-item-qty")?.value||"1",10)||1,P=(k+y)*B,C=document.getElementById("pkg-total-display");C&&(C.value=P>0?"Rp "+P.toLocaleString("id-ID"):"")}document.getElementById("pkg-fare-amount")?.addEventListener("input",h),document.getElementById("pkg-additional-fare")?.addEventListener("input",h),document.getElementById("pkg-item-qty")?.addEventListener("input",h),document.getElementById("pkg-payment-method")?.addEventListener("change",k=>{const y=document.getElementById("pkg-bank-account-group");y&&(y.hidden=k.target.value!=="transfer")}),document.getElementById("pkg-package-size")?.addEventListener("change",k=>{const y=document.getElementById("pkg-seat-group");y&&(y.hidden=k.target.value!=="Besar");const B=document.getElementById("pkg-seat-code");B&&k.target.value!=="Besar"&&(B.value="")}),document.getElementById("pkg-trip-date")?.addEventListener("change",()=>{Se()}),document.getElementById("pkg-trip-time")?.addEventListener("change",()=>{Se()}),document.getElementById("pkg-from-city")?.addEventListener("change",()=>{Se()}),document.getElementById("pkg-to-city")?.addEventListener("change",()=>{Se()}),document.getElementById("package-form")?.addEventListener("submit",async k=>{k.preventDefault();const y=document.getElementById("package-submit-btn");se(y,!0,"Menyimpan...");try{const B=parseInt(document.getElementById("pkg-fare-amount")?.value||"0",10)||0,P=parseInt(document.getElementById("pkg-additional-fare")?.value||"0",10)||0,C=parseInt(document.getElementById("pkg-item-qty")?.value||"1",10)||1,N=document.getElementById("pkg-payment-method")?.value||"",V={armada_index:parseInt(document.getElementById("package-armada-index")?.value||"1",10),trip_date:document.getElementById("pkg-trip-date")?.value||"",trip_time:document.getElementById("pkg-trip-time")?.value||"",from_city:document.getElementById("pkg-from-city")?.value||"",to_city:document.getElementById("pkg-to-city")?.value||"",sender_name:document.getElementById("pkg-sender-name")?.value.trim()||"",sender_phone:document.getElementById("pkg-sender-phone")?.value.trim()||"",sender_address:document.getElementById("pkg-sender-address")?.value.trim()||"",recipient_name:document.getElementById("pkg-recipient-name")?.value.trim()||"",recipient_phone:document.getElementById("pkg-recipient-phone")?.value.trim()||"",recipient_address:document.getElementById("pkg-recipient-address")?.value.trim()||"",item_name:document.getElementById("pkg-item-name")?.value.trim()||"",item_qty:C,package_size:document.getElementById("pkg-package-size")?.value||"",seat_code:document.getElementById("pkg-package-size")?.value==="Besar"&&document.getElementById("pkg-seat-code")?.value||"",fare_amount:B,additional_fare:P,payment_method:N||null,payment_status:document.getElementById("pkg-payment-status")?.value||"Belum Bayar",bank_account_code:N==="transfer"&&document.getElementById("pkg-bank-account-code")?.value||""},K=!!p.editPackageItem;let z;K?(V.version=p.editPackageItem.version,z=await E(`/bookings/quick-package/${p.editPackageItem.id}`,{method:"PUT",body:V})):z=await E("/bookings/quick-package",{method:"POST",body:V});const R=document.getElementById("package-form-success-banner"),w=document.getElementById("package-form-booking-code"),A=document.getElementById("package-form-download-link");R&&(R.hidden=!1),w&&(w.textContent=(K?"Paket diperbarui: ":"Kode Booking: ")+z.booking_code+(z.invoice_number&&z.invoice_number!=="-"?" | No. Surat: "+z.invoice_number:"")),A&&(A.href=z.invoice_download_url),F((K?"Paket diperbarui: ":"Paket berhasil disimpan: ")+z.booking_code),await $e(),p.editPackageItem=null}catch(B){if(at(B))return;v(B.message||"Silakan periksa kembali data yang diinput",p.editPackageItem?"Gagal memperbarui paket":"Gagal menyimpan paket")}finally{se(y,!1,"Menyimpan...")}}),document.getElementById("choice-passenger-btn")?.addEventListener("click",()=>{ee("booking-type-choice-modal"),Nt(p._pendingChoiceArmada||1,p._pendingChoiceTime||""),H("booking-form-modal"),requestAnimationFrame(()=>xe())}),document.getElementById("choice-package-btn")?.addEventListener("click",()=>{ee("booking-type-choice-modal"),O(p._pendingChoiceArmada||1,p._pendingChoiceTime||""),H("package-form-modal")}),t?.addEventListener("click",()=>{p._pendingChoiceArmada=1,p._pendingChoiceTime="",H("booking-type-choice-modal")}),i?.addEventListener("click",k=>{const y=k.target.closest("[data-seat-code]");if(!y||y.disabled)return;Xt();const B=y.dataset.seatCode;p.selectedSeats.includes(B)?p.selectedSeats=p.selectedSeats.filter(P=>P!==B):p.selectedSeats.length<Lt()&&(p.selectedSeats=fn([...p.selectedSeats,B])),pe(),me()}),document.getElementById("booking-passenger-count")?.addEventListener("change",()=>{Xt(),pe(),me(),xe()}),document.getElementById("booking-additional-fare")?.addEventListener("input",xe),document.getElementById("booking-trip-date")?.addEventListener("change",()=>{He().then(()=>{pe(),me()})}),document.getElementById("booking-trip-time")?.addEventListener("change",()=>{He().then(()=>{pe(),me()})});let f=!1;function j(){xe(),!f&&(f=!0,setTimeout(()=>{f=!1,He().then(()=>{pe(),me()})},50))}return["change","input"].forEach(k=>{document.getElementById("booking-from-city")?.addEventListener(k,j),document.getElementById("booking-to-city")?.addEventListener(k,j)}),d?.addEventListener("change",bn),u?.addEventListener("input",k=>{const y=k.target.closest("[data-passenger-seat]");if(!y)return;const B=y.dataset.passengerSeat;p.passengerDraftMap[B]={seat_no:B,name:y.querySelector("[data-passenger-name]")?.value.trim()||"",phone:y.querySelector("[data-passenger-phone]")?.value.trim()||""}}),r?.addEventListener("submit",async k=>{k.preventDefault();const y=document.getElementById("booking-submit-btn");se(y,!0,"Menyimpan...");try{const B=Pi();if(p.editItem){const P={...B,version:p.editItem.version};await E(`/bookings/${p.editItem.id}`,{method:"PUT",body:P}),F("Data pemesanan berhasil diperbarui")}else await E("/bookings",{method:"POST",body:B}),F("Data pemesanan berhasil ditambahkan");ee("booking-form-modal"),Nt(),await $e()}catch(B){if(at(B))return;v(B.message||"Silakan periksa kembali data yang diinput","Gagal menyimpan data pemesanan")}finally{se(y,!1,"Menyimpan...")}}),s?.addEventListener("click",async()=>{if(p.deleteItem){se(s,!0,"Menghapus...");try{await E(`/bookings/${p.deleteItem.id}?version=${p.deleteItem.version}`,{method:"DELETE"}),F("Data pemesanan berhasil dihapus"),ee("booking-delete-modal"),p.deleteItem=null,await $e()}catch(k){if(at(k))return;v(k.message||"Gagal menghapus data pemesanan")}finally{se(s,!1,"Menghapus...")}}}),Nt(),$e().catch(k=>{if(k.status===403){ma();return}v(k.message||"Gagal memuat data penumpang")})}function Ni(e){const t=document.getElementById(e);if(!t)return{};try{return JSON.parse(t.textContent||"{}")}catch{return{}}}function Ui(){const e=document.querySelector("[data-regular-booking-page]");if(!e)return;const t=Ni("regular-booking-route-matrix"),n=e.querySelector("[data-booking-origin]"),a=e.querySelector("[data-booking-destination]"),o=e.querySelector("[data-booking-schedule]"),r=e.querySelector("[data-booking-passengers]"),s=e.querySelector("[data-route-fare-input]"),i=e.querySelector("[data-additional-fare-input]"),u=e.querySelector("[data-estimated-total-input]"),d=e.querySelector("[data-route-feedback]"),l=e.querySelector("[data-route-feedback-title]"),g=e.querySelector("[data-route-feedback-text]"),I=e.querySelector("[data-booking-submit]"),O=Array.from(e.querySelectorAll("[data-booking-type]")),b=e.querySelector("[data-summary-booking-for]"),h=e.querySelector("[data-summary-route]"),f=e.querySelector("[data-summary-schedule]"),j=e.querySelector("[data-summary-passengers]"),k=e.querySelector("[data-summary-fare]"),y=e.querySelector("[data-summary-additional-fare]"),B=e.querySelector("[data-summary-total]"),P=new Map(O.map(w=>[w.value,w.dataset.label||w.value])),C=new Map(Array.from(o?.options||[]).filter(w=>w.value).map(w=>[w.value,w.textContent.trim()]));function N(w,A){if(!w||!A||w===A)return null;const U=t?.[w]?.[A];return U==null?null:Number(U)}function V(w,A,U){!d||!l||!g||(d.dataset.state=w,l.textContent=A,g.textContent=U)}function K(){e.querySelectorAll(".regular-booking-radio").forEach(w=>{const A=w.querySelector('input[type="radio"]');w.classList.toggle("is-selected",!!A?.checked)})}function z(w){return w<=0?"Belum dipilih":w===6?"6 Penumpang (Opsional tambahan)":`${w} Penumpang`}function R(){const w=n?.value||"",A=a?.value||"",U=o?.value||"",te=Number(r?.value||0),W=O.find(Oe=>Oe.checked)?.value||"",X=N(w,A),Z=Math.max(parseInt(i?.value||"0",10)||0,0),Q=X!==null&&te>0?(X+Z)*te:null;s&&(s.value=X!==null?J(X):""),u&&(u.value=Q!==null?J(Q):""),!w||!A?V("idle","Tarif akan ditampilkan otomatis","Pilih asal dan tujuan untuk melihat tarif perjalanan reguler."):w===A?V("error","Asal dan tujuan tidak boleh sama","Silakan pilih tujuan yang berbeda agar tarif dapat dihitung."):X===null?V("error","Rute belum tersedia","Rute yang Anda pilih saat ini belum tersedia. Silakan pilih kombinasi asal dan tujuan lain."):V("ready","Rute tersedia","Tarif telah diisi otomatis berdasarkan kombinasi rute dua arah yang tersedia."),I&&(I.disabled=!!(w&&A&&(w===A||X===null))),b&&(b.textContent=P.get(W)||"Belum dipilih"),h&&(h.textContent=w&&A?`${w} - ${A}`:"Belum dipilih"),f&&(f.textContent=C.get(U)||"Belum dipilih"),j&&(j.textContent=z(te)),k&&(k.textContent=X!==null?J(X):"Belum tersedia"),y&&(y.textContent=Z>0?J(Z):"Tidak ada"),B&&(B.textContent=Q!==null?J(Q):"Belum tersedia"),K()}[n,a,o,r].forEach(w=>{w?.addEventListener("change",R)}),i?.addEventListener("input",R),O.forEach(w=>{w.addEventListener("change",R)}),e.querySelector("form")?.addEventListener("reset",()=>{window.requestAnimationFrame(R)}),R()}function Hi(){const e=document.querySelector("[data-regular-booking-seat-page]");if(!e)return;const t=Number(e.dataset.requiredSeatCount||0),n=Array.from(e.querySelectorAll("[data-seat-card]")),a=Array.from(e.querySelectorAll("[data-seat-input]")),o=e.querySelector("[data-seat-summary-count]"),r=e.querySelector("[data-seat-summary-list]"),s=e.querySelector("[data-seat-summary-remaining]"),i=e.querySelector("[data-seat-submit]"),u=e.querySelector("[data-seat-feedback]"),d=e.querySelector("[data-seat-feedback-title]"),l=e.querySelector("[data-seat-feedback-text]");function g(){return a.filter(h=>h.checked).map(h=>h.value)}function I(h){return h.length>0?h.join(", "):"Belum dipilih"}function O(h,f,j){!u||!d||!l||(u.dataset.state=h,d.textContent=f,l.textContent=j)}function b(){const h=g(),f=h.length,j=t>0&&f>=t;if(n.forEach(k=>{const y=k.querySelector("[data-seat-input]");if(!y)return;const B=y.disabled&&!y.checked&&k.classList.contains("is-occupied"),P=y.checked,C=B||j&&!P;B||(y.disabled=C),k.classList.toggle("is-selected",P),k.classList.toggle("is-disabled",!B&&C)}),o&&(o.textContent=`${f} dari ${t}`),r&&(r.textContent=I(h)),s&&(s.textContent=String(Math.max(t-f,0))),i&&(i.disabled=f!==t),f===0){O("idle","Pilih kursi sesuai jumlah penumpang","Jumlah kursi yang dipilih harus sama dengan jumlah penumpang pada booking draft.");return}if(f<t){O("idle","Pemilihan kursi belum lengkap",`Masih perlu memilih ${t-f} kursi lagi sebelum dapat melanjutkan.`);return}if(t===6){O("ready","Semua kursi sudah terisi","Jumlah penumpang 6 orang sudah terpenuhi dan kursi tambahan 2B ikut terpakai.");return}O("ready","Kursi sudah sesuai","Jumlah kursi yang dipilih sudah sesuai dengan jumlah penumpang dan siap disimpan.")}a.forEach(h=>{h.addEventListener("change",()=>{b()})}),b()}let Fe=null,Bt=!1,pa="",Fi=3e3,ga=0;const It=[],L=e=>document.getElementById(e);async function no(e){const t=e.trim();if(!t)return;const n=Date.now();if(!(t===pa&&n-ga<Fi)){pa=t,ga=n,Le("Memproses scan…");try{const a=await E("/scan-qr",{method:"POST",body:{qr_token:t}});Vi(a),Ji(a),a.already_scanned?v(a.message,"Tiket Sudah Pernah Di-Scan"):a.is_newly_eligible?F(a.message,"🎉 Eligible Diskon!"):F(a.message,"Scan Berhasil")}catch(a){Gi(a.message||"Scan gagal"),v(a.message||"Scan gagal","Scan Gagal")}finally{Le(Bt?"Kamera aktif — arahkan ke QR code.":"")}}}function Vi(e){L("qrscan-result-idle").hidden=!0,L("qrscan-result-card").hidden=!1;const t=e.booking||{},n=e.passenger||{},a=e.loyalty_count,o=e.loyalty_target,r=e.discount_eligible,s=Math.min(Math.round(a/o*100),100),i=e.already_scanned?"warn":e.success?"success":"error";L("qrscan-result-header").className="qrscan-result-header qrscan-result-header--"+i,L("qrscan-result-icon").innerHTML=e.already_scanned?Xi():e.success?Wi():oo(),L("qrscan-result-title").textContent=t.booking_code||"-",L("qrscan-result-subtitle").textContent=e.message,L("qr-res-name").textContent=n.name||t.nama_pemesanan||"-",L("qr-res-code").textContent=t.booking_code||"-",L("qr-res-route").textContent=t.route_label||"-",L("qr-res-datetime").textContent=(t.trip_date||"-")+" "+(t.trip_time||""),L("qr-res-seats").textContent=n.seat_no||t.selected_seats||"-",L("qr-res-pax").textContent=(t.passenger_count||0)+" Orang",L("qr-res-loyalty-label").textContent=a+" / "+o,L("qr-res-loyalty-fill").style.width=s+"%",L("qr-res-loyalty-fill").className="qrscan-loyalty-fill"+(r?" qrscan-loyalty-fill--done":""),L("qr-res-loyalty-note").textContent=r?"✅ Eligible diskon "+(e.discount_percentage||50)+"%":"Perlu "+Math.max(o-a,0)+" perjalanan lagi untuk diskon."}function Gi(e){L("qrscan-result-idle").hidden=!0,L("qrscan-result-card").hidden=!1,L("qrscan-result-header").className="qrscan-result-header qrscan-result-header--error",L("qrscan-result-icon").innerHTML=oo(),L("qrscan-result-title").textContent="Scan Gagal",L("qrscan-result-subtitle").textContent=e,["qr-res-name","qr-res-code","qr-res-route","qr-res-datetime","qr-res-seats","qr-res-pax"].forEach(t=>{L(t).textContent="-"}),L("qr-res-loyalty-label").textContent="– / –",L("qr-res-loyalty-fill").style.width="0%",L("qr-res-loyalty-note").textContent=""}function Ji(e){const t=e.booking,n=new Date().toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit",second:"2-digit"}),a=e.passenger||{};It.unshift({booking:t,passenger:a,time:n,success:e.success,already_scanned:e.already_scanned,message:e.message}),ao()}function ao(){const e=L("qrscan-history-list");if(It.length===0){e.innerHTML='<p class="qrscan-history-empty">Belum ada scan dalam sesi ini.</p>';return}e.innerHTML=It.map(t=>{const n=t.already_scanned?"warn":t.success?"ok":"err",a=t.passenger&&t.passenger.name?t.passenger.name+(t.passenger.seat_no?" ("+t.passenger.seat_no+")":""):t.booking.nama_pemesanan||"-";return`
        <div class="qrscan-history-item qrscan-history-item--${n}">
            <div class="qrscan-history-dot"></div>
            <div class="qrscan-history-body">
                <strong>${c(t.booking.booking_code||"-")}</strong>
                <span>${c(a)}</span>
            </div>
            <span class="qrscan-history-time">${t.time}</span>
        </div>`}).join("")}function Ki(){if(!window.Html5Qrcode){v("Library scanner tidak tersedia. Coba muat ulang halaman.","Error");return}L("qrscan-placeholder").hidden=!0,L("qrscan-frame").hidden=!1,L("qrscan-btn-start").hidden=!0,L("qrscan-btn-stop").hidden=!1,Bt=!0,Le("Menginisialisasi kamera…"),Fe=new window.Html5Qrcode("qrscan-reader"),Fe.start({facingMode:"environment"},{fps:10,qrbox:{width:240,height:240}},e=>{let t=e.trim();try{const n=JSON.parse(e);n&&(n.qr_token||n.passenger_qr_token)&&(t=n.qr_token||n.passenger_qr_token)}catch{}no(t)},()=>{}).then(()=>{Le("Kamera aktif — arahkan ke QR code.")}).catch(e=>{Bt=!1,L("qrscan-placeholder").hidden=!1,L("qrscan-frame").hidden=!0,L("qrscan-btn-start").hidden=!1,L("qrscan-btn-stop").hidden=!0,Le("Gagal mengakses kamera. Pastikan izin kamera sudah diberikan."),v(String(e),"Kamera Error")})}function zi(){Fe&&Fe.stop().catch(()=>{}).finally(()=>{Fe=null}),Bt=!1,L("qrscan-placeholder").hidden=!1,L("qrscan-frame").hidden=!0,L("qrscan-btn-start").hidden=!1,L("qrscan-btn-stop").hidden=!0,Le("Kamera dihentikan.")}function Le(e){L("qrscan-status-text").textContent=e}function Wi(){return`<svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
        <path d="M8 12l3 3 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`}function oo(){return`<svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
        <path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`}function Xi(){return`<svg viewBox="0 0 24 24" fill="none">
        <path d="M12 9v4M12 17h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    </svg>`}function Zi(){L("qrscan-btn-start").addEventListener("click",Ki),L("qrscan-btn-stop").addEventListener("click",zi),L("qrscan-clear-history").addEventListener("click",()=>{It.length=0,ao()}),L("qrscan-manual-form").addEventListener("submit",e=>{e.preventDefault();const t=L("qrscan-manual-input").value.trim();t&&(no(t),L("qrscan-manual-input").value="")})}const M={data:[],loading:!0,totalCount:0,page:1,search:"",chartLimit:10,editItem:null,deleteItem:null,isSubmitting:!1};let ot=null;const he=15,Qi=()=>`<svg viewBox="0 0 24 24" fill="none">
    <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
</svg>`,Yi=()=>`<svg viewBox="0 0 24 24" fill="none">
    <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
</svg>`;function ed(){const e=document.getElementById("plkt-table-body");e&&(e.innerHTML=`
        <tr><td colspan="10" class="plkt-table-state">
            <div class="plkt-loading-inline">
                <span class="plkt-loading-inline-spinner" aria-hidden="true"></span>
                <span>Memuat data...</span>
            </div>
        </td></tr>`)}function td(){const e=document.getElementById("plkt-table-body");e&&(e.innerHTML='<tr><td colspan="10" class="plkt-table-state plkt-empty-copy">Belum ada data penumpang.</td></tr>')}function fa(){const e=document.getElementById("plkt-table-body");if(e){if(M.loading){ed();return}if(M.data.length===0){td();return}e.innerHTML=M.data.map((t,n)=>`
        <tr class="plkt-row">
            <td class="plkt-index-cell">${(M.page-1)*he+n+1}</td>
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
                        ${Qi()}
                    </button>
                    <button class="plkt-icon-button plkt-icon-button-danger" type="button"
                        data-plkt-delete="${t.id}"
                        data-plkt-name="${c(t.passenger_name||"")}"
                        aria-label="Hapus penumpang ${c(t.passenger_name||"")}">
                        ${Yi()}
                    </button>
                </div>
            </td>
        </tr>`).join("")}}function ba(){const e=document.getElementById("plkt-pagination-shell"),t=document.getElementById("plkt-pagination-info"),n=document.getElementById("plkt-pagination-page"),a=document.getElementById("plkt-prev-page-btn"),o=document.getElementById("plkt-next-page-btn"),r=Math.max(1,Math.ceil(M.totalCount/he));e&&(e.hidden=r<=1),t&&(t.textContent=ve(M.page,he,M.totalCount,M.data.length)),n&&(n.textContent=`${M.page} / ${r}`),a&&(a.disabled=M.page===1),o&&(o.disabled=M.page>=r)}async function Ce(){M.loading=!0,fa(),ba();try{const[e,t]=await Promise.all([E(`/passengers-lkt?page=${M.page}&limit=${he}${M.search?`&search=${encodeURIComponent(M.search)}`:""}`),E(`/passengers-lkt/count${M.search?`?search=${encodeURIComponent(M.search)}`:""}`)]);M.data=Array.isArray(e)?e:[],M.totalCount=Number(t?.count||0)}catch(e){v(e.message||"Gagal memuat data","Error"),M.data=[],M.totalCount=0}finally{M.loading=!1,fa(),ba()}}function Qt(e){const t=document.getElementById("plkt-edit-submit-btn");M.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":"Simpan")}async function nd(e){try{const t=await E(`/passengers-lkt/${e}`);M.editItem=t;const n=document.getElementById("plkt-edit-name"),a=document.getElementById("plkt-edit-phone"),o=document.getElementById("plkt-edit-id");o&&(o.value=t.id),n&&(n.value=t.name||""),a&&(a.value=t.phone||""),Qt(!1),H("plkt-edit-modal")}catch{v("Gagal memuat data penumpang")}}function ad(e,t){M.deleteItem={id:e,name:t};const n=document.getElementById("plkt-delete-copy");n&&(n.innerHTML=`Apakah Anda yakin ingin menghapus penumpang <strong>${c(t)}</strong>? Tindakan ini tidak dapat dibatalkan.`),H("plkt-delete-modal")}async function rt(){const e=document.getElementById("plkt-loyalty-chart"),t=document.getElementById("plkt-chart-empty");if(e)try{const n=await E(`/passengers-lkt/loyalty-chart?limit=${M.chartLimit}`);if(!Array.isArray(n)||n.length===0){e.hidden=!0,t&&(t.hidden=!1);return}e.hidden=!1,t&&(t.hidden=!0);const a=n.map(i=>i.passenger_name+(i.phone&&i.phone!=="-"?` (${i.phone})`:"")),o=n.map(i=>i.booking_count),r=Math.max(...o,1),s=o.map(i=>{const u=i/r;return`rgba(${Math.round(26+u*30)}, ${Math.round(35+u*80)}, ${Math.round(126+u*50)}, 0.85)`});ot&&(ot.destroy(),ot=null),ot=new window.Chart(e,{type:"bar",data:{labels:a,datasets:[{label:"Jumlah Pemesanan",data:o,backgroundColor:s,borderRadius:6,borderSkipped:!1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{title:i=>i[0].label,label:i=>` ${i.raw} kali pemesanan`}}},scales:{x:{ticks:{maxRotation:35,font:{size:11},color:"#374151"},grid:{display:!1}},y:{beginAtZero:!0,ticks:{stepSize:1,color:"#374151",font:{size:11}},grid:{color:"rgba(0,0,0,0.06)"}}}}})}catch{t&&(t.hidden=!1)}}function od(){if(M.data.length===0){v("Tidak ada data untuk diekspor.");return}const e=["No","Nama Penumpang","No HP","Dari","Tujuan","Tanggal Berangkat","Jam","Tarif","Kali Memesan"],t=M.data.map((s,i)=>[(M.page-1)*he+i+1,s.passenger_name||"-",s.phone||"-",s.from_city||"-",s.to_city||"-",s.trip_date||"-",s.trip_time||"-",s.tarif||"-",s.booking_count]),n=[e,...t].map(s=>s.map(i=>`"${String(i).replace(/"/g,'""')}"`).join(",")).join(`
`),a=new Blob(["\uFEFF"+n],{type:"text/csv;charset=utf-8;"}),o=URL.createObjectURL(a),r=document.createElement("a");r.href=o,r.download="data-penumpang-jet.csv",r.click(),URL.revokeObjectURL(o)}function rd(){const e=document.getElementById("plkt-search-input"),t=document.getElementById("plkt-prev-page-btn"),n=document.getElementById("plkt-next-page-btn"),a=document.getElementById("plkt-export-btn"),o=document.getElementById("plkt-chart-limit"),r=document.getElementById("plkt-table-body"),s=document.getElementById("plkt-edit-form"),i=document.getElementById("plkt-delete-confirm-btn");e?.addEventListener("input",ye(async u=>{M.search=u.target.value.trim(),M.page=1,await Ce().catch(()=>v("Gagal memuat data"))},400)),t?.addEventListener("click",async()=>{M.page<=1||(M.page-=1,await Ce().catch(()=>v("Gagal memuat data")))}),n?.addEventListener("click",async()=>{const u=Math.max(1,Math.ceil(M.totalCount/he));M.page>=u||(M.page+=1,await Ce().catch(()=>v("Gagal memuat data")))}),a?.addEventListener("click",od),o?.addEventListener("change",async u=>{M.chartLimit=parseInt(u.target.value,10)||10,await rt().catch(()=>{})}),r?.addEventListener("click",async u=>{const d=u.target.closest("[data-plkt-edit]"),l=u.target.closest("[data-plkt-delete]");d&&await nd(d.dataset.plktEdit),l&&ad(l.dataset.plktDelete,l.dataset.plktName)}),s?.addEventListener("submit",async u=>{u.preventDefault();const d=document.getElementById("plkt-edit-id")?.value,l=document.getElementById("plkt-edit-name")?.value.trim(),g=document.getElementById("plkt-edit-phone")?.value.trim();if(!l){v("Nama penumpang tidak boleh kosong");return}Qt(!0);try{await E(`/passengers-lkt/${d}`,{method:"PUT",body:{name:l,phone:g}}),F("Data penumpang berhasil diperbarui"),ee("plkt-edit-modal"),await Promise.all([Ce(),rt()])}catch(I){v(I.message||"Gagal menyimpan data")}finally{Qt(!1)}}),i?.addEventListener("click",async()=>{if(M.deleteItem)try{await E(`/passengers-lkt/${M.deleteItem.id}`,{method:"DELETE"}),F("Data penumpang berhasil dihapus"),ee("plkt-delete-modal"),M.deleteItem=null,(M.page-1)*he>=M.totalCount-1&&M.page>1&&(M.page-=1),await Promise.all([Ce(),rt()])}catch(u){v(u.message||"Gagal menghapus data")}}),Ce().catch(()=>v("Gagal memuat data")),rt().catch(()=>{})}const G={data:[],loading:!0,totalCount:0,page:1,search:"",detailItem:null,isLoadingDetail:!1},ze=20,sd=()=>`<svg viewBox="0 0 24 24" fill="none">
    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/>
</svg>`;function ro(e){const t={high:["badge-emerald","Tinggi"],medium:["badge-blue","Sedang"],low:["badge-yellow","Rendah"]},[n,a]=t[e]??["badge-gray",e??"-"];return`<span class="stock-value-badge ${n}">${c(a)}</span>`}function so(e){const t={active:["stock-value-badge-emerald","Aktif"],merged:["stock-value-badge-blue","Digabung"],inactive:["stock-value-badge-red","Nonaktif"]},[n,a]=t[e]??["stock-value-badge-blue",e??"-"];return`<span class="stock-value-badge ${n}">${c(a)}</span>`}function io(e){return e?'<span class="stock-value-badge stock-value-badge-emerald">✓ Eligible</span>':'<span class="stock-value-badge stock-value-badge-blue">—</span>'}function id(){const e=document.getElementById("cust-table-body");e&&(e.innerHTML=`
        <tr><td colspan="8" class="plkt-table-state">
            <div class="plkt-loading-inline">
                <span class="plkt-loading-inline-spinner" aria-hidden="true"></span>
                <span>Memuat data...</span>
            </div>
        </td></tr>`)}function dd(){const e=document.getElementById("cust-table-body");e&&(e.innerHTML='<tr><td colspan="8" class="plkt-table-state plkt-empty-copy">Belum ada data pelanggan.</td></tr>')}function ka(){const e=document.getElementById("cust-table-body");if(e){if(G.loading){id();return}if(G.data.length===0){dd();return}e.innerHTML=G.data.map((t,n)=>`
        <tr class="plkt-row">
            <td class="plkt-index-cell">${(G.page-1)*ze+n+1}</td>
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
                        <span class="plkt-user-seat">${ro(t.identity_confidence)}</span>
                    </div>
                </div>
            </td>
            <td class="plkt-phone-cell">${c(t.phone_normalized||t.phone_original||"-")}</td>
            <td class="text-center">
                <strong>${t.total_trip_count??0}</strong>
                <span style="color:var(--color-text-muted);font-size:.75rem"> / 5</span>
            </td>
            <td class="text-center">${io(t.discount_eligible)}</td>
            <td class="text-center">${so(t.status)}</td>
            <td class="text-center">
                <button class="plkt-icon-button" type="button"
                    data-cust-detail="${t.id}"
                    aria-label="Detail pelanggan ${c(t.display_name||"")}">
                    ${sd()}
                </button>
            </td>
        </tr>`).join("")}}function ld(){const e=document.getElementById("cust-pagination-shell"),t=document.getElementById("cust-pagination-info"),n=document.getElementById("cust-pagination-page"),a=document.getElementById("cust-prev-page-btn"),o=document.getElementById("cust-next-page-btn"),r=Math.max(1,Math.ceil(G.totalCount/ze));e&&(e.hidden=!1),t&&(t.textContent=ve(G.page,ze,G.totalCount,G.data.length)),n&&(n.textContent=`${G.page} / ${r}`),a&&(a.disabled=G.page===1),o&&(o.disabled=G.page>=r)}async function cd(){try{const[e,t,n]=await Promise.all([E("/customers?limit=1"),E("/customers?limit=1&discount_eligible=1"),E("/customers?limit=1&has_phone=1")]),a=document.getElementById("cust-stat-total"),o=document.getElementById("cust-stat-eligible"),r=document.getElementById("cust-stat-with-phone");a&&(a.textContent=(e?.total??0).toLocaleString("id-ID")),o&&(o.textContent=(t?.total??0).toLocaleString("id-ID")),r&&(r.textContent=(n?.total??0).toLocaleString("id-ID"))}catch{}}async function st(){G.loading=!0,ka();try{const e=new URLSearchParams({page:G.page,limit:ze});G.search&&e.set("search",G.search);const t=await E(`/customers?${e.toString()}`);G.data=Array.isArray(t?.data)?t.data:[],G.totalCount=Number(t?.total??0)}catch(e){v(e.message||"Gagal memuat data pelanggan","Error"),G.data=[],G.totalCount=0}finally{G.loading=!1,ka(),ld()}}async function ud(e){const t=document.getElementById("cust-detail-name"),n=document.getElementById("cust-detail-code"),a=document.getElementById("cust-detail-body");t&&(t.textContent="Detail Pelanggan"),n&&(n.textContent=""),a&&(a.innerHTML=`
        <div class="plkt-loading-inline">
            <span class="plkt-loading-inline-spinner" aria-hidden="true"></span>
            <span>Memuat detail...</span>
        </div>`),H("cust-detail-modal");try{const o=await E(`/customers/${e}`);t&&(t.textContent=o.display_name||"-"),n&&(n.textContent=o.customer_code||"");const r=o.recent_bookings?.length?o.recent_bookings.map(s=>`
                <tr>
                    <td>${c(s.booking_code||"-")}</td>
                    <td>${c(s.trip_date||"-")}</td>
                    <td>${c(s.from_city||"-")} → ${c(s.to_city||"-")}</td>
                    <td>${c(s.booking_status||"-")}</td>
                </tr>`).join(""):'<tr><td colspan="4" class="plkt-table-state plkt-empty-copy">Belum ada riwayat perjalanan.</td></tr>';a&&(a.innerHTML=`
            <dl class="cust-detail-dl">
                <dt>Nama</dt>
                <dd>${c(o.display_name||"-")}</dd>
                <dt>Nomor HP</dt>
                <dd>${c(o.phone_normalized||o.phone_original||"-")}</dd>
                <dt>Email</dt>
                <dd>${c(o.email||"-")}</dd>
                <dt>Status</dt>
                <dd>${so(o.status)}</dd>
                <dt>Kepercayaan Data</dt>
                <dd>${ro(o.identity_confidence)}</dd>
                <dt>Total Perjalanan</dt>
                <dd><strong>${o.total_trip_count??0}</strong> / 5</dd>
                <dt>Eligible Diskon</dt>
                <dd>${io(o.discount_eligible)}</dd>
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
            </div>`)}catch(o){a&&(a.innerHTML=`<p class="plkt-empty-copy">Gagal memuat detail: ${c(o.message||"Terjadi kesalahan")}</p>`)}}async function md(){try{const t=(await E("/customers/duplicates?limit=5"))?.total??0;t===0?F("Tidak ada duplikasi pelanggan terdeteksi.","Tidak Ada Duplikasi"):v(`Terdeteksi ${t} pasang pelanggan berpotensi duplikat. Gunakan API untuk merge.`,`${t} Duplikasi Ditemukan`)}catch(e){v(e.message||"Gagal memeriksa duplikasi","Error")}}function pd(){const e=document.getElementById("cust-search-input"),t=document.getElementById("cust-prev-page-btn"),n=document.getElementById("cust-next-page-btn"),a=document.getElementById("cust-table-body"),o=document.getElementById("cust-duplicates-btn");e?.addEventListener("input",ye(async r=>{G.search=r.target.value.trim(),G.page=1,await st().catch(()=>v("Gagal memuat data"))},400)),t?.addEventListener("click",async()=>{G.page<=1||(G.page-=1,await st().catch(()=>v("Gagal memuat data")))}),n?.addEventListener("click",async()=>{const r=Math.max(1,Math.ceil(G.totalCount/ze));G.page>=r||(G.page+=1,await st().catch(()=>v("Gagal memuat data")))}),o?.addEventListener("click",md),a?.addEventListener("click",async r=>{const s=r.target.closest("[data-cust-detail]");s&&await ud(s.dataset.custDetail)}),st().catch(()=>v("Gagal memuat data")),cd().catch(()=>{})}function gd(e){return!e||e<=0?"":"Rp "+Math.floor(e).toLocaleString("id-ID")}function fd(){const e=document.querySelector("[data-fare-input]"),t=document.querySelector("[data-additional-fare-input]"),n=document.querySelector("[data-estimated-total-input]");function a(){const o=parseInt(e?.value||"0",10)||0,r=parseInt(t?.value||"0",10)||0,s=o+r;n&&(n.value=gd(s))}e?.addEventListener("input",a),t?.addEventListener("input",a),document.querySelectorAll('.regular-booking-radio input[type="radio"]').forEach(o=>{o.addEventListener("change",()=>{document.querySelectorAll(`.regular-booking-radio input[name="${o.name}"]`).forEach(s=>{s.closest(".regular-booking-radio")?.classList.toggle("is-selected",s.checked)})})})}function Ut(e){return"Rp "+Math.floor(e).toLocaleString("id-ID")}function Ue(e){const t=document.getElementById(e);t&&(t.showModal?.()||t.setAttribute("open",""))}function bd(e){const t=document.getElementById(e);t&&(t.close?.()||t.removeAttribute("open"))}function kd(e){const t=e.closest("tr[data-row]");if(!t)return null;try{return JSON.parse(t.dataset.row)}catch{return null}}function hd(e){const t=document.getElementById("show-detail-grid");if(!t)return;const n={transfer:"Transfer Bank",qris:"QRIS",cash:"Tunai","":"—"};t.innerHTML=`
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
            <span class="ddrop-detail-value" style="color:#047857;font-size:1.05rem">${Ut(e.price_per_seat)}</span>
        </div>
        <div class="ddrop-detail-item">
            <span class="ddrop-detail-label">Tambahan Ongkos</span>
            <span class="ddrop-detail-value">${e.additional_fare>0?Ut(e.additional_fare):"—"}</span>
        </div>
        <div class="ddrop-detail-item col-span-2">
            <span class="ddrop-detail-label">Total Tarif</span>
            <span class="ddrop-detail-value" style="color:#047857;font-weight:700;font-size:1.05rem">${Ut(e.total_amount)}</span>
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
    `}function yd(e){const t=document.getElementById("form-edit");if(!t)return;const n=window.__DROPPING_DATA_UPDATE_BASE__||"/dashboard/dropping-data";t.action=`${n}/${e.id}`;const a=(o,r)=>{const s=t.querySelector(`[name="${o}"]`);s&&(s.value=r??"")};a("passenger_name",e.passenger_name),a("passenger_phone",e.passenger_phone),a("from_city",e.from_city),a("to_city",e.to_city),a("pickup_location",e.pickup_location),a("dropoff_location",e.dropoff_location),a("price_per_seat",e.price_per_seat),a("additional_fare",e.additional_fare),a("trip_date",e.trip_date),a("trip_time",e.trip_time),a("notes",e.notes),a("payment_method",e.payment_method),a("payment_status",e.payment_status),a("driver_id",e.driver_id),a("mobil_id",e.mobil_id)}function vd(e){const t=document.getElementById("form-delete"),n=document.getElementById("delete-booking-code");if(!t||!n)return;const a=window.__DROPPING_DATA_UPDATE_BASE__||"/dashboard/dropping-data";t.action=`${a}/${e.id}`,n.textContent=e.booking_code}function Ed(){window.__DROPPING_DATA_UPDATE_BASE__="/dashboard/dropping-data",document.getElementById("btn-open-create")?.addEventListener("click",()=>{Ue("modal-create")}),document.getElementById("btn-open-create-empty")?.addEventListener("click",()=>{Ue("modal-create")}),document.addEventListener("click",e=>{const t=e.target.closest("[data-action]");if(!t)return;const n=t.dataset.action,a=kd(t);a&&(n==="show"?(hd(a),Ue("modal-show")):n==="edit"?(yd(a),Ue("modal-edit")):n==="delete"&&(vd(a),Ue("modal-delete")))}),document.querySelectorAll("[data-close-modal]").forEach(e=>{e.addEventListener("click",()=>bd(e.dataset.closeModal))}),document.querySelectorAll(".ddrop-modal").forEach(e=>{e.addEventListener("click",t=>{t.target===e&&(e.close?.()||e.removeAttribute("open"))})})}const wd={ROHUL_TO_PKB:"ROHUL → PKB",PKB_TO_ROHUL:"PKB → ROHUL"},Bd=500,Id=2e3,be={targetDate:null,trips:[],statistics:[]};let Ht=null;const Te=new Map;function _d(){const e=document.getElementById("trip-planning-initial-state");if(!e)return{target_date:null,trips:[],statistics:[]};try{return JSON.parse(e.textContent||"{}")}catch{return{target_date:null,trips:[],statistics:[]}}}function $d(e){const t=e.status,n=e.keluar_trip_substatus,a=e.id,o=[];return t==="scheduled"&&e.trip_time&&o.push(`<button type="button" class="trip-planning-action-btn trip-planning-action-btn--success" data-action="berangkat" data-trip-id="${a}" data-testid="btn-berangkat-${a}">Berangkat</button>`),t==="scheduled"&&o.push(`<button type="button" class="trip-planning-action-btn trip-planning-action-btn--danger" data-action="tidak-berangkat" data-trip-id="${a}" data-testid="btn-tidak-berangkat-${a}">Tidak Berangkat</button>`),t==="keluar_trip"&&n==="out"&&(o.push(`<button type="button" class="trip-planning-action-btn trip-planning-action-btn--neutral" data-action="waiting-list" data-trip-id="${a}" data-testid="btn-waiting-list-${a}">Waiting List</button>`),o.push(`<button type="button" class="trip-planning-action-btn trip-planning-action-btn--neutral" data-action="tidak-keluar-trip" data-trip-id="${a}" data-testid="btn-tidak-keluar-trip-${a}">Tidak Keluar Trip</button>`)),t==="keluar_trip"&&n==="waiting_list"&&o.push(`<button type="button" class="trip-planning-action-btn trip-planning-action-btn--success" data-action="returning" data-trip-id="${a}" data-testid="btn-returning-${a}">Returning</button>`),o.join("")}function Sd(e){const t=wd[e.direction]||e.direction||"",n=String(e.direction||"").toLowerCase().replace(/_/g,"-"),a=c(e.mobil?.code??e.mobil?.kode_mobil??"-"),o=c(e.driver?.name??e.driver?.nama??"-"),r=e.trip_time?c(e.trip_time):"(waiting)",s=e.status||"",i=e.keluar_trip_substatus,u=i?`${s} · ${i}`:s;return`
        <td>${a}</td>
        <td>${o}</td>
        <td>
            <span class="trip-planning-direction-badge trip-planning-direction-badge--${c(n)}">
                ${c(t)}
            </span>
        </td>
        <td>${r}</td>
        <td>${Number(e.sequence)||0}</td>
        <td>
            <span class="trip-planning-status-badge trip-planning-status-badge--${c(s)}">
                ${c(u)}
            </span>
        </td>
        <td class="trip-planning-actions-cell">
            <div class="trip-planning-action-group" data-trip-actions>
                ${$d(e)}
            </div>
        </td>
    `}function Cd(e){const t=document.querySelector(`tr[data-trip-id="${e.id}"]`);if(!t)return;t.innerHTML=Sd(e);const n=Te.get(String(e.id));n&&(clearTimeout(n),Te.delete(String(e.id)));const a=be.trips.findIndex(o=>String(o.id)===String(e.id));a!==-1&&(be.trips[a]=e)}function xd(e){const t=document.querySelector('[data-testid="trip-planning-stats-grid"]');if(t){if(!Array.isArray(e)||e.length===0){t.innerHTML='<div class="dashboard-empty-state dashboard-empty-state--block">Belum ada mobil aktif di sistem Trip Planning</div>';return}t.innerHTML=e.map(n=>{const a=Number(n.pp_count||0).toFixed(1).replace(".",","),o=n.home_pool?`<span class="trip-planning-pool-tag">${c(n.home_pool)}</span>`:"",r=n.status_breakdown||{},s=Object.entries(r),i=s.length===0?'<span class="trip-planning-status-breakdown-empty">Belum ada trip</span>':s.map(([u,d])=>`<span class="trip-planning-status-badge trip-planning-status-badge--${c(u)}">${c(u)}: ${Number(d)||0}</span>`).join(" ");return`
            <article class="dashboard-stat-card dashboard-stat-card--emerald" data-testid="mobil-stat-${c(n.mobil_code)}">
                <span class="dashboard-stat-orb dashboard-stat-orb--emerald" aria-hidden="true"></span>
                <div class="dashboard-stat-card-body">
                    <div class="dashboard-stat-copy">
                        <p class="dashboard-stat-label">${c(n.mobil_code)} ${o}</p>
                        <p class="dashboard-stat-value" data-mobil-pp="${c(n.mobil_id)}">${a} PP</p>
                        <div class="trip-planning-status-breakdown">${i}</div>
                    </div>
                </div>
            </article>
        `}).join("")}}function Td(e){const t=e?.statistics;return t?Array.isArray(t)?t:Array.isArray(t.per_mobil)?t.per_mobil.map(n=>({mobil_id:n.mobil_id,mobil_code:n.mobil_code??n.kode_mobil??"",home_pool:n.home_pool??null,pp_count:n.pp_count??0,status_breakdown:n.status_breakdown??{}})):[]:[]}function Ld(){Ht&&clearTimeout(Ht),Ht=setTimeout(async()=>{const e=be.targetDate;if(e)try{const t=await E(`/trip-planning/dashboard?date=${encodeURIComponent(e)}`),n=Td(t);be.statistics=n,xd(n)}catch(t){window.console&&console.warn("[trip-planning] Stats refetch failed:",t.message)}},Bd)}function Ad(e){const t=e?.data||{};return t.error_code==="TRIP_VERSION_CONFLICT"?"Trip baru saja diubah oleh admin lain. Silakan refresh halaman.":t.error_code==="TRIP_INVALID_TRANSITION"?t.message||"Transisi trip tidak valid":t.error_code==="TRIP_SLOT_CONFLICT"?t.message||"Konflik slot trip":e?.message||"Aksi gagal"}async function lo(e,t,n){se(n,!0);try{const a=await E(`/trip-planning/trips/${encodeURIComponent(e)}/${t}`,{method:"PATCH"});a?.trip?(Cd(a.trip),F(a.message||"Aksi berhasil"),Ld()):se(n,!1)}catch(a){v(Ad(a)),se(n,!1)}}function Md(e,t){const n=String(e),a=Te.get(n);if(a){clearTimeout(a),Te.delete(n),t.classList.remove("trip-planning-action-btn--confirming"),delete t.dataset.defaultText,t.textContent="Tidak Berangkat",lo(e,"tidak-berangkat",t);return}t.textContent="Klik lagi (2s)",t.classList.add("trip-planning-action-btn--confirming");const o=setTimeout(()=>{t.textContent="Tidak Berangkat",t.classList.remove("trip-planning-action-btn--confirming"),Te.delete(n)},Id);Te.set(n,o)}function Rd(e){const t=e.target.closest("[data-action]");if(!t||t.disabled)return;const n=t.dataset.tripId,a=t.dataset.action;!n||!a||(a==="tidak-berangkat"?Md(n,t):lo(n,a,t))}async function Pd(){if(!document.querySelector("[data-trip-planning-page]"))return;const t=_d();be.targetDate=t.target_date,be.trips=Array.isArray(t.trips)?t.trips:[],be.statistics=Array.isArray(t.statistics)?t.statistics:[];const n=document.querySelector("[data-trip-planning-content]");n&&n.addEventListener("click",Rd)}const Dd={"admin-users/index":ci,"auth/login":as,"bookings/index":qi,"dashboard/index":fs,"drivers/index":_s,"mobil/index":Ds,"keberangkatan/index":Fs,"regular-bookings/index":Ui,"regular-bookings/seats":Hi,"stock/index":Ws,"qr-scan/index":Zi,"passengers-lkt/index":rd,"customers/index":pd,"dropping-bookings/index":fd,"dropping-data/index":Ed,"trip-planning/dashboard":Pd};document.addEventListener("DOMContentLoaded",async()=>{Yr(),ns(),mt(Va());const e=Kr();e&&(e.type==="success"?F(e.message,e.title):e.type==="info"?es(e.message,e.title):v(e.message,e.title));try{const{user:t}=await Qr();t&&mt(t);const n=document.body.dataset.pageScript,a=Dd[n];typeof a=="function"&&await a({user:t})}catch(t){console.error(t),v(t.message||"Terjadi kesalahan saat memuat halaman")}});
