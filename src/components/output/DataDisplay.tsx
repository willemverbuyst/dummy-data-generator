import { useDummyData } from "@/zustand/store";

export function DataDisplay() {
	const dummyData = useDummyData((state) => state.dummyData);

	return (
		<pre className="text-code-foreground h-full w-full text-sm text-wrap">
			<code>{JSON.stringify(dummyData, null, 4)}</code>
		</pre>
	);
}
