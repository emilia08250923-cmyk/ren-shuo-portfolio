export async function POST() {
  return Response.json({ error: "尚未配置邮件发送服务，请通过邮箱链接联系。" }, { status: 501 });
}
