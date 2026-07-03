import { hashPassword } from "../src/lib/password";

const password = process.argv[2];

if (!password) {
  console.error("Kullanım: npm run hash-password -- <şifre>");
  process.exit(1);
}

hashPassword(password).then((hash) => {
  console.log("\nADMIN_PASSWORD_HASH=" + hash + "\n");
  console.log("Bu değeri .env.local dosyanıza (ve Vercel ortam değişkenlerine) ekleyin.");
});
