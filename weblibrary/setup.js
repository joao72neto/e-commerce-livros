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
    const isWindows = process.platform === 'win32';
    
    if (isWindows && command === 'npm') {
        command = 'npm.cmd';
    }

    const spawnOptions = { 
        stdio: 'inherit',
        ...(isWindows ? { shell: true } : {}),
        ...options 
    };

    const result = spawnSync(command, args, spawnOptions);
    
    if (result.error || result.status !== 0) {
        console.error(`Erro detalhado:`, result.error);
        throw new Error(`Erro ao executar: ${command} ${args.join(' ')}`);
    }
}

function activateVirtualEnv(venvPath) {
    const isWindows = process.platform === 'win32';
    
    if (isWindows) {
        const activateScript = path.join(venvPath, 'Scripts', 'activate.bat');
        console.log('Para ativar o ambiente virtual no Windows, execute:');
        console.log(`${activateScript}`);
    } else {
        const activateScript = path.join(venvPath, 'bin', 'activate');
        console.log('Para ativar o ambiente virtual no Linux/macOS, execute:');
        console.log(`source ${activateScript}`);
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

    const isWindows = process.platform === 'win32';
    const venvPath = path.join('ai-service', '.venv');
    const pythonPath = isWindows
        ? path.join(venvPath, 'Scripts', 'python.exe')
        : path.join(venvPath, 'bin', 'python');

    if (!fs.existsSync(venvPath)) {
        console.log('Criando ambiente virtual Python...');
        runCommand(pythonCmd, ['-m', 'venv', venvPath]);
    } else {
        console.log('Ambiente virtual Python já existe.');
    }

    console.log('Atualizando pip...');
    runCommand(pythonPath, ['-m', 'pip', 'install', '--upgrade', 'pip']);

    console.log('Instalando dependências Python...');
    runCommand(pythonPath, ['-m', 'pip', 'install', '-r', path.join('ai-service', 'requirements.txt')]);

    console.log('Instalando dependências Node.js...');
    runCommand('npm', ['install']);

    console.log('\n=== Ambiente Virtual ===');
    activateVirtualEnv(venvPath);

    console.log('\nSetup concluído com sucesso!');
}

main();