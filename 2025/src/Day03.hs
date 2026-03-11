{-# LANGUAGE OverloadedStrings #-}

module Day03 (handleInput) where

import Data.Char (ord)

data ParseError = NotANumber String

stringToInts :: String -> Either ParseError [Int]
stringToInts s = case traverse charToInt s of
  Left _ -> Left $ NotANumber s
  Right xs -> Right xs

charToInt :: Char -> Either ParseError Int
charToInt c
  | n > 0 && n <= 9 = Right n
  | otherwise = Left $ NotANumber $ show c
  where
    n = ord c - ord '0'

combineInts :: Int -> Int -> Int
combineInts a b = a * (10 ^ length (show b)) + b

findJoltage :: [Int] -> Int
findJoltage is =
  let lastIndex = length is - 1
      tenCandidates = take lastIndex is
      ten = maximum tenCandidates
      oneCandidates = drop 1 . snd $ break (== ten) is
      one = maximum oneCandidates
   in combineInts ten one

handleInput :: String -> Either ParseError Int
handleInput s = case parsedInput of
  Left e -> Left e
  Right xs -> Right . sum $ map findJoltage xs
  where
    parsedInput = traverse stringToInts . filter (not . null) $ lines s
