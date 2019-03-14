/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2018-10-30 13:19:42
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-03-14 17:12:57
 */

import * as React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import Layout from "./component/layout";
import { HashHistory } from './common/history';
import Dashboard from './container/dashboard';
import List from './container/list';
import Detail from './container/detail';
import CityList from './container/city';

const routes = [
	{
		path: '/dashboard',
		Component: Dashboard,
		exact: true,
		Layout: Layout,
		title: 'react-touch-base',
		root: true
	},
	{
		path: '/list',
		Component: List,
		exact: false,
		Layout: Layout,
		title: 'list',
	},
	{
		path: '/list/detail',
		Component: Detail,
		exact: true,
		Layout: Layout,
		title: 'detail',
	},
	{
		path: '/city-select',
		Component: CityList,
		exact: true,
		Layout: Layout,
		title: 'city-select',
	},
];

const displayFlag = {};
const pathCheck = () => {
	let currentPath = window.location.hash.split('#')[1].split('?')[0];
	if(!currentPath || routes.map(i => i.path).indexOf(currentPath) < 0) {
		window.location.hash = '#/dashboard';
	}
	return currentPath;
};
const App = () => {
	return (
		<div className="aub-content">
			{
				routes.map(({ path, Layout, Component, exact, title, root }: any, index) => {
					displayFlag[path] = path === pathCheck();
					return (
								<Route key={index} path={path} exact={exact} render={
									(props: any) => {
										document.title = title;
										const { history, location } = props;
										const History = HashHistory(history, location);
										return (
											<Layout {...props} root={root} title={title} path={path} displayFlag={displayFlag[path]}>
												<Component {...props} History={History}/>
											</Layout>
										)
								}}
								/>
					)
				})
			}
		</div>
	)
}

// 由于利用了exact属性来做缓存，所以无法利用Rediret来做路由重定向，所以添加一个hashchange监听事件
const hashChange = () => {
	window.addEventListener('hashchange', pathCheck);
}
hashChange();

// react-router4 不再推荐将所有路由规则放在同一个地方集中式路由，子路由应该由父组件动态配置，组件在哪里匹配就在哪里渲染，更加灵活
export default class RouteConfig extends React.Component {

	render() {
		return (
			<HashRouter>
				<App />
			</HashRouter>
		)
	}
}