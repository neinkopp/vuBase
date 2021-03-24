import { Button } from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import React from "react";

interface LogoutProps {
	onLogout: () => void;
}

export const Logout: React.FC<LogoutProps> = ({ onLogout }) => {
	return (
		<Button
			variant="text"
			style={{ color: "white" }}
			startIcon={<LockOutlined />}
			onClick={() => onLogout()}
		>
			Abmelden
		</Button>
	);
};
