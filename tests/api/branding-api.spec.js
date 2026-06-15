import { test, expect } from "../fixtures/test-fixtures.js";
import { randomBrandingName } from "../support/data-builders.js";

test.describe("Branding API coverage", () => {
  test.fail(
    "BR-002 @api @regression branding read/update/revert",
    async ({ brandingApi }) => {
      // read, update, verify, and restore branding payload
      const readRes = await brandingApi.read();
      expect(readRes.status()).toBe(200);
      const original = await readRes.json();

      const modified = { ...original, name: randomBrandingName() };
      const updateRes = await brandingApi.update(modified);
      expect([200, 202]).toContain(updateRes.status());

      const verifyRes = await brandingApi.read();
      expect(verifyRes.status()).toBe(200);
      expect((await verifyRes.json()).name).toBe(modified.name);

      const restoreRes = await brandingApi.update(original);
      expect([200, 202]).toContain(restoreRes.status());
    },
  );

  test("BR-003 @api @regression invalid branding input is rejected", async ({
    brandingApi,
  }) => {
    // read baseline then submit invalid update payload
    const readRes = await brandingApi.read();
    expect(readRes.status()).toBe(200);
    const original = await readRes.json();

    const invalidRes = await brandingApi.update({ ...original, name: "" });
    expect([400, 422]).toContain(invalidRes.status());
  });

  test.fail(
    "BR-004 @api @regression branding can be restored to baseline",
    async ({ brandingApi }) => {
      // mutate branding name and restore original baseline
      const originalRes = await brandingApi.read();
      expect(originalRes.status()).toBe(200);
      const original = await originalRes.json();

      const temporaryRes = await brandingApi.update({
        ...original,
        name: randomBrandingName(),
      });
      expect([200, 202]).toContain(temporaryRes.status());

      const restoreRes = await brandingApi.update(original);
      expect([200, 202]).toContain(restoreRes.status());

      const verifyRes = await brandingApi.read();
      expect(verifyRes.status()).toBe(200);
      expect((await verifyRes.json()).name).toBe(original.name);
    },
  );
});
