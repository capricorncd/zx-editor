/*!
 * zx-editor v3.1.0
 * https://github.com/capricorncd/zx-editor
 * Released under the MIT License
 * Released on: Sat May 14 2022 11:56:12 GMT+0900 (Japan Standard Time)
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
const toCamelCase = (str) => {
    return str.replace(/[-_\s](\w)/g, (_, s) => s.toUpperCase());
};
const slice = (arrLike, offset = 0) => {
    return Array.prototype.slice.call(arrLike, offset);
};

/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/05 10:55:25 (GMT+0900)
 */
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
/**
 * 将样式对象转换为字符串
 * {color: 'red', fontSize: '16px'} => 'color:red;font-size:16px'
 * @param data
 * @param extendStyles
 */
const createStyles = (data, extendStyles) => {
    if (extendStyles) {
        // 防止extendStyles存在snake的属性，不能成功覆盖旧样式
        // data['lineHeight'] = 1.5, extendStyles['line-height'] = ''
        for (const [key, value] of Object.entries(extendStyles)) {
            data[toCamelCase(key)] = value;
        }
    }
    const arr = [];
    for (const [key, value] of Object.entries(data)) {
        if (value === '' || typeof value === 'undefined' || value === null)
            continue;
        arr.push(`${toSnakeCase(key)}:${value}`);
    }
    return arr.join(';');
};
const replaceHtmlTag = (input, oldNodeName, newNodeName) => {
    return input.replace(RegExp('(^<' + oldNodeName + ')|(' + oldNodeName + '>$)', 'gi'), (match) => match.toUpperCase().replace(oldNodeName, newNodeName.toLowerCase()));
};
const isUlElement = (el) => {
    return /UL|OL/.test(el.nodeName);
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
 * 获取元素styles对象
 * @param el
 */
const getStyles = (el) => {
    if (!el)
        return {};
    const style = el.getAttribute('style') || '';
    return style.split(/\s?;\s?/).reduce((prev, s) => {
        const [key, val] = s.split(/\s?:\s?/);
        prev[toCamelCase(key)] = val;
        return prev;
    }, {});
};

/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/05 11:55:07 (GMT+0900)
 */
const CLASS_NAME_EDITOR = 'zx-editor';
const CLASS_NAME_CONTENT = `${CLASS_NAME_EDITOR}__content-wrapper`;

const ALLOWED_NODE_NAMES = [
    'SECTION',
    'H1',
    'H2',
    'H3',
    'H4',
    'H5',
    'BLOCKQUOTE',
    'UL',
    'OL',
];
const REPLACE_NODE_LIST = [
    'DIV',
    'P',
    'ARTICLE',
    'ASIDE',
    'DETAILS',
    'SUMMARY',
    'FOOTER',
    'HEADER',
    'MAIN',
    'NAV',
    'SECTION',
    'H1',
    'H2',
    'H3',
    'H4',
    'H5',
    'H6',
    'BLOCKQUOTE',
];
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
    allowedNodeNames: ALLOWED_NODE_NAMES,
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
    imageSectionTemp: '<section class="child-is-picture"><img src="{url}" loading="lazy"></section>',
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
 * Date: 2022/05/09 21:12:46 (GMT+0900)
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
 * 设置编辑器$content伪元素before的content值，并将css style元素添加至head中
 * Set the content value of pseudo-element :before
 * @param placeholder
 */
const setContentValueOfPseudoElementBefore = (placeholder) => {
    // 为伪类content设值
    const beforeStyle = `.${CLASS_NAME_EDITOR} .${CLASS_NAME_CONTENT}.is-empty:before{content:'${placeholder}' !important;`;
    // 生成style元素
    const style = createElement('style', { type: 'text/css' }, beforeStyle);
    // 将style元素添加值head中
    $('head')?.append(style);
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
        // placeholder
        '--placeholder-color': options.placeholderColor,
        '--line-height': options.lineHeight,
    };
    setContentValueOfPseudoElementBefore(options.placeholder);
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
    el.innerHTML = '<section><br></section>';
    // return
    return el;
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
    let newEl;
    // LI元素处理：被修改的元素为UL/OL的内部元素
    if (oldNodeName === 'LI' && isUlElement(parent)) {
        // 替换当前LI元素标签为新元素标签
        el.innerHTML = replaceHtmlTag(input.outerHTML, oldNodeName, newNodeName);
        // 获取新元素
        newEl = el.firstChild;
        // 有多个LI元素
        if (parent.childElementCount > 1) {
            // 当前LI元素为UL的第一个元素
            if (parent.firstElementChild === input) {
                // 将新元素移动至UL/OL前面
                parent.parentElement?.insertBefore(newEl, parent);
            }
            // 当前LI元素为UL的最后一个元素
            else if (parent.lastElementChild === input) {
                const parentNext = parent.parentElement?.nextElementSibling;
                // 下一个兄弟元素存在，添加至下一个兄弟元素前面
                if (parentNext) {
                    parentNext.parentElement?.insertBefore(newEl, parentNext);
                }
                else {
                    // 下一个兄弟元素不存在，添加至内容尾部
                    parent.parentElement?.append(newEl);
                }
            }
            // 当前LI元素为UL中间的一个元素，拆分当前UL/OL
            else {
                const elList = slice(parent.children);
                const prevEl = createElement(parent.nodeName);
                let tempEl = elList.shift();
                while (tempEl) {
                    if (tempEl === input)
                        break;
                    prevEl.append(tempEl);
                    tempEl = elList.shift();
                }
                parent.parentElement?.insertBefore(prevEl, parent);
                // 将新元素插入到当前UL/OL元素前面
                parent.parentElement?.insertBefore(newEl, parent);
                // 删除被替换的对象元素
                parent.removeChild(input);
            }
        }
        // 只有一个LI元素
        else {
            // 将新元素移动至UL/OL前面
            parent.parentElement?.insertBefore(newEl, parent);
            // 移除UL/OL空元素
            parent.parentElement?.removeChild(parent);
        }
        return newEl;
    }
    if (REPLACE_NODE_LIST.includes(oldNodeName)) {
        // change to ul, ol
        if (/UL|OL/.test(newNodeName)) {
            const prev = input.previousElementSibling;
            const next = input.nextElementSibling;
            if (prev && isUlElement(prev)) {
                el.innerHTML = replaceHtmlTag(input.outerHTML, oldNodeName, 'li');
                newEl = el.firstChild;
                prev.append(newEl);
                parent?.removeChild(input);
                // parent的下一个元素也为UL/OL元素，将其合并
                if (next && next.nodeName === prev.nodeName) {
                    const nextEls = slice(next.children);
                    prev.append(...nextEls);
                    next.parentElement?.removeChild(next);
                }
            }
            else if (next && isUlElement(next)) {
                el.innerHTML = replaceHtmlTag(input.outerHTML, oldNodeName, 'li');
                newEl = el.firstChild;
                next.insertBefore(newEl, next.firstElementChild);
                parent?.removeChild(input);
                // parent的上一个元素也为UL/OL元素，将其合并
                // 不可能发生never
            }
            else {
                // 替换当前元素为UL/OL
                newEl = el;
                el.innerHTML = replaceHtmlTag(input.outerHTML, oldNodeName, 'li');
                parent?.replaceChild(newEl, input);
            }
        }
        else {
            el.innerHTML = replaceHtmlTag(input.outerHTML, oldNodeName, newNodeName);
            newEl = el.firstChild;
            parent?.replaceChild(newEl, input);
        }
        return newEl;
    }
    el.append(input.cloneNode(true));
    parent?.replaceChild(el, input);
    return el;
};
const checkIsEmpty = (el) => {
    if (el.children.length <= 1 && isBrSection(el.children[0])) {
        el.classList.add('is-empty');
    }
    else {
        el.classList.remove('is-empty');
    }
};

/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/07 10:33:02 (GMT+0900)
 */
class CursorClass {
    rootElement;
    timer;
    constructor(rootElement) {
        this.rootElement = rootElement;
        this.timer = null;
        // init range
        const el = rootElement.lastElementChild;
        if (el)
            this.setRange(el, el.textContent?.length);
    }
    getRange() {
        try {
            // @ts-ignore
            return window.getSelection()?.getRangeAt(0);
        }
        catch (e) {
            // ..
        }
        return new Range();
    }
    /**
     * 获取当前元素的最后一个无子节点的节点
     * @param el
     * @private
     */
    _getLastNode(el) {
        let node = el;
        while (node.lastChild) {
            node = node.lastChild;
        }
        return node;
    }
    setRange(el, offset) {
        const range = this.getRange();
        // remove all range object
        const selection = window.getSelection();
        if (selection)
            selection.removeAllRanges();
        // el: '<section>inner text.</section>'
        // let targetNode = el.childNodes[el.childNodes.length - 1] || el
        // // check img/video/audio
        // if (/IMG|VIDEO|AUDIO/.test(targetNode.nodeName)) {
        //   offset = 1
        //   // get parentNode, can't set offset = 1 of IMG node.
        //   targetNode = targetNode.parentNode as HTMLElement
        // }
        const targetNode = this._getLastNode(el);
        if (typeof offset === 'undefined') {
            offset = targetNode.textContent?.length ?? 0;
        }
        range.setStart(targetNode, offset);
        // cursor start and end position is collapse
        range.collapse(true);
        this._clearTimeout();
        // 延时执行，键盘自动收起后再触发focus
        // @ts-ignore
        this.timer = setTimeout(() => {
            // 插入新的光标对象
            selection?.addRange(range);
        }, 100);
    }
    _clearTimeout() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }
    getCurrentNode(isOnlyContentChild = false) {
        const range = this.getRange();
        let currentNode = range.endContainer;
        while (currentNode && this.rootElement !== currentNode) {
            // li元素判断
            if (!isOnlyContentChild && currentNode.nodeName === 'LI' && currentNode.parentElement?.parentElement === this.rootElement) {
                return currentNode;
            }
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
 * Date: 2022/05/05 10:29:43 (GMT+0900)
 */
class ZxEditor extends EventEmitter {
    // 编辑器外部容器HTML元素
    $wrapper;
    // 版本
    version;
    // 参数
    options;
    // 编辑器HTML元素
    $editor;
    // 编辑器内容区域HTML元素
    $content;
    // 光标处理对象
    cursor;
    // 内容元素事件处理函数
    _contentEvent;
    // 内容中允许使用的元素标签
    allowedNodeNames;
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
        // options
        this.options = { ...DEF_OPTIONS, ...options };
        this.allowedNodeNames = (this.options.allowedNodeNames || ALLOWED_NODE_NAMES).map(item => item.toUpperCase());
        // elements
        this.$content = initContentDom(this.options);
        this.$editor = initEditorDom();
        this.$editor.append(this.$content);
        this.$wrapper.append(this.$editor);
        // cursor
        this.cursor = new CursorClass(this.$content);
        // content event handler
        this._contentEvent = (e) => {
            const type = e.type;
            if (type === 'blur')
                this._lastLine();
            this.emit(type === 'input' ? 'change' : type, e);
            checkIsEmpty(this.$content);
        };
        this._initEvents();
    }
    /**
     * init events
     * @private
     */
    _initEvents() {
        this.$content.addEventListener('focus', this._contentEvent);
        this.$content.addEventListener('blur', this._contentEvent);
        this.$content.addEventListener('input', this._contentEvent);
    }
    /**
     * 扩展插件
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
    /**
     * 设置编辑器内容，会覆盖之前内容
     * set html to the content element
     * @param html
     */
    setHtml(html) {
        this.$content.innerHTML = '';
        this.insert(html);
        this._lastLine();
    }
    /**
     * 获取编辑器中的HTML代码，会自动去除结尾处的空行
     * get html string from content element
     * remove last line that `<section><br></section>`
     * @return html string
     */
    getHtml() {
        return this.$content.innerHTML.replace(/<section><br><\/section>$/, '');
    }
    /**
     * 向编辑器中插入内容/HTML代码/元素等
     * insert html or element to content element
     * @param input
     */
    insert(input) {
        // insert HTMLElement
        if (input instanceof HTMLElement) {
            this._insert(input);
        }
        // insert string
        else {
            const el = createElement('div');
            el.innerHTML = input;
            slice(el.childNodes).forEach((node) => {
                // element node
                if (node.nodeType === Node.ELEMENT_NODE) {
                    // <br> element
                    if (node.nodeName === NODE_NAME_BR) {
                        this._insert(createElement(NODE_NAME_SECTION, {}, '<br/>'));
                    }
                    else {
                        this._insert(node);
                    }
                }
                // text
                else if (node.textContent) {
                    this._insert(createElement(NODE_NAME_SECTION, {}, node.textContent));
                }
            });
        }
        this._dispatchChange();
    }
    /**
     * insert element to content element
     * @param input
     * @private
     */
    _insert(input) {
        const currentSection = this.getCurrentNode();
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
        if (!this.allowedNodeNames.includes(input.nodeName)) {
            input = changeNodeName(input, NODE_NAME_SECTION);
        }
        // 设置光标元素对象
        this.cursor.setRange(input);
    }
    /**
     * 检查编辑器最后一段是否为空行，非空行则插入
     * append br section to content element when the lastElementChild is not a br section element
     * @private
     */
    _lastLine() {
        if (!isBrSection(this.$content.lastElementChild)) {
            this.$content.appendChild(createElement('section', {}, '<br>'));
        }
    }
    /**
     * 修改光标所在元素的标签
     * @param nodeName
     */
    changeNodeName(nodeName) {
        // 判断nodeName是否被允许设置
        if (!this.allowedNodeNames.includes(nodeName.toUpperCase()))
            return false;
        const currentSection = this.getCurrentNode();
        if (currentSection && changeNodeName(currentSection, nodeName)) {
            this._dispatchChange();
            return true;
        }
        return false;
    }
    /**
     * 修改光标所在元素的样式
     * @param styles
     * @param value
     */
    changeStyles(styles, value) {
        const current = this.getCurrentNode(true);
        if (current) {
            const s = typeof styles === 'string' ? { [styles]: value } : styles;
            current.setAttribute('style', createStyles(getStyles(current), s));
            this._dispatchChange();
        }
    }
    _dispatchChange() {
        this.$content.dispatchEvent(new InputEvent('input'));
    }
    /**
     * 获取光标所在的元素的style对象
     */
    getStyles() {
        return getStyles(this.getCurrentNode());
    }
    /**
     * 获取光标所在的元素
     * @param isOnlyContentChild
     */
    getCurrentNode(isOnlyContentChild = false) {
        return this.cursor.getCurrentNode(isOnlyContentChild);
    }
    /**
     * 销毁事件
     * destroy events
     */
    destroy() {
        this.$content.removeEventListener('focus', this._contentEvent);
        this.$content.removeEventListener('blur', this._contentEvent);
        this.$content.removeEventListener('input', this._contentEvent);
        this.destroyEventEmitter();
    }
}

export { ZxEditor };
//# sourceMappingURL=zx-editor.esm.js.map
