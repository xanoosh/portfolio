(this["webpackJsonp4-random-person-api"]=this["webpackJsonp4-random-person-api"]||[]).push([[0],{12:function(e,n,t){},13:function(e,n,t){},15:function(e,n,t){"use strict";t.r(n);var c=t(1),r=t.n(c),i=t(6),s=t.n(i),o=(t(12),t(5)),a=t(7),u=(t(13),t(0)),l=function(e){var n=e.id,t=e.fullName,c=e.age,r=e.img,i=e.remove;return Object(u.jsx)("div",{className:"single-user-container",children:Object(u.jsxs)("div",{className:"single-user",children:[Object(u.jsx)("div",{className:"remove",onClick:function(){i(n)}}),Object(u.jsx)("img",{src:r,alt:"".concat(t)}),Object(u.jsx)("h3",{children:t}),Object(u.jsxs)("p",{children:["age: ",c]})]})})},j=function(e){var n=e.list,t=e.remove,c=n.map((function(e){return Object(u.jsx)(l,{remove:t,id:e.login.uuid,fullName:"".concat(e.name.title," ").concat(e.name.first," ").concat(e.name.last),age:e.dob.age,img:e.picture.large},e.login.uuid)}));return Object(u.jsx)(u.Fragment,{children:c})},d=function(){var e=Object(c.useState)([]),n=Object(a.a)(e,2),t=n[0],r=n[1];return Object(u.jsxs)("div",{className:"users",children:[Object(u.jsx)("button",{onClick:function(){fetch("https://randomuser.me/api/?results=1").then((function(e){if(!e.ok)throw Error(e.message);return e.json()})).then((function(e){r((function(n){return[].concat(Object(o.a)(n),[e.results[0]])})),console.log(e)})).catch((function(e){console.log(e)}))},children:"Create random user"}),t.length>0?Object(u.jsx)(j,{list:t,remove:function(e){var n=Object(o.a)(t).filter((function(n){return n.login.uuid!==e}));r(n)}}):Object(u.jsx)("p",{className:"placeholder",children:"No user created yet"})]})},m=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,16)).then((function(n){var t=n.getCLS,c=n.getFID,r=n.getFCP,i=n.getLCP,s=n.getTTFB;t(e),c(e),r(e),i(e),s(e)}))};s.a.render(Object(u.jsx)(r.a.StrictMode,{children:Object(u.jsx)(d,{})}),document.getElementById("root")),m()}},[[15,1,2]]]);
//# sourceMappingURL=main.3b2654e5.chunk.js.map