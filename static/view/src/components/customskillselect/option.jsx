import { PiStarFill } from "react-icons/pi";
import { components } from "@atlaskit/select";
import Lozenge from "@atlaskit/lozenge";
import { COLOR_SKILL_LEVEL } from "../../common/contants";
export default function CustomSkillOption({ children, ...props }){ 
	return (
		<components.Option {...props}>
			<Lozenge
				key={children.id + "-" + children.level}
				style={{
					marginLeft: "8px",
					backgroundColor:
						COLOR_SKILL_LEVEL[children.level - 1].color,
					color: children.level === 1 ? "#091e42" : "white",
				}}
				isBold
			>
				{children.name} - {children.level}
				<PiStarFill />
			</Lozenge>
		</components.Option>
	);
};
