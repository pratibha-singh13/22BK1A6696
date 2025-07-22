export const logger = (req, res, next) => {
  const log = {
    email: "pratibhasinghh13@gmail.com",
    name: "pratibha singh",
    rollNo: "22bk1a6696",
    accessCode: "vpJgsZ",
    clientID: "bdc0b3d0-be38-43e2-b682-477b4a5f8bf0",
    clientSecret: "FHkHJMxbfTTXhryz",
    time: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl
  };
  console.log(JSON.stringify(log, null, 2));
  next();
};
