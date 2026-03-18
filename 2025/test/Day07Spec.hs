module Day07Spec where

import Data.Text qualified as T
import Day07 (handleInput)
import Skeletest
import Skeletest.Predicate qualified as P

spec :: Spec
spec = do
  describe "day 07" $ do
    it "parses example input" $ do
      contents <- readFile "./assets/data-07-example.txt"
      handleInput (T.pack contents) `shouldSatisfy` P.right (P.eq 21)

    it "parses real input" $ do
      contents <- readFile "./assets/data-07.txt"
      handleInput (T.pack contents) `shouldSatisfy` P.right (P.eq 1672)
