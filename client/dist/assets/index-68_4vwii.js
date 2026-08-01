const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Home-2JA2VxWH.js","assets/vendor-CG8VVLXi.js","assets/SiteFooter-B4a-V4Rv.js","assets/zap-CYnzSzEE.js","assets/clock-BQubvZrY.js","assets/utils-DhXgJQ-f.js","assets/ProductPage-B1uGd5ea.js","assets/sparkles-CcF6pMCB.js","assets/percent-CAqpjgbp.js","assets/Login-D_HqilEN.js","assets/NotFound-DpKexeLX.js","assets/Dashboard-BxX3f2YB.js","assets/dollar-sign-Ca9dagwM.js","assets/ManageMods-Bn-_J8GC.js","assets/trash-2-Dth6jvrk.js","assets/AddMod-BYuXzthR.js","assets/AdminKeys-v6hLooRL.js","assets/chevron-down-D1fW6-2w.js","assets/AvailableKeys-DE9KEYHZ.js","assets/CouponsPage-CFVfJa1c.js","assets/OrdersList-BBWzg1Zg.js","assets/SettingsPage-YojBy5U3.js"])))=>i.map(i=>d[i]);
import{r as d,a as ke,u as oe,b as ie,L as R,N as P,c as Ne,R as _e,d as b,e as Ce,B as Ee}from"./vendor-CG8VVLXi.js";import{a as Ae}from"./utils-DhXgJQ-f.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function r(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=r(o);fetch(o.href,i)}})();var le={exports:{}},T={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Le=d,Pe=Symbol.for("react.element"),$e=Symbol.for("react.fragment"),Se=Object.prototype.hasOwnProperty,Oe=Le.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Ie={key:!0,ref:!0,__self:!0,__source:!0};function de(e,t,r){var s,o={},i=null,n=null;r!==void 0&&(i=""+r),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(n=t.ref);for(s in t)Se.call(t,s)&&!Ie.hasOwnProperty(s)&&(o[s]=t[s]);if(e&&e.defaultProps)for(s in t=e.defaultProps,t)o[s]===void 0&&(o[s]=t[s]);return{$$typeof:Pe,type:e,key:i,ref:n,props:o,_owner:Oe.current}}T.Fragment=$e;T.jsx=de;T.jsxs=de;le.exports=T;var a=le.exports,W={},ee=ke;W.createRoot=ee.createRoot,W.hydrateRoot=ee.hydrateRoot;let Me={data:""},Re=e=>{if(typeof window=="object"){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||Me},De=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,ze=/\/\*[^]*?\*\/|  +/g,te=/\n+/g,A=(e,t)=>{let r="",s="",o="";for(let i in e){let n=e[i];i[0]=="@"?i[1]=="i"?r=i+" "+n+";":s+=i[1]=="f"?A(n,i):i+"{"+A(n,i[1]=="k"?"":t)+"}":typeof n=="object"?s+=A(n,t?t.replace(/([^,])+/g,m=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,l=>/&/.test(l)?l.replace(/&/g,m):m?m+" "+l:l)):i):n!=null&&(i=i[1]=="-"?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=A.p?A.p(i,n):i+":"+n+";")}return r+(t&&o?t+"{"+o+"}":o)+s},E={},ce=e=>{if(typeof e=="object"){let t="";for(let r in e)t+=r+ce(e[r]);return t}return e},Te=(e,t,r,s,o)=>{let i=ce(e),n=E[i]||(E[i]=(l=>{let c=0,u=11;for(;c<l.length;)u=101*u+l.charCodeAt(c++)>>>0;return"go"+u})(i));if(!E[n]){let l=i!==e?e:(c=>{let u,p,x=[{}];for(;u=De.exec(c.replace(ze,""));)u[4]?x.shift():u[3]?(p=u[3].replace(te," ").trim(),x.unshift(x[0][p]=x[0][p]||{})):x[0][u[1]]=u[2].replace(te," ").trim();return x[0]})(e);E[n]=A(o?{["@keyframes "+n]:l}:l,r?"":"."+n)}let m=r&&E.g;return r&&(E.g=E[n]),((l,c,u,p)=>{p?c.data=c.data.replace(p,l):c.data.indexOf(l)===-1&&(c.data=u?l+c.data:c.data+l)})(E[n],t,s,m),n},Ve=(e,t,r)=>e.reduce((s,o,i)=>{let n=t[i];if(n&&n.call){let m=n(r),l=m&&m.props&&m.props.className||/^go/.test(m)&&m;n=l?"."+l:m&&typeof m=="object"?m.props?"":A(m,""):m===!1?"":m}return s+o+(n??"")},"");function V(e){let t=this||{},r=e.call?e(t.p):e;return Te(r.unshift?r.raw?Ve(r,[].slice.call(arguments,1),t.p):r.reduce((s,o)=>Object.assign(s,o&&o.call?o(t.p):o),{}):r,Re(t.target),t.g,t.o,t.k)}let me,X,Z;V.bind({g:1});let C=V.bind({k:1});function Be(e,t,r,s){A.p=t,me=e,X=r,Z=s}function L(e,t){let r=this||{};return function(){let s=arguments;function o(i,n){let m=Object.assign({},i),l=m.className||o.className;r.p=Object.assign({theme:X&&X()},m),r.o=/go\d/.test(l),m.className=V.apply(r,s)+(l?" "+l:"");let c=e;return e[0]&&(c=m.as||e,delete m.as),Z&&c[0]&&Z(m),me(c,m)}return o}}var Ke=e=>typeof e=="function",z=(e,t)=>Ke(e)?e(t):e,He=(()=>{let e=0;return()=>(++e).toString()})(),ue=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),Fe=20,J="default",pe=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(n=>n.id===t.toast.id?{...n,...t.toast}:n)};case 2:let{toast:s}=t;return pe(e,{type:e.toasts.find(n=>n.id===s.id)?1:0,toast:s});case 3:let{toastId:o}=t;return{...e,toasts:e.toasts.map(n=>n.id===o||o===void 0?{...n,dismissed:!0,visible:!1}:n)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(n=>n.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(n=>({...n,pauseDuration:n.pauseDuration+i}))}}},D=[],he={toasts:[],pausedAt:void 0,settings:{toastLimit:Fe}},_={},xe=(e,t=J)=>{_[t]=pe(_[t]||he,e),D.forEach(([r,s])=>{r===t&&s(_[t])})},fe=e=>Object.keys(_).forEach(t=>xe(e,t)),Ue=e=>Object.keys(_).find(t=>_[t].toasts.some(r=>r.id===e)),B=(e=J)=>t=>{xe(t,e)},qe={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},We=(e={},t=J)=>{let[r,s]=d.useState(_[t]||he),o=d.useRef(_[t]);d.useEffect(()=>(o.current!==_[t]&&s(_[t]),D.push([t,s]),()=>{let n=D.findIndex(([m])=>m===t);n>-1&&D.splice(n,1)}),[t]);let i=r.toasts.map(n=>{var m,l,c;return{...e,...e[n.type],...n,removeDelay:n.removeDelay||((m=e[n.type])==null?void 0:m.removeDelay)||(e==null?void 0:e.removeDelay),duration:n.duration||((l=e[n.type])==null?void 0:l.duration)||(e==null?void 0:e.duration)||qe[n.type],style:{...e.style,...(c=e[n.type])==null?void 0:c.style,...n.style}}});return{...r,toasts:i}},Xe=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(r==null?void 0:r.id)||He()}),O=e=>(t,r)=>{let s=Xe(t,e,r);return B(s.toasterId||Ue(s.id))({type:2,toast:s}),s.id},g=(e,t)=>O("blank")(e,t);g.error=O("error");g.success=O("success");g.loading=O("loading");g.custom=O("custom");g.dismiss=(e,t)=>{let r={type:3,toastId:e};t?B(t)(r):fe(r)};g.dismissAll=e=>g.dismiss(void 0,e);g.remove=(e,t)=>{let r={type:4,toastId:e};t?B(t)(r):fe(r)};g.removeAll=e=>g.remove(void 0,e);g.promise=(e,t,r)=>{let s=g.loading(t.loading,{...r,...r==null?void 0:r.loading});return typeof e=="function"&&(e=e()),e.then(o=>{let i=t.success?z(t.success,o):void 0;return i?g.success(i,{id:s,...r,...r==null?void 0:r.success}):g.dismiss(s),o}).catch(o=>{let i=t.error?z(t.error,o):void 0;i?g.error(i,{id:s,...r,...r==null?void 0:r.error}):g.dismiss(s)}),e};var Ze=1e3,Je=(e,t="default")=>{let{toasts:r,pausedAt:s}=We(e,t),o=d.useRef(new Map).current,i=d.useCallback((p,x=Ze)=>{if(o.has(p))return;let f=setTimeout(()=>{o.delete(p),n({type:4,toastId:p})},x);o.set(p,f)},[]);d.useEffect(()=>{if(s)return;let p=Date.now(),x=r.map(f=>{if(f.duration===1/0)return;let y=(f.duration||0)+f.pauseDuration-(p-f.createdAt);if(y<0){f.visible&&g.dismiss(f.id);return}return setTimeout(()=>g.dismiss(f.id,t),y)});return()=>{x.forEach(f=>f&&clearTimeout(f))}},[r,s,t]);let n=d.useCallback(B(t),[t]),m=d.useCallback(()=>{n({type:5,time:Date.now()})},[n]),l=d.useCallback((p,x)=>{n({type:1,toast:{id:p,height:x}})},[n]),c=d.useCallback(()=>{s&&n({type:6,time:Date.now()})},[s,n]),u=d.useCallback((p,x)=>{let{reverseOrder:f=!1,gutter:y=8,defaultPosition:I}=x||{},$=r.filter(w=>(w.position||I)===(p.position||I)&&w.height),we=$.findIndex(w=>w.id===p.id),G=$.filter((w,F)=>F<we&&w.visible).length;return $.filter(w=>w.visible).slice(...f?[G+1]:[0,G]).reduce((w,F)=>w+(F.height||0)+y,0)},[r]);return d.useEffect(()=>{r.forEach(p=>{if(p.dismissed)i(p.id,p.removeDelay);else{let x=o.get(p.id);x&&(clearTimeout(x),o.delete(p.id))}})},[r,i]),{toasts:r,handlers:{updateHeight:l,startPause:m,endPause:c,calculateOffset:u}}},Ye=C`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Qe=C`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Ge=C`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,et=L("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Ye} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
    animation: ${Ge} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,tt=C`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,at=L("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${tt} 1s linear infinite;
`,rt=C`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,st=C`
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
}`,nt=L("div")`
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
`,ot=L("div")`
  position: absolute;
`,it=L("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,lt=C`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,dt=L("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${lt} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ct=({toast:e})=>{let{icon:t,type:r,iconTheme:s}=e;return t!==void 0?typeof t=="string"?d.createElement(dt,null,t):t:r==="blank"?null:d.createElement(it,null,d.createElement(at,{...s}),r!=="loading"&&d.createElement(ot,null,r==="error"?d.createElement(et,{...s}):d.createElement(nt,{...s})))},mt=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ut=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,pt="0%{opacity:0;} 100%{opacity:1;}",ht="0%{opacity:1;} 100%{opacity:0;}",xt=L("div")`
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
`,ft=L("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,gt=(e,t)=>{let r=e.includes("top")?1:-1,[s,o]=ue()?[pt,ht]:[mt(r),ut(r)];return{animation:t?`${C(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${C(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},bt=d.memo(({toast:e,position:t,style:r,children:s})=>{let o=e.height?gt(e.position||t||"top-center",e.visible):{opacity:0},i=d.createElement(ct,{toast:e}),n=d.createElement(ft,{...e.ariaProps},z(e.message,e));return d.createElement(xt,{className:e.className,style:{...o,...r,...e.style}},typeof s=="function"?s({icon:i,message:n}):d.createElement(d.Fragment,null,i,n))});Be(d.createElement);var yt=({id:e,className:t,style:r,onHeightUpdate:s,children:o})=>{let i=d.useCallback(n=>{if(n){let m=()=>{let l=n.getBoundingClientRect().height;s(e,l)};m(),new MutationObserver(m).observe(n,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return d.createElement("div",{ref:i,className:t,style:r},o)},vt=(e,t)=>{let r=e.includes("top"),s=r?{top:0}:{bottom:0},o=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:ue()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...s,...o}},jt=V`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,M=16,wt=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:s,children:o,toasterId:i,containerStyle:n,containerClassName:m})=>{let{toasts:l,handlers:c}=Je(r,i);return d.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:M,left:M,right:M,bottom:M,pointerEvents:"none",...n},className:m,onMouseEnter:c.startPause,onMouseLeave:c.endPause},l.map(u=>{let p=u.position||t,x=c.calculateOffset(u,{reverseOrder:e,gutter:s,defaultPosition:t}),f=vt(p,x);return d.createElement(yt,{id:u.id,key:u.id,onHeightUpdate:c.updateHeight,className:u.visible?jt:"",style:f},u.type==="custom"?z(u.message,u):o?o(u):d.createElement(bt,{toast:u,position:p}))}))},Pa=g;const kt="modulepreload",Nt=function(e){return"/"+e},ae={},j=function(t,r,s){let o=Promise.resolve();if(r&&r.length>0){document.getElementsByTagName("link");const n=document.querySelector("meta[property=csp-nonce]"),m=(n==null?void 0:n.nonce)||(n==null?void 0:n.getAttribute("nonce"));o=Promise.allSettled(r.map(l=>{if(l=Nt(l),l in ae)return;ae[l]=!0;const c=l.endsWith(".css"),u=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${u}`))return;const p=document.createElement("link");if(p.rel=c?"stylesheet":kt,c||(p.as="script"),p.crossOrigin="",p.href=l,m&&p.setAttribute("nonce",m),document.head.appendChild(p),c)return new Promise((x,f)=>{p.addEventListener("load",x),p.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${l}`)))})}))}function i(n){const m=new Event("vite:preloadError",{cancelable:!0});if(m.payload=n,window.dispatchEvent(m),!m.defaultPrevented)throw n}return o.then(n=>{for(const m of n||[])m.status==="rejected"&&i(m.reason);return t().catch(i)})};function ge({size:e="md",text:t="Loading..."}){const r={sm:"h-6 w-6 border-2",md:"h-10 w-10 border-[3px]",lg:"h-16 w-16 border-4"};return a.jsxs("div",{className:"flex flex-col items-center justify-center py-16 animate-fade-in",children:[a.jsxs("div",{className:"relative",children:[a.jsx("div",{className:`${r[e]} animate-spin rounded-full border-dark-600/60 border-t-amber-500`}),a.jsx("div",{className:"absolute inset-0 animate-pulse rounded-full",style:{boxShadow:"0 0 24px rgba(245,158,11,0.15)"}})]}),t&&a.jsx("p",{className:"mt-4 text-dark-400 text-sm tracking-wide",children:t})]})}const _t="/api",h=Ae.create({baseURL:_t,timeout:15e3,headers:{"Content-Type":"application/json"}}),Y=new Map,Ct=3e4;h.interceptors.request.use(e=>{const t=localStorage.getItem("token");return t&&(e.headers.Authorization=`Bearer ${t}`),e});h.interceptors.response.use(e=>{if(e.config.method==="get"&&e.config.cache!==!1){const t=e.config.url+JSON.stringify(e.config.params||{});Y.set(t,{data:e.data,timestamp:Date.now()})}return e},e=>{var t;return((t=e.response)==null?void 0:t.status)===401&&(localStorage.removeItem("token"),window.location.href="/login"),Promise.reject(e)});h.getCached=async(e,t={})=>{const r=e+JSON.stringify(t.params||{}),s=Y.get(r);return s&&Date.now()-s.timestamp<Ct?s.data:(await h.get(e,t)).data};h.clearCache=()=>Y.clear();const U={login:e=>h.post("/auth/login",e).then(t=>t.data),register:e=>h.post("/auth/register",e).then(t=>t.data),getMe:()=>h.get("/auth/me").then(e=>e.data)},Et={getAll:e=>h.getCached("/products",{params:e}),getById:e=>h.getCached(`/products/${e}`),create:e=>(h.clearCache(),h.post("/products",e).then(t=>t.data)),update:(e,t)=>(h.clearCache(),h.put(`/products/${e}`,t).then(r=>r.data)),delete:e=>(h.clearCache(),h.delete(`/products/${e}`).then(t=>t.data))},$a={getStats:()=>h.get("/keys/stats").then(e=>e.data),clearExpired:()=>h.post("/keys/clear-expired").then(e=>e.data),getByProduct:(e,t)=>h.get(`/keys/${e}`,{params:t}).then(r=>r.data),add:e=>(h.clearCache(),h.post("/keys/add",e).then(t=>t.data)),delete:e=>(h.clearCache(),h.delete(`/keys/${e}`).then(t=>t.data))},Sa={initiate:e=>h.post("/orders/initiate",e).then(t=>t.data),complete:e=>h.post("/orders/complete",e).then(t=>t.data),release:e=>h.post("/orders/release",e).then(t=>t.data),getMyOrders:()=>h.get("/orders/my").then(e=>e.data),getAll:e=>h.get("/orders",{params:e}).then(t=>t.data)},Oa={getAll:()=>h.get("/settings").then(e=>e.data),getByKey:e=>h.get(`/settings/${e}`).then(t=>t.data),update:(e,t)=>(h.clearCache(),h.put(`/settings/${e}`,t).then(r=>r.data))},Ia={getSummary:()=>h.get("/analytics/summary").then(e=>e.data),getSalesChart:e=>h.get(`/analytics/sales-chart?days=${e||30}`).then(t=>t.data),getTopMods:e=>h.get(`/analytics/top-mods?limit=${e||10}`).then(t=>t.data)},Ma={getAll:()=>h.get("/coupons").then(e=>e.data),create:e=>h.post("/coupons",e).then(t=>t.data),update:(e,t)=>h.put(`/coupons/${e}`,t).then(r=>r.data),delete:e=>h.delete(`/coupons/${e}`).then(t=>t.data),validate:e=>h.post("/coupons/validate",e).then(t=>t.data)},be=d.createContext(null);function At({children:e}){const[t,r]=d.useState(null),[s,o]=d.useState(!0);d.useEffect(()=>{localStorage.getItem("token")?U.getMe().then(c=>r(c.data)).catch(()=>localStorage.removeItem("token")).finally(()=>o(!1)):o(!1)},[]);const i=d.useCallback(async(l,c)=>{const u=await U.login({email:l,password:c});return localStorage.setItem("token",u.data.token),r(u.data),u.data},[]),n=d.useCallback(async(l,c,u)=>{const p=await U.register({name:l,email:c,password:u});return localStorage.setItem("token",p.data.token),r(p.data),p.data},[]),m=d.useCallback(()=>{localStorage.removeItem("token"),r(null)},[]);return a.jsx(be.Provider,{value:{user:t,loading:s,login:i,register:n,logout:m},children:e})}const K=()=>{const e=d.useContext(be);if(!e)throw new Error("useAuth must be used within AuthProvider");return e};/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ye=(...e)=>e.filter((t,r,s)=>!!t&&t.trim()!==""&&s.indexOf(t)===r).join(" ").trim();/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lt=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pt=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,r,s)=>s?s.toUpperCase():r.toLowerCase());/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const re=e=>{const t=Pt(e);return t.charAt(0).toUpperCase()+t.slice(1)};/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var q={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $t=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1},St=d.createContext({}),Ot=()=>d.useContext(St),It=d.forwardRef(({color:e,size:t,strokeWidth:r,absoluteStrokeWidth:s,className:o="",children:i,iconNode:n,...m},l)=>{const{size:c=24,strokeWidth:u=2,absoluteStrokeWidth:p=!1,color:x="currentColor",className:f=""}=Ot()??{},y=s??p?Number(r??u)*24/Number(t??c):r??u;return d.createElement("svg",{ref:l,...q,width:t??c??q.width,height:t??c??q.height,stroke:e??x,strokeWidth:y,className:ye("lucide",f,o),...!i&&!$t(m)&&{"aria-hidden":"true"},...m},[...n.map(([I,$])=>d.createElement(I,$)),...Array.isArray(i)?i:[i]])});/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=(e,t)=>{const r=d.forwardRef(({className:s,...o},i)=>d.createElement(It,{ref:i,iconNode:t,className:ye(`lucide-${Lt(re(e))}`,`lucide-${e}`,s),...o}));return r.displayName=re(e),r};/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mt=[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",key:"3c2336"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],Rt=v("badge-check",Mt);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dt=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]],zt=v("chart-column",Dt);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tt=[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}],["path",{d:"M12 11h4",key:"1jrz19"}],["path",{d:"M12 16h4",key:"n85exb"}],["path",{d:"M8 11h.01",key:"1dfujw"}],["path",{d:"M8 16h.01",key:"18s6g9"}]],Vt=v("clipboard-list",Tt);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bt=[["path",{d:"M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",key:"1s6t7t"}],["circle",{cx:"16.5",cy:"7.5",r:".5",fill:"currentColor",key:"w0ekpg"}]],Q=v("key-round",Bt);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kt=[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]],ve=v("layout-dashboard",Kt);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ht=[["path",{d:"m10 17 5-5-5-5",key:"1bsop3"}],["path",{d:"M15 12H3",key:"6jk70r"}],["path",{d:"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",key:"u53s6r"}]],Ft=v("log-in",Ht);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ut=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],qt=v("log-out",Ut);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wt=[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]],Xt=v("menu",Wt);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zt=[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",key:"1a0edw"}],["path",{d:"M12 22V12",key:"d0xqtd"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}]],Jt=v("package",Zt);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yt=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],Qt=v("search",Yt);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gt=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],ea=v("settings",Gt);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ta=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],je=v("shield-check",ta);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const aa=[["path",{d:"M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5",key:"slp6dd"}],["path",{d:"M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244",key:"o0xfot"}],["path",{d:"M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05",key:"wn3emo"}]],ra=v("store",aa);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sa=[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",key:"vktsd0"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor",key:"kqv944"}]],na=v("tag",sa);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oa=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],H=v("x",oa);function ia(){const e=oe(),t=ie(),{user:r}=K(),s=new URLSearchParams(e.search).get("q")||"",[o,i]=d.useState(s);if(d.useEffect(()=>{i(s)},[s]),e.pathname.startsWith("/admin"))return null;const n=m=>{m.preventDefault();const l=o.trim();t(l?`/?q=${encodeURIComponent(l)}`:"/")};return a.jsx("header",{className:"sticky top-0 z-50 bg-[#080812]/85 backdrop-blur-xl border-b border-[#1e1e2e]/50",children:a.jsx("div",{className:"max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3",children:a.jsxs("div",{className:"flex items-center gap-2 sm:gap-4",children:[a.jsx(R,{to:"/",className:"flex-shrink-0 group",title:"KeyStore",children:a.jsx("span",{className:"flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 shadow-gold group-hover:scale-105 transition-transform duration-200",children:a.jsx(Q,{className:"w-4 h-4 sm:w-5 sm:h-5 text-white"})})}),a.jsxs("form",{onSubmit:n,className:"flex-1 min-w-0 max-w-xl mx-auto relative",children:[a.jsx(Qt,{className:"absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600"}),a.jsx("input",{type:"text",value:o,onChange:m=>i(m.target.value),placeholder:"Search mods...",className:"w-full bg-[#0d0d1a]/80 border border-[#1e1e2e]/60 rounded-xl pl-9 pr-8 py-2 sm:py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/40 transition-all"}),o&&a.jsx("button",{type:"button",onClick:()=>{i(""),t("/")},className:"absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300 transition-colors","aria-label":"Clear search",children:a.jsx(H,{className:"w-3.5 h-3.5"})})]}),r?a.jsxs(R,{to:"/admin/dashboard",className:"flex-shrink-0 inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg transition-all",children:[a.jsx(ve,{className:"w-3.5 h-3.5 sm:w-4 sm:h-4"}),a.jsx("span",{className:"hidden sm:inline",children:"Admin"})]}):a.jsxs(R,{to:"/login",className:"flex-shrink-0 inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg transition-all",children:[a.jsx(Ft,{className:"w-3.5 h-3.5 sm:w-4 sm:h-4"}),a.jsx("span",{className:"hidden sm:inline",children:"Login"})]})]})})})}function k({children:e,adminOnly:t=!1}){const{user:r,loading:s}=K();return s?a.jsx(ge,{text:"Checking authentication..."}):r?t&&r.role!=="admin"?a.jsx(P,{to:"/",replace:!0}):e:a.jsx(P,{to:"/login",replace:!0})}const la=[{to:"/admin/dashboard",label:"Dashboard",icon:ve},{to:"/admin/mods",label:"Mods",icon:Jt},{to:"/admin/keys",label:"License Keys",icon:Q},{to:"/admin/available-keys",label:"Available Keys",icon:zt},{to:"/admin/coupons",label:"Coupons",icon:na},{to:"/admin/orders",label:"Orders",icon:Vt},{to:"/admin/settings",label:"Settings",icon:ea}],da=d.memo(function({open:t,onToggle:r}){const{user:s,logout:o}=K(),i=ie();d.useEffect(()=>{const c=()=>r==null?void 0:r(!1);return window.addEventListener("popstate",c),()=>window.removeEventListener("popstate",c)},[r]);const n=()=>{o(),i("/")},m=((s==null?void 0:s.name)||(s==null?void 0:s.email)||"A").split(/[\s@.]+/).filter(Boolean).slice(0,2).map(c=>c[0].toUpperCase()).join(""),l=a.jsxs("div",{className:"flex flex-col h-full",children:[a.jsxs("div",{className:"px-4 py-5 border-b border-[#1e1e2e]/60 flex items-center gap-3",children:[a.jsx("div",{className:"w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 flex items-center justify-center shadow-gold flex-shrink-0",children:a.jsx(je,{className:"w-5 h-5 text-[#0a0a14]"})}),a.jsxs("div",{className:"min-w-0 flex-1",children:[a.jsx("h2",{className:"text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 font-display leading-tight",children:"Admin Panel"}),a.jsx("p",{className:"text-[10px] text-gray-600 truncate",children:"Online Keys · Dashboard"})]}),a.jsx("button",{onClick:()=>r==null?void 0:r(!1),className:"lg:hidden p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-[#1a1a28] transition-colors flex-shrink-0","aria-label":"Close menu",children:a.jsx(H,{className:"w-5 h-5"})})]}),a.jsxs("nav",{className:"flex-1 overflow-y-auto px-3 py-4 space-y-1",children:[a.jsx("p",{className:"px-3 pb-2 text-[9px] uppercase tracking-[0.15em] text-gray-700 font-semibold",children:"Menu"}),la.map(c=>{const u=c.icon;return a.jsx(Ne,{to:c.to,end:c.to==="/admin/dashboard",onClick:()=>r==null?void 0:r(!1),className:({isActive:p})=>`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 overflow-hidden ${p?"bg-gradient-to-r from-amber-500/15 to-amber-500/5 text-amber-400 border border-amber-500/20 shadow-sm shadow-amber-500/10":"text-gray-400 hover:bg-[#0a0a14]/60 hover:text-gray-200 border border-transparent"}`,children:({isActive:p})=>a.jsxs(a.Fragment,{children:[p&&a.jsx("span",{className:"absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full bg-gradient-to-b from-amber-400 to-orange-500"}),a.jsx(u,{className:`w-4 h-4 flex-shrink-0 ${p?"text-amber-400":""}`}),a.jsx("span",{children:c.label})]})},c.to)})]}),a.jsxs("div",{className:"px-3 py-4 border-t border-[#1e1e2e]/60 space-y-2",children:[s&&a.jsxs("div",{className:"flex items-center gap-2.5 px-2.5 py-2 rounded-xl bg-[#0a0a14]/50 border border-[#1e1e2e]/50",children:[a.jsx("div",{className:"w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/30 to-orange-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0",children:a.jsx("span",{className:"text-[10px] font-bold text-amber-400",children:m})}),a.jsxs("div",{className:"min-w-0 flex-1",children:[a.jsx("p",{className:"text-[11px] font-medium text-gray-300 truncate",children:s.name||s.email}),a.jsx("p",{className:"text-[9px] text-gray-600 uppercase tracking-wider",children:"Administrator"})]})]}),a.jsxs("button",{onClick:n,className:"flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-[13px] font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 border border-transparent hover:border-red-500/20 transition-all duration-200",children:[a.jsx(qt,{className:"w-4 h-4 flex-shrink-0"}),a.jsx("span",{children:"Logout"})]})]})]});return a.jsxs(a.Fragment,{children:[t&&a.jsx("div",{className:"fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden",onClick:()=>r==null?void 0:r(!1)}),a.jsx("aside",{className:`
          fixed lg:static inset-y-0 left-0 z-50 w-64 flex-shrink-0
          bg-[#0d0d1a]/95 backdrop-blur-xl border-r border-[#1e1e2e]/60
          transition-transform duration-300 ease-in-out
          ${t?"translate-x-0":"-translate-x-full lg:translate-x-0"}
        `,children:l})]})}),ca=d.memo(function({open:t,onToggle:r}){const{user:s}=K();return a.jsx("header",{className:"fixed top-0 left-0 right-0 z-30 lg:hidden bg-[#0d0d1a]/95 backdrop-blur-xl border-b border-[#1e1e2e]/60",children:a.jsxs("div",{className:"flex items-center gap-3 h-14 px-3",children:[a.jsx("button",{onClick:r,className:"p-2 rounded-xl border border-[#1e1e2e]/80 bg-[#0a0a14]/60 text-amber-400 hover:text-amber-300 active:scale-95 transition-all flex-shrink-0","aria-label":t?"Close menu":"Open menu",children:t?a.jsx(H,{className:"w-5 h-5"}):a.jsx(Xt,{className:"w-5 h-5"})}),a.jsxs("div",{className:"flex items-center gap-2 min-w-0 flex-1",children:[a.jsx("div",{className:"w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-gold-sm",children:a.jsx(je,{className:"w-4 h-4 text-[#0a0a14]"})}),a.jsxs("div",{className:"min-w-0",children:[a.jsx("p",{className:"text-sm font-bold text-white font-display leading-tight truncate",children:"Admin Panel"}),a.jsx("p",{className:"text-[9px] text-gray-600 truncate",children:(s==null?void 0:s.name)||"Online Keys · Dashboard"})]})]}),a.jsxs(R,{to:"/",className:"flex items-center gap-1.5 text-[10px] font-medium text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 px-2.5 py-1.5 rounded-lg transition-all shrink-0",children:[a.jsx(ra,{className:"w-3 h-3"})," Store"]})]})})}),ma=["Rahul","Priya","Amit","Sneha","Vikram","Ananya","Rohit","Pooja","Karan","Neha","Arjun","Divya","Sanjay","Ritu","Manish","Kavita","Deepak","Anjali","Suresh","Meera","Aditya","Ishita","Varun","Tanvi"],ua=["Mumbai","Delhi","Bengaluru","Hyderabad","Pune","Chennai","Kolkata","Jaipur","Lucknow","Ahmedabad","Surat","Nagpur","Indore","Kochi","Chandigarh","Patna","Bhopal","Goa","Vadodara","Ludhiana"],pa=["just now","just now","1 min ago","2 mins ago","3 mins ago","5 mins ago"],ha=["bought","purchased","grabbed"],S=e=>e[Math.floor(Math.random()*e.length)];function xa({t:e,leaving:t,onDismiss:r}){const[s,o]=d.useState(0),[i,n]=d.useState(!1),m=d.useRef(null),l=d.useRef(0),c=y=>{l.current=y.clientX,m.current=y.pointerId,n(!0);try{y.currentTarget.setPointerCapture(y.pointerId)}catch{}},u=y=>{m.current===y.pointerId&&o(Math.max(-280,Math.min(0,y.clientX-l.current)))},p=y=>{m.current===y.pointerId&&(m.current=null,n(!1),s<=-60?r():o(0))},x=()=>{m.current=null,n(!1),o(0)},f=!!e.real;return a.jsxs("div",{className:`${t?"toast-leave":"toast-slide-in"} relative pointer-events-auto touch-pan-y rounded-xl p-3 pr-9 flex items-start gap-2.5 shadow-panel select-none cursor-grab active:cursor-grabbing
        ${f?"bg-[#0d0d1a]/95 backdrop-blur-xl border border-amber-500/40 shadow-gold-sm":"bg-[#0d0d1a]/95 backdrop-blur-xl border border-[#1e1e2e]/80"}`,style:{transform:`translateX(${s}px)`,transition:i?"none":"transform 0.25s ease"},onPointerDown:c,onPointerMove:u,onPointerUp:p,onPointerCancel:x,onPointerLeave:x,children:[a.jsx("button",{onClick:r,"aria-label":"Dismiss notification",className:"absolute top-1.5 right-1.5 text-gray-600 hover:text-gray-300 hover:bg-white/5 rounded-md p-0.5 transition-colors",children:a.jsx(H,{className:"w-3.5 h-3.5"})}),a.jsx("div",{className:`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${f?"bg-gradient-to-br from-emerald-500/30 to-teal-500/20 border border-emerald-500/30":"bg-gradient-to-br from-amber-500/30 to-orange-500/20 border border-amber-500/30"}`,children:f?a.jsx(Q,{className:"w-4 h-4 text-emerald-400"}):a.jsx("span",{className:"text-xs font-bold text-amber-400",children:e.name.slice(0,1)})}),a.jsx("div",{className:"min-w-0 flex-1",children:f?a.jsxs(a.Fragment,{children:[a.jsxs("p",{className:"text-[11px] leading-snug text-gray-300",children:[a.jsx("span",{className:"font-bold text-emerald-400",children:"Key Delivered"})," —"," ",a.jsx("span",{className:"font-semibold text-amber-400 truncate",children:e.title}),e.durLabel&&a.jsxs("span",{className:"text-gray-500",children:[" (",e.durLabel,")"]})]}),a.jsxs("p",{className:"text-[9px] text-gray-600 mt-1 flex items-center gap-1.5",children:[a.jsxs("span",{className:"relative flex h-1.5 w-1.5",children:[a.jsx("span",{className:"animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"}),a.jsx("span",{className:"relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"})]}),a.jsx("span",{className:"text-emerald-400 font-medium",children:"Payment Confirmed"}),e.amount!=null&&a.jsxs("span",{children:["· ₹",Number(e.amount).toLocaleString()]}),e.timeAgo?a.jsxs("span",{children:["· ",e.timeAgo]}):null]})]}):a.jsxs(a.Fragment,{children:[a.jsxs("p",{className:"text-[11px] leading-snug text-gray-300",children:[a.jsx("span",{className:"font-bold text-white",children:e.name})," from ",a.jsx("span",{className:"text-gray-500",children:e.city})," ",e.verb," ",a.jsx("span",{className:"font-semibold text-amber-400 truncate",children:e.title}),e.durLabel&&a.jsxs("span",{className:"text-gray-500",children:[" — ",e.durLabel]})]}),a.jsxs("p",{className:"text-[9px] text-gray-600 mt-1 flex items-center gap-1.5",children:[a.jsxs("span",{className:"relative flex h-1.5 w-1.5",children:[a.jsx("span",{className:"animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"}),a.jsx("span",{className:"relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"})]}),a.jsx("span",{className:"text-emerald-400 font-medium",children:"Verified"})," · ",e.timeAgo]})]})}),a.jsx(Rt,{className:"w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-500"})]})}function fa(){const[e,t]=d.useState([]),[r,s]=d.useState({}),o=d.useRef([]);d.useEffect(()=>{Et.getAll({active:"true",limit:"50"}).then(l=>{o.current=l.data||[]}).catch(()=>{})},[]);const i=d.useCallback(l=>{s(c=>({...c,[l]:!0})),setTimeout(()=>{t(c=>c.filter(u=>u.id!==l)),s(c=>{const u={...c};return delete u[l],u})},380)},[]),n=d.useCallback(l=>{t(c=>[...c.slice(-1),l]),setTimeout(()=>i(l.id),l.real?8e3:6e3)},[i]),m=d.useCallback(()=>{var p;const l=o.current;if(!l.length)return;const c=S(l),u=(p=c.durations)==null?void 0:p[Math.floor(Math.random()*c.durations.length)];n({id:Date.now()+Math.random(),name:S(ma),city:S(ua),verb:S(ha),title:c.title,durLabel:(u==null?void 0:u.label)||"",timeAgo:S(pa),real:!1})},[n]);return d.useEffect(()=>{m();const l=setTimeout(m,8e3);let c;const u=()=>{c=setTimeout(()=>{m(),u()},9e3+Math.random()*7e3)};return u(),()=>{clearTimeout(l),clearTimeout(c)}},[m]),d.useEffect(()=>{const l=c=>{const u=c.detail||{};n({id:Date.now()+Math.random(),title:u.title||"Order",durLabel:u.durLabel||"",amount:u.amount!=null?u.amount:null,timeAgo:"just now",real:!0})};return window.addEventListener("real-purchase",l),()=>window.removeEventListener("real-purchase",l)},[n]),e.length?a.jsx("div",{className:"fixed bottom-4 left-4 z-[70] flex flex-col gap-2 w-[300px] pointer-events-none select-none",children:e.map(l=>a.jsx(xa,{t:l,leaving:r[l.id],onDismiss:()=>i(l.id)},l.id))}):null}const ga=d.lazy(()=>j(()=>import("./Home-2JA2VxWH.js"),__vite__mapDeps([0,1,2,3,4,5]))),ba=d.lazy(()=>j(()=>import("./ProductPage-B1uGd5ea.js"),__vite__mapDeps([6,1,5,2,3,7,4,8]))),ya=d.lazy(()=>j(()=>import("./Login-D_HqilEN.js"),__vite__mapDeps([9,1,3,5]))),va=d.lazy(()=>j(()=>import("./NotFound-DpKexeLX.js"),__vite__mapDeps([10,1,5]))),se=d.lazy(()=>j(()=>import("./Dashboard-BxX3f2YB.js"),__vite__mapDeps([11,1,12,5]))),ja=d.lazy(()=>j(()=>import("./ManageMods-Bn-_J8GC.js"),__vite__mapDeps([13,1,14,5]))),ne=d.lazy(()=>j(()=>import("./AddMod-BYuXzthR.js"),__vite__mapDeps([15,1,7,14,5]))),wa=d.lazy(()=>j(()=>import("./AdminKeys-v6hLooRL.js"),__vite__mapDeps([16,1,17,14,5]))),ka=d.lazy(()=>j(()=>import("./AvailableKeys-DE9KEYHZ.js"),__vite__mapDeps([18,1,4,17,5]))),Na=d.lazy(()=>j(()=>import("./CouponsPage-CFVfJa1c.js"),__vite__mapDeps([19,1,14,8,12,5]))),_a=d.lazy(()=>j(()=>import("./OrdersList-BBWzg1Zg.js"),__vite__mapDeps([20,1,5]))),Ca=d.lazy(()=>j(()=>import("./SettingsPage-YojBy5U3.js"),__vite__mapDeps([21,1,5])));function N({children:e}){const[t,r]=d.useState(!1);return a.jsxs("div",{className:"flex min-h-screen",children:[a.jsx(ca,{open:t,onToggle:()=>r(!t)}),a.jsx(da,{open:t,onToggle:r}),a.jsx("div",{className:"flex-1 min-h-screen overflow-auto pt-14 lg:pt-0",children:a.jsx("div",{className:"p-4 md:p-6 lg:p-8 max-w-6xl mx-auto",children:e})})]})}function Ea(){const t=oe().pathname.startsWith("/admin");return a.jsxs("div",{className:"min-h-screen",children:[a.jsx(ia,{}),!t&&a.jsx(fa,{}),a.jsx("main",{children:a.jsx(d.Suspense,{fallback:a.jsx(ge,{text:"Loading..."}),children:a.jsxs(_e,{children:[a.jsx(b,{path:"/",element:a.jsx(ga,{})}),a.jsx(b,{path:"/product/:id",element:a.jsx(ba,{})}),a.jsx(b,{path:"/login",element:a.jsx(ya,{})}),a.jsx(b,{path:"/mods",element:a.jsx(P,{to:"/",replace:!0})}),a.jsx(b,{path:"/mods/:id",element:a.jsx(P,{to:"/",replace:!0})}),a.jsx(b,{path:"/products",element:a.jsx(P,{to:"/",replace:!0})}),a.jsx(b,{path:"/products/:id",element:a.jsx(P,{to:"/product/:id",replace:!0})}),a.jsx(b,{path:"/admin",element:a.jsx(k,{adminOnly:!0,children:a.jsx(N,{children:a.jsx(se,{})})})}),a.jsx(b,{path:"/admin/dashboard",element:a.jsx(k,{adminOnly:!0,children:a.jsx(N,{children:a.jsx(se,{})})})}),a.jsx(b,{path:"/admin/mods",element:a.jsx(k,{adminOnly:!0,children:a.jsx(N,{children:a.jsx(ja,{})})})}),a.jsx(b,{path:"/admin/mods/add",element:a.jsx(k,{adminOnly:!0,children:a.jsx(N,{children:a.jsx(ne,{})})})}),a.jsx(b,{path:"/admin/mods/:id",element:a.jsx(k,{adminOnly:!0,children:a.jsx(N,{children:a.jsx(ne,{})})})}),a.jsx(b,{path:"/admin/keys",element:a.jsx(k,{adminOnly:!0,children:a.jsx(N,{children:a.jsx(wa,{})})})}),a.jsx(b,{path:"/admin/available-keys",element:a.jsx(k,{adminOnly:!0,children:a.jsx(N,{children:a.jsx(ka,{})})})}),a.jsx(b,{path:"/admin/coupons",element:a.jsx(k,{adminOnly:!0,children:a.jsx(N,{children:a.jsx(Na,{})})})}),a.jsx(b,{path:"/admin/orders",element:a.jsx(k,{adminOnly:!0,children:a.jsx(N,{children:a.jsx(_a,{})})})}),a.jsx(b,{path:"/admin/settings",element:a.jsx(k,{adminOnly:!0,children:a.jsx(N,{children:a.jsx(Ca,{})})})}),a.jsx(b,{path:"*",element:a.jsx(va,{})})]})})})]})}W.createRoot(document.getElementById("root")).render(a.jsx(Ce.StrictMode,{children:a.jsx(Ee,{children:a.jsxs(At,{children:[a.jsx(Ea,{}),a.jsx(wt,{position:"top-right",toastOptions:{duration:3e3,style:{background:"#1e293b",color:"#f8fafc",border:"1px solid #334155"}}})]})})}));export{Rt as B,zt as C,Q as K,ge as L,Jt as P,je as S,na as T,H as X,Ma as a,Ft as b,v as c,Ia as d,h as e,Vt as f,a as j,$a as k,Sa as o,Et as p,Oa as s,K as u,Pa as z};
