fx_version 'cerulean'
game 'gta5'

ui_page 'dist/web/index.html'

files {
  'dist/web/index.html',
  'dist/web/**/*.js',
  'dist/web/**/*.css'
}

client_script 'dist/client/bundle.client.js'
server_script 'dist/server/bundle.server.js'

