# CI/CD Guide

This guide defines the per-project continuous integration and delivery workflow. It complements `.agents/sdlc.md` and references verification steps in `docs/verification.md`.

## Principles

- Use GitHub Actions as the default CI runner for this repository.
- Require CI checks to pass before merging change requests.
- Document release and deployment steps alongside CI configuration.

## Continuous Integration

- Keep workflows in `.github/workflows/` and align them with the commands in `docs/verification.md`.
- Update required checks when new verification steps are introduced.

## CI Workflow Inventory

- Workflow names:
- Required checks:
- Trigger events:
- Artifact retention policy:

## Continuous Delivery and Releases

- Capture release notes and deployment steps in GitHub Releases.
- Coordinate release tagging with the version control practices in `docs/version-control.md`.

## Environment Configuration

- Environments:
- Secrets and variables:
- Deployment targets:
- Rollback strategy:

## Release Checklist

- Version bump location:
- Tagging command:
- Release notes source:
- Post-release verification:

## GH CLI Usage

Use the GitHub CLI for release operations when approved:

```bash
# Releases
gh release create <tag> --title "<title>" --notes "<notes>"
```

## References

- `.github/workflows/`
- `docs/change-requests.md`
