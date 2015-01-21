define(["directives/directives"],function(e){e.directive("chosen",function(){var e=function(e,t){e.$watch("receviersList",function(){t.trigger("liszt:updated")}),e.$watch("message.receviers",function(){angular.element(t[0]).trigger("liszt:updated")}),t.chosen()};return{restrict:"A",link:e}}),e.directive("uploader",[function(){return{restrict:"E",scope:{action:"@"},controller:["$scope","$rootScope","Session",function(e,t,n){e.progress="0%",e.avatar="",e.uploadLabel=t.ui.profile.click2upload;var r=n.get();r&&(e.sessionId=r),e.sendFile=function(n){var r=angular.element(n).parents("form");if(angular.element(n).val()=="")return!1;r.attr("action",e.action),e.$apply(function(){e.progress="0%"}),r.ajaxSubmit({type:"POST",headers:{"X-SESSION_ID":e.sessionId},uploadProgress:function(t,n,r,i){e.$apply(function(){e.progress=i+"%"})},error:function(e,t,n,i){r.removeAttr("action")},success:function(i,s,o,u){var a=angular.element(n).val().split("\\"),f=a[a.length-1];r.removeAttr("action"),e.$apply(function(){e.avatar=f;var n="",r=$(".roundedPicLarge").attr("style"),i=0,s,o,u;try{i=parseInt(r.split("?")[1].split("&")[0].split("=")[1],10)}catch(a){console.log(a)}e.$parent.data.clientId?(s=e.$parent.data.clientId,u=t.ui.profile.profileImgSuccessfullyUploaded,o="client"):e.$parent.data.uuid&&(s=e.$parent.data.uuid,u=t.ui.profile.profileImgSuccessfullyUploaded,o="team"),e.$parent.$root.avatarChange(s),t.notifier.success(u),t.showChangedAvatar(o,s);var l=parseInt(i,10)+e.$parent.$root.getAvatarChangeTimes(s),c=r.replace("width="+i,"width="+l);$(".roundedPicLarge").attr("style",c)})}})}}],link:function(e,t,n,r){t.find(".fake-uploader").click(function(){t.find('input[type="file"]').click()})},replace:!1,templateUrl:"views/uploader.html"}}]),e.directive("profile",[function(){return{restrict:"E",scope:{memberId:"@"},controller:["$scope",function(e){e.loadMember=function(e){}}],link:function(e,t,n,r){console.log("profile directive ->",n.memberId)},replace:!1,templateUrl:"views/profileTemplate.html"}}]),e.directive("ngenter",function(){return function(e,t,n){t.bind("keydown keypress",function(t){t.which===13&&(e.$apply(function(){e.$eval(n.ngenter)}),t.preventDefault())})}}),e.directive("backImg",function(){return function(e,t,n){var r=n.backImg;t.css({"background-image":"url("+r+")","background-size":"cover"})}}),e.directive("linkIconHovered",function(){return{link:function(e,t,n){t.parent().bind("mouseenter",function(){t.removeClass("icon-link"),t.addClass("icon-link2")}),t.parent().bind("mouseleave",function(){t.removeClass("icon-link2"),t.addClass("icon-link")})}}}),e.directive("dragEnterLeave",function(){return{link:function(e,t,n){var r=n.dragEnterLeave,i=t.text();t.bind("dragenter",function(){t.addClass(r).text("Drop de spreadsheet.")}),t.bind("dragleave",function(){t.removeClass(r).text(i)})}}}),e.directive("setPositionSlotForm",["$window",function(e){return{restrict:"A",link:function(t,n,r){n.bind("mouseup",function(t){var n=angular.element("#footer").height(),r=angular.element(".time-slot-form"),i=r.height(),s=105,o=e.innerHeight,u=i+s,a=t.clientY+e.pageYOffset,f=e.outerHeight-a+u,l=u>t.clientY?a:a-u;r.css("top",l+"px")})}}}]),e.directive("dynamic",["$compile",function(e){return{restrict:"A",replace:!0,link:function(t,n,r){console.log("element",n),t.$watch(r.dynamic,function(r){n.html(r),e(n.contents())(t)})}}}]),e.directive("inputRuleToggle",function(){return{restrict:"A",link:function(e,t,n){var r=n.inputRuleToggle,i=t.parents(".form-group");t.bind("click",function(){t.hasClass("add-button")?i.next().removeClass("ng-hide"):(i.addClass("ng-hide").find("input").val(""),i.find(".text-danger small i").text(""),e.profile.phoneNumbers[r]&&(e.profile.phoneNumbers.splice(r,1),e.parsedPhoneNumbers[r]={}))})}}})});