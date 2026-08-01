const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Home-nAI7Skqh.js","assets/vendor-DlynzHKv.js","assets/utils-DhXgJQ-f.js","assets/percent-CODpW3TC.js","assets/zap-o-NoDx0M.js","assets/clock-DgWkQrbk.js","assets/Login-BhhnSzm8.js","assets/NotFound-B2ZJk7AX.js","assets/Dashboard-BkOpcYcF.js","assets/dollar-sign-DLP8qBqy.js","assets/ManageMods-DeUe5GQx.js","assets/plus-BSw8Hy16.js","assets/trash-2-D3__U8WJ.js","assets/AddMod-C5_sXVPW.js","assets/AdminKeys-BHSG1xgJ.js","assets/chevron-down-fOC-8NLu.js","assets/AvailableKeys-DNKoRa1C.js","assets/CouponsPage-BJVTOi0z.js","assets/OrdersList-B6D0T2tF.js","assets/SettingsPage-DAsREHhf.js"])))=>i.map(i=>d[i]);
import{r as l,a as ve,u as je,L as F,N as O,b as we,c as ke,R as _e,d as y,e as Ne,B as Ce}from"./vendor-DlynzHKv.js";import{a as Ee}from"./utils-DhXgJQ-f.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function a(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(n){if(n.ep)return;n.ep=!0;const i=a(n);fetch(n.href,i)}})();var re={exports:{}},z={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ae=l,$e=Symbol.for("react.element"),Oe=Symbol.for("react.fragment"),Le=Object.prototype.hasOwnProperty,Pe=Ae.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Se={key:!0,ref:!0,__self:!0,__source:!0};function se(e,t,a){var s,n={},i=null,o=null;a!==void 0&&(i=""+a),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(o=t.ref);for(s in t)Le.call(t,s)&&!Se.hasOwnProperty(s)&&(n[s]=t[s]);if(e&&e.defaultProps)for(s in t=e.defaultProps,t)n[s]===void 0&&(n[s]=t[s]);return{$$typeof:$e,type:e,key:i,ref:o,props:n,_owner:Pe.current}}z.Fragment=Oe;z.jsx=se;z.jsxs=se;re.exports=z;var r=re.exports,T={},Q=ve;T.createRoot=Q.createRoot,T.hydrateRoot=Q.hydrateRoot;let Ie={data:""},Re=e=>{if(typeof window=="object"){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||Ie},Me=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,ze=/\/\*[^]*?\*\/|  +/g,X=/\n+/g,E=(e,t)=>{let a="",s="",n="";for(let i in e){let o=e[i];i[0]=="@"?i[1]=="i"?a=i+" "+o+";":s+=i[1]=="f"?E(o,i):i+"{"+E(o,i[1]=="k"?"":t)+"}":typeof o=="object"?s+=E(o,t?t.replace(/([^,])+/g,d=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,u=>/&/.test(u)?u.replace(/&/g,d):d?d+" "+u:u)):i):o!=null&&(i=i[1]=="-"?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),n+=E.p?E.p(i,o):i+":"+o+";")}return a+(t&&n?t+"{"+n+"}":n)+s},C={},oe=e=>{if(typeof e=="object"){let t="";for(let a in e)t+=a+oe(e[a]);return t}return e},De=(e,t,a,s,n)=>{let i=oe(e),o=C[i]||(C[i]=(u=>{let c=0,h=11;for(;c<u.length;)h=101*h+u.charCodeAt(c++)>>>0;return"go"+h})(i));if(!C[o]){let u=i!==e?e:(c=>{let h,m,x=[{}];for(;h=Me.exec(c.replace(ze,""));)h[4]?x.shift():h[3]?(m=h[3].replace(X," ").trim(),x.unshift(x[0][m]=x[0][m]||{})):x[0][h[1]]=h[2].replace(X," ").trim();return x[0]})(e);C[o]=E(n?{["@keyframes "+o]:u}:u,a?"":"."+o)}let d=a&&C.g;return a&&(C.g=C[o]),((u,c,h,m)=>{m?c.data=c.data.replace(m,u):c.data.indexOf(u)===-1&&(c.data=h?u+c.data:c.data+u)})(C[o],t,s,d),o},Ve=(e,t,a)=>e.reduce((s,n,i)=>{let o=t[i];if(o&&o.call){let d=o(a),u=d&&d.props&&d.props.className||/^go/.test(d)&&d;o=u?"."+u:d&&typeof d=="object"?d.props?"":E(d,""):d===!1?"":d}return s+n+(o??"")},"");function D(e){let t=this||{},a=e.call?e(t.p):e;return De(a.unshift?a.raw?Ve(a,[].slice.call(arguments,1),t.p):a.reduce((s,n)=>Object.assign(s,n&&n.call?n(t.p):n),{}):a,Re(t.target),t.g,t.o,t.k)}let ne,U,W;D.bind({g:1});let N=D.bind({k:1});function Be(e,t,a,s){E.p=t,ne=e,U=a,W=s}function A(e,t){let a=this||{};return function(){let s=arguments;function n(i,o){let d=Object.assign({},i),u=d.className||n.className;a.p=Object.assign({theme:U&&U()},d),a.o=/go\d/.test(u),d.className=D.apply(a,s)+(u?" "+u:"");let c=e;return e[0]&&(c=d.as||e,delete d.as),W&&c[0]&&W(d),ne(c,d)}return n}}var He=e=>typeof e=="function",M=(e,t)=>He(e)?e(t):e,Ke=(()=>{let e=0;return()=>(++e).toString()})(),ie=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),Fe=20,q="default",le=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(o=>o.id===t.toast.id?{...o,...t.toast}:o)};case 2:let{toast:s}=t;return le(e,{type:e.toasts.find(o=>o.id===s.id)?1:0,toast:s});case 3:let{toastId:n}=t;return{...e,toasts:e.toasts.map(o=>o.id===n||n===void 0?{...o,dismissed:!0,visible:!1}:o)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(o=>o.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(o=>({...o,pauseDuration:o.pauseDuration+i}))}}},R=[],de={toasts:[],pausedAt:void 0,settings:{toastLimit:Fe}},_={},ce=(e,t=q)=>{_[t]=le(_[t]||de,e),R.forEach(([a,s])=>{a===t&&s(_[t])})},ue=e=>Object.keys(_).forEach(t=>ce(e,t)),Te=e=>Object.keys(_).find(t=>_[t].toasts.some(a=>a.id===e)),V=(e=q)=>t=>{ce(t,e)},Ue={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},We=(e={},t=q)=>{let[a,s]=l.useState(_[t]||de),n=l.useRef(_[t]);l.useEffect(()=>(n.current!==_[t]&&s(_[t]),R.push([t,s]),()=>{let o=R.findIndex(([d])=>d===t);o>-1&&R.splice(o,1)}),[t]);let i=a.toasts.map(o=>{var d,u,c;return{...e,...e[o.type],...o,removeDelay:o.removeDelay||((d=e[o.type])==null?void 0:d.removeDelay)||(e==null?void 0:e.removeDelay),duration:o.duration||((u=e[o.type])==null?void 0:u.duration)||(e==null?void 0:e.duration)||Ue[o.type],style:{...e.style,...(c=e[o.type])==null?void 0:c.style,...o.style}}});return{...a,toasts:i}},qe=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(a==null?void 0:a.id)||Ke()}),P=e=>(t,a)=>{let s=qe(t,e,a);return V(s.toasterId||Te(s.id))({type:2,toast:s}),s.id},g=(e,t)=>P("blank")(e,t);g.error=P("error");g.success=P("success");g.loading=P("loading");g.custom=P("custom");g.dismiss=(e,t)=>{let a={type:3,toastId:e};t?V(t)(a):ue(a)};g.dismissAll=e=>g.dismiss(void 0,e);g.remove=(e,t)=>{let a={type:4,toastId:e};t?V(t)(a):ue(a)};g.removeAll=e=>g.remove(void 0,e);g.promise=(e,t,a)=>{let s=g.loading(t.loading,{...a,...a==null?void 0:a.loading});return typeof e=="function"&&(e=e()),e.then(n=>{let i=t.success?M(t.success,n):void 0;return i?g.success(i,{id:s,...a,...a==null?void 0:a.success}):g.dismiss(s),n}).catch(n=>{let i=t.error?M(t.error,n):void 0;i?g.error(i,{id:s,...a,...a==null?void 0:a.error}):g.dismiss(s)}),e};var Ze=1e3,Je=(e,t="default")=>{let{toasts:a,pausedAt:s}=We(e,t),n=l.useRef(new Map).current,i=l.useCallback((m,x=Ze)=>{if(n.has(m))return;let f=setTimeout(()=>{n.delete(m),o({type:4,toastId:m})},x);n.set(m,f)},[]);l.useEffect(()=>{if(s)return;let m=Date.now(),x=a.map(f=>{if(f.duration===1/0)return;let $=(f.duration||0)+f.pauseDuration-(m-f.createdAt);if($<0){f.visible&&g.dismiss(f.id);return}return setTimeout(()=>g.dismiss(f.id,t),$)});return()=>{x.forEach(f=>f&&clearTimeout(f))}},[a,s,t]);let o=l.useCallback(V(t),[t]),d=l.useCallback(()=>{o({type:5,time:Date.now()})},[o]),u=l.useCallback((m,x)=>{o({type:1,toast:{id:m,height:x}})},[o]),c=l.useCallback(()=>{s&&o({type:6,time:Date.now()})},[s,o]),h=l.useCallback((m,x)=>{let{reverseOrder:f=!1,gutter:$=8,defaultPosition:S}=x||{},L=a.filter(j=>(j.position||S)===(m.position||S)&&j.height),be=L.findIndex(j=>j.id===m.id),Y=L.filter((j,B)=>B<be&&j.visible).length;return L.filter(j=>j.visible).slice(...f?[Y+1]:[0,Y]).reduce((j,B)=>j+(B.height||0)+$,0)},[a]);return l.useEffect(()=>{a.forEach(m=>{if(m.dismissed)i(m.id,m.removeDelay);else{let x=n.get(m.id);x&&(clearTimeout(x),n.delete(m.id))}})},[a,i]),{toasts:a,handlers:{updateHeight:u,startPause:d,endPause:c,calculateOffset:h}}},Ye=N`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Qe=N`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Xe=N`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Ge=A("div")`
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
    animation: ${Xe} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,et=N`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,tt=A("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${et} 1s linear infinite;
`,at=N`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,rt=N`
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
}`,st=A("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${at} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${rt} 0.2s ease-out forwards;
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
`,ot=A("div")`
  position: absolute;
`,nt=A("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,it=N`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,lt=A("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${it} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,dt=({toast:e})=>{let{icon:t,type:a,iconTheme:s}=e;return t!==void 0?typeof t=="string"?l.createElement(lt,null,t):t:a==="blank"?null:l.createElement(nt,null,l.createElement(tt,{...s}),a!=="loading"&&l.createElement(ot,null,a==="error"?l.createElement(Ge,{...s}):l.createElement(st,{...s})))},ct=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ut=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,mt="0%{opacity:0;} 100%{opacity:1;}",pt="0%{opacity:1;} 100%{opacity:0;}",ht=A("div")`
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
`,xt=A("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,ft=(e,t)=>{let a=e.includes("top")?1:-1,[s,n]=ie()?[mt,pt]:[ct(a),ut(a)];return{animation:t?`${N(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${N(n)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},gt=l.memo(({toast:e,position:t,style:a,children:s})=>{let n=e.height?ft(e.position||t||"top-center",e.visible):{opacity:0},i=l.createElement(dt,{toast:e}),o=l.createElement(xt,{...e.ariaProps},M(e.message,e));return l.createElement(ht,{className:e.className,style:{...n,...a,...e.style}},typeof s=="function"?s({icon:i,message:o}):l.createElement(l.Fragment,null,i,o))});Be(l.createElement);var yt=({id:e,className:t,style:a,onHeightUpdate:s,children:n})=>{let i=l.useCallback(o=>{if(o){let d=()=>{let u=o.getBoundingClientRect().height;s(e,u)};d(),new MutationObserver(d).observe(o,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return l.createElement("div",{ref:i,className:t,style:a},n)},bt=(e,t)=>{let a=e.includes("top"),s=a?{top:0}:{bottom:0},n=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:ie()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...s,...n}},vt=D`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,I=16,jt=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:s,children:n,toasterId:i,containerStyle:o,containerClassName:d})=>{let{toasts:u,handlers:c}=Je(a,i);return l.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:I,left:I,right:I,bottom:I,pointerEvents:"none",...o},className:d,onMouseEnter:c.startPause,onMouseLeave:c.endPause},u.map(h=>{let m=h.position||t,x=c.calculateOffset(h,{reverseOrder:e,gutter:s,defaultPosition:t}),f=bt(m,x);return l.createElement(yt,{id:h.id,key:h.id,onHeightUpdate:c.updateHeight,className:h.visible?vt:"",style:f},h.type==="custom"?M(h.message,h):n?n(h):l.createElement(gt,{toast:h,position:m}))}))},fa=g;const wt="modulepreload",kt=function(e){return"/"+e},G={},v=function(t,a,s){let n=Promise.resolve();if(a&&a.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),d=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));n=Promise.allSettled(a.map(u=>{if(u=kt(u),u in G)return;G[u]=!0;const c=u.endsWith(".css"),h=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${h}`))return;const m=document.createElement("link");if(m.rel=c?"stylesheet":wt,c||(m.as="script"),m.crossOrigin="",m.href=u,d&&m.setAttribute("nonce",d),document.head.appendChild(m),c)return new Promise((x,f)=>{m.addEventListener("load",x),m.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${u}`)))})}))}function i(o){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=o,window.dispatchEvent(d),!d.defaultPrevented)throw o}return n.then(o=>{for(const d of o||[])d.status==="rejected"&&i(d.reason);return t().catch(i)})};function me({size:e="md",text:t="Loading..."}){const a={sm:"h-6 w-6 border-2",md:"h-10 w-10 border-[3px]",lg:"h-16 w-16 border-4"};return r.jsxs("div",{className:"flex flex-col items-center justify-center py-16 animate-fade-in",children:[r.jsxs("div",{className:"relative",children:[r.jsx("div",{className:`${a[e]} animate-spin rounded-full border-dark-600/60 border-t-amber-500`}),r.jsx("div",{className:"absolute inset-0 animate-pulse rounded-full",style:{boxShadow:"0 0 24px rgba(245,158,11,0.15)"}})]}),t&&r.jsx("p",{className:"mt-4 text-dark-400 text-sm tracking-wide",children:t})]})}const _t="/api",p=Ee.create({baseURL:_t,timeout:15e3,headers:{"Content-Type":"application/json"}}),Z=new Map,Nt=3e4;p.interceptors.request.use(e=>{const t=localStorage.getItem("token");return t&&(e.headers.Authorization=`Bearer ${t}`),e});p.interceptors.response.use(e=>{if(e.config.method==="get"&&e.config.cache!==!1){const t=e.config.url+JSON.stringify(e.config.params||{});Z.set(t,{data:e.data,timestamp:Date.now()})}return e},e=>{var t;return((t=e.response)==null?void 0:t.status)===401&&(localStorage.removeItem("token"),window.location.href="/login"),Promise.reject(e)});p.getCached=async(e,t={})=>{const a=e+JSON.stringify(t.params||{}),s=Z.get(a);return s&&Date.now()-s.timestamp<Nt?s.data:(await p.get(e,t)).data};p.clearCache=()=>Z.clear();const H={login:e=>p.post("/auth/login",e).then(t=>t.data),register:e=>p.post("/auth/register",e).then(t=>t.data),getMe:()=>p.get("/auth/me").then(e=>e.data)},ga={getAll:e=>p.getCached("/products",{params:e}),getById:e=>p.getCached(`/products/${e}`),create:e=>(p.clearCache(),p.post("/products",e).then(t=>t.data)),update:(e,t)=>(p.clearCache(),p.put(`/products/${e}`,t).then(a=>a.data)),delete:e=>(p.clearCache(),p.delete(`/products/${e}`).then(t=>t.data))},ya={getStats:()=>p.get("/keys/stats").then(e=>e.data),clearExpired:()=>p.post("/keys/clear-expired").then(e=>e.data),getByProduct:(e,t)=>p.get(`/keys/${e}`,{params:t}).then(a=>a.data),add:e=>(p.clearCache(),p.post("/keys/add",e).then(t=>t.data)),delete:e=>(p.clearCache(),p.delete(`/keys/${e}`).then(t=>t.data))},ba={initiate:e=>p.post("/orders/initiate",e).then(t=>t.data),complete:e=>p.post("/orders/complete",e).then(t=>t.data),release:e=>p.post("/orders/release",e).then(t=>t.data),getMyOrders:()=>p.get("/orders/my").then(e=>e.data),getAll:e=>p.get("/orders",{params:e}).then(t=>t.data)},va={getAll:()=>p.get("/settings").then(e=>e.data),getByKey:e=>p.get(`/settings/${e}`).then(t=>t.data),update:(e,t)=>(p.clearCache(),p.put(`/settings/${e}`,t).then(a=>a.data))},Ct={get:()=>p.getCached("/config")},ja={getSummary:()=>p.get("/analytics/summary").then(e=>e.data),getSalesChart:e=>p.get(`/analytics/sales-chart?days=${e||30}`).then(t=>t.data),getTopMods:e=>p.get(`/analytics/top-mods?limit=${e||10}`).then(t=>t.data)},wa={getAll:()=>p.get("/coupons").then(e=>e.data),create:e=>p.post("/coupons",e).then(t=>t.data),update:(e,t)=>p.put(`/coupons/${e}`,t).then(a=>a.data),delete:e=>p.delete(`/coupons/${e}`).then(t=>t.data),validate:e=>p.post("/coupons/validate",e).then(t=>t.data)};/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pe=(...e)=>e.filter((t,a,s)=>!!t&&t.trim()!==""&&s.indexOf(t)===a).join(" ").trim();/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Et=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const At=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,a,s)=>s?s.toUpperCase():a.toLowerCase());/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee=e=>{const t=At(e);return t.charAt(0).toUpperCase()+t.slice(1)};/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var K={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $t=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1},Ot=l.createContext({}),Lt=()=>l.useContext(Ot),Pt=l.forwardRef(({color:e,size:t,strokeWidth:a,absoluteStrokeWidth:s,className:n="",children:i,iconNode:o,...d},u)=>{const{size:c=24,strokeWidth:h=2,absoluteStrokeWidth:m=!1,color:x="currentColor",className:f=""}=Lt()??{},$=s??m?Number(a??h)*24/Number(t??c):a??h;return l.createElement("svg",{ref:u,...K,width:t??c??K.width,height:t??c??K.height,stroke:e??x,strokeWidth:$,className:pe("lucide",f,n),...!i&&!$t(d)&&{"aria-hidden":"true"},...d},[...o.map(([S,L])=>l.createElement(S,L)),...Array.isArray(i)?i:[i]])});/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=(e,t)=>{const a=l.forwardRef(({className:s,...n},i)=>l.createElement(Pt,{ref:i,iconNode:t,className:pe(`lucide-${Et(ee(e))}`,`lucide-${e}`,s),...n}));return a.displayName=ee(e),a};/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const St=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]],It=b("chart-column",St);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rt=[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}],["path",{d:"M12 11h4",key:"1jrz19"}],["path",{d:"M12 16h4",key:"n85exb"}],["path",{d:"M8 11h.01",key:"1dfujw"}],["path",{d:"M8 16h.01",key:"18s6g9"}]],Mt=b("clipboard-list",Rt);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zt=[["path",{d:"M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",key:"1s6t7t"}],["circle",{cx:"16.5",cy:"7.5",r:".5",fill:"currentColor",key:"w0ekpg"}]],he=b("key-round",zt);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dt=[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]],Vt=b("layout-dashboard",Dt);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bt=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],Ht=b("log-out",Bt);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kt=[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]],Ft=b("menu",Kt);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tt=[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",key:"1a0edw"}],["path",{d:"M12 22V12",key:"d0xqtd"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}]],Ut=b("package",Tt);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wt=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],xe=b("settings",Wt);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qt=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],fe=b("shield-check",qt);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zt=[["path",{d:"M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5",key:"slp6dd"}],["path",{d:"M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244",key:"o0xfot"}],["path",{d:"M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05",key:"wn3emo"}]],Jt=b("store",Zt);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yt=[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",key:"vktsd0"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor",key:"kqv944"}]],Qt=b("tag",Yt);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xt=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],ge=b("x",Xt);function Gt(){const e=je(),[t,a]=l.useState("KeyStore");return l.useEffect(()=>{Ct.get().then(s=>{var n;(n=s==null?void 0:s.data)!=null&&n.siteName&&a(s.data.siteName)}).catch(()=>{})},[]),e.pathname.startsWith("/admin")?null:r.jsxs("header",{className:"relative z-50",children:[r.jsx("div",{className:"max-w-7xl mx-auto px-4 py-4",children:r.jsxs("div",{className:"flex items-center justify-center relative",children:[r.jsxs(F,{to:"/",className:"group flex items-center gap-2 text-xl md:text-2xl font-bold tracking-wide font-display",children:[r.jsx("span",{className:"relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 shadow-gold group-hover:scale-105 transition-transform duration-200",children:r.jsx(he,{className:"w-4 h-4 text-white"})}),r.jsx("span",{className:"bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400",children:t})]}),r.jsxs(F,{to:"/login",className:"absolute right-0 flex items-center gap-1.5 text-gray-500 hover:text-amber-400 transition-colors text-xs md:text-sm group",title:"Admin",children:[r.jsx(xe,{className:"w-4 h-4 md:w-5 md:h-5 group-hover:rotate-90 transition-transform duration-300"}),r.jsx("span",{className:"hidden sm:inline",children:"Admin"})]})]})}),r.jsx("div",{className:"absolute bottom-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"})]})}const ye=l.createContext(null);function ea({children:e}){const[t,a]=l.useState(null),[s,n]=l.useState(!0);l.useEffect(()=>{localStorage.getItem("token")?H.getMe().then(c=>a(c.data)).catch(()=>localStorage.removeItem("token")).finally(()=>n(!1)):n(!1)},[]);const i=l.useCallback(async(u,c)=>{const h=await H.login({email:u,password:c});return localStorage.setItem("token",h.data.token),a(h.data),h.data},[]),o=l.useCallback(async(u,c,h)=>{const m=await H.register({name:u,email:c,password:h});return localStorage.setItem("token",m.data.token),a(m.data),m.data},[]),d=l.useCallback(()=>{localStorage.removeItem("token"),a(null)},[]);return r.jsx(ye.Provider,{value:{user:t,loading:s,login:i,register:o,logout:d},children:e})}const J=()=>{const e=l.useContext(ye);if(!e)throw new Error("useAuth must be used within AuthProvider");return e};function w({children:e,adminOnly:t=!1}){const{user:a,loading:s}=J();return s?r.jsx(me,{text:"Checking authentication..."}):a?t&&a.role!=="admin"?r.jsx(O,{to:"/",replace:!0}):e:r.jsx(O,{to:"/login",replace:!0})}const ta=[{to:"/admin/dashboard",label:"Dashboard",icon:Vt},{to:"/admin/mods",label:"Mods",icon:Ut},{to:"/admin/keys",label:"License Keys",icon:he},{to:"/admin/available-keys",label:"Available Keys",icon:It},{to:"/admin/coupons",label:"Coupons",icon:Qt},{to:"/admin/orders",label:"Orders",icon:Mt},{to:"/admin/settings",label:"Settings",icon:xe}],aa=l.memo(function({open:t,onToggle:a}){const{user:s,logout:n}=J(),i=we();l.useEffect(()=>{const c=()=>a==null?void 0:a(!1);return window.addEventListener("popstate",c),()=>window.removeEventListener("popstate",c)},[a]);const o=()=>{n(),i("/")},d=((s==null?void 0:s.name)||(s==null?void 0:s.email)||"A").split(/[\s@.]+/).filter(Boolean).slice(0,2).map(c=>c[0].toUpperCase()).join(""),u=r.jsxs("div",{className:"flex flex-col h-full",children:[r.jsxs("div",{className:"px-4 py-5 border-b border-[#1e1e2e]/60 flex items-center gap-3",children:[r.jsx("div",{className:"w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 flex items-center justify-center shadow-gold flex-shrink-0",children:r.jsx(fe,{className:"w-5 h-5 text-[#0a0a14]"})}),r.jsxs("div",{className:"min-w-0 flex-1",children:[r.jsx("h2",{className:"text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 font-display leading-tight",children:"Admin Panel"}),r.jsx("p",{className:"text-[10px] text-gray-600 truncate",children:"Online Keys · Dashboard"})]}),r.jsx("button",{onClick:()=>a==null?void 0:a(!1),className:"lg:hidden p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-[#1a1a28] transition-colors flex-shrink-0","aria-label":"Close menu",children:r.jsx(ge,{className:"w-5 h-5"})})]}),r.jsxs("nav",{className:"flex-1 overflow-y-auto px-3 py-4 space-y-1",children:[r.jsx("p",{className:"px-3 pb-2 text-[9px] uppercase tracking-[0.15em] text-gray-700 font-semibold",children:"Menu"}),ta.map(c=>{const h=c.icon;return r.jsx(ke,{to:c.to,end:c.to==="/admin/dashboard",onClick:()=>a==null?void 0:a(!1),className:({isActive:m})=>`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 overflow-hidden ${m?"bg-gradient-to-r from-amber-500/15 to-amber-500/5 text-amber-400 border border-amber-500/20 shadow-sm shadow-amber-500/10":"text-gray-400 hover:bg-[#0a0a14]/60 hover:text-gray-200 border border-transparent"}`,children:({isActive:m})=>r.jsxs(r.Fragment,{children:[m&&r.jsx("span",{className:"absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full bg-gradient-to-b from-amber-400 to-orange-500"}),r.jsx(h,{className:`w-4 h-4 flex-shrink-0 ${m?"text-amber-400":""}`}),r.jsx("span",{children:c.label})]})},c.to)})]}),r.jsxs("div",{className:"px-3 py-4 border-t border-[#1e1e2e]/60 space-y-2",children:[s&&r.jsxs("div",{className:"flex items-center gap-2.5 px-2.5 py-2 rounded-xl bg-[#0a0a14]/50 border border-[#1e1e2e]/50",children:[r.jsx("div",{className:"w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/30 to-orange-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0",children:r.jsx("span",{className:"text-[10px] font-bold text-amber-400",children:d})}),r.jsxs("div",{className:"min-w-0 flex-1",children:[r.jsx("p",{className:"text-[11px] font-medium text-gray-300 truncate",children:s.name||s.email}),r.jsx("p",{className:"text-[9px] text-gray-600 uppercase tracking-wider",children:"Administrator"})]})]}),r.jsxs("button",{onClick:o,className:"flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-[13px] font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 border border-transparent hover:border-red-500/20 transition-all duration-200",children:[r.jsx(Ht,{className:"w-4 h-4 flex-shrink-0"}),r.jsx("span",{children:"Logout"})]})]})]});return r.jsxs(r.Fragment,{children:[t&&r.jsx("div",{className:"fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden",onClick:()=>a==null?void 0:a(!1)}),r.jsx("aside",{className:`
          fixed lg:static inset-y-0 left-0 z-50 w-64 flex-shrink-0
          bg-[#0d0d1a]/95 backdrop-blur-xl border-r border-[#1e1e2e]/60
          transition-transform duration-300 ease-in-out
          ${t?"translate-x-0":"-translate-x-full lg:translate-x-0"}
        `,children:u})]})}),ra=l.memo(function({open:t,onToggle:a}){const{user:s}=J();return r.jsx("header",{className:"fixed top-0 left-0 right-0 z-30 lg:hidden bg-[#0d0d1a]/95 backdrop-blur-xl border-b border-[#1e1e2e]/60",children:r.jsxs("div",{className:"flex items-center gap-3 h-14 px-3",children:[r.jsx("button",{onClick:a,className:"p-2 rounded-xl border border-[#1e1e2e]/80 bg-[#0a0a14]/60 text-amber-400 hover:text-amber-300 active:scale-95 transition-all flex-shrink-0","aria-label":t?"Close menu":"Open menu",children:t?r.jsx(ge,{className:"w-5 h-5"}):r.jsx(Ft,{className:"w-5 h-5"})}),r.jsxs("div",{className:"flex items-center gap-2 min-w-0 flex-1",children:[r.jsx("div",{className:"w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-gold-sm",children:r.jsx(fe,{className:"w-4 h-4 text-[#0a0a14]"})}),r.jsxs("div",{className:"min-w-0",children:[r.jsx("p",{className:"text-sm font-bold text-white font-display leading-tight truncate",children:"Admin Panel"}),r.jsx("p",{className:"text-[9px] text-gray-600 truncate",children:(s==null?void 0:s.name)||"Online Keys · Dashboard"})]})]}),r.jsxs(F,{to:"/",className:"flex items-center gap-1.5 text-[10px] font-medium text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 px-2.5 py-1.5 rounded-lg transition-all shrink-0",children:[r.jsx(Jt,{className:"w-3 h-3"})," Store"]})]})})}),sa=l.lazy(()=>v(()=>import("./Home-nAI7Skqh.js"),__vite__mapDeps([0,1,2,3,4,5]))),oa=l.lazy(()=>v(()=>import("./Login-BhhnSzm8.js"),__vite__mapDeps([6,1,4,2]))),na=l.lazy(()=>v(()=>import("./NotFound-B2ZJk7AX.js"),__vite__mapDeps([7,1,2]))),te=l.lazy(()=>v(()=>import("./Dashboard-BkOpcYcF.js"),__vite__mapDeps([8,1,9,2]))),ia=l.lazy(()=>v(()=>import("./ManageMods-DeUe5GQx.js"),__vite__mapDeps([10,1,11,12,2]))),ae=l.lazy(()=>v(()=>import("./AddMod-C5_sXVPW.js"),__vite__mapDeps([13,1,11,2]))),la=l.lazy(()=>v(()=>import("./AdminKeys-BHSG1xgJ.js"),__vite__mapDeps([14,1,15,11,12,2]))),da=l.lazy(()=>v(()=>import("./AvailableKeys-DNKoRa1C.js"),__vite__mapDeps([16,1,5,15,2]))),ca=l.lazy(()=>v(()=>import("./CouponsPage-BJVTOi0z.js"),__vite__mapDeps([17,1,11,3,9,12,2]))),ua=l.lazy(()=>v(()=>import("./OrdersList-B6D0T2tF.js"),__vite__mapDeps([18,1,2]))),ma=l.lazy(()=>v(()=>import("./SettingsPage-DAsREHhf.js"),__vite__mapDeps([19,1,2])));function k({children:e}){const[t,a]=l.useState(!1);return r.jsxs("div",{className:"flex min-h-screen",children:[r.jsx(ra,{open:t,onToggle:()=>a(!t)}),r.jsx(aa,{open:t,onToggle:a}),r.jsx("div",{className:"flex-1 min-h-screen overflow-auto pt-14 lg:pt-0",children:r.jsx("div",{className:"p-4 md:p-6 lg:p-8 max-w-6xl mx-auto",children:e})})]})}function pa(){return r.jsxs("div",{className:"min-h-screen",children:[r.jsx(Gt,{}),r.jsx("main",{children:r.jsx(l.Suspense,{fallback:r.jsx(me,{text:"Loading..."}),children:r.jsxs(_e,{children:[r.jsx(y,{path:"/",element:r.jsx(sa,{})}),r.jsx(y,{path:"/login",element:r.jsx(oa,{})}),r.jsx(y,{path:"/mods",element:r.jsx(O,{to:"/",replace:!0})}),r.jsx(y,{path:"/mods/:id",element:r.jsx(O,{to:"/",replace:!0})}),r.jsx(y,{path:"/products",element:r.jsx(O,{to:"/",replace:!0})}),r.jsx(y,{path:"/products/:id",element:r.jsx(O,{to:"/",replace:!0})}),r.jsx(y,{path:"/admin",element:r.jsx(w,{adminOnly:!0,children:r.jsx(k,{children:r.jsx(te,{})})})}),r.jsx(y,{path:"/admin/dashboard",element:r.jsx(w,{adminOnly:!0,children:r.jsx(k,{children:r.jsx(te,{})})})}),r.jsx(y,{path:"/admin/mods",element:r.jsx(w,{adminOnly:!0,children:r.jsx(k,{children:r.jsx(ia,{})})})}),r.jsx(y,{path:"/admin/mods/add",element:r.jsx(w,{adminOnly:!0,children:r.jsx(k,{children:r.jsx(ae,{})})})}),r.jsx(y,{path:"/admin/mods/:id",element:r.jsx(w,{adminOnly:!0,children:r.jsx(k,{children:r.jsx(ae,{})})})}),r.jsx(y,{path:"/admin/keys",element:r.jsx(w,{adminOnly:!0,children:r.jsx(k,{children:r.jsx(la,{})})})}),r.jsx(y,{path:"/admin/available-keys",element:r.jsx(w,{adminOnly:!0,children:r.jsx(k,{children:r.jsx(da,{})})})}),r.jsx(y,{path:"/admin/coupons",element:r.jsx(w,{adminOnly:!0,children:r.jsx(k,{children:r.jsx(ca,{})})})}),r.jsx(y,{path:"/admin/orders",element:r.jsx(w,{adminOnly:!0,children:r.jsx(k,{children:r.jsx(ua,{})})})}),r.jsx(y,{path:"/admin/settings",element:r.jsx(w,{adminOnly:!0,children:r.jsx(k,{children:r.jsx(ma,{})})})}),r.jsx(y,{path:"*",element:r.jsx(na,{})})]})})})]})}T.createRoot(document.getElementById("root")).render(r.jsx(Ne.StrictMode,{children:r.jsx(Ce,{children:r.jsxs(ea,{children:[r.jsx(pa,{}),r.jsx(jt,{position:"top-right",toastOptions:{duration:3e3,style:{background:"#1e293b",color:"#f8fafc",border:"1px solid #334155"}}})]})})}));export{It as C,he as K,me as L,Ut as P,fe as S,Qt as T,ge as X,wa as a,ja as b,b as c,Mt as d,r as j,ya as k,ba as o,ga as p,va as s,J as u,fa as z};
