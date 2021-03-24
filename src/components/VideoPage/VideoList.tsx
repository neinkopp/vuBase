import {
	Avatar,
	Box,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Theme,
} from "@material-ui/core";
import { PlayArrowOutlined } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";

interface Lesson {
	abbr: string;
	bgColor: string;
}

interface VideoListProps {
	videoId: string;
	title: string;
	description: string;
	subject: string;
	lesson?: Lesson | false;
	theme: Theme;
}

export const VideoList: React.FC<VideoListProps> = ({
	videoId,
	lesson,
	title,
	description,
	subject,
	theme,
}) => {
	let shortDesc =
		description.length > 70 ? description.substr(0, 70) + "..." : description;
	return (
		<Box mt={1} p={1}>
			<ListItem
				alignItems="flex-start"
				button
				component={Link}
				to={`/video/${videoId}`}
				style={{
					padding: "1em",
					border: "1px solid #88888840",
					borderRadius: "0.25em",
				}}
			>
				<ListItemAvatar>
					{lesson ? (
						<Avatar style={{ color: "#fff", backgroundColor: lesson.bgColor }}>
							{lesson.abbr}
						</Avatar>
					) : (
						<Avatar
							style={{
								backgroundColor: theme.palette.primary.main,
								color: theme.palette.secondary.main,
							}}
						>
							<PlayArrowOutlined />
						</Avatar>
					)}
				</ListItemAvatar>
				<ListItemText primary={title} secondary={subject + " · " + shortDesc} />
			</ListItem>
		</Box>
	);
};
