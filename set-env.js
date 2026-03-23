const fs = require('fs');
const path = require('path');

// Ajustado para o nome da pasta que aparece no seu VS Code: "environments"
// E para o nome do arquivo com o erro de digitação: "enviroment.ts"
const envDir = path.join(__dirname, 'src/environments');
const targetPath = path.join(envDir, 'enviroment.ts'); 

// Garante que a pasta existe
if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

// O conteúdo usará os valores que você cadastrará na Vercel
const envConfigFile = `
export const environment = {
  production: true,
  WEATHERAPI_KEY: '${process.env.WEATHERAPI_KEY}',
  OPENWEATHER_KEY: '${process.env.OPENWEATHER_KEY}'
};
`;

fs.writeFileSync(targetPath, envConfigFile);
console.log(`✅ Arquivo gerado em: ${targetPath}`);