import { usersTable } from "~~/server/db/schema";
import { eq } from "drizzle-orm"
import { compare } from "bcrypt-ts";
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);

  if (!(username && password)) {
    throw createError({ statusCode: 400, message: 'Provide both username and password' });
  }

  const db = useDrizzle();
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, username))
    .limit(1)
    .get();

  if (!user) {
    throw createError({ statusCode: 404, message: 'Not found.'})
  }

  if (!(await compare(password, user.password))) {
    throw createError({ statusCode: 401, message: 'Invalid username or password.'})
  }

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_PRIVATE!, 
    {
      algorithm: 'HS256',
      expiresIn: '24h',
    }
  );

  return { token }
});