@echo off
rem Aggiorna il sito sul PC - Version: 1.01
rem Doppio clic: copia di sicurezza del database, codice nuovo da GitHub, ricostruzione e riavvio.
rem I contenuti (testi, menu, foto) non passano da qui: arrivano dal ramo contenuti di GitHub, pannello > Contenuti su GitHub.
chcp 65001 >nul
cd /d "%~dp0"
for /f %%i in ('powershell -NoProfile -Command "Get-Date -Format yyyy-MM-dd_HHmm"') do set ORA=%%i
if not exist backup mkdir backup

echo.
echo [1/3] Copia di sicurezza del database in backup\db-%ORA%.sql
docker compose exec -T db pg_dump -U serralunga serralunga > "backup\db-%ORA%.sql"
if errorlevel 1 echo     Copia non riuscita: Docker Desktop e' avviato? Proseguo comunque.

echo.
echo [2/3] Codice nuovo da GitHub
git pull --ff-only origin claude/project-thread-cs7x7p
if errorlevel 1 goto errore

echo.
echo [3/3] Ricostruzione e riavvio del sito (alcuni minuti)
docker compose up -d --build
if errorlevel 1 goto errore

echo.
echo Fatto. Pannello: http://127.0.0.1:8091/admin  -  Sito: http://127.0.0.1:8091/
echo Contenuti: pannello, riquadro "Contenuti su GitHub" (Salva su GitHub dopo le modifiche).
pause
exit /b 0

:errore
echo.
echo Aggiornamento non completato: leggi il messaggio qui sopra. Il sito di prima e' ancora attivo.
pause
exit /b 1
