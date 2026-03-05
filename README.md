# Dummy Data Generator

[![Checks](https://github.com/willemverbuyst/dummy-data-generator/actions/workflows/checks.yml/badge.svg)](https://github.com/willemverbuyst/dummy-data-generator/actions/workflows/checks.yml) [![Tests](https://github.com/willemverbuyst/dummy-data-generator/actions/workflows/tests.yml/badge.svg)](https://github.com/willemverbuyst/dummy-data-generator/actions/workflows/tests.yml) [![Release](https://github.com/willemverbuyst/dummy-data-generator/actions/workflows/release.yml/badge.svg)](https://github.com/willemverbuyst/dummy-data-generator/actions/workflows/release.yml)

A tool to generate json dummy data with linked entities and nested objects.

![screenshot](./screenshot.png)

The tool makes use of [faker.js](https://fakerjs.dev/guide/).

## Flow

This diagram summarizes the high-level behavior of the flow using this tool. It focuses on the main actors and steps, not on specific field definitions or data values.

```mermaid
sequenceDiagram
    actor User
    participant DummyDataGeneratorUI
    participant SchemaEngine
    participant JsonPreview

    User->>DummyDataGeneratorUI: Open Dummy Data Generator
    DummyDataGeneratorUI->>JsonPreview: Render empty JSON ({})
    DummyDataGeneratorUI->>JsonPreview: Show status "in sync"

    User->>DummyDataGeneratorUI: Configure entity schema
    DummyDataGeneratorUI->>JsonPreview: Mark status "not in sync"

    User->>DummyDataGeneratorUI: Click "Generate"
    DummyDataGeneratorUI->>SchemaEngine: Submit configured schemas
    SchemaEngine-->>DummyDataGeneratorUI: Return generated data
    DummyDataGeneratorUI->>JsonPreview: Render generated JSON
    DummyDataGeneratorUI->>JsonPreview: Show status "in sync"
```
