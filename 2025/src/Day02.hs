{-# LANGUAGE OverloadedStrings #-}

module Day02 (handleInput) where

import qualified Data.Text as T
import qualified Data.Text.Lazy as TL
import qualified Data.Text.Lazy.Builder as TB
import qualified Data.Text.Lazy.Builder.Int as TBI
import qualified Data.Text.Read as TR

data ItemParseError = MalformedRange T.Text | NotANumber T.Text

textToMaybeInt :: T.Text -> Maybe Int
textToMaybeInt t =
  case TR.decimal t of
    Right (n, rest)
      | T.null rest -> Just n
    _ -> Nothing

intToText :: Int -> T.Text
intToText = TL.toStrict . TB.toLazyText . TBI.decimal

stripTrailingNewLines :: T.Text -> T.Text
stripTrailingNewLines = T.dropWhileEnd (== '\n')

parseItem :: T.Text -> Either ItemParseError (Int, Int)
parseItem s =
  case T.split (== '-') $ stripTrailingNewLines s of
    [x, y] -> case (textToMaybeInt x, textToMaybeInt y) of
      (Just n1, Just n2) -> Right (n1, n2)
      _ -> Left (NotANumber s)
    _ -> Left (MalformedRange s)

splitInHalf :: T.Text -> (T.Text, T.Text)
splitInHalf t = T.splitAt (T.length t `div` 2) t

isBadId :: T.Text -> Bool
isBadId i
  | odd (T.length i) = False
  | uncurry (==) $ splitInHalf i = True
  | otherwise = False

getTotal :: [(Int, Int)] -> Int
getTotal = sum . map rangeTotal

rangeTotal :: (Int, Int) -> Int
rangeTotal (x, y) = sum . filter (isBadId . intToText) $ [x .. y]

handleInput :: T.Text -> Either ItemParseError Int
handleInput = fmap getTotal . traverse parseItem . T.split (== ',')
