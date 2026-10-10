export async function POST() {
  return Response.json({ error: "Contact delivery is not configured. Use the email link instead." }, { status: 501 });
}
