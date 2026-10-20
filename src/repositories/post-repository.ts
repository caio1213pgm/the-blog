import { PostModal } from "../models/post/post-model";

export interface PostRepositoryData {
  findAll(): Promise<PostModal[]>;
  findUnique(id: string): Promise<PostModal>;
}
