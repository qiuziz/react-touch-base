/*
 * @Author: qiuz
 * @Date: 2018-05-24 15:28:32
 * */

import './index.less';

import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

interface Props {
	History: any;
	displayFlag: any;
	currentPath: string;
	path: string;
	children: any;
}

function Layout(props: Props) {
	const [enter, setEnter] = useState('');
	const { path, displayFlag, children } = props;
	const pathLevel = path.split('/').length;
	useEffect(() => {
		setEnter ('slide-in');
	})
	return (
		<div className={`layout ${displayFlag ? (pathLevel <= 2 ? 'slide-in' : 'slide-in-leave') : 'slide-in-leave slide-in-leave-active'} ${enter}`}>
				<header></header>
				<main>
					{children}
				</main>
		</div>
  )
}

// @ts-ignore
export default withRouter(Layout);
