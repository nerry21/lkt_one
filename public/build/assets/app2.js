function In(e,t){return function(){return e.apply(t,arguments)}}const{toString:ia}=Object.prototype,{getPrototypeOf:ft}=Object,{iterator:Je,toStringTag:Cn}=Symbol,ze=(e=>t=>{const n=ia.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),V=e=>(e=e.toLowerCase(),t=>ze(t)===e),We=e=>t=>typeof t===e,{isArray:de}=Array,oe=We("undefined");function ke(e){return e!==null&&!oe(e)&&e.constructor!==null&&!oe(e.constructor)&&D(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const $n=V("ArrayBuffer");function da(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&$n(e.buffer),t}const la=We("string"),D=We("function"),Sn=We("number"),ye=e=>e!==null&&typeof e=="object",ca=e=>e===!0||e===!1,Re=e=>{if(ze(e)!=="object")return!1;const t=ft(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Cn in e)&&!(Je in e)},ua=e=>{if(!ye(e)||ke(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},ma=V("Date"),fa=V("File"),pa=e=>!!(e&&typeof e.uri<"u"),ga=e=>e&&typeof e.getParts<"u",ba=V("Blob"),ha=V("FileList"),ka=e=>ye(e)&&D(e.pipe);function ya(){return typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}}const Ot=ya(),Pt=typeof Ot.FormData<"u"?Ot.FormData:void 0,Ea=e=>{let t;return e&&(Pt&&e instanceof Pt||D(e.append)&&((t=ze(e))==="formdata"||t==="object"&&D(e.toString)&&e.toString()==="[object FormData]"))},wa=V("URLSearchParams"),[va,Ba,Ia,Ca]=["ReadableStream","Request","Response","Headers"].map(V),$a=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function Ee(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let a,r;if(typeof e!="object"&&(e=[e]),de(e))for(a=0,r=e.length;a<r;a++)t.call(null,e[a],a,e);else{if(ke(e))return;const o=n?Object.getOwnPropertyNames(e):Object.keys(e),s=o.length;let l;for(a=0;a<s;a++)l=o[a],t.call(null,e[l],l,e)}}function Tn(e,t){if(ke(e))return null;t=t.toLowerCase();const n=Object.keys(e);let a=n.length,r;for(;a-- >0;)if(r=n[a],t===r.toLowerCase())return r;return null}const Z=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,Rn=e=>!oe(e)&&e!==Z;function st(){const{caseless:e,skipUndefined:t}=Rn(this)&&this||{},n={},a=(r,o)=>{if(o==="__proto__"||o==="constructor"||o==="prototype")return;const s=e&&Tn(n,o)||o;Re(n[s])&&Re(r)?n[s]=st(n[s],r):Re(r)?n[s]=st({},r):de(r)?n[s]=r.slice():(!t||!oe(r))&&(n[s]=r)};for(let r=0,o=arguments.length;r<o;r++)arguments[r]&&Ee(arguments[r],a);return n}const Sa=(e,t,n,{allOwnKeys:a}={})=>(Ee(t,(r,o)=>{n&&D(r)?Object.defineProperty(e,o,{value:In(r,n),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(e,o,{value:r,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:a}),e),Ta=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),Ra=(e,t,n,a)=>{e.prototype=Object.create(t.prototype,a),Object.defineProperty(e.prototype,"constructor",{value:e,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},xa=(e,t,n,a)=>{let r,o,s;const l={};if(t=t||{},e==null)return t;do{for(r=Object.getOwnPropertyNames(e),o=r.length;o-- >0;)s=r[o],(!a||a(s,e,t))&&!l[s]&&(t[s]=e[s],l[s]=!0);e=n!==!1&&ft(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},_a=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const a=e.indexOf(t,n);return a!==-1&&a===n},La=e=>{if(!e)return null;if(de(e))return e;let t=e.length;if(!Sn(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},Aa=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&ft(Uint8Array)),Oa=(e,t)=>{const a=(e&&e[Je]).call(e);let r;for(;(r=a.next())&&!r.done;){const o=r.value;t.call(e,o[0],o[1])}},Pa=(e,t)=>{let n;const a=[];for(;(n=e.exec(t))!==null;)a.push(n);return a},Ma=V("HTMLFormElement"),Da=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,a,r){return a.toUpperCase()+r}),Mt=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),ja=V("RegExp"),xn=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),a={};Ee(n,(r,o)=>{let s;(s=t(r,o,e))!==!1&&(a[o]=s||r)}),Object.defineProperties(e,a)},Ua=e=>{xn(e,(t,n)=>{if(D(e)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const a=e[n];if(D(a)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},Na=(e,t)=>{const n={},a=r=>{r.forEach(o=>{n[o]=!0})};return de(e)?a(e):a(String(e).split(t)),n},Ha=()=>{},Fa=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function qa(e){return!!(e&&D(e.append)&&e[Cn]==="FormData"&&e[Je])}const Va=e=>{const t=new Array(10),n=(a,r)=>{if(ye(a)){if(t.indexOf(a)>=0)return;if(ke(a))return a;if(!("toJSON"in a)){t[r]=a;const o=de(a)?[]:{};return Ee(a,(s,l)=>{const u=n(s,r+1);!oe(u)&&(o[l]=u)}),t[r]=void 0,o}}return a};return n(e,0)},Ga=V("AsyncFunction"),Ja=e=>e&&(ye(e)||D(e))&&D(e.then)&&D(e.catch),_n=((e,t)=>e?setImmediate:t?((n,a)=>(Z.addEventListener("message",({source:r,data:o})=>{r===Z&&o===n&&a.length&&a.shift()()},!1),r=>{a.push(r),Z.postMessage(n,"*")}))(`axios@${Math.random()}`,[]):n=>setTimeout(n))(typeof setImmediate=="function",D(Z.postMessage)),za=typeof queueMicrotask<"u"?queueMicrotask.bind(Z):typeof process<"u"&&process.nextTick||_n,Wa=e=>e!=null&&D(e[Je]),c={isArray:de,isArrayBuffer:$n,isBuffer:ke,isFormData:Ea,isArrayBufferView:da,isString:la,isNumber:Sn,isBoolean:ca,isObject:ye,isPlainObject:Re,isEmptyObject:ua,isReadableStream:va,isRequest:Ba,isResponse:Ia,isHeaders:Ca,isUndefined:oe,isDate:ma,isFile:fa,isReactNativeBlob:pa,isReactNative:ga,isBlob:ba,isRegExp:ja,isFunction:D,isStream:ka,isURLSearchParams:wa,isTypedArray:Aa,isFileList:ha,forEach:Ee,merge:st,extend:Sa,trim:$a,stripBOM:Ta,inherits:Ra,toFlatObject:xa,kindOf:ze,kindOfTest:V,endsWith:_a,toArray:La,forEachEntry:Oa,matchAll:Pa,isHTMLForm:Ma,hasOwnProperty:Mt,hasOwnProp:Mt,reduceDescriptors:xn,freezeMethods:Ua,toObjectSet:Na,toCamelCase:Da,noop:Ha,toFiniteNumber:Fa,findKey:Tn,global:Z,isContextDefined:Rn,isSpecCompliantForm:qa,toJSONObject:Va,isAsyncFn:Ga,isThenable:Ja,setImmediate:_n,asap:za,isIterable:Wa};let E=class Ln extends Error{static from(t,n,a,r,o,s){const l=new Ln(t.message,n||t.code,a,r,o);return l.cause=t,l.name=t.name,t.status!=null&&l.status==null&&(l.status=t.status),s&&Object.assign(l,s),l}constructor(t,n,a,r,o){super(t),Object.defineProperty(this,"message",{value:t,enumerable:!0,writable:!0,configurable:!0}),this.name="AxiosError",this.isAxiosError=!0,n&&(this.code=n),a&&(this.config=a),r&&(this.request=r),o&&(this.response=o,this.status=o.status)}toJSON(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:c.toJSONObject(this.config),code:this.code,status:this.status}}};E.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";E.ERR_BAD_OPTION="ERR_BAD_OPTION";E.ECONNABORTED="ECONNABORTED";E.ETIMEDOUT="ETIMEDOUT";E.ERR_NETWORK="ERR_NETWORK";E.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";E.ERR_DEPRECATED="ERR_DEPRECATED";E.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";E.ERR_BAD_REQUEST="ERR_BAD_REQUEST";E.ERR_CANCELED="ERR_CANCELED";E.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";E.ERR_INVALID_URL="ERR_INVALID_URL";const Ka=null;function it(e){return c.isPlainObject(e)||c.isArray(e)}function An(e){return c.endsWith(e,"[]")?e.slice(0,-2):e}function et(e,t,n){return e?e.concat(t).map(function(r,o){return r=An(r),!n&&o?"["+r+"]":r}).join(n?".":""):t}function Xa(e){return c.isArray(e)&&!e.some(it)}const Za=c.toFlatObject(c,{},null,function(t){return/^is[A-Z]/.test(t)});function Ke(e,t,n){if(!c.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=c.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(b,p){return!c.isUndefined(p[b])});const a=n.metaTokens,r=n.visitor||i,o=n.dots,s=n.indexes,u=(n.Blob||typeof Blob<"u"&&Blob)&&c.isSpecCompliantForm(t);if(!c.isFunction(r))throw new TypeError("visitor must be a function");function d(f){if(f===null)return"";if(c.isDate(f))return f.toISOString();if(c.isBoolean(f))return f.toString();if(!u&&c.isBlob(f))throw new E("Blob is not supported. Use a Buffer instead.");return c.isArrayBuffer(f)||c.isTypedArray(f)?u&&typeof Blob=="function"?new Blob([f]):Buffer.from(f):f}function i(f,b,p){let R=f;if(c.isReactNative(t)&&c.isReactNativeBlob(f))return t.append(et(p,b,o),d(f)),!1;if(f&&!p&&typeof f=="object"){if(c.endsWith(b,"{}"))b=a?b:b.slice(0,-2),f=JSON.stringify(f);else if(c.isArray(f)&&Xa(f)||(c.isFileList(f)||c.endsWith(b,"[]"))&&(R=c.toArray(f)))return b=An(b),R.forEach(function(_,P){!(c.isUndefined(_)||_===null)&&t.append(s===!0?et([b],P,o):s===null?b:b+"[]",d(_))}),!1}return it(f)?!0:(t.append(et(p,b,o),d(f)),!1)}const m=[],y=Object.assign(Za,{defaultVisitor:i,convertValue:d,isVisitable:it});function S(f,b){if(!c.isUndefined(f)){if(m.indexOf(f)!==-1)throw Error("Circular reference detected in "+b.join("."));m.push(f),c.forEach(f,function(R,N){(!(c.isUndefined(R)||R===null)&&r.call(t,R,c.isString(N)?N.trim():N,b,y))===!0&&S(R,b?b.concat(N):[N])}),m.pop()}}if(!c.isObject(e))throw new TypeError("data must be an object");return S(e),t}function Dt(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(a){return t[a]})}function pt(e,t){this._pairs=[],e&&Ke(e,this,t)}const On=pt.prototype;On.append=function(t,n){this._pairs.push([t,n])};On.toString=function(t){const n=t?function(a){return t.call(this,a,Dt)}:Dt;return this._pairs.map(function(r){return n(r[0])+"="+n(r[1])},"").join("&")};function Qa(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function Pn(e,t,n){if(!t)return e;const a=n&&n.encode||Qa,r=c.isFunction(n)?{serialize:n}:n,o=r&&r.serialize;let s;if(o?s=o(t,r):s=c.isURLSearchParams(t)?t.toString():new pt(t,r).toString(a),s){const l=e.indexOf("#");l!==-1&&(e=e.slice(0,l)),e+=(e.indexOf("?")===-1?"?":"&")+s}return e}class jt{constructor(){this.handlers=[]}use(t,n,a){return this.handlers.push({fulfilled:t,rejected:n,synchronous:a?a.synchronous:!1,runWhen:a?a.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){c.forEach(this.handlers,function(a){a!==null&&t(a)})}}const gt={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0},Ya=typeof URLSearchParams<"u"?URLSearchParams:pt,er=typeof FormData<"u"?FormData:null,tr=typeof Blob<"u"?Blob:null,nr={isBrowser:!0,classes:{URLSearchParams:Ya,FormData:er,Blob:tr},protocols:["http","https","file","blob","url","data"]},bt=typeof window<"u"&&typeof document<"u",dt=typeof navigator=="object"&&navigator||void 0,ar=bt&&(!dt||["ReactNative","NativeScript","NS"].indexOf(dt.product)<0),rr=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",or=bt&&window.location.href||"http://localhost",sr=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:bt,hasStandardBrowserEnv:ar,hasStandardBrowserWebWorkerEnv:rr,navigator:dt,origin:or},Symbol.toStringTag,{value:"Module"})),O={...sr,...nr};function ir(e,t){return Ke(e,new O.classes.URLSearchParams,{visitor:function(n,a,r,o){return O.isNode&&c.isBuffer(n)?(this.append(a,n.toString("base64")),!1):o.defaultVisitor.apply(this,arguments)},...t})}function dr(e){return c.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function lr(e){const t={},n=Object.keys(e);let a;const r=n.length;let o;for(a=0;a<r;a++)o=n[a],t[o]=e[o];return t}function Mn(e){function t(n,a,r,o){let s=n[o++];if(s==="__proto__")return!0;const l=Number.isFinite(+s),u=o>=n.length;return s=!s&&c.isArray(r)?r.length:s,u?(c.hasOwnProp(r,s)?r[s]=[r[s],a]:r[s]=a,!l):((!r[s]||!c.isObject(r[s]))&&(r[s]=[]),t(n,a,r[s],o)&&c.isArray(r[s])&&(r[s]=lr(r[s])),!l)}if(c.isFormData(e)&&c.isFunction(e.entries)){const n={};return c.forEachEntry(e,(a,r)=>{t(dr(a),r,n,0)}),n}return null}function cr(e,t,n){if(c.isString(e))try{return(t||JSON.parse)(e),c.trim(e)}catch(a){if(a.name!=="SyntaxError")throw a}return(n||JSON.stringify)(e)}const we={transitional:gt,adapter:["xhr","http","fetch"],transformRequest:[function(t,n){const a=n.getContentType()||"",r=a.indexOf("application/json")>-1,o=c.isObject(t);if(o&&c.isHTMLForm(t)&&(t=new FormData(t)),c.isFormData(t))return r?JSON.stringify(Mn(t)):t;if(c.isArrayBuffer(t)||c.isBuffer(t)||c.isStream(t)||c.isFile(t)||c.isBlob(t)||c.isReadableStream(t))return t;if(c.isArrayBufferView(t))return t.buffer;if(c.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let l;if(o){if(a.indexOf("application/x-www-form-urlencoded")>-1)return ir(t,this.formSerializer).toString();if((l=c.isFileList(t))||a.indexOf("multipart/form-data")>-1){const u=this.env&&this.env.FormData;return Ke(l?{"files[]":t}:t,u&&new u,this.formSerializer)}}return o||r?(n.setContentType("application/json",!1),cr(t)):t}],transformResponse:[function(t){const n=this.transitional||we.transitional,a=n&&n.forcedJSONParsing,r=this.responseType==="json";if(c.isResponse(t)||c.isReadableStream(t))return t;if(t&&c.isString(t)&&(a&&!this.responseType||r)){const s=!(n&&n.silentJSONParsing)&&r;try{return JSON.parse(t,this.parseReviver)}catch(l){if(s)throw l.name==="SyntaxError"?E.from(l,E.ERR_BAD_RESPONSE,this,null,this.response):l}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:O.classes.FormData,Blob:O.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};c.forEach(["delete","get","head","post","put","patch"],e=>{we.headers[e]={}});const ur=c.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),mr=e=>{const t={};let n,a,r;return e&&e.split(`
`).forEach(function(s){r=s.indexOf(":"),n=s.substring(0,r).trim().toLowerCase(),a=s.substring(r+1).trim(),!(!n||t[n]&&ur[n])&&(n==="set-cookie"?t[n]?t[n].push(a):t[n]=[a]:t[n]=t[n]?t[n]+", "+a:a)}),t},Ut=Symbol("internals");function ue(e){return e&&String(e).trim().toLowerCase()}function xe(e){return e===!1||e==null?e:c.isArray(e)?e.map(xe):String(e)}function fr(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let a;for(;a=n.exec(e);)t[a[1]]=a[2];return t}const pr=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function tt(e,t,n,a,r){if(c.isFunction(a))return a.call(this,t,n);if(r&&(t=n),!!c.isString(t)){if(c.isString(a))return t.indexOf(a)!==-1;if(c.isRegExp(a))return a.test(t)}}function gr(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,a)=>n.toUpperCase()+a)}function br(e,t){const n=c.toCamelCase(" "+t);["get","set","has"].forEach(a=>{Object.defineProperty(e,a+n,{value:function(r,o,s){return this[a].call(this,t,r,o,s)},configurable:!0})})}let j=class{constructor(t){t&&this.set(t)}set(t,n,a){const r=this;function o(l,u,d){const i=ue(u);if(!i)throw new Error("header name must be a non-empty string");const m=c.findKey(r,i);(!m||r[m]===void 0||d===!0||d===void 0&&r[m]!==!1)&&(r[m||u]=xe(l))}const s=(l,u)=>c.forEach(l,(d,i)=>o(d,i,u));if(c.isPlainObject(t)||t instanceof this.constructor)s(t,n);else if(c.isString(t)&&(t=t.trim())&&!pr(t))s(mr(t),n);else if(c.isObject(t)&&c.isIterable(t)){let l={},u,d;for(const i of t){if(!c.isArray(i))throw TypeError("Object iterator must return a key-value pair");l[d=i[0]]=(u=l[d])?c.isArray(u)?[...u,i[1]]:[u,i[1]]:i[1]}s(l,n)}else t!=null&&o(n,t,a);return this}get(t,n){if(t=ue(t),t){const a=c.findKey(this,t);if(a){const r=this[a];if(!n)return r;if(n===!0)return fr(r);if(c.isFunction(n))return n.call(this,r,a);if(c.isRegExp(n))return n.exec(r);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=ue(t),t){const a=c.findKey(this,t);return!!(a&&this[a]!==void 0&&(!n||tt(this,this[a],a,n)))}return!1}delete(t,n){const a=this;let r=!1;function o(s){if(s=ue(s),s){const l=c.findKey(a,s);l&&(!n||tt(a,a[l],l,n))&&(delete a[l],r=!0)}}return c.isArray(t)?t.forEach(o):o(t),r}clear(t){const n=Object.keys(this);let a=n.length,r=!1;for(;a--;){const o=n[a];(!t||tt(this,this[o],o,t,!0))&&(delete this[o],r=!0)}return r}normalize(t){const n=this,a={};return c.forEach(this,(r,o)=>{const s=c.findKey(a,o);if(s){n[s]=xe(r),delete n[o];return}const l=t?gr(o):String(o).trim();l!==o&&delete n[o],n[l]=xe(r),a[l]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return c.forEach(this,(a,r)=>{a!=null&&a!==!1&&(n[r]=t&&c.isArray(a)?a.join(", "):a)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const a=new this(t);return n.forEach(r=>a.set(r)),a}static accessor(t){const a=(this[Ut]=this[Ut]={accessors:{}}).accessors,r=this.prototype;function o(s){const l=ue(s);a[l]||(br(r,s),a[l]=!0)}return c.isArray(t)?t.forEach(o):o(t),this}};j.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);c.reduceDescriptors(j.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(a){this[n]=a}}});c.freezeMethods(j);function nt(e,t){const n=this||we,a=t||n,r=j.from(a.headers);let o=a.data;return c.forEach(e,function(l){o=l.call(n,o,r.normalize(),t?t.status:void 0)}),r.normalize(),o}function Dn(e){return!!(e&&e.__CANCEL__)}let ve=class extends E{constructor(t,n,a){super(t??"canceled",E.ERR_CANCELED,n,a),this.name="CanceledError",this.__CANCEL__=!0}};function jn(e,t,n){const a=n.config.validateStatus;!n.status||!a||a(n.status)?e(n):t(new E("Request failed with status code "+n.status,[E.ERR_BAD_REQUEST,E.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}function hr(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function kr(e,t){e=e||10;const n=new Array(e),a=new Array(e);let r=0,o=0,s;return t=t!==void 0?t:1e3,function(u){const d=Date.now(),i=a[o];s||(s=d),n[r]=u,a[r]=d;let m=o,y=0;for(;m!==r;)y+=n[m++],m=m%e;if(r=(r+1)%e,r===o&&(o=(o+1)%e),d-s<t)return;const S=i&&d-i;return S?Math.round(y*1e3/S):void 0}}function yr(e,t){let n=0,a=1e3/t,r,o;const s=(d,i=Date.now())=>{n=i,r=null,o&&(clearTimeout(o),o=null),e(...d)};return[(...d)=>{const i=Date.now(),m=i-n;m>=a?s(d,i):(r=d,o||(o=setTimeout(()=>{o=null,s(r)},a-m)))},()=>r&&s(r)]}const Ae=(e,t,n=3)=>{let a=0;const r=kr(50,250);return yr(o=>{const s=o.loaded,l=o.lengthComputable?o.total:void 0,u=s-a,d=r(u),i=s<=l;a=s;const m={loaded:s,total:l,progress:l?s/l:void 0,bytes:u,rate:d||void 0,estimated:d&&l&&i?(l-s)/d:void 0,event:o,lengthComputable:l!=null,[t?"download":"upload"]:!0};e(m)},n)},Nt=(e,t)=>{const n=e!=null;return[a=>t[0]({lengthComputable:n,total:e,loaded:a}),t[1]]},Ht=e=>(...t)=>c.asap(()=>e(...t)),Er=O.hasStandardBrowserEnv?((e,t)=>n=>(n=new URL(n,O.origin),e.protocol===n.protocol&&e.host===n.host&&(t||e.port===n.port)))(new URL(O.origin),O.navigator&&/(msie|trident)/i.test(O.navigator.userAgent)):()=>!0,wr=O.hasStandardBrowserEnv?{write(e,t,n,a,r,o,s){if(typeof document>"u")return;const l=[`${e}=${encodeURIComponent(t)}`];c.isNumber(n)&&l.push(`expires=${new Date(n).toUTCString()}`),c.isString(a)&&l.push(`path=${a}`),c.isString(r)&&l.push(`domain=${r}`),o===!0&&l.push("secure"),c.isString(s)&&l.push(`SameSite=${s}`),document.cookie=l.join("; ")},read(e){if(typeof document>"u")return null;const t=document.cookie.match(new RegExp("(?:^|; )"+e+"=([^;]*)"));return t?decodeURIComponent(t[1]):null},remove(e){this.write(e,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function vr(e){return typeof e!="string"?!1:/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function Br(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function Un(e,t,n){let a=!vr(t);return e&&(a||n==!1)?Br(e,t):t}const Ft=e=>e instanceof j?{...e}:e;function Y(e,t){t=t||{};const n={};function a(d,i,m,y){return c.isPlainObject(d)&&c.isPlainObject(i)?c.merge.call({caseless:y},d,i):c.isPlainObject(i)?c.merge({},i):c.isArray(i)?i.slice():i}function r(d,i,m,y){if(c.isUndefined(i)){if(!c.isUndefined(d))return a(void 0,d,m,y)}else return a(d,i,m,y)}function o(d,i){if(!c.isUndefined(i))return a(void 0,i)}function s(d,i){if(c.isUndefined(i)){if(!c.isUndefined(d))return a(void 0,d)}else return a(void 0,i)}function l(d,i,m){if(m in t)return a(d,i);if(m in e)return a(void 0,d)}const u={url:o,method:o,data:o,baseURL:s,transformRequest:s,transformResponse:s,paramsSerializer:s,timeout:s,timeoutMessage:s,withCredentials:s,withXSRFToken:s,adapter:s,responseType:s,xsrfCookieName:s,xsrfHeaderName:s,onUploadProgress:s,onDownloadProgress:s,decompress:s,maxContentLength:s,maxBodyLength:s,beforeRedirect:s,transport:s,httpAgent:s,httpsAgent:s,cancelToken:s,socketPath:s,responseEncoding:s,validateStatus:l,headers:(d,i,m)=>r(Ft(d),Ft(i),m,!0)};return c.forEach(Object.keys({...e,...t}),function(i){if(i==="__proto__"||i==="constructor"||i==="prototype")return;const m=c.hasOwnProp(u,i)?u[i]:r,y=m(e[i],t[i],i);c.isUndefined(y)&&m!==l||(n[i]=y)}),n}const Nn=e=>{const t=Y({},e);let{data:n,withXSRFToken:a,xsrfHeaderName:r,xsrfCookieName:o,headers:s,auth:l}=t;if(t.headers=s=j.from(s),t.url=Pn(Un(t.baseURL,t.url,t.allowAbsoluteUrls),e.params,e.paramsSerializer),l&&s.set("Authorization","Basic "+btoa((l.username||"")+":"+(l.password?unescape(encodeURIComponent(l.password)):""))),c.isFormData(n)){if(O.hasStandardBrowserEnv||O.hasStandardBrowserWebWorkerEnv)s.setContentType(void 0);else if(c.isFunction(n.getHeaders)){const u=n.getHeaders(),d=["content-type","content-length"];Object.entries(u).forEach(([i,m])=>{d.includes(i.toLowerCase())&&s.set(i,m)})}}if(O.hasStandardBrowserEnv&&(a&&c.isFunction(a)&&(a=a(t)),a||a!==!1&&Er(t.url))){const u=r&&o&&wr.read(o);u&&s.set(r,u)}return t},Ir=typeof XMLHttpRequest<"u",Cr=Ir&&function(e){return new Promise(function(n,a){const r=Nn(e);let o=r.data;const s=j.from(r.headers).normalize();let{responseType:l,onUploadProgress:u,onDownloadProgress:d}=r,i,m,y,S,f;function b(){S&&S(),f&&f(),r.cancelToken&&r.cancelToken.unsubscribe(i),r.signal&&r.signal.removeEventListener("abort",i)}let p=new XMLHttpRequest;p.open(r.method.toUpperCase(),r.url,!0),p.timeout=r.timeout;function R(){if(!p)return;const _=j.from("getAllResponseHeaders"in p&&p.getAllResponseHeaders()),q={data:!l||l==="text"||l==="json"?p.responseText:p.response,status:p.status,statusText:p.statusText,headers:_,config:e,request:p};jn(function(H){n(H),b()},function(H){a(H),b()},q),p=null}"onloadend"in p?p.onloadend=R:p.onreadystatechange=function(){!p||p.readyState!==4||p.status===0&&!(p.responseURL&&p.responseURL.indexOf("file:")===0)||setTimeout(R)},p.onabort=function(){p&&(a(new E("Request aborted",E.ECONNABORTED,e,p)),p=null)},p.onerror=function(P){const q=P&&P.message?P.message:"Network Error",W=new E(q,E.ERR_NETWORK,e,p);W.event=P||null,a(W),p=null},p.ontimeout=function(){let P=r.timeout?"timeout of "+r.timeout+"ms exceeded":"timeout exceeded";const q=r.transitional||gt;r.timeoutErrorMessage&&(P=r.timeoutErrorMessage),a(new E(P,q.clarifyTimeoutError?E.ETIMEDOUT:E.ECONNABORTED,e,p)),p=null},o===void 0&&s.setContentType(null),"setRequestHeader"in p&&c.forEach(s.toJSON(),function(P,q){p.setRequestHeader(q,P)}),c.isUndefined(r.withCredentials)||(p.withCredentials=!!r.withCredentials),l&&l!=="json"&&(p.responseType=r.responseType),d&&([y,f]=Ae(d,!0),p.addEventListener("progress",y)),u&&p.upload&&([m,S]=Ae(u),p.upload.addEventListener("progress",m),p.upload.addEventListener("loadend",S)),(r.cancelToken||r.signal)&&(i=_=>{p&&(a(!_||_.type?new ve(null,e,p):_),p.abort(),p=null)},r.cancelToken&&r.cancelToken.subscribe(i),r.signal&&(r.signal.aborted?i():r.signal.addEventListener("abort",i)));const N=hr(r.url);if(N&&O.protocols.indexOf(N)===-1){a(new E("Unsupported protocol "+N+":",E.ERR_BAD_REQUEST,e));return}p.send(o||null)})},$r=(e,t)=>{const{length:n}=e=e?e.filter(Boolean):[];if(t||n){let a=new AbortController,r;const o=function(d){if(!r){r=!0,l();const i=d instanceof Error?d:this.reason;a.abort(i instanceof E?i:new ve(i instanceof Error?i.message:i))}};let s=t&&setTimeout(()=>{s=null,o(new E(`timeout of ${t}ms exceeded`,E.ETIMEDOUT))},t);const l=()=>{e&&(s&&clearTimeout(s),s=null,e.forEach(d=>{d.unsubscribe?d.unsubscribe(o):d.removeEventListener("abort",o)}),e=null)};e.forEach(d=>d.addEventListener("abort",o));const{signal:u}=a;return u.unsubscribe=()=>c.asap(l),u}},Sr=function*(e,t){let n=e.byteLength;if(n<t){yield e;return}let a=0,r;for(;a<n;)r=a+t,yield e.slice(a,r),a=r},Tr=async function*(e,t){for await(const n of Rr(e))yield*Sr(n,t)},Rr=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:n,value:a}=await t.read();if(n)break;yield a}}finally{await t.cancel()}},qt=(e,t,n,a)=>{const r=Tr(e,t);let o=0,s,l=u=>{s||(s=!0,a&&a(u))};return new ReadableStream({async pull(u){try{const{done:d,value:i}=await r.next();if(d){l(),u.close();return}let m=i.byteLength;if(n){let y=o+=m;n(y)}u.enqueue(new Uint8Array(i))}catch(d){throw l(d),d}},cancel(u){return l(u),r.return()}},{highWaterMark:2})},Vt=64*1024,{isFunction:Te}=c,xr=(({Request:e,Response:t})=>({Request:e,Response:t}))(c.global),{ReadableStream:Gt,TextEncoder:Jt}=c.global,zt=(e,...t)=>{try{return!!e(...t)}catch{return!1}},_r=e=>{e=c.merge.call({skipUndefined:!0},xr,e);const{fetch:t,Request:n,Response:a}=e,r=t?Te(t):typeof fetch=="function",o=Te(n),s=Te(a);if(!r)return!1;const l=r&&Te(Gt),u=r&&(typeof Jt=="function"?(f=>b=>f.encode(b))(new Jt):async f=>new Uint8Array(await new n(f).arrayBuffer())),d=o&&l&&zt(()=>{let f=!1;const b=new n(O.origin,{body:new Gt,method:"POST",get duplex(){return f=!0,"half"}}).headers.has("Content-Type");return f&&!b}),i=s&&l&&zt(()=>c.isReadableStream(new a("").body)),m={stream:i&&(f=>f.body)};r&&["text","arrayBuffer","blob","formData","stream"].forEach(f=>{!m[f]&&(m[f]=(b,p)=>{let R=b&&b[f];if(R)return R.call(b);throw new E(`Response type '${f}' is not supported`,E.ERR_NOT_SUPPORT,p)})});const y=async f=>{if(f==null)return 0;if(c.isBlob(f))return f.size;if(c.isSpecCompliantForm(f))return(await new n(O.origin,{method:"POST",body:f}).arrayBuffer()).byteLength;if(c.isArrayBufferView(f)||c.isArrayBuffer(f))return f.byteLength;if(c.isURLSearchParams(f)&&(f=f+""),c.isString(f))return(await u(f)).byteLength},S=async(f,b)=>{const p=c.toFiniteNumber(f.getContentLength());return p??y(b)};return async f=>{let{url:b,method:p,data:R,signal:N,cancelToken:_,timeout:P,onDownloadProgress:q,onUploadProgress:W,responseType:H,headers:Qe,withCredentials:Ce="same-origin",fetchOptions:Tt}=Nn(f),Rt=t||fetch;H=H?(H+"").toLowerCase():"text";let $e=$r([N,_&&_.toAbortSignal()],P),ce=null;const K=$e&&$e.unsubscribe&&(()=>{$e.unsubscribe()});let xt;try{if(W&&d&&p!=="get"&&p!=="head"&&(xt=await S(Qe,R))!==0){let z=new n(b,{method:"POST",body:R,duplex:"half"}),ee;if(c.isFormData(R)&&(ee=z.headers.get("content-type"))&&Qe.setContentType(ee),z.body){const[Ye,Se]=Nt(xt,Ae(Ht(W)));R=qt(z.body,Vt,Ye,Se)}}c.isString(Ce)||(Ce=Ce?"include":"omit");const M=o&&"credentials"in n.prototype,_t={...Tt,signal:$e,method:p.toUpperCase(),headers:Qe.normalize().toJSON(),body:R,duplex:"half",credentials:M?Ce:void 0};ce=o&&new n(b,_t);let J=await(o?Rt(ce,Tt):Rt(b,_t));const Lt=i&&(H==="stream"||H==="response");if(i&&(q||Lt&&K)){const z={};["status","statusText","headers"].forEach(At=>{z[At]=J[At]});const ee=c.toFiniteNumber(J.headers.get("content-length")),[Ye,Se]=q&&Nt(ee,Ae(Ht(q),!0))||[];J=new a(qt(J.body,Vt,Ye,()=>{Se&&Se(),K&&K()}),z)}H=H||"text";let sa=await m[c.findKey(m,H)||"text"](J,f);return!Lt&&K&&K(),await new Promise((z,ee)=>{jn(z,ee,{data:sa,headers:j.from(J.headers),status:J.status,statusText:J.statusText,config:f,request:ce})})}catch(M){throw K&&K(),M&&M.name==="TypeError"&&/Load failed|fetch/i.test(M.message)?Object.assign(new E("Network Error",E.ERR_NETWORK,f,ce,M&&M.response),{cause:M.cause||M}):E.from(M,M&&M.code,f,ce,M&&M.response)}}},Lr=new Map,Hn=e=>{let t=e&&e.env||{};const{fetch:n,Request:a,Response:r}=t,o=[a,r,n];let s=o.length,l=s,u,d,i=Lr;for(;l--;)u=o[l],d=i.get(u),d===void 0&&i.set(u,d=l?new Map:_r(t)),i=d;return d};Hn();const ht={http:Ka,xhr:Cr,fetch:{get:Hn}};c.forEach(ht,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const Wt=e=>`- ${e}`,Ar=e=>c.isFunction(e)||e===null||e===!1;function Or(e,t){e=c.isArray(e)?e:[e];const{length:n}=e;let a,r;const o={};for(let s=0;s<n;s++){a=e[s];let l;if(r=a,!Ar(a)&&(r=ht[(l=String(a)).toLowerCase()],r===void 0))throw new E(`Unknown adapter '${l}'`);if(r&&(c.isFunction(r)||(r=r.get(t))))break;o[l||"#"+s]=r}if(!r){const s=Object.entries(o).map(([u,d])=>`adapter ${u} `+(d===!1?"is not supported by the environment":"is not available in the build"));let l=n?s.length>1?`since :
`+s.map(Wt).join(`
`):" "+Wt(s[0]):"as no adapter specified";throw new E("There is no suitable adapter to dispatch the request "+l,"ERR_NOT_SUPPORT")}return r}const Fn={getAdapter:Or,adapters:ht};function at(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new ve(null,e)}function Kt(e){return at(e),e.headers=j.from(e.headers),e.data=nt.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),Fn.getAdapter(e.adapter||we.adapter,e)(e).then(function(a){return at(e),a.data=nt.call(e,e.transformResponse,a),a.headers=j.from(a.headers),a},function(a){return Dn(a)||(at(e),a&&a.response&&(a.response.data=nt.call(e,e.transformResponse,a.response),a.response.headers=j.from(a.response.headers))),Promise.reject(a)})}const qn="1.13.6",Xe={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{Xe[e]=function(a){return typeof a===e||"a"+(t<1?"n ":" ")+e}});const Xt={};Xe.transitional=function(t,n,a){function r(o,s){return"[Axios v"+qn+"] Transitional option '"+o+"'"+s+(a?". "+a:"")}return(o,s,l)=>{if(t===!1)throw new E(r(s," has been removed"+(n?" in "+n:"")),E.ERR_DEPRECATED);return n&&!Xt[s]&&(Xt[s]=!0,console.warn(r(s," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(o,s,l):!0}};Xe.spelling=function(t){return(n,a)=>(console.warn(`${a} is likely a misspelling of ${t}`),!0)};function Pr(e,t,n){if(typeof e!="object")throw new E("options must be an object",E.ERR_BAD_OPTION_VALUE);const a=Object.keys(e);let r=a.length;for(;r-- >0;){const o=a[r],s=t[o];if(s){const l=e[o],u=l===void 0||s(l,o,e);if(u!==!0)throw new E("option "+o+" must be "+u,E.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new E("Unknown option "+o,E.ERR_BAD_OPTION)}}const _e={assertOptions:Pr,validators:Xe},F=_e.validators;let Q=class{constructor(t){this.defaults=t||{},this.interceptors={request:new jt,response:new jt}}async request(t,n){try{return await this._request(t,n)}catch(a){if(a instanceof Error){let r={};Error.captureStackTrace?Error.captureStackTrace(r):r=new Error;const o=r.stack?r.stack.replace(/^.+\n/,""):"";try{a.stack?o&&!String(a.stack).endsWith(o.replace(/^.+\n.+\n/,""))&&(a.stack+=`
`+o):a.stack=o}catch{}}throw a}}_request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=Y(this.defaults,n);const{transitional:a,paramsSerializer:r,headers:o}=n;a!==void 0&&_e.assertOptions(a,{silentJSONParsing:F.transitional(F.boolean),forcedJSONParsing:F.transitional(F.boolean),clarifyTimeoutError:F.transitional(F.boolean),legacyInterceptorReqResOrdering:F.transitional(F.boolean)},!1),r!=null&&(c.isFunction(r)?n.paramsSerializer={serialize:r}:_e.assertOptions(r,{encode:F.function,serialize:F.function},!0)),n.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?n.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:n.allowAbsoluteUrls=!0),_e.assertOptions(n,{baseUrl:F.spelling("baseURL"),withXsrfToken:F.spelling("withXSRFToken")},!0),n.method=(n.method||this.defaults.method||"get").toLowerCase();let s=o&&c.merge(o.common,o[n.method]);o&&c.forEach(["delete","get","head","post","put","patch","common"],f=>{delete o[f]}),n.headers=j.concat(s,o);const l=[];let u=!0;this.interceptors.request.forEach(function(b){if(typeof b.runWhen=="function"&&b.runWhen(n)===!1)return;u=u&&b.synchronous;const p=n.transitional||gt;p&&p.legacyInterceptorReqResOrdering?l.unshift(b.fulfilled,b.rejected):l.push(b.fulfilled,b.rejected)});const d=[];this.interceptors.response.forEach(function(b){d.push(b.fulfilled,b.rejected)});let i,m=0,y;if(!u){const f=[Kt.bind(this),void 0];for(f.unshift(...l),f.push(...d),y=f.length,i=Promise.resolve(n);m<y;)i=i.then(f[m++],f[m++]);return i}y=l.length;let S=n;for(;m<y;){const f=l[m++],b=l[m++];try{S=f(S)}catch(p){b.call(this,p);break}}try{i=Kt.call(this,S)}catch(f){return Promise.reject(f)}for(m=0,y=d.length;m<y;)i=i.then(d[m++],d[m++]);return i}getUri(t){t=Y(this.defaults,t);const n=Un(t.baseURL,t.url,t.allowAbsoluteUrls);return Pn(n,t.params,t.paramsSerializer)}};c.forEach(["delete","get","head","options"],function(t){Q.prototype[t]=function(n,a){return this.request(Y(a||{},{method:t,url:n,data:(a||{}).data}))}});c.forEach(["post","put","patch"],function(t){function n(a){return function(o,s,l){return this.request(Y(l||{},{method:t,headers:a?{"Content-Type":"multipart/form-data"}:{},url:o,data:s}))}}Q.prototype[t]=n(),Q.prototype[t+"Form"]=n(!0)});let Mr=class Vn{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(o){n=o});const a=this;this.promise.then(r=>{if(!a._listeners)return;let o=a._listeners.length;for(;o-- >0;)a._listeners[o](r);a._listeners=null}),this.promise.then=r=>{let o;const s=new Promise(l=>{a.subscribe(l),o=l}).then(r);return s.cancel=function(){a.unsubscribe(o)},s},t(function(o,s,l){a.reason||(a.reason=new ve(o,s,l),n(a.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}toAbortSignal(){const t=new AbortController,n=a=>{t.abort(a)};return this.subscribe(n),t.signal.unsubscribe=()=>this.unsubscribe(n),t.signal}static source(){let t;return{token:new Vn(function(r){t=r}),cancel:t}}};function Dr(e){return function(n){return e.apply(null,n)}}function jr(e){return c.isObject(e)&&e.isAxiosError===!0}const lt={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(lt).forEach(([e,t])=>{lt[t]=e});function Gn(e){const t=new Q(e),n=In(Q.prototype.request,t);return c.extend(n,Q.prototype,t,{allOwnKeys:!0}),c.extend(n,t,null,{allOwnKeys:!0}),n.create=function(r){return Gn(Y(e,r))},n}const T=Gn(we);T.Axios=Q;T.CanceledError=ve;T.CancelToken=Mr;T.isCancel=Dn;T.VERSION=qn;T.toFormData=Ke;T.AxiosError=E;T.Cancel=T.CanceledError;T.all=function(t){return Promise.all(t)};T.spread=Dr;T.isAxiosError=jr;T.mergeConfig=Y;T.AxiosHeaders=j;T.formToJSON=e=>Mn(c.isHTMLForm(e)?new FormData(e):e);T.getAdapter=Fn.getAdapter;T.HttpStatusCode=lt;T.default=T;const{Axios:ps,AxiosError:gs,CanceledError:bs,isCancel:hs,CancelToken:ks,VERSION:ys,all:Es,Cancel:ws,isAxiosError:vs,spread:Bs,toFormData:Is,AxiosHeaders:Cs,HttpStatusCode:$s,formToJSON:Ss,getAdapter:Ts,mergeConfig:Rs}=T;window.axios=T;window.axios.defaults.headers.common["X-Requested-With"]="XMLHttpRequest";const kt="transit_user",Oe="transit_token",ct="transit_pending_toast";function le(){try{return typeof window<"u"&&typeof window.localStorage<"u"}catch{return!1}}function Jn(){try{return typeof window<"u"&&typeof window.sessionStorage<"u"}catch{return!1}}function Ur(){if(window.transitAuthUser)return window.transitAuthUser;if(!le())return null;const e=window.localStorage.getItem(kt);if(!e)return null;try{return JSON.parse(e)}catch{return pe(),null}}function zn(e){if(!le()){window.transitAuthUser=e;return}window.transitAuthUser=e,window.localStorage.setItem(kt,JSON.stringify(e))}function Nr(){if(!le()){window.transitAuthUser=null;return}window.transitAuthUser=null,window.localStorage.removeItem(kt)}function yt(){return typeof window<"u"&&typeof window.transitAuthToken=="string"&&window.transitAuthToken!==""?window.transitAuthToken:le()?window.localStorage.getItem(Oe):null}function Hr(e){const t=typeof e=="string"?e:"";if(!le()){window.transitAuthToken=t||null;return}if(window.transitAuthToken=t||null,t===""){window.localStorage.removeItem(Oe);return}window.localStorage.setItem(Oe,t)}function Fr(){if(!le()){window.transitAuthToken=null;return}window.transitAuthToken=null,window.localStorage.removeItem(Oe)}function qr(e){Jn()&&window.sessionStorage.setItem(ct,JSON.stringify(e))}function Vr(){if(!Jn())return null;const e=window.sessionStorage.getItem(ct);if(!e)return null;window.sessionStorage.removeItem(ct);try{return JSON.parse(e)}catch{return null}}function pe(){Nr(),Fr()}function Wn(e,t){if(!e)return t;if(typeof e.detail=="string"&&e.detail!=="")return e.detail;if(typeof e.message=="string"&&e.message!=="")return e.message;if(e.errors&&typeof e.errors=="object"){const n=Object.values(e.errors).flat()[0];if(typeof n=="string"&&n!=="")return n}return t}function Zt(){return document.body.dataset.apiBase||"/api"}function Kn(e=""){const t=String(e).replace(/^\/+/,"");return t===""?Zt():`${Zt()}/${t}`}async function C(e,t={}){const{method:n="GET",body:a=null,headers:r={},auth:o=!0}=t,s=new Headers(r);s.set("Accept","application/json"),s.set("X-Requested-With","XMLHttpRequest");let l=a;if(a&&!(a instanceof FormData)&&!(a instanceof Blob)&&(s.set("Content-Type","application/json"),l=JSON.stringify(a)),o){const m=yt();m&&s.set("Authorization",`Bearer ${m}`)}if(!["GET","HEAD","OPTIONS"].includes(n.toUpperCase())){const m=document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");m&&s.set("X-CSRF-TOKEN",m)}const u=await fetch(Kn(e),{method:n,headers:s,body:l,credentials:"same-origin"});let d=null;const i=u.headers.get("content-type")||"";if(u.status!==204&&(d=i.includes("application/json")?await u.json():await u.text()),!u.ok){u.status===401&&(pe(),(document.body.dataset.routeGuard||"none")==="protected"&&window.location.replace(document.body.dataset.loginUrl||"/login"));const m=Wn(d,`Request gagal (${u.status})`),y=new Error(m);throw y.status=u.status,y.data=d,y}return d}async function Et(e,t="export.csv"){const n=new Headers({Accept:"text/csv,application/octet-stream","X-Requested-With":"XMLHttpRequest"}),a=yt();a&&n.set("Authorization",`Bearer ${a}`);const r=await fetch(Kn(e),{method:"GET",headers:n,credentials:"same-origin"});if(!r.ok){let m=null;throw(r.headers.get("content-type")||"").includes("application/json")&&(m=await r.json()),new Error(Wn(m,"Gagal mengunduh file"))}const o=await r.blob(),u=(r.headers.get("content-disposition")||"").match(/filename="?([^"]+)"?/i)?.[1]||t,d=window.URL.createObjectURL(o),i=document.createElement("a");i.href=d,i.download=u,document.body.appendChild(i),i.click(),i.remove(),window.URL.revokeObjectURL(d)}function me(e,t){const n=document.getElementById(e);n&&(n.textContent=t)}function Gr(e){const t=e?.role||"";document.querySelectorAll("[data-role-scope]").forEach(n=>{const a=n.dataset.roleScope,r=a==="admin"?["Super Admin","Admin"].includes(t):a==="super"?t==="Super Admin":!0;n.hidden=!r})}function Xn(){return Ur()}function Pe(e){if(Gr(e),!e)return;const t=e.nama||"Admin",n=t.trim().split(/\s+/)[0]||"Admin",a=e.email||"admin@pekanbaru.com";me("sidebar-user-name",t),me("sidebar-user-email",a),me("header-user-name",n),me("dropdown-user-name",t),me("dropdown-user-email",a)}function Zn(e){return typeof e.access_token=="string"&&e.access_token!==""&&Hr(e.access_token),zn(e.user),Pe(e.user),e}async function Jr(e){const t=await C("/auth/login",{method:"POST",body:e,auth:!1});return Zn(t)}async function zr(e){const t=await C("/auth/register",{method:"POST",body:e,auth:!1});return Zn(t)}async function Qt(){const e=await C("/auth/me");return zn(e),Pe(e),e}async function Wr(){try{await C("/auth/logout",{method:"POST"})}catch(e){if(e?.status!==401)throw e}pe(),qr({type:"success",title:"Logout berhasil",message:"Sampai jumpa kembali!"}),window.location.replace(document.body.dataset.loginUrl||"/login")}function Yt(e){window.location.replace(e)}async function Kr(){const e=document.body.dataset.routeGuard||"none",t=document.body.dataset.loginUrl||"/login",n=document.body.dataset.dashboardUrl||"/dashboard",a=Xn();if(e==="public"){try{const r=await Qt();return Yt(n),{user:r}}catch{(a||yt())&&pe()}return{user:null}}if(e==="protected")try{return{user:await Qt()}}catch{return pe(),Yt(t),{user:null}}return{user:a}}function wt(){return Array.from(document.querySelectorAll(".modal-shell")).filter(e=>!e.hidden)}function Qn(){document.body.style.overflow=wt().length>0?"hidden":""}function A(e){const t=document.getElementById(e);t&&(t.hidden=!1,Qn())}function U(e=null){if(e){const t=document.getElementById(e);t&&(t.hidden=!0)}else wt().forEach(t=>{t.hidden=!0});Qn()}function Xr(){document.addEventListener("click",e=>{const t=e.target.closest("[data-modal-open]");if(t){A(t.dataset.modalOpen);return}const n=e.target.closest("[data-modal-close]");if(n){const a=n.dataset.modalClose||n.closest(".modal-shell")?.id;U(a||void 0)}}),document.addEventListener("keydown",e=>{if(e.key!=="Escape")return;const t=wt().pop();t&&U(t.id)})}function vt(e,t,n){const a=document.getElementById("transit-toast-root");if(!a)return;const r=document.createElement("div");r.className=`transit-toast ${n==="error"?"is-error":""} ${n==="info"?"is-info":""}`.trim(),r.innerHTML=`
        <div>
            <strong>${e}</strong>
            <p>${t}</p>
        </div>
    `,a.appendChild(r),window.requestAnimationFrame(()=>{r.classList.add("is-visible")}),window.setTimeout(()=>{r.classList.remove("is-visible"),window.setTimeout(()=>r.remove(),180)},3600)}function L(e,t="Berhasil"){vt(t,e,"success")}function B(e,t="Gagal"){vt(t,e,"error")}function Zr(e,t="Info"){vt(t,e,"info")}function fe(e){const t=document.querySelector("[data-sidebar]"),n=document.querySelector("[data-sidebar-overlay]");!t||!n||(t.classList.toggle("is-open",e),n.hidden=!e)}function Le(e=null){document.querySelectorAll("[data-user-dropdown]").forEach(t=>{if(e&&t===e)return;t.classList.remove("is-open");const n=t.querySelector("[data-user-menu-trigger]"),a=t.querySelector("[data-user-menu-panel]");n&&n.setAttribute("aria-expanded","false"),a&&(a.hidden=!0)})}function Qr(e,t=null){if(!e)return;const n=e.querySelector("[data-user-menu-trigger]"),a=e.querySelector("[data-user-menu-panel]"),r=t??!e.classList.contains("is-open");Le(r?e:null),e.classList.toggle("is-open",r),n&&n.setAttribute("aria-expanded",r?"true":"false"),a&&(a.hidden=!r)}function Yr(){document.querySelector("[data-sidebar-open]")?.addEventListener("click",()=>{fe(!0)}),document.querySelector("[data-sidebar-close]")?.addEventListener("click",()=>{fe(!1)}),document.querySelector("[data-sidebar-overlay]")?.addEventListener("click",()=>{fe(!1)}),document.querySelectorAll("[data-user-dropdown]").forEach(e=>{e.querySelector("[data-user-menu-trigger]")?.addEventListener("click",t=>{t.stopPropagation(),Qr(e)})}),document.addEventListener("click",e=>{e.target.closest("[data-user-dropdown]")||Le()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&(Le(),fe(!1))}),window.addEventListener("resize",()=>{window.innerWidth>1100&&fe(!1)}),document.querySelectorAll("[data-auth-logout]").forEach(e=>{e.addEventListener("click",async()=>{U(),Le();try{e.disabled=!0,await Wr()}catch(t){e.disabled=!1,B(t.message||"Gagal logout")}})})}const Yn={login:{title:"Selamat Datang!",description:"Masuk ke akun Anda untuk melanjutkan",submit:"Masuk",switchText:"Belum punya akun?",switchAction:"Daftar sekarang"},register:{title:"Buat Akun Baru",description:"Daftar untuk mulai menggunakan sistem",submit:"Daftar",switchText:"Sudah punya akun?",switchAction:"Masuk"}};function en(e,t){const n=Yn[e];t.form.dataset.authMode=e,t.title.textContent=n.title,t.description.textContent=n.description,t.submitText.textContent=n.submit,t.switchText&&(t.switchText.textContent=n.switchText),t.switchButton&&(t.switchButton.textContent=n.switchAction),t.nameField.hidden=e!=="register",t.nameInput.required=e==="register"}function eo(){const e=document.getElementById("auth-form");if(!e)return;const t={form:e,title:document.querySelector("[data-auth-title]"),description:document.querySelector("[data-auth-description]"),submitText:document.querySelector("[data-auth-submit-text]"),switchText:document.querySelector("[data-auth-switch-text]"),switchButton:document.querySelector("[data-toggle-auth-mode]"),nameField:document.getElementById("auth-name-field"),nameInput:document.getElementById("nama"),emailInput:document.getElementById("email"),passwordInput:document.getElementById("password"),passwordToggle:document.querySelector("[data-toggle-password]"),submitButton:document.getElementById("auth-submit-button")},n=document.body.dataset.dashboardUrl||"/dashboard";en("login",t),t.switchButton?.addEventListener("click",()=>{const a=t.form.dataset.authMode==="login"?"register":"login";en(a,t)}),t.passwordToggle?.addEventListener("click",()=>{const a=t.passwordInput.type==="password"?"text":"password";t.passwordInput.type=a,t.passwordToggle.textContent=a==="password"?"Lihat":"Sembunyikan"}),e.addEventListener("submit",async a=>{a.preventDefault();const r=new FormData(e),o=e.dataset.authMode||"login",s={email:String(r.get("email")||"").trim(),password:String(r.get("password")||"").trim()};o==="register"&&(s.nama=String(r.get("nama")||"").trim()),t.submitButton.disabled=!0,t.submitText.textContent=o==="login"?"Memproses...":"Mendaftarkan...";try{o==="login"?(await Jr(s),L("Selamat datang kembali","Login berhasil!")):(await zr(s),L("Akun Anda telah dibuat","Registrasi berhasil!")),window.location.replace(n)}catch(l){B(l.message||"Terjadi kesalahan",o==="login"?"Login gagal":"Registrasi gagal")}finally{t.submitButton.disabled=!1,t.submitText.textContent=Yn[o].submit}})}const to=new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}),no=new Intl.NumberFormat("id-ID");function x(e){return to.format(Number(e)||0)}function $(e){return no.format(Number(e)||0)}function g(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Be(e,t=300){let n=null;return(...a)=>{window.clearTimeout(n),n=window.setTimeout(()=>e(...a),t)}}function Ie(e,t,n,a){if(n===0||a===0)return"Menampilkan 0 - 0 dari 0 data";const r=(e-1)*t+1,o=r+a-1;return`Menampilkan ${r} - ${o} dari ${n} data`}function ao(e){if(!e)return"-";const t=new Date(e);return Number.isNaN(t.getTime())?e:new Intl.DateTimeFormat("id-ID",{day:"2-digit",month:"short",year:"numeric"}).format(t)}function ea(){return new Date().toISOString().slice(0,10)}function ro(e,t,n="Memproses..."){e&&(e.dataset.defaultText||(e.dataset.defaultText=e.textContent.trim()),e.disabled=t,e.textContent=t?n:e.dataset.defaultText)}const Me=["#059669","#10B981","#34D399","#6EE7B7","#A7F3D0"],G={revenueChart:null,passengerChart:null,mobilChart:null};function oo(){const e=document.getElementById("dashboard-initial-state");if(!e)return{stats:{},revenueData:[],mobilRevenue:[]};try{return JSON.parse(e.textContent||"{}")}catch{return{stats:{},revenueData:[],mobilRevenue:[]}}}function Bt(e){e&&typeof e.destroy=="function"&&e.destroy()}function so(e,t){const n=document.querySelector(`[data-stat="${e}"]`);if(!n)return;const a=["total_uang_bersih","total_uang_pc"];n.textContent=a.includes(e)?x(t):$(t)}function ta(e,t,n){const a=document.getElementById(e),r=document.getElementById(t);a&&(a.hidden=!n),r&&(r.hidden=n)}function io(){return"#065f46"}function ut(){return"#d1fae5"}function It(){return{backgroundColor:"#ffffff",titleColor:"#064e3b",bodyColor:"#065f46",borderColor:"#d1fae5",borderWidth:1,padding:12,cornerRadius:12,displayColors:!0}}function lo(e){const t=document.getElementById("dashboard-revenue-chart"),n=Array.isArray(e)&&e.length>0;if(ta("dashboard-revenue-chart","dashboard-revenue-empty",n),Bt(G.revenueChart),!t||!window.Chart||!n){G.revenueChart=null;return}G.revenueChart=new window.Chart(t,{type:"line",data:{labels:e.map(a=>a.bulan),datasets:[{label:"Pendapatan Bersih",data:e.map(a=>a.uang_bersih),borderColor:"#059669",backgroundColor:"rgba(5, 150, 105, 0.08)",fill:!1,tension:.35,pointRadius:4,pointHoverRadius:5,pointBackgroundColor:"#059669",pointBorderColor:"#ffffff",pointBorderWidth:2,borderWidth:3},{label:"Uang PC",data:e.map(a=>a.uang_pc),borderColor:"#f59e0b",backgroundColor:"rgba(245, 158, 11, 0.1)",fill:!1,tension:.35,pointRadius:4,pointHoverRadius:5,pointBackgroundColor:"#f59e0b",pointBorderColor:"#ffffff",pointBorderWidth:2,borderWidth:3}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{labels:{color:io(),usePointStyle:!0,pointStyle:"circle",boxWidth:8,boxHeight:8,padding:18}},tooltip:{...It(),callbacks:{label(a){return`${a.dataset.label}: ${x(a.parsed.y)}`}}}},scales:{x:{ticks:{color:"#047857",font:{size:12}},grid:{color:ut()},border:{display:!1}},y:{ticks:{color:"#047857",font:{size:12},callback(a){return`${Math.round(Number(a)/1e6)}jt`}},grid:{color:ut()},border:{display:!1}}}}})}function co(e){const t=document.getElementById("dashboard-passenger-chart"),n=Array.isArray(e)&&e.length>0;if(ta("dashboard-passenger-chart","dashboard-passenger-empty",n),Bt(G.passengerChart),!t||!window.Chart||!n){G.passengerChart=null;return}G.passengerChart=new window.Chart(t,{type:"bar",data:{labels:e.map(a=>a.bulan),datasets:[{label:"Penumpang",data:e.map(a=>a.penumpang),backgroundColor:"#10B981",borderRadius:8,maxBarThickness:44}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{...It(),callbacks:{label(a){return`Penumpang: ${$(a.parsed.y)}`}}}},scales:{x:{ticks:{color:"#047857",font:{size:12}},grid:{color:"rgba(0, 0, 0, 0)"},border:{display:!1}},y:{ticks:{color:"#047857",font:{size:12}},grid:{color:ut()},border:{display:!1}}}}})}function uo(e){const t=document.getElementById("dashboard-mobil-list");t&&(t.innerHTML=e.map((n,a)=>`
        <div class="dashboard-mobil-item">
            <div class="dashboard-mobil-meta">
                <span class="dashboard-mobil-dot" style="background-color: ${Me[a%Me.length]}"></span>
                <div>
                    <p class="dashboard-mobil-code">${g(n.kode_mobil)}</p>
                    <p class="dashboard-mobil-trips">${$(n.total_trips)} trip</p>
                    <p class="dashboard-mobil-passengers">${$(n.total_penumpang)} penumpang</p>
                </div>
            </div>
            <p class="dashboard-mobil-value">${x(n.total_uang_bersih)}</p>
        </div>
    `).join(""))}function mo(e){const t=document.getElementById("dashboard-mobil-chart"),n=document.getElementById("dashboard-mobil-content"),a=document.getElementById("dashboard-mobil-empty"),r=document.getElementById("dashboard-mobil-chart-empty"),o=document.getElementById("dashboard-mobil-list"),s=Array.isArray(e)&&e.length>0,l=s&&e.some(u=>Number(u.total_uang_bersih)>0);if(Bt(G.mobilChart),n&&(n.hidden=!s),a&&(a.hidden=s),t&&(t.hidden=!l),r&&(r.hidden=l),s?uo(e):o&&(o.innerHTML=""),!t||!window.Chart||!l){G.mobilChart=null;return}G.mobilChart=new window.Chart(t,{type:"doughnut",data:{labels:e.map(u=>u.kode_mobil),datasets:[{data:e.map(u=>u.total_uang_bersih),backgroundColor:e.map((u,d)=>Me[d%Me.length]),borderColor:"#ffffff",borderWidth:6,hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"58%",plugins:{legend:{display:!1},tooltip:{...It(),callbacks:{label(u){const d=e[u.dataIndex]||{};return`${u.label}: ${x(u.parsed)} / ${$(d.total_penumpang||0)} penumpang`}}}}}})}function tn(e){Object.entries(e.stats||{}).forEach(([t,n])=>so(t,n)),lo(e.revenueData||[]),co(e.revenueData||[]),mo(e.mobilRevenue||[])}async function fo(){const[e,t,n]=await Promise.all([C("/statistics/dashboard"),C("/statistics/revenue-chart"),C("/statistics/mobil-revenue")]);return{stats:e,revenueData:t,mobilRevenue:n}}function nn(e){const t=document.querySelector("[data-dashboard-loading]"),n=document.querySelector("[data-dashboard-content]"),a=document.getElementById("dashboard-refresh-btn");t&&(t.hidden=!e),n&&(n.hidden=e),a&&(a.disabled=e)}async function po(){const e=document.getElementById("dashboard-refresh-btn");e&&(tn(oo()),e.addEventListener("click",async()=>{nn(!0);try{tn(await fo())}catch{B("Silakan coba lagi","Gagal memuat data")}finally{nn(!1)}}))}const I={data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1},se=10;function go(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function bo(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 21C15 17.4 18 14.4 18 10.5C18 7.18629 15.3137 4.5 12 4.5C8.68629 4.5 6 7.18629 6 10.5C6 14.4 9 17.4 12 21Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
            <circle cx="12" cy="10.5" r="2.25" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function ho(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function ko(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function De(e){const t=document.getElementById("driver-submit-btn");I.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":I.editItem?"Perbarui":"Simpan")}function yo(){const e=document.getElementById("drivers-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="drivers-table-state">
                <div class="drivers-loading-inline">
                    <span class="drivers-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function Eo(){const e=document.getElementById("drivers-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="drivers-table-state drivers-empty-copy">
                Belum ada data driver
            </td>
        </tr>
    `)}function an(){const e=document.getElementById("drivers-table-body");if(e){if(I.loading){yo();return}if(I.data.length===0){Eo();return}e.innerHTML=I.data.map((t,n)=>`
        <tr class="drivers-row" data-testid="driver-row-${t.id}">
            <td class="drivers-index-cell">${(I.page-1)*se+n+1}</td>
            <td>
                <div class="drivers-user-cell">
                    <span class="drivers-user-avatar" aria-hidden="true">
                        ${go()}
                    </span>
                    <span class="drivers-user-name">${g(t.nama)}</span>
                </div>
            </td>
            <td>
                <div class="drivers-location-cell">
                    <span class="drivers-location-icon" aria-hidden="true">${bo()}</span>
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
                        ${ho()}
                    </button>
                    <button
                        class="drivers-icon-button drivers-icon-button-danger"
                        type="button"
                        data-driver-delete="${t.id}"
                        data-driver-name="${g(t.nama)}"
                        data-testid="delete-driver-${t.id}"
                        aria-label="Hapus driver ${g(t.nama)}"
                    >
                        ${ko()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function rn(){const e=document.getElementById("drivers-pagination-shell"),t=document.getElementById("drivers-pagination-info"),n=document.getElementById("drivers-pagination-page"),a=document.getElementById("drivers-prev-page-btn"),r=document.getElementById("drivers-next-page-btn"),o=Math.max(1,Math.ceil(I.totalCount/se));e&&(e.hidden=o<=1),t&&(t.textContent=Ie(I.page,se,I.totalCount,I.data.length)),n&&(n.textContent=`${I.page} / ${o}`),a&&(a.disabled=I.page===1),r&&(r.disabled=I.page>=o)}async function te(){I.loading=!0,an(),rn();try{const[e,t]=await Promise.all([C(`/drivers?page=${I.page}&limit=${se}${I.search?`&search=${encodeURIComponent(I.search)}`:""}`),C(`/drivers/count${I.search?`?search=${encodeURIComponent(I.search)}`:""}`)]);I.data=Array.isArray(e)?e:[],I.totalCount=Number(t.count||0)}finally{I.loading=!1,an(),rn()}}function on(){const e=document.getElementById("driver-form"),t=document.getElementById("driver-form-title"),n=document.getElementById("driver-form-description"),a=document.getElementById("driver-id"),r=document.getElementById("driver-nama"),o=document.getElementById("driver-lokasi");e?.reset(),a&&(a.value=""),r&&(r.value=""),o&&(o.value=""),t&&(t.textContent="Tambah Driver Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan data driver"),I.editItem=null,De(!1)}function wo(e){const t=document.getElementById("driver-form-title"),n=document.getElementById("driver-form-description"),a=document.getElementById("driver-id"),r=document.getElementById("driver-nama"),o=document.getElementById("driver-lokasi");I.editItem=e,a&&(a.value=e.id),r&&(r.value=e.nama),o&&(o.value=e.lokasi),t&&(t.textContent="Edit Data Driver"),n&&(n.textContent="Isi form di bawah untuk memperbarui data driver"),De(!1)}async function vo(e){const t=await C(`/drivers/${e}`);wo(t),A("driver-form-modal")}function Bo(e){const t=document.getElementById("driver-delete-copy");I.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus driver <strong>${g(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`),A("driver-delete-modal")}function Io(){const e=document.getElementById("drivers-add-btn"),t=document.getElementById("drivers-export-btn"),n=document.getElementById("drivers-search-input"),a=document.getElementById("driver-form"),r=document.getElementById("drivers-table-body"),o=document.getElementById("driver-delete-confirm-btn"),s=document.getElementById("drivers-prev-page-btn"),l=document.getElementById("drivers-next-page-btn");if(!(!e||!a||!r))return e.addEventListener("click",()=>{on(),A("driver-form-modal")}),t?.addEventListener("click",()=>{Et("/export/drivers/csv","drivers.csv").catch(()=>{B("Gagal mengunduh file")})}),n?.addEventListener("input",Be(async u=>{I.search=u.target.value.trim(),I.page=1;try{await te()}catch{B("Gagal memuat data")}})),a.addEventListener("submit",async u=>{u.preventDefault();const d={nama:document.getElementById("driver-nama")?.value.trim()||"",lokasi:document.getElementById("driver-lokasi")?.value.trim()||""};De(!0);try{I.editItem?(await C(`/drivers/${I.editItem.id}`,{method:"PUT",body:d}),L("Data driver berhasil diperbarui")):(await C("/drivers",{method:"POST",body:d}),L("Driver berhasil ditambahkan")),U("driver-form-modal"),on(),await te()}catch(i){B(i.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{De(!1)}}),r.addEventListener("click",async u=>{const d=u.target.closest("[data-driver-edit]"),i=u.target.closest("[data-driver-delete]");try{if(d){await vo(d.dataset.driverEdit);return}i&&Bo({id:i.dataset.driverDelete,nama:i.dataset.driverName})}catch{B("Gagal memuat data")}}),o?.addEventListener("click",async()=>{if(I.deleteItem)try{await C(`/drivers/${I.deleteItem.id}`,{method:"DELETE"}),L("Driver berhasil dihapus"),U("driver-delete-modal"),(I.page-1)*se>=I.totalCount-1&&I.page>1&&(I.page-=1),I.deleteItem=null,await te()}catch{B("Gagal menghapus data")}}),s?.addEventListener("click",async()=>{if(!(I.page<=1)){I.page-=1;try{await te()}catch{B("Gagal memuat data")}}}),l?.addEventListener("click",async()=>{const u=Math.max(1,Math.ceil(I.totalCount/se));if(!(I.page>=u)){I.page+=1;try{await te()}catch{B("Gagal memuat data")}}}),te().catch(()=>{B("Gagal memuat data")})}const h={data:[],loading:!0,totalCount:0,page:1,search:"",filterJenis:"",editItem:null,deleteItem:null,isSubmitting:!1},ie=10;function Co(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M5 14L6.6 9.2C6.8728 8.3816 7.6387 7.83 8.5014 7.83H15.4986C16.3613 7.83 17.1272 8.3816 17.4 9.2L19 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M4 14H20V17C20 18.1046 19.1046 19 18 19H6C4.89543 19 4 18.1046 4 17V14Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M7 16H7.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path>
            <path d="M17 16H17.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path>
        </svg>
    `}function $o(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function So(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function To(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 13L11 22L2 13V4H11L20 13Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <circle cx="7.5" cy="8.5" r="1.5" fill="currentColor"></circle>
        </svg>
    `}function je(e){const t=document.getElementById("mobil-submit-btn");h.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":h.editItem?"Perbarui":"Simpan")}function Ro(e){return e==="Hiace"?"mobil-jenis-badge mobil-jenis-badge-hiace":"mobil-jenis-badge mobil-jenis-badge-reborn"}function xo(){const e=document.getElementById("mobil-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="mobil-table-state">
                <div class="mobil-loading-inline">
                    <span class="mobil-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function _o(){const e=document.getElementById("mobil-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="mobil-table-state mobil-empty-copy">
                Belum ada data mobil
            </td>
        </tr>
    `)}function sn(){const e=document.getElementById("mobil-table-body");if(e){if(h.loading){xo();return}if(h.data.length===0){_o();return}e.innerHTML=h.data.map((t,n)=>`
        <tr class="mobil-row" data-testid="mobil-row-${t.id}">
            <td class="mobil-index-cell">${(h.page-1)*ie+n+1}</td>
            <td>
                <div class="mobil-code-cell">
                    <span class="mobil-code-avatar" aria-hidden="true">
                        ${Co()}
                    </span>
                    <span class="mobil-code-text">${g(t.kode_mobil)}</span>
                </div>
            </td>
            <td>
                <span class="${Ro(t.jenis_mobil)}">
                    <span class="mobil-jenis-icon" aria-hidden="true">${To()}</span>
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
                        ${$o()}
                    </button>
                    <button
                        class="mobil-icon-button mobil-icon-button-danger"
                        type="button"
                        data-mobil-delete="${t.id}"
                        data-mobil-name="${g(t.kode_mobil)}"
                        data-testid="delete-mobil-${t.id}"
                        aria-label="Hapus mobil ${g(t.kode_mobil)}"
                    >
                        ${So()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function dn(){const e=document.getElementById("mobil-pagination-shell"),t=document.getElementById("mobil-pagination-info"),n=document.getElementById("mobil-pagination-page"),a=document.getElementById("mobil-prev-page-btn"),r=document.getElementById("mobil-next-page-btn"),o=Math.max(1,Math.ceil(h.totalCount/ie));e&&(e.hidden=o<=1),t&&(t.textContent=Ie(h.page,ie,h.totalCount,h.data.length)),n&&(n.textContent=`${h.page} / ${o}`),a&&(a.disabled=h.page===1),r&&(r.disabled=h.page>=o)}async function X(){h.loading=!0,sn(),dn();try{const[e,t]=await Promise.all([C(`/mobil?page=${h.page}&limit=${ie}${h.search?`&search=${encodeURIComponent(h.search)}`:""}${h.filterJenis?`&jenis=${encodeURIComponent(h.filterJenis)}`:""}`),C(`/mobil/count${h.search||h.filterJenis?"?":""}${[h.search?`search=${encodeURIComponent(h.search)}`:"",h.filterJenis?`jenis=${encodeURIComponent(h.filterJenis)}`:""].filter(Boolean).join("&")}`)]);h.data=Array.isArray(e)?e:[],h.totalCount=Number(t.count||0)}finally{h.loading=!1,sn(),dn()}}function ln(){const e=document.getElementById("mobil-form"),t=document.getElementById("mobil-form-title"),n=document.getElementById("mobil-form-description"),a=document.getElementById("mobil-id"),r=document.getElementById("mobil-kode"),o=document.getElementById("mobil-jenis");e?.reset(),a&&(a.value=""),r&&(r.value=""),o&&(o.value="Hiace"),t&&(t.textContent="Tambah Mobil Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan data mobil"),h.editItem=null,je(!1)}function Lo(e){const t=document.getElementById("mobil-form-title"),n=document.getElementById("mobil-form-description"),a=document.getElementById("mobil-id"),r=document.getElementById("mobil-kode"),o=document.getElementById("mobil-jenis");h.editItem=e,a&&(a.value=e.id),r&&(r.value=e.kode_mobil),o&&(o.value=e.jenis_mobil),t&&(t.textContent="Edit Data Mobil"),n&&(n.textContent="Isi form di bawah untuk memperbarui data mobil"),je(!1)}async function Ao(e){const t=await C(`/mobil/${e}`);Lo(t),A("mobil-form-modal")}function Oo(e){const t=document.getElementById("mobil-delete-copy");h.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus mobil <strong>${g(e.kode_mobil)}</strong>? Tindakan ini tidak dapat dibatalkan.`),A("mobil-delete-modal")}function Po(){const e=document.getElementById("mobil-add-btn"),t=document.getElementById("mobil-export-btn"),n=document.getElementById("mobil-search-input"),a=document.getElementById("mobil-filter-jenis"),r=document.getElementById("mobil-form"),o=document.getElementById("mobil-table-body"),s=document.getElementById("mobil-delete-confirm-btn"),l=document.getElementById("mobil-prev-page-btn"),u=document.getElementById("mobil-next-page-btn"),d=document.getElementById("mobil-kode");if(!(!e||!r||!o))return e.addEventListener("click",()=>{ln(),A("mobil-form-modal")}),t?.addEventListener("click",()=>{Et("/export/mobil/csv","mobil.csv").catch(()=>{B("Gagal mengunduh file")})}),n?.addEventListener("input",Be(async i=>{h.search=i.target.value.trim(),h.page=1;try{await X()}catch{B("Gagal memuat data")}})),a?.addEventListener("change",async i=>{h.filterJenis=i.target.value,h.page=1;try{await X()}catch{B("Gagal memuat data")}}),d?.addEventListener("input",i=>{i.target.value=i.target.value.toUpperCase()}),r.addEventListener("submit",async i=>{i.preventDefault();const m={kode_mobil:document.getElementById("mobil-kode")?.value.trim().toUpperCase()||"",jenis_mobil:document.getElementById("mobil-jenis")?.value||"Hiace"};je(!0);try{h.editItem?(await C(`/mobil/${h.editItem.id}`,{method:"PUT",body:m}),L("Data mobil berhasil diperbarui")):(await C("/mobil",{method:"POST",body:m}),L("Mobil berhasil ditambahkan")),U("mobil-form-modal"),ln(),await X()}catch(y){B(y.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{je(!1)}}),o.addEventListener("click",async i=>{const m=i.target.closest("[data-mobil-edit]"),y=i.target.closest("[data-mobil-delete]");try{if(m){await Ao(m.dataset.mobilEdit);return}y&&Oo({id:y.dataset.mobilDelete,kode_mobil:y.dataset.mobilName})}catch{B("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(h.deleteItem)try{await C(`/mobil/${h.deleteItem.id}`,{method:"DELETE"}),L("Mobil berhasil dihapus"),U("mobil-delete-modal"),(h.page-1)*ie>=h.totalCount-1&&h.page>1&&(h.page-=1),h.deleteItem=null,await X()}catch{B("Gagal menghapus data")}}),l?.addEventListener("click",async()=>{if(!(h.page<=1)){h.page-=1;try{await X()}catch{B("Gagal memuat data")}}}),u?.addEventListener("click",async()=>{const i=Math.max(1,Math.ceil(h.totalCount/ie));if(!(h.page>=i)){h.page+=1;try{await X()}catch{B("Gagal memuat data")}}}),X().catch(()=>{B("Gagal memuat data")})}const k={data:[],drivers:[],mobilList:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1},ge=10,cn={"05:00":"Subuh (05.00 WIB)","08:00":"Pagi (08.00 WIB)","10:00":"Pagi (10.00 WIB)","14:00":"Siang (14.00 WIB)","16:00":"Sore (16.00 WIB)","19:00":"Malam (19.00 WIB)"},Ze="08:00",Mo=["Reguler","Dropping","Rental"],Ct="Reguler";function Do(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function jo(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function $t(e){return e==="Lunas"?"Lunas":"Belum Lunas"}function un(e){const t=$t(e);return`<span class="keberangkatan-payment-badge ${t==="Lunas"?"is-paid":"is-unpaid"}">${g(t)}</span>`}function mn(e){return cn[e]||cn[Ze]}function Ue(e){return Mo.includes(e)?e:Ct}function Uo(){const e=Number(document.getElementById("keberangkatan-tarif-penumpang")?.value||0),t=Number(document.getElementById("keberangkatan-uang-paket")?.value||0),n=Number(document.getElementById("keberangkatan-jumlah-snack")?.value||0),a=Number(document.getElementById("keberangkatan-jumlah-air-mineral")?.value||0),r=e,o=r+t,s=o*.15,l=o*.85;return{jumlah_uang_penumpang:r,uang_paket:t,total:o,uang_pc:s,uang_bersih:l,jumlah_snack:n,jumlah_air_mineral:a}}function St(){const e=Uo();Object.entries(e).forEach(([t,n])=>{const a=document.querySelector(`[data-calc="${t}"]`);if(a){if(t==="jumlah_snack"){a.textContent=`${$(n)} item`;return}if(t==="jumlah_air_mineral"){a.textContent=`${$(n)} botol`;return}a.textContent=x(n)}})}function Ne(e,t,n,a,r=""){const o=document.getElementById(e);if(!o)return;const s=e==="keberangkatan-kode-mobil"?"Pilih mobil":"Pilih driver";o.innerHTML=`
        <option value="">${s}</option>
        ${t.map(l=>`
            <option value="${l[n]}" ${String(l[n])===String(r)?"selected":""}>
                ${g(a(l))}
            </option>
        `).join("")}
    `}function He(e){const t=document.getElementById("keberangkatan-submit-btn");k.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":k.editItem?"Perbarui":"Simpan")}function No(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");e&&(e.innerHTML=`
        <tr>
            <td colspan="17" class="keberangkatan-table-state">
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
        `))}function Ho(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");e&&(e.innerHTML=`
        <tr>
            <td colspan="17" class="keberangkatan-table-state keberangkatan-empty-copy">
                Belum ada data keberangkatan
            </td>
        </tr>
    `,t&&(t.hidden=!1,t.innerHTML=`
            <div class="keberangkatan-mobile-state keberangkatan-empty-copy">
                Belum ada data keberangkatan
            </div>
        `))}function fn(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");if(e){if(k.loading){No();return}if(k.data.length===0){Ho();return}e.innerHTML=k.data.map(n=>`
        <tr class="keberangkatan-row" data-testid="keberangkatan-row-${n.id}">
            <td class="keberangkatan-hari-cell">${g(n.hari)}</td>
            <td>${g(n.tanggal)}</td>
            <td>${g(n.jam_keberangkatan_label||mn(n.jam_keberangkatan))}</td>
            <td>${g(Ue(n.tipe_layanan))}</td>
            <td>
                <span class="keberangkatan-kode-badge">${g(n.kode_mobil)}</span>
            </td>
            <td>${g(n.driver_nama)}</td>
            <td class="text-right">${$(n.jumlah_penumpang)}</td>
            <td class="text-right keberangkatan-money-cell">${x(n.jumlah_uang_penumpang)}</td>
            <td class="text-right">${$(n.jumlah_paket)}</td>
            <td class="text-right keberangkatan-money-cell">${x(n.uang_paket)}</td>
            <td class="text-right"><span class="keberangkatan-stock-badge">${$(n.jumlah_snack)}</span></td>
            <td class="text-right"><span class="keberangkatan-stock-badge keberangkatan-stock-badge-blue">${$(n.jumlah_air_mineral)}</span></td>
            <td class="text-right keberangkatan-money-cell keberangkatan-money-cell-amber">${x(n.uang_pc)}</td>
            <td class="text-right keberangkatan-money-cell keberangkatan-money-cell-emerald">${x(n.uang_bersih)}</td>
            <td class="text-center">${un(n.status_pembayaran)}</td>
            <td class="text-center">
                <span class="keberangkatan-trip-badge">#${$(n.trip_ke)}</span>
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
                        ${Do()}
                    </button>
                    <button
                        class="keberangkatan-icon-button keberangkatan-icon-button-danger"
                        type="button"
                        data-keberangkatan-delete="${n.id}"
                        data-testid="delete-keberangkatan-${n.id}"
                        aria-label="Hapus data keberangkatan ${g(n.kode_mobil)}"
                    >
                        ${jo()}
                    </button>
                </div>
            </td>
        </tr>
    `).join(""),t&&(t.hidden=!1,t.innerHTML=k.data.map(n=>`
            <article class="keberangkatan-mobile-card" data-testid="keberangkatan-card-${n.id}">
                <div class="keberangkatan-mobile-card-head">
                    <div>
                        <p class="keberangkatan-mobile-day">${g(n.hari)}</p>
                        <h3 class="keberangkatan-mobile-date">${g(n.tanggal)}</h3>
                        <p>${g(n.jam_keberangkatan_label||mn(n.jam_keberangkatan))}</p>
                    </div>
                    <div class="keberangkatan-mobile-head-side">
                        <span class="keberangkatan-kode-badge">${g(n.kode_mobil)}</span>
                        <span class="keberangkatan-trip-badge">#${$(n.trip_ke)}</span>
                    </div>
                </div>

                <div class="keberangkatan-mobile-driver">
                    <span>Driver</span>
                    <strong>${g(n.driver_nama)}</strong>
                </div>

                <div class="keberangkatan-mobile-grid">
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-status">
                        <span>Validasi</span>
                        ${un(n.status_pembayaran)}
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Layanan</span>
                        <strong>${g(Ue(n.tipe_layanan))}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Penumpang</span>
                        <strong>${$(n.jumlah_penumpang)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Paket</span>
                        <strong>${$(n.jumlah_paket)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Snack</span>
                        <strong>${$(n.jumlah_snack)} item</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Air Mineral</span>
                        <strong>${$(n.jumlah_air_mineral)} botol</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-full">
                        <span>Jumlah Tarif</span>
                        <strong>${x(n.jumlah_uang_penumpang)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-full">
                        <span>Uang Paket</span>
                        <strong>${x(n.uang_paket)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-accent">
                        <span>Uang PC (15%)</span>
                        <strong>${x(n.uang_pc)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-emerald">
                        <span>Uang Bersih</span>
                        <strong>${x(n.uang_bersih)}</strong>
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
        `).join(""))}}function pn(){const e=document.getElementById("keberangkatan-pagination-shell"),t=document.getElementById("keberangkatan-pagination-info"),n=document.getElementById("keberangkatan-pagination-page"),a=document.getElementById("keberangkatan-prev-page-btn"),r=document.getElementById("keberangkatan-next-page-btn"),o=Math.max(1,Math.ceil(k.totalCount/ge));e&&(e.hidden=o<=1),t&&(t.textContent=Ie(k.page,ge,k.totalCount,k.data.length)),n&&(n.textContent=`${k.page} / ${o}`),a&&(a.disabled=k.page===1),r&&(r.disabled=k.page>=o)}async function ne(){k.loading=!0,fn(),pn();try{const[e,t,n,a]=await Promise.all([C(`/keberangkatan?page=${k.page}&limit=${ge}${k.search?`&search=${encodeURIComponent(k.search)}`:""}`),C(`/keberangkatan/count${k.search?`?search=${encodeURIComponent(k.search)}`:""}`),C("/drivers/all"),C("/mobil/all")]);k.data=Array.isArray(e)?e:[],k.totalCount=Number(t.count||0),k.drivers=Array.isArray(n)?n:[],k.mobilList=Array.isArray(a)?a:[]}finally{k.loading=!1,fn(),pn()}}function na(){document.getElementById("keberangkatan-form")?.scrollTo({top:0,behavior:"auto"})}function rt(){const e=document.getElementById("keberangkatan-form"),t=document.getElementById("keberangkatan-form-title"),n=document.getElementById("keberangkatan-form-description"),a=document.getElementById("keberangkatan-tanggal"),r=document.getElementById("keberangkatan-jam-keberangkatan"),o=document.getElementById("keberangkatan-trip-ke"),s=document.getElementById("keberangkatan-tipe-layanan"),l=document.getElementById("keberangkatan-jumlah-penumpang"),u=document.getElementById("keberangkatan-tarif-penumpang"),d=document.getElementById("keberangkatan-jumlah-paket"),i=document.getElementById("keberangkatan-uang-paket"),m=document.getElementById("keberangkatan-jumlah-snack"),y=document.getElementById("keberangkatan-jumlah-air-mineral"),S=document.getElementById("keberangkatan-status-pembayaran");e?.reset(),k.editItem=null,document.getElementById("keberangkatan-id").value="",t&&(t.textContent="Tambah Data Keberangkatan"),n&&(n.textContent="Isi form di bawah untuk menambahkan data keberangkatan"),a&&(a.value=ea()),r&&(r.value=Ze),Ne("keberangkatan-kode-mobil",k.mobilList,"kode_mobil",f=>`${f.kode_mobil} - ${f.jenis_mobil}`,k.mobilList[0]?.kode_mobil||""),Ne("keberangkatan-driver-id",k.drivers,"id",f=>`${f.nama} - ${f.lokasi}`,k.drivers[0]?.id||""),o&&(o.value="1"),s&&(s.value=Ct),l&&(l.value="0"),u&&(u.value="0"),d&&(d.value="0"),i&&(i.value="0"),m&&(m.value="0"),y&&(y.value="0"),S&&(S.value="Belum Lunas"),He(!1),St(),na()}async function gn(e){const t=await C(`/keberangkatan/${e}`),n=document.getElementById("keberangkatan-form-title"),a=document.getElementById("keberangkatan-form-description");k.editItem=t,document.getElementById("keberangkatan-id").value=t.id,document.getElementById("keberangkatan-tanggal").value=t.tanggal,document.getElementById("keberangkatan-jam-keberangkatan").value=t.jam_keberangkatan||Ze,document.getElementById("keberangkatan-trip-ke").value=t.trip_ke,document.getElementById("keberangkatan-tipe-layanan").value=Ue(t.tipe_layanan),document.getElementById("keberangkatan-jumlah-penumpang").value=t.jumlah_penumpang,document.getElementById("keberangkatan-tarif-penumpang").value=t.tarif_penumpang,document.getElementById("keberangkatan-jumlah-paket").value=t.jumlah_paket,document.getElementById("keberangkatan-uang-paket").value=t.uang_paket,document.getElementById("keberangkatan-jumlah-snack").value=t.jumlah_snack,document.getElementById("keberangkatan-jumlah-air-mineral").value=t.jumlah_air_mineral,document.getElementById("keberangkatan-status-pembayaran").value=$t(t.status_pembayaran),Ne("keberangkatan-kode-mobil",k.mobilList,"kode_mobil",r=>`${r.kode_mobil} - ${r.jenis_mobil}`,t.kode_mobil),Ne("keberangkatan-driver-id",k.drivers,"id",r=>`${r.nama} - ${r.lokasi}`,t.driver_id),n&&(n.textContent="Edit Data Keberangkatan"),a&&(a.textContent="Isi form di bawah untuk memperbarui data keberangkatan"),He(!1),St(),na(),A("keberangkatan-form-modal")}function bn(e){k.deleteItem=e,A("keberangkatan-delete-modal")}function Fo(){const e=document.getElementById("keberangkatan-add-btn"),t=document.getElementById("keberangkatan-export-btn"),n=document.getElementById("keberangkatan-search-input"),a=document.getElementById("keberangkatan-form"),r=document.getElementById("keberangkatan-table-body"),o=document.getElementById("keberangkatan-mobile-list"),s=document.getElementById("keberangkatan-delete-confirm-btn"),l=document.getElementById("keberangkatan-prev-page-btn"),u=document.getElementById("keberangkatan-next-page-btn");if(!(!e||!a||!r))return e.addEventListener("click",()=>{rt(),A("keberangkatan-form-modal")}),t?.addEventListener("click",()=>{Et("/export/keberangkatan/csv","keberangkatan.csv").catch(()=>{B("Gagal mengunduh file")})}),n?.addEventListener("input",Be(async d=>{k.search=d.target.value.trim(),k.page=1;try{await ne()}catch{B("Gagal memuat data")}})),a.addEventListener("input",d=>{["keberangkatan-jumlah-penumpang","keberangkatan-tarif-penumpang","keberangkatan-uang-paket","keberangkatan-jumlah-snack","keberangkatan-jumlah-air-mineral"].includes(d.target.id)&&St()}),a.addEventListener("submit",async d=>{d.preventDefault();const i={tanggal:document.getElementById("keberangkatan-tanggal")?.value||"",jam_keberangkatan:document.getElementById("keberangkatan-jam-keberangkatan")?.value||Ze,tipe_layanan:Ue(document.getElementById("keberangkatan-tipe-layanan")?.value||Ct),kode_mobil:document.getElementById("keberangkatan-kode-mobil")?.value||"",driver_id:document.getElementById("keberangkatan-driver-id")?.value||"",jumlah_penumpang:Number(document.getElementById("keberangkatan-jumlah-penumpang")?.value||0),tarif_penumpang:Number(document.getElementById("keberangkatan-tarif-penumpang")?.value||0),jumlah_paket:Number(document.getElementById("keberangkatan-jumlah-paket")?.value||0),uang_paket:Number(document.getElementById("keberangkatan-uang-paket")?.value||0),jumlah_snack:Number(document.getElementById("keberangkatan-jumlah-snack")?.value||0),jumlah_air_mineral:Number(document.getElementById("keberangkatan-jumlah-air-mineral")?.value||0),trip_ke:Number(document.getElementById("keberangkatan-trip-ke")?.value||1),status_pembayaran:$t(document.getElementById("keberangkatan-status-pembayaran")?.value||"")};He(!0);try{k.editItem?(await C(`/keberangkatan/${k.editItem.id}`,{method:"PUT",body:i}),L("Data berhasil diperbarui")):(await C("/keberangkatan",{method:"POST",body:i}),L("Data berhasil ditambahkan")),U("keberangkatan-form-modal"),rt(),await ne()}catch(m){B(m.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{He(!1)}}),r.addEventListener("click",async d=>{const i=d.target.closest("[data-keberangkatan-edit]"),m=d.target.closest("[data-keberangkatan-delete]");try{if(i){await gn(i.dataset.keberangkatanEdit);return}m&&bn({id:m.dataset.keberangkatanDelete})}catch{B("Gagal memuat data")}}),o?.addEventListener("click",async d=>{const i=d.target.closest("[data-keberangkatan-edit]"),m=d.target.closest("[data-keberangkatan-delete]");try{if(i){await gn(i.dataset.keberangkatanEdit);return}m&&bn({id:m.dataset.keberangkatanDelete})}catch{B("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(k.deleteItem)try{await C(`/keberangkatan/${k.deleteItem.id}`,{method:"DELETE"}),L("Data berhasil dihapus"),U("keberangkatan-delete-modal"),(k.page-1)*ge>=k.totalCount-1&&k.page>1&&(k.page-=1),k.deleteItem=null,await ne()}catch{B("Gagal menghapus data")}}),l?.addEventListener("click",async()=>{if(!(k.page<=1)){k.page-=1;try{await ne()}catch{B("Gagal memuat data")}}}),u?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil(k.totalCount/ge));if(!(k.page>=d)){k.page+=1;try{await ne()}catch{B("Gagal memuat data")}}}),ne().then(()=>{rt()}).catch(()=>{B("Gagal memuat data")})}const w={data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1,prices:{snack:0,air:0}},be=10;function qo(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Vo(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Fe(e){return Number(document.getElementById(e)?.value||0)}function qe(){const e=Fe("stock-total-snack"),t=Fe("stock-total-air"),n=e*w.prices.snack+t*w.prices.air,a=document.querySelector('[data-stock-calc="nilai_total"]'),r=document.getElementById("stock-snack-price-label"),o=document.getElementById("stock-air-price-label");r&&(r.textContent=x(w.prices.snack)),o&&(o.textContent=x(w.prices.air)),a&&(a.textContent=x(n))}function Ve(e){const t=document.getElementById("stock-submit-btn");w.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":w.editItem?"Perbarui":"Simpan")}function Go(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");e&&(e.innerHTML=`
        <tr>
            <td colspan="13" class="stock-table-state">
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
        `))}function Jo(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");e&&(e.innerHTML=`
        <tr>
            <td colspan="13" class="stock-table-state stock-empty-copy">
                Belum ada data stok snack dan air mineral
            </td>
        </tr>
    `,t&&(t.hidden=!1,t.innerHTML=`
            <div class="stock-mobile-state stock-empty-copy">
                Belum ada data stok snack dan air mineral
            </div>
        `))}function hn(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");if(e){if(w.loading){Go();return}if(w.data.length===0){Jo();return}e.innerHTML=w.data.map(n=>`
        <tr class="stock-row" data-testid="stock-row-${n.id}">
            <td class="stock-day-cell">${g(n.hari)}</td>
            <td>${g(n.tanggal)}</td>
            <td>${g(n.bulan)}</td>
            <td class="text-right">${$(n.total_stock_snack)}</td>
            <td class="text-right">${$(n.total_stock_air_mineral)}</td>
            <td class="text-right">${$(n.terpakai_snack)}</td>
            <td class="text-right">${$(n.terpakai_air_mineral)}</td>
            <td class="text-right"><span class="stock-value-badge stock-value-badge-emerald">${$(n.sisa_stock_snack)}</span></td>
            <td class="text-right"><span class="stock-value-badge stock-value-badge-blue">${$(n.sisa_stock_air_mineral)}</span></td>
            <td class="text-right stock-money-cell">${x(n.nilai_total)}</td>
            <td class="text-right stock-money-cell stock-money-cell-emerald">${x(n.sisa_nilai_total)}</td>
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
                        ${qo()}
                    </button>
                    <button
                        class="stock-icon-button stock-icon-button-danger"
                        type="button"
                        data-stock-delete="${n.id}"
                        data-stock-date="${g(n.tanggal)}"
                        data-testid="delete-stock-${n.id}"
                        aria-label="Hapus data stok ${g(n.tanggal)}"
                    >
                        ${Vo()}
                    </button>
                </div>
            </td>
        </tr>
    `).join(""),t&&(t.hidden=!1,t.innerHTML=w.data.map(n=>`
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
                        <strong>${$(n.total_stock_snack)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Total Air Mineral</span>
                        <strong>${$(n.total_stock_air_mineral)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Terpakai Snack</span>
                        <strong>${$(n.terpakai_snack)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Terpakai Air Mineral</span>
                        <strong>${$(n.terpakai_air_mineral)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Sisa Snack</span>
                        <strong>${$(n.sisa_stock_snack)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Sisa Air Mineral</span>
                        <strong>${$(n.sisa_stock_air_mineral)}</strong>
                    </div>
                    <div class="stock-mobile-item stock-mobile-item-full">
                        <span>Nilai Total</span>
                        <strong>${x(n.nilai_total)}</strong>
                    </div>
                    <div class="stock-mobile-item stock-mobile-item-full stock-mobile-item-emerald">
                        <span>Sisa Nilai Total</span>
                        <strong>${x(n.sisa_nilai_total)}</strong>
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
        `).join(""))}}function kn(){const e=document.getElementById("stock-pagination-shell"),t=document.getElementById("stock-pagination-info"),n=document.getElementById("stock-pagination-page"),a=document.getElementById("stock-prev-page-btn"),r=document.getElementById("stock-next-page-btn"),o=Math.max(1,Math.ceil(w.totalCount/be));e&&(e.hidden=o<=1),t&&(t.textContent=Ie(w.page,be,w.totalCount,w.data.length)),n&&(n.textContent=`${w.page} / ${o}`),a&&(a.disabled=w.page===1),r&&(r.disabled=w.page>=o)}async function ae(){w.loading=!0,hn(),kn();try{const[e,t]=await Promise.all([C(`/stock?page=${w.page}&limit=${be}${w.search?`&search=${encodeURIComponent(w.search)}`:""}`),C(`/stock/count${w.search?`?search=${encodeURIComponent(w.search)}`:""}`)]);w.data=Array.isArray(e)?e:[],w.totalCount=Number(t.count||0)}finally{w.loading=!1,hn(),kn()}}function yn(){const e=document.getElementById("stock-form"),t=document.getElementById("stock-form-title"),n=document.getElementById("stock-form-description");e?.reset(),w.editItem=null,document.getElementById("stock-id").value="",document.getElementById("stock-tanggal").value=ea(),document.getElementById("stock-total-snack").value="0",document.getElementById("stock-total-air").value="0",document.getElementById("stock-keterangan").value="",t&&(t.textContent="Tambah Stok Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan stok snack dan air mineral"),Ve(!1),qe()}function zo(e){const t=document.getElementById("stock-form-title"),n=document.getElementById("stock-form-description");w.editItem=e,document.getElementById("stock-id").value=e.id,document.getElementById("stock-tanggal").value=e.tanggal,document.getElementById("stock-total-snack").value=e.total_stock_snack,document.getElementById("stock-total-air").value=e.total_stock_air_mineral,document.getElementById("stock-keterangan").value=e.keterangan||"",t&&(t.textContent="Edit Data Stok"),n&&(n.textContent="Isi form di bawah untuk memperbarui stok snack dan air mineral"),Ve(!1),qe()}async function En(e){const t=await C(`/stock/${e}`);zo(t),A("stock-form-modal")}function wn(e){const t=document.getElementById("stock-delete-copy");w.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus data stok tanggal <strong>${g(e.tanggal)}</strong>? Tindakan ini tidak dapat dibatalkan.`),A("stock-delete-modal")}function Wo(){const e=document.querySelector("[data-stock-page]"),t=document.getElementById("stock-add-btn"),n=document.getElementById("stock-search-input"),a=document.getElementById("stock-form"),r=document.getElementById("stock-table-body"),o=document.getElementById("stock-mobile-list"),s=document.getElementById("stock-delete-confirm-btn"),l=document.getElementById("stock-prev-page-btn"),u=document.getElementById("stock-next-page-btn");if(!(!e||!t||!a||!r))return w.prices.snack=Number(e.dataset.stockSnackPrice||0),w.prices.air=Number(e.dataset.stockAirPrice||0),qe(),t.addEventListener("click",()=>{yn(),A("stock-form-modal")}),n?.addEventListener("input",Be(async d=>{w.search=d.target.value.trim(),w.page=1;try{await ae()}catch{B("Gagal memuat data")}})),a.addEventListener("input",d=>{["stock-total-snack","stock-total-air"].includes(d.target.id)&&qe()}),a.addEventListener("submit",async d=>{d.preventDefault();const i={tanggal:document.getElementById("stock-tanggal")?.value||"",total_stock_snack:Fe("stock-total-snack"),total_stock_air_mineral:Fe("stock-total-air"),keterangan:document.getElementById("stock-keterangan")?.value.trim()||""};Ve(!0);try{w.editItem?(await C(`/stock/${w.editItem.id}`,{method:"PUT",body:i}),L("Data stok berhasil diperbarui")):(await C("/stock",{method:"POST",body:i}),L("Data stok berhasil ditambahkan")),U("stock-form-modal"),yn(),await ae()}catch(m){B(m.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{Ve(!1)}}),r.addEventListener("click",async d=>{const i=d.target.closest("[data-stock-edit]"),m=d.target.closest("[data-stock-delete]");try{if(i){await En(i.dataset.stockEdit);return}m&&wn({id:m.dataset.stockDelete,tanggal:m.dataset.stockDate})}catch{B("Gagal memuat data")}}),o?.addEventListener("click",async d=>{const i=d.target.closest("[data-stock-edit]"),m=d.target.closest("[data-stock-delete]");try{if(i){await En(i.dataset.stockEdit);return}m&&wn({id:m.dataset.stockDelete,tanggal:m.dataset.stockDate})}catch{B("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(w.deleteItem)try{await C(`/stock/${w.deleteItem.id}`,{method:"DELETE"}),L("Data stok berhasil dihapus"),U("stock-delete-modal"),(w.page-1)*be>=w.totalCount-1&&w.page>1&&(w.page-=1),w.deleteItem=null,await ae()}catch{B("Gagal menghapus data")}}),l?.addEventListener("click",async()=>{if(!(w.page<=1)){w.page-=1;try{await ae()}catch{B("Gagal memuat data")}}}),u?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil(w.totalCount/be));if(!(w.page>=d)){w.page+=1;try{await ae()}catch{B("Gagal memuat data")}}}),ae().catch(()=>{B("Gagal memuat data")})}const he=10,v={currentUser:null,data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,defaultRole:"User"};function Ko(e){return["Super Admin","Admin"].includes(e)}function Xo(e){return e==="Super Admin"}function Zo(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function Qo(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M2.5 12C4.4 8.2 8 6 12 6C16 6 19.6 8.2 21.5 12C19.6 15.8 16 18 12 18C8 18 4.4 15.8 2.5 12Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function Yo(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
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
    `}function ts(){return Xo(v.currentUser?.role)?["Super Admin","Admin","User"]:["Admin","User"]}function Ge(e){ro(document.getElementById("admin-user-submit-btn"),e,"Menyimpan...")}function ns(e){return e==="Super Admin"?"admin-users-role-badge admin-users-role-badge-super":e==="Admin"?"admin-users-role-badge admin-users-role-badge-admin":"admin-users-role-badge admin-users-role-badge-user"}function as(){const e=document.getElementById("admin-users-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="6" class="admin-users-table-state">
                <div class="admin-users-loading-inline">
                    <span class="admin-users-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function aa(e="Belum ada akun admin atau user."){const t=document.getElementById("admin-users-table-body");t&&(t.innerHTML=`
        <tr>
            <td colspan="6" class="admin-users-table-state admin-users-empty-copy">${g(e)}</td>
        </tr>
    `)}function vn(){const e=document.getElementById("admin-users-table-body");if(e){if(v.loading){as();return}if(v.data.length===0){aa();return}e.innerHTML=v.data.map(t=>`
        <tr class="admin-users-row" data-testid="admin-user-row-${t.id}">
            <td>
                <div class="admin-users-name-cell">
                    <span class="admin-users-avatar" aria-hidden="true">${Zo()}</span>
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
            <td><span class="${ns(t.role)}">${g(t.role)}</span></td>
            <td>
                <div class="admin-users-action-row">
                    <button class="admin-users-icon-button" type="button" data-admin-user-show="${t.id}" data-testid="show-admin-user-${t.id}" aria-label="Lihat detail akun ${g(t.nama)}">
                        ${Qo()}
                    </button>
                    <button class="admin-users-icon-button" type="button" data-admin-user-edit="${t.id}" data-testid="edit-admin-user-${t.id}" aria-label="Edit akun ${g(t.nama)}" ${t.can_edit?"":"disabled"}>
                        ${Yo()}
                    </button>
                    <button class="admin-users-icon-button admin-users-icon-button-danger" type="button" data-admin-user-delete="${t.id}" data-admin-user-name="${g(t.nama)}" data-testid="delete-admin-user-${t.id}" aria-label="Hapus akun ${g(t.nama)}" ${t.can_delete?"":"disabled"}>
                        ${es()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function mt(){const e=document.getElementById("admin-users-pagination-shell"),t=document.getElementById("admin-users-pagination-info"),n=document.getElementById("admin-users-pagination-page"),a=document.getElementById("admin-users-prev-page-btn"),r=document.getElementById("admin-users-next-page-btn"),o=Math.max(1,Math.ceil(v.totalCount/he));e&&(e.hidden=o<=1),t&&(t.textContent=Ie(v.page,he,v.totalCount,v.data.length)),n&&(n.textContent=`${v.page} / ${o}`),a&&(a.disabled=v.page===1),r&&(r.disabled=v.page>=o)}async function re(){v.loading=!0,vn(),mt();try{const e=v.search?`?search=${encodeURIComponent(v.search)}`:"",t=`?page=${v.page}&limit=${he}${v.search?`&search=${encodeURIComponent(v.search)}`:""}`,[n,a]=await Promise.all([C(`/admin-users${t}`),C(`/admin-users/count${e}`)]);v.data=Array.isArray(n)?n:[],v.totalCount=Number(a.count||0)}finally{v.loading=!1,vn(),mt()}}function ra(e="User"){const t=document.getElementById("admin-user-role");if(!t)return;const n=ts(),a=n.includes(e)?e:n[0];t.innerHTML=n.map(r=>`
        <option value="${g(r)}" ${r===a?"selected":""}>${g(r)}</option>
    `).join("")}function oa(e){const t=document.getElementById("admin-user-password"),n=document.getElementById("admin-user-password-note");t&&(t.required=!e,t.placeholder=e?"Kosongkan jika tidak ingin mengubah password":"Masukkan password",t.value=""),n&&(n.textContent=e?"Kosongkan password jika tidak ingin mengubah password akun ini.":"Password minimal 6 karakter dan akan disimpan dalam bentuk terenkripsi.")}function ot(e="User"){const t=document.getElementById("admin-user-form"),n=document.getElementById("admin-user-form-title"),a=document.getElementById("admin-user-form-description"),r=document.getElementById("admin-user-id");t?.reset(),r&&(r.value=""),ra(e),oa(!1),n&&(n.textContent=e==="Admin"?"Tambah Admin Baru":"Tambah User Baru"),a&&(a.textContent=e==="Admin"?"Lengkapi data akun untuk menambahkan admin baru":"Lengkapi data akun untuk menambahkan user baru"),v.defaultRole=e,v.editItem=null,Ge(!1)}function rs(e){v.editItem=e,document.getElementById("admin-user-id").value=e.id,document.getElementById("admin-user-nama").value=e.nama,document.getElementById("admin-user-username").value=e.username,document.getElementById("admin-user-email").value=e.email,ra(e.role),oa(!0),document.getElementById("admin-user-form-title").textContent="Edit Akun",document.getElementById("admin-user-form-description").textContent="Perbarui informasi akun admin atau user di bawah ini",Ge(!1)}function os(e){const t=document.getElementById("admin-user-detail-list");t&&(t.innerHTML=`
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
            <strong>${g(ao(e.created_at))}</strong>
        </div>
    `)}async function ss(e){os(await C(`/admin-users/${e}`)),A("admin-user-show-modal")}async function is(e){rs(await C(`/admin-users/${e}`)),A("admin-user-form-modal")}function ds(e){v.deleteItem=e,document.getElementById("admin-user-delete-copy").innerHTML=`Apakah Anda yakin ingin menghapus akun <strong>${g(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`,A("admin-user-delete-modal")}function Bn(){const e=document.getElementById("admin-users-access-note"),t=document.getElementById("admin-users-search-input"),n=document.querySelector(".admin-users-page-actions");e&&(e.hidden=!1,e.textContent="Halaman ini hanya dapat diakses oleh Admin atau Super Admin."),t&&(t.disabled=!0),n&&(n.hidden=!0),v.loading=!1,v.data=[],v.totalCount=0,aa("Anda tidak memiliki akses untuk mengelola data admin dan user."),mt()}function ls({user:e}={}){const t=document.getElementById("admin-users-add-admin-btn"),n=document.getElementById("admin-users-add-user-btn"),a=document.getElementById("admin-users-search-input"),r=document.getElementById("admin-user-form"),o=document.getElementById("admin-users-table-body"),s=document.getElementById("admin-user-delete-confirm-btn"),l=document.getElementById("admin-users-prev-page-btn"),u=document.getElementById("admin-users-next-page-btn");if(!(!t||!n||!r||!o)){if(v.currentUser=e||window.transitAuthUser||null,!Ko(v.currentUser?.role)){Bn();return}return t.addEventListener("click",()=>{ot("Admin"),A("admin-user-form-modal")}),n.addEventListener("click",()=>{ot("User"),A("admin-user-form-modal")}),a?.addEventListener("input",Be(async d=>{v.search=d.target.value.trim(),v.page=1;try{await re()}catch(i){B(i.message||"Gagal memuat data akun")}})),r.addEventListener("submit",async d=>{d.preventDefault();const i={nama:document.getElementById("admin-user-nama")?.value.trim()||"",username:document.getElementById("admin-user-username")?.value.trim()||"",email:document.getElementById("admin-user-email")?.value.trim()||"",password:document.getElementById("admin-user-password")?.value||"",role:document.getElementById("admin-user-role")?.value||"User"};Ge(!0);try{v.editItem?(await C(`/admin-users/${v.editItem.id}`,{method:"PUT",body:i}),L("Akun berhasil diperbarui")):(await C("/admin-users",{method:"POST",body:i}),L(i.role==="Admin"?"Admin berhasil ditambahkan":"User berhasil ditambahkan")),U("admin-user-form-modal"),ot(v.defaultRole),await re()}catch(m){B(m.message||"Silakan periksa kembali data yang diinput","Gagal menyimpan akun")}finally{Ge(!1)}}),o.addEventListener("click",async d=>{const i=d.target.closest("[data-admin-user-show]"),m=d.target.closest("[data-admin-user-edit]"),y=d.target.closest("[data-admin-user-delete]");try{if(i){await ss(i.dataset.adminUserShow);return}if(m){await is(m.dataset.adminUserEdit);return}y&&ds({id:y.dataset.adminUserDelete,nama:y.dataset.adminUserName})}catch(S){B(S.message||"Gagal memuat detail akun")}}),s?.addEventListener("click",async()=>{if(v.deleteItem)try{await C(`/admin-users/${v.deleteItem.id}`,{method:"DELETE"}),L("Akun berhasil dihapus"),U("admin-user-delete-modal"),(v.page-1)*he>=v.totalCount-1&&v.page>1&&(v.page-=1),v.deleteItem=null,await re()}catch(d){B(d.message||"Gagal menghapus akun")}}),l?.addEventListener("click",async()=>{if(!(v.page<=1)){v.page-=1;try{await re()}catch(d){B(d.message||"Gagal memuat data akun")}}}),u?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil(v.totalCount/he));if(!(v.page>=d)){v.page+=1;try{await re()}catch(i){B(i.message||"Gagal memuat data akun")}}}),re().catch(d=>{if(d.status===403){Bn();return}B(d.message||"Gagal memuat data akun")})}}const cs={"admin-users/index":ls,"auth/login":eo,"dashboard/index":po,"drivers/index":Io,"mobil/index":Po,"keberangkatan/index":Fo,"stock/index":Wo};document.addEventListener("DOMContentLoaded",async()=>{Xr(),Yr(),Pe(Xn());const e=Vr();e&&(e.type==="success"?L(e.message,e.title):e.type==="info"?Zr(e.message,e.title):B(e.message,e.title));try{const{user:t}=await Kr();t&&Pe(t);const n=document.body.dataset.pageScript,a=cs[n];typeof a=="function"&&await a({user:t})}catch(t){console.error(t),B(t.message||"Terjadi kesalahan saat memuat halaman")}});
