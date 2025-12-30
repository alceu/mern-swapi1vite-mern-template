# CI/CD Guide

**Spec-ID:** `docs-cicd::v1`

## Purpose

### MUST

1. Define the per-project continuous integration and delivery workflow.
1. Keep this file aligned with `.github/workflows/` and release practices so agents can auto-discover values before asking users.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Principles

### MUST

1. Use GitHub Actions as the default CI runner for this repository.
1. Require CI checks to pass before merging change requests.
1. Document release and deployment steps alongside CI configuration.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## CI Workflow Inventory

### MUST

1. Document workflow names, required checks, trigger events, and artifact retention policy once confirmed.

### SHOULD

1. Keep the inventory aligned with `.github/workflows/` definitions.

### COULD

1. None

### WANT

1. None

## Continuous Delivery and Releases

### MUST

1. Capture release notes and deployment steps in GitHub Releases.
1. Coordinate release tagging with `docs/version-control.md`.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Environment Configuration

### MUST

1. Document environments, secrets, variables, deployment targets, and rollback strategy once confirmed.

### SHOULD

1. Keep environment details aligned with deployment tooling.

### COULD

1. None

### WANT

1. None

## Release Checklist

### MUST

1. Document version bump location, tagging command, release notes source, and post-release verification once confirmed.

### SHOULD

1. Keep release checklist aligned with CI workflows and required checks.

### COULD

1. None

### WANT

1. None

## GH CLI Usage

### MUST

1. Use the following commands as the baseline for release operations:

   ```bash
   gh release create <tag> --title "<title>" --notes "<notes>"
   ```

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Auto-Discovery

### MUST

1. Inspect `.github/workflows/` to discover workflow names, triggers, and required checks.
1. Confirm whether any deployment scripts or release tooling exist in the repo before requesting details from the user.
1. Use local CLI commands, for example:

   ```bash
   rg --files .github/workflows
   rg -n "on:" .github/workflows/*.yml
   rg -n "jobs:" .github/workflows/*.yml
   ```

### SHOULD

1. Prefer local inspection over networked tooling unless the user approves remote access.

### COULD

1. None

### WANT

1. None

## Missing Inputs

### MUST

1. Ask the user to provide required checks, environment names, secrets, deployment targets, and release checklist details if they are not discoverable locally.

### SHOULD

1. Clarify any manual approval steps or rollback expectations.

### COULD

1. None

### WANT

1. None

## Approval Gates

### MUST

1. Require user approval before running CI/CD tooling that publishes artifacts, creates releases, or deploys to environments.

### SHOULD

1. Seek confirmation before altering required checks or release policies.

### COULD

1. None

### WANT

1. None

## Related Specs

### MUST

1. `.agents/sdlc.md`
1. `.agents/version-control.md`
1. `docs/change-requests.md`
1. `docs/version-control.md`

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Contributor Competencies

### MUST

1. Understand GitHub Actions workflows and release processes used by this repository.

### SHOULD

1. Be comfortable reviewing CI logs for failures.

### COULD

1. None

### WANT

1. None
