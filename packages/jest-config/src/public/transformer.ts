import { createTransformer } from "babel-jest";

// Need a type annotation because of
// https://github.com/microsoft/TypeScript/issues/47663#issuecomment-1519138189
const transformer: ReturnType<typeof createTransformer> = createTransformer({
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
});

export default transformer;
