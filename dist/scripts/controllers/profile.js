define(["controllers/controllers","config"],function(e,t){e.controller("profileCtrl",["$rootScope","$scope","$q","$location","$window","$route","data","Store","Teams","Dater","$filter","TeamUp",function(e,n,r,i,s,o,u,a,f,l,c,h){function d(t){n.views={profile:!1,edit:!1,editImg:!1},n.views[t]=!0,n.views.user=e.app.resources.uuid==o.current.params.userId}e.fixStyles(),n.self=this,n.roles=t.app.roles,n.mfuncs=t.app.mfunctions,n.data=u,n.noImgURL=t.app.noImgURL,n.profilemeta=u,n.profilemeta.birthday=c("nicelyDate")(u.birthDate),n.currentRole=n.profilemeta.role,n.imgHost=t.app.host,n.ns=t.app.namespace;var p=[];n.selectTeams=a("app").get("teams"),angular.forEach(n.profilemeta.teamUuids,function(e){angular.forEach(n.selectTeams,function(t){t.uuid==e&&p.push(t)})}),p.length==0&&angular.forEach(n.selectTeams,function(e){e.uuid==sessionStorage.getItem(u.uuid+"_team")&&p.push(e)}),n.teams=p,n.forms={add:!1,edit:!1},d(i.hash()),n.setViewTo=function(e){n.$watch(i.hash(),function(){i.hash(e),d(e)})},n.save=function(t){if(n.currentRole!=t.role&&e.app.resources.uuid==t.uuid&&!confirm(e.ui.profile.roleChangePrompt))return;if(t.teamUuids==null||typeof t.teamUuids[0]=="undefined"){t.teamUuids=[],n.teams.length==0?t.teamUuids.push(sessionStorage.getItem(t.uuid+"_team")):t.teamUuids.push(n.teams[0].uuid);if(t.teamUuids[0]==null){e.notifier.error(e.ui.profile.specifyTeam);return}}e.statusBar.display(e.ui.profile.saveProfile);try{t.birthDate=l.convert.absolute(t.birthday,0)}catch(r){console.log(r),e.notifier.error(e.ui.teamup.birthdayError);return}delete t.birthday,h._("profileSave",{second:t.teamUuids[0],fourth:t.uuid},t).then(function(r){r.error?(e.notifier.error("Error with saving profile information."),console.warn("error ->",r)):(e.statusBar.display(e.ui.profile.refreshing),h._("profileGet",{third:o.current.params.userId},null,function(t){o.current.params.userId==e.app.resources.uuid&&(e.app.resources=r,a("app").save("resources",t))}).then(function(r){r.error?(e.notifier.error("Error with getting profile data."),console.warn("error ->",r)):(e.notifier.success(e.ui.profile.dataChanged),n.data=r,e.statusBar.off(),n.setViewTo("profile"),t.birthday=c("nicelyDate")(t.birthDate),n.currentRole!=t.role&&e.app.resources.uuid==o.current.params.userId&&e.nav("logout"),angular.forEach(t.teamUuids,function(t){f.query(!1,{uuid:t}).then(function(){e.statusBar.off()})}))}))})},n.editProfile=function(){d("edit")},n.editImg=function(){n.uploadURL=n.imgHost+n.ns+"/team/member/"+o.current.params.userId+"/photo",n.setViewTo("editImg")},n.deleteProfile=function(){window.confirm(e.ui.teamup.deleteConfirm)&&(e.statusBar.display(e.ui.teamup.deletingMember),h._("memberDelete",{third:n.profilemeta.uuid}).then(function(t){t.uuid&&(e.notifier.success(e.ui.teamup.dataChanged),angular.forEach(n.profilemeta.teamUuids,function(t,n){e.statusBar.display(e.ui.teamup.refreshing),f.query(!1,{uuid:t}).then(function(){e.statusBar.off()})}),h._("teamMemberFree").then(function(t){a("app").save("members",t),e.statusBar.off()},function(e){console.log(e)}))},function(e){console.log(e)}))}}])});