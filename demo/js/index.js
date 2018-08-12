/**
 * Created by zx1984 7/21/2018
 * https://github.com/zx1984
 */
'use strict';
// 实例化 ZxEditor
var zxEditor = new ZxEditor('#editorContainer', {
  // 顶部偏移距离
  // demo有顶部导航栏，高度44
  top: 44,
  // 编辑框左右边距
  padding: 13
});

// 底部工具栏添加一个“导语”按钮
zxEditor.addFooterButton({
  name: 'summary',
  // 按钮外容器样式
  class: 'demo-summary-button',
  // 按钮内i元素样式名
  icon: '',
  // 需要注册的监听事件名
  on: 'summary-button'
})

var zxDebug = new ZxDebug({
  position: 'top',
  offset: 100
});

// 监听编辑器处理通知
zxEditor.on('debug', function () {
  zxDebug.log.apply(zxDebug, arguments)
})

zxEditor.on('message', function () {
  zxDebug.log.apply(zxDebug, arguments)
})

zxEditor.on('error', function () {
  zxDebug.error.apply(zxDebug, arguments)
})


var $ = zxEditor.query || function (selector, context) {
  return (context || document).querySelector(selector)
}

// 获取body元素
var $docBody = $('body');
// 封面图元素
var $coverPic = $('.cover-wrapper img');

// 标题summary是否显示
var summaryShow = false;
// 标题栏子元素集（.placeholder, .input-hook）
var $titleItems = null;
// 摘要，导语栏子元素集（.placeholder, .input-hook）
var $summaryItems = null;
// 预览容器
var $previewWrapper = $('.article-preview-wrapper');

// 封面图栏
handleCoverWrapper();
// 标题栏
handlePlaceholderInputWrapper('.title-wrapper');
// 导语摘要栏
handlePlaceholderInputWrapper('.summary-wrapper');
// 初始化容器高度
initHeight();
// 初始化本地存储的数据
initLoaclData();

function initLoaclData () {
  var data = zxEditor.storage.get('article')
  if (data) {
    if (data.cover) {
      zxEditor.addClass('has-pic', $('.cover'));
      $coverPic.setAttribute('src', data.cover);
    }
    if (data.title) {
      $titleItems[0].style.display = 'none'
      $titleItems[1].style.display = ''
      $titleItems[1].innerText = data.title
    }
    if (data.summary) {
      summaryShow = true;
      $('.summary-wrapper').style.display = '';
      $summaryItems[0].style.display = 'none'
      $summaryItems[1].style.display = ''
      $summaryItems[1].innerText = data.summary
    }
    zxEditor.setContent(data.content);
  }
}

/**
 * 预览
 */
function handlePreviewClick () {
  // 获取文章数据
  var data = getArticleData();
  // 保存文章数据
  zxEditor.storage.set('article', data)
  if (!data) {
    zxEditor.dialog.alert('还未添加任何内容！');
    return;
  }
  // 判断内容是否完善
  if (!data.cover) {
    zxEditor.dialog.alert('请添加文章封面');
    return
  }
  if (!data.title) {
    zxEditor.dialog.alert('请添加文章标题');
    return
  }
  if (!data.content || data.content === '<p><br></p>') {
    zxEditor.dialog.alert('请添加文章内容');
    return
  }

  // 将数据添加到预览容器中
  $('.preview-cover img', $previewWrapper).src = data.cover;
  $('.preview-title', $previewWrapper).innerText = data.title;
  var $summay = $('.preview-summary', $previewWrapper);
  if (data.summary) {
    // 显示摘要
    $summay.style.display = '';
    // 填充摘要(导语)内容
    $summay.innerText = data.summary;
  } else {
    // 隐藏摘要
    $summay.style.display = 'none';
  }
  // 填充正文内容
  $('.preveiw-content', $previewWrapper).innerHTML = data.content;
  $previewWrapper.style.transform = 'translateX(0)';
  // 禁止body滚动
  zxEditor.lock($docBody);
}

/**
 * 点击继续编辑
 */
function handleBackPreviewClick () {
  $previewWrapper.style.transform = 'translateX(100%)';
  // 接触body滚动限制
  zxEditor.unlock($docBody);
}

function handleBackClick () {
  zxEditor.dialog.alert('点击了返回按钮');
}

/**
 * 提交数据
 */
function handleSubmitClick () {
  // 获取文章数据
  var data = getArticleData() || {};
  // 显示loading
  zxEditor.dialog.loading();

  // 上传图片数据
  // 上传封面图省略...

  // 处理正文中的base64图片
  // 获取正文中的base64数据数组
  var base64Images = zxEditor.getBase64Images();
  // 上传base64图片数据
  uploadBase64Images(base64Images, function () {
    // 正文中有base64数据，上传替换成功后再重新获取正文内容
    if (base64Images.length) {
      data.content = zxEditor.getContent();
    }
    // 填充预览正文内容
    $('.preveiw-content', $previewWrapper).innerHTML = data.content;
    // 需要提交的数据
    zxDebug.log('提交的数据', data);
    // 防止提交失败，再保存一次base64图片上传后的文章数据
    zxEditor.storage.set('article', data)
    // 发送至服务器
    // ...
    // end
    zxEditor.dialog.removeLoading();
    zxEditor.dialog.alert('文章模拟发布成功!', function () {
      // 文章发布成功
      // 清除本地存储的文章数据
      zxEditor.storage.remove('article')
      // 其他操作
      // ...
      location.reload()
    })
  })

}

/**
 * 获取文章数据
 * @returns {{}}
 */
function getArticleData () {
  var data = {
    cover: $coverPic.getAttribute('src'),
    title: $titleItems[1].innerText,
    summary: $summaryItems[1].innerText,
    // 获取正文内容
    content: zxEditor.getContent()
  }
  return (!data.cover && !data.summary && !data.title && (!data.content || data.content === '<p><br></p>'))
    ? null
    : data;
}

/**
 * 初始化容器高度
 * editor, preview body
 */
function initHeight () {
  // 窗口高度
  var winHeight = window.innerHeight;
  var headerHeight = 44;
  // 编辑器
  var $editorContent = zxEditor.$content;
  var contentTop = $editorContent.getBoundingClientRect().top;
  $editorContent.style.minHeight = winHeight - contentTop - zxEditor.toolbarHeight + 'px';
  // $previewWrapper
  $('.preview-wrapper').style.height = winHeight - headerHeight + 'px';
}

/**
 * 点击链接按钮
 */
zxEditor.on('add-link', function (next) {
  zxEditor.dialog.alert('可以调用原生接口，获取剪切板url数据', function () {
    // 获取原生链接
    next('http://192.168.5.8:81/index.php?s=/12&page_id=1151', '这是一个测试连接地址，如果文字很长会自动省略');
  })
})

// 点击导语按钮
zxEditor.on('summary-button', function (prams) {
  zxDebug.log('click summary-button', prams)
  summaryShow = !summaryShow;
  $('.summary-wrapper').style.display = summaryShow ? '' : 'none';
})

/**
 * 数据处理，并提交数据处理
 */
function uploadBase64Images (base64Images, callback) {
  var len = base64Images.length;
  var count = 0;
  if (len === 0) {
    callback()
    return
  }
  for (var i = 0; i < len; i++) {
    _uploadHandler(base64Images[i]);
  }

  function _uploadHandler (data) {
    upload(data.blob, function (url) {
      // 替换正文中的base64图片
      zxEditor.setImageSrc(data.id, url)
      // 计算图片是否上传完成
      _handleCount();
    })
  }

  function _handleCount () {
    count++
    if (count === len) {
      callback()
    }
  }
}

// 模拟文件上传
function upload (blob, callback) {
  setTimeout(function () {
    callback('https://photo.tuchong.com/1000000/f/305463584.jpg');
  }, 500)
}

/**
 * *********************************
 * 封面图
 * *********************************
 */
function handleCoverWrapper () {
  // 目标图片尺寸参数，强制裁剪
  var imageParams = {
    width: 750,
    height: 422,
    // 强制裁剪图片，包括gif
    clip: true
  }
  // 封面容器
  var $cover = $('.cover-wrapper .cover');
  var $input = $('.cover-wrapper input');
  var $img = zxEditor.query('img', $cover);
  // 点击封面容器处理
  zxEditor.addEvent($cover, 'click', function (e) {
    zxDebug.log('coverClickHandler', e)
    var oldSrc = $img.src;
    console.log(oldSrc);
    $input.click();
  });

  // 选中图片文件
  zxEditor.addEvent($input, 'change', function (e) {
    // 添加loading
    zxEditor.dialog.loading('图片处理中...');
    var files = this.files;
    // 处理图片数据(file数据转base64,blobData)
    zxEditor.filesToBase64(files, imageParams, function (err, res) {
      zxEditor.dialog.removeLoading();
      if (err) {
        zxEditor.dialog.alert(err[0].message || '图片处理错误！')
      }
      if (res) {
        $img.src = res[0].base64;
        zxEditor.addClass('has-pic', $cover);
      }
    })
  });
}

/**
 * *********************************
 * 标题容器
 * *********************************
 */
/**
 * 处理标题、摘要placeholder/input切换
 */
function handlePlaceholderInputWrapper (selector) {
  var $wrapper = $(selector);
  var $items = zxEditor.queryAll('.item', $wrapper);
  // 输入最大长度
  var maxLength = 30;
  if ($items.length === 0) return;
  if (selector === '.title-wrapper') {
    $titleItems = $items;
  } else if (selector === '.summary-wrapper') {
    $summaryItems = $items;
    maxLength = 140;
  }
  zxEditor.addEvent($items[0], 'click', _placeholderClikHandler, false);
  zxEditor.addEvent($items[1], 'blur', _inputHookHandler, false)
  // 输入内容限制
  zxEditor.addEvent($items[1], 'keyup', function (e) {
    var text = this.innerText;
    if (text && text.length >= maxLength) {
      if (e.keyCode !== 8) {
        e.preventDefault();
      } else {
        this.innerText = text.substr(0, maxLength);
      }
    }
  })
}

/**
 * 点击标题、摘要placeholder处理程序
 * @private
 */
function _placeholderClikHandler (e) {
  var $currentElm = e.currentTarget;
  if (zxEditor.hasClass('placeholder', $currentElm)) {
    this.style.display = 'none';
    var $inputHook;
    if ($currentElm === $titleItems[0]) {
      $inputHook = $titleItems[1];
    } else if ($currentElm === $summaryItems[0]) {
      $inputHook = $summaryItems[1];
    }
    if (!$inputHook) return;
    $inputHook.style.display = '';
    $inputHook.focus();
  }
}

/**
 * 点击标题、摘要输入框处理程序
 * @private
 */
function _inputHookHandler (e) {
  var $currentElm = e.currentTarget;
  var $placeholder;
  if ($currentElm === $titleItems[1]) {
    $placeholder = $titleItems[0];
  } else if ($currentElm === $summaryItems[1]) {
    $placeholder = $summaryItems[0];
  }
  if (!$placeholder) return;
  var text = $currentElm.innerText;
  if (!text) {
    $placeholder.style.display = '';
    $currentElm.style.display = 'none';
  }
}
