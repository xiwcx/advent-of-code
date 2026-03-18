{-# LANGUAGE OverloadedStrings #-}

module Day07 (handleInput) where

import qualified Data.Set as S
import qualified Data.Text as T

type Beams = S.Set Int

getSplitCount :: (Int, Beams) -> [T.Text] -> Int
getSplitCount (c, _) [] = c
getSplitCount x (h : t) = getSplitCount (handleRow x h) (skipLine t)

handleRow :: (Int, Beams) -> T.Text -> (Int, Beams)
handleRow x@(_, bs) r = foldl' (\a b -> handleBeam a b r) x bs

-- handleBeam = undefined
handleBeam :: (Int, Beams) -> Int -> T.Text -> (Int, Beams)
handleBeam (c, bs) b r
  | ((T.index r b) == '^') = (c + 1, S.union (S.fromList [b - 1, b + 1]) (S.delete b bs))
  | otherwise = (c, bs)

-- for every index in the set
-- check for splitter
-- if splitter, split
--    - remove current index, add +1, add -1
-- else

handleInput :: T.Text -> Either String Int
handleInput i = case start of
  Just n -> Right $ getSplitCount (0, S.fromList [n]) rest
  _ -> Left "missing start"
 where
  (h : t) = T.lines i
  start = T.findIndex (== 'S') h
  rest = skipLine t

-- every other line has no meaningful input
skipLine :: [T.Text] -> [T.Text]
skipLine = drop 1
