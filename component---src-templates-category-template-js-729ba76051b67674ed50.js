"use strict";(self.webpackChunkslowteady_io=self.webpackChunkslowteady_io||[]).push([[501],{7855:function(e,t,a){a.r(t),a.d(t,{default:function(){return u}});var n=a(7294),r=a(4854),s=a(4218),l=a(7743),c=a(9674);var o=function(e){let{title:t,subtitle:a}=e;return n.createElement("div",{className:"category-page-header-wrapper"},n.createElement("div",{className:"category-page-title"},t),n.createElement("div",{className:"category-page-subtitle"},a))},i=a(2237);var u=function(e){let{pageContext:t}=e;const{edges:a,currentCategory:u}=t,{categories:g}=t,p=(0,n.useMemo)((()=>g.findIndex((e=>e===u))),[g,u]),d=a.map((e=>{let{node:t}=e;return new c.Z(t)})),m=(0,n.useCallback)(((e,t)=>{if(0===t)return(0,r.navigate)("/posts");(0,r.navigate)("/posts/"+g[t])}),[g]);return n.createElement(s.Z,null,n.createElement(l.Z,{title:"Posts"}),n.createElement(o,{title:g[p],subtitle:d.length+" posts"}),n.createElement(i.Z,{tabIndex:p,onChange:m,tabs:g,posts:d}))}}}]);
//# sourceMappingURL=component---src-templates-category-template-js-729ba76051b67674ed50.js.map