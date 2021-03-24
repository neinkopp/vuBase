import { TextField, InputAdornment, Theme, IconButton } from '@material-ui/core';
import { Close, Search } from '@material-ui/icons';
import React from 'react'

interface SearchBarProps {
	label: string
	theme: Theme
	value: string
	onSearchChange: (data: string) => void
}

export const SearchBar: React.FC<SearchBarProps> = ({ label, theme, value, onSearchChange }) => {
	return (
		<TextField
			label={label}
			fullWidth
			color={theme.palette.type === "light" ? "primary" : "secondary"}
			value={value}
			onChange={e => onSearchChange(e.target.value)}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<IconButton onClick={() => onSearchChange("")}>
							<Close />
						</IconButton>
						<Search style={{ cursor: "default" }} />
					</InputAdornment>
				),
			}}
			variant="outlined"
		/>
	);
}