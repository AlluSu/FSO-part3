(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{14:function(e,n,t){},16:function(e,n,t){e.exports=t(38)},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(15),c=t.n(u),o=t(4),i=t(2),l=function(e){return r.a.createElement("ul",null,e.person.name," ",e.person.number,r.a.createElement("button",{onClick:e.deletePerson},"delete"))},m=function(e){return r.a.createElement("div",null,"filter shown with",r.a.createElement("input",{value:e.value,onChange:e.onChange}))},d=function(e){return r.a.createElement("form",{onSubmit:e.onSubmit},r.a.createElement("div",null,"name:",r.a.createElement("input",{value:e.name,onChange:e.onNameChange})),r.a.createElement("div",null,"number:",r.a.createElement("input",{value:e.number,onChange:e.onNumberChange})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},s=t(3),f=t.n(s),h="/api/persons",b=function(){return f.a.get(h).then((function(e){return e.data}))},p=function(e){return f.a.post(h,e).then((function(e){return e.data}))},E=function(e){return f.a.delete("".concat(h,"/").concat(e)).then((function(e){return e.data}))},v=function(e,n){return f.a.put("".concat(h,"/").concat(e),n).then((function(e){return e.data}))},g=(t(14),function(e){var n=e.message;return n.startsWith("Added")?r.a.createElement("div",{className:"addPerson"},n):n.startsWith("Deleted")?r.a.createElement("div",{className:"removePerson"},n):n.startsWith("Updated")?r.a.createElement("div",{className:"numberChange"},n):n.startsWith("Information")?r.a.createElement("div",{className:"updateFailed"},n):""}),j=function(){var e=Object(a.useState)([]),n=Object(i.a)(e,2),t=n[0],u=n[1],c=Object(a.useState)(""),s=Object(i.a)(c,2),f=s[0],h=s[1],j=Object(a.useState)(""),C=Object(i.a)(j,2),O=C[0],w=C[1],N=Object(a.useState)(""),S=Object(i.a)(N,2),k=S[0],y=S[1],P=Object(a.useState)(""),W=Object(i.a)(P,2),D=W[0],U=W[1];Object(a.useEffect)((function(){b().then((function(e){u(e)}))}),[]);var A=t.filter((function(e){return e.name.toUpperCase().startsWith(k.toUpperCase())})),I=function(e){return!t.find((function(n){return n.name===e}))};return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(g,{message:D}),r.a.createElement(m,{value:k,onChange:function(e){y(e.target.value)}}),r.a.createElement("h3",null,"Add a new"),r.a.createElement(d,{onSubmit:function(e){e.preventDefault();var n=t.find((function(e){return e.name===f})),a={name:f,number:O};I(a.name)?p(a).then((function(e){u(t.concat(e)),w(t.concat(e)),h(""),w(""),U("Added ".concat(e.name)),setTimeout((function(){U("")}),5e3)})):(window.confirm("".concat(f," is already added to phonebook, replace the old number with a new one?"))&&v(n.id,Object(o.a)(Object(o.a)({},n),{},{number:O})).then((function(e){u(t.map((function(t){return t.name!==n.name?t:e}))),h(""),w(""),U("Updated number of ".concat(e.name)),setTimeout((function(){U("")}),5e3)})).catch((function(e){U("Information of ".concat(f," has already been deleted from the server"))})),u(t),h(""),w(""))},name:f,onNameChange:function(e){h(e.target.value)},number:O,onNumberChange:function(e){w(e.target.value)}}),r.a.createElement("h3",null,"Numbers"),A.map((function(e){return r.a.createElement(l,{key:e.id,person:e,deletePerson:function(){return function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Delete ".concat(n.name," ?"))&&E(e).then((function(){u(t.filter((function(n){return n.id!==e}))),U("Deleted ".concat(n.name)),setTimeout((function(){U("")}),5e3)}))}(e.id)}})})))};c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(j,null)),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.c85cd9bf.chunk.js.map