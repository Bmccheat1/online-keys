const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Home-BJSXzjzs.js","assets/vendor-DlynzHKv.js","assets/shopping-bag-DFMytaeO.js","assets/zap-BngkkWb9.js","assets/utils-DhXgJQ-f.js","assets/ProductPage-CsDye9Ez.js","assets/sparkles--Aa2SN3q.js","assets/clock-D2Vxtz-C.js","assets/percent-BhALEKT9.js","assets/Login-D8i69Vsf.js","assets/NotFound-ShGK6aRr.js","assets/Dashboard-DrmU4gIW.js","assets/dollar-sign-ClDKciyB.js","assets/ManageMods-DLekDrre.js","assets/plus-BSMI-FaY.js","assets/trash-2-BH10idE5.js","assets/AddMod-DLCBC43I.js","assets/AdminKeys-CoHduwG3.js","assets/chevron-down-BwD2WSjx.js","assets/AvailableKeys-d_twiioS.js","assets/CouponsPage-Dtu8pE8b.js","assets/OrdersList-CSBdausm.js","assets/SettingsPage-DDK75eKP.js"])))=>i.map(i=>d[i]);
import{r as d,a as we,u as se,L as F,N as O,b as ke,c as Ne,R as _e,d as y,e as Ae,B as Ce}from"./vendor-DlynzHKv.js";import{a as Ee}from"./utils-DhXgJQ-f.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function r(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(n){if(n.ep)return;n.ep=!0;const i=r(n);fetch(n.href,i)}})();var oe={exports:{}},D={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $e=d,Oe=Symbol.for("react.element"),Pe=Symbol.for("react.fragment"),Se=Object.prototype.hasOwnProperty,Le=$e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Ie={key:!0,ref:!0,__self:!0,__source:!0};function ne(e,t,r){var s,n={},i=null,o=null;r!==void 0&&(i=""+r),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(o=t.ref);for(s in t)Se.call(t,s)&&!Ie.hasOwnProperty(s)&&(n[s]=t[s]);if(e&&e.defaultProps)for(s in t=e.defaultProps,t)n[s]===void 0&&(n[s]=t[s]);return{$$typeof:Oe,type:e,key:i,ref:o,props:n,_owner:Le.current}}D.Fragment=Pe;D.jsx=ne;D.jsxs=ne;oe.exports=D;var a=oe.exports,U={},Q=we;U.createRoot=Q.createRoot,U.hydrateRoot=Q.hydrateRoot;let Me={data:""},Re=e=>{if(typeof window=="object"){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||Me},ze=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,De=/\/\*[^]*?\*\/|  +/g,X=/\n+/g,C=(e,t)=>{let r="",s="",n="";for(let i in e){let o=e[i];i[0]=="@"?i[1]=="i"?r=i+" "+o+";":s+=i[1]=="f"?C(o,i):i+"{"+C(o,i[1]=="k"?"":t)+"}":typeof o=="object"?s+=C(o,t?t.replace(/([^,])+/g,l=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,u=>/&/.test(u)?u.replace(/&/g,l):l?l+" "+u:u)):i):o!=null&&(i=i[1]=="-"?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),n+=C.p?C.p(i,o):i+":"+o+";")}return r+(t&&n?t+"{"+n+"}":n)+s},A={},ie=e=>{if(typeof e=="object"){let t="";for(let r in e)t+=r+ie(e[r]);return t}return e},Te=(e,t,r,s,n)=>{let i=ie(e),o=A[i]||(A[i]=(u=>{let c=0,p=11;for(;c<u.length;)p=101*p+u.charCodeAt(c++)>>>0;return"go"+p})(i));if(!A[o]){let u=i!==e?e:(c=>{let p,m,x=[{}];for(;p=ze.exec(c.replace(De,""));)p[4]?x.shift():p[3]?(m=p[3].replace(X," ").trim(),x.unshift(x[0][m]=x[0][m]||{})):x[0][p[1]]=p[2].replace(X," ").trim();return x[0]})(e);A[o]=C(n?{["@keyframes "+o]:u}:u,r?"":"."+o)}let l=r&&A.g;return r&&(A.g=A[o]),((u,c,p,m)=>{m?c.data=c.data.replace(m,u):c.data.indexOf(u)===-1&&(c.data=p?u+c.data:c.data+u)})(A[o],t,s,l),o},Ve=(e,t,r)=>e.reduce((s,n,i)=>{let o=t[i];if(o&&o.call){let l=o(r),u=l&&l.props&&l.props.className||/^go/.test(l)&&l;o=u?"."+u:l&&typeof l=="object"?l.props?"":C(l,""):l===!1?"":l}return s+n+(o??"")},"");function T(e){let t=this||{},r=e.call?e(t.p):e;return Te(r.unshift?r.raw?Ve(r,[].slice.call(arguments,1),t.p):r.reduce((s,n)=>Object.assign(s,n&&n.call?n(t.p):n),{}):r,Re(t.target),t.g,t.o,t.k)}let le,W,q;T.bind({g:1});let _=T.bind({k:1});function Be(e,t,r,s){C.p=t,le=e,W=r,q=s}function E(e,t){let r=this||{};return function(){let s=arguments;function n(i,o){let l=Object.assign({},i),u=l.className||n.className;r.p=Object.assign({theme:W&&W()},l),r.o=/go\d/.test(u),l.className=T.apply(r,s)+(u?" "+u:"");let c=e;return e[0]&&(c=l.as||e,delete l.as),q&&c[0]&&q(l),le(c,l)}return n}}var Ke=e=>typeof e=="function",z=(e,t)=>Ke(e)?e(t):e,He=(()=>{let e=0;return()=>(++e).toString()})(),de=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),Fe=20,Z="default",ce=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(o=>o.id===t.toast.id?{...o,...t.toast}:o)};case 2:let{toast:s}=t;return ce(e,{type:e.toasts.find(o=>o.id===s.id)?1:0,toast:s});case 3:let{toastId:n}=t;return{...e,toasts:e.toasts.map(o=>o.id===n||n===void 0?{...o,dismissed:!0,visible:!1}:o)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(o=>o.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(o=>({...o,pauseDuration:o.pauseDuration+i}))}}},R=[],ue={toasts:[],pausedAt:void 0,settings:{toastLimit:Fe}},N={},me=(e,t=Z)=>{N[t]=ce(N[t]||ue,e),R.forEach(([r,s])=>{r===t&&s(N[t])})},pe=e=>Object.keys(N).forEach(t=>me(e,t)),Ue=e=>Object.keys(N).find(t=>N[t].toasts.some(r=>r.id===e)),V=(e=Z)=>t=>{me(t,e)},We={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},qe=(e={},t=Z)=>{let[r,s]=d.useState(N[t]||ue),n=d.useRef(N[t]);d.useEffect(()=>(n.current!==N[t]&&s(N[t]),R.push([t,s]),()=>{let o=R.findIndex(([l])=>l===t);o>-1&&R.splice(o,1)}),[t]);let i=r.toasts.map(o=>{var l,u,c;return{...e,...e[o.type],...o,removeDelay:o.removeDelay||((l=e[o.type])==null?void 0:l.removeDelay)||(e==null?void 0:e.removeDelay),duration:o.duration||((u=e[o.type])==null?void 0:u.duration)||(e==null?void 0:e.duration)||We[o.type],style:{...e.style,...(c=e[o.type])==null?void 0:c.style,...o.style}}});return{...r,toasts:i}},Ze=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(r==null?void 0:r.id)||He()}),L=e=>(t,r)=>{let s=Ze(t,e,r);return V(s.toasterId||Ue(s.id))({type:2,toast:s}),s.id},g=(e,t)=>L("blank")(e,t);g.error=L("error");g.success=L("success");g.loading=L("loading");g.custom=L("custom");g.dismiss=(e,t)=>{let r={type:3,toastId:e};t?V(t)(r):pe(r)};g.dismissAll=e=>g.dismiss(void 0,e);g.remove=(e,t)=>{let r={type:4,toastId:e};t?V(t)(r):pe(r)};g.removeAll=e=>g.remove(void 0,e);g.promise=(e,t,r)=>{let s=g.loading(t.loading,{...r,...r==null?void 0:r.loading});return typeof e=="function"&&(e=e()),e.then(n=>{let i=t.success?z(t.success,n):void 0;return i?g.success(i,{id:s,...r,...r==null?void 0:r.success}):g.dismiss(s),n}).catch(n=>{let i=t.error?z(t.error,n):void 0;i?g.error(i,{id:s,...r,...r==null?void 0:r.error}):g.dismiss(s)}),e};var Je=1e3,Ye=(e,t="default")=>{let{toasts:r,pausedAt:s}=qe(e,t),n=d.useRef(new Map).current,i=d.useCallback((m,x=Je)=>{if(n.has(m))return;let f=setTimeout(()=>{n.delete(m),o({type:4,toastId:m})},x);n.set(m,f)},[]);d.useEffect(()=>{if(s)return;let m=Date.now(),x=r.map(f=>{if(f.duration===1/0)return;let $=(f.duration||0)+f.pauseDuration-(m-f.createdAt);if($<0){f.visible&&g.dismiss(f.id);return}return setTimeout(()=>g.dismiss(f.id,t),$)});return()=>{x.forEach(f=>f&&clearTimeout(f))}},[r,s,t]);let o=d.useCallback(V(t),[t]),l=d.useCallback(()=>{o({type:5,time:Date.now()})},[o]),u=d.useCallback((m,x)=>{o({type:1,toast:{id:m,height:x}})},[o]),c=d.useCallback(()=>{s&&o({type:6,time:Date.now()})},[s,o]),p=d.useCallback((m,x)=>{let{reverseOrder:f=!1,gutter:$=8,defaultPosition:I}=x||{},P=r.filter(j=>(j.position||I)===(m.position||I)&&j.height),je=P.findIndex(j=>j.id===m.id),G=P.filter((j,B)=>B<je&&j.visible).length;return P.filter(j=>j.visible).slice(...f?[G+1]:[0,G]).reduce((j,B)=>j+(B.height||0)+$,0)},[r]);return d.useEffect(()=>{r.forEach(m=>{if(m.dismissed)i(m.id,m.removeDelay);else{let x=n.get(m.id);x&&(clearTimeout(x),n.delete(m.id))}})},[r,i]),{toasts:r,handlers:{updateHeight:u,startPause:l,endPause:c,calculateOffset:p}}},Ge=_`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Qe=_`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Xe=_`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,et=E("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Ge} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Qe} 0.15s ease-out forwards;
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
    animation: ${Xe} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,tt=_`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,at=E("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${tt} 1s linear infinite;
`,rt=_`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,st=_`
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
}`,ot=E("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${rt} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${st} 0.2s ease-out forwards;
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
`,nt=E("div")`
  position: absolute;
`,it=E("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,lt=_`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,dt=E("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${lt} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ct=({toast:e})=>{let{icon:t,type:r,iconTheme:s}=e;return t!==void 0?typeof t=="string"?d.createElement(dt,null,t):t:r==="blank"?null:d.createElement(it,null,d.createElement(at,{...s}),r!=="loading"&&d.createElement(nt,null,r==="error"?d.createElement(et,{...s}):d.createElement(ot,{...s})))},ut=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,mt=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,pt="0%{opacity:0;} 100%{opacity:1;}",ht="0%{opacity:1;} 100%{opacity:0;}",xt=E("div")`
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
`,ft=E("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,gt=(e,t)=>{let r=e.includes("top")?1:-1,[s,n]=de()?[pt,ht]:[ut(r),mt(r)];return{animation:t?`${_(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${_(n)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},yt=d.memo(({toast:e,position:t,style:r,children:s})=>{let n=e.height?gt(e.position||t||"top-center",e.visible):{opacity:0},i=d.createElement(ct,{toast:e}),o=d.createElement(ft,{...e.ariaProps},z(e.message,e));return d.createElement(xt,{className:e.className,style:{...n,...r,...e.style}},typeof s=="function"?s({icon:i,message:o}):d.createElement(d.Fragment,null,i,o))});Be(d.createElement);var bt=({id:e,className:t,style:r,onHeightUpdate:s,children:n})=>{let i=d.useCallback(o=>{if(o){let l=()=>{let u=o.getBoundingClientRect().height;s(e,u)};l(),new MutationObserver(l).observe(o,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return d.createElement("div",{ref:i,className:t,style:r},n)},vt=(e,t)=>{let r=e.includes("top"),s=r?{top:0}:{bottom:0},n=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:de()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...s,...n}},jt=T`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,M=16,wt=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:s,children:n,toasterId:i,containerStyle:o,containerClassName:l})=>{let{toasts:u,handlers:c}=Ye(r,i);return d.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:M,left:M,right:M,bottom:M,pointerEvents:"none",...o},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},u.map(p=>{let m=p.position||t,x=c.calculateOffset(p,{reverseOrder:e,gutter:s,defaultPosition:t}),f=vt(m,x);return d.createElement(bt,{id:p.id,key:p.id,onHeightUpdate:c.updateHeight,className:p.visible?jt:"",style:f},p.type==="custom"?z(p.message,p):n?n(p):d.createElement(yt,{toast:p,position:m}))}))},Aa=g;const kt="modulepreload",Nt=function(e){return"/"+e},ee={},v=function(t,r,s){let n=Promise.resolve();if(r&&r.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),l=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));n=Promise.allSettled(r.map(u=>{if(u=Nt(u),u in ee)return;ee[u]=!0;const c=u.endsWith(".css"),p=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${p}`))return;const m=document.createElement("link");if(m.rel=c?"stylesheet":kt,c||(m.as="script"),m.crossOrigin="",m.href=u,l&&m.setAttribute("nonce",l),document.head.appendChild(m),c)return new Promise((x,f)=>{m.addEventListener("load",x),m.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${u}`)))})}))}function i(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return n.then(o=>{for(const l of o||[])l.status==="rejected"&&i(l.reason);return t().catch(i)})};function he({size:e="md",text:t="Loading..."}){const r={sm:"h-6 w-6 border-2",md:"h-10 w-10 border-[3px]",lg:"h-16 w-16 border-4"};return a.jsxs("div",{className:"flex flex-col items-center justify-center py-16 animate-fade-in",children:[a.jsxs("div",{className:"relative",children:[a.jsx("div",{className:`${r[e]} animate-spin rounded-full border-dark-600/60 border-t-amber-500`}),a.jsx("div",{className:"absolute inset-0 animate-pulse rounded-full",style:{boxShadow:"0 0 24px rgba(245,158,11,0.15)"}})]}),t&&a.jsx("p",{className:"mt-4 text-dark-400 text-sm tracking-wide",children:t})]})}const _t="/api",h=Ee.create({baseURL:_t,timeout:15e3,headers:{"Content-Type":"application/json"}}),J=new Map,At=3e4;h.interceptors.request.use(e=>{const t=localStorage.getItem("token");return t&&(e.headers.Authorization=`Bearer ${t}`),e});h.interceptors.response.use(e=>{if(e.config.method==="get"&&e.config.cache!==!1){const t=e.config.url+JSON.stringify(e.config.params||{});J.set(t,{data:e.data,timestamp:Date.now()})}return e},e=>{var t;return((t=e.response)==null?void 0:t.status)===401&&(localStorage.removeItem("token"),window.location.href="/login"),Promise.reject(e)});h.getCached=async(e,t={})=>{const r=e+JSON.stringify(t.params||{}),s=J.get(r);return s&&Date.now()-s.timestamp<At?s.data:(await h.get(e,t)).data};h.clearCache=()=>J.clear();const K={login:e=>h.post("/auth/login",e).then(t=>t.data),register:e=>h.post("/auth/register",e).then(t=>t.data),getMe:()=>h.get("/auth/me").then(e=>e.data)},Ct={getAll:e=>h.getCached("/products",{params:e}),getById:e=>h.getCached(`/products/${e}`),create:e=>(h.clearCache(),h.post("/products",e).then(t=>t.data)),update:(e,t)=>(h.clearCache(),h.put(`/products/${e}`,t).then(r=>r.data)),delete:e=>(h.clearCache(),h.delete(`/products/${e}`).then(t=>t.data))},Ca={getStats:()=>h.get("/keys/stats").then(e=>e.data),clearExpired:()=>h.post("/keys/clear-expired").then(e=>e.data),getByProduct:(e,t)=>h.get(`/keys/${e}`,{params:t}).then(r=>r.data),add:e=>(h.clearCache(),h.post("/keys/add",e).then(t=>t.data)),delete:e=>(h.clearCache(),h.delete(`/keys/${e}`).then(t=>t.data))},Ea={initiate:e=>h.post("/orders/initiate",e).then(t=>t.data),complete:e=>h.post("/orders/complete",e).then(t=>t.data),release:e=>h.post("/orders/release",e).then(t=>t.data),getMyOrders:()=>h.get("/orders/my").then(e=>e.data),getAll:e=>h.get("/orders",{params:e}).then(t=>t.data)},$a={getAll:()=>h.get("/settings").then(e=>e.data),getByKey:e=>h.get(`/settings/${e}`).then(t=>t.data),update:(e,t)=>(h.clearCache(),h.put(`/settings/${e}`,t).then(r=>r.data))},Et={get:()=>h.getCached("/config")},Oa={getSummary:()=>h.get("/analytics/summary").then(e=>e.data),getSalesChart:e=>h.get(`/analytics/sales-chart?days=${e||30}`).then(t=>t.data),getTopMods:e=>h.get(`/analytics/top-mods?limit=${e||10}`).then(t=>t.data)},Pa={getAll:()=>h.get("/coupons").then(e=>e.data),create:e=>h.post("/coupons",e).then(t=>t.data),update:(e,t)=>h.put(`/coupons/${e}`,t).then(r=>r.data),delete:e=>h.delete(`/coupons/${e}`).then(t=>t.data),validate:e=>h.post("/coupons/validate",e).then(t=>t.data)};/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xe=(...e)=>e.filter((t,r,s)=>!!t&&t.trim()!==""&&s.indexOf(t)===r).join(" ").trim();/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $t=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ot=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,r,s)=>s?s.toUpperCase():r.toLowerCase());/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const te=e=>{const t=Ot(e);return t.charAt(0).toUpperCase()+t.slice(1)};/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var H={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pt=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1},St=d.createContext({}),Lt=()=>d.useContext(St),It=d.forwardRef(({color:e,size:t,strokeWidth:r,absoluteStrokeWidth:s,className:n="",children:i,iconNode:o,...l},u)=>{const{size:c=24,strokeWidth:p=2,absoluteStrokeWidth:m=!1,color:x="currentColor",className:f=""}=Lt()??{},$=s??m?Number(r??p)*24/Number(t??c):r??p;return d.createElement("svg",{ref:u,...H,width:t??c??H.width,height:t??c??H.height,stroke:e??x,strokeWidth:$,className:xe("lucide",f,n),...!i&&!Pt(l)&&{"aria-hidden":"true"},...l},[...o.map(([I,P])=>d.createElement(I,P)),...Array.isArray(i)?i:[i]])});/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=(e,t)=>{const r=d.forwardRef(({className:s,...n},i)=>d.createElement(It,{ref:i,iconNode:t,className:xe(`lucide-${$t(te(e))}`,`lucide-${e}`,s),...n}));return r.displayName=te(e),r};/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mt=[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",key:"3c2336"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],Rt=b("badge-check",Mt);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zt=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]],Dt=b("chart-column",zt);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tt=[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}],["path",{d:"M12 11h4",key:"1jrz19"}],["path",{d:"M12 16h4",key:"n85exb"}],["path",{d:"M8 11h.01",key:"1dfujw"}],["path",{d:"M8 16h.01",key:"18s6g9"}]],Vt=b("clipboard-list",Tt);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bt=[["path",{d:"M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",key:"1s6t7t"}],["circle",{cx:"16.5",cy:"7.5",r:".5",fill:"currentColor",key:"w0ekpg"}]],fe=b("key-round",Bt);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kt=[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]],Ht=b("layout-dashboard",Kt);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ft=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],Ut=b("log-out",Ft);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wt=[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]],qt=b("menu",Wt);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zt=[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",key:"1a0edw"}],["path",{d:"M12 22V12",key:"d0xqtd"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}]],Jt=b("package",Zt);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yt=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],ge=b("settings",Yt);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gt=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],ye=b("shield-check",Gt);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qt=[["path",{d:"M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5",key:"slp6dd"}],["path",{d:"M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244",key:"o0xfot"}],["path",{d:"M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05",key:"wn3emo"}]],Xt=b("store",Qt);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ea=[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",key:"vktsd0"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor",key:"kqv944"}]],ta=b("tag",ea);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const aa=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],be=b("x",aa);function ra(){const e=se(),[t,r]=d.useState("KeyStore");return d.useEffect(()=>{Et.get().then(s=>{var n;(n=s==null?void 0:s.data)!=null&&n.siteName&&r(s.data.siteName)}).catch(()=>{})},[]),e.pathname.startsWith("/admin")?null:a.jsxs("header",{className:"relative z-50",children:[a.jsx("div",{className:"max-w-7xl mx-auto px-4 py-4",children:a.jsxs("div",{className:"flex items-center justify-center relative",children:[a.jsxs(F,{to:"/",className:"group flex items-center gap-2 text-xl md:text-2xl font-bold tracking-wide font-display",children:[a.jsx("span",{className:"relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 shadow-gold group-hover:scale-105 transition-transform duration-200",children:a.jsx(fe,{className:"w-4 h-4 text-white"})}),a.jsx("span",{className:"bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400",children:t})]}),a.jsxs(F,{to:"/login",className:"absolute right-0 flex items-center gap-1.5 text-gray-500 hover:text-amber-400 transition-colors text-xs md:text-sm group",title:"Admin",children:[a.jsx(ge,{className:"w-4 h-4 md:w-5 md:h-5 group-hover:rotate-90 transition-transform duration-300"}),a.jsx("span",{className:"hidden sm:inline",children:"Admin"})]})]})}),a.jsx("div",{className:"absolute bottom-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"})]})}const ve=d.createContext(null);function sa({children:e}){const[t,r]=d.useState(null),[s,n]=d.useState(!0);d.useEffect(()=>{localStorage.getItem("token")?K.getMe().then(c=>r(c.data)).catch(()=>localStorage.removeItem("token")).finally(()=>n(!1)):n(!1)},[]);const i=d.useCallback(async(u,c)=>{const p=await K.login({email:u,password:c});return localStorage.setItem("token",p.data.token),r(p.data),p.data},[]),o=d.useCallback(async(u,c,p)=>{const m=await K.register({name:u,email:c,password:p});return localStorage.setItem("token",m.data.token),r(m.data),m.data},[]),l=d.useCallback(()=>{localStorage.removeItem("token"),r(null)},[]);return a.jsx(ve.Provider,{value:{user:t,loading:s,login:i,register:o,logout:l},children:e})}const Y=()=>{const e=d.useContext(ve);if(!e)throw new Error("useAuth must be used within AuthProvider");return e};function w({children:e,adminOnly:t=!1}){const{user:r,loading:s}=Y();return s?a.jsx(he,{text:"Checking authentication..."}):r?t&&r.role!=="admin"?a.jsx(O,{to:"/",replace:!0}):e:a.jsx(O,{to:"/login",replace:!0})}const oa=[{to:"/admin/dashboard",label:"Dashboard",icon:Ht},{to:"/admin/mods",label:"Mods",icon:Jt},{to:"/admin/keys",label:"License Keys",icon:fe},{to:"/admin/available-keys",label:"Available Keys",icon:Dt},{to:"/admin/coupons",label:"Coupons",icon:ta},{to:"/admin/orders",label:"Orders",icon:Vt},{to:"/admin/settings",label:"Settings",icon:ge}],na=d.memo(function({open:t,onToggle:r}){const{user:s,logout:n}=Y(),i=ke();d.useEffect(()=>{const c=()=>r==null?void 0:r(!1);return window.addEventListener("popstate",c),()=>window.removeEventListener("popstate",c)},[r]);const o=()=>{n(),i("/")},l=((s==null?void 0:s.name)||(s==null?void 0:s.email)||"A").split(/[\s@.]+/).filter(Boolean).slice(0,2).map(c=>c[0].toUpperCase()).join(""),u=a.jsxs("div",{className:"flex flex-col h-full",children:[a.jsxs("div",{className:"px-4 py-5 border-b border-[#1e1e2e]/60 flex items-center gap-3",children:[a.jsx("div",{className:"w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 flex items-center justify-center shadow-gold flex-shrink-0",children:a.jsx(ye,{className:"w-5 h-5 text-[#0a0a14]"})}),a.jsxs("div",{className:"min-w-0 flex-1",children:[a.jsx("h2",{className:"text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 font-display leading-tight",children:"Admin Panel"}),a.jsx("p",{className:"text-[10px] text-gray-600 truncate",children:"Online Keys · Dashboard"})]}),a.jsx("button",{onClick:()=>r==null?void 0:r(!1),className:"lg:hidden p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-[#1a1a28] transition-colors flex-shrink-0","aria-label":"Close menu",children:a.jsx(be,{className:"w-5 h-5"})})]}),a.jsxs("nav",{className:"flex-1 overflow-y-auto px-3 py-4 space-y-1",children:[a.jsx("p",{className:"px-3 pb-2 text-[9px] uppercase tracking-[0.15em] text-gray-700 font-semibold",children:"Menu"}),oa.map(c=>{const p=c.icon;return a.jsx(Ne,{to:c.to,end:c.to==="/admin/dashboard",onClick:()=>r==null?void 0:r(!1),className:({isActive:m})=>`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 overflow-hidden ${m?"bg-gradient-to-r from-amber-500/15 to-amber-500/5 text-amber-400 border border-amber-500/20 shadow-sm shadow-amber-500/10":"text-gray-400 hover:bg-[#0a0a14]/60 hover:text-gray-200 border border-transparent"}`,children:({isActive:m})=>a.jsxs(a.Fragment,{children:[m&&a.jsx("span",{className:"absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full bg-gradient-to-b from-amber-400 to-orange-500"}),a.jsx(p,{className:`w-4 h-4 flex-shrink-0 ${m?"text-amber-400":""}`}),a.jsx("span",{children:c.label})]})},c.to)})]}),a.jsxs("div",{className:"px-3 py-4 border-t border-[#1e1e2e]/60 space-y-2",children:[s&&a.jsxs("div",{className:"flex items-center gap-2.5 px-2.5 py-2 rounded-xl bg-[#0a0a14]/50 border border-[#1e1e2e]/50",children:[a.jsx("div",{className:"w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/30 to-orange-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0",children:a.jsx("span",{className:"text-[10px] font-bold text-amber-400",children:l})}),a.jsxs("div",{className:"min-w-0 flex-1",children:[a.jsx("p",{className:"text-[11px] font-medium text-gray-300 truncate",children:s.name||s.email}),a.jsx("p",{className:"text-[9px] text-gray-600 uppercase tracking-wider",children:"Administrator"})]})]}),a.jsxs("button",{onClick:o,className:"flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-[13px] font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 border border-transparent hover:border-red-500/20 transition-all duration-200",children:[a.jsx(Ut,{className:"w-4 h-4 flex-shrink-0"}),a.jsx("span",{children:"Logout"})]})]})]});return a.jsxs(a.Fragment,{children:[t&&a.jsx("div",{className:"fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden",onClick:()=>r==null?void 0:r(!1)}),a.jsx("aside",{className:`
          fixed lg:static inset-y-0 left-0 z-50 w-64 flex-shrink-0
          bg-[#0d0d1a]/95 backdrop-blur-xl border-r border-[#1e1e2e]/60
          transition-transform duration-300 ease-in-out
          ${t?"translate-x-0":"-translate-x-full lg:translate-x-0"}
        `,children:u})]})}),ia=d.memo(function({open:t,onToggle:r}){const{user:s}=Y();return a.jsx("header",{className:"fixed top-0 left-0 right-0 z-30 lg:hidden bg-[#0d0d1a]/95 backdrop-blur-xl border-b border-[#1e1e2e]/60",children:a.jsxs("div",{className:"flex items-center gap-3 h-14 px-3",children:[a.jsx("button",{onClick:r,className:"p-2 rounded-xl border border-[#1e1e2e]/80 bg-[#0a0a14]/60 text-amber-400 hover:text-amber-300 active:scale-95 transition-all flex-shrink-0","aria-label":t?"Close menu":"Open menu",children:t?a.jsx(be,{className:"w-5 h-5"}):a.jsx(qt,{className:"w-5 h-5"})}),a.jsxs("div",{className:"flex items-center gap-2 min-w-0 flex-1",children:[a.jsx("div",{className:"w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-gold-sm",children:a.jsx(ye,{className:"w-4 h-4 text-[#0a0a14]"})}),a.jsxs("div",{className:"min-w-0",children:[a.jsx("p",{className:"text-sm font-bold text-white font-display leading-tight truncate",children:"Admin Panel"}),a.jsx("p",{className:"text-[9px] text-gray-600 truncate",children:(s==null?void 0:s.name)||"Online Keys · Dashboard"})]})]}),a.jsxs(F,{to:"/",className:"flex items-center gap-1.5 text-[10px] font-medium text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 px-2.5 py-1.5 rounded-lg transition-all shrink-0",children:[a.jsx(Xt,{className:"w-3 h-3"})," Store"]})]})})}),la=["Rahul","Priya","Amit","Sneha","Vikram","Ananya","Rohit","Pooja","Karan","Neha","Arjun","Divya","Sanjay","Ritu","Manish","Kavita","Deepak","Anjali","Suresh","Meera","Aditya","Ishita","Varun","Tanvi"],da=["Mumbai","Delhi","Bengaluru","Hyderabad","Pune","Chennai","Kolkata","Jaipur","Lucknow","Ahmedabad","Surat","Nagpur","Indore","Kochi","Chandigarh","Patna","Bhopal","Goa","Vadodara","Ludhiana"],ca=["just now","just now","1 min ago","2 mins ago","3 mins ago","5 mins ago"],ua=["bought","purchased","grabbed"],S=e=>e[Math.floor(Math.random()*e.length)];function ma(){const[e,t]=d.useState([]),[r,s]=d.useState({}),n=d.useRef([]);d.useEffect(()=>{Ct.getAll({active:"true",limit:"50"}).then(l=>{n.current=l.data||[]}).catch(()=>{})},[]);const i=d.useCallback(l=>{s(u=>({...u,[l]:!0})),setTimeout(()=>{t(u=>u.filter(c=>c.id!==l)),s(u=>{const c={...u};return delete c[l],c})},380)},[]),o=d.useCallback(()=>{var x;const l=n.current;if(!l.length)return;const u=S(l),c=(x=u.durations)==null?void 0:x[Math.floor(Math.random()*u.durations.length)],p=Date.now()+Math.random(),m={id:p,name:S(la),city:S(da),verb:S(ua),title:u.title,durLabel:(c==null?void 0:c.label)||"",timeAgo:S(ca)};t(f=>[...f.slice(-1),m]),setTimeout(()=>i(p),6e3)},[i]);return d.useEffect(()=>{o();const l=setTimeout(o,8e3);let u;const c=()=>{u=setTimeout(()=>{o(),c()},9e3+Math.random()*7e3)};return c(),()=>{clearTimeout(l),clearTimeout(u)}},[o]),e.length?a.jsx("div",{className:"fixed bottom-4 left-4 z-[70] flex flex-col gap-2 w-[300px] pointer-events-none select-none",children:e.map(l=>a.jsxs("div",{className:`${r[l.id]?"toast-leave":"toast-slide-in"} bg-[#0d0d1a]/95 backdrop-blur-xl border border-[#1e1e2e]/80 rounded-xl p-3 shadow-panel flex items-start gap-2.5`,children:[a.jsx("div",{className:"w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500/30 to-orange-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0",children:a.jsx("span",{className:"text-xs font-bold text-amber-400",children:l.name.slice(0,1)})}),a.jsxs("div",{className:"min-w-0 flex-1",children:[a.jsxs("p",{className:"text-[11px] leading-snug text-gray-300",children:[a.jsx("span",{className:"font-bold text-white",children:l.name})," from ",a.jsx("span",{className:"text-gray-500",children:l.city})," ",l.verb," ",a.jsx("span",{className:"font-semibold text-amber-400 truncate",children:l.title}),l.durLabel&&a.jsxs("span",{className:"text-gray-500",children:[" — ",l.durLabel]})]}),a.jsxs("p",{className:"text-[9px] text-gray-600 mt-1 flex items-center gap-1.5",children:[a.jsxs("span",{className:"relative flex h-1.5 w-1.5",children:[a.jsx("span",{className:"animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"}),a.jsx("span",{className:"relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"})]}),a.jsx("span",{className:"text-emerald-400 font-medium",children:"Verified"})," · ",l.timeAgo]})]}),a.jsx(Rt,{className:"w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5"})]},l.id))}):null}const pa=d.lazy(()=>v(()=>import("./Home-BJSXzjzs.js"),__vite__mapDeps([0,1,2,3,4]))),ha=d.lazy(()=>v(()=>import("./ProductPage-CsDye9Ez.js"),__vite__mapDeps([5,1,4,2,6,7,3,8]))),xa=d.lazy(()=>v(()=>import("./Login-D8i69Vsf.js"),__vite__mapDeps([9,1,3,4]))),fa=d.lazy(()=>v(()=>import("./NotFound-ShGK6aRr.js"),__vite__mapDeps([10,1,4]))),ae=d.lazy(()=>v(()=>import("./Dashboard-DrmU4gIW.js"),__vite__mapDeps([11,1,12,4]))),ga=d.lazy(()=>v(()=>import("./ManageMods-DLekDrre.js"),__vite__mapDeps([13,1,14,15,4]))),re=d.lazy(()=>v(()=>import("./AddMod-DLCBC43I.js"),__vite__mapDeps([16,1,6,14,4]))),ya=d.lazy(()=>v(()=>import("./AdminKeys-CoHduwG3.js"),__vite__mapDeps([17,1,18,14,15,4]))),ba=d.lazy(()=>v(()=>import("./AvailableKeys-d_twiioS.js"),__vite__mapDeps([19,1,7,18,4]))),va=d.lazy(()=>v(()=>import("./CouponsPage-Dtu8pE8b.js"),__vite__mapDeps([20,1,14,8,12,15,4]))),ja=d.lazy(()=>v(()=>import("./OrdersList-CSBdausm.js"),__vite__mapDeps([21,1,4]))),wa=d.lazy(()=>v(()=>import("./SettingsPage-DDK75eKP.js"),__vite__mapDeps([22,1,4])));function k({children:e}){const[t,r]=d.useState(!1);return a.jsxs("div",{className:"flex min-h-screen",children:[a.jsx(ia,{open:t,onToggle:()=>r(!t)}),a.jsx(na,{open:t,onToggle:r}),a.jsx("div",{className:"flex-1 min-h-screen overflow-auto pt-14 lg:pt-0",children:a.jsx("div",{className:"p-4 md:p-6 lg:p-8 max-w-6xl mx-auto",children:e})})]})}function ka(){const t=se().pathname.startsWith("/admin");return a.jsxs("div",{className:"min-h-screen",children:[a.jsx(ra,{}),!t&&a.jsx(ma,{}),a.jsx("main",{children:a.jsx(d.Suspense,{fallback:a.jsx(he,{text:"Loading..."}),children:a.jsxs(_e,{children:[a.jsx(y,{path:"/",element:a.jsx(pa,{})}),a.jsx(y,{path:"/product/:id",element:a.jsx(ha,{})}),a.jsx(y,{path:"/login",element:a.jsx(xa,{})}),a.jsx(y,{path:"/mods",element:a.jsx(O,{to:"/",replace:!0})}),a.jsx(y,{path:"/mods/:id",element:a.jsx(O,{to:"/",replace:!0})}),a.jsx(y,{path:"/products",element:a.jsx(O,{to:"/",replace:!0})}),a.jsx(y,{path:"/products/:id",element:a.jsx(O,{to:"/product/:id",replace:!0})}),a.jsx(y,{path:"/admin",element:a.jsx(w,{adminOnly:!0,children:a.jsx(k,{children:a.jsx(ae,{})})})}),a.jsx(y,{path:"/admin/dashboard",element:a.jsx(w,{adminOnly:!0,children:a.jsx(k,{children:a.jsx(ae,{})})})}),a.jsx(y,{path:"/admin/mods",element:a.jsx(w,{adminOnly:!0,children:a.jsx(k,{children:a.jsx(ga,{})})})}),a.jsx(y,{path:"/admin/mods/add",element:a.jsx(w,{adminOnly:!0,children:a.jsx(k,{children:a.jsx(re,{})})})}),a.jsx(y,{path:"/admin/mods/:id",element:a.jsx(w,{adminOnly:!0,children:a.jsx(k,{children:a.jsx(re,{})})})}),a.jsx(y,{path:"/admin/keys",element:a.jsx(w,{adminOnly:!0,children:a.jsx(k,{children:a.jsx(ya,{})})})}),a.jsx(y,{path:"/admin/available-keys",element:a.jsx(w,{adminOnly:!0,children:a.jsx(k,{children:a.jsx(ba,{})})})}),a.jsx(y,{path:"/admin/coupons",element:a.jsx(w,{adminOnly:!0,children:a.jsx(k,{children:a.jsx(va,{})})})}),a.jsx(y,{path:"/admin/orders",element:a.jsx(w,{adminOnly:!0,children:a.jsx(k,{children:a.jsx(ja,{})})})}),a.jsx(y,{path:"/admin/settings",element:a.jsx(w,{adminOnly:!0,children:a.jsx(k,{children:a.jsx(wa,{})})})}),a.jsx(y,{path:"*",element:a.jsx(fa,{})})]})})})]})}U.createRoot(document.getElementById("root")).render(a.jsx(Ae.StrictMode,{children:a.jsx(Ce,{children:a.jsxs(sa,{children:[a.jsx(ka,{}),a.jsx(wt,{position:"top-right",toastOptions:{duration:3e3,style:{background:"#1e293b",color:"#f8fafc",border:"1px solid #334155"}}})]})})}));export{Rt as B,Dt as C,fe as K,he as L,Jt as P,ye as S,ta as T,be as X,Pa as a,Oa as b,b as c,Vt as d,a as j,Ca as k,Ea as o,Ct as p,$a as s,Y as u,Aa as z};
