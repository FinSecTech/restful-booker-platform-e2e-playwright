const u = process.env.ADMIN_USERNAME;
const p = process.env.ADMIN_PASSWORD;
const b = process.env.BASE_URL;
console.log("ADMIN_USERNAME:", u ? "SET:" + u.substring(0, 4) : "MISSING");
console.log("ADMIN_PASSWORD:", p ? "SET:" + p.substring(0, 4) : "MISSING");
console.log("BASE_URL:", b || "MISSING");
