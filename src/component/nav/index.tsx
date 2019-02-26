/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-02-20 09:55:30
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-02-20 13:19:09
 */

import React, { useState, useEffect, useMemo, useLayoutEffect } from "react";
import './index.less';
import { NavBar, Icon } from 'antd-mobile';

export default function Nav(props: any) {

	const onLeftClick = () => {
		props.history.goBack();
	}
	return (
		<div className="nav-bar">
			<NavBar
	      mode="light"
	      icon={!props.root ? <Icon type="left" /> : ''}
	      onLeftClick={onLeftClick}
	      rightContent={[]}
    	>{props.title}</NavBar>
		</div>
	)
}
