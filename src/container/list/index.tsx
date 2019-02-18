/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-02-18 13:38:20
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-02-18 17:58:11
 */

import { ListView } from 'antd-mobile';
import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

function MyBody(props: any) {
  return (
    <div className="am-list-body my-body">
      <span style={{ display: 'none' }}>you can custom body wrap element</span>
      {props.children}
    </div>
  );
}

const data = [
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: 'Meet hotel',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: 'McDonald\'s invites you',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: 'Eat the week',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
];
const NUM_SECTIONS = 5;
const NUM_ROWS_PER_SECTION = 5;

const dataBlobs = {};
let sectionIDs = [];
let rowIDs = [];
function genData(pIndex = 0) {
  for (let i = 0; i < NUM_SECTIONS; i++) {
    const ii = (pIndex * NUM_SECTIONS) + i;
    const sectionName = `Section ${ii}`;
    sectionIDs.push(sectionName);
    dataBlobs[sectionName] = sectionName;
    rowIDs[ii] = [];

    for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
      const rowName = `S${ii}, R${jj}`;
      rowIDs[ii].push(rowName);
      dataBlobs[rowName] = rowName;
    }
  }
  sectionIDs = [...sectionIDs];
  rowIDs = [...rowIDs];
}
genData();

export default function List(props: any) {
	const lv = useRef(null);
	const getSectionData = (dataBlob: any, sectionID: any) => dataBlob[sectionID];
  const getRowData = (dataBlob: any, sectionID: any, rowID: any) => dataBlob[rowID];
	const [dataSource, setDataSource] = useState(new ListView.DataSource({
		getRowData,
		getSectionHeaderData: getSectionData,
		rowHasChanged: (row1: any, row2: any) => row1 !== row2,
		sectionHeaderHasChanged: (s1: any, s2: any) => s1 !== s2,
	}));

	const [pageIndex, setPageIndex] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);

	const [height, setHeight] = useState(document.documentElement.clientHeight * 3 / 4);
	useEffect(() => {
		console.log(lv);
		const hei = document.documentElement.clientHeight - (ReactDOM.findDOMNode(lv.current).parentNode as any).offsetTop;
    // simulate initial Ajax
    setTimeout(() => {
			setDataSource(dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs));
      setIsLoading(false);
      setHeight(hei);
    }, 600);
	}, [])
	const separator = (sectionID: any, rowID: any) => (
		<div
			key={`${sectionID}-${rowID}`}
			style={{
				backgroundColor: '#F5F5F9',
				height: 8,
				borderTop: '1px solid #ECECED',
				borderBottom: '1px solid #ECECED',
			}}
		/>
	);
	let index = data.length - 1;
	const row = (rowData: any, sectionID: any, rowID: any) => {
		if (index < 0) {
			index = data.length - 1;
		}
		const obj = data[index--];
		return (
			<div key={rowID} style={{ padding: '0 15px' }}>
				<div
					style={{
						lineHeight: '50px',
						color: '#888',
						fontSize: 18,
						borderBottom: '1px solid #F6F6F6',
					}}
				>{obj.title}</div>
				<div style={{ display: 'flex', padding: '15px 0' }}>
					<img style={{ height: '64px', marginRight: '15px' }} src={obj.img} alt="" />
					<div style={{ lineHeight: 1 }}>
						<div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{obj.des}</div>
						<div><span style={{ fontSize: '30px', color: '#FF6E27' }}>35</span>¥ {rowID}</div>
					</div>
				</div>
			</div>
		);
	};

	const onEndReached = (event: any) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
		if (isLoading || !hasMore) {
      return;
    }
    console.log('reach end', event);
    setIsLoading(true);
    setTimeout(() => {
			if (pageIndex > 1) {
				setHasMore(false);
				setIsLoading(false);
			}
			setPageIndex(pageIndex => {
				genData(pageIndex + 1);
				return pageIndex + 1;
			});
			setDataSource(dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs));
			setIsLoading(false);
    }, 1000);
	}
	return (
			<ListView
				ref={lv}
				dataSource={dataSource}
				renderHeader={() => <span>header</span>}
				renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
					{isLoading ? 'Loading...' : 'Loaded'}
				</div>)}
				renderSectionHeader={sectionData => (
					<div>{`Task ${sectionData.split(' ')[1]}`}</div>
				)}
				renderBodyComponent={() => <MyBody />}
				renderRow={row}
				renderSeparator={separator}
				style={{
					height: height,
					overflow: 'auto',
				}}
				pageSize={4}
				onScroll={() => { console.log('scroll'); }}
				scrollRenderAheadDistance={500}
				onEndReached={onEndReached}
				onEndReachedThreshold={10}
			/>
		);
}
