module Day03 (handleInput) where

import Data.Bifunctor (first)
import Data.Char (ord)

newtype ParseError = NotANumber String

stringToInts :: String -> Either ParseError [Int]
stringToInts s = first (const $ NotANumber s) (traverse charToInt s)

-- this could be safe, but there are no zeroes in the
-- input data, i am only concerned with 1-9
charToInt :: Char -> Either ParseError Int
charToInt c
  | n > 0 && n <= 9 = Right n
  | otherwise = Left $ NotANumber $ show c
  where
    n = ord c - ord '0'

numDigits :: Int -> Int
numDigits n
  | n < 10 = 1
  | otherwise = 1 + numDigits (n `div` 10)

combineInts :: Int -> Int -> Int
combineInts a b = (a * 10 ^ numDigits b) + b

findJoltage :: [Int] -> Int
findJoltage is =
  let ten = maximum $ init is
      one = maximum . drop 1 $ dropWhile (/= ten) is
   in combineInts ten one

handleInput :: String -> Either ParseError Int
-- handleInput s = fmap (sum . map findJoltage) parsedInput
handleInput s = sum . map findJoltage <$> parsedInput
  where
    parsedInput = traverse stringToInts . filter (not . null) $ lines s
