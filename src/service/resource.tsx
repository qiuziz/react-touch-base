/*
 * @Author: qiuz
 * @Date: 2018-05-24 19:24:46
 * */

import { fetchResource } from './fetchapi';
const API_HOST = '';
const SERVICE_NAME = '';

export const Resource = {

	// 洗车订单支付
	pay: fetchResource(`${API_HOST}${SERVICE_NAME}/v6_1/carwashStore/order`),

	// 代金券
	coupon: fetchResource(`${API_HOST}${SERVICE_NAME}/v6_1/personalCenter/getCashOrderVoucher`),

	// 再次支付
	aliPayAgain: fetchResource(`${API_HOST}${SERVICE_NAME}/v6_1/carwashStore/againPay`),

	// 查询洗车未支付订单详情
	orderDetail: fetchResource(`${API_HOST}${SERVICE_NAME}/v6_1/app/carWashOrder/:type`),

	// 邀请好友
	inviteFriend: fetchResource(`${API_HOST}${SERVICE_NAME}/v6_1/invite/:type`),

	/**
	 * 年检模块
	 */

	// 车辆列表、详情
	car: fetchResource(`${API_HOST}${SERVICE_NAME}/v6_1/personcar/:type`),

	// 查询年检正在进行中订单数量、年检下单、用户信息、订单详情、查询城市价格
	annualSurveyInfo: fetchResource(`${API_HOST}${SERVICE_NAME}/v6_1/app/review/:type`),

	// 支付
	asPay: fetchResource(`${API_HOST}${SERVICE_NAME}/v6_1/app/review/reviewOrder`),

	// 年检订单 详情、列表、退款
	asOrder: fetchResource(`${API_HOST}${SERVICE_NAME}/v6_1/app/review/order/:type`),

	// 退款原因
	refundReason: fetchResource(`${API_HOST}${SERVICE_NAME}/v6_1/app/carWashOrder/refundReason`),
	
	// 年检下单-可用优惠券
	asCoupon: fetchResource(`${API_HOST}${SERVICE_NAME}/v6_1/personalCenter/getTicketForService`),
	
	// 积分商城
	integral: fetchResource(`${API_HOST}${SERVICE_NAME}/v6_1/integral/:type`),

	// 任务
	task: fetchResource(`${API_HOST}${SERVICE_NAME}/v6_1/task/:type`),

	// 中奖名单
	award: fetchResource(`${API_HOST}${SERVICE_NAME}/v6_1/award/:type`),

	/**
	 * 道路救援
	 */
	// 支付
	rsPay: fetchResource(`${API_HOST}${SERVICE_NAME}/v6_1/driver/roadHelp/addRoadHelpOrder`),

	// 待评价订单
	evaluate: fetchResource(`${API_HOST}${SERVICE_NAME}/v6_1/storeEvaluate/:type`),
};
