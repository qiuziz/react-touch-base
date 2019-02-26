/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2018-10-30 13:19:42
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-02-26 17:58:23
 */

import * as React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import Layout from "./component/layout";
import { HashHistory } from './common/history';
import Dashboard from './container/dashboard';
import List from './container/list';
import Detail from './container/detail';
import Nav from './component/nav';

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
];

const displayFlag = {};

const App = () => {
	return (
		<div>
			{
				routes.map(({ path, Layout, Component, exact, title, root }: any, index) => {
					let currentPath = window.location.hash.split('#')[1].split('?')[0];
					displayFlag[path] = currentPath === path;
					let pathDefault = path;
					if (!currentPath) {
						pathDefault = '/dashboard';
					}
					return (
								<Route key={index} path={pathDefault} exact={exact} render={
									(props: any) => {
										document.title = title;
										const { history, location } = props;
										const History = HashHistory(history, location);
										return (
											<Layout {...props} path={pathDefault} displayFlag={displayFlag[pathDefault]}>
												<Nav {...props} title={title} root={root} />
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
	window.addEventListener('hashchange', () => {
		let currentPath = window.location.hash.split('#')[1].split('?')[0];
		if(!currentPath || routes.map(i => i.path).indexOf(currentPath) < 0) {
			window.location.hash = '#/dashboard';
		}
	});
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