const vscode = require('vscode');
const path = require('path');

let lastErrorCount = 0;
let lastTriggerTime = 0;

function activate(context) {

    vscode.languages.onDidChangeDiagnostics(() => {

        const diagnostics = vscode.languages.getDiagnostics();
        let errorCount = 0;
        let latestErrorMessage = "";

        diagnostics.forEach(([uri, diag]) => {
            const errors = diag.filter(d => d.severity === vscode.DiagnosticSeverity.Error);
            errorCount += errors.length;

            if (errors.length > 0) {
                latestErrorMessage = errors[0].message;
            }
        });

        const now = Date.now();

        // 3 second cooldown
        if (errorCount > lastErrorCount && now - lastTriggerTime > 3000) {
            playSound(context);
            showPopup(latestErrorMessage);
            lastTriggerTime = now;
        }

        lastErrorCount = errorCount;
    });
}

function showPopup(message) {
    vscode.window.showErrorMessage(
        `FAAAAAAAAA!!! 🔥\n error : ${message}`
    );
}

const { exec } = require('child_process');
const os = require('os');

function playSound(context) {
    const soundFile = path.join(context.extensionPath, 'media', 'error.wav');

    if (process.platform === 'darwin') {
        // macOS
        exec(`afplay "${soundFile}"`);
    } 
    else if (process.platform === 'win32') {
        // Windows (WAV only)
        exec(`powershell -c (New-Object Media.SoundPlayer '${soundFile.replace(/'/g, "''")}').PlaySync();`);
    } 
    else if (process.platform === 'linux') {
        // Linux
        exec(`paplay "${soundFile}" || aplay "${soundFile}"`);
    }
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};