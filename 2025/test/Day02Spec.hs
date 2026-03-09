module Day02Spec where

import Data.Text qualified as T
import Day02 (handleInput)
import Skeletest
import Skeletest.Predicate qualified as P

spec :: Spec
spec = do
  describe "day 02" $ do
    it "parses example input" $ do
      contents <- readFile "./assets/data-02-example.txt"
      handleInput (T.pack contents) `shouldSatisfy` P.right (P.eq 1227775554)
    it "parses real input" $ do
      contents <- readFile "./assets/data-02.txt"
      handleInput (T.pack contents) `shouldSatisfy` P.right (P.eq 18893502033)
