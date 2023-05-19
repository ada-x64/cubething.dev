export type MetadataResponse = {
  url: string;
  lastCommitDate: string;
  contentType: string;
  frontmatter?: {
    title: string;
    publishedAt: string;
    snippet: string;
  };
};

// https://bobbyhadz.com/blog/typescript-make-property-required
export type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
  [Property in Key]-?: Type[Property];
};

export type PostMetadataResponse = WithRequiredProperty<
  MetadataResponse,
  "frontmatter"
>;

export type GfxMetadataResponseMap = {
  [x: string]: GfxMetadataResponse;
};

export type GfxMetadataResponse = {
  "target_bg.wasm": MetadataResponse;
  "README.md": PostMetadataResponse;
  "preview.png": MetadataResponse;
  "target.min.js": MetadataResponse;
};
