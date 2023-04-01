import * as vscode from 'vscode';
import { diagnosticCollection } from './extensions.js';
import * as parser from './parser/parser.js';

export function createDiagnostics(document: vscode.TextDocument | undefined) {
  if (document == undefined) return;
  let diagnostics: vscode.Diagnostic[] = [];
  try {
    parser.parse(document.getText())
  } catch (e) {
    if (e instanceof parser.SyntaxError || e instanceof SyntaxError) {
      let loc: {
        start: {offset: number; line: number; column: number};
        end: {offset: number; line: number; column: number};
      } = (e as any).location;
      if (document.lineAt(loc.start.line - 1).text == '' && loc.start.line == loc.end.line) {
        loc.start.offset -= 1;
        loc.end.offset -= 1;
      }
      let range = new vscode.Range(document.positionAt(loc.start.offset), document.positionAt(loc.end.offset));
      diagnostics.push(new vscode.Diagnostic(range, e.message, vscode.DiagnosticSeverity.Error))
    }
  }
  diagnosticCollection.set(document.uri, diagnostics);
}
