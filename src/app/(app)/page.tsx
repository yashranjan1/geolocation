"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { User } from "next-auth";

function Page() {
	const { data: session } = useSession();
	const user: User = session?.user as User;

	//   const renderDashboard = () => {
	//     if (user?.role === "client") {
	//       return <div>Dashboard for client</div>;
	//     } else if (user?.role === "service") {
	//       return <div>Dashboard for service</div>;
	//     }
	//     return null;
	//   };

	return (
		<main className="flex flex-1 flex-col items-center justify-center h-full">
			<section className="flex-1 flex flex-col items-center justify-center text-center">
				{user ? (
					<>
						<h2 className="text-3xl font-bold">
							Welcome back, {user.username}!
						</h2>

						{/* for displaying different dashboards based on user's role (not defined role inside sessions yet)*/}

						{/* <p className="mt-2 text-gray-600">
              {user?.role ? renderDashboard() : "Explore our features and services."}
            </p> */}

						<p className="mt-2 text-gray-600">
							Find mechanics nearby or view your requests.
						</p>
						<Link href="/mechanics">
							<Button className="mt-4 px-6 py-3 bg-purple-600 text-white">
								Find Mechanics
							</Button>
						</Link>
					</>
				) : (
					<>
						<h2 className="text-3xl font-bold">Welcome to AutoResQ</h2>
						<p className="mt-2 text-gray-600">
							Connect with mechanics in your area for assistance.
						</p>
						<Link href="/sign-in">
							<Button className="my-2">Sign In</Button>
						</Link>
					</>
				)}
			</section>
		</main>
	);
}

export default Page;
