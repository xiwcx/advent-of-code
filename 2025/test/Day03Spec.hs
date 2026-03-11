module Day03Spec where

import Day03 (handleInput)
import Skeletest
import Skeletest.Predicate qualified as P

spec :: Spec
spec = do
  describe "day 03" $ do
    it "parses example input" $ do
      contents <- readFile "./assets/data-03-example.txt"
      handleInput contents `shouldSatisfy` P.right (P.eq 357)

    it "parses real input" $ do
      contents <- readFile "./assets/data-03.txt"
      handleInput contents `shouldSatisfy` P.right (P.eq 17100)
