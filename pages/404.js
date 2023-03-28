import { useRouter } from "next/router";
import React from "react";
import Layout from "../components/Layout/index";
import CustomButton from "../components/Shared/CustomButton";
import routes from "../config/routes";

const NotFound = () => {
	const router = useRouter();

	return (
		<Layout>
			<div className="w-[100%] h-[85vh] grid items-center justify-center">
				<div>
					<h1 className="text-[160px] font-bold text_404 text-center">404</h1>
					<p className="text-[16px] text-center text-gray-500">
						Page not found
					</p>

					<div className="mt-6 w-[100%] grid items-center justify-center">
						<CustomButton
							type="primary"
							className="p-2"
							onClick={() => router.push(routes.dashboard.url)}
						>
							Go home
						</CustomButton>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default NotFound;
