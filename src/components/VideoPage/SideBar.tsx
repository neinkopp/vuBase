import { Box, List, Paper, useTheme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SearchBar } from "../SearchBar";
import { VideoList } from "./VideoList";

interface QueryParams {
	id: string;
}

interface SideBarProps {
	videos: Video[] | null;
}

interface Video {
	uuid: string;
	title: string;
	desc: string;
	subject: {
		name: string;
	};
}

export const SideBar: React.FC<SideBarProps> = ({ videos }) => {
	const [searchInput, setSearchInput] = useState<string>("");
	const [currentVideoId, setCurrentVideoId] = useState<string>("");

	const { id } = useParams<QueryParams>();

	useEffect(() => {
		setCurrentVideoId(id);
		setSearchInput("");
	}, [id]);

	const filteredVideos = videos?.filter((video) => {
		return (
			video.title.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1 &&
			video.uuid !== currentVideoId
		);
	});

	const theme = useTheme();

	const listItemBuilder = filteredVideos
		? filteredVideos.map((d) => {
				return (
					<VideoList
						key={d.uuid}
						title={d.title}
						description={d.desc}
						subject={d.subject.name}
						videoId={d.uuid}
						theme={theme}
					/>
				);
		  })
		: null;

	return (
		<section>
			<Paper style={{ minHeight: "100%" }}>
				<Box p={1}>
					<SearchBar
						label="Nach Video suchen"
						theme={theme}
						onSearchChange={(d) => setSearchInput(d)}
						value={searchInput}
					/>
				</Box>
				<List>{listItemBuilder}</List>
			</Paper>
		</section>
	);
};
