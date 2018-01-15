/**
 * This file is part of TeamELF
 *
 * (c) GuessEver <guessever@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const gulp = require('teamelf-gulp');

gulp({
  modules: {
    'teamelf/task': './js/**/*.js'
  },
  output: './dist/task.js'
}, {
  modules: [
    './less/**/*.less'
  ],
  output: './dist/task.css'
});
