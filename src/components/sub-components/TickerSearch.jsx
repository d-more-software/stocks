import { useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
	updateSearchTerm as updateStocksSearchTerm,
	resetFilters as resetStocksFilters,
} from "../../slices/stocks/stocksSlice";
// import {
// ,
// 	updateSearchTerm as updateIndexesSearchTerm,
// } from "../../slices/indexes/indexesSlice";

const Wrapper = styled.aside`
	/* border: 1px solid red; */
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	.title {
		text-align: center;
		margin: 2rem auto;
		font-family: "Iceland";
		font-size: 3rem;
		color: var(--clr-jasper-5);
	}
	.input-container {
		/* border: 1px solid red; */
		display: flex;
		justify-content: center;
		.input {
			width: 200px;
			height: 4rem;
			border: none;
			outline: none;
			padding-left: 2rem;
			border-top-left-radius: 4px;
			border-bottom-left-radius: 4px;
			font-size: inherit;
		}
		.label {
			width: 4rem;
			height: 4rem;
			background-color: var(--clr-jasper-5);
			font-size: 3rem;
			font-weight: bold;
			cursor: pointer;
			border: none;
			outline: none;
			border-top-right-radius: 4px;
			border-bottom-right-radius: 4px;
			display: grid;
			place-content: center;
		}
	}
`;

const TickerSearch = ({ setResetFlag, mode }) => {
	const inputRef = useRef();
	const dispatch = useDispatch();

	const handleSearchTermUpdate = () => {
		dispatch(resetStocksFilters());
		setResetFlag((state) => state + 1);
		const value = inputRef.current.value;
		dispatch(updateStocksSearchTerm(value));

		// if (mode === "stocks") {
		// } else {
		// 	dispatch(resetIndexesFilters());
		// 	dispatch(updateIndexesSearchTerm(value));
		// }
	};

	return (
		<Wrapper>
			{mode === "stocks" ? (
				<div className="title">Search a stock</div>
			) : (
				<div className="title">Search an Index</div>
			)}
			<div className="input-container">
				<input
					id="search-input"
					type="text"
					name="search"
					className="input"
					ref={inputRef}
				/>
				<label htmlFor="search" className="label">
					<CiSearch onClick={handleSearchTermUpdate} />
				</label>
			</div>
		</Wrapper>
	);
};

export default TickerSearch;
