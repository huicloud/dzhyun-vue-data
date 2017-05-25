'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatStockText = formatStockText;
/**
 * 格式化文本，将输入的数字参数格式化为指定精度的字符串
 * @param {!number|string|null} data      需要格式化的数字，可以是数字，字符串或者null对象
 * @param {?number} precision             保留小数精度，null则默认取2位小数
 * @param {?''|'K'|'M'|'B'|'K/M'|'K/M/B'|'万'|'亿'|'万/亿'|'%'} unit    单位，按自定的单位格式化数据，null则为''为不加单位
 * @param {boolean|string=} useDefault    是否使用默认值，默认显示--，字符串类型表示需要显示的默认值
 * @param {boolean=} isAutoPrec    是否自动进行精度控制，true时 对于不到单位转换的情况时直接取整
 * @param {boolean=} isAbs    是否显示数字绝对值
 * @returns {string}
 */
function formatStockText(data, precision, unit, useDefault, isAutoPrec, isAbs) {
  var n = Number(data);
  if (isNaN(n) && useDefault !== false) {
    return typeof useDefault === 'string' ? useDefault : DEFAULT_VALUE;
  }

  var abs = Math.abs(n),
      m = n;

  unit = unit || '';
  precision = precision != null ? precision : 2;

  if (unit) {
    if (unit.indexOf('B') >= 0 && abs >= 1000 * 1000 * 1000) {
      unit = 'B';
      n = n / (1000 * 1000 * 1000);
    } else if (unit.indexOf('亿') >= 0 && abs >= 10000 * 10000) {
      unit = '亿';
      n = n / (10000 * 10000);
    } else if (unit.indexOf('M') >= 0 && abs >= 1000 * 1000) {
      unit = 'M';
      n = n / (1000 * 1000);
    } else if (unit.indexOf('万') >= 0 && abs >= 10000) {
      unit = '万';
      n = n / 10000;
    } else if (unit.indexOf('K') >= 0 && abs >= 1000) {
      unit = 'K';
      n = n / 1000;
    } else if (unit === 100) {
      unit = '';
      n = n / 100;
    } else if (unit === '%') {
      n = n * 100;
    } else {
      unit = '';
    }
  }

  if (n === m && isAutoPrec === true) {
    precision = 0;
  }
  if (isAbs) {
    n = Math.abs(n);
  }

  return n.toFixed(precision) + unit;
}