import socket, json, time
import pprint as pp
from coordinates import Coordinate
import threading

s = socket.socket(socket.AF_INET,socket.SOCK_STREAM)

host = "0.tcp.ngrok.io"
port = 19411

###
bind_ip = "0.0.0.0"
bind_port = 8080

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind((bind_ip, bind_port))
server.listen(5)  # max backlog of connections
print('Listening on {}:{}'.format(bind_ip, bind_port))

def handle_client_connection(client_socket):
    request = client_socket.recv(1024)
    print('Received {}'.format(request))
    client_socket.send('ACK!')
    client_socket.close()
###

s.connect((host,port))

a = '''
{
    "category": "tracker",
    "request" : "get",
    "values": [ "push", "iscalibrated" ]
}
'''

s.sendall(a.encode())
print(s.recv(port))

print("++++++++++++++++++++")

b = '''
{
    "category": "tracker",
    "request" : "get",
    "values": [ "frame" ]
}
'''


s.sendall(b.encode())
print(s.recv(port))

print("++++++++++++++++++++")

c = Coordinate(0,0,1300,700)
c.set_grid(3,3)

while True:

    ###
    # client_sock, address = server.accept()
    # print('Accepted connection from {}:{}'.format(address[0], address[1]))
    # client_handler = threading.Thread(
    #     target=handle_client_connection,
    #     args=(client_sock,)  # without comma you'd get a... TypeError: handle_client_connection() argument after * must be a sequence, not _socketobject
    # )
    # client_handler.start()
    ###

    time.sleep(0.05)
    res = s.recv(port).decode().split("\n")
    try:
        res_j = json.loads(res[0])
        avg = res_j["values"]["frame"]["avg"]
        fix = res_j["values"]["frame"]["fix"]
    except:
        print("Exception")
        continue
    pp.pprint(avg)
    # pp.pprint(fix)
    print(c.calculate_region(avg["x"],avg["y"]))