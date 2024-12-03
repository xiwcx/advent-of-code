import { assertEquals } from "@std/assert";
import { getUncorruptedResult } from "./main.ts";
import { example, myInput } from "./data.ts";

Deno.test("gets uncorrupted result", () => {
  assertEquals(getUncorruptedResult(example), 161);
  assertEquals(getUncorruptedResult(myInput), 187194524);
});
