module Day01 (handleInput) where

data ParseError = NotADirection | NotANumber | EmptyLine
  deriving (Eq, Show)

data Direction = R Int | L Int
  deriving (Show)

parseValue :: String -> Either ParseError Direction
parseValue [] = Left EmptyLine
parseValue (x : xs) =
  case (x, reads xs) of
    ('R', [(n, _)]) -> Right (R n)
    ('L', [(n, _)]) -> Right (L n)
    (_, [(_, _)]) -> Left NotADirection
    _ -> Left NotANumber

handleInput :: String -> Either ParseError Int
handleInput i = getFinalState <$> mapM parseValue (lines i)

getFinalState :: [Direction] -> Int
getFinalState ds = length . filter (== 0) . drop 1 $ scanl step 50 ds

step :: Int -> Direction -> Int
step pos (R n) = (pos + n) `mod` 100
step pos (L n) = (pos - n) `mod` 100
