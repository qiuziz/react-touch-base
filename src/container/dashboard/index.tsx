/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-02-13 09:23:11
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-03-14 17:07:22
 */

import React, { useState, useEffect, useMemo, useLayoutEffect } from "react";
import './index.less';
import { dateFormat } from 'src/common/utils';
import CountDown from 'src/component/count-down';
import logo from 'src/assets/images/logo.svg';
import { Button } from 'antd-mobile';

const NOW  = new Date();

export default function Dashboard(props) {
	const [time, setTime] = useState(NOW);
	const [countTime, setCountTime] = useState({minutes: 30, seconds: 0});
	useLayoutEffect(() => {
		const timer = setInterval(() => {
			setTime(new Date());
		}, 1000);
		return () => clearInterval(timer);
	}, []);
	const go = (path: string) => () => {
		props.History.push({pathname: path});
	}
	return (
		<div className="dashboard">
			<div className="header-logo">
				<img src={logo} className="logo" alt="logo" />
				<p className="title">React Touch Base</p>
			</div>
			
			<p className="now">
				Now: {dateFormat(time)}
			</p>
			<div className="count-down">
				30 minutes countdown <CountDown format={{ minutes: ':', seconds: '' }} minutes={countTime.minutes} seconds={countTime.seconds} />
			</div>

			<div className="content">
				<Button className="btn" onClick={go('/list')}>List</Button>
				<Button className="btn" onClick={go('/city-select')}>CitySelect</Button>
			</div>
		</div>
	)
}
