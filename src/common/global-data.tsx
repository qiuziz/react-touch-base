/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2018-11-21 14:42:59
 * @Last Modified by: qiuz
 * @Last Modified time: 2018-11-21 14:43:22
 */

const globalData = {
	COUSULT_PHONENUM: '400-821-5751',
};

const setGlobalData = (key: string, val: any) => {
  globalData[key] = val
}

const getGlobalData = (key: string) => globalData[key]

export { setGlobalData, getGlobalData }
