import { createData } from "./createData.ts";
import { dummyDataSchemas } from "./exampleInput.ts";

const data = createData(dummyDataSchemas);

await Deno.writeTextFile("dummy-data.json", JSON.stringify(data, null, 2));
