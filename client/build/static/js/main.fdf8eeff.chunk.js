(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{109:function(e,t,n){},111:function(e,t,n){},114:function(e,t,n){},138:function(e,t){},141:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),i=n(36),r=n.n(i),s=(n(63),n(7)),c=n(8),l=n(10),u=n(9),h=n(11),m=(n(65),n(53)),p=n.n(m),g=n(3),f=function(){return o.a.createElement(a.Fragment,null,o.a.createElement("img",{className:"loggo",src:p.a,alt:"GitHub loggo"}),o.a.createElement(g.Button,null,o.a.createElement("a",{className:"link",href:"/api/login/github"},"Log in with Github")))},v=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement("header",{className:"App-header"},o.a.createElement(f,null)))}}]),t}(a.Component),b=n(143),E=n(145),k=n(142),d=n(12),A=n.n(d),j=n(17),O=n(5),w=n(144),N=(n(109),n(37)),D=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={bool:n.checker()},n.handleChange=n.handleChange.bind(Object(O.a)(Object(O.a)(n))),console.log("asd"),n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"handleChange",value:function(){var e;this.setState({bool:!this.state.bool}),console.log(!this.state.setting),console.log(this.props.belongsTo,!this.state.bool),console.log(this.props.user),this.props.socketIo.emit("boolean",{belongs:this.props.repo,boolean:!this.state.bool,hook:this.props.hook,username:this.props.user}),this.props.socketIo.emit("hookSettings",(e={boolean:!this.state.bool,hook:this.props.hook,belongs:this.props.repo},Object(N.a)(e,"hook",this.props.hook),Object(N.a)(e,"username",this.props.user),e))}},{key:"checker",value:function(){var e,t,n,a=this;e=this.props.socketIo,t=this.props.user,n=function(e){console.log(e);var t=!1;e.length&&e.forEach(function(e){e.belongsTo===a.props.belongsTo&&(t=e.bool)}),a.setState(function(){return{bool:t}})},e.emit("sendData",t),e.on("setSettings",n)}},{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("p",null,"Set up Hook"),o.a.createElement("label",{className:"switch"},o.a.createElement("input",{type:"checkbox",defaultChecked:this.state.bool,onClick:this.handleChange}),o.a.createElement("span",{className:"slider round"})))}}]),t}(a.Component),y=(n(111),function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={orgs:[],repos:[],showInfo:!1,item:null,user:""},n._isMounted=!1,n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.fetchOrgs(),this.fetchRepos()}},{key:"componentWillUnmount",value:function(){this._isMounted=!1}},{key:"fetchOrgs",value:function(){var e=Object(j.a)(A.a.mark(function e(){var t,n;return A.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("/api/orgs");case 3:return t=e.sent,e.next=6,t.json();case 6:n=e.sent,this.setState({orgs:n}),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0);case 13:case"end":return e.stop()}},e,this,[[0,10]])}));return function(){return e.apply(this,arguments)}}()},{key:"fetchRepos",value:function(){var e=Object(j.a)(A.a.mark(function e(){var t,n;return A.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("/api/repos");case 3:return t=e.sent,e.next=6,t.json();case 6:n=e.sent,this.setState({repos:n}),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0);case 13:case"end":return e.stop()}},e,this,[[0,10]])}));return function(){return e.apply(this,arguments)}}()},{key:"renderRepos",value:function(e){var t=this;return this.state.repos.map(function(n,a){if(e.id===n.Organizations)return o.a.createElement("div",{key:a},o.a.createElement(g.Collection,null,o.a.createElement(g.CollectionItem,null,o.a.createElement("b",null,n.repo)),o.a.createElement(g.CollectionItem,null,n.admin?o.a.createElement(D,{hook:n.hook,belongsTo:n.repo,repo:n.repo,socketIo:t.props.socket,user:t.props.currentUser.username}):o.a.createElement("p",null,"No promission allowed!"))))})}},{key:"toggleInfo",value:function(e){this.setState({info:e}),this.setState({showInfo:!this.state.showInfo})}},{key:"selectRender",value:function(){if(this.state.showInfo)return this.renderRepos(this.state.info)}},{key:"render",value:function(){var e=this;return o.a.createElement(a.Fragment,null,o.a.createElement("div",{className:"orgs"},o.a.createElement("ul",null,this.state.orgs.map(function(t,n){return o.a.createElement("li",{key:n},o.a.createElement(g.Col,{m:7,s:12},o.a.createElement(g.Card,{horizontal:!0,header:o.a.createElement(g.CardTitle,{image:t.img}),onClick:function(){return e.toggleInfo(t)}},o.a.createElement("h3",null,t.Organizations))))}))),o.a.createElement("div",{className:"middle"},this.selectRender()))}}]),t}(a.Component)),I=Object(w.a)(y),M=(n(114),function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={hookData:[],firstTime:!1},n._isMounted=!1,n.removeNotification=n.removeNotification.bind(Object(O.a)(Object(O.a)(n))),n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;this._isMounted=!0,this.fetchUnreadNotification(),this.props.socket.on("notification",function(t){e._isMounted&&e.setState({hookData:e.state.hookData.concat(t)})})}},{key:"componentWillUnmount",value:function(){this._isMounted=!1}},{key:"removeNotification",value:function(e){this.state.hookData.splice(e,1),this.setState({hookdata:this.state.hookData}),this.setState({firstTime:!1}),console.log(this.state.hookData)}},{key:"fetchUnreadNotification",value:function(){var e=Object(j.a)(A.a.mark(function e(){var t,n;return A.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/getNotifications");case 2:return t=e.sent,e.next=5,t.json();case 5:n=e.sent,this.setState({hookData:this.state.hookData.concat(n)}),this.setState({firstTime:!0}),console.log(this.state.unReadNotification);case 9:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"renderData",value:function(){var e=this;return console.log(this.state.hookData),this.state.hookData.length>0?this.state.hookData.map(function(t,n){return o.a.createElement("li",{key:n},t.subscribed?o.a.createElement(g.Collapsible,null,o.a.createElement(g.Button,{onClick:function(){return e.removeNotification(n)}},"Remove"),o.a.createElement(g.CollapsibleItem,{header:"New Subscribtion",icon:"whatshot"},o.a.createElement("p",null,t.time),o.a.createElement("p",{className:"info"},"repository: ",t.repo),o.a.createElement("p",{className:"info"},t.login))):o.a.createElement(g.Collapsible,null,o.a.createElement(g.Button,{onClick:function(){return e.removeNotification(n)}},"Remove"),o.a.createElement(g.CollapsibleItem,{header:!1===t.sinceLastTime?"Since last time":"New Notification",icon:"whatshot"},o.a.createElement("p",null,t.time),o.a.createElement("p",{className:"info"},"repository: ",t.repo),o.a.createElement("p",{className:"info"},"action: ",t.action),o.a.createElement("p",{className:"info"},"from:",t.login))))}):(console.log("no hook"),null)}},{key:"render",value:function(){return o.a.createElement(a.Fragment,null,o.a.createElement("ul",null,o.a.createElement("div",null,this.renderData())))}}]),t}(a.Component)),S=n(56),C=n.n(S)()("https://examination1dv612.herokuapp.com/"+Object({NODE_ENV:"production",PUBLIC_URL:""}).PORT),U=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={hookData:[],email:"",toggel:!0,haveMail:""},n.handleChange=n.handleChange.bind(Object(O.a)(Object(O.a)(n))),n.keyPress=n.keyPress.bind(Object(O.a)(Object(O.a)(n))),n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){console.log(this.props.currentUser.username),this.checkifUserHaveInputMail()}},{key:"handleChange",value:function(e){this.setState({email:e.target.value})}},{key:"checkifUserHaveInputMail",value:function(){var e,t=this;e=function(e){t.setState({haveMail:e}),console.log(e)},C.on("AlreadyHaveMail",e)}},{key:"keyPress",value:function(e){if("NoEmail"===this.state.haveMail){this.setState({haveMail:e.target.value}),console.log(this.state.haveMail);var t={mail:this.state.email,user:this.props.currentUser.username};C.emit("email",t)}else C.emit("removeEmail",this.props.currentUser.username),this.setState({haveMail:"NoEmail"}),console.log("remove");console.log("asd")}},{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(g.Navbar,{right:!0},o.a.createElement(g.NavItem,{href:"/api/logout"},"Logout"),o.a.createElement(g.SideNav,{trigger:o.a.createElement(g.Button,null,"Fill in Email for Notification"),options:{closeOnClick:!0}},o.a.createElement(g.SideNavItem,{userView:!0,user:{img:o.a.createElement(g.Icon,null,"account_circle")}}),o.a.createElement("p",{className:"wrapper"},o.a.createElement("h3",null,"Github Dashboard"),o.a.createElement(g.Icon,null,"account_circle"),o.a.createElement("p",{className:"username"},this.props.currentUser.username)),"NoEmail"===this.state.haveMail?o.a.createElement("div",null,o.a.createElement("input",{type:"text",onChange:this.handleChange})," ",o.a.createElement(g.Button,{onClick:this.keyPress}," Accept")):o.a.createElement("p",null,""!==this.state.haveMail?this.state.haveMail:this.state.email,o.a.createElement(g.Button,{onClick:this.keyPress},"Remove my Email")))),o.a.createElement("div",{className:"div-left"},o.a.createElement(I,{currentUser:this.props.currentUser,socket:C})),o.a.createElement("div",{className:"div-right"},o.a.createElement(M,{socket:C})))}}]),t}(a.Component),B=function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(l.a)(this,Object(u.a)(t).call(this))).state={authenticate:!1,user:""},e}return Object(h.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=Object(j.a)(A.a.mark(function e(){var t,n;return A.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("/api/currentUser");case 3:return t=e.sent,e.next=6,t.json();case 6:n=e.sent,this.setState({user:n}),console.log(n),this.setState({authenticate:n}),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),console.log(e.t0);case 15:case"end":return e.stop()}},e,this,[[0,12]])}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return this.state.authenticate?o.a.createElement(U,{currentUser:this.state.user}):o.a.createElement(f,null)}}]),t}(a.Component),R=function(){return o.a.createElement(b.a,null,o.a.createElement(E.a,null,o.a.createElement(k.a,{exact:!0,path:"/",component:v}),o.a.createElement(k.a,{exact:!0,path:"/login",component:B})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(R,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},53:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFNTE3OEEyRTk5QTAxMUUyOUExNUJDMTA0NkE4OTA0RCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFNTE3OEEyRjk5QTAxMUUyOUExNUJDMTA0NkE4OTA0RCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU1MTc4QTJDOTlBMDExRTI5QTE1QkMxMDQ2QTg5MDREIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkU1MTc4QTJEOTlBMDExRTI5QTE1QkMxMDQ2QTg5MDREIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+FYrpWAAABrNJREFUeNrkW2ls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"},58:function(e,t,n){e.exports=n(141)},63:function(e,t,n){},65:function(e,t,n){}},[[58,2,1]]]);
//# sourceMappingURL=main.fdf8eeff.chunk.js.map