const assert = require('assert');
const vscode = require('vscode');

suite('Faaa Error Alert Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    test('Extension should be present', () => {
        const extension = vscode.extensions.getExtension('your-publisher-name.faaa-error-alert');
        assert.ok(extension);
    });

    test('Extension should activate', async () => {
        const extension = vscode.extensions.getExtension('your-publisher-name.faaa-error-alert');
        await extension.activate();
        assert.strictEqual(extension.isActive, true);
    });
});