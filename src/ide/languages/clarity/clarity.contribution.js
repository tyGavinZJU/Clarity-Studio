/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict'
import { registerLanguage } from '../_.contribution.js'
registerLanguage({
  id: 'clarity',
  extensions: ['.clar'],
  aliases: ['clarity', 'Clarity'],
  loader: function() { return import('./clarity.js') }
})
