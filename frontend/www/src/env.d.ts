declare interface CSS {
  paintWorklet: {
    addModule(moduleURL: string): Promise<void>;
  };
}

interface ImportMetaEnv {
  readonly DEPLOY_ADAPTER: "node" | "vercel";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
