import { isObject, isArray, isDate } from './is-type';
import { Toast } from 'antd-mobile';
import * as queryString from 'qs';

/**
 * @description m => km
 * @param value string
 */
export function convert(value: string): string {
  if (!value) {
    console.log('value 不能为空')
    return '0';
  }
  let result = parseInt(value);
  return result > 1000 ? ((result / 1000).toFixed(2) + ' k') : result + ' ';
}
/**
 * @description digital toFixed
 * @param value string
 * @param decimals string
 */
export function digitalFormat(value: string, decimals: number = 2): string {
  if (!value) return '0';
  const result = parseFloat(value);
  if (isNaN(result)) {
    console.log('传入的值解析错误')
    return '0';
  }
  return Number(result.toFixed(decimals)).toString();
}

/**
 * @description sub toFixed
 * @param reduction string
 * @param minuend string
 * @param decimals string
 */
export function subCount(reduction: string, minuend: string, decimals: number = 2): string {
  if (!reduction) return '0';
  if (!minuend) return reduction;
  const result1 = parseFloat(reduction);
  const result2 = parseFloat(minuend);
  if (isNaN(result1) || isNaN(result2)) {
    console.log('传入的值解析错误');
    return '0';
  }
  return Number((result1 - result2).toFixed(decimals)).toString();
}

/**
 * @description digital prefix zore
 * @param number string
 */
export const zore = (number: number): string => {
  return number < 10 ? ('0' + number) : number + '';
};

/**
 * @description ms => {minute, second}
 * @param remain string
 * @param remain string
 */
export function msToTime (remain: number): object{
  const
    minute = parseInt(`${remain / 60000}`),
    second = parseInt(`${remain % 60000 / 1000}`);

  return {
    minute: isNaN(minute) ? 0 : minute,
    second: isNaN(second) ? 0 : second
  }
}

/**
 * @description 根据Ascii码排序对象
 * @param caseSensitive boolean default: false 大小写敏感
 * @returns string
 */
export const sortForAscii = (obj: object, caseSensitive: boolean = false): string => {
	if (!isObject(obj)) {
		console.log('参数必须为Object');
		return '';
	}
	console.log(obj);
	let upperObj = {};
	Object.keys(obj).forEach(key => {
		if ((obj[key] || obj[key] === 0) && !isDate(obj[key])) {
		 upperObj[key] = (isObject(obj[key]) || isArray(obj[key]) || isDate(obj[key])) ? 'SHENGDACPROJECT' : (obj[key] + '');
		}
	});
 
	upperObj = caseSensitive ? upperObj : JSON.parse(JSON.stringify(upperObj).toLocaleLowerCase());
	let sortObjToString = '';
	const sortKeys = Object.keys(upperObj).sort();
	const LEN = sortKeys.length - 1;
	sortKeys.forEach((key, index) => {
		sortObjToString += upperObj[key] ? `${key}=${upperObj[key]}${index < LEN ? '&' : ''}` : ``;
	});
 
	return sortObjToString.toLocaleUpperCase();
 };

 /**
	* @description 时间格式转化为通用
	* @param dateStr 
	*/
 export const MPDate = (dateStr: string): Date => {
	if (typeof dateStr === 'string' && isNaN(Date.parse(dateStr))) {
		// '2000-01-01 00:00:00' => '2000/01/01 00:00:00'
		dateStr = dateStr.replace(/-/g, '/');
	}
	return new Date(dateStr);
};

/**
 * @description 时间对象格式化
 * @param date 
 * @param format 
 */
export const dateFormat = (date: Date, format: string = 'yyyy-MM-dd hh:mm:ss'): string => {
	if (!date) return '';
	let args = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds(),
		'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
		'S': date.getMilliseconds()
	};
	if (/(y+)/.test(format)) { format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)); }
	for (let i in args) {
		let n = args[i];
		if (new RegExp('(' + i + ')').test(format)) { format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ('00' + n).substr(('' + n).length)); }
	}
	return format;
}

/**
 * @description antd-mobile Toast二次封装
 * @param content 
 * @param duration 
 * @param onClose 
 * @param mask 
 */
export const ToastInfo = (content: string, duration: number = 2, onClose?: (() => void) | undefined, mask: boolean = false) => {
	Toast.info(content, duration, onClose, mask);
}

/**
 * @description 获取当前url参数
 * @returns object
 */
export const getUrlParams = (): any => {
	const search = window.location.hash.split('?')[1];
	return queryString.parse(search);
}
