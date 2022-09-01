var ye=Object.defineProperty;var we=(e,t,i)=>t in e?ye(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var u=(e,t,i)=>(we(e,typeof t!="symbol"?t+"":t,i),i);const be=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function i(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerpolicy&&(s.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?s.credentials="include":r.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=i(r);fetch(r.href,s)}};be();class Ee{constructor(){this._events={}}on(t,i){return!t||!i||typeof i!="function"?this:(this._events[t]||(this._events[t]=[]),this._events[t].push(i),this)}once(t,i){const n=(...r)=>{i.apply(this,r),this.off(t,n)};return this.on(t,n)}emit(t,...i){const n=this._events[t];if(!n)return this;for(let r=0;r<n.length;r++)try{n[r].apply(this,i)}catch(s){this.emit("error",s,"emit")}return this}off(t,i){if(!this._events[t])return this;const n=this._events[t];if(typeof i=="function"){const r=n.findIndex(s=>s===i);r>=0&&n.splice(r,1)}else this._events[t].length=0;return this._removeEmpty(t),this}_removeEmpty(t){this._events[t].length||delete this._events[t]}removeAllListeners(){Object.keys(this._events).forEach(t=>this.off(t))}}function ve(){return window.screen.height===812&&window.screen.width===375}/*!
 * zx-sml version 0.5.1
 * Author: Capricorncd <capricorncd@qq.com>
 * Repository: https://github.com/capricorncd/zx-sml
 * Released on: 2022-08-14 09:57:06 (GMT+0900)
 */var _e=Object.defineProperty,R=Object.getOwnPropertySymbols,Ce=Object.prototype.hasOwnProperty,$e=Object.prototype.propertyIsEnumerable,B=(e,t,i)=>t in e?_e(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i,j=(e,t)=>{for(var i in t||(t={}))Ce.call(t,i)&&B(e,i,t[i]);if(R)for(var i of R(t))$e.call(t,i)&&B(e,i,t[i]);return e};function Ne(e){return Array.isArray(e)}function X(e){return e!==null&&!Ne(e)&&typeof e=="object"}var xe=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},T={exports:{}};/*! For license information please see date-utils-2020.js.LICENSE.txt */(function(e,t){(function(i,n){e.exports=n()})(typeof self<"u"?self:xe,function(){return(()=>{var i={949:(r,s)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.toTwoDigits=void 0,s.toTwoDigits=function(o){return o[1]?o:"0"+o}},607:(r,s,o)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.toTwoDigits=s.toDate=s.formatDate=void 0;var l=o(949);Object.defineProperty(s,"toTwoDigits",{enumerable:!0,get:function(){return l.toTwoDigits}});var d={weeks:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]};function b(h){if(h instanceof Date)return h;if(typeof h=="number")return new Date(h);if(typeof h=="string"){var a=h.trim();if(/^\d+$/.test(a)){var p=a.length;return p===8?new Date([a.substr(0,4),a.substr(4,2),a.substr(6,2)].join("/")):p===6?new Date([a.substr(0,4),a.substr(4,2),"01"].join("/")):p===4?new Date(a+"/01/01"):new Date(parseInt(h))}if(a=a.replace(/[年月日]/g,function(c){return c==="\u65E5"?"":"/"}).replace(/[(（（].*?[)））]/g," ").replace(/\bam|pm\b/gi," ").replace(/\s+/g," "),/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/.test(a))return new Date([RegExp.$1,RegExp.$2,RegExp.$3].join("/"));if(/^(\d{4})[-/](\d{1,2})$/.test(a))return new Date([RegExp.$1,RegExp.$2,"01"].join("/"));var f=new Date(a);return isNaN(f.getFullYear())?null:f}return null}s.formatDate=function(h,a,p){var f,c=b(h);if(!c||!a)return h+"";if(a==="timestamp")return c.getTime().toString();/(y+)/i.test(a)&&(f=RegExp.$1,a=a.replace(f,(c.getFullYear()+"").substr(4-f.length))),p&&Array.isArray(p.weeks)||(p=d);var m={"M+":c.getMonth()+1,"d+":c.getDate(),"h+":c.getHours(),"m+":c.getMinutes(),"s+":c.getSeconds(),"w+":c.getDay(),"W+":p.weeks[c.getDay()],"a+":c.getHours()<12?"am":"pm","A+":c.getHours()<12?"AM":"PM"};for(var g in m)if(new RegExp("("+g+")").test(a)){f=RegExp.$1;var w=m[g]+"";a=a.replace(f,f.length===1?w:l.toTwoDigits(w))}if(/(g)/i.test(a)){var E=c.toString().split(/\s+/).slice(5),H=a.includes("g");a=a.replace(/g/i,H?E[0]:E.join(" "))}return a},s.toDate=b}},n={};return function r(s){if(n[s])return n[s].exports;var o=n[s]={exports:{}};return i[s](o,o.exports,r),o.exports}(607)})()})})(T);function Z(e="",t="-"){return e.replace(/[A-Z]/g,(i,n)=>`${n>0?t:""}${i.toLowerCase()}`)}function J(e="",t=!1){const i=e.replace(/[-_\s](\w)/g,(n,r)=>r.toUpperCase());return t?i.replace(/^\w/,n=>n.toUpperCase()):i}function Q(e){return e.replace(/^-?[1-9]\d{0,2}(,\d{3})+/,t=>t.replace(/,/g,""))}function ee(e,t=!1){if(typeof e=="number")return e;if(typeof e=="string"){if(!t&&/^(-?\d+(?:\.\d+)?)\D*/.test(Q(e)))return ee(RegExp.$1,!0);const i=Number(e);return isNaN(i)?0:i}return 0}function Te(e){if(typeof e=="number")return[e,""];const t=Q(e).match(/^(-?\d+(?:\.\d+)?)(.*)$/);return t?[ee(t[1],!0),t[2]]:[0,""]}function te(e){return typeof e=="string"?e:e===null||typeof e>"u"?"":Array.isArray(e)?e.map(te).join(" "):typeof e=="object"?Object.keys(e).filter(t=>e[t]).join(" "):String(e)}function Le(...e){return e.map(te).filter(t=>!!t).join(" ")}function _(e,t=0){return Array.prototype.slice.call(e,t)}function ie(e={},t=!1){const i=t?J:Z,n={};for(const[r,s]of Object.entries(e))n[i(r)]=X(s)?ie(s,t):s;return n}function v(e,t=document){return e?e instanceof HTMLElement?e:t.querySelector(e):null}function N(e,t=document){return _(t.querySelectorAll(e))}function y(e,t={},i){const n=document.createElement(e);for(const[r,s]of Object.entries(t))n.setAttribute(Z(r),r==="style"&&X(s)?I(s):s);return i&&(Array.isArray(i)||(i=[i]),i.forEach(r=>{if(typeof r=="string"){const s=y("div");s.innerHTML=r,n.append(...s.childNodes)}else n.append(r)})),n}function I(...e){const t=e.reduce((n,r)=>j(j({},n),ie(r)),{}),i=[];for(const[n,r]of Object.entries(t))r===""||typeof r>"u"||r===null||i.push(`${n}:${r}`);return i.join(";")}T.exports.formatDate;T.exports.toDate;T.exports.toTwoDigits;const O=(e,t="style")=>e?(e.getAttribute(t)||"").split(/\s?;\s?/).reduce((n,r)=>{const[s,o]=r.split(/\s?:\s?/);return s&&(n[J(s)]=o),n},{}):{},A=e=>document.createTextNode(e),ne=e=>{if(!e)return null;if(typeof e=="string")return A(e);const{tag:t,attrs:i,child:n}=e;if(!t&&!i&&!n)return null;const r=y(t||"div",i);if(Array.isArray(n)&&n.length){let s;n.forEach(o=>{s=ne(o),s&&r.appendChild(s)})}else n&&typeof n=="string"&&r.appendChild(A(n));return r},He=(e,t)=>{e.classList.add(t)},Se=(e,t)=>{e.classList.remove(t)},De="sp-editor__editor",re="SECTION",Oe="BR",se=[re,"H1","H2","H3","H4","H5","BLOCKQUOTE","UL","OL"];function $(e,t,i){return e.replace(RegExp("(^<"+t+")|("+t+">$)","gi"),n=>n.toUpperCase().replace(t,i.toLowerCase()))}function Ae(e){return e.replace(/<li[^>]*>(.+)<\/li>/gi,"$1")}function S(e){const t=typeof e=="string"?e:e.nodeName;return/^UL|OL$/i.test(t)}function k(e){if(!e)return!1;const t=_(e.childNodes);return t.length===1&&t[0].nodeName==="BR"}function F(e){return e instanceof Element&&(e=e.outerHTML),/^<(\w+)[^>]*>.*<\/\1>$/.test(e)}function oe(e){return["PICTURE","VIDEO","AUDIO","CANVAS"].includes(e.nodeName)}function Pe(e){return["IMG"].includes(e.nodeName)||oe(e)}function ae(e){if(Pe(e))return!0;for(let t=0;t<e.children.length;t++)if(ae(e.children[t]))return!0;return!1}const Ie=(e,t)=>{const i={minHeight:e.minHeight,"--placeholder":JSON.stringify(e.placeholder),"--placeholder-color":e.placeholderColor,"--line-height":e.lineHeight,"--paragraph-spacing":e.paragraphTailSpacing,"--padding-bottom":e.paddingBottom,...e.styles};e.caretColor&&(i.caretColor=e.caretColor),e.textColor&&(i.color=e.textColor);const n={class:`${De} is-empty`,style:I(i)};return e.editable&&(n.contenteditable="true"),y("div",n,t)},U=(e,t)=>{var l,d,b,h,a,p,f,c,m;if(!e)return null;const i=e.nodeName,n=t.toUpperCase();if(i===n)return null;const r=y(t),s=e.parentElement;let o;if(i==="LI"&&S(s)){if(r.innerHTML=$(e.outerHTML,i,n),o=r.firstChild,s.childElementCount>1)if(s.firstElementChild===e)(l=s.parentElement)==null||l.insertBefore(o,s);else if(s.lastElementChild===e){const g=(d=s.parentElement)==null?void 0:d.nextElementSibling;g?(b=g.parentElement)==null||b.insertBefore(o,g):(h=s.parentElement)==null||h.append(o)}else{const g=_(s.children),w=y(s.nodeName);let E=g.shift();for(;E&&E!==e;)w.append(E),E=g.shift();(a=s.parentElement)==null||a.insertBefore(w,s),(p=s.parentElement)==null||p.insertBefore(o,s),s.removeChild(e)}else(f=s.parentElement)==null||f.insertBefore(o,s),(c=s.parentElement)==null||c.removeChild(s);return o}if(/UL|OL/.test(n)){const g=e.previousElementSibling,w=e.nextElementSibling;if(g&&S(g)){if(r.innerHTML=$(e.outerHTML,i,"li"),o=r.firstChild,g.append(o),s==null||s.removeChild(e),w&&w.nodeName===g.nodeName){const E=_(w.children);g.append(...E),(m=w.parentElement)==null||m.removeChild(w)}}else w&&S(w)?(r.innerHTML=$(e.outerHTML,i,"li"),o=r.firstChild,w.insertBefore(o,w.firstElementChild),s==null||s.removeChild(e)):(o=r,r.innerHTML=$(e.outerHTML,i,"li"),s==null||s.replaceChild(o,e))}else r.innerHTML=Ae($(e.outerHTML,i,n)),o=r.firstChild,s==null||s.replaceChild(o,e);return o},z=e=>{!e.innerText.trim()&&!ae(e)?e.classList.add("is-empty"):e.classList.remove("is-empty")};function Me(e,t,i=!1){var n;for(;e&&t!==e;){if(!i&&e.nodeName==="LI"&&((n=e.parentElement)==null?void 0:n.parentElement)===t||e.parentElement===t)return e;e=e.parentElement}return t.lastElementChild}const Re={editable:!0,minHeight:"50vh",paddingBottom:"50vh",placeholder:"\u8BF7\u5728\u6B64\u8F93\u5165\u5185\u5BB9..",placeholderColor:"#999",lineHeight:1.5,childNodeName:re,allowedNodeNames:se,paragraphTailSpacing:"10px",caretColor:"",textColor:"#333333",customPasteHandler:void 0,insertTextToNewParagraph:!1};class Be extends Ee{constructor(i){super();u(this,"version");u(this,"options");u(this,"$editor");u(this,"_cursorElement",null);u(this,"_eventHandler");u(this,"allowedNodeNames");u(this,"blankLine");u(this,"_pasteHandler");const n=typeof i.container=="string"?v(i.container):i.container;if(!n)throw new Error(`Can't found '${i.container}' Node in document!`);this.version="__VERSION__",this.options={...Re,...i},this.allowedNodeNames=(this.options.allowedNodeNames||se).map(s=>s.toUpperCase());const r=this.options.childNodeName.toUpperCase();this.options.childNodeName=r,this.blankLine=`<${r}><br></${r}>`,this.allowedNodeNames.includes(r)||this.allowedNodeNames.push(r),this.$editor=Ie(this.options,this.blankLine),n.append(this.$editor),this._eventHandler=s=>{const o=s.type;if(o==="blur"||o==="click"){const l=window.getSelection(),d=l&&l.rangeCount?l.getRangeAt(l.rangeCount-1).endContainer:s.currentTarget;this.setCursorElement(d),o==="blur"&&this._verifyChild()}this.emit(o==="input"?"change":o,s),z(this.$editor)},this._pasteHandler=s=>{var l;if(typeof this.options.customPasteHandler=="function")return this.options.customPasteHandler(s);s.preventDefault();const o=(l=s.clipboardData)==null?void 0:l.getData("text");this._insertText(o)},this._initEvents()}_initEvents(){this.$editor.addEventListener("focus",this._eventHandler),this.$editor.addEventListener("blur",this._eventHandler),this.$editor.addEventListener("input",this._eventHandler),this.$editor.addEventListener("click",this._eventHandler),this.$editor.addEventListener("paste",this._pasteHandler)}use(i,n){typeof i.install=="function"&&i.install(this,n)}setHtml(i){this.$editor.innerHTML=this.blankLine,this.insert(i,!0),this._verifyChild(),z(this.$editor)}getHtml(i){const n=this.$editor.innerHTML;if(i)return n;const r=this.options.childNodeName;return n.replace(new RegExp(`(<${r}><br\\s?\\/?><\\/${r}>)+$`,"i"),"")}insert(i,n=!1){if(i instanceof HTMLElement)this._insertEl(i);else{const r=y("div",{},i),s=_(r.childNodes);if(!n&&!this.options.insertTextToNewParagraph&&s.every(o=>o.nodeType===Node.TEXT_NODE))return this._insertText(i);s.forEach(o=>{o.nodeType===Node.ELEMENT_NODE?o.nodeName===Oe?this._insertEl(y(this.options.childNodeName,{},"<br/>")):this._insertEl(o):o.textContent&&this._insertEl(y(this.options.childNodeName,{},o.textContent))})}this._dispatchChange(),this._verifyChild()}_insertEl(i){const n=this.getCursorElement();k(n)?F(i.outerHTML)?this.$editor.insertBefore(i,n):(n.innerHTML="",n.append(i)):this.$editor.insertBefore(i,n.nextElementSibling),this.setCursorElement(i)}_insertText(i){if(!i)return;const n=window.getSelection(),r=n==null?void 0:n.rangeCount;if(!r)return this.insert(i,!0);n.deleteFromDocument(),n.getRangeAt(0).insertNode(A(i)),this.setCursorElement(n.getRangeAt(r-1).endContainer),n.collapseToEnd(),this._dispatchChange()}_verifyChild(){const i=this.getCursorElement(!0),n=this.options.childNodeName;let r,s=!1,o=0;for(;o<this.$editor.childNodes.length;){if(r=this.$editor.childNodes[o++],r.nodeType===Node.ELEMENT_NODE){if(F(r)){if(this.allowedNodeNames.includes(r.nodeName))continue;if(s=i===r,!oe(r)){const l=U(r,n);s&&l&&this.setCursorElement(l);continue}}r.replaceWith(y(n,{},r.cloneNode(!0)))}else{const l=y(n,{},r.cloneNode(!0));this.$editor.replaceChild(l,r)}console.log(o,r.nodeName,r.nodeType)}k(this.$editor.lastElementChild)||this.$editor.appendChild(y(n,{},"<br>"))}changeNodeName(i){if(i=(i||this.options.childNodeName).toUpperCase(),!this.allowedNodeNames.includes(i))return!1;const n=this.getCursorElement(),r=U(n,i);return r?(this.setCursorElement(r),this._dispatchChange(),!0):!1}changeStyles(i,n){const r=this.getCursorElement(!0);if(r){const s=O(r);if(i){const o=typeof i=="string"?{[i]:n}:i;r.setAttribute("style",I(s,o))}else{if(!Object.keys(s).length)return;r.removeAttribute("style")}this._dispatchChange()}}_dispatchChange(){this.$editor.dispatchEvent(new InputEvent("input"))}getStyles(){return O(this.getCursorElement())}setCursorElement(i){if(i instanceof Node)for(;i;){if(i.nodeType===Node.ELEMENT_NODE){this._cursorElement=i;break}i=i.parentElement}else i&&(this._cursorElement=i)}getCursorElement(i=!1){return Me(this._cursorElement,this.$editor,i)}destroy(){this.$editor.removeEventListener("focus",this._eventHandler),this.$editor.removeEventListener("blur",this._eventHandler),this.$editor.removeEventListener("input",this._eventHandler),this.$editor.removeEventListener("paste",this._pasteHandler),this.removeAllListeners()}}const je=["#333333","#d0d0d0","#ff583d","#fdaa25","#44c67b","#14b2e0","#b065e2"],ke={tag:"dl",attrs:{class:"__style-wrapper border-bottom"},child:[{tag:"dd",attrs:{style:"font-weight: 800;","data-style":"fontWeight:800"},child:["B"]},{tag:"dd",attrs:{style:"font-style: italic;","data-style":"fontStyle:italic"},child:["I"]},{tag:"dd",attrs:{style:"text-decoration: line-through;","data-style":"textDecoration:line-through"},child:["abc"]},{tag:"dd",attrs:{style:"","data-style":"textAlign:left",class:"text-align--l"}},{tag:"dd",attrs:{style:"","data-style":"textAlign:center",class:"text-align--c"}},{tag:"dd",attrs:{style:"","data-style":"textAlign:right",class:"text-align--r"}}]},W={tag:"dl",attrs:{class:"__tag-wrapper"},child:[{tag:"dd",attrs:{class:"__h2","data-tag":"h2"},child:["\u5927\u6807\u9898",{tag:"i"}]},{tag:"dd",attrs:{class:"__h4","data-tag":"h4"},child:["\u5C0F\u6807\u9898",{tag:"i"}]},{tag:"dd",attrs:{class:"__section active","data-tag":"section"},child:["\u6B63\u6587",{tag:"i"}]},{tag:"dd",attrs:{class:"__blockquote","data-tag":"blockquote"},child:["\u5F15\u7528",{tag:"i"}]},{tag:"dd",attrs:{class:"__ul","data-tag":"ul"},child:["\u65E0\u5E8F\u5217\u8868",{tag:"i"}]}]},Fe=e=>{const t=[];return e.forEach((i,n)=>{/^#\w{3,6}$/.test(i)&&t.push({tag:"dd",attrs:{class:n===0?"active":"","data-color":Ue(i.toLowerCase())},child:[{tag:"i",attrs:{style:`background:${i}`}}]})}),t},Ue=e=>e.length===7?e:`#${e[1]}${e[1]}${e[2]}${e[2]}${e[3]}${e[3]}`,ze={textStyleColors:[...je],textStyleTitle:"Set Style",textStyleHeadLeftBtnText:"Clear"};const x="style-panel",D=`${x}__fade-in`;class We{constructor(t){u(this,"editorInstance",null);u(this,"$el");u(this,"options");u(this,"_headerSwitchHandler");u(this,"_headerLeftHandler");u(this,"$elMap",new Map);u(this,"_styleHandler");u(this,"_colorHandler");u(this,"_tagHandler");const i={...ze,...t};this.options=i,this.$el=y("div",{class:`${x} border-top`}),this._styleHandler=n=>{const r=this.editorInstance,s=n.currentTarget,o=O(s,"data-style"),l=r.getStyles();Object.keys(o).forEach(d=>{l[d]&&(o[d]="")}),r.changeStyles(o)},this._colorHandler=n=>{const r=n.currentTarget;if(this.updateActiveClassName(r)){const s=this.editorInstance,o=r.getAttribute("data-color");s.changeStyles({color:o})}},this._tagHandler=n=>{const r=n.currentTarget;if(this.updateActiveClassName(r)){const s=this.editorInstance,o=r.getAttribute("data-tag");s.changeNodeName(o)}},this._headerLeftHandler=()=>{const n=this.editorInstance,{textColor:r,childNodeName:s}=n.options;n.changeStyles(),n.changeNodeName(),this.updateActiveClassName(v(`[data-color="${r}"]`,this.$el)),this.updateActiveClassName(v(`[data-tag="${s}"]`,this.$el))},this._headerSwitchHandler=()=>{this.$el.classList.contains(D)?this.hide():this.show()}}_initChildEl(t){const{textColor:i,childNodeName:n}=t,{textStyleTitle:r,textStyleHeadLeftBtnText:s,textStyleColors:o}=this.options,l=y("div",{class:`${x}__header`},r),d=y("div",{class:"__left"},s),b=y("div",{class:"__switch"});l.append(d,b);const h=[ke],a=o;if(a.length){i&&!a.includes(i)&&a.unshift(i);const m={tag:"dl",attrs:{class:"__color-wrapper border-bottom"},child:Fe(a)};h.push(m)}const p={...W,child:[...W.child]},f=n.toLowerCase();p.child.forEach(m=>{const g=m.attrs["data-tag"];g==="section"&&g!==f&&(m.attrs["data-tag"]=f)}),h.push(p);const c=ne({tag:"div",attrs:{class:`${x}__body`},child:h});this.$el.append(l,c),N(".__style-wrapper dd",c).forEach(m=>{m.addEventListener("click",this._styleHandler)}),N(".__color-wrapper dd",c).forEach(m=>{m.addEventListener("click",this._colorHandler)}),N(".__tag-wrapper dd",c).forEach(m=>{m.addEventListener("click",this._tagHandler)}),d.addEventListener("click",this._headerLeftHandler),b.addEventListener("click",this._headerSwitchHandler),this.$elMap.set(d,this._headerLeftHandler),this.$elMap.set(b,this._headerSwitchHandler)}install(t,i){this.editorInstance=t,i&&i.append(this.$el),this._initChildEl(t.options),t.on("click",()=>{const{textColor:n,childNodeName:r}=t.options,s=t.getStyles();this.updateActiveClassName(v(`[data-color="${s.color||n}"]`,this.$el));const o=t.getCursorElement(!0).nodeName.toLowerCase();this.updateActiveClassName(v(`[data-tag="${o||r}"]`,this.$el))})}show(){this.$el.classList.add(D)}hide(){this.$el.classList.remove(D)}updateActiveClassName(t){return t.classList.contains("active")?!1:(v(".active",t.parentElement).classList.remove("active"),t.classList.add("active"),!0)}destroy(){this.$elMap.forEach((t,i)=>{i.removeEventListener("click",t)})}}const Ge={toolbarBeenFixed:!0,toolbarHeight:"50px",toolbarButtons:["choose-picture","text-style"]},Ve=34;class qe{constructor(t){u(this,"editorInstance",null);u(this,"visible");u(this,"options");u(this,"$el");u(this,"_btnClickHandler");this.options={...Ge,...t},this.visible=this.options.toolbarBeenFixed;const[i,n]=Te(this.options.toolbarHeight);this.$el=y("div",{class:"sp-editor__toolbar border-top",style:{"--bar-height":`${i}${n}`,height:`${i+(ve()?Ve:0)}${n}`}},'<dl class="inner-wrapper"></dl>'),this._btnClickHandler=r=>{const s=r.currentTarget;this.editorInstance&&s&&this.editorInstance.emit("toolbarButtonOnClick",s.getAttribute("data-name"))},this.options.toolbarButtons.forEach(r=>{this.addButton({name:r})})}install(t,i){this.editorInstance=t,i&&i.append(this.$el),this.visible&&this.show()}show(){He(this.$el,"__fade-in"),this.visible=!0,this.editorInstance.emit("toolbarShow",!0,this)}hide(){Se(this.$el,"__fade-in"),this.visible=!1,this.editorInstance.emit("toolbarShow",!1,this)}addButton(t,i){const n={...t.style},r=y("dd",{class:Le("icon-item",t.className),dataName:t.name,style:n},t.innerHtml),s=N("dd",this.$el),o=v("dl",this.$el);typeof i=="number"&&i>=0&&i<s.length?o.insertBefore(r,s[i]):o.append(r),r.addEventListener("click",this._btnClickHandler)}destroy(){N(".icon-item",this.$el).forEach(t=>{t.removeEventListener("click",this._btnClickHandler)})}}/*!
 * image-process version 4.2.1
 * Author: Capricorncd <capricorncd@qq.com>
 * Repository: https://github.com/capricorncd/image-process-tools
 * Released on: 2022-07-23 16:12:35 (GMT+0900)
 *//*!
 * zx-sml version 0.2.0
 * Author: Capricorncd <capricorncd@qq.com>
 * Repository: https://github.com/capricorncd/zx-sml
 * Released on: 2022-07-13 22:46:38 (GMT+0900)
 */var Ye=Object.defineProperty,G=Object.getOwnPropertySymbols,Ke=Object.prototype.hasOwnProperty,Xe=Object.prototype.propertyIsEnumerable,V=(e,t,i)=>t in e?Ye(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i,q=(e,t)=>{for(var i in t||(t={}))Ke.call(t,i)&&V(e,i,t[i]);if(G)for(var i of G(t))Xe.call(t,i)&&V(e,i,t[i]);return e};function Ze(e){return Array.isArray(e)}function le(e){return e!==null&&!Ze(e)&&typeof e=="object"}var Je=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},L={exports:{}};/*! For license information please see date-utils-2020.js.LICENSE.txt */(function(e,t){(function(i,n){e.exports=n()})(typeof self<"u"?self:Je,function(){return(()=>{var i={949:(r,s)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.toTwoDigits=void 0,s.toTwoDigits=function(o){return o[1]?o:"0"+o}},607:(r,s,o)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.toTwoDigits=s.toDate=s.formatDate=void 0;var l=o(949);Object.defineProperty(s,"toTwoDigits",{enumerable:!0,get:function(){return l.toTwoDigits}});var d={weeks:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]};function b(h){if(h instanceof Date)return h;if(typeof h=="number")return new Date(h);if(typeof h=="string"){var a=h.trim();if(/^\d+$/.test(a)){var p=a.length;return p===8?new Date([a.substr(0,4),a.substr(4,2),a.substr(6,2)].join("/")):p===6?new Date([a.substr(0,4),a.substr(4,2),"01"].join("/")):p===4?new Date(a+"/01/01"):new Date(parseInt(h))}if(a=a.replace(/[年月日]/g,function(c){return c==="\u65E5"?"":"/"}).replace(/[(（（].*?[)））]/g," ").replace(/\bam|pm\b/gi," ").replace(/\s+/g," "),/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/.test(a))return new Date([RegExp.$1,RegExp.$2,RegExp.$3].join("/"));if(/^(\d{4})[-/](\d{1,2})$/.test(a))return new Date([RegExp.$1,RegExp.$2,"01"].join("/"));var f=new Date(a);return isNaN(f.getFullYear())?null:f}return null}s.formatDate=function(h,a,p){var f,c=b(h);if(!c||!a)return h+"";if(a==="timestamp")return c.getTime().toString();/(y+)/i.test(a)&&(f=RegExp.$1,a=a.replace(f,(c.getFullYear()+"").substr(4-f.length))),p&&Array.isArray(p.weeks)||(p=d);var m={"M+":c.getMonth()+1,"d+":c.getDate(),"h+":c.getHours(),"m+":c.getMinutes(),"s+":c.getSeconds(),"w+":c.getDay(),"W+":p.weeks[c.getDay()],"a+":c.getHours()<12?"am":"pm","A+":c.getHours()<12?"AM":"PM"};for(var g in m)if(new RegExp("("+g+")").test(a)){f=RegExp.$1;var w=m[g]+"";a=a.replace(f,f.length===1?w:l.toTwoDigits(w))}if(/(g)/i.test(a)){var E=c.toString().split(/\s+/).slice(5),H=a.includes("g");a=a.replace(/g/i,H?E[0]:E.join(" "))}return a},s.toDate=b}},n={};return function r(s){if(n[s])return n[s].exports;var o=n[s]={exports:{}};return i[s](o,o.exports,r),o.exports}(607)})()})})(L);function ce(e="",t="-"){return e.replace(/[A-Z]/g,(i,n)=>`${n>0?t:""}${i.toLowerCase()}`)}function Qe(e="",t=!1){const i=e.replace(/[-_\s](\w)/g,(n,r)=>r.toUpperCase());return t?i.replace(/^\w/,n=>n.toUpperCase()):i}function de(e={},t=!1){const i=t?Qe:ce,n={};for(const[r,s]of Object.entries(e))n[i(r)]=le(s)?de(s,t):s;return n}function he(e,t=!1,i=2){const n=["KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"],r=t?1e3:1024;let s=String(e),o="Byte";for(let l=0,d=e/r;d>1;d/=r,l++)s=d.toFixed(i),o=n[l];return t&&(o=o.replace("i","")),{text:s.replace(/\.0+$/,"")+o,value:+s,unit:o,bytes:e}}function et(e,t={},i){const n=document.createElement(e);for(const[r,s]of Object.entries(t))n.setAttribute(ce(r),r==="style"&&le(s)?tt(s):s);return i&&(typeof i=="string"?n.innerHTML=i:n.append(i)),n}function tt(...e){const t=e.reduce((n,r)=>q(q({},n),de(r)),{}),i=[];for(const[n,r]of Object.entries(t))r===""||typeof r>"u"||r===null||i.push(`${n}:${r}`);return i.join(";")}function it(e){return new Promise((t,i)=>{const n=new FileReader;n.onload=r=>{var s;const o=(s=r.target)==null?void 0:s.result;o?t(o):i(new Error(`FileReader's result is null, ${r.target}`))},n.onerror=i,n.readAsDataURL(e)})}function ue(e){return(window.URL||window.webkitURL).createObjectURL(e)}function fe(e){const t=e.split(",");let i="";return/data:(\w+\/\w+);base64/.test(t[0])&&(i=RegExp.$1),{type:i,data:t[1]}}function pe(e,t){const i=fe(e),n=window.atob(i.data);t=t||i.type;const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return new Blob([r],{type:t})}L.exports.formatDate;L.exports.toDate;L.exports.toTwoDigits;const nt={enableDevicePixelRatio:!1,isForce:!1,mimeType:"image/jpeg",perResize:500,quality:.9,width:0,height:0,longestSide:0},rt=/^data:(.+?);base64/,st=/^image\/.+/;function ot(e,t){return new Promise((i,n)=>{const r={...nt,...t};typeof e=="string"&&rt.test(e)?Y(e,r,i,n):(e instanceof File||e instanceof Blob)&&st.test(e.type)?it(e).then(s=>{Y(s,r,i,n)}).catch(n):n(new Error(`Invalid file, ${e}`))})}function Y(e,t,i,n){const{type:r}=fe(e),s=pe(e,r),o=new Image;o.onload=()=>{const l={element:o,blob:s,data:e,url:ue(s),width:o.naturalWidth||o.width,height:o.naturalHeight||o.height,type:r,size:he(s.size)};t.cropInfo&&t.cropInfo.sw&&t.cropInfo.sh?K(l,t,i,n,{...t.cropInfo,dx:0,dy:0,dw:t.cropInfo.sw,dh:t.cropInfo.sh}):t.width>0&&t.height>0?K(l,t,i,n,lt(l,t)):t.width>0||t.height>0||t.longestSide>0?at(l,t,i,n):P({...l,raw:l},t,i)},o.onerror=n,o.src=e}function K(e,t,i,n,r){try{Object.prototype.hasOwnProperty.call(r,"enableDevicePixelRatio")||(r.enableDevicePixelRatio=t.enableDevicePixelRatio);const s=M(e.element,{enableDevicePixelRatio:t.enableDevicePixelRatio,sx:r.sx,sy:r.sy,sw:r.sw,sh:r.sh,dx:0,dy:0,dw:r.sw,dh:r.sh});!t.width&&!t.height?t.longestSide?r.sw>r.sh?(t.width=t.longestSide,t.height=r.sh*t.width/r.sw):(t.height=t.longestSide,t.width=r.sw*t.height/r.sh):(t.width=r.sw,t.height=r.sh):t.width?t.height=r.sh*t.width/r.sw:t.width=r.sw*t.height/r.sh,ge(s,e,t,{...r,sx:0,sy:0,sw:s.width,sh:s.height},i)}catch(s){n(s)}}function at(e,t,i,n){try{t.longestSide>0&&!t.width&&!t.height&&(e.width>=e.height?t.width=t.longestSide:t.height=t.longestSide);const r={enableDevicePixelRatio:t.enableDevicePixelRatio,sx:0,sy:0,sw:e.width,sh:e.height,dx:0,dy:0,dw:t.width,dh:t.height};if(t.width>0){if(e.width<t.width&&!t.isForce){P({...e,raw:e},t,i);return}r.dh=e.height*t.width/e.width,t.height=r.dh}else{if(e.height<t.height&&!t.isForce){P({...e,raw:e},t,i);return}r.dw=e.width*t.height/e.height,t.width=r.dw}ge(e.element,e,t,r,i)}catch(r){n(r)}}function P(e,t,i){e.type!==t.mimeType?(e.type=t.mimeType,me(e.element,e.raw,t,{enableDevicePixelRatio:t.enableDevicePixelRatio,sx:0,sy:0,sw:e.width,sh:e.height,dx:0,dy:0,dw:e.width,dh:e.height},i)):i(e)}function ge(e,t,i,n,r){let s=t.width>t.height?t.width-n.dw:t.height-n.dh;if(s>i.perResize){const o=t.height/t.width;for(;s>i.perResize;)s-=i.perResize,n.sw=e.width,n.sh=e.height,n.dw=i.width+s,n.dh=n.dw*o,e=M(e,n)}n.sw=e.width,n.sh=e.height,n.dw=i.width,n.dh=i.height,me(e,t,i,n,r)}function me(e,t,i,n,r){const s=M(e,n),o=/^\w+\/\*$/.test(i.mimeType)||!i.mimeType?t.type:i.mimeType,l=s.toDataURL(o,i.quality),d=pe(l,o);r({element:s,type:o,width:s.width,height:s.height,blob:d,data:l,url:ue(d),size:he(d.size),raw:t})}function lt(e,t){const{width:i,height:n}=e,{width:r,height:s}=t;let o;const l=n*r/s;if(i>l)o={sx:(i-l)/2,sy:0,sw:l,sh:n};else{const d=i*s/r;o={sx:0,sy:(n-d)/2,sw:i,sh:d}}return{...o,dx:0,dy:0,dw:r,dh:s}}function M(e,t){const i=t.enableDevicePixelRatio&&window.devicePixelRatio||1,n=et("canvas");n.width=t.dw*i,n.height=t.dh*i;const r=n.getContext("2d");return r.scale(i,i),r.drawImage(e,t.sx,t.sy,t.sw,t.sh,t.dx,t.dy,t.dw,t.dh),n}const ct={imageMaxWidth:750,ignoreGif:!0,forceImageResize:!1,chooseFileMultiple:!0,chooseFileAccept:"image/*"};class dt extends Be{constructor(i,n={}){let r=null;if(typeof i=="string"||i instanceof HTMLElement?r=v(i):(n=i||{},typeof n.container=="string"&&(r=v(n.container))),n={...ct,...n},!r)throw new Error(`Can't found '${i}' Node in document!`);const s=y("div",{class:"sp-editor"});super({...n,container:s});u(this,"$el");u(this,"stylePanel");u(this,"toolbar");u(this,"fileInput",null);u(this,"_inputChangeHandler");r.append(s),this.$el=s,this.stylePanel=new We(n),this.use(this.stylePanel,this.$el),this.toolbar=new qe(n),this.use(this.toolbar,this.$el),this._inputChangeHandler=o=>{const l=o.currentTarget;this.handleImageFile(l.files).then(d=>{d.forEach(b=>{const h=/gif$/i.test(b.raw.type)&&n.ignoreGif;this.insert(`<img src="${h?b.raw.data:b.data}">`)})}).catch(d=>{this.emit("error",d)})},this.on("toolbarButtonOnClick",o=>{switch(o){case"choose-picture":if(typeof n.customPictureHandler=="function")n.customPictureHandler();else if(this.fileInput)this.fileInput.click();else{const l={type:"file",style:{display:"none"},accept:n.chooseFileAccept};n.chooseFileMultiple&&(l.multiple=!0),this.fileInput=y("input",l),this.$el.append(this.fileInput),this.fileInput.addEventListener("change",this._inputChangeHandler),this.fileInput.click()}break;case"text-style":this.stylePanel.show();break}})}handleImageFile(i){return i?new Promise((n,r)=>{Promise.all(_(i).map(this._handleFile)).then(s=>{n(s.sort((o,l)=>o.index-l.index).map(o=>o.data))}).catch(r)}):Promise.resolve([])}_handleFile(i,n){return new Promise((r,s)=>{ot(i).then(o=>{r({data:o,index:n})}).catch(s)})}addToolbarButton(i,n){this.toolbar.addButton(i,n)}destroy(){var i;super.destroy(),this.stylePanel.destroy(),this.toolbar.destroy(),(i=this.fileInput)==null||i.removeEventListener("change",this._inputChangeHandler)}}window.vConsole=new window.VConsole;const C=new dt({container:"#app"});C.addToolbarButton({name:"github",innerHtml:'<svg style="width:28px;height:auto" width="24" height="24" viewBox="0 0 16 16" version="1.1" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>',style:{opacity:.4}});C.on("toolbarButtonOnClick",e=>{e==="github"&&window.open("https://github.com/capricorncd/zx-editor")});C.on("change",e=>{});C.on("error",e=>{console.log("error",e)});window.editor=C;window.spEditor=C;
