(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ZxEditor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Create by zx1984
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 2018/1/23 0023.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * https://github.com/zx1984
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


__webpack_require__(1);

var _util = __webpack_require__(6);

var _util2 = _interopRequireDefault(_util);

var _domCore = __webpack_require__(7);

var _domCore2 = _interopRequireDefault(_domCore);

var _scroll = __webpack_require__(8);

var _scroll2 = _interopRequireDefault(_scroll);

var _debug = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// COLOR
var COLORS = {
  black: '#333',
  gray: '#d0d0d0',
  red: '#ff583d',
  yellow: '#fdaa25',
  green: '#44c67b',
  blue: '#14b2e0',
  purple: '#b065e2'

  // 工具栏高度
};var TOOL_BAR_HEIGHT = 48 + 10;
// 字体样式选择层高度
var TEXT_STYLE_HEIGHT = 310 + 10;

// ZxEditor

var ZxEditor = function () {
  // constructor
  function ZxEditor() {
    var selecotor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';

    _classCallCheck(this, ZxEditor);

    this.editor = null;
    this.toolbar = null;
    this.editbox = null;
    this.textstyle = null;
    this.textstyleIsShow = false;
    this.linkinput = null;
    // 编辑的内容
    this.content = null;
    // 光标对象
    this.selection = null;
    this.range = null;
    this.rangeOffset = 0;
    this.rangeTimer = null;
    // 当前光标所在的元素节点NodeType === 1
    this.rangeElm = null;
    this._initDoms(selecotor);
  }

  /**
   * 初始化DOM节点
   * @param selecotor Editor外层容器id或className
   * @private
   */


  _createClass(ZxEditor, [{
    key: '_initDoms',
    value: function _initDoms(selecotor) {
      // 外部容器
      var outerWrapper = _domCore2.default.query(selecotor);

      this.editor = _domCore2.default.create('div', { class: 'zxeditor-container' });
      this.editbox = _domCore2.default.create('div', { class: 'zxeditor-content-wrapper', contenteditable: true, style: 'margin-bottom: ' + TOOL_BAR_HEIGHT + 'px' });
      this.toolbar = _domCore2.default.create('div', { class: 'zxeditor-toolbar-wrapper' });
      this.textstyle = _domCore2.default.create('div', { class: 'zxeditor-textstyle-wrapper', style: 'display: none' });

      this.linkinput = _domCore2.default.create('div', { class: 'zxeditor-linkinput-wrapper', style: 'display: none' });

      this.toolbar.innerHTML = '\n      <div class="toolbar-item pic-hook">\u56FE\u7247</div>\n      <div class="toolbar-item text-hook">\u6587\u5B57</div>\n      <div class="toolbar-item link-hook">\u94FE\u63A5</div>\n      <div class="toolbar-item split-hook">\u5206\u5272</div>\n      <!--<div class="toolbar-item reward-hook">\u6253\u8D4F</div>-->\n    ';

      this.textstyle.innerHTML = '\n      <div class="abs-bar-wrapper border-bottom">\n        <div class="abs-bar-title">\u6837\u5F0F</div>\n        <div class="abs-bar-btn">\u5B8C\u6210</div>\n      </div>\n      <div class="text-style-wrapper border-bottom">\n        <div class="style-item text-bold" data-style="fontWeight:800">B</div>\n        <div class="style-item text-italic" data-style="fontStyle:italic">I</div>\n        <div class="style-item through-line" data-style="textDecoration:line-through">abc</div>\n      </div>\n      <div class="text-color-wrapper border-bottom">\n        <div class="color-item color-black" data-color=""></div>\n        <div class="color-item color-gray" data-color="' + COLORS.gray + '"></div>\n        <div class="color-item color-red" data-color="' + COLORS.red + '"></div>\n        <div class="color-item color-yellow" data-color="' + COLORS.yellow + '"></div>\n        <div class="color-item color-green" data-color="' + COLORS.green + '"></div>\n        <div class="color-item color-blue" data-color="' + COLORS.blue + '"></div>\n        <div class="color-item color-purple" data-color="' + COLORS.purple + '"></div>\n      </div>\n      <div class="text-tag-wrapper">\n        <div class="tag-item big-hook" data-tag="h2">\u5927\u6807\u9898</div>\n        <div class="tag-item small-hook" data-tag="h4">\u5C0F\u6807\u9898</div>\n        <div class="tag-item normal-hook" data-tag="p">\u6B63\u6587</div>\n        <div class="tag-item quote-hook" data-tag="blockquote"><b></b>\u5F15\u7528</div>\n        <div class="tag-item unordered-hook" data-tag="ul"><b></b>\u65E0\u5E8F\u5217\u8868</div>\n      </div>\n    ';

      this.linkinput.innerHTML = '\n      <div class="linkinput-wrapper">\n        <div class="linkinput-title">\u6DFB\u52A0\u94FE\u63A5</div>\n        <div class="linkinput-group">\n          <input type="text" class="link-input" name="zxeditorLinkurl" placeholder="http(s)://">\n          <input type="text" class="link-input" name="zxeditorLinkname" placeholder="\u94FE\u63A5\u540D\u79F0(\u9009\u586B)">\n        </div>\n        <div class="linkinput-footer">\n          <button class="cancel-hook">\u53D6\u6D88</button>\n          <button class="submit-hook disabled">\u786E\u5B9A</button>\n        </div>\n      </div>\n    ';

      this.editor.appendChild(this.editbox);
      this.editor.appendChild(this.toolbar);
      this.editor.appendChild(this.textstyle);
      this.editor.appendChild(this.linkinput);
      outerWrapper.appendChild(this.editor);

      this._eventHandle();
    }

    /**
     * 初始化文本框内容及当前光标元素
     * @private
     */

  }, {
    key: '_initContentRang',
    value: function _initContentRang() {
      if (!this.editbox.innerHTML) {
        var p = _domCore2.default.create('p');
        p.innerHTML = '<br>';
        this.rangeElm = p;
        this.editbox.appendChild(p);
        this._setRangePosition();
      }
    }

    /**
     * 显示文字样式设置
     * @private
     */

  }, {
    key: '_textstyleShow',
    value: function _textstyleShow() {
      this.textstyle.style.display = 'block';
      this.editbox.style.marginBottom = TEXT_STYLE_HEIGHT + 'px';
      this.textstyleIsShow = true;
      this._initTextStyleCheck();
      this.scrollToRange();
    }

    /**
     * 隐藏文字样式设置
     * @private
     */

  }, {
    key: '_textstyleHide',
    value: function _textstyleHide() {
      this.textstyle.style.display = 'none';
      this.editbox.style.marginBottom = TOOL_BAR_HEIGHT + 'px';
      this.textstyleIsShow = false;
      this.scrollToRange();
      this._setRangePosition();
    }

    /**
     * 操作事件绑定
     */

  }, {
    key: '_eventHandle',
    value: function _eventHandle() {
      var _this = this;

      // 激活文本编辑框
      this.editbox.addEventListener('click', function (e) {
        _this._initContentRang();
        _this._getRange(function () {
          // this._initTextStyleCheck()
        });
        // 隐藏显示的文字样式设置容器
        if (_this.textstyleIsShow) {
          _this._textstyleHide();
        }
      }, false);

      // 离开编辑输入框时，内容是否为空
      // 为空则添加<br>
      this.editbox.addEventListener('blur', function (e) {
        if (_this.rangeElm && !_this.rangeElm.innerHTML) {
          _this.rangeElm.innerHTML = '<br>';
        }
      }, false);

      // 文本编辑框内容输入
      this.editbox.addEventListener('keyup', function () {
        _this._getRange();
        _this.scrollToRange();
      }, false);

      // 操作工具栏，上传图片、文字样式设置等
      this.toolbar.addEventListener('click', function (e) {
        var el = e.target;
        // 判断内容是否为空，
        // 即用户是否有激活过文本输入框
        _this._initContentRang();

        // 文字
        if (el.hasClass('text-hook')) {
          _this._textstyleShow();
        }

        // 链接
        if (el.hasClass('link-hook')) {
          if (_this.rangeElm.nodeName === 'P') {
            _this.linkinput.style.display = 'flex';
          } else {
            alert('只支持在正文中插入链接！');
          }
        }

        // 分割线
        if (el.hasClass('split-hook')) {
          _domCore2.default.insertHr(_this.rangeElm);
        }

        // 打赏
        if (el.hasClass('reward-hook')) {
          alert('开发中');
        }
      }, false);

      // 文字样式选项控制
      this.textstyle.addEventListener('click', function (e) {
        var el = e.target;
        // 字体标签
        if (el.hasClass('tag-item')) {
          _this._tagnameHandle(el);
        }
        // 字体样式
        if (el.hasClass('style-item')) {
          _this._textStyleHandle(el);
        }
        // 字体颜色
        if (el.hasClass('color-item')) {
          _this._textColorHandle(el);
        }
        // 关闭字体样式设置层
        if (el.hasClass('abs-bar-btn')) {
          _this._textstyleHide(el);
        }
      });

      // 滑动文字样式设置层时，禁用document滑动
      this.textstyle.addEventListener('touchmove', function (e) {
        _domCore2.default.queryAll('body')[0].style.overflow = 'hidden';
      });
      this.textstyle.addEventListener('touchend', function (e) {
        _domCore2.default.queryAll('body')[0].style.overflow = '';
      });

      // 链接：输入容器按钮
      var submitBtn = this.linkinput.querySelector('.submit-hook');
      var cancelBtn = this.linkinput.querySelector('.cancel-hook');
      var linkInputs = this.linkinput.querySelectorAll('input');
      // 确定
      submitBtn.addEventListener('click', function (e) {
        var el = e.target;
        var className = el.className;
        if (el.hasClass('disabled')) return;
        // 创建url，并添加至焦点出
        var linkStr = _domCore2.default.createLinkStr(linkInputs[0].value, linkInputs[1].value);
        // 获取焦点在段落中的位置
        var position = _this.range ? _this.range.startOffset : 0;
        if (_this.rangeElm.nodeName === 'P') {
          _this.rangeElm.innerHTML = _domCore2.default.insertStr(_this.rangeElm.innerText, linkStr, position);
          _this.linkinput.style.display = 'none';
        }
      }, false);
      // 取消
      cancelBtn.addEventListener('click', function () {
        _this.linkinput.style.display = 'none';
      }, false);

      // 链接输入框
      linkInputs[0].addEventListener('keyup', function (e) {
        var val = e.target.value;
        if (_util2.default.isHttpUrl(val)) {
          if (submitBtn.hasClass('disabled')) {
            submitBtn.removeClass('disabled');
          }
        }
      }, false);
    }

    /**
     * 元素文字style样式处理
     * @param el 样式按钮对象
     * @private
     */

  }, {
    key: '_textStyleHandle',
    value: function _textStyleHandle(el) {
      var value = el.getAttribute('data-style');
      var style = value.split(':');
      var key = style[0];
      if (this.rangeElm.style[key] === style[1]) {
        this.rangeElm.style[key] = '';
      } else {
        this.rangeElm.style[key] = style[1];
      }
      this._setRangePosition();
    }

    /**
     * 元素文字Color处理
     * @param el 颜色按钮对象
     * @private
     */

  }, {
    key: '_textColorHandle',
    value: function _textColorHandle(el) {
      var value = el.getAttribute('data-color');
      this.rangeElm.style.color = value;
      el.addClass('active');
      var siblings = _domCore2.default.siblings(el, 'active') || [];
      siblings.forEach(function (item) {
        item.removeClass('active');
      });
      this._setRangePosition();
    }

    /**
     * 标签样式处理
     * @param el 标签按钮对象
     * @private
     */

  }, {
    key: '_tagnameHandle',
    value: function _tagnameHandle(el) {
      var _this2 = this;

      var TAG_ITEMS = {
        'big': 'h2',
        'small': 'h4',
        'normal': 'p',
        'quote': 'blockquote',
        'unordered': 'ul'
      };

      var className = el.className;

      if (el.querySelector('.checked') === null) {
        this._appendCheckedIcon(el);
        // 去掉兄弟节点上的选中符号
        var siblings = _domCore2.default.siblings(el) || [];
        siblings.forEach(function (item) {
          _this2._removeCheckedIcon(item);
        });
        // 给当前焦点元素节点，添加样式
        var tag = 'p';
        var tagMatch = className.match(/\b(\w+?)-hook\b/);
        if (tagMatch && tagMatch[1]) {
          try {
            tag = TAG_ITEMS[tagMatch[1]];
          } catch (e) {}
        }
        // this.log(this.range)
        var newElm = _domCore2.default.changeTagName(this.rangeElm, tag);
        _domCore2.default.insertAfter(this.rangeElm, newElm);
        this.editbox.removeChild(this.rangeElm);
        this.rangeElm = newElm;
        this._setRangePosition(this.rangeElm);
      }
    }

    /**
     * 初始化文字样式选项
     * @private
     */

  }, {
    key: '_initTextStyleCheck',
    value: function _initTextStyleCheck() {
      var _this3 = this;

      if (!this.textstyleIsShow) return;
      // 初始化节点类型 ****************************************
      // 检查当前焦点DOM节点类型
      var tagName = this.rangeElm.tagName.toLowerCase();
      // this.log('this.rangeElm.tagName: ' + tagName)
      var tagList = this.textstyle.querySelectorAll('.tag-item') || [];
      tagList.forEach(function (item) {
        var tag = item.getAttribute('data-tag');
        if (tag === tagName) {
          _this3._appendCheckedIcon(item);
        } else {
          _this3._removeCheckedIcon(item);
        }
      });

      // 初始化文字颜色选 ****************************************
      var color = this.rangeElm.style.color;
      if (/rgb\(/.test(color)) {
        // 十进制转十六进制
        color = _util2.default.rgbToHex(color);
      }
      // 获取颜色选项节点列表
      var colorList = this.textstyle.querySelectorAll('.color-item') || [];
      colorList.forEach(function (item) {
        var tag = item.getAttribute('data-color');
        if (tag === color) {
          item.addClass('active');
        } else {
          item.removeClass('active');
        }
      });
      // 标记焦点位置
      this._setRangePosition();
    }

    /**
     * 添加一个checked图标
     * @param el
     * @private
     */

  }, {
    key: '_appendCheckedIcon',
    value: function _appendCheckedIcon(el) {
      if (el.querySelector('.checked')) return;
      // 字体样式选中符号
      var ICON_CHECKED = _domCore2.default.create('i', { class: 'checked' });
      el.appendChild(ICON_CHECKED);
    }

    /**
     * 移除checked图标
     * @param el
     * @private
     */

  }, {
    key: '_removeCheckedIcon',
    value: function _removeCheckedIcon(el) {
      var checkedNode = el.querySelector('.checked');
      if (checkedNode) el.removeChild(checkedNode);
    }

    /**
     * 创建图片随机id
     * @param prefix id前缀
     * @returns {string}
     * @private
     */

  }, {
    key: '_randId',
    value: function _randId() {
      var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      return 'zxEditor_' + prefix + +new Date();
    }

    /**
     * 添加图片到编辑器中
     * @param src 图片URL地址或base64数据
     */

  }, {
    key: 'addImage',
    value: function addImage(src) {
      var _this4 = this;

      var id = this._randId('img_');
      var img = _domCore2.default.create('img', { src: src, width: '100%', height: 'auto', id: id });
      var p = null;
      if (_domCore2.default.isInnerEmpty(this.rangeElm)) {
        p = this.rangeElm;
        p.innerHTML = '';
      } else {
        p = _domCore2.default.create('p');
        _domCore2.default.insertAfter(this.rangeElm, p);
        this.rangeElm = p;
      }
      p.appendChild(img);

      // 结尾插入的话，新增一段
      if (this.editbox.lastElementChild === p) {
        this._insertEmptyParagraph();
      } else {
        this.rangeElm = p.nextElementSibling;
        this.rangeOffset = 0;
        this._setRangePosition(this.rangeElm);
      }
      // 300毫秒后，文档高度跳转至焦点位置
      var timer = setTimeout(function () {
        _this4.scrollToRange();
        if (timer) clearTimeout(timer);
      }, 300);
    }

    /**
     * 获取光标及当前光标所在的DOM元素节点
     * @private
     */

  }, {
    key: '_getRange',
    value: function _getRange() {
      // 获取选定对象
      this.selection = getSelection();
      // 设置最后光标对象
      this.range = this.selection.getRangeAt(0);
      this.rangeOffset = this.range.startOffset;
      // 当前Node
      var currentNode = this.range.endContainer;
      this.rangeElm = _domCore2.default.closest(currentNode, this.editbox);
    }

    /**
     * 设置或创建光标位置
     * @param el
     * @private
     */

  }, {
    key: '_setRangePosition',
    value: function _setRangePosition(el) {
      var _this5 = this;

      if (this.selection === null) {
        this.selection = getSelection();
        this.range = new Range();
        this.rangeOffset = 0;
      } else {
        // 清除选定对象的所有光标对象
        this.selection.removeAllRanges();
      }
      // 光标移动到到原来的位置加上新内容的长度
      if (el) {
        this.range.setStart(_domCore2.default.getTextNode(el), this.rangeOffset);
      }
      // 光标开始和光标结束重叠
      this.range.collapse(true);

      if (this.rangeTimer) clearTimeout(this.rangeTimer);
      // 延时执行，键盘自动收起后再触发focus
      this.rangeTimer = setTimeout(function () {
        // 插入新的光标对象
        _this5.selection.addRange(_this5.range);
        if (_this5.rangeTimer) clearTimeout(_this5.rangeTimer);
        _this5.rangeTimer = null;
      }, 100);
    }

    /**
     * 插入空行
     * @private
     */

  }, {
    key: '_insertEmptyParagraph',
    value: function _insertEmptyParagraph() {
      var p = _domCore2.default.create('p');
      p.innerHTML = '<br>';
      this.editbox.appendChild(p);
      this.rangeElm = p;
      this.rangeOffset = 0;
      this._setRangePosition(p);
    }

    /**
     * 滚动至顶部
     */

  }, {
    key: 'scrollToTop',
    value: function scrollToTop() {
      var winHeight = window.innerHeight;
      _scroll2.default.to(0, _scroll2.default.height() - winHeight);
    }

    /**
     * 滚动至焦点可视区域
     */

  }, {
    key: 'scrollToRange',
    value: function scrollToRange() {
      var winHeight = window.innerHeight;
      var scrollTop = _scroll2.default.top();
      var rect = this.rangeElm.getBoundingClientRect();
      // fixed(ToolBar 或者 TEXT样式设置)层的高度
      var fixedHeight = this.textstyleIsShow ? TEXT_STYLE_HEIGHT : TOOL_BAR_HEIGHT;
      var scrollPostion = rect.bottom - (winHeight - fixedHeight);

      if (scrollPostion > 0) {
        _scroll2.default.to(0, scrollTop + scrollPostion);
      } else if (rect.top < 0) {
        _scroll2.default.to(0, scrollTop + rect.top);
      }
    }

    /**
     * 将image base64数据，转化为Bolb原始文件数
     * @param base64Data
     * @returns {*}
     */

  }, {
    key: 'toBlobData',
    value: function toBlobData(base64Data) {
      // base64数据格式:
      // "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAkGB+wgHBgkIBwgKCgkLDRYPDQw//9k="
      var type = void 0,
          onlyData = void 0;
      if (/^data:(\w+\/\w+);base64,(.+)/) {
        type = RegExp.$1;
        onlyData = RegExp.$2;
      } else {
        (0, _debug.error)('toBlobData(data), params\'data is not base64 data!');
        return null;
      }

      var data = window.atob(onlyData);
      var ia = new Uint8Array(data.length);
      for (var i = 0; i < data.length; i++) {
        ia[i] = data.charCodeAt(i);
      }
      return new Blob([ia], { type: type });
    }

    /**
     * 获取正文中的base64图片
     * @returns {Array}
     */

  }, {
    key: 'getBase64Images',
    value: function getBase64Images() {
      var arr = [];
      var imgs = this.editbox.querySelectorAll('img');
      for (var i = 0; i < imgs.length; i++) {
        var img = imgs[i];
        if (/^data:.+?;base64,/.test(img.src)) {
          arr.push({
            id: img.id,
            data: img.src
          });
        }
      }
      return arr;
    }

    /**
     * 设置指定id图片src
     * @param id
     * @param src
     * @returns {boolean}
     */

  }, {
    key: 'setImageSrc',
    value: function setImageSrc(id, src) {
      var img = this.editbox.querySelector('#' + id);
      if (img) {
        img.src = src;
        return true;
      }
      return false;
    }

    /**
     * 获取正文内容(html代码)
     */

  }, {
    key: 'getContent',
    value: function getContent() {
      return this.editbox.innerHTML;
    }
  }]);

  return ZxEditor;
}();

exports.ZxEditor = ZxEditor;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(2);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/_css-loader@0.28.9@css-loader/index.js??ref--1-1!../../node_modules/_postcss-loader@2.0.10@postcss-loader/lib/index.js??postcss!../../node_modules/_stylus-loader@3.0.1@stylus-loader/index.js??ref--1-3!./zx-editor.styl", function() {
			var newContent = require("!!../../node_modules/_css-loader@0.28.9@css-loader/index.js??ref--1-1!../../node_modules/_postcss-loader@2.0.10@postcss-loader/lib/index.js??postcss!../../node_modules/_stylus-loader@3.0.1@stylus-loader/index.js??ref--1-3!./zx-editor.styl");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, ".border-bottom:after{position:absolute;bottom:0;left:0;width:100%;content:'';border-top:1px solid #eee;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.zxeditor-container{display:block;margin:0;padding:0;width:100%;min-height:200px;}.zxeditor-container *{margin:0;padding:0;color:#555;-webkit-box-sizing:border-box;box-sizing:border-box}.zxeditor-container .zxeditor-content-wrapper{width:100%;min-height:200px;overflow:hidden;outline:none;}.zxeditor-container .zxeditor-content-wrapper p,.zxeditor-container .zxeditor-content-wrapper h1,.zxeditor-container .zxeditor-content-wrapper h2,.zxeditor-container .zxeditor-content-wrapper h3,.zxeditor-container .zxeditor-content-wrapper h4,.zxeditor-container .zxeditor-content-wrapper li{line-height:1.5em;padding:10px 0}.zxeditor-container .zxeditor-content-wrapper h2{font-size:1.2em;font-weight:800 !important}.zxeditor-container .zxeditor-content-wrapper h4{font-weight:800 !important}.zxeditor-container .zxeditor-content-wrapper blockquote{display:inline-block;padding-left:1em;border-left:3px solid #d0d0d0}.zxeditor-container .zxeditor-content-wrapper ul{padding-left:20px;list-style:disc}.zxeditor-container .zxeditor-content-wrapper li,.zxeditor-container .zxeditor-content-wrapper p{color:inherit}.zxeditor-container .zxeditor-content-wrapper hr{margin:0 20%;border:0;border-top:1px dashed #d0d0d0}.zxeditor-container .zxeditor-toolbar-wrapper{display:-webkit-box;display:-ms-flexbox;display:flex;position:fixed;z-index:9999;left:0;bottom:0;width:100%;height:48px;background-color:#fff;}.zxeditor-container .zxeditor-toolbar-wrapper:after{position:absolute;top:0;left:0;width:100%;content:'';border-top:1px solid #d0d0d0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.zxeditor-container .zxeditor-toolbar-wrapper .toolbar-item{-webkit-box-flex:1;-ms-flex:1;flex:1;height:48px;line-height:48px;text-align:center}.zxeditor-container .zxeditor-textstyle-wrapper{position:fixed;z-index:10000;left:0;bottom:0;width:100%;height:260px;background-color:#fff;overflow-y:auto;}.zxeditor-container .zxeditor-textstyle-wrapper .abs-bar-wrapper{position:fixed;z-index:1;bottom:212px;left:0;width:100%;height:48px;background-color:#eee;border-top:1px solid #d0d0d0;border-bottom:1px solid #d0d0d0;-webkit-box-sizing:border-box;box-sizing:border-box;}.zxeditor-container .zxeditor-textstyle-wrapper .abs-bar-wrapper .abs-bar-title{position:relative;line-height:48px;text-align:center;font-size:1.2em}.zxeditor-container .zxeditor-textstyle-wrapper .abs-bar-wrapper .abs-bar-btn{position:absolute;top:0;right:0;width:64px;height:48px;line-height:48px;text-align:center;color:#14b2e0;font-size:1em}.zxeditor-container .zxeditor-textstyle-wrapper .text-style-wrapper{position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;margin-top:48px;height:50px;}.zxeditor-container .zxeditor-textstyle-wrapper .text-style-wrapper .style-item{position:relative;-webkit-box-flex:1;-ms-flex:1;flex:1;line-height:50px;text-align:center;font-size:1.5em;}.zxeditor-container .zxeditor-textstyle-wrapper .text-style-wrapper .style-item:nth-child(2):before{position:absolute;top:0;left:0;height:50px;content:'';border-left:1px solid #eee;-webkit-transform:scaleX(.5);transform:scaleX(.5)}.zxeditor-container .zxeditor-textstyle-wrapper .text-style-wrapper .style-item:nth-child(2):after{position:absolute;top:0;right:0;height:50px;content:'';border-right:1px solid #eee;-webkit-transform:scaleX(.5);transform:scaleX(.5)}.zxeditor-container .zxeditor-textstyle-wrapper .text-style-wrapper .style-item.text-bold{font-weight:800}.zxeditor-container .zxeditor-textstyle-wrapper .text-style-wrapper .style-item.text-italic{font-style:italic !important}.zxeditor-container .zxeditor-textstyle-wrapper .text-style-wrapper .style-item.through-line{text-decoration:line-through !important}.zxeditor-container .zxeditor-textstyle-wrapper .text-color-wrapper{display:-webkit-box;display:-ms-flexbox;display:flex;position:relative;height:50px;}.zxeditor-container .zxeditor-textstyle-wrapper .text-color-wrapper .color-item{-webkit-box-flex:1;-ms-flex:1;flex:1;position:relative;height:50px;}.zxeditor-container .zxeditor-textstyle-wrapper .text-color-wrapper .color-item:before{position:absolute;top:50%;left:50%;margin:-14px 0 0 -14px;width:28px;height:28px;border-radius:50%;content:''}.zxeditor-container .zxeditor-textstyle-wrapper .text-color-wrapper .color-item:after{position:absolute;top:50%;left:50%;margin:-17px 0 0 -17px;width:34px;height:34px;border-radius:50%;-webkit-box-sizing:border-box;box-sizing:border-box;content:''}.zxeditor-container .zxeditor-textstyle-wrapper .text-color-wrapper .color-black:before{background-color:#555}.zxeditor-container .zxeditor-textstyle-wrapper .text-color-wrapper .color-gray:before{background-color:#d0d0d0}.zxeditor-container .zxeditor-textstyle-wrapper .text-color-wrapper .color-red:before{background-color:#ff583d}.zxeditor-container .zxeditor-textstyle-wrapper .text-color-wrapper .color-yellow:before{background-color:#fdaa25}.zxeditor-container .zxeditor-textstyle-wrapper .text-color-wrapper .color-green:before{background-color:#44c67b}.zxeditor-container .zxeditor-textstyle-wrapper .text-color-wrapper .color-blue:before{background-color:#14b2e0}.zxeditor-container .zxeditor-textstyle-wrapper .text-color-wrapper .color-purple:before{background-color:#b065e2}.zxeditor-container .zxeditor-textstyle-wrapper .text-color-wrapper .active.color-black:after{border:1px solid #555}.zxeditor-container .zxeditor-textstyle-wrapper .text-color-wrapper .active.color-gray:after{border:1px solid #d0d0d0}.zxeditor-container .zxeditor-textstyle-wrapper .text-color-wrapper .active.color-red:after{border:1px solid #ff583d}.zxeditor-container .zxeditor-textstyle-wrapper .text-color-wrapper .active.color-yellow:after{border:1px solid #fdaa25}.zxeditor-container .zxeditor-textstyle-wrapper .text-color-wrapper .active.color-green:after{border:1px solid #44c67b}.zxeditor-container .zxeditor-textstyle-wrapper .text-color-wrapper .active.color-blue:after{border:1px solid #14b2e0}.zxeditor-container .zxeditor-textstyle-wrapper .text-color-wrapper .active.color-purple:after{border:1px solid #b065e2}.zxeditor-container .zxeditor-textstyle-wrapper .text-tag-wrapper{border-top:5px solid #eee;}.zxeditor-container .zxeditor-textstyle-wrapper .text-tag-wrapper .tag-item{position:relative;margin:0 20px;height:48px;line-height:48px;text-align:center;}.zxeditor-container .zxeditor-textstyle-wrapper .text-tag-wrapper .tag-item:after{position:absolute;bottom:0;left:0;width:100%;content:'';border-top:1px solid #eee;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.zxeditor-container .zxeditor-textstyle-wrapper .text-tag-wrapper .tag-item:last-child:after{border-top:0}.zxeditor-container .zxeditor-textstyle-wrapper .text-tag-wrapper .tag-item > b{position:relative;display:inline-block;vertical-align:top;margin-right:8px;width:20px;height:48px;text-align:right;}.zxeditor-container .zxeditor-textstyle-wrapper .text-tag-wrapper .tag-item > b:after{display:inline-block}.zxeditor-container .zxeditor-textstyle-wrapper .text-tag-wrapper .tag-item.big-hook{font-size:1.2em;font-weight:800 !important}.zxeditor-container .zxeditor-textstyle-wrapper .text-tag-wrapper .tag-item.small-hook{font-weight:800 !important}.zxeditor-container .zxeditor-textstyle-wrapper .text-tag-wrapper .tag-item.quote-hook b:after{font-size:2em;content:'\"';margin-top:8px}.zxeditor-container .zxeditor-textstyle-wrapper .text-tag-wrapper .tag-item.unordered-hook b:after{font-size:1.5em;content:'\\B7'}.zxeditor-container .zxeditor-textstyle-wrapper .text-tag-wrapper .tag-item i.checked{display:inline-block;position:absolute;z-index:1;top:18px;right:30px;width:16px;height:8px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);}.zxeditor-container .zxeditor-textstyle-wrapper .text-tag-wrapper .tag-item i.checked:before,.zxeditor-container .zxeditor-textstyle-wrapper .text-tag-wrapper .tag-item i.checked:after{display:inline-block;position:absolute;background-color:#14b2e0;content:''}.zxeditor-container .zxeditor-textstyle-wrapper .text-tag-wrapper .tag-item i.checked:before{top:0;left:0;width:2px;height:8px}.zxeditor-container .zxeditor-textstyle-wrapper .text-tag-wrapper .tag-item i.checked:after{bottom:0;left:0;width:14px;height:2px}.zxeditor-container .zxeditor-linkinput-wrapper{display:-webkit-box;display:-ms-flexbox;display:flex;position:fixed;z-index:10001;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,0.4);-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}.zxeditor-container .zxeditor-linkinput-wrapper .linkinput-wrapper{width:80%;background-color:#fefefe;border-radius:4px;overflow:hidden;}.zxeditor-container .zxeditor-linkinput-wrapper .linkinput-wrapper .linkinput-title{height:3.5em;line-height:3.5em;text-align:center}.zxeditor-container .zxeditor-linkinput-wrapper .linkinput-wrapper .linkinput-group{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;margin:0 10px;border:1px solid #eee;border-radius:3px;background-color:#fff;-webkit-box-sizing:border-box;box-sizing:border-box;}.zxeditor-container .zxeditor-linkinput-wrapper .linkinput-wrapper .linkinput-group .link-input{position:relative;display:block;margin:0 5px;height:40px;line-height:40px;border:0;outline:none;}.zxeditor-container .zxeditor-linkinput-wrapper .linkinput-wrapper .linkinput-group .link-input:first-child{border-bottom:1px solid #eee}.zxeditor-container .zxeditor-linkinput-wrapper .linkinput-wrapper .linkinput-group .link-input::-webkit-input-placeholder{color:#d0d0d0}.zxeditor-container .zxeditor-linkinput-wrapper .linkinput-wrapper .linkinput-group .link-input:-ms-input-placeholder{color:#d0d0d0}.zxeditor-container .zxeditor-linkinput-wrapper .linkinput-wrapper .linkinput-group .link-input::-ms-input-placeholder{color:#d0d0d0}.zxeditor-container .zxeditor-linkinput-wrapper .linkinput-wrapper .linkinput-group .link-input::placeholder{color:#d0d0d0}.zxeditor-container .zxeditor-linkinput-wrapper .linkinput-wrapper .linkinput-footer{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;margin:1em 10px;}.zxeditor-container .zxeditor-linkinput-wrapper .linkinput-wrapper .linkinput-footer button{display:inline-block;height:40px;line-height:40px;width:47%;text-align:center;background-color:#fff;border:1px solid #eee;border-radius:3px;letter-spacing:2px;-webkit-box-sizing:border-box;box-sizing:border-box;}.zxeditor-container .zxeditor-linkinput-wrapper .linkinput-wrapper .linkinput-footer button.disabled{color:#eee}", ""]);

// exports


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(5);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Create by zx1984
 * 2018/1/24 0024.
 * https://github.com/zx1984
 */
exports.default = {
  // 转换为整数
  int: function int(n) {
    var num = parseInt(n);
    return isNaN(num) ? 0 : num;
  },
  trim: function trim(str) {
    return str ? str.toString().replace(/^\s+|\s+$/g, '') : '';
  },

  // 十进制转十六进制
  toHex: function toHex(num) {
    var HEX_CODE = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    var hex = [];
    // 余数
    var surplus = 0;
    // 商
    var quotient = num;
    do {
      surplus = HEX_CODE[quotient % 16];
      hex.unshift(surplus);
      quotient = Math.floor(quotient / 16);
    } while (quotient);

    return hex.length === 1 ? '0' + hex[0] : hex.join('');
  },

  // rgb(68, 198, 123)
  rgbToHex: function rgbToHex(rgb) {
    var hex = '';
    if (/rgb\((\d+)\D+?(\d+)\D+?(\d+)/.test(rgb)) {
      hex += this.toHex(RegExp.$1);
      hex += this.toHex(RegExp.$2);
      hex += this.toHex(RegExp.$3);
    }
    return hex ? '#' + hex : rgb;
  },

  // 是否为http(s)链接
  isHttpUrl: function isHttpUrl(url) {
    return url && /^(http|https):\/\//i.test(url.toString());
  }
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Create by zx1984
 * 2018/1/23 0023.
 * https://github.com/zx1984
 */
// 添加样式
HTMLElement.prototype.addClass = function (className) {
  this.classList.add(className);
};
// 删除样式
HTMLElement.prototype.removeClass = function (className) {
  this.classList.remove(className);
};

// 包含某个样式
HTMLElement.prototype.hasClass = function (className) {
  var reg = new RegExp('\\b(' + className + ')\\b');
  return className && reg.test(this.className);
};

exports.default = {
  /**
   * 创建DOM元素
   * @param tag 标签名称
   * @param opts 标签属性
   * @returns {Element}
   */
  create: function create() {
    var tag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
    var opts = arguments[1];

    var elm = document.createElement(tag);
    if (opts && opts instanceof Object) {
      for (var key in opts) {
        if (opts.hasOwnProperty(key)) {
          elm.setAttribute(key, opts[key]);
        }
      }
    }
    return elm;
  },


  /**
   * 设置已有DOM节点的标签（实际是改变DOM节点标签）
   * @param oldElm DOM节点对象
   * @param newTagName 新标签名称
   * @returns {Element}
   */
  changeTagName: function changeTagName(oldElm, newTagName) {
    if (!newTagName || oldElm.nodeName === newTagName.toUpperCase()) {
      return oldElm;
    }
    // 新的dom对象
    var el = this.create(newTagName);
    // 获取元素class/id/style属性，并赋予新DOM对象
    var className = oldElm.className;
    var id = oldElm.id;
    // 是否有自定义style样式
    var style = oldElm.getAttribute('style');

    // innerHTML
    // let innerHTML = oldElm.innerHTML
    // innerText
    var innerText = oldElm.innerText;
    // blockquote
    if (newTagName === 'blockquote') {
      innerText = '<p style="color: inherit">' + innerText + '</p>';
    } else if (newTagName === 'ul') {
      innerText = '<li style="color: inherit">' + innerText + '</li>';
    }

    if (className) el.className = className;
    if (id) el.id = id;
    if (style) el.setAttribute('style', style);

    el.innerHTML = innerText;
    return el;
  },


  /**
   * 查找当前元素节点(textNode、ElemNode等)，在context内的父根节点
   * @param currentNode 当前DOM节点
   * @param targetParent
   * @returns {*}
   */
  closest: function closest(currentNode, context) {
    var parentNode = void 0;
    do {
      parentNode = currentNode.parentNode;
      if (parentNode === context) {
        parentNode = null;
        break;
      } else {
        currentNode = parentNode;
      }
    } while (parentNode);
    return currentNode;
  },


  /**
   * 判断元素innerText是否为空
   * 如果元素内存在hr分割线，则不为空
   * @param el
   * @returns {boolean}
   */
  isInnerEmpty: function isInnerEmpty(el) {
    return !el.innerHTML || el.innerHTML === '<br>';
    // return !el.innerText.replace(/&nbsp;|\s/ig, '') && !el.querySelectorAll('hr')[0] && !el.querySelectorAll('img')[0]
  },


  /**
   * 对象是否为HTML元素节点对象
   * @param obj
   * @returns {Function}
   */
  // isHTMLElement (obj) {
  //   return (typeof HTMLElement === 'object') ?
  //     function (obj) {
  //       return obj instanceof HTMLElement
  //     } :
  //     function (obj) {
  //       return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string'
  //     }
  // },

  /**
   * dom节点选择器
   * @param selector 元素id、class、属性等
   * @param context 作用域，默认为documet
   * @returns {*}
   */
  query: function query(selector) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

    return context.querySelector(selector);
  },
  queryAll: function queryAll(selector) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

    return context.querySelectorAll(selector);
  },


  /**
   * 在当前元素节点el后插入新节点newNode
   * @param el 当前元素节点
   * @param newNode 要插入的新元素节点
   */
  insertAfter: function insertAfter(el, newNode) {
    var nextNode = el.nextElementSibling;
    var parentNode = el.parentNode;
    if (nextNode === null) {
      parentNode.appendChild(newNode);
    } else {
      parentNode.insertBefore(newNode, nextNode);
    }
  },


  /**
   * 查找元素节点el的兄弟节点
   * @param el
   * @param 可选参数，className兄弟节点包含的样式名
   * @returns {*}
   */
  siblings: function siblings(el, className) {
    var arr = [];
    var elmNodes = [];
    var siblings = el.parentNode.childNodes;
    // 只取元素节点
    siblings.forEach(function (item) {
      if (item.nodeType === 1 && item !== el) {
        elmNodes.push(item);
      }
    });

    if (className) {
      var reg = new RegExp('\\b(' + className + ')\\b');
      elmNodes.forEach(function (item) {
        if (reg.test(item.className)) {
          arr.push(item);
        }
      });
    } else {
      arr = elmNodes;
    }
    return arr.length ? arr : null;
  },


  /**
   * 创建a标签链接字符串
   * @param url 链接地址
   * @param name 链接名称
   * @returns {string}
   */
  createLinkStr: function createLinkStr(url, name) {
    if (!url) return '';
    url = url + '';
    name = name || (url.length > 20 ? url.substr(0, 20) + '...' : url);
    return '<a href="' + url + '" target="_blank" alt="' + name + '">' + name + '</a>';
  },


  /**
   * 往字符串中插入字符串
   * @param str 原字符串
   * @param insertString 需要插入的字符串
   * @param position 插入位置
   * @returns {string}
   */
  insertStr: function insertStr(str, insertString, position) {
    return str.substring(0, position) + insertString + str.substring(position);
  },


  /**
   * 元素后面插入分割线
   * @param el
   */
  insertHr: function insertHr(el) {
    var p = this.isInnerEmpty(el) ? el : this.create('p');
    p.innerHTML = '<hr>';
    this.insertAfter(el, p);
  },


  // 获取当前元素节点最近的文本节点
  getTextNode: function getTextNode(el) {
    while (el && el.nodeType === 1) {
      // 当el.childNodes[0] == <br>时，不能继续获取childNode
      if (el.childNodes[0]) {
        el = el.childNodes[0];
      } else {
        break;
      }
    }
    return el;
  }
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by zx1984 2018/3/21
 * https://github.com/zx1984
 */
exports.default = {
  top: function top() {
    return window.pageYOffset !== undefined ? window.pageYOffset : document.documentElement.scrollTop || document.body.scrollTop;
  },
  height: function height() {
    return (document.documentElement || document.body).scrollHeight;
  },
  to: function to(x, y) {
    (document.documentElement || document.body.parentNode || document.body).scrollTo(x, y);
  },
  left: function left() {
    return window.pageXOffset !== undefined ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
  }
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log = log;
exports.error = error;
/**
 * Created by zx1984 2018/3/21
 * https://github.com/zx1984
 */

function log() {
  for (var i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
  }
}

function error() {
  for (var i = 0; i < arguments.length; i++) {
    console.error(arguments[i]);
  }
}

/***/ })
/******/ ]);
});