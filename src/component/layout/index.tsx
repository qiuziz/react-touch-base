/*
 * @Author: qiuz
 * @Date: 2018-05-24 15:28:32
 * */

import './index.less';

import * as React from 'react';
import { withRouter } from 'react-router-dom';

interface Props {
	History: any;
	displayFlag: any;
	currentPath: string;
	path: string;
}

@(withRouter as any)
export default class Layout extends React.Component<Props, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			bodyHeight: {height: '100%'},
			enter: ''
		}
	}
	

	onLeftClick = () => {
		this.props.History.go(-1);
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState ({enter: 'slide-in'});
		}, 0)
	}


  render () {
		const { path, displayFlag, children } = this.props;
		const pathLevel = path.split('/').length;
    return (
		<div className={`layout ${displayFlag ? (pathLevel <= 2 ? 'slide-in' : 'slide-in-leave') : 'slide-in-leave slide-in-leave-active'} ${this.state.enter}`}>
					<header></header>
					<main>
						{children}
					</main>
			</div>
    )
  }
}

