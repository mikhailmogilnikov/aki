declare interface CSS {
  paintWorklet: {
    addModule(moduleURL: string): Promise<void>;
  };
}
