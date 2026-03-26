function requestLogger(req, res, next) {
  const start = Date.now();
  const { method, originalUrl, headers } = req;

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      JSON.stringify({
        time: new Date().toISOString(),
        correlationId: req.correlationId || null,
        method,
        url: originalUrl,
        statusCode: res.statusCode,
        durationMs: duration,
        headers
      })
    );
  });

  next();
}

module.exports = requestLogger;
