import socketio
import eventlet

socket_server = socketio.Server()
app = socketio.WSGIApp(socket_server, static_files={
    '/': {'content_type': 'text/html', 'filename': 'index.html'}
})