import {
	Box,
	Container,
	createStyles,
	Grid,
	makeStyles,
	Paper,
	Theme,
	Typography,
	useTheme,
} from "@material-ui/core";
import React, { useState } from "react";
import { SearchBar } from "../SearchBar";
import { VideoResult } from "./VideoResult";

interface StartPageProps {
	videos: Video[] | null;
	roomName: string | undefined;
}

interface Video {
	uuid: string;
	title: string;
	desc: string;
}

export const StartPage: React.FC<StartPageProps> = ({ videos, roomName }) => {
	const [searchInput, setSearchInput] = useState<string>("");

	const filteredVideos = videos?.filter((video) => {
		return video.title.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1;
	});

	const useStyles = makeStyles(({ palette }: Theme) =>
		createStyles({
			welcomePaper: {
				backgroundColor: palette.primary.main,
			},
		})
	);

	const classes = useStyles();
	const theme = useTheme();

	return (
		<Container maxWidth="md">
			<Box m={3} />
			<Grid container component={Box} spacing={1}>
				<Grid item xs={12}>
					<Box
						p={5}
						my={1}
						className={classes.welcomePaper}
						component={(props) => <Paper variant="outlined" {...props} />}
						border={"1px solid #fff"}
					>
						{roomName ? (
							<Typography
								variant="h5"
								style={{
									color: theme.palette.primary.contrastText,
								}}
							>
								Willkommen im Kurs <strong>{roomName}</strong>!
							</Typography>
						) : null}
					</Box>
				</Grid>
				<Box m={1} />
				<Grid item xs={12}>
					<SearchBar
						label="Nach Video suchen"
						theme={theme}
						value={searchInput}
						onSearchChange={(value) => setSearchInput(value)}
					/>
				</Grid>
				{filteredVideos
					? filteredVideos.map((d) => {
							return (
								<VideoResult
									key={d.uuid}
									title={d.title}
									description={d.desc}
									videoId={d.uuid}
								/>
							);
					  })
					: null}
				{process.env.REACT_APP_API_HOST}
			</Grid>
		</Container>
	);
};
