# Project Vision

**Spec-ID:** `docs-vision::v1`

## Purpose

### MUST

1. Capture the product vision and success criteria that guide SDLC planning.
1. Keep vision inputs aligned with `.agents/sdlc.md` and update them only with user approval.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Vision Statement

### MUST

1. Document the problem statement, target outcome, and differentiators for this project.

### SHOULD

1. Keep the statement concise and specific to the product scope.

### COULD

1. None

### WANT

1. None

## Target Personas

### MUST

1. List each target persona with their needs and context.

### SHOULD

1. Include primary and secondary personas when relevant.

### COULD

1. None

### WANT

1. None

## Goals and Success Metrics

### MUST

1. Record each goal with its metric, baseline, and target.

### SHOULD

1. Align metrics with stakeholders and release milestones.

### COULD

1. None

### WANT

1. None

## Scope and Non-Goals

### MUST

1. Define what is in scope and out of scope for the product.

### SHOULD

1. Revisit scope when acceptance criteria expand beyond current goals.

### COULD

1. None

### WANT

1. None

## Constraints and Assumptions

### MUST

1. Document known constraints and assumptions that affect delivery.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## References

### MUST

1. Record links to strategy briefs, market research, and stakeholder approvals.

### SHOULD

1. Keep references updated when new approvals are granted.

### COULD

1. None

### WANT

1. None

## Auto-Discovery

### MUST

1. Review repository docs and issue templates for any existing vision or product briefs before requesting input.
1. Use local CLI commands, for example:

   ```bash
   rg -n "vision|roadmap|strategy|product" README.md docs -g "*.md"
   ```

### SHOULD

1. Prefer local inspection over networked tooling unless the user approves remote access.

### COULD

1. None

### WANT

1. None

## Missing Inputs

### MUST

1. Ask the user to provide the vision statement, personas, goals, scope, constraints, and references if they are not documented locally.

### SHOULD

1. Confirm whether any vision changes require stakeholder approvals.

### COULD

1. None

### WANT

1. None

## Approval Gates

### MUST

1. Require user approval before changing vision statements, personas, goals, or scope.

### SHOULD

1. Seek confirmation before retiring any previously agreed vision references.

### COULD

1. None

### WANT

1. None

## Related Specs

### MUST

1. `.agents/sdlc.md`
1. `docs/prototypes.md`

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Contributor Competencies

### MUST

1. Be able to translate vision inputs into user stories and acceptance criteria.

### SHOULD

1. Be comfortable gathering stakeholder context when necessary.

### COULD

1. None

### WANT

1. None
