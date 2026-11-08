export async function POST(request: Request) {
  const body = await request.json();
  const { resume } = body;
  console.log(resume);
  await new Promise((res) => setTimeout(res, 3000));

  return Response.json(
    {
      success: true,
      message: "Resume sucessfully submitted",
      content: resume,
    },
    { status: 200 },
  );
}
