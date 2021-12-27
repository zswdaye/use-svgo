
import { optimize } from 'svgo/dist/svgo.browser.js';

const option = {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false
        },
      },
    },
    {
      name: 'removeAttrs',
      params: {
        attrs: "(style|width|height)"
      }
    }
  ]
}
// let svgStr = '<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><defs><style/></defs><path d="M245.1 184.5l362.8 362.8 100.3 100.3H436.9l-14.6 14.6-177.2 177.3v-655m-50-120.7v896.3l262.5-262.5h371.3L643.3 512 195.1 63.8z"/></svg>'

export function a(file) {
  const result = optimize(file, option)
  return result.data
}