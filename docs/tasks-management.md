# Tasks Management Guide

**Spec-ID:** `docs-tasks-management::v1`

## Purpose

### MUST

1. Define how this repository manages user stories, planning artifacts, and task tracking.
1. Keep this file aligned with `.agents/sdlc.md` and local workflow configurations.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Principles

### MUST

1. Use GitHub Issues and Projects as the system of record for user stories, acceptance criteria, and delivery status.
1. Prefer GitHub CLI (`gh`) for repeatable automation when workflows are documented and approved.
1. Follow approval requirements in `.agents/version-control.md` and `.agents/change_requests.md` before executing history- or remote-altering commands.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Workspace Configuration

### MUST

1. Document organization name, project name, project URL, default views, status field values, priority field values, label taxonomy, and automation rules once confirmed.

### SHOULD

1. Keep project metadata aligned with GitHub Projects settings.

### COULD

1. None

### WANT

1. None

## User Stories and Issues

### MUST

1. Track each user story as a GitHub issue using the story format from `.agents/sdlc.md`.
1. Include acceptance criteria, prototype references (`docs/prototypes.md`), and vision references (`docs/vision.md`).
1. Add labels for priority, area, and status.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Task Breakdown

### MUST

1. Use issue task lists to capture BDD scenarios, development, documentation, testing, change request, and CI/CD steps.
1. Link tasks back to acceptance criteria and scenario IDs.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Projects, Milestones, and Roadmaps

### MUST

1. Use GitHub Projects to visualize story status and ownership.
1. Group stories into milestones for releases or iterations.
1. Keep project columns aligned to the SDLC flow (Backlog, Ready, In Progress, Review, Done).

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Issue Intake Checklist

### MUST

1. Document required labels, milestones, fields, assignees, and prototype or vision links once confirmed.

### SHOULD

1. Keep intake requirements aligned with issue templates in `.github/ISSUE_TEMPLATE/`.

### COULD

1. None

### WANT

1. None

## GH CLI Usage

### MUST

1. Use the following commands as the baseline for issue and project operations:

   ```bash
   gh issue create --title "<story title>" --body "<story + acceptance criteria>"
   gh issue view <id>
   gh project list --owner <org>
   gh project view <project-id> --owner <org>
   ```

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Auto-Discovery

### MUST

1. Inspect `.github/ISSUE_TEMPLATE/` and any local workflow docs to discover issue intake requirements.
1. Confirm whether project metadata is stored locally before requesting it from the user.
1. Use local CLI commands, for example:

   ```bash
   ls .github/ISSUE_TEMPLATE
   rg -n "labels|projects|milestone" .github/ISSUE_TEMPLATE
   ```

### SHOULD

1. Prefer local inspection over networked tooling unless the user approves remote access.

### COULD

1. None

### WANT

1. None

## Missing Inputs

### MUST

1. Ask the user to provide organization name, project name, project URL, status values, priority values, label taxonomy, automation rules, and intake requirements if they are not discoverable locally.

### SHOULD

1. Confirm whether any custom issue forms or workflows exist outside `.github/ISSUE_TEMPLATE/`.

### COULD

1. None

### WANT

1. None

## Approval Gates

### MUST

1. Require user approval before using GitHub CLI commands that modify issues or project settings.

### SHOULD

1. Seek confirmation before changing intake requirements or label taxonomy.

### COULD

1. None

### WANT

1. None

## Related Specs

### MUST

1. `.agents/sdlc.md`
1. `.agents/version-control.md`
1. `.agents/change_requests.md`
1. `docs/vision.md`
1. `docs/prototypes.md`

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Contributor Competencies

### MUST

1. Understand GitHub Issues and Projects workflows used by this repository.

### SHOULD

1. Be comfortable drafting user stories and acceptance criteria.

### COULD

1. None

### WANT

1. None
