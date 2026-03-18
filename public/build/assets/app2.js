function ca(e,t){return function(){return e.apply(t,arguments)}}const{toString:er}=Object.prototype,{getPrototypeOf:Jt}=Object,{iterator:vt,toStringTag:ua}=Symbol,Et=(e=>t=>{const n=er.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),re=e=>(e=e.toLowerCase(),t=>Et(t)===e),wt=e=>t=>typeof t===e,{isArray:Me}=Array,Le=wt("undefined");function Ge(e){return e!==null&&!Le(e)&&e.constructor!==null&&!Le(e.constructor)&&Y(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const ma=re("ArrayBuffer");function tr(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&ma(e.buffer),t}const nr=wt("string"),Y=wt("function"),pa=wt("number"),Je=e=>e!==null&&typeof e=="object",ar=e=>e===!0||e===!1,nt=e=>{if(Et(e)!=="object")return!1;const t=Jt(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(ua in e)&&!(vt in e)},rr=e=>{if(!Je(e)||Ge(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},or=re("Date"),sr=re("File"),ir=e=>!!(e&&typeof e.uri<"u"),dr=e=>e&&typeof e.getParts<"u",lr=re("Blob"),cr=re("FileList"),ur=e=>Je(e)&&Y(e.pipe);function mr(){return typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}}const un=mr(),mn=typeof un.FormData<"u"?un.FormData:void 0,pr=e=>{let t;return e&&(mn&&e instanceof mn||Y(e.append)&&((t=Et(e))==="formdata"||t==="object"&&Y(e.toString)&&e.toString()==="[object FormData]"))},gr=re("URLSearchParams"),[fr,br,kr,hr]=["ReadableStream","Request","Response","Headers"].map(re),yr=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function Ke(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let a,r;if(typeof e!="object"&&(e=[e]),Me(e))for(a=0,r=e.length;a<r;a++)t.call(null,e[a],a,e);else{if(Ge(e))return;const o=n?Object.getOwnPropertyNames(e):Object.keys(e),s=o.length;let i;for(a=0;a<s;a++)i=o[a],t.call(null,e[i],i,e)}}function ga(e,t){if(Ge(e))return null;t=t.toLowerCase();const n=Object.keys(e);let a=n.length,r;for(;a-- >0;)if(r=n[a],t===r.toLowerCase())return r;return null}const ge=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,fa=e=>!Le(e)&&e!==ge;function Ot(){const{caseless:e,skipUndefined:t}=fa(this)&&this||{},n={},a=(r,o)=>{if(o==="__proto__"||o==="constructor"||o==="prototype")return;const s=e&&ga(n,o)||o;nt(n[s])&&nt(r)?n[s]=Ot(n[s],r):nt(r)?n[s]=Ot({},r):Me(r)?n[s]=r.slice():(!t||!Le(r))&&(n[s]=r)};for(let r=0,o=arguments.length;r<o;r++)arguments[r]&&Ke(arguments[r],a);return n}const vr=(e,t,n,{allOwnKeys:a}={})=>(Ke(t,(r,o)=>{n&&Y(r)?Object.defineProperty(e,o,{value:ca(r,n),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(e,o,{value:r,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:a}),e),Er=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),wr=(e,t,n,a)=>{e.prototype=Object.create(t.prototype,a),Object.defineProperty(e.prototype,"constructor",{value:e,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},Br=(e,t,n,a)=>{let r,o,s;const i={};if(t=t||{},e==null)return t;do{for(r=Object.getOwnPropertyNames(e),o=r.length;o-- >0;)s=r[o],(!a||a(s,e,t))&&!i[s]&&(t[s]=e[s],i[s]=!0);e=n!==!1&&Jt(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},Ir=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const a=e.indexOf(t,n);return a!==-1&&a===n},$r=e=>{if(!e)return null;if(Me(e))return e;let t=e.length;if(!pa(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},Sr=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&Jt(Uint8Array)),_r=(e,t)=>{const a=(e&&e[vt]).call(e);let r;for(;(r=a.next())&&!r.done;){const o=r.value;t.call(e,o[0],o[1])}},Cr=(e,t)=>{let n;const a=[];for(;(n=e.exec(t))!==null;)a.push(n);return a},xr=re("HTMLFormElement"),Lr=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,a,r){return a.toUpperCase()+r}),pn=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),Tr=re("RegExp"),ba=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),a={};Ke(n,(r,o)=>{let s;(s=t(r,o,e))!==!1&&(a[o]=s||r)}),Object.defineProperties(e,a)},Ar=e=>{ba(e,(t,n)=>{if(Y(e)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const a=e[n];if(Y(a)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},Mr=(e,t)=>{const n={},a=r=>{r.forEach(o=>{n[o]=!0})};return Me(e)?a(e):a(String(e).split(t)),n},Rr=()=>{},Pr=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function Dr(e){return!!(e&&Y(e.append)&&e[ua]==="FormData"&&e[vt])}const Or=e=>{const t=new Array(10),n=(a,r)=>{if(Je(a)){if(t.indexOf(a)>=0)return;if(Ge(a))return a;if(!("toJSON"in a)){t[r]=a;const o=Me(a)?[]:{};return Ke(a,(s,i)=>{const c=n(s,r+1);!Le(c)&&(o[i]=c)}),t[r]=void 0,o}}return a};return n(e,0)},jr=re("AsyncFunction"),qr=e=>e&&(Je(e)||Y(e))&&Y(e.then)&&Y(e.catch),ka=((e,t)=>e?setImmediate:t?((n,a)=>(ge.addEventListener("message",({source:r,data:o})=>{r===ge&&o===n&&a.length&&a.shift()()},!1),r=>{a.push(r),ge.postMessage(n,"*")}))(`axios@${Math.random()}`,[]):n=>setTimeout(n))(typeof setImmediate=="function",Y(ge.postMessage)),Nr=typeof queueMicrotask<"u"?queueMicrotask.bind(ge):typeof process<"u"&&process.nextTick||ka,Ur=e=>e!=null&&Y(e[vt]),m={isArray:Me,isArrayBuffer:ma,isBuffer:Ge,isFormData:pr,isArrayBufferView:tr,isString:nr,isNumber:pa,isBoolean:ar,isObject:Je,isPlainObject:nt,isEmptyObject:rr,isReadableStream:fr,isRequest:br,isResponse:kr,isHeaders:hr,isUndefined:Le,isDate:or,isFile:sr,isReactNativeBlob:ir,isReactNative:dr,isBlob:lr,isRegExp:Tr,isFunction:Y,isStream:ur,isURLSearchParams:gr,isTypedArray:Sr,isFileList:cr,forEach:Ke,merge:Ot,extend:vr,trim:yr,stripBOM:Er,inherits:wr,toFlatObject:Br,kindOf:Et,kindOfTest:re,endsWith:Ir,toArray:$r,forEachEntry:_r,matchAll:Cr,isHTMLForm:xr,hasOwnProperty:pn,hasOwnProp:pn,reduceDescriptors:ba,freezeMethods:Ar,toObjectSet:Mr,toCamelCase:Lr,noop:Rr,toFiniteNumber:Pr,findKey:ga,global:ge,isContextDefined:fa,isSpecCompliantForm:Dr,toJSONObject:Or,isAsyncFn:jr,isThenable:qr,setImmediate:ka,asap:Nr,isIterable:Ur};let I=class ha extends Error{static from(t,n,a,r,o,s){const i=new ha(t.message,n||t.code,a,r,o);return i.cause=t,i.name=t.name,t.status!=null&&i.status==null&&(i.status=t.status),s&&Object.assign(i,s),i}constructor(t,n,a,r,o){super(t),Object.defineProperty(this,"message",{value:t,enumerable:!0,writable:!0,configurable:!0}),this.name="AxiosError",this.isAxiosError=!0,n&&(this.code=n),a&&(this.config=a),r&&(this.request=r),o&&(this.response=o,this.status=o.status)}toJSON(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:m.toJSONObject(this.config),code:this.code,status:this.status}}};I.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";I.ERR_BAD_OPTION="ERR_BAD_OPTION";I.ECONNABORTED="ECONNABORTED";I.ETIMEDOUT="ETIMEDOUT";I.ERR_NETWORK="ERR_NETWORK";I.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";I.ERR_DEPRECATED="ERR_DEPRECATED";I.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";I.ERR_BAD_REQUEST="ERR_BAD_REQUEST";I.ERR_CANCELED="ERR_CANCELED";I.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";I.ERR_INVALID_URL="ERR_INVALID_URL";const Hr=null;function jt(e){return m.isPlainObject(e)||m.isArray(e)}function ya(e){return m.endsWith(e,"[]")?e.slice(0,-2):e}function xt(e,t,n){return e?e.concat(t).map(function(r,o){return r=ya(r),!n&&o?"["+r+"]":r}).join(n?".":""):t}function Fr(e){return m.isArray(e)&&!e.some(jt)}const Vr=m.toFlatObject(m,{},null,function(t){return/^is[A-Z]/.test(t)});function Bt(e,t,n){if(!m.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=m.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(b,g){return!m.isUndefined(g[b])});const a=n.metaTokens,r=n.visitor||l,o=n.dots,s=n.indexes,c=(n.Blob||typeof Blob<"u"&&Blob)&&m.isSpecCompliantForm(t);if(!m.isFunction(r))throw new TypeError("visitor must be a function");function d(p){if(p===null)return"";if(m.isDate(p))return p.toISOString();if(m.isBoolean(p))return p.toString();if(!c&&m.isBlob(p))throw new I("Blob is not supported. Use a Buffer instead.");return m.isArrayBuffer(p)||m.isTypedArray(p)?c&&typeof Blob=="function"?new Blob([p]):Buffer.from(p):p}function l(p,b,g){let E=p;if(m.isReactNative(t)&&m.isReactNativeBlob(p))return t.append(xt(g,b,o),d(p)),!1;if(p&&!g&&typeof p=="object"){if(m.endsWith(b,"{}"))b=a?b:b.slice(0,-2),p=JSON.stringify(p);else if(m.isArray(p)&&Fr(p)||(m.isFileList(p)||m.endsWith(b,"[]"))&&(E=m.toArray(p)))return b=ya(b),E.forEach(function(L,R){!(m.isUndefined(L)||L===null)&&t.append(s===!0?xt([b],R,o):s===null?b:b+"[]",d(L))}),!1}return jt(p)?!0:(t.append(xt(g,b,o),d(p)),!1)}const k=[],v=Object.assign(Vr,{defaultVisitor:l,convertValue:d,isVisitable:jt});function A(p,b){if(!m.isUndefined(p)){if(k.indexOf(p)!==-1)throw Error("Circular reference detected in "+b.join("."));k.push(p),m.forEach(p,function(E,P){(!(m.isUndefined(E)||E===null)&&r.call(t,E,m.isString(P)?P.trim():P,b,v))===!0&&A(E,b?b.concat(P):[P])}),k.pop()}}if(!m.isObject(e))throw new TypeError("data must be an object");return A(e),t}function gn(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(a){return t[a]})}function Kt(e,t){this._pairs=[],e&&Bt(e,this,t)}const va=Kt.prototype;va.append=function(t,n){this._pairs.push([t,n])};va.toString=function(t){const n=t?function(a){return t.call(this,a,gn)}:gn;return this._pairs.map(function(r){return n(r[0])+"="+n(r[1])},"").join("&")};function Gr(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function Ea(e,t,n){if(!t)return e;const a=n&&n.encode||Gr,r=m.isFunction(n)?{serialize:n}:n,o=r&&r.serialize;let s;if(o?s=o(t,r):s=m.isURLSearchParams(t)?t.toString():new Kt(t,r).toString(a),s){const i=e.indexOf("#");i!==-1&&(e=e.slice(0,i)),e+=(e.indexOf("?")===-1?"?":"&")+s}return e}class fn{constructor(){this.handlers=[]}use(t,n,a){return this.handlers.push({fulfilled:t,rejected:n,synchronous:a?a.synchronous:!1,runWhen:a?a.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){m.forEach(this.handlers,function(a){a!==null&&t(a)})}}const zt={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0},Jr=typeof URLSearchParams<"u"?URLSearchParams:Kt,Kr=typeof FormData<"u"?FormData:null,zr=typeof Blob<"u"?Blob:null,Wr={isBrowser:!0,classes:{URLSearchParams:Jr,FormData:Kr,Blob:zr},protocols:["http","https","file","blob","url","data"]},Wt=typeof window<"u"&&typeof document<"u",qt=typeof navigator=="object"&&navigator||void 0,Xr=Wt&&(!qt||["ReactNative","NativeScript","NS"].indexOf(qt.product)<0),Zr=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",Qr=Wt&&window.location.href||"http://localhost",Yr=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:Wt,hasStandardBrowserEnv:Xr,hasStandardBrowserWebWorkerEnv:Zr,navigator:qt,origin:Qr},Symbol.toStringTag,{value:"Module"})),Q={...Yr,...Wr};function eo(e,t){return Bt(e,new Q.classes.URLSearchParams,{visitor:function(n,a,r,o){return Q.isNode&&m.isBuffer(n)?(this.append(a,n.toString("base64")),!1):o.defaultVisitor.apply(this,arguments)},...t})}function to(e){return m.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function no(e){const t={},n=Object.keys(e);let a;const r=n.length;let o;for(a=0;a<r;a++)o=n[a],t[o]=e[o];return t}function wa(e){function t(n,a,r,o){let s=n[o++];if(s==="__proto__")return!0;const i=Number.isFinite(+s),c=o>=n.length;return s=!s&&m.isArray(r)?r.length:s,c?(m.hasOwnProp(r,s)?r[s]=[r[s],a]:r[s]=a,!i):((!r[s]||!m.isObject(r[s]))&&(r[s]=[]),t(n,a,r[s],o)&&m.isArray(r[s])&&(r[s]=no(r[s])),!i)}if(m.isFormData(e)&&m.isFunction(e.entries)){const n={};return m.forEachEntry(e,(a,r)=>{t(to(a),r,n,0)}),n}return null}function ao(e,t,n){if(m.isString(e))try{return(t||JSON.parse)(e),m.trim(e)}catch(a){if(a.name!=="SyntaxError")throw a}return(n||JSON.stringify)(e)}const ze={transitional:zt,adapter:["xhr","http","fetch"],transformRequest:[function(t,n){const a=n.getContentType()||"",r=a.indexOf("application/json")>-1,o=m.isObject(t);if(o&&m.isHTMLForm(t)&&(t=new FormData(t)),m.isFormData(t))return r?JSON.stringify(wa(t)):t;if(m.isArrayBuffer(t)||m.isBuffer(t)||m.isStream(t)||m.isFile(t)||m.isBlob(t)||m.isReadableStream(t))return t;if(m.isArrayBufferView(t))return t.buffer;if(m.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let i;if(o){if(a.indexOf("application/x-www-form-urlencoded")>-1)return eo(t,this.formSerializer).toString();if((i=m.isFileList(t))||a.indexOf("multipart/form-data")>-1){const c=this.env&&this.env.FormData;return Bt(i?{"files[]":t}:t,c&&new c,this.formSerializer)}}return o||r?(n.setContentType("application/json",!1),ao(t)):t}],transformResponse:[function(t){const n=this.transitional||ze.transitional,a=n&&n.forcedJSONParsing,r=this.responseType==="json";if(m.isResponse(t)||m.isReadableStream(t))return t;if(t&&m.isString(t)&&(a&&!this.responseType||r)){const s=!(n&&n.silentJSONParsing)&&r;try{return JSON.parse(t,this.parseReviver)}catch(i){if(s)throw i.name==="SyntaxError"?I.from(i,I.ERR_BAD_RESPONSE,this,null,this.response):i}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:Q.classes.FormData,Blob:Q.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};m.forEach(["delete","get","head","post","put","patch"],e=>{ze.headers[e]={}});const ro=m.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),oo=e=>{const t={};let n,a,r;return e&&e.split(`
`).forEach(function(s){r=s.indexOf(":"),n=s.substring(0,r).trim().toLowerCase(),a=s.substring(r+1).trim(),!(!n||t[n]&&ro[n])&&(n==="set-cookie"?t[n]?t[n].push(a):t[n]=[a]:t[n]=t[n]?t[n]+", "+a:a)}),t},bn=Symbol("internals");function Pe(e){return e&&String(e).trim().toLowerCase()}function at(e){return e===!1||e==null?e:m.isArray(e)?e.map(at):String(e)}function so(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let a;for(;a=n.exec(e);)t[a[1]]=a[2];return t}const io=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function Lt(e,t,n,a,r){if(m.isFunction(a))return a.call(this,t,n);if(r&&(t=n),!!m.isString(t)){if(m.isString(a))return t.indexOf(a)!==-1;if(m.isRegExp(a))return a.test(t)}}function lo(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,a)=>n.toUpperCase()+a)}function co(e,t){const n=m.toCamelCase(" "+t);["get","set","has"].forEach(a=>{Object.defineProperty(e,a+n,{value:function(r,o,s){return this[a].call(this,t,r,o,s)},configurable:!0})})}let ee=class{constructor(t){t&&this.set(t)}set(t,n,a){const r=this;function o(i,c,d){const l=Pe(c);if(!l)throw new Error("header name must be a non-empty string");const k=m.findKey(r,l);(!k||r[k]===void 0||d===!0||d===void 0&&r[k]!==!1)&&(r[k||c]=at(i))}const s=(i,c)=>m.forEach(i,(d,l)=>o(d,l,c));if(m.isPlainObject(t)||t instanceof this.constructor)s(t,n);else if(m.isString(t)&&(t=t.trim())&&!io(t))s(oo(t),n);else if(m.isObject(t)&&m.isIterable(t)){let i={},c,d;for(const l of t){if(!m.isArray(l))throw TypeError("Object iterator must return a key-value pair");i[d=l[0]]=(c=i[d])?m.isArray(c)?[...c,l[1]]:[c,l[1]]:l[1]}s(i,n)}else t!=null&&o(n,t,a);return this}get(t,n){if(t=Pe(t),t){const a=m.findKey(this,t);if(a){const r=this[a];if(!n)return r;if(n===!0)return so(r);if(m.isFunction(n))return n.call(this,r,a);if(m.isRegExp(n))return n.exec(r);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=Pe(t),t){const a=m.findKey(this,t);return!!(a&&this[a]!==void 0&&(!n||Lt(this,this[a],a,n)))}return!1}delete(t,n){const a=this;let r=!1;function o(s){if(s=Pe(s),s){const i=m.findKey(a,s);i&&(!n||Lt(a,a[i],i,n))&&(delete a[i],r=!0)}}return m.isArray(t)?t.forEach(o):o(t),r}clear(t){const n=Object.keys(this);let a=n.length,r=!1;for(;a--;){const o=n[a];(!t||Lt(this,this[o],o,t,!0))&&(delete this[o],r=!0)}return r}normalize(t){const n=this,a={};return m.forEach(this,(r,o)=>{const s=m.findKey(a,o);if(s){n[s]=at(r),delete n[o];return}const i=t?lo(o):String(o).trim();i!==o&&delete n[o],n[i]=at(r),a[i]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return m.forEach(this,(a,r)=>{a!=null&&a!==!1&&(n[r]=t&&m.isArray(a)?a.join(", "):a)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const a=new this(t);return n.forEach(r=>a.set(r)),a}static accessor(t){const a=(this[bn]=this[bn]={accessors:{}}).accessors,r=this.prototype;function o(s){const i=Pe(s);a[i]||(co(r,s),a[i]=!0)}return m.isArray(t)?t.forEach(o):o(t),this}};ee.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);m.reduceDescriptors(ee.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(a){this[n]=a}}});m.freezeMethods(ee);function Tt(e,t){const n=this||ze,a=t||n,r=ee.from(a.headers);let o=a.data;return m.forEach(e,function(i){o=i.call(n,o,r.normalize(),t?t.status:void 0)}),r.normalize(),o}function Ba(e){return!!(e&&e.__CANCEL__)}let We=class extends I{constructor(t,n,a){super(t??"canceled",I.ERR_CANCELED,n,a),this.name="CanceledError",this.__CANCEL__=!0}};function Ia(e,t,n){const a=n.config.validateStatus;!n.status||!a||a(n.status)?e(n):t(new I("Request failed with status code "+n.status,[I.ERR_BAD_REQUEST,I.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}function uo(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function mo(e,t){e=e||10;const n=new Array(e),a=new Array(e);let r=0,o=0,s;return t=t!==void 0?t:1e3,function(c){const d=Date.now(),l=a[o];s||(s=d),n[r]=c,a[r]=d;let k=o,v=0;for(;k!==r;)v+=n[k++],k=k%e;if(r=(r+1)%e,r===o&&(o=(o+1)%e),d-s<t)return;const A=l&&d-l;return A?Math.round(v*1e3/A):void 0}}function po(e,t){let n=0,a=1e3/t,r,o;const s=(d,l=Date.now())=>{n=l,r=null,o&&(clearTimeout(o),o=null),e(...d)};return[(...d)=>{const l=Date.now(),k=l-n;k>=a?s(d,l):(r=d,o||(o=setTimeout(()=>{o=null,s(r)},a-k)))},()=>r&&s(r)]}const st=(e,t,n=3)=>{let a=0;const r=mo(50,250);return po(o=>{const s=o.loaded,i=o.lengthComputable?o.total:void 0,c=s-a,d=r(c),l=s<=i;a=s;const k={loaded:s,total:i,progress:i?s/i:void 0,bytes:c,rate:d||void 0,estimated:d&&i&&l?(i-s)/d:void 0,event:o,lengthComputable:i!=null,[t?"download":"upload"]:!0};e(k)},n)},kn=(e,t)=>{const n=e!=null;return[a=>t[0]({lengthComputable:n,total:e,loaded:a}),t[1]]},hn=e=>(...t)=>m.asap(()=>e(...t)),go=Q.hasStandardBrowserEnv?((e,t)=>n=>(n=new URL(n,Q.origin),e.protocol===n.protocol&&e.host===n.host&&(t||e.port===n.port)))(new URL(Q.origin),Q.navigator&&/(msie|trident)/i.test(Q.navigator.userAgent)):()=>!0,fo=Q.hasStandardBrowserEnv?{write(e,t,n,a,r,o,s){if(typeof document>"u")return;const i=[`${e}=${encodeURIComponent(t)}`];m.isNumber(n)&&i.push(`expires=${new Date(n).toUTCString()}`),m.isString(a)&&i.push(`path=${a}`),m.isString(r)&&i.push(`domain=${r}`),o===!0&&i.push("secure"),m.isString(s)&&i.push(`SameSite=${s}`),document.cookie=i.join("; ")},read(e){if(typeof document>"u")return null;const t=document.cookie.match(new RegExp("(?:^|; )"+e+"=([^;]*)"));return t?decodeURIComponent(t[1]):null},remove(e){this.write(e,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function bo(e){return typeof e!="string"?!1:/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function ko(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function $a(e,t,n){let a=!bo(t);return e&&(a||n==!1)?ko(e,t):t}const yn=e=>e instanceof ee?{...e}:e;function be(e,t){t=t||{};const n={};function a(d,l,k,v){return m.isPlainObject(d)&&m.isPlainObject(l)?m.merge.call({caseless:v},d,l):m.isPlainObject(l)?m.merge({},l):m.isArray(l)?l.slice():l}function r(d,l,k,v){if(m.isUndefined(l)){if(!m.isUndefined(d))return a(void 0,d,k,v)}else return a(d,l,k,v)}function o(d,l){if(!m.isUndefined(l))return a(void 0,l)}function s(d,l){if(m.isUndefined(l)){if(!m.isUndefined(d))return a(void 0,d)}else return a(void 0,l)}function i(d,l,k){if(k in t)return a(d,l);if(k in e)return a(void 0,d)}const c={url:o,method:o,data:o,baseURL:s,transformRequest:s,transformResponse:s,paramsSerializer:s,timeout:s,timeoutMessage:s,withCredentials:s,withXSRFToken:s,adapter:s,responseType:s,xsrfCookieName:s,xsrfHeaderName:s,onUploadProgress:s,onDownloadProgress:s,decompress:s,maxContentLength:s,maxBodyLength:s,beforeRedirect:s,transport:s,httpAgent:s,httpsAgent:s,cancelToken:s,socketPath:s,responseEncoding:s,validateStatus:i,headers:(d,l,k)=>r(yn(d),yn(l),k,!0)};return m.forEach(Object.keys({...e,...t}),function(l){if(l==="__proto__"||l==="constructor"||l==="prototype")return;const k=m.hasOwnProp(c,l)?c[l]:r,v=k(e[l],t[l],l);m.isUndefined(v)&&k!==i||(n[l]=v)}),n}const Sa=e=>{const t=be({},e);let{data:n,withXSRFToken:a,xsrfHeaderName:r,xsrfCookieName:o,headers:s,auth:i}=t;if(t.headers=s=ee.from(s),t.url=Ea($a(t.baseURL,t.url,t.allowAbsoluteUrls),e.params,e.paramsSerializer),i&&s.set("Authorization","Basic "+btoa((i.username||"")+":"+(i.password?unescape(encodeURIComponent(i.password)):""))),m.isFormData(n)){if(Q.hasStandardBrowserEnv||Q.hasStandardBrowserWebWorkerEnv)s.setContentType(void 0);else if(m.isFunction(n.getHeaders)){const c=n.getHeaders(),d=["content-type","content-length"];Object.entries(c).forEach(([l,k])=>{d.includes(l.toLowerCase())&&s.set(l,k)})}}if(Q.hasStandardBrowserEnv&&(a&&m.isFunction(a)&&(a=a(t)),a||a!==!1&&go(t.url))){const c=r&&o&&fo.read(o);c&&s.set(r,c)}return t},ho=typeof XMLHttpRequest<"u",yo=ho&&function(e){return new Promise(function(n,a){const r=Sa(e);let o=r.data;const s=ee.from(r.headers).normalize();let{responseType:i,onUploadProgress:c,onDownloadProgress:d}=r,l,k,v,A,p;function b(){A&&A(),p&&p(),r.cancelToken&&r.cancelToken.unsubscribe(l),r.signal&&r.signal.removeEventListener("abort",l)}let g=new XMLHttpRequest;g.open(r.method.toUpperCase(),r.url,!0),g.timeout=r.timeout;function E(){if(!g)return;const L=ee.from("getAllResponseHeaders"in g&&g.getAllResponseHeaders()),D={data:!i||i==="text"||i==="json"?g.responseText:g.response,status:g.status,statusText:g.statusText,headers:L,config:e,request:g};Ia(function(M){n(M),b()},function(M){a(M),b()},D),g=null}"onloadend"in g?g.onloadend=E:g.onreadystatechange=function(){!g||g.readyState!==4||g.status===0&&!(g.responseURL&&g.responseURL.indexOf("file:")===0)||setTimeout(E)},g.onabort=function(){g&&(a(new I("Request aborted",I.ECONNABORTED,e,g)),g=null)},g.onerror=function(R){const D=R&&R.message?R.message:"Network Error",G=new I(D,I.ERR_NETWORK,e,g);G.event=R||null,a(G),g=null},g.ontimeout=function(){let R=r.timeout?"timeout of "+r.timeout+"ms exceeded":"timeout exceeded";const D=r.transitional||zt;r.timeoutErrorMessage&&(R=r.timeoutErrorMessage),a(new I(R,D.clarifyTimeoutError?I.ETIMEDOUT:I.ECONNABORTED,e,g)),g=null},o===void 0&&s.setContentType(null),"setRequestHeader"in g&&m.forEach(s.toJSON(),function(R,D){g.setRequestHeader(D,R)}),m.isUndefined(r.withCredentials)||(g.withCredentials=!!r.withCredentials),i&&i!=="json"&&(g.responseType=r.responseType),d&&([v,p]=st(d,!0),g.addEventListener("progress",v)),c&&g.upload&&([k,A]=st(c),g.upload.addEventListener("progress",k),g.upload.addEventListener("loadend",A)),(r.cancelToken||r.signal)&&(l=L=>{g&&(a(!L||L.type?new We(null,e,g):L),g.abort(),g=null)},r.cancelToken&&r.cancelToken.subscribe(l),r.signal&&(r.signal.aborted?l():r.signal.addEventListener("abort",l)));const P=uo(r.url);if(P&&Q.protocols.indexOf(P)===-1){a(new I("Unsupported protocol "+P+":",I.ERR_BAD_REQUEST,e));return}g.send(o||null)})},vo=(e,t)=>{const{length:n}=e=e?e.filter(Boolean):[];if(t||n){let a=new AbortController,r;const o=function(d){if(!r){r=!0,i();const l=d instanceof Error?d:this.reason;a.abort(l instanceof I?l:new We(l instanceof Error?l.message:l))}};let s=t&&setTimeout(()=>{s=null,o(new I(`timeout of ${t}ms exceeded`,I.ETIMEDOUT))},t);const i=()=>{e&&(s&&clearTimeout(s),s=null,e.forEach(d=>{d.unsubscribe?d.unsubscribe(o):d.removeEventListener("abort",o)}),e=null)};e.forEach(d=>d.addEventListener("abort",o));const{signal:c}=a;return c.unsubscribe=()=>m.asap(i),c}},Eo=function*(e,t){let n=e.byteLength;if(n<t){yield e;return}let a=0,r;for(;a<n;)r=a+t,yield e.slice(a,r),a=r},wo=async function*(e,t){for await(const n of Bo(e))yield*Eo(n,t)},Bo=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:n,value:a}=await t.read();if(n)break;yield a}}finally{await t.cancel()}},vn=(e,t,n,a)=>{const r=wo(e,t);let o=0,s,i=c=>{s||(s=!0,a&&a(c))};return new ReadableStream({async pull(c){try{const{done:d,value:l}=await r.next();if(d){i(),c.close();return}let k=l.byteLength;if(n){let v=o+=k;n(v)}c.enqueue(new Uint8Array(l))}catch(d){throw i(d),d}},cancel(c){return i(c),r.return()}},{highWaterMark:2})},En=64*1024,{isFunction:Qe}=m,Io=(({Request:e,Response:t})=>({Request:e,Response:t}))(m.global),{ReadableStream:wn,TextEncoder:Bn}=m.global,In=(e,...t)=>{try{return!!e(...t)}catch{return!1}},$o=e=>{e=m.merge.call({skipUndefined:!0},Io,e);const{fetch:t,Request:n,Response:a}=e,r=t?Qe(t):typeof fetch=="function",o=Qe(n),s=Qe(a);if(!r)return!1;const i=r&&Qe(wn),c=r&&(typeof Bn=="function"?(p=>b=>p.encode(b))(new Bn):async p=>new Uint8Array(await new n(p).arrayBuffer())),d=o&&i&&In(()=>{let p=!1;const b=new n(Q.origin,{body:new wn,method:"POST",get duplex(){return p=!0,"half"}}).headers.has("Content-Type");return p&&!b}),l=s&&i&&In(()=>m.isReadableStream(new a("").body)),k={stream:l&&(p=>p.body)};r&&["text","arrayBuffer","blob","formData","stream"].forEach(p=>{!k[p]&&(k[p]=(b,g)=>{let E=b&&b[p];if(E)return E.call(b);throw new I(`Response type '${p}' is not supported`,I.ERR_NOT_SUPPORT,g)})});const v=async p=>{if(p==null)return 0;if(m.isBlob(p))return p.size;if(m.isSpecCompliantForm(p))return(await new n(Q.origin,{method:"POST",body:p}).arrayBuffer()).byteLength;if(m.isArrayBufferView(p)||m.isArrayBuffer(p))return p.byteLength;if(m.isURLSearchParams(p)&&(p=p+""),m.isString(p))return(await c(p)).byteLength},A=async(p,b)=>{const g=m.toFiniteNumber(p.getContentLength());return g??v(b)};return async p=>{let{url:b,method:g,data:E,signal:P,cancelToken:L,timeout:R,onDownloadProgress:D,onUploadProgress:G,responseType:M,headers:F,withCredentials:J="same-origin",fetchOptions:W}=Sa(p),X=t||fetch;M=M?(M+"").toLowerCase():"text";let S=vo([P,L&&L.toAbortSignal()],R),N=null;const V=S&&S.unsubscribe&&(()=>{S.unsubscribe()});let oe;try{if(G&&d&&g!=="get"&&g!=="head"&&(oe=await A(F,E))!==0){let de=new n(b,{method:"POST",body:E,duplex:"half"}),ve;if(m.isFormData(E)&&(ve=de.headers.get("content-type"))&&F.setContentType(ve),de.body){const[Ct,Ze]=kn(oe,st(hn(G)));E=vn(de.body,En,Ct,Ze)}}m.isString(J)||(J=J?"include":"omit");const Z=o&&"credentials"in n.prototype,ae={...W,signal:S,method:g.toUpperCase(),headers:F.normalize().toJSON(),body:E,duplex:"half",credentials:Z?J:void 0};N=o&&new n(b,ae);let te=await(o?X(N,W):X(b,ae));const me=l&&(M==="stream"||M==="response");if(l&&(D||me&&V)){const de={};["status","statusText","headers"].forEach(cn=>{de[cn]=te[cn]});const ve=m.toFiniteNumber(te.headers.get("content-length")),[Ct,Ze]=D&&kn(ve,st(hn(D),!0))||[];te=new a(vn(te.body,En,Ct,()=>{Ze&&Ze(),V&&V()}),de)}M=M||"text";let _t=await k[m.findKey(k,M)||"text"](te,p);return!me&&V&&V(),await new Promise((de,ve)=>{Ia(de,ve,{data:_t,headers:ee.from(te.headers),status:te.status,statusText:te.statusText,config:p,request:N})})}catch(Z){throw V&&V(),Z&&Z.name==="TypeError"&&/Load failed|fetch/i.test(Z.message)?Object.assign(new I("Network Error",I.ERR_NETWORK,p,N,Z&&Z.response),{cause:Z.cause||Z}):I.from(Z,Z&&Z.code,p,N,Z&&Z.response)}}},So=new Map,_a=e=>{let t=e&&e.env||{};const{fetch:n,Request:a,Response:r}=t,o=[a,r,n];let s=o.length,i=s,c,d,l=So;for(;i--;)c=o[i],d=l.get(c),d===void 0&&l.set(c,d=i?new Map:$o(t)),l=d;return d};_a();const Xt={http:Hr,xhr:yo,fetch:{get:_a}};m.forEach(Xt,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const $n=e=>`- ${e}`,_o=e=>m.isFunction(e)||e===null||e===!1;function Co(e,t){e=m.isArray(e)?e:[e];const{length:n}=e;let a,r;const o={};for(let s=0;s<n;s++){a=e[s];let i;if(r=a,!_o(a)&&(r=Xt[(i=String(a)).toLowerCase()],r===void 0))throw new I(`Unknown adapter '${i}'`);if(r&&(m.isFunction(r)||(r=r.get(t))))break;o[i||"#"+s]=r}if(!r){const s=Object.entries(o).map(([c,d])=>`adapter ${c} `+(d===!1?"is not supported by the environment":"is not available in the build"));let i=n?s.length>1?`since :
`+s.map($n).join(`
`):" "+$n(s[0]):"as no adapter specified";throw new I("There is no suitable adapter to dispatch the request "+i,"ERR_NOT_SUPPORT")}return r}const Ca={getAdapter:Co,adapters:Xt};function At(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new We(null,e)}function Sn(e){return At(e),e.headers=ee.from(e.headers),e.data=Tt.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),Ca.getAdapter(e.adapter||ze.adapter,e)(e).then(function(a){return At(e),a.data=Tt.call(e,e.transformResponse,a),a.headers=ee.from(a.headers),a},function(a){return Ba(a)||(At(e),a&&a.response&&(a.response.data=Tt.call(e,e.transformResponse,a.response),a.response.headers=ee.from(a.response.headers))),Promise.reject(a)})}const xa="1.13.6",It={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{It[e]=function(a){return typeof a===e||"a"+(t<1?"n ":" ")+e}});const _n={};It.transitional=function(t,n,a){function r(o,s){return"[Axios v"+xa+"] Transitional option '"+o+"'"+s+(a?". "+a:"")}return(o,s,i)=>{if(t===!1)throw new I(r(s," has been removed"+(n?" in "+n:"")),I.ERR_DEPRECATED);return n&&!_n[s]&&(_n[s]=!0,console.warn(r(s," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(o,s,i):!0}};It.spelling=function(t){return(n,a)=>(console.warn(`${a} is likely a misspelling of ${t}`),!0)};function xo(e,t,n){if(typeof e!="object")throw new I("options must be an object",I.ERR_BAD_OPTION_VALUE);const a=Object.keys(e);let r=a.length;for(;r-- >0;){const o=a[r],s=t[o];if(s){const i=e[o],c=i===void 0||s(i,o,e);if(c!==!0)throw new I("option "+o+" must be "+c,I.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new I("Unknown option "+o,I.ERR_BAD_OPTION)}}const rt={assertOptions:xo,validators:It},ne=rt.validators;let fe=class{constructor(t){this.defaults=t||{},this.interceptors={request:new fn,response:new fn}}async request(t,n){try{return await this._request(t,n)}catch(a){if(a instanceof Error){let r={};Error.captureStackTrace?Error.captureStackTrace(r):r=new Error;const o=r.stack?r.stack.replace(/^.+\n/,""):"";try{a.stack?o&&!String(a.stack).endsWith(o.replace(/^.+\n.+\n/,""))&&(a.stack+=`
`+o):a.stack=o}catch{}}throw a}}_request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=be(this.defaults,n);const{transitional:a,paramsSerializer:r,headers:o}=n;a!==void 0&&rt.assertOptions(a,{silentJSONParsing:ne.transitional(ne.boolean),forcedJSONParsing:ne.transitional(ne.boolean),clarifyTimeoutError:ne.transitional(ne.boolean),legacyInterceptorReqResOrdering:ne.transitional(ne.boolean)},!1),r!=null&&(m.isFunction(r)?n.paramsSerializer={serialize:r}:rt.assertOptions(r,{encode:ne.function,serialize:ne.function},!0)),n.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?n.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:n.allowAbsoluteUrls=!0),rt.assertOptions(n,{baseUrl:ne.spelling("baseURL"),withXsrfToken:ne.spelling("withXSRFToken")},!0),n.method=(n.method||this.defaults.method||"get").toLowerCase();let s=o&&m.merge(o.common,o[n.method]);o&&m.forEach(["delete","get","head","post","put","patch","common"],p=>{delete o[p]}),n.headers=ee.concat(s,o);const i=[];let c=!0;this.interceptors.request.forEach(function(b){if(typeof b.runWhen=="function"&&b.runWhen(n)===!1)return;c=c&&b.synchronous;const g=n.transitional||zt;g&&g.legacyInterceptorReqResOrdering?i.unshift(b.fulfilled,b.rejected):i.push(b.fulfilled,b.rejected)});const d=[];this.interceptors.response.forEach(function(b){d.push(b.fulfilled,b.rejected)});let l,k=0,v;if(!c){const p=[Sn.bind(this),void 0];for(p.unshift(...i),p.push(...d),v=p.length,l=Promise.resolve(n);k<v;)l=l.then(p[k++],p[k++]);return l}v=i.length;let A=n;for(;k<v;){const p=i[k++],b=i[k++];try{A=p(A)}catch(g){b.call(this,g);break}}try{l=Sn.call(this,A)}catch(p){return Promise.reject(p)}for(k=0,v=d.length;k<v;)l=l.then(d[k++],d[k++]);return l}getUri(t){t=be(this.defaults,t);const n=$a(t.baseURL,t.url,t.allowAbsoluteUrls);return Ea(n,t.params,t.paramsSerializer)}};m.forEach(["delete","get","head","options"],function(t){fe.prototype[t]=function(n,a){return this.request(be(a||{},{method:t,url:n,data:(a||{}).data}))}});m.forEach(["post","put","patch"],function(t){function n(a){return function(o,s,i){return this.request(be(i||{},{method:t,headers:a?{"Content-Type":"multipart/form-data"}:{},url:o,data:s}))}}fe.prototype[t]=n(),fe.prototype[t+"Form"]=n(!0)});let Lo=class La{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(o){n=o});const a=this;this.promise.then(r=>{if(!a._listeners)return;let o=a._listeners.length;for(;o-- >0;)a._listeners[o](r);a._listeners=null}),this.promise.then=r=>{let o;const s=new Promise(i=>{a.subscribe(i),o=i}).then(r);return s.cancel=function(){a.unsubscribe(o)},s},t(function(o,s,i){a.reason||(a.reason=new We(o,s,i),n(a.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}toAbortSignal(){const t=new AbortController,n=a=>{t.abort(a)};return this.subscribe(n),t.signal.unsubscribe=()=>this.unsubscribe(n),t.signal}static source(){let t;return{token:new La(function(r){t=r}),cancel:t}}};function To(e){return function(n){return e.apply(null,n)}}function Ao(e){return m.isObject(e)&&e.isAxiosError===!0}const Nt={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(Nt).forEach(([e,t])=>{Nt[t]=e});function Ta(e){const t=new fe(e),n=ca(fe.prototype.request,t);return m.extend(n,fe.prototype,t,{allOwnKeys:!0}),m.extend(n,t,null,{allOwnKeys:!0}),n.create=function(r){return Ta(be(e,r))},n}const K=Ta(ze);K.Axios=fe;K.CanceledError=We;K.CancelToken=Lo;K.isCancel=Ba;K.VERSION=xa;K.toFormData=Bt;K.AxiosError=I;K.Cancel=K.CanceledError;K.all=function(t){return Promise.all(t)};K.spread=To;K.isAxiosError=Ao;K.mergeConfig=be;K.AxiosHeaders=ee;K.formToJSON=e=>wa(m.isHTMLForm(e)?new FormData(e):e);K.getAdapter=Ca.getAdapter;K.HttpStatusCode=Nt;K.default=K;const{Axios:ud,AxiosError:md,CanceledError:pd,isCancel:gd,CancelToken:fd,VERSION:bd,all:kd,Cancel:hd,isAxiosError:yd,spread:vd,toFormData:Ed,AxiosHeaders:wd,HttpStatusCode:Bd,formToJSON:Id,getAdapter:$d,mergeConfig:Sd}=K;window.axios=K;window.axios.defaults.headers.common["X-Requested-With"]="XMLHttpRequest";const Zt="transit_user",ue="transit_token",Ut="transit_pending_toast";function Re(){try{return typeof window<"u"&&typeof window.localStorage<"u"}catch{return!1}}function Aa(){try{return typeof window<"u"&&typeof window.sessionStorage<"u"}catch{return!1}}function Mo(){if(window.transitAuthUser)return window.transitAuthUser;if(!Re())return null;const e=window.localStorage.getItem(Zt);if(!e)return null;try{return JSON.parse(e)}catch{return Ne(),null}}function Ma(e){if(!Re()){window.transitAuthUser=e;return}window.transitAuthUser=e,window.localStorage.setItem(Zt,JSON.stringify(e))}function Ro(){if(!Re()){window.transitAuthUser=null;return}window.transitAuthUser=null,window.localStorage.removeItem(Zt)}function Qt(){return typeof window<"u"&&typeof window.transitAuthToken=="string"&&window.transitAuthToken!==""?window.transitAuthToken:Re()?window.localStorage.getItem(ue):null}function Po(e){const t=typeof e=="string"?e:"";if(!Re()){window.transitAuthToken=t||null;return}if(window.transitAuthToken=t||null,t===""){window.localStorage.removeItem(ue),document.cookie=ue+"=; path=/; max-age=0; samesite=lax";return}window.localStorage.setItem(ue,t),document.cookie=ue+"="+t+"; path=/; max-age=86400; samesite=lax"}function Do(){if(!Re()){window.transitAuthToken=null,document.cookie=ue+"=; path=/; max-age=0; samesite=lax";return}window.transitAuthToken=null,window.localStorage.removeItem(ue),document.cookie=ue+"=; path=/; max-age=0; samesite=lax"}function Oo(e){Aa()&&window.sessionStorage.setItem(Ut,JSON.stringify(e))}function jo(){if(!Aa())return null;const e=window.sessionStorage.getItem(Ut);if(!e)return null;window.sessionStorage.removeItem(Ut);try{return JSON.parse(e)}catch{return null}}function Ne(){Ro(),Do()}function Ra(e,t){if(!e)return t;if(typeof e.detail=="string"&&e.detail!=="")return e.detail;if(typeof e.message=="string"&&e.message!=="")return e.message;if(e.errors&&typeof e.errors=="object"){const n=Object.values(e.errors).flat()[0];if(typeof n=="string"&&n!=="")return n}return t}function Cn(){return document.body.dataset.apiBase||"/api"}function Pa(e=""){const t=String(e).replace(/^\/+/,"");return t===""?Cn():`${Cn()}/${t}`}async function y(e,t={}){const{method:n="GET",body:a=null,headers:r={},auth:o=!0}=t,s=new Headers(r);s.set("Accept","application/json"),s.set("X-Requested-With","XMLHttpRequest");let i=a;if(a&&!(a instanceof FormData)&&!(a instanceof Blob)&&(s.set("Content-Type","application/json"),i=JSON.stringify(a)),o){const k=Qt();k&&s.set("Authorization",`Bearer ${k}`)}if(!["GET","HEAD","OPTIONS"].includes(n.toUpperCase())){const k=document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");k&&s.set("X-CSRF-TOKEN",k)}const c=await fetch(Pa(e),{method:n,headers:s,body:i,credentials:"same-origin"});let d=null;const l=c.headers.get("content-type")||"";if(c.status!==204&&(d=l.includes("application/json")?await c.json():await c.text()),!c.ok){c.status===401&&(Ne(),(document.body.dataset.routeGuard||"none")==="protected"&&window.location.replace(document.body.dataset.loginUrl||"/login"));const k=Ra(d,`Request gagal (${c.status})`),v=new Error(k);throw v.status=c.status,v.data=d,v}return d}async function Yt(e,t="export.csv"){const n=new Headers({Accept:"text/csv,application/octet-stream","X-Requested-With":"XMLHttpRequest"}),a=Qt();a&&n.set("Authorization",`Bearer ${a}`);const r=await fetch(Pa(e),{method:"GET",headers:n,credentials:"same-origin"});if(!r.ok){let k=null;throw(r.headers.get("content-type")||"").includes("application/json")&&(k=await r.json()),new Error(Ra(k,"Gagal mengunduh file"))}const o=await r.blob(),c=(r.headers.get("content-disposition")||"").match(/filename="?([^"]+)"?/i)?.[1]||t,d=window.URL.createObjectURL(o),l=document.createElement("a");l.href=d,l.download=c,document.body.appendChild(l),l.click(),l.remove(),window.URL.revokeObjectURL(d)}function De(e,t){const n=document.getElementById(e);n&&(n.textContent=t)}function qo(e){const t=e?.role||"";document.querySelectorAll("[data-role-scope]").forEach(n=>{const a=n.dataset.roleScope,r=a==="admin"?["Super Admin","Admin"].includes(t):a==="super"?t==="Super Admin":!0;n.hidden=!r})}function Da(){return Mo()}function it(e){if(qo(e),!e)return;const t=e.nama||"Admin",n=t.trim().split(/\s+/)[0]||"Admin",a=e.email||"admin@pekanbaru.com";De("sidebar-user-name",t),De("sidebar-user-email",a),De("header-user-name",n),De("dropdown-user-name",t),De("dropdown-user-email",a)}function Oa(e){return typeof e.access_token=="string"&&e.access_token!==""&&Po(e.access_token),Ma(e.user),it(e.user),e}async function No(e){const t=await y("/auth/login",{method:"POST",body:e,auth:!1});return Oa(t)}async function Uo(e){const t=await y("/auth/register",{method:"POST",body:e,auth:!1});return Oa(t)}async function xn(){const e=await y("/auth/me");return Ma(e),it(e),e}async function Ho(){try{await y("/auth/logout",{method:"POST"})}catch(e){if(e?.status!==401)throw e}Ne(),Oo({type:"success",title:"Logout berhasil",message:"Sampai jumpa kembali!"}),window.location.replace(document.body.dataset.loginUrl||"/login")}function Ln(e){window.location.replace(e)}async function Fo(){const e=document.body.dataset.routeGuard||"none",t=document.body.dataset.loginUrl||"/login",n=document.body.dataset.dashboardUrl||"/dashboard",a=Da();if(e==="public"){try{const r=await xn();return Ln(n),{user:r}}catch{(a||Qt())&&Ne()}return{user:null}}if(e==="protected")try{return{user:await xn()}}catch{return Ne(),Ln(t),{user:null}}return{user:a}}function en(){return Array.from(document.querySelectorAll(".modal-shell")).filter(e=>!e.hidden)}function ja(){document.body.style.overflow=en().length>0?"hidden":""}function j(e){const t=document.getElementById(e);t&&(t.hidden=!1,ja())}function z(e=null){if(e){const t=document.getElementById(e);t&&(t.hidden=!0)}else en().forEach(t=>{t.hidden=!0});ja()}function Vo(){document.addEventListener("click",e=>{const t=e.target.closest("[data-modal-open]");if(t){j(t.dataset.modalOpen);return}const n=e.target.closest("[data-modal-close]");if(n){const a=n.dataset.modalClose||n.closest(".modal-shell")?.id;z(a||void 0)}}),document.addEventListener("keydown",e=>{if(e.key!=="Escape")return;const t=en().pop();t&&z(t.id)})}function tn(e,t,n){const a=document.getElementById("transit-toast-root");if(!a)return;const r=document.createElement("div");r.className=`transit-toast ${n==="error"?"is-error":""} ${n==="info"?"is-info":""}`.trim(),r.innerHTML=`
        <div>
            <strong>${e}</strong>
            <p>${t}</p>
        </div>
    `,a.appendChild(r),window.requestAnimationFrame(()=>{r.classList.add("is-visible")}),window.setTimeout(()=>{r.classList.remove("is-visible"),window.setTimeout(()=>r.remove(),180)},3600)}function q(e,t="Berhasil"){tn(t,e,"success")}function h(e,t="Gagal"){tn(t,e,"error")}function Go(e,t="Info"){tn(t,e,"info")}function Oe(e){const t=document.querySelector("[data-sidebar]"),n=document.querySelector("[data-sidebar-overlay]");!t||!n||(t.classList.toggle("is-open",e),n.hidden=!e)}function ot(e=null){document.querySelectorAll("[data-user-dropdown]").forEach(t=>{if(e&&t===e)return;t.classList.remove("is-open");const n=t.querySelector("[data-user-menu-trigger]"),a=t.querySelector("[data-user-menu-panel]");n&&n.setAttribute("aria-expanded","false"),a&&(a.hidden=!0)})}function Jo(e,t=null){if(!e)return;const n=e.querySelector("[data-user-menu-trigger]"),a=e.querySelector("[data-user-menu-panel]"),r=t??!e.classList.contains("is-open");ot(r?e:null),e.classList.toggle("is-open",r),n&&n.setAttribute("aria-expanded",r?"true":"false"),a&&(a.hidden=!r)}function Ko(){document.querySelector("[data-sidebar-open]")?.addEventListener("click",()=>{Oe(!0)}),document.querySelector("[data-sidebar-close]")?.addEventListener("click",()=>{Oe(!1)}),document.querySelector("[data-sidebar-overlay]")?.addEventListener("click",()=>{Oe(!1)}),document.querySelectorAll("[data-user-dropdown]").forEach(e=>{e.querySelector("[data-user-menu-trigger]")?.addEventListener("click",t=>{t.stopPropagation(),Jo(e)})}),document.addEventListener("click",e=>{e.target.closest("[data-user-dropdown]")||ot()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&(ot(),Oe(!1))}),window.addEventListener("resize",()=>{window.innerWidth>1100&&Oe(!1)}),document.querySelectorAll("[data-auth-logout]").forEach(e=>{e.addEventListener("click",async()=>{z(),ot();try{e.disabled=!0,await Ho()}catch(t){e.disabled=!1,h(t.message||"Gagal logout")}})})}const qa={login:{title:"Selamat Datang!",description:"Masuk ke akun Anda untuk melanjutkan",submit:"Masuk",switchText:"Belum punya akun?",switchAction:"Daftar sekarang"},register:{title:"Buat Akun Baru",description:"Daftar untuk mulai menggunakan sistem",submit:"Daftar",switchText:"Sudah punya akun?",switchAction:"Masuk"}};function Tn(e,t){const n=qa[e];t.form.dataset.authMode=e,t.title.textContent=n.title,t.description.textContent=n.description,t.submitText.textContent=n.submit,t.switchText&&(t.switchText.textContent=n.switchText),t.switchButton&&(t.switchButton.textContent=n.switchAction),t.nameField.hidden=e!=="register",t.nameInput.required=e==="register"}function zo(){const e=document.getElementById("auth-form");if(!e)return;const t={form:e,title:document.querySelector("[data-auth-title]"),description:document.querySelector("[data-auth-description]"),submitText:document.querySelector("[data-auth-submit-text]"),switchText:document.querySelector("[data-auth-switch-text]"),switchButton:document.querySelector("[data-toggle-auth-mode]"),nameField:document.getElementById("auth-name-field"),nameInput:document.getElementById("nama"),emailInput:document.getElementById("email"),passwordInput:document.getElementById("password"),passwordToggle:document.querySelector("[data-toggle-password]"),submitButton:document.getElementById("auth-submit-button")},n=document.body.dataset.dashboardUrl||"/dashboard";Tn("login",t),t.switchButton?.addEventListener("click",()=>{const a=t.form.dataset.authMode==="login"?"register":"login";Tn(a,t)}),t.passwordToggle?.addEventListener("click",()=>{const a=t.passwordInput.type==="password"?"text":"password";t.passwordInput.type=a,t.passwordToggle.textContent=a==="password"?"Lihat":"Sembunyikan"}),e.addEventListener("submit",async a=>{a.preventDefault();const r=new FormData(e),o=e.dataset.authMode||"login",s={email:String(r.get("email")||"").trim(),password:String(r.get("password")||"").trim()};o==="register"&&(s.nama=String(r.get("nama")||"").trim()),t.submitButton.disabled=!0,t.submitText.textContent=o==="login"?"Memproses...":"Mendaftarkan...";try{o==="login"?(await No(s),q("Selamat datang kembali","Login berhasil!")):(await Uo(s),q("Akun Anda telah dibuat","Registrasi berhasil!")),window.location.replace(n)}catch(i){h(i.message||"Terjadi kesalahan",o==="login"?"Login gagal":"Registrasi gagal")}finally{t.submitButton.disabled=!1,t.submitText.textContent=qa[o].submit}})}const Wo=new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}),Xo=new Intl.NumberFormat("id-ID");function H(e){return Wo.format(Number(e)||0)}function O(e){return Xo.format(Number(e)||0)}function u(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function he(e,t=300){let n=null;return(...a)=>{window.clearTimeout(n),n=window.setTimeout(()=>e(...a),t)}}function ye(e,t,n,a){if(n===0||a===0)return"Menampilkan 0 - 0 dari 0 data";const r=(e-1)*t+1,o=r+a-1;return`Menampilkan ${r} - ${o} dari ${n} data`}function Zo(e){if(!e)return"-";const t=new Date(e);return Number.isNaN(t.getTime())?e:new Intl.DateTimeFormat("id-ID",{day:"2-digit",month:"short",year:"numeric"}).format(t)}function Xe(){return new Date().toISOString().slice(0,10)}function se(e,t,n="Memproses..."){e&&(e.dataset.defaultText||(e.dataset.defaultText=e.textContent.trim()),e.disabled=t,e.textContent=t?n:e.dataset.defaultText)}const dt=["#059669","#10B981","#34D399","#6EE7B7","#A7F3D0"],ie={revenueChart:null,passengerChart:null,mobilChart:null};function Qo(){const e=document.getElementById("dashboard-initial-state");if(!e)return{stats:{},revenueData:[],mobilRevenue:[]};try{return JSON.parse(e.textContent||"{}")}catch{return{stats:{},revenueData:[],mobilRevenue:[]}}}function nn(e){e&&typeof e.destroy=="function"&&e.destroy()}function Yo(e,t){const n=document.querySelector(`[data-stat="${e}"]`);if(!n)return;const a=["total_uang_bersih","total_uang_pc"];n.textContent=a.includes(e)?H(t):O(t)}function Na(e,t,n){const a=document.getElementById(e),r=document.getElementById(t);a&&(a.hidden=!n),r&&(r.hidden=n)}function es(){return"#065f46"}function Ht(){return"#d1fae5"}function an(){return{backgroundColor:"#ffffff",titleColor:"#064e3b",bodyColor:"#065f46",borderColor:"#d1fae5",borderWidth:1,padding:12,cornerRadius:12,displayColors:!0}}function ts(e){const t=document.getElementById("dashboard-revenue-chart"),n=Array.isArray(e)&&e.length>0;if(Na("dashboard-revenue-chart","dashboard-revenue-empty",n),nn(ie.revenueChart),!t||!window.Chart||!n){ie.revenueChart=null;return}ie.revenueChart=new window.Chart(t,{type:"line",data:{labels:e.map(a=>a.bulan),datasets:[{label:"Pendapatan Bersih",data:e.map(a=>a.uang_bersih),borderColor:"#059669",backgroundColor:"rgba(5, 150, 105, 0.08)",fill:!1,tension:.35,pointRadius:4,pointHoverRadius:5,pointBackgroundColor:"#059669",pointBorderColor:"#ffffff",pointBorderWidth:2,borderWidth:3},{label:"Uang PC",data:e.map(a=>a.uang_pc),borderColor:"#f59e0b",backgroundColor:"rgba(245, 158, 11, 0.1)",fill:!1,tension:.35,pointRadius:4,pointHoverRadius:5,pointBackgroundColor:"#f59e0b",pointBorderColor:"#ffffff",pointBorderWidth:2,borderWidth:3}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{labels:{color:es(),usePointStyle:!0,pointStyle:"circle",boxWidth:8,boxHeight:8,padding:18}},tooltip:{...an(),callbacks:{label(a){return`${a.dataset.label}: ${H(a.parsed.y)}`}}}},scales:{x:{ticks:{color:"#047857",font:{size:12}},grid:{color:Ht()},border:{display:!1}},y:{ticks:{color:"#047857",font:{size:12},callback(a){return`${Math.round(Number(a)/1e6)}jt`}},grid:{color:Ht()},border:{display:!1}}}}})}function ns(e){const t=document.getElementById("dashboard-passenger-chart"),n=Array.isArray(e)&&e.length>0;if(Na("dashboard-passenger-chart","dashboard-passenger-empty",n),nn(ie.passengerChart),!t||!window.Chart||!n){ie.passengerChart=null;return}ie.passengerChart=new window.Chart(t,{type:"bar",data:{labels:e.map(a=>a.bulan),datasets:[{label:"Penumpang",data:e.map(a=>a.penumpang),backgroundColor:"#10B981",borderRadius:8,maxBarThickness:44}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{...an(),callbacks:{label(a){return`Penumpang: ${O(a.parsed.y)}`}}}},scales:{x:{ticks:{color:"#047857",font:{size:12}},grid:{color:"rgba(0, 0, 0, 0)"},border:{display:!1}},y:{ticks:{color:"#047857",font:{size:12}},grid:{color:Ht()},border:{display:!1}}}}})}function as(e){const t=document.getElementById("dashboard-mobil-list");t&&(t.innerHTML=e.map((n,a)=>`
        <div class="dashboard-mobil-item">
            <div class="dashboard-mobil-meta">
                <span class="dashboard-mobil-dot" style="background-color: ${dt[a%dt.length]}"></span>
                <div>
                    <p class="dashboard-mobil-code">${u(n.kode_mobil)}</p>
                    <p class="dashboard-mobil-trips">${O(n.total_trips)} trip</p>
                    <p class="dashboard-mobil-passengers">${O(n.total_penumpang)} penumpang</p>
                </div>
            </div>
            <p class="dashboard-mobil-value">${H(n.total_uang_bersih)}</p>
        </div>
    `).join(""))}function rs(e){const t=document.getElementById("dashboard-mobil-chart"),n=document.getElementById("dashboard-mobil-content"),a=document.getElementById("dashboard-mobil-empty"),r=document.getElementById("dashboard-mobil-chart-empty"),o=document.getElementById("dashboard-mobil-list"),s=Array.isArray(e)&&e.length>0,i=s&&e.some(c=>Number(c.total_uang_bersih)>0);if(nn(ie.mobilChart),n&&(n.hidden=!s),a&&(a.hidden=s),t&&(t.hidden=!i),r&&(r.hidden=i),s?as(e):o&&(o.innerHTML=""),!t||!window.Chart||!i){ie.mobilChart=null;return}ie.mobilChart=new window.Chart(t,{type:"doughnut",data:{labels:e.map(c=>c.kode_mobil),datasets:[{data:e.map(c=>c.total_uang_bersih),backgroundColor:e.map((c,d)=>dt[d%dt.length]),borderColor:"#ffffff",borderWidth:6,hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"58%",plugins:{legend:{display:!1},tooltip:{...an(),callbacks:{label(c){const d=e[c.dataIndex]||{};return`${c.label}: ${H(c.parsed)} / ${O(d.total_penumpang||0)} penumpang`}}}}}})}function An(e){Object.entries(e.stats||{}).forEach(([t,n])=>Yo(t,n)),ts(e.revenueData||[]),ns(e.revenueData||[]),rs(e.mobilRevenue||[])}async function os(){const[e,t,n]=await Promise.all([y("/statistics/dashboard"),y("/statistics/revenue-chart"),y("/statistics/mobil-revenue")]);return{stats:e,revenueData:t,mobilRevenue:n}}function Mn(e){const t=document.querySelector("[data-dashboard-loading]"),n=document.querySelector("[data-dashboard-content]"),a=document.getElementById("dashboard-refresh-btn");t&&(t.hidden=!e),n&&(n.hidden=e),a&&(a.disabled=e)}async function ss(){const e=document.getElementById("dashboard-refresh-btn");e&&(An(Qo()),e.addEventListener("click",async()=>{Mn(!0);try{An(await os())}catch{h("Silakan coba lagi","Gagal memuat data")}finally{Mn(!1)}}))}const T={data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1},Te=10;function is(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function ds(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 21C15 17.4 18 14.4 18 10.5C18 7.18629 15.3137 4.5 12 4.5C8.68629 4.5 6 7.18629 6 10.5C6 14.4 9 17.4 12 21Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
            <circle cx="12" cy="10.5" r="2.25" stroke="currentColor" stroke-width="1.8"></circle>
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
    `}function lt(e){const t=document.getElementById("driver-submit-btn");T.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":T.editItem?"Perbarui":"Simpan")}function us(){const e=document.getElementById("drivers-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="drivers-table-state">
                <div class="drivers-loading-inline">
                    <span class="drivers-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function ms(){const e=document.getElementById("drivers-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="drivers-table-state drivers-empty-copy">
                Belum ada data driver
            </td>
        </tr>
    `)}function Rn(){const e=document.getElementById("drivers-table-body");if(e){if(T.loading){us();return}if(T.data.length===0){ms();return}e.innerHTML=T.data.map((t,n)=>`
        <tr class="drivers-row" data-testid="driver-row-${t.id}">
            <td class="drivers-index-cell">${(T.page-1)*Te+n+1}</td>
            <td>
                <div class="drivers-user-cell">
                    <span class="drivers-user-avatar" aria-hidden="true">
                        ${is()}
                    </span>
                    <span class="drivers-user-name">${u(t.nama)}</span>
                </div>
            </td>
            <td>
                <div class="drivers-location-cell">
                    <span class="drivers-location-icon" aria-hidden="true">${ds()}</span>
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
                        ${ls()}
                    </button>
                    <button
                        class="drivers-icon-button drivers-icon-button-danger"
                        type="button"
                        data-driver-delete="${t.id}"
                        data-driver-name="${u(t.nama)}"
                        data-testid="delete-driver-${t.id}"
                        aria-label="Hapus driver ${u(t.nama)}"
                    >
                        ${cs()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function Pn(){const e=document.getElementById("drivers-pagination-shell"),t=document.getElementById("drivers-pagination-info"),n=document.getElementById("drivers-pagination-page"),a=document.getElementById("drivers-prev-page-btn"),r=document.getElementById("drivers-next-page-btn"),o=Math.max(1,Math.ceil(T.totalCount/Te));e&&(e.hidden=o<=1),t&&(t.textContent=ye(T.page,Te,T.totalCount,T.data.length)),n&&(n.textContent=`${T.page} / ${o}`),a&&(a.disabled=T.page===1),r&&(r.disabled=T.page>=o)}async function Ee(){T.loading=!0,Rn(),Pn();try{const[e,t]=await Promise.all([y(`/drivers?page=${T.page}&limit=${Te}${T.search?`&search=${encodeURIComponent(T.search)}`:""}`),y(`/drivers/count${T.search?`?search=${encodeURIComponent(T.search)}`:""}`)]);T.data=Array.isArray(e)?e:[],T.totalCount=Number(t.count||0)}finally{T.loading=!1,Rn(),Pn()}}function Dn(){const e=document.getElementById("driver-form"),t=document.getElementById("driver-form-title"),n=document.getElementById("driver-form-description"),a=document.getElementById("driver-id"),r=document.getElementById("driver-nama"),o=document.getElementById("driver-lokasi");e?.reset(),a&&(a.value=""),r&&(r.value=""),o&&(o.value=""),t&&(t.textContent="Tambah Driver Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan data driver"),T.editItem=null,lt(!1)}function ps(e){const t=document.getElementById("driver-form-title"),n=document.getElementById("driver-form-description"),a=document.getElementById("driver-id"),r=document.getElementById("driver-nama"),o=document.getElementById("driver-lokasi");T.editItem=e,a&&(a.value=e.id),r&&(r.value=e.nama),o&&(o.value=e.lokasi),t&&(t.textContent="Edit Data Driver"),n&&(n.textContent="Isi form di bawah untuk memperbarui data driver"),lt(!1)}async function gs(e){const t=await y(`/drivers/${e}`);ps(t),j("driver-form-modal")}function fs(e){const t=document.getElementById("driver-delete-copy");T.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus driver <strong>${u(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`),j("driver-delete-modal")}function bs(){const e=document.getElementById("drivers-add-btn"),t=document.getElementById("drivers-export-btn"),n=document.getElementById("drivers-search-input"),a=document.getElementById("driver-form"),r=document.getElementById("drivers-table-body"),o=document.getElementById("driver-delete-confirm-btn"),s=document.getElementById("drivers-prev-page-btn"),i=document.getElementById("drivers-next-page-btn");if(!(!e||!a||!r))return e.addEventListener("click",()=>{Dn(),j("driver-form-modal")}),t?.addEventListener("click",()=>{Yt("/export/drivers/csv","drivers.csv").catch(()=>{h("Gagal mengunduh file")})}),n?.addEventListener("input",he(async c=>{T.search=c.target.value.trim(),T.page=1;try{await Ee()}catch{h("Gagal memuat data")}})),a.addEventListener("submit",async c=>{c.preventDefault();const d={nama:document.getElementById("driver-nama")?.value.trim()||"",lokasi:document.getElementById("driver-lokasi")?.value.trim()||""};lt(!0);try{T.editItem?(await y(`/drivers/${T.editItem.id}`,{method:"PUT",body:d}),q("Data driver berhasil diperbarui")):(await y("/drivers",{method:"POST",body:d}),q("Driver berhasil ditambahkan")),z("driver-form-modal"),Dn(),await Ee()}catch(l){h(l.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{lt(!1)}}),r.addEventListener("click",async c=>{const d=c.target.closest("[data-driver-edit]"),l=c.target.closest("[data-driver-delete]");try{if(d){await gs(d.dataset.driverEdit);return}l&&fs({id:l.dataset.driverDelete,nama:l.dataset.driverName})}catch{h("Gagal memuat data")}}),o?.addEventListener("click",async()=>{if(T.deleteItem)try{await y(`/drivers/${T.deleteItem.id}`,{method:"DELETE"}),q("Driver berhasil dihapus"),z("driver-delete-modal"),(T.page-1)*Te>=T.totalCount-1&&T.page>1&&(T.page-=1),T.deleteItem=null,await Ee()}catch{h("Gagal menghapus data")}}),s?.addEventListener("click",async()=>{if(!(T.page<=1)){T.page-=1;try{await Ee()}catch{h("Gagal memuat data")}}}),i?.addEventListener("click",async()=>{const c=Math.max(1,Math.ceil(T.totalCount/Te));if(!(T.page>=c)){T.page+=1;try{await Ee()}catch{h("Gagal memuat data")}}}),Ee().catch(()=>{h("Gagal memuat data")})}const w={data:[],loading:!0,totalCount:0,page:1,search:"",filterJenis:"",editItem:null,deleteItem:null,isSubmitting:!1},Ae=10;function ks(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M5 14L6.6 9.2C6.8728 8.3816 7.6387 7.83 8.5014 7.83H15.4986C16.3613 7.83 17.1272 8.3816 17.4 9.2L19 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M4 14H20V17C20 18.1046 19.1046 19 18 19H6C4.89543 19 4 18.1046 4 17V14Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M7 16H7.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path>
            <path d="M17 16H17.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path>
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
    `}function vs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 13L11 22L2 13V4H11L20 13Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <circle cx="7.5" cy="8.5" r="1.5" fill="currentColor"></circle>
        </svg>
    `}function ct(e){const t=document.getElementById("mobil-submit-btn");w.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":w.editItem?"Perbarui":"Simpan")}function Es(e){return e==="Hiace"?"mobil-jenis-badge mobil-jenis-badge-hiace":"mobil-jenis-badge mobil-jenis-badge-reborn"}function ws(){const e=document.getElementById("mobil-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="mobil-table-state">
                <div class="mobil-loading-inline">
                    <span class="mobil-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function Bs(){const e=document.getElementById("mobil-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="mobil-table-state mobil-empty-copy">
                Belum ada data mobil
            </td>
        </tr>
    `)}function On(){const e=document.getElementById("mobil-table-body");if(e){if(w.loading){ws();return}if(w.data.length===0){Bs();return}e.innerHTML=w.data.map((t,n)=>`
        <tr class="mobil-row" data-testid="mobil-row-${t.id}">
            <td class="mobil-index-cell">${(w.page-1)*Ae+n+1}</td>
            <td>
                <div class="mobil-code-cell">
                    <span class="mobil-code-avatar" aria-hidden="true">
                        ${ks()}
                    </span>
                    <span class="mobil-code-text">${u(t.kode_mobil)}</span>
                </div>
            </td>
            <td>
                <span class="${Es(t.jenis_mobil)}">
                    <span class="mobil-jenis-icon" aria-hidden="true">${vs()}</span>
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
                        ${hs()}
                    </button>
                    <button
                        class="mobil-icon-button mobil-icon-button-danger"
                        type="button"
                        data-mobil-delete="${t.id}"
                        data-mobil-name="${u(t.kode_mobil)}"
                        data-testid="delete-mobil-${t.id}"
                        aria-label="Hapus mobil ${u(t.kode_mobil)}"
                    >
                        ${ys()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function jn(){const e=document.getElementById("mobil-pagination-shell"),t=document.getElementById("mobil-pagination-info"),n=document.getElementById("mobil-pagination-page"),a=document.getElementById("mobil-prev-page-btn"),r=document.getElementById("mobil-next-page-btn"),o=Math.max(1,Math.ceil(w.totalCount/Ae));e&&(e.hidden=o<=1),t&&(t.textContent=ye(w.page,Ae,w.totalCount,w.data.length)),n&&(n.textContent=`${w.page} / ${o}`),a&&(a.disabled=w.page===1),r&&(r.disabled=w.page>=o)}async function pe(){w.loading=!0,On(),jn();try{const[e,t]=await Promise.all([y(`/mobil?page=${w.page}&limit=${Ae}${w.search?`&search=${encodeURIComponent(w.search)}`:""}${w.filterJenis?`&jenis=${encodeURIComponent(w.filterJenis)}`:""}`),y(`/mobil/count${w.search||w.filterJenis?"?":""}${[w.search?`search=${encodeURIComponent(w.search)}`:"",w.filterJenis?`jenis=${encodeURIComponent(w.filterJenis)}`:""].filter(Boolean).join("&")}`)]);w.data=Array.isArray(e)?e:[],w.totalCount=Number(t.count||0)}finally{w.loading=!1,On(),jn()}}function qn(){const e=document.getElementById("mobil-form"),t=document.getElementById("mobil-form-title"),n=document.getElementById("mobil-form-description"),a=document.getElementById("mobil-id"),r=document.getElementById("mobil-kode"),o=document.getElementById("mobil-jenis");e?.reset(),a&&(a.value=""),r&&(r.value=""),o&&(o.value="Hiace"),t&&(t.textContent="Tambah Mobil Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan data mobil"),w.editItem=null,ct(!1)}function Is(e){const t=document.getElementById("mobil-form-title"),n=document.getElementById("mobil-form-description"),a=document.getElementById("mobil-id"),r=document.getElementById("mobil-kode"),o=document.getElementById("mobil-jenis");w.editItem=e,a&&(a.value=e.id),r&&(r.value=e.kode_mobil),o&&(o.value=e.jenis_mobil),t&&(t.textContent="Edit Data Mobil"),n&&(n.textContent="Isi form di bawah untuk memperbarui data mobil"),ct(!1)}async function $s(e){const t=await y(`/mobil/${e}`);Is(t),j("mobil-form-modal")}function Ss(e){const t=document.getElementById("mobil-delete-copy");w.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus mobil <strong>${u(e.kode_mobil)}</strong>? Tindakan ini tidak dapat dibatalkan.`),j("mobil-delete-modal")}function _s(){const e=document.getElementById("mobil-add-btn"),t=document.getElementById("mobil-export-btn"),n=document.getElementById("mobil-search-input"),a=document.getElementById("mobil-filter-jenis"),r=document.getElementById("mobil-form"),o=document.getElementById("mobil-table-body"),s=document.getElementById("mobil-delete-confirm-btn"),i=document.getElementById("mobil-prev-page-btn"),c=document.getElementById("mobil-next-page-btn"),d=document.getElementById("mobil-kode");if(!(!e||!r||!o))return e.addEventListener("click",()=>{qn(),j("mobil-form-modal")}),t?.addEventListener("click",()=>{Yt("/export/mobil/csv","mobil.csv").catch(()=>{h("Gagal mengunduh file")})}),n?.addEventListener("input",he(async l=>{w.search=l.target.value.trim(),w.page=1;try{await pe()}catch{h("Gagal memuat data")}})),a?.addEventListener("change",async l=>{w.filterJenis=l.target.value,w.page=1;try{await pe()}catch{h("Gagal memuat data")}}),d?.addEventListener("input",l=>{l.target.value=l.target.value.toUpperCase()}),r.addEventListener("submit",async l=>{l.preventDefault();const k={kode_mobil:document.getElementById("mobil-kode")?.value.trim().toUpperCase()||"",jenis_mobil:document.getElementById("mobil-jenis")?.value||"Hiace"};ct(!0);try{w.editItem?(await y(`/mobil/${w.editItem.id}`,{method:"PUT",body:k}),q("Data mobil berhasil diperbarui")):(await y("/mobil",{method:"POST",body:k}),q("Mobil berhasil ditambahkan")),z("mobil-form-modal"),qn(),await pe()}catch(v){h(v.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{ct(!1)}}),o.addEventListener("click",async l=>{const k=l.target.closest("[data-mobil-edit]"),v=l.target.closest("[data-mobil-delete]");try{if(k){await $s(k.dataset.mobilEdit);return}v&&Ss({id:v.dataset.mobilDelete,kode_mobil:v.dataset.mobilName})}catch{h("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(w.deleteItem)try{await y(`/mobil/${w.deleteItem.id}`,{method:"DELETE"}),q("Mobil berhasil dihapus"),z("mobil-delete-modal"),(w.page-1)*Ae>=w.totalCount-1&&w.page>1&&(w.page-=1),w.deleteItem=null,await pe()}catch{h("Gagal menghapus data")}}),i?.addEventListener("click",async()=>{if(!(w.page<=1)){w.page-=1;try{await pe()}catch{h("Gagal memuat data")}}}),c?.addEventListener("click",async()=>{const l=Math.max(1,Math.ceil(w.totalCount/Ae));if(!(w.page>=l)){w.page+=1;try{await pe()}catch{h("Gagal memuat data")}}}),pe().catch(()=>{h("Gagal memuat data")})}const B={data:[],drivers:[],mobilList:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1},Ue=10,Nn={"05:00":"Subuh (05.00 WIB)","08:00":"Pagi (08.00 WIB)","10:00":"Pagi (10.00 WIB)","14:00":"Siang (14.00 WIB)","16:00":"Sore (16.00 WIB)","19:00":"Malam (19.00 WIB)"},$t="08:00",Cs=["Reguler","Dropping","Rental"],rn="Reguler";function xs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Ls(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function on(e){return e==="Lunas"?"Lunas":"Belum Lunas"}function Un(e){const t=on(e);return`<span class="keberangkatan-payment-badge ${t==="Lunas"?"is-paid":"is-unpaid"}">${u(t)}</span>`}function Hn(e){return Nn[e]||Nn[$t]}function ut(e){return Cs.includes(e)?e:rn}function Ts(){const e=Number(document.getElementById("keberangkatan-tarif-penumpang")?.value||0),t=Number(document.getElementById("keberangkatan-uang-paket")?.value||0),n=Number(document.getElementById("keberangkatan-jumlah-snack")?.value||0),a=Number(document.getElementById("keberangkatan-pengembalian-snack")?.value||0),r=Number(document.getElementById("keberangkatan-jumlah-air-mineral")?.value||0),o=e,s=o+t,i=s*.15,c=s*.85;return{jumlah_uang_penumpang:o,uang_paket:t,total:s,uang_pc:i,uang_bersih:c,jumlah_snack:n,pengembalian_snack:a,jumlah_air_mineral:r}}function sn(){const e=Ts();Object.entries(e).forEach(([t,n])=>{const a=document.querySelector(`[data-calc="${t}"]`);if(a){if(t==="jumlah_snack"){a.textContent=`${O(n)} item`;return}if(t==="pengembalian_snack"){a.textContent=`${O(n)} item`;return}if(t==="jumlah_air_mineral"){a.textContent=`${O(n)} botol`;return}a.textContent=H(n)}})}function mt(e,t,n,a,r=""){const o=document.getElementById(e);if(!o)return;const s=e==="keberangkatan-kode-mobil"?"Pilih mobil":"Pilih driver";o.innerHTML=`
        <option value="">${s}</option>
        ${t.map(i=>`
            <option value="${i[n]}" ${String(i[n])===String(r)?"selected":""}>
                ${u(a(i))}
            </option>
        `).join("")}
    `}function pt(e){const t=document.getElementById("keberangkatan-submit-btn");B.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":B.editItem?"Perbarui":"Simpan")}function As(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");e&&(e.innerHTML=`
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
        `))}function Ms(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");e&&(e.innerHTML=`
        <tr>
            <td colspan="18" class="keberangkatan-table-state keberangkatan-empty-copy">
                Belum ada data keberangkatan
            </td>
        </tr>
    `,t&&(t.hidden=!1,t.innerHTML=`
            <div class="keberangkatan-mobile-state keberangkatan-empty-copy">
                Belum ada data keberangkatan
            </div>
        `))}function Fn(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");if(e){if(B.loading){As();return}if(B.data.length===0){Ms();return}e.innerHTML=B.data.map(n=>`
        <tr class="keberangkatan-row" data-testid="keberangkatan-row-${n.id}">
            <td class="keberangkatan-hari-cell">${u(n.hari)}</td>
            <td>${u(n.tanggal)}</td>
            <td>${u(n.jam_keberangkatan_label||Hn(n.jam_keberangkatan))}</td>
            <td>${u(ut(n.tipe_layanan))}</td>
            <td>
                <span class="keberangkatan-kode-badge">${u(n.kode_mobil)}</span>
            </td>
            <td>${u(n.driver_nama)}</td>
            <td class="text-right">${O(n.jumlah_penumpang)}</td>
            <td class="text-right keberangkatan-money-cell">${H(n.jumlah_uang_penumpang)}</td>
            <td class="text-right">${O(n.jumlah_paket)}</td>
            <td class="text-right keberangkatan-money-cell">${H(n.uang_paket)}</td>
            <td class="text-right"><span class="keberangkatan-stock-badge">${O(n.jumlah_snack)}</span></td>
            <td class="text-right"><span class="keberangkatan-stock-badge keberangkatan-stock-badge-blue">${O(n.pengembalian_snack)}</span></td>
            <td class="text-right"><span class="keberangkatan-stock-badge keberangkatan-stock-badge-blue">${O(n.jumlah_air_mineral)}</span></td>
            <td class="text-right keberangkatan-money-cell keberangkatan-money-cell-amber">${H(n.uang_pc)}</td>
            <td class="text-right keberangkatan-money-cell keberangkatan-money-cell-emerald">${H(n.uang_bersih)}</td>
            <td class="text-center">${Un(n.status_pembayaran)}</td>
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
                        ${xs()}
                    </button>
                    <button
                        class="keberangkatan-icon-button keberangkatan-icon-button-danger"
                        type="button"
                        data-keberangkatan-delete="${n.id}"
                        data-testid="delete-keberangkatan-${n.id}"
                        aria-label="Hapus data keberangkatan ${u(n.kode_mobil)}"
                    >
                        ${Ls()}
                    </button>
                </div>
            </td>
        </tr>
    `).join(""),t&&(t.hidden=!1,t.innerHTML=B.data.map(n=>`
            <article class="keberangkatan-mobile-card" data-testid="keberangkatan-card-${n.id}">
                <div class="keberangkatan-mobile-card-head">
                    <div>
                        <p class="keberangkatan-mobile-day">${u(n.hari)}</p>
                        <h3 class="keberangkatan-mobile-date">${u(n.tanggal)}</h3>
                        <p>${u(n.jam_keberangkatan_label||Hn(n.jam_keberangkatan))}</p>
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
                        ${Un(n.status_pembayaran)}
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Layanan</span>
                        <strong>${u(ut(n.tipe_layanan))}</strong>
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
                        <strong>${H(n.jumlah_uang_penumpang)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-full">
                        <span>Uang Paket</span>
                        <strong>${H(n.uang_paket)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-accent">
                        <span>Uang PC (15%)</span>
                        <strong>${H(n.uang_pc)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-emerald">
                        <span>Uang Bersih</span>
                        <strong>${H(n.uang_bersih)}</strong>
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
        `).join(""))}}function Vn(){const e=document.getElementById("keberangkatan-pagination-shell"),t=document.getElementById("keberangkatan-pagination-info"),n=document.getElementById("keberangkatan-pagination-page"),a=document.getElementById("keberangkatan-prev-page-btn"),r=document.getElementById("keberangkatan-next-page-btn"),o=Math.max(1,Math.ceil(B.totalCount/Ue));e&&(e.hidden=o<=1),t&&(t.textContent=ye(B.page,Ue,B.totalCount,B.data.length)),n&&(n.textContent=`${B.page} / ${o}`),a&&(a.disabled=B.page===1),r&&(r.disabled=B.page>=o)}async function we(){B.loading=!0,Fn(),Vn();try{const[e,t,n,a]=await Promise.all([y(`/keberangkatan?page=${B.page}&limit=${Ue}${B.search?`&search=${encodeURIComponent(B.search)}`:""}`),y(`/keberangkatan/count${B.search?`?search=${encodeURIComponent(B.search)}`:""}`),y("/drivers/all"),y("/mobil/all")]);B.data=Array.isArray(e)?e:[],B.totalCount=Number(t.count||0),B.drivers=Array.isArray(n)?n:[],B.mobilList=Array.isArray(a)?a:[]}finally{B.loading=!1,Fn(),Vn()}}function Ua(){document.getElementById("keberangkatan-form")?.scrollTo({top:0,behavior:"auto"})}function Mt(){const e=document.getElementById("keberangkatan-form"),t=document.getElementById("keberangkatan-form-title"),n=document.getElementById("keberangkatan-form-description"),a=document.getElementById("keberangkatan-tanggal"),r=document.getElementById("keberangkatan-jam-keberangkatan"),o=document.getElementById("keberangkatan-trip-ke"),s=document.getElementById("keberangkatan-tipe-layanan"),i=document.getElementById("keberangkatan-jumlah-penumpang"),c=document.getElementById("keberangkatan-tarif-penumpang"),d=document.getElementById("keberangkatan-jumlah-paket"),l=document.getElementById("keberangkatan-uang-paket"),k=document.getElementById("keberangkatan-jumlah-snack"),v=document.getElementById("keberangkatan-pengembalian-snack"),A=document.getElementById("keberangkatan-jumlah-air-mineral"),p=document.getElementById("keberangkatan-status-pembayaran");e?.reset(),B.editItem=null,document.getElementById("keberangkatan-id").value="",t&&(t.textContent="Tambah Data Keberangkatan"),n&&(n.textContent="Isi form di bawah untuk menambahkan data keberangkatan"),a&&(a.value=Xe()),r&&(r.value=$t),mt("keberangkatan-kode-mobil",B.mobilList,"kode_mobil",b=>`${b.kode_mobil} - ${b.jenis_mobil}`,B.mobilList[0]?.kode_mobil||""),mt("keberangkatan-driver-id",B.drivers,"id",b=>`${b.nama} - ${b.lokasi}`,B.drivers[0]?.id||""),o&&(o.value="1"),s&&(s.value=rn),i&&(i.value="0"),c&&(c.value="0"),d&&(d.value="0"),l&&(l.value="0"),k&&(k.value="0"),v&&(v.value="0"),A&&(A.value="0"),p&&(p.value="Belum Lunas"),pt(!1),sn(),Ua()}async function Gn(e){const t=await y(`/keberangkatan/${e}`),n=document.getElementById("keberangkatan-form-title"),a=document.getElementById("keberangkatan-form-description");B.editItem=t,document.getElementById("keberangkatan-id").value=t.id,document.getElementById("keberangkatan-tanggal").value=t.tanggal,document.getElementById("keberangkatan-jam-keberangkatan").value=t.jam_keberangkatan||$t,document.getElementById("keberangkatan-trip-ke").value=t.trip_ke,document.getElementById("keberangkatan-tipe-layanan").value=ut(t.tipe_layanan),document.getElementById("keberangkatan-jumlah-penumpang").value=t.jumlah_penumpang,document.getElementById("keberangkatan-tarif-penumpang").value=t.tarif_penumpang,document.getElementById("keberangkatan-jumlah-paket").value=t.jumlah_paket,document.getElementById("keberangkatan-uang-paket").value=t.uang_paket,document.getElementById("keberangkatan-jumlah-snack").value=t.jumlah_snack,document.getElementById("keberangkatan-pengembalian-snack").value=t.pengembalian_snack,document.getElementById("keberangkatan-jumlah-air-mineral").value=t.jumlah_air_mineral,document.getElementById("keberangkatan-status-pembayaran").value=on(t.status_pembayaran),mt("keberangkatan-kode-mobil",B.mobilList,"kode_mobil",r=>`${r.kode_mobil} - ${r.jenis_mobil}`,t.kode_mobil),mt("keberangkatan-driver-id",B.drivers,"id",r=>`${r.nama} - ${r.lokasi}`,t.driver_id),n&&(n.textContent="Edit Data Keberangkatan"),a&&(a.textContent="Isi form di bawah untuk memperbarui data keberangkatan"),pt(!1),sn(),Ua(),j("keberangkatan-form-modal")}function Jn(e){B.deleteItem=e,j("keberangkatan-delete-modal")}function Rs(){const e=document.getElementById("keberangkatan-add-btn"),t=document.getElementById("keberangkatan-export-btn"),n=document.getElementById("keberangkatan-search-input"),a=document.getElementById("keberangkatan-form"),r=document.getElementById("keberangkatan-table-body"),o=document.getElementById("keberangkatan-mobile-list"),s=document.getElementById("keberangkatan-delete-confirm-btn"),i=document.getElementById("keberangkatan-prev-page-btn"),c=document.getElementById("keberangkatan-next-page-btn");if(!(!e||!a||!r))return e.addEventListener("click",()=>{Mt(),j("keberangkatan-form-modal")}),t?.addEventListener("click",()=>{Yt("/export/keberangkatan/csv","keberangkatan.csv").catch(()=>{h("Gagal mengunduh file")})}),n?.addEventListener("input",he(async d=>{B.search=d.target.value.trim(),B.page=1;try{await we()}catch{h("Gagal memuat data")}})),a.addEventListener("input",d=>{["keberangkatan-jumlah-penumpang","keberangkatan-tarif-penumpang","keberangkatan-uang-paket","keberangkatan-jumlah-snack","keberangkatan-pengembalian-snack","keberangkatan-jumlah-air-mineral"].includes(d.target.id)&&sn()}),a.addEventListener("submit",async d=>{d.preventDefault();const l={tanggal:document.getElementById("keberangkatan-tanggal")?.value||"",jam_keberangkatan:document.getElementById("keberangkatan-jam-keberangkatan")?.value||$t,tipe_layanan:ut(document.getElementById("keberangkatan-tipe-layanan")?.value||rn),kode_mobil:document.getElementById("keberangkatan-kode-mobil")?.value||"",driver_id:document.getElementById("keberangkatan-driver-id")?.value||"",jumlah_penumpang:Number(document.getElementById("keberangkatan-jumlah-penumpang")?.value||0),tarif_penumpang:Number(document.getElementById("keberangkatan-tarif-penumpang")?.value||0),jumlah_paket:Number(document.getElementById("keberangkatan-jumlah-paket")?.value||0),uang_paket:Number(document.getElementById("keberangkatan-uang-paket")?.value||0),jumlah_snack:Number(document.getElementById("keberangkatan-jumlah-snack")?.value||0),pengembalian_snack:Number(document.getElementById("keberangkatan-pengembalian-snack")?.value||0),jumlah_air_mineral:Number(document.getElementById("keberangkatan-jumlah-air-mineral")?.value||0),trip_ke:Number(document.getElementById("keberangkatan-trip-ke")?.value||1),status_pembayaran:on(document.getElementById("keberangkatan-status-pembayaran")?.value||"")};pt(!0);try{B.editItem?(await y(`/keberangkatan/${B.editItem.id}`,{method:"PUT",body:l}),q("Data berhasil diperbarui")):(await y("/keberangkatan",{method:"POST",body:l}),q("Data berhasil ditambahkan")),z("keberangkatan-form-modal"),Mt(),await we()}catch(k){h(k.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{pt(!1)}}),r.addEventListener("click",async d=>{const l=d.target.closest("[data-keberangkatan-edit]"),k=d.target.closest("[data-keberangkatan-delete]");try{if(l){await Gn(l.dataset.keberangkatanEdit);return}k&&Jn({id:k.dataset.keberangkatanDelete})}catch{h("Gagal memuat data")}}),o?.addEventListener("click",async d=>{const l=d.target.closest("[data-keberangkatan-edit]"),k=d.target.closest("[data-keberangkatan-delete]");try{if(l){await Gn(l.dataset.keberangkatanEdit);return}k&&Jn({id:k.dataset.keberangkatanDelete})}catch{h("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(B.deleteItem)try{await y(`/keberangkatan/${B.deleteItem.id}`,{method:"DELETE"}),q("Data berhasil dihapus"),z("keberangkatan-delete-modal"),(B.page-1)*Ue>=B.totalCount-1&&B.page>1&&(B.page-=1),B.deleteItem=null,await we()}catch{h("Gagal menghapus data")}}),i?.addEventListener("click",async()=>{if(!(B.page<=1)){B.page-=1;try{await we()}catch{h("Gagal memuat data")}}}),c?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil(B.totalCount/Ue));if(!(B.page>=d)){B.page+=1;try{await we()}catch{h("Gagal memuat data")}}}),we().then(()=>{Mt()}).catch(()=>{h("Gagal memuat data")})}const $={data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1,prices:{snack:0,air:0}},He=10;function Ps(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
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
    `}function gt(e){return Number(document.getElementById(e)?.value||0)}function ft(){const e=gt("stock-total-snack"),t=gt("stock-total-air"),n=e*$.prices.snack+t*$.prices.air,a=document.querySelector('[data-stock-calc="nilai_total"]'),r=document.getElementById("stock-snack-price-label"),o=document.getElementById("stock-air-price-label");r&&(r.textContent=H($.prices.snack)),o&&(o.textContent=H($.prices.air)),a&&(a.textContent=H(n))}function bt(e){const t=document.getElementById("stock-submit-btn");$.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":$.editItem?"Perbarui":"Simpan")}function Os(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");e&&(e.innerHTML=`
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
        `))}function js(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");e&&(e.innerHTML=`
        <tr>
            <td colspan="14" class="stock-table-state stock-empty-copy">
                Belum ada data stok snack dan air mineral
            </td>
        </tr>
    `,t&&(t.hidden=!1,t.innerHTML=`
            <div class="stock-mobile-state stock-empty-copy">
                Belum ada data stok snack dan air mineral
            </div>
        `))}function Kn(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");if(e){if($.loading){Os();return}if($.data.length===0){js();return}e.innerHTML=$.data.map(n=>`
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
            <td class="text-right stock-money-cell">${H(n.nilai_total)}</td>
            <td class="text-right stock-money-cell stock-money-cell-emerald">${H(n.sisa_nilai_total)}</td>
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
                        ${Ps()}
                    </button>
                    <button
                        class="stock-icon-button stock-icon-button-danger"
                        type="button"
                        data-stock-delete="${n.id}"
                        data-stock-date="${u(n.tanggal)}"
                        data-testid="delete-stock-${n.id}"
                        aria-label="Hapus data stok ${u(n.tanggal)}"
                    >
                        ${Ds()}
                    </button>
                </div>
            </td>
        </tr>
    `).join(""),t&&(t.hidden=!1,t.innerHTML=$.data.map(n=>`
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
                        <strong>${H(n.nilai_total)}</strong>
                    </div>
                    <div class="stock-mobile-item stock-mobile-item-full stock-mobile-item-emerald">
                        <span>Sisa Nilai Total</span>
                        <strong>${H(n.sisa_nilai_total)}</strong>
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
        `).join(""))}}function zn(){const e=document.getElementById("stock-pagination-shell"),t=document.getElementById("stock-pagination-info"),n=document.getElementById("stock-pagination-page"),a=document.getElementById("stock-prev-page-btn"),r=document.getElementById("stock-next-page-btn"),o=Math.max(1,Math.ceil($.totalCount/He));e&&(e.hidden=o<=1),t&&(t.textContent=ye($.page,He,$.totalCount,$.data.length)),n&&(n.textContent=`${$.page} / ${o}`),a&&(a.disabled=$.page===1),r&&(r.disabled=$.page>=o)}async function Be(){$.loading=!0,Kn(),zn();try{const[e,t]=await Promise.all([y(`/stock?page=${$.page}&limit=${He}${$.search?`&search=${encodeURIComponent($.search)}`:""}`),y(`/stock/count${$.search?`?search=${encodeURIComponent($.search)}`:""}`)]);$.data=Array.isArray(e)?e:[],$.totalCount=Number(t.count||0)}finally{$.loading=!1,Kn(),zn()}}function Wn(){const e=document.getElementById("stock-form"),t=document.getElementById("stock-form-title"),n=document.getElementById("stock-form-description");e?.reset(),$.editItem=null,document.getElementById("stock-id").value="",document.getElementById("stock-tanggal").value=Xe(),document.getElementById("stock-total-snack").value="0",document.getElementById("stock-total-air").value="0",document.getElementById("stock-keterangan").value="",t&&(t.textContent="Tambah Stok Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan stok snack dan air mineral"),bt(!1),ft()}function qs(e){const t=document.getElementById("stock-form-title"),n=document.getElementById("stock-form-description");$.editItem=e,document.getElementById("stock-id").value=e.id,document.getElementById("stock-tanggal").value=e.tanggal,document.getElementById("stock-total-snack").value=e.total_stock_snack,document.getElementById("stock-total-air").value=e.total_stock_air_mineral,document.getElementById("stock-keterangan").value=e.keterangan||"",t&&(t.textContent="Edit Data Stok"),n&&(n.textContent="Isi form di bawah untuk memperbarui stok snack dan air mineral"),bt(!1),ft()}async function Xn(e){const t=await y(`/stock/${e}`);qs(t),j("stock-form-modal")}function Zn(e){const t=document.getElementById("stock-delete-copy");$.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus data stok tanggal <strong>${u(e.tanggal)}</strong>? Tindakan ini tidak dapat dibatalkan.`),j("stock-delete-modal")}function Ns(){const e=document.querySelector("[data-stock-page]"),t=document.getElementById("stock-add-btn"),n=document.getElementById("stock-search-input"),a=document.getElementById("stock-form"),r=document.getElementById("stock-table-body"),o=document.getElementById("stock-mobile-list"),s=document.getElementById("stock-delete-confirm-btn"),i=document.getElementById("stock-prev-page-btn"),c=document.getElementById("stock-next-page-btn");if(!(!e||!t||!a||!r))return $.prices.snack=Number(e.dataset.stockSnackPrice||0),$.prices.air=Number(e.dataset.stockAirPrice||0),ft(),t.addEventListener("click",()=>{Wn(),j("stock-form-modal")}),n?.addEventListener("input",he(async d=>{$.search=d.target.value.trim(),$.page=1;try{await Be()}catch{h("Gagal memuat data")}})),a.addEventListener("input",d=>{["stock-total-snack","stock-total-air"].includes(d.target.id)&&ft()}),a.addEventListener("submit",async d=>{d.preventDefault();const l={tanggal:document.getElementById("stock-tanggal")?.value||"",total_stock_snack:gt("stock-total-snack"),total_stock_air_mineral:gt("stock-total-air"),keterangan:document.getElementById("stock-keterangan")?.value.trim()||""};bt(!0);try{$.editItem?(await y(`/stock/${$.editItem.id}`,{method:"PUT",body:l}),q("Data stok berhasil diperbarui")):(await y("/stock",{method:"POST",body:l}),q("Data stok berhasil ditambahkan")),z("stock-form-modal"),Wn(),await Be()}catch(k){h(k.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{bt(!1)}}),r.addEventListener("click",async d=>{const l=d.target.closest("[data-stock-edit]"),k=d.target.closest("[data-stock-delete]");try{if(l){await Xn(l.dataset.stockEdit);return}k&&Zn({id:k.dataset.stockDelete,tanggal:k.dataset.stockDate})}catch{h("Gagal memuat data")}}),o?.addEventListener("click",async d=>{const l=d.target.closest("[data-stock-edit]"),k=d.target.closest("[data-stock-delete]");try{if(l){await Xn(l.dataset.stockEdit);return}k&&Zn({id:k.dataset.stockDelete,tanggal:k.dataset.stockDate})}catch{h("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if($.deleteItem)try{await y(`/stock/${$.deleteItem.id}`,{method:"DELETE"}),q("Data stok berhasil dihapus"),z("stock-delete-modal"),($.page-1)*He>=$.totalCount-1&&$.page>1&&($.page-=1),$.deleteItem=null,await Be()}catch{h("Gagal menghapus data")}}),i?.addEventListener("click",async()=>{if(!($.page<=1)){$.page-=1;try{await Be()}catch{h("Gagal memuat data")}}}),c?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil($.totalCount/He));if(!($.page>=d)){$.page+=1;try{await Be()}catch{h("Gagal memuat data")}}}),Be().catch(()=>{h("Gagal memuat data")})}const Fe=10,_={currentUser:null,data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,defaultRole:"User"};function Us(e){return["Super Admin","Admin"].includes(e)}function Hs(e){return e==="Super Admin"}function Fs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function Vs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M2.5 12C4.4 8.2 8 6 12 6C16 6 19.6 8.2 21.5 12C19.6 15.8 16 18 12 18C8 18 4.4 15.8 2.5 12Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function Gs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
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
    `}function Ks(){return Hs(_.currentUser?.role)?["Super Admin","Admin","User"]:["Admin","User"]}function kt(e){se(document.getElementById("admin-user-submit-btn"),e,"Menyimpan...")}function zs(e){return e==="Super Admin"?"admin-users-role-badge admin-users-role-badge-super":e==="Admin"?"admin-users-role-badge admin-users-role-badge-admin":"admin-users-role-badge admin-users-role-badge-user"}function Ws(){const e=document.getElementById("admin-users-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="6" class="admin-users-table-state">
                <div class="admin-users-loading-inline">
                    <span class="admin-users-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function Ha(e="Belum ada akun admin atau user."){const t=document.getElementById("admin-users-table-body");t&&(t.innerHTML=`
        <tr>
            <td colspan="6" class="admin-users-table-state admin-users-empty-copy">${u(e)}</td>
        </tr>
    `)}function Qn(){const e=document.getElementById("admin-users-table-body");if(e){if(_.loading){Ws();return}if(_.data.length===0){Ha();return}e.innerHTML=_.data.map(t=>`
        <tr class="admin-users-row" data-testid="admin-user-row-${t.id}">
            <td>
                <div class="admin-users-name-cell">
                    <span class="admin-users-avatar" aria-hidden="true">${Fs()}</span>
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
            <td><span class="${zs(t.role)}">${u(t.role)}</span></td>
            <td>
                <div class="admin-users-action-row">
                    <button class="admin-users-icon-button" type="button" data-admin-user-show="${t.id}" data-testid="show-admin-user-${t.id}" aria-label="Lihat detail akun ${u(t.nama)}">
                        ${Vs()}
                    </button>
                    <button class="admin-users-icon-button" type="button" data-admin-user-edit="${t.id}" data-testid="edit-admin-user-${t.id}" aria-label="Edit akun ${u(t.nama)}" ${t.can_edit?"":"disabled"}>
                        ${Gs()}
                    </button>
                    <button class="admin-users-icon-button admin-users-icon-button-danger" type="button" data-admin-user-delete="${t.id}" data-admin-user-name="${u(t.nama)}" data-testid="delete-admin-user-${t.id}" aria-label="Hapus akun ${u(t.nama)}" ${t.can_delete?"":"disabled"}>
                        ${Js()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function Ft(){const e=document.getElementById("admin-users-pagination-shell"),t=document.getElementById("admin-users-pagination-info"),n=document.getElementById("admin-users-pagination-page"),a=document.getElementById("admin-users-prev-page-btn"),r=document.getElementById("admin-users-next-page-btn"),o=Math.max(1,Math.ceil(_.totalCount/Fe));e&&(e.hidden=o<=1),t&&(t.textContent=ye(_.page,Fe,_.totalCount,_.data.length)),n&&(n.textContent=`${_.page} / ${o}`),a&&(a.disabled=_.page===1),r&&(r.disabled=_.page>=o)}async function Ie(){_.loading=!0,Qn(),Ft();try{const e=_.search?`?search=${encodeURIComponent(_.search)}`:"",t=`?page=${_.page}&limit=${Fe}${_.search?`&search=${encodeURIComponent(_.search)}`:""}`,[n,a]=await Promise.all([y(`/admin-users${t}`),y(`/admin-users/count${e}`)]);_.data=Array.isArray(n)?n:[],_.totalCount=Number(a.count||0)}finally{_.loading=!1,Qn(),Ft()}}function Fa(e="User"){const t=document.getElementById("admin-user-role");if(!t)return;const n=Ks(),a=n.includes(e)?e:n[0];t.innerHTML=n.map(r=>`
        <option value="${u(r)}" ${r===a?"selected":""}>${u(r)}</option>
    `).join("")}function Va(e){const t=document.getElementById("admin-user-password"),n=document.getElementById("admin-user-password-note");t&&(t.required=!e,t.placeholder=e?"Kosongkan jika tidak ingin mengubah password":"Masukkan password",t.value=""),n&&(n.textContent=e?"Kosongkan password jika tidak ingin mengubah password akun ini.":"Password minimal 6 karakter dan akan disimpan dalam bentuk terenkripsi.")}function Rt(e="User"){const t=document.getElementById("admin-user-form"),n=document.getElementById("admin-user-form-title"),a=document.getElementById("admin-user-form-description"),r=document.getElementById("admin-user-id");t?.reset(),r&&(r.value=""),Fa(e),Va(!1),n&&(n.textContent=e==="Admin"?"Tambah Admin Baru":"Tambah User Baru"),a&&(a.textContent=e==="Admin"?"Lengkapi data akun untuk menambahkan admin baru":"Lengkapi data akun untuk menambahkan user baru"),_.defaultRole=e,_.editItem=null,kt(!1)}function Xs(e){_.editItem=e,document.getElementById("admin-user-id").value=e.id,document.getElementById("admin-user-nama").value=e.nama,document.getElementById("admin-user-username").value=e.username,document.getElementById("admin-user-email").value=e.email,Fa(e.role),Va(!0),document.getElementById("admin-user-form-title").textContent="Edit Akun",document.getElementById("admin-user-form-description").textContent="Perbarui informasi akun admin atau user di bawah ini",kt(!1)}function Zs(e){const t=document.getElementById("admin-user-detail-list");t&&(t.innerHTML=`
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
            <strong>${u(Zo(e.created_at))}</strong>
        </div>
    `)}async function Qs(e){Zs(await y(`/admin-users/${e}`)),j("admin-user-show-modal")}async function Ys(e){Xs(await y(`/admin-users/${e}`)),j("admin-user-form-modal")}function ei(e){_.deleteItem=e,document.getElementById("admin-user-delete-copy").innerHTML=`Apakah Anda yakin ingin menghapus akun <strong>${u(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`,j("admin-user-delete-modal")}function Yn(){const e=document.getElementById("admin-users-access-note"),t=document.getElementById("admin-users-search-input"),n=document.querySelector(".admin-users-page-actions");e&&(e.hidden=!1,e.textContent="Halaman ini hanya dapat diakses oleh Admin atau Super Admin."),t&&(t.disabled=!0),n&&(n.hidden=!0),_.loading=!1,_.data=[],_.totalCount=0,Ha("Anda tidak memiliki akses untuk mengelola data admin dan user."),Ft()}function ti({user:e}={}){const t=document.getElementById("admin-users-add-admin-btn"),n=document.getElementById("admin-users-add-user-btn"),a=document.getElementById("admin-users-search-input"),r=document.getElementById("admin-user-form"),o=document.getElementById("admin-users-table-body"),s=document.getElementById("admin-user-delete-confirm-btn"),i=document.getElementById("admin-users-prev-page-btn"),c=document.getElementById("admin-users-next-page-btn");if(!(!t||!n||!r||!o)){if(_.currentUser=e||window.transitAuthUser||null,!Us(_.currentUser?.role)){Yn();return}return t.addEventListener("click",()=>{Rt("Admin"),j("admin-user-form-modal")}),n.addEventListener("click",()=>{Rt("User"),j("admin-user-form-modal")}),a?.addEventListener("input",he(async d=>{_.search=d.target.value.trim(),_.page=1;try{await Ie()}catch(l){h(l.message||"Gagal memuat data akun")}})),r.addEventListener("submit",async d=>{d.preventDefault();const l={nama:document.getElementById("admin-user-nama")?.value.trim()||"",username:document.getElementById("admin-user-username")?.value.trim()||"",email:document.getElementById("admin-user-email")?.value.trim()||"",password:document.getElementById("admin-user-password")?.value||"",role:document.getElementById("admin-user-role")?.value||"User"};kt(!0);try{_.editItem?(await y(`/admin-users/${_.editItem.id}`,{method:"PUT",body:l}),q("Akun berhasil diperbarui")):(await y("/admin-users",{method:"POST",body:l}),q(l.role==="Admin"?"Admin berhasil ditambahkan":"User berhasil ditambahkan")),z("admin-user-form-modal"),Rt(_.defaultRole),await Ie()}catch(k){h(k.message||"Silakan periksa kembali data yang diinput","Gagal menyimpan akun")}finally{kt(!1)}}),o.addEventListener("click",async d=>{const l=d.target.closest("[data-admin-user-show]"),k=d.target.closest("[data-admin-user-edit]"),v=d.target.closest("[data-admin-user-delete]");try{if(l){await Qs(l.dataset.adminUserShow);return}if(k){await Ys(k.dataset.adminUserEdit);return}v&&ei({id:v.dataset.adminUserDelete,nama:v.dataset.adminUserName})}catch(A){h(A.message||"Gagal memuat detail akun")}}),s?.addEventListener("click",async()=>{if(_.deleteItem)try{await y(`/admin-users/${_.deleteItem.id}`,{method:"DELETE"}),q("Akun berhasil dihapus"),z("admin-user-delete-modal"),(_.page-1)*Fe>=_.totalCount-1&&_.page>1&&(_.page-=1),_.deleteItem=null,await Ie()}catch(d){h(d.message||"Gagal menghapus akun")}}),i?.addEventListener("click",async()=>{if(!(_.page<=1)){_.page-=1;try{await Ie()}catch(d){h(d.message||"Gagal memuat data akun")}}}),c?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil(_.totalCount/Fe));if(!(_.page>=d)){_.page+=1;try{await Ie()}catch(l){h(l.message||"Gagal memuat data akun")}}}),Ie().catch(d=>{if(d.status===403){Yn();return}h(d.message||"Gagal memuat data akun")})}}const ea=[{value:"05:00",label:"Subuh",time:"05.00 WIB"},{value:"08:00",label:"Pagi",time:"08.00 WIB"},{value:"10:00",label:"Pagi",time:"10.00 WIB"},{value:"14:00",label:"Siang",time:"14.00 WIB"},{value:"16:00",label:"Sore",time:"16.00 WIB"},{value:"19:00",label:"Malam",time:"19.00 WIB"}],Ga=[[{code:"1A",label:"1A"},{code:"SOPIR",label:"SOPIR",isDriver:!0}],[{code:"2A",label:"2A"},{code:"3A",label:"3A"}],[{code:"4A",label:"4A"},{code:"5A",label:"5A"}]],ta=Ga.flat().filter(e=>!e.isDriver).length,f={currentUser:null,date:Xe(),direction:"from_pkb",bookings:[],loading:!1,drivers:[],mobils:[],formOptions:null,selectedSeats:[],passengerDraftMap:{},editItem:null,deleteItem:null,slotDriverMap:{},slotMobilMap:{},occupiedSeatsForForm:[],occupiedSeatsForPackageForm:[],slotExtraArmadas:{},currentFormArmadaIndex:1,_pendingChoiceArmada:1,_pendingChoiceTime:""};function Pt(e){const t=document.getElementById(e);if(!t)return null;try{return JSON.parse(t.textContent||"{}")}catch{return null}}function ni(e){return["Super Admin","Admin"].includes(e)}function ai(e){const t=e?"#dc2626":"#166534",n=e?"#991b1b":"#14532d";return`
        <svg viewBox="0 0 50 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="2" width="30" height="20" rx="8" fill="${t}" stroke="${n}" stroke-width="1.5"/>
            <rect x="5" y="18" width="40" height="28" rx="9" fill="${t}" stroke="${n}" stroke-width="1.5"/>
            <rect x="7" y="44" width="36" height="14" rx="7" fill="${t}" stroke="${n}" stroke-width="1.5" opacity="0.8"/>
            <rect x="2" y="22" width="5" height="18" rx="2.5" fill="${t}" opacity="0.6"/>
            <rect x="43" y="22" width="5" height="18" rx="2.5" fill="${t}" opacity="0.6"/>
        </svg>`}function ri(){return`
        <svg viewBox="0 0 50 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="25" cy="30" r="18" stroke="rgba(148,163,184,0.5)" stroke-width="2.5"/>
            <circle cx="25" cy="30" r="6" fill="rgba(148,163,184,0.4)"/>
            <line x1="25" y1="12" x2="25" y2="24" stroke="rgba(148,163,184,0.5)" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="7" y1="30" x2="19" y2="30" stroke="rgba(148,163,184,0.5)" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="31" y1="30" x2="43" y2="30" stroke="rgba(148,163,184,0.5)" stroke-width="2.5" stroke-linecap="round"/>
        </svg>`}function oi(){return'<svg viewBox="0 0 24 24" fill="none"><path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path><path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg>'}function si(){return'<svg viewBox="0 0 24 24" fill="none"><path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg>'}function na(){return'<svg viewBox="0 0 24 24" fill="none" style="width:12px;height:12px;flex-shrink:0;"><path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'}function ii(){return'<svg viewBox="0 0 24 24" fill="none" style="width:12px;height:12px;flex-shrink:0;"><rect x="2" y="7" width="15" height="10" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M17 10H20L22 13V17H17V10Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="6" cy="18" r="1.5" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="18" r="1.5" stroke="currentColor" stroke-width="1.5"/></svg>'}function di(){return'<svg viewBox="0 0 24 24" fill="none" style="width:12px;height:12px;flex-shrink:0;"><path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 2V8H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 13H16M8 17H13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'}function li(e){return`
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
                    ${Ga.map(n=>`<div class="bpg-seat-row">${n.map(r=>{if(r.isDriver)return`
                    <div class="bpg-seat-item bpg-seat-driver" title="Sopir / Pengemudi">
                        <div class="bpg-seat-icon">${ri()}</div>
                        <span class="bpg-seat-label">SOPIR</span>
                    </div>`;const o=e[r.code],s=!!o,i=s?"bpg-seat-occupied":"bpg-seat-available",c=s?u(o.nama_pemesanan||"-"):"";return`
                <div class="bpg-seat-item ${i}" title="${s?c:"Tersedia"}">
                    <div class="bpg-seat-icon">${ai(s)}</div>
                    <span class="bpg-seat-label">${r.label}</span>
                    ${s?`<span class="bpg-seat-name">${c}</span>`:""}
                </div>`}).join("")}</div>`).join("")}
                </div>
            </div>
        </div>`}function ci(e){if(e.length===0)return`
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
                data-departure-status="${u(d.value)}"
                data-booking-departure="${u(String(r.id))}">${u(d.label)}</button>`}).join("");return`
            <div class="bpg-passenger-item" data-booking-id="${u(String(r.id))}">
                <div class="bpg-passenger-item-row">
                    <div class="bpg-passenger-seats">
                        ${o.split(",").map(d=>`<span class="stock-value-badge stock-value-badge-blue">${u(d.trim())}</span>`).join("")}
                    </div>
                    <div class="bpg-passenger-info">
                        <span class="bpg-passenger-name">${u(r.nama_pemesanan||"-")}</span>
                        <span class="bpg-passenger-phone">${u(r.phone||"-")}</span>
                    </div>
                </div>
                <div class="bpg-passenger-item-actions-row">
                    <span class="${u(r.payment_status_badge_class||"stock-value-badge stock-value-badge-blue")} bpg-status-sm">${u(r.payment_status||"-")}</span>
                    <div class="bpg-depart-dropdown" data-depart-dropdown="${u(String(r.id))}">
                        <button class="bpg-depart-trigger ${i.cls}" type="button" data-depart-toggle="${u(String(r.id))}">
                            <svg viewBox="0 0 24 24" fill="none" style="width:11px;height:11px;flex-shrink:0;"><circle cx="12" cy="12" r="2.5" fill="currentColor"/><circle cx="12" cy="5" r="2" fill="currentColor"/><circle cx="12" cy="19" r="2" fill="currentColor"/></svg>
                            ${u(i.label)}
                            <svg viewBox="0 0 24 24" fill="none" style="width:10px;height:10px;flex-shrink:0;"><path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </button>
                        <div class="bpg-depart-menu" hidden>
                            ${c}
                        </div>
                    </div>
                    <div style="flex:1;"></div>
                    <button class="bpg-lihat-btn" type="button" data-booking-lihat="${u(String(r.id))}" aria-label="Lihat detail ${u(r.nama_pemesanan)}">
                        <svg viewBox="0 0 24 24" fill="none" style="width:13px;height:13px;"><path d="M2.5 12C4.4 8.2 8 6 12 6C16 6 19.6 8.2 21.5 12C19.6 15.8 16 18 12 18C8 18 4.4 15.8 2.5 12Z" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/></svg>
                        Lihat
                    </button>
                    <button class="admin-users-icon-button" type="button" data-booking-edit="${u(String(r.id))}" title="Edit pemesanan">
                        ${oi()}
                    </button>
                    <button class="admin-users-icon-button admin-users-icon-button-danger" type="button" data-booking-delete="${u(String(r.id))}" data-booking-name="${u(r.nama_pemesanan)}" title="Hapus pemesanan">
                        ${si()}
                    </button>
                </div>
            </div>`}).join("")}
        </div>`}function ui(e){const t={};return e.forEach(n=>{(Array.isArray(n.selected_seats)?n.selected_seats:[]).forEach(r=>{t[r]||(t[r]=n)})}),t}function mi(e,t,n,a){const r=ui(n),o=n.reduce((g,E)=>g+(Number(E.passenger_count)||0),0),s=o>=ta,i=`${e.value}__${f.direction}__${t}`;if(!f.slotDriverMap[i]){const g=n.find(E=>E.driver_id);g&&(f.slotDriverMap[i]=g.driver_id)}const c=f.slotDriverMap[i]||"",d=f.slotMobilMap[i]||"",l=s?"stock-value-badge-red":"stock-value-badge-yellow",k=f.drivers.map(g=>{const E=g.lokasi?`${g.nama} (${g.lokasi})`:g.nama;return`<option value="${u(g.id)}" ${c===g.id?"selected":""}>${u(E)}</option>`}).join(""),v=f.mobils.map(g=>{const E=`${g.kode_mobil} — ${g.jenis_mobil}`;return`<option value="${u(g.id)}" ${d===g.id?"selected":""}>${u(E)}</option>`}).join(""),A=[...new Set(n.map(g=>(g.service_type||"").trim()).filter(Boolean))],p=a>1?`<span class="bpg-armada-badge">${ii()} Armada ${t}</span>`:"",b=s?`<button class="bpg-add-armada-btn" type="button"
                data-add-armada="${u(e.value)}"
                data-armada-index="${t}"
                title="Tambah armada ke-${t+1} untuk jadwal ${u(e.time)}">
                ${na()}
                Tambah Armada
            </button>`:"";return`
        <article class="bpg-slot-card" data-slot="${u(e.value)}" data-direction="${u(f.direction)}" data-armada="${t}">
            <div class="bpg-slot-head">
                <div class="bpg-slot-head-row">
                    <div class="bpg-slot-time-badge">
                        <span class="bpg-slot-period">${u(e.label)}</span>
                        <strong class="bpg-slot-time">${u(e.time)}</strong>
                    </div>
                    <div class="bpg-slot-head-meta">
                        ${p}
                        <div class="bpg-slot-service-types">
                            ${A.length>0?A.map(g=>`<span class="bpg-service-badge">${u(g)}</span>`).join(""):'<span class="bpg-service-badge bpg-service-badge--empty">Belum ada layanan</span>'}
                        </div>
                        <span class="stock-value-badge ${l}">${o} / ${ta} Kursi</span>
                    </div>
                </div>
                ${b?`<div class="bpg-slot-head-row">${b}</div>`:""}
            </div>

            ${li(r)}

            <div class="bpg-slot-assignment">
                <div class="bpg-slot-select-group">
                    <label>
                        <svg viewBox="0 0 24 24" fill="none" style="width:13px;height:13px;"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/><path d="M4 20C4 17.2386 7.58172 15 12 15C16.4183 15 20 17.2386 20 20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
                        Pilih Driver
                    </label>
                    <select class="bpg-slot-select" data-slot-driver="${u(e.value)}__${t}">
                        <option value="">— Belum ditentukan —</option>
                        ${k}
                    </select>
                </div>
                <div class="bpg-slot-select-group">
                    <label>
                        <svg viewBox="0 0 24 24" fill="none" style="width:13px;height:13px;"><rect x="2" y="7" width="20" height="10" rx="3" stroke="currentColor" stroke-width="1.8"/><circle cx="6" cy="17" r="2" stroke="currentColor" stroke-width="1.8"/><circle cx="18" cy="17" r="2" stroke="currentColor" stroke-width="1.8"/></svg>
                        Pilih Mobil
                    </label>
                    <select class="bpg-slot-select" data-slot-mobil="${u(e.value)}__${t}">
                        <option value="">— Belum ditentukan —</option>
                        ${v}
                    </select>
                </div>
            </div>

            ${ci(n)}

            <button class="bpg-slot-book-btn" type="button"
                data-slot-book="${u(e.value)}"
                data-slot-armada="${t}"
                title="Tambah pemesanan untuk Armada ${t}, jadwal ${u(e.time)}">
                ${na()}
                Tambah Pemesanan Armada ${t}
            </button>
            <button class="bpg-surat-jalan-btn" type="button"
                data-surat-jalan="${u(e.value)}"
                data-surat-jalan-armada="${t}"
                title="Buat Surat Jalan Armada ${t}, jadwal ${u(e.time)}">
                ${di()}
                Surat Jalan
            </button>
        </article>`}function pi(e,t){const n={};t.forEach(c=>{const d=c.armada_index||1;n[d]||(n[d]=[]),n[d].push(c)});const a=`${e.value}__${f.direction}`,r=t.length>0?Math.max(...Object.keys(n).map(Number)):1,o=f.slotExtraArmadas[a]||1,s=Math.max(r,o),i=[];for(let c=1;c<=s;c++)i.push(mi(e,c,n[c]||[],s));return`<div class="bpg-slot-group" data-slot-group="${u(e.value)}">${i.join("")}</div>`}function gi(){const e=document.getElementById("bpg-slots-shell");e&&(e.innerHTML=`
            <div class="admin-users-loading-inline" style="padding:40px 0;">
                <span class="admin-users-loading-inline-spinner" aria-hidden="true"></span>
                <span>Memuat data penumpang...</span>
            </div>`)}function Ja(){const e=document.getElementById("bpg-slots-shell");if(!e)return;const t={};ea.forEach(a=>{t[a.value]=[]}),f.bookings.forEach(a=>{const o=(a.trip_time||"").trim().substring(0,5);t[o]&&t[o].push(a)});const n=ea.map(a=>pi(a,t[a.value]||[]));e.innerHTML=`<div class="bpg-slots-grid">${n.join("")}</div>`}async function $e(){f.loading=!0,gi();try{const e=new URLSearchParams({date:f.date,direction:f.direction,limit:200,page:1}),[t,n]=await Promise.all([y(`/bookings?${e}`),y(`/bookings/armada-extras?date=${f.date}`).catch(()=>({}))]);f.bookings=Array.isArray(t)?t:[],n&&typeof n=="object"&&Object.entries(n).forEach(([a,r])=>{const o=`${a}__${f.direction}`;f.slotExtraArmadas[o]=Math.max(f.slotExtraArmadas[o]||1,Number(r)||1)})}catch(e){f.bookings=[],e.status!==403&&h(e.message||"Gagal memuat data penumpang")}finally{f.loading=!1,Ja()}}function fi(e){document.getElementById("bpg-detail-title").textContent=e.nama_pemesanan||"-",document.getElementById("bpg-detail-subtitle").textContent=`${e.booking_code||"-"} · ${e.booking_status||"-"}`,document.getElementById("bpg-detail-full-link").href=`/dashboard/bookings/${e.id}`;const t=e.category==="Paket",n=document.getElementById("bpg-detail-ticket-link"),a=document.getElementById("bpg-detail-surat-link");t?(n.hidden=!0,a.hidden=!1,a.href=`/dashboard/bookings/${e.id}/surat-bukti`):(n.hidden=!1,n.href=`/dashboard/bookings/${e.id}/ticket`,a.hidden=!0);const r=document.getElementById("bpg-detail-body");r.innerHTML=`
        <div class="bpg-detail-grid">
            <div class="bpg-detail-item">
                <span>Nama Pemesanan</span>
                <strong>${u(e.nama_pemesanan||"-")}</strong>
            </div>
            <div class="bpg-detail-item">
                <span>No HP</span>
                <strong>${u(e.phone||"-")}</strong>
            </div>
            <div class="bpg-detail-item">
                <span>Kota Asal</span>
                <strong>${u(e.from_city||"-")}</strong>
            </div>
            <div class="bpg-detail-item">
                <span>Kota Tujuan</span>
                <strong>${u(e.to_city||"-")}</strong>
            </div>
            <div class="bpg-detail-item">
                <span>Tanggal Keberangkatan</span>
                <strong>${u(e.trip_date_label||"-")}</strong>
            </div>
            <div class="bpg-detail-item">
                <span>Waktu Keberangkatan</span>
                <strong>${u(e.trip_time||"-")}</strong>
            </div>
            <div class="bpg-detail-item">
                <span>Pilih Kursi</span>
                <strong>${u(e.selected_seats_label||"-")}</strong>
            </div>
            <div class="bpg-detail-item">
                <span>Jumlah Penumpang</span>
                <strong>${u(String(e.passenger_count||0))} Orang</strong>
            </div>
            <div class="bpg-detail-item">
                <span>Jenis Layanan</span>
                <strong>${u(e.service_type||"-")}</strong>
            </div>
            <div class="bpg-detail-item">
                <span>Armada</span>
                <strong>Armada ${u(String(e.armada_index||1))}</strong>
            </div>
            <div class="bpg-detail-item">
                <span>Biaya</span>
                <strong class="bpg-detail-price">${u(e.total_amount_formatted||"-")}</strong>
            </div>
            <div class="bpg-detail-item bpg-detail-item--full">
                <span>Alamat Penjemputan</span>
                <p>${u(e.pickup_location||"-")}</p>
            </div>
            <div class="bpg-detail-item bpg-detail-item--full">
                <span>Alamat Pengantaran</span>
                <p>${u(e.dropoff_location||"-")}</p>
            </div>
        </div>`,j("bpg-detail-modal")}function bi(){return(f.formOptions?.seat_options||[]).map(e=>e.code)}function dn(e){const t=new Map(bi().map((n,a)=>[n,a]));return Array.from(new Set((e||[]).map(n=>String(n).trim()).filter(n=>t.has(n)))).sort((n,a)=>(t.get(n)??999)-(t.get(a)??999))}function St(){return Number(document.getElementById("booking-passenger-count")?.value||0)}function ki(){const e=St();return(f.formOptions?.seat_options||[]).filter(t=>!t.is_optional||e>=6).map(t=>t.code)}function hi(){return f.formOptions?.payment_status_options||[]}function yi(e){return e==="transfer"?["Belum Bayar","Menunggu Pembayaran","Menunggu Verifikasi","Dibayar"]:e==="qris"?["Belum Bayar","Menunggu Pembayaran","Dibayar"]:e==="cash"?["Belum Bayar","Dibayar Tunai"]:["Belum Bayar"]}function vi(e){return e==="transfer"?"Menunggu Pembayaran":e==="qris"?"Dibayar":e==="cash"?"Dibayar Tunai":"Belum Bayar"}function Ei(e){return e==="transfer"?"Menunggu Verifikasi Pembayaran":e==="qris"||e==="cash"?"Diproses":"Draft"}function wi(e,t){if(!e||!t||e===t)return null;const a=(f.formOptions?.route_matrix||{})?.[e]?.[t];return a==null?null:Number(a)}function Ka(){return Math.max(0,parseInt(document.getElementById("booking-additional-fare")?.value||"0",10)||0)}function _e(){const e=document.getElementById("booking-from-city")?.value||"",t=document.getElementById("booking-to-city")?.value||"",n=St(),a=wi(e,t),r=Ka(),o=a!==null?a+r:null,s=o!==null?o*n:null,i=document.getElementById("booking-price-per-seat"),c=document.getElementById("booking-total-amount");i&&(i.value=a!==null?H(a):""),c&&(c.value=s!==null?H(s):"")}function ln(){const e=document.getElementById("booking-payment-method")?.value||"",t=document.getElementById("booking-payment-status"),n=document.getElementById("booking-booking-status"),a=document.getElementById("booking-bank-account-group"),r=document.getElementById("booking-bank-account-code"),o=yi(e),s=t?.value||"";a&&(a.hidden=e!=="transfer"),r&&e!=="transfer"&&(r.value=""),t&&(t.innerHTML=hi().filter(i=>o.includes(i.value)).map(i=>`<option value="${u(i.value)}">${u(i.label)}</option>`).join(""),t.value=o.includes(s)?s:vi(e)),n&&(n.value=Ei(e))}function Bi(){const e=document.getElementById("booking-selected-seats-inputs");e&&(e.innerHTML=f.selectedSeats.map(t=>`<input type="hidden" name="selected_seats[]" value="${u(t)}">`).join(""))}function Ii(){const e=document.getElementById("booking-selected-seat-count"),t=document.getElementById("booking-selected-seat-label");e&&(e.textContent=String(f.selectedSeats.length)),t&&(t.textContent=f.selectedSeats.length>0?f.selectedSeats.join(", "):"Belum dipilih")}function Vt(){document.querySelectorAll("[data-passenger-seat]").forEach(e=>{const t=e.dataset.passengerSeat;t&&(f.passengerDraftMap[t]={seat_no:t,name:e.querySelector("[data-passenger-name]")?.value.trim()||"",phone:e.querySelector("[data-passenger-phone]")?.value.trim()||""})})}function le(e=null){const t=document.getElementById("booking-passenger-editor");if(t){if(e&&(f.passengerDraftMap=Object.fromEntries(e.map(n=>[n.seat_no,n]))),f.selectedSeats.length===0){t.innerHTML='<div class="dashboard-empty-state dashboard-empty-state--block bookings-passenger-empty">Pilih kursi terlebih dahulu untuk menampilkan form data penumpang.</div>';return}t.innerHTML=`
        <div class="bookings-passenger-grid bookings-passenger-grid--editor">
            ${f.selectedSeats.map((n,a)=>{const r=f.passengerDraftMap[n]||{name:"",phone:""};return`
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
                                    <input type="text" value="${u(r.name||"")}" placeholder="Masukkan nama penumpang" data-passenger-name>
                                </div>
                            </div>
                            <div class="admin-users-form-group">
                                <label>No HP</label>
                                <div class="admin-users-input-shell">
                                    <input type="text" value="${u(r.phone||"")}" placeholder="08xxxxxxxxxx" data-passenger-phone>
                                </div>
                            </div>
                        </div>
                    </article>`}).join("")}
        </div>`}}async function Ce(){const e=document.getElementById("booking-trip-date")?.value||"",t=document.getElementById("booking-trip-time")?.value||"",n=document.getElementById("booking-from-city")?.value||"",a=document.getElementById("booking-to-city")?.value||"",r=f.editItem?.id||"",o=f.currentFormArmadaIndex||1;if(!e||!t){f.occupiedSeatsForForm=[];return}try{const s=new URLSearchParams({trip_date:e,trip_time:t,armada_index:o});n&&s.set("from_city",n),a&&s.set("to_city",a),r&&s.set("exclude_id",r);const i=await y(`/bookings/occupied-seats?${s}`);f.occupiedSeatsForForm=Array.isArray(i?.occupied_seats)?i.occupied_seats:[]}catch{f.occupiedSeatsForForm=[]}}async function je(){const e=document.getElementById("pkg-trip-date")?.value||"",t=document.getElementById("pkg-trip-time")?.value||"",n=document.getElementById("pkg-from-city")?.value||"",a=document.getElementById("pkg-to-city")?.value||"",r=parseInt(document.getElementById("package-armada-index")?.value||"1",10);if(!e||!t){f.occupiedSeatsForPackageForm=[],aa();return}try{const o=new URLSearchParams({trip_date:e,trip_time:t,armada_index:r});n&&o.set("from_city",n),a&&o.set("to_city",a);const s=await y(`/bookings/occupied-seats?${o}`);f.occupiedSeatsForPackageForm=Array.isArray(s?.occupied_seats)?s.occupied_seats:[]}catch{f.occupiedSeatsForPackageForm=[]}aa()}function aa(){const e=document.getElementById("pkg-seat-code");if(!e)return;const t=(f.formOptions?.seat_options||[]).filter(r=>!r.is_optional),n=f.occupiedSeatsForPackageForm||[],a=e.value;e.innerHTML='<option value="">Pilih kursi</option>'+t.map(r=>{const o=n.includes(r.code);return`<option value="${u(r.code)}"${o?" disabled":""}>${u(r.label)}${o?" — Sudah dipesan":""}</option>`}).join(""),a&&!n.includes(a)&&(e.value=a)}function ce(){const e=document.querySelectorAll("[data-seat-code]"),t=St(),n=ki();f.selectedSeats=dn(f.selectedSeats.filter(a=>n.includes(a)&&!f.occupiedSeatsForForm.includes(a))),e.forEach(a=>{const r=a.dataset.seatCode,o=n.includes(r),s=f.occupiedSeatsForForm.includes(r),i=f.selectedSeats.includes(r),c=f.selectedSeats.length>=t&&!i;a.hidden=!o,a.classList.toggle("is-selected",i),a.classList.toggle("is-occupied",s),a.classList.toggle("is-disabled",!s&&c),a.disabled=!o||s||!i&&c,s?a.title="Kursi sudah dipesan":a.title=""}),Bi(),Ii()}function Dt(e=1,t=""){document.getElementById("booking-form")?.reset(),f.editItem=null,f.selectedSeats=[],f.passengerDraftMap={},f.currentFormArmadaIndex=e;const a=f.date||Xe();document.getElementById("booking-id").value="",document.getElementById("booking-armada-index").value=String(e),document.getElementById("booking-form-title").textContent="Tambah Pemesanan";const r=e>1?` (Armada ${e})`:"";document.getElementById("booking-form-description").textContent=`Lengkapi data pemesanan reguler dari dashboard admin${r}.`,document.getElementById("booking-trip-date").value=a,t&&(document.getElementById("booking-trip-time").value=t),document.getElementById("booking-passenger-count").value="1",document.getElementById("booking-additional-fare").value="0",document.getElementById("booking-payment-method").value="",document.getElementById("booking-booking-status").value="Draft",ln(),_e(),se(document.getElementById("booking-submit-btn"),!1,"Menyimpan..."),Ce().then(()=>{ce(),le()})}function $i(e){f.editItem=e,f.selectedSeats=dn(e.selected_seats||[]),f.passengerDraftMap=Object.fromEntries((e.passengers||[]).map(n=>[n.seat_no,n])),f.currentFormArmadaIndex=e.armada_index||1,document.getElementById("booking-id").value=e.id,document.getElementById("booking-armada-index").value=String(e.armada_index||1),document.getElementById("booking-booking-for").value=e.booking_for,document.getElementById("booking-category").value=e.category,document.getElementById("booking-from-city").value=e.from_city,document.getElementById("booking-to-city").value=e.to_city,document.getElementById("booking-trip-date").value=e.trip_date_value,document.getElementById("booking-trip-time").value=e.trip_time_value,document.getElementById("booking-passenger-count").value=String(e.passenger_count),document.getElementById("booking-driver-name").value=e.driver_name==="Menunggu Penetapan Driver"?"":e.driver_name||"",document.getElementById("booking-additional-fare").value=String(e.additional_fare_per_passenger||0),document.getElementById("booking-pickup-location").value=e.pickup_location,document.getElementById("booking-dropoff-location").value=e.dropoff_location,document.getElementById("booking-payment-method").value=e.payment_method_value||"",ln(),document.getElementById("booking-payment-status").value=e.payment_status,document.getElementById("booking-booking-status").value=e.booking_status,document.getElementById("booking-bank-account-code").value=e.bank_account_code||"",document.getElementById("booking-notes").value=e.notes||"";const t=(e.armada_index||1)>1?` (Armada ${e.armada_index})`:"";document.getElementById("booking-form-title").textContent="Edit Pemesanan",document.getElementById("booking-form-description").textContent=`Perbarui data pemesanan reguler yang dipilih${t}.`,_e(),se(document.getElementById("booking-submit-btn"),!1,"Menyimpan..."),Ce().then(()=>{ce(),le(e.passengers||[])})}function Si(){return Vt(),{booking_for:document.getElementById("booking-booking-for")?.value||"",category:document.getElementById("booking-category")?.value||"Reguler",from_city:document.getElementById("booking-from-city")?.value||"",to_city:document.getElementById("booking-to-city")?.value||"",trip_date:document.getElementById("booking-trip-date")?.value||"",trip_time:document.getElementById("booking-trip-time")?.value||"",passenger_count:Number(document.getElementById("booking-passenger-count")?.value||0),driver_name:document.getElementById("booking-driver-name")?.value.trim()||"",additional_fare_per_passenger:Ka(),pickup_location:document.getElementById("booking-pickup-location")?.value.trim()||"",dropoff_location:document.getElementById("booking-dropoff-location")?.value.trim()||"",selected_seats:f.selectedSeats,passengers:f.selectedSeats.map(e=>({seat_no:e,name:f.passengerDraftMap?.[e]?.name||"",phone:f.passengerDraftMap?.[e]?.phone||""})),payment_method:document.getElementById("booking-payment-method")?.value||"",payment_status:document.getElementById("booking-payment-status")?.value||"Belum Bayar",booking_status:document.getElementById("booking-booking-status")?.value||"Draft",bank_account_code:document.getElementById("booking-bank-account-code")?.value||"",notes:document.getElementById("booking-notes")?.value.trim()||"",armada_index:f.currentFormArmadaIndex||1}}async function _i(e){$i(await y(`/bookings/${e}`)),j("booking-form-modal")}function Ci(e){f.deleteItem=e,document.getElementById("booking-delete-copy").innerHTML=`Apakah Anda yakin ingin menghapus data pemesanan <strong>${u(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`,j("booking-delete-modal")}function ra(){const e=document.getElementById("bookings-access-note"),t=document.getElementById("bpg-route-tabs"),n=document.getElementById("bpg-slots-shell");e&&(e.hidden=!1),t&&(t.hidden=!0),n&&(n.hidden=!0)}function xi(e){return e==="Berangkat"?{label:"Berangkat",cls:"bpg-depart-trigger--go"}:e==="Tidak Berangkat"?{label:"Tidak Berangkat",cls:"bpg-depart-trigger--no"}:e==="Di Oper"?{label:"Di Oper",cls:"bpg-depart-trigger--oper"}:{label:"Status",cls:""}}function Li({user:e}={}){const t=document.getElementById("bookings-add-btn"),n=document.getElementById("bookings-date-picker"),a=document.getElementById("bpg-route-tabs"),r=document.getElementById("bpg-slots-shell"),o=document.getElementById("booking-form"),s=document.getElementById("booking-delete-confirm-btn"),i=document.getElementById("booking-seat-grid"),c=document.getElementById("booking-passenger-editor"),d=document.getElementById("booking-payment-method");if(f.formOptions=Pt("bookings-form-options"),f.drivers=Pt("bookings-drivers-data")||[],f.mobils=Pt("bookings-mobils-data")||[],f.currentUser=e||window.transitAuthUser||null,f.date=Xe(),!ni(f.currentUser?.role)){ra();return}r&&(r.hidden=!1);const l=document.getElementById("bookings-access-note");l&&(l.hidden=!0),n&&(n.value=f.date,n.addEventListener("change",async()=>{f.date=n.value,f.slotDriverMap={},f.slotMobilMap={},f.slotExtraArmadas={},await $e()})),a?.addEventListener("click",async p=>{const b=p.target.closest("[data-direction]");if(!b)return;const g=b.dataset.direction;g!==f.direction&&(f.direction=g,f.slotDriverMap={},f.slotMobilMap={},f.slotExtraArmadas={},document.querySelectorAll(".bpg-route-tab").forEach(E=>{E.classList.toggle("is-active",E.dataset.direction===g)}),await $e())});function k(p=null){r?.querySelectorAll("[data-depart-dropdown]").forEach(b=>{String(b.dataset.departDropdown)!==String(p)&&(b.querySelector(".bpg-depart-menu")?.removeAttribute("hidden"),b.querySelector(".bpg-depart-menu")?.setAttribute("hidden",""))})}document.addEventListener("click",p=>{p.target.closest("[data-depart-dropdown]")||k()}),r?.addEventListener("click",async p=>{const b=p.target.closest("[data-depart-toggle]"),g=p.target.closest("[data-booking-departure]"),E=p.target.closest("[data-booking-lihat]"),P=p.target.closest("[data-booking-edit]"),L=p.target.closest("[data-booking-delete]"),R=p.target.closest("[data-add-armada]"),D=p.target.closest("[data-slot-book]"),G=p.target.closest("[data-surat-jalan]");try{if(b){const M=b.dataset.departToggle,J=r.querySelector(`[data-depart-dropdown="${CSS.escape(M)}"]`)?.querySelector(".bpg-depart-menu");if(!J)return;const W=J.hasAttribute("hidden");k(M),J.toggleAttribute("hidden",!W);return}if(g){const M=g.dataset.bookingDeparture,F=g.dataset.departureStatus,J=f.bookings.find(S=>String(S.id)===String(M));if(!J)return;const W=J.departure_status===F?"":F;J.departure_status=W;const X=r.querySelector(`[data-depart-dropdown="${CSS.escape(M)}"]`);if(X){const S=X.querySelector(".bpg-depart-trigger"),N=xi(W);S.className=`bpg-depart-trigger ${N.cls}`,S.childNodes.forEach(V=>{V.nodeType===3&&(V.textContent=N.label)}),X.querySelectorAll("[data-booking-departure]").forEach(V=>{V.classList.toggle("is-active",V.dataset.departureStatus===W)}),X.querySelector(".bpg-depart-menu")?.setAttribute("hidden","")}await y(`/bookings/${M}/departure-status`,{method:"PATCH",body:{departure_status:W}});return}if(E){const M=E.dataset.bookingLihat,F=f.bookings.find(J=>String(J.id)===String(M));F&&fi(F);return}if(P){await _i(P.dataset.bookingEdit);return}if(L){Ci({id:L.dataset.bookingDelete,nama:L.dataset.bookingName});return}if(R){const M=R.dataset.addArmada,J=parseInt(R.dataset.armadaIndex||"1")+1,W=`${M}__${f.direction}`;f.slotExtraArmadas[W]=Math.max(f.slotExtraArmadas[W]||1,J),y("/bookings/armada-extras",{method:"POST",body:{trip_date:f.date,trip_time:M,armada_index:J}}).catch(()=>{}),Ja(),f._pendingChoiceArmada=J,f._pendingChoiceTime=M,j("booking-type-choice-modal");return}if(D){const M=D.dataset.slotBook,F=parseInt(D.dataset.slotArmada||"1");f._pendingChoiceArmada=F,f._pendingChoiceTime=M,j("booking-type-choice-modal");return}if(G){const M=G.dataset.suratJalan,F=parseInt(G.dataset.suratJalanArmada||"1"),J=`${M}__${f.direction}__${F}`,W=f.slotDriverMap[J]||"",X=f.slotMobilMap[J]||"",S=W?f.drivers.find(oe=>String(oe.id)===String(W)):null,N=X?f.mobils.find(oe=>String(oe.id)===String(X)):null,V=new URLSearchParams({date:f.date,trip_time:M,armada_index:String(F),direction:f.direction});S&&V.set("driver_name",S.nama),N&&V.set("no_pol",N.kode_mobil),window.open(`/dashboard/bookings/surat-jalan?${V}`,"_blank");return}}catch(M){h(M.message||"Gagal memuat data pemesanan")}}),r?.addEventListener("change",async p=>{const b=p.target.closest("[data-slot-driver]"),g=p.target.closest("[data-slot-mobil]");if(b){const[E,P]=b.dataset.slotDriver.split("__"),L=parseInt(P||"1"),R=b.value,D=b.options[b.selectedIndex],G=R&&D?.text.split(" (")[0]||"",M=`${E}__${f.direction}__${L}`;f.slotDriverMap[M]=R;try{await y("/bookings/slot-assign",{method:"PATCH",body:{trip_date:f.date,trip_time:E,direction:f.direction,armada_index:L,driver_id:R||null,driver_name:G}}),q("Driver berhasil diperbarui")}catch(F){h(F.message||"Gagal memperbarui driver")}}if(g){const[E,P]=g.dataset.slotMobil.split("__"),L=parseInt(P||"1"),R=g.value,D=`${E}__${f.direction}__${L}`;f.slotMobilMap[D]=R}});function v(p=1,b=""){const g=document.getElementById("package-form");g&&g.reset();const E=document.getElementById("package-armada-index");E&&(E.value=String(p));const P=document.getElementById("pkg-trip-date");P&&(P.value=f.date);const L=document.getElementById("pkg-trip-time");L&&b&&(L.value=b);const R=document.getElementById("pkg-bank-account-group");R&&(R.hidden=!0);const D=document.getElementById("pkg-seat-group");D&&(D.hidden=!0);const G=document.getElementById("package-form-success-banner");G&&(G.hidden=!0),A(),je()}function A(){const p=parseInt(document.getElementById("pkg-fare-amount")?.value||"0",10)||0,b=parseInt(document.getElementById("pkg-additional-fare")?.value||"0",10)||0,g=parseInt(document.getElementById("pkg-item-qty")?.value||"1",10)||1,E=(p+b)*g,P=document.getElementById("pkg-total-display");P&&(P.value=E>0?"Rp "+E.toLocaleString("id-ID"):"")}return document.getElementById("pkg-fare-amount")?.addEventListener("input",A),document.getElementById("pkg-additional-fare")?.addEventListener("input",A),document.getElementById("pkg-item-qty")?.addEventListener("input",A),document.getElementById("pkg-payment-method")?.addEventListener("change",p=>{const b=document.getElementById("pkg-bank-account-group");b&&(b.hidden=p.target.value!=="transfer")}),document.getElementById("pkg-package-size")?.addEventListener("change",p=>{const b=document.getElementById("pkg-seat-group");b&&(b.hidden=p.target.value!=="Besar");const g=document.getElementById("pkg-seat-code");g&&p.target.value!=="Besar"&&(g.value="")}),document.getElementById("pkg-trip-date")?.addEventListener("change",()=>{je()}),document.getElementById("pkg-trip-time")?.addEventListener("change",()=>{je()}),document.getElementById("pkg-from-city")?.addEventListener("change",()=>{je()}),document.getElementById("pkg-to-city")?.addEventListener("change",()=>{je()}),document.getElementById("package-form")?.addEventListener("submit",async p=>{p.preventDefault();const b=document.getElementById("package-submit-btn");se(b,!0,"Menyimpan...");try{const g=parseInt(document.getElementById("pkg-fare-amount")?.value||"0",10)||0,E=parseInt(document.getElementById("pkg-additional-fare")?.value||"0",10)||0,P=parseInt(document.getElementById("pkg-item-qty")?.value||"1",10)||1,L=document.getElementById("pkg-payment-method")?.value||"",R={armada_index:parseInt(document.getElementById("package-armada-index")?.value||"1",10),trip_date:document.getElementById("pkg-trip-date")?.value||"",trip_time:document.getElementById("pkg-trip-time")?.value||"",from_city:document.getElementById("pkg-from-city")?.value||"",to_city:document.getElementById("pkg-to-city")?.value||"",sender_name:document.getElementById("pkg-sender-name")?.value.trim()||"",sender_phone:document.getElementById("pkg-sender-phone")?.value.trim()||"",sender_address:document.getElementById("pkg-sender-address")?.value.trim()||"",recipient_name:document.getElementById("pkg-recipient-name")?.value.trim()||"",recipient_phone:document.getElementById("pkg-recipient-phone")?.value.trim()||"",recipient_address:document.getElementById("pkg-recipient-address")?.value.trim()||"",item_name:document.getElementById("pkg-item-name")?.value.trim()||"",item_qty:P,package_size:document.getElementById("pkg-package-size")?.value||"",seat_code:document.getElementById("pkg-package-size")?.value==="Besar"&&document.getElementById("pkg-seat-code")?.value||"",fare_amount:g,additional_fare:E,payment_method:L||null,payment_status:document.getElementById("pkg-payment-status")?.value||"Belum Bayar",bank_account_code:L==="transfer"&&document.getElementById("pkg-bank-account-code")?.value||""},D=await y("/bookings/quick-package",{method:"POST",body:R}),G=document.getElementById("package-form-success-banner"),M=document.getElementById("package-form-booking-code"),F=document.getElementById("package-form-download-link");G&&(G.hidden=!1),M&&(M.textContent="Kode Booking: "+D.booking_code+(D.invoice_number&&D.invoice_number!=="-"?" | No. Surat: "+D.invoice_number:"")),F&&(F.href=D.invoice_download_url),q("Paket berhasil disimpan: "+D.booking_code),await $e()}catch(g){h(g.message||"Silakan periksa kembali data yang diinput","Gagal menyimpan paket")}finally{se(b,!1,"Menyimpan...")}}),document.getElementById("choice-passenger-btn")?.addEventListener("click",()=>{z("booking-type-choice-modal"),Dt(f._pendingChoiceArmada||1,f._pendingChoiceTime||""),j("booking-form-modal")}),document.getElementById("choice-package-btn")?.addEventListener("click",()=>{z("booking-type-choice-modal"),v(f._pendingChoiceArmada||1,f._pendingChoiceTime||""),j("package-form-modal")}),t?.addEventListener("click",()=>{f._pendingChoiceArmada=1,f._pendingChoiceTime="",j("booking-type-choice-modal")}),i?.addEventListener("click",p=>{const b=p.target.closest("[data-seat-code]");if(!b||b.disabled)return;Vt();const g=b.dataset.seatCode;f.selectedSeats.includes(g)?f.selectedSeats=f.selectedSeats.filter(E=>E!==g):f.selectedSeats.length<St()&&(f.selectedSeats=dn([...f.selectedSeats,g])),ce(),le()}),document.getElementById("booking-passenger-count")?.addEventListener("change",()=>{Vt(),ce(),le(),_e()}),document.getElementById("booking-additional-fare")?.addEventListener("input",_e),document.getElementById("booking-trip-date")?.addEventListener("change",()=>{Ce().then(()=>{ce(),le()})}),document.getElementById("booking-trip-time")?.addEventListener("change",()=>{Ce().then(()=>{ce(),le()})}),document.getElementById("booking-from-city")?.addEventListener("change",()=>{_e(),Ce().then(()=>{ce(),le()})}),document.getElementById("booking-to-city")?.addEventListener("change",()=>{_e(),Ce().then(()=>{ce(),le()})}),d?.addEventListener("change",ln),c?.addEventListener("input",p=>{const b=p.target.closest("[data-passenger-seat]");if(!b)return;const g=b.dataset.passengerSeat;f.passengerDraftMap[g]={seat_no:g,name:b.querySelector("[data-passenger-name]")?.value.trim()||"",phone:b.querySelector("[data-passenger-phone]")?.value.trim()||""}}),o?.addEventListener("submit",async p=>{p.preventDefault();const b=document.getElementById("booking-submit-btn");se(b,!0,"Menyimpan...");try{const g=Si();f.editItem?(await y(`/bookings/${f.editItem.id}`,{method:"PUT",body:g}),q("Data pemesanan berhasil diperbarui")):(await y("/bookings",{method:"POST",body:g}),q("Data pemesanan berhasil ditambahkan")),z("booking-form-modal"),Dt(),await $e()}catch(g){h(g.message||"Silakan periksa kembali data yang diinput","Gagal menyimpan data pemesanan")}finally{se(b,!1,"Menyimpan...")}}),s?.addEventListener("click",async()=>{if(f.deleteItem){se(s,!0,"Menghapus...");try{await y(`/bookings/${f.deleteItem.id}`,{method:"DELETE"}),q("Data pemesanan berhasil dihapus"),z("booking-delete-modal"),f.deleteItem=null,await $e()}catch(p){h(p.message||"Gagal menghapus data pemesanan")}finally{se(s,!1,"Menghapus...")}}}),Dt(),$e().catch(p=>{if(p.status===403){ra();return}h(p.message||"Gagal memuat data penumpang")})}function Ti(e){const t=document.getElementById(e);if(!t)return{};try{return JSON.parse(t.textContent||"{}")}catch{return{}}}function Ai(){const e=document.querySelector("[data-regular-booking-page]");if(!e)return;const t=Ti("regular-booking-route-matrix"),n=e.querySelector("[data-booking-origin]"),a=e.querySelector("[data-booking-destination]"),r=e.querySelector("[data-booking-schedule]"),o=e.querySelector("[data-booking-passengers]"),s=e.querySelector("[data-route-fare-input]"),i=e.querySelector("[data-additional-fare-input]"),c=e.querySelector("[data-estimated-total-input]"),d=e.querySelector("[data-route-feedback]"),l=e.querySelector("[data-route-feedback-title]"),k=e.querySelector("[data-route-feedback-text]"),v=e.querySelector("[data-booking-submit]"),A=Array.from(e.querySelectorAll("[data-booking-type]")),p=e.querySelector("[data-summary-booking-for]"),b=e.querySelector("[data-summary-route]"),g=e.querySelector("[data-summary-schedule]"),E=e.querySelector("[data-summary-passengers]"),P=e.querySelector("[data-summary-fare]"),L=e.querySelector("[data-summary-additional-fare]"),R=e.querySelector("[data-summary-total]"),D=new Map(A.map(S=>[S.value,S.dataset.label||S.value])),G=new Map(Array.from(r?.options||[]).filter(S=>S.value).map(S=>[S.value,S.textContent.trim()]));function M(S,N){if(!S||!N||S===N)return null;const V=t?.[S]?.[N];return V==null?null:Number(V)}function F(S,N,V){!d||!l||!k||(d.dataset.state=S,l.textContent=N,k.textContent=V)}function J(){e.querySelectorAll(".regular-booking-radio").forEach(S=>{const N=S.querySelector('input[type="radio"]');S.classList.toggle("is-selected",!!N?.checked)})}function W(S){return S<=0?"Belum dipilih":S===6?"6 Penumpang (Opsional tambahan)":`${S} Penumpang`}function X(){const S=n?.value||"",N=a?.value||"",V=r?.value||"",oe=Number(o?.value||0),Z=A.find(_t=>_t.checked)?.value||"",ae=M(S,N),te=Math.max(parseInt(i?.value||"0",10)||0,0),me=ae!==null&&oe>0?(ae+te)*oe:null;s&&(s.value=ae!==null?H(ae):""),c&&(c.value=me!==null?H(me):""),!S||!N?F("idle","Tarif akan ditampilkan otomatis","Pilih asal dan tujuan untuk melihat tarif perjalanan reguler."):S===N?F("error","Asal dan tujuan tidak boleh sama","Silakan pilih tujuan yang berbeda agar tarif dapat dihitung."):ae===null?F("error","Rute belum tersedia","Rute yang Anda pilih saat ini belum tersedia. Silakan pilih kombinasi asal dan tujuan lain."):F("ready","Rute tersedia","Tarif telah diisi otomatis berdasarkan kombinasi rute dua arah yang tersedia."),v&&(v.disabled=!!(S&&N&&(S===N||ae===null))),p&&(p.textContent=D.get(Z)||"Belum dipilih"),b&&(b.textContent=S&&N?`${S} - ${N}`:"Belum dipilih"),g&&(g.textContent=G.get(V)||"Belum dipilih"),E&&(E.textContent=W(oe)),P&&(P.textContent=ae!==null?H(ae):"Belum tersedia"),L&&(L.textContent=te>0?H(te):"Tidak ada"),R&&(R.textContent=me!==null?H(me):"Belum tersedia"),J()}[n,a,r,o].forEach(S=>{S?.addEventListener("change",X)}),i?.addEventListener("input",X),A.forEach(S=>{S.addEventListener("change",X)}),e.querySelector("form")?.addEventListener("reset",()=>{window.requestAnimationFrame(X)}),X()}function Mi(){const e=document.querySelector("[data-regular-booking-seat-page]");if(!e)return;const t=Number(e.dataset.requiredSeatCount||0),n=Array.from(e.querySelectorAll("[data-seat-card]")),a=Array.from(e.querySelectorAll("[data-seat-input]")),r=e.querySelector("[data-seat-summary-count]"),o=e.querySelector("[data-seat-summary-list]"),s=e.querySelector("[data-seat-summary-remaining]"),i=e.querySelector("[data-seat-submit]"),c=e.querySelector("[data-seat-feedback]"),d=e.querySelector("[data-seat-feedback-title]"),l=e.querySelector("[data-seat-feedback-text]");function k(){return a.filter(b=>b.checked).map(b=>b.value)}function v(b){return b.length>0?b.join(", "):"Belum dipilih"}function A(b,g,E){!c||!d||!l||(c.dataset.state=b,d.textContent=g,l.textContent=E)}function p(){const b=k(),g=b.length,E=t>0&&g>=t;if(n.forEach(P=>{const L=P.querySelector("[data-seat-input]");if(!L)return;const R=L.disabled&&!L.checked&&P.classList.contains("is-occupied"),D=L.checked,G=R||E&&!D;R||(L.disabled=G),P.classList.toggle("is-selected",D),P.classList.toggle("is-disabled",!R&&G)}),r&&(r.textContent=`${g} dari ${t}`),o&&(o.textContent=v(b)),s&&(s.textContent=String(Math.max(t-g,0))),i&&(i.disabled=g!==t),g===0){A("idle","Pilih kursi sesuai jumlah penumpang","Jumlah kursi yang dipilih harus sama dengan jumlah penumpang pada booking draft.");return}if(g<t){A("idle","Pemilihan kursi belum lengkap",`Masih perlu memilih ${t-g} kursi lagi sebelum dapat melanjutkan.`);return}if(t===6){A("ready","Semua kursi sudah terisi","Jumlah penumpang 6 orang sudah terpenuhi dan kursi tambahan 2B ikut terpakai.");return}A("ready","Kursi sudah sesuai","Jumlah kursi yang dipilih sudah sesuai dengan jumlah penumpang dan siap disimpan.")}a.forEach(b=>{b.addEventListener("change",()=>{p()})}),p()}let qe=null,ht=!1,oa="",Ri=3e3,sa=0;const yt=[],C=e=>document.getElementById(e);async function za(e){const t=e.trim();if(!t)return;const n=Date.now();if(!(t===oa&&n-sa<Ri)){oa=t,sa=n,xe("Memproses scan…");try{const a=await y("/scan-qr",{method:"POST",body:{qr_token:t}});Pi(a),Oi(a),a.already_scanned?h(a.message,"Tiket Sudah Pernah Di-Scan"):a.is_newly_eligible?q(a.message,"🎉 Eligible Diskon!"):q(a.message,"Scan Berhasil")}catch(a){Di(a.message||"Scan gagal"),h(a.message||"Scan gagal","Scan Gagal")}finally{xe(ht?"Kamera aktif — arahkan ke QR code.":"")}}}function Pi(e){C("qrscan-result-idle").hidden=!0,C("qrscan-result-card").hidden=!1;const t=e.booking||{},n=e.passenger||{},a=e.loyalty_count,r=e.loyalty_target,o=e.discount_eligible,s=Math.min(Math.round(a/r*100),100),i=e.already_scanned?"warn":e.success?"success":"error";C("qrscan-result-header").className="qrscan-result-header qrscan-result-header--"+i,C("qrscan-result-icon").innerHTML=e.already_scanned?Ui():e.success?Ni():Xa(),C("qrscan-result-title").textContent=t.booking_code||"-",C("qrscan-result-subtitle").textContent=e.message,C("qr-res-name").textContent=n.name||t.nama_pemesanan||"-",C("qr-res-code").textContent=t.booking_code||"-",C("qr-res-route").textContent=t.route_label||"-",C("qr-res-datetime").textContent=(t.trip_date||"-")+" "+(t.trip_time||""),C("qr-res-seats").textContent=n.seat_no||t.selected_seats||"-",C("qr-res-pax").textContent=(t.passenger_count||0)+" Orang",C("qr-res-loyalty-label").textContent=a+" / "+r,C("qr-res-loyalty-fill").style.width=s+"%",C("qr-res-loyalty-fill").className="qrscan-loyalty-fill"+(o?" qrscan-loyalty-fill--done":""),C("qr-res-loyalty-note").textContent=o?"✅ Eligible diskon "+(e.discount_percentage||50)+"%":"Perlu "+Math.max(r-a,0)+" perjalanan lagi untuk diskon."}function Di(e){C("qrscan-result-idle").hidden=!0,C("qrscan-result-card").hidden=!1,C("qrscan-result-header").className="qrscan-result-header qrscan-result-header--error",C("qrscan-result-icon").innerHTML=Xa(),C("qrscan-result-title").textContent="Scan Gagal",C("qrscan-result-subtitle").textContent=e,["qr-res-name","qr-res-code","qr-res-route","qr-res-datetime","qr-res-seats","qr-res-pax"].forEach(t=>{C(t).textContent="-"}),C("qr-res-loyalty-label").textContent="– / –",C("qr-res-loyalty-fill").style.width="0%",C("qr-res-loyalty-note").textContent=""}function Oi(e){const t=e.booking,n=new Date().toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit",second:"2-digit"}),a=e.passenger||{};yt.unshift({booking:t,passenger:a,time:n,success:e.success,already_scanned:e.already_scanned,message:e.message}),Wa()}function Wa(){const e=C("qrscan-history-list");if(yt.length===0){e.innerHTML='<p class="qrscan-history-empty">Belum ada scan dalam sesi ini.</p>';return}e.innerHTML=yt.map(t=>{const n=t.already_scanned?"warn":t.success?"ok":"err",a=t.passenger&&t.passenger.name?t.passenger.name+(t.passenger.seat_no?" ("+t.passenger.seat_no+")":""):t.booking.nama_pemesanan||"-";return`
        <div class="qrscan-history-item qrscan-history-item--${n}">
            <div class="qrscan-history-dot"></div>
            <div class="qrscan-history-body">
                <strong>${u(t.booking.booking_code||"-")}</strong>
                <span>${u(a)}</span>
            </div>
            <span class="qrscan-history-time">${t.time}</span>
        </div>`}).join("")}function ji(){if(!window.Html5Qrcode){h("Library scanner tidak tersedia. Coba muat ulang halaman.","Error");return}C("qrscan-placeholder").hidden=!0,C("qrscan-frame").hidden=!1,C("qrscan-btn-start").hidden=!0,C("qrscan-btn-stop").hidden=!1,ht=!0,xe("Menginisialisasi kamera…"),qe=new window.Html5Qrcode("qrscan-reader"),qe.start({facingMode:"environment"},{fps:10,qrbox:{width:240,height:240}},e=>{let t=e.trim();try{const n=JSON.parse(e);n&&(n.qr_token||n.passenger_qr_token)&&(t=n.qr_token||n.passenger_qr_token)}catch{}za(t)},()=>{}).then(()=>{xe("Kamera aktif — arahkan ke QR code.")}).catch(e=>{ht=!1,C("qrscan-placeholder").hidden=!1,C("qrscan-frame").hidden=!0,C("qrscan-btn-start").hidden=!1,C("qrscan-btn-stop").hidden=!0,xe("Gagal mengakses kamera. Pastikan izin kamera sudah diberikan."),h(String(e),"Kamera Error")})}function qi(){qe&&qe.stop().catch(()=>{}).finally(()=>{qe=null}),ht=!1,C("qrscan-placeholder").hidden=!1,C("qrscan-frame").hidden=!0,C("qrscan-btn-start").hidden=!1,C("qrscan-btn-stop").hidden=!0,xe("Kamera dihentikan.")}function xe(e){C("qrscan-status-text").textContent=e}function Ni(){return`<svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
        <path d="M8 12l3 3 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`}function Xa(){return`<svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
        <path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`}function Ui(){return`<svg viewBox="0 0 24 24" fill="none">
        <path d="M12 9v4M12 17h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    </svg>`}function Hi(){C("qrscan-btn-start").addEventListener("click",ji),C("qrscan-btn-stop").addEventListener("click",qi),C("qrscan-clear-history").addEventListener("click",()=>{yt.length=0,Wa()}),C("qrscan-manual-form").addEventListener("submit",e=>{e.preventDefault();const t=C("qrscan-manual-input").value.trim();t&&(za(t),C("qrscan-manual-input").value="")})}const x={data:[],loading:!0,totalCount:0,page:1,search:"",chartLimit:10,editItem:null,deleteItem:null,isSubmitting:!1};let Ye=null;const ke=15,Fi=()=>`<svg viewBox="0 0 24 24" fill="none">
    <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
</svg>`,Vi=()=>`<svg viewBox="0 0 24 24" fill="none">
    <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
</svg>`;function Gi(){const e=document.getElementById("plkt-table-body");e&&(e.innerHTML=`
        <tr><td colspan="10" class="plkt-table-state">
            <div class="plkt-loading-inline">
                <span class="plkt-loading-inline-spinner" aria-hidden="true"></span>
                <span>Memuat data...</span>
            </div>
        </td></tr>`)}function Ji(){const e=document.getElementById("plkt-table-body");e&&(e.innerHTML='<tr><td colspan="10" class="plkt-table-state plkt-empty-copy">Belum ada data penumpang.</td></tr>')}function ia(){const e=document.getElementById("plkt-table-body");if(e){if(x.loading){Gi();return}if(x.data.length===0){Ji();return}e.innerHTML=x.data.map((t,n)=>`
        <tr class="plkt-row">
            <td class="plkt-index-cell">${(x.page-1)*ke+n+1}</td>
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
                        ${Fi()}
                    </button>
                    <button class="plkt-icon-button plkt-icon-button-danger" type="button"
                        data-plkt-delete="${t.id}"
                        data-plkt-name="${u(t.passenger_name||"")}"
                        aria-label="Hapus penumpang ${u(t.passenger_name||"")}">
                        ${Vi()}
                    </button>
                </div>
            </td>
        </tr>`).join("")}}function da(){const e=document.getElementById("plkt-pagination-shell"),t=document.getElementById("plkt-pagination-info"),n=document.getElementById("plkt-pagination-page"),a=document.getElementById("plkt-prev-page-btn"),r=document.getElementById("plkt-next-page-btn"),o=Math.max(1,Math.ceil(x.totalCount/ke));e&&(e.hidden=o<=1),t&&(t.textContent=ye(x.page,ke,x.totalCount,x.data.length)),n&&(n.textContent=`${x.page} / ${o}`),a&&(a.disabled=x.page===1),r&&(r.disabled=x.page>=o)}async function Se(){x.loading=!0,ia(),da();try{const[e,t]=await Promise.all([y(`/passengers-lkt?page=${x.page}&limit=${ke}${x.search?`&search=${encodeURIComponent(x.search)}`:""}`),y(`/passengers-lkt/count${x.search?`?search=${encodeURIComponent(x.search)}`:""}`)]);x.data=Array.isArray(e)?e:[],x.totalCount=Number(t?.count||0)}catch(e){h(e.message||"Gagal memuat data","Error"),x.data=[],x.totalCount=0}finally{x.loading=!1,ia(),da()}}function Gt(e){const t=document.getElementById("plkt-edit-submit-btn");x.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":"Simpan")}async function Ki(e){try{const t=await y(`/passengers-lkt/${e}`);x.editItem=t;const n=document.getElementById("plkt-edit-name"),a=document.getElementById("plkt-edit-phone"),r=document.getElementById("plkt-edit-id");r&&(r.value=t.id),n&&(n.value=t.name||""),a&&(a.value=t.phone||""),Gt(!1),j("plkt-edit-modal")}catch{h("Gagal memuat data penumpang")}}function zi(e,t){x.deleteItem={id:e,name:t};const n=document.getElementById("plkt-delete-copy");n&&(n.innerHTML=`Apakah Anda yakin ingin menghapus penumpang <strong>${u(t)}</strong>? Tindakan ini tidak dapat dibatalkan.`),j("plkt-delete-modal")}async function et(){const e=document.getElementById("plkt-loyalty-chart"),t=document.getElementById("plkt-chart-empty");if(e)try{const n=await y(`/passengers-lkt/loyalty-chart?limit=${x.chartLimit}`);if(!Array.isArray(n)||n.length===0){e.hidden=!0,t&&(t.hidden=!1);return}e.hidden=!1,t&&(t.hidden=!0);const a=n.map(i=>i.passenger_name+(i.phone&&i.phone!=="-"?` (${i.phone})`:"")),r=n.map(i=>i.booking_count),o=Math.max(...r,1),s=r.map(i=>{const c=i/o;return`rgba(${Math.round(26+c*30)}, ${Math.round(35+c*80)}, ${Math.round(126+c*50)}, 0.85)`});Ye&&(Ye.destroy(),Ye=null),Ye=new window.Chart(e,{type:"bar",data:{labels:a,datasets:[{label:"Jumlah Pemesanan",data:r,backgroundColor:s,borderRadius:6,borderSkipped:!1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{title:i=>i[0].label,label:i=>` ${i.raw} kali pemesanan`}}},scales:{x:{ticks:{maxRotation:35,font:{size:11},color:"#374151"},grid:{display:!1}},y:{beginAtZero:!0,ticks:{stepSize:1,color:"#374151",font:{size:11}},grid:{color:"rgba(0,0,0,0.06)"}}}}})}catch{t&&(t.hidden=!1)}}function Wi(){if(x.data.length===0){h("Tidak ada data untuk diekspor.");return}const e=["No","Nama Penumpang","No HP","Dari","Tujuan","Tanggal Berangkat","Jam","Tarif","Kali Memesan"],t=x.data.map((s,i)=>[(x.page-1)*ke+i+1,s.passenger_name||"-",s.phone||"-",s.from_city||"-",s.to_city||"-",s.trip_date||"-",s.trip_time||"-",s.tarif||"-",s.booking_count]),n=[e,...t].map(s=>s.map(i=>`"${String(i).replace(/"/g,'""')}"`).join(",")).join(`
`),a=new Blob(["\uFEFF"+n],{type:"text/csv;charset=utf-8;"}),r=URL.createObjectURL(a),o=document.createElement("a");o.href=r,o.download="data-penumpang-lkt.csv",o.click(),URL.revokeObjectURL(r)}function Xi(){const e=document.getElementById("plkt-search-input"),t=document.getElementById("plkt-prev-page-btn"),n=document.getElementById("plkt-next-page-btn"),a=document.getElementById("plkt-export-btn"),r=document.getElementById("plkt-chart-limit"),o=document.getElementById("plkt-table-body"),s=document.getElementById("plkt-edit-form"),i=document.getElementById("plkt-delete-confirm-btn");e?.addEventListener("input",he(async c=>{x.search=c.target.value.trim(),x.page=1,await Se().catch(()=>h("Gagal memuat data"))},400)),t?.addEventListener("click",async()=>{x.page<=1||(x.page-=1,await Se().catch(()=>h("Gagal memuat data")))}),n?.addEventListener("click",async()=>{const c=Math.max(1,Math.ceil(x.totalCount/ke));x.page>=c||(x.page+=1,await Se().catch(()=>h("Gagal memuat data")))}),a?.addEventListener("click",Wi),r?.addEventListener("change",async c=>{x.chartLimit=parseInt(c.target.value,10)||10,await et().catch(()=>{})}),o?.addEventListener("click",async c=>{const d=c.target.closest("[data-plkt-edit]"),l=c.target.closest("[data-plkt-delete]");d&&await Ki(d.dataset.plktEdit),l&&zi(l.dataset.plktDelete,l.dataset.plktName)}),s?.addEventListener("submit",async c=>{c.preventDefault();const d=document.getElementById("plkt-edit-id")?.value,l=document.getElementById("plkt-edit-name")?.value.trim(),k=document.getElementById("plkt-edit-phone")?.value.trim();if(!l){h("Nama penumpang tidak boleh kosong");return}Gt(!0);try{await y(`/passengers-lkt/${d}`,{method:"PUT",body:{name:l,phone:k}}),q("Data penumpang berhasil diperbarui"),z("plkt-edit-modal"),await Promise.all([Se(),et()])}catch(v){h(v.message||"Gagal menyimpan data")}finally{Gt(!1)}}),i?.addEventListener("click",async()=>{if(x.deleteItem)try{await y(`/passengers-lkt/${x.deleteItem.id}`,{method:"DELETE"}),q("Data penumpang berhasil dihapus"),z("plkt-delete-modal"),x.deleteItem=null,(x.page-1)*ke>=x.totalCount-1&&x.page>1&&(x.page-=1),await Promise.all([Se(),et()])}catch(c){h(c.message||"Gagal menghapus data")}}),Se().catch(()=>h("Gagal memuat data")),et().catch(()=>{})}const U={data:[],loading:!0,totalCount:0,page:1,search:"",detailItem:null,isLoadingDetail:!1},Ve=20,Zi=()=>`<svg viewBox="0 0 24 24" fill="none">
    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/>
</svg>`;function Za(e){const t={high:["badge-emerald","Tinggi"],medium:["badge-blue","Sedang"],low:["badge-yellow","Rendah"]},[n,a]=t[e]??["badge-gray",e??"-"];return`<span class="stock-value-badge ${n}">${u(a)}</span>`}function Qa(e){const t={active:["stock-value-badge-emerald","Aktif"],merged:["stock-value-badge-blue","Digabung"],inactive:["stock-value-badge-red","Nonaktif"]},[n,a]=t[e]??["stock-value-badge-blue",e??"-"];return`<span class="stock-value-badge ${n}">${u(a)}</span>`}function Ya(e){return e?'<span class="stock-value-badge stock-value-badge-emerald">✓ Eligible</span>':'<span class="stock-value-badge stock-value-badge-blue">—</span>'}function Qi(){const e=document.getElementById("cust-table-body");e&&(e.innerHTML=`
        <tr><td colspan="8" class="plkt-table-state">
            <div class="plkt-loading-inline">
                <span class="plkt-loading-inline-spinner" aria-hidden="true"></span>
                <span>Memuat data...</span>
            </div>
        </td></tr>`)}function Yi(){const e=document.getElementById("cust-table-body");e&&(e.innerHTML='<tr><td colspan="8" class="plkt-table-state plkt-empty-copy">Belum ada data pelanggan.</td></tr>')}function la(){const e=document.getElementById("cust-table-body");if(e){if(U.loading){Qi();return}if(U.data.length===0){Yi();return}e.innerHTML=U.data.map((t,n)=>`
        <tr class="plkt-row">
            <td class="plkt-index-cell">${(U.page-1)*Ve+n+1}</td>
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
                        <span class="plkt-user-seat">${Za(t.identity_confidence)}</span>
                    </div>
                </div>
            </td>
            <td class="plkt-phone-cell">${u(t.phone_normalized||t.phone_original||"-")}</td>
            <td class="text-center">
                <strong>${t.total_trip_count??0}</strong>
                <span style="color:var(--color-text-muted);font-size:.75rem"> / 5</span>
            </td>
            <td class="text-center">${Ya(t.discount_eligible)}</td>
            <td class="text-center">${Qa(t.status)}</td>
            <td class="text-center">
                <button class="plkt-icon-button" type="button"
                    data-cust-detail="${t.id}"
                    aria-label="Detail pelanggan ${u(t.display_name||"")}">
                    ${Zi()}
                </button>
            </td>
        </tr>`).join("")}}function ed(){const e=document.getElementById("cust-pagination-shell"),t=document.getElementById("cust-pagination-info"),n=document.getElementById("cust-pagination-page"),a=document.getElementById("cust-prev-page-btn"),r=document.getElementById("cust-next-page-btn"),o=Math.max(1,Math.ceil(U.totalCount/Ve));e&&(e.hidden=!1),t&&(t.textContent=ye(U.page,Ve,U.totalCount,U.data.length)),n&&(n.textContent=`${U.page} / ${o}`),a&&(a.disabled=U.page===1),r&&(r.disabled=U.page>=o)}async function td(){try{const[e,t,n]=await Promise.all([y("/customers?limit=1"),y("/customers?limit=1&discount_eligible=1"),y("/customers?limit=1&has_phone=1")]),a=document.getElementById("cust-stat-total"),r=document.getElementById("cust-stat-eligible"),o=document.getElementById("cust-stat-with-phone");a&&(a.textContent=(e?.total??0).toLocaleString("id-ID")),r&&(r.textContent=(t?.total??0).toLocaleString("id-ID")),o&&(o.textContent=(n?.total??0).toLocaleString("id-ID"))}catch{}}async function tt(){U.loading=!0,la();try{const e=new URLSearchParams({page:U.page,limit:Ve});U.search&&e.set("search",U.search);const t=await y(`/customers?${e.toString()}`);U.data=Array.isArray(t?.data)?t.data:[],U.totalCount=Number(t?.total??0)}catch(e){h(e.message||"Gagal memuat data pelanggan","Error"),U.data=[],U.totalCount=0}finally{U.loading=!1,la(),ed()}}async function nd(e){const t=document.getElementById("cust-detail-name"),n=document.getElementById("cust-detail-code"),a=document.getElementById("cust-detail-body");t&&(t.textContent="Detail Pelanggan"),n&&(n.textContent=""),a&&(a.innerHTML=`
        <div class="plkt-loading-inline">
            <span class="plkt-loading-inline-spinner" aria-hidden="true"></span>
            <span>Memuat detail...</span>
        </div>`),j("cust-detail-modal");try{const r=await y(`/customers/${e}`);t&&(t.textContent=r.display_name||"-"),n&&(n.textContent=r.customer_code||"");const o=r.recent_bookings?.length?r.recent_bookings.map(s=>`
                <tr>
                    <td>${u(s.booking_code||"-")}</td>
                    <td>${u(s.trip_date||"-")}</td>
                    <td>${u(s.from_city||"-")} → ${u(s.to_city||"-")}</td>
                    <td>${u(s.booking_status||"-")}</td>
                </tr>`).join(""):'<tr><td colspan="4" class="plkt-table-state plkt-empty-copy">Belum ada riwayat perjalanan.</td></tr>';a&&(a.innerHTML=`
            <dl class="cust-detail-dl">
                <dt>Nama</dt>
                <dd>${u(r.display_name||"-")}</dd>
                <dt>Nomor HP</dt>
                <dd>${u(r.phone_normalized||r.phone_original||"-")}</dd>
                <dt>Email</dt>
                <dd>${u(r.email||"-")}</dd>
                <dt>Status</dt>
                <dd>${Qa(r.status)}</dd>
                <dt>Kepercayaan Data</dt>
                <dd>${Za(r.identity_confidence)}</dd>
                <dt>Total Perjalanan</dt>
                <dd><strong>${r.total_trip_count??0}</strong> / 5</dd>
                <dt>Eligible Diskon</dt>
                <dd>${Ya(r.discount_eligible)}</dd>
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
            </div>`)}catch(r){a&&(a.innerHTML=`<p class="plkt-empty-copy">Gagal memuat detail: ${u(r.message||"Terjadi kesalahan")}</p>`)}}async function ad(){try{const t=(await y("/customers/duplicates?limit=5"))?.total??0;t===0?q("Tidak ada duplikasi pelanggan terdeteksi.","Tidak Ada Duplikasi"):h(`Terdeteksi ${t} pasang pelanggan berpotensi duplikat. Gunakan API untuk merge.`,`${t} Duplikasi Ditemukan`)}catch(e){h(e.message||"Gagal memeriksa duplikasi","Error")}}function rd(){const e=document.getElementById("cust-search-input"),t=document.getElementById("cust-prev-page-btn"),n=document.getElementById("cust-next-page-btn"),a=document.getElementById("cust-table-body"),r=document.getElementById("cust-duplicates-btn");e?.addEventListener("input",he(async o=>{U.search=o.target.value.trim(),U.page=1,await tt().catch(()=>h("Gagal memuat data"))},400)),t?.addEventListener("click",async()=>{U.page<=1||(U.page-=1,await tt().catch(()=>h("Gagal memuat data")))}),n?.addEventListener("click",async()=>{const o=Math.max(1,Math.ceil(U.totalCount/Ve));U.page>=o||(U.page+=1,await tt().catch(()=>h("Gagal memuat data")))}),r?.addEventListener("click",ad),a?.addEventListener("click",async o=>{const s=o.target.closest("[data-cust-detail]");s&&await nd(s.dataset.custDetail)}),tt().catch(()=>h("Gagal memuat data")),td().catch(()=>{})}function od(e){return!e||e<=0?"":"Rp "+Math.floor(e).toLocaleString("id-ID")}function sd(){const e=document.querySelector("[data-fare-input]"),t=document.querySelector("[data-additional-fare-input]"),n=document.querySelector("[data-estimated-total-input]");function a(){const r=parseInt(e?.value||"0",10)||0,o=parseInt(t?.value||"0",10)||0,s=r+o;n&&(n.value=od(s))}e?.addEventListener("input",a),t?.addEventListener("input",a),document.querySelectorAll('.regular-booking-radio input[type="radio"]').forEach(r=>{r.addEventListener("change",()=>{document.querySelectorAll(`.regular-booking-radio input[name="${r.name}"]`).forEach(s=>{s.closest(".regular-booking-radio")?.classList.toggle("is-selected",s.checked)})})})}const id={"admin-users/index":ti,"auth/login":zo,"bookings/index":Li,"dashboard/index":ss,"drivers/index":bs,"mobil/index":_s,"keberangkatan/index":Rs,"regular-bookings/index":Ai,"regular-bookings/seats":Mi,"stock/index":Ns,"qr-scan/index":Hi,"passengers-lkt/index":Xi,"customers/index":rd,"dropping-bookings/index":sd};document.addEventListener("DOMContentLoaded",async()=>{Vo(),Ko(),it(Da());const e=jo();e&&(e.type==="success"?q(e.message,e.title):e.type==="info"?Go(e.message,e.title):h(e.message,e.title));try{const{user:t}=await Fo();t&&it(t);const n=document.body.dataset.pageScript,a=id[n];typeof a=="function"&&await a({user:t})}catch(t){console.error(t),h(t.message||"Terjadi kesalahan saat memuat halaman")}});
