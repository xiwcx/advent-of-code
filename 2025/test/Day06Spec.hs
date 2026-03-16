module Day06Spec where

import Data.Text qualified as T
import Day06 (handleInput)
import Skeletest
import Skeletest.Predicate qualified as P

spec :: Spec
spec = do
  describe "day 06" $ do
    it "parses example input" $ do
      contents <- readFile "./assets/data-06-example.txt"
      handleInput (T.pack contents) `shouldSatisfy` P.right (P.eq 4277556)
    it "parses real input" $ do
      contents <- readFile "./assets/data-06.txt"
      handleInput (T.pack contents) `shouldSatisfy` P.right (P.eq 3968933219902)
