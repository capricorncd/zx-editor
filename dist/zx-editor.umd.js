/*!
 * zx-editor version 3.1.0
 * Author: capricorncd
 * Released under the MIT License
 * Repository: https://github.com/capricorncd/zx-editor
 * Released on: 2022-08-01 22:17:05 (GMT+0900)
 * Copyright © 2018-present, capricorncd
 */
(function(E,_){typeof exports=="object"&&typeof module<"u"?_(exports):typeof define=="function"&&define.amd?define(["exports"],_):(E=typeof globalThis<"u"?globalThis:E||self,_(E.ZxEditor={}))})(this,function(E){"use strict";var it=Object.defineProperty;var rt=(E,_,x)=>_ in E?it(E,_,{enumerable:!0,configurable:!0,writable:!0,value:x}):E[_]=x;var g=(E,_,x)=>(rt(E,typeof _!="symbol"?_+"":_,x),x);class _{constructor(){this._events={}}on(e,i){return!e||!i||typeof i!="function"?this:(this._events[e]||(this._events[e]=[]),this._events[e].push(i),this)}once(e,i){const r=(...s)=>{i.apply(this,s),this.off(e,r)};return this.on(e,r)}emit(e,...i){const r=this._events[e];if(!r)return this;for(let s=0;s<r.length;s++)try{r[s].apply(this,i)}catch(n){this.emit("error",n,"emit")}return this}off(e,i){if(!this._events[e])return this;const r=this._events[e];if(typeof i=="function"){const s=r.findIndex(n=>n===i);s>=0&&r.splice(s,1)}else this._events[e].length=0;return this._removeEmpty(e),this}_removeEmpty(e){this._events[e].length||delete this._events[e]}removeAllListeners(){Object.keys(this._events).forEach(e=>this.off(e))}}function x(){return window.screen.height===812&&window.screen.width===375}/*!
 * zx-sml version 0.2.1
 * Author: Capricorncd <capricorncd@qq.com>
 * Repository: https://github.com/capricorncd/zx-sml
 * Released on: 2022-07-24 15:34:05 (GMT+0900)
 */var ge=Object.defineProperty,k=Object.getOwnPropertySymbols,pe=Object.prototype.hasOwnProperty,we=Object.prototype.propertyIsEnumerable,U=(t,e,i)=>e in t?ge(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,z=(t,e)=>{for(var i in e||(e={}))pe.call(e,i)&&U(t,i,e[i]);if(k)for(var i of k(e))we.call(e,i)&&U(t,i,e[i]);return t};function ye(t){return Array.isArray(t)}function W(t){return t!==null&&!ye(t)&&typeof t=="object"}var me=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},L={exports:{}};/*! For license information please see date-utils-2020.js.LICENSE.txt */(function(t,e){(function(i,r){t.exports=r()})(typeof self<"u"?self:me,function(){return(()=>{var i={949:(s,n)=>{Object.defineProperty(n,"__esModule",{value:!0}),n.toTwoDigits=void 0,n.toTwoDigits=function(o){return o[1]?o:"0"+o}},607:(s,n,o)=>{Object.defineProperty(n,"__esModule",{value:!0}),n.toTwoDigits=n.toDate=n.formatDate=void 0;var c=o(949);Object.defineProperty(n,"toTwoDigits",{enumerable:!0,get:function(){return c.toTwoDigits}});var u={weeks:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]};function f(l){if(l instanceof Date)return l;if(typeof l=="number")return new Date(l);if(typeof l=="string"){var a=l.trim();if(/^\d+$/.test(a)){var h=a.length;return h===8?new Date([a.substr(0,4),a.substr(4,2),a.substr(6,2)].join("/")):h===6?new Date([a.substr(0,4),a.substr(4,2),"01"].join("/")):h===4?new Date(a+"/01/01"):new Date(parseInt(l))}if(a=a.replace(/[年月日]/g,function(d){return d==="\u65E5"?"":"/"}).replace(/[(（（].*?[)））]/g," ").replace(/\bam|pm\b/gi," ").replace(/\s+/g," "),/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/.test(a))return new Date([RegExp.$1,RegExp.$2,RegExp.$3].join("/"));if(/^(\d{4})[-/](\d{1,2})$/.test(a))return new Date([RegExp.$1,RegExp.$2,"01"].join("/"));var p=new Date(a);return isNaN(p.getFullYear())?null:p}return null}n.formatDate=function(l,a,h){var p,d=f(l);if(!d||!a)return l+"";if(a==="timestamp")return d.getTime().toString();/(y+)/i.test(a)&&(p=RegExp.$1,a=a.replace(p,(d.getFullYear()+"").substr(4-p.length))),h&&Array.isArray(h.weeks)||(h=u);var v={"M+":d.getMonth()+1,"d+":d.getDate(),"h+":d.getHours(),"m+":d.getMinutes(),"s+":d.getSeconds(),"w+":d.getDay(),"W+":h.weeks[d.getDay()],"a+":d.getHours()<12?"am":"pm","A+":d.getHours()<12?"AM":"PM"};for(var w in v)if(new RegExp("("+w+")").test(a)){p=RegExp.$1;var y=v[w]+"";a=a.replace(p,p.length===1?y:c.toTwoDigits(y))}if(/(g)/i.test(a)){var b=d.toString().split(/\s+/).slice(5),F=a.includes("g");a=a.replace(/g/i,F?b[0]:b.join(" "))}return a},n.toDate=f}},r={};return function s(n){if(r[n])return r[n].exports;var o=r[n]={exports:{}};return i[n](o,o.exports,s),o.exports}(607)})()})})(L);function G(t="",e="-"){return t.replace(/[A-Z]/g,(i,r)=>`${r>0?e:""}${i.toLowerCase()}`)}function Y(t="",e=!1){const i=t.replace(/[-_\s](\w)/g,(r,s)=>s.toUpperCase());return e?i.replace(/^\w/,r=>r.toUpperCase()):i}function Z(t){return typeof t=="string"?t:t===null||typeof t>"u"?"":Array.isArray(t)?t.map(Z).join(" "):typeof t=="object"?Object.keys(t).filter(e=>t[e]).join(" "):String(t)}function _e(...t){return t.map(Z).filter(e=>!!e).join(" ")}function $(t,e=0){return Array.prototype.slice.call(t,e)}function q(t={},e=!1){const i=e?Y:G,r={};for(const[s,n]of Object.entries(t))r[i(s)]=W(n)?q(n,e):n;return r}function C(t,e=document){return t?t instanceof HTMLElement?t:e.querySelector(t):null}function H(t,e=document){return $(e.querySelectorAll(t))}function m(t,e={},i){const r=document.createElement(t);for(const[s,n]of Object.entries(e))r.setAttribute(G(s),s==="style"&&W(n)?N(n):n);return i&&(Array.isArray(i)||(i=[i]),i.forEach(s=>{if(typeof s=="string"){const n=m("div");n.innerHTML=s,r.append(...n.childNodes)}else r.append(s)})),r}function N(...t){const e=t.reduce((r,s)=>z(z({},r),q(s)),{}),i=[];for(const[r,s]of Object.entries(e))s===""||typeof s>"u"||s===null||i.push(`${r}:${s}`);return i.join(";")}L.exports.formatDate,L.exports.toDate,L.exports.toTwoDigits;const A=(t,e="style")=>t?(t.getAttribute(e)||"").split(/\s?;\s?/).reduce((r,s)=>{const[n,o]=s.split(/\s?:\s?/);return n&&(r[Y(n)]=o),r},{}):{},I=t=>document.createTextNode(t),K=t=>{if(!t)return null;if(typeof t=="string")return I(t);const{tag:e,attrs:i,child:r}=t;if(!e&&!i&&!r)return null;const s=m(e||"div",i);if(Array.isArray(r)&&r.length){let n;r.forEach(o=>{n=K(o),n&&s.appendChild(n)})}else r&&typeof r=="string"&&s.appendChild(I(r));return s},Ee=(t,e)=>{t.classList.add(e)},be=(t,e)=>{t.classList.remove(e)},ve="zx-editor__editor",D="SECTION",xe="BR",V=["SECTION","H1","H2","H3","H4","H5","BLOCKQUOTE","UL","OL"],$e=["DIV","P","ARTICLE","ASIDE","DETAILS","SUMMARY","FOOTER","HEADER","MAIN","NAV","SECTION","H1","H2","H3","H4","H5","H6","BLOCKQUOTE"],X="<section><br></section>";function S(t,e,i){return t.replace(RegExp("(^<"+e+")|("+e+">$)","gi"),r=>r.toUpperCase().replace(e,i.toLowerCase()))}function P(t){return/^UL|OL$/.test(t.nodeName)}function R(t){if(!t)return!1;const e=$(t.childNodes);return e.length===1&&e[0].nodeName==="BR"}const Ce=t=>{const e={minHeight:t.minHeight,"--placeholder":JSON.stringify(t.placeholder),"--placeholder-color":t.placeholderColor,"--line-height":t.lineHeight,"--paragraph-spacing":t.paragraphTailSpacing,...t.styles};t.caretColor&&(e.caretColor=t.caretColor),t.textColor&&(e.color=t.textColor);const i={class:`${ve} is-empty`,style:N(e)};return t.editable&&(i.contenteditable="true"),m("div",i,X)},Q=(t,e=D)=>{var c,u,f,l,a,h,p,d,v;if(!t)return null;const i=t.nodeName,r=e.toUpperCase();if(i===r)return t;const s=m(e),n=t.parentElement;let o;if(i==="LI"&&P(n)){if(s.innerHTML=S(t.outerHTML,i,r),o=s.firstChild,n.childElementCount>1)if(n.firstElementChild===t)(c=n.parentElement)==null||c.insertBefore(o,n);else if(n.lastElementChild===t){const w=(u=n.parentElement)==null?void 0:u.nextElementSibling;w?(f=w.parentElement)==null||f.insertBefore(o,w):(l=n.parentElement)==null||l.append(o)}else{const w=$(n.children),y=m(n.nodeName);let b=w.shift();for(;b&&b!==t;)y.append(b),b=w.shift();(a=n.parentElement)==null||a.insertBefore(y,n),(h=n.parentElement)==null||h.insertBefore(o,n),n.removeChild(t)}else(p=n.parentElement)==null||p.insertBefore(o,n),(d=n.parentElement)==null||d.removeChild(n);return o}if($e.includes(i)){if(/UL|OL/.test(r)){const w=t.previousElementSibling,y=t.nextElementSibling;if(w&&P(w)){if(s.innerHTML=S(t.outerHTML,i,"li"),o=s.firstChild,w.append(o),n==null||n.removeChild(t),y&&y.nodeName===w.nodeName){const b=$(y.children);w.append(...b),(v=y.parentElement)==null||v.removeChild(y)}}else y&&P(y)?(s.innerHTML=S(t.outerHTML,i,"li"),o=s.firstChild,y.insertBefore(o,y.firstElementChild),n==null||n.removeChild(t)):(o=s,s.innerHTML=S(t.outerHTML,i,"li"),n==null||n.replaceChild(o,t))}else s.innerHTML=S(t.outerHTML,i,r),o=s.firstChild,n==null||n.replaceChild(o,t);return o}return s.append(t.cloneNode(!0)),n==null||n.replaceChild(s,t),s},J=t=>{t.children.length<=1&&R(t.children[0])?t.classList.add("is-empty"):t.classList.remove("is-empty")};function Te(t,e,i=!1){var r;for(;t&&e!==t;){if(!i&&t.nodeName==="LI"&&((r=t.parentElement)==null?void 0:r.parentElement)===e||t.parentElement===e)return t;t=t.parentElement}return e.lastElementChild}const He={editable:!0,minHeight:"50vh",placeholder:"\u8BF7\u5728\u6B64\u8F93\u5165\u5185\u5BB9..",placeholderColor:"#999",lineHeight:1.5,allowedNodeNames:V,paragraphTailSpacing:"10px",caretColor:"",textColor:"",customPasteHandler:void 0,insertTextToNewParagraph:!1},nt="";class Se extends _{constructor(i){super();g(this,"version");g(this,"options");g(this,"$editor");g(this,"_cursorElement",null);g(this,"_eventHandler");g(this,"allowedNodeNames");g(this,"_pasteHandler");const r=typeof i.container=="string"?C(i.container):i.container;if(!r)throw new Error(`Can't found '${i.container}' Node in document!`);this.version="3.1.0",this.options={...He,...i},this.allowedNodeNames=(this.options.allowedNodeNames||V).map(s=>s.toUpperCase()),this.$editor=Ce(this.options),r.append(this.$editor),this._eventHandler=s=>{var o;const n=s.type;n==="blur"&&(this._lastLine(),this.setCursorElement((o=window.getSelection())==null?void 0:o.getRangeAt(0).endContainer)),this.emit(n==="input"?"change":n,s),J(this.$editor)},this._pasteHandler=s=>{var c;if(typeof this.options.customPasteHandler=="function")return this.options.customPasteHandler(s);s.stopPropagation();const n=(c=s.clipboardData)==null?void 0:c.getData("text"),o=window.getSelection();this._insertText(n,o)},this._initEvents()}_initEvents(){this.$editor.addEventListener("focus",this._eventHandler),this.$editor.addEventListener("blur",this._eventHandler),this.$editor.addEventListener("input",this._eventHandler),this.$editor.addEventListener("click",this._eventHandler),this.$editor.addEventListener("paste",this._pasteHandler)}use(i,r){typeof i.install=="function"&&i.install(this,r)}setHtml(i){this.$editor.innerHTML=X,this.insert(i,!0),this._lastLine(),J(this.$editor)}getHtml(){return this.$editor.innerHTML.replace(/<section><br><\/section>$/,"")}insert(i,r=!1){if(i instanceof HTMLElement)this._insert(i);else{const s=m("div",{},i),n=$(s.childNodes);if(!r&&!this.options.insertTextToNewParagraph&&n.every(o=>o.nodeType===Node.TEXT_NODE))return this._insertText(i);n.forEach(o=>{o.nodeType===Node.ELEMENT_NODE?o.nodeName===xe?this._insert(m(D,{},"<br/>")):this._insert(o):o.textContent&&this._insert(m(D,{},o.textContent))})}this._dispatchChange()}_insert(i){const r=this.getCursorElement();R(r)?this.$editor.insertBefore(i,r):this.$editor.insertBefore(i,r.nextElementSibling),this.allowedNodeNames.includes(i.nodeName)||(i=Q(i,D)),this.setCursorElement(i)}_insertText(i,r){if(!!i){if(r=r!=null?r:window.getSelection(),!(r!=null&&r.rangeCount))return this.insert(i,!0);r.deleteFromDocument(),r.getRangeAt(0).insertNode(I(i)),this.setCursorElement(r.getRangeAt(0).endContainer),this._dispatchChange()}}_lastLine(){R(this.$editor.lastElementChild)||this.$editor.appendChild(m("section",{},"<br>"))}changeNodeName(i){if(!this.allowedNodeNames.includes(i.toUpperCase()))return!1;const r=this.getCursorElement(),s=Q(r,i);return console.log(s),s?(this.setCursorElement(s),this._dispatchChange(),!0):!1}changeStyles(i,r){const s=this.getCursorElement(!0);if(s){const n=typeof i=="string"?{[i]:r}:i;s.setAttribute("style",N(A(s),n)),this._dispatchChange()}}_dispatchChange(){this.$editor.dispatchEvent(new InputEvent("input"))}getStyles(){return A(this.getCursorElement())}setCursorElement(i){if(i instanceof Node)for(;i;){if(i.nodeType===Node.ELEMENT_NODE){this._cursorElement=i;break}i=i.parentElement}else i&&(this._cursorElement=i)}getCursorElement(i=!1){return Te(this._cursorElement,this.$editor,i)}destroy(){this.$editor.removeEventListener("focus",this._eventHandler),this.$editor.removeEventListener("blur",this._eventHandler),this.$editor.removeEventListener("input",this._eventHandler),this.$editor.removeEventListener("paste",this._pasteHandler),this.removeAllListeners()}}const Le={textStyleTitle:"Set Style",textStyleHeadLeftBtnText:"Clear style"},De=["#333","#d0d0d0","#ff583d","#fdaa25","#44c67b","#14b2e0","#b065e2"],Oe={tag:"dl",attrs:{class:"__style-wrapper border-bottom"},child:[{tag:"dd",attrs:{style:"font-weight: 800;","data-style":"fontWeight:800"},child:["B"]},{tag:"dd",attrs:{style:"font-style: italic;","data-style":"fontStyle:italic"},child:["I"]},{tag:"dd",attrs:{style:"text-decoration: line-through;","data-style":"textDecoration:line-through"},child:["abc"]},{tag:"dd",attrs:{style:"","data-style":"textAlign:left",class:"text-align--l"}},{tag:"dd",attrs:{style:"","data-style":"textAlign:center",class:"text-align--c"}},{tag:"dd",attrs:{style:"","data-style":"textAlign:right",class:"text-align--r"}}]},Ne={tag:"dl",attrs:{class:"__tag-wrapper"},child:[{tag:"dd",attrs:{class:"__h2","data-tag":"h2"},child:["\u5927\u6807\u9898",{tag:"i"}]},{tag:"dd",attrs:{class:"__h4","data-tag":"h4"},child:["\u5C0F\u6807\u9898",{tag:"i"}]},{tag:"dd",attrs:{class:"__section active","data-tag":"section"},child:["\u6B63\u6587",{tag:"i"}]},{tag:"dd",attrs:{class:"__blockquote","data-tag":"blockquote"},child:["\u5F15\u7528",{tag:"i"}]},{tag:"dd",attrs:{class:"__ul","data-tag":"ul"},child:["\u65E0\u5E8F\u5217\u8868",{tag:"i"}]}]},Ae=t=>{const e=[];return t.forEach((i,r)=>{/^#\w{3,6}$/.test(i)&&e.push({tag:"dd",attrs:{class:r===0?"active":"","data-color":Ie(i.toLowerCase())},child:[{tag:"i",attrs:{style:`background:${i}`}}]})}),e},Ie=t=>t.length===7?t:`#${t[1]}${t[1]}${t[2]}${t[2]}${t[3]}${t[3]}`,st="",T="zx-editor-style-panel",M=`${T}__fade-in`;class Pe{constructor(e){g(this,"editorInstance",null);g(this,"$el");g(this,"_headerSwitchHandler");g(this,"$elMap");g(this,"_styleHandler");g(this,"_colorHandler");g(this,"_tagHandler");const i={...Le,...e};this.$el=m("div",{class:`${T} border-top`});const r=m("div",{class:`${T}__header`},i.textStyleTitle),s=m("div",{class:`${T}__header__left`},i.textStyleHeadLeftBtnText),n=m("div",{class:`${T}__header__switch`});r.append(s,n);const o=[Oe],c=Array.isArray(i.textStyleColors)?i.textStyleColors:De;if(c.length){const f={tag:"dl",attrs:{class:"__color-wrapper border-bottom"},child:Ae(c)};o.push(f)}o.push(Ne);const u=K({tag:"div",attrs:{class:`${T}__body`},child:o});this.$el.append(r,u),this.$elMap=new Map([["headerSwitch",n]]),this._headerSwitchHandler=()=>{this.$el.classList.contains(M)?this.hide():this.show()},this._styleHandler=f=>{const l=this.editorInstance,a=f.currentTarget,h=A(a,"data-style"),p=l.getStyles();Object.keys(h).forEach(d=>{p[d]&&(h[d]="")}),l.changeStyles(h)},this._colorHandler=f=>{const l=f.currentTarget;if(l.classList.contains("active"))return;C(".active",l.parentElement).classList.remove("active"),l.classList.add("active");const a=this.editorInstance,h=l.getAttribute("data-color");a.changeStyles({color:h})},this._tagHandler=f=>{const l=f.currentTarget;if(l.classList.contains("active"))return;C(".active",l.parentElement).classList.remove("active"),l.classList.add("active");const a=this.editorInstance,h=l.getAttribute("data-tag");a.changeNodeName(h)},n.addEventListener("click",this._headerSwitchHandler),H(".__style-wrapper dd",u).forEach(f=>{f.addEventListener("click",this._styleHandler)}),H(".__color-wrapper dd",u).forEach(f=>{f.addEventListener("click",this._colorHandler)}),H(".__tag-wrapper dd",u).forEach(f=>{f.addEventListener("click",this._tagHandler)})}install(e,i){this.editorInstance=e,i&&i.append(this.$el)}show(){this.$el.classList.add(M)}hide(){this.$el.classList.remove(M)}destroy(){var e;(e=this.$elMap.get("headerSwitch"))==null||e.removeEventListener("click",this._headerSwitchHandler)}}const ot="",Re={toolbarBeenFixed:!0,toolbarHeight:50,toolbarButtons:["choose-picture","text-style"]},Me=34;class je{constructor(e){g(this,"editorInstance",null);g(this,"visible");g(this,"options");g(this,"$el");g(this,"_btnClickHandler");this.options={...Re,...e},this.visible=this.options.toolbarBeenFixed;const i=this.options.toolbarHeight;this.$el=m("div",{class:"zx-editor__toolbar border-top",style:{"--bar-height":i+"px",height:`${i+(x()?Me:0)}px`}},'<dl class="inner-wrapper"></dl>'),this._btnClickHandler=r=>{const s=r.currentTarget;this.editorInstance&&s&&this.editorInstance.emit("toolbarButtonClick",s.getAttribute("data-name"))},this.options.toolbarButtons.forEach(r=>{this.addButton({name:r})})}install(e,i){this.editorInstance=e,i&&i.append(this.$el),this.visible&&this.show()}show(){Ee(this.$el,"__fade-in"),this.visible=!0,this.editorInstance.emit("toolbarShow",!0,this)}hide(){be(this.$el,"__fade-in"),this.visible=!1,this.editorInstance.emit("toolbarShow",!1,this)}addButton(e,i){const r={...e.style},s=m("dd",{class:_e("icon-item",e.className),dataName:e.name,style:r},e.innerHtml),n=H("dd",this.$el),o=C("dl",this.$el);typeof i=="number"&&i<n.length?o.insertBefore(s,n[i]):o.append(s),s.addEventListener("click",this._btnClickHandler)}destroy(){H(".icon-item",this.$el).forEach(e=>{e.removeEventListener("click",this._btnClickHandler)})}}/*!
 * image-process version 4.2.1
 * Author: Capricorncd <capricorncd@qq.com>
 * Repository: https://github.com/capricorncd/image-process-tools
 * Released on: 2022-07-23 16:12:35 (GMT+0900)
 *//*!
 * zx-sml version 0.2.0
 * Author: Capricorncd <capricorncd@qq.com>
 * Repository: https://github.com/capricorncd/zx-sml
 * Released on: 2022-07-13 22:46:38 (GMT+0900)
 */var Be=Object.defineProperty,ee=Object.getOwnPropertySymbols,Fe=Object.prototype.hasOwnProperty,ke=Object.prototype.propertyIsEnumerable,te=(t,e,i)=>e in t?Be(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,ie=(t,e)=>{for(var i in e||(e={}))Fe.call(e,i)&&te(t,i,e[i]);if(ee)for(var i of ee(e))ke.call(e,i)&&te(t,i,e[i]);return t};function Ue(t){return Array.isArray(t)}function re(t){return t!==null&&!Ue(t)&&typeof t=="object"}var ze=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},O={exports:{}};/*! For license information please see date-utils-2020.js.LICENSE.txt */(function(t,e){(function(i,r){t.exports=r()})(typeof self<"u"?self:ze,function(){return(()=>{var i={949:(s,n)=>{Object.defineProperty(n,"__esModule",{value:!0}),n.toTwoDigits=void 0,n.toTwoDigits=function(o){return o[1]?o:"0"+o}},607:(s,n,o)=>{Object.defineProperty(n,"__esModule",{value:!0}),n.toTwoDigits=n.toDate=n.formatDate=void 0;var c=o(949);Object.defineProperty(n,"toTwoDigits",{enumerable:!0,get:function(){return c.toTwoDigits}});var u={weeks:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]};function f(l){if(l instanceof Date)return l;if(typeof l=="number")return new Date(l);if(typeof l=="string"){var a=l.trim();if(/^\d+$/.test(a)){var h=a.length;return h===8?new Date([a.substr(0,4),a.substr(4,2),a.substr(6,2)].join("/")):h===6?new Date([a.substr(0,4),a.substr(4,2),"01"].join("/")):h===4?new Date(a+"/01/01"):new Date(parseInt(l))}if(a=a.replace(/[年月日]/g,function(d){return d==="\u65E5"?"":"/"}).replace(/[(（（].*?[)））]/g," ").replace(/\bam|pm\b/gi," ").replace(/\s+/g," "),/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/.test(a))return new Date([RegExp.$1,RegExp.$2,RegExp.$3].join("/"));if(/^(\d{4})[-/](\d{1,2})$/.test(a))return new Date([RegExp.$1,RegExp.$2,"01"].join("/"));var p=new Date(a);return isNaN(p.getFullYear())?null:p}return null}n.formatDate=function(l,a,h){var p,d=f(l);if(!d||!a)return l+"";if(a==="timestamp")return d.getTime().toString();/(y+)/i.test(a)&&(p=RegExp.$1,a=a.replace(p,(d.getFullYear()+"").substr(4-p.length))),h&&Array.isArray(h.weeks)||(h=u);var v={"M+":d.getMonth()+1,"d+":d.getDate(),"h+":d.getHours(),"m+":d.getMinutes(),"s+":d.getSeconds(),"w+":d.getDay(),"W+":h.weeks[d.getDay()],"a+":d.getHours()<12?"am":"pm","A+":d.getHours()<12?"AM":"PM"};for(var w in v)if(new RegExp("("+w+")").test(a)){p=RegExp.$1;var y=v[w]+"";a=a.replace(p,p.length===1?y:c.toTwoDigits(y))}if(/(g)/i.test(a)){var b=d.toString().split(/\s+/).slice(5),F=a.includes("g");a=a.replace(/g/i,F?b[0]:b.join(" "))}return a},n.toDate=f}},r={};return function s(n){if(r[n])return r[n].exports;var o=r[n]={exports:{}};return i[n](o,o.exports,s),o.exports}(607)})()})})(O);function ne(t="",e="-"){return t.replace(/[A-Z]/g,(i,r)=>`${r>0?e:""}${i.toLowerCase()}`)}function We(t="",e=!1){const i=t.replace(/[-_\s](\w)/g,(r,s)=>s.toUpperCase());return e?i.replace(/^\w/,r=>r.toUpperCase()):i}function se(t={},e=!1){const i=e?We:ne,r={};for(const[s,n]of Object.entries(t))r[i(s)]=re(n)?se(n,e):n;return r}function oe(t,e=!1,i=2){const r=["KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"],s=e?1e3:1024;let n=String(t),o="Byte";for(let c=0,u=t/s;u>1;u/=s,c++)n=u.toFixed(i),o=r[c];return e&&(o=o.replace("i","")),{text:n.replace(/\.0+$/,"")+o,value:+n,unit:o,bytes:t}}function Ge(t,e={},i){const r=document.createElement(t);for(const[s,n]of Object.entries(e))r.setAttribute(ne(s),s==="style"&&re(n)?Ye(n):n);return i&&(typeof i=="string"?r.innerHTML=i:r.append(i)),r}function Ye(...t){const e=t.reduce((r,s)=>ie(ie({},r),se(s)),{}),i=[];for(const[r,s]of Object.entries(e))s===""||typeof s>"u"||s===null||i.push(`${r}:${s}`);return i.join(";")}function Ze(t){return new Promise((e,i)=>{const r=new FileReader;r.onload=s=>{var n;const o=(n=s.target)==null?void 0:n.result;o?e(o):i(new Error(`FileReader's result is null, ${s.target}`))},r.onerror=i,r.readAsDataURL(t)})}function ae(t){return(window.URL||window.webkitURL).createObjectURL(t)}function le(t){const e=t.split(",");let i="";return/data:(\w+\/\w+);base64/.test(e[0])&&(i=RegExp.$1),{type:i,data:e[1]}}function ce(t,e){const i=le(t),r=window.atob(i.data);e=e||i.type;const s=new Uint8Array(r.length);for(let n=0;n<r.length;n++)s[n]=r.charCodeAt(n);return new Blob([s],{type:e})}O.exports.formatDate,O.exports.toDate,O.exports.toTwoDigits;const qe={enableDevicePixelRatio:!1,isForce:!1,mimeType:"image/jpeg",perResize:500,quality:.9,width:0,height:0,longestSide:0},Ke=/^data:(.+?);base64/,Ve=/^image\/.+/;function Xe(t,e){return new Promise((i,r)=>{const s={...qe,...e};typeof t=="string"&&Ke.test(t)?de(t,s,i,r):(t instanceof File||t instanceof Blob)&&Ve.test(t.type)?Ze(t).then(n=>{de(n,s,i,r)}).catch(r):r(new Error(`Invalid file, ${t}`))})}function de(t,e,i,r){const{type:s}=le(t),n=ce(t,s),o=new Image;o.onload=()=>{const c={element:o,blob:n,data:t,url:ae(n),width:o.naturalWidth||o.width,height:o.naturalHeight||o.height,type:s,size:oe(n.size)};e.cropInfo&&e.cropInfo.sw&&e.cropInfo.sh?he(c,e,i,r,{...e.cropInfo,dx:0,dy:0,dw:e.cropInfo.sw,dh:e.cropInfo.sh}):e.width>0&&e.height>0?he(c,e,i,r,Je(c,e)):e.width>0||e.height>0||e.longestSide>0?Qe(c,e,i,r):j({...c,raw:c},e,i)},o.onerror=r,o.src=t}function he(t,e,i,r,s){try{Object.prototype.hasOwnProperty.call(s,"enableDevicePixelRatio")||(s.enableDevicePixelRatio=e.enableDevicePixelRatio);const n=B(t.element,{enableDevicePixelRatio:e.enableDevicePixelRatio,sx:s.sx,sy:s.sy,sw:s.sw,sh:s.sh,dx:0,dy:0,dw:s.sw,dh:s.sh});!e.width&&!e.height?e.longestSide?s.sw>s.sh?(e.width=e.longestSide,e.height=s.sh*e.width/s.sw):(e.height=e.longestSide,e.width=s.sw*e.height/s.sh):(e.width=s.sw,e.height=s.sh):e.width?e.height=s.sh*e.width/s.sw:e.width=s.sw*e.height/s.sh,ue(n,t,e,{...s,sx:0,sy:0,sw:n.width,sh:n.height},i)}catch(n){r(n)}}function Qe(t,e,i,r){try{e.longestSide>0&&!e.width&&!e.height&&(t.width>=t.height?e.width=e.longestSide:e.height=e.longestSide);const s={enableDevicePixelRatio:e.enableDevicePixelRatio,sx:0,sy:0,sw:t.width,sh:t.height,dx:0,dy:0,dw:e.width,dh:e.height};if(e.width>0){if(t.width<e.width&&!e.isForce){j({...t,raw:t},e,i);return}s.dh=t.height*e.width/t.width,e.height=s.dh}else{if(t.height<e.height&&!e.isForce){j({...t,raw:t},e,i);return}s.dw=t.width*e.height/t.height,e.width=s.dw}ue(t.element,t,e,s,i)}catch(s){r(s)}}function j(t,e,i){t.type!==e.mimeType?(t.type=e.mimeType,fe(t.element,t.raw,e,{enableDevicePixelRatio:e.enableDevicePixelRatio,sx:0,sy:0,sw:t.width,sh:t.height,dx:0,dy:0,dw:t.width,dh:t.height},i)):i(t)}function ue(t,e,i,r,s){let n=e.width>e.height?e.width-r.dw:e.height-r.dh;if(n>i.perResize){const o=e.height/e.width;for(;n>i.perResize;)n-=i.perResize,r.sw=t.width,r.sh=t.height,r.dw=i.width+n,r.dh=r.dw*o,t=B(t,r)}r.sw=t.width,r.sh=t.height,r.dw=i.width,r.dh=i.height,fe(t,e,i,r,s)}function fe(t,e,i,r,s){const n=B(t,r),o=/^\w+\/\*$/.test(i.mimeType)||!i.mimeType?e.type:i.mimeType,c=n.toDataURL(o,i.quality),u=ce(c,o);s({element:n,type:o,width:n.width,height:n.height,blob:u,data:c,url:ae(u),size:oe(u.size),raw:e})}function Je(t,e){const{width:i,height:r}=t,{width:s,height:n}=e;let o;const c=r*s/n;if(i>c)o={sx:(i-c)/2,sy:0,sw:c,sh:r};else{const u=i*n/s;o={sx:0,sy:(r-u)/2,sw:i,sh:u}}return{...o,dx:0,dy:0,dw:s,dh:n}}function B(t,e){const i=e.enableDevicePixelRatio&&window.devicePixelRatio||1,r=Ge("canvas");r.width=e.dw*i,r.height=e.dh*i;const s=r.getContext("2d");return s.scale(i,i),s.drawImage(t,e.sx,e.sy,e.sw,e.sh,e.dx,e.dy,e.dw,e.dh),r}const et={imageMaxWidth:750,ignoreGif:!0,forceImageResize:!1,chooseFileMultiple:!0,chooseFileAccept:"image/*"},at="";class tt extends Se{constructor(i,r={}){let s=null;if(typeof i=="string"||i instanceof HTMLElement?s=C(i):(r=i||{},typeof r.container=="string"&&(s=C(r.container))),r={...et,...r},!s)throw new Error(`Can't found '${i}' Node in document!`);const n=m("div",{class:"zx-editor"});super({...r,container:n});g(this,"$el");g(this,"stylePanel");g(this,"toolbar");g(this,"fileInput",null);g(this,"_inputChangeHandler");s.append(n),this.$el=n,this.stylePanel=new Pe(r),this.use(this.stylePanel,this.$el),this.toolbar=new je(r),this.use(this.toolbar,this.$el),this._inputChangeHandler=o=>{const c=o.currentTarget;this.handleImageFile(c.files).then(u=>{u.forEach(f=>{const l=/gif$/i.test(f.raw.type)&&r.ignoreGif;this.insert(`<img src="${l?f.raw.data:f.data}">`)})}).catch(u=>{this.emit("error",u)})},this.on("toolbarButtonClick",o=>{switch(o){case"choose-picture":if(typeof r.customPictureHandler=="function")r.customPictureHandler();else if(this.fileInput)this.fileInput.click();else{const c={type:"file",style:{display:"none"},accept:r.chooseFileAccept};r.chooseFileMultiple&&(c.multiple=!0),this.fileInput=m("input",c),this.$el.append(this.fileInput),this.fileInput.addEventListener("change",this._inputChangeHandler),this.fileInput.click()}break;case"text-style":this.stylePanel.show();break}})}handleImageFile(i){return i?new Promise((r,s)=>{Promise.all($(i).map(this._handleFile)).then(n=>{r(n.sort((o,c)=>o.index-c.index).map(o=>o.data))}).catch(s)}):Promise.resolve([])}_handleFile(i,r){return new Promise((s,n)=>{Xe(i).then(o=>{s({data:o,index:r})}).catch(n)})}destroy(){var i;super.destroy(),this.stylePanel.destroy(),this.toolbar.destroy(),(i=this.fileInput)==null||i.removeEventListener("change",this._inputChangeHandler)}}E.ZxEditor=tt,Object.defineProperties(E,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});