/*!
 * zx-editor v3.1.0
 * https://github.com/capricorncd/zx-editor
 * Released under the MIT License
 * Released on: Sun May 08 2022 17:06:00 GMT+0900 (Japan Standard Time)
 * Copyright © 2018-present, capricorncd
 */
/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/05 14:47:02 (GMT+0900)
 */
/**
 * to snake case
 * helloWorld => hello-world
 * helloWorld => hello_world
 * helloWorld => hello world
 * @param str
 * @param connectSymbol word connect symbol
 */
const toSnakeCase = (str, connectSymbol = '-') => {
    return str.replace(/[A-Z]/g, (s) => `${connectSymbol}${s.toLowerCase()}`);
};
/**
 * to camel case
 * hello_world => helloWorld
 * hello-world => helloWorld
 * hello world => helloWorld
 * @param str
 */
// export const toCamelCase = (str: string): string => {
//   return str.replace(/[-_\s](\w)/g, (_, s) => s.toUpperCase())
// }
const slice = (arrLike, offset = 0) => {
    return Array.prototype.slice.call(arrLike, offset);
};

/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/05 11:55:07 (GMT+0900)
 */
const CLASS_NAME_EDITOR = 'zx-editor';
const CLASS_NAME_CONTENT = 'zx-editor-content-wrapper';

const DEF_OPTIONS = {
    // 内容是否可以被编辑
    editable: true,
    // 编辑器输入内容绝对定位
    // fixed: false,
    // editor min height
    minHeight: '50vh',
    // style
    placeholder: 'Enter...',
    placeholderColor: '',
    lineHeight: 1.5,
    // paragraph tail spacing, default 10px
    // paragraphTailSpacing: '',
    caretColor: '',
    textColor: '',
    // iphone会自动移动，难控制
    // 光标所在行距页面顶部的距离30px
    cursorOffsetTop: 30,
    // 自定义粘贴处理函数
    customPasteHandler: undefined,
    /**
     * ******************************
     * toolbar options
     * ******************************
     */
    // Has the toolbar been fixed?
    toolbarBeenFixed: true,
    toolbarHeight: 50,
    // buttons name, and order
    toolbarButtons: ['select-picture', 'text-style'],
    /**
     * ******************************
     * image options
     * ******************************
     */
    // customize Picture Handler
    // customPictureHandler: undefined,
    // image max width
    imageMaxWidth: 720,
    // image max size, unit Kib, default 20M
    imageMaxSize: 20480,
    // template
    imageSectionTemp: `<section class="child-is-picture"><img src="{url}" loading="lazy"></section>`,
    // GIF pictures are not processed
    ignoreGif: true,
    // Force the width/height of the picture, even if the width/height of the picture
    // is smaller than the target width/height
    forceImageResize: false,
    /**
     * ******************************
     * text style options
     * ******************************
     */
    // text style, value ['#333', '#f00', ...]
    // textStyleColors: undefined,
    textStyleTitle: 'Set Style',
    textStyleHeadLeftBtnText: 'Clear style',
    textStyleHeadAlign: 'center',
    /**
     * ******************************
     * color options
     * ******************************
     */
    mainColor: '',
    // border color
    borderColor: '',
};

/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/05 10:32:12 (GMT+0900)
 */
const NODE_NAME_SECTION = 'SECTION';
const NODE_NAME_BR = 'BR';

/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/05 10:55:25 (GMT+0900)
 */
const REPLACE_NODE_LIST = [
    'DIV', 'P', 'ARTICLE', 'ASIDE', 'DETAILS',
    // 'SUMMARY',
    'FOOTER', 'HEADER', 'MAIN', 'NAV',
];
const $ = (selector, doc = document) => {
    if (selector instanceof HTMLElement)
        return selector;
    return doc.querySelector(selector);
};
// export const $$ = <T extends HTMLElement>(selector: string, doc: Document | HTMLElement = document): T[] => {
//   return Array.prototype.slice.call(doc.querySelectorAll(selector), 0)
// }
const createElement = (tag, attrs = {}, innerHTML) => {
    const el = document.createElement(tag);
    for (const [key, val] of Object.entries(attrs)) {
        el.setAttribute(key, val);
    }
    if (innerHTML)
        el.innerHTML = innerHTML;
    return el;
};
const createStyles = (data) => {
    const arr = [];
    for (const [key, value] of Object.entries(data)) {
        arr.push(`${toSnakeCase(key)}:${value}`);
    }
    return arr.join(';');
};
const replace = (input, oldNodeName, newNodeName) => {
    return input.replace(RegExp("(^<" + oldNodeName + ")|(" + oldNodeName + ">$)", "gi"), (match) => match.toUpperCase().replace(oldNodeName, newNodeName.toLowerCase()));
};
/**
 *
 * @param input
 * @param tagName
 */
const changeNodeName = (input, tagName = NODE_NAME_SECTION) => {
    const oldNodeName = input.nodeName;
    const newNodeName = tagName.toUpperCase();
    if (oldNodeName === newNodeName)
        return input;
    const el = createElement(tagName);
    const parent = input.parentElement;
    if (REPLACE_NODE_LIST.includes(oldNodeName)) {
        el.innerHTML = replace(input.outerHTML, oldNodeName, newNodeName);
        parent?.replaceChild(el.firstChild, input);
        return el.firstChild;
    }
    el.append(input.cloneNode(true));
    parent?.replaceChild(el, input);
    return el;
};
/**
 * is <br> section
 * <section><br></section>
 * @param el
 */
const isBrSection = (el) => {
    if (!el)
        return false;
    const nodes = slice(el.childNodes);
    return nodes.length === 1 && nodes[0].nodeName === 'BR';
};

/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/07 10:33:02 (GMT+0900)
 */
class CursorClass {
    rootElement;
    selection;
    range;
    timer;
    constructor(rootElement) {
        this.rootElement = rootElement;
        this.selection = window.getSelection();
        this.range = this.selection ? this.selection.getRangeAt(0) : new Range();
        this.timer = null;
        // init range
        const el = rootElement.lastElementChild;
        if (el) {
            this.setRange(el, el.textContent?.length);
        }
    }
    setRange(el, offset = 0) {
        // remove all range object
        if (this.selection)
            this.selection.removeAllRanges();
        // el: '<section>inner text.</section>'
        let targetNode = el.childNodes[el.childNodes.length - 1] || el;
        // check img/video/audio
        // console.log(targetNode.nodeName, this.offset)
        if (/IMG|VIDEO|AUDIO/.test(targetNode.nodeName)) {
            offset = 1;
            // get parentNode, can't set offset = 1 of IMG node.
            targetNode = targetNode.parentNode;
        }
        this.range.setStart(targetNode, offset);
        // cursor start and end position is collapse
        this.range.collapse(true);
        this._clearTimeout();
        // 延时执行，键盘自动收起后再触发focus
        this.timer = setTimeout(() => {
            // 插入新的光标对象
            this.selection?.addRange(this.range);
        }, 100);
    }
    _clearTimeout() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }
    getCurrentNode() {
        this.range = this.selection ? this.selection.getRangeAt(0) : new Range();
        let currentNode = this.range.endContainer;
        while (this.rootElement !== currentNode) {
            if (currentNode.parentElement === this.rootElement) {
                return currentNode;
            }
            else {
                currentNode = currentNode.parentNode;
            }
        }
        return this.rootElement.lastElementChild;
    }
}

class EventEmitter {
    eventList;
    constructor() {
        this.eventList = {};
    }
    /**
     * on
     * @param eventName
     * @param fn
     */
    on(eventName, fn) {
        if (!eventName || !fn || typeof fn !== 'function')
            return;
        if (!this.eventList[eventName]) {
            this.eventList[eventName] = [];
        }
        this.eventList[eventName].push(fn);
    }
    /**
     * emit
     * @param eventName
     * @param args
     */
    emit(eventName, ...args) {
        const fnList = this.eventList[eventName];
        if (!fnList)
            return;
        for (let i = 0; i < fnList.length; i++) {
            try {
                fnList[i].apply(null, args);
            }
            catch (e) {
                this.emit('error', e, 'emit');
            }
        }
    }
    /**
     * off
     * @param eventName
     * @param fn
     */
    off(eventName, fn) {
        if (!this.eventList[eventName])
            return;
        const eventList = this.eventList[eventName];
        if (typeof fn === 'function') {
            const index = eventList.findIndex(item => item === fn);
            if (index >= 0)
                eventList.splice(index, 1);
        }
        else {
            this.eventList[eventName].length = 0;
        }
        this._removeEmpty(eventName);
    }
    /**
     * remove empty event list
     * @param eventName
     * @private
     */
    _removeEmpty(eventName) {
        if (!this.eventList[eventName].length) {
            delete this.eventList[eventName];
        }
    }
    destroyEventEmitter() {
        Object.keys(this.eventList).forEach((key => this.off(key)));
    }
}

/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/05 11:07:32 (GMT+0900)
 */
/**
 * init editor dom
 */
const initEditorDom = () => {
    const el = createElement('div', {
        class: CLASS_NAME_EDITOR,
    });
    return el;
};
/**
 * init content dom
 * @param options
 */
const initContentDom = (options) => {
    const contentStyles = {
        lineHeight: options.lineHeight,
        minHeight: options.minHeight,
        position: 'relative',
        overflowY: 'scroll',
        outline: 'none',
        // 用户自定义样式优先
        ...options.styles,
    };
    if (options.caretColor)
        contentStyles.caretColor = options.caretColor;
    if (options.textColor)
        contentStyles.color = options.textColor;
    const contentAttrs = {
        class: `${CLASS_NAME_CONTENT} is-empty`,
        style: createStyles(contentStyles),
    };
    if (options.editable)
        contentAttrs.contenteditable = 'true';
    const el = createElement('div', contentAttrs);
    el.innerHTML = `<section><br></section>`;
    // return
    return el;
};

/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/05 10:29:43 (GMT+0900)
 */
class ZxEditor extends EventEmitter {
    $wrapper;
    version;
    options;
    $editor;
    $content;
    cursor;
    _contentEvent;
    constructor(selector, options) {
        super();
        if (!(this instanceof ZxEditor)) {
            throw new Error('ZxEditor is a constructor and should be called with the `new` keyword');
        }
        /**
         * ***************************************************
         * check selector
         * ***************************************************
         */
        const container = $(selector);
        if (!container) {
            throw new Error(`Can't found '${selector}' Node in document!`);
        }
        this.$wrapper = container;
        // version
        this.version = '3.1.0';
        console.log(this.version);
        this.options = {
            ...DEF_OPTIONS,
            ...options,
        };
        this.$content = initContentDom(this.options);
        this.$editor = initEditorDom();
        this.$editor.append(this.$content);
        this.$wrapper.append(this.$editor);
        this.$content.focus();
        this.cursor = new CursorClass(this.$content);
        this._contentEvent = (e) => {
            const type = e.type;
            if (type === 'blur')
                this._lastLine();
            this.emit(type === 'input' ? 'change' : type, e);
        };
        this._initEvents();
    }
    _initEvents() {
        this.$content.addEventListener('focus', this._contentEvent);
        this.$content.addEventListener('blur', this._contentEvent);
        this.$content.addEventListener('input', this._contentEvent);
    }
    /**
     * use
     * @param plugin
     */
    use(plugin) {
        if (typeof plugin.install === 'function') {
            plugin.install(this);
        }
    }
    /**
     * plugin
     * @param fn
     */
    plugin(fn) {
        if (typeof fn === 'function')
            fn.call(this);
    }
    setHtml(html) {
        this.$content.innerHTML = '';
        this.insert(html);
        this._lastLine();
    }
    getHtml() {
        return this.$content.innerHTML.replace(/<section><br><\/section>$/, '');
    }
    /**
     * Node.nodeType
     * ELEMENT_NODE  1
     * ATTRIBUTE_NODE  2
     * TEXT_NODE  3
     * CDATA_SECTION_NODE  4
     * PROCESSING_INSTRUCTION_NODE  7
     * COMMENT_NODE  8
     * DOCUMENT_NODE  9
     * DOCUMENT_TYPE_NODE  10
     * DOCUMENT_FRAGMENT_NODE  11
     * @param input
     */
    insert(input) {
        if (input instanceof HTMLElement) {
            this._insert(input);
        }
        else {
            const el = createElement('div');
            el.innerHTML = input;
            slice(el.childNodes).forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    if (node.nodeName === NODE_NAME_BR) {
                        this._insert(createElement(NODE_NAME_SECTION, {}, '<br/>'));
                    }
                    else {
                        this._insert(node);
                    }
                }
                else if (node.textContent) {
                    this._insert(createElement(NODE_NAME_SECTION, {}, node.textContent));
                }
            });
        }
    }
    _insert(input) {
        console.log(input);
        const currentSection = this.cursor.getCurrentNode();
        if (currentSection) {
            if (isBrSection(currentSection)) {
                this.$content.insertBefore(input, currentSection);
            }
            else {
                this.$content.insertBefore(input, currentSection.nextElementSibling);
            }
        }
        else {
            this.$content.append(input);
        }
        changeNodeName(input, NODE_NAME_SECTION);
    }
    _lastLine() {
        if (!isBrSection(this.$content.lastElementChild)) {
            this.$content.appendChild(createElement('section', {}, '<br>'));
        }
    }
    destroy() {
        this.$content.removeEventListener('focus', this._contentEvent);
        this.$content.removeEventListener('blur', this._contentEvent);
        this.$content.removeEventListener('input', this._contentEvent);
        this.destroyEventEmitter();
    }
}

export { ZxEditor };
//# sourceMappingURL=zx-editor.esm.js.map
