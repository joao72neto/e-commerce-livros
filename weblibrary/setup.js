const { execSync, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function checkCommand(cmd) {
    try {
        execSync(`${cmd} --version`, { stdio: 'ignore' });
        return true;
    } catch {
        return false;
    }
}

function runCommand(command, args, options = {}) {
    const result = spawnSync(command, args, { stdio: 'inherit', ...options });
    if (result.error || result.status !== 0) {
        throw new Error(`Erro ao executar: ${command} ${args.join(' ')}`);
    }
}

function main() {
    console.log('Iniciando setup do projeto...');

    if (!checkCommand('node')) {
        console.error('Node.js não encontrado. Instale antes de continuar.');
        process.exit(1);
    }
    console.log('Node.js encontrado');

    let pythonCmd = null;
    if (checkCommand('python3')) {
        pythonCmd = 'python3';
    } else if (checkCommand('python')) {
        pythonCmd = 'python';
    } else {
        console.error('Python não encontrado. Instale antes de continuar.');
        process.exit(1);
    }
    console.log(`Python encontrado (${pythonCmd})`);

    const venvPath = path.join('ai-service', '.venv');
    if (!fs.existsSync(venvPath)) {
        console.log('Criando ambiente virtual Python...');
        runCommand(pythonCmd, ['-m', 'venv', venvPath]);
    } else {
        console.log('Ambiente virtual Python já existe.');
    }

    // Atuvação do venv

    const isWin = process.platform === 'win32';
    const pipPath = isWin
        ? path.join(venvPath, 'Scripts', 'pip.exe')
        : path.join(venvPath, 'bin', 'pip');

    console.log('Atualizando pip...');
    runCommand(pipPath, ['install', '--upgrade', 'pip']);

    console.log('Instalando dependências Python...');
    runCommand(pipPath, ['install', '-r', path.join('ai-service', 'requirements.txt')]);

    console.log('Instalando dependências Node.js...');
    runCommand('npm', ['install']);

    console.log('Setup concluído com sucesso!');
}

main();