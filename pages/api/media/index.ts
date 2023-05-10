import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { title, status, category } = req.body;

  const result = await prisma.book.create({
    data: {
      title: title,
      status: status,
      category: category,
    },
  });
  res.json(result);
}