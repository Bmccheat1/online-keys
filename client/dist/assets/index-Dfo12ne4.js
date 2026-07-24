const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Home-B-2VWC2c.js","assets/vendor-DlynzHKv.js","assets/chevron-down-DIu8fe7N.js","assets/sparkles-C4Ev12nK.js","assets/percent-1MqpzQCa.js","assets/shield-check-CybDtoyY.js","assets/clock-BfGBanLk.js","assets/utils-DhXgJQ-f.js","assets/Login-BMbM8C06.js","assets/NotFound-dnsnPMfJ.js","assets/Dashboard-Df4r_Lkt.js","assets/dollar-sign-ys9kobli.js","assets/ManageMods-pL_1x5xk.js","assets/plus-BIIRW9fu.js","assets/trash-2-Cb4gqzG5.js","assets/AddMod-BnhjqMit.js","assets/AdminKeys-DDK4FFVH.js","assets/AvailableKeys-BqHAXT5Z.js","assets/CouponsPage-KgCbDFB_.js","assets/OrdersList-CcCfYuXn.js","assets/SettingsPage-DD7IT9AZ.js"])))=>i.map(i=>d[i]);
import{r as l,a as ge,u as ye,L as J,N as O,b as be,c as ve,R as je,d as y,e as ke,B as we}from"./vendor-DlynzHKv.js";import{a as _e}from"./utils-DhXgJQ-f.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function a(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(n){if(n.ep)return;n.ep=!0;const i=a(n);fetch(n.href,i)}})();var ae={exports:{}},M={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ee=l,Ce=Symbol.for("react.element"),Ae=Symbol.for("react.fragment"),Ne=Object.prototype.hasOwnProperty,$e=Ee.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Oe={key:!0,ref:!0,__self:!0,__source:!0};function re(e,t,a){var o,n={},i=null,s=null;a!==void 0&&(i=""+a),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(s=t.ref);for(o in t)Ne.call(t,o)&&!Oe.hasOwnProperty(o)&&(n[o]=t[o]);if(e&&e.defaultProps)for(o in t=e.defaultProps,t)n[o]===void 0&&(n[o]=t[o]);return{$$typeof:Ce,type:e,key:i,ref:s,props:n,_owner:$e.current}}M.Fragment=Ae;M.jsx=re;M.jsxs=re;ae.exports=M;var r=ae.exports,K={},Y=ge;K.createRoot=Y.createRoot,K.hydrateRoot=Y.hydrateRoot;let Le={data:""},Pe=e=>{if(typeof window=="object"){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||Le},Se=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,Ie=/\/\*[^]*?\*\/|  +/g,Q=/\n+/g,A=(e,t)=>{let a="",o="",n="";for(let i in e){let s=e[i];i[0]=="@"?i[1]=="i"?a=i+" "+s+";":o+=i[1]=="f"?A(s,i):i+"{"+A(s,i[1]=="k"?"":t)+"}":typeof s=="object"?o+=A(s,t?t.replace(/([^,])+/g,c=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,d=>/&/.test(d)?d.replace(/&/g,c):c?c+" "+d:d)):i):s!=null&&(i=i[1]=="-"?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),n+=A.p?A.p(i,s):i+":"+s+";")}return a+(t&&n?t+"{"+n+"}":n)+o},C={},se=e=>{if(typeof e=="object"){let t="";for(let a in e)t+=a+se(e[a]);return t}return e},Re=(e,t,a,o,n)=>{let i=se(e),s=C[i]||(C[i]=(d=>{let u=0,h=11;for(;u<d.length;)h=101*h+d.charCodeAt(u++)>>>0;return"go"+h})(i));if(!C[s]){let d=i!==e?e:(u=>{let h,m,f=[{}];for(;h=Se.exec(u.replace(Ie,""));)h[4]?f.shift():h[3]?(m=h[3].replace(Q," ").trim(),f.unshift(f[0][m]=f[0][m]||{})):f[0][h[1]]=h[2].replace(Q," ").trim();return f[0]})(e);C[s]=A(n?{["@keyframes "+s]:d}:d,a?"":"."+s)}let c=a&&C.g;return a&&(C.g=C[s]),((d,u,h,m)=>{m?u.data=u.data.replace(m,d):u.data.indexOf(d)===-1&&(u.data=h?d+u.data:u.data+d)})(C[s],t,o,c),s},ze=(e,t,a)=>e.reduce((o,n,i)=>{let s=t[i];if(s&&s.call){let c=s(a),d=c&&c.props&&c.props.className||/^go/.test(c)&&c;s=d?"."+d:c&&typeof c=="object"?c.props?"":A(c,""):c===!1?"":c}return o+n+(s??"")},"");function D(e){let t=this||{},a=e.call?e(t.p):e;return Re(a.unshift?a.raw?ze(a,[].slice.call(arguments,1),t.p):a.reduce((o,n)=>Object.assign(o,n&&n.call?n(t.p):n),{}):a,Pe(t.target),t.g,t.o,t.k)}let oe,F,U;D.bind({g:1});let E=D.bind({k:1});function Me(e,t,a,o){A.p=t,oe=e,F=a,U=o}function N(e,t){let a=this||{};return function(){let o=arguments;function n(i,s){let c=Object.assign({},i),d=c.className||n.className;a.p=Object.assign({theme:F&&F()},c),a.o=/go\d/.test(d),c.className=D.apply(a,o)+(d?" "+d:"");let u=e;return e[0]&&(u=c.as||e,delete c.as),U&&u[0]&&U(c),oe(u,c)}return n}}var De=e=>typeof e=="function",z=(e,t)=>De(e)?e(t):e,Te=(()=>{let e=0;return()=>(++e).toString()})(),ne=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),Ve=20,W="default",ie=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(s=>s.id===t.toast.id?{...s,...t.toast}:s)};case 2:let{toast:o}=t;return ie(e,{type:e.toasts.find(s=>s.id===o.id)?1:0,toast:o});case 3:let{toastId:n}=t;return{...e,toasts:e.toasts.map(s=>s.id===n||n===void 0?{...s,dismissed:!0,visible:!1}:s)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(s=>s.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(s=>({...s,pauseDuration:s.pauseDuration+i}))}}},R=[],le={toasts:[],pausedAt:void 0,settings:{toastLimit:Ve}},w={},de=(e,t=W)=>{w[t]=ie(w[t]||le,e),R.forEach(([a,o])=>{a===t&&o(w[t])})},ce=e=>Object.keys(w).forEach(t=>de(e,t)),Be=e=>Object.keys(w).find(t=>w[t].toasts.some(a=>a.id===e)),T=(e=W)=>t=>{de(t,e)},He={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},Ke=(e={},t=W)=>{let[a,o]=l.useState(w[t]||le),n=l.useRef(w[t]);l.useEffect(()=>(n.current!==w[t]&&o(w[t]),R.push([t,o]),()=>{let s=R.findIndex(([c])=>c===t);s>-1&&R.splice(s,1)}),[t]);let i=a.toasts.map(s=>{var c,d,u;return{...e,...e[s.type],...s,removeDelay:s.removeDelay||((c=e[s.type])==null?void 0:c.removeDelay)||(e==null?void 0:e.removeDelay),duration:s.duration||((d=e[s.type])==null?void 0:d.duration)||(e==null?void 0:e.duration)||He[s.type],style:{...e.style,...(u=e[s.type])==null?void 0:u.style,...s.style}}});return{...a,toasts:i}},Fe=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(a==null?void 0:a.id)||Te()}),P=e=>(t,a)=>{let o=Fe(t,e,a);return T(o.toasterId||Be(o.id))({type:2,toast:o}),o.id},g=(e,t)=>P("blank")(e,t);g.error=P("error");g.success=P("success");g.loading=P("loading");g.custom=P("custom");g.dismiss=(e,t)=>{let a={type:3,toastId:e};t?T(t)(a):ce(a)};g.dismissAll=e=>g.dismiss(void 0,e);g.remove=(e,t)=>{let a={type:4,toastId:e};t?T(t)(a):ce(a)};g.removeAll=e=>g.remove(void 0,e);g.promise=(e,t,a)=>{let o=g.loading(t.loading,{...a,...a==null?void 0:a.loading});return typeof e=="function"&&(e=e()),e.then(n=>{let i=t.success?z(t.success,n):void 0;return i?g.success(i,{id:o,...a,...a==null?void 0:a.success}):g.dismiss(o),n}).catch(n=>{let i=t.error?z(t.error,n):void 0;i?g.error(i,{id:o,...a,...a==null?void 0:a.error}):g.dismiss(o)}),e};var Ue=1e3,We=(e,t="default")=>{let{toasts:a,pausedAt:o}=Ke(e,t),n=l.useRef(new Map).current,i=l.useCallback((m,f=Ue)=>{if(n.has(m))return;let x=setTimeout(()=>{n.delete(m),s({type:4,toastId:m})},f);n.set(m,x)},[]);l.useEffect(()=>{if(o)return;let m=Date.now(),f=a.map(x=>{if(x.duration===1/0)return;let $=(x.duration||0)+x.pauseDuration-(m-x.createdAt);if($<0){x.visible&&g.dismiss(x.id);return}return setTimeout(()=>g.dismiss(x.id,t),$)});return()=>{f.forEach(x=>x&&clearTimeout(x))}},[a,o,t]);let s=l.useCallback(T(t),[t]),c=l.useCallback(()=>{s({type:5,time:Date.now()})},[s]),d=l.useCallback((m,f)=>{s({type:1,toast:{id:m,height:f}})},[s]),u=l.useCallback(()=>{o&&s({type:6,time:Date.now()})},[o,s]),h=l.useCallback((m,f)=>{let{reverseOrder:x=!1,gutter:$=8,defaultPosition:S}=f||{},L=a.filter(v=>(v.position||S)===(m.position||S)&&v.height),xe=L.findIndex(v=>v.id===m.id),Z=L.filter((v,V)=>V<xe&&v.visible).length;return L.filter(v=>v.visible).slice(...x?[Z+1]:[0,Z]).reduce((v,V)=>v+(V.height||0)+$,0)},[a]);return l.useEffect(()=>{a.forEach(m=>{if(m.dismissed)i(m.id,m.removeDelay);else{let f=n.get(m.id);f&&(clearTimeout(f),n.delete(m.id))}})},[a,i]),{toasts:a,handlers:{updateHeight:d,startPause:c,endPause:u,calculateOffset:h}}},qe=E`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Ze=E`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Je=E`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Ye=N("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${qe} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Ze} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${Je} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Qe=E`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Xe=N("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Qe} 1s linear infinite;
`,Ge=E`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,et=E`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,tt=N("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Ge} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${et} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,at=N("div")`
  position: absolute;
`,rt=N("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,st=E`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ot=N("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${st} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,nt=({toast:e})=>{let{icon:t,type:a,iconTheme:o}=e;return t!==void 0?typeof t=="string"?l.createElement(ot,null,t):t:a==="blank"?null:l.createElement(rt,null,l.createElement(Xe,{...o}),a!=="loading"&&l.createElement(at,null,a==="error"?l.createElement(Ye,{...o}):l.createElement(tt,{...o})))},it=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,lt=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,dt="0%{opacity:0;} 100%{opacity:1;}",ct="0%{opacity:1;} 100%{opacity:0;}",ut=N("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,mt=N("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,pt=(e,t)=>{let a=e.includes("top")?1:-1,[o,n]=ne()?[dt,ct]:[it(a),lt(a)];return{animation:t?`${E(o)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${E(n)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},ht=l.memo(({toast:e,position:t,style:a,children:o})=>{let n=e.height?pt(e.position||t||"top-center",e.visible):{opacity:0},i=l.createElement(nt,{toast:e}),s=l.createElement(mt,{...e.ariaProps},z(e.message,e));return l.createElement(ut,{className:e.className,style:{...n,...a,...e.style}},typeof o=="function"?o({icon:i,message:s}):l.createElement(l.Fragment,null,i,s))});Me(l.createElement);var ft=({id:e,className:t,style:a,onHeightUpdate:o,children:n})=>{let i=l.useCallback(s=>{if(s){let c=()=>{let d=s.getBoundingClientRect().height;o(e,d)};c(),new MutationObserver(c).observe(s,{subtree:!0,childList:!0,characterData:!0})}},[e,o]);return l.createElement("div",{ref:i,className:t,style:a},n)},xt=(e,t)=>{let a=e.includes("top"),o=a?{top:0}:{bottom:0},n=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:ne()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...o,...n}},gt=D`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,I=16,yt=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:o,children:n,toasterId:i,containerStyle:s,containerClassName:c})=>{let{toasts:d,handlers:u}=We(a,i);return l.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:I,left:I,right:I,bottom:I,pointerEvents:"none",...s},className:c,onMouseEnter:u.startPause,onMouseLeave:u.endPause},d.map(h=>{let m=h.position||t,f=u.calculateOffset(h,{reverseOrder:e,gutter:o,defaultPosition:t}),x=xt(m,f);return l.createElement(ft,{id:h.id,key:h.id,onHeightUpdate:u.updateHeight,className:h.visible?gt:"",style:x},h.type==="custom"?z(h.message,h):n?n(h):l.createElement(ht,{toast:h,position:m}))}))},ua=g;const bt="modulepreload",vt=function(e){return"/"+e},X={},b=function(t,a,o){let n=Promise.resolve();if(a&&a.length>0){document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),c=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));n=Promise.allSettled(a.map(d=>{if(d=vt(d),d in X)return;X[d]=!0;const u=d.endsWith(".css"),h=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${h}`))return;const m=document.createElement("link");if(m.rel=u?"stylesheet":bt,u||(m.as="script"),m.crossOrigin="",m.href=d,c&&m.setAttribute("nonce",c),document.head.appendChild(m),u)return new Promise((f,x)=>{m.addEventListener("load",f),m.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${d}`)))})}))}function i(s){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=s,window.dispatchEvent(c),!c.defaultPrevented)throw s}return n.then(s=>{for(const c of s||[])c.status==="rejected"&&i(c.reason);return t().catch(i)})};function ue({size:e="md",text:t="Loading..."}){const a={sm:"h-6 w-6",md:"h-10 w-10",lg:"h-16 w-16"};return r.jsxs("div",{className:"flex flex-col items-center justify-center py-12",children:[r.jsx("div",{className:`${a[e]} animate-spin rounded-full border-4 border-dark-600 border-t-primary-500`}),t&&r.jsx("p",{className:"mt-4 text-dark-400 text-sm",children:t})]})}const jt="/api",p=_e.create({baseURL:jt,timeout:15e3,headers:{"Content-Type":"application/json"}}),q=new Map,kt=3e4;p.interceptors.request.use(e=>{const t=localStorage.getItem("token");return t&&(e.headers.Authorization=`Bearer ${t}`),e});p.interceptors.response.use(e=>{if(e.config.method==="get"&&e.config.cache!==!1){const t=e.config.url+JSON.stringify(e.config.params||{});q.set(t,{data:e.data,timestamp:Date.now()})}return e},e=>{var t;return((t=e.response)==null?void 0:t.status)===401&&(localStorage.removeItem("token"),window.location.href="/login"),Promise.reject(e)});p.getCached=async(e,t={})=>{const a=e+JSON.stringify(t.params||{}),o=q.get(a);return o&&Date.now()-o.timestamp<kt?o.data:(await p.get(e,t)).data};p.clearCache=()=>q.clear();const B={login:e=>p.post("/auth/login",e).then(t=>t.data),register:e=>p.post("/auth/register",e).then(t=>t.data),getMe:()=>p.get("/auth/me").then(e=>e.data)},ma={getAll:e=>p.getCached("/products",{params:e}),getById:e=>p.getCached(`/products/${e}`),create:e=>(p.clearCache(),p.post("/products",e).then(t=>t.data)),update:(e,t)=>(p.clearCache(),p.put(`/products/${e}`,t).then(a=>a.data)),delete:e=>(p.clearCache(),p.delete(`/products/${e}`).then(t=>t.data))},pa={getStats:()=>p.get("/keys/stats").then(e=>e.data),clearExpired:()=>p.post("/keys/clear-expired").then(e=>e.data),getByProduct:(e,t)=>p.get(`/keys/${e}`,{params:t}).then(a=>a.data),add:e=>(p.clearCache(),p.post("/keys/add",e).then(t=>t.data)),delete:e=>(p.clearCache(),p.delete(`/keys/${e}`).then(t=>t.data))},ha={initiate:e=>p.post("/orders/initiate",e).then(t=>t.data),complete:e=>p.post("/orders/complete",e).then(t=>t.data),release:e=>p.post("/orders/release",e).then(t=>t.data),create:e=>p.post("/orders/create",e).then(t=>t.data),getMyOrders:()=>p.get("/orders/my").then(e=>e.data),getAll:e=>p.get("/orders",{params:e}).then(t=>t.data)},fa={getAll:()=>p.get("/settings").then(e=>e.data),getByKey:e=>p.get(`/settings/${e}`).then(t=>t.data),update:(e,t)=>(p.clearCache(),p.put(`/settings/${e}`,t).then(a=>a.data))},wt={get:()=>p.getCached("/config")},xa={getSummary:()=>p.get("/analytics/summary").then(e=>e.data),getSalesChart:e=>p.get(`/analytics/sales-chart?days=${e||30}`).then(t=>t.data),getTopMods:e=>p.get(`/analytics/top-mods?limit=${e||10}`).then(t=>t.data)},ga={getAll:()=>p.get("/coupons").then(e=>e.data),create:e=>p.post("/coupons",e).then(t=>t.data),update:(e,t)=>p.put(`/coupons/${e}`,t).then(a=>a.data),delete:e=>p.delete(`/coupons/${e}`).then(t=>t.data),validate:e=>p.post("/coupons/validate",e).then(t=>t.data)};/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const me=(...e)=>e.filter((t,a,o)=>!!t&&t.trim()!==""&&o.indexOf(t)===a).join(" ").trim();/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _t=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Et=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,a,o)=>o?o.toUpperCase():a.toLowerCase());/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G=e=>{const t=Et(e);return t.charAt(0).toUpperCase()+t.slice(1)};/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var H={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ct=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1},At=l.createContext({}),Nt=()=>l.useContext(At),$t=l.forwardRef(({color:e,size:t,strokeWidth:a,absoluteStrokeWidth:o,className:n="",children:i,iconNode:s,...c},d)=>{const{size:u=24,strokeWidth:h=2,absoluteStrokeWidth:m=!1,color:f="currentColor",className:x=""}=Nt()??{},$=o??m?Number(a??h)*24/Number(t??u):a??h;return l.createElement("svg",{ref:d,...H,width:t??u??H.width,height:t??u??H.height,stroke:e??f,strokeWidth:$,className:me("lucide",x,n),...!i&&!Ct(c)&&{"aria-hidden":"true"},...c},[...s.map(([S,L])=>l.createElement(S,L)),...Array.isArray(i)?i:[i]])});/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=(e,t)=>{const a=l.forwardRef(({className:o,...n},i)=>l.createElement($t,{ref:i,iconNode:t,className:me(`lucide-${_t(G(e))}`,`lucide-${e}`,o),...n}));return a.displayName=G(e),a};/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ot=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]],Lt=_("chart-column",Ot);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pt=[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}],["path",{d:"M12 11h4",key:"1jrz19"}],["path",{d:"M12 16h4",key:"n85exb"}],["path",{d:"M8 11h.01",key:"1dfujw"}],["path",{d:"M8 16h.01",key:"18s6g9"}]],St=_("clipboard-list",Pt);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const It=[["path",{d:"M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",key:"1s6t7t"}],["circle",{cx:"16.5",cy:"7.5",r:".5",fill:"currentColor",key:"w0ekpg"}]],Rt=_("key-round",It);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zt=[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]],Mt=_("layout-dashboard",zt);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dt=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],Tt=_("log-out",Dt);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vt=[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]],Bt=_("menu",Vt);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ht=[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",key:"1a0edw"}],["path",{d:"M12 22V12",key:"d0xqtd"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}]],Kt=_("package",Ht);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ft=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],pe=_("settings",Ft);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ut=[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",key:"vktsd0"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor",key:"kqv944"}]],Wt=_("tag",Ut);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qt=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],Zt=_("x",qt);function Jt(){const e=ye(),[t,a]=l.useState("KeyStore");return l.useEffect(()=>{wt.get().then(o=>{var n;(n=o==null?void 0:o.data)!=null&&n.siteName&&a(o.data.siteName)}).catch(()=>{})},[]),e.pathname.startsWith("/admin")?null:r.jsxs("header",{className:"relative z-50",children:[r.jsx("div",{className:"max-w-7xl mx-auto px-4 py-3",children:r.jsxs("div",{className:"flex items-center justify-center relative",children:[r.jsx(J,{to:"/",className:"text-lg md:text-xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400",children:t}),r.jsx(J,{to:"/login",className:"absolute right-0 text-gray-600 hover:text-amber-400 transition-colors",title:"Admin",children:r.jsx(pe,{className:"w-4 h-4 md:w-5 md:h-5"})})]})}),r.jsx("div",{className:"absolute bottom-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"})]})}const he=l.createContext(null);function Yt({children:e}){const[t,a]=l.useState(null),[o,n]=l.useState(!0);l.useEffect(()=>{localStorage.getItem("token")?B.getMe().then(u=>a(u.data)).catch(()=>localStorage.removeItem("token")).finally(()=>n(!1)):n(!1)},[]);const i=l.useCallback(async(d,u)=>{const h=await B.login({email:d,password:u});return localStorage.setItem("token",h.data.token),a(h.data),h.data},[]),s=l.useCallback(async(d,u,h)=>{const m=await B.register({name:d,email:u,password:h});return localStorage.setItem("token",m.data.token),a(m.data),m.data},[]),c=l.useCallback(()=>{localStorage.removeItem("token"),a(null)},[]);return r.jsx(he.Provider,{value:{user:t,loading:o,login:i,register:s,logout:c},children:e})}const fe=()=>{const e=l.useContext(he);if(!e)throw new Error("useAuth must be used within AuthProvider");return e};function j({children:e,adminOnly:t=!1}){const{user:a,loading:o}=fe();return o?r.jsx(ue,{text:"Checking authentication..."}):a?t&&a.role!=="admin"?r.jsx(O,{to:"/",replace:!0}):e:r.jsx(O,{to:"/login",replace:!0})}const Qt=[{to:"/admin/dashboard",label:"Dashboard",icon:Mt},{to:"/admin/mods",label:"Mods",icon:Kt},{to:"/admin/keys",label:"License Keys",icon:Rt},{to:"/admin/available-keys",label:"Available Keys",icon:Lt},{to:"/admin/coupons",label:"Coupons",icon:Wt},{to:"/admin/orders",label:"Orders",icon:St},{to:"/admin/settings",label:"Settings",icon:pe}],Xt=l.memo(function(){const{user:t,logout:a}=fe(),o=be(),[n,i]=l.useState(!1);l.useEffect(()=>{const d=()=>i(!1);return window.addEventListener("popstate",d),()=>window.removeEventListener("popstate",d)},[]);const s=()=>{a(),o("/")},c=r.jsxs("div",{className:"flex flex-col h-full",children:[r.jsx("div",{className:"px-4 py-5 border-b border-[#1e1e2e]/60",children:r.jsx("h2",{className:"text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400",children:"Admin Panel"})}),r.jsx("nav",{className:"flex-1 overflow-y-auto px-3 py-4 space-y-1",children:Qt.map(d=>{const u=d.icon;return r.jsxs(ve,{to:d.to,end:d.to==="/admin/dashboard",onClick:()=>i(!1),className:({isActive:h})=>`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${h?"bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-sm shadow-amber-500/5":"text-gray-400 hover:bg-[#0a0a14]/60 hover:text-gray-200 border border-transparent"}`,children:[r.jsx(u,{className:"w-4 h-4 flex-shrink-0"}),r.jsx("span",{children:d.label})]},d.to)})}),r.jsxs("div",{className:"px-3 py-4 border-t border-[#1e1e2e]/60",children:[t&&r.jsx("div",{className:"px-3 pb-2 mb-2",children:r.jsx("p",{className:"text-xs text-gray-500 truncate",children:t.name||t.email})}),r.jsxs("button",{onClick:s,className:"flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 border border-transparent hover:border-red-500/20 transition-all duration-200",children:[r.jsx(Tt,{className:"w-4 h-4 flex-shrink-0"}),r.jsx("span",{children:"Logout"})]})]})]});return r.jsxs(r.Fragment,{children:[r.jsx("button",{onClick:()=>i(!n),className:"fixed top-3 left-3 z-[60] lg:hidden bg-[#0d0d1a]/90 backdrop-blur-xl border border-[#1e1e2e]/80 rounded-xl p-2.5 shadow-xl","aria-label":"Toggle menu",children:n?r.jsx(Zt,{className:"w-5 h-5 text-amber-400"}):r.jsx(Bt,{className:"w-5 h-5 text-amber-400"})}),n&&r.jsx("div",{className:"fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden",onClick:()=>i(!1)}),r.jsx("aside",{className:`
          fixed lg:static inset-y-0 left-0 z-50 w-64 flex-shrink-0
          bg-[#0d0d1a]/95 backdrop-blur-xl border-r border-[#1e1e2e]/60
          transition-transform duration-300 ease-in-out
          ${n?"translate-x-0":"-translate-x-full lg:translate-x-0"}
        `,children:c})]})}),Gt=l.lazy(()=>b(()=>import("./Home-B-2VWC2c.js"),__vite__mapDeps([0,1,2,3,4,5,6,7]))),ea=l.lazy(()=>b(()=>import("./Login-BMbM8C06.js"),__vite__mapDeps([8,1,7]))),ta=l.lazy(()=>b(()=>import("./NotFound-dnsnPMfJ.js"),__vite__mapDeps([9,1,7]))),ee=l.lazy(()=>b(()=>import("./Dashboard-Df4r_Lkt.js"),__vite__mapDeps([10,1,11,7]))),aa=l.lazy(()=>b(()=>import("./ManageMods-pL_1x5xk.js"),__vite__mapDeps([12,1,13,14,7]))),te=l.lazy(()=>b(()=>import("./AddMod-BnhjqMit.js"),__vite__mapDeps([15,1,13,3,7]))),ra=l.lazy(()=>b(()=>import("./AdminKeys-DDK4FFVH.js"),__vite__mapDeps([16,1,2,13,14,7]))),sa=l.lazy(()=>b(()=>import("./AvailableKeys-BqHAXT5Z.js"),__vite__mapDeps([17,1,6,2,7]))),oa=l.lazy(()=>b(()=>import("./CouponsPage-KgCbDFB_.js"),__vite__mapDeps([18,1,13,4,11,14,7]))),na=l.lazy(()=>b(()=>import("./OrdersList-CcCfYuXn.js"),__vite__mapDeps([19,1,7]))),ia=l.lazy(()=>b(()=>import("./SettingsPage-DD7IT9AZ.js"),__vite__mapDeps([20,1,5,7])));function k({children:e}){return r.jsxs("div",{className:"flex min-h-screen",children:[r.jsx(Xt,{}),r.jsx("div",{className:"flex-1 min-h-screen overflow-auto pt-14 lg:pt-0",children:r.jsx("div",{className:"p-4 md:p-6 lg:p-8 max-w-6xl mx-auto",children:e})})]})}function la(){return r.jsxs("div",{className:"min-h-screen",children:[r.jsx(Jt,{}),r.jsx("main",{children:r.jsx(l.Suspense,{fallback:r.jsx(ue,{text:"Loading..."}),children:r.jsxs(je,{children:[r.jsx(y,{path:"/",element:r.jsx(Gt,{})}),r.jsx(y,{path:"/login",element:r.jsx(ea,{})}),r.jsx(y,{path:"/mods",element:r.jsx(O,{to:"/",replace:!0})}),r.jsx(y,{path:"/mods/:id",element:r.jsx(O,{to:"/",replace:!0})}),r.jsx(y,{path:"/products",element:r.jsx(O,{to:"/",replace:!0})}),r.jsx(y,{path:"/products/:id",element:r.jsx(O,{to:"/",replace:!0})}),r.jsx(y,{path:"/admin",element:r.jsx(j,{adminOnly:!0,children:r.jsx(k,{children:r.jsx(ee,{})})})}),r.jsx(y,{path:"/admin/dashboard",element:r.jsx(j,{adminOnly:!0,children:r.jsx(k,{children:r.jsx(ee,{})})})}),r.jsx(y,{path:"/admin/mods",element:r.jsx(j,{adminOnly:!0,children:r.jsx(k,{children:r.jsx(aa,{})})})}),r.jsx(y,{path:"/admin/mods/add",element:r.jsx(j,{adminOnly:!0,children:r.jsx(k,{children:r.jsx(te,{})})})}),r.jsx(y,{path:"/admin/mods/:id",element:r.jsx(j,{adminOnly:!0,children:r.jsx(k,{children:r.jsx(te,{})})})}),r.jsx(y,{path:"/admin/keys",element:r.jsx(j,{adminOnly:!0,children:r.jsx(k,{children:r.jsx(ra,{})})})}),r.jsx(y,{path:"/admin/available-keys",element:r.jsx(j,{adminOnly:!0,children:r.jsx(k,{children:r.jsx(sa,{})})})}),r.jsx(y,{path:"/admin/coupons",element:r.jsx(j,{adminOnly:!0,children:r.jsx(k,{children:r.jsx(oa,{})})})}),r.jsx(y,{path:"/admin/orders",element:r.jsx(j,{adminOnly:!0,children:r.jsx(k,{children:r.jsx(na,{})})})}),r.jsx(y,{path:"/admin/settings",element:r.jsx(j,{adminOnly:!0,children:r.jsx(k,{children:r.jsx(ia,{})})})}),r.jsx(y,{path:"*",element:r.jsx(ta,{})})]})})})]})}K.createRoot(document.getElementById("root")).render(r.jsx(ke.StrictMode,{children:r.jsx(we,{children:r.jsxs(Yt,{children:[r.jsx(la,{}),r.jsx(yt,{position:"top-right",toastOptions:{duration:3e3,style:{background:"#1e293b",color:"#f8fafc",border:"1px solid #334155"}}})]})})}));export{Lt as C,Rt as K,ue as L,Kt as P,Wt as T,Zt as X,ga as a,xa as b,_ as c,St as d,r as j,pa as k,ha as o,ma as p,fa as s,fe as u,ua as z};
