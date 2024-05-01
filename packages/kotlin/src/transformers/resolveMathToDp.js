import { checkAndEvaluateMath } from '@tokens-studio/sd-transforms'

export default {
  name: 'size/resolveMathToDp',
  type: 'value',
  transitive: true,
  matcher: token => typeof token.value === 'string' && ['fontWeights', 'letterSpacing'].indexOf(token.type) === -1,
  transformer: (token) => {
    const value = checkAndEvaluateMath(token.value.replace(/px|\.dp/g, ""));
    if (typeof value === 'number') {
      return `${value}.dp`;
    }

    // If not a number return it as is for further calculation or code quality (`Color(0xff718096).dp` is not so of a color :))
    return `${checkAndEvaluateMath(token.value)}`;
  }
}