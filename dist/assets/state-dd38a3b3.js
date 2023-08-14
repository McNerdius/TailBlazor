/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const e=(r,i)=>i.kind==="method"&&i.descriptor&&!("value"in i.descriptor)?{...i,finisher(t){t.createProperty(i.key,r)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:i.key,initializer(){typeof i.initializer=="function"&&(this[i.key]=i.initializer.call(this))},finisher(t){t.createProperty(i.key,r)}},n=(r,i,t)=>{i.constructor.createProperty(t,r)};function o(r){return(i,t)=>t!==void 0?n(r,i,t):e(r,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function c(r){return o({...r,state:!0})}export{o as n,c as t};
