import fs from 'fs';
import path from 'path';
import { ISiteContent } from '../models/Content';
import { defaultSiteContent } from '../data/defaultContent';

export class ContentRepository {
  private dataDir: string;
  private filePath: string;
  private memoryCache: ISiteContent;

  constructor() {
    this.dataDir = path.resolve(__dirname, '../../data');
    this.filePath = path.join(this.dataDir, 'content.json');
    this.memoryCache = defaultSiteContent;
    this.ensureFileExists();
  }

  private ensureFileExists(): void {
    try {
      if (!fs.existsSync(this.dataDir)) {
        fs.mkdirSync(this.dataDir, { recursive: true });
      }

      if (fs.existsSync(this.filePath)) {
        const fileData = fs.readFileSync(this.filePath, 'utf-8');
        this.memoryCache = JSON.parse(fileData);
      } else {
        fs.writeFileSync(this.filePath, JSON.stringify(defaultSiteContent, null, 2), 'utf-8');
        this.memoryCache = defaultSiteContent;
      }
    } catch (err) {
      console.warn('ContentRepository: File IO error, using in-memory defaults', err);
      this.memoryCache = defaultSiteContent;
    }
  }

  public async getContent(): Promise<ISiteContent> {
    try {
      if (fs.existsSync(this.filePath)) {
        const fileData = await fs.promises.readFile(this.filePath, 'utf-8');
        this.memoryCache = JSON.parse(fileData);
      }
    } catch {
      // Fallback to memory cache
    }
    return this.memoryCache;
  }

  public async saveContent(newContent: ISiteContent): Promise<ISiteContent> {
    this.memoryCache = newContent;
    try {
      if (!fs.existsSync(this.dataDir)) {
        fs.mkdirSync(this.dataDir, { recursive: true });
      }
      await fs.promises.writeFile(this.filePath, JSON.stringify(newContent, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to write content to disk:', err);
    }
    return this.memoryCache;
  }

  public async resetContent(): Promise<ISiteContent> {
    return this.saveContent(defaultSiteContent);
  }
}

export const contentRepository = new ContentRepository();
