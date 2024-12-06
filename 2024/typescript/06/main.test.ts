import { assertEquals } from "jsr:@std/assert";
import { example, myInput } from "./data.ts";
import { partOne } from "./main.ts";

Deno.test("part one", () => {
  assertEquals(partOne(example), 41);
  assertEquals(partOne(myInput), 4696);
});
