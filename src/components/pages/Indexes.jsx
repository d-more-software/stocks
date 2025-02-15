import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Wrapper } from "../../css/PageStyle";
import TickerLine from "../sub-components/TickerLine";
import Pagination from "../sub-components/Pagination";
import usePagination from "../../hooks/usePagination";
import useModal from "../../hooks/useModal";
import Modal from "../sub-components/Modal";
import {
	getInitTickersList,
	updateSelectedTicker,
	resetSelectedTicker,
} from "../../slices/indexes/indexesSlice";
import {
	addToSavedList,
	removeFromSavedList,
} from "../../slices/saved/savedSlice";
import { FaRegStar, FaStar } from "react-icons/fa";

export default function Indexes() {
	const dispatch = useDispatch();
	const {
		showModal,
		openModal,
		closeModal,
		placeModal,
		placeCursor,
		replaceModal,
		replaceCursor,
	} = useModal();

	// const { tickersList } = useSelector((store) => store.indexes);
	const { savedList } = useSelector((store) => store.saved);

	const { tickersList, filters, searchTerm, isLoading, selectedTicker } =
		useSelector((store) => store.indexes);
	const listElt = document.getElementById("list");

	useEffect(() => {
		dispatch(getInitTickersList());
	}, []);

	const handleTickerSelection = (evt, index) => {
		dispatch(updateSelectedTicker(index));
		openModal(evt);
	};
	const handleCloseModal = () => {
		dispatch(resetSelectedTicker());
		closeModal();
	};

	const toggleSavedState = () => {
		const foundObjIndex = savedList.findIndex(
			(obj) => obj.ticker.symbol === selectedTicker.symbol
		);
		if (foundObjIndex >= 0) {
			dispatch(removeFromSavedList(foundObjIndex));
		} else {
			dispatch(
				addToSavedList({ ticker: selectedTicker, tickerType: "index" })
			);
		}
	};

	const getSavedStateStar = () => {
		const foundObj = savedList.find(
			(obj) => obj.ticker.symbol === selectedTicker.symbol
		);
		if (foundObj) {
			return <FaStar />;
		} else {
			return <FaRegStar />;
		}
	};

	window.addEventListener("resize", () => {
		if (listElt) {
			replaceModal(listElt);
			replaceCursor(listElt);
		}
	});

	return (
		<Wrapper>
			<article className="list-header">
				<div className="list-header-grid">
					<span>Country</span>
					<span>Name</span>
					<span>Currency</span>
					<span>Market</span>
					<span>Mic code</span>
				</div>
			</article>
			<article className="list" id="list">
				{isLoading ? (
					<p>Loading...</p>
				) : tickersList.length < 1 ? (
					<p>No results found</p>
				) : (
					tickersList.map((index, idx) => (
						<div
							key={`${idx}-${index.name}`}
							onClick={(evt) => handleTickerSelection(evt, index)}
							className={
								index.symbol === selectedTicker.symbol
									? "active"
									: null
							}
						>
							<TickerLine tickerObj={index} />
						</div>
					))
				)}
			</article>
			<Modal
				showModal={showModal}
				handleCloseModal={handleCloseModal}
				toggleSavedState={toggleSavedState}
				getSavedStateStar={getSavedStateStar}
				slice="indexes"
			/>
		</Wrapper>
	);
}
