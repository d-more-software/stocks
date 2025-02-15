import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
	getInitTickersList as getStocksInitTickersList,
	resetFilters as resetStocksFilters,
	resetSearchTerm as resetStocksSearchTerm,
} from "../../slices/stocks/stocksSlice";

const Wrapper = styled.aside`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	.reset-btn {
		padding: 0.5rem 1rem;
		font-size: 2rem;
		font-family: inherit;
		background-color: var(--clr-jasper-5);
		border: none;
		border-radius: 5px;
		box-shadow: 21px 17px 15px -3px rgba(0, 0, 0, 0.2);
		cursor: pointer;
		transition: all 0.2s ease-in-out;
		&:hover {
			background-color: var(--clr-poppy-5);
		}
	}
`;

export default function Reset({ setResetFlag }) {
	const dispatch = useDispatch();

	const handleReset = () => {
		dispatch(resetStocksFilters());
		dispatch(resetStocksSearchTerm());
		dispatch(getStocksInitTickersList());

		const searchBoxInputElt = document.getElementById("search-input");
		searchBoxInputElt.value = "";
		setResetFlag((state) => state + 1);
	};

	return (
		<Wrapper>
			<button onClick={handleReset} className="reset-btn">
				Reset filters
			</button>
		</Wrapper>
	);
}
