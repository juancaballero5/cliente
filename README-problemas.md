# Problemas frecuentes

---

**Docker no responde**  
Mac/Windows: abre Docker Desktop y espera a la ballena.  
Linux: `sudo systemctl start docker` o `newgrp docker`.

---

**Hot reload no refresca (Windows)**  
El proyecto debe estar en el home de Ubuntu (`~/FP-DevSetup`), no en `/mnt/c/...`.

---

**Puerto ocupado**

```bash
lsof -i :4222
kill -9 <PID>
```

---

**MySQL / Access denied**

```bash
docker compose down -v
docker compose up -d
```

---

**`ng-new` / `react-new` no existen**  
Has entrado con `sh`. Usa: `docker compose exec angular22 bash`

---

**“bad substitution” en Mac**  
Usa `bash setup.sh`, no `sh setup.sh`.

---

**Linux: `permission denied` con Docker**  
Cierra sesión de usuario y vuelve a entrar, o ejecuta `newgrp docker`.

---

**Aliases no funcionan**  
Abre terminal nueva o escribe `reload`.
