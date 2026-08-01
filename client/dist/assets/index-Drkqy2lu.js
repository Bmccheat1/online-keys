const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Home-D9D7JK_H.js","assets/vendor-CG8VVLXi.js","assets/SiteFooter-Ca0eqenB.js","assets/zap-hX17fHqz.js","assets/clock-DSLH7ddj.js","assets/utils-DhXgJQ-f.js","assets/ProductPage-BntCD6FY.js","assets/sparkles-EpN0xXUw.js","assets/percent-CT_Pp0Lz.js","assets/Login-DdWVfMMS.js","assets/NotFound-ChXG_BTH.js","assets/Dashboard-DBANGd0Q.js","assets/dollar-sign-BIAMsSLW.js","assets/ManageMods-B1ytnmZE.js","assets/trash-2-l1NfkU2Q.js","assets/AddMod-CW0x55kA.js","assets/AdminKeys-Bx1cFX2C.js","assets/chevron-down-DfcIInpU.js","assets/AvailableKeys-DdRBFVPx.js","assets/CouponsPage-Dld_UNO4.js","assets/OrdersList-DxsdIDZY.js","assets/SettingsPage-BsEHL8vZ.js"])))=>i.map(i=>d[i]);
import{r as l,a as Ne,u as ie,b as le,L as z,N as I,c as _e,R as Ce,d as y,e as Ee,B as Ae}from"./vendor-CG8VVLXi.js";import{a as Se}from"./utils-DhXgJQ-f.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function r(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=r(o);fetch(o.href,i)}})();var de={exports:{}},B={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Pe=l,Le=Symbol.for("react.element"),$e=Symbol.for("react.fragment"),Oe=Object.prototype.hasOwnProperty,Ie=Pe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Me={key:!0,ref:!0,__self:!0,__source:!0};function ce(e,t,r){var s,o={},i=null,n=null;r!==void 0&&(i=""+r),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(n=t.ref);for(s in t)Oe.call(t,s)&&!Me.hasOwnProperty(s)&&(o[s]=t[s]);if(e&&e.defaultProps)for(s in t=e.defaultProps,t)o[s]===void 0&&(o[s]=t[s]);return{$$typeof:Le,type:e,key:i,ref:n,props:o,_owner:Ie.current}}B.Fragment=$e;B.jsx=ce;B.jsxs=ce;de.exports=B;var a=de.exports,Z={},te=Ne;Z.createRoot=te.createRoot,Z.hydrateRoot=te.hydrateRoot;let Re={data:""},De=e=>{if(typeof window=="object"){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||Re},ze=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,Te=/\/\*[^]*?\*\/|  +/g,ae=/\n+/g,$=(e,t)=>{let r="",s="",o="";for(let i in e){let n=e[i];i[0]=="@"?i[1]=="i"?r=i+" "+n+";":s+=i[1]=="f"?$(n,i):i+"{"+$(n,i[1]=="k"?"":t)+"}":typeof n=="object"?s+=$(n,t?t.replace(/([^,])+/g,u=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,d=>/&/.test(d)?d.replace(/&/g,u):u?u+" "+d:d)):i):n!=null&&(i=i[1]=="-"?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=$.p?$.p(i,n):i+":"+n+";")}return r+(t&&o?t+"{"+o+"}":o)+s},L={},ue=e=>{if(typeof e=="object"){let t="";for(let r in e)t+=r+ue(e[r]);return t}return e},Ve=(e,t,r,s,o)=>{let i=ue(e),n=L[i]||(L[i]=(d=>{let c=0,m=11;for(;c<d.length;)m=101*m+d.charCodeAt(c++)>>>0;return"go"+m})(i));if(!L[n]){let d=i!==e?e:(c=>{let m,h,f=[{}];for(;m=ze.exec(c.replace(Te,""));)m[4]?f.shift():m[3]?(h=m[3].replace(ae," ").trim(),f.unshift(f[0][h]=f[0][h]||{})):f[0][m[1]]=m[2].replace(ae," ").trim();return f[0]})(e);L[n]=$(o?{["@keyframes "+n]:d}:d,r?"":"."+n)}let u=r&&L.g;return r&&(L.g=L[n]),((d,c,m,h)=>{h?c.data=c.data.replace(h,d):c.data.indexOf(d)===-1&&(c.data=m?d+c.data:c.data+d)})(L[n],t,s,u),n},Be=(e,t,r)=>e.reduce((s,o,i)=>{let n=t[i];if(n&&n.call){let u=n(r),d=u&&u.props&&u.props.className||/^go/.test(u)&&u;n=d?"."+d:u&&typeof u=="object"?u.props?"":$(u,""):u===!1?"":u}return s+o+(n??"")},"");function K(e){let t=this||{},r=e.call?e(t.p):e;return Ve(r.unshift?r.raw?Be(r,[].slice.call(arguments,1),t.p):r.reduce((s,o)=>Object.assign(s,o&&o.call?o(t.p):o),{}):r,De(t.target),t.g,t.o,t.k)}let me,J,Y;K.bind({g:1});let A=K.bind({k:1});function Ke(e,t,r,s){$.p=t,me=e,J=r,Y=s}function O(e,t){let r=this||{};return function(){let s=arguments;function o(i,n){let u=Object.assign({},i),d=u.className||o.className;r.p=Object.assign({theme:J&&J()},u),r.o=/go\d/.test(d),u.className=K.apply(r,s)+(d?" "+d:"");let c=e;return e[0]&&(c=u.as||e,delete u.as),Y&&c[0]&&Y(u),me(c,u)}return o}}var Fe=e=>typeof e=="function",V=(e,t)=>Fe(e)?e(t):e,He=(()=>{let e=0;return()=>(++e).toString()})(),he=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),Ue=20,Q="default",pe=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(n=>n.id===t.toast.id?{...n,...t.toast}:n)};case 2:let{toast:s}=t;return pe(e,{type:e.toasts.find(n=>n.id===s.id)?1:0,toast:s});case 3:let{toastId:o}=t;return{...e,toasts:e.toasts.map(n=>n.id===o||o===void 0?{...n,dismissed:!0,visible:!1}:n)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(n=>n.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(n=>({...n,pauseDuration:n.pauseDuration+i}))}}},T=[],xe={toasts:[],pausedAt:void 0,settings:{toastLimit:Ue}},C={},fe=(e,t=Q)=>{C[t]=pe(C[t]||xe,e),T.forEach(([r,s])=>{r===t&&s(C[t])})},ge=e=>Object.keys(C).forEach(t=>fe(e,t)),qe=e=>Object.keys(C).find(t=>C[t].toasts.some(r=>r.id===e)),F=(e=Q)=>t=>{fe(t,e)},We={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},Xe=(e={},t=Q)=>{let[r,s]=l.useState(C[t]||xe),o=l.useRef(C[t]);l.useEffect(()=>(o.current!==C[t]&&s(C[t]),T.push([t,s]),()=>{let n=T.findIndex(([u])=>u===t);n>-1&&T.splice(n,1)}),[t]);let i=r.toasts.map(n=>{var u,d,c;return{...e,...e[n.type],...n,removeDelay:n.removeDelay||((u=e[n.type])==null?void 0:u.removeDelay)||(e==null?void 0:e.removeDelay),duration:n.duration||((d=e[n.type])==null?void 0:d.duration)||(e==null?void 0:e.duration)||We[n.type],style:{...e.style,...(c=e[n.type])==null?void 0:c.style,...n.style}}});return{...r,toasts:i}},Ze=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(r==null?void 0:r.id)||He()}),R=e=>(t,r)=>{let s=Ze(t,e,r);return F(s.toasterId||qe(s.id))({type:2,toast:s}),s.id},b=(e,t)=>R("blank")(e,t);b.error=R("error");b.success=R("success");b.loading=R("loading");b.custom=R("custom");b.dismiss=(e,t)=>{let r={type:3,toastId:e};t?F(t)(r):ge(r)};b.dismissAll=e=>b.dismiss(void 0,e);b.remove=(e,t)=>{let r={type:4,toastId:e};t?F(t)(r):ge(r)};b.removeAll=e=>b.remove(void 0,e);b.promise=(e,t,r)=>{let s=b.loading(t.loading,{...r,...r==null?void 0:r.loading});return typeof e=="function"&&(e=e()),e.then(o=>{let i=t.success?V(t.success,o):void 0;return i?b.success(i,{id:s,...r,...r==null?void 0:r.success}):b.dismiss(s),o}).catch(o=>{let i=t.error?V(t.error,o):void 0;i?b.error(i,{id:s,...r,...r==null?void 0:r.error}):b.dismiss(s)}),e};var Je=1e3,Ye=(e,t="default")=>{let{toasts:r,pausedAt:s}=Xe(e,t),o=l.useRef(new Map).current,i=l.useCallback((h,f=Je)=>{if(o.has(h))return;let x=setTimeout(()=>{o.delete(h),n({type:4,toastId:h})},f);o.set(h,x)},[]);l.useEffect(()=>{if(s)return;let h=Date.now(),f=r.map(x=>{if(x.duration===1/0)return;let g=(x.duration||0)+x.pauseDuration-(h-x.createdAt);if(g<0){x.visible&&b.dismiss(x.id);return}return setTimeout(()=>b.dismiss(x.id,t),g)});return()=>{f.forEach(x=>x&&clearTimeout(x))}},[r,s,t]);let n=l.useCallback(F(t),[t]),u=l.useCallback(()=>{n({type:5,time:Date.now()})},[n]),d=l.useCallback((h,f)=>{n({type:1,toast:{id:h,height:f}})},[n]),c=l.useCallback(()=>{s&&n({type:6,time:Date.now()})},[s,n]),m=l.useCallback((h,f)=>{let{reverseOrder:x=!1,gutter:g=8,defaultPosition:w}=f||{},E=r.filter(j=>(j.position||w)===(h.position||w)&&j.height),S=E.findIndex(j=>j.id===h.id),P=E.filter((j,q)=>q<S&&j.visible).length;return E.filter(j=>j.visible).slice(...x?[P+1]:[0,P]).reduce((j,q)=>j+(q.height||0)+g,0)},[r]);return l.useEffect(()=>{r.forEach(h=>{if(h.dismissed)i(h.id,h.removeDelay);else{let f=o.get(h.id);f&&(clearTimeout(f),o.delete(h.id))}})},[r,i]),{toasts:r,handlers:{updateHeight:d,startPause:u,endPause:c,calculateOffset:m}}},Qe=A`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Ge=A`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,et=A`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,tt=O("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Qe} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Ge} 0.15s ease-out forwards;
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
    animation: ${et} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,at=A`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,rt=O("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${at} 1s linear infinite;
`,st=A`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,nt=A`
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
}`,ot=O("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${st} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${nt} 0.2s ease-out forwards;
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
`,it=O("div")`
  position: absolute;
`,lt=O("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,dt=A`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ct=O("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${dt} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ut=({toast:e})=>{let{icon:t,type:r,iconTheme:s}=e;return t!==void 0?typeof t=="string"?l.createElement(ct,null,t):t:r==="blank"?null:l.createElement(lt,null,l.createElement(rt,{...s}),r!=="loading"&&l.createElement(it,null,r==="error"?l.createElement(tt,{...s}):l.createElement(ot,{...s})))},mt=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ht=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,pt="0%{opacity:0;} 100%{opacity:1;}",xt="0%{opacity:1;} 100%{opacity:0;}",ft=O("div")`
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
`,gt=O("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,bt=(e,t)=>{let r=e.includes("top")?1:-1,[s,o]=he()?[pt,xt]:[mt(r),ht(r)];return{animation:t?`${A(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${A(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},yt=l.memo(({toast:e,position:t,style:r,children:s})=>{let o=e.height?bt(e.position||t||"top-center",e.visible):{opacity:0},i=l.createElement(ut,{toast:e}),n=l.createElement(gt,{...e.ariaProps},V(e.message,e));return l.createElement(ft,{className:e.className,style:{...o,...r,...e.style}},typeof s=="function"?s({icon:i,message:n}):l.createElement(l.Fragment,null,i,n))});Ke(l.createElement);var vt=({id:e,className:t,style:r,onHeightUpdate:s,children:o})=>{let i=l.useCallback(n=>{if(n){let u=()=>{let d=n.getBoundingClientRect().height;s(e,d)};u(),new MutationObserver(u).observe(n,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return l.createElement("div",{ref:i,className:t,style:r},o)},jt=(e,t)=>{let r=e.includes("top"),s=r?{top:0}:{bottom:0},o=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:he()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...s,...o}},wt=K`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,D=16,kt=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:s,children:o,toasterId:i,containerStyle:n,containerClassName:u})=>{let{toasts:d,handlers:c}=Ye(r,i);return l.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:D,left:D,right:D,bottom:D,pointerEvents:"none",...n},className:u,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(m=>{let h=m.position||t,f=c.calculateOffset(m,{reverseOrder:e,gutter:s,defaultPosition:t}),x=jt(h,f);return l.createElement(vt,{id:m.id,key:m.id,onHeightUpdate:c.updateHeight,className:m.visible?wt:"",style:x},m.type==="custom"?V(m.message,m):o?o(m):l.createElement(yt,{toast:m,position:h}))}))},Pa=b;const Nt="modulepreload",_t=function(e){return"/"+e},re={},k=function(t,r,s){let o=Promise.resolve();if(r&&r.length>0){document.getElementsByTagName("link");const n=document.querySelector("meta[property=csp-nonce]"),u=(n==null?void 0:n.nonce)||(n==null?void 0:n.getAttribute("nonce"));o=Promise.allSettled(r.map(d=>{if(d=_t(d),d in re)return;re[d]=!0;const c=d.endsWith(".css"),m=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${m}`))return;const h=document.createElement("link");if(h.rel=c?"stylesheet":Nt,c||(h.as="script"),h.crossOrigin="",h.href=d,u&&h.setAttribute("nonce",u),document.head.appendChild(h),c)return new Promise((f,x)=>{h.addEventListener("load",f),h.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${d}`)))})}))}function i(n){const u=new Event("vite:preloadError",{cancelable:!0});if(u.payload=n,window.dispatchEvent(u),!u.defaultPrevented)throw n}return o.then(n=>{for(const u of n||[])u.status==="rejected"&&i(u.reason);return t().catch(i)})};function be({size:e="md",text:t="Loading..."}){const r={sm:"h-6 w-6 border-2",md:"h-10 w-10 border-[3px]",lg:"h-16 w-16 border-4"};return a.jsxs("div",{className:"flex flex-col items-center justify-center py-16 animate-fade-in",children:[a.jsxs("div",{className:"relative",children:[a.jsx("div",{className:`${r[e]} animate-spin rounded-full border-dark-600/60 border-t-amber-500`}),a.jsx("div",{className:"absolute inset-0 animate-pulse rounded-full",style:{boxShadow:"0 0 24px rgba(245,158,11,0.15)"}})]}),t&&a.jsx("p",{className:"mt-4 text-dark-400 text-sm tracking-wide",children:t})]})}const Ct="/api",p=Se.create({baseURL:Ct,timeout:15e3,headers:{"Content-Type":"application/json"}}),G=new Map,Et=3e4;p.interceptors.request.use(e=>{const t=localStorage.getItem("token");return t&&(e.headers.Authorization=`Bearer ${t}`),e});p.interceptors.response.use(e=>{if(e.config.method==="get"&&e.config.cache!==!1){const t=e.config.url+JSON.stringify(e.config.params||{});G.set(t,{data:e.data,timestamp:Date.now()})}return e},e=>{var t;return((t=e.response)==null?void 0:t.status)===401&&(localStorage.removeItem("token"),window.location.href="/login"),Promise.reject(e)});p.getCached=async(e,t={})=>{const r=e+JSON.stringify(t.params||{}),s=G.get(r);return s&&Date.now()-s.timestamp<Et?s.data:(await p.get(e,t)).data};p.clearCache=()=>G.clear();const W={login:e=>p.post("/auth/login",e).then(t=>t.data),register:e=>p.post("/auth/register",e).then(t=>t.data),getMe:()=>p.get("/auth/me").then(e=>e.data)},ye={getAll:e=>p.getCached("/products",{params:e}),getById:e=>p.getCached(`/products/${e}`),create:e=>(p.clearCache(),p.post("/products",e).then(t=>t.data)),update:(e,t)=>(p.clearCache(),p.put(`/products/${e}`,t).then(r=>r.data)),delete:e=>(p.clearCache(),p.delete(`/products/${e}`).then(t=>t.data))},La={getStats:()=>p.get("/keys/stats").then(e=>e.data),clearExpired:()=>p.post("/keys/clear-expired").then(e=>e.data),getByProduct:(e,t)=>p.get(`/keys/${e}`,{params:t}).then(r=>r.data),add:e=>(p.clearCache(),p.post("/keys/add",e).then(t=>t.data)),delete:e=>(p.clearCache(),p.delete(`/keys/${e}`).then(t=>t.data))},$a={initiate:e=>p.post("/orders/initiate",e).then(t=>t.data),complete:e=>p.post("/orders/complete",e).then(t=>t.data),release:e=>p.post("/orders/release",e).then(t=>t.data),getMyOrders:()=>p.get("/orders/my").then(e=>e.data),getAll:e=>p.get("/orders",{params:e}).then(t=>t.data)},Oa={getAll:()=>p.get("/settings").then(e=>e.data),getByKey:e=>p.get(`/settings/${e}`).then(t=>t.data),update:(e,t)=>(p.clearCache(),p.put(`/settings/${e}`,t).then(r=>r.data))},Ia={getSummary:()=>p.get("/analytics/summary").then(e=>e.data),getSalesChart:e=>p.get(`/analytics/sales-chart?days=${e||30}`).then(t=>t.data),getTopMods:e=>p.get(`/analytics/top-mods?limit=${e||10}`).then(t=>t.data)},Ma={getAll:()=>p.get("/coupons").then(e=>e.data),create:e=>p.post("/coupons",e).then(t=>t.data),update:(e,t)=>p.put(`/coupons/${e}`,t).then(r=>r.data),delete:e=>p.delete(`/coupons/${e}`).then(t=>t.data),validate:e=>p.post("/coupons/validate",e).then(t=>t.data)},ve=l.createContext(null);function At({children:e}){const[t,r]=l.useState(null),[s,o]=l.useState(!0);l.useEffect(()=>{localStorage.getItem("token")?W.getMe().then(c=>r(c.data)).catch(()=>localStorage.removeItem("token")).finally(()=>o(!1)):o(!1)},[]);const i=l.useCallback(async(d,c)=>{const m=await W.login({email:d,password:c});return localStorage.setItem("token",m.data.token),r(m.data),m.data},[]),n=l.useCallback(async(d,c,m)=>{const h=await W.register({name:d,email:c,password:m});return localStorage.setItem("token",h.data.token),r(h.data),h.data},[]),u=l.useCallback(()=>{localStorage.removeItem("token"),r(null)},[]);return a.jsx(ve.Provider,{value:{user:t,loading:s,login:i,register:n,logout:u},children:e})}const H=()=>{const e=l.useContext(ve);if(!e)throw new Error("useAuth must be used within AuthProvider");return e};/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const je=(...e)=>e.filter((t,r,s)=>!!t&&t.trim()!==""&&s.indexOf(t)===r).join(" ").trim();/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const St=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pt=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,r,s)=>s?s.toUpperCase():r.toLowerCase());/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const se=e=>{const t=Pt(e);return t.charAt(0).toUpperCase()+t.slice(1)};/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var X={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lt=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1},$t=l.createContext({}),Ot=()=>l.useContext($t),It=l.forwardRef(({color:e,size:t,strokeWidth:r,absoluteStrokeWidth:s,className:o="",children:i,iconNode:n,...u},d)=>{const{size:c=24,strokeWidth:m=2,absoluteStrokeWidth:h=!1,color:f="currentColor",className:x=""}=Ot()??{},g=s??h?Number(r??m)*24/Number(t??c):r??m;return l.createElement("svg",{ref:d,...X,width:t??c??X.width,height:t??c??X.height,stroke:e??f,strokeWidth:g,className:je("lucide",x,o),...!i&&!Lt(u)&&{"aria-hidden":"true"},...u},[...n.map(([w,E])=>l.createElement(w,E)),...Array.isArray(i)?i:[i]])});/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=(e,t)=>{const r=l.forwardRef(({className:s,...o},i)=>l.createElement(It,{ref:i,iconNode:t,className:je(`lucide-${St(se(e))}`,`lucide-${e}`,s),...o}));return r.displayName=se(e),r};/**
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
 */const Bt=[["path",{d:"M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",key:"1s6t7t"}],["circle",{cx:"16.5",cy:"7.5",r:".5",fill:"currentColor",key:"w0ekpg"}]],ee=v("key-round",Bt);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kt=[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]],we=v("layout-dashboard",Kt);/**
 * @license lucide-react v1.26.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ft=[["path",{d:"m10 17 5-5-5-5",key:"1bsop3"}],["path",{d:"M15 12H3",key:"6jk70r"}],["path",{d:"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",key:"u53s6r"}]],Ht=v("log-in",Ft);/**
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
 */const ta=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],ke=v("shield-check",ta);/**
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
 */const oa=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],U=v("x",oa);function ia(){const e=ie(),t=le(),{user:r}=H(),s=new URLSearchParams(e.search).get("q")||"",[o,i]=l.useState(s),[n,u]=l.useState(!1),[d,c]=l.useState([]),[m,h]=l.useState("Search mods...");if(l.useEffect(()=>{i(s)},[s]),l.useEffect(()=>{ye.getAll({active:"true",limit:"50"}).then(x=>{const g=(x.data||[]).map(w=>w.title).filter(Boolean).slice(0,10);c(g)}).catch(()=>{})},[]),l.useEffect(()=>{const x=d;if(!x.length){h("Search mods...");return}let g=0,w=0,E=!1,S;const P=()=>{const j=x[g%x.length];if(E){if(w--,h(j.slice(0,w)),w===0){E=!1,g++,S=setTimeout(P,500);return}S=setTimeout(P,40)}else{if(w++,h(j.slice(0,w)),w===j.length){E=!0,S=setTimeout(P,1800);return}S=setTimeout(P,110)}};return S=setTimeout(P,900),()=>clearTimeout(S)},[d]),e.pathname.startsWith("/admin"))return null;const f=x=>{x.preventDefault();const g=o.trim();t(g?`/?q=${encodeURIComponent(g)}`:"/")};return a.jsx("header",{className:"sticky top-0 z-50 bg-[#080812]/85 backdrop-blur-xl border-b border-[#1e1e2e]/50",children:a.jsx("div",{className:"max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3",children:a.jsxs("div",{className:"flex items-center gap-2 sm:gap-4",children:[a.jsx(z,{to:"/",className:"flex-shrink-0 group",title:"KeyStore",children:a.jsx("span",{className:"flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 shadow-gold group-hover:scale-105 transition-transform duration-200",children:a.jsx(ee,{className:"w-4 h-4 sm:w-5 sm:h-5 text-white"})})}),a.jsxs("form",{onSubmit:f,className:"flex-1 min-w-0 max-w-xl mx-auto relative",children:[a.jsx(Qt,{className:"absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600"}),a.jsx("input",{type:"text",value:o,onChange:x=>i(x.target.value),onFocus:()=>u(!0),onBlur:()=>u(!1),placeholder:!n&&!o?m:"Search mods...",className:"w-full bg-[#0d0d1a]/80 border border-[#1e1e2e]/60 rounded-xl pl-9 pr-8 py-2 sm:py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/40 transition-all"}),o&&a.jsx("button",{type:"button",onClick:()=>{i(""),t("/")},className:"absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300 transition-colors","aria-label":"Clear search",children:a.jsx(U,{className:"w-3.5 h-3.5"})})]}),r?a.jsxs(z,{to:"/admin/dashboard",className:"flex-shrink-0 inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg transition-all",children:[a.jsx(we,{className:"w-3.5 h-3.5 sm:w-4 sm:h-4"}),a.jsx("span",{className:"hidden sm:inline",children:"Admin"})]}):a.jsxs(z,{to:"/login",className:"flex-shrink-0 inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg transition-all",children:[a.jsx(Ht,{className:"w-3.5 h-3.5 sm:w-4 sm:h-4"}),a.jsx("span",{className:"hidden sm:inline",children:"Login"})]})]})})})}function N({children:e,adminOnly:t=!1}){const{user:r,loading:s}=H();return s?a.jsx(be,{text:"Checking authentication..."}):r?t&&r.role!=="admin"?a.jsx(I,{to:"/",replace:!0}):e:a.jsx(I,{to:"/login",replace:!0})}const la=[{to:"/admin/dashboard",label:"Dashboard",icon:we},{to:"/admin/mods",label:"Mods",icon:Jt},{to:"/admin/keys",label:"License Keys",icon:ee},{to:"/admin/available-keys",label:"Available Keys",icon:zt},{to:"/admin/coupons",label:"Coupons",icon:na},{to:"/admin/orders",label:"Orders",icon:Vt},{to:"/admin/settings",label:"Settings",icon:ea}],da=l.memo(function({open:t,onToggle:r}){const{user:s,logout:o}=H(),i=le();l.useEffect(()=>{const c=()=>r==null?void 0:r(!1);return window.addEventListener("popstate",c),()=>window.removeEventListener("popstate",c)},[r]);const n=()=>{o(),i("/")},u=((s==null?void 0:s.name)||(s==null?void 0:s.email)||"A").split(/[\s@.]+/).filter(Boolean).slice(0,2).map(c=>c[0].toUpperCase()).join(""),d=a.jsxs("div",{className:"flex flex-col h-full",children:[a.jsxs("div",{className:"px-4 py-5 border-b border-[#1e1e2e]/60 flex items-center gap-3",children:[a.jsx("div",{className:"w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 flex items-center justify-center shadow-gold flex-shrink-0",children:a.jsx(ke,{className:"w-5 h-5 text-[#0a0a14]"})}),a.jsxs("div",{className:"min-w-0 flex-1",children:[a.jsx("h2",{className:"text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 font-display leading-tight",children:"Admin Panel"}),a.jsx("p",{className:"text-[10px] text-gray-600 truncate",children:"Online Keys · Dashboard"})]}),a.jsx("button",{onClick:()=>r==null?void 0:r(!1),className:"lg:hidden p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-[#1a1a28] transition-colors flex-shrink-0","aria-label":"Close menu",children:a.jsx(U,{className:"w-5 h-5"})})]}),a.jsxs("nav",{className:"flex-1 overflow-y-auto px-3 py-4 space-y-1",children:[a.jsx("p",{className:"px-3 pb-2 text-[9px] uppercase tracking-[0.15em] text-gray-700 font-semibold",children:"Menu"}),la.map(c=>{const m=c.icon;return a.jsx(_e,{to:c.to,end:c.to==="/admin/dashboard",onClick:()=>r==null?void 0:r(!1),className:({isActive:h})=>`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 overflow-hidden ${h?"bg-gradient-to-r from-amber-500/15 to-amber-500/5 text-amber-400 border border-amber-500/20 shadow-sm shadow-amber-500/10":"text-gray-400 hover:bg-[#0a0a14]/60 hover:text-gray-200 border border-transparent"}`,children:({isActive:h})=>a.jsxs(a.Fragment,{children:[h&&a.jsx("span",{className:"absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full bg-gradient-to-b from-amber-400 to-orange-500"}),a.jsx(m,{className:`w-4 h-4 flex-shrink-0 ${h?"text-amber-400":""}`}),a.jsx("span",{children:c.label})]})},c.to)})]}),a.jsxs("div",{className:"px-3 py-4 border-t border-[#1e1e2e]/60 space-y-2",children:[s&&a.jsxs("div",{className:"flex items-center gap-2.5 px-2.5 py-2 rounded-xl bg-[#0a0a14]/50 border border-[#1e1e2e]/50",children:[a.jsx("div",{className:"w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/30 to-orange-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0",children:a.jsx("span",{className:"text-[10px] font-bold text-amber-400",children:u})}),a.jsxs("div",{className:"min-w-0 flex-1",children:[a.jsx("p",{className:"text-[11px] font-medium text-gray-300 truncate",children:s.name||s.email}),a.jsx("p",{className:"text-[9px] text-gray-600 uppercase tracking-wider",children:"Administrator"})]})]}),a.jsxs("button",{onClick:n,className:"flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-[13px] font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 border border-transparent hover:border-red-500/20 transition-all duration-200",children:[a.jsx(qt,{className:"w-4 h-4 flex-shrink-0"}),a.jsx("span",{children:"Logout"})]})]})]});return a.jsxs(a.Fragment,{children:[t&&a.jsx("div",{className:"fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden",onClick:()=>r==null?void 0:r(!1)}),a.jsx("aside",{className:`
          fixed lg:static inset-y-0 left-0 z-50 w-64 flex-shrink-0
          bg-[#0d0d1a]/95 backdrop-blur-xl border-r border-[#1e1e2e]/60
          transition-transform duration-300 ease-in-out
          ${t?"translate-x-0":"-translate-x-full lg:translate-x-0"}
        `,children:d})]})}),ca=l.memo(function({open:t,onToggle:r}){const{user:s}=H();return a.jsx("header",{className:"fixed top-0 left-0 right-0 z-30 lg:hidden bg-[#0d0d1a]/95 backdrop-blur-xl border-b border-[#1e1e2e]/60",children:a.jsxs("div",{className:"flex items-center gap-3 h-14 px-3",children:[a.jsx("button",{onClick:r,className:"p-2 rounded-xl border border-[#1e1e2e]/80 bg-[#0a0a14]/60 text-amber-400 hover:text-amber-300 active:scale-95 transition-all flex-shrink-0","aria-label":t?"Close menu":"Open menu",children:t?a.jsx(U,{className:"w-5 h-5"}):a.jsx(Xt,{className:"w-5 h-5"})}),a.jsxs("div",{className:"flex items-center gap-2 min-w-0 flex-1",children:[a.jsx("div",{className:"w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-gold-sm",children:a.jsx(ke,{className:"w-4 h-4 text-[#0a0a14]"})}),a.jsxs("div",{className:"min-w-0",children:[a.jsx("p",{className:"text-sm font-bold text-white font-display leading-tight truncate",children:"Admin Panel"}),a.jsx("p",{className:"text-[9px] text-gray-600 truncate",children:(s==null?void 0:s.name)||"Online Keys · Dashboard"})]})]}),a.jsxs(z,{to:"/",className:"flex items-center gap-1.5 text-[10px] font-medium text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 px-2.5 py-1.5 rounded-lg transition-all shrink-0",children:[a.jsx(ra,{className:"w-3 h-3"})," Store"]})]})})}),ua=["Rahul","Priya","Amit","Sneha","Vikram","Ananya","Rohit","Pooja","Karan","Neha","Arjun","Divya","Sanjay","Ritu","Manish","Kavita","Deepak","Anjali","Suresh","Meera","Aditya","Ishita","Varun","Tanvi"],ma=["Mumbai","Delhi","Bengaluru","Hyderabad","Pune","Chennai","Kolkata","Jaipur","Lucknow","Ahmedabad","Surat","Nagpur","Indore","Kochi","Chandigarh","Patna","Bhopal","Goa","Vadodara","Ludhiana"],ha=["just now","just now","1 min ago","2 mins ago","3 mins ago","5 mins ago"],pa=["bought","purchased","grabbed"],M=e=>e[Math.floor(Math.random()*e.length)];function xa({t:e,leaving:t,onDismiss:r}){const[s,o]=l.useState(0),[i,n]=l.useState(!1),u=l.useRef(null),d=l.useRef(0),c=g=>{d.current=g.clientX,u.current=g.pointerId,n(!0);try{g.currentTarget.setPointerCapture(g.pointerId)}catch{}},m=g=>{u.current===g.pointerId&&o(Math.max(-280,Math.min(0,g.clientX-d.current)))},h=g=>{u.current===g.pointerId&&(u.current=null,n(!1),s<=-60?r():o(0))},f=()=>{u.current=null,n(!1),o(0)},x=!!e.real;return a.jsxs("div",{className:`${t?"toast-leave":"toast-slide-in"} relative pointer-events-auto touch-pan-y rounded-xl p-3 pr-9 flex items-start gap-2.5 shadow-panel select-none cursor-grab active:cursor-grabbing
        ${x?"bg-[#0d0d1a]/95 backdrop-blur-xl border border-amber-500/40 shadow-gold-sm":"bg-[#0d0d1a]/95 backdrop-blur-xl border border-[#1e1e2e]/80"}`,style:{transform:`translateX(${s}px)`,transition:i?"none":"transform 0.25s ease"},onPointerDown:c,onPointerMove:m,onPointerUp:h,onPointerCancel:f,onPointerLeave:f,children:[a.jsx("button",{onClick:r,"aria-label":"Dismiss notification",className:"absolute top-1.5 right-1.5 text-gray-600 hover:text-gray-300 hover:bg-white/5 rounded-md p-0.5 transition-colors",children:a.jsx(U,{className:"w-3.5 h-3.5"})}),a.jsx("div",{className:`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${x?"bg-gradient-to-br from-emerald-500/30 to-teal-500/20 border border-emerald-500/30":"bg-gradient-to-br from-amber-500/30 to-orange-500/20 border border-amber-500/30"}`,children:x?a.jsx(ee,{className:"w-4 h-4 text-emerald-400"}):a.jsx("span",{className:"text-xs font-bold text-amber-400",children:e.name.slice(0,1)})}),a.jsx("div",{className:"min-w-0 flex-1",children:x?a.jsxs(a.Fragment,{children:[a.jsxs("p",{className:"text-[11px] leading-snug text-gray-300",children:[a.jsx("span",{className:"font-bold text-emerald-400",children:"Key Delivered"})," —"," ",a.jsx("span",{className:"font-semibold text-amber-400 truncate",children:e.title}),e.durLabel&&a.jsxs("span",{className:"text-gray-500",children:[" (",e.durLabel,")"]})]}),a.jsxs("p",{className:"text-[9px] text-gray-600 mt-1 flex items-center gap-1.5",children:[a.jsxs("span",{className:"relative flex h-1.5 w-1.5",children:[a.jsx("span",{className:"animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"}),a.jsx("span",{className:"relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"})]}),a.jsx("span",{className:"text-emerald-400 font-medium",children:"Payment Confirmed"}),e.amount!=null&&a.jsxs("span",{children:["· ₹",Number(e.amount).toLocaleString()]}),e.timeAgo?a.jsxs("span",{children:["· ",e.timeAgo]}):null]})]}):a.jsxs(a.Fragment,{children:[a.jsxs("p",{className:"text-[11px] leading-snug text-gray-300",children:[a.jsx("span",{className:"font-bold text-white",children:e.name})," from ",a.jsx("span",{className:"text-gray-500",children:e.city})," ",e.verb," ",a.jsx("span",{className:"font-semibold text-amber-400 truncate",children:e.title}),e.durLabel&&a.jsxs("span",{className:"text-gray-500",children:[" — ",e.durLabel]})]}),a.jsxs("p",{className:"text-[9px] text-gray-600 mt-1 flex items-center gap-1.5",children:[a.jsxs("span",{className:"relative flex h-1.5 w-1.5",children:[a.jsx("span",{className:"animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"}),a.jsx("span",{className:"relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"})]}),a.jsx("span",{className:"text-emerald-400 font-medium",children:"Verified"})," · ",e.timeAgo]})]})}),a.jsx(Rt,{className:"w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-500"})]})}function fa(){const[e,t]=l.useState([]),[r,s]=l.useState({}),o=l.useRef([]);l.useEffect(()=>{ye.getAll({active:"true",limit:"50"}).then(d=>{o.current=d.data||[]}).catch(()=>{})},[]);const i=l.useCallback(d=>{s(c=>({...c,[d]:!0})),setTimeout(()=>{t(c=>c.filter(m=>m.id!==d)),s(c=>{const m={...c};return delete m[d],m})},380)},[]),n=l.useCallback(d=>{t(c=>[...c.slice(-1),d]),setTimeout(()=>i(d.id),d.real?8e3:6e3)},[i]),u=l.useCallback(()=>{var h;const d=o.current;if(!d.length)return;const c=M(d),m=(h=c.durations)==null?void 0:h[Math.floor(Math.random()*c.durations.length)];n({id:Date.now()+Math.random(),name:M(ua),city:M(ma),verb:M(pa),title:c.title,durLabel:(m==null?void 0:m.label)||"",timeAgo:M(ha),real:!1})},[n]);return l.useEffect(()=>{u();const d=setTimeout(u,8e3);let c;const m=()=>{c=setTimeout(()=>{u(),m()},9e3+Math.random()*7e3)};return m(),()=>{clearTimeout(d),clearTimeout(c)}},[u]),l.useEffect(()=>{const d=c=>{const m=c.detail||{};n({id:Date.now()+Math.random(),title:m.title||"Order",durLabel:m.durLabel||"",amount:m.amount!=null?m.amount:null,timeAgo:"just now",real:!0})};return window.addEventListener("real-purchase",d),()=>window.removeEventListener("real-purchase",d)},[n]),e.length?a.jsx("div",{className:"fixed bottom-4 left-4 z-[70] flex flex-col gap-2 w-[300px] pointer-events-none select-none",children:e.map(d=>a.jsx(xa,{t:d,leaving:r[d.id],onDismiss:()=>i(d.id)},d.id))}):null}const ga=l.lazy(()=>k(()=>import("./Home-D9D7JK_H.js"),__vite__mapDeps([0,1,2,3,4,5]))),ba=l.lazy(()=>k(()=>import("./ProductPage-BntCD6FY.js"),__vite__mapDeps([6,1,5,2,3,7,4,8]))),ya=l.lazy(()=>k(()=>import("./Login-DdWVfMMS.js"),__vite__mapDeps([9,1,3,5]))),va=l.lazy(()=>k(()=>import("./NotFound-ChXG_BTH.js"),__vite__mapDeps([10,1,5]))),ne=l.lazy(()=>k(()=>import("./Dashboard-DBANGd0Q.js"),__vite__mapDeps([11,1,12,5]))),ja=l.lazy(()=>k(()=>import("./ManageMods-B1ytnmZE.js"),__vite__mapDeps([13,1,14,5]))),oe=l.lazy(()=>k(()=>import("./AddMod-CW0x55kA.js"),__vite__mapDeps([15,1,7,14,5]))),wa=l.lazy(()=>k(()=>import("./AdminKeys-Bx1cFX2C.js"),__vite__mapDeps([16,1,17,14,5]))),ka=l.lazy(()=>k(()=>import("./AvailableKeys-DdRBFVPx.js"),__vite__mapDeps([18,1,4,17,5]))),Na=l.lazy(()=>k(()=>import("./CouponsPage-Dld_UNO4.js"),__vite__mapDeps([19,1,14,8,12,5]))),_a=l.lazy(()=>k(()=>import("./OrdersList-DxsdIDZY.js"),__vite__mapDeps([20,1,5]))),Ca=l.lazy(()=>k(()=>import("./SettingsPage-BsEHL8vZ.js"),__vite__mapDeps([21,1,5])));function _({children:e}){const[t,r]=l.useState(!1);return a.jsxs("div",{className:"flex min-h-screen",children:[a.jsx(ca,{open:t,onToggle:()=>r(!t)}),a.jsx(da,{open:t,onToggle:r}),a.jsx("div",{className:"flex-1 min-h-screen overflow-auto pt-14 lg:pt-0",children:a.jsx("div",{className:"p-4 md:p-6 lg:p-8 max-w-6xl mx-auto",children:e})})]})}function Ea(){const t=ie().pathname.startsWith("/admin");return a.jsxs("div",{className:"min-h-screen",children:[a.jsx(ia,{}),!t&&a.jsx(fa,{}),a.jsx("main",{children:a.jsx(l.Suspense,{fallback:a.jsx(be,{text:"Loading..."}),children:a.jsxs(Ce,{children:[a.jsx(y,{path:"/",element:a.jsx(ga,{})}),a.jsx(y,{path:"/product/:id",element:a.jsx(ba,{})}),a.jsx(y,{path:"/login",element:a.jsx(ya,{})}),a.jsx(y,{path:"/mods",element:a.jsx(I,{to:"/",replace:!0})}),a.jsx(y,{path:"/mods/:id",element:a.jsx(I,{to:"/",replace:!0})}),a.jsx(y,{path:"/products",element:a.jsx(I,{to:"/",replace:!0})}),a.jsx(y,{path:"/products/:id",element:a.jsx(I,{to:"/product/:id",replace:!0})}),a.jsx(y,{path:"/admin",element:a.jsx(N,{adminOnly:!0,children:a.jsx(_,{children:a.jsx(ne,{})})})}),a.jsx(y,{path:"/admin/dashboard",element:a.jsx(N,{adminOnly:!0,children:a.jsx(_,{children:a.jsx(ne,{})})})}),a.jsx(y,{path:"/admin/mods",element:a.jsx(N,{adminOnly:!0,children:a.jsx(_,{children:a.jsx(ja,{})})})}),a.jsx(y,{path:"/admin/mods/add",element:a.jsx(N,{adminOnly:!0,children:a.jsx(_,{children:a.jsx(oe,{})})})}),a.jsx(y,{path:"/admin/mods/:id",element:a.jsx(N,{adminOnly:!0,children:a.jsx(_,{children:a.jsx(oe,{})})})}),a.jsx(y,{path:"/admin/keys",element:a.jsx(N,{adminOnly:!0,children:a.jsx(_,{children:a.jsx(wa,{})})})}),a.jsx(y,{path:"/admin/available-keys",element:a.jsx(N,{adminOnly:!0,children:a.jsx(_,{children:a.jsx(ka,{})})})}),a.jsx(y,{path:"/admin/coupons",element:a.jsx(N,{adminOnly:!0,children:a.jsx(_,{children:a.jsx(Na,{})})})}),a.jsx(y,{path:"/admin/orders",element:a.jsx(N,{adminOnly:!0,children:a.jsx(_,{children:a.jsx(_a,{})})})}),a.jsx(y,{path:"/admin/settings",element:a.jsx(N,{adminOnly:!0,children:a.jsx(_,{children:a.jsx(Ca,{})})})}),a.jsx(y,{path:"*",element:a.jsx(va,{})})]})})})]})}Z.createRoot(document.getElementById("root")).render(a.jsx(Ee.StrictMode,{children:a.jsx(Ae,{children:a.jsxs(At,{children:[a.jsx(Ea,{}),a.jsx(kt,{position:"top-right",toastOptions:{duration:3e3,style:{background:"#1e293b",color:"#f8fafc",border:"1px solid #334155"}}})]})})}));export{Rt as B,zt as C,ee as K,be as L,Jt as P,ke as S,na as T,U as X,Ma as a,Ht as b,v as c,Ia as d,p as e,Vt as f,a as j,La as k,$a as o,ye as p,Oa as s,H as u,Pa as z};
