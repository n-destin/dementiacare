import socketio

server = socketio.Server()

@server.event
def connect(sid, environ):
    print('Client connected')

@server.event
def disconnect(sid):
    print('Client disconnected')

if __name__ == '__main__':
    app = socketio.WSGIApp(server)
    app.wsgi_app = socketio.WSGIApp(server, static_files={
        '/': './public/' 
    }) 
    from wsgiref.simple_server import make_server
    server = make_server('0.0.0.0', 8000, app)
    server.serve_forever()