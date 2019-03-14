/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-03-05 14:55:35
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-03-06 14:33:40
 */

import React from 'react';
import './index.less';
import IndexSelect from '../../component/index-select';
import { data } from './data';

function handleData() {
	let cityListDataSource = {
		'定': [
			{
				"code": "310100",
				"name": "上海市",
				"chineseChar": null
			}
		],
		'热': data.hots
	};
	data.citys.forEach(city => {
		cityListDataSource[city.letter] = city.cityList;
	});
	return cityListDataSource;
}

const handeTitle = (key: string): string => {
	switch(key) {
		case '定':
			return '当前定位城市';
		case '热':
			return '热门城市';
		default:
			return key;
	}
}

const handleItemStyle = (key: string | number): string => {
	switch(key) {
		case '定':
			return 'city-li location';
		case '热':
			return 'city-li hot';
		default:
			return 'city-li';
	}
}

/**
 * @description ListView 每条数据函数
 */
const renderRow = (rowData: any, sectionID: string | number, rowID: string | number) => {
 return (
			 <div className={`city ${handleItemStyle(sectionID)}`}  key={rowID}>
				 {rowData}
			 </div>
		 )
};

const CityList = (props: any) => {
	return (
		<div className="city">
			<IndexSelect
				data={handleData()}
				sectionHeader={sectionData => <div className="direction-title">{handeTitle(sectionData)}</div>}
				renderRow={renderRow}
			/>
		</div>
	);
}

export default CityList;