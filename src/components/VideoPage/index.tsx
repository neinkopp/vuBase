import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import short from "short-uuid";
import { SideBar } from "./SideBar";
import { Video } from "./Video";

interface VideoPageProps {
	videos: VideoN[] | null;
}

interface VideoN {
	uuid: string;
	title: string;
	desc: string;
	subject: {
		name: string;
	};
}

interface QueryParams {
	id: string;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			overflow: "hidden",
			paddingRight: theme.spacing(0),
			paddingLeft: theme.spacing(0),
			[theme.breakpoints.up("md")]: {
				padding: theme.spacing(1),
			},
			[theme.breakpoints.up("lg")]: {
				paddingRight: theme.spacing(12),
				paddingLeft: theme.spacing(12),
			},
		},
	})
);

export const VideoPage: React.FC<VideoPageProps> = ({ videos }) => {
	const hostName = window.location.hostname;
	const translator = short();

	const [playerKey, setPlayerKey] = useState(Math.random());

	const { id } = useParams<QueryParams>();
	const [redirectTo, setRedirectTo] = useState(false);
	const [longId, setLongId] = useState<string>(translator.toUUID(id));
	const [videoDetails, setVideoDetails] = useState<VideoN>();

	useEffect(() => {
		const translator = short();
		setPlayerKey(Math.random());
		setLongId(translator.toUUID(id));
		setVideoDetails(videos?.filter((video) => video.uuid === id)[0]);
	}, [id, videos]);

	useEffect(() => {
		if (Array.isArray(videos) && !videos?.some((el) => el.uuid === id)) {
			setRedirectTo(true);
		}
	}, [videos, id]);

	const classes = useStyles();

	if (redirectTo) {
		return <Redirect to="/" />;
	}

	return (
		<div style={{ padding: 5 }}>
			<section className={classes.root}>
				<Grid container spacing={2} style={{ display: "flex" }}>
					<Grid item md={8} xs={12} zeroMinWidth>
						<Video
							playerKey={playerKey}
							videoURL={`${process.env.REACT_APP_API_HOST}/videos/${longId}/playlist.m3u8`}
							title={videoDetails?.title}
							description={videoDetails?.desc}
							subject={videoDetails?.subject.name}
						/>
					</Grid>
					<Grid item md={4} xs={12} zeroMinWidth>
						<SideBar videos={videos} />
					</Grid>
				</Grid>
			</section>
		</div>
	);
};
