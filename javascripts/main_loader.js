/**
 * @author Senad Dizdar
 * 
 * Copyright (C) 2010-2011, cloudHQ 
 * All rights reserved.
 *b
 */

// global variables
// NOTE: we don't use var becasue we want that variables are declared in global context. 
//       Each of the files is wrapped by Google Chrome into its own enclosure so var really does
//       makes variable global.
// 
g_server_url = "https://www.cloudhq.net/";
var version_date = new Date().toJSON().slice(0,10)
InboxSDK.loadScript(chrome.extension.getURL('javascripts/note.js'));
