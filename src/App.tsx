import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Header from "./utils/Header";
import Footer from "./utils/Footer";
import HomePage from "./home/HomePage";
import SignInPage from "./account/signin/SignInPage";
import SignUpPage from "./account/signup/SignUpPage";
import Account from "./account/Account";
import AccountProfile from "./account/AccountProfile";
import AccountFollowedShops from "./account/customer/AccountFollowedShops";
import AccountOrders from "./account/customer/AccountOrders";
import AccountCoupons from "./account/customer/AccountCoupons";
import ShopProfile from "./account/staff/ShopProfile";
import ShopProducts from "./account/staff/ShopProducts";
import ShopCoupons from "./account/staff/ShopCoupons";
import ProductProfile from "./shop/ProductProfile";
import CouponProfile from "./shop/CouponProfile";
import SellReport from "./shop/SellReport";
import AccountManage from "./account/admin/AccountManage";
import AccountManagementInfo from "./account/admin/AccountInfo";
import ShopManage from "./account/admin/ShopManage";
import ShopManagementInfo from "./account/admin/ShopInfo";
import ShopProductManagementInfo from "./account/admin/ShopProductInfo";
import ShopStaffManagementInfo from "./account/admin/ShopStaffInfo";

function MainBody() {
	return (
		<main>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Navigate to="/home" />} />
					<Route path="/home" element={<HomePage />} />
					<Route path="/user/signin" element={<SignInPage />} />
					<Route path="/user/signup" element={<SignUpPage />} />
					<Route path="/user" element={<Account />}>
						<Route path="/user" element={<Navigate to="/user/profile" />} />
						<Route path="/user/profile" element={<AccountProfile userLoginId="" userName="" userAddress="" userEmail="" userPhoneNumber="" />} />
						<Route path="/user/followed-shops" element={<AccountFollowedShops />} />
						<Route path="/user/orders" element={<AccountOrders />} />
						<Route path="/user/coupons" element={<AccountCoupons />} />
						<Route path="/user/shop-profile" element={<ShopProfile />} />
						<Route path="/user/shop-products" element={<ShopProducts />} />
						<Route path="/user/shop-coupons" element={<ShopCoupons />} />
						<Route path="/user/shop-report" element={<SellReport />} />
						<Route path="/user/admin/account-manage" element={<AccountManage />} />
						<Route path="/user/admin/account-info" element={<AccountManagementInfo />} />
						<Route path="/user/admin/shop-manage" element={<ShopManage />} />
						<Route path="/user/admin/shop-info" element={<ShopManagementInfo />} />
						<Route path="/user/admin/shop-product-info" element={<ShopProductManagementInfo />} />
						<Route path="/user/admin/shop-staff-info" element={<ShopStaffManagementInfo />} />
					</Route>
					<Route path="/shop" element={<Account />}>
						<Route path="/shop/product" element={<ProductProfile />} />
						<Route path="/shop/coupon" element={<CouponProfile />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</main>
	);
}

function App() {
	return (
		<React.Fragment>
			<Header />
			<MainBody />
			<Footer />
		</React.Fragment>
	)
}

export default App;