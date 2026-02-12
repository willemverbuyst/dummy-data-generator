import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import type { UseFieldArrayRemove } from "react-hook-form";

export function RemoveEntityButton({
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
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outlined"
          size="small"
          htmlType="button"
          disabled={disabled}
          onClick={() => remove(index)}
          title={title}
        >
          <DeleteOutlined />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Remove Entity</p>
      </TooltipContent>
    </Tooltip>
  );
}
