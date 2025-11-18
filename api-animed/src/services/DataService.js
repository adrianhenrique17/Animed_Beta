import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class DataService {
  constructor(fileName) {
    this.dataPath = path.join(__dirname, "../../data", fileName);
  }

  async readAll() {
    try {
      const raw = await fs.readFile(this.dataPath, "utf8");
      return JSON.parse(raw);
    } catch (error) {
      if (error.code === "ENOENT") {
        return [];
      }
      throw error;
    }
  }

  async writeAll(data) {
    await fs.writeFile(this.dataPath, JSON.stringify(data, null, 2), "utf8");
  }
}
