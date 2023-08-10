import React from "react";

import InlineMessage from "@atlaskit/inline-message";

const InstructionMessage = ({ content }) => {
	return (
		<InlineMessage appearance="info">
			<p>
				<strong>INFORMATION</strong>
			</p>
			<p>{content}</p>
		</InlineMessage>
	);
};

export default InstructionMessage;
