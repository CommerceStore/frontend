# PR Summary (diff-only)

Claude Code instruction: Write the PR description using **only the current branch diff** (`git diff`, `git diff --stat`, `git status`). Do not guess.
**Write the PR text in Korean.**
Keep it **crisp and core-only**: state only what changed (and where) with minimal words. No bullet count limits.

## Output format (must match exactly)

PR Title: <1 line inferred from the diff>

## Summary

- <core-only, concise>

## Changes

- <core-only, concise>

## Rules

- Use only what is provable from the current branch diff.
- Do not add/remove sections. Output only the format above.
- No intent/claims that aren’t directly supported by the diff. Describe “what changed” only.
- If there are no test changes, explicitly write: `테스트 변경 없음`.
