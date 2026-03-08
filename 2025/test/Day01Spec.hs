module Day01Spec where

import Day01 (handleInput)
import Skeletest
import Skeletest.Predicate qualified as P

spec :: Spec
spec = do
  describe "day 01" $ do
    it "parses input" $ do
      contents <- readFile "./assets/data-01-example.txt"
      handleInput contents `shouldSatisfy` P.right (P.eq 3)
    it "parses real input" $ do
      contents <- readFile "./assets/data-01.txt"
      handleInput contents `shouldSatisfy` P.right (P.eq 1029)
