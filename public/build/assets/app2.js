function Un(e,t){return function(){return e.apply(t,arguments)}}const{toString:Ba}=Object.prototype,{getPrototypeOf:xt}=Object,{iterator:ot,toStringTag:qn}=Symbol,st=(e=>t=>{const n=Ba.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),Z=e=>(e=e.toLowerCase(),t=>st(t)===e),it=e=>t=>typeof t===e,{isArray:ye}=Array,be=it("undefined");function Te(e){return e!==null&&!be(e)&&e.constructor!==null&&!be(e.constructor)&&G(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const Hn=Z("ArrayBuffer");function Ia(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&Hn(e.buffer),t}const Sa=it("string"),G=it("function"),Fn=it("number"),Le=e=>e!==null&&typeof e=="object",$a=e=>e===!0||e===!1,qe=e=>{if(st(e)!=="object")return!1;const t=xt(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(qn in e)&&!(ot in e)},Ca=e=>{if(!Le(e)||Te(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},_a=Z("Date"),xa=Z("File"),Ta=e=>!!(e&&typeof e.uri<"u"),La=e=>e&&typeof e.getParts<"u",Aa=Z("Blob"),Ra=Z("FileList"),Ma=e=>Le(e)&&G(e.pipe);function Pa(){return typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}}const Kt=Pa(),zt=typeof Kt.FormData<"u"?Kt.FormData:void 0,Da=e=>{let t;return e&&(zt&&e instanceof zt||G(e.append)&&((t=st(e))==="formdata"||t==="object"&&G(e.toString)&&e.toString()==="[object FormData]"))},Oa=Z("URLSearchParams"),[ja,Na,Ua,qa]=["ReadableStream","Request","Response","Headers"].map(Z),Ha=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function Ae(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let a,r;if(typeof e!="object"&&(e=[e]),ye(e))for(a=0,r=e.length;a<r;a++)t.call(null,e[a],a,e);else{if(Te(e))return;const o=n?Object.getOwnPropertyNames(e):Object.keys(e),s=o.length;let i;for(a=0;a<s;a++)i=o[a],t.call(null,e[i],i,e)}}function Vn(e,t){if(Te(e))return null;t=t.toLowerCase();const n=Object.keys(e);let a=n.length,r;for(;a-- >0;)if(r=n[a],t===r.toLowerCase())return r;return null}const oe=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,Gn=e=>!be(e)&&e!==oe;function Et(){const{caseless:e,skipUndefined:t}=Gn(this)&&this||{},n={},a=(r,o)=>{if(o==="__proto__"||o==="constructor"||o==="prototype")return;const s=e&&Vn(n,o)||o;qe(n[s])&&qe(r)?n[s]=Et(n[s],r):qe(r)?n[s]=Et({},r):ye(r)?n[s]=r.slice():(!t||!be(r))&&(n[s]=r)};for(let r=0,o=arguments.length;r<o;r++)arguments[r]&&Ae(arguments[r],a);return n}const Fa=(e,t,n,{allOwnKeys:a}={})=>(Ae(t,(r,o)=>{n&&G(r)?Object.defineProperty(e,o,{value:Un(r,n),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(e,o,{value:r,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:a}),e),Va=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),Ga=(e,t,n,a)=>{e.prototype=Object.create(t.prototype,a),Object.defineProperty(e.prototype,"constructor",{value:e,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},Ja=(e,t,n,a)=>{let r,o,s;const i={};if(t=t||{},e==null)return t;do{for(r=Object.getOwnPropertyNames(e),o=r.length;o-- >0;)s=r[o],(!a||a(s,e,t))&&!i[s]&&(t[s]=e[s],i[s]=!0);e=n!==!1&&xt(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},Wa=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const a=e.indexOf(t,n);return a!==-1&&a===n},Ka=e=>{if(!e)return null;if(ye(e))return e;let t=e.length;if(!Fn(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},za=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&xt(Uint8Array)),Xa=(e,t)=>{const a=(e&&e[ot]).call(e);let r;for(;(r=a.next())&&!r.done;){const o=r.value;t.call(e,o[0],o[1])}},Za=(e,t)=>{let n;const a=[];for(;(n=e.exec(t))!==null;)a.push(n);return a},Qa=Z("HTMLFormElement"),Ya=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,a,r){return a.toUpperCase()+r}),Xt=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),er=Z("RegExp"),Jn=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),a={};Ae(n,(r,o)=>{let s;(s=t(r,o,e))!==!1&&(a[o]=s||r)}),Object.defineProperties(e,a)},tr=e=>{Jn(e,(t,n)=>{if(G(e)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const a=e[n];if(G(a)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},nr=(e,t)=>{const n={},a=r=>{r.forEach(o=>{n[o]=!0})};return ye(e)?a(e):a(String(e).split(t)),n},ar=()=>{},rr=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function or(e){return!!(e&&G(e.append)&&e[qn]==="FormData"&&e[ot])}const sr=e=>{const t=new Array(10),n=(a,r)=>{if(Le(a)){if(t.indexOf(a)>=0)return;if(Te(a))return a;if(!("toJSON"in a)){t[r]=a;const o=ye(a)?[]:{};return Ae(a,(s,i)=>{const m=n(s,r+1);!be(m)&&(o[i]=m)}),t[r]=void 0,o}}return a};return n(e,0)},ir=Z("AsyncFunction"),dr=e=>e&&(Le(e)||G(e))&&G(e.then)&&G(e.catch),Wn=((e,t)=>e?setImmediate:t?((n,a)=>(oe.addEventListener("message",({source:r,data:o})=>{r===oe&&o===n&&a.length&&a.shift()()},!1),r=>{a.push(r),oe.postMessage(n,"*")}))(`axios@${Math.random()}`,[]):n=>setTimeout(n))(typeof setImmediate=="function",G(oe.postMessage)),lr=typeof queueMicrotask<"u"?queueMicrotask.bind(oe):typeof process<"u"&&process.nextTick||Wn,cr=e=>e!=null&&G(e[ot]),u={isArray:ye,isArrayBuffer:Hn,isBuffer:Te,isFormData:Da,isArrayBufferView:Ia,isString:Sa,isNumber:Fn,isBoolean:$a,isObject:Le,isPlainObject:qe,isEmptyObject:Ca,isReadableStream:ja,isRequest:Na,isResponse:Ua,isHeaders:qa,isUndefined:be,isDate:_a,isFile:xa,isReactNativeBlob:Ta,isReactNative:La,isBlob:Aa,isRegExp:er,isFunction:G,isStream:Ma,isURLSearchParams:Oa,isTypedArray:za,isFileList:Ra,forEach:Ae,merge:Et,extend:Fa,trim:Ha,stripBOM:Va,inherits:Ga,toFlatObject:Ja,kindOf:st,kindOfTest:Z,endsWith:Wa,toArray:Ka,forEachEntry:Xa,matchAll:Za,isHTMLForm:Qa,hasOwnProperty:Xt,hasOwnProp:Xt,reduceDescriptors:Jn,freezeMethods:tr,toObjectSet:nr,toCamelCase:Ya,noop:ar,toFiniteNumber:rr,findKey:Vn,global:oe,isContextDefined:Gn,isSpecCompliantForm:or,toJSONObject:sr,isAsyncFn:ir,isThenable:dr,setImmediate:Wn,asap:lr,isIterable:cr};let B=class Kn extends Error{static from(t,n,a,r,o,s){const i=new Kn(t.message,n||t.code,a,r,o);return i.cause=t,i.name=t.name,t.status!=null&&i.status==null&&(i.status=t.status),s&&Object.assign(i,s),i}constructor(t,n,a,r,o){super(t),Object.defineProperty(this,"message",{value:t,enumerable:!0,writable:!0,configurable:!0}),this.name="AxiosError",this.isAxiosError=!0,n&&(this.code=n),a&&(this.config=a),r&&(this.request=r),o&&(this.response=o,this.status=o.status)}toJSON(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:u.toJSONObject(this.config),code:this.code,status:this.status}}};B.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";B.ERR_BAD_OPTION="ERR_BAD_OPTION";B.ECONNABORTED="ECONNABORTED";B.ETIMEDOUT="ETIMEDOUT";B.ERR_NETWORK="ERR_NETWORK";B.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";B.ERR_DEPRECATED="ERR_DEPRECATED";B.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";B.ERR_BAD_REQUEST="ERR_BAD_REQUEST";B.ERR_CANCELED="ERR_CANCELED";B.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";B.ERR_INVALID_URL="ERR_INVALID_URL";const ur=null;function wt(e){return u.isPlainObject(e)||u.isArray(e)}function zn(e){return u.endsWith(e,"[]")?e.slice(0,-2):e}function pt(e,t,n){return e?e.concat(t).map(function(r,o){return r=zn(r),!n&&o?"["+r+"]":r}).join(n?".":""):t}function mr(e){return u.isArray(e)&&!e.some(wt)}const pr=u.toFlatObject(u,{},null,function(t){return/^is[A-Z]/.test(t)});function dt(e,t,n){if(!u.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=u.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(k,b){return!u.isUndefined(b[k])});const a=n.metaTokens,r=n.visitor||l,o=n.dots,s=n.indexes,m=(n.Blob||typeof Blob<"u"&&Blob)&&u.isSpecCompliantForm(t);if(!u.isFunction(r))throw new TypeError("visitor must be a function");function d(g){if(g===null)return"";if(u.isDate(g))return g.toISOString();if(u.isBoolean(g))return g.toString();if(!m&&u.isBlob(g))throw new B("Blob is not supported. Use a Buffer instead.");return u.isArrayBuffer(g)||u.isTypedArray(g)?m&&typeof Blob=="function"?new Blob([g]):Buffer.from(g):g}function l(g,k,b){let _=g;if(u.isReactNative(t)&&u.isReactNativeBlob(g))return t.append(pt(b,k,o),d(g)),!1;if(g&&!b&&typeof g=="object"){if(u.endsWith(k,"{}"))k=a?k:k.slice(0,-2),g=JSON.stringify(g);else if(u.isArray(g)&&mr(g)||(u.isFileList(g)||u.endsWith(k,"[]"))&&(_=u.toArray(g)))return k=zn(k),_.forEach(function(x,R){!(u.isUndefined(x)||x===null)&&t.append(s===!0?pt([k],R,o):s===null?k:k+"[]",d(x))}),!1}return wt(g)?!0:(t.append(pt(b,k,o),d(g)),!1)}const c=[],f=Object.assign(pr,{defaultVisitor:l,convertValue:d,isVisitable:wt});function y(g,k){if(!u.isUndefined(g)){if(c.indexOf(g)!==-1)throw Error("Circular reference detected in "+k.join("."));c.push(g),u.forEach(g,function(_,A){(!(u.isUndefined(_)||_===null)&&r.call(t,_,u.isString(A)?A.trim():A,k,f))===!0&&y(_,k?k.concat(A):[A])}),c.pop()}}if(!u.isObject(e))throw new TypeError("data must be an object");return y(e),t}function Zt(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(a){return t[a]})}function Tt(e,t){this._pairs=[],e&&dt(e,this,t)}const Xn=Tt.prototype;Xn.append=function(t,n){this._pairs.push([t,n])};Xn.toString=function(t){const n=t?function(a){return t.call(this,a,Zt)}:Zt;return this._pairs.map(function(r){return n(r[0])+"="+n(r[1])},"").join("&")};function gr(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function Zn(e,t,n){if(!t)return e;const a=n&&n.encode||gr,r=u.isFunction(n)?{serialize:n}:n,o=r&&r.serialize;let s;if(o?s=o(t,r):s=u.isURLSearchParams(t)?t.toString():new Tt(t,r).toString(a),s){const i=e.indexOf("#");i!==-1&&(e=e.slice(0,i)),e+=(e.indexOf("?")===-1?"?":"&")+s}return e}class Qt{constructor(){this.handlers=[]}use(t,n,a){return this.handlers.push({fulfilled:t,rejected:n,synchronous:a?a.synchronous:!1,runWhen:a?a.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){u.forEach(this.handlers,function(a){a!==null&&t(a)})}}const Lt={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0},fr=typeof URLSearchParams<"u"?URLSearchParams:Tt,br=typeof FormData<"u"?FormData:null,hr=typeof Blob<"u"?Blob:null,kr={isBrowser:!0,classes:{URLSearchParams:fr,FormData:br,Blob:hr},protocols:["http","https","file","blob","url","data"]},At=typeof window<"u"&&typeof document<"u",Bt=typeof navigator=="object"&&navigator||void 0,yr=At&&(!Bt||["ReactNative","NativeScript","NS"].indexOf(Bt.product)<0),vr=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",Er=At&&window.location.href||"http://localhost",wr=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:At,hasStandardBrowserEnv:yr,hasStandardBrowserWebWorkerEnv:vr,navigator:Bt,origin:Er},Symbol.toStringTag,{value:"Module"})),F={...wr,...kr};function Br(e,t){return dt(e,new F.classes.URLSearchParams,{visitor:function(n,a,r,o){return F.isNode&&u.isBuffer(n)?(this.append(a,n.toString("base64")),!1):o.defaultVisitor.apply(this,arguments)},...t})}function Ir(e){return u.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function Sr(e){const t={},n=Object.keys(e);let a;const r=n.length;let o;for(a=0;a<r;a++)o=n[a],t[o]=e[o];return t}function Qn(e){function t(n,a,r,o){let s=n[o++];if(s==="__proto__")return!0;const i=Number.isFinite(+s),m=o>=n.length;return s=!s&&u.isArray(r)?r.length:s,m?(u.hasOwnProp(r,s)?r[s]=[r[s],a]:r[s]=a,!i):((!r[s]||!u.isObject(r[s]))&&(r[s]=[]),t(n,a,r[s],o)&&u.isArray(r[s])&&(r[s]=Sr(r[s])),!i)}if(u.isFormData(e)&&u.isFunction(e.entries)){const n={};return u.forEachEntry(e,(a,r)=>{t(Ir(a),r,n,0)}),n}return null}function $r(e,t,n){if(u.isString(e))try{return(t||JSON.parse)(e),u.trim(e)}catch(a){if(a.name!=="SyntaxError")throw a}return(n||JSON.stringify)(e)}const Re={transitional:Lt,adapter:["xhr","http","fetch"],transformRequest:[function(t,n){const a=n.getContentType()||"",r=a.indexOf("application/json")>-1,o=u.isObject(t);if(o&&u.isHTMLForm(t)&&(t=new FormData(t)),u.isFormData(t))return r?JSON.stringify(Qn(t)):t;if(u.isArrayBuffer(t)||u.isBuffer(t)||u.isStream(t)||u.isFile(t)||u.isBlob(t)||u.isReadableStream(t))return t;if(u.isArrayBufferView(t))return t.buffer;if(u.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let i;if(o){if(a.indexOf("application/x-www-form-urlencoded")>-1)return Br(t,this.formSerializer).toString();if((i=u.isFileList(t))||a.indexOf("multipart/form-data")>-1){const m=this.env&&this.env.FormData;return dt(i?{"files[]":t}:t,m&&new m,this.formSerializer)}}return o||r?(n.setContentType("application/json",!1),$r(t)):t}],transformResponse:[function(t){const n=this.transitional||Re.transitional,a=n&&n.forcedJSONParsing,r=this.responseType==="json";if(u.isResponse(t)||u.isReadableStream(t))return t;if(t&&u.isString(t)&&(a&&!this.responseType||r)){const s=!(n&&n.silentJSONParsing)&&r;try{return JSON.parse(t,this.parseReviver)}catch(i){if(s)throw i.name==="SyntaxError"?B.from(i,B.ERR_BAD_RESPONSE,this,null,this.response):i}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:F.classes.FormData,Blob:F.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};u.forEach(["delete","get","head","post","put","patch"],e=>{Re.headers[e]={}});const Cr=u.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),_r=e=>{const t={};let n,a,r;return e&&e.split(`
`).forEach(function(s){r=s.indexOf(":"),n=s.substring(0,r).trim().toLowerCase(),a=s.substring(r+1).trim(),!(!n||t[n]&&Cr[n])&&(n==="set-cookie"?t[n]?t[n].push(a):t[n]=[a]:t[n]=t[n]?t[n]+", "+a:a)}),t},Yt=Symbol("internals");function Ee(e){return e&&String(e).trim().toLowerCase()}function He(e){return e===!1||e==null?e:u.isArray(e)?e.map(He):String(e)}function xr(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let a;for(;a=n.exec(e);)t[a[1]]=a[2];return t}const Tr=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function gt(e,t,n,a,r){if(u.isFunction(a))return a.call(this,t,n);if(r&&(t=n),!!u.isString(t)){if(u.isString(a))return t.indexOf(a)!==-1;if(u.isRegExp(a))return a.test(t)}}function Lr(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,a)=>n.toUpperCase()+a)}function Ar(e,t){const n=u.toCamelCase(" "+t);["get","set","has"].forEach(a=>{Object.defineProperty(e,a+n,{value:function(r,o,s){return this[a].call(this,t,r,o,s)},configurable:!0})})}let J=class{constructor(t){t&&this.set(t)}set(t,n,a){const r=this;function o(i,m,d){const l=Ee(m);if(!l)throw new Error("header name must be a non-empty string");const c=u.findKey(r,l);(!c||r[c]===void 0||d===!0||d===void 0&&r[c]!==!1)&&(r[c||m]=He(i))}const s=(i,m)=>u.forEach(i,(d,l)=>o(d,l,m));if(u.isPlainObject(t)||t instanceof this.constructor)s(t,n);else if(u.isString(t)&&(t=t.trim())&&!Tr(t))s(_r(t),n);else if(u.isObject(t)&&u.isIterable(t)){let i={},m,d;for(const l of t){if(!u.isArray(l))throw TypeError("Object iterator must return a key-value pair");i[d=l[0]]=(m=i[d])?u.isArray(m)?[...m,l[1]]:[m,l[1]]:l[1]}s(i,n)}else t!=null&&o(n,t,a);return this}get(t,n){if(t=Ee(t),t){const a=u.findKey(this,t);if(a){const r=this[a];if(!n)return r;if(n===!0)return xr(r);if(u.isFunction(n))return n.call(this,r,a);if(u.isRegExp(n))return n.exec(r);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=Ee(t),t){const a=u.findKey(this,t);return!!(a&&this[a]!==void 0&&(!n||gt(this,this[a],a,n)))}return!1}delete(t,n){const a=this;let r=!1;function o(s){if(s=Ee(s),s){const i=u.findKey(a,s);i&&(!n||gt(a,a[i],i,n))&&(delete a[i],r=!0)}}return u.isArray(t)?t.forEach(o):o(t),r}clear(t){const n=Object.keys(this);let a=n.length,r=!1;for(;a--;){const o=n[a];(!t||gt(this,this[o],o,t,!0))&&(delete this[o],r=!0)}return r}normalize(t){const n=this,a={};return u.forEach(this,(r,o)=>{const s=u.findKey(a,o);if(s){n[s]=He(r),delete n[o];return}const i=t?Lr(o):String(o).trim();i!==o&&delete n[o],n[i]=He(r),a[i]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return u.forEach(this,(a,r)=>{a!=null&&a!==!1&&(n[r]=t&&u.isArray(a)?a.join(", "):a)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const a=new this(t);return n.forEach(r=>a.set(r)),a}static accessor(t){const a=(this[Yt]=this[Yt]={accessors:{}}).accessors,r=this.prototype;function o(s){const i=Ee(s);a[i]||(Ar(r,s),a[i]=!0)}return u.isArray(t)?t.forEach(o):o(t),this}};J.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);u.reduceDescriptors(J.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(a){this[n]=a}}});u.freezeMethods(J);function ft(e,t){const n=this||Re,a=t||n,r=J.from(a.headers);let o=a.data;return u.forEach(e,function(i){o=i.call(n,o,r.normalize(),t?t.status:void 0)}),r.normalize(),o}function Yn(e){return!!(e&&e.__CANCEL__)}let Me=class extends B{constructor(t,n,a){super(t??"canceled",B.ERR_CANCELED,n,a),this.name="CanceledError",this.__CANCEL__=!0}};function ea(e,t,n){const a=n.config.validateStatus;!n.status||!a||a(n.status)?e(n):t(new B("Request failed with status code "+n.status,[B.ERR_BAD_REQUEST,B.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}function Rr(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function Mr(e,t){e=e||10;const n=new Array(e),a=new Array(e);let r=0,o=0,s;return t=t!==void 0?t:1e3,function(m){const d=Date.now(),l=a[o];s||(s=d),n[r]=m,a[r]=d;let c=o,f=0;for(;c!==r;)f+=n[c++],c=c%e;if(r=(r+1)%e,r===o&&(o=(o+1)%e),d-s<t)return;const y=l&&d-l;return y?Math.round(f*1e3/y):void 0}}function Pr(e,t){let n=0,a=1e3/t,r,o;const s=(d,l=Date.now())=>{n=l,r=null,o&&(clearTimeout(o),o=null),e(...d)};return[(...d)=>{const l=Date.now(),c=l-n;c>=a?s(d,l):(r=d,o||(o=setTimeout(()=>{o=null,s(r)},a-c)))},()=>r&&s(r)]}const Ge=(e,t,n=3)=>{let a=0;const r=Mr(50,250);return Pr(o=>{const s=o.loaded,i=o.lengthComputable?o.total:void 0,m=s-a,d=r(m),l=s<=i;a=s;const c={loaded:s,total:i,progress:i?s/i:void 0,bytes:m,rate:d||void 0,estimated:d&&i&&l?(i-s)/d:void 0,event:o,lengthComputable:i!=null,[t?"download":"upload"]:!0};e(c)},n)},en=(e,t)=>{const n=e!=null;return[a=>t[0]({lengthComputable:n,total:e,loaded:a}),t[1]]},tn=e=>(...t)=>u.asap(()=>e(...t)),Dr=F.hasStandardBrowserEnv?((e,t)=>n=>(n=new URL(n,F.origin),e.protocol===n.protocol&&e.host===n.host&&(t||e.port===n.port)))(new URL(F.origin),F.navigator&&/(msie|trident)/i.test(F.navigator.userAgent)):()=>!0,Or=F.hasStandardBrowserEnv?{write(e,t,n,a,r,o,s){if(typeof document>"u")return;const i=[`${e}=${encodeURIComponent(t)}`];u.isNumber(n)&&i.push(`expires=${new Date(n).toUTCString()}`),u.isString(a)&&i.push(`path=${a}`),u.isString(r)&&i.push(`domain=${r}`),o===!0&&i.push("secure"),u.isString(s)&&i.push(`SameSite=${s}`),document.cookie=i.join("; ")},read(e){if(typeof document>"u")return null;const t=document.cookie.match(new RegExp("(?:^|; )"+e+"=([^;]*)"));return t?decodeURIComponent(t[1]):null},remove(e){this.write(e,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function jr(e){return typeof e!="string"?!1:/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function Nr(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function ta(e,t,n){let a=!jr(t);return e&&(a||n==!1)?Nr(e,t):t}const nn=e=>e instanceof J?{...e}:e;function de(e,t){t=t||{};const n={};function a(d,l,c,f){return u.isPlainObject(d)&&u.isPlainObject(l)?u.merge.call({caseless:f},d,l):u.isPlainObject(l)?u.merge({},l):u.isArray(l)?l.slice():l}function r(d,l,c,f){if(u.isUndefined(l)){if(!u.isUndefined(d))return a(void 0,d,c,f)}else return a(d,l,c,f)}function o(d,l){if(!u.isUndefined(l))return a(void 0,l)}function s(d,l){if(u.isUndefined(l)){if(!u.isUndefined(d))return a(void 0,d)}else return a(void 0,l)}function i(d,l,c){if(c in t)return a(d,l);if(c in e)return a(void 0,d)}const m={url:o,method:o,data:o,baseURL:s,transformRequest:s,transformResponse:s,paramsSerializer:s,timeout:s,timeoutMessage:s,withCredentials:s,withXSRFToken:s,adapter:s,responseType:s,xsrfCookieName:s,xsrfHeaderName:s,onUploadProgress:s,onDownloadProgress:s,decompress:s,maxContentLength:s,maxBodyLength:s,beforeRedirect:s,transport:s,httpAgent:s,httpsAgent:s,cancelToken:s,socketPath:s,responseEncoding:s,validateStatus:i,headers:(d,l,c)=>r(nn(d),nn(l),c,!0)};return u.forEach(Object.keys({...e,...t}),function(l){if(l==="__proto__"||l==="constructor"||l==="prototype")return;const c=u.hasOwnProp(m,l)?m[l]:r,f=c(e[l],t[l],l);u.isUndefined(f)&&c!==i||(n[l]=f)}),n}const na=e=>{const t=de({},e);let{data:n,withXSRFToken:a,xsrfHeaderName:r,xsrfCookieName:o,headers:s,auth:i}=t;if(t.headers=s=J.from(s),t.url=Zn(ta(t.baseURL,t.url,t.allowAbsoluteUrls),e.params,e.paramsSerializer),i&&s.set("Authorization","Basic "+btoa((i.username||"")+":"+(i.password?unescape(encodeURIComponent(i.password)):""))),u.isFormData(n)){if(F.hasStandardBrowserEnv||F.hasStandardBrowserWebWorkerEnv)s.setContentType(void 0);else if(u.isFunction(n.getHeaders)){const m=n.getHeaders(),d=["content-type","content-length"];Object.entries(m).forEach(([l,c])=>{d.includes(l.toLowerCase())&&s.set(l,c)})}}if(F.hasStandardBrowserEnv&&(a&&u.isFunction(a)&&(a=a(t)),a||a!==!1&&Dr(t.url))){const m=r&&o&&Or.read(o);m&&s.set(r,m)}return t},Ur=typeof XMLHttpRequest<"u",qr=Ur&&function(e){return new Promise(function(n,a){const r=na(e);let o=r.data;const s=J.from(r.headers).normalize();let{responseType:i,onUploadProgress:m,onDownloadProgress:d}=r,l,c,f,y,g;function k(){y&&y(),g&&g(),r.cancelToken&&r.cancelToken.unsubscribe(l),r.signal&&r.signal.removeEventListener("abort",l)}let b=new XMLHttpRequest;b.open(r.method.toUpperCase(),r.url,!0),b.timeout=r.timeout;function _(){if(!b)return;const x=J.from("getAllResponseHeaders"in b&&b.getAllResponseHeaders()),O={data:!i||i==="text"||i==="json"?b.responseText:b.response,status:b.status,statusText:b.statusText,headers:x,config:e,request:b};ea(function(H){n(H),k()},function(H){a(H),k()},O),b=null}"onloadend"in b?b.onloadend=_:b.onreadystatechange=function(){!b||b.readyState!==4||b.status===0&&!(b.responseURL&&b.responseURL.indexOf("file:")===0)||setTimeout(_)},b.onabort=function(){b&&(a(new B("Request aborted",B.ECONNABORTED,e,b)),b=null)},b.onerror=function(R){const O=R&&R.message?R.message:"Network Error",q=new B(O,B.ERR_NETWORK,e,b);q.event=R||null,a(q),b=null},b.ontimeout=function(){let R=r.timeout?"timeout of "+r.timeout+"ms exceeded":"timeout exceeded";const O=r.transitional||Lt;r.timeoutErrorMessage&&(R=r.timeoutErrorMessage),a(new B(R,O.clarifyTimeoutError?B.ETIMEDOUT:B.ECONNABORTED,e,b)),b=null},o===void 0&&s.setContentType(null),"setRequestHeader"in b&&u.forEach(s.toJSON(),function(R,O){b.setRequestHeader(O,R)}),u.isUndefined(r.withCredentials)||(b.withCredentials=!!r.withCredentials),i&&i!=="json"&&(b.responseType=r.responseType),d&&([f,g]=Ge(d,!0),b.addEventListener("progress",f)),m&&b.upload&&([c,y]=Ge(m),b.upload.addEventListener("progress",c),b.upload.addEventListener("loadend",y)),(r.cancelToken||r.signal)&&(l=x=>{b&&(a(!x||x.type?new Me(null,e,b):x),b.abort(),b=null)},r.cancelToken&&r.cancelToken.subscribe(l),r.signal&&(r.signal.aborted?l():r.signal.addEventListener("abort",l)));const A=Rr(r.url);if(A&&F.protocols.indexOf(A)===-1){a(new B("Unsupported protocol "+A+":",B.ERR_BAD_REQUEST,e));return}b.send(o||null)})},Hr=(e,t)=>{const{length:n}=e=e?e.filter(Boolean):[];if(t||n){let a=new AbortController,r;const o=function(d){if(!r){r=!0,i();const l=d instanceof Error?d:this.reason;a.abort(l instanceof B?l:new Me(l instanceof Error?l.message:l))}};let s=t&&setTimeout(()=>{s=null,o(new B(`timeout of ${t}ms exceeded`,B.ETIMEDOUT))},t);const i=()=>{e&&(s&&clearTimeout(s),s=null,e.forEach(d=>{d.unsubscribe?d.unsubscribe(o):d.removeEventListener("abort",o)}),e=null)};e.forEach(d=>d.addEventListener("abort",o));const{signal:m}=a;return m.unsubscribe=()=>u.asap(i),m}},Fr=function*(e,t){let n=e.byteLength;if(n<t){yield e;return}let a=0,r;for(;a<n;)r=a+t,yield e.slice(a,r),a=r},Vr=async function*(e,t){for await(const n of Gr(e))yield*Fr(n,t)},Gr=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:n,value:a}=await t.read();if(n)break;yield a}}finally{await t.cancel()}},an=(e,t,n,a)=>{const r=Vr(e,t);let o=0,s,i=m=>{s||(s=!0,a&&a(m))};return new ReadableStream({async pull(m){try{const{done:d,value:l}=await r.next();if(d){i(),m.close();return}let c=l.byteLength;if(n){let f=o+=c;n(f)}m.enqueue(new Uint8Array(l))}catch(d){throw i(d),d}},cancel(m){return i(m),r.return()}},{highWaterMark:2})},rn=64*1024,{isFunction:Ue}=u,Jr=(({Request:e,Response:t})=>({Request:e,Response:t}))(u.global),{ReadableStream:on,TextEncoder:sn}=u.global,dn=(e,...t)=>{try{return!!e(...t)}catch{return!1}},Wr=e=>{e=u.merge.call({skipUndefined:!0},Jr,e);const{fetch:t,Request:n,Response:a}=e,r=t?Ue(t):typeof fetch=="function",o=Ue(n),s=Ue(a);if(!r)return!1;const i=r&&Ue(on),m=r&&(typeof sn=="function"?(g=>k=>g.encode(k))(new sn):async g=>new Uint8Array(await new n(g).arrayBuffer())),d=o&&i&&dn(()=>{let g=!1;const k=new n(F.origin,{body:new on,method:"POST",get duplex(){return g=!0,"half"}}).headers.has("Content-Type");return g&&!k}),l=s&&i&&dn(()=>u.isReadableStream(new a("").body)),c={stream:l&&(g=>g.body)};r&&["text","arrayBuffer","blob","formData","stream"].forEach(g=>{!c[g]&&(c[g]=(k,b)=>{let _=k&&k[g];if(_)return _.call(k);throw new B(`Response type '${g}' is not supported`,B.ERR_NOT_SUPPORT,b)})});const f=async g=>{if(g==null)return 0;if(u.isBlob(g))return g.size;if(u.isSpecCompliantForm(g))return(await new n(F.origin,{method:"POST",body:g}).arrayBuffer()).byteLength;if(u.isArrayBufferView(g)||u.isArrayBuffer(g))return g.byteLength;if(u.isURLSearchParams(g)&&(g=g+""),u.isString(g))return(await m(g)).byteLength},y=async(g,k)=>{const b=u.toFiniteNumber(g.getContentLength());return b??f(k)};return async g=>{let{url:k,method:b,data:_,signal:A,cancelToken:x,timeout:R,onDownloadProgress:O,onUploadProgress:q,responseType:H,headers:z,withCredentials:Q="same-origin",fetchOptions:T}=na(g),U=t||fetch;H=H?(H+"").toLowerCase():"text";let W=Hr([A,x&&x.toAbortSignal()],R),Y=null;const ee=W&&W.unsubscribe&&(()=>{W.unsubscribe()});let X;try{if(q&&d&&b!=="get"&&b!=="head"&&(X=await y(z,_))!==0){let ae=new n(k,{method:"POST",body:_,duplex:"half"}),le;if(u.isFormData(_)&&(le=ae.headers.get("content-type"))&&z.setContentType(le),ae.body){const[mt,Ne]=en(X,Ge(tn(q)));_=an(ae.body,rn,mt,Ne)}}u.isString(Q)||(Q=Q?"include":"omit");const N=o&&"credentials"in n.prototype,je={...T,signal:W,method:b.toUpperCase(),headers:z.normalize().toJSON(),body:_,duplex:"half",credentials:N?Q:void 0};Y=o&&new n(k,je);let ne=await(o?U(Y,T):U(k,je));const Jt=l&&(H==="stream"||H==="response");if(l&&(O||Jt&&ee)){const ae={};["status","statusText","headers"].forEach(Wt=>{ae[Wt]=ne[Wt]});const le=u.toFiniteNumber(ne.headers.get("content-length")),[mt,Ne]=O&&en(le,Ge(tn(O),!0))||[];ne=new a(an(ne.body,rn,mt,()=>{Ne&&Ne(),ee&&ee()}),ae)}H=H||"text";let wa=await c[u.findKey(c,H)||"text"](ne,g);return!Jt&&ee&&ee(),await new Promise((ae,le)=>{ea(ae,le,{data:wa,headers:J.from(ne.headers),status:ne.status,statusText:ne.statusText,config:g,request:Y})})}catch(N){throw ee&&ee(),N&&N.name==="TypeError"&&/Load failed|fetch/i.test(N.message)?Object.assign(new B("Network Error",B.ERR_NETWORK,g,Y,N&&N.response),{cause:N.cause||N}):B.from(N,N&&N.code,g,Y,N&&N.response)}}},Kr=new Map,aa=e=>{let t=e&&e.env||{};const{fetch:n,Request:a,Response:r}=t,o=[a,r,n];let s=o.length,i=s,m,d,l=Kr;for(;i--;)m=o[i],d=l.get(m),d===void 0&&l.set(m,d=i?new Map:Wr(t)),l=d;return d};aa();const Rt={http:ur,xhr:qr,fetch:{get:aa}};u.forEach(Rt,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const ln=e=>`- ${e}`,zr=e=>u.isFunction(e)||e===null||e===!1;function Xr(e,t){e=u.isArray(e)?e:[e];const{length:n}=e;let a,r;const o={};for(let s=0;s<n;s++){a=e[s];let i;if(r=a,!zr(a)&&(r=Rt[(i=String(a)).toLowerCase()],r===void 0))throw new B(`Unknown adapter '${i}'`);if(r&&(u.isFunction(r)||(r=r.get(t))))break;o[i||"#"+s]=r}if(!r){const s=Object.entries(o).map(([m,d])=>`adapter ${m} `+(d===!1?"is not supported by the environment":"is not available in the build"));let i=n?s.length>1?`since :
`+s.map(ln).join(`
`):" "+ln(s[0]):"as no adapter specified";throw new B("There is no suitable adapter to dispatch the request "+i,"ERR_NOT_SUPPORT")}return r}const ra={getAdapter:Xr,adapters:Rt};function bt(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new Me(null,e)}function cn(e){return bt(e),e.headers=J.from(e.headers),e.data=ft.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),ra.getAdapter(e.adapter||Re.adapter,e)(e).then(function(a){return bt(e),a.data=ft.call(e,e.transformResponse,a),a.headers=J.from(a.headers),a},function(a){return Yn(a)||(bt(e),a&&a.response&&(a.response.data=ft.call(e,e.transformResponse,a.response),a.response.headers=J.from(a.response.headers))),Promise.reject(a)})}const oa="1.13.6",lt={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{lt[e]=function(a){return typeof a===e||"a"+(t<1?"n ":" ")+e}});const un={};lt.transitional=function(t,n,a){function r(o,s){return"[Axios v"+oa+"] Transitional option '"+o+"'"+s+(a?". "+a:"")}return(o,s,i)=>{if(t===!1)throw new B(r(s," has been removed"+(n?" in "+n:"")),B.ERR_DEPRECATED);return n&&!un[s]&&(un[s]=!0,console.warn(r(s," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(o,s,i):!0}};lt.spelling=function(t){return(n,a)=>(console.warn(`${a} is likely a misspelling of ${t}`),!0)};function Zr(e,t,n){if(typeof e!="object")throw new B("options must be an object",B.ERR_BAD_OPTION_VALUE);const a=Object.keys(e);let r=a.length;for(;r-- >0;){const o=a[r],s=t[o];if(s){const i=e[o],m=i===void 0||s(i,o,e);if(m!==!0)throw new B("option "+o+" must be "+m,B.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new B("Unknown option "+o,B.ERR_BAD_OPTION)}}const Fe={assertOptions:Zr,validators:lt},K=Fe.validators;let ie=class{constructor(t){this.defaults=t||{},this.interceptors={request:new Qt,response:new Qt}}async request(t,n){try{return await this._request(t,n)}catch(a){if(a instanceof Error){let r={};Error.captureStackTrace?Error.captureStackTrace(r):r=new Error;const o=r.stack?r.stack.replace(/^.+\n/,""):"";try{a.stack?o&&!String(a.stack).endsWith(o.replace(/^.+\n.+\n/,""))&&(a.stack+=`
`+o):a.stack=o}catch{}}throw a}}_request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=de(this.defaults,n);const{transitional:a,paramsSerializer:r,headers:o}=n;a!==void 0&&Fe.assertOptions(a,{silentJSONParsing:K.transitional(K.boolean),forcedJSONParsing:K.transitional(K.boolean),clarifyTimeoutError:K.transitional(K.boolean),legacyInterceptorReqResOrdering:K.transitional(K.boolean)},!1),r!=null&&(u.isFunction(r)?n.paramsSerializer={serialize:r}:Fe.assertOptions(r,{encode:K.function,serialize:K.function},!0)),n.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?n.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:n.allowAbsoluteUrls=!0),Fe.assertOptions(n,{baseUrl:K.spelling("baseURL"),withXsrfToken:K.spelling("withXSRFToken")},!0),n.method=(n.method||this.defaults.method||"get").toLowerCase();let s=o&&u.merge(o.common,o[n.method]);o&&u.forEach(["delete","get","head","post","put","patch","common"],g=>{delete o[g]}),n.headers=J.concat(s,o);const i=[];let m=!0;this.interceptors.request.forEach(function(k){if(typeof k.runWhen=="function"&&k.runWhen(n)===!1)return;m=m&&k.synchronous;const b=n.transitional||Lt;b&&b.legacyInterceptorReqResOrdering?i.unshift(k.fulfilled,k.rejected):i.push(k.fulfilled,k.rejected)});const d=[];this.interceptors.response.forEach(function(k){d.push(k.fulfilled,k.rejected)});let l,c=0,f;if(!m){const g=[cn.bind(this),void 0];for(g.unshift(...i),g.push(...d),f=g.length,l=Promise.resolve(n);c<f;)l=l.then(g[c++],g[c++]);return l}f=i.length;let y=n;for(;c<f;){const g=i[c++],k=i[c++];try{y=g(y)}catch(b){k.call(this,b);break}}try{l=cn.call(this,y)}catch(g){return Promise.reject(g)}for(c=0,f=d.length;c<f;)l=l.then(d[c++],d[c++]);return l}getUri(t){t=de(this.defaults,t);const n=ta(t.baseURL,t.url,t.allowAbsoluteUrls);return Zn(n,t.params,t.paramsSerializer)}};u.forEach(["delete","get","head","options"],function(t){ie.prototype[t]=function(n,a){return this.request(de(a||{},{method:t,url:n,data:(a||{}).data}))}});u.forEach(["post","put","patch"],function(t){function n(a){return function(o,s,i){return this.request(de(i||{},{method:t,headers:a?{"Content-Type":"multipart/form-data"}:{},url:o,data:s}))}}ie.prototype[t]=n(),ie.prototype[t+"Form"]=n(!0)});let Qr=class sa{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(o){n=o});const a=this;this.promise.then(r=>{if(!a._listeners)return;let o=a._listeners.length;for(;o-- >0;)a._listeners[o](r);a._listeners=null}),this.promise.then=r=>{let o;const s=new Promise(i=>{a.subscribe(i),o=i}).then(r);return s.cancel=function(){a.unsubscribe(o)},s},t(function(o,s,i){a.reason||(a.reason=new Me(o,s,i),n(a.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}toAbortSignal(){const t=new AbortController,n=a=>{t.abort(a)};return this.subscribe(n),t.signal.unsubscribe=()=>this.unsubscribe(n),t.signal}static source(){let t;return{token:new sa(function(r){t=r}),cancel:t}}};function Yr(e){return function(n){return e.apply(null,n)}}function eo(e){return u.isObject(e)&&e.isAxiosError===!0}const It={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(It).forEach(([e,t])=>{It[t]=e});function ia(e){const t=new ie(e),n=Un(ie.prototype.request,t);return u.extend(n,ie.prototype,t,{allOwnKeys:!0}),u.extend(n,t,null,{allOwnKeys:!0}),n.create=function(r){return ia(de(e,r))},n}const j=ia(Re);j.Axios=ie;j.CanceledError=Me;j.CancelToken=Qr;j.isCancel=Yn;j.VERSION=oa;j.toFormData=dt;j.AxiosError=B;j.Cancel=j.CanceledError;j.all=function(t){return Promise.all(t)};j.spread=Yr;j.isAxiosError=eo;j.mergeConfig=de;j.AxiosHeaders=J;j.formToJSON=e=>Qn(u.isHTMLForm(e)?new FormData(e):e);j.getAdapter=ra.getAdapter;j.HttpStatusCode=It;j.default=j;const{Axios:oi,AxiosError:si,CanceledError:ii,isCancel:di,CancelToken:li,VERSION:ci,all:ui,Cancel:mi,isAxiosError:pi,spread:gi,toFormData:fi,AxiosHeaders:bi,HttpStatusCode:hi,formToJSON:ki,getAdapter:yi,mergeConfig:vi}=j;window.axios=j;window.axios.defaults.headers.common["X-Requested-With"]="XMLHttpRequest";const Mt="transit_user",Je="transit_token",St="transit_pending_toast";function ve(){try{return typeof window<"u"&&typeof window.localStorage<"u"}catch{return!1}}function da(){try{return typeof window<"u"&&typeof window.sessionStorage<"u"}catch{return!1}}function to(){if(window.transitAuthUser)return window.transitAuthUser;if(!ve())return null;const e=window.localStorage.getItem(Mt);if(!e)return null;try{return JSON.parse(e)}catch{return $e(),null}}function la(e){if(!ve()){window.transitAuthUser=e;return}window.transitAuthUser=e,window.localStorage.setItem(Mt,JSON.stringify(e))}function no(){if(!ve()){window.transitAuthUser=null;return}window.transitAuthUser=null,window.localStorage.removeItem(Mt)}function Pt(){return typeof window<"u"&&typeof window.transitAuthToken=="string"&&window.transitAuthToken!==""?window.transitAuthToken:ve()?window.localStorage.getItem(Je):null}function ao(e){const t=typeof e=="string"?e:"";if(!ve()){window.transitAuthToken=t||null;return}if(window.transitAuthToken=t||null,t===""){window.localStorage.removeItem(Je);return}window.localStorage.setItem(Je,t)}function ro(){if(!ve()){window.transitAuthToken=null;return}window.transitAuthToken=null,window.localStorage.removeItem(Je)}function oo(e){da()&&window.sessionStorage.setItem(St,JSON.stringify(e))}function so(){if(!da())return null;const e=window.sessionStorage.getItem(St);if(!e)return null;window.sessionStorage.removeItem(St);try{return JSON.parse(e)}catch{return null}}function $e(){no(),ro()}function ca(e,t){if(!e)return t;if(typeof e.detail=="string"&&e.detail!=="")return e.detail;if(typeof e.message=="string"&&e.message!=="")return e.message;if(e.errors&&typeof e.errors=="object"){const n=Object.values(e.errors).flat()[0];if(typeof n=="string"&&n!=="")return n}return t}function mn(){return document.body.dataset.apiBase||"/api"}function ua(e=""){const t=String(e).replace(/^\/+/,"");return t===""?mn():`${mn()}/${t}`}async function I(e,t={}){const{method:n="GET",body:a=null,headers:r={},auth:o=!0}=t,s=new Headers(r);s.set("Accept","application/json"),s.set("X-Requested-With","XMLHttpRequest");let i=a;if(a&&!(a instanceof FormData)&&!(a instanceof Blob)&&(s.set("Content-Type","application/json"),i=JSON.stringify(a)),o){const c=Pt();c&&s.set("Authorization",`Bearer ${c}`)}if(!["GET","HEAD","OPTIONS"].includes(n.toUpperCase())){const c=document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");c&&s.set("X-CSRF-TOKEN",c)}const m=await fetch(ua(e),{method:n,headers:s,body:i,credentials:"same-origin"});let d=null;const l=m.headers.get("content-type")||"";if(m.status!==204&&(d=l.includes("application/json")?await m.json():await m.text()),!m.ok){m.status===401&&($e(),(document.body.dataset.routeGuard||"none")==="protected"&&window.location.replace(document.body.dataset.loginUrl||"/login"));const c=ca(d,`Request gagal (${m.status})`),f=new Error(c);throw f.status=m.status,f.data=d,f}return d}async function Dt(e,t="export.csv"){const n=new Headers({Accept:"text/csv,application/octet-stream","X-Requested-With":"XMLHttpRequest"}),a=Pt();a&&n.set("Authorization",`Bearer ${a}`);const r=await fetch(ua(e),{method:"GET",headers:n,credentials:"same-origin"});if(!r.ok){let c=null;throw(r.headers.get("content-type")||"").includes("application/json")&&(c=await r.json()),new Error(ca(c,"Gagal mengunduh file"))}const o=await r.blob(),m=(r.headers.get("content-disposition")||"").match(/filename="?([^"]+)"?/i)?.[1]||t,d=window.URL.createObjectURL(o),l=document.createElement("a");l.href=d,l.download=m,document.body.appendChild(l),l.click(),l.remove(),window.URL.revokeObjectURL(d)}function we(e,t){const n=document.getElementById(e);n&&(n.textContent=t)}function io(e){const t=e?.role||"";document.querySelectorAll("[data-role-scope]").forEach(n=>{const a=n.dataset.roleScope,r=a==="admin"?["Super Admin","Admin"].includes(t):a==="super"?t==="Super Admin":!0;n.hidden=!r})}function ma(){return to()}function We(e){if(io(e),!e)return;const t=e.nama||"Admin",n=t.trim().split(/\s+/)[0]||"Admin",a=e.email||"admin@pekanbaru.com";we("sidebar-user-name",t),we("sidebar-user-email",a),we("header-user-name",n),we("dropdown-user-name",t),we("dropdown-user-email",a)}function pa(e){return typeof e.access_token=="string"&&e.access_token!==""&&ao(e.access_token),la(e.user),We(e.user),e}async function lo(e){const t=await I("/auth/login",{method:"POST",body:e,auth:!1});return pa(t)}async function co(e){const t=await I("/auth/register",{method:"POST",body:e,auth:!1});return pa(t)}async function pn(){const e=await I("/auth/me");return la(e),We(e),e}async function uo(){try{await I("/auth/logout",{method:"POST"})}catch(e){if(e?.status!==401)throw e}$e(),oo({type:"success",title:"Logout berhasil",message:"Sampai jumpa kembali!"}),window.location.replace(document.body.dataset.loginUrl||"/login")}function gn(e){window.location.replace(e)}async function mo(){const e=document.body.dataset.routeGuard||"none",t=document.body.dataset.loginUrl||"/login",n=document.body.dataset.dashboardUrl||"/dashboard",a=ma();if(e==="public"){try{const r=await pn();return gn(n),{user:r}}catch{(a||Pt())&&$e()}return{user:null}}if(e==="protected")try{return{user:await pn()}}catch{return $e(),gn(t),{user:null}}return{user:a}}function Ot(){return Array.from(document.querySelectorAll(".modal-shell")).filter(e=>!e.hidden)}function ga(){document.body.style.overflow=Ot().length>0?"hidden":""}function D(e){const t=document.getElementById(e);t&&(t.hidden=!1,ga())}function V(e=null){if(e){const t=document.getElementById(e);t&&(t.hidden=!0)}else Ot().forEach(t=>{t.hidden=!0});ga()}function po(){document.addEventListener("click",e=>{const t=e.target.closest("[data-modal-open]");if(t){D(t.dataset.modalOpen);return}const n=e.target.closest("[data-modal-close]");if(n){const a=n.dataset.modalClose||n.closest(".modal-shell")?.id;V(a||void 0)}}),document.addEventListener("keydown",e=>{if(e.key!=="Escape")return;const t=Ot().pop();t&&V(t.id)})}function jt(e,t,n){const a=document.getElementById("transit-toast-root");if(!a)return;const r=document.createElement("div");r.className=`transit-toast ${n==="error"?"is-error":""} ${n==="info"?"is-info":""}`.trim(),r.innerHTML=`
        <div>
            <strong>${e}</strong>
            <p>${t}</p>
        </div>
    `,a.appendChild(r),window.requestAnimationFrame(()=>{r.classList.add("is-visible")}),window.setTimeout(()=>{r.classList.remove("is-visible"),window.setTimeout(()=>r.remove(),180)},3600)}function P(e,t="Berhasil"){jt(t,e,"success")}function v(e,t="Gagal"){jt(t,e,"error")}function go(e,t="Info"){jt(t,e,"info")}function Be(e){const t=document.querySelector("[data-sidebar]"),n=document.querySelector("[data-sidebar-overlay]");!t||!n||(t.classList.toggle("is-open",e),n.hidden=!e)}function Ve(e=null){document.querySelectorAll("[data-user-dropdown]").forEach(t=>{if(e&&t===e)return;t.classList.remove("is-open");const n=t.querySelector("[data-user-menu-trigger]"),a=t.querySelector("[data-user-menu-panel]");n&&n.setAttribute("aria-expanded","false"),a&&(a.hidden=!0)})}function fo(e,t=null){if(!e)return;const n=e.querySelector("[data-user-menu-trigger]"),a=e.querySelector("[data-user-menu-panel]"),r=t??!e.classList.contains("is-open");Ve(r?e:null),e.classList.toggle("is-open",r),n&&n.setAttribute("aria-expanded",r?"true":"false"),a&&(a.hidden=!r)}function bo(){document.querySelector("[data-sidebar-open]")?.addEventListener("click",()=>{Be(!0)}),document.querySelector("[data-sidebar-close]")?.addEventListener("click",()=>{Be(!1)}),document.querySelector("[data-sidebar-overlay]")?.addEventListener("click",()=>{Be(!1)}),document.querySelectorAll("[data-user-dropdown]").forEach(e=>{e.querySelector("[data-user-menu-trigger]")?.addEventListener("click",t=>{t.stopPropagation(),fo(e)})}),document.addEventListener("click",e=>{e.target.closest("[data-user-dropdown]")||Ve()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&(Ve(),Be(!1))}),window.addEventListener("resize",()=>{window.innerWidth>1100&&Be(!1)}),document.querySelectorAll("[data-auth-logout]").forEach(e=>{e.addEventListener("click",async()=>{V(),Ve();try{e.disabled=!0,await uo()}catch(t){e.disabled=!1,v(t.message||"Gagal logout")}})})}const fa={login:{title:"Selamat Datang!",description:"Masuk ke akun Anda untuk melanjutkan",submit:"Masuk",switchText:"Belum punya akun?",switchAction:"Daftar sekarang"},register:{title:"Buat Akun Baru",description:"Daftar untuk mulai menggunakan sistem",submit:"Daftar",switchText:"Sudah punya akun?",switchAction:"Masuk"}};function fn(e,t){const n=fa[e];t.form.dataset.authMode=e,t.title.textContent=n.title,t.description.textContent=n.description,t.submitText.textContent=n.submit,t.switchText&&(t.switchText.textContent=n.switchText),t.switchButton&&(t.switchButton.textContent=n.switchAction),t.nameField.hidden=e!=="register",t.nameInput.required=e==="register"}function ho(){const e=document.getElementById("auth-form");if(!e)return;const t={form:e,title:document.querySelector("[data-auth-title]"),description:document.querySelector("[data-auth-description]"),submitText:document.querySelector("[data-auth-submit-text]"),switchText:document.querySelector("[data-auth-switch-text]"),switchButton:document.querySelector("[data-toggle-auth-mode]"),nameField:document.getElementById("auth-name-field"),nameInput:document.getElementById("nama"),emailInput:document.getElementById("email"),passwordInput:document.getElementById("password"),passwordToggle:document.querySelector("[data-toggle-password]"),submitButton:document.getElementById("auth-submit-button")},n=document.body.dataset.dashboardUrl||"/dashboard";fn("login",t),t.switchButton?.addEventListener("click",()=>{const a=t.form.dataset.authMode==="login"?"register":"login";fn(a,t)}),t.passwordToggle?.addEventListener("click",()=>{const a=t.passwordInput.type==="password"?"text":"password";t.passwordInput.type=a,t.passwordToggle.textContent=a==="password"?"Lihat":"Sembunyikan"}),e.addEventListener("submit",async a=>{a.preventDefault();const r=new FormData(e),o=e.dataset.authMode||"login",s={email:String(r.get("email")||"").trim(),password:String(r.get("password")||"").trim()};o==="register"&&(s.nama=String(r.get("nama")||"").trim()),t.submitButton.disabled=!0,t.submitText.textContent=o==="login"?"Memproses...":"Mendaftarkan...";try{o==="login"?(await lo(s),P("Selamat datang kembali","Login berhasil!")):(await co(s),P("Akun Anda telah dibuat","Registrasi berhasil!")),window.location.replace(n)}catch(i){v(i.message||"Terjadi kesalahan",o==="login"?"Login gagal":"Registrasi gagal")}finally{t.submitButton.disabled=!1,t.submitText.textContent=fa[o].submit}})}const ko=new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}),yo=new Intl.NumberFormat("id-ID");function M(e){return ko.format(Number(e)||0)}function L(e){return yo.format(Number(e)||0)}function p(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Pe(e,t=300){let n=null;return(...a)=>{window.clearTimeout(n),n=window.setTimeout(()=>e(...a),t)}}function De(e,t,n,a){if(n===0||a===0)return"Menampilkan 0 - 0 dari 0 data";const r=(e-1)*t+1,o=r+a-1;return`Menampilkan ${r} - ${o} dari ${n} data`}function vo(e){if(!e)return"-";const t=new Date(e);return Number.isNaN(t.getTime())?e:new Intl.DateTimeFormat("id-ID",{day:"2-digit",month:"short",year:"numeric"}).format(t)}function Oe(){return new Date().toISOString().slice(0,10)}function se(e,t,n="Memproses..."){e&&(e.dataset.defaultText||(e.dataset.defaultText=e.textContent.trim()),e.disabled=t,e.textContent=t?n:e.dataset.defaultText)}const Ke=["#059669","#10B981","#34D399","#6EE7B7","#A7F3D0"],te={revenueChart:null,passengerChart:null,mobilChart:null};function Eo(){const e=document.getElementById("dashboard-initial-state");if(!e)return{stats:{},revenueData:[],mobilRevenue:[]};try{return JSON.parse(e.textContent||"{}")}catch{return{stats:{},revenueData:[],mobilRevenue:[]}}}function Nt(e){e&&typeof e.destroy=="function"&&e.destroy()}function wo(e,t){const n=document.querySelector(`[data-stat="${e}"]`);if(!n)return;const a=["total_uang_bersih","total_uang_pc"];n.textContent=a.includes(e)?M(t):L(t)}function ba(e,t,n){const a=document.getElementById(e),r=document.getElementById(t);a&&(a.hidden=!n),r&&(r.hidden=n)}function Bo(){return"#065f46"}function $t(){return"#d1fae5"}function Ut(){return{backgroundColor:"#ffffff",titleColor:"#064e3b",bodyColor:"#065f46",borderColor:"#d1fae5",borderWidth:1,padding:12,cornerRadius:12,displayColors:!0}}function Io(e){const t=document.getElementById("dashboard-revenue-chart"),n=Array.isArray(e)&&e.length>0;if(ba("dashboard-revenue-chart","dashboard-revenue-empty",n),Nt(te.revenueChart),!t||!window.Chart||!n){te.revenueChart=null;return}te.revenueChart=new window.Chart(t,{type:"line",data:{labels:e.map(a=>a.bulan),datasets:[{label:"Pendapatan Bersih",data:e.map(a=>a.uang_bersih),borderColor:"#059669",backgroundColor:"rgba(5, 150, 105, 0.08)",fill:!1,tension:.35,pointRadius:4,pointHoverRadius:5,pointBackgroundColor:"#059669",pointBorderColor:"#ffffff",pointBorderWidth:2,borderWidth:3},{label:"Uang PC",data:e.map(a=>a.uang_pc),borderColor:"#f59e0b",backgroundColor:"rgba(245, 158, 11, 0.1)",fill:!1,tension:.35,pointRadius:4,pointHoverRadius:5,pointBackgroundColor:"#f59e0b",pointBorderColor:"#ffffff",pointBorderWidth:2,borderWidth:3}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{labels:{color:Bo(),usePointStyle:!0,pointStyle:"circle",boxWidth:8,boxHeight:8,padding:18}},tooltip:{...Ut(),callbacks:{label(a){return`${a.dataset.label}: ${M(a.parsed.y)}`}}}},scales:{x:{ticks:{color:"#047857",font:{size:12}},grid:{color:$t()},border:{display:!1}},y:{ticks:{color:"#047857",font:{size:12},callback(a){return`${Math.round(Number(a)/1e6)}jt`}},grid:{color:$t()},border:{display:!1}}}}})}function So(e){const t=document.getElementById("dashboard-passenger-chart"),n=Array.isArray(e)&&e.length>0;if(ba("dashboard-passenger-chart","dashboard-passenger-empty",n),Nt(te.passengerChart),!t||!window.Chart||!n){te.passengerChart=null;return}te.passengerChart=new window.Chart(t,{type:"bar",data:{labels:e.map(a=>a.bulan),datasets:[{label:"Penumpang",data:e.map(a=>a.penumpang),backgroundColor:"#10B981",borderRadius:8,maxBarThickness:44}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{...Ut(),callbacks:{label(a){return`Penumpang: ${L(a.parsed.y)}`}}}},scales:{x:{ticks:{color:"#047857",font:{size:12}},grid:{color:"rgba(0, 0, 0, 0)"},border:{display:!1}},y:{ticks:{color:"#047857",font:{size:12}},grid:{color:$t()},border:{display:!1}}}}})}function $o(e){const t=document.getElementById("dashboard-mobil-list");t&&(t.innerHTML=e.map((n,a)=>`
        <div class="dashboard-mobil-item">
            <div class="dashboard-mobil-meta">
                <span class="dashboard-mobil-dot" style="background-color: ${Ke[a%Ke.length]}"></span>
                <div>
                    <p class="dashboard-mobil-code">${p(n.kode_mobil)}</p>
                    <p class="dashboard-mobil-trips">${L(n.total_trips)} trip</p>
                    <p class="dashboard-mobil-passengers">${L(n.total_penumpang)} penumpang</p>
                </div>
            </div>
            <p class="dashboard-mobil-value">${M(n.total_uang_bersih)}</p>
        </div>
    `).join(""))}function Co(e){const t=document.getElementById("dashboard-mobil-chart"),n=document.getElementById("dashboard-mobil-content"),a=document.getElementById("dashboard-mobil-empty"),r=document.getElementById("dashboard-mobil-chart-empty"),o=document.getElementById("dashboard-mobil-list"),s=Array.isArray(e)&&e.length>0,i=s&&e.some(m=>Number(m.total_uang_bersih)>0);if(Nt(te.mobilChart),n&&(n.hidden=!s),a&&(a.hidden=s),t&&(t.hidden=!i),r&&(r.hidden=i),s?$o(e):o&&(o.innerHTML=""),!t||!window.Chart||!i){te.mobilChart=null;return}te.mobilChart=new window.Chart(t,{type:"doughnut",data:{labels:e.map(m=>m.kode_mobil),datasets:[{data:e.map(m=>m.total_uang_bersih),backgroundColor:e.map((m,d)=>Ke[d%Ke.length]),borderColor:"#ffffff",borderWidth:6,hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"58%",plugins:{legend:{display:!1},tooltip:{...Ut(),callbacks:{label(m){const d=e[m.dataIndex]||{};return`${m.label}: ${M(m.parsed)} / ${L(d.total_penumpang||0)} penumpang`}}}}}})}function bn(e){Object.entries(e.stats||{}).forEach(([t,n])=>wo(t,n)),Io(e.revenueData||[]),So(e.revenueData||[]),Co(e.mobilRevenue||[])}async function _o(){const[e,t,n]=await Promise.all([I("/statistics/dashboard"),I("/statistics/revenue-chart"),I("/statistics/mobil-revenue")]);return{stats:e,revenueData:t,mobilRevenue:n}}function hn(e){const t=document.querySelector("[data-dashboard-loading]"),n=document.querySelector("[data-dashboard-content]"),a=document.getElementById("dashboard-refresh-btn");t&&(t.hidden=!e),n&&(n.hidden=e),a&&(a.disabled=e)}async function xo(){const e=document.getElementById("dashboard-refresh-btn");e&&(bn(Eo()),e.addEventListener("click",async()=>{hn(!0);try{bn(await _o())}catch{v("Silakan coba lagi","Gagal memuat data")}finally{hn(!1)}}))}const C={data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1},he=10;function To(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function Lo(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 21C15 17.4 18 14.4 18 10.5C18 7.18629 15.3137 4.5 12 4.5C8.68629 4.5 6 7.18629 6 10.5C6 14.4 9 17.4 12 21Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
            <circle cx="12" cy="10.5" r="2.25" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function Ao(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Ro(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function ze(e){const t=document.getElementById("driver-submit-btn");C.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":C.editItem?"Perbarui":"Simpan")}function Mo(){const e=document.getElementById("drivers-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="drivers-table-state">
                <div class="drivers-loading-inline">
                    <span class="drivers-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function Po(){const e=document.getElementById("drivers-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="drivers-table-state drivers-empty-copy">
                Belum ada data driver
            </td>
        </tr>
    `)}function kn(){const e=document.getElementById("drivers-table-body");if(e){if(C.loading){Mo();return}if(C.data.length===0){Po();return}e.innerHTML=C.data.map((t,n)=>`
        <tr class="drivers-row" data-testid="driver-row-${t.id}">
            <td class="drivers-index-cell">${(C.page-1)*he+n+1}</td>
            <td>
                <div class="drivers-user-cell">
                    <span class="drivers-user-avatar" aria-hidden="true">
                        ${To()}
                    </span>
                    <span class="drivers-user-name">${p(t.nama)}</span>
                </div>
            </td>
            <td>
                <div class="drivers-location-cell">
                    <span class="drivers-location-icon" aria-hidden="true">${Lo()}</span>
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
                        ${Ao()}
                    </button>
                    <button
                        class="drivers-icon-button drivers-icon-button-danger"
                        type="button"
                        data-driver-delete="${t.id}"
                        data-driver-name="${p(t.nama)}"
                        data-testid="delete-driver-${t.id}"
                        aria-label="Hapus driver ${p(t.nama)}"
                    >
                        ${Ro()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function yn(){const e=document.getElementById("drivers-pagination-shell"),t=document.getElementById("drivers-pagination-info"),n=document.getElementById("drivers-pagination-page"),a=document.getElementById("drivers-prev-page-btn"),r=document.getElementById("drivers-next-page-btn"),o=Math.max(1,Math.ceil(C.totalCount/he));e&&(e.hidden=o<=1),t&&(t.textContent=De(C.page,he,C.totalCount,C.data.length)),n&&(n.textContent=`${C.page} / ${o}`),a&&(a.disabled=C.page===1),r&&(r.disabled=C.page>=o)}async function ce(){C.loading=!0,kn(),yn();try{const[e,t]=await Promise.all([I(`/drivers?page=${C.page}&limit=${he}${C.search?`&search=${encodeURIComponent(C.search)}`:""}`),I(`/drivers/count${C.search?`?search=${encodeURIComponent(C.search)}`:""}`)]);C.data=Array.isArray(e)?e:[],C.totalCount=Number(t.count||0)}finally{C.loading=!1,kn(),yn()}}function vn(){const e=document.getElementById("driver-form"),t=document.getElementById("driver-form-title"),n=document.getElementById("driver-form-description"),a=document.getElementById("driver-id"),r=document.getElementById("driver-nama"),o=document.getElementById("driver-lokasi");e?.reset(),a&&(a.value=""),r&&(r.value=""),o&&(o.value=""),t&&(t.textContent="Tambah Driver Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan data driver"),C.editItem=null,ze(!1)}function Do(e){const t=document.getElementById("driver-form-title"),n=document.getElementById("driver-form-description"),a=document.getElementById("driver-id"),r=document.getElementById("driver-nama"),o=document.getElementById("driver-lokasi");C.editItem=e,a&&(a.value=e.id),r&&(r.value=e.nama),o&&(o.value=e.lokasi),t&&(t.textContent="Edit Data Driver"),n&&(n.textContent="Isi form di bawah untuk memperbarui data driver"),ze(!1)}async function Oo(e){const t=await I(`/drivers/${e}`);Do(t),D("driver-form-modal")}function jo(e){const t=document.getElementById("driver-delete-copy");C.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus driver <strong>${p(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`),D("driver-delete-modal")}function No(){const e=document.getElementById("drivers-add-btn"),t=document.getElementById("drivers-export-btn"),n=document.getElementById("drivers-search-input"),a=document.getElementById("driver-form"),r=document.getElementById("drivers-table-body"),o=document.getElementById("driver-delete-confirm-btn"),s=document.getElementById("drivers-prev-page-btn"),i=document.getElementById("drivers-next-page-btn");if(!(!e||!a||!r))return e.addEventListener("click",()=>{vn(),D("driver-form-modal")}),t?.addEventListener("click",()=>{Dt("/export/drivers/csv","drivers.csv").catch(()=>{v("Gagal mengunduh file")})}),n?.addEventListener("input",Pe(async m=>{C.search=m.target.value.trim(),C.page=1;try{await ce()}catch{v("Gagal memuat data")}})),a.addEventListener("submit",async m=>{m.preventDefault();const d={nama:document.getElementById("driver-nama")?.value.trim()||"",lokasi:document.getElementById("driver-lokasi")?.value.trim()||""};ze(!0);try{C.editItem?(await I(`/drivers/${C.editItem.id}`,{method:"PUT",body:d}),P("Data driver berhasil diperbarui")):(await I("/drivers",{method:"POST",body:d}),P("Driver berhasil ditambahkan")),V("driver-form-modal"),vn(),await ce()}catch(l){v(l.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{ze(!1)}}),r.addEventListener("click",async m=>{const d=m.target.closest("[data-driver-edit]"),l=m.target.closest("[data-driver-delete]");try{if(d){await Oo(d.dataset.driverEdit);return}l&&jo({id:l.dataset.driverDelete,nama:l.dataset.driverName})}catch{v("Gagal memuat data")}}),o?.addEventListener("click",async()=>{if(C.deleteItem)try{await I(`/drivers/${C.deleteItem.id}`,{method:"DELETE"}),P("Driver berhasil dihapus"),V("driver-delete-modal"),(C.page-1)*he>=C.totalCount-1&&C.page>1&&(C.page-=1),C.deleteItem=null,await ce()}catch{v("Gagal menghapus data")}}),s?.addEventListener("click",async()=>{if(!(C.page<=1)){C.page-=1;try{await ce()}catch{v("Gagal memuat data")}}}),i?.addEventListener("click",async()=>{const m=Math.max(1,Math.ceil(C.totalCount/he));if(!(C.page>=m)){C.page+=1;try{await ce()}catch{v("Gagal memuat data")}}}),ce().catch(()=>{v("Gagal memuat data")})}const E={data:[],loading:!0,totalCount:0,page:1,search:"",filterJenis:"",editItem:null,deleteItem:null,isSubmitting:!1},ke=10;function Uo(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M5 14L6.6 9.2C6.8728 8.3816 7.6387 7.83 8.5014 7.83H15.4986C16.3613 7.83 17.1272 8.3816 17.4 9.2L19 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M4 14H20V17C20 18.1046 19.1046 19 18 19H6C4.89543 19 4 18.1046 4 17V14Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M7 16H7.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path>
            <path d="M17 16H17.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path>
        </svg>
    `}function qo(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Ho(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Fo(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 13L11 22L2 13V4H11L20 13Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <circle cx="7.5" cy="8.5" r="1.5" fill="currentColor"></circle>
        </svg>
    `}function Xe(e){const t=document.getElementById("mobil-submit-btn");E.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":E.editItem?"Perbarui":"Simpan")}function Vo(e){return e==="Hiace"?"mobil-jenis-badge mobil-jenis-badge-hiace":"mobil-jenis-badge mobil-jenis-badge-reborn"}function Go(){const e=document.getElementById("mobil-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="mobil-table-state">
                <div class="mobil-loading-inline">
                    <span class="mobil-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function Jo(){const e=document.getElementById("mobil-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="4" class="mobil-table-state mobil-empty-copy">
                Belum ada data mobil
            </td>
        </tr>
    `)}function En(){const e=document.getElementById("mobil-table-body");if(e){if(E.loading){Go();return}if(E.data.length===0){Jo();return}e.innerHTML=E.data.map((t,n)=>`
        <tr class="mobil-row" data-testid="mobil-row-${t.id}">
            <td class="mobil-index-cell">${(E.page-1)*ke+n+1}</td>
            <td>
                <div class="mobil-code-cell">
                    <span class="mobil-code-avatar" aria-hidden="true">
                        ${Uo()}
                    </span>
                    <span class="mobil-code-text">${p(t.kode_mobil)}</span>
                </div>
            </td>
            <td>
                <span class="${Vo(t.jenis_mobil)}">
                    <span class="mobil-jenis-icon" aria-hidden="true">${Fo()}</span>
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
                        ${qo()}
                    </button>
                    <button
                        class="mobil-icon-button mobil-icon-button-danger"
                        type="button"
                        data-mobil-delete="${t.id}"
                        data-mobil-name="${p(t.kode_mobil)}"
                        data-testid="delete-mobil-${t.id}"
                        aria-label="Hapus mobil ${p(t.kode_mobil)}"
                    >
                        ${Ho()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function wn(){const e=document.getElementById("mobil-pagination-shell"),t=document.getElementById("mobil-pagination-info"),n=document.getElementById("mobil-pagination-page"),a=document.getElementById("mobil-prev-page-btn"),r=document.getElementById("mobil-next-page-btn"),o=Math.max(1,Math.ceil(E.totalCount/ke));e&&(e.hidden=o<=1),t&&(t.textContent=De(E.page,ke,E.totalCount,E.data.length)),n&&(n.textContent=`${E.page} / ${o}`),a&&(a.disabled=E.page===1),r&&(r.disabled=E.page>=o)}async function re(){E.loading=!0,En(),wn();try{const[e,t]=await Promise.all([I(`/mobil?page=${E.page}&limit=${ke}${E.search?`&search=${encodeURIComponent(E.search)}`:""}${E.filterJenis?`&jenis=${encodeURIComponent(E.filterJenis)}`:""}`),I(`/mobil/count${E.search||E.filterJenis?"?":""}${[E.search?`search=${encodeURIComponent(E.search)}`:"",E.filterJenis?`jenis=${encodeURIComponent(E.filterJenis)}`:""].filter(Boolean).join("&")}`)]);E.data=Array.isArray(e)?e:[],E.totalCount=Number(t.count||0)}finally{E.loading=!1,En(),wn()}}function Bn(){const e=document.getElementById("mobil-form"),t=document.getElementById("mobil-form-title"),n=document.getElementById("mobil-form-description"),a=document.getElementById("mobil-id"),r=document.getElementById("mobil-kode"),o=document.getElementById("mobil-jenis");e?.reset(),a&&(a.value=""),r&&(r.value=""),o&&(o.value="Hiace"),t&&(t.textContent="Tambah Mobil Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan data mobil"),E.editItem=null,Xe(!1)}function Wo(e){const t=document.getElementById("mobil-form-title"),n=document.getElementById("mobil-form-description"),a=document.getElementById("mobil-id"),r=document.getElementById("mobil-kode"),o=document.getElementById("mobil-jenis");E.editItem=e,a&&(a.value=e.id),r&&(r.value=e.kode_mobil),o&&(o.value=e.jenis_mobil),t&&(t.textContent="Edit Data Mobil"),n&&(n.textContent="Isi form di bawah untuk memperbarui data mobil"),Xe(!1)}async function Ko(e){const t=await I(`/mobil/${e}`);Wo(t),D("mobil-form-modal")}function zo(e){const t=document.getElementById("mobil-delete-copy");E.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus mobil <strong>${p(e.kode_mobil)}</strong>? Tindakan ini tidak dapat dibatalkan.`),D("mobil-delete-modal")}function Xo(){const e=document.getElementById("mobil-add-btn"),t=document.getElementById("mobil-export-btn"),n=document.getElementById("mobil-search-input"),a=document.getElementById("mobil-filter-jenis"),r=document.getElementById("mobil-form"),o=document.getElementById("mobil-table-body"),s=document.getElementById("mobil-delete-confirm-btn"),i=document.getElementById("mobil-prev-page-btn"),m=document.getElementById("mobil-next-page-btn"),d=document.getElementById("mobil-kode");if(!(!e||!r||!o))return e.addEventListener("click",()=>{Bn(),D("mobil-form-modal")}),t?.addEventListener("click",()=>{Dt("/export/mobil/csv","mobil.csv").catch(()=>{v("Gagal mengunduh file")})}),n?.addEventListener("input",Pe(async l=>{E.search=l.target.value.trim(),E.page=1;try{await re()}catch{v("Gagal memuat data")}})),a?.addEventListener("change",async l=>{E.filterJenis=l.target.value,E.page=1;try{await re()}catch{v("Gagal memuat data")}}),d?.addEventListener("input",l=>{l.target.value=l.target.value.toUpperCase()}),r.addEventListener("submit",async l=>{l.preventDefault();const c={kode_mobil:document.getElementById("mobil-kode")?.value.trim().toUpperCase()||"",jenis_mobil:document.getElementById("mobil-jenis")?.value||"Hiace"};Xe(!0);try{E.editItem?(await I(`/mobil/${E.editItem.id}`,{method:"PUT",body:c}),P("Data mobil berhasil diperbarui")):(await I("/mobil",{method:"POST",body:c}),P("Mobil berhasil ditambahkan")),V("mobil-form-modal"),Bn(),await re()}catch(f){v(f.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{Xe(!1)}}),o.addEventListener("click",async l=>{const c=l.target.closest("[data-mobil-edit]"),f=l.target.closest("[data-mobil-delete]");try{if(c){await Ko(c.dataset.mobilEdit);return}f&&zo({id:f.dataset.mobilDelete,kode_mobil:f.dataset.mobilName})}catch{v("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(E.deleteItem)try{await I(`/mobil/${E.deleteItem.id}`,{method:"DELETE"}),P("Mobil berhasil dihapus"),V("mobil-delete-modal"),(E.page-1)*ke>=E.totalCount-1&&E.page>1&&(E.page-=1),E.deleteItem=null,await re()}catch{v("Gagal menghapus data")}}),i?.addEventListener("click",async()=>{if(!(E.page<=1)){E.page-=1;try{await re()}catch{v("Gagal memuat data")}}}),m?.addEventListener("click",async()=>{const l=Math.max(1,Math.ceil(E.totalCount/ke));if(!(E.page>=l)){E.page+=1;try{await re()}catch{v("Gagal memuat data")}}}),re().catch(()=>{v("Gagal memuat data")})}const w={data:[],drivers:[],mobilList:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1},Ce=10,In={"05:00":"Subuh (05.00 WIB)","08:00":"Pagi (08.00 WIB)","10:00":"Pagi (10.00 WIB)","14:00":"Siang (14.00 WIB)","16:00":"Sore (16.00 WIB)","19:00":"Malam (19.00 WIB)"},ct="08:00",Zo=["Reguler","Dropping","Rental"],qt="Reguler";function Qo(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Yo(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `}function Ht(e){return e==="Lunas"?"Lunas":"Belum Lunas"}function Sn(e){const t=Ht(e);return`<span class="keberangkatan-payment-badge ${t==="Lunas"?"is-paid":"is-unpaid"}">${p(t)}</span>`}function $n(e){return In[e]||In[ct]}function Ze(e){return Zo.includes(e)?e:qt}function es(){const e=Number(document.getElementById("keberangkatan-tarif-penumpang")?.value||0),t=Number(document.getElementById("keberangkatan-uang-paket")?.value||0),n=Number(document.getElementById("keberangkatan-jumlah-snack")?.value||0),a=Number(document.getElementById("keberangkatan-pengembalian-snack")?.value||0),r=Number(document.getElementById("keberangkatan-jumlah-air-mineral")?.value||0),o=e,s=o+t,i=s*.15,m=s*.85;return{jumlah_uang_penumpang:o,uang_paket:t,total:s,uang_pc:i,uang_bersih:m,jumlah_snack:n,pengembalian_snack:a,jumlah_air_mineral:r}}function Ft(){const e=es();Object.entries(e).forEach(([t,n])=>{const a=document.querySelector(`[data-calc="${t}"]`);if(a){if(t==="jumlah_snack"){a.textContent=`${L(n)} item`;return}if(t==="pengembalian_snack"){a.textContent=`${L(n)} item`;return}if(t==="jumlah_air_mineral"){a.textContent=`${L(n)} botol`;return}a.textContent=M(n)}})}function Qe(e,t,n,a,r=""){const o=document.getElementById(e);if(!o)return;const s=e==="keberangkatan-kode-mobil"?"Pilih mobil":"Pilih driver";o.innerHTML=`
        <option value="">${s}</option>
        ${t.map(i=>`
            <option value="${i[n]}" ${String(i[n])===String(r)?"selected":""}>
                ${p(a(i))}
            </option>
        `).join("")}
    `}function Ye(e){const t=document.getElementById("keberangkatan-submit-btn");w.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":w.editItem?"Perbarui":"Simpan")}function ts(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");e&&(e.innerHTML=`
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
        `))}function ns(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");e&&(e.innerHTML=`
        <tr>
            <td colspan="18" class="keberangkatan-table-state keberangkatan-empty-copy">
                Belum ada data keberangkatan
            </td>
        </tr>
    `,t&&(t.hidden=!1,t.innerHTML=`
            <div class="keberangkatan-mobile-state keberangkatan-empty-copy">
                Belum ada data keberangkatan
            </div>
        `))}function Cn(){const e=document.getElementById("keberangkatan-table-body"),t=document.getElementById("keberangkatan-mobile-list");if(e){if(w.loading){ts();return}if(w.data.length===0){ns();return}e.innerHTML=w.data.map(n=>`
        <tr class="keberangkatan-row" data-testid="keberangkatan-row-${n.id}">
            <td class="keberangkatan-hari-cell">${p(n.hari)}</td>
            <td>${p(n.tanggal)}</td>
            <td>${p(n.jam_keberangkatan_label||$n(n.jam_keberangkatan))}</td>
            <td>${p(Ze(n.tipe_layanan))}</td>
            <td>
                <span class="keberangkatan-kode-badge">${p(n.kode_mobil)}</span>
            </td>
            <td>${p(n.driver_nama)}</td>
            <td class="text-right">${L(n.jumlah_penumpang)}</td>
            <td class="text-right keberangkatan-money-cell">${M(n.jumlah_uang_penumpang)}</td>
            <td class="text-right">${L(n.jumlah_paket)}</td>
            <td class="text-right keberangkatan-money-cell">${M(n.uang_paket)}</td>
            <td class="text-right"><span class="keberangkatan-stock-badge">${L(n.jumlah_snack)}</span></td>
            <td class="text-right"><span class="keberangkatan-stock-badge keberangkatan-stock-badge-blue">${L(n.pengembalian_snack)}</span></td>
            <td class="text-right"><span class="keberangkatan-stock-badge keberangkatan-stock-badge-blue">${L(n.jumlah_air_mineral)}</span></td>
            <td class="text-right keberangkatan-money-cell keberangkatan-money-cell-amber">${M(n.uang_pc)}</td>
            <td class="text-right keberangkatan-money-cell keberangkatan-money-cell-emerald">${M(n.uang_bersih)}</td>
            <td class="text-center">${Sn(n.status_pembayaran)}</td>
            <td class="text-center">
                <span class="keberangkatan-trip-badge">#${L(n.trip_ke)}</span>
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
                        ${Qo()}
                    </button>
                    <button
                        class="keberangkatan-icon-button keberangkatan-icon-button-danger"
                        type="button"
                        data-keberangkatan-delete="${n.id}"
                        data-testid="delete-keberangkatan-${n.id}"
                        aria-label="Hapus data keberangkatan ${p(n.kode_mobil)}"
                    >
                        ${Yo()}
                    </button>
                </div>
            </td>
        </tr>
    `).join(""),t&&(t.hidden=!1,t.innerHTML=w.data.map(n=>`
            <article class="keberangkatan-mobile-card" data-testid="keberangkatan-card-${n.id}">
                <div class="keberangkatan-mobile-card-head">
                    <div>
                        <p class="keberangkatan-mobile-day">${p(n.hari)}</p>
                        <h3 class="keberangkatan-mobile-date">${p(n.tanggal)}</h3>
                        <p>${p(n.jam_keberangkatan_label||$n(n.jam_keberangkatan))}</p>
                    </div>
                    <div class="keberangkatan-mobile-head-side">
                        <span class="keberangkatan-kode-badge">${p(n.kode_mobil)}</span>
                        <span class="keberangkatan-trip-badge">#${L(n.trip_ke)}</span>
                    </div>
                </div>

                <div class="keberangkatan-mobile-driver">
                    <span>Driver</span>
                    <strong>${p(n.driver_nama)}</strong>
                </div>

                <div class="keberangkatan-mobile-grid">
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-status">
                        <span>Validasi</span>
                        ${Sn(n.status_pembayaran)}
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Layanan</span>
                        <strong>${p(Ze(n.tipe_layanan))}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Penumpang</span>
                        <strong>${L(n.jumlah_penumpang)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Paket</span>
                        <strong>${L(n.jumlah_paket)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Snack</span>
                        <strong>${L(n.jumlah_snack)} item</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Pengembalian Snack</span>
                        <strong>${L(n.pengembalian_snack)} item</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Air Mineral</span>
                        <strong>${L(n.jumlah_air_mineral)} botol</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-full">
                        <span>Jumlah Tarif</span>
                        <strong>${M(n.jumlah_uang_penumpang)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-full">
                        <span>Uang Paket</span>
                        <strong>${M(n.uang_paket)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-accent">
                        <span>Uang PC (15%)</span>
                        <strong>${M(n.uang_pc)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-emerald">
                        <span>Uang Bersih</span>
                        <strong>${M(n.uang_bersih)}</strong>
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
        `).join(""))}}function _n(){const e=document.getElementById("keberangkatan-pagination-shell"),t=document.getElementById("keberangkatan-pagination-info"),n=document.getElementById("keberangkatan-pagination-page"),a=document.getElementById("keberangkatan-prev-page-btn"),r=document.getElementById("keberangkatan-next-page-btn"),o=Math.max(1,Math.ceil(w.totalCount/Ce));e&&(e.hidden=o<=1),t&&(t.textContent=De(w.page,Ce,w.totalCount,w.data.length)),n&&(n.textContent=`${w.page} / ${o}`),a&&(a.disabled=w.page===1),r&&(r.disabled=w.page>=o)}async function ue(){w.loading=!0,Cn(),_n();try{const[e,t,n,a]=await Promise.all([I(`/keberangkatan?page=${w.page}&limit=${Ce}${w.search?`&search=${encodeURIComponent(w.search)}`:""}`),I(`/keberangkatan/count${w.search?`?search=${encodeURIComponent(w.search)}`:""}`),I("/drivers/all"),I("/mobil/all")]);w.data=Array.isArray(e)?e:[],w.totalCount=Number(t.count||0),w.drivers=Array.isArray(n)?n:[],w.mobilList=Array.isArray(a)?a:[]}finally{w.loading=!1,Cn(),_n()}}function ha(){document.getElementById("keberangkatan-form")?.scrollTo({top:0,behavior:"auto"})}function ht(){const e=document.getElementById("keberangkatan-form"),t=document.getElementById("keberangkatan-form-title"),n=document.getElementById("keberangkatan-form-description"),a=document.getElementById("keberangkatan-tanggal"),r=document.getElementById("keberangkatan-jam-keberangkatan"),o=document.getElementById("keberangkatan-trip-ke"),s=document.getElementById("keberangkatan-tipe-layanan"),i=document.getElementById("keberangkatan-jumlah-penumpang"),m=document.getElementById("keberangkatan-tarif-penumpang"),d=document.getElementById("keberangkatan-jumlah-paket"),l=document.getElementById("keberangkatan-uang-paket"),c=document.getElementById("keberangkatan-jumlah-snack"),f=document.getElementById("keberangkatan-pengembalian-snack"),y=document.getElementById("keberangkatan-jumlah-air-mineral"),g=document.getElementById("keberangkatan-status-pembayaran");e?.reset(),w.editItem=null,document.getElementById("keberangkatan-id").value="",t&&(t.textContent="Tambah Data Keberangkatan"),n&&(n.textContent="Isi form di bawah untuk menambahkan data keberangkatan"),a&&(a.value=Oe()),r&&(r.value=ct),Qe("keberangkatan-kode-mobil",w.mobilList,"kode_mobil",k=>`${k.kode_mobil} - ${k.jenis_mobil}`,w.mobilList[0]?.kode_mobil||""),Qe("keberangkatan-driver-id",w.drivers,"id",k=>`${k.nama} - ${k.lokasi}`,w.drivers[0]?.id||""),o&&(o.value="1"),s&&(s.value=qt),i&&(i.value="0"),m&&(m.value="0"),d&&(d.value="0"),l&&(l.value="0"),c&&(c.value="0"),f&&(f.value="0"),y&&(y.value="0"),g&&(g.value="Belum Lunas"),Ye(!1),Ft(),ha()}async function xn(e){const t=await I(`/keberangkatan/${e}`),n=document.getElementById("keberangkatan-form-title"),a=document.getElementById("keberangkatan-form-description");w.editItem=t,document.getElementById("keberangkatan-id").value=t.id,document.getElementById("keberangkatan-tanggal").value=t.tanggal,document.getElementById("keberangkatan-jam-keberangkatan").value=t.jam_keberangkatan||ct,document.getElementById("keberangkatan-trip-ke").value=t.trip_ke,document.getElementById("keberangkatan-tipe-layanan").value=Ze(t.tipe_layanan),document.getElementById("keberangkatan-jumlah-penumpang").value=t.jumlah_penumpang,document.getElementById("keberangkatan-tarif-penumpang").value=t.tarif_penumpang,document.getElementById("keberangkatan-jumlah-paket").value=t.jumlah_paket,document.getElementById("keberangkatan-uang-paket").value=t.uang_paket,document.getElementById("keberangkatan-jumlah-snack").value=t.jumlah_snack,document.getElementById("keberangkatan-pengembalian-snack").value=t.pengembalian_snack,document.getElementById("keberangkatan-jumlah-air-mineral").value=t.jumlah_air_mineral,document.getElementById("keberangkatan-status-pembayaran").value=Ht(t.status_pembayaran),Qe("keberangkatan-kode-mobil",w.mobilList,"kode_mobil",r=>`${r.kode_mobil} - ${r.jenis_mobil}`,t.kode_mobil),Qe("keberangkatan-driver-id",w.drivers,"id",r=>`${r.nama} - ${r.lokasi}`,t.driver_id),n&&(n.textContent="Edit Data Keberangkatan"),a&&(a.textContent="Isi form di bawah untuk memperbarui data keberangkatan"),Ye(!1),Ft(),ha(),D("keberangkatan-form-modal")}function Tn(e){w.deleteItem=e,D("keberangkatan-delete-modal")}function as(){const e=document.getElementById("keberangkatan-add-btn"),t=document.getElementById("keberangkatan-export-btn"),n=document.getElementById("keberangkatan-search-input"),a=document.getElementById("keberangkatan-form"),r=document.getElementById("keberangkatan-table-body"),o=document.getElementById("keberangkatan-mobile-list"),s=document.getElementById("keberangkatan-delete-confirm-btn"),i=document.getElementById("keberangkatan-prev-page-btn"),m=document.getElementById("keberangkatan-next-page-btn");if(!(!e||!a||!r))return e.addEventListener("click",()=>{ht(),D("keberangkatan-form-modal")}),t?.addEventListener("click",()=>{Dt("/export/keberangkatan/csv","keberangkatan.csv").catch(()=>{v("Gagal mengunduh file")})}),n?.addEventListener("input",Pe(async d=>{w.search=d.target.value.trim(),w.page=1;try{await ue()}catch{v("Gagal memuat data")}})),a.addEventListener("input",d=>{["keberangkatan-jumlah-penumpang","keberangkatan-tarif-penumpang","keberangkatan-uang-paket","keberangkatan-jumlah-snack","keberangkatan-pengembalian-snack","keberangkatan-jumlah-air-mineral"].includes(d.target.id)&&Ft()}),a.addEventListener("submit",async d=>{d.preventDefault();const l={tanggal:document.getElementById("keberangkatan-tanggal")?.value||"",jam_keberangkatan:document.getElementById("keberangkatan-jam-keberangkatan")?.value||ct,tipe_layanan:Ze(document.getElementById("keberangkatan-tipe-layanan")?.value||qt),kode_mobil:document.getElementById("keberangkatan-kode-mobil")?.value||"",driver_id:document.getElementById("keberangkatan-driver-id")?.value||"",jumlah_penumpang:Number(document.getElementById("keberangkatan-jumlah-penumpang")?.value||0),tarif_penumpang:Number(document.getElementById("keberangkatan-tarif-penumpang")?.value||0),jumlah_paket:Number(document.getElementById("keberangkatan-jumlah-paket")?.value||0),uang_paket:Number(document.getElementById("keberangkatan-uang-paket")?.value||0),jumlah_snack:Number(document.getElementById("keberangkatan-jumlah-snack")?.value||0),pengembalian_snack:Number(document.getElementById("keberangkatan-pengembalian-snack")?.value||0),jumlah_air_mineral:Number(document.getElementById("keberangkatan-jumlah-air-mineral")?.value||0),trip_ke:Number(document.getElementById("keberangkatan-trip-ke")?.value||1),status_pembayaran:Ht(document.getElementById("keberangkatan-status-pembayaran")?.value||"")};Ye(!0);try{w.editItem?(await I(`/keberangkatan/${w.editItem.id}`,{method:"PUT",body:l}),P("Data berhasil diperbarui")):(await I("/keberangkatan",{method:"POST",body:l}),P("Data berhasil ditambahkan")),V("keberangkatan-form-modal"),ht(),await ue()}catch(c){v(c.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{Ye(!1)}}),r.addEventListener("click",async d=>{const l=d.target.closest("[data-keberangkatan-edit]"),c=d.target.closest("[data-keberangkatan-delete]");try{if(l){await xn(l.dataset.keberangkatanEdit);return}c&&Tn({id:c.dataset.keberangkatanDelete})}catch{v("Gagal memuat data")}}),o?.addEventListener("click",async d=>{const l=d.target.closest("[data-keberangkatan-edit]"),c=d.target.closest("[data-keberangkatan-delete]");try{if(l){await xn(l.dataset.keberangkatanEdit);return}c&&Tn({id:c.dataset.keberangkatanDelete})}catch{v("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(w.deleteItem)try{await I(`/keberangkatan/${w.deleteItem.id}`,{method:"DELETE"}),P("Data berhasil dihapus"),V("keberangkatan-delete-modal"),(w.page-1)*Ce>=w.totalCount-1&&w.page>1&&(w.page-=1),w.deleteItem=null,await ue()}catch{v("Gagal menghapus data")}}),i?.addEventListener("click",async()=>{if(!(w.page<=1)){w.page-=1;try{await ue()}catch{v("Gagal memuat data")}}}),m?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil(w.totalCount/Ce));if(!(w.page>=d)){w.page+=1;try{await ue()}catch{v("Gagal memuat data")}}}),ue().then(()=>{ht()}).catch(()=>{v("Gagal memuat data")})}const S={data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,isSubmitting:!1,prices:{snack:0,air:0}},_e=10;function rs(){return`
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
    `}function et(e){return Number(document.getElementById(e)?.value||0)}function tt(){const e=et("stock-total-snack"),t=et("stock-total-air"),n=e*S.prices.snack+t*S.prices.air,a=document.querySelector('[data-stock-calc="nilai_total"]'),r=document.getElementById("stock-snack-price-label"),o=document.getElementById("stock-air-price-label");r&&(r.textContent=M(S.prices.snack)),o&&(o.textContent=M(S.prices.air)),a&&(a.textContent=M(n))}function nt(e){const t=document.getElementById("stock-submit-btn");S.isSubmitting=e,t&&(t.disabled=e,t.textContent=e?"Menyimpan...":S.editItem?"Perbarui":"Simpan")}function ss(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");e&&(e.innerHTML=`
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
        `))}function is(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");e&&(e.innerHTML=`
        <tr>
            <td colspan="14" class="stock-table-state stock-empty-copy">
                Belum ada data stok snack dan air mineral
            </td>
        </tr>
    `,t&&(t.hidden=!1,t.innerHTML=`
            <div class="stock-mobile-state stock-empty-copy">
                Belum ada data stok snack dan air mineral
            </div>
        `))}function Ln(){const e=document.getElementById("stock-table-body"),t=document.getElementById("stock-mobile-list");if(e){if(S.loading){ss();return}if(S.data.length===0){is();return}e.innerHTML=S.data.map(n=>`
        <tr class="stock-row" data-testid="stock-row-${n.id}">
            <td class="stock-day-cell">${p(n.hari)}</td>
            <td>${p(n.tanggal)}</td>
            <td>${p(n.bulan)}</td>
            <td class="text-right">${L(n.total_stock_snack_display??n.total_stock_snack)}</td>
            <td class="text-right">${L(n.total_stock_air_mineral)}</td>
            <td class="text-right">${L(n.pengembalian_snack)}</td>
            <td class="text-right">${L(n.terpakai_snack)}</td>
            <td class="text-right">${L(n.terpakai_air_mineral)}</td>
            <td class="text-right"><span class="stock-value-badge stock-value-badge-emerald">${L(n.sisa_stock_snack)}</span></td>
            <td class="text-right"><span class="stock-value-badge stock-value-badge-blue">${L(n.sisa_stock_air_mineral)}</span></td>
            <td class="text-right stock-money-cell">${M(n.nilai_total)}</td>
            <td class="text-right stock-money-cell stock-money-cell-emerald">${M(n.sisa_nilai_total)}</td>
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
                        ${rs()}
                    </button>
                    <button
                        class="stock-icon-button stock-icon-button-danger"
                        type="button"
                        data-stock-delete="${n.id}"
                        data-stock-date="${p(n.tanggal)}"
                        data-testid="delete-stock-${n.id}"
                        aria-label="Hapus data stok ${p(n.tanggal)}"
                    >
                        ${os()}
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
                        <strong>${L(n.total_stock_snack_display??n.total_stock_snack)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Total Air Mineral</span>
                        <strong>${L(n.total_stock_air_mineral)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Pengembalian Snack</span>
                        <strong>${L(n.pengembalian_snack)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Terpakai Snack</span>
                        <strong>${L(n.terpakai_snack)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Terpakai Air Mineral</span>
                        <strong>${L(n.terpakai_air_mineral)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Sisa Snack</span>
                        <strong>${L(n.sisa_stock_snack)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Sisa Air Mineral</span>
                        <strong>${L(n.sisa_stock_air_mineral)}</strong>
                    </div>
                    <div class="stock-mobile-item stock-mobile-item-full">
                        <span>Nilai Total</span>
                        <strong>${M(n.nilai_total)}</strong>
                    </div>
                    <div class="stock-mobile-item stock-mobile-item-full stock-mobile-item-emerald">
                        <span>Sisa Nilai Total</span>
                        <strong>${M(n.sisa_nilai_total)}</strong>
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
        `).join(""))}}function An(){const e=document.getElementById("stock-pagination-shell"),t=document.getElementById("stock-pagination-info"),n=document.getElementById("stock-pagination-page"),a=document.getElementById("stock-prev-page-btn"),r=document.getElementById("stock-next-page-btn"),o=Math.max(1,Math.ceil(S.totalCount/_e));e&&(e.hidden=o<=1),t&&(t.textContent=De(S.page,_e,S.totalCount,S.data.length)),n&&(n.textContent=`${S.page} / ${o}`),a&&(a.disabled=S.page===1),r&&(r.disabled=S.page>=o)}async function me(){S.loading=!0,Ln(),An();try{const[e,t]=await Promise.all([I(`/stock?page=${S.page}&limit=${_e}${S.search?`&search=${encodeURIComponent(S.search)}`:""}`),I(`/stock/count${S.search?`?search=${encodeURIComponent(S.search)}`:""}`)]);S.data=Array.isArray(e)?e:[],S.totalCount=Number(t.count||0)}finally{S.loading=!1,Ln(),An()}}function Rn(){const e=document.getElementById("stock-form"),t=document.getElementById("stock-form-title"),n=document.getElementById("stock-form-description");e?.reset(),S.editItem=null,document.getElementById("stock-id").value="",document.getElementById("stock-tanggal").value=Oe(),document.getElementById("stock-total-snack").value="0",document.getElementById("stock-total-air").value="0",document.getElementById("stock-keterangan").value="",t&&(t.textContent="Tambah Stok Baru"),n&&(n.textContent="Isi form di bawah untuk menambahkan stok snack dan air mineral"),nt(!1),tt()}function ds(e){const t=document.getElementById("stock-form-title"),n=document.getElementById("stock-form-description");S.editItem=e,document.getElementById("stock-id").value=e.id,document.getElementById("stock-tanggal").value=e.tanggal,document.getElementById("stock-total-snack").value=e.total_stock_snack,document.getElementById("stock-total-air").value=e.total_stock_air_mineral,document.getElementById("stock-keterangan").value=e.keterangan||"",t&&(t.textContent="Edit Data Stok"),n&&(n.textContent="Isi form di bawah untuk memperbarui stok snack dan air mineral"),nt(!1),tt()}async function Mn(e){const t=await I(`/stock/${e}`);ds(t),D("stock-form-modal")}function Pn(e){const t=document.getElementById("stock-delete-copy");S.deleteItem=e,t&&(t.innerHTML=`Apakah Anda yakin ingin menghapus data stok tanggal <strong>${p(e.tanggal)}</strong>? Tindakan ini tidak dapat dibatalkan.`),D("stock-delete-modal")}function ls(){const e=document.querySelector("[data-stock-page]"),t=document.getElementById("stock-add-btn"),n=document.getElementById("stock-search-input"),a=document.getElementById("stock-form"),r=document.getElementById("stock-table-body"),o=document.getElementById("stock-mobile-list"),s=document.getElementById("stock-delete-confirm-btn"),i=document.getElementById("stock-prev-page-btn"),m=document.getElementById("stock-next-page-btn");if(!(!e||!t||!a||!r))return S.prices.snack=Number(e.dataset.stockSnackPrice||0),S.prices.air=Number(e.dataset.stockAirPrice||0),tt(),t.addEventListener("click",()=>{Rn(),D("stock-form-modal")}),n?.addEventListener("input",Pe(async d=>{S.search=d.target.value.trim(),S.page=1;try{await me()}catch{v("Gagal memuat data")}})),a.addEventListener("input",d=>{["stock-total-snack","stock-total-air"].includes(d.target.id)&&tt()}),a.addEventListener("submit",async d=>{d.preventDefault();const l={tanggal:document.getElementById("stock-tanggal")?.value||"",total_stock_snack:et("stock-total-snack"),total_stock_air_mineral:et("stock-total-air"),keterangan:document.getElementById("stock-keterangan")?.value.trim()||""};nt(!0);try{S.editItem?(await I(`/stock/${S.editItem.id}`,{method:"PUT",body:l}),P("Data stok berhasil diperbarui")):(await I("/stock",{method:"POST",body:l}),P("Data stok berhasil ditambahkan")),V("stock-form-modal"),Rn(),await me()}catch(c){v(c.message||"Silakan periksa input Anda","Gagal menyimpan data")}finally{nt(!1)}}),r.addEventListener("click",async d=>{const l=d.target.closest("[data-stock-edit]"),c=d.target.closest("[data-stock-delete]");try{if(l){await Mn(l.dataset.stockEdit);return}c&&Pn({id:c.dataset.stockDelete,tanggal:c.dataset.stockDate})}catch{v("Gagal memuat data")}}),o?.addEventListener("click",async d=>{const l=d.target.closest("[data-stock-edit]"),c=d.target.closest("[data-stock-delete]");try{if(l){await Mn(l.dataset.stockEdit);return}c&&Pn({id:c.dataset.stockDelete,tanggal:c.dataset.stockDate})}catch{v("Gagal memuat data")}}),s?.addEventListener("click",async()=>{if(S.deleteItem)try{await I(`/stock/${S.deleteItem.id}`,{method:"DELETE"}),P("Data stok berhasil dihapus"),V("stock-delete-modal"),(S.page-1)*_e>=S.totalCount-1&&S.page>1&&(S.page-=1),S.deleteItem=null,await me()}catch{v("Gagal menghapus data")}}),i?.addEventListener("click",async()=>{if(!(S.page<=1)){S.page-=1;try{await me()}catch{v("Gagal memuat data")}}}),m?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil(S.totalCount/_e));if(!(S.page>=d)){S.page+=1;try{await me()}catch{v("Gagal memuat data")}}}),me().catch(()=>{v("Gagal memuat data")})}const xe=10,$={currentUser:null,data:[],loading:!0,totalCount:0,page:1,search:"",editItem:null,deleteItem:null,defaultRole:"User"};function cs(e){return["Super Admin","Admin"].includes(e)}function us(e){return e==="Super Admin"}function ms(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function ps(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M2.5 12C4.4 8.2 8 6 12 6C16 6 19.6 8.2 21.5 12C19.6 15.8 16 18 12 18C8 18 4.4 15.8 2.5 12Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `}function gs(){return`
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
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
    `}function bs(){return us($.currentUser?.role)?["Super Admin","Admin","User"]:["Admin","User"]}function at(e){se(document.getElementById("admin-user-submit-btn"),e,"Menyimpan...")}function hs(e){return e==="Super Admin"?"admin-users-role-badge admin-users-role-badge-super":e==="Admin"?"admin-users-role-badge admin-users-role-badge-admin":"admin-users-role-badge admin-users-role-badge-user"}function ks(){const e=document.getElementById("admin-users-table-body");e&&(e.innerHTML=`
        <tr>
            <td colspan="6" class="admin-users-table-state">
                <div class="admin-users-loading-inline">
                    <span class="admin-users-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `)}function ka(e="Belum ada akun admin atau user."){const t=document.getElementById("admin-users-table-body");t&&(t.innerHTML=`
        <tr>
            <td colspan="6" class="admin-users-table-state admin-users-empty-copy">${p(e)}</td>
        </tr>
    `)}function Dn(){const e=document.getElementById("admin-users-table-body");if(e){if($.loading){ks();return}if($.data.length===0){ka();return}e.innerHTML=$.data.map(t=>`
        <tr class="admin-users-row" data-testid="admin-user-row-${t.id}">
            <td>
                <div class="admin-users-name-cell">
                    <span class="admin-users-avatar" aria-hidden="true">${ms()}</span>
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
            <td><span class="${hs(t.role)}">${p(t.role)}</span></td>
            <td>
                <div class="admin-users-action-row">
                    <button class="admin-users-icon-button" type="button" data-admin-user-show="${t.id}" data-testid="show-admin-user-${t.id}" aria-label="Lihat detail akun ${p(t.nama)}">
                        ${ps()}
                    </button>
                    <button class="admin-users-icon-button" type="button" data-admin-user-edit="${t.id}" data-testid="edit-admin-user-${t.id}" aria-label="Edit akun ${p(t.nama)}" ${t.can_edit?"":"disabled"}>
                        ${gs()}
                    </button>
                    <button class="admin-users-icon-button admin-users-icon-button-danger" type="button" data-admin-user-delete="${t.id}" data-admin-user-name="${p(t.nama)}" data-testid="delete-admin-user-${t.id}" aria-label="Hapus akun ${p(t.nama)}" ${t.can_delete?"":"disabled"}>
                        ${fs()}
                    </button>
                </div>
            </td>
        </tr>
    `).join("")}}function Ct(){const e=document.getElementById("admin-users-pagination-shell"),t=document.getElementById("admin-users-pagination-info"),n=document.getElementById("admin-users-pagination-page"),a=document.getElementById("admin-users-prev-page-btn"),r=document.getElementById("admin-users-next-page-btn"),o=Math.max(1,Math.ceil($.totalCount/xe));e&&(e.hidden=o<=1),t&&(t.textContent=De($.page,xe,$.totalCount,$.data.length)),n&&(n.textContent=`${$.page} / ${o}`),a&&(a.disabled=$.page===1),r&&(r.disabled=$.page>=o)}async function pe(){$.loading=!0,Dn(),Ct();try{const e=$.search?`?search=${encodeURIComponent($.search)}`:"",t=`?page=${$.page}&limit=${xe}${$.search?`&search=${encodeURIComponent($.search)}`:""}`,[n,a]=await Promise.all([I(`/admin-users${t}`),I(`/admin-users/count${e}`)]);$.data=Array.isArray(n)?n:[],$.totalCount=Number(a.count||0)}finally{$.loading=!1,Dn(),Ct()}}function ya(e="User"){const t=document.getElementById("admin-user-role");if(!t)return;const n=bs(),a=n.includes(e)?e:n[0];t.innerHTML=n.map(r=>`
        <option value="${p(r)}" ${r===a?"selected":""}>${p(r)}</option>
    `).join("")}function va(e){const t=document.getElementById("admin-user-password"),n=document.getElementById("admin-user-password-note");t&&(t.required=!e,t.placeholder=e?"Kosongkan jika tidak ingin mengubah password":"Masukkan password",t.value=""),n&&(n.textContent=e?"Kosongkan password jika tidak ingin mengubah password akun ini.":"Password minimal 6 karakter dan akan disimpan dalam bentuk terenkripsi.")}function kt(e="User"){const t=document.getElementById("admin-user-form"),n=document.getElementById("admin-user-form-title"),a=document.getElementById("admin-user-form-description"),r=document.getElementById("admin-user-id");t?.reset(),r&&(r.value=""),ya(e),va(!1),n&&(n.textContent=e==="Admin"?"Tambah Admin Baru":"Tambah User Baru"),a&&(a.textContent=e==="Admin"?"Lengkapi data akun untuk menambahkan admin baru":"Lengkapi data akun untuk menambahkan user baru"),$.defaultRole=e,$.editItem=null,at(!1)}function ys(e){$.editItem=e,document.getElementById("admin-user-id").value=e.id,document.getElementById("admin-user-nama").value=e.nama,document.getElementById("admin-user-username").value=e.username,document.getElementById("admin-user-email").value=e.email,ya(e.role),va(!0),document.getElementById("admin-user-form-title").textContent="Edit Akun",document.getElementById("admin-user-form-description").textContent="Perbarui informasi akun admin atau user di bawah ini",at(!1)}function vs(e){const t=document.getElementById("admin-user-detail-list");t&&(t.innerHTML=`
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
            <strong>${p(vo(e.created_at))}</strong>
        </div>
    `)}async function Es(e){vs(await I(`/admin-users/${e}`)),D("admin-user-show-modal")}async function ws(e){ys(await I(`/admin-users/${e}`)),D("admin-user-form-modal")}function Bs(e){$.deleteItem=e,document.getElementById("admin-user-delete-copy").innerHTML=`Apakah Anda yakin ingin menghapus akun <strong>${p(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`,D("admin-user-delete-modal")}function On(){const e=document.getElementById("admin-users-access-note"),t=document.getElementById("admin-users-search-input"),n=document.querySelector(".admin-users-page-actions");e&&(e.hidden=!1,e.textContent="Halaman ini hanya dapat diakses oleh Admin atau Super Admin."),t&&(t.disabled=!0),n&&(n.hidden=!0),$.loading=!1,$.data=[],$.totalCount=0,ka("Anda tidak memiliki akses untuk mengelola data admin dan user."),Ct()}function Is({user:e}={}){const t=document.getElementById("admin-users-add-admin-btn"),n=document.getElementById("admin-users-add-user-btn"),a=document.getElementById("admin-users-search-input"),r=document.getElementById("admin-user-form"),o=document.getElementById("admin-users-table-body"),s=document.getElementById("admin-user-delete-confirm-btn"),i=document.getElementById("admin-users-prev-page-btn"),m=document.getElementById("admin-users-next-page-btn");if(!(!t||!n||!r||!o)){if($.currentUser=e||window.transitAuthUser||null,!cs($.currentUser?.role)){On();return}return t.addEventListener("click",()=>{kt("Admin"),D("admin-user-form-modal")}),n.addEventListener("click",()=>{kt("User"),D("admin-user-form-modal")}),a?.addEventListener("input",Pe(async d=>{$.search=d.target.value.trim(),$.page=1;try{await pe()}catch(l){v(l.message||"Gagal memuat data akun")}})),r.addEventListener("submit",async d=>{d.preventDefault();const l={nama:document.getElementById("admin-user-nama")?.value.trim()||"",username:document.getElementById("admin-user-username")?.value.trim()||"",email:document.getElementById("admin-user-email")?.value.trim()||"",password:document.getElementById("admin-user-password")?.value||"",role:document.getElementById("admin-user-role")?.value||"User"};at(!0);try{$.editItem?(await I(`/admin-users/${$.editItem.id}`,{method:"PUT",body:l}),P("Akun berhasil diperbarui")):(await I("/admin-users",{method:"POST",body:l}),P(l.role==="Admin"?"Admin berhasil ditambahkan":"User berhasil ditambahkan")),V("admin-user-form-modal"),kt($.defaultRole),await pe()}catch(c){v(c.message||"Silakan periksa kembali data yang diinput","Gagal menyimpan akun")}finally{at(!1)}}),o.addEventListener("click",async d=>{const l=d.target.closest("[data-admin-user-show]"),c=d.target.closest("[data-admin-user-edit]"),f=d.target.closest("[data-admin-user-delete]");try{if(l){await Es(l.dataset.adminUserShow);return}if(c){await ws(c.dataset.adminUserEdit);return}f&&Bs({id:f.dataset.adminUserDelete,nama:f.dataset.adminUserName})}catch(y){v(y.message||"Gagal memuat detail akun")}}),s?.addEventListener("click",async()=>{if($.deleteItem)try{await I(`/admin-users/${$.deleteItem.id}`,{method:"DELETE"}),P("Akun berhasil dihapus"),V("admin-user-delete-modal"),($.page-1)*xe>=$.totalCount-1&&$.page>1&&($.page-=1),$.deleteItem=null,await pe()}catch(d){v(d.message||"Gagal menghapus akun")}}),i?.addEventListener("click",async()=>{if(!($.page<=1)){$.page-=1;try{await pe()}catch(d){v(d.message||"Gagal memuat data akun")}}}),m?.addEventListener("click",async()=>{const d=Math.max(1,Math.ceil($.totalCount/xe));if(!($.page>=d)){$.page+=1;try{await pe()}catch(l){v(l.message||"Gagal memuat data akun")}}}),pe().catch(d=>{if(d.status===403){On();return}v(d.message||"Gagal memuat data akun")})}}const jn=[{value:"05:00",label:"Subuh",time:"05.00 WIB"},{value:"08:00",label:"Pagi",time:"08.00 WIB"},{value:"10:00",label:"Pagi",time:"10.00 WIB"},{value:"14:00",label:"Siang",time:"14.00 WIB"},{value:"16:00",label:"Sore",time:"16.00 WIB"},{value:"19:00",label:"Malam",time:"19.00 WIB"}],Ea=[[{code:"1A",label:"1A"},{code:"SOPIR",label:"SOPIR",isDriver:!0}],[{code:"2A",label:"2A"},{code:"3A",label:"3A"}],[{code:"4A",label:"4A"},{code:"5A",label:"5A"}]],Ss=Ea.flat().filter(e=>!e.isDriver).length,h={currentUser:null,date:Oe(),direction:"to_pkb",bookings:[],loading:!1,drivers:[],mobils:[],formOptions:null,selectedSeats:[],passengerDraftMap:{},editItem:null,deleteItem:null,slotDriverMap:{},slotMobilMap:{},occupiedSeatsForForm:[]};function yt(e){const t=document.getElementById(e);if(!t)return null;try{return JSON.parse(t.textContent||"{}")}catch{return null}}function $s(e){return["Super Admin","Admin"].includes(e)}function Cs(e){const t=e?"#dc2626":"#166534",n=e?"#991b1b":"#14532d";return`
        <svg viewBox="0 0 50 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="2" width="30" height="20" rx="8" fill="${t}" stroke="${n}" stroke-width="1.5"/>
            <rect x="5" y="18" width="40" height="28" rx="9" fill="${t}" stroke="${n}" stroke-width="1.5"/>
            <rect x="7" y="44" width="36" height="14" rx="7" fill="${t}" stroke="${n}" stroke-width="1.5" opacity="0.8"/>
            <rect x="2" y="22" width="5" height="18" rx="2.5" fill="${t}" opacity="0.6"/>
            <rect x="43" y="22" width="5" height="18" rx="2.5" fill="${t}" opacity="0.6"/>
        </svg>`}function _s(){return`
        <svg viewBox="0 0 50 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="25" cy="30" r="18" stroke="rgba(148,163,184,0.5)" stroke-width="2.5"/>
            <circle cx="25" cy="30" r="6" fill="rgba(148,163,184,0.4)"/>
            <line x1="25" y1="12" x2="25" y2="24" stroke="rgba(148,163,184,0.5)" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="7" y1="30" x2="19" y2="30" stroke="rgba(148,163,184,0.5)" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="31" y1="30" x2="43" y2="30" stroke="rgba(148,163,184,0.5)" stroke-width="2.5" stroke-linecap="round"/>
        </svg>`}function xs(){return'<svg viewBox="0 0 24 24" fill="none"><path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path><path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg>'}function Ts(){return'<svg viewBox="0 0 24 24" fill="none"><path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg>'}function Ls(e){return`
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
                    ${Ea.map(n=>`<div class="bpg-seat-row">${n.map(r=>{if(r.isDriver)return`
                    <div class="bpg-seat-item bpg-seat-driver" title="Sopir / Pengemudi">
                        <div class="bpg-seat-icon">${_s()}</div>
                        <span class="bpg-seat-label">SOPIR</span>
                    </div>`;const o=e[r.code],s=!!o,i=s?"bpg-seat-occupied":"bpg-seat-available",m=s?p(o.nama_pemesanan||"-"):"";return`
                <div class="bpg-seat-item ${i}" title="${s?m:"Tersedia"}">
                    <div class="bpg-seat-icon">${Cs(s)}</div>
                    <span class="bpg-seat-label">${r.label}</span>
                    ${s?`<span class="bpg-seat-name">${m}</span>`:""}
                </div>`}).join("")}</div>`).join("")}
                </div>
            </div>
        </div>`}function As(e){if(e.length===0)return`
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
            ${e.map(r=>{const o=r.selected_seats_label||"-",s=r.departure_status||"",i=n(s),m=t.map(d=>{const l=s===d.value;return`<button class="bpg-depart-opt ${d.cls}${l?" is-active":""}" type="button"
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
                            ${xs()}
                        </button>
                        <button class="admin-users-icon-button admin-users-icon-button-danger" type="button" data-booking-delete="${p(String(r.id))}" data-booking-name="${p(r.nama_pemesanan)}" title="Hapus pemesanan">
                            ${Ts()}
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
        </div>`}function Rs(e){const t={};return e.forEach(n=>{(Array.isArray(n.selected_seats)?n.selected_seats:[]).forEach(r=>{t[r]||(t[r]=n)})}),t}function Ms(e,t){const n=Rs(t),a=t.reduce((c,f)=>c+(Number(f.passenger_count)||0),0),r=`${e.value}__${h.direction}`;if(!h.slotDriverMap[r]){const c=t.find(f=>f.driver_id);c&&(h.slotDriverMap[r]=c.driver_id)}const o=h.slotDriverMap[r]||"",s=h.slotMobilMap[r]||"",i="stock-value-badge-yellow",m=h.drivers.map(c=>{const f=c.lokasi?`${c.nama} (${c.lokasi})`:c.nama;return`<option value="${p(c.id)}" ${o===c.id?"selected":""}>${p(f)}</option>`}).join(""),d=h.mobils.map(c=>{const f=`${c.kode_mobil} — ${c.jenis_mobil}`;return`<option value="${p(c.id)}" ${s===c.id?"selected":""}>${p(f)}</option>`}).join(""),l=[...new Set(t.map(c=>(c.service_type||"").trim()).filter(Boolean))];return`
        <article class="bpg-slot-card" data-slot="${p(e.value)}" data-direction="${p(h.direction)}">
            <div class="bpg-slot-head">
                <div class="bpg-slot-time-badge">
                    <span class="bpg-slot-period">${p(e.label)}</span>
                    <strong class="bpg-slot-time">${p(e.time)}</strong>
                </div>
                <div class="bpg-slot-service-types">
                    ${l.length>0?l.map(c=>`<span class="bpg-service-badge">${p(c)}</span>`).join(""):'<span class="bpg-service-badge bpg-service-badge--empty">Belum ada layanan</span>'}
                </div>
                <div class="bpg-slot-counters">
                    <span class="stock-value-badge ${i}">${a} / ${Ss} Kursi</span>
                </div>
            </div>

            ${Ls(n)}

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
                        ${d}
                    </select>
                </div>
            </div>

            ${As(t)}
        </article>`}function Ps(){const e=document.getElementById("bpg-slots-shell");e&&(e.innerHTML=`
            <div class="admin-users-loading-inline" style="padding:40px 0;">
                <span class="admin-users-loading-inline-spinner" aria-hidden="true"></span>
                <span>Memuat data penumpang...</span>
            </div>`)}function Ds(){const e=document.getElementById("bpg-slots-shell");if(!e)return;const t={};jn.forEach(a=>{t[a.value]=[]}),h.bookings.forEach(a=>{const o=(a.trip_time||"").trim().substring(0,5);t[o]&&t[o].push(a)});const n=jn.map(a=>Ms(a,t[a.value]||[]));e.innerHTML=`<div class="bpg-slots-grid">${n.join("")}</div>`}async function Ie(){h.loading=!0,Ps();try{const e=new URLSearchParams({date:h.date,direction:h.direction,limit:200,page:1}),t=await I(`/bookings?${e}`);h.bookings=Array.isArray(t)?t:[]}catch(e){h.bookings=[],e.status!==403&&v(e.message||"Gagal memuat data penumpang")}finally{h.loading=!1,Ds()}}function Os(e){document.getElementById("bpg-detail-title").textContent=e.nama_pemesanan||"-",document.getElementById("bpg-detail-subtitle").textContent=`${e.booking_code||"-"} · ${e.booking_status||"-"}`,document.getElementById("bpg-detail-full-link").href=`/dashboard/bookings/${e.id}`,document.getElementById("bpg-detail-ticket-link").href=`/dashboard/bookings/${e.id}/ticket`;const t=document.getElementById("bpg-detail-body");t.innerHTML=`
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
        </div>`,D("bpg-detail-modal")}function js(){return(h.formOptions?.seat_options||[]).map(e=>e.code)}function Vt(e){const t=new Map(js().map((n,a)=>[n,a]));return Array.from(new Set((e||[]).map(n=>String(n).trim()).filter(n=>t.has(n)))).sort((n,a)=>(t.get(n)??999)-(t.get(a)??999))}function ut(){return Number(document.getElementById("booking-passenger-count")?.value||0)}function Ns(){const e=ut();return(h.formOptions?.seat_options||[]).filter(t=>!t.is_optional||e>=6).map(t=>t.code)}function Us(){return h.formOptions?.payment_status_options||[]}function qs(e){return e==="transfer"?["Belum Bayar","Menunggu Pembayaran","Menunggu Verifikasi","Dibayar"]:e==="qris"?["Belum Bayar","Menunggu Pembayaran","Dibayar"]:e==="cash"?["Belum Bayar","Dibayar Tunai"]:["Belum Bayar"]}function Hs(e){return e==="transfer"?"Menunggu Pembayaran":e==="qris"?"Dibayar":e==="cash"?"Dibayar Tunai":"Belum Bayar"}function Fs(e){return e==="transfer"?"Menunggu Verifikasi Pembayaran":e==="qris"||e==="cash"?"Diproses":"Draft"}function Vs(e,t){if(!e||!t||e===t)return null;const a=(h.formOptions?.route_matrix||{})?.[e]?.[t];return a==null?null:Number(a)}function Se(){const e=document.getElementById("booking-from-city")?.value||"",t=document.getElementById("booking-to-city")?.value||"",n=ut(),a=Vs(e,t),r=a!==null?a*n:null,o=document.getElementById("booking-price-per-seat"),s=document.getElementById("booking-total-amount");o&&(o.value=a!==null?M(a):""),s&&(s.value=r!==null?M(r):"")}function Gt(){const e=document.getElementById("booking-payment-method")?.value||"",t=document.getElementById("booking-payment-status"),n=document.getElementById("booking-booking-status"),a=document.getElementById("booking-bank-account-group"),r=document.getElementById("booking-bank-account-code"),o=qs(e),s=t?.value||"";a&&(a.hidden=e!=="transfer"),r&&e!=="transfer"&&(r.value=""),t&&(t.innerHTML=Us().filter(i=>o.includes(i.value)).map(i=>`<option value="${p(i.value)}">${p(i.label)}</option>`).join(""),t.value=o.includes(s)?s:Hs(e)),n&&(n.value=Fs(e))}function Gs(){const e=document.getElementById("booking-selected-seats-inputs");e&&(e.innerHTML=h.selectedSeats.map(t=>`<input type="hidden" name="selected_seats[]" value="${p(t)}">`).join(""))}function Js(){const e=document.getElementById("booking-selected-seat-count"),t=document.getElementById("booking-selected-seat-label");e&&(e.textContent=String(h.selectedSeats.length)),t&&(t.textContent=h.selectedSeats.length>0?h.selectedSeats.join(", "):"Belum dipilih")}function _t(){document.querySelectorAll("[data-passenger-seat]").forEach(e=>{const t=e.dataset.passengerSeat;t&&(h.passengerDraftMap[t]={seat_no:t,name:e.querySelector("[data-passenger-name]")?.value.trim()||"",phone:e.querySelector("[data-passenger-phone]")?.value.trim()||""})})}function ge(e=null){const t=document.getElementById("booking-passenger-editor");if(t){if(e&&(h.passengerDraftMap=Object.fromEntries(e.map(n=>[n.seat_no,n]))),h.selectedSeats.length===0){t.innerHTML='<div class="dashboard-empty-state dashboard-empty-state--block bookings-passenger-empty">Pilih kursi terlebih dahulu untuk menampilkan form data penumpang.</div>';return}t.innerHTML=`
        <div class="bookings-passenger-grid bookings-passenger-grid--editor">
            ${h.selectedSeats.map((n,a)=>{const r=h.passengerDraftMap[n]||{name:"",phone:""};return`
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
        </div>`}}async function rt(){const e=document.getElementById("booking-trip-date")?.value||"",t=document.getElementById("booking-trip-time")?.value||"",n=h.editItem?.id||"";if(!e||!t){h.occupiedSeatsForForm=[];return}try{const a=new URLSearchParams({trip_date:e,trip_time:t});n&&a.set("exclude_id",n);const r=await I(`/bookings/occupied-seats?${a}`);h.occupiedSeatsForForm=Array.isArray(r?.occupied_seats)?r.occupied_seats:[]}catch{h.occupiedSeatsForForm=[]}}function fe(){const e=document.querySelectorAll("[data-seat-code]"),t=ut(),n=Ns();h.selectedSeats=Vt(h.selectedSeats.filter(a=>n.includes(a)&&!h.occupiedSeatsForForm.includes(a))),e.forEach(a=>{const r=a.dataset.seatCode,o=n.includes(r),s=h.occupiedSeatsForForm.includes(r),i=h.selectedSeats.includes(r),m=h.selectedSeats.length>=t&&!i;a.hidden=!o,a.classList.toggle("is-selected",i),a.classList.toggle("is-occupied",s),a.classList.toggle("is-disabled",!s&&m),a.disabled=!o||s||!i&&m,s?a.title="Kursi sudah dipesan":a.title=""}),Gs(),Js()}function vt(){document.getElementById("booking-form")?.reset(),h.editItem=null,h.selectedSeats=[],h.passengerDraftMap={};const t=h.date||Oe();document.getElementById("booking-id").value="",document.getElementById("booking-form-title").textContent="Tambah Pemesanan",document.getElementById("booking-form-description").textContent="Lengkapi data pemesanan reguler dari dashboard admin.",document.getElementById("booking-trip-date").value=t,document.getElementById("booking-passenger-count").value="1",document.getElementById("booking-payment-method").value="",document.getElementById("booking-booking-status").value="Draft",Gt(),Se(),se(document.getElementById("booking-submit-btn"),!1,"Menyimpan..."),rt().then(()=>{fe(),ge()})}function Ws(e){h.editItem=e,h.selectedSeats=Vt(e.selected_seats||[]),h.passengerDraftMap=Object.fromEntries((e.passengers||[]).map(t=>[t.seat_no,t])),document.getElementById("booking-id").value=e.id,document.getElementById("booking-booking-for").value=e.booking_for,document.getElementById("booking-category").value=e.category,document.getElementById("booking-from-city").value=e.from_city,document.getElementById("booking-to-city").value=e.to_city,document.getElementById("booking-trip-date").value=e.trip_date_value,document.getElementById("booking-trip-time").value=e.trip_time_value,document.getElementById("booking-passenger-count").value=String(e.passenger_count),document.getElementById("booking-driver-name").value=e.driver_name==="Menunggu Penetapan Driver"?"":e.driver_name||"",document.getElementById("booking-pickup-location").value=e.pickup_location,document.getElementById("booking-dropoff-location").value=e.dropoff_location,document.getElementById("booking-payment-method").value=e.payment_method_value||"",Gt(),document.getElementById("booking-payment-status").value=e.payment_status,document.getElementById("booking-booking-status").value=e.booking_status,document.getElementById("booking-bank-account-code").value=e.bank_account_code||"",document.getElementById("booking-notes").value=e.notes||"",document.getElementById("booking-form-title").textContent="Edit Pemesanan",document.getElementById("booking-form-description").textContent="Perbarui data pemesanan reguler yang dipilih.",Se(),se(document.getElementById("booking-submit-btn"),!1,"Menyimpan..."),rt().then(()=>{fe(),ge(e.passengers||[])})}function Ks(){return _t(),{booking_for:document.getElementById("booking-booking-for")?.value||"",category:document.getElementById("booking-category")?.value||"Reguler",from_city:document.getElementById("booking-from-city")?.value||"",to_city:document.getElementById("booking-to-city")?.value||"",trip_date:document.getElementById("booking-trip-date")?.value||"",trip_time:document.getElementById("booking-trip-time")?.value||"",passenger_count:Number(document.getElementById("booking-passenger-count")?.value||0),driver_name:document.getElementById("booking-driver-name")?.value.trim()||"",pickup_location:document.getElementById("booking-pickup-location")?.value.trim()||"",dropoff_location:document.getElementById("booking-dropoff-location")?.value.trim()||"",selected_seats:h.selectedSeats,passengers:h.selectedSeats.map(e=>({seat_no:e,name:h.passengerDraftMap?.[e]?.name||"",phone:h.passengerDraftMap?.[e]?.phone||""})),payment_method:document.getElementById("booking-payment-method")?.value||"",payment_status:document.getElementById("booking-payment-status")?.value||"Belum Bayar",booking_status:document.getElementById("booking-booking-status")?.value||"Draft",bank_account_code:document.getElementById("booking-bank-account-code")?.value||"",notes:document.getElementById("booking-notes")?.value.trim()||""}}async function zs(e){Ws(await I(`/bookings/${e}`)),D("booking-form-modal")}function Xs(e){h.deleteItem=e,document.getElementById("booking-delete-copy").innerHTML=`Apakah Anda yakin ingin menghapus data pemesanan <strong>${p(e.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`,D("booking-delete-modal")}function Nn(){const e=document.getElementById("bookings-access-note"),t=document.getElementById("bpg-route-tabs"),n=document.getElementById("bpg-slots-shell");e&&(e.hidden=!1),t&&(t.hidden=!0),n&&(n.hidden=!0)}function Zs({user:e}={}){const t=document.getElementById("bookings-add-btn"),n=document.getElementById("bookings-date-picker"),a=document.getElementById("bpg-route-tabs"),r=document.getElementById("bpg-slots-shell"),o=document.getElementById("booking-form"),s=document.getElementById("booking-delete-confirm-btn"),i=document.getElementById("booking-seat-grid"),m=document.getElementById("booking-passenger-editor"),d=document.getElementById("booking-payment-method");if(h.formOptions=yt("bookings-form-options"),h.drivers=yt("bookings-drivers-data")||[],h.mobils=yt("bookings-mobils-data")||[],h.currentUser=e||window.transitAuthUser||null,h.date=Oe(),!$s(h.currentUser?.role)){Nn();return}n&&(n.value=h.date,n.addEventListener("change",async()=>{h.date=n.value,h.slotDriverMap={},h.slotMobilMap={},await Ie()})),a?.addEventListener("click",async c=>{const f=c.target.closest("[data-direction]");if(!f)return;const y=f.dataset.direction;y!==h.direction&&(h.direction=y,h.slotDriverMap={},h.slotMobilMap={},document.querySelectorAll(".bpg-route-tab").forEach(g=>{g.classList.toggle("is-active",g.dataset.direction===y)}),await Ie())});function l(c=null){r?.querySelectorAll("[data-depart-dropdown]").forEach(f=>{String(f.dataset.departDropdown)!==String(c)&&(f.querySelector(".bpg-depart-menu")?.removeAttribute("hidden"),f.querySelector(".bpg-depart-menu")?.setAttribute("hidden",""))})}return document.addEventListener("click",c=>{c.target.closest("[data-depart-dropdown]")||l()}),r?.addEventListener("click",async c=>{const f=c.target.closest("[data-depart-toggle]"),y=c.target.closest("[data-booking-departure]"),g=c.target.closest("[data-booking-lihat]"),k=c.target.closest("[data-booking-edit]"),b=c.target.closest("[data-booking-delete]");try{if(f){const _=f.dataset.departToggle,x=r.querySelector(`[data-depart-dropdown="${CSS.escape(_)}"]`)?.querySelector(".bpg-depart-menu");if(!x)return;const R=x.hasAttribute("hidden");l(_),x.toggleAttribute("hidden",!R);return}if(y){const _=y.dataset.bookingDeparture,A=y.dataset.departureStatus,x=h.bookings.find(q=>String(q.id)===String(_));if(!x)return;const R=x.departure_status===A?"":A;x.departure_status=R;const O=r.querySelector(`[data-depart-dropdown="${CSS.escape(_)}"]`);if(O){const q=O.querySelector(".bpg-depart-trigger"),H=departureStatusMeta(R);q.className=`bpg-depart-trigger ${H.cls}`,q.childNodes.forEach(z=>{z.nodeType===3&&(z.textContent=H.label)}),O.querySelectorAll("[data-booking-departure]").forEach(z=>{z.classList.toggle("is-active",z.dataset.departureStatus===R)}),O.querySelector(".bpg-depart-menu")?.setAttribute("hidden","")}await I(`/bookings/${_}/departure-status`,{method:"PATCH",body:{departure_status:R}});return}if(g){const _=g.dataset.bookingLihat,A=h.bookings.find(x=>String(x.id)===String(_));A&&Os(A);return}if(k){await zs(k.dataset.bookingEdit);return}b&&Xs({id:b.dataset.bookingDelete,nama:b.dataset.bookingName})}catch(_){v(_.message||"Gagal memuat data pemesanan")}}),r?.addEventListener("change",async c=>{const f=c.target.closest("[data-slot-driver]"),y=c.target.closest("[data-slot-mobil]");if(f){const g=f.dataset.slotDriver,k=f.value,b=f.options[f.selectedIndex],_=k&&b?.text.split(" (")[0]||"",A=`${g}__${h.direction}`;h.slotDriverMap[A]=k;try{await I("/bookings/slot-assign",{method:"PATCH",body:{trip_date:h.date,trip_time:g,direction:h.direction,driver_id:k||null,driver_name:_}}),P("Driver berhasil diperbarui")}catch(x){v(x.message||"Gagal memperbarui driver")}}if(y){const g=y.dataset.slotMobil,k=y.value,b=`${g}__${h.direction}`;h.slotMobilMap[b]=k}}),t?.addEventListener("click",()=>{vt(),D("booking-form-modal")}),i?.addEventListener("click",c=>{const f=c.target.closest("[data-seat-code]");if(!f||f.disabled)return;_t();const y=f.dataset.seatCode;h.selectedSeats.includes(y)?h.selectedSeats=h.selectedSeats.filter(g=>g!==y):h.selectedSeats.length<ut()&&(h.selectedSeats=Vt([...h.selectedSeats,y])),fe(),ge()}),document.getElementById("booking-passenger-count")?.addEventListener("change",()=>{_t(),fe(),ge(),Se()}),document.getElementById("booking-trip-date")?.addEventListener("change",()=>{rt().then(()=>{fe(),ge()})}),document.getElementById("booking-trip-time")?.addEventListener("change",()=>{rt().then(()=>{fe(),ge()})}),document.getElementById("booking-from-city")?.addEventListener("change",Se),document.getElementById("booking-to-city")?.addEventListener("change",Se),d?.addEventListener("change",Gt),m?.addEventListener("input",c=>{const f=c.target.closest("[data-passenger-seat]");if(!f)return;const y=f.dataset.passengerSeat;h.passengerDraftMap[y]={seat_no:y,name:f.querySelector("[data-passenger-name]")?.value.trim()||"",phone:f.querySelector("[data-passenger-phone]")?.value.trim()||""}}),o?.addEventListener("submit",async c=>{c.preventDefault();const f=document.getElementById("booking-submit-btn");se(f,!0,"Menyimpan...");try{const y=Ks();h.editItem?(await I(`/bookings/${h.editItem.id}`,{method:"PUT",body:y}),P("Data pemesanan berhasil diperbarui")):(await I("/bookings",{method:"POST",body:y}),P("Data pemesanan berhasil ditambahkan")),V("booking-form-modal"),vt(),await Ie()}catch(y){v(y.message||"Silakan periksa kembali data yang diinput","Gagal menyimpan data pemesanan")}finally{se(f,!1,"Menyimpan...")}}),s?.addEventListener("click",async()=>{if(h.deleteItem){se(s,!0,"Menghapus...");try{await I(`/bookings/${h.deleteItem.id}`,{method:"DELETE"}),P("Data pemesanan berhasil dihapus"),V("booking-delete-modal"),h.deleteItem=null,await Ie()}catch(c){v(c.message||"Gagal menghapus data pemesanan")}finally{se(s,!1,"Menghapus...")}}}),vt(),Ie().catch(c=>{if(c.status===403){Nn();return}v(c.message||"Gagal memuat data penumpang")})}function Qs(e){const t=document.getElementById(e);if(!t)return{};try{return JSON.parse(t.textContent||"{}")}catch{return{}}}function Ys(){const e=document.querySelector("[data-regular-booking-page]");if(!e)return;const t=Qs("regular-booking-route-matrix"),n=e.querySelector("[data-booking-origin]"),a=e.querySelector("[data-booking-destination]"),r=e.querySelector("[data-booking-schedule]"),o=e.querySelector("[data-booking-passengers]"),s=e.querySelector("[data-route-fare-input]"),i=e.querySelector("[data-estimated-total-input]"),m=e.querySelector("[data-route-feedback]"),d=e.querySelector("[data-route-feedback-title]"),l=e.querySelector("[data-route-feedback-text]"),c=e.querySelector("[data-booking-submit]"),f=Array.from(e.querySelectorAll("[data-booking-type]")),y=e.querySelector("[data-summary-booking-for]"),g=e.querySelector("[data-summary-route]"),k=e.querySelector("[data-summary-schedule]"),b=e.querySelector("[data-summary-passengers]"),_=e.querySelector("[data-summary-fare]"),A=e.querySelector("[data-summary-total]"),x=new Map(f.map(T=>[T.value,T.dataset.label||T.value])),R=new Map(Array.from(r?.options||[]).filter(T=>T.value).map(T=>[T.value,T.textContent.trim()]));function O(T,U){if(!T||!U||T===U)return null;const W=t?.[T]?.[U];return W==null?null:Number(W)}function q(T,U,W){!m||!d||!l||(m.dataset.state=T,d.textContent=U,l.textContent=W)}function H(){e.querySelectorAll(".regular-booking-radio").forEach(T=>{const U=T.querySelector('input[type="radio"]');T.classList.toggle("is-selected",!!U?.checked)})}function z(T){return T<=0?"Belum dipilih":T===6?"6 Penumpang (Opsional tambahan)":`${T} Penumpang`}function Q(){const T=n?.value||"",U=a?.value||"",W=r?.value||"",Y=Number(o?.value||0),ee=f.find(je=>je.checked)?.value||"",X=O(T,U),N=X!==null&&Y>0?X*Y:null;s&&(s.value=X!==null?M(X):""),i&&(i.value=N!==null?M(N):""),!T||!U?q("idle","Tarif akan ditampilkan otomatis","Pilih asal dan tujuan untuk melihat tarif perjalanan reguler."):T===U?q("error","Asal dan tujuan tidak boleh sama","Silakan pilih tujuan yang berbeda agar tarif dapat dihitung."):X===null?q("error","Rute belum tersedia","Rute yang Anda pilih saat ini belum tersedia. Silakan pilih kombinasi asal dan tujuan lain."):q("ready","Rute tersedia","Tarif telah diisi otomatis berdasarkan kombinasi rute dua arah yang tersedia."),c&&(c.disabled=!!(T&&U&&(T===U||X===null))),y&&(y.textContent=x.get(ee)||"Belum dipilih"),g&&(g.textContent=T&&U?`${T} - ${U}`:"Belum dipilih"),k&&(k.textContent=R.get(W)||"Belum dipilih"),b&&(b.textContent=z(Y)),_&&(_.textContent=X!==null?M(X):"Belum tersedia"),A&&(A.textContent=N!==null?M(N):"Belum tersedia"),H()}[n,a,r,o].forEach(T=>{T?.addEventListener("change",Q)}),f.forEach(T=>{T.addEventListener("change",Q)}),e.querySelector("form")?.addEventListener("reset",()=>{window.requestAnimationFrame(Q)}),Q()}function ei(){const e=document.querySelector("[data-regular-booking-seat-page]");if(!e)return;const t=Number(e.dataset.requiredSeatCount||0),n=Array.from(e.querySelectorAll("[data-seat-card]")),a=Array.from(e.querySelectorAll("[data-seat-input]")),r=e.querySelector("[data-seat-summary-count]"),o=e.querySelector("[data-seat-summary-list]"),s=e.querySelector("[data-seat-summary-remaining]"),i=e.querySelector("[data-seat-submit]"),m=e.querySelector("[data-seat-feedback]"),d=e.querySelector("[data-seat-feedback-title]"),l=e.querySelector("[data-seat-feedback-text]");function c(){return a.filter(k=>k.checked).map(k=>k.value)}function f(k){return k.length>0?k.join(", "):"Belum dipilih"}function y(k,b,_){!m||!d||!l||(m.dataset.state=k,d.textContent=b,l.textContent=_)}function g(){const k=c(),b=k.length,_=t>0&&b>=t;if(n.forEach(A=>{const x=A.querySelector("[data-seat-input]");if(!x)return;const R=x.checked,O=_&&!R;x.disabled=O,A.classList.toggle("is-selected",R),A.classList.toggle("is-disabled",O)}),r&&(r.textContent=`${b} dari ${t}`),o&&(o.textContent=f(k)),s&&(s.textContent=String(Math.max(t-b,0))),i&&(i.disabled=b!==t),b===0){y("idle","Pilih kursi sesuai jumlah penumpang","Jumlah kursi yang dipilih harus sama dengan jumlah penumpang pada booking draft.");return}if(b<t){y("idle","Pemilihan kursi belum lengkap",`Masih perlu memilih ${t-b} kursi lagi sebelum dapat melanjutkan.`);return}if(t===6){y("ready","Semua kursi sudah terisi","Jumlah penumpang 6 orang sudah terpenuhi dan kursi tambahan 2B ikut terpakai.");return}y("ready","Kursi sudah sesuai","Jumlah kursi yang dipilih sudah sesuai dengan jumlah penumpang dan siap disimpan.")}a.forEach(k=>{k.addEventListener("change",()=>{g()})}),g()}const ti={"admin-users/index":Is,"auth/login":ho,"bookings/index":Zs,"dashboard/index":xo,"drivers/index":No,"mobil/index":Xo,"keberangkatan/index":as,"regular-bookings/index":Ys,"regular-bookings/seats":ei,"stock/index":ls};document.addEventListener("DOMContentLoaded",async()=>{po(),bo(),We(ma());const e=so();e&&(e.type==="success"?P(e.message,e.title):e.type==="info"?go(e.message,e.title):v(e.message,e.title));try{const{user:t}=await mo();t&&We(t);const n=document.body.dataset.pageScript,a=ti[n];typeof a=="function"&&await a({user:t})}catch(t){console.error(t),v(t.message||"Terjadi kesalahan saat memuat halaman")}});
