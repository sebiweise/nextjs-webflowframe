import type { NextApiRequest, NextApiResponse } from 'next'

const secret = process.env.WEBHOOK_SECRET;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    // Check for secret to confirm this is a valid request
    if (req.query['signature'] !== secret) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    try {
        await res.revalidate('/');
        return res.json({ revalidated: true });
    } catch (err) {
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        return res.status(500).send('Error revalidating');
    }
}