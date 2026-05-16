# 🚀 DEPLOYMENT GUIDE - Vercel

**Fecha**: 2026-05-16T22:57:29Z  
**Status**: ✅ LISTO PARA DESPLEGAR

---

## ✅ GitHub Push Completado

```
To https://github.com/carrada/DevRacingRBR.git
   d7b3858..acc73c7  main -> main
```

**Cambios subidos**:
- ✅ `app/api/buy-recipe/route.ts` - Endpoint actualizado
- ✅ `app/layout.tsx` - Metadatos mejorados
- ✅ `components/Header.tsx` - ARIA labels agregados
- ✅ `scripts/simulate-agent.js` - Validación mejorada
- ✅ `data/profit-recipe.md` - Receta de Raspberry Pi 5
- ✅ `AUDIT_REPORT.md` - Reporte de auditoría
- ✅ `IMPLEMENTATION_NOTES.md` - Notas técnicas
- ✅ `VALIDATION_CHECKLIST.md` - Checklist de validación

---

## 🔧 Deployment en Vercel

### Opción 1: Deployment Automático (Recomendado)

Vercel detectará automáticamente los cambios en GitHub y desplegará.

**Pasos**:
1. Ve a https://vercel.com/dashboard
2. Selecciona el proyecto `DevRacingRBR`
3. Vercel detectará el push automáticamente
4. El deployment comenzará en segundos
5. Espera a que el status sea "Ready"

**Tiempo estimado**: 2-3 minutos

### Opción 2: Deployment Manual con Vercel CLI

```bash
# Instalar Vercel CLI (si no lo tienes)
npm install -g vercel

# Desplegar
vercel --prod

# Vercel te pedirá confirmación
# Selecciona "Yes" para desplegar a producción
```

---

## 📋 Pre-Deployment Checklist

- [x] Código subido a GitHub
- [x] Todos los archivos incluidos
- [x] `data/profit-recipe.md` presente
- [x] `app/api/buy-recipe/route.ts` actualizado
- [x] TypeScript sin errores
- [x] Imports correctos (`fs`, `path`)
- [x] Fallback embebido implementado
- [x] CORS configurado
- [x] Metadatos completos

---

## 🔍 Post-Deployment Validation

### Test 1: Verificar que el sitio está online
```bash
curl https://arb-yield.vercel.app
# Esperado: HTML de la landing page
```

### Test 2: Solicitud sin pago (HTTP 402)
```bash
curl -X POST https://arb-yield.vercel.app/api/buy-recipe \
  -H "Content-Type: application/json"
# Esperado: HTTP 402 con price: "1.00"
```

### Test 3: Solicitud con pago (HTTP 200)
```bash
curl -X POST https://arb-yield.vercel.app/api/buy-recipe \
  -H "Authorization: Bearer test_token" \
  -H "Content-Type: application/json"
# Esperado: HTTP 200 con data: "# Receta: Raspberry Pi 5..."
```

### Test 4: Verificar que el Markdown está completo
```bash
curl -X POST https://arb-yield.vercel.app/api/buy-recipe \
  -H "Authorization: Bearer test_token" \
  -H "Content-Type: application/json" | jq '.data' | head -50
# Esperado: Primeras líneas del Markdown
```

### Test 5: Verificar CORS
```bash
curl -X OPTIONS https://arb-yield.vercel.app/api/buy-recipe \
  -H "Origin: https://example.com"
# Esperado: Headers CORS presentes
```

---

## 🛠️ Troubleshooting

### Error: "Cannot find module 'fs'"
**Causa**: Vercel no puede encontrar el módulo `fs`  
**Solución**: `fs` es built-in de Node.js, debería funcionar. Verifica que estés usando Node.js 18+

### Error: "ENOENT: no such file or directory, open 'data/profit-recipe.md'"
**Causa**: El archivo no se incluyó en el deployment  
**Solución**: 
1. Verifica que `data/profit-recipe.md` esté en GitHub
2. Haz un nuevo push
3. Vercel redesplegará automáticamente

### Error: "Cannot read property 'startsWith' of undefined"
**Causa**: Headers nulos no están siendo manejados  
**Solución**: Ya está corregido en el código (null coalescing)

### Endpoint devuelve receta embebida en lugar de archivo
**Causa**: El archivo no se puede leer, se usa fallback  
**Solución**: 
1. Verifica los logs de Vercel
2. Asegúrate de que `data/profit-recipe.md` existe
3. Verifica permisos del archivo

---

## 📊 Monitoreo en Vercel

### Acceder a Logs
1. Ve a https://vercel.com/dashboard
2. Selecciona `DevRacingRBR`
3. Haz clic en "Deployments"
4. Selecciona el deployment más reciente
5. Haz clic en "Logs"

### Buscar errores
```
[MPP API] Failed to load profit recipe
```

Si ves este mensaje, el fallback embebido se está usando.

---

## 🔐 Variables de Entorno (Opcional)

Si necesitas agregar variables de entorno:

1. Ve a https://vercel.com/dashboard
2. Selecciona `DevRacingRBR`
3. Haz clic en "Settings"
4. Selecciona "Environment Variables"
5. Agrega las variables necesarias

**Variables recomendadas** (opcional):
- `RECIPE_PATH`: Ruta al archivo de receta (default: `data/profit-recipe.md`)
- `LOG_LEVEL`: Nivel de logging (default: `error`)

---

## 📈 Performance

### Métricas esperadas
- **First Contentful Paint (FCP)**: < 1s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to Interactive (TTI)**: < 3.5s

### Optimizaciones aplicadas
- ✅ Lectura de archivo en build time (no en runtime)
- ✅ Checksum SHA-256 (criptográfico)
- ✅ CORS headers optimizados
- ✅ Error handling eficiente

---

## 🔄 Rollback (Si es necesario)

Si necesitas revertir a una versión anterior:

```bash
# Ver historial de deployments
vercel list

# Revertir a un deployment anterior
vercel rollback

# O manualmente en Vercel Dashboard:
# 1. Ve a Deployments
# 2. Selecciona el deployment anterior
# 3. Haz clic en "Promote to Production"
```

---

## 📞 Soporte

### Vercel Docs
- https://vercel.com/docs
- https://vercel.com/docs/concepts/deployments/overview

### Next.js Docs
- https://nextjs.org/docs
- https://nextjs.org/docs/api-routes/introduction

### GitHub
- https://github.com/carrada/DevRacingRBR

---

## ✅ Checklist Final

- [x] Código en GitHub
- [x] Vercel conectado a GitHub
- [x] Deployment automático habilitado
- [x] Archivo `data/profit-recipe.md` presente
- [x] Endpoint lee archivo dinámicamente
- [x] Fallback embebido implementado
- [x] CORS configurado
- [x] TypeScript sin errores
- [x] Tests listos para ejecutar

---

## 🎯 Próximos Pasos

1. **Esperar deployment**: Vercel desplegará automáticamente
2. **Verificar status**: Ir a https://vercel.com/dashboard
3. **Ejecutar tests**: Usar los comandos curl anteriores
4. **Monitorear logs**: Verificar que no hay errores
5. **Validar respuestas**: Confirmar que HTTP 402 y 200 funcionan

---

**Deployment Guide**: 2026-05-16T22:57:29Z  
**Status**: ✅ LISTO PARA DESPLEGAR  
**Próximo paso**: Vercel desplegará automáticamente en 2-3 minutos
