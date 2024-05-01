import { registerTransforms } from "@tokens-studio/sd-transforms";
import { getFilesToCompute } from "@ts-boilerplate/common";
import StyleDictionary from "style-dictionary";

registerTransforms(StyleDictionary);

const cfg = {
  platforms: {
    "scss": {
      "transformGroup": "tokens-studio",
      "buildPath": "dist/",
      "files": [{
        "destination": "tokens.scss",
        "format": "scss/variables"
      }]
    },
  },
};

const sd = StyleDictionary.extend({
  ...cfg,
  ...getFilesToCompute('theme_web')
});

sd.cleanAllPlatforms();
sd.buildAllPlatforms();