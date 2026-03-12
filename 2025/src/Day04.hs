module Day04 (handleInput) where

import qualified Data.Set as S

type Point = (Int, Int)

getNeighbors :: Point -> [Point]
getNeighbors (r, c) =
  [ (r + deltaR, c + deltaC)
  | deltaR <- [-1, 0, 1]
  , deltaC <- [-1, 0, 1]
  , (deltaR, deltaC) /= (0, 0)
  ]

neighborCount :: S.Set Point -> Point -> Int
neighborCount s x = length . filter (flip S.member s) $ getNeighbors x

handleInput :: String -> Int
handleInput input = S.size $ S.filter ((4 >) . neighborCount parsedInput) parsedInput
 where
  parsedInput =
    S.fromList
      [ (row, col)
      | (row, line) <- zip [0 ..] (lines input)
      , (col, char) <- zip [0 ..] line
      , char == '@'
      ]
