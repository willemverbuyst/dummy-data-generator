import { faker } from "@faker-js/faker";
import { type DummyData } from "../../types.ts";

export function generateReference({
	entity,
	dummyData,
}: {
	entity: string;
	dummyData: DummyData;
}) {
	const refEntity = entity + "s";
	const refData = dummyData[refEntity];

	if (refData && refData.length > 0) {
		const randomRef =
			refData[faker.number.int({ min: 0, max: refData.length - 1 })];
		return randomRef.id;
	} else {
		console.warn(`Warning: No data found for referenced entity ${entity}`);
		return null;
	}
}
