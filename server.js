const http = require("http");
const httpProxy = require("http-proxy");

const proxy = httpProxy.createProxyServer({ changeOrigin: true });

const server = http.createServer((req, res) => {
  if (req.url.includes("ps3-updatelist.txt")) {
    proxy.web(req, res, { target: "http://update.superstoregames.com" });
  } else {
    res.writeHead(403, { "Content-Type": "text/plain" });
    res.end("Acesso negado: proxy PS3 ativo apenas para update.");
  }
});

const PORT = process.env.PORT || 80;
server.listen(PORT, () => {
  console.log("Proxy PS3 ativo na porta " + PORT);
});
