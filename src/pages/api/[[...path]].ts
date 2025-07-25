import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, headers, query } = req;
  const path = query.path ? (Array.isArray(query.path) ? query.path.join('/') : query.path) : '';

  console.log("PATH", path);

  // Build backend URL with query string
  const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${path}`);
  Object.keys(query).forEach(key => {
    if (key !== 'path') {
      const value = query[key];
      if (Array.isArray(value)) {
        value.forEach(v => url.searchParams.append(key, v));
      } else {
        url.searchParams.append(key, value as string);
      }
    }
  });

  // Prepare fetch options
  const fetchHeaders: Record<string, string> = {};
  if (headers['authorization'] && typeof headers['authorization'] === 'string') {
    fetchHeaders['authorization'] = headers['authorization'];
  }

  let fetchBody: BodyInit | undefined = undefined;
  if (!['GET', 'HEAD'].includes(method as string) && req.body) {
    if (typeof req.body === 'object') {
      fetchBody = JSON.stringify(req.body);
      fetchHeaders['Content-Type'] = 'application/json';
    } else {
      fetchBody = req.body as BodyInit;
    }
  }

  const fetchOptions: RequestInit = {
    method,
    headers: fetchHeaders,
    body: fetchBody,
  };

  console.log("FETCH_BODY", fetchBody);
  console.log("FETCH_HEADERS", fetchHeaders);

  try {
    console.log("URL", url.toString());
    const backendRes = await fetch(url.toString(), fetchOptions);
    res.status(backendRes.status);
    backendRes.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });
    const data = await backendRes.arrayBuffer();
    res.send(Buffer.from(data));
  } catch (error) {
    res.status(500).json({ error: 'Proxy error', details: error instanceof Error ? error.message : String(error) });
  }
}
