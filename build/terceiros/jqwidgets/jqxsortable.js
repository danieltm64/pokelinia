/*
jQWidgets v5.1.0 (2017-Aug)
Copyright (c) 2011-2017 jQWidgets.
License: http://jqwidgets.com/license/
*/
!function(t){t.extend(t.expr[":"],{data:t.expr.createPseudo?t.expr.createPseudo(function(e){return function(s){return!!t.data(s,e)}}):function(e,s,i){return!!t.data(e,i[3])}}),t.jqx.jqxWidget("jqxSortable","",{}),t.extend(t.jqx._jqxSortable.prototype,{defineInstance:function(){var e={appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,maxItems:9999,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholderShow:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:999999,element:null,defaultElement:"<div>",mouseHandled:!1,cancel:"input,textarea,button,select,option",distance:1,delay:0,widgetName:"widget",widgetEventPrefix:"",disabled:!1,create:null,_touchEvents:{mousedown:t.jqx.mobile.getTouchEventName("touchstart"),click:t.jqx.mobile.getTouchEventName("touchstart"),mouseup:t.jqx.mobile.getTouchEventName("touchend"),mousemove:t.jqx.mobile.getTouchEventName("touchmove"),mouseenter:"mouseenter",mouseleave:"mouseleave"},_events:["activate","beforeStop","change","deactivate","out","over","receive","remove","sort","start","stop","update","create"]};return this===t.jqx._jqxSortable.prototype?e:(t.extend(!0,this,e),e)},createInstance:function(){this._render()},_render:function(){var e=this;this._isTouchDevice=t.jqx.mobile.isTouchDevice(),this.containerCache={};var s=t(s||e.defaultElement||this)[0];e.document=t(s.style?s.ownerDocument:s.document||s),e.window=t(e.document[0].defaultView||e.document[0].parentWindow),e.host.addClass(e.toThemeProperty("jqx-widget jqx-sortable")),e.refresh(),e.floating=!!e.itemsArray.length&&("x"===e.axis||e._isFloating(e.itemsArray[0].item)),e.offset=e.host.offset(),e._handleMouse(),e._cancelSelect(),e.ready=!0},_isOverAxis:function(t,e,s){return t>=e&&t<e+s},_isFloating:function(t){return/left|right/.test(t.css("float"))||/inline|table-cell/.test(t.css("display"))},_getEvent:function(t){return this._isTouchDevice?this._touchEvents[t]+".jqxSortable"+this.element.id:t+".jqxSortable"+this.element.id},_handleMouse:function(){var e=this;e.addHandler(this.host,this._getEvent("mousedown"),function(t){return e._mouseDown(t)}),e.addHandler(e.host,this._getEvent("click"),function(s){if(!0===t.data(s.target,e.widgetName+".preventClickEvent"))return t.removeData(s.target,e.widgetName+".preventClickEvent"),s.stopImmediatePropagation(),!1}),e.started=!1},widget:function(){return this.host},_mouseDestroy:function(){var e=this;e.host.off("."+this.widgetName),e._mouseMoveDelegate&&(e.removeHandler(t(document),this._getEvent("mousemove")),e.removeHandler(t(document),this._getEvent("mouseup")))},_mouseDown:function(e){var s=this;if(!s.mouseHandled){if(s._mouseMoved=!1,s._isTouchDevice){var i=t.jqx.position(e);e.pageX=i.left,e.pageY=i.top}s._mouseStarted&&s._mouseUp(e),s._mouseDownEvent=e,this._isTouchDevice&&(e.which=1);var r=1===e.which,o=!("string"!=typeof this.cancel||!e.target.nodeName)&&t(e.target).closest(this.cancel).length;if(this._isTouchDevice&&(r=!0),!r||o||!this._mouseCapture(e))return!0;if(s.mouseDelayMet=!s.delay,s.mouseDelayMet||(s._mouseDelayTimer=setTimeout(function(){s.mouseDelayMet=!0},s.delay)),s._mouseDistanceMet(e)&&s._mouseDelayMet(e)&&(s._mouseStarted=!1!==s._mouseStart(e),!s._mouseStarted))return e.preventDefault(),!0;!0===t.data(e.target,this.widgetName+".preventClickEvent")&&t.removeData(e.target,this.widgetName+".preventClickEvent"),s._mouseMoveDelegate=function(t){return s._mouseMove(t)},s._mouseUpDelegate=function(t){return s._mouseUp(t)},s.addHandler(t(document),this._getEvent("mousemove"),s._mouseMoveDelegate),s.addHandler(t(document),this._getEvent("mouseup"),s._mouseUpDelegate);try{if((""!=document.referrer||window.frameElement)&&null!=window.top&&window.top!=window.self){var n=function(t){s._mouseUp(t)},h=null;window.parent&&document.referrer&&(h=document.referrer),h&&-1!=h.indexOf(document.location.host)&&window.top.document&&(window.top.document.addEventListener?window.top.document.addEventListener("mouseup",n,!1):window.top.document.attachEvent&&window.top.document.attachEvent("onmouseup",n))}}catch(t){}return e.preventDefault(),mouseHandled=!0,!0}},_mouseMove:function(e){var s=this;if(this._isTouchDevice){e.which=1;var i=t.jqx.position(e);e.pageX=i.left,e.pageY=i.top}if(s._mouseMoved)if(t.jqx.browser.msie&&t.jqx.browser.version>11){if(!e.which)return s._mouseUp(e)}else{if(t.jqx.browser.msie&&(!document.documentMode||document.documentMode<9)&&!e.button)return s._mouseUp(e);if(!e.which)return s._mouseUp(e)}return(e.which||e.button)&&(s._mouseMoved=!0),s._mouseStarted?(s._mouseDrag(e),e.preventDefault()):(s._mouseDistanceMet(e)&&s._mouseDelayMet(e)&&(s._mouseStarted=!1!==s._mouseStart(s._mouseDownEvent,e),s._mouseStarted?s._mouseDrag(e):s._mouseUp(e)),!s._mouseStarted)},_mouseUp:function(e){var s=this;try{s.removeHandler(t(document),this._getEvent("mousemove")),s.removeHandler(t(document),this._getEvent("mouseup")),s._mouseStarted&&(s._mouseStarted=!1,e.target===s._mouseDownEvent.target&&t.data(e.target,s.widgetName+".preventClickEvent",!0),s._mouseStop(e)),mouseHandled=!1}catch(t){}return!1},_mouseDistanceMet:function(t){return Math.max(Math.abs(this._mouseDownEvent.pageX-t.pageX),Math.abs(this._mouseDownEvent.pageY-t.pageY))>=this.distance},_mouseDelayMet:function(){return this.mouseDelayMet},scrollParent:function(e){var s=this.css("position"),i="absolute"===s,r=e?/(auto|scroll|hidden)/:/(auto|scroll)/,o=this.parents().filter(function(){var e=t(this);return(!i||"static"!==e.css("position"))&&r.test(e.css("overflow")+e.css("overflow-y")+e.css("overflow-x"))}).eq(0);return"fixed"!==s&&o.length?o:t(this[0].ownerDocument||document)},destroy:function(){this.host.removeClass("jqx-sortable jqx-sortable-disabled").find(".jqx-sortable-handle").removeClass("jqx-sortable-handle"),this._mouseDestroy();for(var t=this.itemsArray.length-1;t>=0;t--)this.itemsArray[t].item.removeData(this.widgetName+"-item");return this},_mouseCapture:function(e,s){var i=null,r=!1,o=this;return!o.reverting&&(!o.disabled&&"static"!==o.type&&(o._refreshItems(e),t(e.target).parents().each(function(){if(t.data(this,o.widgetName+"-item")===o)return i=t(this),!1}),t.data(e.target,o.widgetName+"-item")===o&&(i=t(e.target)),!!i&&(!(o.handle&&!s&&(t(o.handle,i).find("*").addBack().each(function(){this===e.target&&(r=!0)}),!r))&&(o.currentItem=i,o._removeCurrentsFromItems(),!0))))},_mouseStart:function(e,s,i){var r,o,n=this;if(n.currentContainer=this,n._currentContainer=this,n.refreshPositions(),n.helper=n._utility(e),n._cacheHelperProportions(),n._storeMargins(),n.scrollParent=n.helper.scrollParent(),n.offset=n.currentItem.offset(),n.offset={top:n.offset.top-n.margins.top,left:n.offset.left-n.margins.left},t.extend(n.offset,{click:{left:e.pageX-n.offset.left,top:e.pageY-n.offset.top},parent:n._getParentOffset(),relative:n._getRelativeOffset()}),n.helper.css("position","absolute"),n.cssPosition=n.helper.css("position"),n.originalPosition=n._generatePosition(e),n.originalPageX=e.pageX,n.originalPageY=e.pageY,n.cursorAt&&n._adjustOffsetFromHelper(n.cursorAt),n.domPosition={prev:n.currentItem.prev()[0],parent:n.currentItem.parent()[0]},n.helper[0]!==n.currentItem[0]&&n.currentItem.hide(),n._createPlaceholder(),n.containment&&n._setContainment(),n.cursor&&"auto"!==n.cursor&&(o=n.document.find("body"),n.storedCursor=o.css("cursor"),o.css("cursor",n.cursor),n.storedStylesheet=t("<style>*{ cursor: "+n.cursor+" !important; }</style>").appendTo(o)),n.opacity&&(n.helper.css("opacity")&&(n._storedOpacity=n.helper.css("opacity")),n.helper.css("opacity",n.opacity)),n.zIndex&&(n.helper.css("zIndex")&&(n._storedZIndex=n.helper.css("zIndex")),n.helper.css("zIndex",n.zIndex)),n.scrollParent[0]!==n.document[0]&&"HTML"!==n.scrollParent[0].tagName&&(n.overflowOffset=n.scrollParent.offset()),n._raiseEvent("9",n._uiHash()),n._preserveHelperProportions||n._cacheHelperProportions(),!i)for(r=n.owners.length-1;r>=0;r--)n.owners[r]._raiseEvent("0",n._uiHash(this));return t.jqx.ddmanager&&(t.jqx.ddmanager.current=this),t.jqx.ddmanager&&!n.dropBehaviour&&t.jqx.ddmanager.prepareOffsets(this,e),n.dragging=!0,n.helper.addClass("jqx-sortable-helper"),n._mouseDrag(e),!0},_mouseDrag:function(e){var s,i,r,o,n=this,h=!1,a=this;for(a.position=a._generatePosition(e),a.positionAbs=a._convertPositionTo("absolute"),a.lastPositionAbs||(a.lastPositionAbs=a.positionAbs),a.scroll&&(a.scrollParent[0]!==a.document[0]&&"HTML"!==a.scrollParent[0].tagName?(a.overflowOffset.top+a.scrollParent[0].offsetHeight-e.pageY<n.scrollSensitivity?a.scrollParent[0].scrollTop=h=a.scrollParent[0].scrollTop+n.scrollSpeed:e.pageY-a.overflowOffset.top<n.scrollSensitivity&&(a.scrollParent[0].scrollTop=h=a.scrollParent[0].scrollTop-n.scrollSpeed),a.overflowOffset.left+a.scrollParent[0].offsetWidth-e.pageX<n.scrollSensitivity?a.scrollParent[0].scrollLeft=h=a.scrollParent[0].scrollLeft+n.scrollSpeed:e.pageX-a.overflowOffset.left<n.scrollSensitivity&&(a.scrollParent[0].scrollLeft=h=a.scrollParent[0].scrollLeft-n.scrollSpeed)):(e.pageY-a.document.scrollTop()<n.scrollSensitivity?h=a.document.scrollTop(a.document.scrollTop()-n.scrollSpeed):a.window.height()-(e.pageY-a.document.scrollTop())<n.scrollSensitivity&&(h=a.document.scrollTop(a.document.scrollTop()+n.scrollSpeed)),e.pageX-a.document.scrollLeft()<n.scrollSensitivity?h=a.document.scrollLeft(a.document.scrollLeft()-n.scrollSpeed):a.window.width()-(e.pageX-a.document.scrollLeft())<n.scrollSensitivity&&(h=a.document.scrollLeft(a.document.scrollLeft()+n.scrollSpeed))),!1!==h&&t.jqx.ddmanager&&!n.dropBehaviour&&t.jqx.ddmanager.prepareOffsets(this,e)),a.positionAbs=a._convertPositionTo("absolute"),a.axis&&"y"===a.axis||(a.helper[0].style.left=a.position.left+"px"),a.axis&&"x"===a.axis||(a.helper[0].style.top=a.position.top+"px"),s=a.itemsArray.length-1;s>=0;s--)if(i=a.itemsArray[s],r=i.item[0],(o=a._intersectsWithPointer(i))&&i.instance===a.currentContainer&&!(r===a.currentItem[0]||a.placeholder[1===o?"next":"prev"]()[0]===r||t.contains(a.placeholder[0],r)||"semi-dynamic"===a.type&&t.contains(a.host[0],r))){if(a.direction=1===o?"down":"up","pointer"!==a.tolerance&&!a._intersectsWithSides(i))break;a._rearrange(e,i),a._raiseEvent("2",a._uiHash());break}return a._contactOwners(e),t.jqx.ddmanager&&t.jqx.ddmanager.drag(this,e),a._raiseEvent("8",a._uiHash()),a.lastPositionAbs=a.positionAbs,!1},_mouseStop:function(e,s){var i=this;if(e){if(t.jqx.ddmanager&&!this.dropBehaviour&&t.jqx.ddmanager.drop(this,e),i.revert){var r=(i=this).placeholder.offset(),o=i.axis,n={};o&&"x"!==o||(n.left=r.left-i.offset.parent.left-i.margins.left+(i.offsetParent[0]===i.document[0].body?0:i.offsetParent[0].scrollLeft)),o&&"y"!==o||(n.top=r.top-i.offset.parent.top-i.margins.top+(i.offsetParent[0]===i.document[0].body?0:i.offsetParent[0].scrollTop)),i.reverting=!0,t(this.helper).animate(n,parseInt(this.revert,10)||500,function(){i._clear(e)})}else i._clear(e,s);return!1}},cancelSort:function(){var e=this;if(e.dragging){e._mouseUp({target:null}),"original"===e.helper?e.currentItem.css(e._storedCSS).removeClass("jqx-sortable-helper"):e.currentItem.show();for(var s=e.owners.length-1;s>=0;s--)e.owners[s]._raiseEvent("3",e._uiHash(this)),e.owners[s].containerCache.over&&(e.owners[s]._raiseEvent("4",e._uiHash(this)),e.owners[s].containerCache.over=0)}return e.placeholder&&(e.placeholder[0].parentNode&&e.placeholder[0].parentNode.removeChild(e.placeholder[0]),"original"!==e.helper&&e.helper&&e.helper[0].parentNode&&e.helper.remove(),t.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),e.domPosition.prev?t(e.domPosition.prev).after(e.currentItem):t(e.domPosition.parent).prepend(e.currentItem)),this},serialize:function(e){var s=this._getItemsAsjQuery(e&&e.connected),i=[];return e=e||{},t(s).each(function(){var s=(t(e.item||this).attr(e.attribute||"id")||"").match(e.expression||/(.+)[\-=_](.+)/);s&&i.push((e.key||s[1]+"[]")+"="+(e.key&&e.expression?s[1]:s[2]))}),!i.length&&e.key&&i.push(e.key+"="),i.join("&")},toArray:function(e){var s=this._getItemsAsjQuery(e&&e.connected),i=[];return e=e||{},s.each(function(){i.push(t(e.item||this).attr(e.attribute||"id")||"")}),i},_intersectsWith:function(t){var e=this.positionAbs.left,s=e+this.helperProportions.width,i=this.positionAbs.top,r=i+this.helperProportions.height,o=t.left,n=o+t.width,h=t.top,a=h+t.height,c=this.offset.click.top,l=this.offset.click.left,u="x"===this.axis||i+c>h&&i+c<a,f="y"===this.axis||e+l>o&&e+l<n,d=u&&f;return"pointer"===this.tolerance||this.forcePointerForowners||"pointer"!==this.tolerance&&this.helperProportions[this.floating?"width":"height"]>t[this.floating?"width":"height"]?d:o<e+this.helperProportions.width/2&&s-this.helperProportions.width/2<n&&h<i+this.helperProportions.height/2&&r-this.helperProportions.height/2<a},_intersectsWithPointer:function(t){var e="x"===this.axis||this._isOverAxis(this.positionAbs.top+this.offset.click.top,t.top,t.height),s="y"===this.axis||this._isOverAxis(this.positionAbs.left+this.offset.click.left,t.left,t.width),i=e&&s,r=this._getDragVerticalDirection(),o=this._getDragHorizontalDirection();return!!i&&(this.floating?o&&"right"===o||"down"===r?2:1:r&&("down"===r?2:1))},_intersectsWithSides:function(t){var e=this._isOverAxis(this.positionAbs.top+this.offset.click.top,t.top+t.height/2,t.height),s=this._isOverAxis(this.positionAbs.left+this.offset.click.left,t.left+t.width/2,t.width),i=this._getDragVerticalDirection(),r=this._getDragHorizontalDirection();return this.floating&&r?"right"===r&&s||"left"===r&&!s:i&&("down"===i&&e||"up"===i&&!e)},_getDragVerticalDirection:function(){var t=this.positionAbs.top-this.lastPositionAbs.top;return 0!==t&&(t>0?"down":"up")},_getDragHorizontalDirection:function(){var t=this.positionAbs.left-this.lastPositionAbs.left;return 0!==t&&(t>0?"right":"left")},refresh:function(t){return this._refreshItems(t),this.refreshPositions(),this},_connectWith:function(){var t=this;return t.connectWith.constructor===String?[t.connectWith]:t.connectWith},_getItemsAsjQuery:function(e){var s,i,r,o,n=[],h=[],a=this._connectWith();if(a&&e)for(s=a.length-1;s>=0;s--)for(i=(r=t(a[s],this.document[0])).length-1;i>=0;i--)(o=t.data(r[i],this.widgetFullName).instance)&&o!==this&&!o.disabled&&h.push([t.isFunction(o.items)?o.items.call(o.host):t(o.items,o.host).not(".jqx-sortable-helper").not(".jqx-sortable-placeholder"),o]);for(h.push([t.isFunction(this.items)?this.items.call(this.host,null,{options:this,item:this.currentItem}):t(this.items,this.host).not(".jqx-sortable-helper").not(".jqx-sortable-placeholder"),this]),s=h.length-1;s>=0;s--)h[s][0].each(function(){n.push(this)});return t(n)},_removeCurrentsFromItems:function(){var e=this.currentItem.find(":data("+this.widgetName+"-item)");this.itemsArray=t.grep(this.itemsArray,function(t){for(var s=0;s<e.length;s++)if(e[s]===t.item[0])return!1;return!0})},_refreshItems:function(e){this.itemsArray=[],this.owners=[this];var s,i,r,o,n,h,a,c,l=this.itemsArray,u=[[t.isFunction(this.items)?this.items.call(this.host[0],e,{item:this.currentItem}):t(this.items,this.host),this]],f=this._connectWith();if(f&&this.ready)for(s=f.length-1;s>=0;s--)for(i=(r=t(f[s],this.document[0])).length-1;i>=0;i--)(o=t.data(r[i],this.widgetName))&&o!==this&&!o.instance.disabled&&(u.push([t.isFunction(o.instance.items)?o.items.call(o.instance.host[0],e,{item:this.currentItem}):t(o.instance.items,o.instance.host),o.instance]),this.owners.push(o.instance));for(s=u.length-1;s>=0;s--)for(n=u[s][1],i=0,c=(h=u[s][0]).length;i<c;i++)(a=t(h[i])).data(this.widgetName+"-item",n),l.push({item:a,instance:n,width:0,height:0,left:0,top:0})},refreshPositions:function(e){this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());var s,i,r,o;for(s=this.itemsArray.length-1;s>=0;s--)(i=this.itemsArray[s]).instance!==this.currentContainer&&this.currentContainer&&i.item[0]!==this.currentItem[0]||(r=this.toleranceElement?t(this.toleranceElement,i.item):i.item,e||(i.width=r.outerWidth(),i.height=r.outerHeight()),o=r.offset(),i.left=o.left,i.top=o.top);if(this.custom&&this.custom.refreshowners)this.custom.refreshowners.call(this);else for(s=this.owners.length-1;s>=0;s--)o=this.owners[s].host.offset(),this.owners[s].containerCache.left=o.left,this.owners[s].containerCache.top=o.top,this.owners[s].containerCache.width=this.owners[s].host.outerWidth(),this.owners[s].containerCache.height=this.owners[s].host.outerHeight();return this},_cancelSelect:function(){that=this,that.host.addClass("jqx-disableselect")},_createPlaceholder:function(e){var s,i=e=e||this;i.placeholderShow&&i.placeholderShow.constructor!==String||(s=i.placeholderShow,i.placeholderShow={element:function(){var i=e.currentItem[0].nodeName.toLowerCase(),r=t("<"+i+">",e.document[0]).addClass(s||e.currentItem[0].className+" jqx-sortable-placeholder").removeClass("jqx-sortable-helper");return"tr"===i?e.currentItem.children().each(function(){t("<td>&#160;</td>",e.document[0]).attr("colspan",t(this).attr("colspan")||1).appendTo(r)}):"img"===i&&r.attr("src",e.currentItem.attr("src")),s||r.css("visibility","hidden"),r},update:function(t,r){s&&!i.forcePlaceholderSize||(r.height()||r.height(e.currentItem.innerHeight()-parseInt(e.currentItem.css("paddingTop")||0,10)-parseInt(e.currentItem.css("paddingBottom")||0,10)),r.width()||r.width(e.currentItem.innerWidth()-parseInt(e.currentItem.css("paddingLeft")||0,10)-parseInt(e.currentItem.css("paddingRight")||0,10)))}}),e.placeholder=t(i.placeholderShow.element.call(e.host,e.currentItem)),e.currentItem.after(e.placeholder),e.placeholderShow.update(e,e.placeholder)},_contactOwners:function(e){var s,i,r,o,n,h,a,c,l,u,f=null,d=null;for(s=this.owners.length-1;s>=0;s--)if(!t.contains(this.currentItem[0],this.owners[s].host[0]))if(this._intersectsWith(this.owners[s].containerCache)){if(f&&t.contains(this.owners[s].host[0],f.host[0]))continue;f=this.owners[s],d=s}else this.owners[s].containerCache.over&&(this.owners[s]._raiseEvent("4",this._uiHash(this)),this.owners[s].containerCache.over=0);if(f)if(1===this.owners.length)this.owners[d].containerCache.over||(this.owners[d]._raiseEvent("5",this._uiHash(this)),this.owners[d].containerCache.over=1);else{r=1e4,o=null,n=(l=f.floating||this._isFloating(this.currentItem))?"left":"top",h=l?"width":"height",u=l?"clientX":"clientY";var p=this.itemsArray;for(i=p.length-1;i>=0;i--)t.contains(this.owners[d].host[0],p[i].item[0])&&p[i].item[0]!==this.currentItem[0]&&(a=p[i].item.offset()[n],c=!1,e[u]-a>p[i][h]/2&&(c=!0),Math.abs(e[u]-a)<r&&(r=Math.abs(e[u]-a),o=p[i],this.direction=c?"up":"down"));if(!o&&!this.dropOnEmpty)return;if(this.currentContainer===this.owners[d])return void(this.currentContainer.containerCache.over||(this.owners[d]._raiseEvent("5",this._uiHash()),this.currentContainer.containerCache.over=1));if(this.owners[d].host.children().length+1>this.owners[d].maxItems)return this.currentContainer=this._currentContainer,o=this._rearrange(e,null,this.currentContainer.host,!0),this._currentContainer.containerCache.over=1,void this.placeholderShow.update(this.currentContainer,this.placeholder);o?this._rearrange(e,o,null,!0):this._rearrange(e,null,this.owners[d].host,!0),this._raiseEvent("2",this._uiHash()),this.owners[d]._raiseEvent("2",this._uiHash(this)),this.currentContainer=this.owners[d],this.placeholderShow.update(this.currentContainer,this.placeholder),this.owners[d]._raiseEvent("5",this._uiHash(this)),this.owners[d].containerCache.over=1}},_utility:function(e){var s=this,i=t.isFunction(s.helper)?t(s.helper.apply(this.host[0],[e,this.currentItem])):"clone"===s.helper?this.currentItem.clone():this.currentItem;return i.parents("body").length||t("parent"!==s.appendTo?s.appendTo:this.currentItem[0].parentNode)[0].appendChild(i[0]),i[0]===this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),i[0].style.width&&!s.forceHelperSize||i.width(this.currentItem.width()),i[0].style.height&&!s.forceHelperSize||i.height(this.currentItem.height()),i.scrollParent=function(e){var s=this.css("position"),i="absolute"===s,r=e?/(auto|scroll|hidden)/:/(auto|scroll)/,o=this.parents().filter(function(){var e=t(this);return(!i||"static"!==e.css("position"))&&r.test(e.css("overflow")+e.css("overflow-y")+e.css("overflow-x"))}).eq(0);return"fixed"!==s&&o.length?o:t(this[0].ownerDocument||document)},i},_adjustOffsetFromHelper:function(e){"string"==typeof e&&(e=e.split(" ")),t.isArray(e)&&(e={left:+e[0],top:+e[1]||0}),"left"in e&&(this.offset.click.left=e.left+this.margins.left),"right"in e&&(this.offset.click.left=this.helperProportions.width-e.right+this.margins.left),"top"in e&&(this.offset.click.top=e.top+this.margins.top),"bottom"in e&&(this.offset.click.top=this.helperProportions.height-e.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var e=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==this.document[0]&&t.contains(this.scrollParent[0],this.offsetParent[0])&&(e.left+=this.scrollParent.scrollLeft(),e.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===this.document[0].body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&t.jqx.browser.msie)&&(e={top:0,left:0}),{top:e.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:e.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var t=this.currentItem.position();return{top:t.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:t.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_storeMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t=this;"parent"===t.containment&&(t.containment=this.helper[0].parentNode),"document"!==t.containment&&"window"!==t.containment||(this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,"document"===t.containment?this.document.width():this.window.width()-this.helperProportions.width-this.margins.left,("document"===t.containment?this.document.width():this.window.height()||this.document[0].body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top])},_convertPositionTo:function(e,s){s||(s=this.position);var i="absolute"===e?1:-1,r="absolute"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&t.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,o=/(html|body)/i.test(r[0].tagName);return{top:s.top+this.offset.relative.top*i+this.offset.parent.top*i-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():o?0:r.scrollTop())*i,left:s.left+this.offset.relative.left*i+this.offset.parent.left*i-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():o?0:r.scrollLeft())*i}},_generatePosition:function(e){var s,i,r=this,o=e.pageX,n=e.pageY,h="absolute"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&t.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,a=/(html|body)/i.test(h[0].tagName);return"relative"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&this.scrollParent[0]!==this.offsetParent[0]||(this.offset.relative=this._getRelativeOffset()),this.originalPosition&&(this.containment&&(e.pageX-this.offset.click.left<this.containment[0]&&(o=this.containment[0]+this.offset.click.left),e.pageY-this.offset.click.top<this.containment[1]&&(n=this.containment[1]+this.offset.click.top),e.pageX-this.offset.click.left>this.containment[2]&&(o=this.containment[2]+this.offset.click.left),e.pageY-this.offset.click.top>this.containment[3]&&(n=this.containment[3]+this.offset.click.top)),r.grid&&(s=this.originalPageY+Math.round((n-this.originalPageY)/r.grid[1])*r.grid[1],n=this.containment?s-this.offset.click.top>=this.containment[1]&&s-this.offset.click.top<=this.containment[3]?s:s-this.offset.click.top>=this.containment[1]?s-r.grid[1]:s+r.grid[1]:s,i=this.originalPageX+Math.round((o-this.originalPageX)/r.grid[0])*r.grid[0],o=this.containment?i-this.offset.click.left>=this.containment[0]&&i-this.offset.click.left<=this.containment[2]?i:i-this.offset.click.left>=this.containment[0]?i-r.grid[0]:i+r.grid[0]:i)),{top:n-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():a?0:h.scrollTop()),left:o-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():a?0:h.scrollLeft())}},_rearrange:function(t,e,s,i){s?s[0].appendChild(this.placeholder[0]):e.item[0].parentNode.insertBefore(this.placeholder[0],"down"===this.direction?e.item[0]:e.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var r=this.counter;this._delay(function(){r===this.counter&&this.refreshPositions(!i)})},_delay:function(t,e){var s=this;return setTimeout(function(){return("string"==typeof t?s[t]:t).apply(s,arguments)},e||0)},_clear:function(t,e){function s(t,e,s){return function(i){var r=this._events.indexOf(t);s._raiseEvent(r,e._uiHash(e))}}this.reverting=!1;var i,r=[];if(!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null,this.helper[0]===this.currentItem[0]){for(i in this._storedCSS)"auto"!==this._storedCSS[i]&&"static"!==this._storedCSS[i]||(this._storedCSS[i]="");this.currentItem.css(this._storedCSS).removeClass("jqx-sortable-helper")}else this.currentItem.show();for(this.fromOutside&&!e&&r.push(function(t){this._raiseEvent("6",this._uiHash(this.fromOutside))}),!this.fromOutside&&this.domPosition.prev===this.currentItem.prev().not(".jqx-sortable-helper")[0]&&this.domPosition.parent===this.currentItem.parent()[0]||e||r.push(function(t){this._raiseEvent("11",this._uiHash())}),this!==this.currentContainer&&(e||(r.push(function(t){this._raiseEvent("7",this._uiHash())}),r.push(function(t){return function(e){t._raiseEvent("6",this._uiHash(this))}}.call(this,this.currentContainer)),r.push(function(t){return function(e){t._raiseEvent("11",this._uiHash(this))}}.call(this,this.currentContainer)))),i=this.owners.length-1;i>=0;i--)e||r.push(s("deactivate",this,this.owners[i])),this.owners[i].containerCache.over&&(r.push(s("out",this,this.owners[i])),this.owners[i].containerCache.over=0);return this.storedCursor&&(this.document.find("body").css("cursor",this.storedCursor),this.storedStylesheet.remove()),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex","auto"===this._storedZIndex?"":this._storedZIndex),this.dragging=!1,e||this._raiseEvent("1",this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.cancelHelperRemoval||(this.helper[0]!==this.currentItem[0]&&this.helper.remove(),this.helper=null),e||this._raiseEvent("10",this._uiHash()),this.fromOutside=!1,!this.cancelHelperRemoval},disable:function(){that=this,that.disabled=!0},enable:function(){that=this,that.disabled=!1},instance:function(){return that=this,that},_uiHash:function(e){var s=e||this;return{helper:s.helper,placeholder:s.placeholder||t([]),position:s.position,originalPosition:s.originalPosition,offset:s.positionAbs,item:s.currentItem,sender:e?e.host:null}},_raiseEvent:function(e,s){that=this;var i=t.Event(that._events[e]);return i.args=s,that.host.trigger(i)},propertyChangedHandler:function(t,e,s,i){if(that=this,i!==s)switch(e){case"disabled":that.disabled=i}}})}(jqxBaseFramework);

