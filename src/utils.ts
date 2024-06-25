export function download(data: any, filename: string) {
	// 将对象转换为 JSON 字符串
	const json = JSON.stringify(data, null, 2);
	
	// 创建 Blob 对象
	const blob = new Blob([json], { type: 'application/json' });
	
	// 创建临时 URL
	const url = URL.createObjectURL(blob);
	
	// 创建一个 <a> 元素
	const a = document.createElement('a');
	a.style.display = 'none';
	a.href = url;
	a.download = filename;
	
	// 将 <a> 元素添加到 DOM 中
	document.body.appendChild(a);
	
	// 模拟点击下载链接
	a.click();
	
	// 清理
	URL.revokeObjectURL(url);
	document.body.removeChild(a);
}
