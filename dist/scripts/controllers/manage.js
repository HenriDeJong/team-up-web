define(["controllers/controllers"],function(e){e.controller("manageCtrl",["$rootScope","$scope","$location","Clients","$route","$routeParams","Store","Teams","$window","data","TeamUp","$timeout",function(e,t,n,r,i,s,o,u,a,f,l,c){function h(e){if(e&&e.local){var n=o("app").get("teams"),r={teamClients:{},teams:{},clients:{}},i=[],s=[];e.teams=[],angular.forEach(n,function(t){e.teams.push({id:t.uuid,name:t.name});var n=[];angular.forEach(o("app").get(t.uuid),function(e){typeof e.uuid!="undefined"&&(n.push(e.uuid),i.push({name:e.firstName+" "+e.lastName,id:e.uuid})),s.indexOf(e.uuid)==-1&&s.push(e.uuid)}),r.teams[t.uuid]=n}),angular.forEach(o("app").get("members"),function(e){s.indexOf(e.uuid)==-1&&i.push({name:e.firstName+" "+e.lastName,id:e.uuid})}),e.members=i,e.groups=o("app").get("ClientGroups");var a=[],f=[],l=[];return angular.forEach(e.groups,function(e){var t=[];angular.forEach(o("app").get(e.id),function(e){e!=null&&t.indexOf(e.uuid)==-1&&typeof e.uuid!="undefined"&&(t.push(e.uuid),f.push({name:e.firstName+" "+e.lastName,id:e.uuid})),e!=null&&l.indexOf(e.uuid)==-1&&l.push(e.uuid)}),r.clients[e.id]=t,a.push(e.id)}),angular.forEach(o("app").get("clients"),function(e){l.indexOf(e.uuid)==-1&&(l.push(e.uuid),f.push({name:e.firstName+" "+e.lastName,id:e.uuid}))}),e.clients=f,r.teamClients=u.queryLocalClientGroup(n),t.connections=r,{data:e,con:r}}return{data:{},con:{}}}function v(e){t.views={teamClients:!1,teams:!1,clients:!1},t.views[e]=!0;var n=h(f);f=n.data,d=n.con}var p=h(f);f=p.data;var d=p.con;t.data={left:[],right:[]},t.setViewTo=function(r){if(typeof t.dataChanged!="undefined"&&t.dataChanged(n.$$hash)&&!confirm(e.ui.teamup.managePanelchangePrompt))return event.preventDefault(),!1;t.$watch(r,function(){n.hash(r),v(r),t.manage(r)})},t.setViewTo("teamClients"),t.connector={data:d,connections:{teamClients:[],teams:{},clients:{}},teamClients:function(){return this.connections.teamClients=[],angular.forEach(this.data.teamClients,function(e,t){var n={sourceItems:[],targetItem:{}};angular.forEach(f.teams,function(e){e.id==t&&(n.targetItem=e)});var r;for(var i=0;i<f.groups.length;i++)f.groups[i].id==e&&(r=f.groups[i],n.sourceItems.push(r));this.connections.teamClients.push(n)}.bind(this)),this.connections},populate:function(e,t,n){var r={};return angular.forEach(e,function(e,i){r[i]=[],angular.forEach(e,function(e){angular.forEach(t,function(t){t.id==e&&r[i].push({_id:t.id,name:t.name,_parent:n+i})})})}),r},teams:function(){return this.connections.teams={},this.connections.teams=this.populate(this.data.teams,f.members,"teams_right_"),this.connections},clients:function(){return this.connections.clients={},this.connections.clients=this.populate(this.data.clients,f.clients,"clients_right_"),this.connections}},t.manage=function(n){switch(n){case"teamClients":e.$broadcast("TreeGridManager",n,"1:1",{left:f.groups,right:f.teams},t.connector.teamClients());break;case"teams":e.$broadcast("TreeGridManager",n,"1:n",{left:f.members,right:f.teams},t.connector.teams());break;case"clients":e.$broadcast("TreeGridManager",n,"1:n",{left:f.clients,right:f.groups},t.connector.clients())}},t.getChanges=function(e,t){var n={};return angular.forEach(e,function(e,r){var i=[],s=t[r];angular.forEach(e,function(e){angular.forEach(s,function(t){e==t&&i.push(e)})}),angular.forEach(i,function(t){e.splice(e.indexOf(t),1),s.splice(s.indexOf(t),1)});var o=[],u=[];angular.copy(e,u),angular.copy(s,o);if(o.length>0||u.length>0)n[r]={a:o,r:u};angular.forEach(i,function(t){e.push(t),s.push(t)})}),angular.forEach(t,function(t,r){angular.forEach(e,function(e,t){r==t&&(r=null)}),r!=null&&(n[r]={a:t,r:[]})}),n},e.$$listeners["save:teamClients"]&&e.$$listeners["save:teamClients"].length>0&&(e.$$listeners["save:teamClients"]=[]),e.$$listeners["save:teams"]&&e.$$listeners["save:teams"].length>0&&(e.$$listeners["save:teams"]=[]),e.$$listeners["save:clients"]&&e.$$listeners["save:clients"].length>0&&(e.$$listeners["save:clients"]=[]),t.getChangesFromTeamClients=function(e){var n=t.connections.teamClients,r=e,i=[];angular.forEach(n,function(e,t){i.indexOf(t)==-1&&i.push(t)}),angular.forEach(r,function(e,t){i.indexOf(t)==-1&&i.push(t)});var s={};return angular.forEach(i,function(e){typeof n[e]=="undefined"&&r[e]?s[e]={a:[r[e]],r:[]}:typeof r[e]=="undefined"&&n[e]?s[e]={r:[n[e]],a:[]}:n[e]&&r[e]&&n[e]!=r[e]&&(s[e]={a:[r[e]],r:[n[e]]})}),s},t.safeApply=function(e){var t=this.$root.$$phase;t=="$apply"||t=="$digest"?e&&typeof e=="function"&&e():this.$apply(e)},t.applyTeamClientsChanges=function(t){e.statusBar.display(e.ui.teamup.refreshing),u.manageGroups(t).then(function(t){var n="";angular.forEach(t,function(e){e.error&&(n+=e.error.data.error)}),n==""?(e.notifier.success(e.ui.teamup.dataChanged),c(function(){i.reload()},250)):e.notifier.error(n),e.statusBar.off()})},e.$on("save:teamClients",function(){var e=t.getChangesFromTeamClients(arguments[1]);angular.equals({},e)||t.applyTeamClientsChanges(e)}),t.applyTeamsChanges=function(t){e.statusBar.display(e.ui.teamup.refreshing),u.manage(t).then(function(){e.notifier.success(e.ui.teamup.dataChanged),c(function(){i.reload()},250)})},e.$on("save:teams",function(){var e=t.getChanges(t.connections.teams,arguments[1]);angular.equals({},e)||t.applyTeamsChanges(e)}),e.$on("save:clients",function(){var n=t.getChanges(t.connections.clients,arguments[1]);angular.equals({},n)||(e.statusBar.display(e.ui.teamup.refreshing),r.manage(n).then(function(){e.notifier.success(e.ui.teamup.dataChanged),e.statusBar.off(),c(function(){i.reload()},250)}))}),t.dataChanged=function(e){var n=e.split("#"),r=n[n.length-1],i={};return r=="teamClients"?i=t.getChangesFromTeamClients(t.$$childTail.getData.teamClients()):r=="teams"?i=t.getChanges(t.connections.teams,t.$$childTail.getData.teams()):r=="clients"&&(i=t.getChanges(t.connections.clients,t.$$childTail.getData.clients())),angular.equals({},i)?!1:!0}}])});