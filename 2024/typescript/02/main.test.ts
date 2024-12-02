import { assertEquals } from "@std/assert";
import { getSafetyReport } from "./main.ts";
import { example, myInput } from "./data.ts";

Deno.test("gets safety report", () => {
  assertEquals(getSafetyReport(example), 2);
  assertEquals(getSafetyReport(myInput), 479);
});
