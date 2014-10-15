define(["controllers/controllers"],function(e){e.controller("tasks2Ctrl",["$rootScope","$scope","$location","$timeout","$filter","Store","TeamUp","Task","Teams","Clients","Dater",function(e,t,n,r,i,s,o,u,a,f,l){function S(){t.tasks={mine:{loading:!0,list:[]},all:{loading:!0,list:[]}},t.views={myTasks:!1,allTasks:!1,newTask:!1},t.showAllTasks=!1,t.showOnlyAvailable=!0,t.reversed=!0,t.order="plannedStartVisitTime"}function T(e,n){u.queryMine().then(function(e){t.tasks.mine={loading:!1,list:e},n&&n.call(this,e)}),e||N()}function N(e){T(!0),u.queryAll().then(function(n){t.tasks.all={loading:!1,list:n.on},e&&e.call(this,n)})}function C(t,n){u.update(t).then(function(r){if(r.error){e.notifier.error(e.transError(r.error.data?r.error.data.result:r.error)),t.assignedTeamMemberUuid=null;return}T(n)})}function k(e){o._("profileGet",{third:e},null).then(function(e){t.author=e.firstName+" "+e.lastName})}e.fixStyles(),e.showChangedAvatar("team",e.app.resources.uuid);var c=n.hash()?n.hash():"myTasks",h=s("app").get("currentTeamClientGroup"),p=function(e,t){return i("date")(e,t)},d=function(e,t){var n=p(e,"m");n%=15;var r=new Date(e.getTime()-n*6e4+t*6e4);return p(r,"H:mm")},v=new Date,m=p(v,"dd-MM-yyyy"),g=d(v,15),y=d(v,30),b=a.queryLocal(),w=f.queryLocal(),E=a.queryLocalClientGroup(b.teams);t.teams=b.teams,t.currentTeam=t.teams[0].uuid,t.task={team:t.teams[0].uuid,start:{date:m,time:g},end:{date:m,time:y}},h.team&&(t.task.team=h.team,t.currentTeam=h.team);var x=function(e){S(),t.tasks=t.tasks?t.tasks:{},t.views[e]=!0,n.hash(e);switch(e){case"myTasks":var i=s("app").get("myTasks2"),o=0;i.length>0&&(t.tasks.mine={loading:!1,list:i},o=250),r(function(){T()},o);break;case"allTasks":var u=s("app").get("allTasks2");if(u.on||u.off)t.tasks.all={loading:!1,list:u.on};r(function(){N()},250);break;case"newTask":}};t.setViewTo=function(e){t.$watch(e,function(){n.hash(e),x(e)})},x(c),t.$watch("showAllTasks",function(e){var n=s("app").get("allTasks2");e?t.tasks.all.list=n.on.concat(n.off):t.tasks.all.list=n.on}),t.openTask=function(e){t.task=e,e.assignedTeamFullName=_.where(b.teams,{uuid:e.assignedTeamUuid})[0].name,e.relatedClient.clientGroupName=_.where(w.clientGroups,{id:e.relatedClient.clientGroupUuid})[0].name,k(e.authorUuid),angular.element("#taskModal").modal("show")},t.orderBy=function(e){t.ordered=e,t.reversed=!t.reversed},t.assignTask=function(t){t.assignedTeamMemberUuid=e.app.resources.uuid,C(t,!0),x("myTasks")},t.unAssignTask=function(e){e.assignedTeamMemberUuid=null,e.assignedTeamUuid=null,C(e)},t._task={},t.confirmDeleteTask=function(e){r(function(){t._task=e,angular.element("#confirmTaskModal").modal("show")})},t.deleteTask=function(n){t._task={},angular.element("#confirmTaskModal").modal("hide"),o._("taskDelete",{second:n.uuid},n).then(function(t){t.error?t.error.data?e.notifier.error(t.error.data):e.notifier.error(t.error):(e.notifier.success(e.ui.task.taskDeleted),T())})},t.members=b.members[t.currentTeam],t.groups=[],t.clients=[],t.teamAffectGroup=function(){angular.forEach(w.clientGroups,function(e){t.currentGroup==e.id&&(t.groups=[],t.groups.push(e))}),t.groupAffectClient(t.currentGroup)},t.groupAffectClient=function(e){t.clients=w.clients[e],(t.curentClient==null||typeof t.curentClient=="undefined")&&t.clients&&t.clients.length>0?t.curentClient=t.clients[0].uuid:t.curentClient=null,t.task&&t.task.client&&(t.task.client=t.curentClient)},typeof E[t.currentTeam]=="undefined"?t.currentGroup=null:(t.currentGroup=E[t.currentTeam],t.teamAffectGroup(),t.groupAffectClient(t.currentGroup)),t.changeClientGroup=function(e){t.groupAffectClient(e)},t.changeTeam=function(e){t.members=b.members[e],t.currentGroup=E[e],t.teamAffectGroup()},t.changeTeam(t.currentTeam),u.chains(),t.validateTaskForm=function(n){return!n||!n.start||!n.end?(e.notifier.error(e.ui.task.filltheTime),!1):n.start.date==""||n.start.time==""||!n.start.time?(e.notifier.error(e.ui.task.startTimeEmpty),!1):n.end.date==""||n.end.time==""||!n.end.time?(e.notifier.error(e.ui.task.endTimeEmpty),!1):(t.task.startTime=e.browser.mobile?(new Date(n.start.date)).getTime():l.convert.absolute(n.start.date,n.start.time,!1),t.task.endTime=e.browser.mobile?(new Date(n.end.date)).getTime():l.convert.absolute(n.end.date,n.end.time,!1),t.task.startTime<=Date.now().getTime()||t.task.endTime<=Date.now().getTime()?(e.notifier.error(e.ui.task.planTaskInFuture),!1):t.task.startTime>=t.task.endTime?(e.notifier.error(e.ui.task.startLaterThanEnd),!1):!n.client||n.client==null?(e.notifier.error(e.ui.task.specifyClient),!1):!0)},t.createTask=function(n){if(!t.validateTaskForm(n))return;var r={uuid:"",status:2,plannedStartVisitTime:t.task.startTime,plannedEndVisitTime:t.task.endTime,relatedClientUuid:n.client,assignedTeamUuid:n.team,description:n.description,assignedTeamMemberUuid:n.member};o._("taskAdd",null,r).then(function(t){t.error?t.error.data?e.notifier.error(e.transError(t.error.data.result)):e.notifier.error(e.transError(t.error)):n.member==e.app.resources.uuid?T(!0,function(){x("myTasks"),e.notifier.success(e.ui.task.taskSaved)}):N(function(){x("allTasks"),e.notifier.success(e.ui.task.taskSaved)})})}}])});