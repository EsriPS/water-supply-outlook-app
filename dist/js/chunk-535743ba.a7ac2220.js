(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-535743ba"],{"0890":function(e,t,n){"use strict";function i(e){return e.map((function(e){for(var t="",n=0;n<e;n++)t+=(65536*(1+Math.random())|0).toString(16).substring(1);return t})).join("-")}n.d(t,"a",(function(){return r}));var r=function(){return i([2,1,1,1,3])}},"16df":function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return s})),n.d(t,"c",(function(){return a})),n.d(t,"d",(function(){return o})),n.d(t,"e",(function(){return c}));var i=n("6ba6");function r(e){return!Number.isInteger(Number(e))}function a(e){return!(!e||isNaN(Number(e)))}function o(e){if(!e||!u(e))return null;var t=!1,n=e.split("").filter((function(e,n){return e.match(/\./g)&&!t?(t=!0,!0):!(!e.match(/\-/g)||0!==n)||i["c"].includes(e)})).reduce((function(e,t){return e+t}));return a(n)?Number(n).toString():null}function s(e){return(null===e||void 0===e?void 0:e.endsWith("."))?e.replace(".",""):e}function c(e){return e?Number(s(e)).toString():e}function u(e){return i["c"].some((function(t){return e.includes(t)}))}},"6ba6":function(e,t,n){"use strict";function i(e,t){var n={Up:"ArrowUp",Down:"ArrowDown",Left:"ArrowLeft",Right:"ArrowRight",Spacebar:" ",Esc:"Escape"},i=n[e]||e,r="rtl"===t;return r&&"ArrowLeft"===i?"ArrowRight":r&&"ArrowRight"===i?"ArrowLeft":i}function r(e){return e=i(e),"Enter"===e||" "===e}n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return a}));var a=["0","1","2","3","4","5","6","7","8","9"]},"7a23":function(e,t,n){"use strict";n.r(t),n.d(t,"calcite_input_time_picker",(function(){return f})),n.d(t,"calcite_time_picker",(function(){return y}));var i=n("8a7b"),r=n("0890"),a=n("6ba6"),o=n("16df"),s=function(e,t,n,i){function r(e){return e instanceof n?e:new n((function(t){t(e)}))}return new(n||(n=Promise))((function(n,a){function o(e){try{c(i.next(e))}catch(e){a(e)}}function s(e){try{c(i["throw"](e))}catch(e){a(e)}}function c(e){e.done?n(e.value):r(e.value).then(o,s)}c((i=i.apply(e,t||[])).next())}))},c=function(e,t){var n,i,r,a,o={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},"function"===typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(e){return function(t){return c([e,t])}}function c(a){if(n)throw new TypeError("Generator is already executing.");while(o)try{if(n=1,i&&(r=2&a[0]?i["return"]:a[0]?i["throw"]||((r=i["return"])&&r.call(i),0):i.next)&&!(r=r.call(i,a[1])).done)return r;switch(i=0,r&&(a=[2&a[0],r.value]),a[0]){case 0:case 1:r=a;break;case 4:return o.label++,{value:a[1],done:!1};case 5:o.label++,i=a[1],a=[0];continue;case 7:a=o.ops.pop(),o.trys.pop();continue;default:if(r=o.trys,!(r=r.length>0&&r[r.length-1])&&(6===a[0]||2===a[0])){o=0;continue}if(3===a[0]&&(!r||a[1]>r[0]&&a[1]<r[3])){o.label=a[1];break}if(6===a[0]&&o.label<r[1]){o.label=r[1],r=a;break}if(r&&o.label<r[2]){o.label=r[2],o.ops.push(a);break}r[2]&&o.ops.pop(),o.trys.pop();continue}a=t.call(e,o)}catch(e){a=[6,e],i=0}finally{n=r=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}},u=5;function l(e){if(!Object(o["c"])(e))return null;var t=parseInt(e);return t>=0&&t<=11?"AM":"PM"}function h(e){if(!Object(o["c"])(e))return null;var t=parseInt(e);return 0===t?"12":t>12?d(t-12):e}function m(e){var t=p(e),n=t?t.split(":"):[null,null,null],i=n[0],r=n[1],a=n[2];return{hour:i,minute:r,second:a||(i&&r?"00":null)}}function p(e){if(!e||e.endsWith(":")||e.startsWith(":"))return null;var t=e.split(":");if(t.length>1){var n=t[0],i=t[1],r=t[2],a=parseInt(t[0]),s=parseInt(t[1]),c=parseInt(t[2]),u=Object(o["c"])(n)&&a>=0&&a<24,l=Object(o["c"])(i)&&s>=0&&s<60,h=Object(o["c"])(r)&&c>=0&&c<60;if(u&&l&&!r||u&&l&&h){var m=d(a)+":"+d(s);return h&&(m=m+":"+d(c)),m}}return null}function d(e){var t=e.toString();return e>=0&&e<=9?t.padStart(2,"0"):t}var b="@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:inline-block;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}",f=function(){function e(e){var t=this;Object(i["j"])(this,e),this.calciteInputTimePickerChange=Object(i["e"])(this,"calciteInputTimePickerChange",7),this.active=!1,this.disabled=!1,this.hourDisplayFormat="12",this.scale="m",this.step=60,this.value=null,this.internalValueChange=!1,this.previousValidValue=null,this.referenceElementId="input-time-picker-"+Object(r["a"])(),this.calciteInputBlurHandler=function(){t.active=!1;var e=p(t.calciteInputEl.value)||p(t.value);e!==t.calciteInputEl.value&&t.setInputValue(e)},this.calciteInputFocusHandler=function(){t.active=!0},this.calciteInputInputHandler=function(e){t.setValue({value:e.detail.value})},this.setCalciteInputEl=function(e){t.calciteInputEl=e},this.setCalciteTimePickerEl=function(e){t.calciteTimePickerEl=e},this.setInputValue=function(e){if(t.calciteInputEl)if("12"===t.hourDisplayFormat){var n=m(e),i=n.hour,r=n.minute,a=n.second;t.calciteInputEl.value=e?h(i)+":"+r+(60!==t.step?":"+a:"")+" "+l(i):null}else t.calciteInputEl.value=e},this.setValue=function(e){var n=e.value,i=e.origin,r=void 0===i?"input":i,a=t.value,o=p(n);t.internalValueChange="external"!==r&&"loading"!==r;var s="loading"!==r&&"external"!==r&&(n!==t.previousValidValue&&!n||!(t.previousValidValue||!o)||o!==t.previousValidValue&&o);if(n?(s&&(t.previousValidValue=o),o&&o!==t.value&&(t.value=o)):t.value=n,"time-picker"!==r&&"external"!==r||t.setInputValue(o),s){var c=t.calciteInputTimePickerChange.emit();c.defaultPrevented?(t.internalValueChange=!1,t.value=a,t.setInputValue(a),t.previousValidValue=a):t.previousValidValue=o}}}return e.prototype.valueWatcher=function(e){this.internalValueChange||this.setValue({value:e,origin:"external"}),this.internalValueChange=!1},e.prototype.clickHandler=function(e){e.composedPath().includes(this.calciteTimePickerEl)||this.setFocus()},e.prototype.keyUpHandler=function(e){"Escape"===Object(a["a"])(e.key)&&this.active&&(this.active=!1)},e.prototype.timePickerBlurHandler=function(e){e.preventDefault(),e.stopPropagation(),this.active=!1},e.prototype.timePickerChangeHandler=function(e){if(e.preventDefault(),e.stopPropagation(),e.detail){var t=e.detail,n=t.hour,i=t.minute,r=t.second,a=void 0;a=n&&i?r&&60!==this.step?n+":"+i+":"+r:n+":"+i:"",this.setValue({value:a,origin:"time-picker"})}},e.prototype.timePickerFocusHandler=function(e){e.preventDefault(),e.stopPropagation(),this.active=!0},e.prototype.setFocus=function(){return s(this,void 0,void 0,(function(){return c(this,(function(e){return this.calciteInputEl.setFocus(),[2]}))}))},e.prototype.connectedCallback=function(){this.value&&this.setValue({value:this.value,origin:"loading"})},e.prototype.componentDidLoad=function(){this.calciteInputEl.value!==this.value&&this.setInputValue(this.value)},e.prototype.render=function(){var e=m(this.value),t=e.hour,n=e.minute,r=e.second,a=this.referenceElementId+"-popover";return Object(i["h"])(i["b"],null,Object(i["h"])("div",{"aria-controls":a,"aria-haspopup":"dialog","aria-label":this.name,"aria-owns":a,id:this.referenceElementId,role:"combobox"},Object(i["h"])("calcite-input",{disabled:this.disabled,icon:"clock",name:this.name,onCalciteInputBlur:this.calciteInputBlurHandler,onCalciteInputFocus:this.calciteInputFocusHandler,onCalciteInputInput:this.calciteInputInputHandler,ref:this.setCalciteInputEl,scale:this.scale,step:this.step})),Object(i["h"])("calcite-popover",{id:a,label:"Time Picker",open:this.active||!1,referenceElement:this.referenceElementId},Object(i["h"])("calcite-time-picker",{hour:t,"hour-display-format":this.hourDisplayFormat,intlHour:this.intlHour,intlHourDown:this.intlHourDown,intlHourUp:this.intlHourUp,intlMeridiem:this.intlMeridiem,intlMeridiemDown:this.intlMeridiemDown,intlMeridiemUp:this.intlMeridiemUp,intlMinute:this.intlMinute,intlMinuteDown:this.intlMinuteDown,intlMinuteUp:this.intlMinuteUp,intlSecond:this.intlSecond,intlSecondDown:this.intlSecondDown,intlSecondUp:this.intlSecondUp,minute:n,ref:this.setCalciteTimePickerEl,scale:this.scale,second:r,step:this.step})))},Object.defineProperty(e.prototype,"el",{get:function(){return Object(i["g"])(this)},enumerable:!1,configurable:!0}),Object.defineProperty(e,"watchers",{get:function(){return{value:["valueWatcher"]}},enumerable:!1,configurable:!0}),e}();f.style=b;var w={buttonBottomLeft:"button--bottom-left",buttonBottomRight:"button--bottom-right",button:"button",delimiter:"delimiter",hour:"hour",buttonHourDown:"button--hour-down",buttonHourUp:"button--hour-up",input:"input",meridiem:"meridiem",buttonMeridiemDown:"button--meridiem-down",buttonMeridiemUp:"button--meridiem-up",minute:"minute",buttonMinuteDown:"button--minute-down",buttonMinuteUp:"button--minute-up",second:"second",buttonSecondDown:"button--second-down",buttonSecondUp:"button--second-up",timePicker:"time-picker",buttonTopLeft:"button--top-left",buttonTopRight:"button--top-right"},v={hour:"Hour",hourDown:"Decrease hour",hourUp:"Increase hour",meridiem:"AM/PM",meridiemDown:"Decrease AM/PM",meridiemUp:"Increase AM/PM",minute:"Minute",minuteDown:"Decrease minute",minuteUp:"Increase minute",second:"Second",secondDown:"Decrease second",secondUp:"Increase second"},k='@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{color:var(--calcite-ui-text-1);display:inline-block;font-weight:var(--calcite-font-weight-medium);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.time-picker{-webkit-box-shadow:0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08);box-shadow:0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08);-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;border-radius:var(--calcite-border-radius)}span{-ms-flex-align:center;align-items:center;background-color:var(--calcite-ui-foreground-1);display:-ms-inline-flexbox;display:inline-flex;-ms-flex-pack:center;justify-content:center}span.button{cursor:pointer}span.button:hover,span.button:focus{background-color:var(--calcite-ui-foreground-2)}span.button:focus{outline:2px solid transparent;outline-offset:2px}span.button:active{background-color:var(--calcite-ui-foreground-3)}span.button.top-left{border-top-left-radius:var(--calcite-border-radius)}span.button.bottom-left{border-bottom-left-radius:var(--calcite-border-radius)}span.button.top-right{border-top-right-radius:var(--calcite-border-radius)}span.button.bottom-right{border-bottom-right-radius:var(--calcite-border-radius)}span.button calcite-icon{color:var(--calcite-ui-text-3)}span.input{font-weight:var(--calcite-font-weight-medium);position:relative}span.input:hover{-webkit-box-shadow:inset 0 0 0 2px var(--calcite-ui-foreground-2);box-shadow:inset 0 0 0 2px var(--calcite-ui-foreground-2)}span.input:focus,span.input:hover:focus{outline:2px solid transparent;outline-offset:2px;-webkit-box-shadow:inset 0 0 0 2px var(--calcite-ui-brand);box-shadow:inset 0 0 0 2px var(--calcite-ui-brand)}:host([scale=s]){font-size:var(--calcite-font-size--1)}:host([scale=s]) span{height:24px;width:40px}:host([scale=s]) .delimiter{height:72px}:host([scale=s][hour-display-format="12"]) .time-picker{width:124.2px}:host([scale=s][hour-display-format="12"]:not([step="60"])) .time-picker{width:168px}:host([scale=s][hour-display-format="24"]) .time-picker{width:84.2px}:host([scale=s][hour-display-format="24"]:not([step="60"])) .time-picker{width:128.4px}:host([scale=m]){font-size:var(--calcite-font-size-0)}:host([scale=m]) span{height:32px;width:44px}:host([scale=m]) .delimiter{height:96px}:host([scale=m][hour-display-format="12"]) .time-picker{width:136.8px}:host([scale=m][hour-display-format="12"]:not([step="60"])) .time-picker{width:186px}:host([scale=m][hour-display-format="24"]) .time-picker{width:92.8px}:host([scale=m][hour-display-format="24"]:not([step="60"])) .time-picker{width:141.6px}:host([scale=l]){font-size:var(--calcite-font-size-1)}:host([scale=l]) span{height:48px;width:64px}:host([scale=l]) .delimiter{height:144px}:host([scale=l][hour-display-format="12"]) .time-picker{width:198px}:host([scale=l][hour-display-format="12"]:not([step="60"])) .time-picker{width:268px}:host([scale=l][hour-display-format="24"]) .time-picker{width:134px}:host([scale=l][hour-display-format="24"]:not([step="60"])) .time-picker{width:204px}',y=function(){function e(e){var t=this;Object(i["j"])(this,e),this.calciteTimePickerBlur=Object(i["e"])(this,"calciteTimePickerBlur",7),this.calciteTimePickerChange=Object(i["e"])(this,"calciteTimePickerChange",7),this.calciteTimePickerFocus=Object(i["e"])(this,"calciteTimePickerFocus",7),this.hour=null,this.hourDisplayFormat="12",this.intlHour=v.hour,this.intlHourDown=v.hourDown,this.intlHourUp=v.hourUp,this.intlMeridiem=v.meridiem,this.intlMeridiemDown=v.meridiemDown,this.intlMeridiemUp=v.meridiemUp,this.intlMinute=v.minute,this.intlMinuteDown=v.minuteDown,this.intlMinuteUp=v.minuteUp,this.intlSecond=v.second,this.intlSecondDown=v.secondDown,this.intlSecondUp=v.secondUp,this.minute=null,this.second=null,this.scale="m",this.step=60,this.timeChanged=!1,this.meridiem=null,this.displayHour=this.getDisplayHour(),this.decrementHour=function(){var e=t.hour?"00"===t.hour?23:parseInt(t.hour)-1:0;t.setTime("hour",e)},this.decrementMeridiem=function(){var e="PM"===t.meridiem?"AM":"PM";t.setTime("meridiem",e)},this.decrementMinuteOrSecond=function(e){var n;if(Object(o["c"])(t[e])){var i=parseInt(t[e]);n=0===i?59:i-1}else n=59;t.setTime(e,n)},this.decrementMinute=function(){t.decrementMinuteOrSecond("minute")},this.decrementSecond=function(){t.decrementMinuteOrSecond("second")},this.focusHandler=function(e){t.activeEl=e.currentTarget},this.hourDownButtonKeyDownHandler=function(e){t.buttonActivated(e)&&t.decrementHour()},this.hourKeyDownHandler=function(e){var n=Object(a["a"])(e.key);if(a["c"].includes(n)){var i=parseInt(n),r=void 0;if(Object(o["c"])(t.hour))switch(t.hourDisplayFormat){case"12":r="01"===t.hour&&i>=0&&i<=2?"1"+i:i;break;case"24":r="01"===t.hour?"1"+i:"02"===t.hour&&i>=0&&i<=3?"2"+i:i;break}else r=i;t.setTime("hour",r)}else switch(n){case"Backspace":case"Delete":t.setTime("hour",null);break;case"ArrowDown":e.preventDefault(),t.decrementHour();break;case"ArrowUp":e.preventDefault(),t.incrementHour();break;case" ":case"Spacebar":e.preventDefault();break}},this.hourUpButtonKeyDownHandler=function(e){t.buttonActivated(e)&&t.incrementHour()},this.incrementMeridiem=function(){var e="AM"===t.meridiem?"PM":"AM";t.setTime("meridiem",e)},this.incrementHour=function(){var e=Object(o["c"])(t.hour)?"23"===t.hour?0:parseInt(t.hour)+1:1;t.setTime("hour",e)},this.incrementMinuteOrSecond=function(e){var n=Object(o["c"])(t[e])?"59"===t[e]?0:parseInt(t[e])+1:0;t.setTime(e,n)},this.incrementMinute=function(){t.incrementMinuteOrSecond("minute")},this.incrementSecond=function(){t.incrementMinuteOrSecond("second")},this.meridiemDownButtonKeyDownHandler=function(e){t.buttonActivated(e)&&t.decrementMeridiem()},this.meridiemKeyDownHandler=function(e){switch(Object(a["a"])(e.key)){case"a":t.setTime("meridiem","AM");break;case"p":t.setTime("meridiem","PM");break;case"Backspace":case"Delete":t.setTime("meridiem",null);break;case"ArrowUp":e.preventDefault(),t.incrementMeridiem();break;case"ArrowDown":e.preventDefault(),t.decrementMeridiem();break;case" ":case"Spacebar":e.preventDefault();break}},this.meridiemUpButtonKeyDownHandler=function(e){t.buttonActivated(e)&&t.incrementMeridiem()},this.minuteDownButtonKeyDownHandler=function(e){t.buttonActivated(e)&&t.decrementMinute()},this.minuteKeyDownHandler=function(e){var n=Object(a["a"])(e.key);if(a["c"].includes(n)){var i=parseInt(n),r=void 0;if(Object(o["c"])(t.minute)&&t.minute.startsWith("0")){var s=parseInt(t.minute);r=s>u?i:""+s+i}else r=i;t.setTime("minute",r)}else switch(n){case"Backspace":case"Delete":t.setTime("minute",null);break;case"ArrowDown":e.preventDefault(),t.decrementMinute();break;case"ArrowUp":e.preventDefault(),t.incrementMinute();break;case" ":case"Spacebar":e.preventDefault();break}},this.minuteUpButtonKeyDownHandler=function(e){t.buttonActivated(e)&&t.incrementMinute()},this.secondDownButtonKeyDownHandler=function(e){t.buttonActivated(e)&&t.decrementSecond()},this.secondKeyDownHandler=function(e){var n=Object(a["a"])(e.key);if(a["c"].includes(n)){var i=parseInt(n),r=void 0;if(Object(o["c"])(t.second)&&t.second.startsWith("0")){var s=parseInt(t.second);r=s>u?i:""+s+i}else r=i;t.setTime("second",r)}else switch(n){case"Backspace":case"Delete":t.setTime("second",null);break;case"ArrowDown":e.preventDefault(),t.decrementSecond();break;case"ArrowUp":e.preventDefault(),t.incrementSecond();break;case" ":case"Spacebar":e.preventDefault();break}},this.secondUpButtonKeyDownHandler=function(e){t.buttonActivated(e)&&t.incrementSecond()},this.setTime=function(e,n,i){switch(void 0===i&&(i=!0),e){default:return;case"hour":t.hour="number"===typeof n?d(n):n;break;case"minute":t.minute="number"===typeof n?d(n):n;break;case"second":t.second="number"===typeof n?d(n):n;break;case"meridiem":if(Object(o["c"])(t.hour)){var r=parseInt(t.hour);switch(n){case"AM":r>=12&&(t.hour=d(r-12));break;case"PM":r<12&&(t.hour=d(r+12));break}t.meridiem=n}else t.meridiem=n;break}t.timeChanged=!0,i&&t.calciteTimePickerChange.emit(t.getTime())}}return e.prototype.hourChanged=function(e){"12"===this.hourDisplayFormat&&Object(o["c"])(e)&&(this.meridiem=l(e))},e.prototype.timeChangeHandler=function(){var e=this.getTime(),t=e.hour,n=e.minute;t||n||this.setTime("meridiem",null,!1),this.timeChanged&&(this.timeChanged=!1)},e.prototype.hostBlurHandler=function(){this.calciteTimePickerBlur.emit()},e.prototype.hostFocusHandler=function(){this.calciteTimePickerFocus.emit()},e.prototype.keyDownHandler=function(e){var t=Object(a["a"])(e.key);switch(this.activeEl){case this.hourEl:"ArrowRight"===t&&this.setFocus("minute");break;case this.minuteEl:switch(t){case"ArrowLeft":this.setFocus("hour");break;case"ArrowRight":60!==this.step?this.setFocus("second"):"12"===this.hourDisplayFormat&&this.setFocus("meridiem");break}break;case this.secondEl:switch(t){case"ArrowLeft":this.setFocus("minute");break;case"ArrowRight":"12"===this.hourDisplayFormat&&this.setFocus("meridiem");break}break;case this.meridiemEl:switch(t){case"ArrowLeft":60!==this.step?this.setFocus("second"):this.setFocus("minute");break}break}},e.prototype.setFocus=function(e){return s(this,void 0,void 0,(function(){var t;return c(this,(function(n){return null===(t=this[(e||"hour")+"El"])||void 0===t||t.focus(),[2]}))}))},e.prototype.buttonActivated=function(e){var t=Object(a["a"])(e.key);return" "===t&&e.preventDefault(),Object(a["b"])(t)},e.prototype.getDisplayHour=function(){return this.hour?"12"===this.hourDisplayFormat?h(this.hour):this.hour:"--"},e.prototype.getTime=function(){return{hour:this.hour,minute:this.minute,second:this.second}},e.prototype.connectedCallback=function(){"12"===this.hourDisplayFormat&&(this.meridiem=l(this.hour)),Object(o["c"])(this.hour)&&(this.hour=d(parseInt(this.hour))),Object(o["c"])(this.minute)&&(this.minute=d(parseInt(this.minute))),Object(o["c"])(this.second)&&(this.second=d(parseInt(this.second)))},e.prototype.render=function(){var e,t,n,r,a,s,c,u,l,h,m,p,d=this,b="s"===this.scale||"m"===this.scale?"s":"m",f=60!==this.step,v=Object(o["c"])(this.hour),k=Object(o["c"])(this.minute),y=Object(o["c"])(this.second);return Object(i["h"])(i["b"],null,Object(i["h"])("div",{class:w.timePicker},Object(i["h"])("div",{role:"group"},Object(i["h"])("span",{"aria-label":this.intlHourUp,class:(e={},e[w.button]=!0,e[w.buttonHourUp]=!0,e[w.buttonTopLeft]=!0,e),onClick:this.incrementHour,onKeyDown:this.hourUpButtonKeyDownHandler,role:"button",tabIndex:-1},Object(i["h"])("calcite-icon",{icon:"chevron-up",scale:b})),Object(i["h"])("span",{"aria-label":this.intlHour,"aria-valuemax":"23","aria-valuemin":"1","aria-valuenow":v&&parseInt(this.hour),"aria-valuetext":this.hour,class:(t={},t[w.input]=!0,t[w.hour]=!0,t),onFocus:this.focusHandler,onKeyDown:this.hourKeyDownHandler,ref:function(e){return d.hourEl=e},role:"spinbutton",tabIndex:0},this.getDisplayHour()),Object(i["h"])("span",{"aria-label":this.intlHourDown,class:(n={},n[w.button]=!0,n[w.buttonHourDown]=!0,n[w.buttonBottomLeft]=!0,n),onClick:this.decrementHour,onKeyDown:this.hourDownButtonKeyDownHandler,role:"button",tabIndex:-1},Object(i["h"])("calcite-icon",{icon:"chevron-down",scale:b}))),Object(i["h"])("span",{class:w.delimiter},":"),Object(i["h"])("div",{role:"group"},Object(i["h"])("span",{"aria-label":this.intlMinuteUp,class:(r={},r[w.button]=!0,r[w.buttonMinuteUp]=!0,r),onClick:this.incrementMinute,onKeyDown:this.minuteUpButtonKeyDownHandler,role:"button",tabIndex:-1},Object(i["h"])("calcite-icon",{icon:"chevron-up",scale:b})),Object(i["h"])("span",{"aria-label":this.intlMinute,"aria-valuemax":"12","aria-valuemin":"1","aria-valuenow":k&&parseInt(this.minute),"aria-valuetext":this.minute,class:(a={},a[w.input]=!0,a[w.minute]=!0,a),onFocus:this.focusHandler,onKeyDown:this.minuteKeyDownHandler,ref:function(e){return d.minuteEl=e},role:"spinbutton",tabIndex:0},this.minute?this.minute:"--"),Object(i["h"])("span",{"aria-label":this.intlMinuteDown,class:(s={},s[w.button]=!0,s[w.buttonMinuteDown]=!0,s),onClick:this.decrementMinute,onKeyDown:this.minuteDownButtonKeyDownHandler,role:"button",tabIndex:-1},Object(i["h"])("calcite-icon",{icon:"chevron-down",scale:b}))),f&&Object(i["h"])("span",{class:w.delimiter},":"),f&&Object(i["h"])("div",{role:"group"},Object(i["h"])("span",{"aria-label":this.intlSecondUp,class:(c={},c[w.button]=!0,c[w.buttonSecondUp]=!0,c),onClick:this.incrementSecond,onKeyDown:this.secondUpButtonKeyDownHandler,role:"button",tabIndex:-1},Object(i["h"])("calcite-icon",{icon:"chevron-up",scale:b})),Object(i["h"])("span",{"aria-label":this.intlSecond,"aria-valuemax":"59","aria-valuemin":"0","aria-valuenow":y&&parseInt(this.second),"aria-valuetext":this.second,class:(u={},u[w.input]=!0,u[w.second]=!0,u),onFocus:this.focusHandler,onKeyDown:this.secondKeyDownHandler,ref:function(e){return d.secondEl=e},role:"spinbutton",tabIndex:0},this.second?this.second:"--"),Object(i["h"])("span",{"aria-label":this.intlSecondDown,class:(l={},l[w.button]=!0,l[w.buttonSecondDown]=!0,l),onClick:this.decrementSecond,onKeyDown:this.secondDownButtonKeyDownHandler,role:"button",tabIndex:-1},Object(i["h"])("calcite-icon",{icon:"chevron-down",scale:b}))),"12"===this.hourDisplayFormat&&Object(i["h"])("div",{role:"group"},Object(i["h"])("span",{"aria-label":this.intlMeridiemUp,class:(h={},h[w.button]=!0,h[w.buttonMeridiemUp]=!0,h[w.buttonTopRight]=!0,h),onClick:this.incrementMeridiem,onKeyDown:this.meridiemUpButtonKeyDownHandler,role:"button",tabIndex:-1},Object(i["h"])("calcite-icon",{icon:"chevron-up",scale:b})),Object(i["h"])("span",{"aria-label":this.intlMeridiem,"aria-valuemax":"2","aria-valuemin":"1","aria-valuenow":"AM"===this.meridiem?"1":"PM"===this.meridiem?"2":void 0,"aria-valuetext":this.meridiem,class:(m={},m[w.input]=!0,m[w.meridiem]=!0,m),onFocus:this.focusHandler,onKeyDown:this.meridiemKeyDownHandler,ref:function(e){return d.meridiemEl=e},role:"spinbutton",tabIndex:0},this.meridiem?this.meridiem:"--"),Object(i["h"])("span",{"aria-label":this.intlMeridiemDown,class:(p={},p[w.button]=!0,p[w.buttonMeridiemDown]=!0,p[w.buttonBottomRight]=!0,p),onClick:this.decrementMeridiem,onKeyDown:this.meridiemDownButtonKeyDownHandler,role:"button",tabIndex:-1},Object(i["h"])("calcite-icon",{icon:"chevron-down",scale:b})))))},Object.defineProperty(e.prototype,"el",{get:function(){return Object(i["g"])(this)},enumerable:!1,configurable:!0}),Object.defineProperty(e,"watchers",{get:function(){return{hour:["hourChanged","timeChangeHandler"],minute:["timeChangeHandler"],second:["timeChangeHandler"]}},enumerable:!1,configurable:!0}),e}();y.style=k}}]);
//# sourceMappingURL=chunk-535743ba.a7ac2220.js.map