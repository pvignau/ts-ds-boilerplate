import path from 'path';
import { readFileSync } from 'fs';

const tokensRootDir = path.resolve('../common/tokens');
const $themes = JSON.parse(readFileSync(`${tokensRootDir}/$themes.json`));
const $metadata = JSON.parse(readFileSync(`${tokensRootDir}/$metadata.json`));

export function getTheme(themeName) {
  for (const theme of $themes) {
    if (theme.name === themeName) return theme;
  }
}

function getSourceSetsFromTheme(theme) {
  return $metadata.tokenSetOrder.filter(
    (tokenSet) => theme.selectedTokenSets[tokenSet] === 'source',
  );
}

function getEnabledSetsFromTheme(theme) {
  return $metadata.tokenSetOrder.filter(
    (tokenSet) => theme.selectedTokenSets[tokenSet] === 'enabled',
  );
}

function getFilePathFromSet(set) {
  return `${tokensRootDir}/${set}.json`;
}

export function getFilesToCompute(themeName) {
  const theme = getTheme(themeName);

  const filesToCompute = {
    include: getSourceSetsFromTheme(theme).map((set) =>
      getFilePathFromSet(set),
    ),
    source: getEnabledSetsFromTheme(theme).map((set) =>
      getFilePathFromSet(set),
    ),
  };

  return filesToCompute;
};