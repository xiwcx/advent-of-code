module Day04 (handleInput) where

import qualified Data.Set as S

type Point = (Int, Int)

getNeighbors :: Point -> S.Set Point
getNeighbors (r, c) =
  S.fromList
    [ (r + deltaR, c + deltaC)
    | deltaR <- [-1, 0, 1]
    , deltaC <- [-1, 0, 1]
    , (deltaR, deltaC) /= (0, 0)
    ]

neighborCount :: Point -> S.Set Point -> Int
neighborCount a b = S.size $ (getNeighbors a) `S.intersection` b

handleInput :: String -> Int
handleInput input = S.size $ S.filter (\x -> neighborCount x parsedInput < 4) parsedInput
 where
  parsedInput =
    S.fromList
      [ (row, col)
      | (row, line) <- zip [0 ..] (lines input)
      , (col, char) <- zip [0 ..] line
      , char == '@'
      ]
