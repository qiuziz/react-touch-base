/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-02-13 09:23:11
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-02-13 09:46:59
 */

import React, { useState, useEffect } from "react";
import './index.less';
import { dateFormat } from 'src/common/utils';

export default function Dashboard() {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		setTime(new Date());
		const timer = setInterval(() => setTime(new Date()), 1000);
		return () => clearInterval(timer);
	})
	return (
		<div className="dashboard">
			<p className="dashboard-intro">
				{dateFormat(time)}
			</p>
		</div>
	)
}
