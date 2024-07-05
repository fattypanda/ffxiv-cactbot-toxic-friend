function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["./memory-CWOdWqTm.js","./index-BZidYQRY.js","./index-D2OtIDr1.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import { _ as __vitePreload } from "./index-BZidYQRY.js";
const errors = {
  INVALID: ["seeking position failed.", "InvalidStateError"],
  GONE: ["A requested file or directory could not be found at the time an operation was processed.", "NotFoundError"],
  MISMATCH: ["The path supplied exists, but was not an entry of requested type.", "TypeMismatchError"],
  MOD_ERR: ["The object can not be modified in this way.", "InvalidModificationError"],
  SYNTAX: (m) => [`Failed to execute 'write' on 'UnderlyingSinkBase': Invalid params passed. ${m}`, "SyntaxError"],
  ABORT: ["The operation was aborted", "AbortError"],
  SECURITY: ["It was determined that certain files are unsafe for access within a Web application, or that too many calls are being made on file resources.", "SecurityError"],
  DISALLOWED: ["The request is not allowed by the user agent or the platform in the current context.", "NotAllowedError"]
};
const isChunkObject = (chunk) => {
  return typeof chunk === "object" && typeof chunk.type !== "undefined";
};
async function makeDirHandleFromFileList(fileList) {
  var _a, _b, _c;
  const { FolderHandle, FileHandle } = await __vitePreload(() => import("./memory-CWOdWqTm.js"), true ? __vite__mapDeps([0,1,2]) : void 0, import.meta.url);
  const { FileSystemDirectoryHandle } = await __vitePreload(() => import("./index-BZidYQRY.js").then((n) => n.a), true ? __vite__mapDeps([1,2]) : void 0, import.meta.url);
  const rootName = (_b = (_a = fileList[0].webkitRelativePath) === null || _a === void 0 ? void 0 : _a.split("/", 1)[0]) !== null && _b !== void 0 ? _b : "";
  const root = new FolderHandle(rootName, false);
  for (let i = 0; i < fileList.length; i++) {
    const file = fileList[i];
    const path = ((_c = file.webkitRelativePath) === null || _c === void 0 ? void 0 : _c.length) ? file.webkitRelativePath.split("/") : ["", file.name];
    path.shift();
    const name = path.pop();
    const dir = path.reduce((dir2, path2) => {
      if (!dir2._entries[path2])
        dir2._entries[path2] = new FolderHandle(path2, false);
      return dir2._entries[path2];
    }, root);
    dir._entries[name] = new FileHandle(file.name, file, false);
  }
  return new FileSystemDirectoryHandle(root);
}
async function makeFileHandlesFromFileList(fileList) {
  const { FileHandle } = await __vitePreload(() => import("./memory-CWOdWqTm.js"), true ? __vite__mapDeps([0,1,2]) : void 0, import.meta.url);
  const { FileSystemFileHandle } = await __vitePreload(() => import("./index-BZidYQRY.js").then((n) => n.F), true ? __vite__mapDeps([1,2]) : void 0, import.meta.url);
  const files = Array.from(fileList).map((file) => new FileSystemFileHandle(new FileHandle(file.name, file, false)));
  return files;
}
export {
  errors,
  isChunkObject,
  makeDirHandleFromFileList,
  makeFileHandlesFromFileList
};
