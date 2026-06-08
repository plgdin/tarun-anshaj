import handler from './api/bunny-upload-auth.ts';

const req = {
  method: 'POST',
  headers: { authorization: 'Bearer test' },
  body: { title: 'test' }
};

const res = {
  status: (code) => ({
    json: (data) => console.log(code, data)
  })
};

handler(req as any, res as any).catch(console.error);
