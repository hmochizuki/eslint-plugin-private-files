import { privateFunction as _ } from "./_example.ts"; // valid
import { externalFunction as _folderExternal } from "./folder/external.ts"; // valid
import { privateFunction as _folderPrivate } from "./folder/_example.ts"; // invalid
