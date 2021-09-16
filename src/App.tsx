import {
	createMuiTheme,
	CssBaseline,
	ThemeProvider,
	useMediaQuery,
} from "@material-ui/core";
import axios from "axios";
// import { Shadows } from "@material-ui/core/styles/shadows";
import React, { useEffect, useState } from "react";
import "./App.css";
import { SiteWrapper } from "./components/SiteWrapper/SiteWrapper";
interface AppProps {}

export const App: React.FC<AppProps> = () => {
	const preferredMode = useMediaQuery("(prefers-color-scheme: dark)");
	useEffect(() => {
		if (!localStorage.getItem("PREFERS_DARKMODE")) {
			localStorage.setItem("PREFERS_DARKMODE", preferredMode.toString());
		}
		setDarkMode(localStorage.getItem("PREFERS_DARKMODE") === "true");
	}, [preferredMode]);

	const [darkMode, setDarkMode] = useState<boolean>();

	const handleThemeChange = () => {
		if (typeof darkMode === "boolean") {
			const notDarkMode = !darkMode;
			setDarkMode(notDarkMode);
			const updateValue = notDarkMode.toString();
			localStorage.setItem("PREFERS_DARKMODE", updateValue);
		}
	};

	const yellow = {
		light: "#ffd74b",
		main: "#FFCE1F",
		dark: "#ffd74b",
		contrastText: "#fff",
	};

	const spaceCadet = {
		light: "#4b567c",
		main: "#1F2C5C",
		dark: "#151e40",
		contrastText: "#fff",
	};

	const theme = createMuiTheme({
		// shadows: Array(25).fill("none") as Shadows,
		palette: {
			primary: spaceCadet,
			secondary: yellow,
			type: darkMode ? "dark" : "light",
		},
		typography: {
			fontFamily: "'Inter', sans-serif",
		},
	});
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline>
				<SiteWrapper
					theme={theme}
					darkMode={darkMode}
					onDarkModeChange={handleThemeChange}
				/>
			</CssBaseline>
		</ThemeProvider>
	);
};
