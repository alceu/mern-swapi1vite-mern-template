# Version Control Guide

This guide captures repository-specific version control conventions. It complements `.agents/versioning.md` and defines how changes flow from branches to merges.

## Principles

- Use Git as the version control system for all work in this repository.
- Keep history clean by following branch and commit conventions defined in `.agents/versioning.md`.
- Align merges with the change request workflow in `docs/change-requests.md`.

## Branching

- Default branches are `main` and `develop`.
- Feature work must live on purpose-prefixed branches (for example, `feature/`, `fix/`, `docs/`, `chore/`, `refactor/`).
- Keep branches scoped to a single change request whenever possible.

## Branch Protection and Policies

- Protected branches:
- Required reviews:
- Required status checks:
- Force-push policy:
- Admin override policy:

## Commit Messages

- Follow Conventional Commits and scope guidance in `.agents/versioning.md`.
- Draft commit messages in `./COMMIT_EDITMSG` before committing.

## Merge Strategy

- Default merge method:
- Backport policy:
- Hotfix policy:

## Integration with Change Requests

- Open change requests from feature branches targeting `develop` unless release policy dictates otherwise.
- Merge only after required checks defined in `docs/cicd.md` pass.

## Tagging and Release Branches

- Tag format:
- Versioning scheme:
- Release branch naming:
