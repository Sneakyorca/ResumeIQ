import AuthCard from "@/components/auth/auth-card";

export default async function AuthPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const { mode } = await searchParams;
  return <AuthCard initialMode={mode === "signup" ? "signup" : "signin"} />;
}

// "use client";
// import {
//   getUser,
//   resetPassword,
//   signInWithEmail,
//   signOut,
//   signUpNewUser,
// } from "./actions";

// export default function AuthPage() {
//   async function show() {
//     // const { user, navUser } = await getUser();
//     // console.log(user, navUser);
//     // console.log(await signInWithEmail());
//     // console.log(await signOut());
//     // console.log(await resetPassword());
//   }
//   return (
//     <button
//       onClick={() => {
//         show();
//       }}
//     >
//       Show user
//     </button>
//   );
// }
