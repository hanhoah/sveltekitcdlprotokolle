import{s as ee,d as De,c as Ve,h as M,u as ne,S as se}from"../chunks/books.BjRiXvPo.js";import{s as Ce,e as g,a as V,t as S,M as Ie,c as b,b as $,f as c,g as C,d as x,N as Ee,L as me,l as u,E as ge,i as _,h as m,j as oe,n as f,o as H,m as re}from"../chunks/scheduler.TcPaG1AO.js";import{e as O}from"../chunks/each.D6YF6ztN.js";import{S as Le,i as Se,t as w,a as E,g as ye,c as Be,b as z,d as G,m as U,e as J}from"../chunks/index.eDZ0B_bf.js";import{B as xe}from"../chunks/Button.yyXqLmPo.js";import{g as He,B as je}from"../chunks/book.D_yoPbWw.js";async function qe(o){try{const{data:l}=await ee.from("books").select("*").eq("id",o).limit(1).single();return{data:l}}catch{return{}}}async function Fe(o){try{const{data:l}=await ee.from("booklinks").select("label, link").eq("book_id",o);return l}catch{return{}}}async function Ne(o){const{data:l,error:a}=await ee.from("books_hashtags").select("hashtag_id").eq("book_id",o);if(a)throw new Error("Fehler beim Abrufen der Hashtags: "+a.message);return l.map(e=>e.hashtag_id)}async function Te(o){const{data:l,error:a}=await ee.from("hashtags").select("tag").in("id",o);if(a)throw new Error("Fehler beim Abrufen der Hashtags: "+a.message);return l}async function Ae({params:o}){let l=parseInt(o.bookId),{data:a}=await qe(l),n=await Ne(l),e=await De(n);return{data:a,streamed:{links:Fe(l),similarBooks:Ve(e),hashtags:Te(n)}}}const st=Object.freeze(Object.defineProperty({__proto__:null,load:Ae},Symbol.toStringTag,{value:"Module"}));function be(o,l,a){const n=o.slice();return n[6]=l[a],n}function ke(o,l,a){const n=o.slice();return n[10]=l[a],n}function pe(o,l,a){const n=o.slice();return n[14]=l[a],n}function Me(o){return{c:f,l:f,m:f,p:f,i:f,o:f,d:f}}function Oe(o){let l,a,n=O(o[13]),e=[];for(let t=0;t<n.length;t+=1)e[t]=ve(pe(o,n,t));const s=t=>E(e[t],1,1,()=>{e[t]=null});return{c(){for(let t=0;t<e.length;t+=1)e[t].c();l=H()},l(t){for(let r=0;r<e.length;r+=1)e[r].l(t);l=H()},m(t,r){for(let i=0;i<e.length;i+=1)e[i]&&e[i].m(t,r);_(t,l,r),a=!0},p(t,r){if(r&1){n=O(t[13]);let i;for(i=0;i<n.length;i+=1){const y=pe(t,n,i);e[i]?(e[i].p(y,r),w(e[i],1)):(e[i]=ve(y),e[i].c(),w(e[i],1),e[i].m(l.parentNode,l))}for(ye(),i=n.length;i<e.length;i+=1)s(i);Be()}},i(t){if(!a){for(let r=0;r<n.length;r+=1)w(e[r]);a=!0}},o(t){e=e.filter(Boolean);for(let r=0;r<e.length;r+=1)E(e[r]);a=!1},d(t){t&&c(l),re(e,t)}}}function Pe(o){let l=o[14].label+"",a,n;return{c(){a=S(l),n=S(" 🛒")},l(e){a=x(e,l),n=x(e," 🛒")},m(e,s){_(e,a,s),_(e,n,s)},p(e,s){s&1&&l!==(l=e[14].label+"")&&oe(a,l)},d(e){e&&(c(a),c(n))}}}function ve(o){let l,a,n,e,s;return a=new xe({props:{class:"text-lg mt-3",color:"green",$$slots:{default:[Pe]},$$scope:{ctx:o}}}),{c(){l=g("a"),z(a.$$.fragment),n=V(),this.h()},l(t){l=b(t,"A",{href:!0,target:!0});var r=$(l);G(a.$$.fragment,r),n=C(r),r.forEach(c),this.h()},h(){u(l,"href",e=o[14].link),u(l,"target","_blank")},m(t,r){_(t,l,r),U(a,l,null),m(l,n),s=!0},p(t,r){const i={};r&131073&&(i.$$scope={dirty:r,ctx:t}),a.$set(i),(!s||r&1&&e!==(e=t[14].link))&&u(l,"href",e)},i(t){s||(w(a.$$.fragment,t),s=!0)},o(t){E(a.$$.fragment,t),s=!1},d(t){t&&c(l),J(a)}}}function ze(o){let l,a,n,e;return a=new se({}),{c(){l=g("div"),z(a.$$.fragment),n=S(`
                Loading Shops ...`),this.h()},l(s){l=b(s,"DIV",{class:!0});var t=$(l);G(a.$$.fragment,t),n=x(t,`
                Loading Shops ...`),t.forEach(c),this.h()},h(){u(l,"class","loading")},m(s,t){_(s,l,t),U(a,l,null),m(l,n),e=!0},p:f,i(s){e||(w(a.$$.fragment,s),e=!0)},o(s){E(a.$$.fragment,s),e=!1},d(s){s&&c(l),J(a)}}}function Ge(o){return{c:f,l:f,m:f,p:f,i:f,o:f,d:f}}function Ue(o){let l,a=O(o[9]),n=[];for(let e=0;e<a.length;e+=1)n[e]=$e(ke(o,a,e));return{c(){for(let e=0;e<n.length;e+=1)n[e].c();l=H()},l(e){for(let s=0;s<n.length;s+=1)n[s].l(e);l=H()},m(e,s){for(let t=0;t<n.length;t+=1)n[t]&&n[t].m(e,s);_(e,l,s)},p(e,s){if(s&1){a=O(e[9]);let t;for(t=0;t<a.length;t+=1){const r=ke(e,a,t);n[t]?n[t].p(r,s):(n[t]=$e(r),n[t].c(),n[t].m(l.parentNode,l))}for(;t<n.length;t+=1)n[t].d(1);n.length=a.length}},i:f,o:f,d(e){e&&c(l),re(n,e)}}}function $e(o){let l,a=o[10].tag+"",n,e,s,t;return{c(){l=S("#"),n=S(a),e=V(),s=new Ie(!1),t=H(),this.h()},l(r){l=x(r,"#"),n=x(r,a),e=C(r),s=Ee(r,!1),t=H(),this.h()},h(){s.a=t},m(r,i){_(r,l,i),_(r,n,i),_(r,e,i),s.m(Xe,r,i),_(r,t,i)},p(r,i){i&1&&a!==(a=r[10].tag+"")&&oe(n,a)},d(r){r&&(c(l),c(n),c(e),c(t),s.d())}}}function Je(o){let l,a,n,e;return a=new se({}),{c(){l=g("div"),z(a.$$.fragment),n=S(`
                    Loading hashtags ...`),this.h()},l(s){l=b(s,"DIV",{class:!0});var t=$(l);G(a.$$.fragment,t),n=x(t,`
                    Loading hashtags ...`),t.forEach(c),this.h()},h(){u(l,"class","loading")},m(s,t){_(s,l,t),U(a,l,null),m(l,n),e=!0},p:f,i(s){e||(w(a.$$.fragment,s),e=!0)},o(s){E(a.$$.fragment,s),e=!1},d(s){s&&c(l),J(a)}}}function Ke(o){return{c:f,l:f,m:f,p:f,i:f,o:f,d:f}}function Qe(o){let l,a,n=O(o[5]),e=[];for(let t=0;t<n.length;t+=1)e[t]=we(be(o,n,t));const s=t=>E(e[t],1,1,()=>{e[t]=null});return{c(){for(let t=0;t<e.length;t+=1)e[t].c();l=H()},l(t){for(let r=0;r<e.length;r+=1)e[r].l(t);l=H()},m(t,r){for(let i=0;i<e.length;i+=1)e[i]&&e[i].m(t,r);_(t,l,r),a=!0},p(t,r){if(r&1){n=O(t[5]);let i;for(i=0;i<n.length;i+=1){const y=be(t,n,i);e[i]?(e[i].p(y,r),w(e[i],1)):(e[i]=we(y),e[i].c(),w(e[i],1),e[i].m(l.parentNode,l))}for(ye(),i=n.length;i<e.length;i+=1)s(i);Be()}},i(t){if(!a){for(let r=0;r<n.length;r+=1)w(e[r]);a=!0}},o(t){e=e.filter(Boolean);for(let r=0;r<e.length;r+=1)E(e[r]);a=!1},d(t){t&&c(l),re(e,t)}}}function we(o){let l,a,n;return a=new je({props:{book:{id:o[6].id,title:o[6].title,img:o[6].img}}}),{c(){l=g("li"),z(a.$$.fragment),this.h()},l(e){l=b(e,"LI",{class:!0});var s=$(l);G(a.$$.fragment,s),s.forEach(c),this.h()},h(){u(l,"class","my-2")},m(e,s){_(e,l,s),U(a,l,null),n=!0},p(e,s){const t={};s&1&&(t.book={id:e[6].id,title:e[6].title,img:e[6].img}),a.$set(t)},i(e){n||(w(a.$$.fragment,e),n=!0)},o(e){E(a.$$.fragment,e),n=!1},d(e){e&&c(l),J(a)}}}function Re(o){let l,a,n,e;return a=new se({}),{c(){l=g("div"),z(a.$$.fragment),n=S(`
            Loading similar books ...`),this.h()},l(s){l=b(s,"DIV",{class:!0});var t=$(l);G(a.$$.fragment,t),n=x(t,`
            Loading similar books ...`),t.forEach(c),this.h()},h(){u(l,"class","loading")},m(s,t){_(s,l,t),U(a,l,null),m(l,n),e=!0},p:f,i(s){e||(w(a.$$.fragment,s),e=!0)},o(s){E(a.$$.fragment,s),e=!1},d(s){s&&c(l),J(a)}}}function We(o){let l,a,n,e,s,t,r=o[1].title+"",i,y,A,P,te,j,K,Q,B,q,ie="Stichwörter:",le,F,R,W,D,N,ce="Ähnliche Bücher:",ae,T,X,L,k={ctx:o,current:null,token:null,hasCatch:!1,pending:ze,then:Oe,catch:Me,value:13,blocks:[,,,]};M(K=o[0].streamed.links,k);let p={ctx:o,current:null,token:null,hasCatch:!1,pending:Je,then:Ue,catch:Ge,value:9,blocks:[,,,]};M(R=o[0].streamed.hashtags,p);let v={ctx:o,current:null,token:null,hasCatch:!1,pending:Re,then:Qe,catch:Ke,value:5,blocks:[,,,]};return M(X=o[0].streamed.similarBooks,v),{c(){l=g("div"),a=g("img"),e=V(),s=g("div"),t=g("h2"),i=S(r),y=V(),A=g("div"),P=new Ie(!1),te=V(),j=g("div"),k.block.c(),Q=V(),B=g("div"),q=g("div"),q.textContent=ie,le=V(),F=g("div"),p.block.c(),W=V(),D=g("div"),N=g("div"),N.textContent=ce,ae=V(),T=g("ul"),v.block.c(),this.h()},l(d){l=b(d,"DIV",{class:!0});var h=$(l);a=b(h,"IMG",{class:!0,width:!0,alt:!0,src:!0}),h.forEach(c),e=C(d),s=b(d,"DIV",{class:!0});var I=$(s);t=b(I,"H2",{class:!0});var he=$(t);i=x(he,r),he.forEach(c),y=C(I),A=b(I,"DIV",{class:!0});var fe=$(A);P=Ee(fe,!1),fe.forEach(c),te=C(I),j=b(I,"DIV",{class:!0});var ue=$(j);k.block.l(ue),ue.forEach(c),I.forEach(c),Q=C(d),B=b(d,"DIV",{class:!0});var Y=$(B);q=b(Y,"DIV",{class:!0,"data-svelte-h":!0}),me(q)!=="svelte-ooggy2"&&(q.textContent=ie),le=C(Y),F=b(Y,"DIV",{class:!0});var de=$(F);p.block.l(de),de.forEach(c),Y.forEach(c),W=C(d),D=b(d,"DIV",{class:!0});var Z=$(D);N=b(Z,"DIV",{class:!0,"data-svelte-h":!0}),me(N)!=="svelte-nfoxyh"&&(N.textContent=ce),ae=C(Z),T=b(Z,"UL",{class:!0});var _e=$(T);v.block.l(_e),_e.forEach(c),Z.forEach(c),this.h()},h(){u(a,"class","py-10"),u(a,"width","400"),u(a,"alt",o[4]),ge(a.src,n=o[3])||u(a,"src",n),u(l,"class","w-full flex flex-row bg-gray-100 justify-center"),u(t,"class","bg-yellow-300 p-2"),P.a=null,u(A,"class","p-5"),u(j,"class","my-5 pb-10 flex flex-col items-center "),u(s,"class","bg-yellow-100"),u(q,"class","p-2 w-full mt-5 bg-teal-300 text-lg font-bold text-center"),u(F,"class","p-5 flex flex-row justify-center "),u(B,"class","bg-teal-100"),u(N,"class","w-full my-5 bg-lime-300 p-3 text-lg font-bold text-center"),u(T,"class","grid grid-cols-2 md:grid-cols-3"),u(D,"class","bg-lime-100")},m(d,h){_(d,l,h),m(l,a),_(d,e,h),_(d,s,h),m(s,t),m(t,i),m(s,y),m(s,A),P.m(o[2],A),m(s,te),m(s,j),k.block.m(j,k.anchor=null),k.mount=()=>j,k.anchor=null,_(d,Q,h),_(d,B,h),m(B,q),m(B,le),m(B,F),p.block.m(F,p.anchor=null),p.mount=()=>F,p.anchor=null,_(d,W,h),_(d,D,h),m(D,N),m(D,ae),m(D,T),v.block.m(T,v.anchor=null),v.mount=()=>T,v.anchor=null,L=!0},p(d,[h]){o=d,(!L||h&16)&&u(a,"alt",o[4]),(!L||h&8&&!ge(a.src,n=o[3]))&&u(a,"src",n),(!L||h&2)&&r!==(r=o[1].title+"")&&oe(i,r),(!L||h&4)&&P.p(o[2]),k.ctx=o,h&1&&K!==(K=o[0].streamed.links)&&M(K,k)||ne(k,o,h),p.ctx=o,h&1&&R!==(R=o[0].streamed.hashtags)&&M(R,p)||ne(p,o,h),v.ctx=o,h&1&&X!==(X=o[0].streamed.similarBooks)&&M(X,v)||ne(v,o,h)},i(d){L||(w(k.block),w(p.block),w(v.block),L=!0)},o(d){for(let h=0;h<3;h+=1){const I=k.blocks[h];E(I)}for(let h=0;h<3;h+=1){const I=p.blocks[h];E(I)}for(let h=0;h<3;h+=1){const I=v.blocks[h];E(I)}L=!1},d(d){d&&(c(l),c(e),c(s),c(Q),c(B),c(W),c(D)),k.block.d(),k.token=null,k=null,p.block.d(),p.token=null,p=null,v.block.d(),v.token=null,v=null}}}const Xe="&#x20;";function Ye(o,l,a){let n,e,s,t,{data:r}=l;return o.$$set=i=>{"data"in i&&a(0,r=i.data)},o.$$.update=()=>{o.$$.dirty&1&&a(1,n=r.data),o.$$.dirty&2&&a(4,e=n.title),o.$$.dirty&2&&a(3,s=He(n.img[0],n.id)),o.$$.dirty&2&&a(2,t=n.desc)},[r,n,t,s,e]}class ot extends Le{constructor(l){super(),Se(this,l,Ye,We,Ce,{data:0})}}export{ot as component,st as universal};