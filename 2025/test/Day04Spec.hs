module Day04Spec where

import Day04 (handleInput)
import Skeletest
import Skeletest.Predicate qualified as P

spec :: Spec
spec = do
  describe "day 04" $ do
    it "parses example input" $ do
      contents <- readFile "./assets/data-04-example.txt"
      handleInput (contents) `shouldSatisfy` (P.eq 13)
    it "parses real input" $ do
      contents <- readFile "./assets/data-04.txt"
      handleInput (contents) `shouldSatisfy` (P.eq 1363)
