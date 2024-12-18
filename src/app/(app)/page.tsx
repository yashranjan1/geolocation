import Image from "next/image";
import Link from "next/link";

function Page() {
	return (
		<>
			<div>
				Home
			</div>
			<Link href="/sign-up">
				<button>Sign Up</button>
			</Link>
		</>
	);
}

export default Page;
