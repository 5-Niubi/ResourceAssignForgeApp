import { PiStarFill } from "react-icons/pi";
import { components } from "@atlaskit/select";

export default function CustomSkillValue({ children, ...props }) {
	var parts = children.split(" - ");
	if (parts.length == 1) return children;
	else if (parts.length == 2)
		return (
			<components.MultiValue {...props}>
				{parts[0].toUpperCase()} - {parts[1]} <PiStarFill />
			</components.MultiValue>
		);
}
