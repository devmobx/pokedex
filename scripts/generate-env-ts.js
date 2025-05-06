const fs = require("fs");
const path = require("path");
const pc = require("picocolors");

const envFile = path.resolve(__dirname, "../.env.production");

if (!fs.existsSync(envFile)) {
  console.error(`Error: ${envFile} does not exist.`);
  process.exit(1);
}

const envContent = fs.readFileSync(envFile, "utf8");
const envLines = envContent
  .split("\n")
  .map(line => line.trim())
  .filter(line => line && !line.startsWith("#") && line.includes("="));

const envEntries = envLines.map(line => {
  const [key, value] = line.split("=").map(part => part.trim());
  const cleanKey = key.replace(/^EXPO_PUBLIC_/, "");

  const isBoolean = value === "true" || value === "false";
  const isEnvironment = key === "EXPO_PUBLIC_ENVIRONMENT";
  const typeDefinition = isEnvironment
    ? `process.env.${key} as 'development' | 'production' | 'test'`
    : isBoolean
    ? `JSON.parse(process.env.${key} as string) as boolean`
    : `process.env.${key} as string`;

  return `  ${cleanKey}: ${typeDefinition},`;
});

const envTsContent = `/* prettier-ignore */\nexport const Env = {\n${envEntries.join(
  "\n"
)}\n};\n`;

const outputPath = path.resolve(__dirname, "../src/env.ts");

fs.writeFileSync(outputPath, envTsContent, "utf8");

console.log(pc.blueBright(`Generated env.ts at: ${pc.dim(outputPath)}`));
