/**
 Copyright 2018 Alibaba Group

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

/**
 * Transforms matrix into an object
 *
 * @param string matrix
 * @return object
 */

// TODO matrix4 for 3D
const matrixToTransformObj = function(matrix) {
  // this happens when there was no rotation yet in CSS
  if (matrix === 'none') {
    matrix = 'matrix(0,0,0,0,0)';
  }
  let obj = {},
    values = matrix.match(/([-+]?[\d\.]+)/g);
  let [a, b, c, d, e, f] = values;
  obj.rotate = obj.rotateZ = Math.round(
      Math.atan2(parseFloat(b), parseFloat(a)) * (180 / Math.PI)) || 0;
  obj.translateX = e !== undefined ? pxTo750(e) : 0;
  obj.translateY = f !== undefined ? pxTo750(f) : 0;
  obj.scaleX = Math.sqrt(a * a + b * b);
  obj.scaleY = Math.sqrt(c * c + d * d);
  return obj;
};

function pxTo750(n) {
  return n / document.body.clientWidth * 750;
}

function px(n) {
  return n / 750 * document.body.clientWidth;
  // return Math.round(n / 750 * document.body.clientWidth);
}

function clamp(n, min, max) {
  return n < min ? min : n > max ? max : n;
}

const vendor = (function() {
  var el = document.createElement('div').style;
  var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
    transform,
    i = 0,
    l = vendors.length;
  for (; i < l; i++) {
    transform = vendors[i] + 'ransform';
    if (transform in el) return vendors[i].substr(0, vendors[i].length - 1);
  }
  return false;
})();

/**
 *  add vendor to attribute
 *  @memberOf Util
 *  @param {String} attrName name of attribute
 *  @return { String }
 **/
function prefixStyle(attrName) {
  if (vendor === false) return false;
  if (vendor === '') return attrName;
  return vendor + attrName.charAt(0).toUpperCase() + attrName.substr(1);
}


export {
  matrixToTransformObj,
  pxTo750,
  px,
  clamp,
  prefixStyle
};