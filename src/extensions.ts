import * as vscode from 'vscode';
import { EdmlColorProvider } from './color';
import { EdmlCompletionItemProvider } from './completion';
import { createDiagnostics } from './diagnostics';

export let diagnosticCollection: vscode.DiagnosticCollection;

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		diagnosticCollection = vscode.languages.createDiagnosticCollection('edml'),
		vscode.languages.registerCompletionItemProvider('edml', new EdmlCompletionItemProvider(), '.'),
		vscode.languages.registerColorProvider('edml', new EdmlColorProvider()),
		vscode.workspace.onDidChangeTextDocument(e => createDiagnostics(e.document))
	);
}

export function deactivate() {}
