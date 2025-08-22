import { WebSocketServer } from "ws";

import jwt, {JwtPayload} from "jsonwebtoken";
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws,request) {
    const url=request.url;
    if(!url){
        return ws.close();
    }
    const query = new URLSearchParams(url.split('?')[1]);
    const token = query.get('token')|| "";
    if(!token){

    }
const decoded=jwt.verify(token,process.env.JWT_SECRET!);
    if(!decoded || !(decoded as JwtPayload).userId){
        return ws.close();
    }

    ws.on('message', function message(data) {
        ws.send('pong');
    });

});