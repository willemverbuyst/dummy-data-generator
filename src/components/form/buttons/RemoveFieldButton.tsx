import { Button } from "@/components/ui/button";
import { MinusIcon } from "lucide-react";
import type { UseFieldArrayRemove } from "react-hook-form";

export function RemoveFieldButton({
	disabled,
	remove,
	index,
	title,
}: {
	disabled: boolean;
	remove: UseFieldArrayRemove;
	index: number;
	title: string;
}) {
	return (
		<Button
			variant="outline"
			size="sm"
			type="button"
			disabled={disabled}
			onClick={() => remove(index)}
			title={title}
		>
			<MinusIcon />
		</Button>
	);
}
