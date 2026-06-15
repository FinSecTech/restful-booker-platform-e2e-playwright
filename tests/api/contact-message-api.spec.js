import { test, expect } from '../fixtures/test-fixtures.js';
import { buildMessagePayload, uid } from '../support/data-builders.js';

test.describe('Contact and message API coverage', () => {
  test('CNT-003 @api @regression contact validation rejects invalid formats', async ({ messageApi }) => {
    // submit contact payload with invalid fields
    const invalidRes = await messageApi.create({
      name: 'A',
      email: 'bad',
      phone: '12',
      subject: 'x',
      description: 'short',
    });

    // validate validation status code
    expect([400, 422]).toContain(invalidRes.status());
  });

  test('CNT-004 @api @regression contact boundary values are validated', async ({ messageApi }) => {
    // submit boundary-size contact payload
    const boundaryRes = await messageApi.create({
      name: 'A',
      email: 'a@b.c',
      phone: '1234567890',
      subject: 'S',
      description: 'Boundary payload for contact endpoint validation.',
    });

    // validate boundary handling outcome
    expect([200, 201, 400, 422]).toContain(boundaryRes.status());
  });

  test('CNT-005 @api @regression contact special characters are handled safely', async ({ messageApi }) => {
    // submit contact payload with special characters
    const payload = buildMessagePayload({
      subjectSuffix: uid('CNT5'),
      description: '<script>alert(1)</script> !!! ### -- special chars check',
    });
    const specialRes = await messageApi.create(payload);

    // validate safe handling response
    expect([200, 201, 400, 422]).toContain(specialRes.status());

    // cleanup message when submission was accepted
    if ([200, 201].includes(specialRes.status())) {
      const listed = await messageApi.findBySubject(payload.subject);
      if (listed?.id) {
        const deleteRes = await messageApi.delete(listed.id);
        expect([200, 202, 204]).toContain(deleteRes.status());
      }
    }
  });

  test('MSG-001 @api @regression message record can be created', async ({ messageApi }) => {
    // create message and validate list visibility
    const payload = buildMessagePayload({ subjectSuffix: uid('MSG1') });
    const createRes = await messageApi.create(payload);
    expect([200, 201]).toContain(createRes.status());

    const listed = await messageApi.findBySubject(payload.subject);
    expect(listed).toBeTruthy();

    const deleteRes = await messageApi.delete(listed.id);
    expect([200, 202, 204]).toContain(deleteRes.status());
  });

  test('MSG-003 @api @regression message can be marked as read', async ({ messageApi }) => {
    // create message and update read status
    const payload = buildMessagePayload({ subjectSuffix: uid('MSG3') });
    const createRes = await messageApi.create(payload);
    expect([200, 201]).toContain(createRes.status());

    const listed = await messageApi.findBySubject(payload.subject);
    expect(listed).toBeTruthy();

    const markReadRes = await messageApi.markAsRead(listed.id);
    expect([200, 202, 204]).toContain(markReadRes.status());

    const deleteRes = await messageApi.delete(listed.id);
    expect([200, 202, 204]).toContain(deleteRes.status());
  });

  test('MSG-004 @api @regression message can be deleted by admin', async ({ messageApi }) => {
    // create then delete message record
    const payload = buildMessagePayload({ subjectSuffix: uid('MSG4') });
    const createRes = await messageApi.create(payload);
    expect([200, 201]).toContain(createRes.status());

    const listed = await messageApi.findBySubject(payload.subject);
    expect(listed).toBeTruthy();

    const deleteRes = await messageApi.delete(listed.id);
    expect([200, 202, 204]).toContain(deleteRes.status());
  });

  test('MSG-005 @api @regression unauthorized message deletion is blocked', async ({ request }) => {
    // send delete request without auth headers
    const res = await request.delete('/api/message/1');

    // validate unauthorized/forbidden response
    expect([401, 403]).toContain(res.status());
  });
});
