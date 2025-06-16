const http = require("http");
const https = require("https");

const server = http.createServer((req, res) => {
  if (req.url.includes("ps3-updatelist.txt")) {
    const options = {
      hostname: "update.superstoregames.com",
      port: 80,
      path: "/PS3/list/ps3-updatelist.txt",
      method: "GET",
    };

    const proxyReq = http.request(options, proxyRes => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    });

    proxyReq.on("error", err => {
      res.writeHead(502, { "Content-Type": "text/plain" });
      res.end("Erro ao redirecionar a atualização do PS3.");
    });

    proxyReq.end();
  } else {
    res.writeHead(403, { "Content-Type": "text/plain" });
    res.end("Acesso negado: proxy PS3 ativo apenas para update.");
  }
});

const PORT = process.env.PORT || 80;
server.listen(PORT, () => {
  console.log("Proxy PS3 ativo na porta " + PORT);
});
