import React from 'react';
import ReactPlayer from 'react-player';
import "./Player.css";

interface PlayerProps {
	videoURL: string
}

export const Player: React.FC<PlayerProps> = ({ videoURL }) => {

	const handleError = (error: string, data: Object) => {
		console.log(error);
		console.log(data);
	};

	return (
		<div className="">
			<div className="dls-player-wrapper">
				<ReactPlayer
					className="dls-player"
					url={videoURL}
					controls={true}
					onError={handleError}
					config={{
						file: {
							hlsOptions: {
								xhrSetup: function (xhr: any, url: any) {
									xhr.withCredentials = true; // do send cookies
								},
							},
						},
					}}
				/>
			</div>
		</div>
	);
}