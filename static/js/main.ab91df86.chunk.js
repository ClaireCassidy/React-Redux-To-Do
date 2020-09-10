(this["webpackJsonpreact-redux-todo-list"]=this["webpackJsonpreact-redux-todo-list"]||[]).push([[0],[,,,,,,,,,,,,,function(e,t,a){e.exports=a(31)},,,,,function(e,t,a){},function(e,t,a){},,,,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(5),l=a.n(r),c=(a(18),a(2)),i=(a(19),"ADD_ITEM"),d="TOGGLE_IMPORTANT",s="DELETE_ITEM",m="TOGGLE_COMPLETE",u="REMOVE_EXPIRY",p="UPDATE_EXPIRY",E="SUBMIT_TEXT_EDIT",b="UPDATE_ITEMS_PER_PAGE",g="UPDATE_PAGE_NUMBER",f="DELETE_ALL_EXPIRED",h="DELETE_COMPLETED_TODOS",v="SET_AUTO_DELETE_COMPLETED",x="SET_SHOW_COMPLETED",N="LOAD_DEMO_ITEMS",O=function(e){return{type:i,payload:e}},T=function(e){return{type:s,payload:e}},y=function(e){return{type:g,payload:e}},C=function(){return{type:f}},D=function(){return{type:h}},I=function(e){return{type:v,payload:e}},S=function(e){return{type:x,payload:e}},j=a(1),P=(a(26),function(){var e=new Date;e.setTime(e.getTime()-60*(new Date).getTimezoneOffset()*1e3),e=e.toISOString();var t=k(e);return t!==e?t:"2020-01-01T00:00"}),k=function(e){for(var t=e,a=t.length-1;a>=0;a--)if(":"===t[a])return t.substring(0,a);return e},w=function(){var e=new Date;e.setTime(e.getTime()-60*(new Date).getTimezoneOffset()*1e3),e=e.toISOString();var t=parseInt(e.substring(0,4))+1;e="".concat(t).concat(e.substring(4));var a=k(e);return a!==e?a:null};function A(){var e=Object(n.useState)(""),t=Object(c.a)(e,2),a=t[0],r=t[1],l=Object(n.useState)(!1),i=Object(c.a)(l,2),d=i[0],s=i[1],m=Object(n.useState)(P()),u=Object(c.a)(m,2),p=u[0],E=u[1],b=Object(n.useState)(!1),g=Object(c.a)(b,2),f=g[0],h=g[1],v=Object(j.c)((function(e){return e.todoId})),x=function(e){h((function(e){return!e}))},N=Object(j.b)();return o.a.createElement("div",{className:"FormContainer"},o.a.createElement("form",{onSubmit:function(e){e.preventDefault(),function(e){var t=new Date;t.setTime(t.getTime()-60*(new Date).getTimezoneOffset()*1e3),t=t.toISOString();var n={dateAdded:k(t),id:v,completed:!1,text:a,important:f,expires:d?p:null};h(!1),r(""),E(P()),s(!1),N(O(n))}()}},o.a.createElement("h3",{className:"SubmitHeader"},"Submit a new to-do:"),o.a.createElement("div",{className:"SubmissionFormContents"},o.a.createElement("div",{className:"SubmissionFormGroupLeft"},o.a.createElement("textarea",{className:"TodoTextEntry",value:a,onChange:function(e){r(e.target.value),P()},placeholder:"Today I must ..."}),o.a.createElement("div",{className:"ExpiryDateContainer"},o.a.createElement("div",{className:"ExpiryCheckboxContainer"},o.a.createElement("label",{className:"ExpiresLabel",htmlFor:"checkboxExpires"},"Expires?"),o.a.createElement("input",{className:"CheckboxExpires",type:"checkbox",id:"checkboxExpires",name:"checkboxExpires",checked:d,onChange:function(e){s((function(e){return!e}))}})),o.a.createElement("input",{className:"ExpiryPicker",type:"datetime-local",id:"expiry-date",name:"expiry-date",value:p,min:P(),max:w(),onChange:function(e){E(e.target.value)},disabled:!d}))),o.a.createElement("div",{className:"SubmissionFormGroupRight"},o.a.createElement("div",{className:"ImportantStarContainer"},o.a.createElement("p",{className:"ImportantToggle",onClick:x},"Important?"),o.a.createElement("p",{className:"ImportantStar",onClick:x},f&&"\u2605",!f&&"\u2606")),o.a.createElement("input",{className:"FormSubmit",type:"submit",value:"Submit"})))))}var B=a(3);a(27),a(28);function L(e){var t=e.todoItem,a=t.dateAdded,r=t.id,l=t.completed,i=t.text,s=t.important,b=t.expires,g=Object(j.b)(),f=Object(n.useState)(!1),h=Object(c.a)(f,2),v=h[0],x=h[1],N=Object(n.useState)(null),O=Object(c.a)(N,2),y=O[0],C=O[1],D=Object(n.useState)(!1),I=Object(c.a)(D,2),S=I[0],k=I[1],A=Object(n.useState)(i),B=Object(c.a)(A,2),L=B[0],M=B[1],R=Object(j.c)((function(e){return e.autoDeleteCompleted})),Y=function(e){g({type:p,payload:{id:r,selectedExpiryDate:y}}),C(null),x(!1)};return o.a.createElement("div",{className:"ListItemContainer"+(l?" Completed":"")+(s?" Important":"")},o.a.createElement("div",{className:"DateContainer"},o.a.createElement("p",{className:"DateAdded"},_(a))),o.a.createElement("div",{className:"TodoTextContainer"},!S&&o.a.createElement(o.a.Fragment,null,o.a.createElement("p",{className:"TextEditButton",onClick:function(){k(!0)}},"(edit)"),o.a.createElement("p",{className:"TodoText"},0===i.length?"( No Text )":"".concat(i))),S&&o.a.createElement(o.a.Fragment,null,o.a.createElement("textarea",{className:"EditTextTextarea",name:"EditTodoText",rows:"10",placeholder:i,value:L,onChange:function(e){M(e.target.value)}}),o.a.createElement("div",{className:"EditTextButtonsContainer"},o.a.createElement("button",{className:"SubmitTextButton",onClick:function(e){0!==L.length&&g({type:E,payload:{id:r,newTodoText:L}}),k(!1)}},"Submit Changes"),o.a.createElement("button",{className:"RevertTextButton",onClick:function(){return M(i)}},"Revert"),o.a.createElement("button",{className:"CancelTextButton",onClick:function(e){M(i),k(!1)}},"Cancel")))),o.a.createElement("div",{className:"BottomBar"},o.a.createElement("div",{className:"ExpiresContainer"},o.a.createElement("p",{className:"ExpiresText "+(F(b)?"ExpiredText":"")},b&&"Expires "+_(b),b&&F(b)&&o.a.createElement("span",{className:"Expired"}," ! "),!b&&"( No expiry set )"),o.a.createElement("div",null,o.a.createElement("p",{className:"EditExpiryText",onClick:function(e){x(!0)}},!v&&"(edit)"))),o.a.createElement("div",{className:"ButtonBar"},o.a.createElement("div",{className:"ImportantIcon",onClick:function(e){g(function(e){return{type:d,payload:e}}(r))}},s&&"\u2605",!s&&"\u2606"),o.a.createElement("div",{className:"DeleteIcon",onClick:function(e){g(T(r))}},"\u2716"),o.a.createElement("div",{className:"CompletedIcon",onClick:function(e){g(R?T(r):function(e){return{type:m,payload:e}}(r))}},!l&&"\u2610",l&&"\u2611"))),o.a.createElement("div",null,v&&o.a.createElement("form",{onSubmit:function(e){e.preventDefault(),Y()}},o.a.createElement("div",{className:"ExpiryEditContainer"},o.a.createElement("div",{className:"ExpiryPickerEditContainer"},o.a.createElement("p",{className:"ExpiryEditText"},"Select:"),o.a.createElement("input",{className:"ExpiryPickerEdit",type:"datetime-local",id:"expiry-date",name:"expiry-date",value:y||b||P(),min:P(),max:w(),onChange:function(e){C(e.target.value)}})),o.a.createElement("div",{className:"ExpiryRemoveCancel"},b&&o.a.createElement("p",{className:"RemoveExpiryButton",onClick:function(e){g(function(e){return{type:u,payload:e}}(r)),C(null),x(!1)}},"Remove"),o.a.createElement("p",{className:"CancelExpiryEditButton",onClick:function(e){C(null),x(!1)}},"Cancel")),o.a.createElement("button",{className:"ExpiryEditSubmit",type:"submit"},"Submit")))))}var _=function(e){var t=e.split("T"),a=Object(c.a)(t,2),n=a[0],o=a[1],r=n.split("-"),l=Object(c.a)(r,3),i=l[0],d=l[1],s=l[2];return"".concat(s,"/").concat(d,"/").concat(i,", ").concat(o)},F=function(e){var t=Date.parse(e);return Date.now()>=t},M=[5,10,20],R="NEXT",Y="PREV",U="OLD",X="NEW",G="EXPIRY",W="IMPORTANT",H=[{dateAdded:"2020-09-08T10:42",id:0,completed:!1,text:"  The remaining items will be filler items to demonstrate the pagination feature. \n    \nFor convenience, the Demo Bar has options for quickly adding items to test the individual functionalities.\n        ",important:!1,expires:null},{dateAdded:"2020-09-08T10:42",id:1,completed:!1,text:'I am an expired item. I will be deleted automatically when you click "Delete Expired Todos" in the Options menu',important:!1,expires:"2015-07-12T13:44"},{dateAdded:"2020-09-08T10:42",id:2,completed:!0,text:'I am a completed todo. You can toggle my visibility by clicking "Show Completed To-Dos" in the options menu. \n    \nYou can also opt to automatically delete any todos marked complete.',important:!1,expires:parseInt((new Date).getFullYear())+1+"-03-22T17:14"},{dateAdded:"2020-09-08T10:42",id:3,completed:!1,text:'I am an important to-do. You can opt to see me first by selecting "Important First" in the Sort-By menu',important:!0,expires:parseInt((new Date).getFullYear())+1+"-07-12T13:44"},{dateAdded:"2020-09-08T10:42",id:4,completed:!1,text:' ... Similarly you can edit or remove the expiry date for any todo by hovering over the expiry date section and clicking "edit"',important:!1,expires:null},{dateAdded:"2020-09-08T10:42",id:5,completed:!1,text:'You can edit text for a submitted todo by hovering over it and clicking "edit" ...',important:!1,expires:null},{dateAdded:"2020-09-08T10:42",id:6,completed:!1,text:"Along the bottom of each todo are buttons which perform the following actions:\n        \n\u2606: Toggle important\n        \n\u2716: Delete this todo\n        \n\u2610: Toggle complete\n    ",important:!1,expires:null},{dateAdded:"2020-09-08T10:42",id:7,completed:!1,text:"Thanks for checking out my todo app!\n        \nNew todos can be added by filling out the form above \u2191\n        \nThe todos are paginated. You can change the number of items per page by using the buttons at the bottom of the list. You can jump to a specific page by editing the page number in the bottom right.\n        \nBy default, todos are ordered newest-to-oldest with respect to the time they were added. You can change the sort order in the options menu.\n    ",important:!1,expires:null},{dateAdded:"2020-08-01T21:47",id:8,completed:!1,text:"Get Milk",important:!1,expires:null},{dateAdded:"2020-07-02T13:55",id:9,completed:!1,text:"Call John",important:!0,expires:null},{dateAdded:"2020-08-11T12:34",id:9,completed:!1,text:"Go Running",important:!1,expires:null},{dateAdded:"2020-02-17T15:31",id:10,completed:!1,text:"Get Newspaper",important:!1,expires:null},{dateAdded:"2020-07-06T21:27",id:11,completed:!1,text:"Do Dishes",important:!1,expires:null},{dateAdded:"2020-01-15T08:00",id:12,completed:!1,text:"Fold Laundry",important:!1,expires:null},{dateAdded:"2020-04-30T03:21",id:13,completed:!1,text:"Feed Cat",important:!1,expires:null},{dateAdded:"2020-06-14T02:31",id:14,completed:!1,text:"Make doctors appointment",important:!1,expires:null},{dateAdded:"2020-05-07T17:04",id:15,completed:!1,text:"Replace ink in printer",important:!0,expires:null},{dateAdded:"2020-03-26T19:39",id:16,completed:!1,text:"Change lightbulb",important:!1,expires:"2020-01-01T13:21"},{dateAdded:"2020-08-01T13:21",id:17,completed:!1,text:"Walk dog",important:!1,expires:null},{dateAdded:"2020-07-28T01:11",id:18,completed:!1,text:"Make packed lunch",important:!1,expires:null},{dateAdded:"2020-02-16T06:09",id:19,completed:!1,text:"Mop kitchen",important:!0,expires:null},{dateAdded:"2020-09-01T08:42",id:20,completed:!1,text:"Take out bins",important:!1,expires:"2020-02-07T17:11"},{dateAdded:"2020-02-18T11:47",id:21,completed:!1,text:"Book restaurant",important:!1,expires:null},{dateAdded:"2020-02-21T13:07",id:22,completed:!1,text:"Buy birthday gift",important:!1,expires:null},{dateAdded:"2020-05-01T16:42",id:23,completed:!1,text:"Pay electric bill",important:!1,expires:null}],z={todoId:0,itemsPerPage:M[0],pageIndex:0,todos:[],autoDeleteCompleted:!1,showCompleted:!0};function V(){var e=Object(n.useState)(X),t=Object(c.a)(e,2),a=t[0],r=t[1],l=Object(j.c)((function(e){return e.autoDeleteCompleted})),i=Object(j.c)((function(e){return e.showCompleted})),d=Object(j.b)(),s=Object(j.c)((function(e){return q(e.todos,e.itemsPerPage,e.pageIndex,a,i)})),m=Object(j.c)((function(e){var t=e.pageIndex*e.itemsPerPage+1;return[t,t+e.itemsPerPage-1,e.todos.length]})),u=Object(c.a)(m,3),p=u[0],E=u[1],b=u[2];return o.a.createElement(o.a.Fragment,null,o.a.createElement("h3",{className:"Showing"},"Showing (".concat(p,"-").concat(E,") of ").concat(b," items")),o.a.createElement("div",{className:"ListContainer"},o.a.createElement("div",{className:"ListLeft"},o.a.createElement("div",{className:"ListItemsContainer"},s.length>0?s.map((function(e){return o.a.createElement(L,{todoItem:e,key:e.dateAdded+Math.random()})})):o.a.createElement("p",{className:"NoItemsTip"},"(Tip - You can quickly add demo items using the demo bar at the top of the page)"))),o.a.createElement("div",{className:"ListRight"},o.a.createElement("h3",{className:"OptionsHeader"},"Options"),o.a.createElement("hr",{className:"Divider"}),o.a.createElement("div",{className:"SortBySection OptionsItem"},o.a.createElement("label",{className:"SortBySelectLabel",htmlFor:"SortBySelect"},"Sort By:"),o.a.createElement("select",{className:"SortBySelect",name:"SortBySelect",id:"SortBySelect",value:a,onChange:function(e){d(y(0)),r(e.target.value)}},o.a.createElement("option",{value:"NEW"},"Date Added (Newest)"),o.a.createElement("option",{value:"OLD"},"Date Added (Oldest)"),o.a.createElement("option",{value:"EXPIRY"},"Expires Soon"),o.a.createElement("option",{value:"IMPORTANT"},"Important First"))),o.a.createElement("hr",{className:"Divider"}),o.a.createElement("div",{className:"ShowCompletedContainer OptionsItem"},o.a.createElement("div",null,o.a.createElement("label",{htmlFor:"show-completed"},"Show Completed To-Dos?"),o.a.createElement("input",{name:"show-completed",type:"checkbox",checked:i,onChange:function(e){d(S(!i))}}))),o.a.createElement("hr",{className:"Divider"}),o.a.createElement("div",{className:"DeleteCompletedContainer OptionsItem"},o.a.createElement("button",{className:"OptionsButton",name:"delete-completed",onClick:function(e){d(D())}},"Delete Completed To-dos"),o.a.createElement("label",{className:"CannotUndoLabel",htmlFor:"delete-completed"},"(This cannot be undone)"),o.a.createElement("div",{className:"AutoDeleteCompletedContainer"},o.a.createElement("label",{className:"AutoDeleteCompletedLabel",htmlFor:"auto-delete-completed"},"Do this automatically"),o.a.createElement("input",{name:"auto-delete-completed",type:"checkbox",checked:l,onChange:function(e){l||d(D()),d(I(!l))}}))),o.a.createElement("hr",{className:"Divider"}),o.a.createElement("div",{className:"DeleteExpiredContainer OptionsItem"},o.a.createElement("button",{className:"OptionsButton",onClick:function(e){d(C())}},"Delete Expired To-dos"),o.a.createElement("label",{className:"CannotUndoLabel"},"(This cannot be undone)")))))}var q=function(e,t,a,n,o){var r=J(Object(B.a)(e),n);o||(r=r.filter((function(e){return!e.completed})));var l=t*a;return r.slice(l,l+t)},J=function(e,t){switch(t){case U:return e.sort((function(e,t){var a=e.dateAdded,n=t.dateAdded,o=(e.id,t.id,Date.parse(a)),r=Date.parse(n);return o===r?e.id>t.id?1:-1:o<r?-1:1})),e;case X:return e.sort((function(e,t){var a=e.dateAdded,n=t.dateAdded,o=(e.id,t.id,Date.parse(a)),r=Date.parse(n);return o===r?e.id>t.id?-1:1:o<r?1:-1})),e;case W:return e.sort((function(e,t){var a=e.important,n=t.important;return a&&n?0:a&&!n?-1:1})),e;case G:return e.sort((function(e,t){var a=e.expires,n=t.expires;return null==a&&null==n?0:null==a||null==n?a?-1:1:Date.parse(a)-Date.parse(n)})),e}};a(29);function K(){var e=Object(n.useState)(!1),t=Object(c.a)(e,2),a=t[0],r=t[1],l=Object(n.useState)(X),i=Object(c.a)(l,2),d=i[0],s=i[1],m=Object(j.c)((function(e){return e.autoDeleteCompleted})),u=Object(j.c)((function(e){return e.showCompleted})),p=Object(j.b)(),E=Object(j.c)((function(e){return $(e.todos,e.itemsPerPage,e.pageIndex,d,u)})),b=Object(j.c)((function(e){var t=e.pageIndex*e.itemsPerPage+1;return[t,t+e.itemsPerPage-1,e.todos.length]})),g=Object(c.a)(b,3),f=g[0],h=g[1],v=g[2];return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"OptionsToggle",onClick:function(){r((function(e){return!e}))}},o.a.createElement("p",{className:"OptionsToggleText"},"Options ..."),o.a.createElement("p",{className:"OptionsToggleArrow"},"\u21f5")),!a&&o.a.createElement("hr",{className:"Divider"}),a&&o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"OptionsMobile"},o.a.createElement("div",{className:"SortBySection OptionsItem"},o.a.createElement("label",{className:"SortBySelectLabel",htmlFor:"SortBySelect"},"Sort By:"),o.a.createElement("select",{className:"SortBySelect",name:"SortBySelect",id:"SortBySelect",value:d,onChange:function(e){p(y(0)),s(e.target.value)}},o.a.createElement("option",{value:"NEW"},"Date Added (Newest)"),o.a.createElement("option",{value:"OLD"},"Date Added (Oldest)"),o.a.createElement("option",{value:"EXPIRY"},"Expires Soon"),o.a.createElement("option",{value:"IMPORTANT"},"Important First"))),o.a.createElement("hr",{className:"Divider"}),o.a.createElement("div",{className:"ShowCompletedContainer OptionsItem"},o.a.createElement("div",null,o.a.createElement("label",{htmlFor:"show-completed"},"Show Completed To-Dos?"),o.a.createElement("input",{name:"show-completed",type:"checkbox",checked:u,onChange:function(e){p(S(!u))}}))),o.a.createElement("hr",{className:"Divider"}),o.a.createElement("div",{className:"DeleteCompletedContainer OptionsItem"},o.a.createElement("button",{className:"OptionsButton",name:"delete-completed",onClick:function(e){p(D())}},"Delete Completed To-dos"),o.a.createElement("label",{className:"CannotUndoLabel",htmlFor:"delete-completed"},"(This cannot be undone)"),o.a.createElement("div",{className:"AutoDeleteCompletedContainer"},o.a.createElement("label",{className:"AutoDeleteCompletedLabel",htmlFor:"auto-delete-completed"},"Do this automatically"),o.a.createElement("input",{name:"auto-delete-completed",type:"checkbox",checked:m,onChange:function(e){m||p(D()),p(I(!m))}}))),o.a.createElement("hr",{className:"Divider"}),o.a.createElement("div",{className:"DeleteExpiredContainer OptionsItem"},o.a.createElement("button",{className:"OptionsButton",onClick:function(e){p(C())}},"Delete Expired To-dos"),o.a.createElement("label",{className:"CannotUndoLabel"},"(This cannot be undone)"))),o.a.createElement("hr",{className:"Divider"})),o.a.createElement("h3",{className:"Showing"},"Showing (".concat(f,"-").concat(h,") of ").concat(v," items")),o.a.createElement("div",{className:"ListContainerMobile"},o.a.createElement("div",{className:"ListItemsContainerMobile"},E.length>0?E.map((function(e){return o.a.createElement(L,{todoItem:e,key:e.dateAdded+Math.random()})})):o.a.createElement(o.a.Fragment,null,o.a.createElement("p",{className:"NoItemsTip"},"(Tip - You can quickly add demo items using the demo bar at the top of the page)")))))}var $=function(e,t,a,n,o){var r=Q(Object(B.a)(e),n);o||(r=r.filter((function(e){return!e.completed})));var l=t*a;return r.slice(l,l+t)},Q=function(e,t){switch(t){case U:return e.sort((function(e,t){var a=e.dateAdded,n=t.dateAdded,o=(e.id,t.id,Date.parse(a)),r=Date.parse(n);return o===r?e.id>t.id?1:-1:o<r?-1:1})),e;case X:return e.sort((function(e,t){var a=e.dateAdded,n=t.dateAdded,o=(e.id,t.id,Date.parse(a)),r=Date.parse(n);return o===r?e.id>t.id?-1:1:o<r?1:-1})),e;case W:return e.sort((function(e,t){var a=e.important,n=t.important;return a&&n?0:a&&!n?-1:1})),e;case G:return e.sort((function(e,t){var a=e.expires,n=t.expires;return null==a&&null==n?0:null==a||null==n?a?-1:1:Date.parse(a)-Date.parse(n)})),e}};a(30);function Z(){var e=Object(j.b)(),t=Object(j.c)((function(e){return e.pageIndex})),a=function(t){e(function(e){return{type:b,payload:e}}(t))},n=function(a){var n=a.keyCode||a.which;13!==n&&null!=n||(""!==a.target.value?e(y(parseInt(a.target.value)-1)):a.target.placeholder=parseInt(t)+1,a.target.value="",a.target.blur())},r=function(t){e(y(t))},l=Object(j.c)((function(e){var t=0===e.pageIndex,a=Object(B.a)(e.todos),n=e.todos.length;e.showCompleted||(n=a.filter((function(e){return!e.completed})).length);return[t,n-(e.pageIndex+1)*e.itemsPerPage<=0]})),i=Object(c.a)(l,2),d=i[0],s=i[1];return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"PaginationContainerOuter"},o.a.createElement("div",{className:"PaginationContainerInner"},o.a.createElement("div",{className:"ItemsPerPageContainer"},o.a.createElement("p",{className:"ItemsPerPageLabel"},"Items Per Page:"),o.a.createElement("button",{className:"ItemsPerPageButton",onClick:function(){a(M[0])}},M[0]),o.a.createElement("button",{className:"ItemsPerPageButton",onClick:function(){return a(M[1])}},M[1]),o.a.createElement("button",{className:"ItemsPerPageButton",onClick:function(){return a(M[2])}},M[2])),o.a.createElement("div",{className:"PageNumberContainer"},o.a.createElement("button",{className:"PageNumberButton PagePrev",onClick:function(){r(Y)},disabled:d},"\u21d0"),o.a.createElement("input",{className:"PageNumberInput",name:"PageNumberInput",pattern:"[0-9]",type:"number",placeholder:parseInt(t)+1,onFocus:function(e){e.target.placeholder=""},onKeyPress:n,onBlur:n}),o.a.createElement("button",{className:"PageNumberButton PageNext",onClick:function(){r(R)},disabled:s},"\u21d2")))))}var ee=function(){var e=Object(j.c)((function(e){return e.todoId})),t=Object(j.b)(),a=Object(n.useState)(window.innerWidth),r=Object(c.a)(a,2),l=r[0],i=r[1];return Object(n.useEffect)((function(){window.addEventListener("resize",(function(){i(window.innerWidth)}))}),[]),o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"DemoBar"},o.a.createElement("p",{className:"DemoBarHeader"},"Demo Bar \xbb"),o.a.createElement("p",{className:"DemoBarItem",onClick:function(){t({type:N})}},"Try Demo Items"),o.a.createElement("p",{className:"DemoBarItem",onClick:function(){t(O({dateAdded:"2020-09-01T18:44",id:e,completed:!1,text:"Sample Important Todo",important:!0,expires:null}))}},"Add Important Item"),o.a.createElement("p",{className:"DemoBarItem",onClick:function(){var a={dateAdded:P(),id:e,completed:!1,text:"Sample Expired Todo",important:!1,expires:"2000-01-01T08:00"};t(O(a))}},"Add Expired Item"),o.a.createElement("p",{className:"DemoBarItem",onClick:function(){var a={dateAdded:P(),id:e,completed:!0,text:"Sample Completed Todo",important:!1,expires:null};t(O(a))}},"Add Completed Item")),o.a.createElement("div",{className:"App"},o.a.createElement("h1",{className:"Header"}," \u27b2 To-Do List"),o.a.createElement("div",{className:"AppBody"},o.a.createElement(A,null),o.a.createElement("hr",{className:"Divider"}),l>720?o.a.createElement(V,null):o.a.createElement(K,null),o.a.createElement("hr",{className:"Divider"}),o.a.createElement(Z,null))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var te=a(7),ae=function(e,t){for(var a=0;a<e.length;a++)if(e[a].id===t)return a;return-1},ne=function(e,t,a){if(e<0)return 0;var n=Math.max(0,Math.ceil(a/t)-1);return e>n?n:e},oe=Object(te.b)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:z,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case i:return Object.assign({},e,{todoId:e.todoId+1,todos:[].concat(Object(B.a)(e.todos),[t.payload])});case d:for(var a=Object(B.a)(e.todos),n=t.payload,o=-1,r=0;r<a.length;r++)if(a[r].id===n){o=r;break}var l=Object.assign({},a[o]);return l.important=!l.important,a.splice(o,1,l),Object.assign({},e,{todos:a});case s:for(var c=Object(B.a)(e.todos),O=t.payload,T=-1,y=0;y<c.length;y++)if(c[y].id===O){T=y;break}c.splice(T,1);var C=ne(e.pageIndex,e.itemsPerPage,c.length);return Object.assign({},e,{todos:c,pageIndex:C});case m:for(var D=t.payload,I=Object(B.a)(e.todos),S=-1,j=0;j<I.length;j++)if(I[j].id===D){S=j;break}var P=Object.assign({},I[S]);return P.completed=!P.completed,I.splice(S,1,P),Object.assign({},e,{todos:I});case u:var k=t.payload,w=Object(B.a)(e.todos),A=ae(w,k),L=Object.assign({},w[A]);return L.expires=null,w.splice(A,1,L),Object.assign({},e,{todos:w});case p:var _=t.payload,F=_.id,M=_.selectedExpiryDate,U=Object(B.a)(e.todos),X=ae(U,F),G=Object.assign({},U[X]);return G.expires=M,U.splice(X,1,G),Object.assign({},e,{todos:U});case E:var W=t.payload,V=W.id,q=W.newTodoText,J=Object(B.a)(e.todos),K=ae(J,V),$=Object.assign({},J[K]);return $.text=q,J.splice(K,1,$),Object.assign({},e,{todos:J});case b:return Object.assign({},e,{itemsPerPage:t.payload,pageIndex:0});case g:var Q=0;switch(t.payload){case R:Q=e.pageIndex+1;break;case Y:Q=e.pageIndex-1;break;default:var Z;if(e.showCompleted)Z=e.todos.length;else{var ee=Object(B.a)(e.todos),te=ee.filter((function(e){return!e.completed}));Z=te.length}Q=ne(t.payload,e.itemsPerPage,Z)}return Object.assign({},e,{pageIndex:Q});case f:var oe=Object(B.a)(e.todos),re=Date.now(),le=oe.filter((function(e,t){var a=e.expires;if(!a)return!0;var n=Date.parse(a);return re-n<=0})),ce=ne(e.pageIndex,e.itemsPerPage,le.length);return Object.assign({},e,{todos:le,pageIndex:ce});case h:var ie=Object(B.a)(e.todos),de=ie.filter((function(e){return!e.completed})),se=ne(e.pageIndex,e.itemsPerPage,de.length);return Object.assign({},e,{todos:de,pageIndex:se});case v:return Object.assign({},e,{autoDeleteCompleted:t.payload});case x:var me=e.pageIndex;if(!t.payload){var ue=Object(B.a)(e.todos),pe=ue.filter((function(e){return!e.completed})),Ee=ne(e.pageIndex,e.itemsPerPage,pe.length);me=Ee}return Object.assign({},e,{showCompleted:t.payload,pageIndex:me});case N:return Object.assign({},e,{todos:H,todoId:H.length});default:return e}}),window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__());l.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(j.a,{store:oe},o.a.createElement(ee,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[13,1,2]]]);
//# sourceMappingURL=main.ab91df86.chunk.js.map