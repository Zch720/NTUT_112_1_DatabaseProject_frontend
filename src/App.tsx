import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import HomePage from "./HomePage";
import SignInPage from "./SignInPage";

function MainBody() {
	return (
		<main>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Navigate to="/home" />} />
					<Route path="/home" element={<HomePage />} />
					<Route path="/user/signin" element={<SignInPage />} />
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