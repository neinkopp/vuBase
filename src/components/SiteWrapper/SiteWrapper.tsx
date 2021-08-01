import {
	AppBar,
	Box,
	IconButton,
	SvgIcon,
	Theme,
	Toolbar,
	Tooltip,
	Typography,
} from "@material-ui/core";
import {
	Brightness3Outlined,
	Brightness7Outlined,
	HomeOutlined,
} from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Link as MuiLink } from "@material-ui/core";
import { Login } from "../Auth/Login";
import { Logout } from "../Auth/Logout";
import { StartPage } from "../StartPage";
import { VideoPage } from "../VideoPage";

interface SiteWrapperProps {
	theme: Theme;
	darkMode: boolean | undefined;
	onDarkModeChange: () => void;
}

interface Video {
	uuid: string;
	title: string;
	desc: string;
	subject: {
		name: string;
	};
}

export const SiteWrapper: React.FC<SiteWrapperProps> = ({
	theme,
	darkMode,
	onDarkModeChange,
}) => {
	axios.defaults.withCredentials = true;
	const location = useLocation();

	const [isAuth, setIsAuth] = useState<boolean>();
	const [roomName, setRoomName] = useState<string | false>();
	const [serverError, setServerError] = useState<boolean>(false);
	const fetchApiData = React.useCallback(() => {
		axios
			.get(`${process.env.REACT_APP_API_HOST}/auth`)
			.then((result) => {
				if (result.data.authorized) {
					setIsAuth(result.data.authorized);
					setRoomName(result.data.roomName);
					axios
						.get(`${process.env.REACT_APP_API_HOST}/videos`)
						.then((response) => {
							setVideoList(response.data);
							setServerError(false);
						});
				} else {
					setIsAuth(false);
					setRoomName(false);
					setServerError(false);
				}
			})
			.catch((e) => {
				console.log(e);
				setIsAuth(false);
				setServerError(true);
			});
	}, []);

	useEffect(() => fetchApiData(), [fetchApiData]);

	useEffect(() => fetchApiData(), [fetchApiData, isAuth]);

	const logout = () => {
		axios
			.get(`${process.env.REACT_APP_API_HOST}/auth/logout`)
			.then((result) => {
				setIsAuth(!result.data.loggedOut);
			});
		setVideoList(null);
	};

	const [videolist, setVideoList] = useState<Video[] | null>(null);
	return (
		<div style={{ minHeight: "100%" }}>
			<AppBar position="static">
				<Toolbar>
					<SvgIcon fontSize="large">
						<path d="M0 0h24v24H0V0z" fill="none" id="path2" />
						<path
							d="m 11.983051,6 c 3.79,0 7.17,2.13 8.82,5.5 -1.65,3.37 -5.03,5.5 -8.82,5.5 -3.7900001,0 -7.1700001,-2.13 -8.8200001,-5.5 1.65,-3.37 5.03,-5.5 8.8200001,-5.5 m 0,-2 C 6.9830509,4 2.7130509,7.11 0.98305087,11.5 2.7130509,15.89 6.9830509,19 11.983051,19 c 5,0 9.27,-3.11 11,-7.5 -1.73,-4.39 -6,-7.5 -11,-7.5 z"
							id="path4"
						/>
						<path
							d="m 13.7487,9.7275 h -3.5412 v 3.5412 h 3.5412 z m -1.1804,2.3608 h -1.1804 v -1.1804 h 1.1804 z m 4.7216,-1.1804 V 9.7275 H 16.1095 V 8.5471 c 0,-0.6492 -0.5312,-1.1803 -1.1804,-1.1803 H 13.7487 V 5 H 12.5684 V 7.3668 H 11.388 V 5 H 10.2 V 7.3668 H 9.0271 c -0.6492,0 -1.1803,0.5311 -1.1803,1.1803 V 9.7275 H 6.6664 v 1.1804 h 1.1804 v 1.1804 H 6.6664 v 1.1804 h 1.1804 v 1.1804 c 0,0.6493 0.5312,1.1804 1.1804,1.1804 h 1.1804 V 18 h 1.1804 v -2.36 h 1.192 v 2.3705 h 1.1316 V 15.64 h 1.1804 c 0.6493,0 1.1804,-0.5312 1.1804,-1.1804 v -1.1804 h 1.1804 v -1.1804 h -1.1804 v -1.1804 z m -2.3608,3.5412 h -5.902 v -5.902 h 5.902 z"
							id="path14"
						/>
					</SvgIcon>
					<Box mr={1} />
					<Typography variant="h6">vuBase</Typography>
					<span style={{ flexGrow: 1 }} />

					{isAuth && location.pathname !== "/" ? (
						<IconButton component={Link} to={`/`} draggable={false}>
							<HomeOutlined
								style={{ color: theme.palette.primary.contrastText }}
							/>
						</IconButton>
					) : null}
					<IconButton
						style={{ marginLeft: 5, marginRight: 10 }}
						onClick={() => {
							onDarkModeChange();
						}}
					>
						{darkMode ? (
							<Brightness3Outlined
								style={{ color: theme.palette.primary.contrastText }}
							/>
						) : (
							<Brightness7Outlined
								style={{ color: theme.palette.primary.contrastText }}
							/>
						)}
					</IconButton>
					{isAuth ? <Logout onLogout={() => logout()} /> : null}
				</Toolbar>
			</AppBar>
			{isAuth !== false && roomName !== false ? (
				<Switch>
					<Route exact path="/">
						<StartPage
							roomName={roomName}
							videos={videolist}
							onLoad={fetchApiData}
						/>
					</Route>
					<Route exact path="/video/:id">
						<VideoPage videos={videolist} />
					</Route>
					<Redirect from="*" to="/" />
				</Switch>
			) : (
				<Login onLoginTry={() => setIsAuth(true)} serverError={serverError} />
			)}
			<Box
				bottom={0}
				left={0}
				textAlign="center"
				width="100%"
				position="absolute"
				p={1}
			>
				<Tooltip
					arrow
					placement="top"
					title="© 2021. Alle Videorechte vorbehalten."
				>
					<Typography variant="subtitle2">
						Created with ♡ by{" "}
						<MuiLink
							color="inherit"
							href="https://github.com/neinkopp"
							target="_blank"
							rel="noreferrer"
						>
							Jakob Schleitzer
						</MuiLink>
					</Typography>
				</Tooltip>
			</Box>
		</div>
	);
};
