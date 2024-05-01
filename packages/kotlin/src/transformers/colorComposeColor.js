import StyleDictionary from 'style-dictionary';

export default {
  name: 'color/composeColor',
  type: 'value',
  matcher: (token) => token.type === 'color',
  transformer: (token) =>
    StyleDictionary.transform['color/composeColor'].transformer(token),
}