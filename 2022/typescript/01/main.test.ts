import { assertEquals } from "@std/assert";
import { findMax, findTopThree } from "./main.ts";
import { example, myInput } from "./data.ts";

Deno.test("findMax", () => {
  assertEquals(findMax(example), 24000);
  assertEquals(findMax(myInput), 71502);
});

Deno.test("findTopThree", () => {
  assertEquals(findTopThree(example), 45000);
  assertEquals(findTopThree(myInput), 208191);
});
