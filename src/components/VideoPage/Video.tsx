import {
	Box,
	Paper,
	Accordion,
	AccordionSummary,
	Typography,
	AccordionDetails,
} from "@material-ui/core";
import React from "react";
import { Player } from "./Player";

interface VideoProps {
	playerKey: number;
	videoURL: string;
	title: string | undefined;
	description: string | undefined;
	subject: string | undefined;
}

export const Video: React.FC<VideoProps> = ({
	videoURL,
	playerKey,
	title,
	description,
	subject,
}) => {
	return (
		<Box component={Paper}>
			<Player key={playerKey} videoURL={videoURL} />
			<Accordion>
				<AccordionSummary>
					<span
						style={{
							display: "flex",
							flexGrow: 1,
							justifyContent: "space-between",
							alignContent: "center",
						}}
					>
						<Typography variant="h6">{title}</Typography>
						<Typography variant="subtitle1">{subject}</Typography>
					</span>
				</AccordionSummary>
				<AccordionDetails>
					<Typography
						variant="body1"
						component="pre"
						style={{ whiteSpace: "pre-line" }}
					>
						{description}
					</Typography>
				</AccordionDetails>
			</Accordion>
		</Box>
	);
};
