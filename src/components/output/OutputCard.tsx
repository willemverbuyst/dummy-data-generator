import { useDummyData } from "@/zustand/store";
import { Spinner } from "../Spinner";
import { DataDisplay } from "./DataDisplay";
import { InSyncBadge } from "./InSyncBadge";

export function OutputCard() {
	const isGenerating = useDummyData((state) => state.isGenerating);

	return (
		<div className="bg-background relative m-2 rounded-md p-4">
			{isGenerating ? (
				<Spinner />
			) : (
				<>
					<InSyncBadge />
					<DataDisplay />
				</>
			)}
		</div>
	);
}
