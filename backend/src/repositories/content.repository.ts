import fs from 'fs';
import path from 'path';
import { ISiteContent, SiteContent } from '../models/Content';
import { defaultSiteContent } from '../data/defaultContent';
import { isDBConnected } from '../config/db';

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
      console.warn('[ContentRepository] File IO error, using in-memory defaults:', err);
      this.memoryCache = defaultSiteContent;
    }
  }

  public async getContent(): Promise<ISiteContent> {
    // 1. Try MongoDB first if connected
    if (isDBConnected()) {
      try {
        const doc = await SiteContent.findOne({ key: 'global' });
        if (doc && doc.data) {
          this.memoryCache = doc.data as ISiteContent;
          return this.memoryCache;
        }

        // Document not found in DB yet - seed default into MongoDB
        console.log('[ContentRepository] Seeding default site content to MongoDB...');
        const seeded = await SiteContent.create({
          key: 'global',
          data: this.memoryCache || defaultSiteContent,
        });
        return seeded.data as ISiteContent;
      } catch (err) {
        console.error('[ContentRepository] MongoDB query failed, falling back to local cache:', err);
      }
    }

    // 2. Fallback to local JSON file or memory cache
    try {
      if (fs.existsSync(this.filePath)) {
        const fileData = await fs.promises.readFile(this.filePath, 'utf-8');
        this.memoryCache = JSON.parse(fileData);
      }
    } catch {
      // Memory cache is already available
    }

    return this.memoryCache;
  }

  public async saveContent(newContent: ISiteContent): Promise<ISiteContent> {
    this.memoryCache = newContent;

    // 1. Update in MongoDB if connected
    if (isDBConnected()) {
      try {
        await SiteContent.findOneAndUpdate(
          { key: 'global' },
          { data: newContent },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
      } catch (err) {
        console.error('[ContentRepository] Failed to persist content to MongoDB:', err);
      }
    }

    // 2. Also persist to local file as backup cache
    try {
      if (!fs.existsSync(this.dataDir)) {
        fs.mkdirSync(this.dataDir, { recursive: true });
      }
      await fs.promises.writeFile(this.filePath, JSON.stringify(newContent, null, 2), 'utf-8');
    } catch (err) {
      console.error('[ContentRepository] Failed to write content to local disk cache:', err);
    }

    return this.memoryCache;
  }

  public async resetContent(): Promise<ISiteContent> {
    return this.saveContent(defaultSiteContent);
  }
}

export const contentRepository = new ContentRepository();
