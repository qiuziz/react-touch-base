/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-03-05 14:43:03
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-03-14 17:03:37
 */

import React, { useState, useEffect, useLayoutEffect } from 'react';
import './index.less';
import { StickyContainer, Sticky } from 'react-sticky';
import { Button, ListView, PullToRefresh } from 'antd-mobile';
import ReactDOM from 'react-dom';

interface PropsType {
	data: dataType;
	quickSearchBarStyle?: Object;
	renderRow?: (rowData: any, sectionID: string | number, rowID: string | number) => React.ReactElement<any>
	sectionHeader?: (sectionData: any) => React.ReactElement<any>
}

interface dataType {
	[propName: string]: Array<dataItemType>
}

interface dataItemType {
	code: string;
	name: string;
	[propName: string]: any;
}

function genData(ds: any, data: dataType) {
	const dataBlob = {};
	const sectionIDs = [];
	const rowIDs = [];
	Object.keys(data).forEach((item, index) => {
		sectionIDs.push(item);
		dataBlob[item] = item;
		rowIDs[index] = [];

		data[item].forEach((item: dataItemType) => {
			rowIDs[index].push(item.code);
			dataBlob[item.code] = item.name;
		});
	});
	return ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
}







let listViewRef: any, indexDom: Element, timer: any;

const IndexSelect = React.memo((props: PropsType) => {
	const getSectionData = (dataBlob: any, sectionID: string | number) => dataBlob[sectionID];
	const getRowData = (dataBlob: any, sectionID: string | number, rowID: string | number) => dataBlob[rowID];

	const [dataSource, setDataSource] = useState(new ListView.DataSource({
		getRowData,
		getSectionHeaderData: getSectionData,
		rowHasChanged: (row1: any, row2: any) => row1 !== row2,
		sectionHeaderHasChanged: (s1: any, s2: any) => s1 !== s2,
	}));

	const [currentIndex, setCurrentIndex] = useState('');
	const [isTouch, setIsTouch] = useState(false);

 	/**
   * @description ListView 每条数据函数
   */
	const renderRow = (rowData: any, sectionID: string | number, rowID: string | number) => {
		return props.renderRow
			? props.renderRow(rowData, sectionID, rowID)
			: (
				<div className="city" key={rowID}>
					{rowData}
				</div>
			)
	}

	/**
 	 * @description fix antd-mobile ListView.IndexList TouchMove 
 	 */
	const fixTouchMove = () => {
		const moveListener = (e: TouchEvent) => e.preventDefault();
		const startListener = (e: TouchEvent) => setIsTouch(true);
		const endListener = (e: TouchEvent) => {
			setTimeout(() => setIsTouch(false), 100)
		};
		indexDom = document.body.getElementsByClassName('am-indexed-list-quick-search-bar')[0];
		indexDom.addEventListener('touchmove', moveListener, false);
		indexDom.addEventListener('touchstart', startListener, false);
	}

	/**
	 * @description IndexList TouchMove Current Index
	 */
	const quick = (sectionID: any, topId?: any) => {
		clearTimeout(timer);
		setCurrentIndex(sectionID || topId);
		setIsTouch(true);
		timer = setTimeout(() => setIsTouch(false), 300);
	}
	useLayoutEffect(() => {
		setDataSource(genData(dataSource, props.data));
		setTimeout(fixTouchMove, 600);
	}, [props.data]);

	const [hei, setHei] = useState(500);
	useEffect(() => {
		const parentNode: any = ReactDOM.findDOMNode(listViewRef).parentNode;
		setHei(document.documentElement.clientHeight - parentNode.offsetTop);
	}, [])
	return (
		<div className="index-select" style={{ position: 'relative' }}>
			<ListView.IndexedList
				ref={ref => listViewRef = ref}
				dataSource={dataSource}
				className="am-list sticky-list"
				// @ts-ignore
				// renderSectionWrapper={(sectionID: string | number) => (
				// 	<StickyContainer
				// 		key={`s_${sectionID}_c`}
				// 		className="sticky-container"
				// 		style={{ zIndex: 4 }}
				// 	/>
				// )}
				style={{
					height: hei,
				}}
				renderRow={renderRow}
				useBodyScroll={false}
				renderSectionHeader={sectionData => (
					props.sectionHeader(sectionData) || sectionData
					// <Sticky>
					// 	{({
					// 		style
					// 	}) => (
					// 			<div
					// 				className="sticky"
					// 				style={{
					// 					...style,
					// 					zIndex: 3,
					// 					width: '100%',
					// 					left: 0,
					// 					top: 45,
					// 				}}
					// 			>{props.sectionHeader(sectionData) || sectionData}</div>
					// 		)}
					// </Sticky>
				)}
				quickSearchBarStyle={{
					color: '#333333',
					fontSize: '14px',
					zIndex: 10,
					top: '85px',
					...props.quickSearchBarStyle
				}}
				delayTime={10}
				onQuickSearch={quick}
			/>
			<div className="current-quick" style={{ display: isTouch && currentIndex ? '' : 'none' }}>
				{currentIndex}
			</div>
		</div>
	);
})

export default IndexSelect;

// export default class IndexSelect extends React.Component<PropsType, any> {
// 	listViewRef: any;
// 	indexDom: Element;
// 	timer: any;
// 	constructor(props: PropsType) {
// 		super(props);
// 		const getSectionData = (dataBlob: any, sectionID: string | number) => dataBlob[sectionID];
// 		const getRowData = (dataBlob: any, sectionID: string | number, rowID: string | number) => dataBlob[rowID];
// 		const dataSource = new ListView.DataSource({
// 			getRowData,
// 			getSectionHeaderData: getSectionData,
// 			rowHasChanged: (row1: any, row2: any) => row1 !== row2,
// 			sectionHeaderHasChanged: (s1: any, s2: any) => s1 !== s2,
// 		});

// 		this.state = {
// 			dataSource, // ListView列表数据源
// 			currentIndex: '', // 当前索引
// 			isTouch: false, // 触摸ing
// 		}
// 	}

// 	componentDidMount() {
// 		this.setState({
// 			dataSource: genData(this.state.dataSource, this.props.data),
// 		});
// 		setTimeout(this.fixTouchMove, 600);
// 	}

// 	/**
// 	 * @description fix antd-mobile ListView.IndexList TouchMove 
// 	 */
// 	fixTouchMove = () => {
// 		const moveListener = (e: TouchEvent) => e.preventDefault();
// 		const startListener = (e: TouchEvent) => this.setState({ isTouch: true });
// 		const endListener = (e: TouchEvent) => {
// 			setTimeout(() => this.setState({ isTouch: false }), 100)
// 		};
// 		this.indexDom = document.body.getElementsByClassName('am-indexed-list-quick-search-bar')[0];
// 		this.indexDom.addEventListener('touchmove', moveListener, false);
// 		// this.indexDom.addEventListener('touchend', endListener, false);
// 		this.indexDom.addEventListener('touchstart', startListener, false);
// 	}

// 	/**
//  * @description IndexList TouchMove Current Index
//  */
// 	quick = (sectionID: any, topId?: any) => {
// 		clearTimeout(this.timer);
// 		this.setState({ currentIndex: sectionID || topId, isTouch: true });
// 		this.timer = setTimeout(() => this.setState({ isTouch: false }), 300);
// 	}

// 	/**
// 	 * @description ListView 每条数据函数
// 	 */
// 	renderRow = (rowData: any, sectionID: string | number, rowID: string | number) => {
// 		return this.props.renderRow
// 			? this.props.renderRow(rowData, sectionID, rowID)
// 			: (
// 				<div className="city" key={rowID}>
// 					{rowData}
// 				</div>
// 			)
// 	}

// 	public render() {
// 		const { dataSource, currentIndex, isTouch } = this.state;
// 		return (
// 			<div className="index-select" style={{ position: 'relative' }}>
// 				<ListView.IndexedList
// 					ref={ref => this.listViewRef = ref}
// 					dataSource={dataSource}
// 					className="am-list sticky-list"
// 					// @ts-ignore
// 					renderSectionWrapper={(sectionID: string | number) => (
// 						<StickyContainer
// 							key={`s_${sectionID}_c`}
// 							className="sticky-container"
// 							style={{ zIndex: 4 }}
// 						/>
// 					)}
// 					renderRow={this.renderRow}
// 					useBodyScroll
// 					renderSectionHeader={sectionData => (
// 						<Sticky>
// 							{({
// 								style,
// 							}) => (
// 									<div
// 										className="sticky"
// 										style={{
// 											...style,
// 											zIndex: 3,
// 											width: '100%',
// 											left: 0
// 										}}
// 									>{this.props.sectionHeader(sectionData) || sectionData}</div>
// 								)}
// 						</Sticky>
// 					)}
// 					quickSearchBarStyle={{
// 						color: '#333333',
// 						fontSize: '14px',
// 						zIndex: 10,
// 						top: '85px',
// 						...this.props.quickSearchBarStyle
// 					}}
// 					delayTime={10}
// 					onQuickSearch={this.quick}
// 				/>
// 				<div className="current-quick" style={{ display: isTouch && currentIndex ? '' : 'none' }}>
// 					{currentIndex}
// 				</div>
// 			</div>
// 		);
// 	}
// }
