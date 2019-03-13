<template>
    <div class='flex'>
        <div id="date">
			<div class="block sta">
				<el-date-picker v-model="value4" type="month" placeholder="选择月" :picker-options="pickerOptions0">
				</el-date-picker>
			</div>
			<div class="zhi">至</div>
			<div class="block end">
				<el-date-picker v-model="value5" type="month" placeholder="选择月" :picker-options="pickerOptions1">
				</el-date-picker>
			</div>
		</div>
        <input type="hidden" id="age-slider" value="1530374400000,20530374400000" />
    </div>
</template>

<script lang='js'>
(function($, window, document, undefined) {
	'use strict';
	var jRange = function() {
		return this.init.apply(this, arguments);
	};
	jRange.prototype = {
		defaults: {
			onstatechange: function() {},
			ondragend: function() {},
			onbarclicked: function() {},
			isRange: false,
			showLabels: true,
			showScale: true,
			step: 1,
			format: '%s',
			theme: 'theme-green',
			width: 300,
			disable: false,
			snap: false
		},
		template: '<div class="slider-container">\
			<div class="back-bar">\
                <div class="selected-bar"></div>\
                <div class="pointer low"></div><div class="pointer-label low"></div>\
                <div class="pointer high"></div>\
                <div class="pointer-label high"></div>\
                <div class="clickable-dummy"></div>\
            </div>\
            <div class="scale"></div>\
		</div>',
		init: function(node, options) {
			this.options = $.extend({}, this.defaults, options);
			this.inputNode = $(node);
			this.options.value = this.inputNode.val() || (this.options.isRange ? this.options.from + ',' + this.options.from : '' + this.options.from);
			this.domNode = $(this.template);
			this.domNode.addClass(this.options.theme);
			this.inputNode.after(this.domNode);
			this.domNode.on('change', this.onChange);
			this.pointers = $('.pointer', this.domNode);
			this.lowPointer = this.pointers.first();
			this.highPointer = this.pointers.last();
			this.labels = $('.pointer-label', this.domNode);
			this.lowLabel = this.labels.first();
			this.highLabel = this.labels.last();
			this.scale = $('.scale', this.domNode);
			this.bar = $('.selected-bar', this.domNode);
			this.clickableBar = this.domNode.find('.clickable-dummy');
			this.interval = this.options.to - this.options.from;
			this.render();
		},
		render: function() {
			
			if(this.inputNode.width() === 0 && !this.options.width) {
				console.log('jRange : no width found, returning');
				return;
			} else {
				this.options.width = this.options.width || this.inputNode.width();
				this.domNode.width(this.options.width);
				this.inputNode.hide();
			}
			if(this.isSingle()) {
				this.lowPointer.hide();
				this.lowLabel.hide();
			}
			if(!this.options.showLabels) {
				this.labels.hide();
			}
			this.attachEvents();
			if(this.options.showScale) {
				this.renderScale();
			}
			this.setValue(this.options.value);
		},
		isSingle: function() {
			if(typeof(this.options.value) === 'number') {
				return true;
			}
			return(this.options.value.indexOf(',') !== -1 || this.options.isRange) ? false : true;
		
		},
		attachEvents: function() {
			this.pointers.on('mousedown touchstart', $.proxy(this.onDragStart, this));
			this.pointers.bind('dragstart', function(event) {
				event.preventDefault();
			});
		},
		onDragStart: function(e) {
			if(this.options.disable || (e.type === 'mousedown' && e.which !== 1)) {
				return;
			}
			e.stopPropagation();
			e.preventDefault();
			var pointer = $(e.target);
			this.pointers.removeClass('last-active');
			pointer.addClass('focused last-active');
			this[(pointer.hasClass('low') ? 'low' : 'high') + 'Label'].addClass('focused');
			$(document).on('mousemove.slider touchmove.slider', $.proxy(this.onDrag, this, pointer));
			$(document).on('mouseup.slider touchend.slider touchcancel.slider', $.proxy(this.onDragEnd, this));
		},
		onDrag: function(pointer, e) {
			e.stopPropagation();
			e.preventDefault();
			if(e.originalEvent.touches && e.originalEvent.touches.length) {
				e = e.originalEvent.touches[0];
			} else if(e.originalEvent.changedTouches && e.originalEvent.changedTouches.length) {
				e = e.originalEvent.changedTouches[0];
			}
			var position = e.clientX - this.domNode.offset().left;
			this.domNode.trigger('change', [this, pointer, position]);
		},
		onDragEnd: function(e) {
			this.pointers.removeClass('focused').trigger('rangeslideend');
			this.labels.removeClass('focused');
			$(document).off('.slider');
			this.options.ondragend.call(this, this.options.value);
		},
		barClicked: function(e) {
			if(this.options.disable) return;
			var x = e.pageX - this.clickableBar.offset().left;
			if(this.isSingle())
				this.setPosition(this.pointers.last(), x, true, true);
			else {
				var firstLeft = Math.abs(parseFloat(this.pointers.first().css('left'), 10)),
					firstHalfWidth = this.pointers.first().width() / 2,
					lastLeft = Math.abs(parseFloat(this.pointers.last().css('left'), 10)),
					lastHalfWidth = this.pointers.first().width() / 2,
					leftSide = Math.abs(firstLeft - x + firstHalfWidth),
					rightSide = Math.abs(lastLeft - x + lastHalfWidth),
					pointer;
				if(leftSide == rightSide) {
					pointer = x < firstLeft ? this.pointers.first() : this.pointers.last();
				} else {
					pointer = leftSide < rightSide ? this.pointers.first() : this.pointers.last();
				}
				this.setPosition(pointer, x, true, true);
			}
			this.options.onbarclicked.call(this, this.options.value);
		},
		onChange: function(e, self, pointer, position) {
			var min, max;
			min = 0;
			max = self.domNode.width();
			if(!self.isSingle()) {
				min = pointer.hasClass('high') ? parseFloat(self.lowPointer.css("left")) + (self.lowPointer.width() / 2) : 0;
				max = pointer.hasClass('low') ? parseFloat(self.highPointer.css("left")) + (self.highPointer.width() / 2) : self.domNode.width();
			}
			var value = Math.min(Math.max(position, min), max);
			self.setPosition(pointer, value, true);
		},
		setPosition: function(pointer, position, isPx, animate) {
			var leftPos, rightPos, lowPos = parseFloat(this.lowPointer.css("left")),
				highPos = parseFloat(this.highPointer.css("left")) || 0,
				circleWidth = this.highPointer.width() / 2;
			if(!isPx) {
				position = this.prcToPx(position);
			}
			if(this.options.snap) {
				var expPos = this.correctPositionForSnap(position);
				if(expPos === -1) {
					return;
				} else {
					position = expPos;
				}
			}
			if(pointer[0] === this.highPointer[0]) {
				highPos = Math.round(position - circleWidth);
			} else {
				lowPos = Math.round(position - circleWidth);
			}
			pointer[animate ? 'animate' : 'css']({
				'left': Math.round(position - circleWidth)
			});
			if(this.isSingle()) {
				leftPos = 0;
			} else {
				leftPos = lowPos + circleWidth;
				rightPos = highPos + circleWidth;
			}
			var w = Math.round(highPos + circleWidth - leftPos);
			this.bar[animate ? 'animate' : 'css']({
				'width': Math.abs(w),
				'left': (w > 0) ? leftPos : leftPos + w
			});
			this.showPointerValue(pointer, position, animate);
			this.isReadonly();
		},
		correctPositionForSnap: function(position) {
			var currentValue = this.positionToValue(position) - this.options.from;
			var diff = this.options.width / (this.interval / this.options.step),
				expectedPosition = (currentValue / this.options.step) * diff;
			if(position <= expectedPosition + diff / 2 && position >= expectedPosition - diff / 2) {
				return expectedPosition;
			} else {
				return -1;
			}
		},
		setValue: function(value) {
			var values = value.toString().split(',');
			values[0] = Math.min(Math.max(values[0], this.options.from), this.options.to) + '';
			if(values.length > 1) {
				values[1] = Math.min(Math.max(values[1], this.options.from), this.options.to) + '';
			}
			this.options.value = value;
			var prc = this.valuesToPrc(values.length === 2 ? values : [0, values[0]]);
			if(this.isSingle()) {
				this.setPosition(this.highPointer, prc[1]);
			} else {
				this.setPosition(this.lowPointer, prc[0]);
				this.setPosition(this.highPointer, prc[1]);
			}
		},
		renderScale: function() {
			var s = this.options.scale || [this.options.from, this.options.to];
			var prc = (100 / (s.length - 1)).toFixed(2)
			var str = '';
			for(var i = 0; i < s.length; i++) {
				str += '<span style="left: ' + i * prc + '%">' + (s[i] != '|' ? '<ins>' + s[i] + '</ins>' : '') + '</span>';
			}
			this.scale.html(str);
			$('ins', this.scale).each(function() {
				$(this).css({
					marginLeft: -$(this).outerWidth() / 2
				});
			});
		},
		getBarWidth: function() {
			var values = this.options.value.split(',');
			if(values.length > 1) {
				return parseFloat(values[1]) - parseFloat(values[0]);
			} else {
				return parseFloat(values[0]);
			}
		},
		showPointerValue: function(pointer, position, animate) {
			var label = $('.pointer-label', this.domNode)[pointer.hasClass('low') ? 'first' : 'last']();
			var text;
			var value = this.positionToValue(position);
			if($.isFunction(this.options.format)) {
				var type = this.isSingle() ? undefined : (pointer.hasClass('low') ? 'low' : 'high');
				text = this.options.format(value, type);
			} else {
				function timestampToTime(timestamp) {//新加入的把时间戳转换为日期格式
	 				var date = new Date(timestamp);
			        var Y = date.getFullYear() + '-';
			        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
			        return Y+M;
			    }
			    timestampToTime(value);
		    	var time = timestampToTime(value)
				text = this.options.format.replace('%s', time);
			}
			var width = label.html(text).width(),
				left = position - width / 2;
			label[animate ? 'animate' : 'css']({
				left: left
			});
			this.setInputValue(pointer, value);
		},
		valuesToPrc: function(values) {
			var lowPrc = ((parseFloat(values[0]) - parseFloat(this.options.from)) * 100 / this.interval),
				highPrc = ((parseFloat(values[1]) - parseFloat(this.options.from)) * 100 / this.interval);
			return [lowPrc, highPrc];
		},
		prcToPx: function(prc) {
			return(this.domNode.width() * prc) / 100;
		},
		isDecimal: function() {
			return((this.options.value + this.options.from + this.options.to).indexOf(".") === -1) ? false : true;
		},
		positionToValue: function(pos) {
			var value = (pos / this.domNode.width()) * this.interval;
			value = parseFloat(value, 10) + parseFloat(this.options.from, 10);
			if(this.isDecimal()) {
				var final = Math.round(Math.round(value / this.options.step) * this.options.step * 100) / 100;
				if(final !== 0.0) {
					final = '' + final;
					if(final.indexOf(".") === -1) {
						final = final + ".";
					}
					while(final.length - final.indexOf('.') < 3) {
						final = final + "0";
					}
				} else {
					final = "0.00";
				}
				return final;
			} else {
				return Math.round(value / this.options.step) * this.options.step;
			}
		},
		setInputValue: function(pointer, v) {
			if(this.isSingle()) {
				this.options.value = v.toString();
			} else {
				var values = this.options.value.split(',');
				if(pointer.hasClass('low')) {
					this.options.value = v + ',' + values[1];
				} else {
					this.options.value = values[0] + ',' + v;
				}
			}
			if(this.inputNode.val() !== this.options.value) {
				this.inputNode.val(this.options.value).trigger('change');
				this.options.onstatechange.call(this, this.options.value);
			}
		},
		getValue: function() {
			return this.options.value;
		},
		getOptions: function() {
			return this.options;
		},
		getRange: function() {
			return this.options.from + "," + this.options.to;
		},
		isReadonly: function() {
			this.domNode.toggleClass('slider-readonly', this.options.disable);
		},
		disable: function() {
			this.options.disable = true;
			this.isReadonly();
		},
		enable: function() {
			this.options.disable = false;
			this.isReadonly();
		},
		toggleDisable: function() {
			this.options.disable = !this.options.disable;
			this.isReadonly();
		},
		updateRange: function(range, value) {
			var values = range.toString().split(',');
			this.interval = parseInt(values[1]) - parseInt(values[0]);
			if(value) {
				this.setValue(value);
			} else {
				this.setValue(this.getValue());
			}
		}
	};
	var pluginName = 'jRange';
	$.fn[pluginName] = function(option) {
		var args = arguments,
			result;
		this.each(function() {
			var $this = $(this),
				data = $.data(this, 'plugin_' + pluginName),
				options = typeof option === 'object' && option;
			if(!data) {
				$this.data('plugin_' + pluginName, (data = new jRange(this, options)));
				$(window).resize(function() {
					data.setValue(data.getValue());
				});
			}
			if(typeof option === 'string') {
				result = data[option].apply(data, Array.prototype.slice.call(args, 1));
			}
		});
		return result || this;
	};
})($, window, document);

export default {
    data() {
        return {
            pickerOptions0:{
                disabledDate: (time) => {
                    let curDate = (new Date()).getTime();
                    let threeMonths = 1514736000000;//开始时间2018-01-01
                    if(this.te != "") {
                        return time.getTime() > Date.now() || time.getTime() >this.te-1|| time.getTime() < threeMonths
                    } else {
                        return time.getTime() > Date.now() || time.getTime() < threeMonths
                    }

                }
            },

            pickerOptions1: {
                disabledDate: (time) => {
                    let curDate = (new Date()).getTime();
                    let threeMonths = 1514736000000;
                    return time.getTime()<this.ts-0+3.024e9|| time.getTime() > Date.now() || time.getTime() < threeMonths //3.024e9  35天的毫秒数
                }
            },
           
            value4:'',
            value5:'',
			first:true
        }
    },
    computed: {
		time() {
			return this.$store.state.time
		},
	},	
	
    mounted() {
		const myDate = new Date();
		const M=myDate.getMonth()+1;
		let N=myDate.getFullYear();
		const D=myDate.getDate();
        let M_string
        if(D>15) {
            M_string = M>9?M.toString(): "0" + M.toString()
        } else {
            if(M>10) {
                M_string = (M-1).toString()
            } else {
                if(M>1) {
                    M_string="0" + (M-1).toString()
                } else {
                    M_string = "12", N=N-1
                }
            }
        }
		var nowtime = Date.parse(new Date(N+"-"+M_string));
		var stringTime = "2018-01-01 00:00:00";
		var timestamp2 = Date.parse(new Date(stringTime));
		const slide = document.getElementById('aa')
		const that = this
		this.$nextTick(() => {
			$('#age-slider').jRange({
				from: timestamp2,
				to: nowtime,
				step: 86400000,
				format: '%s',
				width: 400,
				showLabels: true,
				showScale: false,
				isRange: true,
				snap: true,
				theme: "theme-blue",
				onstatechange: function() {//数字变化的时候的回调函数
					var ts = $('.low').text();
					var te = $('.high').text();			
					$(".sta .el-input__inner").val(ts);
					$(".end .el-input__inner").val(te);
					if(ts.length>0 && te.length>0) {
						console.log(that.first)
						if(that.first) {
							that.$emit('changeTime', {te: te, ts: ts})
							that.first = false
						}
					}
				},
				ondragend: function() {//拖拽结束时的回调函数
					var ts = $('.low').text().split("-").join('');
					var te = $('.high').text().split("-").join('');
					if(ts.length>0 && te.length>0) {
						that.$emit('changeTime', {te: te, ts: ts, first:true})
					}
				},
			});
		})
    },

	watch:{
		value4(val) {
			$('#age-slider').jRange('setValue', Date.parse(new Date(this.value4)) + ',' + Date.parse(new Date(this.value5)));
			var ts = $('.low').text().split("-").join('');
			var te = $('.high').text().split("-").join('');
			this.$emit('changeTime', {te: te, ts: ts})
			console.log(te,ts)
		},
		value5(val) {
			$('#age-slider').jRange('setValue', Date.parse(new Date(this.value4)) + ',' + Date.parse(new Date(this.value5)));
			var ts = $('.low').text().split("-").join('');
			var te = $('.high').text().split("-").join('');
			this.$emit('changeTime', {te: te, ts: ts})
		},
		time: {
			handler(val) {
				
			},
			deep:true,
			immediate:true
		}
	},
	
}
</script>

<style lang="less">
    .flex {
        display:flex;
        align-items: center;
    }
    #date {
        height: 1.725rem;
        display:flex;
        align-items:flex-end;
        padding: .375rem .625rem;
        flex-shrink:0;
        .zhi{
            width: 20px;
            font-size: 14px;
            color: #b0b0b0;
            margin-left: 5px;
        }
    }
    .slider-container {
        width: 100%;
        font-family: helvetica neue, Helvetica, Arial, sans-serif
    }

    .slider-container .back-bar {
        height: 8px;
        position: relative
    }

    .slider-container .back-bar .selected-bar {
        position: absolute;
        height: 100%
    }

    .slider-container .back-bar .pointer {
        position: absolute;
        width: 10px;
        height: 10px;
        background-color: red;
        cursor: col-resize;
        opacity: 1;
        z-index: 2
    }

    .slider-container .back-bar .pointer.last-active {
        z-index: 3
    }

    .slider-container .back-bar .pointer-label {
        position: absolute;
        top: 40px;
        font-size: 8px;
        background: #fff;
        white-space: nowrap;
        line-height: 1
    }

    .slider-container .back-bar .focused {
        z-index: 10
    }

    .slider-container .clickable-dummy {
        cursor: pointer;
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 1
    }

    .slider-container .scale {
        top: 2px;
        position: relative
    }

    .slider-container .scale span {
        position: absolute;
        height: 5px;
        border-left: 1px solid #999;
        font-size: 0
    }

    .slider-container .scale ins {
        width: 30px;
        font-size: 12px;
        text-decoration: none;
        position: absolute;
        left: 0;
        top: 5px;
        color: #999;
        line-height: 1
    }

    .slider-container.slider-readonly .clickable-dummy,
    .slider-container.slider-readonly .pointer {
        cursor: auto
    }

    .theme-green .back-bar {
        height: 5px;
        border-radius: 2px;
        background-color: #eee;
        background-color: #e7e7e7;
        background-image: -moz-linear-gradient(top, #eeeeee, #dddddd);
        background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#eeeeee), to(#dddddd));
        background-image: -webkit-linear-gradient(top, #eeeeee, #dddddd);
        background-image: -o-linear-gradient(top, #eeeeee, #dddddd);
        background-image: linear-gradient(to bottom, #eeeeee, #dddddd);
        background-repeat: repeat-x;
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffeeeeee', endColorstr='#ffdddddd', GradientType=0)
    }

    .theme-green .back-bar .selected-bar {
        border-radius: 2px;
        background-color: #a1fad0;
        background-image: -moz-linear-gradient(top, #bdfade, #76fabc);
        background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#bdfade), to(#76fabc));
        background-image: -webkit-linear-gradient(top, #bdfade, #76fabc);
        background-image: -o-linear-gradient(top, #bdfade, #76fabc);
        background-image: linear-gradient(to bottom, #bdfade, #76fabc);
        background-repeat: repeat-x;
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffbdfade', endColorstr='#ff76fabc', GradientType=0)
    }

    .theme-green .back-bar .pointer {
        width: 14px;
        height: 14px;
        top: -5px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        border-radius: 10px;
        border: 1px solid #aaa;
        background-color: #e7e7e7;
        background-image: -moz-linear-gradient(top, #eeeeee, #dddddd);
        background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#eeeeee), to(#dddddd));
        background-image: -webkit-linear-gradient(top, #eeeeee, #dddddd);
        background-image: -o-linear-gradient(top, #eeeeee, #dddddd);
        background-image: linear-gradient(to bottom, #eeeeee, #dddddd);
        background-repeat: repeat-x;
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffeeeeee', endColorstr='#ffdddddd', GradientType=0)
    }

    .theme-green .back-bar .pointer-label {
        color: #999
    }

    .theme-green .back-bar .focused {
        color: #333
    }

    .theme-green .scale span {
        border-left: 1px solid #e5e5e5
    }

    .theme-green .scale ins {
        color: #999
    }

    .theme-blue .back-bar {
        height: 20px;
        border-radius: 2px;
        background-color: #eee;
        background-color: #e7e7e7;
        background-image: -moz-linear-gradient(top, #eeeeee, #dddddd);
        background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#eeeeee), to(#dddddd));
        background-image: -webkit-linear-gradient(top, #eeeeee, #dddddd);
        background-image: -o-linear-gradient(top, #eeeeee, #dddddd);
        background-image: linear-gradient(to bottom, #eeeeee, #dddddd);
        background-repeat: repeat-x;
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffeeeeee', endColorstr='#ffdddddd', GradientType=0)
    }

    .theme-blue .back-bar .selected-bar {
        border-radius: 2px;
        background-color: #adc0eb;
        /*background-image: -moz-linear-gradient(top, #b1d1f9, #64a8f9);
        background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#b1d1f9), to(#64a8f9));
        background-image: -webkit-linear-gradient(top, #b1d1f9, #64a8f9);
        background-image: -o-linear-gradient(top, #b1d1f9, #64a8f9);
        background-image: linear-gradient(to bottom, #b1d1f9, #64a8f9);
        background-repeat: repeat-x;*/
        /*filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffb1d1f9', endColorstr='#ff64a8f9', GradientType=0)*/
    }

    .theme-blue .back-bar .pointer {
        width: 3px;
        height: 20px;
        /*top: -5px;*/
        background-color: #4269cc;
        /*background-image: -moz-linear-gradient(top, #eeeeee, #dddddd);
        background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#eeeeee), to(#dddddd));
        background-image: -webkit-linear-gradient(top, #eeeeee, #dddddd);
        background-image: -o-linear-gradient(top, #eeeeee, #dddddd);
        background-image: linear-gradient(to bottom, #eeeeee, #dddddd);*/
        /*background-repeat: repeat-x;*/
        /*filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffeeeeee', endColorstr='#ffdddddd', GradientType=0)*/
    }

    .theme-blue .back-bar .pointer-label {
        color: #999
    }

    .theme-blue .back-bar .focused {
        color: #333
    }

    .theme-blue .scale span {
        border-left: 1px solid #e5e5e5
    }

    .theme-blue .scale ins {
        color: #999
    }
    .slider-container .theme-blue {
        //margin-top: 17px;
    }
    .theme-blue .back-bar {
        height: 32px;
        //margin-top: 17px;
    }

    .theme-blue .back-bar .pointer {
        height: 32px;
    }
    .slider-container .back-bar .pointer-label{
        font-size: 10px;
    }
</style>