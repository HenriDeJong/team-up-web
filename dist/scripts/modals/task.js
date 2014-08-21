define(["services/services","config"],function(e,t){e.factory("Task",["$rootScope","$resource","$q","$filter","Store","TeamUp","Teams","Clients",function(e,n,r,i,s,o,u,a){var f=n(),l=function(n){_.each(n,function(n){n.statusLabel=t.app.taskStates[n.status],n.relatedClient=e.getClientByID(n.relatedClientUuid),n.relatedClient.fullName=n.relatedClient.firstName+" "+n.relatedClient.lastName,n.relatedClient.fullAddress=n.relatedClient.address.street+" "+n.relatedClient.address.no+", "+n.relatedClient.address.city,n.plannedTaskDuration={difference:n.plannedEndVisitTime-n.plannedStartVisitTime},n.plannedTaskDuration.label=n.plannedTaskDuration.difference/1e3/60/60<=24?i("date")(n.plannedStartVisitTime,"d MMM y")+" "+i("date")(n.plannedStartVisitTime,"EEEE")+" "+i("date")(n.plannedStartVisitTime,"HH:mm")+" - "+i("date")(n.plannedEndVisitTime,"HH:mm")+" uur":i("date")(n.plannedStartVisitTime,"d MMM y")+" "+i("date")(n.plannedStartVisitTime,"EEEE")+" "+i("date")(n.plannedStartVisitTime,"HH:mm")+" uur - "+i("date")(n.plannedEndVisitTime,"d MMM y")+" "+i("date")(n.plannedEndVisitTime,"EEEE")+" "+i("date")(n.plannedEndVisitTime,"HH:mm")+" uur",n.assignedTeamMemberUuid!=""&&(n.assignedTeamMember=e.getTeamMemberById(n.assignedTeamMemberUuid))})},c=function(e){return _.each(["statusLabel","relatedClient","plannedTaskDuration","assignedTeamMember"],function(t){delete e[t]}),e};return f.prototype.queryMine=function(){return o._("taskMineQuery").then(function(e){return e=_.sortBy(e,"plannedStartVisitTime"),l(e),s("app").save("myTasks2",e),e}.bind(this))},f.prototype.queryAll=function(){var e=r.defer(),t=[],n={};return _.each(s("app").get("teams"),function(e){t.push(o._("taskByTeam",{fourth:e.uuid}).then(function(t){n[e.uuid]=t}))}),r.all(t).then(function(){var t=[];_.each(n,function(e){e.length>0&&_.each(e,function(e){t.push(e)})});var r=_.map(_.indexBy(t,function(e){return e.uuid}),function(e){return e});r=_.sortBy(r,"plannedStartVisitTime"),l(r);var i=_.groupBy(r,function(e){return e.status}),o={on:i[1].concat(i[2]),off:i[3].concat(i[4])};s("app").save("allTasks2",o),e.resolve(o)}.bind(n)),e.promise},f.prototype.update=function(e){return o._("taskUpdate",{second:e.uuid},c(_.clone(e)))},f.prototype.chains=function(){var e={},t=s("app").get("teams"),n=s("app").get("clients"),r=s("app").get("ClientGroups"),i;_.each(t,function(t){i=s("app").get("teamGroup_"+t.uuid)[0],e[t.uuid]={team:t,members:s("app").get(t.uuid)}})},new f}])});