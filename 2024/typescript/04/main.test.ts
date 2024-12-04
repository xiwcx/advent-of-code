import { assertEquals } from "@std/assert";
import { partOne } from "./main.ts";
import { example, myInput } from "./data.ts";

Deno.test("part one", () => {
  assertEquals(partOne(example), 18);
  assertEquals(partOne(myInput), 2483);
});
