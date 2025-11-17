import 'dotenv/config';

export default {
  expo: {
    name: "Animed",
    slug: "animed",
    scheme: "animed",          
    version: "1.0.0",
    platforms: ["ios", "android", "web"],
    extra: {
      apiUrl: process.env.API_URL || "http://localhost:8081"
    }
  }
};
