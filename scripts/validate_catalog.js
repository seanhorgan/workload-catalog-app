import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const workloadsFile = path.join(__dirname, '../src/data/workloads.ts');
const content = fs.readFileSync(workloadsFile, 'utf8');

// Simple parsing of workloads.ts
const workloads = [];
const workloadMatches = content.matchAll(/\{\s*id:\s*"([^"]+)"[\s\S]*?githubUrl:\s*"([^"]+)"[\s\S]*?variables:\s*\{([\s\S]*?)\}/g);

for (const match of workloadMatches) {
  const id = match[1];
  const githubUrl = match[2];
  const variablesStr = match[3];
  
  const variables = {};
  const varMatches = variablesStr.matchAll(/(\w+):\s*"([^"]+)"/g);
  for (const varMatch of varMatches) {
    variables[varMatch[1]] = varMatch[2];
  }
  
  workloads.push({ id, githubUrl, variables });
}

console.log(`Found ${workloads.length} workloads in workloads.ts\n`);

async function validate() {
  for (const workload of workloads) {
    console.log(`--------------------------------------------------`);
    console.log(`Validating workload: ${workload.id}`);
    
    // Construct raw URL for config.json
    const rawUrl = workload.githubUrl
      .replace('github.com', 'raw.githubusercontent.com')
      .replace('/tree/', '/') + '/config.json';
      
    console.log(`Fetching source of truth from: ${rawUrl}`);
      
    try {
      const response = await fetch(rawUrl);
      if (!response.ok) {
        console.error(`Error: Failed to fetch config (Status ${response.status})`);
        continue;
      }
      const config = await response.json();
      
      console.log(`\nComparison for ${workload.id}:`);
      
      // Compare ISL
      const localIsl = workload.variables.isl;
      const remoteIslMax = config.input_sequence_length?.max;
      console.log(`ISL:`);
      console.log(`  Local (app):  ${localIsl}`);
      console.log(`  Remote (git): Max = ${remoteIslMax}`);
      
      if (localIsl && remoteIslMax) {
        if (localIsl.includes(remoteIslMax.toString())) {
          console.log(`  [OK] Remote Max (${remoteIslMax}) found in local string.`);
        } else {
          console.log(`  [FAIL] Remote Max (${remoteIslMax}) NOT found in local string.`);
        }
      }

      // Compare OSL
      const localOsl = workload.variables.osl;
      const remoteOslMax = config.output_sequence_length?.max;
      console.log(`OSL:`);
      console.log(`  Local (app):  ${localOsl}`);
      console.log(`  Remote (git): Max = ${remoteOslMax}`);
      
      if (localOsl && remoteOslMax) {
        if (localOsl.includes(remoteOslMax.toString())) {
          console.log(`  [OK] Remote Max (${remoteOslMax}) found in local string.`);
        } else {
          console.log(`  [FAIL] Remote Max (${remoteOslMax}) NOT found in local string.`);
        }
      }
      
      // Add more comparisons as needed
      
    } catch (error) {
      console.error(`Error validating ${workload.id}:`, error.message);
    }
    console.log(`--------------------------------------------------\n`);
  }
}

validate();
