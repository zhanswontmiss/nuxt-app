import { usersTable } from "~~/server/db/schema";
import { eq } from "drizzle-orm"
import { compare } from "bcrypt-ts";

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);

  if (!(username && password)) {
    throw createError({ statusCode: 400, message: 'Provide both username and password' });
  }

  const db = useDrizzle();
  const user = db
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, username))
    .limit(1)
    .get();

  if (!user) {
    throw createError({ statusCode: 404, message: 'Not found.'})
  }

  if (!(await compare(password, user.password))) {
    throw createError({ statusCode: 401, message: 'Invalid password or login.'})
  }

  return { success: true }
});