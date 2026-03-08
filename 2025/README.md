# Advent of Code 2025

Haskell solutions.

## Project structure

```
src/
  One.hs         # day 1 solution (module One)
  01/
    data.txt     # puzzle input
test/
  Main.hs        # skeletest entrypoint
  OneSpec.hs     # day 1 tests (module OneSpec)
```

Modules are named after their day (e.g. `One`, `Two`). When adding a new day, add the module to `exposed-modules` in the library and `other-modules` in the test suite in `x2025.cabal`.

## Running solutions

```bash
# GHCi REPL with project loaded
cabal repl
:load src/One.hs
main
:r   # reload after edits
```

## Testing (skeletest)

```bash
cabal test                                 # run all tests
cabal test --test-option="[day 1]"         # filter by describe label
cabal test --test-option="[parses input]"  # filter by test name
```

### Writing a spec

`test/OneSpec.hs`:

```haskell
module OneSpec where

import One (myFunction)
import Skeletest
import Skeletest.Predicate qualified as P

spec :: Spec
spec = do
  describe "day 1" $ do
    it "parses input" $
      myFunction "1 2 3" `shouldBe` [1, 2, 3]
```

## Editor / HLS setup

HLS inline errors require `skeletest-preprocessor` (a build tool dependency) to be in PATH. The repo root `.envrc` handles this via direnv:

```
PATH_add ~/.ghcup/bin   # use ghcup HLS, not Homebrew HLS
PATH_add ~/.cabal/bin   # expose skeletest-preprocessor
```

Prerequisites:
1. Install direnv: `brew install direnv` and add `eval "$(direnv hook zsh)"` to `~/.zshrc`
2. Allow the config: `direnv allow` from the repo root
3. Install the preprocessor globally: `cabal install skeletest --overwrite-policy=always --ignore-project`

Zed: the `.zed/settings.json` at the repo root sets `"load_direnv": "direct"`.

## Cabal commands

```bash
cabal build   # build everything
cabal test    # build and run tests
cabal repl    # open GHCi with project in scope
cabal clean   # wipe dist-newstyle/
```
