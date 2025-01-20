"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    console.log('Congratulations, your extension "format-on-auto-save" is now active!');
    const workspace = vscode.workspace;
    context.subscriptions.push(workspace.onWillSaveTextDocument(() => {
        const activeEditor = vscode.window.activeTextEditor;
        const editorConfig = workspace.getConfiguration("editor"), languageConfig = workspace.getConfiguration(`[${activeEditor === null || activeEditor === void 0 ? void 0 : activeEditor.document.languageId}]`);
        const shouldFormatLanguage = languageConfig["editor.formatOnSave"];
        let shouldFormat = editorConfig.get("formatOnSave");
        if (shouldFormatLanguage !== undefined && shouldFormatLanguage !== null) {
            shouldFormat = shouldFormatLanguage;
        }
        if (shouldFormat) {
            //TODO: Refactor to use vscode.executeFormatDocumentProvider
            vscode.commands.executeCommand("editor.action.format", activeEditor === null || activeEditor === void 0 ? void 0 : activeEditor.document.uri);
        }
    }));
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map