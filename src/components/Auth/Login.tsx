import {
	Avatar,
	Button,
	Container,
	CssBaseline,
	makeStyles,
	TextField,
	Typography,
	useTheme,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import React, { useState } from "react";

interface LoginProps {
	onLoginTry: (data: boolean) => void;
}

interface Credentials {
	room: string;
	password: string;
}

export const Login: React.FC<LoginProps> = ({ onLoginTry }) => {
	const [hostName] = useState(window.location.hostname);
	const [credentials, setCredentials] = useState<Credentials>({
		room: "",
		password: "",
	});
	const [error, setError] = useState(false);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		axios
			.post(`${process.env.REACT_APP_API_HOST}/auth/login`, credentials)
			.then((result) => {
				if (result.data.loggedIn === true) {
					onLoginTry(true);
				} else {
					setError(true);
					console.log("There was an error.");
				}
			})
			.catch((e) => {
				if (e.response.status === 401) {
					setError(true);
				}
			});
	};

	const useStyles = makeStyles((theme) => ({
		paper: {
			marginTop: theme.spacing(8),
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
		},
		avatar: {
			margin: theme.spacing(1),
			backgroundColor: theme.palette.secondary.main,
		},
		form: {
			width: "100%", // Fix IE 11 issue.
			marginTop: theme.spacing(1),
		},
		errorText: {
			color: "red",
		},
		submit: {
			margin: theme.spacing(3, 0, 2),
		},
	}));

	const theme = useTheme();
	const classes = useStyles();

	return (
		<div>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlined />
					</Avatar>
					<Typography component="h1" variant="h5">
						Im Kursraum anmelden
					</Typography>
					<form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
						<TextField
							value={credentials.room}
							onChange={(e) =>
								setCredentials({
									...credentials,
									room: e.target.value,
								})
							}
							color={theme.palette.type === "light" ? "primary" : "secondary"}
							error={error ? true : false}
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="room"
							label="Kursraum"
							name="room"
							autoComplete="username"
							autoFocus
						/>
						<TextField
							value={credentials.password}
							onChange={(e) =>
								setCredentials({
									...credentials,
									password: e.target.value,
								})
							}
							color={theme.palette.type === "light" ? "primary" : "secondary"}
							error={error ? true : false}
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Passwort"
							type="password"
							id="password"
							autoComplete="current-password"
						/>
						{error ? (
							<Alert severity="error">
								Ungültiger Kursname oder falsches Passwort
							</Alert>
						) : null}
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Anmelden
						</Button>
					</form>
				</div>
			</Container>
		</div>
	);
};
