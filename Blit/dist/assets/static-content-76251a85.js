import{T as f,x as $,i as y,e as g}from"./index-08b03a7b.js";import"https://cdn.jsdelivr.net/gh/zerodevx/zero-md@2/dist/zero-md.min.js";import{B as w}from"./blit-page-dde4639e.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const P=(s,t)=>t.kind==="method"&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(e){e.createProperty(t.key,s)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){typeof t.initializer=="function"&&(this[t.key]=t.initializer.call(this))},finisher(e){e.createProperty(t.key,s)}},O=(s,t,e)=>{t.constructor.createProperty(e,s)};function T(s){return(t,e)=>e!==void 0?O(s,t,e):P(s,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function E(s){return T({...s,state:!0})}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const N=s=>s===null||typeof s!="object"&&typeof s!="function",b=s=>s.strings===void 0;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const z={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},M=s=>(...t)=>({_$litDirective$:s,values:t});let x=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _=(s,t)=>{var e,i;const n=s._$AN;if(n===void 0)return!1;for(const r of n)(i=(e=r)._$AO)===null||i===void 0||i.call(e,t,!1),_(r,t);return!0},d=s=>{let t,e;do{if((t=s._$AM)===void 0)break;e=t._$AN,e.delete(s),s=t}while((e==null?void 0:e.size)===0)},A=s=>{for(let t;t=s._$AM;s=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(s))break;e.add(s),G(t)}};function B(s){this._$AN!==void 0?(d(this),this._$AM=s,A(this)):this._$AM=s}function D(s,t=!1,e=0){const i=this._$AH,n=this._$AN;if(n!==void 0&&n.size!==0)if(t)if(Array.isArray(i))for(let r=e;r<i.length;r++)_(i[r],!1),d(i[r]);else i!=null&&(_(i,!1),d(i));else _(this,s)}const G=s=>{var t,e,i,n;s.type==z.CHILD&&((t=(i=s)._$AP)!==null&&t!==void 0||(i._$AP=D),(e=(n=s)._$AQ)!==null&&e!==void 0||(n._$AQ=B))};let I=class extends x{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,i){super._$AT(t,e,i),A(this),this.isConnected=t._$AU}_$AO(t,e=!0){var i,n;t!==this.isConnected&&(this.isConnected=t,t?(i=this.reconnected)===null||i===void 0||i.call(this):(n=this.disconnected)===null||n===void 0||n.call(this)),e&&(_(this,t),d(this))}setValue(t){if(b(this._$Ct))this._$Ct._$AI(t,this);else{const e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Y{constructor(t){this.G=t}disconnect(){this.G=void 0}reconnect(t){this.G=t}deref(){return this.G}}class k{constructor(){this.Y=void 0,this.Z=void 0}get(){return this.Y}pause(){var t;(t=this.Y)!==null&&t!==void 0||(this.Y=new Promise(e=>this.Z=e))}resume(){var t;(t=this.Z)===null||t===void 0||t.call(this),this.Y=this.Z=void 0}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const v=s=>!N(s)&&typeof s.then=="function",p=1073741823;class H extends I{constructor(){super(...arguments),this._$C_t=p,this._$Cwt=[],this._$Cq=new Y(this),this._$CK=new k}render(...t){var e;return(e=t.find(i=>!v(i)))!==null&&e!==void 0?e:f}update(t,e){const i=this._$Cwt;let n=i.length;this._$Cwt=e;const r=this._$Cq,c=this._$CK;this.isConnected||this.disconnected();for(let o=0;o<e.length&&!(o>this._$C_t);o++){const l=e[o];if(!v(l))return this._$C_t=o,l;o<n&&l===i[o]||(this._$C_t=p,n=0,Promise.resolve(l).then(async m=>{for(;c.get();)await c.get();const a=r.deref();if(a!==void 0){const u=a._$Cwt.indexOf(l);u>-1&&u<a._$C_t&&(a._$C_t=u,a.setValue(m))}}))}return f}disconnected(){this._$Cq.disconnect(),this._$CK.pause()}reconnected(){this._$Cq.reconnect(this),this._$CK.resume()}}const K=M(H);var R=Object.defineProperty,U=Object.getOwnPropertyDescriptor,j=Object.getPrototypeOf,q=Reflect.get,C=(s,t,e,i)=>{for(var n=i>1?void 0:i?U(t,e):t,r=s.length-1,c;r>=0;r--)(c=s[r])&&(n=(i?c(t,e,n):c(n))||n);return i&&n&&R(t,e,n),n},L=(s,t,e)=>q(j(s),e,t);let h=class extends w{constructor(){super(...arguments),this.render=()=>$`
        <page-title>${this.page}</page-title>
        <div class="w-full h-full">
            ${K(this.loadContent(),$`<awesome-loader></awesome-loader>`)}
        </div>
    `}async onBeforeEnter(s){this.page=s.params.static}async loadContent(){return(await fetch(`/content/${this.page}.md`,{method:"HEAD"}).catch()).ok?$`<zero-md src="/content/${this.page}.md"}></zero-md>`:$`<not-found></not-found>`}};h.styles=[...L(h,h,"styles"),y``];C([E()],h.prototype,"page",2);h=C([g("static-content")],h);export{h as StaticContent};
