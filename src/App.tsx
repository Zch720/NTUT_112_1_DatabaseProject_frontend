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
import ShopProductProfile from "./account/staff/ProductProfile";
import ShopCouponProfile from "./account/staff/CouponProfile";
import ShopSellReport from "./account/staff/SellReport";
import AccountManage from "./account/admin/AccountManage";
import AccountManagementInfo from "./account/admin/AccountInfo";
import ShopManage from "./account/admin/ShopManage";
import ShopManagementInfo from "./account/admin/ShopInfo";
import ShopProductManagementInfo from "./account/admin/ShopProductInfo";
import ShopStaffManagementInfo from "./account/admin/ShopStaffInfo";
import ProductsPage from "./product/ProductsPage";
import ProductListView from "./product/ProductListView";
import ShopsPage from "./shop/ShopsPage";
import ShopPage from "./shop/ShopPage";
import ProductPage from "./product/ProductPage";
import AccountOrderInfo from "./account/customer/AccountOrderInfo";
import ShopOrders from "./account/staff/ShopOrders";
import ShopOrderProfile from "./account/staff/StaffOrderProfile";
import ShoppingCart from "./shopping_cart/ShoppingCart";
import CheckoutPage from "./checkout/CheckoutPage";

function MainBody() {
	return (
		<main>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Navigate to="/home" />} />
					<Route path="/home" element={<HomePage />} />
					<Route path="/products" element={<ProductsPage />}>
						<Route path="/products" element={<ProductListView productType="all"/>} />
						<Route path="/products/chocolate-cookie" element={<ProductListView productType="chocolate-cookie" />} />
						<Route path="/products/butter-cookie" element={<ProductListView productType="butter-cookie" />} />
						<Route path="/products/sandwich-cookie" element={<ProductListView productType="sandwich-cookie" />} />
						<Route path="/products/cookies" element={<ProductListView productType="cookies" />} />
						<Route path="/products/soft-cookie" element={<ProductListView productType="soft-cookie" />} />
						<Route path="/products/roll-puff-pastry" element={<ProductListView productType="roll-puff-pastry" />} />
						<Route path="/products/egg-roll" element={<ProductListView productType="egg-roll" />} />
						<Route path="/products/other" element={<ProductListView productType="other" />} />
					</Route>
					<Route path="/shops" element={<ShopsPage />} />
					<Route path="/user/signin" element={<SignInPage />} />
					<Route path="/user/signup" element={<SignUpPage />} />
					<Route path="/user" element={<Account />}>
						<Route path="/user" element={<Navigate to="/user/profile" />} />
						<Route path="/user/profile" element={<AccountProfile />} />
						<Route path="/user/followed-shops" element={<AccountFollowedShops />} />
						<Route path="/user/orders" element={<AccountOrders />} />
						<Route path="/user/order" element={<AccountOrderInfo />} />
						<Route path="/user/coupons" element={<AccountCoupons />} />
						<Route path="/user/shop/profile" element={<ShopProfile />} />
						<Route path="/user/shop/products" element={<ShopProducts />} />
						<Route path="/user/shop/product" element={<ShopProductProfile />} />
						<Route path="/user/shop/orders" element={<ShopOrders />} />
						<Route path="/user/shop/order" element={<ShopOrderProfile />} />
						<Route path="/user/shop/coupons" element={<ShopCoupons />} />
						<Route path="/user/shop/coupon" element={<ShopCouponProfile />} />
						<Route path="/user/shop/report" element={<ShopSellReport />} />
						<Route path="/user/admin/account-manage" element={<AccountManage />} />
						<Route path="/user/admin/account-info" element={<AccountManagementInfo />} />
						<Route path="/user/admin/shop-manage" element={<ShopManage />} />
						<Route path="/user/admin/shop-info" element={<ShopManagementInfo />} />
						<Route path="/user/admin/shop-product-info" element={<ShopProductManagementInfo />} />
						<Route path="/user/admin/shop-staff-info" element={<ShopStaffManagementInfo />} />
					</Route>
					<Route path="/shop" element={<ShopPage />}>
						<Route path="/shop" element={<ProductListView productType="all" />} />
						<Route path="/shop/chocolate-cookie" element={<ProductListView productType="chocolate-cookie" />} />
						<Route path="/shop/butter-cookie" element={<ProductListView productType="butter-cookie" />} />
						<Route path="/shop/sandwich-cookie" element={<ProductListView productType="sandwich-cookie" />} />
						<Route path="/shop/cookies" element={<ProductListView productType="cookies" />} />
						<Route path="/shop/soft-cookie" element={<ProductListView productType="soft-cookie" />} />
						<Route path="/shop/roll-puff-pastry" element={<ProductListView productType="roll-puff-pastry" />} />
						<Route path="/shop/egg-roll" element={<ProductListView productType="egg-roll" />} />
						<Route path="/shop/other" element={<ProductListView productType="other" />} />
					</Route>
					<Route path="/product" element={<ProductPage />} />
					<Route path="/user/shopping-cart" element={<ShoppingCart />} />
					<Route path="/user/checkout" element={<CheckoutPage />} />
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