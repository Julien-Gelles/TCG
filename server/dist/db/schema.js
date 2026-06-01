"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.posts = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
// ─── Example table — delete and replace with your own ─────────────────────────
exports.posts = (0, pg_core_1.pgTable)('posts', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    title: (0, pg_core_1.varchar)('title', { length: 255 }).notNull(),
    body: (0, pg_core_1.text)('body').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});
