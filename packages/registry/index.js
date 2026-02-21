import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const registryPath = join(__dirname, 'registry.json');
const registryData = JSON.parse(readFileSync(registryPath, 'utf-8'));

export const REGISTRY = registryData;

export const COMPONENT_NAMES = Object.keys(REGISTRY);

export function getComponentConfig(componentName) {
  return REGISTRY[componentName] || null;
}

export function hasComponent(componentName) {
  return componentName in REGISTRY;
}
