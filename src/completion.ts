import * as vscode from 'vscode';

export class EdmlCompletionItemProvider implements vscode.CompletionItemProvider {
	provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
		let completionList: vscode.CompletionItem[] = [];

		let builtins = [];
		builtins.push(...[
			'import', 'boolean', 'number', 'string', 'date', 'regex', 'error', 'range',
			'now', 'utc', 'setDate', 'setTime', 'setYear', 'setMonth', 'setDay', 'setHour', 'setMinute', 'setSecond', 'setMillisecond',
			'addDateTime', 'addDate', 'addTime', 'addYear', 'addMonth', 'addDay', 'addHour', 'addMinute', 'addSecond', 'addMillisecond', 'formatDate',
			'match', 'matchGroup', 'test', 'search', 'replace', 'split',
			'abs', 'acos', 'acosh', 'asin', 'asinh', 'atan', 'atanh', 'atan2', 'cbrt', 'ceil', 'cos', 'cosh', 'exp',
			'floor', 'hypot', 'log', 'log10', 'log2', 'random', 'round', 'sign', 'sin', 'sinh', 'sqrt', 'tan', 'tanh', 'trunc',
			'print', 'printTable'
		].map(i => new vscode.CompletionItem(i, vscode.CompletionItemKind.Function)));
		builtins.push(...[
			'const'
		].map(i => new vscode.CompletionItem(i, vscode.CompletionItemKind.Constant)))
		
		let controls = [];
		controls.push(...[
			'if', 'else', 'switch', 'case', 'default', 'try', 'catch', 'for', 'while', 'do', 'delete', 'break', 'continue', 'return', 'throw', 'require'
		].map(i => new vscode.CompletionItem(i, vscode.CompletionItemKind.Keyword)))

		if (context.triggerCharacter == null) {
			completionList.push(...builtins);
			completionList.push(...[
				'builtin', 'global'
			].map(i => new vscode.CompletionItem(i, vscode.CompletionItemKind.Keyword)))
			completionList.push(...controls)
		} else if (context.triggerCharacter == '.') {
			let parentName = document.getText(new vscode.Range(new vscode.Position(0, 0), position))
				.match(/([0-9a-zA-Z_.\s]+)\.$/)?.[1].replace(/\s/g, '')
			
			if (parentName == 'builtin') completionList.push(...builtins);
			else if (parentName == 'const' || parentName == 'builtin.const') {
				completionList.push(...[
					'e', 'pi', 'epsilon', 'minValue', 'maxValue'
				].map(i => new vscode.CompletionItem(i, vscode.CompletionItemKind.Constant)))
			}
		}

		return completionList;
	}
}
