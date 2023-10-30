import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import HomePage from "./HomePage";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import Account, { AccountType } from "./account/Account";

function MainBody() {
	return (
		<main>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Navigate to="/home" />} />
					<Route path="/home" element={<HomePage />} />
					<Route path="/user/signin" element={<SignInPage />} />
					<Route path="/user/signup" element={<SignUpPage />} />
					<Route path="/user" element={<Account accountType={AccountType.Customer} />} />
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