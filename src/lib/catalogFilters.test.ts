import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CATEGORY_ORDER,
  getCategories,
  getProductBySlug,
  PRODUCTS,
} from '../data/catalog';
import {
  extractCatalogCategories,
  filterCatalogProducts,
} from './catalogFilters';

test('getCategories returns all 11 categories in CATEGORY_ORDER with accurate counts', () => {
  const categories = getCategories();
  assert.equal(categories.length, CATEGORY_ORDER.length);
  assert.equal(categories.length, 11);

  const totalCount = categories.reduce((sum, item) => sum + item.count, 0);
  assert.equal(totalCount, PRODUCTS.length);
});

test('getProductBySlug finds existing products and returns undefined for unknown slug', () => {
  const found = getProductBySlug('verona-embroidered-tablecloth');
  assert.ok(found);
  assert.equal(found.name, 'Verona Embroidered Tablecloth');
  assert.equal(found.category, 'Tablecloths');

  assert.equal(getProductBySlug('non-existent-piece'), undefined);
});

test('extractCatalogCategories preserves unique category order from products', () => {
  const extracted = extractCatalogCategories(PRODUCTS);
  assert.equal(extracted.length, 11);
  assert.equal(extracted[0], 'Tablecloths');
});

test('filterCatalogProducts filters by category, search query, and combined criteria', () => {
  const all = filterCatalogProducts(PRODUCTS, '', new Set());
  assert.equal(all.length, PRODUCTS.length);

  const tablecloths = filterCatalogProducts(
    PRODUCTS,
    '',
    new Set(['Tablecloths'])
  );
  assert.equal(tablecloths.length, 2);
  assert.ok(tablecloths.every((p) => p.category === 'Tablecloths'));

  const linenSearch = filterCatalogProducts(PRODUCTS, 'linen', new Set());
  assert.ok(linenSearch.length > 0);
  assert.ok(linenSearch.length < PRODUCTS.length);

  const combined = filterCatalogProducts(
    PRODUCTS,
    'verona',
    new Set(['Tablecloths'])
  );
  assert.equal(combined.length, 1);
  assert.equal(combined[0]?.slug, 'verona-embroidered-tablecloth');

  const empty = filterCatalogProducts(
    PRODUCTS,
    'zzzz-unmatched-fibre',
    new Set()
  );
  assert.equal(empty.length, 0);
});
