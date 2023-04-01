import * as vscode from 'vscode';
import { EdmlColorProvider } from './color';
import { EdmlCompletionItemProvider } from './completion';
import { createDiagnostics } from './diagnostics';

export let diagnosticCollection: vscode.DiagnosticCollection;

export function activate(context: vscode.ExtensionContext) {
	diagnosticCollection = vscode.languages.createDiagnosticCollection('edml')
	createDiagnostics(vscode.window.activeTextEditor?.document);
	context.subscriptions.push(
		vscode.languages.registerCompletionItemProvider('edml', new EdmlCompletionItemProvider(), '.'),
		vscode.languages.registerColorProvider('edml', new EdmlColorProvider()),
		vscode.window.onDidChangeActiveTextEditor(e => createDiagnostics(e?.document)),
		vscode.workspace.onDidChangeTextDocument(e => createDiagnostics(e.document))
	);
}

export function deactivate() {}
