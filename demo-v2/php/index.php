<?php
  header("Access-Control-Allow-Origin: *");

  // 检测变量是否获取到
  if (isset($_FILES['file'])) {
  	$img = $_FILES['file'];
	// 上传成功$img中的属性error为0，当error>0时则上传失败有一下几种情况
	$code = $img['error'];
	if ($code > 0) {
	  $message = '上传失败';
	  switch ($code) {
		case 1: 
		  $message.='大小超过了服务器设置的限制！';
		  break;
		case 2: 
		  $message.='文件大小超过了表单设置的限制！';
		  break;
		case 3: 
		  $message.='文件只有部分被上传';
		  break;
		case 4: 
		  $message.='没有文件被上传';
		  break;
		case 6: 
		  $message.='上传文件的临时目录不存在！';
		  break;
		case 7: 
		  $message.='写入失败';
		  break;
		default: 
		  $message.='未知错误';
	  }
	  $arr = array(
	  	"code" => $code,
	  	"message" => $message 
	  );
	  // 在php页面输出错误
	  exit(json_encode($arr));
	} else {
	  //截取文件后缀名
	  $type = strrchr($img['name'], '.');
	  // 设置路径：当前目录下的uploads文件夹并且图片名称为$img['name'];
	  $path = "uploads/".$img['name'];
	  // 判断上传的文件是否为图片格式
	  $fileType = strtolower($type);
	  if ($fileType =='.png' || $fileType == '.jpg' || $fileType == '.bmp' || $fileType == '.gif') {
	  	// 将图片文件移到该目录下
	    move_uploaded_file($img['tmp_name'], $path);
		$arrayName = array(
		  "code" => 0,
		  "url" => $path
		);
		echo json_encode($arrayName);
	  } else {
	  	$arr = array(
	  	  "code" => 1001,
	  	  "message" => "不支持文件类型"
	    );
	    // 在php页面输出错误
	    exit(json_encode($arr));
	  }
    }
  }
?>