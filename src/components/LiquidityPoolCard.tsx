import { FC } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import STONLogo from "@/pages/IndexPage/stonfilogo.jpg";
import dedustLogo from "@/pages/IndexPage/dedustlogo.png";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/api/api";
import { useTonAddress } from "@tonconnect/ui-react";

interface LiquidityPoolCardProps {
	poolName: "dedust" | "stonfi";
}

const LiquidityPool: FC<LiquidityPoolCardProps> = ({ poolName }) => {
	const userFriendlyAddress = useTonAddress();

	const poolQueryFn =
		poolName === "dedust" ? API.getDedustInfo : API.getStonfiInfo;
	const icon = poolName === "dedust" ? dedustLogo : STONLogo;

	const { data } = useQuery({
		queryFn: () => poolQueryFn(userFriendlyAddress),
		queryKey: [poolName],
	});

	return (
		<div>
			<div className="flex justify-between items-center my-4">
				<div className="flex items-center">
					<img src={icon} alt={poolName} className="rounded-lg h-8 w-8 mr-2" />
					<p className="font-semibold text-xl capitalize">{poolName}</p>
				</div>
				<button className="text-blue-800 px-3 py-1 bg-gray-200 rounded-lg flex items-center">
					LP analytics <MdOutlineKeyboardArrowRight />
				</button>
			</div>
			<div className="p-4 bg-white rounded-lg shadow-md">
				<div className="">
					<div>
						{data?.map((lp, index) => (
							<div key={index} className="mb-8">
								<div className="flex justify-between items-center">
									<p className="text-blue-500 bg-blue-100 rounded-full px-4 py-1 h-8">
										Liquidity Pool
									</p>
									<p className="text-2xl font-bold mt-2">
										${parseFloat(lp.usd_sum).toFixed(2)}
									</p>
								</div>
								<div className="mt-4">
									<div className="grid grid-cols-3 text-gray-500 text-xs">
										<p className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider justify-self-start">
											SUPPLIED
										</p>
										<p className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider justify-self-start">
											AMOUNT
										</p>
										<p className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider justify-self-end">
											USD VALUE
										</p>
									</div>
									{lp.supplied.map((token) => (
										<div
											className="flex justify-between items-center mt-2"
											key={token.token_name}
										>
											<div className="flex items-center col-span-1">
												<img
													src={token.token_image_url}
													alt={token.token_name}
													className="h-6 w-6 mr-2"
												/>
												<span className="text-black">{token.token_name}</span>
											</div>
											<p className="col-span-1 flex justify-start text-black">
												{(
													+token.amount / Math.pow(10, +token.decimals)
												).toFixed(2)}
											</p>
											<p className="col-span-1 text-black">
												{token.usd_value}$
											</p>
										</div>
									))}
								</div>
								<div className="mt-4">
									<div className="grid grid-cols-3 text-gray-500 text-xs">
										<p className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider justify-self-start">
											Rewarded
										</p>
										<p className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider justify-self-start">
											AMOUNT
										</p>
										<p className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider justify-self-end">
											USD VALUE
										</p>
									</div>
									{lp.rewards.map((token) => (
										<div
											className="flex justify-between items-center mt-2"
											key={token.token_name}
										>
											<div className="flex items-center col-span-1">
												<img
													src={token.token_image_url}
													alt={token.token_name}
													className="h-6 w-6 mr-2"
												/>
												<span className="text-black">{token.token_name}</span>
											</div>
											<p className="col-span-1 flex justify-start text-black">
												{(
													+token.amount / Math.pow(10, +token.decimals)
												).toFixed(2)}
											</p>
											<p className="col-span-1 text-black">
												{token.usd_value}$
											</p>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default LiquidityPool;
