{-# LANGUAGE OverloadedStrings #-}

module Day06 (handleInput) where

import Data.List (foldl1', transpose, unsnoc)
import qualified Data.Text as T
import qualified Data.Text.Read as T

data ParseError = NotLongEnough | NotAnInteger String
type Ingredients = ([Int], Int -> Int -> Int)

-- not the safest, but we can garauntee the input here
-- if we needed to abstract further, this could become `Either`
charToOp :: T.Text -> (Int -> Int -> Int)
charToOp x = case x of
  "+" -> (+)
  _ -> (*)

handleInput :: T.Text -> Either ParseError Int
handleInput input = sum . map getResult <$> (mIngredients >>= traverse parseIngredients)
 where
  ingredients = traverse unsnoc . transpose . map T.words $ T.lines input
  mIngredients = maybe (Left NotLongEnough) Right ingredients

parseIngredients :: ([T.Text], T.Text) -> Either ParseError Ingredients
parseIngredients (as, b) = case traverse T.decimal as of
  Right xs -> Right $ (map fst xs, charToOp b)
  Left _ -> Left . NotAnInteger . T.unpack $ T.intercalate " " as

getResult :: Ingredients -> Int
getResult (xs, o) = foldl1' o xs
