import firebaseRulesPlugin from '@firebase/eslint-plugin-security-rules';
import type { Linter } from 'eslint';

const recommendedConfig = firebaseRulesPlugin.configs[
  'flat/recommended'
] as unknown as Linter.Config | Linter.Config[];

const config: Linter.Config[] = [
  {
    ignores: ['.next/**/*', 'dist/**/*', 'node_modules/**/*'],
  },
  ...(Array.isArray(recommendedConfig)
    ? recommendedConfig
    : [recommendedConfig]),
];

export default config;
