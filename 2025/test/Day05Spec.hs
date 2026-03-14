module Day05Spec where

import Data.Text qualified as T
import Day05 (handleInput)
import Skeletest
import Skeletest.Predicate qualified as P

spec :: Spec
spec = do
  describe "day 05" $ do
    it "parses example input" $ do
      contents <- readFile "./assets/data-05-example.txt"
      handleInput (T.pack contents) `shouldSatisfy` P.right (P.eq 3)
    it "parses real input" $ do
      contents <- readFile "./assets/data-05.txt"
      handleInput (T.pack contents) `shouldSatisfy` P.right (P.eq 0)
