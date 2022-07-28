/*!
 * @zx-editor/event-emitter version 1.0.0
 * Author: Capricorncd
 * Released under the MIT License
 * Repository: https://github.com/capricorncd/zx-editor
 * Released on: 2022-07-28 21:55:39 (GMT+0900)
 * Copyright © 2018-present, Capricorncd
 */
(function(n,o){typeof exports=="object"&&typeof module<"u"?o(exports):typeof define=="function"&&define.amd?define(["exports"],o):(n=typeof globalThis<"u"?globalThis:n||self,o(n.EventEmitter={}))})(this,function(n){"use strict";class o{constructor(){this._events={}}on(t,e){return!t||!e||typeof e!="function"?this:(this._events[t]||(this._events[t]=[]),this._events[t].push(e),this)}once(t,e){const i=(...s)=>{e.apply(this,s),this.off(t,i)};return this.on(t,i)}emit(t,...e){const i=this._events[t];if(!i)return this;for(let s=0;s<i.length;s++)try{i[s].apply(this,e)}catch(r){this.emit("error",r,"emit")}return this}off(t,e){if(!this._events[t])return this;const i=this._events[t];if(typeof e=="function"){const s=i.findIndex(r=>r===e);s>=0&&i.splice(s,1)}else this._events[t].length=0;return this._removeEmpty(t),this}_removeEmpty(t){this._events[t].length||delete this._events[t]}removeAllListeners(){Object.keys(this._events).forEach(t=>this.off(t))}}n.EventEmitter=o,Object.defineProperties(n,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
