import { PiStarFill } from "react-icons/pi";
import { components } from "@atlaskit/select";

export default function CustomSkillValue({ children, ...props }) {
	return (
		<components.MultiValue {...props}>
			{children.name} - {children.level} <PiStarFill />
		</components.MultiValue>
	);
}
