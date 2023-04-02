import { createGlobalStyle } from 'styled-components'

import { colors } from '../themes/default/colors'

export const GlobalStyle = createGlobalStyle`
  body {
    height: 100%;
    min-height: 320px;
    margin: 0;
    padding: 0;
    font-family: "Manrope", Verdana, sans-serif;
    font-style: normal;
    color: ${() => colors.primary.gray800};
    background-color: ${() => colors.primary.white};
    overflow-x: hidden;

    font-weight:500;
    font-size: 14px;
    line-height:24px;

    & > div:first-child {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }

  * {
    font-family: "Manrope", sans-serif;
  }

  html {
    height: 100%;
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`
