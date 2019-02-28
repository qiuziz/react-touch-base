/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2018-11-17 14:09:46
 * @Last Modified by: qiuz
 * @Last Modified time: 2018-12-21 11:15:59
 */

import './index.less';

import React, { useState, useEffect, useLayoutEffect } from "react";
import classNames from 'classnames';

interface propTypes {
  className?: Array<any> | string;
  isCard?: boolean;
  isShowDay?: boolean;
  format: {
    day?: string;
    hours?: string;
    minutes?: string;
    seconds: string;
  },
  day?: number;
  hours?: number;
  minutes?: number;
  seconds: number;
  onTimeUp?: (...args: any) => void
}

function formatNum(num: number) {
	return num <= 9 ? `0${num}` : `${num}`
}

const defaultProps = {
	className: '',
	isCard: false,
	isShowDay: false,
	format: {
		day: '',
		hours: '',
		minutes: '',
		seconds: ''
	},
	day: 0,
	hours: 0,
	minutes: 0,
	seconds: 0,
	onTimeUp: () => {}
}


const CountDown = React.memo((props: propTypes = defaultProps) => {
	const data = { ...defaultProps, ...props };
	let { day, hours, minutes, seconds, isCard, className, format, isShowDay } = data;
	let sumSeconds = (day * 60 * 60 * 24) + (hours * 60 * 60) + (minutes * 60) + seconds;
	const [state, setState] = useState({day, hours, minutes, seconds});
	useLayoutEffect(() => {
		const timer = setInterval(() => {
			if (sumSeconds >= 0) {
				const
					d = Math.floor(sumSeconds / (60 * 60 * 24)),
					h = Math.floor(sumSeconds / (60 * 60)) - (d * 24),
					m = Math.floor(sumSeconds / 60) - (d * 24 * 60) - (h * 60),
					s = Math.floor(sumSeconds) - (d * 24 * 60 * 60) - (h * 60 * 60) - (m * 60);
				setState({ day: d, hours: h, minutes: m, seconds: s });
			}
			sumSeconds--;
			if (sumSeconds < 0) {
				clearInterval(timer);
				data.onTimeUp();
			}
		}, 1000);
		return () => clearInterval(timer);
	}, [sumSeconds])

  return (
    <div
      className={
        classNames({
          'cmp-count-down': true,
          'cmp-count-down--card': isCard
        }, className)}
    >
      {
        isShowDay
          ? <div className='cmp-count-down__item'>
            <div className='cmp-count-down__time-box'>
              <span className='cmp-count-down__time'>
                {formatNum(state.day)}
              </span>
            </div>
            <span className='cmp-count-down__separator'>{format.day}</span>
          </div>
          : null
      }
      {
        format.hours &&
        <div className='cmp-count-down__item'>
          <div className='cmp-count-down__time-box'>
            <span className='cmp-count-down__time'>
              {formatNum(state.hours)}
            </span>
          </div>
          <span className='cmp-count-down__separator'>{format.hours}</span>
        </div>
      }
      {
        format.minutes &&
        <div className='cmp-count-down__item'>
          <div className='cmp-count-down__time-box'>
            <span className='cmp-count-down__time'>
              {formatNum(state.minutes)}
            </span>
          </div>
          <span className='cmp-count-down__separator'>{format.minutes}</span>
        </div>
      }
      <div className='cmp-count-down__item'>
        <div className='cmp-count-down__time-box'>
          <span className='cmp-count-down__time'>
            {formatNum(state.seconds)}
          </span>
        </div>
        <span className='cmp-count-down__separator'>{format.seconds}</span>
      </div>
    </div>
  )
});

export default CountDown;
