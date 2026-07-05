import { env, getFrontendEnv, type FrontendEnv } from '../src/lib/env';

// Type checks
const _config: FrontendEnv = getFrontendEnv();
const _apiUrl: string = env.apiUrl;
const _enableOcr: boolean = env.enableOcr;

console.log("Env types validated successfully");
