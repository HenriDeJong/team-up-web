define(["filters/filters","config"],function(e,t){e.filter("convertToDateObj",[function(){return function(e){return Date(e)}}]).filter("translateDivision",[function(){return function(e){var t;return angular.forEach($rootScope.config.app.timeline.config.divisions,function(n){n.id==e&&(t=n.label)}),t}}]).filter("calculateDeltaTime",["$rootScope",function(e){return function(t){var n=Math.abs(t-Date.now().getTime())/1e3,r=Math.floor(n/86400);n-=r*86400;var i=Math.floor(n/3600)%24;n-=i*3600;var s=Math.floor(n/60)%60,o="";return r!=0&&(o+=r),i!=0&&(r!=0&&(o+=e.ui.dashboard.time.days+" : "),o+=i),s!=0&&(i!=0&&(o+=e.ui.dashboard.time.hours+" : "),o+=s+e.ui.dashboard.time.minutes),i==0&&s==0&&(o+=" "+e.ui.dashboard.time.days),o}}]).filter("nicelyDate",["$rootScope",function(e){return function(t){return typeof t=="string"&&(t=Number(t)),(new Date(t)).toString(e.config.app.formats.datetimefull)}}]).filter("groupIdToName",["Store",function(e){return function(t,n){var r=angular.fromJson(e("app").get("teams")),i="";for(var s in r)r[s].uuid==t&&(n&&(i+=", "),i+=r[s].name);return i}}]).filter("divisionIdToName",["$rootScope",function(e){return function(t){var n=e.config.app.timeline.config.divisions;for(var r in n)if(n[r].id==t)return n[r].label}}]).filter("toTitleCase",["Strings",function(e){return function(t){return e.toTitleCase(t)}}])});