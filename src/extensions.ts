import * as vscode from 'vscode';
import { EdmlCompletionItemProvider } from './completion';
import { createDiagnostics } from './diagnostics';

export let diagnosticCollection: vscode.DiagnosticCollection;

export function activate(context: vscode.ExtensionContext) {
	diagnosticCollection = vscode.languages.createDiagnosticCollection('edml');
	context.subscriptions.push(
		vscode.languages.registerCompletionItemProvider('edml', new EdmlCompletionItemProvider(), '.'),
		diagnosticCollection,
		vscode.workspace.onDidChangeTextDocument(e => createDiagnostics(e.document))
	);
}

export function deactivate() {}
