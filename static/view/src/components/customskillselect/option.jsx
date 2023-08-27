import { PiStarFill } from "react-icons/pi";
import { components } from "@atlaskit/select";
import Lozenge from "@atlaskit/lozenge";
import { COLOR_SKILL_LEVEL } from "../../common/contants";
export default function CustomSkillOption({ children, ...props }) {
	var parts = children.split(" - ");
	if (parts.length == 1) return <span style={{margin: "10px"}}>{children}</span>;
	else if (parts.length == 2)
		return (
			<components.Option {...props}>
				<Lozenge
					key={parts[0] + "-" + parts[1]}
					style={{
						marginLeft: "8px",
						width: "100%",
						backgroundColor:
							COLOR_SKILL_LEVEL[parseInt(parts[1]) - 1].color,
						color: parseInt(parts[1]) === 1 ? "#091e42" : "white",
					}}
					isBold
					maxWidth="100%"
				>
					{parts[0].toUpperCase() + " - " + parts[1]}
					<PiStarFill />
				</Lozenge>
			</components.Option>
		);
}
