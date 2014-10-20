define(["controllers/controllers","config"],function(e,t){e.controller("planboard",["$rootScope","$scope","$location","Dater","Store","Teams","Clients","TeamUp","Session",function(e,n,r,i,s,o,u,a,f){function v(){switch(n.section){case"teams":n.list=n.data.teams.list,typeof n.currentTeam=="undefined"&&(n.currentTeam=n.data.teams.list[0].uuid),n.changeCurrent(n.currentTeam);break;case"clients":n.list=n.data.clients.list,typeof n.currentClientGroup=="undefined"&&(n.currentClientGroup=n.data.clients.list[0].uuid),n.changeCurrent(n.currentClientGroup)}}function g(e){n.views={teams:!1,clients:!1,member:!1,slot:{add:!1,edit:!1}},n.views[e]=!0}var l=r.search(),c=s("app").get("teams"),h=s("app").get("ClientGroups"),p=o.queryLocalClientGroup(c),d="";n.data={teams:{list:[],members:{},tasks:[]},clients:{list:[],members:{},tasks:[]},user:[{count:0,end:1378681200,recursive:!0,start:1378504800,text:"com.ask-cs.State.Available",type:"availability",wish:0},{count:0,end:1378850400,recursive:!0,start:1378720800,text:"com.ask-cs.State.Available",type:"availability",wish:0}],members:[],synced:Number(Date.today()),periods:{start:Number(Date.today())-6048e5,end:Number(Date.today())+6048e5}},angular.forEach(c,function(e){var r=s("app").get(e.uuid);r&&r.length>0&&(n.data.teams.list.push({uuid:e.uuid,name:e.name}),n.data.teams.members[e.uuid]=[],angular.forEach(r,function(r){var i='<div class="roundedPicSmall memberStateNone" style="float: left; background-image: url('+t.app.host+t.app.namespace+"/team/member/"+r.uuid+"/photo?width="+80+"&height="+80+"&sid="+f.get()+');" memberId="'+r.uuid+'"></div>',s=i+'<div style="float: left; margin: 15px 0 0 5px; font-size: 14px;">'+r.firstName+" "+r.lastName+"</div>";n.data.teams.members[e.uuid].push({head:s,memId:r.uuid})}))}),angular.forEach(h,function(e){var r=s("app").get(e.id);r&&r.length>0&&(n.data.clients.list.push({uuid:e.id,name:e.name}),n.data.clients.members[e.id]=[],angular.forEach(r,function(r){var i='<div class="roundedPicSmall memberStateNone" style="float: left; background-image: url('+t.app.host+t.app.namespace+"/client/"+r.uuid+"/photo?width="+80+"&height="+80+"&sid="+f.get()+');" memberId="'+r.uuid+'"></div>',s=i+'<div style="float: left; margin: 15px 0 0 5px; font-size: 14px;">'+r.firstName+" "+r.lastName+"</div>";n.data.clients.members[e.id].push({head:s,memId:r.uuid})}))}),s("app").get("currentTeamClientGroup")&&(d=s("app").get("currentTeamClientGroup"),n.currentTeam=d.team?d.team:n.data.teams.list[0].uuid,n.currentClientGroup=d.clientGroup?d.clientGroup:n.data.clients.list[0].uuid);var m=function(){var e=!1,t=angular.forEach(s("app").all(),function(t,r){if(/teamGroup_/.test(r)&&t.hasOwnProperty("0")&&!e&&t[0].id==n.currentClientGroup)return e=!0,console.log("key ->",r,n.currentClientGroup),r});return e?t:!1};n.getTeamID=function(){m()},n.changeCurrent=function(t,i){angular.forEach(n.data[n.section].list,function(e){e.uuid==t&&(n.currentName=e.name)}),n.section=="teams"?(n.currentTeam=t,n.data.members=n.data[n.section].members[n.currentTeam]):n.section=="clients"&&(n.currentClientGroup=t,n.data.members=n.data[n.section].members[n.currentClientGroup]),n.data.section=n.section;var s=Number(Date.today())-6048e5,o=Number(Date.today())+6048e5,u=function(t,r,s){n.data[n.section].tasks=[],angular.forEach(t,function(e){if(e!=null){var t="";n.section=="teams"&&(t=e.assignedTeamMemberUuid),n.section=="clients"&&(t=e.relatedClientUuid),typeof n.data[n.section].tasks[t]=="undefined"&&(n.data[n.section].tasks[t]=[]),n.data[n.section].tasks[t].push(e)}}),e.$broadcast("timeliner",i?i:{start:r,end:s})};n.data.section=="teams"?(r.search({uuid:n.currentTeam}).hash("teams"),a._("teamTaskQuery",{second:n.currentTeam,from:s,to:o}).then(function(e){u(e,s,o)})):n.data.section=="clients"&&(r.search({uuid:n.currentClientGroup}).hash("clients"),a._("clientGroupTasksQuery",{second:n.currentClientGroup,from:s,to:o}).then(function(e){u(e,s,o)}))},n.setViewTo=function(e,t){n.$watch(t,function(){r.hash(t),n.section=t,v(),g(t)})},n.resetViews=function(){n.views.slot={add:!1,edit:!1}},e.$on("resetPlanboardViews",function(){n.resetViews()});var y,b;!l.uuid&&!r.hash()?(y=n.data.teams.list[0].uuid,b="teams",r.search({uuid:n.data.teams.list[0].uuid}).hash(b)):(y=l.uuid,b=r.hash()),n.setViewTo(y,b),n.self=this,n.current={layouts:{user:!0,group:!1,members:!1},day:i.current.today()+1,week:i.current.week(),month:i.current.month(),division:"all"},i.registerPeriods(),n.periods=i.getPeriods(),n.slot={};var w=i.current.today()-7<1?1:i.current.today()-7;n.timeline={id:"mainTimeline",main:!0,user:{id:e.app.resources.uuid,role:e.app.resources.role},current:n.current,options:{start:n.periods.days[w].last.day,end:n.periods.days[i.current.today()+7].last.day,min:n.periods.days[w].last.day,max:n.periods.days[i.current.today()+7].last.day},range:{start:n.periods.days[w].last.day,end:n.periods.days[i.current.today()+7].last.day},scope:{day:!1,week:!0,month:!1},config:{bar:t.app.timeline.config.bar,layouts:t.app.timeline.config.layouts,wishes:t.app.timeline.config.wishes,legenda:{},legendarer:t.app.timeline.config.legendarer,states:t.app.timeline.config.states,divisions:t.app.timeline.config.divisions,densities:t.app.timeline.config.densities}},$.browser.msie&&$.browser.version=="8.0"&&(n.timeline.options={start:n.periods.days[i.current.today()-7].last.timeStamp,end:n.periods.days[i.current.today()+7].last.timeStamp,min:n.periods.days[i.current.today()-7].last.timeStamp,max:n.periods.days[i.current.today()+7].last.timeStamp}),angular.forEach(t.app.timeline.config.states,function(e,t){n.timeline.config.legenda[t]=!0}),n.timeline.config.legenda.groups={more:!0,even:!0,less:!0},n.daterange=i.readable.date(n.timeline.range.start)+" / "+i.readable.date(n.timeline.range.end),n.processRelatedUsers=function(t){var r=[],i=angular.element(t.group).attr("memberId");if(n.views.teams){n.relatedUserLabel=e.ui.teamup.clients;var s=e.getTeamMemberById(i);typeof s.teamUuids!="undefined"&&s.teamUuids.length>0&&(r=e.getClientsByTeam(s.teamUuids))}else if(n.views.clients){n.relatedUserLabel=e.ui.planboard.members;var o=e.getClientByID(i);typeof o.clientGroupUuid!="undefined"&&o.clientGroupUuid!=""&&(r=e.getMembersByClient(o.clientGroupUuid))}return r},n.resetInlineForms=function(){n.slot={},n.original={},n.resetViews(),n.section=="teams"?n.changeCurrent(n.currentTeam):n.section=="clients"&&n.changeCurrent(n.currentClientGroup)}}])});