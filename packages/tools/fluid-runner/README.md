# @fluidframework/fluid-runner

This package contains utility for running various functionality inside a Fluid Framework environment.

## Export File

Allows some execution to be made on a container given a provided ODSP snapshot.

### Sample command

If package is installed globally:
`node fluid-runner exportFile --codeLoader=compiledBundle.js --inputFile=inputFileName.fluid --outputFile=result.txt --telemetryFile=telemetryFile.txt`

If working directly on this package:
`node bin/fluid-runner exportFile --codeLoader=compiledBundle.js --inputFile=inputFileName.fluid --outputFile=result.txt --telemetryFile=telemetryFile.txt`

### Code Loader bundle format

The Code Loader bundle should provide defined exports required for this functionality.
For more details on what exports are needed, see [codeLoaderBundle.ts](./src/codeLoaderBundle.ts).

#### "codeLoader" vs "IFluidFileConverter" argument

You may notice the command line argument `codeLoader` is optional. If you choose not to provide a value for `codeLoader`, you must extend this library
and provide a [`IFluidFileConverter`](./src/codeLoaderBundle.ts) implementation to the [`fluidRunner(...)`](./src/fluidRunner.ts) method.

```
import { fluidRunner } from "@fluidframework/fluid-runner";

fluidRunner({ /* IFluidFileConverter implementation here */ });
```

> **Note**: Only one of `codeLoader` or `fluidRunner(...)` argument is allowed. If both or none are provided, an error will be thrown at the start of execution.

### Input file format

The input file is expected to be an ODSP snapshot.
For some examples, see the files in the [localOdspSnapshots folder](./src/test/localOdspSnapshots).

### Telemetry format

There is an optional command line option `telemetryFormat` that allows you to specify the telemetry output format. The naming provided to this option is strict and must match an option in [OutputFormat](./src/logger/fileLogger.ts).
The default format is currently `JSON`

### Additional telemetry properties

There is an optional command line option `telemetryProp` that allows you to specify additional properties that will be added to every telemetry entry. The format follows these rules:

-   every key must be a string
-   values may be either a string or a number
-   keys and values cannot be empty

Example of valid usages:

```
--telemetryProp prop1 value1 --telemetryProp prop2 10.5
--telemetryProp "  prop1 " "   value1 " prop2 value2
--telemetryProp prop1 "aaa=bbb" prop2 "aaa\"bbb"
```

> No trimming of white-space inside quotes

Example of invalid usages:

```
--telemetryProp "10" value1
--telemetryProp prop1
--telemetryProp=             // this will be treated as ['']
```

### Consumption

The code around `exportFile` can be consumed in multiple different layers. It is not necessary to run all this code fully as is, and the following are some interesting code bits involved in this workflow:

-   [`createLogger(...)`](./src/logger/fileLogger.ts)
    -   Creates and wraps an `IFileLogger` and adds some useful telemetry data to every entry
-   [`createContainerAndExecute(...)`](./src/exportFile.ts)
    -   This is the core logic for running some action based on a local ODSP snapshot
-   [`getSnapshotFileContent(...)`](./src/utils.ts)
    -   Reads a local ODSP snapshot from both JSON and binary formats for usage in `createContainerAndExecute(...)`

For an example of a consumption path that differs slightly to [`exportFile(...)`](./src/exportFile.ts), see [`parseBundleAndExportFile(...)`](./src/parseBundleAndExportFile.ts). In addition to running the same logic as [`exportFile`](./src/exportFile.ts) method, it implements the logic around parsing a dynamically provided bundle path into an `IFluidFileConverter` object.

<!-- AUTO-GENERATED-CONTENT:START (README_TRADEMARK_SECTION:includeHeading=TRUE) -->

<!-- prettier-ignore-start -->
<!-- NOTE: This section is automatically generated using @fluid-tools/markdown-magic. Do not update these generated contents directly. -->

## Trademark

This project may contain Microsoft trademarks or logos for Microsoft projects, products, or services.

Use of these trademarks or logos must follow Microsoft's [Trademark & Brand
Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general).

Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.

<!-- prettier-ignore-end -->

<!-- AUTO-GENERATED-CONTENT:END -->
