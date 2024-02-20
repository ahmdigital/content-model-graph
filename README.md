# sanity-plugin-content-model-graph

> This is a **Sanity Studio v3** plugin.

## Installation

```sh
npm install sanity-plugin-content-model-graph
```

## Usage

Add it as a plugin in `sanity.config.ts` (or .js):

```ts
import { defineConfig } from "sanity";
import { myPlugin } from "sanity-plugin-content-model-graph";

export default defineConfig({
  //...
  plugins: [myPlugin({})],
});
```

## Examples (need updating, it looks nicer now)

### Sanity's Movie schema

![Screen Shot 1](https://user-images.githubusercontent.com/4197647/68980721-66e8da00-0855-11ea-9d2f-233f69679221.png)
![Screen Shot 2](https://user-images.githubusercontent.com/4197647/68980734-6e0fe800-0855-11ea-8ec0-d7948ef46014.png)

### Sanity's Product schema

![Screen Shot 2019-11-16 at 11 52 00 pm](https://user-images.githubusercontent.com/4197647/68993455-77886700-08cc-11ea-8a5c-1653d44fee07.png)
![Screen Shot 2019-11-16 at 11 52 12 pm](https://user-images.githubusercontent.com/4197647/68993452-77886700-08cc-11ea-8426-02447b894b9f.png)

## License

[MIT](LICENSE) © ahm Digital

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.
