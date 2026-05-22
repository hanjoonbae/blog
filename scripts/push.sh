#!/usr/bin/env bash
set -euo pipefail

commit_message="${*:-update: $(date '+%Y-%m-%d %H:%M')}"

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Not inside a git repository."
  exit 1
fi

branch="$(git branch --show-current)"

if [[ -z "$branch" ]]; then
  echo "Detached HEAD. Please switch to a branch before pushing."
  exit 1
fi

git add -A

if git diff --cached --quiet; then
  echo "No changes to commit."
  exit 0
fi

git commit -m "$commit_message"

if git rev-parse --abbrev-ref --symbolic-full-name '@{u}' >/dev/null 2>&1; then
  git push
else
  git push -u origin "$branch"
fi
