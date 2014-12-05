define(["controllers/controllers","config"],function(e,t){e.controller("login",["$rootScope","$location","$q","$scope","Session","Teams","Clients","Store","$routeParams","TeamUp","Dater","$filter","MD5",function(e,n,r,i,s,o,u,a,f,l,c,h,p){function m(){l._("teamMemberFree").then(function(e){a("app").save("members",e)})}function g(e){l._("taskMineQuery").then(function(e){a("app").save("myTasks",e)});var t=[];angular.forEach(e,function(e){l._("taskByTeam",{fourth:e.uuid}).then(function(e){angular.forEach(e,function(e){var n=h("getByUuid")(t,e.uuid);n==null&&t.push(e)}),a("app").save("allTasks",t)})})}function y(){var t=a("app").get("resources"),n=_.pluck(i.$root.getTeamsofMembers(t.uuid),"uuid");t.teamUuids=n,e.app.resources=t,a("app").save("resources",t)}function b(){var t=["myTasks","allTasks"];angular.forEach(t,function(t){var n=a("app").get(t);angular.forEach(n,function(t){if(typeof t=="object"){var n=e.getClientByID(t.relatedClientUuid);n!=null&&(t.relatedClientName=n.firstName+" "+n.lastName)}}),a("app").save(t,n)})}console.log(t.app.tabs),c.registerPeriods(),n.path()=="/logout"&&angular.element("body").css({backgroundColor:"#1dc8b6",backgroundImage:"none"}),f.uuid&&f.key?(i.views={changePass:!0},i.changepass={uuid:f.uuid,key:f.key}):i.views={login:!0,forgot:!1},i.alert={login:{display:!1,type:"",message:""},forgot:{display:!1,type:"",message:""}},a("app").get("app")||a("app").save("app","{}"),angular.element(".navbar").hide(),angular.element("#footer").hide(),angular.element("#watermark").hide(),angular.element("body").css({backgroundColor:"#1dc8b6"});var d=a("app").get("loginData");d&&d.remember&&(i.loginData=d),i.login=function(){angular.element("#alertDiv").hide();if(!i.loginData||!i.loginData.username||!i.loginData.password)return i.alert={login:{display:!0,type:"alert-error",message:e.ui.login.alert_fillfiled}},angular.element("#login button[type=submit]").text(e.ui.login.button_login).removeAttr("disabled"),!1;angular.element("#login button[type=submit]").text(e.ui.login.button_loggingIn).attr("disabled","disabled"),a("app").save("loginData",{username:i.loginData.username,password:i.loginData.password,remember:i.loginData.remember}),v(i.loginData.username,p(i.loginData.password))};var v=function(t,n){l._("login",{uuid:t,pass:n}).then(function(t){var n=0;t.status?n=t.status:t.error&&t.error.status&&(n=t.error.status);if(n==400||n==403||n==404)return i.alert={login:{display:!0,type:"alert-error",message:e.ui.login.alert_wrongUserPass}},angular.element("#login button[type=submit]").text(e.ui.login.button_loggingIn).removeAttr("disabled"),!1;if(t.status==0)return i.alert={login:{display:!0,type:"alert-error",message:e.ui.login.alert_network}},angular.element("#login button[type=submit]").text(e.ui.login.button_loggingIn).removeAttr("disabled"),!1;if(t.error)return i.alert={login:{display:!0,type:"alert-error",message:e.ui.login.alert_wrongUserPass}},angular.element("#login button[type=submit]").text(e.ui.login.button_loggingIn).removeAttr("disabled"),console.log("Pay attention, this might caused by the Log module"),!1;s.set(t["X-SESSION_ID"]),w()})},w=function(){angular.element("#login").hide(),angular.element("#download").hide(),angular.element("#preloader").show(),E(20,e.ui.login.loading_User),l._("user").then(function(r){r.error?console.warn("error ->",r):(e.app.resources=r,a("app").save("resources",e.app.resources),E(40,e.ui.login.loading_teams),o.query(!0,{}).then(function(r){m(),g(r),r.error&&console.warn("error ->",r),E(60,e.ui.login.loading_teams),o.queryClientGroups(r).then(function(){E(80,e.ui.login.loading_clientGroups),l._("clientsQuery").then(function(r){a("app").save("clients",r),u.query(!1,{}).then(function(){E(100,e.ui.login.loading_everything),b(),o.query().then(function(){y(),_.each(t.app.tabs,function(e,t){t=="tasks2"&&e==1?n.path("/tasks2"):t=="teamtelefoon"&&e==1&&n.path("/team-telefoon")}),setTimeout(function(){angular.element(".navbar").show(),angular.element("body").css({background:"url(../images/bg.jpg) repeat"}),e.browser.mobile||angular.element("#footer").show()},100)})})})})}))})},E=function(e,t){angular.element("#preloader .progress .bar").css({width:e+"%"}),angular.element("#preloader span").text(t)};localStorage.hasOwnProperty("sessionTimeout")&&(localStorage.removeItem("sessionTimeout"),i.alert={login:{display:!0,type:"alert-error",message:e.ui.teamup.sessionTimeout}})}])});