# Agent Documentation Instructions

## Purpose

This document outlines the guidelines for creating and maintaining documentation for AI agents within this project. Clear and consistent agent documentation is crucial for understanding their purpose, operational rules, and expected behaviors.

## General Guidelines

1.  **File Location**: All agent instruction files must be located within the `.agents/` directory at the root of the project.
1.  **Markdown Format**: All agent documentation must be written in Markdown (`.md`) format.
1.  **Clarity and Conciseness**: Documentation should be clear, concise, and easy to understand. Avoid jargon where simpler terms suffice.
1.  **Focus on Purpose and Rules**: Clearly state the agent's purpose, its specific operational rules, and any constraints or mandates.
1.  **Grammar and Spelling**: Ensure correct grammar and spelling.
1.  **Avoid Redundancy**: Do not repeat information that is already present in other agent instruction files. Reference other files if necessary.

## Markdown Best Practices

To ensure consistency and readability across all agent documentation, adhere to the following Markdown best practices:

1.  **Headings**: Use ATX headings (e.g., `# Heading 1`, `## Heading 2`) for structuring your document.
1.  **Ordered Lists**: For ordered lists, use `1. 1. 1.` for all list items. This simplifies reordering and maintenance.
    - Example:
      ```markdown
      1. First item
      1. Second item
      1. Third item
      ```
1.  **Unordered Lists**: For unordered lists, use hyphens (`-`) or asterisks (`*`).
    - Example:
      ```markdown
      - Item A
      - Item B
      ```
1.  **Code Blocks**: Use fenced code blocks with language identifiers for all code examples.

    - Example:

      ````markdown
      ```python
      print("Hello, World!")
      ```
      ````

      ```

      ```

1.  **Bold and Italics**: Use `**bold**` for strong emphasis and `*italics*` for emphasis.
1.  **Links**: Use descriptive inline links (e.g., `[Link Text](URL)`).
1.  **Indentation**: Maintain consistent indentation for nested lists and code blocks. Typically, 2 or 4 spaces are used. Follow the existing project's convention.

## Content Structure

Each agent instruction file should generally follow this structure:

1.  **Agent Name/Title**: A clear and descriptive title for the agent.
1.  **Purpose/Persona**: A brief description of the agent's role and objectives.
1.  **Operational Rules**: Specific rules and mandates that the agent must follow.
1.  **Specific Guidelines**: Any detailed instructions related to the agent's domain (e.g., pwa, Versioning).
1.  **Examples (Optional)**: Provide concrete examples of expected behavior or output.
