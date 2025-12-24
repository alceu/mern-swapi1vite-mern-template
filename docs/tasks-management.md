# Tasks Management Guide

This guide defines how this repository manages user stories, planning artifacts, and task tracking. It complements `.agents/sdlc.md` and is the per-project source of truth for work management.

## Principles

- Use GitHub Issues and Projects as the system of record for user stories, acceptance criteria, and delivery status.
- Prefer GitHub CLI (`gh`) for repeatable automation when workflows are documented and approved.
- Follow approval requirements in `.agents/versioning.md` and `.agents/change_requests.md` before executing history- or remote-altering commands.

## Workspace Configuration

- Organization:
- Project name:
- Project URL:
- Default project views:
- Status field values:
- Priority field values:
- Label taxonomy:
- Automation rules:

## User Stories and Issues

- Track each user story as a GitHub issue.
- Use the story format from `.agents/sdlc.md` in the issue description.
- Include acceptance criteria, prototype references (`docs/prototypes.md`), and vision references (`docs/vision.md`).
- Add labels for priority, area, and status.

## Task Breakdown

- Use issue task lists to capture BDD scenarios, development, documentation, testing, change request, and CI/CD steps.
- Link tasks back to acceptance criteria and scenario IDs.

## Projects, Milestones, and Roadmaps

- Use GitHub Projects to visualize story status and ownership.
- Group stories into milestones for releases or iterations.
- Keep project columns aligned to the SDLC flow (Backlog, Ready, In Progress, Review, Done).

## Issue Intake Checklist

- Required labels and milestones:
- Required fields or forms:
- Assignees or owners:
- Linked prototypes and vision references:

## GH CLI Usage

Use the GitHub CLI as the default interface for issue and project operations:

```bash
# Issues
gh issue create --title "<story title>" --body "<story + acceptance criteria>"
gh issue view <id>

# Projects (if enabled for the org/repo)
gh project list --owner <org>
gh project view <project-id> --owner <org>
```

## Templates and References

- Update `.github/ISSUE_TEMPLATE/` when story structure changes.
