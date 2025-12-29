# Query Catalog

This file is for users. Copy a template into the agent chat, replace placeholders like <...> or XXX, and add your context. Keep templates updated over time as workflows evolve.

## Quick Usage

- Keep references to instruction files intact so the agent loads the right specs.
- Provide any known context up front; the agent will ask for missing inputs when needed.
- For SDLC work, run templates in order from vision to release.

## Foundational Setup

```text
First of all, please incorporate the agents' foundational instruction files and apply them by default to all our future queries. I will provide next tasks after that.

```

## Developer Onboarding

### 1) Project Overview

```text
Now please provide a developer onboarding overview.

```

### 2) Local Development Setup

```text
Now please prepare the local development environment after a fresh git clone.

```

## SDLC Templates (Vision -> Post-Release)

### 1) Vision

```text
Now please incorporate the agents' documentation and SDLC instruction files. Update docs/vision.md with:
- Problem statement: XXX
- Target outcome: XXX
- Differentiators: XXX
- Target personas (name, needs, context): XXX
- Goals and success metrics (goal, metric, baseline, target): XXX
- Scope and non-goals: XXX
- Constraints and assumptions: XXX
- References (strategy deck, research, approvals): XXX
Ask me for any missing vision inputs before proceeding.

```

### 2) Prototypes

```text
Now please incorporate the agents' documentation and SDLC instruction files. Update docs/prototypes.md with:
- Prototype ID: XXX
- Link: XXX
- Fidelity (low, medium, high): XXX
- Scope: XXX
- Status (proposed, approved, deprecated): XXX
- Notes: XXX
Ask me for any missing prototype details before proceeding.

```

### 3) Backlog and Prioritization

```text
Now please incorporate the agents' SDLC and documentation instruction files. Review docs/tasks-management.md and propose backlog priorities, milestones, and project views for stories: XXX. Ask me for any missing workflow details before proceeding.

```

### 4) User Stories

```text
Now please incorporate the agents' SDLC and planning instruction files. Draft user stories using this format:
"as [user type] I [must | should | could | want] [action] so that [purpose]"
Provide story IDs (for example, STORY-001) and ask me for any missing context.

```

### 5) Acceptance Criteria

```text
Now please incorporate the agents' SDLC instruction files. For story ID XXX, draft acceptance criteria and map them to docs/vision.md and docs/prototypes.md. Ask me for any missing inputs before finalizing.

```

### 6) BDD Scenarios and Estimation

```text
Now please incorporate the agents' planning and SDLC instruction files. Translate the acceptance criteria for story ID XXX into Given/When/Then scenarios. Provide function point estimates using this scale:
- 0.5 (trivial adjustment)
- 1 (standard change)
- 2 (multi-module change)
- 3+ (extensive cross-cutting work)
Explain the drivers behind each estimate and ask me to confirm if needed.

```

### 7) Delivery Plan and Task Breakdown

```text
Now please incorporate the agents' planning and SDLC instruction files. Break down story ID XXX into tasks covering development, documentation, testing, version control, change requests, CI/CD, and release steps. Map each task to acceptance criteria and BDD scenarios, and call out any assumptions or risks.

```

### 8) Technical Discovery and Risk Review

```text
Now please incorporate the agents' planning and fullstack instruction files. Review dependencies, risks, and required documentation updates (docs/stack.md, docs/verification.md) for story ID XXX. Propose mitigation steps and ask me to confirm any assumptions.

```

### 9) Implementation

```text
Now please incorporate the agents' fullstack, API, and PWA instruction files. Implement the approved tasks for story ID XXX, and update the relevant docs. Ask me before any history- or remote-altering git commands.

```

### 10) QA Verification

```text
Now please incorporate the agents' QA instruction files. Add or update tests for story ID XXX, reproduce any defects, apply fixes, and re-run the affected test suites. Document verification steps and ask me before running any commands that require approval.

```

### 11) Change Request

```text
Now please incorporate the agents' version-control and change request instruction files. Prepare the change request for story ID XXX targeting develop, draft the change request body, and pause for my approval before git commit, git push, or opening the change request.

```

### 12) Release Readiness

```text
Now please incorporate the agents' version-control and CI/CD instruction files. Draft the release checklist, tagging plan, and release verification steps for story ID XXX. Ask me for any missing release inputs before proceeding.

```

### 13) Post-Release Monitoring and Retrospective

```text
Now please incorporate the agents' QA and SDLC instruction files. Summarize post-release monitoring signals, user feedback, and regressions for story ID XXX. Propose follow-up tasks and document any updates needed in docs/vision.md or docs/testing.md.

```

## Version Control and Collaboration

```text
Now please incorporate the agents' version-control instruction files as well, and plan and execute contextual commits for all current changes.
    - Once the plan is approved, move forward and stop only right before each commit command.
    - Once the plan is approved, keep committing until every commit is done.

Now please incorporate the agents' version-control instruction files as well, and create a new feature branch from develop, naming based on the task XXX.

Now please incorporate the agents' version-control instruction files as well, merge back to develop and push branch. I am done with this feature branch.

Now please incorporate the agents' version-control instruction files as well, merge back to develop, then merge develop into master, push both branches, and finally check out develop. I am done with this branch.

Now please incorporate the agents' version-control and change request instruction files as well, and proceed with a feature change request targeting the develop branch. I am done with this feature branch.

Now please incorporate the agents' version-control and change request instruction files as well, and retrieve the current non-resolved change request review conversations. Analyze and resolve each one. The change request id is XXX.

Now please incorporate the agents' version-control and change request instruction files as well, push the code changes for the non-resolved conversations, and once they are pushed, mark the handled conversations as resolved.

```

## Documentation Maintenance

```text
Now please incorporate the agents' documentation instruction file as well, and review the agents' XXX instruction file to confirm whether the following guidance is covered in the correct section, or place it if missing: XXX

Now please incorporate the agents' documentation instruction file as well, and review the agents' XXX instructions file to check grammar and meaning, and assert whether it's following the documentation base instructions.

Now please incorporate the agents' documentation instruction file as well, and review the agents' XXX instructions file to include this task-context approach descriptions we just achieved, as future orientation notes.

```

## Misc

```text
Incorporate the agents' fullstack, API, and PWA instruction files, then review the current changes to confirm they meet all requirements.

Now please incorporate the agents' QA instruction files and fix the XXX.

Please incorporate the relevant agents' XX instruction files as well, and proceed with the requested task (replace XX with the specific spec needed for the context).

```
