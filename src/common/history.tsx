/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-01-09 14:54:17
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-01-09 15:55:06
 */
import * as queryString from 'qs';

interface PropType {
	pathname: string;
	search?: string;
	hash?: string;
	state?: object;
}

export const HashHistory = (history: any, location: any) => {
	const urlParams: any = queryString.parse(location.search, { ignoreQueryPrefix: true });
	return {
		push: (params: PropType) => {
			const search = queryString.stringify({...urlParams, ...queryString.parse(params.search, { ignoreQueryPrefix: true })});
			history.push({
				...params,
				pathname: params.pathname,
				search
			});
		},
		go: (n: number) => history.go(n),
		replace: (params: PropType) => {
			const search = queryString.stringify({...urlParams, ...queryString.parse(params.search, { ignoreQueryPrefix: true })});
			history.replace({
				...params,
				pathname: params.pathname,
				search
			});
		},
		goForward: () => history.go(1),
		block: () => history.block(),
		goBack: () => history.goBack(),
	}
}