import { resolve } from "path";
import { PostModal } from "../models/post/post-model";
import { PostRepositoryData } from "./post-repository";
import { readFile } from "fs/promises";

const ROOT_DIR = process.cwd();

const JSON_DATA_DIR = resolve(ROOT_DIR, "src", "db", "seed", "data.json");

export class JsonDataRepository implements PostRepositoryData {
  private async getData(): Promise<PostModal[]> {
    const dataJson = await readFile(JSON_DATA_DIR, "utf-8");
    const parsed = JSON.parse(dataJson);
    const { posts } = parsed;
    return posts;
  }
  async findAll(): Promise<PostModal[]> {
    const posts = await this.getData();
    return posts;
  }
  async findUnique(id: string): Promise<PostModal> {
    const posts = await this.getData();
    const uniquePost = posts.find((item) => item.id === id);

    if (!uniquePost) throw new Error("Post não existe");

    return uniquePost;
  }
}

export const PostRepository = new JsonDataRepository();

(async () => {
  const jsonData = new JsonDataRepository();
  jsonData
    .findUnique("be3f14a1-0105-4e2e-133a05e7bda6")
    .then((abc) => console.log(abc));
})();
