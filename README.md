# redis-lab
Ping connection status and reconnection attempts.

# todos
- [x] list connections after reading client.status (1)
- [x] try reconnecting (reconnection -> ready)
- [x] bring down redis 5s (reconnect x4 + error message -> ready and NO crash)
