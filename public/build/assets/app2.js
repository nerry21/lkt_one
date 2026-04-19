function ga(e,t){return function(){return e.apply(t,arguments)}}const{toString:oo}=Object.prototype,{getPrototypeOf:Wt}=Object,{iterator:Et,toStringTag:fa}=Symbol,wt=(e=>t=>{const n=oo.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),re=e=>(e=e.toLowerCase(),t=>wt(t)===e),Bt=e=>t=>typeof t===e,{isArray:Ae}=Array,xe=Bt("undefined");function Je(e){return e!==null&&!xe(e)&&e.constructor!==null&&!xe(e.constructor)&&te(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const ba=re("ArrayBuffer");function ro(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&ba(e.buffer),t}const so=Bt("string"),te=Bt("function"),ka=Bt("number"),Ke=e=>e!==null&&typeof e=="object",io=e=>e===!0||e===!1,at=e=>{if(wt(e)!=="object")return!1;const t=Wt(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(fa in e)&&!(Et in e)},lo=e=>{if(!Ke(e)||Je(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},co=re("Date"),uo=re("File"),mo=e=>!!(e&&typeof e.uri<"u"),po=e=>e&&typeof e.getParts<"u",go=re("Blob"),fo=re("FileList"),bo=e=>Ke(e)&&te(e.pipe);function ko(){return typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}}const gn=ko(),fn=typeof gn.FormData<"u"?gn.FormData:void 0,ho=e=>{let t;return e&&(fn&&e instanceof fn||te(e.append)&&((t=wt(e))==="formdata"||t==="object"&&te(e.toString)&&e.toString()==="[object FormData]"))},yo=re("URLSearchParams"),[vo,Eo,wo,Bo]=["ReadableStream","Request","Response","Headers"].map(re),Io=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function ze(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let a,o;if(typeof e!="object"&&(e=[e]),Ae(e))for(a=0,o=e.length;a<o;a++)t.call(null,e[a],a,e);else{if(Je(e))return;const r=n?Object.getOwnPropertyNames(e):Object.keys(e),s=r.length;let i;for(a=0;a<s;a++)i=r[a],t.call(null,e[i],i,e)}}function ha(e,t){if(Je(e))return null;t=t.toLowerCase();const n=Object.keys(e);let a=n.length,o;for(;a-- >0;)if(o=n[a],t===o.toLowerCase())return o;return null}const ge=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,ya=e=>!xe(e)&&e!==ge;function Nt(){const{caseless:e,skipUndefined:t}=ya(this)&&this||{},n={},a=(o,r)=>{if(r==="__proto__"||r==="constructor"||r==="prototype")return;const s=e&&ha(n,r)||r;at(n[s])&&at(o)?n[s]=Nt(n[s],o):at(o)?n[s]=Nt({},o):Ae(o)?n[s]=o.slice():(!t||!xe(o))&&(n[s]=o)};for(let o=0,r=arguments.length;o<r;o++)arguments[o]&&ze(arguments[o],a);return n}const _o=(e,t,n,{allOwnKeys:a}={})=>(ze(t,(o,r)=>{n&&te(o)?Object.defineProperty(e,r,{value:ga(o,n),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(e,r,{value:o,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:a}),e),$o=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),So=(e,t,n,a)=>{e.prototype=Object.create(t.prototype,a),Object.defineProperty(e.prototype,"constructor",{value:e,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},Co=(e,t,n,a)=>{let o,r,s;const i={};if(t=t||{},e==null)return t;do{for(o=Object.getOwnPropertyNames(e),r=o.length;r-- >0;)s=o[r],(!a||a(s,e,t))&&!i[s]&&(t[s]=e[s],i[s]=!0);e=n!==!1&&Wt(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},xo=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const a=e.indexOf(t,n);return a!==-1&&a===n},Lo=e=>{if(!e)return null;if(Ae(e))return e;let t=e.length;if(!ka(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},To=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&Wt(Uint8Array)),Ao=(e,t)=>{const a=(e&&e[Et]).call(e);let o;for(;(o=a.next())&&!o.done;){const r=o.value;t.call(e,r[0],r[1])}},Mo=(e,t)=>{let n;const a=[];for(;(n=e.exec(t))!==null;)a.push(n);return a},Ro=re("HTMLFormElement"),Po=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,a,o){return a.toUpperCase()+o}),bn=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),Do=re("RegExp"),va=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),a={};ze(n,(o,r)=>{let s;(s=t(o,r,e))!==!1&&(a[r]=s||o)}),Object.defineProperties(e,a)},Oo=e=>{va(e,(t,n)=>{if(te(e)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const a=e[n];if(te(a)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},jo=(e,t)=>{const n={},a=o=>{o.forEach(r=>{n[r]=!0})};return Ae(e)?a(e):a(String(e).split(t)),n},qo=()=>{},No=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function Uo(e){return!!(e&&te(e.append)&&e[fa]==="FormData"&&e[Et])}const Ho=e=>{const t=new Array(10),n=(a,o)=>{if(Ke(a)){if(t.indexOf(a)>=0)return;if(Je(a))return a;if(!("toJSON"in a)){t[o]=a;const r=Ae(a)?[]:{};return ze(a,(s,i)=>{const c=n(s,o+1);!xe(c)&&(r[i]=c)}),t[o]=void 0,r}}return a};return n(e,0)},Fo=re("AsyncFunction"),Go=e=>e&&(Ke(e)||te(e))&&te(e.then)&&te(e.catch),Ea=((e,t)=>e?setImmediate:t?((n,a)=>(ge.addEventListener("message",({source:o,data:r})=>{o===ge&&r===n&&a.length&&a.shift()()},!1),o=>{a.push(o),ge.postMessage(n,"*")}))(`axios@${Math.random()}`,[]):n=>setTimeout(n))(typeof setImmediate=="function",te(ge.postMessage)),Vo=typeof queueMicrotask<"u"?queueMicrotask.bind(ge):typeof process<"u"&&process.nextTick||Ea,Jo=e=>e!=null&&te(e[Et]),m={isArray:Ae,isArrayBuffer:ba,isBuffer:Je,isFormData:ho,isArrayBufferView:ro,isString:so,isNumber:ka,isBoolean:io,isObject:Ke,isPlainObject:at,isEmptyObject:lo,isReadableStream:vo,isRequest:Eo,isResponse:wo,isHeaders:Bo,isUndefined:xe,isDate:co,isFile:uo,isReactNativeBlob:mo,isReactNative:po,isBlob:go,isRegExp:Do,isFunction:te,isStream:bo,isURLSearchParams:yo,isTypedArray:To,isFileList:fo,forEach:ze,merge:Nt,extend:_o,trim:Io,stripBOM:$o,inherits:So,toFlatObject:Co,kindOf:wt,kindOfTest:re,endsWith:xo,toArray:Lo,forEachEntry:Ao,matchAll:Mo,isHTMLForm:Ro,hasOwnProperty:bn,hasOwnProp:bn,reduceDescriptors:va,freezeMethods:Oo,toObjectSet:jo,toCamelCase:Po,noop:qo,toFiniteNumber:No,findKey:ha,global:ge,isContextDefined:ya,isSpecCompliantForm:Uo,toJSONObject:Ho,isAsyncFn:Fo,isThenable:Go,setImmediate:Ea,asap:Vo,isIterable:Jo};let S=class wa extends Error{static from(t,n,a,o,r,s){const i=new wa(t.message,n||t.code,a,o,r);return i.cause=t,i.name=t.name,t.status!=null&&i.status==null&&(i.status=t.status),s&&Object.assign(i,s),i}constructor(t,n,a,o,r){super(t),Object.defineProperty(this,"message",{value:t,enumerable:!0,writable:!0,configurable:!0}),this.name="AxiosError",this.isAxiosError=!0,n&&(this.code=n),a&&(this.config=a),o&&(this.request=o),r&&(this.response=r,this.status=r.status)}toJSON(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:m.toJSONObject(this.config),code:this.code,status:this.status}}};S.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";S.ERR_BAD_OPTION="ERR_BAD_OPTION";S.ECONNABORTED="ECONNABORTED";S.ETIMEDOUT="ETIMEDOUT";S.ERR_NETWORK="ERR_NETWORK";S.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";S.ERR_DEPRECATED="ERR_DEPRECATED";S.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";S.ERR_BAD_REQUEST="ERR_BAD_REQUEST";S.ERR_CANCELED="ERR_CANCELED";S.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";S.ERR_INVALID_URL="ERR_INVALID_URL";const Ko=null;function Ut(e){return m.isPlainObject(e)||m.isArray(e)}function Ba(e){return m.endsWith(e,"[]")?e.slice(0,-2):e}function Lt(e,t,n){return e?e.concat(t).map(function(o,r){return o=Ba(o),!n&&r?"["+o+"]":o}).join(n?".":""):t}function zo(e){return m.isArray(e)&&!e.some(Ut)}const Wo=m.toFlatObject(m,{},null,function(t){return/^is[A-Z]/.test(t)});function It(e,t,n){if(!m.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=m.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(k,b){return!m.isUndefined(b[k])});const a=n.metaTokens,o=n.visitor||l,r=n.dots,s=n.indexes,c=(n.Blob||typeof Blob<"u"&&Blob)&&m.isSpecCompliantForm(t);if(!m.isFunction(o))throw new TypeError("visitor must be a function");function d(f){if(f===null)return"";if(m.isDate(f))return f.toISOString();if(m.isBoolean(f))return f.toString();if(!c&&m.isBlob(f))throw new S("Blob is not supported. Use a Buffer instead.");return m.isArrayBuffer(f)||m.isTypedArray(f)?c&&typeof Blob=="function"?new Blob([f]):Buffer.from(f):f}function l(f,k,b){let h=f;if(m.isReactNative(t)&&m.isReactNativeBlob(f))return t.append(Lt(b,k,r),d(f)),!1;if(f&&!b&&typeof f=="object"){if(m.endsWith(k,"{}"))k=a?k:k.slice(0,-2),f=JSON.stringify(f);else if(m.isArray(f)&&zo(f)||(m.isFileList(f)||m.endsWith(k,"[]"))&&(h=m.toArray(f)))return k=Ba(k),h.forEach(function(E,T){!(m.isUndefined(E)||E===null)&&t.append(s===!0?Lt([k],T,r):s===null?k:k+"[]",d(E))}),!1}return Ut(f)?!0:(t.append(Lt(b,k,r),d(f)),!1)}const g=[],B=Object.assign(Wo,{defaultVisitor:l,convertValue:d,isVisitable:Ut});function R(f,k){if(!m.isUndefined(f)){if(g.indexOf(f)!==-1)throw Error("Circular reference detected in "+k.join("."));g.push(f),m.forEach(f,function(h,w){(!(m.isUndefined(h)||h===null)&&o.call(t,h,m.isString(w)?w.trim():w,k,B))===!0&&R(h,k?k.concat(w):[w])}),g.pop()}}if(!m.isObject(e))throw new TypeError("data must be an object");return R(e),t}function kn(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(a){return t[a]})}function Xt(e,t){this._pairs=[],e&&It(e,this,t)}const Ia=Xt.prototype;Ia.append=function(t,n){this._pairs.push([t,n])};Ia.toString=function(t){const n=t?function(a){return t.call(this,a,kn)}:kn;return this._pairs.map(function(o){return n(o[0])+"="+n(o[1])},"").join("&")};function Xo(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function _a(e,t,n){if(!t)return e;const a=n&&n.encode||Xo,o=m.isFunction(n)?{serialize:n}:n,r=o&&o.serialize;let s;if(r?s=r(t,o):s=m.isURLSearchParams(t)?t.toString():new Xt(t,o).toString(a),s){const i=e.indexOf("#");i!==-1&&(e=e.slice(0,i)),e+=(e.indexOf("?")===-1?"?":"&")+s}return e}class hn{constructor(){this.handlers=[]}use(t,n,a){return this.handlers.push({fulfilled:t,rejected:n,synchronous:a?a.synchronous:!1,runWhen:a?a.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){m.forEach(this.handlers,function(a){a!==null&&t(a)})}}const Zt={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0},Zo=typeof URLSearchParams<"u"?URLSearchParams:Xt,Qo=typeof FormData<"u"?FormData:null,Yo=typeof Blob<"u"?Blob:null,er={isBrowser:!0,classes:{URLSearchParams:Zo,FormData:Qo,Blob:Yo},protocols:["http","https","file","blob","url","data"]},Qt=typeof window<"u"&&typeof document<"u",Ht=typeof navigator=="object"&&navigator||void 0,tr=Qt&&(!Ht||["ReactNative","NativeScript","NS"].indexOf(Ht.product)<0),nr=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",ar=Qt&&window.location.href||"http://localhost",or=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:Qt,hasStandardBrowserEnv:tr,hasStandardBrowserWebWorkerEnv:nr,navigator:Ht,origin:ar},Symbol.toStringTag,{value:"Module"})),ee={...or,...er};function rr(e,t){return It(e,new ee.classes.URLSearchParams,{visitor:function(n,a,o,r){return ee.isNode&&m.isBuffer(n)?(this.append(a,n.toString("base64")),!1):r.defaultVisitor.apply(this,arguments)},...t})}function sr(e){return m.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function ir(e){const t={},n=Object.keys(e);let a;const o=n.length;let r;for(a=0;a<o;a++)r=n[a],t[r]=e[r];return t}function $a(e){function t(n,a,o,r){let s=n[r++];if(s==="__proto__")return!0;const i=Number.isFinite(+s),c=r>=n.length;return s=!s&&m.isArray(o)?o.length:s,c?(m.hasOwnProp(o,s)?o[s]=[o[s],a]:o[s]=a,!i):((!o[s]||!m.isObject(o[s]))&&(o[s]=[]),t(n,a,o[s],r)&&m.isArray(o[s])&&(o[s]=ir(o[s])),!i)}if(m.isFormData(e)&&m.isFunction(e.entries)){const n={};return m.forEachEntry(e,(a,o)=>{t(sr(a),o,n,0)}),n}return null}function dr(e,t,n){if(m.isString(e))try{return(t||JSON.parse)(e),m.trim(e)}catch(a){if(a.name!=="SyntaxError")throw a}return(n||JSON.stringify)(e)}const We={transitional:Zt,adapter:["xhr","http","fetch"],transformRequest:[function(t,n){const a=n.getContentType()||"",o=a.indexOf("application/json")>-1,r=m.isObject(t);if(r&&m.isHTMLForm(t)&&(t=new FormData(t)),m.isFormData(t))return o?JSON.stringify($a(t)):t;if(m.isArrayBuffer(t)||m.isBuffer(t)||m.isStream(t)||m.isFile(t)||m.isBlob(t)||m.isReadableStream(t))return t;if(m.isArrayBufferView(t))return t.buffer;if(m.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let i;if(r){if(a.indexOf("application/x-www-form-urlencoded")>-1)return rr(t,this.formSerializer).toString();if((i=m.isFileList(t))||a.indexOf("multipart/form-data")>-1){const c=this.env&&this.env.FormData;return It(i?{"files[]":t}:t,c&&new c,this.formSerializer)}}return r||o?(n.setContentType("application/json",!1),dr(t)):t}],transformResponse:[function(t){const n=this.transitional||We.transitional,a=n&&n.forcedJSONParsing,o=this.responseType==="json";if(m.isResponse(t)||m.isReadableStream(t))return t;if(t&&m.isString(t)&&(a&&!this.responseType||o)){const s=!(n&&n.silentJSONParsing)&&o;try{return JSON.parse(t,this.parseReviver)}catch(i){if(s)throw i.name==="SyntaxError"?S.from(i,S.ERR_BAD_RESPONSE,this,null,this.response):i}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:ee.classes.FormData,Blob:ee.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};m.forEach(["delete","get","head","post","put","patch"],e=>{We.headers[e]={}});const lr=m.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),cr=e=>{const t={};let n,a,o;return e&&e.split(`
`).forEach(function(s){o=s.indexOf(":"),n=s.substring(0,o).trim().toLowerCase(),a=s.substring(o+1).trim(),!(!n||t[n]&&lr[n])&&(n==="set-cookie"?t[n]?t[n].push(a):t[n]=[a]:t[n]=t[n]?t[n]+", "+a:a)}),t},yn=Symbol("internals");function Re(e){return e&&String(e).trim().toLowerCase()}function ot(e){return e===!1||e==null?e:m.isArray(e)?e.map(ot):String(e)}function ur(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let a;for(;a=n.exec(e);)t[a[1]]=a[2];return t}const mr=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function Tt(e,t,n,a,o){if(m.isFunction(a))return a.call(this,t,n);if(o&&(t=n),!!m.isString(t)){if(m.isString(a))return t.indexOf(a)!==-1;if(m.isRegExp(a))return a.test(t)}}function pr(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,a)=>n.toUpperCase()+a)}function gr(e,t){const n=m.toCamelCase(" "+t);["get","set","has"].forEach(a=>{Object.defineProperty(e,a+n,{value:function(o,r,s){return this[a].call(this,t,o,r,s)},configurable:!0})})}let ne=class{constructor(t){t&&this.set(t)}set(t,n,a){const o=this;function r(i,c,d){const l=Re(c);if(!l)throw new Error("header name must be a non-empty string");const g=m.findKey(o,l);(!g||o[g]===void 0||d===!0||d===void 0&&o[g]!==!1)&&(o[g||c]=ot(i))}const s=(i,c)=>m.forEach(i,(d,l)=>r(d,l,c));if(m.isPlainObject(t)||t instanceof this.constructor)s(t,n);else if(m.isString(t)&&(t=t.trim())&&!mr(t))s(cr(t),n);else if(m.isObject(t)&&m.isIterable(t)){let i={},c,d;for(const l of t){if(!m.isArray(l))throw TypeError("Object iterator must return a key-value pair");i[d=l[0]]=(c=i[d])?m.isArray(c)?[...c,l[1]]:[c,l[1]]:l[1]}s(i,n)}else t!=null&&r(n,t,a);return this}get(t,n){if(t=Re(t),t){const a=m.findKey(this,t);if(a){const o=this[a];if(!n)return o;if(n===!0)return ur(o);if(m.isFunction(n))return n.call(this,o,a);if(m.isRegExp(n))return n.exec(o);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=Re(t),t){const a=m.findKey(this,t);return!!(a&&this[a]!==void 0&&(!n||Tt(this,this[a],a,n)))}return!1}delete(t,n){const a=this;let o=!1;function r(s){if(s=Re(s),s){const i=m.findKey(a,s);i&&(!n||Tt(a,a[i],i,n))&&(delete a[i],o=!0)}}return m.isArray(t)?t.forEach(r):r(t),o}clear(t){const n=Object.keys(this);let a=n.length,o=!1;for(;a--;){const r=n[a];(!t||Tt(this,this[r],r,t,!0))&&(delete this[r],o=!0)}return o}normalize(t){const n=this,a={};return m.forEach(this,(o,r)=>{const s=m.findKey(a,r);if(s){n[s]=ot(o),delete n[r];return}const i=t?pr(r):String(r).trim();i!==r&&delete n[r],n[i]=ot(o),a[i]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return m.forEach(this,(a,o)=>{a!=null&&a!==!1&&(n[o]=t&&m.isArray(a)?a.join(", "):a)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const a=new this(t);return n.forEach(o=>a.set(o)),a}static accessor(t){const a=(this[yn]=this[yn]={accessors:{}}).accessors,o=this.prototype;function r(s){const i=Re(s);a[i]||(gr(o,s),a[i]=!0)}return m.isArray(t)?t.forEach(r):r(t),this}};ne.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);m.reduceDescriptors(ne.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(a){this[n]=a}}});m.freezeMethods(ne);function At(e,t){const n=this||We,a=t||n,o=ne.from(a.headers);let r=a.data;return m.forEach(e,function(i){r=i.call(n,r,o.normalize(),t?t.status:void 0)}),o.normalize(),r}function Sa(e){return!!(e&&e.__CANCEL__)}let Xe=class extends S{constructor(t,n,a){super(t??"canceled",S.ERR_CANCELED,n,a),this.name="CanceledError",this.__CANCEL__=!0}};function Ca(e,t,n){const a=n.config.validateStatus;!n.status||!a||a(n.status)?e(n):t(new S("Request failed with status code "+n.status,[S.ERR_BAD_REQUEST,S.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}function fr(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function br(e,t){e=e||10;const n=new Array(e),a=new Array(e);let o=0,r=0,s;return t=t!==void 0?t:1e3,function(c){const d=Date.now(),l=a[r];s||(s=d),n[o]=c,a[o]=d;let g=r,B=0;for(;g!==o;)B+=n[g++],g=g%e;if(o=(o+1)%e,o===r&&(r=(r+1)%e),d-s<t)return;const R=l&&d-l;return R?Math.round(B*1e3/R):void 0}}function kr(e,t){let n=0,a=1e3/t,o,r;const s=(d,l=Date.now())=>{n=l,o=null,r&&(clearTimeout(r),r=null),e(...d)};return[(...d)=>{const l=Date.now(),g=l-n;g>=a?s(d,l):(o=d,r||(r=setTimeout(()=>{r=null,s(o)},a-g)))},()=>o&&s(o)]}const it=(e,t,n=3)=>{let a=0;const o=br(50,250);return kr(r=>{const s=r.loaded,i=r.lengthComputable?r.total:void 0,c=s-a,d=o(c),l=s<=i;a=s;const g={loaded:s,total:i,progress:i?s/i:void 0,bytes:c,rate:d||void 0,estimated:d&&i&&l?(i-s)/d:void 0,event:r,lengthComputable:i!=null,[t?"download":"upload"]:!0};e(g)},n)},vn=(e,t)=>{const n=e!=null;return[a=>t[0]({lengthComputable:n,total:e,loaded:a}),t[1]]},En=e=>(...t)=>m.asap(()=>e(...t)),hr=ee.hasStandardBrowserEnv?((e,t)=>n=>(n=new URL(n,ee.origin),e.protocol===n.protocol&&e.host===n.host&&(t||e.port===n.port)))(new URL(ee.origin),ee.navigator&&/(msie|trident)/i.test(ee.navigator.userAgent)):()=>!0,yr=ee.hasStandardBrowserEnv?{write(e,t,n,a,o,r,s){if(typeof document>"u")return;const i=[`${e}=${encodeURIComponent(t)}`];m.isNumber(n)&&i.push(`expires=${new Date(n).toUTCString()}`),m.isString(a)&&i.push(`path=${a}`),m.isString(o)&&i.push(`domain=${o}`),r===!0&&i.push("secure"),m.isString(s)&&i.push(`SameSite=${s}`),document.cookie=i.join("; ")},read(e){if(typeof document>"u")return null;const t=document.cookie.match(new RegExp("(?:^|; )"+e+"=([^;]*)"));return t?decodeURIComponent(t[1]):null},remove(e){this.write(e,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function vr(e){return typeof e!="string"?!1:/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function Er(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function xa(e,t,n){let a=!vr(t);return e&&(a||n==!1)?Er(e,t):t}const wn=e=>e instanceof ne?{...e}:e;function be(e,t){t=t||{};const n={};function a(d,l,g,B){return m.isPlainObject(d)&&m.isPlainObject(l)?m.merge.call({caseless:B},d,l):m.isPlainObject(l)?m.merge({},l):m.isArray(l)?l.slice():l}function o(d,l,g,B){if(m.isUndefined(l)){if(!m.isUndefined(d))return a(void 0,d,g,B)}else return a(d,l,g,B)}function r(d,l){if(!m.isUndefined(l))return a(void 0,l)}function s(d,l){if(m.isUndefined(l)){if(!m.isUndefined(d))return a(void 0,d)}else return a(void 0,l)}function i(d,l,g){if(g in t)return a(d,l);if(g in e)return a(void 0,d)}const c={url:r,method:r,data:r,baseURL:s,transformRequest:s,transformResponse:s,paramsSerializer:s,timeout:s,timeoutMessage:s,withCredentials:s,withXSRFToken:s,adapter:s,responseType:s,xsrfCookieName:s,xsrfHeaderName:s,onUploadProgress:s,onDownloadProgress:s,decompress:s,maxContentLength:s,maxBodyLength:s,beforeRedirect:s,transport:s,httpAgent:s,httpsAgent:s,cancelToken:s,socketPath:s,responseEncoding:s,validateStatus:i,headers:(d,l,g)=>o(wn(d),wn(l),g,!0)};return m.forEach(Object.keys({...e,...t}),function(l){if(l==="__proto__"||l==="constructor"||l==="prototype")return;const g=m.hasOwnProp(c,l)?c[l]:o,B=g(e[l],t[l],l);m.isUndefined(B)&&g!==i||(n[l]=B)}),n}const La=e=>{const t=be({},e);let{data:n,withXSRFToken:a,xsrfHeaderName:o,xsrfCookieName:r,headers:s,auth:i}=t;if(t.headers=s=ne.from(s),t.url=_a(xa(t.baseURL,t.url,t.allowAbsoluteUrls),e.params,e.paramsSerializer),i&&s.set("Authorization","Basic "+btoa((i.username||"")+":"+(i.password?unescape(encodeURIComponent(i.password)):""))),m.isFormData(n)){if(ee.hasStandardBrowserEnv||ee.hasStandardBrowserWebWorkerEnv)s.setContentType(void 0);else if(m.isFunction(n.getHeaders)){const c=n.getHeaders(),d=["content-type","content-length"];Object.entries(c).forEach(([l,g])=>{d.includes(l.toLowerCase())&&s.set(l,g)})}}if(ee.hasStandardBrowserEnv&&(a&&m.isFunction(a)&&(a=a(t)),a||a!==!1&&hr(t.url))){const c=o&&r&&yr.read(r);c&&s.set(o,c)}return t},wr=typeof XMLHttpRequest<"u",Br=wr&&function(e){return new Promise(function(n,a){const o=La(e);let r=o.data;const s=ne.from(o.headers).normalize();let{responseType:i,onUploadProgress:c,onDownloadProgress:d}=o,l,g,B,R,f;function k(){R&&R(),f&&f(),o.cancelToken&&o.cancelToken.unsubscribe(l),o.signal&&o.signal.removeEventListener("abort",l)}let b=new XMLHttpRequest;b.open(o.method.toUpperCase(),o.url,!0),b.timeout=o.timeout;function h(){if(!b)return;const E=ne.from("getAllResponseHeaders"in b&&b.getAllResponseHeaders()),j={data:!i||i==="text"||i==="json"?b.responseText:b.response,status:b.status,statusText:b.statusText,headers:E,config:e,request:b};Ca(function(q){n(q),k()},function(q){a(q),k()},j),b=null}"onloadend"in b?b.onloadend=h:b.onreadystatechange=function(){!b||b.readyState!==4||b.status===0&&!(b.responseURL&&b.responseURL.indexOf("file:")===0)||setTimeout(h)},b.onabort=function(){b&&(a(new S("Request aborted",S.ECONNABORTED,e,b)),b=null)},b.onerror=function(T){const j=T&&T.message?T.message:"Network Error",F=new S(j,S.ERR_NETWORK,e,b);F.event=T||null,a(F),b=null},b.ontimeout=function(){let T=o.timeout?"timeout of "+o.timeout+"ms exceeded":"timeout exceeded";const j=o.transitional||Zt;o.timeoutErrorMessage&&(T=o.timeoutErrorMessage),a(new S(T,j.clarifyTimeoutError?S.ETIMEDOUT:S.ECONNABORTED,e,b)),b=null},r===void 0&&s.setContentType(null),"setRequestHeader"in b&&m.forEach(s.toJSON(),function(T,j){b.setRequestHeader(j,T)}),m.isUndefined(o.withCredentials)||(b.withCredentials=!!o.withCredentials),i&&i!=="json"&&(b.responseType=o.responseType),d&&([B,f]=it(d,!0),b.addEventListener("progress",B)),c&&b.upload&&([g,R]=it(c),b.upload.addEventListener("progress",g),b.upload.addEventListener("loadend",R)),(o.cancelToken||o.signal)&&(l=E=>{b&&(a(!E||E.type?new Xe(null,e,b):E),b.abort(),b=null)},o.cancelToken&&o.cancelToken.subscribe(l),o.signal&&(o.signal.aborted?l():o.signal.addEventListener("abort",l)));const w=fr(o.url);if(w&&ee.protocols.indexOf(w)===-1){a(new S("Unsupported protocol "+w+":",S.ERR_BAD_REQUEST,e));return}b.send(r||null)})},Ir=(e,t)=>{const{length:n}=e=e?e.filter(Boolean):[];if(t||n){let a=new AbortController,o;const r=function(d){if(!o){o=!0,i();const l=d instanceof Error?d:this.reason;a.abort(l instanceof S?l:new Xe(l instanceof Error?l.message:l))}};let s=t&&setTimeout(()=>{s=null,r(new S(`timeout of ${t}ms exceeded`,S.ETIMEDOUT))},t);const i=()=>{e&&(s&&clearTimeout(s),s=null,e.forEach(d=>{d.unsubscribe?d.unsubscribe(r):d.removeEventListener("abort",r)}),e=null)};e.forEach(d=>d.addEventListener("abort",r));const{signal:c}=a;return c.unsubscribe=()=>m.asap(i),c}},_r=function*(e,t){let n=e.byteLength;if(n<t){yield e;return}let a=0,o;for(;a<n;)o=a+t,yield e.slice(a,o),a=o},$r=async function*(e,t){for await(const n of Sr(e))yield*_r(n,t)},Sr=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:n,value:a}=await t.read();if(n)break;yield a}}finally{await t.cancel()}},Bn=(e,t,n,a)=>{const o=$r(e,t);let r=0,s,i=c=>{s||(s=!0,a&&a(c))};return new ReadableStream({async pull(c){try{const{done:d,value:l}=await o.next();if(d){i(),c.close();return}let g=l.byteLength;if(n){let B=r+=g;n(B)}c.enqueue(new Uint8Array(l))}catch(d){throw i(d),d}},cancel(c){return i(c),o.return()}},{highWaterMark:2})},In=64*1024,{isFunction:Ye}=m,Cr=(({Request:e,Response:t})=>({Request:e,Response:t}))(m.global),{ReadableStream:_n,TextEncoder:$n}=m.global,Sn=(e,...t)=>{try{return!!e(...t)}catch{return!1}},xr=e=>{e=m.merge.call({skipUndefined:!0},Cr,e);const{fetch:t,Request:n,Response:a}=e,o=t?Ye(t):typeof fetch=="function",r=Ye(n),s=Ye(a);if(!o)return!1;const i=o&&Ye(_n),c=o&&(typeof $n=="function"?(f=>k=>f.encode(k))(new $n):async f=>new Uint8Array(await new n(f).arrayBuffer())),d=r&&i&&Sn(()=>{let f=!1;const k=new n(ee.origin,{body:new _n,method:"POST",get duplex(){return f=!0,"half"}}).headers.has("Content-Type");return f&&!k}),l=s&&i&&Sn(()=>m.isReadableStream(new a("").body)),g={stream:l&&(f=>f.body)};o&&["text","arrayBuffer","blob","formData","stream"].forEach(f=>{!g[f]&&(g[f]=(k,b)=>{let h=k&&k[f];if(h)return h.call(k);throw new S(`Response type '${f}' is not supported`,S.ERR_NOT_SUPPORT,b)})});const B=async f=>{if(f==null)return 0;if(m.isBlob(f))return f.size;if(m.isSpecCompliantForm(f))return(await new n(ee.origin,{method:"POST",body:f}).arrayBuffer()).byteLength;if(m.isArrayBufferView(f)||m.isArrayBuffer(f))return f.byteLength;if(m.isURLSearchParams(f)&&(f=f+""),m.isString(f))return(await c(f)).byteLength},R=async(f,k)=>{const b=m.toFiniteNumber(f.getContentLength());return b??B(k)};return async f=>{let{url:k,method:b,data:h,signal:w,cancelToken:E,timeout:T,onDownloadProgress:j,onUploadProgress:F,responseType:q,headers:J,withCredentials:Q="same-origin",fetchOptions:P}=La(f),U=t||fetch;q=q?(q+"").toLowerCase():"text";let I=Ir([w,E&&E.toAbortSignal()],T),D=null;const z=I&&I.unsubscribe&&(()=>{I.unsubscribe()});let oe;try{if(F&&d&&b!=="get"&&b!=="head"&&(oe=await R(J,h))!==0){let de=new n(k,{method:"POST",body:h,duplex:"half"}),ve;if(m.isFormData(h)&&(ve=de.headers.get("content-type"))&&J.setContentType(ve),de.body){const[xt,Qe]=vn(oe,it(En(F)));h=Bn(de.body,In,xt,Qe)}}m.isString(Q)||(Q=Q?"include":"omit");const K=r&&"credentials"in n.prototype,Y={...P,signal:I,method:b.toUpperCase(),headers:J.normalize().toJSON(),body:h,duplex:"half",credentials:K?Q:void 0};D=r&&new n(k,Y);let W=await(r?U(D,P):U(k,Y));const ce=l&&(q==="stream"||q==="response");if(l&&(j||ce&&z)){const de={};["status","statusText","headers"].forEach(pn=>{de[pn]=W[pn]});const ve=m.toFiniteNumber(W.headers.get("content-length")),[xt,Qe]=j&&vn(ve,it(En(j),!0))||[];W=new a(Bn(W.body,In,xt,()=>{Qe&&Qe(),z&&z()}),de)}q=q||"text";let Ct=await g[m.findKey(g,q)||"text"](W,f);return!ce&&z&&z(),await new Promise((de,ve)=>{Ca(de,ve,{data:Ct,headers:ne.from(W.headers),status:W.status,statusText:W.statusText,config:f,request:D})})}catch(K){throw z&&z(),K&&K.name==="TypeError"&&/Load failed|fetch/i.test(K.message)?Object.assign(new S("Network Error",S.ERR_NETWORK,f,D,K&&K.response),{cause:K.cause||K}):S.from(K,K&&K.code,f,D,K&&K.response)}}},Lr=new Map,Ta=e=>{let t=e&&e.env||{};const{fetch:n,Request:a,Response:o}=t,r=[a,o,n];let s=r.length,i=s,c,d,l=Lr;for(;i--;)c=r[i],d=l.get(c),d===void 0&&l.set(c,d=i?new Map:xr(t)),l=d;return d};Ta();const Yt={http:Ko,xhr:Br,fetch:{get:Ta}};m.forEach(Yt,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const Cn=e=>`- ${e}`,Tr=e=>m.isFunction(e)||e===null||e===!1;function Ar(e,t){e=m.isArray(e)?e:[e];const{length:n}=e;let a,o;const r={};for(let s=0;s<n;s++){a=e[s];let i;if(o=a,!Tr(a)&&(o=Yt[(i=String(a)).toLowerCase()],o===void 0))throw new S(`Unknown adapter '${i}'`);if(o&&(m.isFunction(o)||(o=o.get(t))))break;r[i||"#"+s]=o}if(!o){const s=Object.entries(r).map(([c,d])=>`adapter ${c} `+(d===!1?"is not supported by the environment":"is not available in the build"));let i=n?s.length>1?`since :
`+s.map(Cn).join(`
`):" "+Cn(s[0]):"as no adapter specified";throw new S("There is no suitable adapter to dispatch the request "+i,"ERR_NOT_SUPPORT")}return o}const Aa={getAdapter:Ar,adapters:Yt};function Mt(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new Xe(null,e)}function xn(e){return Mt(e),e.headers=ne.from(e.headers),e.data=At.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),Aa.getAdapter(e.adapter||We.adapter,e)(e).then(function(a){return Mt(e),a.data=At.call(e,e.transformResponse,a),a.headers=ne.from(a.headers),a},function(a){return Sa(a)||(Mt(e),a&&a.response&&(a.response.data=At.call(e,e.transformResponse,a.response),a.response.headers=ne.from(a.response.headers))),Promise.reject(a)})}const Ma="1.13.6",_t={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{_t[e]=function(a){return typeof a===e||"a"+(t<1?"n ":" ")+e}});const Ln={};_t.transitional=function(t,n,a){function o(r,s){return"[Axios v"+Ma+"] Transitional option '"+r+"'"+s+(a?". "+a:"")}return(r,s,i)=>{if(t===!1)throw new S(o(s," has been removed"+(n?" in "+n:"")),S.ERR_DEPRECATED);return n&&!Ln[s]&&(Ln[s]=!0,console.warn(o(s," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(r,s,i):!0}};_t.spelling=function(t){return(n,a)=>(console.warn(`${a} is likely a misspelling of ${t}`),!0)};function Mr(e,t,n){if(typeof e!="object")throw new S("options must be an object",S.ERR_BAD_OPTION_VALUE);const a=Object.keys(e);let o=a.length;for(;o-- >0;){const r=a[o],s=t[r];if(s){const i=e[r],c=i===void 0||s(i,r,e);if(c!==!0)throw new S("option "+r+" must be "+c,S.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new S("Unknown option "+r,S.ERR_BAD_OPTION)}}const rt={assertOptions:Mr,validators:_t},ae=rt.validators;let fe=class{constructor(t){this.defaults=t||{},this.interceptors={request:new hn,response:new hn}}async request(t,n){try{return await this._request(t,n)}catch(a){if(a instanceof Error){let o={};Error.captureStackTrace?Error.captureStackTrace(o):o=new Error;const r=o.stack?o.stack.replace(/^.+\n/,""):"";try{a.stack?r&&!String(a.stack).endsWith(r.replace(/^.+\n.+\n/,""))&&(a.stack+=`
`+r):a.stack=r}catch{}}throw a}}_request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=be(this.defaults,n);const{transitional:a,paramsSerializer:o,headers:r}=n;a!==void 0&&rt.assertOptions(a,{silentJSONParsing:ae.transitional(ae.boolean),forcedJSONParsing:ae.transitional(ae.boolean),clarifyTimeoutError:ae.transitional(ae.boolean),legacyInterceptorReqResOrdering:ae.transitional(ae.boolean)},!1),o!=null&&(m.isFunction(o)?n.paramsSerializer={serialize:o}:rt.assertOptions(o,{encode:ae.function,serialize:ae.function},!0)),n.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?n.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:n.allowAbsoluteUrls=!0),rt.assertOptions(n,{baseUrl:ae.spelling("baseURL"),withXsrfToken:ae.spelling("withXSRFToken")},!0),n.method=(n.method||this.defaults.method||"get").toLowerCase();let s=r&&m.merge(r.common,r[n.method]);r&&m.forEach(["delete","get","head","post","put","patch","common"],f=>{delete r[f]}),n.headers=ne.concat(s,r);const i=[];let c=!0;this.interceptors.request.forEach(function(k){if(typeof k.runWhen=="function"&&k.runWhen(n)===!1)return;c=c&&k.synchronous;const b=n.transitional||Zt;b&&b.legacyInterceptorReqResOrdering?i.unshift(k.fulfilled,k.rejected):i.push(k.fulfilled,k.rejected)});const d=[];this.interceptors.response.forEach(function(k){d.push(k.fulfilled,k.rejected)});let l,g=0,B;if(!c){const f=[xn.bind(this),void 0];for(f.unshift(...i),f.push(...d),B=f.length,l=Promise.resolve(n);g<B;)l=l.then(f[g++],f[g++]);return l}B=i.length;let R=n;for(;g<B;){const f=i[g++],k=i[g++];try{R=f(R)}catch(b){k.call(this,b);break}}try{l=xn.call(this,R)}catch(f){return Promise.reject(f)}for(g=0,B=d.length;g<B;)l=l.then(d[g++],d[g++]);return l}getUri(t){t=be(this.defaults,t);const n=xa(t.baseURL,t.url,t.allowAbsoluteUrls);return _a(n,t.params,t.paramsSerializer)}};m.forEach(["delete","get","head","options"],function(t){fe.prototype[t]=function(n,a){return this.request(be(a||{},{method:t,url:n,data:(a||{}).data}))}});m.forEach(["post","put","patch"],function(t){function n(a){return function(r,s,i){return this.request(be(i||{},{method:t,headers:a?{"Content-Type":"multipart/form-data"}:{},url:r,data:s}))}}fe.prototype[t]=n(),fe.prototype[t+"Form"]=n(!0)});let Rr=class Ra{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(r){n=r});const a=this;this.promise.then(o=>{if(!a._listeners)return;let r=a._listeners.length;for(;r-- >0;)a._listeners[r](o);a._listeners=null}),this.promise.then=o=>{let r;const s=new Promise(i=>{a.subscribe(i),r=i}).then(o);return s.cancel=function(){a.unsubscribe(r)},s},t(function(r,s,i){a.reason||(a.reason=new Xe(r,s,i),n(a.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}toAbortSignal(){const t=new AbortController,n=a=>{t.abort(a)};return this.subscribe(n),t.signal.unsubscribe=()=>this.unsubscribe(n),t.signal}static source(){let t;return{token:new Ra(function(o){t=o}),cancel:t}}};function Pr(e){return function(n){return e.apply(null,n)}}function Dr(e){return m.isObject(e)&&e.isAxiosError===!0}const Ft={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(Ft).forEach(([e,t])=>{Ft[t]=e});function Pa(e){const t=new fe(e),n=ga(fe.prototype.request,t);return m.extend(n,fe.prototype,t,{allOwnKeys:!0}),m.extend(n,t,null,{allOwnKeys:!0}),n.create=function(o){return Pa(be(e,o))},n}const X=Pa(We);X.Axios=fe;X.CanceledError=Xe;X.CancelToken=Rr;X.isCancel=Sa;X.VERSION=Ma;X.toFormData=It;X.AxiosError=S;X.Cancel=X.CanceledError;X.all=function(t){return Promise.all(t)};X.spread=Pr;X.isAxiosError=Dr;X.mergeConfig=be;X.AxiosHeaders=ne;X.formToJSON=e=>$a(m.isHTMLForm(e)?new FormData(e):e);X.getAdapter=Aa.getAdapter;X.HttpStatusCode=Ft;X.default=X;const{Axios:Ed,AxiosError:wd,CanceledError:Bd,isCancel:Id,CancelToken:_d,VERSION:$d,all:Sd,Cancel:Cd,isAxiosError:xd,spread:Ld,toFormData:Td,AxiosHeaders:Ad,HttpStatusCode:Md,formToJSON:Rd,getAdapter:Pd,mergeConfig:Dd}=X;window.axios=X;window.axios.defaults.headers.common["X-Requested-With"]="XMLHttpRequest";const en="transit_user",le="transit_token",Gt="transit_pending_toast";function Me(){try{return typeof window<"u"&&typeof window.localStorage<"u"}catch{return!1}}function Da(){try{return typeof window<"u"&&typeof window.sessionStorage<"u"}catch{return!1}}function Or(){if(window.transitAuthUser)return window.transitAuthUser;if(!Me())return null;const e=window.localStorage.getItem(en);if(!e)return null;try{return JSON.parse(e)}catch{return Ue(),null}}function Oa(e){if(!Me()){window.transitAuthUser=e;return}window.transitAuthUser=e,window.localStorage.setItem(en,JSON.stringify(e))}function jr(){if(!Me()){window.transitAuthUser=null;return}window.transitAuthUser=null,window.localStorage.removeItem(en)}function tn(){return typeof window<"u"&&typeof window.transitAuthToken=="string"&&window.transitAuthToken!==""?window.transitAuthToken:Me()?window.localStorage.getItem(le):null}function qr(e){const t=typeof e=="string"?e:"";if(!Me()){window.transitAuthToken=t||null;return}if(window.transitAuthToken=t||null,t===""){window.localStorage.removeItem(le),document.cookie=le+"=; path=/; max-age=0; samesite=lax";return}window.localStorage.setItem(le,t),document.cookie=le+"="+t+"; path=/; max-age=86400; samesite=lax"}function Nr(){if(!Me()){window.transitAuthToken=null,document.cookie=le+"=; path=/; max-age=0; samesite=lax";return}window.transitAuthToken=null,window.localStorage.removeItem(le),document.cookie=le+"=; path=/; max-age=0; samesite=lax"}function Ur(e){Da()&&window.sessionStorage.setItem(Gt,JSON.stringify(e))}function Hr(){if(!Da())return null;const e=window.sessionStorage.getItem(Gt);if(!e)return null;window.sessionStorage.removeItem(Gt);try{return JSON.parse(e)}catch{return null}}function Ue(){jr(),Nr()}function ja(e,t){if(!e)return t;if(typeof e.detail=="string"&&e.detail!=="")return e.detail;if(typeof e.message=="string"&&e.message!=="")return e.message;if(e.errors&&typeof e.errors=="object"){const n=Object.values(e.errors).flat()[0];if(typeof n=="string"&&n!=="")return n}return t}function Tn(){return document.body.dataset.apiBase||"/api"}function qa(e=""){const t=String(e).replace(/^\/+/,"");return t===""?Tn():`${Tn()}/${t}`}async function v(e,t={}){const{method:n="GET",body:a=null,headers:o={},auth:r=!0}=t,s=new Headers(o);s.set("Accept","application/json"),s.set("X-Requested-With","XMLHttpRequest");let i=a;if(a&&!(a instanceof FormData)&&!(a instanceof Blob)&&(s.set("Content-Type","application/json"),i=JSON.stringify(a)),r){const g=tn();g&&s.set("Authorization",`Bearer ${g}`)}if(!["GET","HEAD","OPTIONS"].includes(n.toUpperCase())){const g=document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");g&&s.set("X-CSRF-TOKEN",g)}const c=await fetch(qa(e),{method:n,headers:s,body:i,credentials:"same-origin"});let d=null;const l=c.headers.get("content-type")||"";if(c.status!==204&&(d=l.includes("application/json")?await c.json():await c.text()),!c.ok){c.status===401&&(Ue(),(document.body.dataset.routeGuard||"none")==="protected"&&window.location.replace(document.body.dataset.loginUrl||"/login"));const g=ja(d,`Request gagal (${c.status})`),B=new Error(g);throw B.status=c.status,B.data=d,B}return d}async function nn(e,t="export.csv"){const n=new Headers({Accept:"text/csv,application/octet-stream","X-Requested-With":"XMLHttpRequest"}),a=tn();a&&n.set("Authorization",`Bearer ${a}`);const o=await fetch(qa(e),{method:"GET",headers:n,credentials:"same-origin"});if(!o.ok){let g=null;throw(o.headers.get("content-type")||"").includes("application/json")&&(g=await o.json()),new Error(ja(g,"Gagal mengunduh file"))}const r=await o.blob(),c=(o.headers.get("content-disposition")||"").match(/filename="?([^"]+)"?/i)?.[1]||t,d=window.URL.createObjectURL(r),l=document.createElement("a");l.href=d,l.download=c,document.body.appendChild(l),l.click(),l.remove(),window.URL.revokeObjectURL(d)}function Pe(e,t){const n=document.getElementById(e);n&&(n.textContent=t)}function Fr(e){const t=e?.role||"";document.querySelectorAll("[data-role-scope]").forEach(n=>{const a=n.dataset.roleScope,o=a==="admin"?["Super Admin","Admin"].includes(t):a==="super"?t==="Super Admin":!0;n.hidden=!o})}function Na(){return Or()}function dt(e){if(Fr(e),!e)return;const t=e.nama||"Admin",n=t.trim().split(/\s+/)[0]||"Admin",a=e.email||"admin@pekanbaru.com";Pe("sidebar-user-name",t),Pe("sidebar-user-email",a),Pe("header-user-name",n),Pe("dropdown-user-name",t),Pe("dropdown-user-email",a)}function Ua(e){return typeof e.access_token=="string"&&e.access_token!==""&&qr(e.access_token),Oa(e.user),dt(e.user),e}async function Gr(e){const t=await v("/auth/login",{method:"POST",body:e,auth:!1});return Ua(t)}async function Vr(e){const t=await v("/auth/register",{method:"POST",body:e,auth:!1});return Ua(t)}async function An(){const e=await v("/auth/me");return Oa(e),dt(e),e}async function Jr(){try{await v("/auth/logout",{method:"POST"})}catch(e){if(e?.status!==401)throw e}Ue(),Ur({type:"success",title:"Logout berhasil",message:"Sampai jumpa kembali!"}),window.location.replace(document.body.dataset.loginUrl||"/login")}function Mn(e){window.location.replace(e)}async function Kr(){const e=document.body.dataset.routeGuard||"none",t=document.body.dataset.loginUrl||"/login",n=document.body.dataset.dashboardUrl||"/dashboard",a=Na();if(e==="public"){try{const o=await An();return Mn(n),{user:o}}catch{(a||tn())&&Ue()}return{user:null}}if(e==="protected")try{return{user:await An()}}catch{return Ue(),Mn(t),{user:null}}return{user:a}}function an(){return Array.from(document.querySelectorAll(".modal-shell")).filter(e=>!e.hidden)}function Ha(){document.body.style.overflow=an().length>0?"hidden":""}function N(e){const t=document.getElementById(e);t&&(t.hidden=!1,Ha())}function Z(e=null){if(e){const t=document.getElementById(e);t&&(t.hidden=!0)}else an().forEach(t=>{t.hidden=!0});Ha()}function zr(){document.addEventListener("click",e=>{const t=e.target.closest("[data-modal-open]");if(t){N(t.dataset.modalOpen);return}const n=e.target.closest("[data-modal-close]");if(n){const a=n.dataset.modalClose||n.closest(".modal-shell")?.id;Z(a||void 0)}}),document.addEventListener("keydown",e=>{if(e.key!=="Escape")return;const t=an().pop();t&&Z(t.id)})}function on(e,t,n){const a=document.getElementById("transit-toast-root");if(!a)return;const o=document.createElement("div");o.className=`transit-toast ${n==="error"?"is-error":""} ${n==="info"?"is-info":""}`.trim(),o.innerHTML=`
        <div>
            <strong>${e}</strong>
            <p>${t}</p>
        </div>
    `,a.appendChild(o),window.requestAnimationFrame(()=>{o.classList.add("is-visible")}),window.setTimeout(()=>{o.classList.remove("is-visible"),window.setTimeout(()=>o.remove(),180)},3600)}function H(e,t="Berhasil"){on(t,e,"success")}function y(e,t="Gagal"){on(t,e,"error")}function Rt(e){return e?.status===409&&e?.data?.error==="booking_version_conflict"?(y("Booking diubah oleh admin lain. Halaman akan refresh otomatis dalam 3 detik...","Perubahan Terdeteksi"),setTimeout(function(){window.location.reload()},3e3),!0):!1}function Wr(e,t="Info"){on(t,e,"info")}function De(e){const t=document.querySelector("[data-sidebar]"),n=document.querySelector("[data-sidebar-overlay]");!t||!n||(t.classList.toggle("is-open",e),n.hidden=!e)}function st(e=null){document.querySelectorAll("[data-user-dropdown]").forEach(t=>{if(e&&t===e)return;t.classList.remove("is-open");const n=t.querySelector("[data-user-menu-trigger]"),a=t.querySelector("[data-user-menu-panel]");n&&n.setAttribute("aria-expanded","false"),a&&(a.hidden=!0)})}function Xr(e,t=null){if(!e)return;const n=e.querySelector("[data-user-menu-trigger]"),a=e.querySelector("[data-user-menu-panel]"),o=t??!e.classList.contains("is-open");st(o?e:null),e.classList.toggle("is-open",o),n&&n.setAttribute("aria-expanded",o?"true":"false"),a&&(a.hidden=!o)}function Zr(){document.querySelector("[data-sidebar-open]")?.addEventListener("click",()=>{De(!0)}),document.querySelector("[data-sidebar-close]")?.addEventListener("click",()=>{De(!1)}),document.querySelector("[data-sidebar-overlay]")?.addEventListener("click",()=>{De(!1)}),document.querySelectorAll("[data-user-dropdown]").forEach(e=>{e.querySelector("[data-user-menu-trigger]")?.addEventListener("click",t=>{t.stopPropagation(),Xr(e)})}),document.addEventListener("click",e=>{e.target.closest("[data-user-dropdown]")||st()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&(st(),De(!1))}),window.addEventListener("resize",()=>{window.innerWidth>1100&&De(!1)}),document.querySelectorAll("[data-auth-logout]").forEach(e=>{e.addEventListener("click",async()=>{Z(),st();try{e.disabled=!0,await Jr()}catch(t){e.disabled=!1,y(t.message||"Gagal logout")}})})}const Fa={login:{title:"Selamat Datang!",description:"Masuk ke akun Anda untuk melanjutkan",submit:"Masuk",switchText:"Belum punya akun?",switchAction:"Daftar sekarang"},register:{title:"Buat Akun Baru",description:"Daftar untuk mulai menggunakan sistem",submit:"Daftar",switchText:"Sudah punya akun?",switchAction:"Masuk"}};function Rn(e,t){const n=Fa[e];t.form.dataset.authMode=e,t.title.textContent=n.title,t.description.textContent=n.description,t.submitText.textContent=n.submit,t.switchText&&(t.switchText.textContent=n.switchText),t.switchButton&&(t.switchButton.textContent=n.switchAction),t.nameField.hidden=e!=="register",t.nameInput.required=e==="register"}function Qr(){const e=document.getElementById("auth-form");if(!e)return;const t={form:e,title:document.querySelector("[data-auth-title]"),description:document.querySelector("[data-auth-description]"),submitText:document.querySelector("[data-auth-submit-text]"),switchText:document.querySelector("[data-auth-switch-text]"),switchButton:document.querySelector("[data-toggle-auth-mode]"),nameField:document.getElementById("auth-name-field"),nameInput:document.getElementById("nama"),emailInput:document.getElementById("email"),passwordInput:document.getElementById("password"),passwordToggle:document.querySelector("[data-toggle-password]"),submitButton:document.getElementById("auth-submit-button")},n=document.body.dataset.dashboardUrl||"/dashboard";Rn("login",t),t.switchButton?.addEventListener("click",()=>{const a=t.form.dataset.authMode==="login"?"register":"login";Rn(a,t)}),t.passwordToggle?.addEventListener("click",()=>{const a=t.passwordInput.type==="password"?"text":"password";t.passwordInput.type=a,t.passwordToggle.textContent=a==="password"?"Lihat":"Sembunyikan"}),e.addEventListener("submit",async a=>{a.preventDefault();const o=new FormData(e),r=e.dataset.authMode||"login",s={email:String(o.get("email")||"").trim(),password:String(o.get("password")||"").trim()};r==="register"&&(s.nama=String(o.get("nama")||"").trim()),t.submitButton.disabled=!0,t.submitText.textContent=r==="login"?"Memproses...":"Mendaftarkan...";try{r==="login"?(await Gr(s),H("Selamat datang kembali","Login berhasil!")):(await Vr(s),H("Akun Anda telah dibuat","Registrasi berhasil!")),window.location.replace(n)}catch(i){y(i.message||"Terjadi kesalahan",r==="login"?"Login gagal":"Registrasi gagal")}finally{t.submitButton.disabled=!1,t.submitText.textContent=Fa[r].submit}})}const Yr=new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}),es=new Intl.NumberFormat("id-ID");function V(e){return Yr.format(Number(e)||0)}function O(e){return es.format(Number(e)||0)}function u(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function he(e,t=300){let n=null;return(...a)=>{window.clearTimeout(n),n=window.setTimeout(()=>e(...a),t)}}function ye(e,t,n,a){if(n===0||a===0)return"Menampilkan 0 - 0 dari 0 data";const o=(e-1)*t+1,r=o+a-1;return`Menampilkan ${o} - ${r} dari ${n} data`}function ts(e){if(!e)return"-";const t=new Date(e);return Number.isNaN(t.getTime())?e:new Intl.DateTimeFormat("id-ID",{day:"2-digit",month:"short",year:"numeric"}).format(t)}function Ze(){return new Date().toISOString().slice(0,10)}function se(e,t,n="Memproses..."){e&&(e.dataset.defaultText||(e.dataset.defaultText=e.textContent.trim()),e.disabled=t,e.textContent=t?n:e.dataset.defaultText)}const lt=["#059669","#10B981","#34D399","#6EE7B7","#A7F3D0"],ie={revenueChart:null,passengerChart:null,mobilChart:null};function ns(){const e=document.getElementById("dashboard-initial-state");if(!e)return{stats:{},revenueData:[],mobilRevenue:[]};try{return JSON.parse(e.textContent||"{}")}catch{return{stats:{},revenueData:[],mobilRevenue:[]}}}function rn(e){e&&typeof e.destroy=="function"&&e.destroy()}function as(e,t){const n=document.querySelector(`[data-stat="${e}"]`);if(!n)return;const a=["total_uang_bersih","total_uang_pc"];n.textContent=a.includes(e)?V(t):O(t)}function Ga(e,t,n){const a=document.getElementById(e),o=document.getElementById(t);a&&(a.hidden=!n),o&&(o.hidden=n)}function os(){return"#065f46"}function Vt(){return"#d1fae5"}function sn(){return{backgroundColor:"#ffffff",titleColor:"#064e3b",bodyColor:"#065f46",borderColor:"#d1fae5",borderWidth:1,padding:12,cornerRadius:12,displayColors:!0}}function rs(e){const t=document.getElementById("dashboard-revenue-chart"),n=Array.isArray(e)&&e.length>0;if(Ga("dashboard-revenue-chart","dashboard-revenue-empty",n),rn(ie.revenueChart),!t||!window.Chart||!n){ie.revenueChart=null;return}ie.revenueChart=new window.Chart(t,{type:"line",data:{labels:e.map(a=>a.bulan),datasets:[{label:"Pendapatan Bersih",data:e.map(a=>a.uang_bersih),borderColor:"#059669",backgroundColor:"rgba(5, 150, 105, 0.08)",fill:!1,tension:.35,pointRadius:4,pointHoverRadius:5,pointBackgroundColor:"#059669",pointBorderColor:"#ffffff",pointBorderWidth:2,borderWidth:3},{label:"Uang PC",data:e.map(a=>a.uang_pc),borderColor:"#f59e0b",backgroundColor:"rgba(245, 158, 11, 0.1)",fill:!1,tension:.35,pointRadius:4,pointHoverRadius:5,pointBackgroundColor:"#f59e0b",pointBorderColor:"#ffffff",pointBorderWidth:2,borderWidth:3}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{labels:{color:os(),usePointStyle:!0,pointStyle:"circle",boxWidth:8,boxHeight:8,padding:18}},tooltip:{...sn(),callbacks:{label(a){return`${a.dataset.label}: ${V(a.parsed.y)}`}}}},scales:{x:{ticks:{color:"#047857",font:{size:12}},grid:{color:Vt()},border:{display:!1}},y:{ticks:{color:"#047857",font:{size:12},callback(a){return`${Math.round(Number(a)/1e6)}jt`}},grid:{color:Vt()},border:{display:!1}}}}})}function ss(e){const t=document.getElementById("dashboard-passenger-chart"),n=Array.isArray(e)&&e.length>0;if(Ga("dashboard-passenger-chart","dashboard-passenger-empty",n),rn(ie.passengerChart),!t||!window.Chart||!n){ie.passengerChart=null;return}ie.passengerChart=new window.Chart(t,{type:"bar",data:{labels:e.map(a=>a.bulan),datasets:[{label:"Penumpang",data:e.map(a=>a.penumpang),backgroundColor:"#10B981",borderRadius:8,maxBarThickness:44}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{...sn(),callbacks:{label(a){return`Penumpang: ${O(a.parsed.y)}`}}}},scales:{x:{ticks:{color:"#047857",font:{size:12}},grid:{color:"rgba(0, 0, 0, 0)"},border:{display:!1}},y:{ticks:{color:"#047857",font:{size:12}},grid:{color:Vt()},border:{display:!1}}}}})}function is(e){const t=document.getElementById("dashboard-mobil-list");t&&(t.innerHTML=e.map((n,a)=>`
        <div class="dashboard-mobil-item">
            <div class="dashboard-mobil-meta">
                <span class="dashboard-mobil-dot" style="background-color: ${lt[a%lt.length]}"></span>
                <div>
                    <p class="dashboard-mobil-code">${u(n.kode_mobil)}</p>
                    <p class="dashboard-mobil-trips">${O(n.total_trips)} trip</p>
                    <p class="dashboard-mobil-passengers">${O(n.total_penumpang)} penumpang</p>
                </div>
            </div>
            <p class="dashboard-mobil-value">${V(n.total_uang_bersih)}</p>
        </div>
    `).join(""))}function ds(e){const t=document.getElementById("dashboard-mobil-chart"),n=document.getElementById("dashboard-mobil-content"),a=document.getElementById("dashboard-mobil-empty"),o=document.getElementById("dashboard-mobil-chart-empty"),r=document.getElementById("dashboard-mobil-list"),s=Array.isArray(e)&&e.length>0,i=s&&e.some(c=>Number(c.total_uang_bersih)>0);if(rn(ie.mobilChart),n&&(n.hidden=!s),a&&(a.hidden=s),t&&(t.hidden=!i),o&&(o.hidden=i),s?is(e):r&&(r.innerHTML=""),!t||!window.Chart||!i){ie.mobilChart=null;return}ie.mobilChart=new window.Chart(t,{type:"doughnut",data:{labels:e.map(c=>c.kode_mobil),datasets:[{data:e.map(c=>c.total_uang_bersih),backgroundColor:e.map((c,d)=>lt[d%lt.length]),borderColor:"#ffffff",borderWidth:6,hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"58%",plugins:{legend:{display:!1},tooltip:{...sn(),callbacks:{label(c){const d=e[c.dataIndex]||{};return`${c.label}: ${V(c.parsed)} / ${O(d.total_penumpang||0)} penumpang`}}}}}})}function Pn(e){Object.entries(e.stats||{}).forEach(([t,n])=>as(t,n)),rs(e.revenueData||[]),ss(e.revenueData||[]),ds(e.mobilRevenue||[])}async function ls(){const[e,t,n]=await Promise.all([v("/statistics/dashboard"),v("/statistics/revenue-chart"),v("/statistics/mobil-revenue")]);return{stats:e,revenueData:t,mobilRevenue:n}}function Dn(e){const t=document.querySelector("[data-dashboard-loading]"),n=document.querySelector("[data-dashboard-content]"),a=document.getElementById("dashboard-refresh-btn");t&&(t.hidden=!e),n&&(n.hidden=e),a&&(a.disabled=e)}async function cs(){const e=document.getElementById("dashboard-refresh-btn");e&&(Pn(ns()),e.addEventListener("click",async()=>{Dn(!0);try{Pn(await ls())}catch{y("Silakan coba lagi","Gagal memuat data")}finally{Dn(!1)}}))}const M={data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1},Le=10;function us(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function ms(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 21C15 17.4 18 14.4 18 10.5C18 7.18629 15.3137 4.5 12 4.5C8.68629 4.5 6 7.18629 6 10.5C6 14.4 9 17.4 12 21Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
            <circle cx="12" cy="10.5" r="2.25" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function ps(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
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
    `}function ct(e){const t=document.getElementById("driver-submit-btn");M.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":M.editItem?"Perbarui":"Simpan")}function fs(){const e=document.getElementById("drivers-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="drivers-table-state">
                <div class="drivers-loading-inline">
                    <span class="drivers-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function bs(){const e=document.getElementById("drivers-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="drivers-table-state drivers-empty-copy">
                Belum ada data driver
            </td>
        </tr>
    `)}function On(){const e=document.getElementById("drivers-table-body");if(e){if(M.loading){fs();return}if(M.data.length===0){bs();return}e.innerHTML=M.data.map((t,n)=>`
        <tr class="drivers-row" data-testid="driver-row-${t.id}">
            <td class="drivers-index-cell">${(M.page-1)*Le+n+1}</td>
            <td>
                <div class="drivers-user-cell">
                    <span class="drivers-user-avatar" aria-hidden="true">
                        ${us()}
                    </span>
                    <span class="drivers-user-name">${u(t.nama)}</span>
                </div>
            </td>
            <td>
                <div class="drivers-location-cell">
                    <span class="drivers-location-icon" aria-hidden="true">${ms()}</span>
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
                        ${ps()}
                    </button>
                    <button
                        class="drivers-icon-button drivers-icon-button-danger"
                        type="button"
                        data-driver-delete="${t.id}"
                        data-driver-name="${u(t.nama)}"
                        data-testid="delete-driver-${t.id}"
                        aria-label="Hapus driver ${u(t.nama)}"
                    >
                        ${gs()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function jn(){const e=document.getElementById("drivers-pagination-shell"),t=document.getElementById("drivers-pagination-info"),n=document.getElementById("drivers-pagination-page"),a=document.getElementById("drivers-prev-page-btn"),o=document.getElementById("drivers-next-page-btn"),r=Math.max(1,Math.ceil(M.totalCount/Le));e&&(e.hidden=r<=1),t&&(t.textContent=ye(M.page,Le,M.totalCount,M.data.length)),n&&(n.textContent=`${M.page} / ${r}`),a&&(a.disabled=M.page===1),o&&(o.disabled=M.page>=r)}async function Ee(){M.loading=!0,On(),jn();try{const[e,t]=await Promise.all([v(`/drivers?page=${M.page}&limit=${Le}${M.search?`&search=${encodeURIComponent(M.search)}`:""}`),v(`/drivers/count${M.search?`?search=${encodeURIComponent(M.search)}`:""}`)]);M.data=Array.isArray(e)?e:[],M.totalCount=Number(t.count||0)}finally{M.loading=!1,On(),jn()}}function qn(){const e=document.getElementById("driver-form"),t=document.getElementById("driver-form-title"),n=document.getElementById("driver-form-description"),a=document.getElementById("driver-id"),o=document.getElementById("driver-nama"),r=document.getElementById("driver-lokasi");e?.reset(),a&&(a.value=""),o&&(o.value=""),r&&(r.value=""),t&&(t.textContent="Tambah Driver Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan data driver"),M.editItem=null,ct(!1)}function ks(e){const t=document.getElementById("driver-form-title"),n=document.getElementById("driver-form-description"),a=document.getElementById("driver-id"),o=document.getElementById("driver-nama"),r=document.getElementById("driver-lokasi");M.editItem=e,a&&(a.value=e.id),o&&(o.value=e.nama),r&&(r.value=e.lokasi),t&&(t.textContent="Edit Data Driver"),n&&(n.textContent="Isi form di bawah untuk memperbarui data driver"),ct(!1)}async function hs(e){const t=await v(`/drivers/${e}`);ks(t),N("driver-form-modal")}function ys(e){const t=document.getElementById("driver-delete-copy");M.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus driver <strong>${u(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`),N("driver-delete-modal")}function vs(){const e=document.getElementById("drivers-add-btn"),t=document.getElementById("drivers-export-btn"),n=document.getElementById("drivers-search-input"),a=document.getElementById("driver-form"),o=document.getElementById("drivers-table-body"),r=document.getElementById("driver-delete-confirm-btn"),s=document.getElementById("drivers-prev-page-btn"),i=document.getElementById("drivers-next-page-btn");if(!(!e||!a||!o))return e.addEventListener("click",()=>{qn(),N("driver-form-modal")}),t?.addEventListener("click",()=>{nn("/export/drivers/csv","drivers.csv").catch(()=>{y("Gagal mengunduh file")})}),n?.addEventListener("input",he(async c=>{M.search=c.target.value.trim(),M.page=1;try{await Ee()}catch{y("Gagal memuat data")}})),a.addEventListener("submit",async c=>{c.preventDefault();const d={nama:document.getElementById("driver-nama")?.value.trim()||"",lokasi:document.getElementById("driver-lokasi")?.value.trim()||""};ct(!0);try{M.editItem?(await v(`/drivers/${M.editItem.id}`,{method:"PUT",body:d}),H("Data driver berhasil diperbarui")):(await v("/drivers",{method:"POST",body:d}),H("Driver berhasil ditambahkan")),Z("driver-form-modal"),qn(),await Ee()}catch(l){y(l.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{ct(!1)}}),o.addEventListener("click",async c=>{const d=c.target.closest("[data-driver-edit]"),l=c.target.closest("[data-driver-delete]");try{if(d){await hs(d.dataset.driverEdit);return}l&&ys({id:l.dataset.driverDelete,nama:l.dataset.driverName})}catch{y("Gagal memuat data")}}),r?.addEventListener("click",async()=>{if(M.deleteItem)try{await v(`/drivers/${M.deleteItem.id}`,{method:"DELETE"}),H("Driver berhasil dihapus"),Z("driver-delete-modal"),(M.page-1)*Le>=M.totalCount-1&&M.page>1&&(M.page-=1),M.deleteItem=null,await Ee()}catch{y("Gagal menghapus data")}}),s?.addEventListener("click",async()=>{if(!(M.page<=1)){M.page-=1;try{await Ee()}catch{y("Gagal memuat data")}}}),i?.addEventListener("click",async()=>{const c=Math.max(1,Math.ceil(M.totalCount/Le));if(!(M.page>=c)){M.page+=1;try{await Ee()}catch{y("Gagal memuat data")}}}),Ee().catch(()=>{y("Gagal memuat data")})}const _={data:[],loading:!0,totalCount:0,page:1,search:"",filterJenis:"",editItem:null,deleteItem:null,isSubmitting:!1},Te=10;function Es(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M5 14L6.6 9.2C6.8728 8.3816 7.6387 7.83 8.5014 7.83H15.4986C16.3613 7.83 17.1272 8.3816 17.4 9.2L19 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M4 14H20V17C20 18.1046 19.1046 19 18 19H6C4.89543 19 4 18.1046 4 17V14Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M7 16H7.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path>
            <path d="M17 16H17.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path>
        </svg>
    `}function ws(){return`
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
    `}function Is(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 13L11 22L2 13V4H11L20 13Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <circle cx="7.5" cy="8.5" r="1.5" fill="currentColor"></circle>
        </svg>
    `}function ut(e){const t=document.getElementById("mobil-submit-btn");_.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":_.editItem?"Perbarui":"Simpan")}function _s(e){return e==="Hiace"?"mobil-jenis-badge mobil-jenis-badge-hiace":"mobil-jenis-badge mobil-jenis-badge-reborn"}function $s(){const e=document.getElementById("mobil-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="mobil-table-state">
                <div class="mobil-loading-inline">
                    <span class="mobil-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function Ss(){const e=document.getElementById("mobil-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="mobil-table-state mobil-empty-copy">
                Belum ada data mobil
            </td>
        </tr>
    `)}function Nn(){const e=document.getElementById("mobil-table-body");if(e){if(_.loading){$s();return}if(_.data.length===0){Ss();return}e.innerHTML=_.data.map((t,n)=>`
        <tr class="mobil-row" data-testid="mobil-row-${t.id}">
            <td class="mobil-index-cell">${(_.page-1)*Te+n+1}</td>
            <td>
                <div class="mobil-code-cell">
                    <span class="mobil-code-avatar" aria-hidden="true">
                        ${Es()}
                    </span>
                    <span class="mobil-code-text">${u(t.kode_mobil)}</span>
                </div>
            </td>
            <td>
                <span class="${_s(t.jenis_mobil)}">
                    <span class="mobil-jenis-icon" aria-hidden="true">${Is()}</span>
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
                        ${ws()}
                    </button>
                    <button
                        class="mobil-icon-button mobil-icon-button-danger"
                        type="button"
                        data-mobil-delete="${t.id}"
                        data-mobil-name="${u(t.kode_mobil)}"
                        data-testid="delete-mobil-${t.id}"
                        aria-label="Hapus mobil ${u(t.kode_mobil)}"
                    >
                        ${Bs()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function Un(){const e=document.getElementById("mobil-pagination-shell"),t=document.getElementById("mobil-pagination-info"),n=document.getElementById("mobil-pagination-page"),a=document.getElementById("mobil-prev-page-btn"),o=document.getElementById("mobil-next-page-btn"),r=Math.max(1,Math.ceil(_.totalCount/Te));e&&(e.hidden=r<=1),t&&(t.textContent=ye(_.page,Te,_.totalCount,_.data.length)),n&&(n.textContent=`${_.page} / ${r}`),a&&(a.disabled=_.page===1),o&&(o.disabled=_.page>=r)}async function ue(){_.loading=!0,Nn(),Un();try{const[e,t]=await Promise.all([v(`/mobil?page=${_.page}&limit=${Te}${_.search?`&search=${encodeURIComponent(_.search)}`:""}${_.filterJenis?`&jenis=${encodeURIComponent(_.filterJenis)}`:""}`),v(`/mobil/count${_.search||_.filterJenis?"?":""}${[_.search?`search=${encodeURIComponent(_.search)}`:"",_.filterJenis?`jenis=${encodeURIComponent(_.filterJenis)}`:""].filter(Boolean).join("&")}`)]);_.data=Array.isArray(e)?e:[],_.totalCount=Number(t.count||0)}finally{_.loading=!1,Nn(),Un()}}function Hn(){const e=document.getElementById("mobil-form"),t=document.getElementById("mobil-form-title"),n=document.getElementById("mobil-form-description"),a=document.getElementById("mobil-id"),o=document.getElementById("mobil-kode"),r=document.getElementById("mobil-jenis");e?.reset(),a&&(a.value=""),o&&(o.value=""),r&&(r.value="Hiace"),t&&(t.textContent="Tambah Mobil Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan data mobil"),_.editItem=null,ut(!1)}function Cs(e){const t=document.getElementById("mobil-form-title"),n=document.getElementById("mobil-form-description"),a=document.getElementById("mobil-id"),o=document.getElementById("mobil-kode"),r=document.getElementById("mobil-jenis");_.editItem=e,a&&(a.value=e.id),o&&(o.value=e.kode_mobil),r&&(r.value=e.jenis_mobil),t&&(t.textContent="Edit Data Mobil"),n&&(n.textContent="Isi form di bawah untuk memperbarui data mobil"),ut(!1)}async function xs(e){const t=await v(`/mobil/${e}`);Cs(t),N("mobil-form-modal")}function Ls(e){const t=document.getElementById("mobil-delete-copy");_.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus mobil <strong>${u(e.kode_mobil)}</strong>? Tindakan ini tidak dapat dibatalkan.`),N("mobil-delete-modal")}function Ts(){const e=document.getElementById("mobil-add-btn"),t=document.getElementById("mobil-export-btn"),n=document.getElementById("mobil-search-input"),a=document.getElementById("mobil-filter-jenis"),o=document.getElementById("mobil-form"),r=document.getElementById("mobil-table-body"),s=document.getElementById("mobil-delete-confirm-btn"),i=document.getElementById("mobil-prev-page-btn"),c=document.getElementById("mobil-next-page-btn"),d=document.getElementById("mobil-kode");if(!(!e||!o||!r))return e.addEventListener("click",()=>{Hn(),N("mobil-form-modal")}),t?.addEventListener("click",()=>{nn("/export/mobil/csv","mobil.csv").catch(()=>{y("Gagal mengunduh file")})}),n?.addEventListener("input",he(async l=>{_.search=l.target.value.trim(),_.page=1;try{await ue()}catch{y("Gagal memuat data")}})),a?.addEventListener("change",async l=>{_.filterJenis=l.target.value,_.page=1;try{await ue()}catch{y("Gagal memuat data")}}),d?.addEventListener("input",l=>{l.target.value=l.target.value.toUpperCase()}),o.addEventListener("submit",async l=>{l.preventDefault();const g={kode_mobil:document.getElementById("mobil-kode")?.value.trim().toUpperCase()||"",jenis_mobil:document.getElementById("mobil-jenis")?.value||"Hiace"};ut(!0);try{_.editItem?(await v(`/mobil/${_.editItem.id}`,{method:"PUT",body:g}),H("Data mobil berhasil diperbarui")):(await v("/mobil",{method:"POST",body:g}),H("Mobil berhasil ditambahkan")),Z("mobil-form-modal"),Hn(),await ue()}catch(B){y(B.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{ut(!1)}}),r.addEventListener("click",async l=>{const g=l.target.closest("[data-mobil-edit]"),B=l.target.closest("[data-mobil-delete]");try{if(g){await xs(g.dataset.mobilEdit);return}B&&Ls({id:B.dataset.mobilDelete,kode_mobil:B.dataset.mobilName})}catch{y("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(_.deleteItem)try{await v(`/mobil/${_.deleteItem.id}`,{method:"DELETE"}),H("Mobil berhasil dihapus"),Z("mobil-delete-modal"),(_.page-1)*Te>=_.totalCount-1&&_.page>1&&(_.page-=1),_.deleteItem=null,await ue()}catch{y("Gagal menghapus data")}}),i?.addEventListener("click",async()=>{if(!(_.page<=1)){_.page-=1;try{await ue()}catch{y("Gagal memuat data")}}}),c?.addEventListener("click",async()=>{const l=Math.max(1,Math.ceil(_.totalCount/Te));if(!(_.page>=l)){_.page+=1;try{await ue()}catch{y("Gagal memuat data")}}}),ue().catch(()=>{y("Gagal memuat data")})}const $={data:[],drivers:[],mobilList:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1},He=10,Fn={"05:00":"Subuh (05.00 WIB)","08:00":"Pagi (08.00 WIB)","10:00":"Pagi (10.00 WIB)","14:00":"Siang (14.00 WIB)","16:00":"Sore (16.00 WIB)","19:00":"Malam (19.00 WIB)"},$t="08:00",As=["Reguler","Dropping","Rental"],dn="Reguler";function Ms(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
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
    `}function ln(e){return e==="Lunas"?"Lunas":"Belum Lunas"}function Gn(e){const t=ln(e);return`<span class="keberangkatan-payment-badge ${t==="Lunas"?"is-paid":"is-unpaid"}">${u(t)}</span>`}function Vn(e){return Fn[e]||Fn[$t]}function mt(e){return As.includes(e)?e:dn}function Ps(){const e=Number(document.getElementById("keberangkatan-tarif-penumpang")?.value||0),t=Number(document.getElementById("keberangkatan-uang-paket")?.value||0),n=Number(document.getElementById("keberangkatan-jumlah-snack")?.value||0),a=Number(document.getElementById("keberangkatan-pengembalian-snack")?.value||0),o=Number(document.getElementById("keberangkatan-jumlah-air-mineral")?.value||0),r=e,s=r+t,i=s*.15,c=s*.85;return{jumlah_uang_penumpang:r,uang_paket:t,total:s,uang_pc:i,uang_bersih:c,jumlah_snack:n,pengembalian_snack:a,jumlah_air_mineral:o}}function cn(){const e=Ps();Object.entries(e).forEach(([t,n])=>{const a=document.querySelector(`[data-calc="${t}"]`);if(a){if(t==="jumlah_snack"){a.textContent=`${O(n)} item`;return}if(t==="pengembalian_snack"){a.textContent=`${O(n)} item`;return}if(t==="jumlah_air_mineral"){a.textContent=`${O(n)} botol`;return}a.textContent=V(n)}})}function pt(e,t,n,a,o=""){const r=document.getElementById(e);if(!r)return;const s=e==="keberangkatan-kode-mobil"?"Pilih mobil":"Pilih driver";r.innerHTML=`
        <option value="">${s}</option>
        ${t.map(i=>`
            <option value="${i[n]}" ${String(i[n])===String(o)?"selected":""}>
                ${u(a(i))}
            </option>
        `).join("")}
    `}function gt(e){const t=document.getElementById("keberangkatan-submit-btn");$.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":$.editItem?"Perbarui":"Simpan")}function Ds(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");e&&(e.innerHTML=`
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
        `))}function Os(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");e&&(e.innerHTML=`
        <tr>
            <td colspan="18" class="keberangkatan-table-state keberangkatan-empty-copy">
                Belum ada data keberangkatan
            </td>
        </tr>
    `,t&&(t.hidden=!1,t.innerHTML=`
            <div class="keberangkatan-mobile-state keberangkatan-empty-copy">
                Belum ada data keberangkatan
            </div>
        `))}function Jn(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");if(e){if($.loading){Ds();return}if($.data.length===0){Os();return}e.innerHTML=$.data.map(n=>`
        <tr class="keberangkatan-row" data-testid="keberangkatan-row-${n.id}">
            <td class="keberangkatan-hari-cell">${u(n.hari)}</td>
            <td>${u(n.tanggal)}</td>
            <td>${u(n.jam_keberangkatan_label||Vn(n.jam_keberangkatan))}</td>
            <td>${u(mt(n.tipe_layanan))}</td>
            <td>
                <span class="keberangkatan-kode-badge">${u(n.kode_mobil)}</span>
            </td>
            <td>${u(n.driver_nama)}</td>
            <td class="text-right">${O(n.jumlah_penumpang)}</td>
            <td class="text-right keberangkatan-money-cell">${V(n.jumlah_uang_penumpang)}</td>
            <td class="text-right">${O(n.jumlah_paket)}</td>
            <td class="text-right keberangkatan-money-cell">${V(n.uang_paket)}</td>
            <td class="text-right"><span class="keberangkatan-stock-badge">${O(n.jumlah_snack)}</span></td>
            <td class="text-right"><span class="keberangkatan-stock-badge keberangkatan-stock-badge-blue">${O(n.pengembalian_snack)}</span></td>
            <td class="text-right"><span class="keberangkatan-stock-badge keberangkatan-stock-badge-blue">${O(n.jumlah_air_mineral)}</span></td>
            <td class="text-right keberangkatan-money-cell keberangkatan-money-cell-amber">${V(n.uang_pc)}</td>
            <td class="text-right keberangkatan-money-cell keberangkatan-money-cell-emerald">${V(n.uang_bersih)}</td>
            <td class="text-center">${Gn(n.status_pembayaran)}</td>
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
                        aria-label="Edit data keberangkatan ${u(n.kode_mobil)}"
                    >
                        ${Ms()}
                    </button>
                    <button
                        class="keberangkatan-icon-button keberangkatan-icon-button-danger"
                        type="button"
                        data-keberangkatan-delete="${n.id}"
                        data-testid="delete-keberangkatan-${n.id}"
                        aria-label="Hapus data keberangkatan ${u(n.kode_mobil)}"
                    >
                        ${Rs()}
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
                        <p>${u(n.jam_keberangkatan_label||Vn(n.jam_keberangkatan))}</p>
                    </div>
                    <div class="keberangkatan-mobile-head-side">
                        <span class="keberangkatan-kode-badge">${u(n.kode_mobil)}</span>
                        <span class="keberangkatan-trip-badge">#${O(n.trip_ke)}</span>
                    </div>
                </div>

                <div class="keberangkatan-mobile-driver">
                    <span>Driver</span>
                    <strong>${u(n.driver_nama)}</strong>
                </div>

                <div class="keberangkatan-mobile-grid">
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-status">
                        <span>Validasi</span>
                        ${Gn(n.status_pembayaran)}
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Layanan</span>
                        <strong>${u(mt(n.tipe_layanan))}</strong>
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
                        <strong>${V(n.jumlah_uang_penumpang)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-full">
                        <span>Uang Paket</span>
                        <strong>${V(n.uang_paket)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-accent">
                        <span>Uang PC (15%)</span>
                        <strong>${V(n.uang_pc)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-emerald">
                        <span>Uang Bersih</span>
                        <strong>${V(n.uang_bersih)}</strong>
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
        `).join(""))}}function Kn(){const e=document.getElementById("keberangkatan-pagination-shell"),t=document.getElementById("keberangkatan-pagination-info"),n=document.getElementById("keberangkatan-pagination-page"),a=document.getElementById("keberangkatan-prev-page-btn"),o=document.getElementById("keberangkatan-next-page-btn"),r=Math.max(1,Math.ceil($.totalCount/He));e&&(e.hidden=r<=1),t&&(t.textContent=ye($.page,He,$.totalCount,$.data.length)),n&&(n.textContent=`${$.page} / ${r}`),a&&(a.disabled=$.page===1),o&&(o.disabled=$.page>=r)}async function we(){$.loading=!0,Jn(),Kn();try{const[e,t,n,a]=await Promise.all([v(`/keberangkatan?page=${$.page}&limit=${He}${$.search?`&search=${encodeURIComponent($.search)}`:""}`),v(`/keberangkatan/count${$.search?`?search=${encodeURIComponent($.search)}`:""}`),v("/drivers/all"),v("/mobil/all")]);$.data=Array.isArray(e)?e:[],$.totalCount=Number(t.count||0),$.drivers=Array.isArray(n)?n:[],$.mobilList=Array.isArray(a)?a:[]}finally{$.loading=!1,Jn(),Kn()}}function Va(){document.getElementById("keberangkatan-form")?.scrollTo({top:0,behavior:"auto"})}function Pt(){const e=document.getElementById("keberangkatan-form"),t=document.getElementById("keberangkatan-form-title"),n=document.getElementById("keberangkatan-form-description"),a=document.getElementById("keberangkatan-tanggal"),o=document.getElementById("keberangkatan-jam-keberangkatan"),r=document.getElementById("keberangkatan-trip-ke"),s=document.getElementById("keberangkatan-tipe-layanan"),i=document.getElementById("keberangkatan-jumlah-penumpang"),c=document.getElementById("keberangkatan-tarif-penumpang"),d=document.getElementById("keberangkatan-jumlah-paket"),l=document.getElementById("keberangkatan-uang-paket"),g=document.getElementById("keberangkatan-jumlah-snack"),B=document.getElementById("keberangkatan-pengembalian-snack"),R=document.getElementById("keberangkatan-jumlah-air-mineral"),f=document.getElementById("keberangkatan-status-pembayaran");e?.reset(),$.editItem=null,document.getElementById("keberangkatan-id").value="",t&&(t.textContent="Tambah Data Keberangkatan"),n&&(n.textContent="Isi form di bawah untuk menambahkan data keberangkatan"),a&&(a.value=Ze()),o&&(o.value=$t),pt("keberangkatan-kode-mobil",$.mobilList,"kode_mobil",k=>`${k.kode_mobil} - ${k.jenis_mobil}`,$.mobilList[0]?.kode_mobil||""),pt("keberangkatan-driver-id",$.drivers,"id",k=>`${k.nama} - ${k.lokasi}`,$.drivers[0]?.id||""),r&&(r.value="1"),s&&(s.value=dn),i&&(i.value="0"),c&&(c.value="0"),d&&(d.value="0"),l&&(l.value="0"),g&&(g.value="0"),B&&(B.value="0"),R&&(R.value="0"),f&&(f.value="Belum Lunas"),gt(!1),cn(),Va()}async function zn(e){const t=await v(`/keberangkatan/${e}`),n=document.getElementById("keberangkatan-form-title"),a=document.getElementById("keberangkatan-form-description");$.editItem=t,document.getElementById("keberangkatan-id").value=t.id,document.getElementById("keberangkatan-tanggal").value=t.tanggal,document.getElementById("keberangkatan-jam-keberangkatan").value=t.jam_keberangkatan||$t,document.getElementById("keberangkatan-trip-ke").value=t.trip_ke,document.getElementById("keberangkatan-tipe-layanan").value=mt(t.tipe_layanan),document.getElementById("keberangkatan-jumlah-penumpang").value=t.jumlah_penumpang,document.getElementById("keberangkatan-tarif-penumpang").value=t.tarif_penumpang,document.getElementById("keberangkatan-jumlah-paket").value=t.jumlah_paket,document.getElementById("keberangkatan-uang-paket").value=t.uang_paket,document.getElementById("keberangkatan-jumlah-snack").value=t.jumlah_snack,document.getElementById("keberangkatan-pengembalian-snack").value=t.pengembalian_snack,document.getElementById("keberangkatan-jumlah-air-mineral").value=t.jumlah_air_mineral,document.getElementById("keberangkatan-status-pembayaran").value=ln(t.status_pembayaran),pt("keberangkatan-kode-mobil",$.mobilList,"kode_mobil",o=>`${o.kode_mobil} - ${o.jenis_mobil}`,t.kode_mobil),pt("keberangkatan-driver-id",$.drivers,"id",o=>`${o.nama} - ${o.lokasi}`,t.driver_id),n&&(n.textContent="Edit Data Keberangkatan"),a&&(a.textContent="Isi form di bawah untuk memperbarui data keberangkatan"),gt(!1),cn(),Va(),N("keberangkatan-form-modal")}function Wn(e){$.deleteItem=e,N("keberangkatan-delete-modal")}function js(){const e=document.getElementById("keberangkatan-add-btn"),t=document.getElementById("keberangkatan-export-btn"),n=document.getElementById("keberangkatan-search-input"),a=document.getElementById("keberangkatan-form"),o=document.getElementById("keberangkatan-table-body"),r=document.getElementById("keberangkatan-mobile-list"),s=document.getElementById("keberangkatan-delete-confirm-btn"),i=document.getElementById("keberangkatan-prev-page-btn"),c=document.getElementById("keberangkatan-next-page-btn");if(!(!e||!a||!o))return e.addEventListener("click",()=>{Pt(),N("keberangkatan-form-modal")}),t?.addEventListener("click",()=>{nn("/export/keberangkatan/csv","keberangkatan.csv").catch(()=>{y("Gagal mengunduh file")})}),n?.addEventListener("input",he(async d=>{$.search=d.target.value.trim(),$.page=1;try{await we()}catch{y("Gagal memuat data")}})),a.addEventListener("input",d=>{["keberangkatan-jumlah-penumpang","keberangkatan-tarif-penumpang","keberangkatan-uang-paket","keberangkatan-jumlah-snack","keberangkatan-pengembalian-snack","keberangkatan-jumlah-air-mineral"].includes(d.target.id)&&cn()}),a.addEventListener("submit",async d=>{d.preventDefault();const l={tanggal:document.getElementById("keberangkatan-tanggal")?.value||"",jam_keberangkatan:document.getElementById("keberangkatan-jam-keberangkatan")?.value||$t,tipe_layanan:mt(document.getElementById("keberangkatan-tipe-layanan")?.value||dn),kode_mobil:document.getElementById("keberangkatan-kode-mobil")?.value||"",driver_id:document.getElementById("keberangkatan-driver-id")?.value||"",jumlah_penumpang:Number(document.getElementById("keberangkatan-jumlah-penumpang")?.value||0),tarif_penumpang:Number(document.getElementById("keberangkatan-tarif-penumpang")?.value||0),jumlah_paket:Number(document.getElementById("keberangkatan-jumlah-paket")?.value||0),uang_paket:Number(document.getElementById("keberangkatan-uang-paket")?.value||0),jumlah_snack:Number(document.getElementById("keberangkatan-jumlah-snack")?.value||0),pengembalian_snack:Number(document.getElementById("keberangkatan-pengembalian-snack")?.value||0),jumlah_air_mineral:Number(document.getElementById("keberangkatan-jumlah-air-mineral")?.value||0),trip_ke:Number(document.getElementById("keberangkatan-trip-ke")?.value||1),status_pembayaran:ln(document.getElementById("keberangkatan-status-pembayaran")?.value||"")};gt(!0);try{$.editItem?(await v(`/keberangkatan/${$.editItem.id}`,{method:"PUT",body:l}),H("Data berhasil diperbarui")):(await v("/keberangkatan",{method:"POST",body:l}),H("Data berhasil ditambahkan")),Z("keberangkatan-form-modal"),Pt(),await we()}catch(g){y(g.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{gt(!1)}}),o.addEventListener("click",async d=>{const l=d.target.closest("[data-keberangkatan-edit]"),g=d.target.closest("[data-keberangkatan-delete]");try{if(l){await zn(l.dataset.keberangkatanEdit);return}g&&Wn({id:g.dataset.keberangkatanDelete})}catch{y("Gagal memuat data")}}),r?.addEventListener("click",async d=>{const l=d.target.closest("[data-keberangkatan-edit]"),g=d.target.closest("[data-keberangkatan-delete]");try{if(l){await zn(l.dataset.keberangkatanEdit);return}g&&Wn({id:g.dataset.keberangkatanDelete})}catch{y("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if($.deleteItem)try{await v(`/keberangkatan/${$.deleteItem.id}`,{method:"DELETE"}),H("Data berhasil dihapus"),Z("keberangkatan-delete-modal"),($.page-1)*He>=$.totalCount-1&&$.page>1&&($.page-=1),$.deleteItem=null,await we()}catch{y("Gagal menghapus data")}}),i?.addEventListener("click",async()=>{if(!($.page<=1)){$.page-=1;try{await we()}catch{y("Gagal memuat data")}}}),c?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil($.totalCount/He));if(!($.page>=d)){$.page+=1;try{await we()}catch{y("Gagal memuat data")}}}),we().then(()=>{Pt()}).catch(()=>{y("Gagal memuat data")})}const C={data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1,prices:{snack:0,air:0}},Fe=10;function qs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Ns(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function ft(e){return Number(document.getElementById(e)?.value||0)}function bt(){const e=ft("stock-total-snack"),t=ft("stock-total-air"),n=e*C.prices.snack+t*C.prices.air,a=document.querySelector('[data-stock-calc="nilai_total"]'),o=document.getElementById("stock-snack-price-label"),r=document.getElementById("stock-air-price-label");o&&(o.textContent=V(C.prices.snack)),r&&(r.textContent=V(C.prices.air)),a&&(a.textContent=V(n))}function kt(e){const t=document.getElementById("stock-submit-btn");C.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":C.editItem?"Perbarui":"Simpan")}function Us(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");e&&(e.innerHTML=`
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
        `))}function Hs(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");e&&(e.innerHTML=`
        <tr>
            <td colspan="14" class="stock-table-state stock-empty-copy">
                Belum ada data stok snack dan air mineral
            </td>
        </tr>
    `,t&&(t.hidden=!1,t.innerHTML=`
            <div class="stock-mobile-state stock-empty-copy">
                Belum ada data stok snack dan air mineral
            </div>
        `))}function Xn(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");if(e){if(C.loading){Us();return}if(C.data.length===0){Hs();return}e.innerHTML=C.data.map(n=>`
        <tr class="stock-row" data-testid="stock-row-${n.id}">
            <td class="stock-day-cell">${u(n.hari)}</td>
            <td>${u(n.tanggal)}</td>
            <td>${u(n.bulan)}</td>
            <td class="text-right">${O(n.total_stock_snack_display??n.total_stock_snack)}</td>
            <td class="text-right">${O(n.total_stock_air_mineral)}</td>
            <td class="text-right">${O(n.pengembalian_snack)}</td>
            <td class="text-right">${O(n.terpakai_snack)}</td>
            <td class="text-right">${O(n.terpakai_air_mineral)}</td>
            <td class="text-right"><span class="stock-value-badge stock-value-badge-emerald">${O(n.sisa_stock_snack)}</span></td>
            <td class="text-right"><span class="stock-value-badge stock-value-badge-blue">${O(n.sisa_stock_air_mineral)}</span></td>
            <td class="text-right stock-money-cell">${V(n.nilai_total)}</td>
            <td class="text-right stock-money-cell stock-money-cell-emerald">${V(n.sisa_nilai_total)}</td>
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
                        ${qs()}
                    </button>
                    <button
                        class="stock-icon-button stock-icon-button-danger"
                        type="button"
                        data-stock-delete="${n.id}"
                        data-stock-date="${u(n.tanggal)}"
                        data-testid="delete-stock-${n.id}"
                        aria-label="Hapus data stok ${u(n.tanggal)}"
                    >
                        ${Ns()}
                    </button>
                </div>
            </td>
        </tr>
    `).join(""),t&&(t.hidden=!1,t.innerHTML=C.data.map(n=>`
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
                        <strong>${V(n.nilai_total)}</strong>
                    </div>
                    <div class="stock-mobile-item stock-mobile-item-full stock-mobile-item-emerald">
                        <span>Sisa Nilai Total</span>
                        <strong>${V(n.sisa_nilai_total)}</strong>
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
        `).join(""))}}function Zn(){const e=document.getElementById("stock-pagination-shell"),t=document.getElementById("stock-pagination-info"),n=document.getElementById("stock-pagination-page"),a=document.getElementById("stock-prev-page-btn"),o=document.getElementById("stock-next-page-btn"),r=Math.max(1,Math.ceil(C.totalCount/Fe));e&&(e.hidden=r<=1),t&&(t.textContent=ye(C.page,Fe,C.totalCount,C.data.length)),n&&(n.textContent=`${C.page} / ${r}`),a&&(a.disabled=C.page===1),o&&(o.disabled=C.page>=r)}async function Be(){C.loading=!0,Xn(),Zn();try{const[e,t]=await Promise.all([v(`/stock?page=${C.page}&limit=${Fe}${C.search?`&search=${encodeURIComponent(C.search)}`:""}`),v(`/stock/count${C.search?`?search=${encodeURIComponent(C.search)}`:""}`)]);C.data=Array.isArray(e)?e:[],C.totalCount=Number(t.count||0)}finally{C.loading=!1,Xn(),Zn()}}function Qn(){const e=document.getElementById("stock-form"),t=document.getElementById("stock-form-title"),n=document.getElementById("stock-form-description");e?.reset(),C.editItem=null,document.getElementById("stock-id").value="",document.getElementById("stock-tanggal").value=Ze(),document.getElementById("stock-total-snack").value="0",document.getElementById("stock-total-air").value="0",document.getElementById("stock-keterangan").value="",t&&(t.textContent="Tambah Stok Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan stok snack dan air mineral"),kt(!1),bt()}function Fs(e){const t=document.getElementById("stock-form-title"),n=document.getElementById("stock-form-description");C.editItem=e,document.getElementById("stock-id").value=e.id,document.getElementById("stock-tanggal").value=e.tanggal,document.getElementById("stock-total-snack").value=e.total_stock_snack,document.getElementById("stock-total-air").value=e.total_stock_air_mineral,document.getElementById("stock-keterangan").value=e.keterangan||"",t&&(t.textContent="Edit Data Stok"),n&&(n.textContent="Isi form di bawah untuk memperbarui stok snack dan air mineral"),kt(!1),bt()}async function Yn(e){const t=await v(`/stock/${e}`);Fs(t),N("stock-form-modal")}function ea(e){const t=document.getElementById("stock-delete-copy");C.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus data stok tanggal <strong>${u(e.tanggal)}</strong>? Tindakan ini tidak dapat dibatalkan.`),N("stock-delete-modal")}function Gs(){const e=document.querySelector("[data-stock-page]"),t=document.getElementById("stock-add-btn"),n=document.getElementById("stock-search-input"),a=document.getElementById("stock-form"),o=document.getElementById("stock-table-body"),r=document.getElementById("stock-mobile-list"),s=document.getElementById("stock-delete-confirm-btn"),i=document.getElementById("stock-prev-page-btn"),c=document.getElementById("stock-next-page-btn");if(!(!e||!t||!a||!o))return C.prices.snack=Number(e.dataset.stockSnackPrice||0),C.prices.air=Number(e.dataset.stockAirPrice||0),bt(),t.addEventListener("click",()=>{Qn(),N("stock-form-modal")}),n?.addEventListener("input",he(async d=>{C.search=d.target.value.trim(),C.page=1;try{await Be()}catch{y("Gagal memuat data")}})),a.addEventListener("input",d=>{["stock-total-snack","stock-total-air"].includes(d.target.id)&&bt()}),a.addEventListener("submit",async d=>{d.preventDefault();const l={tanggal:document.getElementById("stock-tanggal")?.value||"",total_stock_snack:ft("stock-total-snack"),total_stock_air_mineral:ft("stock-total-air"),keterangan:document.getElementById("stock-keterangan")?.value.trim()||""};kt(!0);try{C.editItem?(await v(`/stock/${C.editItem.id}`,{method:"PUT",body:l}),H("Data stok berhasil diperbarui")):(await v("/stock",{method:"POST",body:l}),H("Data stok berhasil ditambahkan")),Z("stock-form-modal"),Qn(),await Be()}catch(g){y(g.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{kt(!1)}}),o.addEventListener("click",async d=>{const l=d.target.closest("[data-stock-edit]"),g=d.target.closest("[data-stock-delete]");try{if(l){await Yn(l.dataset.stockEdit);return}g&&ea({id:g.dataset.stockDelete,tanggal:g.dataset.stockDate})}catch{y("Gagal memuat data")}}),r?.addEventListener("click",async d=>{const l=d.target.closest("[data-stock-edit]"),g=d.target.closest("[data-stock-delete]");try{if(l){await Yn(l.dataset.stockEdit);return}g&&ea({id:g.dataset.stockDelete,tanggal:g.dataset.stockDate})}catch{y("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(C.deleteItem)try{await v(`/stock/${C.deleteItem.id}`,{method:"DELETE"}),H("Data stok berhasil dihapus"),Z("stock-delete-modal"),(C.page-1)*Fe>=C.totalCount-1&&C.page>1&&(C.page-=1),C.deleteItem=null,await Be()}catch{y("Gagal menghapus data")}}),i?.addEventListener("click",async()=>{if(!(C.page<=1)){C.page-=1;try{await Be()}catch{y("Gagal memuat data")}}}),c?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil(C.totalCount/Fe));if(!(C.page>=d)){C.page+=1;try{await Be()}catch{y("Gagal memuat data")}}}),Be().catch(()=>{y("Gagal memuat data")})}const Ge=10,x={currentUser:null,data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,defaultRole:"User"};function Vs(e){return["Super Admin","Admin"].includes(e)}function Js(e){return e==="Super Admin"}function Ks(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function zs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M2.5 12C4.4 8.2 8 6 12 6C16 6 19.6 8.2 21.5 12C19.6 15.8 16 18 12 18C8 18 4.4 15.8 2.5 12Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function Ws(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Xs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Zs(){return Js(x.currentUser?.role)?["Super Admin","Admin","User"]:["Admin","User"]}function ht(e){se(document.getElementById("admin-user-submit-btn"),e,"Menyimpan...")}function Qs(e){return e==="Super Admin"?"admin-users-role-badge admin-users-role-badge-super":e==="Admin"?"admin-users-role-badge admin-users-role-badge-admin":"admin-users-role-badge admin-users-role-badge-user"}function Ys(){const e=document.getElementById("admin-users-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="6" class="admin-users-table-state">
                <div class="admin-users-loading-inline">
                    <span class="admin-users-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function Ja(e="Belum ada akun admin atau user."){const t=document.getElementById("admin-users-table-body");t&&(t.innerHTML=`
        <tr>
            <td colspan="6" class="admin-users-table-state admin-users-empty-copy">${u(e)}</td>
        </tr>
    `)}function ta(){const e=document.getElementById("admin-users-table-body");if(e){if(x.loading){Ys();return}if(x.data.length===0){Ja();return}e.innerHTML=x.data.map(t=>`
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
            <td><span class="${Qs(t.role)}">${u(t.role)}</span></td>
            <td>
                <div class="admin-users-action-row">
                    <button class="admin-users-icon-button" type="button" data-admin-user-show="${t.id}" data-testid="show-admin-user-${t.id}" aria-label="Lihat detail akun ${u(t.nama)}">
                        ${zs()}
                    </button>
                    <button class="admin-users-icon-button" type="button" data-admin-user-edit="${t.id}" data-testid="edit-admin-user-${t.id}" aria-label="Edit akun ${u(t.nama)}" ${t.can_edit?"":"disabled"}>
                        ${Ws()}
                    </button>
                    <button class="admin-users-icon-button admin-users-icon-button-danger" type="button" data-admin-user-delete="${t.id}" data-admin-user-name="${u(t.nama)}" data-testid="delete-admin-user-${t.id}" aria-label="Hapus akun ${u(t.nama)}" ${t.can_delete?"":"disabled"}>
                        ${Xs()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function Jt(){const e=document.getElementById("admin-users-pagination-shell"),t=document.getElementById("admin-users-pagination-info"),n=document.getElementById("admin-users-pagination-page"),a=document.getElementById("admin-users-prev-page-btn"),o=document.getElementById("admin-users-next-page-btn"),r=Math.max(1,Math.ceil(x.totalCount/Ge));e&&(e.hidden=r<=1),t&&(t.textContent=ye(x.page,Ge,x.totalCount,x.data.length)),n&&(n.textContent=`${x.page} / ${r}`),a&&(a.disabled=x.page===1),o&&(o.disabled=x.page>=r)}async function Ie(){x.loading=!0,ta(),Jt();try{const e=x.search?`?search=${encodeURIComponent(x.search)}`:"",t=`?page=${x.page}&limit=${Ge}${x.search?`&search=${encodeURIComponent(x.search)}`:""}`,[n,a]=await Promise.all([v(`/admin-users${t}`),v(`/admin-users/count${e}`)]);x.data=Array.isArray(n)?n:[],x.totalCount=Number(a.count||0)}finally{x.loading=!1,ta(),Jt()}}function Ka(e="User"){const t=document.getElementById("admin-user-role");if(!t)return;const n=Zs(),a=n.includes(e)?e:n[0];t.innerHTML=n.map(o=>`
        <option value="${u(o)}" ${o===a?"selected":""}>${u(o)}</option>
    `).join("")}function za(e){const t=document.getElementById("admin-user-password"),n=document.getElementById("admin-user-password-note");t&&(t.required=!e,t.placeholder=e?"Kosongkan jika tidak ingin mengubah password":"Masukkan password",t.value=""),n&&(n.textContent=e?"Kosongkan password jika tidak ingin mengubah password akun ini.":"Password minimal 6 karakter dan akan disimpan dalam bentuk terenkripsi.")}function Dt(e="User"){const t=document.getElementById("admin-user-form"),n=document.getElementById("admin-user-form-title"),a=document.getElementById("admin-user-form-description"),o=document.getElementById("admin-user-id");t?.reset(),o&&(o.value=""),Ka(e),za(!1),n&&(n.textContent=e==="Admin"?"Tambah Admin Baru":"Tambah User Baru"),a&&(a.textContent=e==="Admin"?"Lengkapi data akun untuk menambahkan admin baru":"Lengkapi data akun untuk menambahkan user baru"),x.defaultRole=e,x.editItem=null,ht(!1)}function ei(e){x.editItem=e,document.getElementById("admin-user-id").value=e.id,document.getElementById("admin-user-nama").value=e.nama,document.getElementById("admin-user-username").value=e.username,document.getElementById("admin-user-email").value=e.email,Ka(e.role),za(!0),document.getElementById("admin-user-form-title").textContent="Edit Akun",document.getElementById("admin-user-form-description").textContent="Perbarui informasi akun admin atau user di bawah ini",ht(!1)}function ti(e){const t=document.getElementById("admin-user-detail-list");t&&(t.innerHTML=`
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
            <strong>${u(ts(e.created_at))}</strong>
        </div>
    `)}async function ni(e){ti(await v(`/admin-users/${e}`)),N("admin-user-show-modal")}async function ai(e){ei(await v(`/admin-users/${e}`)),N("admin-user-form-modal")}function oi(e){x.deleteItem=e,document.getElementById("admin-user-delete-copy").innerHTML=`Apakah Anda yakin ingin menghapus akun <strong>${u(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`,N("admin-user-delete-modal")}function na(){const e=document.getElementById("admin-users-access-note"),t=document.getElementById("admin-users-search-input"),n=document.querySelector(".admin-users-page-actions");e&&(e.hidden=!1,e.textContent="Halaman ini hanya dapat diakses oleh Admin atau Super Admin."),t&&(t.disabled=!0),n&&(n.hidden=!0),x.loading=!1,x.data=[],x.totalCount=0,Ja("Anda tidak memiliki akses untuk mengelola data admin dan user."),Jt()}function ri({user:e}={}){const t=document.getElementById("admin-users-add-admin-btn"),n=document.getElementById("admin-users-add-user-btn"),a=document.getElementById("admin-users-search-input"),o=document.getElementById("admin-user-form"),r=document.getElementById("admin-users-table-body"),s=document.getElementById("admin-user-delete-confirm-btn"),i=document.getElementById("admin-users-prev-page-btn"),c=document.getElementById("admin-users-next-page-btn");if(!(!t||!n||!o||!r)){if(x.currentUser=e||window.transitAuthUser||null,!Vs(x.currentUser?.role)){na();return}return t.addEventListener("click",()=>{Dt("Admin"),N("admin-user-form-modal")}),n.addEventListener("click",()=>{Dt("User"),N("admin-user-form-modal")}),a?.addEventListener("input",he(async d=>{x.search=d.target.value.trim(),x.page=1;try{await Ie()}catch(l){y(l.message||"Gagal memuat data akun")}})),o.addEventListener("submit",async d=>{d.preventDefault();const l={nama:document.getElementById("admin-user-nama")?.value.trim()||"",username:document.getElementById("admin-user-username")?.value.trim()||"",email:document.getElementById("admin-user-email")?.value.trim()||"",password:document.getElementById("admin-user-password")?.value||"",role:document.getElementById("admin-user-role")?.value||"User"};ht(!0);try{x.editItem?(await v(`/admin-users/${x.editItem.id}`,{method:"PUT",body:l}),H("Akun berhasil diperbarui")):(await v("/admin-users",{method:"POST",body:l}),H(l.role==="Admin"?"Admin berhasil ditambahkan":"User berhasil ditambahkan")),Z("admin-user-form-modal"),Dt(x.defaultRole),await Ie()}catch(g){y(g.message||"Silakan periksa kembali data yang diinput","Gagal menyimpan akun")}finally{ht(!1)}}),r.addEventListener("click",async d=>{const l=d.target.closest("[data-admin-user-show]"),g=d.target.closest("[data-admin-user-edit]"),B=d.target.closest("[data-admin-user-delete]");try{if(l){await ni(l.dataset.adminUserShow);return}if(g){await ai(g.dataset.adminUserEdit);return}B&&oi({id:B.dataset.adminUserDelete,nama:B.dataset.adminUserName})}catch(R){y(R.message||"Gagal memuat detail akun")}}),s?.addEventListener("click",async()=>{if(x.deleteItem)try{await v(`/admin-users/${x.deleteItem.id}`,{method:"DELETE"}),H("Akun berhasil dihapus"),Z("admin-user-delete-modal"),(x.page-1)*Ge>=x.totalCount-1&&x.page>1&&(x.page-=1),x.deleteItem=null,await Ie()}catch(d){y(d.message||"Gagal menghapus akun")}}),i?.addEventListener("click",async()=>{if(!(x.page<=1)){x.page-=1;try{await Ie()}catch(d){y(d.message||"Gagal memuat data akun")}}}),c?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil(x.totalCount/Ge));if(!(x.page>=d)){x.page+=1;try{await Ie()}catch(l){y(l.message||"Gagal memuat data akun")}}}),Ie().catch(d=>{if(d.status===403){na();return}y(d.message||"Gagal memuat data akun")})}}const aa=[{value:"05:00",label:"Subuh",time:"05.00 WIB"},{value:"08:00",label:"Pagi",time:"08.00 WIB"},{value:"10:00",label:"Pagi",time:"10.00 WIB"},{value:"14:00",label:"Siang",time:"14.00 WIB"},{value:"16:00",label:"Sore",time:"16.00 WIB"},{value:"19:00",label:"Malam",time:"19.00 WIB"}],Wa=[[{code:"1A",label:"1A"},{code:"SOPIR",label:"SOPIR",isDriver:!0}],[{code:"2A",label:"2A"},{code:"3A",label:"3A"}],[{code:"4A",label:"4A"},{code:"5A",label:"5A"}]],oa=Wa.flat().filter(e=>!e.isDriver).length,p={currentUser:null,date:Ze(),direction:"from_pkb",bookings:[],loading:!1,drivers:[],mobils:[],formOptions:null,selectedSeats:[],passengerDraftMap:{},editItem:null,deleteItem:null,slotDriverMap:{},slotMobilMap:{},occupiedSeatsForForm:[],occupiedSeatsForPackageForm:[],slotExtraArmadas:{},currentFormArmadaIndex:1,_pendingChoiceArmada:1,_pendingChoiceTime:""};function Ot(e){const t=document.getElementById(e);if(!t)return null;try{return JSON.parse(t.textContent||"{}")}catch{return null}}function si(e){return["Super Admin","Admin"].includes(e)}function ii(e){const t=e?"#dc2626":"#166534",n=e?"#991b1b":"#14532d";return`
        <svg viewBox="0 0 50 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="2" width="30" height="20" rx="8" fill="${t}" stroke="${n}" stroke-width="1.5"/>
            <rect x="5" y="18" width="40" height="28" rx="9" fill="${t}" stroke="${n}" stroke-width="1.5"/>
            <rect x="7" y="44" width="36" height="14" rx="7" fill="${t}" stroke="${n}" stroke-width="1.5" opacity="0.8"/>
            <rect x="2" y="22" width="5" height="18" rx="2.5" fill="${t}" opacity="0.6"/>
            <rect x="43" y="22" width="5" height="18" rx="2.5" fill="${t}" opacity="0.6"/>
        </svg>`}function di(){return`
        <svg viewBox="0 0 50 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="25" cy="30" r="18" stroke="rgba(148,163,184,0.5)" stroke-width="2.5"/>
            <circle cx="25" cy="30" r="6" fill="rgba(148,163,184,0.4)"/>
            <line x1="25" y1="12" x2="25" y2="24" stroke="rgba(148,163,184,0.5)" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="7" y1="30" x2="19" y2="30" stroke="rgba(148,163,184,0.5)" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="31" y1="30" x2="43" y2="30" stroke="rgba(148,163,184,0.5)" stroke-width="2.5" stroke-linecap="round"/>
        </svg>`}function li(){return'<svg viewBox="0 0 24 24" fill="none"><path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path><path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg>'}function ci(){return'<svg viewBox="0 0 24 24" fill="none"><path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg>'}function ra(){return'<svg viewBox="0 0 24 24" fill="none" style="width:12px;height:12px;flex-shrink:0;"><path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'}function ui(){return'<svg viewBox="0 0 24 24" fill="none" style="width:12px;height:12px;flex-shrink:0;"><rect x="2" y="7" width="15" height="10" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M17 10H20L22 13V17H17V10Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="6" cy="18" r="1.5" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="18" r="1.5" stroke="currentColor" stroke-width="1.5"/></svg>'}function mi(){return'<svg viewBox="0 0 24 24" fill="none" style="width:12px;height:12px;flex-shrink:0;"><path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 2V8H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 13H16M8 17H13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'}function pi(e){return`
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
                    ${Wa.map(n=>`<div class="bpg-seat-row">${n.map(o=>{if(o.isDriver)return`
                    <div class="bpg-seat-item bpg-seat-driver" title="Sopir / Pengemudi">
                        <div class="bpg-seat-icon">${di()}</div>
                        <span class="bpg-seat-label">SOPIR</span>
                    </div>`;const r=e[o.code],s=!!r,i=s?"bpg-seat-occupied":"bpg-seat-available",c=s?u(r.nama_pemesanan||"-"):"";return`
                <div class="bpg-seat-item ${i}" title="${s?c:"Tersedia"}">
                    <div class="bpg-seat-icon">${ii(s)}</div>
                    <span class="bpg-seat-label">${o.label}</span>
                    ${s?`<span class="bpg-seat-name">${c}</span>`:""}
                </div>`}).join("")}</div>`).join("")}
                </div>
            </div>
        </div>`}function gi(e){if(e.length===0)return`
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
                        ${li()}
                    </button>
                    <button class="admin-users-icon-button admin-users-icon-button-danger" type="button" data-booking-delete="${u(String(o.id))}" data-booking-name="${u(o.nama_pemesanan)}" title="Hapus pemesanan">
                        ${ci()}
                    </button>
                </div>
            </div>`}).join("")}
        </div>`}function fi(e){const t={};return e.forEach(n=>{(Array.isArray(n.selected_seats)?n.selected_seats:[]).forEach(o=>{t[o]||(t[o]=n)})}),t}function bi(e,t,n,a){const o=fi(n),r=n.reduce((b,h)=>b+(Number(h.passenger_count)||0),0),s=r>=oa,i=`${e.value}__${p.direction}__${t}`;if(!p.slotDriverMap[i]){const b=n.find(h=>h.driver_id);b&&(p.slotDriverMap[i]=b.driver_id)}const c=p.slotDriverMap[i]||"",d=p.slotMobilMap[i]||"",l=s?"stock-value-badge-red":"stock-value-badge-yellow",g=p.drivers.map(b=>{const h=b.lokasi?`${b.nama} (${b.lokasi})`:b.nama;return`<option value="${u(b.id)}" ${c===b.id?"selected":""}>${u(h)}</option>`}).join(""),B=p.mobils.map(b=>{const h=`${b.kode_mobil} — ${b.jenis_mobil}`;return`<option value="${u(b.id)}" ${d===b.id?"selected":""}>${u(h)}</option>`}).join(""),R=[...new Set(n.map(b=>(b.service_type||"").trim()).filter(Boolean))],f=a>1?`<span class="bpg-armada-badge">${ui()} Armada ${t}</span>`:"",k=s?`<button class="bpg-add-armada-btn" type="button"
                data-add-armada="${u(e.value)}"
                data-armada-index="${t}"
                title="Tambah armada ke-${t+1} untuk jadwal ${u(e.time)}">
                ${ra()}
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
                        ${f}
                        <div class="bpg-slot-service-types">
                            ${R.length>0?R.map(b=>`<span class="bpg-service-badge">${u(b)}</span>`).join(""):'<span class="bpg-service-badge bpg-service-badge--empty">Belum ada layanan</span>'}
                        </div>
                        <span class="stock-value-badge ${l}">${r} / ${oa} Kursi</span>
                    </div>
                </div>
                ${k?`<div class="bpg-slot-head-row">${k}</div>`:""}
            </div>

            ${pi(o)}

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
                        ${B}
                    </select>
                </div>
            </div>

            ${gi(n)}

            <button class="bpg-slot-book-btn" type="button"
                data-slot-book="${u(e.value)}"
                data-slot-armada="${t}"
                title="Tambah pemesanan untuk Armada ${t}, jadwal ${u(e.time)}">
                ${ra()}
                Tambah Pemesanan Armada ${t}
            </button>
            <button class="bpg-surat-jalan-btn" type="button"
                data-surat-jalan="${u(e.value)}"
                data-surat-jalan-armada="${t}"
                title="Buat Surat Jalan Armada ${t}, jadwal ${u(e.time)}">
                ${mi()}
                Surat Jalan
            </button>
        </article>`}function ki(e,t){const n={};t.forEach(c=>{const d=c.armada_index||1;n[d]||(n[d]=[]),n[d].push(c)});const a=`${e.value}__${p.direction}`,o=t.length>0?Math.max(...Object.keys(n).map(Number)):1,r=p.slotExtraArmadas[a]||1,s=Math.max(o,r),i=[];for(let c=1;c<=s;c++)i.push(bi(e,c,n[c]||[],s));return`<div class="bpg-slot-group" data-slot-group="${u(e.value)}">${i.join("")}</div>`}function hi(){const e=document.getElementById("bpg-slots-shell");e&&(e.innerHTML=`
            <div class="admin-users-loading-inline" style="padding:40px 0;">
                <span class="admin-users-loading-inline-spinner" aria-hidden="true"></span>
                <span>Memuat data penumpang...</span>
            </div>`)}function Xa(){const e=document.getElementById("bpg-slots-shell");if(!e)return;const t={};aa.forEach(a=>{t[a.value]=[]}),p.bookings.forEach(a=>{const r=(a.trip_time||"").trim().substring(0,5);t[r]&&t[r].push(a)});const n=aa.map(a=>ki(a,t[a.value]||[]));e.innerHTML=`<div class="bpg-slots-grid">${n.join("")}</div>`}async function _e(){p.loading=!0,hi();try{const e=new URLSearchParams({date:p.date,direction:p.direction,limit:200,page:1}),[t,n]=await Promise.all([v(`/bookings?${e}`),v(`/bookings/armada-extras?date=${p.date}`).catch(()=>({}))]);p.bookings=Array.isArray(t)?t:[],n&&typeof n=="object"&&Object.entries(n).forEach(([a,o])=>{const r=`${a}__${p.direction}`;p.slotExtraArmadas[r]=Math.max(p.slotExtraArmadas[r]||1,Number(o)||1)})}catch(e){p.bookings=[],e.status!==403&&y(e.message||"Gagal memuat data penumpang")}finally{p.loading=!1,Xa()}}function sa(e){return{Aktif:"green",Selesai:"green",Dibayar:"green","Dibayar Tunai":"green",Draft:"gray","Belum Bayar":"orange","Menunggu Pembayaran":"blue","Menunggu Verifikasi":"blue","Menunggu Konfirmasi":"blue",Batal:"red",Reguler:"purple",Paket:"blue"}[e]||"gray"}function yi(e){document.getElementById("bpg-detail-title").textContent=e.nama_pemesanan||"-",document.getElementById("bpg-detail-subtitle").textContent=e.booking_code||"-",document.getElementById("bpg-detail-full-link").href=`/dashboard/bookings/${e.id}`;const t=e.category==="Paket",n=document.getElementById("bpg-detail-ticket-link"),a=document.getElementById("bpg-detail-surat-link");t?(n.hidden=!0,a.hidden=!1,a.href=`/dashboard/bookings/${e.id}/surat-bukti`):(n.hidden=!1,n.href=`/unduh/tiket-reguler/${e.booking_code}`,a.hidden=!0);const o=e.booking_status||"",r=e.payment_status||"",s=e.service_type||"",i=(e.pickup_location||"").trim()!=="",c=(e.dropoff_location||"").trim()!=="",d=document.getElementById("bpg-detail-body");d.innerHTML=`
        <!-- Status Badges -->
        <div class="bpg-dv-status-bar">
            ${o?`<span class="bpg-dv-badge bpg-dv-badge--${sa(o)}">${u(o)}</span>`:""}
            ${r?`<span class="bpg-dv-badge bpg-dv-badge--${sa(r)}">${u(r)}</span>`:""}
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
    `,N("bpg-detail-modal")}function vi(){return(p.formOptions?.seat_options||[]).map(e=>e.code)}function un(e){const t=new Map(vi().map((n,a)=>[n,a]));return Array.from(new Set((e||[]).map(n=>String(n).trim()).filter(n=>t.has(n)))).sort((n,a)=>(t.get(n)??999)-(t.get(a)??999))}function St(){return Number(document.getElementById("booking-passenger-count")?.value||0)}function Ei(){const e=St();return(p.formOptions?.seat_options||[]).filter(t=>!t.is_optional||e>=6).map(t=>t.code)}function wi(){return p.formOptions?.payment_status_options||[]}function Bi(e){return e==="transfer"?["Belum Bayar","Menunggu Pembayaran","Menunggu Verifikasi","Dibayar"]:e==="qris"?["Belum Bayar","Menunggu Pembayaran","Dibayar"]:e==="cash"?["Belum Bayar","Dibayar Tunai"]:["Belum Bayar"]}function Ii(e){return e==="transfer"?"Menunggu Pembayaran":e==="qris"?"Dibayar":e==="cash"?"Dibayar Tunai":"Belum Bayar"}function _i(e){return e==="transfer"?"Menunggu Verifikasi Pembayaran":e==="qris"||e==="cash"?"Diproses":"Draft"}function $i(e,t){if(!e||!t||e===t)return null;const a=(p.formOptions?.route_matrix||{})?.[e]?.[t];return a==null?null:Number(a)}function Za(){return Math.max(0,parseInt(document.getElementById("booking-additional-fare")?.value||"0",10)||0)}function Se(){const e=document.getElementById("booking-from-city")?.value||"",t=document.getElementById("booking-to-city")?.value||"",n=St(),a=$i(e,t),o=Za(),r=a!==null?a+o:null,s=r!==null?r*n:null,i=document.getElementById("booking-price-per-seat"),c=document.getElementById("booking-total-amount");i&&(i.value=a!==null?V(a):""),c&&(c.value=s!==null?V(s):"")}function mn(){const e=document.getElementById("booking-payment-method")?.value||"",t=document.getElementById("booking-payment-status"),n=document.getElementById("booking-booking-status"),a=document.getElementById("booking-bank-account-group"),o=document.getElementById("booking-bank-account-code"),r=Bi(e),s=t?.value||"";a&&(a.hidden=e!=="transfer"),o&&e!=="transfer"&&(o.value=""),t&&(t.innerHTML=wi().filter(i=>r.includes(i.value)).map(i=>`<option value="${u(i.value)}">${u(i.label)}</option>`).join(""),t.value=r.includes(s)?s:Ii(e)),n&&(n.value=_i(e))}function Si(){const e=document.getElementById("booking-selected-seats-inputs");e&&(e.innerHTML=p.selectedSeats.map(t=>`<input type="hidden" name="selected_seats[]" value="${u(t)}">`).join(""))}function Ci(){const e=document.getElementById("booking-selected-seat-count"),t=document.getElementById("booking-selected-seat-label");e&&(e.textContent=String(p.selectedSeats.length)),t&&(t.textContent=p.selectedSeats.length>0?p.selectedSeats.join(", "):"Belum dipilih")}function Kt(){document.querySelectorAll("[data-passenger-seat]").forEach(e=>{const t=e.dataset.passengerSeat;t&&(p.passengerDraftMap[t]={seat_no:t,name:e.querySelector("[data-passenger-name]")?.value.trim()||"",phone:e.querySelector("[data-passenger-phone]")?.value.trim()||""})})}function me(e=null){const t=document.getElementById("booking-passenger-editor");if(t){if(e&&(p.passengerDraftMap=Object.fromEntries(e.map(n=>[n.seat_no,n]))),p.selectedSeats.length===0){t.innerHTML='<div class="dashboard-empty-state dashboard-empty-state--block bookings-passenger-empty">Pilih kursi terlebih dahulu untuk menampilkan form data penumpang.</div>';return}t.innerHTML=`
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
        </div>`}}async function qe(){const e=document.getElementById("booking-trip-date")?.value||"",t=document.getElementById("booking-trip-time")?.value||"",n=document.getElementById("booking-from-city")?.value||"",a=document.getElementById("booking-to-city")?.value||"",o=p.editItem?.id||"",r=p.currentFormArmadaIndex||1;if(!e||!t){p.occupiedSeatsForForm=[];return}try{const s=new URLSearchParams({trip_date:e,trip_time:t,armada_index:r});n&&s.set("from_city",n),a&&s.set("to_city",a),o&&s.set("exclude_id",o);const i=await v(`/bookings/occupied-seats?${s}`);p.occupiedSeatsForForm=Array.isArray(i?.occupied_seats)?i.occupied_seats:[]}catch{p.occupiedSeatsForForm=[]}}async function Oe(){const e=document.getElementById("pkg-trip-date")?.value||"",t=document.getElementById("pkg-trip-time")?.value||"",n=document.getElementById("pkg-from-city")?.value||"",a=document.getElementById("pkg-to-city")?.value||"",o=parseInt(document.getElementById("package-armada-index")?.value||"1",10);if(!e||!t){p.occupiedSeatsForPackageForm=[],ia();return}try{const r=new URLSearchParams({trip_date:e,trip_time:t,armada_index:o});n&&r.set("from_city",n),a&&r.set("to_city",a);const s=await v(`/bookings/occupied-seats?${r}`);p.occupiedSeatsForPackageForm=Array.isArray(s?.occupied_seats)?s.occupied_seats:[]}catch{p.occupiedSeatsForPackageForm=[]}ia()}function ia(){const e=document.getElementById("pkg-seat-code");if(!e)return;const t=(p.formOptions?.seat_options||[]).filter(o=>!o.is_optional),n=p.occupiedSeatsForPackageForm||[],a=e.value;e.innerHTML='<option value="">Pilih kursi</option>'+t.map(o=>{const r=n.includes(o.code);return`<option value="${u(o.code)}"${r?" disabled":""}>${u(o.label)}${r?" — Sudah dipesan":""}</option>`}).join(""),a&&!n.includes(a)&&(e.value=a)}function pe(){const e=document.querySelectorAll("[data-seat-code]"),t=St(),n=Ei();p.selectedSeats=un(p.selectedSeats.filter(a=>n.includes(a)&&!p.occupiedSeatsForForm.includes(a))),e.forEach(a=>{const o=a.dataset.seatCode,r=n.includes(o),s=p.occupiedSeatsForForm.includes(o),i=p.selectedSeats.includes(o),c=p.selectedSeats.length>=t&&!i;a.hidden=!r,a.classList.toggle("is-selected",i),a.classList.toggle("is-occupied",s),a.classList.toggle("is-disabled",!s&&c),a.disabled=!r||s||!i&&c,s?a.title="Kursi sudah dipesan":a.title=""}),Si(),Ci()}function jt(e=1,t=""){document.getElementById("booking-form")?.reset(),p.editItem=null,p.selectedSeats=[],p.passengerDraftMap={},p.currentFormArmadaIndex=e;const a=p.date||Ze();document.getElementById("booking-id").value="",document.getElementById("booking-armada-index").value=String(e),document.getElementById("booking-form-title").textContent="Tambah Pemesanan";const o=e>1?` (Armada ${e})`:"";document.getElementById("booking-form-description").textContent=`Lengkapi data pemesanan reguler dari dashboard admin${o}.`,document.getElementById("booking-trip-date").value=a,document.getElementById("booking-trip-time").value=t||"";const r=document.getElementById("booking-from-city"),s=document.getElementById("booking-to-city");r&&(r.value=""),s&&(s.value=""),document.getElementById("booking-passenger-count").value="1",document.getElementById("booking-additional-fare").value="0",document.getElementById("booking-payment-method").value="",document.getElementById("booking-booking-status").value="Draft",mn(),Se(),se(document.getElementById("booking-submit-btn"),!1,"Menyimpan..."),qe().then(()=>{pe(),me()})}function xi(e){p.editItem=e,p.selectedSeats=un(e.selected_seats||[]),p.passengerDraftMap=Object.fromEntries((e.passengers||[]).map(n=>[n.seat_no,n])),p.currentFormArmadaIndex=e.armada_index||1,document.getElementById("booking-id").value=e.id,document.getElementById("booking-armada-index").value=String(e.armada_index||1),document.getElementById("booking-booking-for").value=e.booking_for,document.getElementById("booking-category").value=e.category,document.getElementById("booking-from-city").value=e.from_city,document.getElementById("booking-to-city").value=e.to_city,document.getElementById("booking-trip-date").value=e.trip_date_value,document.getElementById("booking-trip-time").value=e.trip_time_value,document.getElementById("booking-passenger-count").value=String(e.passenger_count),document.getElementById("booking-driver-name").value=e.driver_name==="Menunggu Penetapan Driver"?"":e.driver_name||"",document.getElementById("booking-additional-fare").value=String(e.additional_fare_per_passenger||0),document.getElementById("booking-pickup-location").value=e.pickup_location,document.getElementById("booking-dropoff-location").value=e.dropoff_location,document.getElementById("booking-payment-method").value=e.payment_method_value||"",mn(),document.getElementById("booking-payment-status").value=e.payment_status,document.getElementById("booking-booking-status").value=e.booking_status,document.getElementById("booking-bank-account-code").value=e.bank_account_code||"",document.getElementById("booking-notes").value=e.notes||"";const t=(e.armada_index||1)>1?` (Armada ${e.armada_index})`:"";document.getElementById("booking-form-title").textContent="Edit Pemesanan",document.getElementById("booking-form-description").textContent=`Perbarui data pemesanan reguler yang dipilih${t}.`,Se(),se(document.getElementById("booking-submit-btn"),!1,"Menyimpan..."),qe().then(()=>{pe(),me(e.passengers||[])})}function Li(){return Kt(),{booking_for:document.getElementById("booking-booking-for")?.value||"",category:document.getElementById("booking-category")?.value||"Reguler",from_city:document.getElementById("booking-from-city")?.value||"",to_city:document.getElementById("booking-to-city")?.value||"",trip_date:document.getElementById("booking-trip-date")?.value||"",trip_time:document.getElementById("booking-trip-time")?.value||"",passenger_count:Number(document.getElementById("booking-passenger-count")?.value||0),driver_name:document.getElementById("booking-driver-name")?.value.trim()||"",additional_fare_per_passenger:Za(),pickup_location:document.getElementById("booking-pickup-location")?.value.trim()||"",dropoff_location:document.getElementById("booking-dropoff-location")?.value.trim()||"",selected_seats:p.selectedSeats,passengers:p.selectedSeats.map(e=>({seat_no:e,name:p.passengerDraftMap?.[e]?.name||"",phone:p.passengerDraftMap?.[e]?.phone||""})),payment_method:document.getElementById("booking-payment-method")?.value||"",payment_status:document.getElementById("booking-payment-status")?.value||"Belum Bayar",booking_status:document.getElementById("booking-booking-status")?.value||"Draft",bank_account_code:document.getElementById("booking-bank-account-code")?.value||"",notes:document.getElementById("booking-notes")?.value.trim()||"",armada_index:p.currentFormArmadaIndex||1}}async function Ti(e){xi(await v(`/bookings/${e}`)),N("booking-form-modal")}function Ai(e){p.deleteItem=e,document.getElementById("booking-delete-copy").innerHTML=`Apakah Anda yakin ingin menghapus data pemesanan <strong>${u(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`,N("booking-delete-modal")}function da(){const e=document.getElementById("bookings-access-note"),t=document.getElementById("bpg-route-tabs"),n=document.getElementById("bpg-slots-shell");e&&(e.hidden=!1),t&&(t.hidden=!0),n&&(n.hidden=!0)}function Mi(e){return e==="Berangkat"?{label:"Berangkat",cls:"bpg-depart-trigger--go"}:e==="Tidak Berangkat"?{label:"Tidak Berangkat",cls:"bpg-depart-trigger--no"}:e==="Di Oper"?{label:"Di Oper",cls:"bpg-depart-trigger--oper"}:{label:"Status",cls:""}}function Ri({user:e}={}){const t=document.getElementById("bookings-add-btn"),n=document.getElementById("bookings-date-picker"),a=document.getElementById("bpg-route-tabs"),o=document.getElementById("bpg-slots-shell"),r=document.getElementById("booking-form"),s=document.getElementById("booking-delete-confirm-btn"),i=document.getElementById("booking-seat-grid"),c=document.getElementById("booking-passenger-editor"),d=document.getElementById("booking-payment-method");if(p.formOptions=Ot("bookings-form-options"),p.drivers=Ot("bookings-drivers-data")||[],p.mobils=Ot("bookings-mobils-data")||[],p.currentUser=e||window.transitAuthUser||null,p.date=Ze(),!si(p.currentUser?.role)){da();return}const l=document.getElementById("bpg-route-tabs");l&&(l.hidden=!1),o&&(o.hidden=!1);const g=document.getElementById("bookings-access-note");g&&(g.hidden=!0),n&&(n.value=p.date,n.addEventListener("change",async()=>{p.date=n.value,p.slotDriverMap={},p.slotMobilMap={},p.slotExtraArmadas={},await _e()})),a?.addEventListener("click",async h=>{const w=h.target.closest("[data-direction]");if(!w)return;const E=w.dataset.direction;E!==p.direction&&(p.direction=E,p.slotDriverMap={},p.slotMobilMap={},p.slotExtraArmadas={},document.querySelectorAll(".bpg-route-tab").forEach(T=>{T.classList.toggle("is-active",T.dataset.direction===E)}),await _e())});function B(h=null){o?.querySelectorAll("[data-depart-dropdown]").forEach(w=>{String(w.dataset.departDropdown)!==String(h)&&(w.querySelector(".bpg-depart-menu")?.removeAttribute("hidden"),w.querySelector(".bpg-depart-menu")?.setAttribute("hidden",""))})}document.addEventListener("click",h=>{h.target.closest("[data-depart-dropdown]")||B()}),o?.addEventListener("click",async h=>{const w=h.target.closest("[data-depart-toggle]"),E=h.target.closest("[data-booking-departure]"),T=h.target.closest("[data-booking-lihat]"),j=h.target.closest("[data-booking-edit]"),F=h.target.closest("[data-booking-delete]"),q=h.target.closest("[data-add-armada]"),J=h.target.closest("[data-slot-book]"),Q=h.target.closest("[data-surat-jalan]");try{if(w){const P=w.dataset.departToggle,I=o.querySelector(`[data-depart-dropdown="${CSS.escape(P)}"]`)?.querySelector(".bpg-depart-menu");if(!I)return;const D=I.hasAttribute("hidden");B(P),I.toggleAttribute("hidden",!D);return}if(E){const P=E.dataset.bookingDeparture,U=E.dataset.departureStatus,I=p.bookings.find(K=>String(K.id)===String(P));if(!I)return;const D=I.departure_status===U?"":U;I.departure_status=D;const z=o.querySelector(`[data-depart-dropdown="${CSS.escape(P)}"]`);if(z){const K=z.querySelector(".bpg-depart-trigger"),Y=Mi(D);K.className=`bpg-depart-trigger ${Y.cls}`,K.childNodes.forEach(W=>{W.nodeType===3&&(W.textContent=Y.label)}),z.querySelectorAll("[data-booking-departure]").forEach(W=>{W.classList.toggle("is-active",W.dataset.departureStatus===D)}),z.querySelector(".bpg-depart-menu")?.setAttribute("hidden","")}const oe=p.bookings.find(K=>String(K.id)===String(P));await v(`/bookings/${P}/departure-status`,{method:"PATCH",body:{departure_status:D,version:oe?.version??0}});return}if(T){const P=T.dataset.bookingLihat,U=p.bookings.find(I=>String(I.id)===String(P));U&&yi(U);return}if(j){await Ti(j.dataset.bookingEdit);return}if(F){const P=F.dataset.bookingDelete,U=p.bookings.find(I=>String(I.id)===String(P));Ai({id:P,nama:F.dataset.bookingName,version:U?.version??0});return}if(q){const P=q.dataset.addArmada,I=parseInt(q.dataset.armadaIndex||"1")+1,D=`${P}__${p.direction}`;p.slotExtraArmadas[D]=Math.max(p.slotExtraArmadas[D]||1,I),v("/bookings/armada-extras",{method:"POST",body:{trip_date:p.date,trip_time:P,armada_index:I}}).catch(()=>{}),Xa(),p._pendingChoiceArmada=I,p._pendingChoiceTime=P,N("booking-type-choice-modal");return}if(J){const P=J.dataset.slotBook,U=parseInt(J.dataset.slotArmada||"1");p._pendingChoiceArmada=U,p._pendingChoiceTime=P,N("booking-type-choice-modal");return}if(Q){const P=Q.dataset.suratJalan,U=parseInt(Q.dataset.suratJalanArmada||"1"),I=`${P}__${p.direction}__${U}`,D=p.slotDriverMap[I]||"",z=p.slotMobilMap[I]||"",oe=D?p.drivers.find(W=>String(W.id)===String(D)):null,K=z?p.mobils.find(W=>String(W.id)===String(z)):null,Y=new URLSearchParams({date:p.date,trip_time:P,armada_index:String(U),direction:p.direction});oe&&Y.set("driver_name",oe.nama),K&&Y.set("no_pol",K.kode_mobil),window.open(`/dashboard/bookings/surat-jalan?${Y}`,"_blank");return}}catch(P){if(Rt(P))return;y(P.message||"Gagal memuat data pemesanan")}}),o?.addEventListener("change",async h=>{const w=h.target.closest("[data-slot-driver]"),E=h.target.closest("[data-slot-mobil]");if(w){const[T,j]=w.dataset.slotDriver.split("__"),F=parseInt(j||"1"),q=w.value,J=w.options[w.selectedIndex],Q=q&&J?.text.split(" (")[0]||"",P=`${T}__${p.direction}__${F}`;p.slotDriverMap[P]=q;try{await v("/bookings/slot-assign",{method:"PATCH",body:{trip_date:p.date,trip_time:T,direction:p.direction,armada_index:F,driver_id:q||null,driver_name:Q}}),H("Driver berhasil diperbarui")}catch(U){y(U.message||"Gagal memperbarui driver")}}if(E){const[T,j]=E.dataset.slotMobil.split("__"),F=parseInt(j||"1"),q=E.value,J=`${T}__${p.direction}__${F}`;p.slotMobilMap[J]=q}});function R(h=1,w=""){const E=document.getElementById("package-form");E&&E.reset();const T=document.getElementById("package-armada-index");T&&(T.value=String(h));const j=document.getElementById("pkg-trip-date");j&&(j.value=p.date);const F=document.getElementById("pkg-trip-time");F&&w&&(F.value=w);const q=document.getElementById("pkg-bank-account-group");q&&(q.hidden=!0);const J=document.getElementById("pkg-seat-group");J&&(J.hidden=!0);const Q=document.getElementById("package-form-success-banner");Q&&(Q.hidden=!0),f(),Oe()}function f(){const h=parseInt(document.getElementById("pkg-fare-amount")?.value||"0",10)||0,w=parseInt(document.getElementById("pkg-additional-fare")?.value||"0",10)||0,E=parseInt(document.getElementById("pkg-item-qty")?.value||"1",10)||1,T=(h+w)*E,j=document.getElementById("pkg-total-display");j&&(j.value=T>0?"Rp "+T.toLocaleString("id-ID"):"")}document.getElementById("pkg-fare-amount")?.addEventListener("input",f),document.getElementById("pkg-additional-fare")?.addEventListener("input",f),document.getElementById("pkg-item-qty")?.addEventListener("input",f),document.getElementById("pkg-payment-method")?.addEventListener("change",h=>{const w=document.getElementById("pkg-bank-account-group");w&&(w.hidden=h.target.value!=="transfer")}),document.getElementById("pkg-package-size")?.addEventListener("change",h=>{const w=document.getElementById("pkg-seat-group");w&&(w.hidden=h.target.value!=="Besar");const E=document.getElementById("pkg-seat-code");E&&h.target.value!=="Besar"&&(E.value="")}),document.getElementById("pkg-trip-date")?.addEventListener("change",()=>{Oe()}),document.getElementById("pkg-trip-time")?.addEventListener("change",()=>{Oe()}),document.getElementById("pkg-from-city")?.addEventListener("change",()=>{Oe()}),document.getElementById("pkg-to-city")?.addEventListener("change",()=>{Oe()}),document.getElementById("package-form")?.addEventListener("submit",async h=>{h.preventDefault();const w=document.getElementById("package-submit-btn");se(w,!0,"Menyimpan...");try{const E=parseInt(document.getElementById("pkg-fare-amount")?.value||"0",10)||0,T=parseInt(document.getElementById("pkg-additional-fare")?.value||"0",10)||0,j=parseInt(document.getElementById("pkg-item-qty")?.value||"1",10)||1,F=document.getElementById("pkg-payment-method")?.value||"",q={armada_index:parseInt(document.getElementById("package-armada-index")?.value||"1",10),trip_date:document.getElementById("pkg-trip-date")?.value||"",trip_time:document.getElementById("pkg-trip-time")?.value||"",from_city:document.getElementById("pkg-from-city")?.value||"",to_city:document.getElementById("pkg-to-city")?.value||"",sender_name:document.getElementById("pkg-sender-name")?.value.trim()||"",sender_phone:document.getElementById("pkg-sender-phone")?.value.trim()||"",sender_address:document.getElementById("pkg-sender-address")?.value.trim()||"",recipient_name:document.getElementById("pkg-recipient-name")?.value.trim()||"",recipient_phone:document.getElementById("pkg-recipient-phone")?.value.trim()||"",recipient_address:document.getElementById("pkg-recipient-address")?.value.trim()||"",item_name:document.getElementById("pkg-item-name")?.value.trim()||"",item_qty:j,package_size:document.getElementById("pkg-package-size")?.value||"",seat_code:document.getElementById("pkg-package-size")?.value==="Besar"&&document.getElementById("pkg-seat-code")?.value||"",fare_amount:E,additional_fare:T,payment_method:F||null,payment_status:document.getElementById("pkg-payment-status")?.value||"Belum Bayar",bank_account_code:F==="transfer"&&document.getElementById("pkg-bank-account-code")?.value||""},J=await v("/bookings/quick-package",{method:"POST",body:q}),Q=document.getElementById("package-form-success-banner"),P=document.getElementById("package-form-booking-code"),U=document.getElementById("package-form-download-link");Q&&(Q.hidden=!1),P&&(P.textContent="Kode Booking: "+J.booking_code+(J.invoice_number&&J.invoice_number!=="-"?" | No. Surat: "+J.invoice_number:"")),U&&(U.href=J.invoice_download_url),H("Paket berhasil disimpan: "+J.booking_code),await _e()}catch(E){y(E.message||"Silakan periksa kembali data yang diinput","Gagal menyimpan paket")}finally{se(w,!1,"Menyimpan...")}}),document.getElementById("choice-passenger-btn")?.addEventListener("click",()=>{Z("booking-type-choice-modal"),jt(p._pendingChoiceArmada||1,p._pendingChoiceTime||""),N("booking-form-modal"),requestAnimationFrame(()=>Se())}),document.getElementById("choice-package-btn")?.addEventListener("click",()=>{Z("booking-type-choice-modal"),R(p._pendingChoiceArmada||1,p._pendingChoiceTime||""),N("package-form-modal")}),t?.addEventListener("click",()=>{p._pendingChoiceArmada=1,p._pendingChoiceTime="",N("booking-type-choice-modal")}),i?.addEventListener("click",h=>{const w=h.target.closest("[data-seat-code]");if(!w||w.disabled)return;Kt();const E=w.dataset.seatCode;p.selectedSeats.includes(E)?p.selectedSeats=p.selectedSeats.filter(T=>T!==E):p.selectedSeats.length<St()&&(p.selectedSeats=un([...p.selectedSeats,E])),pe(),me()}),document.getElementById("booking-passenger-count")?.addEventListener("change",()=>{Kt(),pe(),me(),Se()}),document.getElementById("booking-additional-fare")?.addEventListener("input",Se),document.getElementById("booking-trip-date")?.addEventListener("change",()=>{qe().then(()=>{pe(),me()})}),document.getElementById("booking-trip-time")?.addEventListener("change",()=>{qe().then(()=>{pe(),me()})});let k=!1;function b(){Se(),!k&&(k=!0,setTimeout(()=>{k=!1,qe().then(()=>{pe(),me()})},50))}return["change","input"].forEach(h=>{document.getElementById("booking-from-city")?.addEventListener(h,b),document.getElementById("booking-to-city")?.addEventListener(h,b)}),d?.addEventListener("change",mn),c?.addEventListener("input",h=>{const w=h.target.closest("[data-passenger-seat]");if(!w)return;const E=w.dataset.passengerSeat;p.passengerDraftMap[E]={seat_no:E,name:w.querySelector("[data-passenger-name]")?.value.trim()||"",phone:w.querySelector("[data-passenger-phone]")?.value.trim()||""}}),r?.addEventListener("submit",async h=>{h.preventDefault();const w=document.getElementById("booking-submit-btn");se(w,!0,"Menyimpan...");try{const E=Li();if(p.editItem){const T={...E,version:p.editItem.version};await v(`/bookings/${p.editItem.id}`,{method:"PUT",body:T}),H("Data pemesanan berhasil diperbarui")}else await v("/bookings",{method:"POST",body:E}),H("Data pemesanan berhasil ditambahkan");Z("booking-form-modal"),jt(),await _e()}catch(E){if(Rt(E))return;y(E.message||"Silakan periksa kembali data yang diinput","Gagal menyimpan data pemesanan")}finally{se(w,!1,"Menyimpan...")}}),s?.addEventListener("click",async()=>{if(p.deleteItem){se(s,!0,"Menghapus...");try{await v(`/bookings/${p.deleteItem.id}?version=${p.deleteItem.version}`,{method:"DELETE"}),H("Data pemesanan berhasil dihapus"),Z("booking-delete-modal"),p.deleteItem=null,await _e()}catch(h){if(Rt(h))return;y(h.message||"Gagal menghapus data pemesanan")}finally{se(s,!1,"Menghapus...")}}}),jt(),_e().catch(h=>{if(h.status===403){da();return}y(h.message||"Gagal memuat data penumpang")})}function Pi(e){const t=document.getElementById(e);if(!t)return{};try{return JSON.parse(t.textContent||"{}")}catch{return{}}}function Di(){const e=document.querySelector("[data-regular-booking-page]");if(!e)return;const t=Pi("regular-booking-route-matrix"),n=e.querySelector("[data-booking-origin]"),a=e.querySelector("[data-booking-destination]"),o=e.querySelector("[data-booking-schedule]"),r=e.querySelector("[data-booking-passengers]"),s=e.querySelector("[data-route-fare-input]"),i=e.querySelector("[data-additional-fare-input]"),c=e.querySelector("[data-estimated-total-input]"),d=e.querySelector("[data-route-feedback]"),l=e.querySelector("[data-route-feedback-title]"),g=e.querySelector("[data-route-feedback-text]"),B=e.querySelector("[data-booking-submit]"),R=Array.from(e.querySelectorAll("[data-booking-type]")),f=e.querySelector("[data-summary-booking-for]"),k=e.querySelector("[data-summary-route]"),b=e.querySelector("[data-summary-schedule]"),h=e.querySelector("[data-summary-passengers]"),w=e.querySelector("[data-summary-fare]"),E=e.querySelector("[data-summary-additional-fare]"),T=e.querySelector("[data-summary-total]"),j=new Map(R.map(I=>[I.value,I.dataset.label||I.value])),F=new Map(Array.from(o?.options||[]).filter(I=>I.value).map(I=>[I.value,I.textContent.trim()]));function q(I,D){if(!I||!D||I===D)return null;const z=t?.[I]?.[D];return z==null?null:Number(z)}function J(I,D,z){!d||!l||!g||(d.dataset.state=I,l.textContent=D,g.textContent=z)}function Q(){e.querySelectorAll(".regular-booking-radio").forEach(I=>{const D=I.querySelector('input[type="radio"]');I.classList.toggle("is-selected",!!D?.checked)})}function P(I){return I<=0?"Belum dipilih":I===6?"6 Penumpang (Opsional tambahan)":`${I} Penumpang`}function U(){const I=n?.value||"",D=a?.value||"",z=o?.value||"",oe=Number(r?.value||0),K=R.find(Ct=>Ct.checked)?.value||"",Y=q(I,D),W=Math.max(parseInt(i?.value||"0",10)||0,0),ce=Y!==null&&oe>0?(Y+W)*oe:null;s&&(s.value=Y!==null?V(Y):""),c&&(c.value=ce!==null?V(ce):""),!I||!D?J("idle","Tarif akan ditampilkan otomatis","Pilih asal dan tujuan untuk melihat tarif perjalanan reguler."):I===D?J("error","Asal dan tujuan tidak boleh sama","Silakan pilih tujuan yang berbeda agar tarif dapat dihitung."):Y===null?J("error","Rute belum tersedia","Rute yang Anda pilih saat ini belum tersedia. Silakan pilih kombinasi asal dan tujuan lain."):J("ready","Rute tersedia","Tarif telah diisi otomatis berdasarkan kombinasi rute dua arah yang tersedia."),B&&(B.disabled=!!(I&&D&&(I===D||Y===null))),f&&(f.textContent=j.get(K)||"Belum dipilih"),k&&(k.textContent=I&&D?`${I} - ${D}`:"Belum dipilih"),b&&(b.textContent=F.get(z)||"Belum dipilih"),h&&(h.textContent=P(oe)),w&&(w.textContent=Y!==null?V(Y):"Belum tersedia"),E&&(E.textContent=W>0?V(W):"Tidak ada"),T&&(T.textContent=ce!==null?V(ce):"Belum tersedia"),Q()}[n,a,o,r].forEach(I=>{I?.addEventListener("change",U)}),i?.addEventListener("input",U),R.forEach(I=>{I.addEventListener("change",U)}),e.querySelector("form")?.addEventListener("reset",()=>{window.requestAnimationFrame(U)}),U()}function Oi(){const e=document.querySelector("[data-regular-booking-seat-page]");if(!e)return;const t=Number(e.dataset.requiredSeatCount||0),n=Array.from(e.querySelectorAll("[data-seat-card]")),a=Array.from(e.querySelectorAll("[data-seat-input]")),o=e.querySelector("[data-seat-summary-count]"),r=e.querySelector("[data-seat-summary-list]"),s=e.querySelector("[data-seat-summary-remaining]"),i=e.querySelector("[data-seat-submit]"),c=e.querySelector("[data-seat-feedback]"),d=e.querySelector("[data-seat-feedback-title]"),l=e.querySelector("[data-seat-feedback-text]");function g(){return a.filter(k=>k.checked).map(k=>k.value)}function B(k){return k.length>0?k.join(", "):"Belum dipilih"}function R(k,b,h){!c||!d||!l||(c.dataset.state=k,d.textContent=b,l.textContent=h)}function f(){const k=g(),b=k.length,h=t>0&&b>=t;if(n.forEach(w=>{const E=w.querySelector("[data-seat-input]");if(!E)return;const T=E.disabled&&!E.checked&&w.classList.contains("is-occupied"),j=E.checked,F=T||h&&!j;T||(E.disabled=F),w.classList.toggle("is-selected",j),w.classList.toggle("is-disabled",!T&&F)}),o&&(o.textContent=`${b} dari ${t}`),r&&(r.textContent=B(k)),s&&(s.textContent=String(Math.max(t-b,0))),i&&(i.disabled=b!==t),b===0){R("idle","Pilih kursi sesuai jumlah penumpang","Jumlah kursi yang dipilih harus sama dengan jumlah penumpang pada booking draft.");return}if(b<t){R("idle","Pemilihan kursi belum lengkap",`Masih perlu memilih ${t-b} kursi lagi sebelum dapat melanjutkan.`);return}if(t===6){R("ready","Semua kursi sudah terisi","Jumlah penumpang 6 orang sudah terpenuhi dan kursi tambahan 2B ikut terpakai.");return}R("ready","Kursi sudah sesuai","Jumlah kursi yang dipilih sudah sesuai dengan jumlah penumpang dan siap disimpan.")}a.forEach(k=>{k.addEventListener("change",()=>{f()})}),f()}let Ne=null,yt=!1,la="",ji=3e3,ca=0;const vt=[],L=e=>document.getElementById(e);async function Qa(e){const t=e.trim();if(!t)return;const n=Date.now();if(!(t===la&&n-ca<ji)){la=t,ca=n,Ce("Memproses scan…");try{const a=await v("/scan-qr",{method:"POST",body:{qr_token:t}});qi(a),Ui(a),a.already_scanned?y(a.message,"Tiket Sudah Pernah Di-Scan"):a.is_newly_eligible?H(a.message,"🎉 Eligible Diskon!"):H(a.message,"Scan Berhasil")}catch(a){Ni(a.message||"Scan gagal"),y(a.message||"Scan gagal","Scan Gagal")}finally{Ce(yt?"Kamera aktif — arahkan ke QR code.":"")}}}function qi(e){L("qrscan-result-idle").hidden=!0,L("qrscan-result-card").hidden=!1;const t=e.booking||{},n=e.passenger||{},a=e.loyalty_count,o=e.loyalty_target,r=e.discount_eligible,s=Math.min(Math.round(a/o*100),100),i=e.already_scanned?"warn":e.success?"success":"error";L("qrscan-result-header").className="qrscan-result-header qrscan-result-header--"+i,L("qrscan-result-icon").innerHTML=e.already_scanned?Vi():e.success?Gi():eo(),L("qrscan-result-title").textContent=t.booking_code||"-",L("qrscan-result-subtitle").textContent=e.message,L("qr-res-name").textContent=n.name||t.nama_pemesanan||"-",L("qr-res-code").textContent=t.booking_code||"-",L("qr-res-route").textContent=t.route_label||"-",L("qr-res-datetime").textContent=(t.trip_date||"-")+" "+(t.trip_time||""),L("qr-res-seats").textContent=n.seat_no||t.selected_seats||"-",L("qr-res-pax").textContent=(t.passenger_count||0)+" Orang",L("qr-res-loyalty-label").textContent=a+" / "+o,L("qr-res-loyalty-fill").style.width=s+"%",L("qr-res-loyalty-fill").className="qrscan-loyalty-fill"+(r?" qrscan-loyalty-fill--done":""),L("qr-res-loyalty-note").textContent=r?"✅ Eligible diskon "+(e.discount_percentage||50)+"%":"Perlu "+Math.max(o-a,0)+" perjalanan lagi untuk diskon."}function Ni(e){L("qrscan-result-idle").hidden=!0,L("qrscan-result-card").hidden=!1,L("qrscan-result-header").className="qrscan-result-header qrscan-result-header--error",L("qrscan-result-icon").innerHTML=eo(),L("qrscan-result-title").textContent="Scan Gagal",L("qrscan-result-subtitle").textContent=e,["qr-res-name","qr-res-code","qr-res-route","qr-res-datetime","qr-res-seats","qr-res-pax"].forEach(t=>{L(t).textContent="-"}),L("qr-res-loyalty-label").textContent="– / –",L("qr-res-loyalty-fill").style.width="0%",L("qr-res-loyalty-note").textContent=""}function Ui(e){const t=e.booking,n=new Date().toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit",second:"2-digit"}),a=e.passenger||{};vt.unshift({booking:t,passenger:a,time:n,success:e.success,already_scanned:e.already_scanned,message:e.message}),Ya()}function Ya(){const e=L("qrscan-history-list");if(vt.length===0){e.innerHTML='<p class="qrscan-history-empty">Belum ada scan dalam sesi ini.</p>';return}e.innerHTML=vt.map(t=>{const n=t.already_scanned?"warn":t.success?"ok":"err",a=t.passenger&&t.passenger.name?t.passenger.name+(t.passenger.seat_no?" ("+t.passenger.seat_no+")":""):t.booking.nama_pemesanan||"-";return`
        <div class="qrscan-history-item qrscan-history-item--${n}">
            <div class="qrscan-history-dot"></div>
            <div class="qrscan-history-body">
                <strong>${u(t.booking.booking_code||"-")}</strong>
                <span>${u(a)}</span>
            </div>
            <span class="qrscan-history-time">${t.time}</span>
        </div>`}).join("")}function Hi(){if(!window.Html5Qrcode){y("Library scanner tidak tersedia. Coba muat ulang halaman.","Error");return}L("qrscan-placeholder").hidden=!0,L("qrscan-frame").hidden=!1,L("qrscan-btn-start").hidden=!0,L("qrscan-btn-stop").hidden=!1,yt=!0,Ce("Menginisialisasi kamera…"),Ne=new window.Html5Qrcode("qrscan-reader"),Ne.start({facingMode:"environment"},{fps:10,qrbox:{width:240,height:240}},e=>{let t=e.trim();try{const n=JSON.parse(e);n&&(n.qr_token||n.passenger_qr_token)&&(t=n.qr_token||n.passenger_qr_token)}catch{}Qa(t)},()=>{}).then(()=>{Ce("Kamera aktif — arahkan ke QR code.")}).catch(e=>{yt=!1,L("qrscan-placeholder").hidden=!1,L("qrscan-frame").hidden=!0,L("qrscan-btn-start").hidden=!1,L("qrscan-btn-stop").hidden=!0,Ce("Gagal mengakses kamera. Pastikan izin kamera sudah diberikan."),y(String(e),"Kamera Error")})}function Fi(){Ne&&Ne.stop().catch(()=>{}).finally(()=>{Ne=null}),yt=!1,L("qrscan-placeholder").hidden=!1,L("qrscan-frame").hidden=!0,L("qrscan-btn-start").hidden=!1,L("qrscan-btn-stop").hidden=!0,Ce("Kamera dihentikan.")}function Ce(e){L("qrscan-status-text").textContent=e}function Gi(){return`<svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
        <path d="M8 12l3 3 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`}function eo(){return`<svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
        <path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`}function Vi(){return`<svg viewBox="0 0 24 24" fill="none">
        <path d="M12 9v4M12 17h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    </svg>`}function Ji(){L("qrscan-btn-start").addEventListener("click",Hi),L("qrscan-btn-stop").addEventListener("click",Fi),L("qrscan-clear-history").addEventListener("click",()=>{vt.length=0,Ya()}),L("qrscan-manual-form").addEventListener("submit",e=>{e.preventDefault();const t=L("qrscan-manual-input").value.trim();t&&(Qa(t),L("qrscan-manual-input").value="")})}const A={data:[],loading:!0,totalCount:0,page:1,search:"",chartLimit:10,editItem:null,deleteItem:null,isSubmitting:!1};let et=null;const ke=15,Ki=()=>`<svg viewBox="0 0 24 24" fill="none">
    <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
</svg>`,zi=()=>`<svg viewBox="0 0 24 24" fill="none">
    <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
</svg>`;function Wi(){const e=document.getElementById("plkt-table-body");e&&(e.innerHTML=`
        <tr><td colspan="10" class="plkt-table-state">
            <div class="plkt-loading-inline">
                <span class="plkt-loading-inline-spinner" aria-hidden="true"></span>
                <span>Memuat data...</span>
            </div>
        </td></tr>`)}function Xi(){const e=document.getElementById("plkt-table-body");e&&(e.innerHTML='<tr><td colspan="10" class="plkt-table-state plkt-empty-copy">Belum ada data penumpang.</td></tr>')}function ua(){const e=document.getElementById("plkt-table-body");if(e){if(A.loading){Wi();return}if(A.data.length===0){Xi();return}e.innerHTML=A.data.map((t,n)=>`
        <tr class="plkt-row">
            <td class="plkt-index-cell">${(A.page-1)*ke+n+1}</td>
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
                        ${zi()}
                    </button>
                </div>
            </td>
        </tr>`).join("")}}function ma(){const e=document.getElementById("plkt-pagination-shell"),t=document.getElementById("plkt-pagination-info"),n=document.getElementById("plkt-pagination-page"),a=document.getElementById("plkt-prev-page-btn"),o=document.getElementById("plkt-next-page-btn"),r=Math.max(1,Math.ceil(A.totalCount/ke));e&&(e.hidden=r<=1),t&&(t.textContent=ye(A.page,ke,A.totalCount,A.data.length)),n&&(n.textContent=`${A.page} / ${r}`),a&&(a.disabled=A.page===1),o&&(o.disabled=A.page>=r)}async function $e(){A.loading=!0,ua(),ma();try{const[e,t]=await Promise.all([v(`/passengers-lkt?page=${A.page}&limit=${ke}${A.search?`&search=${encodeURIComponent(A.search)}`:""}`),v(`/passengers-lkt/count${A.search?`?search=${encodeURIComponent(A.search)}`:""}`)]);A.data=Array.isArray(e)?e:[],A.totalCount=Number(t?.count||0)}catch(e){y(e.message||"Gagal memuat data","Error"),A.data=[],A.totalCount=0}finally{A.loading=!1,ua(),ma()}}function zt(e){const t=document.getElementById("plkt-edit-submit-btn");A.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":"Simpan")}async function Zi(e){try{const t=await v(`/passengers-lkt/${e}`);A.editItem=t;const n=document.getElementById("plkt-edit-name"),a=document.getElementById("plkt-edit-phone"),o=document.getElementById("plkt-edit-id");o&&(o.value=t.id),n&&(n.value=t.name||""),a&&(a.value=t.phone||""),zt(!1),N("plkt-edit-modal")}catch{y("Gagal memuat data penumpang")}}function Qi(e,t){A.deleteItem={id:e,name:t};const n=document.getElementById("plkt-delete-copy");n&&(n.innerHTML=`Apakah Anda yakin ingin menghapus penumpang <strong>${u(t)}</strong>? Tindakan ini tidak dapat dibatalkan.`),N("plkt-delete-modal")}async function tt(){const e=document.getElementById("plkt-loyalty-chart"),t=document.getElementById("plkt-chart-empty");if(e)try{const n=await v(`/passengers-lkt/loyalty-chart?limit=${A.chartLimit}`);if(!Array.isArray(n)||n.length===0){e.hidden=!0,t&&(t.hidden=!1);return}e.hidden=!1,t&&(t.hidden=!0);const a=n.map(i=>i.passenger_name+(i.phone&&i.phone!=="-"?` (${i.phone})`:"")),o=n.map(i=>i.booking_count),r=Math.max(...o,1),s=o.map(i=>{const c=i/r;return`rgba(${Math.round(26+c*30)}, ${Math.round(35+c*80)}, ${Math.round(126+c*50)}, 0.85)`});et&&(et.destroy(),et=null),et=new window.Chart(e,{type:"bar",data:{labels:a,datasets:[{label:"Jumlah Pemesanan",data:o,backgroundColor:s,borderRadius:6,borderSkipped:!1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{title:i=>i[0].label,label:i=>` ${i.raw} kali pemesanan`}}},scales:{x:{ticks:{maxRotation:35,font:{size:11},color:"#374151"},grid:{display:!1}},y:{beginAtZero:!0,ticks:{stepSize:1,color:"#374151",font:{size:11}},grid:{color:"rgba(0,0,0,0.06)"}}}}})}catch{t&&(t.hidden=!1)}}function Yi(){if(A.data.length===0){y("Tidak ada data untuk diekspor.");return}const e=["No","Nama Penumpang","No HP","Dari","Tujuan","Tanggal Berangkat","Jam","Tarif","Kali Memesan"],t=A.data.map((s,i)=>[(A.page-1)*ke+i+1,s.passenger_name||"-",s.phone||"-",s.from_city||"-",s.to_city||"-",s.trip_date||"-",s.trip_time||"-",s.tarif||"-",s.booking_count]),n=[e,...t].map(s=>s.map(i=>`"${String(i).replace(/"/g,'""')}"`).join(",")).join(`
`),a=new Blob(["\uFEFF"+n],{type:"text/csv;charset=utf-8;"}),o=URL.createObjectURL(a),r=document.createElement("a");r.href=o,r.download="data-penumpang-jet.csv",r.click(),URL.revokeObjectURL(o)}function ed(){const e=document.getElementById("plkt-search-input"),t=document.getElementById("plkt-prev-page-btn"),n=document.getElementById("plkt-next-page-btn"),a=document.getElementById("plkt-export-btn"),o=document.getElementById("plkt-chart-limit"),r=document.getElementById("plkt-table-body"),s=document.getElementById("plkt-edit-form"),i=document.getElementById("plkt-delete-confirm-btn");e?.addEventListener("input",he(async c=>{A.search=c.target.value.trim(),A.page=1,await $e().catch(()=>y("Gagal memuat data"))},400)),t?.addEventListener("click",async()=>{A.page<=1||(A.page-=1,await $e().catch(()=>y("Gagal memuat data")))}),n?.addEventListener("click",async()=>{const c=Math.max(1,Math.ceil(A.totalCount/ke));A.page>=c||(A.page+=1,await $e().catch(()=>y("Gagal memuat data")))}),a?.addEventListener("click",Yi),o?.addEventListener("change",async c=>{A.chartLimit=parseInt(c.target.value,10)||10,await tt().catch(()=>{})}),r?.addEventListener("click",async c=>{const d=c.target.closest("[data-plkt-edit]"),l=c.target.closest("[data-plkt-delete]");d&&await Zi(d.dataset.plktEdit),l&&Qi(l.dataset.plktDelete,l.dataset.plktName)}),s?.addEventListener("submit",async c=>{c.preventDefault();const d=document.getElementById("plkt-edit-id")?.value,l=document.getElementById("plkt-edit-name")?.value.trim(),g=document.getElementById("plkt-edit-phone")?.value.trim();if(!l){y("Nama penumpang tidak boleh kosong");return}zt(!0);try{await v(`/passengers-lkt/${d}`,{method:"PUT",body:{name:l,phone:g}}),H("Data penumpang berhasil diperbarui"),Z("plkt-edit-modal"),await Promise.all([$e(),tt()])}catch(B){y(B.message||"Gagal menyimpan data")}finally{zt(!1)}}),i?.addEventListener("click",async()=>{if(A.deleteItem)try{await v(`/passengers-lkt/${A.deleteItem.id}`,{method:"DELETE"}),H("Data penumpang berhasil dihapus"),Z("plkt-delete-modal"),A.deleteItem=null,(A.page-1)*ke>=A.totalCount-1&&A.page>1&&(A.page-=1),await Promise.all([$e(),tt()])}catch(c){y(c.message||"Gagal menghapus data")}}),$e().catch(()=>y("Gagal memuat data")),tt().catch(()=>{})}const G={data:[],loading:!0,totalCount:0,page:1,search:"",detailItem:null,isLoadingDetail:!1},Ve=20,td=()=>`<svg viewBox="0 0 24 24" fill="none">
    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/>
</svg>`;function to(e){const t={high:["badge-emerald","Tinggi"],medium:["badge-blue","Sedang"],low:["badge-yellow","Rendah"]},[n,a]=t[e]??["badge-gray",e??"-"];return`<span class="stock-value-badge ${n}">${u(a)}</span>`}function no(e){const t={active:["stock-value-badge-emerald","Aktif"],merged:["stock-value-badge-blue","Digabung"],inactive:["stock-value-badge-red","Nonaktif"]},[n,a]=t[e]??["stock-value-badge-blue",e??"-"];return`<span class="stock-value-badge ${n}">${u(a)}</span>`}function ao(e){return e?'<span class="stock-value-badge stock-value-badge-emerald">✓ Eligible</span>':'<span class="stock-value-badge stock-value-badge-blue">—</span>'}function nd(){const e=document.getElementById("cust-table-body");e&&(e.innerHTML=`
        <tr><td colspan="8" class="plkt-table-state">
            <div class="plkt-loading-inline">
                <span class="plkt-loading-inline-spinner" aria-hidden="true"></span>
                <span>Memuat data...</span>
            </div>
        </td></tr>`)}function ad(){const e=document.getElementById("cust-table-body");e&&(e.innerHTML='<tr><td colspan="8" class="plkt-table-state plkt-empty-copy">Belum ada data pelanggan.</td></tr>')}function pa(){const e=document.getElementById("cust-table-body");if(e){if(G.loading){nd();return}if(G.data.length===0){ad();return}e.innerHTML=G.data.map((t,n)=>`
        <tr class="plkt-row">
            <td class="plkt-index-cell">${(G.page-1)*Ve+n+1}</td>
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
                        <span class="plkt-user-seat">${to(t.identity_confidence)}</span>
                    </div>
                </div>
            </td>
            <td class="plkt-phone-cell">${u(t.phone_normalized||t.phone_original||"-")}</td>
            <td class="text-center">
                <strong>${t.total_trip_count??0}</strong>
                <span style="color:var(--color-text-muted);font-size:.75rem"> / 5</span>
            </td>
            <td class="text-center">${ao(t.discount_eligible)}</td>
            <td class="text-center">${no(t.status)}</td>
            <td class="text-center">
                <button class="plkt-icon-button" type="button"
                    data-cust-detail="${t.id}"
                    aria-label="Detail pelanggan ${u(t.display_name||"")}">
                    ${td()}
                </button>
            </td>
        </tr>`).join("")}}function od(){const e=document.getElementById("cust-pagination-shell"),t=document.getElementById("cust-pagination-info"),n=document.getElementById("cust-pagination-page"),a=document.getElementById("cust-prev-page-btn"),o=document.getElementById("cust-next-page-btn"),r=Math.max(1,Math.ceil(G.totalCount/Ve));e&&(e.hidden=!1),t&&(t.textContent=ye(G.page,Ve,G.totalCount,G.data.length)),n&&(n.textContent=`${G.page} / ${r}`),a&&(a.disabled=G.page===1),o&&(o.disabled=G.page>=r)}async function rd(){try{const[e,t,n]=await Promise.all([v("/customers?limit=1"),v("/customers?limit=1&discount_eligible=1"),v("/customers?limit=1&has_phone=1")]),a=document.getElementById("cust-stat-total"),o=document.getElementById("cust-stat-eligible"),r=document.getElementById("cust-stat-with-phone");a&&(a.textContent=(e?.total??0).toLocaleString("id-ID")),o&&(o.textContent=(t?.total??0).toLocaleString("id-ID")),r&&(r.textContent=(n?.total??0).toLocaleString("id-ID"))}catch{}}async function nt(){G.loading=!0,pa();try{const e=new URLSearchParams({page:G.page,limit:Ve});G.search&&e.set("search",G.search);const t=await v(`/customers?${e.toString()}`);G.data=Array.isArray(t?.data)?t.data:[],G.totalCount=Number(t?.total??0)}catch(e){y(e.message||"Gagal memuat data pelanggan","Error"),G.data=[],G.totalCount=0}finally{G.loading=!1,pa(),od()}}async function sd(e){const t=document.getElementById("cust-detail-name"),n=document.getElementById("cust-detail-code"),a=document.getElementById("cust-detail-body");t&&(t.textContent="Detail Pelanggan"),n&&(n.textContent=""),a&&(a.innerHTML=`
        <div class="plkt-loading-inline">
            <span class="plkt-loading-inline-spinner" aria-hidden="true"></span>
            <span>Memuat detail...</span>
        </div>`),N("cust-detail-modal");try{const o=await v(`/customers/${e}`);t&&(t.textContent=o.display_name||"-"),n&&(n.textContent=o.customer_code||"");const r=o.recent_bookings?.length?o.recent_bookings.map(s=>`
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
                <dd>${no(o.status)}</dd>
                <dt>Kepercayaan Data</dt>
                <dd>${to(o.identity_confidence)}</dd>
                <dt>Total Perjalanan</dt>
                <dd><strong>${o.total_trip_count??0}</strong> / 5</dd>
                <dt>Eligible Diskon</dt>
                <dd>${ao(o.discount_eligible)}</dd>
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
            </div>`)}catch(o){a&&(a.innerHTML=`<p class="plkt-empty-copy">Gagal memuat detail: ${u(o.message||"Terjadi kesalahan")}</p>`)}}async function id(){try{const t=(await v("/customers/duplicates?limit=5"))?.total??0;t===0?H("Tidak ada duplikasi pelanggan terdeteksi.","Tidak Ada Duplikasi"):y(`Terdeteksi ${t} pasang pelanggan berpotensi duplikat. Gunakan API untuk merge.`,`${t} Duplikasi Ditemukan`)}catch(e){y(e.message||"Gagal memeriksa duplikasi","Error")}}function dd(){const e=document.getElementById("cust-search-input"),t=document.getElementById("cust-prev-page-btn"),n=document.getElementById("cust-next-page-btn"),a=document.getElementById("cust-table-body"),o=document.getElementById("cust-duplicates-btn");e?.addEventListener("input",he(async r=>{G.search=r.target.value.trim(),G.page=1,await nt().catch(()=>y("Gagal memuat data"))},400)),t?.addEventListener("click",async()=>{G.page<=1||(G.page-=1,await nt().catch(()=>y("Gagal memuat data")))}),n?.addEventListener("click",async()=>{const r=Math.max(1,Math.ceil(G.totalCount/Ve));G.page>=r||(G.page+=1,await nt().catch(()=>y("Gagal memuat data")))}),o?.addEventListener("click",id),a?.addEventListener("click",async r=>{const s=r.target.closest("[data-cust-detail]");s&&await sd(s.dataset.custDetail)}),nt().catch(()=>y("Gagal memuat data")),rd().catch(()=>{})}function ld(e){return!e||e<=0?"":"Rp "+Math.floor(e).toLocaleString("id-ID")}function cd(){const e=document.querySelector("[data-fare-input]"),t=document.querySelector("[data-additional-fare-input]"),n=document.querySelector("[data-estimated-total-input]");function a(){const o=parseInt(e?.value||"0",10)||0,r=parseInt(t?.value||"0",10)||0,s=o+r;n&&(n.value=ld(s))}e?.addEventListener("input",a),t?.addEventListener("input",a),document.querySelectorAll('.regular-booking-radio input[type="radio"]').forEach(o=>{o.addEventListener("change",()=>{document.querySelectorAll(`.regular-booking-radio input[name="${o.name}"]`).forEach(s=>{s.closest(".regular-booking-radio")?.classList.toggle("is-selected",s.checked)})})})}function qt(e){return"Rp "+Math.floor(e).toLocaleString("id-ID")}function je(e){const t=document.getElementById(e);t&&(t.showModal?.()||t.setAttribute("open",""))}function ud(e){const t=document.getElementById(e);t&&(t.close?.()||t.removeAttribute("open"))}function md(e){const t=e.closest("tr[data-row]");if(!t)return null;try{return JSON.parse(t.dataset.row)}catch{return null}}function pd(e){const t=document.getElementById("show-detail-grid");if(!t)return;const n={transfer:"Transfer Bank",qris:"QRIS",cash:"Tunai","":"—"};t.innerHTML=`
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
    `}function gd(e){const t=document.getElementById("form-edit");if(!t)return;const n=window.__DROPPING_DATA_UPDATE_BASE__||"/dashboard/dropping-data";t.action=`${n}/${e.id}`;const a=(o,r)=>{const s=t.querySelector(`[name="${o}"]`);s&&(s.value=r??"")};a("passenger_name",e.passenger_name),a("passenger_phone",e.passenger_phone),a("from_city",e.from_city),a("to_city",e.to_city),a("pickup_location",e.pickup_location),a("dropoff_location",e.dropoff_location),a("price_per_seat",e.price_per_seat),a("additional_fare",e.additional_fare),a("trip_date",e.trip_date),a("trip_time",e.trip_time),a("notes",e.notes),a("payment_method",e.payment_method),a("payment_status",e.payment_status),a("driver_id",e.driver_id),a("mobil_id",e.mobil_id)}function fd(e){const t=document.getElementById("form-delete"),n=document.getElementById("delete-booking-code");if(!t||!n)return;const a=window.__DROPPING_DATA_UPDATE_BASE__||"/dashboard/dropping-data";t.action=`${a}/${e.id}`,n.textContent=e.booking_code}function bd(){window.__DROPPING_DATA_UPDATE_BASE__="/dashboard/dropping-data",document.getElementById("btn-open-create")?.addEventListener("click",()=>{je("modal-create")}),document.getElementById("btn-open-create-empty")?.addEventListener("click",()=>{je("modal-create")}),document.addEventListener("click",e=>{const t=e.target.closest("[data-action]");if(!t)return;const n=t.dataset.action,a=md(t);a&&(n==="show"?(pd(a),je("modal-show")):n==="edit"?(gd(a),je("modal-edit")):n==="delete"&&(fd(a),je("modal-delete")))}),document.querySelectorAll("[data-close-modal]").forEach(e=>{e.addEventListener("click",()=>ud(e.dataset.closeModal))}),document.querySelectorAll(".ddrop-modal").forEach(e=>{e.addEventListener("click",t=>{t.target===e&&(e.close?.()||e.removeAttribute("open"))})})}const kd={"admin-users/index":ri,"auth/login":Qr,"bookings/index":Ri,"dashboard/index":cs,"drivers/index":vs,"mobil/index":Ts,"keberangkatan/index":js,"regular-bookings/index":Di,"regular-bookings/seats":Oi,"stock/index":Gs,"qr-scan/index":Ji,"passengers-lkt/index":ed,"customers/index":dd,"dropping-bookings/index":cd,"dropping-data/index":bd};document.addEventListener("DOMContentLoaded",async()=>{zr(),Zr(),dt(Na());const e=Hr();e&&(e.type==="success"?H(e.message,e.title):e.type==="info"?Wr(e.message,e.title):y(e.message,e.title));try{const{user:t}=await Kr();t&&dt(t);const n=document.body.dataset.pageScript,a=kd[n];typeof a=="function"&&await a({user:t})}catch(t){console.error(t),y(t.message||"Terjadi kesalahan saat memuat halaman")}});
