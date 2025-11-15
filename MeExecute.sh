@echo off
echo Iniciando servidor Node...
start node router.js
timeout /t 2
start http://localhost:7781/
echo Servidor iniciado!