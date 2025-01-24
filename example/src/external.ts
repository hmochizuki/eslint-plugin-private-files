import { privateFunction as _ } from "./example.private.ts"; // valid
import { externalFunction as _folderExternal } from "./folder/external.ts"; // valid
import { privateFunction as _folderPrivate } from "./folder/example.private.ts"; // invalid
