define(["services/services"],function(e){e.factory("Teams",["$resource","$q","Store","$rootScope","TeamUp",function(e,t,n,r,i){var s=e();return s.prototype.query=function(e,r){var s=t.defer();return i._("teamQuery").then(function(o){n("app").save("teams",o);if(!e){var u=[],a={teams:o,members:{}};angular.forEach(o,function(e){typeof r=="undefined"||e.uuid==r.uuid?u.push(function(e,t,n){i._("teamStatusQuery",{third:e.uuid},null,{success:function(r){n("app").save(e.uuid,r),t.members[e.uuid]=[],t.members[e.uuid]=r}})}(e,a,n)):a.members[e.uuid]=n("app").get(e.uuid)}),t.all(u).then(function(){s.resolve(a)})}else s.resolve(o)}),s.promise},s.prototype.queryLocal=function(){var e={teams:n("app").get("teams"),members:{}};return angular.forEach(e.teams,function(t){e.members[t.uuid]=n("app").get(t.uuid)}),e},s.prototype.queryClientGroups=function(e){var r=t.defer(),s=[],o={};return o.groups={},o.teams=e,angular.forEach(e,function(e){s.push(function(e,t){return{id:e.uuid,data:i._("teamClientGroupQuery",{second:e.uuid}).then(function(r){return n("app").save("teamGroup_"+e.uuid,r.length==4&&r[0][0]=="n"&&r[1][0]=="u"?[]:r),t.groups[e.uuid]=[],t.groups[e.uuid]=r.data,r})}}(e,o))}),t.all(s).then(function(t){angular.forEach(e,function(n){o.teams=e,o.groups[n.uuid]=[],angular.forEach(t,function(e){o.groups[n.uuid]=e.data})}.bind(t)),r.resolve(o)}.bind(o)),r.promise},s.prototype.queryLocalClientGroup=function(e){var t=[],r=n("app").get("ClientGroups");angular.forEach(r,function(e){t.push(e.id)});var i={};return angular.forEach(e,function(e){var r=!0,s=n("app").get("teamGroup_"+e.uuid);s==[],s=angular.fromJson(localStorage.getItem("app.teamGroup_"+e.uuid)).value,angular.forEach(s,function(n){t.indexOf(n.id)!=-1&&r&&(i[e.uuid]=n.id,r=!1)})}),i},s.prototype.manage=function(e){var n=t.defer(),r=[];return angular.forEach(e,function(e,t){e.a.length>0&&e.r.length==0&&r.push(i._("teamMemberAdd",{second:t},{ids:e.a})),e.r.length>0&&e.a.length==0&&r.push(i._("teamMemberDelete",{second:t},{ids:e.r})),e.a.length>0&&e.r.length>0&&r.push(i._("teamMemberUpdate",{second:t},{remove:e.r,add:e.a}))}),t.all(r).then(function(){var r=[],i={};angular.forEach(e,function(e,t){var n={uuid:t};r.push(s.prototype.query(!1,n))}),t.all(r).then(function(){n.resolve(i)})}),n.promise},s.prototype.manageGroups=function(e){var r=t.defer(),s=[];return angular.forEach(e,function(e,t){e.a.length>0&&e.r.length==0&&s.push(i._("teamClientGroupAdd",{second:t},{ids:e.a})),e.r.length>0&&e.a.length==0&&s.push(i._("teamClientGroupDelete",{second:t},{ids:e.r})),e.a.length>0&&e.r.length>0&&s.push(i._("teamClientGroupUpdate",{second:t},{remove:e.r,add:e.a}))}),t.all(s).then(function(s){var o=s,u=[];angular.forEach(e,function(e,t){u.push(function(e){return{id:e,data:i._("teamClientGroupQuery",{second:e}).then(function(t){return n("app").save("teamGroup_"+e,t.length==4&&t[0][0]=="n"&&t[1][0]=="u"?[]:t),t})}}(t))}),t.all(u).then(function(){r.resolve(o)})}),r.promise},new s}])});