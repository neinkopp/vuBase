import {
	Accordion,
	AccordionActions,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	Grid,
	Typography,
} from "@material-ui/core";
import { PlayArrowOutlined } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";

interface VideoResultProps {
	videoId: string;
	title: string;
	description: string;
}

export const VideoResult: React.FC<VideoResultProps> = ({
	videoId,
	title,
	description,
}) => {
	return (
		<Grid item xs={12}>
			<Box>
				<Accordion>
					<AccordionSummary>
						<Typography variant="h6">{title}</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography variant="body1" component="pre">
							{description}
						</Typography>
					</AccordionDetails>
					<AccordionActions>
						<Button
							variant="contained"
							color="primary"
							component={React.forwardRef<HTMLAnchorElement>((props, ref) => (
								<Link
									to={`/video/${videoId}`}
									draggable={false}
									{...props}
									ref={ref as any}
								/>
							))}
							endIcon={<PlayArrowOutlined />}
						>
							Ansehen
						</Button>
					</AccordionActions>
				</Accordion>
			</Box>
		</Grid>
	);
};
