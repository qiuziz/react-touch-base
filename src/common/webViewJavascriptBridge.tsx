/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2018-12-20 20:27:51
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-01-09 14:17:21
 */

/**
 *  页面通过 pageType 来区分
 *  数据统一用data来获取
 * 
 * 	JS调用APP(setValue):
 *  Usage: 
 *   import { callAppRouter } from 'src/common/webViewJavascriptBridge';
 * 		...
 * 	 callAppRouter('setValue', {pageType: '1', data: {}}, (res: any) => {
 * 		 // do sth
 *   });
 * 	 
 *	APP调用JS(getVlaue):

 * 	Usage: 
 *   import { registerRouter, unRegisterRouter } from 'src/common/webViewJavascriptBridge';
 * 		...
 * 	 registerRouter('getValue', (res: any) => {
 * 		if (res.pageType === '1') {
 * 			// do sth
 * 		} else {
 * 			// do sth
 * 		}
 *	 })
 * 	 
 *  componentWillUnmount() {
 *		unRegisterRouter('getValue');
 *	}
 *
 */

import detectOS from './detect-os';
import { isFunction } from './is-type';

const win: any = window;

const PLATFORM = detectOS();

export function setupWebViewJavascriptBridge(callback: any = () => { }) {
	if (win.WebViewJavascriptBridge) { return callback(win.WebViewJavascriptBridge); }
	if (win.WVJBCallbacks) { return win.WVJBCallbacks.push(callback); }
	win.WVJBCallbacks = [callback];
	var WVJBIframe = document.createElement('iframe');
	WVJBIframe.style.display = 'none';
	WVJBIframe.src = 'https://__bridge_loaded__';
	document.documentElement.appendChild(WVJBIframe);
	setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
}

setupWebViewJavascriptBridge();

export const callAppRouter = (method: string, params: object, callback?: (res: object) => void) => {
	if (PLATFORM === 'iOS') {
		win.WebViewJavascriptBridge && win.WebViewJavascriptBridge.callHandler(method, params, (result: object) => {
			isFunction(callback) && callback(result || { data: {} });
		});
	} else if (PLATFORM === 'Android') {
		// 生成回调函数方法名称
		const callbackName = 'CB_' + Date.now() + '_' + Math.ceil(Math.random() * 10);
		// 挂载一个临时函数到window变量上，方便app回调
		if (callback) {
			win[callbackName] = (result: string) => {
				let resultObj: object;
				console.log(resultObj)
				try {
					resultObj = JSON.parse(result);
				} catch {
					resultObj = {};
				}
				callback(resultObj);
				//回调成功之后删除挂载到window上的临时函数
				delete win[callbackName];
			}
		}
		if (win.WebViewJavascriptBridge && isFunction(win.WebViewJavascriptBridge[method])) {
			win.WebViewJavascriptBridge[method](JSON.stringify(params), callbackName);
		}
	}
};

export const registerRouter = (method: string, callback?: (res: object) => void) => {
	if (PLATFORM === 'iOS') {
		!win.WebViewJavascriptBridge && setupWebViewJavascriptBridge();
		win.WebViewJavascriptBridge && win.WebViewJavascriptBridge.registerHandler(method, (result: object) => {
			isFunction(callback) && callback(result || {});
		});
	} else if (PLATFORM === 'Android') {
		win[method] = (result: string) => {
			let resultObj: object;
			console.log(resultObj)
			try {
				resultObj = JSON.parse(result);
			} catch {
				resultObj = {};
			}
			callback(resultObj);
		};
	}
}
export const unRegisterRouter = (method: string) => {
	if (PLATFORM === 'iOS') {
		!win.WebViewJavascriptBridge && setupWebViewJavascriptBridge();
		win.WebViewJavascriptBridge && win.WebViewJavascriptBridge.registerHandler(method, (result: object) => {
			// isFunction(callback) && callback(result || {});
		});
	} else if (PLATFORM === 'Android') {
		win[method] = () => { };
	}
}
