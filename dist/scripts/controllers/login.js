define(["controllers/controllers"],function(e){e.controller("login",["$rootScope","$location","$q","$scope","Session","Teams","Clients","Store","$routeParams","TeamUp","Dater",function(e,t,n,r,i,s,o,u,a,f,l){function p(){f._("teamMemberFree").then(function(e){u("app").save("members",e)})}l.registerPeriods(),t.path()=="/logout"&&angular.element("body").css({backgroundColor:"#1dc8b6",backgroundImage:"none"}),a.uuid&&a.key?(r.views={changePass:!0},r.changepass={uuid:a.uuid,key:a.key}):r.views={login:!0,forgot:!1},r.alert={login:{display:!1,type:"",message:""},forgot:{display:!1,type:"",message:""}},u("app").get("app")||u("app").save("app","{}"),angular.element(".navbar").hide(),angular.element("#footer").hide(),angular.element("#watermark").hide(),angular.element("body").css({backgroundColor:"#1dc8b6"});var c=u("app").get("loginData");c&&c.remember&&(r.loginData=c),r.login=function(){angular.element("#alertDiv").hide();if(!r.loginData||!r.loginData.username||!r.loginData.password)return r.alert={login:{display:!0,type:"alert-error",message:e.ui.login.alert_fillfiled}},angular.element("#login button[type=submit]").text(e.ui.login.button_login).removeAttr("disabled"),!1;angular.element("#login button[type=submit]").text(e.ui.login.button_loggingIn).attr("disabled","disabled"),u("app").save("loginData",{username:r.loginData.username,password:r.loginData.password,remember:r.loginData.remember}),h(r.loginData.username,MD5.parse(r.loginData.password))};var h=function(t,n){f._("login",{uuid:t,pass:n}).then(function(t){if(t.status==400||t.status==403||t.status==404)return r.alert={login:{display:!0,type:"alert-error",message:e.ui.login.alert_wrongUserPass}},angular.element("#login button[type=submit]").text(e.ui.login.button_loggingIn).removeAttr("disabled"),!1;if(t.status==0)return r.alert={login:{display:!0,type:"alert-error",message:e.ui.login.alert_network}},angular.element("#login button[type=submit]").text(e.ui.login.button_loggingIn).removeAttr("disabled"),!1;i.set(t["X-SESSION_ID"]),d()})},d=function(){angular.element("#login").hide(),angular.element("#download").hide(),angular.element("#preloader").show(),v(20,e.ui.login.loading_User),f._("user").then(function(n){n.error?console.warn("error ->",n):(e.app.resources=n,u("app").save("resources",n),v(40,e.ui.login.loading_Teams),s.query(!0,{}).then(function(n){p(),n.error&&console.warn("error ->",n),v(60,e.ui.login.loading_clientGroups),s.queryClientGroups(n).then(function(){v(80,e.ui.login.loading_clientGroups),f._("clientsQuery").then(function(n){u("app").save("clients",n),o.query(!1,{}).then(function(){v(100,e.ui.login.loading_everything),s.query().then(function(){t.path("/tasks"),setTimeout(function(){angular.element(".navbar").show(),angular.element("body").css({background:"url(../images/bg.jpg) repeat"}),e.browser.mobile||angular.element("#footer").show()},100)})})})})}))})},v=function(e,t){angular.element("#preloader .progress .bar").css({width:e+"%"}),angular.element("#preloader span").text(t)}}])});