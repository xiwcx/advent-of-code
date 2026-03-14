{-# LANGUAGE OverloadedStrings #-}

module Day05 (handleInput) where

import qualified Data.Text as T
import Data.Text.Read as T

data ParseError = NotRange String | OtherError String

getFreshTotal :: [(Int, Int)] -> [Int] -> Int
getFreshTotal rs is = length $ filter (isMemberOfAnyRange rs) is

isMemberOfAnyRange :: [(Int, Int)] -> Int -> Bool
isMemberOfAnyRange rs i = any (\(s, e) -> i >= s && i <= e) rs

handleInput :: T.Text -> Either ParseError Int
handleInput i = case (ranges, ids) of
  (Right rs, Right is) -> Right $ getFreshTotal rs (map fst is)
  (Left e, _) -> Left e
  (_, Left e) -> Left $ OtherError e
 where
  both = T.splitOn "\n\n" $ stripTrailingNewLines i
  ranges = traverse getRange . T.lines $ both !! 0
  ids = traverse T.decimal . T.lines $ both !! 1

stripTrailingNewLines :: T.Text -> T.Text
stripTrailingNewLines = T.dropWhileEnd (== '\n')

getRange :: T.Text -> Either ParseError (Int, Int)
getRange i = case (T.decimal start, T.decimal $ T.drop 1 end) of
  (Right (s, _), Right (e, _)) -> Right (s, e)
  (Left e, _) -> Left $ NotRange e
  (_, Left e) -> Left $ NotRange e
 where
  (start, end) = T.break (== '-') i
