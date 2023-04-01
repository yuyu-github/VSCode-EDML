import * as vscode from 'vscode';

export class EdmlColorProvider implements vscode.DocumentColorProvider {
  provideColorPresentations(color: vscode.Color, context: { document: vscode.TextDocument; range: vscode.Range }, token: vscode.CancellationToken) {
    let mark = context.document.getText(context.range)[0];
    let code = mark + '#' +
      Math.round(color.red * 255).toString(16).padStart(2, '0') +
      Math.round(color.green * 255).toString(16).padStart(2, '0') +
      Math.round(color.blue * 255).toString(16).padStart(2, '0') + mark;
    let newColor = [new vscode.ColorPresentation(code)];
    return newColor;
  }

  provideDocumentColors(document: vscode.TextDocument, token: vscode.CancellationToken) {
    let text = document.getText();
    let matches = text.matchAll(/(['"])#([0-9a-fA-F]{3}([0-9a-fA-F]{3})?)\1/g);
    let colors = [...matches].map(i => {
      let range = new vscode.Range(document.positionAt(i.index!), document.positionAt(i.index! + i[0].length))
      let code = i[2].length == 3 ? i[2].replace(/([0-9a-fA-F])/g, '$1$1') : i[2];
      let color = new vscode.Color(
        parseInt(code.slice(0,2), 16) / 255,
        parseInt(code.slice(2,4), 16) / 255,
        parseInt(code.slice(4,6), 16) / 255,
        1.0
      )
      return new vscode.ColorInformation(range, color);
    })
    return colors;
  }
}
