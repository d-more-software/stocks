import { useEffect } from "react";
import { Wrapper } from "../../css/PageStyleForex";
import Converter from "../sub-components/Converter";
import ParitiesActual from "../sub-components/ParitiesActual";
import ParitiesHistory from "../sub-components/ParitiesHistory";
import { notify, Toaster } from "../../css/Toaster";
import { updateIsLimit } from "../../slices/app/appSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Forex() {
	const dispatch = useDispatch();
	const { isLimit } = useSelector((store) => store.app);

	/** need to check re-rending issue */
	// if (isLimit) {
	// 	notify();
	// }

	useEffect(() => {
		if (isLimit) {
			notify();
		}
	}, [isLimit]);

	useEffect(() => {
		//cleanup
		return () => {
			dispatch(updateIsLimit(false));
		};
	}, []);
	return (
		<Wrapper>
			<Toaster />
			<article className="converter">
				<Converter />
			</article>
			<article className="parities-actual">
				<ParitiesActual />
			</article>
			<article className="parities-history">
				<ParitiesHistory />
			</article>
		</Wrapper>
	);
}
