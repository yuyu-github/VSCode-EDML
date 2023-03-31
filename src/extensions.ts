import * as vscode from 'vscode';
import { EdmlCompletionItemProvider } from './completion';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.languages.registerCompletionItemProvider('edml', new EdmlCompletionItemProvider(), '.'),
	);
}

export function deactivate() {}
