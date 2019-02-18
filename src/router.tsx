/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2018-10-30 13:19:42
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-02-18 20:43:36
 */

import * as React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import Layout from "./component/layout";
import { HashHistory } from './common/history';
import Dashboard from './container/dashboard';
import List from './container/list';
import Detail from './container/detail';

const routes = [
	{
		path: '/dashboard',
		Component: Dashboard,
		// exact: true,
		Layout: Layout,
		title: 'react-touch-base',
	},
	{
		path: '/list',
		Component: List,
		// exact: false,
		Layout: Layout,
		title: 'list',
	},
	{
		path: '/list/detail',
		Component: Detail,
		// exact: true,
		Layout: Layout,
		title: 'detail',
	},
];

const displayFlag = {};

const App = () => {
	return (
		<div>
			{
				routes.map(({ path, Layout, Component, exact, title, local, color, padding }: any, index) => {
					let currentPath = window.location.hash.split('#')[1].split('?')[0];
					displayFlag[path] = currentPath === path;
					console.log(displayFlag);
					return (
					<Route key={index} path={path} exact={exact} render={
						(props: any) => {
							document.title = title;
							const { history, location } = props;
							const History = HashHistory(history, location);
							return (
								<Layout {...props} displayFlag={displayFlag[path]}>
									<Component {...props} History={History}/>
								</Layout>
							)
					}}
					/>
					)
				})
			}
			<Redirect to="/dashboard" />
		</div>
	)
}

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