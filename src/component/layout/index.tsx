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
		// console.log(this.props.displayFlag)
		// this.props.displayFlag
		// ? Move(`.${this.props.currentPath}`).ease('in').x('-100%').end()
		// : Move(`.${this.props.currentPath}`).ease('in').x(100).end()
		setTimeout(() => {
			this.setState ({enter: 'slide-in'});
		},0)
	}

	componentWillUnmount() {
		console.log(111)
		this.setState ({enter: ''});
	}

  render () {
    return (
		<div className={`layout ${this.props.displayFlag ? 'slide-in-leave' : 'slide-in-leave slide-in-leave-active'} ${this.state.enter}`}>
					<header></header>
					<main>
						{this.props.children}
					</main>
			</div>
    )
  }
}

