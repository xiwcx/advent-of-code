import { assertEquals } from "@std/assert";
import { findScore } from "./main.ts";
import { example, myInput } from "./data.ts";

Deno.test("findMax", () => {
  assertEquals(findScore(example), 15);
  // assertEquals(findMax(myInput), 71502);
});
