# CORS (Cross-Origin Resource Sharing)

## Was ist es?

CORS ist ein Sicherheitsmechanismus in Browsern, der steuert, ob eine Webseite von einer anderen Domain, Daten anfordern darf. Ohne CORS würde die **Same-Origin-Policy** greifen: Ein Skript auf `seite-a.de` dürfte standardmäßig keine Daten von `seite-b.de` per JavaScript abrufen.

## Warum gibt es das?

Ohne diese Beschränkung könnte jede Webseite im Hintergrund Anfragen an beliebige andere Seiten senden – zum Beispiel an deine Bank – und dabei deine gespeicherten Cookies/Sessions missbrauchen (Cross-Site Request Forgery). CORS erlaubt kontrollierte Ausnahmen von dieser Sperre.

## Wie funktioniert es technisch?

### 1. Einfache Anfragen

Bei einfachen GET/POST-Anfragen mit Standard-Headern sendet der Browser die Anfrage direkt und schickt dabei den Header:

```bash
Origin: https://seite-a.de
```

Der Server antwortet mit:

```bash
Access-Control-Allow-Origin: https://seite-a.de
```

Fehlt dieser Header oder stimmt die Domain nicht, blockiert der **Browser** die Antwort.

### 2. Preflight-Anfragen (bei komplexeren Requests)

Bei Anfragen mit speziellen Methoden (PUT, DELETE), custom Headern (z. B. `Authorization`) oder bestimmten Content-Types schickt der Browser zuerst automatisch eine **OPTIONS-Anfrage**, um zu fragen: "Darf ich das?"

```bash
OPTIONS /api/order
Origin: https://seite-a.de
Access-Control-Request-Method: PUT
```

Der Server antwortet z. B.:

```bash
Access-Control-Allow-Origin: https://seite-a.de
Access-Control-Allow-Methods: GET, PUT, POST
Access-Control-Allow-Headers: Authorization
```

Nur wenn diese Antwort passt, schickt der Browser die eigentliche Anfrage.

### 3. Credentials (Cookies) einbeziehen

Sollen Cookies/Session-Infos mitgeschickt werden, braucht es zusätzlich:

```bash
Access-Control-Allow-Credentials: true
```

und auf Client-Seite `credentials: 'include'`. In diesem Fall darf `Access-Control-Allow-Origin` **nicht** `*` sein, sondern muss die konkrete Domain nennen.

## Wichtig zu verstehen

- CORS ist eine **Browser-seitige** Schutzmaßnahme – sie schützt den Nutzer, nicht den Server. Tools wie `curl` oder Postman ignorieren CORS komplett.
- Der Server entscheidet über die Header, welche Origins erlaubt sind – CORS "erlaubt" also eigentlich der Server, nicht der Client.
- Typischer Fehler in der Praxis: `No 'Access-Control-Allow-Origin' header is present` – das bedeutet, der Server hat schlicht nicht erlaubt, dass diese fremde Domain per JS auf die Antwort zugreift.
