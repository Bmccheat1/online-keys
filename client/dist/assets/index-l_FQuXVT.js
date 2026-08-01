const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Home-B0OfLfPO.js","assets/vendor-DlynzHKv.js","assets/utils-DhXgJQ-f.js","assets/sparkles-BXmpzSzC.js","assets/chevron-down-D--jBVSV.js","assets/percent-DGw5h-J6.js","assets/zap-UAiTnvTy.js","assets/clock-DpjF2WYq.js","assets/Login-vxnr7LL8.js","assets/NotFound-kNi8_-3R.js","assets/Dashboard-Dh6JAgmW.js","assets/dollar-sign-CYVFP28f.js","assets/ManageMods-BJNvU6CD.js","assets/plus-Bi8XsJjj.js","assets/trash-2-CmdLOQxi.js","assets/AddMod-BA6Uh32J.js","assets/AdminKeys-BF3_1pD7.js","assets/AvailableKeys-Dn9U7ocH.js","assets/CouponsPage-B_HBv3Vl.js","assets/OrdersList-DE6Mghat.js","assets/SettingsPage-BXs_9gKQ.js"])))=>i.map(i=>d[i]);
import{r as l,a as ye,u as be,L as J,N as O,b as ve,c as je,R as ke,d as y,e as we,B as _e}from"./vendor-DlynzHKv.js";import{a as Ne}from"./utils-DhXgJQ-f.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function a(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(n){if(n.ep)return;n.ep=!0;const i=a(n);fetch(n.href,i)}})();var ae={exports:{}},M={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ee=l,Ce=Symbol.for("react.element"),Ae=Symbol.for("react.fragment"),$e=Object.prototype.hasOwnProperty,Oe=Ee.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Le={key:!0,ref:!0,__self:!0,__source:!0};function re(e,t,a){var o,n={},i=null,s=null;a!==void 0&&(i=""+a),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(s=t.ref);for(o in t)$e.call(t,o)&&!Le.hasOwnProperty(o)&&(n[o]=t[o]);if(e&&e.defaultProps)for(o in t=e.defaultProps,t)n[o]===void 0&&(n[o]=t[o]);return{$$typeof:Ce,type:e,key:i,ref:s,props:n,_owner:Oe.current}}M.Fragment=Ae;M.jsx=re;M.jsxs=re;ae.exports=M;var r=ae.exports,F={},Y=ye;F.createRoot=Y.createRoot,F.hydrateRoot=Y.hydrateRoot;let Pe={data:""},Se=e=>{if(typeof window=="object"){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||Pe},Ie=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,Re=/\/\*[^]*?\*\/|  +/g,Q=/\n+/g,C=(e,t)=>{let a="",o="",n="";for(let i in e){let s=e[i];i[0]=="@"?i[1]=="i"?a=i+" "+s+";":o+=i[1]=="f"?C(s,i):i+"{"+C(s,i[1]=="k"?"":t)+"}":typeof s=="object"?o+=C(s,t?t.replace(/([^,])+/g,d=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,u=>/&/.test(u)?u.replace(/&/g,d):d?d+" "+u:u)):i):s!=null&&(i=i[1]=="-"?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),n+=C.p?C.p(i,s):i+":"+s+";")}return a+(t&&n?t+"{"+n+"}":n)+o},E={},se=e=>{if(typeof e=="object"){let t="";for(let a in e)t+=a+se(e[a]);return t}return e},ze=(e,t,a,o,n)=>{let i=se(e),s=E[i]||(E[i]=(u=>{let c=0,h=11;for(;c<u.length;)h=101*h+u.charCodeAt(c++)>>>0;return"go"+h})(i));if(!E[s]){let u=i!==e?e:(c=>{let h,m,f=[{}];for(;h=Ie.exec(c.replace(Re,""));)h[4]?f.shift():h[3]?(m=h[3].replace(Q," ").trim(),f.unshift(f[0][m]=f[0][m]||{})):f[0][h[1]]=h[2].replace(Q," ").trim();return f[0]})(e);E[s]=C(n?{["@keyframes "+s]:u}:u,a?"":"."+s)}let d=a&&E.g;return a&&(E.g=E[s]),((u,c,h,m)=>{m?c.data=c.data.replace(m,u):c.data.indexOf(u)===-1&&(c.data=h?u+c.data:c.data+u)})(E[s],t,o,d),s},Me=(e,t,a)=>e.reduce((o,n,i)=>{let s=t[i];if(s&&s.call){let d=s(a),u=d&&d.props&&d.props.className||/^go/.test(d)&&d;s=u?"."+u:d&&typeof d=="object"?d.props?"":C(d,""):d===!1?"":d}return o+n+(s??"")},"");function D(e){let t=this||{},a=e.call?e(t.p):e;return ze(a.unshift?a.raw?Me(a,[].slice.call(arguments,1),t.p):a.reduce((o,n)=>Object.assign(o,n&&n.call?n(t.p):n),{}):a,Se(t.target),t.g,t.o,t.k)}let oe,H,U;D.bind({g:1});let N=D.bind({k:1});function De(e,t,a,o){C.p=t,oe=e,H=a,U=o}function A(e,t){let a=this||{};return function(){let o=arguments;function n(i,s){let d=Object.assign({},i),u=d.className||n.className;a.p=Object.assign({theme:H&&H()},d),a.o=/go\d/.test(u),d.className=D.apply(a,o)+(u?" "+u:"");let c=e;return e[0]&&(c=d.as||e,delete d.as),U&&c[0]&&U(d),oe(c,d)}return n}}var Te=e=>typeof e=="function",z=(e,t)=>Te(e)?e(t):e,Ve=(()=>{let e=0;return()=>(++e).toString()})(),ne=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),Be=20,W="default",ie=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(s=>s.id===t.toast.id?{...s,...t.toast}:s)};case 2:let{toast:o}=t;return ie(e,{type:e.toasts.find(s=>s.id===o.id)?1:0,toast:o});case 3:let{toastId:n}=t;return{...e,toasts:e.toasts.map(s=>s.id===n||n===void 0?{...s,dismissed:!0,visible:!1}:s)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(s=>s.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(s=>({...s,pauseDuration:s.pauseDuration+i}))}}},R=[],le={toasts:[],pausedAt:void 0,settings:{toastLimit:Be}},_={},de=(e,t=W)=>{_[t]=ie(_[t]||le,e),R.forEach(([a,o])=>{a===t&&o(_[t])})},ce=e=>Object.keys(_).forEach(t=>de(e,t)),Ke=e=>Object.keys(_).find(t=>_[t].toasts.some(a=>a.id===e)),T=(e=W)=>t=>{de(t,e)},Fe={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},He=(e={},t=W)=>{let[a,o]=l.useState(_[t]||le),n=l.useRef(_[t]);l.useEffect(()=>(n.current!==_[t]&&o(_[t]),R.push([t,o]),()=>{let s=R.findIndex(([d])=>d===t);s>-1&&R.splice(s,1)}),[t]);let i=a.toasts.map(s=>{var d,u,c;return{...e,...e[s.type],...s,removeDelay:s.removeDelay||((d=e[s.type])==null?void 0:d.removeDelay)||(e==null?void 0:e.removeDelay),duration:s.duration||((u=e[s.type])==null?void 0:u.duration)||(e==null?void 0:e.duration)||Fe[s.type],style:{...e.style,...(c=e[s.type])==null?void 0:c.style,...s.style}}});return{...a,toasts:i}},Ue=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(a==null?void 0:a.id)||Ve()}),P=e=>(t,a)=>{let o=Ue(t,e,a);return T(o.toasterId||Ke(o.id))({type:2,toast:o}),o.id},g=(e,t)=>P("blank")(e,t);g.error=P("error");g.success=P("success");g.loading=P("loading");g.custom=P("custom");g.dismiss=(e,t)=>{let a={type:3,toastId:e};t?T(t)(a):ce(a)};g.dismissAll=e=>g.dismiss(void 0,e);g.remove=(e,t)=>{let a={type:4,toastId:e};t?T(t)(a):ce(a)};g.removeAll=e=>g.remove(void 0,e);g.promise=(e,t,a)=>{let o=g.loading(t.loading,{...a,...a==null?void 0:a.loading});return typeof e=="function"&&(e=e()),e.then(n=>{let i=t.success?z(t.success,n):void 0;return i?g.success(i,{id:o,...a,...a==null?void 0:a.success}):g.dismiss(o),n}).catch(n=>{let i=t.error?z(t.error,n):void 0;i?g.error(i,{id:o,...a,...a==null?void 0:a.error}):g.dismiss(o)}),e};var We=1e3,qe=(e,t="default")=>{let{toasts:a,pausedAt:o}=He(e,t),n=l.useRef(new Map).current,i=l.useCallback((m,f=We)=>{if(n.has(m))return;let x=setTimeout(()=>{n.delete(m),s({type:4,toastId:m})},f);n.set(m,x)},[]);l.useEffect(()=>{if(o)return;let m=Date.now(),f=a.map(x=>{if(x.duration===1/0)return;let $=(x.duration||0)+x.pauseDuration-(m-x.createdAt);if($<0){x.visible&&g.dismiss(x.id);return}return setTimeout(()=>g.dismiss(x.id,t),$)});return()=>{f.forEach(x=>x&&clearTimeout(x))}},[a,o,t]);let s=l.useCallback(T(t),[t]),d=l.useCallback(()=>{s({type:5,time:Date.now()})},[s]),u=l.useCallback((m,f)=>{s({type:1,toast:{id:m,height:f}})},[s]),c=l.useCallback(()=>{o&&s({type:6,time:Date.now()})},[o,s]),h=l.useCallback((m,f)=>{let{reverseOrder:x=!1,gutter:$=8,defaultPosition:S}=f||{},L=a.filter(j=>(j.position||S)===(m.position||S)&&j.height),ge=L.findIndex(j=>j.id===m.id),Z=L.filter((j,V)=>V<ge&&j.visible).length;return L.filter(j=>j.visible).slice(...x?[Z+1]:[0,Z]).reduce((j,V)=>j+(V.height||0)+$,0)},[a]);return l.useEffect(()=>{a.forEach(m=>{if(m.dismissed)i(m.id,m.removeDelay);else{let f=n.get(m.id);f&&(clearTimeout(f),n.delete(m.id))}})},[a,i]),{toasts:a,handlers:{updateHeight:u,startPause:d,endPause:c,calculateOffset:h}}},Ze=N`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Je=N`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Ye=N`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Qe=A("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Ze} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Je} 0.15s ease-out forwards;
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
    animation: ${Ye} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Xe=N`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Ge=A("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Xe} 1s linear infinite;
`,et=N`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,tt=N`
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
}`,at=A("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${et} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${tt} 0.2s ease-out forwards;
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
`,rt=A("div")`
  position: absolute;
`,st=A("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,ot=N`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,nt=A("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${ot} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,it=({toast:e})=>{let{icon:t,type:a,iconTheme:o}=e;return t!==void 0?typeof t=="string"?l.createElement(nt,null,t):t:a==="blank"?null:l.createElement(st,null,l.createElement(Ge,{...o}),a!=="loading"&&l.createElement(rt,null,a==="error"?l.createElement(Qe,{...o}):l.createElement(at,{...o})))},lt=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,dt=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,ct="0%{opacity:0;} 100%{opacity:1;}",ut="0%{opacity:1;} 100%{opacity:0;}",mt=A("div")`
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
`,pt=A("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,ht=(e,t)=>{let a=e.includes("top")?1:-1,[o,n]=ne()?[ct,ut]:[lt(a),dt(a)];return{animation:t?`${N(o)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${N(n)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},ft=l.memo(({toast:e,position:t,style:a,children:o})=>{let n=e.height?ht(e.position||t||"top-center",e.visible):{opacity:0},i=l.createElement(it,{toast:e}),s=l.createElement(pt,{...e.ariaProps},z(e.message,e));return l.createElement(mt,{className:e.className,style:{...n,...a,...e.style}},typeof o=="function"?o({icon:i,message:s}):l.createElement(l.Fragment,null,i,s))});De(l.createElement);var xt=({id:e,className:t,style:a,onHeightUpdate:o,children:n})=>{let i=l.useCallback(s=>{if(s){let d=()=>{let u=s.getBoundingClientRect().height;o(e,u)};d(),new MutationObserver(d).observe(s,{subtree:!0,childList:!0,characterData:!0})}},[e,o]);return l.createElement("div",{ref:i,className:t,style:a},n)},gt=(e,t)=>{let a=e.includes("top"),o=a?{top:0}:{bottom:0},n=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:ne()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...o,...n}},yt=D`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,I=16,bt=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:o,children:n,toasterId:i,containerStyle:s,containerClassName:d})=>{let{toasts:u,handlers:c}=qe(a,i);return l.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:I,left:I,right:I,bottom:I,pointerEvents:"none",...s},className:d,onMouseEnter:c.startPause,onMouseLeave:c.endPause},u.map(h=>{let m=h.position||t,f=c.calculateOffset(h,{reverseOrder:e,gutter:o,defaultPosition:t}),x=gt(m,f);return l.createElement(xt,{id:h.id,key:h.id,onHeightUpdate:c.updateHeight,className:h.visible?yt:"",style:x},h.type==="custom"?z(h.message,h):n?n(h):l.createElement(ft,{toast:h,position:m}))}))},pa=g;const vt="modulepreload",jt=function(e){return"/"+e},X={},b=function(t,a,o){let n=Promise.resolve();if(a&&a.length>0){document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),d=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));n=Promise.allSettled(a.map(u=>{if(u=jt(u),u in X)return;X[u]=!0;const c=u.endsWith(".css"),h=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${h}`))return;const m=document.createElement("link");if(m.rel=c?"stylesheet":vt,c||(m.as="script"),m.crossOrigin="",m.href=u,d&&m.setAttribute("nonce",d),document.head.appendChild(m),c)return new Promise((f,x)=>{m.addEventListener("load",f),m.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${u}`)))})}))}function i(s){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=s,window.dispatchEvent(d),!d.defaultPrevented)throw s}return n.then(s=>{for(const d of s||[])d.status==="rejected"&&i(d.reason);return t().catch(i)})};function ue({size:e="md",text:t="Loading..."}){const a={sm:"h-6 w-6 border-2",md:"h-10 w-10 border-[3px]",lg:"h-16 w-16 border-4"};return r.jsxs("div",{className:"flex flex-col items-center justify-center py-16 animate-fade-in",children:[r.jsxs("div",{className:"relative",children:[r.jsx("div",{className:`${a[e]} animate-spin rounded-full border-dark-600/60 border-t-amber-500`}),r.jsx("div",{className:"absolute inset-0 animate-pulse rounded-full",style:{boxShadow:"0 0 24px rgba(245,158,11,0.15)"}})]}),t&&r.jsx("p",{className:"mt-4 text-dark-400 text-sm tracking-wide",children:t})]})}const kt="/api",p=Ne.create({baseURL:kt,timeout:15e3,headers:{"Content-Type":"application/json"}}),q=new Map,wt=3e4;p.interceptors.request.use(e=>{const t=localStorage.getItem("token");return t&&(e.headers.Authorization=`Bearer ${t}`),e});p.interceptors.response.use(e=>{if(e.config.method==="get"&&e.config.cache!==!1){const t=e.config.url+JSON.stringify(e.config.params||{});q.set(t,{data:e.data,timestamp:Date.now()})}return e},e=>{var t;return((t=e.response)==null?void 0:t.status)===401&&(localStorage.removeItem("token"),window.location.href="/login"),Promise.reject(e)});p.getCached=async(e,t={})=>{const a=e+JSON.stringify(t.params||{}),o=q.get(a);return o&&Date.now()-o.timestamp<wt?o.data:(await p.get(e,t)).data};p.clearCache=()=>q.clear();const B={login:e=>p.post("/auth/login",e).then(t=>t.data),register:e=>p.post("/auth/register",e).then(t=>t.data),getMe:()=>p.get("/auth/me").then(e=>e.data)},ha={getAll:e=>p.getCached("/products",{params:e}),getById:e=>p.getCached(`/products/${e}`),create:e=>(p.clearCache(),p.post("/products",e).then(t=>t.data)),update:(e,t)=>(p.clearCache(),p.put(`/products/${e}`,t).then(a=>a.data)),delete:e=>(p.clearCache(),p.delete(`/products/${e}`).then(t=>t.data))},fa={getStats:()=>p.get("/keys/stats").then(e=>e.data),clearExpired:()=>p.post("/keys/clear-expired").then(e=>e.data),getByProduct:(e,t)=>p.get(`/keys/${e}`,{params:t}).then(a=>a.data),add:e=>(p.clearCache(),p.post("/keys/add",e).then(t=>t.data)),delete:e=>(p.clearCache(),p.delete(`/keys/${e}`).then(t=>t.data))},xa={initiate:e=>p.post("/orders/initiate",e).then(t=>t.data),complete:e=>p.post("/orders/complete",e).then(t=>t.data),release:e=>p.post("/orders/release",e).then(t=>t.data),getMyOrders:()=>p.get("/orders/my").then(e=>e.data),getAll:e=>p.get("/orders",{params:e}).then(t=>t.data)},ga={getAll:()=>p.get("/settings").then(e=>e.data),getByKey:e=>p.get(`/settings/${e}`).then(t=>t.data),update:(e,t)=>(p.clearCache(),p.put(`/settings/${e}`,t).then(a=>a.data))},_t={get:()=>p.getCached("/config")},ya={getSummary:()=>p.get("/analytics/summary").then(e=>e.data),getSalesChart:e=>p.get(`/analytics/sales-chart?days=${e||30}`).then(t=>t.data),getTopMods:e=>p.get(`/analytics/top-mods?limit=${e||10}`).then(t=>t.data)},ba={getAll:()=>p.get("/coupons").then(e=>e.data),create:e=>p.post("/coupons",e).then(t=>t.data),update:(e,t)=>p.put(`/coupons/${e}`,t).then(a=>a.data),delete:e=>p.delete(`/coupons/${e}`).then(t=>t.data),validate:e=>p.post("/coupons/validate",e).then(t=>t.data)};/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const me=(...e)=>e.filter((t,a,o)=>!!t&&t.trim()!==""&&o.indexOf(t)===a).join(" ").trim();/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nt=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
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
 */var K={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ct=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1},At=l.createContext({}),$t=()=>l.useContext(At),Ot=l.forwardRef(({color:e,size:t,strokeWidth:a,absoluteStrokeWidth:o,className:n="",children:i,iconNode:s,...d},u)=>{const{size:c=24,strokeWidth:h=2,absoluteStrokeWidth:m=!1,color:f="currentColor",className:x=""}=$t()??{},$=o??m?Number(a??h)*24/Number(t??c):a??h;return l.createElement("svg",{ref:u,...K,width:t??c??K.width,height:t??c??K.height,stroke:e??f,strokeWidth:$,className:me("lucide",x,n),...!i&&!Ct(d)&&{"aria-hidden":"true"},...d},[...s.map(([S,L])=>l.createElement(S,L)),...Array.isArray(i)?i:[i]])});/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=(e,t)=>{const a=l.forwardRef(({className:o,...n},i)=>l.createElement(Ot,{ref:i,iconNode:t,className:me(`lucide-${Nt(G(e))}`,`lucide-${e}`,o),...n}));return a.displayName=G(e),a};/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lt=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]],Pt=v("chart-column",Lt);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const St=[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}],["path",{d:"M12 11h4",key:"1jrz19"}],["path",{d:"M12 16h4",key:"n85exb"}],["path",{d:"M8 11h.01",key:"1dfujw"}],["path",{d:"M8 16h.01",key:"18s6g9"}]],It=v("clipboard-list",St);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rt=[["path",{d:"M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",key:"1s6t7t"}],["circle",{cx:"16.5",cy:"7.5",r:".5",fill:"currentColor",key:"w0ekpg"}]],pe=v("key-round",Rt);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zt=[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]],Mt=v("layout-dashboard",zt);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dt=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],Tt=v("log-out",Dt);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vt=[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]],Bt=v("menu",Vt);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kt=[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",key:"1a0edw"}],["path",{d:"M12 22V12",key:"d0xqtd"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}]],Ft=v("package",Kt);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ht=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],he=v("settings",Ht);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ut=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],Wt=v("shield-check",Ut);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qt=[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",key:"vktsd0"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor",key:"kqv944"}]],Zt=v("tag",qt);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jt=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],Yt=v("x",Jt);function Qt(){const e=be(),[t,a]=l.useState("KeyStore");return l.useEffect(()=>{_t.get().then(o=>{var n;(n=o==null?void 0:o.data)!=null&&n.siteName&&a(o.data.siteName)}).catch(()=>{})},[]),e.pathname.startsWith("/admin")?null:r.jsxs("header",{className:"relative z-50",children:[r.jsx("div",{className:"max-w-7xl mx-auto px-4 py-4",children:r.jsxs("div",{className:"flex items-center justify-center relative",children:[r.jsxs(J,{to:"/",className:"group flex items-center gap-2 text-xl md:text-2xl font-bold tracking-wide font-display",children:[r.jsx("span",{className:"relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 shadow-gold group-hover:scale-105 transition-transform duration-200",children:r.jsx(pe,{className:"w-4 h-4 text-white"})}),r.jsx("span",{className:"bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400",children:t})]}),r.jsxs(J,{to:"/login",className:"absolute right-0 flex items-center gap-1.5 text-gray-500 hover:text-amber-400 transition-colors text-xs md:text-sm group",title:"Admin",children:[r.jsx(he,{className:"w-4 h-4 md:w-5 md:h-5 group-hover:rotate-90 transition-transform duration-300"}),r.jsx("span",{className:"hidden sm:inline",children:"Admin"})]})]})}),r.jsx("div",{className:"absolute bottom-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"})]})}const fe=l.createContext(null);function Xt({children:e}){const[t,a]=l.useState(null),[o,n]=l.useState(!0);l.useEffect(()=>{localStorage.getItem("token")?B.getMe().then(c=>a(c.data)).catch(()=>localStorage.removeItem("token")).finally(()=>n(!1)):n(!1)},[]);const i=l.useCallback(async(u,c)=>{const h=await B.login({email:u,password:c});return localStorage.setItem("token",h.data.token),a(h.data),h.data},[]),s=l.useCallback(async(u,c,h)=>{const m=await B.register({name:u,email:c,password:h});return localStorage.setItem("token",m.data.token),a(m.data),m.data},[]),d=l.useCallback(()=>{localStorage.removeItem("token"),a(null)},[]);return r.jsx(fe.Provider,{value:{user:t,loading:o,login:i,register:s,logout:d},children:e})}const xe=()=>{const e=l.useContext(fe);if(!e)throw new Error("useAuth must be used within AuthProvider");return e};function k({children:e,adminOnly:t=!1}){const{user:a,loading:o}=xe();return o?r.jsx(ue,{text:"Checking authentication..."}):a?t&&a.role!=="admin"?r.jsx(O,{to:"/",replace:!0}):e:r.jsx(O,{to:"/login",replace:!0})}const Gt=[{to:"/admin/dashboard",label:"Dashboard",icon:Mt},{to:"/admin/mods",label:"Mods",icon:Ft},{to:"/admin/keys",label:"License Keys",icon:pe},{to:"/admin/available-keys",label:"Available Keys",icon:Pt},{to:"/admin/coupons",label:"Coupons",icon:Zt},{to:"/admin/orders",label:"Orders",icon:It},{to:"/admin/settings",label:"Settings",icon:he}],ea=l.memo(function(){const{user:t,logout:a}=xe(),o=ve(),[n,i]=l.useState(!1);l.useEffect(()=>{const c=()=>i(!1);return window.addEventListener("popstate",c),()=>window.removeEventListener("popstate",c)},[]);const s=()=>{a(),o("/")},d=((t==null?void 0:t.name)||(t==null?void 0:t.email)||"A").split(/[\s@.]+/).filter(Boolean).slice(0,2).map(c=>c[0].toUpperCase()).join(""),u=r.jsxs("div",{className:"flex flex-col h-full",children:[r.jsxs("div",{className:"px-4 py-5 border-b border-[#1e1e2e]/60 flex items-center gap-3",children:[r.jsx("div",{className:"w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 flex items-center justify-center shadow-gold flex-shrink-0",children:r.jsx(Wt,{className:"w-5 h-5 text-[#0a0a14]"})}),r.jsxs("div",{className:"min-w-0",children:[r.jsx("h2",{className:"text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 font-display leading-tight",children:"Admin Panel"}),r.jsx("p",{className:"text-[10px] text-gray-600 truncate",children:"Online Keys · Dashboard"})]})]}),r.jsxs("nav",{className:"flex-1 overflow-y-auto px-3 py-4 space-y-1",children:[r.jsx("p",{className:"px-3 pb-2 text-[9px] uppercase tracking-[0.15em] text-gray-700 font-semibold",children:"Menu"}),Gt.map(c=>{const h=c.icon;return r.jsx(je,{to:c.to,end:c.to==="/admin/dashboard",onClick:()=>i(!1),className:({isActive:m})=>`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 overflow-hidden ${m?"bg-gradient-to-r from-amber-500/15 to-amber-500/5 text-amber-400 border border-amber-500/20 shadow-sm shadow-amber-500/10":"text-gray-400 hover:bg-[#0a0a14]/60 hover:text-gray-200 border border-transparent"}`,children:({isActive:m})=>r.jsxs(r.Fragment,{children:[m&&r.jsx("span",{className:"absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full bg-gradient-to-b from-amber-400 to-orange-500"}),r.jsx(h,{className:`w-4 h-4 flex-shrink-0 ${m?"text-amber-400":""}`}),r.jsx("span",{children:c.label})]})},c.to)})]}),r.jsxs("div",{className:"px-3 py-4 border-t border-[#1e1e2e]/60 space-y-2",children:[t&&r.jsxs("div",{className:"flex items-center gap-2.5 px-2.5 py-2 rounded-xl bg-[#0a0a14]/50 border border-[#1e1e2e]/50",children:[r.jsx("div",{className:"w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/30 to-orange-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0",children:r.jsx("span",{className:"text-[10px] font-bold text-amber-400",children:d})}),r.jsxs("div",{className:"min-w-0 flex-1",children:[r.jsx("p",{className:"text-[11px] font-medium text-gray-300 truncate",children:t.name||t.email}),r.jsx("p",{className:"text-[9px] text-gray-600 uppercase tracking-wider",children:"Administrator"})]})]}),r.jsxs("button",{onClick:s,className:"flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-[13px] font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 border border-transparent hover:border-red-500/20 transition-all duration-200",children:[r.jsx(Tt,{className:"w-4 h-4 flex-shrink-0"}),r.jsx("span",{children:"Logout"})]})]})]});return r.jsxs(r.Fragment,{children:[r.jsx("button",{onClick:()=>i(!n),className:"fixed top-3 left-3 z-[60] lg:hidden bg-[#0d0d1a]/90 backdrop-blur-xl border border-[#1e1e2e]/80 rounded-xl p-2.5 shadow-xl","aria-label":"Toggle menu",children:n?r.jsx(Yt,{className:"w-5 h-5 text-amber-400"}):r.jsx(Bt,{className:"w-5 h-5 text-amber-400"})}),n&&r.jsx("div",{className:"fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden",onClick:()=>i(!1)}),r.jsx("aside",{className:`
          fixed lg:static inset-y-0 left-0 z-50 w-64 flex-shrink-0
          bg-[#0d0d1a]/95 backdrop-blur-xl border-r border-[#1e1e2e]/60
          transition-transform duration-300 ease-in-out
          ${n?"translate-x-0":"-translate-x-full lg:translate-x-0"}
        `,children:u})]})}),ta=l.lazy(()=>b(()=>import("./Home-B0OfLfPO.js"),__vite__mapDeps([0,1,2,3,4,5,6,7]))),aa=l.lazy(()=>b(()=>import("./Login-vxnr7LL8.js"),__vite__mapDeps([8,1,6,2]))),ra=l.lazy(()=>b(()=>import("./NotFound-kNi8_-3R.js"),__vite__mapDeps([9,1,2]))),ee=l.lazy(()=>b(()=>import("./Dashboard-Dh6JAgmW.js"),__vite__mapDeps([10,1,11,2]))),sa=l.lazy(()=>b(()=>import("./ManageMods-BJNvU6CD.js"),__vite__mapDeps([12,1,13,14,2]))),te=l.lazy(()=>b(()=>import("./AddMod-BA6Uh32J.js"),__vite__mapDeps([15,1,13,3,2]))),oa=l.lazy(()=>b(()=>import("./AdminKeys-BF3_1pD7.js"),__vite__mapDeps([16,1,4,13,14,2]))),na=l.lazy(()=>b(()=>import("./AvailableKeys-Dn9U7ocH.js"),__vite__mapDeps([17,1,7,4,2]))),ia=l.lazy(()=>b(()=>import("./CouponsPage-B_HBv3Vl.js"),__vite__mapDeps([18,1,13,5,11,14,2]))),la=l.lazy(()=>b(()=>import("./OrdersList-DE6Mghat.js"),__vite__mapDeps([19,1,2]))),da=l.lazy(()=>b(()=>import("./SettingsPage-BXs_9gKQ.js"),__vite__mapDeps([20,1,2])));function w({children:e}){return r.jsxs("div",{className:"flex min-h-screen",children:[r.jsx(ea,{}),r.jsx("div",{className:"flex-1 min-h-screen overflow-auto pt-14 lg:pt-0",children:r.jsx("div",{className:"p-4 md:p-6 lg:p-8 max-w-6xl mx-auto",children:e})})]})}function ca(){return r.jsxs("div",{className:"min-h-screen",children:[r.jsx(Qt,{}),r.jsx("main",{children:r.jsx(l.Suspense,{fallback:r.jsx(ue,{text:"Loading..."}),children:r.jsxs(ke,{children:[r.jsx(y,{path:"/",element:r.jsx(ta,{})}),r.jsx(y,{path:"/login",element:r.jsx(aa,{})}),r.jsx(y,{path:"/mods",element:r.jsx(O,{to:"/",replace:!0})}),r.jsx(y,{path:"/mods/:id",element:r.jsx(O,{to:"/",replace:!0})}),r.jsx(y,{path:"/products",element:r.jsx(O,{to:"/",replace:!0})}),r.jsx(y,{path:"/products/:id",element:r.jsx(O,{to:"/",replace:!0})}),r.jsx(y,{path:"/admin",element:r.jsx(k,{adminOnly:!0,children:r.jsx(w,{children:r.jsx(ee,{})})})}),r.jsx(y,{path:"/admin/dashboard",element:r.jsx(k,{adminOnly:!0,children:r.jsx(w,{children:r.jsx(ee,{})})})}),r.jsx(y,{path:"/admin/mods",element:r.jsx(k,{adminOnly:!0,children:r.jsx(w,{children:r.jsx(sa,{})})})}),r.jsx(y,{path:"/admin/mods/add",element:r.jsx(k,{adminOnly:!0,children:r.jsx(w,{children:r.jsx(te,{})})})}),r.jsx(y,{path:"/admin/mods/:id",element:r.jsx(k,{adminOnly:!0,children:r.jsx(w,{children:r.jsx(te,{})})})}),r.jsx(y,{path:"/admin/keys",element:r.jsx(k,{adminOnly:!0,children:r.jsx(w,{children:r.jsx(oa,{})})})}),r.jsx(y,{path:"/admin/available-keys",element:r.jsx(k,{adminOnly:!0,children:r.jsx(w,{children:r.jsx(na,{})})})}),r.jsx(y,{path:"/admin/coupons",element:r.jsx(k,{adminOnly:!0,children:r.jsx(w,{children:r.jsx(ia,{})})})}),r.jsx(y,{path:"/admin/orders",element:r.jsx(k,{adminOnly:!0,children:r.jsx(w,{children:r.jsx(la,{})})})}),r.jsx(y,{path:"/admin/settings",element:r.jsx(k,{adminOnly:!0,children:r.jsx(w,{children:r.jsx(da,{})})})}),r.jsx(y,{path:"*",element:r.jsx(ra,{})})]})})})]})}F.createRoot(document.getElementById("root")).render(r.jsx(we.StrictMode,{children:r.jsx(_e,{children:r.jsxs(Xt,{children:[r.jsx(ca,{}),r.jsx(bt,{position:"top-right",toastOptions:{duration:3e3,style:{background:"#1e293b",color:"#f8fafc",border:"1px solid #334155"}}})]})})}));export{Pt as C,pe as K,ue as L,Ft as P,Wt as S,Zt as T,Yt as X,ba as a,ya as b,v as c,It as d,r as j,fa as k,xa as o,ha as p,ga as s,xe as u,pa as z};
