# Cloudflare WAF and Rate Limiting Baseline

This runbook defines recommended Cloudflare dashboard protections for `kotaos.juveniq.co.za` and `kota-os.co.za`.

## 1) Baseline Security Features

Enable these first:

1. Managed WAF: Cloudflare Managed Ruleset
2. Bot Fight Mode (or Super Bot Fight Mode if your plan allows it)
3. Browser Integrity Check

## 2) Custom Firewall Rules (ordered)

Apply in this order so allow/skip decisions happen before challenge/block rules.

### Rule 1: Allow verified good bots

- Expression:

```txt
cf.client.bot
```

- Action: `Skip`
- Skip target: custom bot challenge rules

### Rule 2: Block invalid methods for static site

- Expression:

```txt
(not http.request.method in {"GET" "HEAD" "OPTIONS"})
```

- Action: `Block`

### Rule 3: Challenge suspicious non-ZA low bot score

- Expression:

```txt
(not cf.client.bot and ip.geoip.country ne "ZA" and cf.bot_management.score lt 30)
```

- Action: `Managed Challenge`

### Rule 4: Challenge empty or automation-like User-Agent

- Expression:

```txt
(not cf.client.bot and (len(http.user_agent) eq 0 or lower(http.user_agent) contains "python-requests" or lower(http.user_agent) contains "curl" or lower(http.user_agent) contains "wget"))
```

- Action: `Managed Challenge`

### Rule 5: Protect APK endpoint from scraping/probing

- Expression:

```txt
(http.request.uri.path contains ".apk" and not cf.client.bot and cf.bot_management.score lt 45)
```

- Action: `Managed Challenge`

## 3) Rate Limiting Rules

### APK route burst control

- Match: URI contains `.apk`
- Threshold: `20 requests / 1 minute / IP`
- Action: `Managed Challenge`
- Escalation: block repeat offenders for 10 minutes

### Global burst control

- Match: all routes
- Threshold: `120 requests / 1 minute / IP`
- Action: `Managed Challenge`

### Aggressive flood fallback

- Match: low bot score + high request velocity
- Suggestion: bot score `< 10` with repeated hits in short window
- Action: `Block (10 minutes)`

## 4) Validation Checklist

1. Normal South African browser traffic loads site without challenge.
2. Foreign scripted probes receive managed challenge.
3. APK scraping bursts trigger rate-limit actions.
4. Cloudflare Security Events log shows rules firing in expected order.
