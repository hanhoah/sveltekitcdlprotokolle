import{s as v,e as d,c as p,b as k,f,l as b,i as $,m as y}from"../chunks/scheduler.TcPaG1AO.js";import{S as B,i as E,t as c,c as L,a as m,b as S,d as q,m as w,e as C,g as I}from"../chunks/index.eDZ0B_bf.js";import{e as h}from"../chunks/each.D6YF6ztN.js";import{B as P}from"../chunks/book.D_yoPbWw.js";function _(s,l,a){const n=s.slice();return n[1]=l[a],n}function g(s){let l,a,n;return a=new P({props:{book:{id:s[1].id,title:s[1].title,img:s[1].img}}}),{c(){l=d("li"),S(a.$$.fragment),this.h()},l(t){l=p(t,"LI",{class:!0});var i=k(l);q(a.$$.fragment,i),i.forEach(f),this.h()},h(){b(l,"class","my-2")},m(t,i){$(t,l,i),w(a,l,null),n=!0},p(t,i){const e={};i&1&&(e.book={id:t[1].id,title:t[1].title,img:t[1].img}),a.$set(e)},i(t){n||(c(a.$$.fragment,t),n=!0)},o(t){m(a.$$.fragment,t),n=!1},d(t){t&&f(l),C(a)}}}function U(s){let l,a,n=h(s[0].books),t=[];for(let e=0;e<n.length;e+=1)t[e]=g(_(s,n,e));const i=e=>m(t[e],1,1,()=>{t[e]=null});return{c(){l=d("ul");for(let e=0;e<t.length;e+=1)t[e].c();this.h()},l(e){l=p(e,"UL",{class:!0});var r=k(l);for(let o=0;o<t.length;o+=1)t[o].l(r);r.forEach(f),this.h()},h(){b(l,"class","grid grid-cols-2 md:grid-cols-3")},m(e,r){$(e,l,r);for(let o=0;o<t.length;o+=1)t[o]&&t[o].m(l,null);a=!0},p(e,[r]){if(r&1){n=h(e[0].books);let o;for(o=0;o<n.length;o+=1){const u=_(e,n,o);t[o]?(t[o].p(u,r),c(t[o],1)):(t[o]=g(u),t[o].c(),c(t[o],1),t[o].m(l,null))}for(I(),o=n.length;o<t.length;o+=1)i(o);L()}},i(e){if(!a){for(let r=0;r<n.length;r+=1)c(t[r]);a=!0}},o(e){t=t.filter(Boolean);for(let r=0;r<t.length;r+=1)m(t[r]);a=!1},d(e){e&&f(l),y(t,e)}}}function j(s,l,a){let{data:n}=l;return s.$$set=t=>{"data"in t&&a(0,n=t.data)},[n]}class G extends B{constructor(l){super(),E(this,l,j,U,v,{data:0})}}export{G as component};