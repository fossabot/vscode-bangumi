import * as vscode from 'vscode';
import { globalVar } from '../constant';


/**
 *  Quick Create a WebviewPanel
 *
 * @export
 * @param {string} viewType
 * @param {string} title
 * @param {() => any} listener
 * @returns {vscode.WebviewPanel}
 *
 * @author sdttttt
 */
export function createWebviewPanel(viewType: string, title: string, listener: () => any ): vscode.WebviewPanel {
    const panel = vscode.window.createWebviewPanel(
        "Hello",
        "Bangumis",
        vscode.ViewColumn.Two,
        {
          retainContextWhenHidden: false,
          enableFindWidget: true
        }
    );

    panel.onDidDispose(
        listener,
        null,
        globalVar().context.subscriptions
      );

    return panel;
}