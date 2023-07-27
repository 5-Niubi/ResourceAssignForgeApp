import React from "react";
import InlineMessage from "@atlaskit/inline-message";
import Lozenge from "@atlaskit/lozenge";
import { COLOR_SKILL_LEVEL } from "../../../common/contants";
import { PiStarFill } from "react-icons/pi";

const InfoMessageColor = () => {
	return (
		<InlineMessage appearance="info" >
			<p>
				<h6>Levels go with color's rule</h6>
			</p>
			<p>
				{COLOR_SKILL_LEVEL?.map((skill, i) => (
					<span style={{ marginRight: "2px" }}>
						<Lozenge
							key={i}
							style={{
								marginLeft: "8px",
								backgroundColor:
									COLOR_SKILL_LEVEL[skill.level - 1].color,
								color: "white",
							}}
							isBold
						>
							LEVEL {skill.level}
							<PiStarFill />
						</Lozenge>
					</span>
				))}
			</p>
		</InlineMessage>
	);
};

export default InfoMessageColor;
