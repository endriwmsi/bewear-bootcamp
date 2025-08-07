import { relations } from "drizzle-orm";
import { timestamp, integer, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
});

export const categoryTable = pgTable("category", {
  id: uuid().primaryKey().defaultRandom(),

  name: text().notNull(),
  slug: text().notNull().unique(),

  createdAt: timestamp().defaultNow().defaultNow(),
});

export const categoryRelations = relations(categoryTable, ({ many }) => ({
  products: many(productTable),
}));

export const productTable = pgTable("product", {
  id: uuid().primaryKey().defaultRandom(),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => categoryTable.id),

  slug: text().notNull().unique(),
  name: text().notNull(),
  description: text().notNull(),

  createdAt: timestamp("created_at").defaultNow().defaultNow(),
});

export const productRelations = relations(productTable, ({ one, many }) => ({
  category: one(categoryTable, {
    fields: [productTable.categoryId],
    references: [categoryTable.id],
  }),
  variants: many(productVariantTable),
}));

export const productVariantTable = pgTable("product_variant", {
  id: uuid().primaryKey().defaultRandom(),
  productId: uuid("product_id")
    .notNull()
    .references(() => productTable.id),

  name: text().notNull(),
  color: text().notNull(),
  slug: text().notNull().unique(),
  imageUrl: text("image_url").notNull(),

  priceInCents: integer("price_in_cents").notNull(),

  createdAt: timestamp("created_at").defaultNow().defaultNow(),
});

export const productVariantRelations = relations(
  productVariantTable,
  ({ one }) => ({
    product: one(productTable, {
      fields: [productVariantTable.productId],
      references: [productTable.id],
    }),
  }),
);
