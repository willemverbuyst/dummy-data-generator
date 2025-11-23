import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TrashIcon } from "lucide-react";
import type { UseFieldArrayRemove } from "react-hook-form";

export function RemoveEntityButton({
  disabled,
  remove,
  index,
}: {
  disabled: boolean;
  remove: UseFieldArrayRemove;
  index: number;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          type="button"
          disabled={disabled}
          onClick={() => remove(index)}
        >
          <TrashIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Remove Entity</p>
      </TooltipContent>
    </Tooltip>
  );
}
