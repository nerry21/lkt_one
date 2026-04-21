function fa(e,t){return function(){return e.apply(t,arguments)}}const{toString:ro}=Object.prototype,{getPrototypeOf:Xt}=Object,{iterator:Bt,toStringTag:ba}=Symbol,It=(e=>t=>{const n=ro.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),ie=e=>(e=e.toLowerCase(),t=>It(t)===e),_t=e=>t=>typeof t===e,{isArray:Me}=Array,Le=_t("undefined");function ze(e){return e!==null&&!Le(e)&&e.constructor!==null&&!Le(e.constructor)&&ae(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const ka=ie("ArrayBuffer");function so(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&ka(e.buffer),t}const io=_t("string"),ae=_t("function"),ha=_t("number"),Ke=e=>e!==null&&typeof e=="object",lo=e=>e===!0||e===!1,rt=e=>{if(It(e)!=="object")return!1;const t=Xt(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(ba in e)&&!(Bt in e)},co=e=>{if(!Ke(e)||ze(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},uo=ie("Date"),mo=ie("File"),po=e=>!!(e&&typeof e.uri<"u"),go=e=>e&&typeof e.getParts<"u",fo=ie("Blob"),bo=ie("FileList"),ko=e=>Ke(e)&&ae(e.pipe);function ho(){return typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}}const fn=ho(),bn=typeof fn.FormData<"u"?fn.FormData:void 0,yo=e=>{let t;return e&&(bn&&e instanceof bn||ae(e.append)&&((t=It(e))==="formdata"||t==="object"&&ae(e.toString)&&e.toString()==="[object FormData]"))},vo=ie("URLSearchParams"),[Eo,wo,Bo,Io]=["ReadableStream","Request","Response","Headers"].map(ie),_o=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function We(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let a,o;if(typeof e!="object"&&(e=[e]),Me(e))for(a=0,o=e.length;a<o;a++)t.call(null,e[a],a,e);else{if(ze(e))return;const r=n?Object.getOwnPropertyNames(e):Object.keys(e),s=r.length;let i;for(a=0;a<s;a++)i=r[a],t.call(null,e[i],i,e)}}function ya(e,t){if(ze(e))return null;t=t.toLowerCase();const n=Object.keys(e);let a=n.length,o;for(;a-- >0;)if(o=n[a],t===o.toLowerCase())return o;return null}const ge=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,va=e=>!Le(e)&&e!==ge;function Nt(){const{caseless:e,skipUndefined:t}=va(this)&&this||{},n={},a=(o,r)=>{if(r==="__proto__"||r==="constructor"||r==="prototype")return;const s=e&&ya(n,r)||r;rt(n[s])&&rt(o)?n[s]=Nt(n[s],o):rt(o)?n[s]=Nt({},o):Me(o)?n[s]=o.slice():(!t||!Le(o))&&(n[s]=o)};for(let o=0,r=arguments.length;o<r;o++)arguments[o]&&We(arguments[o],a);return n}const $o=(e,t,n,{allOwnKeys:a}={})=>(We(t,(o,r)=>{n&&ae(o)?Object.defineProperty(e,r,{value:fa(o,n),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(e,r,{value:o,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:a}),e),So=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),Co=(e,t,n,a)=>{e.prototype=Object.create(t.prototype,a),Object.defineProperty(e.prototype,"constructor",{value:e,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},xo=(e,t,n,a)=>{let o,r,s;const i={};if(t=t||{},e==null)return t;do{for(o=Object.getOwnPropertyNames(e),r=o.length;r-- >0;)s=o[r],(!a||a(s,e,t))&&!i[s]&&(t[s]=e[s],i[s]=!0);e=n!==!1&&Xt(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},Lo=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const a=e.indexOf(t,n);return a!==-1&&a===n},To=e=>{if(!e)return null;if(Me(e))return e;let t=e.length;if(!ha(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},Ao=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&Xt(Uint8Array)),Mo=(e,t)=>{const a=(e&&e[Bt]).call(e);let o;for(;(o=a.next())&&!o.done;){const r=o.value;t.call(e,r[0],r[1])}},Ro=(e,t)=>{let n;const a=[];for(;(n=e.exec(t))!==null;)a.push(n);return a},Po=ie("HTMLFormElement"),Do=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,a,o){return a.toUpperCase()+o}),kn=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),Oo=ie("RegExp"),Ea=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),a={};We(n,(o,r)=>{let s;(s=t(o,r,e))!==!1&&(a[r]=s||o)}),Object.defineProperties(e,a)},jo=e=>{Ea(e,(t,n)=>{if(ae(e)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const a=e[n];if(ae(a)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},qo=(e,t)=>{const n={},a=o=>{o.forEach(r=>{n[r]=!0})};return Me(e)?a(e):a(String(e).split(t)),n},No=()=>{},Uo=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function Ho(e){return!!(e&&ae(e.append)&&e[ba]==="FormData"&&e[Bt])}const Fo=e=>{const t=new Array(10),n=(a,o)=>{if(Ke(a)){if(t.indexOf(a)>=0)return;if(ze(a))return a;if(!("toJSON"in a)){t[o]=a;const r=Me(a)?[]:{};return We(a,(s,i)=>{const c=n(s,o+1);!Le(c)&&(r[i]=c)}),t[o]=void 0,r}}return a};return n(e,0)},Go=ie("AsyncFunction"),Vo=e=>e&&(Ke(e)||ae(e))&&ae(e.then)&&ae(e.catch),wa=((e,t)=>e?setImmediate:t?((n,a)=>(ge.addEventListener("message",({source:o,data:r})=>{o===ge&&r===n&&a.length&&a.shift()()},!1),o=>{a.push(o),ge.postMessage(n,"*")}))(`axios@${Math.random()}`,[]):n=>setTimeout(n))(typeof setImmediate=="function",ae(ge.postMessage)),Jo=typeof queueMicrotask<"u"?queueMicrotask.bind(ge):typeof process<"u"&&process.nextTick||wa,zo=e=>e!=null&&ae(e[Bt]),m={isArray:Me,isArrayBuffer:ka,isBuffer:ze,isFormData:yo,isArrayBufferView:so,isString:io,isNumber:ha,isBoolean:lo,isObject:Ke,isPlainObject:rt,isEmptyObject:co,isReadableStream:Eo,isRequest:wo,isResponse:Bo,isHeaders:Io,isUndefined:Le,isDate:uo,isFile:mo,isReactNativeBlob:po,isReactNative:go,isBlob:fo,isRegExp:Oo,isFunction:ae,isStream:ko,isURLSearchParams:vo,isTypedArray:Ao,isFileList:bo,forEach:We,merge:Nt,extend:$o,trim:_o,stripBOM:So,inherits:Co,toFlatObject:xo,kindOf:It,kindOfTest:ie,endsWith:Lo,toArray:To,forEachEntry:Mo,matchAll:Ro,isHTMLForm:Po,hasOwnProperty:kn,hasOwnProp:kn,reduceDescriptors:Ea,freezeMethods:jo,toObjectSet:qo,toCamelCase:Do,noop:No,toFiniteNumber:Uo,findKey:ya,global:ge,isContextDefined:va,isSpecCompliantForm:Ho,toJSONObject:Fo,isAsyncFn:Go,isThenable:Vo,setImmediate:wa,asap:Jo,isIterable:zo};let S=class Ba extends Error{static from(t,n,a,o,r,s){const i=new Ba(t.message,n||t.code,a,o,r);return i.cause=t,i.name=t.name,t.status!=null&&i.status==null&&(i.status=t.status),s&&Object.assign(i,s),i}constructor(t,n,a,o,r){super(t),Object.defineProperty(this,"message",{value:t,enumerable:!0,writable:!0,configurable:!0}),this.name="AxiosError",this.isAxiosError=!0,n&&(this.code=n),a&&(this.config=a),o&&(this.request=o),r&&(this.response=r,this.status=r.status)}toJSON(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:m.toJSONObject(this.config),code:this.code,status:this.status}}};S.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";S.ERR_BAD_OPTION="ERR_BAD_OPTION";S.ECONNABORTED="ECONNABORTED";S.ETIMEDOUT="ETIMEDOUT";S.ERR_NETWORK="ERR_NETWORK";S.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";S.ERR_DEPRECATED="ERR_DEPRECATED";S.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";S.ERR_BAD_REQUEST="ERR_BAD_REQUEST";S.ERR_CANCELED="ERR_CANCELED";S.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";S.ERR_INVALID_URL="ERR_INVALID_URL";const Ko=null;function Ut(e){return m.isPlainObject(e)||m.isArray(e)}function Ia(e){return m.endsWith(e,"[]")?e.slice(0,-2):e}function Tt(e,t,n){return e?e.concat(t).map(function(o,r){return o=Ia(o),!n&&r?"["+o+"]":o}).join(n?".":""):t}function Wo(e){return m.isArray(e)&&!e.some(Ut)}const Xo=m.toFlatObject(m,{},null,function(t){return/^is[A-Z]/.test(t)});function $t(e,t,n){if(!m.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=m.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(h,f){return!m.isUndefined(f[h])});const a=n.metaTokens,o=n.visitor||l,r=n.dots,s=n.indexes,c=(n.Blob||typeof Blob<"u"&&Blob)&&m.isSpecCompliantForm(t);if(!m.isFunction(o))throw new TypeError("visitor must be a function");function d(b){if(b===null)return"";if(m.isDate(b))return b.toISOString();if(m.isBoolean(b))return b.toString();if(!c&&m.isBlob(b))throw new S("Blob is not supported. Use a Buffer instead.");return m.isArrayBuffer(b)||m.isTypedArray(b)?c&&typeof Blob=="function"?new Blob([b]):Buffer.from(b):b}function l(b,h,f){let j=b;if(m.isReactNative(t)&&m.isReactNativeBlob(b))return t.append(Tt(f,h,r),d(b)),!1;if(b&&!f&&typeof b=="object"){if(m.endsWith(h,"{}"))h=a?h:h.slice(0,-2),b=JSON.stringify(b);else if(m.isArray(b)&&Wo(b)||(m.isFileList(b)||m.endsWith(h,"[]"))&&(j=m.toArray(b)))return h=Ia(h),j.forEach(function(y,B){!(m.isUndefined(y)||y===null)&&t.append(s===!0?Tt([h],B,r):s===null?h:h+"[]",d(y))}),!1}return Ut(b)?!0:(t.append(Tt(f,h,r),d(b)),!1)}const g=[],I=Object.assign(Xo,{defaultVisitor:l,convertValue:d,isVisitable:Ut});function O(b,h){if(!m.isUndefined(b)){if(g.indexOf(b)!==-1)throw Error("Circular reference detected in "+h.join("."));g.push(b),m.forEach(b,function(j,k){(!(m.isUndefined(j)||j===null)&&o.call(t,j,m.isString(k)?k.trim():k,h,I))===!0&&O(j,h?h.concat(k):[k])}),g.pop()}}if(!m.isObject(e))throw new TypeError("data must be an object");return O(e),t}function hn(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(a){return t[a]})}function Zt(e,t){this._pairs=[],e&&$t(e,this,t)}const _a=Zt.prototype;_a.append=function(t,n){this._pairs.push([t,n])};_a.toString=function(t){const n=t?function(a){return t.call(this,a,hn)}:hn;return this._pairs.map(function(o){return n(o[0])+"="+n(o[1])},"").join("&")};function Zo(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function $a(e,t,n){if(!t)return e;const a=n&&n.encode||Zo,o=m.isFunction(n)?{serialize:n}:n,r=o&&o.serialize;let s;if(r?s=r(t,o):s=m.isURLSearchParams(t)?t.toString():new Zt(t,o).toString(a),s){const i=e.indexOf("#");i!==-1&&(e=e.slice(0,i)),e+=(e.indexOf("?")===-1?"?":"&")+s}return e}class yn{constructor(){this.handlers=[]}use(t,n,a){return this.handlers.push({fulfilled:t,rejected:n,synchronous:a?a.synchronous:!1,runWhen:a?a.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){m.forEach(this.handlers,function(a){a!==null&&t(a)})}}const Qt={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0},Qo=typeof URLSearchParams<"u"?URLSearchParams:Zt,Yo=typeof FormData<"u"?FormData:null,er=typeof Blob<"u"?Blob:null,tr={isBrowser:!0,classes:{URLSearchParams:Qo,FormData:Yo,Blob:er},protocols:["http","https","file","blob","url","data"]},Yt=typeof window<"u"&&typeof document<"u",Ht=typeof navigator=="object"&&navigator||void 0,nr=Yt&&(!Ht||["ReactNative","NativeScript","NS"].indexOf(Ht.product)<0),ar=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",or=Yt&&window.location.href||"http://localhost",rr=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:Yt,hasStandardBrowserEnv:nr,hasStandardBrowserWebWorkerEnv:ar,navigator:Ht,origin:or},Symbol.toStringTag,{value:"Module"})),ne={...rr,...tr};function sr(e,t){return $t(e,new ne.classes.URLSearchParams,{visitor:function(n,a,o,r){return ne.isNode&&m.isBuffer(n)?(this.append(a,n.toString("base64")),!1):r.defaultVisitor.apply(this,arguments)},...t})}function ir(e){return m.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function dr(e){const t={},n=Object.keys(e);let a;const o=n.length;let r;for(a=0;a<o;a++)r=n[a],t[r]=e[r];return t}function Sa(e){function t(n,a,o,r){let s=n[r++];if(s==="__proto__")return!0;const i=Number.isFinite(+s),c=r>=n.length;return s=!s&&m.isArray(o)?o.length:s,c?(m.hasOwnProp(o,s)?o[s]=[o[s],a]:o[s]=a,!i):((!o[s]||!m.isObject(o[s]))&&(o[s]=[]),t(n,a,o[s],r)&&m.isArray(o[s])&&(o[s]=dr(o[s])),!i)}if(m.isFormData(e)&&m.isFunction(e.entries)){const n={};return m.forEachEntry(e,(a,o)=>{t(ir(a),o,n,0)}),n}return null}function lr(e,t,n){if(m.isString(e))try{return(t||JSON.parse)(e),m.trim(e)}catch(a){if(a.name!=="SyntaxError")throw a}return(n||JSON.stringify)(e)}const Xe={transitional:Qt,adapter:["xhr","http","fetch"],transformRequest:[function(t,n){const a=n.getContentType()||"",o=a.indexOf("application/json")>-1,r=m.isObject(t);if(r&&m.isHTMLForm(t)&&(t=new FormData(t)),m.isFormData(t))return o?JSON.stringify(Sa(t)):t;if(m.isArrayBuffer(t)||m.isBuffer(t)||m.isStream(t)||m.isFile(t)||m.isBlob(t)||m.isReadableStream(t))return t;if(m.isArrayBufferView(t))return t.buffer;if(m.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let i;if(r){if(a.indexOf("application/x-www-form-urlencoded")>-1)return sr(t,this.formSerializer).toString();if((i=m.isFileList(t))||a.indexOf("multipart/form-data")>-1){const c=this.env&&this.env.FormData;return $t(i?{"files[]":t}:t,c&&new c,this.formSerializer)}}return r||o?(n.setContentType("application/json",!1),lr(t)):t}],transformResponse:[function(t){const n=this.transitional||Xe.transitional,a=n&&n.forcedJSONParsing,o=this.responseType==="json";if(m.isResponse(t)||m.isReadableStream(t))return t;if(t&&m.isString(t)&&(a&&!this.responseType||o)){const s=!(n&&n.silentJSONParsing)&&o;try{return JSON.parse(t,this.parseReviver)}catch(i){if(s)throw i.name==="SyntaxError"?S.from(i,S.ERR_BAD_RESPONSE,this,null,this.response):i}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:ne.classes.FormData,Blob:ne.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};m.forEach(["delete","get","head","post","put","patch"],e=>{Xe.headers[e]={}});const cr=m.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),ur=e=>{const t={};let n,a,o;return e&&e.split(`
`).forEach(function(s){o=s.indexOf(":"),n=s.substring(0,o).trim().toLowerCase(),a=s.substring(o+1).trim(),!(!n||t[n]&&cr[n])&&(n==="set-cookie"?t[n]?t[n].push(a):t[n]=[a]:t[n]=t[n]?t[n]+", "+a:a)}),t},vn=Symbol("internals");function De(e){return e&&String(e).trim().toLowerCase()}function st(e){return e===!1||e==null?e:m.isArray(e)?e.map(st):String(e)}function mr(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let a;for(;a=n.exec(e);)t[a[1]]=a[2];return t}const pr=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function At(e,t,n,a,o){if(m.isFunction(a))return a.call(this,t,n);if(o&&(t=n),!!m.isString(t)){if(m.isString(a))return t.indexOf(a)!==-1;if(m.isRegExp(a))return a.test(t)}}function gr(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,a)=>n.toUpperCase()+a)}function fr(e,t){const n=m.toCamelCase(" "+t);["get","set","has"].forEach(a=>{Object.defineProperty(e,a+n,{value:function(o,r,s){return this[a].call(this,t,o,r,s)},configurable:!0})})}let oe=class{constructor(t){t&&this.set(t)}set(t,n,a){const o=this;function r(i,c,d){const l=De(c);if(!l)throw new Error("header name must be a non-empty string");const g=m.findKey(o,l);(!g||o[g]===void 0||d===!0||d===void 0&&o[g]!==!1)&&(o[g||c]=st(i))}const s=(i,c)=>m.forEach(i,(d,l)=>r(d,l,c));if(m.isPlainObject(t)||t instanceof this.constructor)s(t,n);else if(m.isString(t)&&(t=t.trim())&&!pr(t))s(ur(t),n);else if(m.isObject(t)&&m.isIterable(t)){let i={},c,d;for(const l of t){if(!m.isArray(l))throw TypeError("Object iterator must return a key-value pair");i[d=l[0]]=(c=i[d])?m.isArray(c)?[...c,l[1]]:[c,l[1]]:l[1]}s(i,n)}else t!=null&&r(n,t,a);return this}get(t,n){if(t=De(t),t){const a=m.findKey(this,t);if(a){const o=this[a];if(!n)return o;if(n===!0)return mr(o);if(m.isFunction(n))return n.call(this,o,a);if(m.isRegExp(n))return n.exec(o);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=De(t),t){const a=m.findKey(this,t);return!!(a&&this[a]!==void 0&&(!n||At(this,this[a],a,n)))}return!1}delete(t,n){const a=this;let o=!1;function r(s){if(s=De(s),s){const i=m.findKey(a,s);i&&(!n||At(a,a[i],i,n))&&(delete a[i],o=!0)}}return m.isArray(t)?t.forEach(r):r(t),o}clear(t){const n=Object.keys(this);let a=n.length,o=!1;for(;a--;){const r=n[a];(!t||At(this,this[r],r,t,!0))&&(delete this[r],o=!0)}return o}normalize(t){const n=this,a={};return m.forEach(this,(o,r)=>{const s=m.findKey(a,r);if(s){n[s]=st(o),delete n[r];return}const i=t?gr(r):String(r).trim();i!==r&&delete n[r],n[i]=st(o),a[i]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return m.forEach(this,(a,o)=>{a!=null&&a!==!1&&(n[o]=t&&m.isArray(a)?a.join(", "):a)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const a=new this(t);return n.forEach(o=>a.set(o)),a}static accessor(t){const a=(this[vn]=this[vn]={accessors:{}}).accessors,o=this.prototype;function r(s){const i=De(s);a[i]||(fr(o,s),a[i]=!0)}return m.isArray(t)?t.forEach(r):r(t),this}};oe.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);m.reduceDescriptors(oe.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(a){this[n]=a}}});m.freezeMethods(oe);function Mt(e,t){const n=this||Xe,a=t||n,o=oe.from(a.headers);let r=a.data;return m.forEach(e,function(i){r=i.call(n,r,o.normalize(),t?t.status:void 0)}),o.normalize(),r}function Ca(e){return!!(e&&e.__CANCEL__)}let Ze=class extends S{constructor(t,n,a){super(t??"canceled",S.ERR_CANCELED,n,a),this.name="CanceledError",this.__CANCEL__=!0}};function xa(e,t,n){const a=n.config.validateStatus;!n.status||!a||a(n.status)?e(n):t(new S("Request failed with status code "+n.status,[S.ERR_BAD_REQUEST,S.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}function br(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function kr(e,t){e=e||10;const n=new Array(e),a=new Array(e);let o=0,r=0,s;return t=t!==void 0?t:1e3,function(c){const d=Date.now(),l=a[r];s||(s=d),n[o]=c,a[o]=d;let g=r,I=0;for(;g!==o;)I+=n[g++],g=g%e;if(o=(o+1)%e,o===r&&(r=(r+1)%e),d-s<t)return;const O=l&&d-l;return O?Math.round(I*1e3/O):void 0}}function hr(e,t){let n=0,a=1e3/t,o,r;const s=(d,l=Date.now())=>{n=l,o=null,r&&(clearTimeout(r),r=null),e(...d)};return[(...d)=>{const l=Date.now(),g=l-n;g>=a?s(d,l):(o=d,r||(r=setTimeout(()=>{r=null,s(o)},a-g)))},()=>o&&s(o)]}const lt=(e,t,n=3)=>{let a=0;const o=kr(50,250);return hr(r=>{const s=r.loaded,i=r.lengthComputable?r.total:void 0,c=s-a,d=o(c),l=s<=i;a=s;const g={loaded:s,total:i,progress:i?s/i:void 0,bytes:c,rate:d||void 0,estimated:d&&i&&l?(i-s)/d:void 0,event:r,lengthComputable:i!=null,[t?"download":"upload"]:!0};e(g)},n)},En=(e,t)=>{const n=e!=null;return[a=>t[0]({lengthComputable:n,total:e,loaded:a}),t[1]]},wn=e=>(...t)=>m.asap(()=>e(...t)),yr=ne.hasStandardBrowserEnv?((e,t)=>n=>(n=new URL(n,ne.origin),e.protocol===n.protocol&&e.host===n.host&&(t||e.port===n.port)))(new URL(ne.origin),ne.navigator&&/(msie|trident)/i.test(ne.navigator.userAgent)):()=>!0,vr=ne.hasStandardBrowserEnv?{write(e,t,n,a,o,r,s){if(typeof document>"u")return;const i=[`${e}=${encodeURIComponent(t)}`];m.isNumber(n)&&i.push(`expires=${new Date(n).toUTCString()}`),m.isString(a)&&i.push(`path=${a}`),m.isString(o)&&i.push(`domain=${o}`),r===!0&&i.push("secure"),m.isString(s)&&i.push(`SameSite=${s}`),document.cookie=i.join("; ")},read(e){if(typeof document>"u")return null;const t=document.cookie.match(new RegExp("(?:^|; )"+e+"=([^;]*)"));return t?decodeURIComponent(t[1]):null},remove(e){this.write(e,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function Er(e){return typeof e!="string"?!1:/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function wr(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function La(e,t,n){let a=!Er(t);return e&&(a||n==!1)?wr(e,t):t}const Bn=e=>e instanceof oe?{...e}:e;function be(e,t){t=t||{};const n={};function a(d,l,g,I){return m.isPlainObject(d)&&m.isPlainObject(l)?m.merge.call({caseless:I},d,l):m.isPlainObject(l)?m.merge({},l):m.isArray(l)?l.slice():l}function o(d,l,g,I){if(m.isUndefined(l)){if(!m.isUndefined(d))return a(void 0,d,g,I)}else return a(d,l,g,I)}function r(d,l){if(!m.isUndefined(l))return a(void 0,l)}function s(d,l){if(m.isUndefined(l)){if(!m.isUndefined(d))return a(void 0,d)}else return a(void 0,l)}function i(d,l,g){if(g in t)return a(d,l);if(g in e)return a(void 0,d)}const c={url:r,method:r,data:r,baseURL:s,transformRequest:s,transformResponse:s,paramsSerializer:s,timeout:s,timeoutMessage:s,withCredentials:s,withXSRFToken:s,adapter:s,responseType:s,xsrfCookieName:s,xsrfHeaderName:s,onUploadProgress:s,onDownloadProgress:s,decompress:s,maxContentLength:s,maxBodyLength:s,beforeRedirect:s,transport:s,httpAgent:s,httpsAgent:s,cancelToken:s,socketPath:s,responseEncoding:s,validateStatus:i,headers:(d,l,g)=>o(Bn(d),Bn(l),g,!0)};return m.forEach(Object.keys({...e,...t}),function(l){if(l==="__proto__"||l==="constructor"||l==="prototype")return;const g=m.hasOwnProp(c,l)?c[l]:o,I=g(e[l],t[l],l);m.isUndefined(I)&&g!==i||(n[l]=I)}),n}const Ta=e=>{const t=be({},e);let{data:n,withXSRFToken:a,xsrfHeaderName:o,xsrfCookieName:r,headers:s,auth:i}=t;if(t.headers=s=oe.from(s),t.url=$a(La(t.baseURL,t.url,t.allowAbsoluteUrls),e.params,e.paramsSerializer),i&&s.set("Authorization","Basic "+btoa((i.username||"")+":"+(i.password?unescape(encodeURIComponent(i.password)):""))),m.isFormData(n)){if(ne.hasStandardBrowserEnv||ne.hasStandardBrowserWebWorkerEnv)s.setContentType(void 0);else if(m.isFunction(n.getHeaders)){const c=n.getHeaders(),d=["content-type","content-length"];Object.entries(c).forEach(([l,g])=>{d.includes(l.toLowerCase())&&s.set(l,g)})}}if(ne.hasStandardBrowserEnv&&(a&&m.isFunction(a)&&(a=a(t)),a||a!==!1&&yr(t.url))){const c=o&&r&&vr.read(r);c&&s.set(o,c)}return t},Br=typeof XMLHttpRequest<"u",Ir=Br&&function(e){return new Promise(function(n,a){const o=Ta(e);let r=o.data;const s=oe.from(o.headers).normalize();let{responseType:i,onUploadProgress:c,onDownloadProgress:d}=o,l,g,I,O,b;function h(){O&&O(),b&&b(),o.cancelToken&&o.cancelToken.unsubscribe(l),o.signal&&o.signal.removeEventListener("abort",l)}let f=new XMLHttpRequest;f.open(o.method.toUpperCase(),o.url,!0),f.timeout=o.timeout;function j(){if(!f)return;const y=oe.from("getAllResponseHeaders"in f&&f.getAllResponseHeaders()),P={data:!i||i==="text"||i==="json"?f.responseText:f.response,status:f.status,statusText:f.statusText,headers:y,config:e,request:f};xa(function(N){n(N),h()},function(N){a(N),h()},P),f=null}"onloadend"in f?f.onloadend=j:f.onreadystatechange=function(){!f||f.readyState!==4||f.status===0&&!(f.responseURL&&f.responseURL.indexOf("file:")===0)||setTimeout(j)},f.onabort=function(){f&&(a(new S("Request aborted",S.ECONNABORTED,e,f)),f=null)},f.onerror=function(B){const P=B&&B.message?B.message:"Network Error",C=new S(P,S.ERR_NETWORK,e,f);C.event=B||null,a(C),f=null},f.ontimeout=function(){let B=o.timeout?"timeout of "+o.timeout+"ms exceeded":"timeout exceeded";const P=o.transitional||Qt;o.timeoutErrorMessage&&(B=o.timeoutErrorMessage),a(new S(B,P.clarifyTimeoutError?S.ETIMEDOUT:S.ECONNABORTED,e,f)),f=null},r===void 0&&s.setContentType(null),"setRequestHeader"in f&&m.forEach(s.toJSON(),function(B,P){f.setRequestHeader(P,B)}),m.isUndefined(o.withCredentials)||(f.withCredentials=!!o.withCredentials),i&&i!=="json"&&(f.responseType=o.responseType),d&&([I,b]=lt(d,!0),f.addEventListener("progress",I)),c&&f.upload&&([g,O]=lt(c),f.upload.addEventListener("progress",g),f.upload.addEventListener("loadend",O)),(o.cancelToken||o.signal)&&(l=y=>{f&&(a(!y||y.type?new Ze(null,e,f):y),f.abort(),f=null)},o.cancelToken&&o.cancelToken.subscribe(l),o.signal&&(o.signal.aborted?l():o.signal.addEventListener("abort",l)));const k=br(o.url);if(k&&ne.protocols.indexOf(k)===-1){a(new S("Unsupported protocol "+k+":",S.ERR_BAD_REQUEST,e));return}f.send(r||null)})},_r=(e,t)=>{const{length:n}=e=e?e.filter(Boolean):[];if(t||n){let a=new AbortController,o;const r=function(d){if(!o){o=!0,i();const l=d instanceof Error?d:this.reason;a.abort(l instanceof S?l:new Ze(l instanceof Error?l.message:l))}};let s=t&&setTimeout(()=>{s=null,r(new S(`timeout of ${t}ms exceeded`,S.ETIMEDOUT))},t);const i=()=>{e&&(s&&clearTimeout(s),s=null,e.forEach(d=>{d.unsubscribe?d.unsubscribe(r):d.removeEventListener("abort",r)}),e=null)};e.forEach(d=>d.addEventListener("abort",r));const{signal:c}=a;return c.unsubscribe=()=>m.asap(i),c}},$r=function*(e,t){let n=e.byteLength;if(n<t){yield e;return}let a=0,o;for(;a<n;)o=a+t,yield e.slice(a,o),a=o},Sr=async function*(e,t){for await(const n of Cr(e))yield*$r(n,t)},Cr=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:n,value:a}=await t.read();if(n)break;yield a}}finally{await t.cancel()}},In=(e,t,n,a)=>{const o=Sr(e,t);let r=0,s,i=c=>{s||(s=!0,a&&a(c))};return new ReadableStream({async pull(c){try{const{done:d,value:l}=await o.next();if(d){i(),c.close();return}let g=l.byteLength;if(n){let I=r+=g;n(I)}c.enqueue(new Uint8Array(l))}catch(d){throw i(d),d}},cancel(c){return i(c),o.return()}},{highWaterMark:2})},_n=64*1024,{isFunction:et}=m,xr=(({Request:e,Response:t})=>({Request:e,Response:t}))(m.global),{ReadableStream:$n,TextEncoder:Sn}=m.global,Cn=(e,...t)=>{try{return!!e(...t)}catch{return!1}},Lr=e=>{e=m.merge.call({skipUndefined:!0},xr,e);const{fetch:t,Request:n,Response:a}=e,o=t?et(t):typeof fetch=="function",r=et(n),s=et(a);if(!o)return!1;const i=o&&et($n),c=o&&(typeof Sn=="function"?(b=>h=>b.encode(h))(new Sn):async b=>new Uint8Array(await new n(b).arrayBuffer())),d=r&&i&&Cn(()=>{let b=!1;const h=new n(ne.origin,{body:new $n,method:"POST",get duplex(){return b=!0,"half"}}).headers.has("Content-Type");return b&&!h}),l=s&&i&&Cn(()=>m.isReadableStream(new a("").body)),g={stream:l&&(b=>b.body)};o&&["text","arrayBuffer","blob","formData","stream"].forEach(b=>{!g[b]&&(g[b]=(h,f)=>{let j=h&&h[b];if(j)return j.call(h);throw new S(`Response type '${b}' is not supported`,S.ERR_NOT_SUPPORT,f)})});const I=async b=>{if(b==null)return 0;if(m.isBlob(b))return b.size;if(m.isSpecCompliantForm(b))return(await new n(ne.origin,{method:"POST",body:b}).arrayBuffer()).byteLength;if(m.isArrayBufferView(b)||m.isArrayBuffer(b))return b.byteLength;if(m.isURLSearchParams(b)&&(b=b+""),m.isString(b))return(await c(b)).byteLength},O=async(b,h)=>{const f=m.toFiniteNumber(b.getContentLength());return f??I(h)};return async b=>{let{url:h,method:f,data:j,signal:k,cancelToken:y,timeout:B,onDownloadProgress:P,onUploadProgress:C,responseType:N,headers:G,withCredentials:z="same-origin",fetchOptions:K}=Ta(b),R=t||fetch;N=N?(N+"").toLowerCase():"text";let w=_r([k,y&&y.toAbortSignal()],B),A=null;const U=w&&w.unsubscribe&&(()=>{w.unsubscribe()});let te;try{if(C&&d&&f!=="get"&&f!=="head"&&(te=await O(G,j))!==0){let se=new n(h,{method:"POST",body:j,duplex:"half"}),ve;if(m.isFormData(j)&&(ve=se.headers.get("content-type"))&&G.setContentType(ve),se.body){const[Lt,Ye]=En(te,lt(wn(C)));j=In(se.body,_n,Lt,Ye)}}m.isString(z)||(z=z?"include":"omit");const W=r&&"credentials"in n.prototype,X={...K,signal:w,method:f.toUpperCase(),headers:G.normalize().toJSON(),body:j,duplex:"half",credentials:W?z:void 0};A=r&&new n(h,X);let Z=await(r?R(A,K):R(h,X));const Q=l&&(N==="stream"||N==="response");if(l&&(P||Q&&U)){const se={};["status","statusText","headers"].forEach(gn=>{se[gn]=Z[gn]});const ve=m.toFiniteNumber(Z.headers.get("content-length")),[Lt,Ye]=P&&En(ve,lt(wn(P),!0))||[];Z=new a(In(Z.body,_n,Lt,()=>{Ye&&Ye(),U&&U()}),se)}N=N||"text";let Pe=await g[m.findKey(g,N)||"text"](Z,b);return!Q&&U&&U(),await new Promise((se,ve)=>{xa(se,ve,{data:Pe,headers:oe.from(Z.headers),status:Z.status,statusText:Z.statusText,config:b,request:A})})}catch(W){throw U&&U(),W&&W.name==="TypeError"&&/Load failed|fetch/i.test(W.message)?Object.assign(new S("Network Error",S.ERR_NETWORK,b,A,W&&W.response),{cause:W.cause||W}):S.from(W,W&&W.code,b,A,W&&W.response)}}},Tr=new Map,Aa=e=>{let t=e&&e.env||{};const{fetch:n,Request:a,Response:o}=t,r=[a,o,n];let s=r.length,i=s,c,d,l=Tr;for(;i--;)c=r[i],d=l.get(c),d===void 0&&l.set(c,d=i?new Map:Lr(t)),l=d;return d};Aa();const en={http:Ko,xhr:Ir,fetch:{get:Aa}};m.forEach(en,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const xn=e=>`- ${e}`,Ar=e=>m.isFunction(e)||e===null||e===!1;function Mr(e,t){e=m.isArray(e)?e:[e];const{length:n}=e;let a,o;const r={};for(let s=0;s<n;s++){a=e[s];let i;if(o=a,!Ar(a)&&(o=en[(i=String(a)).toLowerCase()],o===void 0))throw new S(`Unknown adapter '${i}'`);if(o&&(m.isFunction(o)||(o=o.get(t))))break;r[i||"#"+s]=o}if(!o){const s=Object.entries(r).map(([c,d])=>`adapter ${c} `+(d===!1?"is not supported by the environment":"is not available in the build"));let i=n?s.length>1?`since :
`+s.map(xn).join(`
`):" "+xn(s[0]):"as no adapter specified";throw new S("There is no suitable adapter to dispatch the request "+i,"ERR_NOT_SUPPORT")}return o}const Ma={getAdapter:Mr,adapters:en};function Rt(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new Ze(null,e)}function Ln(e){return Rt(e),e.headers=oe.from(e.headers),e.data=Mt.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),Ma.getAdapter(e.adapter||Xe.adapter,e)(e).then(function(a){return Rt(e),a.data=Mt.call(e,e.transformResponse,a),a.headers=oe.from(a.headers),a},function(a){return Ca(a)||(Rt(e),a&&a.response&&(a.response.data=Mt.call(e,e.transformResponse,a.response),a.response.headers=oe.from(a.response.headers))),Promise.reject(a)})}const Ra="1.13.6",St={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{St[e]=function(a){return typeof a===e||"a"+(t<1?"n ":" ")+e}});const Tn={};St.transitional=function(t,n,a){function o(r,s){return"[Axios v"+Ra+"] Transitional option '"+r+"'"+s+(a?". "+a:"")}return(r,s,i)=>{if(t===!1)throw new S(o(s," has been removed"+(n?" in "+n:"")),S.ERR_DEPRECATED);return n&&!Tn[s]&&(Tn[s]=!0,console.warn(o(s," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(r,s,i):!0}};St.spelling=function(t){return(n,a)=>(console.warn(`${a} is likely a misspelling of ${t}`),!0)};function Rr(e,t,n){if(typeof e!="object")throw new S("options must be an object",S.ERR_BAD_OPTION_VALUE);const a=Object.keys(e);let o=a.length;for(;o-- >0;){const r=a[o],s=t[r];if(s){const i=e[r],c=i===void 0||s(i,r,e);if(c!==!0)throw new S("option "+r+" must be "+c,S.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new S("Unknown option "+r,S.ERR_BAD_OPTION)}}const it={assertOptions:Rr,validators:St},re=it.validators;let fe=class{constructor(t){this.defaults=t||{},this.interceptors={request:new yn,response:new yn}}async request(t,n){try{return await this._request(t,n)}catch(a){if(a instanceof Error){let o={};Error.captureStackTrace?Error.captureStackTrace(o):o=new Error;const r=o.stack?o.stack.replace(/^.+\n/,""):"";try{a.stack?r&&!String(a.stack).endsWith(r.replace(/^.+\n.+\n/,""))&&(a.stack+=`
`+r):a.stack=r}catch{}}throw a}}_request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=be(this.defaults,n);const{transitional:a,paramsSerializer:o,headers:r}=n;a!==void 0&&it.assertOptions(a,{silentJSONParsing:re.transitional(re.boolean),forcedJSONParsing:re.transitional(re.boolean),clarifyTimeoutError:re.transitional(re.boolean),legacyInterceptorReqResOrdering:re.transitional(re.boolean)},!1),o!=null&&(m.isFunction(o)?n.paramsSerializer={serialize:o}:it.assertOptions(o,{encode:re.function,serialize:re.function},!0)),n.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?n.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:n.allowAbsoluteUrls=!0),it.assertOptions(n,{baseUrl:re.spelling("baseURL"),withXsrfToken:re.spelling("withXSRFToken")},!0),n.method=(n.method||this.defaults.method||"get").toLowerCase();let s=r&&m.merge(r.common,r[n.method]);r&&m.forEach(["delete","get","head","post","put","patch","common"],b=>{delete r[b]}),n.headers=oe.concat(s,r);const i=[];let c=!0;this.interceptors.request.forEach(function(h){if(typeof h.runWhen=="function"&&h.runWhen(n)===!1)return;c=c&&h.synchronous;const f=n.transitional||Qt;f&&f.legacyInterceptorReqResOrdering?i.unshift(h.fulfilled,h.rejected):i.push(h.fulfilled,h.rejected)});const d=[];this.interceptors.response.forEach(function(h){d.push(h.fulfilled,h.rejected)});let l,g=0,I;if(!c){const b=[Ln.bind(this),void 0];for(b.unshift(...i),b.push(...d),I=b.length,l=Promise.resolve(n);g<I;)l=l.then(b[g++],b[g++]);return l}I=i.length;let O=n;for(;g<I;){const b=i[g++],h=i[g++];try{O=b(O)}catch(f){h.call(this,f);break}}try{l=Ln.call(this,O)}catch(b){return Promise.reject(b)}for(g=0,I=d.length;g<I;)l=l.then(d[g++],d[g++]);return l}getUri(t){t=be(this.defaults,t);const n=La(t.baseURL,t.url,t.allowAbsoluteUrls);return $a(n,t.params,t.paramsSerializer)}};m.forEach(["delete","get","head","options"],function(t){fe.prototype[t]=function(n,a){return this.request(be(a||{},{method:t,url:n,data:(a||{}).data}))}});m.forEach(["post","put","patch"],function(t){function n(a){return function(r,s,i){return this.request(be(i||{},{method:t,headers:a?{"Content-Type":"multipart/form-data"}:{},url:r,data:s}))}}fe.prototype[t]=n(),fe.prototype[t+"Form"]=n(!0)});let Pr=class Pa{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(r){n=r});const a=this;this.promise.then(o=>{if(!a._listeners)return;let r=a._listeners.length;for(;r-- >0;)a._listeners[r](o);a._listeners=null}),this.promise.then=o=>{let r;const s=new Promise(i=>{a.subscribe(i),r=i}).then(o);return s.cancel=function(){a.unsubscribe(r)},s},t(function(r,s,i){a.reason||(a.reason=new Ze(r,s,i),n(a.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}toAbortSignal(){const t=new AbortController,n=a=>{t.abort(a)};return this.subscribe(n),t.signal.unsubscribe=()=>this.unsubscribe(n),t.signal}static source(){let t;return{token:new Pa(function(o){t=o}),cancel:t}}};function Dr(e){return function(n){return e.apply(null,n)}}function Or(e){return m.isObject(e)&&e.isAxiosError===!0}const Ft={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(Ft).forEach(([e,t])=>{Ft[t]=e});function Da(e){const t=new fe(e),n=fa(fe.prototype.request,t);return m.extend(n,fe.prototype,t,{allOwnKeys:!0}),m.extend(n,t,null,{allOwnKeys:!0}),n.create=function(o){return Da(be(e,o))},n}const Y=Da(Xe);Y.Axios=fe;Y.CanceledError=Ze;Y.CancelToken=Pr;Y.isCancel=Ca;Y.VERSION=Ra;Y.toFormData=$t;Y.AxiosError=S;Y.Cancel=Y.CanceledError;Y.all=function(t){return Promise.all(t)};Y.spread=Dr;Y.isAxiosError=Or;Y.mergeConfig=be;Y.AxiosHeaders=oe;Y.formToJSON=e=>Sa(m.isHTMLForm(e)?new FormData(e):e);Y.getAdapter=Ma.getAdapter;Y.HttpStatusCode=Ft;Y.default=Y;const{Axios:wd,AxiosError:Bd,CanceledError:Id,isCancel:_d,CancelToken:$d,VERSION:Sd,all:Cd,Cancel:xd,isAxiosError:Ld,spread:Td,toFormData:Ad,AxiosHeaders:Md,HttpStatusCode:Rd,formToJSON:Pd,getAdapter:Dd,mergeConfig:Od}=Y;window.axios=Y;window.axios.defaults.headers.common["X-Requested-With"]="XMLHttpRequest";const tn="transit_user",ce="transit_token",Gt="transit_pending_toast";function Re(){try{return typeof window<"u"&&typeof window.localStorage<"u"}catch{return!1}}function Oa(){try{return typeof window<"u"&&typeof window.sessionStorage<"u"}catch{return!1}}function jr(){if(window.transitAuthUser)return window.transitAuthUser;if(!Re())return null;const e=window.localStorage.getItem(tn);if(!e)return null;try{return JSON.parse(e)}catch{return He(),null}}function ja(e){if(!Re()){window.transitAuthUser=e;return}window.transitAuthUser=e,window.localStorage.setItem(tn,JSON.stringify(e))}function qr(){if(!Re()){window.transitAuthUser=null;return}window.transitAuthUser=null,window.localStorage.removeItem(tn)}function nn(){return typeof window<"u"&&typeof window.transitAuthToken=="string"&&window.transitAuthToken!==""?window.transitAuthToken:Re()?window.localStorage.getItem(ce):null}function Nr(e){const t=typeof e=="string"?e:"";if(!Re()){window.transitAuthToken=t||null;return}if(window.transitAuthToken=t||null,t===""){window.localStorage.removeItem(ce),document.cookie=ce+"=; path=/; max-age=0; samesite=lax";return}window.localStorage.setItem(ce,t),document.cookie=ce+"="+t+"; path=/; max-age=86400; samesite=lax"}function Ur(){if(!Re()){window.transitAuthToken=null,document.cookie=ce+"=; path=/; max-age=0; samesite=lax";return}window.transitAuthToken=null,window.localStorage.removeItem(ce),document.cookie=ce+"=; path=/; max-age=0; samesite=lax"}function Hr(e){Oa()&&window.sessionStorage.setItem(Gt,JSON.stringify(e))}function Fr(){if(!Oa())return null;const e=window.sessionStorage.getItem(Gt);if(!e)return null;window.sessionStorage.removeItem(Gt);try{return JSON.parse(e)}catch{return null}}function He(){qr(),Ur()}function qa(e,t){if(!e)return t;if(typeof e.detail=="string"&&e.detail!=="")return e.detail;if(typeof e.message=="string"&&e.message!=="")return e.message;if(e.errors&&typeof e.errors=="object"){const n=Object.values(e.errors).flat()[0];if(typeof n=="string"&&n!=="")return n}return t}function An(){return document.body.dataset.apiBase||"/api"}function Na(e=""){const t=String(e).replace(/^\/+/,"");return t===""?An():`${An()}/${t}`}async function E(e,t={}){const{method:n="GET",body:a=null,headers:o={},auth:r=!0}=t,s=new Headers(o);s.set("Accept","application/json"),s.set("X-Requested-With","XMLHttpRequest");let i=a;if(a&&!(a instanceof FormData)&&!(a instanceof Blob)&&(s.set("Content-Type","application/json"),i=JSON.stringify(a)),r){const g=nn();g&&s.set("Authorization",`Bearer ${g}`)}if(!["GET","HEAD","OPTIONS"].includes(n.toUpperCase())){const g=document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");g&&s.set("X-CSRF-TOKEN",g)}const c=await fetch(Na(e),{method:n,headers:s,body:i,credentials:"same-origin"});let d=null;const l=c.headers.get("content-type")||"";if(c.status!==204&&(d=l.includes("application/json")?await c.json():await c.text()),!c.ok){c.status===401&&(He(),(document.body.dataset.routeGuard||"none")==="protected"&&window.location.replace(document.body.dataset.loginUrl||"/login"));const g=qa(d,`Request gagal (${c.status})`),I=new Error(g);throw I.status=c.status,I.data=d,I}return d}async function an(e,t="export.csv"){const n=new Headers({Accept:"text/csv,application/octet-stream","X-Requested-With":"XMLHttpRequest"}),a=nn();a&&n.set("Authorization",`Bearer ${a}`);const o=await fetch(Na(e),{method:"GET",headers:n,credentials:"same-origin"});if(!o.ok){let g=null;throw(o.headers.get("content-type")||"").includes("application/json")&&(g=await o.json()),new Error(qa(g,"Gagal mengunduh file"))}const r=await o.blob(),c=(o.headers.get("content-disposition")||"").match(/filename="?([^"]+)"?/i)?.[1]||t,d=window.URL.createObjectURL(r),l=document.createElement("a");l.href=d,l.download=c,document.body.appendChild(l),l.click(),l.remove(),window.URL.revokeObjectURL(d)}function Oe(e,t){const n=document.getElementById(e);n&&(n.textContent=t)}function Gr(e){const t=e?.role||"";document.querySelectorAll("[data-role-scope]").forEach(n=>{const a=n.dataset.roleScope,o=a==="admin"?["Super Admin","Admin"].includes(t):a==="super"?t==="Super Admin":!0;n.hidden=!o})}function Ua(){return jr()}function ct(e){if(Gr(e),!e)return;const t=e.nama||"Admin",n=t.trim().split(/\s+/)[0]||"Admin",a=e.email||"admin@pekanbaru.com";Oe("sidebar-user-name",t),Oe("sidebar-user-email",a),Oe("header-user-name",n),Oe("dropdown-user-name",t),Oe("dropdown-user-email",a)}function Ha(e){return typeof e.access_token=="string"&&e.access_token!==""&&Nr(e.access_token),ja(e.user),ct(e.user),e}async function Vr(e){const t=await E("/auth/login",{method:"POST",body:e,auth:!1});return Ha(t)}async function Jr(e){const t=await E("/auth/register",{method:"POST",body:e,auth:!1});return Ha(t)}async function Mn(){const e=await E("/auth/me");return ja(e),ct(e),e}async function zr(){try{await E("/auth/logout",{method:"POST"})}catch(e){if(e?.status!==401)throw e}He(),Hr({type:"success",title:"Logout berhasil",message:"Sampai jumpa kembali!"}),window.location.replace(document.body.dataset.loginUrl||"/login")}function Rn(e){window.location.replace(e)}async function Kr(){const e=document.body.dataset.routeGuard||"none",t=document.body.dataset.loginUrl||"/login",n=document.body.dataset.dashboardUrl||"/dashboard",a=Ua();if(e==="public"){try{const o=await Mn();return Rn(n),{user:o}}catch{(a||nn())&&He()}return{user:null}}if(e==="protected")try{return{user:await Mn()}}catch{return He(),Rn(t),{user:null}}return{user:a}}function on(){return Array.from(document.querySelectorAll(".modal-shell")).filter(e=>!e.hidden)}function Fa(){document.body.style.overflow=on().length>0?"hidden":""}function H(e){const t=document.getElementById(e);t&&(t.hidden=!1,Fa())}function ee(e=null){if(e){const t=document.getElementById(e);t&&(t.hidden=!0)}else on().forEach(t=>{t.hidden=!0});Fa()}function Wr(){document.addEventListener("click",e=>{const t=e.target.closest("[data-modal-open]");if(t){H(t.dataset.modalOpen);return}const n=e.target.closest("[data-modal-close]");if(n){const a=n.dataset.modalClose||n.closest(".modal-shell")?.id;ee(a||void 0)}}),document.addEventListener("keydown",e=>{if(e.key!=="Escape")return;const t=on().pop();t&&ee(t.id)})}function rn(e,t,n){const a=document.getElementById("transit-toast-root");if(!a)return;const o=document.createElement("div");o.className=`transit-toast ${n==="error"?"is-error":""} ${n==="info"?"is-info":""}`.trim(),o.innerHTML=`
        <div>
            <strong>${e}</strong>
            <p>${t}</p>
        </div>
    `,a.appendChild(o),window.requestAnimationFrame(()=>{o.classList.add("is-visible")}),window.setTimeout(()=>{o.classList.remove("is-visible"),window.setTimeout(()=>o.remove(),180)},3600)}function F(e,t="Berhasil"){rn(t,e,"success")}function v(e,t="Gagal"){rn(t,e,"error")}function tt(e){return e?.status===409&&e?.data?.error==="booking_version_conflict"?(v("Booking diubah oleh admin lain. Halaman akan refresh otomatis dalam 3 detik...","Perubahan Terdeteksi"),setTimeout(function(){window.location.reload()},3e3),!0):!1}function Xr(e,t="Info"){rn(t,e,"info")}function je(e){const t=document.querySelector("[data-sidebar]"),n=document.querySelector("[data-sidebar-overlay]");!t||!n||(t.classList.toggle("is-open",e),n.hidden=!e)}function dt(e=null){document.querySelectorAll("[data-user-dropdown]").forEach(t=>{if(e&&t===e)return;t.classList.remove("is-open");const n=t.querySelector("[data-user-menu-trigger]"),a=t.querySelector("[data-user-menu-panel]");n&&n.setAttribute("aria-expanded","false"),a&&(a.hidden=!0)})}function Zr(e,t=null){if(!e)return;const n=e.querySelector("[data-user-menu-trigger]"),a=e.querySelector("[data-user-menu-panel]"),o=t??!e.classList.contains("is-open");dt(o?e:null),e.classList.toggle("is-open",o),n&&n.setAttribute("aria-expanded",o?"true":"false"),a&&(a.hidden=!o)}function Qr(){document.querySelector("[data-sidebar-open]")?.addEventListener("click",()=>{je(!0)}),document.querySelector("[data-sidebar-close]")?.addEventListener("click",()=>{je(!1)}),document.querySelector("[data-sidebar-overlay]")?.addEventListener("click",()=>{je(!1)}),document.querySelectorAll("[data-user-dropdown]").forEach(e=>{e.querySelector("[data-user-menu-trigger]")?.addEventListener("click",t=>{t.stopPropagation(),Zr(e)})}),document.addEventListener("click",e=>{e.target.closest("[data-user-dropdown]")||dt()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&(dt(),je(!1))}),window.addEventListener("resize",()=>{window.innerWidth>1100&&je(!1)}),document.querySelectorAll("[data-auth-logout]").forEach(e=>{e.addEventListener("click",async()=>{ee(),dt();try{e.disabled=!0,await zr()}catch(t){e.disabled=!1,v(t.message||"Gagal logout")}})})}const Ga={login:{title:"Selamat Datang!",description:"Masuk ke akun Anda untuk melanjutkan",submit:"Masuk",switchText:"Belum punya akun?",switchAction:"Daftar sekarang"},register:{title:"Buat Akun Baru",description:"Daftar untuk mulai menggunakan sistem",submit:"Daftar",switchText:"Sudah punya akun?",switchAction:"Masuk"}};function Pn(e,t){const n=Ga[e];t.form.dataset.authMode=e,t.title.textContent=n.title,t.description.textContent=n.description,t.submitText.textContent=n.submit,t.switchText&&(t.switchText.textContent=n.switchText),t.switchButton&&(t.switchButton.textContent=n.switchAction),t.nameField.hidden=e!=="register",t.nameInput.required=e==="register"}function Yr(){const e=document.getElementById("auth-form");if(!e)return;const t={form:e,title:document.querySelector("[data-auth-title]"),description:document.querySelector("[data-auth-description]"),submitText:document.querySelector("[data-auth-submit-text]"),switchText:document.querySelector("[data-auth-switch-text]"),switchButton:document.querySelector("[data-toggle-auth-mode]"),nameField:document.getElementById("auth-name-field"),nameInput:document.getElementById("nama"),emailInput:document.getElementById("email"),passwordInput:document.getElementById("password"),passwordToggle:document.querySelector("[data-toggle-password]"),submitButton:document.getElementById("auth-submit-button")},n=document.body.dataset.dashboardUrl||"/dashboard";Pn("login",t),t.switchButton?.addEventListener("click",()=>{const a=t.form.dataset.authMode==="login"?"register":"login";Pn(a,t)}),t.passwordToggle?.addEventListener("click",()=>{const a=t.passwordInput.type==="password"?"text":"password";t.passwordInput.type=a,t.passwordToggle.textContent=a==="password"?"Lihat":"Sembunyikan"}),e.addEventListener("submit",async a=>{a.preventDefault();const o=new FormData(e),r=e.dataset.authMode||"login",s={email:String(o.get("email")||"").trim(),password:String(o.get("password")||"").trim()};r==="register"&&(s.nama=String(o.get("nama")||"").trim()),t.submitButton.disabled=!0,t.submitText.textContent=r==="login"?"Memproses...":"Mendaftarkan...";try{r==="login"?(await Vr(s),F("Selamat datang kembali","Login berhasil!")):(await Jr(s),F("Akun Anda telah dibuat","Registrasi berhasil!")),window.location.replace(n)}catch(i){v(i.message||"Terjadi kesalahan",r==="login"?"Login gagal":"Registrasi gagal")}finally{t.submitButton.disabled=!1,t.submitText.textContent=Ga[r].submit}})}const es=new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}),ts=new Intl.NumberFormat("id-ID");function J(e){return es.format(Number(e)||0)}function q(e){return ts.format(Number(e)||0)}function u(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function he(e,t=300){let n=null;return(...a)=>{window.clearTimeout(n),n=window.setTimeout(()=>e(...a),t)}}function ye(e,t,n,a){if(n===0||a===0)return"Menampilkan 0 - 0 dari 0 data";const o=(e-1)*t+1,r=o+a-1;return`Menampilkan ${o} - ${r} dari ${n} data`}function ns(e){if(!e)return"-";const t=new Date(e);return Number.isNaN(t.getTime())?e:new Intl.DateTimeFormat("id-ID",{day:"2-digit",month:"short",year:"numeric"}).format(t)}function Qe(){return new Date().toISOString().slice(0,10)}function de(e,t,n="Memproses..."){e&&(e.dataset.defaultText||(e.dataset.defaultText=e.textContent.trim()),e.disabled=t,e.textContent=t?n:e.dataset.defaultText)}const ut=["#059669","#10B981","#34D399","#6EE7B7","#A7F3D0"],le={revenueChart:null,passengerChart:null,mobilChart:null};function as(){const e=document.getElementById("dashboard-initial-state");if(!e)return{stats:{},revenueData:[],mobilRevenue:[]};try{return JSON.parse(e.textContent||"{}")}catch{return{stats:{},revenueData:[],mobilRevenue:[]}}}function sn(e){e&&typeof e.destroy=="function"&&e.destroy()}function os(e,t){const n=document.querySelector(`[data-stat="${e}"]`);if(!n)return;const a=["total_uang_bersih","total_uang_pc"];n.textContent=a.includes(e)?J(t):q(t)}function Va(e,t,n){const a=document.getElementById(e),o=document.getElementById(t);a&&(a.hidden=!n),o&&(o.hidden=n)}function rs(){return"#065f46"}function Vt(){return"#d1fae5"}function dn(){return{backgroundColor:"#ffffff",titleColor:"#064e3b",bodyColor:"#065f46",borderColor:"#d1fae5",borderWidth:1,padding:12,cornerRadius:12,displayColors:!0}}function ss(e){const t=document.getElementById("dashboard-revenue-chart"),n=Array.isArray(e)&&e.length>0;if(Va("dashboard-revenue-chart","dashboard-revenue-empty",n),sn(le.revenueChart),!t||!window.Chart||!n){le.revenueChart=null;return}le.revenueChart=new window.Chart(t,{type:"line",data:{labels:e.map(a=>a.bulan),datasets:[{label:"Pendapatan Bersih",data:e.map(a=>a.uang_bersih),borderColor:"#059669",backgroundColor:"rgba(5, 150, 105, 0.08)",fill:!1,tension:.35,pointRadius:4,pointHoverRadius:5,pointBackgroundColor:"#059669",pointBorderColor:"#ffffff",pointBorderWidth:2,borderWidth:3},{label:"Uang PC",data:e.map(a=>a.uang_pc),borderColor:"#f59e0b",backgroundColor:"rgba(245, 158, 11, 0.1)",fill:!1,tension:.35,pointRadius:4,pointHoverRadius:5,pointBackgroundColor:"#f59e0b",pointBorderColor:"#ffffff",pointBorderWidth:2,borderWidth:3}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{labels:{color:rs(),usePointStyle:!0,pointStyle:"circle",boxWidth:8,boxHeight:8,padding:18}},tooltip:{...dn(),callbacks:{label(a){return`${a.dataset.label}: ${J(a.parsed.y)}`}}}},scales:{x:{ticks:{color:"#047857",font:{size:12}},grid:{color:Vt()},border:{display:!1}},y:{ticks:{color:"#047857",font:{size:12},callback(a){return`${Math.round(Number(a)/1e6)}jt`}},grid:{color:Vt()},border:{display:!1}}}}})}function is(e){const t=document.getElementById("dashboard-passenger-chart"),n=Array.isArray(e)&&e.length>0;if(Va("dashboard-passenger-chart","dashboard-passenger-empty",n),sn(le.passengerChart),!t||!window.Chart||!n){le.passengerChart=null;return}le.passengerChart=new window.Chart(t,{type:"bar",data:{labels:e.map(a=>a.bulan),datasets:[{label:"Penumpang",data:e.map(a=>a.penumpang),backgroundColor:"#10B981",borderRadius:8,maxBarThickness:44}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{...dn(),callbacks:{label(a){return`Penumpang: ${q(a.parsed.y)}`}}}},scales:{x:{ticks:{color:"#047857",font:{size:12}},grid:{color:"rgba(0, 0, 0, 0)"},border:{display:!1}},y:{ticks:{color:"#047857",font:{size:12}},grid:{color:Vt()},border:{display:!1}}}}})}function ds(e){const t=document.getElementById("dashboard-mobil-list");t&&(t.innerHTML=e.map((n,a)=>`
        <div class="dashboard-mobil-item">
            <div class="dashboard-mobil-meta">
                <span class="dashboard-mobil-dot" style="background-color: ${ut[a%ut.length]}"></span>
                <div>
                    <p class="dashboard-mobil-code">${u(n.kode_mobil)}</p>
                    <p class="dashboard-mobil-trips">${q(n.total_trips)} trip</p>
                    <p class="dashboard-mobil-passengers">${q(n.total_penumpang)} penumpang</p>
                </div>
            </div>
            <p class="dashboard-mobil-value">${J(n.total_uang_bersih)}</p>
        </div>
    `).join(""))}function ls(e){const t=document.getElementById("dashboard-mobil-chart"),n=document.getElementById("dashboard-mobil-content"),a=document.getElementById("dashboard-mobil-empty"),o=document.getElementById("dashboard-mobil-chart-empty"),r=document.getElementById("dashboard-mobil-list"),s=Array.isArray(e)&&e.length>0,i=s&&e.some(c=>Number(c.total_uang_bersih)>0);if(sn(le.mobilChart),n&&(n.hidden=!s),a&&(a.hidden=s),t&&(t.hidden=!i),o&&(o.hidden=i),s?ds(e):r&&(r.innerHTML=""),!t||!window.Chart||!i){le.mobilChart=null;return}le.mobilChart=new window.Chart(t,{type:"doughnut",data:{labels:e.map(c=>c.kode_mobil),datasets:[{data:e.map(c=>c.total_uang_bersih),backgroundColor:e.map((c,d)=>ut[d%ut.length]),borderColor:"#ffffff",borderWidth:6,hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"58%",plugins:{legend:{display:!1},tooltip:{...dn(),callbacks:{label(c){const d=e[c.dataIndex]||{};return`${c.label}: ${J(c.parsed)} / ${q(d.total_penumpang||0)} penumpang`}}}}}})}function Dn(e){Object.entries(e.stats||{}).forEach(([t,n])=>os(t,n)),ss(e.revenueData||[]),is(e.revenueData||[]),ls(e.mobilRevenue||[])}async function cs(){const[e,t,n]=await Promise.all([E("/statistics/dashboard"),E("/statistics/revenue-chart"),E("/statistics/mobil-revenue")]);return{stats:e,revenueData:t,mobilRevenue:n}}function On(e){const t=document.querySelector("[data-dashboard-loading]"),n=document.querySelector("[data-dashboard-content]"),a=document.getElementById("dashboard-refresh-btn");t&&(t.hidden=!e),n&&(n.hidden=e),a&&(a.disabled=e)}async function us(){const e=document.getElementById("dashboard-refresh-btn");e&&(Dn(as()),e.addEventListener("click",async()=>{On(!0);try{Dn(await cs())}catch{v("Silakan coba lagi","Gagal memuat data")}finally{On(!1)}}))}const D={data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1},Te=10;function ms(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function ps(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 21C15 17.4 18 14.4 18 10.5C18 7.18629 15.3137 4.5 12 4.5C8.68629 4.5 6 7.18629 6 10.5C6 14.4 9 17.4 12 21Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
            <circle cx="12" cy="10.5" r="2.25" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function gs(){return`
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
    `}function mt(e){const t=document.getElementById("driver-submit-btn");D.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":D.editItem?"Perbarui":"Simpan")}function bs(){const e=document.getElementById("drivers-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="drivers-table-state">
                <div class="drivers-loading-inline">
                    <span class="drivers-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function ks(){const e=document.getElementById("drivers-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="drivers-table-state drivers-empty-copy">
                Belum ada data driver
            </td>
        </tr>
    `)}function jn(){const e=document.getElementById("drivers-table-body");if(e){if(D.loading){bs();return}if(D.data.length===0){ks();return}e.innerHTML=D.data.map((t,n)=>`
        <tr class="drivers-row" data-testid="driver-row-${t.id}">
            <td class="drivers-index-cell">${(D.page-1)*Te+n+1}</td>
            <td>
                <div class="drivers-user-cell">
                    <span class="drivers-user-avatar" aria-hidden="true">
                        ${ms()}
                    </span>
                    <span class="drivers-user-name">${u(t.nama)}</span>
                </div>
            </td>
            <td>
                <div class="drivers-location-cell">
                    <span class="drivers-location-icon" aria-hidden="true">${ps()}</span>
                    <span>${u(t.lokasi)}</span>
                </div>
            </td>
            <td>
                <div class="drivers-action-row">
                    <button
                        class="drivers-icon-button"
                        type="button"
                        data-driver-edit="${t.id}"
                        data-testid="edit-driver-${t.id}"
                        aria-label="Edit driver ${u(t.nama)}"
                    >
                        ${gs()}
                    </button>
                    <button
                        class="drivers-icon-button drivers-icon-button-danger"
                        type="button"
                        data-driver-delete="${t.id}"
                        data-driver-name="${u(t.nama)}"
                        data-testid="delete-driver-${t.id}"
                        aria-label="Hapus driver ${u(t.nama)}"
                    >
                        ${fs()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function qn(){const e=document.getElementById("drivers-pagination-shell"),t=document.getElementById("drivers-pagination-info"),n=document.getElementById("drivers-pagination-page"),a=document.getElementById("drivers-prev-page-btn"),o=document.getElementById("drivers-next-page-btn"),r=Math.max(1,Math.ceil(D.totalCount/Te));e&&(e.hidden=r<=1),t&&(t.textContent=ye(D.page,Te,D.totalCount,D.data.length)),n&&(n.textContent=`${D.page} / ${r}`),a&&(a.disabled=D.page===1),o&&(o.disabled=D.page>=r)}async function Ee(){D.loading=!0,jn(),qn();try{const[e,t]=await Promise.all([E(`/drivers?page=${D.page}&limit=${Te}${D.search?`&search=${encodeURIComponent(D.search)}`:""}`),E(`/drivers/count${D.search?`?search=${encodeURIComponent(D.search)}`:""}`)]);D.data=Array.isArray(e)?e:[],D.totalCount=Number(t.count||0)}finally{D.loading=!1,jn(),qn()}}function Nn(){const e=document.getElementById("driver-form"),t=document.getElementById("driver-form-title"),n=document.getElementById("driver-form-description"),a=document.getElementById("driver-id"),o=document.getElementById("driver-nama"),r=document.getElementById("driver-lokasi");e?.reset(),a&&(a.value=""),o&&(o.value=""),r&&(r.value=""),t&&(t.textContent="Tambah Driver Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan data driver"),D.editItem=null,mt(!1)}function hs(e){const t=document.getElementById("driver-form-title"),n=document.getElementById("driver-form-description"),a=document.getElementById("driver-id"),o=document.getElementById("driver-nama"),r=document.getElementById("driver-lokasi");D.editItem=e,a&&(a.value=e.id),o&&(o.value=e.nama),r&&(r.value=e.lokasi),t&&(t.textContent="Edit Data Driver"),n&&(n.textContent="Isi form di bawah untuk memperbarui data driver"),mt(!1)}async function ys(e){const t=await E(`/drivers/${e}`);hs(t),H("driver-form-modal")}function vs(e){const t=document.getElementById("driver-delete-copy");D.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus driver <strong>${u(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`),H("driver-delete-modal")}function Es(){const e=document.getElementById("drivers-add-btn"),t=document.getElementById("drivers-export-btn"),n=document.getElementById("drivers-search-input"),a=document.getElementById("driver-form"),o=document.getElementById("drivers-table-body"),r=document.getElementById("driver-delete-confirm-btn"),s=document.getElementById("drivers-prev-page-btn"),i=document.getElementById("drivers-next-page-btn");if(!(!e||!a||!o))return e.addEventListener("click",()=>{Nn(),H("driver-form-modal")}),t?.addEventListener("click",()=>{an("/export/drivers/csv","drivers.csv").catch(()=>{v("Gagal mengunduh file")})}),n?.addEventListener("input",he(async c=>{D.search=c.target.value.trim(),D.page=1;try{await Ee()}catch{v("Gagal memuat data")}})),a.addEventListener("submit",async c=>{c.preventDefault();const d={nama:document.getElementById("driver-nama")?.value.trim()||"",lokasi:document.getElementById("driver-lokasi")?.value.trim()||""};mt(!0);try{D.editItem?(await E(`/drivers/${D.editItem.id}`,{method:"PUT",body:d}),F("Data driver berhasil diperbarui")):(await E("/drivers",{method:"POST",body:d}),F("Driver berhasil ditambahkan")),ee("driver-form-modal"),Nn(),await Ee()}catch(l){v(l.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{mt(!1)}}),o.addEventListener("click",async c=>{const d=c.target.closest("[data-driver-edit]"),l=c.target.closest("[data-driver-delete]");try{if(d){await ys(d.dataset.driverEdit);return}l&&vs({id:l.dataset.driverDelete,nama:l.dataset.driverName})}catch{v("Gagal memuat data")}}),r?.addEventListener("click",async()=>{if(D.deleteItem)try{await E(`/drivers/${D.deleteItem.id}`,{method:"DELETE"}),F("Driver berhasil dihapus"),ee("driver-delete-modal"),(D.page-1)*Te>=D.totalCount-1&&D.page>1&&(D.page-=1),D.deleteItem=null,await Ee()}catch{v("Gagal menghapus data")}}),s?.addEventListener("click",async()=>{if(!(D.page<=1)){D.page-=1;try{await Ee()}catch{v("Gagal memuat data")}}}),i?.addEventListener("click",async()=>{const c=Math.max(1,Math.ceil(D.totalCount/Te));if(!(D.page>=c)){D.page+=1;try{await Ee()}catch{v("Gagal memuat data")}}}),Ee().catch(()=>{v("Gagal memuat data")})}const _={data:[],loading:!0,totalCount:0,page:1,search:"",filterJenis:"",editItem:null,deleteItem:null,isSubmitting:!1},Ae=10;function ws(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M5 14L6.6 9.2C6.8728 8.3816 7.6387 7.83 8.5014 7.83H15.4986C16.3613 7.83 17.1272 8.3816 17.4 9.2L19 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M4 14H20V17C20 18.1046 19.1046 19 18 19H6C4.89543 19 4 18.1046 4 17V14Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M7 16H7.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path>
            <path d="M17 16H17.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path>
        </svg>
    `}function Bs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Is(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function _s(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 13L11 22L2 13V4H11L20 13Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <circle cx="7.5" cy="8.5" r="1.5" fill="currentColor"></circle>
        </svg>
    `}function pt(e){const t=document.getElementById("mobil-submit-btn");_.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":_.editItem?"Perbarui":"Simpan")}function $s(e){return e==="Hiace"?"mobil-jenis-badge mobil-jenis-badge-hiace":"mobil-jenis-badge mobil-jenis-badge-reborn"}function Ss(){const e=document.getElementById("mobil-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="mobil-table-state">
                <div class="mobil-loading-inline">
                    <span class="mobil-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function Cs(){const e=document.getElementById("mobil-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="mobil-table-state mobil-empty-copy">
                Belum ada data mobil
            </td>
        </tr>
    `)}function Un(){const e=document.getElementById("mobil-table-body");if(e){if(_.loading){Ss();return}if(_.data.length===0){Cs();return}e.innerHTML=_.data.map((t,n)=>`
        <tr class="mobil-row" data-testid="mobil-row-${t.id}">
            <td class="mobil-index-cell">${(_.page-1)*Ae+n+1}</td>
            <td>
                <div class="mobil-code-cell">
                    <span class="mobil-code-avatar" aria-hidden="true">
                        ${ws()}
                    </span>
                    <span class="mobil-code-text">${u(t.kode_mobil)}</span>
                </div>
            </td>
            <td>
                <span class="${$s(t.jenis_mobil)}">
                    <span class="mobil-jenis-icon" aria-hidden="true">${_s()}</span>
                    <span>${u(t.jenis_mobil)}</span>
                </span>
            </td>
            <td>
                <div class="mobil-action-row">
                    <button
                        class="mobil-icon-button"
                        type="button"
                        data-mobil-edit="${t.id}"
                        data-testid="edit-mobil-${t.id}"
                        aria-label="Edit mobil ${u(t.kode_mobil)}"
                    >
                        ${Bs()}
                    </button>
                    <button
                        class="mobil-icon-button mobil-icon-button-danger"
                        type="button"
                        data-mobil-delete="${t.id}"
                        data-mobil-name="${u(t.kode_mobil)}"
                        data-testid="delete-mobil-${t.id}"
                        aria-label="Hapus mobil ${u(t.kode_mobil)}"
                    >
                        ${Is()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function Hn(){const e=document.getElementById("mobil-pagination-shell"),t=document.getElementById("mobil-pagination-info"),n=document.getElementById("mobil-pagination-page"),a=document.getElementById("mobil-prev-page-btn"),o=document.getElementById("mobil-next-page-btn"),r=Math.max(1,Math.ceil(_.totalCount/Ae));e&&(e.hidden=r<=1),t&&(t.textContent=ye(_.page,Ae,_.totalCount,_.data.length)),n&&(n.textContent=`${_.page} / ${r}`),a&&(a.disabled=_.page===1),o&&(o.disabled=_.page>=r)}async function ue(){_.loading=!0,Un(),Hn();try{const[e,t]=await Promise.all([E(`/mobil?page=${_.page}&limit=${Ae}${_.search?`&search=${encodeURIComponent(_.search)}`:""}${_.filterJenis?`&jenis=${encodeURIComponent(_.filterJenis)}`:""}`),E(`/mobil/count${_.search||_.filterJenis?"?":""}${[_.search?`search=${encodeURIComponent(_.search)}`:"",_.filterJenis?`jenis=${encodeURIComponent(_.filterJenis)}`:""].filter(Boolean).join("&")}`)]);_.data=Array.isArray(e)?e:[],_.totalCount=Number(t.count||0)}finally{_.loading=!1,Un(),Hn()}}function Fn(){const e=document.getElementById("mobil-form"),t=document.getElementById("mobil-form-title"),n=document.getElementById("mobil-form-description"),a=document.getElementById("mobil-id"),o=document.getElementById("mobil-kode"),r=document.getElementById("mobil-jenis"),s=document.getElementById("mobil-home-pool"),i=document.getElementById("mobil-is-active-in-trip");e?.reset(),a&&(a.value=""),o&&(o.value=""),r&&(r.value="Hiace"),s&&(s.value=""),i&&(i.checked=!0),t&&(t.textContent="Tambah Mobil Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan data mobil"),_.editItem=null,pt(!1)}function xs(e){const t=document.getElementById("mobil-form-title"),n=document.getElementById("mobil-form-description"),a=document.getElementById("mobil-id"),o=document.getElementById("mobil-kode"),r=document.getElementById("mobil-jenis"),s=document.getElementById("mobil-home-pool"),i=document.getElementById("mobil-is-active-in-trip");_.editItem=e,a&&(a.value=e.id),o&&(o.value=e.kode_mobil),r&&(r.value=e.jenis_mobil),s&&(s.value=e.home_pool??""),i&&(i.checked=e.is_active_in_trip!==!1),t&&(t.textContent="Edit Data Mobil"),n&&(n.textContent="Isi form di bawah untuk memperbarui data mobil"),pt(!1)}async function Ls(e){const t=await E(`/mobil/${e}`);xs(t),H("mobil-form-modal")}function Ts(e){const t=document.getElementById("mobil-delete-copy");_.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus mobil <strong>${u(e.kode_mobil)}</strong>? Tindakan ini tidak dapat dibatalkan.`),H("mobil-delete-modal")}function As(){const e=document.getElementById("mobil-add-btn"),t=document.getElementById("mobil-export-btn"),n=document.getElementById("mobil-search-input"),a=document.getElementById("mobil-filter-jenis"),o=document.getElementById("mobil-form"),r=document.getElementById("mobil-table-body"),s=document.getElementById("mobil-delete-confirm-btn"),i=document.getElementById("mobil-prev-page-btn"),c=document.getElementById("mobil-next-page-btn"),d=document.getElementById("mobil-kode");if(!(!e||!o||!r))return e.addEventListener("click",()=>{Fn(),H("mobil-form-modal")}),t?.addEventListener("click",()=>{an("/export/mobil/csv","mobil.csv").catch(()=>{v("Gagal mengunduh file")})}),n?.addEventListener("input",he(async l=>{_.search=l.target.value.trim(),_.page=1;try{await ue()}catch{v("Gagal memuat data")}})),a?.addEventListener("change",async l=>{_.filterJenis=l.target.value,_.page=1;try{await ue()}catch{v("Gagal memuat data")}}),d?.addEventListener("input",l=>{l.target.value=l.target.value.toUpperCase()}),o.addEventListener("submit",async l=>{l.preventDefault();const g=document.getElementById("mobil-home-pool")?.value||"",I={kode_mobil:document.getElementById("mobil-kode")?.value.trim().toUpperCase()||"",jenis_mobil:document.getElementById("mobil-jenis")?.value||"Hiace",home_pool:g===""?null:g,is_active_in_trip:document.getElementById("mobil-is-active-in-trip")?.checked??!0};pt(!0);try{_.editItem?(await E(`/mobil/${_.editItem.id}`,{method:"PUT",body:I}),F("Data mobil berhasil diperbarui")):(await E("/mobil",{method:"POST",body:I}),F("Mobil berhasil ditambahkan")),ee("mobil-form-modal"),Fn(),await ue()}catch(O){v(O.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{pt(!1)}}),r.addEventListener("click",async l=>{const g=l.target.closest("[data-mobil-edit]"),I=l.target.closest("[data-mobil-delete]");try{if(g){await Ls(g.dataset.mobilEdit);return}I&&Ts({id:I.dataset.mobilDelete,kode_mobil:I.dataset.mobilName})}catch{v("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(_.deleteItem)try{await E(`/mobil/${_.deleteItem.id}`,{method:"DELETE"}),F("Mobil berhasil dihapus"),ee("mobil-delete-modal"),(_.page-1)*Ae>=_.totalCount-1&&_.page>1&&(_.page-=1),_.deleteItem=null,await ue()}catch{v("Gagal menghapus data")}}),i?.addEventListener("click",async()=>{if(!(_.page<=1)){_.page-=1;try{await ue()}catch{v("Gagal memuat data")}}}),c?.addEventListener("click",async()=>{const l=Math.max(1,Math.ceil(_.totalCount/Ae));if(!(_.page>=l)){_.page+=1;try{await ue()}catch{v("Gagal memuat data")}}}),ue().catch(()=>{v("Gagal memuat data")})}const $={data:[],drivers:[],mobilList:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1},Fe=10,Gn={"05:30":"Subuh (05.30 WIB)","07:00":"Pagi (07.00 WIB)","09:00":"Pagi (09.00 WIB)","13:00":"Siang (13.00 WIB)","16:00":"Sore (16.00 WIB)","19:00":"Malam (19.00 WIB)"},Ct="07:00",Ms=["Reguler","Dropping","Rental"],ln="Reguler";function Rs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Ps(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function cn(e){return e==="Lunas"?"Lunas":"Belum Lunas"}function Vn(e){const t=cn(e);return`<span class="keberangkatan-payment-badge ${t==="Lunas"?"is-paid":"is-unpaid"}">${u(t)}</span>`}function Jn(e){return Gn[e]||Gn[Ct]}function gt(e){return Ms.includes(e)?e:ln}function Ds(){const e=Number(document.getElementById("keberangkatan-tarif-penumpang")?.value||0),t=Number(document.getElementById("keberangkatan-uang-paket")?.value||0),n=Number(document.getElementById("keberangkatan-jumlah-snack")?.value||0),a=Number(document.getElementById("keberangkatan-pengembalian-snack")?.value||0),o=Number(document.getElementById("keberangkatan-jumlah-air-mineral")?.value||0),r=e,s=r+t,i=s*.15,c=s*.85;return{jumlah_uang_penumpang:r,uang_paket:t,total:s,uang_pc:i,uang_bersih:c,jumlah_snack:n,pengembalian_snack:a,jumlah_air_mineral:o}}function un(){const e=Ds();Object.entries(e).forEach(([t,n])=>{const a=document.querySelector(`[data-calc="${t}"]`);if(a){if(t==="jumlah_snack"){a.textContent=`${q(n)} item`;return}if(t==="pengembalian_snack"){a.textContent=`${q(n)} item`;return}if(t==="jumlah_air_mineral"){a.textContent=`${q(n)} botol`;return}a.textContent=J(n)}})}function ft(e,t,n,a,o=""){const r=document.getElementById(e);if(!r)return;const s=e==="keberangkatan-kode-mobil"?"Pilih mobil":"Pilih driver";r.innerHTML=`
        <option value="">${s}</option>
        ${t.map(i=>`
            <option value="${i[n]}" ${String(i[n])===String(o)?"selected":""}>
                ${u(a(i))}
            </option>
        `).join("")}
    `}function bt(e){const t=document.getElementById("keberangkatan-submit-btn");$.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":$.editItem?"Perbarui":"Simpan")}function Os(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");e&&(e.innerHTML=`
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
        `))}function js(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");e&&(e.innerHTML=`
        <tr>
            <td colspan="18" class="keberangkatan-table-state keberangkatan-empty-copy">
                Belum ada data keberangkatan
            </td>
        </tr>
    `,t&&(t.hidden=!1,t.innerHTML=`
            <div class="keberangkatan-mobile-state keberangkatan-empty-copy">
                Belum ada data keberangkatan
            </div>
        `))}function zn(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");if(e){if($.loading){Os();return}if($.data.length===0){js();return}e.innerHTML=$.data.map(n=>`
        <tr class="keberangkatan-row" data-testid="keberangkatan-row-${n.id}">
            <td class="keberangkatan-hari-cell">${u(n.hari)}</td>
            <td>${u(n.tanggal)}</td>
            <td>${u(n.jam_keberangkatan_label||Jn(n.jam_keberangkatan))}</td>
            <td>${u(gt(n.tipe_layanan))}</td>
            <td>
                <span class="keberangkatan-kode-badge">${u(n.kode_mobil)}</span>
            </td>
            <td>${u(n.driver_nama)}</td>
            <td class="text-right">${q(n.jumlah_penumpang)}</td>
            <td class="text-right keberangkatan-money-cell">${J(n.jumlah_uang_penumpang)}</td>
            <td class="text-right">${q(n.jumlah_paket)}</td>
            <td class="text-right keberangkatan-money-cell">${J(n.uang_paket)}</td>
            <td class="text-right"><span class="keberangkatan-stock-badge">${q(n.jumlah_snack)}</span></td>
            <td class="text-right"><span class="keberangkatan-stock-badge keberangkatan-stock-badge-blue">${q(n.pengembalian_snack)}</span></td>
            <td class="text-right"><span class="keberangkatan-stock-badge keberangkatan-stock-badge-blue">${q(n.jumlah_air_mineral)}</span></td>
            <td class="text-right keberangkatan-money-cell keberangkatan-money-cell-amber">${J(n.uang_pc)}</td>
            <td class="text-right keberangkatan-money-cell keberangkatan-money-cell-emerald">${J(n.uang_bersih)}</td>
            <td class="text-center">${Vn(n.status_pembayaran)}</td>
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
                        aria-label="Edit data keberangkatan ${u(n.kode_mobil)}"
                    >
                        ${Rs()}
                    </button>
                    <button
                        class="keberangkatan-icon-button keberangkatan-icon-button-danger"
                        type="button"
                        data-keberangkatan-delete="${n.id}"
                        data-testid="delete-keberangkatan-${n.id}"
                        aria-label="Hapus data keberangkatan ${u(n.kode_mobil)}"
                    >
                        ${Ps()}
                    </button>
                </div>
            </td>
        </tr>
    `).join(""),t&&(t.hidden=!1,t.innerHTML=$.data.map(n=>`
            <article class="keberangkatan-mobile-card" data-testid="keberangkatan-card-${n.id}">
                <div class="keberangkatan-mobile-card-head">
                    <div>
                        <p class="keberangkatan-mobile-day">${u(n.hari)}</p>
                        <h3 class="keberangkatan-mobile-date">${u(n.tanggal)}</h3>
                        <p>${u(n.jam_keberangkatan_label||Jn(n.jam_keberangkatan))}</p>
                    </div>
                    <div class="keberangkatan-mobile-head-side">
                        <span class="keberangkatan-kode-badge">${u(n.kode_mobil)}</span>
                        <span class="keberangkatan-trip-badge">#${q(n.trip_ke)}</span>
                    </div>
                </div>

                <div class="keberangkatan-mobile-driver">
                    <span>Driver</span>
                    <strong>${u(n.driver_nama)}</strong>
                </div>

                <div class="keberangkatan-mobile-grid">
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-status">
                        <span>Validasi</span>
                        ${Vn(n.status_pembayaran)}
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Layanan</span>
                        <strong>${u(gt(n.tipe_layanan))}</strong>
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
        `).join(""))}}function Kn(){const e=document.getElementById("keberangkatan-pagination-shell"),t=document.getElementById("keberangkatan-pagination-info"),n=document.getElementById("keberangkatan-pagination-page"),a=document.getElementById("keberangkatan-prev-page-btn"),o=document.getElementById("keberangkatan-next-page-btn"),r=Math.max(1,Math.ceil($.totalCount/Fe));e&&(e.hidden=r<=1),t&&(t.textContent=ye($.page,Fe,$.totalCount,$.data.length)),n&&(n.textContent=`${$.page} / ${r}`),a&&(a.disabled=$.page===1),o&&(o.disabled=$.page>=r)}async function we(){$.loading=!0,zn(),Kn();try{const[e,t,n,a]=await Promise.all([E(`/keberangkatan?page=${$.page}&limit=${Fe}${$.search?`&search=${encodeURIComponent($.search)}`:""}`),E(`/keberangkatan/count${$.search?`?search=${encodeURIComponent($.search)}`:""}`),E("/drivers/all"),E("/mobil/all")]);$.data=Array.isArray(e)?e:[],$.totalCount=Number(t.count||0),$.drivers=Array.isArray(n)?n:[],$.mobilList=Array.isArray(a)?a:[]}finally{$.loading=!1,zn(),Kn()}}function Ja(){document.getElementById("keberangkatan-form")?.scrollTo({top:0,behavior:"auto"})}function Pt(){const e=document.getElementById("keberangkatan-form"),t=document.getElementById("keberangkatan-form-title"),n=document.getElementById("keberangkatan-form-description"),a=document.getElementById("keberangkatan-tanggal"),o=document.getElementById("keberangkatan-jam-keberangkatan"),r=document.getElementById("keberangkatan-trip-ke"),s=document.getElementById("keberangkatan-tipe-layanan"),i=document.getElementById("keberangkatan-jumlah-penumpang"),c=document.getElementById("keberangkatan-tarif-penumpang"),d=document.getElementById("keberangkatan-jumlah-paket"),l=document.getElementById("keberangkatan-uang-paket"),g=document.getElementById("keberangkatan-jumlah-snack"),I=document.getElementById("keberangkatan-pengembalian-snack"),O=document.getElementById("keberangkatan-jumlah-air-mineral"),b=document.getElementById("keberangkatan-status-pembayaran");e?.reset(),$.editItem=null,document.getElementById("keberangkatan-id").value="",t&&(t.textContent="Tambah Data Keberangkatan"),n&&(n.textContent="Isi form di bawah untuk menambahkan data keberangkatan"),a&&(a.value=Qe()),o&&(o.value=Ct),ft("keberangkatan-kode-mobil",$.mobilList,"kode_mobil",h=>`${h.kode_mobil} - ${h.jenis_mobil}`,$.mobilList[0]?.kode_mobil||""),ft("keberangkatan-driver-id",$.drivers,"id",h=>`${h.nama} - ${h.lokasi}`,$.drivers[0]?.id||""),r&&(r.value="1"),s&&(s.value=ln),i&&(i.value="0"),c&&(c.value="0"),d&&(d.value="0"),l&&(l.value="0"),g&&(g.value="0"),I&&(I.value="0"),O&&(O.value="0"),b&&(b.value="Belum Lunas"),bt(!1),un(),Ja()}async function Wn(e){const t=await E(`/keberangkatan/${e}`),n=document.getElementById("keberangkatan-form-title"),a=document.getElementById("keberangkatan-form-description");$.editItem=t,document.getElementById("keberangkatan-id").value=t.id,document.getElementById("keberangkatan-tanggal").value=t.tanggal,document.getElementById("keberangkatan-jam-keberangkatan").value=t.jam_keberangkatan||Ct,document.getElementById("keberangkatan-trip-ke").value=t.trip_ke,document.getElementById("keberangkatan-tipe-layanan").value=gt(t.tipe_layanan),document.getElementById("keberangkatan-jumlah-penumpang").value=t.jumlah_penumpang,document.getElementById("keberangkatan-tarif-penumpang").value=t.tarif_penumpang,document.getElementById("keberangkatan-jumlah-paket").value=t.jumlah_paket,document.getElementById("keberangkatan-uang-paket").value=t.uang_paket,document.getElementById("keberangkatan-jumlah-snack").value=t.jumlah_snack,document.getElementById("keberangkatan-pengembalian-snack").value=t.pengembalian_snack,document.getElementById("keberangkatan-jumlah-air-mineral").value=t.jumlah_air_mineral,document.getElementById("keberangkatan-status-pembayaran").value=cn(t.status_pembayaran),ft("keberangkatan-kode-mobil",$.mobilList,"kode_mobil",o=>`${o.kode_mobil} - ${o.jenis_mobil}`,t.kode_mobil),ft("keberangkatan-driver-id",$.drivers,"id",o=>`${o.nama} - ${o.lokasi}`,t.driver_id),n&&(n.textContent="Edit Data Keberangkatan"),a&&(a.textContent="Isi form di bawah untuk memperbarui data keberangkatan"),bt(!1),un(),Ja(),H("keberangkatan-form-modal")}function Xn(e){$.deleteItem=e,H("keberangkatan-delete-modal")}function qs(){const e=document.getElementById("keberangkatan-add-btn"),t=document.getElementById("keberangkatan-export-btn"),n=document.getElementById("keberangkatan-search-input"),a=document.getElementById("keberangkatan-form"),o=document.getElementById("keberangkatan-table-body"),r=document.getElementById("keberangkatan-mobile-list"),s=document.getElementById("keberangkatan-delete-confirm-btn"),i=document.getElementById("keberangkatan-prev-page-btn"),c=document.getElementById("keberangkatan-next-page-btn");if(!(!e||!a||!o))return e.addEventListener("click",()=>{Pt(),H("keberangkatan-form-modal")}),t?.addEventListener("click",()=>{an("/export/keberangkatan/csv","keberangkatan.csv").catch(()=>{v("Gagal mengunduh file")})}),n?.addEventListener("input",he(async d=>{$.search=d.target.value.trim(),$.page=1;try{await we()}catch{v("Gagal memuat data")}})),a.addEventListener("input",d=>{["keberangkatan-jumlah-penumpang","keberangkatan-tarif-penumpang","keberangkatan-uang-paket","keberangkatan-jumlah-snack","keberangkatan-pengembalian-snack","keberangkatan-jumlah-air-mineral"].includes(d.target.id)&&un()}),a.addEventListener("submit",async d=>{d.preventDefault();const l={tanggal:document.getElementById("keberangkatan-tanggal")?.value||"",jam_keberangkatan:document.getElementById("keberangkatan-jam-keberangkatan")?.value||Ct,tipe_layanan:gt(document.getElementById("keberangkatan-tipe-layanan")?.value||ln),kode_mobil:document.getElementById("keberangkatan-kode-mobil")?.value||"",driver_id:document.getElementById("keberangkatan-driver-id")?.value||"",jumlah_penumpang:Number(document.getElementById("keberangkatan-jumlah-penumpang")?.value||0),tarif_penumpang:Number(document.getElementById("keberangkatan-tarif-penumpang")?.value||0),jumlah_paket:Number(document.getElementById("keberangkatan-jumlah-paket")?.value||0),uang_paket:Number(document.getElementById("keberangkatan-uang-paket")?.value||0),jumlah_snack:Number(document.getElementById("keberangkatan-jumlah-snack")?.value||0),pengembalian_snack:Number(document.getElementById("keberangkatan-pengembalian-snack")?.value||0),jumlah_air_mineral:Number(document.getElementById("keberangkatan-jumlah-air-mineral")?.value||0),trip_ke:Number(document.getElementById("keberangkatan-trip-ke")?.value||1),status_pembayaran:cn(document.getElementById("keberangkatan-status-pembayaran")?.value||"")};bt(!0);try{$.editItem?(await E(`/keberangkatan/${$.editItem.id}`,{method:"PUT",body:l}),F("Data berhasil diperbarui")):(await E("/keberangkatan",{method:"POST",body:l}),F("Data berhasil ditambahkan")),ee("keberangkatan-form-modal"),Pt(),await we()}catch(g){v(g.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{bt(!1)}}),o.addEventListener("click",async d=>{const l=d.target.closest("[data-keberangkatan-edit]"),g=d.target.closest("[data-keberangkatan-delete]");try{if(l){await Wn(l.dataset.keberangkatanEdit);return}g&&Xn({id:g.dataset.keberangkatanDelete})}catch{v("Gagal memuat data")}}),r?.addEventListener("click",async d=>{const l=d.target.closest("[data-keberangkatan-edit]"),g=d.target.closest("[data-keberangkatan-delete]");try{if(l){await Wn(l.dataset.keberangkatanEdit);return}g&&Xn({id:g.dataset.keberangkatanDelete})}catch{v("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if($.deleteItem)try{await E(`/keberangkatan/${$.deleteItem.id}`,{method:"DELETE"}),F("Data berhasil dihapus"),ee("keberangkatan-delete-modal"),($.page-1)*Fe>=$.totalCount-1&&$.page>1&&($.page-=1),$.deleteItem=null,await we()}catch{v("Gagal menghapus data")}}),i?.addEventListener("click",async()=>{if(!($.page<=1)){$.page-=1;try{await we()}catch{v("Gagal memuat data")}}}),c?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil($.totalCount/Fe));if(!($.page>=d)){$.page+=1;try{await we()}catch{v("Gagal memuat data")}}}),we().then(()=>{Pt()}).catch(()=>{v("Gagal memuat data")})}const x={data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1,prices:{snack:0,air:0}},Ge=10;function Ns(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Us(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function kt(e){return Number(document.getElementById(e)?.value||0)}function ht(){const e=kt("stock-total-snack"),t=kt("stock-total-air"),n=e*x.prices.snack+t*x.prices.air,a=document.querySelector('[data-stock-calc="nilai_total"]'),o=document.getElementById("stock-snack-price-label"),r=document.getElementById("stock-air-price-label");o&&(o.textContent=J(x.prices.snack)),r&&(r.textContent=J(x.prices.air)),a&&(a.textContent=J(n))}function yt(e){const t=document.getElementById("stock-submit-btn");x.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":x.editItem?"Perbarui":"Simpan")}function Hs(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");e&&(e.innerHTML=`
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
        `))}function Fs(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");e&&(e.innerHTML=`
        <tr>
            <td colspan="14" class="stock-table-state stock-empty-copy">
                Belum ada data stok snack dan air mineral
            </td>
        </tr>
    `,t&&(t.hidden=!1,t.innerHTML=`
            <div class="stock-mobile-state stock-empty-copy">
                Belum ada data stok snack dan air mineral
            </div>
        `))}function Zn(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");if(e){if(x.loading){Hs();return}if(x.data.length===0){Fs();return}e.innerHTML=x.data.map(n=>`
        <tr class="stock-row" data-testid="stock-row-${n.id}">
            <td class="stock-day-cell">${u(n.hari)}</td>
            <td>${u(n.tanggal)}</td>
            <td>${u(n.bulan)}</td>
            <td class="text-right">${q(n.total_stock_snack_display??n.total_stock_snack)}</td>
            <td class="text-right">${q(n.total_stock_air_mineral)}</td>
            <td class="text-right">${q(n.pengembalian_snack)}</td>
            <td class="text-right">${q(n.terpakai_snack)}</td>
            <td class="text-right">${q(n.terpakai_air_mineral)}</td>
            <td class="text-right"><span class="stock-value-badge stock-value-badge-emerald">${q(n.sisa_stock_snack)}</span></td>
            <td class="text-right"><span class="stock-value-badge stock-value-badge-blue">${q(n.sisa_stock_air_mineral)}</span></td>
            <td class="text-right stock-money-cell">${J(n.nilai_total)}</td>
            <td class="text-right stock-money-cell stock-money-cell-emerald">${J(n.sisa_nilai_total)}</td>
            <td>${u(n.keterangan||"-")}</td>
            <td>
                <div class="stock-action-row">
                    <button
                        class="stock-icon-button"
                        type="button"
                        data-stock-edit="${n.id}"
                        data-testid="edit-stock-${n.id}"
                        aria-label="Edit data stok ${u(n.tanggal)}"
                    >
                        ${Ns()}
                    </button>
                    <button
                        class="stock-icon-button stock-icon-button-danger"
                        type="button"
                        data-stock-delete="${n.id}"
                        data-stock-date="${u(n.tanggal)}"
                        data-testid="delete-stock-${n.id}"
                        aria-label="Hapus data stok ${u(n.tanggal)}"
                    >
                        ${Us()}
                    </button>
                </div>
            </td>
        </tr>
    `).join(""),t&&(t.hidden=!1,t.innerHTML=x.data.map(n=>`
            <article class="stock-mobile-card" data-testid="stock-card-${n.id}">
                <div class="stock-mobile-card-head">
                    <div>
                        <p class="stock-mobile-day">${u(n.hari)}</p>
                        <h3 class="stock-mobile-date">${u(n.tanggal)}</h3>
                    </div>
                    <span class="stock-mobile-month">${u(n.bulan)}</span>
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
                        <strong>${u(n.keterangan||"-")}</strong>
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
                        data-stock-date="${u(n.tanggal)}"
                        data-testid="delete-stock-mobile-${n.id}"
                    >
                        Hapus
                    </button>
                </div>
            </article>
        `).join(""))}}function Qn(){const e=document.getElementById("stock-pagination-shell"),t=document.getElementById("stock-pagination-info"),n=document.getElementById("stock-pagination-page"),a=document.getElementById("stock-prev-page-btn"),o=document.getElementById("stock-next-page-btn"),r=Math.max(1,Math.ceil(x.totalCount/Ge));e&&(e.hidden=r<=1),t&&(t.textContent=ye(x.page,Ge,x.totalCount,x.data.length)),n&&(n.textContent=`${x.page} / ${r}`),a&&(a.disabled=x.page===1),o&&(o.disabled=x.page>=r)}async function Be(){x.loading=!0,Zn(),Qn();try{const[e,t]=await Promise.all([E(`/stock?page=${x.page}&limit=${Ge}${x.search?`&search=${encodeURIComponent(x.search)}`:""}`),E(`/stock/count${x.search?`?search=${encodeURIComponent(x.search)}`:""}`)]);x.data=Array.isArray(e)?e:[],x.totalCount=Number(t.count||0)}finally{x.loading=!1,Zn(),Qn()}}function Yn(){const e=document.getElementById("stock-form"),t=document.getElementById("stock-form-title"),n=document.getElementById("stock-form-description");e?.reset(),x.editItem=null,document.getElementById("stock-id").value="",document.getElementById("stock-tanggal").value=Qe(),document.getElementById("stock-total-snack").value="0",document.getElementById("stock-total-air").value="0",document.getElementById("stock-keterangan").value="",t&&(t.textContent="Tambah Stok Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan stok snack dan air mineral"),yt(!1),ht()}function Gs(e){const t=document.getElementById("stock-form-title"),n=document.getElementById("stock-form-description");x.editItem=e,document.getElementById("stock-id").value=e.id,document.getElementById("stock-tanggal").value=e.tanggal,document.getElementById("stock-total-snack").value=e.total_stock_snack,document.getElementById("stock-total-air").value=e.total_stock_air_mineral,document.getElementById("stock-keterangan").value=e.keterangan||"",t&&(t.textContent="Edit Data Stok"),n&&(n.textContent="Isi form di bawah untuk memperbarui stok snack dan air mineral"),yt(!1),ht()}async function ea(e){const t=await E(`/stock/${e}`);Gs(t),H("stock-form-modal")}function ta(e){const t=document.getElementById("stock-delete-copy");x.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus data stok tanggal <strong>${u(e.tanggal)}</strong>? Tindakan ini tidak dapat dibatalkan.`),H("stock-delete-modal")}function Vs(){const e=document.querySelector("[data-stock-page]"),t=document.getElementById("stock-add-btn"),n=document.getElementById("stock-search-input"),a=document.getElementById("stock-form"),o=document.getElementById("stock-table-body"),r=document.getElementById("stock-mobile-list"),s=document.getElementById("stock-delete-confirm-btn"),i=document.getElementById("stock-prev-page-btn"),c=document.getElementById("stock-next-page-btn");if(!(!e||!t||!a||!o))return x.prices.snack=Number(e.dataset.stockSnackPrice||0),x.prices.air=Number(e.dataset.stockAirPrice||0),ht(),t.addEventListener("click",()=>{Yn(),H("stock-form-modal")}),n?.addEventListener("input",he(async d=>{x.search=d.target.value.trim(),x.page=1;try{await Be()}catch{v("Gagal memuat data")}})),a.addEventListener("input",d=>{["stock-total-snack","stock-total-air"].includes(d.target.id)&&ht()}),a.addEventListener("submit",async d=>{d.preventDefault();const l={tanggal:document.getElementById("stock-tanggal")?.value||"",total_stock_snack:kt("stock-total-snack"),total_stock_air_mineral:kt("stock-total-air"),keterangan:document.getElementById("stock-keterangan")?.value.trim()||""};yt(!0);try{x.editItem?(await E(`/stock/${x.editItem.id}`,{method:"PUT",body:l}),F("Data stok berhasil diperbarui")):(await E("/stock",{method:"POST",body:l}),F("Data stok berhasil ditambahkan")),ee("stock-form-modal"),Yn(),await Be()}catch(g){v(g.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{yt(!1)}}),o.addEventListener("click",async d=>{const l=d.target.closest("[data-stock-edit]"),g=d.target.closest("[data-stock-delete]");try{if(l){await ea(l.dataset.stockEdit);return}g&&ta({id:g.dataset.stockDelete,tanggal:g.dataset.stockDate})}catch{v("Gagal memuat data")}}),r?.addEventListener("click",async d=>{const l=d.target.closest("[data-stock-edit]"),g=d.target.closest("[data-stock-delete]");try{if(l){await ea(l.dataset.stockEdit);return}g&&ta({id:g.dataset.stockDelete,tanggal:g.dataset.stockDate})}catch{v("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(x.deleteItem)try{await E(`/stock/${x.deleteItem.id}`,{method:"DELETE"}),F("Data stok berhasil dihapus"),ee("stock-delete-modal"),(x.page-1)*Ge>=x.totalCount-1&&x.page>1&&(x.page-=1),x.deleteItem=null,await Be()}catch{v("Gagal menghapus data")}}),i?.addEventListener("click",async()=>{if(!(x.page<=1)){x.page-=1;try{await Be()}catch{v("Gagal memuat data")}}}),c?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil(x.totalCount/Ge));if(!(x.page>=d)){x.page+=1;try{await Be()}catch{v("Gagal memuat data")}}}),Be().catch(()=>{v("Gagal memuat data")})}const Ve=10,L={currentUser:null,data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,defaultRole:"User"};function Js(e){return["Super Admin","Admin"].includes(e)}function zs(e){return e==="Super Admin"}function Ks(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function Ws(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M2.5 12C4.4 8.2 8 6 12 6C16 6 19.6 8.2 21.5 12C19.6 15.8 16 18 12 18C8 18 4.4 15.8 2.5 12Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function Xs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Zs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Qs(){return zs(L.currentUser?.role)?["Super Admin","Admin","User"]:["Admin","User"]}function vt(e){de(document.getElementById("admin-user-submit-btn"),e,"Menyimpan...")}function Ys(e){return e==="Super Admin"?"admin-users-role-badge admin-users-role-badge-super":e==="Admin"?"admin-users-role-badge admin-users-role-badge-admin":"admin-users-role-badge admin-users-role-badge-user"}function ei(){const e=document.getElementById("admin-users-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="6" class="admin-users-table-state">
                <div class="admin-users-loading-inline">
                    <span class="admin-users-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function za(e="Belum ada akun admin atau user."){const t=document.getElementById("admin-users-table-body");t&&(t.innerHTML=`
        <tr>
            <td colspan="6" class="admin-users-table-state admin-users-empty-copy">${u(e)}</td>
        </tr>
    `)}function na(){const e=document.getElementById("admin-users-table-body");if(e){if(L.loading){ei();return}if(L.data.length===0){za();return}e.innerHTML=L.data.map(t=>`
        <tr class="admin-users-row" data-testid="admin-user-row-${t.id}">
            <td>
                <div class="admin-users-name-cell">
                    <span class="admin-users-avatar" aria-hidden="true">${Ks()}</span>
                    <div>
                        <span class="admin-users-name">${u(t.nama)}</span>
                        <span class="admin-users-name-meta">${t.is_current_user?"Akun yang sedang login":"Akun dashboard aktif"}</span>
                    </div>
                </div>
            </td>
            <td><span class="admin-users-username">@${u(t.username)}</span></td>
            <td><span class="admin-users-email">${u(t.email)}</span></td>
            <td>
                <div class="admin-users-password-cell">
                    <span class="admin-users-password-mask">${u(t.password_mask)}</span>
                    <span class="admin-users-password-copy">Terenkripsi</span>
                </div>
            </td>
            <td><span class="${Ys(t.role)}">${u(t.role)}</span></td>
            <td>
                <div class="admin-users-action-row">
                    <button class="admin-users-icon-button" type="button" data-admin-user-show="${t.id}" data-testid="show-admin-user-${t.id}" aria-label="Lihat detail akun ${u(t.nama)}">
                        ${Ws()}
                    </button>
                    <button class="admin-users-icon-button" type="button" data-admin-user-edit="${t.id}" data-testid="edit-admin-user-${t.id}" aria-label="Edit akun ${u(t.nama)}" ${t.can_edit?"":"disabled"}>
                        ${Xs()}
                    </button>
                    <button class="admin-users-icon-button admin-users-icon-button-danger" type="button" data-admin-user-delete="${t.id}" data-admin-user-name="${u(t.nama)}" data-testid="delete-admin-user-${t.id}" aria-label="Hapus akun ${u(t.nama)}" ${t.can_delete?"":"disabled"}>
                        ${Zs()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function Jt(){const e=document.getElementById("admin-users-pagination-shell"),t=document.getElementById("admin-users-pagination-info"),n=document.getElementById("admin-users-pagination-page"),a=document.getElementById("admin-users-prev-page-btn"),o=document.getElementById("admin-users-next-page-btn"),r=Math.max(1,Math.ceil(L.totalCount/Ve));e&&(e.hidden=r<=1),t&&(t.textContent=ye(L.page,Ve,L.totalCount,L.data.length)),n&&(n.textContent=`${L.page} / ${r}`),a&&(a.disabled=L.page===1),o&&(o.disabled=L.page>=r)}async function Ie(){L.loading=!0,na(),Jt();try{const e=L.search?`?search=${encodeURIComponent(L.search)}`:"",t=`?page=${L.page}&limit=${Ve}${L.search?`&search=${encodeURIComponent(L.search)}`:""}`,[n,a]=await Promise.all([E(`/admin-users${t}`),E(`/admin-users/count${e}`)]);L.data=Array.isArray(n)?n:[],L.totalCount=Number(a.count||0)}finally{L.loading=!1,na(),Jt()}}function Ka(e="User"){const t=document.getElementById("admin-user-role");if(!t)return;const n=Qs(),a=n.includes(e)?e:n[0];t.innerHTML=n.map(o=>`
        <option value="${u(o)}" ${o===a?"selected":""}>${u(o)}</option>
    `).join("")}function Wa(e){const t=document.getElementById("admin-user-password"),n=document.getElementById("admin-user-password-note");t&&(t.required=!e,t.placeholder=e?"Kosongkan jika tidak ingin mengubah password":"Masukkan password",t.value=""),n&&(n.textContent=e?"Kosongkan password jika tidak ingin mengubah password akun ini.":"Password minimal 6 karakter dan akan disimpan dalam bentuk terenkripsi.")}function Dt(e="User"){const t=document.getElementById("admin-user-form"),n=document.getElementById("admin-user-form-title"),a=document.getElementById("admin-user-form-description"),o=document.getElementById("admin-user-id");t?.reset(),o&&(o.value=""),Ka(e),Wa(!1),n&&(n.textContent=e==="Admin"?"Tambah Admin Baru":"Tambah User Baru"),a&&(a.textContent=e==="Admin"?"Lengkapi data akun untuk menambahkan admin baru":"Lengkapi data akun untuk menambahkan user baru"),L.defaultRole=e,L.editItem=null,vt(!1)}function ti(e){L.editItem=e,document.getElementById("admin-user-id").value=e.id,document.getElementById("admin-user-nama").value=e.nama,document.getElementById("admin-user-username").value=e.username,document.getElementById("admin-user-email").value=e.email,Ka(e.role),Wa(!0),document.getElementById("admin-user-form-title").textContent="Edit Akun",document.getElementById("admin-user-form-description").textContent="Perbarui informasi akun admin atau user di bawah ini",vt(!1)}function ni(e){const t=document.getElementById("admin-user-detail-list");t&&(t.innerHTML=`
        <div class="admin-users-detail-item">
            <span>Nama</span>
            <strong>${u(e.nama)}</strong>
        </div>
        <div class="admin-users-detail-item">
            <span>Username</span>
            <strong>@${u(e.username)}</strong>
        </div>
        <div class="admin-users-detail-item">
            <span>Email</span>
            <strong>${u(e.email)}</strong>
        </div>
        <div class="admin-users-detail-item">
            <span>Password</span>
            <strong>${u(e.password_mask)}</strong>
            <p>${u(e.password_note)}</p>
        </div>
        <div class="admin-users-detail-item">
            <span>Role</span>
            <strong>${u(e.role)}</strong>
        </div>
        <div class="admin-users-detail-item">
            <span>Dibuat</span>
            <strong>${u(ns(e.created_at))}</strong>
        </div>
    `)}async function ai(e){ni(await E(`/admin-users/${e}`)),H("admin-user-show-modal")}async function oi(e){ti(await E(`/admin-users/${e}`)),H("admin-user-form-modal")}function ri(e){L.deleteItem=e,document.getElementById("admin-user-delete-copy").innerHTML=`Apakah Anda yakin ingin menghapus akun <strong>${u(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`,H("admin-user-delete-modal")}function aa(){const e=document.getElementById("admin-users-access-note"),t=document.getElementById("admin-users-search-input"),n=document.querySelector(".admin-users-page-actions");e&&(e.hidden=!1,e.textContent="Halaman ini hanya dapat diakses oleh Admin atau Super Admin."),t&&(t.disabled=!0),n&&(n.hidden=!0),L.loading=!1,L.data=[],L.totalCount=0,za("Anda tidak memiliki akses untuk mengelola data admin dan user."),Jt()}function si({user:e}={}){const t=document.getElementById("admin-users-add-admin-btn"),n=document.getElementById("admin-users-add-user-btn"),a=document.getElementById("admin-users-search-input"),o=document.getElementById("admin-user-form"),r=document.getElementById("admin-users-table-body"),s=document.getElementById("admin-user-delete-confirm-btn"),i=document.getElementById("admin-users-prev-page-btn"),c=document.getElementById("admin-users-next-page-btn");if(!(!t||!n||!o||!r)){if(L.currentUser=e||window.transitAuthUser||null,!Js(L.currentUser?.role)){aa();return}return t.addEventListener("click",()=>{Dt("Admin"),H("admin-user-form-modal")}),n.addEventListener("click",()=>{Dt("User"),H("admin-user-form-modal")}),a?.addEventListener("input",he(async d=>{L.search=d.target.value.trim(),L.page=1;try{await Ie()}catch(l){v(l.message||"Gagal memuat data akun")}})),o.addEventListener("submit",async d=>{d.preventDefault();const l={nama:document.getElementById("admin-user-nama")?.value.trim()||"",username:document.getElementById("admin-user-username")?.value.trim()||"",email:document.getElementById("admin-user-email")?.value.trim()||"",password:document.getElementById("admin-user-password")?.value||"",role:document.getElementById("admin-user-role")?.value||"User"};vt(!0);try{L.editItem?(await E(`/admin-users/${L.editItem.id}`,{method:"PUT",body:l}),F("Akun berhasil diperbarui")):(await E("/admin-users",{method:"POST",body:l}),F(l.role==="Admin"?"Admin berhasil ditambahkan":"User berhasil ditambahkan")),ee("admin-user-form-modal"),Dt(L.defaultRole),await Ie()}catch(g){v(g.message||"Silakan periksa kembali data yang diinput","Gagal menyimpan akun")}finally{vt(!1)}}),r.addEventListener("click",async d=>{const l=d.target.closest("[data-admin-user-show]"),g=d.target.closest("[data-admin-user-edit]"),I=d.target.closest("[data-admin-user-delete]");try{if(l){await ai(l.dataset.adminUserShow);return}if(g){await oi(g.dataset.adminUserEdit);return}I&&ri({id:I.dataset.adminUserDelete,nama:I.dataset.adminUserName})}catch(O){v(O.message||"Gagal memuat detail akun")}}),s?.addEventListener("click",async()=>{if(L.deleteItem)try{await E(`/admin-users/${L.deleteItem.id}`,{method:"DELETE"}),F("Akun berhasil dihapus"),ee("admin-user-delete-modal"),(L.page-1)*Ve>=L.totalCount-1&&L.page>1&&(L.page-=1),L.deleteItem=null,await Ie()}catch(d){v(d.message||"Gagal menghapus akun")}}),i?.addEventListener("click",async()=>{if(!(L.page<=1)){L.page-=1;try{await Ie()}catch(d){v(d.message||"Gagal memuat data akun")}}}),c?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil(L.totalCount/Ve));if(!(L.page>=d)){L.page+=1;try{await Ie()}catch(l){v(l.message||"Gagal memuat data akun")}}}),Ie().catch(d=>{if(d.status===403){aa();return}v(d.message||"Gagal memuat data akun")})}}const oa=[{value:"05:30",label:"Subuh",time:"05.30 WIB"},{value:"07:00",label:"Pagi",time:"07.00 WIB"},{value:"09:00",label:"Pagi",time:"09.00 WIB"},{value:"13:00",label:"Siang",time:"13.00 WIB"},{value:"16:00",label:"Sore",time:"16.00 WIB"},{value:"19:00",label:"Malam",time:"19.00 WIB"}],Xa=[[{code:"1A",label:"1A"},{code:"SOPIR",label:"SOPIR",isDriver:!0}],[{code:"2A",label:"2A"},{code:"3A",label:"3A"}],[{code:"4A",label:"4A"},{code:"5A",label:"5A"}]],ra=Xa.flat().filter(e=>!e.isDriver).length,p={currentUser:null,date:Qe(),direction:"from_pkb",bookings:[],loading:!1,drivers:[],mobils:[],formOptions:null,selectedSeats:[],passengerDraftMap:{},editItem:null,editPackageItem:null,deleteItem:null,slotDriverMap:{},slotMobilMap:{},occupiedSeatsForForm:[],occupiedSeatsForPackageForm:[],slotExtraArmadas:{},currentFormArmadaIndex:1,_pendingChoiceArmada:1,_pendingChoiceTime:""};function Ot(e){const t=document.getElementById(e);if(!t)return null;try{return JSON.parse(t.textContent||"{}")}catch{return null}}function ii(e){return["Super Admin","Admin"].includes(e)}function di(e){const t=e?"#dc2626":"#166534",n=e?"#991b1b":"#14532d";return`
        <svg viewBox="0 0 50 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="2" width="30" height="20" rx="8" fill="${t}" stroke="${n}" stroke-width="1.5"/>
            <rect x="5" y="18" width="40" height="28" rx="9" fill="${t}" stroke="${n}" stroke-width="1.5"/>
            <rect x="7" y="44" width="36" height="14" rx="7" fill="${t}" stroke="${n}" stroke-width="1.5" opacity="0.8"/>
            <rect x="2" y="22" width="5" height="18" rx="2.5" fill="${t}" opacity="0.6"/>
            <rect x="43" y="22" width="5" height="18" rx="2.5" fill="${t}" opacity="0.6"/>
        </svg>`}function li(){return`
        <svg viewBox="0 0 50 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="25" cy="30" r="18" stroke="rgba(148,163,184,0.5)" stroke-width="2.5"/>
            <circle cx="25" cy="30" r="6" fill="rgba(148,163,184,0.4)"/>
            <line x1="25" y1="12" x2="25" y2="24" stroke="rgba(148,163,184,0.5)" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="7" y1="30" x2="19" y2="30" stroke="rgba(148,163,184,0.5)" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="31" y1="30" x2="43" y2="30" stroke="rgba(148,163,184,0.5)" stroke-width="2.5" stroke-linecap="round"/>
        </svg>`}function ci(){return'<svg viewBox="0 0 24 24" fill="none"><path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path><path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg>'}function ui(){return'<svg viewBox="0 0 24 24" fill="none"><path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg>'}function sa(){return'<svg viewBox="0 0 24 24" fill="none" style="width:12px;height:12px;flex-shrink:0;"><path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'}function mi(){return'<svg viewBox="0 0 24 24" fill="none" style="width:12px;height:12px;flex-shrink:0;"><rect x="2" y="7" width="15" height="10" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M17 10H20L22 13V17H17V10Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="6" cy="18" r="1.5" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="18" r="1.5" stroke="currentColor" stroke-width="1.5"/></svg>'}function pi(){return'<svg viewBox="0 0 24 24" fill="none" style="width:12px;height:12px;flex-shrink:0;"><path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 2V8H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 13H16M8 17H13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'}function gi(e){return`
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
                    ${Xa.map(n=>`<div class="bpg-seat-row">${n.map(o=>{if(o.isDriver)return`
                    <div class="bpg-seat-item bpg-seat-driver" title="Sopir / Pengemudi">
                        <div class="bpg-seat-icon">${li()}</div>
                        <span class="bpg-seat-label">SOPIR</span>
                    </div>`;const r=e[o.code],s=!!r,i=s?"bpg-seat-occupied":"bpg-seat-available",c=s?u(r.nama_pemesanan||"-"):"";return`
                <div class="bpg-seat-item ${i}" title="${s?c:"Tersedia"}">
                    <div class="bpg-seat-icon">${di(s)}</div>
                    <span class="bpg-seat-label">${o.label}</span>
                    ${s?`<span class="bpg-seat-name">${c}</span>`:""}
                </div>`}).join("")}</div>`).join("")}
                </div>
            </div>
        </div>`}function fi(e){if(e.length===0)return`
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
            ${e.map(o=>{const r=o.selected_seats_label||"-",s=o.departure_status||"",i=n(s),c=t.map(d=>{const l=s===d.value;return`<button class="bpg-depart-opt ${d.cls}${l?" is-active":""}" type="button"
                data-departure-status="${u(d.value)}"
                data-booking-departure="${u(String(o.id))}">${u(d.label)}</button>`}).join("");return`
            <div class="bpg-passenger-item" data-booking-id="${u(String(o.id))}">
                <div class="bpg-passenger-item-row">
                    <div class="bpg-passenger-seats">
                        ${r.split(",").map(d=>`<span class="stock-value-badge stock-value-badge-blue">${u(d.trim())}</span>`).join("")}
                    </div>
                    <div class="bpg-passenger-info">
                        <span class="bpg-passenger-name">${u(o.nama_pemesanan||"-")}</span>
                        <span class="bpg-passenger-phone">${u(o.phone||"-")}</span>
                    </div>
                </div>
                <div class="bpg-passenger-item-actions-row">
                    <span class="${u(o.payment_status_badge_class||"stock-value-badge stock-value-badge-blue")} bpg-status-sm">${u(o.payment_status||"-")}</span>
                    <div class="bpg-depart-dropdown" data-depart-dropdown="${u(String(o.id))}">
                        <button class="bpg-depart-trigger ${i.cls}" type="button" data-depart-toggle="${u(String(o.id))}">
                            <svg viewBox="0 0 24 24" fill="none" style="width:11px;height:11px;flex-shrink:0;"><circle cx="12" cy="12" r="2.5" fill="currentColor"/><circle cx="12" cy="5" r="2" fill="currentColor"/><circle cx="12" cy="19" r="2" fill="currentColor"/></svg>
                            ${u(i.label)}
                            <svg viewBox="0 0 24 24" fill="none" style="width:10px;height:10px;flex-shrink:0;"><path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </button>
                        <div class="bpg-depart-menu" hidden>
                            ${c}
                        </div>
                    </div>
                    <div style="flex:1;"></div>
                    <button class="bpg-lihat-btn" type="button" data-booking-lihat="${u(String(o.id))}" aria-label="Lihat detail ${u(o.nama_pemesanan)}">
                        <svg viewBox="0 0 24 24" fill="none" style="width:13px;height:13px;"><path d="M2.5 12C4.4 8.2 8 6 12 6C16 6 19.6 8.2 21.5 12C19.6 15.8 16 18 12 18C8 18 4.4 15.8 2.5 12Z" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/></svg>
                        Lihat
                    </button>
                    <button class="admin-users-icon-button" type="button" data-booking-edit="${u(String(o.id))}" title="Edit pemesanan">
                        ${ci()}
                    </button>
                    <button class="admin-users-icon-button admin-users-icon-button-danger" type="button" data-booking-delete="${u(String(o.id))}" data-booking-name="${u(o.nama_pemesanan)}" title="Hapus pemesanan">
                        ${ui()}
                    </button>
                </div>
            </div>`}).join("")}
        </div>`}function bi(e){const t={};return e.forEach(n=>{(Array.isArray(n.selected_seats)?n.selected_seats:[]).forEach(o=>{t[o]||(t[o]=n)})}),t}function ki(e,t,n,a){const o=bi(n),r=n.reduce((f,j)=>f+(Number(j.passenger_count)||0),0),s=r>=ra,i=`${e.value}__${p.direction}__${t}`;if(!p.slotDriverMap[i]){const f=n.find(j=>j.driver_id);f&&(p.slotDriverMap[i]=f.driver_id)}const c=p.slotDriverMap[i]||"",d=p.slotMobilMap[i]||"",l=s?"stock-value-badge-red":"stock-value-badge-yellow",g=p.drivers.map(f=>{const j=f.lokasi?`${f.nama} (${f.lokasi})`:f.nama;return`<option value="${u(f.id)}" ${c===f.id?"selected":""}>${u(j)}</option>`}).join(""),I=p.mobils.map(f=>{const j=`${f.kode_mobil} — ${f.jenis_mobil}`;return`<option value="${u(f.id)}" ${d===f.id?"selected":""}>${u(j)}</option>`}).join(""),O=[...new Set(n.map(f=>(f.service_type||"").trim()).filter(Boolean))],b=a>1?`<span class="bpg-armada-badge">${mi()} Armada ${t}</span>`:"",h=s?`<button class="bpg-add-armada-btn" type="button"
                data-add-armada="${u(e.value)}"
                data-armada-index="${t}"
                title="Tambah armada ke-${t+1} untuk jadwal ${u(e.time)}">
                ${sa()}
                Tambah Armada
            </button>`:"";return`
        <article class="bpg-slot-card" data-slot="${u(e.value)}" data-direction="${u(p.direction)}" data-armada="${t}">
            <div class="bpg-slot-head">
                <div class="bpg-slot-head-row">
                    <div class="bpg-slot-time-badge">
                        <span class="bpg-slot-period">${u(e.label)}</span>
                        <strong class="bpg-slot-time">${u(e.time)}</strong>
                    </div>
                    <div class="bpg-slot-head-meta">
                        ${b}
                        <div class="bpg-slot-service-types">
                            ${O.length>0?O.map(f=>`<span class="bpg-service-badge">${u(f)}</span>`).join(""):'<span class="bpg-service-badge bpg-service-badge--empty">Belum ada layanan</span>'}
                        </div>
                        <span class="stock-value-badge ${l}">${r} / ${ra} Kursi</span>
                    </div>
                </div>
                ${h?`<div class="bpg-slot-head-row">${h}</div>`:""}
            </div>

            ${gi(o)}

            <div class="bpg-slot-assignment">
                <div class="bpg-slot-select-group">
                    <label>
                        <svg viewBox="0 0 24 24" fill="none" style="width:13px;height:13px;"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/><path d="M4 20C4 17.2386 7.58172 15 12 15C16.4183 15 20 17.2386 20 20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
                        Pilih Driver
                    </label>
                    <select class="bpg-slot-select" data-slot-driver="${u(e.value)}__${t}">
                        <option value="">— Belum ditentukan —</option>
                        ${g}
                    </select>
                </div>
                <div class="bpg-slot-select-group">
                    <label>
                        <svg viewBox="0 0 24 24" fill="none" style="width:13px;height:13px;"><rect x="2" y="7" width="20" height="10" rx="3" stroke="currentColor" stroke-width="1.8"/><circle cx="6" cy="17" r="2" stroke="currentColor" stroke-width="1.8"/><circle cx="18" cy="17" r="2" stroke="currentColor" stroke-width="1.8"/></svg>
                        Pilih Mobil
                    </label>
                    <select class="bpg-slot-select" data-slot-mobil="${u(e.value)}__${t}">
                        <option value="">— Belum ditentukan —</option>
                        ${I}
                    </select>
                </div>
            </div>

            ${fi(n)}

            <button class="bpg-slot-book-btn" type="button"
                data-slot-book="${u(e.value)}"
                data-slot-armada="${t}"
                title="Tambah pemesanan untuk Armada ${t}, jadwal ${u(e.time)}">
                ${sa()}
                Tambah Pemesanan Armada ${t}
            </button>
            <button class="bpg-surat-jalan-btn" type="button"
                data-surat-jalan="${u(e.value)}"
                data-surat-jalan-armada="${t}"
                title="Buat Surat Jalan Armada ${t}, jadwal ${u(e.time)}">
                ${pi()}
                Surat Jalan
            </button>
        </article>`}function hi(e,t){const n={};t.forEach(c=>{const d=c.armada_index||1;n[d]||(n[d]=[]),n[d].push(c)});const a=`${e.value}__${p.direction}`,o=t.length>0?Math.max(...Object.keys(n).map(Number)):1,r=p.slotExtraArmadas[a]||1,s=Math.max(o,r),i=[];for(let c=1;c<=s;c++)i.push(ki(e,c,n[c]||[],s));return`<div class="bpg-slot-group" data-slot-group="${u(e.value)}">${i.join("")}</div>`}function yi(){const e=document.getElementById("bpg-slots-shell");e&&(e.innerHTML=`
            <div class="admin-users-loading-inline" style="padding:40px 0;">
                <span class="admin-users-loading-inline-spinner" aria-hidden="true"></span>
                <span>Memuat data penumpang...</span>
            </div>`)}function Za(){const e=document.getElementById("bpg-slots-shell");if(!e)return;const t={};oa.forEach(a=>{t[a.value]=[]}),p.bookings.forEach(a=>{const r=(a.trip_time||"").trim().substring(0,5);t[r]&&t[r].push(a)});const n=oa.map(a=>hi(a,t[a.value]||[]));e.innerHTML=`<div class="bpg-slots-grid">${n.join("")}</div>`}async function _e(){p.loading=!0,yi();try{const e=new URLSearchParams({date:p.date,direction:p.direction,limit:200,page:1}),[t,n]=await Promise.all([E(`/bookings?${e}`),E(`/bookings/armada-extras?date=${p.date}`).catch(()=>({}))]);p.bookings=Array.isArray(t)?t:[],n&&typeof n=="object"&&Object.entries(n).forEach(([a,o])=>{const r=`${a}__${p.direction}`;p.slotExtraArmadas[r]=Math.max(p.slotExtraArmadas[r]||1,Number(o)||1)})}catch(e){p.bookings=[],e.status!==403&&v(e.message||"Gagal memuat data penumpang")}finally{p.loading=!1,Za()}}function ia(e){return{Aktif:"green",Selesai:"green",Dibayar:"green","Dibayar Tunai":"green",Draft:"gray","Belum Bayar":"orange","Menunggu Pembayaran":"blue","Menunggu Verifikasi":"blue","Menunggu Konfirmasi":"blue",Batal:"red",Reguler:"purple",Paket:"blue"}[e]||"gray"}function vi(e){document.getElementById("bpg-detail-title").textContent=e.nama_pemesanan||"-",document.getElementById("bpg-detail-subtitle").textContent=e.booking_code||"-",document.getElementById("bpg-detail-full-link").href=`/dashboard/bookings/${e.id}`;const t=e.category==="Paket",n=document.getElementById("bpg-detail-ticket-link"),a=document.getElementById("bpg-detail-surat-link");t?(n.hidden=!0,a.hidden=!1,a.href=`/dashboard/bookings/${e.id}/surat-bukti`):(n.hidden=!1,n.href=`/unduh/tiket-reguler/${e.booking_code}`,a.hidden=!0);const o=e.booking_status||"",r=e.payment_status||"",s=e.service_type||"",i=(e.pickup_location||"").trim()!=="",c=(e.dropoff_location||"").trim()!=="",d=document.getElementById("bpg-detail-body");d.innerHTML=`
        <!-- Status Badges -->
        <div class="bpg-dv-status-bar">
            ${o?`<span class="bpg-dv-badge bpg-dv-badge--${ia(o)}">${u(o)}</span>`:""}
            ${r?`<span class="bpg-dv-badge bpg-dv-badge--${ia(r)}">${u(r)}</span>`:""}
            ${s?`<span class="bpg-dv-badge bpg-dv-badge--purple">${u(s)}</span>`:""}
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
                        <span class="bpg-dv-route-city">${u(e.from_city||"-")}</span>
                        <span class="bpg-dv-route-arrow">→</span>
                        <span class="bpg-dv-route-city">${u(e.to_city||"-")}</span>
                    </div>
                </div>
                <div class="bpg-dv-row">
                    <div class="bpg-dv-label">Tanggal</div>
                    <div class="bpg-dv-value">${u(e.trip_date_label||"-")}</div>
                </div>
                <div class="bpg-dv-row">
                    <div class="bpg-dv-label">Waktu</div>
                    <div class="bpg-dv-value">${u(e.trip_time||"-")} WIB</div>
                </div>
                <div class="bpg-dv-row">
                    <div class="bpg-dv-label">Armada</div>
                    <div class="bpg-dv-value">Armada ${u(String(e.armada_index||1))}</div>
                </div>
                <div class="bpg-dv-row">
                    <div class="bpg-dv-label">Jenis Layanan</div>
                    <div class="bpg-dv-value">${u(s||"-")}</div>
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
                    <div class="bpg-dv-value">${u(e.nama_pemesanan||"-")}</div>
                </div>
                <div class="bpg-dv-row">
                    <div class="bpg-dv-label">No HP</div>
                    <div class="bpg-dv-value bpg-dv-value--mono">${u(e.phone||"-")}</div>
                </div>
                <div class="bpg-dv-row">
                    <div class="bpg-dv-label">Kursi</div>
                    <div class="bpg-dv-value">${u(e.selected_seats_label||"-")}</div>
                </div>
                <div class="bpg-dv-row">
                    <div class="bpg-dv-label">Jumlah Penumpang</div>
                    <div class="bpg-dv-value">${u(String(e.passenger_count||0))} Orang</div>
                </div>
            </div>
        </div>

        <!-- Alamat -->
        ${i||c?`
        <div class="bpg-dv-section">
            <div class="bpg-dv-section-head">
                <svg viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="9" r="2.5" stroke="currentColor" stroke-width="2"/></svg>
                <span class="bpg-dv-section-title">Alamat</span>
            </div>
            <div class="bpg-dv-rows">
                ${i?`
                <div class="bpg-dv-row bpg-dv-row--full">
                    <div class="bpg-dv-label">Alamat Penjemputan</div>
                    <div class="bpg-dv-value">${u(e.pickup_location)}</div>
                </div>`:""}
                ${c?`
                <div class="bpg-dv-row bpg-dv-row--full">
                    <div class="bpg-dv-label">Alamat Pengantaran</div>
                    <div class="bpg-dv-value">${u(e.dropoff_location)}</div>
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
                    <div class="bpg-dv-value bpg-dv-value--price">${u(e.total_amount_formatted||"-")}</div>
                </div>
            </div>
        </div>
    `,H("bpg-detail-modal")}function Ei(){return(p.formOptions?.seat_options||[]).map(e=>e.code)}function mn(e){const t=new Map(Ei().map((n,a)=>[n,a]));return Array.from(new Set((e||[]).map(n=>String(n).trim()).filter(n=>t.has(n)))).sort((n,a)=>(t.get(n)??999)-(t.get(a)??999))}function xt(){return Number(document.getElementById("booking-passenger-count")?.value||0)}function wi(){const e=xt();return(p.formOptions?.seat_options||[]).filter(t=>!t.is_optional||e>=6).map(t=>t.code)}function Bi(){return p.formOptions?.payment_status_options||[]}function Ii(e){return e==="transfer"?["Belum Bayar","Menunggu Pembayaran","Menunggu Verifikasi","Dibayar"]:e==="qris"?["Belum Bayar","Menunggu Pembayaran","Dibayar"]:e==="cash"?["Belum Bayar","Dibayar Tunai"]:["Belum Bayar"]}function _i(e){return e==="transfer"?"Menunggu Pembayaran":e==="qris"?"Dibayar":e==="cash"?"Dibayar Tunai":"Belum Bayar"}function $i(e){return e==="transfer"?"Menunggu Verifikasi Pembayaran":e==="qris"||e==="cash"?"Diproses":"Draft"}function Si(e,t){if(!e||!t||e===t)return null;const a=(p.formOptions?.route_matrix||{})?.[e]?.[t];return a==null?null:Number(a)}function Qa(){return Math.max(0,parseInt(document.getElementById("booking-additional-fare")?.value||"0",10)||0)}function Ce(){const e=document.getElementById("booking-from-city")?.value||"",t=document.getElementById("booking-to-city")?.value||"",n=xt(),a=Si(e,t),o=Qa(),r=a!==null?a+o:null,s=r!==null?r*n:null,i=document.getElementById("booking-price-per-seat"),c=document.getElementById("booking-total-amount");i&&(i.value=a!==null?J(a):""),c&&(c.value=s!==null?J(s):"")}function pn(){const e=document.getElementById("booking-payment-method")?.value||"",t=document.getElementById("booking-payment-status"),n=document.getElementById("booking-booking-status"),a=document.getElementById("booking-bank-account-group"),o=document.getElementById("booking-bank-account-code"),r=Ii(e),s=t?.value||"";a&&(a.hidden=e!=="transfer"),o&&e!=="transfer"&&(o.value=""),t&&(t.innerHTML=Bi().filter(i=>r.includes(i.value)).map(i=>`<option value="${u(i.value)}">${u(i.label)}</option>`).join(""),t.value=r.includes(s)?s:_i(e)),n&&(n.value=$i(e))}function Ci(){const e=document.getElementById("booking-selected-seats-inputs");e&&(e.innerHTML=p.selectedSeats.map(t=>`<input type="hidden" name="selected_seats[]" value="${u(t)}">`).join(""))}function xi(){const e=document.getElementById("booking-selected-seat-count"),t=document.getElementById("booking-selected-seat-label");e&&(e.textContent=String(p.selectedSeats.length)),t&&(t.textContent=p.selectedSeats.length>0?p.selectedSeats.join(", "):"Belum dipilih")}function zt(){document.querySelectorAll("[data-passenger-seat]").forEach(e=>{const t=e.dataset.passengerSeat;t&&(p.passengerDraftMap[t]={seat_no:t,name:e.querySelector("[data-passenger-name]")?.value.trim()||"",phone:e.querySelector("[data-passenger-phone]")?.value.trim()||""})})}function me(e=null){const t=document.getElementById("booking-passenger-editor");if(t){if(e&&(p.passengerDraftMap=Object.fromEntries(e.map(n=>[n.seat_no,n]))),p.selectedSeats.length===0){t.innerHTML='<div class="dashboard-empty-state dashboard-empty-state--block bookings-passenger-empty">Pilih kursi terlebih dahulu untuk menampilkan form data penumpang.</div>';return}t.innerHTML=`
        <div class="bookings-passenger-grid bookings-passenger-grid--editor">
            ${p.selectedSeats.map((n,a)=>{const o=p.passengerDraftMap[n]||{name:"",phone:""};return`
                    <article class="bookings-passenger-card bookings-passenger-card--editor" data-passenger-seat="${u(n)}">
                        <div class="bookings-passenger-form-head">
                            <span class="stock-value-badge stock-value-badge-blue">${u(n)}</span>
                            <strong>Penumpang ${a+1}</strong>
                            <p>${a===0?"Menjadi nama pemesanan utama.":"Data penumpang tambahan."}</p>
                        </div>
                        <div class="bookings-passenger-form-grid">
                            <div class="admin-users-form-group">
                                <label>Nama</label>
                                <div class="admin-users-input-shell">
                                    <input type="text" value="${u(o.name||"")}" placeholder="Masukkan nama penumpang" data-passenger-name>
                                </div>
                            </div>
                            <div class="admin-users-form-group">
                                <label>No HP</label>
                                <div class="admin-users-input-shell">
                                    <input type="text" value="${u(o.phone||"")}" placeholder="08xxxxxxxxxx" data-passenger-phone>
                                </div>
                            </div>
                        </div>
                    </article>`}).join("")}
        </div>`}}async function Ne(){const e=document.getElementById("booking-trip-date")?.value||"",t=document.getElementById("booking-trip-time")?.value||"",n=document.getElementById("booking-from-city")?.value||"",a=document.getElementById("booking-to-city")?.value||"",o=p.editItem?.id||"",r=p.currentFormArmadaIndex||1;if(!e||!t){p.occupiedSeatsForForm=[];return}try{const s=new URLSearchParams({trip_date:e,trip_time:t,armada_index:r});n&&s.set("from_city",n),a&&s.set("to_city",a),o&&s.set("exclude_id",o);const i=await E(`/bookings/occupied-seats?${s}`);p.occupiedSeatsForForm=Array.isArray(i?.occupied_seats)?i.occupied_seats:[]}catch{p.occupiedSeatsForForm=[]}}async function $e(){const e=document.getElementById("pkg-trip-date")?.value||"",t=document.getElementById("pkg-trip-time")?.value||"",n=document.getElementById("pkg-from-city")?.value||"",a=document.getElementById("pkg-to-city")?.value||"",o=parseInt(document.getElementById("package-armada-index")?.value||"1",10);if(!e||!t){p.occupiedSeatsForPackageForm=[],da();return}try{const r=new URLSearchParams({trip_date:e,trip_time:t,armada_index:o});n&&r.set("from_city",n),a&&r.set("to_city",a);const s=await E(`/bookings/occupied-seats?${r}`);p.occupiedSeatsForPackageForm=Array.isArray(s?.occupied_seats)?s.occupied_seats:[]}catch{p.occupiedSeatsForPackageForm=[]}da()}function da(){const e=document.getElementById("pkg-seat-code");if(!e)return;const t=(p.formOptions?.seat_options||[]).filter(o=>!o.is_optional),n=p.occupiedSeatsForPackageForm||[],a=e.value;e.innerHTML='<option value="">Pilih kursi</option>'+t.map(o=>{const r=n.includes(o.code);return`<option value="${u(o.code)}"${r?" disabled":""}>${u(o.label)}${r?" — Sudah dipesan":""}</option>`}).join(""),a&&!n.includes(a)&&(e.value=a)}function pe(){const e=document.querySelectorAll("[data-seat-code]"),t=xt(),n=wi();p.selectedSeats=mn(p.selectedSeats.filter(a=>n.includes(a)&&!p.occupiedSeatsForForm.includes(a))),e.forEach(a=>{const o=a.dataset.seatCode,r=n.includes(o),s=p.occupiedSeatsForForm.includes(o),i=p.selectedSeats.includes(o),c=p.selectedSeats.length>=t&&!i;a.hidden=!r,a.classList.toggle("is-selected",i),a.classList.toggle("is-occupied",s),a.classList.toggle("is-disabled",!s&&c),a.disabled=!r||s||!i&&c,s?a.title="Kursi sudah dipesan":a.title=""}),Ci(),xi()}function jt(e=1,t=""){document.getElementById("booking-form")?.reset(),p.editItem=null,p.selectedSeats=[],p.passengerDraftMap={},p.currentFormArmadaIndex=e;const a=p.date||Qe();document.getElementById("booking-id").value="",document.getElementById("booking-armada-index").value=String(e),document.getElementById("booking-form-title").textContent="Tambah Pemesanan";const o=e>1?` (Armada ${e})`:"";document.getElementById("booking-form-description").textContent=`Lengkapi data pemesanan reguler dari dashboard admin${o}.`,document.getElementById("booking-trip-date").value=a,document.getElementById("booking-trip-time").value=t||"";const r=document.getElementById("booking-from-city"),s=document.getElementById("booking-to-city");r&&(r.value=""),s&&(s.value=""),document.getElementById("booking-passenger-count").value="1",document.getElementById("booking-additional-fare").value="0",document.getElementById("booking-payment-method").value="",document.getElementById("booking-booking-status").value="Draft",pn(),Ce(),de(document.getElementById("booking-submit-btn"),!1,"Menyimpan..."),Ne().then(()=>{pe(),me()})}function Li(e){p.editItem=e,p.selectedSeats=mn(e.selected_seats||[]),p.passengerDraftMap=Object.fromEntries((e.passengers||[]).map(n=>[n.seat_no,n])),p.currentFormArmadaIndex=e.armada_index||1,document.getElementById("booking-id").value=e.id,document.getElementById("booking-armada-index").value=String(e.armada_index||1),document.getElementById("booking-booking-for").value=e.booking_for,document.getElementById("booking-category").value=e.category,document.getElementById("booking-from-city").value=e.from_city,document.getElementById("booking-to-city").value=e.to_city,document.getElementById("booking-trip-date").value=e.trip_date_value,document.getElementById("booking-trip-time").value=e.trip_time_value,document.getElementById("booking-passenger-count").value=String(e.passenger_count),document.getElementById("booking-driver-name").value=e.driver_name==="Menunggu Penetapan Driver"?"":e.driver_name||"",document.getElementById("booking-additional-fare").value=String(e.additional_fare_per_passenger||0),document.getElementById("booking-pickup-location").value=e.pickup_location,document.getElementById("booking-dropoff-location").value=e.dropoff_location,document.getElementById("booking-payment-method").value=e.payment_method_value||"",pn(),document.getElementById("booking-payment-status").value=e.payment_status,document.getElementById("booking-booking-status").value=e.booking_status,document.getElementById("booking-bank-account-code").value=e.bank_account_code||"",document.getElementById("booking-notes").value=e.notes||"";const t=(e.armada_index||1)>1?` (Armada ${e.armada_index})`:"";document.getElementById("booking-form-title").textContent="Edit Pemesanan",document.getElementById("booking-form-description").textContent=`Perbarui data pemesanan reguler yang dipilih${t}.`,Ce(),de(document.getElementById("booking-submit-btn"),!1,"Menyimpan..."),Ne().then(()=>{pe(),me(e.passengers||[])})}function Ti(){return zt(),{booking_for:document.getElementById("booking-booking-for")?.value||"",category:document.getElementById("booking-category")?.value||"Reguler",from_city:document.getElementById("booking-from-city")?.value||"",to_city:document.getElementById("booking-to-city")?.value||"",trip_date:document.getElementById("booking-trip-date")?.value||"",trip_time:document.getElementById("booking-trip-time")?.value||"",passenger_count:Number(document.getElementById("booking-passenger-count")?.value||0),driver_name:document.getElementById("booking-driver-name")?.value.trim()||"",additional_fare_per_passenger:Qa(),pickup_location:document.getElementById("booking-pickup-location")?.value.trim()||"",dropoff_location:document.getElementById("booking-dropoff-location")?.value.trim()||"",selected_seats:p.selectedSeats,passengers:p.selectedSeats.map(e=>({seat_no:e,name:p.passengerDraftMap?.[e]?.name||"",phone:p.passengerDraftMap?.[e]?.phone||""})),payment_method:document.getElementById("booking-payment-method")?.value||"",payment_status:document.getElementById("booking-payment-status")?.value||"Belum Bayar",booking_status:document.getElementById("booking-booking-status")?.value||"Draft",bank_account_code:document.getElementById("booking-bank-account-code")?.value||"",notes:document.getElementById("booking-notes")?.value.trim()||"",armada_index:p.currentFormArmadaIndex||1}}let Kt=null;async function Ai(e){const t=await E(`/bookings/${e}`);t.category==="Paket"&&Kt?(Kt(t),H("package-form-modal")):(Li(t),H("booking-form-modal"))}function Mi(e){p.deleteItem=e,document.getElementById("booking-delete-copy").innerHTML=`Apakah Anda yakin ingin menghapus data pemesanan <strong>${u(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`,H("booking-delete-modal")}function la(){const e=document.getElementById("bookings-access-note"),t=document.getElementById("bpg-route-tabs"),n=document.getElementById("bpg-slots-shell");e&&(e.hidden=!1),t&&(t.hidden=!0),n&&(n.hidden=!0)}function Ri(e){return e==="Berangkat"?{label:"Berangkat",cls:"bpg-depart-trigger--go"}:e==="Tidak Berangkat"?{label:"Tidak Berangkat",cls:"bpg-depart-trigger--no"}:e==="Di Oper"?{label:"Di Oper",cls:"bpg-depart-trigger--oper"}:{label:"Status",cls:""}}function Pi({user:e}={}){const t=document.getElementById("bookings-add-btn"),n=document.getElementById("bookings-date-picker"),a=document.getElementById("bpg-route-tabs"),o=document.getElementById("bpg-slots-shell"),r=document.getElementById("booking-form"),s=document.getElementById("booking-delete-confirm-btn"),i=document.getElementById("booking-seat-grid"),c=document.getElementById("booking-passenger-editor"),d=document.getElementById("booking-payment-method");if(p.formOptions=Ot("bookings-form-options"),p.drivers=Ot("bookings-drivers-data")||[],p.mobils=Ot("bookings-mobils-data")||[],p.currentUser=e||window.transitAuthUser||null,p.date=Qe(),!ii(p.currentUser?.role)){la();return}const l=document.getElementById("bpg-route-tabs");l&&(l.hidden=!1),o&&(o.hidden=!1);const g=document.getElementById("bookings-access-note");g&&(g.hidden=!0),n&&(n.value=p.date,n.addEventListener("change",async()=>{p.date=n.value,p.slotDriverMap={},p.slotMobilMap={},p.slotExtraArmadas={},await _e()})),a?.addEventListener("click",async k=>{const y=k.target.closest("[data-direction]");if(!y)return;const B=y.dataset.direction;B!==p.direction&&(p.direction=B,p.slotDriverMap={},p.slotMobilMap={},p.slotExtraArmadas={},document.querySelectorAll(".bpg-route-tab").forEach(P=>{P.classList.toggle("is-active",P.dataset.direction===B)}),await _e())});function I(k=null){o?.querySelectorAll("[data-depart-dropdown]").forEach(y=>{String(y.dataset.departDropdown)!==String(k)&&(y.querySelector(".bpg-depart-menu")?.removeAttribute("hidden"),y.querySelector(".bpg-depart-menu")?.setAttribute("hidden",""))})}document.addEventListener("click",k=>{k.target.closest("[data-depart-dropdown]")||I()}),o?.addEventListener("click",async k=>{const y=k.target.closest("[data-depart-toggle]"),B=k.target.closest("[data-booking-departure]"),P=k.target.closest("[data-booking-lihat]"),C=k.target.closest("[data-booking-edit]"),N=k.target.closest("[data-booking-delete]"),G=k.target.closest("[data-add-armada]"),z=k.target.closest("[data-slot-book]"),K=k.target.closest("[data-surat-jalan]");try{if(y){const R=y.dataset.departToggle,A=o.querySelector(`[data-depart-dropdown="${CSS.escape(R)}"]`)?.querySelector(".bpg-depart-menu");if(!A)return;const U=A.hasAttribute("hidden");I(R),A.toggleAttribute("hidden",!U);return}if(B){const R=B.dataset.bookingDeparture,w=B.dataset.departureStatus,A=p.bookings.find(X=>String(X.id)===String(R));if(!A)return;const U=A.departure_status===w?"":w;A.departure_status=U;const te=o.querySelector(`[data-depart-dropdown="${CSS.escape(R)}"]`);if(te){const X=te.querySelector(".bpg-depart-trigger"),Z=Ri(U);X.className=`bpg-depart-trigger ${Z.cls}`,X.childNodes.forEach(Q=>{Q.nodeType===3&&(Q.textContent=Z.label)}),te.querySelectorAll("[data-booking-departure]").forEach(Q=>{Q.classList.toggle("is-active",Q.dataset.departureStatus===U)}),te.querySelector(".bpg-depart-menu")?.setAttribute("hidden","")}const W=p.bookings.find(X=>String(X.id)===String(R));await E(`/bookings/${R}/departure-status`,{method:"PATCH",body:{departure_status:U,version:W?.version??0}});return}if(P){const R=P.dataset.bookingLihat,w=p.bookings.find(A=>String(A.id)===String(R));w&&vi(w);return}if(C){await Ai(C.dataset.bookingEdit);return}if(N){const R=N.dataset.bookingDelete,w=p.bookings.find(A=>String(A.id)===String(R));Mi({id:R,nama:N.dataset.bookingName,version:w?.version??0});return}if(G){const R=G.dataset.addArmada,A=parseInt(G.dataset.armadaIndex||"1")+1,U=`${R}__${p.direction}`;p.slotExtraArmadas[U]=Math.max(p.slotExtraArmadas[U]||1,A),E("/bookings/armada-extras",{method:"POST",body:{trip_date:p.date,trip_time:R,armada_index:A}}).catch(()=>{}),Za(),p._pendingChoiceArmada=A,p._pendingChoiceTime=R,H("booking-type-choice-modal");return}if(z){const R=z.dataset.slotBook,w=parseInt(z.dataset.slotArmada||"1");p._pendingChoiceArmada=w,p._pendingChoiceTime=R,H("booking-type-choice-modal");return}if(K){const R=K.dataset.suratJalan,w=parseInt(K.dataset.suratJalanArmada||"1"),A=`${R}__${p.direction}__${w}`,U=p.slotDriverMap[A]||"",te=p.slotMobilMap[A]||"",W=U?p.drivers.find(Q=>String(Q.id)===String(U)):null,X=te?p.mobils.find(Q=>String(Q.id)===String(te)):null,Z=new URLSearchParams({date:p.date,trip_time:R,armada_index:String(w),direction:p.direction});W&&Z.set("driver_name",W.nama),X&&Z.set("no_pol",X.kode_mobil),window.open(`/dashboard/bookings/surat-jalan?${Z}`,"_blank");return}}catch(R){if(tt(R))return;v(R.message||"Gagal memuat data pemesanan")}}),o?.addEventListener("change",async k=>{const y=k.target.closest("[data-slot-driver]"),B=k.target.closest("[data-slot-mobil]");if(y){const[P,C]=y.dataset.slotDriver.split("__"),N=parseInt(C||"1"),G=y.value,z=y.options[y.selectedIndex],K=G&&z?.text.split(" (")[0]||"",R=`${P}__${p.direction}__${N}`;p.slotDriverMap[R]=G;try{await E("/bookings/slot-assign",{method:"PATCH",body:{trip_date:p.date,trip_time:P,direction:p.direction,armada_index:N,driver_id:G||null,driver_name:K}}),F("Driver berhasil diperbarui")}catch(w){v(w.message||"Gagal memperbarui driver")}}if(B){const[P,C]=B.dataset.slotMobil.split("__"),N=parseInt(C||"1"),G=B.value,z=`${P}__${p.direction}__${N}`;p.slotMobilMap[z]=G}});function O(k=1,y=""){p.editPackageItem=null;const B=document.getElementById("package-form");B&&B.reset();const P=document.getElementById("package-armada-index");P&&(P.value=String(k));const C=document.getElementById("pkg-trip-date");C&&(C.value=p.date);const N=document.getElementById("pkg-trip-time");N&&y&&(N.value=y);const G=document.getElementById("pkg-bank-account-group");G&&(G.hidden=!0);const z=document.getElementById("pkg-seat-group");z&&(z.hidden=!0);const K=document.getElementById("package-form-success-banner");K&&(K.hidden=!0);const R=document.querySelector("#package-form-modal .admin-users-dialog-head h3");R&&(R.textContent="Pengirim Paket");const w=document.getElementById("package-form-description");w&&(w.textContent="Lengkapi data pengiriman paket. Surat Bukti Pengiriman tersedia setelah disimpan."),h(),$e()}function b(k){let y={};try{y=k.notes?JSON.parse(k.notes):{}}catch(Q){console.warn("Failed to parse package notes JSON:",Q),y={}}p.editPackageItem={id:k.id,booking_code:k.booking_code,version:k.version||0};const B=document.getElementById("package-form");B&&B.reset();const P=document.getElementById("package-armada-index");P&&(P.value=String(k.armada_index||1));const C=(Q,Pe)=>{const se=document.getElementById(Q);se&&(se.value=Pe)};C("pkg-trip-date",k.trip_date_value||k.trip_date||""),C("pkg-trip-time",k.trip_time_value||k.trip_time||""),C("pkg-from-city",k.from_city||""),C("pkg-to-city",k.to_city||""),C("pkg-sender-name",k.nama_pemesanan||""),C("pkg-sender-phone",k.phone||""),C("pkg-sender-address",k.pickup_location||""),C("pkg-recipient-name",y.recipient_name||""),C("pkg-recipient-phone",y.recipient_phone||""),C("pkg-recipient-address",k.dropoff_location||""),C("pkg-item-name",y.item_name||""),C("pkg-item-qty",String(y.item_qty||k.passenger_count||1));const N=y.package_size||k.booking_for||"Kecil";C("pkg-package-size",N);const G=Array.isArray(k.selected_seats)&&k.selected_seats.length>0?k.selected_seats[0]:"";C("pkg-seat-code",G);const z=document.getElementById("pkg-seat-group");z&&(z.hidden=N!=="Besar"),C("pkg-fare-amount",String(k.price_per_seat||0));const K=Math.max(1,parseInt(y.item_qty||k.passenger_count||1,10)),R=parseInt(k.price_per_seat||0,10)||0,w=parseInt(k.total_amount||0,10)||0,A=Math.max(0,Math.round(w/K)-R);C("pkg-additional-fare",String(A));const U=k.payment_method_value||"";C("pkg-payment-method",U),C("pkg-payment-status",k.payment_status||"Belum Bayar"),C("pkg-bank-account-code",k.bank_account_code||"");const te=document.getElementById("pkg-bank-account-group");te&&(te.hidden=U!=="transfer");const W=document.getElementById("package-form-success-banner");W&&(W.hidden=!0);const X=document.querySelector("#package-form-modal .admin-users-dialog-head h3");X&&(X.textContent="Edit Pengiriman Paket");const Z=document.getElementById("package-form-description");Z&&(Z.textContent=`Perbarui data pengiriman paket untuk booking ${k.booking_code||""}.`),h(),$e()}Kt=b;function h(){const k=parseInt(document.getElementById("pkg-fare-amount")?.value||"0",10)||0,y=parseInt(document.getElementById("pkg-additional-fare")?.value||"0",10)||0,B=parseInt(document.getElementById("pkg-item-qty")?.value||"1",10)||1,P=(k+y)*B,C=document.getElementById("pkg-total-display");C&&(C.value=P>0?"Rp "+P.toLocaleString("id-ID"):"")}document.getElementById("pkg-fare-amount")?.addEventListener("input",h),document.getElementById("pkg-additional-fare")?.addEventListener("input",h),document.getElementById("pkg-item-qty")?.addEventListener("input",h),document.getElementById("pkg-payment-method")?.addEventListener("change",k=>{const y=document.getElementById("pkg-bank-account-group");y&&(y.hidden=k.target.value!=="transfer")}),document.getElementById("pkg-package-size")?.addEventListener("change",k=>{const y=document.getElementById("pkg-seat-group");y&&(y.hidden=k.target.value!=="Besar");const B=document.getElementById("pkg-seat-code");B&&k.target.value!=="Besar"&&(B.value="")}),document.getElementById("pkg-trip-date")?.addEventListener("change",()=>{$e()}),document.getElementById("pkg-trip-time")?.addEventListener("change",()=>{$e()}),document.getElementById("pkg-from-city")?.addEventListener("change",()=>{$e()}),document.getElementById("pkg-to-city")?.addEventListener("change",()=>{$e()}),document.getElementById("package-form")?.addEventListener("submit",async k=>{k.preventDefault();const y=document.getElementById("package-submit-btn");de(y,!0,"Menyimpan...");try{const B=parseInt(document.getElementById("pkg-fare-amount")?.value||"0",10)||0,P=parseInt(document.getElementById("pkg-additional-fare")?.value||"0",10)||0,C=parseInt(document.getElementById("pkg-item-qty")?.value||"1",10)||1,N=document.getElementById("pkg-payment-method")?.value||"",G={armada_index:parseInt(document.getElementById("package-armada-index")?.value||"1",10),trip_date:document.getElementById("pkg-trip-date")?.value||"",trip_time:document.getElementById("pkg-trip-time")?.value||"",from_city:document.getElementById("pkg-from-city")?.value||"",to_city:document.getElementById("pkg-to-city")?.value||"",sender_name:document.getElementById("pkg-sender-name")?.value.trim()||"",sender_phone:document.getElementById("pkg-sender-phone")?.value.trim()||"",sender_address:document.getElementById("pkg-sender-address")?.value.trim()||"",recipient_name:document.getElementById("pkg-recipient-name")?.value.trim()||"",recipient_phone:document.getElementById("pkg-recipient-phone")?.value.trim()||"",recipient_address:document.getElementById("pkg-recipient-address")?.value.trim()||"",item_name:document.getElementById("pkg-item-name")?.value.trim()||"",item_qty:C,package_size:document.getElementById("pkg-package-size")?.value||"",seat_code:document.getElementById("pkg-package-size")?.value==="Besar"&&document.getElementById("pkg-seat-code")?.value||"",fare_amount:B,additional_fare:P,payment_method:N||null,payment_status:document.getElementById("pkg-payment-status")?.value||"Belum Bayar",bank_account_code:N==="transfer"&&document.getElementById("pkg-bank-account-code")?.value||""},z=!!p.editPackageItem;let K;z?(G.version=p.editPackageItem.version,K=await E(`/bookings/quick-package/${p.editPackageItem.id}`,{method:"PUT",body:G})):K=await E("/bookings/quick-package",{method:"POST",body:G});const R=document.getElementById("package-form-success-banner"),w=document.getElementById("package-form-booking-code"),A=document.getElementById("package-form-download-link");R&&(R.hidden=!1),w&&(w.textContent=(z?"Paket diperbarui: ":"Kode Booking: ")+K.booking_code+(K.invoice_number&&K.invoice_number!=="-"?" | No. Surat: "+K.invoice_number:"")),A&&(A.href=K.invoice_download_url),F((z?"Paket diperbarui: ":"Paket berhasil disimpan: ")+K.booking_code),await _e(),p.editPackageItem=null}catch(B){if(tt(B))return;v(B.message||"Silakan periksa kembali data yang diinput",p.editPackageItem?"Gagal memperbarui paket":"Gagal menyimpan paket")}finally{de(y,!1,"Menyimpan...")}}),document.getElementById("choice-passenger-btn")?.addEventListener("click",()=>{ee("booking-type-choice-modal"),jt(p._pendingChoiceArmada||1,p._pendingChoiceTime||""),H("booking-form-modal"),requestAnimationFrame(()=>Ce())}),document.getElementById("choice-package-btn")?.addEventListener("click",()=>{ee("booking-type-choice-modal"),O(p._pendingChoiceArmada||1,p._pendingChoiceTime||""),H("package-form-modal")}),t?.addEventListener("click",()=>{p._pendingChoiceArmada=1,p._pendingChoiceTime="",H("booking-type-choice-modal")}),i?.addEventListener("click",k=>{const y=k.target.closest("[data-seat-code]");if(!y||y.disabled)return;zt();const B=y.dataset.seatCode;p.selectedSeats.includes(B)?p.selectedSeats=p.selectedSeats.filter(P=>P!==B):p.selectedSeats.length<xt()&&(p.selectedSeats=mn([...p.selectedSeats,B])),pe(),me()}),document.getElementById("booking-passenger-count")?.addEventListener("change",()=>{zt(),pe(),me(),Ce()}),document.getElementById("booking-additional-fare")?.addEventListener("input",Ce),document.getElementById("booking-trip-date")?.addEventListener("change",()=>{Ne().then(()=>{pe(),me()})}),document.getElementById("booking-trip-time")?.addEventListener("change",()=>{Ne().then(()=>{pe(),me()})});let f=!1;function j(){Ce(),!f&&(f=!0,setTimeout(()=>{f=!1,Ne().then(()=>{pe(),me()})},50))}return["change","input"].forEach(k=>{document.getElementById("booking-from-city")?.addEventListener(k,j),document.getElementById("booking-to-city")?.addEventListener(k,j)}),d?.addEventListener("change",pn),c?.addEventListener("input",k=>{const y=k.target.closest("[data-passenger-seat]");if(!y)return;const B=y.dataset.passengerSeat;p.passengerDraftMap[B]={seat_no:B,name:y.querySelector("[data-passenger-name]")?.value.trim()||"",phone:y.querySelector("[data-passenger-phone]")?.value.trim()||""}}),r?.addEventListener("submit",async k=>{k.preventDefault();const y=document.getElementById("booking-submit-btn");de(y,!0,"Menyimpan...");try{const B=Ti();if(p.editItem){const P={...B,version:p.editItem.version};await E(`/bookings/${p.editItem.id}`,{method:"PUT",body:P}),F("Data pemesanan berhasil diperbarui")}else await E("/bookings",{method:"POST",body:B}),F("Data pemesanan berhasil ditambahkan");ee("booking-form-modal"),jt(),await _e()}catch(B){if(tt(B))return;v(B.message||"Silakan periksa kembali data yang diinput","Gagal menyimpan data pemesanan")}finally{de(y,!1,"Menyimpan...")}}),s?.addEventListener("click",async()=>{if(p.deleteItem){de(s,!0,"Menghapus...");try{await E(`/bookings/${p.deleteItem.id}?version=${p.deleteItem.version}`,{method:"DELETE"}),F("Data pemesanan berhasil dihapus"),ee("booking-delete-modal"),p.deleteItem=null,await _e()}catch(k){if(tt(k))return;v(k.message||"Gagal menghapus data pemesanan")}finally{de(s,!1,"Menghapus...")}}}),jt(),_e().catch(k=>{if(k.status===403){la();return}v(k.message||"Gagal memuat data penumpang")})}function Di(e){const t=document.getElementById(e);if(!t)return{};try{return JSON.parse(t.textContent||"{}")}catch{return{}}}function Oi(){const e=document.querySelector("[data-regular-booking-page]");if(!e)return;const t=Di("regular-booking-route-matrix"),n=e.querySelector("[data-booking-origin]"),a=e.querySelector("[data-booking-destination]"),o=e.querySelector("[data-booking-schedule]"),r=e.querySelector("[data-booking-passengers]"),s=e.querySelector("[data-route-fare-input]"),i=e.querySelector("[data-additional-fare-input]"),c=e.querySelector("[data-estimated-total-input]"),d=e.querySelector("[data-route-feedback]"),l=e.querySelector("[data-route-feedback-title]"),g=e.querySelector("[data-route-feedback-text]"),I=e.querySelector("[data-booking-submit]"),O=Array.from(e.querySelectorAll("[data-booking-type]")),b=e.querySelector("[data-summary-booking-for]"),h=e.querySelector("[data-summary-route]"),f=e.querySelector("[data-summary-schedule]"),j=e.querySelector("[data-summary-passengers]"),k=e.querySelector("[data-summary-fare]"),y=e.querySelector("[data-summary-additional-fare]"),B=e.querySelector("[data-summary-total]"),P=new Map(O.map(w=>[w.value,w.dataset.label||w.value])),C=new Map(Array.from(o?.options||[]).filter(w=>w.value).map(w=>[w.value,w.textContent.trim()]));function N(w,A){if(!w||!A||w===A)return null;const U=t?.[w]?.[A];return U==null?null:Number(U)}function G(w,A,U){!d||!l||!g||(d.dataset.state=w,l.textContent=A,g.textContent=U)}function z(){e.querySelectorAll(".regular-booking-radio").forEach(w=>{const A=w.querySelector('input[type="radio"]');w.classList.toggle("is-selected",!!A?.checked)})}function K(w){return w<=0?"Belum dipilih":w===6?"6 Penumpang (Opsional tambahan)":`${w} Penumpang`}function R(){const w=n?.value||"",A=a?.value||"",U=o?.value||"",te=Number(r?.value||0),W=O.find(Pe=>Pe.checked)?.value||"",X=N(w,A),Z=Math.max(parseInt(i?.value||"0",10)||0,0),Q=X!==null&&te>0?(X+Z)*te:null;s&&(s.value=X!==null?J(X):""),c&&(c.value=Q!==null?J(Q):""),!w||!A?G("idle","Tarif akan ditampilkan otomatis","Pilih asal dan tujuan untuk melihat tarif perjalanan reguler."):w===A?G("error","Asal dan tujuan tidak boleh sama","Silakan pilih tujuan yang berbeda agar tarif dapat dihitung."):X===null?G("error","Rute belum tersedia","Rute yang Anda pilih saat ini belum tersedia. Silakan pilih kombinasi asal dan tujuan lain."):G("ready","Rute tersedia","Tarif telah diisi otomatis berdasarkan kombinasi rute dua arah yang tersedia."),I&&(I.disabled=!!(w&&A&&(w===A||X===null))),b&&(b.textContent=P.get(W)||"Belum dipilih"),h&&(h.textContent=w&&A?`${w} - ${A}`:"Belum dipilih"),f&&(f.textContent=C.get(U)||"Belum dipilih"),j&&(j.textContent=K(te)),k&&(k.textContent=X!==null?J(X):"Belum tersedia"),y&&(y.textContent=Z>0?J(Z):"Tidak ada"),B&&(B.textContent=Q!==null?J(Q):"Belum tersedia"),z()}[n,a,o,r].forEach(w=>{w?.addEventListener("change",R)}),i?.addEventListener("input",R),O.forEach(w=>{w.addEventListener("change",R)}),e.querySelector("form")?.addEventListener("reset",()=>{window.requestAnimationFrame(R)}),R()}function ji(){const e=document.querySelector("[data-regular-booking-seat-page]");if(!e)return;const t=Number(e.dataset.requiredSeatCount||0),n=Array.from(e.querySelectorAll("[data-seat-card]")),a=Array.from(e.querySelectorAll("[data-seat-input]")),o=e.querySelector("[data-seat-summary-count]"),r=e.querySelector("[data-seat-summary-list]"),s=e.querySelector("[data-seat-summary-remaining]"),i=e.querySelector("[data-seat-submit]"),c=e.querySelector("[data-seat-feedback]"),d=e.querySelector("[data-seat-feedback-title]"),l=e.querySelector("[data-seat-feedback-text]");function g(){return a.filter(h=>h.checked).map(h=>h.value)}function I(h){return h.length>0?h.join(", "):"Belum dipilih"}function O(h,f,j){!c||!d||!l||(c.dataset.state=h,d.textContent=f,l.textContent=j)}function b(){const h=g(),f=h.length,j=t>0&&f>=t;if(n.forEach(k=>{const y=k.querySelector("[data-seat-input]");if(!y)return;const B=y.disabled&&!y.checked&&k.classList.contains("is-occupied"),P=y.checked,C=B||j&&!P;B||(y.disabled=C),k.classList.toggle("is-selected",P),k.classList.toggle("is-disabled",!B&&C)}),o&&(o.textContent=`${f} dari ${t}`),r&&(r.textContent=I(h)),s&&(s.textContent=String(Math.max(t-f,0))),i&&(i.disabled=f!==t),f===0){O("idle","Pilih kursi sesuai jumlah penumpang","Jumlah kursi yang dipilih harus sama dengan jumlah penumpang pada booking draft.");return}if(f<t){O("idle","Pemilihan kursi belum lengkap",`Masih perlu memilih ${t-f} kursi lagi sebelum dapat melanjutkan.`);return}if(t===6){O("ready","Semua kursi sudah terisi","Jumlah penumpang 6 orang sudah terpenuhi dan kursi tambahan 2B ikut terpakai.");return}O("ready","Kursi sudah sesuai","Jumlah kursi yang dipilih sudah sesuai dengan jumlah penumpang dan siap disimpan.")}a.forEach(h=>{h.addEventListener("change",()=>{b()})}),b()}let Ue=null,Et=!1,ca="",qi=3e3,ua=0;const wt=[],T=e=>document.getElementById(e);async function Ya(e){const t=e.trim();if(!t)return;const n=Date.now();if(!(t===ca&&n-ua<qi)){ca=t,ua=n,xe("Memproses scan…");try{const a=await E("/scan-qr",{method:"POST",body:{qr_token:t}});Ni(a),Hi(a),a.already_scanned?v(a.message,"Tiket Sudah Pernah Di-Scan"):a.is_newly_eligible?F(a.message,"🎉 Eligible Diskon!"):F(a.message,"Scan Berhasil")}catch(a){Ui(a.message||"Scan gagal"),v(a.message||"Scan gagal","Scan Gagal")}finally{xe(Et?"Kamera aktif — arahkan ke QR code.":"")}}}function Ni(e){T("qrscan-result-idle").hidden=!0,T("qrscan-result-card").hidden=!1;const t=e.booking||{},n=e.passenger||{},a=e.loyalty_count,o=e.loyalty_target,r=e.discount_eligible,s=Math.min(Math.round(a/o*100),100),i=e.already_scanned?"warn":e.success?"success":"error";T("qrscan-result-header").className="qrscan-result-header qrscan-result-header--"+i,T("qrscan-result-icon").innerHTML=e.already_scanned?Ji():e.success?Vi():to(),T("qrscan-result-title").textContent=t.booking_code||"-",T("qrscan-result-subtitle").textContent=e.message,T("qr-res-name").textContent=n.name||t.nama_pemesanan||"-",T("qr-res-code").textContent=t.booking_code||"-",T("qr-res-route").textContent=t.route_label||"-",T("qr-res-datetime").textContent=(t.trip_date||"-")+" "+(t.trip_time||""),T("qr-res-seats").textContent=n.seat_no||t.selected_seats||"-",T("qr-res-pax").textContent=(t.passenger_count||0)+" Orang",T("qr-res-loyalty-label").textContent=a+" / "+o,T("qr-res-loyalty-fill").style.width=s+"%",T("qr-res-loyalty-fill").className="qrscan-loyalty-fill"+(r?" qrscan-loyalty-fill--done":""),T("qr-res-loyalty-note").textContent=r?"✅ Eligible diskon "+(e.discount_percentage||50)+"%":"Perlu "+Math.max(o-a,0)+" perjalanan lagi untuk diskon."}function Ui(e){T("qrscan-result-idle").hidden=!0,T("qrscan-result-card").hidden=!1,T("qrscan-result-header").className="qrscan-result-header qrscan-result-header--error",T("qrscan-result-icon").innerHTML=to(),T("qrscan-result-title").textContent="Scan Gagal",T("qrscan-result-subtitle").textContent=e,["qr-res-name","qr-res-code","qr-res-route","qr-res-datetime","qr-res-seats","qr-res-pax"].forEach(t=>{T(t).textContent="-"}),T("qr-res-loyalty-label").textContent="– / –",T("qr-res-loyalty-fill").style.width="0%",T("qr-res-loyalty-note").textContent=""}function Hi(e){const t=e.booking,n=new Date().toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit",second:"2-digit"}),a=e.passenger||{};wt.unshift({booking:t,passenger:a,time:n,success:e.success,already_scanned:e.already_scanned,message:e.message}),eo()}function eo(){const e=T("qrscan-history-list");if(wt.length===0){e.innerHTML='<p class="qrscan-history-empty">Belum ada scan dalam sesi ini.</p>';return}e.innerHTML=wt.map(t=>{const n=t.already_scanned?"warn":t.success?"ok":"err",a=t.passenger&&t.passenger.name?t.passenger.name+(t.passenger.seat_no?" ("+t.passenger.seat_no+")":""):t.booking.nama_pemesanan||"-";return`
        <div class="qrscan-history-item qrscan-history-item--${n}">
            <div class="qrscan-history-dot"></div>
            <div class="qrscan-history-body">
                <strong>${u(t.booking.booking_code||"-")}</strong>
                <span>${u(a)}</span>
            </div>
            <span class="qrscan-history-time">${t.time}</span>
        </div>`}).join("")}function Fi(){if(!window.Html5Qrcode){v("Library scanner tidak tersedia. Coba muat ulang halaman.","Error");return}T("qrscan-placeholder").hidden=!0,T("qrscan-frame").hidden=!1,T("qrscan-btn-start").hidden=!0,T("qrscan-btn-stop").hidden=!1,Et=!0,xe("Menginisialisasi kamera…"),Ue=new window.Html5Qrcode("qrscan-reader"),Ue.start({facingMode:"environment"},{fps:10,qrbox:{width:240,height:240}},e=>{let t=e.trim();try{const n=JSON.parse(e);n&&(n.qr_token||n.passenger_qr_token)&&(t=n.qr_token||n.passenger_qr_token)}catch{}Ya(t)},()=>{}).then(()=>{xe("Kamera aktif — arahkan ke QR code.")}).catch(e=>{Et=!1,T("qrscan-placeholder").hidden=!1,T("qrscan-frame").hidden=!0,T("qrscan-btn-start").hidden=!1,T("qrscan-btn-stop").hidden=!0,xe("Gagal mengakses kamera. Pastikan izin kamera sudah diberikan."),v(String(e),"Kamera Error")})}function Gi(){Ue&&Ue.stop().catch(()=>{}).finally(()=>{Ue=null}),Et=!1,T("qrscan-placeholder").hidden=!1,T("qrscan-frame").hidden=!0,T("qrscan-btn-start").hidden=!1,T("qrscan-btn-stop").hidden=!0,xe("Kamera dihentikan.")}function xe(e){T("qrscan-status-text").textContent=e}function Vi(){return`<svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
        <path d="M8 12l3 3 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`}function to(){return`<svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
        <path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`}function Ji(){return`<svg viewBox="0 0 24 24" fill="none">
        <path d="M12 9v4M12 17h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    </svg>`}function zi(){T("qrscan-btn-start").addEventListener("click",Fi),T("qrscan-btn-stop").addEventListener("click",Gi),T("qrscan-clear-history").addEventListener("click",()=>{wt.length=0,eo()}),T("qrscan-manual-form").addEventListener("submit",e=>{e.preventDefault();const t=T("qrscan-manual-input").value.trim();t&&(Ya(t),T("qrscan-manual-input").value="")})}const M={data:[],loading:!0,totalCount:0,page:1,search:"",chartLimit:10,editItem:null,deleteItem:null,isSubmitting:!1};let nt=null;const ke=15,Ki=()=>`<svg viewBox="0 0 24 24" fill="none">
    <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
</svg>`,Wi=()=>`<svg viewBox="0 0 24 24" fill="none">
    <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
</svg>`;function Xi(){const e=document.getElementById("plkt-table-body");e&&(e.innerHTML=`
        <tr><td colspan="10" class="plkt-table-state">
            <div class="plkt-loading-inline">
                <span class="plkt-loading-inline-spinner" aria-hidden="true"></span>
                <span>Memuat data...</span>
            </div>
        </td></tr>`)}function Zi(){const e=document.getElementById("plkt-table-body");e&&(e.innerHTML='<tr><td colspan="10" class="plkt-table-state plkt-empty-copy">Belum ada data penumpang.</td></tr>')}function ma(){const e=document.getElementById("plkt-table-body");if(e){if(M.loading){Xi();return}if(M.data.length===0){Zi();return}e.innerHTML=M.data.map((t,n)=>`
        <tr class="plkt-row">
            <td class="plkt-index-cell">${(M.page-1)*ke+n+1}</td>
            <td>
                <div class="plkt-user-cell">
                    <span class="plkt-user-avatar" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/>
                        </svg>
                    </span>
                    <div>
                        <span class="plkt-user-name">${u(t.passenger_name||"-")}</span>
                        <span class="plkt-user-seat">Kursi ${u(t.seat_no||"-")}</span>
                    </div>
                </div>
            </td>
            <td class="plkt-phone-cell">${u(t.phone||"-")}</td>
            <td>${u(t.from_city||"-")}</td>
            <td>${u(t.to_city||"-")}</td>
            <td class="plkt-date-cell">${u(t.trip_date||"-")}</td>
            <td class="plkt-time-cell">${u(t.trip_time||"-")}</td>
            <td class="plkt-tarif-cell">${u(t.tarif||"-")}</td>
            <td class="plkt-count-cell">
                <span class="plkt-count-badge">${t.booking_count}x</span>
            </td>
            <td>
                <div class="plkt-action-row">
                    <button class="plkt-icon-button" type="button"
                        data-plkt-edit="${t.id}"
                        aria-label="Edit penumpang ${u(t.passenger_name||"")}">
                        ${Ki()}
                    </button>
                    <button class="plkt-icon-button plkt-icon-button-danger" type="button"
                        data-plkt-delete="${t.id}"
                        data-plkt-name="${u(t.passenger_name||"")}"
                        aria-label="Hapus penumpang ${u(t.passenger_name||"")}">
                        ${Wi()}
                    </button>
                </div>
            </td>
        </tr>`).join("")}}function pa(){const e=document.getElementById("plkt-pagination-shell"),t=document.getElementById("plkt-pagination-info"),n=document.getElementById("plkt-pagination-page"),a=document.getElementById("plkt-prev-page-btn"),o=document.getElementById("plkt-next-page-btn"),r=Math.max(1,Math.ceil(M.totalCount/ke));e&&(e.hidden=r<=1),t&&(t.textContent=ye(M.page,ke,M.totalCount,M.data.length)),n&&(n.textContent=`${M.page} / ${r}`),a&&(a.disabled=M.page===1),o&&(o.disabled=M.page>=r)}async function Se(){M.loading=!0,ma(),pa();try{const[e,t]=await Promise.all([E(`/passengers-lkt?page=${M.page}&limit=${ke}${M.search?`&search=${encodeURIComponent(M.search)}`:""}`),E(`/passengers-lkt/count${M.search?`?search=${encodeURIComponent(M.search)}`:""}`)]);M.data=Array.isArray(e)?e:[],M.totalCount=Number(t?.count||0)}catch(e){v(e.message||"Gagal memuat data","Error"),M.data=[],M.totalCount=0}finally{M.loading=!1,ma(),pa()}}function Wt(e){const t=document.getElementById("plkt-edit-submit-btn");M.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":"Simpan")}async function Qi(e){try{const t=await E(`/passengers-lkt/${e}`);M.editItem=t;const n=document.getElementById("plkt-edit-name"),a=document.getElementById("plkt-edit-phone"),o=document.getElementById("plkt-edit-id");o&&(o.value=t.id),n&&(n.value=t.name||""),a&&(a.value=t.phone||""),Wt(!1),H("plkt-edit-modal")}catch{v("Gagal memuat data penumpang")}}function Yi(e,t){M.deleteItem={id:e,name:t};const n=document.getElementById("plkt-delete-copy");n&&(n.innerHTML=`Apakah Anda yakin ingin menghapus penumpang <strong>${u(t)}</strong>? Tindakan ini tidak dapat dibatalkan.`),H("plkt-delete-modal")}async function at(){const e=document.getElementById("plkt-loyalty-chart"),t=document.getElementById("plkt-chart-empty");if(e)try{const n=await E(`/passengers-lkt/loyalty-chart?limit=${M.chartLimit}`);if(!Array.isArray(n)||n.length===0){e.hidden=!0,t&&(t.hidden=!1);return}e.hidden=!1,t&&(t.hidden=!0);const a=n.map(i=>i.passenger_name+(i.phone&&i.phone!=="-"?` (${i.phone})`:"")),o=n.map(i=>i.booking_count),r=Math.max(...o,1),s=o.map(i=>{const c=i/r;return`rgba(${Math.round(26+c*30)}, ${Math.round(35+c*80)}, ${Math.round(126+c*50)}, 0.85)`});nt&&(nt.destroy(),nt=null),nt=new window.Chart(e,{type:"bar",data:{labels:a,datasets:[{label:"Jumlah Pemesanan",data:o,backgroundColor:s,borderRadius:6,borderSkipped:!1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{title:i=>i[0].label,label:i=>` ${i.raw} kali pemesanan`}}},scales:{x:{ticks:{maxRotation:35,font:{size:11},color:"#374151"},grid:{display:!1}},y:{beginAtZero:!0,ticks:{stepSize:1,color:"#374151",font:{size:11}},grid:{color:"rgba(0,0,0,0.06)"}}}}})}catch{t&&(t.hidden=!1)}}function ed(){if(M.data.length===0){v("Tidak ada data untuk diekspor.");return}const e=["No","Nama Penumpang","No HP","Dari","Tujuan","Tanggal Berangkat","Jam","Tarif","Kali Memesan"],t=M.data.map((s,i)=>[(M.page-1)*ke+i+1,s.passenger_name||"-",s.phone||"-",s.from_city||"-",s.to_city||"-",s.trip_date||"-",s.trip_time||"-",s.tarif||"-",s.booking_count]),n=[e,...t].map(s=>s.map(i=>`"${String(i).replace(/"/g,'""')}"`).join(",")).join(`
`),a=new Blob(["\uFEFF"+n],{type:"text/csv;charset=utf-8;"}),o=URL.createObjectURL(a),r=document.createElement("a");r.href=o,r.download="data-penumpang-jet.csv",r.click(),URL.revokeObjectURL(o)}function td(){const e=document.getElementById("plkt-search-input"),t=document.getElementById("plkt-prev-page-btn"),n=document.getElementById("plkt-next-page-btn"),a=document.getElementById("plkt-export-btn"),o=document.getElementById("plkt-chart-limit"),r=document.getElementById("plkt-table-body"),s=document.getElementById("plkt-edit-form"),i=document.getElementById("plkt-delete-confirm-btn");e?.addEventListener("input",he(async c=>{M.search=c.target.value.trim(),M.page=1,await Se().catch(()=>v("Gagal memuat data"))},400)),t?.addEventListener("click",async()=>{M.page<=1||(M.page-=1,await Se().catch(()=>v("Gagal memuat data")))}),n?.addEventListener("click",async()=>{const c=Math.max(1,Math.ceil(M.totalCount/ke));M.page>=c||(M.page+=1,await Se().catch(()=>v("Gagal memuat data")))}),a?.addEventListener("click",ed),o?.addEventListener("change",async c=>{M.chartLimit=parseInt(c.target.value,10)||10,await at().catch(()=>{})}),r?.addEventListener("click",async c=>{const d=c.target.closest("[data-plkt-edit]"),l=c.target.closest("[data-plkt-delete]");d&&await Qi(d.dataset.plktEdit),l&&Yi(l.dataset.plktDelete,l.dataset.plktName)}),s?.addEventListener("submit",async c=>{c.preventDefault();const d=document.getElementById("plkt-edit-id")?.value,l=document.getElementById("plkt-edit-name")?.value.trim(),g=document.getElementById("plkt-edit-phone")?.value.trim();if(!l){v("Nama penumpang tidak boleh kosong");return}Wt(!0);try{await E(`/passengers-lkt/${d}`,{method:"PUT",body:{name:l,phone:g}}),F("Data penumpang berhasil diperbarui"),ee("plkt-edit-modal"),await Promise.all([Se(),at()])}catch(I){v(I.message||"Gagal menyimpan data")}finally{Wt(!1)}}),i?.addEventListener("click",async()=>{if(M.deleteItem)try{await E(`/passengers-lkt/${M.deleteItem.id}`,{method:"DELETE"}),F("Data penumpang berhasil dihapus"),ee("plkt-delete-modal"),M.deleteItem=null,(M.page-1)*ke>=M.totalCount-1&&M.page>1&&(M.page-=1),await Promise.all([Se(),at()])}catch(c){v(c.message||"Gagal menghapus data")}}),Se().catch(()=>v("Gagal memuat data")),at().catch(()=>{})}const V={data:[],loading:!0,totalCount:0,page:1,search:"",detailItem:null,isLoadingDetail:!1},Je=20,nd=()=>`<svg viewBox="0 0 24 24" fill="none">
    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/>
</svg>`;function no(e){const t={high:["badge-emerald","Tinggi"],medium:["badge-blue","Sedang"],low:["badge-yellow","Rendah"]},[n,a]=t[e]??["badge-gray",e??"-"];return`<span class="stock-value-badge ${n}">${u(a)}</span>`}function ao(e){const t={active:["stock-value-badge-emerald","Aktif"],merged:["stock-value-badge-blue","Digabung"],inactive:["stock-value-badge-red","Nonaktif"]},[n,a]=t[e]??["stock-value-badge-blue",e??"-"];return`<span class="stock-value-badge ${n}">${u(a)}</span>`}function oo(e){return e?'<span class="stock-value-badge stock-value-badge-emerald">✓ Eligible</span>':'<span class="stock-value-badge stock-value-badge-blue">—</span>'}function ad(){const e=document.getElementById("cust-table-body");e&&(e.innerHTML=`
        <tr><td colspan="8" class="plkt-table-state">
            <div class="plkt-loading-inline">
                <span class="plkt-loading-inline-spinner" aria-hidden="true"></span>
                <span>Memuat data...</span>
            </div>
        </td></tr>`)}function od(){const e=document.getElementById("cust-table-body");e&&(e.innerHTML='<tr><td colspan="8" class="plkt-table-state plkt-empty-copy">Belum ada data pelanggan.</td></tr>')}function ga(){const e=document.getElementById("cust-table-body");if(e){if(V.loading){ad();return}if(V.data.length===0){od();return}e.innerHTML=V.data.map((t,n)=>`
        <tr class="plkt-row">
            <td class="plkt-index-cell">${(V.page-1)*Je+n+1}</td>
            <td>
                <span class="plkt-booking-code-badge">${u(t.customer_code||"-")}</span>
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
                        <span class="plkt-user-name">${u(t.display_name||"-")}</span>
                        <span class="plkt-user-seat">${no(t.identity_confidence)}</span>
                    </div>
                </div>
            </td>
            <td class="plkt-phone-cell">${u(t.phone_normalized||t.phone_original||"-")}</td>
            <td class="text-center">
                <strong>${t.total_trip_count??0}</strong>
                <span style="color:var(--color-text-muted);font-size:.75rem"> / 5</span>
            </td>
            <td class="text-center">${oo(t.discount_eligible)}</td>
            <td class="text-center">${ao(t.status)}</td>
            <td class="text-center">
                <button class="plkt-icon-button" type="button"
                    data-cust-detail="${t.id}"
                    aria-label="Detail pelanggan ${u(t.display_name||"")}">
                    ${nd()}
                </button>
            </td>
        </tr>`).join("")}}function rd(){const e=document.getElementById("cust-pagination-shell"),t=document.getElementById("cust-pagination-info"),n=document.getElementById("cust-pagination-page"),a=document.getElementById("cust-prev-page-btn"),o=document.getElementById("cust-next-page-btn"),r=Math.max(1,Math.ceil(V.totalCount/Je));e&&(e.hidden=!1),t&&(t.textContent=ye(V.page,Je,V.totalCount,V.data.length)),n&&(n.textContent=`${V.page} / ${r}`),a&&(a.disabled=V.page===1),o&&(o.disabled=V.page>=r)}async function sd(){try{const[e,t,n]=await Promise.all([E("/customers?limit=1"),E("/customers?limit=1&discount_eligible=1"),E("/customers?limit=1&has_phone=1")]),a=document.getElementById("cust-stat-total"),o=document.getElementById("cust-stat-eligible"),r=document.getElementById("cust-stat-with-phone");a&&(a.textContent=(e?.total??0).toLocaleString("id-ID")),o&&(o.textContent=(t?.total??0).toLocaleString("id-ID")),r&&(r.textContent=(n?.total??0).toLocaleString("id-ID"))}catch{}}async function ot(){V.loading=!0,ga();try{const e=new URLSearchParams({page:V.page,limit:Je});V.search&&e.set("search",V.search);const t=await E(`/customers?${e.toString()}`);V.data=Array.isArray(t?.data)?t.data:[],V.totalCount=Number(t?.total??0)}catch(e){v(e.message||"Gagal memuat data pelanggan","Error"),V.data=[],V.totalCount=0}finally{V.loading=!1,ga(),rd()}}async function id(e){const t=document.getElementById("cust-detail-name"),n=document.getElementById("cust-detail-code"),a=document.getElementById("cust-detail-body");t&&(t.textContent="Detail Pelanggan"),n&&(n.textContent=""),a&&(a.innerHTML=`
        <div class="plkt-loading-inline">
            <span class="plkt-loading-inline-spinner" aria-hidden="true"></span>
            <span>Memuat detail...</span>
        </div>`),H("cust-detail-modal");try{const o=await E(`/customers/${e}`);t&&(t.textContent=o.display_name||"-"),n&&(n.textContent=o.customer_code||"");const r=o.recent_bookings?.length?o.recent_bookings.map(s=>`
                <tr>
                    <td>${u(s.booking_code||"-")}</td>
                    <td>${u(s.trip_date||"-")}</td>
                    <td>${u(s.from_city||"-")} → ${u(s.to_city||"-")}</td>
                    <td>${u(s.booking_status||"-")}</td>
                </tr>`).join(""):'<tr><td colspan="4" class="plkt-table-state plkt-empty-copy">Belum ada riwayat perjalanan.</td></tr>';a&&(a.innerHTML=`
            <dl class="cust-detail-dl">
                <dt>Nama</dt>
                <dd>${u(o.display_name||"-")}</dd>
                <dt>Nomor HP</dt>
                <dd>${u(o.phone_normalized||o.phone_original||"-")}</dd>
                <dt>Email</dt>
                <dd>${u(o.email||"-")}</dd>
                <dt>Status</dt>
                <dd>${ao(o.status)}</dd>
                <dt>Kepercayaan Data</dt>
                <dd>${no(o.identity_confidence)}</dd>
                <dt>Total Perjalanan</dt>
                <dd><strong>${o.total_trip_count??0}</strong> / 5</dd>
                <dt>Eligible Diskon</dt>
                <dd>${oo(o.discount_eligible)}</dd>
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
            </div>`)}catch(o){a&&(a.innerHTML=`<p class="plkt-empty-copy">Gagal memuat detail: ${u(o.message||"Terjadi kesalahan")}</p>`)}}async function dd(){try{const t=(await E("/customers/duplicates?limit=5"))?.total??0;t===0?F("Tidak ada duplikasi pelanggan terdeteksi.","Tidak Ada Duplikasi"):v(`Terdeteksi ${t} pasang pelanggan berpotensi duplikat. Gunakan API untuk merge.`,`${t} Duplikasi Ditemukan`)}catch(e){v(e.message||"Gagal memeriksa duplikasi","Error")}}function ld(){const e=document.getElementById("cust-search-input"),t=document.getElementById("cust-prev-page-btn"),n=document.getElementById("cust-next-page-btn"),a=document.getElementById("cust-table-body"),o=document.getElementById("cust-duplicates-btn");e?.addEventListener("input",he(async r=>{V.search=r.target.value.trim(),V.page=1,await ot().catch(()=>v("Gagal memuat data"))},400)),t?.addEventListener("click",async()=>{V.page<=1||(V.page-=1,await ot().catch(()=>v("Gagal memuat data")))}),n?.addEventListener("click",async()=>{const r=Math.max(1,Math.ceil(V.totalCount/Je));V.page>=r||(V.page+=1,await ot().catch(()=>v("Gagal memuat data")))}),o?.addEventListener("click",dd),a?.addEventListener("click",async r=>{const s=r.target.closest("[data-cust-detail]");s&&await id(s.dataset.custDetail)}),ot().catch(()=>v("Gagal memuat data")),sd().catch(()=>{})}function cd(e){return!e||e<=0?"":"Rp "+Math.floor(e).toLocaleString("id-ID")}function ud(){const e=document.querySelector("[data-fare-input]"),t=document.querySelector("[data-additional-fare-input]"),n=document.querySelector("[data-estimated-total-input]");function a(){const o=parseInt(e?.value||"0",10)||0,r=parseInt(t?.value||"0",10)||0,s=o+r;n&&(n.value=cd(s))}e?.addEventListener("input",a),t?.addEventListener("input",a),document.querySelectorAll('.regular-booking-radio input[type="radio"]').forEach(o=>{o.addEventListener("change",()=>{document.querySelectorAll(`.regular-booking-radio input[name="${o.name}"]`).forEach(s=>{s.closest(".regular-booking-radio")?.classList.toggle("is-selected",s.checked)})})})}function qt(e){return"Rp "+Math.floor(e).toLocaleString("id-ID")}function qe(e){const t=document.getElementById(e);t&&(t.showModal?.()||t.setAttribute("open",""))}function md(e){const t=document.getElementById(e);t&&(t.close?.()||t.removeAttribute("open"))}function pd(e){const t=e.closest("tr[data-row]");if(!t)return null;try{return JSON.parse(t.dataset.row)}catch{return null}}function gd(e){const t=document.getElementById("show-detail-grid");if(!t)return;const n={transfer:"Transfer Bank",qris:"QRIS",cash:"Tunai","":"—"};t.innerHTML=`
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
            <span class="ddrop-detail-value" style="color:#047857;font-size:1.05rem">${qt(e.price_per_seat)}</span>
        </div>
        <div class="ddrop-detail-item">
            <span class="ddrop-detail-label">Tambahan Ongkos</span>
            <span class="ddrop-detail-value">${e.additional_fare>0?qt(e.additional_fare):"—"}</span>
        </div>
        <div class="ddrop-detail-item col-span-2">
            <span class="ddrop-detail-label">Total Tarif</span>
            <span class="ddrop-detail-value" style="color:#047857;font-weight:700;font-size:1.05rem">${qt(e.total_amount)}</span>
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
    `}function fd(e){const t=document.getElementById("form-edit");if(!t)return;const n=window.__DROPPING_DATA_UPDATE_BASE__||"/dashboard/dropping-data";t.action=`${n}/${e.id}`;const a=(o,r)=>{const s=t.querySelector(`[name="${o}"]`);s&&(s.value=r??"")};a("passenger_name",e.passenger_name),a("passenger_phone",e.passenger_phone),a("from_city",e.from_city),a("to_city",e.to_city),a("pickup_location",e.pickup_location),a("dropoff_location",e.dropoff_location),a("price_per_seat",e.price_per_seat),a("additional_fare",e.additional_fare),a("trip_date",e.trip_date),a("trip_time",e.trip_time),a("notes",e.notes),a("payment_method",e.payment_method),a("payment_status",e.payment_status),a("driver_id",e.driver_id),a("mobil_id",e.mobil_id)}function bd(e){const t=document.getElementById("form-delete"),n=document.getElementById("delete-booking-code");if(!t||!n)return;const a=window.__DROPPING_DATA_UPDATE_BASE__||"/dashboard/dropping-data";t.action=`${a}/${e.id}`,n.textContent=e.booking_code}function kd(){window.__DROPPING_DATA_UPDATE_BASE__="/dashboard/dropping-data",document.getElementById("btn-open-create")?.addEventListener("click",()=>{qe("modal-create")}),document.getElementById("btn-open-create-empty")?.addEventListener("click",()=>{qe("modal-create")}),document.addEventListener("click",e=>{const t=e.target.closest("[data-action]");if(!t)return;const n=t.dataset.action,a=pd(t);a&&(n==="show"?(gd(a),qe("modal-show")):n==="edit"?(fd(a),qe("modal-edit")):n==="delete"&&(bd(a),qe("modal-delete")))}),document.querySelectorAll("[data-close-modal]").forEach(e=>{e.addEventListener("click",()=>md(e.dataset.closeModal))}),document.querySelectorAll(".ddrop-modal").forEach(e=>{e.addEventListener("click",t=>{t.target===e&&(e.close?.()||e.removeAttribute("open"))})})}const hd={"admin-users/index":si,"auth/login":Yr,"bookings/index":Pi,"dashboard/index":us,"drivers/index":Es,"mobil/index":As,"keberangkatan/index":qs,"regular-bookings/index":Oi,"regular-bookings/seats":ji,"stock/index":Vs,"qr-scan/index":zi,"passengers-lkt/index":td,"customers/index":ld,"dropping-bookings/index":ud,"dropping-data/index":kd};document.addEventListener("DOMContentLoaded",async()=>{Wr(),Qr(),ct(Ua());const e=Fr();e&&(e.type==="success"?F(e.message,e.title):e.type==="info"?Xr(e.message,e.title):v(e.message,e.title));try{const{user:t}=await Kr();t&&ct(t);const n=document.body.dataset.pageScript,a=hd[n];typeof a=="function"&&await a({user:t})}catch(t){console.error(t),v(t.message||"Terjadi kesalahan saat memuat halaman")}});
