/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-02-13 09:23:11
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-02-18 13:44:20
 */

import React, { useState, useEffect, useMemo, useLayoutEffect } from "react";
import './index.less';
import { dateFormat } from 'src/common/utils';
import CountDown from 'src/component/count-down';
import logo from 'src/assets/images/logo.svg';
import { Button } from 'antd-mobile';

const NOW  = new Date();

const goList = () => {

}

export default function Dashboard(props) {
	const [time, setTime] = useState(NOW);
	const [countTime, setCountTime] = useState({minutes: 30, seconds: 0});
	useLayoutEffect(() => {
		const timer = setInterval(() => {
			setTime(new Date());
		}, 1000);
		return () => clearInterval(timer);
	}, []);
	const goList = () => {
		props.History.push({pathname: '/list'});
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
				<Button className="btn" onClick={goList}>List</Button>
			</div>
		</div>
	)
}

// export default class extends React.Component<any, any> {
// 	timer: any;
// 	constructor(props: any) {
// 		super(props);
// 		this.state = {
// 			time: new Date(),
// 			countTime: {
// 				minutes: 30,
// 				seconds: 0
// 			}
// 		}
// 	}

// 	componentDidMount() {
// 		this.timer = setInterval(() => this.setState({time: new Date()}), 1000);
// 	}

// 	componentWillUnmount() {
// 		clearInterval(this.timer);
// 	}

//   public render() {
// 		const { time, countTime } = this.state;
//     return (
//       <div className="dashboard">
//         <p className="dashboard-intro">
// 					{dateFormat(time)}
//         </p>
// 				<CountDown  format={{ minutes: ':', seconds: '' }} minutes={countTime.minutes} seconds={countTime.seconds} />
//       </div>
//     );
//   }
// }
