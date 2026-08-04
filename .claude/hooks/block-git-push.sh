#!/bin/bash
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // ""')

if echo "$COMMAND" | grep -qE 'git([[:space:]]+-[^[:space:]]+([[:space:]]+[^-[:space:]][^[:space:]]*)?)*[[:space:]]+push([[:space:]]|$)' \
  && echo "$COMMAND" | grep -qE '(^|[[:space:]])(--force(-with-lease|-if-includes)?|-f)([[:space:]]|$|=)'; then
  jq -n '{
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "deny",
      permissionDecisionReason: "Claude cannot force push. Run it yourself in your terminal if intentional."
    }
  }'
  exit 0
fi

exit 0
