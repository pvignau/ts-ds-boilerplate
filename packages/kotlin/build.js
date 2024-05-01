import { registerTransforms } from "@tokens-studio/sd-transforms";
import { getFilesToCompute } from "@ts-boilerplate/common";
import StyleDictionary from "style-dictionary";
import composeColorTransformer from './src/transformers/colorComposeColor.js';
import resolveMathToDpToDpTransformer from './src/transformers/resolveMathToDp.js';

const cfg = {
  platforms: {
    "kotlin": {
      transformGroup: 'tokens-studio',
      transforms: [
        'attribute/cti',
        'name/cti/camel',
        'size/resolveMathToDp',
        'color/composeColor',
        'ts/typography/compose/shorthand',
      ],
      "buildPath": "dist/",
      "files": [{
        "destination": "tokens.kt",
        "format": "compose/object",
        packageName: 'fr.tsdsboilerplate.tokens',
        filter : (token) => token.type !== 'typography',
        options: {
          import: []
        }
      }],
    },
  },
};

const sd = StyleDictionary.extend({
  ...cfg,
  ...getFilesToCompute('theme_app')
});

sd.registerTransform(composeColorTransformer);
sd.registerTransform(resolveMathToDpToDpTransformer);
registerTransforms(sd);

sd.cleanAllPlatforms();
sd.buildAllPlatforms();